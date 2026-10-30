const fs = require('fs');

const file = 'js/codingModule.js';
let content = fs.readFileSync(file, 'utf8');

const target = `      const gradeHalloweenInfo = {
        1: {
          title: 'BityBlockly: Misión espacial',
          label: 'MISIÓN ESPACIAL',
          desc: '«¡Bity necesita ayuda! Exploró Marte y ahora tiene que regresar a su nave. Programá sus movimientos, resolvé las compuertas matemáticas y superá el Desafío Especial de Instrucciones».'
        },`;

const replacement = `      const gradeHalloweenInfo = {
        1: {
          title: 'BITYBLOCKLY: MISIÓN ESPACIAL',
          label: 'MISIÓN ESPACIAL',
          desc: '«¡BITY NECESITA AYUDA! EXPLORÓ MARTE Y AHORA TIENE QUE REGRESAR A SU NAVE. PROGRAMÁ SUS MOVIMIENTOS, RESOLVÉ LAS COMPUERTAS MATEMÁTICAS Y SUPERÁ EL DESAFÍO ESPECIAL DE INSTRUCCIONES».'
        },`;

if (!content.includes(target)) {
  console.error('Target not found in codingModule.js');
  process.exit(1);
}

content = content.replace(target, replacement);
fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated codingModule.js for Grade 1 uppercase in syllabus card');
