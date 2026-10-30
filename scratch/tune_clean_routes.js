// scratch/tune_clean_routes.js
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

// 4.º Grado con 3 rutas limpias:
// Ruta A (Norte): 14 instrucciones
// Ruta B (Centro): 18 instrucciones
// Ruta C (Sur): 22 instrucciones
const g4 = {
  name: '4.º Grado (3 rutas exactas)',
  cols: 11, rows: 8,
  start: { x: 1, y: 1, dir: 1 },
  goal: { x: 9, y: 6 },
  doors: [{ x: 5, y: 1 }, { x: 9, y: 4 }],
  grid: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1], // Ruta A (norte)
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], // Ruta B (centro)
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], // Ruta C (sur)
    [1, 0, 1, 1, 1, 0, 0, 0, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

// 5.º Grado con 3 rutas limpias:
// Ruta A (Norte directo): 16 instrucciones
// Ruta B (Centro intermedio): 20 instrucciones
// Ruta C (Sur panorámico): 24 instrucciones
const g5 = {
  name: '5.º Grado (3 rutas exactas)',
  cols: 12, rows: 9,
  start: { x: 1, y: 1, dir: 1 },
  goal: { x: 10, y: 7 },
  doors: [{ x: 6, y: 1 }, { x: 10, y: 5 }],
  grid: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1], // Ruta A
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], // Ruta B
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 2, 1], // Ruta C
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
};

console.log('--- G4 ---');
solve(g4).forEach(p => console.log(`Ruta ${p.pathIndex}: Total=${p.totalInstructions} (Avanzar=${p.movements}, Giros=${p.turns})`));

console.log('--- G5 ---');
solve(g5).forEach(p => console.log(`Ruta ${p.pathIndex}: Total=${p.totalInstructions} (Avanzar=${p.movements}, Giros=${p.turns})`));
