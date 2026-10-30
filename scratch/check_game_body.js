const fs = require('fs');

const code = fs.readFileSync('js/bityBlockly.js', 'utf8');

// Find methods on BityBlocklyGame
const gameClassRegex = /class\s+BityBlocklyGame\s*\{([\s\S]*?)\n\}\s*\n\s*\/\/\s*Exportaci/m;
const match = code.match(gameClassRegex);
if (!match) {
  console.log('Class BityBlocklyGame not matched with regex');
} else {
  console.log('Class BityBlocklyGame matched! Length of body:', match[1].length);
}
