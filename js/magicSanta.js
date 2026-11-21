/**
 * ===================================================================
 * INFORMÁTICA MÁGICA — AMBIENTACIÓN NAVIDEÑA INMERSIVA GLOBAL
 * js/magicSanta.js
 * ===================================================================
 * Sistema global, compartido y reutilizable de ambientación navideña
 * para todas las pantallas y módulos de la plataforma.
 *
 * Incluye:
 * 1. Papá Noel en su trineo tirado por varios renos (con Rodolfo y su nariz roja),
 *    desplazándose de forma fluida por la zona superior libre (izquierda ↔ derecha),
 *    con rastro de estrellas, nieve y destellos, a intervalos aleatorios sin duplicarse.
 * 2. Árboles de Navidad decorativos permanentes en sectores estratégicos (con luces
 *    que se encienden/apagan intermitentemente con variación natural, estrella con
 *    destellos y regalos debajo), adaptando su visibilidad en pantallas de concentración.
 * 3. Guirnaldas y luces navideñas superiores con titileo individual desfasado.
 * 4. Nieve ambiental multicapa de baja densidad y caída lenta y natural en toda la web.
 * 5. Detalles decorativos contextuales según la pantalla activa (campanitas que se
 *    balancean, bastones de caramelo, coronas navideñas, muñeco de nieve, casita
 *    iluminada, ramas de pino y regalos).
 * 6. Reacciones festivas de Bity (saludar, pequeño salto, mirar hacia el árbol o
 *    reaccionar con alegría cuando pasa Papá Noel), conservando intacta su identidad.
 * 7. Respeto estricto por pointer-events: none, prefers-reduced-motion y el control
 *    global de sonido existente (MagicAudioEngine).
 */

(function (global) {
  'use strict';

  class MagicSantaManager {
    constructor() {
      this.STORAGE_KEY = 'magic_santa_enabled';
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

      // Intervalos aleatorios entre apariciones (28s a 48s) y primera aparición rápida (7s)
      this.minIntervalMs = 28000;
      this.maxIntervalMs = 48000;
      this.initialDelayMs = 7000;
      this.flightDurationMs = 11500;

      // Mensajes festivos y motivadores de programación
      this.santaMessages = [
        '¡JO JO JO! ¡FELIZ NAVIDAD, PEQUEÑOS PROGRAMADORES! 🎅🎄',
        '¡QUÉ HERMOSOS ALGORITMOS ESTÁN CREANDO CON BITY! ⭐🎁',
        '¡RODOLFO Y SUS RENOS ILUMINAN TUS INSTRUCCIONES! 🦌✨',
        '¡CADA BLOQUE TE ACERCA A UNA GRAN META NAVIDEÑA! 🎁🌟',
        '¡JO JO JO! ¡A REPETIR PASOS Y DESCUBRIR LA MAGIA! 🎄🚀',
        '¡EL TALLER DEL POLO NORTE CELEBRA TU INGENIO! 🎅⭐'
      ];
      this.lastMsgIndex = -1;

      this.readStoredPreference();
      this.bindTabVisibility();
    }

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

    isEnabled() {
      return this.enabled;
    }

    setEnabled(value) {
      this.enabled = Boolean(value);
      this.savePreference();
      this.updateHeaderButtonUi();

      if (this.enabled) {
        this.scheduleNextFlight(3500);
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
          this.clearFlightTimer();
          this.removeCurrentFlyer();
        } else if (this.enabled) {
          this.scheduleNextFlight(8000);
        }
      });
    }

    init() {
      if (typeof document === 'undefined') return;

      this.ensureGlobalAmbienceLayer();
      this.ensureOverlayContainer();
      this.updateHeaderButtonUi();
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

      if (this.enabled) {
        this.scheduleNextFlight(this.initialDelayMs);
      }
    }

    // =========================================================================
    // 1. CAPA GLOBAL COMPARTIDA DE AMBIENTACIÓN (NIEVE, GUIRNALDAS, ÁRBOL Y DETALLES)
    // =========================================================================
    ensureGlobalAmbienceLayer() {
      if (typeof document === 'undefined') return null;
      let root = document.getElementById('xmas-global-ambience-root');
      if (root) {
        this.ambienceRoot = root;
        return root;
      }

      root = document.createElement('div');
      root.id = 'xmas-global-ambience-root';
      root.className = 'xmas-global-ambience-root context-home';
      root.setAttribute('aria-hidden', 'true');

      root.innerHTML = `
        <!-- 4. NIEVE AMBIENTAL GLOBAL (3 capas sutiles con distintos tamaños y velocidades) -->
        <div class="xmas-global-snow-container">
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

        <!-- 3. GUIRNALDAS Y LUCES NAVIDEÑAS SUPERIORES (Titileo individual desfasado) -->
        <div class="xmas-top-garland-bar">
          ${this.getGarlandLightsSvg()}
        </div>

        <!-- 5. ELEMENTOS DECORATIVOS DE ESQUINA SUPERIOR (Campanitas, Ramas de Pino, Corona, Estrellas) -->
        <div class="xmas-corner-ornament corner-top-left">
          ${this.getCornerBellsAndPineSvg('left')}
        </div>
        <div class="xmas-corner-ornament corner-top-right">
          ${this.getCornerWreathAndCandySvg('right')}
        </div>

        <!-- 2. ÁRBOL DE NAVIDAD DECORATIVO PERMANENTE (Esquina inferior izquierda con luces animadas y regalos) -->
        <div class="xmas-permanent-tree-dock tree-dock-left" id="xmas-permanent-tree-left">
          ${this.getAnimatedChristmasTreeSvg('primary')}
        </div>

        <!-- 2B. ESCENA COMPLEMENTARIA EN ESQUINA INFERIOR DERECHA (Segundo Árbol / Casita iluminada / Muñeco de nieve según sección) -->
        <div class="xmas-permanent-tree-dock tree-dock-right" id="xmas-permanent-decor-right">
          <div class="xmas-scene-variant variant-tree-village">
            ${this.getSecondaryVillageTreeSvg()}
          </div>
        </div>
      `;

      document.body.appendChild(root);
      this.ambienceRoot = root;
      return root;
    }

    getGarlandLightsSvg() {
      // Construye ondas de guirnalda de pino con luces de colores que parpadean con distintos delays
      const colors = ['#ef4444', '#22c55e', '#fde047', '#38bdf8', '#f97316', '#a855f7'];
      let bulbsHtml = '';
      for (let i = 0; i < 24; i++) {
        const cx = 30 + i * 60;
        const isPeak = (i % 3 === 0);
        const cy = isPeak ? 12 : ((i % 3 === 1) ? 23 : 23);
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
          <!-- Festones de pino verde -->
          <path d="M 0,4 Q 90,34 180,6 Q 270,34 360,6 Q 450,34 540,6 Q 630,34 720,6 Q 810,34 900,6 Q 990,34 1080,6 Q 1170,34 1260,6 Q 1350,34 1440,4"
            fill="none" stroke="url(#garlandPineGrad)" stroke-width="8" stroke-linecap="round"/>
          <path d="M 0,4 Q 90,34 180,6 Q 270,34 360,6 Q 450,34 540,6 Q 630,34 720,6 Q 810,34 900,6 Q 990,34 1080,6 Q 1170,34 1260,6 Q 1350,34 1440,4"
            fill="none" stroke="#22c55e" stroke-width="2.2" stroke-dasharray="6 8" opacity="0.65"/>
          <!-- Moños rojos en las uniones de la guirnalda -->
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
          <!-- Rama de pino y acebo -->
          <path d="M 4 8 Q 45 6 88 26 Q 55 24 22 44 Q 14 68 8 92 Z" fill="#15803d" opacity="0.9"/>
          <path d="M 6 6 Q 38 14 72 34" fill="none" stroke="#4ade80" stroke-width="3" stroke-linecap="round"/>
          <!-- Bastón de caramelo -->
          <g transform="translate(54, 16) rotate(22)" class="xmas-candy-cane">
            <path d="M 8 36 L 8 12 A 7 7 0 0 1 22 12 L 22 17" fill="none" stroke="#ffffff" stroke-width="5.5" stroke-linecap="round"/>
            <path d="M 8 36 L 8 12 A 7 7 0 0 1 22 12 L 22 17" fill="none" stroke="#dc2626" stroke-width="5.5" stroke-dasharray="4 4" stroke-linecap="round"/>
          </g>
          <!-- Campanitas doradas que se balancean suavemente -->
          <g class="xmas-swinging-bells" transform="translate(26, 24)">
            <path d="M -8 14 Q 0 2 10 14 L 14 30 Q 1 34 -12 30 Z" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>
            <circle cx="1" cy="31" r="3.5" fill="#d97706"/>
            <path d="M 8 16 Q 16 6 24 16 L 27 30 Q 16 33 6 30 Z" fill="#fde047" stroke="#ca8a04" stroke-width="1.5"/>
            <circle cx="17" cy="31" r="3.2" fill="#d97706"/>
            <!-- Moño rojo superior -->
            <path d="M 2 8 L -8 2 L -6 14 Z M 6 8 L 16 2 L 14 14 Z" fill="#dc2626"/>
            <circle cx="4" cy="8" r="3.5" fill="#ef4444" stroke="#fde047" stroke-width="1"/>
          </g>
          <!-- Estrella destellante -->
          <polygon points="88,46 90,52 96,52 91,56 93,62 88,58 83,62 85,56 80,52 86,52" fill="#fde047" class="xmas-twinkle-star"/>
        </svg>
      `;
    }

    getCornerWreathAndCandySvg() {
      return `
        <svg viewBox="0 0 130 110" class="xmas-corner-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Rama de pino derecha -->
          <path d="M 126 8 Q 85 6 42 26 Q 75 24 108 44 Q 116 68 122 92 Z" fill="#15803d" opacity="0.9"/>
          <!-- Corona navideña con luces y moño -->
          <g transform="translate(86, 38)" class="xmas-wreath-group">
            <circle cx="0" cy="0" r="19" fill="none" stroke="#166534" stroke-width="9"/>
            <circle cx="0" cy="0" r="19" fill="none" stroke="#22c55e" stroke-width="4" stroke-dasharray="5 6"/>
            <!-- Luces en la corona -->
            <circle cx="-13" cy="-12" r="2.6" fill="#ef4444" class="tree-light-1"/>
            <circle cx="14" cy="-11" r="2.6" fill="#fde047" class="tree-light-2"/>
            <circle cx="16" cy="9" r="2.6" fill="#38bdf8" class="tree-light-3"/>
            <circle cx="-15" cy="10" r="2.6" fill="#f97316" class="tree-light-4"/>
            <!-- Moño rojo -->
            <path d="M -3 -18 L -13 -24 L -11 -13 Z M 3 -18 L 13 -24 L 11 -13 Z" fill="#dc2626"/>
            <path d="M -3 -16 L -7 -4 M 3 -16 L 7 -4" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>
            <circle cx="0" cy="-18" r="3.5" fill="#ef4444" stroke="#fde047" stroke-width="1"/>
          </g>
          <!-- Estrella con destello -->
          <polygon points="36,42 38,48 44,48 39,52 41,58 36,54 31,58 33,52 28,48 34,48" fill="#fde047" class="xmas-twinkle-star"/>
        </svg>
      `;
    }

    getAnimatedChristmasTreeSvg() {
      return `
        <svg viewBox="0 0 180 235" class="xmas-permanent-tree-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="treeStarHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
              <stop offset="45%" stop-color="#fde047" stop-opacity="0.65"/>
              <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="treeFoliage1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#22c55e"/>
              <stop offset="100%" stop-color="#14532d"/>
            </linearGradient>
            <linearGradient id="treeFoliage2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#16a34a"/>
              <stop offset="100%" stop-color="#0f3d21"/>
            </linearGradient>
          </defs>

          <!-- Base de nieve suave -->
          <ellipse cx="90" cy="216" rx="74" ry="13" fill="#e2e8f0" opacity="0.88"/>
          <ellipse cx="90" cy="214" rx="64" ry="9" fill="#ffffff"/>

          <!-- Tronco del árbol -->
          <rect x="77" y="176" width="26" height="36" rx="4" fill="#78350f" stroke="#451a03" stroke-width="2"/>

          <!-- Capas de pino con nieve en las puntas -->
          <!-- Capa inferior -->
          <polygon points="90,98 20,184 160,184" fill="url(#treeFoliage2)" stroke="#166534" stroke-width="2"/>
          <path d="M 24,183 Q 45,174 62,183 Q 90,173 118,183 Q 138,175 156,183" fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>

          <!-- Capa media -->
          <polygon points="90,62 34,142 146,142" fill="url(#treeFoliage1)" stroke="#15803d" stroke-width="2"/>
          <path d="M 38,141 Q 62,133 90,141 Q 118,133 142,141" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>

          <!-- Capa superior -->
          <polygon points="90,28 50,96 130,96" fill="url(#treeFoliage1)" stroke="#15803d" stroke-width="2"/>
          <path d="M 54,95 Q 72,88 90,95 Q 108,88 126,95" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round"/>

          <!-- Guirnaldas doradas cruzando el árbol -->
          <path d="M 60,76 Q 90,92 122,74" fill="none" stroke="#fde047" stroke-width="2.5" stroke-dasharray="4 4"/>
          <path d="M 44,122 Q 90,142 136,118" fill="none" stroke="#fde047" stroke-width="2.8" stroke-dasharray="4 4"/>
          <path d="M 30,166 Q 90,188 150,162" fill="none" stroke="#fde047" stroke-width="3" stroke-dasharray="4 4"/>

          <!-- Luces navideñas intermitentes con diferentes ritmos (No parpadean todas juntas) -->
          <g class="xmas-tree-lights">
            <circle cx="90" cy="54" r="4.5" fill="#ef4444" class="tree-light-1"/>
            <circle cx="72" cy="74" r="4.5" fill="#fde047" class="tree-light-2"/>
            <circle cx="108" cy="76" r="4.5" fill="#38bdf8" class="tree-light-3"/>
            <circle cx="62" cy="108" r="5" fill="#f97316" class="tree-light-4"/>
            <circle cx="92" cy="102" r="5" fill="#a855f7" class="tree-light-5"/>
            <circle cx="118" cy="112" r="5" fill="#ef4444" class="tree-light-1"/>
            <circle cx="52" cy="134" r="5" fill="#38bdf8" class="tree-light-3"/>
            <circle cx="82" cy="128" r="5.2" fill="#fde047" class="tree-light-2"/>
            <circle cx="106" cy="132" r="5" fill="#22c55e" class="tree-light-4"/>
            <circle cx="132" cy="134" r="4.8" fill="#fde047" class="tree-light-5"/>
            <circle cx="42" cy="166" r="5.5" fill="#ef4444" class="tree-light-2"/>
            <circle cx="70" cy="158" r="5.5" fill="#38bdf8" class="tree-light-1"/>
            <circle cx="96" cy="166" r="5.5" fill="#fde047" class="tree-light-3"/>
            <circle cx="122" cy="158" r="5.5" fill="#f97316" class="tree-light-5"/>
            <circle cx="142" cy="170" r="5.2" fill="#a855f7" class="tree-light-4"/>
          </g>

          <!-- Estrella Superior con Destellos Animados -->
          <g transform="translate(90, 22)" class="xmas-tree-top-star">
            <circle cx="0" cy="0" r="24" fill="url(#treeStarHalo)" class="tree-star-aura"/>
            <polygon points="0,-16 4.5,-5 16,-5 7,2 10.5,14 0,7 -10.5,14 -7,2 -16,-5 -4.5,-5"
              fill="#ffd700" stroke="#ffffff" stroke-width="1.4"/>
            <circle cx="0" cy="0" r="4" fill="#ffffff"/>
          </g>

          <!-- Regalos debajo del árbol -->
          <!-- Regalo Rojo Izquierdo -->
          <g transform="translate(32, 184)">
            <rect x="0" y="6" width="30" height="26" rx="4" fill="#dc2626" stroke="#ffffff" stroke-width="1.4"/>
            <rect x="12" y="6" width="6" height="26" fill="#ffd700"/>
            <rect x="0" y="16" width="30" height="5" fill="#ffd700"/>
            <path d="M 15,6 Q 8,-2 6,5 Q 15,8 15,6 M 15,6 Q 22,-2 24,5 Q 15,8 15,6" fill="#fde047" stroke="#ca8a04" stroke-width="1"/>
          </g>

          <!-- Regalo Azul Central -->
          <g transform="translate(66, 194)">
            <rect x="0" y="4" width="24" height="20" rx="3" fill="#0284c7" stroke="#ffffff" stroke-width="1.2"/>
            <rect x="10" y="4" width="4" height="20" fill="#fde047"/>
            <rect x="0" y="12" width="24" height="4" fill="#fde047"/>
          </g>

          <!-- Regalo Verde Derecho -->
          <g transform="translate(114, 186)">
            <rect x="0" y="4" width="32" height="26" rx="4" fill="#16a34a" stroke="#ffffff" stroke-width="1.4"/>
            <rect x="13" y="4" width="6" height="26" fill="#ef4444"/>
            <rect x="0" y="14" width="32" height="5" fill="#ef4444"/>
            <circle cx="16" cy="4" r="3.5" fill="#fde047"/>
          </g>
        </svg>
      `;
    }

    getSecondaryVillageTreeSvg() {
      // Escena derecha: Pequeña casita iluminada, muñeco de nieve y pino decorado
      return `
        <svg viewBox="0 0 210 190" class="xmas-secondary-scene-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Base de nieve -->
          <ellipse cx="105" cy="174" rx="94" ry="13" fill="#e2e8f0" opacity="0.88"/>
          <ellipse cx="105" cy="172" rx="84" ry="9" fill="#ffffff"/>

          <!-- Pino navideño secundario con luces -->
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

          <!-- Pequeña casita navideña iluminada -->
          <g transform="translate(22, 88)">
            <rect x="8" y="34" width="66" height="50" rx="4" fill="#991b1b" stroke="#fde047" stroke-width="1.5"/>
            <!-- Chimenea -->
            <rect x="54" y="10" width="11" height="22" fill="#78350f"/>
            <circle cx="60" cy="4" r="3.5" fill="#e2e8f0" opacity="0.7" class="chimney-smoke-1"/>
            <circle cx="64" cy="-4" r="5" fill="#e2e8f0" opacity="0.5" class="chimney-smoke-2"/>
            <!-- Techo nevado -->
            <polygon points="0,36 41,6 82,36" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
            <!-- Ventanas cálidas iluminadas -->
            <rect x="16" y="46" width="16" height="18" rx="3" fill="#fde047" class="house-window-glow"/>
            <rect x="50" y="46" width="16" height="18" rx="3" fill="#fde047" class="house-window-glow"/>
            <!-- Puerta con corona -->
            <rect x="35" y="56" width="12" height="28" rx="2" fill="#14532d" stroke="#fde047" stroke-width="1"/>
            <circle cx="41" cy="65" r="4" fill="none" stroke="#22c55e" stroke-width="2"/>
          </g>

          <!-- Muñeco de nieve simpático saludando -->
          <g transform="translate(106, 118)" class="xmas-snowman-char">
            <circle cx="0" cy="36" r="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.4"/>
            <circle cx="0" cy="14" r="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.4"/>
            <circle cx="0" cy="-4" r="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.4"/>
            <!-- Ojos y nariz de zanahoria -->
            <circle cx="-3" cy="-6" r="1.4" fill="#0f172a"/>
            <circle cx="3" cy="-6" r="1.4" fill="#0f172a"/>
            <polygon points="0,-4 8,-2 0,0" fill="#ea580c"/>
            <!-- Bufanda roja y sombrero -->
            <rect x="-8" y="3" width="16" height="4.5" rx="2" fill="#dc2626"/>
            <rect x="2" y="5" width="4" height="10" rx="1.5" fill="#dc2626"/>
            <rect x="-9" y="-13" width="18" height="3" rx="1" fill="#1e293b"/>
            <rect x="-6" y="-22" width="12" height="10" rx="1.5" fill="#0f172a"/>
          </g>
        </svg>
      `;
    }

    // =========================================================================
    // 2. ADAPTACIÓN INTELIGENTE SEGÚN LA PANTALLA ACTIVA (MODO CONCENTRACIÓN)
    // =========================================================================
    observeActiveScreenContext() {
      if (typeof document === 'undefined') return;

      const updateContext = () => {
        const activeScreen = document.querySelector('.screen.active');
        const screenId = activeScreen ? activeScreen.id : 'screen-home';
        this.currentScreenId = screenId;

        if (!this.ambienceRoot) return;

        // En pantallas de actividades/programación donde los chicos necesitan concentrarse,
        // reducimos el tamaño de las decoraciones laterales y despejamos el área central de trabajo.
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
    // 3. ANIMACIONES AMBIENTALES Y REACCIONES DE BITY (Sección 6)
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
    // 4. PAPÁ NOEL Y SU TRINEO CON RENOS (Vuelo superior fluido y sin duplicados)
    // =========================================================================
    ensureOverlayContainer() {
      if (typeof document === 'undefined') return null;
      let c = document.getElementById('magic-santa-container');
      if (!c) {
        c = document.createElement('div');
        c.id = 'magic-santa-container';
        c.className = 'magic-santa-overlay';
        c.setAttribute('aria-hidden', 'true');
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

      const delay = (typeof delayMs === 'number')
        ? delayMs
        : (this.minIntervalMs + Math.random() * (this.maxIntervalMs - this.minIntervalMs));

      this.timerId = setTimeout(() => {
        this.launchSantaFlight();
      }, delay);
    }

    getRandomMessage() {
      let idx;
      do {
        idx = Math.floor(Math.random() * this.santaMessages.length);
      } while (idx === this.lastMsgIndex && this.santaMessages.length > 1);
      this.lastMsgIndex = idx;
      return this.santaMessages[idx];
    }

    getSantaSvg() {
      return `
        <svg viewBox="0 0 420 120" xmlns="http://www.w3.org/2000/svg" class="santa-sleigh-svg">
          <defs>
            <linearGradient id="sleighRed" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#ef4444"/>
              <stop offset="100%" stop-color="#b91c1c"/>
            </linearGradient>
            <linearGradient id="goldTrim" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#fef08a"/>
              <stop offset="50%" stop-color="#facc15"/>
              <stop offset="100%" stop-color="#ca8a04"/>
            </linearGradient>
            <linearGradient id="reindeerFur" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#b45309"/>
              <stop offset="100%" stop-color="#713f12"/>
            </linearGradient>
          </defs>

          <!-- RIENDAS MÁGICAS DORADAS UNIENDO LOS 3 RENOS AL TRINEO -->
          <path d="M 122 62 Q 185 48 245 54 Q 305 48 362 50" fill="none" stroke="url(#goldTrim)" stroke-width="2.4" stroke-dasharray="5 3"/>

          <!-- 1. RENO LÍDER: RODOLFO CON NARIZ ROJA LUMINOSA -->
          <g transform="translate(336, 26)" class="reindeer-group reindeer-rudolph">
            <path d="M 28 32 L 39 47 M 23 32 L 32 45" stroke="#713f12" stroke-width="3" stroke-linecap="round" class="reindeer-legs-front"/>
            <path d="M 6 30 L -4 44 M 12 30 L 2 45" stroke="#713f12" stroke-width="3" stroke-linecap="round" class="reindeer-legs-back"/>
            <ellipse cx="18" cy="24" rx="16" ry="9.5" fill="url(#reindeerFur)"/>
            <path d="M 3" y="21" d="M 2 22 L -4 18 L 1 26 Z" fill="#fef3c7"/>
            <path d="M 26 22 L 36 11 Q 40 9 44 14 Q 40 22 32 26 Z" fill="url(#reindeerFur)"/>
            <path d="M 33 10 L 30 4 L 35 8 Z" fill="#ca8a04"/>
            <path d="M 34 8 Q 30 -4 34 -10 M 32 -3 L 26 -7 M 33 -6 L 39 -9" fill="none" stroke="url(#goldTrim)" stroke-width="2.2" stroke-linecap="round"/>
            <circle cx="38" cy="13" r="1.6" fill="#ffffff"/>
            <circle cx="38.5" cy="13" r="0.9" fill="#000000"/>
            <!-- Collar rojo con cascabeles dorados -->
            <path d="M 25 20 Q 29 25 32 23" fill="none" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>
            <circle cx="29" cy="24" r="2.8" fill="#facc15"/>
            <!-- Nariz roja brillante de Rodolfo -->
            <circle cx="44" cy="15.5" r="4" fill="#ef4444" class="rudolph-nose-glow"/>
          </g>

          <!-- 2. SEGUNDO RENO DEL EQUIPO -->
          <g transform="translate(266, 32)" class="reindeer-group reindeer-second">
            <path d="M 28 32 L 37 45 M 23 32 L 30 44" stroke="#713f12" stroke-width="3" stroke-linecap="round" class="reindeer-legs-front"/>
            <path d="M 6 30 L -3 42 M 12 30 L 4 44" stroke="#713f12" stroke-width="3" stroke-linecap="round" class="reindeer-legs-back"/>
            <ellipse cx="18" cy="24" rx="15" ry="9" fill="url(#reindeerFur)"/>
            <path d="M 26 22 L 35 12 Q 39 10 43 14 Q 39 21 31 25 Z" fill="url(#reindeerFur)"/>
            <path d="M 33 8 Q 29 -3 33 -8 M 31 -2 L 26 -5" fill="none" stroke="url(#goldTrim)" stroke-width="2" stroke-linecap="round"/>
            <circle cx="37" cy="13" r="1.4" fill="#ffffff"/>
            <circle cx="37.5" cy="13" r="0.8" fill="#000000"/>
            <circle cx="28" cy="24" r="2.6" fill="#facc15"/>
            <circle cx="42" cy="15.5" r="2.3" fill="#1e293b"/>
          </g>

          <!-- 3. TERCER RENO DEL EQUIPO -->
          <g transform="translate(198, 30)" class="reindeer-group reindeer-third">
            <path d="M 28 32 L 36 46 M 24 32 L 30 44" stroke="#713f12" stroke-width="3" stroke-linecap="round" class="reindeer-legs-front"/>
            <path d="M 6 30 L -2 42 M 12 30 L 4 44" stroke="#713f12" stroke-width="3" stroke-linecap="round" class="reindeer-legs-back"/>
            <ellipse cx="18" cy="24" rx="15" ry="9" fill="url(#reindeerFur)"/>
            <path d="M 26 22 L 35 12 Q 39 10 43 14 Q 39 21 31 25 Z" fill="url(#reindeerFur)"/>
            <path d="M 33 8 Q 29 -3 33 -8 M 31 -2 L 26 -5" fill="none" stroke="url(#goldTrim)" stroke-width="2" stroke-linecap="round"/>
            <circle cx="37" cy="13" r="1.4" fill="#ffffff"/>
            <circle cx="37.5" cy="13" r="0.8" fill="#000000"/>
            <circle cx="28" cy="24" r="2.6" fill="#facc15"/>
            <circle cx="42" cy="15.5" r="2.3" fill="#1e293b"/>
          </g>

          <!-- 4. TRINEO REAL DE PAPÁ NOEL CARGADO DE REGALOS -->
          <g transform="translate(24, 20)">
            <!-- Patines dorados del trineo -->
            <path d="M 10 82 Q 70 82 112 82 Q 132 82 137 70 Q 140 60 132 58 Q 125 58 127 66 L 15 66" fill="none" stroke="url(#goldTrim)" stroke-width="4.5" stroke-linecap="round"/>
            <line x1="35" y1="66" x2="35" y2="52" stroke="url(#goldTrim)" stroke-width="3"/>
            <line x1="88" y1="66" x2="88" y2="52" stroke="url(#goldTrim)" stroke-width="3"/>

            <!-- Saco mágico repleto de regalos -->
            <path d="M 14 48 Q 10 16 35 14 Q 56 12 56 45 Z" fill="#b91c1c" stroke="#fde047" stroke-width="1.8"/>
            <rect x="24" y="9" width="16" height="14" rx="2" fill="#22c55e" stroke="#ffffff" stroke-width="1.2"/>
            <rect x="30" y="9" width="4" height="14" fill="#facc15"/>
            <rect x="39" y="13" width="14" height="14" rx="2" fill="#38bdf8" stroke="#ffffff" stroke-width="1.2"/>

            <!-- PAPÁ NOEL SALUDANDO -->
            <ellipse cx="70" cy="40" rx="18" ry="16" fill="url(#sleighRed)"/>
            <rect x="54" y="42" width="32" height="6" fill="#18181b"/>
            <rect x="66" y="40" width="8" height="10" fill="url(#goldTrim)"/>
            <!-- Barba blanca -->
            <path d="M 62 32 Q 70 50 78 32 Q 82 44 76 49 Q 70 53 64 49 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
            <!-- Rostro alegre -->
            <circle cx="70" cy="26" r="9" fill="#fed7aa"/>
            <path d="M 65 24 Q 67 22 69 24 M 71 24 Q 73 22 75 24" fill="none" stroke="#451a03" stroke-width="1.8" stroke-linecap="round"/>
            <circle cx="70" cy="27" r="2.3" fill="#f87171"/>
            <!-- Gorro navideño -->
            <path d="M 60 22 Q 70 12 80 22 L 80 20 Q 78 4 62 6 Q 54 8 50 16 Z" fill="url(#sleighRed)"/>
            <rect x="59" y="19" width="22" height="5" rx="2.5" fill="#ffffff"/>
            <circle cx="49" cy="18" r="4.2" fill="#ffffff"/>
            <!-- Brazo saludando -->
            <path d="M 78 35 Q 92 26 87 16" fill="none" stroke="url(#sleighRed)" stroke-width="6" stroke-linecap="round"/>
            <circle cx="87" cy="16" r="4.2" fill="#16a34a" stroke="#ffffff" stroke-width="1.2"/>

            <!-- Carrocería del trineo -->
            <path d="M 12 50 Q 8 36 28 36 L 98 36 Q 118 36 122 54 Q 106 60 15 58 Z" fill="url(#sleighRed)" stroke="url(#goldTrim)" stroke-width="2.5"/>
            <path d="M 28 46 Q 66 53 106 46" fill="none" stroke="url(#goldTrim)" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="66" cy="48" r="4" fill="#facc15"/>
          </g>

          <!-- 5. RASTRO DE ESTRELLAS Y DESTELLOS -->
          <g class="santa-magic-sparkles">
            <polygon points="14,20 16,25 21,25 17,28 19,33 14,30 9,33 11,28 7,25 12,25" fill="#fde047"/>
            <polygon points="5,52 6.5,56 11,56 7.5,58.5 9,63 5,60 1,63 2.5,58.5 -1,56 3.5,56" fill="#fef08a"/>
            <circle cx="20" cy="68" r="2.2" fill="#ffffff"/>
            <circle cx="6" cy="34" r="1.8" fill="#67e8f9"/>
          </g>
        </svg>
      `;
    }

    launchSantaFlight(forcedDirection = null) {
      if (!this.enabled || this.isFlying) return false;
      if (typeof document === 'undefined') return false;

      const container = this.ensureOverlayContainer();
      if (!container) return false;

      // Respetar prefers-reduced-motion
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.scheduleNextFlight();
        return false;
      }

      // Garantizar que no exista ningún otro trineo en el DOM (evita duplicados al navegar)
      container.innerHTML = '';

      this.isFlying = true;
      this.flightCount++;

      // Alternar o elegir dirección: izquierda → derecha o derecha → izquierda
      const dir = forcedDirection || (this.flightCount % 2 === 1 ? 'ltr' : 'rtl');
      const animClass = (dir === 'rtl') ? 'anim-sleigh-right-to-left' : 'anim-sleigh-left-to-right';

      const flyer = document.createElement('div');
      flyer.className = `santa-flight-wrapper ${animClass}`;
      flyer.setAttribute('role', 'presentation');
      flyer.setAttribute('data-flight-dir', dir);

      const messageText = this.getRandomMessage();

      flyer.innerHTML = `
        <div class="santa-flight-track">
          <div class="santa-banner-bubble">
            <span class="santa-banner-text">${messageText}</span>
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

      container.appendChild(flyer);
      this.activeFlyerEl = flyer;

      // Hacer que Bity reaccione con alegría cuando pasa Papá Noel
      this.triggerBityReaction('bity-xmas-react-santa', 3600);

      // Si el sonido global está activado, reproducir cascabeles suaves
      if (global.MagicAudioEngine && typeof global.MagicAudioEngine.playJingleBells === 'function') {
        try {
          global.MagicAudioEngine.playJingleBells();
        } catch (e) {}
      }

      if (this.flightEndTimerId) clearTimeout(this.flightEndTimerId);
      this.flightEndTimerId = setTimeout(() => {
        this.removeCurrentFlyer();
        this.isFlying = false;
        this.scheduleNextFlight();
      }, this.flightDurationMs);

      return true;
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
      if (this.overlayContainer) {
        this.overlayContainer.innerHTML = '';
      }
      this.isFlying = false;
    }
  }

  // Exportar instancia global única (singleton)
  const santaManagerInstance = new MagicSantaManager();
  global.magicSantaManager = santaManagerInstance;

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => santaManagerInstance.init());
    } else {
      santaManagerInstance.init();
    }
  }

})(typeof window !== 'undefined' ? window : global);
