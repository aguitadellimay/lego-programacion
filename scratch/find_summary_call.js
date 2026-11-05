const fs = require('fs');

const content = fs.readFileSync('js/bityBlockly.js', 'utf8');
content.split('\n').forEach((l, i) => {
  if (l.includes('triggerInstructionSummaryModal')) {
    console.log(`L${i+1}: ${l.trim()}`);
  }
});
