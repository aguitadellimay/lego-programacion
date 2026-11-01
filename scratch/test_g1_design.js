const { findCorridorRoutes } = require('./maze_route_finder.js');

// Grade 1 grid exploration
// Cols: 8, Rows: 6
// Start: (1, 1), dir: 1 (facing East)
// Goal: (6, 4) or similar

function testG1() {
  // Let's create 3 routes to (6, 3):
  // Route 1 (Direct Shortcut):
  // Start (1, 1) -> East to (3, 1) -> South to (3, 3) -> East to (6, 3)
  // Or:
  // Let's see:
  // (1, 1) to (4, 1): 3 F
  // (4, 1) to (4, 3): R, 2 F
  // (4, 3) to (5, 3): L, 1 F [Goal at (5, 3)] -> 3 + 1 + 2 + 1 + 1 = 8 instrs.
  // Can we make an even more direct path for Grade 1?
  // What if Goal is at (4, 3)?
  // Direct path: (1,1) -> (4,1) -> R -> (4,3) [Goal]
  // That is: 3 F, 1 R, 2 F = 6 instructions! (5 moves, 1 turn)
  // Let's check:
  // (1,1) -> (2,1) -> (3,1) -> (4,1): 3 moves
  // Turn R: 1 turn
  // (4,1) -> (4,2) -> (4,3): 2 moves
  // Total: 3 + 1 + 2 = 6 instructions! That's a perfect 6-instruction optimal path!
  
  // Now, what about Alternative 1?
  // Instead of turning at (4,1), Bity turns South at (1,1) -> (1,2) -> (1,3):
  // R, 2 F, L, 3 F = 1 turn + 2 moves + 1 turn + 3 moves = 7 instrs?
  // Wait, if Alternative 1 goes:
  // R, 3 F (to 1,4), L, 3 F (to 4,4), L, 1 F (to 4,3)
  // Moves: 3 + 3 + 1 = 7 moves. Turns: R, L, L = 3 turns. Total = 10 instructions!
  // And Alternative 2?
  // Bity goes East past (4,1) to (6,1) -> 5 moves
  // Turn R, move South to (6,4) -> 1 turn, 3 moves
  // Turn R, move West to (4,4) -> 1 turn, 2 moves
  // Turn R, move North to (4,3) -> 1 turn, 1 move
  // Total moves: 5 + 3 + 2 + 1 = 11 moves. Turns: 4 turns. Total = 15 instructions!
  // Wow! Look at those numbers:
  // Path 1 (Óptimo): 6 instrucciones (5 movimientos, 1 giro)
  // Path 2 (Alternativa 1): 10 instrucciones (7 movimientos, 3 giros)
  // Path 3 (Alternativa 2): 15 instrucciones (11 movimientos, 4 giros)
  // Let's test this grid!
  
  const grid = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 2, 0, 0, 1], // y=1: (1,1) start; (4,1) has door 1; (6,1)
    [1, 0, 1, 1, 0, 1, 0, 1], // y=2:
    [1, 0, 1, 1, 3, 1, 2, 1], // y=3: (4,3) GOAL; (6,3) has door 2
    [1, 0, 0, 0, 0, 0, 0, 1], // y=4: bottom corridor connecting (1,4) to (6,4)
    [1, 1, 1, 1, 1, 1, 1, 1]
  ];
  
  const start = { x: 1, y: 1, dir: 1 };
  const goal = { x: 4, y: 3 };
  
  const routes = findCorridorRoutes(grid, start, goal);
  console.log(`G1 Routes found: ${routes.length}`);
  routes.forEach((r, idx) => {
    console.log(`  Route ${idx+1}: ${r.total} instrs (${r.moves} moves, ${r.turns} turns) -> ${r.actions}`);
  });
}

testG1();
