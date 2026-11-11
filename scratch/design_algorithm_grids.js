// Design and solve all algorithm grids for grades 1 to 5
const ALGORITHM_MAZES = {
  1: {
    // Grade 1 (younger students: compact grids, clear paths)
    d1_mecanico: {
      cols: 5, rows: 4,
      start: { x: 1, y: 1 },
      goal: { x: 3, y: 2 },
      grid: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1]
      ]
      // Path: (1,1) -> (2,1)[right] -> (2,2)[down] -> (3,2)[right] = 3 steps (RIGHT, DOWN, RIGHT)
    },
    d2_caminos: {
      cols: 5, rows: 4,
      start: { x: 1, y: 1 },
      goal: { x: 3, y: 2 },
      grid: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1]
      ]
      // Path 1 (top-right): (1,1) -> (2,1) -> (3,1) -> (3,2) = 3 steps (RIGHT, RIGHT, DOWN)
      // Path 2 (down-right): (1,1) -> (1,2) -> (1,1 invalid) wait: (1,1)->(1,2)->... no (2,2) is 1. (1,2) goes right? (2,2) is wall.
    },
    d3_optimizacion: {
      cols: 5, rows: 4,
      start: { x: 1, y: 1 },
      goal: { x: 3, y: 1 },
      grid: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
      ]
      // Short: RIGHT, RIGHT (2 steps)
      // Long: DOWN, RIGHT, RIGHT, UP (4 steps)
    },
    d4_laberinto: {
      cols: 5, rows: 5,
      start: { x: 1, y: 1 },
      goal: { x: 3, y: 3 },
      grid: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 1, 0, 0, 1],
        [1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1]
      ]
    }
  }
};

function bfs(grid, cols, rows, start, goal) {
  const queue = [{ x: start.x, y: start.y, path: [], dist: 0 }];
  const visited = new Set([`${start.x},${start.y}`]);
  const paths = [];

  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur.x === goal.x && cur.y === goal.y) {
      paths.push(cur);
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
        const key = `${nx},${ny}`;
        if (!cur.path.some(p => p.x === nx && p.y === ny) && cur.path.length < 20) {
          queue.push({
            x: nx, y: ny,
            path: [...cur.path, { dir: d.name, x: nx, y: ny }],
            dist: cur.dist + 1
          });
        }
      }
    }
  }
  return paths;
}

const p = bfs(ALGORITHM_MAZES[1].d1_mecanico.grid, 5, 4, { x: 1, y: 1 }, { x: 3, y: 2 });
console.log('d1_mecanico paths found:', p.length, 'Shortest:', p[0]?.dist);
