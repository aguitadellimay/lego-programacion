/**
 * platformerGame.js - Desafío final: Instrucciones (Etapa 2)
 * Videojuego educativo de plataformas 2D con Bity.
 *
 * Características de la Etapa 2:
 * - 3 niveles jugables con temática, longitud y mecánicas diferenciadas:
 *   1. El valle de los robots (Introductorio, saltos suaves, cielo diurno)
 *   2. La fábrica mecánica (Plataformas móviles horizontales/verticales, peligros industriales)
 *   3. El planeta de Bity (Cosmos, plataformas flotantes móviles, mayor exigencia, nave estelar)
 * - Progresión de campaña: desbloqueo secuencial (Nivel 1 -> 2 -> 3) con persistencia en localStorage.
 * - Selector de niveles interactivo con candados para niveles bloqueados.
 * - Plataformas móviles donde Bity se desplaza solidariamente al estar encima.
 * - Banco de más de 240 preguntas pedagógicas con selección aleatoria y prevención de repetición inmediata.
 * - Adaptación de dificultad y contenidos por grado escolar (1.° a 5.° grado).
 * - Sistema de 3 vidas, cronómetro general de 3 minutos y temporizador matemático de 30 segundos.
 */

class BityPlatformerGame {
  constructor(options = {}) {
    this.container = options.container;
    this.grade = parseInt(options.grade) || 1;
    this.isGradeOne = this.grade === 1;
    this.onComplete = options.onComplete || (() => {});
    this.onBack = options.onBack || (() => {});
    this.onPlaySound = options.onPlaySound || (() => {});

    // Motor de preguntas pedagógicas con historial anti-repetición
    this.questionManager = window.BityQuestionManager
      ? new window.BityQuestionManager()
      : null;

    // Dimensiones lógicas del canvas
    this.viewWidth = 800;
    this.viewHeight = 450;
    this.cameraX = 0;

    // Estado de la campaña y persistencia de niveles desbloqueados
    this.storageKey = `lego_bity_plat_progress_g${this.grade}`;
    this.loadProgress();

    // Nivel actual (1, 2 o 3)
    this.currentLevelIndex = options.initialLevel || 1;
    if (this.currentLevelIndex > this.unlockedLevel) {
      this.currentLevelIndex = this.unlockedLevel;
    }

    // Estado del juego
    this.isStarted = false;
    this.isRunning = false;
    this.isPausedForModal = false;
    this.isGameOver = false;
    this.isVictory = false;

    // Vidas y tiempo global
    this.maxLives = 3;
    this.lives = 3;
    this.timeLimitSeconds = 180; // 3 minutos
    this.timeRemaining = 180;
    this.globalTimerInterval = null;

    // Temporizador matemático de 30 segundos
    this.mathTimerInterval = null;
    this.mathTimeRemaining = 30;

    // Puntaje y preguntas respondidas en el nivel actual
    this.score = 0;
    this.questionsAnswered = {
      flower: false,
      mushroom: false,
      mushroom2: false,
      math: false
    };

    // Teclas / Controles
    this.keys = {
      left: false,
      right: false,
      jump: false
    };

    // Efectos y partículas
    this.particles = [];
    this.floatingTexts = [];

    // Cargar la configuración del nivel actual
    this.loadLevelConfig(this.currentLevelIndex);

    // Montar la estructura HTML
    this.mount();

    // Vincular eventos de teclado
    this.bindEvents();

    // Iniciar loop de animación en modo reposo
    this.lastFrameTime = performance.now();
    this.animationFrameId = requestAnimationFrame((t) => this.gameLoop(t));

    // Mostrar modal inicial de briefing o selector
    this.showBriefingModal();
  }

  // ========================================================
  // PERSISTENCIA DEL PROGRESO DE CAMPAÑA
  // ========================================================

  loadProgress() {
    try {
      const dataStr = localStorage.getItem(this.storageKey);
      if (dataStr) {
        const parsed = JSON.parse(dataStr);
        this.unlockedLevel = parsed.unlockedLevel || 1;
        this.completedLevels = Array.isArray(parsed.completedLevels) ? parsed.completedLevels : [];
        return;
      }
    } catch (e) {
      console.warn('Error reading platformer progress:', e);
    }
    this.unlockedLevel = 1;
    this.completedLevels = [];
  }

  saveProgress() {
    try {
      const payload = {
        unlockedLevel: this.unlockedLevel,
        completedLevels: this.completedLevels,
        lastUpdated: Date.now()
      };
      localStorage.setItem(this.storageKey, JSON.stringify(payload));
    } catch (e) {
      console.warn('Error saving platformer progress:', e);
    }
  }

  unlockNextLevel() {
    if (!this.completedLevels.includes(this.currentLevelIndex)) {
      this.completedLevels.push(this.currentLevelIndex);
    }
    if (this.currentLevelIndex < 3) {
      this.unlockedLevel = Math.max(this.unlockedLevel, this.currentLevelIndex + 1);
    } else {
      this.unlockedLevel = 3;
    }
    this.saveProgress();
  }

  // ========================================================
  // CONFIGURACIÓN DE LOS TRES NIVELES
  // ========================================================

  loadLevelConfig(levelNum) {
    this.currentLevelIndex = levelNum;
    this.isVictory = false;
    this.isGameOver = false;
    this.isPausedForModal = false;
    this.lives = this.maxLives;
    this.timeRemaining = this.timeLimitSeconds;
    this.score = 0;
    this.questionsAnswered = {
      flower: false,
      mushroom: false,
      mushroom2: false,
      math: false
    };

    // Modificador de velocidad según el grado escolar
    // 1.° grado más calmo (0.85); 5.° grado más ágil (1.35)
    const gradeSpeedScale = 0.75 + this.grade * 0.12;

    if (levelNum === 1) {
      // ----------------------------------------------------
      // NIVEL 1: EL VALLE DE LOS ROBOTS
      // ----------------------------------------------------
      this.levelName = this.isGradeOne ? 'EL VALLE DE LOS ROBOTS' : 'El valle de los robots';
      this.theme = 'valley';
      this.worldWidth = 2200;
      this.worldHeight = 450;
      this.safeCheckpoint = { x: 60, y: 342 };

      // Segmentos de suelo (2 pozos sencillos: 130px y 140px)
      this.groundSegments = [
        { x: 0, y: 390, w: 660, h: 60 },
        { x: 790, y: 390, w: 680, h: 60 },
        { x: 1610, y: 390, w: 590, h: 60 }
      ];

      // Plataformas estáticas
      this.platforms = [
        { x: 220, y: 310, w: 130, h: 22, type: 'tech' },
        { x: 540, y: 290, w: 100, h: 22, type: 'tech' },
        { x: 380, y: 350, w: 40, h: 40, type: 'solid_brick' },
        { x: 860, y: 300, w: 140, h: 22, type: 'tech' },
        { x: 1140, y: 310, w: 100, h: 22, type: 'tech' },
        { x: 1280, y: 240, w: 130, h: 22, type: 'tech' }, // Plataforma de la batería
        { x: 1490, y: 310, w: 90, h: 22, type: 'tech' },  // Cruce sobre pozo 2
        { x: 1720, y: 300, w: 130, h: 22, type: 'tech' }
      ];

      // Bloque misterioso golpeable
      this.bumpBlocks = [
        { x: 440, y: 260, w: 42, h: 42, bumped: false, animOffsetY: 0, bumpTimer: 0 }
      ];

      // Coleccionables
      this.collectibles = [
        { id: 'c_flower', type: 'flower', cat: 'instrucciones', x: 260, y: 268, w: 36, h: 36, collected: false, icon: '🌸' },
        { id: 'c_mush', type: 'mushroom', cat: 'programacion', x: 1020, y: 348, w: 36, h: 36, collected: false, icon: '🍄' },
        { id: 'c_batt', type: 'battery', cat: 'matematica', x: 1330, y: 198, w: 36, h: 36, collected: false, icon: '🔋' }
      ];

      // Enemigos (1 terrestre lento, 1 dron predecible)
      this.enemies = [
        { type: 'ground', x: 880, y: 350, w: 38, h: 40, minX: 840, maxX: 1080, speed: 1.5 * gradeSpeedScale, dir: 1, facing: 'right' },
        { type: 'drone', x: 1680, baseY: 200, y: 200, w: 42, h: 32, minX: 1660, maxX: 1960, speed: 1.8 * gradeSpeedScale, dir: 1, angle: 0 }
      ];

      // Meta al final
      this.goal = { x: 2040, y: 250, w: 70, h: 140, type: 'beacon' };

    } else if (levelNum === 2) {
      // ----------------------------------------------------
      // NIVEL 2: LA FÁBRICA MECÁNICA
      // ----------------------------------------------------
      this.levelName = this.isGradeOne ? 'LA FÁBRICA MECÁNICA' : 'La fábrica mecánica';
      this.theme = 'factory';
      this.worldWidth = 2600;
      this.worldHeight = 450;
      this.safeCheckpoint = { x: 60, y: 342 };

      // Suelo industrial con 3 pozos de magma/residuos
      this.groundSegments = [
        { x: 0, y: 390, w: 560, h: 60 },
        { x: 740, y: 390, w: 480, h: 60 },
        { x: 1400, y: 390, w: 480, h: 60 },
        { x: 2060, y: 390, w: 540, h: 60 }
      ];

      // Plataformas con PLATAFORMAS MÓVILES
      this.platforms = [
        // Plataformas estáticas
        { x: 200, y: 310, w: 120, h: 22, type: 'metal' },
        { x: 400, y: 250, w: 110, h: 22, type: 'metal' },
        { x: 800, y: 290, w: 130, h: 22, type: 'metal' },
        { x: 1020, y: 230, w: 120, h: 22, type: 'metal' },
        { x: 1460, y: 290, w: 130, h: 22, type: 'metal' },
        { x: 2120, y: 300, w: 130, h: 22, type: 'metal' },

        // PLATAFORMA MÓVIL 1 (horizontal sobre pozo 1: x 560 a 740)
        {
          x: 580, y: 310, w: 90, h: 22, type: 'metal',
          isMoving: true, axis: 'x', minX: 570, maxX: 720,
          speedX: 1.6 * gradeSpeedScale, dirX: 1, vx: 0, vy: 0
        },

        // PLATAFORMA MÓVIL 2 (horizontal sobre pozo 2: x 1220 a 1400)
        {
          x: 1230, y: 300, w: 90, h: 22, type: 'metal',
          isMoving: true, axis: 'x', minX: 1230, maxX: 1380,
          speedX: 1.8 * gradeSpeedScale, dirX: 1, vx: 0, vy: 0
        },

        // PLATAFORMA MÓVIL 3 (ascensor vertical industrial)
        {
          x: 1720, y: 310, w: 85, h: 22, type: 'metal',
          isMoving: true, axis: 'y', minY: 180, maxY: 320,
          speedY: 1.5 * gradeSpeedScale, dirY: -1, vx: 0, vy: 0
        }
      ];

      // Bloques misteriosos interactivos
      this.bumpBlocks = [
        { x: 420, y: 190, w: 42, h: 42, bumped: false, animOffsetY: 0, bumpTimer: 0 },
        { x: 1540, y: 230, w: 42, h: 42, bumped: false, animOffsetY: 0, bumpTimer: 0 }
      ];

      // Coleccionables (4 preguntas: Flor, Hongo, Chip de Algoritmo, Batería matemática)
      this.collectibles = [
        { id: 'c_flower', type: 'flower', cat: 'instrucciones', x: 240, y: 268, w: 36, h: 36, collected: false, icon: '🌸' },
        { id: 'c_mush1', type: 'mushroom', cat: 'programacion', x: 860, y: 248, w: 36, h: 36, collected: false, icon: '🍄' },
        { id: 'c_mush2', type: 'algo_chip', cat: 'algoritmos', x: 1480, y: 248, w: 36, h: 36, collected: false, icon: '🧩' },
        { id: 'c_batt', type: 'battery', cat: 'matematica', x: 1745, y: 140, w: 36, h: 36, collected: false, icon: '🔋' }
      ];

      // Enemigos (2 terrestres, 2 drones)
      this.enemies = [
        { type: 'ground', x: 840, y: 350, w: 38, h: 40, minX: 760, maxX: 1040, speed: 1.8 * gradeSpeedScale, dir: 1, facing: 'right' },
        { type: 'ground', x: 1440, y: 350, w: 38, h: 40, minX: 1410, maxX: 1680, speed: 2.1 * gradeSpeedScale, dir: 1, facing: 'right' },
        { type: 'drone', x: 1040, baseY: 180, y: 180, w: 42, h: 32, minX: 980, maxX: 1200, speed: 2.0 * gradeSpeedScale, dir: 1, angle: 0 },
        { type: 'drone', x: 2140, baseY: 210, y: 210, w: 42, h: 32, minX: 2080, maxX: 2380, speed: 2.4 * gradeSpeedScale, dir: 1, angle: 1.5 }
      ];

      // Meta: Compuerta de extracción de la fábrica
      this.goal = { x: 2440, y: 250, w: 70, h: 140, type: 'airlock' };

    } else {
      // ----------------------------------------------------
      // NIVEL 3: EL PLANETA DE BITY (DESAFÍO CUMBRE)
      // ----------------------------------------------------
      this.levelName = this.isGradeOne ? 'EL PLANETA DE BITY' : 'El planeta de Bity';
      this.theme = 'alien_planet';
      this.worldWidth = 3000;
      this.worldHeight = 450;
      this.safeCheckpoint = { x: 60, y: 342 };

      // Terreno cósmico fragmentado con pozos de abismo estelar
      this.groundSegments = [
        { x: 0, y: 390, w: 520, h: 60 },
        { x: 740, y: 390, w: 440, h: 60 },
        { x: 1360, y: 390, w: 440, h: 60 },
        { x: 2000, y: 390, w: 420, h: 60 },
        { x: 2580, y: 390, w: 420, h: 60 }
      ];

      // Plataformas con 4 PLATAFORMAS MÓVILES (precisión y timing)
      this.platforms = [
        // Plataformas estáticas elevadas
        { x: 180, y: 310, w: 120, h: 22, type: 'crystal' },
        { x: 360, y: 240, w: 110, h: 22, type: 'crystal' },
        { x: 800, y: 280, w: 120, h: 22, type: 'crystal' },
        { x: 1400, y: 290, w: 120, h: 22, type: 'crystal' },
        { x: 2040, y: 280, w: 120, h: 22, type: 'crystal' },

        // PLATAFORMA MÓVIL 1 (horizontal sobre abismo 1: x 520 a 740)
        {
          x: 540, y: 310, w: 90, h: 22, type: 'crystal',
          isMoving: true, axis: 'x', minX: 530, maxX: 720,
          speedX: 1.8 * gradeSpeedScale, dirX: 1, vx: 0, vy: 0
        },

        // PLATAFORMA MÓVIL 2 (isla flotante vertical: y 170 a 320)
        {
          x: 1210, y: 300, w: 90, h: 22, type: 'crystal',
          isMoving: true, axis: 'y', minY: 170, maxY: 320,
          speedY: 1.6 * gradeSpeedScale, dirY: -1, vx: 0, vy: 0
        },

        // PLATAFORMA MÓVIL 3 (transporte cósmico horizontal: x 1800 a 2000)
        {
          x: 1810, y: 280, w: 90, h: 22, type: 'crystal',
          isMoving: true, axis: 'x', minX: 1800, maxX: 1980,
          speedX: 2.0 * gradeSpeedScale, dirX: 1, vx: 0, vy: 0
        },

        // PLATAFORMA MÓVIL 4 (ascensor vertical final hacia la nave)
        {
          x: 2440, y: 300, w: 85, h: 22, type: 'crystal',
          isMoving: true, axis: 'y', minY: 180, maxY: 310,
          speedY: 1.8 * gradeSpeedScale, dirY: -1, vx: 0, vy: 0
        }
      ];

      // Bloques misteriosos
      this.bumpBlocks = [
        { x: 380, y: 180, w: 42, h: 42, bumped: false, animOffsetY: 0, bumpTimer: 0 },
        { x: 1440, y: 230, w: 42, h: 42, bumped: false, animOffsetY: 0, bumpTimer: 0 }
      ];

      // Coleccionables estratégicos (Instrucciones, Programación, Algoritmos, Matemática)
      this.collectibles = [
        { id: 'c_flower', type: 'flower', cat: 'instrucciones', x: 200, y: 268, w: 36, h: 36, collected: false, icon: '🌸' },
        { id: 'c_mush1', type: 'mushroom', cat: 'programacion', x: 840, y: 238, w: 36, h: 36, collected: false, icon: '🍄' },
        { id: 'c_mush2', type: 'algo_chip', cat: 'algoritmos', x: 1420, y: 248, w: 36, h: 36, collected: false, icon: '🧩' },
        { id: 'c_batt', type: 'battery', cat: 'matematica', x: 2060, y: 238, w: 36, h: 36, collected: false, icon: '🔋' }
      ];

      // Enemigos extraterrestres (3 terrestres, 2 drones veloces)
      this.enemies = [
        { type: 'ground', x: 820, y: 350, w: 38, h: 40, minX: 750, maxX: 1040, speed: 2.0 * gradeSpeedScale, dir: 1, facing: 'right' },
        { type: 'ground', x: 1420, y: 350, w: 38, h: 40, minX: 1370, maxX: 1660, speed: 2.3 * gradeSpeedScale, dir: 1, facing: 'right' },
        { type: 'ground', x: 2080, y: 350, w: 38, h: 40, minX: 2020, maxX: 2320, speed: 2.5 * gradeSpeedScale, dir: 1, facing: 'right' },
        { type: 'drone', x: 1060, baseY: 180, y: 180, w: 42, h: 32, minX: 1000, maxX: 1260, speed: 2.4 * gradeSpeedScale, dir: 1, angle: 0 },
        { type: 'drone', x: 2660, baseY: 200, y: 200, w: 42, h: 32, minX: 2600, maxX: 2880, speed: 2.8 * gradeSpeedScale, dir: 1, angle: 2.0 }
      ];

      // Meta: Cohete intergaláctico reparado de Bity
      this.goal = { x: 2840, y: 230, w: 80, h: 160, type: 'spaceship' };
    }

    // Inicializar jugador Bity
    this.initPlayer();
  }

  initPlayer() {
    this.player = {
      x: 60,
      y: 342,
      w: 34,
      h: 46,
      vx: 0,
      vy: 0,
      speed: 4.2,
      jumpForce: -11.5,
      gravity: 0.55,
      grounded: false,
      ridingPlatform: null,
      facing: 'right',
      invulnerable: 0,
      walkFrame: 0
    };
  }

  // ========================================================
  // MONTAJE DEL DOM Y CONTROLES
  // ========================================================

  mount() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="bity-platformer-wrapper">
        <!-- HUD Superior con indicador de los 3 niveles -->
        <div class="bity-plat-hud">
          <div class="plat-hud-left">
            <button type="button" class="btn-plat-back" id="btn-plat-exit">
              <span>⬅️</span> ${this.isGradeOne ? 'VOLVER' : 'Volver'}
            </button>
            <button type="button" class="btn-plat-levels-nav" id="btn-plat-levels-modal">
              <span>🗺️</span> ${this.isGradeOne ? 'NIVELES' : 'Niveles'}
            </button>
            <div class="plat-hud-lives" id="plat-hud-lives-box" title="Vidas de Bity">
              <span class="plat-hud-label">${this.isGradeOne ? 'VIDAS:' : 'Vidas:'}</span>
              <span class="plat-hud-hearts" id="plat-hearts-display">❤️❤️❤️</span>
            </div>
          </div>

          <div class="plat-hud-center">
            <div class="plat-level-indicator-badge">
              <span class="plat-level-name-label" id="plat-hud-level-name">${this.levelName}</span>
              <div class="plat-level-steps-track" id="plat-level-steps-track">
                <span class="step-dot ${this.currentLevelIndex === 1 ? 'active' : (this.completedLevels.includes(1) ? 'done' : '')}">1</span>
                <span class="step-dot ${this.currentLevelIndex === 2 ? 'active' : (this.completedLevels.includes(2) ? 'done' : (this.unlockedLevel >= 2 ? 'unlocked' : 'locked'))}">2</span>
                <span class="step-dot ${this.currentLevelIndex === 3 ? 'active' : (this.completedLevels.includes(3) ? 'done' : (this.unlockedLevel >= 3 ? 'unlocked' : 'locked'))}">3</span>
              </div>
            </div>
            <div class="plat-hud-timer-box" id="plat-timer-container">
              <span class="plat-timer-icon">⏱️</span>
              <span class="plat-hud-timer-digits" id="plat-timer-digits">03:00</span>
            </div>
          </div>

          <div class="plat-hud-right">
            <div class="plat-hud-score">
              <span class="plat-score-icon">⭐</span>
              <span id="plat-score-val">${this.score}</span>
            </div>
            <div class="plat-hud-status-icons" id="plat-collectibles-status">
              <span id="badge-obj-flower" class="plat-badge-pending" title="Instrucciones">🌸</span>
              <span id="badge-obj-mushroom" class="plat-badge-pending" title="Programación">🍄</span>
              <span id="badge-obj-algo" class="plat-badge-pending" title="Algoritmos" style="${this.currentLevelIndex >= 2 ? '' : 'display:none;'}">🧩</span>
              <span id="badge-obj-battery" class="plat-badge-pending" title="Matemática">🔋</span>
            </div>
          </div>
        </div>

        <!-- Contenedor del Canvas -->
        <div class="bity-plat-canvas-container" id="plat-canvas-wrapper">
          <canvas id="bity-plat-canvas" width="800" height="450"></canvas>

          <!-- Modales superpuestos -->
          <div id="plat-modal-overlay" class="plat-modal-overlay" style="display: flex;">
            <div id="plat-modal-content" class="plat-modal-card">
              <!-- Contenido inyectado dinámicamente -->
            </div>
          </div>

          <!-- Controles táctiles para celulares y tablets -->
          <div class="plat-touch-controls" id="plat-touch-controls">
            <div class="plat-touch-left-group">
              <button type="button" class="plat-touch-btn" id="touch-btn-left" aria-label="Mover a la izquierda">
                ◀
              </button>
              <button type="button" class="plat-touch-btn" id="touch-btn-right" aria-label="Mover a la derecha">
                ▶
              </button>
            </div>
            <div class="plat-touch-right-group">
              <button type="button" class="plat-touch-btn plat-touch-btn-jump" id="touch-btn-jump" aria-label="Saltar">
                ⬆ ${this.isGradeOne ? 'SALTAR' : 'Saltar'}
              </button>
            </div>
          </div>
        </div>

        <!-- Barra inferior de ayuda de controles -->
        <div class="plat-controls-legend">
          <span>⌨️ <strong>${this.isGradeOne ? 'CONTROLES:' : 'Controles:'}</strong> ⬅️ / ➡️ o [A] / [D] para caminar · Espacio o ⬆️ o [W] para saltar</span>
        </div>
      </div>
    `;

    this.canvas = document.getElementById('bity-plat-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.modalOverlay = document.getElementById('plat-modal-overlay');
    this.modalContent = document.getElementById('plat-modal-content');

    // Botón volver
    const btnExit = document.getElementById('btn-plat-exit');
    if (btnExit) {
      btnExit.onclick = () => {
        this.destroy();
        this.onBack();
      };
    }

    // Botón selector de niveles
    const btnLevels = document.getElementById('btn-plat-levels-modal');
    if (btnLevels) {
      btnLevels.onclick = () => {
        this.showLevelSelectModal();
      };
    }

    // Vincular controles táctiles
    this.bindTouchControls();
  }

  bindTouchControls() {
    const bindTouch = (btn, onPress, onRelease) => {
      if (!btn || typeof btn.addEventListener !== 'function') return;
      const start = (e) => {
        e.preventDefault();
        onPress();
      };
      const end = (e) => {
        e.preventDefault();
        onRelease();
      };
      btn.addEventListener('touchstart', start, { passive: false });
      btn.addEventListener('touchend', end, { passive: false });
      btn.addEventListener('touchcancel', end, { passive: false });
      btn.addEventListener('mousedown', start);
      btn.addEventListener('mouseup', end);
      btn.addEventListener('mouseleave', end);
    };

    const bLeft = document.getElementById('touch-btn-left');
    const bRight = document.getElementById('touch-btn-right');
    const bJump = document.getElementById('touch-btn-jump');

    bindTouch(bLeft, () => { this.keys.left = true; }, () => { this.keys.left = false; });
    bindTouch(bRight, () => { this.keys.right = true; }, () => { this.keys.right = false; });
    bindTouch(bJump, () => {
      this.keys.jump = true;
      this.tryJump();
    }, () => {
      this.keys.jump = false;
    });
  }

  bindEvents() {
    this._onKeyDown = (e) => {
      if (this.isPausedForModal || this.isGameOver || !this.isRunning) return;

      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        this.keys.left = true;
        e.preventDefault();
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        this.keys.right = true;
        e.preventDefault();
      }
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) {
        if (!this.keys.jump) {
          this.tryJump();
        }
        this.keys.jump = true;
        e.preventDefault();
      }
    };

    this._onKeyUp = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) this.keys.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) this.keys.right = false;
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) this.keys.jump = false;
    };

    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      window.addEventListener('keydown', this._onKeyDown);
      window.addEventListener('keyup', this._onKeyUp);
    }
  }

  tryJump() {
    if (this.player && this.player.grounded && this.isRunning && !this.isPausedForModal) {
      this.player.vy = this.player.jumpForce;
      this.player.grounded = false;
      this.player.ridingPlatform = null;
      this.playSound('jump');
      this.createJumpParticles(this.player.x + this.player.w / 2, this.player.y + this.player.h);
    }
  }

  playSound(type) {
    if (this.onPlaySound) {
      try {
        this.onPlaySound(type);
      } catch (err) {
        console.warn('Sound error:', err);
      }
    }
  }

  // ========================================================
  // CRONÓMETRO GENERAL Y TEMPORIZADOR MATEMÁTICO
  // ========================================================

  startGlobalTimer() {
    this.stopGlobalTimer();

    this.globalTimerInterval = setInterval(() => {
      if (!this.isStarted || this.isGameOver || this.isVictory) return;

      if (this.timeRemaining > 0) {
        this.timeRemaining--;
        this.updateHud();

        if (this.timeRemaining === 0) {
          this.handleGlobalTimeout();
        }
      }
    }, 1000);
  }

  stopGlobalTimer() {
    if (this.globalTimerInterval) {
      clearInterval(this.globalTimerInterval);
      this.globalTimerInterval = null;
    }
  }

  handleGlobalTimeout() {
    this.stopGlobalTimer();
    this.stopMathTimer();
    this.isGameOver = true;
    this.isRunning = false;
    this.playSound('wrong');
    this.showDefeatScreen('time_out');
  }

  startMathTimer() {
    this.stopMathTimer();
    this.mathTimeRemaining = 30;
    this.updateMathTimerDisplay();

    this.mathTimerInterval = setInterval(() => {
      if (this.isGameOver || this.isVictory) {
        this.stopMathTimer();
        return;
      }

      if (this.mathTimeRemaining > 0) {
        this.mathTimeRemaining--;
        this.updateMathTimerDisplay();

        if (this.mathTimeRemaining === 0) {
          this.stopMathTimer();
          this.handleMathTimeout();
        }
      }
    }, 1000);
  }

  stopMathTimer() {
    if (this.mathTimerInterval) {
      clearInterval(this.mathTimerInterval);
      this.mathTimerInterval = null;
    }
  }

  updateMathTimerDisplay() {
    const bar = document.getElementById('plat-math-progress-bar');
    const digits = document.getElementById('plat-math-timer-digits');
    if (bar) {
      const pct = (this.mathTimeRemaining / 30) * 100;
      bar.style.width = `${pct}%`;
      if (this.mathTimeRemaining <= 7) {
        bar.style.backgroundColor = '#ef4444';
      } else if (this.mathTimeRemaining <= 15) {
        bar.style.backgroundColor = '#f59e0b';
      } else {
        bar.style.backgroundColor = '#10b981';
      }
    }
    if (digits) {
      digits.textContent = `${this.mathTimeRemaining}s`;
    }
  }

  handleMathTimeout() {
    this.hideModal();
    this.playSound('wrong');
    this.addFloatingText(this.player.x, this.player.y - 15, this.isGradeOne ? '¡TIEMPO AGOTADO! -1 VIDA' : '¡Tiempo agotado! -1 vida', '#ef4444');
    this.takeDamage('math_timeout');
  }

  // ========================================================
  // SISTEMA DE VIDAS, DAÑO Y REAPARICIÓN
  // ========================================================

  takeDamage(reason = 'enemy') {
    if (this.player.invulnerable > 0 || this.isGameOver || this.isVictory) {
      return;
    }

    this.lives--;
    this.updateHud();
    this.playSound('hit');

    // Partículas de impacto
    this.createSparkles(this.player.x + this.player.w / 2, this.player.y + this.player.h / 2, '#ef4444', 20);

    if (this.lives <= 0) {
      this.lives = 0;
      this.updateHud();
      this.isGameOver = true;
      this.isRunning = false;
      this.stopMathTimer();
      this.showDefeatScreen('lives_depleted');
      return;
    }

    // Período de invulnerabilidad (90 frames ~ 1.5s)
    this.player.invulnerable = 90;

    // Reaparecer en posición segura
    this.player.x = this.safeCheckpoint.x;
    this.player.y = this.safeCheckpoint.y;
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.grounded = false;
    this.player.ridingPlatform = null;

    // Resetear posiciones de patrulla de enemigos
    for (const en of this.enemies) {
      if (en.type === 'ground') {
        en.x = en.minX + 20;
        en.dir = 1;
        en.facing = 'right';
      } else if (en.type === 'drone') {
        en.x = en.minX + 20;
        en.dir = 1;
      }
    }

    this.addFloatingText(
      this.player.x,
      this.player.y - 20,
      this.isGradeOne ? `¡CUIDADO! TE QUEDAN ${this.lives} VIDAS` : `¡Cuidado! Te quedan ${this.lives} vidas`,
      '#f59e0b'
    );
  }

  // ========================================================
  // BUCLE PRINCIPAL DE JUEGO Y FÍSICA
  // ========================================================

  gameLoop(currentTime) {
    const dt = Math.min((currentTime - this.lastFrameTime) / 1000, 0.1);
    this.lastFrameTime = currentTime;

    if (this.isRunning && !this.isPausedForModal && !this.isGameOver && !this.isVictory) {
      this.updatePlatforms();
      this.updatePhysics();
      this.updateEnemies();
      this.updateParticles();
      this.updateCamera();
    }

    this.render();

    this.animationFrameId = requestAnimationFrame((t) => this.gameLoop(t));
  }

  /**
   * Actualiza el movimiento de las plataformas móviles (horizontal y vertical)
   */
  updatePlatforms() {
    for (const plat of this.platforms) {
      if (plat.isMoving) {
        if (plat.axis === 'x') {
          plat.vx = plat.speedX * plat.dirX;
          plat.x += plat.vx;
          if (plat.x >= plat.maxX) {
            plat.x = plat.maxX;
            plat.dirX = -1;
          } else if (plat.x <= plat.minX) {
            plat.x = plat.minX;
            plat.dirX = 1;
          }
        } else if (plat.axis === 'y') {
          plat.vy = plat.speedY * plat.dirY;
          plat.y += plat.vy;
          if (plat.y >= plat.maxY) {
            plat.y = plat.maxY;
            plat.dirY = -1;
          } else if (plat.y <= plat.minY) {
            plat.y = plat.minY;
            plat.dirY = 1;
          }
        }
      }
    }
  }

  updatePhysics() {
    const p = this.player;

    // Invulnerabilidad decreciente
    if (p.invulnerable > 0) {
      p.invulnerable--;
    }

    // Animación de rebote de los bloques golpeables
    for (const bb of this.bumpBlocks) {
      if (bb.bumpTimer > 0) {
        bb.bumpTimer--;
        bb.animOffsetY = -Math.sin((bb.bumpTimer / 12) * Math.PI) * 10;
        if (bb.bumpTimer === 0) {
          bb.animOffsetY = 0;
        }
      }
    }

    // Si Bity está sobre una plataforma móvil, desplazarse con ella
    if (p.grounded && p.ridingPlatform && p.ridingPlatform.isMoving) {
      if (p.ridingPlatform.axis === 'x') {
        p.x += p.ridingPlatform.vx;
      } else if (p.ridingPlatform.axis === 'y') {
        p.y += p.ridingPlatform.vy;
      }
    }

    // 1. Movimiento horizontal por teclado
    p.vx = 0;
    if (this.keys.left) {
      p.vx = -p.speed;
      p.facing = 'left';
      p.walkFrame += 0.25;
    }
    if (this.keys.right) {
      p.vx = p.speed;
      p.facing = 'right';
      p.walkFrame += 0.25;
    }

    // Gravedad
    p.vy += p.gravity;
    if (p.vy > 12) p.vy = 12;

    // Movimiento horizontal con colisión sólida
    const nextX = p.x + p.vx;
    let colX = false;

    if (nextX < 0) {
      p.x = 0;
      colX = true;
    }
    if (nextX + p.w > this.worldWidth) {
      p.x = this.worldWidth - p.w;
      colX = true;
    }

    if (!colX) {
      for (const plat of this.platforms) {
        if (plat.type === 'solid_brick') {
          if (
            nextX < plat.x + plat.w &&
            nextX + p.w > plat.x &&
            p.y < plat.y + plat.h &&
            p.y + p.h > plat.y
          ) {
            colX = true;
            break;
          }
        }
      }
      if (!colX) {
        p.x = nextX;
      }
    }

    // 2. Movimiento vertical con colisión
    const nextY = p.y + p.vy;
    p.grounded = false;
    let landedPlatform = null;

    // A) Colisión con el suelo (con pozos)
    for (const g of this.groundSegments) {
      if (p.x + p.w > g.x && p.x < g.x + g.w) {
        if (p.y + p.h <= g.y + 10 && nextY + p.h >= g.y) {
          p.y = g.y - p.h;
          p.vy = 0;
          p.grounded = true;
          landedPlatform = null;
          break;
        }
      }
    }

    // B) Colisión con plataformas flotantes y móviles (unidireccional desde arriba)
    if (!p.grounded) {
      for (const plat of this.platforms) {
        if (p.x + p.w > plat.x && p.x < plat.x + plat.w) {
          if (p.y + p.h <= plat.y + 12 && nextY + p.h >= plat.y && p.vy >= 0) {
            p.y = plat.y - p.h;
            p.vy = 0;
            p.grounded = true;
            landedPlatform = plat;
            break;
          }
        }
      }
    }

    // C) Colisión con los bloques golpeables desde abajo
    for (const bb of this.bumpBlocks) {
      if (p.x + p.w > bb.x && p.x < bb.x + bb.w) {
        // Aterrizar encima
        if (p.y + p.h <= bb.y + 10 && nextY + p.h >= bb.y && p.vy >= 0) {
          p.y = bb.y - p.h;
          p.vy = 0;
          p.grounded = true;
          landedPlatform = null;
        }
        // Golpear desde abajo con la cabeza
        else if (p.y >= bb.y + bb.h - 8 && nextY <= bb.y + bb.h && p.vy < 0) {
          p.y = bb.y + bb.h;
          p.vy = 1;
          this.triggerBumpBlock(bb);
        }
      }
    }

    p.ridingPlatform = landedPlatform;

    if (!p.grounded) {
      p.y = nextY;
    }

    // D) Detección de caída en pozo
    if (p.y > this.viewHeight + 35) {
      this.playSound('wrong');
      this.takeDamage('pit');
      return;
    }

    // E) Actualizar checkpoint seguro según avance de Bity
    if (p.grounded) {
      if (p.x > 2100) {
        this.safeCheckpoint = { x: 2120, y: 342 };
      } else if (p.x > 1400) {
        this.safeCheckpoint = { x: 1420, y: 342 };
      } else if (p.x > 760) {
        this.safeCheckpoint = { x: 780, y: 342 };
      }
    }

    // F) Interacción con coleccionables
    this.checkCollectibleCollisions();

    // G) Interacción con la meta
    this.checkGoalCollision();
  }

  triggerBumpBlock(bb) {
    bb.bumpTimer = 12;
    this.playSound('coin');

    if (!bb.bumped) {
      bb.bumped = true;
      this.score += 10;
      this.updateHud();

      this.createSparkles(bb.x + bb.w / 2, bb.y, '#ffd700', 18);
      this.addFloatingText(bb.x - 10, bb.y - 20, '+10 Moneda 🟡', '#ffd700');
    } else {
      this.createSparkles(bb.x + bb.w / 2, bb.y + bb.h, '#94a3b8', 6);
    }
  }

  checkCollectibleCollisions() {
    const p = this.player;

    for (const c of this.collectibles) {
      if (!c.collected) {
        if (
          p.x + p.w > c.x &&
          p.x < c.x + c.w &&
          p.y + p.h > c.y &&
          p.y < c.y + c.h
        ) {
          this.handleCollectiblePickup(c);
          break;
        }
      }
    }
  }

  handleCollectiblePickup(item) {
    item.collected = true;
    this.playSound('pop');
    this.createSparkles(item.x + item.w / 2, item.y + item.h / 2, '#38bdf8', 16);

    // Detener movimiento temporalmente
    this.isPausedForModal = true;
    this.keys.left = false;
    this.keys.right = false;
    this.keys.jump = false;
    this.player.vx = 0;

    // Seleccionar pregunta aleatoria del banco
    let cat = item.cat || 'instrucciones';
    if (item.type === 'flower') cat = 'instrucciones';
    else if (item.type === 'battery') cat = 'matematica';

    const questionObj = this.questionManager
      ? this.questionManager.getQuestion(this.grade, cat, this.currentLevelIndex)
      : null;

    if (item.type === 'battery') {
      this.showMathQuestionModal(questionObj, item);
    } else {
      this.showStandardQuestionModal(questionObj, item);
    }
  }

  checkGoalCollision() {
    const p = this.player;
    const g = this.goal;

    if (
      p.x + p.w > g.x &&
      p.x < g.x + g.w &&
      p.y + p.h > g.y &&
      p.y < g.y + g.h
    ) {
      this.triggerVictory();
    }
  }

  updateEnemies() {
    const p = this.player;

    for (const en of this.enemies) {
      if (en.type === 'ground') {
        en.x += en.speed * en.dir;
        if (en.x > en.maxX) {
          en.x = en.maxX;
          en.dir = -1;
          en.facing = 'left';
        } else if (en.x < en.minX) {
          en.x = en.minX;
          en.dir = 1;
          en.facing = 'right';
        }

        // Colisión con Bity
        if (
          p.x + p.w > en.x + 4 &&
          p.x < en.x + en.w - 4 &&
          p.y + p.h > en.y + 6 &&
          p.y < en.y + en.h
        ) {
          this.takeDamage('ground_enemy');
        }
      } else if (en.type === 'drone') {
        en.x += en.speed * en.dir;
        en.angle += 0.05;
        en.y = en.baseY + Math.sin(en.angle) * 26;

        if (en.x > en.maxX) {
          en.x = en.maxX;
          en.dir = -1;
        } else if (en.x < en.minX) {
          en.x = en.minX;
          en.dir = 1;
        }

        // Colisión con Bity
        if (
          p.x + p.w > en.x + 4 &&
          p.x < en.x + en.w - 4 &&
          p.y + p.h > en.y + 4 &&
          p.y < en.y + en.h - 4
        ) {
          this.takeDamage('flying_drone');
        }
      }
    }
  }

  updateCamera() {
    const targetCamX = this.player.x - this.viewWidth / 3;
    const maxCamX = this.worldWidth - this.viewWidth;
    this.cameraX = Math.max(0, Math.min(targetCamX, maxCamX));
  }

  updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const pt = this.particles[i];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.life -= 0.035;
      if (pt.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y -= 0.8;
      ft.alpha -= 0.025;
      if (ft.alpha <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }
  }

  createSparkles(x, y, color = '#38bdf8', count = 12) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
      const speed = Math.random() * 3 + 1.5;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        life: 1.0,
        size: Math.random() * 4 + 3
      });
    }
  }

  createJumpParticles(x, y) {
    for (let i = 0; i < 6; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 16,
        y: y - 2,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 1.5 + 0.5,
        color: '#94a3b8',
        life: 0.6,
        size: Math.random() * 3 + 2
      });
    }
  }

  addFloatingText(x, y, text, color = '#ffd700') {
    this.floatingTexts.push({
      x,
      y,
      text,
      color,
      alpha: 1.0
    });
  }

  // ========================================================
  // RENDERIZADO EN CANVAS Y TEMÁTICAS VISUALES
  // ========================================================

  render() {
    if (!this.ctx) return;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.viewWidth, this.viewHeight);

    ctx.save();
    ctx.translate(-Math.round(this.cameraX), 0);

    // 1. Fondo temático según nivel
    this.renderBackground(ctx);

    // 2. Suelo y pozos
    this.renderGround(ctx);

    // 3. Plataformas flotantes y móviles
    this.renderPlatforms(ctx);

    // 4. Bloques misteriosos
    this.renderBumpBlocks(ctx);

    // 5. Coleccionables
    this.renderCollectibles(ctx);

    // 6. Meta
    this.renderGoal(ctx);

    // 7. Enemigos
    this.renderEnemies(ctx);

    // 8. Jugador Bity
    this.renderBity(ctx);

    // 9. Partículas y textos flotantes
    this.renderEffects(ctx);

    ctx.restore();
  }

  renderBackground(ctx) {
    const sky = ctx.createLinearGradient(0, 0, 0, this.viewHeight);

    if (this.theme === 'valley') {
      // Nivel 1: Valle cibernético diurno
      sky.addColorStop(0, '#0f172a');
      sky.addColorStop(0.55, '#1e293b');
      sky.addColorStop(1, '#0284c7');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, this.worldWidth, this.viewHeight);

      // Colinas verdes suaves
      ctx.fillStyle = '#0369a1';
      for (let hx = -100; hx < this.worldWidth; hx += 320) {
        ctx.beginPath();
        ctx.moveTo(hx, 390);
        ctx.quadraticCurveTo(hx + 160, 260, hx + 320, 390);
        ctx.fill();
      }

      // Nubes cibernéticas blancas
      ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      for (let cx = 80; cx < this.worldWidth; cx += 360) {
        ctx.beginPath();
        ctx.arc(cx, 70, 26, 0, Math.PI * 2);
        ctx.arc(cx + 25, 65, 32, 0, Math.PI * 2);
        ctx.arc(cx + 52, 70, 24, 0, Math.PI * 2);
        ctx.fill();
      }

    } else if (this.theme === 'factory') {
      // Nivel 2: Fábrica mecánica industrial (óxido, cromo, tonos cálidos oscuros)
      sky.addColorStop(0, '#0c0a09');
      sky.addColorStop(0.6, '#1c1917');
      sky.addColorStop(1, '#78350f');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, this.worldWidth, this.viewHeight);

      // Vigas y tuberías industriales de fondo
      ctx.fillStyle = 'rgba(68, 64, 60, 0.45)';
      for (let bx = 0; bx < this.worldWidth; bx += 220) {
        ctx.fillRect(bx, 0, 18, 390);
        ctx.fillRect(bx - 30, 140, 80, 12);
      }

      // Engranajes gigantes de fondo
      ctx.fillStyle = 'rgba(217, 119, 6, 0.12)';
      for (let gx = 150; gx < this.worldWidth; gx += 450) {
        ctx.beginPath();
        ctx.arc(gx, 120, 65, 0, Math.PI * 2);
        ctx.fill();
      }

    } else {
      // Nivel 3: El planeta de Bity (cielo cósmico violeta, nebulosas, estrellas lejanas)
      sky.addColorStop(0, '#090514');
      sky.addColorStop(0.5, '#1e1b4b');
      sky.addColorStop(1, '#581c87');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, this.worldWidth, this.viewHeight);

      // Estrellas titilantes
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      for (let x = 30; x < this.worldWidth; x += 85) {
        const y = ((x * 47) % 220) + 15;
        ctx.fillRect(x, y, 2.5, 2.5);
      }

      // Nebulosa resplandeciente
      ctx.fillStyle = 'rgba(236, 72, 153, 0.15)';
      for (let nx = 200; nx < this.worldWidth; nx += 600) {
        ctx.beginPath();
        ctx.arc(nx, 100, 90, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cordillera de cristales alienígenas
      ctx.fillStyle = '#3b0764';
      for (let cx = -80; cx < this.worldWidth; cx += 260) {
        ctx.beginPath();
        ctx.moveTo(cx, 390);
        ctx.lineTo(cx + 80, 220);
        ctx.lineTo(cx + 160, 390);
        ctx.fill();
      }
    }
  }

  renderGround(ctx) {
    for (const g of this.groundSegments) {
      if (this.theme === 'valley') {
        // Césped cibernético verde
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(g.x, g.y, g.w, g.h);
        ctx.fillStyle = '#10b981';
        ctx.fillRect(g.x, g.y, g.w, 12);
        ctx.fillStyle = '#34d399';
        ctx.fillRect(g.x, g.y, g.w, 3);
      } else if (this.theme === 'factory') {
        // Superficie metálica con franja de seguridad amarilla/negra
        ctx.fillStyle = '#292524';
        ctx.fillRect(g.x, g.y, g.w, g.h);
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(g.x, g.y, g.w, 12);
        // Rayas de precaución
        ctx.fillStyle = '#0c0a09';
        for (let sx = g.x; sx < g.x + g.w; sx += 24) {
          ctx.beginPath();
          ctx.moveTo(sx, g.y);
          ctx.lineTo(sx + 10, g.y + 12);
          ctx.lineTo(sx + 18, g.y + 12);
          ctx.lineTo(sx + 8, g.y);
          ctx.fill();
        }
      } else {
        // Suelo alienígena violeta con borde de neón magenta
        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(g.x, g.y, g.w, g.h);
        ctx.fillStyle = '#a855f7';
        ctx.fillRect(g.x, g.y, g.w, 12);
        ctx.fillStyle = '#f472b6';
        ctx.fillRect(g.x, g.y, g.w, 3);
      }
    }
  }

  renderPlatforms(ctx) {
    for (const p of this.platforms) {
      ctx.save();
      if (p.isMoving) {
        // Plataforma móvil con indicación luminosa y flechas
        ctx.fillStyle = this.theme === 'factory' ? '#b45309' : (this.theme === 'alien_planet' ? '#7e22ce' : '#0284c7');
        ctx.fillRect(p.x, p.y, p.w, p.h);

        // Borde brillante pulsante
        ctx.fillStyle = '#facc15';
        ctx.fillRect(p.x, p.y, p.w, 4);

        // Flechas indicadoras de movimiento
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const arrow = p.axis === 'x' ? '↔️' : '↕️';
        ctx.fillText(arrow, p.x + p.w / 2, p.y + p.h / 2);

      } else if (p.type === 'solid_brick') {
        // Bloque sólido estilo Lego tech
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(p.x, p.y, p.w, 4);
        ctx.fillStyle = '#0369a1';
        ctx.fillRect(p.x + 8, p.y - 4, 10, 4);
        ctx.fillRect(p.x + 22, p.y - 4, 10, 4);

      } else {
        // Plataforma estándar
        const baseCol = this.theme === 'factory' ? '#44403c' : (this.theme === 'alien_planet' ? '#3b0764' : '#0f172a');
        const rimCol = this.theme === 'factory' ? '#f59e0b' : (this.theme === 'alien_planet' ? '#c084fc' : '#38bdf8');
        ctx.fillStyle = baseCol;
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.fillStyle = rimCol;
        ctx.fillRect(p.x, p.y, p.w, 4);
      }
      ctx.restore();
    }
  }

  renderBumpBlocks(ctx) {
    for (const bb of this.bumpBlocks) {
      const drawY = bb.y + bb.animOffsetY;
      ctx.save();
      if (!bb.bumped) {
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(bb.x, drawY, bb.w, bb.h);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(bb.x, drawY, bb.w, 4);
        ctx.fillStyle = '#b45309';
        ctx.fillRect(bb.x, drawY + bb.h - 4, bb.w, 4);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px Fredoka, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('?', bb.x + bb.w / 2, drawY + bb.h / 2);
      } else {
        ctx.fillStyle = '#475569';
        ctx.fillRect(bb.x, drawY, bb.w, bb.h);
        ctx.fillStyle = '#64748b';
        ctx.fillRect(bb.x, drawY, bb.w, 4);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('⭐', bb.x + bb.w / 2, drawY + bb.h / 2);
      }
      ctx.restore();
    }
  }

  renderCollectibles(ctx) {
    for (const c of this.collectibles) {
      if (!c.collected) {
        const bobOffset = Math.sin(Date.now() / 200 + c.x) * 4;
        const cy = c.y + bobOffset;

        ctx.save();
        ctx.font = '28px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.shadowBlur = 12;
        ctx.shadowColor = c.type === 'flower' ? '#ec4899' : (c.type === 'mushroom' ? '#eab308' : '#22c55e');

        ctx.fillText(c.icon, c.x + c.w / 2, cy + c.h / 2);
        ctx.restore();
      }
    }
  }

  renderGoal(ctx) {
    const g = this.goal;
    ctx.save();

    if (g.type === 'spaceship') {
      // Cohete espacial de Bity (Nivel 3)
      const pulse = Math.sin(Date.now() / 150) * 4;
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.roundRect(g.x + 10, g.y + 20, 50, 100, 15);
      ctx.fill();

      // Cúpula / Punta roja del cohete
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(g.x + 35, g.y - 15);
      ctx.lineTo(g.x + 60, g.y + 20);
      ctx.lineTo(g.x + 10, g.y + 20);
      ctx.fill();

      // Ventana circular de la nave
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(g.x + 35, g.y + 50, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(g.x + 35, g.y + 50, 8, 0, Math.PI * 2);
      ctx.fill();

      // Fuego de los propulsores
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(g.x + 20, g.y + 120);
      ctx.lineTo(g.x + 35, g.y + 145 + pulse);
      ctx.lineTo(g.x + 50, g.y + 120);
      ctx.fill();

      // Letrero NAVE DE BITY
      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 13px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(this.isGradeOne ? 'NAVE ESPACIAL' : 'Nave Espacial', g.x + 35, g.y - 25);

    } else if (g.type === 'airlock') {
      // Compuerta de extracción de fábrica (Nivel 2)
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(g.x, g.y + 20, g.w, g.h - 20);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(g.x + 8, g.y + 28, g.w - 16, g.h - 36);

      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🚪', g.x + g.w / 2, g.y + 70);

      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 12px Fredoka, sans-serif';
      ctx.fillText(this.isGradeOne ? 'SALIDA' : 'Salida', g.x + g.w / 2, g.y + 12);

    } else {
      // Plataforma con bandera (Nivel 1)
      ctx.fillStyle = '#334155';
      ctx.fillRect(g.x - 10, g.y + g.h - 16, g.w + 20, 16);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(g.x - 10, g.y + g.h - 16, g.w + 20, 4);

      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(g.x + 16, g.y + 20, 6, g.h - 36);

      const wave = Math.sin(Date.now() / 250) * 4;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.moveTo(g.x + 22, g.y + 20);
      ctx.lineTo(g.x + 65 + wave, g.y + 35);
      ctx.lineTo(g.x + 22, g.y + 50);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🏁', g.x + 40, g.y + 38);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 14px Fredoka, sans-serif';
      ctx.fillText(this.isGradeOne ? 'META' : 'Meta', g.x + 20, g.y + 10);
    }

    ctx.restore();
  }

  renderEnemies(ctx) {
    for (const en of this.enemies) {
      if (en.type === 'ground') {
        ctx.save();
        ctx.translate(en.x, en.y);
        if (en.facing === 'left') {
          ctx.scale(-1, 1);
          ctx.translate(-en.w, 0);
        }

        const bodyColor = this.theme === 'alien_planet' ? '#7e22ce' : (this.theme === 'factory' ? '#b45309' : '#dc2626');
        const eyeColor = this.theme === 'alien_planet' ? '#38bdf8' : '#fef08a';

        ctx.fillStyle = bodyColor;
        ctx.fillRect(4, 12, 30, 20);
        ctx.fillStyle = eyeColor;
        ctx.fillRect(20, 16, 10, 4);

        ctx.fillStyle = '#1e293b';
        ctx.fillRect(2, 32, 34, 8);
        ctx.fillStyle = '#64748b';
        for (let wx = 6; wx < 32; wx += 8) {
          ctx.fillRect(wx, 34, 4, 4);
        }

        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(16, 4, 3, 8);
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.arc(17.5, 4, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

      } else if (en.type === 'drone') {
        ctx.save();
        ctx.translate(en.x, en.y);

        const propOffset = Math.sin(Date.now() / 30) * 8;
        ctx.fillStyle = '#64748b';
        ctx.fillRect(4 - propOffset / 2, 2, 12 + propOffset, 3);
        ctx.fillRect(26 - propOffset / 2, 2, 12 + propOffset, 3);

        const droneColor = this.theme === 'alien_planet' ? '#9333ea' : (this.theme === 'factory' ? '#d97706' : '#4f46e5');
        ctx.fillStyle = droneColor;
        ctx.beginPath();
        ctx.roundRect(4, 10, 34, 18, 6);
        ctx.fill();

        ctx.fillStyle = '#ef4444';
        ctx.fillRect(18, 15, 6, 4);

        ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
        ctx.fillRect(16, 28, 10, 50);

        ctx.restore();
      }
    }
  }

  renderBity(ctx) {
    const p = this.player;

    ctx.save();
    ctx.translate(p.x, p.y);

    if (p.invulnerable > 0 && Math.floor(Date.now() / 80) % 2 === 0) {
      ctx.globalAlpha = 0.4;
    }

    if (p.facing === 'left') {
      ctx.scale(-1, 1);
      ctx.translate(-p.w, 0);
    }

    // 1. Antena
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(15, 0, 4, 8);
    const glow = Math.sin(Date.now() / 150) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(250, 204, 21, ${glow})`;
    ctx.beginPath();
    ctx.arc(17, 2, 4, 0, Math.PI * 2);
    ctx.fill();

    // 2. Cabeza robótica
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.roundRect(4, 8, 26, 18, 6);
    ctx.fill();

    // Visor
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(7, 11, 20, 11, 3);
    ctx.fill();

    // Ojos LED cyan
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(11, 14, 4, 5);
    ctx.fillRect(19, 14, 4, 5);

    // 3. Torso
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.roundRect(5, 26, 24, 13, 4);
    ctx.fill();

    // Núcleo energético central
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(14, 29, 6, 6);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(15, 30, 4, 4);

    // 4. Piernas / Orugas animadas
    const legSwing = p.grounded ? Math.sin(p.walkFrame) * 4 : 2;
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(8, 39, 6, 7 + legSwing);
    ctx.fillRect(20, 39, 6, 7 - legSwing);

    ctx.restore();
  }

  renderEffects(ctx) {
    for (const pt of this.particles) {
      ctx.save();
      ctx.globalAlpha = pt.life;
      ctx.fillStyle = pt.color;
      ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
      ctx.restore();
    }

    for (const ft of this.floatingTexts) {
      ctx.save();
      ctx.globalAlpha = ft.alpha;
      ctx.font = 'bold 15px Fredoka, sans-serif';
      ctx.fillStyle = ft.color;
      ctx.shadowColor = 'rgba(0,0,0,0.85)';
      ctx.shadowBlur = 4;
      ctx.textAlign = 'center';
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    }
  }

  // ========================================================
  // HUD Y ACTUALIZACIONES DE ESTADO
  // ========================================================

  updateHud() {
    // Vidas
    const heartsEl = document.getElementById('plat-hearts-display');
    if (heartsEl) {
      heartsEl.textContent = '❤️'.repeat(this.lives) + '🖤'.repeat(this.maxLives - this.lives);
    }

    // Cronómetro general
    const timerDigits = document.getElementById('plat-timer-digits');
    const timerBox = document.getElementById('plat-timer-container');
    if (timerDigits) {
      const min = Math.floor(this.timeRemaining / 60);
      const sec = this.timeRemaining % 60;
      timerDigits.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }
    if (timerBox) {
      if (this.timeRemaining <= 15) {
        timerBox.className = 'plat-hud-timer-box timer-danger';
      } else if (this.timeRemaining <= 45) {
        timerBox.className = 'plat-hud-timer-box timer-warning';
      } else {
        timerBox.className = 'plat-hud-timer-box';
      }
    }

    // Puntaje
    const scoreVal = document.getElementById('plat-score-val');
    if (scoreVal) {
      scoreVal.textContent = this.score;
    }

    // Nombre del nivel y pasos
    const nameEl = document.getElementById('plat-hud-level-name');
    if (nameEl) {
      nameEl.textContent = this.levelName;
    }

    const stepsTrack = document.getElementById('plat-level-steps-track');
    if (stepsTrack) {
      stepsTrack.innerHTML = `
        <span class="step-dot ${this.currentLevelIndex === 1 ? 'active' : (this.completedLevels.includes(1) ? 'done' : '')}">1</span>
        <span class="step-dot ${this.currentLevelIndex === 2 ? 'active' : (this.completedLevels.includes(2) ? 'done' : (this.unlockedLevel >= 2 ? 'unlocked' : 'locked'))}">2</span>
        <span class="step-dot ${this.currentLevelIndex === 3 ? 'active' : (this.completedLevels.includes(3) ? 'done' : (this.unlockedLevel >= 3 ? 'unlocked' : 'locked'))}">3</span>
      `;
    }

    // Badges de coleccionables
    const bFlower = document.getElementById('badge-obj-flower');
    const bMushroom = document.getElementById('badge-obj-mushroom');
    const bAlgo = document.getElementById('badge-obj-algo');
    const bBattery = document.getElementById('badge-obj-battery');

    if (bFlower) bFlower.className = this.questionsAnswered.flower ? 'plat-badge-done' : 'plat-badge-pending';
    if (bMushroom) bMushroom.className = this.questionsAnswered.mushroom ? 'plat-badge-done' : 'plat-badge-pending';
    if (bAlgo) {
      if (this.currentLevelIndex >= 2) {
        bAlgo.style.display = 'inline-flex';
        bAlgo.className = this.questionsAnswered.mushroom2 ? 'plat-badge-done' : 'plat-badge-pending';
      } else {
        bAlgo.style.display = 'none';
      }
    }
    if (bBattery) bBattery.className = this.questionsAnswered.math ? 'plat-badge-done' : 'plat-badge-pending';
  }

  // ========================================================
  // GESTIÓN DE MODALES: BRIEFING, SELECTOR, PREGUNTAS Y VICTORIAS
  // ========================================================

  showModal(htmlContent) {
    if (!this.modalOverlay || !this.modalContent) return;
    this.modalContent.innerHTML = htmlContent;
    this.modalOverlay.style.display = 'flex';
  }

  hideModal() {
    if (!this.modalOverlay) return;
    this.modalOverlay.style.display = 'none';
    this.isPausedForModal = false;
  }

  showBriefingModal() {
    this.isPausedForModal = true;
    this.isRunning = false;

    const title = this.isGradeOne
      ? `🎮 NIVEL ${this.currentLevelIndex}: ${this.levelName.toUpperCase()}`
      : `🎮 Nivel ${this.currentLevelIndex}: ${this.levelName}`;

    let levelGoalDesc = '';
    if (this.currentLevelIndex === 1) {
      levelGoalDesc = this.isGradeOne
        ? '¡APRENDÉ A CONTROLAR A BITY! SALTÁ LOS PRIMEROS POZOS Y RESPONDÉ LAS PREGUNTAS PARA LLEGAR A LA META.'
        : '¡Familiarizate con los controles! Saltá las plataformas, esquivá al robot y respondé las preguntas.';
    } else if (this.currentLevelIndex === 2) {
      levelGoalDesc = this.isGradeOne
        ? '¡LA FÁBRICA MECÁNICA EXIGE MÁS ATENCIÓN! SUBITE A LAS PLATAFORMAS MÓVILES Y CUIDÁ TUS VIDAS.'
        : '¡Mayor desafío! Calculá tus saltos sobre las plataformas móviles y anticipá los movimientos de los drones.';
    } else {
      levelGoalDesc = this.isGradeOne
        ? '¡EL DESAFÍO CUMBRE! RECORRÉ EL PLANETA DE BITY, SUPERÁ TODOS LOS PELIGROS Y REPARÁ SU NAVE ESPACIAL.'
        : '¡Misión final! Superá los saltos de precisión y resolvé las preguntas más exigentes para despegar.';
    }

    const html = `
      <div class="plat-briefing-card">
        <div class="plat-briefing-icon">${this.currentLevelIndex === 3 ? '🚀' : (this.currentLevelIndex === 2 ? '🏭' : '🌿')} 🤖</div>
        <h2 class="plat-modal-title">${title}</h2>
        <p class="plat-briefing-desc">${levelGoalDesc}</p>

        <div class="plat-rules-grid">
          <div class="plat-rule-item">
            <span class="plat-rule-icon">❤️</span>
            <div>
              <strong>${this.isGradeOne ? '3 VIDAS' : '3 Vidas'}</strong>
              <p>${this.isGradeOne ? 'CUIDÁ A BITY DE LOS POZOS Y ENEMIGOS.' : 'Cuidá a Bity de los peligros del escenario.'}</p>
            </div>
          </div>
          <div class="plat-rule-item">
            <span class="plat-rule-icon">⏱️</span>
            <div>
              <strong>${this.isGradeOne ? '3 MINUTOS' : '3 Minutos'}</strong>
              <p>${this.isGradeOne ? 'EL TIEMPO COMIENZA AL TOCAR EL BOTÓN VERDE.' : 'El cronómetro comenzará al iniciar la misión.'}</p>
            </div>
          </div>
          <div class="plat-rule-item">
            <span class="plat-rule-icon">🎯</span>
            <div>
              <strong>${this.isGradeOne ? 'PREGUNTAS VARIADAS' : 'Preguntas Dinámicas'}</strong>
              <p>${this.isGradeOne ? 'RECOGÉ OBJETOS PARA RESPONDER EJERCICIOS.' : 'Banco aleatorio de preguntas según tu grado.'}</p>
            </div>
          </div>
        </div>

        <div class="plat-actions-row">
          <button type="button" class="btn-plat-start" id="btn-start-platformer-mission">
            🚀 ${this.isGradeOne ? '¡COMENZAR NIVEL!' : '¡Comenzar nivel!'}
          </button>
          <button type="button" class="btn-plat-replay" id="btn-open-levels-menu" style="background:#475569;">
            🗺️ ${this.isGradeOne ? 'VER NIVELES' : 'Ver niveles'}
          </button>
        </div>
      </div>
    `;

    this.showModal(html);

    const btnStart = document.getElementById('btn-start-platformer-mission');
    if (btnStart) {
      btnStart.onclick = () => {
        this.playSound('fanfare');
        this.isStarted = true;
        this.isRunning = true;
        this.hideModal();
        this.startGlobalTimer();
      };
    }

    const btnLevels = document.getElementById('btn-open-levels-menu');
    if (btnLevels) {
      btnLevels.onclick = () => {
        this.showLevelSelectModal();
      };
    }
  }

  showLevelSelectModal() {
    this.isPausedForModal = true;
    this.isRunning = false;

    const modalTitle = this.isGradeOne ? '🗺️ SELECCIÓN DE NIVELES' : '🗺️ Selección de Niveles';

    const levelsInfo = [
      {
        num: 1,
        name: this.isGradeOne ? 'NIVEL 1: EL VALLE DE LOS ROBOTS' : 'Nivel 1: El valle de los robots',
        icon: '🌿',
        desc: this.isGradeOne ? 'APRENDIZAJE Y FAMILIARIZACIÓN' : 'Aprendizaje y familiarización inicial'
      },
      {
        num: 2,
        name: this.isGradeOne ? 'NIVEL 2: LA FÁBRICA MECÁNICA' : 'Nivel 2: La fábrica mecánica',
        icon: '🏭',
        desc: this.isGradeOne ? 'PLATAFORMAS MÓVILES Y MÁS ENEMIGOS' : 'Plataformas móviles y desafíos industriales'
      },
      {
        num: 3,
        name: this.isGradeOne ? 'NIVEL 3: EL PLANETA DE BITY' : 'Nivel 3: El planeta de Bity',
        icon: '🚀',
        desc: this.isGradeOne ? 'DESAFÍO FINAL Y NAVE ESPACIAL' : 'Desafío final con precisión y nave estelar'
      }
    ];

    let cardsHtml = '';
    for (const lvl of levelsInfo) {
      const isUnlocked = lvl.num <= this.unlockedLevel;
      const isCompleted = this.completedLevels.includes(lvl.num);
      const isCurrent = lvl.num === this.currentLevelIndex;

      let badgeText = isCompleted ? '⭐ COMPLETADO' : (isUnlocked ? '🟢 DESBLOQUEADO' : '🔒 BLOQUEADO');
      if (!this.isGradeOne) {
        badgeText = isCompleted ? '⭐ Completado' : (isUnlocked ? '🟢 Desbloqueado' : '🔒 Bloqueado');
      }

      cardsHtml += `
        <div class="plat-lvl-select-card ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}" data-lvl="${lvl.num}">
          <div class="plat-lvl-card-top">
            <span class="plat-lvl-icon">${lvl.icon}</span>
            <span class="plat-lvl-status-tag ${isUnlocked ? 'tag-unlocked' : 'tag-locked'}">${badgeText}</span>
          </div>
          <h4 class="plat-lvl-title">${lvl.name}</h4>
          <p class="plat-lvl-desc">${lvl.desc}</p>
          <button type="button" class="btn-plat-play-lvl" ${isUnlocked ? '' : 'disabled'}>
            ${isUnlocked ? (this.isGradeOne ? 'JUGAR ESTE NIVEL' : 'Jugar este nivel') : '🔒 Bloqueado'}
          </button>
        </div>
      `;
    }

    const html = `
      <div class="plat-levels-modal-card">
        <h2 class="plat-modal-title">${modalTitle}</h2>
        <p class="plat-briefing-desc">${this.isGradeOne ? 'COMPLETÁ CADA NIVEL PARA DESBLOQUEAR EL SIGUIENTE:' : 'Completá cada nivel para desbloquear el siguiente:'}</p>

        <div class="plat-lvl-grid">
          ${cardsHtml}
        </div>

        <button type="button" class="btn-plat-replay" id="btn-close-levels-modal" style="margin-top:16px;">
          ⬅️ ${this.isGradeOne ? 'VOLVER A LA PARTIDA' : 'Volver a la partida'}
        </button>
      </div>
    `;

    this.showModal(html);

    const cards = this.modalContent.querySelectorAll('.plat-lvl-select-card.unlocked');
    cards.forEach(card => {
      card.onclick = () => {
        const lvlNum = parseInt(card.getAttribute('data-lvl'));
        if (lvlNum && lvlNum <= this.unlockedLevel) {
          this.switchLevel(lvlNum);
        }
      };
    });

    const btnClose = document.getElementById('btn-close-levels-modal');
    if (btnClose) {
      btnClose.onclick = () => {
        if (this.isStarted && !this.isGameOver && !this.isVictory) {
          this.hideModal();
          this.isRunning = true;
        } else {
          this.showBriefingModal();
        }
      };
    }
  }

  switchLevel(levelNum) {
    this.stopGlobalTimer();
    this.stopMathTimer();
    this.loadLevelConfig(levelNum);
    this.mount();
    this.updateHud();
    this.showBriefingModal();
  }

  showStandardQuestionModal(questionObj, item) {
    // Si no vino pregunta desde el banco, generar fallback de emergencia
    const q = questionObj || {
      id: 'fallback_q',
      question: this.isGradeOne ? '¿QUÉ ES UNA INSTRUCCIÓN?' : '¿Qué es una instrucción?',
      options: [
        { label: 'A', text: this.isGradeOne ? 'A. UNA ORDEN CLARA QUE DICE QUÉ HACER.' : 'A. Una orden clara que dice qué hacer.', isCorrect: true },
        { label: 'B', text: this.isGradeOne ? 'B. UN COLOR EN LA PANTALLA.' : 'B. Un color en la pantalla.', isCorrect: false },
        { label: 'C', text: this.isGradeOne ? 'C. UN CABLE APAGADO.' : 'C. Un cable apagado.', isCorrect: false }
      ],
      explanation: 'Una instrucción le indica a la computadora qué acción específica realizar.'
    };

    const badgeIcon = (typeof item === 'object' && item.icon)
      ? item.icon
      : (q.category === 'algoritmos' ? '🧩' : (q.category === 'programacion' ? '🍄' : '🌸'));

    const catLabel = q.category === 'algoritmos'
      ? (this.isGradeOne ? 'ALGORITMOS' : 'Algoritmos')
      : (q.category === 'programacion'
        ? (this.isGradeOne ? 'PROGRAMACIÓN' : 'Programación')
        : (this.isGradeOne ? 'INSTRUCCIONES' : 'Instrucciones'));

    const html = `
      <div class="plat-question-card">
        <div class="plat-q-header">
          <span class="plat-q-badge">${badgeIcon} ${catLabel} · ${this.isGradeOne ? `GRADO ${this.grade}` : `${this.grade}.° Grado`}</span>
          <span style="font-size:0.85rem; color:#94a3b8;">${this.isGradeOne ? `NIVEL ${this.currentLevelIndex}` : `Nivel ${this.currentLevelIndex}`}</span>
        </div>
        <p class="plat-q-enunciado">${q.question}</p>

        <div class="plat-q-options">
          ${q.options.map(opt => `
            <button type="button" class="plat-opt-btn" data-correct="${opt.isCorrect}">
              ${opt.text}
            </button>
          `).join('')}
        </div>
        <div id="plat-q-feedback" class="plat-q-feedback"></div>
      </div>
    `;

    this.showModal(html);
    this.bindQuestionButtons(item, q);
  }

  showMathQuestionModal(questionObj, item) {
    const q = questionObj || {
      id: 'fallback_math',
      question: this.isGradeOne ? '¡CALCULÁ TU BATERÍA! ¿CUÁNTO ES 15 + 17 − 2?' : '¡Calculá tu batería! ¿Cuánto es 15 + 17 − 2?',
      options: [
        { label: 'A', text: 'A. 30', isCorrect: true },
        { label: 'B', text: 'B. 28', isCorrect: false },
        { label: 'C', text: 'C. 32', isCorrect: false }
      ],
      explanation: '15 más 17 es 32; menos 2 es igual a 30.'
    };

    const html = `
      <div class="plat-question-card plat-math-card">
        <div class="plat-q-header">
          <span class="plat-q-badge plat-q-badge-math">⚡ ${this.isGradeOne ? 'DESAFÍO MATEMÁTICO' : 'Desafío Matemático'}</span>
          <div class="plat-math-countdown-wrap">
            <span class="plat-math-timer-icon">⏳</span>
            <span id="plat-math-timer-digits" class="plat-math-timer-digits">30s</span>
          </div>
        </div>

        <div class="plat-math-progress-track">
          <div id="plat-math-progress-bar" class="plat-math-progress-bar"></div>
        </div>

        <p class="plat-q-enunciado" style="font-size:1.25rem; font-weight:bold; color:#0284c7; margin-top:10px;">${q.question}</p>

        <div class="plat-q-options">
          ${q.options.map(opt => `
            <button type="button" class="plat-opt-btn" data-correct="${opt.isCorrect}">
              ${opt.text}
            </button>
          `).join('')}
        </div>
        <div id="plat-q-feedback" class="plat-q-feedback"></div>
      </div>
    `;

    this.showModal(html);
    this.startMathTimer();
    this.bindQuestionButtons(item || 'battery', q);
  }

  bindQuestionButtons(item, qObj) {
    const btns = this.modalContent.querySelectorAll('.plat-opt-btn');
    const feedbackBox = document.getElementById('plat-q-feedback');

    const itemId = (typeof item === 'object') ? item.id : item;
    const itemType = (typeof item === 'object') ? item.type : item;
    const itemCat = (typeof item === 'object') ? item.cat : (qObj ? qObj.category : item);

    btns.forEach((btn) => {
      btn.onclick = () => {
        btns.forEach(b => b.disabled = true);
        const isCorrect = btn.getAttribute('data-correct') === 'true';

        if (itemType === 'battery' || itemCat === 'matematica') {
          this.stopMathTimer();
        }

        if (isCorrect) {
          btn.classList.add('opt-correct');
          this.playSound('coin');

          if (itemId === 'c_flower' || itemCat === 'instrucciones') this.questionsAnswered.flower = true;
          else if (itemId === 'c_mush2' || itemCat === 'algoritmos') this.questionsAnswered.mushroom2 = true;
          else if (itemId === 'c_mush' || itemId === 'c_mush1' || itemCat === 'programacion') this.questionsAnswered.mushroom = true;
          else if (itemId === 'c_batt' || itemCat === 'matematica' || itemType === 'battery') this.questionsAnswered.math = true;

          this.score += 20;
          this.updateHud();

          if (feedbackBox) {
            feedbackBox.className = 'plat-q-feedback feedback-correct';
            feedbackBox.innerHTML = this.isGradeOne
              ? `🎉 ¡CORRECTO! ${qObj && qObj.explanation ? qObj.explanation : ''}`
              : `🎉 ¡Correcto! ${qObj && qObj.explanation ? qObj.explanation : ''}`;
          }

          setTimeout(() => {
            this.hideModal();
          }, 1100);

        } else {
          btn.classList.add('opt-wrong');
          this.playSound('wrong');

          if (feedbackBox) {
            feedbackBox.className = 'plat-q-feedback feedback-wrong';
            feedbackBox.innerHTML = this.isGradeOne
              ? `❌ RESPUESTA INCORRECTA. -1 VIDA. ${qObj && qObj.explanation ? qObj.explanation : ''}`
              : `❌ Respuesta incorrecta. Perdés 1 vida. ${qObj && qObj.explanation ? qObj.explanation : ''}`;
          }

          setTimeout(() => {
            this.hideModal();
            this.takeDamage('wrong_answer');
          }, 1400);
        }
      };
    });
  }

  // ========================================================
  // VICTORIA DE NIVEL Y VICTORIA FINAL DE CAMPAÑA
  // ========================================================

  triggerVictory() {
    if (this.isVictory || this.isGameOver) return;
    this.isVictory = true;
    this.isRunning = false;
    this.stopGlobalTimer();
    this.stopMathTimer();
    this.playSound('fanfare');

    // Desbloquear siguiente nivel
    this.unlockNextLevel();

    const timeUsedSeconds = this.timeLimitSeconds - this.timeRemaining;
    const min = Math.floor(timeUsedSeconds / 60);
    const sec = timeUsedSeconds % 60;
    const timeFormatted = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

    const maxQuestions = this.currentLevelIndex >= 2 ? 4 : 3;
    const answeredCount = Object.values(this.questionsAnswered).filter(Boolean).length;

    if (this.currentLevelIndex < 3) {
      // ----------------------------------------------------
      // VICTORIA DE NIVEL INTERMEDIO (Nivel 1 o 2)
      // ----------------------------------------------------
      const nextLvlNum = this.currentLevelIndex + 1;
      const title = this.isGradeOne
        ? `🎉 ¡NIVEL ${this.currentLevelIndex} SUPERADO!`
        : `🎉 ¡Nivel ${this.currentLevelIndex} Superado!`;

      const msg = this.isGradeOne
        ? `¡EXCELENTE TRABAJO! COMPLETASTE ${this.levelName.toUpperCase()}. SE HA DESBLOQUEADO EL NIVEL ${nextLvlNum}.`
        : `¡Excelente trabajo! Completaste ${this.levelName}. Ya podés avanzar al Nivel ${nextLvlNum}.`;

      const html = `
        <div class="plat-victory-card">
          <div class="plat-victory-icon">⭐ 🚀</div>
          <h2 class="plat-modal-title plat-title-victory">${title}</h2>
          <p class="plat-victory-desc">${msg}</p>

          <div class="plat-stats-grid">
            <div class="plat-stat-box">
              <span class="plat-stat-icon">⏱️</span>
              <span class="plat-stat-val">${timeFormatted}</span>
              <span class="plat-stat-label">${this.isGradeOne ? 'TIEMPO' : 'Tiempo'}</span>
            </div>
            <div class="plat-stat-box">
              <span class="plat-stat-icon">❤️</span>
              <span class="plat-stat-val">${this.lives} / 3</span>
              <span class="plat-stat-label">${this.isGradeOne ? 'VIDAS' : 'Vidas'}</span>
            </div>
            <div class="plat-stat-box">
              <span class="plat-stat-icon">🎯</span>
              <span class="plat-stat-val">${answeredCount} / ${maxQuestions}</span>
              <span class="plat-stat-label">${this.isGradeOne ? 'PREGUNTAS' : 'Preguntas'}</span>
            </div>
            <div class="plat-stat-box">
              <span class="plat-stat-icon">⭐</span>
              <span class="plat-stat-val">${this.score} pts</span>
              <span class="plat-stat-label">${this.isGradeOne ? 'PUNTAJE' : 'Puntaje'}</span>
            </div>
          </div>

          <div class="plat-actions-row">
            <button type="button" class="btn-plat-finish" id="btn-next-level">
              ▶️ ${this.isGradeOne ? `JUGAR NIVEL ${nextLvlNum}` : `Jugar Nivel ${nextLvlNum}`}
            </button>
            <button type="button" class="btn-plat-replay" id="btn-victory-levels-menu">
              🗺️ ${this.isGradeOne ? 'VER NIVELES' : 'Ver niveles'}
            </button>
            <button type="button" class="btn-plat-start" id="btn-victory-replay-lvl" style="background:#334155;">
              🔄 ${this.isGradeOne ? 'REPETIR' : 'Repetir'}
            </button>
          </div>
        </div>
      `;

      this.showModal(html);

      const btnNext = document.getElementById('btn-next-level');
      if (btnNext) {
        btnNext.onclick = () => {
          this.switchLevel(nextLvlNum);
        };
      }

      const btnMenu = document.getElementById('btn-victory-levels-menu');
      if (btnMenu) {
        btnMenu.onclick = () => {
          this.showLevelSelectModal();
        };
      }

      const btnReplay = document.getElementById('btn-victory-replay-lvl');
      if (btnReplay) {
        btnReplay.onclick = () => {
          this.restartGame();
        };
      }

    } else {
      // ----------------------------------------------------
      // VICTORIA FINAL DE LA CAMPAÑA (Nivel 3 completado)
      // ----------------------------------------------------
      const victoryTitle = this.isGradeOne
        ? '🏆 ¡MISIÓN CUMPLIDA! ¡CAMPAÑA FINALIZADA!'
        : '🏆 ¡Misión Cumplida! ¡Campaña Finalizada!';

      const victoryMsg = this.isGradeOne
        ? '¡FELICITACIONES! AYUDASTE A BITY A SUPERAR EL VALLE, LA FÁBRICA Y SU PLANETA. SU COHETE ESTÁ COMPLETAMENTE REPARADO.'
        : '¡Felicitaciones! Has completado los 3 niveles del Desafío Final con éxito. Bity reparó su cohete y puede regresar a casa.';

      const html = `
        <div class="plat-victory-card plat-campaign-victory-card">
          <div class="plat-victory-icon">🏆 🛸 🌟</div>
          <h2 class="plat-modal-title plat-title-victory" style="font-size:1.8rem;">${victoryTitle}</h2>
          <p class="plat-victory-desc">${victoryMsg}</p>

          <div class="plat-stats-grid">
            <div class="plat-stat-box">
              <span class="plat-stat-icon">⏱️</span>
              <span class="plat-stat-val">${timeFormatted}</span>
              <span class="plat-stat-label">${this.isGradeOne ? 'TIEMPO FINAL' : 'Tiempo final'}</span>
            </div>
            <div class="plat-stat-box">
              <span class="plat-stat-icon">❤️</span>
              <span class="plat-stat-val">${this.lives} / 3</span>
              <span class="plat-stat-label">${this.isGradeOne ? 'VIDAS' : 'Vidas'}</span>
            </div>
            <div class="plat-stat-box">
              <span class="plat-stat-icon">🎯</span>
              <span class="plat-stat-val">${answeredCount} / ${maxQuestions}</span>
              <span class="plat-stat-label">${this.isGradeOne ? 'PREGUNTAS' : 'Preguntas'}</span>
            </div>
            <div class="plat-stat-box">
              <span class="plat-stat-icon">⭐</span>
              <span class="plat-stat-val">${this.score} pts</span>
              <span class="plat-stat-label">${this.isGradeOne ? 'PUNTOS' : 'Puntaje'}</span>
            </div>
          </div>

          <div class="plat-actions-row">
            <button type="button" class="btn-plat-finish" id="btn-plat-complete-campaign">
              🏆 ${this.isGradeOne ? 'FINALIZAR DESAFÍO' : 'Finalizar desafío'}
            </button>
            <button type="button" class="btn-plat-replay" id="btn-campaign-levels-menu" style="background:#475569;">
              🗺️ ${this.isGradeOne ? 'VER NIVELES' : 'Ver niveles'}
            </button>
            <button type="button" class="btn-plat-start" id="btn-plat-replay-campaign" style="background:#0284c7;">
              🔄 ${this.isGradeOne ? 'JUGAR DE NUEVO' : 'Jugar de nuevo'}
            </button>
          </div>
        </div>
      `;

      this.showModal(html);

      const btnFinish = document.getElementById('btn-plat-complete-campaign');
      if (btnFinish) {
        btnFinish.onclick = () => {
          this.destroy();
          this.onComplete({
            score: this.score,
            level: 3,
            timeUsed: timeUsedSeconds,
            livesRemaining: this.lives
          });
        };
      }

      const btnLevelsMenu = document.getElementById('btn-campaign-levels-menu');
      if (btnLevelsMenu) {
        btnLevelsMenu.onclick = () => {
          this.showLevelSelectModal();
        };
      }

      const btnReplay = document.getElementById('btn-plat-replay-campaign');
      if (btnReplay) {
        btnReplay.onclick = () => {
          this.switchLevel(1);
        };
      }
    }
  }

  showDefeatScreen(reason = 'lives_depleted') {
    this.isGameOver = true;
    this.isRunning = false;
    this.stopGlobalTimer();
    this.stopMathTimer();

    let reasonText = '';
    if (reason === 'time_out') {
      reasonText = this.isGradeOne
        ? '¡SE AGOTARON LOS 3 MINUTOS DEL NIVEL! DEBÉS RECORRER EL ESCENARIO MÁS RÁPIDO.'
        : '¡Se agotaron los 3 minutos del nivel! Planificá más rápido tu recorrido.';
    } else {
      reasonText = this.isGradeOne
        ? '¡SE AGOTARON LAS TRES VIDAS! BITY NECESITA REPARAR SU SISTEMA Y VOLVER A PROBAR.'
        : '¡Se agotaron las tres vidas! Bity necesita recuperar energía para volver a intentarlo.';
    }

    const html = `
      <div class="plat-defeat-card">
        <div class="plat-defeat-icon">🤖 💔</div>
        <h2 class="plat-modal-title plat-title-defeat">
          ${this.isGradeOne ? '¡INTENTO NO COMPLETADO!' : '¡Intento no completado!'}
        </h2>
        <p class="plat-defeat-desc">${reasonText}</p>

        <div class="plat-actions-row">
          <button type="button" class="btn-plat-restart" id="btn-plat-retry-game">
            🔄 ${this.isGradeOne ? 'REINTENTAR NIVEL' : 'Reintentar nivel'}
          </button>
          <button type="button" class="btn-plat-replay" id="btn-defeat-levels-menu" style="background:#475569;">
            🗺️ ${this.isGradeOne ? 'VER NIVELES' : 'Ver niveles'}
          </button>
          <button type="button" class="btn-plat-start" id="btn-defeat-exit-game" style="background:#334155;">
            🚪 ${this.isGradeOne ? 'SALIR' : 'Salir'}
          </button>
        </div>
      </div>
    `;

    this.showModal(html);

    const btnRetry = document.getElementById('btn-plat-retry-game');
    if (btnRetry) {
      btnRetry.onclick = () => this.restartGame();
    }

    const btnMenu = document.getElementById('btn-defeat-levels-menu');
    if (btnMenu) {
      btnMenu.onclick = () => this.showLevelSelectModal();
    }

    const btnExit = document.getElementById('btn-defeat-exit-game');
    if (btnExit) {
      btnExit.onclick = () => {
        this.destroy();
        this.onBack();
      };
    }
  }

  restartGame() {
    this.hideModal();
    this.lives = this.maxLives;
    this.timeRemaining = this.timeLimitSeconds;
    this.score = 0;
    this.isGameOver = false;
    this.isVictory = false;
    this.isPausedForModal = false;

    // Resetear checkpoint seguro y jugador
    this.safeCheckpoint = { x: 60, y: 342 };
    this.initPlayer();

    // Resetear bloques misteriosos y coleccionables del nivel actual
    for (const bb of this.bumpBlocks) {
      bb.bumped = false;
      bb.animOffsetY = 0;
      bb.bumpTimer = 0;
    }

    for (const c of this.collectibles) {
      c.collected = false;
    }
    this.questionsAnswered = {
      flower: false,
      mushroom: false,
      mushroom2: false,
      math: false
    };

    // Resetear posiciones iniciales de enemigos
    for (const en of this.enemies) {
      if (en.type === 'ground') {
        en.x = en.minX + 20;
        en.dir = 1;
        en.facing = 'right';
      } else if (en.type === 'drone') {
        en.x = en.minX + 20;
        en.dir = 1;
      }
    }

    this.particles = [];
    this.floatingTexts = [];
    this.updateHud();

    this.isStarted = true;
    this.isRunning = true;
    this.startGlobalTimer();
  }

  // ========================================================
  // LIMPIEZA
  // ========================================================

  destroy() {
    this.isRunning = false;
    this.isStarted = false;
    this.stopGlobalTimer();
    this.stopMathTimer();

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (typeof window !== 'undefined' && typeof window.removeEventListener === 'function') {
      if (this._onKeyDown) {
        window.removeEventListener('keydown', this._onKeyDown);
        this._onKeyDown = null;
      }
      if (this._onKeyUp) {
        window.removeEventListener('keyup', this._onKeyUp);
        this._onKeyUp = null;
      }
    }
  }
}

// Exportar globalmente
window.BityPlatformerGame = BityPlatformerGame;
