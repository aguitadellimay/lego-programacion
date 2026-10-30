/**
 * Diseño y verificación matemática de los 5 nuevos laberintos de Halloween
 * 4.º Grado: Laberinto 2 y Laberinto 3
 * 5.º Grado: Laberinto 1, Laberinto 2 y Laberinto 3
 */

function findPaths(grid, start, goal) {
  const rows = grid.length;
  const cols = grid[0].length;
  const allPaths = [];

  function dfs(x, y, visited, path) {
    if (x === goal.x && y === goal.y) {
      allPaths.push([...path]);
      return;
    }

    const dirs = [
      { dx: 0, dy: -1 }, // N
      { dx: 1, dy: 0 },  // E
      { dx: 0, dy: 1 },  // S
      { dx: -1, dy: 0 }  // W
    ];

    for (const d of dirs) {
      const nx = x + d.dx;
      const ny = y + d.dy;

      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
        if (grid[ny][nx] !== 1 && !visited.has(`${nx},${ny}`)) {
          visited.add(`${nx},${ny}`);
          path.push({ x: nx, y: ny });
          dfs(nx, ny, visited, path);
          path.pop();
          visited.delete(`${nx},${ny}`);
        }
      }
    }
  }

  const visited = new Set();
  visited.add(`${start.x},${start.y}`);
  dfs(start.x, start.y, visited, [{ x: start.x, y: start.y }]);
  return allPaths;
}

function pathToCommands(startDir, path) {
  let currentDir = startDir; // 0: N, 1: E, 2: S, 3: W
  let cx = path[0].x;
  let cy = path[0].y;
  const commands = [];

  for (let i = 1; i < path.length; i++) {
    const next = path[i];
    const dx = next.x - cx;
    const dy = next.y - cy;
    let targetDir = 0;
    if (dx === 1 && dy === 0) targetDir = 1; // E
    else if (dx === -1 && dy === 0) targetDir = 3; // W
    else if (dx === 0 && dy === 1) targetDir = 2; // S
    else if (dx === 0 && dy === -1) targetDir = 0; // N

    const diff = (targetDir - currentDir + 4) % 4;
    if (diff === 1) {
      commands.push('right');
      currentDir = targetDir;
    } else if (diff === 2) {
      commands.push('right', 'right');
      currentDir = targetDir;
    } else if (diff === 3) {
      commands.push('left');
      currentDir = targetDir;
    }

    commands.push('forward');
    cx = next.x;
    cy = next.y;
  }
  return commands;
}

// -------------------------------------------------------------
// MAZE DESIGNS
// -------------------------------------------------------------

// 1. G4-M2: El cementerio de las calabazas (10 x 8)
const g4_m2 = {
  cols: 10,
  rows: 8,
  start: { x: 1, y: 1, dir: 1 },
  door: { x: 8, y: 5 },
  goal: { x: 8, y: 6 },
  grid: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1], // Top path: (1,1) to (7,1)
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 1, 1], // (1,3)->(2,3) dead end; (4,3)->(5,3) dead end
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 2, 1], // Bottom path: (1,5) to (7,5), Door at (8,5)
    [1, 1, 1, 0, 1, 1, 1, 1, 3, 1], // (3,6) dead end; Goal at (8,6)
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

// 2. G4-M3: La puerta del castillo encantado (11 x 8)
const g4_m3 = {
  cols: 11,
  rows: 8,
  start: { x: 1, y: 1, dir: 1 },
  door: { x: 9, y: 4 },
  goal: { x: 9, y: 6 },
  grid: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], // Top rampart: (1,1) to (8,1)
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1], // (1,2) dead end, (5,2) dead end
    [1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1], // Central cross: (3,3)-(6,3)
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 2, 1], // Lower hall: (1,4)-(3,4) & (6,4)-(8,4)-> Door at (9,4)
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1], // (7,5) dead end; (9,5) pass
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1], // Bottom dungeon: connects (1,4)-(1,6) to (7,6)->(7,5); Goal at (9,6)
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

// 3. G5-M1: El castillo de los caminos secretos (11 x 9)
const g5_m1 = {
  cols: 11,
  rows: 9,
  start: { x: 1, y: 1, dir: 1 },
  door: { x: 8, y: 5 },
  goal: { x: 9, y: 7 },
  grid: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], // (1,1) to (7,1); (9,1) dead end
    [1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1], // (3,2)->(4,2) dead end
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1], // (1,3)->(2,3) dead end; (5,3)-(8,3)
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1], // Mid hallway: (1,5)-(6,5), Door at (8,5)
    [1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1], // (3,6) dead end; (8,6)-(9,6)
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 3, 1], // (6,7)-(8,7)->(9,7) Goal
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

// 4. G5-M2: El bosque encantado de las rutas alternativas (12 x 9)
const g5_m2 = {
  cols: 12,
  rows: 9,
  start: { x: 1, y: 1, dir: 1 },
  door: { x: 9, y: 5 },
  goal: { x: 10, y: 7 },
  grid: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], // North trail; (10,1) dead end
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1], // (5,2) dead end
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1], // Central cross; (7,3)->(9,3)
    [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1], // (6,4) dead end
    [1, 1, 1, 0, 0, 0, 0, 0, 1, 2, 1, 1], // River path: (3,5)-(7,5); Door at (9,5)
    [1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1], // (1,6)-(2,6) false path dead end
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 3, 1], // Southern grove to Goal (10,7)
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

// 5. G5-M3: La misión final de Halloween (13 x 9)
const g5_m3 = {
  cols: 13,
  rows: 9,
  start: { x: 1, y: 1, dir: 1 },
  door: { x: 10, y: 5 },
  goal: { x: 11, y: 7 },
  grid: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1], // High battlements
    [1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1], // (3,2)-(4,2) dead end; (8,2) pass; (10,2) pass
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1], // (1,3)->(2,3); (5,3)-(8,3); (10,3)-(11,3) dead end
    [1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1], // (2,4); (5,4); (8,4)-(10,4)
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1], // Grand hall (1,5)-(5,5); Door at (10,5)
    [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1], // (1,6) dead end; (5,6)-(8,6)->(8,7)
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 3, 1], // (3,7) dead end; (8,7)-(10,7)-> Goal at (11,7)
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

const mazes = [
  { name: '4.º Grado - Laberinto 2 (El cementerio de las calabazas)', data: g4_m2 },
  { name: '4.º Grado - Laberinto 3 (La puerta del castillo encantado)', data: g4_m3 },
  { name: '5.º Grado - Laberinto 1 (El castillo de los caminos secretos)', data: g5_m1 },
  { name: '5.º Grado - Laberinto 2 (El bosque encantado de las rutas alternativas)', data: g5_m2 },
  { name: '5.º Grado - Laberinto 3 (La misión final de Halloween)', data: g5_m3 }
];

console.log('====================================================');
console.log('VERIFICACIÓN MATEMÁTICA DE RUTAS EN LOS 5 LABERINTOS');
console.log('====================================================\n');

let allPassed = true;

mazes.forEach((m, idx) => {
  const d = m.data;
  const paths = findPaths(d.grid, d.start, d.goal);

  // Filter paths that go through door
  const pathsThroughDoor = paths.filter(p => p.some(cell => cell.x === d.door.x && cell.y === d.door.y));

  console.log(`[Laberinto ${idx + 1}] ${m.name}`);
  console.log(`  Dimensiones: ${d.cols}x${d.rows}`);
  console.log(`  Inicio: (${d.start.x}, ${d.start.y}), Puerta: (${d.door.x}, ${d.door.y}), Meta: (${d.goal.x}, ${d.goal.y})`);
  console.log(`  Total de rutas válidas simples: ${paths.length}`);
  console.log(`  Rutas válidas que cruzan la puerta: ${pathsThroughDoor.length}`);

  if (pathsThroughDoor.length < 2) {
    console.error(`  ❌ ERROR: Menos de 2 rutas válidas cruzando la puerta!`);
    allPassed = false;
  } else {
    console.log(`  ✅ Cumple: Tiene ${pathsThroughDoor.length} rutas válidas diferentes (mínimo requerido: 2).`);
  }

  // Print top 2 distinct routes
  pathsThroughDoor.slice(0, 2).forEach((p, pIdx) => {
    const cmds = pathToCommands(d.start.dir, p);
    console.log(`    Ruta ${pIdx + 1} (${p.length} celdas, ${cmds.length} instrucciones):`);
    console.log(`      Coordenadas: ${p.map(c => `(${c.x},${c.y})`).join('->')}`);
    console.log(`      Comandos: ${cmds.slice(0, 10).join(', ')}... (+${cmds.length - 10} más)`);
  });
  console.log('');
});

if (allPassed) {
  console.log('🎉 TODOS LOS 5 LABERINTOS TIENEN AL MENOS 2 RUTAS VÁLIDAS Y DIFERENTES.');
} else {
  console.error('❌ AL MENOS UN LABERINTO NO CUMPLE EL CRITERIO.');
  process.exit(1);
}
