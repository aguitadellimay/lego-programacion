const fs = require('fs');
const lines = fs.readFileSync('js/codingModule.js', 'utf8').split('\n');

lines.forEach((l, i) => {
  if (l.includes('availableCommands')) {
    console.log(`L${i+1}: ${l.trim().substring(0, 100)}`);
  }
});
