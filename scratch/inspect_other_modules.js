const fs = require('fs');
const path = require('path');

const jsDir = 'js';
const files = fs.readdirSync(jsDir);

files.forEach(f => {
  if (f.endsWith('.js')) {
    const filePath = path.join(jsDir, f);
    const content = fs.readFileSync(filePath, 'utf8');
    const matchesFwd = (content.match(/forward/gi) || []).length;
    const matchesTurn = (content.match(/turn_left|turn_right|turnleft|turnright|girar/gi) || []).length;
    const matchesMaze = (content.match(/laberinto|maze/gi) || []).length;
    if (matchesFwd > 0 || matchesTurn > 0 || matchesMaze > 0) {
      console.log(`${f}: forward=${matchesFwd}, turns/girar=${matchesTurn}, laberinto=${matchesMaze}`);
    }
  }
});
