const fs = require('fs');
const lines = fs.readFileSync('css/bityblockly.css', 'utf8').split('\n');

lines.forEach((l, i) => {
  if (l.includes('btn-palette-') || l.includes('step-forward') || l.includes('step-left') || l.includes('step-right')) {
    console.log(`L${i+1}: ${l.trim()}`);
  }
});
