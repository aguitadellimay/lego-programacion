const fs = require('fs');
const lines = fs.readFileSync('js/codingModule.js', 'utf8').split('\n');

for (let i = 405; i < 430; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
