const fs = require('fs');
const lines = fs.readFileSync('js/codingModule.js', 'utf8').split('\n');

function printContext(start, count) {
  console.log(`=== Lines ${start} to ${start+count} ===`);
  for (let i = start - 1; i < start - 1 + count && i < lines.length; i++) {
    console.log(`${i+1}: ${lines[i]}`);
  }
}

printContext(520, 30);
printContext(10685, 30);
