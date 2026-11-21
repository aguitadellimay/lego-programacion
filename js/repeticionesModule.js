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
      defaultRepeatCount: 0
    },
    2: {
      grade: 2,
      badge: '2.º Grado',
      levelNote: 'Enunciados sencillos, pistas para contar casilleros y combinación de dos bloques REPETIR.',
      autoShowFirstHint: false,
      defaultRepeatCount: 0
    },
    3: {
      grade: 3,
      badge: '3.º Grado',
      levelNote: 'Recorridos con cambios de dirección combinando bloques REPETIR e instrucciones individuales.',
      autoShowFirstHint: false,
      defaultRepeatCount: 0
    },
    4: {
      grade: 4,
      badge: '4.º Grado',
      levelNote: 'Mapas más amplios, recolección de objetos, desafíos con 1 solo REPETIR y repeticiones dentro de repeticiones.',
      autoShowFirstHint: false,
      defaultRepeatCount: 0
    },
    5: {
      grade: 5,
      badge: '5.º Grado',
      levelNote: 'Desafíos con múltiples tramos, laberintos navideños, condiciones especiales y repeticiones dentro de repeticiones.',
      autoShowFirstHint: false,
      defaultRepeatCount: 0
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
          'Intentá resolver todo el recorrido utilizando la menor cantidad de bloques posible combinando bloques REPETIR con un paso final.'
        ]
      };
    }

    // ----------------------------------------------------------
    // EJERCICIOS NUEVOS 6, 7, 8 Y 9 (Adaptados por grado 1.º a 5.º)
    // ----------------------------------------------------------
    let ex6, ex7, ex8, ex9;

    if (g === 1) {
      // 1.º GRADO (Nivel iniciación)
      ex6 = {
        id: 6,
        number: 6,
        title: 'EJERCICIO 6 – JUNTAMOS LAS ESTRELLAS',
        difficultyLabel: 'Iniciación',
        difficultyColor: 'success',
        prompt: '¡HAY TRES ESTRELLAS EN EL CAMINO! AYUDÁ A BITY A AVANZAR PARA JUNTAR TODAS LAS ESTRELLAS.',
        goalIcon: '⭐',
        goalName: 'las estrellas del camino',
        victoryMsg: '¡MUY BIEN! ¡BITY AVANZÓ 3 VECES Y JUNTÓ TODAS LAS ESTRELLAS!',
        cols: 5,
        rows: 3,
        start: { x: 0, y: 1 },
        goal: { x: 3, y: 1 },
        collectibles: [
          { x: 1, y: 1, icon: '⭐', name: 'estrella' },
          { x: 2, y: 1, icon: '⭐', name: 'estrella' }
        ],
        recommendedBlocks: 1,
        grid: [
          [1, 1, 0, 1, 1],
          [0, 0, 0, 0, 1],
          [1, 0, 1, 1, 1]
        ],
        hints: [
          'MIRÁ LAS ESTRELLAS ⭐ EN EL SENDERO. BITY TIENE QUE DAR VARIOS PASOS IGUALES HACIA LA DERECHA.',
          'CONTÁ CUÁNTOS PASOS HAY DESDE BITY HASTA LA ÚLTIMA ESTRELLA: SON 3 PASOS.',
          'PONÉ EL NÚMERO 3 EN EL BLOQUE REPETIR Y ELEGÍ MOVER HACIA LA DERECHA →.'
        ]
      };

      ex7 = {
        id: 7,
        number: 7,
        title: 'EJERCICIO 7 – LLEGAMOS AL ÁRBOL',
        difficultyLabel: 'Iniciación',
        difficultyColor: 'success',
        prompt: '¡EL ÁRBOL DE NAVIDAD ESTÁ ESPERANDO A BITY! AYUDALO A BAJAR POR EL CAMINO NEVADO HASTA LLEGAR AL ÁRBOL.',
        goalIcon: '🎄',
        goalName: 'el árbol de Navidad',
        victoryMsg: '¡EXCELENTE! ¡BITY REPITIÓ EL MOVIMIENTO HACIA ABAJO Y LLEGÓ AL ÁRBOL!',
        cols: 4,
        rows: 5,
        start: { x: 1, y: 0 },
        goal: { x: 1, y: 3 },
        recommendedBlocks: 1,
        grid: [
          [1, 0, 1, 1],
          [0, 0, 1, 0],
          [1, 0, 0, 1],
          [1, 0, 1, 1],
          [1, 1, 1, 1]
        ],
        hints: [
          'OBSERVÁ HACIA DÓNDE ESTÁ EL ÁRBOL DE NAVIDAD 🎄. BITY TIENE QUE MOVERSE HACIA ABAJO VARIAS VECES.',
          'CONTÁ LOS CASILLEROS HACIA ABAJO HASTA EL ÁRBOL: SON 3 CASILLEROS.',
          'USÁ UN BLOQUE REPETIR CON EL NÚMERO 3 Y PONÉ ADENTRO MOVER HACIA ABAJO ↓.'
        ]
      };

      ex8 = {
        id: 8,
        number: 8,
        title: 'EJERCICIO 8 – BUSCAMOS LOS REGALOS',
        difficultyLabel: 'Fácil',
        difficultyColor: 'warning',
        prompt: '¡BITY QUIERE RECOGER LOS REGALOS DE NAVIDAD! PRIMERO AVANZÁ POR EL CAMINO Y DESPUÉS DOBLÁ PARA LLEGAR AL SEGUNDO REGALO.',
        goalIcon: '🎁',
        goalName: 'los regalos de Navidad',
        victoryMsg: '¡GENIAL! ¡BITY RECOGIÓ LOS REGALOS USANDO REPETICIONES!',
        cols: 5,
        rows: 4,
        start: { x: 0, y: 1 },
        goal: { x: 2, y: 2 },
        collectibles: [
          { x: 2, y: 1, icon: '🎁', name: 'regalo' }
        ],
        recommendedBlocks: 2,
        grid: [
          [1, 1, 0, 1, 1],
          [0, 0, 0, 1, 1],
          [1, 1, 0, 0, 1],
          [1, 1, 1, 1, 1]
        ],
        hints: [
          'PRIMERO BITY TIENE QUE AVANZAR HACIA LA DERECHA HASTA EL PRIMER REGALO 🎁 Y DESPUÉS BAJAR.',
          'SON 2 PASOS HACIA LA DERECHA Y LUEGO 1 PASO HACIA ABAJO.',
          'USÁ UN BLOQUE REPETIR 2 VECES CON MOVER HACIA LA DERECHA → Y DEBAJO AGREGÁ MOVER HACIA ABAJO ↓.'
        ]
      };

      ex9 = {
        id: 9,
        number: 9,
        title: 'EJERCICIO 9 – DECORAMOS LA NAVIDAD',
        difficultyLabel: 'Desafío final',
        difficultyColor: 'danger',
        prompt: '¡VAMOS A DECORAR LA NAVIDAD! AYUDÁ A BITY A PASAR POR LA CAMPANA DORADA Y LLEGAR HASTA EL ÁRBOL DE NAVIDAD.',
        goalIcon: '🎄',
        goalName: 'el árbol decorado',
        victoryMsg: '¡FELICITACIONES! ¡DECORASTE LA NAVIDAD Y COMPLETASTE TODOS LOS EJERCICIOS DE 1.º GRADO!',
        cols: 5,
        rows: 4,
        start: { x: 0, y: 0 },
        goal: { x: 2, y: 2 },
        collectibles: [
          { x: 2, y: 0, icon: '🔔', name: 'campana navideña' }
        ],
        recommendedBlocks: 2,
        grid: [
          [0, 0, 0, 1, 1],
          [1, 1, 0, 1, 0],
          [1, 0, 0, 1, 1],
          [1, 1, 1, 1, 1]
        ],
        hints: [
          'BITY TIENE QUE BUSCAR PRIMERO LA CAMPANA 🔔 A LA DERECHA Y LUEGO BAJAR HASTA EL ÁRBOL 🎄.',
          'CONTÁ LOS PASOS: 2 PASOS A LA DERECHA Y 2 PASOS HACIA ABAJO.',
          'USÁ UN BLOQUE REPETIR 2 VECES HACIA LA DERECHA → Y OTRO BLOQUE REPETIR 2 VECES HACIA ABAJO ↓.'
        ]
      };
    } else if (g === 2) {
      // 2.º GRADO (Nivel básico)
      ex6 = {
        id: 6,
        number: 6,
        title: 'EJERCICIO 6 – RECOLECTAMOS ESTRELLAS',
        difficultyLabel: 'Básico',
        difficultyColor: 'success',
        prompt: 'Bity quiere recolectar todas las estrellas luminosas del sendero. Recorré los dos tramos del camino usando bloques de repetición.',
        goalIcon: '⭐',
        goalName: 'todas las estrellas del sendero',
        victoryMsg: '¡MUY BIEN! ¡BITY RECOLECTÓ TODAS LAS ESTRELLAS DEL SENDERO!',
        cols: 5,
        rows: 4,
        start: { x: 0, y: 0 },
        goal: { x: 3, y: 2 },
        collectibles: [
          { x: 2, y: 0, icon: '⭐', name: 'estrella' },
          { x: 3, y: 0, icon: '⭐', name: 'estrella' },
          { x: 3, y: 1, icon: '⭐', name: 'estrella' }
        ],
        recommendedBlocks: 2,
        grid: [
          [0, 0, 0, 0, 1],
          [1, 1, 1, 0, 1],
          [1, 0, 1, 0, 1],
          [1, 1, 1, 1, 1]
        ],
        hints: [
          'Para juntar todas las estrellas ⭐, Bity debe recorrer primero la fila de arriba y después bajar por la columna de la derecha.',
          'Contá cuántos pasos hay hacia la derecha hasta la esquina (3) y cuántos pasos hay hacia abajo (2).',
          'Usá un bloque REPETIR 3 VECES hacia la derecha y un segundo bloque REPETIR 2 VECES hacia abajo.'
        ]
      };

      ex7 = {
        id: 7,
        number: 7,
        title: 'EJERCICIO 7 – EL CAMINO DE LOS REGALOS',
        difficultyLabel: 'Intermedio',
        difficultyColor: 'warning',
        prompt: 'Hay regalos preparados a lo largo del camino. Ayudá a Bity a avanzar por los diferentes tramos para recogerlos todos.',
        goalIcon: '🎁',
        goalName: 'los regalos del camino',
        victoryMsg: '¡EXCELENTE! ¡COMBINASTE REPETICIONES Y MOVIMIENTOS PARA RECOGER LOS REGALOS!',
        cols: 6,
        rows: 4,
        start: { x: 0, y: 2 },
        goal: { x: 4, y: 0 },
        collectibles: [
          { x: 3, y: 2, icon: '🎁', name: 'regalo' },
          { x: 3, y: 0, icon: '🎁', name: 'regalo' }
        ],
        recommendedBlocks: 3,
        grid: [
          [1, 1, 1, 0, 0, 1],
          [1, 0, 1, 0, 1, 1],
          [0, 0, 0, 0, 1, 0],
          [1, 1, 1, 1, 1, 1]
        ],
        hints: [
          'Observá por dónde están los regalos 🎁: primero hay un tramo hacia la derecha, luego hay que subir y al final dar un paso más a la derecha.',
          'Son 3 pasos hacia la derecha, 2 pasos hacia arriba y 1 paso final hacia la derecha.',
          'Usá REPETIR 3 VECES hacia la derecha, REPETIR 2 VECES hacia arriba y agregá un bloque MOVER HACIA LA DERECHA → al final.'
        ]
      };

      ex8 = {
        id: 8,
        number: 8,
        title: 'EJERCICIO 8 – DECORAMOS EL ÁRBOL',
        difficultyLabel: 'Intermedio',
        difficultyColor: 'warning',
        prompt: 'Antes de llegar al árbol de Navidad, Bity tiene que pasar por la campana y la estrella para llevar todos los adornos.',
        goalIcon: '🎄',
        goalName: 'el árbol de Navidad',
        victoryMsg: '¡FANTÁSTICO! ¡BITY JUNTÓ LOS ADORNOS Y DECORÓ EL ÁRBOL DE NAVIDAD!',
        cols: 6,
        rows: 4,
        start: { x: 0, y: 0 },
        goal: { x: 4, y: 2 },
        collectibles: [
          { x: 0, y: 2, icon: '🔔', name: 'adorno campana' },
          { x: 2, y: 2, icon: '⭐', name: 'adorno estrella' }
        ],
        recommendedBlocks: 2,
        grid: [
          [0, 1, 1, 0, 1, 1],
          [0, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 0, 1],
          [1, 1, 0, 1, 1, 1]
        ],
        hints: [
          'Mirá dónde están la campana 🔔 y la estrella ⭐: primero Bity tiene que bajar y después avanzar en línea recta hacia la derecha.',
          'Contá los casilleros: son 2 pasos hacia abajo hasta la campana y luego 4 pasos hacia la derecha pasando por la estrella hasta el árbol 🎄.',
          'Colocá un bloque REPETIR 2 VECES con MOVER HACIA ABAJO ↓ y un bloque REPETIR 4 VECES con MOVER HACIA LA DERECHA →.'
        ]
      };

      ex9 = {
        id: 9,
        number: 9,
        title: 'EJERCICIO 9 – EL TREN NAVIDEÑO',
        difficultyLabel: 'Desafío final',
        difficultyColor: 'danger',
        prompt: '¡El tren navideño está por salir! Ayudá a Bity a recorrer el camino con varios cambios de dirección usando bloques de repetición.',
        goalIcon: '🚂',
        goalName: 'el Tren Navideño',
        victoryMsg: '¡FELICITACIONES! ¡BITY LLEGÓ AL TREN NAVIDEÑO Y COMPLETASTE TODOS LOS DESAFÍOS DE 2.º GRADO!',
        cols: 6,
        rows: 4,
        start: { x: 0, y: 3 },
        goal: { x: 5, y: 1 },
        collectibles: [
          { x: 2, y: 3, icon: '🎁', name: 'boleto navideño' },
          { x: 2, y: 1, icon: '⭐', name: 'estrella guía' }
        ],
        recommendedBlocks: 3,
        grid: [
          [1, 0, 1, 1, 0, 1],
          [1, 1, 0, 0, 0, 0],
          [1, 1, 0, 1, 1, 1],
          [0, 0, 0, 1, 0, 1]
        ],
        hints: [
          'El camino hasta el tren 🚂 tiene tres tramos rectos. Observá en qué esquina está cada adorno para saber dónde doblar.',
          'Primero avanzá 2 pasos a la derecha, después subí 2 pasos hasta la estrella ⭐ y finalmente avanzá 3 pasos a la derecha.',
          'Resolvé el recorrido con tres bloques REPETIR: uno de 2 pasos a la derecha, uno de 2 pasos hacia arriba y uno de 3 pasos a la derecha.'
        ]
      };
    } else if (g === 3) {
      // 3.º GRADO (Nivel intermedio)
      ex6 = {
        id: 6,
        number: 6,
        title: 'EJERCICIO 6 – LOS ELEMENTOS DEL ÁRBOL',
        difficultyLabel: 'Intermedio',
        difficultyColor: 'warning',
        prompt: 'Bity necesita juntar las luces, la campana y la estrella para armar el árbol de Navidad. Recorré el mapa recolectando todos los elementos.',
        goalIcon: '🎄',
        goalName: 'el árbol de Navidad',
        victoryMsg: '¡GENIAL! ¡JUNTOS TODOS LOS ELEMENTOS Y ARMASTE EL ÁRBOL DE NAVIDAD!',
        cols: 6,
        rows: 5,
        start: { x: 0, y: 1 },
        goal: { x: 4, y: 4 },
        collectibles: [
          { x: 3, y: 1, icon: '🔔', name: 'campana' },
          { x: 3, y: 4, icon: '⭐', name: 'estrella' }
        ],
        recommendedBlocks: 3,
        grid: [
          [1, 0, 1, 1, 0, 1],
          [0, 0, 0, 0, 1, 1],
          [1, 1, 1, 0, 1, 0],
          [0, 1, 1, 0, 1, 1],
          [1, 0, 1, 0, 0, 1]
        ],
        hints: [
          'Para juntar la campana 🔔 y la estrella ⭐ antes de llegar al árbol 🎄, combiná bloques REPETIR en los tramos largos y un movimiento individual al final.',
          'Avanzá 3 casilleros a la derecha hasta la campana, bajá 3 casilleros hasta la estrella y hacé 1 paso final a la derecha.',
          'Usá REPETIR 3 VECES hacia la derecha, REPETIR 3 VECES hacia abajo y agregá MOVER HACIA LA DERECHA → al final.'
        ]
      };

      ex7 = {
        id: 7,
        number: 7,
        title: 'EJERCICIO 7 – EL BOSQUE NEVADO',
        difficultyLabel: 'Intermedio',
        difficultyColor: 'warning',
        prompt: 'Bity tiene que atravesar el bosque nevado esquivando los pinos y muñecos de nieve para llegar a la cabaña iluminada.',
        goalIcon: '🏠',
        goalName: 'la cabaña del bosque',
        victoryMsg: '¡EXCELENTE! ¡BITY ATRAVESÓ EL BOSQUE NEVADO Y LLEGÓ A LA CABAÑA!',
        cols: 6,
        rows: 5,
        start: { x: 0, y: 4 },
        goal: { x: 5, y: 1 },
        recommendedBlocks: 3,
        grid: [
          [1, 0, 1, 1, 0, 1],
          [1, 1, 0, 0, 0, 0],
          [0, 1, 0, 1, 1, 1],
          [1, 1, 0, 1, 0, 1],
          [0, 0, 0, 1, 1, 1]
        ],
        hints: [
          'Observá el camino libre entre los obstáculos del bosque: primero va hacia la derecha, luego sube por el corredor central y después dobla hacia la cabaña 🏠.',
          'Contá cuántos pasos tiene cada tramo: 2 pasos a la derecha, 3 pasos hacia arriba y 3 pasos a la derecha.',
          'Construí tu programa con tres bloques REPETIR: 2 veces a la derecha, 3 veces hacia arriba y 3 veces a la derecha.'
        ]
      };

      ex8 = {
        id: 8,
        number: 8,
        title: 'EJERCICIO 8 – PREPARAMOS LOS REGALOS',
        difficultyLabel: 'Intermedio avanzado',
        difficultyColor: 'warning',
        prompt: 'Hay regalos distribuidos en el taller. Ayudá a Bity a recogerlos todos en su recorrido y llevarlos hasta el trineo.',
        goalIcon: '🛷',
        goalName: 'el trineo de Navidad',
        victoryMsg: '¡FANTÁSTICO! ¡RECOLECTASTE TODOS LOS REGALOS Y LOS LLEVASTE AL TRINEO!',
        cols: 6,
        rows: 5,
        start: { x: 0, y: 0 },
        goal: { x: 5, y: 3 },
        collectibles: [
          { x: 2, y: 0, icon: '🎁', name: 'regalo rojo' },
          { x: 2, y: 3, icon: '🎁', name: 'regalo dorado' }
        ],
        recommendedBlocks: 3,
        grid: [
          [0, 0, 0, 1, 0, 1],
          [1, 1, 0, 1, 1, 0],
          [0, 1, 0, 1, 1, 1],
          [1, 1, 0, 0, 0, 0],
          [1, 0, 1, 1, 0, 1]
        ],
        hints: [
          'Bity tiene que pasar por los dos regalos 🎁 antes de llegar al trineo 🛷. Fijate en qué casilleros están ubicados.',
          'Avanzá 2 pasos a la derecha hasta el primer regalo, bajá 3 pasos hasta el segundo regalo y avanzá 3 pasos a la derecha hasta el trineo.',
          'Usá tres bloques REPETIR seguidos: 2 veces a la derecha, 3 veces hacia abajo y 3 veces a la derecha.'
        ]
      };

      ex9 = {
        id: 9,
        number: 9,
        title: 'EJERCICIO 9 – EL CAMINO DE LAS LUCES',
        difficultyLabel: 'Desafío final',
        difficultyColor: 'danger',
        prompt: '¡Encendamos las luces de Navidad! Recorré el sendero con varios cambios de dirección, pasando por todas las estrellas hasta llegar al gran árbol.',
        goalIcon: '🎄',
        goalName: 'el Gran Árbol Iluminado',
        victoryMsg: '¡FELICITACIONES! ¡ENCENDISTE EL CAMINO DE LAS LUCES Y COMPLETASTE 3.º GRADO!',
        cols: 6,
        rows: 5,
        start: { x: 0, y: 4 },
        goal: { x: 5, y: 0 },
        collectibles: [
          { x: 3, y: 4, icon: '⭐', name: 'luz navideña 1' },
          { x: 3, y: 1, icon: '⭐', name: 'luz navideña 2' },
          { x: 5, y: 1, icon: '⭐', name: 'luz navideña 3' }
        ],
        recommendedBlocks: 4,
        grid: [
          [1, 0, 1, 1, 1, 0],
          [1, 0, 1, 0, 0, 0],
          [1, 1, 1, 0, 1, 1],
          [0, 1, 1, 0, 1, 0],
          [0, 0, 0, 0, 1, 1]
        ],
        hints: [
          'Seguí las tres estrellas ⭐ como guía del recorrido: cada estrella marca una esquina donde Bity cambia de dirección.',
          'Los primeros tres tramos se pueden hacer con bloques REPETIR (3 a la derecha, 3 hacia arriba y 2 a la derecha), y al final solo falta 1 paso hacia arriba.',
          'Combiná tres bloques REPETIR con un bloque individual MOVER HACIA ARRIBA ↑ al final para llegar al árbol 🎄.'
        ]
      };
    } else if (g === 4) {
      // 4.º GRADO (Nivel avanzado)
      // Ejercicio 6 con CONDICIÓN ESPECIAL OBLIGATORIA: UN SOLO BLOQUE REPETIR
      ex6 = {
        id: 6,
        number: 6,
        title: 'EJERCICIO 6 – ARMAMOS EL ÁRBOL DE NAVIDAD',
        difficultyLabel: 'Condición especial',
        difficultyColor: 'warning',
        prompt: 'Bity debe recolectar las estrellas con los adornos en distintos puntos del mapa para armar su árbol de Navidad. ¡Atención! En este desafío solo podés usar UN bloque REPETIR en todo tu algoritmo.',
        specialRuleBanner: '⚠️ CONDICIÓN ESPECIAL: Usá UN SOLO bloque REPETIR para el tramo más largo y completá el resto del recorrido con instrucciones individuales.',
        maxRepeatBlocks: 1,
        goalIcon: '🎄',
        goalName: 'el árbol de Navidad completo',
        victoryMsg: '¡BRILLANTE! ¡ARMASTE EL ÁRBOL USANDO UN SOLO BLOQUE REPETIR EN EL TRAMO MÁS LARGO!',
        cols: 7,
        rows: 5,
        start: { x: 0, y: 1 },
        goal: { x: 5, y: 2 },
        collectibles: [
          { x: 2, y: 1, icon: '⭐', name: 'estrella decorativa 1' },
          { x: 4, y: 1, icon: '⭐', name: 'estrella decorativa 2' },
          { x: 4, y: 2, icon: '⭐', name: 'base del árbol' }
        ],
        recommendedBlocks: 3,
        grid: [
          [1, 0, 1, 1, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 0],
          [1, 1, 1, 1, 0, 0, 1],
          [0, 1, 0, 1, 1, 1, 1],
          [1, 1, 1, 0, 1, 0, 1]
        ],
        hints: [
          'En este desafío no podés poner dos bloques REPETIR. Observá cuál es el tramo más largo del recorrido para aprovechar ahí tu único bloque REPETIR.',
          'El tramo más largo es avanzar 4 casilleros hacia la derecha por la fila superior (juntando las dos primeras estrellas ⭐). Después solo queda 1 paso hacia abajo y 1 paso hacia la derecha.',
          'Usá 1 bloque REPETIR 4 VECES con MOVER HACIA LA DERECHA →, y luego agregá afuera un bloque MOVER HACIA ABAJO ↓ y un bloque MOVER HACIA LA DERECHA →.'
        ]
      };

      ex7 = {
        id: 7,
        number: 7,
        title: 'EJERCICIO 7 – EL RECORRIDO DEL TALLER NAVIDEÑO',
        difficultyLabel: 'Avanzado',
        difficultyColor: 'warning',
        prompt: 'Bity debe atravesar los distintos sectores del taller navideño esquivando las cajas y bloques de hielo hasta llegar al sector de empaque.',
        goalIcon: '🎁',
        goalName: 'el sector de empaque del taller',
        victoryMsg: '¡EXCELENTE! ¡RECORRISTE TODO EL TALLER NAVIDEÑO COMBINANDO TRES BLOQUES REPETIR!',
        cols: 7,
        rows: 5,
        start: { x: 0, y: 0 },
        goal: { x: 6, y: 3 },
        collectibles: [
          { x: 3, y: 0, icon: '🔔', name: 'campana del taller' },
          { x: 3, y: 3, icon: '⭐', name: 'sello mágico' }
        ],
        recommendedBlocks: 3,
        grid: [
          [0, 0, 0, 0, 1, 0, 1],
          [1, 1, 1, 0, 1, 1, 0],
          [0, 1, 1, 0, 1, 1, 1],
          [1, 0, 1, 0, 0, 0, 0],
          [1, 1, 1, 1, 0, 1, 1]
        ],
        hints: [
          'Dividí el recorrido por el taller en tres tramos rectos pasando por la campana 🔔 y la estrella ⭐.',
          'Contá los casilleros de cada tramo: 3 pasos hacia la derecha, 3 pasos hacia abajo y 3 pasos hacia la derecha.',
          'Combiná tres bloques REPETIR de 3 repeticiones cada uno (Derecha →, Abajo ↓ y Derecha →).'
        ]
      };

      ex8 = {
        id: 8,
        number: 8,
        title: 'EJERCICIO 8 – ENTREGAMOS LOS REGALOS',
        difficultyLabel: 'Avanzado',
        difficultyColor: 'danger',
        prompt: 'Bity tiene que pasar por las paradas de entrega para dejar los regalos en cada sector antes de llegar a la casa navideña.',
        goalIcon: '🏠',
        goalName: 'la casa navideña',
        victoryMsg: '¡FANTÁSTICO! ¡BITY ENTREGÓ TODOS LOS REGALOS Y LLEGÓ A LA CASA NAVIDEÑA!',
        cols: 7,
        rows: 5,
        start: { x: 0, y: 4 },
        goal: { x: 6, y: 0 },
        collectibles: [
          { x: 2, y: 4, icon: '🎁', name: 'primera parada de regalos' },
          { x: 2, y: 1, icon: '🎁', name: 'segunda parada de regalos' },
          { x: 6, y: 1, icon: '🎁', name: 'tercera parada de regalos' }
        ],
        recommendedBlocks: 4,
        grid: [
          [1, 0, 1, 1, 1, 1, 0],
          [1, 0, 0, 0, 0, 0, 0],
          [0, 1, 0, 1, 1, 1, 1],
          [1, 1, 0, 1, 0, 1, 0],
          [0, 0, 0, 1, 1, 1, 1]
        ],
        hints: [
          'Asegurate de que Bity pase por los tres puntos con regalos 🎁 antes de subir a la casa 🏠.',
          'Analizá los cuatro tramos: 2 pasos a la derecha, 3 pasos hacia arriba, 4 pasos a la derecha y 1 último paso hacia arriba.',
          'Usá tres bloques REPETIR para los primeros tres tramos (2, 3 y 4) y agregá una instrucción individual MOVER HACIA ARRIBA ↑ al final.'
        ]
      };

      // Ejercicio 9 de 4.º Grado: REPETICIONES DENTRO DE REPETICIONES (Anidadas)
      ex9 = {
        id: 9,
        number: 9,
        title: 'EJERCICIO 9 – REPETICIONES DENTRO DE REPETICIONES',
        difficultyLabel: 'Desafío experto',
        difficultyColor: 'danger',
        prompt: '¡Desafío especial! Para llegar al árbol bajando por la escalera nevada, Bity repite 3 veces el mismo patrón: dar 1 paso a la derecha y bajar 1 paso. ¡Colocá un bloque REPETIR dentro de otro bloque REPETIR para resolverlo!',
        specialRuleBanner: '🔁 DESAFÍO DE REPETICIÓN ANIDADA: Colocá un bloque REPETIR adentro de otro bloque REPETIR para repetir todo un patrón de movimientos.',
        requireNestedRepeat: true,
        allowNestedRepeat: true,
        nestedGuideExample: 'REPETIR 3 VECES {\n   MOVER HACIA LA DERECHA →\n   REPETIR 1 VEZ {\n      MOVER HACIA ABAJO ↓\n   }\n}',
        goalIcon: '🎄',
        goalName: 'el Árbol de la Escalera Nevada',
        victoryMsg: '¡INCREÍBLE! ¡USASTE UN BLOQUE REPETIR DENTRO DE OTRO BLOQUE REPETIR Y COMPLETASTE 4.º GRADO!',
        cols: 6,
        rows: 5,
        start: { x: 0, y: 0 },
        goal: { x: 3, y: 3 },
        collectibles: [
          { x: 1, y: 1, icon: '⭐', name: 'escalón 1' },
          { x: 2, y: 2, icon: '⭐', name: 'escalón 2' }
        ],
        recommendedBlocks: 1,
        grid: [
          [0, 0, 1, 1, 0, 1],
          [1, 0, 0, 1, 1, 0],
          [0, 1, 0, 0, 1, 1],
          [1, 1, 1, 0, 1, 0],
          [1, 0, 1, 1, 1, 1]
        ],
        hints: [
          'En algunas situaciones necesitamos repetir un conjunto de acciones que ya tiene una repetición adentro. Podés colocar un bloque REPETIR dentro de otro bloque REPETIR.',
          'Observá la escalera: Bity hace 3 veces el mismo escalón (1 paso a la derecha → y 1 paso hacia abajo ↓).',
          'Creá un bloque REPETIR 3 VECES externo. Adentro colocá MOVER HACIA LA DERECHA → y tocá el botón «+ REPETIR INTERNO» para poner REPETIR 1 VEZ con MOVER HACIA ABAJO ↓.'
        ]
      };
    } else {
      // 5.º GRADO (Nivel avanzado superior)
      // Ejercicio 6 con CONDICIÓN ESPECIAL OBLIGATORIA: UN SOLO BLOQUE REPETIR
      ex6 = {
        id: 6,
        number: 6,
        title: 'EJERCICIO 6 – LA GRAN RECOLECCIÓN NAVIDEÑA',
        difficultyLabel: 'Condición especial',
        difficultyColor: 'warning',
        prompt: 'Bity tiene que juntar todas las estrellas mágicas distribuidas por el mapa y llevarlas al trineo. ¡Desafío de ingenio! Debés resolver todo el recorrido utilizando EXACTAMENTE UN bloque REPETIR y completando el resto con instrucciones individuales.',
        specialRuleBanner: '⚠️ CONDICIÓN ESPECIAL: Solo podés utilizar 1 bloque REPETIR en todo tu algoritmo. Elegí el tramo largo para usarlo y resolvé los demás pasos con bloques individuales.',
        maxRepeatBlocks: 1,
        goalIcon: '🛷',
        goalName: 'el trineo de la Gran Recolección',
        victoryMsg: '¡MAESTRO DE LA PROGRAMACIÓN! ¡RESOLVISTE LA GRAN RECOLECCIÓN USANDO UN SOLO BLOQUE REPETIR!',
        cols: 8,
        rows: 5,
        start: { x: 0, y: 2 },
        goal: { x: 6, y: 3 },
        collectibles: [
          { x: 0, y: 1, icon: '⭐', name: 'estrella norte' },
          { x: 3, y: 1, icon: '⭐', name: 'estrella central' },
          { x: 5, y: 1, icon: '⭐', name: 'estrella este' },
          { x: 5, y: 3, icon: '⭐', name: 'estrella sur' }
        ],
        recommendedBlocks: 5,
        grid: [
          [1, 1, 0, 1, 1, 0, 1, 1],
          [0, 0, 0, 0, 0, 0, 1, 0],
          [0, 1, 1, 1, 1, 0, 1, 1],
          [1, 0, 1, 0, 1, 0, 0, 1],
          [1, 1, 1, 1, 1, 1, 1, 1]
        ],
        hints: [
          'Recordá la regla especial: solo podés usar 1 bloque REPETIR en todo el programa. ¿Cuál es el tramo recto más largo del mapa?',
          'Primero subí 1 paso (instrucción individual) hasta la primera estrella ⭐. Luego tenés un tramo largo de 5 pasos hacia la derecha que conviene hacer con tu único bloque REPETIR.',
          'Armá la secuencia: 1) MOVER HACIA ARRIBA ↑, 2) REPETIR 5 VECES { MOVER HACIA LA DERECHA → }, 3) MOVER HACIA ABAJO ↓, 4) MOVER HACIA ABAJO ↓ y 5) MOVER HACIA LA DERECHA →.'
        ]
      };

      ex7 = {
        id: 7,
        number: 7,
        title: 'EJERCICIO 7 – EL LABERINTO DE NAVIDAD',
        difficultyLabel: 'Avanzado superior',
        difficultyColor: 'danger',
        prompt: 'Atravesá el laberinto navideño de hielo y pinos combinando diferentes bloques REPETIR hasta encontrar la campana dorada.',
        goalIcon: '🔔',
        goalName: 'la Campana Dorada del Laberinto',
        victoryMsg: '¡IMPRESIONANTE! ¡SUPERASTE EL LABERINTO DE NAVIDAD CON UN ALGORITMO PRECISO!',
        cols: 8,
        rows: 6,
        start: { x: 0, y: 0 },
        goal: { x: 7, y: 4 },
        collectibles: [
          { x: 4, y: 0, icon: '⭐', name: 'llave luminosa 1' },
          { x: 4, y: 4, icon: '⭐', name: 'llave luminosa 2' }
        ],
        recommendedBlocks: 3,
        grid: [
          [0, 0, 0, 0, 0, 1, 0, 1],
          [1, 1, 1, 1, 0, 1, 0, 1],
          [0, 0, 0, 1, 0, 1, 1, 1],
          [0, 1, 1, 1, 0, 1, 0, 0],
          [0, 0, 0, 1, 0, 0, 0, 0],
          [1, 1, 0, 1, 1, 1, 0, 1]
        ],
        hints: [
          'Observá los dos caminos del laberinto: el camino que pasa por las estrellas ⭐ es mucho más directo y limpio para usar bloques REPETIR.',
          'Por el corredor de las estrellas tenés: 4 pasos hacia la derecha, 4 pasos hacia abajo y 3 pasos hacia la derecha.',
          'Usá tres bloques REPETIR: 4 veces a la derecha, 4 veces hacia abajo y 3 veces a la derecha.'
        ]
      };

      ex8 = {
        id: 8,
        number: 8,
        title: 'EJERCICIO 8 – EL TALLER DE PAPÁ NOEL',
        difficultyLabel: 'Avanzado superior',
        difficultyColor: 'danger',
        prompt: 'En el taller de Papá Noel hay que recorrer tres sectores para recoger el regalo, la campana y la estrella antes de cargar todo en el trineo.',
        goalIcon: '🛷',
        goalName: 'el Trineo de Papá Noel',
        victoryMsg: '¡EXCELENTE TRABAJO! ¡COMPLETASTE EL RECORRIDO POR EL TALLER DE PAPÁ NOEL!',
        cols: 8,
        rows: 6,
        start: { x: 0, y: 5 },
        goal: { x: 7, y: 0 },
        collectibles: [
          { x: 3, y: 5, icon: '🎁', name: 'regalo del taller' },
          { x: 3, y: 2, icon: '🔔', name: 'campana mágica' },
          { x: 7, y: 2, icon: '⭐', name: 'estrella polar' }
        ],
        recommendedBlocks: 4,
        grid: [
          [1, 0, 1, 1, 1, 0, 1, 0],
          [1, 0, 1, 0, 1, 1, 1, 0],
          [0, 0, 1, 0, 0, 0, 0, 0],
          [1, 1, 1, 0, 1, 1, 1, 1],
          [0, 1, 1, 0, 1, 0, 1, 0],
          [0, 0, 0, 0, 1, 1, 1, 1]
        ],
        hints: [
          'Planificá las cuatro etapas del recorrido siguiendo el orden de los objetos: regalo 🎁 → campana 🔔 → estrella ⭐ → trineo 🛷.',
          'Contá los pasos de cada tramo: 3 a la derecha, 3 hacia arriba, 4 a la derecha y 2 hacia arriba.',
          'Construí el algoritmo con cuatro bloques REPETIR: 3 veces Derecha →, 3 veces Arriba ↑, 4 veces Derecha → y 2 veces Arriba ↑.'
        ]
      };

      // Ejercicio 9 de 5.º Grado: EL GRAN DESAFÍO DE LAS REPETICIONES (Repeticiones anidadas)
      ex9 = {
        id: 9,
        number: 9,
        title: 'EJERCICIO 9 – EL GRAN DESAFÍO DE LAS REPETICIONES',
        difficultyLabel: 'Gran desafío final',
        difficultyColor: 'danger',
        prompt: '¡Llegaste al gran desafío final de 5.º Grado! Para atravesar las tres terrazas nevadas y recoger todos los regalos, Bity repite 3 veces un patrón compuesto: avanzar 1 paso a la derecha y bajar 2 casilleros. ¡Resolvé el desafío usando un bloque REPETIR dentro de otro bloque REPETIR!',
        specialRuleBanner: '🔁 GRAN DESAFÍO DE REPETICIONES ANIDADAS: Usá un bloque REPETIR externo que contenga una instrucción de movimiento y un bloque REPETIR interno.',
        requireNestedRepeat: true,
        allowNestedRepeat: true,
        nestedGuideExample: 'REPETIR 3 VECES {\n   MOVER HACIA LA DERECHA →\n   REPETIR 2 VECES {\n      MOVER HACIA ABAJO ↓\n   }\n}',
        goalIcon: '🎄',
        goalName: 'la Estrella Mayor de la Navidad',
        victoryMsg: '¡FELICITACIONES CAMPEÓN/A! ¡DOMINASTE LAS REPETICIONES ANIDADAS Y COMPLETASTE TODO 5.º GRADO!',
        cols: 6,
        rows: 7,
        start: { x: 0, y: 0 },
        goal: { x: 3, y: 6 },
        collectibles: [
          { x: 1, y: 2, icon: '🎁', name: 'regalo terraza 1' },
          { x: 2, y: 4, icon: '🎁', name: 'regalo terraza 2' }
        ],
        recommendedBlocks: 1,
        grid: [
          [0, 0, 1, 1, 0, 1],
          [1, 0, 1, 0, 1, 1],
          [1, 0, 0, 1, 1, 0],
          [0, 1, 0, 1, 0, 1],
          [1, 1, 0, 0, 1, 1],
          [1, 0, 1, 0, 1, 0],
          [1, 1, 1, 0, 1, 1]
        ],
        hints: [
          'En algunas situaciones necesitamos repetir un conjunto de acciones que ya tiene una repetición adentro. Para eso, podemos colocar un bloque REPETIR dentro de otro bloque REPETIR.',
          'Mirá cómo se repite el dibujo del camino 3 veces seguidas: en cada tramo Bity hace 1 paso hacia la derecha → y después baja 2 pasos ↓.',
          'Colocá un bloque REPETIR 3 VECES externo. Adentro agregá MOVER HACIA LA DERECHA → y luego un bloque REPETIR 2 VECES interno con MOVER HACIA ABAJO ↓.'
        ]
      };
    }

    return [ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9];
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
    // GESTIÓN DE LOS 9 EJERCICIOS Y CONSTRUCCIÓN DE BLOQUES (INCLUYE REPETICIONES ANIDADAS)
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
      this.collectedKeys = new Set();
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

    // Normaliza un bloque REPETIR para mantener sincronizados `children` y `action`
    normalizeRepeatBlock(repBlk) {
      if (!repBlk || repBlk.type !== 'repeat') return repBlk;
      if (!Array.isArray(repBlk.children)) {
        repBlk.children = [];
        if (repBlk.action && REP_MOVE_DEFS[repBlk.action]) {
          repBlk.children.push({
            id: `rep_blk_${this.blockIdCounter++}`,
            type: 'move',
            dir: repBlk.action
          });
        }
      } else if (repBlk.children.length === 0 && repBlk.action && REP_MOVE_DEFS[repBlk.action]) {
        repBlk.children.push({
          id: `rep_blk_${this.blockIdCounter++}`,
          type: 'move',
          dir: repBlk.action
        });
      }
      const firstMove = repBlk.children.find(c => c.type === 'move');
      repBlk.action = firstMove ? firstMove.dir : null;
      repBlk.children.forEach(c => {
        if (c && c.type === 'repeat') {
          this.normalizeRepeatBlock(c);
        }
      });
      return repBlk;
    }

    // Busca un bloque REPETIR (externo o interno) por su ID
    findRepeatBlockById(blockId) {
      if (!blockId) return null;
      for (let i = 0; i < this.blocks.length; i++) {
        const b = this.blocks[i];
        if (b && b.type === 'repeat') {
          this.normalizeRepeatBlock(b);
          if (b.id === blockId) {
            return { block: b, parent: null, depth: 0, topIndex: i };
          }
          for (let j = 0; j < b.children.length; j++) {
            const child = b.children[j];
            if (child && child.type === 'repeat') {
              this.normalizeRepeatBlock(child);
              if (child.id === blockId) {
                return { block: child, parent: b, depth: 1, topIndex: i, childIndex: j };
              }
            }
          }
        }
      }
      return null;
    }

    // Cuenta cuántos bloques REPETIR hay en total (incluyendo anidados)
    countAllRepeatBlocks() {
      let total = 0;
      for (let i = 0; i < this.blocks.length; i++) {
        const b = this.blocks[i];
        if (b && b.type === 'repeat') {
          total++;
          this.normalizeRepeatBlock(b);
          for (let j = 0; j < b.children.length; j++) {
            if (b.children[j] && b.children[j].type === 'repeat') {
              total++;
            }
          }
        }
      }
      return total;
    }

    // Verifica si el algoritmo utiliza un bloque REPETIR dentro de otro bloque REPETIR
    hasNestedRepeatBlock() {
      for (let i = 0; i < this.blocks.length; i++) {
        const b = this.blocks[i];
        if (b && b.type === 'repeat') {
          this.normalizeRepeatBlock(b);
          if (b.children.some(c => c && c.type === 'repeat')) {
            return true;
          }
        }
      }
      return false;
    }

    // Agregar bloque REPETIR [N] VECES al algoritmo (Valor inicial = 0 por defecto)
    addRepeatBlock(initialTimes = null, initialAction = null, parentRepeatId = null) {
      if (this.isAnimatingStep || this.execMode === 'running') return;
      this.prepareForCodeEdit();

      if (parentRepeatId) {
        return this.addNestedRepeatBlock(parentRepeatId, initialTimes, initialAction);
      }

      const gradeMeta = REP_GRADE_ADAPTATION[this.currentGrade] || REP_GRADE_ADAPTATION[1];
      let parsedTimes = 0;
      if (initialTimes !== null && initialTimes !== undefined) {
        const p = parseInt(initialTimes, 10);
        parsedTimes = Number.isNaN(p) ? 0 : p;
      } else if (typeof gradeMeta.defaultRepeatCount === 'number') {
        parsedTimes = gradeMeta.defaultRepeatCount;
      }

      const newId = `rep_blk_${this.blockIdCounter++}`;
      const validDir = (initialAction && REP_MOVE_DEFS[initialAction]) ? initialAction : null;
      const children = validDir
        ? [{ id: `rep_blk_${this.blockIdCounter++}`, type: 'move', dir: validDir }]
        : [];

      const newBlk = {
        id: newId,
        type: 'repeat',
        times: Math.max(0, Math.min(10, parsedTimes)),
        action: validDir,
        children: children
      };

      this.blocks.push(newBlk);

      if (!validDir) {
        this.focusedRepeatId = newId;
      }

      this.playSound('pop');
      this.refreshProgramStackDOM();
      return newId;
    }

    // Agregar un bloque REPETIR interno dentro de otro bloque REPETIR externo (Repetición anidada)
    addNestedRepeatBlock(parentRepeatId, initialTimes = null, initialAction = null) {
      if (this.isAnimatingStep || this.execMode === 'running') return null;
      this.prepareForCodeEdit();

      const foundParent = this.findRepeatBlockById(parentRepeatId);
      if (!foundParent || foundParent.depth !== 0) return null;

      let parsedTimes = 0;
      if (initialTimes !== null && initialTimes !== undefined) {
        const p = parseInt(initialTimes, 10);
        parsedTimes = Number.isNaN(p) ? 0 : p;
      }

      const nestedId = `rep_nested_${this.blockIdCounter++}`;
      const validDir = (initialAction && REP_MOVE_DEFS[initialAction]) ? initialAction : null;
      const children = validDir
        ? [{ id: `rep_blk_${this.blockIdCounter++}`, type: 'move', dir: validDir }]
        : [];

      const nestedBlk = {
        id: nestedId,
        type: 'repeat',
        times: Math.max(0, Math.min(10, parsedTimes)),
        action: validDir,
        children: children
      };

      foundParent.block.children.push(nestedBlk);
      this.normalizeRepeatBlock(foundParent.block);

      if (!validDir) {
        this.focusedRepeatId = nestedId;
      }

      this.playSound('pop');
      this.refreshProgramStackDOM();
      return nestedId;
    }

    // Agregar o asignar un bloque de movimiento (adentro del REPETIR seleccionado o como instrucción individual)
    addMovementBlock(dir, targetRepeatId = null, forceStandalone = false) {
      if (this.isAnimatingStep || this.execMode === 'running') return;
      if (!REP_MOVE_DEFS[dir]) return;
      this.prepareForCodeEdit();

      const repeatIdToFill = targetRepeatId || (!forceStandalone ? this.focusedRepeatId : null);

      if (repeatIdToFill) {
        const found = this.findRepeatBlockById(repeatIdToFill);
        if (found && found.block) {
          const repBlock = found.block;
          this.normalizeRepeatBlock(repBlock);
          const hasNestedChild = repBlock.children.some(c => c.type === 'repeat');
          const ex = this.getCurrentExercise();
          const isMultiChildContext = hasNestedChild || !!(ex && (ex.allowNestedRepeat || ex.requireNestedRepeat));

          if (!isMultiChildContext && repBlock.children.length <= 1) {
            repBlock.children = [{
              id: `rep_blk_${this.blockIdCounter++}`,
              type: 'move',
              dir: dir
            }];
            repBlock.action = dir;
            this.focusedRepeatId = null;
          } else {
            repBlock.children.push({
              id: `rep_blk_${this.blockIdCounter++}`,
              type: 'move',
              dir: dir
            });
            this.normalizeRepeatBlock(repBlock);
          }

          this.playSound('pop');
          this.refreshProgramStackDOM();
          return;
        }
      }

      // Si no había un REPETIR enfocado, pero el último bloque es un REPETIR vacío y no se forzó individual, colocarlo adentro
      if (!forceStandalone && this.blocks.length > 0) {
        const lastBlock = this.blocks[this.blocks.length - 1];
        if (lastBlock.type === 'repeat') {
          this.normalizeRepeatBlock(lastBlock);
          if (lastBlock.children.length === 0) {
            lastBlock.children.push({
              id: `rep_blk_${this.blockIdCounter++}`,
              type: 'move',
              dir: dir
            });
            lastBlock.action = dir;
            this.focusedRepeatId = null;
            this.playSound('pop');
            this.refreshProgramStackDOM();
            return;
          }
        }
      }

      // Agregar como instrucción de movimiento individual en la secuencia principal
      this.blocks.push({
        id: `rep_blk_${this.blockIdCounter++}`,
        type: 'move',
        dir: dir
      });
      this.focusedRepeatId = null;
      this.playSound('pop');
      this.refreshProgramStackDOM();
    }

    // Cambiar la cantidad de repeticiones [N] de un bloque REPETIR (externo o interno, de 0 a 10)
    changeRepeatCount(blockId, delta) {
      if (this.isAnimatingStep || this.execMode === 'running') return;
      const found = this.findRepeatBlockById(blockId);
      if (!found || !found.block) return;
      this.prepareForCodeEdit();
      const curr = (typeof found.block.times === 'number' && !Number.isNaN(found.block.times)) ? found.block.times : 0;
      found.block.times = Math.max(0, Math.min(10, curr + delta));
      this.playSound('click');
      this.refreshProgramStackDOM();
    }

    setRepeatCountDirect(blockId, countVal) {
      if (this.isAnimatingStep || this.execMode === 'running') return;
      const found = this.findRepeatBlockById(blockId);
      if (!found || !found.block) return;
      this.prepareForCodeEdit();
      const parsed = parseInt(countVal, 10);
      if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 10) {
        found.block.times = parsed;
        this.playSound('click');
        this.refreshProgramStackDOM();
      }
    }

    // Cambiar o quitar la instrucción interna de un bloque REPETIR (externo o interno)
    setRepeatInnerAction(blockId, dirOrNull, childId = null) {
      if (this.isAnimatingStep || this.execMode === 'running') return;
      const found = this.findRepeatBlockById(blockId);
      if (!found || !found.block) return;
      const blk = found.block;
      this.normalizeRepeatBlock(blk);
      this.prepareForCodeEdit();

      if (dirOrNull && REP_MOVE_DEFS[dirOrNull]) {
        if (childId) {
          const targetChild = blk.children.find(c => c.id === childId && c.type === 'move');
          if (targetChild) targetChild.dir = dirOrNull;
        } else {
          const existingMove = blk.children.find(c => c.type === 'move');
          if (existingMove && blk.children.length === 1) {
            existingMove.dir = dirOrNull;
          } else if (!existingMove) {
            blk.children.unshift({
              id: `rep_blk_${this.blockIdCounter++}`,
              type: 'move',
              dir: dirOrNull
            });
          } else {
            existingMove.dir = dirOrNull;
          }
        }
        this.normalizeRepeatBlock(blk);
        if (this.focusedRepeatId === blockId) {
          this.focusedRepeatId = null;
        }
        this.playSound('pop');
      } else {
        if (childId) {
          blk.children = blk.children.filter(c => c.id !== childId);
        } else {
          blk.children = blk.children.filter(c => c.type !== 'move');
        }
        this.normalizeRepeatBlock(blk);
        this.focusedRepeatId = blockId;
        this.playSound('trash');
      }
      this.refreshProgramStackDOM();
    }

    removeChildFromRepeat(parentRepeatId, childId) {
      if (this.isAnimatingStep || this.execMode === 'running') return;
      const found = this.findRepeatBlockById(parentRepeatId);
      if (!found || !found.block) return;
      this.prepareForCodeEdit();
      this.normalizeRepeatBlock(found.block);
      found.block.children = found.block.children.filter(c => c.id !== childId);
      this.normalizeRepeatBlock(found.block);
      if (this.focusedRepeatId === childId) {
        this.focusedRepeatId = parentRepeatId;
      }
      this.playSound('trash');
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
      if (removed) {
        if (removed.id === this.focusedRepeatId) {
          this.focusedRepeatId = null;
        }
        if (Array.isArray(removed.children) && removed.children.some(c => c.id === this.focusedRepeatId)) {
          this.focusedRepeatId = null;
        }
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
        this.addMovementBlock(payload.dir, repeatBlockId, false);
      } else if (payload.kind === 'repeat') {
        const found = this.findRepeatBlockById(repeatBlockId);
        if (found && found.depth === 0) {
          this.addNestedRepeatBlock(repeatBlockId, 0, null);
        }
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
    // COMPILACIÓN Y EJECUCIÓN REAL (SOPORTA times === 0 Y REPETICIONES ANIDADAS)
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
          this.normalizeRepeatBlock(blk);
          const rawTimes = parseInt(blk.times, 10);
          const times = Number.isNaN(rawTimes) ? 0 : Math.max(0, Math.min(15, rawTimes));

          // Si el valor del bloque REPETIR es 0, no ejecuta ningún movimiento ni genera error
          if (times === 0) {
            continue;
          }

          if (blk.children.length === 0) {
            return {
              ok: false,
              emptyRepeatId: blk.id,
              title: '¡Al bloque REPETIR le falta una instrucción adentro!',
              detail: 'Elegí qué movimiento querés colocar dentro del bloque REPETIR antes de ejecutar.'
            };
          }

          // Validar hijos internos antes de expandir
          for (let cIdx = 0; cIdx < blk.children.length; cIdx++) {
            const child = blk.children[cIdx];
            if (child.type === 'repeat') {
              this.normalizeRepeatBlock(child);
              const rawInnerTimes = parseInt(child.times, 10);
              const innerTimes = Number.isNaN(rawInnerTimes) ? 0 : Math.max(0, Math.min(15, rawInnerTimes));
              if (innerTimes > 0 && child.children.length === 0) {
                return {
                  ok: false,
                  emptyRepeatId: child.id,
                  title: '¡Al bloque REPETIR interno le falta una instrucción adentro!',
                  detail: 'Elegí qué movimiento querés colocar dentro del bloque REPETIR interno antes de ejecutar.'
                };
              }
            }
          }

          // Expandir repetición externa y posibles repeticiones internas anidadas
          for (let outerIter = 1; outerIter <= times; outerIter++) {
            for (let cIdx = 0; cIdx < blk.children.length; cIdx++) {
              const child = blk.children[cIdx];
              if (child.type === 'move' && REP_MOVE_DEFS[child.dir]) {
                steps.push({
                  blockIndex: i,
                  blockId: blk.id,
                  childId: child.id,
                  blockType: 'repeat',
                  dir: child.dir,
                  currentIter: outerIter,
                  totalIter: times,
                  innerRepeatId: null,
                  innerCurrentIter: 0,
                  innerTotalIter: 0
                });
              } else if (child.type === 'repeat') {
                this.normalizeRepeatBlock(child);
                const rawInnerTimes = parseInt(child.times, 10);
                const innerTimes = Number.isNaN(rawInnerTimes) ? 0 : Math.max(0, Math.min(15, rawInnerTimes));
                if (innerTimes === 0) {
                  continue;
                }
                for (let innerIter = 1; innerIter <= innerTimes; innerIter++) {
                  for (let gcIdx = 0; gcIdx < child.children.length; gcIdx++) {
                    const gc = child.children[gcIdx];
                    if (gc.type === 'move' && REP_MOVE_DEFS[gc.dir]) {
                      steps.push({
                        blockIndex: i,
                        blockId: blk.id,
                        childId: gc.id,
                        blockType: 'repeat',
                        dir: gc.dir,
                        currentIter: outerIter,
                        totalIter: times,
                        innerRepeatId: child.id,
                        innerCurrentIter: innerIter,
                        innerTotalIter: innerTimes
                      });
                    }
                  }
                }
              }
            }
          }
        } else if (blk.type === 'move' && REP_MOVE_DEFS[blk.dir]) {
          steps.push({
            blockIndex: i,
            blockId: blk.id,
            blockType: 'move',
            dir: blk.dir,
            currentIter: 1,
            totalIter: 1,
            innerRepeatId: null,
            innerCurrentIter: 0,
            innerTotalIter: 0
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

      // Si todos los bloques REPETIR están en 0 veces (0 movimientos), evaluar sin error de ejecución
      if (this.expandedSteps.length === 0) {
        this.evaluateFinalResult();
        return;
      }

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

      if (compiled.steps.length === 0) {
        this.stopExecution();
        this.resetRuntimeState();
        this.expandedSteps = [];
        this.evaluateFinalResult();
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

      // Actualizar resaltado del bloque y progreso "1 de N → 2 de N..." en el DOM sin refrescar la página
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

      // Verificar si hay un objeto recolectable en (nx, ny)
      if (Array.isArray(ex.collectibles)) {
        const cItem = ex.collectibles.find(item => item.x === nx && item.y === ny);
        if (cItem) {
          const key = `${nx},${ny}`;
          if (!this.collectedKeys.has(key)) {
            this.collectedKeys.add(key);
            this.markCollectiblePickedDOM(nx, ny);
          }
        }
      }

      this.playSound('click');

      this.animateBityMoveDOM(oldPos, this.bityPos, stepObj.dir, () => {
        this.isAnimatingStep = false;
        this.updateStatusAndFeedbackDOM();
        if (typeof onDone === 'function') onDone('continue');
      });
    }

    markCollectiblePickedDOM(x, y) {
      const cell = document.querySelector(`#rep-grid-board-mount .ex-grid-cell[data-x="${x}"][data-y="${y}"]`);
      if (!cell) return;
      const colEl = cell.querySelector('.ex-cell-collectible-icon');
      if (colEl) {
        colEl.classList.add('collectible-picked');
        colEl.textContent = '✨';
      }
    }

    evaluateFinalResult() {
      this.stopExecution();
      const ex = this.getCurrentExercise();
      const atGoal = (this.bityPos.x === ex.goal.x && this.bityPos.y === ex.goal.y);
      const totalRepeatBlocks = this.countAllRepeatBlocks();
      const usedActiveRepeatBlock = this.blocks.some(b => b.type === 'repeat' && (parseInt(b.times, 10) || 0) > 0);
      const hasZeroRepeatBlock = this.blocks.some(b => b.type === 'repeat' && (parseInt(b.times, 10) || 0) === 0);

      // Verificar si faltó recolectar algún elemento intermedio del mapa
      const totalCollectibles = Array.isArray(ex.collectibles) ? ex.collectibles.length : 0;
      const collectedCount = this.collectedKeys ? this.collectedKeys.size : 0;
      const allCollectiblesPicked = (collectedCount >= totalCollectibles);

      if (this.expandedSteps.length === 0 && hasZeroRepeatBlock) {
        this.execMode = 'idle';
        this.playSound('click');
        this.feedback = {
          type: 'error',
          title: 'El bloque REPETIR tiene el valor 0 (0 movimientos).',
          detail: 'Usá el botón «＋» dentro del bloque REPETIR para elegir cuántas veces querés que Bity repita la instrucción.'
        };
        this.updateCodeHighlightDOM();
        this.updateStatusAndFeedbackDOM();
        return;
      }

      if (atGoal && !usedActiveRepeatBlock) {
        this.execMode = 'error';
        this.playSound('error');
        this.feedback = {
          type: 'error',
          title: '¡Llegaste al objetivo, pero sin usar el bloque REPETIR!',
          detail: 'En este módulo aprendemos a ahorrar instrucciones iguales. Reemplazá los movimientos repetidos por un bloque REPETIR con un número mayor a 0.'
        };
        this.updateCodeHighlightDOM();
        this.updateStatusAndFeedbackDOM();
        return;
      }

      if (atGoal && !allCollectiblesPicked) {
        this.execMode = 'error';
        this.playSound('error');
        this.feedback = {
          type: 'error',
          title: `¡Bity llegó al final, pero faltaron recolectar elementos (${collectedCount}/${totalCollectibles})!`,
          detail: 'Revisá el mapa: Bity tiene que pasar por todos los objetos del camino antes de llegar al objetivo.'
        };
        this.updateCodeHighlightDOM();
        this.updateStatusAndFeedbackDOM();
        return;
      }

      if (atGoal && typeof ex.maxRepeatBlocks === 'number' && totalRepeatBlocks > ex.maxRepeatBlocks) {
        this.execMode = 'error';
        this.playSound('error');
        this.feedback = {
          type: 'error',
          title: `¡Atención a la condición especial! Usaste ${totalRepeatBlocks} bloques REPETIR y solo se permite ${ex.maxRepeatBlocks}.`,
          detail: 'En este desafío debés utilizar UN SOLO bloque REPETIR para el tramo más largo y completar los demás pasos con instrucciones individuales.'
        };
        this.updateCodeHighlightDOM();
        this.updateStatusAndFeedbackDOM();
        return;
      }

      if (atGoal && ex.requireNestedRepeat && !this.hasNestedRepeatBlock()) {
        this.execMode = 'error';
        this.playSound('error');
        this.feedback = {
          type: 'error',
          title: '¡Llegaste al objetivo, pero falta usar una repetición dentro de otra!',
          detail: 'En este desafío especial debés colocar un bloque REPETIR adentro de otro bloque REPETIR para repetir todo el patrón.'
        };
        this.updateCodeHighlightDOM();
        this.updateStatusAndFeedbackDOM();
        return;
      }

      if (atGoal && usedActiveRepeatBlock && allCollectiblesPicked) {
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
          detail: `¡Con solo ${usedBlocksCount} ${usedBlocksCount === 1 ? 'bloque principal' : 'bloques principales'} en tu programa lograste que Bity realizara ${totalMovesCount} movimientos!`
        };

        const goalCell = document.querySelector(`#rep-grid-board-mount .ex-grid-cell[data-x="${this.bityPos.x}"][data-y="${this.bityPos.y}"]`);
        const sprite = goalCell ? goalCell.querySelector('.ex-bity-sprite') : null;
        if (sprite) {
          sprite.innerHTML = this.getBitySvgMarkup('celebrating');
          sprite.classList.add('bity-spin-celebration');
        }
        this.updateSolvedTabsDOM();
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

        const iterContainer = el.querySelector(':scope > .rep-c-footer > .rep-c-iter-progress') || el.querySelector('.rep-c-iter-progress');
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

      // Actualizar bloques REPETIR anidados internos si existen
      const nestedEls = document.querySelectorAll('#rep-program-stack-mount .rep-c-block-nested[data-rep-block-id]');
      nestedEls.forEach(nEl => {
        const nestedId = nEl.getAttribute('data-rep-block-id');
        const isCurrentNested = !!(currentStep && currentStep.innerRepeatId === nestedId && (this.execMode === 'running' || this.execMode === 'step' || this.execMode === 'error'));
        nEl.classList.toggle('rep-block-executing', isCurrentNested);

        const found = this.findRepeatBlockById(nestedId);
        const nIterContainer = nEl.querySelector('.rep-c-iter-progress');
        if (found && found.block && nIterContainer) {
          let activeInnerIter = 0;
          if (currentStep && currentStep.innerRepeatId === nestedId) {
            activeInnerIter = currentStep.innerCurrentIter;
          } else if (this.execMode === 'won') {
            activeInnerIter = found.block.times + 1;
          }
          nIterContainer.innerHTML = this.renderRepeatIterPillsInner(found.block.times, activeInnerIter);
        }
      });
    }

    renderRepeatIterPillsInner(times, activeIter) {
      const n = Math.max(0, parseInt(times, 10) || 0);
      if (n === 0) {
        return `<span class="rep-iter-step-pill">${this.txt('0 repeticiones (Elegí un número con ＋)')}</span>`;
      }
      const pills = [];
      for (let k = 1; k <= n; k++) {
        let cls = 'rep-iter-step-pill';
        if (activeIter > k) cls += ' iter-done';
        else if (activeIter === k) cls += ' iter-current';
        pills.push(`<span class="${cls}">${k} ${this.txt('de')} ${n}</span>`);
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
      const totalExCount = this.getExercisesForCurrentGrade().length;
      const ex = this.getCurrentExercise();
      const tabBtn = document.querySelector(`.btn-rep-ex-tab[data-ex-idx="${this.currentExerciseIdx}"]`);
      if (tabBtn && doneSet.has(ex.id)) {
        tabBtn.classList.add('completed');
        const iconEl = tabBtn.querySelector('.rep-tab-icon');
        if (iconEl) iconEl.textContent = '✅';
      }
      const progBadge = document.getElementById('rep-top-progress-count');
      if (progBadge) {
        progBadge.textContent = `${doneSet.size} / ${totalExCount}`;
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
      const totalExCount = this.getExercisesForCurrentGrade().length;

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
              <span>🧩</span> <span>${this.txt('2. Ejercicios Guiados (9)')}</span>
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
              <span id="rep-top-progress-count">${doneSet.size} / ${totalExCount}</span>
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
              <span>${this.txt('¡PRACTICAR EN LOS 9 EJERCICIOS GUIADOS!')} ➔</span>
            </button>
          </div>
        </section>
      `;
    }

    // ------------------------------------------------------------
    // VISTA 3: SEGUNDA PARTE — LOS 9 EJERCICIOS GUIADOS (POR GRADO)
    // ------------------------------------------------------------
    renderExercisesView() {
      const exList = this.getExercisesForCurrentGrade();
      const ex = this.getCurrentExercise();
      const doneSet = this.completedByGrade[this.currentGrade] || new Set();
      const isBusy = (this.isAnimatingStep || this.execMode === 'running');
      const moveKeys = ['right', 'left', 'down', 'up'];
      const topLevelRepeatBlocks = this.blocks.filter(b => b.type === 'repeat');
      const canAddNestedHere = !!(ex.allowNestedRepeat || ex.requireNestedRepeat || this.currentGrade >= 4);

      return `
        <section class="rep-exercises-workspace">
          <!-- Barra de Selección de los 9 Ejercicios Guiados -->
          <div class="rep-exercises-selector-bar">
            <div class="rep-ex-tabs-group" role="tablist" aria-label="Nueve ejercicios guiados de repeticiones">
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

              ${ex.specialRuleBanner ? `
                <div class="rep-special-rule-banner">
                  <span>${this.txt(ex.specialRuleBanner)}</span>
                </div>
              ` : ''}

              ${ex.nestedGuideExample ? `
                <div class="rep-visual-nested-guide">
                  <strong>💡 ${this.txt('Ejemplo visual de un bloque REPETIR dentro de otro bloque REPETIR:')}</strong>
                  <pre>${this.txt(ex.nestedGuideExample)}</pre>
                </div>
              ` : ''}

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
                <span class="ex-goal-collectible-tag">🔁 ${this.txt(ex.requireNestedRepeat ? 'Repetición dentro de otra' : (ex.maxRepeatBlocks === 1 ? 'Usá 1 solo REPETIR' : 'Usá el bloque REPETIR'))}</span>
              </div>
            </div>
          </div>

          <!-- CONTENEDOR DE DOS COLUMNAS: SECTOR DE CÓDIGO Y SECTOR DEL MAPA -->
          <div class="ex-main-two-sectors">

            <!-- SECTOR B: PALETA Y ÁREA DE CÓDIGO -->
            <div class="ex-sector-code alg-card">
              <div class="ex-sector-header">
                <span class="ex-sector-tag">🧩 ${this.txt('CONSTRUÍ TU PROGRAMA CON REPETICIONES')}</span>
                <span class="ex-sector-subhint">${this.txt('Agregá el bloque REPETIR (inicia en 0), elegí cuántas veces y colocá el movimiento adentro')}</span>
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

                  <!-- Bloque REPETIR [0] VECES (Inspirado en img/repeticiones.jfif, valor inicial = 0) -->
                  <div class="ex-palette-group-label" style="color:#86efac;">🔁 ${this.txt('BLOQUE DE REPETICIÓN')}</div>
                  <button type="button"
                    id="btn-rep-add-repeat"
                    class="btn-palette-add-repeat"
                    draggable="${!isBusy}"
                    ${isBusy ? 'disabled' : ''}
                    ondragstart="window.repeticionesModule.handlePaletteDragStart(event, 'repeat')"
                    onclick="window.repeticionesModule.addRepeatBlock()">
                    <span>🔁 REPETIR</span>
                    <span class="rep-palette-count-pill">0</span>
                    <span>VECES { } ＋</span>
                  </button>

                  ${canAddNestedHere && topLevelRepeatBlocks.length > 0 ? `
                    <button type="button"
                      id="btn-rep-add-nested-palette"
                      class="btn-palette-add-repeat"
                      style="background: linear-gradient(180deg, #0284c7 0%, #0369a1 100%); border-color: #7dd3fc; margin-top: -4px;"
                      ${isBusy ? 'disabled' : ''}
                      onclick="window.repeticionesModule.addNestedRepeatBlock('${topLevelRepeatBlocks[topLevelRepeatBlocks.length - 1].id}')">
                      <span>🔁 + REPETIR INTERNO</span>
                      <span class="rep-palette-count-pill" style="background:#0c4a6e;">0</span>
                      <span>{ }</span>
                    </button>
                  ` : ''}

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
      const found = this.focusedRepeatId ? this.findRepeatBlockById(this.focusedRepeatId) : null;

      if (found && found.block) {
        const isNested = found.depth > 0;
        return `
          <div class="rep-target-mode-box">
            <span>🎯 ${this.txt(isNested
              ? 'El próximo movimiento irá ADENTRO del bloque REPETIR INTERNO seleccionado'
              : 'El próximo movimiento irá ADENTRO del bloque REPETIR seleccionado')}</span>
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

    renderNestedRepeatBlockInner(nestedBlk, parentBlk, isBusy, currentStep) {
      this.normalizeRepeatBlock(nestedBlk);
      const isMouthFocused = (this.focusedRepeatId === nestedBlk.id);
      const isExecutingNested = !!(currentStep && currentStep.innerRepeatId === nestedBlk.id && (this.execMode === 'running' || this.execMode === 'step' || this.execMode === 'error'));
      const moveChildren = nestedBlk.children.filter(c => c.type === 'move');

      let activeInnerIter = 0;
      if (currentStep && currentStep.innerRepeatId === nestedBlk.id) {
        activeInnerIter = currentStep.innerCurrentIter;
      } else if (this.execMode === 'won') {
        activeInnerIter = nestedBlk.times + 1;
      }

      return `
        <div class="rep-c-block rep-c-block-nested ${isExecutingNested ? 'rep-block-executing' : ''}"
          data-rep-block-id="${nestedBlk.id}">
          <div class="rep-c-header">
            <div class="rep-c-header-title">
              <span class="rep-nested-badge-tag">🔁 ${this.txt('INTERNO')}</span>
              <span>REPETIR</span>
              <span class="rep-c-count-control">
                <button type="button"
                  class="btn-rep-count-step"
                  ${isBusy || nestedBlk.times <= 0 ? 'disabled' : ''}
                  onclick="event.stopPropagation(); window.repeticionesModule.changeRepeatCount('${nestedBlk.id}', -1)"
                  title="${this.txt('Disminuir repeticiones internas')}">−</button>
                <span class="rep-c-count-badge" data-rep-times="${nestedBlk.times}">${nestedBlk.times}</span>
                <button type="button"
                  class="btn-rep-count-step"
                  ${isBusy || nestedBlk.times >= 10 ? 'disabled' : ''}
                  onclick="event.stopPropagation(); window.repeticionesModule.changeRepeatCount('${nestedBlk.id}', 1)"
                  title="${this.txt('Aumentar repeticiones internas')}">＋</button>
              </span>
              <span>VECES:</span>
            </div>

            <div class="ex-placed-controls">
              <button type="button"
                class="btn-ex-block-remove"
                ${isBusy ? 'disabled' : ''}
                onclick="event.stopPropagation(); window.repeticionesModule.removeChildFromRepeat('${parentBlk.id}', '${nestedBlk.id}')"
                title="${this.txt('Eliminar bloque REPETIR interno')}">✕</button>
            </div>
          </div>

          <div class="rep-c-body">
            <div class="rep-c-spine"></div>
            <div class="rep-c-mouth ${isMouthFocused ? 'mouth-selected' : ''}"
              ondragover="window.repeticionesModule.handleDragOver(event, this)"
              ondragleave="window.repeticionesModule.handleDragLeave(event, this)"
              ondrop="window.repeticionesModule.handleDropOnRepeatMouth(event, '${nestedBlk.id}')"
              onclick="event.stopPropagation(); window.repeticionesModule.focusRepeatMouth('${nestedBlk.id}')">
              <span class="rep-c-curly-brace" aria-hidden="true">{</span>

              <div class="rep-c-inner-slot">
                ${moveChildren.length > 0 ? `
                  <div class="rep-c-children-list">
                    ${moveChildren.map(mc => {
                      const mDef = REP_MOVE_DEFS[mc.dir] || REP_MOVE_DEFS.right;
                      return `
                        <div class="rep-inner-move-block">
                          <div class="rep-inner-move-left">
                            <span class="rep-inner-arrow-badge">${mDef.arrow}</span>
                            <span>${mDef.label}</span>
                          </div>
                          <button type="button"
                            class="btn-ex-block-remove"
                            ${isBusy ? 'disabled' : ''}
                            onclick="event.stopPropagation(); window.repeticionesModule.removeChildFromRepeat('${nestedBlk.id}', '${mc.id}')"
                            title="${this.txt('Quitar instrucción interna')}">✕</button>
                        </div>
                      `;
                    }).join('')}
                  </div>
                ` : `
                  <button type="button"
                    class="rep-empty-mouth-btn"
                    onclick="event.stopPropagation(); window.repeticionesModule.focusRepeatMouth('${nestedBlk.id}')">
                    ➕ ${this.txt('Elegí aquí el movimiento del REPETIR interno')}
                  </button>
                `}

                <div class="rep-quick-dirs-row" onclick="event.stopPropagation();">
                  <span class="rep-quick-dirs-lbl">${this.txt('Movimiento interno:')}</span>
                  ${['right', 'left', 'down', 'up'].map(d => {
                    const mDef = REP_MOVE_DEFS[d];
                    return `
                      <button type="button"
                        class="btn-rep-quick-dir ${nestedBlk.action === d ? 'active-dir' : ''}"
                        ${isBusy ? 'disabled' : ''}
                        onclick="window.repeticionesModule.setRepeatInnerAction('${nestedBlk.id}', '${d}')"
                        title="${this.txt(mDef.label)}">
                        ${mDef.arrow} ${this.txt(mDef.shortLabel)}
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>
          </div>

          <div class="rep-c-footer">
            <div class="rep-c-iter-progress">
              ${this.renderRepeatIterPillsInner(nestedBlk.times, activeInnerIter)}
            </div>
          </div>
        </div>
      `;
    }

    renderProgramStackInner() {
      const isBusy = (this.isAnimatingStep || this.execMode === 'running');
      if (this.blocks.length === 0) {
        return `
          <div class="ex-empty-algorithm-dropzone">
            <div class="ex-empty-arrow">🔁</div>
            <p class="ex-empty-title">${this.txt('Tu algoritmo está vacío')}</p>
            <p class="ex-empty-sub">${this.txt('Tocá o arrastrá el bloque verde REPETIR (comienza en 0), elegí la cantidad con ＋ y colocá adentro la instrucción de movimiento.')}</p>
          </div>
        `;
      }

      const ex = this.getCurrentExercise();
      const showNestedControls = !!(ex.allowNestedRepeat || ex.requireNestedRepeat || this.currentGrade >= 4);
      const currentStep = (this.stepCursor >= 0 && this.stepCursor < this.expandedSteps.length)
        ? this.expandedSteps[this.stepCursor]
        : null;

      return this.blocks.map((blk, idx) => {
        const isExecutingNow = !!(currentStep && currentStep.blockIndex === idx && (this.execMode === 'running' || this.execMode === 'step' || this.execMode === 'error'));

        if (blk.type === 'repeat') {
          this.normalizeRepeatBlock(blk);
          const isMouthFocused = (this.focusedRepeatId === blk.id);
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
                      ${isBusy || blk.times <= 0 ? 'disabled' : ''}
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

              <!-- Cuerpo en C con llave naranja { y lista de instrucciones o REPETIR interno -->
              <div class="rep-c-body">
                <div class="rep-c-spine"></div>
                <div class="rep-c-mouth ${isMouthFocused ? 'mouth-selected' : ''}"
                  ondragover="window.repeticionesModule.handleDragOver(event, this)"
                  ondragleave="window.repeticionesModule.handleDragLeave(event, this)"
                  ondrop="window.repeticionesModule.handleDropOnRepeatMouth(event, '${blk.id}')"
                  onclick="window.repeticionesModule.focusRepeatMouth('${blk.id}')">
                  <span class="rep-c-curly-brace" aria-hidden="true">{</span>

                  <div class="rep-c-inner-slot">
                    ${blk.children.length > 0 ? `
                      <div class="rep-c-children-list">
                        ${blk.children.map(child => {
                          if (child.type === 'repeat') {
                            return this.renderNestedRepeatBlockInner(child, blk, isBusy, currentStep);
                          }
                          const innerDef = REP_MOVE_DEFS[child.dir] || REP_MOVE_DEFS.right;
                          return `
                            <div class="rep-inner-move-block">
                              <div class="rep-inner-move-left">
                                <span class="rep-inner-arrow-badge">${innerDef.arrow}</span>
                                <span>${innerDef.label}</span>
                              </div>
                              <button type="button"
                                class="btn-ex-block-remove"
                                ${isBusy ? 'disabled' : ''}
                                onclick="event.stopPropagation(); window.repeticionesModule.removeChildFromRepeat('${blk.id}', '${child.id}')"
                                title="${this.txt('Quitar o cambiar instrucción interna')}">✕</button>
                            </div>
                          `;
                        }).join('')}
                      </div>
                    ` : `
                      <button type="button"
                        class="rep-empty-mouth-btn"
                        onclick="event.stopPropagation(); window.repeticionesModule.focusRepeatMouth('${blk.id}')">
                        ➕ ${this.txt('Elegí o arrastrá aquí el movimiento a repetir')}
                      </button>
                    `}

                    <!-- Selector rápido de dirección y botón para agregar REPETIR interno anidado -->
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
                      ${showNestedControls ? `
                        <button type="button"
                          class="btn-rep-add-nested-inline"
                          ${isBusy ? 'disabled' : ''}
                          onclick="window.repeticionesModule.addNestedRepeatBlock('${blk.id}')"
                          title="${this.txt('Colocar un bloque REPETIR dentro de este bloque REPETIR')}">
                          🔁 + ${this.txt('REPETIR INTERNO')}
                        </button>
                      ` : ''}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Base del bloque C con progreso de repeticiones: 1 de N → 2 de N... -->
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
      const collectibles = Array.isArray(ex.collectibles) ? ex.collectibles : [];
      let html = '';

      for (let r = 0; r < ex.rows; r++) {
        for (let c = 0; c < ex.cols; c++) {
          const isObstacle = (ex.grid[r] && ex.grid[r][c] === 1);
          const isStart = (ex.start.x === c && ex.start.y === r);
          const isGoal = (ex.goal.x === c && ex.goal.y === r);
          const isBityHere = (this.bityPos.x === c && this.bityPos.y === r);
          const cItem = collectibles.find(item => item.x === c && item.y === r);
          const isCollected = !!(cItem && this.collectedKeys && this.collectedKeys.has(`${c},${r}`));

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
              ${cItem && !isGoal ? `
                <span class="ex-cell-collectible-icon ${isCollected ? 'collectible-picked' : 'item-pulse'}"
                  title="${this.txt(cItem.name || 'Elemento a recolectar')}">
                  ${isCollected ? '✨' : cItem.icon}
                </span>
              ` : ''}
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
              🔁 ${this.txt('Repetición externa')}: <strong>${currentStep.currentIter} ${this.txt('de')} ${currentStep.totalIter}</strong>
            </span>
          ` : ''}
          ${currentStep && currentStep.innerRepeatId ? `
            <span class="ex-counter-pill" style="border-color:#7dd3fc; color:#7dd3fc;">
              🔁 ${this.txt('Repetición interna')}: <strong>${currentStep.innerCurrentIter} ${this.txt('de')} ${currentStep.innerTotalIter}</strong>
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
      const exList = this.getExercisesForCurrentGrade();
      const totalExCount = exList.length;
      const ex = this.getCurrentExercise();
      const doneSet = this.completedByGrade[this.currentGrade] || new Set();
      const isFinalExerciseWon = (this.feedback.type === 'won' && ex.number === totalExCount);

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
              “${this.txt(`¡Completaste los ${totalExCount} ejercicios de REPETICIONES de ${this.currentGrade}.º Grado (${doneSet.size}/${totalExCount})! Ya sabés cómo usar el bloque REPETIR para crear programas cortos, claros e inteligentes.`)}”
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
