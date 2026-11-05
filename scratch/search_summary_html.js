const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

lines.forEach((l, i) => {
  if (l.includes('summary-moves-count') || l.includes('summary-turns-count') || l.includes('summary-stat-box')) {
    console.log(`L${i+1}: ${l.trim()}`);
  }
});
