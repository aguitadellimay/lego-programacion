const fs = require('fs');

const filePath = 'js/bityBlockly.js';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  "title: '2.º Grado: El Planeta de las Calabazas',",
  "title: '2.º Grado: El Planeta de los Regalos',",
);

content = content.replace(
  "subtitle: 'Energía para la nave, calabazas perdidas y compuerta espacial',",
  "subtitle: 'Energía para la nave, regalos perdidos y compuerta espacial',",
);

content = content.replace(
  "title: '3.º Grado: El Tren Fantasma Espacial',",
  "title: '3.º Grado: El Expreso Polar Espacial',",
);

content = content.replace(
  "name: 'Laberinto 2: El cementerio de las calabazas',",
  "name: 'Laberinto 2: El Valle de los Regalos Navideños',",
);

content = content.replace(
  "name: 'Misión 2: Las calabazas perdidas',",
  "name: 'Misión 2: Los regalos perdidos',",
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('bityBlockly.js updated with Christmas names!');
