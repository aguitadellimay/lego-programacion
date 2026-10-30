/**
 * ===================================================================
 * INFORMÁTICA MÁGICA — SISTEMA DE APARICIONES SORPRESA DE VAMPIROS
 * js/magicVampire.js
 * ===================================================================
 * Gestor singleton de apariciones ocasionales, aleatorias y divertidas
 * de un simpático vampiro caricaturesco por toda la plataforma educativa.
 *
 * Características:
 * - Intervalo configurable (60s a 120s) con retardo inicial prudente (45s).
 * - Gráficos SVG vectoriales propios (sin CDNs externas).
 * - 5 animaciones temáticas no repetitivas consecutivamente.
 * - Mensajes pedagógicos y entretenidos de Halloween.
 * - Respeto de foco, modales y concentración (no interrumpe tareas críticas).
 * - Pausa automática al ocultar la pestaña (visibilitychange).
 * - Integración con MagicAudioEngine (respeto estricto del estado silenciado).
 * - Botón de control global en cabecera con persistencia en localStorage.
 * - Respeto de accesibilidad prefers-reduced-motion.
 * - Contenedor con pointer-events: none (no bloquea clics en controles de la web).
 */

(function (global) {
  'use strict';

  class MagicVampireManager {
    constructor() {
      this.STORAGE_KEY = 'magic_vampires_enabled';
      this.enabled = true;
      this.timerId = null;
      this.activeVampireEl = null;
      this.isAppearing = false;
      this.overlayContainer = null;

      // Frecuencia: entre 60 y 120 segundos
      this.minIntervalMs = 45000; // 45 a 100 segundos
      this.maxIntervalMs = 100000;
      this.initialDelayMs = 25000; // No aparecer de golpe al cargar

      // Control de no repetición consecutiva
      this.lastAnimIndex = -1;
      this.lastMsgIndex = -1;

      // Catálogo de personajes de Halloween
      this.characterTypes = ['vampire', 'pumpkin', 'frankenstein', 'spider', 'ghost'];
      this.lastCharacter = null;

      // Banco de mensajes divertidos y motivadores por personaje
      this.characterMessages = {
        vampire: [
          '¡BUUU! ¡A PROGRAMAR!',
          '¡EL VAMPIRO QUIERE VER TU CÓDIGO!',
          '¡QUÉ MISTERIOSO! ¿RESOLVISTE EL DESAFÍO?',
          '¡LA MAGIA ESTÁ EN TUS BLOQUES!',
          '¡FELIZ HALLOWEEN, PROGRAMADOR!'
        ],
        pumpkin: [
          '¡SOY LA CALABAZA MÁGICA! 🎃',
          '¡EXCELENTES INSTRUCCIONES!',
          '¡ILUMINANDO TUS LÍNEAS DE CÓDIGO!',
          '¡CUIDADO CON LOS CALLEJONES OSCUROS!',
          '¡BUEN RECORRIDO, EXPLORADOR!'
        ],
        frankenstein: [
          '¡HOLA AMIGO! ¡A PROGRAMAR! 🤖💚',
          '¡FRANKIE DICE QUE VAS GENIAL!',
          '¡MIS CIRCUITOS ESTÁN FELICES!',
          '¡VAMOS PASO A PASO A LA META!',
          '¡UN GRAN ALGORITMO, CAMPEÓN!'
        ],
        spider: [
          '¡TEJIENDO LÍNEAS DE CÓDIGO! 🕷️🕸️',
          '¡OCHO PATITAS PARA PROGRAMAR!',
          '¡NO TE ASUSTES, SOY AMIGA!',
          '¡CADA BLOQUE ES UN PASO MÁS!',
          '¡RUTAS SECRETAS DESCUBIERTAS!'
        ],
        ghost: [
          '¡BUUU! ¡QUÉ BUEN ALGORITMO! 👻✨',
          '¡FLOTANDO POR EL ESPACIO!',
          '¡LA MAGIA ESTÁ EN TUS INSTRUCCIONES!',
          '¡LAS PUERTAS MÁGICAS SE ABRIRÁN!',
          '¡A RESOLVER EL GRAN DESAFÍO!'
        ]
      };

      // Animaciones por personaje
      this.characterAnimations = {
        vampire: ['fly-across', 'peek-corner', 'smoke-bat', 'peek-behind', 'hover-float'],
        pumpkin: ['pumpkin-hop', 'pumpkin-blink'],
        frankenstein: ['frank-walk', 'frank-peek'],
        spider: ['spider-drop', 'spider-crawl'],
        ghost: ['ghost-float', 'ghost-peek']
      };

      this.readStoredPreference();
      this.bindTabVisibility();
    }

    /**
     * Lee la preferencia guardada en localStorage
     */
    readStoredPreference() {
      try {
        if (typeof localStorage !== 'undefined') {
          const val = localStorage.getItem(this.STORAGE_KEY);
          if (val !== null) {
            this.enabled = (val === 'true');
          }
        }
      } catch (e) {
        this.enabled = true;
      }
    }

    /**
     * Guarda la preferencia en localStorage
     */
    savePreference() {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(this.STORAGE_KEY, this.enabled ? 'true' : 'false');
        }
      } catch (e) {}
    }

    /**
     * Consulta el estado de activación
     */
    isEnabled() {
      return this.enabled;
    }

    /**
     * Activa o desactiva las apariciones
     */
    setEnabled(enable) {
      this.enabled = Boolean(enable);
      this.savePreference();
      this.updateHeaderButtonUi();

      if (!this.enabled) {
        this.dismissCurrentAppearance();
        this.clearScheduledTimer();
      } else {
        this.scheduleNextAppearance(this.initialDelayMs);
      }
    }

    /**
     * Alterna el estado (usado por el botón en la cabecera)
     */
    toggleVampires() {
      this.setEnabled(!this.enabled);
      return this.enabled;
    }

    /**
     * Actualiza el botón de control en la cabecera
     */
    updateHeaderButtonUi() {
      if (typeof document === 'undefined') return;

      const btn = document.getElementById('btn-global-vampire-toggle');
      const icon = document.getElementById('global-vampire-icon');
      const label = document.getElementById('global-vampire-label');

      if (!btn) return;

      if (this.enabled) {
        btn.classList.add('vampire-active');
        btn.setAttribute('aria-pressed', 'true');
        btn.title = 'Apariciones sorpresa activadas (clic para silenciar)';
        if (icon) icon.textContent = '🧛';
        if (label) label.textContent = 'VAMPIROS ACTIVADOS';
      } else {
        btn.classList.remove('vampire-active');
        btn.setAttribute('aria-pressed', 'false');
        btn.title = 'Apariciones sorpresa desactivadas (clic para activar)';
        if (icon) icon.textContent = '🦇';
        if (label) label.textContent = 'VAMPIROS DESACTIVADOS';
      }
    }

    /**
     * Pausa/reanuda según visibilidad de la pestaña del navegador
     */
    bindTabVisibility() {
      if (typeof document === 'undefined') return;

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.clearScheduledTimer();
        } else if (this.enabled && !this.isAppearing) {
          // Reanudar con un tiempo aleatorio entre 30s y 60s al volver
          this.scheduleNextAppearance(30000 + Math.random() * 30000);
        }
      });
    }

    /**
     * Inicializa el gestor cuando el DOM está listo
     */
    init() {
      if (typeof document === 'undefined') return;

      this.ensureOverlayContainer();
      this.bindHeaderButton();
      this.updateHeaderButtonUi();

      if (this.enabled) {
        this.scheduleNextAppearance(this.initialDelayMs);
      }
    }

    /**
     * Vincula el botón de la cabecera
     */
    bindHeaderButton() {
      const btn = document.getElementById('btn-global-vampire-toggle');
      if (btn && !btn._hasVampireListener) {
        btn._hasVampireListener = true;
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleVampires();
          if (typeof window !== 'undefined' && window.MagicAudioEngine && window.MagicAudioEngine.isEnabled()) {
            window.MagicAudioEngine.playClick();
          }
        });
      }
    }

    /**
     * Crea o recupera el contenedor de overlay fixed (pointer-events: none)
     */
    ensureOverlayContainer() {
      if (this.overlayContainer && document.body.contains(this.overlayContainer)) {
        return this.overlayContainer;
      }

      let el = document.getElementById('magic-vampire-overlay');
      if (!el) {
        el = document.createElement('div');
        el.id = 'magic-vampire-overlay';
        el.className = 'magic-vampire-overlay';
        el.setAttribute('aria-hidden', 'true');
        document.body.appendChild(el);
      }
      this.overlayContainer = el;
      return el;
    }

    /**
     * Cancela temporizadores programados
     */
    clearScheduledTimer() {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
    }

    /**
     * Programa la siguiente aparición ocasional
     */
    scheduleNextAppearance(customDelayMs = null) {
      this.clearScheduledTimer();
      if (!this.enabled) return;

      const delay = customDelayMs !== null
        ? customDelayMs
        : (this.minIntervalMs + Math.random() * (this.maxIntervalMs - this.minIntervalMs));

      this.timerId = setTimeout(() => {
        this.triggerAppearanceIfSafe();
      }, delay);
    }

    /**
     * Comprueba si el entorno es seguro para mostrar el vampiro (sin tapar modales ni interrumpir)
     */
    canSpawn() {
      if (!this.enabled) return false;
      if (this.isAppearing) return false;
      if (typeof document === 'undefined') return false;
      if (document.hidden) return false;

      // No mostrar si hay modales abiertos o diálogos docentes/victoria
      const activeModal = document.querySelector(
        '.modal.active, .modal[style*="display: block"], ' +
        '#modal-teacher-panel[style*="display: block"], ' +
        '#modal-teacher-login[style*="display: block"], ' +
        '#modal-module-blocked-notice[style*="display: block"], ' +
        '#modal-plat-complete-campaign[style*="display: flex"], ' +
        '#modal-final-mission-cinematic[style*="display: flex"]'
      );
      if (activeModal) return false;

      // No mostrar si el alumno está tipeando en un input
      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return false;

      return true;
    }

    /**
     * Intenta mostrar la aparición si se cumplen las condiciones de seguridad
     */
    triggerAppearanceIfSafe() {
      if (!this.canSpawn()) {
        // Reintentar en 15 segundos
        this.scheduleNextAppearance(15000);
        return;
      }
      this.spawnVampire();
    }

    /**
     * Selecciona una animación sin repetir la anterior
     */
    getRandomAnimation() {
      let idx;
      do {
        idx = Math.floor(Math.random() * this.animationTypes.length);
      } while (idx === this.lastAnimIndex && this.animationTypes.length > 1);
      this.lastAnimIndex = idx;
      return this.animationTypes[idx];
    }

    /**
     * Selecciona un mensaje sin repetir el anterior
     */
    getRandomMessage() {
      let idx;
      do {
        idx = Math.floor(Math.random() * this.messages.length);
      } while (idx === this.lastMsgIndex && this.messages.length > 1);
      this.lastMsgIndex = idx;
      return this.messages[idx];
    }

    /**
     * Genera el SVG del Vampiro Caricaturesco Amigable
     */
    createVampireSvg() {
      return `
        <svg class="vampire-svg-figure" viewBox="0 0 160 180" width="140" height="160" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="vampEyeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FFDD55"/>
              <stop offset="70%" stop-color="#FF7518"/>
              <stop offset="100%" stop-color="#B34700"/>
            </radialGradient>
            <linearGradient id="capeOuter" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#1A1429"/>
              <stop offset="100%" stop-color="#0B0A16"/>
            </linearGradient>
            <linearGradient id="capeInner" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#B5179E"/>
              <stop offset="50%" stop-color="#7209B7"/>
              <stop offset="100%" stop-color="#3A0CA3"/>
            </linearGradient>
            <linearGradient id="vampSkin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#EDE9FE"/>
              <stop offset="100%" stop-color="#DDD6FE"/>
            </linearGradient>
          </defs>

          <!-- Capa Exterior Oscura -->
          <path class="vamp-cape-outer" d="M 30 50 Q 80 30 130 50 Q 155 120 145 165 Q 80 145 15 165 Q 5 120 30 50 Z" fill="url(#capeOuter)" stroke="#A970FF" stroke-width="2"/>

          <!-- Cuello Alto Puntiagudo de Vampiro (Interior Violeta/Carmesí) -->
          <polygon points="32,48 55,20 70,55" fill="url(#capeInner)" stroke="#FF7518" stroke-width="1.5"/>
          <polygon points="128,48 105,20 90,55" fill="url(#capeInner)" stroke="#FF7518" stroke-width="1.5"/>

          <!-- Interior de la Capa Abierta -->
          <path class="vamp-cape-inner" d="M 45 60 Q 80 50 115 60 L 125 150 Q 80 160 35 150 Z" fill="url(#capeInner)"/>

          <!-- Torso / Traje Elegante con Chaleco -->
          <rect x="58" y="70" width="44" height="65" rx="8" fill="#17102B" stroke="#54258A" stroke-width="2"/>
          <!-- Camisa Blanca -->
          <polygon points="80,70 68,90 92,90" fill="#F8FAFC"/>
          <!-- Moño o Murciélago Joya en el Cuello -->
          <polygon points="73,73 87,73 80,78" fill="#FF7518"/>
          <circle cx="80" cy="74" r="3" fill="#FACC15"/>
          <!-- Botones Dorados -->
          <circle cx="80" cy="98" r="2.5" fill="#FACC15"/>
          <circle cx="80" cy="112" r="2.5" fill="#FACC15"/>
          <circle cx="80" cy="126" r="2.5" fill="#FACC15"/>

          <!-- Cabeza del Vampiro -->
          <ellipse cx="80" cy="52" rx="24" ry="26" fill="url(#vampSkin)" stroke="#17102B" stroke-width="2"/>

          <!-- Orejas Puntiagudas -->
          <polygon points="56,50 48,42 58,40" fill="url(#vampSkin)" stroke="#17102B" stroke-width="1.5"/>
          <polygon points="104,50 112,42 102,40" fill="url(#vampSkin)" stroke="#17102B" stroke-width="1.5"/>

          <!-- Cabello Negro con Pico de Viuda -->
          <path d="M 56 46 Q 80 20 104 46 Q 96 32 80 40 Q 64 32 56 46 Z" fill="#0B0A16"/>
          <path d="M 56 46 Q 52 30 70 24 Q 90 24 104 46 Q 102 30 80 22 Q 58 30 56 46 Z" fill="#0B0A16"/>

          <!-- Cejas Pícaras / Arqueadas -->
          <path d="M 66 45 Q 73 40 77 46" stroke="#0B0A16" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <path d="M 94 45 Q 87 40 83 46" stroke="#0B0A16" stroke-width="2.5" fill="none" stroke-linecap="round"/>

          <!-- Ojos Grandes Luminosos -->
          <ellipse cx="71" cy="53" rx="5.5" ry="6.5" fill="#0B0A16"/>
          <ellipse cx="71" cy="53" rx="4" ry="5" fill="url(#vampEyeGlow)"/>
          <circle cx="70" cy="51" r="1.5" fill="#FFFFFF"/>

          <ellipse cx="89" cy="53" rx="5.5" ry="6.5" fill="#0B0A16"/>
          <ellipse cx="89" cy="53" rx="4" ry="5" fill="url(#vampEyeGlow)"/>
          <circle cx="88" cy="51" r="1.5" fill="#FFFFFF"/>

          <!-- Nariz Simpática -->
          <circle cx="80" cy="60" r="1.5" fill="#B3A9CE"/>

          <!-- Sonrisa Traviesa con Colmillitos Pequeños (Sin Sangre) -->
          <path d="M 72 66 Q 80 73 88 66" stroke="#17102B" stroke-width="2.2" fill="none" stroke-linecap="round"/>
          <!-- Colmillo Izquierdo -->
          <polygon points="74,67 77,67 75.5,73" fill="#FFFFFF" stroke="#17102B" stroke-width="0.8"/>
          <!-- Colmillo Derecho -->
          <polygon points="83,67 86,67 84.5,73" fill="#FFFFFF" stroke="#17102B" stroke-width="0.8"/>

          <!-- Manos con Guantes Blancos Saludando -->
          <g class="vamp-hand-left">
            <ellipse cx="40" cy="95" rx="7" ry="8" fill="#FFFFFF" stroke="#17102B" stroke-width="1.5"/>
            <circle cx="43" cy="90" r="2.5" fill="#FFFFFF"/>
          </g>
          <g class="vamp-hand-right">
            <ellipse cx="120" cy="95" rx="7" ry="8" fill="#FFFFFF" stroke="#17102B" stroke-width="1.5"/>
            <circle cx="117" cy="90" r="2.5" fill="#FFFFFF"/>
          </g>

          <!-- Murciélagos Decorativos Pequeños Acompañantes -->
          <g class="vamp-mini-bat bat-orbit-1" transform="translate(18, 25) scale(0.6)">
            <path d="M 12 8 Q 8 2 2 4 Q 6 10 12 12 Q 18 10 22 4 Q 16 2 12 8 Z" fill="#9BE564"/>
          </g>
          <g class="vamp-mini-bat bat-orbit-2" transform="translate(125, 30) scale(0.5)">
            <path d="M 12 8 Q 8 2 2 4 Q 6 10 12 12 Q 18 10 22 4 Q 16 2 12 8 Z" fill="#FF7518"/>
          </g>
        </svg>
      `;
    }

    /**
     * Genera el SVG del Murciélago Caricaturesco (para la animación smoke-bat)
     */
    createBatSvg() {
      return `
        <svg class="vampire-bat-transform" viewBox="0 0 100 80" width="90" height="70" xmlns="http://www.w3.org/2000/svg">
          <!-- Alas de murciélago animadas -->
          <path class="bat-wings" d="M 50 40 Q 30 15 5 25 Q 15 45 25 50 Q 35 60 50 45 Q 65 60 75 50 Q 85 45 95 25 Q 70 15 50 40 Z" fill="#54258A" stroke="#A970FF" stroke-width="2"/>
          <!-- Cuerpo redondito -->
          <ellipse cx="50" cy="45" rx="14" ry="18" fill="#17102B" stroke="#0B0A16" stroke-width="2"/>
          <!-- Orejitas puntiagudas -->
          <polygon points="40,32 35,16 46,26" fill="#17102B" stroke="#A970FF" stroke-width="1.5"/>
          <polygon points="60,32 65,16 54,26" fill="#17102B" stroke="#A970FF" stroke-width="1.5"/>
          <!-- Ojos amarillos luminosos -->
          <circle cx="45" cy="42" r="3.5" fill="#FACC15"/>
          <circle cx="55" cy="42" r="3.5" fill="#FACC15"/>
          <circle cx="45" cy="42" r="1.5" fill="#0B0A16"/>
          <circle cx="55" cy="42" r="1.5" fill="#0B0A16"/>
          <!-- Colmillitos -->
          <polygon points="47,52 49,52 48,55" fill="#FFFFFF"/>
          <polygon points="51,52 53,52 52,55" fill="#FFFFFF"/>
        </svg>
      `;
    }

    /**
     * Crea y reproduce la aparición del vampiro en pantalla
     */

    /**
     * SVG de Calabaza Saltarina / Parpadeante
     */
    createPumpkinSvg() {
      return `
        <svg class="halloween-svg-pumpkin" viewBox="0 0 140 140" width="130" height="130" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="pumpGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FFAE42"/>
              <stop offset="70%" stop-color="#FF7518"/>
              <stop offset="100%" stop-color="#B34700"/>
            </radialGradient>
            <radialGradient id="pumpEyeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="50%" stop-color="#FDE047"/>
              <stop offset="100%" stop-color="#FF7518"/>
            </radialGradient>
          </defs>
          <path d="M 68 25 Q 70 8 82 12 Q 78 26 72 26 Z" fill="#22C55E" stroke="#15803D" stroke-width="2"/>
          <path d="M 74 18 Q 88 16 86 24 Q 78 26 74 18 Z" fill="#4ADE80"/>
          <ellipse cx="40" cy="75" rx="28" ry="42" fill="url(#pumpGrad)" stroke="#1F1300" stroke-width="2"/>
          <ellipse cx="100" cy="75" rx="28" ry="42" fill="url(#pumpGrad)" stroke="#1F1300" stroke-width="2"/>
          <ellipse cx="52" cy="76" rx="28" ry="45" fill="url(#pumpGrad)" stroke="#1F1300" stroke-width="2"/>
          <ellipse cx="88" cy="76" rx="28" ry="45" fill="url(#pumpGrad)" stroke="#1F1300" stroke-width="2"/>
          <ellipse cx="70" cy="77" rx="30" ry="46" fill="url(#pumpGrad)" stroke="#1F1300" stroke-width="2"/>
          <polygon points="52,60 62,60 57,72" fill="url(#pumpEyeGlow)" stroke="#7C2D12" stroke-width="1.5" class="pumpkin-eye"/>
          <polygon points="88,60 78,60 83,72" fill="url(#pumpEyeGlow)" stroke="#7C2D12" stroke-width="1.5" class="pumpkin-eye"/>
          <polygon points="70,73 66,80 74,80" fill="url(#pumpEyeGlow)"/>
          <path d="M 46 88 Q 70 112 94 88 Q 88 100 70 100 Q 52 100 46 88 Z" fill="url(#pumpEyeGlow)" stroke="#7C2D12" stroke-width="1.5"/>
          <polygon points="62,90 66,90 66,96 62,96" fill="#1F1300"/>
        </svg>
      `;
    }

    /**
     * SVG de Frankenstein Simpático
     */
    createFrankensteinSvg() {
      return `
        <svg class="halloween-svg-frank" viewBox="0 0 150 170" width="130" height="150" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="frankSkin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#86EFAC"/>
              <stop offset="100%" stop-color="#22C55E"/>
            </linearGradient>
          </defs>
          <rect x="42" y="96" width="66" height="60" rx="8" fill="#1E293B" stroke="#0F172A" stroke-width="2"/>
          <polygon points="75,96 62,118 88,118" fill="#93C5FD"/>
          <rect x="24" y="60" width="12" height="8" rx="2" fill="#94A3B8" stroke="#475569" stroke-width="1.5"/>
          <rect x="114" y="60" width="12" height="8" rx="2" fill="#94A3B8" stroke="#475569" stroke-width="1.5"/>
          <rect x="36" y="24" width="78" height="74" rx="14" fill="url(#frankSkin)" stroke="#14532D" stroke-width="2.5"/>
          <path d="M 36 38 L 36 24 L 114 24 L 114 38 L 104 30 L 94 38 L 84 30 L 74 38 L 64 30 L 54 38 L 44 30 Z" fill="#0F172A"/>
          <path d="M 48 38 L 62 46" stroke="#14532D" stroke-width="2" stroke-linecap="round"/>
          <line x1="51" y1="39" x2="53" y2="43" stroke="#14532D" stroke-width="1.5"/>
          <line x1="57" y1="42" x2="59" y2="46" stroke="#14532D" stroke-width="1.5"/>
          <line x1="50" y1="52" x2="66" y2="52" stroke="#0F172A" stroke-width="3" stroke-linecap="round"/>
          <line x1="84" y1="52" x2="100" y2="52" stroke="#0F172A" stroke-width="3" stroke-linecap="round"/>
          <circle cx="58" cy="62" r="7" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/>
          <circle cx="58" cy="62" r="3.5" fill="#0F172A"/>
          <circle cx="56" cy="60" r="1.5" fill="#FFFFFF"/>
          <circle cx="92" cy="62" r="7" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/>
          <circle cx="92" cy="62" r="3.5" fill="#0F172A"/>
          <circle cx="90" cy="60" r="1.5" fill="#FFFFFF"/>
          <circle cx="75" cy="70" r="3" fill="#15803D"/>
          <path d="M 62 78 Q 75 88 88 78" stroke="#0F172A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <g class="frank-arm-wave">
            <path d="M 108 105 Q 128 95 132 80" stroke="#1E293B" stroke-width="14" stroke-linecap="round" fill="none"/>
            <circle cx="132" cy="78" r="8" fill="url(#frankSkin)" stroke="#14532D" stroke-width="1.5"/>
          </g>
        </svg>
      `;
    }

    /**
     * SVG de Araña Traviesa que Cuelga de Hilo de Seda
     */
    createSpiderSvg() {
      return `
        <svg class="halloween-svg-spider" viewBox="0 0 130 150" width="110" height="130" xmlns="http://www.w3.org/2000/svg">
          <line x1="65" y1="0" x2="65" y2="55" stroke="#E2E8F0" stroke-width="1.5" stroke-dasharray="3,2" class="spider-silk-thread"/>
          <path d="M 52 75 Q 25 55 15 75" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round" class="spider-leg leg-1"/>
          <path d="M 52 82 Q 20 75 10 95" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round" class="spider-leg leg-2"/>
          <path d="M 52 89 Q 22 95 18 115" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round" class="spider-leg leg-3"/>
          <path d="M 54 96 Q 30 115 32 130" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round" class="spider-leg leg-4"/>
          <path d="M 78 75 Q 105 55 115 75" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round" class="spider-leg leg-5"/>
          <path d="M 78 82 Q 110 75 120 95" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round" class="spider-leg leg-6"/>
          <path d="M 78 89 Q 108 95 112 115" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round" class="spider-leg leg-7"/>
          <path d="M 76 96 Q 100 115 98 130" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round" class="spider-leg leg-8"/>
          <ellipse cx="65" cy="90" rx="22" ry="24" fill="#1E1B4B" stroke="#A855F7" stroke-width="2"/>
          <ellipse cx="65" cy="72" rx="15" ry="14" fill="#312E81" stroke="#A855F7" stroke-width="2"/>
          <circle cx="59" cy="70" r="5" fill="#FFFFFF"/>
          <circle cx="59" cy="70" r="2.5" fill="#0F172A"/>
          <circle cx="58" cy="68" r="1" fill="#FFFFFF"/>
          <circle cx="71" cy="70" r="5" fill="#FFFFFF"/>
          <circle cx="71" cy="70" r="2.5" fill="#0F172A"/>
          <circle cx="70" cy="68" r="1" fill="#FFFFFF"/>
          <circle cx="52" cy="72" r="2" fill="#FDE047"/>
          <circle cx="78" cy="72" r="2" fill="#FDE047"/>
          <path d="M 61 77 Q 65 81 69 77" stroke="#FFFFFF" stroke-width="1.5" fill="none"/>
        </svg>
      `;
    }

    /**
     * SVG de Fantasma Cósmico Amigable
     */
    createGhostSvg() {
      return `
        <svg class="halloween-svg-ghost" viewBox="0 0 130 150" width="115" height="135" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="ghostGlow" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="60%" stop-color="#E0E7FF"/>
              <stop offset="100%" stop-color="#A5B4FC"/>
            </radialGradient>
          </defs>
          <path d="M 30 70 C 30 30 100 30 100 70 C 100 110 105 130 92 125 C 82 120 78 132 65 125 C 52 118 48 130 38 125 C 28 120 30 100 30 70 Z" fill="url(#ghostGlow)" stroke="#818CF8" stroke-width="2"/>
          <path d="M 32 75 Q 15 65 18 55 Q 26 55 35 68" fill="url(#ghostGlow)" stroke="#818CF8" stroke-width="1.5"/>
          <path d="M 98 75 Q 115 65 112 55 Q 104 55 95 68" fill="url(#ghostGlow)" stroke="#818CF8" stroke-width="1.5"/>
          <ellipse cx="54" cy="62" rx="4.5" ry="6.5" fill="#1E1B4B"/>
          <circle cx="53" cy="60" r="1.5" fill="#FFFFFF"/>
          <ellipse cx="76" cy="62" rx="4.5" ry="6.5" fill="#1E1B4B"/>
          <circle cx="75" cy="60" r="1.5" fill="#FFFFFF"/>
          <circle cx="48" cy="70" r="4" fill="#F472B6" opacity="0.6"/>
          <circle cx="82" cy="70" r="4" fill="#F472B6" opacity="0.6"/>
          <ellipse cx="65" cy="72" rx="4" ry="5.5" fill="#1E1B4B"/>
        </svg>
      `;
    }

    spawnVampire(forcedAnim = null, forcedMsg = null, forcedChar = null) {
      if (!this.enabled && !forcedAnim) return;

      const overlay = this.ensureOverlayContainer();
      this.isAppearing = true;

      // Elegir personaje al azar sin repetir el anterior
      let charType = forcedChar;
      if (!charType) {
        const pool = this.characterTypes.filter(c => c !== this.lastCharacter);
        charType = pool[Math.floor(Math.random() * pool.length)] || 'vampire';
      }
      this.lastCharacter = charType;

      // Elegir animación para este personaje
      const anims = this.characterAnimations[charType] || ['fly-across'];
      const animType = forcedAnim || anims[Math.floor(Math.random() * anims.length)];

      // Elegir mensaje para este personaje
      const msgs = this.characterMessages[charType] || ['¡A PROGRAMAR!'];
      const messageText = forcedMsg || msgs[Math.floor(Math.random() * msgs.length)];

      // Audio suave si está habilitado
      if (typeof window !== 'undefined' && window.MagicAudioEngine && window.MagicAudioEngine.isEnabled()) {
        if (typeof window.MagicAudioEngine.playVampireAppear === 'function') {
          window.MagicAudioEngine.playVampireAppear();
        }
      }

      // Generar figura SVG según personaje
      let svgHtml = '';
      if (charType === 'pumpkin') svgHtml = this.createPumpkinSvg();
      else if (charType === 'frankenstein') svgHtml = this.createFrankensteinSvg();
      else if (charType === 'spider') svgHtml = this.createSpiderSvg();
      else if (charType === 'ghost') svgHtml = this.createGhostSvg();
      else svgHtml = this.createVampireSvg();

      // Crear envoltorio
      const card = document.createElement('div');
      card.className = `magic-vampire-card char-${charType} anim-${animType}`;
      card.setAttribute('role', 'alert');
      card.setAttribute('aria-live', 'polite');

      // Globo de diálogo
      const bubble = document.createElement('div');
      bubble.className = 'vampire-speech-bubble';
      let icon = '✨';
      if (charType === 'pumpkin') icon = '🎃';
      else if (charType === 'frankenstein') icon = '🤖';
      else if (charType === 'spider') icon = '🕷️';
      else if (charType === 'ghost') icon = '👻';
      else icon = '🧛';

      bubble.innerHTML = `
        <span class="bubble-icon">${icon}</span>
        <span class="bubble-text">${messageText}</span>
        <span class="bubble-tail"></span>
      `;

      // Personaje
      const characterWrap = document.createElement('div');
      characterWrap.className = 'vampire-character-wrap';
      characterWrap.innerHTML = `
        <div class="vampire-smoke-cloud"></div>
        <div class="vampire-figure-box">${svgHtml}</div>
        ${animType === 'smoke-bat' ? `<div class="vampire-bat-box" style="display:none;">${this.createBatSvg()}</div>` : ''}
        <div class="vampire-sparkles-burst">
          <span>✨</span><span>${icon}</span><span>✨</span>
        </div>
      `;

      card.appendChild(bubble);
      card.appendChild(characterWrap);

      card.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dismissCurrentAppearance();
      });

      overlay.appendChild(card);
      this.activeVampireEl = card;

      if (animType === 'smoke-bat') {
        setTimeout(() => {
          if (!this.activeVampireEl) return;
          const figBox = card.querySelector('.vampire-figure-box');
          const batBox = card.querySelector('.vampire-bat-box');
          const smoke = card.querySelector('.vampire-smoke-cloud');
          if (smoke) smoke.classList.add('puff-active');
          if (figBox) figBox.style.display = 'none';
          if (batBox) batBox.style.display = 'block';
        }, 2200);
      }

      const displayDuration = animType === 'fly-across' || animType === 'frank-walk' ? 4800 : 4200;
      setTimeout(() => {
        this.finishAppearance(card);
      }, displayDuration);
    }

    /**
     * Termina la aparición suavemente con animación de salida
     */
    finishAppearance(cardEl) {
      if (!cardEl || !cardEl.parentNode) {
        this.isAppearing = false;
        this.activeVampireEl = null;
        this.scheduleNextAppearance();
        return;
      }

      cardEl.classList.add('vampire-exiting');

      setTimeout(() => {
        if (cardEl && cardEl.parentNode) {
          cardEl.parentNode.removeChild(cardEl);
        }
        if (this.activeVampireEl === cardEl) {
          this.activeVampireEl = null;
        }
        this.isAppearing = false;
        // Programar la siguiente
        this.scheduleNextAppearance();
      }, 600);
    }

    /**
     * Despide inmediatamente al vampiro actual (usado al silenciar o hacer clic)
     */
    dismissCurrentAppearance() {
      if (this.activeVampireEl) {
        const el = this.activeVampireEl;
        this.activeVampireEl = null;
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }
      this.isAppearing = false;
    }

    /**
     * Método público para pruebas manuales o automatizadas inmediatas
     */
    triggerImmediateAppearance(animType = null, messageText = null) {
      this.dismissCurrentAppearance();
      this.clearScheduledTimer();
      this.spawnVampire(animType, messageText);
    }
  }

  // Instanciar singleton
  const manager = new MagicVampireManager();
  global.MagicVampireManager = manager;

  // Auto-inicio tras DOMContentLoaded
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => manager.init());
    } else {
      manager.init();
    }
  }

})(typeof window !== 'undefined' ? window : global);
