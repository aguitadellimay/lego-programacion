const fs = require('fs');
const content = fs.readFileSync('js/bityBlockly.js', 'utf8');
const lines = content.split('\n');

lines.forEach((l, idx) => {
  if (l.includes("=== 'left'") || l.includes("=== 'right'") || l.includes("=== 'forward'") || l.includes("addBlock(") || l.includes("getBlockLabel")) {
    console.log('L' + (idx + 1) + ': ' + l.trim());
  }
});
