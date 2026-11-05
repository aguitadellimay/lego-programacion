const fs = require('fs');

function check(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  console.log(`=== Remaining checks for ${file} ===`);
  lines.forEach((l, i) => {
    if (/girar|giro|turn/i.test(l)) {
      // ignore Lego piece rotate tool in index.html (line ~2080)
      if (file === 'index.html' && l.includes('btn-rotate')) return;
      console.log(`  Line ${i+1}: ${l.trim().substring(0, 100)}`);
    }
  });
}

check('index.html');
check('js/bityBlockly.js');
