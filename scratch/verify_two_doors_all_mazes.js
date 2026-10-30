// scratch/verify_two_doors_all_mazes.js
// Verify that for all mazes in all grades, both doors are reachable and the goal is reached after opening doors.

function testMazeTwoDoors(name, grid, start, goal, doors) {
  const rows = grid.length, cols = grid[0].length;
  console.log(`Testing: ${name}`);
  console.log(`  Dimensions: ${cols}x${rows}, Start: (${start.x},${start.y}), Goal: (${goal.x},${goal.y})`);
  console.log(`  Doors declared:`, doors);

  // Find all cell '2' in grid
  const gridDoorCells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) gridDoorCells.push({ x: c, y: r });
    }
  }
  console.log(`  Grid door cells (value 2):`, gridDoorCells);
  if (gridDoorCells.length < 2) {
    console.error(`  ❌ ERROR: Maze has fewer than 2 door cells in grid! Found: ${gridDoorCells.length}`);
    return false;
  }

  // BFS to check reachable cells assuming doors can be opened
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

  console.log(`  Reachable door cells: ${doorsReached.size} of ${gridDoorCells.length}`);
  console.log(`  Goal reached: ${goalReached}`);

  if (goalReached && doorsReached.size >= 2) {
    console.log(`  ✅ PASS: Both doors reachable and goal reachable.\n`);
    return true;
  } else {
    console.error(`  ❌ FAIL: Goal or doors not reachable.\n`);
    return false;
  }
}

// Test G1 Level 1
const g1_1 = {
  grid: [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 2, 0, 1, 1],
    [1, 1, 1, 1, 2, 1, 1],
    [1, 1, 1, 1, 3, 1, 1],
    [1, 1, 1, 1, 1, 1, 1]
  ],
  start: { x: 1, y: 1, dir: 1 },
  goal: { x: 4, y: 3 },
  doors: [{ x: 3, y: 1 }, { x: 4, y: 2 }]
};
testMazeTwoDoors('1.er Grado - Nivel 1', g1_1.grid, g1_1.start, g1_1.goal, g1_1.doors);
