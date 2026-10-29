/**
 * magicAudio.js
 * Sistema de Audio Compartido para "Informática Mágica" — Edición de Halloween.
 * 
 * Proporciona:
 * - Sonido ambiental tenebroso (viento nocturno suave, castillo misterioso y campanillas mágicas).
 * - Secuencia de apertura de puerta antigua al ingresar a los módulos.
 * - Efectos de interacción interactivos (aciertos, errores suaves, desbloqueos, victoria, clics).
 * - Botón global sincronizado de activación/desactivación con persistencia en localStorage.
 * - Respeto estricto de las restricciones de autoplay de los navegadores.
 */

(function(global) {
  'use strict';

  class MagicAudioEngine {
    constructor() {
      this.STORAGE_KEY = 'magic_sound_enabled';
      this.ctx = null;
      this.masterGain = null;
      this.ambientGain = null;
      this.ambientNodes = [];
      this.ambientTimer = null;
      this.ambientPlaying = false;
      this.lastDoorTime = 0;

      // Lectura de preferencia guardada (por defecto desactivado hasta interacción)
      this.enabled = false;
      try {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        this.enabled = (saved === 'true');
      } catch (e) {
        this.enabled = false;
      }
    }

    /**
     * Obtiene o inicializa perezosamente el AudioContext
     */
    getAudioContext() {
      if (typeof window === 'undefined') return null;
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;

      if (!this.ctx) {
        try {
          this.ctx = new AudioContextClass();
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(this.enabled ? 1 : 0, this.ctx.currentTime);
          this.masterGain.connect(this.ctx.destination);

          this.ambientGain = this.ctx.createGain();
          this.ambientGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
          this.ambientGain.connect(this.masterGain);
        } catch (err) {
          console.warn('[MagicAudio] No se pudo inicializar AudioContext:', err);
          return null;
        }
      }

      if (this.ctx && this.ctx.state === 'suspended' && this.enabled) {
        this.ctx.resume().catch(() => {});
      }

      return this.ctx;
    }

    /**
     * Inicialización en el DOM y vinculación del botón global
     */
    init() {
      if (typeof document === 'undefined') return;

      this.updateToggleUi();

      const btnToggle = document.getElementById('btn-global-sound-toggle');
      if (btnToggle) {
        btnToggle.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleSound();
        });
      }

      // Desbloquear audio en la primera interacción si el usuario lo tenía habilitado
      const unlockHandler = () => {
        if (this.enabled) {
          const ctx = this.getAudioContext();
          if (ctx && ctx.state === 'suspended') {
            ctx.resume().then(() => {
              if (!this.ambientPlaying) {
                this.playAmbient();
              }
            }).catch(() => {});
          } else if (ctx && !this.ambientPlaying) {
            this.playAmbient();
          }
        }
        document.removeEventListener('click', unlockHandler);
        document.removeEventListener('keydown', unlockHandler);
      };

      document.addEventListener('click', unlockHandler, { once: false });
      document.addEventListener('keydown', unlockHandler, { once: false });

      // Si ya estaba guardado como activado, intentar iniciar
      if (this.enabled) {
        setTimeout(() => {
          this.getAudioContext();
        }, 100);
      }
    }

    /**
     * Alternar activación de sonido global
     */
    toggleSound() {
      this.setSoundEnabled(!this.enabled);
    }

    /**
     * Establecer explícitamente el estado del sonido
     */
    setSoundEnabled(enable) {
      this.enabled = !!enable;

      try {
        localStorage.setItem(this.STORAGE_KEY, this.enabled ? 'true' : 'false');
      } catch (e) {}

      const ctx = this.getAudioContext();
      if (this.enabled) {
        if (ctx) {
          if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
          }
          if (this.masterGain) {
            this.masterGain.gain.cancelScheduledValues(ctx.currentTime);
            this.masterGain.gain.setValueAtTime(1, ctx.currentTime);
          }
        }
        this.playAmbient();
        this.playCorrect(); // Feedback sonoro de confirmación
      } else {
        this.stopAll();
      }

      this.updateToggleUi();
    }

    /**
     * Comprueba si el sonido está habilitado
     */
    isEnabled() {
      return this.enabled;
    }

    /**
     * Actualiza el botón del encabezado en el DOM
     */
    updateToggleUi() {
      if (typeof document === 'undefined') return;
      const btn = document.getElementById('btn-global-sound-toggle');
      const icon = document.getElementById('global-sound-icon');
      const label = document.getElementById('global-sound-label');

      if (!btn) return;

      btn.classList.toggle('sound-active', this.enabled);
      btn.setAttribute('aria-pressed', this.enabled ? 'true' : 'false');

      if (icon) {
        icon.textContent = this.enabled ? '🔊' : '🔇';
      }
      if (label) {
        label.textContent = this.enabled ? 'SONIDOS ACTIVADOS' : 'SONIDOS DESACTIVADOS';
      }
      btn.title = this.enabled 
        ? 'Sonidos activados (Clic para silenciar)' 
        : 'Sonidos desactivados (Clic para activar)';
    }

    /**
     * Inicia el sonido ambiental tenebroso
     */
    playAmbient() {
      if (!this.enabled || this.ambientPlaying) return;
      const ctx = this.getAudioContext();
      if (!ctx || !this.ambientGain) return;

      this.stopAmbient();
      this.ambientNodes = [];

      try {
        // 1. Generador de Viento Nocturno Suave (Ruido blanco filtrado con barrido LFO)
        const bufferSize = ctx.sampleRate * 3;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99 * b0 + white * 0.05;
          b1 = 0.96 * b1 + white * 0.08;
          b2 = 0.92 * b2 + white * 0.12;
          output[i] = (b0 + b1 + b2) * 0.18;
        }

        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = noiseBuffer;
        noiseNode.loop = true;

        const windFilter = ctx.createBiquadFilter();
        windFilter.type = 'bandpass';
        windFilter.frequency.setValueAtTime(320, ctx.currentTime);
        windFilter.Q.setValueAtTime(3.5, ctx.currentTime);

        // Modulación suave de la frecuencia de viento (LFO)
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.15, ctx.currentTime); // Ciclo lento de 6.6 segundos
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(180, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(windFilter.frequency);

        noiseNode.connect(windFilter);
        windFilter.connect(this.ambientGain);

        noiseNode.start();
        lfo.start();

        this.ambientNodes.push(noiseNode, lfo);

        // 2. Drone Misterioso de Castillo (Frecuencias bajas armónicas muy suaves)
        const droneOsc1 = ctx.createOscillator();
        const droneOsc2 = ctx.createOscillator();
        const droneGain = ctx.createGain();

        droneOsc1.type = 'sine';
        droneOsc1.frequency.setValueAtTime(65.4, ctx.currentTime); // Do2

        droneOsc2.type = 'sine';
        droneOsc2.frequency.setValueAtTime(98.0, ctx.currentTime); // Sol2

        droneGain.gain.setValueAtTime(0.045, ctx.currentTime);

        droneOsc1.connect(droneGain);
        droneOsc2.connect(droneGain);
        droneGain.connect(this.ambientGain);

        droneOsc1.start();
        droneOsc2.start();

        this.ambientNodes.push(droneOsc1, droneOsc2);

        this.ambientPlaying = true;

        // 3. Campanillas Mágicas Ocasionales (Ecos lejanos cada 9-16 segundos)
        const scheduleNextChime = () => {
          if (!this.enabled || !this.ambientPlaying) return;
          const delay = 9000 + Math.random() * 7000;
          this.ambientTimer = setTimeout(() => {
            if (this.enabled && this.ambientPlaying) {
              this.playEerieChime();
              scheduleNextChime();
            }
          }, delay);
        };
        scheduleNextChime();

      } catch (err) {
        console.warn('[MagicAudio] Error al reproducir ambiente:', err);
      }
    }

    /**
     * Campanilla misteriosa suave de fondo
     */
    playEerieChime() {
      if (!this.enabled) return;
      const ctx = this.getAudioContext();
      if (!ctx || !this.ambientGain) return;

      const freqs = [587.3, 659.2, 783.9, 880.0, 1046.5]; // Re, Mi, Sol, La, Do
      const f = freqs[Math.floor(Math.random() * freqs.length)];

      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

        osc.connect(gain);
        gain.connect(this.ambientGain);

        osc.start();
        osc.stop(ctx.currentTime + 2.3);
      } catch (e) {}
    }

    /**
     * Detiene el sonido ambiental
     */
    stopAmbient() {
      if (this.ambientTimer) {
        clearTimeout(this.ambientTimer);
        this.ambientTimer = null;
      }
      this.ambientNodes.forEach(node => {
        try {
          node.stop();
          node.disconnect();
        } catch (e) {}
      });
      this.ambientNodes = [];
      this.ambientPlaying = false;
    }

    /**
     * Detiene inmediatamente todos los sonidos
     */
    stopAll() {
      this.stopAmbient();
      const ctx = this.getAudioContext();
      if (ctx && this.masterGain) {
        try {
          this.masterGain.gain.cancelScheduledValues(ctx.currentTime);
          this.masterGain.gain.setValueAtTime(0, ctx.currentTime);
        } catch (e) {}
      }
    }

    /**
     * Secuencia de apertura de puerta antigua de castillo al ingresar a un módulo
     */
    playDoorSequence(callback) {
      if (!this.enabled) {
        if (typeof callback === 'function') callback();
        return;
      }

      const now = Date.now();
      if (now - this.lastDoorTime < 600) {
        // Evitar superposición accidental si hay clics rápidos
        if (typeof callback === 'function') callback();
        return;
      }
      this.lastDoorTime = now;

      const ctx = this.getAudioContext();
      if (!ctx || !this.masterGain) {
        if (typeof callback === 'function') callback();
        return;
      }

      try {
        const t0 = ctx.currentTime;

        // Fase 1: Golpe suave / movimiento de picaporte de madera
        const latchOsc = ctx.createOscillator();
        const latchGain = ctx.createGain();
        latchOsc.type = 'triangle';
        latchOsc.frequency.setValueAtTime(140, t0);
        latchOsc.frequency.exponentialRampToValueAtTime(45, t0 + 0.08);

        latchGain.gain.setValueAtTime(0.25, t0);
        latchGain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.09);

        latchOsc.connect(latchGain);
        latchGain.connect(this.masterGain);
        latchOsc.start(t0);
        latchOsc.stop(t0 + 0.1);

        // Fase 2: Chirrido de puerta antigua de madera abriéndose (Fricción modulada)
        const creakOsc = ctx.createOscillator();
        const creakGain = ctx.createGain();
        const creakFilter = ctx.createBiquadFilter();

        creakOsc.type = 'sawtooth';
        creakOsc.frequency.setValueAtTime(360, t0 + 0.06);
        creakOsc.frequency.linearRampToValueAtTime(190, t0 + 0.28);
        creakOsc.frequency.linearRampToValueAtTime(260, t0 + 0.44);

        creakFilter.type = 'bandpass';
        creakFilter.frequency.setValueAtTime(650, t0 + 0.06);
        creakFilter.Q.setValueAtTime(6.0, t0 + 0.06);

        creakGain.gain.setValueAtTime(0.001, t0 + 0.06);
        creakGain.gain.linearRampToValueAtTime(0.18, t0 + 0.14);
        creakGain.gain.linearRampToValueAtTime(0.14, t0 + 0.32);
        creakGain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.52);

        creakOsc.connect(creakFilter);
        creakFilter.connect(creakGain);
        creakGain.connect(this.masterGain);

        creakOsc.start(t0 + 0.06);
        creakOsc.stop(t0 + 0.53);

        // Fase 3: Eco y destello mágico corto
        const magicOsc = ctx.createOscillator();
        const magicGain = ctx.createGain();
        magicOsc.type = 'sine';
        magicOsc.frequency.setValueAtTime(659.2, t0 + 0.30); // Mi5
        magicOsc.frequency.exponentialRampToValueAtTime(987.7, t0 + 0.65); // Si5

        magicGain.gain.setValueAtTime(0.001, t0 + 0.30);
        magicGain.gain.linearRampToValueAtTime(0.12, t0 + 0.38);
        magicGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.75);

        magicOsc.connect(magicGain);
        magicGain.connect(this.masterGain);

        magicOsc.start(t0 + 0.30);
        magicOsc.stop(t0 + 0.76);

      } catch (err) {
        console.warn('[MagicAudio] Error en secuencia de puerta:', err);
      }

      if (typeof callback === 'function') {
        setTimeout(callback, 120);
      }
    }

    /**
     * Respuesta correcta: Campanilla mágica con destello sonoro
     */
    playCorrect() {
      if (!this.enabled) return;
      const ctx = this.getAudioContext();
      if (!ctx || !this.masterGain) return;

      try {
        const notes = [523.25, 659.25, 783.99, 1046.5]; // Do5, Mi5, Sol5, Do6
        const t0 = ctx.currentTime;

        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const noteTime = t0 + idx * 0.07;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, noteTime);

          gain.gain.setValueAtTime(0.001, noteTime);
          gain.gain.linearRampToValueAtTime(0.15, noteTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.38);

          osc.connect(gain);
          gain.connect(this.masterGain);

          osc.start(noteTime);
          osc.stop(noteTime + 0.4);
        });
      } catch (e) {}
    }

    /**
     * Respuesta incorrecta: Sonido suave de error mágico (amable y no punitivo)
     */
    playIncorrect() {
      if (!this.enabled) return;
      const ctx = this.getAudioContext();
      if (!ctx || !this.masterGain) return;

      try {
        const t0 = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(329.63, t0); // Mi4
        osc.frequency.linearRampToValueAtTime(261.63, t0 + 0.22); // Do4

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, t0);

        gain.gain.setValueAtTime(0.15, t0);
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.26);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t0);
        osc.stop(t0 + 0.28);
      } catch (e) {}
    }

    /**
     * Mecanismo de cerradura mágica / cofre desbloqueado
     */
    playUnlock() {
      if (!this.enabled) return;
      const ctx = this.getAudioContext();
      if (!ctx || !this.masterGain) return;

      try {
        const t0 = ctx.currentTime;
        // Clic metálico 1
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'square';
        osc1.frequency.setValueAtTime(800, t0);
        gain1.gain.setValueAtTime(0.12, t0);
        gain1.gain.exponentialRampToValueAtTime(0.001, t0 + 0.04);
        osc1.connect(gain1);
        gain1.connect(this.masterGain);
        osc1.start(t0);
        osc1.stop(t0 + 0.05);

        // Clic metálico 2 + brillo armónico
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(987.77, t0 + 0.08);
        osc2.frequency.exponentialRampToValueAtTime(1318.51, t0 + 0.35);
        gain2.gain.setValueAtTime(0.15, t0 + 0.08);
        gain2.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.45);
        osc2.connect(gain2);
        gain2.connect(this.masterGain);
        osc2.start(t0 + 0.08);
        osc2.stop(t0 + 0.46);
      } catch (e) {}
    }

    /**
     * Completar misión: Efecto de triunfo misterioso
     */
    playVictory() {
      if (!this.enabled) return;
      const ctx = this.getAudioContext();
      if (!ctx || !this.masterGain) return;

      try {
        const chord = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // Do, Mi, Sol, Do, Mi
        const t0 = ctx.currentTime;

        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const startT = t0 + idx * 0.08;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startT);

          gain.gain.setValueAtTime(0.001, startT);
          gain.gain.linearRampToValueAtTime(0.14, startT + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, startT + 0.65);

          osc.connect(gain);
          gain.connect(this.masterGain);

          osc.start(startT);
          osc.stop(startT + 0.68);
        });
      } catch (e) {}
    }

    /**
     * Clic discreto de botón / navegación
     */
    playClick() {
      if (!this.enabled) return;
      const ctx = this.getAudioContext();
      if (!ctx || !this.masterGain) return;

      try {
        const t0 = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(480, t0);
        osc.frequency.exponentialRampToValueAtTime(120, t0 + 0.03);

        gain.gain.setValueAtTime(0.09, t0);
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.035);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t0);
        osc.stop(t0 + 0.04);
      } catch (e) {}
    }
  }

  // Instancia única global para toda la web
  const engine = new MagicAudioEngine();
  global.MagicAudioEngine = engine;

  // Auto-inicialización si el DOM ya está listo
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => engine.init());
    } else {
      engine.init();
    }
  }

})(typeof window !== 'undefined' ? window : global);
