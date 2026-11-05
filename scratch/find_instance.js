const fs = require('fs');

const appJs = fs.readFileSync('js/app.js', 'utf8');
const bbJs = fs.readFileSync('js/bityBlockly.js', 'utf8');

function findOccurrences(content, name, filename) {
  content.split('\n').forEach((l, i) => {
    if (l.includes(name)) {
      console.log(`${filename} L${i+1}: ${l.trim().substring(0, 100)}`);
    }
  });
}

findOccurrences(appJs, 'bityBlockly', 'app.js');
findOccurrences(bbJs, 'window.bityBlockly', 'bityBlockly.js');
findOccurrences(appJs, 'BityBlockly', 'app.js');
findOccurrences(bbJs, 'window.BityBlockly', 'bityBlockly.js');
