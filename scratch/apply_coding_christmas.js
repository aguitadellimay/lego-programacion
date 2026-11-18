const fs = require('fs');

const filePath = 'js/codingModule.js';
let content = fs.readFileSync(filePath, 'utf8');

const oldHalloweenInfo = `      const gradeHalloweenInfo = {
        1: {
          title: 'BITYBLOCKLY: MISIÓN ESPACIAL',
          label: 'MISIÓN ESPACIAL',
          desc: '«¡BITY NECESITA AYUDA! EXPLORÓ MARTE Y AHORA TIENE QUE REGRESAR A SU NAVE. PROGRAMÁ SUS MOVIMIENTOS, RESOLVÉ LAS COMPUERTAS MATEMÁTICAS Y SUPERÁ EL DESAFÍO ESPECIAL DE INSTRUCCIONES».'
        },
        2: {
          title: 'BityBlockly: El Planeta de las Calabazas 🎃',
          label: 'HALLOWEEN • 2.º GRADO',
          desc: '¡Aventura de Halloween! Recargá energía, encontrá las calabazas perdidas, compuertas matemáticas y el Desafío Especial de Instrucciones con 2 rutas.'
        },
        3: {
          title: 'BityBlockly: El Tren Fantasma Espacial 🚂👻',
          label: 'HALLOWEEN • 3.º GRADO',
          desc: '¡El tren embrujado de 3 paradas! Pasajeros, acumuladores de energía, cristales, laberinto ferroviario y el Desafío Especial de Instrucciones con 3 rutas.'
        },
        4: {
          title: 'BityBlockly: Laboratorio de Hechizos 🧪🧙',
          label: 'HALLOWEEN • 4.º GRADO',
          desc: '¡4 laberintos espaciales con tablas de multiplicar y factores faltantes, cartas que suman 100, reactor, escudo y el Desafío Especial de Instrucciones!'
        },
        5: {
          title: 'BityBlockly: El Núcleo del Planeta Embrujado 🔮🌋',
          label: 'HALLOWEEN • 5.º GRADO',
          desc: '¡4 laberintos cósmicos con multiplicaciones y divisiones exactas, turbinas, incógnitas, código secreto y el Desafío Especial de Instrucciones!'
        }
      };`;

const newChristmasInfo = `      const gradeHalloweenInfo = {
        1: {
          title: 'BITYBLOCKLY: MISIÓN ESPACIAL NAVIDEÑA 🎄',
          label: 'NAVIDAD • 1.ER GRADO',
          desc: '«¡BITY NECESITA AYUDA! EXPLORÓ EL POLO NORTE Y AHORA TIENE QUE REGRESAR A SU NAVE. PROGRAMÁ SUS MOVIMIENTOS, RESOLVÉ LAS COMPUERTAS MATEMÁTICAS Y SUPERÁ EL DESAFÍO ESPECIAL DE INSTRUCCIONES».'
        },
        2: {
          title: 'BityBlockly: El Planeta de los Regalos 🎁',
          label: 'NAVIDAD • 2.º GRADO',
          desc: '¡Aventura de Navidad! Recargá energía, encontrá los regalos perdidos, compuertas matemáticas y el Desafío Especial de Instrucciones con 2 rutas.'
        },
        3: {
          title: 'BityBlockly: El Expreso Polar Espacial 🚂⭐',
          label: 'NAVIDAD • 3.º GRADO',
          desc: '¡El tren festivo de 3 estaciones! Pasajeros, acumuladores de energía, estrellas navideñas, laberinto y el Desafío Especial de Instrucciones con 3 rutas.'
        },
        4: {
          title: 'BityBlockly: El Taller de Juguetes del Polo Norte 🎁🎄',
          label: 'NAVIDAD • 4.º GRADO',
          desc: '¡4 laberintos espaciales con tablas de multiplicar y factores faltantes, cartas que suman 100, reactor de nieve y el Desafío Especial de Instrucciones!'
        },
        5: {
          title: 'BityBlockly: La Gran Fábrica Cósmica de Santa 🎅⭐',
          label: 'NAVIDAD • 5.º GRADO',
          desc: '¡4 laberintos cósmicos con multiplicaciones y divisiones exactas, turbinas del trineo, incógnitas, código secreto y el Desafío Especial de Instrucciones!'
        }
      };`;

if (content.includes(oldHalloweenInfo)) {
  content = content.replace(oldHalloweenInfo, newChristmasInfo);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('codingModule.js updated with Christmas grade info!');
} else {
  console.warn('Could not find oldHalloweenInfo pattern in codingModule.js');
}
