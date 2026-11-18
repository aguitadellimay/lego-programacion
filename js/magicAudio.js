/**
 * magicAudio.js
 * Sistema de Audio Compartido para "Informática Mágica" — Edición Navideña.
 * 
 * Proporciona:
 * - Música ambiental navideña instrumental y alegre (sintetizada mediante Web Audio API).
 * - Tintineo suave y periódico de cascabeles navideños y campanas.
 * - Efectos de sonido temáticos: regalos mágicos, estrellas, campanas, aciertos y victorias.
 * - Botón global sincronizado de activación/desactivación con persistencia en localStorage.
 * - Respeto estricto de las restricciones de autoplay de los navegadores.
 * - Corte inmediato de audio al desactivar el sonido.
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
      this.melodyInterval = null;

      // Lectura de preferencia guardada (por defecto activado en la edición navideña)
      this.enabled = true;
      try {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved !== null) {
          this.enabled = (saved === 'true');
        }
      } catch (e) {
        this.enabled = true;
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
          this.ambientGain.gain.setValueAtTime(0.32, this.ctx.currentTime);
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

      // Desbloquear audio en la primera interacción si el usuario lo tiene habilitado
      const unlockHandler = () => {
        if (this.enabled) {
          const ctx = this.getAudioContext();
          if (ctx) {
            if (ctx.state === 'suspended') {
              ctx.resume().then(() => {
                if (!this.ambientPlaying) {
                  this.playAmbient();
                }
              }).catch(() => {});
            } else if (!this.ambientPlaying) {
              this.playAmbient();
            }
          }
        }
      };

      document.addEventListener('click', unlockHandler, { passive: true });
      document.addEventListener('keydown', unlockHandler, { passive: true });
      document.addEventListener('touchstart', unlockHandler, { passive: true });

      if (this.enabled) {
        setTimeout(() => {
          const ctx = this.getAudioContext();
          if (ctx && ctx.state === 'running' && !this.ambientPlaying) {
            this.playAmbient();
          }
        }, 150);
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
        this.playStarReward(); // Sonido navideño de confirmación
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
        icon.textContent = this.enabled ? '🔔' : '🔇';
      }
      if (label) {
        label.textContent = this.enabled ? 'MÚSICA NAVIDEÑA ACTIVADA' : 'SONIDO DESACTIVADO';
      }
      btn.title = this.enabled 
        ? 'Música navideña activada (Clic para silenciar)' 
        : 'Sonido desactivado (Clic para activar música navideña)';
    }

    /**
     * Música y ambiente navideño suave e instrumental continuo
     */
    playAmbient() {
      if (!this.enabled || this.ambientPlaying) return;
      const ctx = this.getAudioContext();
      if (!ctx || !this.ambientGain) return;

      this.stopAmbient();
      this.ambientNodes = [];
      this.ambientPlaying = true;

      // Ciclo continuo de melodías navideñas alegres (Jingle Bells y We Wish You a Merry Christmas)
      let phraseIndex = 0;
      const playMelodyCycle = () => {
        if (!this.enabled || !this.ambientPlaying) return;
        const durationMs = this.playChristmasMelody(phraseIndex % 2);
        phraseIndex++;
        
        // Siguiente frase musical con pausa breve y natural de 3.5 segundos
        const nextDelay = (durationMs || 7000) + 3500;
        this.ambientTimer = setTimeout(() => {
          if (this.enabled && this.ambientPlaying) {
            playMelodyCycle();
          }
        }, nextDelay);
      };

      // Iniciar inmediatamente la melodía navideña
      setTimeout(playMelodyCycle, 120);
    }

    /**
     * Toca una frase instrumental navideña cálida y audible (celesta / glockenspiel + armónicos)
     */
    playChristmasMelody(variant = 0) {
      if (!this.enabled) return 6000;
      const ctx = this.getAudioContext();
      if (!ctx || !this.ambientGain) return 6000;

      // Frase 0: Jingle Bells (Navidad clásica alegre)
      const phrase0 = [
        { f: 659.25, bass: 261.63, dur: 0.26, delay: 0.00 }, // E5
        { f: 659.25, bass: 0,      dur: 0.26, delay: 0.30 }, // E5
        { f: 659.25, bass: 392.00, dur: 0.52, delay: 0.60 }, // E5
        { f: 659.25, bass: 261.63, dur: 0.26, delay: 1.20 }, // E5
        { f: 659.25, bass: 0,      dur: 0.26, delay: 1.50 }, // E5
        { f: 659.25, bass: 392.00, dur: 0.52, delay: 1.80 }, // E5
        { f: 659.25, bass: 261.63, dur: 0.26, delay: 2.40 }, // E5
        { f: 783.99, bass: 0,      dur: 0.26, delay: 2.70 }, // G5
        { f: 523.25, bass: 329.63, dur: 0.38, delay: 3.00 }, // C5
        { f: 587.33, bass: 392.00, dur: 0.20, delay: 3.42 }, // D5
        { f: 659.25, bass: 261.63, dur: 0.85, delay: 3.66 }, // E5
        // Segunda mitad de Jingle Bells
        { f: 698.46, bass: 349.23, dur: 0.26, delay: 4.80 }, // F5
        { f: 698.46, bass: 0,      dur: 0.26, delay: 5.10 }, // F5
        { f: 698.46, bass: 440.00, dur: 0.38, delay: 5.40 }, // F5
        { f: 698.46, bass: 0,      dur: 0.20, delay: 5.82 }, // F5
        { f: 698.46, bass: 349.23, dur: 0.26, delay: 6.06 }, // F5
        { f: 659.25, bass: 261.63, dur: 0.26, delay: 6.36 }, // E5
        { f: 659.25, bass: 0,      dur: 0.26, delay: 6.66 }, // E5
        { f: 659.25, bass: 329.63, dur: 0.26, delay: 6.96 }, // E5
        { f: 659.25, bass: 293.66, dur: 0.26, delay: 7.26 }, // E5
        { f: 587.33, bass: 0,      dur: 0.26, delay: 7.56 }, // D5
        { f: 587.33, bass: 392.00, dur: 0.26, delay: 7.86 }, // D5
        { f: 659.25, bass: 0,      dur: 0.26, delay: 8.16 }, // E5
        { f: 587.33, bass: 293.66, dur: 0.50, delay: 8.46 }, // D5
        { f: 783.99, bass: 392.00, dur: 0.70, delay: 9.02 }  // G5
      ];

      // Frase 1: We Wish You a Merry Christmas
      const phrase1 = [
        { f: 523.25, bass: 261.63, dur: 0.32, delay: 0.00 }, // C5
        { f: 698.46, bass: 349.23, dur: 0.32, delay: 0.36 }, // F5
        { f: 698.46, bass: 0,      dur: 0.18, delay: 0.72 }, // F5
        { f: 783.99, bass: 440.00, dur: 0.18, delay: 0.92 }, // G5
        { f: 698.46, bass: 0,      dur: 0.18, delay: 1.12 }, // F5
        { f: 659.25, bass: 329.63, dur: 0.18, delay: 1.32 }, // E5
        { f: 587.33, bass: 293.66, dur: 0.32, delay: 1.54 }, // D5
        { f: 587.33, bass: 0,      dur: 0.32, delay: 1.90 }, // D5
        { f: 587.33, bass: 392.00, dur: 0.32, delay: 2.26 }, // D5
        { f: 783.99, bass: 392.00, dur: 0.32, delay: 2.62 }, // G5
        { f: 783.99, bass: 0,      dur: 0.18, delay: 2.98 }, // G5
        { f: 880.00, bass: 440.00, dur: 0.18, delay: 3.18 }, // A5
        { f: 783.99, bass: 0,      dur: 0.18, delay: 3.38 }, // G5
        { f: 698.46, bass: 349.23, dur: 0.18, delay: 3.58 }, // F5
        { f: 659.25, bass: 261.63, dur: 0.36, delay: 3.80 }, // E5
        { f: 523.25, bass: 329.63, dur: 0.36, delay: 4.20 }, // C5
        { f: 523.25, bass: 0,      dur: 0.22, delay: 4.60 }, // C5
        { f: 880.00, bass: 349.23, dur: 0.34, delay: 4.86 }, // A5
        { f: 880.00, bass: 0,      dur: 0.18, delay: 5.24 }, // A5
        { f: 932.33, bass: 466.16, dur: 0.18, delay: 5.44 }, // Bb5
        { f: 880.00, bass: 0,      dur: 0.18, delay: 5.64 }, // A5
        { f: 783.99, bass: 392.00, dur: 0.18, delay: 5.84 }, // G5
        { f: 698.46, bass: 349.23, dur: 0.36, delay: 6.06 }, // F5
        { f: 587.33, bass: 293.66, dur: 0.36, delay: 6.46 }, // D5
        { f: 523.25, bass: 261.63, dur: 0.20, delay: 6.86 }, // C5
        { f: 523.25, bass: 0,      dur: 0.20, delay: 7.08 }, // C5
        { f: 587.33, bass: 293.66, dur: 0.34, delay: 7.30 }, // D5
        { f: 783.99, bass: 392.00, dur: 0.34, delay: 7.68 }, // G5
        { f: 659.25, bass: 329.63, dur: 0.34, delay: 8.06 }, // E5
        { f: 698.46, bass: 349.23, dur: 0.85, delay: 8.44 }  // F5
      ];

      const notes = (variant === 1) ? phrase1 : phrase0;

      const t0 = ctx.currentTime;
      notes.forEach(n => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteTime = t0 + n.delay;

        // Timbre cálido de caja musical / celesta navideña (triangle + envolvente clara)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, noteTime);

        gain.gain.setValueAtTime(0.0001, noteTime);
        gain.gain.linearRampToValueAtTime(0.18, noteTime + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + n.dur + 0.12);

        osc.connect(gain);
        gain.connect(this.ambientGain);

        osc.start(noteTime);
        osc.stop(noteTime + n.dur + 0.15);
        this.ambientNodes.push(osc);

        // Armonía suave de acompañamiento en registro medio-bajo
        if (n.bass && n.bass > 0) {
          const bOsc = ctx.createOscillator();
          const bGain = ctx.createGain();
          bOsc.type = 'sine';
          bOsc.frequency.setValueAtTime(n.bass, noteTime);

          bGain.gain.setValueAtTime(0.0001, noteTime);
          bGain.gain.linearRampToValueAtTime(0.09, noteTime + 0.03);
          bGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + n.dur + 0.25);

          bOsc.connect(bGain);
          bGain.connect(this.ambientGain);

          bOsc.start(noteTime);
          bOsc.stop(noteTime + n.dur + 0.28);
          this.ambientNodes.push(bOsc);
        }
      });

      const lastNote = notes[notes.length - 1];
      const totalMs = Math.ceil((lastNote.delay + lastNote.dur) * 1000);

      // Toque alegre de cascabeles al finalizar la frase
      setTimeout(() => {
        if (this.enabled && this.ambientPlaying) {
          this.playJingleBells(0.06);
        }
      }, totalMs - 200);

      return totalMs;
    }

    /**
     * Tintineo de cascabeles de trineo navideño (Sleigh Bells)
     */
    playJingleBells(volume = 0.09) {
      if (!this.enabled) return;
      const ctx = this.getAudioContext();
      if (!ctx || !this.masterGain) return;

      const clusterFreqs = [2200, 2640, 3168, 3800, 4500];
      const hits = [0.00, 0.12, 0.24, 0.40];

      try {
        const t0 = ctx.currentTime;
        hits.forEach(delay => {
          const hitTime = t0 + delay;
          clusterFreqs.forEach(f => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(f + (Math.random() * 80 - 40), hitTime);

            gain.gain.setValueAtTime(0.0001, hitTime);
            gain.gain.linearRampToValueAtTime(volume * (0.8 + Math.random() * 0.4), hitTime + 0.008);
            gain.gain.exponentialRampToValueAtTime(0.0001, hitTime + 0.08);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(hitTime);
            osc.stop(hitTime + 0.09);
          });
        });
      } catch (e) {}
    }

    /**
     * Sonido de Regalo Mágico que se abre
     */
    playGiftOpen() {
      if (!this.enabled) return;
      const ctx = this.getAudioContext();
      if (!ctx || !this.masterGain) return;

      try {
        const t0 = ctx.currentTime;
        const notes = [587.33, 739.99, 880.00, 1174.66, 1479.98]; // Re mayor festivo
        notes.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const noteT = t0 + i * 0.05;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, noteT);

          gain.gain.setValueAtTime(0.001, noteT);
          gain.gain.linearRampToValueAtTime(0.12, noteT + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteT + 0.35);

          osc.connect(gain);
          gain.connect(this.masterGain);

          osc.start(noteT);
          osc.stop(noteT + 0.38);
        });
      } catch (e) {}
    }

    /**
     * Sonido especial de Estrella / Recompensa navideña
     */
    playStarReward() {
      if (!this.enabled) return;
      const ctx = this.getAudioContext();
      if (!ctx || !this.masterGain) return;

      try {
        const chord = [659.25, 783.99, 987.77, 1318.51, 1567.98]; // Mi menor pentatónico mágico
        const t0 = ctx.currentTime;

        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const startT = t0 + idx * 0.04;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startT);

          gain.gain.setValueAtTime(0.001, startT);
          gain.gain.linearRampToValueAtTime(0.14, startT + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, startT + 0.55);

          osc.connect(gain);
          gain.connect(this.masterGain);

          osc.start(startT);
          osc.stop(startT + 0.58);
        });
      } catch (e) {}
    }

    /**
     * Sonido especial de Actividad o Nivel Completado
     */
    playActivityComplete() {
      if (!this.enabled) return;
      this.playVictory();
      setTimeout(() => {
        if (this.enabled) this.playJingleBells(0.1);
      }, 400);
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
      if (typeof window !== 'undefined' && window.bityBlocklyGame && window.bityBlocklyGame.audio) {
        try { window.bityBlocklyGame.audio.stopCelebration(); } catch (e) {}
      }
      const ctx = this.getAudioContext();
      if (ctx && this.masterGain) {
        try {
          this.masterGain.gain.cancelScheduledValues(ctx.currentTime);
          this.masterGain.gain.setValueAtTime(0, ctx.currentTime);
        } catch (e) {}
      }
    }

    /**
     * Secuencia de apertura de puerta mágica al ingresar a un módulo
     */
    playDoorSequence(callback) {
      if (!this.enabled) {
        if (typeof callback === 'function') callback();
        return;
      }

      const now = Date.now();
      if (now - this.lastDoorTime < 600) {
        if (typeof callback === 'function') callback();
        return;
      }
      this.lastDoorTime = now;

      // Sonido alegre de campanas de bienvenida
      this.playStarReward();

      if (typeof callback === 'function') {
        setTimeout(callback, 120);
      }
    }

    /**
     * Respuesta correcta: Campanillas navideñas alegres
     */
    playCorrect() {
      this.playStarReward();
    }

    /**
     * Respuesta incorrecta: Tono suave y amable de reintento
     */
    playIncorrect() {
      if (!this.enabled) return;
      const ctx = this.getAudioContext();
      if (!ctx || !this.masterGain) return;

      try {
        const t0 = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(349.23, t0); // Fa4
        osc.frequency.linearRampToValueAtTime(293.66, t0 + 0.18); // Re4

        gain.gain.setValueAtTime(0.12, t0);
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.22);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t0);
        osc.stop(t0 + 0.24);
      } catch (e) {}
    }

    /**
     * Cerradura mágica / regalo desbloqueado
     */
    playUnlock() {
      this.playGiftOpen();
    }

    /**
     * Completar misión: Triunfo festivo brillante
     */
    playVictory() {
      if (!this.enabled) return;
      const ctx = this.getAudioContext();
      if (!ctx || !this.masterGain) return;

      try {
        const chord = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98]; // Do, Mi, Sol, Do, Mi, Sol
        const t0 = ctx.currentTime;

        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const startT = t0 + idx * 0.07;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startT);

          gain.gain.setValueAtTime(0.001, startT);
          gain.gain.linearRampToValueAtTime(0.15, startT + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, startT + 0.75);

          osc.connect(gain);
          gain.connect(this.masterGain);

          osc.start(startT);
          osc.stop(startT + 0.78);
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
        osc.frequency.setValueAtTime(600, t0);
        osc.frequency.exponentialRampToValueAtTime(300, t0 + 0.025);

        gain.gain.setValueAtTime(0.08, t0);
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.03);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t0);
        osc.stop(t0 + 0.035);
      } catch (e) {}
    }

    /**
     * Sonido Pop para selección de bloques
     */
    playPop() {
      this.playClick();
    }

    /**
     * Sonido de descarte o papelera
     */
    playTrash() {
      if (!this.enabled) return;
      const ctx = this.getAudioContext();
      if (!ctx || !this.masterGain) return;

      try {
        const t0 = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, t0);
        osc.frequency.exponentialRampToValueAtTime(120, t0 + 0.05);

        gain.gain.setValueAtTime(0.09, t0);
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.06);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t0);
        osc.stop(t0 + 0.07);
      } catch (e) {}
    }

    /**
     * Sonido de error suave
     */
    playError() {
      this.playIncorrect();
    }

    // Métodos de compatibilidad
    playEerieChime() {
      this.playStarReward();
    }
    playSantaAppear() {
      this.playJingleBells(0.08);
    }
    playSleighBells() {
      this.playJingleBells(0.08);
    }
    playDoorCreak() {
      this.playStarReward();
    }
  }

  // Instancia única global para toda la web
  const engine = new MagicAudioEngine();
  global.MagicAudioEngine = engine;
  global.magicAudioManager = engine;

  // Auto-inicialización si el DOM ya está listo
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => engine.init());
    } else {
      engine.init();
    }
  }

})(typeof window !== 'undefined' ? window : global);
