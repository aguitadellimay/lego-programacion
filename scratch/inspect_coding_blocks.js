const fs = require('fs');
const lines = fs.readFileSync('js/codingModule.js', 'utf8').split('\n');

function findEnclosingBlock(lineIdx) {
  for (let i = lineIdx; i >= 0; i--) {
    if (lines[i].includes('type:') || lines[i].includes('id:') || lines[i].includes('title:') || lines[i].includes('function ')) {
      return lines[i].trim();
    }
  }
  return '';
}

[532, 1939, 3284, 10695, 11680, 12510, 14001].forEach(l => {
  console.log(`Line ${l}: ${lines[l-1].trim()}`);
  console.log(`  Enclosing: ${findEnclosingBlock(l-1)}`);
});
