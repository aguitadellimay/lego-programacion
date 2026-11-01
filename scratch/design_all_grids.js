const { findCorridorRoutes } = require('./maze_route_finder.js');

// Studio to engineer all 5 final challenge labyrinths
// Requirements:
// 1. Clearly distinct instruction counts (moves + turns)
// 2. Each maze has at least 2 door cells (value 2)
// 3. Grid coordinates and start/goal are valid
// 4. At least 3 clean self-avoiding routes from start to goal

// ====================================================================
// GRADE 1 CANDIDATE
// Cols: 8, Rows: 6
// ====================================================================
const g1_grid = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 2, 0, 0, 1], // Start at (1,1), dir 1 (East). Door at (4,1)
  [1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 3, 1, 0, 1], // Goal at (4,3)
  [1, 0, 0, 2, 0, 0, 0, 1], // Door at (3,4)
  [1, 1, 1, 1, 1, 1, 1, 1]
];
const g1_start = { x: 1, y: 1, dir: 1 };
const g1_goal = { x: 4, y: 3 };
const g1_doors = [{ x: 4, y: 1 }, { x: 3, y: 4 }];

// ====================================================================
// GRADE 2 CANDIDATE
// Cols: 9, Rows: 7
// Start: (1, 1), dir 1 (East)
// Goal: (5, 4)
// Let's create:
// Route 1 (Direct Shortcut): (1,1)->(5,1) [Door at 4,1], turn R, move to (5,4) -> 4 moves + 1 turn + 3 moves = 8 instrs
// Route 2 (Middle Via): (1,1) turn R to (1,3), turn L to (3,3), turn R to (3,4), turn L to (5,4)
// Route 3 (Outer Loop): Down to row 5, around through (7,5), up to (7,4), etc.
// ====================================================================
const g2_grid = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 2, 0, 1, 1, 1], // (1,1) Start, (4,1) Door 1, (5,1) corner
  [1, 0, 1, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 1], // Middle path branches at (4,3) or goes around
  [1, 1, 1, 1, 3, 1, 0, 1, 1], // Goal at (4,4)
  [1, 0, 0, 2, 0, 0, 0, 1, 1], // (3,5) Door 2; bottom corridor
  [1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Let's test and tune with a loop in node
console.log('--- Testing Grade 1 ---');
const r1 = findCorridorRoutes(g1_grid, g1_start, g1_goal);
r1.slice(0, 5).forEach((r, i) => console.log(`  G1 R${i+1}: ${r.total} instrs (${r.moves} mov, ${r.turns} turn) -> ${r.actions}`));

