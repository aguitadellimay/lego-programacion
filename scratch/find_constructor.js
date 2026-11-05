const fs = require('fs');

const content = fs.readFileSync('js/bityBlockly.js', 'utf8');
content.split('\n').forEach((l, i) => {
  if (l.includes('class BityBlocklyGame')) {
    console.log(`L${i+1}: ${l}`);
  }
  if (i > 1800 && i < 1860) {
    console.log(`L${i+1}: ${l}`);
  }
});
