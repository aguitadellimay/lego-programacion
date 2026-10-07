/**
 * miniGame.js - Motor de Niveles con Diferenciación por Grados (1° a 5°)
 * Entornos Dinámicos: Día Soleado, Noche con Antorcha, Lluvia y Halloween.
 * 5 Desafíos por grado (3 regulares + 2 jefes lógicos/matemáticos).
 */

const LEVEL_CONFIGS = {
  // ========================================================
  // 1° GRADO: Sumas y restas hasta 20, números pares/impares
  // ========================================================
  1: [
    {
      id: 1,
      theme: 'day',
      title: 'Desafío 1: El Sendero de los Obstáculos',
      desc: 'Esquiva a los slimes y junta las 3 piezas Lego iniciales.',
      type: 'collect',
      goal: 3,
      items: [
        { x: 220, y: 300, color: '#E3000B', bobOffset: 0 },
        { x: 530, y: 160, color: '#0055BF', bobOffset: 1.5 },
        { x: 690, y: 240, color: '#FED700', bobOffset: 3 }
      ],
      obstacles: [
        { x: 340, y: 405, w: 26, h: 25, minX: 300, maxX: 460, speed: 2, dir: 1, type: 'slime' },
        { x: 650, y: 405, w: 26, h: 25, minX: 620, maxX: 760, speed: 2.2, dir: -1, type: 'slime' }
      ]
    },
    {
      id: 2,
      theme: 'rain',
      title: 'Desafío 2: Números Pares bajo la Lluvia',
      desc: '🔵 Misión Lógica: Toca SOLO los bloques con NÚMEROS PARES (2, 4, 6...).',
      type: 'filter',
      goal: 3,
      items: [
        { x: 210, y: 300, val: 4, isTarget: true, color: '#1e88e5', bobOffset: 0 },
        { x: 530, y: 160, val: 6, isTarget: true, color: '#1e88e5', bobOffset: 1 },
        { x: 810, y: 310, val: 8, isTarget: true, color: '#1e88e5', bobOffset: 2 },
        { x: 370, y: 230, val: 5, isTarget: false, color: '#e53935', bobOffset: 1.5 }, // Impar
        { x: 690, y: 240, val: 7, isTarget: false, color: '#e53935', bobOffset: 2.5 }  // Impar
      ]
    },
    {
      id: 3,
      theme: 'night',
      title: 'Desafío 3: Suma en la Noche',
      desc: '¿Cuánto es 8 + 5? ¡Toca el bloque con el resultado!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es 8 + 5?',
        answer: 13,
        options: [
          { val: 11, x: 210, y: 300 },
          { val: 13, x: 370, y: 230 }, // Correcto
          { val: 12, x: 530, y: 160 },
          { val: 15, x: 690, y: 240 }
        ]
      }
    },
    {
      id: 4,
      theme: 'halloween',
      title: 'Desafío 4 (Jefe): Resta de Calabaza',
      desc: '¿Cuánto es 16 - 7? ¡Esquiva al murciélago y toca la respuesta!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es 16 - 7?',
        answer: 9,
        options: [
          { val: 8, x: 210, y: 300 },
          { val: 9, x: 530, y: 160 }, // Correcto
          { val: 10, x: 690, y: 240 },
          { val: 7, x: 810, y: 310 }
        ]
      },
      obstacles: [
        { x: 420, y: 190, w: 28, h: 20, minX: 350, maxX: 600, speed: 2.8, dir: 1, type: 'bat' }
      ]
    },
    {
      id: 5,
      theme: 'day',
      title: 'Desafío 5 (Gran Jefe): ¡El Bloque Dorado!',
      desc: '¿Cuánto es 12 + 6? ¡Resuelve la última suma para ganar el trofeo!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es 12 + 6?',
        answer: 18,
        options: [
          { val: 17, x: 210, y: 300 },
          { val: 19, x: 370, y: 230 },
          { val: 18, x: 530, y: 160 }, // Correcto
          { val: 20, x: 690, y: 240 }
        ]
      },
      obstacles: [
        { x: 320, y: 405, w: 26, h: 25, minX: 280, maxX: 440, speed: 2.5, dir: 1, type: 'slime' }
      ]
    }
  ],

  // ========================================================
  // 2° GRADO: Sumas/restas hasta 100, tablas básicas (x2, x3, x4)
  // ========================================================
  2: [
    {
      id: 1,
      theme: 'day',
      title: 'Desafío 1: Suma de Decenas',
      desc: '¿Cuánto es 25 + 15? ¡Toca el bloque correcto!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es 25 + 15?',
        answer: 40,
        options: [
          { val: 35, x: 210, y: 300 },
          { val: 40, x: 370, y: 230 }, // Correcto
          { val: 45, x: 530, y: 160 },
          { val: 50, x: 690, y: 240 }
        ]
      }
    },
    {
      id: 2,
      theme: 'rain',
      title: 'Desafío 2: Tabla del 3 bajo la Lluvia',
      desc: '¿Cuánto es 3 × 4? ¡Esquiva los obstáculos y busca la respuesta!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es 3 × 4?',
        answer: 12,
        options: [
          { val: 9, x: 210, y: 300 },
          { val: 15, x: 370, y: 230 },
          { val: 12, x: 530, y: 160 }, // Correcto
          { val: 14, x: 690, y: 240 }
        ]
      },
      obstacles: [
        { x: 340, y: 405, w: 26, h: 25, minX: 290, maxX: 450, speed: 2, dir: 1, type: 'slime' }
      ]
    },
    {
      id: 3,
      theme: 'night',
      title: 'Desafío 3: Resta Nocturna',
      desc: '¿Cuánto es 60 - 25? ¡Toca el bloque correspondiente!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es 60 - 25?',
        answer: 35,
        options: [
          { val: 30, x: 210, y: 300 },
          { val: 35, x: 530, y: 160 }, // Correcto
          { val: 40, x: 690, y: 240 },
          { val: 25, x: 810, y: 310 }
        ]
      }
    },
    {
      id: 4,
      theme: 'halloween',
      title: 'Desafío 4 (Jefe): Multiplicación de Monstruos',
      desc: '¿Cuánto es 4 × 5? ¡Cuidado con el murciélago de Halloween!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es 4 × 5?',
        answer: 20,
        options: [
          { val: 16, x: 210, y: 300 },
          { val: 24, x: 370, y: 230 },
          { val: 20, x: 530, y: 160 }, // Correcto
          { val: 25, x: 690, y: 240 }
        ]
      },
      obstacles: [
        { x: 400, y: 180, w: 28, h: 20, minX: 320, maxX: 580, speed: 3, dir: 1, type: 'bat' }
      ]
    },
    {
      id: 5,
      theme: 'day',
      title: 'Desafío 5 (Gran Jefe): Operación Combinada',
      desc: '¿Cuánto es 20 + 30 - 10? ¡Obtén el resultado maestro!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es 20 + 30 - 10?',
        answer: 40,
        options: [
          { val: 50, x: 210, y: 300 },
          { val: 40, x: 370, y: 230 }, // Correcto
          { val: 35, x: 530, y: 160 },
          { val: 45, x: 690, y: 240 }
        ]
      }
    }
  ],

  // ========================================================
  // 3° GRADO: Múltiplos, división y fracciones visuales (1/2, 1/4)
  // ========================================================
  3: [
    {
      id: 1,
      theme: 'day',
      title: 'Desafío 1: Múltiplos de 5',
      desc: '🔵 Misión: Toca SOLO los bloques que sean MÚLTIPLOS DE 5 (15, 25, 40).',
      type: 'filter',
      goal: 3,
      items: [
        { x: 210, y: 300, val: 15, isTarget: true, color: '#1e88e5', bobOffset: 0 },
        { x: 530, y: 160, val: 25, isTarget: true, color: '#1e88e5', bobOffset: 1 },
        { x: 810, y: 310, val: 40, isTarget: true, color: '#1e88e5', bobOffset: 2 },
        { x: 370, y: 230, val: 18, isTarget: false, color: '#e53935', bobOffset: 1.5 },
        { x: 690, y: 240, val: 22, isTarget: false, color: '#e53935', bobOffset: 2.5 }
      ]
    },
    {
      id: 2,
      theme: 'rain',
      title: 'Desafío 2: Fracción Visual (Mitad 1/2)',
      desc: '¿Qué número representa la MITAD (1/2) de 24? ¡Búscalo en la lluvia!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es 1/2 de 24?',
        answer: 12,
        options: [
          { val: 10, x: 210, y: 300 },
          { val: 12, x: 370, y: 230 }, // Correcto
          { val: 14, x: 530, y: 160 },
          { val: 8, x: 690, y: 240 }
        ]
      }
    },
    {
      id: 3,
      theme: 'night',
      title: 'Desafío 3: Multiplicación Intermedia',
      desc: '¿Cuánto es 7 × 6? ¡Encuentra el bloque en la noche estrellada!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es 7 × 6?',
        answer: 42,
        options: [
          { val: 40, x: 210, y: 300 },
          { val: 48, x: 370, y: 230 },
          { val: 42, x: 530, y: 160 }, // Correcto
          { val: 49, x: 690, y: 240 }
        ]
      }
    },
    {
      id: 4,
      theme: 'halloween',
      title: 'Desafío 4 (Jefe): División de Halloween',
      desc: '¿Cuánto es 36 ÷ 4? ¡Esquiva a los enemigos y resuelve!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es 36 ÷ 4?',
        answer: 9,
        options: [
          { val: 8, x: 210, y: 300 },
          { val: 9, x: 370, y: 230 }, // Correcto
          { val: 7, x: 530, y: 160 },
          { val: 6, x: 690, y: 240 }
        ]
      },
      obstacles: [
        { x: 380, y: 190, w: 28, h: 20, minX: 300, maxX: 560, speed: 2.8, dir: 1, type: 'bat' }
      ]
    },
    {
      id: 5,
      theme: 'day',
      title: 'Desafío 5 (Gran Jefe): Un Cuarto (1/4)',
      desc: '¿Cuánto es 1/4 de 32? ¡Descubre el bloque maestro!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es 1/4 de 32?',
        answer: 8,
        options: [
          { val: 6, x: 210, y: 300 },
          { val: 8, x: 370, y: 230 }, // Correcto
          { val: 12, x: 530, y: 160 },
          { val: 16, x: 690, y: 240 }
        ]
      }
    }
  ],

  // ========================================================
  // 4° GRADO: Decimales sencillos, números primos vs compuestos
  // ========================================================
  4: [
    {
      id: 1,
      theme: 'day',
      title: 'Desafío 1: Suma de Decimales',
      desc: '¿Cuánto es 2.5 + 3.5? ¡Toca el bloque correspondiente!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es 2.5 + 3.5?',
        answer: 6,
        options: [
          { val: 5.5, x: 210, y: 300 },
          { val: 6, x: 370, y: 230 }, // Correcto
          { val: 6.5, x: 530, y: 160 },
          { val: 7, x: 690, y: 240 }
        ]
      }
    },
    {
      id: 2,
      theme: 'rain',
      title: 'Desafío 2: Números Primos en la Tormenta',
      desc: '🔵 Misión: Toca SOLO los bloques con NÚMEROS PRIMOS (7, 11, 13).',
      type: 'filter',
      goal: 3,
      items: [
        { x: 210, y: 300, val: 7, isTarget: true, color: '#1e88e5', bobOffset: 0 },
        { x: 530, y: 160, val: 11, isTarget: true, color: '#1e88e5', bobOffset: 1 },
        { x: 810, y: 310, val: 13, isTarget: true, color: '#1e88e5', bobOffset: 2 },
        { x: 370, y: 230, val: 9, isTarget: false, color: '#e53935', bobOffset: 1.5 }, // Compuesto
        { x: 690, y: 240, val: 15, isTarget: false, color: '#e53935', bobOffset: 2.5 }  // Compuesto
      ]
    },
    {
      id: 3,
      theme: 'night',
      title: 'Desafío 3: Resta Decimal Nocturna',
      desc: '¿Cuánto es 10 - 4.5? ¡Encuentra el bloque correcto!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es 10 - 4.5?',
        answer: 5.5,
        options: [
          { val: 6.5, x: 210, y: 300 },
          { val: 5.5, x: 370, y: 230 }, // Correcto
          { val: 5, x: 530, y: 160 },
          { val: 4.5, x: 690, y: 240 }
        ]
      }
    },
    {
      id: 4,
      theme: 'halloween',
      title: 'Desafío 4 (Jefe): Multiplicación Decimal',
      desc: '¿Cuánto es 1.5 × 4? ¡Esquiva al murciélago y resuelve!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es 1.5 × 4?',
        answer: 6,
        options: [
          { val: 5, x: 210, y: 300 },
          { val: 6, x: 370, y: 230 }, // Correcto
          { val: 7.5, x: 530, y: 160 },
          { val: 4.5, x: 690, y: 240 }
        ]
      },
      obstacles: [
        { x: 360, y: 190, w: 28, h: 20, minX: 300, maxX: 560, speed: 3.2, dir: 1, type: 'bat' }
      ]
    },
    {
      id: 5,
      theme: 'day',
      title: 'Desafío 5 (Gran Jefe): Divisor de 48',
      desc: '¿Cuál de estos números es un DIVISOR EXACTO de 48?',
      type: 'math_choice',
      mathData: {
        question: '¿Cuál es divisor de 48?',
        answer: 12,
        options: [
          { val: 10, x: 210, y: 300 },
          { val: 12, x: 370, y: 230 }, // Correcto (48/12 = 4)
          { val: 14, x: 530, y: 160 },
          { val: 9, x: 690, y: 240 }
        ]
      }
    }
  ],

  // ========================================================
  // 5° GRADO: Números negativos y operaciones con fracciones
  // ========================================================
  5: [
    {
      id: 1,
      theme: 'night',
      title: 'Desafío 1: El Abismo Negativo',
      desc: '¿Cuánto es 5 - 8? ¡Salta al bloque con el resultado bajo cero!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es 5 - 8?',
        answer: -3,
        options: [
          { val: 3, x: 210, y: 300 },
          { val: -3, x: 370, y: 230 }, // Correcto
          { val: -2, x: 530, y: 160 },
          { val: -4, x: 690, y: 240 }
        ]
      }
    },
    {
      id: 2,
      theme: 'rain',
      title: 'Desafío 2: Suma con Números Negativos',
      desc: '¿Cuánto es -4 + 10? ¡Búscalo entre la tormenta!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es -4 + 10?',
        answer: 6,
        options: [
          { val: -6, x: 210, y: 300 },
          { val: 6, x: 370, y: 230 }, // Correcto
          { val: 14, x: 530, y: 160 },
          { val: -14, x: 690, y: 240 }
        ]
      },
      obstacles: [
        { x: 340, y: 405, w: 26, h: 25, minX: 300, maxX: 460, speed: 2.5, dir: 1, type: 'slime' }
      ]
    },
    {
      id: 3,
      theme: 'halloween',
      title: 'Desafío 3: Dos Negativos se Suman',
      desc: '¿Cuánto es (-3) + (-5)? ¡Toca el bloque correspondiente!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es (-3) + (-5)?',
        answer: -8,
        options: [
          { val: 8, x: 210, y: 300 },
          { val: -8, x: 370, y: 230 }, // Correcto
          { val: -2, x: 530, y: 160 },
          { val: 2, x: 690, y: 240 }
        ]
      }
    },
    {
      id: 4,
      theme: 'day',
      title: 'Desafío 4 (Jefe): Multiplicación de Fracciones',
      desc: '¿Cuánto es (1/2) × (4/5)? (Simplificado)',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es 1/2 × 4/5?',
        answer: '2/5',
        options: [
          { val: '4/10', x: 210, y: 300 },
          { val: '2/5', x: 370, y: 230 }, // Correcto
          { val: '1/5', x: 530, y: 160 },
          { val: '5/8', x: 690, y: 240 }
        ]
      },
      obstacles: [
        { x: 380, y: 190, w: 28, h: 20, minX: 320, maxX: 580, speed: 3.2, dir: 1, type: 'bat' }
      ]
    },
    {
      id: 5,
      theme: 'night',
      title: 'Desafío 5 (Gran Jefe): Operación Mixta con Negativos',
      desc: '¿Cuánto es 10 - 15 + 2? ¡Alcanza el Bloque Maestro para ganar!',
      type: 'math_choice',
      mathData: {
        question: '¿Cuánto es 10 - 15 + 2?',
        answer: -3,
        options: [
          { val: 7, x: 210, y: 300 },
          { val: -3, x: 370, y: 230 }, // Correcto
          { val: -5, x: 530, y: 160 },
          { val: 3, x: 690, y: 240 }
        ]
      },
      obstacles: [
        { x: 340, y: 405, w: 26, h: 25, minX: 300, maxX: 460, speed: 3, dir: 1, type: 'slime' }
      ]
    }
  ]
};

/**
 * Motor del Mini-Juego Minecraft con Clima y Diferenciación de Grados
 */
class MinecraftLegoGame {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.onAllCompleted = options.onAllCompleted || (() => {});
    this.onLevelComplete = options.onLevelComplete || (() => {});
    this.onPlaySound = options.onPlaySound || (() => {});

    this.isRunning = false;
    this.animationId = null;

    // Grado actual (por defecto 1°) y nivel (0 a 4 = 5 desafíos)
    this.selectedGrade = 1;
    this.currentLevelIndex = 0;
    this.totalLevels = 5;
    this.isVictory = false;

    this.floatingTexts = [];
    this.particles = [];
    this.rainDrops = [];
    this.stars = [];

    // Inicializar partículas de lluvia y estrellas nocturnas
    this.initWeatherParticles();

    // Controles
    this.keys = { left: false, right: false, jump: false };

    // Jugador (Steve)
    this.player = {
      x: 60,
      y: 350,
      width: 28,
      height: 48,
      vx: 0,
      vy: 0,
      speed: 4.5,
      jumpForce: -11.8,
      grounded: false,
      facing: 'right',
      walkFrame: 0,
      invulnerable: 0
    };

    this.gravity = 0.55;

    // Plataformas base del mundo Minecraft
    this.platforms = [
      { x: 0, y: 430, w: 900, h: 70, type: 'grass' },
      { x: 170, y: 340, w: 120, h: 90, type: 'grass' },
      { x: 330, y: 270, w: 110, h: 25, type: 'wood' },
      { x: 480, y: 200, w: 120, h: 30, type: 'stone' },
      { x: 640, y: 280, w: 110, h: 30, type: 'grass' },
      { x: 780, y: 350, w: 120, h: 80, type: 'grass' }
    ];

    this.initControls();
  }

  initWeatherParticles() {
    // 50 gotas de lluvia
    for (let i = 0; i < 50; i++) {
      this.rainDrops.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        len: Math.random() * 12 + 8,
        speed: Math.random() * 6 + 9
      });
    }

    // 40 estrellas fijas con titileo
    for (let i = 0; i < 40; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * 260,
        r: Math.random() * 1.8 + 0.8,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }
  }

  initControls() {
    window.addEventListener('keydown', (e) => {
      if (!this.isRunning) return;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) this.keys.left = true;
      if (['ArrowRight', 'KeyD'].includes(e.code)) this.keys.right = true;
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) {
        if (this.player.grounded) {
          this.player.vy = this.player.jumpForce;
          this.player.grounded = false;
          this.playSound('jump');
        }
        this.keys.jump = true;
      }
    });

    window.addEventListener('keyup', (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) this.keys.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) this.keys.right = false;
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) this.keys.jump = false;
    });

    const bindTouch = (elem, pressCallback, releaseCallback) => {
      if (!elem) return;
      elem.addEventListener('mousedown', (e) => { e.preventDefault(); pressCallback(); });
      elem.addEventListener('mouseup', (e) => { e.preventDefault(); releaseCallback(); });
      elem.addEventListener('mouseleave', (e) => { e.preventDefault(); releaseCallback(); });
      elem.addEventListener('touchstart', (e) => { e.preventDefault(); pressCallback(); });
      elem.addEventListener('touchend', (e) => { e.preventDefault(); releaseCallback(); });
    };

    bindTouch(document.getElementById('touch-left'), () => { this.keys.left = true; }, () => { this.keys.left = false; });
    bindTouch(document.getElementById('touch-right'), () => { this.keys.right = true; }, () => { this.keys.right = false; });
    bindTouch(document.getElementById('touch-jump'), () => {
      if (this.player.grounded) {
        this.player.vy = this.player.jumpForce;
        this.player.grounded = false;
        this.playSound('jump');
      }
    }, () => {});
  }

  playSound(type) {
    if (this.onPlaySound) this.onPlaySound(type);
  }

  /**
   * Fija el grado escolar (1 a 5) y arranca en el Desafío 1
   */
  setGrade(gradeNum) {
    this.selectedGrade = parseInt(gradeNum) || 1;
    this.currentLevelIndex = 0;
    this.loadCurrentLevel();
  }

  /**
   * Carga la configuración del nivel actual según el grado seleccionado
   */
  loadCurrentLevel() {
    const gradeLevels = LEVEL_CONFIGS[this.selectedGrade] || LEVEL_CONFIGS[1];
    const cfg = gradeLevels[this.currentLevelIndex] || gradeLevels[0];

    this.activeConfig = cfg;
    this.theme = cfg.theme || 'day';
    this.player.x = 60;
    this.player.y = 350;
    this.player.vx = 0;
    this.player.vy = 0;
    this.particles = [];
    this.floatingTexts = [];
    this.collectedCount = 0;

    // Obstáculos
    this.obstacles = (cfg.obstacles || []).map(o => ({ ...o }));

    // Items según el tipo de nivel
    if (cfg.type === 'collect' || cfg.type === 'filter') {
      this.levelGoal = cfg.goal || 3;
      this.items = (cfg.items || []).map(it => ({ ...it, collected: false }));
    } else if (cfg.type === 'math_choice') {
      this.levelGoal = 1;
      this.items = cfg.mathData.options.map((opt, idx) => ({
        id: idx + 1,
        x: opt.x,
        y: opt.y,
        val: opt.val,
        isMathTarget: opt.val === cfg.mathData.answer,
        color: opt.val === cfg.mathData.answer ? '#FED700' : '#4fc3f7',
        collected: false,
        bobOffset: idx
      }));
    }

    this.updateHud();
  }

  updateHud() {
    const cfg = this.activeConfig;
    const levelNumber = this.currentLevelIndex + 1;

    const titleEl = document.getElementById('game-level-title');
    const descEl = document.getElementById('game-mission-desc');
    const counterEl = document.getElementById('game-level-counter');

    // Emoji de clima
    const weatherIcons = { day: '☀️ Día', night: '🌙 Noche', rain: '🌧️ Lluvia', halloween: '🎃 Halloween' };
    const weatherLabel = weatherIcons[this.theme] || '☀️ Día';

    if (titleEl) {
      titleEl.innerHTML = `🎓 ${this.selectedGrade}° Grado • ${cfg.title} <span class="weather-badge weather-${this.theme}">${weatherLabel}</span>`;
    }
    if (descEl) descEl.textContent = cfg.desc;

    if (counterEl) {
      if (cfg.type === 'math_choice') {
        counterEl.textContent = `🧮 ${cfg.mathData.question}`;
      } else {
        counterEl.textContent = `${this.collectedCount} / ${this.levelGoal} 🧱`;
      }
    }

    // Indicador visual de piezas en el HUD
    const hudBricksContainer = document.querySelector('.hud-bricks');
    if (hudBricksContainer) {
      if (cfg.type === 'math_choice') {
        hudBricksContainer.innerHTML = `<span style="color:#ffd700; font-weight:bold; font-size:1.1rem;">Desafío ${levelNumber} de 5</span>`;
      } else {
        hudBricksContainer.innerHTML = `
          <div id="slot-brick-1" class="hud-brick-slot ${this.collectedCount >= 1 ? 'found' : ''} brick-red">🧱</div>
          <div id="slot-brick-2" class="hud-brick-slot ${this.collectedCount >= 2 ? 'found' : ''} brick-blue">🧱</div>
          <div id="slot-brick-3" class="hud-brick-slot ${this.collectedCount >= 3 ? 'found' : ''} brick-gold">🧱</div>
        `;
      }
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  loop() {
    if (!this.isRunning) return;
    this.update();
    this.render();
    this.animationId = requestAnimationFrame(() => this.loop());
  }

  update() {
    // 1. Movimiento jugador
    if (this.keys.left) {
      this.player.vx = -this.player.speed;
      this.player.facing = 'left';
      this.player.walkFrame += 0.2;
    } else if (this.keys.right) {
      this.player.vx = this.player.speed;
      this.player.facing = 'right';
      this.player.walkFrame += 0.2;
    } else {
      this.player.vx *= 0.6;
      if (Math.abs(this.player.vx) < 0.1) this.player.vx = 0;
    }

    this.player.vy += this.gravity;
    this.player.x += this.player.vx;

    if (this.player.x < 10) this.player.x = 10;
    if (this.player.x + this.player.width > this.width - 10) {
      this.player.x = this.width - 10 - this.player.width;
    }

    this.player.y += this.player.vy;
    this.player.grounded = false;

    // Colisión plataformas
    for (const plat of this.platforms) {
      if (
        this.player.x + this.player.width > plat.x &&
        this.player.x < plat.x + plat.w &&
        this.player.y + this.player.height >= plat.y &&
        this.player.y + this.player.height <= plat.y + 16 &&
        this.player.vy >= 0
      ) {
        this.player.y = plat.y - this.player.height;
        this.player.vy = 0;
        this.player.grounded = true;
        break;
      }
    }

    if (this.player.invulnerable > 0) this.player.invulnerable--;

    // 2. Obstáculos dinámicos
    for (const obs of this.obstacles) {
      obs.x += obs.speed * obs.dir;
      if (obs.x <= obs.minX || obs.x >= obs.maxX) obs.dir *= -1;

      if (
        this.player.invulnerable === 0 &&
        this.player.x + this.player.width > obs.x &&
        this.player.x < obs.x + obs.w &&
        this.player.y + this.player.height > obs.y &&
        this.player.y < obs.y + obs.h
      ) {
        this.playSound('hit');
        this.addFloatingText(this.player.x, this.player.y - 10, '¡Cuidado! 💥', '#ff5252');
        this.player.x = 60;
        this.player.y = 350;
        this.player.vx = 0;
        this.player.vy = 0;
        this.player.invulnerable = 35;
      }
    }

    // 3. Recolección de items
    for (const item of this.items) {
      if (!item.collected) {
        const itemW = 34, itemH = 26;
        const bobY = item.y + Math.sin(Date.now() / 250 + (item.bobOffset || 0)) * 6;

        if (
          this.player.x + this.player.width > item.x &&
          this.player.x < item.x + itemW &&
          this.player.y + this.player.height > bobY &&
          this.player.y < bobY + itemH
        ) {
          this.handleItemInteraction(item, bobY);
        }
      }
    }

    // 4. Clima: Lluvia
    if (this.theme === 'rain') {
      for (const drop of this.rainDrops) {
        drop.y += drop.speed;
        drop.x -= 1.5;
        if (drop.y > this.height) {
          drop.y = -10;
          drop.x = Math.random() * this.width + 50;
        }
      }
    }

    // Partículas y textos
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx; p.y += p.vy; p.life -= 0.04;
      if (p.life <= 0) this.particles.splice(i, 1);
    }

    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y -= 0.8; ft.alpha -= 0.025;
      if (ft.alpha <= 0) this.floatingTexts.splice(i, 1);
    }
  }

  handleItemInteraction(item, itemY) {
    const cfg = this.activeConfig;

    if (cfg.type === 'collect') {
      item.collected = true;
      this.collectedCount++;
      this.playSound('coin');
      this.createSparkles(item.x + 16, itemY + 12, item.color);
      this.addFloatingText(item.x, itemY - 10, '+1 Bloque 🧱', '#ffd700');
      this.updateHud();

      if (this.collectedCount >= this.levelGoal) {
        this.advanceToNextLevel();
      }

    } else if (cfg.type === 'filter') {
      if (item.isTarget) {
        item.collected = true;
        this.collectedCount++;
        this.playSound('coin');
        this.createSparkles(item.x + 16, itemY + 12, item.color);
        this.addFloatingText(item.x, itemY - 10, '¡Correcto! ⭐', '#00e676');
        this.updateHud();

        if (this.collectedCount >= this.levelGoal) {
          this.advanceToNextLevel();
        }
      } else {
        this.playSound('wrong');
        this.addFloatingText(item.x, itemY - 10, '¡Ese no cumple la regla! ❌', '#ff5252');
        this.player.vy = -6;
      }

    } else if (cfg.type === 'math_choice') {
      if (item.isMathTarget) {
        item.collected = true;
        this.playSound('fanfare');
        this.createSparkles(item.x + 16, itemY + 12, '#ffd700', 30);
        this.addFloatingText(item.x, itemY - 10, `¡EXCELENTE! Es ${item.val} 🌟`, '#ffd700');

        setTimeout(() => {
          this.advanceToNextLevel();
        }, 800);
      } else {
        this.playSound('wrong');
        this.addFloatingText(item.x, itemY - 10, `${item.val} no es correcto 💡`, '#ff9800');
        this.player.vy = -6;
      }
    }
  }

  advanceToNextLevel() {
    this.playSound('levelComplete');
    this.currentLevelIndex++;

    if (this.currentLevelIndex < this.totalLevels) {
      this.addFloatingText(this.width / 2 - 90, 200, `🎉 ¡Desafío ${this.currentLevelIndex} Superado!`, '#00e676');
      setTimeout(() => {
        this.loadCurrentLevel();
      }, 1000);
    } else {
      // Superó los 5 desafíos del grado
      setTimeout(() => {
        this.triggerFinalVictory();
      }, 500);
    }
  }

  triggerFinalVictory() {
    this.isVictory = true;
    const victoryOverlay = document.getElementById('victory-overlay');
    if (victoryOverlay) victoryOverlay.classList.add('visible');
    if (this.onAllCompleted) this.onAllCompleted();
  }

  addFloatingText(x, y, text, color) {
    this.floatingTexts.push({ x, y, text, color, alpha: 1.0 });
  }

  createSparkles(x, y, color, count = 16) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i;
      const speed = Math.random() * 3 + 1.5;
      this.particles.push({
        x: x, y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: color, life: 1.0, size: Math.random() * 4 + 3
      });
    }
  }

  /**
   * Renderizado general del entorno y mundo
   */
  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 1. Renderizar Entorno según tema (Día, Noche, Lluvia, Halloween)
    this.renderEnvironment();

    // 2. Plataformas
    for (const plat of this.platforms) {
      this.renderPlatform(plat);
    }

    // 3. Obstáculos
    for (const obs of this.obstacles) {
      if (obs.type === 'bat') {
        this.renderBat(obs.x, obs.y, obs.w, obs.h);
      } else {
        this.renderSlime(obs.x, obs.y, obs.w, obs.h);
      }
    }

    // 4. Bloques / Preguntas
    for (const item of this.items) {
      if (!item.collected) {
        const bobY = item.y + Math.sin(Date.now() / 250 + (item.bobOffset || 0)) * 6;
        if (item.val !== undefined) {
          this.renderBlockWithLabel(item.x, bobY, item.val, item.color);
        } else {
          this.renderLegoItem(item.x, bobY, item.color);
        }
      }
    }

    // 5. Partículas y textos
    for (const p of this.particles) {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }
    ctx.globalAlpha = 1.0;

    for (const ft of this.floatingTexts) {
      ctx.save();
      ctx.globalAlpha = ft.alpha;
      ctx.font = 'bold 16px Fredoka, sans-serif';
      ctx.fillStyle = ft.color;
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 4;
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    }

    // 6. Jugador Steve
    this.renderPlayer();

    // 7. Iluminación nocturna si es de noche
    if (this.theme === 'night') {
      this.renderNightTorchGlow();
    }
  }

  /**
   * Sistema de Entornos Dinámicos (Día, Noche, Lluvia, Halloween)
   */
  renderEnvironment() {
    const ctx = this.ctx;

    if (this.theme === 'day') {
      // ☀️ DÍA CLÁSICO MINECRAFT
      const sky = ctx.createLinearGradient(0, 0, 0, this.height);
      sky.addColorStop(0, '#4a98e8');
      sky.addColorStop(0.7, '#88beff');
      sky.addColorStop(1, '#cce3ff');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, this.width, this.height);

      // Sol cuadrado
      ctx.fillStyle = '#ffff66';
      ctx.fillRect(740, 35, 60, 60);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(750, 45, 40, 40);

      // Nubes blancas
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fillRect(80, 50, 160, 30);
      ctx.fillRect(400, 70, 200, 35);

      // Montañas verdes/azules
      ctx.fillStyle = '#455a64';
      ctx.beginPath();
      ctx.moveTo(100, 430); ctx.lineTo(240, 280); ctx.lineTo(380, 430); ctx.fill();

    } else if (this.theme === 'night') {
      // 🌙 NOCHE ESTRELLADA
      const nightSky = ctx.createLinearGradient(0, 0, 0, this.height);
      nightSky.addColorStop(0, '#0a0d1a');
      nightSky.addColorStop(0.7, '#151b33');
      nightSky.addColorStop(1, '#1e2645');
      ctx.fillStyle = nightSky;
      ctx.fillRect(0, 0, this.width, this.height);

      // Estrellas titilantes
      ctx.fillStyle = '#ffffff';
      for (const s of this.stars) {
        const twinkle = Math.sin(Date.now() / 300 + s.twinkleOffset) * 0.35 + 0.65;
        ctx.globalAlpha = twinkle;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Luna cuadrada Minecraft
      ctx.fillStyle = '#eeeeee';
      ctx.fillRect(730, 40, 55, 55);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(738, 48, 40, 40);

    } else if (this.theme === 'rain') {
      // 🌧️ LLUVIA Y TORMENTA
      const rainSky = ctx.createLinearGradient(0, 0, 0, this.height);
      rainSky.addColorStop(0, '#2d3748');
      rainSky.addColorStop(0.7, '#4a5568');
      rainSky.addColorStop(1, '#718096');
      ctx.fillStyle = rainSky;
      ctx.fillRect(0, 0, this.width, this.height);

      // Nubes oscuras de tormenta
      ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
      ctx.fillRect(40, 40, 220, 45);
      ctx.fillRect(340, 50, 280, 50);

      // Gotas de lluvia
      ctx.strokeStyle = '#90caf9';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      for (const drop of this.rainDrops) {
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 2, drop.y + drop.len);
      }
      ctx.stroke();

    } else if (this.theme === 'halloween') {
      // 🎃 HALLOWEEN (Cielo espeluznante morado/naranja)
      const spookySky = ctx.createLinearGradient(0, 0, 0, this.height);
      spookySky.addColorStop(0, '#2b0938');
      spookySky.addColorStop(0.65, '#5c1048');
      spookySky.addColorStop(1, '#bf360c');
      ctx.fillStyle = spookySky;
      ctx.fillRect(0, 0, this.width, this.height);

      // Luna de sangre cuadrada
      ctx.fillStyle = '#ff7043';
      ctx.fillRect(730, 40, 60, 60);
      ctx.fillStyle = '#ffab91';
      ctx.fillRect(738, 48, 44, 44);

      // Calabazas Jack-o'-lantern en el suelo
      this.renderPumpkin(140, 404);
      this.renderPumpkin(760, 324);
    }
  }

  renderNightTorchGlow() {
    const ctx = this.ctx;
    const px = this.player.x + this.player.width / 2;
    const py = this.player.y + this.player.height / 2;

    const rad = ctx.createRadialGradient(px, py, 40, px, py, 260);
    rad.addColorStop(0, 'rgba(255, 213, 79, 0.15)');
    rad.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  renderPumpkin(x, y) {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = '#e65100'; // Naranja calabaza
    ctx.fillRect(x, y, 26, 26);
    // Tallo
    ctx.fillStyle = '#2e7d32';
    ctx.fillRect(x + 11, y - 4, 4, 4);
    // Ojos triangulares amarillos brillantes
    ctx.fillStyle = '#ffeb3b';
    ctx.fillRect(x + 5, y + 7, 4, 5);
    ctx.fillRect(x + 17, y + 7, 4, 5);
    // Boca
    ctx.fillRect(x + 8, y + 17, 10, 4);
    ctx.restore();
  }

  renderPlatform(plat) {
    const ctx = this.ctx;
    if (plat.type === 'grass') {
      ctx.fillStyle = this.theme === 'halloween' ? '#3e2723' : '#795548';
      ctx.fillRect(plat.x, plat.y, plat.w, plat.h);

      ctx.fillStyle = this.theme === 'halloween' ? '#558b2f' : '#4caf50';
      ctx.fillRect(plat.x, plat.y, plat.w, 14);

      ctx.fillStyle = this.theme === 'halloween' ? '#33691e' : '#388e3c';
      for (let fx = plat.x; fx < plat.x + plat.w; fx += 16) {
        ctx.fillRect(fx, plat.y + 14, 8, 6);
      }
    } else if (plat.type === 'wood') {
      ctx.fillStyle = '#8d6e63';
      ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
      ctx.fillStyle = '#6d4c41';
      ctx.fillRect(plat.x, plat.y, plat.w, 6);
    } else if (plat.type === 'stone') {
      ctx.fillStyle = this.theme === 'halloween' ? '#424242' : '#757575';
      ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
      ctx.fillStyle = '#9e9e9e';
      ctx.fillRect(plat.x, plat.y, plat.w, 5);
    }
  }

  renderSlime(x, y, w, h) {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = this.theme === 'halloween' ? '#e65100' : '#4caf50';
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = this.theme === 'halloween' ? '#ffa726' : '#81c784';
    ctx.fillRect(x + 3, y + 3, w - 6, h - 6);
    ctx.fillStyle = '#1b5e20';
    ctx.fillRect(x + 5, y + 7, 5, 5);
    ctx.fillRect(x + 16, y + 7, 5, 5);
    ctx.fillRect(x + 10, y + 15, 6, 3);
    ctx.restore();
  }

  renderBat(x, y, w, h) {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = '#212121';
    ctx.fillRect(x + 8, y + 4, 12, 12);
    // Alas que aletean
    const wingOffset = Math.sin(Date.now() / 100) * 4;
    ctx.fillRect(x, y + 6 + wingOffset, 8, 8);
    ctx.fillRect(x + 20, y + 6 + wingOffset, 8, 8);
    // Ojos rojos
    ctx.fillStyle = '#f44336';
    ctx.fillRect(x + 10, y + 7, 2, 2);
    ctx.fillRect(x + 16, y + 7, 2, 2);
    ctx.restore();
  }

  renderLegoItem(x, y, color) {
    const ctx = this.ctx;
    const w = 32, h = 22;
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.fillStyle = color;
    ctx.fillRect(x, y + 5, w, h);
    ctx.fillRect(x + 5, y, 8, 5);
    ctx.fillRect(x + 19, y, 8, 5);
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.fillRect(x, y + 5, w, 3);
    ctx.restore();
  }

  renderBlockWithLabel(x, y, text, color) {
    const ctx = this.ctx;
    const size = 38;
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillRect(x, y, size, 4);
    ctx.fillStyle = '#212121';
    ctx.font = 'bold 16px Fredoka, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text.toString(), x + size / 2, y + size / 2);
    ctx.restore();
  }

  renderPlayer() {
    const ctx = this.ctx;
    const p = this.player;
    ctx.save();
    ctx.translate(p.x, p.y);

    if (p.invulnerable > 0 && Math.floor(Date.now() / 80) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }
    if (p.facing === 'left') {
      ctx.scale(-1, 1);
      ctx.translate(-p.width, 0);
    }

    // Cabeza
    ctx.fillStyle = '#c79770';
    ctx.fillRect(4, 0, 20, 16);
    ctx.fillStyle = '#4a3728';
    ctx.fillRect(4, 0, 20, 5);
    ctx.fillRect(4, 5, 4, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(15, 7, 6, 3);
    ctx.fillStyle = '#3f51b5';
    ctx.fillRect(18, 7, 3, 3);
    ctx.fillStyle = '#a1724e';
    ctx.fillRect(16, 11, 4, 2);

    // Torso
    ctx.fillStyle = '#00acc1';
    ctx.fillRect(4, 16, 20, 18);
    ctx.fillStyle = '#00838f';
    ctx.fillRect(0, 16, 5, 18);
    ctx.fillStyle = '#c79770';
    ctx.fillRect(0, 30, 5, 4);

    const legOffset = Math.sin(p.walkFrame) * 4;
    ctx.fillStyle = '#1a237e';
    ctx.fillRect(5, 34, 8, 14 + (p.grounded ? legOffset : 0));
    ctx.fillRect(15, 34, 8, 14 - (p.grounded ? legOffset : 0));

    ctx.fillStyle = '#424242';
    ctx.fillRect(5, 45, 8, 3);
    ctx.fillRect(15, 45, 8, 3);
    ctx.restore();
  }
}
