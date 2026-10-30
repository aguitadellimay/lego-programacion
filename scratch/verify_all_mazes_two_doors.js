// scratch/verify_all_mazes_two_doors.js
const mazes = [
  // 1.er Grado
  {
    name: '1.º Grado - Nivel 1: El camino de Marte',
    cols: 7, rows: 5,
    start: { x: 1, y: 1, dir: 1 },
    goal: { x: 4, y: 3 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 2, 0, 1, 1],
      [1, 1, 1, 1, 2, 1, 1],
      [1, 1, 1, 1, 3, 1, 1],
      [1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    name: '1.º Grado - Nivel 2: La base lunar',
    cols: 8, rows: 7,
    start: { x: 1, y: 5, dir: 0 },
    goal: { x: 6, y: 1 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 3, 1],
      [1, 0, 0, 2, 0, 1, 1, 1],
      [1, 2, 0, 1, 0, 1, 1, 1],
      [1, 0, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    name: '1.º Grado - Nivel 3: El sector cósmico',
    cols: 9, rows: 7,
    start: { x: 1, y: 1, dir: 2 },
    goal: { x: 7, y: 3 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 0, 0, 1, 0, 0, 3, 1],
      [1, 1, 1, 0, 1, 0, 1, 1, 1],
      [1, 1, 1, 2, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    name: '1.º Grado - Nivel 4: La estación de energía',
    cols: 10, rows: 7,
    start: { x: 1, y: 1, dir: 1 },
    goal: { x: 8, y: 2 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 0, 0, 3, 1],
      [1, 1, 0, 0, 1, 1, 0, 1, 1, 1],
      [1, 1, 2, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 0, 0, 2, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    name: '1.º Grado - Nivel 5: ¡Regreso a casa!',
    cols: 11, rows: 8,
    start: { x: 1, y: 6, dir: 0 },
    goal: { x: 9, y: 1 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 2, 1, 0, 1, 0, 1],
      [1, 0, 1, 2, 1, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    name: '1.º Grado - Nivel 6: Desafío Especial de Instrucciones',
    cols: 8, rows: 6,
    start: { x: 1, y: 1, dir: 1 },
    goal: { x: 6, y: 4 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 2, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 2, 1],
      [1, 1, 1, 1, 0, 0, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  // 2.º Grado
  {
    name: '2.º Grado - Misión 3: Abrir la puerta espacial',
    cols: 8, rows: 6,
    start: { x: 1, y: 1, dir: 1 },
    goal: { x: 6, y: 4 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 2, 0, 2, 0, 1, 1],
      [1, 1, 1, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 0, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    name: '2.º Grado - Misión 4: Desafío Especial de Instrucciones',
    cols: 9, rows: 7,
    start: { x: 1, y: 1, dir: 1 },
    goal: { x: 7, y: 5 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 2, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 0, 1, 2, 1],
      [1, 1, 1, 1, 1, 0, 0, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  // 3.er Grado
  {
    name: '3.er Grado - Misión 4: Laberinto ferroviario de Byte',
    cols: 9, rows: 6,
    start: { x: 1, y: 1, dir: 1 },
    goal: { x: 7, y: 4 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 2, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 2, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    name: '3.er Grado - Misión 5: Desafío Especial de Instrucciones',
    cols: 10, rows: 8,
    start: { x: 1, y: 1, dir: 1 },
    goal: { x: 8, y: 6 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 2, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 2, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  // 4.º Grado
  {
    name: '4.º Grado - Laberinto 1: El alquimista cósmico',
    cols: 9, rows: 7,
    start: { x: 1, y: 1, dir: 1 },
    goal: { x: 7, y: 5 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 1, 1, 1, 1, 1],
      [1, 1, 2, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 2, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    name: '4.º Grado - Laberinto 2: El cementerio de las calabazas',
    cols: 10, rows: 8,
    start: { x: 1, y: 1, dir: 1 },
    goal: { x: 8, y: 6 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 2, 0, 0, 0, 1, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 1, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 2, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    name: '4.º Grado - Laberinto 3: La puerta del castillo encantado',
    cols: 11, rows: 8,
    start: { x: 1, y: 1, dir: 1 },
    goal: { x: 9, y: 6 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1],
      [1, 0, 0, 0, 1, 1, 0, 0, 0, 2, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    name: '4.º Grado - Misión 7: Desafío Especial de Instrucciones',
    cols: 11, rows: 8,
    start: { x: 1, y: 1, dir: 1 },
    goal: { x: 9, y: 6 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  // 5.º Grado
  {
    name: '5.º Grado - Laberinto 1: El castillo de los caminos secretos',
    cols: 11, rows: 9,
    start: { x: 1, y: 1, dir: 1 },
    goal: { x: 9, y: 7 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1],
      [1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1],
      [1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 1, 1, 0, 0, 0, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    name: '5.º Grado - Laberinto 2: El bosque encantado de las rutas alternativas',
    cols: 12, rows: 9,
    start: { x: 1, y: 1, dir: 1 },
    goal: { x: 10, y: 7 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
      [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 0, 1, 2, 1, 1],
      [1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    name: '5.º Grado - Laberinto 3: La misión final de Halloween',
    cols: 13, rows: 9,
    start: { x: 1, y: 1, dir: 1 },
    goal: { x: 11, y: 7 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1],
      [1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1],
      [1, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 1, 1],
      [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    name: '5.º Grado - Misión 8: Desafío Especial de Instrucciones',
    cols: 12, rows: 9,
    start: { x: 1, y: 1, dir: 1 },
    goal: { x: 10, y: 7 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 2, 1],
      [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  }
];

let failed = 0;
mazes.forEach(m => {
  const { name, grid, start, goal } = m;
  const rows = grid.length, cols = grid[0].length;
  const doorCells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) doorCells.push({ r, c });
    }
  }

  if (doorCells.length < 2) {
    console.error(`❌ ${name}: Fewer than 2 doors (${doorCells.length})`);
    failed++;
    return;
  }

  // BFS check reachable doors and goal
  const q = [{ r: start.y, c: start.x }];
  const visited = new Set([`${start.y},${start.x}`]);
  let goalReached = false;
  const doorsReached = new Set();

  while (q.length > 0) {
    const curr = q.shift();
    if (curr.r === goal.y && curr.c === goal.x) goalReached = true;
    for (const d of [{dr:-1,dc:0}, {dr:1,dc:0}, {dr:0,dc:-1}, {dr:0,dc:1}]) {
      const nr = curr.r + d.dr, nc = curr.c + d.dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] !== 1) {
        const k = `${nr},${nc}`;
        if (!visited.has(k)) {
          visited.add(k);
          if (grid[nr][nc] === 2) doorsReached.add(k);
          q.push({ r: nr, c: nc });
        }
      }
    }
  }

  if (!goalReached || doorsReached.size < 2) {
    console.error(`❌ ${name}: goalReached=${goalReached}, doorsReached=${doorsReached.size}/${doorCells.length}`);
    failed++;
  } else {
    console.log(`✅ ${name}: ${doorCells.length} doors reachable, goal reached!`);
  }
});

console.log(`\nResult: ${mazes.length - failed} of ${mazes.length} passed.`);
if (failed > 0) process.exit(1);
