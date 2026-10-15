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
        title: 'INSTRUCCIONES',
        activities: [
          // TEORÍA INICIAL — ¿QUÉ ES UNA INSTRUCCIÓN?
          {
            id: 'g1_inst_theory',
            type: 'theory',
            title: '📖 ¿QUÉ ES UNA INSTRUCCIÓN?',
            intro: '¡HOLA! SOY BYTE 🤖. UNA INSTRUCCIÓN ES UNA INDICACIÓN QUE DICE QUÉ ACCIÓN DEBEMOS REALIZAR. LAS PERSONAS USAMOS INSTRUCCIONES TODOS LOS DÍAS COMO «GUARDÁ LOS JUGUETES» O «ABRÍ LA PUERTA». ¡LAS COMPUTADORAS NO ADIVINAN: NECESITAN INSTRUCCIONES CLARAS!',
            quote: 'UNA INSTRUCCIÓN ES UNA INDICACIÓN QUE DICE QUÉ ACCIÓN DEBEMOS REALIZAR. ¡UN ROBOT O COMPUTADORA SOLO HACE LO QUE LE INDICAMOS!',
            pillars: [
              {
                icon: '👉',
                title: 'DICE QUÉ HACER',
                desc: 'UNA INSTRUCCIÓN INDICA UNA ACCIÓN CONCRETA: AVANZAR, GIRAR O SALTAR UN OBSTÁCULO.'
              },
              {
                icon: '🤖',
                title: 'EL ROBOT OBEDECE',
                desc: 'BYTE Y LAS COMPUTADORAS NO ADIVINAN NADA: HACEN EXACTAMENTE LO QUE LES INDICAMOS.'
              },
              {
                icon: '🔀',
                title: 'EL ORDEN IMPORTA',
                desc: 'SI CAMBIAMOS EL ORDEN DE LAS INSTRUCCIONES, BYTE PUEDE TERMINAR EN OTRO LUGAR O CHOCAR.'
              },
              {
                icon: '🔧',
                title: 'PODEMOS CORREGIR',
                desc: 'SI ALGO NO SALE COMO ESPERÁBAMOS, REVISAMOS LAS INSTRUCCIONES Y VOLVEMOS A PROBAR.'
              }
            ],
            demoType: 'robot_commands_g1',
            buttonText: '¡AHORA VAMOS A PRACTICAR!'
          },

          // 1. ACTIVIDAD 1 — ¿QUÉ VA PRIMERO?
          {
            id: 'g1_inst_first',
            type: 'which_first_or_after',
            title: '👉 ACTIVIDAD 1: ¿QUÉ VA PRIMERO?',
            instruction: '¡VAMOS A DESCUBRIR QUÉ ACCIÓN DEBEMOS HACER AL INICIO!\n1. OBSERVÁ CON ATENCIÓN LAS ACCIONES DE CADA TAREA COTIDIANA.\n2. PENSÁ CUÁL ES EL PRIMER PASO INDISPENSABLE PARA PODER EMPEZAR.\n3. TOCÁ LA TARJETA QUE DEBEMOS HACER PRIMERO PARA AVANZAR.',
            mode: 'first',
            challenges: [
              {
                question: '¿QUÉ VA PRIMERO AL LAVARSE LAS MANOS?',
                options: [
                  { id: 'opt1', icon: '💧', label: 'MOJARSE LAS MANOS', isCorrect: true },
                  { id: 'opt2', icon: '🧺', label: 'SECARSE CON LA TOALLA', isCorrect: false }
                ],
                explanation: '¡PRIMERO NOS MOJAMOS LAS MANOS Y LUEGO NOS SECAMOS!'
              },
              {
                question: '¿QUÉ VA PRIMERO AL CEPILLARSE LOS DIENTES?',
                options: [
                  { id: 'opt1', icon: '🧴', label: 'PONER PASTA EN EL CEPILLO', isCorrect: true },
                  { id: 'opt2', icon: '🪥', label: 'GUARDAR EL CEPILLO LIMPIO', isCorrect: false }
                ],
                explanation: '¡PRIMERO PONEMOS LA PASTA DENTAL ANTES DE USAR EL CEPILLO!'
              },
              {
                question: '¿QUÉ VA PRIMERO AL VESTIRSE?',
                options: [
                  { id: 'opt1', icon: '🧦', label: 'PONERSE LAS MEDIAS', isCorrect: true },
                  { id: 'opt2', icon: '👟', label: 'PONERSE LAS ZAPATILLAS', isCorrect: false }
                ],
                explanation: '¡PRIMERO VAN LAS MEDIAS Y DESPUÉS LAS ZAPATILLAS!'
              },
              {
                question: '¿QUÉ VA PRIMERO AL PREPARAR UN SÁNDWICH?',
                options: [
                  { id: 'opt1', icon: '🍞', label: 'TOMAR EL PAN', isCorrect: true },
                  { id: 'opt2', icon: '😋', label: 'COMER EL SÁNDWICH', isCorrect: false }
                ],
                explanation: '¡PRIMERO BUSCAMOS EL PAN PARA PODER ARMAR EL SÁNDWICH!'
              }
            ],
            hints: [
              'PISTA 1: PENSÁ QUÉ HACEMOS AL PRINCIPIO DE LA TAREA ANTES DE CONTINUAR.',
              'PISTA 2: POR EJEMPLO, NO PODEMOS SECARNOS SI TODAVÍA NO NOS MOJAMOS LAS MANOS.',
              'PISTA 3: LA ACCIÓN CORRECTA ES LA QUE PREPARA TODO PARA PODER HACER EL RESTO.'
            ]
          },

          // 2. ACTIVIDAD 2 — ¿QUÉ VA DESPUÉS?
          {
            id: 'g1_inst_after',
            type: 'which_first_or_after',
            title: '⏩ ACTIVIDAD 2: ¿QUÉ VA DESPUÉS?',
            instruction: '¡BYTE YA HIZO EL PRIMER PASO! AHORA NECESITA CONTINUAR LA SECUENCIA.\n1. MIRÁ LA ACCIÓN QUE YA ESTÁ REALIZADA.\n2. OBSERVÁ LAS DOS OPCIONES Y PENSÁ CUÁL ES EL PASO SIGUIENTE LÓGICO.\n3. TOCÁ LA TARJETA QUE VA DESPUÉS PARA COMPLETAR EL PROCEDIMIENTO.',
            mode: 'after',
            challenges: [
              {
                question: 'SI YA PUSISTE TIERRA EN LA MACETA, ¿QUÉ VA DESPUÉS?',
                options: [
                  { id: 'opt1', icon: '🌱', label: 'PONER LA SEMILLA', isCorrect: true },
                  { id: 'opt2', icon: '🍎', label: 'COMER UNA MANZANA', isCorrect: false }
                ],
                explanation: '¡DESPUÉS DE LA TIERRA PONEMOS LA SEMILLA!'
              },
              {
                question: 'SI YA PUSISTE PASTA EN EL CEPILLO, ¿QUÉ VA DESPUÉS?',
                options: [
                  { id: 'opt1', icon: '🪥', label: 'CEPILLARSE LOS DIENTES', isCorrect: true },
                  { id: 'opt2', icon: '😴', label: 'DORMIR LA SIESTA', isCorrect: false }
                ],
                explanation: '¡DESPUÉS DE PONER PASTA NOS CEPILLAMOS BIEN LOS DIENTES!'
              },
              {
                question: 'SI YA ENJABONASTE TUS MANOS, ¿QUÉ VA DESPUÉS?',
                options: [
                  { id: 'opt1', icon: '💧', label: 'ENJUAGARSE CON AGUA', isCorrect: true },
                  { id: 'opt2', icon: '🧤', label: 'PONERSE GUANTES', isCorrect: false }
                ],
                explanation: '¡DESPUÉS DEL JABÓN NOS ENJUAGAMOS CON AGUA LIMPIA!'
              },
              {
                question: 'SI YA ABRISTE LA MOCHILA, ¿QUÉ VA DESPUÉS?',
                options: [
                  { id: 'opt1', icon: '📚', label: 'GUARDAR LOS CUADERNOS', isCorrect: true },
                  { id: 'opt2', icon: '⚽', label: 'PATEAR UNA PELOTA', isCorrect: false }
                ],
                explanation: '¡DESPUÉS DE ABRIR LA MOCHILA GUARDAMOS LOS CUADERNOS!'
              }
            ],
            hints: [
              'PISTA 1: OBSERVÁ QUÉ ACCIÓN TIENE RELACIÓN DIRECTA CON LA TAREA QUE ESTAMOS HACIENDO.',
              'PISTA 2: DESCARTÁ LA ACCIÓN QUE NO TIENE NADA QUE VER CON LA ACTIVIDAD.',
              'PISTA 3: LA RESPUESTA CORRECTA COMPLETA EL PASO INMEDIATO SIGUIENTE.'
            ]
          },

          // 3. ACTIVIDAD 3 — ORDENÁ LOS PASOS
          {
            id: 'g1_inst_order',
            type: 'order_steps',
            title: '🔢 ACTIVIDAD 3: ORDENÁ LOS PASOS',
            instruction: '¡ARMEMOS LA SECUENCIA COMPLETA PARA PREPARAR UN RICO SÁNDWICH!\n1. OBSERVÁ LAS ACCIONES QUE APARECEN DESORDENADAS.\n2. TOCÁ LAS FLECHAS ▲ Y ▼ DE CADA TARJETA PARA MOVERLAS HACIA ARRIBA O HACIA ABAJO.\n3. UBICÁ EL PRIMER PASO ARRIBA Y EL ÚLTIMO ABAJO.\n4. CUANDO LA SECUENCIA ESTÉ LISTA, TOCÁ «¡COMPROBAR ORDEN!» PARA VALIDAR.',
            items: [
              { id: 'sw_bread1', icon: '🍞', text: 'TOMAR EL PAN' },
              { id: 'sw_filling', icon: '🧀', text: 'PONER EL QUESO Y JAMÓN' },
              { id: 'sw_bread2', icon: '🍞', text: 'TAPAR CON OTRO PAN' },
              { id: 'sw_eat', icon: '😋', text: 'COMER EL RICO SÁNDWICH' }
            ],
            correctOrder: ['sw_bread1', 'sw_filling', 'sw_bread2', 'sw_eat'],
            hints: [
              'PISTA 1: PRIMERO SIEMPRE APOYAMOS LA PRIMERA REBANADA DE PAN SOBRE EL PLATO.',
              'PISTA 2: EN EL MEDIO COLOCAMOS EL RELLENO DE JAMÓN Y QUESO, Y LUEGO TAPAMOS CON OTRO PAN.',
              'PISTA 3: LO ÚLTIMO DE TODO ES DISFRUTAR Y COMER EL SÁNDWICH TERMINADO.'
            ]
          },

          // 4. ACTIVIDAD 4 — ¿QUÉ PASO FALTA?
          {
            id: 'g1_inst_missing',
            type: 'missing_step',
            title: '🧩 ACTIVIDAD 4: ¿QUÉ PASO FALTA?',
            instruction: '¡A ESTA SECUENCIA PARA LAVARSE LAS MANOS LE FALTA UN PASO INDISPENSABLE!\n1. LEÉ LOS PASOS Y BUSCÁ EL CASILLERO CON EL SIGNO DE PREGUNTA ❓.\n2. PENSÁ QUÉ PASO DE HIGIENE ES OBLIGATORIO ENTRE MOJARSE Y SECARSE.\n3. TOCÁ LA OPCIÓN CORRECTA ENTRE LAS 3 DISPONIBLES PARA COMPLETAR LA SECUENCIA.',
            sequence: [
              { num: 1, icon: '🚰', text: 'MOJARSE LAS MANOS CON AGUA' },
              { num: 2, icon: '❓', text: '____________________', isMissing: true },
              { num: 3, icon: '🧺', text: 'SECARSE LAS MANOS CON LA TOALLA' }
            ],
            options: [
              { id: 'm_opt1', text: 'ENJABONARSE BIEN CON JABÓN', isCorrect: true, icon: '🧼' },
              { id: 'm_opt2', text: 'PONERSE LOS ZAPATOS', isCorrect: false, icon: '👟' },
              { id: 'm_opt3', text: 'COMER UNA MANZANA', isCorrect: false, icon: '🍎' }
            ],
            hints: [
              'PISTA 1: PENSÁ QUÉ PRODUCTO DE HIGIENE NECESITÁS PARA SACAR LA SUCIEDAD.',
              'PISTA 2: PARA QUE LAS MANOS QUEDEN LIMPIAS HACE FALTA ENJABONARSE BIEN.',
              'PISTA 3: LA RESPUESTA CORRECTA ES «ENJABONARSE BIEN CON JABÓN».'
            ]
          },

          // 5. ACTIVIDAD 5 — ¿CÓMO PLANTAMOS UNA SEMILLA?
          {
            id: 'g1_inst_seed_final',
            type: 'seed_interactive',
            title: '🌱 ACTIVIDAD 5: ¿CÓMO PLANTAMOS UNA SEMILLA?',
            instruction: '¡VAMOS A CULTIVAR UNA HERMOSA PLANTA DÁNDOLE INSTRUCCIONES CLARAS!\n1. MIRÁ LAS 4 INSTRUCCIONES DISPONIBLES EN EL BANCO INFERIOR.\n2. TOCALAS EN EL ORDEN NATURAL QUE NECESITA LA PLANTA: TIERRA, SEMILLA, TAPAR Y REGAR.\n3. CADA VEZ QUE TOCÁS UNA INSTRUCCIÓN, SE SUMA A TU SECUENCIA Y LA PLANTA CRECE.\n4. SI TE EQUIVOCÁS EN EL ORDEN, TOCÁ «REINICIAR» PARA PROBAR OTRA VEZ.',
            steps: [
              { id: 'seed_1', icon: '🟫', label: 'PREPARAR LA TIERRA FÉRTIL' },
              { id: 'seed_2', icon: '🌱', label: 'COLOCAR LA SEMILLA' },
              { id: 'seed_3', icon: '🪴', label: 'TAPAR LA SEMILLA CON TIERRA' },
              { id: 'seed_4', icon: '💧', label: 'REGAR CON AGUA' }
            ],
            correctOrder: ['seed_1', 'seed_2', 'seed_3', 'seed_4'],
            hints: [
              'PISTA 1: PRIMERO PREPARAMOS LA TIERRA FÉRTIL EN LA MACETA.',
              'PISTA 2: LUEGO COLOCAMOS LA SEMILLA Y LA TAPAMOS CON UN POCO DE TIERRA.',
              'PISTA 3: AL FINAL REGAMOS CON AGUA PARA QUE RECIBA HUMEDAD Y FLOREZCA.'
            ]
          },

          // 6. MISIÓN FINAL INTERACTIVA — ¡LLEGÁ A LA META! (BYTE)
          {
            id: 'g1_inst_byte_mission',
            type: 'byte_mission',
            title: '🎮 MISIÓN FINAL: ¡LLEGÁ A LA META!',
            instruction: '¡AYUDÁ A BYTE A LLEGAR A SU CASA SIGUIENDO EL CAMINO!\n1. OBSERVÁ EL MAPA: FIJATE DÓNDE EMPIEZA BYTE Y DÓNDE ESTÁ SU CASA 🏠.\n2. MIRÁ EL CAMINO RECTO Y LA PIEDRA 🪨 QUE DEBE SALTAR EN EL MEDIO.\n3. TOCÁ LOS BOTONES DE MOVIMIENTO Y SALTO PARA SUMAR INSTRUCCIONES AL PANEL EN EL ORDEN CORRECTO.\n4. CUANDO LA SECUENCIA ESTÉ LISTA, PRESIONÁ «▶️ EJECUTAR» PARA VER A BYTE AVANZAR.\n5. ¡PODÉS ACTIVAR LA MÚSICA RETRO DE 8 BITS CON EL BOTÓN 🎵!',
            characterName: 'BYTE',
            characterIcon: '🤖',
            goalName: 'CASA DE BYTE',
            goalIcon: '🏠',
            gridCols: 5,
            gridRows: 2,
            startPos: { x: 0, y: 0 },
            targetPos: { x: 4, y: 0 },
            obstacles: [
              { x: 2, y: 0, icon: '🪨', name: 'PIEDRA' }
            ],
            scenery: [
              { x: 0, y: 1, icon: '🌻' },
              { x: 1, y: 1, icon: '🌳' },
              { x: 2, y: 1, icon: '🍄' },
              { x: 3, y: 1, icon: '🌻' },
              { x: 4, y: 1, icon: '🌳' }
            ],
            availableCommands: ['right', 'jump', 'up', 'down', 'left'],
            commandLabels: {
              right: '➡️ AVANZAR',
              jump: '🦘 SALTAR',
              up: '⬆️ SUBIR',
              down: '⬇️ BAJAR',
              left: '⬅️ IZQUIERDA'
            },
            hints: [
              'PISTA 1: MIRÁ EL CAMINO EN LÍNEA RECTA HACIA LA CASA DE BYTE.',
              'PISTA 2: EN EL MEDIO HAY UNA PIEDRA: USÁ «SALTAR» JUSTO CUANDO ESTÉS FRENTE A ELLA.',
              'PISTA 3: LA SECUENCIA DE PASOS ES: AVANZAR, SALTAR LA PIEDRA Y AVANZAR HASTA LA CASA.'
            ]
          }
        ]
      },
      // TEMA 2: PATRONES (EXCLUSIVO 1.° GRADO - TODO EN MAYÚSCULAS)
      patterns: {
        title: 'PATRONES',
        activities: [
          // 1. INTRODUCCIÓN: ¿QUÉ ES UN PATRÓN?
          {
            id: 'pat_intro',
            type: 'pattern_intro',
            title: '🧩 PATRONES',
            subtitle: 'UN PATRÓN ES ALGO QUE SE REPITE SIGUIENDO UN ORDEN.',
            instruction: '¿QUÉ IMAGEN SIGUE?',
            exampleSeq: [
              { id: 'apple', label: 'MANZANA', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
              { id: 'banana', label: 'BANANA', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
              { id: 'apple', label: 'MANZANA', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
              { id: 'banana', label: 'BANANA', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
              { id: 'apple', label: 'MANZANA', icon: '🍎', color: '#fee2e2', border: '#ef4444' }
            ],
            correct: { id: 'banana', label: 'BANANA', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
            options: [
              { id: 'apple', label: 'MANZANA', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
              { id: 'banana', label: 'BANANA', icon: '🍌', color: '#fef3c7', border: '#f59e0b' }
            ],
            hints: [
              'PISTA 1: MIRÁ EL PRIMER DIBUJO Y EL SEGUNDO DIBUJO.',
              'PISTA 2: DESPUÉS DE LA MANZANA 🍎 SIEMPRE VIENE LA BANANA 🍌.',
              'PISTA 3: TOCÁ LA BANANA 🍌 PARA CONTINUAR EL PATRÓN.'
            ]
          },

          // 2. ACTIVIDAD 1 — ¿QUÉ SIGUE?
          {
            id: 'pat_what_next',
            type: 'pattern_what_next',
            title: '🎯 ACTIVIDAD 1: ¿QUÉ SIGUE?',
            instruction: 'TOCÁ LA IMAGEN QUE SIGUE EN EL PATRÓN:',
            challenges: [
              // 1. A B A B: Manzana / Banana
              {
                seq: [
                  { id: 'apple', label: 'MANZANA', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'banana', label: 'BANANA', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'apple', label: 'MANZANA', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'banana', label: 'BANANA', icon: '🍌', color: '#fef3c7', border: '#f59e0b' }
                ],
                correct: { id: 'apple', label: 'MANZANA', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                options: [
                  { id: 'apple', label: 'MANZANA', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'banana', label: 'BANANA', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'straw', label: 'FRUTILLA', icon: '🍓', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'orange', label: 'NARANJA', icon: '🍊', color: '#ffedd5', border: '#ea580c' }
                ],
                repeatSize: 2
              },
              // 2. A B A B: Perrito / Gatito
              {
                seq: [
                  { id: 'dog', label: 'PERRITO', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'GATITO', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'dog', label: 'PERRITO', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'GATITO', icon: '🐱', color: '#f3e8ff', border: '#a855f7' }
                ],
                correct: { id: 'dog', label: 'PERRITO', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                options: [
                  { id: 'dog', label: 'PERRITO', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'GATITO', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'rabbit', label: 'CONEJITO', icon: '🐰', color: '#fce7f3', border: '#ec4899' },
                  { id: 'panda', label: 'OSITO', icon: '🐼', color: '#f1f5f9', border: '#475569' }
                ],
                repeatSize: 2
              },
              // 3. A B A B: Rojo / Azul
              {
                seq: [
                  { id: 'red', label: 'ROJO', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'blue', label: 'AZUL', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'red', label: 'ROJO', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'blue', label: 'AZUL', icon: '🔵', color: '#dbeafe', border: '#3b82f6' }
                ],
                correct: { id: 'red', label: 'ROJO', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                options: [
                  { id: 'blue', label: 'AZUL', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'red', label: 'ROJO', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'yellow', label: 'AMARILLO', icon: '🟡', color: '#fef9c3', border: '#eab308' },
                  { id: 'green', label: 'VERDE', icon: '🟢', color: '#dcfce7', border: '#22c55e' }
                ],
                repeatSize: 2
              },
              // 4. A B A B: Estrella / Corazón
              {
                seq: [
                  { id: 'star', label: 'ESTRELLA', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'heart', label: 'CORAZÓN', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'star', label: 'ESTRELLA', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'heart', label: 'CORAZÓN', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' }
                ],
                correct: { id: 'star', label: 'ESTRELLA', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                options: [
                  { id: 'star', label: 'ESTRELLA', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'heart', label: 'CORAZÓN', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'moon', label: 'LUNA', icon: '🌙', color: '#e0e7ff', border: '#6366f1' },
                  { id: 'sun', label: 'SOL', icon: '🌞', color: '#fef3c7', border: '#f59e0b' }
                ],
                repeatSize: 2
              },
              // 5. A B B A B B: Manzana Banana Banana
              {
                seq: [
                  { id: 'apple', label: 'MANZANA', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'banana', label: 'BANANA', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'banana', label: 'BANANA', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'apple', label: 'MANZANA', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'banana', label: 'BANANA', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'banana', label: 'BANANA', icon: '🍌', color: '#fef3c7', border: '#f59e0b' }
                ],
                correct: { id: 'apple', label: 'MANZANA', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                options: [
                  { id: 'apple', label: 'MANZANA', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'banana', label: 'BANANA', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'orange', label: 'NARANJA', icon: '🍊', color: '#ffedd5', border: '#ea580c' },
                  { id: 'grape', label: 'UVA', icon: '🍇', color: '#f3e8ff', border: '#a855f7' }
                ],
                repeatSize: 3
              },
              // 6. A B C A B C: Sol Luna Estrella
              {
                seq: [
                  { id: 'sun', label: 'SOL', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'moon', label: 'LUNA', icon: '🌙', color: '#e0e7ff', border: '#6366f1' },
                  { id: 'star', label: 'ESTRELLA', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'sun', label: 'SOL', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'moon', label: 'LUNA', icon: '🌙', color: '#e0e7ff', border: '#6366f1' },
                  { id: 'star', label: 'ESTRELLA', icon: '⭐', color: '#fef9c3', border: '#eab308' }
                ],
                correct: { id: 'sun', label: 'SOL', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                options: [
                  { id: 'sun', label: 'SOL', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'moon', label: 'LUNA', icon: '🌙', color: '#e0e7ff', border: '#6366f1' },
                  { id: 'star', label: 'ESTRELLA', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'cloud', label: 'NUBE', icon: '☁️', color: '#f1f5f9', border: '#94a3b8' }
                ],
                repeatSize: 3
              }
            ],
            hints: [
              'PISTA 1: DECÍ LOS DIBUJOS EN VOZ ALTA PARA ESCUCHAR EL RITMO.',
              'PISTA 2: MIRÁ CON ATENCIÓN QUÉ DIBUJO EMPIEZA CADA GRUPO.',
              'PISTA 3: LA RESPUESTA CORRECTA VUELVE A EMPEZAR EL PATRÓN.'
            ]
          },

          // 3. ACTIVIDAD 2 — COMPLETÁ EL PATRÓN (Falta en el medio)
          {
            id: 'pat_complete_middle',
            type: 'pattern_complete_middle',
            title: '🔍 ACTIVIDAD 2: COMPLETÁ EL PATRÓN',
            instruction: 'FALTA UNA IMAGEN EN EL MEDIO. ¿CUÁL ES?',
            challenges: [
              // 1. 🐶 🐱 [ ❓ ] 🐱 🐶 🐱 (Falta: 🐶)
              {
                seq: [
                  { id: 'dog', label: 'PERRITO', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'GATITO', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  null,
                  { id: 'cat', label: 'GATITO', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'dog', label: 'PERRITO', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'GATITO', icon: '🐱', color: '#f3e8ff', border: '#a855f7' }
                ],
                correct: { id: 'dog', label: 'PERRITO', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                options: [
                  { id: 'dog', label: 'PERRITO', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'GATITO', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'rabbit', label: 'CONEJITO', icon: '🐰', color: '#fce7f3', border: '#ec4899' },
                  { id: 'panda', label: 'OSITO', icon: '🐼', color: '#f1f5f9', border: '#475569' }
                ],
                repeatSize: 2
              },
              // 2. 🔴 🔵 🔴 [ ❓ ] 🔴 🔵 (Falta: 🔵)
              {
                seq: [
                  { id: 'red', label: 'ROJO', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'blue', label: 'AZUL', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'red', label: 'ROJO', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  null,
                  { id: 'red', label: 'ROJO', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'blue', label: 'AZUL', icon: '🔵', color: '#dbeafe', border: '#3b82f6' }
                ],
                correct: { id: 'blue', label: 'AZUL', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                options: [
                  { id: 'blue', label: 'AZUL', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'red', label: 'ROJO', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'yellow', label: 'AMARILLO', icon: '🟡', color: '#fef9c3', border: '#eab308' },
                  { id: 'green', label: 'VERDE', icon: '🟢', color: '#dcfce7', border: '#22c55e' }
                ],
                repeatSize: 2
              },
              // 3. 🌳 🌸 🌳 [ ❓ ] 🌳 🌸 (Falta: 🌸)
              {
                seq: [
                  { id: 'tree', label: 'ÁRBOL', icon: '🌳', color: '#dcfce7', border: '#22c55e' },
                  { id: 'flower', label: 'FLOR', icon: '🌸', color: '#fce7f3', border: '#ec4899' },
                  { id: 'tree', label: 'ÁRBOL', icon: '🌳', color: '#dcfce7', border: '#22c55e' },
                  null,
                  { id: 'tree', label: 'ÁRBOL', icon: '🌳', color: '#dcfce7', border: '#22c55e' },
                  { id: 'flower', label: 'FLOR', icon: '🌸', color: '#fce7f3', border: '#ec4899' }
                ],
                correct: { id: 'flower', label: 'FLOR', icon: '🌸', color: '#fce7f3', border: '#ec4899' },
                options: [
                  { id: 'flower', label: 'FLOR', icon: '🌸', color: '#fce7f3', border: '#ec4899' },
                  { id: 'tree', label: 'ÁRBOL', icon: '🌳', color: '#dcfce7', border: '#22c55e' },
                  { id: 'mushroom', label: 'HONGO', icon: '🍄', color: '#fee2e2', border: '#ef4444' },
                  { id: 'sun', label: 'SOL', icon: '🌞', color: '#fef3c7', border: '#f59e0b' }
                ],
                repeatSize: 2
              },
              // 4. 🚗 ✈️ [ ❓ ] ✈️ 🚗 ✈️ (Falta: 🚗)
              {
                seq: [
                  { id: 'car', label: 'AUTO', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'plane', label: 'AVIÓN', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                  null,
                  { id: 'plane', label: 'AVIÓN', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                  { id: 'car', label: 'AUTO', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'plane', label: 'AVIÓN', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' }
                ],
                correct: { id: 'car', label: 'AUTO', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                options: [
                  { id: 'car', label: 'AUTO', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'plane', label: 'AVIÓN', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                  { id: 'rocket', label: 'COHETE', icon: '🚀', color: '#fee2e2', border: '#ef4444' },
                  { id: 'boat', label: 'BARCO', icon: '⛵', color: '#dbeafe', border: '#2563eb' }
                ],
                repeatSize: 2
              },
              // 5. 🦁 🐵 🐵 🦁 [ ❓ ] 🐵 (Falta: 🐵)
              {
                seq: [
                  { id: 'lion', label: 'LEÓN', icon: '🦁', color: '#fef3c7', border: '#d97706' },
                  { id: 'monkey', label: 'MONITO', icon: '🐵', color: '#ffedd5', border: '#ea580c' },
                  { id: 'monkey', label: 'MONITO', icon: '🐵', color: '#ffedd5', border: '#ea580c' },
                  { id: 'lion', label: 'LEÓN', icon: '🦁', color: '#fef3c7', border: '#d97706' },
                  null,
                  { id: 'monkey', label: 'MONITO', icon: '🐵', color: '#ffedd5', border: '#ea580c' }
                ],
                correct: { id: 'monkey', label: 'MONITO', icon: '🐵', color: '#ffedd5', border: '#ea580c' },
                options: [
                  { id: 'monkey', label: 'MONITO', icon: '🐵', color: '#ffedd5', border: '#ea580c' },
                  { id: 'lion', label: 'LEÓN', icon: '🦁', color: '#fef3c7', border: '#d97706' },
                  { id: 'dog', label: 'PERRITO', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'panda', label: 'OSITO', icon: '🐼', color: '#f1f5f9', border: '#475569' }
                ],
                repeatSize: 3
              }
            ],
            hints: [
              'PISTA 1: MIRÁ EL DIBUJO QUE ESTÁ JUSTO ANTES Y DESPUÉS DEL HUECO ❓.',
              'PISTA 2: OBSERVÁ CÓMO EMPIEZA LA PRIMERA PARTE DEL PATRÓN.',
              'PISTA 3: LA FIGURA QUE FALTA COMPLETA LA PAREJA QUE SE REPITE.'
            ]
          },

          // 4. ACTIVIDAD 3 — ENCONTRÁ EL PATRÓN (Observación de 3 filas)
          {
            id: 'pat_find_which',
            type: 'pattern_find_which',
            title: '👀 ACTIVIDAD 3: ENCONTRÁ EL PATRÓN',
            instruction: '¿CUÁL DE ESTAS FILAS TIENE UN PATRÓN QUE SE REPITE?',
            challenges: [
              {
                options: [
                  {
                    id: 'row_a',
                    label: 'FILA A',
                    items: [
                      { icon: '🍎', label: 'MANZANA' }, { icon: '🍌', label: 'BANANA' },
                      { icon: '🍎', label: 'MANZANA' }, { icon: '🍌', label: 'BANANA' },
                      { icon: '🍎', label: 'MANZANA' }, { icon: '🍌', label: 'BANANA' }
                    ],
                    hasPattern: true
                  },
                  {
                    id: 'row_b',
                    label: 'FILA B',
                    items: [
                      { icon: '🐶', label: 'PERRITO' }, { icon: '🌳', label: 'ÁRBOL' },
                      { icon: '⭐', label: 'ESTRELLA' }, { icon: '🔵', label: 'AZUL' },
                      { icon: '🚗', label: 'AUTO' }, { icon: '🎈', label: 'GLOBO' }
                    ],
                    hasPattern: false
                  },
                  {
                    id: 'row_c',
                    label: 'FILA C',
                    items: [
                      { icon: '🍓', label: 'FRUTILLA' }, { icon: '🐱', label: 'GATITO' },
                      { icon: '☀️', label: 'SOL' }, { icon: '🚗', label: 'AUTO' },
                      { icon: '🐸', label: 'RANITA' }, { icon: '🌸', label: 'FLOR' }
                    ],
                    hasPattern: false
                  }
                ]
              },
              {
                options: [
                  {
                    id: 'row_a',
                    label: 'FILA A',
                    items: [
                      { icon: '⚽', label: 'PELOTA' }, { icon: '🚗', label: 'AUTO' },
                      { icon: '🎈', label: 'GLOBO' }, { icon: '🧸', label: 'OSO' },
                      { icon: '🚀', label: 'COHETE' }, { icon: '🚲', label: 'BICI' }
                    ],
                    hasPattern: false
                  },
                  {
                    id: 'row_b',
                    label: 'FILA B',
                    items: [
                      { icon: '🌞', label: 'SOL' }, { icon: '🌙', label: 'LUNA' },
                      { icon: '🌞', label: 'SOL' }, { icon: '🌙', label: 'LUNA' },
                      { icon: '🌞', label: 'SOL' }, { icon: '🌙', label: 'LUNA' }
                    ],
                    hasPattern: true
                  },
                  {
                    id: 'row_c',
                    label: 'FILA C',
                    items: [
                      { icon: '🐸', label: 'RANITA' }, { icon: '🌸', label: 'FLOR' },
                      { icon: '🍄', label: 'HONGO' }, { icon: '🍎', label: 'MANZANA' },
                      { icon: '🍇', label: 'UVA' }, { icon: '🍋', label: 'LIMÓN' }
                    ],
                    hasPattern: false
                  }
                ]
              },
              {
                options: [
                  {
                    id: 'row_a',
                    label: 'FILA A',
                    items: [
                      { icon: '🔴', label: 'ROJO' }, { icon: '🔴', label: 'ROJO' }, { icon: '🔵', label: 'AZUL' },
                      { icon: '🔴', label: 'ROJO' }, { icon: '🔴', label: 'ROJO' }, { icon: '🔵', label: 'AZUL' }
                    ],
                    hasPattern: true
                  },
                  {
                    id: 'row_b',
                    label: 'FILA B',
                    items: [
                      { icon: '🔵', label: 'AZUL' }, { icon: '🔴', label: 'ROJO' },
                      { icon: '🟡', label: 'AMARILLO' }, { icon: '🟢', label: 'VERDE' },
                      { icon: '🟣', label: 'VIOLETA' }, { icon: '🟠', label: 'NARANJA' }
                    ],
                    hasPattern: false
                  },
                  {
                    id: 'row_c',
                    label: 'FILA C',
                    items: [
                      { icon: '🔴', label: 'ROJO' }, { icon: '🔵', label: 'AZUL' },
                      { icon: '🔵', label: 'AZUL' }, { icon: '🔴', label: 'ROJO' },
                      { icon: '🔵', label: 'AZUL' }, { icon: '🔴', label: 'ROJO' }
                    ],
                    hasPattern: false
                  }
                ]
              },
              {
                options: [
                  {
                    id: 'row_a',
                    label: 'FILA A',
                    items: [
                      { icon: '🐱', label: 'GATITO' }, { icon: '🐶', label: 'PERRITO' },
                      { icon: '🐰', label: 'CONEJITO' }, { icon: '🦁', label: 'LEÓN' },
                      { icon: '🐻', label: 'OSO' }, { icon: '🦊', label: 'ZORRITO' }
                    ],
                    hasPattern: false
                  },
                  {
                    id: 'row_b',
                    label: 'FILA B',
                    items: [
                      { icon: '🌸', label: 'FLOR' }, { icon: '🌻', label: 'GIRASOL' }, { icon: '🌹', label: 'ROSA' },
                      { icon: '🌸', label: 'FLOR' }, { icon: '🌻', label: 'GIRASOL' }, { icon: '🌹', label: 'ROSA' }
                    ],
                    hasPattern: true
                  },
                  {
                    id: 'row_c',
                    label: 'FILA C',
                    items: [
                      { icon: '🌸', label: 'FLOR' }, { icon: '🌹', label: 'ROSA' },
                      { icon: '🌸', label: 'FLOR' }, { icon: '🌹', label: 'ROSA' },
                      { icon: '🌻', label: 'GIRASOL' }, { icon: '🌻', label: 'GIRASOL' }
                    ],
                    hasPattern: false
                  }
                ]
              }
            ],
            hints: [
              'PISTA 1: UN PATRÓN REPITE SIEMPRE EL MISMO ORDEN DE FIGURAS.',
              'PISTA 2: LAS OTRAS FILAS TIENEN DIBUJOS TODOS DIFERENTES Y MEZCLADOS.',
              'PISTA 3: BUSCÁ LA FILA DONDE LOS MISMOS DIBUJOS VUELVEN A APARECER.'
            ]
          },

          // 5. ACTIVIDAD 4 — ORDENÁ LAS IMÁGENES (Completar con huecos)
          {
            id: 'pat_drag_slots',
            type: 'pattern_drag_slots',
            title: '✋ ACTIVIDAD 4: ORDENÁ LAS IMÁGENES',
            instruction: 'ARRASTRÁ O TOCÁ LAS IMÁGENES PARA LLENAR LOS LUGARES VACÍOS:',
            challenges: [
              {
                template: ['sun', null, 'sun', null, 'sun'],
                expectedSlots: ['moon', 'moon'],
                pool: [
                  { id: 'moon', label: 'LUNA', icon: '🌙', color: '#e0e7ff', border: '#6366f1' },
                  { id: 'star', label: 'ESTRELLA', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'dog', label: 'PERRITO', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'apple', label: 'MANZANA', icon: '🍎', color: '#fee2e2', border: '#ef4444' }
                ],
                baseItems: {
                  sun: { id: 'sun', label: 'SOL', icon: '🌞', color: '#fef3c7', border: '#f59e0b' }
                }
              },
              {
                template: ['red', null, 'red', null],
                expectedSlots: ['blue', 'blue'],
                pool: [
                  { id: 'blue', label: 'AZUL', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'green', label: 'VERDE', icon: '🟢', color: '#dcfce7', border: '#22c55e' },
                  { id: 'yellow', label: 'AMARILLO', icon: '🟡', color: '#fef9c3', border: '#eab308' },
                  { id: 'red', label: 'ROJO', icon: '🔴', color: '#fee2e2', border: '#ef4444' }
                ],
                baseItems: {
                  red: { id: 'red', label: 'ROJO', icon: '🔴', color: '#fee2e2', border: '#ef4444' }
                }
              },
              {
                template: ['cat', 'dog', null, 'dog'],
                expectedSlots: ['cat'],
                pool: [
                  { id: 'cat', label: 'GATITO', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'rabbit', label: 'CONEJITO', icon: '🐰', color: '#fce7f3', border: '#ec4899' },
                  { id: 'lion', label: 'LEÓN', icon: '🦁', color: '#fef3c7', border: '#d97706' },
                  { id: 'panda', label: 'OSITO', icon: '🐼', color: '#f1f5f9', border: '#475569' }
                ],
                baseItems: {
                  cat: { id: 'cat', label: 'GATITO', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  dog: { id: 'dog', label: 'PERRITO', icon: '🐶', color: '#ffedd5', border: '#f97316' }
                }
              },
              {
                template: ['star', 'heart', 'star', null, 'star'],
                expectedSlots: ['heart'],
                pool: [
                  { id: 'heart', label: 'CORAZÓN', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'moon', label: 'LUNA', icon: '🌙', color: '#e0e7ff', border: '#6366f1' },
                  { id: 'sun', label: 'SOL', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'cloud', label: 'NUBE', icon: '☁️', color: '#f1f5f9', border: '#94a3b8' }
                ],
                baseItems: {
                  star: { id: 'star', label: 'ESTRELLA', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  heart: { id: 'heart', label: 'CORAZÓN', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' }
                }
              }
            ],
            hints: [
              'PISTA 1: TOCÁ LA FIGURA DE ABAJO PARA COLOCARLA EN EL CASILLERO.',
              'PISTA 2: MIRÁ QUÉ FIGURA VA EN CADA HUECO CON SIGNO DE PREGUNTA.',
              'PISTA 3: LA SECUENCIA DEBE REPETIRSE DE FORMA EXACTA.'
            ]
          },

          // 6. ACTIVIDAD 5 — ARMÁ TU PROPIO PATRÓN (Creativo)
          {
            id: 'pat_creative_builder',
            type: 'pattern_creative_builder',
            title: '🎨 ACTIVIDAD 5: ARMÁ TU PROPIO PATRÓN',
            instruction: '¡ELEGÍ LAS FIGURAS Y CREÁ TU PROPIO PATRÓN REPETIDO!',
            themes: [
              {
                id: 'fruits',
                name: '🍎 FRUTAS',
                items: [
                  { id: 'apple', label: 'MANZANA', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'banana', label: 'BANANA', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'straw', label: 'FRUTILLA', icon: '🍓', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'orange', label: 'NARANJA', icon: '🍊', color: '#ffedd5', border: '#ea580c' }
                ]
              },
              {
                id: 'animals',
                name: '🐶 ANIMALES',
                items: [
                  { id: 'dog', label: 'PERRITO', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'GATITO', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'rabbit', label: 'CONEJITO', icon: '🐰', color: '#fce7f3', border: '#ec4899' },
                  { id: 'panda', label: 'OSITO', icon: '🐼', color: '#f1f5f9', border: '#475569' }
                ]
              },
              {
                id: 'shapes',
                name: '⭐ FORMAS',
                items: [
                  { id: 'star', label: 'ESTRELLA', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'heart', label: 'CORAZÓN', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'moon', label: 'LUNA', icon: '🌙', color: '#e0e7ff', border: '#6366f1' },
                  { id: 'sun', label: 'SOL', icon: '🌞', color: '#fef3c7', border: '#f59e0b' }
                ]
              },
              {
                id: 'toys',
                name: '🚗 JUGUETES',
                items: [
                  { id: 'car', label: 'AUTO', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'rocket', label: 'COHETE', icon: '🚀', color: '#fee2e2', border: '#ef4444' },
                  { id: 'boat', label: 'BARCO', icon: '⛵', color: '#dbeafe', border: '#2563eb' },
                  { id: 'plane', label: 'AVIÓN', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' }
                ]
              }
            ],
            hints: [
              'PISTA 1: ELEGÍ DOS FIGURAS DIFERENTES, POR EJEMPLO 🍎 Y 🍌.',
              'PISTA 2: PONELAS DE FORMA ALTERNADA: 🍎 🍌 🍎 🍌.',
              'PISTA 3: TOCÁ EL BOTÓN VERDE CUANDO TENGAS AL MENOS 4 FIGURAS.'
            ]
          },

          // 7. MINI DESAFÍO FINAL — DESAFÍO DE PATRONES (5 niveles consecutivos)
          {
            id: 'pat_final_challenge',
            type: 'pattern_final_challenge',
            title: '🏆 DESAFÍO DE PATRONES',
            instruction: '¡SUPERÁ LOS 5 NIVELES PARA SER UN DETECTIVE DE PATRONES!',
            levels: [
              // Nivel 1: 🔴 🔵 🔴 🔵 ❓
              {
                title: 'NIVEL 1',
                seq: [
                  { id: 'red', label: 'ROJO', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'blue', label: 'AZUL', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'red', label: 'ROJO', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'blue', label: 'AZUL', icon: '🔵', color: '#dbeafe', border: '#3b82f6' }
                ],
                correct: { id: 'red', label: 'ROJO', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                options: [
                  { id: 'blue', label: 'AZUL', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'red', label: 'ROJO', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'yellow', label: 'AMARILLO', icon: '🟡', color: '#fef9c3', border: '#eab308' }
                ]
              },
              // Nivel 2: 🐶 🐱 🐶 🐱 ❓
              {
                title: 'NIVEL 2',
                seq: [
                  { id: 'dog', label: 'PERRITO', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'GATITO', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'dog', label: 'PERRITO', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'GATITO', icon: '🐱', color: '#f3e8ff', border: '#a855f7' }
                ],
                correct: { id: 'dog', label: 'PERRITO', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                options: [
                  { id: 'cat', label: 'GATITO', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'dog', label: 'PERRITO', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'rabbit', label: 'CONEJITO', icon: '🐰', color: '#fce7f3', border: '#ec4899' }
                ]
              },
              // Nivel 3: ⭐ ❤️ ❤️ ⭐ ❤️ ❤️ ❓
              {
                title: 'NIVEL 3',
                seq: [
                  { id: 'star', label: 'ESTRELLA', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'heart', label: 'CORAZÓN', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'heart', label: 'CORAZÓN', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'star', label: 'ESTRELLA', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'heart', label: 'CORAZÓN', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'heart', label: 'CORAZÓN', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' }
                ],
                correct: { id: 'star', label: 'ESTRELLA', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                options: [
                  { id: 'star', label: 'ESTRELLA', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'heart', label: 'CORAZÓN', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'moon', label: 'LUNA', icon: '🌙', color: '#e0e7ff', border: '#6366f1' }
                ]
              },
              // Nivel 4: 🌞 🌙 ⭐ 🌞 🌙 ⭐ ❓
              {
                title: 'NIVEL 4',
                seq: [
                  { id: 'sun', label: 'SOL', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'moon', label: 'LUNA', icon: '🌙', color: '#e0e7ff', border: '#6366f1' },
                  { id: 'star', label: 'ESTRELLA', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'sun', label: 'SOL', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'moon', label: 'LUNA', icon: '🌙', color: '#e0e7ff', border: '#6366f1' },
                  { id: 'star', label: 'ESTRELLA', icon: '⭐', color: '#fef9c3', border: '#eab308' }
                ],
                correct: { id: 'sun', label: 'SOL', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                options: [
                  { id: 'sun', label: 'SOL', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'moon', label: 'LUNA', icon: '🌙', color: '#e0e7ff', border: '#6366f1' },
                  { id: 'star', label: 'ESTRELLA', icon: '⭐', color: '#fef9c3', border: '#eab308' }
                ]
              },
              // Nivel 5: Completar arrastrando/tocando: 🍎 [ ❓ ] 🍎 🍌 [ ❓ ] 🍌
              {
                title: 'NIVEL 5',
                isSlotFill: true,
                template: ['apple', null, 'apple', 'banana', null, 'banana'],
                expectedSlots: ['banana', 'apple'],
                pool: [
                  { id: 'banana', label: 'BANANA', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'apple', label: 'MANZANA', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'straw', label: 'FRUTILLA', icon: '🍓', color: '#ffe4e6', border: '#f43f5e' }
                ],
                baseItems: {
                  apple: { id: 'apple', label: 'MANZANA', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  banana: { id: 'banana', label: 'BANANA', icon: '🍌', color: '#fef3c7', border: '#f59e0b' }
                }
              }
            ],
            hints: [
              'PISTA 1: CONCENTRATE EN QUÉ FIGURAS SE REPITEN EN CADA NIVEL.',
              'PISTA 2: PRONUNCIÁ EL RITMO EN TU MENTE: UNO, DOS, UNO, DOS...',
              'PISTA 3: ¡VOS PODÉS! CADA NIVEL TE ACERCA A LA MEDALLA DE DETECTIVE.'
            ]
          }
        ]
      }
    },

    // ----------------------------------------------------
    // 2.° GRADO: Constructores Lógicos (El orden importa y detección de errores)
    // ----------------------------------------------------
    2: {
      number: 2,
      name: 'Constructores Lógicos',
      badge: '2.º Grado 🧱',
      colorClass: 'coding-g-2',
      accentColor: '#0288d1',
      description: 'Aprender que el orden de los pasos importa y detectar errores en secuencias.',
            instructions: {
        title: 'Instrucciones',
        activities: [
          // TEORÍA INICIAL — ¿QUÉ SON LAS INSTRUCCIONES Y LAS SECUENCIAS?
          {
            id: 'g2_inst_theory',
            type: 'theory',
            title: '📖 ¿Qué son las Instrucciones y las Secuencias?',
            intro: '¡Hola, constructor de código! En programación, una instrucción es una indicación concreta que le dice a una computadora o robot qué hacer. Las personas usamos instrucciones todo el tiempo: «abrí la puerta», «guardá los juguetes» o «dibujá un círculo». Las máquinas no adivinan intenciones: ¡necesitan indicaciones paso a paso!',
            quote: 'Una instrucción es una indicación que nos dice qué acción debemos realizar. Varias instrucciones ordenadas forman una secuencia que permite alcanzar un objetivo.',
            pillars: [
              {
                icon: '🎯',
                title: 'Indicación Concreta',
                desc: 'Una instrucción dice exactamente qué acción realizar: caminar, doblar, saltar o agarrar un objeto.'
              },
              {
                icon: '🤖',
                title: 'Computadoras y Robots',
                desc: 'Una máquina no adivina lo que queremos. Necesita indicaciones que pueda interpretar y ejecutar.'
              },
              {
                icon: '🔢',
                title: 'Secuencia Ordenada',
                desc: 'Al juntar varias instrucciones en un orden determinado, formamos una secuencia para lograr un objetivo.'
              },
              {
                icon: '🔀',
                title: 'El Orden Importa',
                desc: 'El orden de los pasos cambia el resultado: ¡no podés guardar los cuadernos si la mochila todavía está cerrada!'
              }
            ],
            demoType: 'sequence_demo_g2',
            buttonText: '¡PONGAMOS A PRUEBA LO QUE APRENDIMOS!'
          },

          // 1. ACTIVIDAD 1 — ORDENÁ LOS PASOS
          {
            id: 'g2_inst_order',
            type: 'order_steps',
            title: '🎒 Actividad 1: Ordená los Pasos de la Mochila',
            instruction: '¡Preparar la mochila para la escuela requiere una secuencia ordenada!\n1. Leé atentamente las 4 instrucciones que aparecen desordenadas.\n2. Usá los botones ▲ y ▼ para mover cada tarjeta hacia arriba o hacia abajo.\n3. Organizá los pasos desde el inicio (abrir la mochila) hasta el final (cerrarla).\n4. Cuando consideres que la secuencia está lista, hacé clic en «¡Comprobar Orden!».\n5. Si algo no encaja, revisá el orden y volvé a intentarlo.',
            items: [
              { id: 'bp_open', icon: '🔓', text: 'Abrir el cierre de la mochila' },
              { id: 'bp_books', icon: '📚', text: 'Guardar los cuadernos escolares' },
              { id: 'bp_pencil', icon: '✏️', text: 'Guardar la cartuchera con lápices' },
              { id: 'bp_close', icon: '🔒', text: 'Cerrar la mochila con el cierre' }
            ],
            correctOrder: ['bp_open', 'bp_books', 'bp_pencil', 'bp_close'],
            hints: [
              '💡 ¿Podés guardar los cuadernos si la mochila todavía está cerrada? Pensá qué acción debe ser la primera.',
              '💡 Abrir la mochila siempre va primero, y cerrar la mochila con el cierre va al final.',
              '💡 Organizá: abrir la mochila, guardar los cuadernos y cartuchera, y finalmente cerrar la mochila.'
            ]
          },

          // 2. ACTIVIDAD 2 — ¿QUÉ PASO FALTA?
          {
            id: 'g2_inst_missing',
            type: 'missing_step',
            title: '☕ Actividad 2: ¿Qué Paso Falta en el Té?',
            instruction: '¡A esta secuencia para preparar un té le falta un paso indispensable!\n1. Leé los pasos en orden y localizá el hueco con el signo ❓.\n2. Pensá qué acción se necesita para que el saquito de té infusione en la taza.\n3. Hacé clic sobre la instrucción correcta entre las 3 opciones disponibles.\n4. El sistema verificará tu respuesta al instante y te explicará el resultado.',
            sequence: [
              { num: 1, icon: '🔥', text: 'Calentar el agua en la pava' },
              { num: 2, icon: '☕', text: 'Poner el saquito de té en la taza' },
              { num: 3, icon: '❓', text: '____________________', isMissing: true },
              { num: 4, icon: '🍯', text: 'Endulzar con una cucharadita de miel' }
            ],
            options: [
              { id: 't_opt1', text: 'Servir el agua caliente en la taza', isCorrect: true, icon: '🫖' },
              { id: 't_opt2', text: 'Ponerse el pijama', isCorrect: false, icon: '🥼' },
              { id: 't_opt3', text: 'Atarse los cordones', isCorrect: false, icon: '👟' }
            ],
            hints: [
              '💡 Pensá: ¿cómo se prepara el té si el saquito está seco en la taza? Falta un líquido caliente.',
              '💡 Necesitamos verter el agua caliente sobre el saquito para que tome color y sabor.',
              '💡 La instrucción correcta para completar el paso 3 es «Servir el agua caliente en la taza».'
            ]
          },

          // 3. ACTIVIDAD 3 — ¿QUÉ PASO ESTÁ MAL?
          {
            id: 'g2_inst_error',
            type: 'find_error',
            title: '🪥 Actividad 3: ¿Qué Paso Está Mal?',
            instruction: '¡Detectá la instrucción que está en el momento equivocado!\n1. Observá la secuencia de pasos para cepillarse los dientes.\n2. Analizá cada acción y detectá qué paso se está realizando antes de tiempo o de forma incoherente.\n3. Tocá la tarjeta que contiene el error para depurar el procedimiento.\n4. Descubrí por qué esa instrucción no puede ejecutarse en ese momento.',
            steps: [
              { id: 't1', num: 1, text: 'Guardar el cepillo en el vaso del baño', isError: true, icon: '🚪' },
              { id: 't2', num: 2, text: 'Poner pasta dental en el cepillo', isError: false, icon: '🧴' },
              { id: 't3', num: 3, text: 'Cepillarse los dientes durante 2 minutos', isError: false, icon: '🪥' },
              { id: 't4', num: 4, text: 'Enjuagarse la boca con agua', isError: false, icon: '💧' }
            ],
            explanation: '¡No podemos guardar el cepillo antes de haberlo usado para cepillarnos los dientes!',
            hints: [
              '💡 Fijate en qué momento se guarda el cepillo de dientes en el vaso.',
              '💡 Si guardás el cepillo en el paso 1, ¿con qué te vas a cepillar los dientes en el paso 3?',
              '💡 El error está en el Paso 1: guardar el cepillo antes de haberse cepillado y enjuagado.'
            ]
          },

          // 4. ACTIVIDAD 4 — ¿QUÉ DEBEMOS HACER PRIMERO?
          {
            id: 'g2_inst_first',
            type: 'which_first_or_after',
            title: '🚦 Actividad 4: ¿Qué Debemos Hacer Primero?',
            instruction: '¡En muchas situaciones cotidianas, realizar una acción previa es obligatorio por seguridad o lógica!\n1. Analizá con atención la situación planteada (cruzar la calle).\n2. Compará las alternativas y determiná cuál debe ejecutarse siempre en primer lugar.\n3. Tocá la opción correcta para avanzar al siguiente desafío.',
            mode: 'first',
            challenges: [
              {
                question: 'Antes de cruzar la calle, ¿qué debemos hacer primero?',
                options: [
                  { id: 'c1', icon: '👀', label: 'Mirar para ambos lados', isCorrect: true },
                  { id: 'c2', icon: '🏃', label: 'Cruzar corriendo sin mirar', isCorrect: false }
                ],
                explanation: '¡Siempre debemos mirar hacia ambos lados antes de cruzar!'
              },
              {
                question: 'Antes de pintar una hoja en blanco, ¿qué debemos hacer primero?',
                options: [
                  { id: 'c1', icon: '🎨', label: 'Buscar témperas y pinceles', isCorrect: true },
                  { id: 'c2', icon: '🖼️', label: 'Colgar la hoja vacía en la pared', isCorrect: false }
                ],
                explanation: '¡Primero conseguimos los materiales de pintura!'
              }
            ],
            hints: [
              '💡 Pensá qué acción es indispensable para empezar cualquier actividad con total seguridad.',
              '💡 Mirar hacia ambos lados antes de cruzar la calle evita accidentes y peligros.',
              '💡 La primera opción («Mirar para ambos lados») es la precondición obligatoria.'
            ]
          },

          // 5. ACTIVIDAD 5 — ¿QUÉ DEBEMOS HACER AL FINAL?
          {
            id: 'g2_inst_last',
            type: 'which_first_or_after',
            title: '📦 Actividad 5: ¿Qué Debemos Hacer al Final?',
            instruction: '¡Toda secuencia completa tiene una instrucción clara de cierre y orden!\n1. Leé la tarea cotidiana y las acciones posibles.\n2. Identificá qué acción concluye la actividad y deja todo en orden al terminar.\n3. Tocá la opción que representa el paso final correcto.',
            mode: 'last',
            challenges: [
              {
                question: 'Al terminar de jugar con tus juguetes, ¿qué debemos hacer al final?',
                options: [
                  { id: 'c1', icon: '📦', label: 'Guardar los juguetes en el cajón', isCorrect: true },
                  { id: 'c2', icon: '🔨', label: 'Dejarlos tirados en el suelo', isCorrect: false }
                ],
                explanation: '¡Al terminar de jugar dejamos la habitación ordenada!'
              },
              {
                question: 'Al terminar de comer el almuerzo, ¿qué debemos hacer al final?',
                options: [
                  { id: 'c1', icon: '🍽️', label: 'Llevar los platos a la cocina', isCorrect: true },
                  { id: 'c2', icon: '🛋️', label: 'Tirar la comida al sillón', isCorrect: false }
                ],
                explanation: '¡Llevar los platos limpios a la bacha completa el almuerzo!'
              }
            ],
            hints: [
              '💡 Pensá en cómo se concluye una rutina responsable en el aula o en el hogar.',
              '💡 Dejar las cosas guardadas en su lugar correspondiente es la última etapa de todo trabajo.',
              '💡 Elegí la acción que cierra y deja limpio el espacio de juego o estudio.'
            ]
          },

          // 6. ACTIVIDAD 6 — EL DESAYUNO SALUDABLE DE BYTE
          {
            id: 'final_challenge',
            type: 'final_challenge',
            title: '🥪 Actividad 6: El Desayuno Saludable de Byte',
            instruction: '¡Byte necesita tu ayuda para preparar su desayuno saludable sin equivocarse!\n1. Observá las tarjetas del banco de instrucciones.\n2. Tocá las 4 instrucciones indispensables para armar el desayuno y agregalas al panel (descartá los 2 distractores que no tienen nada que ver).\n3. Usá los botones ▲ y ▼ para ordenar los pasos de arriba hacia abajo.\n4. Cuando tu secuencia esté lista, presioná «🚀 COMPROBAR SECUENCIA».\n5. ¡Podés encender la música retro 🎵 para acompañar el desafío!',
            pool: [
              { id: 'bowl', icon: '🥣', text: 'Buscar el bol limpio', isRequired: true, correctPos: 1 },
              { id: 'cereal', icon: '🌾', text: 'Servir los cereales crocantes', isRequired: true, correctPos: 2 },
              { id: 'football', icon: '⚽', text: 'Patear una pelota de fútbol', isRequired: false, distractor: true },
              { id: 'milk', icon: '🥛', text: 'Agregar la leche fresca', isRequired: true, correctPos: 3 },
              { id: 'guitar', icon: '🎸', text: 'Tocar la guitarra eléctrica', isRequired: false, distractor: true },
              { id: 'spoon', icon: '🥄', text: 'Comer con la cuchara', isRequired: true, correctPos: 4 }
            ],
            requiredCount: 4,
            hints: [
              '💡 Descartá las acciones distractoras que no pertenecen a la cocina (fútbol y guitarra).',
              '💡 En el desayuno: primero buscás el bol, después servís el cereal y luego agregás la leche.',
              '💡 Al final de todo usás la cuchara para comer. Ordená: Bol ➡️ Cereal ➡️ Leche ➡️ Comer.'
            ]
          },

          // 7. MISIÓN FINAL INTERACTIVA — ¡LLEGÁ A LA META! (BYTE)
          {
            id: 'g2_inst_byte_mission',
            type: 'byte_mission',
            title: '🎮 Misión Final: ¡Llegá a la Meta!',
            instruction: '¡Guiá a Byte hasta su casa esquivando el pozo de agua!\n1. Observá el mapa, el punto de inicio de Byte y la ubicación de su casa 🏠.\n2. Trazá mentalmente el camino libre y notá dónde está el pozo 🕳️.\n3. Agregá al panel de comandos las instrucciones necesarias (avanzar, girar, saltar) en el orden correcto.\n4. Presioná «▶️ EJECUTAR» para ver a Byte moverse paso a paso.\n5. Si Byte choca o cae, observá en qué paso ocurrió, corregí las flechas y volvé a intentarlo.\n6. ¡Activá la música de 8 bits con el botón 🎵 para sumergirte en la aventura retro!',
            characterName: 'Byte',
            characterIcon: '🤖',
            goalName: 'Casa de Byte',
            goalIcon: '🏠',
            gridCols: 5,
            gridRows: 4,
            startPos: { x: 0, y: 3 },
            targetPos: { x: 3, y: 1 },
            obstacles: [
              { x: 3, y: 3, icon: '🕳️', name: 'pozo de agua' }
            ],
            scenery: [
              { x: 0, y: 0, icon: '🌲' }, { x: 1, y: 0, icon: '🌲' }, { x: 2, y: 0, icon: '🌸' }, { x: 3, y: 0, icon: '🌲' }, { x: 4, y: 0, icon: '🌲' },
              { x: 0, y: 1, icon: '🌲' }, { x: 1, y: 1, icon: '🌸' }, { x: 2, y: 1, icon: '🍄' },
              { x: 0, y: 2, icon: '🌲' }, { x: 1, y: 2, icon: '🍄' }, { x: 2, y: 2, icon: '🌸' }, { x: 3, y: 2, icon: '🌲' }
            ],
            availableCommands: ['right', 'jump', 'up', 'left', 'down'],
            commandLabels: {
              right: '➡️ Avanzar',
              jump: '🦘 Saltar',
              up: '⬆️ Subir',
              left: '⬅️ Retroceder',
              down: '⬇️ Bajar'
            },
            hints: [
              '💡 Observá el camino: primero avanzá hacia la derecha por la fila inferior.',
              '💡 Hay un pozo en el camino: usá SALTAR después del segundo paso para no caerte.',
              '💡 Después del salto, subí hacia arriba y avanzá directamente hacia la casa de Byte.'
            ]
          }
        ]
      },

      // ====================================================
      // TEMA 2: PATRONES (2.° GRADO)
      // ====================================================
      patterns: {
        title: 'Patrones',
        description: 'Reconocer patrones más largos, descubrir qué falta, qué sobra y la regla rítmica.',
        activities: [
          // 1. ACTIVIDAD 1 — ¿QUÉ SIGUE?
          {
            id: 'g2_pat_what_next',
            type: 'pattern_what_next',
            title: '🎯 Actividad 1: ¿Qué Sigue en el Patrón?',
            instruction: 'Observá la secuencia rítmica y tocá la imagen que sigue:',
            challenges: [
              // 1. 🍎 🍌 🍎 🍌 🍎 ? -> 🍌
              {
                seq: [
                  { id: 'apple', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'banana', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'apple', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'banana', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'apple', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' }
                ],
                correct: { id: 'banana', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                options: [
                  { id: 'banana', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'apple', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'grape', label: 'Uva', icon: '🍇', color: '#f3e8ff', border: '#a855f7' }
                ],
                repeatSize: 2
              },
              // 2. 🐶 🐱 🐶 🐱 🐶 ? -> 🐱
              {
                seq: [
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' }
                ],
                correct: { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                options: [
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'rabbit', label: 'Conejo', icon: '🐰', color: '#fce7f3', border: '#ec4899' }
                ],
                repeatSize: 2
              },
              // 3. 🍎 🍌 🍌 🍎 🍌 🍌 ? -> 🍎
              {
                seq: [
                  { id: 'apple', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'banana', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'banana', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'apple', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'banana', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'banana', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' }
                ],
                correct: { id: 'apple', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                options: [
                  { id: 'apple', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'banana', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'orange', label: 'Naranja', icon: '🍊', color: '#ffedd5', border: '#ea580c' }
                ],
                repeatSize: 3
              },
              // 4. ⭐ ❤️ ❤️ ⭐ ❤️ ❤️ ? -> ⭐
              {
                seq: [
                  { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'heart', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'heart', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'heart', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'heart', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' }
                ],
                correct: { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                options: [
                  { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'heart', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'moon', label: 'Luna', icon: '🌙', color: '#e0e7ff', border: '#6366f1' }
                ],
                repeatSize: 3
              },
              // 5. 🚗 🚗 ✈️ 🚗 🚗 ✈️ ? -> 🚗
              {
                seq: [
                  { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'plane', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                  { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'plane', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' }
                ],
                correct: { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                options: [
                  { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'plane', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                  { id: 'rocket', label: 'Cohete', icon: '🚀', color: '#fee2e2', border: '#ef4444' }
                ],
                repeatSize: 3
              }
            ],
            hints: [
              '💡 Mirá el grupo de figuras que se repite.',
              '💡 Contá cuántas figuras iguales van juntas.',
              '💡 La secuencia empieza de nuevo con la primera figura.'
            ]
          },

          // 2. ACTIVIDAD 2 — ¿QUÉ FALTA?
          {
            id: 'g2_pat_complete',
            type: 'pattern_complete_middle',
            title: '🔍 Actividad 2: ¿Qué Falta en el Patrón?',
            instruction: 'Falta una figura en el casillero ❓. ¡Seleccionala!',
            challenges: [
              // 1. 🍎 🍌 🍓 🍎 ❓ 🍓 -> 🍌
              {
                seq: [
                  { id: 'apple', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'banana', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'straw', label: 'Frutilla', icon: '🍓', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'apple', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  null,
                  { id: 'straw', label: 'Frutilla', icon: '🍓', color: '#ffe4e6', border: '#f43f5e' }
                ],
                correct: { id: 'banana', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                options: [
                  { id: 'banana', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'apple', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'straw', label: 'Frutilla', icon: '🍓', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'orange', label: 'Naranja', icon: '🍊', color: '#ffedd5', border: '#ea580c' }
                ],
                repeatSize: 3
              },
              // 2. 🐶 🐱 🐱 🐶 ❓ 🐱 -> 🐱
              {
                seq: [
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  null,
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' }
                ],
                correct: { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                options: [
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'rabbit', label: 'Conejo', icon: '🐰', color: '#fce7f3', border: '#ec4899' }
                ],
                repeatSize: 3
              },
              // 3. 🟢 🟡 🔴 🟢 🟡 ❓ -> 🔴
              {
                seq: [
                  { id: 'green', label: 'Verde', icon: '🟢', color: '#dcfce7', border: '#22c55e' },
                  { id: 'yellow', label: 'Amarillo', icon: '🟡', color: '#fef9c3', border: '#eab308' },
                  { id: 'red', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'green', label: 'Verde', icon: '🟢', color: '#dcfce7', border: '#22c55e' },
                  { id: 'yellow', label: 'Amarillo', icon: '🟡', color: '#fef9c3', border: '#eab308' },
                  null
                ],
                correct: { id: 'red', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                options: [
                  { id: 'red', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'blue', label: 'Azul', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'green', label: 'Verde', icon: '🟢', color: '#dcfce7', border: '#22c55e' }
                ],
                repeatSize: 3
              }
            ],
            hints: [
              '💡 Mirá qué figura está en esa misma posición en el primer grupo.',
              '💡 El ritmo se repite de a 3 elementos.',
              '💡 La figura que falta completa el patrón exacto.'
            ]
          },

          // 3. ACTIVIDAD 3 — ENCONTRÁ EL ERROR
          {
            id: 'g2_pat_find_error',
            type: 'pattern_find_error',
            title: '👀 Actividad 3: Encontrá el Error en el Patrón',
            instruction: 'Una figura está fuera de lugar y rompe el patrón. ¡Tocala!',
            challenges: [
              // 1. 🐶 🐱 🐰 🐶 [🐰(error)] 🐰 -> el 5.° debería ser 🐱
              {
                seq: [
                  { id: 'd1', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'c1', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'r1', label: 'Conejo', icon: '🐰', color: '#fce7f3', border: '#ec4899' },
                  { id: 'd2', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'err1', label: 'Conejo', icon: '🐰', color: '#fee2e2', border: '#ef4444', isError: true, expected: { icon: '🐱', label: 'Gato' } },
                  { id: 'r2', label: 'Conejo', icon: '🐰', color: '#fce7f3', border: '#ec4899' }
                ],
                ruleDesc: 'El patrón es Perro ➡️ Gato ➡️ Conejo. En el casillero 5 debería haber un Gato 🐱.'
              },
              // 2. 🍎 🍌 🍎 🍌 [🍓(error)] 🍌 -> el 5.° debería ser 🍎
              {
                seq: [
                  { id: 'a1', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'b1', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'a2', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'b2', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'err2', label: 'Frutilla', icon: '🍓', color: '#fee2e2', border: '#ef4444', isError: true, expected: { icon: '🍎', label: 'Manzana' } },
                  { id: 'b3', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' }
                ],
                ruleDesc: 'El patrón es Manzana ➡️ Banana. En el casillero 5 debería haber una Manzana 🍎.'
              },
              // 3. ⭐ ❤️ ❤️ ⭐ [⭐(error)] ❤️ -> el 5.° debería ser ❤️
              {
                seq: [
                  { id: 's1', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'h1', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'h2', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 's2', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'err3', label: 'Estrella', icon: '⭐', color: '#fee2e2', border: '#ef4444', isError: true, expected: { icon: '❤️', label: 'Corazón' } },
                  { id: 'h3', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' }
                ],
                ruleDesc: 'El patrón es Estrella ➡️ Corazón ➡️ Corazón. El casillero 5 debería ser un Corazón ❤️.'
              }
            ],
            hints: [
              '💡 Leé la secuencia en voz alta para escuchar el ritmo.',
              '💡 Compará el primer bloque con el segundo bloque.',
              '💡 Tocá la figura que no coincide con la repetición.'
            ]
          },

          // 4. ACTIVIDAD 4 — ORDENÁ EL PATRÓN
          {
            id: 'g2_pat_order',
            type: 'pattern_drag_slots',
            title: '✋ Actividad 4: Ordená las Imágenes',
            instruction: 'Arrastrá o tocá las imágenes para armar la secuencia correcta:',
            challenges: [
              {
                template: ['apple', null, 'apple', null],
                expectedSlots: ['banana', 'banana'],
                pool: [
                  { id: 'banana', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'apple', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'orange', label: 'Naranja', icon: '🍊', color: '#ffedd5', border: '#ea580c' }
                ],
                baseItems: {
                  apple: { id: 'apple', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' }
                }
              },
              {
                template: ['star', 'heart', null, 'star', null, 'heart'],
                expectedSlots: ['heart', 'heart'],
                pool: [
                  { id: 'heart', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'moon', label: 'Luna', icon: '🌙', color: '#e0e7ff', border: '#6366f1' }
                ],
                baseItems: {
                  star: { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  heart: { id: 'heart', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' }
                }
              }
            ],
            hints: [
              '💡 Mirá qué figura va en los casilleros vacíos con signo de pregunta.',
              '💡 Seguí el ritmo alternado.',
              '💡 Completá los dos huecos para formar el patrón.'
            ]
          },

          // 5. ACTIVIDAD 5 — DESCUBRÍ LA REGLA
          {
            id: 'g2_pat_rule',
            type: 'pattern_discover_rule',
            title: '⭐ Actividad 5: Descubrí la Regla',
            instruction: 'Observá la secuencia y elegí cuál es la regla que se repite:',
            challenges: [
              // 1. ⭐ ❤️ ❤️ ⭐ ❤️ ❤️ ⭐
              {
                seq: [
                  { id: 's1', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'h1', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'h2', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 's2', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'h3', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'h4', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 's3', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' }
                ],
                question: '¿QUÉ SE REPITE?',
                options: [
                  { id: 'r1', text: 'Una estrella y un corazón', isCorrect: false },
                  { id: 'r2', text: 'Una estrella y dos corazones', isCorrect: true, badge: '⭐ ❤️ ❤️' },
                  { id: 'r3', text: 'Dos estrellas y un corazón', isCorrect: false }
                ]
              },
              // 2. 🍎 🍌 🍎 🍌 🍎 🍌
              {
                seq: [
                  { id: 'a1', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'b1', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'a2', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'b2', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'a3', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  { id: 'b3', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' }
                ],
                question: '¿QUÉ SE REPITE?',
                options: [
                  { id: 'r1', text: 'Una manzana y una banana', isCorrect: true, badge: '🍎 🍌' },
                  { id: 'r2', text: 'Dos manzanas y una banana', isCorrect: false },
                  { id: 'r3', text: 'Una manzana y dos bananas', isCorrect: false }
                ]
              }
            ],
            hints: [
              '💡 Fijate en cuántas veces aparece cada figura antes de volver a empezar.',
              '💡 Contá cuántos corazones hay juntos entre cada estrella.',
              '💡 La regla correcta describe el grupo repetido completo.'
            ]
          },

          // 6. DESAFÍO FINAL — MAESTRO DE PATRONES 2.° GRADO
          {
            id: 'g2_pat_final',
            type: 'pattern_final_challenge',
            title: '🏆 Desafío Final de Patrones',
            instruction: '¡Superá los 5 niveles combinados para obtener tu insignia!',
            levels: [
              // Nivel 1: ¿Qué sigue? 🐶 🐱 🐰 🐶 🐱 🐰 ❓
              {
                title: 'NIVEL 1: ¿QUÉ SIGUE?',
                seq: [
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'rabbit', label: 'Conejo', icon: '🐰', color: '#fce7f3', border: '#ec4899' },
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'rabbit', label: 'Conejo', icon: '🐰', color: '#fce7f3', border: '#ec4899' }
                ],
                correct: { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                options: [
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'rabbit', label: 'Conejo', icon: '🐰', color: '#fce7f3', border: '#ec4899' }
                ]
              },
              // Nivel 2: ¿Qué sigue? ⭐ ⭐ ❤️ ⭐ ⭐ ❤️ ❓
              {
                title: 'NIVEL 2: RITMO DOBLE',
                seq: [
                  { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'heart', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'heart', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' }
                ],
                correct: { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                options: [
                  { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'heart', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'moon', label: 'Luna', icon: '🌙', color: '#e0e7ff', border: '#6366f1' }
                ]
              },
              // Nivel 3: 🚗 ✈️ 🚗 ✈️ 🚗 ❓
              {
                title: 'NIVEL 3: VEHÍCULOS',
                seq: [
                  { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'plane', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                  { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'plane', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                  { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' }
                ],
                correct: { id: 'plane', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                options: [
                  { id: 'plane', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                  { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'boat', label: 'Barco', icon: '⛵', color: '#dbeafe', border: '#2563eb' }
                ]
              },
              // Nivel 4: 🌞 🌙 🌙 🌞 🌙 🌙 ❓
              {
                title: 'NIVEL 4: DÍA Y NOCHE',
                seq: [
                  { id: 'sun', label: 'Sol', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'moon', label: 'Luna', icon: '🌙', color: '#e0e7ff', border: '#6366f1' },
                  { id: 'moon', label: 'Luna', icon: '🌙', color: '#e0e7ff', border: '#6366f1' },
                  { id: 'sun', label: 'Sol', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'moon', label: 'Luna', icon: '🌙', color: '#e0e7ff', border: '#6366f1' },
                  { id: 'moon', label: 'Luna', icon: '🌙', color: '#e0e7ff', border: '#6366f1' }
                ],
                correct: { id: 'sun', label: 'Sol', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                options: [
                  { id: 'sun', label: 'Sol', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'moon', label: 'Luna', icon: '🌙', color: '#e0e7ff', border: '#6366f1' },
                  { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' }
                ]
              },
              // Nivel 5: Completar dos casilleros: 🍎 [❓] 🍓 🍎 🍌 [❓]
              {
                title: 'NIVEL 5: HUECOS DOBLES',
                isSlotFill: true,
                template: ['apple', null, 'straw', 'apple', 'banana', null],
                expectedSlots: ['banana', 'straw'],
                pool: [
                  { id: 'banana', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'straw', label: 'Frutilla', icon: '🍓', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'apple', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' }
                ],
                baseItems: {
                  apple: { id: 'apple', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  banana: { id: 'banana', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  straw: { id: 'straw', label: 'Frutilla', icon: '🍓', color: '#ffe4e6', border: '#f43f5e' }
                }
              }
            ],
            hints: [
              '💡 Concentrarse en qué figuras forman el grupo repetido.',
              '💡 En el nivel 5, recordá que el orden es Manzana ➡️ Banana ➡️ Frutilla.',
              '💡 ¡Estás a un paso de la medalla de 2.° grado!'
            ]
          }
        ]
      }
    },

    // ----------------------------------------------------
    // 3.° GRADO: Exploradores de Caminos y Reglas
    // ----------------------------------------------------
    3: {
      number: 3,
      name: 'Exploradores de Caminos',
      badge: '3.º Grado 🗺️',
      colorClass: 'coding-g-3',
      accentColor: '#eab308',
      description: 'Seguir instrucciones para resolver caminos en mapas y descubrir la regla de patrones.',
            instructions: {
        title: 'Instrucciones',
        activities: [
          // TEORÍA INICIAL — ¿QUÉ SON LAS INSTRUCCIONES EN PROGRAMACIÓN?
          {
            id: 'g3_inst_theory',
            type: 'theory',
            title: '📖 ¿Qué son las Instrucciones en Programación?',
            intro: '¡Hola, explorador de caminos! En programación, las instrucciones le indican a un robot o computadora cómo recorrer un mapa y resolver un problema paso a paso. Las computadoras no adivinan intenciones: ejecutan cada orden en una secuencia estricta. ¡El orden de las instrucciones puede cambiar el resultado por completo!',
            quote: 'Las instrucciones deben ser claras, precisas y ordenadas. Si una instrucción falta o se ejecuta antes de tiempo, el resultado no será el esperado.',
            pillars: [
              {
                icon: '💻',
                title: 'Instrucciones y Mapas',
                desc: 'En programación, las instrucciones indican movimientos concretos para guiar a un personaje por un laberinto.'
              },
              {
                icon: '🗺️',
                title: 'Planificar el Recorrido',
                desc: 'Observá el punto de partida, los giros y los obstáculos antes de programar para no chocar.'
              },
              {
                icon: '🔀',
                title: '¡El Orden es Clave!',
                desc: 'Si Byte gira antes de tiempo o avanza cuando debe doblar, terminará en un lugar equivocado.'
              },
              {
                icon: '🔧',
                title: 'Depurar y Corregir',
                desc: 'Si el programa falla, revisamos qué paso falló o cuál faltó para corregir la secuencia.'
              }
            ],
            demoType: 'order_matters_g3',
            buttonText: '¡PONGAMOS A PRUEBA LO QUE APRENDIMOS!'
          },

          // 1. ACTIVIDAD 1 — ORDENÁ LAS INSTRUCCIONES DEL CAMINO (Con Mapa Visual)
          {
            id: 'g3_inst_order_arrows',
            type: 'order_steps',
            title: '🗺️ Actividad 1: Ordená las Instrucciones del Camino',
            instruction: '¡Ayudá a Byte a llegar a la escuela 🏫 siguiendo el camino del mapa!\n1. Observá el mapa visual: fijate dónde inicia Byte 🤖 y dónde está la escuela 🏫.\n2. Mirá las 4 instrucciones de movimiento (flechas) que aparecen desordenadas.\n3. Usá los botones ▲ y ▼ para ordenar las flechas de modo que sigan las baldosas libres sin chocar contra las rocas.\n4. Presioná «¡Comprobar Orden!» para ver a Byte avanzar paso a paso por el mapa.\n5. ¡Podés activar la música de 8 bits con el botón 🎵!',
            map: {
              cols: 3,
              rows: 3,
              start: { x: 0, y: 0 },
              target: { x: 2, y: 2, icon: '🏫', label: 'Escuela' },
              pathTiles: [
                { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
                { x: 2, y: 1 }, { x: 2, y: 2 }
              ],
              scenery: [
                { x: 0, y: 1, icon: '🌲' },
                { x: 1, y: 1, icon: '🌸' },
                { x: 0, y: 2, icon: '🌲' },
                { x: 1, y: 2, icon: '🌲' }
              ]
            },
            items: [
              { id: 'ar_r1', icon: '➡️', text: 'Avanzar a la Derecha', dir: 'right' },
              { id: 'ar_r2', icon: '➡️', text: 'Avanzar a la Derecha', dir: 'right' },
              { id: 'ar_d1', icon: '⬇️', text: 'Bajar hacia el Sur', dir: 'down' },
              { id: 'ar_d2', icon: '⬇️', text: 'Bajar hacia la Escuela', dir: 'down' }
            ],
            correctOrder: ['ar_r1', 'ar_r2', 'ar_d1', 'ar_d2'],
            expectedDirs: ['right', 'right', 'down', 'down'],
            hints: [
              '💡 Observá el mapa: Byte debe caminar por el sendero superior hacia la derecha.',
              '💡 Al llegar a la esquina superior derecha, debe doblar hacia abajo para entrar a la escuela.',
              '💡 Ordená las flechas para que primero avance dos veces a la derecha y luego baje dos veces.'
            ]
          },

          // 2. ACTIVIDAD 2 — ELEGÍ EL CAMINO CORRECTO (Con Mapa Visual)
          {
            id: 'g3_inst_choose_path',
            type: 'choose_path',
            title: '🧭 Actividad 2: Elegí el Camino Correcto',
            instruction: '¡Hay dos caminos posibles, pero solo uno conduce a la meta sin chocar contra los obstáculos!\n1. Observá atentamente el mapa y dónde están las rocas o pozos de agua.\n2. Leé cada una de las opciones de flechas y seguilas mentalmente sobre el mapa.\n3. Tocá la opción que describe el camino seguro hacia la gema o corona.\n4. El sistema verificará tu elección y te mostrará la simulación paso a paso.',
            challenges: [
              {
                question: 'Byte quiere llegar a la corona 👑 pero una gran roca 🪨 bloquea el paso hacia abajo. ¿Cuál de los dos caminos es seguro?',
                map: {
                  cols: 3,
                  rows: 2,
                  start: { x: 0, y: 0 },
                  target: { x: 2, y: 1, icon: '👑', label: 'Corona' },
                  obstacles: [
                    { x: 0, y: 1, icon: '🪨', label: 'Roca' }
                  ],
                  pathTiles: [
                    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
                    { x: 2, y: 1 }
                  ],
                  scenery: [
                    { x: 1, y: 1, icon: '🌲' }
                  ]
                },
                paths: [
                  {
                    id: 'p1',
                    name: 'Camino A: ➡️ ➡️ ⬇️',
                    arrows: ['➡️', '➡️', '⬇️'],
                    isCorrect: true,
                    successMsg: '¡Excelente! El Camino A avanza por terreno despejado y llega directo a la corona 👑 sin chocar.',
                    failMsg: ''
                  },
                  {
                    id: 'p2',
                    name: 'Camino B: ⬇️ ➡️ ➡️',
                    arrows: ['⬇️', '➡️', '➡️'],
                    isCorrect: false,
                    successMsg: '',
                    failMsg: '¡Cuidado! Si Byte baja primero, choca contra la gran roca 🪨. Observá bien el mapa y probá el otro camino.'
                  }
                ]
              },
              {
                question: 'Byte debe llegar a la estrella ⭐. Hacia la derecha hay un pozo de agua 🕳️. ¿Qué camino debe tomar para no caerse?',
                map: {
                  cols: 3,
                  rows: 3,
                  start: { x: 0, y: 0 },
                  target: { x: 1, y: 2, icon: '⭐', label: 'Estrella' },
                  obstacles: [
                    { x: 1, y: 0, icon: '🕳️', label: 'Pozo de agua' }
                  ],
                  pathTiles: [
                    { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 },
                    { x: 1, y: 2 }
                  ],
                  scenery: [
                    { x: 2, y: 0, icon: '🌲' },
                    { x: 1, y: 1, icon: '🌲' },
                    { x: 2, y: 1, icon: '🌲' },
                    { x: 2, y: 2, icon: '🌲' }
                  ]
                },
                paths: [
                  {
                    id: 'p1',
                    name: 'Camino A: ⬇️ ⬇️ ➡️',
                    arrows: ['⬇️', '⬇️', '➡️'],
                    isCorrect: true,
                    successMsg: '¡Muy bien! El Camino A baja primero esquivando el pozo y llega a salvo a la estrella ⭐.',
                    failMsg: ''
                  },
                  {
                    id: 'p2',
                    name: 'Camino B: ➡️ ⬇️ ⬇️',
                    arrows: ['➡️', '⬇️', '⬇️'],
                    isCorrect: false,
                    successMsg: '',
                    failMsg: '¡Alerta! Si avanza a la derecha en el primer paso, cae en el pozo de agua 🕳️. ¡Probá el otro camino!'
                  }
                ]
              }
            ],
            hints: [
              '💡 Observá atentamente dónde están los obstáculos de piedra en el mapa.',
              '💡 Seguí con la mirada las flechas de cada opción sobre el mapa antes de elegir.',
              '💡 Elegí el camino que camina exclusivamente por las baldosas libres sin chocar.'
            ]
          },

          // 3. ACTIVIDAD 3 — ENCONTRÁ EL PASO INCORRECTO (Con Mapa Visual)
          {
            id: 'g3_inst_wrong_step',
            type: 'find_error',
            title: '🚫 Actividad 3: Encontrá el Paso Incorrecto',
            instruction: '¡Una de las instrucciones de esta ruta está equivocada y provocará un choque!\n1. Observá el mapa y la secuencia de pasos programados en la lista.\n2. Seguí paso a paso el recorrido de Byte sobre las baldosas libres.\n3. Identificá cuál es la instrucción que se desvía del sendero hacia una pared o roca.\n4. Hacé clic sobre el paso defectuoso para corregir el programa y salvar a Byte.',
            map: {
              cols: 3,
              rows: 3,
              start: { x: 0, y: 1 },
              target: { x: 2, y: 2, icon: '💎', label: 'Gema' },
              obstacles: [
                { x: 2, y: 0, icon: '🧱', label: 'Muro de piedra' }
              ],
              pathTiles: [
                { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
                { x: 2, y: 2 }
              ],
              scenery: [
                { x: 0, y: 0, icon: '🌲' },
                { x: 1, y: 0, icon: '🌲' },
                { x: 0, y: 2, icon: '🌲' },
                { x: 1, y: 2, icon: '🌲' }
              ]
            },
            steps: [
              { id: 'w1', num: 1, text: '➡️ Avanzar a la derecha', isError: false, icon: '➡️' },
              { id: 'w2', num: 2, text: '➡️ Avanzar a la derecha', isError: false, icon: '➡️' },
              { id: 'w3', num: 3, text: '⬆️ Subir hacia el muro', isError: true, icon: '⬆️' },
              { id: 'w4', num: 4, text: '⬇️ Bajar hacia la gema', isError: false, icon: '⬇️' }
            ],
            explanation: '¡El Paso 3 es el error! La flecha ⬆️ choca contra el muro de piedra 🧱. Para llegar a la gema 💎, Byte debe bajar.',
            hints: [
              '💡 Fijate hacia dónde debe moverse Byte en el mapa para no chocar.',
              '💡 La gema está abajo; por lo tanto, una orden de subir choca contra el muro de piedra.',
              '💡 Buscá el paso que tiene la dirección invertida o que choca contra el obstáculo.'
            ]
          },

          // 4. ACTIVIDAD 4 — COMPLETÁ EL PASO QUE FALTA (Con Mapa Visual)
          {
            id: 'g3_inst_missing_step',
            type: 'missing_step',
            title: '🧩 Actividad 4: Completá el Paso que Falta',
            instruction: '¡El programa de Byte está casi listo, pero le falta una instrucción en una esquina clave!\n1. Observá el mapa y notá dónde se detiene la secuencia antes de llegar a la estrella ⭐.\n2. Determiná qué movimiento necesita hacer Byte para continuar por el sendero.\n3. Tocá la flecha correcta entre las opciones disponibles para completar la instrucción faltante.',
            map: {
              cols: 3,
              rows: 3,
              start: { x: 0, y: 0 },
              target: { x: 2, y: 2, icon: '⭐', label: 'Estrella' },
              pathTiles: [
                { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
                { x: 2, y: 1 }, { x: 2, y: 2 }
              ],
              scenery: [
                { x: 0, y: 1, icon: '🌲' },
                { x: 1, y: 1, icon: '🌸' },
                { x: 0, y: 2, icon: '🌲' },
                { x: 1, y: 2, icon: '🌲' }
              ]
            },
            sequence: [
              { num: 1, icon: '➡️', text: 'Avanzar a la derecha' },
              { num: 2, icon: '➡️', text: 'Avanzar a la derecha' },
              { num: 3, icon: '❓', text: '____________________', isMissing: true },
              { num: 4, icon: '⬇️', text: 'Bajar hacia la meta' }
            ],
            options: [
              { id: 'opt_down', text: '⬇️ Bajar por el camino', isCorrect: true, icon: '⬇️' },
              { id: 'opt_left', text: '⬅️ Volver hacia atrás', isCorrect: false, icon: '⬅️' },
              { id: 'opt_up', text: '⬆️ Subir hacia el pasto', isCorrect: false, icon: '⬆️' }
            ],
            hints: [
              '💡 Mirá el mapa: en la esquina superior, Byte necesita doblar hacia abajo para continuar.',
              '💡 Volver hacia atrás o subir hacia el pasto alejaría a Byte de la estrella.',
              '💡 La instrucción que completa el giro hacia el sendero inferior es ⬇️ Bajar.'
            ]
          },

          // 5. ACTIVIDAD 5 — LLEVÁ AL PERSONAJE HASTA EL OBJETIVO
          {
            id: 'grid_byte_g3',
            type: 'grid_movement',
            title: '🤖 Actividad 5: Llevá al Personaje hasta el Objetivo',
            instruction: '¡Programá a Byte directamente en el mapa para alcanzar la corona 👑 esquivando las rocas!\n1. Observá el tablero con la posición de Byte y la ubicación de la corona.\n2. Mirá dónde están las rocas 🪨 para trazar un camino despejado.\n3. Tocá las flechas de dirección (⬆️, ⬇️, ⬅️, ➡️) para armar tu programa. Si te equivocás, usá ⌫ Borrar.\n4. Cuando tu secuencia esté lista, presioná «▶️ EJECUTAR PROGRAMA» para ver a Byte avanzar.\n5. ¡Podés activar la música de 8 bits con el botón 🎵!',
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
              '💡 Podés avanzar por la fila superior hacia la derecha y luego bajar directamente.',
              '💡 Ruta recomendada: 3 pasos a la derecha hasta la esquina, y luego 3 pasos hacia abajo.',
              '💡 Ingresá los movimientos en orden y verificá que no toquen ningún casillero con rocas.'
            ]
          },

          // 6. ACTIVIDAD 6 — LA GRAN BÚSQUEDA DEL TESORO
          {
            id: 'final_challenge',
            type: 'final_challenge',
            title: '🗺️ Actividad 6: La Gran Búsqueda del Tesoro',
            instruction: '¡Planificá la expedición de Byte para abrir el cofre del tesoro!\n1. Observá las tarjetas del banco de instrucciones disponibles.\n2. Seleccioná las 5 instrucciones indispensables para la misión y descartá los 2 distractores.\n3. Reordená las tarjetas con los botones ▲ y ▼ en el orden lógico de la aventura: mapa, linterna, caminar, llave y abrir el cofre.\n4. Presioná «🚀 COMPROBAR SECUENCIA» para verificar tu expedición.\n5. ¡Activá la música retro 🎵 para ambientar la búsqueda!',
            pool: [
              { id: 'map', icon: '🗺️', text: 'Consultar el mapa del tesoro', isRequired: true, correctPos: 1 },
              { id: 'torch', icon: '🔦', text: 'Encender la linterna de exploración', isRequired: true, correctPos: 2 },
              { id: 'guitar', icon: '🎸', text: 'Afinar la guitarra acústica', isRequired: false, distractor: true },
              { id: 'walk', icon: '🚶', text: 'Avanzar 4 pasos evitando las rocas', isRequired: true, correctPos: 3 },
              { id: 'chest', icon: '🗝️', text: 'Insertar la llave en el cofre', isRequired: true, correctPos: 4 },
              { id: 'dance', icon: '💃', text: 'Bailar una chacarera', isRequired: false, distractor: true },
              { id: 'crown', icon: '👑', text: 'Tomar la corona dorada', isRequired: true, correctPos: 5 }
            ],
            requiredCount: 5,
            hints: [
              '💡 Guitarra y bailar son acciones distractoras que no ayudan a explorar la cueva.',
              '💡 Primero consultás el mapa y encendés la linterna, luego caminás hacia el cofre.',
              '💡 Al llegar al cofre, insertás la llave para abrirlo y tomar la corona dorada.'
            ]
          },

          // 7. MISIÓN FINAL INTERACTIVA — ¡LLEGÁ A LA META! (BYTE)
          {
            id: 'g3_inst_byte_mission',
            type: 'byte_mission',
            title: '🎮 Misión Final: ¡Llegá a la Meta!',
            instruction: '¡El gran desafío final de 3.º grado! Llevá a Byte a su laboratorio esquivando dos obstáculos.\n1. Inspeccioná el mapa: identificá a Byte, el pozo en la fila inferior, la roca superior y la entrada al laboratorio 🔬.\n2. Planificá la combinación de movimientos y saltos necesarios para superar cada peligro.\n3. Agregá los comandos en orden al panel de programación.\n4. Presioná «▶️ EJECUTAR» para comprobar si tu programa guía a Byte a destino.\n5. ¡Podés activar la música retro 🎵 para una experiencia de videojuego total!',
            characterName: 'Byte',
            characterIcon: '🤖',
            goalName: 'Laboratorio de Byte',
            goalIcon: '🔬',
            gridCols: 6,
            gridRows: 5,
            startPos: { x: 0, y: 4 },
            targetPos: { x: 5, y: 1 },
            obstacles: [
              { x: 3, y: 4, icon: '🕳️', name: 'pozo de agua' },
              { x: 4, y: 1, icon: '🪨', name: 'gran roca' }
            ],
            scenery: [
              { x: 0, y: 0, icon: '🌲' }, { x: 1, y: 0, icon: '🌲' }, { x: 2, y: 0, icon: '🌲' }, { x: 3, y: 0, icon: '🌸' },
              { x: 0, y: 1, icon: '🌲' }, { x: 1, y: 1, icon: '🌸' }, { x: 2, y: 1, icon: '🍄' }, { x: 3, y: 1, icon: '🌲' },
              { x: 0, y: 2, icon: '🌲' }, { x: 1, y: 2, icon: '🌲' }, { x: 2, y: 2, icon: '🌲' }, { x: 5, y: 2, icon: '🌲' },
              { x: 0, y: 3, icon: '🌲' }, { x: 1, y: 3, icon: '🍄' }, { x: 2, y: 3, icon: '🌸' }, { x: 5, y: 3, icon: '🌸' },
              { x: 5, y: 4, icon: '🌲' }
            ],
            availableCommands: ['right', 'jump', 'up', 'down', 'left'],
            commandLabels: {
              right: '➡️ Avanzar a la Derecha',
              jump: '🦘 Saltar',
              up: '⬆️ Subir',
              down: '⬇️ Bajar',
              left: '⬅️ Retroceder'
            },
            hints: [
              '💡 El recorrido tiene 2 obstáculos: un pozo en la fila inferior y una roca antes del laboratorio.',
              '💡 Avanzá a la derecha y usá SALTAR justo frente al pozo para llegar a la esquina.',
              '💡 Subí dos casilleros y saltá hacia arriba para superar la roca antes de entrar al laboratorio.'
            ]
          }
        ]
      },

      // ====================================================
      // TEMA 2: PATRONES (3.° GRADO)
      // ====================================================
      patterns: {
        title: 'Patrones',
        description: 'Descubrir la regla del patrón, completar secuencias largas, detectar intrusos y crear ritmos.',
        activities: [
          // 1. ACTIVIDAD 1 — ¿QUÉ SIGUE?
          {
            id: 'g3_pat_what_next',
            type: 'pattern_what_next',
            title: '🎯 Actividad 1: ¿Qué Sigue en Patrones Largos?',
            instruction: 'Observá la secuencia de 3 o 4 elementos y tocá la figura que continúa:',
            challenges: [
              // 1. 🔴 🔵 🟢 🔴 🔵 🟢 ? -> 🔴
              {
                seq: [
                  { id: 'red', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'blue', label: 'Azul', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'green', label: 'Verde', icon: '🟢', color: '#dcfce7', border: '#22c55e' },
                  { id: 'red', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'blue', label: 'Azul', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'green', label: 'Verde', icon: '🟢', color: '#dcfce7', border: '#22c55e' }
                ],
                correct: { id: 'red', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                options: [
                  { id: 'red', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'blue', label: 'Azul', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'green', label: 'Verde', icon: '🟢', color: '#dcfce7', border: '#22c55e' }
                ],
                repeatSize: 3
              },
              // 2. ⭐ ❤️ ❤️ ⭐ ❤️ ❤️ ? -> ⭐
              {
                seq: [
                  { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'heart', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'heart', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'heart', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'heart', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' }
                ],
                correct: { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                options: [
                  { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'heart', label: 'Corazón', icon: '❤️', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'moon', label: 'Luna', icon: '🌙', color: '#e0e7ff', border: '#6366f1' }
                ],
                repeatSize: 3
              },
              // 3. 🐶 🐱 🐰 🐶 🐱 🐰 ? -> 🐶
              {
                seq: [
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'rabbit', label: 'Conejo', icon: '🐰', color: '#fce7f3', border: '#ec4899' },
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'rabbit', label: 'Conejo', icon: '🐰', color: '#fce7f3', border: '#ec4899' }
                ],
                correct: { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                options: [
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'rabbit', label: 'Conejo', icon: '🐰', color: '#fce7f3', border: '#ec4899' }
                ],
                repeatSize: 3
              },
              // 4. 🚗 ✈️ 🚀 🚗 ✈️ 🚀 ? -> 🚗
              {
                seq: [
                  { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'plane', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                  { id: 'rocket', label: 'Cohete', icon: '🚀', color: '#fee2e2', border: '#ef4444' },
                  { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'plane', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                  { id: 'rocket', label: 'Cohete', icon: '🚀', color: '#fee2e2', border: '#ef4444' }
                ],
                correct: { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                options: [
                  { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'plane', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                  { id: 'rocket', label: 'Cohete', icon: '🚀', color: '#fee2e2', border: '#ef4444' }
                ],
                repeatSize: 3
              }
            ],
            hints: [
              '💡 Identificá el bloque de 3 figuras que se repite.',
              '💡 El ciclo vuelve a empezar con la primera figura del bloque.',
              '💡 Mirá el inicio de la fila.'
            ]
          },

          // 2. ACTIVIDAD 2 — ¿QUÉ FALTA?
          {
            id: 'g3_pat_complete',
            type: 'pattern_complete_middle',
            title: '🔍 Actividad 2: ¿Qué Falta en la Secuencia?',
            instruction: 'La figura que falta puede estar al inicio, al medio o al final. ¡Elegila!',
            challenges: [
              // 1. [❓] 🔵 🟢 🔴 🔵 🟢 -> 🔴 (al inicio)
              {
                seq: [
                  null,
                  { id: 'blue', label: 'Azul', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'green', label: 'Verde', icon: '🟢', color: '#dcfce7', border: '#22c55e' },
                  { id: 'red', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'blue', label: 'Azul', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'green', label: 'Verde', icon: '🟢', color: '#dcfce7', border: '#22c55e' }
                ],
                correct: { id: 'red', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                options: [
                  { id: 'red', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'blue', label: 'Azul', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'yellow', label: 'Amarillo', icon: '🟡', color: '#fef9c3', border: '#eab308' }
                ],
                repeatSize: 3
              },
              // 2. 🐶 🐱 🐰 🐶 [❓] 🐰 -> 🐱 (en el medio)
              {
                seq: [
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'rabbit', label: 'Conejo', icon: '🐰', color: '#fce7f3', border: '#ec4899' },
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  null,
                  { id: 'rabbit', label: 'Conejo', icon: '🐰', color: '#fce7f3', border: '#ec4899' }
                ],
                correct: { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                options: [
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'panda', label: 'Oso', icon: '🐼', color: '#f1f5f9', border: '#475569' }
                ],
                repeatSize: 3
              },
              // 3. 🚗 ✈️ [❓] 🚗 ✈️ 🚀 -> 🚀 (en el medio)
              {
                seq: [
                  { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'plane', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                  null,
                  { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'plane', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                  { id: 'rocket', label: 'Cohete', icon: '🚀', color: '#fee2e2', border: '#ef4444' }
                ],
                correct: { id: 'rocket', label: 'Cohete', icon: '🚀', color: '#fee2e2', border: '#ef4444' },
                options: [
                  { id: 'rocket', label: 'Cohete', icon: '🚀', color: '#fee2e2', border: '#ef4444' },
                  { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'plane', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' }
                ],
                repeatSize: 3
              }
            ],
            hints: [
              '💡 Fijate en el bloque completo que aparece sin huecos.',
              '💡 En el primer desafío, mirá cómo empieza el segundo bloque (Rojo).',
              '💡 La figura faltante debe mantener el ciclo intacto.'
            ]
          },

          // 3. ACTIVIDAD 3 — DESCUBRÍ LA REGLA
          {
            id: 'g3_pat_rule',
            type: 'pattern_discover_rule',
            title: '⭐ Actividad 3: Descubrí la Regla del Patrón',
            instruction: 'Observá la repetición y descubrí cuál es la regla que la describe:',
            challenges: [
              // 1. 🔴 🔵 🔵 🔴 🔵 🔵
              {
                seq: [
                  { id: 'r1', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'b1', label: 'Azul', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'b2', label: 'Azul', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'r2', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'b3', label: 'Azul', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'b4', label: 'Azul', icon: '🔵', color: '#dbeafe', border: '#3b82f6' }
                ],
                question: '¿QUÉ SE REPITE?',
                options: [
                  { id: 'r1', text: 'Un rojo y un azul', isCorrect: false },
                  { id: 'r2', text: 'Un rojo y dos azules', isCorrect: true, badge: '🔴 🔵 🔵' },
                  { id: 'r3', text: 'Dos rojos y un azul', isCorrect: false }
                ]
              },
              // 2. 🐶 🐱 🐰 🐶 🐱 🐰
              {
                seq: [
                  { id: 'd1', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'c1', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'rb1', label: 'Conejo', icon: '🐰', color: '#fce7f3', border: '#ec4899' },
                  { id: 'd2', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'c2', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'rb2', label: 'Conejo', icon: '🐰', color: '#fce7f3', border: '#ec4899' }
                ],
                question: '¿QUÉ SE REPITE?',
                options: [
                  { id: 'r1', text: 'Dos perros y un conejo', isCorrect: false },
                  { id: 'r2', text: 'Un perro, un gato y un conejo', isCorrect: true, badge: '🐶 🐱 🐰' },
                  { id: 'r3', text: 'Un perro y dos conejos', isCorrect: false }
                ]
              },
              // 3. 🚗 🚗 ✈️ 🚗 🚗 ✈️
              {
                seq: [
                  { id: 'car1', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'car2', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'pl1', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                  { id: 'car3', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'car4', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'pl2', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' }
                ],
                question: '¿QUÉ SE REPITE?',
                options: [
                  { id: 'r1', text: 'Dos autos y un avión', isCorrect: true, badge: '🚗 🚗 ✈️' },
                  { id: 'r2', text: 'Un auto y dos aviones', isCorrect: false },
                  { id: 'r3', text: 'Tres autos seguidos', isCorrect: false }
                ]
              }
            ],
            hints: [
              '💡 Contá la cantidad exacta de cada figura.',
              '💡 En el primer caso hay 1 rojo seguido de 2 azules.',
              '💡 La opción correcta nombra la combinación de figuras que se repite.'
            ]
          },

          // 4. ACTIVIDAD 4 — ENCONTRÁ EL ERROR
          {
            id: 'g3_pat_find_error',
            type: 'pattern_find_error',
            title: '👀 Actividad 4: Detectá la Figura Incorrecta',
            instruction: 'Una figura rompe la regla de la secuencia. ¡Tocá el intruso!',
            challenges: [
              // 1. 🔴 🔵 🟢 🔴 [🟡(error)] 🟢
              {
                seq: [
                  { id: 'r1', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'b1', label: 'Azul', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'g1', label: 'Verde', icon: '🟢', color: '#dcfce7', border: '#22c55e' },
                  { id: 'r2', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'err1', label: 'Amarillo', icon: '🟡', color: '#fee2e2', border: '#ef4444', isError: true, expected: { icon: '🔵', label: 'Azul' } },
                  { id: 'g2', label: 'Verde', icon: '🟢', color: '#dcfce7', border: '#22c55e' }
                ],
                ruleDesc: 'El patrón es Rojo ➡️ Azul ➡️ Verde. En el casillero 5 debería haber un Azul 🔵.'
              },
              // 2. 🚗 ✈️ 🚀 🚗 [🚲(error)] 🚀
              {
                seq: [
                  { id: 'c1', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'p1', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                  { id: 'r1', label: 'Cohete', icon: '🚀', color: '#fee2e2', border: '#ef4444' },
                  { id: 'c2', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'err2', label: 'Bici', icon: '🚲', color: '#fee2e2', border: '#ef4444', isError: true, expected: { icon: '✈️', label: 'Avión' } },
                  { id: 'r2', label: 'Cohete', icon: '🚀', color: '#fee2e2', border: '#ef4444' }
                ],
                ruleDesc: 'El patrón es Auto ➡️ Avión ➡️ Cohete. En el casillero 5 debería haber un Avión ✈️.'
              }
            ],
            hints: [
              '💡 Compará la figura del segundo grupo con la del primer grupo.',
              '💡 El amarillo no pertenece al patrón rojo-azul-verde.',
              '💡 Tocá el intruso para corregir la secuencia.'
            ]
          },

          // 5. ACTIVIDAD 5 — CREÁ UN PATRÓN
          {
            id: 'g3_pat_create',
            type: 'pattern_creative_builder',
            title: '🎨 Actividad 5: Creá tu Propio Patrón',
            instruction: 'Selecciona las imágenes para armar un patrón repetido (por ejemplo: 🐶 🐱 🐰 🐶 🐱 🐰):',
            themes: [
              {
                id: 'animals',
                name: '🐶 Animales',
                items: [
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'rabbit', label: 'Conejo', icon: '🐰', color: '#fce7f3', border: '#ec4899' },
                  { id: 'fox', label: 'Zorro', icon: '🦊', color: '#ffedd5', border: '#ea580c' }
                ]
              },
              {
                id: 'space',
                name: '🚀 Espacio',
                items: [
                  { id: 'sun', label: 'Sol', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'moon', label: 'Luna', icon: '🌙', color: '#e0e7ff', border: '#6366f1' },
                  { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'rocket', label: 'Cohete', icon: '🚀', color: '#fee2e2', border: '#ef4444' }
                ]
              }
            ],
            hints: [
              '💡 Elegí tres figuras y repetilas dos veces: A B C A B C.',
              '💡 O elegí dos figuras y alterná: A B A B A B.',
              '💡 Presioná el botón verde para que el sistema valide tu ritmo.'
            ]
          },

          // 6. DESAFÍO FINAL — PATRONES Y LÓGICA
          {
            id: 'g3_pat_final',
            type: 'pattern_final_challenge',
            title: '🏆 Desafío Final: Experto en Reglas y Patrones',
            instruction: '¡Superá los 5 niveles progresivos para obtener la medalla de 3.º Grado!',
            levels: [
              // Nivel 1: 🔴 🔵 🟢 🔴 🔵 🟢 ❓
              {
                title: 'NIVEL 1: TRES COLORES',
                seq: [
                  { id: 'red', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'blue', label: 'Azul', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'green', label: 'Verde', icon: '🟢', color: '#dcfce7', border: '#22c55e' },
                  { id: 'red', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'blue', label: 'Azul', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'green', label: 'Verde', icon: '🟢', color: '#dcfce7', border: '#22c55e' }
                ],
                correct: { id: 'red', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                options: [
                  { id: 'red', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'blue', label: 'Azul', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'yellow', label: 'Amarillo', icon: '🟡', color: '#fef9c3', border: '#eab308' }
                ]
              },
              // Nivel 2: 🚗 ✈️ 🚀 🚗 ✈️ 🚀 ❓
              {
                title: 'NIVEL 2: TRANSPORTES',
                seq: [
                  { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'plane', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                  { id: 'rocket', label: 'Cohete', icon: '🚀', color: '#fee2e2', border: '#ef4444' },
                  { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'plane', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                  { id: 'rocket', label: 'Cohete', icon: '🚀', color: '#fee2e2', border: '#ef4444' }
                ],
                correct: { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                options: [
                  { id: 'car', label: 'Auto', icon: '🚗', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'plane', label: 'Avión', icon: '✈️', color: '#ede9fe', border: '#8b5cf6' },
                  { id: 'boat', label: 'Barco', icon: '⛵', color: '#dbeafe', border: '#2563eb' }
                ]
              },
              // Nivel 3: 🌞 🌞 🌙 ⭐ 🌞 🌞 🌙 ⭐ ❓
              {
                title: 'NIVEL 3: CUATRO ELEMENTOS',
                seq: [
                  { id: 'sun', label: 'Sol', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'sun', label: 'Sol', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'moon', label: 'Luna', icon: '🌙', color: '#e0e7ff', border: '#6366f1' },
                  { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 'sun', label: 'Sol', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'sun', label: 'Sol', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'moon', label: 'Luna', icon: '🌙', color: '#e0e7ff', border: '#6366f1' },
                  { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' }
                ],
                correct: { id: 'sun', label: 'Sol', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                options: [
                  { id: 'sun', label: 'Sol', icon: '🌞', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'moon', label: 'Luna', icon: '🌙', color: '#e0e7ff', border: '#6366f1' },
                  { id: 'star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' }
                ]
              },
              // Nivel 4: 🐶 🐱 🐰 🐶 🐱 🐰 ❓
              {
                title: 'NIVEL 4: ANIMALES',
                seq: [
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'rabbit', label: 'Conejo', icon: '🐰', color: '#fce7f3', border: '#ec4899' },
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'rabbit', label: 'Conejo', icon: '🐰', color: '#fce7f3', border: '#ec4899' }
                ],
                correct: { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                options: [
                  { id: 'dog', label: 'Perro', icon: '🐶', color: '#ffedd5', border: '#f97316' },
                  { id: 'cat', label: 'Gato', icon: '🐱', color: '#f3e8ff', border: '#a855f7' },
                  { id: 'lion', label: 'León', icon: '🦁', color: '#fef3c7', border: '#d97706' }
                ]
              },
              // Nivel 5: Completar huecos con 3 frutas: 🍎 [❓] 🍓 🍎 🍌 [❓]
              {
                title: 'NIVEL 5: CICLO COMPLETO',
                isSlotFill: true,
                template: ['apple', null, 'straw', 'apple', 'banana', null],
                expectedSlots: ['banana', 'straw'],
                pool: [
                  { id: 'banana', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  { id: 'straw', label: 'Frutilla', icon: '🍓', color: '#ffe4e6', border: '#f43f5e' },
                  { id: 'apple', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' }
                ],
                baseItems: {
                  apple: { id: 'apple', label: 'Manzana', icon: '🍎', color: '#fee2e2', border: '#ef4444' },
                  banana: { id: 'banana', label: 'Banana', icon: '🍌', color: '#fef3c7', border: '#f59e0b' },
                  straw: { id: 'straw', label: 'Frutilla', icon: '🍓', color: '#ffe4e6', border: '#f43f5e' }
                }
              }
            ],
            hints: [
              '💡 Buscá cuál figura reinicia cada bloque.',
              '💡 En secuencias largas, agrupá los elementos de a 3 o 4.',
              '💡 ¡Completá los 5 niveles para ser Detective de Reglas!'
            ]
          }
        ]
      }
    },

    // ----------------------------------------------------
    // 4.° GRADO: Detectives de Algoritmos y Patrones Numéricos
    // ----------------------------------------------------
    4: {
      number: 4,
      name: 'Detectives de Algoritmos',
      badge: '4.º Grado 🧪',
      colorClass: 'coding-g-4',
      accentColor: '#ff9800',
      description: 'Crear secuencias para resolver problemas, debugging y patrones numéricos.',
            instructions: {
        title: 'Instrucciones',
        activities: [
          // TEORÍA INICIAL — ¿QUÉ SON LAS INSTRUCCIONES Y LOS ALGORITMOS?
          {
            id: 'g4_inst_theory',
            type: 'theory',
            title: '📖 Algoritmos: Instrucciones Ordenadas para Resolver Problemas',
            intro: '¡Hola, detective del código! En programación, las instrucciones son los bloques fundamentales de un algoritmo. Un algoritmo es un conjunto ordenado y finito de pasos claros para resolver un problema o cumplir una tarea (como una receta de cocina, las reglas de un juego o un programa informático). ¡Las computadoras no adivinan: necesitan parámetros exactos!',
            quote: 'Un programa es una secuencia ordenada de instrucciones claras y precisas. Cuando una instrucción falla o está en el orden equivocado, detectamos el error (bug) y lo corregimos.',
            pillars: [
              {
                icon: '📋',
                title: '¿Qué es un Algoritmo?',
                desc: 'Un algoritmo es un conjunto ordenado de instrucciones que resuelve un problema paso a paso.'
              },
              {
                icon: '🎯',
                title: 'Precisión y Parámetros',
                desc: 'Las computadoras no adivinan. Órdenes vagas causan fallos; requieren parámetros exactos como distancia y dirección.'
              },
              {
                icon: '🔍',
                title: 'Depuración (Debugging)',
                desc: 'Cuando una instrucción falla o está fuera de lugar, produce un error (bug) que debemos identificar y corregir.'
              },
              {
                icon: '🚀',
                title: 'Planificar antes de Ejecutar',
                desc: 'El programador anticipa mentalmente el resultado de cada instrucción antes de ejecutar su programa.'
              }
            ],
            demoType: 'clarity_params_g4',
            buttonText: '¡PONGAMOS A PRUEBA LO QUE APRENDIMOS!'
          },

          // 1. ACTIVIDAD 1 — ORDENÁ LOS PASOS
          {
            id: 'g4_inst_order',
            type: 'order_steps',
            title: '🍪 Actividad 1: Algoritmo para Hornear Galletitas',
            instruction: '¡Un algoritmo de cocina requiere seguir los pasos en un orden estricto!\n1. Leé atentamente las 5 instrucciones desordenadas de la receta.\n2. Usá los botones ▲ y ▼ para mover cada paso hasta la posición correcta.\n3. Pensá qué ingredientes se mezclan primero, cuándo se cortan las formas, cuándo se colocan en la bandeja, cuándo se hornea y cuándo se deja enfriar.\n4. Hacé clic en «¡Comprobar Algoritmo!» para verificar tu solución.',
            items: [
              { id: 'bk_mix', icon: '🥣', text: 'Mezclar harina, manteca y azúcar en el bol' },
              { id: 'bk_shape', icon: '🍪', text: 'Cortar las formas de las galletitas' },
              { id: 'bk_tray', icon: '🍽️', text: 'Colocarlas en la bandeja para horno' },
              { id: 'bk_bake', icon: '🔥', text: 'Hornear a 180° durante 15 minutos' },
              { id: 'bk_cool', icon: '😋', text: 'Dejar enfriar antes de servir y comer' }
            ],
            correctOrder: ['bk_mix', 'bk_shape', 'bk_tray', 'bk_bake', 'bk_cool'],
            hints: [
              '💡 Pensá en las etapas lógicas de una receta: preparación de masa ➡️ formas ➡️ bandeja ➡️ cocción ➡️ enfriamiento.',
              '💡 No se puede hornear antes de haber cortado las formas y colocado la masa en la bandeja.',
              '💡 El orden secuencial es: mezclar masa, cortar formas, colocar en bandeja, hornear y dejar enfriar.'
            ]
          },

          // 2. ACTIVIDAD 2 — ENCONTRÁ EL ERROR (DEBUGGING)
          {
            id: 'g4_inst_debug',
            type: 'find_error',
            title: '🔍 Actividad 2: Encontrá el Error (Debugging)',
            instruction: '¡Un «bug» es un error que rompe la ejecución de un programa!\n1. Leé la secuencia de pasos paso a paso para servir un vaso de agua.\n2. Detectá qué acción absurda o fuera de lugar fue insertada en el algoritmo y bloquea la meta.\n3. Tocá la instrucción defectuosa para depurar (debuggear) el programa.',
            steps: [
              { id: 'w1', num: 1, text: 'Tomar el vaso limpio de la alacena', isError: false, icon: '🥛' },
              { id: 'w2', num: 2, text: 'Llenar el vaso con agua fresca', isError: false, icon: '💧' },
              { id: 'w3', num: 3, text: 'Guardar el vaso con llave adentro del ropero', isError: true, icon: '🔐' },
              { id: 'w4', num: 4, text: 'Beber el agua fresca del vaso', isError: false, icon: '🥤' }
            ],
            explanation: '¡Si guardás el vaso bajo llave en el ropero en el paso 3, es imposible beber de él en el paso 4!',
            hints: [
              '💡 Buscá el paso que impide cumplir el objetivo final de beber el agua fresca.',
              '💡 Guardar el vaso bajo llave en un ropero después de llenarlo bloquea el uso del vaso.',
              '💡 El paso con el error crítico es el Paso 3 («Guardar el vaso con llave»).'
            ]
          },

          // 3. ACTIVIDAD 3 — COMPLETÁ LA INSTRUCCIÓN
          {
            id: 'g4_inst_complete',
            type: 'identify_instruction',
            title: '🎯 Actividad 3: Parámetros Claros vs Órdenes Confusas',
            instruction: '¡Las computadoras necesitan órdenes precisas con parámetros numéricos claros!\n1. Leé las dos alternativas de instrucción para controlar un robot.\n2. Analizá cuál de ellas especifica distancia exacta y orientación, y cuál es ambigua.\n3. Tocá la instrucción que contiene parámetros concretos para que el robot la ejecute sin fallar.',
            options: [
              { id: 'p1', text: '«Avanzá 5 metros en línea recta hacia el norte y frená.»', isInstruction: true, icon: '🧭' },
              { id: 'p2', text: '«Caminá un poco por ahí.»', isInstruction: false, icon: '❓' }
            ],
            hints: [
              '💡 Los robots necesitan saber la distancia exacta en metros y la dirección cardinal para saber cuándo detenerse.',
              '💡 Decir «caminá un poco por ahí» es una orden ambigua que una máquina no puede calcular.',
              '💡 La instrucción correcta especifica parámetros numéricos claros (5 metros y orientación norte).'
            ]
          },

          // 4. ACTIVIDAD 4 — CREÁ UNA SECUENCIA
          {
            id: 'build_seq_g4',
            type: 'build_sequence',
            title: '🧪 Actividad 4: Creá la Secuencia del Experimento',
            instruction: '¡Construí el algoritmo paso a paso para realizar el experimento científico de ciencias!\n1. Observá las acciones disponibles en la bandeja de comandos.\n2. Seleccioná y ordená los 5 pasos indispensables: antiparras, medir probeta, agregar sal, revolver y anotar resultados.\n3. Descartá el distractor que no pertenece a un laboratorio.\n4. Presioná «Verificar Experimento» para comprobar si tu procedimiento es seguro y efectivo.',
            pool: [
              { id: 'sq1', icon: '🥽', text: 'Ponerse antiparras de seguridad', correctPos: 1 },
              { id: 'sq2', icon: '🧪', text: 'Medir el agua en la probeta graduada', correctPos: 2 },
              { id: 'sq3', icon: '🧂', text: 'Agregar dos cucharadas de sal marina', correctPos: 3 },
              { id: 'sq4', icon: '🥄', text: 'Revolver suavemente con la varilla', correctPos: 4 },
              { id: 'sq5', icon: '📝', text: 'Anotar las observaciones en el cuaderno', correctPos: 5 },
              { id: 'sq_dist', icon: '🏊', text: 'Nadar en la pileta olímpica', distractor: true }
            ],
            requiredCount: 5,
            hints: [
              '💡 Descartá el distractor de nadar en la pileta, que no tiene nada que ver con un laboratorio.',
              '💡 Las normas de seguridad de laboratorio indican que las antiparras se colocan siempre antes de manipular sustancias.',
              '💡 La secuencia de laboratorio es: antiparras, medir en probeta, sal, revolver y anotar en el cuaderno.'
            ]
          },

          // 5. ACTIVIDAD 5 — RESOLVÉ EL CAMINO
          {
            id: 'grid_byte_g4',
            type: 'grid_movement',
            title: '🤖 Actividad 5: Resolvé el Camino hacia la Bandera',
            instruction: '¡Diseñá un algoritmo de navegación en la cuadrícula para alcanzar la bandera evitando la muralla!\n1. Observá la posición inicial de Byte, los bloques de muralla de roca 🪨 y la bandera 🚩.\n2. Utilizá los controles de flechas para ingresar la secuencia de comandos.\n3. Presioná «▶️ EJECUTAR PROGRAMA» para correr tu código en tiempo real.\n4. Si encontrás un error, depuralo quitando pasos con ⌫ y volvé a probar.\n5. ¡Activá la música de 8 bits con el botón 🎵!',
            gridSize: 5,
            startPos: { x: 0, y: 0 },
            targetPos: { x: 4, y: 4 },
            targetIcon: '🚩',
            obstacles: [
              { x: 2, y: 0 },
              { x: 2, y: 1 },
              { x: 2, y: 2 },
              { x: 2, y: 3 }
            ],
            hints: [
              '💡 Mirá el muro de rocas: abajo de todo hay un pasaje despejado para cruzar hacia el otro lado.',
              '💡 Bajá por la columna izquierda hasta el final del sendero y luego avanzá hacia la derecha hacia la bandera.',
              '💡 Programá la ruta de descenso libre y luego el avance horizontal hacia la meta.'
            ]
          },

          // 6. ACTIVIDAD 6 — DETECTIVE DE ALGORITMOS
          {
            id: 'final_challenge',
            type: 'final_challenge',
            title: '📬 Actividad 6: Detective de Algoritmos - Envío Postal',
            instruction: '¡Elaborá el algoritmo logístico para enviar una encomienda postal certificada!\n1. Observá las tarjetas del banco de instrucciones.\n2. Seleccioná las 5 instrucciones indispensables y descartá los 2 distractores.\n3. Ordenalas con ▲ y ▼ en una secuencia coherente: redactar carta, colocar en sobre, estampilla, buzón y entrega.\n4. Presioná «🚀 COMPROBAR SECUENCIA» para verificar tu algoritmo.\n5. ¡Acompañá tu desafío con la música retro 🎵!',
            pool: [
              { id: 'write', icon: '✍️', text: 'Redactar el texto de la carta', isRequired: true, correctPos: 1 },
              { id: 'fold', icon: '📄', text: 'Doblar la hoja y colocarla en el sobre', isRequired: true, correctPos: 2 },
              { id: 'piano', icon: '🎹', text: 'Tocar una sonata en piano', isRequired: false, distractor: true },
              { id: 'stamp', icon: '📮', text: 'Pegar la estampilla postal en el sobre', isRequired: true, correctPos: 3 },
              { id: 'kite', icon: '🪁', text: 'Remontar un barrilete en el parque', isRequired: false, distractor: true },
              { id: 'box', icon: '📬', text: 'Depositar el sobre en el buzón oficial', isRequired: true, correctPos: 4 },
              { id: 'truck', icon: '🚚', text: 'Aguardar la entrega postal a destino', isRequired: true, correctPos: 5 }
            ],
            requiredCount: 5,
            hints: [
              '💡 Tocar piano y remontar barrilete son acciones distractoras que no forman parte del correo postal.',
              '💡 La carta se redacta antes de doblarla adentro del sobre y pegar la estampilla.',
              '💡 Secuencia: 1. Redactar ➡️ 2. Sobre ➡️ 3. Estampilla ➡️ 4. Buzón ➡️ 5. Entrega postal.'
            ]
          },

          // 7. DESAFÍO FINAL TEÓRICO: ¿CUÁNTO APRENDISTE SOBRE LAS INSTRUCCIONES?
          {
            id: 'g4_inst_quiz_final',
            type: 'theory_quiz',
            title: '🏆 Desafío Final: ¿Cuánto Aprendiste sobre las Instrucciones y Algoritmos?',
            instruction: '¡Demostrá tus conocimientos respondiendo las preguntas clave sobre algoritmos, secuencias y depuración!\n1. Leé cada pregunta con detenimiento.\n2. Elegí la respuesta que mejor define el concepto de programación.\n3. Completá las 5 preguntas para obtener tu puntaje de detective.',
            questions: [
              {
                id: 'q1',
                question: '¿Qué es una instrucción en el mundo de la programación?',
                options: [
                  { id: 'opt1', text: 'Una indicación o comando claro que le dice a la computadora o al robot qué acción realizar.', isCorrect: true },
                  { id: 'opt2', text: 'Un dibujo decorativo que se coloca en la pantalla para que el programa se vea más colorido.', isCorrect: false },
                  { id: 'opt3', text: 'Una sugerencia que la máquina puede elegir libremente si desea cumplir o ignorar.', isCorrect: false }
                ],
                explanation: 'Una instrucción es una orden precisa: le indica a la computadora o al robot la acción exacta que debe ejecutar.'
              },
              {
                id: 'q2',
                question: '¿Para qué le damos instrucciones a un personaje o a un robot como Byte?',
                options: [
                  { id: 'opt1', text: 'Para que pueda resolver un problema o completar una misión paso a paso.', isCorrect: true },
                  { id: 'opt2', text: 'Para que el robot invente acciones mágicas por su cuenta sin necesidad de programación.', isCorrect: false },
                  { id: 'opt3', text: 'Para que la computadora intente adivinar lo que estamos pensando.', isCorrect: false }
                ],
                explanation: 'Las computadoras y robots no adivinan nuestros pensamientos: necesitan instrucciones claras para cumplir sus metas.'
              },
              {
                id: 'q3',
                question: '¿Por qué es fundamental respetar el orden de las instrucciones?',
                options: [
                  { id: 'opt1', text: 'Porque cambiar el orden altera el resultado final o puede hacer que el programa falle.', isCorrect: true },
                  { id: 'opt2', text: 'Porque da lo mismo el orden; el resultado final siempre es idéntico.', isCorrect: false },
                  { id: 'opt3', text: 'Porque el orden solo es importante en programas que tienen más de 100 instrucciones.', isCorrect: false }
                ],
                explanation: 'El orden de ejecución determina el resultado: por ejemplo, no podemos "Secarnos las manos" antes de "Mojarnos las manos".'
              },
              {
                id: 'q4',
                question: 'Si a un robot le decimos: "¡Caminá un poco y agarrá eso!", ¿qué problema ocurre?',
                options: [
                  { id: 'opt1', text: 'La instrucción es confusa y ambigua: el robot no sabe cuántos pasos dar ni qué objeto agarrar.', isCorrect: true },
                  { id: 'opt2', text: 'El robot camina a la velocidad de la luz y agarra todos los objetos que encuentra.', isCorrect: false },
                  { id: 'opt3', text: 'No hay problema, porque las computadoras comprenden palabras como "un poco" o "eso".', isCorrect: false }
                ],
                explanation: 'Las instrucciones deben ser precisas y claras, especificando parámetros exactos como distancia y qué objeto manipular.'
              },
              {
                id: 'q5',
                question: 'Si Byte sigue este programa: [1. Avanzar 2 pasos] ➡️ [2. Girar a la derecha] ➡️ [3. Avanzar 1 paso], ¿qué resultado produce?',
                options: [
                  { id: 'opt1', text: 'Byte llega a una posición diferente a si primero hubiera girado y después avanzado los 2 pasos.', isCorrect: true },
                  { id: 'opt2', text: 'Byte vuelve automáticamente al inicio porque los giros borran los pasos anteriores.', isCorrect: false },
                  { id: 'opt3', text: 'El robot se apaga porque no se pueden combinar pasos rectos con giros.', isCorrect: false }
                ],
                explanation: 'Cada paso modifica el estado y posición del robot: la secuencia completa determina el resultado final alcanzado.'
              }
            ],
            hints: [
              '💡 Recordá que una instrucción indica qué acción ejecutar paso a paso.',
              '💡 Las computadoras no adivinan; necesitan instrucciones exactas y sin ambigüedades.',
              '💡 Cambiar el orden de los pasos cambia el resultado del programa.'
            ]
          },

          // 8. MISIÓN FINAL INTERACTIVA — ¡LLEGÁ A LA META! (BYTE)
          {
            id: 'g4_inst_byte_mission',
            type: 'byte_mission',
            title: '🎮 Misión Final: ¡Llegá a la Meta!',
            instruction: '¡Misión de Planificación Avanzada! Guiá a Byte a través del laberinto hasta la Central de Datos 💻.\n1. Observá la cuadrícula con múltiples curvas y tres obstáculos: roca, bloque de datos y pozo.\n2. Planificá cada giro y salto antes de agregar las instrucciones al panel.\n3. Presioná «▶️ EJECUTAR» para observar la ejecución en tiempo real y validar tu algoritmo.\n4. Si Byte se desvía, corregí los pasos y volvé a intentar.\n5. ¡Pulsá el botón 🎵 para activar la música de 8 bits y vivir una auténtica aventura retro!',
            characterName: 'Byte',
            characterIcon: '🤖',
            goalName: 'Central de Datos',
            goalIcon: '💻',
            gridCols: 7,
            gridRows: 6,
            startPos: { x: 0, y: 5 },
            targetPos: { x: 5, y: 3 },
            obstacles: [
              { x: 3, y: 3, icon: '🪨', name: 'roca gigante' },
              { x: 4, y: 1, icon: '🧱', name: 'bloque de datos' },
              { x: 6, y: 2, icon: '🕳️', name: 'pozo profundo' }
            ],
            scenery: [
              { x: 1, y: 0, icon: '🌲' }, { x: 2, y: 0, icon: '🌲' }, { x: 3, y: 0, icon: '🌲' },
              { x: 1, y: 1, icon: '🌲' }, { x: 2, y: 1, icon: '🌸' }, { x: 3, y: 1, icon: '🌲' },
              { x: 1, y: 2, icon: '🌲' }, { x: 2, y: 2, icon: '🌲' }, { x: 3, y: 2, icon: '🌲' },
              { x: 1, y: 4, icon: '🌲' }, { x: 2, y: 4, icon: '🌲' }, { x: 3, y: 4, icon: '🌲' },
              { x: 1, y: 5, icon: '🌲' }, { x: 2, y: 5, icon: '🌲' }, { x: 3, y: 5, icon: '🌲' }
            ],
            availableCommands: ['up', 'jump', 'right', 'down', 'left'],
            commandLabels: {
              up: '⬆️ Subir',
              jump: '🦘 Saltar',
              right: '➡️ Avanzar',
              down: '⬇️ Bajar',
              left: '⬅️ Retroceder'
            },
            hints: [
              '💡 Planificá el recorrido observando los tres obstáculos: roca en la fila 3, bloque en la subida y pozo en la bajada.',
              '💡 Subí dos casilleros y doblá a la derecha para saltar la roca.',
              '💡 Continuá subiendo y superá los obstáculos para conectar a Byte con la Central de Datos.'
            ]
          }
        ]
      },

      // ====================================================
      // TEMA 2: PATRONES (4.° GRADO - PATRONES NUMÉRICOS Y REGLAS)
      // ====================================================
      patterns: {
        title: 'Patrones',
        description: 'Patrones numéricos, descubrimiento de reglas aritméticas, detección de errores y patrones combinados.',
        activities: [
          // 1. ACTIVIDAD 1 — COMPLETÁ EL PATRÓN (NUMÉRICO)
          {
            id: 'g4_pat_num_fill',
            type: 'pattern_numeric_fill',
            title: '🔢 Actividad 1: Completá el Patrón Numérico',
            instruction: 'Descubrí el salto numérico y tocá el número que sigue:',
            challenges: [
              // 1. 2 - 4 - 6 - 8 - ? (10)
              {
                seq: [2, 4, 6, 8, null],
                correct: 10,
                options: [9, 10, 12, 14],
                ruleHint: 'Suma 2 en cada paso (+2).'
              },
              // 2. 5 - 10 - 15 - 20 - ? (25)
              {
                seq: [5, 10, 15, 20, null],
                correct: 25,
                options: [22, 25, 30, 35],
                ruleHint: 'Suma 5 en cada paso (+5).'
              },
              // 3. 10 - 8 - 6 - 4 - ? (2)
              {
                seq: [10, 8, 6, 4, null],
                correct: 2,
                options: [0, 1, 2, 3],
                ruleHint: 'Resta 2 en cada paso (-2).'
              },
              // 4. 1 - 3 - 5 - 7 - ? (9)
              {
                seq: [1, 3, 5, 7, null],
                correct: 9,
                options: [8, 9, 10, 11],
                ruleHint: 'Números impares: suma 2 (+2).'
              },
              // 5. 100 - 90 - 80 - 70 - ? (60)
              {
                seq: [100, 90, 80, 70, null],
                correct: 60,
                options: [50, 60, 65, 75],
                ruleHint: 'Resta 10 en cada paso (-10).'
              }
            ],
            hints: [
              '💡 Restá dos números seguidos para descubrir de cuánto en cuánto cambia.',
              '💡 Fijate si los números van subiendo (suma) o bajando (resta).',
              '💡 Aplicá esa misma regla al último número para hallar la respuesta.'
            ]
          },

          // 2. ACTIVIDAD 2 — DESCUBRÍ LA REGLA
          {
            id: 'g4_pat_rule',
            type: 'pattern_discover_rule',
            title: '🔍 Actividad 2: Descubrí la Regla Numérica',
            instruction: '¿Qué operación matemática describe lo que pasa con los números?',
            challenges: [
              // 1. 2 → 4 → 6 → 8
              {
                isNumber: true,
                numbers: [2, 4, 6, 8],
                question: '¿QUÉ PASA CON LOS NÚMEROS?',
                options: [
                  { id: 'r1', text: '+1 (suma 1)', isCorrect: false },
                  { id: 'r2', text: '+2 (suma 2)', isCorrect: true, badge: '+2' },
                  { id: 'r3', text: '-2 (resta 2)', isCorrect: false },
                  { id: 'r4', text: '+5 (suma 5)', isCorrect: false }
                ]
              },
              // 2. 20 → 15 → 10 → 5
              {
                isNumber: true,
                numbers: [20, 15, 10, 5],
                question: '¿QUÉ PASA CON LOS NÚMEROS?',
                options: [
                  { id: 'r1', text: '+5 (suma 5)', isCorrect: false },
                  { id: 'r2', text: '-5 (resta 5)', isCorrect: true, badge: '-5' },
                  { id: 'r3', text: '-2 (resta 2)', isCorrect: false },
                  { id: 'r4', text: '÷2 (divide por 2)', isCorrect: false }
                ]
              },
              // 3. 3 → 6 → 9 → 12
              {
                isNumber: true,
                numbers: [3, 6, 9, 12],
                question: '¿QUÉ PASA CON LOS NÚMEROS?',
                options: [
                  { id: 'r1', text: '+3 (suma 3)', isCorrect: true, badge: '+3' },
                  { id: 'r2', text: '+2 (suma 2)', isCorrect: false },
                  { id: 'r3', text: '×3 (multiplica por 3)', isCorrect: false },
                  { id: 'r4', text: '-3 (resta 3)', isCorrect: false }
                ]
              }
            ],
            hints: [
              '💡 Si los números aumentan, la regla es una suma (+).',
              '💡 Si los números disminuyen, la regla es una resta (-).',
              '💡 Calculá la diferencia entre dos números vecinos.'
            ]
          },

          // 3. ACTIVIDAD 3 — ENCONTRÁ EL ERROR
          {
            id: 'g4_pat_find_error',
            type: 'pattern_find_error',
            title: '🚫 Actividad 3: Encontrá el Número Incorrecto',
            instruction: 'Un número rompe el patrón de la serie. ¡Tocá el número equivocado!',
            challenges: [
              // 1. 5 - 10 - 15 - [19] - 25
              {
                isNumber: true,
                seq: [
                  { id: 'n1', label: '5', isError: false },
                  { id: 'n2', label: '10', isError: false },
                  { id: 'n3', label: '15', isError: false },
                  { id: 'n4', label: '19', isError: true, expected: { label: '20' } },
                  { id: 'n5', label: '25', isError: false }
                ],
                ruleDesc: 'La serie va de 5 en 5 (+5). En lugar de 19 debería estar el 20.'
              },
              // 2. 2 - 4 - [7] - 8 - 10
              {
                isNumber: true,
                seq: [
                  { id: 'n1', label: '2', isError: false },
                  { id: 'n2', label: '4', isError: false },
                  { id: 'n3', label: '7', isError: true, expected: { label: '6' } },
                  { id: 'n4', label: '8', isError: false },
                  { id: 'n5', label: '10', isError: false }
                ],
                ruleDesc: 'La serie va de 2 en 2 (+2). En lugar de 7 debería estar el 6.'
              },
              // 3. 30 - 25 - 20 - [16] - 10
              {
                isNumber: true,
                seq: [
                  { id: 'n1', label: '30', isError: false },
                  { id: 'n2', label: '25', isError: false },
                  { id: 'n3', label: '20', isError: false },
                  { id: 'n4', label: '16', isError: true, expected: { label: '15' } },
                  { id: 'n5', label: '10', isError: false }
                ],
                ruleDesc: 'La serie resta 5 cada vez (-5). En lugar de 16 debería estar el 15.'
              }
            ],
            hints: [
              '💡 Revisá la distancia entre cada par de números.',
              '💡 Si la serie suma 5, todos los saltos deben ser exactamente de 5.',
              '💡 Tocá el número que no respeta el salto uniforme.'
            ]
          },

          // 4. ACTIVIDAD 4 — COMPLETÁ VARIOS PASOS
          {
            id: 'g4_pat_multi_fill',
            type: 'pattern_numeric_multi',
            title: '⏩ Actividad 4: Completá Varios Pasos',
            instruction: 'Descubrí la regla y completá los números que faltan en orden:',
            challenges: [
              // 1. 3 - 6 - 9 - ? - ? - ? -> 12, 15, 18
              {
                base: [3, 6, 9],
                expected: [12, 15, 18],
                optionsPool: [10, 11, 12, 14, 15, 16, 18, 20],
                ruleDesc: 'Tabla del 3: suma 3 en cada paso (+3).'
              },
              // 2. 10 - 20 - 30 - ? - ? -> 40, 50
              {
                base: [10, 20, 30],
                expected: [40, 50],
                optionsPool: [35, 40, 45, 50, 55, 60],
                ruleDesc: 'Decenas: suma 10 en cada paso (+10).'
              },
              // 3. 4 - 8 - 12 - ? - ? -> 16, 20
              {
                base: [4, 8, 12],
                expected: [16, 20],
                optionsPool: [14, 15, 16, 18, 20, 24],
                ruleDesc: 'Tabla del 4: suma 4 en cada paso (+4).'
              }
            ],
            hints: [
              '💡 Calculá el salto con los tres primeros números.',
              '💡 Sumá ese salto para obtener el primer hueco, y luego volvé a sumarlo.',
              '💡 Tocá los números de las opciones en orden.'
            ]
          },

          // 5. ACTIVIDAD 5 — PATRONES COMBINADOS
          {
            id: 'g4_pat_combined',
            type: 'pattern_combined',
            title: '🎨 Actividad 5: Patrones Combinados (Formas y Números)',
            instruction: 'Este patrón combina un color o forma con un número. ¿Cuál sigue?',
            challenges: [
              // 1. 🔴 2 - 🔵 4 - 🔴 6 - 🔵 8 - ? -> 🔴 10
              {
                seq: [
                  { icon: '🔴', num: 2, color: '#fee2e2', border: '#ef4444' },
                  { icon: '🔵', num: 4, color: '#dbeafe', border: '#3b82f6' },
                  { icon: '🔴', num: 6, color: '#fee2e2', border: '#ef4444' },
                  { icon: '🔵', num: 8, color: '#dbeafe', border: '#3b82f6' }
                ],
                correct: { icon: '🔴', num: 10, color: '#fee2e2', border: '#ef4444' },
                options: [
                  { icon: '🔴', num: 10, color: '#fee2e2', border: '#ef4444' },
                  { icon: '🔵', num: 10, color: '#dbeafe', border: '#3b82f6' },
                  { icon: '🔴', num: 12, color: '#fee2e2', border: '#ef4444' },
                  { icon: '🔵', num: 12, color: '#dbeafe', border: '#3b82f6' }
                ],
                ruleDesc: 'Alterna Rojo/Azul y los números suman 2 (+2). El siguiente es 🔴 10.'
              },
              // 2. ⭐ 5 - ❤️ 10 - ⭐ 15 - ❤️ 20 - ? -> ⭐ 25
              {
                seq: [
                  { icon: '⭐', num: 5, color: '#fef9c3', border: '#eab308' },
                  { icon: '❤️', num: 10, color: '#ffe4e6', border: '#f43f5e' },
                  { icon: '⭐', num: 15, color: '#fef9c3', border: '#eab308' },
                  { icon: '❤️', num: 20, color: '#ffe4e6', border: '#f43f5e' }
                ],
                correct: { icon: '⭐', num: 25, color: '#fef9c3', border: '#eab308' },
                options: [
                  { icon: '⭐', num: 25, color: '#fef9c3', border: '#eab308' },
                  { icon: '❤️', num: 25, color: '#ffe4e6', border: '#f43f5e' },
                  { icon: '⭐', num: 30, color: '#fef9c3', border: '#eab308' }
                ],
                ruleDesc: 'Alterna Estrella/Corazón y los números suman 5 (+5). El siguiente es ⭐ 25.'
              }
            ],
            hints: [
              '💡 Fijate en dos cosas a la vez: la figura y el número.',
              '💡 La figura alterna (A B A B...).',
              '💡 El número sigue su propia regla de suma (+2 o +5).'
            ]
          },

          // 6. ACTIVIDAD 6 — CREÁ TU PROPIO PATRÓN
          {
            id: 'g4_pat_create',
            type: 'pattern_creative_builder',
            title: '🎨 Actividad 6: Creá tu Propio Patrón',
            instruction: 'Selecciona las figuras o números para armar una secuencia rítmica:',
            themes: [
              {
                id: 'geometric',
                name: '🔷 Figuras y Colores',
                items: [
                  { id: 'c_red', label: 'Rojo', icon: '🔴', color: '#fee2e2', border: '#ef4444' },
                  { id: 'c_blue', label: 'Azul', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'c_yellow', label: 'Amarillo', icon: '🟡', color: '#fef9c3', border: '#eab308' },
                  { id: 'c_green', label: 'Verde', icon: '🟢', color: '#dcfce7', border: '#22c55e' }
                ]
              },
              {
                id: 'space_theme',
                name: '🚀 Galaxia',
                items: [
                  { id: 's_rocket', label: 'Cohete', icon: '🚀', color: '#fee2e2', border: '#ef4444' },
                  { id: 's_planet', label: 'Planeta', icon: '🪐', color: '#ffedd5', border: '#ea580c' },
                  { id: 's_star', label: 'Estrella', icon: '⭐', color: '#fef9c3', border: '#eab308' },
                  { id: 's_alien', label: 'Alien', icon: '👾', color: '#f3e8ff', border: '#a855f7' }
                ]
              }
            ],
            hints: [
              '💡 Probá alternar dos o tres elementos en orden constante.',
              '💡 Necesitás al menos 4 figuras para que forme un patrón.',
              '💡 Presioná validar para revisar el ritmo.'
            ]
          },

          // 7. DESAFÍO FINAL — MAESTRO DE PATRONES NUMÉRICOS
          {
            id: 'g4_pat_final',
            type: 'pattern_final_challenge',
            title: '🏆 Desafío Final: Experto Numérico y Algorítmico',
            instruction: '¡Superá los 5 niveles combinados para obtener tu insignia!',
            levels: [
              // Nivel 1: Numérico simple: 4 - 8 - 12 - 16 - ? (20)
              {
                title: 'NIVEL 1: SERIE DEL 4',
                isNumber: true,
                seq: [
                  { id: 'n1', label: '4' },
                  { id: 'n2', label: '8' },
                  { id: 'n3', label: '12' },
                  { id: 'n4', label: '16' }
                ],
                correct: { id: 'n5', label: '20' },
                options: [
                  { id: 'opt1', label: '18' },
                  { id: 'n5', label: '20' },
                  { id: 'opt2', label: '22' }
                ]
              },
              // Nivel 2: Numérico descendente: 50 - 45 - 40 - 35 - ? (30)
              {
                title: 'NIVEL 2: SERIE DESCENDENTE',
                isNumber: true,
                seq: [
                  { id: 'n1', label: '50' },
                  { id: 'n2', label: '45' },
                  { id: 'n3', label: '40' },
                  { id: 'n4', label: '35' }
                ],
                correct: { id: 'n5', label: '30' },
                options: [
                  { id: 'opt1', label: '25' },
                  { id: 'n5', label: '30' },
                  { id: 'opt2', label: '32' }
                ]
              },
              // Nivel 3: Combinado: 🟢 10 - 🟡 20 - 🟢 30 - 🟡 40 - ? (🟢 50)
              {
                title: 'NIVEL 3: PATRÓN COMBINADO',
                seq: [
                  { id: 'g1', label: '10', icon: '🟢', color: '#dcfce7', border: '#22c55e' },
                  { id: 'y1', label: '20', icon: '🟡', color: '#fef9c3', border: '#eab308' },
                  { id: 'g2', label: '30', icon: '🟢', color: '#dcfce7', border: '#22c55e' },
                  { id: 'y2', label: '40', icon: '🟡', color: '#fef9c3', border: '#eab308' }
                ],
                correct: { id: 'g3', label: '50', icon: '🟢', color: '#dcfce7', border: '#22c55e' },
                options: [
                  { id: 'g3', label: '50', icon: '🟢', color: '#dcfce7', border: '#22c55e' },
                  { id: 'y3', label: '50', icon: '🟡', color: '#fef9c3', border: '#eab308' },
                  { id: 'g4', label: '60', icon: '🟢', color: '#dcfce7', border: '#22c55e' }
                ]
              },
              // Nivel 4: Regla impar: 11 - 13 - 15 - 17 - ? (19)
              {
                title: 'NIVEL 4: NÚMEROS IMPARES',
                isNumber: true,
                seq: [
                  { id: 'n1', label: '11' },
                  { id: 'n2', label: '13' },
                  { id: 'n3', label: '15' },
                  { id: 'n4', label: '17' }
                ],
                correct: { id: 'n5', label: '19' },
                options: [
                  { id: 'opt1', label: '18' },
                  { id: 'n5', label: '19' },
                  { id: 'opt2', label: '21' }
                ]
              },
              // Nivel 5: Slot fill numérico: 6 [❓] 18 24 [❓] (12 y 30)
              {
                title: 'NIVEL 5: TABLA DEL 6',
                isSlotFill: true,
                template: ['n6', null, 'n18', 'n24', null],
                expectedSlots: ['n12', 'n30'],
                pool: [
                  { id: 'n12', label: '12', icon: '🔢', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'n30', label: '30', icon: '🔢', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'n10', label: '10', icon: '🔢', color: '#fee2e2', border: '#ef4444' }
                ],
                baseItems: {
                  n6: { id: 'n6', label: '6', icon: '🔢', color: '#f1f5f9', border: '#64748b' },
                  n18: { id: 'n18', label: '18', icon: '🔢', color: '#f1f5f9', border: '#64748b' },
                  n24: { id: 'n24', label: '24', icon: '🔢', color: '#f1f5f9', border: '#64748b' }
                }
              }
            ],
            hints: [
              '💡 Identificá el salto constante en cada desafío.',
              '💡 En el nivel 5, los números avanzan sumando 6 (+6).',
              '💡 ¡Completá los 5 niveles para coronarte Detective de Patrones!'
            ]
          }
        ]
      }
    },

    // ----------------------------------------------------
    // 5.° GRADO: Maestros del Código y Reglas Computacionales
    // ----------------------------------------------------
    5: {
      number: 5,
      name: 'Maestros del Código',
      badge: '5.º Grado 🔮',
      colorClass: 'coding-g-5',
      accentColor: '#9c27b0',
      description: 'Programación estructurada, repeticiones (bucles), debugging, optimización y reglas compuestas.',
            instructions: {
        title: 'Instrucciones',
        activities: [
          // TEORÍA INICIAL — ¿QUÉ SON LAS INSTRUCCIONES EN PROGRAMACIÓN?
          {
            id: 'g5_inst_theory',
            type: 'theory',
            title: '📖 Programación Avanzada: Secuencias, Estados y Determinismo',
            intro: '¡Hola, maestro del código! Las computadoras son sistemas deterministas: ejecutan estrictamente las instrucciones programadas sin improvisar ni deducir intenciones humanas. Cada instrucción modifica variables en memoria (posición, batería, estado). Comprender la secuencia, las precondiciones, los bucles y la optimización es la base de todo software profesional.',
            quote: 'Una computadora ejecuta fielmente las instrucciones que recibe. Una orden incorrecta, ambigua o a destiempo altera el estado del sistema y produce un resultado inesperado.',
            pillars: [
              {
                icon: '⚙️',
                title: 'Determinismo Estricto',
                desc: 'Las computadoras no interpretan intenciones ni corrigen errores solas: ejecutan exactamente el código escrito.'
              },
              {
                icon: '📊',
                title: 'Estado y Precondiciones',
                desc: 'Cada instrucción altera el estado del sistema y requiere que la etapa previa sea válida (precondición).'
              },
              {
                icon: '🔄',
                title: 'Bucles y Repetición',
                desc: 'Los bucles permiten ejecutar un grupo de instrucciones varias veces sin duplicar líneas de código redundantes.'
              },
              {
                icon: '⚡',
                title: 'Lógica y Optimización',
                desc: 'Entre varios algoritmos que resuelven un problema, el mejor es el más claro, robusto y eficiente en pasos.'
              }
            ],
            demoType: 'state_tracer_g5',
            buttonText: '¡PONGAMOS A PRUEBA LO QUE APRENDIMOS!'
          },

          // 1. ACTIVIDAD 1 — LLEGÁ AL OBJETIVO
          {
            id: 'grid_byte_g5',
            type: 'grid_movement',
            title: '💻 Actividad 1: Llegá al Servidor Central',
            instruction: '¡Programá a Byte para llegar hasta el Servidor Central 💻 esquivando el firewall 🔥!\n1. Analizá el mapa de red, los puntos bloqueados por el cortafuegos y el servidor de destino.\n2. Ingresá la secuencia de comandos de movimiento con las flechas de dirección.\n3. Hacé clic en «▶️ EJECUTAR PROGRAMA» para verificar la ejecución en memoria.\n4. Si hay fallos, revisá en qué paso se desvía la ruta y depurá tu código.\n5. ¡Pulsá el botón 🎵 para activar la música de 8 bits!',
            gridSize: 5,
            startPos: { x: 0, y: 0 },
            targetPos: { x: 4, y: 3 },
            targetIcon: '💻',
            obstacles: [
              { x: 2, y: 0 },
              { x: 2, y: 1 },
              { x: 2, y: 2 },
              { x: 2, y: 4 }
            ],
            hints: [
              '💡 Mirá el cortafuegos 🔥: hay un espacio libre para pasar sin quemarse.',
              '💡 Bajá por la columna izquierda hasta el paso libre y luego avanzá hacia la derecha.',
              '💡 Planificá el recorrido de modo que Byte no toque ningún casillero con fuego.'
            ]
          },

          // 2. ACTIVIDAD 2 — ENCONTRÁ EL ERROR (DEBUGGING)
          {
            id: 'g5_inst_debug',
            type: 'find_error',
            title: '🔍 Actividad 2: Depuración de Flujo de Datos',
            instruction: '¡Detectá el error de precondición o secuencia en el flujo de ejecución!\n1. Analizá las instrucciones del programa y el estado de seguridad que generan.\n2. Encontrá la instrucción que viola la privacidad o que opera sobre un recurso sin inicializar.\n3. Seleccioná el paso defectuoso para corregir el bug.',
            steps: [
              { id: 'f1', num: 1, text: 'Seleccionar el paquete de datos en el sistema', isError: false, icon: '📁' },
              { id: 'f2', num: 2, text: 'Publicar la clave secreta en internet público', isError: true, icon: '⚠️' },
              { id: 'f3', num: 3, text: 'Cifrar los datos con el protocolo de seguridad', isError: false, icon: '🔒' },
              { id: 'f4', num: 4, text: 'Transmitir el archivo cifrado al servidor', isError: false, icon: '📡' }
            ],
            explanation: '¡Publicar la clave secreta en internet en el paso 2 destruye la seguridad del sistema!',
            hints: [
              '💡 Buscá el paso que contradice el principio fundamental de privacidad y seguridad digital.',
              '💡 Las claves secretas y contraseñas nunca deben compartirse en internet público.',
              '💡 El error crítico está en el Paso 2 («Publicar la clave secreta en internet público»).'
            ]
          },

          // 3. ACTIVIDAD 3 — REPETÍ UN PASO (BUCLES / LOOPS)
          {
            id: 'g5_inst_loops',
            type: 'loop_concept',
            title: '🔄 Actividad 3: Repetí un Paso (Bucles / Loops)',
            instruction: '¡Los bucles permiten repetir instrucciones idénticas sin escribir código duplicado!\n1. Observá la secuencia de pasos repetitivos que debe realizar Byte.\n2. Identificá qué comando se repite y cuántas veces debe iterar el bucle.\n3. Elegí la estructura de repetición óptima para simplificar el programa.',
            challenges: [
              {
                question: '¿Cómo escribirías la secuencia ➡️ ➡️ ➡️ de forma más corta y eficiente?',
                sequence: ['➡️', '➡️', '➡️'],
                options: [
                  { id: 'l1', text: '➡️ × 3', isCorrect: true, badge: 'REPETIR 3 VECES' },
                  { id: 'l2', text: '➡️ × 2', isCorrect: false },
                  { id: 'l3', text: '⬆️ × 3', isCorrect: false }
                ],
                explanation: '¡Exacto! ➡️ repetido 3 veces se escribe ➡️ × 3.'
              },
              {
                question: '¿Cómo escribirías la secuencia ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ usando un bucle?',
                sequence: ['⬇️', '⬇️', '⬇️', '⬇️', '⬇️'],
                options: [
                  { id: 'l1', text: '⬇️ × 4', isCorrect: false },
                  { id: 'l2', text: '⬇️ × 5', isCorrect: true, badge: 'REPETIR 5 VECES' },
                  { id: 'l3', text: '➡️ × 5', isCorrect: false }
                ],
                explanation: '¡Excelente! Son 5 pasos hacia abajo: ⬇️ × 5.'
              }
            ],
            hints: [
              '💡 Contá cuántas flechas idénticas consecutivas hay en la fila.',
              '💡 El símbolo de flecha indica la dirección y el número tras la «×» indica las repeticiones.',
              '💡 Por ejemplo, 3 flechas hacia la derecha se resumen de forma óptima en ➡️ × 3.'
            ]
          },

          // 4. ACTIVIDAD 4 — RESOLVÉ CON MENOS PASOS (OPTIMIZACIÓN)
          {
            id: 'g5_inst_optimize',
            type: 'optimize_steps',
            title: '⚡ Actividad 4: Resolvé con Menos Pasos (Optimización)',
            instruction: '¡Optimizar significa lograr el mismo objetivo con la menor cantidad de instrucciones y recursos!\n1. Observá las alternativas de solución para la tarea planteada.\n2. Compará la cantidad de pasos de cada programa y su claridad lógica.\n3. Elegí la solución más eficiente y directa.',
            challenges: [
              {
                problem: 'Llevar el dron desde la base hasta la antena repetidora.',
                algorithms: [
                  {
                    id: 'alg_a',
                    title: 'Algoritmo A (Con bucles)',
                    stepsCount: 4,
                    codeText: '1. ➡️ × 4\n2. ⬇️ × 3\n3. 💡 Activar antena',
                    isOptimal: true,
                    desc: 'Usa solo 3 instrucciones gracias a la repetición.'
                  },
                  {
                    id: 'alg_b',
                    title: 'Algoritmo B (Paso a paso)',
                    stepsCount: 8,
                    codeText: '1. ➡️ 2. ➡️ 3. ➡️ 4. ➡️\n5. ⬇️ 6. ⬇️ 7. ⬇️\n8. 💡 Activar antena',
                    isOptimal: false,
                    desc: 'Funciona pero usa 8 instrucciones largas.'
                  }
                ],
                explanation: '¡El Algoritmo A es óptimo porque ahorra memoria y líneas de código usando bucles!'
              }
            ],
            hints: [
              '💡 En informática, el código más limpio, conciso y directo suele ser el más eficiente.',
              '💡 Compará la cantidad de líneas e instrucciones de cada opción presentada.',
              '💡 El algoritmo óptimo comprime los pasos repetidos en bucles y ahorra memoria.'
            ]
          },

          // 5. ACTIVIDAD 5 — CREÁ TU PROPIA SECUENCIA
          {
            id: 'build_seq_g5',
            type: 'build_sequence',
            title: '🧩 Actividad 5: Planificación de Algoritmo de Laboratorio',
            instruction: '¡Diseñá un algoritmo completo con validación de precondiciones y control de procedimientos!\n1. Analizá las etapas requeridas para el proceso científico de laboratorio.\n2. Ordená las instrucciones asegurando que cada una prepare las condiciones para la siguiente: esterilizar, medir, temperatura, microscopio y bitácora.\n3. Descartá el distractor que no pertenece a un laboratorio.\n4. Presioná «Verificar Algoritmo» para validar la lógica del sistema.',
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
              '💡 Descartá la patineta, que no pertenece al entorno seguro de un laboratorio.',
              '💡 La esterilización de los instrumentos siempre es la primera precondición necesaria.',
              '💡 Secuencia: 1. Esterilizar ➡️ 2. Medir solución ➡️ 3. Temperatura ➡️ 4. Microscopio ➡️ 5. Bitácora.'
            ]
          },

          // 6. ACTIVIDAD 6 — GRAN MISIÓN ALGORÍTMICA
          {
            id: 'grid_byte_g5_final',
            type: 'grid_multi_goal',
            title: '🤖 Actividad 6: Gran Misión Algorítmica Multi-Objetivo',
            instruction: '¡Misión avanzada: recolectá todos los objetivos en orden estricto antes de cruzar la puerta!\n1. Observá el mapa con las 3 metas consecutivas: Computadora 💻 ➡️ Pendrive 💾 ➡️ Puerta 🚪.\n2. Planificá una ruta completa que visite cada punto de control en el orden indicado sin quedar atrapado.\n3. Programá los movimientos con los controles de dirección y presioná «▶️ EJECUTAR PROGRAMA».\n4. ¡Activá la música retro 🎵 para acompañar esta gran misión final!',
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
              '💡 Planificá el recorrido observando el orden estricto de las 3 metas: Computadora ➡️ Pendrive ➡️ Puerta.',
              '💡 Para llegar a la computadora: avanzá dos pasos a la derecha y uno abajo.',
              '💡 Luego bajá hacia el pendrive esquivando los obstáculos, y finalmente doblá hacia la puerta.'
            ]
          },

          // 7. DESAFÍO FINAL TEÓRICO: ¿CUÁNTO APRENDISTE SOBRE LAS INSTRUCCIONES?
          {
            id: 'g5_inst_quiz_final',
            type: 'theory_quiz',
            title: '🏆 Desafío Final: ¿Cuánto Aprendiste sobre las Instrucciones?',
            instruction: '¡Evaluá tu comprensión profunda sobre determinismo, algoritmos, loops y optimización de software!\n1. Leé cada desafío teórico con criterio de programador.\n2. Elegí la respuesta que mejor fundamenta la lógica computacional.\n3. Completá las 6 preguntas para graduarte como Maestro del Código.',
            questions: [
              {
                id: 'q1',
                question: 'En ciencias de la computación, ¿cómo procesa una computadora las instrucciones que recibe?',
                options: [
                  { id: 'opt1', text: 'Ejecuta estrictamente las instrucciones programadas, sin interpretar intenciones ni corregir errores automáticamente.', isCorrect: true },
                  { id: 'opt2', text: 'Corrige de forma automática los errores del programador cuando nota una instrucción equivocada.', isCorrect: false },
                  { id: 'opt3', text: 'Elige libremente cuáles instrucciones ejecutar y cuáles ignorar según su estado de ánimo.', isCorrect: false },
                  { id: 'opt4', text: 'Solo ejecuta instrucciones si el usuario presiona botones sin parar.', isCorrect: false }
                ],
                explanation: 'Las computadoras son deterministas: procesan fielmente las instrucciones que reciben sin deducir intenciones humanas.'
              },
              {
                id: 'q2',
                question: '¿Cuál de las siguientes instrucciones está formulada con la precisión adecuada para un algoritmo de robótica?',
                options: [
                  { id: 'opt1', text: 'Robot.avanzar(distancia: 3 metros, velocidad: 1.5 m/s);', isCorrect: true },
                  { id: 'opt2', text: 'Robot.caminar(hacia adelante bastante rápido);', isCorrect: false },
                  { id: 'opt3', text: 'Robot.ir(a donde esté el objetivo);', isCorrect: false },
                  { id: 'opt4', text: 'Robot.moverse(un ratito);', isCorrect: false }
                ],
                explanation: 'Las instrucciones en programación requieren parámetros precisos (números, medidas, direcciones) para no generar ambigüedad.'
              },
              {
                id: 'q3',
                question: 'Un robot tiene este programa: [1. Pintar la pared] ➡️ [2. Mezclar la pintura] ➡️ [3. Destapar la lata]. ¿Por qué falla este algoritmo?',
                options: [
                  { id: 'opt1', text: 'Viola las precondiciones: no se puede pintar con una lata que todavía está cerrada y sin mezclar.', isCorrect: true },
                  { id: 'opt2', text: 'Porque las computadoras no tienen permitido usar pintura.', isCorrect: false },
                  { id: 'opt3', text: 'Porque un programa nunca puede tener exactamente tres pasos.', isCorrect: false },
                  { id: 'opt4', text: 'El algoritmo no falla; el orden de los tres pasos es indistinto.', isCorrect: false }
                ],
                explanation: 'Cada instrucción exige un estado previo válido (precondición). Destapar y mezclar deben realizarse antes de aplicar la pintura.'
              },
              {
                id: 'q4',
                question: 'Observá la ejecución secuencial de este código:\n• Paso 1: Puntos = 10\n• Paso 2: Puntos = Puntos + 5\n• Paso 3: Puntos = Puntos * 2\n¿Cuál es el valor final de la variable Puntos?',
                snippet: '1. Puntos = 10\n2. Puntos = Puntos + 5\n3. Puntos = Puntos * 2',
                options: [
                  { id: 'opt1', text: '30 (Primero 10 + 5 = 15, luego 15 * 2 = 30)', isCorrect: true },
                  { id: 'opt2', text: '25 (Porque se suman 10 + 5 + 10)', isCorrect: false },
                  { id: 'opt3', text: '20 (Solo se toma la multiplicación inicial)', isCorrect: false },
                  { id: 'opt4', text: '10 (Las variables no cambian durante el programa)', isCorrect: false }
                ],
                explanation: 'En una secuencia de instrucciones, cada paso actualiza el estado en memoria: 10 pasa a 15, y luego 15 * 2 resulta en 30.'
              },
              {
                id: 'q5',
                question: 'Un dron autónomo debe despegar, tomar una foto aérea y aterrizar. Su secuencia escrita es:\n1. Despegar(altura: 10 m)\n2. Aterrizar()\n3. TomarFotografia()\n¿Qué error lógico presenta esta secuencia?',
                snippet: '1. Despegar(altura: 10 m)\n2. Aterrizar()\n3. TomarFotografia()',
                options: [
                  { id: 'opt1', text: 'La instrucción TomarFotografia está fuera de lugar: se ejecutará en el suelo tras el aterrizaje.', isCorrect: true },
                  { id: 'opt2', text: 'La instrucción Despegar tiene un error de sintaxis y los motores no encenderán.', isCorrect: false },
                  { id: 'opt3', text: 'Falta una orden para apagar la cámara antes del vuelo.', isCorrect: false },
                  { id: 'opt4', text: 'El programa no tiene error; las fotos aéreas se toman en el suelo.', isCorrect: false }
                ],
                explanation: 'La instrucción es válida en sí misma, pero está mal ubicada en la secuencia; para ser una foto aérea debía ejecutarse antes de Aterrizar.'
              },
              {
                id: 'q6',
                question: 'Si Byte necesita avanzar 5 casilleros seguidos en línea recta, ¿cuál es la mejor práctica algorítmica para programarlo?',
                options: [
                  { id: 'opt1', text: 'Usar una estructura de repetición: Repetir 5 veces { Avanzar 1 paso }', isCorrect: true },
                  { id: 'opt2', text: 'Escribir 50 instrucciones al azar esperando que el robot se detenga solo.', isCorrect: false },
                  { id: 'opt3', text: 'Crear un bucle infinito que nunca termine para que no se quede quieto.', isCorrect: false },
                  { id: 'opt4', text: 'Apagar y encender el robot 5 veces consecutivas.', isCorrect: false }
                ],
                explanation: 'Las estructuras de repetición (bucles) permiten condensar instrucciones reiteradas de forma limpia, eficiente y sin redundancia.'
              }
            ],
            hints: [
              '💡 Recordá que las computadoras son deterministas y no corrigen errores por sí solas.',
              '💡 Una precondición es el estado necesario para que una instrucción pueda ejecutarse.',
              '💡 El trazado secuencial evalúa cómo cambian las variables paso a paso en memoria.'
            ]
          },

          // 8. MISIÓN FINAL INTERACTIVA — ¡LLEGÁ A LA META! (BYTE)
          {
            id: 'g5_inst_byte_mission',
            type: 'byte_mission',
            title: '🎮 Misión Final: ¡Llegá a la Meta!',
            instruction: '¡El desafío definitivo de programación para 5.º grado!\n1. Analizá el mapa maestro con obstáculos dinámicos (roca, barrera de energía, muro) y el portal mágico 🌀.\n2. Podés usar «🔁 Repetir 3 Pasos» para avanzar 3 pasos seguidos en tramos rectos.\n3. Planificá y optimizá la secuencia lógica de instrucciones para conducir a Byte al portal.\n4. Presioná «▶️ EJECUTAR» para ver tu código en acción.\n5. ¡Disfrutá de la música de 8 bits activándola con el botón 🎵!',
            characterName: 'Byte',
            characterIcon: '🤖',
            goalName: 'Portal Mágico',
            goalIcon: '🌀',
            gridCols: 8,
            gridRows: 6,
            startPos: { x: 0, y: 0 },
            targetPos: { x: 7, y: 4 },
            obstacles: [
              { x: 3, y: 0, icon: '🪨', name: 'roca volcánica' },
              { x: 6, y: 2, icon: '⚡', name: 'barrera de energía' },
              { x: 6, y: 5, icon: '🧱', name: 'muro del portal' }
            ],
            scenery: [
              { x: 0, y: 1, icon: '🌲' }, { x: 1, y: 1, icon: '🌲' }, { x: 2, y: 1, icon: '🌲' }, { x: 3, y: 1, icon: '🌲' },
              { x: 0, y: 2, icon: '🌲' }, { x: 1, y: 2, icon: '🌸' }, { x: 2, y: 2, icon: '🍄' }, { x: 3, y: 2, icon: '🌲' },
              { x: 0, y: 3, icon: '🌲' }, { x: 1, y: 3, icon: '🌲' }, { x: 2, y: 3, icon: '🌲' }, { x: 3, y: 3, icon: '🌲' },
              { x: 0, y: 4, icon: '🌲' }, { x: 1, y: 4, icon: '🌲' }, { x: 2, y: 4, icon: '🌲' }, { x: 3, y: 4, icon: '🌲' },
              { x: 0, y: 5, icon: '🌲' }, { x: 1, y: 5, icon: '🌲' }, { x: 2, y: 5, icon: '🌲' }, { x: 3, y: 5, icon: '🌲' }
            ],
            availableCommands: ['right', 'jump', 'down', 'up', 'left', 'repeat3'],
            commandLabels: {
              right: '➡️ Avanzar a la Derecha',
              jump: '🦘 Saltar',
              down: '⬇️ Bajar',
              up: '⬆️ Subir',
              left: '⬅️ Retroceder',
              repeat3: '🔁 Repetir 3 Pasos'
            },
            hints: [
              '💡 Identificá los 3 obstáculos: roca en la fila superior, barrera de energía en la bajada y muro antes del portal.',
              '💡 Podés usar «🔁 Repetir 3 Pasos» para avanzar 3 pasos seguidos en tramos rectos sin duplicar flechas.',
              '💡 Planificá el trazado con saltos precisos para alcanzar el portal mágico de Byte.'
            ]
          }
        ]
      },

      // ====================================================
      // TEMA 2: PATRONES (5.° GRADO - REGLAS COMPUESTAS Y PENSAMIENTO COMPUTACIONAL)
      // ====================================================
      patterns: {
        title: 'Patrones',
        description: 'Multiplicaciones, secuencias compuestas, alternancia de dos reglas y generalización algorítmica.',
        activities: [
          // 1. ACTIVIDAD 1 — DESCUBRÍ LA REGLA
          {
            id: 'g5_pat_rule',
            type: 'pattern_discover_rule',
            title: '🔍 Actividad 1: Descubrí la Regla Aritmética',
            instruction: '¿Qué regla matemática genera esta secuencia numérica?',
            challenges: [
              // 1. 4 → 8 → 12 → 16: [+4]
              {
                isNumber: true,
                numbers: [4, 8, 12, 16],
                question: '¿QUÉ REGLA SIGUE ESTA SERIE?',
                options: [
                  { id: 'r1', text: '+2 (suma 2)', isCorrect: false },
                  { id: 'r2', text: '+4 (suma 4)', isCorrect: true, badge: '+4' },
                  { id: 'r3', text: '×2 (multiplica por 2)', isCorrect: false },
                  { id: 'r4', text: '-4 (resta 4)', isCorrect: false }
                ]
              },
              // 2. 2 → 4 → 8 → 16: [×2]
              {
                isNumber: true,
                numbers: [2, 4, 8, 16],
                question: '¿QUÉ REGLA SIGUE ESTA SERIE?',
                options: [
                  { id: 'r1', text: '+2 (suma 2)', isCorrect: false },
                  { id: 'r2', text: '×2 (duplica cada vez)', isCorrect: true, badge: '×2' },
                  { id: 'r3', text: '+4 (suma 4)', isCorrect: false },
                  { id: 'r4', text: '×4 (multiplica por 4)', isCorrect: false }
                ]
              },
              // 3. 3 → 9 → 27: [×3]
              {
                isNumber: true,
                numbers: [3, 9, 27],
                question: '¿QUÉ REGLA SIGUE ESTA SERIE?',
                options: [
                  { id: 'r1', text: '+6 (suma 6)', isCorrect: false },
                  { id: 'r2', text: '×3 (triplica cada vez)', isCorrect: true, badge: '×3' },
                  { id: 'r3', text: '+9 (suma 9)', isCorrect: false },
                  { id: 'r4', text: '×2 (duplica cada vez)', isCorrect: false }
                ]
              }
            ],
            hints: [
              '💡 Si el salto crece cada vez más rápido (2, 4, 8, 16), es una multiplicación (×).',
              '💡 Fijate que 2 × 2 = 4, 4 × 2 = 8, 8 × 2 = 16.',
              '💡 La regla es multiplicar por 2 en cada paso.'
            ]
          },

          // 2. ACTIVIDAD 2 — COMPLETÁ LA SECUENCIA
          {
            id: 'g5_pat_num_fill',
            type: 'pattern_numeric_fill',
            title: '🔢 Actividad 2: Completá la Secuencia',
            instruction: 'Aplica la regla de la serie y selecciona el número que continúa:',
            challenges: [
              // 1. 3 - 6 - 9 - 12 - ? (15)
              {
                seq: [3, 6, 9, 12, null],
                correct: 15,
                options: [14, 15, 16, 18],
                ruleHint: 'Suma 3 cada vez (+3).'
              },
              // 2. 20 - 17 - 14 - 11 - ? (8)
              {
                seq: [20, 17, 14, 11, null],
                correct: 8,
                options: [7, 8, 9, 10],
                ruleHint: 'Resta 3 cada vez (-3).'
              },
              // 3. 2 - 4 - 8 - 16 - ? (32)
              {
                seq: [2, 4, 8, 16, null],
                correct: 32,
                options: [24, 30, 32, 36],
                ruleHint: 'Duplica cada vez: 16 × 2 = 32.'
              },
              // 4. 80 - 40 - 20 - 10 - ? (5)
              {
                seq: [80, 40, 20, 10, null],
                correct: 5,
                options: [0, 2, 5, 8],
                ruleHint: 'Divide a la mitad cada vez (÷2): 10 ÷ 2 = 5.'
              }
            ],
            hints: [
              '💡 En series multiplicativas, multiplicá el último número por el factor.',
              '💡 16 × 2 da como resultado 32.',
              '💡 En la serie descendente, restá 3 de 11 para obtener 8.'
            ]
          },

          // 3. ACTIVIDAD 3 — ENCONTRÁ EL ERROR
          {
            id: 'g5_pat_find_error',
            type: 'pattern_find_error',
            title: '🚫 Actividad 3: Encontrá el Error en la Regla',
            instruction: 'Uno de los números viola la regla de la secuencia. ¡Tocalo!',
            challenges: [
              // 1. 2 - 4 - 8 - [14] - 32 (el 14 rompe ×2, debería ser 16)
              {
                isNumber: true,
                seq: [
                  { id: 'n1', label: '2', isError: false },
                  { id: 'n2', label: '4', isError: false },
                  { id: 'n3', label: '8', isError: false },
                  { id: 'n4', label: '14', isError: true, expected: { label: '16' } },
                  { id: 'n5', label: '32', isError: false }
                ],
                ruleDesc: 'La regla es multiplicar por 2 (×2). 8 × 2 = 16, no 14.'
              },
              // 2. 100 - 85 - 70 - [50] - 40 (el 50 rompe -15, debería ser 55)
              {
                isNumber: true,
                seq: [
                  { id: 'n1', label: '100', isError: false },
                  { id: 'n2', label: '85', isError: false },
                  { id: 'n3', label: '70', isError: false },
                  { id: 'n4', label: '50', isError: true, expected: { label: '55' } },
                  { id: 'n5', label: '40', isError: false }
                ],
                ruleDesc: 'La regla es restar 15 (-15). 70 - 15 = 55, no 50.'
              },
              // 3. 3 - 6 - 12 - [20] - 48 (el 20 rompe ×2, debería ser 24)
              {
                isNumber: true,
                seq: [
                  { id: 'n1', label: '3', isError: false },
                  { id: 'n2', label: '6', isError: false },
                  { id: 'n3', label: '12', isError: false },
                  { id: 'n4', label: '20', isError: true, expected: { label: '24' } },
                  { id: 'n5', label: '48', isError: false }
                ],
                ruleDesc: 'La regla duplica en cada paso. 12 × 2 = 24, no 20.'
              }
            ],
            hints: [
              '💡 Calculá 8 × 2 para ver si da 14.',
              '💡 Como 8 × 2 = 16, el número 14 es el bug de la serie.',
              '💡 Tocá el número que no cumple la multiplicación.'
            ]
          },

          // 4. ACTIVIDAD 4 — DOS REGLAS ALTERNADAS
          {
            id: 'g5_pat_two_rules',
            type: 'pattern_two_rules',
            title: '🔀 Actividad 4: Dos Reglas Alternadas',
            instruction: 'Esta serie alterna dos reglas distintas en cada paso. ¡Descubrí qué número sigue!',
            challenges: [
              // 1. 2 → 4 → 5 → 10 → 11 → 22 → ? (23) -> "×2, luego +1"
              {
                seq: [2, 4, 5, 10, 11, 22, null],
                rules: ['×2', '+1', '×2', '+1', '×2', '+1'],
                rule1: '×2 (multiplica por 2)',
                rule2: '+1 (suma 1)',
                correct: 23,
                options: [23, 24, 44, 33],
                explanation: 'La regla alterna: multiplica por 2, después suma 1. 22 + 1 = 23.'
              },
              // 2. 1 → 3 → 2 → 4 → 3 → 5 → ? (4) -> "+2, luego -1"
              {
                seq: [1, 3, 2, 4, 3, 5, null],
                rules: ['+2', '-1', '+2', '-1', '+2', '-1'],
                rule1: '+2 (suma 2)',
                rule2: '-1 (resta 1)',
                correct: 4,
                options: [4, 6, 7, 2],
                explanation: 'La regla alterna: suma 2, después resta 1. 5 - 1 = 4.'
              },
              // 3. 10 → 20 → 18 → 36 → 34 → ? (68) -> "×2, luego -2"
              {
                seq: [10, 20, 18, 36, 34, null],
                rules: ['×2', '-2', '×2', '-2', '×2'],
                rule1: '×2 (multiplica por 2)',
                rule2: '-2 (resta 2)',
                correct: 68,
                options: [36, 64, 68, 70],
                explanation: 'La regla alterna: multiplica por 2, después resta 2. 34 × 2 = 68.'
              }
            ],
            hints: [
              '💡 Fijate qué pasa del paso 1 al 2 (×2) y del 2 al 3 (+1).',
              '💡 Ahora corresponde aplicar la segunda regla (+1 a 22).',
              '💡 22 + 1 = 23.'
            ]
          },

          // 5. ACTIVIDAD 5 — CREÁ EL DESAFÍO
          {
            id: 'g5_pat_create_challenge',
            type: 'pattern_creative_builder',
            title: '🎨 Actividad 5: Diseñá tu Patrón Algorítmico',
            instruction: 'Selecciona las figuras o componentes para armar una estructura repetitiva compleja:',
            themes: [
              {
                id: 'logic_circuits',
                name: '🔌 Circuitos Lógicos',
                items: [
                  { id: 'gate_and', label: 'Compuerta', icon: '🔲', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'chip', label: 'Microchip', icon: '🎛️', color: '#ede9fe', border: '#8b5cf6' },
                  { id: 'signal', label: 'Señal', icon: '⚡', color: '#fef9c3', border: '#eab308' },
                  { id: 'diode', label: 'Diodo', icon: '💡', color: '#fee2e2', border: '#ef4444' }
                ]
              },
              {
                id: 'data_bits',
                name: '💾 Datos Digitales',
                items: [
                  { id: 'bit_zero', label: 'Cero 0', icon: '⚪', color: '#f1f5f9', border: '#64748b' },
                  { id: 'bit_one', label: 'Uno 1', icon: '🔵', color: '#dbeafe', border: '#3b82f6' },
                  { id: 'packet', label: 'Paquete', icon: '📦', color: '#ffedd5', border: '#ea580c' },
                  { id: 'lock', label: 'Cifrado', icon: '🔒', color: '#dcfce7', border: '#22c55e' }
                ]
              }
            ],
            hints: [
              '💡 Podés crear patrones de período 2 (A B A B) o período 3 (A B C A B C).',
              '💡 Asegurate de completar al menos 4 posiciones para que el analizador detecte el ritmo.',
              '💡 Presioná el botón de verificación para comprobar tu diseño.'
            ]
          },

          // 6. DESAFÍO FINAL — MAESTRO DE PATRONES Y ALGORITMOS
          {
            id: 'g5_pat_final',
            type: 'pattern_final_challenge',
            title: '🏆 Desafío Final: Maestro de Patrones y Algoritmos',
            instruction: '¡Superá los 5 niveles más exigentes de la plataforma para alcanzar la Insignia Maestra!',
            levels: [
              // Nivel 1: Serie multiplicativa: 3 - 6 - 12 - 24 - ? (48)
              {
                title: 'NIVEL 1: SERIE GEOMÉTRICA (×2)',
                isNumber: true,
                seq: [
                  { id: 'n1', label: '3' },
                  { id: 'n2', label: '6' },
                  { id: 'n3', label: '12' },
                  { id: 'n4', label: '24' }
                ],
                correct: { id: 'n5', label: '48' },
                options: [
                  { id: 'opt1', label: '36' },
                  { id: 'n5', label: '48' },
                  { id: 'opt2', label: '50' }
                ]
              },
              // Nivel 2: Dos reglas alternadas: 3 → 6 → 8 → 16 → 18 → ? (36) -> ×2, +2
              {
                title: 'NIVEL 2: DOS REGLAS ALTERNADAS',
                isNumber: true,
                seq: [
                  { id: 'n1', label: '3' },
                  { id: 'n2', label: '6' },
                  { id: 'n3', label: '8' },
                  { id: 'n4', label: '16' },
                  { id: 'n5', label: '18' }
                ],
                correct: { id: 'n6', label: '36' },
                options: [
                  { id: 'opt1', label: '20' },
                  { id: 'n6', label: '36' },
                  { id: 'opt2', label: '38' }
                ]
              },
              // Nivel 3: Serie triple: 2 - 6 - 18 - 54 - ? (162)
              {
                title: 'NIVEL 3: MULTIPLICACIÓN POR 3 (×3)',
                isNumber: true,
                seq: [
                  { id: 'n1', label: '2' },
                  { id: 'n2', label: '6' },
                  { id: 'n3', label: '18' },
                  { id: 'n4', label: '54' }
                ],
                correct: { id: 'n5', label: '162' },
                options: [
                  { id: 'opt1', label: '108' },
                  { id: 'n5', label: '162' },
                  { id: 'opt2', label: '150' }
                ]
              },
              // Nivel 4: Cuadrados o serie de impares: 1 - 4 - 9 - 16 - ? (25)
              {
                title: 'NIVEL 4: CUADRADOS PERFECTOS (+3, +5, +7, +9)',
                isNumber: true,
                seq: [
                  { id: 'n1', label: '1' },
                  { id: 'n2', label: '4' },
                  { id: 'n3', label: '9' },
                  { id: 'n4', label: '16' }
                ],
                correct: { id: 'n5', label: '25' },
                options: [
                  { id: 'opt1', label: '20' },
                  { id: 'n5', label: '25' },
                  { id: 'opt2', label: '30' }
                ]
              },
              // Nivel 5: Slot fill numérico con dos reglas: 1 [❓] 4 8 [❓] 20 (2 y 10)
              {
                title: 'NIVEL 5: REGLA HÍBRIDA ×2, +2',
                isSlotFill: true,
                template: ['n1', null, 'n4', 'n8', null],
                expectedSlots: ['n2', 'n10'],
                pool: [
                  { id: 'n2', label: '2', icon: '🔢', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'n10', label: '10', icon: '🔢', color: '#e0f2fe', border: '#0284c7' },
                  { id: 'n6', label: '6', icon: '🔢', color: '#fee2e2', border: '#ef4444' }
                ],
                baseItems: {
                  n1: { id: 'n1', label: '1', icon: '🔢', color: '#f1f5f9', border: '#64748b' },
                  n4: { id: 'n4', label: '4', icon: '🔢', color: '#f1f5f9', border: '#64748b' },
                  n8: { id: 'n8', label: '8', icon: '🔢', color: '#f1f5f9', border: '#64748b' }
                }
              }
            ],
            hints: [
              '💡 En el nivel 2, la regla alterna multiplicar por 2 (×2) y sumar 2 (+2).',
              '💡 En el nivel 4, cada salto suma el siguiente número impar (+3, +5, +7, +9).',
              '💡 ¡Demostrá tu maestría para completar el 100% de la plataforma!'
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

  getGradeProgress(grade, topic = 'instructions') {
    const data = this.load();
    const gData = data.grades[grade] || {};
    return gData[topic] || {
      activitiesCompleted: [],
      score: 0,
      completed: false,
      starsTotal: 0
    };
  }

  completeActivity(grade, topicOrId, activityIdOrPoints, pointsOrStars, stars) {
    let topic = 'instructions';
    let activityId = topicOrId;
    let points = activityIdOrPoints !== undefined ? activityIdOrPoints : 10;
    let starCount = pointsOrStars !== undefined ? pointsOrStars : 3;

    if (typeof activityIdOrPoints === 'string') {
      topic = topicOrId;
      activityId = activityIdOrPoints;
      points = pointsOrStars !== undefined ? pointsOrStars : 10;
      starCount = stars !== undefined ? stars : 3;
    }

    const data = this.load();
    if (!data.grades[grade]) data.grades[grade] = {};
    if (!data.grades[grade][topic]) {
      data.grades[grade][topic] = {
        activitiesCompleted: [],
        score: 0,
        completed: false,
        starsTotal: 0
      };
    }

    const topicProgress = data.grades[grade][topic];
    if (!topicProgress.activitiesCompleted.includes(activityId)) {
      topicProgress.activitiesCompleted.push(activityId);
      topicProgress.score = (topicProgress.score || 0) + points;
      topicProgress.starsTotal = (topicProgress.starsTotal || 0) + starCount;
      data.totalScore = (data.totalScore || 0) + points;
    }

    const gConfig = CODING_DATA.grades[grade];
    const totalActs = (gConfig && gConfig[topic] && gConfig[topic].activities) ? gConfig[topic].activities.length : 7;
    if (topicProgress.activitiesCompleted.length >= totalActs) {
      topicProgress.completed = true;
      const badgeId = `${topic}_master_g${grade}`;
      if (!data.badges.includes(badgeId)) {
        data.badges.push(badgeId);
      }
    }

    this.save(data);
    return topicProgress;
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

// ========================================================
// SINTETIZADOR DE MÚSICA RETRO DE 8 BITS (BYTE ADVENTURES)
// Composición original y ligera usando Web Audio API puro
// ========================================================
class ByteBgmEngine {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.timerId = null;
    this.stepIndex = 0;
    this.masterGain = null;

    // Melodía original de aventuras estilo 8-bits alegre y retro (32 pasos = 2 compases)
    this.melody = [
      659.25, 0, 783.99, 0, 880.00, 987.77, 0, 880.00,
      783.99, 0, 659.25, 0, 587.33, 659.25, 783.99, 0,
      523.25, 0, 659.25, 0, 783.99, 880.00, 0, 783.99,
      587.33, 0, 659.25, 0, 783.99, 0, 987.77, 0
    ];

    // Línea de bajo retro (onda triangular acompasada)
    this.bass = [
      164.81, 0, 164.81, 0, 196.00, 0, 220.00, 0,
      130.81, 0, 130.81, 0, 146.83, 0, 164.81, 0,
      130.81, 0, 130.81, 0, 164.81, 0, 196.00, 0,
      146.83, 0, 146.83, 0, 196.00, 0, 246.94, 0
    ];

    this.tempoMs = 135; // ~111 BPM
  }

  ensureContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  start() {
    this.stop();
    this.ensureContext();
    if (!this.audioCtx) return;

    this.isPlaying = true;
    this.stepIndex = 0;

    // Ganancia master suave para no saturar ni tapar los efectos
    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.setValueAtTime(0.065, this.audioCtx.currentTime);
    this.masterGain.connect(this.audioCtx.destination);

    this.scheduleNextStep();
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.masterGain) {
      try {
        if (this.audioCtx) {
          this.masterGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
        }
        this.masterGain.disconnect();
      } catch (e) {}
      this.masterGain = null;
    }
  }

  scheduleNextStep() {
    if (!this.isPlaying || !this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const leadFreq = this.melody[this.stepIndex];
    const bassFreq = this.bass[this.stepIndex];

    // Melodía principal: onda cuadrada clásica retro con envolvente staccato
    if (leadFreq > 0) {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(leadFreq, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.12);
    }

    // Acompañamiento de bajo: onda triangular suave
    if (bassFreq > 0) {
      const bassOsc = this.audioCtx.createOscillator();
      const bassGain = this.audioCtx.createGain();
      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(bassFreq, now);

      bassGain.gain.setValueAtTime(0.24, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      bassOsc.connect(bassGain);
      bassGain.connect(this.masterGain);

      bassOsc.start(now);
      bassOsc.stop(now + 0.13);
    }

    this.stepIndex = (this.stepIndex + 1) % this.melody.length;
    this.timerId = setTimeout(() => {
      this.scheduleNextStep();
    }, this.tempoMs);
  }
}

class CodingModuleManager {
  constructor(options = {}) {
    this.storage = new CodingProgressStorage();
    this.currentGrade = 1;
    this.currentTopic = 'instructions';
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
    this.bgmEngine = new ByteBgmEngine();
  }

  /**
   * Obtiene la lista de actividades del tema activo en el grado actual
   */
  getCurrentTopicActivities() {
    const gConfig = CODING_DATA.grades[this.currentGrade];
    if (!gConfig) return [];
    if (this.currentTopic === 'patterns' && gConfig.patterns) {
      return gConfig.patterns.activities;
    }
    return gConfig.instructions ? gConfig.instructions.activities : [];
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
    this.currentTopic = 'instructions';
    this.currentActivityIndex = 0;
    this.showCodingAppScreen();
    this.renderCurrentActivity();
  }

  /**
   * Inicia el tema "Patrones" (Exclusivo 1.° Grado)
   */
  startPatternsTopic() {
    this.cleanupCurrentActivity();
    this.currentTopic = 'patterns';
    this.currentActivityIndex = 0;
    this.showCodingAppScreen();
    this.renderCurrentActivity();
  }

  /**
   * Limpia timers, animaciones pendientes y voz activa
   */
  cleanupCurrentActivity() {
    this.stopSpeaking();
    this.stopBgm();
    if (this.gridAnimationAbort) {
      this.gridAnimationAbort.isAborted = true;
      this.gridAnimationAbort = null;
    }
    if (this.byteMissionAbortToken) {
      this.byteMissionAbortToken.isAborted = true;
      this.byteMissionAbortToken = null;
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

    const progress = this.storage.getGradeProgress(this.currentGrade, 'instructions');
    const totalActivities = gConfig.instructions.activities.length;
    const completedCount = progress.activitiesCompleted ? progress.activitiesCompleted.length : 0;
    const pct = Math.min(100, Math.round((completedCount / totalActivities) * 100));
    const isGradeOne = this.currentGrade === 1;

    if (gradeBadgeEl) {
      gradeBadgeEl.textContent = isGradeOne ? `${gConfig.badge} - ${gConfig.name}`.toUpperCase() : `${gConfig.badge} - ${gConfig.name}`;
      gradeBadgeEl.style.backgroundColor = gConfig.accentColor + '20';
      gradeBadgeEl.style.color = gConfig.accentColor;
    }

    if (scoreBadgeEl) {
      let totalGradePts = progress.score || 0;
      if (gConfig.patterns) {
        const patProg = this.storage.getGradeProgress(this.currentGrade, 'patterns');
        totalGradePts += (patProg.score || 0);
      }
      scoreBadgeEl.innerHTML = isGradeOne ? `⭐ ${totalGradePts} PTS` : `⭐ ${totalGradePts} pts`;
    }

    const sylHeaderTitle = document.querySelector('.syllabus-container h3');
    const sylHeaderDesc = document.querySelector('.syllabus-container p');
    if (sylHeaderTitle) {
      sylHeaderTitle.textContent = isGradeOne ? '📚 RUTA DE PENSAMIENTO COMPUTACIONAL' : '📚 Ruta de Pensamiento Computacional';
    }
    if (sylHeaderDesc) {
      sylHeaderDesc.textContent = isGradeOne
        ? 'SUPERA CADA TEMA PARA DESBLOQUEAR TU INSIGNIA DE PROGRAMADOR:'
        : 'Supera cada tema para desbloquear tu insignia de programador:';
    }

    const instCard = document.querySelector('.topic-card.active:not(#topic-card-patterns)');
    if (instCard) {
      const instTitle = instCard.querySelector('.topic-title');
      const instDesc = instCard.querySelector('.topic-desc');
      const instTag = instCard.querySelector('.topic-status-tag');
      const instProgLabel = instCard.querySelector('.topic-progress-label span:first-child');
      if (instTitle) instTitle.textContent = isGradeOne ? '1. INSTRUCCIONES' : '1. Instrucciones';
      if (instDesc) instDesc.textContent = isGradeOne
        ? 'DESCUBRE QUÉ ES UNA INSTRUCCIÓN, POR QUÉ DEBE SER CLARA Y ORDENADA, Y RESUELVE DESAFÍOS CON BYTE.'
        : 'Descubre qué es una instrucción, por qué debe ser clara y ordenada, y resuelve desafíos con Byte.';
      if (instTag) instTag.textContent = isGradeOne ? '🟢 DISPONIBLE' : '🟢 Disponible';
      if (instProgLabel) instProgLabel.textContent = isGradeOne ? 'INSTRUCCIONES' : 'INSTRUCCIONES';
    }

    if (progressFillEl) progressFillEl.style.width = `${pct}%`;
    if (progressTextEl) {
      progressTextEl.textContent = progress.completed ? (isGradeOne ? '🎉 ¡100% COMPLETADO!' : '🎉 ¡100% Completado!') : `${pct}%`;
    }

    if (btnStartInst) {
      if (isGradeOne) {
        btnStartInst.innerHTML = progress.completed ?
          '<span>🔄</span> ¡REPASAR INSTRUCCIONES!' :
          (completedCount > 0 ? '<span>▶️</span> ¡CONTINUAR INSTRUCCIONES!' : '<span>🚀</span> ¡COMENZAR INSTRUCCIONES!');
      } else {
        btnStartInst.innerHTML = progress.completed ?
          '<span>🔄</span> ¡Repasar Instrucciones!' :
          (completedCount > 0 ? '<span>▶️</span> ¡Continuar Instrucciones!' : '<span>🚀</span> ¡Comenzar Instrucciones!');
      }
      btnStartInst.onclick = () => {
        this.onPlaySound('pop');
        this.startInstructionsTopic();
      };
    }

    // Configuración de PATRONES para todos los grados que lo incluyan (1.° a 5.°)
    const patCard = document.getElementById('topic-card-patterns');
    const algoCard = document.getElementById('topic-card-algorithms');
    const btnStartPat = document.getElementById('btn-start-patterns-topic');
    const patBadgeEl = patCard ? patCard.querySelector('.topic-status-tag') : null;
    const patTitleEl = patCard ? patCard.querySelector('.topic-title') : null;
    const patDescEl = patCard ? patCard.querySelector('.topic-desc') : null;

    if (gConfig.patterns) {
      if (patCard) patCard.style.display = 'flex';
      if (algoCard) algoCard.style.display = 'none';

      if (patBadgeEl) {
        patBadgeEl.textContent = isGradeOne ? '🟢 ¡NUEVO! 1.º GRADO' : `🟢 ¡NUEVO! ${this.currentGrade}.º GRADO`;
      }
      if (patTitleEl) {
        patTitleEl.textContent = isGradeOne ? '2. PATRONES' : '2. Patrones';
      }
      if (patDescEl) {
        patDescEl.textContent = isGradeOne
          ? 'DESCUBRE QUÉ SE REPITE, COMPLETA SECUENCIAS DIVERTIDAS Y CREA TUS PROPIOS PATRONES CON IMÁGENES.'
          : (gConfig.patterns.description || 'Descubre reglas que se repiten, completa secuencias y resuelve desafíos lógicos.');
      }

      const patProgress = this.storage.getGradeProgress(this.currentGrade, 'patterns');
      const patTotalActivities = gConfig.patterns.activities.length;
      const patCompletedCount = patProgress.activitiesCompleted ? patProgress.activitiesCompleted.length : 0;
      const patPct = Math.min(100, Math.round((patCompletedCount / patTotalActivities) * 100));

      const patFillEl = document.getElementById('syllabus-patterns-progress');
      const patTextEl = document.getElementById('syllabus-patterns-pct');
      if (patFillEl) patFillEl.style.width = `${patPct}%`;
      if (patTextEl) {
        patTextEl.textContent = patProgress.completed ? (isGradeOne ? '🎉 ¡100% COMPLETADO!' : '🎉 ¡100% Completado!') : `${patPct}%`;
      }

      if (btnStartPat) {
        if (isGradeOne) {
          btnStartPat.innerHTML = patProgress.completed ?
            '<span>🔄</span> ¡REPASAR PATRONES!' :
            (patCompletedCount > 0 ? '<span>▶️</span> ¡CONTINUAR PATRONES!' : '<span>🚀</span> ¡COMENZAR PATRONES!');
        } else {
          btnStartPat.innerHTML = patProgress.completed ?
            '<span>🔄</span> ¡Repasar Patrones!' :
            (patCompletedCount > 0 ? '<span>▶️</span> ¡Continuar Patrones!' : '<span>🚀</span> ¡Comenzar Patrones!');
        }
        btnStartPat.onclick = () => {
          this.onPlaySound('pop');
          this.startPatternsTopic();
        };
      }
    } else {
      if (patCard) patCard.style.display = 'none';
      if (algoCard) algoCard.style.display = 'flex';
    }

    // Botón volver a selección de grados
    const btnBack = document.getElementById('btn-back-to-coding-grades');
    if (btnBack) {
      btnBack.innerHTML = isGradeOne ? '⬅️ CAMBIAR GRADO' : '⬅️ Cambiar Grado';
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
    const isGradeOne = this.currentGrade === 1;
    const isPatterns = isGradeOne || (this.currentTopic === 'patterns');
    const progress = this.storage.getGradeProgress(this.currentGrade, this.currentTopic);
    const acts = this.getCurrentTopicActivities();
    const totalActivities = acts.length;
    const completedCount = progress.activitiesCompleted ? progress.activitiesCompleted.length : 0;
    const pct = Math.min(100, Math.round((completedCount / totalActivities) * 100));

    const hudScore = document.getElementById('hud-coding-score');
    const hudFill = document.getElementById('hud-coding-progress-fill');
    const hudPct = document.getElementById('hud-coding-progress-pct');
    const hudStageBadge = document.getElementById('hud-coding-stage-badge');
    const hudProgWrap = document.querySelector('.hud-progress-wrap');
    if (hudProgWrap) {
      const labelSpan = hudProgWrap.querySelector('span:first-child');
      if (labelSpan) labelSpan.textContent = isGradeOne ? 'PROGRESO:' : 'Progreso:';
    }

    if (hudScore) hudScore.textContent = isGradeOne ? `⭐ ${progress.score || 0} PTS` : `⭐ ${progress.score || 0} pts`;
    if (hudFill) hudFill.style.width = `${pct}%`;
    if (hudPct) hudPct.textContent = `${pct}%`;

    const currentAct = acts[this.currentActivityIndex];
    if (hudStageBadge && currentAct) {
      if (isGradeOne) {
        const cleanTitle = currentAct.title.replace(/[🎯🔍👀✋🎨🏆📖👉⏩🔢🧩🌱🎒☕🪥🚦📦🗺️🧭🚫🤖🍪🧪💻🔄⚡📬]/g, '').trim().toUpperCase();
        hudStageBadge.textContent = `${this.currentActivityIndex + 1}/${totalActivities}: ${cleanTitle}`;
      } else if (isPatterns) {
        const cleanTitle = currentAct.title.replace(/[🎯🔍👀✋🎨🏆📖]/g, '').trim().toUpperCase();
        hudStageBadge.textContent = `🧩 ${this.currentActivityIndex + 1}/${totalActivities}: ${cleanTitle}`;
      } else {
        hudStageBadge.textContent = `${this.currentActivityIndex + 1}/${totalActivities}: ${currentAct.title.split(':')[0] || 'Misión'}`;
      }
    }

    const btnBackSyllabus = document.getElementById('btn-hud-back-syllabus');
    if (btnBackSyllabus) {
      btnBackSyllabus.innerHTML = isGradeOne ? '⬅️ TEMARIO' : '⬅️ Temario';
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
    const isGradeOne = this.currentGrade === 1;

    const displayText = (isGradeOne && typeof text === 'string') ? text.toUpperCase() : text;

    if (avatarEl) avatarEl.innerHTML = getByteAvatarSvg(expression);
    if (textEl) textEl.textContent = displayText;

    const nameTag = document.querySelector('.byte-name-tag');
    if (nameTag) {
      nameTag.innerHTML = isGradeOne
        ? '<span>🤖</span> ROBOT BYTE (TU COMPAÑERO DE CÓDIGO)'
        : '<span>🤖</span> Robot Byte (Tu compañero de código)';
    }

    if (btnAudio) {
      btnAudio.innerHTML = isGradeOne ? '<span>🔊</span> ESCUCHAR A BYTE' : '<span>🔊</span> Escuchar a Byte';
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

    const isGradeOne = this.currentGrade === 1;

    if (unlockedNewHint) {
      const hintNumber = this.activityState.hintsUnlocked;
      const hintText = this.activityState.hints[hintNumber - 1];
      const speech = isGradeOne
        ? `¡TE DOY UNA PISTA! 💡 PISTA ${hintNumber}`
        : `Veo que estás teniendo un poquito de dificultad. Te voy a dar una pista. 💡 Pista ${hintNumber}`;
      const aria = isGradeOne
        ? `¡TE DOY UNA PISTA! ${hintText}`
        : `Veo que estás teniendo un poquito de dificultad. Te voy a dar una pista. ${hintText}`;
      this.updateByte(speech, 'thinking', aria);
    } else {
      if (attCount % 3 === 1) {
        const defaultMsg = isGradeOne ? "¡CASI! PENSÁ UN POQUITO MÁS." : "¡Casi! Pensá un poquito más.";
        const msg = customWrongMsg ? (isGradeOne ? customWrongMsg.toUpperCase() : customWrongMsg) : defaultMsg;
        this.updateByte(msg, 'thinking');
      } else if (attCount % 3 === 2) {
        this.updateByte(isGradeOne ? "REVISÁ NUEVAMENTE EL ORDEN." : "Revisá nuevamente el orden.", 'thinking');
      } else {
        // Más de 3 pistas: se permite seguir intentando sin bloquear
        this.updateByte(isGradeOne ? "¡SEGUÍ INTENTANDO! PENSÁ CON CALMA EN CADA INSTRUCCIÓN." : "¡Seguí intentando! Pensá con calma en cada instrucción.", 'normal');
      }
    }
  }

  /**
   * Actualiza el contenedor visual de pistas e intentos
   */
  updateHintsUI() {
    const isPatterns = (this.currentGrade === 1) || (this.currentTopic === 'patterns');
    const hintsContainer = document.getElementById('activity-hints-box');
    const attemptsPill = document.getElementById('attempts-counter-pill');

    if (attemptsPill) {
      const att = this.activityState.attempts;
      const toNext = 3 - (att % 3);
      if (this.activityState.hintsUnlocked < 3) {
        attemptsPill.className = att > 0 ? 'attempts-pill warning' : 'attempts-pill';
        attemptsPill.innerHTML = isPatterns
          ? `<span>⚠️</span> INTENTOS: <strong>${att}</strong> (${toNext === 3 ? '¡PISTA LISTA!' : toNext + ' PARA PISTA'})`
          : `<span>⚠️</span> Intentos: <strong>${att}</strong> (${toNext === 3 ? '¡Pista lista!' : toNext + ' para pista'})`;
      } else {
        attemptsPill.className = 'attempts-pill warning';
        attemptsPill.innerHTML = isPatterns
          ? `<span>💡</span> PISTAS UTILIZADAS: <strong>3/3</strong> (¡SEGUÍ INTENTANDO!)`
          : `<span>💡</span> Pistas utilizadas: <strong>3/3</strong> (¡Seguí intentando!)`;
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
          <span class="hint-badge">${isPatterns ? `💡 PISTA ${i + 1}` : `💡 Pista ${i + 1}`}</span>
          <div style="flex:1; font-weight:700; ${isPatterns ? 'text-transform:uppercase;' : ''}">${hintText}</div>
          <button type="button" class="btn-byte-audio" style="margin:0; padding:2px 8px; font-size:0.8rem;" title="${isPatterns ? 'ESCUCHAR PISTA' : 'Escuchar pista'}">
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

    const isGradeOne = this.currentGrade === 1;
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
    this.storage.completeActivity(this.currentGrade, this.currentTopic, activityId, earnedPoints, stars);
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
          <strong>${isGradeOne ? '¡EXCELENTE TRABAJO! ¡ACTIVIDAD COMPLETADA!' : '¡Excelente trabajo! Actividad completada.'}</strong><br>
          <div class="stars-rating-box">${starIcons}</div>
          <span style="font-size:0.95rem; color:#15803d;">+${earnedPoints} ${isGradeOne ? 'PUNTOS' : 'puntos'} • ${this.activityState.hintsUnlocked === 0 ? (isGradeOne ? '¡SIN PISTAS UTILIZADAS!' : '¡Sin pistas utilizadas!') : this.activityState.hintsUnlocked + (isGradeOne ? ' PISTA(S) UTILIZADA(S)' : ' pista(s) utilizada(s)')}</span>
        </div>
      `;
      feedbackBox.style.display = 'flex';
    }

    if (btnNext) {
      btnNext.innerHTML = isGradeOne ? '<span>¡EXCELENTE! SIGUIENTE ACTIVIDAD</span> ➡️' : '<span>¡Excelente! Siguiente Actividad</span> ➡️';
      btnNext.style.display = 'inline-flex';
      if (typeof btnNext.scrollIntoView === 'function') {
        btnNext.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  /**
   * Renderiza la actividad activa en la pantalla
   */
  
  // ========================================================
  // CONTROL DE MÚSICA RETRO DE 8 BITS (BYTE ADVENTURES)
  // ========================================================
  initBgmEngine() {
    if (!this.bgmEngine) {
      this.bgmEngine = new ByteBgmEngine();
    }
  }

  toggleBgm() {
    this.initBgmEngine();
    if (this.bgmEngine.isPlaying) {
      this.bgmEngine.stop();
    } else {
      this.bgmEngine.start();
    }
    this.updateBgmUi();
  }

  stopBgm() {
    if (this.bgmEngine && this.bgmEngine.isPlaying) {
      this.bgmEngine.stop();
      this.updateBgmUi();
    }
  }

  getBgmToggleHtml() {
    const isPlaying = this.bgmEngine && this.bgmEngine.isPlaying;
    const isGradeOne = this.currentGrade === 1;
    const label = isGradeOne
      ? (isPlaying ? '🎵 MÚSICA: SÍ' : '🎵 MÚSICA: NO')
      : (isPlaying ? '🎵 Música: SÍ' : '🎵 Música: NO');
    return `
      <button type="button" class="btn-byte-bgm-toggle ${isPlaying ? 'is-playing' : ''}" id="btn-byte-bgm" title="${isGradeOne ? 'ACTIVAR O DESACTIVAR MÚSICA DE 8 BITS' : 'Activar o desactivar música retro de 8 bits'}">
        <span class="bgm-icon">${isPlaying ? '🔊' : '🔇'}</span>
        <span class="bgm-label">${label}</span>
      </button>
    `;
  }

  bindBgmToggle(container) {
    const btn = (container ? container.querySelector('#btn-byte-bgm') : null) || document.getElementById('btn-byte-bgm');
    if (btn) {
      btn.onclick = (e) => {
        e.stopPropagation();
        this.toggleBgm();
      };
    }
  }

  updateBgmUi() {
    const isPlaying = this.bgmEngine && this.bgmEngine.isPlaying;
    const isGradeOne = this.currentGrade === 1;
    const btns = document.querySelectorAll('.btn-byte-bgm-toggle');
    btns.forEach(btn => {
      btn.classList.toggle('is-playing', isPlaying);
      const icon = btn.querySelector('.bgm-icon');
      const label = btn.querySelector('.bgm-label');
      if (icon) icon.textContent = isPlaying ? '🔊' : '🔇';
      if (label) {
        label.textContent = isGradeOne
          ? (isPlaying ? '🎵 MÚSICA: SÍ' : '🎵 MÚSICA: NO')
          : (isPlaying ? '🎵 Música: SÍ' : '🎵 Música: NO');
      }
    });
  }

  renderCurrentActivity() {
    this.cleanupCurrentActivity();
    this.updateHud();

    const acts = this.getCurrentTopicActivities();
    const act = acts[this.currentActivityIndex];
    const container = document.getElementById('coding-stage-container');
    if (!container || !act) return;

    this.initActivityState(act.hints || []);
    container.innerHTML = '';

    switch (act.type) {
      case 'pattern_intro':
        this.renderPatternIntro(container, act);
        break;
      case 'pattern_what_next':
        this.renderPatternWhatNext(container, act);
        break;
      case 'pattern_complete_middle':
        this.renderPatternComplete(container, act);
        break;
      case 'pattern_find_which':
        this.renderPatternFind(container, act);
        break;
      case 'pattern_drag_slots':
        this.renderPatternOrder(container, act);
        break;
      case 'pattern_creative_builder':
        this.renderPatternCreate(container, act);
        break;
      case 'pattern_final_challenge':
        this.renderPatternFinalChallenge(container, act);
        break;
      case 'which_first_or_after':
        this.renderWhichFirstOrAfter(container, act);
        break;
      case 'pattern_find_error':
        this.renderPatternFindError(container, act);
        break;
      case 'pattern_discover_rule':
        this.renderPatternDiscoverRule(container, act);
        break;
      case 'pattern_numeric_fill':
        this.renderPatternNumericFill(container, act);
        break;
      case 'pattern_numeric_multi':
        this.renderPatternNumericMulti(container, act);
        break;
      case 'pattern_combined':
        this.renderPatternCombined(container, act);
        break;
      case 'pattern_two_rules':
        this.renderPatternTwoRules(container, act);
        break;
      case 'choose_path':
        this.renderChoosePath(container, act);
        break;
      case 'loop_concept':
        this.renderLoopConcept(container, act);
        break;
      case 'optimize_steps':
        this.renderOptimizeSteps(container, act);
        break;
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
      case 'theory_quiz':
        this.renderTheoryQuizChallenge(container, act);
        break;
      case 'byte_mission':
      case 'mario_mission':
        this.renderByteMission(container, act);
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
    const acts = this.getCurrentTopicActivities();
    if (this.currentActivityIndex < acts.length - 1) {
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
    const isGradeOne = this.currentGrade === 1;
    const titleText = isGradeOne ? act.title.toUpperCase() : act.title;
    const isAdventure = ['byte_mission', 'grid_movement', 'grid_multi_goal', 'seed_interactive', 'final_challenge'].includes(act.type) || !!act.map;

    let guideText = '';
    if (act.type === 'order_steps') {
      guideText = isGradeOne
        ? '💡 TOCÁ LAS FLECHAS ▲ Y ▼ PARA CAMBIAR EL ORDEN. CUANDO EL PRIMER PASO ESTÉ ARRIBA Y EL ÚLTIMO ABAJO, TOCÁ «¡COMPROBAR ORDEN!». SI ALGO ESTÁ MAL, PODÉS CORREGIRLO.'
        : '💡 Usá los botones ▲ y ▼ para mover cada tarjeta hacia arriba o hacia abajo. Cuando la secuencia esté en orden de principio a fin, presioná «¡Comprobar Orden!».';
    } else if (act.type === 'grid_movement' || act.type === 'grid_multi_goal') {
      guideText = isGradeOne
        ? '💡 TOCÁ LAS FLECHAS DE DIRECCIÓN PARA ARMAR TU PROGRAMA. USÁ ⌫ BORRAR PARA CORREGIR. LUEGO PRESIONÁ «▶️ EJECUTAR PROGRAMA» PARA VER A BYTE MOVERSE.'
        : '💡 Tocá las flechas de dirección (⬆️, ⬇️, ⬅️, ➡️) para ingresar los movimientos de Byte. Podés borrar pasos con ⌫. Cuando tu ruta esté lista, presioná «▶️ EJECUTAR PROGRAMA».';
    } else if (act.type === 'byte_mission') {
      guideText = isGradeOne
        ? '💡 TOCÁ LAS FLECHAS DE MOVIMIENTO Y SALTO PARA AGREGAR PASOS AL PANEL. PODÉS BORRAR CON ⌫. LUEGO PRESIONÁ «▶️ EJECUTAR» PARA QUE BYTE SIGA TU PROGRAMA.'
        : '💡 Agregá los comandos de movimiento y salto al panel en el orden correcto. Podés borrar o vaciar si te equivocás. Presioná «▶️ EJECUTAR» para que Byte realice el recorrido.';
    } else if (act.type === 'final_challenge') {
      guideText = isGradeOne
        ? '💡 TOCÁ UNA TARJETA DEL BANCO PARA AGREGARLA A TU SECUENCIA (O PARA QUITARLA). REORDENÁ CON ▲ Y ▼. DESCARTÁ LOS DISTRACTORES Y TOCÁ «🚀 COMPROBAR SECUENCIA».'
        : '💡 Tocá una instrucción del banco para agregarla a tu secuencia (o para devolverla). Reordená con ▲ y ▼. Descartá los distractores y presioná «🚀 COMPROBAR SECUENCIA».';
    } else if (act.type === 'seed_interactive') {
      guideText = isGradeOne
        ? '💡 TOCÁ LAS 4 INSTRUCCIONES EN EL ORDEN NATURAL: PREPARAR TIERRA ➡️ SEMILLA ➡️ TAPAR ➡️ REGAR. SI TE EQUIVOCÁS, TOCÁ «REINICIAR».'
        : '💡 Tocá las 4 instrucciones en orden: preparar tierra, colocar semilla, tapar y regar con agua. Si te equivocás, tocá «Reiniciar».';
    } else if (act.type === 'which_first_or_after') {
      guideText = isGradeOne
        ? '💡 OBSERVÁ LAS OPCIONES Y PENSÁ CUÁL ES EL PASO CORRECTO. TOCÁ LA TARJETA ELEGIDA PARA AVANZAR.'
        : '💡 Leé atentamente las opciones y elegí la acción que corresponde a la etapa indicada.';
    } else if (act.type === 'find_error') {
      guideText = isGradeOne
        ? '💡 REVISÁ LA SECUENCIA PASO A PASO. TOCÁ LA TARJETA QUE TIENE EL PASO EQUIVOCADO O QUE NO PERMITE TERMINAR LA TAREA.'
        : '💡 Analizá la secuencia paso a paso. Hacé clic sobre la instrucción que está en el momento equivocado o que traba el procedimiento.';
    } else if (act.type === 'missing_step') {
      guideText = isGradeOne
        ? '💡 MIRÁ EL HUECO CON SIGNO ❓ Y LEÉ LAS OPCIONES. TOCÁ LA INSTRUCCIÓN QUE FALTA PARA COMPLETAR EL PROCEDIMIENTO.'
        : '💡 Leé la secuencia y localizá el hueco ❓. Hacé clic sobre la instrucción que falta para que el procedimiento quede completo.';
    }

    return `
      <div class="activity-top-bar">
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
          <h3 style="font-size:1.35rem; color:#1e293b; margin:0; ${isGradeOne ? 'text-transform:uppercase;' : ''}">${titleText}</h3>
          ${isAdventure ? this.getBgmToggleHtml() : ''}
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <span id="attempts-counter-pill" class="attempts-pill"><span>🎯</span> ${isGradeOne ? 'INTENTOS: 0' : 'Intentos: 0'}</span>
          ${showReset ? `<button type="button" id="btn-reset-current-activity" class="btn-activity-reset">${isGradeOne ? '🔄 REINICIAR' : '🔄 Reiniciar'}</button>` : ''}
        </div>
      </div>
      ${guideText ? `<div class="interaction-guide-callout ${isGradeOne ? 'g1-uppercase' : ''}"><span class="guide-icon">💡</span><span>${guideText}</span></div>` : ''}
      <div id="activity-hints-box" class="activity-hints-box"></div>
    `;
  }

  createActivityFooter() {
    const isGradeOne = this.currentGrade === 1;
    return `
      <div id="activity-feedback-box" style="display:none; margin-top:14px;"></div>
      <div class="stage-actions-bar" id="activity-actions-bar">
        <button type="button" id="btn-activity-next" class="btn-stage-next" style="display:none;">
          <span>${isGradeOne ? '¡EXCELENTE! SIGUIENTE ACTIVIDAD' : '¡Excelente! Siguiente Actividad'}</span> ➡️
        </button>
      </div>
    `;
  }

  // 1. TEORÍA INTERACTIVA (1.º A 5.º GRADO)
  renderTheory(container, act) {
    const isGradeOne = this.currentGrade === 1;
    const introText = isGradeOne ? act.intro.toUpperCase() : act.intro;
    const quoteText = isGradeOne ? act.quote.toUpperCase() : act.quote;
    this.updateByte(introText, 'normal', `${introText} ${quoteText}`);

    const defaultBtn = isGradeOne ? '¡AHORA VAMOS A PRACTICAR!' : '¡Pongamos a prueba lo que aprendimos!';
    const buttonLabel = isGradeOne ? (act.buttonText || defaultBtn).toUpperCase() : (act.buttonText || defaultBtn);

    container.innerHTML = `
      <div class="theory-wrapper">
        <div style="background: #e0f2fe; border-left: 5px solid #0284c7; padding: 14px 18px; border-radius: 14px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(2, 132, 199, 0.08);">
          <strong style="color: #0369a1; font-size: 1.15rem; line-height: 1.4; display: block;">${quoteText}</strong>
        </div>

        <h4 style="font-size: 1.25rem; color: #1e293b; margin-bottom: 12px; ${isGradeOne ? 'text-transform:uppercase;' : ''}">
          🌟 ${isGradeOne ? 'CONCEPTOS FUNDAMENTALES:' : 'Conceptos Fundamentales:'}
        </h4>
        <div class="theory-cards-grid" style="${act.pillars && act.pillars.length === 4 ? 'grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));' : ''}">
          ${(act.pillars || []).map((p, idx) => `
            <div class="theory-concept-card pillar-${(idx % 3) + 1}">
              <div class="concept-icon">${p.icon}</div>
              <h5 class="concept-title" style="${isGradeOne ? 'text-transform:uppercase;' : ''}">${isGradeOne ? p.title.toUpperCase() : p.title}</h5>
              <p class="concept-desc" style="${isGradeOne ? 'text-transform:uppercase;' : ''}">${isGradeOne ? p.desc.toUpperCase() : p.desc}</p>
            </div>
          `).join('')}
        </div>

        <div id="theory-interactive-demo-area"></div>

        <div class="stage-actions-bar" style="margin-top:24px;">
          <button type="button" id="btn-next-theory" class="btn-stage-next" style="padding:14px 32px; font-size:1.15rem;">
            <span>${buttonLabel}</span> ➡️
          </button>
        </div>
      </div>
    `;

    // Renderizar demo interactiva según el grado
    const demoArea = document.getElementById('theory-interactive-demo-area');
    if (demoArea && act.demoType) {
      this.renderTheoryDemo(demoArea, act.demoType);
    }

    // Configurar mini-comprobación interactiva en la teoría
    this.setupTheoryComprehensionCheck(container);

    const btnNext = document.getElementById('btn-next-theory');
    if (btnNext) {
      btnNext.onclick = () => {
        this.onPlaySound('pop');
        this.recordActivitySuccess(act.id, 10);
        this.nextActivity();
      };
    }
  }

  /**
   * Configura la interactividad de la mini-comprobación de teoría
   */
  setupTheoryComprehensionCheck(container) {
    const isGradeOne = this.currentGrade === 1;
    const options = container.querySelectorAll('.btn-theory-check-opt');
    const feedback = container.querySelector('.theory-check-feedback');

    options.forEach(opt => {
      opt.onclick = () => {
        options.forEach(b => {
          b.classList.remove('correct', 'wrong');
        });

        const isCorrect = opt.dataset.correct === 'true';
        if (isCorrect) {
          opt.classList.add('correct');
          this.onPlaySound('coin');
          if (feedback) {
            feedback.style.display = 'block';
            feedback.style.color = '#15803d';
            feedback.innerHTML = isGradeOne
              ? '⭐ ¡EXCELENTE! COMPRENDISTE MUY BIEN EL CONCEPTO.'
              : '⭐ ¡Excelente! Comprendiste muy bien el concepto: una computadora necesita instrucciones claras para cada acción.';
          }
          this.updateByte(isGradeOne ? '¡EXCELENTE! COMPRENDISTE MUY BIEN EL CONCEPTO.' : '¡Excelente! Comprendiste muy bien el concepto.', 'happy');
        } else {
          opt.classList.add('wrong');
          this.onPlaySound('wrong');
          if (feedback) {
            feedback.style.display = 'block';
            feedback.style.color = '#b91c1c';
            feedback.innerHTML = isGradeOne
              ? '💡 ¡CASI! RECORDÁ QUE LAS MÁQUINAS NO ADIVINAN: NECESITAN INSTRUCCIONES CLARAS.'
              : '💡 ¡Casi! Recordá que las computadoras y robots no adivinan nuestros pensamientos: necesitan indicaciones paso a paso.';
          }
          this.updateByte(isGradeOne ? '¡CASI! LAS MÁQUINAS NO ADIVINAN.' : '¡Casi! Las máquinas no adivinan intenciones.', 'thinking');
        }
      };
    });
  }

  /**
   * Renderiza demostraciones interactivas dentro de la teoría según el grado
   */
  renderTheoryDemo(container, demoType) {
    const isGradeOne = this.currentGrade === 1;

    switch (demoType) {
      case 'robot_commands_g1': {
        container.innerHTML = `
          <div class="theory-simulator-box">
            <div class="theory-simulator-header">
              <span>🏠</span> ¿QUÉ NECESITA HACER BYTE PARA LLEGAR A SU CASA?
            </div>
            <div class="theory-simulator-desc">
              TOCÁ CADA INSTRUCCIÓN PARA VER CÓMO SE MUEVE BYTE POR EL CAMINO:
            </div>

            <div class="theory-mini-stage" id="mini-stage-g1">
              <div class="theory-mini-cell cell-byte-active" id="g1-cell-0" title="BYTE">🤖</div>
              <div class="theory-mini-cell" id="g1-cell-1" title="CAMINO">➡️</div>
              <div class="theory-mini-cell" id="g1-cell-2" title="PIEDRA">🪨</div>
              <div class="theory-mini-cell" id="g1-cell-3" title="ESQUINA">🔄</div>
              <div class="theory-mini-cell cell-target-active" id="g1-cell-4" title="CASA">🏠</div>
            </div>

            <div class="theory-sim-controls">
              <button type="button" class="btn-theory-sim-action" data-act="walk">
                <span>🚶</span> 1. AVANZAR POR EL CAMINO
              </button>
              <button type="button" class="btn-theory-sim-action" data-act="jump">
                <span>🦘</span> 2. SALTAR LA PIEDRA
              </button>
              <button type="button" class="btn-theory-sim-action" data-act="turn">
                <span>🔄</span> 3. GIRAR HACIA LA CASA
              </button>
              <button type="button" class="btn-theory-sim-action wrong-test" data-act="wrong_order">
                <span>💥</span> ¿QUÉ PASA SI EL ORDEN ESTÁ MAL?
              </button>
            </div>

            <div id="theory-sim-feedback-g1" class="theory-sim-feedback">
              💡 TOCÁ UN BOTÓN PARA ENVIARLE UNA INSTRUCCIÓN A BYTE.
            </div>

            <!-- Mini-Comprobación Interactiva 1.° Grado -->
            <div class="theory-check-box">
              <div class="theory-check-title">
                <span>🤔</span> ¿UNA COMPUTADORA ADIVINA LO QUE QUEREMOS O NECESITA INSTRUCCIONES?
              </div>
              <div class="theory-check-options">
                <button type="button" class="btn-theory-check-opt" data-correct="false">
                  <span>🔮</span> ADIVINA SOLA SIN QUE LE DIGAMOS NADA
                </button>
                <button type="button" class="btn-theory-check-opt" data-correct="true">
                  <span>🎯</span> NECESITA INSTRUCCIONES CLARAS PARA CADA ACCIÓN
                </button>
              </div>
              <div class="theory-check-feedback"></div>
            </div>
          </div>
        `;

        const feedback = container.querySelector('#theory-sim-feedback-g1');
        const cells = [0, 1, 2, 3, 4].map(i => container.querySelector(`#g1-cell-${i}`));

        container.querySelectorAll('.btn-theory-sim-action').forEach(btn => {
          btn.onclick = () => {
            const actType = btn.dataset.act;
            cells.forEach((c, idx) => {
              if (c) {
                c.className = 'theory-mini-cell' + (idx === 4 ? ' cell-target-active' : '');
                c.textContent = idx === 0 ? '🤖' : (idx === 1 ? '➡️' : (idx === 2 ? '🪨' : (idx === 3 ? '🔄' : '🏠')));
              }
            });

            if (actType === 'walk') {
              this.onPlaySound('pop');
              if (cells[1]) {
                cells[1].className = 'theory-mini-cell cell-byte-active';
                cells[1].textContent = '🤖';
              }
              feedback.innerHTML = '🚶 <strong>¡AVANCÉ!</strong> UNA INSTRUCCIÓN INDICA UNA ACCIÓN CONCRETA.';
              this.updateByte('¡AVANCÉ! UNA INSTRUCCIÓN ME INDICA QUÉ ACCIÓN REALIZAR.', 'happy');
            } else if (actType === 'jump') {
              this.onPlaySound('coin');
              if (cells[2]) {
                cells[2].className = 'theory-mini-cell cell-byte-active';
                cells[2].textContent = '🤖🦘';
              }
              feedback.innerHTML = '🦘 <strong>¡SALTÉ LA PIEDRA!</strong> SUPERÉ EL OBSTÁCULO CON LA INSTRUCCIÓN APROPIADA.';
              this.updateByte('¡SALTÉ! SUPERÉ EL OBSTÁCULO CON LA INSTRUCCIÓN APROPIADA.', 'happy');
            } else if (actType === 'turn') {
              this.onPlaySound('coin');
              if (cells[3]) {
                cells[3].className = 'theory-mini-cell cell-byte-active';
                cells[3].textContent = '🤖⬇️';
              }
              feedback.innerHTML = '🔄 <strong>¡GIRÉ HACIA LA CASA!</strong> CAMBIÉ DE DIRECCIÓN SIGUIENDO TU INDICACIÓN.';
              this.updateByte('¡GIRÉ! AHORA ESTOY MIRANDO HACIA LA CASA.', 'happy');
            } else if (actType === 'wrong_order') {
              this.onPlaySound('wrong');
              if (cells[1]) {
                cells[1].className = 'theory-mini-cell cell-crash';
                cells[1].textContent = '💥';
              }
              feedback.innerHTML = '💥 <strong>¡PUM! CHOCAMOS.</strong> EL ORDEN ES FUNDAMENTAL: SI GIRAMOS ANTES DE TIEMPO, NO LLEGAMOS.';
              this.updateByte('¡PUM! EL ORDEN IMPORTA: SI GIRAMOS ANTES DE TIEMPO, NO LLEGAMOS.', 'worried');
            }
          };
        });
        break;
      }

      case 'sequence_demo_g2': {
        container.innerHTML = `
          <div class="theory-simulator-box">
            <div class="theory-simulator-header">
              <span>📋</span> Secuencia de Instrucciones: Ayudar a Byte a Entrar a su Casa
            </div>
            <div class="theory-simulator-desc">
              Una secuencia organiza varias instrucciones en orden. Comprobá qué ocurre al ejecutarlas en orden lógico versus orden cambiado:
            </div>

            <div class="theory-mini-stage" id="mini-stage-g2">
              <div class="theory-mini-cell cell-byte-active" id="g2-cell-0" title="Byte">🤖</div>
              <div class="theory-mini-cell" id="g2-cell-1" title="Sendero">🚶</div>
              <div class="theory-mini-cell" id="g2-cell-2" title="Puerta Cerrada">🚪</div>
              <div class="theory-mini-cell cell-target-active" id="g2-cell-3" title="Casa">🏠</div>
            </div>

            <div class="theory-sim-controls">
              <button type="button" class="btn-theory-sim-action" data-g2="correct">
                <span>🟢</span> Probar Secuencia Lógica (Caminar ➡️ Abrir Puerta ➡️ Entrar)
              </button>
              <button type="button" class="btn-theory-sim-action wrong-test" data-g2="wrong">
                <span>🔴</span> Probar Orden Cambiado (Entrar a la Casa ➡️ Abrir Puerta)
              </button>
            </div>

            <div id="theory-sim-feedback-g2" class="theory-sim-feedback">
              💡 Elegí una de las opciones para observar la importancia del orden en la ejecución.
            </div>

            <!-- Mini-Comprobación Interactiva 2.° Grado -->
            <div class="theory-check-box">
              <div class="theory-check-title">
                <span>🤔</span> ¿Qué es una secuencia de instrucciones en programación?
              </div>
              <div class="theory-check-options">
                <button type="button" class="btn-theory-check-opt" data-correct="true">
                  <span>✅</span> Una serie de pasos organizados en orden para cumplir un objetivo determinado.
                </button>
                <button type="button" class="btn-theory-check-opt" data-correct="false">
                  <span>❌</span> Órdenes mezcladas que se ejecutan sin ningún orden fijo.
                </button>
              </div>
              <div class="theory-check-feedback"></div>
            </div>
          </div>
        `;

        const feedback = container.querySelector('#theory-sim-feedback-g2');
        const cDoor = container.querySelector('#g2-cell-2');
        const cHouse = container.querySelector('#g2-cell-3');

        container.querySelectorAll('.btn-theory-sim-action').forEach(btn => {
          btn.onclick = () => {
            const mode = btn.dataset.g2;
            if (mode === 'correct') {
              this.onPlaySound('fanfare');
              if (cDoor) { cDoor.textContent = '🔓'; cDoor.className = 'theory-mini-cell'; }
              if (cHouse) { cHouse.textContent = '🤖🏠'; cHouse.className = 'theory-mini-cell cell-byte-active'; }
              feedback.innerHTML = '🎉 <strong>¡Secuencia Exitosa!</strong> Byte caminó, abrió la puerta y entró. Cada paso preparó el estado para el siguiente.';
              this.updateByte('¡Excelente! Con las instrucciones en el orden correcto, la puerta está abierta cuando entramos.', 'happy');
            } else {
              this.onPlaySound('wrong');
              if (cDoor) { cDoor.textContent = '💥🚪'; cDoor.className = 'theory-mini-cell cell-crash'; }
              feedback.innerHTML = '💥 <strong>¡Error de Secuencia!</strong> Byte intentó entrar con la puerta cerrada... ¡Pum! El orden altera el resultado.';
              this.updateByte('¡Cuidado! Si no abrimos la puerta primero, chocamos contra ella.', 'worried');
            }
          };
        });
        break;
      }

      case 'order_matters_g3': {
        container.innerHTML = `
          <div class="theory-simulator-box">
            <div class="theory-simulator-header">
              <span>🗺️</span> Planificar Recorridos en un Mapa antes de Ejecutar
            </div>
            <div class="theory-simulator-desc">
              En los mapas de programación, Byte debe esquivar rocas y doblar en el momento exacto. Compará las tres situaciones:
            </div>

            <div class="theory-sim-controls">
              <button type="button" class="btn-theory-sim-action" data-g3="planned">
                <span>🟢</span> 1. Ruta Planificada (Avanzar ➡️ Doblar ➡️ Llegar)
              </button>
              <button type="button" class="btn-theory-sim-action wrong-test" data-g3="early_turn">
                <span>🔴</span> 2. Doblar Antes de Tiempo (¡Choque con la roca!)
              </button>
              <button type="button" class="btn-theory-sim-action" data-g3="missing">
                <span>🟡</span> 3. Falta una Instrucción (Se queda a mitad de camino)
              </button>
            </div>

            <div id="theory-sim-feedback-g3" class="theory-sim-feedback">
              💡 Hacé clic en cada situación para entender por qué la planificación previa evita errores.
            </div>

            <!-- Mini-Comprobación Interactiva 3.° Grado -->
            <div class="theory-check-box">
              <div class="theory-check-title">
                <span>🤔</span> ¿Por qué es fundamental planificar el recorrido en el mapa antes de programar?
              </div>
              <div class="theory-check-options">
                <button type="button" class="btn-theory-check-opt" data-correct="true">
                  <span>✅</span> Para anticipar las curvas y los obstáculos, asegurando que la secuencia lleve a la meta.
                </button>
                <button type="button" class="btn-theory-check-opt" data-correct="false">
                  <span>❌</span> Porque en los mapas no importa hacia dónde doble el robot.
                </button>
              </div>
              <div class="theory-check-feedback"></div>
            </div>
          </div>
        `;

        const feedback = container.querySelector('#theory-sim-feedback-g3');
        container.querySelectorAll('.btn-theory-sim-action').forEach(btn => {
          btn.onclick = () => {
            const mode = btn.dataset.g3;
            if (mode === 'planned') {
              this.onPlaySound('fanfare');
              feedback.innerHTML = '💎 <strong>¡Objetivo Cumplido!</strong> Byte avanzó por el sendero libre, dobló en la esquina y llegó directo a la gema dorada.';
              this.updateByte('¡Ruta planificada con éxito! Avanzó y dobló en el momento justo.', 'happy');
            } else if (mode === 'early_turn') {
              this.onPlaySound('wrong');
              feedback.innerHTML = '💥 <strong>¡Giro Anticipado!</strong> Byte dobló antes de tiempo y chocó contra el muro de piedra. El orden de las instrucciones es crucial.';
              this.updateByte('¡Cuidado! Doblar un paso antes produce un choque.', 'worried');
            } else if (mode === 'missing') {
              this.onPlaySound('pop');
              feedback.innerHTML = '⏳ <strong>¡Secuencia Incompleta!</strong> Faltó la última flecha: Byte se detuvo a un casillero de la meta. Faltó una instrucción.';
              this.updateByte('¡Falta un paso! Sin esa instrucción, Byte no puede completar el recorrido.', 'thinking');
            }
          };
        });
        break;
      }

      case 'clarity_params_g4': {
        container.innerHTML = `
          <div class="theory-simulator-box">
            <div class="theory-simulator-header">
              <span>🧩</span> Algoritmos: Parámetros Precisos vs Órdenes Confusas
            </div>
            <div class="theory-simulator-desc">
              Un algoritmo no deja lugar a dudas. Las máquinas necesitan parámetros exactos (distancia, dirección y objetos concretos):
            </div>

            <div class="theory-sim-controls">
              <button type="button" class="btn-theory-sim-action wrong-test" data-g4="ambiguous">
                <span>❓</span> Simular Orden Ambigua: Robot.mover(); Robot.agarrar();
              </button>
              <button type="button" class="btn-theory-sim-action" data-g4="precise">
                <span>🚀</span> Simular Orden Precisa: Robot.avanzar(pasos: 3); Robot.agarrar("llave");
              </button>
            </div>

            <div id="theory-sim-feedback-g4" class="theory-sim-feedback">
              💡 Probá ambos tipos de órdenes para ver cómo reacciona el sistema computacional.
            </div>

            <!-- Mini-Comprobación Interactiva 4.° Grado -->
            <div class="theory-check-box">
              <div class="theory-check-title">
                <span>🤔</span> ¿Qué es un algoritmo en informática?
              </div>
              <div class="theory-check-options">
                <button type="button" class="btn-theory-check-opt" data-correct="true">
                  <span>✅</span> Un conjunto ordenado y finito de instrucciones claras para resolver un problema paso a paso.
                </button>
                <button type="button" class="btn-theory-check-opt" data-correct="false">
                  <span>❌</span> Un texto largo con órdenes desordenadas sin ningún objetivo.
                </button>
              </div>
              <div class="theory-check-feedback"></div>
            </div>
          </div>
        `;

        const feedback = container.querySelector('#theory-sim-feedback-g4');
        container.querySelectorAll('.btn-theory-sim-action').forEach(btn => {
          btn.onclick = () => {
            const mode = btn.dataset.g4;
            if (mode === 'ambiguous') {
              this.onPlaySound('wrong');
              feedback.innerHTML = '❌ <strong>Error de Ambigüedad:</strong> El robot se detiene. No sabe cuántos pasos dar ni qué objeto agarrar.';
              this.updateByte("¡Error! La orden 'mover()' no especifica cuántos pasos ni hacia dónde.", 'thinking');
            } else {
              this.onPlaySound('coin');
              feedback.innerHTML = '⭐ <strong>¡Ejecución Perfecta!</strong> El robot avanzó exactamente 3 pasos y recogió la llave dorada sin vacilar.';
              this.updateByte('¡Excelente! Con parámetros exactos, el programa se ejecuta a la perfección.', 'happy');
            }
          };
        });
        break;
      }

      case 'state_tracer_g5': {
        container.innerHTML = `
          <div class="theory-simulator-box">
            <div class="theory-simulator-header">
              <span>⚙️</span> Trazador de Ejecución: Determinismo y Estado en Memoria
            </div>
            <div class="theory-simulator-desc">
              Una computadora es determinista: cada instrucción altera variables de memoria en forma predecible y estricta:
            </div>

            <div class="state-tracer-grid">
              <div class="tracer-code-column">
                <div class="tracer-title">Programa a Ejecutar:</div>
                <div class="tracer-code-list" id="tracer-code-list">
                  <div class="tracer-code-line active" data-step="0"><span class="line-num">1</span> <code>IniciarSistema()</code></div>
                  <div class="tracer-code-line" data-step="1"><span class="line-num">2</span> <code>Avanzar(distancia: 2)</code></div>
                  <div class="tracer-code-line" data-step="2"><span class="line-num">3</span> <code>ConectarServidor("central")</code></div>
                  <div class="tracer-code-line" data-step="3"><span class="line-num">4</span> <code>DescargarReporte()</code></div>
                </div>
                <button type="button" id="btn-tracer-step" class="btn-demo-run" style="margin-top:12px; width:100%; justify-content:center;">
                  <span>▶️</span> Ejecutar Siguiente Paso
                </button>
              </div>

              <div class="tracer-state-column">
                <div class="tracer-title">Estado de Variables en Memoria:</div>
                <div class="tracer-vars-box">
                  <div class="var-item"><span class="var-name">Batería:</span><span class="var-val" id="var-battery">100%</span></div>
                  <div class="var-item"><span class="var-name">Posición (X,Y):</span><span class="var-val" id="var-pos">(0, 0)</span></div>
                  <div class="var-item"><span class="var-name">Red:</span><span class="var-val" id="var-net">Desconectado</span></div>
                  <div class="var-item"><span class="var-name">Datos:</span><span class="var-val" id="var-data">0 KB</span></div>
                </div>
                <div id="tracer-step-explanation" class="tracer-expl-box">
                  Listo para iniciar. Hacé clic en "Ejecutar Siguiente Paso".
                </div>
              </div>
            </div>

            <!-- Mini-Comprobación Interactiva 5.° Grado -->
            <div class="theory-check-box" style="margin-top:16px;">
              <div class="theory-check-title">
                <span>🤔</span> ¿Por qué se dice que las computadoras son máquinas deterministas?
              </div>
              <div class="theory-check-options">
                <button type="button" class="btn-theory-check-opt" data-correct="true">
                  <span>✅</span> Porque ante las mismas instrucciones y en el mismo orden, producen siempre exactamente el mismo resultado.
                </button>
                <button type="button" class="btn-theory-check-opt" data-correct="false">
                  <span>❌</span> Porque adivinan lo que el programador quería hacer y lo corrigen solas.
                </button>
              </div>
              <div class="theory-check-feedback"></div>
            </div>
          </div>
        `;

        const codeLines = container.querySelectorAll('.tracer-code-line');
        const btnStep = document.getElementById('btn-tracer-step');
        const varBat = document.getElementById('var-battery');
        const varPos = document.getElementById('var-pos');
        const varNet = document.getElementById('var-net');
        const varData = document.getElementById('var-data');
        const explBox = document.getElementById('tracer-step-explanation');

        let stepIndex = 0;

        if (btnStep) {
          btnStep.onclick = () => {
            codeLines.forEach(l => l.classList.remove('active'));

            if (stepIndex === 0) {
              codeLines[0].classList.add('active');
              if (varBat) varBat.textContent = '98%';
              if (explBox) explBox.innerHTML = '✅ <strong>Paso 1:</strong> Se inicializaron los registros y se verificó el sistema.';
              this.onPlaySound('click');
              stepIndex++;
            } else if (stepIndex === 1) {
              codeLines[1].classList.add('active');
              if (varPos) varPos.textContent = '(2, 0)';
              if (varBat) varBat.textContent = '90%';
              if (explBox) explBox.innerHTML = '✅ <strong>Paso 2:</strong> Byte avanzó 2 posiciones hacia adelante en el entorno.';
              this.onPlaySound('click');
              stepIndex++;
            } else if (stepIndex === 2) {
              codeLines[2].classList.add('active');
              if (varNet) { varNet.textContent = 'Conectado a Central'; varNet.style.color = '#16a34a'; }
              if (varBat) varBat.textContent = '85%';
              if (explBox) explBox.innerHTML = '✅ <strong>Paso 3:</strong> Se estableció el enlace de red con el servidor.';
              this.onPlaySound('click');
              stepIndex++;
            } else if (stepIndex === 3) {
              codeLines[3].classList.add('active');
              if (varData) { varData.textContent = '256 KB'; varData.style.color = '#16a34a'; }
              if (varBat) varBat.textContent = '80%';
              if (explBox) explBox.innerHTML = '🎉 <strong>Paso 4:</strong> Descarga exitosa de paquetes completada en memoria.';
              this.onPlaySound('fanfare');
              btnStep.innerHTML = '<span>🔄</span> Reiniciar Trazador';
              stepIndex++;
            } else {
              stepIndex = 0;
              codeLines[0].classList.add('active');
              if (varBat) varBat.textContent = '100%';
              if (varPos) varPos.textContent = '(0, 0)';
              if (varNet) { varNet.textContent = 'Desconectado'; varNet.style.color = ''; }
              if (varData) { varData.textContent = '0 KB'; varData.style.color = ''; }
              if (explBox) explBox.innerHTML = 'Reiniciado. Hacé clic para ejecutar el Paso 1.';
              btnStep.innerHTML = '<span>▶️</span> Ejecutar Siguiente Paso';
              this.onPlaySound('click');
            }
          };
        }
        break;
      }
    }
  }

  /**
   * Desafío Final Teórico para 4.° y 5.° Grado
   * Preguntas conceptuales e interactivas con retroalimentación inmediata
   */
  renderTheoryQuizChallenge(container, act) {
    let qIdx = 0;
    const questions = act.questions;
    let isQuestionResolved = false;

    const drawQuizQuestion = (idx) => {
      const q = questions[idx];
      isQuestionResolved = false;
      this.updateByte(q.question, 'thinking', q.question);

      container.innerHTML = `
        <div class="theory-quiz-container">
          ${this.createActivityHeader(act)}

          <div class="quiz-progress-dots">
            ${questions.map((_, i) => `
              <div class="quiz-dot ${i === idx ? 'active' : ''} ${i < idx ? 'completed' : ''}" title="Pregunta ${i + 1}"></div>
            `).join('')}
          </div>

          <div class="quiz-question-box">
            <div style="font-size:0.9rem; font-weight:800; color:#0284c7; text-transform:uppercase; margin-bottom:6px;">
              Pregunta ${idx + 1} de ${questions.length}
            </div>
            <h4 style="font-size:1.3rem; color:#1e293b; margin:0 0 10px 0; line-height:1.35;">
              ${q.question}
            </h4>
            ${q.snippet ? `
              <div class="quiz-code-snippet">
                ${q.snippet.split('\n').map(line => `<div>${line}</div>`).join('')}
              </div>
            ` : ''}
          </div>

          <div class="quiz-options-grid" id="theory-quiz-options">
            ${q.options.map((opt, i) => `
              <button type="button" class="quiz-opt-btn" data-id="${opt.id}" data-correct="${opt.isCorrect}">
                <span class="quiz-opt-badge">${['A', 'B', 'C', 'D'][i] || '👉'}</span>
                <span style="flex:1;">${opt.text}</span>
              </button>
            `).join('')}
          </div>

          <div id="quiz-feedback-area" style="display:none; margin-top:10px;"></div>

          <div class="stage-actions-bar" id="quiz-actions-bar" style="display:none; margin-top:16px;">
            <button type="button" id="btn-next-quiz-q" class="btn-stage-next">
              <span>${idx < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultado del Desafío'}</span> ➡️
            </button>
          </div>

          ${this.createActivityFooter()}
        </div>
      `;

      const optBtns = container.querySelectorAll('.quiz-opt-btn');
      const feedbackArea = document.getElementById('quiz-feedback-area');
      const actionsBar = document.getElementById('quiz-actions-bar');
      const btnNextQ = document.getElementById('btn-next-quiz-q');

      optBtns.forEach(btn => {
        btn.onclick = () => {
          if (isQuestionResolved) return;
          const isCorrect = btn.dataset.correct === 'true';

          if (isCorrect) {
            isQuestionResolved = true;
            btn.classList.add('correct');
            optBtns.forEach(b => {
              if (b !== btn) b.disabled = true;
            });
            this.onPlaySound('coin');
            this.updateByte("¡Excelente respuesta! Comprendiste muy bien el concepto.", 'happy');

            feedbackArea.className = 'quiz-feedback-box correct';
            feedbackArea.innerHTML = `
              <span>🎉</span>
              <div>
                <strong>¡Respuesta Correcta!</strong><br>
                <span>${q.explanation}</span>
              </div>
            `;
            feedbackArea.style.display = 'flex';
            if (actionsBar) actionsBar.style.display = 'flex';
            if (btnNextQ && typeof btnNextQ.scrollIntoView === 'function') {
              btnNextQ.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          } else {
            btn.classList.add('wrong');
            btn.style.animation = 'shakePattern 0.5s ease';
            setTimeout(() => { btn.style.animation = ''; btn.classList.remove('wrong'); }, 600);
            this.onPlaySound('wrong');
            this.updateByte("¡Casi! Revisemos el concepto para elegir la opción correcta.", 'thinking');
            this.recordAttemptError("Respuesta incorrecta en el desafío conceptual.");

            feedbackArea.className = 'quiz-feedback-box wrong';
            feedbackArea.innerHTML = `
              <span>💡</span>
              <div>
                <strong>¡Casi! Pista para pensar:</strong><br>
                <span>${q.explanation}</span>
              </div>
            `;
            feedbackArea.style.display = 'flex';
          }
        };
      });

      if (btnNextQ) {
        btnNextQ.onclick = () => {
          this.onPlaySound('pop');
          if (idx < questions.length - 1) {
            qIdx++;
            drawQuizQuestion(qIdx);
          } else {
            showQuizSummary();
          }
        };
      }

      this.wireResetButton(() => {
        qIdx = 0;
        drawQuizQuestion(0);
      });
    };

    const showQuizSummary = () => {
      this.onPlaySound('fanfare');
      this.onLaunchConfetti();
      this.recordActivitySuccess(act.id, 30);
      this.updateByte("¡FELICITACIONES! Demostraste que comprendés qué son las instrucciones y cómo piensa un verdadero programador.", 'happy');

      container.innerHTML = `
        <div class="theory-quiz-container">
          ${this.createActivityHeader(act, false)}

          <div class="quiz-summary-card">
            <div style="font-size:4.5rem;">🏆</div>
            <h3 style="font-size:1.8rem; color:#15803d; margin:0;">
              ¡Desafío Conceptual Superado!
            </h3>
            <p style="font-size:1.15rem; color:#334155; max-width:550px; line-height:1.5; margin:0;">
              Respondiste correctamente las <strong>${questions.length} preguntas</strong> sobre el funcionamiento, orden, claridad y ejecución de las instrucciones.
            </p>

            <div style="background:#ecfdf5; border:2px solid #86efac; border-radius:14px; padding:14px 20px; color:#166534; font-weight:700; font-size:1.05rem;">
              ⭐ ¡Obtuviste la máxima puntuación en comprensión teórica!
            </div>

            <button type="button" id="btn-finish-quiz-summary" class="btn-stage-next" style="margin-top:10px; padding:14px 32px; font-size:1.15rem;">
              <span>🎮 ¡Ir a la Gran Misión Final de Mario!</span> ➡️
            </button>
          </div>

          ${this.createActivityFooter()}
        </div>
      `;

      const btnFinish = document.getElementById('btn-finish-quiz-summary');
      if (btnFinish) {
        btnFinish.onclick = () => {
          this.nextActivity();
        };
      }
    };

    drawQuizQuestion(qIdx);
  }

  // ========================================================
  // 🎮 MINIJUEGO INTERACTIVO: MISIÓN FINAL DE BYTE (1.° A 5.°)
  // ========================================================
  renderByteMission(container, act) {
    const isGradeOne = this.currentGrade === 1;

    // Control de vista: 'welcome' o 'game'
    if (!this.byteMissionView) this.byteMissionView = {};
    const currentView = this.byteMissionView[act.id] || 'welcome';

    // --------------------------------------------------------
    // A. PANTALLA DE BIENVENIDA DE LA MISIÓN
    // --------------------------------------------------------
    if (currentView === 'welcome') {
      const welcomeSpeech = isGradeOne
        ? '¡HOLA! SOY BYTE 🤖. ¡NECESITO TU AYUDA! PROGRAMÁ MIS MOVIMIENTOS PARA QUE LLEGUE A DESTINO.'
        : '¡Hola! Soy Byte 🤖. ¡Necesito tu ayuda! Programá mis movimientos para que llegue a destino.';
      this.updateByte(welcomeSpeech, 'happy', `${act.title}. ${welcomeSpeech}`);

      const welcomeTitle = isGradeOne ? '¡MISIÓN FINAL!' : '¡Misión Final!';
      const welcomeHeading = isGradeOne ? '¡AYUDÁ A BYTE A LLEGAR A SU DESTINO!' : '¡Ayudá a Byte a llegar a su destino!';
      const welcomeMsg = isGradeOne
        ? '¡BYTE NECESITA TU AYUDA! PROGRAMÁ SUS MOVIMIENTOS PARA QUE LLEGUE A DESTINO.'
        : '¡Byte necesita tu ayuda! Programá sus movimientos para que llegue a destino.';
      const welcomeInstruction = isGradeOne
        ? '👉 SELECCIONÁ LAS INSTRUCCIONES EN ORDEN, PRESIONÁ «¡EJECUTAR!» Y GUIÁ A BYTE POR EL CAMINO SUPERANDO LOS OBSTÁCULOS.'
        : '👉 Seleccioná las instrucciones en orden, presioná «¡Ejecutar!» y guiá a Byte por el camino superando los obstáculos.';
      const startBtnText = isGradeOne ? '🚀 ¡COMENZAR MISIÓN!' : '🚀 ¡Comenzar Misión!';

      container.innerHTML = `
        <div class="byte-mission-wrapper">
          ${this.createActivityHeader(act, false)}

          <div class="byte-welcome-card">
            <div class="byte-welcome-header">
              <span class="byte-welcome-badge">🎮 ${welcomeTitle}</span>
              <h2 class="byte-welcome-title">${welcomeHeading}</h2>
            </div>

            <div class="byte-welcome-illustration">
              <div class="byte-hero-avatar-box">
                <div class="byte-hero-avatar">🤖</div>
                <div class="byte-hero-name">BYTE</div>
              </div>

              <div class="byte-welcome-path-dots">
                <span>🟧</span>
                <span>➡️</span>
                <span>🟧</span>
                <span>➡️</span>
                <span>🟧</span>
                <span>➡️</span>
              </div>

              <div class="byte-dest-box">
                <div class="byte-dest-icon">${act.goalIcon || '🏠'}</div>
                <div class="byte-dest-name">${isGradeOne ? (act.goalName || 'DESTINO').toUpperCase() : (act.goalName || 'Destino')}</div>
              </div>
            </div>

            <div class="byte-speech-bubble">
              <p class="bubble-main">${welcomeMsg}</p>
              <p class="bubble-sub">${welcomeInstruction}</p>
            </div>

            <button type="button" id="btn-start-byte-mission" class="btn-byte-start-mission">
              <span>${startBtnText}</span>
            </button>
          </div>

          ${this.createActivityFooter()}
        </div>
      `;

      const btnStart = document.getElementById('btn-start-byte-mission');
      if (btnStart) {
        btnStart.onclick = () => {
          this.onPlaySound('pop');
          this.byteMissionView[act.id] = 'game';
          this.renderByteMission(container, act);
        };
      }
      return;
    }

    // --------------------------------------------------------
    // B. PANTALLA PRINCIPAL DEL JUEGO / ESCENARIO INTERACTIVO
    // --------------------------------------------------------
    this.updateByte(act.instruction, 'normal', `${act.title}. ${act.instruction}`);

    let playerPos = { ...act.startPos };
    let playerFacing = 'right';
    let commands = [];
    let isRunning = false;
    let abortToken = { isAborted: false };
    let currentHintIndex = 0;
    let byteAnim = '';
    let isMissionWon = false;

    this.byteMissionAbortToken = abortToken;

    const cols = act.gridCols || 6;
    const rows = act.gridRows || 2;
    const cellSize = cols >= 7 ? 50 : (cols >= 5 ? 56 : 64);

    const defaultCmdLabels = {
      right: isGradeOne ? '➡️ AVANZAR' : '➡️ Avanzar',
      left: isGradeOne ? '⬅️ RETROCEDER' : '⬅️ Retroceder',
      up: isGradeOne ? '⬆️ SUBIR' : '⬆️ Subir',
      down: isGradeOne ? '⬇️ BAJAR' : '⬇️ Bajar',
      jump: isGradeOne ? '🦘 SALTAR' : '🦘 Saltar',
      repeat3: isGradeOne ? '🔁 REPETIR 3 PASOS' : '🔁 Repetir 3 Pasos'
    };

    const cmdMeta = {
      right: { icon: '➡️', label: (act.commandLabels && act.commandLabels.right) || defaultCmdLabels.right, cls: 'cmd-right' },
      left: { icon: '⬅️', label: (act.commandLabels && act.commandLabels.left) || defaultCmdLabels.left, cls: 'cmd-left' },
      up: { icon: '⬆️', label: (act.commandLabels && act.commandLabels.up) || defaultCmdLabels.up, cls: 'cmd-up' },
      down: { icon: '⬇️', label: (act.commandLabels && act.commandLabels.down) || defaultCmdLabels.down, cls: 'cmd-down' },
      jump: { icon: '🦘', label: (act.commandLabels && act.commandLabels.jump) || defaultCmdLabels.jump, cls: 'cmd-jump' },
      repeat3: { icon: '🔁', label: (act.commandLabels && act.commandLabels.repeat3) || defaultCmdLabels.repeat3, cls: 'cmd-repeat' }
    };

    container.innerHTML = `
      <div class="byte-mission-wrapper">
        ${this.createActivityHeader(act, false)}

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:6px;">
          <div class="pattern-instruction-title" style="margin:0;">
            ${isGradeOne ? `🎯 OBJETIVO: ¡LLEVAR A BYTE A SU ${act.goalName || 'DESTINO'}!` : `🎯 Objetivo: Guiar a Byte hasta ${act.goalName || 'su destino'} superando los obstáculos.`}
          </div>
          <button type="button" id="btn-toggle-welcome-help" class="btn-byte-tool" style="font-size:0.85rem; padding:4px 10px;">
            <span>ℹ️</span> ${isGradeOne ? 'VER MISIÓN' : 'Ver Misión'}
          </button>
        </div>

        <p style="font-size:1.1rem; color:#334155; margin-bottom:12px; font-weight:700; ${isGradeOne ? 'text-transform:uppercase;' : ''}">
          ${act.instruction}
        </p>

        <div class="byte-game-layout">
          <!-- Columna izquierda: Tablero interactivo de Byte -->
          <div class="byte-stage-box">
            <div class="byte-grid-board" id="byte-grid-board"></div>
            <div style="display:flex; justify-content:space-between; width:100%; font-size:0.85rem; color:#64748b; font-weight:700; padding:0 4px;">
              <span>🤖 ${isGradeOne ? 'INICIO: BYTE' : 'Inicio: Byte'}</span>
              <span id="byte-progress-indicator" style="color:#0369a1;">📝 ${isGradeOne ? '0 INSTRUCCIONES' : '0 instrucciones'}</span>
              <span>${act.goalIcon || '🏠'} ${isGradeOne ? (act.goalName || 'DESTINO').toUpperCase() : (act.goalName || 'Destino')}</span>
            </div>
          </div>

          <!-- Columna derecha: Panel de programación y secuencia -->
          <div class="byte-programming-panel">
            <div class="byte-panel-section-title">
              <span>🎮</span> ${isGradeOne ? '1. INSTRUCCIONES DISPONIBLES (TOCÁ PARA AGREGAR):' : '1. Instrucciones disponibles (tocá para agregar):'}
            </div>
            <div class="byte-cmd-palette" id="byte-cmd-palette">
              ${(act.availableCommands || ['right', 'jump', 'up', 'down', 'left']).map(cmdKey => {
                const meta = cmdMeta[cmdKey] || { icon: '👉', label: cmdKey, cls: '' };
                return `
                  <button type="button" class="btn-byte-cmd ${meta.cls}" data-cmd="${cmdKey}">
                    <span>${meta.icon}</span> ${meta.label}
                  </button>
                `;
              }).join('')}
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
              <div class="byte-panel-section-title">
                <span>📝</span> ${isGradeOne ? '2. TU SECUENCIA DE INSTRUCCIONES:' : '2. Tu secuencia de instrucciones:'}
              </div>
              <div style="display:flex; gap:6px;">
                <button type="button" id="btn-byte-undo" class="btn-byte-tool" title="${isGradeOne ? 'BORRAR ÚLTIMA INSTRUCCIÓN' : 'Borrar última instrucción'}">
                  ${isGradeOne ? '⌫ BORRAR ÚLTIMO' : '⌫ Deshacer'}
                </button>
                <button type="button" id="btn-byte-clear-all" class="btn-byte-tool" style="color:#b91c1c;" title="${isGradeOne ? 'VACIAR SECUENCIA' : 'Vaciar secuencia'}">
                  ${isGradeOne ? '🗑️ VACIAR' : '🗑️ Vaciar'}
                </button>
              </div>
            </div>

            <div class="byte-sequence-tray" id="byte-sequence-tray"></div>

            <div class="byte-actions-bar">
              <button type="button" id="btn-byte-run" class="btn-byte-run">
                <span>▶️</span> ${isGradeOne ? '¡EJECUTAR INSTRUCCIONES!' : '¡Ejecutar Instrucciones!'}
              </button>
              <button type="button" id="btn-byte-reset-pos" class="btn-byte-tool">
                <span>🔄</span> ${isGradeOne ? 'REINICIAR POSICIÓN' : 'Reiniciar Posición'}
              </button>
              <button type="button" id="btn-byte-hint" class="btn-byte-tool" style="color:#0369a1;">
                <span>💡</span> ${isGradeOne ? 'NECESITO UNA PISTA' : 'Necesito una Pista'}
              </button>
            </div>

            <!-- Banner festivo de celebración al ganar la misión -->
            <div id="byte-celebration-container" style="display:none;"></div>
          </div>
        </div>

        ${this.createActivityFooter()}
      </div>
    `;

    const boardEl = document.getElementById('byte-grid-board');
    const trayEl = document.getElementById('byte-sequence-tray');
    const btnRun = document.getElementById('btn-byte-run');
    const btnUndo = document.getElementById('btn-byte-undo');
    const btnClearAll = document.getElementById('btn-byte-clear-all');
    const btnResetPos = document.getElementById('btn-byte-reset-pos');
    const btnHint = document.getElementById('btn-byte-hint');
    const btnToggleWelcome = document.getElementById('btn-toggle-welcome-help');
    const celebrationEl = document.getElementById('byte-celebration-container');
    const progressEl = document.getElementById('byte-progress-indicator');

    if (btnToggleWelcome) {
      btnToggleWelcome.onclick = () => {
        if (isRunning) return;
        this.byteMissionView[act.id] = 'welcome';
        this.renderByteMission(container, act);
      };
    }

    // Renderizado del tablero de casillas de Byte
    const renderBoard = () => {
      if (!boardEl) return;
      boardEl.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
      boardEl.innerHTML = '';

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const cell = document.createElement('div');
          cell.style.width = `${cellSize}px`;
          cell.style.height = `${cellSize}px`;

          const isGoal = (act.targetPos && act.targetPos.x === x && act.targetPos.y === y);
          const isObstacle = (act.obstacles || []).find(o => o.x === x && o.y === y);
          const isScenery = (act.scenery || []).find(s => s.x === x && s.y === y);
          const isPlayer = (playerPos.x === x && playerPos.y === y);

          if (isGoal) {
            cell.className = 'byte-cell goal-cell';
            cell.innerHTML = `<span title="${act.goalName || 'Meta'}">${act.goalIcon || '🏠'}</span>`;
          } else if (isObstacle) {
            cell.className = 'byte-cell obstacle-cell';
            cell.innerHTML = `<span title="${isObstacle.name}">${isObstacle.icon}</span>`;
          } else if (isScenery) {
            cell.className = 'byte-cell scenery-cell';
            cell.innerHTML = `<span>${isScenery.icon}</span>`;
          } else {
            cell.className = 'byte-cell road-cell';
          }

          if (isPlayer) {
            cell.innerHTML = `
              <div class="byte-actor face-${playerFacing} ${byteAnim}" title="${act.characterName || 'Byte'}">
                ${act.characterIcon || '🤖'}
              </div>
            `;
          }

          boardEl.appendChild(cell);
        }
      }
    };

    // Actualiza el visor de comandos de la secuencia
    const updateTray = () => {
      if (!trayEl) return;
      if (progressEl) {
        progressEl.textContent = isGradeOne
          ? `📝 ${commands.length} ${commands.length === 1 ? 'INSTRUCCIÓN' : 'INSTRUCCIONES'}`
          : `📝 ${commands.length} ${commands.length === 1 ? 'instrucción' : 'instrucciones'}`;
      }

      if (commands.length === 0) {
        trayEl.innerHTML = `
          <div class="byte-sequence-empty-hint">
            ${isGradeOne ? 'TOCÁ LOS BOTONES DE INSTRUCCIONES PARA ARMAR EL CAMINO DE BYTE...' : 'Seleccioná las instrucciones para guiar a Byte hacia su destino...'}
          </div>
        `;
      } else {
        trayEl.innerHTML = commands.map((c, i) => {
          const meta = cmdMeta[c] || { icon: '👉', label: c };
          return `
            <div class="byte-step-chip" id="byte-chip-${i}" data-idx="${i}" title="${isGradeOne ? 'TOCÁ PARA QUITAR ESTA INSTRUCCIÓN' : 'Tocá para quitar esta instrucción'}">
              <span>${i + 1}.</span>
              <span>${meta.icon} ${meta.label}</span>
              <button type="button" class="btn-chip-delete" data-idx="${i}" title="${isGradeOne ? 'QUITAR' : 'Quitar'}">✕</button>
            </div>
          `;
        }).join('');

        // Permitir quitar cualquier instrucción haciendo clic en su botón ✕ o en el chip
        trayEl.querySelectorAll('.byte-step-chip').forEach(chip => {
          chip.onclick = (e) => {
            if (isRunning || isMissionWon) return;
            const idx = parseInt(chip.getAttribute('data-idx'));
            if (!isNaN(idx)) {
              this.onPlaySound('trash');
              commands.splice(idx, 1);
              updateTray();
            }
          };
        });
      }
    };

    renderBoard();
    updateTray();

    // Eventos: Paleta de botones para agregar comandos
    container.querySelectorAll('.btn-byte-cmd').forEach(cmdBtn => {
      cmdBtn.onclick = () => {
        if (isRunning || isMissionWon) return;
        const cmdKey = cmdBtn.getAttribute('data-cmd');
        if (!cmdKey) return;
        this.onPlaySound('click');
        commands.push(cmdKey);
        updateTray();
      };
    });

    if (btnUndo) {
      btnUndo.onclick = () => {
        if (isRunning || isMissionWon) return;
        this.onPlaySound('trash');
        commands.pop();
        updateTray();
      };
    }

    if (btnClearAll) {
      btnClearAll.onclick = () => {
        if (isRunning || isMissionWon) return;
        this.onPlaySound('trash');
        commands = [];
        playerPos = { ...act.startPos };
        playerFacing = 'right';
        byteAnim = '';
        renderBoard();
        updateTray();
      };
    }

    if (btnResetPos) {
      btnResetPos.onclick = () => {
        if (isRunning) return;
        this.onPlaySound('click');
        playerPos = { ...act.startPos };
        playerFacing = 'right';
        byteAnim = '';
        renderBoard();
        container.querySelectorAll('.byte-step-chip').forEach(c => c.className = 'byte-step-chip');
        const resetMsg = isGradeOne
          ? '¡BYTE VOLVIÓ AL INICIO! PODÉS EDITAR TUS INSTRUCCIONES.'
          : 'Byte volvió a la posición inicial. Podés corregir tu secuencia e intentar de nuevo.';
        this.updateByte(resetMsg, 'normal');
      };
    }

    if (btnHint) {
      btnHint.onclick = () => {
        if (isRunning) return;
        this.onPlaySound('click');
        const hintsArr = act.hints || [];
        if (hintsArr.length === 0) return;
        const currentHint = hintsArr[currentHintIndex];
        currentHintIndex = (currentHintIndex + 1) % hintsArr.length;
        this.updateByte(currentHint, 'thinking', currentHint);
      };
    }

    // ========================================================
    // EJECUCIÓN PASO A PASO DE LAS INSTRUCCIONES
    // ========================================================
    if (btnRun) {
      btnRun.onclick = async () => {
        if (isRunning || isMissionWon) return;

        if (commands.length === 0) {
          const emptyMsg = isGradeOne
            ? '¡AGREGÁ AL MENOS UNA INSTRUCCIÓN ANTES DE EJECUTAR!'
            : '¡Agregá al menos una instrucción antes de ejecutar!';
          this.updateByte(emptyMsg, 'worried');
          return;
        }

        isRunning = true;
        btnRun.disabled = true;
        btnRun.innerHTML = `<span>⏳</span> ${isGradeOne ? 'EJECUTANDO...' : 'Ejecutando...'}`;

        abortToken = { isAborted: false };
        this.byteMissionAbortToken = abortToken;

        playerPos = { ...act.startPos };
        playerFacing = 'right';
        byteAnim = '';
        renderBoard();

        // Limpiar estilos previos en chips
        container.querySelectorAll('.byte-step-chip').forEach(c => c.className = 'byte-step-chip');

        let crashed = false;

        for (let i = 0; i < commands.length; i++) {
          if (abortToken.isAborted) return;

          const chipEl = document.getElementById(`byte-chip-${i}`);
          if (chipEl) chipEl.className = 'byte-step-chip running';

          await new Promise(r => setTimeout(r, 400));
          if (abortToken.isAborted) return;

          const cmd = commands[i];

          // 1. MANEJO DE COMANDO: SALTAR
          if (cmd === 'jump') {
            let jx = 0;
            let jy = 0;
            if (playerFacing === 'right') jx = 2;
            else if (playerFacing === 'left') jx = -2;
            else if (playerFacing === 'up') jy = -2;
            else if (playerFacing === 'down') jy = 2;

            const landX = playerPos.x + jx;
            const landY = playerPos.y + jy;

            byteAnim = 'jumping';
            this.onPlaySound('snap');
            renderBoard();

            await new Promise(r => setTimeout(r, 350));
            if (abortToken.isAborted) return;

            // Verificación aterrizaje dentro de límites
            if (landX < 0 || landX >= cols || landY < 0 || landY >= rows) {
              crashed = true;
              if (chipEl) chipEl.className = 'byte-step-chip failed';
              byteAnim = 'crashed';
              this.onPlaySound('hit');
              renderBoard();
              const msg = isGradeOne
                ? `¡CUIDADO! BYTE SE SALDRÍA DEL MAPA CON ESE SALTO EN EL PASO ${i + 1}.`
                : `¡Cuidado! Byte se saldría del mapa con ese salto en el paso ${i + 1}.`;
              this.recordAttemptError(msg);
              break;
            }

            // Verificación si aterriza sobre un obstáculo
            const hitLandingObs = (act.obstacles || []).find(o => o.x === landX && o.y === landY);
            if (hitLandingObs) {
              crashed = true;
              if (chipEl) chipEl.className = 'byte-step-chip failed';
              byteAnim = 'crashed';
              this.onPlaySound('hit');
              renderBoard();
              const msg = isGradeOne
                ? `¡CASI! NO HAY SUELO SEGURO PARA ATERRIZAR TRAS EL SALTO EN EL PASO ${i + 1}.`
                : `¡Casi! No hay suelo seguro para aterrizar tras el salto en el paso ${i + 1}.`;
              this.recordAttemptError(msg);
              break;
            }

            // Aterrizaje exitoso del salto
            playerPos = { x: landX, y: landY };
            byteAnim = '';
            this.onPlaySound('coin');
            renderBoard();

            await new Promise(r => setTimeout(r, 200));
            if (chipEl) chipEl.className = 'byte-step-chip';
            continue;
          }

          // 2. MANEJO DE COMANDO: REPETICIÓN (5.° GRADO)
          if (cmd === 'repeat3') {
            for (let rep = 0; rep < 3; rep++) {
              let rx = playerPos.x;
              let ry = playerPos.y;
              if (playerFacing === 'right') rx++;
              else if (playerFacing === 'left') rx--;
              else if (playerFacing === 'up') ry--;
              else if (playerFacing === 'down') ry++;

              if (rx < 0 || rx >= cols || ry < 0 || ry >= rows) {
                crashed = true;
                break;
              }
              const hitObs = (act.obstacles || []).find(o => o.x === rx && o.y === ry);
              if (hitObs) {
                crashed = true;
                break;
              }
              playerPos = { x: rx, y: ry };
              byteAnim = 'walking';
              this.onPlaySound('pop');
              renderBoard();
              await new Promise(r => setTimeout(r, 260));
              byteAnim = '';
            }

            if (crashed) {
              if (chipEl) chipEl.className = 'byte-step-chip failed';
              byteAnim = 'crashed';
              this.onPlaySound('hit');
              renderBoard();
              this.recordAttemptError(`¡Atención en el avance repetido del paso ${i + 1}! Se encontró un obstáculo o límite.`);
              break;
            }

            renderBoard();
            if (chipEl) chipEl.className = 'byte-step-chip';
            continue;
          }

          // 3. MANEJO DE COMANDOS DIRECCIONALES: SUBIR, BAJAR, RETROCEDER, AVANZAR
          let nextX = playerPos.x;
          let nextY = playerPos.y;

          if (cmd === 'right') { playerFacing = 'right'; nextX++; }
          else if (cmd === 'left') { playerFacing = 'left'; nextX--; }
          else if (cmd === 'up') { playerFacing = 'up'; nextY--; }
          else if (cmd === 'down') { playerFacing = 'down'; nextY++; }

          // Verificación límites
          if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) {
            crashed = true;
            if (chipEl) chipEl.className = 'byte-step-chip failed';
            byteAnim = 'crashed';
            this.onPlaySound('hit');
            renderBoard();
            const msg = isGradeOne
              ? `¡CUIDADO! BYTE SE SALIÓ DEL CAMINO EN EL PASO ${i + 1}. ¡REVISÁ LA DIRECCIÓN!`
              : `¡Cuidado! Byte se salió del recorrido en el paso ${i + 1}. Revisá la dirección de ese paso.`;
            this.recordAttemptError(msg);
            break;
          }

          // Verificación colisión con obstáculo
          const hitObstacle = (act.obstacles || []).find(o => o.x === nextX && o.y === nextY);
          if (hitObstacle) {
            crashed = true;
            if (chipEl) chipEl.className = 'byte-step-chip failed';
            byteAnim = 'crashed';
            this.onPlaySound('hit');
            renderBoard();
            const msg = isGradeOne
              ? `¡CASI! EN EL PASO ${i + 1} HAY UN OBSTÁCULO (${hitObstacle.name}). ¡USÁ «SALTAR» PARA SUPERARLO!`
              : `¡Casi! En el paso ${i + 1} Byte encontró un obstáculo (${hitObstacle.name}). ¿Qué instrucción necesitás para superarlo? ¡Probá con SALTAR!`;
            this.recordAttemptError(msg);
            break;
          }

          // Verificación colisión con escenografía bloqueante
          const hitScenery = (act.scenery || []).find(s => s.x === nextX && s.y === nextY);
          if (hitScenery) {
            crashed = true;
            if (chipEl) chipEl.className = 'byte-step-chip failed';
            byteAnim = 'crashed';
            this.onPlaySound('hit');
            renderBoard();
            const msg = isGradeOne
              ? `¡CUIDADO! EN EL PASO ${i + 1} BYTE CHOCÓ CON UN ELEMENTO DEL PAISAJE.`
              : `¡Cuidado! En el paso ${i + 1} Byte se desvió hacia el paisaje. Mantenete sobre el camino.`;
            this.recordAttemptError(msg);
            break;
          }

          // Movimiento válido
          playerPos = { x: nextX, y: nextY };
          byteAnim = 'walking';
          this.onPlaySound('pop');
          renderBoard();

          await new Promise(r => setTimeout(r, 260));
          byteAnim = '';
          renderBoard();
          if (chipEl) chipEl.className = 'byte-step-chip';
        }

        isRunning = false;
        btnRun.disabled = false;
        btnRun.innerHTML = `<span>▶️</span> ${isGradeOne ? '¡EJECUTAR INSTRUCCIONES!' : '¡Ejecutar Instrucciones!'}`;

        // ========================================================
        // COMPROBACIÓN DE LLEGADA A LA META
        // ========================================================
        if (!crashed) {
          const reachedGoal = (playerPos.x === act.targetPos.x && playerPos.y === act.targetPos.y);

          if (reachedGoal) {
            isMissionWon = true;
            byteAnim = 'celebrating';
            renderBoard();

            this.onPlaySound('fanfare');
            this.onLaunchConfetti();
            this.recordActivitySuccess(act.id, 25);

            btnRun.style.display = 'none';
            if (btnResetPos) btnResetPos.style.display = 'none';

            const victoryHeading = isGradeOne
              ? `🎉 ¡LO LOGRASTE! ¡AYUDASTE A BYTE A LLEGAR A SU ${act.goalName || 'DESTINO'}!`
              : `🎉 ¡MISIÓN COMPLETADA! ¡PROGRAMASTE LAS INSTRUCCIONES CORRECTAS!`;

            const victorySub = isGradeOne
              ? '¡BYTE LLEGÓ A SU DESTINO SANO Y SALVO GRACIAS A TUS INSTRUCCIONES EXACTAS!'
              : `¡Excelente trabajo de programación! Guiaste a Byte hasta ${act.goalName || 'su destino'} superando todos los obstáculos.`;

            this.updateByte(victoryHeading, 'happy', victoryHeading);

            if (celebrationEl) {
              celebrationEl.className = 'byte-celebration-banner';
              celebrationEl.innerHTML = `
                <div style="font-size:3.5rem;">⭐ 🏆 ⭐</div>
                <h3 class="byte-celebration-title">${victoryHeading}</h3>
                <p class="byte-celebration-text">${victorySub}</p>
                <div style="background:#ecfdf5; border:2px solid #86efac; border-radius:14px; padding:10px 18px; font-weight:800; color:#166534;">
                  +25 ${isGradeOne ? 'PUNTOS' : 'puntos'} • ⭐⭐⭐ ${isGradeOne ? '¡MISIÓN FINAL SUPERADA!' : '¡Misión final superada!'}
                </div>
                <button type="button" id="btn-byte-finish-all" class="btn-stage-next" style="padding:14px 28px; font-size:1.15rem; margin-top:8px;">
                  <span>${isGradeOne ? '✨ ¡FINALIZAR TEMA! ➡️' : '✨ ¡Completar y Ver Resultados! ➡️'}</span>
                </button>
              `;
              celebrationEl.style.display = 'flex';

              const btnFinishAll = document.getElementById('btn-byte-finish-all');
              if (btnFinishAll) {
                btnFinishAll.onclick = () => {
                  this.nextActivity();
                };
              }
            }
          } else {
            // Completó las instrucciones pero no llegó a la meta
            const missingMsg = isGradeOne
              ? `¡CASI! BYTE SIGUIÓ TODAS LAS INSTRUCCIONES PERO TODAVÍA NO LLEGÓ A SU ${act.goalName || 'DESTINO'}. ¡AGREGÁ MÁS PASOS!`
              : `¡Buen avance! Byte completó la secuencia pero todavía no llegó a destino. ¡Agregá más instrucciones para continuar!`;
            this.updateByte(missingMsg, 'thinking');
          }
        }
      };
    }

    this.wireResetButton(() => {
      commands = [];
      playerPos = { ...act.startPos };
      playerFacing = 'right';
      byteAnim = '';
      isMissionWon = false;
      if (btnRun) {
        btnRun.style.display = 'inline-flex';
        btnRun.disabled = false;
        btnRun.innerHTML = `<span>▶️</span> ${isGradeOne ? '¡EJECUTAR INSTRUCCIONES!' : '¡Ejecutar Instrucciones!'}`;
      }
      if (btnResetPos) btnResetPos.style.display = 'inline-flex';
      if (celebrationEl) celebrationEl.style.display = 'none';
      renderBoard();
      updateTray();
    });

    const btnNext = document.getElementById('btn-activity-next');
    if (btnNext) btnNext.onclick = () => this.nextActivity();
  }

  // Alias para retrocompatibilidad
  renderMarioMission(container, act) {
    this.renderByteMission(container, act);
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
    const isGradeOne = this.currentGrade === 1;
    this.updateByte(act.instruction, 'thinking', `${act.title}. ${act.instruction}`);

    const mapHtml = act.map ? this.createVisualMapHtml(act.map) : '';

    container.innerHTML = `
      <div class="quiz-box">
        ${this.createActivityHeader(act)}
        <p style="font-size:1.15rem; color:#334155; margin-bottom:12px; text-align:center;">${act.instruction}</p>
        ${mapHtml}

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

        <div style="font-weight:700; color:#0369a1; margin-bottom:8px; text-align:center;">${isGradeOne ? 'ELEGÍ EL PASO QUE COMPLETA LA SECUENCIA:' : 'Elegí el paso que completa la secuencia:'}</div>
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
          this.onPlaySound('fanfare');
          this.onLaunchConfetti();
          const successMsg = isGradeOne
            ? "¡PERFECTO! ESE ES EXACTAMENTE EL PASO QUE FALTABA EN LA SECUENCIA."
            : "¡Perfecto! Ese es exactamente el paso que completa el recorrido en el mapa.";
          this.updateByte(successMsg, 'happy');
          this.recordActivitySuccess(act.id, 15);
        } else {
          btn.classList.add('wrong');
          this.onPlaySound('wrong');
          const errorMsg = isGradeOne
            ? "ESE PASO NO ENCAJA EN ESTE MOMENTO DE LA SECUENCIA."
            : "Ese paso no conduce a la meta en ese punto del camino.";
          this.recordAttemptError(errorMsg);
        }
      };
    });

    const btnNext = document.getElementById('btn-activity-next');
    if (btnNext) btnNext.onclick = () => this.nextActivity();
  }

  // 4. PLANTAR UNA SEMILLA (INTERACTIVA)
  renderSeedInteractive(container, act) {
    const isGradeOne = this.currentGrade === 1;
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
          <div style="font-weight:700; color:#0369a1; margin-bottom:8px;">${isGradeOne ? '1. BANCO DE INSTRUCCIONES (TOCALAS EN ORDEN):' : '1. Banco de Instrucciones (Tocalas en orden):'}</div>
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
          <div style="font-weight:700; color:#059669; margin-bottom:8px;">${isGradeOne ? '2. TU SECUENCIA ARMADA:' : '2. Tu Secuencia Armada:'}</div>
          <div id="seed-sequence-box" style="display:flex; flex-wrap:wrap; gap:8px; min-height:50px; background:#f0fdf4; border:2px dashed #86efac; border-radius:14px; padding:10px;">
            <span style="color:#94a3b8; font-style:italic;">${isGradeOne ? 'TOCÁ LAS TARJETAS EN ORDEN...' : 'Toca las tarjetas en orden...'}</span>
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
        seqBox.innerHTML = `<span style="color:#94a3b8; font-style:italic;">${isGradeOne ? 'TOCÁ LAS TARJETAS EN ORDEN...' : 'Toca las tarjetas en orden...'}</span>`;
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
          const successMsg = isGradeOne
            ? "¡HERMOSO! LA SECUENCIA ESTUVO PERFECTA Y LA SEMILLITA FLORECIÓ."
            : "¡Hermoso! La secuencia estuvo perfecta y la semillita floreció.";
          this.updateByte(successMsg, 'happy');
          this.recordActivitySuccess(act.id, 15);
        } else {
          const errorMsg = isGradeOne
            ? "EL ORDEN DE LAS INSTRUCCIONES NO PERMITIÓ CRECER A LA PLANTA. TOCÁ REINICIAR E INTENTÁ DE NUEVO."
            : "El orden de las instrucciones no permitió crecer a la planta. Presioná Reiniciar e intentá de nuevo.";
          this.recordAttemptError(errorMsg);
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

  /**
   * Genera el HTML de un mapa visual de recorrido para niños (sin coordenadas)
   */
  createVisualMapHtml(mapConfig, currentBytePos = null, trails = []) {
    if (!mapConfig) return '';
    const cols = mapConfig.cols || 3;
    const rows = mapConfig.rows || 3;
    const bytePos = currentBytePos || mapConfig.start;
    const cellSize = cols >= 5 ? 50 : 58;

    let cellsHtml = '';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const isByte = bytePos && bytePos.x === x && bytePos.y === y;
        const isTarget = mapConfig.target && mapConfig.target.x === x && mapConfig.target.y === y;
        const obstacle = (mapConfig.obstacles || []).find(o => o.x === x && o.y === y);
        const scenery = (mapConfig.scenery || []).find(s => s.x === x && s.y === y);
        const isPath = (mapConfig.pathTiles || []).some(p => p.x === x && p.y === y);
        const isTrail = trails.some(t => t.x === x && t.y === y);

        let cellClass = 'byte-map-cell';
        let cellContent = '';

        if (isByte) {
          cellClass += ' cell-byte';
          cellContent = '🤖';
        } else if (isTarget) {
          cellClass += ' cell-target';
          cellContent = mapConfig.target.icon || '⭐';
        } else if (obstacle) {
          cellClass += ' cell-obstacle';
          cellContent = obstacle.icon || '🪨';
        } else if (isTrail) {
          cellClass += ' cell-trail';
          cellContent = '👣';
        } else if (scenery) {
          cellClass += ' cell-scenery';
          cellContent = scenery.icon || '🌲';
        } else if (isPath) {
          cellClass += ' cell-path';
          cellContent = '🟫';
        } else {
          cellClass += ' cell-scenery';
          cellContent = '';
        }

        cellsHtml += `<div class="${cellClass}" id="map-cell-${x}-${y}" data-x="${x}" data-y="${y}" style="width:${cellSize}px; height:${cellSize}px;">${cellContent}</div>`;
      }
    }

    const targetLabel = mapConfig.target ? (mapConfig.target.label || 'Destino') : 'Meta';
    const targetIcon = mapConfig.target ? (mapConfig.target.icon || '⭐') : '⭐';

    return `
      <div class="byte-map-container" id="byte-active-visual-map">
        <div class="byte-map-header">
          <span class="byte-map-badge">🗺️ MAPA DEL RECORRIDO</span>
          <span class="byte-map-legend">🤖 Salida ➔ ${targetIcon} ${targetLabel}</span>
        </div>
        <div class="byte-map-grid" style="grid-template-columns: repeat(${cols}, ${cellSize}px);">
          ${cellsHtml}
        </div>
      </div>
    `;
  }

  // 7. ORDENÁ LOS PASOS (DRAG & DROP + TÁCTIL)
  renderOrderSteps(container, act) {
    const isGradeOne = this.currentGrade === 1;
    this.updateByte(act.instruction, 'thinking', `${act.title}. ${act.instruction}`);

    // Asegurar que las tarjetas comiencen desordenadas (nunca en la solución final)
    let currentItems = [...act.items];
    let shuffleTries = 0;
    const isWinning = (arr) => {
      if (act.expectedDirs) {
        return arr.every((it, i) => it.dir === act.expectedDirs[i]);
      }
      return arr.every((it, i) => it.id === act.correctOrder[i]);
    };

    while (shuffleTries < 15 && isWinning(currentItems)) {
      currentItems.sort(() => Math.random() - 0.5);
      shuffleTries++;
    }
    if (currentItems.length > 1 && isWinning(currentItems)) {
      currentItems.reverse();
    }

    let isSimulating = false;
    let byteSimPos = act.map ? { ...act.map.start } : null;
    let trails = [];

    const drawView = () => {
      const mapHtml = act.map ? this.createVisualMapHtml(act.map, byteSimPos, trails) : '';

      container.innerHTML = `
        <div class="order-task-wrapper">
          ${this.createActivityHeader(act)}
          ${mapHtml}
          <p style="color:#64748b; font-size:1.05rem; text-align:center;">
            ${isGradeOne ? 'USÁ LOS BOTONES ▲ ▼ O ARRASTRÁ LAS TARJETAS PARA ORDENAR:' : 'Usa los botones ▲ ▼ o arrastrá las tarjetas para ordenar:'}
          </p>
          <ul class="order-items-list" id="order-sortable-list"></ul>
          <div class="stage-actions-bar">
            <button type="button" id="btn-check-order" class="btn-run-code" style="padding:12px 24px;">
              <span>✅</span> ${isGradeOne ? 'VERIFICAR ORDEN' : 'Verificar Orden'}
            </button>
          </div>
          ${this.createActivityFooter()}
        </div>
      `;

      const listEl = document.getElementById('order-sortable-list');
      const btnCheck = document.getElementById('btn-check-order');

      const renderList = () => {
        listEl.innerHTML = currentItems.map((item, idx) => `
          <li class="order-card-item" draggable="${!isSimulating}" data-idx="${idx}">
            <div class="order-left-group">
              <span class="order-step-badge">${idx + 1}</span>
              <span class="order-card-icon">${item.icon}</span>
              <span class="order-card-label" style="${isGradeOne ? 'text-transform:uppercase;' : ''}">${item.text}</span>
            </div>
            <div class="order-controls-group">
              <button type="button" class="btn-order-move btn-move-up" data-idx="${idx}" ${idx === 0 || isSimulating ? 'disabled style="opacity:0.3"' : ''}>▲</button>
              <button type="button" class="btn-order-move btn-move-down" data-idx="${idx}" ${idx === currentItems.length - 1 || isSimulating ? 'disabled style="opacity:0.3"' : ''}>▼</button>
            </div>
          </li>
        `).join('');

        listEl.querySelectorAll('.btn-move-up').forEach(b => {
          b.onclick = (e) => {
            if (isSimulating) return;
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
            if (isSimulating) return;
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

        // Drag and drop
        let draggedIndex = null;
        listEl.querySelectorAll('.order-card-item').forEach(itemEl => {
          itemEl.addEventListener('dragstart', (e) => {
            if (isSimulating) { e.preventDefault(); return; }
            draggedIndex = parseInt(itemEl.getAttribute('data-idx'));
            itemEl.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
          });
          itemEl.addEventListener('dragend', () => itemEl.classList.remove('dragging'));
          itemEl.addEventListener('dragover', (e) => e.preventDefault());
          itemEl.addEventListener('drop', (e) => {
            e.preventDefault();
            if (isSimulating) return;
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
        isSimulating = false;
        byteSimPos = act.map ? { ...act.map.start } : null;
        trails = [];
        // Re-desordenar
        currentItems.sort(() => Math.random() - 0.5);
        drawView();
      });

      if (btnCheck) {
        btnCheck.onclick = async () => {
          if (this.activityState.isCompleted || isSimulating) return;

          // Si hay mapa, simular movimiento paso a paso en el mapa
          if (act.map) {
            isSimulating = true;
            btnCheck.disabled = true;
            btnCheck.style.opacity = '0.5';

            byteSimPos = { ...act.map.start };
            trails = [];
            const mapContainer = document.getElementById('byte-active-visual-map');

            const refreshMap = () => {
              if (mapContainer) {
                mapContainer.outerHTML = this.createVisualMapHtml(act.map, byteSimPos, trails);
              }
            };
            refreshMap();

            let crashed = false;
            let crashReason = '';

            for (let s = 0; s < currentItems.length; s++) {
              await new Promise(r => setTimeout(r, 400));
              const item = currentItems[s];
              trails.push({ ...byteSimPos });

              let nextX = byteSimPos.x;
              let nextY = byteSimPos.y;

              const dir = item.dir || (item.icon === '➡️' ? 'right' : (item.icon === '⬇️' ? 'down' : (item.icon === '⬆️' ? 'up' : 'left')));
              if (dir === 'right') nextX++;
              else if (dir === 'left') nextX--;
              else if (dir === 'down') nextY++;
              else if (dir === 'up') nextY--;

              // Límites del mapa
              if (nextX < 0 || nextX >= act.map.cols || nextY < 0 || nextY >= act.map.rows) {
                crashed = true;
                crashReason = `En el paso ${s + 1} me salí del mapa. Revisá el orden de las flechas.`;
                break;
              }

              // Verificar si pisa un camino o si choca con escenario/obstáculo
              const isPath = (act.map.pathTiles || []).some(p => p.x === nextX && p.y === nextY);
              const isTarget = act.map.target && act.map.target.x === nextX && act.map.target.y === nextY;
              const isObs = (act.map.obstacles || []).some(o => o.x === nextX && o.y === nextY);

              if (isObs || (!isPath && !isTarget)) {
                crashed = true;
                crashReason = `En el paso ${s + 1} me salí del camino y choqué. Mirá bien los giros del mapa.`;
                byteSimPos = { x: nextX, y: nextY };
                refreshMap();
                break;
              }

              byteSimPos = { x: nextX, y: nextY };
              this.onPlaySound('pop');
              refreshMap();
            }

            await new Promise(r => setTimeout(r, 300));
            const reachedTarget = !crashed && byteSimPos.x === act.map.target.x && byteSimPos.y === act.map.target.y;

            if (reachedTarget) {
              this.onPlaySound('fanfare');
              this.onLaunchConfetti();
              const successMsg = isGradeOne
                ? "¡EXCELENTE! ORGANIZASTE LAS INSTRUCCIONES EN EL ORDEN PERFECTO Y LLEGUÉ A DESTINO."
                : "¡Excelente! Organizaste las instrucciones en el orden perfecto y Byte llegó a la escuela 🏫.";
              this.updateByte(successMsg, 'happy');
              btnCheck.style.display = 'none';
              this.recordActivitySuccess(act.id, 15);
            } else {
              this.onPlaySound('wrong');
              this.recordAttemptError(crashReason || "Con ese orden no llego a la escuela. Probá reorganizar las flechas.");
              setTimeout(() => {
                byteSimPos = { ...act.map.start };
                trails = [];
                isSimulating = false;
                btnCheck.disabled = false;
                btnCheck.style.opacity = '1';
                drawView();
              }, 1200);
            }
          } else {
            // Actividad sin mapa (cocina, mochila, sándwich)
            const isCorrect = currentItems.every((it, i) => it.id === act.correctOrder[i]);
            if (isCorrect) {
              this.onPlaySound('fanfare');
              this.onLaunchConfetti();
              const successMsg = isGradeOne
                ? "¡EXCELENTE! ORGANIZASTE LAS INSTRUCCIONES EN EL ORDEN PERFECTO."
                : "¡Excelente! Organizaste las instrucciones en el orden perfecto.";
              this.updateByte(successMsg, 'happy');
              btnCheck.style.display = 'none';
              this.recordActivitySuccess(act.id, 15);
            } else {
              this.onPlaySound('wrong');
              const errorMsg = isGradeOne
                ? "REVISÁ EL ORDEN: ALGUNA ACCIÓN SE ESTÁ REALIZANDO ANTES DE TIEMPO."
                : "Revisá el orden: alguna acción se está realizando antes de tiempo.";
              this.recordAttemptError(errorMsg);
            }
          }
        };
      }

      const btnNext = document.getElementById('btn-activity-next');
      if (btnNext) btnNext.onclick = () => this.nextActivity();
    };

    drawView();
  }

  // 8. ENCONTRÁ EL ERROR
  renderFindError(container, act) {
    this.updateByte(act.instruction, 'thinking', `${act.title}. ${act.instruction}`);

    const mapHtml = act.map ? this.createVisualMapHtml(act.map) : '';

    container.innerHTML = `
      <div class="quiz-box">
        ${this.createActivityHeader(act)}
        <p style="font-size:1.15rem; color:#334155; margin-bottom:12px; text-align:center;">${act.instruction}</p>
        ${mapHtml}
        <div style="font-weight:700; color:#0369a1; text-align:center; margin:8px 0;">
          Tocá la instrucción que contiene el error («bug»):
        </div>
        <div style="display:flex; flex-direction:column; gap:10px;">
          ${act.steps.map(s => `
            <button type="button" class="quiz-opt-btn" data-sid="${s.id}">
              <span class="order-step-badge">${s.num}</span>
              <span style="font-size:1.8rem;">${s.icon}</span>
              <span style="flex:1; text-align:left;">${s.text}</span>
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
          this.onPlaySound('fanfare');
          this.onLaunchConfetti();
          this.updateByte(`¡Encontraste el bug! ${act.explanation}`, 'happy');
          this.recordActivitySuccess(act.id, 15);
        } else {
          b.classList.add('wrong');
          this.onPlaySound('wrong');
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

  // ========================================================
  // RENDERIZADORES DE ACTIVIDADES DE PATRONES (1.º GRADO)
  // Todo visual, colorido, táctil y en MAYÚSCULAS
  // ========================================================

  /**
   * Genera el HTML de una tarjeta ilustrada de patrón
   */
  renderPatternCardHtml(item, options = {}) {
    const cls = options.className || '';
    const attrs = options.attrs || '';
    if (!item) {
      return `
        <div class="pattern-card-item slot-empty ${cls}" ${attrs}>
          <div class="card-icon">❓</div>
          <div class="card-label">¿QUÉ SIGUE?</div>
        </div>
      `;
    }
    return `
      <div class="pattern-card-item ${cls}" style="background:${item.color || '#ffffff'}; border-color:${item.border || '#cbd5e1'};" ${attrs}>
        <div class="card-icon">${item.icon}</div>
        <div class="card-label">${item.label}</div>
      </div>
    `;
  }

  // 1. INTRODUCCIÓN: ¿QUÉ ES UN PATRÓN?
  renderPatternIntro(container, act) {
    this.updateByte(
      "¡HOLA! SOY BYTE 🤖. UN PATRÓN ES ALGO QUE SE REPITE SIGUIENDO UN ORDEN. ¿QUÉ IMAGEN SIGUE?",
      'normal',
      "Hola. Soy Byte. Un patrón es algo que se repite siguiendo un orden. Qué imagen sigue?"
    );

    container.innerHTML = `
      <div class="pattern-game-area">
        ${this.createActivityHeader(act)}
        <div class="pattern-instruction-title">¿QUÉ ES UN PATRÓN?</div>
        <div class="pattern-instruction-desc">UN PATRÓN ES ALGO QUE SE REPITE SIGUIENDO UN ORDEN.</div>

        <div class="pattern-seq-strip" id="intro-seq-strip">
          ${act.exampleSeq.map(item => this.renderPatternCardHtml(item)).join('')}
          <div id="intro-target-slot-wrap">
            ${this.renderPatternCardHtml(null, { attrs: 'id="intro-target-slot"' })}
          </div>
        </div>

        <div class="pattern-options-area">
          <div class="pattern-options-title"><span>👉</span> ¿QUÉ IMAGEN SIGUE? TOCÁ TU RESPUESTA:</div>
          <div class="pattern-choices-grid" id="intro-choices-grid">
            ${act.options.map(opt => `
              <button type="button" class="pattern-choice-card" data-id="${opt.id}" style="border-color:${opt.border}; background:${opt.color};">
                <span class="choice-icon">${opt.icon}</span>
                <span class="choice-label">${opt.label}</span>
              </button>
            `).join('')}
          </div>
        </div>

        ${this.createActivityFooter()}
      </div>
    `;

    const slotWrap = document.getElementById('intro-target-slot-wrap');
    const strip = document.getElementById('intro-seq-strip');
    const choiceBtns = container.querySelectorAll('.pattern-choice-card');

    choiceBtns.forEach(btn => {
      btn.onclick = () => {
        if (this.activityState.isCompleted) return;
        const chosenId = btn.dataset.id;
        if (chosenId === act.correct.id) {
          if (slotWrap) {
            slotWrap.innerHTML = this.renderPatternCardHtml(act.correct, { className: 'highlight' });
          }
          if (strip) {
            strip.querySelectorAll('.pattern-card-item').forEach(c => c.classList.add('highlight'));
          }
          this.onPlaySound('fanfare');
          this.onLaunchConfetti();
          this.updateByte("¡MUY BIEN! ¡DESCUBRISTE EL PATRÓN!", 'happy', "Muy bien. Descubriste el patrón.");
          this.recordActivitySuccess(act.id, 10);
        } else {
          btn.style.animation = 'shakePattern 0.5s ease';
          setTimeout(() => { btn.style.animation = ''; }, 600);
          this.onPlaySound('wrong');
          this.updateByte(
            "¡CASI! MIRÁ EL ORDEN: 🍎 MANZANA LUEGO 🍌 BANANA... ¿CUÁL TOCA AHORA?",
            'thinking',
            "Casi. Mirá el orden. Manzana luego banana. Cuál toca ahora?"
          );
          if (strip) {
            const cards = strip.querySelectorAll('.pattern-card-item');
            if (cards.length >= 2) {
              cards[0].classList.add('highlight');
              cards[1].classList.add('highlight');
              setTimeout(() => {
                cards[0].classList.remove('highlight');
                cards[1].classList.remove('highlight');
              }, 1800);
            }
          }
          this.recordAttemptError("¡CASI! MIRÁ QUÉ DIBUJO SE REPITE.");
        }
      };
    });

    this.wireResetButton(() => this.renderPatternIntro(container, act));
    const btnNext = document.getElementById('btn-activity-next');
    if (btnNext) btnNext.onclick = () => this.nextActivity();
  }

  // 2. ACTIVIDAD 1 — ¿QUÉ SIGUE?
  renderPatternWhatNext(container, act) {
    let chIdx = 0;

    const drawChallenge = (idx) => {
      const ch = act.challenges[idx];
      this.updateByte(
        "TOCÁ LA IMAGEN QUE SIGUE EN EL PATRÓN.",
        'normal',
        "Tocá la imagen que sigue en el patrón."
      );

      container.innerHTML = `
        <div class="pattern-game-area">
          ${this.createActivityHeader(act)}
          <div class="pattern-instruction-title">DESAFÍO ${idx + 1} DE ${act.challenges.length}</div>
          <div class="pattern-instruction-desc">${act.instruction}</div>

          <div class="pattern-seq-strip" id="seq-strip">
            ${ch.seq.map(item => this.renderPatternCardHtml(item)).join('')}
            <div id="target-slot-wrap">
              ${this.renderPatternCardHtml(null, { attrs: 'id="what-next-target-slot"' })}
            </div>
          </div>

          <div class="pattern-options-area">
            <div class="pattern-options-title"><span>👉</span> OPCIONES:</div>
            <div class="pattern-choices-grid">
              ${ch.options.map(opt => `
                <button type="button" class="pattern-choice-card" data-id="${opt.id}" style="border-color:${opt.border}; background:${opt.color};">
                  <span class="choice-icon">${opt.icon}</span>
                  <span class="choice-label">${opt.label}</span>
                </button>
              `).join('')}
            </div>
          </div>

          ${this.createActivityFooter()}
        </div>
      `;

      const slotWrap = document.getElementById('target-slot-wrap');
      const strip = document.getElementById('seq-strip');
      const choiceBtns = container.querySelectorAll('.pattern-choice-card');

      choiceBtns.forEach(btn => {
        btn.onclick = () => {
          if (this.activityState.isCompleted) return;
          const chosenId = btn.dataset.id;
          if (chosenId === ch.correct.id) {
            btn.disabled = true;
            if (slotWrap) {
              slotWrap.innerHTML = this.renderPatternCardHtml(ch.correct, { className: 'highlight' });
            }
            this.onPlaySound('coin');
            this.updateByte("¡MUY BIEN! ¡DESCUBRISTE EL PATRÓN!", 'happy', "Muy bien. Descubriste el patrón.");

            setTimeout(() => {
              if (idx < act.challenges.length - 1) {
                chIdx++;
                drawChallenge(chIdx);
              } else {
                this.onPlaySound('fanfare');
                this.onLaunchConfetti();
                this.recordActivitySuccess(act.id, 20);
              }
            }, 850);
          } else {
            btn.style.animation = 'shakePattern 0.5s ease';
            setTimeout(() => { btn.style.animation = ''; }, 600);
            this.onPlaySound('wrong');
            if (strip && ch.repeatSize) {
              const cards = strip.querySelectorAll('.pattern-card-item');
              for (let c = 0; c < Math.min(cards.length, ch.repeatSize); c++) {
                cards[c].classList.add('highlight');
              }
              setTimeout(() => {
                cards.forEach(c => c.classList.remove('highlight'));
              }, 1800);
            }
            this.recordAttemptError("¡CASI! MIRÁ EL ORDEN DE LOS DIBUJOS.");
          }
        };
      });

      this.wireResetButton(() => {
        chIdx = 0;
        drawChallenge(0);
      });
      const btnNext = document.getElementById('btn-activity-next');
      if (btnNext) btnNext.onclick = () => this.nextActivity();
    };

    drawChallenge(chIdx);
  }

  // 3. ACTIVIDAD 2 — COMPLETÁ EL PATRÓN
  renderPatternComplete(container, act) {
    let chIdx = 0;

    const drawChallenge = (idx) => {
      const ch = act.challenges[idx];
      this.updateByte(
        "FALTA UNA IMAGEN EN EL MEDIO. ¿CUÁL ES?",
        'normal',
        "Falta una imagen en el medio. Cuál es?"
      );

      container.innerHTML = `
        <div class="pattern-game-area">
          ${this.createActivityHeader(act)}
          <div class="pattern-instruction-title">DESAFÍO ${idx + 1} DE ${act.challenges.length}</div>
          <div class="pattern-instruction-desc">${act.instruction}</div>

          <div class="pattern-seq-strip" id="seq-strip">
            ${ch.seq.map((item) => {
              if (!item) {
                return `<div id="middle-slot-wrap">${this.renderPatternCardHtml(null, { attrs: 'id="middle-slot"' })}</div>`;
              }
              return this.renderPatternCardHtml(item);
            }).join('')}
          </div>

          <div class="pattern-options-area">
            <div class="pattern-options-title"><span>👉</span> TOCÁ LA IMAGEN QUE FALTA:</div>
            <div class="pattern-choices-grid">
              ${ch.options.map(opt => `
                <button type="button" class="pattern-choice-card" data-id="${opt.id}" style="border-color:${opt.border}; background:${opt.color};">
                  <span class="choice-icon">${opt.icon}</span>
                  <span class="choice-label">${opt.label}</span>
                </button>
              `).join('')}
            </div>
          </div>

          ${this.createActivityFooter()}
        </div>
      `;

      const middleWrap = document.getElementById('middle-slot-wrap');
      const strip = document.getElementById('seq-strip');
      const choiceBtns = container.querySelectorAll('.pattern-choice-card');

      choiceBtns.forEach(btn => {
        btn.onclick = () => {
          if (this.activityState.isCompleted) return;
          const chosenId = btn.dataset.id;
          if (chosenId === ch.correct.id) {
            btn.disabled = true;
            if (middleWrap) {
              middleWrap.innerHTML = this.renderPatternCardHtml(ch.correct, { className: 'highlight' });
            }
            this.onPlaySound('coin');
            this.updateByte("¡EXCELENTE! ¡COMPLETASTE EL PATRÓN!", 'happy', "Excelente. Completaste el patrón.");

            setTimeout(() => {
              if (idx < act.challenges.length - 1) {
                chIdx++;
                drawChallenge(chIdx);
              } else {
                this.onPlaySound('fanfare');
                this.onLaunchConfetti();
                this.recordActivitySuccess(act.id, 20);
              }
            }, 850);
          } else {
            btn.style.animation = 'shakePattern 0.5s ease';
            setTimeout(() => { btn.style.animation = ''; }, 600);
            this.onPlaySound('wrong');
            if (strip && ch.repeatSize) {
              const cards = strip.querySelectorAll('.pattern-card-item');
              for (let c = 0; c < Math.min(cards.length, ch.repeatSize); c++) {
                cards[c].classList.add('highlight');
              }
              setTimeout(() => {
                cards.forEach(c => c.classList.remove('highlight'));
              }, 1800);
            }
            this.recordAttemptError("¡CASI! MIRÁ EL DIBUJO DE ADELANTE Y DE ATRÁS.");
          }
        };
      });

      this.wireResetButton(() => {
        chIdx = 0;
        drawChallenge(0);
      });
      const btnNext = document.getElementById('btn-activity-next');
      if (btnNext) btnNext.onclick = () => this.nextActivity();
    };

    drawChallenge(chIdx);
  }

  // 4. ACTIVIDAD 3 — ENCONTRÁ EL PATRÓN
  renderPatternFind(container, act) {
    let chIdx = 0;

    const drawChallenge = (idx) => {
      const ch = act.challenges[idx];
      this.updateByte(
        "¿CUÁL TIENE UN PATRÓN QUE SE REPITE? TOCÁ LA FILA.",
        'normal',
        "Cuál tiene un patrón que se repite. Tocá la fila."
      );

      container.innerHTML = `
        <div class="pattern-game-area">
          ${this.createActivityHeader(act)}
          <div class="pattern-instruction-title">DESAFÍO ${idx + 1} DE ${act.challenges.length}</div>
          <div class="pattern-instruction-desc">${act.instruction}</div>

          <div class="pattern-rows-list">
            ${ch.options.map(opt => `
              <div class="pattern-row-card" data-id="${opt.id}" data-has-pattern="${opt.hasPattern}">
                <span class="pattern-row-badge">${opt.label}</span>
                <div class="pattern-row-sequence">
                  ${opt.items.map(item => `
                    <div class="pattern-card-item" style="width:72px; height:85px; border-width:3px; margin:0;">
                      <div class="card-icon" style="font-size:2.2rem; margin:0;">${item.icon}</div>
                      <div class="card-label" style="font-size:0.65rem;">${item.label}</div>
                    </div>
                  `).join('')}
                </div>
                <span style="font-size:1.8rem;">👉</span>
              </div>
            `).join('')}
          </div>

          ${this.createActivityFooter()}
        </div>
      `;

      const rowCards = container.querySelectorAll('.pattern-row-card');
      rowCards.forEach(row => {
        row.onclick = () => {
          if (this.activityState.isCompleted) return;
          const hasPattern = row.dataset.hasPattern === 'true';

          if (hasPattern) {
            row.classList.add('correct');
            this.onPlaySound('coin');
            this.updateByte("¡MUY BIEN! ENCONTRASTE EL PATRÓN.", 'happy', "Muy bien. Encontraste el patrón.");

            setTimeout(() => {
              if (idx < act.challenges.length - 1) {
                chIdx++;
                drawChallenge(chIdx);
              } else {
                this.onPlaySound('fanfare');
                this.onLaunchConfetti();
                this.recordActivitySuccess(act.id, 20);
              }
            }, 900);
          } else {
            row.classList.add('wrong');
            setTimeout(() => row.classList.remove('wrong'), 600);
            this.onPlaySound('wrong');
            this.updateByte(
              "¡ESA FILA NO SE REPITE EN ORDEN! MIRÁ BIEN LAS OTRAS.",
              'thinking',
              "Esa fila no se repite en orden. Mirá bien las otras."
            );
            this.recordAttemptError("¡ESA NO ES! BUSCÁ LA FILA QUE REPITE EL MISMO ORDEN.");
          }
        };
      });

      this.wireResetButton(() => {
        chIdx = 0;
        drawChallenge(0);
      });
      const btnNext = document.getElementById('btn-activity-next');
      if (btnNext) btnNext.onclick = () => this.nextActivity();
    };

    drawChallenge(chIdx);
  }

  // 5. ACTIVIDAD 4 — ORDENÁ LAS IMÁGENES
  renderPatternOrder(container, act) {
    let chIdx = 0;

    const drawChallenge = (idx) => {
      const ch = act.challenges[idx];
      this.updateByte(
        "ARRASTRÁ O TOCÁ LAS IMÁGENES PARA LLENAR LOS LUGARES VACÍOS.",
        'normal',
        "Arrastrá o tocá las imágenes para llenar los lugares vacíos."
      );

      const slotIndices = [];
      ch.template.forEach((itemKey, tIdx) => {
        if (itemKey === null) slotIndices.push(tIdx);
      });

      let filledSlots = {};

      const renderBoard = () => {
        const stripEl = document.getElementById('order-seq-strip');
        if (!stripEl) return;

        stripEl.innerHTML = ch.template.map((itemKey, tIdx) => {
          if (itemKey !== null) {
            const itemObj = ch.baseItems[itemKey];
            return this.renderPatternCardHtml(itemObj);
          }
          const filled = filledSlots[tIdx];
          if (filled) {
            return `
              <div class="pattern-card-item" data-slot-idx="${tIdx}" style="background:${filled.color}; border-color:${filled.border}; cursor:pointer;" title="TOCÁ PARA QUITAR">
                <div class="card-icon">${filled.icon}</div>
                <div class="card-label">${filled.label}</div>
              </div>
            `;
          }
          return `
            <div class="pattern-card-item slot-empty" data-slot-idx="${tIdx}" style="cursor:pointer;" title="HUECO VACÍO">
              <div class="card-icon">❓</div>
              <div class="card-label">TOCÁ ACÁ</div>
            </div>
          `;
        }).join('');

        stripEl.querySelectorAll('[data-slot-idx]').forEach(slotEl => {
          const sIdx = parseInt(slotEl.dataset.slotIdx);
          slotEl.onclick = () => {
            if (filledSlots[sIdx]) {
              delete filledSlots[sIdx];
              this.onPlaySound('trash');
              renderBoard();
            }
          };

          slotEl.ondragover = (e) => e.preventDefault();
          slotEl.ondrop = (e) => {
            e.preventDefault();
            const poolId = e.dataTransfer.getData('text/plain');
            const poolItem = ch.pool.find(p => p.id === poolId);
            if (poolItem) {
              filledSlots[sIdx] = poolItem;
              this.onPlaySound('pop');
              renderBoard();
              checkCompletion();
            }
          };
        });
      };

      const checkCompletion = () => {
        const allFilled = slotIndices.every(sIdx => filledSlots[sIdx]);
        if (!allFilled) return;

        const isMatch = slotIndices.every((sIdx, i) => {
          return filledSlots[sIdx] && filledSlots[sIdx].id === ch.expectedSlots[i];
        });

        if (isMatch) {
          const stripEl = document.getElementById('order-seq-strip');
          if (stripEl) {
            stripEl.querySelectorAll('.pattern-card-item').forEach(c => c.classList.add('highlight'));
          }
          this.onPlaySound('coin');
          this.updateByte("¡GENIAL! ¡COMPLETASTE LA SECUENCIA!", 'happy', "Genial. Completaste la secuencia.");

          setTimeout(() => {
            if (idx < act.challenges.length - 1) {
              chIdx++;
              drawChallenge(chIdx);
            } else {
              this.onPlaySound('fanfare');
              this.onLaunchConfetti();
              this.recordActivitySuccess(act.id, 20);
            }
          }, 850);
        } else {
          this.onPlaySound('wrong');
          this.updateByte("¡CASI! ALGUNA FIGURA ESTÁ EN EL LUGAR EQUIVOCADO.", 'thinking', "Casi. Alguna figura está en el lugar equivocado.");
          this.recordAttemptError("ALGUNA FIGURA ESTÁ EN EL LUGAR EQUIVOCADO. ¡REVISÁ EL ORDEN!");
        }
      };

      container.innerHTML = `
        <div class="pattern-game-area">
          ${this.createActivityHeader(act)}
          <div class="pattern-instruction-title">DESAFÍO ${idx + 1} DE ${act.challenges.length}</div>
          <div class="pattern-instruction-desc">${act.instruction}</div>

          <div class="pattern-seq-strip" id="order-seq-strip"></div>

          <div class="pattern-options-area">
            <div class="pattern-options-title"><span>📦</span> IMÁGENES DISPONIBLES (TOCÁ O ARRASTRÁ):</div>
            <div class="pattern-choices-grid" id="pool-choices-grid">
              ${ch.pool.map(p => `
                <button type="button" class="pattern-choice-card" draggable="true" data-id="${p.id}" style="border-color:${p.border}; background:${p.color};">
                  <span class="choice-icon">${p.icon}</span>
                  <span class="choice-label">${p.label}</span>
                </button>
              `).join('')}
            </div>
            <button type="button" id="btn-clear-order-slots" class="btn-pat-action btn-pat-reset" style="margin-top:8px;">
              🔄 VACIAR CASILLEROS
            </button>
          </div>

          ${this.createActivityFooter()}
        </div>
      `;

      renderBoard();

      container.querySelectorAll('#pool-choices-grid .pattern-choice-card').forEach(btn => {
        const poolId = btn.dataset.id;
        const poolItem = ch.pool.find(p => p.id === poolId);

        btn.onclick = () => {
          if (this.activityState.isCompleted) return;
          const firstEmpty = slotIndices.find(sIdx => !filledSlots[sIdx]);
          if (firstEmpty !== undefined && poolItem) {
            filledSlots[firstEmpty] = poolItem;
            this.onPlaySound('pop');
            renderBoard();
            checkCompletion();
          }
        };

        btn.ondragstart = (e) => {
          e.dataTransfer.setData('text/plain', poolId);
        };
      });

      const btnClear = document.getElementById('btn-clear-order-slots');
      if (btnClear) {
        btnClear.onclick = () => {
          filledSlots = {};
          this.onPlaySound('trash');
          renderBoard();
        };
      }

      this.wireResetButton(() => {
        chIdx = 0;
        drawChallenge(0);
      });
      const btnNext = document.getElementById('btn-activity-next');
      if (btnNext) btnNext.onclick = () => this.nextActivity();
    };

    drawChallenge(chIdx);
  }

  // 6. ACTIVIDAD 5 — ARMÁ TU PROPIO PATRÓN (Creativo)
  renderPatternCreate(container, act) {
    this.updateByte(
      "¡ELEGÍ LAS FIGURAS Y CREÁ TU PROPIO PATRÓN REPETIDO!",
      'normal',
      "Elegí las figuras y creá tu propio patrón repetido."
    );

    let activeThemeIdx = 0;
    let userSequence = [];
    const MAX_SLOTS = 6;

    const evaluateUserPattern = () => {
      if (userSequence.length < 4) {
        this.updateByte("¡AGREGÁ MÁS FIGURAS! NECESITÁS AL MENOS 4 PARA FORMAR UN PATRÓN.", 'thinking');
        return;
      }

      const seq = userSequence.map(it => it.id);
      let isValid = false;
      let rhythmDesc = '';

      // Test 1: A B A B (periodo 2)
      if (seq[0] !== seq[1] && seq[0] === seq[2] && seq[1] === seq[3]) {
        if (seq.length === 4 || (seq.length === 5 && seq[4] === seq[0]) || (seq.length === 6 && seq[4] === seq[0] && seq[5] === seq[1])) {
          isValid = true;
          rhythmDesc = `${userSequence[0].label} - ${userSequence[1].label}`;
        }
      }

      // Test 2: A B C A B C (periodo 3)
      if (!isValid && seq.length === 6) {
        if (seq[0] !== seq[1] && seq[1] !== seq[2] && seq[0] === seq[3] && seq[1] === seq[4] && seq[2] === seq[5]) {
          isValid = true;
          rhythmDesc = `${userSequence[0].label} - ${userSequence[1].label} - ${userSequence[2].label}`;
        }
      }

      // Test 3: A A B B (periodo 2 doble)
      if (!isValid && seq.length >= 4) {
        if (seq[0] === seq[1] && seq[2] === seq[3] && seq[0] !== seq[2]) {
          if (seq.length === 4 || (seq.length === 6 && seq[4] === seq[0] && seq[5] === seq[1])) {
            isValid = true;
            rhythmDesc = `${userSequence[0].label} ${userSequence[0].label} - ${userSequence[2].label} ${userSequence[2].label}`;
          }
        }
      }

      if (isValid) {
        const stripEl = document.getElementById('user-seq-strip');
        if (stripEl) {
          stripEl.querySelectorAll('.pattern-card-item').forEach(c => c.classList.add('highlight'));
        }
        this.onPlaySound('fanfare');
        this.onLaunchConfetti();
        this.updateByte(
          `¡CREASTE UN PATRÓN! SE REPITE: ${rhythmDesc}`,
          'happy',
          `Creaste un patrón. Se repite: ${rhythmDesc}`
        );
        this.recordActivitySuccess(act.id, 25);
      } else {
        this.onPlaySound('wrong');
        this.updateByte(
          "¡CASI! PARA QUE SEA UN PATRÓN TIENE QUE REPETIRSE EN EL MISMO ORDEN. ¡INTENTÁ AGREGAR OTRA PIEZA!",
          'thinking',
          "Casi. Para que sea un patrón tiene que repetirse en el mismo orden. Intentá agregar otra pieza."
        );
        this.recordAttemptError("PROBÁ PONER DOS FIGURAS DIFERENTES Y REPETIRLAS: POR EJEMPLO 🍎 🍌 🍎 🍌.");
      }
    };

    const renderUI = () => {
      const currentTheme = act.themes[activeThemeIdx];

      container.innerHTML = `
        <div class="pattern-game-area">
          ${this.createActivityHeader(act)}
          <div class="pattern-instruction-title">PATIO CREATIVO DE PATRONES</div>
          <div class="pattern-instruction-desc">${act.instruction}</div>

          <div class="pattern-theme-selector">
            ${act.themes.map((th, tIdx) => `
              <button type="button" class="btn-pat-theme ${tIdx === activeThemeIdx ? 'active' : ''}" data-tidx="${tIdx}">
                ${th.name}
              </button>
            `).join('')}
          </div>

          <div class="pattern-seq-strip" id="user-seq-strip">
            ${Array.from({ length: MAX_SLOTS }).map((_, i) => {
              const item = userSequence[i];
              if (item) {
                return `
                  <div class="pattern-card-item" style="background:${item.color}; border-color:${item.border};">
                    <div class="card-icon">${item.icon}</div>
                    <div class="card-label">${item.label}</div>
                  </div>
                `;
              }
              return `
                <div class="pattern-card-item slot-empty" style="opacity:0.6;">
                  <div class="card-icon">${i + 1}</div>
                  <div class="card-label">CASILLERO</div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="pattern-options-area">
            <div class="pattern-options-title"><span>👇</span> TOCÁ UNA FIGURA PARA AGREGARLA:</div>
            <div class="pattern-tray-palette">
              ${currentTheme.items.map(it => `
                <button type="button" class="pattern-tray-item" data-id="${it.id}">
                  <span class="tray-icon">${it.icon}</span>
                  <span class="tray-label">${it.label}</span>
                </button>
              `).join('')}
            </div>

            <div class="pattern-creative-actions">
              <button type="button" id="btn-check-user-pattern" class="btn-pat-action btn-pat-check">
                ✨ ¡VERIFICAR PATRÓN!
              </button>
              <button type="button" id="btn-delete-last-pat" class="btn-pat-action btn-pat-reset">
                🔙 BORRAR ÚLTIMO
              </button>
              <button type="button" id="btn-reset-user-pat" class="btn-pat-action btn-pat-reset">
                🔄 EMPEZAR DE NUEVO
              </button>
            </div>
          </div>

          ${this.createActivityFooter()}
        </div>
      `;

      container.querySelectorAll('.btn-pat-theme').forEach(btn => {
        btn.onclick = () => {
          activeThemeIdx = parseInt(btn.dataset.tidx);
          this.onPlaySound('pop');
          renderUI();
        };
      });

      container.querySelectorAll('.pattern-tray-item').forEach(btn => {
        btn.onclick = () => {
          if (userSequence.length >= MAX_SLOTS) {
            this.updateByte("¡YA COMPLETASTE LOS 6 CASILLEROS! TOCÁ «VERIFICAR PATRÓN».", 'thinking');
            return;
          }
          const itemId = btn.dataset.id;
          const foundItem = currentTheme.items.find(it => it.id === itemId);
          if (foundItem) {
            userSequence.push(foundItem);
            this.onPlaySound('pop');
            renderUI();
          }
        };
      });

      const btnCheck = document.getElementById('btn-check-user-pattern');
      if (btnCheck) btnCheck.onclick = () => evaluateUserPattern();

      const btnDelete = document.getElementById('btn-delete-last-pat');
      if (btnDelete) {
        btnDelete.onclick = () => {
          if (userSequence.length > 0) {
            userSequence.pop();
            this.onPlaySound('trash');
            renderUI();
          }
        };
      }

      const btnResetStrip = document.getElementById('btn-reset-user-pat');
      if (btnResetStrip) {
        btnResetStrip.onclick = () => {
          userSequence = [];
          this.onPlaySound('trash');
          renderUI();
        };
      }

      this.wireResetButton(() => {
        userSequence = [];
        renderUI();
      });
      const btnNext = document.getElementById('btn-activity-next');
      if (btnNext) btnNext.onclick = () => this.nextActivity();
    };

    renderUI();
  }

  // 7. MINI DESAFÍO FINAL — DESAFÍO DE PATRONES (5 niveles consecutivos)
  renderPatternFinalChallenge(container, act) {
    let currentLvl = 0;
    const completedStars = [false, false, false, false, false];

    const drawLevel = (lvl) => {
      const levelData = act.levels[lvl];
      this.updateByte(
        `NIVEL ${lvl + 1} DE 5: ¡OBSERVÁ CON ATENCIÓN EL PATRÓN!`,
        'normal',
        `Nivel ${lvl + 1} de 5: Observá con atención el patrón.`
      );

      container.innerHTML = `
        <div class="pattern-game-area">
          ${this.createActivityHeader(act)}
          <div class="pattern-instruction-title">🏆 DESAFÍO DE PATRONES: ${levelData.title}</div>
          <div class="pattern-instruction-desc">${act.instruction}</div>

          <div class="pattern-final-stars-track">
            ${completedStars.map((achieved) => `
              <span class="pat-star-slot ${achieved ? 'achieved' : ''}">⭐</span>
            `).join('')}
          </div>

          <div class="pattern-seq-strip" id="final-seq-strip">
            ${levelData.isSlotFill
              ? levelData.template.map(itemKey => {
                  if (itemKey === null) {
                    return this.renderPatternCardHtml(null, { attrs: 'class="pattern-card-item slot-empty"' });
                  }
                  return this.renderPatternCardHtml(levelData.baseItems[itemKey]);
                }).join('')
              : levelData.seq.map(item => this.renderPatternCardHtml(item)).join('') + `<div id="final-slot-wrap">${this.renderPatternCardHtml(null)}</div>`
            }
          </div>

          <div class="pattern-options-area">
            <div class="pattern-options-title"><span>👉</span> ${levelData.isSlotFill ? 'TOCÁ LAS FIGURAS PARA LLENAR LOS DOS CASILLEROS:' : 'TOCÁ LA FIGURA QUE SIGUE:'}</div>
            <div class="pattern-choices-grid" id="final-choices-grid">
              ${(levelData.isSlotFill ? levelData.pool : levelData.options).map(opt => `
                <button type="button" class="pattern-choice-card" data-id="${opt.id}" style="border-color:${opt.border}; background:${opt.color};">
                  <span class="choice-icon">${opt.icon}</span>
                  <span class="choice-label">${opt.label}</span>
                </button>
              `).join('')}
            </div>
          </div>

          ${this.createActivityFooter()}
        </div>
      `;

      if (levelData.isSlotFill) {
        let filledSlots = [];
        const stripEl = document.getElementById('final-seq-strip');

        const updateSlotFillBoard = () => {
          let nullCounter = 0;
          stripEl.innerHTML = levelData.template.map((itemKey) => {
            if (itemKey !== null) {
              return this.renderPatternCardHtml(levelData.baseItems[itemKey]);
            }
            const filledItem = filledSlots[nullCounter];
            nullCounter++;
            if (filledItem) {
              return `
                <div class="pattern-card-item highlight" style="background:${filledItem.color}; border-color:${filledItem.border};">
                  <div class="card-icon">${filledItem.icon}</div>
                  <div class="card-label">${filledItem.label}</div>
                </div>
              `;
            }
            return `
              <div class="pattern-card-item slot-empty">
                <div class="card-icon">❓</div>
                <div class="card-label">TOCÁ ACÁ</div>
              </div>
            `;
          }).join('');
        };

        container.querySelectorAll('#final-choices-grid .pattern-choice-card').forEach(btn => {
          btn.onclick = () => {
            if (filledSlots.length >= 2) return;
            const itemId = btn.dataset.id;
            const foundItem = levelData.pool.find(p => p.id === itemId);
            if (foundItem) {
              filledSlots.push(foundItem);
              this.onPlaySound('pop');
              updateSlotFillBoard();

              if (filledSlots.length === 2) {
                const isMatch = filledSlots[0].id === levelData.expectedSlots[0] && filledSlots[1].id === levelData.expectedSlots[1];
                if (isMatch) {
                  completedStars[4] = true;
                  this.onPlaySound('fanfare');
                  this.onLaunchConfetti();
                  this.updateByte("¡FELICITACIONES! ¡SOS UN DETECTIVE DE PATRONES!", 'happy', "Felicitaciones. Sos un detective de patrones.");
                  this.recordActivitySuccess(act.id, 30);
                } else {
                  this.onPlaySound('wrong');
                  this.updateByte("¡CASI! REVISÁ EL ORDEN DE LAS DOS FIGURAS.", 'thinking');
                  this.recordAttemptError("REVISÁ EL ORDEN DE LAS DOS FIGURAS FALTANTES.");
                  setTimeout(() => {
                    filledSlots = [];
                    updateSlotFillBoard();
                  }, 1200);
                }
              }
            }
          };
        });

      } else {
        container.querySelectorAll('#final-choices-grid .pattern-choice-card').forEach(btn => {
          btn.onclick = () => {
            const chosenId = btn.dataset.id;
            if (chosenId === levelData.correct.id) {
              completedStars[lvl] = true;
              const slotWrap = document.getElementById('final-slot-wrap');
              if (slotWrap) {
                slotWrap.innerHTML = this.renderPatternCardHtml(levelData.correct, { className: 'highlight' });
              }
              this.onPlaySound('coin');
              this.updateByte(`¡NIVEL ${lvl + 1} COMPLETADO!`, 'happy', `Nivel ${lvl + 1} completado.`);

              setTimeout(() => {
                currentLvl++;
                drawLevel(currentLvl);
              }, 800);
            } else {
              btn.style.animation = 'shakePattern 0.5s ease';
              setTimeout(() => { btn.style.animation = ''; }, 600);
              this.onPlaySound('wrong');
              this.recordAttemptError("¡CASI! MIRÁ BIEN QUÉ FIGURAS SE REPITEN.");
            }
          };
        });
      }

      this.wireResetButton(() => {
        currentLvl = 0;
        for (let i = 0; i < completedStars.length; i++) completedStars[i] = false;
        drawLevel(0);
      });
      const btnNext = document.getElementById('btn-activity-next');
      if (btnNext) btnNext.onclick = () => this.nextActivity();
    };

    drawLevel(currentLvl);
  }

  /**
   * Conecta el botón de reinicio general de la actividad
   */
  wireResetButton(resetCallback) {
    const isPatterns = this.currentGrade === 1 && this.currentTopic === 'patterns';
    const btnReset = document.getElementById('btn-reset-current-activity');
    if (btnReset) {
      btnReset.onclick = () => {
        this.onPlaySound('trash');
        this.initActivityState(this.activityState.hints);
        this.updateHintsUI();
        this.updateByte(
          isPatterns ? "ACTIVIDAD REINICIADA. ¡COMENCEMOS DE NUEVO!" : "Actividad reiniciada. ¡Comencemos de nuevo!",
          'normal'
        );
        const feedbackBox = document.getElementById('activity-feedback-box');
        if (feedbackBox) feedbackBox.style.display = 'none';
        const btnNext = document.getElementById('btn-activity-next');
        if (btnNext) btnNext.style.display = 'none';
        if (typeof resetCallback === 'function') resetCallback();
      };
    }
  }


  // ========================================================
  // NUEVOS RENDERIZADORES DE ACTIVIDADES
  // ========================================================

  /**
   * 1. ¿QUÉ VA PRIMERO? / ¿QUÉ VA DESPUÉS? / ¿QUÉ HACEMOS AL FINAL?
   * Utilizado en 1.° y 2.° Grado (Instrucciones)
   */
  renderWhichFirstOrAfter(container, act) {
    let chIdx = 0;
    const isGradeOne = this.currentGrade === 1;

    const drawChallenge = (idx) => {
      const ch = act.challenges[idx];
      const promptText = isGradeOne ? ch.question.toUpperCase() : ch.question;
      this.updateByte(promptText, 'thinking', promptText);

      container.innerHTML = `
        <div class="quiz-box">
          ${this.createActivityHeader(act)}
          <div class="pattern-instruction-title">${isGradeOne ? `DESAFÍO ${idx + 1} DE ${act.challenges.length}` : `Desafío ${idx + 1} de ${act.challenges.length}`}</div>
          <p style="font-size:1.35rem; color:#1e293b; font-weight:800; margin:14px 0; text-align:center; ${isGradeOne ? 'text-transform:uppercase;' : ''}">
            ${ch.question}
          </p>

          <div class="which-first-container">
            <div class="which-first-grid">
              ${ch.options.map(opt => `
                <button type="button" class="btn-which-first" data-id="${opt.id}" data-correct="${opt.isCorrect}">
                  <span class="which-icon-big">${opt.icon}</span>
                  <span class="which-label-text" style="${isGradeOne ? 'text-transform:uppercase;' : ''}">${opt.label}</span>
                </button>
              `).join('')}
            </div>
          </div>

          ${this.createActivityFooter()}
        </div>
      `;

      const buttons = container.querySelectorAll('.btn-which-first');
      buttons.forEach(btn => {
        btn.onclick = () => {
          if (this.activityState.isCompleted) return;
          const isCorrect = btn.dataset.correct === 'true';

          if (isCorrect) {
            btn.classList.add('correct');
            buttons.forEach(b => { if (b !== btn) b.disabled = true; });
            this.onPlaySound('coin');

            const expl = isGradeOne
              ? (ch.explanation ? ch.explanation.toUpperCase() : '¡MUY BIEN! ELEGISTE LA ACCIÓN CORRECTA.')
              : (ch.explanation || '¡Muy bien! Elegiste la acción correcta.');

            this.updateByte(expl, 'happy', expl);

            setTimeout(() => {
              if (idx < act.challenges.length - 1) {
                chIdx++;
                drawChallenge(chIdx);
              } else {
                this.onPlaySound('fanfare');
                this.onLaunchConfetti();
                this.recordActivitySuccess(act.id, 15);
              }
            }, 950);
          } else {
            btn.classList.add('wrong');
            btn.style.animation = 'shakePattern 0.5s ease';
            setTimeout(() => { btn.style.animation = ''; btn.classList.remove('wrong'); }, 600);
            this.onPlaySound('wrong');

            const errorMsg = isGradeOne
              ? '¡CASI! PENSÁ CUÁL ES EL PASO QUE REALMENTE SE HACE PRIMERO.'
              : '¡Casi! Pensá cuál es el paso que realmente se hace primero.';
            this.updateByte(errorMsg, 'thinking', errorMsg);
            this.recordAttemptError(errorMsg);
          }
        };
      });

      this.wireResetButton(() => {
        chIdx = 0;
        drawChallenge(0);
      });
      const btnNext = document.getElementById('btn-activity-next');
      if (btnNext) btnNext.onclick = () => this.nextActivity();
    };

    drawChallenge(chIdx);
  }

  /**
   * 2. ENCONTRÁ EL ERROR EN EL PATRÓN (Figuras o Números)
   * Utilizado en 2.°, 3.°, 4.° y 5.° Grado (Patrones)
   */
  renderPatternFindError(container, act) {
    let chIdx = 0;
    const isGradeOne = this.currentGrade === 1;

    const drawChallenge = (idx) => {
      const ch = act.challenges[idx];
      const initialPrompt = isGradeOne
        ? 'UNA FIGURA ESTÁ FUERA DE LUGAR Y ROMPE EL PATRÓN. ¡TOCALA!'
        : 'Uno de los elementos está fuera de lugar y rompe la regla. ¡Tocalo!';
      this.updateByte(initialPrompt, 'normal', initialPrompt);

      container.innerHTML = `
        <div class="pattern-game-area">
          ${this.createActivityHeader(act)}
          <div class="pattern-instruction-title">${isGradeOne ? `DESAFÍO ${idx + 1} DE ${act.challenges.length}` : `Desafío ${idx + 1} de ${act.challenges.length}`}</div>
          <div class="pattern-instruction-desc" style="${isGradeOne ? 'text-transform:uppercase;' : ''}">${act.instruction}</div>

          <div class="pattern-seq-strip" id="error-seq-strip">
            ${ch.seq.map((item, i) => {
              if (ch.isNumber) {
                return `
                  <div class="pattern-card-item number-card clickable" data-idx="${i}" data-error="${item.isError || false}" style="background:#f8fafc; border-color:#cbd5e1; width:85px; height:95px;">
                    <div class="card-icon" style="font-size:2.4rem; font-weight:900; color:#0284c7;">${item.label}</div>
                  </div>
                `;
              }
              return `
                <div class="pattern-card-item clickable" data-idx="${i}" data-error="${item.isError || false}" style="background:${item.color || '#fff'}; border-color:${item.border || '#cbd5e1'};">
                  <div class="card-icon">${item.icon}</div>
                  <div class="card-label">${item.label}</div>
                </div>
              `;
            }).join('')}
          </div>

          <div style="text-align:center; margin-top:12px; font-weight:700; color:#475569;">
            <span>👉</span> ${isGradeOne ? 'HACÉ CLIC SOBRE LA TARJETA QUE TIENE EL ERROR' : 'Hacé clic sobre la tarjeta que tiene el error'}
          </div>

          ${this.createActivityFooter()}
        </div>
      `;

      const cards = container.querySelectorAll('#error-seq-strip .pattern-card-item');
      cards.forEach(card => {
        card.onclick = () => {
          if (this.activityState.isCompleted) return;
          const isError = card.dataset.error === 'true';

          if (isError) {
            card.classList.add('error-detected');
            this.onPlaySound('coin');

            const expl = isGradeOne
              ? (ch.ruleDesc ? ch.ruleDesc.toUpperCase() : '¡EXCELENTE! ENCONTRASTE EL ELEMENTO EQUIVOCADO.')
              : (ch.ruleDesc || '¡Excelente! Encontraste el elemento que rompía la regla.');

            this.updateByte(expl, 'happy', expl);

            setTimeout(() => {
              if (idx < act.challenges.length - 1) {
                chIdx++;
                drawChallenge(chIdx);
              } else {
                this.onPlaySound('fanfare');
                this.onLaunchConfetti();
                this.recordActivitySuccess(act.id, 20);
              }
            }, 1100);
          } else {
            card.style.animation = 'shakePattern 0.5s ease';
            setTimeout(() => { card.style.animation = ''; }, 600);
            this.onPlaySound('wrong');

            const hintMsg = isGradeOne
              ? '¡CASI! ESA TARJETA SÍ ESTÁ BIEN. BUSCÁ OTRA QUE ESTÉ EN EL LUGAR EQUIVOCADO.'
              : '¡Casi! Esa tarjeta sí cumple la regla. Buscá cuál está fuera de lugar.';
            this.updateByte(hintMsg, 'thinking', hintMsg);
            this.recordAttemptError(hintMsg);
          }
        };
      });

      this.wireResetButton(() => {
        chIdx = 0;
        drawChallenge(0);
      });
      const btnNext = document.getElementById('btn-activity-next');
      if (btnNext) btnNext.onclick = () => this.nextActivity();
    };

    drawChallenge(chIdx);
  }

  /**
   * 3. DESCUBRÍ LA REGLA
   * Utilizado en 2.°, 3.°, 4.° y 5.° Grado (Patrones)
   */
  renderPatternDiscoverRule(container, act) {
    let chIdx = 0;
    const isGradeOne = this.currentGrade === 1;

    const drawChallenge = (idx) => {
      const ch = act.challenges[idx];
      const prompt = isGradeOne ? '¿QUÉ REGLA DESCRIBE ESTE PATRÓN?' : '¿Qué regla matemática o rítmica describe este patrón?';
      this.updateByte(prompt, 'normal', prompt);

      container.innerHTML = `
        <div class="pattern-game-area">
          ${this.createActivityHeader(act)}
          <div class="pattern-instruction-title">${isGradeOne ? `DESAFÍO ${idx + 1} DE ${act.challenges.length}` : `Desafío ${idx + 1} de ${act.challenges.length}`}</div>
          <div class="pattern-instruction-desc" style="${isGradeOne ? 'text-transform:uppercase;' : ''}">${act.instruction}</div>

          <div class="pattern-seq-strip">
            ${ch.isNumber
              ? ch.numbers.map(num => `
                  <div class="pattern-card-item number-card" style="background:#f8fafc; border-color:#0284c7; width:85px; height:95px;">
                    <div class="card-icon" style="font-size:2.4rem; color:#0284c7; font-weight:900;">${num}</div>
                  </div>
                `).join('')
              : ch.seq.map(item => `
                  <div class="pattern-card-item" style="background:${item.color || '#fff'}; border-color:${item.border || '#cbd5e1'};">
                    <div class="card-icon">${item.icon}</div>
                    <div class="card-label">${item.label}</div>
                  </div>
                `).join('')
            }
          </div>

          <div style="margin-top:16px; text-align:center;">
            <h4 style="font-size:1.35rem; color:#1e293b; font-weight:900; margin-bottom:12px;">${ch.question}</h4>
            <div class="rule-options-grid" style="margin: 0 auto;">
              ${ch.options.map(opt => `
                <button type="button" class="rule-opt-btn" data-id="${opt.id}" data-correct="${opt.isCorrect}">
                  ${opt.badge ? `<span class="rule-pill-badge">${opt.badge}</span>` : ''}
                  <span>${opt.text}</span>
                </button>
              `).join('')}
            </div>
          </div>

          ${this.createActivityFooter()}
        </div>
      `;

      const buttons = container.querySelectorAll('.rule-opt-btn');
      buttons.forEach(btn => {
        btn.onclick = () => {
          if (this.activityState.isCompleted) return;
          const isCorrect = btn.dataset.correct === 'true';

          if (isCorrect) {
            btn.classList.add('correct');
            buttons.forEach(b => { if (b !== btn) b.disabled = true; });
            this.onPlaySound('coin');

            const successMsg = isGradeOne
              ? '¡EXCELENTE! DESCUBRISTE LA REGLA DEL PATRÓN.'
              : '¡Excelente! Descubriste la regla matemática del patrón.';
            this.updateByte(successMsg, 'happy', successMsg);

            setTimeout(() => {
              if (idx < act.challenges.length - 1) {
                chIdx++;
                drawChallenge(chIdx);
              } else {
                this.onPlaySound('fanfare');
                this.onLaunchConfetti();
                this.recordActivitySuccess(act.id, 20);
              }
            }, 950);
          } else {
            btn.classList.add('wrong');
            btn.style.animation = 'shakePattern 0.5s ease';
            setTimeout(() => { btn.style.animation = ''; btn.classList.remove('wrong'); }, 600);
            this.onPlaySound('wrong');

            const errorMsg = isGradeOne
              ? '¡CASI! REVISÁ DE NUEVO LA CANTIDAD QUE SE REPITE.'
              : '¡Casi! Observá con atención cómo cambia cada número o figura.';
            this.updateByte(errorMsg, 'thinking', errorMsg);
            this.recordAttemptError(errorMsg);
          }
        };
      });

      this.wireResetButton(() => {
        chIdx = 0;
        drawChallenge(0);
      });
      const btnNext = document.getElementById('btn-activity-next');
      if (btnNext) btnNext.onclick = () => this.nextActivity();
    };

    drawChallenge(chIdx);
  }

  /**
   * 4. COMPLETÁ EL PATRÓN NUMÉRICO (Un solo hueco)
   * Utilizado en 4.° y 5.° Grado (Patrones)
   */
  renderPatternNumericFill(container, act) {
    let chIdx = 0;

    const drawChallenge = (idx) => {
      const ch = act.challenges[idx];
      this.updateByte("Descubrí el salto numérico y tocá el número que continúa la serie:", 'normal');

      container.innerHTML = `
        <div class="pattern-game-area">
          ${this.createActivityHeader(act)}
          <div class="pattern-instruction-title">Desafío ${idx + 1} de ${act.challenges.length}</div>
          <div class="pattern-instruction-desc">${act.instruction}</div>

          <div class="pattern-seq-strip" id="num-strip">
            ${ch.seq.map(num => {
              if (num === null) {
                return `
                  <div class="pattern-card-item number-card slot-empty" id="num-slot" style="background:#fffbeb; border-color:#f59e0b; width:90px; height:100px;">
                    <div class="card-icon" style="font-size:2.4rem; color:#b45309; animation:slotPulse 1.2s infinite alternate;">❓</div>
                  </div>
                `;
              }
              return `
                <div class="pattern-card-item number-card" style="background:#f8fafc; border-color:#0284c7; width:90px; height:100px;">
                  <div class="card-icon" style="font-size:2.4rem; color:#0284c7; font-weight:900;">${num}</div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="pattern-options-area">
            <div class="pattern-options-title"><span>👉</span> Tocá el número que sigue:</div>
            <div class="pattern-choices-grid">
              ${ch.options.map(opt => `
                <button type="button" class="pattern-choice-card number-card" data-val="${opt}" style="background:#f0f9ff; border-color:#0284c7; width:95px; height:95px;">
                  <span class="choice-icon" style="font-size:2.2rem; font-weight:900; color:#0284c7;">${opt}</span>
                </button>
              `).join('')}
            </div>
          </div>

          ${this.createActivityFooter()}
        </div>
      `;

      const slot = document.getElementById('num-slot');
      const buttons = container.querySelectorAll('.pattern-choices-grid .pattern-choice-card');

      buttons.forEach(btn => {
        btn.onclick = () => {
          if (this.activityState.isCompleted) return;
          const chosenVal = parseInt(btn.dataset.val, 10);

          if (chosenVal === ch.correct) {
            btn.disabled = true;
            if (slot) {
              slot.className = 'pattern-card-item number-card correct-revealed';
              slot.innerHTML = `<div class="card-icon" style="font-size:2.4rem; color:#15803d; font-weight:900;">${ch.correct}</div>`;
            }
            this.onPlaySound('coin');
            const msg = ch.ruleHint ? `¡Muy bien! ${ch.ruleHint}` : "¡Excelente! Completaste la serie numérica.";
            this.updateByte(msg, 'happy', msg);

            setTimeout(() => {
              if (idx < act.challenges.length - 1) {
                chIdx++;
                drawChallenge(chIdx);
              } else {
                this.onPlaySound('fanfare');
                this.onLaunchConfetti();
                this.recordActivitySuccess(act.id, 20);
              }
            }, 950);
          } else {
            btn.style.animation = 'shakePattern 0.5s ease';
            setTimeout(() => { btn.style.animation = ''; }, 600);
            this.onPlaySound('wrong');
            const errMsg = "¡Casi! Revisá la diferencia entre los números vecinos.";
            this.updateByte(errMsg, 'thinking', errMsg);
            this.recordAttemptError(errMsg);
          }
        };
      });

      this.wireResetButton(() => {
        chIdx = 0;
        drawChallenge(0);
      });
      const btnNext = document.getElementById('btn-activity-next');
      if (btnNext) btnNext.onclick = () => this.nextActivity();
    };

    drawChallenge(chIdx);
  }

  /**
   * 5. COMPLETÁ VARIOS PASOS NUMÉRICOS
   * Utilizado en 4.° Grado (Patrones)
   */
  renderPatternNumericMulti(container, act) {
    let chIdx = 0;

    const drawChallenge = (idx) => {
      const ch = act.challenges[idx];
      let filledValues = [];
      const totalToFill = ch.expected.length;
      this.updateByte("Descubrí la regla y completá los números que faltan en orden:", 'normal');

      const renderBoard = () => {
        container.innerHTML = `
          <div class="pattern-game-area">
            ${this.createActivityHeader(act)}
            <div class="pattern-instruction-title">Desafío ${idx + 1} de ${act.challenges.length}</div>
            <div class="pattern-instruction-desc">${act.instruction}</div>

            <div class="pattern-seq-strip">
              ${ch.base.map(num => `
                <div class="pattern-card-item number-card" style="background:#f8fafc; border-color:#0284c7; width:85px; height:95px;">
                  <div class="card-icon" style="font-size:2.2rem; color:#0284c7; font-weight:900;">${num}</div>
                </div>
              `).join('')}

              ${ch.expected.map((_, slotI) => {
                const filled = filledValues[slotI];
                if (filled !== undefined) {
                  return `
                    <div class="pattern-card-item number-card highlight" style="background:#dcfce7; border-color:#22c55e; width:85px; height:95px;">
                      <div class="card-icon" style="font-size:2.2rem; color:#15803d; font-weight:900;">${filled}</div>
                    </div>
                  `;
                }
                return `
                  <div class="pattern-card-item number-card slot-empty" style="background:#fffbeb; border-color:#f59e0b; width:85px; height:95px;">
                    <div class="card-icon" style="font-size:2.2rem; color:#b45309;">❓</div>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="pattern-options-area">
              <div class="pattern-options-title"><span>👉</span> Tocá el siguiente número (${filledValues.length}/${totalToFill}):</div>
              <div class="pattern-choices-grid">
                ${ch.optionsPool.map(opt => `
                  <button type="button" class="pattern-choice-card number-card" data-val="${opt}" style="background:#f0f9ff; border-color:#0284c7; width:85px; height:85px;">
                    <span class="choice-icon" style="font-size:2rem; font-weight:900; color:#0284c7;">${opt}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            ${this.createActivityFooter()}
          </div>
        `;

        container.querySelectorAll('.pattern-choices-grid .pattern-choice-card').forEach(btn => {
          btn.onclick = () => {
            if (filledValues.length >= totalToFill) return;
            const chosenVal = parseInt(btn.dataset.val, 10);
            const nextNeeded = ch.expected[filledValues.length];

            if (chosenVal === nextNeeded) {
              filledValues.push(chosenVal);
              this.onPlaySound('coin');
              renderBoard();

              if (filledValues.length === totalToFill) {
                const successMsg = ch.ruleDesc ? `¡Excelente! ${ch.ruleDesc}` : "¡Completaste todos los números!";
                this.updateByte(successMsg, 'happy', successMsg);

                setTimeout(() => {
                  if (idx < act.challenges.length - 1) {
                    chIdx++;
                    drawChallenge(chIdx);
                  } else {
                    this.onPlaySound('fanfare');
                    this.onLaunchConfetti();
                    this.recordActivitySuccess(act.id, 20);
                  }
                }, 950);
              }
            } else {
              btn.style.animation = 'shakePattern 0.5s ease';
              setTimeout(() => { btn.style.animation = ''; }, 600);
              this.onPlaySound('wrong');
              this.updateByte("¡Casi! Recordá sumar el salto constante.", 'thinking');
              this.recordAttemptError("Revisá el salto entre los números.");
            }
          };
        });

        this.wireResetButton(() => {
          filledValues = [];
          renderBoard();
        });
        const btnNext = document.getElementById('btn-activity-next');
        if (btnNext) btnNext.onclick = () => this.nextActivity();
      };

      renderBoard();
    };

    drawChallenge(chIdx);
  }

  /**
   * 6. PATRONES COMBINADOS (Formas + Números)
   * Utilizado en 4.° Grado (Patrones)
   */
  renderPatternCombined(container, act) {
    let chIdx = 0;

    const drawChallenge = (idx) => {
      const ch = act.challenges[idx];
      this.updateByte("Este patrón combina un color o forma con un número. ¿Cuál continúa?", 'normal');

      container.innerHTML = `
        <div class="pattern-game-area">
          ${this.createActivityHeader(act)}
          <div class="pattern-instruction-title">Desafío ${idx + 1} de ${act.challenges.length}</div>
          <div class="pattern-instruction-desc">${act.instruction}</div>

          <div class="pattern-seq-strip" id="combined-strip">
            ${ch.seq.map(item => `
              <div class="pattern-card-item" style="background:${item.color}; border-color:${item.border}; width:95px; height:105px;">
                <div class="card-icon" style="font-size:2.6rem; margin-bottom:2px;">${item.icon}</div>
                <div class="card-label" style="font-size:1.4rem; font-weight:900; color:#1e293b;">${item.num}</div>
              </div>
            `).join('')}

            <div id="combined-slot-wrap">
              ${this.renderPatternCardHtml(null, { attrs: 'style="width:95px; height:105px;"' })}
            </div>
          </div>

          <div class="pattern-options-area">
            <div class="pattern-options-title"><span>👉</span> Tocá la tarjeta combinada correcta:</div>
            <div class="pattern-choices-grid">
              ${ch.options.map((opt, oI) => `
                <button type="button" class="pattern-choice-card" data-idx="${oI}" style="background:${opt.color}; border-color:${opt.border}; width:100px; height:100px;">
                  <span class="choice-icon" style="font-size:2.4rem;">${opt.icon}</span>
                  <span class="choice-label" style="font-size:1.3rem; font-weight:900; color:#1e293b;">${opt.num}</span>
                </button>
              `).join('')}
            </div>
          </div>

          ${this.createActivityFooter()}
        </div>
      `;

      const slotWrap = document.getElementById('combined-slot-wrap');
      const buttons = container.querySelectorAll('.pattern-choices-grid .pattern-choice-card');

      buttons.forEach(btn => {
        btn.onclick = () => {
          if (this.activityState.isCompleted) return;
          const optIdx = parseInt(btn.dataset.idx, 10);
          const chosen = ch.options[optIdx];
          const isCorrect = chosen.icon === ch.correct.icon && chosen.num === ch.correct.num;

          if (isCorrect) {
            btn.disabled = true;
            if (slotWrap) {
              slotWrap.innerHTML = `
                <div class="pattern-card-item highlight" style="background:${ch.correct.color}; border-color:${ch.correct.border}; width:95px; height:105px;">
                  <div class="card-icon" style="font-size:2.6rem;">${ch.correct.icon}</div>
                  <div class="card-label" style="font-size:1.4rem; font-weight:900;">${ch.correct.num}</div>
                </div>
              `;
            }
            this.onPlaySound('coin');
            const msg = ch.ruleDesc || "¡Excelente! Acertaste tanto la figura como el número.";
            this.updateByte(msg, 'happy', msg);

            setTimeout(() => {
              if (idx < act.challenges.length - 1) {
                chIdx++;
                drawChallenge(chIdx);
              } else {
                this.onPlaySound('fanfare');
                this.onLaunchConfetti();
                this.recordActivitySuccess(act.id, 20);
              }
            }, 950);
          } else {
            btn.style.animation = 'shakePattern 0.5s ease';
            setTimeout(() => { btn.style.animation = ''; }, 600);
            this.onPlaySound('wrong');
            const errMsg = "¡Casi! Revisá si coincide la figura y también el valor numérico.";
            this.updateByte(errMsg, 'thinking', errMsg);
            this.recordAttemptError(errMsg);
          }
        };
      });

      this.wireResetButton(() => {
        chIdx = 0;
        drawChallenge(0);
      });
      const btnNext = document.getElementById('btn-activity-next');
      if (btnNext) btnNext.onclick = () => this.nextActivity();
    };

    drawChallenge(chIdx);
  }

  /**
   * 7. DOS REGLAS ALTERNADAS
   * Utilizado en 5.° Grado (Patrones)
   */
  renderPatternTwoRules(container, act) {
    let chIdx = 0;

    const drawChallenge = (idx) => {
      const ch = act.challenges[idx];
      this.updateByte("Esta serie alterna dos reglas distintas en cada paso. ¡Descubrí cuál sigue!", 'normal');

      container.innerHTML = `
        <div class="pattern-game-area">
          ${this.createActivityHeader(act)}
          <div class="pattern-instruction-title">Desafío ${idx + 1} de ${act.challenges.length}</div>
          <div class="pattern-instruction-desc">${act.instruction}</div>

          <div class="two-rules-header">
            <span class="two-rules-tag">Regla 1: <strong>${ch.rule1}</strong></span>
            <span class="two-rules-tag">Regla 2: <strong>${ch.rule2}</strong></span>
          </div>

          <div class="pattern-seq-strip" id="two-rules-strip">
            ${ch.seq.map((num, i) => {
              if (num === null) {
                return `
                  <div class="pattern-card-item number-card slot-empty" id="two-rule-slot" style="background:#fffbeb; border-color:#f59e0b; width:85px; height:95px;">
                    <div class="card-icon" style="font-size:2.2rem; color:#b45309;">❓</div>
                  </div>
                `;
              }
              const ruleTag = ch.rules[i - 1] ? `<span style="position:absolute; top:-12px; font-size:0.8rem; background:#0284c7; color:white; padding:1px 6px; border-radius:8px;">${ch.rules[i - 1]}</span>` : '';
              return `
                <div class="pattern-card-item number-card" style="background:#f8fafc; border-color:#0284c7; width:85px; height:95px; position:relative;">
                  ${ruleTag}
                  <div class="card-icon" style="font-size:2.2rem; color:#0284c7; font-weight:900;">${num}</div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="pattern-options-area">
            <div class="pattern-options-title"><span>👉</span> Elegí el siguiente número:</div>
            <div class="pattern-choices-grid">
              ${ch.options.map(opt => `
                <button type="button" class="pattern-choice-card number-card" data-val="${opt}" style="background:#f0f9ff; border-color:#0284c7; width:90px; height:90px;">
                  <span class="choice-icon" style="font-size:2.2rem; font-weight:900; color:#0284c7;">${opt}</span>
                </button>
              `).join('')}
            </div>
          </div>

          ${this.createActivityFooter()}
        </div>
      `;

      const slot = document.getElementById('two-rule-slot');
      const buttons = container.querySelectorAll('.pattern-choices-grid .pattern-choice-card');

      buttons.forEach(btn => {
        btn.onclick = () => {
          if (this.activityState.isCompleted) return;
          const chosenVal = parseInt(btn.dataset.val, 10);

          if (chosenVal === ch.correct) {
            btn.disabled = true;
            if (slot) {
              slot.className = 'pattern-card-item number-card correct-revealed';
              slot.innerHTML = `<div class="card-icon" style="font-size:2.2rem; color:#15803d; font-weight:900;">${ch.correct}</div>`;
            }
            this.onPlaySound('coin');
            const msg = ch.explanation || "¡Genial! Dominaste la alternancia de reglas.";
            this.updateByte(msg, 'happy', msg);

            setTimeout(() => {
              if (idx < act.challenges.length - 1) {
                chIdx++;
                drawChallenge(chIdx);
              } else {
                this.onPlaySound('fanfare');
                this.onLaunchConfetti();
                this.recordActivitySuccess(act.id, 25);
              }
            }, 950);
          } else {
            btn.style.animation = 'shakePattern 0.5s ease';
            setTimeout(() => { btn.style.animation = ''; }, 600);
            this.onPlaySound('wrong');
            const errMsg = "¡Casi! Revisá cuál de las dos reglas correspondía aplicar en este turno.";
            this.updateByte(errMsg, 'thinking', errMsg);
            this.recordAttemptError(errMsg);
          }
        };
      });

      this.wireResetButton(() => {
        chIdx = 0;
        drawChallenge(0);
      });
      const btnNext = document.getElementById('btn-activity-next');
      if (btnNext) btnNext.onclick = () => this.nextActivity();
    };

    drawChallenge(chIdx);
  }

  /**
   * 8. ELEGÍ EL CAMINO CORRECTO (Mapas sencillos)
   * Utilizado en 3.° Grado (Instrucciones)
   */
  renderChoosePath(container, act) {
    let chIdx = 0;

    const drawChallenge = (idx) => {
      const ch = act.challenges[idx];
      this.updateByte(ch.instruction || "Observá el mapa y elegí el camino seguro hacia la corona sin chocar:", 'thinking');

      let currentBytePos = { ...ch.map.start };
      let trails = [];
      let isSimulating = false;

      const mapHtml = this.createVisualMapHtml(ch.map, currentBytePos, trails);

      container.innerHTML = `
        <div class="quiz-box">
          ${this.createActivityHeader(act)}
          <div class="pattern-instruction-title">Desafío ${idx + 1} de ${act.challenges.length}</div>
          <p style="font-size:1.15rem; color:#1e293b; font-weight:800; margin:10px 0; text-align:center;">
            ${ch.question}
          </p>

          ${mapHtml}

          <div style="font-weight:700; color:#0369a1; text-align:center; margin:10px 0 6px 0;">
            Elegí el camino que debe ejecutar Byte:
          </div>

          <div class="choose-path-grid">
            ${ch.paths.map(p => `
              <button type="button" class="choose-path-card" data-id="${p.id}" data-correct="${p.isCorrect}">
                <strong style="font-size:1.2rem; color:#0369a1;">${p.name}</strong>
                <div class="path-arrows-strip" style="font-size:1.5rem; letter-spacing:4px; margin-top:4px;">
                  ${p.arrows.join(' ')}
                </div>
              </button>
            `).join('')}
          </div>

          ${this.createActivityFooter()}
        </div>
      `;

      const cards = container.querySelectorAll('.choose-path-card');

      const refreshMap = () => {
        const activeMap = document.getElementById('byte-active-visual-map');
        if (activeMap) {
          activeMap.outerHTML = this.createVisualMapHtml(ch.map, currentBytePos, trails);
        }
      };

      cards.forEach(card => {
        card.onclick = async () => {
          if (this.activityState.isCompleted || isSimulating) return;
          const pid = card.dataset.id;
          const p = ch.paths.find(path => path.id === pid);
          if (!p) return;

          isSimulating = true;
          cards.forEach(c => c.disabled = true);

          // Simular el movimiento paso a paso de Byte en el mapa
          currentBytePos = { ...ch.map.start };
          trails = [];
          refreshMap();

          let crashed = false;
          for (let step = 0; step < p.arrows.length; step++) {
            await new Promise(r => setTimeout(r, 420));
            trails.push({ ...currentBytePos });
            const arrow = p.arrows[step];

            let nextX = currentBytePos.x;
            let nextY = currentBytePos.y;
            if (arrow === '➡️') nextX++;
            else if (arrow === '⬅️') nextX--;
            else if (arrow === '⬇️') nextY++;
            else if (arrow === '⬆️') nextY--;

            const hitObs = (ch.map.obstacles || []).find(o => o.x === nextX && o.y === nextY);
            if (hitObs) {
              crashed = true;
              currentBytePos = { x: nextX, y: nextY };
              refreshMap();
              const hitCell = document.getElementById(`map-cell-${nextX}-${nextY}`);
              if (hitCell) hitCell.className += ' cell-crash';
              this.onPlaySound('hit');
              break;
            }

            currentBytePos = { x: nextX, y: nextY };
            this.onPlaySound('pop');
            refreshMap();
          }

          await new Promise(r => setTimeout(r, 350));

          if (p.isCorrect && !crashed) {
            card.classList.add('correct');
            this.onPlaySound('coin');
            this.updateByte(p.successMsg || "¡Excelente! Llegaste a salvo a la meta.", 'happy');

            setTimeout(() => {
              if (idx < act.challenges.length - 1) {
                chIdx++;
                drawChallenge(chIdx);
              } else {
                this.onPlaySound('fanfare');
                this.onLaunchConfetti();
                this.recordActivitySuccess(act.id, 20);
              }
            }, 1100);
          } else {
            card.classList.add('wrong');
            card.style.animation = 'shakePattern 0.5s ease';
            this.onPlaySound('wrong');
            this.updateByte(p.failMsg || "¡Cuidado! Ese camino choca contra un obstáculo.", 'worried');
            this.recordAttemptError(p.failMsg || "Ese camino choca contra un obstáculo.");

            setTimeout(() => {
              card.style.animation = '';
              card.classList.remove('wrong');
              currentBytePos = { ...ch.map.start };
              trails = [];
              refreshMap();
              cards.forEach(c => c.disabled = false);
              isSimulating = false;
            }, 1200);
          }
        };
      });

      this.wireResetButton(() => {
        chIdx = 0;
        drawChallenge(0);
      });
      const btnNext = document.getElementById('btn-activity-next');
      if (btnNext) btnNext.onclick = () => this.nextActivity();
    };

    drawChallenge(chIdx);
  }

  /**
   * 9. REPETÍ UN PASO (BUCLES / LOOPS)
   * Utilizado en 5.° Grado (Instrucciones)
   */
  renderLoopConcept(container, act) {
    let chIdx = 0;

    const drawChallenge = (idx) => {
      const ch = act.challenges[idx];
      this.updateByte("En programación, usamos bucles para no repetir el mismo código: ⬆️ × 4.", 'normal');

      container.innerHTML = `
        <div class="quiz-box">
          ${this.createActivityHeader(act)}
          <div class="pattern-instruction-title">Desafío ${idx + 1} de ${act.challenges.length}</div>
          <p style="font-size:1.25rem; color:#1e293b; font-weight:800; margin:14px 0; text-align:center;">
            ${ch.question}
          </p>

          <div class="loop-concept-wrapper">
            <div class="loop-compare-box">
              <div class="loop-visual-side">
                <span style="font-size:0.95rem; font-weight:700; color:#64748b;">Secuencia larga:</span>
                <div style="font-size:2.2rem;">${ch.sequence.join(' ')}</div>
              </div>
              <div class="loop-equal-sign">=</div>
              <div class="loop-visual-side">
                <span style="font-size:0.95rem; font-weight:700; color:#0284c7;">¿Cómo se abrevia con un bucle?</span>
                <div class="loop-pill-tag">❓ BUCLE</div>
              </div>
            </div>

            <div class="rule-options-grid">
              ${ch.options.map(opt => `
                <button type="button" class="rule-opt-btn" data-id="${opt.id}" data-correct="${opt.isCorrect}">
                  ${opt.badge ? `<span class="rule-pill-badge">${opt.badge}</span>` : ''}
                  <strong style="font-size:1.4rem;">${opt.text}</strong>
                </button>
              `).join('')}
            </div>
          </div>

          ${this.createActivityFooter()}
        </div>
      `;

      const buttons = container.querySelectorAll('.rule-opt-btn');
      buttons.forEach(btn => {
        btn.onclick = () => {
          if (this.activityState.isCompleted) return;
          const isCorrect = btn.dataset.correct === 'true';

          if (isCorrect) {
            btn.classList.add('correct');
            buttons.forEach(b => { if (b !== btn) b.disabled = true; });
            this.onPlaySound('coin');
            const msg = ch.explanation || "¡Exacto! El bucle comprime la secuencia.";
            this.updateByte(msg, 'happy', msg);

            setTimeout(() => {
              if (idx < act.challenges.length - 1) {
                chIdx++;
                drawChallenge(chIdx);
              } else {
                this.onPlaySound('fanfare');
                this.onLaunchConfetti();
                this.recordActivitySuccess(act.id, 20);
              }
            }, 950);
          } else {
            btn.classList.add('wrong');
            btn.style.animation = 'shakePattern 0.5s ease';
            setTimeout(() => { btn.style.animation = ''; btn.classList.remove('wrong'); }, 600);
            this.onPlaySound('wrong');
            this.updateByte("¡Casi! Contá cuántas flechas iguales hay en la fila.", 'thinking');
            this.recordAttemptError("Contá cuántas veces se repite la flecha.");
          }
        };
      });

      this.wireResetButton(() => {
        chIdx = 0;
        drawChallenge(0);
      });
      const btnNext = document.getElementById('btn-activity-next');
      if (btnNext) btnNext.onclick = () => this.nextActivity();
    };

    drawChallenge(chIdx);
  }

  /**
   * 10. RESOLVÉ CON MENOS PASOS (OPTIMIZACIÓN)
   * Utilizado en 5.° Grado (Instrucciones)
   */
  renderOptimizeSteps(container, act) {
    let chIdx = 0;

    const drawChallenge = (idx) => {
      const ch = act.challenges[idx];
      this.updateByte("En informática, el código más limpio y corto suele ser el más eficiente. ¿Cuál elegís?", 'normal');

      container.innerHTML = `
        <div class="quiz-box">
          ${this.createActivityHeader(act)}
          <div class="pattern-instruction-title">Desafío ${idx + 1} de ${act.challenges.length}</div>
          <p style="font-size:1.25rem; color:#1e293b; font-weight:800; margin:14px 0; text-align:center;">
            ${ch.problem}
          </p>

          <div class="optimize-grid">
            ${ch.algorithms.map((alg, aIdx) => `
              <button type="button" class="optimize-card" data-id="${alg.id}" data-optimal="${alg.isOptimal}">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="font-size:1.2rem; color:#0369a1;">${alg.title}</strong>
                  <span class="optimize-steps-badge" style="background:#e0f2fe; color:#0369a1;">Opción ${aIdx === 0 ? 'A' : 'B'}</span>
                </div>
                <pre style="background:#f1f5f9; padding:12px; border-radius:12px; font-family:monospace; font-size:1.05rem; text-align:left; margin:8px 0; line-height:1.4;">${alg.codeText}</pre>
                <div class="optimize-reveal-feedback" style="display:none; font-size:0.95rem; color:#1e293b; text-align:left; font-weight:600; margin-top:6px;">
                  ${alg.desc} (${alg.stepsCount} pasos)
                </div>
              </button>
            `).join('')}
          </div>

          ${this.createActivityFooter()}
        </div>
      `;

      const cards = container.querySelectorAll('.optimize-card');
      cards.forEach(card => {
        card.onclick = () => {
          if (this.activityState.isCompleted) return;
          const isOptimal = card.dataset.optimal === 'true';

          // Revelar descripciones y conteos de pasos en ambos algoritmos
          container.querySelectorAll('.optimize-reveal-feedback').forEach(el => {
            el.style.display = 'block';
          });

          if (isOptimal) {
            card.classList.add('correct');
            cards.forEach(c => { if (c !== card) c.disabled = true; });
            this.onPlaySound('coin');
            const msg = ch.explanation || "¡Excelente! El algoritmo óptimo usa menos instrucciones.";
            this.updateByte(msg, 'happy', msg);

            setTimeout(() => {
              if (idx < act.challenges.length - 1) {
                chIdx++;
                drawChallenge(chIdx);
              } else {
                this.onPlaySound('fanfare');
                this.onLaunchConfetti();
                this.recordActivitySuccess(act.id, 20);
              }
            }, 1200);
          } else {
            card.classList.add('wrong');
            card.style.animation = 'shakePattern 0.5s ease';
            setTimeout(() => { card.style.animation = ''; card.classList.remove('wrong'); }, 600);
            this.onPlaySound('wrong');
            this.updateByte("¡Funciona, pero no es el más corto! Buscá el que usa bucles.", 'thinking');
            this.recordAttemptError("Ese algoritmo funciona pero utiliza más instrucciones.");
          }
        };
      });

      this.wireResetButton(() => {
        chIdx = 0;
        drawChallenge(0);
      });
      const btnNext = document.getElementById('btn-activity-next');
      if (btnNext) btnNext.onclick = () => this.nextActivity();
    };

    drawChallenge(chIdx);
  }


  // ========================================================
  // MODAL DE VICTORIA FINAL DEL TEMA O GRADO
  // ========================================================
  renderVictoryModal() {
    this.cleanupCurrentActivity();
    this.onPlaySound('fanfare');
    this.onLaunchConfetti();

    const gConfig = CODING_DATA.grades[this.currentGrade];
    const progress = this.storage.getGradeProgress(this.currentGrade, this.currentTopic);
    const container = document.getElementById('coding-stage-container');
    if (!container) return;

        if (this.currentTopic === 'patterns') {
      const isGradeOne = this.currentGrade === 1;
      container.innerHTML = `
        <div style="display:flex; justify-content:center; align-items:center; padding:20px 0;">
          <div class="coding-victory-card" style="border-color: #f59e0b; text-align: center;">
            <div class="victory-badge-icon" style="font-size: 4.5rem;">🏆</div>
            <h2 class="victory-title" style="color: #b45309; font-size: 2.2rem; text-transform: uppercase;">
              🎉 ${isGradeOne ? '¡MISIÓN CUMPLIDA!' : '¡Misión Cumplida!'} 🎉
            </h2>
            <div class="pattern-final-stars-track" style="margin: 14px auto; max-width: 320px;">
              <span class="pat-star-slot achieved">⭐</span>
              <span class="pat-star-slot achieved">⭐</span>
              <span class="pat-star-slot achieved">⭐</span>
              <span class="pat-star-slot achieved">⭐</span>
              <span class="pat-star-slot achieved">⭐</span>
            </div>
            <h3 style="font-size: 1.6rem; color: #1e293b; text-transform: uppercase; margin-bottom: 10px;">
              ${isGradeOne ? '¡SOS UN DETECTIVE DE PATRONES!' : `¡Completaste Patrones de ${gConfig.badge}!`}
            </h3>
            <p class="victory-desc" style="font-size: 1.15rem; font-weight: 700; color: #475569; ${isGradeOne ? 'text-transform:uppercase;' : ''}">
              ${isGradeOne ? '¡FELICITACIONES! YA PODÉS RECONOCER Y CREAR TUS PROPIOS PATRONES COMO UN VERDADERO PROGRAMADOR.' : '¡Felicitaciones! Dominás el reconocimiento de reglas, secuencias y pensamiento computacional.'}
            </p>

            <div class="victory-points-box" style="border-color: #f59e0b; background: #fffbeb;">
              ⭐ ${progress.score || 0} ${isGradeOne ? 'PUNTOS TOTALES' : 'Puntos Totales'} • ${progress.starsTotal || 0} ${isGradeOne ? 'ESTRELLAS OBTENIDAS' : 'Estrellas Obtenidas'}<br>
              <span style="font-size:1.15rem; color:#b45309; font-weight:900;">INSIGNIA: «${isGradeOne ? 'DETECTIVE DE PATRONES' : `MAESTRO DE PATRONES G${this.currentGrade}`}» 🏅</span>
            </div>

            <div style="margin-bottom:20px; font-size:1.1rem; color:#334155; text-transform: uppercase;">
              <strong>PATRONES</strong><br>
              <span style="font-family:monospace; font-size:1.4rem; color:#15803d;">██████████ 100%</span>
            </div>

            <button type="button" id="btn-victory-back-syllabus" class="btn-stage-next" style="width:100%; justify-content:center; ${isGradeOne ? 'text-transform: uppercase;' : ''}">
              <span>⬅️ ${isGradeOne ? 'VOLVER AL TEMARIO' : 'Volver al Temario'}</span>
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
      return;
    }

    const isGradeOne = this.currentGrade === 1;
    container.innerHTML = `
      <div style="display:flex; justify-content:center; align-items:center; padding:20px 0;">
        <div class="coding-victory-card">
          <div class="victory-badge-icon">🏆</div>
          <h2 class="victory-title">${isGradeOne ? '🎉 ¡SECCIÓN COMPLETADA! 🎉' : '🎉 ¡Sección Completada! 🎉'}</h2>
          <p class="victory-desc">
            ${isGradeOne
              ? `¡FELICITACIONES! HAS COMPLETADO CON ÉXITO TODAS LAS MISIONES DE <strong>INSTRUCCIONES</strong> PARA <strong>${gConfig.badge}</strong>.`
              : `¡Felicitaciones! Has completado con éxito todas las misiones de <strong>INSTRUCCIONES</strong> para <strong>${gConfig.badge}</strong>.`}
          </p>

          <div class="victory-points-box">
            ⭐ ${progress.score || 0} ${isGradeOne ? 'PUNTOS TOTALES' : 'Puntos Totales'} • ${progress.starsTotal || 0} ${isGradeOne ? 'ESTRELLAS OBTENIDAS' : 'Estrellas Obtenidas'}<br>
            <span style="font-size:1.15rem; color:#15803d; font-weight:700;">${isGradeOne ? 'INSIGNIA: «MAESTRO DE LAS INSTRUCCIONES» 🏅' : 'Insignia: «Maestro de las Instrucciones» 🏅'}</span>
          </div>

          <div style="margin-bottom:20px; font-size:1.1rem; color:#334155;">
            <strong>INSTRUCCIONES</strong><br>
            <span style="font-family:monospace; font-size:1.4rem; color:#15803d;">██████████ 100%</span>
          </div>

          <button type="button" id="btn-victory-back-syllabus" class="btn-stage-next" style="width:100%; justify-content:center;">
            <span>${isGradeOne ? '✨ VOLVER AL TEMARIO DEL GRADO' : '✨ Volver al Temario del Grado'}</span>
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
