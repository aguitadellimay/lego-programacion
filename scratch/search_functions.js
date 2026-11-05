const fs = require('fs');
const lines = fs.readFileSync('js/codingModule.js', 'utf8').split('\n');

function searchFunction(name) {
  lines.forEach((l, i) => {
    if (l.includes(`function ${name}`) || l.includes(`${name}(`) || l.includes(`${name} =`)) {
      console.log(`Line ${i+1}: ${l.trim().substring(0, 80)}`);
    }
  });
}

searchFunction('renderBuildPath');
searchFunction('renderRepairRocket');
searchFunction('renderGridGame');
searchFunction('renderCodeDetectives');
