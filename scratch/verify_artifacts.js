const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Ismae\\.gemini\\antigravity\\brain\\0d9e1921-82a7-413c-a85d-a957ed6a47ea';
const files = [
  'cuatro_direcciones_grado1_paleta.png',
  'celebracion_halloween_cuatro_direcciones.png'
];

files.forEach(f => {
  const p = path.join(ARTIFACT_DIR, f);
  console.log(`${f} exists: ${fs.existsSync(p)} (${fs.existsSync(p) ? fs.statSync(p).size : 0} bytes)`);
});
