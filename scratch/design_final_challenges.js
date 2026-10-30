// scratch/design_final_challenges.js
// Geometry and natural paths analysis for final challenge mazes

function getGeometricPaths(config) {
  const { grid, start, goal, doors = [] } = config;
  const rows = grid.length;
  const cols = grid[0].length;
  const sR = start.y, sC = start.x, sDir = start.dir;
  const gR = goal.y, gC = goal.x;

  const delta = [
    { dr: -1, dc: 0, dir: 0 }, // 0: N
    { dr: 0, dc: 1, dir: 1 },  // 1: E
    { dr: 1, dc: 0, dir: 2 },  // 2: S
    { dr: 0, dc: -1, dir: 3 }  // 3: W
  ];

  const naturalPaths = [];

  // DFS on cell coordinates (simple path of cells without revisiting)
  function dfs(r, c, pathCells) {
    if (r === gR && c === gC) {
      naturalPaths.push([...pathCells]);
      return;
    }

    const neighbors = [
      { r: r - 1, c: c, dir: 0 },
      { r: r, c: c + 1, dir: 1 },
      { r: r + 1, c: c, dir: 2 },
      { r: r, c: c - 1, dir: 3 }
    ];

    for (const nb of neighbors) {
      if (nb.r >= 0 && nb.r < rows && nb.c >= 0 && nb.c < cols) {
        if (grid[nb.r][nb.c] !== 1) { // walkable
          if (!pathCells.some(cell => cell.r === nb.r && cell.c === nb.c)) {
            dfs(nb.r, nb.c, [...pathCells, { r: nb.r, c: nb.c, dir: nb.dir }]);
          }
        }
      }
    }
  }

  dfs(sR, sC, [{ r: sR, c: sC, dir: sDir }]);

  // Now compute exact block sequence (instructions) for each cell path
  const results = naturalPaths.map((cellPath, idx) => {
    let curDir = sDir;
    const instructions = [];
    let movements = 0;
    let turns = 0;

    for (let i = 1; i < cellPath.length; i++) {
      const targetDir = cellPath[i].dir;
      // calculate turns needed to face targetDir
      const diff = (targetDir - curDir + 4) % 4;
      if (diff === 1) {
        instructions.push('turnRight');
        turns++;
        curDir = targetDir;
      } else if (diff === 2) {
        instructions.push('turnRight');
        instructions.push('turnRight');
        turns += 2;
        curDir = targetDir;
      } else if (diff === 3) {
        instructions.push('turnLeft');
        turns++;
        curDir = targetDir;
      }
      instructions.push('forward');
      movements++;
    }

    return {
      pathIndex: idx + 1,
      cellCount: cellPath.length,
      movements,
      turns,
      totalInstructions: instructions.length,
      instructions,
      cellPath
    };
  });

  return results;
}

// -------------------------------------------------------------
// GRADE 1 FINAL CHALLENGE
// -------------------------------------------------------------
const g1Final = {
  name: '1.er Grado: Desafío de Instrucciones',
  cols: 8,
  rows: 6,
  start: { x: 1, y: 1, dir: 1 }, // East
  goal: { x: 6, y: 4 },
  doors: [{ x: 3, y: 1 }, { x: 6, y: 3 }],
  grid: [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 2, 0, 0, 0, 1], // Path A: straight East along row 1, then South along col 6
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 2, 1], // Path B: South along col 1, then East along row 3, then South along col 6
    [1, 1, 1, 1, 0, 0, 3, 1], // Goal at (6, 4)
    [1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

// -------------------------------------------------------------
// GRADE 2 FINAL CHALLENGE
// -------------------------------------------------------------
const g2Final = {
  name: '2.º Grado: Desafío de Instrucciones',
  cols: 9,
  rows: 7,
  start: { x: 1, y: 1, dir: 1 }, // East
  goal: { x: 7, y: 5 },
  doors: [{ x: 4, y: 1 }, { x: 7, y: 4 }],
  grid: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 2, 0, 0, 0, 1], // Path A: North rim
    [1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1], // Path B: Middle avenue
    [1, 1, 1, 1, 1, 0, 1, 2, 1],
    [1, 1, 1, 1, 1, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

// -------------------------------------------------------------
// GRADE 3 FINAL CHALLENGE
// -------------------------------------------------------------
const g3Final = {
  name: '3.er Grado: Desafío de Instrucciones',
  cols: 10,
  rows: 8,
  start: { x: 1, y: 1, dir: 1 }, // East
  goal: { x: 8, y: 6 },
  doors: [{ x: 4, y: 1 }, { x: 8, y: 4 }],
  grid: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 2, 0, 0, 0, 0, 1], // Path A: North rim
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1], // Path B: Middle corridor
    [1, 1, 1, 1, 0, 1, 0, 1, 2, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1], // Path C: Lower winding
    [1, 0, 1, 1, 1, 1, 1, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

// -------------------------------------------------------------
// GRADE 4 FINAL CHALLENGE
// -------------------------------------------------------------
const g4Final = {
  name: '4.º Grado: Desafío de Instrucciones',
  cols: 11,
  rows: 8,
  start: { x: 1, y: 1, dir: 1 }, // East
  goal: { x: 9, y: 6 },
  doors: [{ x: 5, y: 1 }, { x: 9, y: 4 }],
  grid: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1], // Path A: High gallery
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], // Path B: Central avenue
    [1, 1, 1, 1, 0, 1, 1, 0, 1, 2, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], // Path C: Crypts
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

// -------------------------------------------------------------
// GRADE 5 FINAL CHALLENGE
// -------------------------------------------------------------
const g5Final = {
  name: '5.º Grado: Desafío de Instrucciones',
  cols: 12,
  rows: 9,
  start: { x: 1, y: 1, dir: 1 }, // East
  goal: { x: 10, y: 7 },
  doors: [{ x: 6, y: 1 }, { x: 10, y: 5 }],
  grid: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1], // Path A: Direct High Route
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], // Path B: Intermediate Hall
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 1], // Path C: Lower Winding Route
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

[g1Final, g2Final, g3Final, g4Final, g5Final].forEach(g => {
  console.log(`\n========================================`);
  console.log(`ANÁLISIS GEOMÉTRICO: ${g.name}`);
  console.log(`========================================`);
  const paths = getGeometricPaths(g);
  console.log(`Caminos geométricos independientes: ${paths.length}`);
  paths.forEach((p, idx) => {
    console.log(`  Camino ${String.fromCharCode(65 + idx)}:`);
    console.log(`    - Total de Instrucciones: ${p.totalInstructions}`);
    console.log(`    - Movimientos (Avanzar): ${p.movements}`);
    console.log(`    - Giros (Izquierda/Derecha): ${p.turns}`);
    console.log(`    - Secuencia: ${p.instructions.join(', ')}`);
  });
});
