const fs = require('fs');

function bfs(grid, cols, rows, start, goal) {
  const queue = [{ x: start.x, y: start.y, path: [], dist: 0 }];
  const allPaths = [];

  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur.x === goal.x && cur.y === goal.y) {
      allPaths.push(cur);
      if (allPaths.length >= 20) break;
      continue;
    }
    const dirs = [
      { name: 'up', dx: 0, dy: -1 },
      { name: 'down', dx: 0, dy: 1 },
      { name: 'left', dx: -1, dy: 0 },
      { name: 'right', dx: 1, dy: 0 }
    ];
    for (const d of dirs) {
      const nx = cur.x + d.dx;
      const ny = cur.y + d.dy;
      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && grid[ny][nx] !== 1) {
        if (!cur.path.some(p => p.x === nx && p.y === ny) && cur.path.length < 24) {
          queue.push({
            x: nx, y: ny,
            path: [...cur.path, { dir: d.name, x: nx, y: ny }],
            dist: cur.dist + 1
          });
        }
      }
    }
  }
  return allPaths;
}

const ALL_MAZES = {
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
      title: 'DESAFÍO 3: ¿QUÉ CAMINO CONVIENE?',
      hint: 'HAY UN CAMINO CORTO (4 PASOS) Y OTRO MÁS LARGO (8 PASOS). ¡DESCUBRILOS!',
      cols: 6, rows: 5,
      start: { x: 1, y: 1 },
      goal: { x: 4, y: 1 },
      optimalSteps: 3,
      grid: [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1]
      ]
    },
    d4_laberinto: {
      title: 'DESAFÍO 4: RESOLVÉ EL LABERINTO',
      hint: 'OBSERVÁ EL MAPA Y PLANIFICÁ LAS FLECHAS ANTES DE EJECUTAR.',
      cols: 6, rows: 5,
      start: { x: 1, y: 1 },
      goal: { x: 4, y: 3 },
      grid: [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 1],
        [1, 1, 0, 0, 1, 1],
        [1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1]
      ]
    }
  },

  // ================= 2.º GRADO =================
  2: {
    d1_mecanico: {
      title: 'Desafío 1: Ayudá a Bity a llegar al mecánico',
      hint: 'Planificá los pasos con las flechas de dirección para llegar al taller.',
      cols: 6, rows: 5,
      start: { x: 1, y: 1 },
      goal: { x: 4, y: 3 },
      grid: [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 1],
        [1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1]
      ]
    },
    d2_caminos: {
      title: 'Desafío 2: Encontrá el camino',
      hint: 'Probá diferentes rutas para alcanzar la meta esquivando los asteroides.',
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
      title: 'Desafío 3: ¿Qué camino conviene?',
      hint: 'Compará los caminos: el camino directo requiere menos instrucciones que el rodeo.',
      cols: 7, rows: 5,
      start: { x: 1, y: 1 },
      goal: { x: 5, y: 1 },
      optimalSteps: 4,
      grid: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d4_laberinto: {
      title: 'Desafío 4: Resolvé el laberinto',
      hint: 'Guiá a Bity a través de los pasillos espaciales hasta la meta.',
      cols: 6, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 4, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 1],
        [1, 1, 1, 0, 1, 1],
        [1, 0, 0, 0, 1, 1],
        [1, 0, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1]
      ]
    }
  },

  // ================= 3.º GRADO =================
  3: {
    d1_mecanico: {
      title: 'Desafío 1: Ayudá a Bity a llegar al mecánico',
      hint: 'Utilizá el botón "Paso a paso" para probar y depurar cada instrucción.',
      cols: 6, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 4, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 1],
        [1, 1, 0, 0, 1, 1],
        [1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1]
      ]
    },
    d2_caminos: {
      title: 'Desafío 2: Encontrá el camino',
      hint: 'Descubrí al menos dos caminos alternativos para llegar al destino.',
      cols: 7, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 5, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d3_optimizacion: {
      title: 'Desafío 3: ¿Qué camino conviene?',
      hint: 'El camino óptimo usa 5 instrucciones. ¿Cuántas usaste vos?',
      cols: 7, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 5, y: 2 },
      optimalSteps: 5,
      grid: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d4_laberinto: {
      title: 'Desafío 4: Resolvé el laberinto',
      hint: 'Planificá con anticipación: evitá callejones sin salida.',
      cols: 7, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 5, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ]
    }
  },

  // ================= 4.º GRADO =================
  4: {
    d1_mecanico: {
      title: 'Desafío 1: Ayudá a Bity a llegar al mecánico',
      hint: 'Secuencia algorítmica autónoma: trazá la ruta completa hacia el taller.',
      cols: 7, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 5, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 1, 1],
        [1, 1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d2_caminos: {
      title: 'Desafío 2: Encontrá el camino',
      hint: 'Existen múltiples soluciones válidas. Comprobá que Bity esquive los obstáculos.',
      cols: 7, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 5, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d3_optimizacion: {
      title: 'Desafío 3: ¿Qué camino conviene?',
      hint: 'Camino óptimo (6 pasos) vs alternativo (10 pasos). ¡Optimizá tus bloques!',
      cols: 8, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 6, y: 2 },
      optimalSteps: 6,
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d4_laberinto: {
      title: 'Desafío 4: Resolvé el laberinto',
      hint: 'Laberinto con bifurcaciones. Evaluá el costo de cada bifurcación.',
      cols: 8, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 6, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ]
    }
  },

  // ================= 5.º GRADO =================
  5: {
    d1_mecanico: {
      title: 'Desafío 1: Ayudá a Bity a llegar al mecánico',
      hint: 'Misión cumbre: analizá la trayectoria e implementá el algoritmo.',
      cols: 8, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 6, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d2_caminos: {
      title: 'Desafío 2: Encontrá el camino',
      hint: 'Comprobá las rutas posibles y elegí la que mejor se adapte a tu estrategia.',
      cols: 8, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 6, y: 4 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d3_optimizacion: {
      title: 'Desafío 3: ¿Qué camino conviene?',
      hint: 'Camino óptimo (7 pasos) vs alternativa (12 pasos). Evaluá la eficiencia.',
      cols: 8, rows: 6,
      start: { x: 1, y: 1 },
      goal: { x: 6, y: 2 },
      optimalSteps: 6,
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ]
    },
    d4_laberinto: {
      title: 'Desafío 4: Resolvé el laberinto',
      hint: 'Resolución algorítmica de máxima eficiencia. ¡Guiá a Bity a la meta!',
      cols: 8, rows: 7,
      start: { x: 1, y: 1 },
      goal: { x: 6, y: 5 },
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ]
    }
  }
};

// Test and verify all 20 mazes
console.log('=== VERIFYING ALL 20 MAZES ACROSS 5 GRADES ===');
for (const grade of [1, 2, 3, 4, 5]) {
  console.log(`\n--- GRADE ${grade} ---`);
  for (const mKey of ['d1_mecanico', 'd2_caminos', 'd3_optimizacion', 'd4_laberinto']) {
    const m = ALL_MAZES[grade][mKey];
    const paths = bfs(m.grid, m.cols, m.rows, m.start, m.goal);
    if (paths.length === 0) {
      console.error(`❌ ERROR in Grade ${grade} ${mKey}: No valid path found!`);
      process.exit(1);
    }
    const shortest = Math.min(...paths.map(p => p.dist));
    const longest = Math.max(...paths.map(p => p.dist));
    console.log(`✓ ${mKey}: ${paths.length} valid paths found. Shortest: ${shortest}, Longest: ${longest}`);
  }
}
console.log('\nAll 20 mazes are 100% verified and solvable!');
