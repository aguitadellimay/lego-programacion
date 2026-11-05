const fs = require('fs');

let content = fs.readFileSync('js/bityBlockly.js', 'utf8');

function replaceOrThrow(target, replacement, desc) {
  if (!content.includes(target)) {
    throw new Error(`Target not found for: ${desc}\nTarget: ${target.substring(0, 80)}...`);
  }
  content = content.replace(target, replacement);
  console.log(`[OK] Replaced: ${desc}`);
}

// 1. Levels Hints
replaceOrThrow(
  "hint: '💡 Pensá bien cada giro. Recordá que girar a la izquierda o derecha cambia hacia dónde mira Bity sin cambiar de casilla.',",
  "hint: '💡 Usá las cuatro flechas de dirección: ARRIBA, ABAJO, IZQUIERDA y DERECHA para guiar a Bity por el camino.',",
  "Level 2 hint"
);

replaceOrThrow(
  "'💡 Pista 3: Continuá por los pasillos alternando giros hacia la nave lunar.'",
  "'💡 Pista 3: Continuá por los pasillos utilizando las flechas hacia la nave lunar.'",
  "Level 2 pista 3"
);

replaceOrThrow(
  "hint: '💡 Este laberinto tiene más pasillos y curvas. Pensá qué giro necesitás antes de avanzar hacia cada compuerta.',",
  "hint: '💡 Este laberinto tiene más pasillos. Elegí la dirección correcta en cada intersección hacia cada compuerta.',",
  "Level 4 hint"
);

replaceOrThrow(
  "'💡 Pista 1: Avanzá con paciencia planificando los giros en cada curva.',",
  "'💡 Pista 1: Avanzá con paciencia planificando las direcciones en cada curva.',",
  "Level 5 pista 1"
);

replaceOrThrow(
  "hint: '💡 Programá a Byte con Avanzar y Girar. En cada compuerta resolvé la cuenta para abrir la puerta de Halloween.',",
  "hint: '💡 Programá a Bity con las 4 direcciones (Arriba, Abajo, Izquierda y Derecha). En cada compuerta resolvé el cálculo para abrir la puerta.',",
  "Grade 2 Mission 3 hint"
);

replaceOrThrow(
  "'💡 Pista 1: Avanzá y girá hacia la primera compuerta en (2, 2).',",
  "'💡 Pista 1: Avanzá hacia la primera compuerta en (2, 2).',",
  "Grade 2 Mission 3 pista 1"
);

replaceOrThrow(
  "'💡 Pista 3: Tras cruzar la puerta, girá hacia el sur para llegar a la meta.'",
  "'💡 Pista 3: Tras cruzar la puerta, bajá hacia el sur para llegar a la meta.'",
  "Grade 2 Mission 3 pista 3"
);

replaceOrThrow(
  "hint: '💡 Analizá los giros y avances necesarios para cada camino.',",
  "hint: '💡 Analizá las direcciones necesarias para cada camino alternativo.',",
  "Grade 2 Mission 4 hint"
);

replaceOrThrow(
  "hint: '💡 Organizá tus instrucciones de Avanzar y Girar para llegar al andén final.',",
  "hint: '💡 Organizá tus instrucciones de dirección para llegar al andén final.',",
  "Grade 3 Mission 4 hint"
);

replaceOrThrow(
  "'💡 Pista 2: Girá para descender y resolvé la segunda compuerta ferroviaria.',",
  "'💡 Pista 2: Descendé y resolvé la segunda compuerta ferroviaria.',",
  "Grade 3 Mission 4 pista 2"
);

replaceOrThrow(
  "'💡 Pista 3: ¡Girá hacia la derecha para ingresar al andén de la estación!'",
  "'💡 Pista 3: ¡Avanzá hacia la derecha para ingresar al andén de la estación!'",
  "Grade 3 Mission 4 pista 3"
);

replaceOrThrow(
  "hint: '💡 Programá los giros y avances con precisión.',",
  "hint: '💡 Programá las direcciones con precisión.',",
  "Grade 4 Lab 1 hint"
);

replaceOrThrow(
  "story: '¡Ingresá al castillo encantado! El patio central tiene compuertas góticas y murallas. ¡Planificá tus giros antes de ejecutar!',",
  "story: '¡Ingresá al castillo encantado! El patio central tiene compuertas góticas y murallas. ¡Planificá tus direcciones antes de ejecutar!',",
  "Grade 4 Lab 3 story"
);

replaceOrThrow(
  "story: '¡Primer gran laberinto de 5.º grado! El castillo posee pasadizos secretos y compuertas mágicas. Analizá cada giro cuidadosamente.',",
  "story: '¡Primer gran laberinto de 5.º grado! El castillo posee pasadizos secretos y compuertas mágicas. Analizá cada movimiento cuidadosamente.',",
  "Grade 5 Lab 1 story"
);

// 2. Final Challenge Consignas
replaceOrThrow(
  "text: 'RECORDÁ: CADA MOVIMIENTO O GIRO QUE LE DAS A BITY CUENTA COMO UNA INSTRUCCIÓN.'",
  "text: 'RECORDÁ: CADA MOVIMIENTO QUE LE DAS A BITY (ARRIBA, ABAJO, IZQUIERDA O DERECHA) CUENTA COMO UNA INSTRUCCIÓN.'",
  "Consigna Grade 1 item"
);

replaceOrThrow(
  "text: 'Recordá: cada movimiento o giro que le indicás a Bity cuenta como una instrucción.'",
  "text: 'Recordá: cada movimiento que le indicás a Bity (arriba, abajo, izquierda o derecha) cuenta como una instrucción.'",
  "Consigna Grade 2 item"
);

replaceOrThrow(
  `        {
          icon: '🧩',
          label: 'Contar pasos y giros:',
          text: 'Recordá: cada paso que le indicás a Bity (tanto avanzar como girar) cuenta como una instrucción.'
        },`,
  `        {
          icon: '🧩',
          label: 'Contar instrucciones:',
          text: 'Recordá: cada flecha que le indicás a Bity (arriba, abajo, izquierda o derecha) cuenta como una instrucción.'
        },`,
  "Consigna Grade 3 item"
);

replaceOrThrow(
  "reflectionText: '¡Gran análisis! Al comparar diferentes recorridos, descubrimos que no todos los caminos requieren la misma cantidad de pasos y giros.'",
  "reflectionText: '¡Gran análisis! Al comparar diferentes recorridos, descubrimos que no todos los caminos requieren la misma cantidad de instrucciones.'",
  "Consigna Grade 3 reflection"
);

replaceOrThrow(
  `        {
          icon: '🧩',
          label: 'Métrica de instrucciones:',
          text: 'Recordá: cada bloque de movimiento o giro ejecutado cuenta como una instrucción.'
        },`,
  `        {
          icon: '🧩',
          label: 'Métrica de instrucciones:',
          text: 'Recordá: cada bloque de dirección (arriba, abajo, izquierda o derecha) cuenta como una instrucción.'
        },`,
  "Consigna Grade 4 item"
);

replaceOrThrow(
  "summaryClassroomSub: 'Publicá tu resultado en Classroom detallando la cantidad de avances, giros e instrucciones totales que utilizaste.',",
  "summaryClassroomSub: 'Publicá tu resultado en Classroom detallando la cantidad total de instrucciones que utilizaste para llegar a la meta.',",
  "Consigna Grade 4 summaryClassroomSub"
);

replaceOrThrow(
  `        {
          icon: '🧩',
          label: 'Instrucciones ejecutadas:',
          text: 'Recordá: cada bloque de movimiento o giro ejecutado en tu solución cuenta como una instrucción.'
        },`,
  `        {
          icon: '🧩',
          label: 'Instrucciones ejecutadas:',
          text: 'Recordá: cada bloque de dirección utilizado en tu solución cuenta como una instrucción.'
        },`,
  "Consigna Grade 5 item"
);

fs.writeFileSync('js/bityBlockly.js', content, 'utf8');
console.log('Successfully updated hints and consignas in js/bityBlockly.js');
