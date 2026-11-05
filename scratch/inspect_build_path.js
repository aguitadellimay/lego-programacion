const fs = require('fs');
const lines = fs.readFileSync('js/codingModule.js', 'utf8').split('\n');

function printContext(start, count) {
  console.log(`=== Lines ${start} to ${start+count} ===`);
  for (let i = start - 1; i < start - 1 + count && i < lines.length; i++) {
    console.log(`${i+1}: ${lines[i]}`);
  }
}

// Check buttons in renderBuildPath
for (let i = 10780; i < 11250; i++) {
  if (lines[i].includes('button') || lines[i].includes('cmd') || lines[i].includes('palette')) {
    console.log(`buildPath L${i+1}: ${lines[i].trim().substring(0, 80)}`);
  }
}
