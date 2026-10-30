// scratch/tune_clean_routes3.js
const g5 = {
  name: '5.º Grado (3 rutas exactas)',
  cols: 12, rows: 9,
  start: { x: 1, y: 1, dir: 1 },
  goal: { x: 10, y: 7 },
  doors: [{ x: 6, y: 1 }, { x: 10, y: 5 }],
  grid: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1], // Row 1 (Ruta A)
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], // Row 2
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], // Row 3 (Ruta B)
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1], // Row 4
    [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 2, 1], // Row 5 (Ruta B & C junction into Door 2)
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1], // Row 6 (Ruta C)
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1], // Row 7 (Goal at (10, 7))
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

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

console.log('--- G5 ---');
solve(g5).forEach(p => console.log(`Ruta ${p.pathIndex}: Total=${p.totalInstructions} (Avanzar=${p.movements}, Giros=${p.turns})`));
