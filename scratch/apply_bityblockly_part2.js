const fs = require('fs');

let content = fs.readFileSync('js/bityBlockly.js', 'utf8');

function replaceOrThrow(target, replacement, desc) {
  if (!content.includes(target)) {
    throw new Error(`Target not found for: ${desc}\nTarget: ${target.substring(0, 80)}...`);
  }
  content = content.replace(target, replacement);
  console.log(`[OK] Replaced: ${desc}`);
}

// 1. initDom palette buttons
const targetInitDom = `      // Botones de paleta de bloques
      const btnFwd = document.getElementById('btn-bityblockly-add-forward');
      if (btnFwd) btnFwd.onclick = () => this.addBlock('forward');

      const btnLeft = document.getElementById('btn-bityblockly-add-left');
      if (btnLeft) btnLeft.onclick = () => this.addBlock('left');

      const btnRight = document.getElementById('btn-bityblockly-add-right');
      if (btnRight) btnRight.onclick = () => this.addBlock('right');`;

const replInitDom = `      // Botones de paleta de bloques (4 direcciones fijas)
      const btnUp = document.getElementById('btn-bityblockly-add-up');
      if (btnUp) btnUp.onclick = () => this.addBlock('up');

      const btnDown = document.getElementById('btn-bityblockly-add-down');
      if (btnDown) btnDown.onclick = () => this.addBlock('down');

      const btnLeft = document.getElementById('btn-bityblockly-add-left');
      if (btnLeft) btnLeft.onclick = () => this.addBlock('left');

      const btnRight = document.getElementById('btn-bityblockly-add-right');
      if (btnRight) btnRight.onclick = () => this.addBlock('right');

      // Compatibilidad con botón anterior
      const btnFwd = document.getElementById('btn-bityblockly-add-forward');
      if (btnFwd) btnFwd.onclick = () => this.addBlock('up');

      this.updateBlockLabelsForGrade();`;

replaceOrThrow(targetInitDom, replInitDom, "initDom palette buttons");

// 2. updateBlockLabelsForGrade
const targetLabels = `      // Paleta de bloques
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
      }`;

const replLabels = `      // Paleta de bloques de movimiento (4 direcciones fijas)
      const btnUp = document.getElementById('btn-bityblockly-add-up');
      if (btnUp) {
        const lbl = btnUp.querySelector('.block-label-text');
        const add = btnUp.querySelector('.block-add-hint');
        if (lbl) lbl.textContent = isG1 ? 'ARRIBA' : 'Arriba';
        if (add) add.textContent = isG1 ? '+ AGREGAR' : '+ Agregar';
        btnUp.title = isG1 ? 'MOVER 1 CASILLA HACIA ARRIBA' : 'Mover 1 casilla hacia arriba';
      }

      const btnDown = document.getElementById('btn-bityblockly-add-down');
      if (btnDown) {
        const lbl = btnDown.querySelector('.block-label-text');
        const add = btnDown.querySelector('.block-add-hint');
        if (lbl) lbl.textContent = isG1 ? 'ABAJO' : 'Abajo';
        if (add) add.textContent = isG1 ? '+ AGREGAR' : '+ Agregar';
        btnDown.title = isG1 ? 'MOVER 1 CASILLA HACIA ABAJO' : 'Mover 1 casilla hacia abajo';
      }

      const btnLeft = document.getElementById('btn-bityblockly-add-left');
      if (btnLeft) {
        const lbl = btnLeft.querySelector('.block-label-text');
        const add = btnLeft.querySelector('.block-add-hint');
        if (lbl) lbl.textContent = isG1 ? 'IZQUIERDA' : 'Izquierda';
        if (add) add.textContent = isG1 ? '+ AGREGAR' : '+ Agregar';
        btnLeft.title = isG1 ? 'MOVER 1 CASILLA HACIA LA IZQUIERDA' : 'Mover 1 casilla hacia la izquierda';
      }

      const btnRight = document.getElementById('btn-bityblockly-add-right');
      if (btnRight) {
        const lbl = btnRight.querySelector('.block-label-text');
        const add = btnRight.querySelector('.block-add-hint');
        if (lbl) lbl.textContent = isG1 ? 'DERECHA' : 'Derecha';
        if (add) add.textContent = isG1 ? '+ AGREGAR' : '+ Agregar';
        btnRight.title = isG1 ? 'MOVER 1 CASILLA HACIA LA DERECHA' : 'Mover 1 casilla hacia la derecha';
      }

      // Compatibilidad botón forward
      const btnFwd = document.getElementById('btn-bityblockly-add-forward');
      if (btnFwd) {
        const lbl = btnFwd.querySelector('.block-label-text');
        const add = btnFwd.querySelector('.block-add-hint');
        if (lbl) lbl.textContent = isG1 ? 'ARRIBA' : 'Arriba';
        if (add) add.textContent = isG1 ? '+ AGREGAR' : '+ Agregar';
        btnFwd.title = isG1 ? 'MOVER 1 CASILLA HACIA ARRIBA' : 'Mover 1 casilla hacia arriba';
      }`;

replaceOrThrow(targetLabels, replLabels, "updateBlockLabelsForGrade");

// 3. showFinalChallengeInstructionsSummary
replaceOrThrow(
  "if (turnsEl) turnsEl.textContent = turns;",
  "if (turnsEl) turnsEl.textContent = this.formatForGrade('¡Éxito!');",
  "summary modal turns card"
);

// 4. resetLevelState status message
replaceOrThrow(
  "this.setStatus('Byte volvió al punto de partida. ¡Listo para probar otra vez!', 'info');",
  "this.setStatus(this.formatForGrade('Bity volvió al punto de partida. ¡Listo para probar otra vez!'), 'info');",
  "resetLevelState status"
);

// 5. addBlock and block labels
const targetAddBlock = `    addBlock(type) {
      if (this.isRunning) return;
      if (this.blocks.length >= this.maxBlocks) {
        this.setStatus('¡Llegaste al límite de bloques! Probá optimizar tu recorrido.', 'warning');
        this.audio.play('bump');
        return;
      }
      this.blocks.push(type);
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
      }
    }`;

const replAddBlock = `    addBlock(type) {
      if (this.isRunning) return;
      if (this.blocks.length >= this.maxBlocks) {
        this.setStatus(this.formatForGrade('¡Llegaste al límite de bloques! Probá optimizar tu recorrido.'), 'warning');
        this.audio.play('bump');
        return;
      }
      this.blocks.push(type);
      this.audio.play('add');
      this.renderWorkspace();
      const label = this.getBlockLabel(type);
      this.setStatus(this.formatForGrade(\`Agregaste un bloque de \${label.toLowerCase()}.\`), 'info');

      const dirList = (BITY_GUIDE_MESSAGES[this.currentGrade] && (BITY_GUIDE_MESSAGES[this.currentGrade].direction || BITY_GUIDE_MESSAGES[this.currentGrade].coding)) || [];
      const dirMsg = dirList[Math.floor(Math.random() * dirList.length)] || 'Recordá que cada flecha mueve a Bity un casillero en esa dirección.';
      this.speakGuide(dirMsg, { mood: 'idle' });
    }`;

replaceOrThrow(targetAddBlock, replAddBlock, "addBlock");

// 6. getBlockLabel and getBlockIcon
const targetGetLabels = `    getBlockLabel(type) {
      if (type === 'forward') return 'Avanzar';
      if (type === 'left') return 'Girar a la izquierda';
      if (type === 'right') return 'Girar a la derecha';
      return type;
    }

    getBlockIcon(type) {
      if (type === 'forward') return '⬆️';
      if (type === 'left') return '↩️';
      if (type === 'right') return '↪️';
      return '🧩';
    }`;

const replGetLabels = `    getBlockLabel(type) {
      const isG1 = this.currentGrade === 1;
      if (type === 'up') return isG1 ? 'ARRIBA' : 'Arriba';
      if (type === 'down') return isG1 ? 'ABAJO' : 'Abajo';
      if (type === 'left') return isG1 ? 'IZQUIERDA' : 'Izquierda';
      if (type === 'right') return isG1 ? 'DERECHA' : 'Derecha';
      if (type === 'forward') return isG1 ? 'ARRIBA' : 'Arriba';
      return type;
    }

    getBlockIcon(type) {
      if (type === 'up') return '⬆️';
      if (type === 'down') return '⬇️';
      if (type === 'left') return '⬅️';
      if (type === 'right') return '➡️';
      if (type === 'forward') return '⬆️';
      return '🧩';
    }`;

replaceOrThrow(targetGetLabels, replGetLabels, "getBlockLabel and getBlockIcon");

// 7. empty program in renderWorkspace
const targetEmpty = `          <div class="bityblockly-empty-program">
            <span class="bityblockly-empty-icon">👆</span>
            <strong>Tu programa está vacío</strong>
            <span>Tocá los botones de arriba para agregar instrucciones a Byte.</span>
          </div>`;

const replEmpty = `          <div class="bityblockly-empty-program">
            <span class="bityblockly-empty-icon">👆</span>
            <strong>\${this.formatForGrade('Tu programa está vacío')}</strong>
            <span>\${this.formatForGrade('Tocá las flechas de arriba para agregar instrucciones a Bity.')}</span>
          </div>`;

replaceOrThrow(targetEmpty, replEmpty, "empty program in renderWorkspace");

// 8. executeNextStep
const targetExec = `      this.renderWorkspace();
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
        }

        this.bityPos.x = nextX;
        this.bityPos.y = nextY;
        this.audio.play('step');

        if (cell === 3) {
          this.stopProgram();
          this.triggerVictory();
          return;
        }

        this.advanceStepDelay();
      }`;

const replExec = `      this.renderWorkspace();
      const action = this.blocks[this.currentStepIndex];
      const config = this.getCurrentMissionConfig();

      this.instructionsExecuted = (this.instructionsExecuted || 0) + 1;
      this.movesExecuted = (this.movesExecuted || 0) + 1;

      let nextX = this.bityPos.x;
      let nextY = this.bityPos.y;
      let newDir = this.bityPos.dir;
      let stepMsg = '';

      // Cuatro direcciones fijas absolutas
      // 0: Norte (Arriba), 1: Este (Derecha), 2: Sur (Abajo), 3: Oeste (Izquierda)
      if (action === 'up') {
        nextY = this.bityPos.y - 1;
        newDir = 0; // Mirar arriba
        stepMsg = '⬆️ Bity se movió hacia arriba.';
      } else if (action === 'down') {
        nextY = this.bityPos.y + 1;
        newDir = 2; // Mirar abajo
        stepMsg = '⬇️ Bity se movió hacia abajo.';
      } else if (action === 'left') {
        nextX = this.bityPos.x - 1;
        newDir = 3; // Mirar izquierda
        stepMsg = '⬅️ Bity se movió hacia la izquierda.';
      } else if (action === 'right') {
        nextX = this.bityPos.x + 1;
        newDir = 1; // Mirar derecha
        stepMsg = '➡️ Bity se movió hacia la derecha.';
      } else if (action === 'forward') {
        // Compatibilidad retroactiva
        const deltas = [
          { dx: 0, dy: -1 }, // 0: N
          { dx: 1, dy: 0 },  // 1: E
          { dx: 0, dy: 1 },  // 2: S
          { dx: -1, dy: 0 }  // 3: W
        ];
        const d = deltas[this.bityPos.dir] || deltas[0];
        nextX = this.bityPos.x + d.dx;
        nextY = this.bityPos.y + d.dy;
        stepMsg = '⬆️ Bity avanzó.';
      }

      // La orientación visual gira a Bity hacia la dirección de avance
      this.bityPos.dir = newDir;

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
        this.setStatus(this.formatForGrade('⚡ ¡La compuerta está sellada con magia! Resolvé el cálculo para abrirla.'), 'warning');
        this.triggerMathChallengeForDoor(nextX, nextY);
        return;
      }

      this.bityPos.x = nextX;
      this.bityPos.y = nextY;
      this.audio.play('step');
      this.setStatus(this.formatForGrade(stepMsg), 'info');

      if (cell === 3) {
        this.stopProgram();
        this.triggerVictory();
        return;
      }

      this.advanceStepDelay();`;

replaceOrThrow(targetExec, replExec, "executeNextStep");

// 9. handleWallHit status message
replaceOrThrow(
  "this.setStatus('Byte chocó con un obstáculo. Revisá tus bloques y probá de nuevo.', 'error');",
  "this.setStatus(this.formatForGrade('Bity chocó con un obstáculo. Revisá tus bloques y probá de nuevo.'), 'error');",
  "handleWallHit status"
);

// 10. loadLevel status message
replaceOrThrow(
  "this.setStatus('¡Elegí cómo se mueve Byte! Agregá bloques para llevarlo a la nave espacial.', 'info');",
  "this.setStatus(this.formatForGrade('¡Elegí las direcciones para guiar a Bity! Agregá bloques para llevarlo a la meta.'), 'info');",
  "loadLevel status"
);

// 11. Remove orientation hints call from renderCanvas
replaceOrThrow(
  `      // Pistas de orientación intermitentes junto al robot (IZQUIERDA / DERECHA)
      this.drawOrientationHints(ctx, bx, by, this.bityPos.dir, tileSize, w, h);`,
  `      // Pistas de orientación desactivadas (movimiento por 4 direcciones fijas absolutas)`,
  "renderCanvas drawOrientationHints call"
);

// 12. Make drawOrientationHints a no-op
const targetDrawHints = `    drawOrientationHints(ctx, bx, by, dir, tileSize, canvasW, canvasH) {
      const cues = this.getOrientationCues(dir);`;

const replDrawHints = `    drawOrientationHints(ctx, bx, by, dir, tileSize, canvasW, canvasH) {
      return; // Reemplazado por 4 direcciones fijas absolutas
      const cues = this.getOrientationCues(dir);`;

replaceOrThrow(targetDrawHints, replDrawHints, "drawOrientationHints function body");

fs.writeFileSync('js/bityBlockly.js', content, 'utf8');
console.log('Successfully completed Part 2 updates in js/bityBlockly.js');
