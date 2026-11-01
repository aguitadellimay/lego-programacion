const { findCorridorRoutes } = require('./maze_route_finder.js');

// Let's test candidate designs for Grades 2, 3, 4, 5

// ---------------------------------------------------------------------
// GRADE 2:
// Target:
// Camino A (Óptimo): ~8 instrucciones (e.g. 7 moves, 1 turn = 8)
// Camino B (Alt 1): ~12 instrucciones (e.g. 9-10 moves, 2-3 turns = 12)
// Camino C (Alt 2): ~16 instrucciones (e.g. 12-13 moves, 3-4 turns = 16)
//
// Grid size: e.g. 7 rows x 9 cols
// Start: (1, 1), dir: 1 (East)
// Goal: e.g. (6, 4)
//
// Let's design:
// Direct path (Óptimo):
// From (1,1) East to (6,1) -> 5 moves
// Turn South -> 1 turn
// Move South to (6,3) or (6,4) -> 2 or 3 moves
// 5 moves + 1 turn + 2 moves = 8 instructions!
//
// Alternative 1 (Alt 1):
// From (1,1) goes South down to (1,3) -> 1 turn (R), 2 moves
// Goes East to (4,3) -> 1 turn (L), 3 moves
// Goes South to (4,5) -> 1 turn (R), 2 moves
// Goes East to (6,5) -> 1 turn (L), 2 moves
// Goes North to (6,4) -> 1 turn (L), 1 move
// Total: 2+3+2+2+1 = 10 moves, 5 turns = 15 instrs?
// Let's test in code!
// ---------------------------------------------------------------------

function testG2() {
  const grid = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 2, 0, 1, 1], // y=1: (1,1) Start. (5,1) Door 1. (6,1) Corner.
    [1, 0, 1, 1, 1, 1, 0, 1, 1], // y=2:
    [1, 0, 0, 0, 1, 1, 0, 1, 1], // y=3: (1,3)->(3,3) corridor
    [1, 1, 1, 0, 1, 1, 3, 1, 1], // y=4: Goal at (6,4)!
    [1, 0, 0, 2, 0, 0, 0, 1, 1], // y=5: (3,5) Door 2! Bottom corridor (1,5) to (6,5)
    [1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];
  const start = { x: 1, y: 1, dir: 1 };
  const goal = { x: 6, y: 4 };

  const routes = findCorridorRoutes(grid, start, goal);
  console.log(`\n=== GRADE 2 CANDIDATE ===`);
  console.log(`Routes found: ${routes.length}`);
  routes.forEach((r, idx) => {
    console.log(`  Route ${idx+1}: ${r.total} instrs (${r.moves} moves, ${r.turns} turns) -> ${r.actions}`);
  });
}

testG2();
