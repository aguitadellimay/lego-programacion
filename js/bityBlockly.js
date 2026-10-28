/**
 * ========================================================
 * BITYBLOCKLY: MISIÓN ESPACIAL
 * Módulo de programación visual por bloques y laberintos
 * con desafíos matemáticos obligatorios para 1.er Grado.
 * 5 Niveles progresivos con final animado cinematográfico.
 * ========================================================
 */

(function (global) {
  'use strict';

  // -------------------------------------------------------------
  // 1. Definición de los 5 Niveles y Laberintos
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
      name: 'Nivel 3: El sector cósmico',
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
      story: 'Bity recorre un sector espacial entre asteroides y compuertas de alta seguridad. ¡Programá su camino para avanzar a la estación!',
      hint: '💡 Planificá el recorrido completo paso a paso antes de ejecutar. ¡Revisá tus instrucciones si te equivocás!',
      math: {
        story: '¡Para calibrar los propulsores! Bity tiene 8 chips de propulsión y utiliza 3 para activar los motores. ¿Cuántos chips le quedan?',
        operation: '8 − 3 = ?',
        type: 'subtraction',
        total: 8,
        used: 3,
        options: [4, 5, 6],
        correctAnswer: 5,
        explanation: '8 menos 3 es igual a 5. ¡A Bity le quedan 5 chips para calibrar la nave!'
      }
    },
    {
      id: 4,
      name: 'Nivel 4: La estación de energía',
      theme: 'station',
      cols: 10,
      rows: 7,
      start: { x: 1, y: 1, dir: 1 }, // East
      goal: { x: 8, y: 2 },
      door: { x: 4, y: 5 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 0, 0, 3, 1],
        [1, 1, 0, 0, 1, 1, 0, 1, 1, 1],
        [1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 0, 0, 2, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      story: 'Bity llegó a una estación espacial que se encuentra entre Marte y la nave. Necesita atravesar sus pasillos, activar una estación de energía y encontrar la salida.',
      hint: '💡 Este laberinto tiene más pasillos y curvas. Pensá qué giro necesitás antes de avanzar hacia cada compuerta.',
      math: {
        story: '¡La estación necesita energía! Había 12 cargas disponibles y se utilizaron 3. ¿Cuántas cargas quedan?',
        operation: '12 − 3 = ?',
        type: 'subtraction',
        total: 12,
        used: 3,
        options: [8, 9, 10],
        correctAnswer: 9,
        explanation: '12 menos 3 es igual a 9. ¡A la estación le quedan 9 cargas de energía!'
      }
    },
    {
      id: 5,
      name: 'Nivel 5: ¡Regreso a casa!',
      theme: 'mothership',
      cols: 11,
      rows: 8,
      start: { x: 1, y: 6, dir: 0 }, // North
      goal: { x: 9, y: 1 },
      door: { x: 5, y: 3 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 2, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      story: '¡Bity está cerca de su nave! Debe atravesar el último laberinto para regresar a casa. Superá el último desafío matemático y guialo hasta la plataforma de aterrizaje.',
      hint: '💡 ¡Misión final! Organizá toda la secuencia de instrucciones con calma. ¡La nave espacial te está esperando!',
      math: {
        story: '¡Último impulso de energía para la nave! Bity tiene 12 células de propulsión y suma 5 células encontradas en la plataforma. ¿Cuántas células tiene en total?',
        operation: '12 + 5 = ?',
        type: 'addition',
        base: 12,
        added: 5,
        options: [16, 17, 18],
        correctAnswer: 17,
        explanation: '12 más 5 es igual a 17. ¡Los motores de la nave tienen 17 células de energía listas!'
      }
    }
  ];

  // -------------------------------------------------------------
  // 2. Motor de Audio Sintetizado
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
      this.bumpAnimation = null;

      // Programa de bloques construido por el alumno
      this.blocks = [];
      this.maxBlocks = 35; // Ampliado para soportar el nivel 5 con 29+ bloques

      // Estado de ejecución
      this.isRunning = false;
      this.isPausedForMath = false;
      this.currentStepIndex = -1;
      this.executionTimerId = null;

      // Canvas principal y animación
      this.canvas = null;
      this.ctx = null;
      this.particles = [];
      this.animationFrameId = null;

      // Cinemática final
      this.cinematicFrameId = null;
      this.isCinematicPlaying = false;

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
          this.unlockedLevel = Math.max(1, Math.min(5, parseInt(data.unlockedLevel) || 1));
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
      const pct = Math.min(100, Math.round((count / 5) * 100));
      return {
        completedCount: count,
        totalLevels: 5,
        percentage: pct,
        isCompleted: count >= 5,
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

      // Botón volver al temario
      const btnBack = document.getElementById('btn-bityblockly-back');
      if (btnBack) {
        btnBack.onclick = () => {
          this.stopProgram();
          this.stopCinematic();
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

      // Pestañas de niveles (1 a 5)
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
      this.stopCinematic();
      this.currentLevelIndex = Math.max(1, Math.min(5, lvlNumber));
      const config = this.getCurrentLevelConfig();
      if (!config) return;

      this.doorOpen = false;
      this.bityPos = { x: config.start.x, y: config.start.y, dir: config.start.dir };
      this.blocks = [];
      this.currentStepIndex = -1;

      // Asegurar cierre de modales
      const vModal = document.getElementById('bityblockly-victory-modal');
      if (vModal) vModal.classList.remove('active');
      const cModal = document.getElementById('bityblockly-cinematic-modal');
      if (cModal) cModal.classList.remove('active');

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

      // Pestañas (1 a 5)
      const tabs = document.querySelectorAll('.bityblockly-tab-btn');
      tabs.forEach(t => {
        const lvl = parseInt(t.dataset.level) || 1;
        t.classList.toggle('active', lvl === this.currentLevelIndex);
        const isLocked = lvl > this.unlockedLevel;
        t.disabled = isLocked;
        t.classList.toggle('locked', isLocked);
      });

      // Briefing del nivel
      const nameEl = document.getElementById('bityblockly-level-title');
      const storyEl = document.getElementById('bityblockly-story-text');
      const hintEl = document.getElementById('bityblockly-hint-text');
      const badgeEl = document.getElementById('bityblockly-badge-text');

      if (nameEl) nameEl.textContent = config.name.toUpperCase();
      if (storyEl) storyEl.textContent = config.story;
      if (hintEl) hintEl.textContent = config.hint;
      if (badgeEl) badgeEl.textContent = `Nivel ${config.id} de 5`;
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
          this.setStatus('⚡ ¡La puerta espacial está bloqueada con un candado de energía! Resolvé la cuenta.', 'warning');
          this.triggerMathChallenge();
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
          for (let i = 0; i < math.total; i++) {
            const cell = document.createElement('div');
            const isRemaining = i < (math.total - math.used);
            cell.className = `battery-cell ${isRemaining ? 'cell-active' : 'cell-spent'}`;
            cell.innerHTML = isRemaining ? '⚡' : '✕';
            cell.title = isRemaining ? 'Carga disponible' : 'Carga consumida';
            visualEl.appendChild(cell);
          }
        } else if (math.type === 'addition') {
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
              optsGrid.querySelectorAll('.btn-math-option').forEach(b => b.disabled = true);

              setTimeout(() => {
                modal.classList.remove('active');
                this.doorOpen = true;
                this.isPausedForMath = false;
                this.setStatus('¡Muy bien! La puerta se abrió. Bity continúa su camino.', 'success');

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
    // Victoria y Continuidad entre Niveles
    // -----------------------------------------------------------
    triggerVictory() {
      this.audio.play('victory');
      this.createCelebrationParticles();

      if (!this.completedLevels.includes(this.currentLevelIndex)) {
        this.completedLevels.push(this.currentLevelIndex);
      }
      if (this.currentLevelIndex < 5 && this.unlockedLevel <= this.currentLevelIndex) {
        this.unlockedLevel = this.currentLevelIndex + 1;
      }
      this.saveProgress();

      if (this.currentLevelIndex === 5) {
        // EN EL NIVEL 5: INICIAR CINEMÁTICA FINAL ANIMADA
        this.startMissionEndingCinematic();
        return;
      }

      // PARA NIVELES 1, 2, 3 Y 4: MODAL DE TRANSICIÓN DIRECTA
      const modal = document.getElementById('bityblockly-victory-modal');
      if (!modal) return;

      const titleEl = document.getElementById('bityblockly-victory-title');
      const subtitleEl = document.getElementById('bityblockly-victory-subtitle');
      const reflectionBox = document.getElementById('bityblockly-reflection-box');
      const actionsEl = document.getElementById('bityblockly-victory-actions');

      const nextLvl = this.currentLevelIndex + 1;
      if (titleEl) titleEl.textContent = `¡NIVEL ${this.currentLevelIndex} SUPERADO!`;
      if (subtitleEl) subtitleEl.textContent = `¡Excelente trabajo! Bity completó el recorrido. Se ha desbloqueado el Nivel ${nextLvl}.`;
      if (reflectionBox) reflectionBox.style.display = 'none';

      if (actionsEl) {
        actionsEl.innerHTML = `
          <button type="button" class="btn-victory-next" id="btn-victory-go-next">
            <span>▶️</span> Continuar al nivel ${nextLvl}
          </button>
          <button type="button" class="btn-victory-retry" id="btn-victory-replay-lvl">
            <span>🔄</span> Repetir Nivel
          </button>
        `;
        document.getElementById('btn-victory-go-next').onclick = () => {
          modal.classList.remove('active');
          this.loadLevel(nextLvl); // Permanece dentro de BityBlockly sin salir al menú
        };
        document.getElementById('btn-victory-replay-lvl').onclick = () => {
          modal.classList.remove('active');
          this.resetLevelState(true);
        };
      }

      modal.classList.add('active');
    }

    // -----------------------------------------------------------
    // Cinemática Final: Bity Regresa a su Nave (Escenas 1, 2, 3 y 4)
    // -----------------------------------------------------------
    startMissionEndingCinematic() {
      const modal = document.getElementById('bityblockly-cinematic-modal');
      if (!modal) return;
      modal.classList.add('active');

      const canvas = document.getElementById('bityblockly-cinematic-canvas');
      const subEl = document.getElementById('bityblockly-cinematic-subtitle');
      const finalCard = document.getElementById('bityblockly-final-celebration-card');
      const canvasWrap = modal.querySelector('.cinematic-canvas-wrap');

      if (canvasWrap) canvasWrap.style.display = 'block';
      if (finalCard) finalCard.style.display = 'none';

      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = 640;
      canvas.height = 360;

      this.isCinematicPlaying = true;
      const startTime = performance.now();

      // Botones de la escena final
      const btnReplay = document.getElementById('btn-final-replay-mission');
      if (btnReplay) {
        btnReplay.onclick = () => {
          this.stopCinematic();
          modal.classList.remove('active');
          this.loadLevel(1);
        };
      }

      const btnBackGrade = document.getElementById('btn-final-back-grade1');
      if (btnBackGrade) {
        btnBackGrade.onclick = () => {
          this.stopCinematic();
          modal.classList.remove('active');
          this.onBackToSyllabus();
        };
      }

      let playedDoorSound = false;
      let playedFanfare = false;

      const loop = (now) => {
        if (!this.isCinematicPlaying) return;
        const elapsed = now - startTime;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Fondo cósmico
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Estrellas titilantes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        for (let i = 0; i < 35; i++) {
          const sx = (i * 73) % canvas.width;
          const sy = (i * 97 + (elapsed * 0.05)) % canvas.height;
          ctx.fillRect(sx, sy, (i % 2 === 0 ? 2 : 1.5), (i % 2 === 0 ? 2 : 1.5));
        }

        // Planeta de fondo que se aleja
        const planetY = 280 + Math.min(100, elapsed * 0.02);
        ctx.fillStyle = '#b91c1c';
        ctx.beginPath();
        ctx.arc(320, planetY + 300, 360, 0, Math.PI * 2);
        ctx.fill();

        if (elapsed < 2200) {
          // ESCENA 1: Llegada
          if (subEl) subEl.textContent = '¡Lo lograste! ¡Bity encontró el camino de regreso!';
          
          // Plataforma
          ctx.fillStyle = '#334155';
          ctx.fillRect(180, 240, 280, 20);

          // Bity caminando hacia la nave
          const bityWalkX = 200 + (elapsed / 2200) * 100;
          const bityBounce = Math.abs(Math.sin(elapsed * 0.015)) * 6;
          this.drawBity(ctx, bityWalkX, 220 - bityBounce, 48, 1);

          // Nave en plataforma
          this.drawCinematicShip(ctx, 380, 190, false, 0);

        } else if (elapsed < 4800) {
          // ESCENA 2: Subida a la nave
          if (subEl) subEl.textContent = 'Bity sube a bordo de la nave espacial... ¡Compuerta asegurada!';

          if (!playedDoorSound) {
            this.audio.play('doorUnlock');
            playedDoorSound = true;
          }

          // Plataforma
          ctx.fillStyle = '#334155';
          ctx.fillRect(180, 240, 280, 20);

          const scene2Time = elapsed - 2200;
          const hatchOpen = scene2Time < 1600;

          // Bity entrando por la compuerta
          if (scene2Time < 1400) {
            const bityInX = 300 + (scene2Time / 1400) * 70;
            const alpha = 1 - (scene2Time / 1400);
            ctx.save();
            ctx.globalAlpha = Math.max(0, alpha);
            this.drawBity(ctx, bityInX, 218, 44, 1);
            ctx.restore();
          }

          // Nave con compuerta
          this.drawCinematicShip(ctx, 380, 190, hatchOpen, 0);

        } else if (elapsed < 8200) {
          // ESCENA 3: Despegue
          if (subEl) subEl.textContent = '¡Motores encendidos! Despegando hacia las estrellas...';

          if (!playedFanfare) {
            this.audio.play('victory');
            playedFanfare = true;
          }

          const scene3Time = elapsed - 4800;
          const shipLift = (scene3Time * scene3Time) * 0.000045;
          const shipY = 190 - shipLift;
          const rumble = Math.sin(scene3Time * 0.1) * 2;

          // Partículas de fuego propulsor
          this.drawThrusterFlames(ctx, 380 + rumble, shipY + 45);

          // Nave ascendiendo
          this.drawCinematicShip(ctx, 380 + rumble, shipY, false, 1);

        } else {
          // ESCENA 4: Agradecimiento y Victoria Final
          if (canvasWrap) canvasWrap.style.display = 'none';
          if (finalCard) finalCard.style.display = 'block';
          this.stopCinematic();
          return;
        }

        this.cinematicFrameId = requestAnimationFrame(loop);
      };

      this.cinematicFrameId = requestAnimationFrame(loop);
    }

    drawCinematicShip(ctx, x, y, hatchOpen, thrustOn) {
      ctx.save();
      ctx.translate(x, y);

      // Fuselaje principal
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.ellipse(0, 0, 36, 68, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Ventana de cabina con Bity visible
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(0, -22, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(-2, -24, 6, 0, Math.PI * 2);
      ctx.fill();

      // Alerones laterales rojos
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(-32, 10);
      ctx.lineTo(-58, 48);
      ctx.lineTo(-24, 42);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(32, 10);
      ctx.lineTo(58, 48);
      ctx.lineTo(24, 42);
      ctx.closePath();
      ctx.fill();

      // Compuerta
      if (hatchOpen) {
        ctx.fillStyle = '#fde047';
        ctx.fillRect(-12, 10, 24, 26);
      } else {
        ctx.fillStyle = '#64748b';
        ctx.fillRect(-10, 12, 20, 24);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-10, 12, 20, 24);
      }

      // Tobera del motor
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-14, 60, 28, 10);

      // Luces de navegación
      const blink = Math.sin(Date.now() / 120) > 0;
      ctx.fillStyle = blink ? '#22c55e' : '#15803d';
      ctx.beginPath();
      ctx.arc(-54, 46, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = blink ? '#ef4444' : '#b91c1c';
      ctx.beginPath();
      ctx.arc(54, 46, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    drawThrusterFlames(ctx, x, y) {
      ctx.save();
      ctx.translate(x, y);
      const h = 40 + Math.random() * 25;
      const w = 18 + Math.random() * 6;

      // Llama exterior naranja
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(-w, 20);
      ctx.lineTo(w, 20);
      ctx.lineTo(0, 20 + h);
      ctx.closePath();
      ctx.fill();

      // Núcleo brillante amarillo
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.moveTo(-w * 0.5, 20);
      ctx.lineTo(w * 0.5, 20);
      ctx.lineTo(0, 20 + h * 0.6);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    stopCinematic() {
      this.isCinematicPlaying = false;
      if (this.cinematicFrameId) {
        cancelAnimationFrame(this.cinematicFrameId);
        this.cinematicFrameId = null;
      }
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

      const tileSize = Math.min(Math.floor((width - 40) / config.cols), Math.floor((height - 40) / config.rows));
      const offsetX = Math.floor((width - tileSize * config.cols) / 2);
      const offsetY = Math.floor((height - tileSize * config.rows) / 2);

      // Fondo según el tema
      if (config.theme === 'mars') {
        ctx.fillStyle = '#2b0c0c';
      } else if (config.theme === 'moon') {
        ctx.fillStyle = '#090d16';
      } else if (config.theme === 'station') {
        ctx.fillStyle = '#070b19';
      } else if (config.theme === 'mothership') {
        ctx.fillStyle = '#050714';
      } else {
        ctx.fillStyle = '#060814';
      }
      ctx.fillRect(0, 0, width, height);

      // Estrellas de fondo
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 28; i++) {
        const sx = (i * 37) % width;
        const sy = (i * 53) % height;
        const sz = (i % 2 === 0) ? 1.5 : 2.5;
        ctx.fillRect(sx, sy, sz, sz);
      }

      // Dibujar grilla
      for (let r = 0; r < config.rows; r++) {
        for (let c = 0; c < config.cols; c++) {
          const cell = config.grid[r][c];
          const x = offsetX + c * tileSize;
          const y = offsetY + r * tileSize;

          if (cell === 1) {
            this.drawWallTile(ctx, x, y, tileSize, config.theme);
          } else {
            this.drawPathTile(ctx, x, y, tileSize, config.theme);

            if (cell === 2) {
              this.drawDoorTile(ctx, x, y, tileSize, this.doorOpen);
            } else if (cell === 3) {
              this.drawSpaceshipGoal(ctx, x, y, tileSize);
            }
          }
        }
      }

      // Dibujar a Bity
      const bityPixelX = offsetX + this.bityPos.x * tileSize + tileSize / 2;
      const bityPixelY = offsetY + this.bityPos.y * tileSize + tileSize / 2;
      this.drawBity(ctx, bityPixelX, bityPixelY, tileSize, this.bityPos.dir);

      // Efecto de choque
      if (this.bumpAnimation && this.bumpAnimation.frame > 0) {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
        ctx.beginPath();
        ctx.arc(bityPixelX, bityPixelY, tileSize * 0.7, 0, Math.PI * 2);
        ctx.fill();
        this.bumpAnimation.frame--;
      }

      // Partículas
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
      } else if (theme === 'station') {
        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = '#2e1065';
        ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
        ctx.fillStyle = '#6366f1';
        ctx.fillRect(x + 4, y + 4, size - 8, 3);
      } else if (theme === 'mothership') {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
        ctx.fillStyle = '#38bdf8';
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
      } else if (theme === 'station') {
        ctx.fillStyle = '#0a0f24';
        ctx.fillRect(x, y, size, size);
        ctx.strokeStyle = '#4338ca';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, size, size);
      } else if (theme === 'mothership') {
        ctx.fillStyle = '#090d16';
        ctx.fillRect(x, y, size, size);
        ctx.strokeStyle = '#0284c7';
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
        ctx.fillStyle = 'rgba(2, 132, 199, 0.4)';
        ctx.fillRect(x + 4, y + 4, size - 8, size - 8);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(x + 4, y + 4, size - 8, size - 8);

        ctx.fillStyle = '#fde047';
        ctx.font = `bold ${Math.floor(size * 0.45)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🔒', x + size / 2, y + size / 2);
      } else {
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
      ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.beginPath();
      ctx.arc(x + size / 2, y + size / 2, size * 0.45, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = `${Math.floor(size * 0.65)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🚀', x + size / 2, y + size / 2);
      ctx.restore();
    }

    drawBity(ctx, cx, cy, size, dir) {
      ctx.save();
      ctx.translate(cx, cy);

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

      // 4. Orugas
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
      this.stopCinematic();
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
