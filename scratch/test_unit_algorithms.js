const fs = require('fs');

// Test the logic directly in node first
const algCode = fs.readFileSync('js/algorithmsModule.js', 'utf8');

// Mock window and document
const window = {
  scrollTo: () => {},
  addEventListener: () => {},
  algorithmsModule: null
};
const localStorage = {
  data: {},
  getItem: (k) => localStorage.data[k] || null,
  setItem: (k, v) => { localStorage.data[k] = v; },
  clear: () => { localStorage.data = {}; }
};
const document = {
  getElementById: (id) => ({ innerHTML: '', querySelector: () => null }),
  body: { innerHTML: '' },
  addEventListener: () => {}
};

eval(algCode);

console.log('algorithmsModule loaded:', !!window.algorithmsModule);
window.algorithmsModule.startClass(1, 1);

// Test Step 2
window.algorithmsModule.selectStep(2);
console.log('Step 2 active everyday act:', window.algorithmsModule.selectedEverydayAct);
console.log('Targets for cafe g1:', window.algorithmsModule.everydayState.cafe);

// Click blocks
window.algorithmsModule.handleBlockClick('cafe', 'taza');
window.algorithmsModule.handleBlockClick('cafe', 'cafe');
window.algorithmsModule.handleBlockClick('cafe', 'agua');
window.algorithmsModule.handleBlockClick('cafe', 'mezclar');
console.log('Placed:', window.algorithmsModule.everydayState.cafe.placed);

window.algorithmsModule.checkEverydayAct('cafe');
console.log('Cafe completed:', window.algorithmsModule.everydayState.cafe.completed);
console.log('Error msg:', window.algorithmsModule.everydayState.cafe.errorMsg);

// Test Step 6
window.algorithmsModule.selectStep(6);
window.algorithmsModule.clearProgram();
console.log('Step 6 cleared program len:', window.algorithmsModule.program.length);
// Optimal: right, right, right
window.algorithmsModule.addDirectionToProgram('right');
window.algorithmsModule.addDirectionToProgram('right');
window.algorithmsModule.addDirectionToProgram('right');
for (let d of window.algorithmsModule.program) {
  window.algorithmsModule.executeSingleMove(d);
}
console.log('Step 6 optimal result:', window.algorithmsModule.mazeResult);

// Alternative: down, down, right, right, right, up, up
window.algorithmsModule.clearProgram();
window.algorithmsModule.addDirectionToProgram('down');
window.algorithmsModule.addDirectionToProgram('down');
window.algorithmsModule.addDirectionToProgram('right');
window.algorithmsModule.addDirectionToProgram('right');
window.algorithmsModule.addDirectionToProgram('right');
window.algorithmsModule.addDirectionToProgram('up');
window.algorithmsModule.addDirectionToProgram('up');
console.log('Step 6 alternative instructions count:', window.algorithmsModule.program.length);
for (let d of window.algorithmsModule.program) {
  window.algorithmsModule.executeSingleMove(d);
}
console.log('Step 6 alternative result:', window.algorithmsModule.mazeResult);
console.log('Final bity pos:', window.algorithmsModule.bityPos);

// Test Step 7
window.algorithmsModule.selectStep(7);
window.algorithmsModule.clearProgram();
// Grade 1 d4: start (1,1), goal (4,3).
// Grid:
// [1, 1, 1, 1, 1, 1],
// [1, 0, 0, 1, 1, 1],
// [1, 1, 0, 0, 1, 1],
// [1, 1, 1, 0, 0, 1],
// [1, 1, 1, 1, 1, 1]
// Path: right (to 2,1), down (to 2,2), right (to 3,2), down (to 3,3), right (to 4,3)
window.algorithmsModule.addDirectionToProgram('right');
window.algorithmsModule.addDirectionToProgram('down');
window.algorithmsModule.addDirectionToProgram('right');
window.algorithmsModule.addDirectionToProgram('down');
window.algorithmsModule.addDirectionToProgram('right');
for (let d of window.algorithmsModule.program) {
  window.algorithmsModule.executeSingleMove(d);
}
console.log('Step 7 result:', window.algorithmsModule.mazeResult);
console.log('Step 7 final bity pos:', window.algorithmsModule.bityPos);
