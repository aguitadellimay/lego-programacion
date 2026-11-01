const { findCorridorRoutes } = require('./maze_route_finder.js');
const b = require('../js/bityBlockly.js');
const gData = global.BITYBLOCKLY_GRADES_DATA;

for (let g = 1; g <= 5; g++) {
  const m = gData[g].missions[gData[g].missions.length - 1];
  const routes = findCorridorRoutes(m.grid, m.start, m.goal);
  console.log('=== GRADE ' + g + ': ' + routes.length + ' distinct corridor routes ===');
  routes.forEach((r, idx) => {
    console.log('  Route ' + (idx + 1) + ': ' + r.total + ' instrs (' + r.moves + ' moves, ' + r.turns + ' turns) -> ' + r.actions);
  });
}
