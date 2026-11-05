const fs = require('fs');

const content = fs.readFileSync('js/codingModule.js', 'utf8');
content.split('\n').forEach((l, i) => {
  if (l.includes('startBityBlockly')) {
    console.log(`L${i+1}: ${l.trim().substring(0, 100)}`);
  }
});
