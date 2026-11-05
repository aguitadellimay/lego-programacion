const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    if (f.startsWith('.') || f === 'node_modules' || f === 'scratch') return;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      searchDir(full);
    } else if (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.css')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('Girar a la izquierda') || content.includes('GIRAR A LA IZQUIERDA') || content.includes('btn-bityblockly-add-forward')) {
        console.log(`Match in: ${full}`);
      }
    }
  });
}

searchDir('.');
