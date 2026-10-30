const fs = require('fs');

const code = fs.readFileSync('js/bityBlockly.js', 'utf8');

// Find class and methods
const classMatch = code.match(/class\s+(\w+)/);
console.log('Class name:', classMatch ? classMatch[1] : 'No class found');

// Find methods
const methods = [];
const methodRegex = /^\s*([a-zA-Z0-9_]+)\s*\([^)]*\)\s*\{/gm;
let m;
while ((m = methodRegex.exec(code)) !== null) {
  methods.push(m[1]);
}
console.log('Methods found:', methods);

// Search for hint references
const lines = code.split('\n');
console.log('\n--- Lines with hint or pista: ---');
lines.forEach((line, idx) => {
  if (/hint|pista/i.test(line) && !line.includes('//')) {
    console.log(`${idx + 1}: ${line.trim().slice(0, 100)}`);
  }
});
