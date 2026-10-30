const fs = require('fs');

let code = fs.readFileSync('js/bityBlockly.js', 'utf8').replace(/\r\n/g, '\n');

// 1. Constructor state variables
const oldConstructorState = `      this.completedLevels = [];
      this.revealedHintsCount = 0;
      this.doorOpen = false;`;

const newConstructorState = `      this.completedLevels = [];
      this.revealedHintsCount = 0;
      this.doorOpen = false;
      this.openedDoors = new Set();
      this.doorQuestions = {};
      this.lastQuestionId = null;
      this.lives = 3;
      this.maxLives = 3;
      this.instructionsExecuted = 0;
      this.movesExecuted = 0;
      this.turnsExecuted = 0;
      this.conceptSeenPerGrade = {};`;

if (!code.includes(oldConstructorState)) {
  console.error('Constructor state not found!');
  process.exit(1);
}
code = code.replace(oldConstructorState, newConstructorState);
console.log('Constructor state updated.');

// 2. updateLivesUi, isDoorOpen, openDoor, showInstructionConceptModal, triggerInstructionSummaryModal
const helperMethods = `
    updateLivesUi() {
      const currentLives = typeof this.lives === 'number' ? this.lives : 3;
      let heartsStr = '';
      for (let i = 0; i < 3; i++) {
        heartsStr += (i < currentLives) ? '❤️' : '🖤';
      }
      const hudHearts = document.getElementById('bityblockly-lives-hearts');
      if (hudHearts) hudHearts.textContent = heartsStr;
      const modalHearts = document.getElementById('math-modal-lives-hearts');
      if (modalHearts) modalHearts.textContent = heartsStr;
    }

    isDoorOpen(x, y) {
      if (!this.openedDoors) return false;
      return this.openedDoors.has(\`\${x},\${y}\`);
    }

    openDoor(x, y) {
      if (!this.openedDoors) this.openedDoors = new Set();
      this.openedDoors.add(\`\${x},\${y}\`);
      this.doorOpen = true;
    }

    showInstructionConceptModal(onStartCallback) {
      const modal = document.getElementById('bityblockly-instruction-concept-modal');
      if (!modal) {
        if (onStartCallback) onStartCallback();
        return;
      }
      const btnStart = document.getElementById('btn-bityblockly-start-instruction-challenge');
      if (btnStart) {
        btnStart.onclick = () => {
          modal.classList.remove('active');
          if (onStartCallback) onStartCallback();
        };
      }
      modal.classList.add('active');
    }

    triggerInstructionSummaryModal() {
      const modal = document.getElementById('bityblockly-instruction-summary-modal');
      if (!modal) return;

      const totalEl = document.getElementById('bityblockly-summary-total-count');
      const movesEl = document.getElementById('bityblockly-summary-moves-count');
      const turnsEl = document.getElementById('bityblockly-summary-turns-count');
      const routeEl = document.getElementById('bityblockly-summary-route-name');
      const reflectionEl = document.getElementById('bityblockly-summary-reflection-text');

      const total = this.instructionsExecuted || 0;
      const moves = this.movesExecuted || 0;
      const turns = this.turnsExecuted || 0;

      if (totalEl) totalEl.textContent = total;
      if (movesEl) movesEl.textContent = moves;
      if (turnsEl) turnsEl.textContent = turns;

      let routeName = \`Camino completado (\${total} instrucciones)\`;
      if (this.currentGrade === 1) {
        if (total === 9) routeName = 'Camino A (Ruta Directa • 9 instrucciones)';
        else if (total === 12) routeName = 'Camino B (Ruta Alternativa • 12 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 2) {
        if (total === 11) routeName = 'Camino A (Ruta Directa • 11 instrucciones)';
        else if (total === 14) routeName = 'Camino B (Ruta Alternativa • 14 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 3) {
        if (total === 13) routeName = 'Ruta A (Vía Directa • 13 instrucciones)';
        else if (total === 15) routeName = 'Ruta B (Vía Central • 15 instrucciones)';
        else if (total === 17) routeName = 'Ruta C (Vía Baja • 17 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 4) {
        if (total === 14) routeName = 'Ruta A (Galería Norte • 14 instrucciones)';
        else if (total === 16) routeName = 'Ruta B (Pasillo Central • 16 instrucciones)';
        else if (total === 18) routeName = 'Ruta C (Galería Baja • 18 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 5) {
        if (total === 16) routeName = 'Ruta A (Almenas Altas • 16 instrucciones)';
        else if (total === 20) routeName = 'Ruta B (Patio Central • 20 instrucciones)';
        else if (total === 22) routeName = 'Ruta C (Canal de Sombras • 22 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      }

      if (routeEl) routeEl.textContent = routeName;

      if (reflectionEl) {
        reflectionEl.textContent = '¿Pudiste haber llegado a la meta con menos instrucciones? ¿Qué camino fue más corto y cuál más largo? ¡Compartí tu estrategia con tus compañeros y tu profe!';
      }

      const btnRetry = document.getElementById('btn-bityblockly-summary-retry');
      if (btnRetry) {
        btnRetry.onclick = () => {
          modal.classList.remove('active');
          this.loadLevel(this.currentLevelIndex);
        };
      }

      const btnNext = document.getElementById('btn-bityblockly-summary-next');
      if (btnNext) {
        btnNext.onclick = () => {
          modal.classList.remove('active');
          this.showCoverView();
        };
      }

      modal.classList.add('active');
    }
`;

// Insert helperMethods right before renderLevelTabs
const renderTabsMarker = '    renderLevelTabs() {';
if (!code.includes(renderTabsMarker)) {
  console.error('renderLevelTabs not found!');
  process.exit(1);
}
code = code.replace(renderTabsMarker, helperMethods + '\n    renderLevelTabs() {');
console.log('Helper methods inserted.');

// 3. Update renderLevelTabs labels
const oldTabsLogic = `        let label = \`Nivel \${lvlNum}\`;
        if (this.currentGrade === 4) {
          const g4Labels = ['🧙 Laberinto 1', '🎃 Laberinto 2', '🏰 Laberinto 3', '🃏 Cartas 100', '🧪 Reactor', '🛡️ Escudo'];
          label = g4Labels[idx] || \`Nivel \${lvlNum}\`;
        } else if (this.currentGrade === 5) {
          const g5Labels = ['🏰 Laberinto 1', '🌲 Laberinto 2', '🎃 Laberinto 3', '🔥 Turbinas', '❓ Incógnita', '⚡ Energía', '🗝️ Código'];
          label = g5Labels[idx] || \`Nivel \${lvlNum}\`;
        } else if (this.currentGrade === 2) {
          const g2Labels = ['⚡ Baterías', '🎃 Laberinto', '🚪 Compuerta'];
          label = g2Labels[idx] || \`Nivel \${lvlNum}\`;
        } else if (this.currentGrade === 3) {
          const g3Labels = ['🚂 Parada 1', '⚡ Parada 2', '💎 Parada 3', '👻 Laberinto'];
          label = g3Labels[idx] || \`Nivel \${lvlNum}\`;
        } else {
          const g1Icons = ['🪐', '🌙', '🌌', '⚡', '🚀'];
          label = \`\${g1Icons[idx] || '🚀'} Nivel \${lvlNum}\`;
        }`;

const newTabsLogic = `        let label = \`Nivel \${lvlNum}\`;
        if (m.isFinalChallenge) {
          label = '🎯 Desafío Final';
        } else if (this.currentGrade === 4) {
          const g4Labels = ['🧙 Laberinto 1', '🎃 Laberinto 2', '🏰 Laberinto 3', '🃏 Cartas 100', '🧪 Reactor', '🛡️ Escudo', '🎯 Desafío Final'];
          label = g4Labels[idx] || \`Nivel \${lvlNum}\`;
        } else if (this.currentGrade === 5) {
          const g5Labels = ['🏰 Laberinto 1', '🌲 Laberinto 2', '🎃 Laberinto 3', '🔥 Turbinas', '❓ Incógnita', '⚡ Energía', '🗝️ Código', '🎯 Desafío Final'];
          label = g5Labels[idx] || \`Nivel \${lvlNum}\`;
        } else if (this.currentGrade === 2) {
          const g2Labels = ['⚡ Baterías', '🎃 Calabazas', '🚪 Compuerta', '🎯 Desafío Final'];
          label = g2Labels[idx] || \`Nivel \${lvlNum}\`;
        } else if (this.currentGrade === 3) {
          const g3Labels = ['🚂 Parada 1', '⚡ Parada 2', '💎 Parada 3', '👻 Laberinto', '🎯 Desafío Final'];
          label = g3Labels[idx] || \`Nivel \${lvlNum}\`;
        } else {
          const g1Icons = ['🪐', '🌙', '🌌', '⚡', '🚀', '🎯'];
          label = idx === 5 ? '🎯 Desafío Final' : \`\${g1Icons[idx] || '🚀'} Nivel \${lvlNum}\`;
        }`;

if (!code.includes(oldTabsLogic)) {
  console.error('Old tabs logic not found!');
  process.exit(1);
}
code = code.replace(oldTabsLogic, newTabsLogic);
console.log('Tabs logic updated.');

// 4. Update loadLevel
const oldLoadLevelState = `      this.revealedHintsCount = 0;
      this.doorOpen = false;
      this.blocks = [];
      this.currentStepIndex = -1;

      // Asegurar cierre de modales
      const vModal = document.getElementById('bityblockly-victory-modal');
      if (vModal) vModal.classList.remove('active');
      const cModal = document.getElementById('bityblockly-cinematic-modal');
      if (cModal) cModal.classList.remove('active');
      const mModal = document.getElementById('bityblockly-math-modal');
      if (mModal) mModal.classList.remove('active');`;

const newLoadLevelState = `      this.revealedHintsCount = 0;
      this.doorOpen = false;
      this.openedDoors = new Set();
      this.doorQuestions = {};
      this.lives = 3;
      this.updateLivesUi();
      this.instructionsExecuted = 0;
      this.movesExecuted = 0;
      this.turnsExecuted = 0;
      this.blocks = [];
      this.currentStepIndex = -1;

      // Asegurar cierre de modales
      const vModal = document.getElementById('bityblockly-victory-modal');
      if (vModal) vModal.classList.remove('active');
      const cModal = document.getElementById('bityblockly-cinematic-modal');
      if (cModal) cModal.classList.remove('active');
      const mModal = document.getElementById('bityblockly-math-modal');
      if (mModal) mModal.classList.remove('active');
      const sModal = document.getElementById('bityblockly-instruction-summary-modal');
      if (sModal) sModal.classList.remove('active');
      const cpModal = document.getElementById('bityblockly-instruction-concept-modal');
      if (cpModal) cpModal.classList.remove('active');

      if (config.isFinalChallenge) {
        if (!this.conceptSeenPerGrade) this.conceptSeenPerGrade = {};
        if (!this.conceptSeenPerGrade[this.currentGrade]) {
          this.conceptSeenPerGrade[this.currentGrade] = true;
          this.showInstructionConceptModal();
        }
      }`;

if (!code.includes(oldLoadLevelState)) {
  console.error('oldLoadLevelState not found!');
  process.exit(1);
}
code = code.replace(oldLoadLevelState, newLoadLevelState);
console.log('loadLevel updated.');

// 5. Update runProgram to preserve openedDoors and reset instruction counters
const oldRunProgramInit = `      this.bityPos = { x: config.start.x, y: config.start.y, dir: config.start.dir };
      this.doorOpen = false;
      this.isRunning = true;`;

const newRunProgramInit = `      this.bityPos = { x: config.start.x, y: config.start.y, dir: config.start.dir };
      this.instructionsExecuted = 0;
      this.movesExecuted = 0;
      this.turnsExecuted = 0;
      this.isRunning = true;`;

if (!code.includes(oldRunProgramInit)) {
  console.error('oldRunProgramInit not found!');
  process.exit(1);
}
code = code.replace(oldRunProgramInit, newRunProgramInit);
console.log('runProgram updated.');

// 6. Update executeNextStep to count instructions and handle multi-door
const oldExecuteBlockCheck = `      this.renderWorkspace();
      const action = this.blocks[this.currentStepIndex];
      const config = this.getCurrentMissionConfig();

      if (action === 'left') {
        this.bityPos.dir = (this.bityPos.dir + 3) % 4;
        this.audio.play('turn');
        this.setStatus('↩️ Byte giró a la izquierda.', 'info');
        this.advanceStepDelay();
      } else if (action === 'right') {
        this.bityPos.dir = (this.bityPos.dir + 1) % 4;
        this.audio.play('turn');
        this.setStatus('↪️ Byte giró a la derecha.', 'info');
        this.advanceStepDelay();
      } else if (action === 'forward') {
        const deltas = [
          { dx: 0, dy: -1 }, // 0: N
          { dx: 1, dy: 0 },  // 1: E
          { dx: 0, dy: 1 },  // 2: S
          { dx: -1, dy: 0 }  // 3: W
        ];
        const d = deltas[this.bityPos.dir];
        const nextX = this.bityPos.x + d.dx;
        const nextY = this.bityPos.y + d.dy;

        if (nextX < 0 || nextX >= config.cols || nextY < 0 || nextY >= config.rows) {
          this.handleWallHit();
          return;
        }

        const cell = config.grid[nextY][nextX];

        if (cell === 1) {
          this.handleWallHit();
          return;
        }

        if (cell === 2 && !this.doorOpen) {
          this.audio.play('bump');
          this.setStatus('⚡ ¡La puerta de Halloween está sellada con magia! Resolvé la cuenta para abrirla.', 'warning');
          this.triggerMathChallenge();
          return;
        }`;

const newExecuteBlockCheck = `      this.renderWorkspace();
      const action = this.blocks[this.currentStepIndex];
      const config = this.getCurrentMissionConfig();

      this.instructionsExecuted = (this.instructionsExecuted || 0) + 1;

      if (action === 'left') {
        this.turnsExecuted = (this.turnsExecuted || 0) + 1;
        this.bityPos.dir = (this.bityPos.dir + 3) % 4;
        this.audio.play('turn');
        this.setStatus('↩️ Byte giró a la izquierda.', 'info');
        this.advanceStepDelay();
      } else if (action === 'right') {
        this.turnsExecuted = (this.turnsExecuted || 0) + 1;
        this.bityPos.dir = (this.bityPos.dir + 1) % 4;
        this.audio.play('turn');
        this.setStatus('↪️ Byte giró a la derecha.', 'info');
        this.advanceStepDelay();
      } else if (action === 'forward') {
        this.movesExecuted = (this.movesExecuted || 0) + 1;
        const deltas = [
          { dx: 0, dy: -1 }, // 0: N
          { dx: 1, dy: 0 },  // 1: E
          { dx: 0, dy: 1 },  // 2: S
          { dx: -1, dy: 0 }  // 3: W
        ];
        const d = deltas[this.bityPos.dir];
        const nextX = this.bityPos.x + d.dx;
        const nextY = this.bityPos.y + d.dy;

        if (nextX < 0 || nextX >= config.cols || nextY < 0 || nextY >= config.rows) {
          this.handleWallHit();
          return;
        }

        const cell = config.grid[nextY][nextX];

        if (cell === 1) {
          this.handleWallHit();
          return;
        }

        if (cell === 2 && !this.isDoorOpen(nextX, nextY)) {
          this.audio.play('bump');
          this.setStatus('⚡ ¡La compuerta está sellada con magia! Resolvé el cálculo para abrirla.', 'warning');
          this.triggerMathChallengeForDoor(nextX, nextY);
          return;
        }`;

if (!code.includes(oldExecuteBlockCheck)) {
  console.error('oldExecuteBlockCheck not found!');
  process.exit(1);
}
code = code.replace(oldExecuteBlockCheck, newExecuteBlockCheck);
console.log('executeNextStep updated.');

// 7. Replace triggerMathChallenge with triggerMathChallengeForDoor
const oldMathChallengeRegex = /triggerMathChallenge\(\) \{[\s\S]*?\n    \}/;
if (!oldMathChallengeRegex.test(code)) {
  console.error('triggerMathChallenge method not found!');
  process.exit(1);
}

const newMathChallengeMethods = `triggerMathChallenge() {
      // Compatibilidad con invocaciones sin coordenadas (usa la posición frontal del robot)
      const config = this.getCurrentMissionConfig();
      const deltas = [{ dx: 0, dy: -1 }, { dx: 1, dy: 0 }, { dx: 0, dy: 1 }, { dx: -1, dy: 0 }];
      const d = deltas[this.bityPos.dir] || { dx: 0, dy: 0 };
      const frontX = this.bityPos.x + d.dx;
      const frontY = this.bityPos.y + d.dy;
      this.triggerMathChallengeForDoor(frontX, frontY);
    }

    triggerMathChallengeForDoor(doorX, doorY) {
      this.isPausedForMath = true;
      this.currentDoorPos = { x: doorX, y: doorY };
      const doorKey = \`\${doorX},\${doorY}\`;

      if (!this.doorQuestions) this.doorQuestions = {};
      if (!this.doorQuestions[doorKey]) {
        this.doorQuestions[doorKey] = getRandomMathQuestion(this.currentGrade, this.lastQuestionId);
      }
      const math = this.doorQuestions[doorKey];
      this.lastQuestionId = math.id;

      const modal = document.getElementById('bityblockly-math-modal');
      if (!modal) return;

      this.updateLivesUi();

      const storyEl = document.getElementById('bityblockly-math-story');
      const eqEl = document.getElementById('bityblockly-math-equation');
      const visualEl = document.getElementById('bityblockly-math-visual');
      const optsGrid = document.getElementById('bityblockly-math-options');
      const feedbackEl = document.getElementById('bityblockly-math-feedback');

      if (storyEl) storyEl.textContent = math.story;
      if (eqEl) eqEl.textContent = math.operation;
      if (feedbackEl) {
        feedbackEl.className = 'math-feedback-box';
        feedbackEl.textContent = 'Seleccioná la respuesta correcta para abrir la compuerta:';
      }

      // Renderizar ayuda visual
      if (visualEl) {
        visualEl.innerHTML = '';
        if (math.type === 'subtraction' && math.total) {
          for (let i = 0; i < math.total; i++) {
            const cell = document.createElement('div');
            const isRemaining = i < (math.total - math.used);
            cell.className = \`battery-cell \${isRemaining ? 'cell-active' : 'cell-spent'}\`;
            cell.innerHTML = isRemaining ? '⚡' : '✕';
            cell.title = isRemaining ? 'Carga disponible' : 'Carga consumida';
            visualEl.appendChild(cell);
          }
        } else if (math.type === 'addition' && math.base) {
          for (let i = 0; i < math.base; i++) {
            const cell = document.createElement('div');
            cell.className = 'battery-cell cell-active';
            cell.innerHTML = '⚡';
            visualEl.appendChild(cell);
          }
          for (let i = 0; i < math.added; i++) {
            const cell = document.createElement('div');
            cell.className = 'battery-cell cell-added';
            cell.innerHTML = '+⚡';
            visualEl.appendChild(cell);
          }
        } else {
          const hintDiv = document.createElement('div');
          hintDiv.style.cssText = 'color:#38bdf8; font-weight:700; font-size:1.05rem; padding:6px;';
          hintDiv.innerHTML = '🔢 <em>¡Pensá en la tabla o división correspondiente para encontrar el resultado!</em>';
          visualEl.appendChild(hintDiv);
        }
      }

      // Renderizar opciones
      if (optsGrid) {
        optsGrid.innerHTML = '';
        math.options.forEach(opt => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'btn-math-option';
          btn.textContent = opt;

          btn.onclick = () => {
            if (opt === math.correctAnswer) {
              btn.classList.add('opt-correct');
              this.audio.play('doorUnlock');
              if (feedbackEl) {
                feedbackEl.className = 'math-feedback-box feedback-correct';
                feedbackEl.innerHTML = \`🎉 ¡EXCELENTE! \${math.explanation} ¡La compuerta se ha abierto!\`;
              }
              optsGrid.querySelectorAll('.btn-math-option').forEach(b => b.disabled = true);

              setTimeout(() => {
                modal.classList.remove('active');
                this.openDoor(doorX, doorY);
                this.isPausedForMath = false;
                this.setStatus('¡Muy bien! La compuerta se abrió. Byte continúa su camino.', 'success');

                this.bityPos.x = doorX;
                this.bityPos.y = doorY;
                this.audio.play('step');
                this.advanceStepDelay();
              }, 1200);

            } else {
              btn.classList.add('opt-wrong');
              this.audio.play('wrong');
              this.lives = Math.max(0, (this.lives || 3) - 1);
              this.updateLivesUi();

              if (this.lives > 0) {
                if (feedbackEl) {
                  feedbackEl.className = 'math-feedback-box feedback-wrong';
                  feedbackEl.innerHTML = \`⚠️ ¡Casi! Perdiste 1 vida (te quedan \${this.lives}). Cambiamos la pregunta para que vuelvas a intentar:\`;
                }
                optsGrid.querySelectorAll('.btn-math-option').forEach(b => b.disabled = true);

                setTimeout(() => {
                  const newQ = getRandomMathQuestion(this.currentGrade, math.id);
                  this.doorQuestions[doorKey] = newQ;
                  this.triggerMathChallengeForDoor(doorX, doorY);
                }, 1200);

              } else {
                if (feedbackEl) {
                  feedbackEl.className = 'math-feedback-box feedback-wrong';
                  feedbackEl.innerHTML = '⚡ ¡Se agotaron las vidas de Byte! Recargamos tus 3 vidas ❤️❤️❤️. Volviendo al inicio...';
                }
                optsGrid.querySelectorAll('.btn-math-option').forEach(b => b.disabled = true);

                setTimeout(() => {
                  modal.classList.remove('active');
                  this.lives = 3;
                  this.updateLivesUi();
                  this.stopProgram();
                  const cfg = this.getCurrentMissionConfig();
                  if (cfg.start) {
                    this.bityPos = { x: cfg.start.x, y: cfg.start.y, dir: cfg.start.dir };
                  }
                  this.setStatus('Vidas recargadas. Las puertas abiertas se mantienen abiertas. ¡Probá de nuevo!', 'info');
                  this.renderCanvas();
                }, 1800);
              }
            }
          };

          optsGrid.appendChild(btn);
        });
      }

      modal.classList.add('active');
    }`;

code = code.replace(oldMathChallengeRegex, newMathChallengeMethods);
console.log('Math challenge methods updated.');

// 8. Update renderCanvas door tile drawing
const oldCanvasDoorTile = `          if (cell === 2) {
            this.drawDoorTile(ctx, x, y, tileSize, this.doorOpen);
          } else if (cell === 3) {`;

const newCanvasDoorTile = `          if (cell === 2) {
            this.drawDoorTile(ctx, x, y, tileSize, this.isDoorOpen(c, r));
          } else if (cell === 3) {`;

if (!code.includes(oldCanvasDoorTile)) {
  console.error('oldCanvasDoorTile not found!');
  process.exit(1);
}
code = code.replace(oldCanvasDoorTile, newCanvasDoorTile);
console.log('renderCanvas door tile updated.');

// 9. Update triggerVictory to handle final challenge modal
const oldVictoryFinalCheck = `      // Si es el nivel final de 1.er grado -> Cinemática espacial
      if (this.currentGrade === 1 && this.currentLevelIndex === 5) {
        this.startMissionEndingCinematic();
        return;
      }`;

const newVictoryFinalCheck = `      const config = this.getCurrentMissionConfig();
      if (config && config.isFinalChallenge) {
        this.triggerInstructionSummaryModal();
        return;
      }

      // Si es el nivel 5 de 1.er grado -> Cinemática espacial
      if (this.currentGrade === 1 && this.currentLevelIndex === 5) {
        this.startMissionEndingCinematic();
        return;
      }`;

if (!code.includes(oldVictoryFinalCheck)) {
  console.error('oldVictoryFinalCheck not found!');
  process.exit(1);
}
code = code.replace(oldVictoryFinalCheck, newVictoryFinalCheck);
console.log('triggerVictory updated.');

fs.writeFileSync('js/bityBlockly.js', code, 'utf8');
console.log('All bityBlockly.js updates successfully written!');
