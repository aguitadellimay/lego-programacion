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
      this.minIntervalMs = 60000;
      this.maxIntervalMs = 120000;
      this.initialDelayMs = 45000; // No aparecer de golpe al cargar

      // Control de no repetición consecutiva
      this.lastAnimIndex = -1;
      this.lastMsgIndex = -1;

      // Banco de mensajes divertidos y motivadores
      this.messages = [
        '¡BUUU! ¡A PROGRAMAR!',
        '¡EL VAMPIRO QUIERE VER TU CÓDIGO!',
        '¡QUÉ MISTERIOSO! ¿RESOLVISTE EL DESAFÍO?',
        '¡LA MAGIA ESTÁ EN TUS BLOQUES!',
        '¡FELIZ HALLOWEEN, PROGRAMADOR!'
      ];

      // Tipos de animación disponibles
      this.animationTypes = [
        'fly-across',   // Cruza volando de lado a lado
        'peek-corner',  // Se asoma desde la esquina inferior saludando
        'smoke-bat',    // Humo violeta, saluda y se convierte en murciélago
        'peek-behind',  // Se asoma desde el lateral de la pantalla
        'hover-float'   // Desciende flotando con su capa y hace una reverencia
      ];

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
    spawnVampire(forcedAnim = null, forcedMsg = null) {
      if (!this.enabled && !forcedAnim) return;

      const overlay = this.ensureOverlayContainer();
      this.isAppearing = true;

      const animType = forcedAnim || this.getRandomAnimation();
      const messageText = forcedMsg || this.getRandomMessage();

      // Reproducir sonido si el audio global está activado
      if (typeof window !== 'undefined' && window.MagicAudioEngine && window.MagicAudioEngine.isEnabled()) {
        if (typeof window.MagicAudioEngine.playVampireAppear === 'function') {
          window.MagicAudioEngine.playVampireAppear();
        }
      }

      // Crear envoltorio de la aparición
      const card = document.createElement('div');
      card.className = `magic-vampire-card anim-${animType}`;
      card.setAttribute('role', 'alert');
      card.setAttribute('aria-live', 'polite');

      // Globo de diálogo
      const bubble = document.createElement('div');
      bubble.className = 'vampire-speech-bubble';
      bubble.innerHTML = `
        <span class="bubble-icon">✨</span>
        <span class="bubble-text">${messageText}</span>
        <span class="bubble-tail"></span>
      `;

      // Personaje (Vampiro y Humo Mágico)
      const characterWrap = document.createElement('div');
      characterWrap.className = 'vampire-character-wrap';
      characterWrap.innerHTML = `
        <div class="vampire-smoke-cloud"></div>
        <div class="vampire-figure-box">${this.createVampireSvg()}</div>
        ${animType === 'smoke-bat' ? `<div class="vampire-bat-box" style="display:none;">${this.createBatSvg()}</div>` : ''}
        <div class="vampire-sparkles-burst">
          <span>✨</span><span>🦇</span><span>✨</span>
        </div>
      `;

      card.appendChild(bubble);
      card.appendChild(characterWrap);

      // Clic para despedir al vampiro anticipadamente (interacción amigable)
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dismissCurrentAppearance();
      });

      overlay.appendChild(card);
      this.activeVampireEl = card;

      // Lógica específica para la transformación de murciélago
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

      // Duración en pantalla: 4.2 segundos y luego retirada suave
      const displayDuration = animType === 'fly-across' ? 4500 : 4000;
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
