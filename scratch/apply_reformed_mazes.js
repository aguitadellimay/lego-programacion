const fs = require('fs');

const bityPath = 'js/bityBlockly.js';
let code = fs.readFileSync(bityPath, 'utf8');

// 1. Grade 1 Level 6 replacement
const g1OldRegex = /id:\s*6,\s*name:\s*['"](?:Nivel|NIVEL)\s*6:[^}]+?isFinalChallenge:\s*true[\s\S]*?hints:\s*\[[\s\S]*?\]\s*\}/;

const g1New = `id: 6,
      name: 'NIVEL 6: DESAFÍO ESPECIAL DE INSTRUCCIONES',
      theme: 'mothership',
      type: 'maze',
      isFinalChallenge: true,
      cols: 8,
      rows: 6,
      start: { x: 1, y: 1, dir: 1 },
      goal: { x: 4, y: 3 },
      doors: [{ x: 4, y: 1 }, { x: 3, y: 4 }],
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 2, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 3, 1, 0, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ],
      story: '¡DESAFÍO ESPECIAL DE INSTRUCCIONES! HAY TRES CAMINOS HACIA LA NAVE: CAMINO ÓPTIMO (6 INSTRUCCIONES), ALTERNATIVA 1 (10 INSTRUCCIONES) O ALTERNATIVA 2 (14 INSTRUCCIONES). ¿CUÁL ELEGIRÁS?',
      hint: '💡 RECORDÁ: CADA BLOQUE EJECUTADO ES UNA INSTRUCCIÓN. ¡CONTÁ TUS PASOS HASTA LA META!',
      hints: [
        '💡 PISTA 1: EL CAMINO ÓPTIMO VA DIRECTO AL ESTE Y LUEGO AL SUR (6 INSTRUCCIONES).',
        '💡 PISTA 2: LA ALTERNATIVA 1 BAJA Y AVANZA POR EL CENTRO (10 INSTRUCCIONES).',
        '💡 PISTA 3: LA ALTERNATIVA 2 BORDEA POR EL EXTERIOR (14 INSTRUCCIONES).'
      ]
    }`;

// 2. Grade 2 Mission 4 replacement
const g2OldRegex = /id:\s*4,\s*name:\s*['"]Misión 4: Desafío Especial de Instrucciones['"][\s\S]*?hints:\s*\[[\s\S]*?\]\s*\}/;

const g2New = `id: 4,
          name: 'Misión 4: Desafío Especial de Instrucciones',
          type: 'maze',
          isFinalChallenge: true,
          theme: 'pumpkin_planet',
          cols: 9,
          rows: 7,
          start: { x: 1, y: 1, dir: 1 },
          goal: { x: 5, y: 4 },
          doors: [{ x: 4, y: 1 }, { x: 2, y: 3 }],
          grid: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 2, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 0, 0, 3, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1]
          ],
          story: '¡Gran Desafío de Instrucciones del Planeta Calabaza! Podés elegir entre tres recorridos independientes hacia la plataforma: Camino Óptimo (8 instrucciones), Alternativa 1 (11 instrucciones) o Alternativa 2 (16 instrucciones). ¡Elegí tu estrategia!',
          hint: '💡 Analizá los giros y avances necesarios para cada camino.',
          hints: [
            '💡 Pista 1: El camino óptimo baja directo hacia la plataforma final (8 instrucciones).',
            '💡 Pista 2: La Alternativa 1 atraviesa la galería central (11 instrucciones).',
            '💡 Pista 3: La Alternativa 2 recorre el perímetro exterior (16 instrucciones).'
          ]
        }`;

// 3. Grade 3 Mission 5 replacement
const g3OldRegex = /id:\s*5,\s*name:\s*['"]Misión 5: Desafío Especial de Instrucciones['"][\s\S]*?hints:\s*\[[\s\S]*?\]\s*\}/;

const g3New = `id: 5,
          name: 'Misión 5: Desafío Especial de Instrucciones',
          type: 'maze',
          isFinalChallenge: true,
          theme: 'ghost_rails',
          cols: 10,
          rows: 8,
          start: { x: 1, y: 1, dir: 1 },
          goal: { x: 6, y: 5 },
          doors: [{ x: 4, y: 1 }, { x: 3, y: 3 }],
          grid: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 2, 1, 1, 0, 1, 0, 1],
            [1, 1, 1, 0, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 1, 0, 0, 3, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
          ],
          story: '¡Desafío Maestro del Tren Fantasma! Existen tres caminos independientes para llegar al andén secreto: Camino Óptimo (10 instrucciones), Alternativa 1 (15 instrucciones) y Alternativa 2 (18 instrucciones). ¡Programá tu ruta favorita!',
          hint: '💡 Podés elegir la vía directa norte, la vía central con curvas o la vía perimetral sur.',
          hints: [
            '💡 Pista 1: La Vía Directa va por el norte (10 instrucciones).',
            '💡 Pista 2: La Vía Central atraviesa los andenes interiores (15 instrucciones).',
            '💡 Pista 3: La Vía Perimetral rodea por el andén exterior (18 instrucciones).'
          ]
        }`;

// 4. Grade 4 Mission 7 replacement
const g4OldRegex = /id:\s*7,\s*name:\s*['"]Misión 7: Desafío Especial de Instrucciones['"][\s\S]*?hints:\s*\[[\s\S]*?\]\s*\}/;

const g4New = `id: 7,
          name: 'Misión 7: Desafío Especial de Instrucciones',
          type: 'maze',
          isFinalChallenge: true,
          theme: 'magic_lab',
          cols: 11,
          rows: 8,
          start: { x: 1, y: 1, dir: 1 },
          goal: { x: 7, y: 6 },
          doors: [{ x: 5, y: 1 }, { x: 1, y: 3 }],
          grid: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 2, 1, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 3, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
          ],
          story: '¡Gran Desafío de Instrucciones del Laboratorio! Tenés tres rutas con diferente cantidad de instrucciones: Camino Óptimo (12 instrucciones), Alternativa 1 (17 instrucciones) y Alternativa 2 (23 instrucciones). ¡Planificá tu estrategia!',
          hint: '💡 Planificá el recorrido y resolvé las tablas para abrir las compuertas.',
          hints: [
            '💡 Pista 1: La Galería Norte requiere 12 instrucciones en total.',
            '💡 Pista 2: La Galería Este requiere 17 instrucciones.',
            '💡 Pista 3: La Galería Sudoeste con curvas requiere 23 instrucciones.'
          ]
        }`;

// 5. Grade 5 Mission 8 replacement
const g5OldRegex = /id:\s*8,\s*name:\s*['"]Misión 8: Desafío Especial de Instrucciones['"][\s\S]*?hints:\s*\[[\s\S]*?\]\s*\}/;

const g5New = `id: 8,
          name: 'Misión 8: Desafío Especial de Instrucciones',
          type: 'maze',
          isFinalChallenge: true,
          theme: 'haunted_core',
          cols: 12,
          rows: 9,
          start: { x: 1, y: 1, dir: 1 },
          goal: { x: 8, y: 7 },
          doors: [{ x: 6, y: 1 }, { x: 1, y: 3 }],
          grid: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 2, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 3, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
          ],
          story: '¡Desafío Cumbre de 5.º Grado! Tres rutas alternativas con marcadas diferencias estratégicas: Camino Óptimo (14 instrucciones), Alternativa 1 (20 instrucciones) y Alternativa 2 (27 instrucciones). Resolvé los desafíos matemáticos para abrir las compuertas espaciales.',
          hint: '💡 Comprobá cada camino: Camino Óptimo (14 instrs), Alternativa 1 (20 instrs) y Alternativa 2 (27 instrs).',
          hints: [
            '💡 Pista 1: La Ruta de las Almenas Norte va directo (14 instrucciones).',
            '💡 Pista 2: La Ruta del Portal Este bordea por el ala derecha (20 instrucciones).',
            '💡 Pista 3: La Ruta del Laberinto Profundo atraviesa la galería sudoeste (27 instrucciones).'
          ]
        }`;

// 6. Summary modal routeName replacement
const routeOldRegex = /let routeName = `Camino completado \(\$\{total\} instrucciones\)`[\s\S]*?else routeName = `Ruta Personalizada \(\$\{total\} instrucciones\)`;\s*\}/;

const routeNew = `let routeName = \`Camino completado (\${total} instrucciones)\`;
      if (this.currentGrade === 1) {
        if (total === 6) routeName = 'Camino Óptimo (Ruta Directa • 6 instrucciones)';
        else if (total === 10) routeName = 'Alternativa 1 (Camino Central • 10 instrucciones)';
        else if (total === 14) routeName = 'Alternativa 2 (Camino Exterior • 14 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 2) {
        if (total === 8) routeName = 'Camino Óptimo (Ruta Directa • 8 instrucciones)';
        else if (total === 11) routeName = 'Alternativa 1 (Camino Central • 11 instrucciones)';
        else if (total === 16) routeName = 'Alternativa 2 (Rodeo Exterior • 16 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 3) {
        if (total === 10) routeName = 'Camino Óptimo (Vía Rápida • 10 instrucciones)';
        else if (total === 15) routeName = 'Alternativa 1 (Vía Central • 15 instrucciones)';
        else if (total === 18) routeName = 'Alternativa 2 (Vía Perimetral • 18 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 4) {
        if (total === 12) routeName = 'Camino Óptimo (Galería Norte • 12 instrucciones)';
        else if (total === 17) routeName = 'Alternativa 1 (Galería Este • 17 instrucciones)';
        else if (total === 23) routeName = 'Alternativa 2 (Galería Sudoeste • 23 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 5) {
        if (total === 14) routeName = 'Camino Óptimo (Ruta de las Almenas • 14 instrucciones)';
        else if (total === 20) routeName = 'Alternativa 1 (Ruta del Portal Este • 20 instrucciones)';
        else if (total === 27) routeName = 'Alternativa 2 (Ruta del Laberinto Profundo • 27 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      }`;

console.log('Testing regex matches:');
console.log('G1 match:', g1OldRegex.test(code));
console.log('G2 match:', g2OldRegex.test(code));
console.log('G3 match:', g3OldRegex.test(code));
console.log('G4 match:', g4OldRegex.test(code));
console.log('G5 match:', g5OldRegex.test(code));
console.log('Route match:', routeOldRegex.test(code));

if (g1OldRegex.test(code) && g2OldRegex.test(code) && g3OldRegex.test(code) && g4OldRegex.test(code) && g5OldRegex.test(code) && routeOldRegex.test(code)) {
  code = code.replace(g1OldRegex, g1New);
  code = code.replace(g2OldRegex, g2New);
  code = code.replace(g3OldRegex, g3New);
  code = code.replace(g4OldRegex, g4New);
  code = code.replace(g5OldRegex, g5New);
  code = code.replace(routeOldRegex, routeNew);

  fs.writeFileSync(bityPath, code, 'utf8');
  console.log('Successfully updated js/bityBlockly.js with all 5 reformed mazes and route labels!');
} else {
  console.error('One or more regexes did not match!');
  process.exit(1);
}
