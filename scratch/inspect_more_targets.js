const fs = require('fs');

const code = fs.readFileSync('js/bityBlockly.js', 'utf8');
const lines = code.split('\n');

function findSnippet(str) {
  const idx = lines.findIndex(l => l.includes(str));
  console.log(`Snippet "${str}" at line ${idx + 1}:`);
  if (idx !== -1) {
    console.log(lines.slice(idx - 2, idx + 12).join('\n'));
  }
}

findSnippet('triggerMathChallengeForDoor(');
findSnippet('renderLevelTabs() {');
findSnippet('destroy() {');
