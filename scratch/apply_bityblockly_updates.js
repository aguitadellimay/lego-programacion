const fs = require('fs');

let code = fs.readFileSync('js/bityBlockly.js', 'utf8').replace(/\r\n/g, '\n');

// 1. Math banks definition
const mathBanksCode = `
  // -------------------------------------------------------------
  // 0. Banco Matemático Ampliado y Progresivo (1.º a 5.º Grado)
  // -------------------------------------------------------------
  const BITYBLOCKLY_MATH_BANKS = {
    1: [
      { id: 'g1_1', story: '¡Batería de Byte! Tenía 10 cargas y usó 5. ¿Cuántas le quedan?', operation: '10 − 5 = ?', type: 'subtraction', total: 10, used: 5, options: [3, 5, 6], correctAnswer: 5, explanation: '10 − 5 = 5. ¡Le quedan 5 cargas de energía!' },
      { id: 'g1_2', story: '¡Módulos lunares! Tenía 6 módulos y sumó 2 nuevos. ¿Cuántos tiene ahora?', operation: '6 + 2 = ?', type: 'addition', base: 6, added: 2, options: [7, 8, 9], correctAnswer: 8, explanation: '6 + 2 = 8. ¡Tiene 8 módulos de energía!' },
      { id: 'g1_3', story: '¡Chips de propulsión! Bity tiene 8 chips y usa 3. ¿Cuántos le quedan?', operation: '8 − 3 = ?', type: 'subtraction', total: 8, used: 3, options: [4, 5, 6], correctAnswer: 5, explanation: '8 − 3 = 5. ¡A Bity le quedan 5 chips!' },
      { id: 'g1_4', story: '¡Cargas de la estación! Había 12 cargas y se usaron 3. ¿Cuántas quedan?', operation: '12 − 3 = ?', type: 'subtraction', total: 12, used: 3, options: [8, 9, 10], correctAnswer: 9, explanation: '12 − 3 = 9. ¡Quedan 9 cargas disponibles!' },
      { id: 'g1_5', story: '¡Propulsores de la nave! Tenía 12 células y sumó 5. ¿Cuántas tiene en total?', operation: '12 + 5 = ?', type: 'addition', base: 12, added: 5, options: [16, 17, 18], correctAnswer: 17, explanation: '12 + 5 = 17. ¡Los motores tienen 17 células listas!' },
      { id: 'g1_6', story: '¡Calabazas del espacio! Había 7 calabazas y Byte recogió 3 más. ¿Cuántas hay?', operation: '7 + 3 = ?', type: 'addition', base: 7, added: 3, options: [9, 10, 11], correctAnswer: 10, explanation: '7 + 3 = 10. ¡Juntó 10 calabazas!' },
      { id: 'g1_7', story: '¡Batería estelar! De 9 estrellas de energía, gastó 4. ¿Cuántas quedan?', operation: '9 − 4 = ?', type: 'subtraction', total: 9, used: 4, options: [4, 5, 6], correctAnswer: 5, explanation: '9 − 4 = 5. ¡Quedan 5 estrellas de energía!' },
      { id: 'g1_8', story: '¡Faroles mágicos! Se encendieron 4 faroles y luego 4 más. ¿Cuántos son?', operation: '4 + 4 = ?', type: 'addition', base: 4, added: 4, options: [7, 8, 9], correctAnswer: 8, explanation: '4 + 4 = 8. ¡Hay 8 faroles encendidos!' },
      { id: 'g1_9', story: '¡Cristales cósmicos! Tenía 11 cristales y perdió 2. ¿Cuántos le quedan?', operation: '11 − 2 = ?', type: 'subtraction', total: 11, used: 2, options: [8, 9, 10], correctAnswer: 9, explanation: '11 − 2 = 9. ¡Conserva 9 cristales cósmicos!' },
      { id: 'g1_10', story: '¡Radar espacial! Detectó 5 señales y luego 4 más. ¿Cuántas son?', operation: '5 + 4 = ?', type: 'addition', base: 5, added: 4, options: [8, 9, 10], correctAnswer: 9, explanation: '5 + 4 = 9. ¡Son 9 señales detectadas!' },
      { id: 'g1_11', story: '¡Turbinas activas! Había 8 turbinas y se apagaron 6. ¿Cuántas siguen funcionando?', operation: '8 − 6 = ?', type: 'subtraction', total: 8, used: 6, options: [2, 3, 4], correctAnswer: 2, explanation: '8 − 6 = 2. ¡2 turbinas siguen activas!' },
      { id: 'g1_12', story: '¡Gemas brillantes! Encontró 3 gemas rojas y 6 azules. ¿Cuántas tiene en total?', operation: '3 + 6 = ?', type: 'addition', base: 3, added: 6, options: [8, 9, 10], correctAnswer: 9, explanation: '3 + 6 = 9. ¡Tiene 9 gemas en total!' }
    ],
    2: [
      { id: 'g2_1', story: '¡Energía de calabaza! 17 unidades más 6 adicionales:', operation: '17 + 6 = ?', type: 'addition', base: 17, added: 6, options: [21, 23, 25], correctAnswer: 23, explanation: '17 + 6 = 23. ¡Cargó 23 unidades de energía!' },
      { id: 'g2_2', story: '¡Calabazas perdidas! De 22 calabazas luminosas, 7 desaparecieron:', operation: '22 − 7 = ?', type: 'subtraction', total: 22, used: 7, options: [14, 15, 17], correctAnswer: 15, explanation: '22 − 7 = 15. ¡Quedan 15 calabazas alumbrando!' },
      { id: 'g2_3', story: '¡Compuerta del templo! Sumá 25 + 8 para abrir el portal:', operation: '25 + 8 = ?', type: 'addition', base: 25, added: 8, options: [31, 33, 35], correctAnswer: 33, explanation: '25 + 8 = 33. ¡El portal se abre!' },
      { id: 'g2_4', story: '¡Batería de reserva! De 34 unidades se gastaron 8:', operation: '34 − 8 = ?', type: 'subtraction', total: 34, used: 8, options: [24, 26, 28], correctAnswer: 26, explanation: '34 − 8 = 26. ¡Quedan 26 unidades de energía!' },
      { id: 'g2_5', story: '¡Luces de la nave! 19 luces violetas más 5 anaranjadas:', operation: '19 + 5 = ?', type: 'addition', base: 19, added: 5, options: [23, 24, 25], correctAnswer: 24, explanation: '19 + 5 = 24. ¡Hay 24 luces iluminando la nave!' },
      { id: 'g2_6', story: '¡Piedras mágicas! Había 28 piedras y se usaron 9 para el hechizo:', operation: '28 − 9 = ?', type: 'subtraction', total: 28, used: 9, options: [18, 19, 21], correctAnswer: 19, explanation: '28 − 9 = 19. ¡Quedan 19 piedras mágicas!' },
      { id: 'g2_7', story: '¡Potencia de despegue! 32 gigavatios más 9 de sobrecarga:', operation: '32 + 9 = ?', type: 'addition', base: 32, added: 9, options: [39, 41, 43], correctAnswer: 41, explanation: '32 + 9 = 41. ¡Alcanzó 41 gigavatios de potencia!' },
      { id: 'g2_8', story: '¡Escudo protector! De 40 puntos de escudo, un asteroide quitó 6:', operation: '40 − 6 = ?', type: 'subtraction', total: 40, used: 6, options: [32, 34, 36], correctAnswer: 34, explanation: '40 − 6 = 34. ¡El escudo resiste con 34 puntos!' },
      { id: 'g2_9', story: '¡Calabazas cósmicas! Recolectó 15 en el valle y 7 en la colina:', operation: '15 + 7 = ?', type: 'addition', base: 15, added: 7, options: [21, 22, 24], correctAnswer: 22, explanation: '15 + 7 = 22. ¡Tiene 22 calabazas recolectadas!' },
      { id: 'g2_10', story: '¡Enfriamiento de motores! El motor estaba a 30 grados y bajó 7:', operation: '30 − 7 = ?', type: 'subtraction', total: 30, used: 7, options: [21, 23, 25], correctAnswer: 23, explanation: '30 − 7 = 23. ¡Quedó a 23 grados de temperatura!' }
    ],
    3: [
      { id: 'g3_1', story: '¡Energía para el tren fantasma! Calculá la potencia requerida:', operation: '35 + 3 = ?', type: 'addition', base: 35, added: 3, options: [37, 38, 40], correctAnswer: 38, explanation: '35 + 3 = 38. ¡El tren fantasma alcanza 38 GW!' },
      { id: 'g3_2', story: '¡Cristales espectrales! De 36 cristales se perdieron 7 en la niebla:', operation: '36 − 7 = ?', type: 'subtraction', total: 36, used: 7, options: [27, 29, 31], correctAnswer: 29, explanation: '36 − 7 = 29. ¡Quedan 29 cristales asegurados!' },
      { id: 'g3_3', story: '¡Cambio de vías ferroviario! Resolvé la suma de la compuerta:', operation: '44 + 6 = ?', type: 'addition', base: 44, added: 6, options: [48, 50, 52], correctAnswer: 50, explanation: '44 + 6 = 50. ¡Las vías hacia la meta están libres!' },
      { id: 'g3_4', story: '¡Velocímetro cósmico! 58 km/h más 7 km/h por el propulsor:', operation: '58 + 7 = ?', type: 'addition', base: 58, added: 7, options: [63, 65, 67], correctAnswer: 65, explanation: '58 + 7 = 65. ¡Acelera a 65 km/h!' },
      { id: 'g3_5', story: '¡Niebla disipada! De 62 metros de niebla se despejaron 8:', operation: '62 − 8 = ?', type: 'subtraction', total: 62, used: 8, options: [52, 54, 56], correctAnswer: 54, explanation: '62 − 8 = 54. ¡Quedan 54 metros por despejar!' },
      { id: 'g3_6', story: '¡Vagones de energía! 75 baterías más 9 de recarga rápida:', operation: '75 + 9 = ?', type: 'addition', base: 75, added: 9, options: [82, 84, 86], correctAnswer: 84, explanation: '75 + 9 = 84. ¡Cargó 84 baterías en total!' },
      { id: 'g3_7', story: '¡Pasajeros espectrales! De 80 pasajeros descendieron 15 en la estación:', operation: '80 − 15 = ?', type: 'subtraction', total: 80, used: 15, options: [60, 65, 70], correctAnswer: 65, explanation: '80 − 15 = 65. ¡Continuaron 65 pasajeros!' },
      { id: 'g3_8', story: '¡Rieles de plasma! 48 metros de riel azul más 12 de riel verde:', operation: '48 + 12 = ?', type: 'addition', base: 48, added: 12, options: [58, 60, 62], correctAnswer: 60, explanation: '48 + 12 = 60. ¡Completó 60 metros de riel!' },
      { id: 'g3_9', story: '¡Carga de vapor! De 50 unidades de vapor se utilizaron 14:', operation: '50 − 14 = ?', type: 'subtraction', total: 50, used: 14, options: [34, 36, 38], correctAnswer: 36, explanation: '50 − 14 = 36. ¡El tren conserva 36 unidades!' }
    ],
    4: [
      { id: 'g4_1', story: '¡Tablas de multiplicar en el laboratorio! Calculá:', operation: '4 × 9 = ?', type: 'multiplication', options: [32, 36, 40], correctAnswer: 36, explanation: '4 × 9 = 36. ¡La cerradura cuántica se desbloquea!' },
      { id: 'g4_2', story: '¡Número perdido! ¿Qué factor falta para que el producto sea 25?', operation: '5 × ___ = 25', type: 'missing_factor', options: [4, 5, 6], correctAnswer: 5, explanation: '5 × 5 = 25. ¡El número que falta es 5!' },
      { id: 'g4_3', story: '¡Poción mágica! Calculá el producto de los ingredientes:', operation: '6 × 7 = ?', type: 'multiplication', options: [40, 42, 44], correctAnswer: 42, explanation: '6 × 7 = 42. ¡La poción alcanza su punto óptimo!' },
      { id: 'g4_4', story: '¡Número perdido! ¿Qué número multiplicado por 8 da 40?', operation: '8 × ___ = 40', type: 'missing_factor', options: [4, 5, 6], correctAnswer: 5, explanation: '8 × 5 = 40. ¡El factor es 5!' },
      { id: 'g4_5', story: '¡Células de energía! 3 paquetes de 9 células cada uno:', operation: '3 × 9 = ?', type: 'multiplication', options: [24, 27, 30], correctAnswer: 27, explanation: '3 × 9 = 27. ¡Total de 27 células de energía!' },
      { id: 'g4_6', story: '¡Portal gótico! Resolvé la multiplicación:', operation: '7 × 4 = ?', type: 'multiplication', options: [26, 28, 30], correctAnswer: 28, explanation: '7 × 4 = 28. ¡El portal gótico se abre!' },
      { id: 'g4_7', story: '¡Número perdido! ¿Qué número multiplicado por 9 da 63?', operation: '9 × ___ = 63', type: 'missing_factor', options: [6, 7, 8], correctAnswer: 7, explanation: '9 × 7 = 63. ¡El factor que falta es 7!' },
      { id: 'g4_8', story: '¡Número perdido! ¿Qué número multiplicado por 6 da 36?', operation: '6 × ___ = 36', type: 'missing_factor', options: [5, 6, 7], correctAnswer: 6, explanation: '6 × 6 = 36. ¡El número perdido es 6!' },
      { id: 'g4_9', story: '¡Cristales de Halloween! 8 frascos con 6 cristales cada uno:', operation: '8 × 6 = ?', type: 'multiplication', options: [46, 48, 52], correctAnswer: 48, explanation: '8 × 6 = 48. ¡Hay 48 cristales en total!' },
      { id: 'g4_10', story: '¡Número perdido! ¿Qué número multiplicado por 7 da 49?', operation: '7 × ___ = 49', type: 'missing_factor', options: [6, 7, 8], correctAnswer: 7, explanation: '7 × 7 = 49. ¡El factor es 7!' },
      { id: 'g4_11', story: '¡Poder alquímico! 9 esferas con 4 encantamientos cada una:', operation: '9 × 4 = ?', type: 'multiplication', options: [32, 36, 40], correctAnswer: 36, explanation: '9 × 4 = 36. ¡36 encantamientos generados!' },
      { id: 'g4_12', story: '¡Número perdido! ¿Qué factor falta para llegar a 32?', operation: '4 × ___ = 32', type: 'missing_factor', options: [7, 8, 9], correctAnswer: 8, explanation: '4 × 8 = 32. ¡El factor que falta es 8!' }
    ],
    5: [
      { id: 'g5_1', story: '¡Núcleo cósmico! Resolvé la multiplicación:', operation: '9 × 3 = ?', type: 'multiplication', options: [24, 27, 30], correctAnswer: 27, explanation: '9 × 3 = 27. ¡El núcleo se activa con 27 unidades!' },
      { id: 'g5_2', story: '¡División exacta de energía! 25 esferas distribuidas en 5 turbinas:', operation: '25 ÷ 5 = ?', type: 'division', options: [4, 5, 6], correctAnswer: 5, explanation: '25 ÷ 5 = 5. ¡Cada turbina recibe 5 esferas de energía!' },
      { id: 'g5_3', story: '¡Matriz gravitacional! Calculá el producto:', operation: '7 × 8 = ?', type: 'multiplication', options: [54, 56, 58], correctAnswer: 56, explanation: '7 × 8 = 56. ¡Matriz calibrada en 56 Hz!' },
      { id: 'g5_4', story: '¡División exacta del portal! 72 unidades repartidas entre 9 condensadores:', operation: '72 ÷ 9 = ?', type: 'division', options: [7, 8, 9], correctAnswer: 8, explanation: '72 ÷ 9 = 8. ¡8 unidades por condensador!' },
      { id: 'g5_5', story: '¡Incógnita en la compuerta! ¿Qué número multiplicado por 6 da 54?', operation: '6 × ___ = 54', type: 'missing_factor', options: [8, 9, 10], correctAnswer: 9, explanation: '6 × 9 = 54. ¡El número perdido es 9!' },
      { id: 'g5_6', story: '¡División exacta del reactor! 81 megavatios divididos en 9 fases:', operation: '81 ÷ 9 = ?', type: 'division', options: [7, 8, 9], correctAnswer: 9, explanation: '81 ÷ 9 = 9. ¡Cada fase opera a 9 megavatios!' },
      { id: 'g5_7', story: '¡Potencia combinada! 12 bobinas con 4 superconductores cada una:', operation: '12 × 4 = ?', type: 'multiplication', options: [44, 48, 52], correctAnswer: 48, explanation: '12 × 4 = 48. ¡Potencia total de 48 superconductores!' },
      { id: 'g5_8', story: '¡División decimal cuántica! 100 cargas en 10 bancos:', operation: '100 ÷ 10 = ?', type: 'division', options: [8, 10, 12], correctAnswer: 10, explanation: '100 ÷ 10 = 10. ¡10 cargas por cada banco de energía!' },
      { id: 'g5_9', story: '¡Incógnita de despegue! ¿Qué número multiplicado por 7 da 56?', operation: '___ × 7 = 56', type: 'missing_factor', options: [7, 8, 9], correctAnswer: 8, explanation: '8 × 7 = 56. ¡El número que falta es 8!' },
      { id: 'g5_10', story: '¡División exacta de propulsores! 96 litros de plasma entre 8 inyectores:', operation: '96 ÷ 8 = ?', type: 'division', options: [11, 12, 13], correctAnswer: 12, explanation: '96 ÷ 8 = 12. ¡12 litros por inyector!' },
      { id: 'g5_11', story: '¡División exacta de frecuencias! 64 vibraciones en 8 pulsos:', operation: '64 ÷ 8 = ?', type: 'division', options: [6, 8, 10], correctAnswer: 8, explanation: '64 ÷ 8 = 8. ¡8 vibraciones por pulso!' },
      { id: 'g5_12', story: '¡División de cristales! 56 cristales en 7 compartimentos:', operation: '56 ÷ 7 = ?', type: 'division', options: [7, 8, 9], correctAnswer: 8, explanation: '56 ÷ 7 = 8. ¡8 cristales por compartimento!' }
    ]
  };

  function getRandomMathQuestion(grade, excludeId = null) {
    const g = parseInt(grade) || 1;
    const bank = BITYBLOCKLY_MATH_BANKS[g] || BITYBLOCKLY_MATH_BANKS[1];
    const filtered = bank.filter(q => q.id !== excludeId);
    const pool = filtered.length > 0 ? filtered : bank;
    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
  }
`;

// 2. Updated BITYBLOCKLY_LEVELS (Grade 1: 6 levels, each with at least 2 doors)
const newLevelsCode = `  const BITYBLOCKLY_LEVELS = [
    {
      id: 1,
      name: 'Nivel 1: El camino de Marte',
      theme: 'mars',
      cols: 7,
      rows: 5,
      start: { x: 1, y: 1, dir: 1 },
      goal: { x: 4, y: 3 },
      doors: [{ x: 3, y: 1 }, { x: 4, y: 2 }],
      grid: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 2, 0, 1, 1],
        [1, 1, 1, 1, 2, 1, 1],
        [1, 1, 1, 1, 3, 1, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ],
      story: 'Bity terminó su exploración de Marte y necesita volver a la base de aterrizaje. ¡Programá sus movimientos y resolvé las puertas matemáticas para llegar a la nave espacial!',
      hint: '💡 Tocá los bloques para armar tu programa. ¡Cada bloque es una instrucción de movimiento!',
      hints: [
        '💡 Pista 1: Cada bloque de Avanzar mueve a Byte un casillero hacia el frente.',
        '💡 Pista 2: Cada compuerta requiere resolver un cálculo matemático para abrirse.',
        '💡 Pista 3: Luego de abrir las compuertas, girá y avanzá hasta la nave.'
      ]
    },
    {
      id: 2,
      name: 'Nivel 2: La base lunar',
      theme: 'moon',
      cols: 8,
      rows: 7,
      start: { x: 1, y: 5, dir: 0 },
      goal: { x: 6, y: 1 },
      doors: [{ x: 1, y: 3 }, { x: 3, y: 2 }],
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 3, 1],
        [1, 0, 0, 2, 0, 1, 1, 1],
        [1, 2, 0, 1, 0, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ],
      story: 'Bity llegó a una base de investigación lunar para recargar sus equipos. ¡Guialo por los pasillos resolviendo las compuertas de seguridad hasta el vehículo espacial!',
      hint: '💡 Pensá bien cada giro. Recordá que girar a la izquierda o derecha cambia hacia dónde mira Bity sin cambiar de casilla.',
      hints: [
        '💡 Pista 1: Subí en línea recta por el pasillo lunar hasta la primera compuerta.',
        '💡 Pista 2: En cada compuerta, sumá o restá los módulos de energía para abrirla.',
        '💡 Pista 3: Continuá por los pasillos alternando giros hacia la nave lunar.'
      ]
    },
    {
      id: 3,
      name: 'Nivel 3: El sector cósmico',
      theme: 'space',
      cols: 9,
      rows: 7,
      start: { x: 1, y: 1, dir: 2 },
      goal: { x: 7, y: 3 },
      doors: [{ x: 1, y: 3 }, { x: 3, y: 5 }],
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 1, 0, 0, 3, 1],
        [1, 1, 1, 0, 1, 0, 1, 1, 1],
        [1, 1, 1, 2, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      story: 'Bity recorre un sector espacial entre asteroides y compuertas de alta seguridad. ¡Programá su camino y abrí las dos compuertas para avanzar a la estación!',
      hint: '💡 Planificá el recorrido completo paso a paso antes de ejecutar. ¡Revisá tus instrucciones si te equivocás!',
      hints: [
        '💡 Pista 1: Avanzá hacia el sur pasando por la primera compuerta.',
        '💡 Pista 2: Desbloqueá la segunda compuerta en el corredor inferior.',
        '💡 Pista 3: Subí por el pasillo este y avanzá hacia la estación.'
      ]
    },
    {
      id: 4,
      name: 'Nivel 4: La estación de energía',
      theme: 'station',
      cols: 10,
      rows: 7,
      start: { x: 1, y: 1, dir: 1 },
      goal: { x: 8, y: 2 },
      doors: [{ x: 2, y: 4 }, { x: 4, y: 5 }],
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 0, 0, 3, 1],
        [1, 1, 0, 0, 1, 1, 0, 1, 1, 1],
        [1, 1, 2, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 0, 0, 2, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      story: 'Bity llegó a una estación espacial que se encuentra entre Marte y la nave. Necesita atravesar sus pasillos, abrir las dos compuertas y encontrar la salida.',
      hint: '💡 Este laberinto tiene más pasillos y curvas. Pensá qué giro necesitás antes de avanzar hacia cada compuerta.',
      hints: [
        '💡 Pista 1: Seguí el pasillo descendente hasta la compuerta intermedia.',
        '💡 Pista 2: Atravesá la compuerta inferior resolviendo la operación matemática.',
        '💡 Pista 3: Subí hacia la compuerta de salida para alcanzar la meta.'
      ]
    },
    {
      id: 5,
      name: 'Nivel 5: ¡Regreso a casa!',
      theme: 'mothership',
      cols: 11,
      rows: 8,
      start: { x: 1, y: 6, dir: 0 },
      goal: { x: 9, y: 1 },
      doors: [{ x: 3, y: 4 }, { x: 5, y: 3 }],
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 2, 1, 0, 1, 0, 1],
        [1, 0, 1, 2, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      story: '¡Bity está frente a la gran nave nodriza! Atravesá los pasillos de aterrizaje y abrí las compuertas de seguridad para volver a casa.',
      hint: '💡 ¡Misión de la nave! Organizá toda la secuencia de instrucciones con calma. ¡La nave espacial te está esperando!',
      hints: [
        '💡 Pista 1: Avanzá con paciencia planificando los giros en cada curva.',
        '💡 Pista 2: Abrí las dos compuertas respondiendo las preguntas matemáticas.',
        '💡 Pista 3: ¡Tramo final hacia la plataforma de despegue interestelar!'
      ]
    },
    {
      id: 6,
      name: 'Nivel 6: Desafío Especial de Instrucciones',
      theme: 'mothership',
      type: 'maze',
      isFinalChallenge: true,
      cols: 8,
      rows: 6,
      start: { x: 1, y: 1, dir: 1 },
      goal: { x: 6, y: 4 },
      doors: [{ x: 3, y: 1 }, { x: 6, y: 3 }],
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 2, 1],
        [1, 1, 1, 1, 0, 0, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ],
      story: '¡Desafío Especial de Instrucciones! Hay dos caminos hacia la nave: Camino A (9 instrucciones) o Camino B (12 instrucciones). ¿Cuál elegirás?',
      hint: '💡 Recordá: cada bloque ejecutado es una instrucción. ¡Contá tus pasos hasta la meta!',
      hints: [
        '💡 Pista 1: Podés avanzar directo hacia el este (Camino A) o descender por el oeste (Camino B).',
        '💡 Pista 2: Cada puerta requiere resolver una suma o resta.',
        '💡 Pista 3: Al llegar a la meta, verás exactamente cuántas instrucciones utilizaste.'
      ]
    }
  ];`;

// Replace BITYBLOCKLY_LEVELS in code
const oldLevelsRegex = /const BITYBLOCKLY_LEVELS = \[[\s\S]*?\n  \];/;
if (!oldLevelsRegex.test(code)) {
  console.error('Could not match old BITYBLOCKLY_LEVELS with regex!');
  process.exit(1);
}

code = code.replace(oldLevelsRegex, mathBanksCode + '\n' + newLevelsCode);
console.log('Replaced BITYBLOCKLY_LEVELS and added math banks successfully!');

fs.writeFileSync('js/bityBlockly.js', code, 'utf8');
