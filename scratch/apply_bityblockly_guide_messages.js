const fs = require('fs');

let content = fs.readFileSync('js/bityBlockly.js', 'utf8');

const startMarker = '  const BITY_GUIDE_MESSAGES = {';
const endMarker = '  const BITY_GUEST_CHEERS = {';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  throw new Error(`Could not locate BITY_GUIDE_MESSAGES block (start: ${startIndex}, end: ${endIndex})`);
}

const newGuideMessages = `  const BITY_GUIDE_MESSAGES = {
    1: {
      start: [
        '¡HOLA! HOY TENEMOS UNA NUEVA MISIÓN.',
        'OBSERVÁ EL CAMINO ANTES DE COMENZAR.',
        'PENSEMOS JUNTOS CÓMO LLEGAR A LA META.',
        'PRIMERO PENSÁ. DESPUÉS ELEGÍ LAS FLECHAS.'
      ],
      coding: [
        'RECORDÁ QUE CADA BLOQUE ES UNA DIRECCIÓN: ARRIBA, ABAJO, IZQUIERDA O DERECHA.',
        'CADA FLECHA MUEVE A BITY DIRECTAMENTE UN CASILLERO.',
        'PENSÁ QUÉ DIRECCIÓN NECESITÁS PARA SEGUIR.',
        'OBSERVÁ EL MAPA Y ELEGÍ LA FLECHA CORRECTA.'
      ],
      turn: [
        '¡ATENCIÓN! USÁ LAS CUATRO FLECHAS PARA MOVERTE POR EL CAMINO.',
        'ARRIBA SUBE, ABAJO BAJA, IZQUIERDA VA A LA IZQUIERDA Y DERECHA A LA DERECHA.',
        'RECORDÁ: CADA FLECHA MUEVE A BITY UN CASILLERO.',
        '¡MIRÁ! EL CAMINO DOBLA. ELEGÍ LA FLECHA HACIA EL PASILLO LIBRE.'
      ],
      direction: [
        '¡ATENCIÓN! USÁ LAS CUATRO FLECHAS PARA MOVERTE POR EL CAMINO.',
        'ARRIBA SUBE, ABAJO BAJA, IZQUIERDA VA A LA IZQUIERDA Y DERECHA A LA DERECHA.',
        'RECORDÁ: CADA FLECHA MUEVE A BITY UN CASILLERO.',
        '¡MIRÁ! EL CAMINO DOBLA. ELEGÍ LA FLECHA HACIA EL PASILLO LIBRE.'
      ],
      error: [
        '¡NO TE PREOCUPES! PODEMOS INTENTARLO OTRA VEZ.',
        'OBSERVÁ DÓNDE SE DETUVO BITY.',
        '¿QUÉ FLECHA PODRÍAS CAMBIAR?',
        '¡CADA INTENTO NOS AYUDA A APRENDER!'
      ],
      repeated_error: [
        'REVISÁ EL ORDEN DE TUS FLECHAS DE DIRECCIÓN.',
        'MIRÁ BIEN EL TABLERO: ¿HACIA DÓNDE ESTÁ EL CAMINO LIBRE?',
        'CONTÁ LOS CASILLEROS LIBRES HASTA LA COMPUERTA O CURVA.'
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
        'RECORDÁ QUE PODÉS TOCAR ARRIBA, ABAJO, IZQUIERDA O DERECHA.'
      ],
      pedagogical_hints: [
        'RECORDÁ: CADA FLECHA MUEVE A BITY UN CASILLERO EN ESA DIRECCIÓN.',
        'LAS 4 DIRECCIONES SON FIJAS: ARRIBA, ABAJO, IZQUIERDA Y DERECHA.',
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
        '¿Qué dirección debería tomar primero Bity?',
        'Revisá el orden de tus instrucciones.',
        'Antes de ejecutar, planificá qué flechas vas a usar.',
        'Cada bloque mueve a Bity un casillero en esa dirección.'
      ],
      turn: [
        '¡Atención a la esquina! Elegí la flecha hacia donde continúa el camino.',
        'Las 4 direcciones son fijas: Arriba, Abajo, Izquierda y Derecha.',
        'Cada flecha representa un desplazamiento directo.'
      ],
      direction: [
        '¡Atención a la esquina! Elegí la flecha hacia donde continúa el camino.',
        'Las 4 direcciones son fijas: Arriba, Abajo, Izquierda y Derecha.',
        'Cada flecha representa un desplazamiento directo.'
      ],
      error: [
        '¡Casi! Revisá el orden de las instrucciones para no chocar.',
        'Observá dónde se detuvo Bity y qué bloque cambiarías.',
        '¡No te preocupes! Revisemos juntos el recorrido.'
      ],
      repeated_error: [
        'Verificá cuántos casilleros avanzaste antes de cambiar de dirección.',
        'Comprobá si la flecha apunta hacia el pasillo despejado.',
        'Probá recorrer mentalmente paso por paso.'
      ],
      success: [
        '¡Muy bien! ¡Bity siguió la ruta planeada!',
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
        'Elegí la flecha que mueva a Bity hacia la casilla libre.'
      ],
      pedagogical_hints: [
        'Anticipá los movimientos: trazá mentalmente la ruta antes de programar.',
        'Verificá si necesitás moverte hacia arriba, abajo, izquierda o derecha.',
        'Cada casillero requiere una instrucción de dirección.'
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
        'Anticipá las direcciones necesarias antes de ejecutar.',
        'Compará las posibles alternativas de paso.'
      ],
      turn: [
        'Verificá la dirección del pasillo antes de colocar el siguiente bloque.',
        'Tené en cuenta los límites del laberinto al cambiar de dirección.',
        'Recordá que las direcciones son fijas en el tablero.'
      ],
      direction: [
        'Verificá la dirección del pasillo antes de colocar el siguiente bloque.',
        'Tené en cuenta los límites del laberinto al cambiar de dirección.',
        'Recordá que las direcciones son fijas en el tablero.'
      ],
      error: [
        'Observá dónde se detuvo Bity y comparalo con tu plan.',
        '¿En qué paso de la secuencia se produjo el desvío?',
        'Cada error nos muestra qué instrucción debemos corregir.'
      ],
      repeated_error: [
        'Detectá en qué casillero específico se desvió Bity.',
        'Comprobá si sobró algún paso antes de una bifurcación.',
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
        'Comprobá que el número de flechas coincida con las baldosas libres.',
        'Al encontrar bifurcaciones, compará cuál ruta tiene menos instrucciones.'
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
        'Asegurate de colocar la flecha que apunta exactamente hacia el pasillo libre.',
        'Recordá que cada paso suma una instrucción a tu total.',
        'Detectá la dirección exacta para no moverte contra una pared.'
      ],
      direction: [
        'Asegurate de colocar la flecha que apunta exactamente hacia el pasillo libre.',
        'Recordá que cada paso suma una instrucción a tu total.',
        'Detectá la dirección exacta para no moverte contra una pared.'
      ],
      error: [
        'Depurá tu código: identificá qué bloque causó la colisión.',
        '¿Qué corrección mínima resolvería el recorrido?',
        'Analizá el fallo y ajustá la secuencia.'
      ],
      repeated_error: [
        'Revisá el punto exacto de la colisión: ¿faltó una dirección o sobró un paso?',
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
        'Verificá que cada paso tenga espacio libre antes de colocarlo.'
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
        'Optimizá tu algoritmo: evitá desvíos y pasos redundantes.',
        'Comprobá la coherencia del flujo de instrucciones.'
      ],
      turn: [
        'Optimizá las direcciones: calculá la ruta más directa hacia la meta.',
        'Cada flecha cuenta como una instrucción en tu métrica final.',
        'Compará si tomar una ruta alternativa te ahorra movimientos.'
      ],
      direction: [
        'Optimizá las direcciones: calculá la ruta más directa hacia la meta.',
        'Cada flecha cuenta como una instrucción en tu métrica final.',
        'Compará si tomar una ruta alternativa te ahorra movimientos.'
      ],
      error: [
        'Analizá el resultado y detectá dónde podrías mejorar el algoritmo.',
        'Depuración analítica: ¿fue un error de distancia o de dirección?',
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
        'Compará las rutas: analizá cuál alternativa requiere menos instrucciones totales.',
        'Un algoritmo óptimo minimiza la cantidad total de bloques en el tablero.',
        'Revisá el estado del tablero y calculá mentalmente el costo de cada bifurcación.'
      ]
    }
  };

`;

content = content.substring(0, startIndex) + newGuideMessages + content.substring(endIndex);

// Also update line in BITY_GUEST_CHEERS vampire
content = content.replace(
  "'¡Saludos estelares! Revisá bien la orientación de tus pasos antes de despegar.'",
  "'¡Saludos estelares! Revisá bien las direcciones de tus pasos antes de despegar.'"
);

fs.writeFileSync('js/bityBlockly.js', content, 'utf8');
console.log('Successfully updated BITY_GUIDE_MESSAGES in js/bityBlockly.js');
