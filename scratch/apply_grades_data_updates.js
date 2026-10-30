const fs = require('fs');

let code = fs.readFileSync('js/bityBlockly.js', 'utf8').replace(/\r\n/g, '\n');

// Let's find the BITYBLOCKLY_GRADES_DATA block
const startMarker = '  const BITYBLOCKLY_GRADES_DATA = {';
const endMarker = '  // -------------------------------------------------------------\n  // 3. Motor de Audio Sintetizado';

const startIdx = code.indexOf(startMarker);
const endIdx = code.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find BITYBLOCKLY_GRADES_DATA boundaries!');
  process.exit(1);
}

const newGradesData = `  const BITYBLOCKLY_GRADES_DATA = {
    1: {
      grade: 1,
      title: '1.er Grado: Exploración Espacial',
      subtitle: 'El camino de Marte, la Luna y regreso a casa',
      tag: '6 Niveles • Laberintos & Cuentas',
      icon: '🪐',
      missions: BITYBLOCKLY_LEVELS
    },
    2: {
      grade: 2,
      title: '2.º Grado: El Planeta de las Calabazas',
      subtitle: 'Energía para la nave, calabazas perdidas y compuerta espacial',
      tag: '4 Desafíos • Sumas y Restas (2 cifras)',
      icon: '🎃',
      missions: [
        {
          id: 1,
          name: 'Misión 1: Energía para la nave',
          type: 'math_story',
          story: 'Byte necesita cargar energía en el planeta de las calabazas luminosas para activar los propulsores de despegue. ¡Resolvé la suma y elegí la respuesta correcta!',
          equation: '17 + 6 = ?',
          options: [21, 23, 25],
          correctAnswer: 23,
          explanation: '¡17 + 6 = 23! Byte cargó 23 unidades de energía de calabaza.',
          visualType: 'pumpkin_batteries',
          base: 17,
          added: 6,
          hints: [
            '💡 Pista 1: Podés sumar primero 17 + 3 para llegar al número redondo 20.',
            '💡 Pista 2: Como sumaste 3 de los 6, todavía te faltan 3 más: 20 + 3.',
            '💡 Pista 3: ¡El resultado es 23! Seleccionalo para cargar la nave.'
          ]
        },
        {
          id: 2,
          name: 'Misión 2: Las calabazas perdidas',
          type: 'math_story',
          story: 'La nave detectó 22 calabazas luminosas en el valle embrujado, pero 7 desaparecieron dentro de una cueva misteriosa. ¿Cuántas calabazas quedan afuera?',
          equation: '22 − 7 = ?',
          options: [14, 15, 17],
          correctAnswer: 15,
          explanation: '¡22 − 7 = 15! Quedan 15 calabazas luminosas alumbrando el valle.',
          visualType: 'pumpkins_lost',
          total: 22,
          lost: 7,
          hints: [
            '💡 Pista 1: A 22 restale 2 primero para llegar al número redondo 20.',
            '💡 Pista 2: De las 7 calabazas perdidas, todavía falta restar 5: 20 − 5.',
            '💡 Pista 3: 20 menos 5 es igual a 15. ¡Seleccioná 15!'
          ]
        },
        {
          id: 3,
          name: 'Misión 3: Abrir la puerta espacial',
          type: 'maze',
          theme: 'pumpkin_planet',
          cols: 8,
          rows: 6,
          start: { x: 1, y: 1, dir: 1 },
          goal: { x: 6, y: 4 },
          doors: [{ x: 2, y: 2 }, { x: 4, y: 2 }],
          grid: [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 1, 1, 1, 1],
            [1, 1, 2, 0, 2, 0, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 0, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
          ],
          story: '¡Último tramo en el planeta de las calabazas! Programá los movimientos de Byte para esquivar telarañas y rocas, resolver las compuertas y llegar a la plataforma.',
          hint: '💡 Programá a Byte con Avanzar y Girar. En cada compuerta resolvé la cuenta para abrir la puerta de Halloween.',
          hints: [
            '💡 Pista 1: Avanzá y girá hacia la primera compuerta en (2, 2).',
            '💡 Pista 2: Continuá por el corredor hacia la segunda compuerta en (4, 2).',
            '💡 Pista 3: Tras cruzar la puerta, girá hacia el sur para llegar a la meta.'
          ]
        },
        {
          id: 4,
          name: 'Misión 4: Desafío Especial de Instrucciones',
          type: 'maze',
          isFinalChallenge: true,
          theme: 'pumpkin_planet',
          cols: 9,
          rows: 7,
          start: { x: 1, y: 1, dir: 1 },
          goal: { x: 7, y: 5 },
          doors: [{ x: 4, y: 1 }, { x: 7, y: 4 }],
          grid: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 2, 1],
            [1, 1, 1, 1, 1, 0, 0, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1]
          ],
          story: '¡Gran Desafío de Instrucciones del Planeta Calabaza! Hay dos rutas independientes hacia la plataforma final: Ruta A (11 instrucciones) o Ruta B (14 instrucciones). ¡Elegí la tuya!',
          hint: '💡 Analizá los giros y avances necesarios para cada camino.',
          hints: [
            '💡 Pista 1: Podés bordear por el pasillo superior norte o descender por la galería oeste.',
            '💡 Pista 2: Cada compuerta mágica requiere resolver una suma o resta.',
            '💡 Pista 3: Comprobá cuántas instrucciones te llevó llegar a la meta.'
          ]
        }
      ]
    },
    3: {
      grade: 3,
      title: '3.º Grado: El Tren Fantasma Espacial',
      subtitle: 'Pasajeros de la estación embrujada y rutas cósmicas',
      tag: '5 Desafíos • Tren, Pasajeros & Cristales',
      icon: '🚂👻',
      missions: [
        {
          id: 1,
          name: 'Misión 1: Los pasajeros de la estación embrujada',
          type: 'ghost_train',
          story: 'La nave espacial funciona como un tren que recorre tres estaciones (A, B y C). Parte vacía (0 pasajeros). En la Estación A suben 5 pasajeros. En la Estación B suben 2 y baja 1. ¿Cuántos pasajeros llegan a la Estación C?',
          startPassengers: 0,
          stationA_board: 5,
          stationB_board: 2,
          stationB_leave: 1,
          correctAnswer: 6,
          explanation: '¡Exacto! Inicio: 0. En A: 0 + 5 = 5. En B: 5 + 2 − 1 = 6. ¡A la Estación C llegan 6 pasajeros!',
          hints: [
            '💡 Pista 1: El tren inicia con 0 pasajeros. En la estación A suben 5: 0 + 5 = 5 pasajeros.',
            '💡 Pista 2: En la estación B suben 2 (5 + 2 = 7) y baja 1 pasajero (7 − 1 = 6).',
            '💡 Pista 3: En la estación C no sube ni baja nadie más: ¡Llegan exactamente 6 pasajeros!'
          ]
        },
        {
          id: 2,
          name: 'Misión 2: Energía para el tren fantasma',
          type: 'math_story',
          story: 'Para que el tren fantasma acelere por el túnel cósmico, Byte necesita recargar los acumuladores de plasma. ¡Resolvé el cálculo mental!',
          equation: '35 + 3 = ?',
          options: [37, 38, 40],
          correctAnswer: 38,
          explanation: '¡35 + 3 = 38! El tren fantasma tiene 38 gigavatios de potencia.',
          hints: [
            '💡 Pista 1: A 35 sumale las 3 unidades.',
            '💡 Pista 2: 5 + 3 = 8, por lo que 35 + 3 termina en 8.',
            '💡 Pista 3: ¡35 + 3 es exactamente 38! Elegí 38.'
          ]
        },
        {
          id: 3,
          name: 'Misión 3: Los cristales perdidos',
          type: 'math_story',
          story: 'En el vagón de carga había 36 cristales espectrales, pero al cruzar la niebla cósmica se perdieron 7 cristales. ¿Cuántos cristales quedan a bordo?',
          equation: '36 − 7 = ?',
          options: [27, 29, 31],
          correctAnswer: 29,
          explanation: '¡36 − 7 = 29! Quedan 29 cristales espectrales asegurados en el vagón.',
          hints: [
            '💡 Pista 1: Podés restar 6 primero para llegar a 30: 36 − 6 = 30.',
            '💡 Pista 2: Como eran 7 cristales perdidos, todavía falta restar 1 más: 30 − 1.',
            '💡 Pista 3: ¡30 menos 1 es 29! Seleccioná 29.'
          ]
        },
        {
          id: 4,
          name: 'Misión 4: El laberinto ferroviario de Byte',
          type: 'maze',
          theme: 'ghost_rails',
          cols: 9,
          rows: 6,
          start: { x: 1, y: 1, dir: 1 },
          goal: { x: 7, y: 4 },
          doors: [{ x: 3, y: 1 }, { x: 5, y: 2 }],
          grid: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 2, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 2, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1]
          ],
          story: '¡Ayudá a Byte a llegar al andén C! Programá su recorrido esquivando las telarañas y abrí las dos compuertas de las vías ferroviarias.',
          hint: '💡 Organizá tus instrucciones de Avanzar y Girar para llegar al andén final.',
          hints: [
            '💡 Pista 1: Avanzá hasta la primera compuerta en el pasillo superior.',
            '💡 Pista 2: Girá para descender y resolvé la segunda compuerta ferroviaria.',
            '💡 Pista 3: ¡Girá hacia la derecha para ingresar al andén de la estación!'
          ]
        },
        {
          id: 5,
          name: 'Misión 5: Desafío Especial de Instrucciones',
          type: 'maze',
          isFinalChallenge: true,
          theme: 'ghost_rails',
          cols: 10,
          rows: 8,
          start: { x: 1, y: 1, dir: 1 },
          goal: { x: 8, y: 6 },
          doors: [{ x: 4, y: 1 }, { x: 8, y: 4 }],
          grid: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
          ],
          story: '¡Desafío Maestro del Tren Fantasma! Existen tres caminos independientes para llegar al andén secreto (13, 15 y 17 instrucciones). ¡Programá tu ruta favorita!',
          hint: '💡 Podés elegir la vía superior (Ruta A), la vía central (Ruta B) o la vía baja (Ruta C).',
          hints: [
            '💡 Pista 1: La Ruta A va directo por arriba (13 instrucciones).',
            '💡 Pista 2: La Ruta B atraviesa el andén central (15 instrucciones).',
            '💡 Pista 3: La Ruta C baja por el fondo (17 instrucciones). ¡Todas son válidas!'
          ]
        }
      ]
    },
    4: {
      grade: 4,
      title: '4.º Grado: El Laboratorio de los Hechizos Matemáticos',
      subtitle: '4 Laberintos espaciales, cartas que suman 100 y pociones cósmicas',
      tag: '7 Desafíos • 4 Laberintos & Hechizos',
      icon: '🧪🧙',
      missions: [
        {
          id: 1,
          name: 'Laberinto 1: El alquimista cósmico',
          type: 'maze',
          theme: 'magic_lab',
          cols: 9,
          rows: 7,
          start: { x: 1, y: 1, dir: 1 },
          goal: { x: 7, y: 5 },
          doors: [{ x: 2, y: 2 }, { x: 4, y: 3 }],
          grid: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 2, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 2, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1]
          ],
          story: '¡Guiá a Byte por el laboratorio embrujado hasta la cápsula mágica! Abrí las dos compuertas resolviendo las tablas y cálculos cuánticos.',
          hint: '💡 Programá los giros y avances con precisión.',
          hints: [
            '💡 Pista 1: Bajá hacia la primera compuerta en (2, 2).',
            '💡 Pista 2: En la segunda compuerta en (4, 3), resolvé el desafío matemático.',
            '💡 Pista 3: Luego de abrirla, continuá hacia el sur hasta la cápsula mágica.'
          ]
        },
        {
          id: 2,
          name: 'Laberinto 2: El cementerio de las calabazas',
          type: 'maze',
          theme: 'pumpkin_planet',
          cols: 10,
          rows: 8,
          start: { x: 1, y: 1, dir: 1 },
          goal: { x: 8, y: 6 },
          doors: [{ x: 4, y: 1 }, { x: 8, y: 5 }],
          grid: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 1, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
          ],
          story: '¡Cruzá el cementerio de las calabazas luminosas! Tenés dos compuertas mágicas y múltiples bifurcaciones en el camino a la nave.',
          hint: '💡 Podés elegir la ruta superior o las criptas intermedias.',
          hints: [
            '💡 Pista 1: La compuerta superior está en (4, 1).',
            '💡 Pista 2: Para abrir las puertas, resolvé las operaciones de multiplicación o suma.',
            '💡 Pista 3: La compuerta final en (8, 5) abre el paso hacia la nave meta.'
          ]
        },
        {
          id: 3,
          name: 'Laberinto 3: La puerta del castillo encantado',
          type: 'maze',
          theme: 'haunted_castle',
          cols: 11,
          rows: 8,
          start: { x: 1, y: 1, dir: 1 },
          goal: { x: 9, y: 6 },
          doors: [{ x: 4, y: 1 }, { x: 9, y: 4 }],
          grid: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1],
            [1, 0, 0, 0, 1, 1, 0, 0, 0, 2, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
          ],
          story: '¡Ingresá al castillo encantado! El patio central tiene compuertas góticas y murallas. ¡Planificá tus giros antes de ejecutar!',
          hint: '💡 Observá los dos caminos principales: el pasaje alto o el cruce del patio.',
          hints: [
            '💡 Pista 1: La primera compuerta se encuentra en el pasaje alto en (4, 1).',
            '💡 Pista 2: La compuerta del portal este se encuentra en (9, 4).',
            '💡 Pista 3: Tras desbloquear las puertas, bajá por el corredor este hasta la meta.'
          ]
        },
        {
          id: 4,
          name: 'Misión 4: Encontrá las parejas que suman 100',
          type: 'card_match_100',
          story: '¡Desafío central del Laboratorio! Encontrá las 6 parejas de cartas espaciales que suman exactamente 100. Tocá dos cartas para emparejarlas.',
          pairs: [
            { a: 42, b: 58 },
            { a: 26, b: 74 },
            { a: 33, b: 67 },
            { a: 72, b: 28 },
            { a: 50, b: 50 },
            { a: 25, b: 75 }
          ],
          hints: [
            '💡 Pista 1: Las unidades deben sumar 10: 2+8=10, 6+4=10, 3+7=10, 5+5=10.',
            '💡 Pista 2: Las decenas más la que te llevás deben dar 10: 40 + 50 + 10 = 100 (42 y 58).',
            '💡 Pista 3: 50 + 50 = 100 y 25 + 75 = 100 son parejas directas muy fáciles de ubicar.'
          ]
        },
        {
          id: 5,
          name: 'Misión 5: El reactor de pociones',
          type: 'math_story',
          story: 'Byte necesita sintetizar la poción mágica sumando 9 esferas de energía a las 45 del reactor. ¿A cuánta potencia llega el reactor?',
          equation: '45 + 9 = ?',
          options: [52, 54, 56],
          correctAnswer: 54,
          explanation: '¡45 + 9 = 54! El reactor de pociones mágicas alcanza 54 de potencia.',
          hints: [
            '💡 Pista 1: Para sumar 9 mentalmente, podés sumar 10 y luego restar 1.',
            '💡 Pista 2: 45 + 10 = 55. Ahora 55 − 1 = 54.',
            '💡 Pista 3: ¡El resultado es 54! Seleccionalo para encender el reactor.'
          ]
        },
        {
          id: 6,
          name: 'Misión 6: Estabilizar el escudo magnético',
          type: 'math_story',
          story: 'El escudo del laboratorio estaba en 53 unidades de radiación y el disipador redujo 8 unidades. ¿En cuánto quedó estabilizado?',
          equation: '53 − 8 = ?',
          options: [43, 45, 47],
          correctAnswer: 45,
          explanation: '¡53 − 8 = 45! El escudo magnético quedó perfectamente calibrado en 45 unidades.',
          hints: [
            '💡 Pista 1: Para restar 8 mentalmente, podés restar 3 primero: 53 − 3 = 50.',
            '💡 Pista 2: Ahora de 50 restás los 5 que faltaban: 50 − 5.',
            '💡 Pista 3: 50 − 5 = 45. ¡Seleccioná 45!'
          ]
        },
        {
          id: 7,
          name: 'Misión 7: Desafío Especial de Instrucciones',
          type: 'maze',
          isFinalChallenge: true,
          theme: 'magic_lab',
          cols: 11,
          rows: 8,
          start: { x: 1, y: 1, dir: 1 },
          goal: { x: 9, y: 6 },
          doors: [{ x: 5, y: 1 }, { x: 9, y: 4 }],
          grid: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
          ],
          story: '¡Gran Desafío de Instrucciones del Laboratorio! Tenés tres rutas con diferente cantidad de instrucciones (14, 16 y 18 instrucciones) y compuertas con tablas de multiplicar.',
          hint: '💡 Planificá el recorrido y resolvé las tablas para abrir las compuertas.',
          hints: [
            '💡 Pista 1: La galería norte requiere 14 instrucciones en total.',
            '💡 Pista 2: El pasillo central requiere 16 instrucciones.',
            '💡 Pista 3: La galería baja requiere 18 instrucciones.'
          ]
        }
      ]
    },
    5: {
      grade: 5,
      title: '5.º Grado: El Núcleo del Planeta Embrujado',
      subtitle: 'Cálculos combinados, incógnitas y 4 grandes laberintos cósmicos',
      tag: '8 Desafíos • 4 Laberintos & Núcleo',
      icon: '🔮🌋',
      missions: [
        {
          id: 1,
          name: 'Laberinto 1: El castillo de los caminos secretos',
          type: 'maze',
          theme: 'haunted_castle',
          cols: 11,
          rows: 9,
          start: { x: 1, y: 1, dir: 1 },
          goal: { x: 9, y: 7 },
          doors: [{ x: 4, y: 1 }, { x: 8, y: 5 }],
          grid: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1],
            [1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1],
            [1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 1, 1, 0, 0, 0, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
          ],
          story: '¡Primer gran laberinto de 5.º grado! El castillo posee pasadizos secretos y compuertas mágicas. Analizá cada giro cuidadosamente.',
          hint: '💡 Compará la galería superior con el pasillo intermedio: ambas rutas evitan los callejones sin salida.',
          hints: [
            '💡 Pista 1: La primera compuerta está en el pasillo superior en (4, 1).',
            '💡 Pista 2: La segunda compuerta se encuentra en (8, 5).',
            '💡 Pista 3: Resolvé las operaciones para habilitar el tramo final hacia la nave.'
          ]
        },
        {
          id: 2,
          name: 'Laberinto 2: El bosque encantado de las rutas alternativas',
          type: 'maze',
          theme: 'enchanted_forest',
          cols: 12,
          rows: 9,
          start: { x: 1, y: 1, dir: 1 },
          goal: { x: 10, y: 7 },
          doors: [{ x: 4, y: 1 }, { x: 9, y: 5 }],
          grid: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 0, 1, 2, 1, 1],
            [1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
          ],
          story: '¡El bosque encantado está lleno de senderos engañosos! Superá las compuertas con multiplicaciones y divisiones exactas hasta la salida.',
          hint: '💡 Cuidado con la ruta que va directo hacia el este al final del norte. Bajá por el cruce central o por el río de sombras.',
          hints: [
            '💡 Pista 1: La primera compuerta está en (4, 1).',
            '💡 Pista 2: La segunda compuerta se ubica en (9, 5).',
            '💡 Pista 3: Superá ambas puertas para ingresar al portal final.'
          ]
        },
        {
          id: 3,
          name: 'Laberinto 3: La misión final de Halloween',
          type: 'maze',
          theme: 'haunted_core',
          cols: 13,
          rows: 9,
          start: { x: 1, y: 1, dir: 1 },
          goal: { x: 11, y: 7 },
          doors: [{ x: 5, y: 5 }, { x: 10, y: 5 }],
          grid: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1],
            [1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 1, 1],
            [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
          ],
          story: '¡El desafío maestro de Halloween! Este gran laberinto cuenta con dos compuertas arcanas y múltiples bifurcaciones.',
          hint: '💡 Podés rodear por las almenas altas o avanzar por el gran salón central.',
          hints: [
            '💡 Pista 1: La primera compuerta está en el cruce central en (5, 5).',
            '💡 Pista 2: La segunda compuerta custodia la salida en (10, 5).',
            '💡 Pista 3: Resolvé las operaciones matemáticas para llegar a la nave nodriza.'
          ]
        },
        {
          id: 4,
          name: 'Misión 4: Activar los motores',
          type: 'multi_engine_unlock',
          story: 'Para descender al núcleo del planeta embrujado, Byte debe calibrar las 4 turbinas principales resolviendo operaciones progresivas. Cada acierto enciende una turbina.',
          steps: [
            { equation: '67 + 21 = ?', options: [86, 88, 90], correctAnswer: 88, turbineName: 'Turbina 1 (Propulsión Alfa)' },
            { equation: '72 + 9 = ?', options: [79, 81, 83], correctAnswer: 81, turbineName: 'Turbina 2 (Compresión Beta)' },
            { equation: '12 + 7 − 9 = ?', options: [9, 10, 12], correctAnswer: 10, turbineName: 'Turbina 3 (Flujo Gamma)' },
            { equation: '(12 + 21) − 7 = ?', options: [24, 26, 28], correctAnswer: 26, turbineName: 'Turbina 4 (Estabilizador Delta)' }
          ],
          hints: [
            '💡 Pista 1: Resolvé las operaciones combinadas de izquierda a derecha respetando los paréntesis.',
            '💡 Pista 2: Para (12 + 21) − 7, primero sumá lo de adentro: 12 + 21 = 33. Luego 33 − 7 = 26.',
            '💡 Pista 3: 12 + 7 = 19; 19 − 9 = 10. ¡Comprobá cada cálculo antes de responder!'
          ]
        },
        {
          id: 5,
          name: 'Misión 5: El número perdido',
          type: 'missing_number_solver',
          story: '¡Desafío con incógnita! Descubrí el número que falta en la ecuación para que el resultado final sea 48: 21 + ___ − 7 = 48',
          equationDisplay: '21 + ___ − 7 = 48',
          correctAnswer: 34,
          options: [28, 34, 40],
          hints: [
            '💡 Pista 1: Primero, pensá qué número debe quedar antes de restar 7 para terminar en 48. (Pista: 48 + 7 = 55).',
            '💡 Pista 2: Después, averiguá qué número tenés que sumar a 21 para llegar a ese valor. (Pista: 55 − 21 = 34).',
            '💡 Pista 3: Comprobá el resultado reemplazando el espacio vacío: 21 + 34 − 7 = 55 − 7 = 48. ¡El número perdido es 34!'
          ]
        },
        {
          id: 6,
          name: 'Misión 6: La ruta de energía',
          type: 'energy_route_planner',
          story: 'Byte necesita reunir energía exacta para llegar al núcleo del planeta. Inicia con 30 unidades y la meta es alcanzar exactamente 75 unidades de energía. Elegí la secuencia de nodos para lograr el objetivo.',
          initialEnergy: 30,
          targetEnergy: 75,
          nodes: [
            { id: 'n1', label: '+25 Energía', value: 25 },
            { id: 'n2', label: '+30 Energía', value: 30 },
            { id: 'n3', label: '−10 Desvío', value: -10 },
            { id: 'n4', label: '+15 Recarga', value: 15 },
            { id: 'n5', label: '−5 Consumo', value: -5 }
          ],
          hints: [
            '💡 Pista 1: Partís de 30 y querés llegar a 75. La diferencia total necesaria es 75 − 30 = 45 unidades.',
            '💡 Pista 2: Probá combinar nodos positivos y negativos: por ejemplo +25, luego −10 (quedan +15 agregados), y finalmente +30 (+15 + 30 = +45).',
            '💡 Pista 3: ¡30 + 25 = 55; 55 − 10 = 45; 45 + 30 = 75! Esa secuencia da exactamente la meta.'
          ]
        },
        {
          id: 7,
          name: 'Misión 7: El código secreto del planeta',
          type: 'secret_code_maze',
          story: '¡Misión hacia el núcleo embrujado! Descifrá los 4 dígitos del código secreto resolviendo las operaciones en orden lógico. Luego programá a Byte a través del laberinto para activar el núcleo central.',
          codeChallenges: [
            { label: 'Cifra 1 (Suma)', q: '46 + 28 = ?', answer: 74, options: [72, 74, 76] },
            { label: 'Cifra 2 (Resta)', q: '85 − 39 = ?', answer: 46, options: [44, 46, 48] },
            { label: 'Cifra 3 (Paréntesis)', q: '100 − (25 + 35) = ?', answer: 40, options: [35, 40, 45] },
            { label: 'Cifra 4 (Incógnita)', q: '(15 + ___) − 10 = 35', answer: 30, options: [25, 30, 35] }
          ],
          theme: 'haunted_core',
          cols: 10,
          rows: 7,
          start: { x: 1, y: 1, dir: 1 },
          goal: { x: 8, y: 5 },
          doors: [{ x: 2, y: 1 }, { x: 5, y: 3 }],
          grid: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 2, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 2, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
          ],
          hints: [
            '💡 Pista 1: En 100 − (25 + 35), resolvé el paréntesis primero: 25 + 35 = 60. Luego 100 − 60 = 40.',
            '💡 Pista 2: Para (15 + ___) − 10 = 35, pensá qué número menos 10 da 35 (es 45). Luego 15 + ___ = 45 (el número es 30).',
            '💡 Pista 3: Una vez descifrado el código secreto, programá a Byte esquivando las telarañas hasta el núcleo central.'
          ]
        },
        {
          id: 8,
          name: 'Misión 8: Desafío Especial de Instrucciones',
          type: 'maze',
          isFinalChallenge: true,
          theme: 'haunted_core',
          cols: 12,
          rows: 9,
          start: { x: 1, y: 1, dir: 1 },
          goal: { x: 10, y: 7 },
          doors: [{ x: 6, y: 1 }, { x: 10, y: 5 }],
          grid: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
          ],
          story: '¡Desafío Cumbre de 5.º Grado! Tres rutas alternativas con 16, 20 y 22 instrucciones. Resolvé multiplicaciones, divisiones exactas e incógnitas en las compuertas espaciales.',
          hint: '💡 Comprobá cada camino: Ruta A (16 instrs), Ruta B (20 instrs) y Ruta C (22 instrs).',
          hints: [
            '💡 Pista 1: La Ruta A bordea por arriba y derecha (16 instrucciones).',
            '💡 Pista 2: La Ruta B desciende al patio central (20 instrucciones).',
            '💡 Pista 3: La Ruta C recorre el canal bajo (22 instrucciones).'
          ]
        }
      ]
    }
  };

  // Exposición explícita de laberintos por grado para acceso directo
  BITYBLOCKLY_GRADES_DATA[4].mazes = [
    BITYBLOCKLY_GRADES_DATA[4].missions[0],
    BITYBLOCKLY_GRADES_DATA[4].missions[1],
    BITYBLOCKLY_GRADES_DATA[4].missions[2],
    BITYBLOCKLY_GRADES_DATA[4].missions[6]
  ];
  BITYBLOCKLY_GRADES_DATA[5].mazes = [
    BITYBLOCKLY_GRADES_DATA[5].missions[0],
    BITYBLOCKLY_GRADES_DATA[5].missions[1],
    BITYBLOCKLY_GRADES_DATA[5].missions[2],
    BITYBLOCKLY_GRADES_DATA[5].missions[7]
  ];
`;

const updatedCode = code.slice(0, startIdx) + newGradesData + '\n' + code.slice(endIdx);
fs.writeFileSync('js/bityBlockly.js', updatedCode, 'utf8');
console.log('Successfully updated BITYBLOCKLY_GRADES_DATA!');
