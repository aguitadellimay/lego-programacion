const fs = require('fs');
const path = require('path');

console.log('Starting build of updated algorithmsModule.js with Desafío 5 and Interactive Doors/Windows...');

// Read existing algorithmsModule.js to extract ALGORITHM_SVGS and EVERYDAY_ACTIVITIES
const currentSrc = fs.readFileSync(path.join(__dirname, '../js/algorithmsModule.js'), 'utf8');

const svgStart = currentSrc.indexOf('const ALGORITHM_SVGS = {');
const svgEnd = currentSrc.indexOf('function getBitySvg');
const svgsPart = currentSrc.substring(svgStart, svgEnd).trim();

const actStart = currentSrc.indexOf('const EVERYDAY_ACTIVITIES = {');
const actEnd = currentSrc.indexOf('const ALL_MAZES = {');
const activitiesPart = currentSrc.substring(actStart, actEnd).trim();

// Complete ALL_MAZES with Desafíos 1 through 5 for all grades
const ALL_MAZES_CODE = `const ALL_MAZES = {
  // ================= 1.º GRADO =================
  1: {
    d1_mecanico: {
      title: '¡AYUDÁ A BITY A LLEGAR AL MECÁNICO!',
      hint: 'USÁ LAS FLECHAS PARA MOVER A BITY: ARRIBA, ABAJO, IZQUIERDA Y DERECHA.',
      cols: 5, rows: 4,
      start: { x: 1, y: 1 },
      goal: { x: 3, y: 2 },
      grid: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1]
      ]
    },
    d2_caminos: {
      title: 'DESAFÍO 2: ENCONTRÁ EL CAMINO',
      hint: '¡HAY MÁS DE UN CAMINO VÁLIDO! PODÉS IR POR ARRIBA O POR EL CENTRO.',
      cols: 5, rows: 5,
      start: { x: 1, y: 1 },
      goal: { x: 3, y: 3 },
      grid: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
      ]
    },
    d3_optimizacion: {
      title: 'DESAFÍO 3: ¿PODÉS HACERLO EN MENOS PASOS?',
      hint: 'HAY UN CAMINO CORTO Y OTRO LARGO. ¡BUSCÁ EL MÁS CORTO!',
      cols: 5, rows: 5,
      optimalSteps: 4,
      start: { x: 1, y: 1 },
      goal: { x: 3, y: 3 },
      grid: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
      ]
    },
    d4_laberinto: {
      title: 'DESAFÍO 4: EL LABERINTO CLÁSICO',
      hint: 'ESQUIVÁ LOS ASTEROIDES Y LLEGÁ A LA META.',
      cols: 6, rows: 5,
      start: { x: 1, y: 1 },
      goal: { x: 4, y: 3 },
      grid: [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 1],
        [1, 1, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1]
      ]
    },
    d5_gran_desafio: {
      title: 'DESAFÍO 5: EL CASTILLO DE LAS PUERTAS MÁGICAS',
      hint: '¡ACERCATE A LAS PUERTAS Y VENTANAS PARA RESPONDER PREGUNTAS Y GANAR ESTRELLAS!',
      cols: 6, rows: 5,
      start: { x: 1, y: 1 },
      goal: { x: 4, y: 3 },
      grid: [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1]
      ],
      items: [
        { id: 'item_g1_1', type: 'door', x: 2, y: 1, name: 'PUERTA 1: ¿QUÉ ES UN ALGORITMO?' },
        { id: 'item_g1_2', type: 'window', x: 4, y: 1, name: 'VENTANA 1: ¿CUÁL ES UN ALGORITMO?' },
        { id: 'item_g1_3', type: 'door', x: 2, y: 3, name: 'PUERTA 2: ¿POR QUÉ IMPORTA EL ORDEN?' }
      ]
    }
  },

  // ================= 2.º GRADO =================
  2: {
    d1_mecanico: {
      title: '¡Ayudá a Bity a llegar al taller mecánico!',
      hint: 'Usá las flechas de dirección para avanzar paso a paso.',
      cols: 6, rows: 5,
      start: { x: 1, y: 1 },
      goal: { x: 4, y: 2 },
      grid: [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 1],
        [1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1]
      ]
    },
    d2_caminos: {
      title: 'Desafío 2: Múltiples caminos hacia la meta',
      hint: 'Hay dos rutas posibles. Probá cuál preferís recorrer.',
      cols: 6, rows: 5,
      start: { x: 1, y: 1 },
      goal: { x: 4, y: 3 },
      grid: [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1]
      ]
    },
    d3_optimizacion: {
      title: 'Desafío 3: Comparación de algoritmos',
      hint: '¿Podés llegar a la meta usando la menor cantidad de bloques?',
      cols: 6, rows: 5,
      optimalSteps: 5,
      start: { x: 1, y: 1 },
      goal: { x: 4, y: 3 },
      grid: [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1]
      ]
    },
    d4_laberinto: {
      title: 'Desafío 4: El laberinto misterioso',
      hint: 'El camino tiene varias curvas y obstáculos. ¡Pensá antes de avanzar!',
      cols: 6, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 4, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 1],
        [1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1]
      ]
    },
    d5_gran_desafio: {
      title: 'Desafío 5: El Castillo de las Puertas y Ventanas',
      hint: 'Explorá el laberinto, abrí puertas y descubrí secretos de los algoritmos para ganar estrellas.',
      cols: 7, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 5, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ],
      items: [
        { id: 'item_g2_1', type: 'door', x: 3, y: 1, name: 'Puerta Encantada' },
        { id: 'item_g2_2', type: 'window', x: 1, y: 3, name: 'Ventana Luminosa' },
        { id: 'item_g2_3', type: 'pumpkin', x: 3, y: 3, name: 'Calabaza Mágica' }
      ]
    }
  },

  // ================= 3.º GRADO =================
  3: {
    d1_mecanico: {
      title: 'Ruta de Mantenimiento con Obstáculos',
      hint: 'Navegá con precisión evitando asteroides espaciales.',
      cols: 6, rows: 5,
      start: { x: 1, y: 1 },
      goal: { x: 4, y: 3 },
      grid: [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 1],
        [1, 1, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1]
      ]
    },
    d2_caminos: {
      title: 'Desafío 2: Análisis de Caminos Alternativos',
      hint: 'Existen dos bifurcaciones válidas con diferente longitud.',
      cols: 7, rows: 5,
      start: { x: 1, y: 1 },
      goal: { x: 5, y: 3 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d3_optimizacion: {
      title: 'Desafío 3: Eficiencia y Reducción de Bloques',
      hint: 'Elige el camino más corto para minimizar recursos.',
      cols: 7, rows: 5,
      optimalSteps: 6,
      start: { x: 1, y: 1 },
      goal: { x: 5, y: 3 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d4_laberinto: {
      title: 'Desafío 4: Laberinto de Estrategia',
      hint: 'Planificá toda la secuencia antes de ejecutar los bloques.',
      cols: 7, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 5, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d5_gran_desafio: {
      title: 'Desafío 5: El Laberinto de los Desafíos Misteriosos',
      hint: 'Diversos caminos con obstáculos. Resolvé las preguntas en puertas y cofres para ganar estrellas.',
      cols: 8, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 6, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ],
      items: [
        { id: 'item_g3_1', type: 'door', x: 3, y: 1, name: 'Puerta del Orden' },
        { id: 'item_g3_2', type: 'window', x: 1, y: 3, name: 'Ventana Cotidiana' },
        { id: 'item_g3_3', type: 'chest', x: 4, y: 3, name: 'Cofre del Saber' },
        { id: 'item_g3_4', type: 'pumpkin', x: 6, y: 2, name: 'Calabaza Misteriosa' }
      ]
    }
  },

  // ================= 4.º GRADO =================
  4: {
    d1_mecanico: {
      title: 'Depuración y Ruta de Servicio',
      hint: 'Superá los asteroides intermedios con instrucciones precisas.',
      cols: 7, rows: 5,
      start: { x: 1, y: 1 },
      goal: { x: 5, y: 3 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d2_caminos: {
      title: 'Desafío 2: Comparación de Complejidad de Rutas',
      hint: 'Dos caminos disjuntos: uno de 6 pasos y otro de 8 pasos.',
      cols: 7, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 5, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d3_optimizacion: {
      title: 'Desafío 3: Optimización Algorítmica',
      hint: 'Buscá la ruta mínima estricta para resolver el problema.',
      cols: 7, rows: 6,
      optimalSteps: 7,
      start: { x: 1, y: 1 },
      goal: { x: 5, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d4_laberinto: {
      title: 'Desafío 4: Laberinto con Múltiples Obstáculos',
      hint: 'Pensá tu algoritmo paso a paso considerando los posibles choques.',
      cols: 8, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 6, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 0, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d5_gran_desafio: {
      title: 'Desafío 5: La Gran Fortaleza de los Algoritmos',
      hint: 'Rutas con múltiples bifurcaciones. Superá las 4 puertas y ventanas para ganar estrellas y llegar a la meta.',
      cols: 9, rows: 7,
      start: { x: 1, y: 1 },
      goal: { x: 7, y: 5 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      items: [
        { id: 'item_g4_1', type: 'door', x: 3, y: 1, name: 'Puerta de Depuración' },
        { id: 'item_g4_2', type: 'window', x: 1, y: 3, name: 'Ventana de Errores' },
        { id: 'item_g4_3', type: 'chest', x: 5, y: 3, name: 'Cofre de Eficiencia' },
        { id: 'item_g4_4', type: 'pumpkin', x: 7, y: 2, name: 'Calabaza Estratégica' }
      ]
    }
  },

  // ================= 5.º GRADO =================
  5: {
    d1_mecanico: {
      title: 'Navegación Espacial Avanzada',
      hint: 'Ruta con campo de asteroides densos. Programá con precisión quirúrgica.',
      cols: 8, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 6, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1],
        [1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d2_caminos: {
      title: 'Desafío 2: Topología y Bifurcaciones Estratégicas',
      hint: 'Compara tres caminos diferentes con distintas cantidades de bloques.',
      cols: 8, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 6, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d3_optimizacion: {
      title: 'Desafío 3: Análisis de Rendimiento y Código Mínimo',
      hint: 'Identificá la solución algorítmicamente óptima.',
      cols: 8, rows: 6,
      optimalSteps: 8,
      start: { x: 1, y: 1 },
      goal: { x: 6, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d4_laberinto: {
      title: 'Desafío 4: Gran Laberinto de Algorítmica Pura',
      hint: 'Bifurcaciones complejas y callejones sin salida. Construí tu algoritmo con máxima atención.',
      cols: 9, rows: 7,
      start: { x: 1, y: 1 },
      goal: { x: 7, y: 5 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d5_gran_desafio: {
      title: 'Desafío 5: El Desafío Cumbre de Eficiencia y Conocimiento',
      hint: 'Misión cumbre: laberinto extenso con 5 desafíos interactivos. Planificá tu ruta y optimizá cada decisión.',
      cols: 10, rows: 8,
      start: { x: 1, y: 1 },
      goal: { x: 8, y: 6 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      items: [
        { id: 'item_g5_1', type: 'door', x: 3, y: 1, name: 'Puerta de la Complejidad' },
        { id: 'item_g5_2', type: 'window', x: 1, y: 3, name: 'Ventana del Determinismo' },
        { id: 'item_g5_3', type: 'chest', x: 6, y: 3, name: 'Cofre de la Descomposición' },
        { id: 'item_g5_4', type: 'pumpkin', x: 3, y: 5, name: 'Calabaza de Finitud' },
        { id: 'item_g5_5', type: 'door', x: 8, y: 3, name: 'Puerta de Optimización' }
      ]
    }
  }
};`;

// Complete Question Bank mapping item ID to question, shuffled options, and hints
const QUESTIONS_CODE = `// ============================================================
// 4. BANCO DE PREGUNTAS EDUCATIVAS DE ALGORITMOS (PUERTAS Y VENTANAS)
// ============================================================
const ALGORITHM_QUESTIONS = {
  // ----------------- 1.º GRADO -----------------
  item_g1_1: {
    question: '¿QUÉ ES UN ALGORITMO?',
    options: [
      { text: 'UN CONJUNTO DE PASOS ORDENADOS PARA REALIZAR UNA TAREA', isCorrect: true },
      { text: 'UNA SOLA INSTRUCCIÓN SUELTA', isCorrect: false },
      { text: 'UNA FOTO DE UNA COMPUTADORA', isCorrect: false }
    ],
    hint: '¡RECORDÁ! UN ALGORITMO ES COMO UNA RECETA CON MUCHOS PASOS ORDENADOS.'
  },
  item_g1_2: {
    question: '¿CUÁL DE ESTAS OPCIONES ES UN ALGORITMO?',
    options: [
      { text: 'PRENDER LA COMPUTADORA, CONECTARSE A INTERNET Y REVISAR EL CORREO', isCorrect: true },
      { text: 'HACER UN SOLO DIBUJO RÁPIDO', isCorrect: false },
      { text: 'DEJAR TODO DESORDENADO SIN PLAN', isCorrect: false }
    ],
    hint: 'UN ALGORITMO TIENE VARIOS PASOS SEGUIDOS PARA LOGRAR UN OBJETIVO.'
  },
  item_g1_3: {
    question: '¿POR QUÉ ES IMPORTANTE EL ORDEN?',
    options: [
      { text: 'PORQUE LOS PASOS DEBEN SEGUIR UNA SECUENCIA PARA LOGRAR EL OBJETIVO', isCorrect: true },
      { text: 'PORQUE QUEDA MÁS LINDO NADA MÁS', isCorrect: false },
      { text: 'NO IMPORTA EL ORDEN DE LOS PASOS', isCorrect: false }
    ],
    hint: 'SI CAMBIAMOS EL ORDEN DE LOS PASOS, ¡EL RESULTADO PUEDE SALIR MAL!'
  },

  // ----------------- 2.º GRADO -----------------
  item_g2_1: {
    question: '¿Qué es un algoritmo en programación?',
    options: [
      { text: 'Un conjunto de pasos ordenados para resolver un problema o tarea', isCorrect: true },
      { text: 'Una tecla del teclado de la computadora', isCorrect: false },
      { text: 'Un dibujo de un robot sin instrucciones', isCorrect: false }
    ],
    hint: 'Pensá en cómo guiamos a Bity paso a paso con las flechas de dirección.'
  },
  item_g2_2: {
    question: '¿Qué pasa si cambiamos el orden de las instrucciones en una receta?',
    options: [
      { text: 'El resultado no será el esperado y la receta saldrá mal', isCorrect: true },
      { text: 'Todo saldrá igual de bien por arte de magia', isCorrect: false },
      { text: 'La computadora arreglará los ingredientes sola', isCorrect: false }
    ],
    hint: '¡No podemos hornear una torta antes de mezclar la harina y los huevos!'
  },
  item_g2_3: {
    question: '¿Cuál de estas secuencias es un algoritmo completo para lavarse los dientes?',
    options: [
      { text: 'Poner pasta en el cepillo, cepillar los dientes y enjuagar con agua', isCorrect: true },
      { text: 'Mirar el cepillo de dientes en el vaso', isCorrect: false },
      { text: 'Enjuagarse la boca antes de buscar la pasta', isCorrect: false }
    ],
    hint: 'Un algoritmo completo tiene un inicio, pasos claros y cumple su tarea.'
  },

  // ----------------- 3.º GRADO -----------------
  item_g3_1: {
    question: '¿Por qué las computadoras necesitan instrucciones tan precisas?',
    options: [
      { text: 'Porque solo ejecutan con exactitud lo que les indicamos en el código', isCorrect: true },
      { text: 'Porque pueden adivinar lo que pensamos sin explicárselo', isCorrect: false },
      { text: 'Porque se mueven solas al azar cuando nadie las mira', isCorrect: false }
    ],
    hint: 'Bity no adivina a dónde querés ir: debés indicarle cada flecha en el orden exacto.'
  },
  item_g3_2: {
    question: 'Al preparar un jugo de frutas natural, ¿cuál es el orden correcto?',
    options: [
      { text: 'Lavar la fruta, cortarla con cuidado, exprimirla y servir en un vaso', isCorrect: true },
      { text: 'Tomar del vaso vacío, tirar las semillas y luego cortar la fruta', isCorrect: false },
      { text: 'Exprimir la fruta sin lavarla y tirar el vaso al piso', isCorrect: false }
    ],
    hint: 'El orden lógico garantiza que el resultado sea seguro y delicioso.'
  },
  item_g3_3: {
    question: '¿Qué es una "instrucción" elemental dentro de un algoritmo?',
    options: [
      { text: 'Una acción clara e individual que indica qué hacer en ese paso', isCorrect: true },
      { text: 'Un adorno decorativo en la pantalla del juego', isCorrect: false },
      { text: 'El nombre del fabricante de la computadora', isCorrect: false }
    ],
    hint: 'Cada flecha que presionás (Arriba, Abajo, etc.) es una instrucción individual.'
  },
  item_g3_4: {
    question: '¿Cuál de las siguientes acciones NO representa un algoritmo?',
    options: [
      { text: 'Mirar una pared sin realizar ningún plan ni acción', isCorrect: true },
      { text: 'La secuencia de pasos para cruzar la calle con precaución', isCorrect: false },
      { text: 'Las instrucciones para resolver un rompecabezas paso a paso', isCorrect: false }
    ],
    hint: 'Un algoritmo requiere acciones planificadas para alcanzar un resultado.'
  },

  // ----------------- 4.º GRADO -----------------
  item_g4_1: {
    question: '¿Qué significa "depurar" o hacer "debugging" de un algoritmo?',
    options: [
      { text: 'Encontrar y corregir errores en las instrucciones para que funcione correctamente', isCorrect: true },
      { text: 'Borrar todo el código y abandonar la tarea', isCorrect: false },
      { text: 'Cambiar el color de fondo para ocultar los problemas', isCorrect: false }
    ],
    hint: 'Si Bity choca con un asteroide, revisamos el programa y corregimos la flecha equivocada.'
  },
  item_g4_2: {
    question: 'Si dos algoritmos resuelven el mismo problema, ¿cuál se considera mejor?',
    options: [
      { text: 'El que alcanza la meta con menos pasos y optimiza recursos de memoria y tiempo', isCorrect: true },
      { text: 'El que utiliza la mayor cantidad de instrucciones posibles sin importar el orden', isCorrect: false },
      { text: 'El que tarda más tiempo en completarse', isCorrect: false }
    ],
    hint: 'La eficiencia computacional busca resolver el problema con el menor costo posible.'
  },
  item_g4_3: {
    question: '¿Por qué decimos que todo algoritmo debe ser "finito"?',
    options: [
      { text: 'Porque debe tener un número determinado de pasos y finalizar con éxito', isCorrect: true },
      { text: 'Porque debe tener únicamente una sola instrucción', isCorrect: false },
      { text: 'Porque los robots se apagan si leen mucho código', isCorrect: false }
    ],
    hint: 'Un programa que nunca termina entra en un bucle infinito y bloquea el sistema.'
  },
  item_g4_4: {
    question: '¿Qué rol cumple una condición o decisión en un flujo algorítmico?',
    options: [
      { text: 'Permite evaluar el entorno y bifurcar el camino según se cumpla o no una condición', isCorrect: true },
      { text: 'Obliga a reiniciar la computadora siempre en el mismo paso', isCorrect: false },
      { text: 'Elimina todas las instrucciones anteriores sin aviso', isCorrect: false }
    ],
    hint: 'Por ejemplo: "SI hay un asteroide adelante, doblar; SI NO, avanzar derecho".'
  },

  // ----------------- 5.º GRADO -----------------
  item_g5_1: {
    question: '¿Qué propiedad garantiza que un algoritmo sea "determinista"?',
    options: [
      { text: 'Que para las mismas entradas, siempre produce exactamente los mismos resultados paso a paso', isCorrect: true },
      { text: 'Que produce un resultado completamente aleatorio cada vez que se ejecuta', isCorrect: false },
      { text: 'Que solo funciona si la computadora tiene conexión a internet de alta velocidad', isCorrect: false }
    ],
    hint: 'La reproducibilidad y previsibilidad son esenciales en los algoritmos científicos.'
  },
  item_g5_2: {
    question: '¿En qué consiste la técnica de "descomposición algorítmica"?',
    options: [
      { text: 'En dividir un problema grande y complejo en subproblemas más simples y manejables', isCorrect: true },
      { text: 'En romper el hardware de la máquina en piezas pequeñas', isCorrect: false },
      { text: 'En mezclar todas las instrucciones sin ningún orden', isCorrect: false }
    ],
    hint: 'Dividir para reinar: resolvemos cada tramo del laberinto antes de ensamblar la ruta completa.'
  },
  item_g5_3: {
    question: 'En análisis computacional, ¿qué evalúa la complejidad temporal de un algoritmo?',
    options: [
      { text: 'Cómo escala la cantidad de operaciones requeridas a medida que crece el tamaño del problema', isCorrect: true },
      { text: 'La hora exacta en que el alumno inició la sesión en la plataforma', isCorrect: false },
      { text: 'La velocidad de tipeo del programador en el teclado', isCorrect: false }
    ],
    hint: 'Medimos el costo en número de instrucciones fundamentales en función de las variables de entrada.'
  },
  item_g5_4: {
    question: '¿Qué caracteriza a un algoritmo generalizable y modular?',
    options: [
      { text: 'Que su estructura lógica puede reutilizarse para resolver una familia entera de problemas afines', isCorrect: true },
      { text: 'Que está programado para funcionar una sola vez y luego autodestruirse', isCorrect: false },
      { text: 'Que no utiliza ninguna variable ni regla lógica estándar', isCorrect: false }
    ],
    hint: 'Un algoritmo de navegación eficaz funciona en cualquier mapa, no solo en uno particular.'
  },
  item_g5_5: {
    question: 'Al comparar dos algoritmos válidos para el mismo objetivo, ¿por qué preferimos la solución óptima?',
    options: [
      { text: 'Porque minimiza el uso de CPU y memoria y simplifica el mantenimiento del código', isCorrect: true },
      { text: 'Porque está prohibido usar más de tres líneas de código por ley', isCorrect: false },
      { text: 'No existe ninguna diferencia práctica entre ejecutar 5 pasos o 500 pasos', isCorrect: false }
    ],
    hint: 'En sistemas a gran escala, la optimización ahorra energía, tiempo y memoria de procesamiento.'
  }
};

// Algoritmo de aleatorización Fisher-Yates (garantiza opciones distribuidas al azar)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}`;

// AlgorithmsModule class implementation
const CLASS_CODE = `  class AlgorithmsModule {
    constructor() {
      this.currentGrade = 1;
      this.currentStep = 1;
      this.totalSteps = 8;
      this.completedSteps = new Set();
      this.answeredItems = new Set();
      this.starsCount = 0;
      
      // Estado de actividades cotidianas
      this.selectedEverydayAct = 'cafe';
      this.everydayState = {
        cafe: { placed: [], selectedBlock: null, completed: false, errorMsg: null },
        jugo: { placed: [], selectedBlock: null, completed: false, errorMsg: null },
        mochila: { placed: [], selectedBlock: null, completed: false, errorMsg: null },
        habitacion: { placed: [], selectedBlock: null, completed: false, errorMsg: null }
      };

      // Estado de programación de laberintos
      this.program = [];
      this.bityPos = { x: 1, y: 1 };
      this.bityFacing = 'right';
      this.isMoving = false;
      this.inputQueue = [];
      this.mazeResult = null; // null | 'reached' | 'collision'

      // Transición animada
      this.isTransitioning = false;

      // Estado de Pregunta de Parte 1
      this.orderQuestionAnswered = false;
      this.orderQuestionAnswer = null;

      // Pista interactiva de Bity
      this.activeHint = null;
    }

    // Adaptación textual según grado: 1.º Grado TODO EN MAYÚSCULAS
    txt(str) {
      if (!str) return '';
      if (this.currentGrade === 1) {
        return str.toUpperCase();
      }
      return str;
    }

    playSound(name) {
      try {
        if (typeof window !== 'undefined' && window.MagicAudioEngine) {
          if (name === 'victory' && typeof window.MagicAudioEngine.playVictory === 'function') {
            window.MagicAudioEngine.playVictory();
            return;
          }
          if (name === 'pop' && typeof window.MagicAudioEngine.playPop === 'function') {
            window.MagicAudioEngine.playPop();
            return;
          }
          if (name === 'trash' && typeof window.MagicAudioEngine.playTrash === 'function') {
            window.MagicAudioEngine.playTrash();
            return;
          }
          if (name === 'error' && typeof window.MagicAudioEngine.playError === 'function') {
            window.MagicAudioEngine.playError();
            return;
          }
          if (typeof window.MagicAudioEngine.playClick === 'function') {
            window.MagicAudioEngine.playClick();
            return;
          }
        }
      } catch (e) {
        // Audio fallback safe
      }
    }

    startClass(grade = 1, classNum = 1) {
      this.currentGrade = parseInt(grade) || 1;
      this.loadSavedProgress();
      this.resetMazeState();
      this.orderQuestionAnswered = false;
      this.orderQuestionAnswer = null;
      this.activeHint = null;
      this.isTransitioning = false;
      this.inputQueue = [];
      this.isMoving = false;

      // Iniciar en el primer paso pendiente o en el paso 1
      if (!this.currentStep || this.currentStep < 1 || this.currentStep > this.totalSteps) {
        this.currentStep = 1;
      }

      this.render();
      window.scrollTo(0, 0);
    }

    loadSavedProgress() {
      try {
        const raw = localStorage.getItem(\`lego_algorithms_class1_progress_g\${this.currentGrade}\`);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed.completedSteps)) {
            this.completedSteps = new Set(parsed.completedSteps);
          }
          if (Array.isArray(parsed.answeredItems)) {
            this.answeredItems = new Set(parsed.answeredItems);
          }
        } else {
          this.completedSteps = new Set();
          this.answeredItems = new Set();
        }
      } catch (e) {
        this.completedSteps = new Set();
        this.answeredItems = new Set();
      }
      this.starsCount = this.answeredItems.size;
    }

    // Guardar progreso SIN salir del módulo (NO llama a renderSyllabus)
    saveProgress() {
      try {
        const isCompleted = this.completedSteps.size >= this.totalSteps;
        const data = {
          grade: this.currentGrade,
          classNum: 1,
          completedSteps: Array.from(this.completedSteps),
          answeredItems: Array.from(this.answeredItems),
          stars: this.answeredItems.size,
          isCompleted: isCompleted,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem(\`lego_algorithms_class1_progress_g\${this.currentGrade}\`, JSON.stringify(data));
      } catch (e) {}
    }

    getStarsCount() {
      return this.answeredItems.size;
    }

    selectStep(stepNum) {
      const oldModal = document.getElementById('alg-transition-modal');
      if (oldModal) oldModal.remove();
      const oldQModal = document.getElementById('alg-question-modal');
      if (oldQModal) oldQModal.remove();

      this.isTransitioning = false;
      this.inputQueue = [];
      this.isMoving = false;
      this.currentStep = stepNum;
      this.activeHint = null;
      this.playSound('click');
      
      // Configurar actividad cotidiana activa según el paso
      if (stepNum === 2) {
        this.selectedEverydayAct = 'cafe';
      } else if (stepNum === 3) {
        this.selectedEverydayAct = 'mochila';
      } else if (stepNum >= 4) {
        this.program = [];
        this.resetMazeState();
      }

      this.render();
      window.scrollTo(0, 0);
    }

    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.selectStep(this.currentStep + 1);
      }
    }

    prevStep() {
      if (this.currentStep > 1) {
        this.selectStep(this.currentStep - 1);
      }
    }

    showAnimatedTransition(msg, callback) {
      const oldModal = document.getElementById('alg-transition-modal');
      if (oldModal) oldModal.remove();

      this.isTransitioning = true;
      this.playSound('victory');

      const modal = document.createElement('div');
      modal.id = 'alg-transition-modal';
      modal.className = 'alg-transition-modal animate-fade-in';
      modal.innerHTML = \`
        <div class="alg-transition-card animate-scale-up">
          <div class="transition-stars">✨ ⭐ 🌟 ⭐ ✨</div>
          <div class="transition-avatar">\${getBitySvg('celebrating')}</div>
          <h3 class="transition-text">\${this.txt(msg)}</h3>
          <div class="transition-bar"><div class="transition-bar-fill"></div></div>
        </div>
      \`;
      document.body.appendChild(modal);

      setTimeout(() => {
        if (modal && modal.parentNode) modal.remove();
        this.isTransitioning = false;
        if (typeof callback === 'function') callback();
      }, 2200);
    }

    // ============================================================
    // ACTIVIDADES COTIDIANAS (PASOS 2 Y 3)
    // ============================================================
    switchEverydayAct(actKey) {
      const oldModal = document.getElementById('alg-transition-modal');
      if (oldModal) oldModal.remove();
      this.isTransitioning = false;

      this.selectedEverydayAct = actKey;
      this.playSound('click');
      this.render();
    }

    selectAvailableBlock(blockId) {
      const st = this.everydayState[this.selectedEverydayAct];
      if (st.placed.includes(blockId) || st.completed) return;

      st.selectedBlock = (st.selectedBlock === blockId) ? null : blockId;
      st.errorMsg = null;
      this.playSound('pop');
      this.render();
    }

    placeBlockInAlgorithm() {
      const st = this.everydayState[this.selectedEverydayAct];
      if (!st.selectedBlock || st.completed) return;

      const actConfig = EVERYDAY_ACTIVITIES[this.selectedEverydayAct];
      const maxSlots = actConfig.expectedSequence.length;

      if (st.placed.length >= maxSlots) {
        st.errorMsg = this.txt('Ya colocaste todos los bloques disponibles.');
        this.playSound('error');
        this.render();
        return;
      }

      st.placed.push(st.selectedBlock);
      st.selectedBlock = null;
      st.errorMsg = null;
      this.playSound('click');
      this.render();
    }

    removePlacedBlock(index) {
      const st = this.everydayState[this.selectedEverydayAct];
      if (st.completed) return;
      if (index >= 0 && index < st.placed.length) {
        st.placed.splice(index, 1);
        st.errorMsg = null;
        this.playSound('trash');
        this.render();
      }
    }

    movePlacedBlock(index, direction) {
      const st = this.everydayState[this.selectedEverydayAct];
      if (st.completed) return;
      const newIndex = index + direction;
      if (newIndex >= 0 && newIndex < st.placed.length) {
        const temp = st.placed[index];
        st.placed[index] = st.placed[newIndex];
        st.placed[newIndex] = temp;
        st.errorMsg = null;
        this.playSound('click');
        this.render();
      }
    }

    verifyEverydayAlgorithm() {
      const st = this.everydayState[this.selectedEverydayAct];
      const actConfig = EVERYDAY_ACTIVITIES[this.selectedEverydayAct];
      const expected = actConfig.expectedSequence;

      if (st.placed.length < expected.length) {
        st.errorMsg = this.txt(\`Faltan pasos. Este algoritmo necesita \${expected.length} pasos ordenados.\`);
        this.playSound('error');
        this.render();
        return;
      }

      let isCorrect = true;
      for (let i = 0; i < expected.length; i++) {
        if (st.placed[i] !== expected[i]) {
          isCorrect = false;
          break;
        }
      }

      if (isCorrect) {
        st.completed = true;
        st.errorMsg = null;
        this.playSound('victory');
        
        // Verificar si completó el paso 2 (cafe y jugo) o paso 3 (mochila y habitacion)
        if (this.currentStep === 2) {
          if (this.everydayState.cafe.completed && this.everydayState.jugo.completed) {
            this.completedSteps.add(2);
            this.saveProgress();
            setTimeout(() => {
              this.showAnimatedTransition('¡GENIAL! COMPLETAS LA PARTE 2. PREPARANDO LA SIGUIENTE ACTIVIDAD...', () => {
                this.selectStep(3);
              });
            }, 600);
          } else {
            this.render();
            setTimeout(() => {
              this.switchEverydayAct('jugo');
            }, 900);
          }
        } else if (this.currentStep === 3) {
          if (this.everydayState.mochila.completed && this.everydayState.habitacion.completed) {
            this.completedSteps.add(3);
            this.saveProgress();
            setTimeout(() => {
              this.showAnimatedTransition('¡FABULOSO! ACTIVIDADES ORDENADAS. PREPARANDO A BITY PARA PROGRAMAR...', () => {
                this.selectStep(4);
              });
            }, 600);
          } else {
            this.render();
            setTimeout(() => {
              this.switchEverydayAct('habitacion');
            }, 900);
          }
        }
      } else {
        st.errorMsg = this.txt('El orden no es correcto o hay un paso que no corresponde. ¡Revisá y volvé a intentar!');
        this.playSound('error');
        this.render();
      }
    }

    resetEverydayActivity() {
      const st = this.everydayState[this.selectedEverydayAct];
      st.placed = [];
      st.selectedBlock = null;
      st.completed = false;
      st.errorMsg = null;
      this.playSound('trash');
      this.render();
    }

    // ============================================================
    // PROGRAMACIÓN DE LABERINTOS CON MOVIMIENTO DIRECTO (PASOS 4 A 8)
    // ============================================================
    getCurrentMazeKey() {
      if (this.currentStep === 4) return 'd1_mecanico';
      if (this.currentStep === 5) return 'd2_caminos';
      if (this.currentStep === 6) return 'd3_optimizacion';
      if (this.currentStep === 7) return 'd4_laberinto';
      if (this.currentStep === 8) return 'd5_gran_desafio';
      return 'd1_mecanico';
    }

    getCurrentMazeConfig() {
      const gradeMazes = ALL_MAZES[this.currentGrade] || ALL_MAZES[1];
      const key = this.getCurrentMazeKey();
      return gradeMazes[key];
    }

    resetMazeState() {
      const cfg = this.getCurrentMazeConfig();
      if (cfg) {
        this.bityPos = { x: cfg.start.x, y: cfg.start.y };
      }
      this.bityFacing = 'right';
      this.isMoving = false;
      this.mazeResult = null;
      this.inputQueue = [];
    }

    getInteractiveItemAt(x, y) {
      const cfg = this.getCurrentMazeConfig();
      if (!cfg || !Array.isArray(cfg.items)) return null;
      return cfg.items.find(it => it.x === x && it.y === y) || null;
    }

    getItemById(itemId) {
      const cfg = this.getCurrentMazeConfig();
      if (!cfg || !Array.isArray(cfg.items)) return null;
      return cfg.items.find(it => it.id === itemId) || null;
    }

    // Manejo de entrada de dirección: movimiento inmediato con cola fluida
    handleDirectionInput(dir) {
      if (this.isTransitioning) return;
      if (this.mazeResult === 'reached') return;

      // Si hay un modal de pregunta abierto, no aceptar movimientos
      if (document.getElementById('alg-question-modal')) return;

      this.inputQueue.push(dir);
      this.processMovementQueue();
    }

    processMovementQueue() {
      if (this.isMoving || this.inputQueue.length === 0) return;
      if (document.getElementById('alg-question-modal')) return;

      const dir = this.inputQueue.shift();
      this.isMoving = true;

      const cfg = this.getCurrentMazeConfig();
      let nx = this.bityPos.x;
      let ny = this.bityPos.y;

      if (dir === 'up') ny--;
      else if (dir === 'down') ny++;
      else if (dir === 'left') nx--;
      else if (dir === 'right') nx++;

      this.bityFacing = dir;

      // Colisión con límites o paredes (1 = pared)
      if (nx < 0 || nx >= cfg.cols || ny < 0 || ny >= cfg.rows || cfg.grid[ny][nx] === 1) {
        this.playSound('error');
        this.animateCollision(dir, () => {
          this.isMoving = false;
          this.processMovementQueue();
        });
        return;
      }

      // Movimiento válido
      const oldPos = { ...this.bityPos };
      this.bityPos = { x: nx, y: ny };
      this.program.push(dir);
      this.playSound('click');

      this.animateStepMove(oldPos, this.bityPos, dir, () => {
        // 1. Verificar elementos interactivos (puertas, ventanas, cofres, calabazas)
        const interactiveItem = this.getInteractiveItemAt(nx, ny);
        if (interactiveItem && !this.answeredItems.has(interactiveItem.id)) {
          this.inputQueue = [];
          this.isMoving = false;
          this.triggerQuestionModal(interactiveItem);
          return;
        }

        // 2. Verificar meta
        if (nx === cfg.goal.x && ny === cfg.goal.y) {
          this.handleGoalReached();
          return;
        }

        this.isMoving = false;
        this.processMovementQueue();
      });
    }

    animateStepMove(oldPos, newPos, dir, callback) {
      const oldCell = document.querySelector(\`.maze-cell[data-x="\${oldPos.x}"][data-y="\${oldPos.y}"]\`);
      const newCell = document.querySelector(\`.maze-cell[data-x="\${newPos.x}"][data-y="\${newPos.y}"]\`);

      if (oldCell && newCell) {
        let sprite = oldCell.querySelector('.bity-cell-sprite');
        if (!sprite) {
          sprite = document.createElement('div');
          sprite.className = \`bity-cell-sprite facing-\${dir}\`;
          sprite.innerHTML = getBitySvg('happy');
        }

        // Desplazamiento visual suave
        let startTransform = '';
        if (dir === 'right') startTransform = 'translateX(-100%)';
        else if (dir === 'left') startTransform = 'translateX(100%)';
        else if (dir === 'down') startTransform = 'translateY(-100%)';
        else if (dir === 'up') startTransform = 'translateY(100%)';

        sprite.className = \`bity-cell-sprite facing-\${dir}\`;
        sprite.style.transform = startTransform;
        sprite.style.transition = 'none';

        newCell.appendChild(sprite);
        void sprite.offsetHeight; // Forzar reflow

        sprite.style.transition = 'transform 0.16s cubic-bezier(0.25, 1, 0.5, 1)';
        sprite.style.transform = 'translate(0, 0)';

        // Actualizar lista de instrucciones en Zona 3 de forma directa
        this.appendInstructionDOM(dir, this.program.length);

        setTimeout(() => {
          sprite.style.transition = '';
          if (typeof callback === 'function') callback();
        }, 160);
      } else {
        if (typeof callback === 'function') callback();
      }
    }

    animateCollision(dir, callback) {
      const cell = document.querySelector(\`.maze-cell[data-x="\${this.bityPos.x}"][data-y="\${this.bityPos.y}"]\`);
      const sprite = cell ? cell.querySelector('.bity-cell-sprite') : null;

      if (sprite) {
        sprite.innerHTML = getBitySvg('alert');
        sprite.classList.add(\`bity-bump-\${dir}\`);
        if (cell) cell.classList.add('cell-collision-halo');

        setTimeout(() => {
          sprite.classList.remove(\`bity-bump-\${dir}\`);
          if (cell) cell.classList.remove('cell-collision-halo');
          sprite.innerHTML = getBitySvg('happy');
          if (typeof callback === 'function') callback();
        }, 220);
      } else {
        if (typeof callback === 'function') callback();
      }
    }

    appendInstructionDOM(dir, index) {
      const container = document.querySelector('.program-blocks-container');
      if (!container) return;

      let list = container.querySelector('.program-list');
      if (!list) {
        container.innerHTML = '<div class="program-list"></div>';
        list = container.querySelector('.program-list');
      }

      const badge = document.createElement('div');
      badge.className = 'program-step-badge animate-scale-up';
      badge.innerHTML = \`
        <span class="badge-num">\${index}.</span>
        <span class="badge-arrow">\${dir === 'up' ? '⬆️' : (dir === 'down' ? '⬇️' : (dir === 'left' ? '⬅️' : '➡️'))}</span>
        <span class="badge-name">\${this.txt(dir.toUpperCase())}</span>
      \`;
      list.appendChild(badge);

      container.scrollTop = container.scrollHeight;

      const tag = document.querySelector('.maze-zone-program .zone-tag');
      if (tag) {
        tag.textContent = \`📜 \${this.txt('ZONA 3: PROGRAMA')} (\${this.program.length} \${this.txt('instrucciones')})\`;
      }
    }

    // ============================================================
    // MODAL DE PREGUNTAS EN PUERTAS Y VENTANAS (CON SHUFFLE ALEATORIO)
    // ============================================================
    triggerQuestionModal(item) {
      this.playSound('pop');
      this.inputQueue = [];
      this.isMoving = false;

      const qData = ALGORITHM_QUESTIONS[item.id];
      if (!qData) return;

      // Aleatorizar opciones con Fisher-Yates (la respuesta correcta nunca queda fija)
      const shuffledOptions = shuffleArray(qData.options);

      const oldModal = document.getElementById('alg-question-modal');
      if (oldModal) oldModal.remove();

      const itemEmoji = item.type === 'door' ? '🚪' : (item.type === 'window' ? '🪟' : (item.type === 'chest' ? '🎁' : '🎃'));

      const modal = document.createElement('div');
      modal.id = 'alg-question-modal';
      modal.className = 'alg-question-modal-backdrop animate-fade-in';
      modal.innerHTML = \`
        <div class="alg-question-dialog animate-scale-up" role="dialog" aria-modal="true">
          <div class="q-dialog-header">
            <div class="q-dialog-badge">\${itemEmoji} \${this.txt(item.name || 'DESAFÍO MÁGICO')}</div>
            <div class="q-dialog-stars">⭐ <span>\${this.getStarsCount()}</span></div>
          </div>

          <div class="q-dialog-avatar">
            \${getBitySvg('happy')}
          </div>

          <h3 class="q-dialog-question">\${this.txt(qData.question)}</h3>
          
          <div id="q-feedback-box" class="q-feedback-box" style="display:none;"></div>

          <div class="q-dialog-options" id="q-options-container">
            \${shuffledOptions.map((opt, idx) => \`
              <button class="btn-q-option" type="button" data-correct="\${opt.isCorrect ? '1' : '0'}" onclick="window.algorithmsModule.handleQuestionAnswer('\${item.id}', \${opt.isCorrect ? 'true' : 'false'}, this)">
                <span class="q-opt-letter">\${String.fromCharCode(65 + idx)}</span>
                <span class="q-opt-text">\${this.txt(opt.text)}</span>
              </button>
            \`).join('')}
          </div>

          <div class="q-dialog-actions" id="q-dialog-actions" style="display:none;">
            <button class="btn-q-continue" type="button" onclick="window.algorithmsModule.closeQuestionModal()">
              \${this.txt('¡CONTINUAR EL CAMINO!')} ➔
            </button>
          </div>
        </div>
      \`;
      document.body.appendChild(modal);
    }

    handleQuestionAnswer(itemId, isCorrect, btnEl) {
      const item = this.getItemById(itemId);
      const qData = ALGORITHM_QUESTIONS[itemId];
      const feedbackBox = document.getElementById('q-feedback-box');
      const actionsBox = document.getElementById('q-dialog-actions');
      const optionsContainer = document.getElementById('q-options-container');

      if (isCorrect) {
        this.playSound('victory');
        btnEl.classList.add('q-opt-correct');

        // Otorgar estrella solo una vez por elemento
        const isNewStar = !this.answeredItems.has(itemId);
        this.answeredItems.add(itemId);
        this.saveProgress();

        // Deshabilitar todas las opciones
        if (optionsContainer) {
          const allBtns = optionsContainer.querySelectorAll('.btn-q-option');
          allBtns.forEach(b => b.disabled = true);
        }

        // Actualizar visualizador de estrellas
        this.updateStarsDisplay();

        // Retroalimentación positiva
        if (feedbackBox) {
          feedbackBox.className = 'q-feedback-box q-feedback-success animate-scale-up';
          feedbackBox.style.display = 'block';
          feedbackBox.innerHTML = \`
            <div class="q-fb-icon">🎉 ⭐ 🎉</div>
            <h4>\${this.txt('¡CORRECTO!')} \${isNewStar ? '+1 ⭐ ' + this.txt('GANASTE UNA ESTRELLA') : ''}</h4>
            <p>\${this.txt('¡Muy bien pensado! Desbloqueaste este punto del laberinto.')}</p>
          \`;
        }

        // Actualizar casilla en el laberinto
        if (item) {
          const cell = document.querySelector(\`.maze-cell[data-x="\${item.x}"][data-y="\${item.y}"]\`);
          if (cell) {
            cell.classList.add('cell-item-unlocked');
            const iconSpan = cell.querySelector('.cell-item-icon');
            if (iconSpan) {
              iconSpan.textContent = '⭐';
              iconSpan.className = 'cell-item-icon item-unlocked-glow';
            }
          }
        }

        if (actionsBox) actionsBox.style.display = 'flex';

      } else {
        this.playSound('error');
        btnEl.classList.add('q-opt-incorrect');

        if (feedbackBox) {
          feedbackBox.className = 'q-feedback-box q-feedback-hint animate-fade-in';
          feedbackBox.style.display = 'block';
          feedbackBox.innerHTML = \`
            <div class="q-fb-icon">💡</div>
            <h4>\${this.txt('¡PISTA DE BITY!')}</h4>
            <p>\${this.txt(qData.hint || 'Revisá los pasos y pensá qué respuesta tiene más sentido.')}</p>
            <button class="btn-q-retry" type="button" onclick="window.algorithmsModule.retryQuestion('\${itemId}')">
              🔄 \${this.txt('INTENTAR DE NUEVO')}
            </button>
          \`;
        }
      }
    }

    retryQuestion(itemId) {
      const item = this.getItemById(itemId);
      if (item) {
        this.triggerQuestionModal(item);
      }
    }

    closeQuestionModal() {
      const modal = document.getElementById('alg-question-modal');
      if (modal) modal.remove();
      this.isMoving = false;
      this.processMovementQueue();
    }

    updateStarsDisplay() {
      const starCountEl = document.getElementById('alg-star-count');
      if (starCountEl) {
        starCountEl.textContent = this.getStarsCount();
        starCountEl.classList.add('animate-pop');
        setTimeout(() => starCountEl.classList.remove('animate-pop'), 400);
      }
      const modalStarsEl = document.querySelector('.q-dialog-stars span');
      if (modalStarsEl) {
        modalStarsEl.textContent = this.getStarsCount();
      }
    }

    handleGoalReached() {
      this.mazeResult = 'reached';
      this.completedSteps.add(this.currentStep);
      this.saveProgress();
      this.playSound('victory');
      this.inputQueue = [];
      this.isMoving = false;

      // Celebración visual en Bity
      const cell = document.querySelector(\`.maze-cell[data-x="\${this.bityPos.x}"][data-y="\${this.bityPos.y}"]\`);
      const sprite = cell ? cell.querySelector('.bity-cell-sprite') : null;
      if (sprite) {
        sprite.innerHTML = getBitySvg('celebrating');
        sprite.classList.add('bity-spin-celebration');
      }

      // Transición progresiva según el paso actual
      if (this.currentStep === 4) {
        setTimeout(() => {
          this.showAnimatedTransition('¡BITY LLEGÓ AL TALLER MECÁNICO! PREPARANDO EL DESAFÍO 2...', () => {
            this.selectStep(5);
          });
        }, 700);
      } else if (this.currentStep === 5) {
        setTimeout(() => {
          this.showAnimatedTransition('¡CAMINO ENCONTRADO! PREPARANDO EL DESAFÍO DE OPTIMIZACIÓN...', () => {
            this.selectStep(6);
          });
        }, 700);
      } else if (this.currentStep === 6) {
        // En el Desafío 3, mostrar la tarjeta de optimización y reflexión
        setTimeout(() => {
          const mount = document.querySelector('.alg-maze-section');
          if (mount) {
            const oldCard = document.querySelector('.comparison-reflection-card');
            if (oldCard) oldCard.remove();
            
            const cardDiv = document.createElement('div');
            cardDiv.innerHTML = this.renderOptimizationCard().trim();
            mount.appendChild(cardDiv.firstElementChild);
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }
        }, 300);
      } else if (this.currentStep === 7) {
        // En el Desafío 4, transición animada al Gran Desafío 5
        setTimeout(() => {
          this.showAnimatedTransition('¡DESAFÍO 4 SUPERADO! PREPARANDO EL GRAN CASTILLO DE LAS PUERTAS Y VENTANAS ENCANTADAS...', () => {
            this.selectStep(8);
          });
        }, 700);
      } else if (this.currentStep === 8) {
        // En el Desafío 5, ¡Gran Celebración Final de Halloween!
        setTimeout(() => {
          const mount = document.querySelector('.alg-maze-section');
          if (mount) {
            const oldCard = document.querySelector('.final-celebration-card');
            if (oldCard) oldCard.remove();

            const cardDiv = document.createElement('div');
            cardDiv.innerHTML = this.renderFinalCelebration().trim();
            mount.appendChild(cardDiv.firstElementChild);
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }
        }, 300);
      }
    }

    // Reiniciar posición del laberinto sin parpadear la pantalla
    resetMaze() {
      if (this.isTransitioning) return;
      this.inputQueue = [];
      this.isMoving = false;
      this.program = [];
      this.resetMazeState();
      this.playSound('click');

      const boardWrapper = document.querySelector('.maze-grid-wrapper');
      if (boardWrapper) {
        boardWrapper.innerHTML = this.renderMazeGrid(this.getCurrentMazeConfig());
      }
      const progContainer = document.querySelector('.program-blocks-container');
      if (progContainer) {
        progContainer.innerHTML = \`
          <div class="empty-program-notice">
            <span>👈</span>
            <p>\${this.txt('Presioná las flechas para mover a Bity inmediatamente.')}</p>
          </div>
        \`;
      }
      const tag = document.querySelector('.maze-zone-program .zone-tag');
      if (tag) {
        tag.textContent = \`📜 \${this.txt('ZONA 3: PROGRAMA')} (0 \${this.txt('instrucciones')})\`;
      }

      const compCard = document.querySelector('.comparison-reflection-card');
      if (compCard) compCard.remove();
      const celebCard = document.querySelector('.final-celebration-card');
      if (celebCard) celebCard.remove();
    }

    // ============================================================
    // RENDERIZADORES DE VISTA
    // ============================================================
    render() {
      const mount = document.getElementById('algorithms-content-mount');
      if (!mount) return;

      mount.innerHTML = \`
        <div class="alg-fullscreen-layout \${this.currentGrade === 1 ? 'grade-1-uppercase' : ''}">
          \${this.renderTopBar()}
          \${this.renderStepPills()}
          <main class="alg-main-body">
            \${this.renderCurrentStepContent()}
          </main>
        </div>
      \`;
    }

    renderTopBar() {
      return \`
        <header class="alg-header-bar">
          <div class="alg-header-left">
            <button class="btn-alg-back" type="button" onclick="window.algorithmsModule.exitModule()" title="\${this.txt('Volver a Programación')}">
              <span class="btn-icon">⬅️</span>
              <span class="btn-text">\${this.txt('Volver')}</span>
            </button>
            <div class="alg-header-title-box">
              <span class="alg-header-sub">\${this.txt('INFORMÁTICA MÁGICA')} • \${this.currentGrade}.º \${this.txt('GRADO')}</span>
              <h1 class="alg-header-title">\${this.txt('Clase N.º 1: ¿Qué es un Algoritmo?')}</h1>
            </div>
          </div>
          
          <div class="alg-header-right">
            <div class="alg-stars-badge animate-fade-in" title="\${this.txt('Estrellas Mágicas ganadas')}">
              <span class="star-icon">⭐</span>
              <span class="star-count" id="alg-star-count">\${this.getStarsCount()}</span>
              <span class="star-lbl">\${this.txt('ESTRELLAS')}</span>
            </div>

            <div class="alg-progress-pill">
              <span class="prog-label">\${this.txt('Paso')} \${this.currentStep} \${this.txt('de')} \${this.totalSteps}</span>
              <div class="prog-track">
                <div class="prog-bar" style="width: \${(this.currentStep / this.totalSteps) * 100}%;"></div>
              </div>
            </div>
          </div>
        </header>
      \`;
    }

    renderStepPills() {
      const stepNames = [
        { num: 1, label: this.txt('1. ¿Qué es?') },
        { num: 2, label: this.txt('2. Bloques I') },
        { num: 3, label: this.txt('3. Bloques II') },
        { num: 4, label: this.txt('4. Bity Desafío 1') },
        { num: 5, label: this.txt('5. Caminos') },
        { num: 6, label: this.txt('6. Optimizar') },
        { num: 7, label: this.txt('7. Laberinto 4') },
        { num: 8, label: this.txt('8. Gran Desafío ⭐') }
      ];

      return \`
        <nav class="alg-steps-nav">
          <div class="alg-steps-scroll">
            \${stepNames.map(s => \`
              <button class="alg-step-tab \${this.currentStep === s.num ? 'active' : ''} \${this.completedSteps.has(s.num) ? 'completed' : ''}"
                type="button"
                onclick="window.algorithmsModule.selectStep(\${s.num})">
                <span class="tab-indicator">\${this.completedSteps.has(s.num) ? '✓' : s.num}</span>
                <span class="tab-label">\${s.label}</span>
              </button>
            \`).join('')}
          </div>
        </nav>
      \`;
    }

    renderCurrentStepContent() {
      if (this.currentStep === 1) return this.renderStep1();
      if (this.currentStep === 2 || this.currentStep === 3) return this.renderStepEveryday();
      if (this.currentStep >= 4 && this.currentStep <= 8) return this.renderStepMaze();
      return '';
    }

    // ------------------------------------------------------------
    // PARTE 1: ¿QUÉ ES UN ALGORITMO?
    // ------------------------------------------------------------
    renderStep1() {
      return \`
        <section class="alg-section alg-step1-section animate-fade-in">
          <!-- DEFINICIÓN DIDÁCTICA ILUSTRADA -->
          <div class="alg-card alg-definition-card animate-scale-up" style="margin-bottom: 22px;">
            <div class="definition-header-row">
              <span class="definition-badge">💡 \${this.txt('CONCEPTO FUNDAMENTAL')}</span>
              <h2 class="definition-title">\${this.txt('¿QUÉ ES UN ALGORITMO?')}</h2>
            </div>
            
            <p class="definition-main-quote">
              "\${this.txt('Un algoritmo es un conjunto de pasos ordenados que seguimos para resolver un problema o realizar una tarea')}".
            </p>

            <div class="definition-illustration-wrapper" style="text-align: center; margin: 16px 0;">
              \${ALGORITHM_SVGS.definicion_algoritmo_pasos || ''}
            </div>

            <p class="definition-sub-quote">
              "\${this.txt('Cada paso es una instrucción y debemos respetar el orden para lograr nuestro objetivo')}".
            </p>
          </div>

          <div class="alg-bity-speech-card">
            <div class="speech-avatar">\${getBitySvg('happy')}</div>
            <div class="speech-bubble">
              <h3 class="speech-title">\${this.txt('¡Hola! Soy Bity, tu compañero de programación.')}</h3>
              <p class="speech-p">
                \${this.txt('¿Sabías que todos los días seguimos algoritmos sin darnos cuenta? Un algoritmo es una lista de pasos ordenados para resolver un problema o lograr una meta.')}
              </p>
            </div>
          </div>

          <!-- ESCENARIO ILUSTRADO: IR AL ALMACÉN -->
          <div class="alg-card alg-story-card">
            <div class="card-header-pill">
              <span class="pill-icon">🛒</span>
              <span class="pill-text">\${this.txt('MIRA ESTA SITUACIÓN COTIDIANA: IR AL ALMACÉN A COMPRAR')}</span>
            </div>

            <div class="story-grid-ordered">
              <div class="story-step-item">
                <span class="step-num">1</span>
                <div class="step-svg-box">\${ALGORITHM_SVGS.almacen_1_bolsa}</div>
                <p class="step-caption">\${this.txt('Tomar la bolsa y el dinero')}</p>
              </div>

              <div class="story-arrow">➔</div>

              <div class="story-step-item">
                <span class="step-num">2</span>
                <div class="step-svg-box">\${ALGORITHM_SVGS.almacen_2_salir}</div>
                <p class="step-caption">\${this.txt('Salir de casa con cuidado')}</p>
              </div>

              <div class="story-arrow">➔</div>

              <div class="story-step-item">
                <span class="step-num">3</span>
                <div class="step-svg-box">\${ALGORITHM_SVGS.almacen_3_camino}</div>
                <p class="step-caption">\${this.txt('Caminar hasta el almacén')}</p>
              </div>

              <div class="story-arrow">➔</div>

              <div class="story-step-item">
                <span class="step-num">4</span>
                <div class="step-svg-box">\${ALGORITHM_SVGS.almacen_4_productos}</div>
                <p class="step-caption">\${this.txt('Elegir los productos')}</p>
              </div>

              <div class="story-arrow">➔</div>

              <div class="story-step-item">
                <span class="step-num">5</span>
                <div class="step-svg-box">\${ALGORITHM_SVGS.almacen_5_pagar}</div>
                <p class="step-caption">\${this.txt('Pagar en la caja')}</p>
              </div>

              <div class="story-arrow">➔</div>

              <div class="story-step-item">
                <span class="step-num">6</span>
                <div class="step-svg-box">\${ALGORITHM_SVGS.almacen_6_regresar}</div>
                <p class="step-caption">\${this.txt('Volver a casa con las compras')}</p>
              </div>
            </div>
          </div>

          <!-- CONTRASTE DIDÁCTICO: ¿QUÉ PASA SI CAMBIAMOS EL ORDEN? -->
          <div class="alg-card alg-contrast-card">
            <div class="card-header-pill alert-pill">
              <span class="pill-icon">⚠️</span>
              <span class="pill-text">\${this.txt('¿QUÉ PASA SI CAMBIAMOS EL ORDEN DE LOS PASOS?')}</span>
            </div>

            <div class="contrast-columns">
              <div class="contrast-col ordered-col">
                <h4 class="col-title">✅ \${this.txt('CON EL ORDEN CORRECTO')}</h4>
                <div class="col-svg-box">\${ALGORITHM_SVGS.caminar}</div>
                <p class="col-desc">\${this.txt('¡Misión cumplida! Llegamos con la bolsa llena, pagamos correctamente y disfrutamos la merienda.')}</p>
              </div>

              <div class="contrast-col disordered-col">
                <h4 class="col-title">❌ \${this.txt('SI DESORDENAMOS LOS PASOS')}</h4>
                <div class="col-svg-box">\${ALGORITHM_SVGS.secuencia_desordenada}</div>
                <p class="col-desc">\${this.txt('¿Podríamos pagar antes de elegir los productos? ¿O volver a casa antes de salir? ¡No tendría sentido y el algoritmo fallaría!')}</p>
              </div>
            </div>

            <!-- PREGUNTA INTERACTIVA CON FEEDBACK INMEDIATO -->
            <div class="order-question-box">
              <h4 class="question-title">🤔 \${this.txt('PREGUNTA RÁPIDA: ¿POR QUÉ ES FUNDAMENTAL EL ORDEN EN UN ALGORITMO?')}</h4>
              
              <div class="question-options">
                <button class="btn-question-opt \${this.orderQuestionAnswer === 'correct' ? 'opt-correct' : ''}" 
                  type="button" 
                  onclick="window.algorithmsModule.handleOrderQuestion(true)">
                  <span>A)</span> \${this.txt('Porque si los pasos no están ordenados, no logramos el resultado esperado.')}
                </button>
                <button class="btn-question-opt \${this.orderQuestionAnswer === 'wrong' ? 'opt-wrong' : ''}" 
                  type="button" 
                  onclick="window.algorithmsModule.handleOrderQuestion(false)">
                  <span>B)</span> \${this.txt('El orden no importa, las computadoras adivinan lo que queremos hacer.')}
                </button>
              </div>

              \${this.orderQuestionAnswered ? \`
                <div class="question-feedback animate-scale-up \${this.orderQuestionAnswer === 'correct' ? 'feedback-success' : 'feedback-error'}">
                  \${this.orderQuestionAnswer === 'correct' ? \`
                    <p>🎉 \${this.txt('¡EXCELENTE! Exactamente: las computadoras y los robots no pueden adivinar. Necesitan instrucciones en el orden exacto.')}</p>
                  \` : \`
                    <p>💡 \${this.txt('¡Piénsalo de nuevo! Recordá qué pasa si intentás pagar antes de elegir los productos en el almacén.')}</p>
                  \`}
                </div>
              \` : ''}
            </div>
          </div>

          <!-- BOTÓN CONTINUAR -->
          <div class="step-footer-actions">
            <button class="btn-alg-continue" type="button" onclick="window.algorithmsModule.nextStep()">
              \${this.txt('CONTINUAR A LA PARTE 2: CONSTRUCCIÓN CON BLOQUES')} ➔
            </button>
          </div>
        </section>
      \`;
    }

    handleOrderQuestion(isCorrect) {
      this.orderQuestionAnswered = true;
      if (isCorrect) {
        this.orderQuestionAnswer = 'correct';
        this.completedSteps.add(1);
        this.saveProgress();
        this.playSound('victory');
      } else {
        this.orderQuestionAnswer = 'wrong';
        this.playSound('error');
      }
      this.render();
    }

    // ------------------------------------------------------------
    // PARTE 2: CONSTRUCCIÓN CON BLOQUES (Pasos 2 y 3)
    // ------------------------------------------------------------
    renderStepEveryday() {
      const actKey = this.selectedEverydayAct;
      const actConfig = EVERYDAY_ACTIVITIES[actKey];
      const st = this.everydayState[actKey];

      const isStep2 = this.currentStep === 2;
      const availableActs = isStep2 ? ['cafe', 'jugo'] : ['mochila', 'habitacion'];

      return \`
        <section class="alg-section alg-everyday-section animate-fade-in">
          <!-- SELECTOR DE ACTIVIDAD -->
          <div class="everyday-tabs-bar">
            \${availableActs.map(key => {
              const cfg = EVERYDAY_ACTIVITIES[key];
              const isDone = this.everydayState[key].completed;
              return \`
                <button class="btn-everyday-tab \${actKey === key ? 'active' : ''} \${isDone ? 'done' : ''}"
                  type="button"
                  onclick="window.algorithmsModule.switchEverydayAct('\${key}')">
                  <span class="tab-emoji">\${cfg.emoji}</span>
                  <span class="tab-txt">\${this.txt(cfg.title)}</span>
                  \${isDone ? '<span class="tab-check">✓</span>' : ''}
                </button>
              \`;
            }).join('')}
          </div>

          <!-- CONSIGNAS VISUALES -->
          <div class="everyday-instructions-card">
            <div class="inst-icon">\${actConfig.emoji}</div>
            <div class="inst-text">
              <h3 class="inst-title">\${this.txt(actConfig.title)}</h3>
              <p class="inst-desc">\${this.txt(actConfig.desc)}</p>
              <p class="inst-alert">⚠️ \${this.txt('¡ATENCIÓN! Hay bloques tramposos que no corresponden. Elegí solo los necesarios y ordenalos correctamente.')}</p>
            </div>
          </div>

          <!-- ÁREA DE TRABAJO EN 2 PANELES -->
          <div class="everyday-workspace-grid">
            <!-- PANEL IZQUIERDO: BLOQUES DISPONIBLES -->
            <div class="everyday-panel pool-panel">
              <div class="panel-header">
                <span class="panel-tag">📦 \${this.txt('BLOQUES DISPONIBLES')}</span>
                <span class="panel-hint">\${this.txt('Tocá un bloque y agregalo:')}</span>
              </div>

              <div class="available-blocks-list">
                \${actConfig.availableBlocks.map(block => {
                  const isPlaced = st.placed.includes(block.id);
                  const isSelected = st.selectedBlock === block.id;

                  return \`
                    <button class="everyday-block-card \${isPlaced ? 'block-placed' : ''} \${isSelected ? 'block-selected' : ''}"
                      type="button"
                      \${isPlaced || st.completed ? 'disabled' : ''}
                      onclick="window.algorithmsModule.selectAvailableBlock('\${block.id}')">
                      <div class="block-svg-thumb">\${ALGORITHM_SVGS[block.svg] || '📦'}</div>
                      <span class="block-text">\${this.txt(block.text)}</span>
                      \${isPlaced ? '<span class="placed-badge">✓ Usado</span>' : ''}
                    </button>
                  \`;
                }).join('')}
              </div>

              <button class="btn-add-block-to-algo \${st.selectedBlock ? 'btn-active-add' : ''}"
                type="button"
                \${!st.selectedBlock || st.completed ? 'disabled' : ''}
                onclick="window.algorithmsModule.placeBlockInAlgorithm()">
                <span>➕</span> \${this.txt('AGREGAR BLOQUE AL ALGORITMO')}
              </button>
            </div>

            <!-- PANEL DERECHO: TU ALGORITMO ORDENADO -->
            <div class="everyday-panel sequence-panel">
              <div class="panel-header">
                <span class="panel-tag">📜 \${this.txt('TU ALGORITMO (PASOS ORDENADOS)')}</span>
                <span class="panel-counter">\${st.placed.length} / \${actConfig.expectedSequence.length} \${this.txt('pasos')}</span>
              </div>

              <div class="algorithm-slots-container">
                \${st.placed.length === 0 ? \`
                  <div class="empty-sequence-notice">
                    <span class="notice-icon">👈</span>
                    <p>\${this.txt('Seleccioná un bloque del panel izquierdo y presioná "AGREGAR BLOQUE" para armar la secuencia.')}</p>
                  </div>
                \` : \`
                  <div class="placed-blocks-list">
                    \${st.placed.map((blockId, idx) => {
                      const block = actConfig.availableBlocks.find(b => b.id === blockId);
                      return \`
                        <div class="placed-step-card animate-scale-up">
                          <span class="step-index">\${idx + 1}</span>
                          <div class="placed-step-svg">\${ALGORITHM_SVGS[block.svg] || '📦'}</div>
                          <span class="placed-step-text">\${this.txt(block.text)}</span>

                          <div class="step-order-controls">
                            \${idx > 0 && !st.completed ? \`
                              <button class="btn-step-order" type="button" onclick="window.algorithmsModule.movePlacedBlock(\${idx}, -1)" title="Subir">▲</button>
                            \` : ''}
                            \${idx < st.placed.length - 1 && !st.completed ? \`
                              <button class="btn-step-order" type="button" onclick="window.algorithmsModule.movePlacedBlock(\${idx}, 1)" title="Bajar">▼</button>
                            \` : ''}
                            \${!st.completed ? \`
                              <button class="btn-step-remove" type="button" onclick="window.algorithmsModule.removePlacedBlock(\${idx})" title="Quitar">✕</button>
                            \` : ''}
                          </div>
                        </div>
                      \`;
                    }).join('')}
                  </div>
                \`}
              </div>

              <!-- FEEDBACK DE ERROR O ÉXITO -->
              \${st.errorMsg ? \`
                <div class="everyday-feedback-box feedback-error animate-scale-up">
                  <span>⚠️</span> \${st.errorMsg}
                </div>
              \` : ''}

              \${st.completed ? \`
                <div class="everyday-feedback-box feedback-success animate-scale-up">
                  <span>🎉</span> \${this.txt('¡EXCELENTE! El algoritmo es perfecto y el orden es el correcto.')}
                </div>
              \` : ''}

              <!-- BOTONES DE ACCIÓN -->
              <div class="everyday-panel-actions">
                <button class="btn-everyday-reset" type="button" onclick="window.algorithmsModule.resetEverydayActivity()">
                  <span>🔄</span> \${this.txt('REINICIAR')}
                </button>
                <button class="btn-everyday-verify \${st.completed ? 'btn-done' : ''}" 
                  type="button" 
                  \${st.completed ? 'disabled' : ''}
                  onclick="window.algorithmsModule.verifyEverydayAlgorithm()">
                  <span>\${st.completed ? '✅' : '🚀'}</span> \${st.completed ? this.txt('¡COMPLETADO!') : this.txt('VERIFICAR ALGORITMO')}
                </button>
              </div>
            </div>
          </div>
        </section>
      \`;
    }

    // ------------------------------------------------------------
    // PARTES 3 Y 4: DESAFÍOS DE PROGRAMACIÓN CON BITY (Laberintos)
    // ------------------------------------------------------------
    renderStepMaze() {
      const cfg = this.getCurrentMazeConfig();
      const challengeNum = this.currentStep - 3;
      const totalChallenges = 5;

      return \`
        <section class="alg-section alg-maze-section animate-fade-in">
          <div class="maze-header-card">
            <div class="maze-header-content">
              <span class="challenge-badge">🚀 \${this.txt('DESAFÍO')} \${challengeNum} \${this.txt('DE')} \${totalChallenges}\${challengeNum === 5 ? ' ⭐ ' + this.txt('GRAN DESAFÍO CUMBRE') : ''}</span>
              <h2 class="challenge-title">\${this.txt(cfg.title)}</h2>
              <p class="challenge-hint">\${this.txt(cfg.hint)}</p>
            </div>
            <div class="maze-header-avatar">\${getBitySvg(this.mazeResult === 'reached' ? 'celebrating' : 'happy')}</div>
          </div>

          <div class="maze-coding-layout">
            <!-- ZONA 1: TABLERO / LABERINTO -->
            <div class="maze-zone-board">
              <div class="zone-tag">🗺️ \${this.txt('ZONA 1: LABERINTO')}</div>
              <div class="maze-grid-wrapper" style="--cols: \${cfg.cols}; --rows: \${cfg.rows};">
                \${this.renderMazeGrid(cfg)}
              </div>
              <div class="maze-legend">
                <span>🤖 \${this.txt('Bity')}</span>
                <span>\${this.currentStep === 4 ? '🔧 ' + this.txt('Mecánico') : '⭐ ' + this.txt('Meta')}</span>
                <span>🪨 \${this.txt('Pared / Asteroide')}</span>
                \${cfg.items && cfg.items.length > 0 ? \`
                  <span>🚪 \${this.txt('Puerta')}</span>
                  <span>🪟 \${this.txt('Ventana')}</span>
                  <span>⭐ \${this.txt('Estrellas')}</span>
                \` : ''}
              </div>
            </div>

            <!-- ZONA 2: PALETA DE MOVIMIENTO INMEDIATO -->
            <div class="maze-zone-palette">
              <div class="zone-tag">🕹️ \${this.txt('ZONA 2: CONTROL')}</div>
              <p class="palette-hint">\${this.txt('Presioná las flechas para mover a Bity inmediatamente:')}</p>
              
              <div class="palette-buttons-grid">
                <button class="btn-dir-block btn-dir-up" type="button" onclick="window.algorithmsModule.handleDirectionInput('up')">
                  <span class="dir-icon">⬆️</span>
                  <span class="dir-text">\${this.txt('ARRIBA')}</span>
                </button>
                <div class="palette-row-middle">
                  <button class="btn-dir-block btn-dir-left" type="button" onclick="window.algorithmsModule.handleDirectionInput('left')">
                    <span class="dir-icon">⬅️</span>
                    <span class="dir-text">\${this.txt('IZQUIERDA')}</span>
                  </button>
                  <button class="btn-dir-block btn-dir-right" type="button" onclick="window.algorithmsModule.handleDirectionInput('right')">
                    <span class="dir-icon">➡️</span>
                    <span class="dir-text">\${this.txt('DERECHA')}</span>
                  </button>
                </div>
                <button class="btn-dir-block btn-dir-down" type="button" onclick="window.algorithmsModule.handleDirectionInput('down')">
                  <span class="dir-icon">⬇️</span>
                  <span class="dir-text">\${this.txt('ABAJO')}</span>
                </button>
              </div>
            </div>

            <!-- ZONA 3: REGISTRO DEL PROGRAMA EJECUTADO -->
            <div class="maze-zone-program">
              <div class="zone-tag">📜 \${this.txt('ZONA 3: PROGRAMA')} (\${this.program.length} \${this.txt('instrucciones')})</div>
              
              <div class="program-blocks-container">
                \${this.program.length === 0 ? \`
                  <div class="empty-program-notice">
                    <span>👈</span>
                    <p>\${this.txt('Presioná las flechas para mover a Bity inmediatamente.')}</p>
                  </div>
                \` : \`
                  <div class="program-list">
                    \${this.program.map((dir, idx) => \`
                      <div class="program-step-badge">
                        <span class="badge-num">\${idx + 1}.</span>
                        <span class="badge-arrow">\${dir === 'up' ? '⬆️' : (dir === 'down' ? '⬇️' : (dir === 'left' ? '⬅️' : '➡️'))}</span>
                        <span class="badge-name">\${this.txt(dir.toUpperCase())}</span>
                      </div>
                    \`).join('')}
                  </div>
                \`}
              </div>

              <!-- Control de Reinicio -->
              <div class="program-controls-row">
                <button class="btn-action-reset" type="button" onclick="window.algorithmsModule.resetMaze()">
                  <span>🔄</span> \${this.txt('REINICIAR POSICIÓN')}
                </button>
              </div>
            </div>
          </div>
        </section>
      \`;
    }

    renderMazeGrid(cfg) {
      let html = '';
      for (let r = 0; r < cfg.rows; r++) {
        for (let c = 0; c < cfg.cols; c++) {
          const isWall = cfg.grid[r][c] === 1;
          const isStart = r === cfg.start.y && c === cfg.start.x;
          const isGoal = r === cfg.goal.y && c === cfg.goal.x;
          const isBity = r === this.bityPos.y && c === this.bityPos.x;
          const item = cfg.items ? cfg.items.find(it => it.x === c && it.y === r) : null;
          const isUnlocked = item && this.answeredItems.has(item.id);

          let cellClass = isWall ? 'cell-wall' : 'cell-path';
          if (isStart) cellClass += ' cell-start';
          if (isGoal) cellClass += ' cell-goal';
          if (item) {
            cellClass += \` cell-interactive-item cell-item-\${item.type}\`;
            if (isUnlocked) cellClass += ' cell-item-unlocked';
          }

          let itemEmoji = '';
          if (item) {
            if (isUnlocked) {
              itemEmoji = item.type === 'door' ? '🚪⭐' : (item.type === 'window' ? '🪟⭐' : (item.type === 'chest' ? '🎁⭐' : '🎃⭐'));
            } else {
              itemEmoji = item.type === 'door' ? '🚪' : (item.type === 'window' ? '🪟' : (item.type === 'chest' ? '🎁' : '🎃'));
            }
          }

          html += \`
            <div class="maze-cell \${cellClass}" data-x="\${c}" data-y="\${r}" \${item ? \`title="\${item.name || ''}"\` : ''}>
              \${isWall ? '<span class="cell-obstacle">🪨</span>' : ''}
              \${item && !isBity ? \`<span class="cell-item-icon \${isUnlocked ? 'item-unlocked-glow' : 'item-pulse'}">\${itemEmoji}</span>\` : ''}
              \${isGoal ? (this.currentStep === 4 ? '<span class="cell-goal-icon">🔧</span>' : '<span class="cell-goal-icon">⭐</span>') : ''}
              \${isBity ? \`
                <div class="bity-cell-sprite facing-\${this.bityFacing}">
                  \${getBitySvg(this.mazeResult === 'reached' ? 'celebrating' : 'happy')}
                </div>
              \` : ''}
            </div>
          \`;
        }
      }
      return html;
    }

    renderOptimizationCard() {
      const cfg = this.getCurrentMazeConfig();
      const usedSteps = this.program.length;
      const optimal = cfg.optimalSteps || 4;

      return \`
        <div class="alg-card comparison-reflection-card animate-scale-up">
          <div class="comp-badge">📊 \${this.txt('REFLEXIÓN PEDAGÓGICA')}</div>
          <h3 class="comp-title">\${this.txt('¿PODRÍAS LLEGAR A LA META UTILIZANDO MENOS INSTRUCCIONES?')}</h3>
          
          <div class="comp-stats-row">
            <div class="stat-box stat-student">
              <div class="stat-number">\${usedSteps}</div>
              <div class="stat-label">\${this.txt('Tus instrucciones')}</div>
            </div>
            <div class="stat-vs">VS</div>
            <div class="stat-box stat-optimal">
              <div class="stat-number">\${optimal}</div>
              <div class="stat-label">\${this.txt('Camino óptimo')}</div>
            </div>
          </div>

          <div class="comp-message-box">
            <div class="comp-avatar">\${getBitySvg('happy')}</div>
            <div class="comp-text">
              <p>
                \${usedSteps === optimal ? 
                  this.txt('¡FANTÁSTICO! Encontraste el camino más corto posible. Tu algoritmo es 100% eficiente.') :
                  this.txt('¡Muy bien! Lograste resolver el laberinto. Pero en programación, resolver un problema usando menos pasos ahorra tiempo y memoria. ¿Te animás a buscar el camino más corto?')
                }
              </p>
            </div>
          </div>

          <div class="comp-buttons-row">
            <button class="btn-alg-reset" type="button" onclick="window.algorithmsModule.resetMaze()">
              <span>🔄</span> \${this.txt('PROBAR OTRO CAMINO')}
            </button>
            <button class="btn-alg-continue" type="button" onclick="window.algorithmsModule.showAnimatedTransition('¡INCREÍBLE! PREPARANDO EL LABERINTO 4...', () => window.algorithmsModule.selectStep(7))">
              \${this.txt('CONTINUAR')} ➔
            </button>
          </div>
        </div>
      \`;
    }

    renderFinalCelebration() {
      const totalStars = this.getStarsCount();

      return \`
        <div class="alg-card final-celebration-card animate-scale-up">
          <div class="celebration-confetti">✨ 🦇 ⭐ 🎃 🏆 🎃 ⭐ 🦇 ✨</div>
          
          <!-- AMBIENTACIÓN INMERSIVA DE HALLOWEEN -->
          <div class="halloween-celebration-hero">
            <div class="halloween-spooky-scene">
              <div class="halloween-moon"></div>
              <div class="halloween-bats">🦇 🦇</div>
              <div class="halloween-castle">🏰</div>
            </div>
            
            <div class="halloween-stars-banner">
              ⭐ \${this.txt('RECOLECTASTE')} \${totalStars} \${this.txt('ESTRELLAS MÁGICAS EN EL CASTILLO')} ⭐
            </div>
          </div>

          <h2 class="celebration-title">🎃 \${this.txt('¡FELICITACIONES, GRAN PROGRAMADOR/A!')} 🎃</h2>
          <p class="celebration-subtitle">\${this.txt('Completaste con éxito todos los desafíos de la Clase N.º 1 de Algoritmos.')}</p>

          <div class="celebration-trophy-box">
            \${ALGORITHM_SVGS.algoritmo_concepto || ''}
          </div>

          <div class="celebration-summary-box">
            <h4>\${this.txt('LO QUE APRENDIMOS Y LOGRAMOS HOY:')}</h4>
            <ul>
              <li>✅ <strong>\${this.txt('Qué es un algoritmo:')}</strong> \${this.txt('Una secuencia de instrucciones ordenadas para resolver un problema.')}</li>
              <li>✅ <strong>\${this.txt('La importancia del orden:')}</strong> \${this.txt('Si cambiamos el orden, el objetivo no se alcanza.')}</li>
              <li>✅ <strong>\${this.txt('Construcción con bloques:')}</strong> \${this.txt('Identificamos los pasos necesarios y descartamos distractores cotidianos.')}</li>
              <li>✅ <strong>\${this.txt('Programación en 4 direcciones:')}</strong> \${this.txt('Guiamos a Bity con Arriba, Abajo, Izquierda y Derecha.')}</li>
              <li>✅ <strong>\${this.txt('Desafíos en Puertas y Ventanas:')}</strong> \${this.txt('Resolviste con éxito preguntas de pensamiento computacional.')}</li>
              <li>✅ <strong>\${this.txt('Eficiencia algorítmica:')}</strong> \${this.txt('Descubriste cómo optimizar rutas y resolver retos complejos.')}</li>
            </ul>
          </div>

          <div class="celebration-btn-row">
            <button class="btn-alg-reset" type="button" onclick="window.algorithmsModule.resetMaze()">
              <span>🔄</span> \${this.txt('PROBAR OTRO CAMINO')}
            </button>
            <button class="btn-alg-finish" type="button" onclick="window.algorithmsModule.exitModule()">
              <span>🏆</span> \${this.txt('FINALIZAR CLASE Y GUARDAR')}
            </button>
          </div>
        </div>
      \`;
    }

    exitModule() {
      this.playSound('click');
      this.saveProgress();
      if (typeof window !== 'undefined') {
        if (window.MagicApp && typeof window.MagicApp.navigate === 'function') {
          window.MagicApp.navigate('coding');
        } else if (window.codingManager && typeof window.codingManager.renderSyllabus === 'function') {
          window.codingManager.renderSyllabus();
        }
      }
    }
  }

  // Exportar instancia global
  const algorithmsModuleInstance = new AlgorithmsModule();
  algorithmsModuleInstance.EVERYDAY_ACTIVITIES = EVERYDAY_ACTIVITIES;
  algorithmsModuleInstance.ALL_MAZES = ALL_MAZES;
  algorithmsModuleInstance.ALGORITHM_QUESTIONS = ALGORITHM_QUESTIONS;
  algorithmsModuleInstance.ALGORITHM_SVGS = ALGORITHM_SVGS;
  global.algorithmsModule = algorithmsModuleInstance;

})(typeof window !== 'undefined' ? window : global);
`;

const outputCode = `/**
 * ========================================================
 * ALGORITMOS — APRENDIZAJE VISUAL, BLOQUES Y DESAFÍOS
 * Pensamiento Computacional para 1.º a 5.º Grado
 * Informática Mágica — Edición Especial Interactiva
 * ========================================================
 */

(function (global) {
  'use strict';

  // ============================================================
  // 1. REPOSITORIO DE ILUSTRACIONES VECTORIALES SVG
  // ============================================================
  ${svgsPart}

  // Bity SVG helper
  function getBitySvg(mood = 'happy') {
    const eyeColor = mood === 'thinking' ? '#facc15' : (mood === 'celebrating' ? '#34d399' : (mood === 'alert' ? '#f87171' : '#38bdf8'));
    return \`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="bity-svg-avatar" aria-label="Bity el robot">
      <circle cx="50" cy="50" r="46" fill="#1e1b4b" stroke="#8b5cf6" stroke-width="3"/>
      <!-- Antena -->
      <rect x="47" y="10" width="6" height="14" fill="#a855f7" rx="3"/>
      <circle cx="50" cy="9" r="6" fill="#facc15"/>
      <!-- Cabeza -->
      <rect x="25" y="24" width="50" height="42" rx="12" fill="#312e81" stroke="#6366f1" stroke-width="2.5"/>
      <rect x="32" y="32" width="36" height="24" rx="6" fill="#0f172a"/>
      \${mood === 'thinking' ? \`
        <circle cx="40" cy="44" r="4" fill="\${eyeColor}"/>
        <circle cx="60" cy="44" r="4" fill="\${eyeColor}"/>
        <line x1="34" y1="38" x2="45" y2="40" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
      \` : mood === 'alert' ? \`
        <circle cx="40" cy="44" r="4.5" fill="\${eyeColor}"/>
        <circle cx="60" cy="44" r="4.5" fill="\${eyeColor}"/>
        <line x1="34" y1="38" x2="44" y2="42" stroke="#f87171" stroke-width="2"/>
        <line x1="66" y1="38" x2="56" y2="42" stroke="#f87171" stroke-width="2"/>
      \` : \`
        <circle cx="40" cy="44" r="4.5" fill="\${eyeColor}"/>
        <circle cx="60" cy="44" r="4.5" fill="\${eyeColor}"/>
      \`}
      \${mood === 'celebrating' || mood === 'happy' ? \`
        <path d="M 44 54 Q 50 58 56 54" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
      \` : \`
        <line x1="46" y1="54" x2="54" y2="54" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
      \`}
    </svg>\`;
  }

  // ============================================================
  // 2. ACTIVIDADES COTIDIANAS (PARTE 2)
  // ============================================================
  ${activitiesPart}

  // ============================================================
  // 3. LABERINTOS DE PROGRAMACIÓN (PASOS 4 A 8)
  // ============================================================
  ${ALL_MAZES_CODE}

  ${QUESTIONS_CODE}

  // ============================================================
  // 5. CLASE PRINCIPAL DEL MÓDULO ALGORITMOS
  // ============================================================
${CLASS_CODE}
`;

fs.writeFileSync(path.join(__dirname, '../js/algorithmsModule.js'), outputCode);
console.log('Successfully wrote updated algorithmsModule.js!');
