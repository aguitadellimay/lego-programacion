const fs = require('fs');

const file = 'js/bityBlockly.js';
let content = fs.readFileSync(file, 'utf8');

// --- 1. loadLevel start message & error reset ---
const loadLvlTarget = `      // Actualizar briefing y pestañas
      this.updateLevelUi();
      this.updateHintsUi();`;

const loadLvlRepl = `      // Actualizar briefing y pestañas
      this.updateLevelUi();
      this.updateHintsUi();

      this.consecutiveErrors = 0;
      const startList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade].start) || [
        '¡Hola! Hoy tenemos una nueva misión.'
      ];
      const startMsg = startList[Math.floor(Math.random() * startList.length)];
      this.speakGuide(startMsg, { speaker: 'bity', mood: 'idle', force: true });`;

if (!content.includes(loadLvlTarget)) {
  console.error('Target loadLvlTarget not found!');
  process.exit(1);
}
content = content.replace(loadLvlTarget, loadLvlRepl);

// --- 2. updateLevelUi grade formatting ---
const updateLvlUiTarget = `      if (nameEl) nameEl.textContent = (config.name || config.title).toUpperCase();
      if (storyEl) storyEl.textContent = config.story;
      if (hintEl) hintEl.textContent = config.hint || '💡 Observá la consigna y utilizá las pistas progresivas si necesitás ayuda.';
      if (badgeEl) badgeEl.textContent = \`Nivel \${this.currentLevelIndex} de \${maxLvl}\`;`;

const updateLvlUiRepl = `      if (nameEl) nameEl.textContent = this.formatForGrade(config.name || config.title);
      if (storyEl) storyEl.textContent = this.formatForGrade(config.story);
      if (hintEl) hintEl.textContent = this.formatForGrade(config.hint || '💡 Observá la consigna y utilizá las pistas progresivas si necesitás ayuda.');
      if (badgeEl) badgeEl.textContent = this.formatForGrade(\`Nivel \${this.currentLevelIndex} de \${maxLvl}\`);`;

if (!content.includes(updateLvlUiTarget)) {
  console.error('Target updateLvlUiTarget not found!');
  process.exit(1);
}
content = content.replace(updateLvlUiTarget, updateLvlUiRepl);

// --- 3. renderLevelTabs grade formatting ---
const tabsTarget = `        btn.innerHTML = \`<span>\${label}</span>\`;`;
const tabsRepl = `        btn.innerHTML = \`<span>\${this.formatForGrade(label)}</span>\`;`;

if (!content.includes(tabsTarget)) {
  console.error('Target tabsTarget not found!');
  process.exit(1);
}
content = content.replace(tabsTarget, tabsRepl);

// --- 4. addBlock guide triggers ---
const addBlockTarget = `      this.blocks.push(type);
      this.audio.play('add');
      this.renderWorkspace();
      this.setStatus(\`Agregaste un bloque de \${this.getBlockLabel(type).toLowerCase()}.\`, 'info');`;

const addBlockRepl = `      this.blocks.push(type);
      this.audio.play('add');
      this.renderWorkspace();
      this.setStatus(\`Agregaste un bloque de \${this.getBlockLabel(type).toLowerCase()}.\`, 'info');

      if (type === 'left' || type === 'right') {
        const turnList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade].turn) || [];
        const turnMsg = turnList[Math.floor(Math.random() * turnList.length)] || '¡El camino cambia de dirección! Para seguir, quizás necesites girar.';
        this.speakGuide(turnMsg, { mood: 'thinking' });
      } else {
        const codeList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade].coding) || [];
        const codeMsg = codeList[Math.floor(Math.random() * codeList.length)] || 'Recordá que cada bloque representa una instrucción.';
        this.speakGuide(codeMsg, { mood: 'idle' });
      }`;

if (!content.includes(addBlockTarget)) {
  console.error('Target addBlockTarget not found!');
  process.exit(1);
}
content = content.replace(addBlockTarget, addBlockRepl);

// --- 5. handleWallHit guide triggers ---
const wallHitTarget = `    handleWallHit() {
      this.audio.play('bump');
      this.bumpAnimation = { x: this.bityPos.x, y: this.bityPos.y, frame: 10 };
      this.setStatus('Byte chocó con un obstáculo. Revisá tus bloques y probá de nuevo.', 'error');
      this.stopProgram();
    }`;

const wallHitRepl = `    handleWallHit() {
      this.audio.play('bump');
      this.bumpAnimation = { x: this.bityPos.x, y: this.bityPos.y, frame: 10 };
      this.consecutiveErrors = (this.consecutiveErrors || 0) + 1;
      this.stopProgram();

      const isRepeated = this.consecutiveErrors >= 2;
      const key = isRepeated ? 'repeated_error' : 'error';
      const errList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade][key]) || [];
      const errMsg = errList[Math.floor(Math.random() * errList.length)] || '¡No te preocupes! Podemos intentarlo otra vez.';
      this.speakGuide(errMsg, { mood: 'alert', force: true });
      this.setStatus('Byte chocó con un obstáculo. Revisá tus bloques y probá de nuevo.', 'error');
    }`;

if (!content.includes(wallHitTarget)) {
  console.error('Target wallHitTarget not found!');
  process.exit(1);
}
content = content.replace(wallHitTarget, wallHitRepl);

// --- 6. Incomplete path in executeNextStep ---
const incompleteTarget = `        if (config.goal && this.bityPos.x === config.goal.x && this.bityPos.y === config.goal.y) {
          this.triggerVictory();
        } else {
          this.setStatus('Byte completó las instrucciones pero aún no llegó a la meta. ¡Agregá más bloques para continuar!', 'warning');
          this.audio.play('bump');
        }`;

const incompleteRepl = `        if (config.goal && this.bityPos.x === config.goal.x && this.bityPos.y === config.goal.y) {
          this.triggerVictory();
        } else {
          this.consecutiveErrors = (this.consecutiveErrors || 0) + 1;
          const isRepeated = this.consecutiveErrors >= 2;
          const key = isRepeated ? 'repeated_error' : 'error';
          const errList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade][key]) || [];
          const errMsg = errList[Math.floor(Math.random() * errList.length)] || '¡Casi! Revisá si tus instrucciones son suficientes.';
          this.speakGuide(errMsg, { mood: 'alert', force: true });
          this.setStatus('Byte completó las instrucciones pero aún no llegó a la meta. ¡Agregá más bloques para continuar!', 'warning');
          this.audio.play('bump');
        }`;

if (!content.includes(incompleteTarget)) {
  console.error('Target incompleteTarget not found!');
  process.exit(1);
}
content = content.replace(incompleteTarget, incompleteRepl);

// --- 7. triggerMathChallengeForDoor ---
const mathDoorTarget = `      if (storyEl) storyEl.textContent = math.story;
      if (eqEl) eqEl.textContent = math.operation;
      if (feedbackEl) {
        feedbackEl.className = 'math-feedback-box';
        feedbackEl.textContent = 'Seleccioná la respuesta correcta para abrir la compuerta:';
      }`;

const mathDoorRepl = `      const doorList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade].door) || [];
      const doorMsg = doorList[0] || '¡Llegaste a una compuerta mágica! Resolvé la cuenta para continuar.';
      this.speakGuide(doorMsg, { mood: 'thinking', force: true });

      if (storyEl) storyEl.textContent = this.formatForGrade(math.story);
      if (eqEl) eqEl.textContent = this.formatForGrade(math.operation);
      if (feedbackEl) {
        feedbackEl.className = 'math-feedback-box';
        feedbackEl.textContent = this.formatForGrade('Seleccioná la respuesta correcta para abrir la compuerta:');
      }`;

if (!content.includes(mathDoorTarget)) {
  console.error('Target mathDoorTarget not found!');
  process.exit(1);
}
content = content.replace(mathDoorTarget, mathDoorRepl);

// --- 8. Math modal correct & wrong answers ---
const mathCorrectTarget = `              if (feedbackEl) {
                feedbackEl.className = 'math-feedback-box feedback-correct';
                feedbackEl.innerHTML = \`🎉 ¡EXCELENTE! \${math.explanation} ¡La compuerta se ha abierto!\`;
              }`;

const mathCorrectRepl = `              const succList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade].success) || [];
              const succMsg = succList[Math.floor(Math.random() * succList.length)] || '¡Muy bien! ¡Lo estás logrando!';
              this.speakGuide(succMsg, { mood: 'celebrating', force: true });

              if (feedbackEl) {
                feedbackEl.className = 'math-feedback-box feedback-correct';
                feedbackEl.innerHTML = this.formatForGrade(\`🎉 ¡EXCELENTE! \${math.explanation} ¡La compuerta se ha abierto!\`);
              }`;

if (!content.includes(mathCorrectTarget)) {
  console.error('Target mathCorrectTarget not found!');
  process.exit(1);
}
content = content.replace(mathCorrectTarget, mathCorrectRepl);

const mathWrongTarget = `              if (this.lives > 0) {
                if (feedbackEl) {
                  feedbackEl.className = 'math-feedback-box feedback-wrong';
                  feedbackEl.innerHTML = \`⚠️ ¡Casi! Perdiste 1 vida (te quedan \${this.lives}). Cambiamos la pregunta para que vuelvas a intentar:\`;
                }`;

const mathWrongRepl = `              const wrgList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade].door_wrong) || [];
              const wrgMsg = wrgList[0] || '¡Casi! Te quedan vidas. Observá la ayuda visual e intentalo otra vez.';
              this.speakGuide(wrgMsg, { mood: 'alert', force: true });

              if (this.lives > 0) {
                if (feedbackEl) {
                  feedbackEl.className = 'math-feedback-box feedback-wrong';
                  feedbackEl.innerHTML = this.formatForGrade(\`⚠️ ¡Casi! Perdiste 1 vida (te quedan \${this.lives}). Cambiamos la pregunta para que vuelvas a intentar:\`);
                }`;

if (!content.includes(mathWrongTarget)) {
  console.error('Target mathWrongTarget not found!');
  process.exit(1);
}
content = content.replace(mathWrongTarget, mathWrongRepl);

// --- 9. triggerVictory ---
const vicTarget = `    triggerVictory() {
      this.audio.play('victory');`;

const vicRepl = `    triggerVictory() {
      this.audio.play('victory');
      this.consecutiveErrors = 0;

      const vicList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade].victory) || [];
      const vicMsg = vicList[Math.floor(Math.random() * vicList.length)] || '¡Felicitaciones! Llegaste a la meta.';
      this.speakGuide(vicMsg, { mood: 'celebrating', force: true });`;

if (!content.includes(vicTarget)) {
  console.error('Target vicTarget not found!');
  process.exit(1);
}
content = content.replace(vicTarget, vicRepl);

// --- 10. Summary & Concept modal grade formatting ---
const summaryTarget = `      if (routeEl) routeEl.textContent = routeName;

      if (reflectionEl) {
        reflectionEl.textContent = '¿Pudiste haber llegado a la meta con menos instrucciones? ¿Qué camino fue más corto y cuál más largo? ¡Compartí tu estrategia con tus compañeros y tu profe!';
      }`;

const summaryRepl = `      if (routeEl) routeEl.textContent = this.formatForGrade(routeName);

      if (reflectionEl) {
        reflectionEl.textContent = this.formatForGrade('¿Pudiste haber llegado a la meta con menos instrucciones? ¿Qué camino fue más corto y cuál más largo? ¡Compartí tu estrategia con tus compañeros y tu profe!');
      }`;

if (!content.includes(summaryTarget)) {
  console.error('Target summaryTarget not found!');
  process.exit(1);
}
content = content.replace(summaryTarget, summaryRepl);

// --- 11. Destroy cleanup ---
const destroyTarget = `    destroy() {
      this.stopProgram();`;

const destroyRepl = `    destroy() {
      if (this.idleTimerId) {
        clearTimeout(this.idleTimerId);
        this.idleTimerId = null;
      }
      this.stopProgram();`;

if (!content.includes(destroyTarget)) {
  console.error('Target destroyTarget not found!');
  process.exit(1);
}
content = content.replace(destroyTarget, destroyRepl);

fs.writeFileSync(file, content, 'utf8');
console.log('Part 3 of Bity Guide applied cleanly');
