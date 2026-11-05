const fs = require('fs');
const lines = fs.readFileSync('js/bityBlockly.js', 'utf8').split('\n');

lines.forEach((l, i) => {
  if (l.includes('bityPos')) {
    console.log(`L${i+1}: ${l.trim()}`);
  }
});
