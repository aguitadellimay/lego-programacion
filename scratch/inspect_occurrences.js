const fs = require('fs');

function checkFile(path, patterns) {
  const content = fs.readFileSync(path, 'utf8');
  const lines = content.split('\n');
  console.log(`=== Checking ${path} ===`);
  patterns.forEach(pat => {
    let matchCount = 0;
    lines.forEach((l, i) => {
      if (l.toLowerCase().includes(pat.toLowerCase())) {
        matchCount++;
        if (matchCount <= 8) {
          console.log(`  Line ${i+1}: ${l.trim().substring(0, 100)}`);
        }
      }
    });
    console.log(`Pattern "${pat}": ${matchCount} total matches`);
  });
}

checkFile('js/bityBlockly.js', ['btn-bityblockly-add-', 'turnsExecuted', 'girar', 'giro', 'orientation']);
checkFile('index.html', ['btn-bityblockly-add-', 'girar']);
