// scratch/inspect_browser_dom.js
const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const bityJs = fs.readFileSync('js/bityBlockly.js', 'utf8');

// Check what tabs were in index.html originally
const tabsMatch = indexHtml.match(/<div id="bityblockly-levels-tabs"[\s\S]*?<\/div>/);
console.log('Static tabs in index.html:\n', tabsMatch ? tabsMatch[0] : 'None');

// Evaluate BITYBLOCKLY_GRADES_DATA
const vm = require('vm');
const ctx = {
  window: {},
  document: {
    getElementById: () => ({ getContext: () => ({}) }),
    querySelector: () => ({}),
    querySelectorAll: () => []
  },
  navigator: {},
  location: {},
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  Math: Math
};
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(bityJs, ctx);

console.log('\n--- 4.º GRADO MISSIONS ---');
ctx.window.BITYBLOCKLY_GRADES_DATA[4].missions.forEach((m, i) => {
  console.log(`Mission ${i + 1}: ${m.name} [type: ${m.type || 'maze'}]`);
});

console.log('\n--- 5.º GRADO MISSIONS ---');
ctx.window.BITYBLOCKLY_GRADES_DATA[5].missions.forEach((m, i) => {
  console.log(`Mission ${i + 1}: ${m.name} [type: ${m.type || 'maze'}]`);
});
