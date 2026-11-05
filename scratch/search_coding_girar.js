const fs = require('fs');
const lines = fs.readFileSync('js/codingModule.js', 'utf8').split('\n');

lines.forEach((l, i) => {
  if (l.includes('Girar a la izquierda') || l.includes('GIRAR A LA IZQUIERDA')) {
    console.log(`L${i+1}: ${l.trim().substring(0, 100)}`);
  }
});
