const fs = require('fs');
const lines = fs.readFileSync('js/codingModule.js', 'utf8').split('\n');

for (let i = 635; i < 650; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
for (let i = 730; i < 745; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
