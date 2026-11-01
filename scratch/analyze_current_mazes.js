const { solveMaze } = require('./maze_solver.js');
const b = require('../js/bityBlockly.js');
const gData = global.BITYBLOCKLY_GRADES_DATA;

for (let g = 1; g <= 5; g++) {
  const missions = gData[g].missions;
  const m = missions[missions.length - 1];
  const paths = solveMaze(m.grid, m.start, m.goal);
  console.log(`\n=== GRADE ${g} FINAL CHALLENGE (${paths.length} paths) ===`);
  const seenLengths = new Set();
  const distinct = [];
  for (const p of paths) {
    if (!seenLengths.has(p.totalInstructions)) {
      seenLengths.add(p.totalInstructions);
      distinct.push(p);
    }
  }
  distinct.slice(0, 5).forEach((p, idx) => {
    console.log(`  Path ${idx + 1}: ${p.totalInstructions} instrs (${p.moves} moves, ${p.turns} turns) -> ${p.actions}`);
  });
}
