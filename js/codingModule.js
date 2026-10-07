/**
 * codingModule.js
 * Módulo de Programación y Pensamiento Computacional (1.º a 5.º Grado)
 * Sección: INSTRUCCIONES
 *
 * Características principales:
 * - Sistema General de Intentos y Pistas Progresivas (3 errores -> Pista 1, 6 errores -> Pista 2, 9 errores -> Pista 3).
 * - Impacto de pistas en puntuación de estrellas (⭐⭐⭐ sin pistas, ⭐⭐ con 1 pista, ⭐ con 2 o 3 pistas).
 * - Reinicio total de actividad (intentos = 0, pistas = 0, estado inicial).
 * - Soporte para 12 tipos de actividades interactivas diferenciadas por grado.
 * - Simulador de cuadrícula robusto con detección exacta del paso fallido y cancelación segura de animaciones.
 * - Soporte táctil y drag & drop para ordenamiento.
 * - Personaje guía: Robot Byte 🤖 con síntesis de voz accesible (TTS).
 */

// ========================================================
// CURRÍCULA PEDAGÓGICA DIFERENCIADA (1.° a 5.° Grado)
// ========================================================
const CODING_DATA = {
  grades: {
    // ----------------------------------------------------
    // 1.° GRADO: Exploradores del Código (Muy visual, 2-4 pasos)
    // ----------------------------------------------------
    1: {
      number: 1,
      name: 'Exploradores del Código',
      badge: '1.º Grado 🐣',
      colorClass: 'coding-g-1',
      accentColor: '#4caf50',
      description: 'Actividades muy visuales, imágenes grandes, 2 a 4 pasos simples y órdenes concretas.',
      instructions: {
        activities: [
          // 1. Teoría interactiva
          {
            id: 'theory',
            type: 'theory',
            title: '📖 ¿Qué es una Instrucción?',
            intro: '¡Hola! Soy Byte 🤖. En el mundo de las computadoras, una INSTRUCCIÓN es algo que le decimos a alguien o a una máquina que haga.',
            quote: '«Una instrucción es algo que le decimos a alguien o a una máquina que haga.»',
            pillars: [
              { icon: '👉', title: '1. Indica qué hacer', desc: 'Acción clara: «Poné el libro sobre la mesa».' },
              { icon: '🔢', title: '2. Debe estar ordenada', desc: 'Primero las medias 🧦, después los zapatos 👟.' },
              { icon: '🎯', title: '3. Debe ser muy clara', desc: 'No digas «Hacé eso». Decí: «Guardá el lápiz».' }
            ],
            examples: [
              { id: 'dientes', icon: '🪥', name: 'Lavarse los dientes', steps: [{ icon: '🧴', text: 'Poner pasta' }, { icon: '🪥', text: 'Cepillar' }, { icon: '💧', text: 'Enjuagar' }] },
              { id: 'mochila', icon: '🎒', name: 'Preparar la mochila', steps: [{ icon: '🎒', text: 'Buscar mochila' }, { icon: '🔓', text: 'Abrirla' }, { icon: '📚', text: 'Guardar cuadernos' }, { icon: '🔒', text: 'Cerrarla' }] },
              { id: 'planta', icon: '🌱', name: 'Regar una planta', steps: [{ icon: '🚰', text: 'Llenar regadera' }, { icon: '🪴', text: 'Acercarse' }, { icon: '💧', text: 'Regar' }] }
            ]
          },

          // 2. ¿Qué es una instrucción?
          {
            id: 'what_is_inst',
            type: 'identify_instruction',
            title: '🎯 Actividad 1: ¿Qué es una Instrucción?',
            instruction: 'Selecciona ÚNICAMENTE la frase que representa una orden o instrucción:',
            options: [
              { id: 'opt1', text: '«Guardá el lápiz en la cartuchera.»', isInstruction: true, icon: '✏️' },
              { id: 'opt2', text: '«El lápiz es de color amarillo.»', isInstruction: false, icon: '🎨' }
            ],
            hints: [
              '💡 Pensá: ¿cuál de las dos frases le pide a alguien que haga una acción?',
              '💡 Una descripción solo dice cómo es algo (ej. su color), no da una orden.',
              '💡 La instrucción es la que dice «Guardá...» porque indica qué tarea realizar.'
            ]
          },

          // 3. ¿Qué paso falta?
          {
            id: 'missing_step',
            type: 'missing_step',
            title: '🧩 Actividad 2: ¿Qué paso falta?',
            instruction: 'A esta secuencia para lavarse las manos le falta un paso importante:',
            sequence: [
              { num: 1, icon: '🚰', text: 'Mojarse las manos con agua' },
              { num: 2, icon: '❓', text: '____________________', isMissing: true },
              { num: 3, icon: '🧺', text: 'Secarse las manos con una toalla' }
            ],
            options: [
              { id: 'm_opt1', text: 'Enjabonarse bien con jabón', isCorrect: true, icon: '🧼' },
              { id: 'm_opt2', text: 'Ponerse los zapatos', isCorrect: false, icon: '👟' },
              { id: 'm_opt3', text: 'Comer una manzana', isCorrect: false, icon: '🍎' }
            ],
            hints: [
              '💡 Pensá: entre mojarte las manos y secarte, ¿qué producto de higiene necesitás usar?',
              '💡 Para que las manos queden limpias, hace falta frotar con jabón.',
              '💡 La respuesta correcta es «Enjabonarse bien con jabón».'
            ]
          },

          // 4. Plantar una semilla (Actividad Interactiva visual)
          {
            id: 'plant_seed',
            type: 'seed_interactive',
            title: '🌱 Actividad 3: ¿Cómo plantar una semilla?',
            instruction: 'Toca las 4 instrucciones en el orden exacto para que la planta crezca:',
            steps: [
              { id: 'seed_1', icon: '🪴', label: '1. Buscar una maceta' },
              { id: 'seed_2', icon: '🟫', label: '2. Poner tierra fértil' },
              { id: 'seed_3', icon: '🌱', label: '3. Colocar la semilla' },
              { id: 'seed_4', icon: '💧', label: '4. Regar con agua' }
            ],
            correctOrder: ['seed_1', 'seed_2', 'seed_3', 'seed_4'],
            hints: [
              '💡 Pensá qué recipiente necesitás tener antes de poder colocar nada adentro.',
              '💡 Primero va la maceta, luego la tierra para que la semilla tenga dónde apoyarse.',
              '💡 El orden es: 1. Maceta ➡️ 2. Tierra ➡️ 3. Semilla ➡️ 4. Regar con agua.'
            ]
          },

          // 5. Ordená los pasos
          {
            id: 'order_apple',
            type: 'order_steps',
            title: '🍎 Actividad 4: Ordená los pasos para comer una manzana',
            instruction: 'Ordená estos 3 pasos de arriba hacia abajo:',
            items: [
              { id: 'ap_eat', icon: '😋', text: 'Comer la rica manzana' },
              { id: 'ap_wash', icon: '🚿', text: 'Lavar la manzana con agua' },
              { id: 'ap_cut', icon: '🔪', text: 'Cortar o pelar la manzana' }
            ],
            correctOrder: ['ap_wash', 'ap_cut', 'ap_eat'],
            hints: [
              '💡 ¿Podríamos comer la manzana antes de lavarla? Pensá en la higiene.',
              '💡 Primero siempre lavamos la fruta con agua limpia.',
              '💡 El orden correcto es: Lavar ➡️ Cortar ➡️ Comer.'
            ]
          },

          // 6. Ayudá a Byte a llegar (Cuadrícula 3x3)
          {
            id: 'grid_byte_g1',
            type: 'grid_movement',
            title: '🤖 Actividad 5: Ayudá a Byte a llegar a la estrella',
            instruction: 'Programá a Byte con las flechas para llegar hasta la estrella ⭐:',
            gridSize: 3,
            startPos: { x: 0, y: 0 },
            targetPos: { x: 2, y: 0 },
            targetIcon: '⭐',
            obstacles: [],
            hints: [
              '💡 Mirá hacia dónde está la estrella: está a la derecha de Byte en la misma fila.',
              '💡 Necesitás avanzar hacia la derecha 2 veces.',
              '💡 La secuencia exacta es: ➡️ Derecha y ➡️ Derecha.'
            ]
          },

          // 7. Desafío Final
          {
            id: 'final_challenge',
            type: 'final_challenge',
            title: '🏆 Desafío Final: Preparar leche con cacao para Byte',
            instruction: 'Selecciona y ordena las 3 instrucciones necesarias (descarta las 2 que no corresponden):',
            pool: [
              { id: 'cup', icon: '☕', text: 'Buscar la taza limpia', isRequired: true, correctPos: 1 },
              { id: 'sleep', icon: '😴', text: 'Dormir una siesta', isRequired: false, distractor: true },
              { id: 'milk', icon: '🥛', text: 'Servir la leche', isRequired: true, correctPos: 2 },
              { id: 'ball', icon: '⚽', text: 'Patear una pelota', isRequired: false, distractor: true },
              { id: 'cocoa', icon: '🍫', text: 'Poner una cucharada de cacao', isRequired: true, correctPos: 3 }
            ],
            requiredCount: 3,
            hints: [
              '💡 Descartá las acciones que no tienen que ver con cocinar (como dormir o patear una pelota).',
              '💡 Primero buscás la taza, luego vertés la leche.',
              '💡 Las 3 instrucciones en orden son: 1. Taza ➡️ 2. Leche ➡️ 3. Cacao.'
            ]
          }
        ]
      }
    },

    // ----------------------------------------------------
    // 2.° GRADO: Constructores Lógicos (3-5 pasos, distractores)
    // ----------------------------------------------------
    2: {
      number: 2,
      name: 'Constructores Lógicos',
      badge: '2.º Grado 🧱',
      colorClass: 'coding-g-2',
      accentColor: '#0288d1',
      description: 'Más pasos, órdenes claras vs. confusas y detección de distractores.',
      instructions: {
        activities: [
          // 1. Teoría
          {
            id: 'theory',
            type: 'theory',
            title: '📖 Instrucciones Claras y Sin Distracciones',
            intro: '¡Hola constructor! En 2.° grado aprendemos que las computadoras se confunden si les damos órdenes dudosas o pasos que no tienen nada que ver.',
            quote: '«Una buena instrucción dice con precisión qué hacer y no incluye pasos innecesarios.»',
            pillars: [
              { icon: '🎯', title: '1. Claridad total', desc: '«Guardá el cuaderno de matemáticas», no «Hacé eso».' },
              { icon: '🧹', title: '2. Sin distractores', desc: 'No mezclar jugar videojuegos con preparar la mochila.' },
              { icon: '🔄', title: '3. Pasos continuos', desc: 'Cada instrucción prepara el camino para la que sigue.' }
            ],
            examples: [
              { id: 'mochila', icon: '🎒', name: 'Mochila escolar', steps: [{ icon: '🎒', text: 'Abrir mochila' }, { icon: '📚', text: 'Guardar cuaderno' }, { icon: '✏️', text: 'Guardar cartuchera' }, { icon: '🔒', text: 'Cerrar' }] },
              { id: 'ensalada', icon: '🍎', name: 'Ensalada de frutas', steps: [{ icon: '🛒', text: 'Buscar frutas' }, { icon: '🚿', text: 'Lavarlas' }, { icon: '🔪', text: 'Cortarlas' }, { icon: '🥣', text: 'Servir' }] }
            ]
          },

          // 2. Instrucción clara o confusa
          {
            id: 'clear_or_confusing',
            type: 'clear_or_confusing',
            title: '❓ Actividad 1: Instrucción Clara o Confusa',
            instruction: 'Analiza cada orden y determina si es CLARA o CONFUSA:',
            cards: [
              { id: 'c1', text: '«Arreglá eso de ahí.»', isClear: false, reason: 'Es confusa porque no dice qué objeto arreglar ni qué herramienta usar.' },
              { id: 'c2', text: '«Guardá la regla de plástico adentro de la cartuchera.»', isClear: true, reason: 'Es clara porque especifica exactamente el objeto y dónde colocarlo.' }
            ],
            hints: [
              '💡 Pensá: si una persona o robot no sabe de qué le hablás, ¿podría cumplir la orden?',
              '💡 Las palabras como «eso», «aquello» o «ahí» causan confusión.',
              '💡 La primera es CONFUSA y la segunda es CLARA.'
            ]
          },

          // 3. Instrucción innecesaria
          {
            id: 'unnecessary_step',
            type: 'unnecessary_step',
            title: '🧹 Actividad 2: Detectar la Instrucción Innecesaria',
            instruction: 'Byte está preparando su mochila escolar. Tocá la instrucción que NO CORRESPONDE y sobra:',
            items: [
              { id: 'u1', text: '1. Abrir la mochila vacía', isUnnecessary: false, icon: '🎒' },
              { id: 'u2', text: '2. Bailar la macarena tres veces', isUnnecessary: true, icon: '💃' },
              { id: 'u3', text: '3. Guardar los libros y cuadernos', isUnnecessary: false, icon: '📚' },
              { id: 'u4', text: '4. Guardar la cartuchera', isUnnecessary: false, icon: '✏️' },
              { id: 'u5', text: '5. Cerrar la mochila', isUnnecessary: false, icon: '🔒' }
            ],
            hints: [
              '💡 Leé todas las acciones: ¿cuál de ellas no ayuda en nada a guardar los útiles escolares?',
              '💡 Bailar es divertido, pero no es parte del procedimiento para armar la mochila.',
              '💡 La instrucción innecesaria que debes eliminar es «Bailar la macarena tres veces».'
            ]
          },

          // 4. Ordená los pasos
          {
            id: 'order_backpack',
            type: 'order_steps',
            title: '🎒 Actividad 3: Ordená los 4 pasos de la mochila',
            instruction: 'Ordená las tarjetas cronológicamente:',
            items: [
              { id: 'bp_close', icon: '🔒', text: 'Cerrar la mochila con el cierre' },
              { id: 'bp_open', icon: '🔓', text: 'Abrir el cierre de la mochila' },
              { id: 'bp_pencil', icon: '✏️', text: 'Guardar la cartuchera' },
              { id: 'bp_books', icon: '📚', text: 'Guardar los cuadernos escolares' }
            ],
            correctOrder: ['bp_open', 'bp_books', 'bp_pencil', 'bp_close'],
            hints: [
              '💡 ¿Podés guardar los cuadernos si la mochila todavía está cerrada?',
              '💡 Lo primero es abrirla y lo último es cerrarla.',
              '💡 El orden es: 1. Abrir ➡️ 2. Guardar cuadernos ➡️ 3. Guardar cartuchera ➡️ 4. Cerrar.'
            ]
          },

          // 5. Encontrá el error
          {
            id: 'find_error_teeth',
            type: 'find_error',
            title: '🪥 Actividad 4: Encontrá el error en lavarse los dientes',
            instruction: 'Mirá esta secuencia. ¿Cuál de estos pasos está en el momento EQUIVOCADO?',
            steps: [
              { id: 't1', num: 1, text: 'Guardar el cepillo en el vaso del baño', isError: true, icon: '🚪' },
              { id: 't2', num: 2, text: 'Poner pasta dental en el cepillo', isError: false, icon: '🧴' },
              { id: 't3', num: 3, text: 'Cepillarse los dientes durante 2 minutos', isError: false, icon: '🪥' },
              { id: 't4', num: 4, text: 'Enjuagarse la boca con agua', isError: false, icon: '💧' }
            ],
            explanation: '¡No podemos guardar el cepillo antes de haberlo usado para cepillarnos los dientes!',
            hints: [
              '💡 Fijate en qué momento se guarda el cepillo de dientes.',
              '💡 Si guardás el cepillo en el paso 1, ¿con qué te vas a cepillar en el paso 3?',
              '💡 El error está en el Paso 1: guardar el cepillo antes de lavarse.'
            ]
          },

          // 6. Ayudá a Byte (Cuadrícula 4x4 con obstáculo)
          {
            id: 'grid_byte_g2',
            type: 'grid_movement',
            title: '🤖 Actividad 5: Ayudá a Byte a esquivar la roca',
            instruction: 'Programá a Byte con las flechas para llegar al engranaje ⚙️ esquivando la roca 🪨:',
            gridSize: 4,
            startPos: { x: 0, y: 0 },
            targetPos: { x: 2, y: 2 },
            targetIcon: '⚙️',
            obstacles: [{ x: 1, y: 1 }],
            hints: [
              '💡 La roca está en el centro (casilla 1,1). Podés rodearla por arriba o por la izquierda.',
              '💡 Probá: ➡️ Derecha, ➡️ Derecha, ⬇️ Abajo, ⬇️ Abajo.',
              '💡 Secuencia sugerida: ➡️ ➡️ ⬇️ ⬇️.'
            ]
          },

          // 7. Desafío Final
          {
            id: 'final_challenge',
            type: 'final_challenge',
            title: '🏆 Desafío Final: Preparar la merienda completa',
            instruction: 'Selecciona y ordena las 4 instrucciones requeridas (descarta los 2 distractores):',
            pool: [
              { id: 'cup', icon: '☕', text: 'Tomar la taza limpia', isRequired: true, correctPos: 1 },
              { id: 'tv', icon: '📺', text: 'Encender el televisor', isRequired: false, distractor: true },
              { id: 'milk', icon: '🥛', text: 'Servir la leche tibia', isRequired: true, correctPos: 2 },
              { id: 'sugar', icon: '🥄', text: 'Agregar una cucharada de azúcar', isRequired: true, correctPos: 3 },
              { id: 'bike', icon: '🚲', text: 'Andar en bicicleta', isRequired: false, distractor: true },
              { id: 'stir', icon: '😋', text: 'Revolver y disfrutar', isRequired: true, correctPos: 4 }
            ],
            requiredCount: 4,
            hints: [
              '💡 Ver televisión y andar en bicicleta no son parte de preparar la leche.',
              '💡 Servir la leche va después de tomar la taza, y luego endulzar.',
              '💡 Secuencia: 1. Taza ➡️ 2. Leche ➡️ 3. Azúcar ➡️ 4. Revolver.'
            ]
          }
        ]
      }
    },

    // ----------------------------------------------------
    // 3.° GRADO: Aventureros Digitales (4-6 pasos, caminos)
    // ----------------------------------------------------
    3: {
      number: 3,
      name: 'Aventureros Digitales',
      badge: '3.º Grado 🏹',
      colorClass: 'coding-g-3',
      accentColor: '#fbc02d',
      description: 'Secuencias lógicas, cuadrículas interactivas, completar órdenes y caminos con obstáculos.',
      instructions: {
        activities: [
          // 1. Teoría
          {
            id: 'theory',
            type: 'theory',
            title: '📖 Secuencias Espaciales y Algoritmos',
            intro: '¡Hola aventurero! En 3.° grado cada paso es una coordenada o parámetro: avanzar, retroceder, girar y evaluar el camino óptimo.',
            quote: '«En robótica, cada movimiento es una orden precisa con dirección y distancia.»',
            pillars: [
              { icon: '🧭', title: '1. Comandos de Dirección', desc: '⬆️ Arriba, ⬇️ Abajo, ⬅️ Izquierda, ➡️ Derecha.' },
              { icon: '🧱', title: '2. Detección de Obstáculos', desc: 'Las paredes y rocas detienen a los robots.' },
              { icon: '🎯', title: '3. El Camino Óptimo', desc: 'Llegar a la meta con la menor cantidad de pasos.' }
            ],
            examples: [
              { id: 'camino', icon: '🗺️', name: 'Ruta de Byte', steps: [{ icon: '➡️', text: 'Avanzar 2 casillas al este' }, { icon: '⬇️', text: 'Bajar 2 casillas al sur' }, { icon: '💎', text: 'Tomar el diamante' }] }
            ]
          },

          // 2. Completá la instrucción
          {
            id: 'complete_instruction',
            type: 'complete_instruction',
            title: '✏️ Actividad 1: Completá la Instrucción con Precisión',
            sentenceBefore: '«Poné el libro de cuentos',
            sentenceAfter: 'la mochila escolar.»',
            options: [
              { id: 'opt_a', text: 'dentro de', isCorrect: true },
              { id: 'opt_b', text: 'bailando con', isCorrect: false },
              { id: 'opt_c', text: 'amarillo como', isCorrect: false }
            ],
            hints: [
              '💡 La palabra debe indicar la ubicación o destino del libro.',
              '💡 «Bailando» o «amarillo» no indican dónde poner un objeto.',
              '💡 La opción correcta es «dentro de».'
            ]
          },

          // 3. ¿Qué paso falta?
          {
            id: 'missing_step_g3',
            type: 'missing_step',
            title: '🧩 Actividad 2: ¿Qué paso falta en la carta?',
            instruction: 'Para enviar una carta por correo postal, ¿cuál es el paso faltante?',
            sequence: [
              { num: 1, icon: '✍️', text: 'Escribir el mensaje en la hoja' },
              { num: 2, icon: '✉️', text: 'Guardar la hoja en el sobre' },
              { num: 3, icon: '❓', text: '____________________', isMissing: true },
              { num: 4, icon: '📮', text: 'Depositar el sobre en el buzón' }
            ],
            options: [
              { id: 'c_opt1', text: 'Escribir la dirección del destinatario y pegar la estampilla', isCorrect: true, icon: '🏷️' },
              { id: 'c_opt2', text: 'Romper la carta en pedacitos', isCorrect: false, icon: '✂️' },
              { id: 'c_opt3', text: 'Regar las plantas del jardín', isCorrect: false, icon: '🌱' }
            ],
            hints: [
              '💡 Si tirás la carta al buzón sin dirección, ¿cómo sabe el cartero a dónde llevarla?',
              '💡 Hace falta indicar a quién va dirigida y su dirección.',
              '💡 Falta «Escribir la dirección del destinatario y pegar la estampilla».'
            ]
          },

          // 4. Ordená los pasos (Ensalada de frutas)
          {
            id: 'order_fruit_salad',
            type: 'order_steps',
            title: '🍎 Actividad 3: Ordená los pasos de la ensalada de frutas',
            instruction: 'Ordená las 4 instrucciones de preparación:',
            items: [
              { id: 'fs_cut', icon: '🔪', text: 'Cortar las frutas en trozos' },
              { id: 'fs_bowl', icon: '🥣', text: 'Servir en el recipiente grande' },
              { id: 'fs_find', icon: '🍌', text: 'Buscar las frutas en la cocina' },
              { id: 'fs_wash', icon: '🚿', text: 'Lavar las frutas con agua' }
            ],
            correctOrder: ['fs_find', 'fs_wash', 'fs_cut', 'fs_bowl'],
            hints: [
              '💡 ¿Qué tenés que tener antes de lavarlas? ¡Tener las frutas en la mano!',
              '💡 Recordá: lavamos ANTES de cortar.',
              '💡 El orden es: 1. Buscar ➡️ 2. Lavar ➡️ 3. Cortar ➡️ 4. Servir.'
            ]
          },

          // 5. Detective de instrucciones
          {
            id: 'detective_g3',
            type: 'detective_step',
            title: '🔍 Actividad 4: Detective de Instrucciones',
            instruction: 'Byte intentó regar las plantas pero su programa tiene un paso absurdo. Identificalo:',
            steps: [
              { id: 'd1', text: '1. Llenar la regadera con agua limpia', isFlaw: false, icon: '🚰' },
              { id: 'd2', text: '2. Ponerse una máscara de buceo para dormir', isFlaw: true, icon: '🤿' },
              { id: 'd3', text: '3. Caminar hasta el cantero de flores', isFlaw: false, icon: '🚶' },
              { id: 'd4', text: '4. Regar suavemente la tierra', isFlaw: false, icon: '💧' }
            ],
            reason: '¡La máscara de buceo para dormir no tiene relación alguna con regar flores!',
            hints: [
              '💡 Buscá la acción que suena divertida pero que no sirve para regar.',
              '💡 El paso 2 incluye un accesorio de agua para un propósito completamente desconectado.',
              '💡 El paso incorrecto es el número 2.'
            ]
          },

          // 6. Programá a Byte (Laberinto 4x4 con detención en error)
          {
            id: 'grid_byte_g3',
            type: 'grid_movement',
            title: '🤖 Actividad 5: Programá a Byte hacia el tesoro',
            instruction: 'Construí la secuencia para que Byte llegue a la corona 👑 esquivando las rocas 🪨:',
            gridSize: 4,
            startPos: { x: 0, y: 0 },
            targetPos: { x: 3, y: 3 },
            targetIcon: '👑',
            obstacles: [
              { x: 1, y: 1 },
              { x: 2, y: 1 },
              { x: 1, y: 3 }
            ],
            hints: [
              '💡 Podés avanzar por la fila superior (y=0) hacia la derecha y luego bajar por la columna derecha.',
              '💡 Avanzá: ➡️ ➡️ ➡️ (llegás a x=3, y=0) y luego ⬇️ ⬇️ ⬇️ (llegás a x=3, y=3).',
              '💡 Ruta perfecta: ➡️ ➡️ ➡️ ⬇️ ⬇️ ⬇️.'
            ]
          },

          // 7. Desafío Final
          {
            id: 'final_challenge',
            type: 'final_challenge',
            title: '🏆 Desafío Final: Merienda con miel para Byte',
            instruction: 'Selecciona y ordena las 5 instrucciones indispensables (descarta los 2 distractores):',
            pool: [
              { id: 'cup', icon: '☕', text: 'Buscar la taza limpia', isRequired: true, correctPos: 1 },
              { id: 'milk', icon: '🥛', text: 'Calentar y servir la leche', isRequired: true, correctPos: 2 },
              { id: 'guitar', icon: '🎸', text: 'Tocar la guitarra eléctrica', isRequired: false, distractor: true },
              { id: 'honey', icon: '🍯', text: 'Añadir una cucharada de miel', isRequired: true, correctPos: 3 },
              { id: 'stir', icon: '🥄', text: 'Revolver suavemente', isRequired: true, correctPos: 4 },
              { id: 'skate', icon: '🛹', text: 'Andar en patineta', isRequired: false, distractor: true },
              { id: 'drink', icon: '😋', text: 'Beber la leche tibia', isRequired: true, correctPos: 5 }
            ],
            requiredCount: 5,
            hints: [
              '💡 Tocar la guitarra y andar en patineta son distractores.',
              '💡 La miel se añade después de la leche y se revuelve antes de tomar.',
              '💡 El orden es: Taza ➡️ Leche ➡️ Miel ➡️ Revolver ➡️ Beber.'
            ]
          }
        ]
      }
    },

    // ----------------------------------------------------
    // 4.° GRADO: Detectives de Errores (Debugging, 5-8 pasos)
    // ----------------------------------------------------
    4: {
      number: 4,
      name: 'Detectives de Errores',
      badge: '4.º Grado 🧪',
      colorClass: 'coding-g-4',
      accentColor: '#ff9800',
      description: 'Detección de errores (debugging), ambigüedad de parámetros y corrección de secuencias.',
      instructions: {
        activities: [
          // 1. Teoría
          {
            id: 'theory',
            type: 'theory',
            title: '📖 El Arte del Debugging (Depuración)',
            intro: '¡Hola detective! En programación, cuando un programa hace algo inesperado o falla, decimos que tiene un «Bug» (bicho/error). Tu misión es encontrarlo y repararlo.',
            quote: '«Encontrar y corregir errores en las instrucciones se llama Depurar (Debugging).»',
            pillars: [
              { icon: '🔍', title: '1. ¿Dónde está el error?', desc: 'Identificar el paso que rompe la lógica del flujo.' },
              { icon: '❓', title: '2. Ambigüedades', desc: '«Caminá hacia adelante» es imprecisa sin decir cuántos metros.' },
              { icon: '🧩', title: '3. Pasos faltantes', desc: 'Si falta una precondición, el programa se detiene.' }
            ],
            examples: [
              { id: 'vaso', icon: '🥤', name: 'El misterio del vaso', steps: [{ icon: '🥛', text: 'Buscar vaso' }, { icon: '🪑', text: 'Apoyar en la mesa' }, { icon: '💧', text: 'Servir agua' }, { icon: '🥤', text: 'Beber' }] }
            ]
          },

          // 2. Instrucción clara o confusa
          {
            id: 'clear_confusing_g4',
            type: 'clear_or_confusing',
            title: '❓ Actividad 1: Ambigüedad de Parámetros',
            instruction: 'Determina si la orden contiene los parámetros necesarios para ser ejecutada:',
            cards: [
              { id: 'c4_1', text: '«Avanzá hacia adelante.»', isClear: false, reason: 'Le falta el parámetro de distancia o condición de frenado: ¿cuántos pasos o metros?' },
              { id: 'c4_2', text: '«Avanzá 5 metros en línea recta hacia el norte.»', isClear: true, reason: 'Tiene distancia, dirección y orientación precisa.' }
            ],
            hints: [
              '💡 Los robots no saben cuándo frenar a menos que les demos un número o condición.',
              '💡 Decir solo «avanzá» haría que el robot camine infinitamente.',
              '💡 La primera es CONFUSA y la segunda es CLARA.'
            ]
          },

          // 3. Encontrá el error (Debugging del vaso de agua)
          {
            id: 'debug_water_glass',
            type: 'order_steps',
            title: '🔍 Actividad 2: Debugging del Vaso de Agua',
            instruction: 'Intercambia los pasos para reparar este algoritmo desordenado:',
            items: [
              { id: 'w_drink', icon: '🥤', text: 'Beber el agua fresca' },
              { id: 'w_glass', icon: '🥛', text: 'Buscar el vaso limpio' },
              { id: 'w_pour', icon: '💧', text: 'Llenar el vaso con agua' },
              { id: 'w_table', icon: '🪑', text: 'Apoyar el vaso sobre la mesa' }
            ],
            correctOrder: ['w_glass', 'w_table', 'w_pour', 'w_drink'],
            hints: [
              '💡 ¿Podés llenar un vaso con agua antes de haberlo buscado en la alacena?',
              '💡 Primero buscás el vaso y lo apoyás seguro en la mesa.',
              '💡 El orden reparado es: Vaso ➡️ Mesa ➡️ Servir agua ➡️ Beber.'
            ]
          },

          // 4. Instrucción innecesaria (Programa de pintura)
          {
            id: 'unnecessary_paint',
            type: 'unnecessary_step',
            title: '🧹 Actividad 3: La instrucción que bloquea el programa',
            instruction: 'Byte programó una tarea para pintar una lámina. Tocá la instrucción defectuosa que bloquea el material:',
            items: [
              { id: 'p1', text: '1. Mojar el pincel en agua limpia', isUnnecessary: false, icon: '🖌️' },
              { id: 'p2', text: '2. Guardar las témperas bajo llave en el armario', isUnnecessary: true, icon: '🔐' },
              { id: 'p3', text: '3. Tomar pintura y trazar en la hoja', isUnnecessary: false, icon: '🎨' },
              { id: 'p4', text: '4. Dejar secar la hoja al sol', isUnnecessary: false, icon: '☀️' }
            ],
            hints: [
              '💡 Pensá: si guardás las pinturas con llave en el paso 2, ¿con qué vas a pintar en el paso 3?',
              '💡 El paso 2 bloquea el acceso a la pintura antes de pintar.',
              '💡 La instrucción que debes eliminar es el Paso 2.'
            ]
          },

          // 5. Creá tu propia secuencia (5 tarjetas)
          {
            id: 'build_seq_g4',
            type: 'build_sequence',
            title: '🧩 Actividad 4: Creá la secuencia para hornear galletitas',
            instruction: 'Selecciona y ordena del banco los 5 pasos lógicos para hornear:',
            pool: [
              { id: 'bk_mix', icon: '🥣', text: 'Mezclar harina, manteca y azúcar', correctPos: 1 },
              { id: 'bk_shape', icon: '🍪', text: 'Cortar las formas de las galletitas', correctPos: 2 },
              { id: 'bk_tray', icon: '🍽️', text: 'Colocarlas en la bandeja para horno', correctPos: 3 },
              { id: 'bk_bake', icon: '🔥', text: 'Hornear a 180° por 15 minutos', correctPos: 4 },
              { id: 'bk_cool', icon: '😋', text: 'Dejar enfriar y degustar', correctPos: 5 },
              { id: 'bk_dist1', icon: '🏊', text: 'Nadar en la pileta olímpica', distractor: true }
            ],
            requiredCount: 5,
            hints: [
              '💡 Descartá el distractor de nadar.',
              '💡 Pensá en las etapas de la cocina: masa ➡️ formas ➡️ bandeja ➡️ horno ➡️ enfriar.',
              '💡 Orden: 1. Mezclar ➡️ 2. Formas ➡️ 3. Bandeja ➡️ 4. Hornear ➡️ 5. Enfriar.'
            ]
          },

          // 6. Programá a Byte (Cuadrícula 5x5 con ruta alternativa)
          {
            id: 'grid_byte_g4',
            type: 'grid_movement',
            title: '🤖 Actividad 5: Programá a Byte en el laboratorio 5x5',
            instruction: 'Guía a Byte hasta la supercomputadora 💻 esquivando la barrera de rocas 🪨:',
            gridSize: 5,
            startPos: { x: 0, y: 0 },
            targetPos: { x: 4, y: 4 },
            targetIcon: '💻',
            obstacles: [
              { x: 2, y: 0 },
              { x: 2, y: 1 },
              { x: 2, y: 2 },
              { x: 2, y: 3 }
            ],
            hints: [
              '💡 Hay un muro vertical de rocas en x=2 que cubre desde y=0 hasta y=3. Pero hay un paso libre en y=4!',
              '💡 Bajá por la columna izquierda hasta la última fila (y=4) y luego cruzá hacia la derecha.',
              '💡 Hacé: ⬇️ ⬇️ ⬇️ ⬇️ (llegás a 0,4) y luego ➡️ ➡️ ➡️ ➡️ (llegás a 4,4).'
            ]
          },

          // 7. Desafío Final
          {
            id: 'final_challenge',
            type: 'final_challenge',
            title: '🏆 Desafío Final: Algoritmo de merienda caliente',
            instruction: 'Selecciona y ordena las 5 instrucciones respetando las dependencias lógicas:',
            pool: [
              { id: 'cup', icon: '☕', text: 'Tomar la taza de cerámica limpia', isRequired: true, correctPos: 1 },
              { id: 'heat', icon: '🔥', text: 'Calentar la leche en el hervidor', isRequired: true, correctPos: 2 },
              { id: 'piano', icon: '🎹', text: 'Afinar un piano de cola', isRequired: false, distractor: true },
              { id: 'pour', icon: '🥛', text: 'Servir la leche caliente en la taza', isRequired: true, correctPos: 3 },
              { id: 'cinnamon', icon: '🌿', text: 'Espolvorear canela y azúcar', isRequired: true, correctPos: 4 },
              { id: 'cloud', icon: '☁️', text: 'Mirar las nubes del cielo', isRequired: false, distractor: true },
              { id: 'stir', icon: '🥄', text: 'Mezclar con una cucharita', isRequired: true, correctPos: 5 }
            ],
            requiredCount: 5,
            hints: [
              '💡 Afinar un piano y mirar las nubes son tareas distractoras.',
              '💡 Calentar la leche debe ocurrir antes de servirla en la taza.',
              '💡 Secuencia: 1. Taza ➡️ 2. Calentar ➡️ 3. Servir ➡️ 4. Canela ➡️ 5. Mezclar.'
            ]
          }
        ]
      }
    },

    // ----------------------------------------------------
    // 5.° GRADO: Maestros Algorítmicos (Precondiciones, multi-objetivo)
    // ----------------------------------------------------
    5: {
      number: 5,
      name: 'Maestros Algorítmicos',
      badge: '5.º Grado 🔮',
      colorClass: 'coding-g-5',
      accentColor: '#9c27b0',
      description: 'Misiones multi-objetivo, precondiciones lógicas, optimización de algoritmos y flujos de datos.',
      instructions: {
        activities: [
          // 1. Teoría
          {
            id: 'theory',
            type: 'theory',
            title: '📖 Pensamiento Algorítmico y Precondiciones',
            intro: '¡Hola maestro del código! En 5.° grado planificamos algoritmos complejos donde cada instrucción depende de que el estado previo sea válido (precondiciones).',
            quote: '«Un algoritmo es un conjunto finito, ordenado y sin ambigüedades de instrucciones para resolver un problema.»',
            pillars: [
              { icon: '📋', title: '1. Planificación Previa', desc: 'Prever qué recursos o estados se necesitan antes de ejecutar.' },
              { icon: '🎯', title: '2. Precondiciones', desc: 'No se puede «Abrir la puerta» si antes no se desbloqueó la cerradura.' },
              { icon: '⚡', title: '3. Optimización', desc: 'Cumplir metas múltiples con la menor cantidad de pasos.' }
            ],
            examples: [
              { id: 'mision', icon: '💻', name: 'Misión del Pendrive', steps: [{ icon: '🚪', text: 'Entrar por la puerta' }, { icon: '💻', text: 'Descargar datos en la PC' }, { icon: '💾', text: 'Guardar en pendrive' }, { icon: '🚪', text: 'Salir' }] }
            ]
          },

          // 2. Precondiciones lógicas
          {
            id: 'preconditions_g5',
            type: 'identify_instruction',
            title: '🎯 Actividad 1: El Desafío de las Precondiciones',
            instruction: 'Un robot recibe la orden: «Abrir la caja fuerte». Pero la caja tiene un candado electrónico con clave. ¿Cuál es la precondición faltante?',
            options: [
              { id: 'pr1', text: 'Introducir la clave numérica correcta en el panel electrónico', isInstruction: true, icon: '🔢' },
              { id: 'pr2', text: 'Esperar a que llueva afuera del edificio', isInstruction: false, icon: '🌧️' }
            ],
            hints: [
              '💡 ¿Qué acción técnica permite destrabar el candado electrónico?',
              '💡 El clima exterior no afecta el mecanismo de la caja fuerte.',
              '💡 La precondición necesaria es «Introducir la clave numérica correcta».'
            ]
          },

          // 3. Detective de instrucciones (Envío de archivo)
          {
            id: 'detective_g5',
            type: 'detective_step',
            title: '🔍 Actividad 2: Detective de Flujo de Datos',
            instruction: 'Analiza el algoritmo para enviar un archivo cifrado y tocá el paso que rompe la seguridad:',
            steps: [
              { id: 'fl1', text: '1. Seleccionar el archivo en el explorador', isFlaw: false, icon: '📁' },
              { id: 'fl2', text: '2. Enviar el archivo a desconocidos por redes públicas', isFlaw: true, icon: '⚠️' },
              { id: 'fl3', text: '3. Cifrar el archivo con clave privada', isFlaw: false, icon: '🔒' },
              { id: 'fl4', text: '4. Transmitir por el canal seguro a destino', isFlaw: false, icon: '📡' }
            ],
            reason: '¡Enviar el archivo a desconocidos antes de cifrarlo viola la seguridad del algoritmo!',
            hints: [
              '💡 Buscá el paso que contradice la privacidad y el flujo de datos seguro.',
              '💡 Enviar datos confidenciales por redes públicas sin protección es un error crítico.',
              '💡 El paso incorrecto es el Paso 2.'
            ]
          },

          // 4. Ordená el algoritmo (Mensaje Digital)
          {
            id: 'order_digital_msg',
            type: 'order_steps',
            title: '💻 Actividad 3: Algoritmo de Comunicación Digital',
            instruction: 'Ordená con rigor algorítmico las 5 fases de transmisión:',
            items: [
              { id: 'msg_send', icon: '📤', text: 'Presionar el botón Enviar' },
              { id: 'msg_power', icon: '🔌', text: 'Encender la terminal' },
              { id: 'msg_check', icon: '🔍', text: 'Verificar destinatario y texto' },
              { id: 'msg_app', icon: '💬', text: 'Abrir el software de mensajería' },
              { id: 'msg_type', icon: '✍️', text: 'Redactar el mensaje' }
            ],
            correctOrder: ['msg_power', 'msg_app', 'msg_type', 'msg_check', 'msg_send'],
            hints: [
              '💡 No podés abrir un programa si la máquina está apagada.',
              '💡 Se verifica que no haya errores ANTES de enviar.',
              '💡 El flujo es: 1. Encender ➡️ 2. Abrir software ➡️ 3. Redactar ➡️ 4. Verificar ➡️ 5. Enviar.'
            ]
          },

          // 5. Creá tu propia secuencia (Desayuno Completo)
          {
            id: 'build_seq_g5',
            type: 'build_sequence',
            title: '🧩 Actividad 4: Planificación de Tarea Compleja',
            instruction: 'Construye el procedimiento de laboratorio seleccionando y ordenando las 5 fases:',
            pool: [
              { id: 'sq1', icon: '🧪', text: 'Esterilizar los tubos de ensayo', correctPos: 1 },
              { id: 'sq2', icon: '💧', text: 'Medir la solución en la probeta graduada', correctPos: 2 },
              { id: 'sq3', icon: '🌡️', text: 'Monitorear la temperatura con termómetro', correctPos: 3 },
              { id: 'sq4', icon: '🔬', text: 'Analizar la reacción bajo el microscopio', correctPos: 4 },
              { id: 'sq5', icon: '📝', text: 'Registrar los resultados en la bitácora', correctPos: 5 },
              { id: 'sq_dist', icon: '🛹', text: 'Hacer piruetas en patineta', distractor: true }
            ],
            requiredCount: 5,
            hints: [
              '💡 Descartá la patineta que no pertenece a un laboratorio.',
              '💡 La higiene (esterilizar) siempre es la primera precondición.',
              '💡 Orden: 1. Esterilizar ➡️ 2. Medir solución ➡️ 3. Temperatura ➡️ 4. Microscopio ➡️ 5. Bitácora.'
            ]
          },

          // 6. Misión Multi-Objetivo de Byte (Cuadrícula 5x5)
          {
            id: 'grid_byte_g5',
            type: 'grid_multi_goal',
            title: '🤖 Actividad 5: Misión Multi-Objetivo de Byte',
            instruction: 'Programá a Byte para cumplir los 3 objetivos en orden: 💻 PC ➡️ 💾 Pendrive ➡️ 🚪 Puerta:',
            gridSize: 5,
            startPos: { x: 0, y: 0 },
            goals: [
              { id: 'pc', x: 2, y: 1, icon: '💻', name: 'Computadora' },
              { id: 'usb', x: 4, y: 3, icon: '💾', name: 'Pendrive' },
              { id: 'door', x: 0, y: 4, icon: '🚪', name: 'Puerta' }
            ],
            obstacles: [
              { x: 1, y: 1 },
              { x: 3, y: 1 },
              { x: 2, y: 3 },
              { x: 3, y: 3 }
            ],
            hints: [
              '💡 Planificá el recorrido por tramos: Tramo 1 (de 0,0 a 2,1), Tramo 2 (de 2,1 a 4,3), Tramo 3 (de 4,3 a 0,4).',
              '💡 Para llegar a la PC: ➡️ ➡️ ⬇️ (llegás a 2,1).',
              '💡 Para llegar al pendrive: ➡️ ➡️ ⬇️ ⬇️ (llegás a 4,3). Luego bajá y ve a la izquierda hacia la puerta (0,4).'
            ]
          },

          // 7. Desafío Final
          {
            id: 'final_challenge',
            type: 'final_challenge',
            title: '🏆 Desafío Final: El Desayuno Algorítmico Integral',
            instruction: 'Selecciona y ordena las 5 instrucciones indispensables descartando los 2 distractores:',
            pool: [
              { id: 'cup', icon: '☕', text: 'Alistar taza de cerámica resistente', isRequired: true, correctPos: 1 },
              { id: 'milk', icon: '🥛', text: 'Servir leche caliente pasteurizada', isRequired: true, correctPos: 2 },
              { id: 'surf', icon: '🏄', text: 'Correr olas en la playa', isRequired: false, distractor: true },
              { id: 'honey', icon: '🍯', text: 'Incorporar endulzante natural', isRequired: true, correctPos: 3 },
              { id: 'toast', icon: '🍞', text: 'Acompañar con tostadas de pan', isRequired: true, correctPos: 4 },
              { id: 'disco', icon: '🪩', text: 'Bailar bajo la bola de boliche', isRequired: false, distractor: true },
              { id: 'ready', icon: '✨', text: 'Verificar temperatura y degustar', isRequired: true, correctPos: 5 }
            ],
            requiredCount: 5,
            hints: [
              '💡 Surfear y bailar son distractores que debes descartar.',
              '💡 La taza se prepara primero, se vierte la leche y luego se acompaña.',
              '💡 Orden: 1. Taza ➡️ 2. Leche ➡️ 3. Endulzante ➡️ 4. Tostadas ➡️ 5. Degustar.'
            ]
          }
        ]
      }
    }
  }
};

// ========================================================
// SISTEMA DE ALMACENAMIENTO DE PROGRESO
// ========================================================
class CodingProgressStorage {
  constructor() {
    this.storageKey = 'lego_coding_progress_v2';
    this._memoryFallback = null;
  }

  load() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = window.localStorage.getItem(this.storageKey);
        if (raw) return JSON.parse(raw);
      } else if (this._memoryFallback) {
        return this._memoryFallback;
      }
    } catch (e) {
      console.warn("Storage local no disponible, usando memoria temporal", e);
    }
    return {
      grades: { 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
      totalScore: 0,
      badges: []
    };
  }

  save(data) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(this.storageKey, JSON.stringify(data));
      } else {
        this._memoryFallback = data;
      }
    } catch (e) {
      console.warn("Error guardando progreso", e);
    }
  }

  getGradeProgress(grade) {
    const data = this.load();
    const gData = data.grades[grade] || {};
    return gData.instructions || {
      activitiesCompleted: [],
      score: 0,
      completed: false,
      starsTotal: 0
    };
  }

  completeActivity(grade, activityId, points = 10, stars = 3) {
    const data = this.load();
    if (!data.grades[grade]) data.grades[grade] = {};
    if (!data.grades[grade].instructions) {
      data.grades[grade].instructions = {
        activitiesCompleted: [],
        score: 0,
        completed: false,
        starsTotal: 0
      };
    }

    const inst = data.grades[grade].instructions;
    if (!inst.activitiesCompleted.includes(activityId)) {
      inst.activitiesCompleted.push(activityId);
      inst.score = (inst.score || 0) + points;
      inst.starsTotal = (inst.starsTotal || 0) + stars;
      data.totalScore = (data.totalScore || 0) + points;
    }

    const gradeTotalActivities = CODING_DATA.grades[grade].instructions.activities.length;
    if (inst.activitiesCompleted.length >= gradeTotalActivities) {
      inst.completed = true;
      const badgeId = `instructions_master_g${grade}`;
      if (!data.badges.includes(badgeId)) {
        data.badges.push(badgeId);
      }
    }

    this.save(data);
    return inst;
  }

  resetGrade(grade) {
    const data = this.load();
    if (data.grades[grade]) {
      data.grades[grade].instructions = {
        activitiesCompleted: [],
        score: 0,
        completed: false,
        starsTotal: 0
      };
      this.save(data);
    }
  }
}

// ========================================================
// GENERADOR DE AVATAR SVG DE BYTE
// ========================================================
function getByteAvatarSvg(expression = 'normal') {
  let eyes = '<circle cx="38" cy="42" r="5" fill="#38bdf8"/><circle cx="62" cy="42" r="5" fill="#38bdf8"/>';
  let mouth = '<rect x="42" y="56" width="16" height="4" rx="2" fill="#38bdf8"/>';

  if (expression === 'happy') {
    eyes = '<path d="M 33 44 Q 38 38 43 44" stroke="#38bdf8" stroke-width="3" fill="none" stroke-linecap="round"/>' +
           '<path d="M 57 44 Q 62 38 67 44" stroke="#38bdf8" stroke-width="3" fill="none" stroke-linecap="round"/>';
    mouth = '<path d="M 40 54 Q 50 63 60 54" stroke="#38bdf8" stroke-width="3" fill="none" stroke-linecap="round"/>';
  } else if (expression === 'thinking') {
    eyes = '<circle cx="38" cy="39" r="4.5" fill="#38bdf8"/><circle cx="62" cy="39" r="4.5" fill="#38bdf8"/>';
    mouth = '<circle cx="50" cy="57" r="3" fill="#38bdf8"/>';
  } else if (expression === 'worried') {
    eyes = '<circle cx="38" cy="44" r="5" fill="#f59e0b"/><circle cx="62" cy="44" r="5" fill="#f59e0b"/>';
    mouth = '<path d="M 40 60 Q 50 53 60 60" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round"/>';
  }

  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Antena con luz -->
      <line x1="50" y1="20" x2="50" y2="8" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
      <circle cx="50" cy="7" r="6" fill="#facc15" filter="drop-shadow(0 0 6px #facc15)"/>
      
      <!-- Orejas tuercas -->
      <rect x="16" y="38" width="6" height="16" rx="3" fill="#94a3b8"/>
      <rect x="78" y="38" width="6" height="16" rx="3" fill="#94a3b8"/>

      <!-- Cabeza robot con marco pantalla -->
      <rect x="22" y="20" width="56" height="52" rx="14" fill="#0f172a" stroke="#0284c7" stroke-width="4"/>
      <rect x="27" y="25" width="46" height="42" rx="10" fill="#1e293b"/>
      
      ${eyes}
      ${mouth}

      <!-- Cuello -->
      <rect x="42" y="72" width="16" height="8" rx="2" fill="#64748b"/>

      <!-- Torso con botones -->
      <path d="M 30 80 L 70 80 L 76 100 L 24 100 Z" fill="#0284c7"/>
      <circle cx="42" cy="88" r="3" fill="#38bdf8"/>
      <circle cx="58" cy="88" r="3" fill="#facc15"/>
    </svg>
  `;
}

// ========================================================
// CONTROLADOR GENERAL DEL MÓDULO DE PROGRAMACIÓN
// ========================================================
class CodingModuleManager {
  constructor(options = {}) {
    this.storage = new CodingProgressStorage();
    this.currentGrade = 1;
    this.currentActivityIndex = 0;

    // Callbacks sonoros y visuales
    this.onPlaySound = options.onPlaySound || (() => {});
    this.onLaunchConfetti = options.onLaunchConfetti || (() => {});

    // Estado general del sistema de Intentos y Pistas para la actividad actual
    this.activityState = {
      attempts: 0,
      hintsUnlocked: 0,
      hints: [],
      isCompleted: false
    };

    // Control de animación/simulación para cancelación segura
    this.gridAnimationAbort = null;
    this.gridCommands = [];
    this.gridPlayerPos = { x: 0, y: 0 };
    this.gridIsRunning = false;
  }

  /**
   * Carga un grado escolar (1 a 5) y abre su temario
   */
  loadGrade(grade) {
    this.cleanupCurrentActivity();
    this.currentGrade = parseInt(grade) || 1;
    this.renderSyllabus();
  }

  /**
   * Inicia el tema "Instrucciones" en el grado actual
   */
  startInstructionsTopic() {
    this.cleanupCurrentActivity();
    this.currentActivityIndex = 0;
    this.showCodingAppScreen();
    this.renderCurrentActivity();
  }

  /**
   * Limpia timers, animaciones pendientes y voz activa
   */
  cleanupCurrentActivity() {
    this.stopSpeaking();
    if (this.gridAnimationAbort) {
      this.gridAnimationAbort.isAborted = true;
      this.gridAnimationAbort = null;
    }
    this.gridIsRunning = false;
  }

  showCodingAppScreen() {
    const screens = [
      document.getElementById('screen-home'),
      document.getElementById('screen-grades'),
      document.getElementById('screen-game'),
      document.getElementById('screen-editor'),
      document.getElementById('screen-coding-grades'),
      document.getElementById('screen-coding-syllabus'),
      document.getElementById('screen-coding-topic')
    ];
    screens.forEach(s => { if (s) s.classList.remove('active'); });

    const topicScreen = document.getElementById('screen-coding-topic');
    if (topicScreen) topicScreen.classList.add('active');
  }

  showSyllabusScreen() {
    const screens = [
      document.getElementById('screen-home'),
      document.getElementById('screen-grades'),
      document.getElementById('screen-game'),
      document.getElementById('screen-editor'),
      document.getElementById('screen-coding-grades'),
      document.getElementById('screen-coding-syllabus'),
      document.getElementById('screen-coding-topic')
    ];
    screens.forEach(s => { if (s) s.classList.remove('active'); });

    const sylScreen = document.getElementById('screen-coding-syllabus');
    if (sylScreen) sylScreen.classList.add('active');
  }

  /**
   * Renderiza el temario (Syllabus) del grado
   */
  renderSyllabus() {
    this.cleanupCurrentActivity();
    this.showSyllabusScreen();
    const gConfig = CODING_DATA.grades[this.currentGrade];
    if (!gConfig) return;

    const gradeBadgeEl = document.getElementById('syllabus-grade-badge');
    const scoreBadgeEl = document.getElementById('syllabus-score-badge');
    const progressFillEl = document.getElementById('syllabus-instructions-progress');
    const progressTextEl = document.getElementById('syllabus-instructions-pct');
    const btnStartInst = document.getElementById('btn-start-instructions-topic');

    const progress = this.storage.getGradeProgress(this.currentGrade);
    const totalActivities = gConfig.instructions.activities.length;
    const completedCount = progress.activitiesCompleted ? progress.activitiesCompleted.length : 0;
    const pct = Math.min(100, Math.round((completedCount / totalActivities) * 100));

    if (gradeBadgeEl) {
      gradeBadgeEl.textContent = `${gConfig.badge} - ${gConfig.name}`;
      gradeBadgeEl.style.backgroundColor = gConfig.accentColor + '20';
      gradeBadgeEl.style.color = gConfig.accentColor;
    }

    if (scoreBadgeEl) {
      scoreBadgeEl.innerHTML = `⭐ ${progress.score || 0} pts`;
    }

    if (progressFillEl) progressFillEl.style.width = `${pct}%`;
    if (progressTextEl) {
      progressTextEl.textContent = progress.completed ? '🎉 ¡100% Completado!' : `${pct}%`;
    }

    if (btnStartInst) {
      btnStartInst.innerHTML = progress.completed ?
        '<span>🔄</span> ¡Repasar Instrucciones!' :
        (completedCount > 0 ? '<span>▶️</span> ¡Continuar Instrucciones!' : '<span>🚀</span> ¡Comenzar Instrucciones!');
      btnStartInst.onclick = () => {
        this.onPlaySound('pop');
        this.startInstructionsTopic();
      };
    }

    // Botón volver a selección de grados
    const btnBack = document.getElementById('btn-back-to-coding-grades');
    if (btnBack) {
      btnBack.onclick = () => {
        this.onPlaySound('click');
        const screens = [
          document.getElementById('screen-home'),
          document.getElementById('screen-grades'),
          document.getElementById('screen-game'),
          document.getElementById('screen-editor'),
          document.getElementById('screen-coding-grades'),
          document.getElementById('screen-coding-syllabus'),
          document.getElementById('screen-coding-topic')
        ];
        screens.forEach(s => { if (s) s.classList.remove('active'); });
        const gScreen = document.getElementById('screen-coding-grades');
        if (gScreen) gScreen.classList.add('active');
      };
    }
  }

  /**
   * Actualiza el HUD superior del módulo
   */
  updateHud() {
    const progress = this.storage.getGradeProgress(this.currentGrade);
    const gConfig = CODING_DATA.grades[this.currentGrade];
    const totalActivities = gConfig.instructions.activities.length;
    const completedCount = progress.activitiesCompleted ? progress.activitiesCompleted.length : 0;
    const pct = Math.min(100, Math.round((completedCount / totalActivities) * 100));

    const hudScore = document.getElementById('hud-coding-score');
    const hudFill = document.getElementById('hud-coding-progress-fill');
    const hudPct = document.getElementById('hud-coding-progress-pct');
    const hudStageBadge = document.getElementById('hud-coding-stage-badge');

    if (hudScore) hudScore.textContent = `⭐ ${progress.score || 0} pts`;
    if (hudFill) hudFill.style.width = `${pct}%`;
    if (hudPct) hudPct.textContent = `${pct}%`;

    const currentAct = gConfig.instructions.activities[this.currentActivityIndex];
    if (hudStageBadge && currentAct) {
      hudStageBadge.textContent = `${this.currentActivityIndex + 1}/${totalActivities}: ${currentAct.title.split(':')[0] || 'Misión'}`;
    }

    const btnBackSyllabus = document.getElementById('btn-hud-back-syllabus');
    if (btnBackSyllabus) {
      btnBackSyllabus.onclick = () => {
        this.cleanupCurrentActivity();
        this.onPlaySound('click');
        this.renderSyllabus();
      };
    }
  }

  /**
   * Actualiza el diálogo y expresión de Byte
   */
  updateByte(text, expression = 'normal', audioText = null) {
    const avatarEl = document.getElementById('byte-avatar-box');
    const textEl = document.getElementById('byte-speech-text');
    const btnAudio = document.getElementById('btn-byte-audio');

    if (avatarEl) avatarEl.innerHTML = getByteAvatarSvg(expression);
    if (textEl) textEl.textContent = text;

    if (btnAudio) {
      const speechContent = audioText || text;
      btnAudio.onclick = () => {
        this.speak(speechContent, btnAudio);
      };
    }
  }

  /**
   * Síntesis de voz (Text to Speech) nativa en español
   */
  speak(text, btnElement = null) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (btnElement && btnElement.classList.contains('speaking')) {
      btnElement.classList.remove('speaking');
      return;
    }

    const cleanText = text.replace(/[🤖🎉💡❌✅«»⭐🏆]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(v => v.lang.startsWith('es'));
    if (spanishVoice) utterance.voice = spanishVoice;

    if (btnElement) {
      btnElement.classList.add('speaking');
      utterance.onend = () => btnElement.classList.remove('speaking');
      utterance.onerror = () => btnElement.classList.remove('speaking');
    }

    window.speechSynthesis.speak(utterance);
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    const btns = document.querySelectorAll('.btn-byte-audio.speaking');
    btns.forEach(b => b.classList.remove('speaking'));
  }

  // ========================================================
  // SISTEMA DE INTENTOS Y PISTAS PROGRESIVAS
  // ========================================================
  initActivityState(hints = []) {
    this.activityState = {
      attempts: 0,
      hintsUnlocked: 0,
      hints: hints || [],
      isCompleted: false
    };
  }

  /**
   * Registra un error. Después de 3 errores consecutivos muestra Pista 1, luego Pista 2, luego Pista 3.
   */
  recordAttemptError(customWrongMsg = null) {
    this.activityState.attempts++;
    this.onPlaySound('wrong');

    const attCount = this.activityState.attempts;
    let unlockedNewHint = false;

    // Regla: cada 3 errores se desbloquea una pista (máximo 3 pistas)
    if (attCount % 3 === 0 && this.activityState.hintsUnlocked < 3) {
      this.activityState.hintsUnlocked++;
      unlockedNewHint = true;
    }

    this.updateHintsUI();

    if (unlockedNewHint) {
      const hintNumber = this.activityState.hintsUnlocked;
      const hintText = this.activityState.hints[hintNumber - 1];
      this.updateByte(
        `Veo que estás teniendo un poquito de dificultad. Te voy a dar una pista. 💡 Pista ${hintNumber}`,
        'thinking',
        `Veo que estás teniendo un poquito de dificultad. Te voy a dar una pista. ${hintText}`
      );
    } else {
      if (attCount % 3 === 1) {
        this.updateByte(customWrongMsg || "¡Casi! Pensá un poquito más.", 'thinking');
      } else if (attCount % 3 === 2) {
        this.updateByte("Revisá nuevamente el orden.", 'thinking');
      } else {
        // Más de 3 pistas: se permite seguir intentando sin bloquear
        this.updateByte("¡Seguí intentando! Pensá con calma en cada instrucción.", 'normal');
      }
    }
  }

  /**
   * Actualiza el contenedor visual de pistas e intentos
   */
  updateHintsUI() {
    const hintsContainer = document.getElementById('activity-hints-box');
    const attemptsPill = document.getElementById('attempts-counter-pill');

    if (attemptsPill) {
      const att = this.activityState.attempts;
      const toNext = 3 - (att % 3);
      if (this.activityState.hintsUnlocked < 3) {
        attemptsPill.className = att > 0 ? 'attempts-pill warning' : 'attempts-pill';
        attemptsPill.innerHTML = `<span>⚠️</span> Intentos: <strong>${att}</strong> (${toNext === 3 ? '¡Pista lista!' : toNext + ' para pista'})`;
      } else {
        attemptsPill.className = 'attempts-pill warning';
        attemptsPill.innerHTML = `<span>💡</span> Pistas utilizadas: <strong>3/3</strong> (¡Seguí intentando!)`;
      }
    }

    if (hintsContainer) {
      hintsContainer.innerHTML = '';
      for (let i = 0; i < this.activityState.hintsUnlocked; i++) {
        const hintText = this.activityState.hints[i];
        if (!hintText) continue;
        const hintEl = document.createElement('div');
        hintEl.className = `hint-item level-${i + 1}`;
        hintEl.innerHTML = `
          <span class="hint-badge">💡 Pista ${i + 1}</span>
          <div style="flex:1;">${hintText}</div>
          <button type="button" class="btn-byte-audio" style="margin:0; padding:2px 8px; font-size:0.8rem;" title="Escuchar pista">
            🔊
          </button>
        `;
        const audioBtn = hintEl.querySelector('.btn-byte-audio');
        if (audioBtn) {
          audioBtn.onclick = () => this.speak(hintText, audioBtn);
        }
        hintsContainer.appendChild(hintEl);
      }
    }
  }

  /**
   * Registra victoria en la actividad, calcula estrellas según pistas usadas y avanza
   */
  recordActivitySuccess(activityId, basePoints = 10) {
    if (this.activityState.isCompleted) return;
    this.activityState.isCompleted = true;

    // Calcular estrellas según pistas utilizadas:
    // 0 pistas = 3 estrellas ⭐⭐⭐
    // 1 pista  = 2 estrellas ⭐⭐
    // 2 pistas = 1 estrella  ⭐
    // 3 pistas = 1 estrella  ⭐ (puntaje adaptado)
    let stars = 3;
    let earnedPoints = basePoints;

    if (this.activityState.hintsUnlocked === 1) {
      stars = 2;
      earnedPoints = Math.round(basePoints * 0.85);
    } else if (this.activityState.hintsUnlocked === 2) {
      stars = 1;
      earnedPoints = Math.round(basePoints * 0.7);
    } else if (this.activityState.hintsUnlocked >= 3) {
      stars = 1;
      earnedPoints = Math.round(basePoints * 0.6);
    }

    this.onPlaySound('fanfare');
    this.storage.completeActivity(this.currentGrade, activityId, earnedPoints, stars);
    this.updateHud();

    // Mostrar feedback de estrellas
    const feedbackBox = document.getElementById('activity-feedback-box');
    const actionsBar = document.getElementById('activity-actions-bar');
    const btnNext = document.getElementById('btn-activity-next');

    if (feedbackBox) {
      const starIcons = '⭐'.repeat(stars);
      feedbackBox.className = 'quiz-feedback-box correct';
      feedbackBox.innerHTML = `
        <span>🎉</span>
        <div>
          <strong>¡Excelente trabajo! Actividad completada.</strong><br>
          <div class="stars-rating-box">${starIcons}</div>
          <span style="font-size:0.95rem; color:#15803d;">+${earnedPoints} puntos • ${this.activityState.hintsUnlocked === 0 ? '¡Sin pistas utilizadas!' : this.activityState.hintsUnlocked + ' pista(s) utilizada(s)'}</span>
        </div>
      `;
      feedbackBox.style.display = 'flex';
    }

    if (btnNext) {
      btnNext.style.display = 'inline-flex';
      if (typeof btnNext.scrollIntoView === 'function') {
        btnNext.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  /**
   * Renderiza la actividad activa en la pantalla
   */
  renderCurrentActivity() {
    this.cleanupCurrentActivity();
    this.updateHud();

    const gConfig = CODING_DATA.grades[this.currentGrade];
    const act = gConfig.instructions.activities[this.currentActivityIndex];
    const container = document.getElementById('coding-stage-container');
    if (!container || !act) return;

    this.initActivityState(act.hints || []);
    container.innerHTML = '';

    switch (act.type) {
      case 'theory':
        this.renderTheory(container, act);
        break;
      case 'identify_instruction':
        this.renderIdentifyInstruction(container, act);
        break;
      case 'missing_step':
        this.renderMissingStep(container, act);
        break;
      case 'seed_interactive':
        this.renderSeedInteractive(container, act);
        break;
      case 'clear_or_confusing':
        this.renderClearOrConfusing(container, act);
        break;
      case 'unnecessary_step':
        this.renderUnnecessaryStep(container, act);
        break;
      case 'order_steps':
        this.renderOrderSteps(container, act);
        break;
      case 'find_error':
        this.renderFindError(container, act);
        break;
      case 'complete_instruction':
        this.renderCompleteInstruction(container, act);
        break;
      case 'detective_step':
        this.renderDetectiveStep(container, act);
        break;
      case 'build_sequence':
        this.renderBuildSequence(container, act);
        break;
      case 'grid_movement':
      case 'grid_multi_goal':
        this.renderGridGame(container, act);
        break;
      case 'final_challenge':
        this.renderFinalChallenge(container, act);
        break;
      default:
        this.renderTheory(container, act);
    }
  }

  /**
   * Avanza a la siguiente actividad del temario o al modal de victoria
   */
  nextActivity() {
    this.cleanupCurrentActivity();
    const gConfig = CODING_DATA.grades[this.currentGrade];
    if (this.currentActivityIndex < gConfig.instructions.activities.length - 1) {
      this.currentActivityIndex++;
      this.renderCurrentActivity();
    } else {
      this.renderVictoryModal();
    }
  }

  // ========================================================
  // RENDERIZADORES DE ACTIVIDADES
  // ========================================================

  /**
   * Plantilla común con Barra de Reintento, Pistas y Feedback
   */
  createActivityHeader(act, showReset = true) {
    return `
      <div class="activity-top-bar">
        <div style="display:flex; align-items:center; gap:8px;">
          <h3 style="font-size:1.35rem; color:#1e293b; margin:0;">${act.title}</h3>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <span id="attempts-counter-pill" class="attempts-pill"><span>🎯</span> Intentos: 0</span>
          ${showReset ? `<button type="button" id="btn-reset-current-activity" class="btn-activity-reset">🔄 Reiniciar</button>` : ''}
        </div>
      </div>
      <div id="activity-hints-box" class="activity-hints-box"></div>
    `;
  }

  createActivityFooter() {
    return `
      <div id="activity-feedback-box" style="display:none; margin-top:14px;"></div>
      <div class="stage-actions-bar" id="activity-actions-bar">
        <button type="button" id="btn-activity-next" class="btn-stage-next" style="display:none;">
          <span>¡Excelente! Siguiente Actividad</span> ➡️
        </button>
      </div>
    `;
  }

  // 1. TEORÍA INTERACTIVA
  renderTheory(container, act) {
    this.updateByte(act.intro, 'normal', `${act.intro} ${act.quote}`);

    container.innerHTML = `
      <div class="theory-wrapper">
        <div style="background: #e0f2fe; border-left: 5px solid #0284c7; padding: 12px 18px; border-radius: 12px; margin-bottom: 16px;">
          <strong style="color: #0369a1; font-size: 1.15rem;">${act.quote}</strong>
        </div>

        <h4 style="font-size: 1.25rem; color: #1e293b; margin-bottom: 10px;">🌟 3 Conceptos Fundamentales:</h4>
        <div class="theory-cards-grid">
          ${act.pillars.map((p, idx) => `
            <div class="theory-concept-card pillar-${idx + 1}">
              <div class="concept-icon">${p.icon}</div>
              <h5 class="concept-title">${p.title}</h5>
              <p class="concept-desc">${p.desc}</p>
            </div>
          `).join('')}
        </div>

        <h4 style="font-size: 1.25rem; color: #1e293b; margin: 18px 0 10px 0;">🧸 Ejemplos Cotidianos (Hacé clic para ver los pasos):</h4>
        <div class="daily-examples-row">
          ${act.examples.map((ex, idx) => `
            <button type="button" class="btn-example-tab ${idx === 0 ? 'active' : ''}" data-ex="${ex.id}">
              <span>${ex.icon}</span> ${ex.name}
            </button>
          `).join('')}
        </div>

        <div id="example-viewer-box" class="example-steps-viewer"></div>

        <div class="stage-actions-bar">
          <button type="button" id="btn-next-theory" class="btn-stage-next">
            <span>¡Entendido! Vamos a practicar</span> ➡️
          </button>
        </div>
      </div>
    `;

    const renderExampleSteps = (exId) => {
      const ex = act.examples.find(e => e.id === exId) || act.examples[0];
      const viewer = document.getElementById('example-viewer-box');
      if (!viewer) return;
      viewer.innerHTML = `
        <div style="font-weight:700; color:#0369a1; margin-bottom:10px;">${ex.icon} Pasos para ${ex.name}:</div>
        <div class="steps-list-horizontal">
          ${ex.steps.map((s, i) => `
            <div class="step-card-visual">
              <span class="step-num-badge">Paso ${i + 1}</span>
              <div class="step-visual-icon">${s.icon}</div>
              <span class="step-card-text">${s.text}</span>
            </div>
          `).join('')}
        </div>
      `;
    };

    renderExampleSteps(act.examples[0].id);

    container.querySelectorAll('.btn-example-tab').forEach(btn => {
      btn.onclick = () => {
        container.querySelectorAll('.btn-example-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.onPlaySound('click');
        renderExampleSteps(btn.getAttribute('data-ex'));
      };
    });

    const btnNext = document.getElementById('btn-next-theory');
    if (btnNext) {
      btnNext.onclick = () => {
        this.onPlaySound('pop');
        this.recordActivitySuccess(act.id, 10);
        this.nextActivity();
      };
    }
  }

  // 2. ¿QUÉ ES UNA INSTRUCCIÓN?
  renderIdentifyInstruction(container, act) {
    this.updateByte(act.instruction, 'thinking', `${act.title}. ${act.instruction}`);

    container.innerHTML = `
      <div class="quiz-box">
        ${this.createActivityHeader(act)}
        <p style="font-size:1.15rem; color:#334155; margin-bottom:14px;">${act.instruction}</p>
        <div class="quiz-options-grid">
          ${act.options.map(opt => `
            <button type="button" class="quiz-opt-btn" data-opt="${opt.id}">
              <span style="font-size:2rem;">${opt.icon || '📌'}</span>
              <span>${opt.text}</span>
            </button>
          `).join('')}
        </div>
        ${this.createActivityFooter()}
      </div>
    `;

    this.wireResetButton(() => this.renderIdentifyInstruction(container, act));

    container.querySelectorAll('.quiz-opt-btn').forEach(btn => {
      btn.onclick = () => {
        if (this.activityState.isCompleted) return;
        const optId = btn.getAttribute('data-opt');
        const opt = act.options.find(o => o.id === optId);

        if (opt && opt.isInstruction) {
          btn.classList.add('correct');
          this.updateByte("¡Excelente! Una buena instrucción indica con claridad qué acción realizar.", 'happy');
          this.recordActivitySuccess(act.id, 15);
        } else {
          btn.classList.add('wrong');
          this.recordAttemptError("Esa frase es una descripción o afirmación, no le pide a nadie que haga algo.");
        }
      };
    });

    const btnNext = document.getElementById('btn-activity-next');
    if (btnNext) btnNext.onclick = () => this.nextActivity();
  }

  // 3. ¿QUÉ PASO FALTA?
  renderMissingStep(container, act) {
    this.updateByte(act.instruction, 'thinking', `${act.title}. ${act.instruction}`);

    container.innerHTML = `
      <div class="quiz-box">
        ${this.createActivityHeader(act)}
        <p style="font-size:1.15rem; color:#334155; margin-bottom:12px;">${act.instruction}</p>

        <!-- Secuencia incompleta con tarjeta faltante destacada -->
        <div style="background:#f0f9ff; border:2px solid #bae6fd; border-radius:16px; padding:16px; margin-bottom:16px;">
          <div style="display:flex; flex-direction:column; gap:8px;">
            ${act.sequence.map(s => `
              <div style="display:flex; align-items:center; gap:12px; background:white; padding:10px 14px; border-radius:12px; border:2px solid ${s.isMissing ? '#0284c7' : '#cbd5e1'}; ${s.isMissing ? 'background:#e0f2fe; font-weight:700;' : ''}">
                <span class="order-step-badge">${s.num}</span>
                <span style="font-size:1.6rem;">${s.icon}</span>
                <span style="color:#1e293b; font-size:1.05rem;">${s.text}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="font-weight:700; color:#0369a1; margin-bottom:8px;">Elegí el paso que completa la secuencia:</div>
        <div class="quiz-options-grid">
          ${act.options.map(opt => `
            <button type="button" class="quiz-opt-btn" data-opt="${opt.id}">
              <span style="font-size:1.8rem;">${opt.icon || '👉'}</span>
              <span>${opt.text}</span>
            </button>
          `).join('')}
        </div>
        ${this.createActivityFooter()}
      </div>
    `;

    this.wireResetButton(() => this.renderMissingStep(container, act));

    container.querySelectorAll('.quiz-opt-btn').forEach(btn => {
      btn.onclick = () => {
        if (this.activityState.isCompleted) return;
        const optId = btn.getAttribute('data-opt');
        const opt = act.options.find(o => o.id === optId);

        if (opt && opt.isCorrect) {
          btn.classList.add('correct');
          this.updateByte("¡Perfecto! Ese es exactamente el paso que faltaba en el procedimiento.", 'happy');
          this.recordActivitySuccess(act.id, 15);
        } else {
          btn.classList.add('wrong');
          this.recordAttemptError("Ese paso no encaja lógicamente en ese punto de la secuencia.");
        }
      };
    });

    const btnNext = document.getElementById('btn-activity-next');
    if (btnNext) btnNext.onclick = () => this.nextActivity();
  }

  // 4. PLANTAR UNA SEMILLA (INTERACTIVA)
  renderSeedInteractive(container, act) {
    this.updateByte(act.instruction, 'normal', `${act.title}. ${act.instruction}`);
    let selectedOrder = [];
    const shuffled = [...act.steps].sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <div class="seed-activity-container">
        ${this.createActivityHeader(act)}
        <p style="color:#64748b; font-size:1.05rem; text-align:center;">${act.instruction}</p>

        <div class="seed-sim-stage">
          <div class="plant-animation-frame">
            <div id="seed-sprout-icon" class="plant-sprout"></div>
            <div class="plant-pot">🪴</div>
          </div>
        </div>

        <div style="width:100%;">
          <div style="font-weight:700; color:#0369a1; margin-bottom:8px;">1. Banco de Instrucciones (Tocalas en orden):</div>
          <div class="cards-pool-grid" id="seed-cards-pool">
            ${shuffled.map(s => `
              <button type="button" class="pool-card-btn" data-step="${s.id}">
                <span style="font-size:1.8rem;">${s.icon}</span>
                <span>${s.label}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div style="width:100%;">
          <div style="font-weight:700; color:#059669; margin-bottom:8px;">2. Tu Secuencia Armada:</div>
          <div id="seed-sequence-box" style="display:flex; flex-wrap:wrap; gap:8px; min-height:50px; background:#f0fdf4; border:2px dashed #86efac; border-radius:14px; padding:10px;">
            <span style="color:#94a3b8; font-style:italic;">Toca las tarjetas en orden...</span>
          </div>
        </div>

        ${this.createActivityFooter()}
      </div>
    `;

    const poolBox = document.getElementById('seed-cards-pool');
    const seqBox = document.getElementById('seed-sequence-box');
    const sproutIcon = document.getElementById('seed-sprout-icon');

    const updateUI = () => {
      if (selectedOrder.length === 0) {
        seqBox.innerHTML = '<span style="color:#94a3b8; font-style:italic;">Toca las tarjetas en orden...</span>';
        if (sproutIcon) sproutIcon.textContent = '';
      } else {
        seqBox.innerHTML = selectedOrder.map((sId, idx) => {
          const s = act.steps.find(step => step.id === sId);
          return `<div class="cmd-tag" style="background:#dcfce7; color:#166534; border-color:#86efac; font-size:0.95rem; padding:6px 10px;">
            ${idx + 1}. ${s.icon} ${s.label}
          </div>`;
        }).join('');
      }

      if (sproutIcon) {
        const c = selectedOrder.length;
        if (c === 1) sproutIcon.textContent = '🪴';
        else if (c === 2) sproutIcon.textContent = '🟫';
        else if (c === 3) sproutIcon.textContent = '🌱';
        else if (c === 4) sproutIcon.textContent = '🌸';
      }

      if (selectedOrder.length === act.steps.length) {
        const isCorrect = selectedOrder.every((id, idx) => id === act.correctOrder[idx]);
        if (isCorrect) {
          if (sproutIcon) sproutIcon.textContent = '🌸';
          this.updateByte("¡Hermoso! La secuencia estuvo perfecta y la semillita floreció.", 'happy');
          this.recordActivitySuccess(act.id, 15);
        } else {
          this.recordAttemptError("El orden de las instrucciones no permitió crecer a la planta. Presioná Reiniciar e intentá de nuevo.");
        }
      }
    };

    poolBox.querySelectorAll('.pool-card-btn').forEach(btn => {
      btn.onclick = () => {
        if (this.activityState.isCompleted) return;
        const sId = btn.getAttribute('data-step');
        if (selectedOrder.includes(sId)) return;
        btn.classList.add('selected');
        selectedOrder.push(sId);
        this.onPlaySound('click');
        updateUI();
      };
    });

    this.wireResetButton(() => {
      selectedOrder = [];
      poolBox.querySelectorAll('.pool-card-btn').forEach(b => b.classList.remove('selected'));
      updateUI();
    });

    const btnNext = document.getElementById('btn-activity-next');
    if (btnNext) btnNext.onclick = () => this.nextActivity();
  }

  // 5. INSTRUCCIÓN CLARA O CONFUSA
  renderClearOrConfusing(container, act) {
    this.updateByte(act.instruction, 'thinking', `${act.title}. ${act.instruction}`);
    let userAnswers = {};

    container.innerHTML = `
      <div class="quiz-box">
        ${this.createActivityHeader(act)}
        <p style="font-size:1.15rem; color:#334155; margin-bottom:14px;">${act.instruction}</p>
        <div class="choice-classification-grid">
          ${act.cards.map(c => `
            <div class="classification-card" id="card-cf-${c.id}">
              <div style="font-size:1.2rem; font-weight:700; color:#1e293b; min-height:45px;">${c.text}</div>
              <div class="classification-buttons-row">
                <button type="button" class="btn-classify btn-cf-clear" data-cid="${c.id}" data-val="clear">
                  🟢 Clara
                </button>
                <button type="button" class="btn-classify btn-cf-confusing" data-cid="${c.id}" data-val="confusing">
                  🔴 Confusa
                </button>
              </div>
              <div class="cf-explanation" style="display:none; font-size:0.95rem; color:#475569; border-top:1px dashed #cbd5e1; padding-top:8px;"></div>
            </div>
          `).join('')}
        </div>
        <div class="stage-actions-bar" style="margin-top:16px;">
          <button type="button" id="btn-validate-cf" class="btn-run-code" style="padding:10px 24px;">
            <span>✅</span> Comprobar Clasificación
          </button>
        </div>
        ${this.createActivityFooter()}
      </div>
    `;

    this.wireResetButton(() => this.renderClearOrConfusing(container, act));

    container.querySelectorAll('.btn-classify').forEach(b => {
      b.onclick = () => {
        if (this.activityState.isCompleted) return;
        const cid = b.getAttribute('data-cid');
        const val = b.getAttribute('data-val');
        userAnswers[cid] = val === 'clear';

        const parent = document.getElementById(`card-cf-${cid}`);
        parent.querySelectorAll('.btn-classify').forEach(btn => {
          btn.classList.remove('active-clear', 'active-confusing');
        });

        if (val === 'clear') b.classList.add('active-clear');
        else b.classList.add('active-confusing');
        this.onPlaySound('click');
      };
    });

    const btnValidate = document.getElementById('btn-validate-cf');
    if (btnValidate) {
      btnValidate.onclick = () => {
        if (this.activityState.isCompleted) return;
        if (Object.keys(userAnswers).length < act.cards.length) {
          this.updateByte("¡Falta clasificar alguna frase! Elegí Clara o Confusa para cada una.", 'worried');
          return;
        }

        let allCorrect = true;
        act.cards.forEach(c => {
          const cardEl = document.getElementById(`card-cf-${c.id}`);
          const expEl = cardEl.querySelector('.cf-explanation');
          const isUserRight = userAnswers[c.id] === c.isClear;

          cardEl.classList.remove('correct', 'wrong');
          if (isUserRight) {
            cardEl.classList.add('correct');
          } else {
            cardEl.classList.add('wrong');
            allCorrect = false;
          }

          if (expEl) {
            expEl.textContent = `💡 ${c.reason}`;
            expEl.style.display = 'block';
          }
        });

        if (allCorrect) {
          this.updateByte("¡Excelente análisis! Sabés distinguir con claridad cuándo una orden es ambigua.", 'happy');
          btnValidate.style.display = 'none';
          this.recordActivitySuccess(act.id, 15);
        } else {
          this.recordAttemptError("Una de las clasificaciones no es correcta. Revisá las explicaciones.");
        }
      };
    }

    const btnNext = document.getElementById('btn-activity-next');
    if (btnNext) btnNext.onclick = () => this.nextActivity();
  }

  // 6. INSTRUCCIÓN INNECESARIA
  renderUnnecessaryStep(container, act) {
    this.updateByte(act.instruction, 'thinking', `${act.title}. ${act.instruction}`);

    container.innerHTML = `
      <div class="quiz-box">
        ${this.createActivityHeader(act)}
        <p style="font-size:1.15rem; color:#334155; margin-bottom:12px;">${act.instruction}</p>
        <div style="display:flex; flex-direction:column; gap:10px;">
          ${act.items.map(it => `
            <button type="button" class="quiz-opt-btn" data-uid="${it.id}" style="justify-content:space-between;">
              <div style="display:flex; align-items:center; gap:12px;">
                <span style="font-size:1.8rem;">${it.icon || '📌'}</span>
                <span>${it.text}</span>
              </div>
              <span style="font-size:1.3rem;">🗑️</span>
            </button>
          `).join('')}
        </div>
        ${this.createActivityFooter()}
      </div>
    `;

    this.wireResetButton(() => this.renderUnnecessaryStep(container, act));

    container.querySelectorAll('.quiz-opt-btn').forEach(b => {
      b.onclick = () => {
        if (this.activityState.isCompleted) return;
        const uid = b.getAttribute('data-uid');
        const item = act.items.find(it => it.id === uid);

        if (item && item.isUnnecessary) {
          b.classList.add('correct');
          b.innerHTML += ` <span style="font-weight:700; color:#15803d;">(¡Eliminada con éxito!)</span>`;
          this.updateByte("¡Detectaste el distractor! Esa instrucción no pertenecía al objetivo.", 'happy');
          this.recordActivitySuccess(act.id, 15);
        } else {
          b.classList.add('wrong');
          this.recordAttemptError("Esa instrucción sí es útil y necesaria para cumplir la tarea.");
        }
      };
    });

    const btnNext = document.getElementById('btn-activity-next');
    if (btnNext) btnNext.onclick = () => this.nextActivity();
  }

  // 7. ORDENÁ LOS PASOS (DRAG & DROP + TÁCTIL)
  renderOrderSteps(container, act) {
    this.updateByte(act.instruction, 'thinking', `${act.title}. ${act.instruction}`);
    let currentItems = [...act.items];

    container.innerHTML = `
      <div class="order-task-wrapper">
        ${this.createActivityHeader(act)}
        <p style="color:#64748b; font-size:1.05rem;">Usa los botones ▲ ▼ o arrastrá las tarjetas para ordenar:</p>
        <ul class="order-items-list" id="order-sortable-list"></ul>
        <div class="stage-actions-bar">
          <button type="button" id="btn-check-order" class="btn-run-code" style="padding:12px 24px;">
            <span>✅</span> Verificar Orden
          </button>
        </div>
        ${this.createActivityFooter()}
      </div>
    `;

    const listEl = document.getElementById('order-sortable-list');
    const btnCheck = document.getElementById('btn-check-order');

    const renderList = () => {
      listEl.innerHTML = currentItems.map((item, idx) => `
        <li class="order-card-item" draggable="true" data-idx="${idx}">
          <div class="order-left-group">
            <span class="order-step-badge">${idx + 1}</span>
            <span class="order-card-icon">${item.icon}</span>
            <span class="order-card-label">${item.text}</span>
          </div>
          <div class="order-controls-group">
            <button type="button" class="btn-order-move btn-move-up" data-idx="${idx}" ${idx === 0 ? 'disabled style="opacity:0.3"' : ''}>▲</button>
            <button type="button" class="btn-order-move btn-move-down" data-idx="${idx}" ${idx === currentItems.length - 1 ? 'disabled style="opacity:0.3"' : ''}>▼</button>
          </div>
        </li>
      `).join('');

      listEl.querySelectorAll('.btn-move-up').forEach(b => {
        b.onclick = (e) => {
          e.stopPropagation();
          const i = parseInt(b.getAttribute('data-idx'));
          if (i > 0) {
            const temp = currentItems[i];
            currentItems[i] = currentItems[i - 1];
            currentItems[i - 1] = temp;
            this.onPlaySound('click');
            renderList();
          }
        };
      });

      listEl.querySelectorAll('.btn-move-down').forEach(b => {
        b.onclick = (e) => {
          e.stopPropagation();
          const i = parseInt(b.getAttribute('data-idx'));
          if (i < currentItems.length - 1) {
            const temp = currentItems[i];
            currentItems[i] = currentItems[i + 1];
            currentItems[i + 1] = temp;
            this.onPlaySound('click');
            renderList();
          }
        };
      });

      // Drag and Drop seguro con closest()
      let draggedIndex = null;
      listEl.querySelectorAll('.order-card-item').forEach(itemEl => {
        itemEl.addEventListener('dragstart', (e) => {
          draggedIndex = parseInt(itemEl.getAttribute('data-idx'));
          itemEl.classList.add('dragging');
          e.dataTransfer.effectAllowed = 'move';
        });

        itemEl.addEventListener('dragend', () => itemEl.classList.remove('dragging'));
        itemEl.addEventListener('dragover', (e) => e.preventDefault());
        itemEl.addEventListener('drop', (e) => {
          e.preventDefault();
          const dropTarget = e.target.closest('.order-card-item');
          if (!dropTarget) return;
          const targetIndex = parseInt(dropTarget.getAttribute('data-idx'));
          if (draggedIndex !== null && !isNaN(targetIndex) && draggedIndex !== targetIndex) {
            const moved = currentItems.splice(draggedIndex, 1)[0];
            currentItems.splice(targetIndex, 0, moved);
            this.onPlaySound('snap');
            renderList();
          }
        });
      });
    };

    renderList();

    this.wireResetButton(() => {
      currentItems = [...act.items];
      renderList();
    });

    if (btnCheck) {
      btnCheck.onclick = () => {
        if (this.activityState.isCompleted) return;
        const isCorrect = currentItems.every((it, i) => it.id === act.correctOrder[i]);
        if (isCorrect) {
          this.updateByte("¡Excelente! Organizaste las instrucciones en el orden perfecto.", 'happy');
          btnCheck.style.display = 'none';
          this.recordActivitySuccess(act.id, 15);
        } else {
          this.recordAttemptError("Revisá el orden: alguna acción se está realizando antes de tiempo.");
        }
      };
    }

    const btnNext = document.getElementById('btn-activity-next');
    if (btnNext) btnNext.onclick = () => this.nextActivity();
  }

  // 8. ENCONTRÁ EL ERROR
  renderFindError(container, act) {
    this.updateByte(act.instruction, 'thinking', `${act.title}. ${act.instruction}`);

    container.innerHTML = `
      <div class="quiz-box">
        ${this.createActivityHeader(act)}
        <p style="font-size:1.15rem; color:#334155; margin-bottom:12px;">${act.instruction}</p>
        <div style="display:flex; flex-direction:column; gap:10px;">
          ${act.steps.map(s => `
            <button type="button" class="quiz-opt-btn" data-sid="${s.id}">
              <span class="order-step-badge">${s.num}</span>
              <span style="font-size:1.8rem;">${s.icon}</span>
              <span style="flex:1;">${s.text}</span>
              <span>🔍</span>
            </button>
          `).join('')}
        </div>
        ${this.createActivityFooter()}
      </div>
    `;

    this.wireResetButton(() => this.renderFindError(container, act));

    container.querySelectorAll('.quiz-opt-btn').forEach(b => {
      b.onclick = () => {
        if (this.activityState.isCompleted) return;
        const sid = b.getAttribute('data-sid');
        const s = act.steps.find(step => step.id === sid);

        if (s && s.isError) {
          b.classList.add('correct');
          this.updateByte(`¡Encontraste el bug! ${act.explanation}`, 'happy');
          this.recordActivitySuccess(act.id, 15);
        } else {
          b.classList.add('wrong');
          this.recordAttemptError("Ese paso está en un momento lógico. Buscá cuál está fuera de lugar.");
        }
      };
    });

    const btnNext = document.getElementById('btn-activity-next');
    if (btnNext) btnNext.onclick = () => this.nextActivity();
  }

  // 9. COMPLETÁ LA INSTRUCCIÓN
  renderCompleteInstruction(container, act) {
    this.updateByte("Completá la frase con la opción que aporta precisión matemática o de lugar:", 'thinking');

    container.innerHTML = `
      <div class="quiz-box">
        ${this.createActivityHeader(act)}
        <div style="background:#f0f9ff; border:2px solid #bae6fd; border-radius:18px; padding:20px; font-size:1.35rem; color:#1e293b; text-align:center; margin-bottom:18px;">
          ${act.sentenceBefore} <span id="complete-slot" class="incomplete-seq-slot">_________</span> ${act.sentenceAfter}
        </div>
        <div class="quiz-options-grid">
          ${act.options.map(opt => `
            <button type="button" class="quiz-opt-btn" data-opt="${opt.id}">
              <span>${opt.text}</span>
            </button>
          `).join('')}
        </div>
        ${this.createActivityFooter()}
      </div>
    `;

    this.wireResetButton(() => this.renderCompleteInstruction(container, act));

    const slot = document.getElementById('complete-slot');

    container.querySelectorAll('.quiz-opt-btn').forEach(b => {
      b.onclick = () => {
        if (this.activityState.isCompleted) return;
        const oid = b.getAttribute('data-opt');
        const opt = act.options.find(o => o.id === oid);

        if (opt && opt.isCorrect) {
          b.classList.add('correct');
          if (slot) {
            slot.textContent = opt.text;
            slot.style.borderStyle = 'solid';
            slot.style.borderColor = '#22c55e';
            slot.style.background = '#dcfce7';
          }
          this.updateByte("¡Exacto! Esa palabra le da precisión y claridad a la orden.", 'happy');
          this.recordActivitySuccess(act.id, 15);
        } else {
          b.classList.add('wrong');
          this.recordAttemptError("Esa palabra no aporta precisión ni coherencia al procedimiento.");
        }
      };
    });

    const btnNext = document.getElementById('btn-activity-next');
    if (btnNext) btnNext.onclick = () => this.nextActivity();
  }

  // 10. DETECTIVE DE INSTRUCCIONES
  renderDetectiveStep(container, act) {
    this.updateByte(act.instruction, 'thinking', `${act.title}. ${act.instruction}`);

    container.innerHTML = `
      <div class="quiz-box">
        ${this.createActivityHeader(act)}
        <p style="font-size:1.15rem; color:#334155; margin-bottom:12px;">${act.instruction}</p>
        <div style="display:flex; flex-direction:column; gap:10px;">
          ${act.steps.map(s => `
            <button type="button" class="quiz-opt-btn" data-sid="${s.id}">
              <span style="font-size:1.8rem;">${s.icon || '🔎'}</span>
              <span style="flex:1;">${s.text}</span>
              <span style="font-size:1.2rem;">🕵️</span>
            </button>
          `).join('')}
        </div>
        ${this.createActivityFooter()}
      </div>
    `;

    this.wireResetButton(() => this.renderDetectiveStep(container, act));

    container.querySelectorAll('.quiz-opt-btn').forEach(b => {
      b.onclick = () => {
        if (this.activityState.isCompleted) return;
        const sid = b.getAttribute('data-sid');
        const s = act.steps.find(step => step.id === sid);

        if (s && s.isFlaw) {
          b.classList.add('correct');
          this.updateByte(`¡Gran deducción! ${act.reason}`, 'happy');
          this.recordActivitySuccess(act.id, 15);
        } else {
          b.classList.add('wrong');
          this.recordAttemptError("Ese paso es coherente. Buscá la instrucción que rompe el procedimiento.");
        }
      };
    });

    const btnNext = document.getElementById('btn-activity-next');
    if (btnNext) btnNext.onclick = () => this.nextActivity();
  }

  // 11. CREÁ TU PROPIA SECUENCIA
  renderBuildSequence(container, act) {
    this.updateByte(act.instruction, 'thinking', `${act.title}. ${act.instruction}`);
    let selectedCards = [];
    const pool = [...act.pool].sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <div class="final-challenge-area">
        ${this.createActivityHeader(act)}
        <p style="color:#475569; font-size:1.05rem;">${act.instruction}</p>

        <div class="cards-pool-section">
          <div class="pool-title"><span>📦</span> 1. Banco de Acciones Disponibles:</div>
          <div class="cards-pool-grid" id="build-pool-grid">
            ${pool.map(c => `
              <button type="button" class="pool-card-btn" data-id="${c.id}">
                <span style="font-size:1.8rem;">${c.icon}</span>
                <span>${c.text}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="selected-sequence-section">
          <div class="pool-title" style="color:#15803d; justify-content:space-between;">
            <div><span>📋</span> 2. Tu Secuencia Construida (${act.requiredCount} pasos):</div>
          </div>
          <div id="build-selected-list" style="display:flex; flex-direction:column; gap:8px; min-height:70px; padding:8px; background:white; border-radius:12px; border:2px dashed #cbd5e1;">
            <span style="color:#94a3b8; font-style:italic; padding:8px;">Toca las tarjetas del banco superior en orden...</span>
          </div>
        </div>

        <div class="stage-actions-bar">
          <button type="button" id="btn-validate-build" class="btn-run-code" style="padding:12px 28px;">
            <span>✅</span> Verificar Secuencia
          </button>
        </div>
        ${this.createActivityFooter()}
      </div>
    `;

    const poolGrid = document.getElementById('build-pool-grid');
    const selectedList = document.getElementById('build-selected-list');
    const btnValidate = document.getElementById('btn-validate-build');

    const updateUI = () => {
      if (selectedCards.length === 0) {
        selectedList.innerHTML = '<span style="color:#94a3b8; font-style:italic; padding:8px;">Toca las tarjetas del banco superior en orden...</span>';
      } else {
        selectedList.innerHTML = selectedCards.map((cid, idx) => {
          const c = act.pool.find(p => p.id === cid);
          return `
            <div style="background:#f0fdf4; border:2px solid #86efac; border-radius:12px; padding:8px 12px; display:flex; align-items:center; justify-content:space-between;">
              <div style="display:flex; align-items:center; gap:10px;">
                <span class="order-step-badge">${idx + 1}</span>
                <span style="font-size:1.6rem;">${c.icon}</span>
                <strong style="color:#166534;">${c.text}</strong>
              </div>
              <button type="button" class="btn-remove-build" data-idx="${idx}" style="background:none; border:none; font-size:1.1rem; cursor:pointer;">❌</button>
            </div>
          `;
        }).join('');

        selectedList.querySelectorAll('.btn-remove-build').forEach(rm => {
          rm.onclick = () => {
            const i = parseInt(rm.getAttribute('data-idx'));
            const removedId = selectedCards.splice(i, 1)[0];
            const pBtn = poolGrid.querySelector(`[data-id="${removedId}"]`);
            if (pBtn) pBtn.classList.remove('selected');
            this.onPlaySound('trash');
            updateUI();
          };
        });
      }
    };

    poolGrid.querySelectorAll('.pool-card-btn').forEach(b => {
      b.onclick = () => {
        if (this.activityState.isCompleted) return;
        const cid = b.getAttribute('data-id');
        if (selectedCards.includes(cid)) return;
        b.classList.add('selected');
        selectedCards.push(cid);
        this.onPlaySound('click');
        updateUI();
      };
    });

    this.wireResetButton(() => {
      selectedCards = [];
      poolGrid.querySelectorAll('.pool-card-btn').forEach(b => b.classList.remove('selected'));
      updateUI();
    });

    if (btnValidate) {
      btnValidate.onclick = () => {
        if (this.activityState.isCompleted) return;
        if (selectedCards.length !== act.requiredCount) {
          this.updateByte(`Necesitás exactamente ${act.requiredCount} pasos indispensables.`, 'worried');
          return;
        }

        const hasDistractor = selectedCards.some(id => {
          const c = act.pool.find(p => p.id === id);
          return c && c.distractor;
        });

        if (hasDistractor) {
          this.recordAttemptError("Agregaste un paso distractor que no pertenece a esta tarea.");
          return;
        }

        const requiredSorted = act.pool.filter(p => !p.distractor).sort((a, b) => a.correctPos - b.correctPos);
        const isCorrect = selectedCards.every((id, idx) => id === requiredSorted[idx].id);

        if (isCorrect) {
          this.updateByte("¡Secuencia algorítmica impecable! Planificaste la tarea de principio a fin.", 'happy');
          btnValidate.style.display = 'none';
          this.recordActivitySuccess(act.id, 20);
        } else {
          this.recordAttemptError("Seleccionaste las acciones correctas, pero revisá el orden.");
        }
      };
    }

    const btnNext = document.getElementById('btn-activity-next');
    if (btnNext) btnNext.onclick = () => this.nextActivity();
  }

  // 12. CUADRÍCULA INTERACTIVA (AYUDÁ / PROGRAMÁ A BYTE)
  renderGridGame(container, act) {
    this.updateByte(act.instruction, 'normal', `${act.title}. ${act.instruction}`);

    // Inicializar estado de simulación
    this.gridPlayerPos = { ...act.startPos };
    this.gridCommands = [];
    this.gridIsRunning = false;
    let currentGoalIdx = 0;

    const isMultiGoal = act.type === 'grid_multi_goal';
    const cellSize = act.gridSize >= 5 ? 54 : 64;

    container.innerHTML = `
      <div class="grid-game-container">
        <div>
          ${this.createActivityHeader(act, false)}
          <div class="grid-board" id="grid-active-board" style="grid-template-columns: repeat(${act.gridSize}, ${cellSize}px);"></div>
        </div>

        <div class="grid-commands-panel">
          <div style="font-weight:700; color:#0369a1;">Comandos para Byte:</div>
          <div class="command-buttons-grid">
            <button type="button" class="btn-cmd" data-cmd="up"><span>⬆️</span> Arriba</button>
            <button type="button" class="btn-cmd" data-cmd="down"><span>⬇️</span> Abajo</button>
            <button type="button" class="btn-cmd" data-cmd="left"><span>⬅️</span> Izquierda</button>
            <button type="button" class="btn-cmd" data-cmd="right"><span>➡️</span> Derecha</button>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
            <span style="font-weight:700; font-size:0.9rem; color:#334155;">Secuencia de pasos:</span>
            <div style="display:flex; gap:6px;">
              <button type="button" id="btn-undo-grid-cmd" class="btn-clear-code" title="Deshacer último comando">⌫ Deshacer</button>
              <button type="button" id="btn-reset-grid-all" class="btn-clear-code" style="color:#b91c1c;" title="Reiniciar todo">🔄</button>
            </div>
          </div>

          <div class="commands-sequence-display" id="grid-cmds-display">
            <span style="color:#94a3b8; font-style:italic;">Agrega comandos con las flechas...</span>
          </div>

          <button type="button" id="btn-run-grid-exec" class="btn-run-code">
            <span>▶️</span> ¡Ejecutar Instrucciones!
          </button>
        </div>
      </div>
      ${this.createActivityFooter()}
    `;

    const boardEl = document.getElementById('grid-active-board');
    const cmdsDisplay = document.getElementById('grid-cmds-display');
    const btnRun = document.getElementById('btn-run-grid-exec');
    const btnUndo = document.getElementById('btn-undo-grid-cmd');
    const btnResetAll = document.getElementById('btn-reset-grid-all');

    const renderBoard = () => {
      if (!boardEl) return;
      boardEl.innerHTML = '';
      for (let y = 0; y < act.gridSize; y++) {
        for (let x = 0; x < act.gridSize; x++) {
          const cell = document.createElement('div');
          cell.className = 'grid-cell';
          cell.style.width = `${cellSize}px`;
          cell.style.height = `${cellSize}px`;

          const isObstacle = (act.obstacles || []).some(o => o.x === x && o.y === y);
          const isByte = this.gridPlayerPos.x === x && this.gridPlayerPos.y === y;

          if (isObstacle) {
            cell.className += ' obstacle';
            cell.textContent = '🪨';
          } else if (isMultiGoal) {
            const gObj = act.goals.find(g => g.x === x && g.y === y);
            if (gObj) {
              if (gObj.id === 'pc') cell.className += ' computer';
              else if (gObj.id === 'door') cell.className += ' door';
              else cell.className += ' target';
              cell.textContent = gObj.icon;
            }
          } else {
            if (act.targetPos && act.targetPos.x === x && act.targetPos.y === y) {
              cell.className += ' target';
              cell.textContent = act.targetIcon || '⭐';
            }
          }

          if (isByte) {
            cell.className += ' byte-here';
            cell.textContent = '🤖';
          }

          boardEl.appendChild(cell);
        }
      }
    };

    const updateCmdsUI = () => {
      if (!cmdsDisplay) return;
      if (this.gridCommands.length === 0) {
        cmdsDisplay.innerHTML = '<span style="color:#94a3b8; font-style:italic;">Agrega comandos con las flechas...</span>';
      } else {
        const cmdIcons = { up: '⬆️', down: '⬇️', left: '⬅️', right: '➡️' };
        cmdsDisplay.innerHTML = this.gridCommands.map((c, i) => `
          <span class="cmd-tag" id="cmd-tag-${i}">${i + 1}.${cmdIcons[c]}</span>
        `).join('');
      }
    };

    renderBoard();

    // Eventos de flechas
    container.querySelectorAll('.btn-cmd').forEach(b => {
      b.onclick = () => {
        if (this.gridIsRunning || this.activityState.isCompleted) return;
        this.onPlaySound('click');
        this.gridCommands.push(b.getAttribute('data-cmd'));
        updateCmdsUI();
      };
    });

    if (btnUndo) {
      btnUndo.onclick = () => {
        if (this.gridIsRunning || this.activityState.isCompleted) return;
        this.onPlaySound('trash');
        this.gridCommands.pop();
        updateCmdsUI();
      };
    }

    if (btnResetAll) {
      btnResetAll.onclick = () => {
        if (this.gridIsRunning) return;
        this.onPlaySound('trash');
        this.gridCommands = [];
        this.gridPlayerPos = { ...act.startPos };
        renderBoard();
        updateCmdsUI();
      };
    }

    // Ejecución segura paso a paso con token de cancelación
    if (btnRun) {
      btnRun.onclick = async () => {
        if (this.gridIsRunning || this.activityState.isCompleted) return;
        if (this.gridCommands.length === 0) {
          this.updateByte("¡Agregá al menos una instrucción de dirección antes de ejecutar!", 'worried');
          return;
        }

        this.gridIsRunning = true;
        btnRun.disabled = true;
        const abortToken = { isAborted: false };
        this.gridAnimationAbort = abortToken;

        // Reiniciar Byte en la casilla de salida
        this.gridPlayerPos = { ...act.startPos };
        currentGoalIdx = 0;
        renderBoard();

        let crashed = false;
        let failStepIndex = -1;

        for (let i = 0; i < this.gridCommands.length; i++) {
          if (abortToken.isAborted) return;

          // Resaltar comando activo
          const activeTag = document.getElementById(`cmd-tag-${i}`);
          if (activeTag) activeTag.className = 'cmd-tag running';

          await new Promise(r => setTimeout(r, 420));
          if (abortToken.isAborted) return;

          const cmd = this.gridCommands[i];
          let nextX = this.gridPlayerPos.x;
          let nextY = this.gridPlayerPos.y;

          if (cmd === 'up') nextY--;
          else if (cmd === 'down') nextY++;
          else if (cmd === 'left') nextX--;
          else if (cmd === 'right') nextX++;

          // Verificación límites de pantalla
          if (nextX < 0 || nextX >= act.gridSize || nextY < 0 || nextY >= act.gridSize) {
            crashed = true;
            failStepIndex = i;
            if (activeTag) activeTag.className = 'cmd-tag failed';
            this.onPlaySound('hit');
            this.recordAttemptError(`Me salí del mapa en el paso ${i + 1}. Revisemos las flechas.`);
            break;
          }

          // Verificación de obstáculos
          const hitObs = (act.obstacles || []).some(o => o.x === nextX && o.y === nextY);
          if (hitObs) {
            crashed = true;
            failStepIndex = i;
            if (activeTag) activeTag.className = 'cmd-tag failed';
            this.onPlaySound('hit');
            this.recordAttemptError(`¡Choqué contra una roca en el paso ${i + 1}! Deshacé o cambiá esa dirección.`);
            break;
          }

          this.gridPlayerPos = { x: nextX, y: nextY };
          this.onPlaySound('pop');

          if (isMultiGoal) {
            const expected = act.goals[currentGoalIdx];
            if (expected && nextX === expected.x && nextY === expected.y) {
              this.onPlaySound('coin');
              currentGoalIdx++;
            }
          }

          renderBoard();
          if (activeTag) activeTag.className = 'cmd-tag';
        }

        this.gridIsRunning = false;
        btnRun.disabled = false;

        // Comprobación de éxito si no chocó
        if (!crashed) {
          if (isMultiGoal) {
            if (currentGoalIdx === act.goals.length) {
              this.updateByte("¡Misión Cumplida! Visitaste todos los objetivos y regresaste a salvo.", 'happy');
              btnRun.style.display = 'none';
              this.recordActivitySuccess(act.id, 20);
            } else {
              const missingName = act.goals[currentGoalIdx]?.name || 'el siguiente objetivo';
              this.recordAttemptError(`Faltó cumplir: ${missingName}. Revisá la ruta planificada.`);
            }
          } else {
            if (this.gridPlayerPos.x === act.targetPos.x && this.gridPlayerPos.y === act.targetPos.y) {
              this.updateByte("¡Excelente! Byte llegó a la meta siguiendo exactamente tus instrucciones.", 'happy');
              btnRun.style.display = 'none';
              this.recordActivitySuccess(act.id, 20);
            } else {
              this.recordAttemptError("Byte terminó de caminar pero no llegó a la meta. ¡Agregá más pasos!");
            }
          }
        }
      };
    }

    const btnNext = document.getElementById('btn-activity-next');
    if (btnNext) btnNext.onclick = () => this.nextActivity();
  }

  // 13. DESAFÍO FINAL DE LA SECCIÓN
  renderFinalChallenge(container, act) {
    this.updateByte(act.instruction, 'thinking', `${act.title}. ${act.instruction}`);
    let selectedCards = [];
    const pool = [...act.pool].sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <div class="final-challenge-area">
        ${this.createActivityHeader(act)}
        <p style="color:#475569; font-size:1.05rem;">${act.instruction}</p>

        <div class="cards-pool-section">
          <div class="pool-title"><span>📦</span> 1. Banco de Acciones Disponibles:</div>
          <div class="cards-pool-grid" id="final-pool-grid">
            ${pool.map(c => `
              <button type="button" class="pool-card-btn" data-id="${c.id}">
                <span style="font-size:1.8rem;">${c.icon}</span>
                <span>${c.text}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="selected-sequence-section">
          <div class="pool-title" style="color:#15803d; justify-content:space-between;">
            <div><span>📋</span> 2. Tu Secuencia Final (${act.requiredCount} pasos):</div>
          </div>
          <div id="final-selected-list" style="display:flex; flex-direction:column; gap:8px; min-height:80px; padding:8px; background:white; border-radius:12px; border:2px dashed #cbd5e1;">
            <span style="color:#94a3b8; font-style:italic; padding:10px;">Toca las tarjetas del banco en el orden exacto...</span>
          </div>
        </div>

        <div class="stage-actions-bar">
          <button type="button" id="btn-validate-final" class="btn-run-code" style="padding:12px 28px;">
            <span>⭐</span> ¡Completar Desafío!
          </button>
        </div>
        ${this.createActivityFooter()}
      </div>
    `;

    const poolGrid = document.getElementById('final-pool-grid');
    const selectedList = document.getElementById('final-selected-list');
    const btnValidate = document.getElementById('btn-validate-final');

    const updateUI = () => {
      if (selectedCards.length === 0) {
        selectedList.innerHTML = '<span style="color:#94a3b8; font-style:italic; padding:10px;">Toca las tarjetas del banco en el orden exacto...</span>';
      } else {
        selectedList.innerHTML = selectedCards.map((cid, idx) => {
          const c = act.pool.find(p => p.id === cid);
          return `
            <div style="background:#f0fdf4; border:2px solid #86efac; border-radius:12px; padding:10px 14px; display:flex; align-items:center; justify-content:space-between;">
              <div style="display:flex; align-items:center; gap:10px;">
                <span class="order-step-badge">${idx + 1}</span>
                <span style="font-size:1.6rem;">${c.icon}</span>
                <strong style="color:#166534; font-size:1.05rem;">${c.text}</strong>
              </div>
              <button type="button" class="btn-remove-final" data-idx="${idx}" style="background:none; border:none; font-size:1.2rem; cursor:pointer;" title="Quitar">❌</button>
            </div>
          `;
        }).join('');

        selectedList.querySelectorAll('.btn-remove-final').forEach(rm => {
          rm.onclick = () => {
            const i = parseInt(rm.getAttribute('data-idx'));
            const removedId = selectedCards.splice(i, 1)[0];
            const pBtn = poolGrid.querySelector(`[data-id="${removedId}"]`);
            if (pBtn) pBtn.classList.remove('selected');
            this.onPlaySound('trash');
            updateUI();
          };
        });
      }
    };

    poolGrid.querySelectorAll('.pool-card-btn').forEach(b => {
      b.onclick = () => {
        if (this.activityState.isCompleted) return;
        const cid = b.getAttribute('data-id');
        if (selectedCards.includes(cid)) return;
        b.classList.add('selected');
        selectedCards.push(cid);
        this.onPlaySound('click');
        updateUI();
      };
    });

    this.wireResetButton(() => {
      selectedCards = [];
      poolGrid.querySelectorAll('.pool-card-btn').forEach(b => b.classList.remove('selected'));
      updateUI();
    });

    if (btnValidate) {
      btnValidate.onclick = () => {
        if (this.activityState.isCompleted) return;
        if (selectedCards.length !== act.requiredCount) {
          this.updateByte(`Seleccioná exactamente ${act.requiredCount} instrucciones indispensables.`, 'worried');
          return;
        }

        const hasDistractor = selectedCards.some(id => {
          const c = act.pool.find(p => p.id === id);
          return c && c.distractor;
        });

        if (hasDistractor) {
          this.recordAttemptError("Agregaste una instrucción distractora que no tiene que ver con la tarea.");
          return;
        }

        const requiredSorted = act.pool.filter(p => p.isRequired).sort((a, b) => a.correctPos - b.correctPos);
        const isOrderCorrect = selectedCards.every((id, i) => id === requiredSorted[i].id);

        if (isOrderCorrect) {
          this.onPlaySound('fanfare');
          this.onLaunchConfetti();
          this.updateByte("¡DESAFÍO SUPERADO! ¡Completaste toda la aventura de las instrucciones!", 'happy');
          btnValidate.style.display = 'none';
          this.recordActivitySuccess(act.id, 25);
        } else {
          this.recordAttemptError("Elegiste las tarjetas correctas, pero revisá el orden en que deben realizarse.");
        }
      };
    }

    const btnNext = document.getElementById('btn-activity-next');
    if (btnNext) btnNext.onclick = () => this.nextActivity();
  }

  /**
   * Conecta el botón de reinicio general de la actividad
   */
  wireResetButton(resetCallback) {
    const btnReset = document.getElementById('btn-reset-current-activity');
    if (btnReset) {
      btnReset.onclick = () => {
        this.onPlaySound('trash');
        this.initActivityState(this.activityState.hints);
        this.updateHintsUI();
        this.updateByte("Actividad reiniciada. ¡Comencemos de nuevo!", 'normal');
        const feedbackBox = document.getElementById('activity-feedback-box');
        if (feedbackBox) feedbackBox.style.display = 'none';
        const btnNext = document.getElementById('btn-activity-next');
        if (btnNext) btnNext.style.display = 'none';
        if (typeof resetCallback === 'function') resetCallback();
      };
    }
  }

  // ========================================================
  // MODAL DE VICTORIA FINAL DEL GRADO
  // ========================================================
  renderVictoryModal() {
    this.cleanupCurrentActivity();
    this.onPlaySound('fanfare');
    this.onLaunchConfetti();

    const gConfig = CODING_DATA.grades[this.currentGrade];
    const progress = this.storage.getGradeProgress(this.currentGrade);
    const container = document.getElementById('coding-stage-container');
    if (!container) return;

    container.innerHTML = `
      <div style="display:flex; justify-content:center; align-items:center; padding:20px 0;">
        <div class="coding-victory-card">
          <div class="victory-badge-icon">🏆</div>
          <h2 class="victory-title">🎉 ¡Sección Completada! 🎉</h2>
          <p class="victory-desc">
            ¡Felicitaciones! Has completado con éxito todas las misiones de <strong>INSTRUCCIONES</strong> para <strong>${gConfig.badge}</strong>.
          </p>

          <div class="victory-points-box">
            ⭐ ${progress.score || 0} Puntos Totales • ${progress.starsTotal || 0} Estrellas Obtenidas<br>
            <span style="font-size:1.15rem; color:#15803d; font-weight:700;">Insignia: «Maestro de las Instrucciones» 🏅</span>
          </div>

          <div style="margin-bottom:20px; font-size:1.1rem; color:#334155;">
            <strong>INSTRUCCIONES</strong><br>
            <span style="font-family:monospace; font-size:1.4rem; color:#15803d;">██████████ 100%</span>
          </div>

          <button type="button" id="btn-victory-back-syllabus" class="btn-stage-next" style="width:100%; justify-content:center;">
            <span>✨ Volver al Temario del Grado</span>
          </button>
        </div>
      </div>
    `;

    const btnBack = document.getElementById('btn-victory-back-syllabus');
    if (btnBack) {
      btnBack.onclick = () => {
        this.renderSyllabus();
      };
    }
  }
}

// Exportar globalmente para navegador y tests
window.CodingModuleManager = CodingModuleManager;
window.CODING_DATA = CODING_DATA;
