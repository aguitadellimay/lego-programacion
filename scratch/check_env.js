const fs = require('fs');

console.log('package.json exists:', fs.existsSync('package.json'));
if (fs.existsSync('package.json')) {
  console.log(fs.readFileSync('package.json', 'utf8'));
}
console.log('scratch files:', fs.readdirSync('scratch'));
