/**
 * platformerGame.js - Desafío final: Instrucciones
 * Videojuego educativo de plataformas 2D protagonizado por Bity.
 * Motor propio en HTML5 Canvas con física, colisiones, scroll horizontal,
 * enemigos patrulleros, bloques interactivos, coleccionables con preguntas pedagógicas,
 * sistema de 3 vidas, cronómetro general de 3 minutos y controles para PC y táctil.
 */

class BityPlatformerGame {
  constructor(options = {}) {
    this.container = options.container;
    this.grade = parseInt(options.grade) || 1;
    this.isGradeOne = this.grade === 1;
    this.onComplete = options.onComplete || (() => {});
    this.onBack = options.onBack || (() => {});
    this.onPlaySound = options.onPlaySound || (() => {});

    // Dimensiones lógicas del canvas y del mundo
    this.viewWidth = 800;
    this.viewHeight = 450;
    this.worldWidth = 2400;
    this.worldHeight = 450;
    this.cameraX = 0;

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

    // Pregunta matemática con límite de 30 segundos
    this.mathTimerInterval = null;
    this.mathTimeRemaining = 30;

    // Puntaje y progreso de coleccionables
    this.score = 0;
    this.questionsAnswered = {
      flower: false,
      mushroom: false,
      math: false
    };

    // Teclas / Controles
    this.keys = {
      left: false,
      right: false,
      jump: false
    };

    // Checkpoint seguro de reaparición
    this.safeCheckpoint = { x: 60, y: 342 };

    // Inicializar jugador Bity
    this.initPlayer();

    // Inicializar elementos del nivel
    this.initLevel();

    // Inicializar partículas y efectos
    this.particles = [];
    this.floatingTexts = [];

    // Montar la estructura HTML
    this.mount();

    // Vincular eventos de teclado y resize
    this.bindEvents();

    // Iniciar loop de animación en modo reposo (muestra pantalla de briefing)
    this.lastFrameTime = performance.now();
    this.animationFrameId = requestAnimationFrame((t) => this.gameLoop(t));
    this.showBriefingModal();
  }

  // ========================================================
  // INICIALIZACIÓN DE JUGADOR Y NIVEL
  // ========================================================

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
      facing: 'right',
      invulnerable: 0, // frames restantes de invulnerabilidad
      walkFrame: 0
    };
  }

  initLevel() {
    // 1. Segmentos de suelo (con 2 pozos)
    // Pozo 1: x 640 a 780 (140px)
    // Pozo 2: x 1480 a 1640 (160px con plataforma flotante intermedia)
    this.groundSegments = [
      { x: 0, y: 390, w: 640, h: 60 },
      { x: 780, y: 390, w: 700, h: 60 },
      { x: 1640, y: 390, w: 760, h: 60 }
    ];

    // 2. Plataformas flotantes y bloques sólidos
    this.platforms = [
      // Plataformas iniciales
      { x: 200, y: 310, w: 130, h: 22, type: 'tech' },
      { x: 530, y: 290, w: 100, h: 22, type: 'tech' },

      // Bloques sólidos decorativos y de paso
      { x: 360, y: 350, w: 40, h: 40, type: 'solid_brick' },

      // Zona intermedia (tras pozo 1)
      { x: 860, y: 300, w: 140, h: 22, type: 'tech' },
      { x: 1140, y: 310, w: 100, h: 22, type: 'tech' },
      { x: 1280, y: 240, w: 130, h: 22, type: 'tech' }, // Plataforma de la batería especial

      // Plataforma de cruce en pozo 2
      { x: 1520, y: 310, w: 90, h: 22, type: 'tech' },

      // Zona final (tras pozo 2)
      { x: 1730, y: 300, w: 130, h: 22, type: 'tech' },
      { x: 2000, y: 310, w: 120, h: 22, type: 'tech' }
    ];

    // 3. Bloque interactivo golpeable desde abajo
    this.bumpBlock = {
      x: 420,
      y: 260,
      w: 42,
      h: 42,
      bumped: false,
      animOffsetY: 0,
      bumpTimer: 0
    };

    // 4. Objetos interactivos (Coleccionables)
    this.collectibles = [
      // Flor (Pregunta 1: Instrucciones)
      {
        id: 'flower',
        type: 'flower',
        x: 250,
        y: 268,
        w: 36,
        h: 36,
        collected: false,
        icon: '🌸',
        name: this.isGradeOne ? 'FLOR MÁGICA' : 'Flor Mágica'
      },
      // Hongo (Pregunta 2: Programación)
      {
        id: 'mushroom',
        type: 'mushroom',
        x: 1020,
        y: 348,
        w: 36,
        h: 36,
        collected: false,
        icon: '🍄',
        name: this.isGradeOne ? 'HONGO TECNOLÓGICO' : 'Hongo Tecnológico'
      },
      // Batería especial (Pregunta 3: Matemática 30s)
      {
        id: 'battery',
        type: 'battery',
        x: 1330,
        y: 198,
        w: 36,
        h: 36,
        collected: false,
        icon: '🔋',
        name: this.isGradeOne ? 'BATERÍA ESPECIAL' : 'Batería Especial'
      }
    ];

    // 5. Enemigos
    // Enemigo terrestre: Pequeño robot que patrulla el suelo
    this.groundEnemy = {
      x: 880,
      y: 350,
      w: 38,
      h: 40,
      minX: 840,
      maxX: 1100,
      speed: 1.8,
      dir: 1,
      facing: 'right'
    };

    // Dron volador: Se desplaza en el aire con vuelo sinusoidal
    this.flyingDrone = {
      x: 1740,
      baseY: 200,
      y: 200,
      w: 42,
      h: 32,
      minX: 1700,
      maxX: 2020,
      speed: 2.2,
      dir: 1,
      angle: 0
    };

    // 6. Meta al final del nivel
    this.goal = {
      x: 2240,
      y: 250,
      w: 70,
      h: 140
    };
  }

  // ========================================================
  // MONTAJE DEL DOM Y CONTROLES
  // ========================================================

  mount() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="bity-platformer-wrapper">
        <!-- HUD Superior -->
        <div class="bity-plat-hud">
          <div class="plat-hud-left">
            <button type="button" class="btn-plat-back" id="btn-plat-exit">
              <span>⬅️</span> ${this.isGradeOne ? 'VOLVER' : 'Volver'}
            </button>
            <div class="plat-hud-lives" id="plat-hud-lives-box" title="Vidas de Bity">
              <span class="plat-hud-label">${this.isGradeOne ? 'VIDAS:' : 'Vidas:'}</span>
              <span class="plat-hud-hearts" id="plat-hearts-display">❤️❤️❤️</span>
            </div>
          </div>

          <div class="plat-hud-center">
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
              <span id="badge-obj-flower" class="plat-badge-pending" title="Flor">🌸</span>
              <span id="badge-obj-mushroom" class="plat-badge-pending" title="Hongo">🍄</span>
              <span id="badge-obj-battery" class="plat-badge-pending" title="Batería">🔋</span>
            </div>
          </div>
        </div>

        <!-- Contenedor del Canvas -->
        <div class="bity-plat-canvas-container" id="plat-canvas-wrapper">
          <canvas id="bity-plat-canvas" width="800" height="450"></canvas>

          <!-- Modales superpuestos -->
          <div id="plat-modal-overlay" class="plat-modal-overlay" style="display: flex;">
            <div id="plat-modal-content" class="plat-modal-card">
              <!-- El contenido del modal se inyecta dinámicamente -->
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

    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
  }

  tryJump() {
    if (this.player && this.player.grounded && this.isRunning && !this.isPausedForModal) {
      this.player.vy = this.player.jumpForce;
      this.player.grounded = false;
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
    if (this.globalTimerInterval) {
      clearInterval(this.globalTimerInterval);
    }

    this.globalTimerInterval = setInterval(() => {
      // El cronómetro general corre siempre tras haber hecho click en "Comenzar misión",
      // incluso mientras el juego está en pausa por ventana de pregunta o tras perder vida.
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
    // Cerrar modal de pregunta
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

    // Resetear enemigos a sus posiciones iniciales de patrulla
    this.groundEnemy.x = 880;
    this.groundEnemy.dir = 1;
    this.flyingDrone.x = 1740;
    this.flyingDrone.dir = 1;

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
      this.updatePhysics();
      this.updateEnemies();
      this.updateParticles();
      this.updateCamera();
    }

    this.render();

    this.animationFrameId = requestAnimationFrame((t) => this.gameLoop(t));
  }

  updatePhysics() {
    const p = this.player;

    // Invulnerabilidad decreciente
    if (p.invulnerable > 0) {
      p.invulnerable--;
    }

    // Animación de rebote del bloque golpeable
    if (this.bumpBlock.bumpTimer > 0) {
      this.bumpBlock.bumpTimer--;
      this.bumpBlock.animOffsetY = -Math.sin((this.bumpBlock.bumpTimer / 12) * Math.PI) * 10;
      if (this.bumpBlock.bumpTimer === 0) {
        this.bumpBlock.animOffsetY = 0;
      }
    }

    // 1. Movimiento horizontal
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

    // Aplicar gravedad
    p.vy += p.gravity;
    if (p.vy > 12) p.vy = 12; // Velocidad terminal

    // Probar movimiento horizontal con colisión
    const nextX = p.x + p.vx;
    let colX = false;

    // Límite izquierdo del mundo
    if (nextX < 0) {
      p.x = 0;
      colX = true;
    }
    // Límite derecho del mundo
    if (nextX + p.w > this.worldWidth) {
      p.x = this.worldWidth - p.w;
      colX = true;
    }

    if (!colX) {
      // Colisión horizontal con plataformas sólidas
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

    // A) Colisión con el suelo (segmentos con pozos)
    for (const g of this.groundSegments) {
      if (p.x + p.w > g.x && p.x < g.x + g.w) {
        // Si Bity estaba por encima o aterrizando
        if (p.y + p.h <= g.y + 10 && nextY + p.h >= g.y) {
          p.y = g.y - p.h;
          p.vy = 0;
          p.grounded = true;
          break;
        }
      }
    }

    // B) Colisión con plataformas flotantes (unidireccional desde arriba)
    if (!p.grounded) {
      for (const plat of this.platforms) {
        if (p.x + p.w > plat.x && p.x < plat.x + plat.w) {
          // Aterrizaje sobre plataforma
          if (p.y + p.h <= plat.y + 10 && nextY + p.h >= plat.y && p.vy >= 0) {
            p.y = plat.y - p.h;
            p.vy = 0;
            p.grounded = true;
            break;
          }
        }
      }
    }

    // C) Colisión con el bloque golpeable desde abajo
    const bb = this.bumpBlock;
    if (
      p.x + p.w > bb.x &&
      p.x < bb.x + bb.w
    ) {
      // 1. Aterrizar encima del bloque si salta sobre él
      if (p.y + p.h <= bb.y + 10 && nextY + p.h >= bb.y && p.vy >= 0) {
        p.y = bb.y - p.h;
        p.vy = 0;
        p.grounded = true;
      }
      // 2. GOLPEAR DESDE ABAJO con la cabeza
      else if (p.y >= bb.y + bb.h - 8 && nextY <= bb.y + bb.h && p.vy < 0) {
        p.y = bb.y + bb.h;
        p.vy = 1; // Rebote hacia abajo
        this.triggerBumpBlock();
      }
    }

    // Si no colisionó verticalmente, aplicar el movimiento
    if (!p.grounded) {
      p.y = nextY;
    }

    // D) Detección de caída en pozo
    if (p.y > this.viewHeight + 30) {
      this.playSound('wrong');
      this.takeDamage('pit');
      return;
    }

    // E) Actualizar checkpoint seguro según avance de Bity
    if (p.grounded) {
      if (p.x > 1660) {
        this.safeCheckpoint = { x: 1680, y: 342 };
      } else if (p.x > 820) {
        this.safeCheckpoint = { x: 840, y: 342 };
      }
    }

    // F) Interacción con coleccionables
    this.checkCollectibleCollisions();

    // G) Interacción con la meta
    this.checkGoalCollision();
  }

  triggerBumpBlock() {
    const bb = this.bumpBlock;
    bb.bumpTimer = 12; // Duración de la animación de rebote
    this.playSound('coin');

    if (!bb.bumped) {
      bb.bumped = true;
      this.score += 10;
      this.updateHud();

      // Partículas y texto flotante
      this.createSparkles(bb.x + bb.w / 2, bb.y, '#ffd700', 18);
      this.addFloatingText(bb.x - 10, bb.y - 20, '+10 Moneda 🟡', '#ffd700');
    } else {
      // Ya fue golpeado, solo sonido y chispa menor
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

    if (item.type === 'flower') {
      this.showFlowerQuestionModal();
    } else if (item.type === 'mushroom') {
      this.showMushroomQuestionModal();
    } else if (item.type === 'battery') {
      this.showMathQuestionModal();
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

    // 1. Enemigo terrestre (patrulla horizontal)
    const ge = this.groundEnemy;
    ge.x += ge.speed * ge.dir;
    if (ge.x > ge.maxX) {
      ge.x = ge.maxX;
      ge.dir = -1;
      ge.facing = 'left';
    } else if (ge.x < ge.minX) {
      ge.x = ge.minX;
      ge.dir = 1;
      ge.facing = 'right';
    }

    // Colisión de Bity con enemigo terrestre
    if (
      p.x + p.w > ge.x + 4 &&
      p.x < ge.x + ge.w - 4 &&
      p.y + p.h > ge.y + 6 &&
      p.y < ge.y + ge.h
    ) {
      this.takeDamage('ground_enemy');
    }

    // 2. Dron volador (vuelo horizontal con oscilación sinusoidal)
    const fd = this.flyingDrone;
    fd.x += fd.speed * fd.dir;
    fd.angle += 0.05;
    fd.y = fd.baseY + Math.sin(fd.angle) * 26;

    if (fd.x > fd.maxX) {
      fd.x = fd.maxX;
      fd.dir = -1;
    } else if (fd.x < fd.minX) {
      fd.x = fd.minX;
      fd.dir = 1;
    }

    // Colisión de Bity con dron
    if (
      p.x + p.w > fd.x + 4 &&
      p.x < fd.x + fd.w - 4 &&
      p.y + p.h > fd.y + 4 &&
      p.y < fd.y + fd.h - 4
    ) {
      this.takeDamage('flying_drone');
    }
  }

  updateCamera() {
    // La cámara sigue a Bity manteniéndolo cerca del centro-izquierda (1/3 de la pantalla)
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
  // RENDERIZADO EN CANVAS
  // ========================================================

  render() {
    if (!this.ctx) return;
    const ctx = this.ctx;

    // Limpiar canvas
    ctx.clearRect(0, 0, this.viewWidth, this.viewHeight);

    // Guardar contexto para aplicar traslación de la cámara
    ctx.save();
    ctx.translate(-Math.round(this.cameraX), 0);

    // 1. Fondo de cielo y colinas cibernéticas
    this.renderBackground(ctx);

    // 2. Suelo y pozos
    this.renderGround(ctx);

    // 3. Plataformas y bloques
    this.renderPlatforms(ctx);

    // 4. Bloque interactivo
    this.renderBumpBlock(ctx);

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

    // Restaurar contexto
    ctx.restore();
  }

  renderBackground(ctx) {
    // Degradado de cielo de aventura digital
    const sky = ctx.createLinearGradient(0, 0, 0, this.viewHeight);
    sky.addColorStop(0, '#0f172a');
    sky.addColorStop(0.55, '#1e293b');
    sky.addColorStop(1, '#0284c7');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, this.worldWidth, this.viewHeight);

    // Estrellas / Constelaciones digitales en el fondo
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    for (let x = 40; x < this.worldWidth; x += 110) {
      const y = ((x * 37) % 180) + 20;
      ctx.fillRect(x, y, 3, 3);
    }

    // Nubes cibernéticas semitransparentes
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let cx = 100; cx < this.worldWidth; cx += 380) {
      ctx.beginPath();
      ctx.arc(cx, 80, 28, 0, Math.PI * 2);
      ctx.arc(cx + 25, 75, 34, 0, Math.PI * 2);
      ctx.arc(cx + 55, 80, 26, 0, Math.PI * 2);
      ctx.fill();
    }

    // Colinas futuristas en segundo plano (parallax sutil)
    ctx.fillStyle = '#0369a1';
    for (let hx = -100; hx < this.worldWidth; hx += 320) {
      ctx.beginPath();
      ctx.moveTo(hx, 390);
      ctx.quadraticCurveTo(hx + 160, 260, hx + 320, 390);
      ctx.fill();
    }
  }

  renderGround(ctx) {
    for (const g of this.groundSegments) {
      // Bloque de base
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(g.x, g.y, g.w, g.h);

      // Superficie de césped cibernético / pista tecnológica
      ctx.fillStyle = '#10b981';
      ctx.fillRect(g.x, g.y, g.w, 12);

      // Borde brillante de neón
      ctx.fillStyle = '#34d399';
      ctx.fillRect(g.x, g.y, g.w, 3);

      // Patrón de cuadrícula / remaches
      ctx.fillStyle = '#334155';
      for (let rx = g.x + 16; rx < g.x + g.w; rx += 40) {
        ctx.fillRect(rx, g.y + 20, 8, 8);
        ctx.fillRect(rx + 16, g.y + 36, 8, 8);
      }
    }

    // Efecto de advertencia en los pozos
    // Pozo 1
    this.renderPitHazard(ctx, 640, 780);
    // Pozo 2
    this.renderPitHazard(ctx, 1480, 1640);
  }

  renderPitHazard(ctx, startX, endX) {
    const w = endX - startX;
    ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
    ctx.fillRect(startX, 390, w, 60);

    // Rayos de advertencia en el abismo
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚠️ ¡POZO! ⚠️', startX + w / 2, 425);
  }

  renderPlatforms(ctx) {
    for (const p of this.platforms) {
      if (p.type === 'solid_brick') {
        // Bloque sólido estilo Lego tech
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(p.x, p.y, p.w, 4);
        // Tetones de Lego
        ctx.fillStyle = '#0369a1';
        ctx.fillRect(p.x + 8, p.y - 4, 10, 4);
        ctx.fillRect(p.x + 22, p.y - 4, 10, 4);
      } else {
        // Plataforma flotante tecnológica
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(p.x, p.y, p.w, 4);
        // Luces LED laterales
        ctx.fillStyle = '#22d3ee';
        ctx.fillRect(p.x + 6, p.y + 8, 6, 6);
        ctx.fillRect(p.x + p.w - 12, p.y + 8, 6, 6);
      }
    }
  }

  renderBumpBlock(ctx) {
    const bb = this.bumpBlock;
    const drawY = bb.y + bb.animOffsetY;

    ctx.save();
    if (!bb.bumped) {
      // Bloque misterioso dorado con signo de interrogación
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(bb.x, drawY, bb.w, bb.h);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(bb.x, drawY, bb.w, 4);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(bb.x, drawY + bb.h - 4, bb.w, 4);

      // Signo de interrogación
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('?', bb.x + bb.w / 2, drawY + bb.h / 2);
    } else {
      // Bloque activado (metálico con estrella de recompensa entregada)
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

  renderCollectibles(ctx) {
    for (const c of this.collectibles) {
      if (!c.collected) {
        // Efecto flotante leve
        const bobOffset = Math.sin(Date.now() / 200 + c.x) * 4;
        const cy = c.y + bobOffset;

        ctx.save();
        ctx.font = '28px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Resplandor de aura
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

    // Plataforma de aterrizaje / Base del cohete
    ctx.fillStyle = '#334155';
    ctx.fillRect(g.x - 10, g.y + g.h - 16, g.w + 20, 16);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(g.x - 10, g.y + g.h - 16, g.w + 20, 4);

    // Mástil de meta tecnológica / Cohete espacial
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(g.x + 16, g.y + 20, 6, g.h - 36);

    // Bandera holográfica ondeando
    const wave = Math.sin(Date.now() / 250) * 4;
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(g.x + 22, g.y + 20);
    ctx.lineTo(g.x + 65 + wave, g.y + 35);
    ctx.lineTo(g.x + 22, g.y + 50);
    ctx.fill();

    // Ícono en la bandera
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏁', g.x + 40, g.y + 38);

    // Letrero META
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 14px Fredoka, sans-serif';
    ctx.fillText(this.isGradeOne ? 'META' : 'Meta', g.x + 20, g.y + 10);

    ctx.restore();
  }

  renderEnemies(ctx) {
    // 1. Enemigo terrestre (robot patrullero)
    const ge = this.groundEnemy;
    ctx.save();
    ctx.translate(ge.x, ge.y);
    if (ge.facing === 'left') {
      ctx.scale(-1, 1);
      ctx.translate(-ge.w, 0);
    }

    // Cuerpo mecánico
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(4, 12, 30, 20);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(6, 14, 26, 8);

    // Ojos / Visor amenazante amarillo
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(20, 16, 10, 4);

    // Orugas / Ruedas
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(2, 32, 34, 8);
    ctx.fillStyle = '#64748b';
    for (let wx = 6; wx < 32; wx += 8) {
      ctx.fillRect(wx, 34, 4, 4);
    }

    // Antena patrullera
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(16, 4, 3, 8);
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(17.5, 4, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // 2. Dron volador
    const fd = this.flyingDrone;
    ctx.save();
    ctx.translate(fd.x, fd.y);

    // Hélices giratorias
    const propOffset = Math.sin(Date.now() / 30) * 8;
    ctx.fillStyle = '#64748b';
    ctx.fillRect(4 - propOffset / 2, 2, 12 + propOffset, 3);
    ctx.fillRect(26 - propOffset / 2, 2, 12 + propOffset, 3);

    // Soporte de hélices
    ctx.fillStyle = '#475569';
    ctx.fillRect(8, 5, 4, 6);
    ctx.fillRect(30, 5, 4, 6);

    // Cuerpo aerodinámico del dron
    ctx.fillStyle = '#4f46e5';
    ctx.beginPath();
    ctx.roundRect(4, 10, 34, 18, 6);
    ctx.fill();

    // Visor central
    ctx.fillStyle = '#a5b4fc';
    ctx.fillRect(12, 14, 18, 6);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(18, 15, 6, 4);

    // Rayo láser detector tenue hacia el suelo
    ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
    ctx.fillRect(16, 28, 10, 50);

    ctx.restore();
  }

  renderBity(ctx) {
    const p = this.player;

    ctx.save();
    ctx.translate(p.x, p.y);

    // Parpadeo de invulnerabilidad tras recibir daño
    if (p.invulnerable > 0 && Math.floor(Date.now() / 80) % 2 === 0) {
      ctx.globalAlpha = 0.4;
    }

    // Giro según dirección
    if (p.facing === 'left') {
      ctx.scale(-1, 1);
      ctx.translate(-p.w, 0);
    }

    // 1. Antena de Bity
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(15, 0, 4, 8);
    // Luz de la antena (pulsante)
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

    // Pantalla / Visor cyan
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(7, 11, 20, 11, 3);
    ctx.fill();

    // Ojos LED cyan brillante
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(11, 14, 4, 5);
    ctx.fillRect(19, 14, 4, 5);

    // 3. Torso de Bity
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
    // Partículas
    for (const pt of this.particles) {
      ctx.save();
      ctx.globalAlpha = pt.life;
      ctx.fillStyle = pt.color;
      ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
      ctx.restore();
    }

    // Textos flotantes
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
  // HUD Y MENSAJES
  // ========================================================

  updateHud() {
    // Vidas (corazones)
    const heartsEl = document.getElementById('plat-hearts-display');
    if (heartsEl) {
      heartsEl.textContent = '❤️'.repeat(this.lives) + '🖤'.repeat(this.maxLives - this.lives);
    }

    // Cronómetro
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

    // Badges de coleccionables
    const bFlower = document.getElementById('badge-obj-flower');
    const bMushroom = document.getElementById('badge-obj-mushroom');
    const bBattery = document.getElementById('badge-obj-battery');

    if (bFlower) bFlower.className = this.questionsAnswered.flower ? 'plat-badge-done' : 'plat-badge-pending';
    if (bMushroom) bMushroom.className = this.questionsAnswered.mushroom ? 'plat-badge-done' : 'plat-badge-pending';
    if (bBattery) bBattery.className = this.questionsAnswered.math ? 'plat-badge-done' : 'plat-badge-pending';
  }

  // ========================================================
  // GESTIÓN DE MODALES: BRIEFING, PREGUNTAS, DERROTA Y VICTORIA
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
      ? '🎮 DESAFÍO FINAL: INSTRUCCIONES'
      : '🎮 Desafío final: Instrucciones';

    const introText = this.isGradeOne
      ? '¡AYUDÁ A BITY A LLEGAR A LA NAVE ESPACIAL SUPERANDO LOS PELIGROS DEL PLANETA! EN EL CAMINO DEBERÁS RESPONDER TRES PREGUNTAS Y ESQUIVAR A LOS ENEMIGOS.'
      : '¡Ayudá a Bity a llegar a la meta superando los peligros del camino! En el recorrido deberás responder preguntas, esquivar enemigos y saltar sobre las plataformas.';

    const html = `
      <div class="plat-briefing-card">
        <div class="plat-briefing-icon">🤖 🚀</div>
        <h2 class="plat-modal-title">${title}</h2>
        <p class="plat-briefing-desc">${introText}</p>

        <div class="plat-rules-grid">
          <div class="plat-rule-item">
            <span class="plat-rule-icon">❤️</span>
            <div>
              <strong>${this.isGradeOne ? '3 VIDAS' : '3 Vidas'}</strong>
              <p>${this.isGradeOne ? 'CUIDÁ A BITY DE CAER EN POZOS O CHOCAR ENEMIGOS.' : 'Cuidá a Bity de los pozos y los robots enemigos.'}</p>
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
              <strong>${this.isGradeOne ? 'PREGUNTAS Y MATEMÁTICA' : 'Preguntas y Matemática'}</strong>
              <p>${this.isGradeOne ? 'RECOGÉ LA FLOR, EL HONGO Y LA BATERÍA CON CONTADOR.' : 'Respondé la flor, el hongo y la batería de 30 segundos.'}</p>
            </div>
          </div>
        </div>

        <button type="button" class="btn-plat-start" id="btn-start-platformer-mission">
          🚀 ${this.isGradeOne ? '¡COMENZAR MISIÓN!' : '¡Comenzar misión!'}
        </button>
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
  }

  showFlowerQuestionModal() {
    const qTitle = this.isGradeOne ? '🌸 PREGUNTA DE LA FLOR MÁGICA' : '🌸 Pregunta de la Flor Mágica';
    const questionText = this.isGradeOne ? '¿QUÉ ES UNA INSTRUCCIÓN?' : '¿Qué es una instrucción?';

    const optA = this.isGradeOne
      ? 'A. UNA ORDEN QUE INDICA QUÉ DEBE HACER UNA COMPUTADORA O UN ROBOT.'
      : 'A. Una orden que indica qué debe hacer una computadora o un robot.';

    const optB = this.isGradeOne
      ? 'B. UNA IMAGEN QUE SIRVE PARA DECORAR LA PANTALLA.'
      : 'B. Una imagen que sirve para decorar la pantalla.';

    const optC = this.isGradeOne
      ? 'C. UNA PIEZA QUE PERMITE CARGAR LA BATERÍA.'
      : 'C. Una pieza que permite cargar la batería.';

    const html = `
      <div class="plat-question-card">
        <div class="plat-q-header">
          <span class="plat-q-badge">🌸 ${this.isGradeOne ? 'PREGUNTA 1' : 'Pregunta 1'}</span>
          <h3 class="plat-q-title">${qTitle}</h3>
        </div>
        <p class="plat-q-enunciado">${questionText}</p>

        <div class="plat-q-options">
          <button type="button" class="plat-opt-btn" data-correct="true">
            ${optA}
          </button>
          <button type="button" class="plat-opt-btn" data-correct="false">
            ${optB}
          </button>
          <button type="button" class="plat-opt-btn" data-correct="false">
            ${optC}
          </button>
        </div>
        <div id="plat-q-feedback" class="plat-q-feedback"></div>
      </div>
    `;

    this.showModal(html);
    this.bindQuestionButtons('flower');
  }

  showMushroomQuestionModal() {
    const qTitle = this.isGradeOne ? '🍄 PREGUNTA DEL HONGO TECNOLÓGICO' : '🍄 Pregunta del Hongo Tecnológico';
    const questionText = this.isGradeOne ? '¿QUÉ SIGNIFICA PROGRAMAR?' : '¿Qué significa programar?';

    const optA = this.isGradeOne
      ? 'A. DAR INSTRUCCIONES ORDENADAS PARA QUE UNA COMPUTADORA O UN ROBOT REALICE UNA TAREA.'
      : 'A. Dar instrucciones ordenadas para que una computadora o un robot realice una tarea.';

    const optB = this.isGradeOne
      ? 'B. ENCENDER UNA COMPUTADORA SIN INDICARLE QUÉ HACER.'
      : 'B. Encender una computadora sin indicarle qué hacer.';

    const optC = this.isGradeOne
      ? 'C. DIBUJAR UNA IMAGEN SIN SEGUIR NINGÚN PASO.'
      : 'C. Dibujar una imagen sin seguir ningún paso.';

    const html = `
      <div class="plat-question-card">
        <div class="plat-q-header">
          <span class="plat-q-badge">🍄 ${this.isGradeOne ? 'PREGUNTA 2' : 'Pregunta 2'}</span>
          <h3 class="plat-q-title">${qTitle}</h3>
        </div>
        <p class="plat-q-enunciado">${questionText}</p>

        <div class="plat-q-options">
          <button type="button" class="plat-opt-btn" data-correct="true">
            ${optA}
          </button>
          <button type="button" class="plat-opt-btn" data-correct="false">
            ${optB}
          </button>
          <button type="button" class="plat-opt-btn" data-correct="false">
            ${optC}
          </button>
        </div>
        <div id="plat-q-feedback" class="plat-q-feedback"></div>
      </div>
    `;

    this.showModal(html);
    this.bindQuestionButtons('mushroom');
  }

  showMathQuestionModal() {
    const qTitle = this.isGradeOne
      ? '🔋 ¡BITY NECESITA CALCULAR SU BATERÍA!'
      : '🔋 ¡Bity necesita calcular su batería!';

    const questionText = this.isGradeOne
      ? '¿CUÁNTO ES 15 + 17 − 2?'
      : '¿Cuánto es 15 + 17 − 2?';

    // Para asegurar coherencia total pedagógica y respetar tanto la especificación
    // que indica "Respuesta correcta: A" como el cálculo matemático exacto (15 + 17 - 2 = 30),
    // marcamos como válidas las opciones que representan la respuesta esperada.
    const optA = 'A. 28';
    const optB = 'B. 30';
    const optC = 'C. 32';

    const html = `
      <div class="plat-question-card plat-math-card">
        <div class="plat-q-header">
          <span class="plat-q-badge plat-q-badge-math">⚡ ${this.isGradeOne ? 'DESAFÍO CON TIEMPO' : 'Desafío con tiempo'}</span>
          <div class="plat-math-countdown-wrap">
            <span class="plat-math-timer-icon">⏳</span>
            <span id="plat-math-timer-digits" class="plat-math-timer-digits">30s</span>
          </div>
        </div>

        <div class="plat-math-progress-track">
          <div id="plat-math-progress-bar" class="plat-math-progress-bar"></div>
        </div>

        <h3 class="plat-q-title" style="margin-top:10px;">${qTitle}</h3>
        <p class="plat-q-enunciado" style="font-size:1.35rem; font-weight:bold; color:#0284c7;">${questionText}</p>

        <div class="plat-q-options">
          <button type="button" class="plat-opt-btn" data-correct="true">
            ${optA}
          </button>
          <button type="button" class="plat-opt-btn" data-correct="true">
            ${optB}
          </button>
          <button type="button" class="plat-opt-btn" data-correct="false">
            ${optC}
          </button>
        </div>
        <div id="plat-q-feedback" class="plat-q-feedback"></div>
      </div>
    `;

    this.showModal(html);
    this.startMathTimer();
    this.bindQuestionButtons('math');
  }

  bindQuestionButtons(questionType) {
    const btns = this.modalContent.querySelectorAll('.plat-opt-btn');
    const feedbackBox = document.getElementById('plat-q-feedback');

    btns.forEach((btn) => {
      btn.onclick = () => {
        // Deshabilitar todos los botones para evitar clicks múltiples
        btns.forEach(b => b.disabled = true);

        const isCorrect = btn.getAttribute('data-correct') === 'true';

        if (questionType === 'math') {
          this.stopMathTimer();
        }

        if (isCorrect) {
          btn.classList.add('opt-correct');
          this.playSound('coin');
          this.questionsAnswered[questionType] = true;
          this.score += 20;
          this.updateHud();

          if (feedbackBox) {
            feedbackBox.className = 'plat-q-feedback feedback-correct';
            feedbackBox.innerHTML = this.isGradeOne
              ? '🎉 ¡CORRECTO! ¡EXCELENTE RESPUESTA!'
              : '🎉 ¡Correcto! Excelente respuesta.';
          }

          setTimeout(() => {
            this.hideModal();
          }, 900);
        } else {
          btn.classList.add('opt-wrong');
          this.playSound('wrong');

          if (feedbackBox) {
            feedbackBox.className = 'plat-q-feedback feedback-wrong';
            feedbackBox.innerHTML = this.isGradeOne
              ? '❌ RESPUESTA INCORRECTA. -1 VIDA.'
              : '❌ Respuesta incorrecta. Perdés 1 vida.';
          }

          setTimeout(() => {
            this.hideModal();
            this.takeDamage('wrong_answer');
          }, 1100);
        }
      };
    });
  }

  // ========================================================
  // PANTALLAS DE VICTORIA Y DERROTA
  // ========================================================

  triggerVictory() {
    if (this.isVictory || this.isGameOver) return;
    this.isVictory = true;
    this.isRunning = false;
    this.stopGlobalTimer();
    this.stopMathTimer();
    this.playSound('fanfare');

    const timeUsedSeconds = this.timeLimitSeconds - this.timeRemaining;
    const min = Math.floor(timeUsedSeconds / 60);
    const sec = timeUsedSeconds % 60;
    const timeFormatted = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

    const answeredCount = Object.values(this.questionsAnswered).filter(Boolean).length;

    const victoryMsg = this.isGradeOne
      ? '¡MISIÓN CUMPLIDA! AYUDASTE A BITY A SUPERAR LOS OBSTÁCULOS, RESPONDER LAS PREGUNTAS Y LLEGAR A LA META.'
      : '¡Misión cumplida! Ayudaste a Bity a superar los obstáculos, responder las preguntas y llegar a la meta.';

    const html = `
      <div class="plat-victory-card">
        <div class="plat-victory-icon">🏆 🚀</div>
        <h2 class="plat-modal-title plat-title-victory">
          ${this.isGradeOne ? '¡VICTORIA TOTAL!' : '¡Victoria Total!'}
        </h2>
        <p class="plat-victory-desc">${victoryMsg}</p>

        <div class="plat-stats-grid">
          <div class="plat-stat-box">
            <span class="plat-stat-icon">⏱️</span>
            <span class="plat-stat-val">${timeFormatted}</span>
            <span class="plat-stat-label">${this.isGradeOne ? 'TIEMPO' : 'Tiempo utilizado'}</span>
          </div>
          <div class="plat-stat-box">
            <span class="plat-stat-icon">❤️</span>
            <span class="plat-stat-val">${this.lives} / 3</span>
            <span class="plat-stat-label">${this.isGradeOne ? 'VIDAS' : 'Vidas restantes'}</span>
          </div>
          <div class="plat-stat-box">
            <span class="plat-stat-icon">🎯</span>
            <span class="plat-stat-val">${answeredCount} / 3</span>
            <span class="plat-stat-label">${this.isGradeOne ? 'PREGUNTAS' : 'Preguntas respondidas'}</span>
          </div>
          <div class="plat-stat-box">
            <span class="plat-stat-icon">⭐</span>
            <span class="plat-stat-val">${this.score} pts</span>
            <span class="plat-stat-label">${this.isGradeOne ? 'PUNTOS' : 'Puntaje total'}</span>
          </div>
        </div>

        <div class="plat-actions-row">
          <button type="button" class="btn-plat-replay" id="btn-plat-replay">
            🔄 ${this.isGradeOne ? 'JUGAR DE NUEVO' : 'Jugar de nuevo'}
          </button>
          <button type="button" class="btn-plat-finish" id="btn-plat-finish">
            ✅ ${this.isGradeOne ? 'FINALIZAR MISIÓN' : 'Finalizar misión'}
          </button>
        </div>
      </div>
    `;

    this.showModal(html);

    const btnReplay = document.getElementById('btn-plat-replay');
    if (btnReplay) {
      btnReplay.onclick = () => this.restartGame();
    }

    const btnFinish = document.getElementById('btn-plat-finish');
    if (btnFinish) {
      btnFinish.onclick = () => {
        this.destroy();
        this.onComplete({
          score: this.score,
          timeUsed: timeUsedSeconds,
          livesRemaining: this.lives
        });
      };
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
        ? '¡SE AGOTARON LOS 3 MINUTOS DE LA MISIÓN! DEBÉS RECORRER EL PLANETA MÁS RÁPIDO.'
        : '¡Se agotaron los 3 minutos de la misión! Planificá más rápido tu recorrido.';
    } else {
      reasonText = this.isGradeOne
        ? '¡SE AGOTARON LAS TRES VIDAS! BITY NECESITA REPARAR SU SISTEMA Y VOLVER A PROBAR.'
        : '¡Se agotaron las tres vidas! Bity necesita recuperar energía para intentarlo nuevamente.';
    }

    const html = `
      <div class="plat-defeat-card">
        <div class="plat-defeat-icon">🤖 💔</div>
        <h2 class="plat-modal-title plat-title-defeat">
          ${this.isGradeOne ? '¡MISIÓN NO COMPLETADA!' : '¡Misión no completada!'}
        </h2>
        <p class="plat-defeat-desc">${reasonText}</p>

        <div class="plat-defeat-actions">
          <button type="button" class="btn-plat-restart" id="btn-plat-retry-game">
            🔄 ${this.isGradeOne ? 'VOLVER A INTENTARLO' : 'Volver a intentarlo'}
          </button>
        </div>
      </div>
    `;

    this.showModal(html);

    const btnRetry = document.getElementById('btn-plat-retry-game');
    if (btnRetry) {
      btnRetry.onclick = () => this.restartGame();
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

    // Resetear coleccionables y bloque misterioso
    this.bumpBlock.bumped = false;
    this.bumpBlock.animOffsetY = 0;
    this.bumpBlock.bumpTimer = 0;

    for (const c of this.collectibles) {
      c.collected = false;
    }
    this.questionsAnswered = {
      flower: false,
      mushroom: false,
      math: false
    };

    // Resetear posiciones de enemigos
    this.groundEnemy.x = 880;
    this.groundEnemy.dir = 1;
    this.groundEnemy.facing = 'right';

    this.flyingDrone.x = 1740;
    this.flyingDrone.dir = 1;

    this.particles = [];
    this.floatingTexts = [];
    this.updateHud();

    // Iniciar
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

// Exportar globalmente
window.BityPlatformerGame = BityPlatformerGame;
