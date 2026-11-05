const fs = require('fs');
const lines = fs.readFileSync('js/codingModule.js', 'utf8').split('\n');

for (let i = 615; i < 638; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
