// scratch/design_all_grids.js
// Verification of final challenge mazes for grades 1 to 5

function solve(g) {
  const { grid, start, goal } = g;
  const rows = grid.length, cols = grid[0].length;
  const sR = start.y, sC = start.x, sDir = start.dir;
  const gR = goal.y, gC = goal.x;
  const naturalPaths = [];

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
        if (grid[nb.r][nb.c] !== 1 && !pathCells.some(cell => cell.r === nb.r && cell.c === nb.c)) {
          dfs(nb.r, nb.c, [...pathCells, { r: nb.r, c: nb.c, dir: nb.dir }]);
        }
      }
    }
  }

  dfs(sR, sC, [{ r: sR, c: sC, dir: sDir }]);

  return naturalPaths.map((cellPath, idx) => {
    let curDir = sDir;
    const instructions = [];
    let movements = 0, turns = 0;
    for (let i = 1; i < cellPath.length; i++) {
      const targetDir = cellPath[i].dir;
      const diff = (targetDir - curDir + 4) % 4;
      if (diff === 1) { instructions.push('turnRight'); turns++; curDir = targetDir; }
      else if (diff === 2) { instructions.push('turnRight'); instructions.push('turnRight'); turns += 2; curDir = targetDir; }
      else if (diff === 3) { instructions.push('turnLeft'); turns++; curDir = targetDir; }
      instructions.push('forward');
      movements++;
    }
    return {
      pathIndex: idx + 1,
      movements,
      turns,
      totalInstructions: instructions.length,
      instructions
    };
  });
}

// 1.er Grado: 2 caminos (A: 9 instrucciones, B: 12 instrucciones)
const g1 = {
  name: '1.er Grado',
  cols: 8, rows: 6,
  start: { x: 1, y: 1, dir: 1 },
  goal: { x: 6, y: 4 },
  doors: [{ x: 3, y: 1 }, { x: 6, y: 3 }],
  grid: [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 2, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 2, 1],
    [1, 1, 1, 1, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

// 2.º Grado: 2 caminos (A: 11 instrucciones, B: 14 instrucciones)
const g2 = {
  name: '2.º Grado',
  cols: 9, rows: 7,
  start: { x: 1, y: 1, dir: 1 },
  goal: { x: 7, y: 5 },
  doors: [{ x: 4, y: 1 }, { x: 7, y: 4 }],
  grid: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 2, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 2, 1],
    [1, 1, 1, 1, 1, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

// 3.er Grado: 2 caminos (A: 13 instrucciones, B: 17 instrucciones)
const g3 = {
  name: '3.er Grado',
  cols: 10, rows: 8,
  start: { x: 1, y: 1, dir: 1 },
  goal: { x: 8, y: 6 },
  doors: [{ x: 4, y: 1 }, { x: 8, y: 4 }],
  grid: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 2, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 2, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

// 4.º Grado: 3 caminos (A: 14 instrucciones, B: 18 instrucciones, C: 22 instrucciones)
const g4 = {
  name: '4.º Grado',
  cols: 11, rows: 8,
  start: { x: 1, y: 1, dir: 1 },
  goal: { x: 9, y: 6 },
  doors: [{ x: 5, y: 1 }, { x: 9, y: 4 }],
  grid: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1], // Path A: North direct
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // Path B: Central avenue
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // Path C: Lower avenue
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

// 5.º Grado: 3 caminos (A: 16 instrucciones, B: 20 instrucciones, C: 24 instrucciones)
const g5 = {
  name: '5.º Grado',
  cols: 12, rows: 9,
  start: { x: 1, y: 1, dir: 1 },
  goal: { x: 10, y: 7 },
  doors: [{ x: 6, y: 1 }, { x: 10, y: 5 }],
  grid: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1], // Path A: North gallery
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // Path B: Mid corridor
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1], // Path C: Lower crypts
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

[g1, g2, g3, g4, g5].forEach(g => {
  console.log(`\n=== ${g.name} ===`);
  const paths = solve(g);
  paths.forEach(p => {
    console.log(`Path ${p.pathIndex}: Total=${p.totalInstructions} (Avanzar=${p.movements}, Giros=${p.turns})`);
  });
});
