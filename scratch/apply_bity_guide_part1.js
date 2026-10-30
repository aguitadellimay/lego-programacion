const fs = require('fs');

const file = 'js/bityBlockly.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Check if already applied
if (content.includes('BITY_GUIDE_MESSAGES')) {
  console.log('BITY_GUIDE_MESSAGES already present in js/bityBlockly.js');
  process.exit(0);
}

// 2. Prepare the Guide data and SVG functions
const guideDataAndSvgs = `
  // =============================================================
  // SISTEMA DE PERSONAJE GUÍA (BITY) Y ASISTENCIA PEDAGÓGICA
  // =============================================================

  function createBityGuideSvg(mood = 'idle') {
    const eyeColor = (mood === 'thinking') ? '#facc15' : (mood === 'alert') ? '#fb923c' : (mood === 'celebrating') ? '#4ade80' : '#38bdf8';
    return \`
    <svg class="bity-mascot-svg mood-\${mood}" viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
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
      \${mood === 'happy' || mood === 'celebrating' ? \`
        <path class="bity-eye-happy" d="M 33 48 Q 40 40 47 48" fill="none" stroke="\${eyeColor}" stroke-width="3.5" stroke-linecap="round"/>
        <path class="bity-eye-happy" d="M 53 48 Q 60 40 67 48" fill="none" stroke="\${eyeColor}" stroke-width="3.5" stroke-linecap="round"/>
      \` : mood === 'thinking' ? \`
        <circle class="bity-eye" cx="40" cy="46" r="4.5" fill="\${eyeColor}" filter="url(#neonGlow)"/>
        <circle class="bity-eye" cx="60" cy="44" r="5.5" fill="\${eyeColor}" filter="url(#neonGlow)"/>
        <line x1="34" y1="39" x2="45" y2="41" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
        <line x1="55" y1="38" x2="66" y2="41" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
      \` : \`
        <circle class="bity-eye left-eye" cx="40" cy="46" r="4.5" fill="\${eyeColor}" filter="url(#neonGlow)"/>
        <circle class="bity-eye right-eye" cx="60" cy="46" r="4.5" fill="\${eyeColor}" filter="url(#neonGlow)"/>
      \`}

      <!-- Boca digital / LED -->
      \${mood === 'celebrating' || mood === 'happy' ? \`
        <path d="M 44 56 Q 50 60 56 56" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
      \` : mood === 'thinking' ? \`
        <line x1="46" y1="56" x2="54" y2="56" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
      \` : \`
        <path d="M 45 56 Q 50 58 55 56" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round"/>
      \`}

      <!-- Cuello conector -->
      <rect x="42" y="70" width="16" height="6" rx="2" fill="#334155"/>

      <!-- Cuerpo superior / Pecho robótico -->
      <path d="M 30 76 L 70 76 L 75 92 Q 75 96 70 96 L 30 96 Q 25 96 25 92 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
      <circle class="bity-core" cx="50" cy="86" r="4.5" fill="#38bdf8" filter="url(#neonGlow)"/>
      <circle cx="50" cy="86" r="2" fill="#ffffff"/>
    </svg>
    \`;
  }

  function createGhostGuestSvg() {
    return \`
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
    \`;
  }

  function createVampireGuestSvg() {
    return \`
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
    \`;
  }

  function createFrankensteinGuestSvg() {
    return \`
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
    \`;
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
`;

// Insert guideDataAndSvgs right before `class BityBlocklyAudio`
content = content.replace('class BityBlocklyAudio {', guideDataAndSvgs + '\n  class BityBlocklyAudio {');

// In BityBlocklyAudio.play, add bitySpeak
const audioTarget = `      } else if (type === 'victory') {`;
const audioReplacement = `      } else if (type === 'bitySpeak') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, t); // D5
        osc.frequency.exponentialRampToValueAtTime(880, t + 0.12); // A5
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.linearRampToValueAtTime(0.005, t + 0.12);
        osc.start(t);
        osc.stop(t + 0.12);
      } else if (type === 'victory') {`;

content = content.replace(audioTarget, audioReplacement);

// In constructor, add guide properties
const ctorTarget = `      this.completedLevels = [];
      this.revealedHintsCount = 0;`;
const ctorReplacement = `      this.completedLevels = [];
      this.revealedHintsCount = 0;
      this.consecutiveErrors = 0;
      this.lastGuideSpeakTime = 0;
      this.currentGuideSpeaker = 'bity';
      this.currentGuideMood = 'idle';
      this.idleTimerId = null;`;

content = content.replace(ctorTarget, ctorReplacement);

// In initDom, initialize guide DOM
const initDomTarget = `      // Botón de pedir pista interactiva
      const btnHint = document.getElementById('btn-bityblockly-ask-hint');
      if (btnHint) {
        btnHint.onclick = () => {
          this.askProgressiveHint();
        };
      }`;

const initDomReplacement = `      // Sincronizar atributos de grado para CSS de mayúsculas
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
      }`;

content = content.replace(initDomTarget, initDomReplacement);

// In selectGrade, set attributes and update labels
const selectGradeTarget = `    selectGrade(gradeNum) {
      this.currentGrade = Math.max(1, Math.min(5, gradeNum));
      this.currentLevelIndex = 1;
      this.showPlayView();
      this.updateGradeHeader();
      this.renderLevelTabs();
      this.loadLevel(1);
    }`;

const selectGradeReplacement = `    selectGrade(gradeNum) {
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
    }`;

content = content.replace(selectGradeTarget, selectGradeReplacement);

fs.writeFileSync(file, content, 'utf8');
console.log('Part 1 of Bity Guide applied cleanly');
