/**
 * ========================================================
 * BITTYBLOCKLY: MISIÓN ESPACIAL — EDICIÓN ESPECIAL DE HALLOWEEN
 * Módulo interactivo de Pensamiento Computacional y Matemática
 * para 1.º, 2.º, 3.º, 4.º y 5.º Grado.
 * Protagonista: Byte el robot.
 * ========================================================
 */

(function (global) {
  'use strict';

  // -------------------------------------------------------------
  // 1. Definición de los 5 Niveles de 1.er Grado (Preservación exacta)
  // -------------------------------------------------------------
  
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

  const BITYBLOCKLY_LEVELS = [
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
  ];

  // -------------------------------------------------------------
  // 2. Definición Integral de Misiones de Halloween (1.º a 5.º Grado)
  // -------------------------------------------------------------
  const BITYBLOCKLY_GRADES_DATA = {
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

  // -------------------------------------------------------------
  // 3. Motor de Audio Sintetizado
  // -------------------------------------------------------------
  
  // =============================================================
  // SISTEMA DE PERSONAJE GUÍA (BITY) Y ASISTENCIA PEDAGÓGICA
  // =============================================================

  function createBityGuideSvg(mood = 'idle') {
    const eyeColor = (mood === 'thinking') ? '#facc15' : (mood === 'alert') ? '#fb923c' : (mood === 'celebrating') ? '#4ade80' : '#38bdf8';
    return `
    <svg class="bity-mascot-svg mood-${mood}" viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bityBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="50%" stop-color="#2563eb"/>
          <stop offset="100%" stop-color="#1e1b4b"/>
        </linearGradient>
        <linearGradient id="bityFaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#090d16"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
        <radialGradient id="antennaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="70%" stop-color="#facc15"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Aura mágica de Halloween espacial -->
      <ellipse cx="50" cy="54" rx="42" ry="38" fill="rgba(56, 189, 248, 0.12)" filter="url(#neonGlow)"/>

      <!-- Antena con esfera emisora -->
      <line x1="50" y1="24" x2="50" y2="10" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
      <circle class="antenna-wave wave-1" cx="50" cy="9" r="6" fill="none" stroke="#fde047" stroke-width="1.2" opacity="0.8"/>
      <circle class="antenna-wave wave-2" cx="50" cy="9" r="10" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.5"/>
      <circle cx="50" cy="9" r="4.5" fill="url(#antennaGlow)"/>

      <!-- Orejas / Comunicadores laterales -->
      <rect x="14" y="38" width="6" height="16" rx="3" fill="#64748b" stroke="#38bdf8" stroke-width="1.5"/>
      <rect x="80" y="38" width="6" height="16" rx="3" fill="#64748b" stroke="#38bdf8" stroke-width="1.5"/>
      <circle cx="17" cy="46" r="2" fill="#38bdf8"/>
      <circle cx="83" cy="46" r="2" fill="#38bdf8"/>

      <!-- Cabeza principal del Robot Bity -->
      <rect x="18" y="24" width="64" height="46" rx="14" fill="url(#bityBodyGrad)" stroke="#38bdf8" stroke-width="2.5"/>

      <!-- Pequeño sombrero mágico de Halloween (brujito cósmico) -->
      <path d="M 28 25 Q 50 16 72 25 L 62 8 Q 50 3 44 7 Z" fill="#4c1d95" stroke="#a855f7" stroke-width="1.5"/>
      <circle cx="44" cy="7" r="2.5" fill="#facc15"/>
      <polygon points="50,14 52,18 56,18 53,20 54,24 50,21 46,24 47,20 44,18 48,18" fill="#fde047"/>

      <!-- Pantalla / Visor LED -->
      <rect x="24" y="32" width="52" height="30" rx="8" fill="url(#bityFaceGrad)" stroke="#1e293b" stroke-width="2"/>

      <!-- Ojos LED brillantes y expresivos -->
      ${mood === 'happy' || mood === 'celebrating' ? `
        <path class="bity-eye-happy" d="M 33 48 Q 40 40 47 48" fill="none" stroke="${eyeColor}" stroke-width="3.5" stroke-linecap="round"/>
        <path class="bity-eye-happy" d="M 53 48 Q 60 40 67 48" fill="none" stroke="${eyeColor}" stroke-width="3.5" stroke-linecap="round"/>
      ` : mood === 'thinking' ? `
        <circle class="bity-eye" cx="40" cy="46" r="4.5" fill="${eyeColor}" filter="url(#neonGlow)"/>
        <circle class="bity-eye" cx="60" cy="44" r="5.5" fill="${eyeColor}" filter="url(#neonGlow)"/>
        <line x1="34" y1="39" x2="45" y2="41" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
        <line x1="55" y1="38" x2="66" y2="41" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
      ` : `
        <circle class="bity-eye left-eye" cx="40" cy="46" r="4.5" fill="${eyeColor}" filter="url(#neonGlow)"/>
        <circle class="bity-eye right-eye" cx="60" cy="46" r="4.5" fill="${eyeColor}" filter="url(#neonGlow)"/>
      `}

      <!-- Boca digital / LED -->
      ${mood === 'celebrating' || mood === 'happy' ? `
        <path d="M 44 56 Q 50 60 56 56" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
      ` : mood === 'thinking' ? `
        <line x1="46" y1="56" x2="54" y2="56" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
      ` : `
        <path d="M 45 56 Q 50 58 55 56" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round"/>
      `}

      <!-- Cuello conector -->
      <rect x="42" y="70" width="16" height="6" rx="2" fill="#334155"/>

      <!-- Cuerpo superior / Pecho robótico -->
      <path d="M 30 76 L 70 76 L 75 92 Q 75 96 70 96 L 30 96 Q 25 96 25 92 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
      <circle class="bity-core" cx="50" cy="86" r="4.5" fill="#38bdf8" filter="url(#neonGlow)"/>
      <circle cx="50" cy="86" r="2" fill="#ffffff"/>
    </svg>
    `;
  }

  function createGhostGuestSvg() {
    return `
    <svg class="bity-mascot-svg guest-ghost" viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ghostGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="70%" stop-color="#e0f2fe"/>
          <stop offset="100%" stop-color="#93c5fd"/>
        </linearGradient>
        <filter id="ghostAura">
          <feGaussianBlur stdDeviation="3" result="glow"/>
          <feComposite in="SourceGraphic" in2="glow" operator="over"/>
        </filter>
      </defs>
      <path d="M 28 50 C 28 26 72 26 72 50 C 72 75 66 84 58 79 C 50 84 42 79 38 84 C 32 80 28 75 28 50 Z"
            fill="rgba(56, 189, 248, 0.25)" filter="url(#ghostAura)"/>
      <path d="M 30 50 C 30 28 70 28 70 50 C 70 72 65 80 58 75 C 52 80 44 75 40 80 C 34 76 30 72 30 50 Z"
            fill="url(#ghostGrad)" stroke="#bae6fd" stroke-width="2"/>
      <ellipse cx="43" cy="46" rx="4" ry="5.5" fill="#0f172a"/>
      <ellipse cx="57" cy="46" rx="4" ry="5.5" fill="#0f172a"/>
      <circle cx="44.5" cy="44" r="1.5" fill="#ffffff"/>
      <circle cx="58.5" cy="44" r="1.5" fill="#ffffff"/>
      <path d="M 46 56 Q 50 61 54 56" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="38" cy="53" rx="2.5" ry="1.5" fill="#f472b6" opacity="0.6"/>
      <ellipse cx="62" cy="53" rx="2.5" ry="1.5" fill="#f472b6" opacity="0.6"/>
    </svg>
    `;
  }

  function createVampireGuestSvg() {
    return `
    <svg class="bity-mascot-svg guest-vampire" viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
      <path d="M 22 45 L 34 35 L 50 44 L 66 35 L 78 45 L 74 88 L 26 88 Z" fill="#581c87" stroke="#7e22ce" stroke-width="1.8"/>
      <polygon points="34,35 50,52 38,58" fill="#dc2626"/>
      <polygon points="66,35 50,52 62,58" fill="#dc2626"/>
      <circle cx="50" cy="48" r="18" fill="#fef08a" stroke="#d97706" stroke-width="1.5"/>
      <path d="M 32 46 C 32 30 68 30 68 46 C 63 38 56 42 50 48 C 44 42 37 38 32 46 Z" fill="#18181b"/>
      <circle cx="44" cy="48" r="3.2" fill="#7f1d1d"/>
      <circle cx="56" cy="48" r="3.2" fill="#7f1d1d"/>
      <circle cx="45" cy="47" r="1.2" fill="#ffffff"/>
      <circle cx="57" cy="47" r="1.2" fill="#ffffff"/>
      <path d="M 44 56 Q 50 61 56 56" fill="none" stroke="#18181b" stroke-width="2"/>
      <polygon points="46,57 47,60 48,57" fill="#ffffff"/>
      <polygon points="52,57 53,60 54,57" fill="#ffffff"/>
    </svg>
    `;
  }

  function createFrankensteinGuestSvg() {
    return `
    <svg class="bity-mascot-svg guest-frankie" viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="58" width="10" height="5" rx="1.5" fill="#94a3b8"/>
      <rect x="70" y="58" width="10" height="5" rx="1.5" fill="#94a3b8"/>
      <rect x="28" y="28" width="44" height="46" rx="8" fill="#84cc16" stroke="#4d7c0f" stroke-width="2"/>
      <path d="M 28 38 L 32 28 L 38 35 L 44 28 L 50 35 L 56 28 L 62 35 L 68 28 L 72 38 Z" fill="#1e293b"/>
      <line x1="33" y1="42" x2="40" y2="40" stroke="#365314" stroke-width="2"/>
      <line x1="35" y1="39" x2="35" y2="43" stroke="#365314" stroke-width="1.5"/>
      <line x1="38" y1="39" x2="38" y2="43" stroke="#365314" stroke-width="1.5"/>
      <circle cx="41" cy="50" r="4" fill="#ffffff" stroke="#1e293b" stroke-width="1.5"/>
      <circle cx="59" cy="50" r="4" fill="#ffffff" stroke="#1e293b" stroke-width="1.5"/>
      <circle cx="42" cy="50" r="2" fill="#0f172a"/>
      <circle cx="60" cy="50" r="2" fill="#0f172a"/>
      <path d="M 43 62 Q 50 66 57 62" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
    `;
  }

  const BITY_GUIDE_MESSAGES = {
    1: {
      start: [
        '¡HOLA! HOY TENEMOS UNA NUEVA MISIÓN.',
        'OBSERVÁ EL CAMINO ANTES DE COMENZAR.',
        'PENSEMOS JUNTOS CÓMO LLEGAR A LA META.',
        'PRIMERO PENSÁ. DESPUÉS ELEGÍ LOS BLOQUES.'
      ],
      coding: [
        'RECORDÁ QUE CADA BLOQUE REPRESENTA UNA INSTRUCCIÓN.',
        'SI ELEGÍS AVANZAR, EL ROBOT SE MUEVE UN CASILLERO.',
        'PENSÁ QUÉ MOVIMIENTO NECESITÁS PARA SEGUIR.',
        'OBSERVÁ HACIA DÓNDE ESTÁ MIRANDO EL ROBOT.'
      ],
      turn: [
        '¡ATENCIÓN! EL CAMINO CAMBIA DE DIRECCIÓN.',
        'PARA SEGUIR, QUIZÁS NECESITES GIRAR.',
        'RECORDÁ QUE GIRAR NO ES LO MISMO QUE AVANZAR.',
        '¡MIRÁ! EL CAMINO DOBLA. NECESITAMOS GIRAR.'
      ],
      error: [
        '¡NO TE PREOCUPES! PODEMOS INTENTARLO OTRA VEZ.',
        'OBSERVÁ QUÉ PASÓ CON EL ROBOT.',
        '¿QUÉ INSTRUCCIÓN PODRÍAS CAMBIAR?',
        '¡CADA INTENTO NOS AYUDA A APRENDER!'
      ],
      repeated_error: [
        'REVISÁ EL ORDEN: PRIMERO GIRAR Y LUEGO AVANZAR.',
        'MIRÁ BIEN LA FLECHA DEL ROBOT: ¿HACIA DÓNDE MIRA?',
        'CONTÁ LOS PASOS LIBRES HASTA LA COMPUERTA O CURVA.'
      ],
      success: [
        '¡MUY BIEN! ¡LO ESTÁS LOGRANDO!',
        '¡EXCELENTE! TUS INSTRUCCIONES FUNCIONARON.',
        '¡SEGUÍ ASÍ!'
      ],
      door: [
        '¡LLEGASTE A UNA COMPUERTA MÁGICA! RESOLVÉ LA CUENTA PARA CONTINUAR.'
      ],
      door_wrong: [
        '¡CASI! TE QUEDAN VIDAS. OBSERVÁ LA AYUDA VISUAL E INTENTALO OTRA VEZ.'
      ],
      victory: [
        '¡FELICITACIONES! LLEGASTE A LA META.',
        '¡LO LOGRASTE! COMPLETASTE LA MISIÓN.'
      ],
      idle: [
        '¿NECESITÁS AYUDA? OBSERVÁ EL MAPA Y TOCÁ "PEDIR UNA PISTA".',
        'RECORDÁ QUE PODÉS TOCAR "AVANZAR" O "GIRAR".'
      ],
      pedagogical_hints: [
        'RECORDÁ: EL ROBOT AVANZA HACIA DONDE MIRA SU FLECHA.',
        'GIRAR NO CAMBIA DE CASILLERO, SOLO CAMBIA LA DIRECCIÓN.',
        'PLANIFICÁ EL CAMINO PASO A PASO ANTES DE EJECUTAR.'
      ]
    },
    2: {
      start: [
        '¡Hola! Bienvenidos a una nueva misión espacial.',
        'Antes de ejecutar, pensá qué camino vas a seguir.',
        'Mirá el mapa y planificá la secuencia paso a paso.'
      ],
      coding: [
        '¿Qué movimiento debería hacer primero el robot?',
        'Revisá el orden de tus instrucciones.',
        'Antes de ejecutar, pensá qué camino vas a seguir.',
        'Cada bloque debe estar colocado en la secuencia correcta.'
      ],
      turn: [
        '¡Atención a la curva! Comprobá hacia qué lado debe girar Byte.',
        'Girar cambia la orientación; luego necesitás avanzar para moverte.',
        'Recordá que girar no es lo mismo que avanzar.'
      ],
      error: [
        '¡Casi! Revisá el orden de las instrucciones para no chocar.',
        'Observá dónde se detuvo Byte y qué bloque cambiarías.',
        '¡No te preocupes! Revisemos juntos el recorrido.'
      ],
      repeated_error: [
        'Verificá cuántos avances diste antes de doblar.',
        'Comprobá si Byte quedó mirando hacia una pared o hacia el pasillo.',
        'Probá ejecutar mentalmente paso por paso.'
      ],
      success: [
        '¡Muy bien! ¡El robot siguió la ruta planeada!',
        '¡Excelente! Tus instrucciones funcionaron.',
        '¡Seguí así!'
      ],
      door: [
        '¡Una puerta de energía! Hacé el cálculo matemático para abrir el paso.'
      ],
      door_wrong: [
        '¡No te preocupes! Cambiamos la pregunta para darte una nueva oportunidad.'
      ],
      victory: [
        '¡Felicitaciones! Llegaste a la meta con éxito.',
        '¡Lo lograste! Completaste la misión.'
      ],
      idle: [
        '¿Pensando el próximo paso? Recordá que podés pedir una pista si la necesitás.',
        'Mirá la orientación de Byte y elegí el siguiente movimiento.'
      ],
      pedagogical_hints: [
        'Anticipá los movimientos: trazá mentalmente la ruta antes de programar.',
        'Verificá si el giro fue a la izquierda o a la derecha según el robot.',
        'Cada casillero requiere una instrucción de avanzar.'
      ]
    },
    3: {
      start: [
        'Observá el recorrido completo antes de programar.',
        '¿Existe otro camino para llegar a la meta?',
        'Analizá los obstáculos y planificá tu recorrido.'
      ],
      coding: [
        'Revisá si tus instrucciones son suficientes.',
        'Anticipá los movimientos necesarios antes de ejecutar.',
        'Compará las posibles alternativas de paso.'
      ],
      turn: [
        'Verificá la orientación del robot antes del siguiente paso.',
        'Tené en cuenta los límites del pasillo al girar.',
        'Recordá verificar la orientación antes del siguiente avance.'
      ],
      error: [
        'Observá dónde se detuvo el robot y comparalo con tu plan.',
        '¿En qué paso de la secuencia se produjo el desvío?',
        'Cada error nos muestra qué instrucción debemos corregir.'
      ],
      repeated_error: [
        'Detectá en qué casillero específico se desvió Byte.',
        'Comprobá si sobró algún paso de avance antes de una bifurcación.',
        'Revisá el orden secuencial de tus bloques.'
      ],
      success: [
        '¡Gran precisión! Las instrucciones se ejecutaron perfectamente.',
        '¡Excelente análisis del camino!'
      ],
      door: [
        'Compuerta sellada. Calculá la operación matemática para liberar el pasillo.'
      ],
      door_wrong: [
        'Respirá hondo, analizá bien los números y volvé a intentar.'
      ],
      victory: [
        '¡Misión completada con éxito! Muy buen razonamiento espacial.',
        '¡Excelente recorrido! Llegaste a la meta.'
      ],
      idle: [
        '¿Analizando alternativas? Tocá "Pedir una pista" si querés una pista orientadora.',
        'Examiná el mapa completo buscando el corredor despejado.'
      ],
      pedagogical_hints: [
        'Buscá puntos de referencia en el mapa como esquinas y compuertas.',
        'Comprobá que el número de avances coincida con las baldosas libres.',
        'Al encontrar bifurcaciones, compará cuál ruta tiene menos giros.'
      ]
    },
    4: {
      start: [
        'Antes de ejecutar, comprobá que la secuencia sea correcta.',
        '¿Podés encontrar un recorrido con menos instrucciones?',
        'Planificá la ruta completa de forma autónoma.'
      ],
      coding: [
        'Revisá si algún movimiento podría generar un choque.',
        'Pensá en la optimización: ¿cada instrucción es estrictamente necesaria?',
        'Verificá la lógica de la secuencia paso por paso.'
      ],
      turn: [
        'Asegurate de orientar al robot exactamente hacia el pasillo libre.',
        'Recordá que los giros innecesarios suman instrucciones a tu total.',
        'Detectá la orientación exacta tras el giro para no avanzar contra una pared.'
      ],
      error: [
        'Depurá tu código: identificá qué bloque causó la colisión.',
        '¿Qué corrección mínima resolvería el recorrido?',
        'Analizá el fallo y ajustá la secuencia.'
      ],
      repeated_error: [
        'Revisá el punto exacto de la colisión: ¿faltó un giro o sobró un avance?',
        'Contá casilleros con precisión para no golpear las paredes.',
        'Analizá la trayectoria bloque por bloque.'
      ],
      success: [
        '¡Excelente deducción! Tu algoritmo resolvió el tramo sin fallas.',
        '¡Secuencia limpia y efectiva!'
      ],
      door: [
        'Puerta de seguridad cuántica: aplicá la tabla de multiplicar o factor faltante para desbloquearla.'
      ],
      door_wrong: [
        'Revisá las opciones con calma. ¡Pensá en la tabla de multiplicar!'
      ],
      victory: [
        '¡Desafío superado! Planificación y ejecución impecables.',
        '¡Excelente resolución autónoma de la misión!'
      ],
      idle: [
        'Recordá que podés consultar una pista pedagógica con el botón "Pedir una pista".',
        'Analizá mentalmente la secuencia antes de ejecutar.'
      ],
      pedagogical_hints: [
        'En los laberintos avanzados, planificá primero la llegada a cada compuerta.',
        'Optimizá tu ruta evitando rodeos innecesarios.',
        'Verificá que cada avance tenga espacio libre antes de colocarlo.'
      ]
    },
    5: {
      start: [
        '¿Qué diferencias encontrás entre los caminos disponibles?',
        '¿Cuál es la secuencia más eficiente para esta misión?',
        'Analizá el laberinto buscando la solución algorítmica óptima.'
      ],
      coding: [
        '¿Podés alcanzar el mismo objetivo utilizando menos instrucciones?',
        'Optimizá tu algoritmo: evitá giros y avances redundantes.',
        'Comprobá la coherencia del flujo de instrucciones.'
      ],
      turn: [
        'Optimizá la orientación: calculá el giro más directo hacia la meta.',
        'Cada giro cuenta como una instrucción en tu métrica final.',
        'Compará si girar antes o después te ahorra movimientos.'
      ],
      error: [
        'Analizá el resultado y detectá dónde podrías mejorar el algoritmo.',
        'Depuración analítica: ¿fue un error de distancia o de orientación?',
        'Ajustá la secuencia para alcanzar la máxima eficiencia.'
      ],
      repeated_error: [
        'Detectá el desvío algorítmico comparando el camino planeado con el ejecutado.',
        'Comprobá las coordenadas del obstáculo y corregí la instrucción causante.',
        'Optimizá la secuencia eliminando pasos redundantes.'
      ],
      success: [
        '¡Excelente optimización! Algoritmo ejecutado a la perfección.',
        '¡Razonamiento lógico de alto nivel!'
      ],
      door: [
        'Desafío de compuerta: resolvé la división o multiplicación exacta para habilitar el camino.'
      ],
      door_wrong: [
        'Comprobá la operación mentalmente antes de seleccionar. ¡Vos podés!'
      ],
      victory: [
        '¡Brillante! Misión completada con máxima eficiencia algorítmica.',
        '¡Felicitaciones! Demostraste un gran dominio de la programación.'
      ],
      idle: [
        'Si querés contrastar tu estrategia, consultá una pista con "Pedir una pista".',
        'Analizá cuál de las rutas posibles minimiza la cantidad total de bloques.'
      ],
      pedagogical_hints: [
        'Compará las rutas: la más corta en casilleros a veces tiene más giros.',
        'Un algoritmo óptimo equilibra la cantidad de avances y giros mínimos.',
        'Revisá el estado del tablero y calculá mentalmente el costo de cada bifurcación.'
      ]
    }
  };

  const BITY_GUEST_CHEERS = {
    ghost: [
      '¡Buuu! ¡Un saludo desde el espacio! Pensá tranquilo, que el camino está cerca.',
      '¡Flotando entre las estrellas! Con calma y paciencia vas a resolver la misión.'
    ],
    vampire: [
      '¡Excelente vuelo cósmico! Mis murciélagos me dicen que vas por buen camino.',
      '¡Saludos estelares! Revisá bien la orientación de tus pasos antes de despegar.'
    ],
    frankenstein: [
      '¡Arrrg! ¡Frankie te alienta! ¡Un paso más y lográs la meta!',
      '¡Fuerza de robot! Cada bloque que colocás te acerca más a la victoria.'
    ]
  };

  class BityBlocklyAudio {
    constructor() {
      this.ctx = null;
      this.enabled = true;
      try {
        const stored = localStorage.getItem('lego_bityblockly_sound');
        if (stored !== null) this.enabled = stored === 'true';
      } catch (e) {}
    }

    init() {
      if (this.ctx) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      } catch (e) {}
    }

    play(type) {
      if (typeof window !== 'undefined' && window.MagicAudioEngine && !window.MagicAudioEngine.isEnabled()) {
        return;
      }
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'click' || type === 'add') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.exponentialRampToValueAtTime(880, t + 0.08);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.08);
        osc.start(t);
        osc.stop(t + 0.08);
      } else if (type === 'step') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.linearRampToValueAtTime(480, t + 0.1);
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.1);
        osc.start(t);
        osc.stop(t + 0.1);
      } else if (type === 'turn') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, t);
        osc.frequency.linearRampToValueAtTime(650, t + 0.12);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.12);
        osc.start(t);
        osc.stop(t + 0.12);
      } else if (type === 'bump') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.linearRampToValueAtTime(80, t + 0.18);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.18);
        osc.start(t);
        osc.stop(t + 0.18);
      } else if (type === 'doorUnlock' || type === 'cardMatch' || type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, t); // C5
        osc.frequency.setValueAtTime(659.25, t + 0.09); // E5
        osc.frequency.setValueAtTime(783.99, t + 0.18); // G5
        osc.frequency.setValueAtTime(1046.50, t + 0.27); // C6
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.45);
        osc.start(t);
        osc.stop(t + 0.45);
      } else if (type === 'ghostLaugh') {
        if (typeof window !== 'undefined' && window.MagicAudioEngine && typeof window.MagicAudioEngine.playGhostLaugh === 'function') {
          window.MagicAudioEngine.playGhostLaugh();
        } else {
          [440, 400, 360, 300].forEach((freq, idx) => {
            const bt = t + idx * 0.16;
            const bOsc = this.ctx.createOscillator();
            const bGain = this.ctx.createGain();
            bOsc.type = 'sawtooth';
            bOsc.frequency.setValueAtTime(freq, bt);
            bOsc.frequency.exponentialRampToValueAtTime(freq - 80, bt + 0.12);
            bGain.gain.setValueAtTime(0.001, bt);
            bGain.gain.linearRampToValueAtTime(0.12, bt + 0.02);
            bGain.gain.exponentialRampToValueAtTime(0.001, bt + 0.12);
            bOsc.connect(bGain);
            bGain.connect(this.ctx.destination);
            bOsc.start(bt);
            bOsc.stop(bt + 0.13);
          });
        }
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.setValueAtTime(196, t + 0.12);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.25);
        osc.start(t);
        osc.stop(t + 0.25);
      } else if (type === 'bitySpeak') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, t); // D5
        osc.frequency.exponentialRampToValueAtTime(880, t + 0.12); // A5
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.linearRampToValueAtTime(0.005, t + 0.12);
        osc.start(t);
        osc.stop(t + 0.12);
      } else if (type === 'victory') {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, t + idx * 0.1);
          g.gain.setValueAtTime(0.18, t + idx * 0.1);
          g.gain.linearRampToValueAtTime(0.01, t + idx * 0.1 + 0.25);
          o.connect(g);
          g.connect(this.ctx.destination);
          o.start(t + idx * 0.1);
          o.stop(t + idx * 0.1 + 0.25);
        });
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      try {
        localStorage.setItem('lego_bityblockly_sound', this.enabled ? 'true' : 'false');
      } catch (e) {}
      return this.enabled;
    }
  }

  // -------------------------------------------------------------
  // 4. Clase Principal: BityBlocklyGame
  // -------------------------------------------------------------
  class BityBlocklyGame {
    constructor(options = {}) {
      this.options = options;
      this.onBackToSyllabus = options.onBackToSyllabus || (() => {});
      this.onProgressUpdated = options.onProgressUpdated || (() => {});

      this.audio = new BityBlocklyAudio();
      this.currentGrade = parseInt(options.grade) || 1;
      this.currentLevelIndex = 1;
      this.unlockedLevel = 1;
      this.completedLevels = [];
      this.revealedHintsCount = 0;
      this.consecutiveErrors = 0;
      this.lastGuideSpeakTime = 0;
      this.currentGuideSpeaker = 'bity';
      this.currentGuideMood = 'idle';
      this.idleTimerId = null;
      this.doorOpen = false;
      this.openedDoors = new Set();
      this.doorQuestions = {};
      this.lastQuestionId = null;
      this.lives = 3;
      this.maxLives = 3;
      this.instructionsExecuted = 0;
      this.movesExecuted = 0;
      this.turnsExecuted = 0;
      this.conceptSeenPerGrade = {};

      // Estado interactivo especial
      this.cardMatchState = null;
      this.ghostTrainState = null;
      this.enginesState = null;
      this.missingNumberState = null;
      this.energyRouteState = null;
      this.secretCodeState = null;

      // Estado del Fantasma de Halloween y Pistas de Orientación en el Laberinto
      this.mazeGhost = {
        active: false,
        x: 0,
        y: 0,
        alpha: 0,
        phase: 'idle',
        timer: 0,
        hasLaughed: false,
        nextSpawnTime: Date.now() + 20000 + Math.random() * 12000
      };

      // Estado del robot
      this.bityPos = { x: 1, y: 1, dir: 1 };
      this.bumpAnimation = null;

      // Programa de bloques construido por el alumno
      this.blocks = [];
      this.maxBlocks = 40;

      // Estado de ejecución
      this.isRunning = false;
      this.isPausedForMath = false;
      this.currentStepIndex = -1;
      this.executionTimerId = null;

      // Canvas principal y animación
      this.canvas = null;
      this.ctx = null;
      this.particles = [];
      this.animationFrameId = null;

      // Portada y animación espacial
      this.coverCanvas = null;
      this.coverCtx = null;
      this.coverFrameId = null;

      // Cinemática final
      this.cinematicFrameId = null;
      this.isCinematicPlaying = false;

      this.loadProgress();
      this.initDom();
    }

    // -----------------------------------------------------------
    // Persistencia y Progreso
    // -----------------------------------------------------------
    loadProgress() {
      try {
        const raw = localStorage.getItem('lego_bityblockly_progress');
        if (raw) {
          const data = JSON.parse(raw);
          this.unlockedLevel = Math.max(1, Math.min(5, parseInt(data.unlockedLevel) || 1));
          this.completedLevels = Array.isArray(data.completedLevels) ? data.completedLevels : [];
        }
      } catch (e) {
        this.unlockedLevel = 1;
        this.completedLevels = [];
      }

      try {
        const rawH = localStorage.getItem('lego_bittyblockly_halloween_progress');
        this.halloweenProgress = rawH ? JSON.parse(rawH) : {};
      } catch (e) {
        this.halloweenProgress = {};
      }
    }

    saveProgress() {
      // 1. Guardar progreso de grado 1 (compatibilidad total)
      if (this.currentGrade === 1) {
        try {
          const data = {
            unlockedLevel: this.unlockedLevel,
            completedLevels: this.completedLevels,
            updatedAt: new Date().toISOString()
          };
          localStorage.setItem('lego_bityblockly_progress', JSON.stringify(data));
        } catch (e) {}
      }

      // 2. Guardar progreso de Halloween en estructura general
      if (!this.halloweenProgress) this.halloweenProgress = {};
      if (!this.halloweenProgress[this.currentGrade]) {
        this.halloweenProgress[this.currentGrade] = { completed: [], unlocked: 1 };
      }

      const gProg = this.halloweenProgress[this.currentGrade];
      if (!gProg.completed.includes(this.currentLevelIndex)) {
        gProg.completed.push(this.currentLevelIndex);
      }
      gProg.unlocked = Math.max(gProg.unlocked || 1, this.currentLevelIndex + 1);

      try {
        localStorage.setItem('lego_bittyblockly_halloween_progress', JSON.stringify(this.halloweenProgress));
      } catch (e) {}

      this.onProgressUpdated(this.getProgressSummary());
    }

    getProgressSummary() {
      const gData = BITYBLOCKLY_GRADES_DATA[this.currentGrade];
      const total = gData ? gData.missions.length : ((this.currentGrade === 1) ? 5 : (this.currentGrade === 2 ? 3 : 4));
      let count = 0;
      if (this.currentGrade === 1) {
        count = this.completedLevels.length;
      } else if (this.halloweenProgress && this.halloweenProgress[this.currentGrade]) {
        count = this.halloweenProgress[this.currentGrade].completed.length;
      }
      const pct = Math.min(100, Math.round((count / total) * 100));
      return {
        grade: this.currentGrade,
        completedCount: count,
        totalLevels: total,
        percentage: pct,
        isCompleted: count >= total,
        unlockedLevel: this.unlockedLevel
      };
    }

    // -----------------------------------------------------------
    // Inicialización del DOM y Eventos
    // -----------------------------------------------------------
    initDom() {
      this.canvas = document.getElementById('bityblockly-canvas');
      if (this.canvas) {
        this.ctx = this.canvas.getContext('2d');
      }

      this.coverCanvas = document.getElementById('bityblockly-cover-canvas');
      if (this.coverCanvas) {
        this.coverCtx = this.coverCanvas.getContext('2d');
      }

      // Botón volver al temario
      const btnBack = document.getElementById('btn-bityblockly-back');
      if (btnBack) {
        btnBack.onclick = () => {
          this.stopProgram();
          this.stopCinematic();
          this.audio.play('click');
          this.onBackToSyllabus();
        };
      }

      // Botón portada desde vista de juego
      const btnHub = document.getElementById('btn-bityblockly-hub');
      if (btnHub) {
        btnHub.onclick = () => {
          this.stopProgram();
          this.audio.play('click');
          this.showCoverView();
        };
      }

      // Botón volver a Home desde portada
      const btnCoverHome = document.getElementById('btn-cover-back-home');
      if (btnCoverHome) {
        btnCoverHome.onclick = () => {
          this.stopProgram();
          this.audio.play('click');
          this.onBackToSyllabus();
        };
      }

      // Botones de sonido
      const setupSoundBtn = (btn) => {
        if (!btn) return;
        btn.textContent = this.audio.enabled ? '🔊' : '🔇';
        btn.onclick = () => {
          const enabled = this.audio.toggle();
          const allSoundBtns = document.querySelectorAll('.btn-bityblockly-sound');
          allSoundBtns.forEach(b => b.textContent = enabled ? '🔊' : '🔇');
          if (enabled) this.audio.play('click');
        };
      };
      setupSoundBtn(document.getElementById('btn-bityblockly-sound'));
      setupSoundBtn(document.getElementById('btn-cover-sound'));

      // Sincronizar atributos de grado para CSS de mayúsculas
      const screenEl = document.getElementById('screen-bityblockly');
      if (screenEl) {
        screenEl.setAttribute('data-bity-grade', String(this.currentGrade));
      }
      if (document.body) {
        document.body.setAttribute('data-active-bity-grade', String(this.currentGrade));
      }

      // Inicializar Personaje Guía Permanente (Bity)
      this.initBityGuideDom();

      // Botón de pedir pista interactiva (retrocompatibilidad)
      const btnHint = document.getElementById('btn-bityblockly-ask-hint');
      if (btnHint) {
        btnHint.onclick = () => {
          this.onBityAskHint();
        };
      }

      // Botones de selección de grado en la Portada de Halloween
      const gradeButtons = document.querySelectorAll('.btn-h-grade-play, .h-grade-card');
      gradeButtons.forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const g = parseInt(btn.dataset.hgrade) || 1;
          this.audio.play('click');
          this.selectGrade(g);
        };
      });

      // Botones de paleta de bloques
      const btnFwd = document.getElementById('btn-bityblockly-add-forward');
      if (btnFwd) btnFwd.onclick = () => this.addBlock('forward');

      const btnLeft = document.getElementById('btn-bityblockly-add-left');
      if (btnLeft) btnLeft.onclick = () => this.addBlock('left');

      const btnRight = document.getElementById('btn-bityblockly-add-right');
      if (btnRight) btnRight.onclick = () => this.addBlock('right');

      // Botones de control de ejecución
      const btnRun = document.getElementById('btn-bityblockly-run');
      if (btnRun) btnRun.onclick = () => this.runProgram();

      const btnReset = document.getElementById('btn-bityblockly-reset');
      if (btnReset) btnReset.onclick = () => this.resetLevelState(true);

      const btnClear = document.getElementById('btn-bityblockly-clear');
      if (btnClear) btnClear.onclick = () => this.clearBlocks();

      // Iniciar bucle de animación de estrellas en canvas
      this.initCanvasStars();

      // Cargar nivel inicial
      this.loadLevel(this.currentLevelIndex);
      this.initCoverAnimation();
    }

    // -----------------------------------------------------------
    // Personaje Guía Permanente (Bity) y Pistas Pedagógicas
    // -----------------------------------------------------------
    initBityGuideDom() {
      const btnAsk = document.getElementById('btn-bity-ask-hint');
      if (btnAsk) {
        btnAsk.onclick = () => {
          this.onBityAskHint();
        };
      }
      this.renderGuideAvatar('bity', 'idle');
      this.resetIdleTimer();
    }

    renderGuideAvatar(character = 'bity', mood = 'idle') {
      const container = document.getElementById('bity-guide-avatar-container');
      if (!container) return;

      let svgHtml = '';
      if (character === 'ghost') {
        svgHtml = createGhostGuestSvg();
      } else if (character === 'vampire') {
        svgHtml = createVampireGuestSvg();
      } else if (character === 'frankenstein') {
        svgHtml = createFrankensteinGuestSvg();
      } else {
        svgHtml = createBityGuideSvg(mood);
      }
      container.innerHTML = svgHtml;
    }

    formatForGrade(text) {
      if (!text || typeof text !== 'string') return text;
      if (this.currentGrade === 1) {
        return text.toUpperCase();
      }
      return text;
    }

    updateBlockLabelsForGrade() {
      const isG1 = this.currentGrade === 1;

      // Botón volver al temario
      const btnBack = document.getElementById('btn-bityblockly-back');
      if (btnBack) {
        btnBack.innerHTML = isG1 ? '<span>⬅</span> VOLVER AL TEMARIO' : '<span>⬅</span> Volver al Temario';
        btnBack.title = isG1 ? 'VOLVER AL TEMARIO' : 'Volver al temario';
      }

      // Botón portada
      const btnHub = document.getElementById('btn-bityblockly-hub');
      if (btnHub) {
        btnHub.innerHTML = isG1 ? '<span>🎃</span> PORTADA / GRADOS' : '<span>🎃</span> Portada / Grados';
        btnHub.title = isG1 ? 'VER PORTADA Y CAMBIAR GRADO' : 'Ver Portada y Cambiar Grado';
      }

      // Botón de pedir pista
      const btnAskHintText = document.getElementById('btn-bity-ask-hint-text');
      if (btnAskHintText) {
        btnAskHintText.textContent = isG1 ? 'PEDIR UNA PISTA' : 'Pedir una pista';
      }

      // Paleta de bloques
      const btnFwd = document.getElementById('btn-bityblockly-add-forward');
      if (btnFwd) {
        const lbl = btnFwd.querySelector('.block-label-text');
        const add = btnFwd.querySelector('.block-add-hint');
        if (lbl) lbl.textContent = isG1 ? 'AVANZAR' : 'Avanzar';
        if (add) add.textContent = isG1 ? '+ AGREGAR' : '+ Agregar';
        btnFwd.title = isG1 ? 'AVANZAR 1 CASILLA' : 'Avanzar 1 casilla';
      }

      const btnLeft = document.getElementById('btn-bityblockly-add-left');
      if (btnLeft) {
        const lbl = btnLeft.querySelector('.block-label-text');
        const add = btnLeft.querySelector('.block-add-hint');
        if (lbl) lbl.textContent = isG1 ? 'GIRAR A LA IZQUIERDA' : 'Girar a la izquierda';
        if (add) add.textContent = isG1 ? '+ AGREGAR' : '+ Agregar';
        btnLeft.title = isG1 ? 'GIRAR 90° A LA IZQUIERDA' : 'Girar 90° a la izquierda';
      }

      const btnRight = document.getElementById('btn-bityblockly-add-right');
      if (btnRight) {
        const lbl = btnRight.querySelector('.block-label-text');
        const add = btnRight.querySelector('.block-add-hint');
        if (lbl) lbl.textContent = isG1 ? 'GIRAR A LA DERECHA' : 'Girar a la derecha';
        if (add) add.textContent = isG1 ? '+ AGREGAR' : '+ Agregar';
        btnRight.title = isG1 ? 'GIRAR 90° A LA DERECHA' : 'Girar 90° a la derecha';
      }

      // Botones de ejecución
      const btnRun = document.getElementById('btn-bityblockly-run');
      if (btnRun && !this.isRunning) {
        btnRun.innerHTML = isG1 ? '<span>▶️</span> ¡EJECUTAR PROGRAMA!' : '<span>▶️</span> ¡Ejecutar programa!';
      }

      const btnReset = document.getElementById('btn-bityblockly-reset');
      if (btnReset) {
        btnReset.innerHTML = isG1 ? '<span>🔄</span> VOLVER AL INICIO' : '<span>🔄</span> Volver al inicio';
        btnReset.title = isG1 ? 'VOLVER BITY AL INICIO' : 'Volver Bity al inicio';
      }

      const btnClear = document.getElementById('btn-bityblockly-clear');
      if (btnClear) {
        btnClear.innerHTML = isG1 ? '<span>🗑️</span> BORRAR TODO' : '<span>🗑️</span> Borrar todo';
        btnClear.title = isG1 ? 'BORRAR TODOS LOS BLOQUES' : 'Borrar todos los bloques';
      }
    }

    speakGuide(text, options = {}) {
      if (!text) return;
      const speaker = options.speaker || 'bity';
      const mood = options.mood || 'idle';
      const force = options.force || false;

      // No saturar con mensajes automáticos si ocurrieron hace menos de 2.2 segundos
      const now = Date.now();
      if (!force && this.lastGuideSpeakTime && (now - this.lastGuideSpeakTime < 2200)) {
        return;
      }
      this.lastGuideSpeakTime = now;

      this.currentGuideSpeaker = speaker;
      this.currentGuideMood = mood;
      this.renderGuideAvatar(speaker, mood);

      const nametagEl = document.getElementById('bity-guide-nametag');
      const badgeEl = document.getElementById('bity-guide-speaker-badge');
      const msgEl = document.getElementById('bity-guide-message');

      let displayName = 'BITY';
      let badgeText = '🤖 BITY • TU GUÍA ESPACIAL';

      if (speaker === 'ghost') {
        displayName = 'FANTASMITA';
        badgeText = '👻 FANTASMITA • CONSEJO MÁGICO';
      } else if (speaker === 'vampire') {
        displayName = 'VAMPIRITO';
        badgeText = '🧛 VAMPIRITO • CONSEJO CÓSMICO';
      } else if (speaker === 'frankenstein') {
        displayName = 'FRANKIE';
        badgeText = '🧟 FRANKIE • ÁNIMO ESPACIAL';
      }

      if (nametagEl) nametagEl.textContent = this.formatForGrade(displayName);
      if (badgeEl) badgeEl.textContent = this.formatForGrade(badgeText);

      const formattedText = this.formatForGrade(text);
      if (msgEl) {
        msgEl.textContent = formattedText;
        msgEl.style.animation = 'none';
        void msgEl.offsetHeight; // reflow
        msgEl.style.animation = 'bityTextFadeIn 0.3s ease-out';
      }

      // Animación suave de salto en el avatar
      const container = document.getElementById('bity-guide-avatar-container');
      if (container) {
        container.classList.remove('bounce');
        void container.offsetHeight; // reflow
        container.classList.add('bounce');
      }

      // Audio suave si está habilitado
      if (options.playAudio !== false) {
        this.audio.play('bitySpeak');
      }

      this.resetIdleTimer();
    }

    onBityAskHint() {
      const config = this.getCurrentMissionConfig();
      this.revealedHintsCount = (this.revealedHintsCount || 0) + 1;
      this.audio.play('click');

      // Ocasionalmente (~18% de las veces) un personaje invitado de Halloween saluda o anima
      const randGuest = Math.random();
      if (randGuest < 0.18 && this.currentGuideSpeaker === 'bity') {
        const guestTypes = ['ghost', 'vampire', 'frankenstein'];
        const chosenGuest = guestTypes[Math.floor(Math.random() * guestTypes.length)];
        const cheers = BITY_GUEST_CHEERS[chosenGuest] || [];
        const msg = cheers[Math.floor(Math.random() * cheers.length)] || '¡Excelente trabajo en tu misión!';
        this.speakGuide(msg, { speaker: chosenGuest, mood: 'happy', force: true, playAudio: true });
        return;
      }

      // Pista progresiva específica de la misión si está definida
      if (config.hints && config.hints[this.revealedHintsCount - 1]) {
        const rawHint = config.hints[this.revealedHintsCount - 1];
        this.speakGuide(rawHint, { speaker: 'bity', mood: 'thinking', force: true, playAudio: true });
        this.updateHintsUi();
        this.setStatus(`💡 Revelaste la pista ${this.revealedHintsCount} de ${config.hints.length}.`, 'info');
        return;
      }

      // Pistas pedagógicas adaptadas al grado
      const gList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade].pedagogical_hints) || [
        'Planificá el camino paso a paso antes de ejecutar.'
      ];
      const pIndex = (this.revealedHintsCount - 1) % gList.length;
      const msg = gList[pIndex];
      this.speakGuide(msg, { speaker: 'bity', mood: 'thinking', force: true, playAudio: true });
      this.setStatus('💡 Bity te ofrece una pista orientadora.', 'info');
    }

    resetIdleTimer() {
      if (this.idleTimerId) {
        clearTimeout(this.idleTimerId);
        this.idleTimerId = null;
      }
      this.idleTimerId = setTimeout(() => {
        if (!this.isRunning && !this.isPausedForMath) {
          this.triggerIdleGuideHint();
        }
      }, 26000);
    }

    triggerIdleGuideHint() {
      const gList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade].idle) || [
        'Recordá que podés pedir una pista si necesitás ayuda.'
      ];
      const msg = gList[Math.floor(Math.random() * gList.length)];
      this.speakGuide(msg, { speaker: 'bity', mood: 'idle', playAudio: false, force: true });
    }

        // -----------------------------------------------------------
    // Conmutación entre Portada y Vista de Juego
    // -----------------------------------------------------------
    showCoverView() {
      const coverView = document.getElementById('bityblockly-cover-view');
      const playView = document.getElementById('bityblockly-play-view');
      if (coverView) coverView.style.display = 'block';
      if (playView) playView.style.display = 'none';
      this.initCoverAnimation();
    }

    showPlayView() {
      const coverView = document.getElementById('bityblockly-cover-view');
      const playView = document.getElementById('bityblockly-play-view');
      if (coverView) coverView.style.display = 'none';
      if (playView) playView.style.display = 'block';
      if (this.coverFrameId) {
        cancelAnimationFrame(this.coverFrameId);
        this.coverFrameId = null;
      }
    }

    selectGrade(gradeNum) {
      this.currentGrade = Math.max(1, Math.min(5, gradeNum));
      this.currentLevelIndex = 1;

      // Sincronizar atributos de grado para CSS exclusivo de 1.º grado
      const screenEl = document.getElementById('screen-bityblockly');
      if (screenEl) {
        screenEl.setAttribute('data-bity-grade', String(this.currentGrade));
      }
      if (document.body) {
        document.body.setAttribute('data-active-bity-grade', String(this.currentGrade));
      }

      this.showPlayView();
      this.updateGradeHeader();
      this.updateBlockLabelsForGrade();
      this.renderLevelTabs();
      this.loadLevel(1);
    }

    updateGradeHeader() {
      const badgeEl = document.getElementById('bityblockly-sub-badge');
      if (!badgeEl) return;
      const gData = BITYBLOCKLY_GRADES_DATA[this.currentGrade];
      if (gData) {
        badgeEl.textContent = gData.title + ' • ' + gData.tag;
      }
    }


    updateLivesUi() {
      const currentLives = typeof this.lives === 'number' ? this.lives : 3;
      let heartsStr = '';
      for (let i = 0; i < 3; i++) {
        heartsStr += (i < currentLives) ? '❤️' : '🖤';
      }
      const hudHearts = document.getElementById('bityblockly-lives-hearts');
      if (hudHearts) hudHearts.textContent = heartsStr;
      const modalHearts = document.getElementById('math-modal-lives-hearts');
      if (modalHearts) modalHearts.textContent = heartsStr;
    }

    isDoorOpen(x, y) {
      if (!this.openedDoors) return false;
      return this.openedDoors.has(`${x},${y}`);
    }

    openDoor(x, y) {
      if (!this.openedDoors) this.openedDoors = new Set();
      this.openedDoors.add(`${x},${y}`);
      this.doorOpen = true;
    }

    showInstructionConceptModal(onStartCallback) {
      const modal = document.getElementById('bityblockly-instruction-concept-modal');
      if (!modal) {
        if (onStartCallback) onStartCallback();
        return;
      }
      const btnStart = document.getElementById('btn-bityblockly-start-instruction-challenge');
      if (btnStart) {
        btnStart.onclick = () => {
          modal.classList.remove('active');
          if (onStartCallback) onStartCallback();
        };
      }
      modal.classList.add('active');
    }

    triggerInstructionSummaryModal() {
      const modal = document.getElementById('bityblockly-instruction-summary-modal');
      if (!modal) return;

      const totalEl = document.getElementById('bityblockly-summary-total-count');
      const movesEl = document.getElementById('bityblockly-summary-moves-count');
      const turnsEl = document.getElementById('bityblockly-summary-turns-count');
      const routeEl = document.getElementById('bityblockly-summary-route-name');
      const reflectionEl = document.getElementById('bityblockly-summary-reflection-text');

      const total = this.instructionsExecuted || 0;
      const moves = this.movesExecuted || 0;
      const turns = this.turnsExecuted || 0;

      if (totalEl) totalEl.textContent = total;
      if (movesEl) movesEl.textContent = moves;
      if (turnsEl) turnsEl.textContent = turns;

      let routeName = `Camino completado (${total} instrucciones)`;
      if (this.currentGrade === 1) {
        if (total === 9) routeName = 'Camino A (Ruta Directa • 9 instrucciones)';
        else if (total === 12) routeName = 'Camino B (Ruta Alternativa • 12 instrucciones)';
        else routeName = `Ruta Personalizada (${total} instrucciones)`;
      } else if (this.currentGrade === 2) {
        if (total === 11) routeName = 'Camino A (Ruta Directa • 11 instrucciones)';
        else if (total === 14) routeName = 'Camino B (Ruta Alternativa • 14 instrucciones)';
        else routeName = `Ruta Personalizada (${total} instrucciones)`;
      } else if (this.currentGrade === 3) {
        if (total === 13) routeName = 'Ruta A (Vía Directa • 13 instrucciones)';
        else if (total === 15) routeName = 'Ruta B (Vía Central • 15 instrucciones)';
        else if (total === 17) routeName = 'Ruta C (Vía Baja • 17 instrucciones)';
        else routeName = `Ruta Personalizada (${total} instrucciones)`;
      } else if (this.currentGrade === 4) {
        if (total === 14) routeName = 'Ruta A (Galería Norte • 14 instrucciones)';
        else if (total === 16) routeName = 'Ruta B (Pasillo Central • 16 instrucciones)';
        else if (total === 18) routeName = 'Ruta C (Galería Baja • 18 instrucciones)';
        else routeName = `Ruta Personalizada (${total} instrucciones)`;
      } else if (this.currentGrade === 5) {
        if (total === 16) routeName = 'Ruta A (Almenas Altas • 16 instrucciones)';
        else if (total === 20) routeName = 'Ruta B (Patio Central • 20 instrucciones)';
        else if (total === 22) routeName = 'Ruta C (Canal de Sombras • 22 instrucciones)';
        else routeName = `Ruta Personalizada (${total} instrucciones)`;
      }

      if (routeEl) routeEl.textContent = this.formatForGrade(routeName);

      if (reflectionEl) {
        reflectionEl.textContent = this.formatForGrade('¿Pudiste haber llegado a la meta con menos instrucciones? ¿Qué camino fue más corto y cuál más largo? ¡Compartí tu estrategia con tus compañeros y tu profe!');
      }

      const btnRetry = document.getElementById('btn-bityblockly-summary-retry');
      if (btnRetry) {
        btnRetry.onclick = () => {
          modal.classList.remove('active');
          this.loadLevel(this.currentLevelIndex);
        };
      }

      const btnNext = document.getElementById('btn-bityblockly-summary-next');
      if (btnNext) {
        btnNext.onclick = () => {
          modal.classList.remove('active');
          this.showCoverView();
        };
      }

      modal.classList.add('active');
    }

    renderLevelTabs() {
      const tabsWrap = document.getElementById('bityblockly-levels-tabs');
      if (!tabsWrap) return;

      const gData = BITYBLOCKLY_GRADES_DATA[this.currentGrade];
      const missions = gData ? gData.missions : BITYBLOCKLY_LEVELS;

      tabsWrap.innerHTML = '';
      missions.forEach((m, idx) => {
        const lvlNum = idx + 1;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `bityblockly-tab-btn ${lvlNum === this.currentLevelIndex ? 'active' : ''}`;
        btn.dataset.level = lvlNum;
        btn.title = m.name || m.title;

        let label = `Nivel ${lvlNum}`;
        if (m.isFinalChallenge) {
          label = '🎯 Desafío Final';
        } else if (this.currentGrade === 4) {
          const g4Labels = ['🧙 Laberinto 1', '🎃 Laberinto 2', '🏰 Laberinto 3', '🃏 Cartas 100', '🧪 Reactor', '🛡️ Escudo', '🎯 Desafío Final'];
          label = g4Labels[idx] || `Nivel ${lvlNum}`;
        } else if (this.currentGrade === 5) {
          const g5Labels = ['🏰 Laberinto 1', '🌲 Laberinto 2', '🎃 Laberinto 3', '🔥 Turbinas', '❓ Incógnita', '⚡ Energía', '🗝️ Código', '🎯 Desafío Final'];
          label = g5Labels[idx] || `Nivel ${lvlNum}`;
        } else if (this.currentGrade === 2) {
          const g2Labels = ['⚡ Baterías', '🎃 Calabazas', '🚪 Compuerta', '🎯 Desafío Final'];
          label = g2Labels[idx] || `Nivel ${lvlNum}`;
        } else if (this.currentGrade === 3) {
          const g3Labels = ['🚂 Parada 1', '⚡ Parada 2', '💎 Parada 3', '👻 Laberinto', '🎯 Desafío Final'];
          label = g3Labels[idx] || `Nivel ${lvlNum}`;
        } else {
          const g1Icons = ['🪐', '🌙', '🌌', '⚡', '🚀', '🎯'];
          label = idx === 5 ? '🎯 Desafío Final' : `${g1Icons[idx] || '🚀'} Nivel ${lvlNum}`;
        }

        btn.innerHTML = `<span>${this.formatForGrade(label)}</span>`;
        btn.onclick = () => {
          this.loadLevel(lvlNum);
          this.audio.play('click');
        };
        tabsWrap.appendChild(btn);
      });

      // Botón de sonido
      const soundBtn = document.createElement('button');
      soundBtn.type = 'button';
      soundBtn.id = 'btn-bityblockly-sound';
      soundBtn.className = 'btn-bityblockly-sound';
      soundBtn.title = 'Activar/Silenciar sonido';
      soundBtn.textContent = this.audio.enabled ? '🔊' : '🔇';
      soundBtn.onclick = () => {
        const enabled = this.audio.toggle();
        soundBtn.textContent = enabled ? '🔊' : '🔇';
        if (enabled) this.audio.play('click');
      };
      tabsWrap.appendChild(soundBtn);
    }

    // -----------------------------------------------------------
    // Animación de Portada (Nave espacial hacia Planeta Embrujado)
    // -----------------------------------------------------------
    initCoverAnimation() {
      if (!this.coverCanvas || !this.coverCtx) return;
      if (this.coverFrameId) cancelAnimationFrame(this.coverFrameId);

      const ctx = this.coverCtx;
      if (typeof ctx.createRadialGradient !== 'function') return;

      const w = this.coverCanvas.width;
      const h = this.coverCanvas.height;

      // Generar estrellas fijas
      const stars = [];
      for (let i = 0; i < 70; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.05 + 0.02,
          phase: Math.random() * Math.PI * 2
        });
      }

      let t = 0;
      const animateCover = () => {
        t += 0.03;
        ctx.fillStyle = '#030712';
        ctx.fillRect(0, 0, w, h);

        // Nebulosa cósmica de fondo
        const grad = ctx.createRadialGradient(w * 0.75, h * 0.5, 20, w * 0.75, h * 0.5, 220);
        grad.addColorStop(0, 'rgba(168, 85, 247, 0.45)');
        grad.addColorStop(0.5, 'rgba(234, 88, 12, 0.25)');
        grad.addColorStop(1, 'rgba(3, 7, 18, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Dibujar estrellas parpadeantes
        stars.forEach(s => {
          const alpha = 0.4 + 0.6 * Math.sin(t * 1.5 + s.phase);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.2, alpha)})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        });

        // 1. Dibujar Planeta Embrujado de las Calabazas
        const px = w * 0.8;
        const py = h * 0.5;
        const pr = 65;

        // Aura del planeta
        const aura = ctx.createRadialGradient(px, py, pr * 0.8, px, py, pr * 1.4);
        aura.addColorStop(0, 'rgba(251, 146, 60, 0.4)');
        aura.addColorStop(1, 'rgba(251, 146, 60, 0)');
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(px, py, pr * 1.4, 0, Math.PI * 2);
        ctx.fill();

        // Cuerpo del planeta (esfera calabaza)
        const planetGrad = ctx.createRadialGradient(px - 15, py - 15, 10, px, py, pr);
        planetGrad.addColorStop(0, '#f97316');
        planetGrad.addColorStop(0.7, '#c2410c');
        planetGrad.addColorStop(1, '#431407');
        ctx.fillStyle = planetGrad;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();

        // Anillo de polvo cósmico / telaraña
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(-0.35);
        ctx.strokeStyle = 'rgba(216, 180, 254, 0.6)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.ellipse(0, 0, pr * 1.6, pr * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Ojos y sonrisa luminosa de calabaza en el planeta
        ctx.fillStyle = 'rgba(254, 240, 138, 0.9)';
        ctx.beginPath(); // Ojo izq
        ctx.moveTo(px - 25, py - 15);
        ctx.lineTo(px - 15, py - 10);
        ctx.lineTo(px - 22, py - 5);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath(); // Ojo der
        ctx.moveTo(px - 5, py - 16);
        ctx.lineTo(px + 8, py - 12);
        ctx.lineTo(px - 2, py - 6);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath(); // Sonrisa
        ctx.arc(px - 10, py + 8, 16, 0.2, Math.PI - 0.2, false);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(254, 240, 138, 0.9)';
        ctx.stroke();

        // 2. Dibujar Nave Espacial viajando hacia el planeta
        const shipX = w * 0.22 + Math.sin(t * 0.8) * 20;
        const shipY = h * 0.52 + Math.cos(t * 0.9) * 14;

        ctx.save();
        ctx.translate(shipX, shipY);
        ctx.rotate(0.18 + Math.sin(t) * 0.05);

        // Llamas propulsoras animadas
        const flameLen = 25 + Math.random() * 14;
        const flameGrad = ctx.createLinearGradient(-35, 0, -35 - flameLen, 0);
        flameGrad.addColorStop(0, '#fde047');
        flameGrad.addColorStop(0.5, '#f97316');
        flameGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = flameGrad;
        ctx.beginPath();
        ctx.moveTo(-20, -7);
        ctx.lineTo(-20 - flameLen, 0);
        ctx.lineTo(-20, 7);
        ctx.closePath();
        ctx.fill();

        // Fuselaje
        ctx.fillStyle = '#f1f5f9';
        ctx.beginPath();
        ctx.moveTo(35, 0);
        ctx.quadraticCurveTo(0, -18, -20, -14);
        ctx.lineTo(-20, 14);
        ctx.quadraticCurveTo(0, 18, 35, 0);
        ctx.closePath();
        ctx.fill();

        // Alerones
        ctx.fillStyle = '#ea580c';
        ctx.beginPath();
        ctx.moveTo(-10, -14);
        ctx.lineTo(-25, -24);
        ctx.lineTo(-18, -12);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(-10, 14);
        ctx.lineTo(-25, 24);
        ctx.lineTo(-18, 12);
        ctx.closePath();
        ctx.fill();

        // Ventana de cabina
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(8, 0, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        this.coverFrameId = requestAnimationFrame(animateCover);
      };

      animateCover();
    }

    // -----------------------------------------------------------
    // Carga y Gestión de Niveles / Misiones
    // -----------------------------------------------------------
    getCurrentMissionConfig() {
      const gData = BITYBLOCKLY_GRADES_DATA[this.currentGrade];
      const list = gData ? gData.missions : BITYBLOCKLY_LEVELS;
      return list[this.currentLevelIndex - 1] || list[0];
    }

    // Compatibilidad para suite existente
    getCurrentLevelConfig() {
      if (this.currentGrade === 1) {
        return BITYBLOCKLY_LEVELS.find(l => l.id === this.currentLevelIndex) || BITYBLOCKLY_LEVELS[0];
      }
      return this.getCurrentMissionConfig();
    }

    loadLevel(lvlNumber) {
      this.stopProgram();
      this.stopCinematic();

      const gData = BITYBLOCKLY_GRADES_DATA[this.currentGrade];
      const maxLvl = gData ? gData.missions.length : 5;
      this.currentLevelIndex = Math.max(1, Math.min(maxLvl, lvlNumber));

      const config = this.getCurrentMissionConfig();
      if (!config) return;

      this.revealedHintsCount = 0;
      this.doorOpen = false;
      this.openedDoors = new Set();
      this.doorQuestions = {};
      this.lives = 3;
      this.updateLivesUi();
      this.instructionsExecuted = 0;
      this.movesExecuted = 0;
      this.turnsExecuted = 0;
      this.blocks = [];
      this.currentStepIndex = -1;

      // Asegurar cierre de modales
      const vModal = document.getElementById('bityblockly-victory-modal');
      if (vModal) vModal.classList.remove('active');
      const cModal = document.getElementById('bityblockly-cinematic-modal');
      if (cModal) cModal.classList.remove('active');
      const mModal = document.getElementById('bityblockly-math-modal');
      if (mModal) mModal.classList.remove('active');
      const sModal = document.getElementById('bityblockly-instruction-summary-modal');
      if (sModal) sModal.classList.remove('active');
      const cpModal = document.getElementById('bityblockly-instruction-concept-modal');
      if (cpModal) cpModal.classList.remove('active');

      if (config.isFinalChallenge) {
        if (!this.conceptSeenPerGrade) this.conceptSeenPerGrade = {};
        if (!this.conceptSeenPerGrade[this.currentGrade]) {
          this.conceptSeenPerGrade[this.currentGrade] = true;
          this.showInstructionConceptModal();
        }
      }

      // Actualizar briefing y pestañas
      this.updateLevelUi();
      this.updateHintsUi();

      this.consecutiveErrors = 0;
      const startList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade].start) || [
        '¡Hola! Hoy tenemos una nueva misión.'
      ];
      const startMsg = startList[Math.floor(Math.random() * startList.length)];
      this.speakGuide(startMsg, { speaker: 'bity', mood: 'idle', force: true });

      const canvasCard = document.getElementById('bityblockly-canvas-card');
      const interactiveStage = document.getElementById('bityblockly-interactive-stage');
      const codingCol = document.getElementById('bityblockly-coding-col');

      if (config.type === 'maze' || (!config.type && config.grid)) {
        // Modo Laberinto con Programación por Bloques
        if (canvasCard) canvasCard.style.display = 'block';
        if (interactiveStage) interactiveStage.style.display = 'none';
        if (codingCol) codingCol.style.display = 'block';

        this.bityPos = { x: config.start.x, y: config.start.y, dir: config.start.dir };
        this.renderWorkspace();
        this.setStatus('¡Elegí cómo se mueve Byte! Agregá bloques para llevarlo a la nave espacial.', 'info');
        this.renderCanvas();
      } else {
        // Modo Desafío Interactivo Especial
        if (canvasCard) canvasCard.style.display = 'none';
        if (interactiveStage) interactiveStage.style.display = 'flex';
        if (codingCol) codingCol.style.display = 'none';

        this.renderInteractiveStage(config);
      }
    }

    updateLevelUi() {
      const config = this.getCurrentMissionConfig();
      const gData = BITYBLOCKLY_GRADES_DATA[this.currentGrade];
      const maxLvl = gData ? gData.missions.length : 5;

      // Pestañas
      const tabs = document.querySelectorAll('.bityblockly-tab-btn');
      tabs.forEach(t => {
        const lvl = parseInt(t.dataset.level) || 1;
        t.classList.toggle('active', lvl === this.currentLevelIndex);
      });

      // Briefing
      const nameEl = document.getElementById('bityblockly-level-title');
      const storyEl = document.getElementById('bityblockly-story-text');
      const hintEl = document.getElementById('bityblockly-hint-text');
      const badgeEl = document.getElementById('bityblockly-badge-text');

      if (nameEl) nameEl.textContent = this.formatForGrade(config.name || config.title);
      if (storyEl) storyEl.textContent = this.formatForGrade(config.story);
      if (hintEl) hintEl.textContent = this.formatForGrade(config.hint || '💡 Observá la consigna y utilizá las pistas progresivas si necesitás ayuda.');
      if (badgeEl) badgeEl.textContent = this.formatForGrade(`Nivel ${this.currentLevelIndex} de ${maxLvl}`);
    }

    // -----------------------------------------------------------
    // Sistema de Pistas Progresivas
    // -----------------------------------------------------------
    updateHintsUi() {
      const config = this.getCurrentMissionConfig();
      const countEl = document.getElementById('bityblockly-hint-count');
      const hintsBox = document.getElementById('bityblockly-progressive-hints-box');
      if (countEl) countEl.textContent = this.revealedHintsCount;
      if (hintsBox) {
        hintsBox.innerHTML = '';
        if (this.revealedHintsCount > 0 && config.hints) {
          hintsBox.style.display = 'flex';
          for (let i = 0; i < this.revealedHintsCount; i++) {
            if (config.hints[i]) {
              const b = document.createElement('div');
              b.className = 'hint-bubble';
              b.textContent = config.hints[i];
              hintsBox.appendChild(b);
            }
          }
        } else {
          hintsBox.style.display = 'none';
        }
      }
    }

    askProgressiveHint() {
      const config = this.getCurrentMissionConfig();
      const maxHints = (config.hints && config.hints.length) || 3;
      if (this.revealedHintsCount < maxHints) {
        this.revealedHintsCount++;
        this.audio.play('click');
        this.updateHintsUi();
        this.setStatus(`💡 Revelaste la pista ${this.revealedHintsCount} de ${maxHints}.`, 'info');
      } else {
        this.setStatus('💡 Ya tenés todas las pistas disponibles en pantalla.', 'info');
      }
    }

    // -----------------------------------------------------------
    // Escenarios Interactivos Especiales (2.º a 5.º Grado)
    // -----------------------------------------------------------
    renderInteractiveStage(config) {
      const stage = document.getElementById('bityblockly-interactive-stage');
      if (!stage) return;
      stage.innerHTML = '';

      if (config.type === 'math_story') {
        this.renderMathStoryStage(stage, config);
      } else if (config.type === 'ghost_train') {
        this.renderGhostTrainStage(stage, config);
      } else if (config.type === 'card_match_100') {
        this.renderCardMatch100Stage(stage, config);
      } else if (config.type === 'multi_engine_unlock') {
        this.renderMultiEngineStage(stage, config);
      } else if (config.type === 'missing_number_solver') {
        this.renderMissingNumberStage(stage, config);
      } else if (config.type === 'energy_route_planner') {
        this.renderEnergyRouteStage(stage, config);
      } else if (config.type === 'secret_code_maze') {
        this.renderSecretCodeStage(stage, config);
      }
    }

    // A. Misión con historia y opciones matemáticas (ej. 2.º Grado M1, M2)
    renderMathStoryStage(stage, config) {
      stage.innerHTML = `
        <div style="text-align: center; max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px;">
          <div style="font-size: 2.2rem; filter: drop-shadow(0 0 10px rgba(250, 204, 21, 0.5));">
            ${config.visualType === 'pumpkin_batteries' ? '🎃 ⚡ 🚀' : '🎃 🦇 🕳️'}
          </div>
          <div class="math-operation-box" style="margin: 0 auto;">
            <div class="math-equation-text" style="font-size: 2rem;">${config.equation}</div>
          </div>
          <div id="interactive-math-visual" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin: 8px 0;"></div>
          <div class="math-options-grid" id="interactive-math-options"></div>
          <div id="interactive-feedback-box" class="math-feedback-box">
            Elegí la respuesta correcta para completar la misión:
          </div>
        </div>
      `;

      const visualWrap = stage.querySelector('#interactive-math-visual');
      if (visualWrap) {
        if (config.visualType === 'pumpkin_batteries') {
          for (let i = 0; i < config.base; i++) {
            const c = document.createElement('span');
            c.textContent = '⚡';
            c.title = 'Batería inicial';
            c.style.cssText = 'font-size: 1.4rem; background: rgba(56, 189, 248, 0.2); padding: 4px 6px; border-radius: 6px; border: 1px solid #38bdf8;';
            visualWrap.appendChild(c);
          }
          for (let i = 0; i < config.added; i++) {
            const c = document.createElement('span');
            c.textContent = '🎃';
            c.title = 'Calabaza sumada';
            c.style.cssText = 'font-size: 1.4rem; background: rgba(251, 146, 60, 0.25); padding: 4px 6px; border-radius: 6px; border: 1px solid #fb923c;';
            visualWrap.appendChild(c);
          }
        } else if (config.visualType === 'pumpkins_lost') {
          const rem = config.total - config.lost;
          for (let i = 0; i < rem; i++) {
            const c = document.createElement('span');
            c.textContent = '🎃';
            c.title = 'Calabaza luminosa';
            c.style.cssText = 'font-size: 1.35rem; background: rgba(34, 197, 94, 0.2); padding: 3px 5px; border-radius: 6px; border: 1px solid #4ade80;';
            visualWrap.appendChild(c);
          }
          for (let i = 0; i < config.lost; i++) {
            const c = document.createElement('span');
            c.textContent = '❌';
            c.title = 'Calabaza en la cueva';
            c.style.cssText = 'font-size: 1.35rem; background: rgba(239, 68, 68, 0.2); padding: 3px 5px; border-radius: 6px; border: 1px solid #f87171; opacity: 0.6;';
            visualWrap.appendChild(c);
          }
        }
      }

      const optsGrid = stage.querySelector('#interactive-math-options');
      const feedback = stage.querySelector('#interactive-feedback-box');
      config.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn-math-option';
        btn.textContent = opt;
        btn.onclick = () => {
          if (opt === config.correctAnswer) {
            btn.classList.add('opt-correct');
            this.audio.play('success');
            feedback.className = 'math-feedback-box feedback-correct';
            feedback.innerHTML = `🎉 ¡EXCELENTE! ${config.explanation}`;
            optsGrid.querySelectorAll('.btn-math-option').forEach(b => b.disabled = true);
            setTimeout(() => {
              this.triggerVictory();
            }, 1200);
          } else {
            btn.classList.add('opt-wrong');
            this.audio.play('wrong');
            feedback.className = 'math-feedback-box feedback-wrong';
            feedback.textContent = '¡Casi! No te preocupes. Observá la ayuda visual o pedí una pista para intentar de nuevo.';
            setTimeout(() => btn.classList.remove('opt-wrong'), 600);
          }
        };
        optsGrid.appendChild(btn);
      });
    }

    // B. Desafío del Tren Fantasma Espacial (3.º Grado)
    renderGhostTrainStage(stage, config) {
      this.audio.play('ghostLaugh');
      stage.innerHTML = `
        <div class="ghost-train-wrapper">
          <div class="train-track-view">
            <div class="train-station-node station-active">
              <span class="station-badge">ESTACIÓN A</span>
              <span class="station-icon">🚉</span>
              <span class="station-passengers-info">+5 Pasajeros 👻</span>
            </div>
            <div class="train-connector-line">
              <span class="train-locomotive" style="position: absolute; left: 35%; top: -16px;">🚂👻</span>
            </div>
            <div class="train-station-node station-active">
              <span class="station-badge">ESTACIÓN B</span>
              <span class="station-icon">🚉</span>
              <span class="station-passengers-info">+2 👻 / −1 👻</span>
            </div>
            <div class="train-connector-line"></div>
            <div class="train-station-node station-active" style="border-color: #facc15;">
              <span class="station-badge">ESTACIÓN C (META)</span>
              <span class="station-icon">🏁</span>
              <span class="station-passengers-info" id="train-dest-info">¿Cuántos llegan?</span>
            </div>
          </div>

          <div style="background: rgba(30, 41, 59, 0.8); border: 2px solid #38bdf8; border-radius: 14px; padding: 14px 20px; text-align: center; max-width: 620px;">
            <p style="margin: 0 0 10px 0; font-size: 1.05rem; font-weight: 700; color: #f8fafc;">
              El tren parte <strong>sin pasajeros (0)</strong>.<br>
              En la <strong>Estación A</strong> suben <strong>5</strong>. En la <strong>Estación B</strong> suben <strong>2</strong> y baja <strong>1</strong>.<br>
              ¿Cuántos pasajeros llegan en total a la <strong>Estación C</strong>?
            </p>
            <div class="math-options-grid" style="grid-template-columns: repeat(3, 1fr); max-width: 380px; margin: 0 auto;">
              <button type="button" class="btn-math-option btn-train-opt" data-val="5">5 Pasajeros</button>
              <button type="button" class="btn-math-option btn-train-opt" data-val="6">6 Pasajeros</button>
              <button type="button" class="btn-math-option btn-train-opt" data-val="7">7 Pasajeros</button>
            </div>
          </div>

          <div id="train-feedback-box" class="math-feedback-box">
            Calculá el recorrido paso a paso y elegí cuántos pasajeros llegan:
          </div>
        </div>
      `;

      const fb = stage.querySelector('#train-feedback-box');
      const btns = stage.querySelectorAll('.btn-train-opt');
      btns.forEach(b => {
        b.onclick = () => {
          const val = parseInt(b.dataset.val);
          if (val === config.correctAnswer) {
            b.classList.add('opt-correct');
            this.audio.play('success');
            fb.className = 'math-feedback-box feedback-correct';
            fb.innerHTML = `🎉 ¡CORRECTO! ${config.explanation}`;
            btns.forEach(x => x.disabled = true);
            setTimeout(() => this.triggerVictory(), 1400);
          } else {
            b.classList.add('opt-wrong');
            this.audio.play('wrong');
            fb.className = 'math-feedback-box feedback-wrong';
            fb.textContent = '¡Casi! Revisá: en la estación A eran 5. En B: 5 + 2 = 7, pero baja 1: 7 − 1. ¡Probá otra vez!';
            setTimeout(() => b.classList.remove('opt-wrong'), 600);
          }
        };
      });
    }

    // C. Desafío de Parejas que suman 100 (4.º Grado)
    renderCardMatch100Stage(stage, config) {
      const cardsList = [];
      config.pairs.forEach(p => {
        cardsList.push({ val: p.a, pairId: `${p.a}_${p.b}` });
        cardsList.push({ val: p.b, pairId: `${p.a}_${p.b}` });
      });

      // Barajar determinístico sin parejas juntas
      cardsList.sort((a, b) => (Math.sin(a.val * 3) - Math.sin(b.val * 3)));

      this.cardMatchState = {
        pairsTotal: config.pairs.length,
        matchedCount: 0,
        selectedCard: null
      };

      stage.innerHTML = `
        <div class="cards-100-container">
          <div class="cards-100-header">
            <span style="font-weight: 800; color: #f1f5f9; font-size: 1.1rem;">🧪 LABORATORIO DE HECHIZOS</span>
            <span id="cards-counter-label" class="cards-counter-badge">Parejas: 0 / ${config.pairs.length}</span>
          </div>
          <div class="cards-100-grid" id="cards-grid-wrap"></div>
          <div id="cards-feedback-box" class="math-feedback-box">
            Tocá dos cartas mágicas que sumen exactamente 100:
          </div>
        </div>
      `;

      const grid = stage.querySelector('#cards-grid-wrap');
      const fb = stage.querySelector('#cards-feedback-box');
      const counterLabel = stage.querySelector('#cards-counter-label');

      cardsList.forEach((c, idx) => {
        const cardBtn = document.createElement('div');
        cardBtn.className = 'card-100-cell';
        cardBtn.textContent = c.val;
        cardBtn.dataset.val = c.val;
        cardBtn.dataset.index = idx;

        cardBtn.onclick = () => {
          if (cardBtn.classList.contains('card-matched')) return;
          if (this.cardMatchState.selectedCard === cardBtn) {
            cardBtn.classList.remove('card-selected');
            this.cardMatchState.selectedCard = null;
            return;
          }

          if (!this.cardMatchState.selectedCard) {
            this.cardMatchState.selectedCard = cardBtn;
            cardBtn.classList.add('card-selected');
            this.audio.play('click');
            fb.textContent = `Elegiste ${c.val}. ¿Cuál es su pareja para llegar a 100?`;
          } else {
            const first = this.cardMatchState.selectedCard;
            const val1 = parseInt(first.dataset.val);
            const val2 = parseInt(cardBtn.dataset.val);
            const sum = val1 + val2;

            if (sum === 100) {
              first.classList.remove('card-selected');
              first.classList.add('card-matched');
              cardBtn.classList.add('card-matched');
              this.audio.play('cardMatch');
              this.cardMatchState.matchedCount++;
              counterLabel.textContent = `Parejas: ${this.cardMatchState.matchedCount} / ${config.pairs.length}`;
              fb.className = 'math-feedback-box feedback-correct';
              fb.innerHTML = `🎉 ¡EXCELENTE! ${val1} + ${val2} = 100.`;
              this.cardMatchState.selectedCard = null;

              if (this.cardMatchState.matchedCount >= config.pairs.length) {
                setTimeout(() => {
                  this.triggerVictory();
                }, 1200);
              }
            } else {
              cardBtn.classList.add('opt-wrong');
              first.classList.add('opt-wrong');
              this.audio.play('wrong');
              fb.className = 'math-feedback-box feedback-wrong';
              fb.textContent = `${val1} + ${val2} = ${sum} (no suma 100). ¡Probá otra combinación!`;
              setTimeout(() => {
                first.classList.remove('card-selected', 'opt-wrong');
                cardBtn.classList.remove('opt-wrong');
                this.cardMatchState.selectedCard = null;
              }, 700);
            }
          }
        };

        grid.appendChild(cardBtn);
      });
    }

    // D. Desafío de Turbinas de Motores (5.º Grado Nivel 1)
    renderMultiEngineStage(stage, config) {
      this.enginesState = { currentStep: 0 };

      stage.innerHTML = `
        <div class="engines-stage-wrap">
          <div class="engines-grid">
            ${config.steps.map((st, i) => `
              <div class="engine-pod ${i === 0 ? 'pod-active' : ''}" id="engine-pod-${i}">
                <span class="station-badge">T${i + 1}</span>
                <span class="pod-flame">🔥</span>
                <span style="font-size:0.75rem; font-weight:800; color:#cbd5e1;">${st.turbineName.split(' ')[0]}</span>
              </div>
            `).join('')}
          </div>

          <div style="background: rgba(30, 41, 59, 0.85); border: 2px solid #38bdf8; border-radius: 14px; padding: 16px; text-align: center;">
            <span id="active-turbine-title" style="color: #facc15; font-size: 0.95rem; font-weight: 800; display: block; margin-bottom: 8px;">
              ${config.steps[0].turbineName}
            </span>
            <div id="active-turbine-equation" class="math-equation-text" style="font-size: 1.8rem; margin-bottom: 12px;">
              ${config.steps[0].equation}
            </div>
            <div id="active-turbine-options" class="math-options-grid"></div>
          </div>

          <div id="engines-feedback-box" class="math-feedback-box">
            Resolvé la operación para encender la primera turbina:
          </div>
        </div>
      `;

      this.updateEngineStepUi(stage, config);
    }

    updateEngineStepUi(stage, config) {
      const stepIdx = this.enginesState.currentStep;
      if (stepIdx >= config.steps.length) {
        this.triggerVictory();
        return;
      }

      const curStep = config.steps[stepIdx];
      const titleEl = stage.querySelector('#active-turbine-title');
      const eqEl = stage.querySelector('#active-turbine-equation');
      const optsGrid = stage.querySelector('#active-turbine-options');
      const fb = stage.querySelector('#engines-feedback-box');

      titleEl.textContent = curStep.turbineName;
      eqEl.textContent = curStep.equation;
      optsGrid.innerHTML = '';

      curStep.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn-math-option';
        btn.textContent = opt;

        btn.onclick = () => {
          if (opt === curStep.correctAnswer) {
            btn.classList.add('opt-correct');
            this.audio.play('success');
            const pod = stage.querySelector(`#engine-pod-${stepIdx}`);
            if (pod) {
              pod.classList.remove('pod-active');
              pod.classList.add('pod-ignited');
            }
            fb.className = 'math-feedback-box feedback-correct';
            fb.innerHTML = `🔥 ¡Turbina ${stepIdx + 1} encendida con éxito!`;
            optsGrid.querySelectorAll('.btn-math-option').forEach(b => b.disabled = true);

            setTimeout(() => {
              this.enginesState.currentStep++;
              const nextPod = stage.querySelector(`#engine-pod-${this.enginesState.currentStep}`);
              if (nextPod) nextPod.classList.add('pod-active');
              this.updateEngineStepUi(stage, config);
            }, 1000);
          } else {
            btn.classList.add('opt-wrong');
            this.audio.play('wrong');
            fb.className = 'math-feedback-box feedback-wrong';
            fb.textContent = '¡Cálculo inexacto! Revisá el orden de las operaciones y volvé a probar.';
            setTimeout(() => btn.classList.remove('opt-wrong'), 600);
          }
        };
        optsGrid.appendChild(btn);
      });
    }

    // E. Desafío del Número Perdido (5.º Grado Nivel 2)
    renderMissingNumberStage(stage, config) {
      stage.innerHTML = `
        <div class="missing-number-wrap">
          <div class="equation-card-large">
            21 + <span class="blank-box-highlight" id="missing-blank-slot">?</span> − 7 = 48
          </div>
          <div style="background: rgba(30, 41, 59, 0.85); border: 1px solid #475569; border-radius: 12px; padding: 14px 20px; text-align: center; max-width: 580px;">
            <p style="margin: 0 0 10px 0; font-size: 1.05rem; color: #f1f5f9; font-weight: 700;">
              ¿Qué número falta para que la igualdad sea correcta?
            </p>
            <div class="math-options-grid" style="grid-template-columns: repeat(3, 1fr); max-width: 380px; margin: 0 auto;">
              ${config.options.map(opt => `
                <button type="button" class="btn-math-option btn-missing-opt" data-val="${opt}">${opt}</button>
              `).join('')}
            </div>
          </div>
          <div id="missing-feedback-box" class="math-feedback-box">
            Pensá qué número sumado a 21 y restado 7 da como resultado final 48:
          </div>
        </div>
      `;

      const fb = stage.querySelector('#missing-feedback-box');
      const blank = stage.querySelector('#missing-blank-slot');
      const btns = stage.querySelectorAll('.btn-missing-opt');

      btns.forEach(b => {
        b.onclick = () => {
          const val = parseInt(b.dataset.val);
          blank.textContent = val;
          if (val === config.correctAnswer) {
            b.classList.add('opt-correct');
            this.audio.play('success');
            fb.className = 'math-feedback-box feedback-correct';
            fb.innerHTML = '🎉 ¡EXCELENTE RAZONAMIENTO! 21 + 34 − 7 = 55 − 7 = 48.';
            btns.forEach(x => x.disabled = true);
            setTimeout(() => this.triggerVictory(), 1400);
          } else {
            b.classList.add('opt-wrong');
            this.audio.play('wrong');
            fb.className = 'math-feedback-box feedback-wrong';
            fb.textContent = `Con ${val}: 21 + ${val} − 7 = ${21 + val - 7} (no da 48). ¡Pedí una pista si la necesitás!`;
            setTimeout(() => b.classList.remove('opt-wrong'), 700);
          }
        };
      });
    }

    // F. Desafío de la Ruta de Energía (5.º Grado Nivel 3)
    renderEnergyRouteStage(stage, config) {
      this.energyRouteState = {
        currentEnergy: config.initialEnergy,
        selectedNodes: []
      };

      stage.innerHTML = `
        <div class="energy-route-wrap">
          <div class="energy-gauge-box">
            <div class="gauge-header">
              <span style="color:#cbd5e1;">ENERGÍA INICIAL: ${config.initialEnergy}</span>
              <span id="route-current-energy" style="color:#facc15; font-size:1.15rem;">ACTUAL: ${config.initialEnergy}</span>
              <span style="color:#4ade80;">META: ${config.targetEnergy}</span>
            </div>
            <div class="gauge-bar-bg">
              <div id="route-gauge-fill" class="gauge-bar-fill" style="width: ${(config.initialEnergy / config.targetEnergy) * 100}%;"></div>
            </div>
          </div>

          <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #475569; border-radius: 12px; padding: 12px;">
            <span style="display:block; font-size:0.85rem; font-weight:800; color:#94a3b8; margin-bottom:8px; text-align:center;">
              NODOS DE ENERGÍA DISPONIBLES:
            </span>
            <div class="energy-nodes-palette">
              ${config.nodes.map(n => `
                <button type="button" class="btn-energy-node" data-val="${n.value}" data-lbl="${n.label}">
                  ${n.label}
                </button>
              `).join('')}
            </div>
          </div>

          <div style="text-align: center;">
            <span style="display:block; font-size:0.85rem; color:#cbd5e1; margin-bottom:6px;">SECUENCIA DE NODOS APLICADOS:</span>
            <div id="route-sequence-chips" style="min-height: 38px; display:flex; flex-wrap:wrap; gap:6px; justify-content:center; background:rgba(15,23,42,0.8); border:1px dashed #64748b; border-radius:8px; padding:6px 10px;">
              <span style="color:#64748b; font-size:0.85rem;">(Tocá los nodos para agregarlos)</span>
            </div>
          </div>

          <div style="display: flex; gap: 10px; justify-content: center;">
            <button type="button" id="btn-route-check" class="btn-blockly-run" style="flex: 1; max-width: 280px;">
              <span>⚡</span> COMPROBAR META
            </button>
            <button type="button" id="btn-route-reset" class="btn-blockly-reset" style="max-width: 140px;">
              <span>🔄</span> Reiniciar
            </button>
          </div>

          <div id="route-feedback-box" class="math-feedback-box">
            Elegí la combinación de nodos para que la energía llegue exactamente a ${config.targetEnergy}:
          </div>
        </div>
      `;

      const fill = stage.querySelector('#route-gauge-fill');
      const curTxt = stage.querySelector('#route-current-energy');
      const chipsWrap = stage.querySelector('#route-sequence-chips');
      const fb = stage.querySelector('#route-feedback-box');
      const checkBtn = stage.querySelector('#btn-route-check');
      const resetBtn = stage.querySelector('#btn-route-reset');

      stage.querySelectorAll('.btn-energy-node').forEach(nb => {
        nb.onclick = () => {
          const val = parseInt(nb.dataset.val);
          const lbl = nb.dataset.lbl;
          this.energyRouteState.selectedNodes.push({ val, lbl });
          this.energyRouteState.currentEnergy += val;
          this.audio.play('add');

          curTxt.textContent = `ACTUAL: ${this.energyRouteState.currentEnergy}`;
          const pct = Math.max(0, Math.min(100, (this.energyRouteState.currentEnergy / config.targetEnergy) * 100));
          fill.style.width = `${pct}%`;

          chipsWrap.innerHTML = '';
          this.energyRouteState.selectedNodes.forEach(item => {
            const chip = document.createElement('span');
            chip.style.cssText = 'background: #334155; border: 1px solid #64748b; color: #f8fafc; font-size: 0.8rem; font-weight: 700; padding: 2px 8px; border-radius: 6px;';
            chip.textContent = item.lbl;
            chipsWrap.appendChild(chip);
          });
        };
      });

      resetBtn.onclick = () => {
        this.energyRouteState.currentEnergy = config.initialEnergy;
        this.energyRouteState.selectedNodes = [];
        this.audio.play('bump');
        curTxt.textContent = `ACTUAL: ${config.initialEnergy}`;
        fill.style.width = `${(config.initialEnergy / config.targetEnergy) * 100}%`;
        chipsWrap.innerHTML = '<span style="color:#64748b; font-size:0.85rem;">(Tocá los nodos para agregarlos)</span>';
        fb.className = 'math-feedback-box';
        fb.textContent = `Energía reiniciada en ${config.initialEnergy}. Volvé a planificar tu secuencia.`;
      };

      checkBtn.onclick = () => {
        if (this.energyRouteState.currentEnergy === config.targetEnergy) {
          this.audio.play('success');
          fb.className = 'math-feedback-box feedback-correct';
          fb.innerHTML = `🎉 ¡OBJETIVO LOGRADO! La energía llegó exactamente a ${config.targetEnergy}.`;
          checkBtn.disabled = true;
          setTimeout(() => this.triggerVictory(), 1400);
        } else {
          this.audio.play('wrong');
          fb.className = 'math-feedback-box feedback-wrong';
          fb.textContent = `La energía actual es ${this.energyRouteState.currentEnergy}. No coincide con la meta (${config.targetEnergy}). ¡Reajustá los nodos!`;
        }
      };
    }

    // G. Desafío de Código Secreto (5.º Grado Nivel 4)
    renderSecretCodeStage(stage, config) {
      this.secretCodeState = {
        solvedDials: [false, false, false, false],
        activeDial: 0
      };

      stage.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 14px; max-width: 600px; margin: 0 auto; text-align: center;">
          <div class="secret-code-dials-grid">
            ${config.codeChallenges.map((ch, i) => `
              <div class="code-dial-card ${i === 0 ? 'code-dial-active' : ''}" id="dial-card-${i}">
                <span style="font-size:0.75rem; font-weight:800; color:#94a3b8;">${ch.label}</span>
                <span id="dial-val-${i}" style="font-size:1.4rem; font-weight:900; color:#facc15;">🗝️</span>
              </div>
            `).join('')}
          </div>

          <div style="background: rgba(30, 41, 59, 0.85); border: 2px solid #38bdf8; border-radius: 14px; padding: 16px;">
            <span id="dial-challenge-title" style="color: #facc15; font-size: 0.95rem; font-weight: 800; display: block; margin-bottom: 6px;">
              ${config.codeChallenges[0].label}
            </span>
            <div id="dial-equation-text" class="math-equation-text" style="font-size: 1.8rem; margin-bottom: 12px;">
              ${config.codeChallenges[0].q}
            </div>
            <div id="dial-options-grid" class="math-options-grid"></div>
          </div>

          <div id="dial-feedback-box" class="math-feedback-box">
            Descifrá cada cifra del código secreto para habilitar el núcleo:
          </div>
        </div>
      `;

      this.updateDialChallengeUi(stage, config);
    }

    updateDialChallengeUi(stage, config) {
      const idx = this.secretCodeState.activeDial;
      if (idx >= config.codeChallenges.length) {
        const fb = stage.querySelector('#dial-feedback-box');
        fb.className = 'math-feedback-box feedback-correct';
        fb.innerHTML = '🎉 ¡CÓDIGO SECRETO DESCIFRADO! Pasando al laberinto del núcleo...';
        this.audio.play('doorUnlock');

        setTimeout(() => {
          config.type = 'maze';
          this.loadLevel(this.currentLevelIndex);
        }, 1200);
        return;
      }

      const curCh = config.codeChallenges[idx];
      const titleEl = stage.querySelector('#dial-challenge-title');
      const eqEl = stage.querySelector('#dial-equation-text');
      const optsGrid = stage.querySelector('#dial-options-grid');
      const fb = stage.querySelector('#dial-feedback-box');

      titleEl.textContent = curCh.label;
      eqEl.textContent = curCh.q;
      optsGrid.innerHTML = '';

      curCh.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn-math-option';
        btn.textContent = opt;

        btn.onclick = () => {
          if (opt === curCh.answer) {
            btn.classList.add('opt-correct');
            this.audio.play('success');
            const dialVal = stage.querySelector(`#dial-val-${idx}`);
            const dialCard = stage.querySelector(`#dial-card-${idx}`);
            if (dialVal) dialVal.textContent = opt;
            if (dialCard) {
              dialCard.classList.remove('code-dial-active');
              dialCard.classList.add('dial-solved');
            }
            this.secretCodeState.solvedDials[idx] = true;
            fb.className = 'math-feedback-box feedback-correct';
            fb.innerHTML = `🎉 ¡Cifra ${idx + 1} desbloqueada: ${opt}!`;

            setTimeout(() => {
              this.secretCodeState.activeDial++;
              this.updateDialChallengeUi(stage, config);
            }, 900);
          } else {
            btn.classList.add('opt-wrong');
            this.audio.play('wrong');
            fb.className = 'math-feedback-box feedback-wrong';
            fb.textContent = '¡Cifra incorrecta! Revisá la operación y volvé a intentar.';
            setTimeout(() => btn.classList.remove('opt-wrong'), 600);
          }
        };
        optsGrid.appendChild(btn);
      });
    }

    // -----------------------------------------------------------
    // Manipulación de Bloques y Estado de Laberinto
    // -----------------------------------------------------------
    resetLevelState(keepBlocks = true) {
      this.stopProgram();
      const config = this.getCurrentMissionConfig();
      this.doorOpen = false;
      if (config.start) {
        this.bityPos = { x: config.start.x, y: config.start.y, dir: config.start.dir };
      }
      this.currentStepIndex = -1;
      this.bumpAnimation = null;
      if (!keepBlocks) {
        this.blocks = [];
      }
      this.renderWorkspace();
      this.setStatus('Byte volvió al punto de partida. ¡Listo para probar otra vez!', 'info');
      this.renderCanvas();
    }

    addBlock(type) {
      if (this.isRunning) return;
      if (this.blocks.length >= this.maxBlocks) {
        this.setStatus('¡Llegaste al límite de bloques! Probá optimizar tu recorrido.', 'warning');
        this.audio.play('bump');
        return;
      }
      this.blocks.push(type);
      this.audio.play('add');
      this.renderWorkspace();
      this.setStatus(`Agregaste un bloque de ${this.getBlockLabel(type).toLowerCase()}.`, 'info');

      if (type === 'left' || type === 'right') {
        const turnList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade].turn) || [];
        const turnMsg = turnList[Math.floor(Math.random() * turnList.length)] || '¡El camino cambia de dirección! Para seguir, quizás necesites girar.';
        this.speakGuide(turnMsg, { mood: 'thinking' });
      } else {
        const codeList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade].coding) || [];
        const codeMsg = codeList[Math.floor(Math.random() * codeList.length)] || 'Recordá que cada bloque representa una instrucción.';
        this.speakGuide(codeMsg, { mood: 'idle' });
      }
    }

    removeBlock(index) {
      if (this.isRunning) return;
      if (index >= 0 && index < this.blocks.length) {
        this.blocks.splice(index, 1);
        this.audio.play('click');
        this.renderWorkspace();
      }
    }

    moveBlock(index, delta) {
      if (this.isRunning) return;
      const target = index + delta;
      if (target >= 0 && target < this.blocks.length) {
        const item = this.blocks.splice(index, 1)[0];
        this.blocks.splice(target, 0, item);
        this.audio.play('click');
        this.renderWorkspace();
      }
    }

    clearBlocks() {
      if (this.isRunning) return;
      if (this.blocks.length === 0) return;
      this.blocks = [];
      this.audio.play('bump');
      this.renderWorkspace();
      this.setStatus('Se borraron todos los bloques de tu programa.', 'info');
    }

    getBlockLabel(type) {
      if (type === 'forward') return 'Avanzar';
      if (type === 'left') return 'Girar a la izquierda';
      if (type === 'right') return 'Girar a la derecha';
      return type;
    }

    getBlockIcon(type) {
      if (type === 'forward') return '⬆️';
      if (type === 'left') return '↩️';
      if (type === 'right') return '↪️';
      return '🧩';
    }

    renderWorkspace() {
      const listEl = document.getElementById('bityblockly-steps-list');
      const countEl = document.getElementById('bityblockly-blocks-count');
      if (countEl) {
        countEl.textContent = `(${this.blocks.length} / ${this.maxBlocks} bloques)`;
      }
      if (!listEl) return;

      if (this.blocks.length === 0) {
        listEl.innerHTML = `
          <div class="bityblockly-empty-program">
            <span class="bityblockly-empty-icon">👆</span>
            <strong>Tu programa está vacío</strong>
            <span>Tocá los botones de arriba para agregar instrucciones a Byte.</span>
          </div>
        `;
        return;
      }

      listEl.innerHTML = '';
      this.blocks.forEach((type, index) => {
        const item = document.createElement('div');
        item.className = `bityblockly-step-item step-${type}`;
        if (this.currentStepIndex === index) {
          item.classList.add('active-step');
        }

        item.innerHTML = `
          <span class="step-num-badge">${index + 1}</span>
          <span class="step-name">${this.getBlockIcon(type)} ${this.getBlockLabel(type)}</span>
          <div class="step-controls">
            <button type="button" class="btn-step-move btn-move-up" title="Mover arriba" ${index === 0 ? 'disabled style="opacity:0.3;"' : ''}>⬆</button>
            <button type="button" class="btn-step-move btn-move-down" title="Mover abajo" ${index === this.blocks.length - 1 ? 'disabled style="opacity:0.3;"' : ''}>⬇</button>
            <button type="button" class="btn-step-remove" title="Quitar bloque">✕</button>
          </div>
        `;

        const upBtn = item.querySelector('.btn-move-up');
        if (upBtn) upBtn.onclick = (e) => { e.stopPropagation(); this.moveBlock(index, -1); };

        const downBtn = item.querySelector('.btn-move-down');
        if (downBtn) downBtn.onclick = (e) => { e.stopPropagation(); this.moveBlock(index, 1); };

        const delBtn = item.querySelector('.btn-step-remove');
        if (delBtn) delBtn.onclick = (e) => { e.stopPropagation(); this.removeBlock(index); };

        listEl.appendChild(item);
      });
    }

    // -----------------------------------------------------------
    // Ejecución del Programa de Bloques
    // -----------------------------------------------------------
    runProgram() {
      if (this.isRunning) return;
      if (this.blocks.length === 0) {
        this.setStatus('¡Agregá al menos un bloque antes de ejecutar!', 'warning');
        this.audio.play('bump');
        return;
      }

      const config = this.getCurrentMissionConfig();
      if (!config.start) return;

      this.bityPos = { x: config.start.x, y: config.start.y, dir: config.start.dir };
      this.instructionsExecuted = 0;
      this.movesExecuted = 0;
      this.turnsExecuted = 0;
      this.isRunning = true;
      this.isPausedForMath = false;
      this.currentStepIndex = 0;

      this.updateRunButton(true);
      this.setStatus('▶️ Ejecutando secuencia paso por paso...', 'info');
      this.renderWorkspace();

      this.executeNextStep();
    }

    updateRunButton(running) {
      const btn = document.getElementById('btn-bityblockly-run');
      if (btn) {
        btn.disabled = running;
        btn.innerHTML = running ? '<span>⏳</span> EJECUTANDO...' : '<span>▶️</span> ¡EJECUTAR PROGRAMA!';
      }
    }

    stopProgram() {
      if (this.executionTimerId) {
        clearTimeout(this.executionTimerId);
        this.executionTimerId = null;
      }
      this.isRunning = false;
      this.isPausedForMath = false;
      this.currentStepIndex = -1;
      this.updateRunButton(false);
      this.renderWorkspace();
    }

    executeNextStep() {
      if (!this.isRunning || this.isPausedForMath) return;

      if (this.currentStepIndex >= this.blocks.length) {
        this.stopProgram();
        const config = this.getCurrentMissionConfig();
        if (config.goal && this.bityPos.x === config.goal.x && this.bityPos.y === config.goal.y) {
          this.triggerVictory();
        } else {
          this.consecutiveErrors = (this.consecutiveErrors || 0) + 1;
          const isRepeated = this.consecutiveErrors >= 2;
          const key = isRepeated ? 'repeated_error' : 'error';
          const errList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade][key]) || [];
          const errMsg = errList[Math.floor(Math.random() * errList.length)] || '¡Casi! Revisá si tus instrucciones son suficientes.';
          this.speakGuide(errMsg, { mood: 'alert', force: true });
          this.setStatus('Byte completó las instrucciones pero aún no llegó a la meta. ¡Agregá más bloques para continuar!', 'warning');
          this.audio.play('bump');
        }
        return;
      }

      this.renderWorkspace();
      const action = this.blocks[this.currentStepIndex];
      const config = this.getCurrentMissionConfig();

      this.instructionsExecuted = (this.instructionsExecuted || 0) + 1;

      if (action === 'left') {
        this.turnsExecuted = (this.turnsExecuted || 0) + 1;
        this.bityPos.dir = (this.bityPos.dir + 3) % 4;
        this.audio.play('turn');
        this.setStatus('↩️ Byte giró a la izquierda.', 'info');
        this.advanceStepDelay();
      } else if (action === 'right') {
        this.turnsExecuted = (this.turnsExecuted || 0) + 1;
        this.bityPos.dir = (this.bityPos.dir + 1) % 4;
        this.audio.play('turn');
        this.setStatus('↪️ Byte giró a la derecha.', 'info');
        this.advanceStepDelay();
      } else if (action === 'forward') {
        this.movesExecuted = (this.movesExecuted || 0) + 1;
        const deltas = [
          { dx: 0, dy: -1 }, // 0: N
          { dx: 1, dy: 0 },  // 1: E
          { dx: 0, dy: 1 },  // 2: S
          { dx: -1, dy: 0 }  // 3: W
        ];
        const d = deltas[this.bityPos.dir];
        const nextX = this.bityPos.x + d.dx;
        const nextY = this.bityPos.y + d.dy;

        if (nextX < 0 || nextX >= config.cols || nextY < 0 || nextY >= config.rows) {
          this.handleWallHit();
          return;
        }

        const cell = config.grid[nextY][nextX];

        if (cell === 1) {
          this.handleWallHit();
          return;
        }

        if (cell === 2 && !this.isDoorOpen(nextX, nextY)) {
          this.audio.play('bump');
          this.setStatus('⚡ ¡La compuerta está sellada con magia! Resolvé el cálculo para abrirla.', 'warning');
          this.triggerMathChallengeForDoor(nextX, nextY);
          return;
        }

        this.bityPos.x = nextX;
        this.bityPos.y = nextY;
        this.audio.play('step');

        if (cell === 3) {
          this.stopProgram();
          this.triggerVictory();
          return;
        }

        this.advanceStepDelay();
      }
    }

    advanceStepDelay() {
      this.executionTimerId = setTimeout(() => {
        this.currentStepIndex++;
        this.executeNextStep();
      }, 550);
    }

    handleWallHit() {
      this.audio.play('bump');
      this.bumpAnimation = { x: this.bityPos.x, y: this.bityPos.y, frame: 10 };
      this.consecutiveErrors = (this.consecutiveErrors || 0) + 1;
      this.stopProgram();

      const isRepeated = this.consecutiveErrors >= 2;
      const key = isRepeated ? 'repeated_error' : 'error';
      const errList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade][key]) || [];
      const errMsg = errList[Math.floor(Math.random() * errList.length)] || '¡No te preocupes! Podemos intentarlo otra vez.';
      this.speakGuide(errMsg, { mood: 'alert', force: true });
      this.setStatus('Byte chocó con un obstáculo. Revisá tus bloques y probá de nuevo.', 'error');
    }

    setStatus(message, type = 'info') {
      const banner = document.getElementById('bityblockly-status-banner');
      if (!banner) return;
      banner.className = `bityblockly-status-banner status-${type}`;
      let icon = '🤖';
      if (type === 'success') icon = '🎉';
      if (type === 'warning') icon = '⚠️';
      if (type === 'error') icon = '💥';
      banner.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    }

    // -----------------------------------------------------------
    // Desafío Matemático de Compuerta en Laberintos
    // -----------------------------------------------------------
    triggerMathChallenge() {
      // Compatibilidad con invocaciones sin coordenadas (usa la posición frontal del robot)
      const config = this.getCurrentMissionConfig();
      const deltas = [{ dx: 0, dy: -1 }, { dx: 1, dy: 0 }, { dx: 0, dy: 1 }, { dx: -1, dy: 0 }];
      const d = deltas[this.bityPos.dir] || { dx: 0, dy: 0 };
      const frontX = this.bityPos.x + d.dx;
      const frontY = this.bityPos.y + d.dy;
      this.triggerMathChallengeForDoor(frontX, frontY);
    }

    triggerMathChallengeForDoor(doorX, doorY) {
      this.isPausedForMath = true;
      this.currentDoorPos = { x: doorX, y: doorY };
      const doorKey = `${doorX},${doorY}`;

      if (!this.doorQuestions) this.doorQuestions = {};
      if (!this.doorQuestions[doorKey]) {
        this.doorQuestions[doorKey] = getRandomMathQuestion(this.currentGrade, this.lastQuestionId);
      }
      const math = this.doorQuestions[doorKey];
      this.lastQuestionId = math.id;

      const modal = document.getElementById('bityblockly-math-modal');
      if (!modal) return;

      this.updateLivesUi();

      const storyEl = document.getElementById('bityblockly-math-story');
      const eqEl = document.getElementById('bityblockly-math-equation');
      const visualEl = document.getElementById('bityblockly-math-visual');
      const optsGrid = document.getElementById('bityblockly-math-options');
      const feedbackEl = document.getElementById('bityblockly-math-feedback');

      const doorList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade].door) || [];
      const doorMsg = doorList[0] || '¡Llegaste a una compuerta mágica! Resolvé la cuenta para continuar.';
      this.speakGuide(doorMsg, { mood: 'thinking', force: true });

      if (storyEl) storyEl.textContent = this.formatForGrade(math.story);
      if (eqEl) eqEl.textContent = this.formatForGrade(math.operation);
      if (feedbackEl) {
        feedbackEl.className = 'math-feedback-box';
        feedbackEl.textContent = this.formatForGrade('Seleccioná la respuesta correcta para abrir la compuerta:');
      }

      // Renderizar ayuda visual
      if (visualEl) {
        visualEl.innerHTML = '';
        if (math.type === 'subtraction' && math.total) {
          for (let i = 0; i < math.total; i++) {
            const cell = document.createElement('div');
            const isRemaining = i < (math.total - math.used);
            cell.className = `battery-cell ${isRemaining ? 'cell-active' : 'cell-spent'}`;
            cell.innerHTML = isRemaining ? '⚡' : '✕';
            cell.title = isRemaining ? 'Carga disponible' : 'Carga consumida';
            visualEl.appendChild(cell);
          }
        } else if (math.type === 'addition' && math.base) {
          for (let i = 0; i < math.base; i++) {
            const cell = document.createElement('div');
            cell.className = 'battery-cell cell-active';
            cell.innerHTML = '⚡';
            visualEl.appendChild(cell);
          }
          for (let i = 0; i < math.added; i++) {
            const cell = document.createElement('div');
            cell.className = 'battery-cell cell-added';
            cell.innerHTML = '+⚡';
            visualEl.appendChild(cell);
          }
        } else {
          const hintDiv = document.createElement('div');
          hintDiv.style.cssText = 'color:#38bdf8; font-weight:700; font-size:1.05rem; padding:6px;';
          hintDiv.innerHTML = '🔢 <em>¡Pensá en la tabla o división correspondiente para encontrar el resultado!</em>';
          visualEl.appendChild(hintDiv);
        }
      }

      // Renderizar opciones
      if (optsGrid) {
        optsGrid.innerHTML = '';
        math.options.forEach(opt => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'btn-math-option';
          btn.textContent = opt;

          btn.onclick = () => {
            if (opt === math.correctAnswer) {
              btn.classList.add('opt-correct');
              this.audio.play('doorUnlock');
              const succList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade].success) || [];
              const succMsg = succList[Math.floor(Math.random() * succList.length)] || '¡Muy bien! ¡Lo estás logrando!';
              this.speakGuide(succMsg, { mood: 'celebrating', force: true });

              if (feedbackEl) {
                feedbackEl.className = 'math-feedback-box feedback-correct';
                feedbackEl.innerHTML = this.formatForGrade(`🎉 ¡EXCELENTE! ${math.explanation} ¡La compuerta se ha abierto!`);
              }
              optsGrid.querySelectorAll('.btn-math-option').forEach(b => b.disabled = true);

              setTimeout(() => {
                modal.classList.remove('active');
                this.openDoor(doorX, doorY);
                this.isPausedForMath = false;
                this.setStatus('¡Muy bien! La compuerta se abrió. Byte continúa su camino.', 'success');

                this.bityPos.x = doorX;
                this.bityPos.y = doorY;
                this.audio.play('step');
                this.advanceStepDelay();
              }, 1200);

            } else {
              btn.classList.add('opt-wrong');
              this.audio.play('wrong');
              this.lives = Math.max(0, (this.lives || 3) - 1);
              this.updateLivesUi();

              const wrgList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade].door_wrong) || [];
              const wrgMsg = wrgList[0] || '¡Casi! Te quedan vidas. Observá la ayuda visual e intentalo otra vez.';
              this.speakGuide(wrgMsg, { mood: 'alert', force: true });

              if (this.lives > 0) {
                if (feedbackEl) {
                  feedbackEl.className = 'math-feedback-box feedback-wrong';
                  feedbackEl.innerHTML = this.formatForGrade(`⚠️ ¡Casi! Perdiste 1 vida (te quedan ${this.lives}). Cambiamos la pregunta para que vuelvas a intentar:`);
                }
                optsGrid.querySelectorAll('.btn-math-option').forEach(b => b.disabled = true);

                setTimeout(() => {
                  const newQ = getRandomMathQuestion(this.currentGrade, math.id);
                  this.doorQuestions[doorKey] = newQ;
                  this.triggerMathChallengeForDoor(doorX, doorY);
                }, 1200);

              } else {
                if (feedbackEl) {
                  feedbackEl.className = 'math-feedback-box feedback-wrong';
                  feedbackEl.innerHTML = '⚡ ¡Se agotaron las vidas de Byte! Recargamos tus 3 vidas ❤️❤️❤️. Volviendo al inicio...';
                }
                optsGrid.querySelectorAll('.btn-math-option').forEach(b => b.disabled = true);

                setTimeout(() => {
                  modal.classList.remove('active');
                  this.lives = 3;
                  this.updateLivesUi();
                  this.stopProgram();
                  const cfg = this.getCurrentMissionConfig();
                  if (cfg.start) {
                    this.bityPos = { x: cfg.start.x, y: cfg.start.y, dir: cfg.start.dir };
                  }
                  this.setStatus('Vidas recargadas. Las puertas abiertas se mantienen abiertas. ¡Probá de nuevo!', 'info');
                  this.renderCanvas();
                }, 1800);
              }
            }
          };

          optsGrid.appendChild(btn);
        });
      }

      modal.classList.add('active');
    }

    // -----------------------------------------------------------
    // Victoria y Continuidad entre Niveles
    // -----------------------------------------------------------
    triggerVictory() {
      this.audio.play('victory');
      this.consecutiveErrors = 0;

      const vicList = (BITY_GUIDE_MESSAGES[this.currentGrade] && BITY_GUIDE_MESSAGES[this.currentGrade].victory) || [];
      const vicMsg = vicList[Math.floor(Math.random() * vicList.length)] || '¡Felicitaciones! Llegaste a la meta.';
      this.speakGuide(vicMsg, { mood: 'celebrating', force: true });

      if (!this.completedLevels.includes(this.currentLevelIndex)) {
        this.completedLevels.push(this.currentLevelIndex);
      }
      this.unlockedLevel = Math.max(this.unlockedLevel, this.currentLevelIndex + 1);

      this.saveProgress();

      const gData = BITYBLOCKLY_GRADES_DATA[this.currentGrade];
      const maxLvl = gData ? gData.missions.length : 5;
      const isFinalOfGrade = (this.currentLevelIndex >= maxLvl);

      const config = this.getCurrentMissionConfig();
      if (config && config.isFinalChallenge) {
        this.triggerInstructionSummaryModal();
        return;
      }

      // Si es el nivel 5 de 1.er grado -> Cinemática espacial
      if (this.currentGrade === 1 && this.currentLevelIndex === 5) {
        this.startMissionEndingCinematic();
        return;
      }

      const modal = document.getElementById('bityblockly-victory-modal');
      if (!modal) return;

      const titleEl = document.getElementById('bityblockly-victory-title');
      const subtitleEl = document.getElementById('bityblockly-victory-subtitle');
      const actionsEl = document.getElementById('bityblockly-victory-actions');

      if (!isFinalOfGrade) {
        const nextLvl = this.currentLevelIndex + 1;
        if (titleEl) titleEl.textContent = '¡NIVEL SUPERADO!';
        if (subtitleEl) subtitleEl.textContent = `¡Excelente trabajo! Byte superó la Misión ${this.currentLevelIndex}.`;

        if (actionsEl) {
          actionsEl.innerHTML = `
            <button type="button" class="btn-victory-retry" id="btn-victory-replay-current">
              <span>🔄</span> Reintentar
            </button>
            <button type="button" class="btn-victory-next" id="btn-victory-continue-next">
              <span>🚀</span> Continuar al nivel ${nextLvl}
            </button>
          `;

          const btnReplay = actionsEl.querySelector('#btn-victory-replay-current');
          if (btnReplay) btnReplay.onclick = () => {
            modal.classList.remove('active');
            this.loadLevel(this.currentLevelIndex);
          };

          const btnNext = actionsEl.querySelector('#btn-victory-continue-next');
          if (btnNext) btnNext.onclick = () => {
            modal.classList.remove('active');
            this.loadLevel(nextLvl);
          };
        }
      } else {
        // Victoria Final del Grado
        if (titleEl) titleEl.textContent = '🎉 ¡MISIÓN CUMPLIDA!';
        if (subtitleEl) subtitleEl.innerHTML = `
          ¡Completaste todos los desafíos de <strong>${gData ? gData.title : 'este grado'}</strong>!<br>
          <span style="color:#facc15; font-size:1.1rem; display:block; margin-top:6px;">¡Sos un verdadero explorador matemático de Halloween!</span>
        `;

        if (actionsEl) {
          actionsEl.innerHTML = `
            <button type="button" class="btn-victory-retry" id="btn-victory-replay-grade">
              <span>🔄</span> Volver a jugar
            </button>
            <button type="button" class="btn-victory-next" id="btn-victory-back-cover" style="background: linear-gradient(180deg, #ea580c, #c2410c);">
              <span>🎃</span> Elegir otro grado
            </button>
          `;

          const btnReplay = actionsEl.querySelector('#btn-victory-replay-grade');
          if (btnReplay) btnReplay.onclick = () => {
            modal.classList.remove('active');
            this.loadLevel(1);
          };

          const btnCover = actionsEl.querySelector('#btn-victory-back-cover');
          if (btnCover) btnCover.onclick = () => {
            modal.classList.remove('active');
            this.showCoverView();
          };
        }
      }

      modal.classList.add('active');
    }

    // -----------------------------------------------------------
    // Cinemática de Despegue Espacial (Exclusivo 1.er Grado Nivel 5)
    // -----------------------------------------------------------
    startMissionEndingCinematic() {
      this.isCinematicPlaying = true;
      const modal = document.getElementById('bityblockly-cinematic-modal');
      const canvas = document.getElementById('bityblockly-cinematic-canvas');
      const subtitle = document.getElementById('bityblockly-cinematic-subtitle');
      const finalCard = document.getElementById('bityblockly-final-celebration-card');

      if (!modal || !canvas) return;

      modal.classList.add('active');
      if (finalCard) finalCard.style.display = 'none';

      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;

      let startTime = null;
      let scene = 1;

      const loop = (timestamp) => {
        if (!this.isCinematicPlaying) return;
        if (!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime) / 1000;

        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, w, h);

        // Estrellas
        for (let i = 0; i < 40; i++) {
          const sx = (i * 37) % w;
          const sy = (i * 29) % (h - 60);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + 0.4 * Math.sin(elapsed * 2 + i)})`;
          ctx.fillRect(sx, sy, 2, 2);
        }

        // Suelo lunar / plataforma
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, h - 50, w, 50);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, h - 50, w, 2);

        if (elapsed < 3.0) {
          // Escena 1: Llegada
          scene = 1;
          if (subtitle) subtitle.textContent = '¡Lo lograste! ¡Bity encontró el camino de regreso!';
          const bityX = Math.min(w * 0.45, 80 + elapsed * 90);
          this.drawCinematicShip(ctx, w * 0.72, h - 50, false, 0);
          this.drawCinematicBity(ctx, bityX, h - 50, elapsed);

        } else if (elapsed < 6.5) {
          // Escena 2: Subida a la nave
          scene = 2;
          if (subtitle) subtitle.textContent = 'Bity sube a bordo de la nave espacial... ¡Compuerta asegurada!';
          const progress = (elapsed - 3.0) / 3.5;
          const doorOpen = progress < 0.7;
          this.drawCinematicShip(ctx, w * 0.72, h - 50, doorOpen, progress);

          if (progress < 0.6) {
            const bX = w * 0.45 + progress * (w * 0.27 / 0.6);
            const bY = (h - 50) - progress * 20;
            this.drawCinematicBity(ctx, bX, bY, elapsed, 1 - progress);
          }

        } else if (elapsed < 10.5) {
          // Escena 3: Despegue
          scene = 3;
          if (subtitle) subtitle.textContent = '¡Motores encendidos! Despegando hacia las estrellas...';
          const flightProgress = (elapsed - 6.5) / 4.0;
          const shipY = (h - 50) - Math.pow(flightProgress, 2) * (h + 80);
          const shipX = w * 0.72;

          this.drawThrusterFlames(ctx, shipX, shipY, elapsed);
          this.drawCinematicShip(ctx, shipX, shipY, false, 1.0);

        } else {
          // Escena 4: Pantalla final de agradecimiento
          if (subtitle) subtitle.textContent = '¡Misión espacial completada con honores!';
          if (finalCard) finalCard.style.display = 'block';

          const btnReplay = document.getElementById('btn-final-replay-mission');
          if (btnReplay) btnReplay.onclick = () => {
            this.stopCinematic();
            modal.classList.remove('active');
            this.loadLevel(1);
          };

          const btnBack1 = document.getElementById('btn-final-back-grade1');
          if (btnBack1) btnBack1.onclick = () => {
            this.stopCinematic();
            modal.classList.remove('active');
            this.onBackToSyllabus();
          };

          return;
        }

        this.cinematicFrameId = requestAnimationFrame(loop);
      };

      this.cinematicFrameId = requestAnimationFrame(loop);
    }

    drawCinematicBity(ctx, x, y, time, scale = 1.0) {
      ctx.save();
      ctx.translate(x, y - 24);
      ctx.scale(scale, scale);

      // Orugas
      ctx.fillStyle = '#475569';
      ctx.fillRect(-12, 14, 24, 6);

      // Cuerpo
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(-10, -4, 20, 18);

      // Cabeza
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-8, -18, 16, 14);

      // Ojos luminosos
      ctx.fillStyle = '#fde047';
      ctx.fillRect(-5, -14, 3, 3);
      ctx.fillRect(2, -14, 3, 3);

      // Antena
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(0, -25);
      ctx.stroke();

      ctx.restore();
    }

    drawCinematicShip(ctx, x, groundY, doorOpen, progress) {
      ctx.save();
      ctx.translate(x, groundY);

      // Patas de aterrizaje
      ctx.fillStyle = '#64748b';
      ctx.fillRect(-35, -15, 8, 15);
      ctx.fillRect(27, -15, 8, 15);

      // Fuselaje
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(0, -120);
      ctx.quadraticCurveTo(38, -60, 30, -15);
      ctx.lineTo(-30, -15);
      ctx.quadraticCurveTo(-38, -60, 0, -120);
      ctx.closePath();
      ctx.fill();

      // Alerones
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(-30, -35);
      ctx.lineTo(-48, -10);
      ctx.lineTo(-28, -10);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(30, -35);
      ctx.lineTo(48, -10);
      ctx.lineTo(28, -10);
      ctx.closePath();
      ctx.fill();

      // Ventana
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(0, -75, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Escotilla
      if (doorOpen) {
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(-10, -42, 20, 24);
      } else {
        ctx.fillStyle = '#475569';
        ctx.fillRect(-10, -42, 20, 24);
      }

      ctx.restore();
    }

    drawThrusterFlames(ctx, x, shipY, time) {
      ctx.save();
      ctx.translate(x, shipY);

      const fLen = 40 + Math.sin(time * 30) * 15;
      const grad = ctx.createLinearGradient(0, -10, 0, fLen);
      grad.addColorStop(0, '#fef08a');
      grad.addColorStop(0.3, '#f97316');
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(-18, -10);
      ctx.lineTo(0, fLen);
      ctx.lineTo(18, -10);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    stopCinematic() {
      this.isCinematicPlaying = false;
      if (this.cinematicFrameId) {
        cancelAnimationFrame(this.cinematicFrameId);
        this.cinematicFrameId = null;
      }
      const modal = document.getElementById('bityblockly-cinematic-modal');
      if (modal) modal.classList.remove('active');
    }

    // -----------------------------------------------------------
    // Renderizado del Laberinto en Canvas
    // -----------------------------------------------------------
    initCanvasStars() {
      this.particles = [];
      for (let i = 0; i < 45; i++) {
        this.particles.push({
          x: Math.random() * 680,
          y: Math.random() * 420,
          size: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.02 + 0.01
        });
      }

      const loop = () => {
        if (!this.canvas || !this.ctx) return;
        const config = this.getCurrentMissionConfig();
        if (config && (config.type === 'maze' || (!config.type && config.grid))) {
          this.renderCanvas();
        }
        this.animationFrameId = requestAnimationFrame(loop);
      };
      this.animationFrameId = requestAnimationFrame(loop);
    }

    renderCanvas() {
      if (!this.canvas || !this.ctx) return;
      const ctx = this.ctx;
      const w = this.canvas.width;
      const h = this.canvas.height;
      const config = this.getCurrentMissionConfig();
      if (!config || !config.grid) return;

      ctx.clearRect(0, 0, w, h);

      // Fondo cósmico
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);

      // Estrellas
      this.particles.forEach(p => {
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      // Cálculo de grilla centrada
      const cols = config.cols;
      const rows = config.rows;
      const tileSize = Math.min(Math.floor((w - 40) / cols), Math.floor((h - 40) / rows));
      const offsetX = Math.floor((w - cols * tileSize) / 2);
      const offsetY = Math.floor((h - rows * tileSize) / 2);

      // Dibujar baldosas
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = config.grid[r][c];
          const x = offsetX + c * tileSize;
          const y = offsetY + r * tileSize;

          if (cell === 1) {
            this.drawWallTile(ctx, x, y, tileSize, config.theme, r, c);
          } else {
            this.drawFloorTile(ctx, x, y, tileSize, config.theme, r, c);
          }

          if (cell === 2) {
            this.drawDoorTile(ctx, x, y, tileSize, this.isDoorOpen(c, r));
          } else if (cell === 3) {
            this.drawGoalTile(ctx, x, y, tileSize, config.theme);
          }
        }
      }

      // Dibujar a Byte
      const bx = offsetX + this.bityPos.x * tileSize + tileSize / 2;
      const by = offsetY + this.bityPos.y * tileSize + tileSize / 2;
      this.drawBity(ctx, bx, by, this.bityPos.dir, tileSize);

      // Pistas de orientación intermitentes junto al robot (IZQUIERDA / DERECHA)
      this.drawOrientationHints(ctx, bx, by, this.bityPos.dir, tileSize, w, h);

      // Fantasma tenebroso de Halloween en el laberinto
      this.drawMazeGhost(ctx, offsetX, offsetY, tileSize, cols, rows);
    }

    // --- PISTAS DE ORIENTACIÓN DIDÁCTICAS (IZQUIERDA / DERECHA) ---
    getOrientationCues(dir) {
      // 0: Norte (UP), 1: Este (RIGHT), 2: Sur (DOWN), 3: Oeste (LEFT)
      // Devuelve la posición relativa y las flechas para la izquierda y la derecha de Byte
      switch (dir) {
        case 0: // Mirando ARRIBA (Norte)
          // Izquierda es a la izquierda de la pantalla; Derecha es a la derecha de la pantalla
          return {
            left:  { dx: -1, dy: 0, arrow: '←', text: '← IZQUIERDA', side: 'left' },
            right: { dx: 1,  dy: 0, arrow: '→', text: 'DERECHA →',  side: 'right' }
          };
        case 1: // Mirando DERECHA (Este)
          // Izquierda es hacia arriba de la pantalla; Derecha es hacia abajo de la pantalla
          return {
            left:  { dx: 0, dy: -1, arrow: '↑', text: '↑ IZQUIERDA', side: 'top' },
            right: { dx: 0, dy: 1,  arrow: '↓', text: 'DERECHA ↓',  side: 'bottom' }
          };
        case 2: // Mirando ABAJO (Sur)
          // Izquierda es a la derecha de la pantalla; Derecha es a la izquierda de la pantalla
          return {
            left:  { dx: 1,  dy: 0, arrow: '→', text: 'IZQUIERDA →', side: 'right' },
            right: { dx: -1, dy: 0, arrow: '←', text: '← DERECHA',  side: 'left' }
          };
        case 3: // Mirando IZQUIERDA (Oeste)
          // Izquierda es hacia abajo de la pantalla; Derecha es hacia arriba de la pantalla
          return {
            left:  { dx: 0, dy: 1,  arrow: '↓', text: '↓ IZQUIERDA', side: 'bottom' },
            right: { dx: 0, dy: -1, arrow: '↑', text: '↑ DERECHA',  side: 'top' }
          };
        default:
          return {
            left:  { dx: -1, dy: 0, arrow: '←', text: '← IZQUIERDA', side: 'left' },
            right: { dx: 1,  dy: 0, arrow: '→', text: 'DERECHA →',  side: 'right' }
          };
      }
    }

    drawHintPill(ctx, cx, cy, text, side, alpha, tileSize) {
      ctx.save();
      const fontSize = Math.max(10, Math.min(13, Math.floor(tileSize * 0.22)));
      ctx.font = `bold ${fontSize}px "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const metrics = (typeof ctx.measureText === 'function') ? ctx.measureText(text) : null;
      const textW = (metrics && typeof metrics.width === 'number' && metrics.width > 0) ? metrics.width : (text.length * fontSize * 0.62);
      const paddingX = 7;
      const paddingY = 4;
      const pillW = textW + paddingX * 2;
      const pillH = fontSize + paddingY * 2;
      const rx = cx - pillW / 2;
      const ry = cy - pillH / 2;
      const radius = 5;

      // Colores mágicos de Halloween diferenciados
      const isLeft = (side === 'left');
      // Izquierda: Verde Neón Mágico (#22c55e)
      // Derecha: Naranja Calabaza Encantado (#f97316)
      const bgStyle = isLeft 
        ? `rgba(5, 46, 22, ${alpha * 0.90})` 
        : `rgba(67, 20, 7, ${alpha * 0.90})`;
      const borderStyle = isLeft 
        ? `rgba(74, 222, 128, ${alpha})` 
        : `rgba(251, 146, 60, ${alpha})`;
      const glowStyle = isLeft 
        ? `rgba(34, 197, 94, ${alpha * 0.75})` 
        : `rgba(249, 115, 22, ${alpha * 0.75})`;
      const textStyle = isLeft 
        ? `rgba(240, 253, 244, ${alpha})` 
        : `rgba(255, 247, 237, ${alpha})`;

      // Brillo mágico (shadow)
      ctx.shadowColor = glowStyle;
      ctx.shadowBlur = 6;

      // Fondo de la píldora
      ctx.fillStyle = bgStyle;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(rx, ry, pillW, pillH, radius);
      } else {
        ctx.rect(rx, ry, pillW, pillH);
      }
      ctx.fill();

      // Borde brillante
      ctx.shadowBlur = 0;
      ctx.strokeStyle = borderStyle;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(rx, ry, pillW, pillH, radius);
      } else {
        ctx.strokeRect(rx, ry, pillW, pillH);
      }
      ctx.stroke();

      // Texto nítido con flecha
      ctx.fillStyle = textStyle;
      ctx.fillText(text, cx, cy + 0.5);

      ctx.restore();
    }

    drawOrientationHints(ctx, bx, by, dir, tileSize, canvasW, canvasH) {
      const cues = this.getOrientationCues(dir);

      // Suavidad intermitente (respiración mágica gradual sin parpadeo brusco)
      const reducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let alpha = 0.88;
      if (!reducedMotion) {
        // Ciclo de 3.2 segundos: respiración suave entre 0.38 y 0.96
        const cycle = (Date.now() % 3200) / 3200;
        alpha = 0.38 + 0.58 * (0.5 + 0.5 * Math.sin(cycle * Math.PI * 2));
      }

      // Distancia a Byte: proporcional al tamaño del casillero sin taparlo
      const offsetDist = tileSize * 0.92;

      // Indicador IZQUIERDA
      let leftX = bx + cues.left.dx * offsetDist;
      let leftY = by + cues.left.dy * offsetDist;
      leftX = Math.max(50, Math.min(canvasW - 50, leftX));
      leftY = Math.max(20, Math.min(canvasH - 20, leftY));
      this.drawHintPill(ctx, leftX, leftY, cues.left.text, 'left', alpha, tileSize);

      // Indicador DERECHA
      let rightX = bx + cues.right.dx * offsetDist;
      let rightY = by + cues.right.dy * offsetDist;
      rightX = Math.max(50, Math.min(canvasW - 50, rightX));
      rightY = Math.max(20, Math.min(canvasH - 20, rightY));
      this.drawHintPill(ctx, rightX, rightY, cues.right.text, 'right', alpha, tileSize);
    }

    // --- REPRODUCCIÓN Y CONTROL DEL FANTASMA ---
    playGhostLaugh() {
      this.audio.play('ghostLaugh');
    }

    triggerGhostAppearance(customX = null, customY = null) {
      const config = this.getCurrentMissionConfig();
      if (!config) return;
      if (!this.mazeGhost) {
        this.mazeGhost = { active: false, x: 0, y: 0, alpha: 0, phase: 'idle', timer: 0, hasLaughed: false, nextSpawnTime: 0 };
      }
      this.mazeGhost.active = true;
      this.mazeGhost.phase = 'entering';
      this.mazeGhost.alpha = 0;
      this.mazeGhost.startTime = Date.now();
      this.mazeGhost.hasLaughed = false;
      this.mazeGhost.x = (customX !== null) ? customX : Math.floor(config.cols / 2);
      this.mazeGhost.y = (customY !== null) ? customY : 1;
    }

    drawMazeGhost(ctx, offsetX, offsetY, tileSize, cols, rows) {
      if (!this.mazeGhost) {
        this.mazeGhost = {
          active: false,
          x: 1,
          y: 1,
          alpha: 0,
          phase: 'idle',
          timer: 0,
          hasLaughed: false,
          nextSpawnTime: Date.now() + 14000 + Math.random() * 8000
        };
      }

      const now = Date.now();
      const ghost = this.mazeGhost;

      // Aparición periódica ambiental
      if (!ghost.active) {
        if (now >= ghost.nextSpawnTime) {
          ghost.active = true;
          ghost.phase = 'entering';
          ghost.alpha = 0;
          ghost.startTime = now;
          ghost.hasLaughed = false;
          ghost.x = Math.floor(Math.random() * Math.max(1, cols - 2)) + 1;
          ghost.y = Math.floor(Math.random() * Math.max(1, rows - 2)) + 1;
        } else {
          return;
        }
      }

      // Ciclo de vida y fases
      const elapsed = now - (ghost.startTime || now);
      if (ghost.phase === 'entering') {
        ghost.alpha = Math.min(0.88, ghost.alpha + 0.04);
        // La risa se reproduce UNA SOLA VEZ por aparición
        if (ghost.alpha >= 0.35 && !ghost.hasLaughed) {
          ghost.hasLaughed = true;
          this.playGhostLaugh();
        }
        if (ghost.alpha >= 0.88) {
          ghost.phase = 'hovering';
        }
      } else if (ghost.phase === 'hovering') {
        if (elapsed > 4200) {
          ghost.phase = 'leaving';
        }
      } else if (ghost.phase === 'leaving') {
        ghost.alpha = Math.max(0, ghost.alpha - 0.035);
        if (ghost.alpha <= 0) {
          ghost.active = false;
          ghost.phase = 'idle';
          ghost.nextSpawnTime = now + 18000 + Math.random() * 12000;
          return;
        }
      }

      // Posición flotante con oscilación sinusoidal
      const floatY = Math.sin(now * 0.0035) * (tileSize * 0.12);
      const gx = offsetX + ghost.x * tileSize + tileSize / 2;
      const gy = offsetY + ghost.y * tileSize + tileSize / 2 + floatY;

      ctx.save();
      // Halo místico púrpura y cian
      if (typeof ctx.createRadialGradient === 'function') {
        const haloGrad = ctx.createRadialGradient(gx, gy, 2, gx, gy, tileSize * 0.65);
        haloGrad.addColorStop(0, `rgba(168, 85, 247, ${ghost.alpha * 0.45})`);
        haloGrad.addColorStop(0.6, `rgba(56, 189, 248, ${ghost.alpha * 0.22})`);
        haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(gx, gy, tileSize * 0.65, 0, Math.PI * 2);
        ctx.fill();
      }

      // Renderizado del fantasma
      ctx.globalAlpha = ghost.alpha;
      ctx.font = `${Math.floor(tileSize * 0.65)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('👻', gx, gy);

      // Chispas mágicas alrededor
      ctx.font = `${Math.floor(tileSize * 0.22)}px sans-serif`;
      ctx.fillStyle = '#f0abfc';
      ctx.fillText('✨', gx - tileSize * 0.35, gy - tileSize * 0.3);
      ctx.fillText('✨', gx + tileSize * 0.35, gy - tileSize * 0.2);

      ctx.restore();
    }

    // --- DECORACIÓN TEMÁTICA DEL TABLERO ---
    drawWallTile(ctx, x, y, size, theme, r = 0, c = 0) {
      ctx.save();
      // Base de muro medieval de castillo encantado
      if (theme === 'pumpkin_planet') {
        ctx.fillStyle = '#3f1307';
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = '#65230c';
        ctx.fillRect(x + 1, y + 1, size - 2, Math.floor(size * 0.48));
        ctx.fillRect(x + 1, y + Math.floor(size * 0.52), size - 2, Math.floor(size * 0.46));
      } else if (theme === 'mars') {
        ctx.fillStyle = '#701a35';
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = '#881337';
        ctx.fillRect(x + 1, y + 1, size - 2, Math.floor(size * 0.48));
        ctx.fillRect(x + 1, y + Math.floor(size * 0.52), size - 2, Math.floor(size * 0.46));
      } else {
        ctx.fillStyle = '#1e1430';
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = '#291b3f';
        ctx.fillRect(x + 1, y + 1, size - 2, Math.floor(size * 0.48));
        ctx.fillRect(x + 1, y + Math.floor(size * 0.52), size - 2, Math.floor(size * 0.46));
      }

      // Juntas de mortero oscuro escalonadas
      ctx.strokeStyle = '#0f0a1a';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y + Math.floor(size * 0.5));
      ctx.lineTo(x + size, y + Math.floor(size * 0.5));
      ctx.moveTo(x + Math.floor(size * 0.5), y);
      ctx.lineTo(x + Math.floor(size * 0.5), y + Math.floor(size * 0.5));
      ctx.moveTo(x + Math.floor(size * 0.25), y + Math.floor(size * 0.5));
      ctx.lineTo(x + Math.floor(size * 0.25), y + size);
      ctx.moveTo(x + Math.floor(size * 0.75), y + Math.floor(size * 0.5));
      ctx.lineTo(x + Math.floor(size * 0.75), y + size);
      ctx.stroke();

      // Borde con sutil halo violeta/naranja místico
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
      ctx.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1);

      // Adornos sutiles de Halloween en esquinas muertas y paredes perimetrales
      const decorHash = (r * 17 + c * 31) % 9;
      if (decorHash === 1) {
        // Mini calabaza iluminada en la pared
        ctx.font = `${Math.floor(size * 0.32)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🎃', x + size / 2, y + size / 2);
      } else if (decorHash === 3) {
        // Telaraña en la esquina del muro
        ctx.font = `${Math.floor(size * 0.28)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🕸️', x + size / 2, y + size / 2);
      } else if (decorHash === 5) {
        // Runa mágica violeta en la pared
        ctx.fillStyle = '#c084fc';
        ctx.font = `bold ${Math.floor(size * 0.26)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✦', x + size / 2, y + size / 2);
      }

      ctx.restore();
    }

    drawFloorTile(ctx, x, y, size, theme, r = 0, c = 0) {
      ctx.save();
      // Sendero de cripta / losas de castillo oscuro (alta claridad de tránsito)
      if (theme === 'pumpkin_planet') {
        ctx.fillStyle = '#140803';
        ctx.fillRect(x, y, size, size);
        ctx.strokeStyle = 'rgba(124, 45, 18, 0.35)';
      } else {
        ctx.fillStyle = '#090d16';
        ctx.fillRect(x, y, size, size);
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.18)';
      }
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 1, y + 1, size - 2, size - 2);

      // Sutil junta interior de losa de piedra
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.08)';
      ctx.strokeRect(x + 3, y + 3, size - 6, size - 6);
      ctx.restore();
    }

    // --- PUERTA TEMÁTICA DE HALLOWEEN ---
    drawDoorTile(ctx, x, y, size, isOpen) {
      ctx.save();
      const p = 3;
      const w = size - p * 2;
      const h = size - p * 2;
      const dx = x + p;
      const dy = y + p;

      if (!isOpen) {
        // 1. Marco exterior de piedra gótica
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(dx, dy, w, h);
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.strokeRect(dx, dy, w, h);

        // Clave del arco gótico superior
        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.moveTo(dx + w * 0.35, dy);
        ctx.lineTo(dx + w * 0.5, dy + 5);
        ctx.lineTo(dx + w * 0.65, dy);
        ctx.closePath();
        ctx.fill();

        // 2. Tablas de madera oscura antigua de castillo
        const doorInnerX = dx + 3;
        const doorInnerY = dy + 4;
        const doorInnerW = w - 6;
        const doorInnerH = h - 6;
        ctx.fillStyle = '#27170e';
        ctx.fillRect(doorInnerX, doorInnerY, doorInnerW, doorInnerH);

        // Líneas de tablas verticales
        ctx.strokeStyle = '#180d07';
        ctx.lineWidth = 1.5;
        const plankW = doorInnerW / 3;
        for (let i = 1; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(doorInnerX + i * plankW, doorInnerY);
          ctx.lineTo(doorInnerX + i * plankW, doorInnerY + doorInnerH);
          ctx.stroke();
        }

        // 3. Herrajes de hierro forjado (bandas horizontales)
        ctx.fillStyle = '#334155';
        const bandH = Math.max(3, Math.floor(doorInnerH * 0.12));
        ctx.fillRect(doorInnerX, doorInnerY + doorInnerH * 0.22, doorInnerW, bandH);
        ctx.fillRect(doorInnerX, doorInnerY + doorInnerH * 0.72, doorInnerW, bandH);

        // Remaches de bronce
        ctx.fillStyle = '#94a3b8';
        [0.2, 0.5, 0.8].forEach(pos => {
          ctx.beginPath();
          ctx.arc(doorInnerX + doorInnerW * pos, doorInnerY + doorInnerH * 0.22 + bandH / 2, 1.5, 0, Math.PI * 2);
          ctx.arc(doorInnerX + doorInnerW * pos, doorInnerY + doorInnerH * 0.72 + bandH / 2, 1.5, 0, Math.PI * 2);
          ctx.fill();
        });

        // 4. Aldaba / tirador dorado de castillo
        ctx.fillStyle = '#eab308';
        ctx.strokeStyle = '#ca8a04';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(doorInnerX + doorInnerW * 0.82, doorInnerY + doorInnerH * 0.48, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 5. Telaraña sutil en la esquina superior izquierda
        ctx.strokeStyle = 'rgba(241, 245, 249, 0.45)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(doorInnerX, doorInnerY + 8);
        ctx.lineTo(doorInnerX + 8, doorInnerY);
        ctx.moveTo(doorInnerX, doorInnerY + 14);
        ctx.lineTo(doorInnerX + 14, doorInnerY);
        ctx.moveTo(doorInnerX, doorInnerY);
        ctx.lineTo(doorInnerX + 10, doorInnerY + 10);
        ctx.stroke();

        // 6. Sello mágico / runa de Halloween brillante (Calabaza mágica selladora)
        const sealRadius = Math.min(14, Math.floor(doorInnerW * 0.28));
        const cx = doorInnerX + doorInnerW * 0.48;
        const cy = doorInnerY + doorInnerH * 0.48;

        // Halo de resplandor místico pulsante
        const auraAlpha = 0.45 + 0.3 * Math.sin(Date.now() * 0.004);
        if (typeof ctx.createRadialGradient === 'function') {
          const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, sealRadius * 1.5);
          grad.addColorStop(0, `rgba(249, 115, 22, ${auraAlpha})`);
          grad.addColorStop(0.7, `rgba(168, 85, 247, ${auraAlpha * 0.4})`);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cx, cy, sealRadius * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Runa de sello: icono de calabaza brillante
        ctx.font = `${Math.floor(size * 0.36)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🎃', cx, cy);

      } else {
        // --- PUERTA DE HALLOWEEN DESBLOQUEADA (PORTAL DE PASO MÁGICO) ---
        // Marco de piedra del portal
        ctx.fillStyle = '#064e3b';
        ctx.fillRect(dx, dy, w, h);
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(dx, dy, w, h);

        // Interior del portal místico abierto con luz esmeralda y cian
        if (typeof ctx.createRadialGradient === 'function') {
          const portalGrad = ctx.createRadialGradient(dx + w / 2, dy + h / 2, 3, dx + w / 2, dy + h / 2, w * 0.6);
          portalGrad.addColorStop(0, 'rgba(110, 231, 183, 0.9)');
          portalGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.6)');
          portalGrad.addColorStop(1, 'rgba(6, 78, 59, 0.3)');
          ctx.fillStyle = portalGrad;
        } else {
          ctx.fillStyle = 'rgba(16, 185, 129, 0.7)';
        }
        ctx.fillRect(dx + 2, dy + 2, w - 4, h - 4);

        // Chispas mágicas de paso libre
        ctx.fillStyle = '#ecfdf5';
        ctx.font = `bold ${Math.floor(size * 0.42)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✨', dx + w / 2, dy + h / 2);
      }
      ctx.restore();
    }

    drawGoalTile(ctx, x, y, size, theme) {
      ctx.save();
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.beginPath();
      ctx.arc(x + size / 2, y + size / 2, size * 0.45, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = `${Math.floor(size * 0.65)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const goalIcon = (theme === 'haunted_core') ? '🔮' : (theme === 'pumpkin_planet' ? '🚀' : '🚀');
      ctx.fillText(goalIcon, x + size / 2, y + size / 2);
      ctx.restore();
    }

    drawBity(ctx, cx, cy, dir, size) {
      ctx.save();
      ctx.translate(cx, cy);

      const angles = [0, Math.PI / 2, Math.PI, -Math.PI / 2];
      ctx.rotate(angles[dir]);

      const scale = size / 48;
      ctx.scale(scale, scale);

      // Orugas
      ctx.fillStyle = '#475569';
      ctx.fillRect(-16, 14, 10, 6);
      ctx.fillRect(6, 14, 10, 6);

      // Cuerpo
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(-12, -4, 24, 20);

      // Pantalla de pecho
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-4, 2, 8, 8);

      // Cabeza
      ctx.fillStyle = '#0ea5e9';
      ctx.fillRect(-10, -18, 20, 14);

      // Ojos
      ctx.fillStyle = '#fde047';
      ctx.fillRect(-6, -14, 4, 4);
      ctx.fillRect(2, -14, 4, 4);

      // Antena
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(0, -24);
      ctx.stroke();

      ctx.restore();
    }

    destroy() {
      if (this.idleTimerId) {
        clearTimeout(this.idleTimerId);
        this.idleTimerId = null;
      }
      this.stopProgram();
      this.stopCinematic();
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      if (this.coverFrameId) {
        cancelAnimationFrame(this.coverFrameId);
        this.coverFrameId = null;
      }
    }
  }

  // Exportar al ámbito global
  global.BITYBLOCKLY_LEVELS = BITYBLOCKLY_LEVELS;
  global.BITYBLOCKLY_GRADES_DATA = BITYBLOCKLY_GRADES_DATA;
  global.BITYBLOCKLY_MATH_BANKS = BITYBLOCKLY_MATH_BANKS;
  global.getRandomMathQuestion = getRandomMathQuestion;
  global.BityBlocklyAudio = BityBlocklyAudio;
  global.BityBlocklyGame = BityBlocklyGame;

})(typeof window !== 'undefined' ? window : global);
