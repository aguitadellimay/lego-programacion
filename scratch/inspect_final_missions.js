const fs = require('fs');
const content = fs.readFileSync('js/bityBlockly.js', 'utf8');

const vm = require('vm');
const sandbox = {
  window: {},
  document: {
    getElementById: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {}
  },
  localStorage: { getItem: () => null, setItem: () => {} },
  setTimeout: () => {},
  clearTimeout: () => {}
};
sandbox.window = sandbox;
vm.createContext(sandbox);

try {
  vm.runInContext(content, sandbox);
  const DATA = sandbox.BITYBLOCKLY_GRADES_DATA || sandbox.window.BITYBLOCKLY_GRADES_DATA;
  for (let g = 1; g <= 5; g++) {
    const gradeData = DATA[g];
    const missions = gradeData.missions;
    const lastMission = missions[missions.length - 1];
    console.log('=== Grade ' + g + ' Last Mission: ' + lastMission.name + ' ===');
    console.log('Grid cols=' + lastMission.cols + ', rows=' + lastMission.rows);
    console.log('Start:', lastMission.start, 'Goal:', lastMission.goal);
    if (lastMission.routes) {
      console.log('Routes count:', lastMission.routes.length);
      lastMission.routes.forEach(r => console.log(' - ' + r.name + ' (' + r.instructions + ' instr): ' + (r.pathStr || r.desc || '')));
    }
    if (lastMission.hints) {
      console.log('Hints:', lastMission.hints);
    }
  }
} catch (e) {
  console.error('Error:', e.stack);
}
