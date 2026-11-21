/**
 * ===================================================================
 * INFORMÁTICA MÁGICA — AMBIENTACIÓN NAVIDEÑA INMERSIVA GLOBAL
 * js/magicSanta.js
 * ===================================================================
 * Sistema global, compartido y reutilizable de ambientación navideña
 * para todas las pantallas y módulos de la plataforma:
 *
 * 1. Árbol de Navidad grande e interactivo en el sector izquierdo (más del doble
 *    del tamaño original: 312×412px), con ramas detalladas, guirnaldas, 22 luces
 *    multicolores, estrella en la punta, base decorativa, regalos iniciales y
 *    espacio para hasta 6 regalos coleccionables con indicador "REGALOS: X/6".
 * 2. Botón interactivo junto al árbol para cambiar entre 5 modos de iluminación:
 *    1) Parpadeo suave, 2) Parpadeo rápido, 3) Luces intercaladas,
 *    4) Efecto pausado, 5) Modo brillante.
 * 3. Ilustración de alta calidad de Papá Noel, su carroza real y 3 renos con
 *    cornamentas, arneses, riendas y movimiento coordinado.
 * 4. Cuatro recorridos posibles elegidos de manera aleatoria sin repetir siempre
 *    la misma secuencia:
 *    - top-ltr (Superior: Izquierda a Derecha)
 *    - top-rtl (Superior: Derecha a Izquierda)
 *    - bottom-ltr (Inferior: Izquierda a Derecha)
 *    - bottom-rtl (Inferior: Derecha a Izquierda)
 * 5. Intervalos aleatorios largos entre apariciones (4 a 7 minutos: 240.000ms a
 *    420.000ms) sin reiniciarse al cambiar de módulo o pantalla.
 * 6. Papá Noel interactivo: al hacer clic durante su recorrido, saluda y deja caer
 *    un regalo navideño con animación fluida; al abrirlo se muestra animación de
 *    estrellas/confeti y el modal de felicitación, incorporando el regalo al árbol
 *    (límite máximo de 6 regalos, con persistencia en localStorage).
 */

(function (global) {
  'use strict';

  // Los 5 modos de iluminación del Árbol de Navidad
  const TREE_LIGHT_MODES = [
    { id: 1, key: 'mode-1', name: 'Parpadeo suave', icon: '✨' },
    { id: 2, key: 'mode-2', name: 'Parpadeo rápido', icon: '⚡' },
    { id: 3, key: 'mode-3', name: 'Luces intercaladas', icon: '🎄' },
    { id: 4, key: 'mode-4', name: 'Efecto pausado', icon: '🌟' },
    { id: 5, key: 'mode-5', name: 'Modo brillante', icon: '💡' }
  ];

  // Los 4 recorridos posibles de Papá Noel y sus renos
  const SANTA_ROUTES = [
    'top-ltr',
    'top-rtl',
    'bottom-ltr',
    'bottom-rtl'
  ];

  // Diseños variados y coordenadas distintas debajo del árbol para los 6 regalos coleccionables
  const COLLECTIBLE_GIFT_DESIGNS = [
    {
      slot: 1,
      x: 24,
      y: 266,
      w: 32,
      h: 28,
      boxColor: '#dc2626',
      borderColor: '#fca5a5',
      ribbonColor: '#ffd700',
      bowColor: '#fde047',
      label: 'Regalo Rojo Estrella'
    },
    {
      slot: 2,
      x: 60,
      y: 274,
      w: 30,
      h: 25,
      boxColor: '#0284c7',
      borderColor: '#7dd3fc',
      ribbonColor: '#fef08a',
      bowColor: '#38bdf8',
      label: 'Regalo Azul Polar'
    },
    {
      slot: 3,
      x: 150,
      y: 272,
      w: 31,
      h: 26,
      boxColor: '#16a34a',
      borderColor: '#86efac',
      ribbonColor: '#ef4444',
      bowColor: '#fde047',
      label: 'Regalo Esmeralda'
    },
    {
      slot: 4,
      x: 185,
      y: 264,
      w: 33,
      h: 28,
      boxColor: '#9333ea',
      borderColor: '#d8b4fe',
      ribbonColor: '#ffd700',
      bowColor: '#f472b6',
      label: 'Regalo Violeta Mágico'
    },
    {
      slot: 5,
      x: 42,
      y: 284,
      w: 29,
      h: 24,
      boxColor: '#ea580c',
      borderColor: '#fdba74',
      ribbonColor: '#fef08a',
      bowColor: '#ffffff',
      label: 'Regalo Dorado Cálido'
    },
    {
      slot: 6,
      x: 168,
      y: 284,
      w: 30,
      h: 24,
      boxColor: '#0d9488',
      borderColor: '#5eead4',
      ribbonColor: '#fde047',
      bowColor: '#ef4444',
      label: 'Regalo Turquesa Real'
    }
  ];

  class MagicSantaManager {
    constructor() {
      this.STORAGE_KEY = 'magic_santa_enabled';
      this.GIFTS_STORAGE_KEY = 'lego_xmas_tree_gifts_v1';
      this.LIGHT_MODE_STORAGE_KEY = 'lego_xmas_tree_light_mode_v1';
      this.MAX_GIFTS = 6;

      this.enabled = true;
      this.timerId = null;
      this.flightEndTimerId = null;
      this.activeFlyerEl = null;
      this.isFlying = false;
      this.overlayContainer = null;
      this.ambienceRoot = null;
      this.bityReactionTimerId = null;
      this.screenObserver = null;
      this.currentScreenId = 'screen-home';
      this.flightCount = 0;

      // Estado del árbol interactivo y colección de regalos (0..6)
      this.lightModeIndex = 0; // 0..4 -> Modos 1 a 5
      this.collectedGifts = []; // Array de slots [1..6]
      this.currentFlightGiftDropped = false;
      this.activeFallingGiftEl = null;
      this.isOpeningGift = false;
      this.lastRoute = null;

      // Intervalos aleatorios de 4 a 7 minutos (240.000 ms a 420.000 ms)
      this.minIntervalMs = 240000;
      this.maxIntervalMs = 420000;
      // Primera aparición sorpresa tras ingresar a la plataforma (45 segundos)
      this.initialDelayMs = 45000;
      this.flightDurationMs = 13500;

      // Mensajes festivos y motivadores de programación
      this.santaMessages = [
        '¡JO JO JO! ¡HACÉ CLIC EN MI TRINEO PARA RECIBIR UN REGALO! 🎅🎁',
        '¡FELIZ NAVIDAD, PEQUEÑOS PROGRAMADORES! ¡TOCÁ EL TRINEO! ⭐🛷',
        '¡RODOLFO Y SUS RENOS TRAEN SORPRESAS PARA TU ARBOLITO! 🦌✨',
        '¡QUÉ HERMOSOS ALGORITMOS ESTÁN CREANDO CON BITY! 🎄🎁',
        '¡JO JO JO! ¡CADA BLOQUE TE ACERCA A UNA GRAN META! 🎅🌟',
        '¡EL TALLER DEL POLO NORTE CELEBRA TU INGENIO! 🎁🚀'
      ];
      this.lastMsgIndex = -1;

      this.readStoredPreference();
      this.loadTreeState();
      this.bindTabVisibility();
    }

    // =========================================================================
    // PERSISTENCIA DE PREFERENCIAS, MODO DE LUCES Y REGALOS (0/6 A 6/6)
    // =========================================================================
    readStoredPreference() {
      try {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        this.enabled = (saved === null) ? true : (saved === 'true');
      } catch (e) {
        this.enabled = true;
      }
    }

    savePreference() {
      try {
        localStorage.setItem(this.STORAGE_KEY, this.enabled ? 'true' : 'false');
      } catch (e) {}
    }

    loadTreeState() {
      // Cargar regalos guardados
      try {
        const rawGifts = localStorage.getItem(this.GIFTS_STORAGE_KEY);
        if (rawGifts) {
          const parsed = JSON.parse(rawGifts);
          if (Array.isArray(parsed)) {
            const validUnique = [];
            parsed.forEach((n) => {
              const slotNum = parseInt(n, 10);
              if (slotNum >= 1 && slotNum <= this.MAX_GIFTS && !validUnique.includes(slotNum) && validUnique.length < this.MAX_GIFTS) {
                validUnique.push(slotNum);
              }
            });
            this.collectedGifts = validUnique;
          }
        }
      } catch (e) {
        this.collectedGifts = [];
      }

      // Cargar modo de luces guardado
      try {
        const rawMode = localStorage.getItem(this.LIGHT_MODE_STORAGE_KEY);
        if (rawMode !== null) {
          const mIdx = parseInt(rawMode, 10);
          if (!Number.isNaN(mIdx) && mIdx >= 0 && mIdx < TREE_LIGHT_MODES.length) {
            this.lightModeIndex = mIdx;
          }
        }
      } catch (e) {
        this.lightModeIndex = 0;
      }
    }

    saveTreeState() {
      try {
        localStorage.setItem(this.GIFTS_STORAGE_KEY, JSON.stringify(this.collectedGifts));
        localStorage.setItem(this.LIGHT_MODE_STORAGE_KEY, String(this.lightModeIndex));
      } catch (e) {}
    }

    getCollectedGiftsCount() {
      return Array.isArray(this.collectedGifts) ? Math.min(this.MAX_GIFTS, this.collectedGifts.length) : 0;
    }

    getCurrentLightMode() {
      return TREE_LIGHT_MODES[this.lightModeIndex] || TREE_LIGHT_MODES[0];
    }

    // Cambiar al siguiente modo de iluminación (1 → 2 → 3 → 4 → 5 → 1)
    cycleTreeLightMode(event) {
      if (event && event.stopPropagation) event.stopPropagation();
      this.lightModeIndex = (this.lightModeIndex + 1) % TREE_LIGHT_MODES.length;
      this.saveTreeState();
      this.applyTreeLightModeDOM(true);
      this.playSoundEffect('pop');
      return this.getCurrentLightMode();
    }

    applyTreeLightModeDOM(animateFeedback = false) {
      if (typeof document === 'undefined') return;
      const mode = this.getCurrentLightMode();
      const treeDock = document.getElementById('xmas-permanent-tree-left');
      if (treeDock) {
        TREE_LIGHT_MODES.forEach((m) => treeDock.classList.remove(`tree-lights-${m.key}`));
        treeDock.classList.add(`tree-lights-${mode.key}`);
        treeDock.setAttribute('data-light-mode', String(mode.id));

        if (animateFeedback) {
          treeDock.classList.remove('tree-mode-switch-pulse');
          void treeDock.offsetWidth;
          treeDock.classList.add('tree-mode-switch-pulse');
        }
      }

      const modeLabelEl = document.getElementById('xmas-tree-light-mode-label');
      if (modeLabelEl) {
        modeLabelEl.textContent = `${mode.icon} ${mode.name}`;
      }

      const modeBtnEl = document.getElementById('btn-xmas-tree-light-mode');
      if (modeBtnEl) {
        modeBtnEl.setAttribute('title', `Modo actual: ${mode.name} (Clic para cambiar efecto de luces)`);
      }
    }

    isEnabled() {
      return this.enabled;
    }

    setEnabled(value) {
      this.enabled = Boolean(value);
      this.savePreference();
      this.updateHeaderButtonUi();

      if (this.enabled) {
        if (!this.timerId && !this.isFlying) {
          this.scheduleNextFlight();
        }
      } else {
        this.clearFlightTimer();
        this.removeCurrentFlyer();
      }
    }

    toggleEnabled() {
      this.setEnabled(!this.enabled);
    }

    updateHeaderButtonUi() {
      if (typeof document === 'undefined') return;
      const btn = document.getElementById('btn-global-santa-toggle');
      const icon = document.getElementById('global-santa-icon');
      const label = document.getElementById('global-santa-label');

      if (!btn) return;

      btn.classList.toggle('santa-active', this.enabled);
      btn.setAttribute('aria-pressed', this.enabled ? 'true' : 'false');

      if (icon) {
        icon.textContent = this.enabled ? '🎅' : '🛷';
      }
      if (label) {
        label.textContent = this.enabled ? 'PAPÁ NOEL ACTIVADO' : 'PAPÁ NOEL DESACTIVADO';
      }

      btn.title = this.enabled
        ? 'Papá Noel activado (Clic para pausar recorridos)'
        : 'Papá Noel desactivado (Clic para activar)';
    }

    bindTabVisibility() {
      if (typeof document === 'undefined') return;
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          // Si estaba volando en segundo plano, limpiar vuelo pero conservar programación
          if (this.isFlying) {
            this.removeCurrentFlyer();
          }
        } else if (this.enabled && !this.timerId && !this.isFlying) {
          this.scheduleNextFlight();
        }
      });
    }

    playSoundEffect(type) {
      try {
        if (global.MagicAudioEngine) {
          if (type === 'victory' && typeof global.MagicAudioEngine.playVictory === 'function') {
            global.MagicAudioEngine.playVictory();
            return;
          }
          if (type === 'bells' && typeof global.MagicAudioEngine.playJingleBells === 'function') {
            global.MagicAudioEngine.playJingleBells();
            return;
          }
          if (type === 'pop' && typeof global.MagicAudioEngine.playPop === 'function') {
            global.MagicAudioEngine.playPop();
            return;
          }
          if (typeof global.MagicAudioEngine.playClick === 'function') {
            global.MagicAudioEngine.playClick();
          }
        }
      } catch (e) {}
    }

    init() {
      if (typeof document === 'undefined') return;

      this.loadTreeState();
      this.ensureGlobalAmbienceLayer();
      this.ensureOverlayContainer();
      this.updateHeaderButtonUi();
      this.applyTreeLightModeDOM(false);
      this.refreshTreeGiftsDOM();
      this.observeActiveScreenContext();
      this.startBityAmbientReactions();

      const btn = document.getElementById('btn-global-santa-toggle');
      if (btn && !btn.dataset.santaBound) {
        btn.dataset.santaBound = 'true';
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleEnabled();
        });
      }

      // No reiniciar el temporizador si ya existe uno corriendo
      if (this.enabled && !this.timerId && !this.isFlying) {
        this.scheduleNextFlight(this.initialDelayMs);
      }
    }

    // =========================================================================
    // 1. CAPA GLOBAL COMPARTIDA DE AMBIENTACIÓN (ÁRBOL GRANDE INTERACTIVO, NIEVE, GUIRNALDAS)
    // =========================================================================
    ensureGlobalAmbienceLayer() {
      if (typeof document === 'undefined') return null;
      let root = document.getElementById('xmas-global-ambience-root');
      if (root) {
        this.ambienceRoot = root;
        return root;
      }

      const mode = this.getCurrentLightMode();
      const giftsCount = this.getCollectedGiftsCount();

      root = document.createElement('div');
      root.id = 'xmas-global-ambience-root';
      root.className = 'xmas-global-ambience-root context-home';
      root.setAttribute('aria-hidden', 'false');

      root.innerHTML = `
        <!-- NIEVE AMBIENTAL GLOBAL (3 capas sutiles con distintos tamaños y velocidades) -->
        <div class="xmas-global-snow-container" aria-hidden="true">
          <div class="xmas-snow-sheet snow-sheet-far"></div>
          <div class="xmas-snow-sheet snow-sheet-mid"></div>
          <div class="xmas-snow-flakes-floating">
            <span class="xmas-flake f-1">❄</span>
            <span class="xmas-flake f-2">❅</span>
            <span class="xmas-flake f-3">❆</span>
            <span class="xmas-flake f-4">❄</span>
            <span class="xmas-flake f-5">❅</span>
            <span class="xmas-flake f-6">❆</span>
            <span class="xmas-flake f-7">❄</span>
            <span class="xmas-flake f-8">❅</span>
            <span class="xmas-flake f-9">❆</span>
            <span class="xmas-flake f-10">❄</span>
            <span class="xmas-flake f-11">❅</span>
            <span class="xmas-flake f-12">❆</span>
          </div>
        </div>

        <!-- GUIRNALDAS Y LUCES NAVIDEÑAS SUPERIORES (Titileo individual desfasado) -->
        <div class="xmas-top-garland-bar" aria-hidden="true">
          ${this.getGarlandLightsSvg()}
        </div>

        <!-- ELEMENTOS DECORATIVOS DE ESQUINA SUPERIOR -->
        <div class="xmas-corner-ornament corner-top-left" aria-hidden="true">
          ${this.getCornerBellsAndPineSvg('left')}
        </div>
        <div class="xmas-corner-ornament corner-top-right" aria-hidden="true">
          ${this.getCornerWreathAndCandySvg('right')}
        </div>

        <!-- 1. ÁRBOL DE NAVIDAD GRANDE E INTERACTIVO (Sector izquierdo, más del doble del tamaño original) -->
        <div class="xmas-permanent-tree-dock tree-dock-left tree-lights-${mode.key}"
          id="xmas-permanent-tree-left"
          data-light-mode="${mode.id}">
          <div class="xmas-tree-visual-stage">
            ${this.getAnimatedChristmasTreeSvg()}
          </div>

          <!-- Panel de Controles e Indicadores junto al Árbol (Botón de 5 Modos de Luces + Contador REGALOS: X/6) -->
          <div class="xmas-tree-hud-bar">
            <button type="button"
              id="btn-xmas-tree-light-mode"
              class="btn-xmas-tree-lights"
              title="Modo actual: ${mode.name} (Clic para cambiar efecto de luces)">
              <span class="btn-lights-icon">💡</span>
              <span class="btn-lights-text" id="xmas-tree-light-mode-label">${mode.icon} ${mode.name}</span>
            </button>

            <div class="xmas-tree-gifts-counter-badge" id="xmas-tree-gifts-counter-badge" title="Regalos navideños conseguidos con Papá Noel">
              <span class="gifts-counter-icon">🎁</span>
              <span class="gifts-counter-text" id="xmas-tree-gifts-counter-text">REGALOS: ${giftsCount}/${this.MAX_GIFTS}</span>
            </div>
          </div>
        </div>

        <!-- ESCENA COMPLEMENTARIA EN ESQUINA INFERIOR DERECHA -->
        <div class="xmas-permanent-tree-dock tree-dock-right" id="xmas-permanent-decor-right" aria-hidden="true">
          <div class="xmas-scene-variant variant-tree-village">
            ${this.getSecondaryVillageTreeSvg()}
          </div>
        </div>
      `;

      document.body.appendChild(root);
      this.ambienceRoot = root;

      const modeBtn = document.getElementById('btn-xmas-tree-light-mode');
      if (modeBtn) {
        modeBtn.addEventListener('click', (e) => this.cycleTreeLightMode(e));
      }

      return root;
    }

    getGarlandLightsSvg() {
      const colors = ['#ef4444', '#22c55e', '#fde047', '#38bdf8', '#f97316', '#a855f7'];
      let bulbsHtml = '';
      for (let i = 0; i < 24; i++) {
        const cx = 30 + i * 60;
        const isPeak = (i % 3 === 0);
        const cy = isPeak ? 12 : 23;
        const col = colors[i % colors.length];
        const animClass = `garland-bulb-anim-${(i % 5) + 1}`;
        bulbsHtml += `
          <g class="garland-bulb-group ${animClass}" style="animation-delay: ${(i * 0.27).toFixed(2)}s;">
            <line x1="${cx}" y1="${cy - 5}" x2="${cx}" y2="${cy}" stroke="#14532d" stroke-width="2"/>
            <rect x="${cx - 2.2}" y="${cy - 2}" width="4.4" height="3" rx="1" fill="#facc15"/>
            <circle cx="${cx}" cy="${cy + 4}" r="7" fill="${col}" opacity="0.28" class="bulb-aura"/>
            <ellipse cx="${cx}" cy="${cy + 4}" rx="3.8" ry="5.2" fill="${col}" class="bulb-core"/>
            <circle cx="${cx - 1.2}" cy="${cy + 2.5}" r="1.3" fill="#ffffff" opacity="0.85"/>
          </g>
        `;
      }

      return `
        <svg viewBox="0 0 1440 42" preserveAspectRatio="none" class="xmas-garland-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="garlandPineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#166534"/>
              <stop offset="100%" stop-color="#052e16"/>
            </linearGradient>
          </defs>
          <path d="M 0,4 Q 90,34 180,6 Q 270,34 360,6 Q 450,34 540,6 Q 630,34 720,6 Q 810,34 900,6 Q 990,34 1080,6 Q 1170,34 1260,6 Q 1350,34 1440,4"
            fill="none" stroke="url(#garlandPineGrad)" stroke-width="8" stroke-linecap="round"/>
          <path d="M 0,4 Q 90,34 180,6 Q 270,34 360,6 Q 450,34 540,6 Q 630,34 720,6 Q 810,34 900,6 Q 990,34 1080,6 Q 1170,34 1260,6 Q 1350,34 1440,4"
            fill="none" stroke="#22c55e" stroke-width="2.2" stroke-dasharray="6 8" opacity="0.65"/>
          <g fill="#dc2626" stroke="#fde047" stroke-width="1">
            <circle cx="180" cy="7" r="4.5"/><circle cx="360" cy="7" r="4.5"/><circle cx="540" cy="7" r="4.5"/>
            <circle cx="720" cy="7" r="4.5"/><circle cx="900" cy="7" r="4.5"/><circle cx="1080" cy="7" r="4.5"/><circle cx="1260" cy="7" r="4.5"/>
          </g>
          ${bulbsHtml}
        </svg>
      `;
    }

    getCornerBellsAndPineSvg() {
      return `
        <svg viewBox="0 0 130 110" class="xmas-corner-svg" xmlns="http://www.w3.org/2000/svg">
          <path d="M 4 8 Q 45 6 88 26 Q 55 24 22 44 Q 14 68 8 92 Z" fill="#15803d" opacity="0.9"/>
          <path d="M 6 6 Q 38 14 72 34" fill="none" stroke="#4ade80" stroke-width="3" stroke-linecap="round"/>
          <g transform="translate(54, 16) rotate(22)" class="xmas-candy-cane">
            <path d="M 8 36 L 8 12 A 7 7 0 0 1 22 12 L 22 17" fill="none" stroke="#ffffff" stroke-width="5.5" stroke-linecap="round"/>
            <path d="M 8 36 L 8 12 A 7 7 0 0 1 22 12 L 22 17" fill="none" stroke="#dc2626" stroke-width="5.5" stroke-dasharray="4 4" stroke-linecap="round"/>
          </g>
          <g class="xmas-swinging-bells" transform="translate(26, 24)">
            <path d="M -8 14 Q 0 2 10 14 L 14 30 Q 1 34 -12 30 Z" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>
            <circle cx="1" cy="31" r="3.5" fill="#d97706"/>
            <path d="M 8 16 Q 16 6 24 16 L 27 30 Q 16 33 6 30 Z" fill="#fde047" stroke="#ca8a04" stroke-width="1.5"/>
            <circle cx="17" cy="31" r="3.2" fill="#d97706"/>
            <path d="M 2 8 L -8 2 L -6 14 Z M 6 8 L 16 2 L 14 14 Z" fill="#dc2626"/>
            <circle cx="4" cy="8" r="3.5" fill="#ef4444" stroke="#fde047" stroke-width="1"/>
          </g>
          <polygon points="88,46 90,52 96,52 91,56 93,62 88,58 83,62 85,56 80,52 86,52" fill="#fde047" class="xmas-twinkle-star"/>
        </svg>
      `;
    }

    getCornerWreathAndCandySvg() {
      return `
        <svg viewBox="0 0 130 110" class="xmas-corner-svg" xmlns="http://www.w3.org/2000/svg">
          <path d="M 126 8 Q 85 6 42 26 Q 75 24 108 44 Q 116 68 122 92 Z" fill="#15803d" opacity="0.9"/>
          <g transform="translate(86, 38)" class="xmas-wreath-group">
            <circle cx="0" cy="0" r="19" fill="none" stroke="#166534" stroke-width="9"/>
            <circle cx="0" cy="0" r="19" fill="none" stroke="#22c55e" stroke-width="4" stroke-dasharray="5 6"/>
            <circle cx="-13" cy="-12" r="2.6" fill="#ef4444" class="tree-light-1"/>
            <circle cx="14" cy="-11" r="2.6" fill="#fde047" class="tree-light-2"/>
            <circle cx="16" cy="9" r="2.6" fill="#38bdf8" class="tree-light-3"/>
            <circle cx="-15" cy="10" r="2.6" fill="#f97316" class="tree-light-4"/>
            <path d="M -3 -18 L -13 -24 L -11 -13 Z M 3 -18 L 13 -24 L 11 -13 Z" fill="#dc2626"/>
            <path d="M -3 -16 L -7 -4 M 3 -16 L 7 -4" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>
            <circle cx="0" cy="-18" r="3.5" fill="#ef4444" stroke="#fde047" stroke-width="1"/>
          </g>
          <polygon points="36,42 38,48 44,48 39,52 41,58 36,54 31,58 33,52 28,48 34,48" fill="#fde047" class="xmas-twinkle-star"/>
        </svg>
      `;
    }

    // Árbol de Navidad grande, detallado y de alta calidad gráfica (viewBox 240x320)
    getAnimatedChristmasTreeSvg() {
      return `
        <svg viewBox="0 0 240 320" class="xmas-permanent-tree-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="treeStarHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
              <stop offset="40%" stop-color="#fde047" stop-opacity="0.75"/>
              <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="treeFoliageDeep" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#15803d"/>
              <stop offset="100%" stop-color="#052e16"/>
            </linearGradient>
            <linearGradient id="treeFoliageMid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#16a34a"/>
              <stop offset="100%" stop-color="#0f3d21"/>
            </linearGradient>
            <linearGradient id="treeFoliageBright" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#22c55e"/>
              <stop offset="100%" stop-color="#14532d"/>
            </linearGradient>
            <linearGradient id="treeBaseSkirt" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#991b1b"/>
              <stop offset="50%" stop-color="#dc2626"/>
              <stop offset="100%" stop-color="#991b1b"/>
            </linearGradient>
          </defs>

          <!-- Alfombra y base decorativa navideña bajo el árbol -->
          <ellipse cx="120" cy="292" rx="108" ry="18" fill="#e2e8f0" opacity="0.92"/>
          <ellipse cx="120" cy="290" rx="96" ry="13" fill="#ffffff"/>
          <ellipse cx="120" cy="285" rx="68" ry="10" fill="url(#treeBaseSkirt)" stroke="#ffd700" stroke-width="2"/>

          <!-- Tronco de madera con textura -->
          <rect x="103" y="238" width="34" height="46" rx="5" fill="#78350f" stroke="#451a03" stroke-width="2.2"/>
          <path d="M 112 242 L 112 280 M 126 244 L 126 280" stroke="#451a03" stroke-width="1.6" opacity="0.6"/>

          <!-- 4 Niveles de Ramas de Pino frondosas con nieve en las puntas -->
          <!-- Nivel 4 (Base ancha) -->
          <path d="M 120,142 L 18,252 Q 45,260 72,250 Q 96,262 120,250 Q 144,262 168,250 Q 195,260 222,252 Z"
            fill="url(#treeFoliageDeep)" stroke="#14532d" stroke-width="2"/>
          <path d="M 24,250 Q 48,238 72,249 Q 96,238 120,249 Q 144,238 168,249 Q 192,238 216,250"
            fill="none" stroke="#ffffff" stroke-width="5.5" stroke-linecap="round"/>

          <!-- Nivel 3 (Medio-bajo) -->
          <path d="M 120,102 L 32,204 Q 60,212 90,202 Q 120,214 150,202 Q 180,212 208,204 Z"
            fill="url(#treeFoliageMid)" stroke="#166534" stroke-width="2"/>
          <path d="M 38,202 Q 65,191 92,201 Q 120,191 148,201 Q 175,191 202,202"
            fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>

          <!-- Nivel 2 (Medio-alto) -->
          <path d="M 120,66 L 48,154 Q 84,164 120,152 Q 156,164 192,154 Z"
            fill="url(#treeFoliageBright)" stroke="#15803d" stroke-width="2"/>
          <path d="M 54,152 Q 86,142 120,151 Q 154,142 186,152"
            fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>

          <!-- Nivel 1 (Copa) -->
          <path d="M 120,32 L 68,104 Q 94,112 120,102 Q 146,112 172,104 Z"
            fill="url(#treeFoliageBright)" stroke="#15803d" stroke-width="2"/>
          <path d="M 73,102 Q 96,94 120,101 Q 144,94 167,102"
            fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>

          <!-- Guirnaldas doradas y perladas envolviendo el árbol -->
          <path d="M 80,82 Q 120,104 162,80" fill="none" stroke="#fde047" stroke-width="3" stroke-dasharray="5 5" stroke-linecap="round"/>
          <path d="M 60,128 Q 120,156 180,124" fill="none" stroke="#fde047" stroke-width="3.2" stroke-dasharray="5 5" stroke-linecap="round"/>
          <path d="M 44,178 Q 120,210 196,174" fill="none" stroke="#fde047" stroke-width="3.5" stroke-dasharray="6 5" stroke-linecap="round"/>
          <path d="M 28,228 Q 120,262 212,224" fill="none" stroke="#fde047" stroke-width="3.8" stroke-dasharray="6 5" stroke-linecap="round"/>

          <!-- Esferas y adornos navideños clásicos -->
          <g class="xmas-tree-baubles">
            <circle cx="102" cy="76" r="5" fill="#dc2626" stroke="#fde047" stroke-width="1"/>
            <circle cx="140" cy="86" r="5" fill="#0284c7" stroke="#fde047" stroke-width="1"/>
            <circle cx="84" cy="126" r="5.8" fill="#d97706" stroke="#fef08a" stroke-width="1"/>
            <circle cx="156" cy="130" r="5.8" fill="#dc2626" stroke="#fde047" stroke-width="1"/>
            <circle cx="68" cy="178" r="6.2" fill="#9333ea" stroke="#fde047" stroke-width="1"/>
            <circle cx="122" cy="172" r="6.2" fill="#dc2626" stroke="#fde047" stroke-width="1"/>
            <circle cx="174" cy="182" r="6.2" fill="#0284c7" stroke="#fde047" stroke-width="1"/>
            <circle cx="54" cy="228" r="6.5" fill="#dc2626" stroke="#fde047" stroke-width="1"/>
            <circle cx="146" cy="226" r="6.5" fill="#16a34a" stroke="#fde047" stroke-width="1"/>
            <circle cx="188" cy="232" r="6.5" fill="#d97706" stroke="#fef08a" stroke-width="1"/>
          </g>

          <!-- 22 Luces Navideñas Multicolores (Controladas dinámicamente por los 5 modos) -->
          <g class="xmas-tree-lights" id="xmas-tree-lights-group">
            <circle cx="120" cy="58" r="5" fill="#ef4444" class="tree-light tree-light-1" style="--l-idx: 1;"/>
            <circle cx="94" cy="68" r="5" fill="#fde047" class="tree-light tree-light-2" style="--l-idx: 2;"/>
            <circle cx="146" cy="70" r="5" fill="#38bdf8" class="tree-light tree-light-3" style="--l-idx: 3;"/>
            <circle cx="118" cy="90" r="5.2" fill="#22c55e" class="tree-light tree-light-4" style="--l-idx: 4;"/>

            <circle cx="76" cy="112" r="5.4" fill="#f97316" class="tree-light tree-light-5" style="--l-idx: 5;"/>
            <circle cx="106" cy="116" r="5.4" fill="#a855f7" class="tree-light tree-light-1" style="--l-idx: 6;"/>
            <circle cx="136" cy="114" r="5.4" fill="#fde047" class="tree-light tree-light-2" style="--l-idx: 7;"/>
            <circle cx="164" cy="116" r="5.4" fill="#ef4444" class="tree-light tree-light-3" style="--l-idx: 8;"/>

            <circle cx="62" cy="144" r="5.6" fill="#38bdf8" class="tree-light tree-light-4" style="--l-idx: 9;"/>
            <circle cx="96" cy="142" r="5.6" fill="#fde047" class="tree-light tree-light-5" style="--l-idx: 10;"/>
            <circle cx="126" cy="146" r="5.6" fill="#ef4444" class="tree-light tree-light-1" style="--l-idx: 11;"/>
            <circle cx="152" cy="142" r="5.6" fill="#22c55e" class="tree-light tree-light-2" style="--l-idx: 12;"/>
            <circle cx="178" cy="146" r="5.6" fill="#fde047" class="tree-light tree-light-3" style="--l-idx: 13;"/>

            <circle cx="48" cy="192" r="5.8" fill="#ef4444" class="tree-light tree-light-4" style="--l-idx: 14;"/>
            <circle cx="86" cy="188" r="5.8" fill="#38bdf8" class="tree-light tree-light-5" style="--l-idx: 15;"/>
            <circle cx="114" cy="194" r="5.8" fill="#fde047" class="tree-light tree-light-1" style="--l-idx: 16;"/>
            <circle cx="144" cy="190" r="5.8" fill="#a855f7" class="tree-light tree-light-2" style="--l-idx: 17;"/>
            <circle cx="190" cy="194" r="5.8" fill="#22c55e" class="tree-light tree-light-3" style="--l-idx: 18;"/>

            <circle cx="38" cy="238" r="6" fill="#fde047" class="tree-light tree-light-4" style="--l-idx: 19;"/>
            <circle cx="76" cy="234" r="6" fill="#ef4444" class="tree-light tree-light-5" style="--l-idx: 20;"/>
            <circle cx="118" cy="236" r="6" fill="#38bdf8" class="tree-light tree-light-1" style="--l-idx: 21;"/>
            <circle cx="166" cy="236" r="6" fill="#fde047" class="tree-light tree-light-2" style="--l-idx: 22;"/>
          </g>

          <!-- Gran Estrella Superior en la Punta del Árbol -->
          <g transform="translate(120, 26)" class="xmas-tree-top-star">
            <circle cx="0" cy="0" r="30" fill="url(#treeStarHalo)" class="tree-star-aura"/>
            <polygon points="0,-21 6,-7 21,-7 9,2 13,18 0,9 -13,18 -9,2 -21,-7 -6,-7"
              fill="#ffd700" stroke="#ffffff" stroke-width="1.8"/>
            <polygon points="0,-11 3,-3 11,-3 5,1 7,9 0,4 -7,9 -5,1 -11,-3 -3,-3"
              fill="#fef08a"/>
            <circle cx="0" cy="0" r="4.5" fill="#ffffff"/>
          </g>

          <!-- Pequeña cantidad de regalos iniciales decorativos junto al tronco (2 regalos base) -->
          <g class="xmas-tree-initial-gifts">
            <!-- Regalo inicial izquierdo junto al tronco -->
            <g transform="translate(86, 260)">
              <rect x="0" y="4" width="24" height="20" rx="3" fill="#b91c1c" stroke="#fde047" stroke-width="1.2"/>
              <rect x="10" y="4" width="4" height="20" fill="#ffd700"/>
              <rect x="0" y="12" width="24" height="4" fill="#ffd700"/>
            </g>
            <!-- Regalo inicial derecho junto al tronco -->
            <g transform="translate(128, 262)">
              <rect x="0" y="4" width="22" height="18" rx="3" fill="#15803d" stroke="#fde047" stroke-width="1.2"/>
              <rect x="9" y="4" width="4" height="18" fill="#ef4444"/>
              <rect x="0" y="11" width="22" height="3.5" fill="#ef4444"/>
            </g>
          </g>

          <!-- Grupo Dinámico para los 6 Regalos Coleccionables entregados por Papá Noel -->
          <g id="xmas-tree-collected-gifts-group" class="xmas-tree-collected-gifts">
            ${this.renderCollectedGiftsSvgNodes()}
          </g>
        </svg>
      `;
    }

    renderCollectedGiftsSvgNodes() {
      const count = this.getCollectedGiftsCount();
      let svgNodes = '';

      for (let i = 0; i < count; i++) {
        const slotId = this.collectedGifts[i];
        const design = COLLECTIBLE_GIFT_DESIGNS.find(d => d.slot === slotId) || COLLECTIBLE_GIFT_DESIGNS[i];
        if (!design) continue;

        svgNodes += `
          <g transform="translate(${design.x}, ${design.y})"
            class="xmas-collected-gift-node"
            data-gift-slot="${design.slot}">
            <rect x="0" y="6" width="${design.w}" height="${design.h}" rx="4"
              fill="${design.boxColor}" stroke="${design.borderColor}" stroke-width="1.6"/>
            <rect x="${Math.round(design.w / 2) - 3}" y="6" width="6" height="${design.h}" fill="${design.ribbonColor}"/>
            <rect x="0" y="${Math.round(design.h / 2) + 3}" width="${design.w}" height="5" fill="${design.ribbonColor}"/>
            <path d="M ${Math.round(design.w / 2)},6 Q ${Math.round(design.w / 2) - 9},-3 ${Math.round(design.w / 2) - 11},5 Q ${Math.round(design.w / 2)},8 ${Math.round(design.w / 2)},6 M ${Math.round(design.w / 2)},6 Q ${Math.round(design.w / 2) + 9},-3 ${Math.round(design.w / 2) + 11},5 Q ${Math.round(design.w / 2)},8 ${Math.round(design.w / 2)},6"
              fill="${design.bowColor}" stroke="#ffffff" stroke-width="0.9"/>
            <circle cx="${Math.round(design.w / 2)}" cy="6" r="2.8" fill="#ffffff"/>
          </g>
        `;
      }

      return svgNodes;
    }

    refreshTreeGiftsDOM() {
      if (typeof document === 'undefined') return;
      const giftsGroup = document.getElementById('xmas-tree-collected-gifts-group');
      if (giftsGroup) {
        giftsGroup.innerHTML = this.renderCollectedGiftsSvgNodes();
      }
      const count = this.getCollectedGiftsCount();
      const counterText = document.getElementById('xmas-tree-gifts-counter-text');
      if (counterText) {
        counterText.textContent = `REGALOS: ${count}/${this.MAX_GIFTS}`;
      }
      const counterBadge = document.getElementById('xmas-tree-gifts-counter-badge');
      if (counterBadge) {
        counterBadge.classList.toggle('gifts-complete', count >= this.MAX_GIFTS);
      }
    }

    getSecondaryVillageTreeSvg() {
      return `
        <svg viewBox="0 0 210 190" class="xmas-secondary-scene-svg" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="105" cy="174" rx="94" ry="13" fill="#e2e8f0" opacity="0.88"/>
          <ellipse cx="105" cy="172" rx="84" ry="9" fill="#ffffff"/>

          <g transform="translate(118, 28)">
            <rect x="33" y="114" width="14" height="24" rx="2" fill="#78350f"/>
            <polygon points="40,56 4,120 76,120" fill="#15803d" stroke="#166534" stroke-width="1.5"/>
            <polygon points="40,30 12,86 68,86" fill="#16a34a" stroke="#15803d" stroke-width="1.5"/>
            <polygon points="40,8 22,52 58,52" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
            <polygon points="40,-4 43,3 50,3 44,7 46,14 40,10 34,14 36,7 30,3 37,3" fill="#ffd700" class="xmas-twinkle-star"/>
            <circle cx="32" cy="42" r="3.5" fill="#ef4444" class="tree-light-2"/>
            <circle cx="48" cy="66" r="3.8" fill="#fde047" class="tree-light-4"/>
            <circle cx="26" cy="74" r="3.8" fill="#38bdf8" class="tree-light-1"/>
            <circle cx="54" cy="102" r="4" fill="#ef4444" class="tree-light-3"/>
            <circle cx="28" cy="104" r="4" fill="#fde047" class="tree-light-5"/>
          </g>

          <g transform="translate(22, 88)">
            <rect x="8" y="34" width="66" height="50" rx="4" fill="#991b1b" stroke="#fde047" stroke-width="1.5"/>
            <rect x="54" y="10" width="11" height="22" fill="#78350f"/>
            <circle cx="60" cy="4" r="3.5" fill="#e2e8f0" opacity="0.7" class="chimney-smoke-1"/>
            <circle cx="64" cy="-4" r="5" fill="#e2e8f0" opacity="0.5" class="chimney-smoke-2"/>
            <polygon points="0,36 41,6 82,36" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
            <rect x="16" y="46" width="16" height="18" rx="3" fill="#fde047" class="house-window-glow"/>
            <rect x="50" y="46" width="16" height="18" rx="3" fill="#fde047" class="house-window-glow"/>
            <rect x="35" y="56" width="12" height="28" rx="2" fill="#14532d" stroke="#fde047" stroke-width="1"/>
            <circle cx="41" cy="65" r="4" fill="none" stroke="#22c55e" stroke-width="2"/>
          </g>

          <g transform="translate(106, 118)" class="xmas-snowman-char">
            <circle cx="0" cy="36" r="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.4"/>
            <circle cx="0" cy="14" r="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.4"/>
            <circle cx="0" cy="-4" r="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.4"/>
            <circle cx="-3" cy="-6" r="1.4" fill="#0f172a"/>
            <circle cx="3" cy="-6" r="1.4" fill="#0f172a"/>
            <polygon points="0,-4 8,-2 0,0" fill="#ea580c"/>
            <rect x="-8" y="3" width="16" height="4.5" rx="2" fill="#dc2626"/>
            <rect x="2" y="5" width="4" height="10" rx="1.5" fill="#dc2626"/>
            <rect x="-9" y="-13" width="18" height="3" rx="1" fill="#1e293b"/>
            <rect x="-6" y="-22" width="12" height="10" rx="1.5" fill="#0f172a"/>
          </g>
        </svg>
      `;
    }

    // =========================================================================
    // 2. ADAPTACIÓN INTELIGENTE SEGÚN LA PANTALLA ACTIVA
    // =========================================================================
    observeActiveScreenContext() {
      if (typeof document === 'undefined') return;

      const updateContext = () => {
        const activeScreen = document.querySelector('.screen.active');
        const screenId = activeScreen ? activeScreen.id : 'screen-home';
        this.currentScreenId = screenId;

        if (!this.ambienceRoot) return;

        const isWorkspaceScreen = [
          'screen-coding-topic',
          'screen-coding-algorithms',
          'screen-coding-repeticiones',
          'screen-coding-adventure',
          'screen-bityblockly',
          'screen-game',
          'screen-editor'
        ].includes(screenId);

        this.ambienceRoot.classList.toggle('context-workspace', isWorkspaceScreen);
        this.ambienceRoot.classList.toggle('context-home', !isWorkspaceScreen);
        this.ambienceRoot.setAttribute('data-active-screen', screenId);
      };

      updateContext();

      if (typeof MutationObserver !== 'undefined') {
        this.screenObserver = new MutationObserver(() => updateContext());
        document.querySelectorAll('.screen').forEach((sc) => {
          this.screenObserver.observe(sc, { attributes: true, attributeFilter: ['class'] });
        });
      }
    }

    // =========================================================================
    // 3. ANIMACIONES AMBIENTALES Y REACCIONES DE BITY
    // =========================================================================
    startBityAmbientReactions() {
      if (typeof document === 'undefined') return;
      if (this.bityReactionTimerId) clearInterval(this.bityReactionTimerId);

      const reactions = ['bity-xmas-wave', 'bity-xmas-hop', 'bity-xmas-look-tree'];
      let rIdx = 0;

      this.bityReactionTimerId = setInterval(() => {
        if (document.hidden) return;
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const cls = reactions[rIdx % reactions.length];
        rIdx++;
        this.triggerBityReaction(cls, 2200);
      }, 15000);
    }

    triggerBityReaction(reactionClass = 'bity-xmas-react-santa', durationMs = 2800) {
      if (typeof document === 'undefined') return;
      const bitySelectors = [
        '.h-bitty-figure-wrapper',
        '.rep-welcome-bity-stage',
        '.rep-concept-bity',
        '.ex-prompt-bity-svg',
        '.byte-avatar',
        '#bity-guide-avatar-container',
        '.alg-bity-avatar-wrap'
      ];

      const els = document.querySelectorAll(bitySelectors.join(','));
      els.forEach((el) => {
        el.classList.remove('bity-xmas-wave', 'bity-xmas-hop', 'bity-xmas-look-tree', 'bity-xmas-react-santa');
        void el.offsetWidth;
        el.classList.add(reactionClass);
        setTimeout(() => {
          el.classList.remove(reactionClass);
        }, durationMs);
      });
    }

    // =========================================================================
    // 4. PAPÁ NOEL, SU CARROZA REAL Y SUS RENOS (ILUSTRACIÓN MEJORADA + 4 RECORRIDOS)
    // =========================================================================
    ensureOverlayContainer() {
      if (typeof document === 'undefined') return null;
      let c = document.getElementById('magic-santa-container');
      if (!c) {
        c = document.createElement('div');
        c.id = 'magic-santa-container';
        c.className = 'magic-santa-overlay';
        c.setAttribute('aria-hidden', 'false');
        document.body.appendChild(c);
      }
      this.overlayContainer = c;
      return c;
    }

    clearFlightTimer() {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
      if (this.flightEndTimerId) {
        clearTimeout(this.flightEndTimerId);
        this.flightEndTimerId = null;
      }
    }

    scheduleNextFlight(delayMs) {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
      if (!this.enabled) return;

      // Intervalos aleatorios largos de 4 a 7 minutos (240.000ms a 420.000ms)
      const delay = (typeof delayMs === 'number')
        ? delayMs
        : Math.round(this.minIntervalMs + Math.random() * (this.maxIntervalMs - this.minIntervalMs));

      this.timerId = setTimeout(() => {
        this.timerId = null;
        this.launchSantaFlight();
      }, delay);
    }

    getRandomMessage() {
      if (this.getCollectedGiftsCount() >= this.MAX_GIFTS) {
        return '¡JO JO JO! ¡TU ARBOLITO YA TIENE LOS 6 REGALOS DE NAVIDAD! 🎄🏆';
      }
      let idx;
      do {
        idx = Math.floor(Math.random() * this.santaMessages.length);
      } while (idx === this.lastMsgIndex && this.santaMessages.length > 1);
      this.lastMsgIndex = idx;
      return this.santaMessages[idx];
    }

    // Selección aleatoria entre los 4 recorridos evitando repetir siempre el mismo
    chooseRandomRoute(forcedRoute = null) {
      if (forcedRoute && SANTA_ROUTES.includes(forcedRoute)) {
        this.lastRoute = forcedRoute;
        return forcedRoute;
      }
      if (forcedRoute === 'ltr') {
        this.lastRoute = 'top-ltr';
        return 'top-ltr';
      }
      if (forcedRoute === 'rtl') {
        this.lastRoute = 'top-rtl';
        return 'top-rtl';
      }

      const candidates = SANTA_ROUTES.filter(r => r !== this.lastRoute);
      const chosen = candidates[Math.floor(Math.random() * candidates.length)] || 'top-ltr';
      this.lastRoute = chosen;
      return chosen;
    }

    // Ilustración detallada y artística de un reno con cuerpo, patas articuladas, cornamenta, cola y arnés dorado
    renderDetailedReindeerSvg(idSuffix, isRudolph = false) {
      return `
        <!-- Patas traseras articuladas -->
        <path d="M 12 36 Q 6 44 0 54 L 4 56 Q 11 46 17 38 Z" fill="#5c340e"/>
        <path d="M 18 37 Q 14 46 10 56 L 14 57 Q 19 48 23 38 Z" fill="url(#reindeerCoatGrad)"/>
        <!-- Pezuñas traseras -->
        <path d="M -1 54 L 4 56 L 2 58 L -2 56 Z M 9 56 L 14 57 L 13 59 L 8 58 Z" fill="#271505"/>

        <!-- Patas delanteras articuladas en galope -->
        <path d="M 42 36 Q 50 43 58 51 L 55 54 Q 47 46 38 39 Z" fill="#5c340e"/>
        <path d="M 46 34 Q 56 40 65 47 L 62 50 Q 53 43 42 37 Z" fill="url(#reindeerCoatGrad)"/>
        <!-- Pezuñas delanteras -->
        <path d="M 58 51 L 60 53 L 57 55 L 55 54 Z M 65 47 L 67 49 L 64 51 L 62 50 Z" fill="#271505"/>

        <!-- Cola con interior crema -->
        <path d="M 8 25 Q 0 21 -2 27 Q 3 31 10 29 Z" fill="#fef3c7" stroke="#78350f" stroke-width="1"/>

        <!-- Torso y lomo anatómico del reno -->
        <path d="M 10 28 Q 8 20 18 19 L 40 20 Q 49 20 48 30 Q 47 39 36 38 L 16 37 Q 10 36 10 28 Z" fill="url(#reindeerCoatGrad)" stroke="#451a03" stroke-width="1"/>
        <!-- Pecho y vientre claro -->
        <path d="M 16 35 Q 28 38 42 35 Q 36 39 18 37 Z" fill="#fde68a" opacity="0.65"/>

        <!-- Cuello erguido y cabeza detallada -->
        <path d="M 38 24 Q 44 12 49 7 L 57 9 Q 55 21 46 31 Z" fill="url(#reindeerCoatGrad)"/>
        <!-- Hocico y cabeza -->
        <path d="M 47 8 Q 53 3 61 6 Q 68 9 67 14 Q 65 19 56 18 L 48 16 Z" fill="url(#reindeerCoatGrad)" stroke="#451a03" stroke-width="0.9"/>
        <path d="M 57 12 Q 65 11 66 15 Q 63 18 56 17 Z" fill="#fde68a" opacity="0.55"/>

        <!-- Orejas -->
        <path d="M 47 7 Q 42 1 45 -1 Q 50 1 50 7 Z" fill="#78350f" stroke="#fde68a" stroke-width="0.7"/>
        <path d="M 51 6 Q 48 0 51 -1 Q 54 1 53 6 Z" fill="#92400e"/>

        <!-- Cornamentas ramificadas realistas -->
        <path d="M 50 5 Q 46 -5 49 -14 M 48 -4 L 41 -8 M 48 -9 L 43 -13 M 49 -10 L 55 -13"
          fill="none" stroke="url(#antlerGoldGrad)" stroke-width="2.3" stroke-linecap="round"/>
        <path d="M 53 5 Q 52 -4 57 -11 M 54 -3 L 60 -6"
          fill="none" stroke="url(#antlerGoldGrad)" stroke-width="1.9" stroke-linecap="round"/>

        <!-- Ojo expresivo con brillo -->
        <circle cx="56" cy="9.5" r="2" fill="#1e293b"/>
        <circle cx="56.6" cy="8.9" r="0.8" fill="#ffffff"/>

        <!-- Arnés navideño rojo con cascabeles dorados y montura festiva -->
        <path d="M 24 19 Q 28 30 33 19 Z" fill="#dc2626" stroke="#ffd700" stroke-width="1.2"/>
        <path d="M 39 21 Q 45 27 49 25" fill="none" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="42" cy="24" r="2.5" fill="#ffd700" stroke="#b45309" stroke-width="0.8"/>
        <circle cx="46" cy="26" r="2.5" fill="#ffd700" stroke="#b45309" stroke-width="0.8"/>

        <!-- Nariz (Roja luminosa para Rodolfo, oscura brillante para los demás) -->
        ${isRudolph
          ? `<circle cx="67" cy="11.5" r="4.2" fill="#ef4444" class="rudolph-nose-glow"/>
             <circle cx="66" cy="10.5" r="1.4" fill="#ffffff" opacity="0.9"/>`
          : `<circle cx="66.5" cy="11.5" r="2.6" fill="#1e293b"/>
             <circle cx="66" cy="10.8" r="0.8" fill="#ffffff" opacity="0.7"/>`}
      `;
    }

    getSantaSvg() {
      return `
        <svg viewBox="0 0 470 140" xmlns="http://www.w3.org/2000/svg" class="santa-sleigh-svg">
          <defs>
            <linearGradient id="sleighRedVelvet" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#ef4444"/>
              <stop offset="55%" stop-color="#dc2626"/>
              <stop offset="100%" stop-color="#7f1d1d"/>
            </linearGradient>
            <linearGradient id="sleighInteriorWood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#78350f"/>
              <stop offset="100%" stop-color="#451a03"/>
            </linearGradient>
            <linearGradient id="goldTrim" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#fef08a"/>
              <stop offset="50%" stop-color="#facc15"/>
              <stop offset="100%" stop-color="#ca8a04"/>
            </linearGradient>
            <linearGradient id="reindeerCoatGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#b45309"/>
              <stop offset="65%" stop-color="#92400e"/>
              <stop offset="100%" stop-color="#5c340e"/>
            </linearGradient>
            <linearGradient id="antlerGoldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#fef08a"/>
              <stop offset="100%" stop-color="#d97706"/>
            </linearGradient>
          </defs>

          <!-- ESTELA MÁGICA DE ESTRELLAS Y DESTELLOS DETRÁS DE LA CARROZA -->
          <g class="santa-magic-sparkles">
            <polygon points="16,28 18.5,34 25,34 19.5,38 21.5,44 16,40 10.5,44 12.5,38 7,34 13.5,34" fill="#fde047"/>
            <polygon points="6,64 8,69 13,69 9,72 10.5,77 6,74 1.5,77 3,72 -1,69 4,69" fill="#fef08a"/>
            <circle cx="24" cy="82" r="2.6" fill="#ffffff"/>
            <circle cx="10" cy="46" r="2.2" fill="#67e8f9"/>
            <circle cx="30" cy="22" r="2" fill="#fde047"/>
          </g>

          <!-- RIENDAS DORADAS DOBLES CONECTANDO LA CARROZA CON LOS 3 RENOS -->
          <path d="M 156 66 Q 215 54 270 60 Q 332 54 398 56" fill="none" stroke="url(#goldTrim)" stroke-width="2.5" stroke-dasharray="6 3"/>
          <path d="M 154 72 Q 215 62 270 66 Q 332 60 396 61" fill="none" stroke="#f59e0b" stroke-width="1.5" opacity="0.8"/>

          <!-- 1. RENO LÍDER: RODOLFO -->
          <g transform="translate(362, 34)" class="reindeer-group reindeer-rudolph">
            ${this.renderDetailedReindeerSvg('rudolph', true)}
          </g>

          <!-- 2. SEGUNDO RENO DEL EQUIPO -->
          <g transform="translate(284, 40)" class="reindeer-group reindeer-second">
            ${this.renderDetailedReindeerSvg('second', false)}
          </g>

          <!-- 3. TERCER RENO DEL EQUIPO -->
          <g transform="translate(206, 36)" class="reindeer-group reindeer-third">
            ${this.renderDetailedReindeerSvg('third', false)}
          </g>

          <!-- 4. CARROZA / TRINEO REAL DE PAPÁ NOEL Y SACO DE REGALOS -->
          <g transform="translate(28, 22)" class="santa-carriage-group">
            <!-- Patines de hierro forjado dorado con volutas barrocas -->
            <path d="M 6 92 C 35 92, 95 92, 130 92 C 148 92, 158 80, 154 68 C 151 60, 141 62, 144 70 C 146 76, 138 83, 126 83 L 14 83 C 6 83, 2 77, 6 72"
              fill="none" stroke="url(#goldTrim)" stroke-width="4.5" stroke-linecap="round"/>
            <!-- Soportes verticales ornamentales de los patines -->
            <path d="M 32 83 L 32 66 M 68 83 L 68 68 M 106 83 L 106 66" stroke="url(#goldTrim)" stroke-width="3.5" stroke-linecap="round"/>

            <!-- Interior de madera noble del trineo -->
            <path d="M 18 52 Q 22 30 48 32 L 116 38 Q 134 40 138 56 Z" fill="url(#sleighInteriorWood)" stroke="#ca8a04" stroke-width="1.5"/>

            <!-- Gran saco de arpillera roja y dorada repleto de paquetes y juguetes -->
            <g class="sleigh-gift-sack">
              <path d="M 14 54 Q 8 20 34 15 Q 58 12 62 48 Z" fill="#991b1b" stroke="#fde047" stroke-width="2"/>
              <!-- Regalos detallados asomando del saco -->
              <g transform="translate(22, 6) rotate(-8)">
                <rect x="0" y="0" width="18" height="16" rx="2.5" fill="#16a34a" stroke="#ffffff" stroke-width="1.2"/>
                <rect x="7" y="0" width="4" height="16" fill="#ffd700"/>
                <rect x="0" y="6" width="18" height="3.5" fill="#ffd700"/>
              </g>
              <g transform="translate(38, 10) rotate(10)">
                <rect x="0" y="0" width="16" height="15" rx="2.5" fill="#0284c7" stroke="#ffffff" stroke-width="1.2"/>
                <rect x="6" y="0" width="3.5" height="15" fill="#fef08a"/>
                <rect x="0" y="6" width="16" height="3" fill="#fef08a"/>
              </g>
              <g transform="translate(15, 16) rotate(-15)">
                <rect x="0" y="0" width="14" height="13" rx="2" fill="#9333ea" stroke="#ffffff" stroke-width="1"/>
                <rect x="5.5" y="0" width="3" height="13" fill="#fde047"/>
              </g>
            </g>

            <!-- PAPÁ NOEL DETALLADO (Traje rojo con bordes de piel blanca, rostro amigable, gafas, barba tupida y gorro) -->
            <g class="santa-character-figure" transform="translate(56, 2)">
              <!-- Torso con abrigo rojo y ribete blanco de piel -->
              <path d="M 6 48 Q 8 24 26 24 Q 44 24 46 48 Z" fill="url(#sleighRedVelvet)" stroke="#7f1d1d" stroke-width="1.2"/>
              <rect x="22" y="25" width="8" height="24" rx="3" fill="#ffffff"/>
              <!-- Cinturón de cuero negro con hebilla dorada -->
              <rect x="8" y="39" width="36" height="6" rx="2" fill="#18181b"/>
              <rect x="21" y="37.5" width="10" height="9" rx="1.5" fill="url(#goldTrim)" stroke="#78350f" stroke-width="0.8"/>
              <rect x="23.5" y="39.5" width="5" height="5" fill="#18181b"/>

              <!-- Rostro cálido y expresivo -->
              <circle cx="26" cy="18" r="10.5" fill="#fed7aa" stroke="#fDBA74" stroke-width="0.8"/>
              <!-- Mejillas sonrosadas -->
              <circle cx="19.5" cy="20" r="2.4" fill="#fb7185" opacity="0.65"/>
              <circle cx="32.5" cy="20" r="2.4" fill="#fb7185" opacity="0.65"/>

              <!-- Ojos alegres, cejas blancas y gafas doradas -->
              <path d="M 19 13.5 Q 22 12 24 13.5 M 28 13.5 Q 30 12 33 13.5" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
              <circle cx="21.5" cy="16" r="1.5" fill="#1e293b"/>
              <circle cx="30.5" cy="16" r="1.5" fill="#1e293b"/>
              <circle cx="21.5" cy="16" r="3.4" fill="none" stroke="#ffd700" stroke-width="1"/>
              <circle cx="30.5" cy="16" r="3.4" fill="none" stroke="#ffd700" stroke-width="1"/>
              <line x1="24.9" y1="16" x2="27.1" y2="16" stroke="#ffd700" stroke-width="1"/>

              <!-- Nariz redonda -->
              <circle cx="26" cy="18.5" r="2.4" fill="#f87171"/>

              <!-- Gran barba blanca ondulada y bigote -->
              <path d="M 15 20 Q 12 30 18 35 Q 26 41 34 35 Q 40 30 37 20 Q 32 24 26 24 Q 20 24 15 20 Z"
                fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
              <path d="M 18 21.5 Q 22 25 26 22 Q 30 25 34 21.5 Q 31 19 26 20.5 Q 21 19 18 21.5 Z"
                fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.8"/>
              <!-- Sonrisa visible bajo el bigote -->
              <path d="M 23 24 Q 26 26.5 29 24" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round"/>

              <!-- Gorro navideño clásico con banda de piel blanca y pompón -->
              <path d="M 14 12 Q 26 3 38 12 C 36 0, 18 -4, 6 6 C 2 9, 0 14, 3 16 Z" fill="url(#sleighRedVelvet)" stroke="#991b1b" stroke-width="1"/>
              <rect x="13" y="9.5" width="26" height="6" rx="3" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
              <circle cx="2" cy="15" r="4.8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>

              <!-- Brazo saludando y entregando regalos (con puño blanco y manopla verde) -->
              <g class="santa-waving-arm">
                <path d="M 38 30 Q 52 21 48 9" fill="none" stroke="url(#sleighRedVelvet)" stroke-width="7" stroke-linecap="round"/>
                <rect x="43" y="10" width="9" height="4" rx="2" fill="#ffffff" transform="rotate(-18 47 12)"/>
                <circle cx="48" cy="7.5" r="4.5" fill="#15803d" stroke="#ffffff" stroke-width="1.2"/>
              </g>
            </g>

            <!-- Carrocería lateral esculpida del trineo con molduras doradas -->
            <path d="M 10 54 C 4 34, 24 28, 38 38 L 96 42 C 114 42, 124 30, 138 34 C 146 37, 146 56, 132 66 L 20 66 C 12 66, 11 60, 10 54 Z"
              fill="url(#sleighRedVelvet)" stroke="url(#goldTrim)" stroke-width="3"/>
            <!-- Arabescos y filigranas doradas en el lateral de la carroza -->
            <path d="M 24 52 Q 55 62 92 52 Q 112 47 128 53" fill="none" stroke="url(#goldTrim)" stroke-width="2.6" stroke-linecap="round"/>
            <path d="M 32 58 Q 68 65 112 58" fill="none" stroke="#fef08a" stroke-width="1.4" stroke-dasharray="3 3"/>
            <circle cx="74" cy="54" r="4.5" fill="#ffd700" stroke="#ffffff" stroke-width="1"/>
            <circle cx="74" cy="54" r="2" fill="#dc2626"/>
            <!-- Farolito navideño cálido en la proa del trineo -->
            <circle cx="141" cy="42" r="4.5" fill="#fef08a" stroke="#ca8a04" stroke-width="1.4" class="tree-light-1"/>
          </g>
        </svg>
      `;
    }

    launchSantaFlight(forcedRoute = null) {
      if (!this.enabled || this.isFlying) return false;
      if (typeof document === 'undefined') return false;

      const container = this.ensureOverlayContainer();
      if (!container) return false;

      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.scheduleNextFlight();
        return false;
      }

      // Garantizar que no exista ningún otro trineo en el DOM (evita duplicados)
      const existingFlyers = container.querySelectorAll('.santa-flight-wrapper');
      existingFlyers.forEach(el => el.remove());

      this.isFlying = true;
      this.currentFlightGiftDropped = false;
      this.flightCount++;

      // Elegir uno de los 4 recorridos posibles (top-ltr, top-rtl, bottom-ltr, bottom-rtl)
      const route = this.chooseRandomRoute(forcedRoute);
      const isRtl = route.endsWith('rtl');
      const isBottom = route.startsWith('bottom');
      const dir = isRtl ? 'rtl' : 'ltr';

      const animClass = isRtl ? 'anim-sleigh-right-to-left' : 'anim-sleigh-left-to-right';
      const verticalClass = isBottom ? 'santa-route-bottom' : 'santa-route-top';

      const flyer = document.createElement('div');
      flyer.className = `santa-flight-wrapper ${animClass} ${verticalClass}`;
      flyer.setAttribute('role', 'button');
      flyer.setAttribute('tabindex', '0');
      flyer.setAttribute('aria-label', 'Papá Noel en su trineo. Hacé clic para recibir un regalo navideño.');
      flyer.setAttribute('data-flight-dir', dir);
      flyer.setAttribute('data-flight-route', route);

      const messageText = this.getRandomMessage();
      const hasAllGifts = this.getCollectedGiftsCount() >= this.MAX_GIFTS;

      flyer.innerHTML = `
        <div class="santa-flight-track">
          <div class="santa-banner-bubble">
            <span class="santa-banner-text">${messageText}</span>
            <span class="santa-click-hint-pill">${hasAllGifts ? '🎄 6/6' : '🎁 ¡CLIC AQUÍ!'}</span>
          </div>
          <div class="santa-sleigh-vehicle">
            ${this.getSantaSvg()}
          </div>
          <div class="santa-particle-trail">
            <span class="trail-star">⭐</span>
            <span class="trail-snow">❄️</span>
            <span class="trail-star">✨</span>
            <span class="trail-snow">❄️</span>
            <span class="trail-star">🌟</span>
            <span class="trail-snow">✨</span>
          </div>
        </div>
      `;

      // Evento de clic interactivo sobre Papá Noel o su carroza para entregar un regalo
      const onSantaActivate = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        this.handleSantaClick(e, flyer);
      };
      flyer.addEventListener('click', onSantaActivate);
      flyer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSantaActivate(e);
        }
      });

      container.appendChild(flyer);
      this.activeFlyerEl = flyer;

      // Reacción festiva de Bity
      this.triggerBityReaction('bity-xmas-react-santa', 3600);
      this.playSoundEffect('bells');

      if (this.flightEndTimerId) clearTimeout(this.flightEndTimerId);
      this.flightEndTimerId = setTimeout(() => {
        this.removeCurrentFlyer();
        this.isFlying = false;
        this.scheduleNextFlight();
      }, this.flightDurationMs);

      return true;
    }

    // =========================================================================
    // 5. SECUENCIA INTERACTIVA DE ENTREGA Y APERTURA DE REGALOS (MÁXIMO 6)
    // =========================================================================
    handleSantaClick(event, flyerEl) {
      const targetFlyer = flyerEl || this.activeFlyerEl;
      if (!targetFlyer) return false;

      // Si ya consiguió los 6 regalos, mostrar mensaje amable de arbolito completo
      if (this.getCollectedGiftsCount() >= this.MAX_GIFTS) {
        this.playSoundEffect('pop');
        targetFlyer.classList.add('santa-delivering-reaction');
        setTimeout(() => targetFlyer.classList.remove('santa-delivering-reaction'), 900);
        this.showGiftNotificationModal('full');
        return 'full';
      }

      // Evitar duplicaciones por hacer varios clics rápidos durante el mismo vuelo o si ya hay un regalo cayendo
      if (this.currentFlightGiftDropped || this.activeFallingGiftEl || this.isOpeningGift) {
        return 'already_dropped';
      }

      this.currentFlightGiftDropped = true;
      this.playSoundEffect('pop');

      // 1. Reacción visual de Papá Noel saludando/inclinándose para entregar el regalo
      targetFlyer.classList.add('santa-delivering-reaction');
      const hintPill = targetFlyer.querySelector('.santa-click-hint-pill');
      if (hintPill) {
        hintPill.textContent = '🎁 ¡REGALO ENVIADO!';
      }

      // Obtener coordenadas desde donde cae el regalo
      let startX = 360;
      let startY = 110;
      if (typeof targetFlyer.getBoundingClientRect === 'function') {
        const rect = targetFlyer.getBoundingClientRect();
        if (rect && rect.width > 0) {
          startX = Math.max(90, Math.min((window.innerWidth || 1024) - 130, rect.left + rect.width * 0.35));
          startY = Math.max(70, Math.min((window.innerHeight || 768) - 200, rect.top + rect.height * 0.55));
        }
      } else if (event && typeof event.clientX === 'number' && event.clientX > 0) {
        startX = event.clientX;
        startY = event.clientY;
      }

      this.spawnFallingGift(startX, startY);
      return 'dropped';
    }

    spawnFallingGift(startX, startY) {
      if (typeof document === 'undefined') return null;
      const container = this.ensureOverlayContainer();
      if (!container) return null;

      if (this.activeFallingGiftEl) {
        this.activeFallingGiftEl.remove();
        this.activeFallingGiftEl = null;
      }

      const nextSlot = this.getCollectedGiftsCount() + 1;
      const design = COLLECTIBLE_GIFT_DESIGNS.find(d => d.slot === nextSlot) || COLLECTIBLE_GIFT_DESIGNS[0];

      const viewH = (typeof window !== 'undefined' && window.innerHeight) ? window.innerHeight : 760;
      // Zona visible y cómoda para que el niño haga clic y abra su regalo
      const landingY = Math.max(220, Math.min(viewH - 165, Math.round(viewH * 0.62)));
      const dropDistance = Math.max(110, landingY - startY);

      const giftEl = document.createElement('div');
      giftEl.id = 'xmas-falling-gift-box';
      giftEl.className = 'xmas-falling-gift-box is-descending';
      giftEl.setAttribute('role', 'button');
      giftEl.setAttribute('tabindex', '0');
      giftEl.setAttribute('aria-label', 'Regalo de Papá Noel. Hacé clic para abrirlo.');
      giftEl.setAttribute('data-gift-slot', String(design.slot));
      giftEl.style.left = `${Math.round(startX)}px`;
      giftEl.style.top = `${Math.round(startY)}px`;
      giftEl.style.setProperty('--drop-distance', `${Math.round(dropDistance)}px`);

      giftEl.innerHTML = `
        <div class="falling-gift-parachute" aria-hidden="true">✨⭐✨</div>
        <div class="falling-gift-svg-wrap">
          <svg viewBox="0 0 80 80" class="falling-gift-svg" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="42" r="36" fill="rgba(255, 215, 0, 0.22)" class="falling-gift-halo"/>
            <!-- Caja del regalo -->
            <rect x="16" y="30" width="48" height="38" rx="6" fill="${design.boxColor}" stroke="#ffffff" stroke-width="2.2"/>
            <!-- Tapa del regalo -->
            <rect x="13" y="22" width="54" height="11" rx="4" fill="${design.boxColor}" stroke="#ffffff" stroke-width="2.2"/>
            <!-- Cintas cruzadas -->
            <rect x="35" y="22" width="10" height="46" fill="${design.ribbonColor}"/>
            <rect x="16" y="44" width="48" height="9" fill="${design.ribbonColor}"/>
            <!-- Moño superior festivo -->
            <path d="M 40,22 C 26,8 18,18 28,23 C 34,24 38,23 40,22 M 40,22 C 54,8 62,18 52,23 C 46,24 42,23 40,22"
              fill="${design.bowColor}" stroke="#ffffff" stroke-width="1.6"/>
            <circle cx="40" cy="21" r="4.5" fill="#ffffff"/>
          </svg>
        </div>
        <span class="falling-gift-cta-badge">🎁 ¡ABRIR REGALO!</span>
      `;

      const onGiftClick = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        this.openDroppedGift(giftEl, design.slot);
      };
      giftEl.addEventListener('click', onGiftClick);
      giftEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onGiftClick(e);
        }
      });

      container.appendChild(giftEl);
      this.activeFallingGiftEl = giftEl;

      // Cuando termina de descender, queda esperando con un suave latido luminoso
      setTimeout(() => {
        if (this.activeFallingGiftEl === giftEl) {
          giftEl.classList.remove('is-descending');
          giftEl.classList.add('is-ready-to-open');
        }
      }, 1550);

      return giftEl;
    }

    openDroppedGift(giftEl, slotId) {
      const targetGift = giftEl || this.activeFallingGiftEl;
      if (!targetGift || this.isOpeningGift) return false;

      if (this.getCollectedGiftsCount() >= this.MAX_GIFTS) {
        targetGift.remove();
        this.activeFallingGiftEl = null;
        this.showGiftNotificationModal('full');
        return false;
      }

      this.isOpeningGift = true;
      this.playSoundEffect('victory');

      // Animación de apertura con destellos, estrellas y confeti navideño
      targetGift.classList.remove('is-ready-to-open', 'is-descending');
      targetGift.classList.add('is-opening-burst');

      const burstContainer = document.createElement('div');
      burstContainer.className = 'xmas-gift-confetti-burst';
      burstContainer.innerHTML = `
        <span class="burst-p p1">⭐</span>
        <span class="burst-p p2">✨</span>
        <span class="burst-p p3">🎄</span>
        <span class="burst-p p4">🌟</span>
        <span class="burst-p p5">❄️</span>
        <span class="burst-p p6">🎉</span>
        <span class="burst-p p7">⭐</span>
        <span class="burst-p p8">✨</span>
      `;
      targetGift.appendChild(burstContainer);

      // Registrar regalo único sin superar los 6 regalos
      const nextSlot = (slotId >= 1 && slotId <= this.MAX_GIFTS && !this.collectedGifts.includes(slotId))
        ? slotId
        : (this.getCollectedGiftsCount() + 1);

      if (this.collectedGifts.length < this.MAX_GIFTS && !this.collectedGifts.includes(nextSlot)) {
        this.collectedGifts.push(nextSlot);
        this.saveTreeState();
      }

      // Actualizar inmediatamente el árbol y el contador REGALOS: X/6
      this.refreshTreeGiftsDOM();

      setTimeout(() => {
        if (targetGift && typeof targetGift.remove === 'function') {
          targetGift.remove();
        }
        if (this.activeFallingGiftEl === targetGift) {
          this.activeFallingGiftEl = null;
        }
        this.isOpeningGift = false;
        this.showGiftNotificationModal('congrats');
      }, 680);

      return true;
    }

    showGiftNotificationModal(mode = 'congrats') {
      if (typeof document === 'undefined') return null;

      let existingModal = document.getElementById('xmas-santa-gift-modal');
      if (existingModal) {
        existingModal.remove();
      }

      const isFull = (mode === 'full');
      const count = this.getCollectedGiftsCount();

      const modal = document.createElement('div');
      modal.id = 'xmas-santa-gift-modal';
      modal.className = 'xmas-santa-gift-modal-overlay';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');

      modal.innerHTML = `
        <div class="xmas-santa-gift-modal-card">
          <div class="xmas-gift-modal-sparkles" aria-hidden="true">✨ ⭐ 🎄 🎁 🎄 ⭐ ✨</div>
          <div class="xmas-gift-modal-icon-badge">
            ${isFull ? '🎄🏆🎁' : '🎅🎁✨'}
          </div>
          <h3 class="xmas-gift-modal-title">
            ${isFull ? '¡TU ARBOLITO ESTÁ COMPLETO!' : '¡FELICITACIONES!'}
          </h3>
          <p class="xmas-gift-modal-subtitle">
            ${isFull
              ? '¡Ya conseguiste los 6 regalos de Navidad! Papá Noel está muy feliz de verte disfrutar de esta aventura.'
              : '¡Papá Noel te dejó un regalo!'}
          </p>
          ${!isFull ? `
            <p class="xmas-gift-modal-desc">
              Tu regalo se guardó en el arbolito de Navidad. ¡Seguí disfrutando de las actividades y juntando sorpresas!
            </p>
          ` : ''}
          <div class="xmas-gift-modal-progress-pill">
            <span>🎁</span>
            <span>REGALOS EN TU ARBOLITO: <strong>${count}/${this.MAX_GIFTS}</strong></span>
          </div>
          <div class="xmas-gift-modal-actions">
            <button type="button" id="btn-xmas-close-gift-modal" class="btn-xmas-gift-modal-continue">
              <span>✨</span>
              <span>¡CONTINUAR!</span>
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      const closeBtn = document.getElementById('btn-xmas-close-gift-modal');
      const closeModal = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        this.playSoundEffect('click');
        modal.remove();
      };

      if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
      }
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(e);
      });

      return modal;
    }

    removeCurrentFlyer() {
      if (this.flightEndTimerId) {
        clearTimeout(this.flightEndTimerId);
        this.flightEndTimerId = null;
      }
      if (this.activeFlyerEl) {
        this.activeFlyerEl.remove();
        this.activeFlyerEl = null;
      }
      this.isFlying = false;
    }
  }

  // Exportar instancia global única (singleton)
  const santaManagerInstance = new MagicSantaManager();
  santaManagerInstance.TREE_LIGHT_MODES = TREE_LIGHT_MODES;
  santaManagerInstance.SANTA_ROUTES = SANTA_ROUTES;
  santaManagerInstance.COLLECTIBLE_GIFT_DESIGNS = COLLECTIBLE_GIFT_DESIGNS;
  global.magicSantaManager = santaManagerInstance;

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => santaManagerInstance.init());
    } else {
      santaManagerInstance.init();
    }
  }

})(typeof window !== 'undefined' ? window : global);
