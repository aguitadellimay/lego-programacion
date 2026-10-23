/**
 * platformerQuestions.js - Banco de preguntas pedagógicas y motor de aleatoriedad
 * Desafío final: Instrucciones - Lego Familiar
 *
 * Incluye un banco de 240 preguntas distribuidas equitativamente entre:
 * - 5 grados (1.° a 5.° grado)
 * - 4 categorías (instrucciones, programacion, algoritmos, matematica)
 * - Exactamente 12 preguntas por cada combinación de grado y categoría.
 * - Motor con historial de prevención de repeticiones continuas.
 */

const BITY_QUESTION_BANK = [
  {
    "id": "g1_instrucciones_1",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "¿Qué es una instrucción?",
    "options": [
      {
        "text": "Una orden clara que nos dice qué acción hacer.",
        "isCorrect": true
      },
      {
        "text": "Un dibujo para colorear la pantalla.",
        "isCorrect": false
      },
      {
        "text": "Un botón que apaga la máquina.",
        "isCorrect": false
      }
    ],
    "explanation": "Una instrucción le indica a Bity o a una computadora qué acción específica debe realizar."
  },
  {
    "id": "g1_instrucciones_2",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si queremos que Bity avance hacia adelante, ¿cuál es la instrucción?",
    "options": [
      {
        "text": "Avanzar 1 paso",
        "isCorrect": true
      },
      {
        "text": "Dormir una siesta",
        "isCorrect": false
      },
      {
        "text": "Apagar la luz",
        "isCorrect": false
      }
    ],
    "explanation": "«Avanzar» le da la orden directa a Bity de moverse hacia adelante."
  },
  {
    "id": "g1_instrucciones_3",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "¿Cuál de estas es una instrucción clara para Bity?",
    "options": [
      {
        "text": "Girar a la derecha",
        "isCorrect": true
      },
      {
        "text": "Hacer cualquier cosa",
        "isCorrect": false
      },
      {
        "text": "Color amarillo brillante",
        "isCorrect": false
      }
    ],
    "explanation": "Una instrucción clara indica con precisión la acción a ejecutar."
  },
  {
    "id": "g1_instrucciones_4",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "¿Para qué necesita instrucciones un robot como Bity?",
    "options": [
      {
        "text": "Para saber qué camino seguir y cumplir su misión.",
        "isCorrect": true
      },
      {
        "text": "Para jugar solo sin que nadie le diga nada.",
        "isCorrect": false
      },
      {
        "text": "Para cambiar de color sin moverse.",
        "isCorrect": false
      }
    ],
    "explanation": "Los robots necesitan instrucciones para saber cómo y cuándo moverse."
  },
  {
    "id": "g1_instrucciones_5",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si un semáforo peatonal se pone en verde, ¿qué instrucción nos da?",
    "options": [
      {
        "text": "Cruzar la calle con cuidado.",
        "isCorrect": true
      },
      {
        "text": "Detenerse y esperar en la vereda.",
        "isCorrect": false
      },
      {
        "text": "Cerrar los ojos.",
        "isCorrect": false
      }
    ],
    "explanation": "La luz verde nos indica que es momento de avanzar cruzando por la senda peatonal."
  },
  {
    "id": "g1_instrucciones_6",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si le damos a Bity la orden «Saltar», ¿qué hace?",
    "options": [
      {
        "text": "Se eleva en el aire para esquivar un pozo.",
        "isCorrect": true
      },
      {
        "text": "Se queda quieto en el suelo.",
        "isCorrect": false
      },
      {
        "text": "Gira en círculos.",
        "isCorrect": false
      }
    ],
    "explanation": "La acción de saltar le permite elevarse por encima de obstáculos o pozos."
  },
  {
    "id": "g1_instrucciones_7",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "¿Qué ocurre si le damos a Bity una instrucción confusa o incompleta?",
    "options": [
      {
        "text": "El robot no sabe qué hacer y se detiene.",
        "isCorrect": true
      },
      {
        "text": "Adivina solo lo que queríamos.",
        "isCorrect": false
      },
      {
        "text": "Vuela por el espacio.",
        "isCorrect": false
      }
    ],
    "explanation": "Las computadoras y robots no adivinan: necesitan instrucciones completas y claras."
  },
  {
    "id": "g1_instrucciones_8",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "En una receta de cocina, ¿cuál es una instrucción correcta?",
    "options": [
      {
        "text": "Mezclar los ingredientes en el recipiente.",
        "isCorrect": true
      },
      {
        "text": "Un dibujo de una manzana.",
        "isCorrect": false
      },
      {
        "text": "La mesa del comedor.",
        "isCorrect": false
      }
    ],
    "explanation": "«Mezclar» es una orden de acción dentro del procedimiento de la receta."
  },
  {
    "id": "g1_instrucciones_9",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si Bity se encuentra frente a una roca gigante, ¿qué instrucción lo ayuda a seguir?",
    "options": [
      {
        "text": "Girar a la izquierda para rodear la roca.",
        "isCorrect": true
      },
      {
        "text": "Chocar de frente contra la roca.",
        "isCorrect": false
      },
      {
        "text": "Quedarse apagado para siempre.",
        "isCorrect": false
      }
    ],
    "explanation": "Girar le permite buscar un camino libre para esquivar el obstáculo."
  },
  {
    "id": "g1_instrucciones_10",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "¿Por qué las instrucciones deben darse en orden?",
    "options": [
      {
        "text": "Para que el robot haga las cosas paso a paso sin equivocarse.",
        "isCorrect": true
      },
      {
        "text": "Porque da igual hacer cualquier cosa primero.",
        "isCorrect": false
      },
      {
        "text": "Para que las letras se vean más grandes.",
        "isCorrect": false
      }
    ],
    "explanation": "El orden correcto asegura que cada paso prepare el camino para el siguiente."
  },
  {
    "id": "g1_instrucciones_11",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "¿Cuál es una instrucción clara para entrar al aula?",
    "options": [
      {
        "text": "Caminar hacia la puerta y pasar en orden.",
        "isCorrect": true
      },
      {
        "text": "Gritar muy fuerte en el patio.",
        "isCorrect": false
      },
      {
        "text": "La mochila escolar.",
        "isCorrect": false
      }
    ],
    "explanation": "Indica con claridad y respeto la acción de entrar al aula."
  },
  {
    "id": "g1_instrucciones_12",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si la orden dice «Retroceder un paso», ¿hacia dónde va Bity?",
    "options": [
      {
        "text": "Hacia atrás.",
        "isCorrect": true
      },
      {
        "text": "Hacia adelante.",
        "isCorrect": false
      },
      {
        "text": "Hacia arriba.",
        "isCorrect": false
      }
    ],
    "explanation": "Retroceder significa dar un paso en sentido contrario a donde está mirando."
  },
  {
    "id": "g1_programacion_1",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Qué significa programar?",
    "options": [
      {
        "text": "Dar instrucciones ordenadas a una máquina para que cumpla una tarea.",
        "isCorrect": true
      },
      {
        "text": "Usar la computadora sin saber qué hace.",
        "isCorrect": false
      },
      {
        "text": "Desarmar los juguetes en el piso.",
        "isCorrect": false
      }
    ],
    "explanation": "Programar es escribir y ordenar las instrucciones que una máquina necesita seguir."
  },
  {
    "id": "g1_programacion_2",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Quién le dice a Bity qué tiene que hacer?",
    "options": [
      {
        "text": "Nosotros cuando armamos su programa de instrucciones.",
        "isCorrect": true
      },
      {
        "text": "El robot lo inventa todo solo.",
        "isCorrect": false
      },
      {
        "text": "Nadie, las máquinas no necesitan órdenes.",
        "isCorrect": false
      }
    ],
    "explanation": "Bity depende de nuestro programa para saber qué acciones ejecutar."
  },
  {
    "id": "g1_programacion_3",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Las computadoras pueden pensar solas como los humanos?",
    "options": [
      {
        "text": "No, solo siguen exactamente las instrucciones del programa.",
        "isCorrect": true
      },
      {
        "text": "Sí, sueñan y piensan como personas.",
        "isCorrect": false
      },
      {
        "text": "Sí, saben todo sin que nadie les enseñe.",
        "isCorrect": false
      }
    ],
    "explanation": "Las computadoras son máquinas creadas para ejecutar los programas que creamos."
  },
  {
    "id": "g1_programacion_4",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Qué necesitamos para armar un programa divertido?",
    "options": [
      {
        "text": "Pensar el recorrido y ordenar bien los bloques de instrucciones.",
        "isCorrect": true
      },
      {
        "text": "Apretar todos los botones al mismo tiempo.",
        "isCorrect": false
      },
      {
        "text": "Apagar la pantalla enseguida.",
        "isCorrect": false
      }
    ],
    "explanation": "Planificar el recorrido y ordenar los bloques nos permite crear programas exitosos."
  },
  {
    "id": "g1_programacion_5",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "Si programamos a un robot para limpiar la mesa, ¿qué hará?",
    "options": [
      {
        "text": "Seguirá los pasos para dejar la mesa limpia.",
        "isCorrect": true
      },
      {
        "text": "Se irá a dormir al patio.",
        "isCorrect": false
      },
      {
        "text": "Romperá los platos.",
        "isCorrect": false
      }
    ],
    "explanation": "El robot cumplirá la tarea para la cual fue programado paso a paso."
  },
  {
    "id": "g1_programacion_6",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Qué podemos crear aprendiendo a programar?",
    "options": [
      {
        "text": "Videojuegos, cuentos animados y robots inteligentes.",
        "isCorrect": true
      },
      {
        "text": "Solamente cuentas de sumar aburridas.",
        "isCorrect": false
      },
      {
        "text": "Nada divertido.",
        "isCorrect": false
      }
    ],
    "explanation": "La programación nos abre un mundo de creatividad, animación y robótica."
  },
  {
    "id": "g1_programacion_7",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "Si cambiamos de lugar dos instrucciones en un programa, ¿qué sucede?",
    "options": [
      {
        "text": "El robot puede equivocarse de camino.",
        "isCorrect": true
      },
      {
        "text": "Todo queda exactamente igual.",
        "isCorrect": false
      },
      {
        "text": "La computadora se apaga para siempre.",
        "isCorrect": false
      }
    ],
    "explanation": "Cambiar el orden altera la secuencia y el robot puede no llegar a la meta."
  },
  {
    "id": "g1_programacion_8",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Una tablet o celular funciona sin programas?",
    "options": [
      {
        "text": "No, necesita programas y juegos para que podamos usarla.",
        "isCorrect": true
      },
      {
        "text": "Sí, funciona solo con mirarla.",
        "isCorrect": false
      },
      {
        "text": "Sí, porque tiene batería mágica.",
        "isCorrect": false
      }
    ],
    "explanation": "Las aplicaciones y juegos son programas que hacen funcionar a los dispositivos."
  },
  {
    "id": "g1_programacion_9",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Qué hace el botón verde con el triángulo «Play»?",
    "options": [
      {
        "text": "Inicia el programa para que Bity comience a moverse.",
        "isCorrect": true
      },
      {
        "text": "Borra todo el trabajo que hicimos.",
        "isCorrect": false
      },
      {
        "text": "Apaga la computadora.",
        "isCorrect": false
      }
    ],
    "explanation": "El botón de Play o Ejecutar pone en marcha las instrucciones preparadas."
  },
  {
    "id": "g1_programacion_10",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "Si queremos que Bity baile, ¿qué debemos hacer?",
    "options": [
      {
        "text": "Programar una secuencia de giros y pasos alegres.",
        "isCorrect": true
      },
      {
        "text": "Esperar a que tenga ganas de bailar.",
        "isCorrect": false
      },
      {
        "text": "Dejarlo quieto en el lugar.",
        "isCorrect": false
      }
    ],
    "explanation": "Con instrucciones de giros y movimientos podemos armar una divertida coreografía."
  },
  {
    "id": "g1_programacion_11",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Quién es un programador o programadora?",
    "options": [
      {
        "text": "Una persona que crea instrucciones para que las máquinas funcionen.",
        "isCorrect": true
      },
      {
        "text": "Alguien que solo mira la televisión.",
        "isCorrect": false
      },
      {
        "text": "Un robot de metal.",
        "isCorrect": false
      }
    ],
    "explanation": "Los programadores somos nosotros cuando diseñamos las órdenes para el robot."
  },
  {
    "id": "g1_programacion_12",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Qué hacemos después de escribir un programa para Bity?",
    "options": [
      {
        "text": "Probarlo para ver si Bity llega a la meta.",
        "isCorrect": true
      },
      {
        "text": "Apagar todo sin mirar qué pasó.",
        "isCorrect": false
      },
      {
        "text": "Enojarnos si algo sale mal.",
        "isCorrect": false
      }
    ],
    "explanation": "Probar el programa nos permite verificar si funciona y celebrar el logro."
  },
  {
    "id": "g1_algoritmos_1",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "¿Qué es un algoritmo en la vida diaria?",
    "options": [
      {
        "text": "Una lista ordenada de pasos para hacer una tarea.",
        "isCorrect": true
      },
      {
        "text": "Un montón de juguetes desordenados.",
        "isCorrect": false
      },
      {
        "text": "Una sola palabra suelta.",
        "isCorrect": false
      }
    ],
    "explanation": "Un algoritmo es una secuencia de pasos ordenados para resolver un problema."
  },
  {
    "id": "g1_algoritmos_2",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para lavarse las manos, ¿cuál es el primer paso?",
    "options": [
      {
        "text": "Abrir la canilla y mojarse las manos con agua.",
        "isCorrect": true
      },
      {
        "text": "Secarse con la toalla limpia.",
        "isCorrect": false
      },
      {
        "text": "Cerrar la puerta con llave.",
        "isCorrect": false
      }
    ],
    "explanation": "Primero nos mojamos las manos con agua antes de aplicar el jabón."
  },
  {
    "id": "g1_algoritmos_3",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para ponerse las zapatillas, ¿qué paso va antes?",
    "options": [
      {
        "text": "Ponerse las medias.",
        "isCorrect": true
      },
      {
        "text": "Atarse los cordones de las zapatillas.",
        "isCorrect": false
      },
      {
        "text": "Salir a correr por el parque.",
        "isCorrect": false
      }
    ],
    "explanation": "Las medias deben ponerse siempre antes de calzarse las zapatillas."
  },
  {
    "id": "g1_algoritmos_4",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para armar una torre de bloques, ¿cuál es el primer paso?",
    "options": [
      {
        "text": "Apoyar el bloque base firme en el suelo.",
        "isCorrect": true
      },
      {
        "text": "Poner el techo en el aire.",
        "isCorrect": false
      },
      {
        "text": "Derribar la torre.",
        "isCorrect": false
      }
    ],
    "explanation": "Toda torre necesita primero un bloque base bien apoyado en el suelo."
  },
  {
    "id": "g1_algoritmos_5",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para tomar un vaso de agua, ¿cuál es el paso final?",
    "options": [
      {
        "text": "Beber el agua del vaso.",
        "isCorrect": true
      },
      {
        "text": "Buscar el vaso en la alacena.",
        "isCorrect": false
      },
      {
        "text": "Llenar el vaso con la jarra.",
        "isCorrect": false
      }
    ],
    "explanation": "Beber el agua es la acción final que completa el algoritmo."
  },
  {
    "id": "g1_algoritmos_6",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para cultivar una planta: 1. Tierra, 2. Semilla... ¿cuál es el paso 3?",
    "options": [
      {
        "text": "Regar con agua para que reciba humedad.",
        "isCorrect": true
      },
      {
        "text": "Cortar las hojas con tijera.",
        "isCorrect": false
      },
      {
        "text": "Tirar la maceta a la basura.",
        "isCorrect": false
      }
    ],
    "explanation": "El agua es necesaria para que la semilla despierte y comience a crecer."
  },
  {
    "id": "g1_algoritmos_7",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Si Bity tiene que avanzar 3 pasos hasta la nave, ¿cómo es la secuencia?",
    "options": [
      {
        "text": "Paso 1, luego Paso 2, y luego Paso 3.",
        "isCorrect": true
      },
      {
        "text": "Paso 3 antes del Paso 1.",
        "isCorrect": false
      },
      {
        "text": "Quedarse sentado sin moverse.",
        "isCorrect": false
      }
    ],
    "explanation": "Los pasos se avanzan uno a uno en orden consecutivo."
  },
  {
    "id": "g1_algoritmos_8",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para dibujar una carita feliz, ¿qué va primero?",
    "options": [
      {
        "text": "Dibujar el círculo de la cara.",
        "isCorrect": true
      },
      {
        "text": "Pintar la sonrisa en el aire.",
        "isCorrect": false
      },
      {
        "text": "Guardar los lápices en la cartuchera.",
        "isCorrect": false
      }
    ],
    "explanation": "Primero dibujamos el contorno circular de la cara para luego ubicar ojos y sonrisa."
  },
  {
    "id": "g1_algoritmos_9",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "¿Por qué un algoritmo no puede tener pasos al revés?",
    "options": [
      {
        "text": "Porque las acciones deben seguir un orden que tenga sentido.",
        "isCorrect": true
      },
      {
        "text": "Porque las máquinas se enojan.",
        "isCorrect": false
      },
      {
        "text": "Porque las letras no entran en la hoja.",
        "isCorrect": false
      }
    ],
    "explanation": "Seguir un orden lógico garantiza que el resultado sea el esperado."
  },
  {
    "id": "g1_algoritmos_10",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para pelar una banana y comerla, ¿qué va primero?",
    "options": [
      {
        "text": "Pelar la cáscara con las manos.",
        "isCorrect": true
      },
      {
        "text": "Morder la banana con cáscara.",
        "isCorrect": false
      },
      {
        "text": "Tirar la banana entera.",
        "isCorrect": false
      }
    ],
    "explanation": "Primero quitamos la cáscara para poder disfrutar la fruta limpia."
  },
  {
    "id": "g1_algoritmos_11",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Si en un algoritmo de 3 pasos falta el paso del medio, ¿qué pasa?",
    "options": [
      {
        "text": "El algoritmo queda incompleto y el robot se traba.",
        "isCorrect": true
      },
      {
        "text": "El robot vuela por arte de magia.",
        "isCorrect": false
      },
      {
        "text": "Sale todo perfecto igual.",
        "isCorrect": false
      }
    ],
    "explanation": "Todos los pasos necesarios deben estar presentes para que el algoritmo funcione."
  },
  {
    "id": "g1_algoritmos_12",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Si nos equivocamos en un paso de nuestro algoritmo, ¿qué hacemos?",
    "options": [
      {
        "text": "Corregimos el paso equivocado y volvemos a probar.",
        "isCorrect": true
      },
      {
        "text": "Abandonamos la misión para siempre.",
        "isCorrect": false
      },
      {
        "text": "Rompemos el teclado de la computadora.",
        "isCorrect": false
      }
    ],
    "explanation": "En programación siempre revisamos los errores para aprender y mejorar."
  },
  {
    "id": "g1_matematica_1",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity necesita calcular su energía! ¿Cuánto es 5 + 4?",
    "options": [
      {
        "text": "9",
        "isCorrect": true
      },
      {
        "text": "8",
        "isCorrect": false
      },
      {
        "text": "10",
        "isCorrect": false
      }
    ],
    "explanation": "¡5 más 4 es igual a 9! Bity suma 9 unidades de energía."
  },
  {
    "id": "g1_matematica_2",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity calcula su salto! ¿Cuánto es 8 + 7?",
    "options": [
      {
        "text": "15",
        "isCorrect": true
      },
      {
        "text": "14",
        "isCorrect": false
      },
      {
        "text": "16",
        "isCorrect": false
      }
    ],
    "explanation": "¡8 más 7 es igual a 15!"
  },
  {
    "id": "g1_matematica_3",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity recarga su batería! ¿Cuánto es 10 − 4?",
    "options": [
      {
        "text": "6",
        "isCorrect": true
      },
      {
        "text": "5",
        "isCorrect": false
      },
      {
        "text": "7",
        "isCorrect": false
      }
    ],
    "explanation": "¡A 10 le quitamos 4 y nos quedan 6!"
  },
  {
    "id": "g1_matematica_4",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity mide la distancia a la meta! ¿Cuánto es 12 + 6?",
    "options": [
      {
        "text": "18",
        "isCorrect": true
      },
      {
        "text": "17",
        "isCorrect": false
      },
      {
        "text": "19",
        "isCorrect": false
      }
    ],
    "explanation": "¡12 más 6 es igual a 18!"
  },
  {
    "id": "g1_matematica_5",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity esquiva un obstáculo! ¿Cuánto es 15 − 5?",
    "options": [
      {
        "text": "10",
        "isCorrect": true
      },
      {
        "text": "9",
        "isCorrect": false
      },
      {
        "text": "11",
        "isCorrect": false
      }
    ],
    "explanation": "¡15 menos 5 es igual a 10!"
  },
  {
    "id": "g1_matematica_6",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity cuenta sus pasos! ¿Cuánto es 7 + 7?",
    "options": [
      {
        "text": "14",
        "isCorrect": true
      },
      {
        "text": "13",
        "isCorrect": false
      },
      {
        "text": "15",
        "isCorrect": false
      }
    ],
    "explanation": "¡El doble de 7 es 14!"
  },
  {
    "id": "g1_matematica_7",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity analiza el terreno! ¿Cuánto es 9 + 8?",
    "options": [
      {
        "text": "17",
        "isCorrect": true
      },
      {
        "text": "16",
        "isCorrect": false
      },
      {
        "text": "18",
        "isCorrect": false
      }
    ],
    "explanation": "¡9 más 8 es igual a 17!"
  },
  {
    "id": "g1_matematica_8",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity repara su motor! ¿Cuánto es 16 − 8?",
    "options": [
      {
        "text": "8",
        "isCorrect": true
      },
      {
        "text": "7",
        "isCorrect": false
      },
      {
        "text": "9",
        "isCorrect": false
      }
    ],
    "explanation": "¡16 menos 8 es igual a 8!"
  },
  {
    "id": "g1_matematica_9",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity conecta un cable! ¿Cuánto es 11 + 5?",
    "options": [
      {
        "text": "16",
        "isCorrect": true
      },
      {
        "text": "15",
        "isCorrect": false
      },
      {
        "text": "17",
        "isCorrect": false
      }
    ],
    "explanation": "¡11 más 5 es igual a 16!"
  },
  {
    "id": "g1_matematica_10",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity enciende sus luces LED! ¿Cuánto es 18 − 9?",
    "options": [
      {
        "text": "9",
        "isCorrect": true
      },
      {
        "text": "8",
        "isCorrect": false
      },
      {
        "text": "10",
        "isCorrect": false
      }
    ],
    "explanation": "¡18 menos 9 es igual a 9!"
  },
  {
    "id": "g1_matematica_11",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity sube a la plataforma! ¿Cuánto es 6 + 7?",
    "options": [
      {
        "text": "13",
        "isCorrect": true
      },
      {
        "text": "12",
        "isCorrect": false
      },
      {
        "text": "14",
        "isCorrect": false
      }
    ],
    "explanation": "¡6 más 7 es igual a 13!"
  },
  {
    "id": "g1_matematica_12",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity alcanza la batería dorada! ¿Cuánto es 20 − 8?",
    "options": [
      {
        "text": "12",
        "isCorrect": true
      },
      {
        "text": "11",
        "isCorrect": false
      },
      {
        "text": "13",
        "isCorrect": false
      }
    ],
    "explanation": "¡20 menos 8 es igual a 12!"
  },
  {
    "id": "g2_instrucciones_1",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "¿Por qué una instrucción para un robot debe ser muy precisa?",
    "options": [
      {
        "text": "Porque el robot no interpreta intenciones: solo ejecuta lo que se le indica exactamente.",
        "isCorrect": true
      },
      {
        "text": "Porque los robots leen nuestros pensamientos.",
        "isCorrect": false
      },
      {
        "text": "Para que la pantalla use menos batería.",
        "isCorrect": false
      }
    ],
    "explanation": "La precisión evita ambigüedades y asegura que el robot ejecute la acción correcta."
  },
  {
    "id": "g2_instrucciones_2",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Entre estas dos frases, ¿cuál es una instrucción clara de programación?",
    "options": [
      {
        "text": "«Avanzar 4 casilleros»",
        "isCorrect": true
      },
      {
        "text": "«Caminar un poquito hacia allá»",
        "isCorrect": false
      },
      {
        "text": "«Ser un buen robot explorador»",
        "isCorrect": false
      }
    ],
    "explanation": "«Avanzar 4 casilleros» contiene la acción y la cantidad exacta de casilleros a recorrer."
  },
  {
    "id": "g2_instrucciones_3",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si Bity mira hacia adelante y le indicamos «Girar 90° a la derecha», ¿hacia dónde queda mirando?",
    "options": [
      {
        "text": "Hacia su derecha.",
        "isCorrect": true
      },
      {
        "text": "Hacia atrás.",
        "isCorrect": false
      },
      {
        "text": "Hacia el techo.",
        "isCorrect": false
      }
    ],
    "explanation": "Girar 90° a la derecha reorienta al robot un cuarto de vuelta hacia ese lado."
  },
  {
    "id": "g2_instrucciones_4",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "¿Qué ocurre si le damos a Bity una instrucción imposible, como atravesar una pared sólida?",
    "options": [
      {
        "text": "El robot colisiona o se detiene al detectar el obstáculo físico.",
        "isCorrect": true
      },
      {
        "text": "Atraviesa la pared como un fantasma.",
        "isCorrect": false
      },
      {
        "text": "Se convierte en un cohete supersónico.",
        "isCorrect": false
      }
    ],
    "explanation": "Las leyes físicas y la detección de colisiones impiden atravesar obstáculos sólidos."
  },
  {
    "id": "g2_instrucciones_5",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "¿Cuál es la diferencia entre un deseo y una instrucción en programación?",
    "options": [
      {
        "text": "La instrucción contiene una orden concreta y ejecutable por la máquina.",
        "isCorrect": true
      },
      {
        "text": "No hay ninguna diferencia.",
        "isCorrect": false
      },
      {
        "text": "El deseo se escribe en la computadora y la instrucción no.",
        "isCorrect": false
      }
    ],
    "explanation": "Las máquinas solo entienden comandos ejecutables con parámetros definidos."
  },
  {
    "id": "g2_instrucciones_6",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si un dron recibe la orden «Descender 2 metros», ¿qué movimiento realiza?",
    "options": [
      {
        "text": "Baja 2 metros hacia el suelo.",
        "isCorrect": true
      },
      {
        "text": "Sube 2 metros hacia el cielo.",
        "isCorrect": false
      },
      {
        "text": "Gira en su propio eje.",
        "isCorrect": false
      }
    ],
    "explanation": "Descender significa bajar de altura verticalmente."
  },
  {
    "id": "g2_instrucciones_7",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "¿Qué significa la instrucción «Repetir 3 veces: Avanzar 1»?",
    "options": [
      {
        "text": "Avanzar un casillero, luego otro, y luego otro más (3 casilleros en total).",
        "isCorrect": true
      },
      {
        "text": "Avanzar solo medio casillero.",
        "isCorrect": false
      },
      {
        "text": "Retroceder 3 casilleros de golpe.",
        "isCorrect": false
      }
    ],
    "explanation": "El bloque de repetición ejecuta la acción indicada la cantidad exacta de veces solicitada."
  },
  {
    "id": "g2_instrucciones_8",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si le damos dos instrucciones que se contradicen a la vez (ej: «Avanzar y Retroceder»), ¿qué sucede?",
    "options": [
      {
        "text": "El sistema entra en conflicto porque no puede ir en dos direcciones opuestas.",
        "isCorrect": true
      },
      {
        "text": "Bity se duplica en dos robots.",
        "isCorrect": false
      },
      {
        "text": "El robot se teletransporta.",
        "isCorrect": false
      }
    ],
    "explanation": "Las instrucciones no pueden contradecirse en el mismo instante de ejecución."
  },
  {
    "id": "g2_instrucciones_9",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Para que Bity recoja una pieza de Lego en el suelo, ¿qué instrucción debe ejecutar al estar sobre ella?",
    "options": [
      {
        "text": "Recoger objeto.",
        "isCorrect": true
      },
      {
        "text": "Mirar hacia arriba.",
        "isCorrect": false
      },
      {
        "text": "Apagar motores.",
        "isCorrect": false
      }
    ],
    "explanation": "«Recoger objeto» interactúa con el elemento ubicado en su misma coordenada."
  },
  {
    "id": "g2_instrucciones_10",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si una instrucción dice «Si el sensor detecta pozo, saltar», ¿qué hace Bity al ver un pozo?",
    "options": [
      {
        "text": "Salta para evitar caer al abismo.",
        "isCorrect": true
      },
      {
        "text": "Se tira directo al fondo del pozo.",
        "isCorrect": false
      },
      {
        "text": "Se queda dormido.",
        "isCorrect": false
      }
    ],
    "explanation": "La condición evalúa la presencia del pozo y ejecuta la acción preventiva de saltar."
  },
  {
    "id": "g2_instrucciones_11",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "¿Por qué verificamos si una instrucción se cumplió antes de pasar a la siguiente?",
    "options": [
      {
        "text": "Para asegurarnos de que el robot está en la posición esperada para la próxima orden.",
        "isCorrect": true
      },
      {
        "text": "Porque el juego es más lento.",
        "isCorrect": false
      },
      {
        "text": "Para cambiar de color el fondo.",
        "isCorrect": false
      }
    ],
    "explanation": "Cada paso construye la posición desde donde se ejecutará el siguiente."
  },
  {
    "id": "g2_instrucciones_12",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si Bity debe llegar a un punto a 5 metros y avanza de a 1 metro, ¿cuántas instrucciones de avance necesita?",
    "options": [
      {
        "text": "5 instrucciones de avance.",
        "isCorrect": true
      },
      {
        "text": "1 sola instrucción de avance.",
        "isCorrect": false
      },
      {
        "text": "10 instrucciones de avance.",
        "isCorrect": false
      }
    ],
    "explanation": "Cada paso cubre 1 metro, por lo que 5 pasos completan los 5 metros."
  },
  {
    "id": "g2_programacion_1",
    "grade": 2,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué es un comando en programación?",
    "options": [
      {
        "text": "Una palabra o bloque de código que representa una instrucción específica.",
        "isCorrect": true
      },
      {
        "text": "Un cable para enchufar el teclado.",
        "isCorrect": false
      },
      {
        "text": "Una foto que guardamos en la galería.",
        "isCorrect": false
      }
    ],
    "explanation": "Un comando le indica a la computadora una operación concreta a realizar."
  },
  {
    "id": "g2_programacion_2",
    "grade": 2,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué ventaja tiene usar un bloque «Repetir» en vez de escribir la misma orden muchas veces?",
    "options": [
      {
        "text": "Ahorra tiempo, hace el programa más corto y reduce los errores.",
        "isCorrect": true
      },
      {
        "text": "Hace que el robot camine más lento.",
        "isCorrect": false
      },
      {
        "text": "Borra los bloques anteriores.",
        "isCorrect": false
      }
    ],
    "explanation": "Los bucles o repeticiones simplifican el código y facilitan su mantenimiento."
  },
  {
    "id": "g2_programacion_3",
    "grade": 2,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si Bity no llega a la meta, ¿dónde suele estar el error?",
    "options": [
      {
        "text": "En las instrucciones que ordenamos en el programa.",
        "isCorrect": true
      },
      {
        "text": "En la pantalla que se cansó.",
        "isCorrect": false
      },
      {
        "text": "En el color de los bloques.",
        "isCorrect": false
      }
    ],
    "explanation": "Los robots ejecutan exactamente lo programado; si fallan, revisamos el programa."
  },
  {
    "id": "g2_programacion_4",
    "grade": 2,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué significa «depurar» o buscar bugs en un programa?",
    "options": [
      {
        "text": "Encontrar la instrucción equivocada y corregirla.",
        "isCorrect": true
      },
      {
        "text": "Limpiar la pantalla con un paño.",
        "isCorrect": false
      },
      {
        "text": "Cerrar el juego sin guardar.",
        "isCorrect": false
      }
    ],
    "explanation": "Depurar (debugging) es el proceso de detectar y solucionar errores en el código."
  },
  {
    "id": "g2_programacion_5",
    "grade": 2,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué es un sensor en un robot educativo?",
    "options": [
      {
        "text": "Un dispositivo que capta datos del entorno, como distancia, colores o tacto.",
        "isCorrect": true
      },
      {
        "text": "Una batería gigante de repuesto.",
        "isCorrect": false
      },
      {
        "text": "Una antena decorativa que no hace nada.",
        "isCorrect": false
      }
    ],
    "explanation": "Los sensores le brindan información del mundo exterior al programa del robot."
  },
  {
    "id": "g2_programacion_6",
    "grade": 2,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué hace el bloque de inicio «Al hacer clic en Bandera Verde»?",
    "options": [
      {
        "text": "Es el evento que da inicio a la ejecución del programa.",
        "isCorrect": true
      },
      {
        "text": "Pinta la bandera de color rojo.",
        "isCorrect": false
      },
      {
        "text": "Detiene la música del juego.",
        "isCorrect": false
      }
    ],
    "explanation": "Los bloques de eventos definen qué suceso dispara la secuencia de instrucciones."
  },
  {
    "id": "g2_programacion_7",
    "grade": 2,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Por qué planificamos un camino en un papel antes de programar los bloques?",
    "options": [
      {
        "text": "Para pensar con calma los giros y no equivocarnos al armar el código.",
        "isCorrect": true
      },
      {
        "text": "Porque la computadora no funciona si no dibujamos antes.",
        "isCorrect": false
      },
      {
        "text": "Para gastar hojas de la carpeta.",
        "isCorrect": false
      }
    ],
    "explanation": "Planificar anticipadamente nos permite visualizar soluciones antes de codificar."
  },
  {
    "id": "g2_programacion_8",
    "grade": 2,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si programamos un salto cuando el usuario presiona la barra espaciadora, ¿qué estamos creando?",
    "options": [
      {
        "text": "Un control interactivo mediante eventos de teclado.",
        "isCorrect": true
      },
      {
        "text": "Un error de sistema.",
        "isCorrect": false
      },
      {
        "text": "Una imagen fija que no responde.",
        "isCorrect": false
      }
    ],
    "explanation": "Vincular teclas a acciones es la base del control de personajes en videojuegos."
  },
  {
    "id": "g2_programacion_9",
    "grade": 2,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué significa que un programa se ejecute de forma secuencial?",
    "options": [
      {
        "text": "Que ejecuta las instrucciones una tras otra, de arriba hacia abajo.",
        "isCorrect": true
      },
      {
        "text": "Que salta pasos al azar.",
        "isCorrect": false
      },
      {
        "text": "Que ejecuta la última instrucción primero.",
        "isCorrect": false
      }
    ],
    "explanation": "La ejecución secuencial respeta el orden estricto en que fueron colocados los bloques."
  },
  {
    "id": "g2_programacion_10",
    "grade": 2,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si queremos que Bity recoja 3 monedas en fila, ¿cuál es la mejor estrategia?",
    "options": [
      {
        "text": "Avanzar y recoger en cada posición donde haya una moneda.",
        "isCorrect": true
      },
      {
        "text": "Saltar por encima de todas sin tocarlas.",
        "isCorrect": false
      },
      {
        "text": "Girar en círculos sin avanzar.",
        "isCorrect": false
      }
    ],
    "explanation": "Coordinar el desplazamiento con la interacción permite recoger cada recompensa."
  },
  {
    "id": "g2_programacion_11",
    "grade": 2,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué almacena una variable llamada «Puntos» en nuestro juego?",
    "options": [
      {
        "text": "La cantidad de puntos que Bity va acumulando durante la partida.",
        "isCorrect": true
      },
      {
        "text": "El color de los zapatos de Bity.",
        "isCorrect": false
      },
      {
        "text": "La hora del reloj de la pared.",
        "isCorrect": false
      }
    ],
    "explanation": "Las variables son contenedores digitales para guardar valores que van cambiando."
  },
  {
    "id": "g2_programacion_12",
    "grade": 2,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Puede una computadora cambiar sus propias instrucciones por capricho?",
    "options": [
      {
        "text": "No, una computadora es una máquina fiel que solo ejecuta su programación.",
        "isCorrect": true
      },
      {
        "text": "Sí, cuando se aburre cambia de ideas.",
        "isCorrect": false
      },
      {
        "text": "Sí, porque siente emociones humanas.",
        "isCorrect": false
      }
    ],
    "explanation": "Las computadoras procesan estrictamente la lógica de su software."
  },
  {
    "id": "g2_algoritmos_1",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Cuáles son las tres partes básicas de un algoritmo?",
    "options": [
      {
        "text": "Inicio, pasos ordenados y finalización.",
        "isCorrect": true
      },
      {
        "text": "Tapa, contratapa y lomo.",
        "isCorrect": false
      },
      {
        "text": "Pregunta, duda y silencio.",
        "isCorrect": false
      }
    ],
    "explanation": "Todo algoritmo parte de un estado inicial, ejecuta pasos y alcanza un objetivo final."
  },
  {
    "id": "g2_algoritmos_2",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Para cruzar la calle con semáforo: 1. Llegar a la esquina, 2. Mirar el semáforo... ¿cuál sigue?",
    "options": [
      {
        "text": "Esperar la luz verde para cruzar con seguridad.",
        "isCorrect": true
      },
      {
        "text": "Cruzar corriendo con luz roja.",
        "isCorrect": false
      },
      {
        "text": "Sentarse en el cordón a esperar la noche.",
        "isCorrect": false
      }
    ],
    "explanation": "Esperar la luz verde peatonal es la condición de seguridad indispensable."
  },
  {
    "id": "g2_algoritmos_3",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Si un algoritmo para preparar chocolatada mezcla la leche antes de abrir la botella, ¿qué tipo de error tiene?",
    "options": [
      {
        "text": "Un error en el orden lógico de los pasos.",
        "isCorrect": true
      },
      {
        "text": "Un error de color de la taza.",
        "isCorrect": false
      },
      {
        "text": "No tiene ningún error.",
        "isCorrect": false
      }
    ],
    "explanation": "No se puede verter la leche sin antes abrir el envase que la contiene."
  },
  {
    "id": "g2_algoritmos_4",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Si Bity recorre: «Avanzar 2, Girar a la derecha, Avanzar 3», ¿cuántos pasos avanzó en total?",
    "options": [
      {
        "text": "5 pasos en total.",
        "isCorrect": true
      },
      {
        "text": "6 pasos en total.",
        "isCorrect": false
      },
      {
        "text": "2 pasos en total.",
        "isCorrect": false
      }
    ],
    "explanation": "Avanzó 2 pasos iniciales más 3 pasos finales: 2 + 3 = 5 pasos."
  },
  {
    "id": "g2_algoritmos_5",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Para guardar los útiles en la mochila: ¿cuál de estas acciones NO pertenece a ese algoritmo?",
    "options": [
      {
        "text": "Comerse un helado de chocolate.",
        "isCorrect": true
      },
      {
        "text": "Guardar el cuaderno de clase.",
        "isCorrect": false
      },
      {
        "text": "Cerrar la cartuchera y guardarla.",
        "isCorrect": false
      }
    ],
    "explanation": "Comer un helado es una acción no relacionada con organizar la mochila escolar."
  },
  {
    "id": "g2_algoritmos_6",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Qué significa optimizar un algoritmo de recorrido?",
    "options": [
      {
        "text": "Lograr que Bity llegue a la meta usando la menor cantidad de pasos y giros posibles.",
        "isCorrect": true
      },
      {
        "text": "Hacer que Bity dé muchas vueltas innecesarias.",
        "isCorrect": false
      },
      {
        "text": "Pintar el laberinto de muchos colores.",
        "isCorrect": false
      }
    ],
    "explanation": "Optimizar es hacer el procedimiento más eficiente sin perder efectividad."
  },
  {
    "id": "g2_algoritmos_7",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "En un camino con bifurcación (dos caminos), ¿qué elemento del algoritmo nos permite elegir el correcto?",
    "options": [
      {
        "text": "Una condición lógica (ej: «Si el camino está libre, ir por allí»).",
        "isCorrect": true
      },
      {
        "text": "Tirar una moneda al aire sin mirar.",
        "isCorrect": false
      },
      {
        "text": "Quedarse quieto sin decidir.",
        "isCorrect": false
      }
    ],
    "explanation": "Las condiciones lógicas guían la toma de decisiones dentro del algoritmo."
  },
  {
    "id": "g2_algoritmos_8",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Para enviar un dibujo por correo postal: ¿cuál es el paso que va justo después de meterlo en el sobre?",
    "options": [
      {
        "text": "Cerrar el sobre y pegarle la estampilla con la dirección.",
        "isCorrect": true
      },
      {
        "text": "Abrir la carta ya enviada.",
        "isCorrect": false
      },
      {
        "text": "Romper el sobre con una tijera.",
        "isCorrect": false
      }
    ],
    "explanation": "Cerrar y rotular el sobre prepara la carta para ser depositada en el buzón."
  },
  {
    "id": "g2_algoritmos_9",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Si un robot encuentra un obstáculo en su camino y el algoritmo dice «Si hay obstáculo, retroceder 1», ¿qué hace?",
    "options": [
      {
        "text": "Da un paso hacia atrás para no chocar.",
        "isCorrect": true
      },
      {
        "text": "Acelera y choca de frente.",
        "isCorrect": false
      },
      {
        "text": "Se apaga para siempre.",
        "isCorrect": false
      }
    ],
    "explanation": "La condición le indica dar un paso atrás como maniobra de evasión."
  },
  {
    "id": "g2_algoritmos_10",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Por qué las recetas de cocina se consideran algoritmos cotidianos?",
    "options": [
      {
        "text": "Porque tienen una lista de ingredientes y pasos numerados paso a paso.",
        "isCorrect": true
      },
      {
        "text": "Porque las computadoras comen pasteles.",
        "isCorrect": false
      },
      {
        "text": "Porque tienen fotos en colores.",
        "isCorrect": false
      }
    ],
    "explanation": "Una receta es el ejemplo clásico de secuencia ordenada para obtener un producto final."
  },
  {
    "id": "g2_algoritmos_11",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Si un algoritmo tiene un bucle que nunca se detiene, ¿cómo se le llama en informática?",
    "options": [
      {
        "text": "Bucle infinito.",
        "isCorrect": true
      },
      {
        "text": "Bucle veloz.",
        "isCorrect": false
      },
      {
        "text": "Bucle premiado.",
        "isCorrect": false
      }
    ],
    "explanation": "Un bucle infinito ocurre cuando falta la condición de salida o parada."
  },
  {
    "id": "g2_algoritmos_12",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Si probamos nuestro algoritmo y siempre funciona con éxito, ¿qué podemos afirmar?",
    "options": [
      {
        "text": "Que el algoritmo es correcto y confiable.",
        "isCorrect": true
      },
      {
        "text": "Que tuvimos suerte por casualidad.",
        "isCorrect": false
      },
      {
        "text": "Que hay que borrarlo todo.",
        "isCorrect": false
      }
    ],
    "explanation": "La verificación repetida confirma la solidez de la solución algorítmica."
  },
  {
    "id": "g2_matematica_1",
    "grade": 2,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity calcula su energía de salto! ¿Cuánto es 24 + 15?",
    "options": [
      {
        "text": "39",
        "isCorrect": true
      },
      {
        "text": "38",
        "isCorrect": false
      },
      {
        "text": "40",
        "isCorrect": false
      }
    ],
    "explanation": "¡24 más 15 es igual a 39! (20+10=30; 4+5=9 -> 39)."
  },
  {
    "id": "g2_matematica_2",
    "grade": 2,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity gasta energía en una carrera! ¿Cuánto es 48 − 16?",
    "options": [
      {
        "text": "32",
        "isCorrect": true
      },
      {
        "text": "31",
        "isCorrect": false
      },
      {
        "text": "34",
        "isCorrect": false
      }
    ],
    "explanation": "¡48 menos 16 es igual a 32!"
  },
  {
    "id": "g2_matematica_3",
    "grade": 2,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity suma dos baterías medianas! ¿Cuánto es 35 + 25?",
    "options": [
      {
        "text": "60",
        "isCorrect": true
      },
      {
        "text": "50",
        "isCorrect": false
      },
      {
        "text": "65",
        "isCorrect": false
      }
    ],
    "explanation": "¡35 más 25 es igual a 60 exactos!"
  },
  {
    "id": "g2_matematica_4",
    "grade": 2,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity ajusta su sensor de distancia! ¿Cuánto es 70 − 25?",
    "options": [
      {
        "text": "45",
        "isCorrect": true
      },
      {
        "text": "55",
        "isCorrect": false
      },
      {
        "text": "40",
        "isCorrect": false
      }
    ],
    "explanation": "¡70 menos 25 es igual a 45!"
  },
  {
    "id": "g2_matematica_5",
    "grade": 2,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity duplica su velocidad de procesamiento! ¿Cuánto es el doble de 14?",
    "options": [
      {
        "text": "28",
        "isCorrect": true
      },
      {
        "text": "24",
        "isCorrect": false
      },
      {
        "text": "30",
        "isCorrect": false
      }
    ],
    "explanation": "¡El doble de 14 es 14 + 14 = 28!"
  },
  {
    "id": "g2_matematica_6",
    "grade": 2,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity comparte energía con un aliado! ¿Cuánto es la mitad de 40?",
    "options": [
      {
        "text": "20",
        "isCorrect": true
      },
      {
        "text": "15",
        "isCorrect": false
      },
      {
        "text": "25",
        "isCorrect": false
      }
    ],
    "explanation": "¡La mitad de 40 es 40 ÷ 2 = 20!"
  },
  {
    "id": "g2_matematica_7",
    "grade": 2,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity recarga sus celdas solares! ¿Cuánto es 52 + 18?",
    "options": [
      {
        "text": "70",
        "isCorrect": true
      },
      {
        "text": "60",
        "isCorrect": false
      },
      {
        "text": "72",
        "isCorrect": false
      }
    ],
    "explanation": "¡52 más 18 es igual a 70!"
  },
  {
    "id": "g2_matematica_8",
    "grade": 2,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity desciende una montaña tecnológica! ¿Cuánto es 85 − 30?",
    "options": [
      {
        "text": "55",
        "isCorrect": true
      },
      {
        "text": "50",
        "isCorrect": false
      },
      {
        "text": "65",
        "isCorrect": false
      }
    ],
    "explanation": "¡85 menos 30 es igual a 55!"
  },
  {
    "id": "g2_matematica_9",
    "grade": 2,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity recolecta tornillos dorados! ¿Cuánto es 19 + 21?",
    "options": [
      {
        "text": "40",
        "isCorrect": true
      },
      {
        "text": "39",
        "isCorrect": false
      },
      {
        "text": "41",
        "isCorrect": false
      }
    ],
    "explanation": "¡19 más 21 es igual a 40!"
  },
  {
    "id": "g2_matematica_10",
    "grade": 2,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity calibra sus motores laterales! ¿Cuánto es 64 − 22?",
    "options": [
      {
        "text": "42",
        "isCorrect": true
      },
      {
        "text": "40",
        "isCorrect": false
      },
      {
        "text": "44",
        "isCorrect": false
      }
    ],
    "explanation": "¡64 menos 22 es igual a 42!"
  },
  {
    "id": "g2_matematica_11",
    "grade": 2,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity conecta dos bancos de memoria! ¿Cuánto es 33 + 33?",
    "options": [
      {
        "text": "66",
        "isCorrect": true
      },
      {
        "text": "63",
        "isCorrect": false
      },
      {
        "text": "69",
        "isCorrect": false
      }
    ],
    "explanation": "¡33 más 33 es igual a 66!"
  },
  {
    "id": "g2_matematica_12",
    "grade": 2,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity reduce la temperatura de su CPU! ¿Cuánto es 90 − 45?",
    "options": [
      {
        "text": "45",
        "isCorrect": true
      },
      {
        "text": "40",
        "isCorrect": false
      },
      {
        "text": "50",
        "isCorrect": false
      }
    ],
    "explanation": "¡90 menos 45 es exactamente 45!"
  },
  {
    "id": "g3_instrucciones_1",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "En programación, ¿qué es una condición lógica (ej: «SI hay obstáculo»)?",
    "options": [
      {
        "text": "Una regla que evalúa una situación y decide si se ejecuta una acción o no.",
        "isCorrect": true
      },
      {
        "text": "Un cable que conecta dos computadoras.",
        "isCorrect": false
      },
      {
        "text": "Un tipo de letra en negrita.",
        "isCorrect": false
      }
    ],
    "explanation": "Las condiciones permiten a los programas tomar decisiones según el estado actual."
  },
  {
    "id": "g3_instrucciones_2",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si la orden dice «SI la batería es menor a 20%, ir a la base de carga», ¿cuándo va Bity a cargar?",
    "options": [
      {
        "text": "Únicamente cuando su batería baja del 20%.",
        "isCorrect": true
      },
      {
        "text": "Todo el tiempo sin detenerse.",
        "isCorrect": false
      },
      {
        "text": "Nunca, porque la batería no se gasta.",
        "isCorrect": false
      }
    ],
    "explanation": "La acción solo se dispara cuando la condición evaluada resulta verdadera."
  },
  {
    "id": "g3_instrucciones_3",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "¿Qué valor puede devolver un sensor booleano en una instrucción?",
    "options": [
      {
        "text": "Verdadero o Falso (Sí o No).",
        "isCorrect": true
      },
      {
        "text": "Cualquier palabra inventada.",
        "isCorrect": false
      },
      {
        "text": "Una canción en audio.",
        "isCorrect": false
      }
    ],
    "explanation": "Los valores booleanos representan los dos únicos estados de verdad: True o False."
  },
  {
    "id": "g3_instrucciones_4",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si una instrucción indica «Avanzar HASTA tocar la pared», ¿cuándo se detiene Bity?",
    "options": [
      {
        "text": "En el momento exacto en que hace contacto con la pared.",
        "isCorrect": true
      },
      {
        "text": "Al dar exactamente 2 pasos.",
        "isCorrect": false
      },
      {
        "text": "Nunca, sigue de largo rompiendo la pared.",
        "isCorrect": false
      }
    ],
    "explanation": "El bucle condicional «Hasta que» detiene la marcha en cuanto se cumple la condición."
  },
  {
    "id": "g3_instrucciones_5",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "¿Para qué sirve agrupar varias instrucciones bajo el nombre de un bloque propio o función?",
    "options": [
      {
        "text": "Para poder reutilizar ese grupo de acciones fácilmente sin volver a escribirlo.",
        "isCorrect": true
      },
      {
        "text": "Para que el robot cambie de peinado.",
        "isCorrect": false
      },
      {
        "text": "Para que el archivo pese el doble.",
        "isCorrect": false
      }
    ],
    "explanation": "La modularidad en funciones permite invocar secuencias complejas con una sola orden."
  },
  {
    "id": "g3_instrucciones_6",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si Bity mira hacia el norte y le ordenamos «Girar 180°», ¿hacia dónde queda mirando?",
    "options": [
      {
        "text": "Hacia el sur (hacia atrás).",
        "isCorrect": true
      },
      {
        "text": "Hacia el este (derecha).",
        "isCorrect": false
      },
      {
        "text": "Hacia el oeste (izquierda).",
        "isCorrect": false
      }
    ],
    "explanation": "Girar 180° equivale a dar media vuelta completa y mirar en la dirección opuesta."
  },
  {
    "id": "g3_instrucciones_7",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "En un plano de coordenadas (X, Y), si Bity avanza hacia la derecha horizontalmente, ¿qué valor cambia?",
    "options": [
      {
        "text": "Aumenta el valor de la coordenada X.",
        "isCorrect": true
      },
      {
        "text": "Disminuye el valor de la coordenada Y.",
        "isCorrect": false
      },
      {
        "text": "Ninguno de los dos valores cambia.",
        "isCorrect": false
      }
    ],
    "explanation": "El eje horizontal corresponde a la coordenada X, mientras que el eje vertical es Y."
  },
  {
    "id": "g3_instrucciones_8",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "¿Qué instrucción permite que Bity espere 2 segundos antes de ejecutar la siguiente acción?",
    "options": [
      {
        "text": "«Esperar 2 segundos»",
        "isCorrect": true
      },
      {
        "text": "«Avanzar 2 metros»",
        "isCorrect": false
      },
      {
        "text": "«Apagar pantalla»",
        "isCorrect": false
      }
    ],
    "explanation": "La instrucción de espera o temporización pausa la ejecución durante el tiempo indicado."
  },
  {
    "id": "g3_instrucciones_9",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si la condición dice: «SI es de día, activar panel solar; SINO, encender linterna», ¿qué hace de noche?",
    "options": [
      {
        "text": "Enciende la linterna.",
        "isCorrect": true
      },
      {
        "text": "Activa el panel solar.",
        "isCorrect": false
      },
      {
        "text": "Apaga todo y se detiene.",
        "isCorrect": false
      }
    ],
    "explanation": "La cláusula SINO (ELSE) se ejecuta cuando la condición de día es falsa."
  },
  {
    "id": "g3_instrucciones_10",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si Bity ejecuta 4 veces la secuencia «Avanzar 2, Girar 90° a la derecha», ¿qué figura geométrica dibuja?",
    "options": [
      {
        "text": "Un cuadrado perfecto.",
        "isCorrect": true
      },
      {
        "text": "Un círculo ondulado.",
        "isCorrect": false
      },
      {
        "text": "Una línea recta sin fin.",
        "isCorrect": false
      }
    ],
    "explanation": "Cuatro avances iguales combinados con cuatro giros rectos forman el perímetro de un cuadrado."
  },
  {
    "id": "g3_instrucciones_11",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "¿Qué error tiene la orden «Avanzar 3 casilleros hacia la izquierda sin girar» si Bity mira al frente?",
    "options": [
      {
        "text": "Contradice la orientación: para ir a la izquierda necesita primero girar o usar desplazamiento lateral.",
        "isCorrect": true
      },
      {
        "text": "No tiene ningún error.",
        "isCorrect": false
      },
      {
        "text": "Tiene demasiados números.",
        "isCorrect": false
      }
    ],
    "explanation": "Los robots de desplazamiento frontal necesitan orientar sus motores hacia la dirección del avance."
  },
  {
    "id": "g3_instrucciones_12",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si el sensor de distancia detecta un objeto a 10 cm y la instrucción dice «SI distancia < 20 cm, FRENAR», ¿qué hace?",
    "options": [
      {
        "text": "Frena de inmediato porque 10 cm es menor a 20 cm.",
        "isCorrect": true
      },
      {
        "text": "Sigue acelerando a máxima velocidad.",
        "isCorrect": false
      },
      {
        "text": "Gira hacia atrás sin frenar.",
        "isCorrect": false
      }
    ],
    "explanation": "La condición matemática 10 < 20 es verdadera, por lo que la acción de frenado se ejecuta."
  },
  {
    "id": "g3_programacion_1",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué es un bucle «Repetir N veces» en programación?",
    "options": [
      {
        "text": "Una estructura que ejecuta un conjunto de instrucciones un número fijo de repeticiones.",
        "isCorrect": true
      },
      {
        "text": "Un tipo de virus informático.",
        "isCorrect": false
      },
      {
        "text": "Un botón que apaga el monitor.",
        "isCorrect": false
      }
    ],
    "explanation": "Los bucles iterativos permiten automatizar tareas repetitivas de forma elegante y precisa."
  },
  {
    "id": "g3_programacion_2",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué es una variable en un videojuego?",
    "options": [
      {
        "text": "Un espacio con nombre donde se guarda un dato que puede cambiar, como vidas o puntos.",
        "isCorrect": true
      },
      {
        "text": "Un dibujo de una nube en el fondo.",
        "isCorrect": false
      },
      {
        "text": "El cable de alimentación eléctrica.",
        "isCorrect": false
      }
    ],
    "explanation": "Las variables permiten al juego recordar el estado de la partida y actualizarlo en tiempo real."
  },
  {
    "id": "g3_programacion_3",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si la variable «Vidas» vale 3 y Bity cae en un pozo, ¿cuánto debe valer «Vidas» después del evento?",
    "options": [
      {
        "text": "2 vidas.",
        "isCorrect": true
      },
      {
        "text": "0 vidas.",
        "isCorrect": false
      },
      {
        "text": "4 vidas.",
        "isCorrect": false
      }
    ],
    "explanation": "Al caer en un pozo pierde exactamente 1 vida, reduciendo el contador de 3 a 2."
  },
  {
    "id": "g3_programacion_4",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué es un «evento» en un entorno de programación visual como Scratch o Lego?",
    "options": [
      {
        "text": "Un suceso externo (clic, tecla presionada o mensaje) que desencadena un bloque de código.",
        "isCorrect": true
      },
      {
        "text": "Una fiesta de cumpleaños del robot.",
        "isCorrect": false
      },
      {
        "text": "Un error que borra la computadora.",
        "isCorrect": false
      }
    ],
    "explanation": "Los eventos conectan las interacciones del usuario con las respuestas del programa."
  },
  {
    "id": "g3_programacion_5",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Para qué sirven los comentarios dentro del código fuente de un programa?",
    "options": [
      {
        "text": "Para explicar a las personas qué hace cada parte del código, sin que la máquina los ejecute.",
        "isCorrect": true
      },
      {
        "text": "Para que el robot hable en voz alta.",
        "isCorrect": false
      },
      {
        "text": "Para que el juego tenga más niveles.",
        "isCorrect": false
      }
    ],
    "explanation": "Los comentarios son notas explicativas esenciales para el trabajo colaborativo en programación."
  },
  {
    "id": "g3_programacion_6",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si dos algoritmos resuelven el mismo problema, pero uno usa 4 pasos y otro usa 18, ¿cuál es mejor?",
    "options": [
      {
        "text": "El de 4 pasos, porque es más eficiente y fácil de comprender.",
        "isCorrect": true
      },
      {
        "text": "El de 18 pasos, porque tiene más letras.",
        "isCorrect": false
      },
      {
        "text": "Ninguno sirve.",
        "isCorrect": false
      }
    ],
    "explanation": "La simplicidad y eficiencia son virtudes fundamentales en el diseño de software."
  },
  {
    "id": "g3_programacion_7",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué ocurre cuando un programa entra en un bucle sin fin (bucle infinito)?",
    "options": [
      {
        "text": "El programa se queda atrapado repitiendo lo mismo y puede dejar de responder.",
        "isCorrect": true
      },
      {
        "text": "El juego se vuelve automáticamente invencible.",
        "isCorrect": false
      },
      {
        "text": "Se descargan nuevos juegos gratis.",
        "isCorrect": false
      }
    ],
    "explanation": "Un bucle infinito consume recursos sin avanzar, por lo que siempre requiere una condición de corte."
  },
  {
    "id": "g3_programacion_8",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué es la interfaz de usuario (UI) en un videojuego como el de Bity?",
    "options": [
      {
        "text": "Los elementos visuales como el HUD de vidas, el cronómetro y los botones de control.",
        "isCorrect": true
      },
      {
        "text": "Los cables internos de la computadora.",
        "isCorrect": false
      },
      {
        "text": "El plástico del teclado.",
        "isCorrect": false
      }
    ],
    "explanation": "La interfaz de usuario comunica el estado del juego y permite al jugador interactuar con él."
  },
  {
    "id": "g3_programacion_9",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si queremos que un contador sume de 5 en 5, ¿cómo evoluciona su variable?",
    "options": [
      {
        "text": "0, 5, 10, 15, 20...",
        "isCorrect": true
      },
      {
        "text": "0, 1, 2, 3, 4...",
        "isCorrect": false
      },
      {
        "text": "5, 4, 3, 2, 1...",
        "isCorrect": false
      }
    ],
    "explanation": "El incremento constante de 5 genera una progresión aritmética de cinco en cinco."
  },
  {
    "id": "g3_programacion_10",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué significa que un programa sea multiplataforma?",
    "options": [
      {
        "text": "Que puede ejecutarse tanto en computadoras de escritorio como en tablets y celulares.",
        "isCorrect": true
      },
      {
        "text": "Que solo funciona en una marca de teclado.",
        "isCorrect": false
      },
      {
        "text": "Que tiene muchas plataformas de madera.",
        "isCorrect": false
      }
    ],
    "explanation": "La compatibilidad multiplataforma permite a los usuarios jugar desde diversos dispositivos."
  },
  {
    "id": "g3_programacion_11",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué es un sprite en un videojuego 2D?",
    "options": [
      {
        "text": "Un elemento gráfico bidimensional animado que representa a un personaje u objeto.",
        "isCorrect": true
      },
      {
        "text": "Un tipo de bebida gaseosa en la heladera.",
        "isCorrect": false
      },
      {
        "text": "Un cable de red.",
        "isCorrect": false
      }
    ],
    "explanation": "Bity, los enemigos y las monedas son representados visualmente mediante sprites en el canvas."
  },
  {
    "id": "g3_programacion_12",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Por qué se guardan copias de seguridad (backups) de los proyectos de programación?",
    "options": [
      {
        "text": "Para no perder el trabajo realizado si ocurre algún corte de energía o fallo técnico.",
        "isCorrect": true
      },
      {
        "text": "Para llenar la memoria de la máquina.",
        "isCorrect": false
      },
      {
        "text": "Porque es obligatorio por ley.",
        "isCorrect": false
      }
    ],
    "explanation": "El respaldo periódico garantiza la preservación y seguridad de todo el código desarrollado."
  },
  {
    "id": "g3_algoritmos_1",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Qué es un diagrama de flujo en algoritmos?",
    "options": [
      {
        "text": "Una representación gráfica con flechas y figuras geométricas que muestra el flujo de decisiones.",
        "isCorrect": true
      },
      {
        "text": "Un mapa para viajar en avión.",
        "isCorrect": false
      },
      {
        "text": "Un dibujo de un río con peces.",
        "isCorrect": false
      }
    ],
    "explanation": "Los diagramas de flujo permiten visualizar la lógica de un algoritmo antes de escribir código."
  },
  {
    "id": "g3_algoritmos_2",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "En un diagrama de flujo, ¿qué figura geométrica suele representar una decisión condicional (Sí/No)?",
    "options": [
      {
        "text": "Un rombo.",
        "isCorrect": true
      },
      {
        "text": "Un círculo.",
        "isCorrect": false
      },
      {
        "text": "Un rectángulo.",
        "isCorrect": false
      }
    ],
    "explanation": "El rombo de decisión bifurca el camino en dos salidas posibles según la condición."
  },
  {
    "id": "g3_algoritmos_3",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Para ordenar los números 9, 2 y 7 de menor a mayor, ¿cuál es el resultado del algoritmo?",
    "options": [
      {
        "text": "2, 7, 9",
        "isCorrect": true
      },
      {
        "text": "9, 7, 2",
        "isCorrect": false
      },
      {
        "text": "7, 2, 9",
        "isCorrect": false
      }
    ],
    "explanation": "El orden ascendente ubica el menor primero (2), luego el intermedio (7) y al final el mayor (9)."
  },
  {
    "id": "g3_algoritmos_4",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Qué significa «descomponer un problema» en el pensamiento computacional?",
    "options": [
      {
        "text": "Dividir un problema grande en partes más pequeñas y fáciles de resolver una por una.",
        "isCorrect": true
      },
      {
        "text": "Romper una máquina con un martillo.",
        "isCorrect": false
      },
      {
        "text": "Olvidarse de la mitad de las cosas.",
        "isCorrect": false
      }
    ],
    "explanation": "La descomposición simplifica la complejidad permitiendo abordar cada desafío paso a paso."
  },
  {
    "id": "g3_algoritmos_5",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Si Bity debe sortear un laberinto en cuadrícula, ¿qué busca un algoritmo de camino óptimo?",
    "options": [
      {
        "text": "La ruta que llega a la meta en la menor cantidad de pasos posibles.",
        "isCorrect": true
      },
      {
        "text": "El camino con más pozos y peligros.",
        "isCorrect": false
      },
      {
        "text": "Cualquier camino que tarde muchas horas.",
        "isCorrect": false
      }
    ],
    "explanation": "El camino óptimo minimiza el gasto de energía y tiempo para cumplir el objetivo."
  },
  {
    "id": "g3_algoritmos_6",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "En una serie de pasos que repite: «Arriba, Derecha, Arriba, Derecha...», ¿cuál es el paso 6?",
    "options": [
      {
        "text": "Derecha.",
        "isCorrect": true
      },
      {
        "text": "Arriba.",
        "isCorrect": false
      },
      {
        "text": "Abajo.",
        "isCorrect": false
      }
    ],
    "explanation": "Los pasos impares (1, 3, 5) son Arriba; los pasos pares (2, 4, 6) son Derecha."
  },
  {
    "id": "g3_algoritmos_7",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Si un algoritmo para calcular el promedio de notas olvida dividir por la cantidad de notas, ¿qué error comete?",
    "options": [
      {
        "text": "Un error en la fórmula del cálculo final.",
        "isCorrect": true
      },
      {
        "text": "Un error de ortografía.",
        "isCorrect": false
      },
      {
        "text": "No comete ningún error.",
        "isCorrect": false
      }
    ],
    "explanation": "El promedio requiere sumar los valores y dividir por el número total de elementos sumados."
  },
  {
    "id": "g3_algoritmos_8",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Por qué las computadoras pueden ejecutar millones de pasos algorítmicos en un solo segundo?",
    "options": [
      {
        "text": "Porque poseen procesadores electrónicos de alta frecuencia diseñados para calcular velozmente.",
        "isCorrect": true
      },
      {
        "text": "Porque tienen magia en sus cables.",
        "isCorrect": false
      },
      {
        "text": "Porque no duermen por la noche.",
        "isCorrect": false
      }
    ],
    "explanation": "Los microprocesadores modernos ejecutan ciclos de instrucciones a velocidades de gigahertz."
  },
  {
    "id": "g3_algoritmos_9",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Para qué se utiliza un algoritmo de búsqueda en una lista de nombres de alumnos?",
    "options": [
      {
        "text": "Para localizar rápidamente si un alumno en particular se encuentra en la lista.",
        "isCorrect": true
      },
      {
        "text": "Para borrar todos los nombres.",
        "isCorrect": false
      },
      {
        "text": "Para cambiarle el nombre a los chicos.",
        "isCorrect": false
      }
    ],
    "explanation": "Los algoritmos de búsqueda recorren la estructura de datos hasta dar con el elemento requerido."
  },
  {
    "id": "g3_algoritmos_10",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Si una serie numérica sigue la regla «Sumar 4 cada vez» empezando en 2: 2, 6, 10... ¿cuál es el siguiente?",
    "options": [
      {
        "text": "14",
        "isCorrect": true
      },
      {
        "text": "12",
        "isCorrect": false
      },
      {
        "text": "16",
        "isCorrect": false
      }
    ],
    "explanation": "Siguiendo la regla del algoritmo aritmético: 10 + 4 = 14."
  },
  {
    "id": "g3_algoritmos_11",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Qué es un algoritmo determinista?",
    "options": [
      {
        "text": "Un algoritmo que ante las mismas entradas siempre produce exactamente el mismo resultado.",
        "isCorrect": true
      },
      {
        "text": "Un algoritmo que cambia de opinión al azar.",
        "isCorrect": false
      },
      {
        "text": "Un programa que no tiene final.",
        "isCorrect": false
      }
    ],
    "explanation": "El determinismo garantiza previsibilidad y consistencia en los resultados de un sistema."
  },
  {
    "id": "g3_algoritmos_12",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Cómo confirmamos que un algoritmo funciona antes de usarlo en un cohete espacial real?",
    "options": [
      {
        "text": "Probándolo en simuladores con diversas situaciones de prueba y casos extremos.",
        "isCorrect": true
      },
      {
        "text": "Lanzándolo al espacio sin revisar.",
        "isCorrect": false
      },
      {
        "text": "Preguntándole a una mascota.",
        "isCorrect": false
      }
    ],
    "explanation": "La verificación y validación rigurosa mediante pruebas asegura la confiabilidad en misiones críticas."
  },
  {
    "id": "g3_matematica_1",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity calibra sus motores espaciales! ¿Cuánto es 6 × 5?",
    "options": [
      {
        "text": "30",
        "isCorrect": true
      },
      {
        "text": "35",
        "isCorrect": false
      },
      {
        "text": "25",
        "isCorrect": false
      }
    ],
    "explanation": "¡6 por 5 es igual a 30!"
  },
  {
    "id": "g3_matematica_2",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity calcula la potencia de su escudo! ¿Cuánto es 8 × 4?",
    "options": [
      {
        "text": "32",
        "isCorrect": true
      },
      {
        "text": "36",
        "isCorrect": false
      },
      {
        "text": "28",
        "isCorrect": false
      }
    ],
    "explanation": "¡8 por 4 es igual a 32!"
  },
  {
    "id": "g3_matematica_3",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity mide la frecuencia de su radar! ¿Cuánto es 9 × 3?",
    "options": [
      {
        "text": "27",
        "isCorrect": true
      },
      {
        "text": "24",
        "isCorrect": false
      },
      {
        "text": "30",
        "isCorrect": false
      }
    ],
    "explanation": "¡9 por 3 es igual a 27!"
  },
  {
    "id": "g3_matematica_4",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity carga celdas de energía! ¿Cuánto es 7 × 5?",
    "options": [
      {
        "text": "35",
        "isCorrect": true
      },
      {
        "text": "40",
        "isCorrect": false
      },
      {
        "text": "30",
        "isCorrect": false
      }
    ],
    "explanation": "¡7 por 5 es igual a 35!"
  },
  {
    "id": "g3_matematica_5",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity realiza una operación combinada! ¿Cuánto es 4 × 10 + 15?",
    "options": [
      {
        "text": "55",
        "isCorrect": true
      },
      {
        "text": "45",
        "isCorrect": false
      },
      {
        "text": "65",
        "isCorrect": false
      }
    ],
    "explanation": "Primero multiplicamos 4 × 10 = 40, luego sumamos 15: 40 + 15 = 55."
  },
  {
    "id": "g3_matematica_6",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity calcula su batería restante! ¿Cuánto es 50 − 3 × 6?",
    "options": [
      {
        "text": "32",
        "isCorrect": true
      },
      {
        "text": "36",
        "isCorrect": false
      },
      {
        "text": "28",
        "isCorrect": false
      }
    ],
    "explanation": "Primero resolvemos la multiplicación 3 × 6 = 18, luego restamos: 50 − 18 = 32."
  },
  {
    "id": "g3_matematica_7",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity ajusta la altitud de vuelo! ¿Cuánto es 25 + 5 × 5?",
    "options": [
      {
        "text": "50",
        "isCorrect": true
      },
      {
        "text": "45",
        "isCorrect": false
      },
      {
        "text": "55",
        "isCorrect": false
      }
    ],
    "explanation": "Por jerarquía de operaciones: 5 × 5 = 25; luego 25 + 25 = 50."
  },
  {
    "id": "g3_matematica_8",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity regula la velocidad del dron! ¿Cuánto es 80 − 4 × 8?",
    "options": [
      {
        "text": "48",
        "isCorrect": true
      },
      {
        "text": "52",
        "isCorrect": false
      },
      {
        "text": "44",
        "isCorrect": false
      }
    ],
    "explanation": "Primero 4 × 8 = 32; luego restamos 80 − 32 = 48."
  },
  {
    "id": "g3_matematica_9",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity sincroniza sus sensores! ¿Cuánto es 3 × 8 + 12?",
    "options": [
      {
        "text": "36",
        "isCorrect": true
      },
      {
        "text": "32",
        "isCorrect": false
      },
      {
        "text": "40",
        "isCorrect": false
      }
    ],
    "explanation": "Primero 3 × 8 = 24; luego sumamos 12: 24 + 12 = 36."
  },
  {
    "id": "g3_matematica_10",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity calcula el empuje del propulsor! ¿Cuánto es 10 × 6 − 20?",
    "options": [
      {
        "text": "40",
        "isCorrect": true
      },
      {
        "text": "30",
        "isCorrect": false
      },
      {
        "text": "50",
        "isCorrect": false
      }
    ],
    "explanation": "Primero 10 × 6 = 60; luego restamos 20: 60 − 20 = 40."
  },
  {
    "id": "g3_matematica_11",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity mide la distancia al Centro de Repuestos! ¿Cuánto es 100 − 7 × 10?",
    "options": [
      {
        "text": "30",
        "isCorrect": true
      },
      {
        "text": "20",
        "isCorrect": false
      },
      {
        "text": "40",
        "isCorrect": false
      }
    ],
    "explanation": "Primero 7 × 10 = 70; luego 100 − 70 = 30."
  },
  {
    "id": "g3_matematica_12",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity completa su recarga de batería! ¿Cuánto es 4 × 9 + 4?",
    "options": [
      {
        "text": "40",
        "isCorrect": true
      },
      {
        "text": "36",
        "isCorrect": false
      },
      {
        "text": "44",
        "isCorrect": false
      }
    ],
    "explanation": "Primero 4 × 9 = 36; luego sumamos 4: 36 + 4 = 40."
  },
  {
    "id": "g4_instrucciones_1",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Qué es una condición lógica compuesta con el operador «Y» (AND)?",
    "options": [
      {
        "text": "Una regla donde TODAS las condiciones deben ser verdaderas a la vez para ejecutar la acción.",
        "isCorrect": true
      },
      {
        "text": "Una regla donde alcanza con que una sola sea verdadera.",
        "isCorrect": false
      },
      {
        "text": "Una regla que invierte el resultado.",
        "isCorrect": false
      }
    ],
    "explanation": "El operador AND exige que cada una de las condiciones evaluadas sea verdadera simultáneamente."
  },
  {
    "id": "g4_instrucciones_2",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "En: «SI batería > 50% Y puerta abierta, AVANZAR». Si la batería es 90% pero la puerta está cerrada, ¿qué hace Bity?",
    "options": [
      {
        "text": "No avanza, porque la condición de la puerta no se cumple.",
        "isCorrect": true
      },
      {
        "text": "Avanza igual rompiendo la puerta.",
        "isCorrect": false
      },
      {
        "text": "Apaga la computadora.",
        "isCorrect": false
      }
    ],
    "explanation": "Al usar AND, si cualquiera de las dos premisas es falsa, la condición global es falsa."
  },
  {
    "id": "g4_instrucciones_3",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Qué caracteriza al operador lógico «O» (OR) en una instrucción condicional?",
    "options": [
      {
        "text": "Es verdadero si al menos una de las condiciones evaluadas se cumple.",
        "isCorrect": true
      },
      {
        "text": "Exige que ambas condiciones sean falsas.",
        "isCorrect": false
      },
      {
        "text": "Solo funciona con números impares.",
        "isCorrect": false
      }
    ],
    "explanation": "La disyunción lógica OR resulta verdadera si la primera, la segunda o ambas son verdaderas."
  },
  {
    "id": "g4_instrucciones_4",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "En: «SI llueve O hace frío, llevar campera». Si hace frío pero no llueve, ¿debe llevar campera?",
    "options": [
      {
        "text": "Sí, porque al menos una de las dos condiciones es verdadera.",
        "isCorrect": true
      },
      {
        "text": "No, tienen que ocurrir las dos cosas juntas sí o sí.",
        "isCorrect": false
      },
      {
        "text": "Solo si es fin de semana.",
        "isCorrect": false
      }
    ],
    "explanation": "La presencia de frío satisface la condición del operador OR."
  },
  {
    "id": "g4_instrucciones_5",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Qué permite la estructura «SI... SINO...» (IF-ELSE) en un algoritmo?",
    "options": [
      {
        "text": "Definir un camino de acción si es verdadero y un camino alternativo si es falso.",
        "isCorrect": true
      },
      {
        "text": "Repetir instrucciones de forma infinita.",
        "isCorrect": false
      },
      {
        "text": "Borrar las variables de la memoria.",
        "isCorrect": false
      }
    ],
    "explanation": "IF-ELSE garantiza que siempre se tome una de las dos vías alternativas sin ambigüedad."
  },
  {
    "id": "g4_instrucciones_6",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Qué es un parámetro o argumento en una instrucción como `avanzar(casilleros)`?",
    "options": [
      {
        "text": "Un valor que enviamos a la instrucción para especificar la cantidad o modo de ejecución.",
        "isCorrect": true
      },
      {
        "text": "El nombre del autor del juego.",
        "isCorrect": false
      },
      {
        "text": "El color de la pantalla.",
        "isCorrect": false
      }
    ],
    "explanation": "Los parámetros dotan de flexibilidad y dinamismo a las instrucciones y funciones."
  },
  {
    "id": "g4_instrucciones_7",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "Si la función de movimiento es `mover(dx, dy)`, ¿hacia dónde se mueve Bity con `mover(0, -15)` en canvas?",
    "options": [
      {
        "text": "Hacia arriba 15 píxeles en el eje vertical.",
        "isCorrect": true
      },
      {
        "text": "Hacia abajo 15 píxeles.",
        "isCorrect": false
      },
      {
        "text": "Hacia la derecha 15 píxeles.",
        "isCorrect": false
      }
    ],
    "explanation": "En coordenadas de pantalla estándar, los valores negativos de Y se orientan hacia la parte superior."
  },
  {
    "id": "g4_instrucciones_8",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Por qué los programadores validan los límites del escenario antes de mover al personaje?",
    "options": [
      {
        "text": "Para evitar que Bity traspase las paredes o caiga fuera del mundo visible.",
        "isCorrect": true
      },
      {
        "text": "Para que el personaje cambie de ropa.",
        "isCorrect": false
      },
      {
        "text": "Para consumir más electricidad.",
        "isCorrect": false
      }
    ],
    "explanation": "El control de límites (bounding box) preserva la consistencia física del videojuego."
  },
  {
    "id": "g4_instrucciones_9",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Qué significa «anidar» estructuras condicionales en el código?",
    "options": [
      {
        "text": "Colocar una instrucción condicional dentro de otra para evaluar casos más específicos.",
        "isCorrect": true
      },
      {
        "text": "Guardar bloques de código en cajas de cartón.",
        "isCorrect": false
      },
      {
        "text": "Crear pájaros en la pantalla.",
        "isCorrect": false
      }
    ],
    "explanation": "Las condiciones anidadas permiten ramificar la toma de decisiones en múltiples niveles jerárquicos."
  },
  {
    "id": "g4_instrucciones_10",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Qué sucede si una instrucción intenta dividir un número por cero en la computadora?",
    "options": [
      {
        "text": "Provoca un error matemático de ejecución porque la división por cero no está definida.",
        "isCorrect": true
      },
      {
        "text": "El resultado siempre da 100.",
        "isCorrect": false
      },
      {
        "text": "La computadora se convierte en calculadora solar.",
        "isCorrect": false
      }
    ],
    "explanation": "Los programas deben validar que los divisores sean distintos de cero para evitar fallos."
  },
  {
    "id": "g4_instrucciones_11",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Cuál es la función del operador lógico «NO» (NOT)?",
    "options": [
      {
        "text": "Invierte el valor de verdad: si es verdadero lo hace falso, y si es falso lo hace verdadero.",
        "isCorrect": true
      },
      {
        "text": "Suma dos números positivos.",
        "isCorrect": false
      },
      {
        "text": "Multiplica el resultado por dos.",
        "isCorrect": false
      }
    ],
    "explanation": "El operador NOT niega la condición lógica evaluada invirtiendo su estado booleano."
  },
  {
    "id": "g4_instrucciones_12",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "Si una instrucción de detección comprueba cajas AABB, ¿qué verifica matemáticamente?",
    "options": [
      {
        "text": "Si los rectángulos que envuelven a ambos objetos se superponen en X y en Y.",
        "isCorrect": true
      },
      {
        "text": "Si los dos objetos tienen el mismo peso.",
        "isCorrect": false
      },
      {
        "text": "Si los dos objetos son del mismo color.",
        "isCorrect": false
      }
    ],
    "explanation": "La colisión Axis-Aligned Bounding Box (AABB) evalúa la superposición de intervalos en ambos ejes."
  },
  {
    "id": "g4_programacion_1",
    "grade": 4,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué es un arreglo o lista (array) en programación?",
    "options": [
      {
        "text": "Una estructura ordenada que permite guardar múltiples datos bajo un mismo identificador.",
        "isCorrect": true
      },
      {
        "text": "Una herramienta para desarmar la pantalla.",
        "isCorrect": false
      },
      {
        "text": "Un tipo de conector USB.",
        "isCorrect": false
      }
    ],
    "explanation": "Las listas organizan colecciones de elementos indexados secuencialmente."
  },
  {
    "id": "g4_programacion_2",
    "grade": 4,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "Si una lista tiene [rojo, azul, verde], ¿cuál es el elemento en el índice 0 en la mayoría de lenguajes?",
    "options": [
      {
        "text": "rojo",
        "isCorrect": true
      },
      {
        "text": "azul",
        "isCorrect": false
      },
      {
        "text": "verde",
        "isCorrect": false
      }
    ],
    "explanation": "En programación, la indexación estándar es basada en cero (zero-indexed)."
  },
  {
    "id": "g4_programacion_3",
    "grade": 4,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué es una función modular y qué ventaja ofrece en un proyecto de software?",
    "options": [
      {
        "text": "Un bloque reutilizable de código con propósito específico que evita duplicar lógica.",
        "isCorrect": true
      },
      {
        "text": "Un cable que conecta dos monitores.",
        "isCorrect": false
      },
      {
        "text": "Un archivo que solo se puede abrir una vez.",
        "isCorrect": false
      }
    ],
    "explanation": "La modularidad divide programas complejos en funciones autónomas y fáciles de depurar."
  },
  {
    "id": "g4_programacion_4",
    "grade": 4,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué diferencia existe entre una variable local y una variable global?",
    "options": [
      {
        "text": "La local solo existe dentro de su función; la global puede leerse en todo el programa.",
        "isCorrect": true
      },
      {
        "text": "La local se guarda en un pendrive y la global en la nube.",
        "isCorrect": false
      },
      {
        "text": "No hay diferencia alguna.",
        "isCorrect": false
      }
    ],
    "explanation": "El alcance o ámbito (scope) define en qué sectores del código es accesible cada variable."
  },
  {
    "id": "g4_programacion_5",
    "grade": 4,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Cuál es el rol del bucle principal del juego (Game Loop) que corre a 60 FPS?",
    "options": [
      {
        "text": "Procesar entradas de usuario, actualizar la física y dibujar el siguiente fotograma.",
        "isCorrect": true
      },
      {
        "text": "Descargar archivos de internet sin parar.",
        "isCorrect": false
      },
      {
        "text": "Borrar el progreso de las partidas.",
        "isCorrect": false
      }
    ],
    "explanation": "El Game Loop es el corazón interactivo que mantiene la simulación continua en tiempo real."
  },
  {
    "id": "g4_programacion_6",
    "grade": 4,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Para qué sirve un acumulador dentro de un bucle de programación?",
    "options": [
      {
        "text": "Para ir sumando y almacenando valores sucesivos a lo largo de las iteraciones.",
        "isCorrect": true
      },
      {
        "text": "Para restar la velocidad a cero.",
        "isCorrect": false
      },
      {
        "text": "Para reiniciar la computadora.",
        "isCorrect": false
      }
    ],
    "explanation": "El patrón acumulador permite calcular totales, puntajes acumulados o promedios."
  },
  {
    "id": "g4_programacion_7",
    "grade": 4,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué es una bandera booleana (flag) en la lógica de un programa?",
    "options": [
      {
        "text": "Una variable que vale verdadero o falso para recordar si ocurrió un suceso específico.",
        "isCorrect": true
      },
      {
        "text": "Una imagen de un mástil de tela.",
        "isCorrect": false
      },
      {
        "text": "Un sonido de victoria.",
        "isCorrect": false
      }
    ],
    "explanation": "Los flags señalan estados clave, como `estaEnElSuelo`, `invulnerable` o `misionCompletada`."
  },
  {
    "id": "g4_programacion_8",
    "grade": 4,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué significa que un código sea legible y siga convenciones de estilo?",
    "options": [
      {
        "text": "Que utiliza nombres claros y buena indentación para que cualquier persona lo entienda fácilmente.",
        "isCorrect": true
      },
      {
        "text": "Que tiene muchas palabras difíciles y desordenadas.",
        "isCorrect": false
      },
      {
        "text": "Que está escrito en un idioma secreto.",
        "isCorrect": false
      }
    ],
    "explanation": "El código limpio y legible facilita el mantenimiento, el trabajo en equipo y la detección de errores."
  },
  {
    "id": "g4_programacion_9",
    "grade": 4,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué es una constante en programación?",
    "options": [
      {
        "text": "Un valor definido al inicio que no debe cambiar durante la ejecución del programa.",
        "isCorrect": true
      },
      {
        "text": "Una variable que cambia de valor cada segundo.",
        "isCorrect": false
      },
      {
        "text": "Un botón de reinicio.",
        "isCorrect": false
      }
    ],
    "explanation": "Las constantes protegen valores fundamentales fijos, como la gravedad o el límite de tiempo."
  },
  {
    "id": "g4_programacion_10",
    "grade": 4,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué significa refactorizar código sin cambiar su funcionalidad externa?",
    "options": [
      {
        "text": "Reorganizar y limpiar el código interno para hacerlo más eficiente, claro y mantenible.",
        "isCorrect": true
      },
      {
        "text": "Borrar todo el proyecto y empezar de cero.",
        "isCorrect": false
      },
      {
        "text": "Cambiar los gráficos por otros de menor calidad.",
        "isCorrect": false
      }
    ],
    "explanation": "Refactorizar mejora la arquitectura interna del software manteniendo intacto el comportamiento."
  },
  {
    "id": "g4_programacion_11",
    "grade": 4,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Cómo se comunican dos módulos independientes en una aplicación web bien diseñada?",
    "options": [
      {
        "text": "A través de interfaces, parámetros de funciones o emisión y escucha de eventos.",
        "isCorrect": true
      },
      {
        "text": "Compartiendo cables físicos.",
        "isCorrect": false
      },
      {
        "text": "Sobrescribiendo archivos al azar.",
        "isCorrect": false
      }
    ],
    "explanation": "El desacoplamiento mediante llamadas limpias garantiza estabilidad y escalabilidad."
  },
  {
    "id": "g4_programacion_12",
    "grade": 4,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Para qué sirve el almacenamiento local (localStorage) en los navegadores web?",
    "options": [
      {
        "text": "Para guardar el progreso de los niveles y récords en el dispositivo del alumno sin depender de un servidor.",
        "isCorrect": true
      },
      {
        "text": "Para guardar fotos de la cámara web.",
        "isCorrect": false
      },
      {
        "text": "Para aumentar la velocidad de internet.",
        "isCorrect": false
      }
    ],
    "explanation": "El almacenamiento local permite persistir datos entre sesiones de navegación de forma sencilla."
  },
  {
    "id": "g4_algoritmos_1",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿En qué consiste el algoritmo de búsqueda binaria?",
    "options": [
      {
        "text": "En buscar en una lista ordenada dividiendo sucesivamente el rango de búsqueda a la mitad.",
        "isCorrect": true
      },
      {
        "text": "En revisar todos los elementos uno por uno de izquierda a derecha.",
        "isCorrect": false
      },
      {
        "text": "En elegir elementos al azar hasta acertar.",
        "isCorrect": false
      }
    ],
    "explanation": "La búsqueda binaria descarta la mitad de los elementos en cada paso, siendo sumamente veloz."
  },
  {
    "id": "g4_algoritmos_2",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Por qué la búsqueda binaria exige obligatoriamente que la lista esté previamente ordenada?",
    "options": [
      {
        "text": "Porque compara con el valor central para saber si buscar en la mitad izquierda o derecha.",
        "isCorrect": true
      },
      {
        "text": "Porque a las computadoras no les gusta el desorden.",
        "isCorrect": false
      },
      {
        "text": "Porque solo funciona con números negativos.",
        "isCorrect": false
      }
    ],
    "explanation": "El orden permite descartar con certeza una de las mitades con una sola comparación."
  },
  {
    "id": "g4_algoritmos_3",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Qué es la abstracción dentro del pensamiento computacional?",
    "options": [
      {
        "text": "Focalizarse en los aspectos relevantes de un problema y prescindir de detalles secundarios.",
        "isCorrect": true
      },
      {
        "text": "Ignorar el problema y no hacer nada.",
        "isCorrect": false
      },
      {
        "text": "Pintar un cuadro con figuras abstractas.",
        "isCorrect": false
      }
    ],
    "explanation": "La abstracción permite crear modelos conceptuales simples para resolver problemas complejos."
  },
  {
    "id": "g4_algoritmos_4",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "En un algoritmo que modela un mapa de plataformas, ¿qué abstracción geométrica se utiliza para Bity?",
    "options": [
      {
        "text": "Un rectángulo con posición (x, y) y dimensiones de ancho y alto (w, h).",
        "isCorrect": true
      },
      {
        "text": "Un modelo atómico con protones y electrones.",
        "isCorrect": false
      },
      {
        "text": "Una esfera perfecta de gas.",
        "isCorrect": false
      }
    ],
    "explanation": "El rectángulo de colisión simplifica los cálculos físicos manteniendo gran fidelidad jugable."
  },
  {
    "id": "g4_algoritmos_5",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Qué es un algoritmo de ordenamiento por burbuja (Bubble Sort)?",
    "options": [
      {
        "text": "Un método que compara pares adyacentes y los intercambia si están en el orden incorrecto.",
        "isCorrect": true
      },
      {
        "text": "Un filtro que infla burbujas en el agua.",
        "isCorrect": false
      },
      {
        "text": "Una animación gráfica de círculos.",
        "isCorrect": false
      }
    ],
    "explanation": "Bubble Sort hace que los valores más grandes «burbujeen» hacia el final de la lista paso a paso."
  },
  {
    "id": "g4_algoritmos_6",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Qué es una estructura de datos tipo Cola (Queue) y qué regla sigue?",
    "options": [
      {
        "text": "Una estructura FIFO: el primer elemento en ingresar es el primero en salir.",
        "isCorrect": true
      },
      {
        "text": "Una estructura donde sale primero el último en llegar.",
        "isCorrect": false
      },
      {
        "text": "Una lista que borra todo al azar.",
        "isCorrect": false
      }
    ],
    "explanation": "First-In First-Out (FIFO) reproduce la lógica de una fila de personas en un supermercado."
  },
  {
    "id": "g4_algoritmos_7",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Qué es una estructura de datos tipo Pila (Stack) y qué regla sigue?",
    "options": [
      {
        "text": "Una estructura LIFO: el último elemento en entrar es el primero en ser retirado.",
        "isCorrect": true
      },
      {
        "text": "Una lista donde todos salen a la vez.",
        "isCorrect": false
      },
      {
        "text": "Una batería de automóvil.",
        "isCorrect": false
      }
    ],
    "explanation": "Last-In First-Out (LIFO) funciona como una pila de platos: el último apoyado es el primero en retirarse."
  },
  {
    "id": "g4_algoritmos_8",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "En un laberinto, si un algoritmo sigue la regla de la pared derecha, ¿qué técnica heurística utiliza?",
    "options": [
      {
        "text": "Mantener siempre la mano en la pared continua hasta encontrar la salida.",
        "isCorrect": true
      },
      {
        "text": "Caminar con los ojos cerrados.",
        "isCorrect": false
      },
      {
        "text": "Saltar por arriba de las paredes.",
        "isCorrect": false
      }
    ],
    "explanation": "La regla de la mano derecha garantiza resolver cualquier laberinto simplemente conexo."
  },
  {
    "id": "g4_algoritmos_9",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Cómo se mide el rendimiento o eficiencia de un algoritmo en informática?",
    "options": [
      {
        "text": "Por la cantidad de pasos computacionales y memoria RAM requerida según el tamaño de la entrada.",
        "isCorrect": true
      },
      {
        "text": "Por la cantidad de colores del monitor.",
        "isCorrect": false
      },
      {
        "text": "Por lo lindo que se ve impreso en papel.",
        "isCorrect": false
      }
    ],
    "explanation": "El análisis de complejidad temporal y espacial determina la eficiencia de un algoritmo."
  },
  {
    "id": "g4_algoritmos_10",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Qué es un caso límite o caso de prueba extremo (edge case) al evaluar un algoritmo?",
    "options": [
      {
        "text": "Una situación inusual o en los extremos de los datos, como listas vacías o valores máximos.",
        "isCorrect": true
      },
      {
        "text": "Un caso que nunca importa revisar.",
        "isCorrect": false
      },
      {
        "text": "El dibujo del borde de la pantalla.",
        "isCorrect": false
      }
    ],
    "explanation": "Los edge cases ponen a prueba la solidez del software ante situaciones imprevistas."
  },
  {
    "id": "g4_algoritmos_11",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Qué hace un algoritmo de detección de ciclos en una red o lista vinculada?",
    "options": [
      {
        "text": "Verifica si el recorrido vuelve sobre sí mismo formando un bucle cerrado sin salida.",
        "isCorrect": true
      },
      {
        "text": "Pinta círculos en la pantalla.",
        "isCorrect": false
      },
      {
        "text": "Aumenta la velocidad del procesador.",
        "isCorrect": false
      }
    ],
    "explanation": "Detectar ciclos evita que los algoritmos de navegación o recorrido se queden atrapados."
  },
  {
    "id": "g4_algoritmos_12",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Por qué es fundamental descomponer un videojuego en subsistemas (física, render, audio, lógica)?",
    "options": [
      {
        "text": "Porque permite que cada parte se programe, pruebe y mantenga de forma clara y especializada.",
        "isCorrect": true
      },
      {
        "text": "Para que el archivo sea más difícil de abrir.",
        "isCorrect": false
      },
      {
        "text": "Porque la computadora no permite escribir más de 10 líneas.",
        "isCorrect": false
      }
    ],
    "explanation": "La arquitectura en subsistemas es el estándar profesional en la ingeniería de videojuegos."
  },
  {
    "id": "g4_matematica_1",
    "grade": 4,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity realiza un cálculo de propulsión! ¿Cuánto es 12 × 6 − 15?",
    "options": [
      {
        "text": "57",
        "isCorrect": true
      },
      {
        "text": "55",
        "isCorrect": false
      },
      {
        "text": "62",
        "isCorrect": false
      }
    ],
    "explanation": "Primero 12 × 6 = 72; luego restamos 15: 72 − 15 = 57."
  },
  {
    "id": "g4_matematica_2",
    "grade": 4,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity analiza la energía del reactor! ¿Cuánto es (20 + 30) × 2?",
    "options": [
      {
        "text": "100",
        "isCorrect": true
      },
      {
        "text": "80",
        "isCorrect": false
      },
      {
        "text": "120",
        "isCorrect": false
      }
    ],
    "explanation": "El paréntesis se resuelve primero: 20 + 30 = 50; luego 50 × 2 = 100."
  },
  {
    "id": "g4_matematica_3",
    "grade": 4,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity calibra la frecuencia de radio! ¿Cuánto es 72 ÷ 8 + 25?",
    "options": [
      {
        "text": "34",
        "isCorrect": true
      },
      {
        "text": "32",
        "isCorrect": false
      },
      {
        "text": "36",
        "isCorrect": false
      }
    ],
    "explanation": "Primero dividimos 72 ÷ 8 = 9; luego sumamos 25: 9 + 25 = 34."
  },
  {
    "id": "g4_matematica_4",
    "grade": 4,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity mide la distancia a la base industrial! ¿Cuánto es 15 × 5 − 25?",
    "options": [
      {
        "text": "50",
        "isCorrect": true
      },
      {
        "text": "45",
        "isCorrect": false
      },
      {
        "text": "55",
        "isCorrect": false
      }
    ],
    "explanation": "Primero 15 × 5 = 75; luego 75 − 25 = 50."
  },
  {
    "id": "g4_matematica_5",
    "grade": 4,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity regula el flujo térmico! ¿Cuánto es 80 − (12 × 4)?",
    "options": [
      {
        "text": "32",
        "isCorrect": true
      },
      {
        "text": "36",
        "isCorrect": false
      },
      {
        "text": "28",
        "isCorrect": false
      }
    ],
    "explanation": "El paréntesis primero: 12 × 4 = 48; luego 80 − 48 = 32."
  },
  {
    "id": "g4_matematica_6",
    "grade": 4,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity ajusta la potencia de los motores! ¿Cuánto es 9 × 8 − 32?",
    "options": [
      {
        "text": "40",
        "isCorrect": true
      },
      {
        "text": "38",
        "isCorrect": false
      },
      {
        "text": "42",
        "isCorrect": false
      }
    ],
    "explanation": "Primero 9 × 8 = 72; luego 72 − 32 = 40."
  },
  {
    "id": "g4_matematica_7",
    "grade": 4,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity calcula el impulso de salto! ¿Cuánto es (45 − 15) × 3?",
    "options": [
      {
        "text": "90",
        "isCorrect": true
      },
      {
        "text": "85",
        "isCorrect": false
      },
      {
        "text": "95",
        "isCorrect": false
      }
    ],
    "explanation": "Resolvemos el paréntesis: 45 − 15 = 30; luego 30 × 3 = 90."
  },
  {
    "id": "g4_matematica_8",
    "grade": 4,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity calcula la trayectoria del dron! ¿Cuánto es 64 ÷ 8 × 5?",
    "options": [
      {
        "text": "40",
        "isCorrect": true
      },
      {
        "text": "35",
        "isCorrect": false
      },
      {
        "text": "45",
        "isCorrect": false
      }
    ],
    "explanation": "De izquierda a derecha: 64 ÷ 8 = 8; luego 8 × 5 = 40."
  },
  {
    "id": "g4_matematica_9",
    "grade": 4,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity optimiza el consumo de batería! ¿Cuánto es 100 − (25 × 2 + 10)?",
    "options": [
      {
        "text": "40",
        "isCorrect": true
      },
      {
        "text": "50",
        "isCorrect": false
      },
      {
        "text": "30",
        "isCorrect": false
      }
    ],
    "explanation": "Dentro del paréntesis: 25 × 2 = 50, más 10 = 60. Luego 100 − 60 = 40."
  },
  {
    "id": "g4_matematica_10",
    "grade": 4,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity sincroniza los enlaces de datos! ¿Cuánto es 14 × 3 + 18?",
    "options": [
      {
        "text": "60",
        "isCorrect": true
      },
      {
        "text": "58",
        "isCorrect": false
      },
      {
        "text": "62",
        "isCorrect": false
      }
    ],
    "explanation": "Primero 14 × 3 = 42; luego 42 + 18 = 60."
  },
  {
    "id": "g4_matematica_11",
    "grade": 4,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity calcula el enfriamiento de la CPU! ¿Cuánto es 90 ÷ 3 − 12?",
    "options": [
      {
        "text": "18",
        "isCorrect": true
      },
      {
        "text": "15",
        "isCorrect": false
      },
      {
        "text": "20",
        "isCorrect": false
      }
    ],
    "explanation": "Primero 90 ÷ 3 = 30; luego 30 − 12 = 18."
  },
  {
    "id": "g4_matematica_12",
    "grade": 4,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity alcanza la batería de alta capacidad! ¿Cuánto es (18 + 12) × 4?",
    "options": [
      {
        "text": "120",
        "isCorrect": true
      },
      {
        "text": "110",
        "isCorrect": false
      },
      {
        "text": "130",
        "isCorrect": false
      }
    ],
    "explanation": "El paréntesis primero: 18 + 12 = 30; luego 30 × 4 = 120."
  },
  {
    "id": "g5_instrucciones_1",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Qué es una condición lógica compleja con operadores combinados (AND, OR, NOT)?",
    "options": [
      {
        "text": "Una expresión booleana evaluada mediante reglas de precedencia para gobernar decisiones complejas.",
        "isCorrect": true
      },
      {
        "text": "Un texto en prosa sin reglas matemáticas.",
        "isCorrect": false
      },
      {
        "text": "Una función que no devuelve ningún resultado.",
        "isCorrect": false
      }
    ],
    "explanation": "Las expresiones lógicas combinadas permiten modelar situaciones complejas en sistemas autónomos."
  },
  {
    "id": "g5_instrucciones_2",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "En: `SI (vidas > 1 Y nivel == 3) O tieneLlaveMaestra, ABRIR_PORTAL`. ¿Cuándo se abre el portal?",
    "options": [
      {
        "text": "Si tiene más de 1 vida en nivel 3, o si posee la llave maestra en cualquier circunstancia.",
        "isCorrect": true
      },
      {
        "text": "Solo si tiene cero vidas.",
        "isCorrect": false
      },
      {
        "text": "Nunca, porque el portal está bloqueado.",
        "isCorrect": false
      }
    ],
    "explanation": "El operador OR permite que se cumpla o bien el bloque entre paréntesis o bien la posesión de la llave."
  },
  {
    "id": "g5_instrucciones_3",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Cuál es el orden de precedencia estándar entre operadores lógicos si no hay paréntesis?",
    "options": [
      {
        "text": "Primero NOT, luego AND, y finalmente OR.",
        "isCorrect": true
      },
      {
        "text": "Primero OR, luego AND, y finalmente NOT.",
        "isCorrect": false
      },
      {
        "text": "Se evalúan todos exactamente al mismo tiempo.",
        "isCorrect": false
      }
    ],
    "explanation": "La jerarquía booleana resuelve negaciones primero, conjunciones (AND) después y disyunciones (OR) al final."
  },
  {
    "id": "g5_instrucciones_4",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "En la instrucción matemática `velocidad = clamp(velocidad + acel, -vMax, vMax)`, ¿qué realiza `clamp`?",
    "options": [
      {
        "text": "Restringe el valor numérico para que nunca sea menor a -vMax ni mayor a vMax.",
        "isCorrect": true
      },
      {
        "text": "Multiplica la velocidad por un número aleatorio.",
        "isCorrect": false
      },
      {
        "text": "Borra la aceleración del personaje.",
        "isCorrect": false
      }
    ],
    "explanation": "`clamp` acota una magnitud dentro de un intervalo cerrado seguro, evitando desbordamientos físicos."
  },
  {
    "id": "g5_instrucciones_5",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Qué es una instrucción asincrónica o con retardo (timeout/callback) en un sistema de juego?",
    "options": [
      {
        "text": "Una orden programada para ejecutarse luego de que transcurra un lapso o finalice un proceso paralelo.",
        "isCorrect": true
      },
      {
        "text": "Una instrucción que frena todo el sistema operativo.",
        "isCorrect": false
      },
      {
        "text": "Un comando que solo funciona con cables de fibra óptica.",
        "isCorrect": false
      }
    ],
    "explanation": "La asincronía permite ejecutar animaciones o conteos sin congelar el renderizado en pantalla."
  },
  {
    "id": "g5_instrucciones_6",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Por qué las instrucciones de seguridad en un robot real deben tener interrupción de hardware inmediata?",
    "options": [
      {
        "text": "Para detener los actuadores al instante ante un peligro sin esperar a que el software termine su bucle.",
        "isCorrect": true
      },
      {
        "text": "Para que el robot cambie de color de luces.",
        "isCorrect": false
      },
      {
        "text": "Para ahorrar batería en modo reposo.",
        "isCorrect": false
      }
    ],
    "explanation": "Las interrupciones de seguridad críticas priorizan la integridad física sobre el flujo normal del programa."
  },
  {
    "id": "g5_instrucciones_7",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "En un sistema de física 2D con vectores, ¿qué representa la instrucción `posicion.add(velocidad)`?",
    "options": [
      {
        "text": "La integración numérica de Euler: sumar el vector de velocidad para actualizar la posición en el tiempo.",
        "isCorrect": true
      },
      {
        "text": "Dibujar una línea entre dos puntos fijos.",
        "isCorrect": false
      },
      {
        "text": "Reiniciar la posición a cero.",
        "isCorrect": false
      }
    ],
    "explanation": "En cada frame, el desplazamiento acumulado modifica las coordenadas espaciales del personaje."
  },
  {
    "id": "g5_instrucciones_8",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Qué diferencia a un paradigma de programación imperativo de uno declarativo?",
    "options": [
      {
        "text": "El imperativo detalla el paso a paso de cómo hacer; el declarativo describe qué resultado se desea obtener.",
        "isCorrect": true
      },
      {
        "text": "El imperativo es para robots y el declarativo para personas.",
        "isCorrect": false
      },
      {
        "text": "No hay ninguna diferencia técnica.",
        "isCorrect": false
      }
    ],
    "explanation": "La programación imperativa guía el flujo de control, mientras la declarativa expresa la lógica sin control explícito."
  },
  {
    "id": "g5_instrucciones_9",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Qué es un parámetro por defecto (default parameter) en una función de código?",
    "options": [
      {
        "text": "Un valor predefinido que se utiliza automáticamente si el programador no pasa ese argumento al llamarla.",
        "isCorrect": true
      },
      {
        "text": "Un error que la máquina no puede solucionar.",
        "isCorrect": false
      },
      {
        "text": "Una contraseña de administrador.",
        "isCorrect": false
      }
    ],
    "explanation": "Los parámetros por defecto otorgan robustez permitiendo llamadas simplificadas con valores estándar seguros."
  },
  {
    "id": "g5_instrucciones_10",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Por qué los sistemas de control de robots verifican el estado de los sensores antes y después de cada acción?",
    "options": [
      {
        "text": "Para confirmar la retroalimentación (feedback loop) y corregir desvíos entre la orden y la realidad física.",
        "isCorrect": true
      },
      {
        "text": "Porque los sensores se olvidan de las órdenes.",
        "isCorrect": false
      },
      {
        "text": "Para generar más calor en la placa.",
        "isCorrect": false
      }
    ],
    "explanation": "El lazo de control cerrado (closed-loop) compara el estado real con el deseado para aplicar correcciones."
  },
  {
    "id": "g5_instrucciones_11",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Qué es el manejo de excepciones mediante bloques `try / catch` en programación?",
    "options": [
      {
        "text": "Una estructura que captura errores durante la ejecución para gestionarlos sin que la aplicación se cierre.",
        "isCorrect": true
      },
      {
        "text": "Un juego de atrapar pelotas en pantalla.",
        "isCorrect": false
      },
      {
        "text": "Un método para apagar la computadora.",
        "isCorrect": false
      }
    ],
    "explanation": "`try / catch` previene caídas catastróficas del sistema permitiendo una recuperación elegante ante imprevistos."
  },
  {
    "id": "g5_instrucciones_12",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "En la arquitectura de nuestro juego, ¿qué función cumple la instrucción `cleanupCurrentActivity()`?",
    "options": [
      {
        "text": "Detener timers activos, cancelar bucles y liberar memoria antes de cambiar de pantalla o nivel.",
        "isCorrect": true
      },
      {
        "text": "Borrar las notas de los alumnos.",
        "isCorrect": false
      },
      {
        "text": "Aumentar la dificultad al máximo.",
        "isCorrect": false
      }
    ],
    "explanation": "La limpieza de timers y listeners evita fugas de memoria y colisiones entre procesos en segundo plano."
  },
  {
    "id": "g5_programacion_1",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "En programación orientada a objetos (POO), ¿qué es una Clase y qué es un Objeto?",
    "options": [
      {
        "text": "La clase es el molde o plantilla; el objeto es la instancia concreta creada con ese molde.",
        "isCorrect": true
      },
      {
        "text": "La clase es el aula de la escuela y el objeto es el pizarrón.",
        "isCorrect": false
      },
      {
        "text": "Son exactamente sinónimos sin diferencia.",
        "isCorrect": false
      }
    ],
    "explanation": "Una clase define propiedades y métodos compartidos, mientras cada objeto contiene su propio estado."
  },
  {
    "id": "g5_programacion_2",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "En nuestra clase `BityPlatformerGame`, ¿cuáles son propiedades de estado del personaje?",
    "options": [
      {
        "text": "`player.x`, `player.y`, `player.vy`, `player.grounded` y `player.invulnerable`.",
        "isCorrect": true
      },
      {
        "text": "El color de las cortinas del aula.",
        "isCorrect": false
      },
      {
        "text": "La marca del teclado de la computadora.",
        "isCorrect": false
      }
    ],
    "explanation": "Estas variables numéricas y booleanas describen con precisión el estado físico de Bity en cada fotograma."
  },
  {
    "id": "g5_programacion_3",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué es una Máquina de Estados Finitos (FSM) y por qué se usa para controlar personajes?",
    "options": [
      {
        "text": "Un modelo donde el personaje se encuentra en un estado único a la vez (reposo, salto, daño) y transiciona por eventos.",
        "isCorrect": true
      },
      {
        "text": "Una máquina de vapor que fabrica engranajes.",
        "isCorrect": false
      },
      {
        "text": "Un programa que no tiene fin.",
        "isCorrect": false
      }
    ],
    "explanation": "La FSM asegura que el personaje solo realice acciones válidas según su estado actual (ej: no saltar si ya está en el aire)."
  },
  {
    "id": "g5_programacion_4",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué es la recursividad en programación?",
    "options": [
      {
        "text": "Una función que se llama a sí misma para resolver un subproblema más pequeño hasta alcanzar un caso base.",
        "isCorrect": true
      },
      {
        "text": "Un bucle que nunca se detiene y rompe el juego.",
        "isCorrect": false
      },
      {
        "text": "Un tipo de cable conector.",
        "isCorrect": false
      }
    ],
    "explanation": "La recursión divide problemas complejos en instancias similares más simples hasta llegar a una solución trivial."
  },
  {
    "id": "g5_programacion_5",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Por qué se busca mantener una tasa constante de 60 cuadros por segundo (60 FPS) en un juego?",
    "options": [
      {
        "text": "Para ofrecer máxima fluidez visual y garantizar que los cálculos de física sean estables y responsivos.",
        "isCorrect": true
      },
      {
        "text": "Para que el monitor gaste más energía.",
        "isCorrect": false
      },
      {
        "text": "Porque 60 es el número favorito de las computadoras.",
        "isCorrect": false
      }
    ],
    "explanation": "A 60 FPS, el intervalo entre cuadros es de aproximadamente 16.6 ms, ideal para la percepción humana."
  },
  {
    "id": "g5_programacion_6",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué peligro genera una fuga de memoria (memory leak) en una aplicación web interactiva?",
    "options": [
      {
        "text": "Acumula objetos en memoria RAM que nunca se liberan, ralentizando el navegador hasta congelarlo.",
        "isCorrect": true
      },
      {
        "text": "Hace que los gráficos salgan de la pantalla.",
        "isCorrect": false
      },
      {
        "text": "Provoca un cortocircuito eléctrico en el enchufe.",
        "isCorrect": false
      }
    ],
    "explanation": "Liberar referencias e intervalos no utilizados es vital para el rendimiento continuo del sistema."
  },
  {
    "id": "g5_programacion_7",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué es una API (Application Programming Interface) en el desarrollo de software?",
    "options": [
      {
        "text": "Un conjunto de funciones y reglas públicas que permite que dos sistemas o módulos se comuniquen de forma estándar.",
        "isCorrect": true
      },
      {
        "text": "Un tipo de pantalla táctil.",
        "isCorrect": false
      },
      {
        "text": "Un lenguaje que solo entiende la placa de video.",
        "isCorrect": false
      }
    ],
    "explanation": "Las APIs permiten integrar servicios, módulos y bases de datos sin necesidad de conocer su código interno."
  },
  {
    "id": "g5_programacion_8",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Para qué se utiliza el formato JSON (JavaScript Object Notation) en la persistencia de datos?",
    "options": [
      {
        "text": "Para serializar estructuras de datos en texto plano legible, ideal para guardar y transmitir información.",
        "isCorrect": true
      },
      {
        "text": "Para pintar píxeles en el canvas.",
        "isCorrect": false
      },
      {
        "text": "Para amplificar el sonido de los parlantes.",
        "isCorrect": false
      }
    ],
    "explanation": "JSON es el estándar universal liviano para representar objetos y arreglos estructurados."
  },
  {
    "id": "g5_programacion_9",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué es el patrón de diseño Modelo-Vista-Controlador (MVC)?",
    "options": [
      {
        "text": "Una arquitectura que separa los datos (Modelo), la interfaz (Vista) y la lógica de interacción (Controlador).",
        "isCorrect": true
      },
      {
        "text": "Una marca de tres computadoras conectadas.",
        "isCorrect": false
      },
      {
        "text": "Un tipo de control de mando con tres botones.",
        "isCorrect": false
      }
    ],
    "explanation": "MVC promueve la separación de responsabilidades, facilitando el desarrollo y testeo modular."
  },
  {
    "id": "g5_programacion_10",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Por qué es fundamental la inmutabilidad o el aislamiento del estado en sistemas concurrentes?",
    "options": [
      {
        "text": "Para prevenir que dos procesos modifiquen los mismos datos al mismo tiempo generando inconsistencias (race conditions).",
        "isCorrect": true
      },
      {
        "text": "Para que el juego nunca pueda actualizar sus puntajes.",
        "isCorrect": false
      },
      {
        "text": "Porque las computadoras no saben sumar dos veces.",
        "isCorrect": false
      }
    ],
    "explanation": "Evitar estados compartidos mutables asegura predictibilidad y previene bugs difíciles de reproducir."
  },
  {
    "id": "g5_programacion_11",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué es una prueba unitaria (unit test) automatizada en el desarrollo de software?",
    "options": [
      {
        "text": "Un test de código que verifica automáticamente que una función o módulo cumpla su contrato esperado.",
        "isCorrect": true
      },
      {
        "text": "Un examen sorpresa que se le toma a los alumnos en clase.",
        "isCorrect": false
      },
      {
        "text": "Un cable de prueba con voltímetro.",
        "isCorrect": false
      }
    ],
    "explanation": "Las pruebas unitarias garantizan que los cambios nuevos no rompan funcionalidades preexistentes (evitan regresiones)."
  },
  {
    "id": "g5_programacion_12",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué significa que un sistema sea escalable?",
    "options": [
      {
        "text": "Que puede crecer en niveles, usuarios y complejidad sin requerir una reescritura total de su arquitectura.",
        "isCorrect": true
      },
      {
        "text": "Que tiene una escalera dibujada en el fondo.",
        "isCorrect": false
      },
      {
        "text": "Que solo funciona con monitores gigantes.",
        "isCorrect": false
      }
    ],
    "explanation": "La escalabilidad es un atributo de calidad esencial para la evolución de plataformas educativas a largo plazo."
  },
  {
    "id": "g5_algoritmos_1",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Qué es el algoritmo de Búsqueda en Anchura (Breadth-First Search - BFS)?",
    "options": [
      {
        "text": "Un algoritmo que explora un grafo nivel por nivel garantizando hallar el camino más corto en grafos no ponderados.",
        "isCorrect": true
      },
      {
        "text": "Un algoritmo que busca solo por el borde exterior del mapa.",
        "isCorrect": false
      },
      {
        "text": "Un método que elige caminos al azar sin memorizar.",
        "isCorrect": false
      }
    ],
    "explanation": "BFS explora todas las ramas adyacentes de forma concéntrica, asegurando la ruta óptima de menor cantidad de pasos."
  },
  {
    "id": "g5_algoritmos_2",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Qué diferencia a un algoritmo voraz (greedy) de uno de programación dinámica?",
    "options": [
      {
        "text": "El voraz elige la mejor opción local inmediata; la dinámica evalúa y reutiliza soluciones de subproblemas globales.",
        "isCorrect": true
      },
      {
        "text": "El voraz nunca llega al final y la dinámica sí.",
        "isCorrect": false
      },
      {
        "text": "Son exactamente iguales con diferente nombre.",
        "isCorrect": false
      }
    ],
    "explanation": "Los algoritmos greedy son rápidos pero pueden no hallar la solución global óptima; la programación dinámica sí."
  },
  {
    "id": "g5_algoritmos_3",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿En qué consiste el principio algorítmico de «Divide y Vencerás» (Divide and Conquer)?",
    "options": [
      {
        "text": "Dividir un problema en subproblemas independientes, resolver cada uno y luego combinar sus soluciones.",
        "isCorrect": true
      },
      {
        "text": "Hacer que dos robots peleen entre sí.",
        "isCorrect": false
      },
      {
        "text": "Separar la pantalla en dos mitades sin comunicarse.",
        "isCorrect": false
      }
    ],
    "explanation": "Divide y vencerás es la base de algoritmos fundamentales como Quicksort y Mergesort."
  },
  {
    "id": "g5_algoritmos_4",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Por qué una Tabla Hash (diccionario con clave-valor) permite búsquedas en tiempo constante promedio O(1)?",
    "options": [
      {
        "text": "Porque aplica una función hash a la clave para calcular directamente la posición de memoria del dato.",
        "isCorrect": true
      },
      {
        "text": "Porque tiene pocos datos guardados.",
        "isCorrect": false
      },
      {
        "text": "Porque busca de izquierda a derecha a toda velocidad.",
        "isCorrect": false
      }
    ],
    "explanation": "La función hash transforma la clave en un índice directo, obviando la necesidad de recorrer toda la lista."
  },
  {
    "id": "g5_algoritmos_5",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Qué es el pseudocódigo y para qué lo emplean los ingenieros de software?",
    "options": [
      {
        "text": "Una descripción estructurada en lenguaje natural de los pasos de un algoritmo antes de codificarlo formalmente.",
        "isCorrect": true
      },
      {
        "text": "Un código falso creado por un virus.",
        "isCorrect": false
      },
      {
        "text": "Un idioma que solo entienden los procesadores cuánticos.",
        "isCorrect": false
      }
    ],
    "explanation": "El pseudocódigo permite razonar sobre la lógica algorítmica sin atarse a la sintaxis estricta de un lenguaje específico."
  },
  {
    "id": "g5_algoritmos_6",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "En el algoritmo de ordenamiento rápido (Quicksort), ¿qué función cumple el «pivote»?",
    "options": [
      {
        "text": "Es el elemento de referencia que divide los datos: los menores se ubican a su izquierda y los mayores a su derecha.",
        "isCorrect": true
      },
      {
        "text": "El elemento que se borra de la lista.",
        "isCorrect": false
      },
      {
        "text": "El primer elemento que se imprime en pantalla.",
        "isCorrect": false
      }
    ],
    "explanation": "La partición en torno al pivote es la operación nuclear que ordena recursivamente los subarreglos."
  },
  {
    "id": "g5_algoritmos_7",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Qué es un caso base en una función algorítmica recursiva?",
    "options": [
      {
        "text": "La condición de detención que retorna un valor directo y evita que la función se invoque infinitamente.",
        "isCorrect": true
      },
      {
        "text": "El primer piso de la torre de bloques.",
        "isCorrect": false
      },
      {
        "text": "El nombre del archivo principal.",
        "isCorrect": false
      }
    ],
    "explanation": "Sin un caso base bien formulado, una llamada recursiva provocaría un desbordamiento de pila (stack overflow)."
  },
  {
    "id": "g5_algoritmos_8",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Para qué se utilizan los algoritmos de encriptación y criptografía en la seguridad informática?",
    "options": [
      {
        "text": "Para cifrar datos mediante transformaciones matemáticas de modo que solo quien posea la clave pueda descifrarlos.",
        "isCorrect": true
      },
      {
        "text": "Para comprimir videos de alta definición.",
        "isCorrect": false
      },
      {
        "text": "Para borrar el historial del navegador.",
        "isCorrect": false
      }
    ],
    "explanation": "La criptografía moderna protege la confidencialidad, autenticidad e integridad de la información digital."
  },
  {
    "id": "g5_algoritmos_9",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Cómo resuelve un algoritmo de arbitraje la colisión inminente de dos robots autónomos en un cruce?",
    "options": [
      {
        "text": "Calculando prioridades de paso, frenando a uno temporalmente o reservando franjas temporales de tránsito.",
        "isCorrect": true
      },
      {
        "text": "Permitiendo que choquen para ver cuál es más fuerte.",
        "isCorrect": false
      },
      {
        "text": "Apagando ambos robots al azar.",
        "isCorrect": false
      }
    ],
    "explanation": "La planificación de trayectorias sin colisión gestiona reservas espaciotemporales seguras para cada agente."
  },
  {
    "id": "g5_algoritmos_10",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Qué es la compresión de datos sin pérdida (lossless compression)?",
    "options": [
      {
        "text": "Un algoritmo que reduce el tamaño del archivo de forma tal que se puede recuperar exactamente el 100% de la información original.",
        "isCorrect": true
      },
      {
        "text": "Una compresión que descarta la mitad de las letras.",
        "isCorrect": false
      },
      {
        "text": "Un método que borra archivos duplicados.",
        "isCorrect": false
      }
    ],
    "explanation": "Algoritmos como Huffman o DEFLATE (ZIP) reducen redundancias estadísticas preservando cada byte original."
  },
  {
    "id": "g5_algoritmos_11",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Qué es la Notación Asintótica Big-O en ciencias de la computación?",
    "options": [
      {
        "text": "Una convención matemática para describir el comportamiento y escalabilidad del tiempo de ejecución de un algoritmo.",
        "isCorrect": true
      },
      {
        "text": "Una letra grande que se dibuja en el pizarrón.",
        "isCorrect": false
      },
      {
        "text": "Una marca registrada de computadoras.",
        "isCorrect": false
      }
    ],
    "explanation": "Big-O modela cómo crece el consumo de recursos al aumentar el tamaño N de los datos de entrada."
  },
  {
    "id": "g5_algoritmos_12",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Por qué un algoritmo de optimización permite que miles de alumnos jueguen simultáneamente en un servidor escolar?",
    "options": [
      {
        "text": "Porque distribuye eficientemente los ciclos de CPU y memoria, evitando cuellos de botella en la red.",
        "isCorrect": true
      },
      {
        "text": "Porque el servidor tiene miles de cables enchufados.",
        "isCorrect": false
      },
      {
        "text": "Porque los juegos no usan memoria de la computadora.",
        "isCorrect": false
      }
    ],
    "explanation": "La eficiencia algorítmica maximiza el rendimiento y disponibilidad de servicios educativos de gran escala."
  },
  {
    "id": "g5_matematica_1",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity sincroniza la energía del núcleo cuántico! ¿Cuánto es 15 × 4 − 8 × 3?",
    "options": [
      {
        "text": "36",
        "isCorrect": true
      },
      {
        "text": "32",
        "isCorrect": false
      },
      {
        "text": "40",
        "isCorrect": false
      }
    ],
    "explanation": "Multiplicamos primero: 15 × 4 = 60 y 8 × 3 = 24. Luego restamos: 60 − 24 = 36."
  },
  {
    "id": "g5_matematica_2",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity regula el sistema de propulsión estelar! ¿Cuánto es 100 − (12 × 5 + 10)?",
    "options": [
      {
        "text": "30",
        "isCorrect": true
      },
      {
        "text": "35",
        "isCorrect": false
      },
      {
        "text": "25",
        "isCorrect": false
      }
    ],
    "explanation": "Dentro del paréntesis: 12 × 5 = 60, más 10 = 70. Luego 100 − 70 = 30."
  },
  {
    "id": "g5_matematica_3",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity calcula la trayectoria orbital! ¿Cuánto es (24 ÷ 6 + 6) × 7?",
    "options": [
      {
        "text": "70",
        "isCorrect": true
      },
      {
        "text": "65",
        "isCorrect": false
      },
      {
        "text": "75",
        "isCorrect": false
      }
    ],
    "explanation": "Dentro del paréntesis: 24 ÷ 6 = 4, más 6 = 10. Luego 10 × 7 = 70."
  },
  {
    "id": "g5_matematica_4",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity estabiliza el escudo deflector! ¿Cuánto es 8 × 9 − 5 × 6?",
    "options": [
      {
        "text": "42",
        "isCorrect": true
      },
      {
        "text": "40",
        "isCorrect": false
      },
      {
        "text": "45",
        "isCorrect": false
      }
    ],
    "explanation": "Multiplicamos primero: 8 × 9 = 72 y 5 × 6 = 30. Restamos: 72 − 30 = 42."
  },
  {
    "id": "g5_matematica_5",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity equilibra la temperatura del generador! ¿Cuánto es 150 − (20 × 4 + 30)?",
    "options": [
      {
        "text": "40",
        "isCorrect": true
      },
      {
        "text": "35",
        "isCorrect": false
      },
      {
        "text": "50",
        "isCorrect": false
      }
    ],
    "explanation": "Paréntesis: 20 × 4 = 80, más 30 = 110. Luego 150 − 110 = 40."
  },
  {
    "id": "g5_matematica_6",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity ajusta el radar de telemetría! ¿Cuánto es (45 ÷ 9 + 7) × 8?",
    "options": [
      {
        "text": "96",
        "isCorrect": true
      },
      {
        "text": "90",
        "isCorrect": false
      },
      {
        "text": "104",
        "isCorrect": false
      }
    ],
    "explanation": "Paréntesis: 45 ÷ 9 = 5, más 7 = 12. Luego 12 × 8 = 96."
  },
  {
    "id": "g5_matematica_7",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity calibra la matriz de sensores! ¿Cuánto es 25 × 4 − 18 × 2?",
    "options": [
      {
        "text": "64",
        "isCorrect": true
      },
      {
        "text": "60",
        "isCorrect": false
      },
      {
        "text": "68",
        "isCorrect": false
      }
    ],
    "explanation": "Multiplicamos: 25 × 4 = 100 y 18 × 2 = 36. Restamos: 100 − 36 = 64."
  },
  {
    "id": "g5_matematica_8",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity programa el salto hiperespacial! ¿Cuánto es 200 − (35 × 2 + 50)?",
    "options": [
      {
        "text": "80",
        "isCorrect": true
      },
      {
        "text": "75",
        "isCorrect": false
      },
      {
        "text": "85",
        "isCorrect": false
      }
    ],
    "explanation": "Paréntesis: 35 × 2 = 70, más 50 = 120. Luego 200 − 120 = 80."
  },
  {
    "id": "g5_matematica_9",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity analiza la densidad del asteroide! ¿Cuánto es (16 × 3 − 8) ÷ 4?",
    "options": [
      {
        "text": "10",
        "isCorrect": true
      },
      {
        "text": "8",
        "isCorrect": false
      },
      {
        "text": "12",
        "isCorrect": false
      }
    ],
    "explanation": "Paréntesis: 16 × 3 = 48, menos 8 = 40. Luego 40 ÷ 4 = 10."
  },
  {
    "id": "g5_matematica_10",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity calcula la potencia de la nave espacial! ¿Cuánto es 12 × 12 − 44?",
    "options": [
      {
        "text": "100",
        "isCorrect": true
      },
      {
        "text": "96",
        "isCorrect": false
      },
      {
        "text": "104",
        "isCorrect": false
      }
    ],
    "explanation": "Primero el cuadrado 12 × 12 = 144; luego restamos 44: 144 − 44 = 100."
  },
  {
    "id": "g5_matematica_11",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity programa el retorno a la Tierra! ¿Cuánto es (70 − 25) × 2 − 30?",
    "options": [
      {
        "text": "60",
        "isCorrect": true
      },
      {
        "text": "55",
        "isCorrect": false
      },
      {
        "text": "65",
        "isCorrect": false
      }
    ],
    "explanation": "Paréntesis: 70 − 25 = 45; luego 45 × 2 = 90; finalmente 90 − 30 = 60."
  },
  {
    "id": "g5_matematica_12",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity recarga la batería cósmica definitiva! ¿Cuánto es 50 × 3 − (40 × 2 + 20)?",
    "options": [
      {
        "text": "50",
        "isCorrect": true
      },
      {
        "text": "45",
        "isCorrect": false
      },
      {
        "text": "55",
        "isCorrect": false
      }
    ],
    "explanation": "Primero 50 × 3 = 150. Paréntesis: 40 × 2 = 80 + 20 = 100. Restamos: 150 − 100 = 50."
  }
];

class BityQuestionManager {
  constructor() {
    this.history = [];
    this.maxHistoryPerCategory = 8; // Recuerda hasta 8 preguntas recientes por categoría
  }

  /**
   * Obtiene una pregunta aleatoria no repetida recientemente para el grado y categoría especificados.
   * @param {number} grade - Grado escolar (1 a 5)
   * @param {string} category - Categoría ('instrucciones', 'programacion', 'algoritmos', 'matematica')
   * @param {number} level - Nivel del juego (1, 2, 3)
   * @returns {Object} Pregunta con opciones formateadas y desordenadas aleatoriamente
   */
  getQuestion(grade = 1, category = 'instrucciones', level = 1) {
    const targetGrade = parseInt(grade) || 1;
    const isGradeOne = targetGrade === 1;

    // Si la categoría solicitada es 'programming', normalizar a 'programacion'
    const catNorm = category === 'programming' ? 'programacion' : (category === 'math' ? 'matematica' : category);

    // 1. Filtrar preguntas que coincidan con grado y categoría
    const pool = BITY_QUESTION_BANK.filter(q => q.grade === targetGrade && q.category === catNorm);

    if (pool.length === 0) {
      // Fallback a cualquier pregunta de esa categoría
      const fallback = BITY_QUESTION_BANK.filter(q => q.category === catNorm);
      if (fallback.length === 0) return null;
      return this._formatQuestion(fallback[0], isGradeOne);
    }

    // 2. Filtrar preguntas que no estén en el historial reciente
    let available = pool.filter(q => !this.history.includes(q.id));

    // Si se agotó el banco disponible en el historial, reiniciar el historial de esta categoría
    // pero conservando la última para evitar repetición inmediata
    if (available.length === 0) {
      const lastId = this.history.filter(id => id.startsWith(`g${targetGrade}_${catNorm}`)).pop();
      this.history = this.history.filter(id => !id.startsWith(`g${targetGrade}_${catNorm}`) || id === lastId);
      available = pool.filter(q => !this.history.includes(q.id));
      if (available.length === 0) available = pool;
    }

    // 3. Selección aleatoria entre las disponibles
    const selected = available[Math.floor(Math.random() * available.length)];

    // 4. Registrar en el historial
    this.history.push(selected.id);
    if (this.history.length > 50) {
      this.history.shift();
    }

    // 5. Retornar copia formateada con opciones mezcladas
    return this._formatQuestion(selected, isGradeOne);
  }

  /**
   * Formatea una pregunta mezclando las opciones y adaptando el texto a mayúsculas si es 1.° grado.
   */
  _formatQuestion(rawQ, isGradeOne = false) {
    // Copiar y desordenar opciones (Fisher-Yates shuffle)
    const shuffledOpts = rawQ.options.map((opt, idx) => ({ ...opt, origIdx: idx }));
    for (let i = shuffledOpts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOpts[i], shuffledOpts[j]] = [shuffledOpts[j], shuffledOpts[i]];
    }

    const labels = ['A', 'B', 'C'];
    const formattedOptions = shuffledOpts.map((opt, idx) => {
      const label = labels[idx];
      const text = isGradeOne ? opt.text.toUpperCase() : opt.text;
      return {
        id: `opt_${label.toLowerCase()}`,
        label: label,
        text: `${label}. ${text}`,
        isCorrect: opt.isCorrect === true
      };
    });

    const questionText = isGradeOne ? rawQ.question.toUpperCase() : rawQ.question;
    const explanationText = isGradeOne ? rawQ.explanation.toUpperCase() : rawQ.explanation;

    return {
      id: rawQ.id,
      grade: rawQ.grade,
      category: rawQ.category,
      difficulty: rawQ.difficulty,
      question: questionText,
      options: formattedOptions,
      explanation: explanationText
    };
  }

  /**
   * Limpia el historial de preguntas
   */
  resetHistory() {
    this.history = [];
  }
}

// Exportar globalmente
window.BITY_QUESTION_BANK = BITY_QUESTION_BANK;
window.BityQuestionManager = BityQuestionManager;
