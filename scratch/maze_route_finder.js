// Self-avoiding corridor path finder
// Finds all routes where Bity walks from start to goal without visiting any cell twice,
// and only turns at junctions/corners to face the next step.

const deltas = [
  { dx: 0, dy: -1 }, // 0: N
  { dx: 1, dy: 0 },  // 1: E
  { dx: 0, dy: 1 },  // 2: S
  { dx: -1, dy: 0 }  // 3: W
];

function findCorridorRoutes(grid, start, goal) {
  const rows = grid.length;
  const cols = grid[0].length;
  const routes = [];

  function dfs(x, y, curDir, visited, pathCells, actionList) {
    if (x === goal.x && y === goal.y) {
      const moves = actionList.filter(a => a === 'F').length;
      const turns = actionList.filter(a => a === 'L' || a === 'R').length;
      routes.push({
        pathCells: [...pathCells],
        actions: actionList.join(''),
        moves,
        turns,
        total: moves + turns
      });
      return;
    }

    // Try moving in 4 directions
    for (let targetDir = 0; targetDir < 4; targetDir++) {
      const d = deltas[targetDir];
      const nx = x + d.dx;
      const ny = y + d.dy;

      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
        const cell = grid[ny][nx];
        const key = `${nx},${ny}`;
        if ((cell === 0 || cell === 2 || cell === 3) && !visited.has(key)) {
          // Calculate turn actions needed from curDir to targetDir
          const turnDiff = (targetDir - curDir + 4) % 4;
          let turnActions = [];
          if (turnDiff === 1) turnActions = ['R'];
          else if (turnDiff === 2) turnActions = ['R', 'R']; // or L, L
          else if (turnDiff === 3) turnActions = ['L'];

          visited.add(key);
          pathCells.push({ x: nx, y: ny });

          dfs(nx, ny, targetDir, visited, pathCells, [...actionList, ...turnActions, 'F']);

          pathCells.pop();
          visited.delete(key);
        }
      }
    }
  }

  const visited = new Set();
  visited.add(`${start.x},${start.y}`);
  dfs(start.x, start.y, start.dir, visited, [{ x: start.x, y: start.y }], []);

  // Sort by total instructions
  routes.sort((a, b) => a.total - b.total);
  return routes;
}

module.exports = { findCorridorRoutes };
