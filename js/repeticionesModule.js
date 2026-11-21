/**
 * repeticionesModule.js
 * Nuevo Módulo Independiente: REPETICIONES – Programación con Bloques (1.º a 5.º Grado)
 *
 * Basado en la referencia visual img/repeticiones.jfif:
 * - Pantalla de bienvenida con Bity navideño.
 * - Primera Parte: ¿QUÉ SIGNIFICA REPETIR? (explicación visual + ejemplo comparativo sin tecnicismos + demo en vivo).
 * - Segunda Parte: Bloque REPETIR [N] VECES con estructura en "C" y llave naranja { + 5 Ejercicios Guiados adaptados de 1.º a 5.º grado.
 * - Sistema de Pistas Guiadas Progresivas (botón VER PISTA).
 * - Ejecución real (EJECUTAR y EJECUTAR PASO A PASO) con indicador 1 de N → 2 de N ... y actualización parcial del DOM sin parpadeos.
 */

(function (global) {
  'use strict';

  // ============================================================
  // 1. DEFINICIÓN DE BLOQUES DE MOVIMIENTO Y REPETICIÓN
  // ============================================================
  const REP_MOVE_DEFS = {
    right: {
      id: 'right',
      label: 'MOVER HACIA LA DERECHA',
      shortLabel: 'DERECHA',
      arrow: '→',
      dx: 1,
      dy: 0
    },
    left: {
      id: 'left',
      label: 'MOVER HACIA LA IZQUIERDA',
      shortLabel: 'IZQUIERDA',
      arrow: '←',
      dx: -1,
      dy: 0
    },
    down: {
      id: 'down',
      label: 'MOVER HACIA ABAJO',
      shortLabel: 'ABAJO',
      arrow: '↓',
      dx: 0,
      dy: 1
    },
    up: {
      id: 'up',
      label: 'MOVER HACIA ARRIBA',
      shortLabel: 'ARRIBA',
      arrow: '↑',
      dx: 0,
      dy: -1
    }
  };

  // Metadatos de adaptación pedagógica por grado (1.º a 5.º Grado)
  const REP_GRADE_ADAPTATION = {
    1: {
      grade: 1,
      badge: '1.º Grado',
      levelNote: 'Textos breves en MAYÚSCULAS, bloques grandes, cantidades pequeñas y pista inicial visible.',
      autoShowFirstHint: true,
      defaultRepeatCount: 3
    },
    2: {
      grade: 2,
      badge: '2.º Grado',
      levelNote: 'Enunciados sencillos, pistas para contar casilleros y combinación de dos bloques REPETIR.',
      autoShowFirstHint: false,
      defaultRepeatCount: 3
    },
    3: {
      grade: 3,
      badge: '3.º Grado',
      levelNote: 'Recorridos con cambios de dirección combinando bloques REPETIR e instrucciones individuales.',
      autoShowFirstHint: false,
      defaultRepeatCount: 3
    },
    4: {
      grade: 4,
      badge: '4.º Grado',
      levelNote: 'Mapas más amplios, varios bloques REPETIR, obstáculos y pistas orientadoras.',
      autoShowFirstHint: false,
      defaultRepeatCount: 4
    },
    5: {
      grade: 5,
      badge: '5.º Grado',
      levelNote: 'Desafíos con múltiples tramos, distintas cantidades de repetición y búsqueda del programa más corto.',
      autoShowFirstHint: false,
      defaultRepeatCount: 4
    }
  };

  // ============================================================
  // 2. LOS 5 EJERCICIOS GUIADOS (ADAPTADOS DE 1.º A 5.º GRADO)
  // ============================================================
  function getRepeticionesExercisesForGrade(gradeNum) {
    const g = parseInt(gradeNum, 10) || 1;

    // ----------------------------------------------------------
    // EJERCICIO 1 – BITY AVANZA (Muy fácil)
    // ----------------------------------------------------------
    const ex1 = {
      id: 1,
      number: 1,
      title: 'EJERCICIO 1 – BITY AVANZA',
      difficultyLabel: 'Muy fácil',
      difficultyColor: 'success',
      prompt: '¡Bity quiere llegar hasta una estrella! Para conseguirlo, tiene que avanzar 3 casilleros.',
      goalIcon: '⭐',
      goalName: 'la estrella de Navidad',
      victoryMsg: '¡MUY BIEN! ¡BITY REPITIÓ EL MOVIMIENTO 3 VECES Y LLEGÓ A LA ESTRELLA!',
      cols: 5,
      rows: 3,
      start: { x: 0, y: 1 },
      goal: { x: 3, y: 1 },
      recommendedBlocks: 1,
      grid: [
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1]
      ],
      hints: [
        'Para llegar hasta la estrella, Bity tiene que avanzar varias veces hacia el mismo lugar. ¿Cuántas veces debe repetir esa instrucción?',
        'Contá los casilleros nevados desde donde está Bity hasta la estrella ⭐: son 3 pasos hacia la derecha.',
        'Agregá un bloque REPETIR, elegí el número 3 y poné adentro la instrucción MOVER HACIA LA DERECHA →.'
      ]
    };

    // ----------------------------------------------------------
    // EJERCICIO 2 – BUSCANDO EL REGALO (Fácil)
    // ----------------------------------------------------------
    const ex2Steps = (g <= 2) ? 4 : (g === 3 ? 5 : 6);
    const ex2Cols = ex2Steps + 2;
    const ex2Row0 = Array.from({ length: ex2Cols }, (_, i) => (i === 0 || i === ex2Cols - 1 || i % 2 === 0 ? 1 : 0));
    const ex2Row1 = Array.from({ length: ex2Cols }, (_, i) => (i === ex2Cols - 1 ? 1 : 0));
    const ex2Row2 = Array.from({ length: ex2Cols }, (_, i) => (i === 0 || i === ex2Cols - 1 || i % 2 === 1 ? 1 : 0));

    const ex2 = {
      id: 2,
      number: 2,
      title: 'EJERCICIO 2 – BUSCANDO EL REGALO',
      difficultyLabel: 'Fácil',
      difficultyColor: 'success',
      prompt: '¡Hay un regalo esperando a Bity! Ayudalo a llegar hasta él.',
      goalIcon: '🎁',
      goalName: 'el regalo de Navidad',
      victoryMsg: `¡EXCELENTE! ¡CON UN SOLO BLOQUE REPETIR DE ${ex2Steps} VECES BITY LLEGÓ AL REGALO!`,
      cols: ex2Cols,
      rows: 3,
      start: { x: 0, y: 1 },
      goal: { x: ex2Steps, y: 1 },
      recommendedBlocks: 1,
      grid: [ex2Row0, ex2Row1, ex2Row2],
      hints: [
        'Observá el mapa. Para llegar al regalo, Bity debe repetir varias veces el mismo movimiento. En lugar de colocar muchas instrucciones iguales, podés utilizar REPETIR.',
        `¿Cuántos casilleros tiene que avanzar Bity hasta el regalo 🎁? Contalos uno por uno en el camino central.`,
        `Colocá el número ${ex2Steps} dentro del bloque REPETIR y agregá adentro la instrucción MOVER HACIA LA DERECHA →.`
      ]
    };

    // ----------------------------------------------------------
    // EJERCICIO 3 – EL CAMINO DE NAVIDAD (Intermedio)
    // ----------------------------------------------------------
    let ex3;
    if (g <= 3) {
      ex3 = {
        id: 3,
        number: 3,
        title: 'EJERCICIO 3 – EL CAMINO DE NAVIDAD',
        difficultyLabel: 'Intermedio',
        difficultyColor: 'warning',
        prompt: 'Bity quiere llegar hasta el árbol de Navidad. Para hacerlo, primero debe avanzar varias veces y luego cambiar de dirección.',
        goalIcon: '🎄',
        goalName: 'el árbol de Navidad',
        victoryMsg: '¡GENIAL! ¡COMBINASTE DOS BLOQUES REPETIR Y BITY LLEGÓ AL ÁRBOL DE NAVIDAD!',
        cols: 5,
        rows: 4,
        start: { x: 0, y: 1 },
        goal: { x: 3, y: 3 },
        recommendedBlocks: 2,
        grid: [
          [1, 1, 0, 1, 1],
          [0, 0, 0, 0, 1],
          [1, 1, 1, 0, 1],
          [1, 0, 1, 0, 1]
        ],
        hints: [
          '¡Atención! No todo el camino se hace en la misma dirección. Primero repetí un movimiento y después agregá otro bloque de repetición para continuar el recorrido.',
          '¿Cuántos pasos tiene que avanzar Bity hacia la derecha hasta llegar a la esquina? ¿Y cuántos pasos tiene que bajar después?',
          'Usá un primer bloque REPETIR 3 VECES con MOVER HACIA LA DERECHA → y debajo agregá un segundo bloque REPETIR 2 VECES con MOVER HACIA ABAJO ↓.'
        ]
      };
    } else {
      ex3 = {
        id: 3,
        number: 3,
        title: 'EJERCICIO 3 – EL CAMINO DE NAVIDAD',
        difficultyLabel: 'Intermedio',
        difficultyColor: 'warning',
        prompt: 'Bity quiere llegar hasta el árbol de Navidad. Para hacerlo, primero debe avanzar varias veces y luego cambiar de dirección.',
        goalIcon: '🎄',
        goalName: 'el árbol de Navidad',
        victoryMsg: '¡GENIAL! ¡COMBINASTE DOS BLOQUES REPETIR Y BITY LLEGÓ AL ÁRBOL DE NAVIDAD!',
        cols: 6,
        rows: 5,
        start: { x: 0, y: 1 },
        goal: { x: 4, y: 4 },
        recommendedBlocks: 2,
        grid: [
          [1, 1, 0, 1, 0, 1],
          [0, 0, 0, 0, 0, 1],
          [1, 1, 1, 1, 0, 1],
          [1, 0, 1, 1, 0, 1],
          [1, 0, 0, 1, 0, 1]
        ],
        hints: [
          '¡Atención! No todo el camino se hace en la misma dirección. Primero repetí un movimiento y después agregá otro bloque de repetición para continuar el recorrido.',
          'Contá cuántos casilleros hay en el tramo horizontal hacia la derecha y cuántos casilleros hay en el tramo vertical hacia abajo.',
          'Combiná un bloque REPETIR para avanzar hacia la derecha hasta la esquina y un segundo bloque REPETIR para bajar hasta el árbol 🎄.'
        ]
      };
    }

    // ----------------------------------------------------------
    // EJERCICIO 4 – ATRAVESANDO EL BOSQUE NEVADO (Intermedio avanzado)
    // ----------------------------------------------------------
    let ex4;
    if (g <= 2) {
      ex4 = {
        id: 4,
        number: 4,
        title: 'EJERCICIO 4 – ATRAVESANDO EL BOSQUE NEVADO',
        difficultyLabel: 'Intermedio avanzado',
        difficultyColor: 'warning',
        prompt: 'Bity debe atravesar un bosque nevado para encontrar una estrella. Hay algunos obstáculos en el camino y necesita organizar sus instrucciones.',
        goalIcon: '⭐',
        goalName: 'la estrella del bosque',
        victoryMsg: '¡FANTÁSTICO! ¡BITY ATRAVESÓ EL BOSQUE NEVADO ESQUIVANDO LOS OBSTÁCULOS!',
        cols: 5,
        rows: 4,
        start: { x: 1, y: 0 },
        goal: { x: 4, y: 2 },
        recommendedBlocks: 2,
        grid: [
          [1, 0, 1, 1, 1],
          [1, 0, 1, 0, 1],
          [0, 0, 0, 0, 0],
          [1, 1, 0, 1, 1]
        ],
        hints: [
          'Antes de empezar, observá el recorrido. ¿Hay movimientos que se repiten? Podés agruparlos utilizando más de un bloque REPETIR.',
          'Primero Bity tiene que bajar por el sendero libre y después doblar hacia la derecha hasta la estrella ⭐.',
          'Usá un bloque REPETIR 2 VECES con MOVER HACIA ABAJO ↓ y luego otro bloque REPETIR 3 VECES con MOVER HACIA LA DERECHA →.'
        ]
      };
    } else if (g === 3) {
      ex4 = {
        id: 4,
        number: 4,
        title: 'EJERCICIO 4 – ATRAVESANDO EL BOSQUE NEVADO',
        difficultyLabel: 'Intermedio avanzado',
        difficultyColor: 'warning',
        prompt: 'Bity debe atravesar un bosque nevado para encontrar una estrella. Hay algunos obstáculos en el camino y necesita organizar sus instrucciones.',
        goalIcon: '⭐',
        goalName: 'la estrella del bosque',
        victoryMsg: '¡FANTÁSTICO! ¡COMBINASTE REPETICIONES E INSTRUCCIONES PARA SUPERAR EL BOSQUE!',
        cols: 6,
        rows: 4,
        start: { x: 0, y: 0 },
        goal: { x: 4, y: 2 },
        recommendedBlocks: 3,
        grid: [
          [0, 0, 0, 0, 1, 1],
          [1, 1, 1, 0, 1, 0],
          [0, 1, 1, 0, 0, 1],
          [1, 0, 0, 1, 1, 1]
        ],
        hints: [
          'Antes de empezar, observá el recorrido. ¿Hay movimientos que se repiten? Podés agruparlos utilizando más de un bloque REPETIR.',
          'El camino tiene tres partes: avanzar hacia la derecha, bajar para esquivar los pinos y dar un último paso hacia la estrella ⭐.',
          'Usá REPETIR para el primer tramo hacia la derecha, otro REPETIR para bajar y al final agregá el movimiento hacia la derecha que falta.'
        ]
      };
    } else {
      ex4 = {
        id: 4,
        number: 4,
        title: 'EJERCICIO 4 – ATRAVESANDO EL BOSQUE NEVADO',
        difficultyLabel: 'Intermedio avanzado',
        difficultyColor: 'warning',
        prompt: 'Bity debe atravesar un bosque nevado para encontrar una estrella. Hay algunos obstáculos en el camino y necesita organizar sus instrucciones.',
        goalIcon: '⭐',
        goalName: 'la estrella del bosque',
        victoryMsg: '¡FANTÁSTICO! ¡BITY ATRAVESÓ EL BOSQUE NEVADO CON UN ALGORITMO BIEN ORGANIZADO!',
        cols: 7,
        rows: 5,
        start: { x: 0, y: 1 },
        goal: { x: 6, y: 3 },
        recommendedBlocks: 3,
        grid: [
          [1, 0, 0, 0, 1, 0, 1],
          [0, 0, 0, 0, 1, 0, 1],
          [0, 1, 1, 0, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [1, 1, 0, 1, 1, 0, 1]
        ],
        hints: [
          'Antes de empezar, observá el recorrido. ¿Hay movimientos que se repiten? Podés agruparlos utilizando más de un bloque REPETIR.',
          'Observá que hay más de un camino posible entre los obstáculos. ¿Cuántos tramos rectos tiene la ruta que elegiste?',
          'Agrupá cada tramo recto dentro de su propio bloque REPETIR indicando la cantidad exacta de casilleros.'
        ]
      };
    }

    // ----------------------------------------------------------
    // EJERCICIO 5 – EL GRAN REGALO DE NAVIDAD (Desafío final)
    // ----------------------------------------------------------
    let ex5;
    if (g === 1) {
      ex5 = {
        id: 5,
        number: 5,
        title: 'EJERCICIO 5 – EL GRAN REGALO DE NAVIDAD',
        difficultyLabel: 'Desafío final',
        difficultyColor: 'danger',
        prompt: '¡Llegó el desafío final! Bity necesita atravesar un camino más largo para encontrar su regalo de Navidad. Ayudalo a construir el programa utilizando repeticiones.',
        goalIcon: '🎁',
        goalName: 'el Gran Regalo de Navidad',
        victoryMsg: '¡FELICITACIONES! ¡COMPLETASTE EL DESAFÍO FINAL Y BITY ENCONTRÓ SU GRAN REGALO DE NAVIDAD!',
        cols: 5,
        rows: 4,
        start: { x: 0, y: 3 },
        goal: { x: 3, y: 1 },
        recommendedBlocks: 2,
        grid: [
          [1, 0, 1, 1, 1],
          [1, 0, 1, 0, 1],
          [1, 1, 1, 0, 0],
          [0, 0, 0, 0, 1]
        ],
        hints: [
          '¡Pensá antes de programar! Observá qué movimientos se repiten y cuántas veces tenés que realizarlos. Organizá tus bloques para que Bity llegue al regalo.',
          'Primero Bity tiene que avanzar hacia la derecha por la fila de abajo y después subir hacia el regalo 🎁.',
          'Usá un bloque REPETIR 3 VECES hacia la derecha y otro bloque REPETIR 2 VECES hacia arriba.'
        ]
      };
    } else if (g === 2) {
      ex5 = {
        id: 5,
        number: 5,
        title: 'EJERCICIO 5 – EL GRAN REGALO DE NAVIDAD',
        difficultyLabel: 'Desafío final',
        difficultyColor: 'danger',
        prompt: '¡Llegó el desafío final! Bity necesita atravesar un camino más largo para encontrar su regalo de Navidad. Ayudalo a construir el programa utilizando repeticiones.',
        goalIcon: '🎁',
        goalName: 'el Gran Regalo de Navidad',
        victoryMsg: '¡FELICITACIONES! ¡COMPLETASTE EL DESAFÍO FINAL Y BITY ENCONTRÓ SU GRAN REGALO DE NAVIDAD!',
        cols: 6,
        rows: 4,
        start: { x: 0, y: 0 },
        goal: { x: 5, y: 2 },
        recommendedBlocks: 3,
        grid: [
          [0, 0, 0, 1, 0, 1],
          [1, 1, 0, 1, 0, 0],
          [0, 1, 0, 0, 0, 0],
          [1, 1, 1, 0, 1, 1]
        ],
        hints: [
          '¡Pensá antes de programar! Observá qué movimientos se repiten y cuántas veces tenés que realizarlos. Organizá tus bloques para que Bity llegue al regalo.',
          'El recorrido tiene tres tramos: avanzar a la derecha, bajar por el pasillo central y volver a avanzar a la derecha hasta el regalo 🎁.',
          'Combiná tres bloques REPETIR seguidos: uno para ir a la derecha (2), otro para bajar (2) y otro para llegar al regalo (3).'
        ]
      };
    } else if (g === 3) {
      ex5 = {
        id: 5,
        number: 5,
        title: 'EJERCICIO 5 – EL GRAN REGALO DE NAVIDAD',
        difficultyLabel: 'Desafío final',
        difficultyColor: 'danger',
        prompt: '¡Llegó el desafío final! Bity necesita atravesar un camino más largo para encontrar su regalo de Navidad. Ayudalo a construir el programa utilizando repeticiones.',
        goalIcon: '🎁',
        goalName: 'el Gran Regalo de Navidad',
        victoryMsg: '¡FELICITACIONES! ¡COMPLETASTE EL DESAFÍO FINAL Y BITY ENCONTRÓ SU GRAN REGALO DE NAVIDAD!',
        cols: 6,
        rows: 4,
        start: { x: 0, y: 3 },
        goal: { x: 5, y: 0 },
        recommendedBlocks: 4,
        grid: [
          [1, 0, 1, 1, 1, 0],
          [1, 0, 1, 0, 0, 0],
          [1, 1, 1, 0, 1, 1],
          [0, 0, 0, 0, 1, 1]
        ],
        hints: [
          '¡Pensá antes de programar! Observá qué movimientos se repiten y cuántas veces tenés que realizarlos. Organizá tus bloques para que Bity llegue al regalo.',
          'Analizá cada tramo del camino desde abajo a la izquierda hasta arriba a la derecha. ¿Qué tramos tienen varios pasos iguales y qué tramo tiene un solo paso?',
          'Usá bloques REPETIR para los tres primeros tramos (derecha, arriba y derecha) y agregá una instrucción hacia arriba al final para alcanzar el regalo 🎁.'
        ]
      };
    } else if (g === 4) {
      ex5 = {
        id: 5,
        number: 5,
        title: 'EJERCICIO 5 – EL GRAN REGALO DE NAVIDAD',
        difficultyLabel: 'Desafío final',
        difficultyColor: 'danger',
        prompt: '¡Llegó el desafío final! Bity necesita atravesar un camino más largo para encontrar su regalo de Navidad. Ayudalo a construir el programa utilizando repeticiones.',
        goalIcon: '🎁',
        goalName: 'el Gran Regalo de Navidad',
        victoryMsg: '¡FELICITACIONES! ¡COMPLETASTE EL DESAFÍO FINAL Y BITY ENCONTRÓ SU GRAN REGALO DE NAVIDAD!',
        cols: 7,
        rows: 5,
        start: { x: 0, y: 0 },
        goal: { x: 6, y: 2 },
        recommendedBlocks: 4,
        grid: [
          [0, 0, 0, 0, 1, 0, 1],
          [1, 1, 1, 0, 1, 0, 0],
          [0, 1, 1, 0, 1, 1, 0],
          [0, 0, 1, 0, 0, 0, 0],
          [1, 0, 0, 0, 1, 1, 1]
        ],
        hints: [
          '¡Pensá antes de programar! Observá qué movimientos se repiten y cuántas veces tenés que realizarlos. Organizá tus bloques para que Bity llegue al regalo.',
          'Dividí el recorrido en 4 etapas: primer tramo hacia la derecha, bajada por el corredor central, avance hacia la derecha y subida final al regalo 🎁.',
          'Combiná bloques REPETIR para los tramos largos con una instrucción individual para el último paso hacia el regalo.'
        ]
      };
    } else {
      ex5 = {
        id: 5,
        number: 5,
        title: 'EJERCICIO 5 – EL GRAN REGALO DE NAVIDAD',
        difficultyLabel: 'Desafío final',
        difficultyColor: 'danger',
        prompt: '¡Llegó el desafío final! Bity necesita atravesar un camino más largo para encontrar su regalo de Navidad. Ayudalo a construir el programa utilizando repeticiones.',
        goalIcon: '🎁',
        goalName: 'el Gran Regalo de Navidad',
        victoryMsg: '¡FELICITACIONES! ¡COMPLETASTE EL DESAFÍO FINAL Y BITY ENCONTRÓ SU GRAN REGALO DE NAVIDAD!',
        cols: 8,
        rows: 6,
        start: { x: 0, y: 5 },
        goal: { x: 7, y: 1 },
        recommendedBlocks: 4,
        grid: [
          [1, 0, 0, 1, 1, 0, 1, 1],
          [0, 0, 1, 1, 0, 0, 1, 0],
          [0, 1, 1, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 1, 1, 1],
          [1, 1, 1, 1, 0, 1, 0, 1],
          [0, 0, 0, 0, 0, 1, 0, 1]
        ],
        hints: [
          '¡Pensá antes de programar! Observá qué movimientos se repiten y cuántas veces tenés que realizarlos. Organizá tus bloques para que Bity llegue al regalo.',
          'Observá las alternativas del mapa: buscá el camino más directo hacia la columna central, subí hasta la fila libre y continuá hacia el regalo 🎁.',
          'intentá resolver todo el recorrido utilizando la menor cantidad de bloques posible combinando bloques REPETIR con un paso final.'
        ]
      };
    }

    return [ex1, ex2, ex3, ex4, ex5];
  }

  // ============================================================
  // 3. CLASE PRINCIPAL: RepeticionesModule
  // ============================================================
  class RepeticionesModule {
    constructor() {
      this.currentGrade = 1;
      this.currentView = 'welcome'; // 'welcome' | 'concept' | 'exercises'
      this.currentExerciseIdx = 0; // 0..4 (Ejercicios 1 a 5)

      // Lista de bloques en el algoritmo del estudiante:
      // Cada elemento es:
      // - { id: 'b1', type: 'repeat', times: 3, action: 'right' | null }
      // - { id: 'b2', type: 'move', dir: 'right' }
      this.blocks = [];
      this.focusedRepeatId = null; // ID del bloque REPETIR cuya boca interna está seleccionada para recibir un movimiento
      this.blockIdCounter = 1;

      // Estado de ejecución en el mapa
      this.bityPos = { x: 0, y: 0 };
      this.bityFacing = 'right';
      this.execMode = 'idle'; // 'idle' | 'running' | 'step' | 'won' | 'error'
      this.expandedSteps = [];
      this.stepCursor = -1;
      this.isAnimatingStep = false;
      this.timerId = null;
      this.feedback = null;

      // Sistema de pistas progresivas
      this.revealedHintsCount = 0;

      // Demo interactiva en la pantalla de concepto
      this.conceptDemoStep = 0;
      this.conceptDemoTimer = null;

      // Drag & Drop payload
      this.dragPayload = null;

      // Progreso por grado (1..5 -> Set de IDs de ejercicios 1..5 completados)
      this.completedByGrade = { 1: new Set(), 2: new Set(), 3: new Set(), 4: new Set(), 5: new Set() };
      this.loadProgress();
    }

    txt(str) {
      if (!str) return '';
      return this.currentGrade === 1 ? String(str).toUpperCase() : String(str);
    }

    getBitySvgMarkup(mood = 'happy') {
      if (typeof window !== 'undefined' && window.algorithmsModule && typeof window.algorithmsModule.renderExBitySpriteInner === 'function') {
        // Reutilizar el SVG navideño oficial de Bity
      }
      // Si existe getBitySvg a través del módulo o usamos el SVG navideño oficial de Bity con gorro de Papá Noel y bufanda
      const isCeleb = mood === 'celebrating';
      const isAlert = mood === 'alert';
      const eyeColor = isAlert ? '#fbbf24' : '#38bdf8';
      const mouthPath = isCeleb
        ? 'M 38 55 Q 50 66 62 55'
        : (isAlert ? 'M 42 58 Q 50 52 58 58' : 'M 40 55 Q 50 63 60 55');

      return `
        <svg viewBox="0 0 100 110" class="rep-bity-svg-icon" xmlns="http://www.w3.org/2000/svg">
          <!-- Antena con estrella navideña dorada -->
          <line x1="50" y1="22" x2="50" y2="8" stroke="#ffd700" stroke-width="3.5" stroke-linecap="round"/>
          <polygon points="50,1 52.5,6.5 58,7 54,11 55,16.5 50,13.5 45,16.5 46,11 42,7 47.5,6.5" fill="#ffd700"/>
          <!-- Cuerpo/Cabeza Robot Bity -->
          <rect x="24" y="24" width="52" height="44" rx="12" fill="#f8fafc" stroke="#071524" stroke-width="2.5"/>
          <rect x="30" y="31" width="40" height="28" rx="7" fill="#071524" stroke="#38bdf8" stroke-width="1.8"/>
          <!-- Ojos brillantes -->
          <circle cx="41" cy="43" r="4.8" fill="${eyeColor}"/>
          <circle cx="59" cy="43" r="4.8" fill="${eyeColor}"/>
          <circle cx="39.5" cy="41.5" r="1.6" fill="#ffffff"/>
          <circle cx="57.5" cy="41.5" r="1.6" fill="#ffffff"/>
          <!-- Sonrisa -->
          <path d="${mouthPath}" stroke="#ffd700" stroke-width="2.6" fill="none" stroke-linecap="round"/>
          <!-- Gorro Rojo de Papá Noel con borde blanco y pompón -->
          <path d="M 25 27 Q 50 18 75 27 L 65 9 Q 50 4 32 12 Z" fill="#d42426" stroke="#991b1b" stroke-width="1.5"/>
          <rect x="22" y="22" width="56" height="7" rx="3.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <circle cx="30" cy="12" r="5.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
          <!-- Torso Navideño y Bufanda Verde/Roja/Dorada -->
          <rect x="30" y="70" width="40" height="26" rx="8" fill="#d42426" stroke="#071524" stroke-width="2.2"/>
          <rect x="47" y="70" width="6" height="26" fill="#ffffff" opacity="0.92"/>
          <rect x="27" y="66" width="46" height="9" rx="4.5" fill="#165b33" stroke="#ffd700" stroke-width="1.5"/>
          <path d="M 58 73 L 65 90 L 56 90 L 53 73 Z" fill="#165b33" stroke="#ffd700" stroke-width="1.2"/>
        </svg>
      `;
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
      } catch (e) {}
    }

    loadProgress() {
      this.completedByGrade = { 1: new Set(), 2: new Set(), 3: new Set(), 4: new Set(), 5: new Set() };
      try {
        const raw = localStorage.getItem('lego_repeticiones_module_progress');
        if (raw) {
          const parsed = JSON.parse(raw);
          for (let g = 1; g <= 5; g++) {
            if (parsed && Array.isArray(parsed[g])) {
              this.completedByGrade[g] = new Set(parsed[g]);
            }
          }
        }
      } catch (e) {}
    }

    saveProgress() {
      try {
        const payload = {};
        for (let g = 1; g <= 5; g++) {
          payload[g] = Array.from(this.completedByGrade[g] || []);
        }
        localStorage.setItem('lego_repeticiones_module_progress', JSON.stringify(payload));
      } catch (e) {}
    }

    getExercisesForCurrentGrade() {
      return getRepeticionesExercisesForGrade(this.currentGrade);
    }

    getCurrentExercise() {
      const list = this.getExercisesForCurrentGrade();
      return list[this.currentExerciseIdx] || list[0];
    }

    stopExecution() {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
      if (this.conceptDemoTimer) {
        clearInterval(this.conceptDemoTimer);
        this.conceptDemoTimer = null;
      }
      this.isAnimatingStep = false;
    }

    // Abrir el módulo REPETICIONES desde la portada, temario o algoritmos
    openModule(grade = null, initialView = 'welcome') {
      this.stopExecution();
      this.loadProgress();
      const g = parseInt(grade, 10) || parseInt(localStorage.getItem('lego_current_grade'), 10) || this.currentGrade || 1;
      this.currentGrade = Math.max(1, Math.min(5, g));
      this.currentView = initialView || 'welcome';
      this.currentExerciseIdx = 0;

      if (typeof window !== 'undefined' && typeof window.appShowScreen === 'function') {
        const sc = document.getElementById('screen-coding-repeticiones');
        if (sc) window.appShowScreen(sc);
      } else {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const sc = document.getElementById('screen-coding-repeticiones');
        if (sc) sc.classList.add('active');
      }

      try {
        sessionStorage.setItem('lego_active_screen', 'screen-coding-repeticiones');
        sessionStorage.setItem('lego_active_grade', String(this.currentGrade));
      } catch (e) {}

      if (this.currentView === 'exercises') {
        this.loadExercise(0, false);
      }
      this.render();
      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        window.scrollTo(0, 0);
      }
    }

    selectGrade(gradeNum) {
      const g = parseInt(gradeNum, 10);
      if (!g || g < 1 || g > 5) return;
      this.stopExecution();
      this.currentGrade = g;
      try {
        localStorage.setItem('lego_current_grade', String(g));
        sessionStorage.setItem('lego_active_grade', String(g));
      } catch (e) {}
      this.playSound('pop');

      if (this.currentView === 'exercises') {
        this.loadExercise(this.currentExerciseIdx, true);
      } else {
        this.render();
      }
    }

    goToView(viewName) {
      this.stopExecution();
      this.currentView = viewName;
      this.playSound('pop');
      if (viewName === 'exercises') {
        this.loadExercise(this.currentExerciseIdx, false);
      }
      this.render();
      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        window.scrollTo(0, 0);
      }
    }

    handleBackButton() {
      this.stopExecution();
      this.playSound('click');
      if (this.currentView === 'exercises') {
        this.goToView('concept');
        return;
      }
      if (this.currentView === 'concept') {
        this.goToView('welcome');
        return;
      }
      this.exitToHome();
    }

    exitToHome() {
      this.stopExecution();
      this.saveProgress();
      this.playSound('click');
      try {
        sessionStorage.removeItem('lego_active_screen');
      } catch (e) {}
      if (typeof window !== 'undefined' && typeof window.appShowScreen === 'function') {
        const homeSc = document.getElementById('screen-home');
        if (homeSc) window.appShowScreen(homeSc);
      } else {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const homeSc = document.getElementById('screen-home');
        if (homeSc) homeSc.classList.add('active');
      }
    }

    // ------------------------------------------------------------
    // DEMO EN VIVO DE LA PRIMERA PARTE (¿QUÉ SIGNIFICA REPETIR?)
    // ------------------------------------------------------------
    runConceptLiveDemo() {
      if (this.conceptDemoTimer) {
        clearInterval(this.conceptDemoTimer);
        this.conceptDemoTimer = null;
      }
      this.conceptDemoStep = 0;
      this.playSound('pop');
      this.updateConceptDemoDOM();

      this.conceptDemoTimer = setInterval(() => {
        if (this.conceptDemoStep < 4) {
          this.conceptDemoStep++;
          this.playSound(this.conceptDemoStep === 4 ? 'victory' : 'click');
          this.updateConceptDemoDOM();
        } else {
          clearInterval(this.conceptDemoTimer);
          this.conceptDemoTimer = null;
        }
      }, 450);
    }

    updateConceptDemoDOM() {
      for (let i = 0; i <= 4; i++) {
        const tile = document.getElementById(`rep-concept-tile-${i}`);
        if (!tile) continue;
        const bitySlot = tile.querySelector('.rep-demo-bity-holder');
        if (bitySlot) {
          bitySlot.innerHTML = (i === this.conceptDemoStep)
            ? `<div style="width:46px;height:46px;">${this.getBitySvgMarkup(i === 4 ? 'celebrating' : 'happy')}</div>`
            : (i === 4 ? '🎁' : '');
        }
      }
      const statusEl = document.getElementById('rep-concept-demo-status');
      if (statusEl) {
        statusEl.textContent = this.conceptDemoStep === 0
          ? this.txt('Listo para empezar (Posición inicial)')
          : this.txt(`Repetición ${this.conceptDemoStep} de 4 → MOVER HACIA LA DERECHA${this.conceptDemoStep === 4 ? ' ¡Llegó!' : ''}`);
      }
    }

    // ------------------------------------------------------------
    // GESTIÓN DE LOS 5 EJERCICIOS Y CONSTRUCCIÓN DE BLOQUES
    // ------------------------------------------------------------
    resetRuntimeState(ex) {
      const currEx = ex || this.getCurrentExercise();
      this.bityPos = { x: currEx.start.x, y: currEx.start.y };
      this.bityFacing = 'right';
      this.execMode = 'idle';
      this.expandedSteps = [];
      this.stepCursor = -1;
      this.isAnimatingStep = false;
      this.feedback = null;
    }

    loadExercise(idx, shouldRender = true) {
      this.stopExecution();
      const list = this.getExercisesForCurrentGrade();
      this.currentExerciseIdx = (idx >= 0 && idx < list.length) ? idx : 0;
      const ex = this.getCurrentExercise();

      this.blocks = [];
      this.focusedRepeatId = null;
      this.resetRuntimeState(ex);

      const gradeMeta = REP_GRADE_ADAPTATION[this.currentGrade] || REP_GRADE_ADAPTATION[1];
      this.revealedHintsCount = gradeMeta.autoShowFirstHint ? 1 : 0;

      if (shouldRender) {
        this.render();
      }
    }

    selectExercise(idx) {
      this.playSound('click');
      this.loadExercise(idx, true);
    }

    prepareForCodeEdit() {
      if (this.execMode !== 'idle' || this.stepCursor !== -1) {
        this.stopExecution();
        this.resetRuntimeState();
        this.refreshMapBoardDOM();
      }
    }

    // Agregar bloque REPETIR [N] VECES al algoritmo
    addRepeatBlock(initialTimes = null, initialAction = null) {
      if (this.isAnimatingStep || this.execMode === 'running') return;
      this.prepareForCodeEdit();

      const gradeMeta = REP_GRADE_ADAPTATION[this.currentGrade] || REP_GRADE_ADAPTATION[1];
      const times = initialTimes || gradeMeta.defaultRepeatCount || 3;
      const newId = `rep_blk_${this.blockIdCounter++}`;

      this.blocks.push({
        id: newId,
        type: 'repeat',
        times: Math.max(2, Math.min(10, parseInt(times, 10) || 3)),
        action: initialAction && REP_MOVE_DEFS[initialAction] ? initialAction : null
      });

      // Seleccionar automáticamente la cavidad interna si está vacía para que el próximo clic en un movimiento entre directo
      if (!initialAction) {
        this.focusedRepeatId = newId;
      }

      this.playSound('pop');
      this.refreshProgramStackDOM();
    }

    // Agregar o asignar un bloque de movimiento (adentro del REPETIR seleccionado o como instrucción individual)
    addMovementBlock(dir, targetRepeatId = null, forceStandalone = false) {
      if (this.isAnimatingStep || this.execMode === 'running') return;
      if (!REP_MOVE_DEFS[dir]) return;
      this.prepareForCodeEdit();

      const repeatIdToFill = targetRepeatId || (!forceStandalone ? this.focusedRepeatId : null);

      if (repeatIdToFill) {
        const repBlock = this.blocks.find(b => b.id === repeatIdToFill && b.type === 'repeat');
        if (repBlock) {
          repBlock.action = dir;
          // Si hay otro bloque REPETIR vacío, enfocar el siguiente; si no, liberar el foco
          const nextEmpty = this.blocks.find(b => b.type === 'repeat' && !b.action);
          this.focusedRepeatId = nextEmpty ? nextEmpty.id : null;
          this.playSound('pop');
          this.refreshProgramStackDOM();
          return;
        }
      }

      // Si no había un REPETIR enfocado, pero el último bloque es un REPETIR vacío y no se forzó individual, colocarlo adentro
      if (!forceStandalone && this.blocks.length > 0) {
        const lastBlock = this.blocks[this.blocks.length - 1];
        if (lastBlock.type === 'repeat' && !lastBlock.action) {
          lastBlock.action = dir;
          this.focusedRepeatId = null;
          this.playSound('pop');
          this.refreshProgramStackDOM();
          return;
        }
      }

      // Agregar como instrucción de movimiento individual en la secuencia
      this.blocks.push({
        id: `rep_blk_${this.blockIdCounter++}`,
        type: 'move',
        dir: dir
      });
      this.focusedRepeatId = null;
      this.playSound('pop');
      this.refreshProgramStackDOM();
    }

    // Cambiar la cantidad de repeticiones [N] de un bloque REPETIR
    changeRepeatCount(blockId, delta) {
      if (this.isAnimatingStep || this.execMode === 'running') return;
      const blk = this.blocks.find(b => b.id === blockId && b.type === 'repeat');
      if (!blk) return;
      this.prepareForCodeEdit();
      blk.times = Math.max(2, Math.min(10, (blk.times || 2) + delta));
      this.playSound('click');
      this.refreshProgramStackDOM();
    }

    setRepeatCountDirect(blockId, countVal) {
      if (this.isAnimatingStep || this.execMode === 'running') return;
      const blk = this.blocks.find(b => b.id === blockId && b.type === 'repeat');
      if (!blk) return;
      this.prepareForCodeEdit();
      const parsed = parseInt(countVal, 10);
      if (parsed >= 2 && parsed <= 10) {
        blk.times = parsed;
        this.playSound('click');
        this.refreshProgramStackDOM();
      }
    }

    // Cambiar o quitar la instrucción interna de un bloque REPETIR
    setRepeatInnerAction(blockId, dirOrNull) {
      if (this.isAnimatingStep || this.execMode === 'running') return;
      const blk = this.blocks.find(b => b.id === blockId && b.type === 'repeat');
      if (!blk) return;
      this.prepareForCodeEdit();

      if (dirOrNull && REP_MOVE_DEFS[dirOrNull]) {
        blk.action = dirOrNull;
        if (this.focusedRepeatId === blockId) {
          this.focusedRepeatId = null;
        }
        this.playSound('pop');
      } else {
        blk.action = null;
        this.focusedRepeatId = blockId;
        this.playSound('trash');
      }
      this.refreshProgramStackDOM();
    }

    focusRepeatMouth(blockId) {
      if (this.isAnimatingStep || this.execMode === 'running') return;
      this.focusedRepeatId = (this.focusedRepeatId === blockId) ? null : blockId;
      this.playSound('click');
      this.refreshProgramStackDOM();
    }

    removeBlock(index) {
      if (this.isAnimatingStep || this.execMode === 'running') return;
      if (index < 0 || index >= this.blocks.length) return;
      this.prepareForCodeEdit();

      const [removed] = this.blocks.splice(index, 1);
      if (removed && removed.id === this.focusedRepeatId) {
        this.focusedRepeatId = null;
      }
      this.playSound('trash');
      this.refreshProgramStackDOM();
    }

    moveBlock(index, delta) {
      if (this.isAnimatingStep || this.execMode === 'running') return;
      const targetIdx = index + delta;
      if (index < 0 || index >= this.blocks.length || targetIdx < 0 || targetIdx >= this.blocks.length) return;
      this.prepareForCodeEdit();

      const tmp = this.blocks[index];
      this.blocks[index] = this.blocks[targetIdx];
      this.blocks[targetIdx] = tmp;
      this.playSound('click');
      this.refreshProgramStackDOM();
    }

    // ------------------------------------------------------------
    // SOPORTE DRAG & DROP (Paleta -> Algoritmo o Adentro de REPETIR)
    // ------------------------------------------------------------
    handlePaletteDragStart(event, kind, dir = null) {
      if (this.isAnimatingStep || this.execMode === 'running') {
        if (event && event.preventDefault) event.preventDefault();
        return;
      }
      this.dragPayload = { kind: kind, dir: dir };
      if (event && event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'copy';
        try {
          event.dataTransfer.setData('text/plain', JSON.stringify(this.dragPayload));
        } catch (e) {}
      }
    }

    handleDragOver(event, el) {
      if (event && event.preventDefault) event.preventDefault();
      if (event && event.stopPropagation) event.stopPropagation();
      if (el && !el.classList.contains('drag-over')) {
        el.classList.add('drag-over');
      }
    }

    handleDragLeave(event, el) {
      if (el) el.classList.remove('drag-over');
    }

    handleDropOnRepeatMouth(event, repeatBlockId) {
      if (event && event.preventDefault) event.preventDefault();
      if (event && event.stopPropagation) event.stopPropagation();

      document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
      if (this.isAnimatingStep || this.execMode === 'running') return;

      let payload = this.dragPayload;
      if (!payload && event && event.dataTransfer) {
        try {
          payload = JSON.parse(event.dataTransfer.getData('text/plain'));
        } catch (e) {}
      }
      this.dragPayload = null;
      if (!payload) return;

      if (payload.kind === 'move' && payload.dir) {
        this.setRepeatInnerAction(repeatBlockId, payload.dir);
      }
    }

    handleDropOnCanvas(event) {
      if (event && event.preventDefault) event.preventDefault();
      document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
      if (this.isAnimatingStep || this.execMode === 'running') return;

      let payload = this.dragPayload;
      if (!payload && event && event.dataTransfer) {
        try {
          payload = JSON.parse(event.dataTransfer.getData('text/plain'));
        } catch (e) {}
      }
      this.dragPayload = null;
      if (!payload) return;

      if (payload.kind === 'repeat') {
        this.addRepeatBlock();
      } else if (payload.kind === 'move' && payload.dir) {
        this.addMovementBlock(payload.dir, null, false);
      }
    }

    // ------------------------------------------------------------
    // SISTEMA DE PISTAS GUIADAS PROGRESIVAS (VER PISTA)
    // ------------------------------------------------------------
    revealNextHint() {
      const ex = this.getCurrentExercise();
      const totalHints = (ex.hints || []).length;
      if (this.revealedHintsCount < totalHints) {
        this.revealedHintsCount++;
      } else {
        this.revealedHintsCount = 1;
      }
      this.playSound('pop');
      const hintsMount = document.getElementById('rep-hints-card-mount');
      if (hintsMount) {
        hintsMount.innerHTML = this.renderHintsCardInner(ex);
      } else {
        this.render();
      }
    }

    // ------------------------------------------------------------
    // COMPILACIÓN Y EJECUCIÓN REAL (EJECUTAR Y PASO A PASO SIN PARPADEO)
    // ------------------------------------------------------------
    compileBlocksToSteps() {
      if (this.blocks.length === 0) {
        return {
          ok: false,
          title: '¡Faltan instrucciones en tu algoritmo!',
          detail: 'Agregá un bloque REPETIR y elegí qué movimiento querés repetir.'
        };
      }

      const steps = [];
      for (let i = 0; i < this.blocks.length; i++) {
        const blk = this.blocks[i];
        if (blk.type === 'repeat') {
          if (!blk.action || !REP_MOVE_DEFS[blk.action]) {
            return {
              ok: false,
              emptyRepeatId: blk.id,
              title: '¡Al bloque REPETIR le falta una instrucción adentro!',
              detail: 'Elegí qué movimiento querés colocar dentro del bloque REPETIR antes de ejecutar.'
            };
          }
          const times = Math.max(1, Math.min(15, parseInt(blk.times, 10) || 1));
          for (let iter = 1; iter <= times; iter++) {
            steps.push({
              blockIndex: i,
              blockId: blk.id,
              blockType: 'repeat',
              dir: blk.action,
              currentIter: iter,
              totalIter: times
            });
          }
        } else if (blk.type === 'move' && REP_MOVE_DEFS[blk.dir]) {
          steps.push({
            blockIndex: i,
            blockId: blk.id,
            blockType: 'move',
            dir: blk.dir,
            currentIter: 1,
            totalIter: 1
          });
        }
      }

      return { ok: true, steps: steps };
    }

    resetPosition(shouldPlaySound = true) {
      this.stopExecution();
      this.resetRuntimeState();
      if (shouldPlaySound) this.playSound('click');
      this.refreshMapBoardDOM();
    }

    clearCode() {
      this.stopExecution();
      this.blocks = [];
      this.focusedRepeatId = null;
      this.resetRuntimeState();
      this.playSound('trash');
      this.refreshMapBoardDOM();
      this.refreshProgramStackDOM();
    }

    // EJECUTAR TODO EL ALGORITMO DE PRINCIPIO A FIN (Sin parpadeo de página)
    runAll() {
      if (this.isAnimatingStep || this.execMode === 'running') return;

      const compiled = this.compileBlocksToSteps();
      if (!compiled.ok) {
        this.execMode = 'error';
        if (compiled.emptyRepeatId) {
          this.focusedRepeatId = compiled.emptyRepeatId;
        }
        this.feedback = {
          type: 'error',
          title: compiled.title,
          detail: compiled.detail
        };
        this.playSound('error');
        this.refreshProgramStackDOM();
        this.updateStatusAndFeedbackDOM();
        return;
      }

      this.stopExecution();
      this.resetRuntimeState();
      this.expandedSteps = compiled.steps;
      this.execMode = 'running';
      this.refreshMapBoardDOM();

      const runNext = () => {
        if (this.execMode !== 'running') return;
        const nextIdx = this.stepCursor + 1;
        if (nextIdx >= this.expandedSteps.length) {
          this.evaluateFinalResult();
          return;
        }
        this.executeExpandedStep(nextIdx, (status) => {
          if (status === 'continue' && this.execMode === 'running') {
            if (nextIdx + 1 < this.expandedSteps.length) {
              this.timerId = setTimeout(runNext, 330);
            } else {
              this.timerId = setTimeout(() => {
                if (this.execMode === 'running') {
                  this.evaluateFinalResult();
                }
              }, 220);
            }
          }
        });
      };

      this.timerId = setTimeout(runNext, 140);
    }

    // EJECUTAR PASO A PASO (Permite observar cada movimiento individual dentro de REPETIR sin parpadeo)
    runStepByStep() {
      if (this.isAnimatingStep || this.execMode === 'running') return;

      const compiled = this.compileBlocksToSteps();
      if (!compiled.ok) {
        this.execMode = 'error';
        if (compiled.emptyRepeatId) {
          this.focusedRepeatId = compiled.emptyRepeatId;
        }
        this.feedback = {
          type: 'error',
          title: compiled.title,
          detail: compiled.detail
        };
        this.playSound('error');
        this.refreshProgramStackDOM();
        this.updateStatusAndFeedbackDOM();
        return;
      }

      if (this.execMode !== 'step' || this.stepCursor >= compiled.steps.length - 1) {
        this.stopExecution();
        this.resetRuntimeState();
        this.expandedSteps = compiled.steps;
        this.execMode = 'step';
        this.refreshMapBoardDOM();
      } else {
        this.expandedSteps = compiled.steps;
      }

      const nextIdx = this.stepCursor + 1;
      this.executeExpandedStep(nextIdx, (status) => {
        if (status === 'continue' && nextIdx >= this.expandedSteps.length - 1) {
          this.evaluateFinalResult();
        }
      });
    }

    executeExpandedStep(stepIdx, onDone) {
      if (stepIdx < 0 || stepIdx >= this.expandedSteps.length) {
        if (typeof onDone === 'function') onDone('done');
        return;
      }

      const ex = this.getCurrentExercise();
      const stepObj = this.expandedSteps[stepIdx];
      const moveDef = REP_MOVE_DEFS[stepObj.dir];
      if (!moveDef) {
        if (typeof onDone === 'function') onDone('error');
        return;
      }

      this.stepCursor = stepIdx;
      this.bityFacing = stepObj.dir;
      this.isAnimatingStep = true;

      // Actualizar resaltado del bloque y progreso "1 de 4 → 2 de 4..." en el DOM sin refrescar la página
      this.updateCodeHighlightDOM();
      this.updateStatusAndFeedbackDOM();

      const nx = this.bityPos.x + moveDef.dx;
      const ny = this.bityPos.y + moveDef.dy;

      const isOutOfBounds = (nx < 0 || nx >= ex.cols || ny < 0 || ny >= ex.rows);
      const isObstacle = (!isOutOfBounds && ex.grid[ny] && ex.grid[ny][nx] === 1);

      if (isOutOfBounds || isObstacle) {
        this.isAnimatingStep = false;
        this.stopExecution();
        this.execMode = 'error';
        this.feedback = {
          type: 'error',
          title: '¡Cuidado! Bity encontró un obstáculo en el camino.',
          detail: isOutOfBounds
            ? `En el movimiento ${stepIdx + 1} (${moveDef.label} ${moveDef.arrow}), Bity intentó salir del mapa. Revisá la cantidad de repeticiones o la dirección.`
            : `En el movimiento ${stepIdx + 1} (${moveDef.label} ${moveDef.arrow}), Bity chocó con un obstáculo. Revisá cuántas veces se repite ese movimiento.`
        };
        this.playSound('error');
        this.updateStatusAndFeedbackDOM();
        this.animateCollisionDOM(stepObj.dir);
        if (typeof onDone === 'function') onDone('collision');
        return;
      }

      const oldPos = { x: this.bityPos.x, y: this.bityPos.y };
      this.bityPos = { x: nx, y: ny };
      this.playSound('click');

      this.animateBityMoveDOM(oldPos, this.bityPos, stepObj.dir, () => {
        this.isAnimatingStep = false;
        this.updateStatusAndFeedbackDOM();
        if (typeof onDone === 'function') onDone('continue');
      });
    }

    evaluateFinalResult() {
      this.stopExecution();
      const ex = this.getCurrentExercise();
      const atGoal = (this.bityPos.x === ex.goal.x && this.bityPos.y === ex.goal.y);
      const usedRepeatBlock = this.blocks.some(b => b.type === 'repeat');

      if (atGoal && usedRepeatBlock) {
        this.execMode = 'won';
        if (!this.completedByGrade[this.currentGrade]) {
          this.completedByGrade[this.currentGrade] = new Set();
        }
        this.completedByGrade[this.currentGrade].add(ex.id);
        this.saveProgress();
        this.playSound('victory');

        const usedBlocksCount = this.blocks.length;
        const totalMovesCount = this.expandedSteps.length;

        this.feedback = {
          type: 'won',
          title: ex.victoryMsg,
          detail: `¡Con solo ${usedBlocksCount} ${usedBlocksCount === 1 ? 'bloque' : 'bloques'} en tu programa lograste que Bity realizara ${totalMovesCount} movimientos!`
        };

        const goalCell = document.querySelector(`#rep-grid-board-mount .ex-grid-cell[data-x="${this.bityPos.x}"][data-y="${this.bityPos.y}"]`);
        const sprite = goalCell ? goalCell.querySelector('.ex-bity-sprite') : null;
        if (sprite) {
          sprite.innerHTML = this.getBitySvgMarkup('celebrating');
          sprite.classList.add('bity-spin-celebration');
        }
        this.updateSolvedTabsDOM();
      } else if (atGoal && !usedRepeatBlock) {
        this.execMode = 'error';
        this.playSound('error');
        this.feedback = {
          type: 'error',
          title: '¡Llegaste al objetivo, pero sin usar el bloque REPETIR!',
          detail: 'En este módulo aprendemos a ahorrar instrucciones iguales. Reemplazá los movimientos repetidos por un bloque REPETIR para superar el desafío.'
        };
      } else {
        this.execMode = 'error';
        this.playSound('error');
        this.feedback = {
          type: 'error',
          title: '¡Casi lo lográs! Bity todavía no llegó al objetivo.',
          detail: 'Revisá cuántas veces se repite cada movimiento o tocá el botón «VER PISTA» para recibir una ayuda.'
        };
      }

      this.updateCodeHighlightDOM();
      this.updateStatusAndFeedbackDOM();
    }

    goToNextExercise() {
      const list = this.getExercisesForCurrentGrade();
      if (this.currentExerciseIdx + 1 < list.length) {
        this.selectExercise(this.currentExerciseIdx + 1);
      } else {
        // Si ya está en el 5.º ejercicio y quiere seguir practicando o cambiar de grado
        this.selectExercise(0);
      }
    }

    // ------------------------------------------------------------
    // ACTUALIZADORES PARCIALES DEL DOM (ESTABILIDAD SIN PARPADEO)
    // ------------------------------------------------------------
    refreshProgramStackDOM() {
      const stackMount = document.getElementById('rep-program-stack-mount');
      if (!stackMount) {
        this.render();
        return;
      }
      stackMount.innerHTML = this.renderProgramStackInner();
      const countBadge = document.getElementById('rep-program-count-badge');
      if (countBadge) {
        const total = this.blocks.length;
        countBadge.textContent = `${total} ${this.txt(total === 1 ? 'bloque' : 'bloques')}`;
      }
      const modeMount = document.getElementById('rep-palette-mode-mount');
      if (modeMount) {
        modeMount.innerHTML = this.renderPaletteTargetNoticeInner();
      }
      this.updateStatusAndFeedbackDOM();
    }

    refreshMapBoardDOM() {
      const boardMount = document.getElementById('rep-grid-board-mount');
      const ex = this.getCurrentExercise();
      if (!boardMount) {
        this.render();
        return;
      }
      boardMount.innerHTML = this.renderMapBoardInner(ex);
      this.updateCodeHighlightDOM();
      this.updateStatusAndFeedbackDOM();
    }

    updateCodeHighlightDOM() {
      const currentStep = (this.stepCursor >= 0 && this.stepCursor < this.expandedSteps.length)
        ? this.expandedSteps[this.stepCursor]
        : null;

      const blockEls = document.querySelectorAll('#rep-program-stack-mount [data-rep-block-idx]');
      blockEls.forEach(el => {
        const idx = parseInt(el.getAttribute('data-rep-block-idx'), 10);
        const isCurrent = !!(currentStep && currentStep.blockIndex === idx && (this.execMode === 'running' || this.execMode === 'step' || this.execMode === 'error'));

        el.classList.toggle('rep-block-executing', isCurrent);
        el.classList.toggle('ex-block-executing', isCurrent);

        const iterContainer = el.querySelector('.rep-c-iter-progress');
        if (iterContainer) {
          const blk = this.blocks[idx];
          if (blk && blk.type === 'repeat') {
            let activeIter = 0;
            if (currentStep && currentStep.blockIndex === idx) {
              activeIter = currentStep.currentIter;
            } else if (currentStep && currentStep.blockIndex > idx) {
              activeIter = blk.times + 1;
            } else if (this.execMode === 'won') {
              activeIter = blk.times + 1;
            }
            iterContainer.innerHTML = this.renderRepeatIterPillsInner(blk.times, activeIter);
          }
        }
      });
    }

    renderRepeatIterPillsInner(times, activeIter) {
      const pills = [];
      for (let k = 1; k <= times; k++) {
        let cls = 'rep-iter-step-pill';
        if (activeIter > k) cls += ' iter-done';
        else if (activeIter === k) cls += ' iter-current';
        pills.push(`<span class="${cls}">${k} ${this.txt('de')} ${times}</span>`);
      }
      return pills.join('<span class="rep-iter-arrow">→</span>');
    }

    updateStatusAndFeedbackDOM() {
      const statusMount = document.getElementById('rep-status-bar-mount');
      if (statusMount) {
        statusMount.innerHTML = this.renderStatusInner();
        statusMount.classList.toggle('status-active', this.execMode !== 'idle');
      }

      const isBusy = (this.isAnimatingStep || this.execMode === 'running');
      const btnRunAll = document.getElementById('btn-rep-run-all');
      if (btnRunAll) btnRunAll.disabled = isBusy;
      const btnRunStep = document.getElementById('btn-rep-run-step');
      if (btnRunStep) btnRunStep.disabled = isBusy;

      const feedbackMount = document.getElementById('rep-feedback-mount');
      if (feedbackMount) {
        feedbackMount.innerHTML = this.renderFeedbackInner();
      }
    }

    updateSolvedTabsDOM() {
      const doneSet = this.completedByGrade[this.currentGrade] || new Set();
      const ex = this.getCurrentExercise();
      const tabBtn = document.querySelector(`.btn-rep-ex-tab[data-ex-idx="${this.currentExerciseIdx}"]`);
      if (tabBtn && doneSet.has(ex.id)) {
        tabBtn.classList.add('completed');
        const iconEl = tabBtn.querySelector('.rep-tab-icon');
        if (iconEl) iconEl.textContent = '✅';
      }
      const progBadge = document.getElementById('rep-top-progress-count');
      if (progBadge) {
        progBadge.textContent = `${doneSet.size} / 5`;
      }
    }

    animateBityMoveDOM(oldPos, newPos, dir, callback) {
      const oldCell = document.querySelector(`#rep-grid-board-mount .ex-grid-cell[data-x="${oldPos.x}"][data-y="${oldPos.y}"]`);
      const newCell = document.querySelector(`#rep-grid-board-mount .ex-grid-cell[data-x="${newPos.x}"][data-y="${newPos.y}"]`);

      if (!oldCell || !newCell) {
        if (typeof callback === 'function') callback();
        return;
      }

      oldCell.classList.remove('ex-cell-has-bity');
      newCell.classList.add('ex-cell-has-bity');

      let sprite = oldCell.querySelector('.ex-bity-sprite');
      if (!sprite) {
        sprite = document.createElement('div');
        sprite.className = `ex-bity-sprite facing-${dir}`;
        sprite.innerHTML = this.getBitySvgMarkup('happy');
      }

      let startTransform = '';
      if (dir === 'right') startTransform = 'translateX(-100%)';
      else if (dir === 'left') startTransform = 'translateX(100%)';
      else if (dir === 'down') startTransform = 'translateY(-100%)';
      else if (dir === 'up') startTransform = 'translateY(100%)';

      sprite.className = `ex-bity-sprite facing-${dir}`;
      sprite.style.transition = 'none';
      sprite.style.transform = startTransform;

      newCell.appendChild(sprite);
      void sprite.offsetHeight;

      sprite.style.transition = 'transform 0.22s cubic-bezier(0.25, 1, 0.5, 1)';
      sprite.style.transform = 'translate(0, 0)';

      setTimeout(() => {
        if (sprite) {
          sprite.style.transition = '';
          sprite.style.transform = '';
        }
        if (typeof callback === 'function') callback();
      }, 225);
    }

    animateCollisionDOM(dir) {
      const cell = document.querySelector(`#rep-grid-board-mount .ex-grid-cell[data-x="${this.bityPos.x}"][data-y="${this.bityPos.y}"]`);
      const sprite = cell ? cell.querySelector('.ex-bity-sprite') : null;
      if (sprite) {
        sprite.innerHTML = this.getBitySvgMarkup('alert');
        sprite.classList.add(`bity-bump-${dir}`);
        if (cell) cell.classList.add('cell-collision-halo');
        setTimeout(() => {
          sprite.classList.remove(`bity-bump-${dir}`);
          if (cell) cell.classList.remove('cell-collision-halo');
        }, 380);
      }
    }

    // ============================================================
    // 4. RENDERIZADORES DE INTERFAZ
    // ============================================================
    render() {
      const mount = document.getElementById('repeticiones-content-mount');
      if (!mount) return;

      mount.innerHTML = `
        <div class="rep-app-container ${this.currentGrade === 1 ? 'rep-grade-1-uppercase' : ''}">
          ${this.renderTopBar()}
          <main class="rep-main-body">
            ${this.currentView === 'welcome'
              ? this.renderWelcomeView()
              : (this.currentView === 'concept' ? this.renderConceptView() : this.renderExercisesView())}
          </main>
        </div>
      `;
    }

    renderTopBar() {
      const doneSet = this.completedByGrade[this.currentGrade] || new Set();

      return `
        <header class="rep-topbar">
          <div class="rep-topbar-left">
            <button type="button" class="btn-rep-back" onclick="window.repeticionesModule.handleBackButton()">
              <span>⬅️</span>
              <span>${this.currentView === 'welcome' ? this.txt('Menú Principal') : this.txt('Atrás')}</span>
            </button>
            <div class="rep-title-box">
              <span class="rep-kicker">🎄 ${this.txt('INFORMÁTICA MÁGICA • PROGRAMACIÓN CON BLOQUES')}</span>
              <h1 class="rep-main-title">🔁 ${this.txt('MÓDULO: REPETICIONES')}</h1>
            </div>
          </div>

          <div class="rep-topbar-center" role="navigation" aria-label="Secciones del módulo Repeticiones">
            <button type="button"
              class="btn-rep-stage-nav ${this.currentView === 'welcome' ? 'active' : ''}"
              onclick="window.repeticionesModule.goToView('welcome')">
              <span>👋</span> <span>${this.txt('Bienvenida')}</span>
            </button>
            <button type="button"
              class="btn-rep-stage-nav ${this.currentView === 'concept' ? 'active' : ''}"
              onclick="window.repeticionesModule.goToView('concept')">
              <span>💡</span> <span>${this.txt('1. ¿Qué es repetir?')}</span>
            </button>
            <button type="button"
              class="btn-rep-stage-nav ${this.currentView === 'exercises' ? 'active' : ''}"
              onclick="window.repeticionesModule.goToView('exercises')">
              <span>🧩</span> <span>${this.txt('2. Cinco Ejercicios Guiados')}</span>
            </button>
          </div>

          <div class="rep-topbar-right">
            <div class="rep-grade-pills-bar" role="group" aria-label="Seleccionar grado escolar">
              <span class="rep-grade-lbl">🎒 ${this.txt('Grado')}:</span>
              ${[1, 2, 3, 4, 5].map(g => `
                <button type="button"
                  class="btn-rep-grade-pill ${this.currentGrade === g ? 'active' : ''}"
                  onclick="window.repeticionesModule.selectGrade(${g})">
                  ${g}.º
                </button>
              `).join('')}
            </div>

            <div class="rep-progress-badge" title="${this.txt('Ejercicios completados en este grado')}">
              <span>⭐</span>
              <span id="rep-top-progress-count">${doneSet.size} / 5</span>
            </div>
          </div>
        </header>
      `;
    }

    // ------------------------------------------------------------
    // VISTA 1: PANTALLA DE BIENVENIDA
    // ------------------------------------------------------------
    renderWelcomeView() {
      const gradeMeta = REP_GRADE_ADAPTATION[this.currentGrade] || REP_GRADE_ADAPTATION[1];

      return `
        <section class="rep-welcome-section">
          <div class="rep-welcome-card">
            <div class="rep-welcome-decor" aria-hidden="true">🎄 ⭐ 🎁 ❄️ 🎁 ⭐ 🎄</div>

            <div class="rep-welcome-bity-stage">
              ${this.getBitySvgMarkup('happy')}
            </div>

            <span class="rep-welcome-badge">🔁 ${this.txt('NUEVO MÓDULO DE PROGRAMACIÓN CON BLOQUES')}</span>
            <h2 class="rep-welcome-title">${this.txt('REPETICIONES')}</h2>

            <div class="rep-welcome-speech-bubble">
              <p class="rep-welcome-speech-text">
                “${this.txt('¡Hola! Hoy vamos a aprender a repetir instrucciones. A veces necesitamos hacer lo mismo muchas veces. ¡Con un solo bloque podemos lograrlo!')}”
              </p>
            </div>

            <!-- Selector de Grado (1.º a 5.º Grado) -->
            <div class="rep-welcome-grade-box">
              <span class="rep-welcome-grade-label">🎒 ${this.txt('ELEGÍ TU GRADO ESCOLAR (1.º A 5.º GRADO):')}</span>
              <div class="rep-welcome-grade-buttons">
                ${[1, 2, 3, 4, 5].map(g => `
                  <button type="button"
                    class="btn-rep-welcome-grade ${this.currentGrade === g ? 'active' : ''}"
                    onclick="window.repeticionesModule.selectGrade(${g})">
                    ${g}.º ${this.txt('Grado')}
                  </button>
                `).join('')}
              </div>
              <p class="rep-welcome-grade-note">✨ ${this.txt(gradeMeta.levelNote)}</p>
            </div>

            <button type="button"
              id="btn-rep-welcome-start"
              class="btn-rep-start-main"
              onclick="window.repeticionesModule.goToView('concept')">
              <span>🚀</span>
              <span>${this.txt('¡COMENZAR!')}</span>
            </button>
          </div>
        </section>
      `;
    }

    // ------------------------------------------------------------
    // VISTA 2: PRIMERA PARTE — ¿QUÉ SIGNIFICA REPETIR?
    // ------------------------------------------------------------
    renderConceptView() {
      return `
        <section class="rep-concept-wrapper">
          <!-- Tarjeta de Explicación Conceptual Sencilla -->
          <div class="rep-concept-hero-card">
            <div class="rep-concept-header">
              <div class="rep-concept-bity">${this.getBitySvgMarkup('happy')}</div>
              <div>
                <span class="rep-concept-tag">💡 ${this.txt('PRIMERA PARTE: CONCEPTO VISUAL')}</span>
                <h2 class="rep-concept-title">${this.txt('¿QUÉ SIGNIFICA REPETIR?')}</h2>
              </div>
            </div>

            <div class="rep-concept-quotes-grid">
              <div class="rep-quote-box quote-highlight">
                <span class="rep-quote-icon">🔁</span>
                <p class="rep-quote-text">
                  “${this.txt('Repetir significa hacer la misma acción varias veces')}”.
                </p>
              </div>

              <div class="rep-quote-box">
                <span class="rep-quote-icon">🤖</span>
                <p class="rep-quote-text">
                  “${this.txt('Por ejemplo, si Bity tiene que avanzar 4 pasos, no hace falta escribir cuatro veces MOVER HACIA ADELANTE. Podemos usar el bloque REPETIR y decirle cuántas veces queremos que lo haga')}”.
                </p>
              </div>
            </div>

            <!-- Ilustración Interactiva de los 4 pasos de Bity -->
            <div class="rep-illustration-strip">
              <p class="rep-strip-caption">
                🗺️ ${this.txt('MIRÁ CÓMO BITY AVANZA 4 CASILLEROS SEGUIDOS HACIA EL REGALO:')}
              </p>

              <div class="rep-strip-tiles">
                <div class="rep-demo-tile tile-start" id="rep-concept-tile-0">
                  <span class="tile-step-num">${this.txt('SALIDA')}</span>
                  <div class="rep-demo-bity-holder">
                    <div style="width:46px;height:46px;">${this.getBitySvgMarkup('happy')}</div>
                  </div>
                </div>
                <span class="rep-demo-arrow">→</span>
                <div class="rep-demo-tile" id="rep-concept-tile-1">
                  <span class="tile-step-num">${this.txt('PASO 1')}</span>
                  <div class="rep-demo-bity-holder"></div>
                </div>
                <span class="rep-demo-arrow">→</span>
                <div class="rep-demo-tile" id="rep-concept-tile-2">
                  <span class="tile-step-num">${this.txt('PASO 2')}</span>
                  <div class="rep-demo-bity-holder"></div>
                </div>
                <span class="rep-demo-arrow">→</span>
                <div class="rep-demo-tile" id="rep-concept-tile-3">
                  <span class="tile-step-num">${this.txt('PASO 3')}</span>
                  <div class="rep-demo-bity-holder"></div>
                </div>
                <span class="rep-demo-arrow">→</span>
                <div class="rep-demo-tile tile-goal" id="rep-concept-tile-4">
                  <span class="tile-step-num">${this.txt('PASO 4')}</span>
                  <div class="rep-demo-bity-holder">🎁</div>
                </div>
              </div>

              <div style="margin-top: 12px; display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
                <button type="button" class="btn-rep-show-hint" onclick="window.repeticionesModule.runConceptLiveDemo()">
                  <span>▶️</span> <span>${this.txt('VER A BITY REPETIR LOS 4 PASOS')}</span>
                </button>
                <span id="rep-concept-demo-status" style="font-size: 0.88rem; font-weight: 800; color: #bae6fd;">
                  ${this.txt('Tocá el botón para ver cómo Bity repite 4 veces el mismo paso')}
                </span>
              </div>
            </div>
          </div>

          <!-- Ejemplo Visual Comparativo: Sin Repetición vs Con Bloque REPETIR -->
          <div class="rep-comparison-card">
            <div class="rep-comparison-heading">
              <h3>👀 ${this.txt('EJEMPLO VISUAL: COMPARÁ LAS DOS FORMAS DE PROGRAMAR')}</h3>
              <p>${this.txt('Ambas secuencias hacen que Bity realice exactamente el mismo recorrido de 4 pasos:')}</p>
            </div>

            <div class="rep-comparison-columns">
              <!-- Columna 1: Secuencia sin repetición -->
              <div class="rep-comp-col col-without-repeat">
                <span class="rep-comp-col-badge">1️⃣ ${this.txt('SECUENCIA SIN REPETICIÓN (4 BLOQUES IGUALES)')}</span>
                <div class="rep-comp-blocks-stack">
                  <div class="rep-static-move-block"><span>→</span> <span>MOVER HACIA LA DERECHA</span></div>
                  <div class="rep-static-move-block"><span>→</span> <span>MOVER HACIA LA DERECHA</span></div>
                  <div class="rep-static-move-block"><span>→</span> <span>MOVER HACIA LA DERECHA</span></div>
                  <div class="rep-static-move-block"><span>→</span> <span>MOVER HACIA LA DERECHA</span></div>
                </div>
              </div>

              <!-- Flecha de transición visual -->
              <div class="rep-comp-transition-arrow">
                <div class="rep-comp-arrow-circle">➔</div>
                <span class="rep-comp-arrow-label">${this.txt('¡SE SIMPLIFICA EN UN SOLO BLOQUE!')}</span>
              </div>

              <!-- Columna 2: Con el bloque REPETIR (inspirado en img/repeticiones.jfif) -->
              <div class="rep-comp-col col-with-repeat">
                <span class="rep-comp-col-badge">2️⃣ ${this.txt('CON EL BLOQUE REPETIR (¡MÁS CORTO Y CLARO!)')}</span>

                <div class="rep-c-block" style="max-width: 390px; margin: 0 auto;">
                  <div class="rep-c-header">
                    <div class="rep-c-header-title">
                      <span>REPETIR</span>
                      <span class="rep-c-count-control">
                        <span class="rep-c-count-badge">4</span>
                      </span>
                      <span>VECES:</span>
                    </div>
                  </div>
                  <div class="rep-c-body">
                    <div class="rep-c-spine"></div>
                    <div class="rep-c-mouth">
                      <span class="rep-c-curly-brace">{</span>
                      <div class="rep-c-inner-slot">
                        <div class="rep-inner-move-block">
                          <div class="rep-inner-move-left">
                            <span class="rep-inner-arrow-badge">→</span>
                            <span>MOVER HACIA LA DERECHA</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="rep-c-footer">
                    <div class="rep-c-iter-progress">
                      ${this.renderRepeatIterPillsInner(4, 0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="rep-concept-footer-actions">
            <button type="button"
              id="btn-rep-go-exercises"
              class="btn-rep-start-main"
              onclick="window.repeticionesModule.goToView('exercises')">
              <span>🧩</span>
              <span>${this.txt('¡PRACTICAR EN LOS 5 EJERCICIOS GUIADOS!')} ➔</span>
            </button>
          </div>
        </section>
      `;
    }

    // ------------------------------------------------------------
    // VISTA 3: SEGUNDA PARTE — LOS 5 EJERCICIOS GUIADOS
    // ------------------------------------------------------------
    renderExercisesView() {
      const exList = this.getExercisesForCurrentGrade();
      const ex = this.getCurrentExercise();
      const doneSet = this.completedByGrade[this.currentGrade] || new Set();
      const isBusy = (this.isAnimatingStep || this.execMode === 'running');
      const moveKeys = ['right', 'left', 'down', 'up'];

      return `
        <section class="rep-exercises-workspace">
          <!-- Barra de Selección de los 5 Ejercicios Guiados -->
          <div class="rep-exercises-selector-bar">
            <div class="rep-ex-tabs-group" role="tablist" aria-label="Cinco ejercicios guiados de repeticiones">
              ${exList.map((item, idx) => {
                const isDone = doneSet.has(item.id);
                const isCurrent = (this.currentExerciseIdx === idx);
                return `
                  <button type="button"
                    data-ex-idx="${idx}"
                    class="btn-rep-ex-tab ${isCurrent ? 'active' : ''} ${isDone ? 'completed' : ''}"
                    onclick="window.repeticionesModule.selectExercise(${idx})">
                    <span class="rep-tab-icon">${isDone ? '✅' : item.goalIcon}</span>
                    <span>${this.txt(`Ejercicio ${item.number}`)}</span>
                  </button>
                `;
              }).join('')}
            </div>

            <button type="button"
              class="btn-rep-stage-nav"
              onclick="window.repeticionesModule.goToView('concept')"
              title="${this.txt('Repasar ¿Qué significa repetir?')}">
              <span>📖</span> <span>${this.txt('Ver explicación de Repetir')}</span>
            </button>
          </div>

          <!-- SECTOR A: ENUNCIADO DEL EJERCICIO + SISTEMA DE PISTAS GUIADAS -->
          <div class="ex-sector-prompt alg-card">
            <div class="ex-prompt-bity-box">
              <div class="ex-prompt-bity-svg">
                ${this.getBitySvgMarkup(this.execMode === 'won' ? 'celebrating' : (this.execMode === 'error' ? 'alert' : 'happy'))}
              </div>
            </div>

            <div class="ex-prompt-text-box">
              <div class="ex-prompt-badges-row">
                <span class="ex-badge-grade">${this.currentGrade}.º ${this.txt('Grado')}</span>
                <span class="ex-badge-challenge">🎄 ${this.txt(ex.title)}</span>
                <span class="rep-diff-badge rep-diff-${ex.difficultyColor}">${this.txt(ex.difficultyLabel)}</span>
                ${doneSet.has(ex.id) ? `<span class="ex-badge-solved">✅ ${this.txt('¡COMPLETADO!')}</span>` : ''}
              </div>
              <p class="ex-prompt-statement">“${this.txt(ex.prompt)}”</p>

              <!-- Sección de Pistas Guiadas Progresivas -->
              <div class="rep-hints-card" id="rep-hints-card-mount">
                ${this.renderHintsCardInner(ex)}
              </div>
            </div>

            <div class="ex-prompt-goal-card">
              <div class="ex-goal-icon-preview">${ex.goalIcon}</div>
              <div class="ex-goal-meta">
                <span class="ex-goal-kicker">${this.txt('OBJETIVO')}</span>
                <strong class="ex-goal-name">${this.txt(ex.goalName)}</strong>
                <span class="ex-goal-collectible-tag">🔁 ${this.txt('Usá el bloque REPETIR')}</span>
              </div>
            </div>
          </div>

          <!-- CONTENEDOR DE DOS COLUMNAS: SECTOR DE CÓDIGO Y SECTOR DEL MAPA -->
          <div class="ex-main-two-sectors">

            <!-- SECTOR B: PALETA Y ÁREA DE CÓDIGO -->
            <div class="ex-sector-code alg-card">
              <div class="ex-sector-header">
                <span class="ex-sector-tag">🧩 ${this.txt('CONSTRUÍ TU PROGRAMA CON REPETICIONES')}</span>
                <span class="ex-sector-subhint">${this.txt('Agregá el bloque REPETIR, elegí cuántas veces y colocá el movimiento adentro')}</span>
              </div>

              <div class="ex-code-panels-split">
                <!-- SUB-PANEL 1: BLOQUES DISPONIBLES -->
                <div class="ex-palette-column">
                  <h4 class="ex-column-title">📦 ${this.txt('BLOQUES DISPONIBLES')}</h4>

                  <!-- Encabezado fijo -->
                  <div class="ex-palette-start-info">
                    <div class="ex-block-piece ex-block-start-header-preview">
                      <span>🚩</span>
                      <span>AL EMPEZAR A EJECUTAR</span>
                    </div>
                    <span class="ex-start-unique-note">✓ ${this.txt('Inicio del programa')}</span>
                  </div>

                  <!-- Bloque REPETIR [N] VECES (Inspirado en img/repeticiones.jfif) -->
                  <div class="ex-palette-group-label" style="color:#86efac;">🔁 ${this.txt('BLOQUE DE REPETICIÓN')}</div>
                  <button type="button"
                    id="btn-rep-add-repeat"
                    class="btn-palette-add-repeat"
                    draggable="${!isBusy}"
                    ${isBusy ? 'disabled' : ''}
                    ondragstart="window.repeticionesModule.handlePaletteDragStart(event, 'repeat')"
                    onclick="window.repeticionesModule.addRepeatBlock()">
                    <span>🔁 REPETIR</span>
                    <span class="rep-palette-count-pill">${(REP_GRADE_ADAPTATION[this.currentGrade] || REP_GRADE_ADAPTATION[1]).defaultRepeatCount}</span>
                    <span>VECES { } ＋</span>
                  </button>

                  <!-- Aviso de dónde se colocará el próximo movimiento -->
                  <div id="rep-palette-mode-mount">
                    ${this.renderPaletteTargetNoticeInner()}
                  </div>

                  <!-- Bloques de Movimiento -->
                  <div class="ex-palette-group-label">🧭 ${this.txt('INSTRUCCIONES DE MOVIMIENTO')}</div>
                  <div class="ex-palette-movements-list">
                    ${moveKeys.map(dir => {
                      const def = REP_MOVE_DEFS[dir];
                      return `
                        <button type="button"
                          class="ex-palette-block-btn ex-block-dir-${dir}"
                          data-move-dir="${dir}"
                          draggable="${!isBusy}"
                          ${isBusy ? 'disabled' : ''}
                          ondragstart="window.repeticionesModule.handlePaletteDragStart(event, 'move', '${dir}')"
                          onclick="window.repeticionesModule.addMovementBlock('${dir}')">
                          <span class="ex-block-arrow-badge">${def.arrow}</span>
                          <span class="ex-block-label-text">${def.label}</span>
                          <span class="ex-block-add-plus">＋</span>
                        </button>
                      `;
                    }).join('')}
                  </div>
                </div>

                <!-- SUB-PANEL 2: ÁREA DE CÓDIGO -->
                <div class="ex-program-column">
                  <div class="ex-program-header-row">
                    <h4 class="ex-column-title">📜 ${this.txt('TU ALGORITMO')}</h4>
                    <span class="ex-program-count-badge" id="rep-program-count-badge">
                      ${this.blocks.length} ${this.txt(this.blocks.length === 1 ? 'bloque' : 'bloques')}
                    </span>
                  </div>

                  <div class="ex-program-canvas"
                    id="rep-program-canvas"
                    ondragover="window.repeticionesModule.handleDragOver(event, this)"
                    ondragleave="window.repeticionesModule.handleDragLeave(event, this)"
                    ondrop="window.repeticionesModule.handleDropOnCanvas(event)">

                    <div class="ex-header-cap-block">
                      <div class="ex-cap-content">
                        <span class="ex-cap-flag">🚩</span>
                        <span class="ex-cap-title">AL EMPEZAR A EJECUTAR</span>
                      </div>
                    </div>

                    <div class="ex-vertical-blocks-stack" id="rep-program-stack-mount" style="gap: 12px; padding-top: 8px;">
                      ${this.renderProgramStackInner()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- SECTOR C: MAPA NAVIDEÑO Y CONTROLES DE EJECUCIÓN -->
            <div class="ex-sector-map alg-card">
              <div class="ex-sector-header">
                <span class="ex-sector-tag">🗺️ ${this.txt('MAPA DEL DESAFÍO')}</span>
                <span class="ex-map-dimensions-badge">${ex.cols} × ${ex.rows} ${this.txt('casilleros')}</span>
              </div>

              <div class="ex-map-board-frame">
                <div class="ex-grid-board" id="rep-grid-board-mount" style="--ex-cols: ${ex.cols}; --ex-rows: ${ex.rows};">
                  ${this.renderMapBoardInner(ex)}
                </div>
              </div>

              <div class="ex-map-legend">
                <span class="ex-legend-item">🤖 ${this.txt('Bity')}</span>
                <span class="ex-legend-item">🚩 ${this.txt('Salida')}</span>
                <span class="ex-legend-item">${ex.goalIcon} ${this.txt('Objetivo')}</span>
                <span class="ex-legend-item">🌲⛄ ${this.txt('Obstáculos')}</span>
              </div>

              <!-- Barra de estado de ejecución (con progreso 1 de N → 2 de N...) -->
              <div class="ex-execution-status-bar ${this.execMode !== 'idle' ? 'status-active' : ''}" id="rep-status-bar-mount">
                ${this.renderStatusInner()}
              </div>

              <!-- Botones EJECUTAR, EJECUTAR PASO A PASO, REINICIAR, BORRAR CÓDIGO -->
              <div class="ex-controls-area">
                <div class="ex-primary-exec-buttons">
                  <button type="button"
                    id="btn-rep-run-all"
                    class="btn-ex-exec btn-ex-run-all"
                    ${isBusy ? 'disabled' : ''}
                    onclick="window.repeticionesModule.runAll()">
                    <span>▶️</span>
                    <span>EJECUTAR</span>
                  </button>

                  <button type="button"
                    id="btn-rep-run-step"
                    class="btn-ex-exec btn-ex-run-step"
                    ${isBusy ? 'disabled' : ''}
                    onclick="window.repeticionesModule.runStepByStep()">
                    <span>👣</span>
                    <span>EJECUTAR PASO A PASO</span>
                  </button>
                </div>

                <div class="ex-secondary-exec-buttons">
                  <button type="button"
                    id="btn-rep-reset"
                    class="btn-ex-secondary btn-ex-reset"
                    onclick="window.repeticionesModule.resetPosition()">
                    <span>🔄</span>
                    <span>REINICIAR</span>
                  </button>

                  <button type="button"
                    id="btn-rep-clear"
                    class="btn-ex-secondary btn-ex-clear"
                    onclick="window.repeticionesModule.clearCode()">
                    <span>🗑️</span>
                    <span>BORRAR CÓDIGO</span>
                  </button>
                </div>
              </div>

              <!-- Retroalimentación y Felicitación Final -->
              <div id="rep-feedback-mount">
                ${this.renderFeedbackInner()}
              </div>
            </div>

          </div>
        </section>
      `;
    }

    renderHintsCardInner(ex) {
      const hints = ex.hints || [];
      const shownHints = hints.slice(0, this.revealedHintsCount);
      const hasMoreHints = this.revealedHintsCount < hints.length;

      return `
        <div class="rep-hints-header">
          <span class="rep-hints-title">
            <span>💡</span>
            <span>${this.txt('AYUDA DE BITY')} ${this.revealedHintsCount > 0 ? `(${this.revealedHintsCount}/${hints.length})` : ''}</span>
          </span>
          <button type="button"
            id="btn-rep-ver-pista"
            class="btn-rep-show-hint"
            onclick="window.repeticionesModule.revealNextHint()">
            <span>💡</span>
            <span>${this.revealedHintsCount === 0
              ? this.txt('VER PISTA')
              : (hasMoreHints ? this.txt('VER OTRA PISTA') : this.txt('VOLVER A PISTA 1'))}</span>
          </button>
        </div>

        ${shownHints.length > 0 ? `
          <div class="rep-hints-list">
            ${shownHints.map((h, i) => `
              <div class="rep-hint-item">
                <span class="rep-hint-step-tag">PISTA ${i + 1}:</span>
                <span>“${this.txt(h)}”</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
      `;
    }

    renderPaletteTargetNoticeInner() {
      const focusedBlk = this.focusedRepeatId
        ? this.blocks.find(b => b.id === this.focusedRepeatId && b.type === 'repeat')
        : null;

      if (focusedBlk) {
        return `
          <div class="rep-target-mode-box">
            <span>🎯 ${this.txt('El próximo movimiento irá ADENTRO del bloque REPETIR seleccionado')}</span>
            <button type="button"
              class="btn-rep-unfocus-slot"
              onclick="window.repeticionesModule.focusRepeatMouth(null)"
              title="${this.txt('Agregar como bloque individual afuera')}">
              ${this.txt('Poner afuera')}
            </button>
          </div>
        `;
      }
      return '';
    }

    renderProgramStackInner() {
      const isBusy = (this.isAnimatingStep || this.execMode === 'running');
      if (this.blocks.length === 0) {
        return `
          <div class="ex-empty-algorithm-dropzone">
            <div class="ex-empty-arrow">🔁</div>
            <p class="ex-empty-title">${this.txt('Tu algoritmo está vacío')}</p>
            <p class="ex-empty-sub">${this.txt('Tocá o arrastrá el bloque verde REPETIR y colocá adentro la instrucción de movimiento que Bity debe repetir.')}</p>
          </div>
        `;
      }

      const currentStep = (this.stepCursor >= 0 && this.stepCursor < this.expandedSteps.length)
        ? this.expandedSteps[this.stepCursor]
        : null;

      return this.blocks.map((blk, idx) => {
        const isExecutingNow = !!(currentStep && currentStep.blockIndex === idx && (this.execMode === 'running' || this.execMode === 'step' || this.execMode === 'error'));

        if (blk.type === 'repeat') {
          const isMouthFocused = (this.focusedRepeatId === blk.id);
          const innerDef = blk.action ? REP_MOVE_DEFS[blk.action] : null;
          let activeIter = 0;
          if (currentStep && currentStep.blockIndex === idx) {
            activeIter = currentStep.currentIter;
          } else if (currentStep && currentStep.blockIndex > idx) {
            activeIter = blk.times + 1;
          } else if (this.execMode === 'won') {
            activeIter = blk.times + 1;
          }

          return `
            <div class="rep-c-block ${isExecutingNow ? 'rep-block-executing' : ''}"
              data-rep-block-idx="${idx}"
              data-rep-block-id="${blk.id}">
              <!-- Encabezado verde: REPETIR ( N ) VECES: -->
              <div class="rep-c-header">
                <div class="rep-c-header-title">
                  <span class="ex-placed-step-num">${idx + 1}</span>
                  <span>REPETIR</span>
                  <span class="rep-c-count-control">
                    <button type="button"
                      class="btn-rep-count-step"
                      ${isBusy || blk.times <= 2 ? 'disabled' : ''}
                      onclick="event.stopPropagation(); window.repeticionesModule.changeRepeatCount('${blk.id}', -1)"
                      title="${this.txt('Disminuir repeticiones')}">−</button>
                    <span class="rep-c-count-badge" data-rep-times="${blk.times}">${blk.times}</span>
                    <button type="button"
                      class="btn-rep-count-step"
                      ${isBusy || blk.times >= 10 ? 'disabled' : ''}
                      onclick="event.stopPropagation(); window.repeticionesModule.changeRepeatCount('${blk.id}', 1)"
                      title="${this.txt('Aumentar repeticiones')}">＋</button>
                  </span>
                  <span>VECES:</span>
                </div>

                <div class="ex-placed-controls">
                  <button type="button"
                    class="btn-ex-block-ctrl"
                    ${idx === 0 || isBusy ? 'disabled' : ''}
                    onclick="event.stopPropagation(); window.repeticionesModule.moveBlock(${idx}, -1)"
                    title="${this.txt('Subir bloque')}">▲</button>
                  <button type="button"
                    class="btn-ex-block-ctrl"
                    ${idx === this.blocks.length - 1 || isBusy ? 'disabled' : ''}
                    onclick="event.stopPropagation(); window.repeticionesModule.moveBlock(${idx}, 1)"
                    title="${this.txt('Bajar bloque')}">▼</button>
                  <button type="button"
                    class="btn-ex-block-remove"
                    ${isBusy ? 'disabled' : ''}
                    onclick="event.stopPropagation(); window.repeticionesModule.removeBlock(${idx})"
                    title="${this.txt('Eliminar bloque REPETIR')}">✕</button>
                </div>
              </div>

              <!-- Cuerpo en C con llave naranja { y movimiento interno -->
              <div class="rep-c-body">
                <div class="rep-c-spine"></div>
                <div class="rep-c-mouth ${isMouthFocused ? 'mouth-selected' : ''}"
                  ondragover="window.repeticionesModule.handleDragOver(event, this)"
                  ondragleave="window.repeticionesModule.handleDragLeave(event, this)"
                  ondrop="window.repeticionesModule.handleDropOnRepeatMouth(event, '${blk.id}')"
                  onclick="window.repeticionesModule.focusRepeatMouth('${blk.id}')">
                  <span class="rep-c-curly-brace" aria-hidden="true">{</span>

                  <div class="rep-c-inner-slot">
                    ${innerDef ? `
                      <div class="rep-inner-move-block">
                        <div class="rep-inner-move-left">
                          <span class="rep-inner-arrow-badge">${innerDef.arrow}</span>
                          <span>${innerDef.label}</span>
                        </div>
                        <button type="button"
                          class="btn-ex-block-remove"
                          ${isBusy ? 'disabled' : ''}
                          onclick="event.stopPropagation(); window.repeticionesModule.setRepeatInnerAction('${blk.id}', null)"
                          title="${this.txt('Quitar o cambiar instrucción interna')}">✕</button>
                      </div>
                    ` : `
                      <button type="button"
                        class="rep-empty-mouth-btn"
                        onclick="event.stopPropagation(); window.repeticionesModule.focusRepeatMouth('${blk.id}')">
                        ➕ ${this.txt('Elegí o arrastrá aquí el movimiento a repetir')}
                      </button>
                    `}

                    <!-- Selector rápido de dirección para niños y pantallas táctiles -->
                    <div class="rep-quick-dirs-row" onclick="event.stopPropagation();">
                      <span class="rep-quick-dirs-lbl">${this.txt('Movimiento interno:')}</span>
                      ${['right', 'left', 'down', 'up'].map(d => {
                        const mDef = REP_MOVE_DEFS[d];
                        return `
                          <button type="button"
                            class="btn-rep-quick-dir ${blk.action === d ? 'active-dir' : ''}"
                            ${isBusy ? 'disabled' : ''}
                            onclick="window.repeticionesModule.setRepeatInnerAction('${blk.id}', '${d}')"
                            title="${this.txt(mDef.label)}">
                            ${mDef.arrow} ${this.txt(mDef.shortLabel)}
                          </button>
                        `;
                      }).join('')}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Base del bloque C con progreso de repeticiones: 1 de 4 → 2 de 4... -->
              <div class="rep-c-footer">
                <div class="rep-c-iter-progress">
                  ${this.renderRepeatIterPillsInner(blk.times, activeIter)}
                </div>
              </div>
            </div>
          `;
        }

        // Bloque de movimiento individual
        const moveDef = REP_MOVE_DEFS[blk.dir] || REP_MOVE_DEFS.right;
        return `
          <div class="ex-placed-block ex-block-dir-${blk.dir} ${isExecutingNow ? 'ex-block-executing' : ''}"
            data-rep-block-idx="${idx}"
            data-rep-block-id="${blk.id}">
            <span class="ex-placed-step-num">${idx + 1}</span>
            <span class="ex-placed-arrow-badge">${moveDef.arrow}</span>
            <span class="ex-placed-label">${moveDef.label}</span>
            ${isExecutingNow ? `<span class="ex-executing-tag">▶ ${this.txt('EJECUTANDO')}</span>` : ''}
            <div class="ex-placed-controls">
              <button type="button"
                class="btn-ex-block-ctrl"
                ${idx === 0 || isBusy ? 'disabled' : ''}
                onclick="event.stopPropagation(); window.repeticionesModule.moveBlock(${idx}, -1)"
                title="${this.txt('Subir bloque')}">▲</button>
              <button type="button"
                class="btn-ex-block-ctrl"
                ${idx === this.blocks.length - 1 || isBusy ? 'disabled' : ''}
                onclick="event.stopPropagation(); window.repeticionesModule.moveBlock(${idx}, 1)"
                title="${this.txt('Bajar bloque')}">▼</button>
              <button type="button"
                class="btn-ex-block-remove"
                ${isBusy ? 'disabled' : ''}
                onclick="event.stopPropagation(); window.repeticionesModule.removeBlock(${idx})"
                title="${this.txt('Quitar bloque')}">✕</button>
            </div>
          </div>
        `;
      }).join('');
    }

    renderMapBoardInner(ex) {
      const obstacleIcons = ['🌲', '⛄', '🎄', '📦', '🧊'];
      let html = '';

      for (let r = 0; r < ex.rows; r++) {
        for (let c = 0; c < ex.cols; c++) {
          const isObstacle = (ex.grid[r] && ex.grid[r][c] === 1);
          const isStart = (ex.start.x === c && ex.start.y === r);
          const isGoal = (ex.goal.x === c && ex.goal.y === r);
          const isBityHere = (this.bityPos.x === c && this.bityPos.y === r);

          let cellClasses = 'ex-grid-cell';
          cellClasses += isObstacle ? ' ex-cell-obstacle' : ' ex-cell-path';
          if (isStart) cellClasses += ' ex-cell-start';
          if (isGoal) cellClasses += ' ex-cell-goal';
          if (isBityHere) cellClasses += ' ex-cell-has-bity';

          const obsIcon = obstacleIcons[(r * 5 + c * 3) % obstacleIcons.length];

          html += `
            <div class="${cellClasses}" data-x="${c}" data-y="${r}">
              ${isStart ? `<span class="ex-cell-start-badge" title="${this.txt('Salida')}">🚩</span>` : ''}
              ${isObstacle ? `<span class="ex-cell-obstacle-icon" aria-hidden="true">${obsIcon}</span>` : ''}
              ${isGoal ? `<span class="ex-cell-goal-icon ${isBityHere && this.execMode === 'won' ? 'goal-reached-bounce' : 'item-pulse'}" title="${this.txt(ex.goalName)}">${ex.goalIcon}</span>` : ''}
              ${isBityHere ? `
                <div class="ex-bity-sprite facing-${this.bityFacing} ${this.execMode === 'won' ? 'bity-spin-celebration' : ''}">
                  ${this.getBitySvgMarkup(this.execMode === 'won' ? 'celebrating' : (this.execMode === 'error' ? 'alert' : 'happy'))}
                </div>
              ` : ''}
            </div>
          `;
        }
      }

      return html;
    }

    renderStatusInner() {
      const totalSteps = this.expandedSteps.length;
      const executed = (this.stepCursor >= 0) ? Math.min(totalSteps, this.stepCursor + 1) : 0;
      const pending = Math.max(0, totalSteps - executed);
      const currentStep = (this.stepCursor >= 0 && this.stepCursor < totalSteps) ? this.expandedSteps[this.stepCursor] : null;
      const isStepActive = (this.execMode === 'step' && this.stepCursor < totalSteps - 1);
      const isBusy = (this.isAnimatingStep || this.execMode === 'running');

      return `
        <div class="ex-status-counters">
          <span class="ex-counter-pill counter-executed">
            ✅ ${this.txt('Movimientos ejecutados')}: <strong id="rep-executed-count">${executed}</strong>
          </span>
          <span class="ex-counter-pill counter-pending">
            ⏳ ${this.txt('Pendientes')}: <strong id="rep-pending-count">${pending}</strong>
          </span>
          ${currentStep && currentStep.blockType === 'repeat' ? `
            <span class="ex-counter-pill" style="border-color:#fde047; color:#fde047;">
              🔁 ${this.txt('Repetición actual')}: <strong>${currentStep.currentIter} ${this.txt('de')} ${currentStep.totalIter}</strong>
            </span>
          ` : ''}
        </div>
        ${isStepActive ? `
          <button type="button"
            class="btn-ex-next-step-inline"
            ${isBusy ? 'disabled' : ''}
            onclick="window.repeticionesModule.runStepByStep()">
            <span>⏭️</span> <span>${this.txt('SIGUIENTE PASO')} (${executed + 1}/${totalSteps})</span>
          </button>
        ` : ''}
      `;
    }

    renderFeedbackInner() {
      if (!this.feedback) return '';
      const ex = this.getCurrentExercise();
      const doneSet = this.completedByGrade[this.currentGrade] || new Set();
      const isFinalExerciseWon = (this.feedback.type === 'won' && ex.number === 5);

      return `
        <div class="ex-feedback-card ${this.feedback.type === 'won' ? 'ex-feedback-won' : 'ex-feedback-error'}" role="status">
          <div class="ex-feedback-icon">
            ${this.feedback.type === 'won' ? '🎉 🎄 ⭐' : '💡 🤖'}
          </div>
          <div class="ex-feedback-body">
            <h4 class="ex-feedback-title">${this.txt(this.feedback.title)}</h4>
            ${this.feedback.detail ? `<p class="ex-feedback-detail">${this.txt(this.feedback.detail)}</p>` : ''}

            ${this.feedback.type === 'won' && !isFinalExerciseWon ? `
              <div class="ex-feedback-actions">
                <button type="button" class="btn-ex-victory-next" onclick="window.repeticionesModule.goToNextExercise()">
                  <span>🚀</span>
                  <span>${this.txt(`CONTINUAR AL EJERCICIO ${ex.number + 1}`)} ➔</span>
                </button>
              </div>
            ` : ''}
          </div>
        </div>

        ${isFinalExerciseWon ? `
          <div class="rep-final-celebration-card">
            <div style="font-size: 1.6rem; margin-bottom: 8px;">✨ 🎄 🎅 🎁 🏆 🎁 🎅 🎄 ✨</div>
            <div class="rep-final-bity-wrap">
              ${this.getBitySvgMarkup('celebrating')}
            </div>
            <h3 class="rep-final-title">🏆 ${this.txt('¡FELICITACIONES ESPECIALES DE BITY!')} 🏆</h3>
            <p class="rep-final-desc">
              “${this.txt(`¡Completaste los 5 ejercicios de REPETICIONES de ${this.currentGrade}.º Grado (${doneSet.size}/5)! Ya sabés cómo usar el bloque REPETIR para crear programas cortos, claros e inteligentes.`)}”
            </p>
            <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
              <button type="button" class="btn-ex-victory-next" onclick="window.repeticionesModule.selectExercise(0)">
                <span>🔄</span> <span>${this.txt('VOLVER A JUGAR DESDE EL EJERCICIO 1')}</span>
              </button>
              <button type="button" class="btn-ex-secondary btn-ex-reset" onclick="window.repeticionesModule.exitToHome()">
                <span>🏠</span> <span>${this.txt('VOLVER AL MENÚ PRINCIPAL')}</span>
              </button>
            </div>
          </div>
        ` : ''}
      `;
    }
  }

  // Exportar instancia global
  const repeticionesModuleInstance = new RepeticionesModule();
  repeticionesModuleInstance.REP_MOVE_DEFS = REP_MOVE_DEFS;
  repeticionesModuleInstance.REP_GRADE_ADAPTATION = REP_GRADE_ADAPTATION;
  repeticionesModuleInstance.getRepeticionesExercisesForGrade = getRepeticionesExercisesForGrade;
  global.repeticionesModule = repeticionesModuleInstance;

})(typeof window !== 'undefined' ? window : global);
