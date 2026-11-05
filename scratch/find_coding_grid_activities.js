const fs = require('fs');
const content = fs.readFileSync('js/codingModule.js', 'utf8');

// Find all acts in CODING_DATA that mention turn_ or grid
const lines = content.split('\n');
const gridActivities = [];

let currentGrade = null;
let currentTopic = null;
let currentAct = null;

lines.forEach((l, idx) => {
  if (l.match(/^\s*(\d):\s*\{/)) {
    const m = l.match(/^\s*(\d):\s*\{/);
    currentGrade = m[1];
  }
  if (l.includes('"id":') && l.includes('act_')) {
    currentAct = l.trim();
  }
  if (l.includes('turn_left') || l.includes('turn_right')) {
    gridActivities.push({
      line: idx + 1,
      grade: currentGrade,
      act: currentAct,
      text: l.trim()
    });
  }
});

console.log('Total grid activities with turn in codingModule.js:', gridActivities.length);
const uniqueActs = new Set();
gridActivities.forEach(g => uniqueActs.add('Grade ' + g.grade + ' -> ' + g.act));
console.log('Unique activities:');
uniqueActs.forEach(a => console.log(' - ' + a));
