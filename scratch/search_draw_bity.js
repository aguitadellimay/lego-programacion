const fs = require('fs');
const lines = fs.readFileSync('js/bityBlockly.js', 'utf8').split('\n');

lines.forEach((l, i) => {
  if (l.includes('drawBity(') || l.includes('drawBity =')) {
    console.log(`L${i+1}: ${l.trim()}`);
  }
});
