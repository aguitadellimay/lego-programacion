/**
 * ===================================================================
 * INFORMÁTICA MÁGICA — SISTEMA DE PAPÁ NOEL EN SU TRINEO
 * js/magicSanta.js
 * ===================================================================
 * Gestor singleton de las apariciones ocasionales de Papá Noel recorriendo
 * la parte superior de la pantalla en su trineo tirado por renos.
 *
 * Características:
 * - Desplazamiento horizontal fluido y natural de izquierda a derecha.
 * - Renos mágicos (con Rodolfo y su nariz roja luminosa).
 * - Trineo de Papá Noel cargado de regalos y estrellas.
 * - Rastro de copos de nieve y estrellas titilantes.
 * - Frecuencia ocasional (intervalo de 45s a 75s con retardo inicial de 20s).
 * - Rótulo festivo con mensajes motivadores de programación y Navidad.
 * - Sleigh bells suaves al volar si el sonido está habilitado.
 * - Totalmente no intrusivo (pointer-events: none; z-index seguro).
 * - Botón de control global en cabecera con persistencia en localStorage.
 * - Respeta prefers-reduced-motion y pausa en segundo plano (visibilitychange).
 * - Compatible hacia atrás con cualquier llamada previa a magicVampireManager.
 */

(function (global) {
  'use strict';

  class MagicSantaManager {
    constructor() {
      this.STORAGE_KEY = 'magic_santa_enabled';
      this.enabled = true;
      this.timerId = null;
      this.activeFlyerEl = null;
      this.isFlying = false;
      this.overlayContainer = null;

      // Frecuencia: entre 45s y 75s
      this.minIntervalMs = 45000;
      this.maxIntervalMs = 75000;
      this.initialDelayMs = 20000;

      // Mensajes festivos y motivadores de programación
      this.santaMessages = [
        '¡JO JO JO! ¡A PROGRAMAR EN NAVIDAD! 🎅🎄',
        '¡QUÉ HERMOSOS ALGORITMOS ESTÁS CREANDO! ⭐🎁',
        '¡RODOLFO Y SUS RENOS GUÍAN TUS INSTRUCCIONES! 🦌✨',
        '¡UN REGALO DE SABIDURÍA PARA TU CÓDIGO! 🎁🌟',
        '¡JO JO JO! ¡CADA PASO TE ACERCA A LA META! 🎄🚀',
        '¡LA MAGIA DE LA NAVIDAD ESTÁ EN TUS BLOQUES! 🎅⭐'
      ];
      this.lastMsgIndex = -1;

      this.readStoredPreference();
      this.bindTabVisibility();
    }

    readStoredPreference() {
      try {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        // Si no hay valor guardado, por defecto activado
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
        this.scheduleNextFlight(this.initialDelayMs);
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
      const btn = document.getElementById('btn-global-santa-toggle') || document.getElementById('btn-global-vampire-toggle');
      const icon = document.getElementById('global-santa-icon') || document.getElementById('global-vampire-icon');
      const label = document.getElementById('global-santa-label') || document.getElementById('global-vampire-label');

      if (!btn) return;

      btn.classList.toggle('santa-active', this.enabled);
      btn.classList.toggle('vampire-active', this.enabled);
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
          this.scheduleNextFlight(this.initialDelayMs);
        }
      });
    }

    init() {
      if (typeof document === 'undefined') return;

      this.ensureOverlayContainer();
      this.updateHeaderButtonUi();

      const btn = document.getElementById('btn-global-santa-toggle') || document.getElementById('btn-global-vampire-toggle');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleEnabled();
        });
      }

      if (this.enabled) {
        this.scheduleNextFlight(this.initialDelayMs);
      }
    }

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
    }

    scheduleNextFlight(delayMs) {
      this.clearFlightTimer();
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
        <svg viewBox="0 0 340 120" xmlns="http://www.w3.org/2000/svg" class="santa-sleigh-svg">
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
              <stop offset="0%" stop-color="#a16207"/>
              <stop offset="100%" stop-color="#713f12"/>
            </linearGradient>
          </defs>

          <!-- RIENDAS MÁGICAS DORADAS -->
          <path d="M 120 62 Q 170 50 220 54 Q 260 52 290 52" fill="none" stroke="url(#goldTrim)" stroke-width="2.5" stroke-dasharray="4 2"/>

          <!-- 1. RENO LÍDER (RODOLFO CON NARIZ ROJA BRILLANTE) -->
          <g transform="translate(260, 28)" class="reindeer-group reindeer-rudolph">
            <!-- Patas delanteras galopando -->
            <path d="M 28 32 L 38 48 M 24 32 L 32 46" stroke="#713f12" stroke-width="3" stroke-linecap="round"/>
            <!-- Patas traseras galopando -->
            <path d="M 6 30 L -4 44 M 12 30 L 2 46" stroke="#713f12" stroke-width="3" stroke-linecap="round"/>
            <!-- Cuerpo -->
            <ellipse cx="18" cy="24" rx="16" ry="10" fill="url(#reindeerFur)"/>
            <!-- Cuello y Cabeza -->
            <path d="M 26 22 L 36 12 Q 40 10 44 14 Q 40 22 32 26 Z" fill="url(#reindeerFur)"/>
            <!-- Oreja -->
            <path d="M 33 10 L 30 4 L 35 8 Z" fill="#ca8a04"/>
            <!-- Astas doradas -->
            <path d="M 34 8 Q 30 -4 34 -10 M 32 -3 L 26 -7 M 33 -6 L 38 -9" fill="none" stroke="url(#goldTrim)" stroke-width="2.2" stroke-linecap="round"/>
            <!-- Ojo feliz -->
            <circle cx="38" cy="13" r="1.5" fill="#ffffff"/>
            <circle cx="38.5" cy="13" r="0.8" fill="#000000"/>
            <!-- Cascabeles en el arnés -->
            <circle cx="28" cy="24" r="3" fill="#facc15"/>
            <!-- NARIZ ROJA LUMINOSA DE RODOLFO -->
            <circle cx="43" cy="16" r="3.5" fill="#ef4444" class="rudolph-nose-glow"/>
          </g>

          <!-- 2. RENO COMPAÑERO -->
          <g transform="translate(195, 34)" class="reindeer-group">
            <path d="M 28 32 L 36 46 M 24 32 L 30 44" stroke="#713f12" stroke-width="3" stroke-linecap="round"/>
            <path d="M 6 30 L -2 42 M 12 30 L 4 44" stroke="#713f12" stroke-width="3" stroke-linecap="round"/>
            <ellipse cx="18" cy="24" rx="15" ry="9" fill="url(#reindeerFur)"/>
            <path d="M 26 22 L 35 12 Q 39 10 43 14 Q 39 21 31 25 Z" fill="url(#reindeerFur)"/>
            <path d="M 33 8 Q 29 -3 33 -8 M 31 -2 L 26 -5" fill="none" stroke="url(#goldTrim)" stroke-width="2" stroke-linecap="round"/>
            <circle cx="37" cy="13" r="1.3" fill="#ffffff"/>
            <circle cx="37.5" cy="13" r="0.7" fill="#000000"/>
            <circle cx="27" cy="24" r="2.8" fill="#facc15"/>
            <circle cx="42" cy="16" r="2.5" fill="#000000"/>
          </g>

          <!-- 3. TRINEO DE PAPÁ NOEL -->
          <g transform="translate(20, 20)">
            <!-- Patines del trineo dorados -->
            <path d="M 10 82 Q 70 82 110 82 Q 130 82 135 70 Q 138 60 130 58 Q 124 58 126 66 L 15 66" fill="none" stroke="url(#goldTrim)" stroke-width="4.5" stroke-linecap="round"/>
            <line x1="35" y1="66" x2="35" y2="52" stroke="url(#goldTrim)" stroke-width="3"/>
            <line x1="85" y1="66" x2="85" y2="52" stroke="url(#goldTrim)" stroke-width="3"/>

            <!-- Saco de regalos repleto -->
            <path d="M 15 48 Q 12 18 35 15 Q 55 12 55 45 Z" fill="#b91c1c" stroke="#991b1b" stroke-width="2"/>
            <circle cx="48" cy="16" r="4" fill="#facc15"/>
            <!-- Regalos asomando -->
            <rect x="24" y="10" width="16" height="14" rx="2" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
            <rect x="30" y="8" width="4" height="18" fill="#facc15"/>
            <rect x="38" y="14" width="14" height="14" rx="2" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.5"/>

            <!-- PAPÁ NOEL -->
            <!-- Cuerpo rojo -->
            <ellipse cx="68" cy="40" rx="18" ry="16" fill="url(#sleighRed)"/>
            <!-- Cinturón negro con hebilla dorada -->
            <rect x="52" y="42" width="32" height="6" fill="#18181b"/>
            <rect x="64" y="40" width="8" height="10" fill="url(#goldTrim)"/>
            <rect x="66" y="42" width="4" height="6" fill="#18181b"/>
            <!-- Barba blanca tupida -->
            <path d="M 60 32 Q 68 50 76 32 Q 80 44 74 48 Q 68 52 62 48 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
            <!-- Rostro alegre -->
            <circle cx="68" cy="26" r="9" fill="#fed7aa"/>
            <!-- Bigote -->
            <path d="M 64 30 Q 68 33 72 30 Q 74 34 68 35 Q 62 34 64 30 Z" fill="#ffffff"/>
            <!-- Ojos sonrientes -->
            <path d="M 63 24 Q 65 22 67 24" fill="none" stroke="#451a03" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M 69 24 Q 71 22 73 24" fill="none" stroke="#451a03" stroke-width="1.8" stroke-linecap="round"/>
            <!-- Nariz rosada -->
            <circle cx="68" cy="27" r="2.2" fill="#f87171"/>
            <!-- Gorro de Navidad rojo con pompón blanco -->
            <path d="M 58 22 Q 68 12 78 22 L 78 20 Q 76 4 60 6 Q 52 8 48 16 Z" fill="url(#sleighRed)"/>
            <rect x="57" y="19" width="22" height="5" rx="2.5" fill="#ffffff"/>
            <circle cx="47" cy="18" r="4" fill="#ffffff"/>
            <!-- Brazo saludando -->
            <path d="M 76 36 Q 88 28 84 18" fill="none" stroke="url(#sleighRed)" stroke-width="6" stroke-linecap="round"/>
            <circle cx="84" cy="18" r="4.5" fill="#ffffff"/>
            <!-- Manopla verde saludando -->
            <circle cx="85" cy="16" r="4" fill="#15803d"/>

            <!-- Estructura del trineo rojo y dorado -->
            <path d="M 12 50 Q 8 36 28 36 L 95 36 Q 115 36 120 54 Q 105 60 15 58 Z" fill="url(#sleighRed)" stroke="url(#goldTrim)" stroke-width="2.5"/>
            <!-- Decoración dorada en el trineo -->
            <path d="M 28 46 Q 65 52 105 46" fill="none" stroke="url(#goldTrim)" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="65" cy="48" r="4" fill="#facc15"/>
            <circle cx="65" cy="48" r="2" fill="#ef4444"/>
          </g>

          <!-- 4. RASTRO MÁGICO DE ESTRELLAS Y NIEVE -->
          <g class="santa-magic-sparkles">
            <polygon points="12,18 14,23 19,23 15,26 17,31 12,28 7,31 9,26 5,23 10,23" fill="#fde047"/>
            <polygon points="4,48 5,51 8,51 6,53 7,56 4,54 1,56 2,53 0,51 3,51" fill="#fef08a"/>
            <circle cx="18" cy="65" r="2" fill="#ffffff"/>
            <circle cx="2" cy="30" r="1.5" fill="#fde047"/>
            <circle cx="8" cy="8" r="2" fill="#67e8f9"/>
          </g>
        </svg>
      `;
    }

    launchSantaFlight() {
      if (!this.enabled || this.isFlying) return;
      if (typeof document === 'undefined') return;

      const container = this.ensureOverlayContainer();
      if (!container) return;

      // Respeto de prefers-reduced-motion
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.scheduleNextFlight();
        return;
      }

      this.isFlying = true;
      const flyer = document.createElement('div');
      flyer.className = 'santa-flight-wrapper';
      flyer.setAttribute('role', 'presentation');

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
          </div>
        </div>
      `;

      container.appendChild(flyer);
      this.activeFlyerEl = flyer;

      // Si el sonido está habilitado, reproducir tintineo suave de cascabeles
      if (global.MagicAudioEngine && typeof global.MagicAudioEngine.playJingleBells === 'function') {
        try {
          global.MagicAudioEngine.playJingleBells();
        } catch (e) {}
      }

      // Duración del vuelo horizontal: 14 segundos
      const flightDurationMs = 14000;

      setTimeout(() => {
        this.removeCurrentFlyer();
        this.isFlying = false;
        // Programar el próximo vuelo
        this.scheduleNextFlight();
      }, flightDurationMs);
    }

    removeCurrentFlyer() {
      if (this.activeFlyerEl) {
        this.activeFlyerEl.remove();
        this.activeFlyerEl = null;
      }
      this.isFlying = false;
    }
  }

  // Exportar instancia global única
  const santaManagerInstance = new MagicSantaManager();
  global.magicSantaManager = santaManagerInstance;
  // Alias de compatibilidad hacia atrás
  global.magicVampireManager = santaManagerInstance;

  // Auto-inicializar al cargar el DOM
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => santaManagerInstance.init());
    } else {
      santaManagerInstance.init();
    }
  }

})(typeof window !== 'undefined' ? window : global);
