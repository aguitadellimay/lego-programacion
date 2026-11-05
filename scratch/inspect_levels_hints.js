const fs = require('fs');
const lines = fs.readFileSync('js/bityBlockly.js', 'utf8').split('\n');

for (let i = 0; i < 1030; i++) {
  if (/girar|giro/i.test(lines[i])) {
    console.log(`L${i+1}: ${lines[i].trim()}`);
  }
}
