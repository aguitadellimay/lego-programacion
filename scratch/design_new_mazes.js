const { findCorridorRoutes } = require('./maze_route_finder.js');

// We test candidate grids
function testCandidate(name, grid, start, goal, doors) {
  console.log(`\n========================================`);
  console.log(`TESTING: ${name}`);
  console.log(`Rows: ${grid.length}, Cols: ${grid[0].length}`);
  console.log(`Start: (${start.x}, ${start.y}, dir: ${start.dir}), Goal: (${goal.x}, ${goal.y})`);
  console.log(`Doors:`, doors);

  const routes = findCorridorRoutes(grid, start, goal);
  console.log(`Total valid corridor routes: ${routes.length}`);

  routes.forEach((r, idx) => {
    console.log(`Route ${idx + 1}: ${r.total} instrs (${r.moves} moves, ${r.turns} turns) -> ${r.actions}`);
  });

  return routes;
}

// ---------------------------------------------------------------------
// GRADE 1 CANDIDATE:
// We want:
// - Optimal path: ~6 instructions (e.g. 5 moves, 1 turn)
// - Alt 1: ~9 instructions (e.g. 7 moves, 2 turns)
// - Alt 2: ~12-13 instructions (e.g. 9-10 moves, 3-4 turns)
//
// Let's create an 7x8 or 6x8 grid where:
// Start is at (1, 1), dir 1 (East)
// Direct shortcut: Go East then South to Goal, or similar.
// But wait! If Bity starts at (1, 1) facing East:
// Direct path (shortcut):
// (1, 1) -> (2, 1) -> (3, 1) -> Turn S -> (3, 2) -> (3, 3) [Goal] -> that's 2 F, 1 R, 2 F = 5 instrs!
// Or:
// Let's test a concrete grid layout for Grade 1.
// ---------------------------------------------------------------------

const g1_grid = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 1], // y=1: Start at (1,1) facing East. Can go East to (3,1), or South to (1,2)
  [1, 0, 1, 2, 1, 2, 0, 1], // y=2: (3,2) has Door 1! (6,2) has Door 2!
  [1, 0, 1, 0, 0, 0, 0, 1], // y=3: (3,3) is shortcut path to Goal!
  [1, 0, 1, 1, 1, 1, 0, 1], // y=4:
  [1, 0, 0, 0, 0, 0, 3, 1], // y=5: Goal at (6,5) or similar?
  [1, 1, 1, 1, 1, 1, 1, 1]
];

// Let's test this in a flexible generator script
module.exports = { testCandidate };
