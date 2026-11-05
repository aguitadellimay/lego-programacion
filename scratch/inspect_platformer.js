const fs = require('fs');

function inspectMatches(file, regex) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  console.log(`=== Matches in ${file} ===`);
  lines.forEach((l, i) => {
    if (regex.test(l)) {
      console.log(`Line ${i+1}: ${l.trim().substring(0, 110)}`);
    }
  });
}

inspectMatches('js/platformerQuestions.js', /laberinto|girar/i);
