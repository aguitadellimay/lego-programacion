const fs = require('fs');

const lines = fs.readFileSync('js/codingModule.js', 'utf8').split('\n');
console.log(`Total lines in codingModule.js: ${lines.length}`);

const matches = [];
lines.forEach((l, i) => {
  if (/turn_left|turn_right|laberinto/i.test(l)) {
    matches.push({ line: i+1, text: l.trim().substring(0, 100) });
  }
});

console.log(`Found ${matches.length} matches:`);
matches.slice(0, 30).forEach(m => console.log(`Line ${m.line}: ${m.text}`));
if (matches.length > 30) {
  console.log(`... and ${matches.length - 30} more`);
}
