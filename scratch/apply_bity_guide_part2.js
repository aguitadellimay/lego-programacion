const fs = require('fs');

const file = 'js/bityBlockly.js';
let content = fs.readFileSync(file, 'utf8');

const target = `    // -----------------------------------------------------------
    // Conmutación entre Portada y Vista de Juego
    // -----------------------------------------------------------`;

const methodsToAdd = `    // -----------------------------------------------------------
    // Personaje Guía Permanente (Bity) y Pistas Pedagógicas
    // -----------------------------------------------------------
    initBityGuideDom() {
      const btnAsk = document.getElementById('btn-bity-ask-hint');
      if (btnAsk) {
        btnAsk.onclick = () => {
          this.onBityAskHint();
        };
      }
      this.renderGuideAvatar('bity', 'idle');
      this.resetIdleTimer();
    }

    renderGuideAvatar(character = 'bity', mood = 'idle') {
      const container = document.getElementById('bity-guide-avatar-container');
      if (!container) return;

      let svgHtml = '';
      if (character === 'ghost') {
        svgHtml = createGhostGuestSvg();
      } else if (character === 'vampire') {
        svgHtml = createVampireGuestSvg();
      } else if (character === 'frankenstein') {
        svgHtml = createFrankensteinGuestSvg();
      } else {
        svgHtml = createBityGuideSvg(mood);
      }
      container.innerHTML = svgHtml;
    }

    formatForGrade(text) {
      if (!text || typeof text !== 'string') return text;
      if (this.currentGrade === 1) {
        return text.toUpperCase();
      }
      return text;
    }

    updateBlockLabelsForGrade() {
      const isG1 = this.currentGrade === 1;

      // Botón volver al temario
      const btnBack = document.getElementById('btn-bityblockly-back');
      if (btnBack) {
        btnBack.innerHTML = isG1 ? '<span>⬅</span> VOLVER AL TEMARIO' : '<span>⬅</span> Volver al Temario';
        btnBack.title = isG1 ? 'VOLVER AL TEMARIO' : 'Volver al temario';
      }

      // Botón portada
      const btnHub = document.getElementById('btn-bityblockly-hub');
      if (btnHub) {
        btnHub.innerHTML = isG1 ? '<span>🎃</span> PORTADA / GRADOS' : '<span>🎃</span> Portada / Grados';
        btnHub.title = isG1 ? 'VER PORTADA Y CAMBIAR GRADO' : 'Ver Portada y Cambiar Grado';
      }

      // Botón de pedir pista
      const btnAskHintText = document.getElementById('btn-bity-ask-hint-text');
      if (btnAskHintText) {
        btnAskHintText.textContent = isG1 ? 'PEDIR UNA PISTA' : 'Pedir una pista';
      }

      // Paleta de bloques
      const btnFwd = document.getElementById('btn-bityblockly-add-forward');
      if (btnFwd) {
        const lbl = btnFwd.querySelector('.block-label-text');
        const add = btnFwd.querySelector('.block-add-hint');
        if (lbl) lbl.textContent = isG1 ? 'AVANZAR' : 'Avanzar';
        if (add) add.textContent = isG1 ? '+ AGREGAR' : '+ Agregar';
        btnFwd.title = isG1 ? 'AVANZAR 1 CASILLA' : 'Avanzar 1 casilla';
      }

      const btnLeft = document.getElementById('btn-bityblockly-add-left');
      if (btnLeft) {
        const lbl = btnLeft.querySelector('.block-label-text');
        const add = btnLeft.querySelector('.block-add-hint');
        if (lbl) lbl.textContent = isG1 ? 'GIRAR A LA IZQUIERDA' : 'Girar a la izquierda';
        if (add) add.textContent = isG1 ? '+ AGREGAR' : '+ Agregar';
        btnLeft.title = isG1 ? 'GIRAR 90° A LA IZQUIERDA' : 'Girar 90° a la izquierda';
      }

      const btnRight = document.getElementById('btn-bityblockly-add-right');
      if (btnRight) {
        const lbl = btnRight.querySelector('.block-label-text');
        const add = btnRight.querySelector('.block-add-hint');
        if (lbl) lbl.textContent = isG1 ? 'GIRAR A LA DERECHA' : 'Girar a la derecha';
        if (add) add.textContent = isG1 ? '+ AGREGAR' : '+ Agregar';
        btnRight.title = isG1 ? 'GIRAR 90° A LA DERECHA' : 'Girar 90° a la derecha';
      }

      // Botones de ejecución
      const btnRun = document.getElementById('btn-bityblockly-run');
      if (btnRun && !this.isRunning) {
        btnRun.innerHTML = isG1 ? '<span>▶️</span> ¡EJECUTAR PROGRAMA!' : '<span>▶️</span> ¡Ejecutar programa!';
      }

      const btnReset = document.getElementById('btn-bityblockly-reset');
      if (btnReset) {
        btnReset.innerHTML = isG1 ? '<span>🔄</span> VOLVER AL INICIO' : '<span>🔄</span> Volver al inicio';
        btnReset.title = isG1 ? 'VOLVER BITY AL INICIO' : 'Volver Bity al inicio';
      }

      const btnClear = document.getElementById('btn-bityblockly-clear');
      if (btnClear) {
        btnClear.innerHTML = isG1 ? '<span>🗑️</span> BORRAR TODO' : '<span>🗑️</span> Borrar todo';
        btnClear.title = isG1 ? 'BORRAR TODOS LOS BLOQUES' : 'Borrar todos los bloques';
      }
    }

    speakGuide(text, options = {}) {
      if (!text) return;
      const speaker = options.speaker || 'bity';
      const mood = options.mood || 'idle';
      const force = options.force || false;

      // No saturar con mensajes automáticos si ocurrieron hace menos de 2.2 segundos
      const now = Date.now();
      if (!force && this.lastGuideSpeakTime && (now - this.lastGuideSpeakTime < 2200)) {
        return;
      }
      this.lastGuideSpeakTime = now;

      this.currentGuideSpeaker = speaker;
      this.currentGuideMood = mood;
      this.renderGuideAvatar(speaker, mood);

      const nametagEl = document.getElementById('bity-guide-nametag');
      const badgeEl = document.getElementById('bity-guide-speaker-badge');
      const msgEl = document.getElementById('bity-guide-message');

      let displayName = 'BITY';
      let badgeText = '🤖 BITY • TU GUÍA ESPACIAL';

      if (speaker === 'ghost') {
        displayName = 'FANTASMITA';
        badgeText = '👻 FANTASMITA • CONSEJO MÁGICO';
      } else if (speaker === 'vampire') {
        displayName = 'VAMPIRITO';
        badgeText = '🧛 VAMPIRITO • CONSEJO CÓSMICO';
      } else if (speaker === 'frankenstein') {
        displayName = 'FRANKIE';
        badgeText = '🧟 FRANKIE • ÁNIMO ESPACIAL';
      }

      if (nametagEl) nametagEl.textContent = this.formatForGrade(displayName);
      if (badgeEl) badgeEl.textContent = this.formatForGrade(badgeText);

      const formattedText = this.formatForGrade(text);
      if (msgEl) {
        msgEl.textContent = formattedText;
        msgEl.style.animation = 'none';
        void msgEl.offsetHeight; // reflow
        msgEl.style.animation = 'bityTextFadeIn 0.3s ease-out';
      }

      // Animación suave de salto en el avatar
      const container = document.getElementById('bity-guide-avatar-container');
      if (container) {
        container.classList.remove('bounce');
        void container.offsetHeight; // reflow
        container.classList.add('bounce');
      }

      // Audio suave si está habilitado
      if (options.playAudio !== false) {
        this.audio.play('bitySpeak');
      }

      this.resetIdleTimer();
    }

    onBityAskHint() {
      const config = this.getCurrentMissionConfig();
      this.revealedHintsCount = (this.revealedHintsCount || 0) + 1;
      this.audio.play('click');

      // Ocasionalmente (~18% de las veces) un personaje invitado de Halloween saluda o anima
      const randGuest = Math.random();
      if (randGuest < 0.18 && this.currentGuideSpeaker === 'bity') {
        const guestTypes = ['ghost', 'vampire', 'frankenstein'];
        const chosenGuest = guestTypes[Math.floor(Math.random() * guestTypes.length)];
        const cheers = BITY_GUEST_CHEERS[chosenGuest] || [];
        const msg = cheers[Math.floor(Math.random() * cheers.length)] || '¡Excelente trabajo en tu misión!';
        this.speakGuide(msg, { speaker: chosenGuest, mood: 'happy', force: true, playAudio: true });
        return;
      }

      // Pista progresiva específica de la misión si está definida
      if (config.hints && config.hints[this.revealedHintsCount - 1]) {
        const rawHint = config.hints[this.revealedHintsCount - 1];
        this.speakGuide(rawHint, { speaker: 'bity', mood: 'thinking', force: true, playAudio: true });
        this.updateHintsUi();
        this.setStatus(\`💡 Revelaste la pista \${this.revealedHintsCount} de \${config.hints.length}.\`, 'info');
        return;
      }

      // Pistas pedagógicas adaptadas al grado
      const gList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade].pedagogical_hints) || [
        'Planificá el camino paso a paso antes de ejecutar.'
      ];
      const pIndex = (this.revealedHintsCount - 1) % gList.length;
      const msg = gList[pIndex];
      this.speakGuide(msg, { speaker: 'bity', mood: 'thinking', force: true, playAudio: true });
      this.setStatus('💡 Bity te ofrece una pista orientadora.', 'info');
    }

    resetIdleTimer() {
      if (this.idleTimerId) {
        clearTimeout(this.idleTimerId);
        this.idleTimerId = null;
      }
      this.idleTimerId = setTimeout(() => {
        if (!this.isRunning && !this.isPausedForMath) {
          this.triggerIdleGuideHint();
        }
      }, 26000);
    }

    triggerIdleGuideHint() {
      const gList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade].idle) || [
        'Recordá que podés pedir una pista si necesitás ayuda.'
      ];
      const msg = gList[Math.floor(Math.random() * gList.length)];
      this.speakGuide(msg, { speaker: 'bity', mood: 'idle', playAudio: false, force: true });
    }

    `;

if (!content.includes(target)) {
  console.error('Target not found for part 2');
  process.exit(1);
}

content = content.replace(target, methodsToAdd + target);
fs.writeFileSync(file, content, 'utf8');
console.log('Part 2 of Bity Guide applied cleanly');
