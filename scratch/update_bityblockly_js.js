const fs = require('fs');

let code = fs.readFileSync('js/bityBlockly.js', 'utf8');

// Ensure LF line endings for manipulation
code = code.replace(/\r\n/g, '\n');

console.log('Original bityBlockly.js length:', code.length);

// Let's verify where BITYBLOCKLY_LEVELS starts and ends
const levelsStartIdx = code.indexOf('const BITYBLOCKLY_LEVELS = [');
const levelsEndIdx = code.indexOf('  // -------------------------------------------------------------\n  // 2. Definición Integral de Misiones de Halloween');

if (levelsStartIdx === -1 || levelsEndIdx === -1) {
  console.error('Could not locate BITYBLOCKLY_LEVELS boundaries!');
  process.exit(1);
}

console.log('Located BITYBLOCKLY_LEVELS boundaries.');
