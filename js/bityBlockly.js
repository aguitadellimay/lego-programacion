/**
 * ========================================================
 * BITYBLOCKLY: MISIÓN ESPACIAL
 * Módulo de programación visual por bloques y laberintos
 * con desafíos matemáticos obligatorios para 1.er Grado.
 * ========================================================
 */

(function (global) {
  'use strict';

  // -------------------------------------------------------------
  // 1. Definición de Niveles y Laberintos
  // -------------------------------------------------------------
  const BITYBLOCKLY_LEVELS = [
    {
      id: 1,
      name: 'Nivel 1: El camino de Marte',
      theme: 'mars',
      cols: 7,
      rows: 5,
      start: { x: 1, y: 1, dir: 1 }, // 0: N, 1: E, 2: S, 3: W
      goal: { x: 4, y: 3 },
      door: { x: 3, y: 1 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 2, 0, 1, 1],
        [1, 1, 1, 1, 0, 1, 1],
        [1, 1, 1, 1, 3, 1, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ],
      story: 'Bity terminó su exploración de Marte y necesita volver a la base de aterrizaje. ¡Programá sus movimientos para llegar a la nave espacial!',
      hint: '💡 Tocá los bloques para armar tu programa. ¡Cada bloque es una instrucción de movimiento!',
      math: {
        story: '¡Bity necesita revisar su batería! La batería puede almacenar 10 cargas. Bity ya usó 5. ¿Cuántas cargas le quedan?',
        operation: '10 − 5 = ?',
        type: 'subtraction',
        total: 10,
        used: 5,
        options: [3, 5, 6],
        correctAnswer: 5,
        explanation: '10 menos 5 es igual a 5. ¡A Bity le quedan 5 cargas de energía!'
      }
    },
    {
      id: 2,
      name: 'Nivel 2: La base lunar',
      theme: 'moon',
      cols: 8,
      rows: 7,
      start: { x: 1, y: 5, dir: 0 }, // North
      goal: { x: 6, y: 1 },
      door: { x: 3, y: 2 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 3, 1],
        [1, 0, 0, 2, 0, 1, 1, 1],
        [1, 0, 0, 1, 0, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ],
      story: 'Bity llegó a una base de investigación lunar para recargar sus equipos. ¡Guialo por los pasillos hasta el vehículo espacial!',
      hint: '💡 Pensá bien cada giro. Recordá que girar a la izquierda o derecha cambia hacia dónde mira Bity sin cambiar de casilla.',
      math: {
        story: '¡Bity recarga sus baterías en la base lunar! Tenía 6 módulos de energía y sumó 2 módulos nuevos. ¿Cuántos módulos tiene ahora?',
        operation: '6 + 2 = ?',
        type: 'addition',
        base: 6,
        added: 2,
        options: [7, 8, 9],
        correctAnswer: 8,
        explanation: '6 más 2 es igual a 8. ¡Bity ahora tiene 8 módulos de energía cargados!'
      }
    },
    {
      id: 3,
      name: 'Nivel 3: Regreso a la nave',
      theme: 'space',
      cols: 9,
      rows: 7,
      start: { x: 1, y: 1, dir: 2 }, // South
      goal: { x: 7, y: 3 },
      door: { x: 3, y: 5 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 3, 1],
        [1, 1, 1, 0, 1, 0, 1, 1, 1],
        [1, 1, 1, 2, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      story: '¡Último sector de la misión! Bity debe recorrer los módulos de la estación cósmica y abordar su nave para volver a casa.',
      hint: '💡 Planificá el recorrido completo paso a paso antes de ejecutar. ¡Revisá tus instrucciones si te equivocás!',
      math: {
        story: '¡Último esfuerzo para llegar a la nave! Bity tiene 8 chips de propulsión y utiliza 3 para activar los motores. ¿Cuántos chips le quedan?',
        operation: '8 − 3 = ?',
        type: 'subtraction',
        total: 8,
        used: 3,
        options: [4, 5, 6],
        correctAnswer: 5,
        explanation: '8 menos 3 es igual a 5. ¡A Bity le quedan 5 chips para calibrar la nave!'
      }
    }
  ];

  // -------------------------------------------------------------
  // 2. Motor de Audio Sintetizado (Sin archivos externos)
  // -------------------------------------------------------------
  class BityBlocklyAudio {
    constructor() {
      this.ctx = null;
      this.enabled = true;
      try {
        const stored = localStorage.getItem('lego_bityblockly_sound');
        if (stored !== null) this.enabled = stored === 'true';
      } catch (e) {}
    }

    init() {
      if (this.ctx) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      } catch (e) {}
    }

    play(type) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'click' || type === 'add') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.exponentialRampToValueAtTime(880, t + 0.08);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.08);
        osc.start(t);
        osc.stop(t + 0.08);
      } else if (type === 'step') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.linearRampToValueAtTime(480, t + 0.1);
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.1);
        osc.start(t);
        osc.stop(t + 0.1);
      } else if (type === 'turn') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, t);
        osc.frequency.linearRampToValueAtTime(650, t + 0.12);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.12);
        osc.start(t);
        osc.stop(t + 0.12);
      } else if (type === 'bump') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.linearRampToValueAtTime(80, t + 0.18);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.18);
        osc.start(t);
        osc.stop(t + 0.18);
      } else if (type === 'doorUnlock') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, t); // C5
        osc.frequency.setValueAtTime(659.25, t + 0.09); // E5
        osc.frequency.setValueAtTime(783.99, t + 0.18); // G5
        osc.frequency.setValueAtTime(1046.50, t + 0.27); // C6
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.45);
        osc.start(t);
        osc.stop(t + 0.45);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.setValueAtTime(196, t + 0.12);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.25);
        osc.start(t);
        osc.stop(t + 0.25);
      } else if (type === 'victory') {
        // Arpegio triunfal alegre
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, t + idx * 0.1);
          g.gain.setValueAtTime(0.18, t + idx * 0.1);
          g.gain.linearRampToValueAtTime(0.01, t + idx * 0.1 + 0.25);
          o.connect(g);
          g.connect(this.ctx.destination);
          o.start(t + idx * 0.1);
          o.stop(t + idx * 0.1 + 0.25);
        });
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      try {
        localStorage.setItem('lego_bityblockly_sound', this.enabled ? 'true' : 'false');
      } catch (e) {}
      return this.enabled;
    }
  }

  // -------------------------------------------------------------
  // 3. Clase Principal: BityBlocklyGame
  // -------------------------------------------------------------
  class BityBlocklyGame {
    constructor(options = {}) {
      this.options = options;
      this.onBackToSyllabus = options.onBackToSyllabus || (() => {});
      this.onProgressUpdated = options.onProgressUpdated || (() => {});

      this.audio = new BityBlocklyAudio();
      this.currentLevelIndex = 1;
      this.unlockedLevel = 1;
      this.completedLevels = [];
      this.doorOpen = false;

      // Estado del robot
      this.bityPos = { x: 1, y: 1, dir: 1 }; // x, y, dir (0:N, 1:E, 2:S, 3:W)
      this.bumpAnimation = null; // { x, y, progress }

      // Programa de bloques construido por el alumno
      this.blocks = [];
      this.maxBlocks = 25;

      // Estado de ejecución
      this.isRunning = false;
      this.isPausedForMath = false;
      this.currentStepIndex = -1;
      this.executionTimerId = null;

      // Canvas y dibujo
      this.canvas = null;
      this.ctx = null;
      this.particles = [];
      this.animationFrameId = null;

      this.loadProgress();
      this.initDom();
    }

    // -----------------------------------------------------------
    // Persistencia
    // -----------------------------------------------------------
    loadProgress() {
      try {
        const raw = localStorage.getItem('lego_bityblockly_progress');
        if (raw) {
          const data = JSON.parse(raw);
          this.unlockedLevel = Math.max(1, Math.min(3, parseInt(data.unlockedLevel) || 1));
          this.completedLevels = Array.isArray(data.completedLevels) ? data.completedLevels : [];
        }
      } catch (e) {
        this.unlockedLevel = 1;
        this.completedLevels = [];
      }
    }

    saveProgress() {
      try {
        const data = {
          unlockedLevel: this.unlockedLevel,
          completedLevels: this.completedLevels,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem('lego_bityblockly_progress', JSON.stringify(data));
      } catch (e) {}
      this.onProgressUpdated(this.getProgressSummary());
    }

    getProgressSummary() {
      const count = this.completedLevels.length;
      const pct = Math.min(100, Math.round((count / 3) * 100));
      return {
        completedCount: count,
        totalLevels: 3,
        percentage: pct,
        isCompleted: count >= 3,
        unlockedLevel: this.unlockedLevel
      };
    }

    // -----------------------------------------------------------
    // Inicialización del DOM y Eventos
    // -----------------------------------------------------------
    initDom() {
      this.canvas = document.getElementById('bityblockly-canvas');
      if (this.canvas) {
        this.ctx = this.canvas.getContext('2d');
      }

      // Botón volver
      const btnBack = document.getElementById('btn-bityblockly-back');
      if (btnBack) {
        btnBack.onclick = () => {
          this.stopProgram();
          this.audio.play('click');
          this.onBackToSyllabus();
        };
      }

      // Botón sonido
      const btnSound = document.getElementById('btn-bityblockly-sound');
      if (btnSound) {
        btnSound.textContent = this.audio.enabled ? '🔊' : '🔇';
        btnSound.onclick = () => {
          const enabled = this.audio.toggle();
          btnSound.textContent = enabled ? '🔊' : '🔇';
          if (enabled) this.audio.play('click');
        };
      }

      // Pestañas de niveles
      const tabBtns = document.querySelectorAll('.bityblockly-tab-btn');
      tabBtns.forEach(btn => {
        btn.onclick = () => {
          const lvl = parseInt(btn.dataset.level) || 1;
          if (lvl <= this.unlockedLevel) {
            this.audio.play('click');
            this.loadLevel(lvl);
          }
        };
      });

      // Botones de la paleta de bloques
      const btnForward = document.getElementById('btn-bityblockly-add-forward');
      if (btnForward) {
        btnForward.onclick = () => this.addBlock('forward');
      }
      const btnLeft = document.getElementById('btn-bityblockly-add-left');
      if (btnLeft) {
        btnLeft.onclick = () => this.addBlock('left');
      }
      const btnRight = document.getElementById('btn-bityblockly-add-right');
      if (btnRight) {
        btnRight.onclick = () => this.addBlock('right');
      }

      // Botones de ejecución y control
      const btnRun = document.getElementById('btn-bityblockly-run');
      if (btnRun) {
        btnRun.onclick = () => this.runProgram();
      }
      const btnReset = document.getElementById('btn-bityblockly-reset');
      if (btnReset) {
        btnReset.onclick = () => {
          this.audio.play('click');
          this.resetLevelState(true);
        };
      }
      const btnClear = document.getElementById('btn-bityblockly-clear');
      if (btnClear) {
        btnClear.onclick = () => this.clearBlocks();
      }

      // Iniciar bucle de renderizado
      this.startRenderLoop();

      // Cargar nivel inicial
      this.loadLevel(this.currentLevelIndex);
    }

    // -----------------------------------------------------------
    // Gestión de Niveles
    // -----------------------------------------------------------
    loadLevel(lvlNumber) {
      this.stopProgram();
      this.currentLevelIndex = Math.max(1, Math.min(3, lvlNumber));
      const config = this.getCurrentLevelConfig();
      if (!config) return;

      this.doorOpen = false;
      this.bityPos = { x: config.start.x, y: config.start.y, dir: config.start.dir };
      this.blocks = [];
      this.currentStepIndex = -1;

      // Actualizar interfaz
      this.updateLevelUi();
      this.renderWorkspace();
      this.setStatus('¡Elegí cómo se mueve Bity! Agregá bloques para llevarlo a la nave espacial.', 'info');
      this.renderCanvas();
    }

    getCurrentLevelConfig() {
      return BITYBLOCKLY_LEVELS.find(l => l.id === this.currentLevelIndex) || BITYBLOCKLY_LEVELS[0];
    }

    updateLevelUi() {
      const config = this.getCurrentLevelConfig();

      // Pestañas
      const tabs = document.querySelectorAll('.bityblockly-tab-btn');
      tabs.forEach(t => {
        const lvl = parseInt(t.dataset.level) || 1;
        t.classList.toggle('active', lvl === this.currentLevelIndex);
        const isLocked = lvl > this.unlockedLevel;
        t.disabled = isLocked;
        t.classList.toggle('locked', isLocked);
      });

      // Briefing
      const nameEl = document.getElementById('bityblockly-level-title');
      const storyEl = document.getElementById('bityblockly-story-text');
      const hintEl = document.getElementById('bityblockly-hint-text');
      const badgeEl = document.getElementById('bityblockly-badge-text');

      if (nameEl) nameEl.textContent = config.name.toUpperCase();
      if (storyEl) storyEl.textContent = config.story;
      if (hintEl) hintEl.textContent = config.hint;
      if (badgeEl) badgeEl.textContent = `Nivel ${config.id} de 3`;
    }

    resetLevelState(keepBlocks = true) {
      this.stopProgram();
      const config = this.getCurrentLevelConfig();
      this.doorOpen = false;
      this.bityPos = { x: config.start.x, y: config.start.y, dir: config.start.dir };
      this.currentStepIndex = -1;
      this.bumpAnimation = null;
      if (!keepBlocks) {
        this.blocks = [];
      }
      this.renderWorkspace();
      this.setStatus('Bity volvió al punto de partida. ¡Listo para probar otra vez!', 'info');
      this.renderCanvas();
    }

    // -----------------------------------------------------------
    // Manipulación de Bloques
    // -----------------------------------------------------------
    addBlock(type) {
      if (this.isRunning) return;
      if (this.blocks.length >= this.maxBlocks) {
        this.setStatus('¡Llegaste al límite de bloques! Probá optimizar tu recorrido.', 'warning');
        this.audio.play('bump');
        return;
      }
      this.blocks.push(type);
      this.audio.play('add');
      this.renderWorkspace();
      this.setStatus(`Agregaste un bloque de ${this.getBlockLabel(type).toLowerCase()}.`, 'info');
    }

    removeBlock(index) {
      if (this.isRunning) return;
      if (index >= 0 && index < this.blocks.length) {
        this.blocks.splice(index, 1);
        this.audio.play('click');
        this.renderWorkspace();
      }
    }

    moveBlock(index, delta) {
      if (this.isRunning) return;
      const target = index + delta;
      if (target >= 0 && target < this.blocks.length) {
        const item = this.blocks.splice(index, 1)[0];
        this.blocks.splice(target, 0, item);
        this.audio.play('click');
        this.renderWorkspace();
      }
    }

    clearBlocks() {
      if (this.isRunning) return;
      if (this.blocks.length === 0) return;
      this.blocks = [];
      this.audio.play('bump');
      this.renderWorkspace();
      this.setStatus('Se borraron todos los bloques de tu programa.', 'info');
    }

    getBlockLabel(type) {
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
    }

    renderWorkspace() {
      const listEl = document.getElementById('bityblockly-steps-list');
      const countEl = document.getElementById('bityblockly-blocks-count');
      if (countEl) {
        countEl.textContent = `(${this.blocks.length} / ${this.maxBlocks} bloques)`;
      }
      if (!listEl) return;

      if (this.blocks.length === 0) {
        listEl.innerHTML = `
          <div class="bityblockly-empty-program">
            <span class="bityblockly-empty-icon">👆</span>
            <strong>Tu programa está vacío</strong>
            <span>Tocá los botones de arriba para agregar instrucciones a Bity.</span>
          </div>
        `;
        return;
      }

      listEl.innerHTML = '';
      this.blocks.forEach((type, index) => {
        const item = document.createElement('div');
        item.className = `bityblockly-step-item step-${type}`;
        if (this.currentStepIndex === index) {
          item.classList.add('active-step');
        }

        item.innerHTML = `
          <span class="step-num-badge">${index + 1}</span>
          <span class="step-name">${this.getBlockIcon(type)} ${this.getBlockLabel(type)}</span>
          <div class="step-controls">
            <button type="button" class="btn-step-move btn-move-up" title="Mover arriba" ${index === 0 ? 'disabled style="opacity:0.3;"' : ''}>⬆</button>
            <button type="button" class="btn-step-move btn-move-down" title="Mover abajo" ${index === this.blocks.length - 1 ? 'disabled style="opacity:0.3;"' : ''}>⬇</button>
            <button type="button" class="btn-step-remove" title="Quitar bloque">✕</button>
          </div>
        `;

        // Eventos
        const upBtn = item.querySelector('.btn-move-up');
        if (upBtn) upBtn.onclick = (e) => { e.stopPropagation(); this.moveBlock(index, -1); };

        const downBtn = item.querySelector('.btn-move-down');
        if (downBtn) downBtn.onclick = (e) => { e.stopPropagation(); this.moveBlock(index, 1); };

        const delBtn = item.querySelector('.btn-step-remove');
        if (delBtn) delBtn.onclick = (e) => { e.stopPropagation(); this.removeBlock(index); };

        listEl.appendChild(item);
      });
    }

    // -----------------------------------------------------------
    // Ejecución del Programa
    // -----------------------------------------------------------
    runProgram() {
      if (this.isRunning) return;
      if (this.blocks.length === 0) {
        this.setStatus('¡Agregá al menos un bloque antes de ejecutar!', 'warning');
        this.audio.play('bump');
        return;
      }

      // Reiniciar posición de Bity antes de comenzar la ejecución
      const config = this.getCurrentLevelConfig();
      this.bityPos = { x: config.start.x, y: config.start.y, dir: config.start.dir };
      this.doorOpen = false;
      this.isRunning = true;
      this.isPausedForMath = false;
      this.currentStepIndex = 0;

      this.updateRunButton(true);
      this.setStatus('▶️ Ejecutando secuencia paso por paso...', 'info');
      this.renderWorkspace();

      this.executeNextStep();
    }

    updateRunButton(running) {
      const btn = document.getElementById('btn-bityblockly-run');
      if (btn) {
        btn.disabled = running;
        btn.innerHTML = running ? '<span>⏳</span> EJECUTANDO...' : '<span>▶️</span> ¡EJECUTAR PROGRAMA!';
      }
    }

    stopProgram() {
      if (this.executionTimerId) {
        clearTimeout(this.executionTimerId);
        this.executionTimerId = null;
      }
      this.isRunning = false;
      this.isPausedForMath = false;
      this.currentStepIndex = -1;
      this.updateRunButton(false);
      this.renderWorkspace();
    }

    executeNextStep() {
      if (!this.isRunning || this.isPausedForMath) return;

      if (this.currentStepIndex >= this.blocks.length) {
        // Fin del programa sin haber llegado a la meta
        this.stopProgram();
        const config = this.getCurrentLevelConfig();
        if (this.bityPos.x === config.goal.x && this.bityPos.y === config.goal.y) {
          this.triggerVictory();
        } else {
          this.setStatus('Bity completó las instrucciones pero aún no llegó a la nave. ¡Agregá más bloques para continuar!', 'warning');
          this.audio.play('bump');
        }
        return;
      }

      this.renderWorkspace();
      const action = this.blocks[this.currentStepIndex];
      const config = this.getCurrentLevelConfig();

      if (action === 'left') {
        this.bityPos.dir = (this.bityPos.dir + 3) % 4;
        this.audio.play('turn');
        this.setStatus('↩️ Bity giró a la izquierda.', 'info');
        this.advanceStepDelay();
      } else if (action === 'right') {
        this.bityPos.dir = (this.bityPos.dir + 1) % 4;
        this.audio.play('turn');
        this.setStatus('↪️ Bity giró a la derecha.', 'info');
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

        // Comprobar límites del mapa
        if (nextX < 0 || nextX >= config.cols || nextY < 0 || nextY >= config.rows) {
          this.handleWallHit();
          return;
        }

        const cell = config.grid[nextY][nextX];

        if (cell === 1) {
          // Choque con pared
          this.handleWallHit();
          return;
        }

        if (cell === 2 && !this.doorOpen) {
          // Intento de cruzar puerta cerrada: Desafío matemático obligatorio
          this.audio.play('bump');
          this.setStatus('⚡ ¡La puerta espacial está bloqueada con un candado de energía! Resolvé la cuenta.', 'warning');
          this.triggerMathChallenge();
          return;
        }

        // Movimiento válido
        this.bityPos.x = nextX;
        this.bityPos.y = nextY;
        this.audio.play('step');

        if (cell === 3) {
          // ¡Llegó a la nave espacial!
          this.stopProgram();
          this.triggerVictory();
          return;
        }

        this.advanceStepDelay();
      }
    }

    advanceStepDelay() {
      this.executionTimerId = setTimeout(() => {
        this.currentStepIndex++;
        this.executeNextStep();
      }, 550);
    }

    handleWallHit() {
      this.audio.play('bump');
      this.bumpAnimation = { x: this.bityPos.x, y: this.bityPos.y, frame: 10 };
      this.setStatus('Bity chocó con una pared. Revisá tus bloques y probá de nuevo.', 'error');
      this.stopProgram();
    }

    setStatus(message, type = 'info') {
      const banner = document.getElementById('bityblockly-status-banner');
      if (!banner) return;
      banner.className = `bityblockly-status-banner status-${type}`;
      let icon = '🤖';
      if (type === 'success') icon = '🎉';
      if (type === 'warning') icon = '⚠️';
      if (type === 'error') icon = '💥';
      banner.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    }

    // -----------------------------------------------------------
    // Desafío Matemático Obligatorio
    // -----------------------------------------------------------
    triggerMathChallenge() {
      this.isPausedForMath = true;
      const config = this.getCurrentLevelConfig();
      const math = config.math;
      const modal = document.getElementById('bityblockly-math-modal');
      if (!modal) return;

      const storyEl = document.getElementById('bityblockly-math-story');
      const eqEl = document.getElementById('bityblockly-math-equation');
      const visualEl = document.getElementById('bityblockly-math-visual');
      const optsGrid = document.getElementById('bityblockly-math-options');
      const feedbackEl = document.getElementById('bityblockly-math-feedback');

      if (storyEl) storyEl.textContent = math.story;
      if (eqEl) eqEl.textContent = math.operation;
      if (feedbackEl) {
        feedbackEl.className = 'math-feedback-box';
        feedbackEl.textContent = 'Seleccioná la respuesta correcta para abrir la puerta:';
      }

      // Renderizar Ayuda Visual
      if (visualEl) {
        visualEl.innerHTML = '';
        if (math.type === 'subtraction') {
          // Baterías: total = 10, usadas = 5
          for (let i = 0; i < math.total; i++) {
            const cell = document.createElement('div');
            const isRemaining = i < (math.total - math.used);
            cell.className = `battery-cell ${isRemaining ? 'cell-active' : 'cell-spent'}`;
            cell.innerHTML = isRemaining ? '⚡' : '✕';
            cell.title = isRemaining ? 'Carga disponible' : 'Carga consumida';
            visualEl.appendChild(cell);
          }
        } else if (math.type === 'addition') {
          // Baterías base + agregadas
          for (let i = 0; i < math.base; i++) {
            const cell = document.createElement('div');
            cell.className = 'battery-cell cell-active';
            cell.innerHTML = '⚡';
            cell.title = 'Módulo inicial';
            visualEl.appendChild(cell);
          }
          for (let i = 0; i < math.added; i++) {
            const cell = document.createElement('div');
            cell.className = 'battery-cell cell-added';
            cell.innerHTML = '+⚡';
            cell.title = 'Módulo sumado';
            visualEl.appendChild(cell);
          }
        }
      }

      // Renderizar Opciones de respuesta
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
                feedbackEl.innerHTML = `🎉 ¡EXCELENTE! ${math.explanation} ¡La puerta se ha abierto!`;
              }
              // Desactivar botones
              optsGrid.querySelectorAll('.btn-math-option').forEach(b => b.disabled = true);

              setTimeout(() => {
                modal.classList.remove('active');
                this.doorOpen = true;
                this.isPausedForMath = false;
                this.setStatus('¡Muy bien! La puerta se abrió. Bity continúa su camino.', 'success');

                // Bity atraviesa la puerta y continúa ejecutando
                this.bityPos.x = config.door.x;
                this.bityPos.y = config.door.y;
                this.audio.play('step');
                this.advanceStepDelay();
              }, 1200);

            } else {
              btn.classList.add('opt-wrong');
              this.audio.play('wrong');
              if (feedbackEl) {
                feedbackEl.className = 'math-feedback-box feedback-wrong';
                feedbackEl.innerHTML = '¡Casi! No te preocupes. Observá la ayuda visual de las baterías y probá otra vez.';
              }
              setTimeout(() => {
                btn.classList.remove('opt-wrong');
              }, 600);
            }
          };

          optsGrid.appendChild(btn);
        });
      }

      modal.classList.add('active');
    }

    // -----------------------------------------------------------
    // Victoria y Finalización
    // -----------------------------------------------------------
    triggerVictory() {
      this.audio.play('victory');
      this.createCelebrationParticles();

      if (!this.completedLevels.includes(this.currentLevelIndex)) {
        this.completedLevels.push(this.currentLevelIndex);
      }
      if (this.currentLevelIndex < 3 && this.unlockedLevel <= this.currentLevelIndex) {
        this.unlockedLevel = this.currentLevelIndex + 1;
      }
      this.saveProgress();

      const modal = document.getElementById('bityblockly-victory-modal');
      if (!modal) return;

      const titleEl = document.getElementById('bityblockly-victory-title');
      const subtitleEl = document.getElementById('bityblockly-victory-subtitle');
      const reflectionBox = document.getElementById('bityblockly-reflection-box');
      const actionsEl = document.getElementById('bityblockly-victory-actions');

      if (this.currentLevelIndex === 3) {
        // PANTALLA FINAL DE CAMPAÑA
        if (titleEl) titleEl.textContent = '¡MISIÓN CUMPLIDA!';
        if (subtitleEl) subtitleEl.textContent = '¡AYUDASTE A BITY A REGRESAR A SU NAVE!';
        if (reflectionBox) {
          reflectionBox.style.display = 'block';
          reflectionBox.innerHTML = `
            <span class="classroom-reflection-tag">AHORA CONTÁ EN CLASE:</span>
            <p class="classroom-reflection-prompt">¿QUÉ APRENDISTE AL PROGRAMAR LOS MOVIMIENTOS DE BITY Y RESOLVER LAS CUENTAS?</p>
          `;
        }
        if (actionsEl) {
          actionsEl.innerHTML = `
            <button type="button" class="btn-victory-retry" id="btn-victory-replay-all">
              <span>🔄</span> ¡Volver a Jugar!
            </button>
            <button type="button" class="btn-victory-syllabus" id="btn-victory-back-syl">
              <span>📚</span> Volver al Temario
            </button>
          `;
          document.getElementById('btn-victory-replay-all').onclick = () => {
            modal.classList.remove('active');
            this.loadLevel(1);
          };
          document.getElementById('btn-victory-back-syl').onclick = () => {
            modal.classList.remove('active');
            this.onBackToSyllabus();
          };
        }
      } else {
        // VICTORIA DE NIVEL 1 O 2
        const nextLvl = this.currentLevelIndex + 1;
        if (titleEl) titleEl.textContent = `¡NIVEL ${this.currentLevelIndex} SUPERADO!`;
        if (subtitleEl) subtitleEl.textContent = `¡Excelente trabajo! Bity completó el recorrido y se desbloqueó el Nivel ${nextLvl}.`;
        if (reflectionBox) reflectionBox.style.display = 'none';

        if (actionsEl) {
          actionsEl.innerHTML = `
            <button type="button" class="btn-victory-next" id="btn-victory-go-next">
              <span>▶️</span> ¡Siguiente Nivel!
            </button>
            <button type="button" class="btn-victory-retry" id="btn-victory-replay-lvl">
              <span>🔄</span> Repetir Nivel
            </button>
          `;
          document.getElementById('btn-victory-go-next').onclick = () => {
            modal.classList.remove('active');
            this.loadLevel(nextLvl);
          };
          document.getElementById('btn-victory-replay-lvl').onclick = () => {
            modal.classList.remove('active');
            this.resetLevelState(true);
          };
        }
      }

      modal.classList.add('active');
    }

    createCelebrationParticles() {
      this.particles = [];
      const colors = ['#38bdf8', '#fde047', '#4ade80', '#f472b6', '#a855f7'];
      for (let i = 0; i < 40; i++) {
        this.particles.push({
          x: this.canvas.width / 2,
          y: this.canvas.height / 2,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8 - 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 5 + 3,
          life: 60
        });
      }
    }

    // -----------------------------------------------------------
    // Renderizado en Canvas
    // -----------------------------------------------------------
    startRenderLoop() {
      const loop = () => {
        this.renderCanvas();
        this.animationFrameId = requestAnimationFrame(loop);
      };
      this.animationFrameId = requestAnimationFrame(loop);
    }

    renderCanvas() {
      if (!this.canvas || !this.ctx) return;
      const ctx = this.ctx;
      const config = this.getCurrentLevelConfig();
      if (!config) return;

      const width = this.canvas.width = 680;
      const height = this.canvas.height = 420;

      // Calcular tamaño de casilla adaptado
      const tileSize = Math.min(Math.floor((width - 40) / config.cols), Math.floor((height - 40) / config.rows));
      const offsetX = Math.floor((width - tileSize * config.cols) / 2);
      const offsetY = Math.floor((height - tileSize * config.rows) / 2);

      // 1. Fondo según la ambientación del nivel
      ctx.fillStyle = config.theme === 'mars' ? '#2b0c0c' : (config.theme === 'moon' ? '#090d16' : '#060814');
      ctx.fillRect(0, 0, width, height);

      // Estrellas en el espacio exterior
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 24; i++) {
        const sx = (i * 37) % width;
        const sy = (i * 53) % height;
        const sz = (i % 2 === 0) ? 1.5 : 2.5;
        ctx.fillRect(sx, sy, sz, sz);
      }

      // 2. Dibujar Grilla de Laberinto
      for (let r = 0; r < config.rows; r++) {
        for (let c = 0; c < config.cols; c++) {
          const cell = config.grid[r][c];
          const x = offsetX + c * tileSize;
          const y = offsetY + r * tileSize;

          if (cell === 1) {
            // PARED / OBSTÁCULO ESPACIAL
            this.drawWallTile(ctx, x, y, tileSize, config.theme);
          } else {
            // CAMINO TRANSITABLE
            this.drawPathTile(ctx, x, y, tileSize, config.theme);

            if (cell === 2) {
              // PUERTA CON CANDADO DE ENERGÍA
              this.drawDoorTile(ctx, x, y, tileSize, this.doorOpen);
            } else if (cell === 3) {
              // META: NAVE ESPACIAL
              this.drawSpaceshipGoal(ctx, x, y, tileSize);
            }
          }
        }
      }

      // 3. Dibujar a Bity
      const bityPixelX = offsetX + this.bityPos.x * tileSize + tileSize / 2;
      const bityPixelY = offsetY + this.bityPos.y * tileSize + tileSize / 2;
      this.drawBity(ctx, bityPixelX, bityPixelY, tileSize, this.bityPos.dir);

      // 4. Efecto de choque si existe
      if (this.bumpAnimation && this.bumpAnimation.frame > 0) {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
        ctx.beginPath();
        ctx.arc(bityPixelX, bityPixelY, tileSize * 0.7, 0, Math.PI * 2);
        ctx.fill();
        this.bumpAnimation.frame--;
      }

      // 5. Partículas de celebración
      if (this.particles.length > 0) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
          const p = this.particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life--;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          if (p.life <= 0) {
            this.particles.splice(i, 1);
          }
        }
      }
    }

    drawWallTile(ctx, x, y, size, theme) {
      if (theme === 'mars') {
        ctx.fillStyle = '#7f1d1d';
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = '#991b1b';
        ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
        ctx.fillStyle = '#b91c1c';
        ctx.fillRect(x + 4, y + 4, size - 8, 3);
      } else if (theme === 'moon') {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = '#334155';
        ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
        ctx.fillStyle = '#475569';
        ctx.fillRect(x + 4, y + 4, size - 8, 3);
      } else {
        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = '#312e81';
        ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
        ctx.fillStyle = '#4338ca';
        ctx.fillRect(x + 4, y + 4, size - 8, 3);
      }
    }

    drawPathTile(ctx, x, y, size, theme) {
      if (theme === 'mars') {
        ctx.fillStyle = '#450a0a';
        ctx.fillRect(x, y, size, size);
        ctx.strokeStyle = '#7f1d1d';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, size, size);
      } else if (theme === 'moon') {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(x, y, size, size);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, size, size);
      } else {
        ctx.fillStyle = '#090d16';
        ctx.fillRect(x, y, size, size);
        ctx.strokeStyle = '#1e1b4b';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, size, size);
      }
    }

    drawDoorTile(ctx, x, y, size, isOpen) {
      ctx.save();
      if (!isOpen) {
        // Puerta cerrada: campo de fuerza cyan con candado
        ctx.fillStyle = 'rgba(2, 132, 199, 0.4)';
        ctx.fillRect(x + 4, y + 4, size - 8, size - 8);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(x + 4, y + 4, size - 8, size - 8);

        // Icono de candado / energía
        ctx.fillStyle = '#fde047';
        ctx.font = `bold ${Math.floor(size * 0.45)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🔒', x + size / 2, y + size / 2);
      } else {
        // Puerta abierta: portal verde brillante
        ctx.fillStyle = 'rgba(34, 197, 94, 0.35)';
        ctx.fillRect(x + 4, y + 4, size - 8, size - 8);
        ctx.strokeStyle = '#4ade80';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 4, y + 4, size - 8, size - 8);

        ctx.fillStyle = '#4ade80';
        ctx.font = `bold ${Math.floor(size * 0.4)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('⚡', x + size / 2, y + size / 2);
      }
      ctx.restore();
    }

    drawSpaceshipGoal(ctx, x, y, size) {
      ctx.save();
      // Aura de la nave
      ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.beginPath();
      ctx.arc(x + size / 2, y + size / 2, size * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // Icono de cohete espacial grande
      ctx.font = `${Math.floor(size * 0.65)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🚀', x + size / 2, y + size / 2);
      ctx.restore();
    }

    drawBity(ctx, cx, cy, size, dir) {
      ctx.save();
      ctx.translate(cx, cy);

      // Rotación según orientación: 0: N, 1: E, 2: S, 3: W
      const angles = [0, Math.PI / 2, Math.PI, -Math.PI / 2];
      ctx.rotate(angles[dir]);

      const scale = size / 56;
      ctx.scale(scale, scale);

      // 1. Antena
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(-2, -24, 4, 8);
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(0, -25, 4, 0, Math.PI * 2);
      ctx.fill();

      // 2. Cabeza
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.roundRect(-14, -18, 28, 18, 5);
      ctx.fill();

      // Visor
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.roundRect(-10, -14, 20, 10, 3);
      ctx.fill();

      // Ojos LED cyan
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-7, -12, 4, 5);
      ctx.fillRect(3, -12, 4, 5);

      // 3. Torso
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.roundRect(-12, 0, 24, 14, 4);
      ctx.fill();

      // Núcleo de energía
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(-3, 3, 6, 6);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-2, 4, 4, 4);

      // 4. Orugas / Ruedas
      ctx.fillStyle = '#475569';
      ctx.fillRect(-16, 14, 10, 6);
      ctx.fillRect(6, 14, 10, 6);

      // Flecha indicadora de dirección frontal
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.moveTo(0, -28);
      ctx.lineTo(-4, -22);
      ctx.lineTo(4, -22);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    destroy() {
      this.stopProgram();
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }
  }

  // Exportar globalmente
  global.BityBlocklyGame = BityBlocklyGame;
  global.BITYBLOCKLY_LEVELS = BITYBLOCKLY_LEVELS;

})(window);
