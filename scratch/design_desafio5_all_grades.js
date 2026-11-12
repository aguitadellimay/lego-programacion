const fs = require('fs');

function bfs(grid, cols, rows, start, goal) {
  const queue = [{ x: start.x, y: start.y, path: [], dist: 0 }];
  const allPaths = [];

  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur.x === goal.x && cur.y === goal.y) {
      allPaths.push(cur);
      if (allPaths.length >= 50) break;
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
        if (!cur.path.some(p => p.x === nx && p.y === ny) && cur.path.length < 35) {
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

const NEW_DESAFIO5 = {
  // ================= 1.º GRADO =================
  // 6x5 grid, start (1,1), goal (4,3), 2 interactive items: 1 door at (2,1) or (3,1), 1 window at (2,3)
  1: {
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
      { id: 'item_g1_1', type: 'door', x: 2, y: 1, name: 'PUERTA 1' },
      { id: 'item_g1_2', type: 'window', x: 2, y: 3, name: 'VENTANA 1' }
    ]
  },

  // ================= 2.º GRADO =================
  // 7x6 grid, start (1,1), goal (5,4), 3 items: door at (3,1), window at (1,3), pumpkin at (3,3)
  2: {
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
  },

  // ================= 3.º GRADO =================
  // 8x6 grid, start (1,1), goal (6,4), 4 items: door, window, chest, door
  3: {
    title: 'Desafío 5: El Laberinto de los Desafíos Misteriosos',
    hint: 'Diversos caminos con obstáculos. Resolvé las preguntas en puertas y cofres para avanzar.',
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
  },

  // ================= 4.º GRADO =================
  // 9x7 grid, start (1,1), goal (7,5), 4 items: door, window, chest, pumpkin
  4: {
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
  },

  // ================= 5.º GRADO =================
  // 10x8 grid, start (1,1), goal (8,6), 5 items: door, window, chest, pumpkin, door
  5: {
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
};

console.log('=== VERIFYING NEW DESAFÍO 5 ACROSS ALL 5 GRADES ===');
for (const grade of [1, 2, 3, 4, 5]) {
  const m = NEW_DESAFIO5[grade];
  const paths = bfs(m.grid, m.cols, m.rows, m.start, m.goal);
  console.log(`Grade ${grade}: Found ${paths.length} paths to goal. Shortest: ${paths[0]?.dist}, Longest: ${paths[paths.length-1]?.dist}`);
  
  // Verify that all items are on walkable cells (grid === 0)
  for (const item of m.items) {
    const isWalkable = m.grid[item.y][item.y !== undefined ? item.x : 0] === 0;
    const canReach = bfs(m.grid, m.cols, m.rows, m.start, { x: item.x, y: item.y }).length > 0;
    console.log(`  Item ${item.name} (${item.type}) at (${item.x}, ${item.y}): walkable=${isWalkable}, reachable=${canReach}`);
  }
}
