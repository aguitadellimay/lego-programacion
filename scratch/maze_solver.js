// Tool to analyze paths in a grid
// Grid values: 0=open, 1=wall, 2=door, 3=goal

function solveMaze(grid, start, goal) {
  // start: { x, y, dir } (dir: 0=N, 1=E, 2=S, 3=W)
  const rows = grid.length;
  const cols = grid[0].length;
  const deltas = [
    { dx: 0, dy: -1 }, // 0: N
    { dx: 1, dy: 0 },  // 1: E
    { dx: 0, dy: 1 },  // 2: S
    { dx: -1, dy: 0 }  // 3: W
  ];

  // We want to find simple paths from start to goal (without cycles)
  const paths = [];

  function dfs(x, y, dir, visited, actions) {
    if (x === goal.x && y === goal.y) {
      const moves = actions.filter(a => a === 'F').length;
      const turns = actions.filter(a => a === 'L' || a === 'R').length;
      paths.push({
        actions: actions.join(''),
        moves,
        turns,
        totalInstructions: moves + turns,
        routeLength: actions.length
      });
      return;
    }

    if (actions.length > 35) return; // limit search depth

    // Try Forward
    const d = deltas[dir];
    const nx = x + d.dx;
    const ny = y + d.dy;
    if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
      const cell = grid[ny][nx];
      if ((cell === 0 || cell === 2 || cell === 3) && !visited.has(`${nx},${ny}`)) {
        visited.add(`${nx},${ny}`);
        dfs(nx, ny, dir, visited, [...actions, 'F']);
        visited.delete(`${nx},${ny}`);
      }
    }

    // Try Turn Left
    // Avoid turning back-and-forth
    const lastAction = actions[actions.length - 1];
    if (lastAction !== 'R') {
      dfs(x, y, (dir + 3) % 4, visited, [...actions, 'L']);
    }

    // Try Turn Right
    if (lastAction !== 'L') {
      dfs(x, y, (dir + 1) % 4, visited, [...actions, 'R']);
    }
  }

  const visited = new Set();
  visited.add(`${start.x},${start.y}`);
  dfs(start.x, start.y, start.dir, visited, []);

  // Sort paths by totalInstructions
  paths.sort((a, b) => a.totalInstructions - b.totalInstructions);
  return paths;
}

module.exports = { solveMaze };
