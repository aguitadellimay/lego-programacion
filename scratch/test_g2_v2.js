const { findCorridorRoutes } = require('./maze_route_finder.js');

function testG2_v2() {
  // If we open a middle passage:
  // e.g. at y=3, (3,3) -> (4,3) -> (5,3) -> (6,3) -> (6,4) Goal!
  // Route from start (1,1) South to (1,3): R, 2 F.
  // East across y=3: L, 5 F to (6,3).
  // South to (6,4): R, 1 F.
  // Total: 2 F + 5 F + 1 F = 8 moves. Turns: R, L, R = 3 turns.
  // Total = 8 + 3 = 11 or 12 instructions!
  // And the bottom path through y=5 would be:
  // R, 4 F to (1,5), L, 5 F to (6,5), L, 1 F to (6,4) -> 10 moves + 3 turns = 13? Or with an S-curve: 15-16!
  
  const grid = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 2, 0, 0, 1, 1], // y=1: (1,1) Start; (4,1) Door 1; (6,1)
    [1, 0, 1, 1, 1, 1, 0, 1, 1], // y=2:
    [1, 0, 0, 0, 0, 0, 0, 1, 1], // y=3: Middle corridor across row 3
    [1, 1, 1, 0, 1, 1, 3, 1, 1], // y=4: Goal at (6,4); (3,4) connects down
    [1, 0, 0, 2, 0, 0, 0, 1, 1], // y=5: Door 2 at (3,5)
    [1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];
  
  // Wait, if (6,3) connects directly to (6,1), (6,4), then Route 1 is:
  // (1,1) -> (6,1) -> (6,4) which is 5 moves + 1 turn + 3 moves = 9 instrs.
  // Can Route 1 be even shorter, e.g. 8 instrs?
  // If (1,1) to (5,1) is 4 moves + 1 turn + 3 moves = 8 instrs!
  // Let's test the grid with findCorridorRoutes.
  const start = { x: 1, y: 1, dir: 1 };
  const goal = { x: 6, y: 4 };

  const routes = findCorridorRoutes(grid, start, goal);
  console.log(`G2 v2 Routes: ${routes.length}`);
  routes.forEach((r, idx) => {
    console.log(`  Route ${idx+1}: ${r.total} instrs (${r.moves} moves, ${r.turns} turns) -> ${r.actions}`);
  });
}

testG2_v2();
