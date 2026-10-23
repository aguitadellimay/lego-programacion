/**
 * platformerQuestions.js - Banco de preguntas pedagógicas y motor de aleatoriedad
 * Desafío final: Instrucciones - Lego Familiar
 *
 * Contenidos estrictamente adaptados a Educación Primaria (1.º a 5.º grado):
 * 1. Qué es una instrucción (orden clara que indica qué hacer).
 * 2. Qué es un algoritmo (conjunto de pasos ordenados para resolver una tarea).
 * 3. Qué significa programar (darle instrucciones a una computadora o robot).
 *
 * Operaciones matemáticas simples adaptadas por grado:
 * - 1.°: Sumas sencillas con números pequeños
 * - 2.°: Restas sencillas y sumas fáciles con números pequeños (resultado positivo)
 * - 3.°: Sumas y restas simples con números de hasta dos cifras
 * - 4.°: Operaciones combinadas sencillas de 2 pasos (solo sumas y restas)
 * - 5.°: Operaciones combinadas sencillas con números de 2 cifras (solo sumas y restas)
 *
 * Banco de 240 preguntas distribuidas equitativamente:
 * - 5 grados (1.º a 5.º grado)
 * - 4 categorías (instrucciones, programacion, algoritmos, matematica)
 * - Exactamente 12 preguntas por combinación.
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
        "text": "Una orden que indica qué acción debe hacer Bity o una computadora.",
        "isCorrect": true
      },
      {
        "text": "Un dibujo de muchos colores.",
        "isCorrect": false
      },
      {
        "text": "Una canción para bailar.",
        "isCorrect": false
      }
    ],
    "explanation": "Una instrucción es una indicación u orden clara que dice qué acción realizar."
  },
  {
    "id": "g1_instrucciones_2",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si queremos que Bity camine hacia adelante, ¿cuál es la instrucción correcta?",
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
        "text": "Quedarse quieto",
        "isCorrect": false
      }
    ],
    "explanation": "«Avanzar 1 paso» le indica a Bity que se desplace hacia el frente."
  },
  {
    "id": "g1_instrucciones_3",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si le damos a Bity la orden «Saltar», ¿qué acción realiza?",
    "options": [
      {
        "text": "Da un salto hacia arriba.",
        "isCorrect": true
      },
      {
        "text": "Se apaga por completo.",
        "isCorrect": false
      },
      {
        "text": "Camina hacia atrás.",
        "isCorrect": false
      }
    ],
    "explanation": "La orden «Saltar» hace que Bity se impulse hacia arriba."
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
        "text": "Para funcionar sin encenderse.",
        "isCorrect": false
      },
      {
        "text": "Para moverse sin que nadie le diga nada.",
        "isCorrect": false
      }
    ],
    "explanation": "Los robots necesitan instrucciones para saber con exactitud qué hacer."
  },
  {
    "id": "g1_instrucciones_5",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si un semáforo peatonal se pone en verde, ¿qué instrucción nos indica?",
    "options": [
      {
        "text": "Cruzar la calle con cuidado.",
        "isCorrect": true
      },
      {
        "text": "Esperar en la vereda sin moverse.",
        "isCorrect": false
      },
      {
        "text": "Retroceder a casa.",
        "isCorrect": false
      }
    ],
    "explanation": "La luz verde peatonal es una señal que indica la orden de cruzar."
  },
  {
    "id": "g1_instrucciones_6",
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
        "text": "Hacer algo divertido",
        "isCorrect": false
      },
      {
        "text": "Mañana tal vez",
        "isCorrect": false
      }
    ],
    "explanation": "«Girar a la derecha» es una orden directa y comprensible."
  },
  {
    "id": "g1_instrucciones_7",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si la orden dice «Retroceder 1 paso», ¿hacia dónde se mueve Bity?",
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
    "explanation": "Retroceder significa moverse hacia atrás."
  },
  {
    "id": "g1_instrucciones_8",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "En la escuela, ¿cuál es una instrucción clara de la maestra?",
    "options": [
      {
        "text": "Abrir el cuaderno en la página 5.",
        "isCorrect": true
      },
      {
        "text": "El sol es de color amarillo.",
        "isCorrect": false
      },
      {
        "text": "Hoy es un día soleado.",
        "isCorrect": false
      }
    ],
    "explanation": "«Abrir el cuaderno en la página 5» es una orden concreta que indica una acción a realizar."
  },
  {
    "id": "g1_instrucciones_9",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si Bity está frente a un charco pequeño, ¿qué orden le ayuda a superarlo sin mojarse?",
    "options": [
      {
        "text": "Saltar el charco",
        "isCorrect": true
      },
      {
        "text": "Sentarse en el agua",
        "isCorrect": false
      },
      {
        "text": "Caminar hacia abajo",
        "isCorrect": false
      }
    ],
    "explanation": "Saltar permite elevarse y pasar por encima del charco sin tocar el agua."
  },
  {
    "id": "g1_instrucciones_10",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si le damos a Bity una orden incompleta como «Avanzar» sin decirle cuánto, ¿qué sucede?",
    "options": [
      {
        "text": "Bity no sabe cuántos pasos debe dar.",
        "isCorrect": true
      },
      {
        "text": "Bity camina exactamente 100 pasos.",
        "isCorrect": false
      },
      {
        "text": "Bity adivina nuestro pensamiento.",
        "isCorrect": false
      }
    ],
    "explanation": "Una instrucción incompleta deja dudas y la máquina no sabe cómo actuar."
  },
  {
    "id": "g1_instrucciones_11",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si queremos que Bity recoja una batería del suelo, ¿qué instrucción le damos al estar sobre ella?",
    "options": [
      {
        "text": "Agarrar la batería",
        "isCorrect": true
      },
      {
        "text": "Mirar hacia el cielo",
        "isCorrect": false
      },
      {
        "text": "Dar tres vueltas",
        "isCorrect": false
      }
    ],
    "explanation": "La instrucción «Agarrar la batería» realiza la recolección del objeto."
  },
  {
    "id": "g1_instrucciones_12",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si le decimos a Bity «Detenerse», ¿qué hace el robot?",
    "options": [
      {
        "text": "Se queda quieto en su lugar.",
        "isCorrect": true
      },
      {
        "text": "Corre hacia adelante.",
        "isCorrect": false
      },
      {
        "text": "Salta sin parar.",
        "isCorrect": false
      }
    ],
    "explanation": "«Detenerse» le ordena finalizar el movimiento y permanecer en su sitio."
  },
  {
    "id": "g1_programacion_1",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Qué significa programar?",
    "options": [
      {
        "text": "Darle instrucciones a una computadora o a un robot para que haga una tarea.",
        "isCorrect": true
      },
      {
        "text": "Comprar una computadora en una tienda.",
        "isCorrect": false
      },
      {
        "text": "Limpiar la pantalla de la computadora.",
        "isCorrect": false
      }
    ],
    "explanation": "Programar consiste en indicar mediante órdenes qué debe hacer una máquina."
  },
  {
    "id": "g1_programacion_2",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Quién le dice a Bity qué tiene que hacer en cada momento?",
    "options": [
      {
        "text": "La persona que lo programa con instrucciones.",
        "isCorrect": true
      },
      {
        "text": "La computadora sola sin ayuda.",
        "isCorrect": false
      },
      {
        "text": "Nadie, el robot adivina todo.",
        "isCorrect": false
      }
    ],
    "explanation": "Bity cumple únicamente las instrucciones que una persona le programó."
  },
  {
    "id": "g1_programacion_3",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Las computadoras pueden pensar solas como las personas?",
    "options": [
      {
        "text": "No, solo siguen las instrucciones que les programamos.",
        "isCorrect": true
      },
      {
        "text": "Sí, piensan y deciden por su cuenta.",
        "isCorrect": false
      },
      {
        "text": "Sí, saben todo sin instrucciones.",
        "isCorrect": false
      }
    ],
    "explanation": "Las computadoras no piensan; ejecutan estrictamente las órdenes que reciben."
  },
  {
    "id": "g1_programacion_4",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "Cuando programamos a Bity, ¿en qué orden realiza las acciones?",
    "options": [
      {
        "text": "En el orden en que colocamos las instrucciones.",
        "isCorrect": true
      },
      {
        "text": "En cualquier orden al azar.",
        "isCorrect": false
      },
      {
        "text": "Al revés de lo que escribimos.",
        "isCorrect": false
      }
    ],
    "explanation": "Bity sigue la lista de instrucciones paso a paso, una tras otra."
  },
  {
    "id": "g1_programacion_5",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Qué hace el botón verde «Play» o «Iniciar» en el juego?",
    "options": [
      {
        "text": "Comienza a ejecutar las instrucciones programadas.",
        "isCorrect": true
      },
      {
        "text": "Borra todas las instrucciones.",
        "isCorrect": false
      },
      {
        "text": "Apaga la computadora.",
        "isCorrect": false
      }
    ],
    "explanation": "El botón Iniciar activa la ejecución de las órdenes preparadas."
  },
  {
    "id": "g1_programacion_6",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "Si programamos a Bity para llegar al cohete, ¿qué debemos darle?",
    "options": [
      {
        "text": "Una lista de instrucciones paso a paso hasta el cohete.",
        "isCorrect": true
      },
      {
        "text": "Un dibujo de un cohete.",
        "isCorrect": false
      },
      {
        "text": "Ninguna orden, solo mirar la pantalla.",
        "isCorrect": false
      }
    ],
    "explanation": "Para alcanzar la meta se requiere una secuencia ordenada de pasos."
  },
  {
    "id": "g1_programacion_7",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Quién es un programador o programadora?",
    "options": [
      {
        "text": "Una persona que crea instrucciones para computadoras o robots.",
        "isCorrect": true
      },
      {
        "text": "Una persona que solo mira dibujos animados.",
        "isCorrect": false
      },
      {
        "text": "Un robot que fabrica tornillos.",
        "isCorrect": false
      }
    ],
    "explanation": "Un programador o programadora diseña las órdenes que guían a las máquinas."
  },
  {
    "id": "g1_programacion_8",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "Si queremos que Bity salude con la mano, ¿qué tenemos que hacer?",
    "options": [
      {
        "text": "Programar la instrucción de levantar y mover la mano.",
        "isCorrect": true
      },
      {
        "text": "Esperar a que Bity lo adivine solo.",
        "isCorrect": false
      },
      {
        "text": "Apretar cualquier botón sin mirar.",
        "isCorrect": false
      }
    ],
    "explanation": "Para que un personaje realice una acción específica, debemos programar su instrucción."
  },
  {
    "id": "g1_programacion_9",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Qué podemos crear cuando aprendemos a programar?",
    "options": [
      {
        "text": "Juegos divertidos, historias y robots que nos ayudan.",
        "isCorrect": true
      },
      {
        "text": "Solamente cuentas difíciles.",
        "isCorrect": false
      },
      {
        "text": "Nada, la programación no crea nada.",
        "isCorrect": false
      }
    ],
    "explanation": "Programar nos permite crear videojuegos, animaciones y soluciones útiles."
  },
  {
    "id": "g1_programacion_10",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "Si cambiamos de lugar dos instrucciones en nuestro programa, ¿qué sucede?",
    "options": [
      {
        "text": "Bity hará las acciones en un orden diferente.",
        "isCorrect": true
      },
      {
        "text": "Bity siempre hace lo mismo sin importar el orden.",
        "isCorrect": false
      },
      {
        "text": "La computadora se apaga de inmediato.",
        "isCorrect": false
      }
    ],
    "explanation": "Al cambiar el orden de las instrucciones, cambia la secuencia en que actúa el robot."
  },
  {
    "id": "g1_programacion_11",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Un robot como Bity puede funcionar sin un programa de instrucciones?",
    "options": [
      {
        "text": "No, sin instrucciones se queda quieto sin saber qué hacer.",
        "isCorrect": true
      },
      {
        "text": "Sí, camina solo a donde él quiera.",
        "isCorrect": false
      },
      {
        "text": "Sí, adivina el camino sin ayuda.",
        "isCorrect": false
      }
    ],
    "explanation": "Los robots dependen por completo de las instrucciones programadas para actuar."
  },
  {
    "id": "g1_programacion_12",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "Después de armar un programa para Bity, ¿qué hacemos para ver si funciona?",
    "options": [
      {
        "text": "Probarlo y observar si Bity cumple la tarea.",
        "isCorrect": true
      },
      {
        "text": "Cerrar los ojos y no mirar.",
        "isCorrect": false
      },
      {
        "text": "Borrarlo enseguida sin probar nada.",
        "isCorrect": false
      }
    ],
    "explanation": "Probar el programa permite verificar que las instrucciones logren la meta esperada."
  },
  {
    "id": "g1_algoritmos_1",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "¿Qué es un algoritmo?",
    "options": [
      {
        "text": "Un conjunto de pasos ordenados para realizar una tarea o resolver un problema.",
        "isCorrect": true
      },
      {
        "text": "Una máquina para cortar papel.",
        "isCorrect": false
      },
      {
        "text": "Un dibujo en el pizarrón.",
        "isCorrect": false
      }
    ],
    "explanation": "Un algoritmo es una serie de pasos ordenados para alcanzar un objetivo."
  },
  {
    "id": "g1_algoritmos_2",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para lavarse las manos: ¿cuál es el primer paso?",
    "options": [
      {
        "text": "Abrir la canilla y mojarse las manos.",
        "isCorrect": true
      },
      {
        "text": "Secarse con la toalla limpia.",
        "isCorrect": false
      },
      {
        "text": "Guardar el jabón sin abrir el agua.",
        "isCorrect": false
      }
    ],
    "explanation": "El primer paso para lavarse las manos es mojárselas con agua de la canilla."
  },
  {
    "id": "g1_algoritmos_3",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para ponerse las zapatillas: ¿qué paso va antes?",
    "options": [
      {
        "text": "Ponerse las medias.",
        "isCorrect": true
      },
      {
        "text": "Atarse los cordones de la zapatilla.",
        "isCorrect": false
      },
      {
        "text": "Salir corriendo a jugar.",
        "isCorrect": false
      }
    ],
    "explanation": "Antes de calzarse las zapatillas, es necesario ponerse las medias."
  },
  {
    "id": "g1_algoritmos_4",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para armar una torre de 2 bloques Lego: ¿cuál es el primer paso?",
    "options": [
      {
        "text": "Apoyar el primer bloque sobre la mesa.",
        "isCorrect": true
      },
      {
        "text": "Poner el segundo bloque en el aire.",
        "isCorrect": false
      },
      {
        "text": "Desarmar la torre completa.",
        "isCorrect": false
      }
    ],
    "explanation": "Toda construcción comienza apoyando la pieza base sobre una superficie."
  },
  {
    "id": "g1_algoritmos_5",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para comer una banana: ¿cuál es el primer paso de este algoritmo?",
    "options": [
      {
        "text": "Pelar la cáscara de la banana.",
        "isCorrect": true
      },
      {
        "text": "Tirar la banana entera a la basura.",
        "isCorrect": false
      },
      {
        "text": "Morder la cáscara sin abrirla.",
        "isCorrect": false
      }
    ],
    "explanation": "Para comer una banana, primero hay que pelarla."
  },
  {
    "id": "g1_algoritmos_6",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para dibujar una carita feliz en un papel: ¿qué paso va primero?",
    "options": [
      {
        "text": "Dibujar el círculo de la cara.",
        "isCorrect": true
      },
      {
        "text": "Pintar los ojos en el aire.",
        "isCorrect": false
      },
      {
        "text": "Guardar los lápices en la mochila.",
        "isCorrect": false
      }
    ],
    "explanation": "Primero se traza el contorno de la cara y luego se dibujan los rasgos adentro."
  },
  {
    "id": "g1_algoritmos_7",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Si Bity tiene que avanzar 2 pasos hasta la bandera: ¿cómo es el algoritmo?",
    "options": [
      {
        "text": "Paso 1: Avanzar 1 paso. Paso 2: Avanzar 1 paso.",
        "isCorrect": true
      },
      {
        "text": "Paso 1: Retroceder. Paso 2: Quedarse quieto.",
        "isCorrect": false
      },
      {
        "text": "Paso 1: Girar sin parar.",
        "isCorrect": false
      }
    ],
    "explanation": "Avanzar dos pasos sucesivos permite alcanzar la bandera al frente."
  },
  {
    "id": "g1_algoritmos_8",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para regar una planta: 1. Poner agua en la regadera, 2. Echar agua a la tierra... ¿cuál es el primer paso?",
    "options": [
      {
        "text": "Poner agua en la regadera.",
        "isCorrect": true
      },
      {
        "text": "Guardar la regadera vacía.",
        "isCorrect": false
      },
      {
        "text": "Cortar las hojas de la planta.",
        "isCorrect": false
      }
    ],
    "explanation": "Para poder regar, el paso inicial indispensable es cargar la regadera con agua."
  },
  {
    "id": "g1_algoritmos_9",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "¿Por qué los pasos de un algoritmo deben estar ordenados?",
    "options": [
      {
        "text": "Para que la tarea salga bien y logremos lo que queremos.",
        "isCorrect": true
      },
      {
        "text": "Para que sea muy difícil de entender.",
        "isCorrect": false
      },
      {
        "text": "Porque el orden no tiene ninguna importancia.",
        "isCorrect": false
      }
    ],
    "explanation": "Seguir los pasos en su orden correcto asegura completar la tarea sin errores."
  },
  {
    "id": "g1_algoritmos_10",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Si en un algoritmo de 3 pasos falta el paso del medio, ¿qué sucede?",
    "options": [
      {
        "text": "La tarea queda incompleta y puede salir mal.",
        "isCorrect": true
      },
      {
        "text": "La tarea se completa mucho más rápido.",
        "isCorrect": false
      },
      {
        "text": "No pasa nada, sale perfecto igual.",
        "isCorrect": false
      }
    ],
    "explanation": "Omitir un paso intermedio interrumpe la secuencia y perjudica el resultado."
  },
  {
    "id": "g1_algoritmos_11",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para cepillarte los dientes, ¿qué hacés primero?",
    "options": [
      {
        "text": "Poner pasta dental en el cepillo.",
        "isCorrect": true
      },
      {
        "text": "Enjuagarte la boca al terminar.",
        "isCorrect": false
      },
      {
        "text": "Guardar el cepillo en el vaso.",
        "isCorrect": false
      }
    ],
    "explanation": "El paso inicial para el cepillado es colocar pasta dental en el cepillo."
  },
  {
    "id": "g1_algoritmos_12",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Si seguimos los pasos de un algoritmo con atención, ¿qué logramos?",
    "options": [
      {
        "text": "Completar la tarea con éxito.",
        "isCorrect": true
      },
      {
        "text": "Equivocarnos siempre en el camino.",
        "isCorrect": false
      },
      {
        "text": "Que el robot no se mueva nunca.",
        "isCorrect": false
      }
    ],
    "explanation": "Seguir los pasos ordenadamente permite alcanzar el resultado esperado."
  },
  {
    "id": "g1_matematica_1",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity necesita energía! ¿Cuánto es 5 + 4?",
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
    "explanation": "5 más 4 es igual a 9."
  },
  {
    "id": "g1_matematica_2",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity calcula su salto! ¿Cuánto es 9 + 3?",
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
    "explanation": "9 más 3 es igual a 12."
  },
  {
    "id": "g1_matematica_3",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity recarga su batería! ¿Cuánto es 6 + 2?",
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
    "explanation": "6 más 2 es igual a 8."
  },
  {
    "id": "g1_matematica_4",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity mide la distancia a la meta! ¿Cuánto es 7 + 5?",
    "options": [
      {
        "text": "12",
        "isCorrect": true
      },
      {
        "text": "10",
        "isCorrect": false
      },
      {
        "text": "13",
        "isCorrect": false
      }
    ],
    "explanation": "7 más 5 es igual a 12."
  },
  {
    "id": "g1_matematica_5",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity esquiva un obstáculo! ¿Cuánto es 4 + 3?",
    "options": [
      {
        "text": "7",
        "isCorrect": true
      },
      {
        "text": "6",
        "isCorrect": false
      },
      {
        "text": "8",
        "isCorrect": false
      }
    ],
    "explanation": "4 más 3 es igual a 7."
  },
  {
    "id": "g1_matematica_6",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity cuenta sus pasos! ¿Cuánto es 8 + 4?",
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
        "text": "14",
        "isCorrect": false
      }
    ],
    "explanation": "8 más 4 es igual a 12."
  },
  {
    "id": "g1_matematica_7",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity analiza el camino! ¿Cuánto es 6 + 5?",
    "options": [
      {
        "text": "11",
        "isCorrect": true
      },
      {
        "text": "10",
        "isCorrect": false
      },
      {
        "text": "12",
        "isCorrect": false
      }
    ],
    "explanation": "6 más 5 es igual a 11."
  },
  {
    "id": "g1_matematica_8",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity repara su motor! ¿Cuánto es 3 + 6?",
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
    "explanation": "3 más 6 es igual a 9."
  },
  {
    "id": "g1_matematica_9",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity conecta un cable! ¿Cuánto es 7 + 4?",
    "options": [
      {
        "text": "11",
        "isCorrect": true
      },
      {
        "text": "12",
        "isCorrect": false
      },
      {
        "text": "9",
        "isCorrect": false
      }
    ],
    "explanation": "7 más 4 es igual a 11."
  },
  {
    "id": "g1_matematica_10",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity enciende sus luces! ¿Cuánto es 5 + 3?",
    "options": [
      {
        "text": "8",
        "isCorrect": true
      },
      {
        "text": "9",
        "isCorrect": false
      },
      {
        "text": "7",
        "isCorrect": false
      }
    ],
    "explanation": "5 más 3 es igual a 8."
  },
  {
    "id": "g1_matematica_11",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity sube a la plataforma! ¿Cuánto es 8 + 2?",
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
    "explanation": "8 más 2 es igual a 10."
  },
  {
    "id": "g1_matematica_12",
    "grade": 1,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity alcanza la batería dorada! ¿Cuánto es 9 + 4?",
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
    "explanation": "9 más 4 es igual a 13."
  },
  {
    "id": "g2_instrucciones_1",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "¿Por qué una instrucción para Bity debe ser muy clara y precisa?",
    "options": [
      {
        "text": "Porque los robots no adivinan; hacen exactamente lo que les ordenamos.",
        "isCorrect": true
      },
      {
        "text": "Porque los robots prefieren órdenes largas y difíciles.",
        "isCorrect": false
      },
      {
        "text": "Porque da igual cómo se escriban las órdenes.",
        "isCorrect": false
      }
    ],
    "explanation": "Los robots no tienen intuición; procesan con precisión únicamente lo indicado."
  },
  {
    "id": "g2_instrucciones_2",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Entre estas opciones, ¿cuál es una instrucción clara de movimiento?",
    "options": [
      {
        "text": "Avanzar 3 casilleros hacia el frente",
        "isCorrect": true
      },
      {
        "text": "Moverse un poco hacia allá",
        "isCorrect": false
      },
      {
        "text": "Pasear un ratito",
        "isCorrect": false
      }
    ],
    "explanation": "«Avanzar 3 casilleros hacia el frente» especifica la acción, la cantidad y la dirección."
  },
  {
    "id": "g2_instrucciones_3",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si le pedimos a Bity que gire a la derecha y gira a la izquierda, ¿siguió la orden?",
    "options": [
      {
        "text": "No, porque giró hacia el lado opuesto al que se le indicó.",
        "isCorrect": true
      },
      {
        "text": "Sí, porque girar hacia cualquier lado es lo mismo.",
        "isCorrect": false
      },
      {
        "text": "Sí, porque los robots eligen hacia dónde girar.",
        "isCorrect": false
      }
    ],
    "explanation": "Seguir una orden implica cumplir exactamente la dirección indicada."
  },
  {
    "id": "g2_instrucciones_4",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si Bity mira hacia adelante y le ordenamos «Girar a la derecha», ¿hacia dónde queda mirando?",
    "options": [
      {
        "text": "Hacia su lado derecho.",
        "isCorrect": true
      },
      {
        "text": "Hacia atrás directamente.",
        "isCorrect": false
      },
      {
        "text": "Hacia su lado izquierdo.",
        "isCorrect": false
      }
    ],
    "explanation": "Un giro a la derecha orienta el frente de Bity 90 grados hacia su derecha."
  },
  {
    "id": "g2_instrucciones_5",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si le decimos a Bity «Dar 2 pasos adelante y luego 1 paso atrás», ¿dónde queda ubicado?",
    "options": [
      {
        "text": "A 1 paso hacia adelante de donde empezó.",
        "isCorrect": true
      },
      {
        "text": "A 3 pasos hacia adelante.",
        "isCorrect": false
      },
      {
        "text": "En el mismo lugar donde empezó.",
        "isCorrect": false
      }
    ],
    "explanation": "Avanzar 2 y retroceder 1 resulta en un avance neto de 1 paso (2 − 1 = 1)."
  },
  {
    "id": "g2_instrucciones_6",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "¿Cuál es la diferencia entre un deseo y una instrucción en programación?",
    "options": [
      {
        "text": "El deseo expresa lo que esperamos; la instrucción ordena una acción concreta («Avanzar 2 pasos»).",
        "isCorrect": true
      },
      {
        "text": "Son exactamente lo mismo.",
        "isCorrect": false
      },
      {
        "text": "El deseo solo se usa en computadoras.",
        "isCorrect": false
      }
    ],
    "explanation": "Una instrucción es un mandato ejecutable, no una simple expresión de deseo."
  },
  {
    "id": "g2_instrucciones_7",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Para que Bity recoja un bloque del suelo, ¿cuál es la secuencia correcta de instrucciones?",
    "options": [
      {
        "text": "1. Caminar hasta el bloque. 2. Agacharse. 3. Agarrar el bloque.",
        "isCorrect": true
      },
      {
        "text": "1. Agarrar el bloque antes de llegar. 2. Caminar.",
        "isCorrect": false
      },
      {
        "text": "1. Caminar. 2. Irse sin levantar el bloque.",
        "isCorrect": false
      }
    ],
    "explanation": "Primero hay que desplazarse hasta el objeto, descender y finalmente tomarlo."
  },
  {
    "id": "g2_instrucciones_8",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si una instrucción dice «Detenerse frente a la línea roja», ¿cuándo debe parar Bity?",
    "options": [
      {
        "text": "En el momento exacto en que llega a la línea roja.",
        "isCorrect": true
      },
      {
        "text": "Antes de empezar a caminar.",
        "isCorrect": false
      },
      {
        "text": "Mucho después de haber cruzado la línea.",
        "isCorrect": false
      }
    ],
    "explanation": "La orden establece una condición de parada precisa al alcanzar la línea."
  },
  {
    "id": "g2_instrucciones_9",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "¿Qué sucede si le damos a Bity dos instrucciones contrarias al mismo tiempo, como «Avanzar y Retroceder»?",
    "options": [
      {
        "text": "Se genera una confusión porque no puede ir hacia adelante y hacia atrás a la vez.",
        "isCorrect": true
      },
      {
        "text": "El robot se divide en dos robots iguales.",
        "isCorrect": false
      },
      {
        "text": "El robot vuela por el aire.",
        "isCorrect": false
      }
    ],
    "explanation": "Órdenes opuestas simultáneas son incompatibles físicamente."
  },
  {
    "id": "g2_instrucciones_10",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "¿Por qué es importante comprobar que Bity cumplió una instrucción antes de darle la siguiente?",
    "options": [
      {
        "text": "Para asegurarnos de que está en la posición correcta para continuar la misión.",
        "isCorrect": true
      },
      {
        "text": "Para que Bity descanse mucho tiempo.",
        "isCorrect": false
      },
      {
        "text": "Porque las órdenes se borran solas si no esperamos.",
        "isCorrect": false
      }
    ],
    "explanation": "Verificar la posición intermedia garantiza que la siguiente acción se ejecute desde el punto correcto."
  },
  {
    "id": "g2_instrucciones_11",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si Bity necesita recorrer una distancia de 4 casilleros, ¿cuál instrucción cumple esa meta?",
    "options": [
      {
        "text": "Avanzar 4 casilleros",
        "isCorrect": true
      },
      {
        "text": "Retroceder 4 casilleros",
        "isCorrect": false
      },
      {
        "text": "Girar 4 veces en el mismo lugar",
        "isCorrect": false
      }
    ],
    "explanation": "«Avanzar 4 casilleros» cubre exactamente la distancia requerida hacia adelante."
  },
  {
    "id": "g2_instrucciones_12",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "En un semáforo peatonal, la luz roja es una instrucción que significa:",
    "options": [
      {
        "text": "Detenerse y esperar en la vereda sin cruzar.",
        "isCorrect": true
      },
      {
        "text": "Cruzar corriendo rápidamente.",
        "isCorrect": false
      },
      {
        "text": "Cerrar los ojos y caminar.",
        "isCorrect": false
      }
    ],
    "explanation": "La luz roja peatonal ordena esperar de forma segura hasta que el paso esté habilitado."
  },
  {
    "id": "g2_programacion_1",
    "grade": 2,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Qué es un programa de computadora?",
    "options": [
      {
        "text": "Una lista ordenada de instrucciones que una máquina sigue para cumplir una tarea.",
        "isCorrect": true
      },
      {
        "text": "Una película animada que miramos en televisión.",
        "isCorrect": false
      },
      {
        "text": "Una caja vacía sin nada adentro.",
        "isCorrect": false
      }
    ],
    "explanation": "Un programa es una secuencia estructurada de órdenes para resolver una tarea."
  },
  {
    "id": "g2_programacion_2",
    "grade": 2,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Por qué los programadores escriben las instrucciones en una lista ordenada?",
    "options": [
      {
        "text": "Porque la computadora las lee y ejecuta una tras otra en ese orden.",
        "isCorrect": true
      },
      {
        "text": "Porque a la computadora le gusta mezclar las órdenes.",
        "isCorrect": false
      },
      {
        "text": "Para que nadie las pueda entender.",
        "isCorrect": false
      }
    ],
    "explanation": "El orden de la lista determina la secuencia temporal en que se realizan las acciones."
  },
  {
    "id": "g2_programacion_3",
    "grade": 2,
    "category": "programacion",
    "difficulty": "facil",
    "question": "Si Bity no llega a la meta que programamos, ¿dónde está el problema?",
    "options": [
      {
        "text": "En las instrucciones que escribimos; debemos revisarlas y corregirlas.",
        "isCorrect": true
      },
      {
        "text": "En que la computadora cambió las órdenes por su cuenta.",
        "isCorrect": false
      },
      {
        "text": "En que la meta se movió de planeta sola.",
        "isCorrect": false
      }
    ],
    "explanation": "Los errores en el resultado se originan en las instrucciones dadas por el programador."
  },
  {
    "id": "g2_programacion_4",
    "grade": 2,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Qué hace una persona cuando programa a un robot?",
    "options": [
      {
        "text": "Diseña y escribe las instrucciones que guían los movimientos del robot.",
        "isCorrect": true
      },
      {
        "text": "Espera a que el robot aprenda solo sin darle órdenes.",
        "isCorrect": false
      },
      {
        "text": "Le pide al robot que adivine el juego.",
        "isCorrect": false
      }
    ],
    "explanation": "Programar es la acción humana de diseñar las órdenes que la máquina ejecutará."
  },
  {
    "id": "g2_programacion_5",
    "grade": 2,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Por qué es una buena idea planificar el camino de Bity en un papel antes de programarlo?",
    "options": [
      {
        "text": "Porque nos ayuda a pensar los pasos correctos antes de poner las instrucciones.",
        "isCorrect": true
      },
      {
        "text": "Porque la computadora no enciende si no usamos papel.",
        "isCorrect": false
      },
      {
        "text": "Para gastar lápices de colores.",
        "isCorrect": false
      }
    ],
    "explanation": "Planificar previamente organiza las ideas y previene equivocaciones."
  },
  {
    "id": "g2_programacion_6",
    "grade": 2,
    "category": "programacion",
    "difficulty": "facil",
    "question": "Si programamos un juego donde Bity salta al presionar la tecla espacio, ¿qué le enseñamos a la máquina?",
    "options": [
      {
        "text": "Que cuando alguien toque esa tecla, debe ejecutar la instrucción de saltar.",
        "isCorrect": true
      },
      {
        "text": "Que apague la pantalla cuando toquen la tecla.",
        "isCorrect": false
      },
      {
        "text": "Que el juego termine de inmediato.",
        "isCorrect": false
      }
    ],
    "explanation": "Se vincula una entrada del usuario con una instrucción programada de salto."
  },
  {
    "id": "g2_programacion_7",
    "grade": 2,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Qué significa que un programa se ejecute paso a paso?",
    "options": [
      {
        "text": "Que realiza la primera instrucción, luego la segunda y luego la tercera, en orden.",
        "isCorrect": true
      },
      {
        "text": "Que hace todas las instrucciones al mismo instante.",
        "isCorrect": false
      },
      {
        "text": "Que ejecuta solo la última instrucción de la lista.",
        "isCorrect": false
      }
    ],
    "explanation": "La ejecución secuencial avanza ordenadamente instrucción por instrucción."
  },
  {
    "id": "g2_programacion_8",
    "grade": 2,
    "category": "programacion",
    "difficulty": "facil",
    "question": "Para que Bity recolecte 2 monedas seguidas en una línea recta, ¿qué instrucciones programamos?",
    "options": [
      {
        "text": "Avanzar, tomar moneda, avanzar, tomar moneda.",
        "isCorrect": true
      },
      {
        "text": "Saltar, girar, retroceder, detenerse.",
        "isCorrect": false
      },
      {
        "text": "Tomar moneda sin haberse movido hasta ella.",
        "isCorrect": false
      }
    ],
    "explanation": "La secuencia debe combinar desplazamientos con acciones de recolección en cada posición."
  },
  {
    "id": "g2_programacion_9",
    "grade": 2,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Una computadora puede cambiar por su cuenta las instrucciones que le diste?",
    "options": [
      {
        "text": "No, las computadoras ejecutan exactamente lo que el programador les indicó.",
        "isCorrect": true
      },
      {
        "text": "Sí, cambian de idea cuando están encendidas mucho tiempo.",
        "isCorrect": false
      },
      {
        "text": "Sí, inventan órdenes nuevas según el clima.",
        "isCorrect": false
      }
    ],
    "explanation": "Las máquinas son estrictamente deterministas: siguen el programa sin alteraciones."
  },
  {
    "id": "g2_programacion_10",
    "grade": 2,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Cómo sabemos si nuestro programa está bien hecho?",
    "options": [
      {
        "text": "Al ejecutarlo, Bity realiza la tarea que nos propusimos sin equivocarse.",
        "isCorrect": true
      },
      {
        "text": "Porque tiene muchos botones brillantes aunque no funcione.",
        "isCorrect": false
      },
      {
        "text": "Porque es muy largo y nadie lo entiende.",
        "isCorrect": false
      }
    ],
    "explanation": "El éxito de un programa se comprueba cuando cumple la meta esperada de forma correcta."
  },
  {
    "id": "g2_programacion_11",
    "grade": 2,
    "category": "programacion",
    "difficulty": "facil",
    "question": "Si queremos que Bity encienda una luz azul al llegar a la meta, ¿dónde ponemos esa orden?",
    "options": [
      {
        "text": "Al final de las instrucciones, justo después de llegar a la meta.",
        "isCorrect": true
      },
      {
        "text": "Al principio de todo, antes de empezar a caminar.",
        "isCorrect": false
      },
      {
        "text": "En ningún lado, la luz prende sola.",
        "isCorrect": false
      }
    ],
    "explanation": "La instrucción de celebración debe ubicarse al concluir el recorrido hacia la meta."
  },
  {
    "id": "g2_programacion_12",
    "grade": 2,
    "category": "programacion",
    "difficulty": "facil",
    "question": "Aprender a programar nos ayuda principalmente a:",
    "options": [
      {
        "text": "Pensar de forma ordenada para resolver problemas paso a paso.",
        "isCorrect": true
      },
      {
        "text": "Adivinar respuestas sin pensar.",
        "isCorrect": false
      },
      {
        "text": "Memorizar listas sin entender qué significan.",
        "isCorrect": false
      }
    ],
    "explanation": "La programación fomenta el razonamiento lógico, el orden y la resolución metódica de problemas."
  },
  {
    "id": "g2_algoritmos_1",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "¿Cuáles son los momentos principales de un algoritmo?",
    "options": [
      {
        "text": "Un punto de inicio, una serie de pasos ordenados y un resultado final.",
        "isCorrect": true
      },
      {
        "text": "Un dibujo, una pausa y nada más.",
        "isCorrect": false
      },
      {
        "text": "Empezar por el final y terminar en el inicio.",
        "isCorrect": false
      }
    ],
    "explanation": "Todo algoritmo parte de un estado inicial, ejecuta pasos secuenciales y arriba a una meta."
  },
  {
    "id": "g2_algoritmos_2",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "¿Por qué tenemos que ordenar los pasos de un algoritmo?",
    "options": [
      {
        "text": "Porque si los pasos están desordenados, la tarea no se puede completar correctamente.",
        "isCorrect": true
      },
      {
        "text": "Porque a las computadoras no les gusta que las tareas salgan rápido.",
        "isCorrect": false
      },
      {
        "text": "Porque el orden no cambia el resultado final.",
        "isCorrect": false
      }
    ],
    "explanation": "El orden asegura que cada acción se realice cuando las condiciones previas están listas."
  },
  {
    "id": "g2_algoritmos_3",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "En la secuencia para abrir una puerta: 1. Acercarse a la puerta, 2. Girar el picaporte, 3. Empujar la puerta. ¿Qué paso falta si solo decimos «Acercarse y empujar»?",
    "options": [
      {
        "text": "Girar el picaporte para destrabar la puerta.",
        "isCorrect": true
      },
      {
        "text": "Pintar la puerta de verde.",
        "isCorrect": false
      },
      {
        "text": "Cerrar la puerta con llave.",
        "isCorrect": false
      }
    ],
    "explanation": "Sin accionar el picaporte, la puerta permanece trabada y no se abre."
  },
  {
    "id": "g2_algoritmos_4",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Bity sigue este algoritmo: «Avanzar 2 pasos, Girar a la derecha, Avanzar 1 paso». ¿Cuántos pasos caminó en total?",
    "options": [
      {
        "text": "Caminó 3 pasos en total.",
        "isCorrect": true
      },
      {
        "text": "Caminó 2 pasos en total.",
        "isCorrect": false
      },
      {
        "text": "Caminó 5 pasos en total.",
        "isCorrect": false
      }
    ],
    "explanation": "Dio 2 pasos al inicio y 1 paso tras el giro: 2 + 1 = 3 pasos caminados."
  },
  {
    "id": "g2_algoritmos_5",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para guardar los útiles en la cartuchera: ¿cuál de estas acciones NO pertenece a ese algoritmo?",
    "options": [
      {
        "text": "Regar una planta del jardín.",
        "isCorrect": true
      },
      {
        "text": "Guardar el lápiz.",
        "isCorrect": false
      },
      {
        "text": "Cerrar el cierre de la cartuchera.",
        "isCorrect": false
      }
    ],
    "explanation": "Regar una planta es una acción ajena a la tarea de guardar útiles en la cartuchera."
  },
  {
    "id": "g2_algoritmos_6",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "¿Por qué una receta sencilla para hacer una ensalada de frutas es un algoritmo?",
    "options": [
      {
        "text": "Porque indica los pasos ordenados que debemos seguir para prepararla.",
        "isCorrect": true
      },
      {
        "text": "Porque las frutas se pelan y cortan solas sin pasos.",
        "isCorrect": false
      },
      {
        "text": "Porque solo se puede hacer con una computadora.",
        "isCorrect": false
      }
    ],
    "explanation": "Una receta es un conjunto estructurado de pasos orientados a preparar un plato."
  },
  {
    "id": "g2_algoritmos_7",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para enviar un dibujo por sobre: 1. Poner el dibujo en el sobre, 2. Cerrar el sobre, 3. Escribir el destinatario. ¿Cuál es el paso 1?",
    "options": [
      {
        "text": "Poner el dibujo adentro del sobre.",
        "isCorrect": true
      },
      {
        "text": "Cerrar el sobre vacío.",
        "isCorrect": false
      },
      {
        "text": "Romper el sobre en pedacitos.",
        "isCorrect": false
      }
    ],
    "explanation": "El paso inicial es colocar el contenido adentro del sobre."
  },
  {
    "id": "g2_algoritmos_8",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Si un robot encuentra un charco y su algoritmo dice «Saltar sobre el charco», ¿qué acción realiza?",
    "options": [
      {
        "text": "Realiza un salto para superar el charco sin tocar el agua.",
        "isCorrect": true
      },
      {
        "text": "Se queda parado dentro del agua.",
        "isCorrect": false
      },
      {
        "text": "Vuelve al punto de partida.",
        "isCorrect": false
      }
    ],
    "explanation": "La acción de salto permite sobrepasar el obstáculo limpiamente."
  },
  {
    "id": "g2_algoritmos_9",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Algoritmo para cruzar la calle: 1. Llegar a la esquina, 2. Mirar el semáforo peatonal... ¿cuál es el paso 3?",
    "options": [
      {
        "text": "Cruzar cuando la luz peatonal esté en verde.",
        "isCorrect": true
      },
      {
        "text": "Cruzar corriendo con luz roja.",
        "isCorrect": false
      },
      {
        "text": "Regresar a casa sin cruzar.",
        "isCorrect": false
      }
    ],
    "explanation": "El cruce seguro se realiza cuando la señal peatonal autoriza el paso en verde."
  },
  {
    "id": "g2_algoritmos_10",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para apagar una lámpara: 1. Acercarse a la perilla, 2. Presionar el interruptor... ¿cuál es el resultado?",
    "options": [
      {
        "text": "La lámpara se apaga.",
        "isCorrect": true
      },
      {
        "text": "La lámpara cambia de lugar sola.",
        "isCorrect": false
      },
      {
        "text": "La lámpara se enciende más fuerte.",
        "isCorrect": false
      }
    ],
    "explanation": "Accionar el interruptor de una lámpara encendida interrumpe la corriente y la apaga."
  },
  {
    "id": "g2_algoritmos_11",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Si cambiamos el orden de los pasos al vestirnos e intentamos poner los zapatos antes que las medias, ¿qué sucede?",
    "options": [
      {
        "text": "No podemos ponernos las medias porque los zapatos cubren los pies.",
        "isCorrect": true
      },
      {
        "text": "Las medias se ponen solas por encima.",
        "isCorrect": false
      },
      {
        "text": "No cambia nada, es exactamente igual.",
        "isCorrect": false
      }
    ],
    "explanation": "Invertir el orden lógico hace imposible completar la tarea."
  },
  {
    "id": "g2_algoritmos_12",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Cuando un algoritmo de tres pasos se completa con éxito, ¿qué conseguimos?",
    "options": [
      {
        "text": "Resolver la tarea de forma correcta siguiendo cada paso en su momento.",
        "isCorrect": true
      },
      {
        "text": "Que el problema siga sin resolverse.",
        "isCorrect": false
      },
      {
        "text": "Tener que empezar de nuevo obligatoriamente.",
        "isCorrect": false
      }
    ],
    "explanation": "Completar la secuencia en el orden debido permite alcanzar la solución buscada."
  },
  {
    "id": "g2_matematica_1",
    "grade": 2,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity calcula su batería! ¿Cuánto es 15 − 2?",
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
    "explanation": "15 menos 2 es igual a 13."
  },
  {
    "id": "g2_matematica_2",
    "grade": 2,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity gasta energía en una carrera! ¿Cuánto es 12 − 4?",
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
    "explanation": "12 menos 4 es igual a 8."
  },
  {
    "id": "g2_matematica_3",
    "grade": 2,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity recarga sus celdas! ¿Cuánto es 18 − 5?",
    "options": [
      {
        "text": "13",
        "isCorrect": true
      },
      {
        "text": "14",
        "isCorrect": false
      },
      {
        "text": "12",
        "isCorrect": false
      }
    ],
    "explanation": "18 menos 5 es igual a 13."
  },
  {
    "id": "g2_matematica_4",
    "grade": 2,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity suma dos baterías medianas! ¿Cuánto es 7 + 6?",
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
    "explanation": "7 más 6 es igual a 13."
  },
  {
    "id": "g2_matematica_5",
    "grade": 2,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity ajusta su sensor de distancia! ¿Cuánto es 16 − 3?",
    "options": [
      {
        "text": "13",
        "isCorrect": true
      },
      {
        "text": "11",
        "isCorrect": false
      },
      {
        "text": "14",
        "isCorrect": false
      }
    ],
    "explanation": "16 menos 3 es igual a 13."
  },
  {
    "id": "g2_matematica_6",
    "grade": 2,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity desciende una plataforma! ¿Cuánto es 14 − 5?",
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
    "explanation": "14 menos 5 es igual a 9."
  },
  {
    "id": "g2_matematica_7",
    "grade": 2,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity comparte energía con un amigo! ¿Cuánto es 19 − 7?",
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
    "explanation": "19 menos 7 es igual a 12."
  },
  {
    "id": "g2_matematica_8",
    "grade": 2,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity recolecta chips de energía! ¿Cuánto es 8 + 7?",
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
    "explanation": "8 más 7 es igual a 15."
  },
  {
    "id": "g2_matematica_9",
    "grade": 2,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity calibra su escudo! ¿Cuánto es 20 − 6?",
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
    "explanation": "20 menos 6 es igual a 14."
  },
  {
    "id": "g2_matematica_10",
    "grade": 2,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity mide la altura del salto! ¿Cuánto es 17 − 4?",
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
        "text": "15",
        "isCorrect": false
      }
    ],
    "explanation": "17 menos 4 es igual a 13."
  },
  {
    "id": "g2_matematica_11",
    "grade": 2,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity reduce la velocidad de frenado! ¿Cuánto es 13 − 5?",
    "options": [
      {
        "text": "8",
        "isCorrect": true
      },
      {
        "text": "9",
        "isCorrect": false
      },
      {
        "text": "7",
        "isCorrect": false
      }
    ],
    "explanation": "13 menos 5 es igual a 8."
  },
  {
    "id": "g2_matematica_12",
    "grade": 2,
    "category": "matematica",
    "difficulty": "facil",
    "question": "¡Bity conecta dos baterías auxiliares! ¿Cuánto es 9 + 6?",
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
    "explanation": "9 más 6 es igual a 15."
  },
  {
    "id": "g3_instrucciones_1",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Bity tiene la secuencia: 1. Caminar a la puerta, 2. Entrar a la nave. ¿Qué instrucción falta en el medio para poder ingresar?",
    "options": [
      {
        "text": "Abrir la puerta",
        "isCorrect": true
      },
      {
        "text": "Pintar la puerta",
        "isCorrect": false
      },
      {
        "text": "Apagar las luces de la sala",
        "isCorrect": false
      }
    ],
    "explanation": "Para entrar a la nave, antes de cruzar la abertura es indispensable abrir la puerta."
  },
  {
    "id": "g3_instrucciones_2",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Para guardar un juguete en una caja con tapa: ¿cuál instrucción está fuera de lugar si la ponemos al inicio de todo?",
    "options": [
      {
        "text": "Cerrar la tapa de la caja",
        "isCorrect": true
      },
      {
        "text": "Caminar hacia la caja",
        "isCorrect": false
      },
      {
        "text": "Levantar el juguete del suelo",
        "isCorrect": false
      }
    ],
    "explanation": "No se puede cerrar la tapa antes de haber colocado el juguete adentro de la caja."
  },
  {
    "id": "g3_instrucciones_3",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Bity recibe estas instrucciones: 1. Avanzar 2 pasos, 2. Tomar la llave, 3. Abrir el cofre. Si falta el paso 2, ¿qué problema ocurre?",
    "options": [
      {
        "text": "Bity no puede abrir el cofre porque no tiene la llave en sus manos.",
        "isCorrect": true
      },
      {
        "text": "El cofre se abre solo sin necesidad de llave.",
        "isCorrect": false
      },
      {
        "text": "Bity atraviesa el cofre cerrado.",
        "isCorrect": false
      }
    ],
    "explanation": "Sin la llave recogida en el paso 2, la cerradura del cofre permanece cerrada."
  },
  {
    "id": "g3_instrucciones_4",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "¿Qué problema tiene una orden que no explica bien qué hacer, como por ejemplo «Moverse un poco»?",
    "options": [
      {
        "text": "Es una orden imprecisa y el robot no sabe hacia dónde ni cuántos pasos dar.",
        "isCorrect": true
      },
      {
        "text": "Es una orden perfecta que cualquier computadora entiende.",
        "isCorrect": false
      },
      {
        "text": "Hace que el robot avance el doble de rápido.",
        "isCorrect": false
      }
    ],
    "explanation": "Una orden ambigua carece de parámetros y la máquina no sabe cómo interpretarla."
  },
  {
    "id": "g3_instrucciones_5",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si la meta de Bity está a 3 pasos de distancia y la orden dice «Avanzar 1 paso», ¿qué instrucción falta para llegar?",
    "options": [
      {
        "text": "Avanzar 2 pasos más.",
        "isCorrect": true
      },
      {
        "text": "Retroceder 3 pasos.",
        "isCorrect": false
      },
      {
        "text": "Girar en el mismo lugar.",
        "isCorrect": false
      }
    ],
    "explanation": "Para cubrir los 3 pasos totales se deben sumar 2 pasos adicionales al paso inicial."
  },
  {
    "id": "g3_instrucciones_6",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Bity debe cruzar un pozo: 1. Correr hacia el pozo, 2. Aterrizar del otro lado. ¿Qué instrucción fundamental falta entre ambos pasos?",
    "options": [
      {
        "text": "Saltar con fuerza sobre el pozo.",
        "isCorrect": true
      },
      {
        "text": "Caminar hacia el fondo del pozo.",
        "isCorrect": false
      },
      {
        "text": "Detenerse para siempre.",
        "isCorrect": false
      }
    ],
    "explanation": "El impulso del salto es la orden necesaria para sobrevolar el espacio del pozo."
  },
  {
    "id": "g3_instrucciones_7",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "En una lista de instrucciones, ¿por qué cada orden debe estar en su posición exacta?",
    "options": [
      {
        "text": "Porque si una orden se ejecuta antes de tiempo, la acción falla.",
        "isCorrect": true
      },
      {
        "text": "Porque el orden de las instrucciones nunca influye.",
        "isCorrect": false
      },
      {
        "text": "Porque a los robots les da igual qué hacer primero.",
        "isCorrect": false
      }
    ],
    "explanation": "El momento de ejecución de cada orden condiciona el resultado de toda la secuencia."
  },
  {
    "id": "g3_instrucciones_8",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Bity quiere pintar una pared: 1. Mojar el pincel en la pintura, 2. Pasar el pincel por la pared. ¿Qué orden corresponde colocar al terminar?",
    "options": [
      {
        "text": "Limpiar y guardar el pincel en su lugar.",
        "isCorrect": true
      },
      {
        "text": "Tirar la pintura al suelo.",
        "isCorrect": false
      },
      {
        "text": "Desarmar la pared.",
        "isCorrect": false
      }
    ],
    "explanation": "Al concluir la tarea, la instrucción final correcta es limpiar y guardar los útiles."
  },
  {
    "id": "g3_instrucciones_9",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si un robot debe cruzar un puente levadizo: ¿qué instrucción debe verificar antes de cruzar?",
    "options": [
      {
        "text": "Comprobar que el puente esté bajo y seguro para pisar.",
        "isCorrect": true
      },
      {
        "text": "Comprobar que sea de noche.",
        "isCorrect": false
      },
      {
        "text": "Girar cinco veces sobre sí mismo.",
        "isCorrect": false
      }
    ],
    "explanation": "Verificar que el puente esté abajo previene que el robot caiga al agua."
  },
  {
    "id": "g3_instrucciones_10",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Tenemos la secuencia: 1. Abrir la heladera, 2. Sacar la manzana, 3. ¿...?, 4. Comer la manzana. ¿Cuál es el paso 3 más adecuado?",
    "options": [
      {
        "text": "Lavar la manzana con agua limpia.",
        "isCorrect": true
      },
      {
        "text": "Guardar la manzana en el horno caliente.",
        "isCorrect": false
      },
      {
        "text": "Pintar la manzana con témpera.",
        "isCorrect": false
      }
    ],
    "explanation": "Por higiene, antes de ingerir la fruta fresca se debe lavar adecuadamente."
  },
  {
    "id": "g3_instrucciones_11",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si Bity debe girar hacia el cohete que está a su izquierda, pero la orden dice «Girar a la derecha», ¿cuál es el error?",
    "options": [
      {
        "text": "La instrucción tiene la dirección equivocada; debe girar a la izquierda.",
        "isCorrect": true
      },
      {
        "text": "La orden está perfecta, Bity llegará igual.",
        "isCorrect": false
      },
      {
        "text": "El cohete debe moverse solo hacia Bity.",
        "isCorrect": false
      }
    ],
    "explanation": "El sentido de giro indicado es opuesto al que conduce hacia la meta."
  },
  {
    "id": "g3_instrucciones_12",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Para encender la linterna de Bity: ¿cuál es la instrucción correcta?",
    "options": [
      {
        "text": "Presionar el botón de encendido de la linterna.",
        "isCorrect": true
      },
      {
        "text": "Sacar las pilas de la linterna.",
        "isCorrect": false
      },
      {
        "text": "Tapar la linterna con cinta oscura.",
        "isCorrect": false
      }
    ],
    "explanation": "Presionar el interruptor activa el circuito de luz de la linterna."
  },
  {
    "id": "g3_programacion_1",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "En un programa para Bity, ¿qué significa que las instrucciones se lean en secuencia?",
    "options": [
      {
        "text": "Que la computadora ejecuta una instrucción después de otra, en el orden establecido.",
        "isCorrect": true
      },
      {
        "text": "Que elige instrucciones al azar sin ningún orden.",
        "isCorrect": false
      },
      {
        "text": "Que solo ejecuta la última instrucción y nada más.",
        "isCorrect": false
      }
    ],
    "explanation": "La secuencia garantiza que cada orden ocurra en su turno sin saltos arbitrarios."
  },
  {
    "id": "g3_programacion_2",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si queremos que Bity avance 3 pasos y luego salude, ¿cómo organizamos el programa?",
    "options": [
      {
        "text": "Primero colocamos las órdenes de avanzar y después la de saludar.",
        "isCorrect": true
      },
      {
        "text": "Primero saludar y nunca avanzar.",
        "isCorrect": false
      },
      {
        "text": "Poner todas las órdenes mezcladas sin importar el orden.",
        "isCorrect": false
      }
    ],
    "explanation": "La estructura secuencial refleja el orden temporal exacto de las acciones deseadas."
  },
  {
    "id": "g3_programacion_3",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué hace el programador cuando encuentra un error en el recorrido de Bity?",
    "options": [
      {
        "text": "Revisa la lista de instrucciones para encontrar cuál está equivocada o desordenada y la corrige.",
        "isCorrect": true
      },
      {
        "text": "Apaga la computadora y no juega nunca más.",
        "isCorrect": false
      },
      {
        "text": "Espera que el robot aprenda solo sin cambiar nada.",
        "isCorrect": false
      }
    ],
    "explanation": "La revisión sistemática de las órdenes permite localizar y corregir el error."
  },
  {
    "id": "g3_programacion_4",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Por qué una computadora no puede corregir sola una orden equivocada que escribió el usuario?",
    "options": [
      {
        "text": "Porque las computadoras no piensan por sí mismas; cumplen fielmente lo programado.",
        "isCorrect": true
      },
      {
        "text": "Porque prefieren que el juego termine rápido.",
        "isCorrect": false
      },
      {
        "text": "Porque las computadoras no saben leer números.",
        "isCorrect": false
      }
    ],
    "explanation": "Las computadoras carecen de juicio propio y ejecutan exactamente el código recibido."
  },
  {
    "id": "g3_programacion_5",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si en un programa colocamos la orden «Girar a la derecha» dos veces seguidas, ¿qué giro realiza Bity?",
    "options": [
      {
        "text": "Gira dos veces seguidas hacia su derecha.",
        "isCorrect": true
      },
      {
        "text": "Gira una vez a la derecha y otra a la izquierda.",
        "isCorrect": false
      },
      {
        "text": "No gira nada y camina hacia atrás.",
        "isCorrect": false
      }
    ],
    "explanation": "Cada instrucción de giro produce un cambio de dirección en el sentido indicado."
  },
  {
    "id": "g3_programacion_6",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Para que Bity dibuje un triángulo en el suelo, ¿qué necesita su programa?",
    "options": [
      {
        "text": "Instrucciones que combinen avanzar en línea recta y girar en cada esquina.",
        "isCorrect": true
      },
      {
        "text": "Solo una instrucción de avanzar 100 pasos.",
        "isCorrect": false
      },
      {
        "text": "Ninguna instrucción de giro.",
        "isCorrect": false
      }
    ],
    "explanation": "Trazar una figura poligonal requiere alternar avances lineales con giros en los vértices."
  },
  {
    "id": "g3_programacion_7",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si un programa tiene 5 instrucciones y la número 3 tiene un error, ¿qué sucede con las instrucciones 1 y 2?",
    "options": [
      {
        "text": "Las instrucciones 1 y 2 se ejecutan normalmente antes de llegar al error.",
        "isCorrect": true
      },
      {
        "text": "No se ejecuta ninguna instrucción desde el principio.",
        "isCorrect": false
      },
      {
        "text": "Se ejecutan al revés.",
        "isCorrect": false
      }
    ],
    "explanation": "La ejecución secuencial cumple las primeras órdenes válidas hasta alcanzar el fallo."
  },
  {
    "id": "g3_programacion_8",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué ventaja tiene guardar nuestro programa de instrucciones en la computadora?",
    "options": [
      {
        "text": "Que podemos volver a probarlo, mejorarlo o reutilizarlo cuando queramos.",
        "isCorrect": true
      },
      {
        "text": "Que la computadora se bloquea para siempre.",
        "isCorrect": false
      },
      {
        "text": "Ninguna, los programas se usan una sola vez.",
        "isCorrect": false
      }
    ],
    "explanation": "Almacenar el programa permite la reutilización, la prueba continua y el perfeccionamiento."
  },
  {
    "id": "g3_programacion_9",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si queremos que un personaje salte cuando el jugador presiona un botón, ¿qué vinculamos al programar?",
    "options": [
      {
        "text": "La acción de presionar el botón con la instrucción de salto del personaje.",
        "isCorrect": true
      },
      {
        "text": "El botón con apagar la pantalla.",
        "isCorrect": false
      },
      {
        "text": "El botón con retroceder 10 casilleros.",
        "isCorrect": false
      }
    ],
    "explanation": "Se asocia el evento del control con la rutina de movimiento de salto."
  },
  {
    "id": "g3_programacion_10",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Por qué es importante que las instrucciones tengan nombres claros y comprensibles?",
    "options": [
      {
        "text": "Para que cualquier persona pueda leer el programa y entender qué hace.",
        "isCorrect": true
      },
      {
        "text": "Para que sea imposible de descifrar.",
        "isCorrect": false
      },
      {
        "text": "Porque las computadoras solo leen palabras secretas.",
        "isCorrect": false
      }
    ],
    "explanation": "La legibilidad del código facilita el trabajo en equipo y la detección de fallas."
  },
  {
    "id": "g3_programacion_11",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si un robot llega al final de un camino y queremos que vuelva, ¿qué instrucciones agregamos?",
    "options": [
      {
        "text": "Instrucciones de giro y de avance para recorrer el camino de regreso.",
        "isCorrect": true
      },
      {
        "text": "Una orden para que se apague la pantalla.",
        "isCorrect": false
      },
      {
        "text": "Ninguna orden, los robots vuelven solos volando.",
        "isCorrect": false
      }
    ],
    "explanation": "El retorno requiere instrucciones explícitas de cambio de orientación y avance."
  },
  {
    "id": "g3_programacion_12",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Cuando dos programadores revisan juntos las instrucciones de un programa, ¿qué buscan?",
    "options": [
      {
        "text": "Asegurarse de que el programa sea claro, ordenado y cumpla la tarea sin errores.",
        "isCorrect": true
      },
      {
        "text": "Borrar todo el trabajo para empezar de cero sin motivos.",
        "isCorrect": false
      },
      {
        "text": "Hacer que el programa sea confuso.",
        "isCorrect": false
      }
    ],
    "explanation": "La revisión entre pares ayuda a detectar omisiones y verificar la calidad de la solución."
  },
  {
    "id": "g3_algoritmos_1",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Cómo se llama una lista de pasos ordenados para realizar una tarea o resolver un problema?",
    "options": [
      {
        "text": "Algoritmo",
        "isCorrect": true
      },
      {
        "text": "Adivinanza",
        "isCorrect": false
      },
      {
        "text": "Canción infantil",
        "isCorrect": false
      }
    ],
    "explanation": "Un algoritmo es la definición ordenada de pasos que resuelven un problema determinado."
  },
  {
    "id": "g3_algoritmos_2",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Qué le sucede a un algoritmo si dos pasos importantes se intercambian de lugar?",
    "options": [
      {
        "text": "El resultado final cambia y la tarea puede salir mal o no completarse.",
        "isCorrect": true
      },
      {
        "text": "El algoritmo siempre funciona igual sin importar el orden.",
        "isCorrect": false
      },
      {
        "text": "El algoritmo se arregla solo automáticamente.",
        "isCorrect": false
      }
    ],
    "explanation": "Alterar el orden de los pasos modifica la lógica y puede impedir alcanzar el objetivo."
  },
  {
    "id": "g3_algoritmos_3",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Para preparar una tostada con manteca: 1. Tostar el pan en la tostadora, 2. Untar la manteca sobre el pan caliente. ¿Qué pasaría si invertimos el orden?",
    "options": [
      {
        "text": "Pondríamos manteca en pan frío antes de meterlo a la tostadora, lo cual es incorrecto.",
        "isCorrect": true
      },
      {
        "text": "La tostada se prepara sola más rápido.",
        "isCorrect": false
      },
      {
        "text": "No cambia nada, es exactamente igual.",
        "isCorrect": false
      }
    ],
    "explanation": "La manteca se derrite sobre el pan caliente; colocarla antes puede quemar la tostadora."
  },
  {
    "id": "g3_algoritmos_4",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Si un algoritmo para que Bity llegue a su cohete olvida el paso de «Abrir la escotilla», ¿qué ocurre?",
    "options": [
      {
        "text": "Bity llega hasta el cohete pero no puede entrar para despegar.",
        "isCorrect": true
      },
      {
        "text": "El cohete despega con Bity afuera sin problemas.",
        "isCorrect": false
      },
      {
        "text": "La escotilla se abre sola aunque no le demos la orden.",
        "isCorrect": false
      }
    ],
    "explanation": "Sin abrir el acceso a la cabina, Bity no puede abordar el cohete."
  },
  {
    "id": "g3_algoritmos_5",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Para ordenar tres números de menor a mayor (2, 8, 5), ¿cuál es el resultado del algoritmo?",
    "options": [
      {
        "text": "2, 5, 8",
        "isCorrect": true
      },
      {
        "text": "8, 5, 2",
        "isCorrect": false
      },
      {
        "text": "5, 8, 2",
        "isCorrect": false
      }
    ],
    "explanation": "Al ordenar de menor a mayor se ubica primero el 2, luego el 5 y finalmente el 8."
  },
  {
    "id": "g3_algoritmos_6",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "En un algoritmo de pasos repetidos: 1. Avanzar, 2. Girar, 3. Avanzar, 4. Girar... ¿cuál es el paso 5?",
    "options": [
      {
        "text": "Avanzar",
        "isCorrect": true
      },
      {
        "text": "Girar",
        "isCorrect": false
      },
      {
        "text": "Detenerse para siempre",
        "isCorrect": false
      }
    ],
    "explanation": "La secuencia sigue un patrón alternado: los pasos impares son «Avanzar» y los pares son «Girar»."
  },
  {
    "id": "g3_algoritmos_7",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "En este algoritmo para regar una planta: 1. Llenar la regadera con agua, 2. Guardar la regadera en el armario, 3. Echar agua a la tierra de la maceta. ¿Cuál es el paso que está fuera de lugar?",
    "options": [
      {
        "text": "El paso 2 (Guardar la regadera), porque primero hay que echar el agua a la maceta y guardar la regadera al final.",
        "isCorrect": true
      },
      {
        "text": "El paso 1 (Llenar la regadera), porque la regadera debe usarse vacía.",
        "isCorrect": false
      },
      {
        "text": "El paso 3 (Echar el agua), porque las plantas no necesitan agua.",
        "isCorrect": false
      }
    ],
    "explanation": "Guardar la regadera debe ser el paso final de la tarea; si la guardamos en el paso 2, no podemos regar la tierra de la planta."
  },
  {
    "id": "g3_algoritmos_8",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Si seguimos un algoritmo para armar un juguete de bloques pero nos saltamos el paso de la base, ¿qué pasa?",
    "options": [
      {
        "text": "El juguete no tendrá apoyo y se caerá al intentar colocar las piezas de arriba.",
        "isCorrect": true
      },
      {
        "text": "El juguete queda más firme y fuerte.",
        "isCorrect": false
      },
      {
        "text": "Las piezas flotan solas en el aire.",
        "isCorrect": false
      }
    ],
    "explanation": "Omitir los cimientos estructurales hace que la construcción colapse."
  },
  {
    "id": "g3_algoritmos_9",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Qué es lo primero que debemos hacer antes de escribir los pasos de un algoritmo?",
    "options": [
      {
        "text": "Entender claramente cuál es el problema o la tarea que queremos resolver.",
        "isCorrect": true
      },
      {
        "text": "Escribir órdenes sin saber qué queremos lograr.",
        "isCorrect": false
      },
      {
        "text": "Apretar botones al azar.",
        "isCorrect": false
      }
    ],
    "explanation": "Comprender la meta es el punto de partida indispensable para definir los pasos correctos."
  },
  {
    "id": "g3_algoritmos_10",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Para cruzar un laberinto sencillo, ¿qué busca un buen algoritmo?",
    "options": [
      {
        "text": "Encontrar un camino continuo desde la entrada hasta la salida evitando los callejones sin salida.",
        "isCorrect": true
      },
      {
        "text": "Chocar contra las paredes.",
        "isCorrect": false
      },
      {
        "text": "Quedarse en la entrada sin caminar.",
        "isCorrect": false
      }
    ],
    "explanation": "La meta algorítmica en un laberinto es conectar inicio y fin esquivando bloqueos."
  },
  {
    "id": "g3_algoritmos_11",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Si un algoritmo tiene un paso repetido innecesariamente, como «Girar a la derecha 4 veces seguidas en el mismo lugar»: ¿hacia dónde queda mirando?",
    "options": [
      {
        "text": "Queda mirando exactamente al mismo lugar donde ya estaba.",
        "isCorrect": true
      },
      {
        "text": "Queda mirando hacia atrás.",
        "isCorrect": false
      },
      {
        "text": "Queda mirando hacia el suelo.",
        "isCorrect": false
      }
    ],
    "explanation": "Cuatro giros de 90° completan 360° y devuelven al robot a su orientación original."
  },
  {
    "id": "g3_algoritmos_12",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Por qué es útil compartir nuestro algoritmo con un compañero para que lo lea?",
    "options": [
      {
        "text": "Para comprobar si los pasos son claros y fáciles de seguir sin confusiones.",
        "isCorrect": true
      },
      {
        "text": "Para que nadie más pueda resolver la tarea.",
        "isCorrect": false
      },
      {
        "text": "Porque los algoritmos no deben leerse nunca.",
        "isCorrect": false
      }
    ],
    "explanation": "Un segundo lector ayuda a comprobar si las instrucciones son comprensibles y no dejan dudas."
  },
  {
    "id": "g3_matematica_1",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity calcula su propulsión! ¿Cuánto es 17 + 3?",
    "options": [
      {
        "text": "20",
        "isCorrect": true
      },
      {
        "text": "19",
        "isCorrect": false
      },
      {
        "text": "21",
        "isCorrect": false
      }
    ],
    "explanation": "17 más 3 es igual a 20."
  },
  {
    "id": "g3_matematica_2",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity analiza la distancia a la base! ¿Cuánto es 24 − 4?",
    "options": [
      {
        "text": "20",
        "isCorrect": true
      },
      {
        "text": "18",
        "isCorrect": false
      },
      {
        "text": "22",
        "isCorrect": false
      }
    ],
    "explanation": "24 menos 4 es igual a 20."
  },
  {
    "id": "g3_matematica_3",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity suma energía para el radar! ¿Cuánto es 12 + 6?",
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
    "explanation": "12 más 6 es igual a 18."
  },
  {
    "id": "g3_matematica_4",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity gasta reserva de escudo! ¿Cuánto es 28 − 8?",
    "options": [
      {
        "text": "20",
        "isCorrect": true
      },
      {
        "text": "22",
        "isCorrect": false
      },
      {
        "text": "18",
        "isCorrect": false
      }
    ],
    "explanation": "28 menos 8 es igual a 20."
  },
  {
    "id": "g3_matematica_5",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity potencia sus motores! ¿Cuánto es 35 + 5?",
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
    "explanation": "35 más 5 es igual a 40."
  },
  {
    "id": "g3_matematica_6",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity desciende una pendiente! ¿Cuánto es 42 − 12?",
    "options": [
      {
        "text": "30",
        "isCorrect": true
      },
      {
        "text": "28",
        "isCorrect": false
      },
      {
        "text": "32",
        "isCorrect": false
      }
    ],
    "explanation": "42 menos 12 es igual a 30."
  },
  {
    "id": "g3_matematica_7",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity recarga sus baterías secundarias! ¿Cuánto es 19 + 5?",
    "options": [
      {
        "text": "24",
        "isCorrect": true
      },
      {
        "text": "23",
        "isCorrect": false
      },
      {
        "text": "25",
        "isCorrect": false
      }
    ],
    "explanation": "19 más 5 es igual a 24."
  },
  {
    "id": "g3_matematica_8",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity reduce la potencia de frenado! ¿Cuánto es 30 − 7?",
    "options": [
      {
        "text": "23",
        "isCorrect": true
      },
      {
        "text": "22",
        "isCorrect": false
      },
      {
        "text": "24",
        "isCorrect": false
      }
    ],
    "explanation": "30 menos 7 es igual a 23."
  },
  {
    "id": "g3_matematica_9",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity añade una batería de reserva! ¿Cuánto es 25 + 10?",
    "options": [
      {
        "text": "35",
        "isCorrect": true
      },
      {
        "text": "34",
        "isCorrect": false
      },
      {
        "text": "36",
        "isCorrect": false
      }
    ],
    "explanation": "25 más 10 es igual a 35."
  },
  {
    "id": "g3_matematica_10",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity calibra los sensores de ruta! ¿Cuánto es 38 − 6?",
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
        "text": "33",
        "isCorrect": false
      }
    ],
    "explanation": "38 menos 6 es igual a 32."
  },
  {
    "id": "g3_matematica_11",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity suma energía para el gran salto! ¿Cuánto es 22 + 8?",
    "options": [
      {
        "text": "30",
        "isCorrect": true
      },
      {
        "text": "28",
        "isCorrect": false
      },
      {
        "text": "31",
        "isCorrect": false
      }
    ],
    "explanation": "22 más 8 es igual a 30."
  },
  {
    "id": "g3_matematica_12",
    "grade": 3,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity ajusta la presión del propulsor! ¿Cuánto es 45 − 5?",
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
    "explanation": "45 menos 5 es igual a 40."
  },
  {
    "id": "g4_instrucciones_1",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Comparamos dos secuencias para avanzar 3 metros: Secuencia A («Avanzar 3»). Secuencia B («Avanzar 1, Retroceder 1, Avanzar 3»). ¿Cuál es más directa?",
    "options": [
      {
        "text": "La Secuencia A, porque no tiene pasos innecesarios que hagan perder tiempo.",
        "isCorrect": true
      },
      {
        "text": "La Secuencia B, porque caminar hacia atrás hace que el robot sea más rápido.",
        "isCorrect": false
      },
      {
        "text": "Son idénticas en cantidad de movimientos.",
        "isCorrect": false
      }
    ],
    "explanation": "La secuencia A alcanza la meta de forma directa sin desperdiciar pasos en retrocesos inútiles."
  },
  {
    "id": "g4_instrucciones_2",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si Bity necesita ir a la derecha y luego adelante: ¿cuál de estas secuencias es la correcta?",
    "options": [
      {
        "text": "1. Girar a la derecha. 2. Avanzar.",
        "isCorrect": true
      },
      {
        "text": "1. Avanzar hacia adelante. 2. Girar a la derecha.",
        "isCorrect": false
      },
      {
        "text": "1. Girar a la izquierda. 2. Retroceder.",
        "isCorrect": false
      }
    ],
    "explanation": "Primero se orienta el frente de Bity girando a la derecha y luego se avanza en esa nueva dirección."
  },
  {
    "id": "g4_instrucciones_3",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Un robot debe esquivar una roca que está justo adelante: ¿qué secuencia de instrucciones resuelve el problema?",
    "options": [
      {
        "text": "Girar a un lado, avanzar para esquivar la roca, girar de nuevo y continuar hacia la meta.",
        "isCorrect": true
      },
      {
        "text": "Avanzar directo contra la roca hasta chocarla.",
        "isCorrect": false
      },
      {
        "text": "Quedarse quieto frente a la roca para siempre.",
        "isCorrect": false
      }
    ],
    "explanation": "Rodear un obstáculo requiere desviar la trayectoria, avanzar el tramo del bloqueo y retomar el rumbo."
  },
  {
    "id": "g4_instrucciones_4",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si un programa tiene dos instrucciones seguidas: «Girar a la izquierda» y después «Girar a la derecha», ¿hacia dónde queda mirando Bity?",
    "options": [
      {
        "text": "Queda mirando exactamente hacia la misma dirección en la que comenzó.",
        "isCorrect": true
      },
      {
        "text": "Queda mirando hacia atrás.",
        "isCorrect": false
      },
      {
        "text": "Queda mirando hacia el suelo.",
        "isCorrect": false
      }
    ],
    "explanation": "Dos giros en sentidos opuestos de igual magnitud se anulan mutuamente."
  },
  {
    "id": "g4_instrucciones_5",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "¿Por qué un robot no debe adivinar lo que queremos que haga y necesita instrucciones claras?",
    "options": [
      {
        "text": "Porque no tiene pensamiento propio; solo puede ejecutar con exactitud las órdenes que se le programaron.",
        "isCorrect": true
      },
      {
        "text": "Porque prefiere hacer lo contrario de lo que le pedimos.",
        "isCorrect": false
      },
      {
        "text": "Porque los robots adivinan el futuro.",
        "isCorrect": false
      }
    ],
    "explanation": "Las máquinas carecen de intuición; solo procesan las órdenes literales que recibieron."
  },
  {
    "id": "g4_instrucciones_6",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Comparamos: Camino 1 (4 instrucciones sencillas) y Camino 2 (8 instrucciones para llegar al mismo lugar). ¿Cuál elegimos y por qué?",
    "options": [
      {
        "text": "El Camino 1, porque llega a la misma meta con menos pasos y de forma más clara.",
        "isCorrect": true
      },
      {
        "text": "El Camino 2, porque mientras más larga la orden, mejor funciona el robot.",
        "isCorrect": false
      },
      {
        "text": "Cualquiera, no importa cuántos pasos demos.",
        "isCorrect": false
      }
    ],
    "explanation": "El camino más corto optimiza el tiempo y reduce las posibilidades de error."
  },
  {
    "id": "g4_instrucciones_7",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Bity debe encender 3 luces en orden: Luz 1, Luz 2 y Luz 3. ¿Qué instrucción debe colocarse primero?",
    "options": [
      {
        "text": "La instrucción para encender la Luz 1.",
        "isCorrect": true
      },
      {
        "text": "La instrucción para apagar todo el tablero.",
        "isCorrect": false
      },
      {
        "text": "La instrucción de encender la Luz 3.",
        "isCorrect": false
      }
    ],
    "explanation": "Si el orden pedido es 1, 2 y 3, la primera orden de la secuencia debe encender la Luz 1."
  },
  {
    "id": "g4_instrucciones_8",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si una orden dice «Avanzar 2 casilleros» pero el camino termina en 1 casillero por un precipicio, ¿qué instrucción debemos poner?",
    "options": [
      {
        "text": "Cambiar la orden a «Avanzar 1 casillero» y luego girar para evitar caer al precipicio.",
        "isCorrect": true
      },
      {
        "text": "Dejar «Avanzar 2 casilleros» sin corregir nada.",
        "isCorrect": false
      },
      {
        "text": "Apagar el monitor sin corregir la orden.",
        "isCorrect": false
      }
    ],
    "explanation": "Adaptar la distancia al terreno evita que Bity caiga al vacío."
  },
  {
    "id": "g4_instrucciones_9",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "¿Qué significa organizar las instrucciones de forma lógica?",
    "options": [
      {
        "text": "Colocar cada orden en el momento preciso en que debe ocurrir para que la tarea sea posible.",
        "isCorrect": true
      },
      {
        "text": "Mezclar las instrucciones para que parezca un juego de azar.",
        "isCorrect": false
      },
      {
        "text": "Poner todas las órdenes juntas al final.",
        "isCorrect": false
      }
    ],
    "explanation": "La lógica de una secuencia requiere que cada acción tenga las condiciones previas cumplidas para ejecutarse."
  },
  {
    "id": "g4_instrucciones_10",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si Bity debe recoger una llave y abrir un cofre, ¿por qué no podemos poner «Abrir cofre» antes de «Recoger llave»?",
    "options": [
      {
        "text": "Porque se necesita tener la llave en la mano antes de poder abrir la cerradura del cofre.",
        "isCorrect": true
      },
      {
        "text": "Porque el cofre se puede abrir con las manos vacías sin la llave.",
        "isCorrect": false
      },
      {
        "text": "Porque la llave desaparece si la tocamos.",
        "isCorrect": false
      }
    ],
    "explanation": "No es posible utilizar un objeto antes de haberlo adquirido."
  },
  {
    "id": "g4_instrucciones_11",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Dos alumnos programan a Bity para dar una vuelta cuadrada: Alumno A usa 4 avances y 4 giros. Alumno B usa 10 avances y 8 giros. ¿Qué podemos decir?",
    "options": [
      {
        "text": "El Alumno A organizó su secuencia de forma más eficiente y clara.",
        "isCorrect": true
      },
      {
        "text": "El Alumno B lo hizo mejor porque gastó más instrucciones.",
        "isCorrect": false
      },
      {
        "text": "Ninguno pudo dibujar un cuadrado.",
        "isCorrect": false
      }
    ],
    "explanation": "Un cuadrado regular se compone de 4 lados iguales y 4 esquinas de 90°."
  },
  {
    "id": "g4_instrucciones_12",
    "grade": 4,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si queremos que Bity se detenga exactamente en la meta, ¿qué instrucción colocamos al final?",
    "options": [
      {
        "text": "La instrucción de detenerse o finalizar la misión.",
        "isCorrect": true
      },
      {
        "text": "Una instrucción de reiniciar todo el nivel.",
        "isCorrect": false
      },
      {
        "text": "Una orden de saltar hacia atrás.",
        "isCorrect": false
      }
    ],
    "explanation": "La instrucción de detención concluye el recorrido de forma controlada en la posición objetivo."
  },
  {
    "id": "g4_programacion_1",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Cuál es la función principal de programar en una computadora o robot?",
    "options": [
      {
        "text": "Darle una serie de instrucciones organizadas para que resuelva una tarea o problema.",
        "isCorrect": true
      },
      {
        "text": "Hacer dibujos en la pantalla sin ningún orden.",
        "isCorrect": false
      },
      {
        "text": "Desarmar el teclado y el monitor.",
        "isCorrect": false
      }
    ],
    "explanation": "Programar es estructurar soluciones mediante secuencias de órdenes ejecutables."
  },
  {
    "id": "g4_programacion_2",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si un robot ejecuta una instrucción equivocada que escribimos nosotros, ¿de quién es la responsabilidad?",
    "options": [
      {
        "text": "Del programador que escribió la instrucción; el robot solo cumplió la orden recibida.",
        "isCorrect": true
      },
      {
        "text": "Del robot, porque desobedeció a propósito.",
        "isCorrect": false
      },
      {
        "text": "De la pantalla por mostrar la orden.",
        "isCorrect": false
      }
    ],
    "explanation": "El robot es un ejecutor neutral; la lógica proviene del programador."
  },
  {
    "id": "g4_programacion_3",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Por qué es conveniente dividir un recorrido largo de Bity en pequeños tramos más cortos?",
    "options": [
      {
        "text": "Porque hace que sea más fácil de planificar, programar y revisar paso a paso.",
        "isCorrect": true
      },
      {
        "text": "Porque las computadoras solo aceptan 2 pasos por día.",
        "isCorrect": false
      },
      {
        "text": "Para que el juego tarde muchas horas en cargar.",
        "isCorrect": false
      }
    ],
    "explanation": "La descomposición en subtareas simplifica la resolución y facilita encontrar errores."
  },
  {
    "id": "g4_programacion_4",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si Bity tiene que avanzar 5 casillas, pero pusimos «Avanzar 3 casillas», ¿cómo corregimos el programa?",
    "options": [
      {
        "text": "Cambiamos el número de pasos a 5, o agregamos una orden de avanzar 2 casillas más.",
        "isCorrect": true
      },
      {
        "text": "Borramos todo el juego y no jugamos más.",
        "isCorrect": false
      },
      {
        "text": "Esperamos que la meta se mueva sola 2 casillas hacia Bity.",
        "isCorrect": false
      }
    ],
    "explanation": "Ajustar el parámetro numérico o añadir el tramo faltante alcanza la distancia requerida."
  },
  {
    "id": "g4_programacion_5",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Por qué las instrucciones de un programa deben escribirse con total precisión?",
    "options": [
      {
        "text": "Porque las computadoras interpretan las órdenes de manera literal, sin suponer lo que queríamos decir.",
        "isCorrect": true
      },
      {
        "text": "Porque a las computadoras les gustan las órdenes confusas.",
        "isCorrect": false
      },
      {
        "text": "Para que el programa tarde más en funcionar.",
        "isCorrect": false
      }
    ],
    "explanation": "La literalidad del procesamiento exige exactitud en cada parámetro."
  },
  {
    "id": "g4_programacion_6",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué puede pasar si cambiamos el orden de las instrucciones en un programa?",
    "options": [
      {
        "text": "El robot ejecutará las acciones en una secuencia distinta y puede no alcanzar la meta esperada.",
        "isCorrect": true
      },
      {
        "text": "El robot siempre llega a la misma meta sin importar el orden.",
        "isCorrect": false
      },
      {
        "text": "La computadora se apaga de inmediato.",
        "isCorrect": false
      }
    ],
    "explanation": "El orden de ejecución determina la trayectoria y el desenlace de la tarea."
  },
  {
    "id": "g4_programacion_7",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Al programar una animación de Bity caminando, ¿qué órdenes se repiten de forma ordenada?",
    "options": [
      {
        "text": "Mover la pierna derecha, mover la pierna izquierda y avanzar un paso.",
        "isCorrect": true
      },
      {
        "text": "Apagar la luz y dormir una siesta.",
        "isCorrect": false
      },
      {
        "text": "Desarmar el robot en piezas.",
        "isCorrect": false
      }
    ],
    "explanation": "La marcha animada se compone de la alternancia rítmica de pasos y avances."
  },
  {
    "id": "g4_programacion_8",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si queremos comprobar si una parte de nuestro programa funciona bien, ¿qué podemos hacer?",
    "options": [
      {
        "text": "Probar esa parte paso por paso observando cómo responde el robot.",
        "isCorrect": true
      },
      {
        "text": "No mirar la pantalla y confiar en la suerte.",
        "isCorrect": false
      },
      {
        "text": "Cambiar todas las instrucciones al azar.",
        "isCorrect": false
      }
    ],
    "explanation": "La verificación modular paso a paso permite aislar aciertos y desvíos."
  },
  {
    "id": "g4_programacion_9",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Por qué dos programas diferentes pueden resolver el mismo desafío de Bity?",
    "options": [
      {
        "text": "Porque puede haber más de un camino o combinación de pasos válidos para llegar a la misma meta.",
        "isCorrect": true
      },
      {
        "text": "Porque las computadoras no prestan atención a las órdenes.",
        "isCorrect": false
      },
      {
        "text": "Porque solo existe una sola forma de programar en el mundo.",
        "isCorrect": false
      }
    ],
    "explanation": "Existen múltiples rutas algorítmicas válidas para alcanzar un mismo objetivo."
  },
  {
    "id": "g4_programacion_10",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si un programa tiene muchas instrucciones desordenadas e innecesarias, ¿qué conviene hacer?",
    "options": [
      {
        "text": "Limpiar y ordenar la lista para que solo queden las instrucciones indispensables.",
        "isCorrect": true
      },
      {
        "text": "Agregar 50 órdenes más para confundir al robot.",
        "isCorrect": false
      },
      {
        "text": "Dejarlo desordenado para que tarde más tiempo.",
        "isCorrect": false
      }
    ],
    "explanation": "Simplificar y ordenar el programa mejora su claridad, velocidad y mantenimiento."
  },
  {
    "id": "g4_programacion_11",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué ocurre si un robot recibe una orden que no sabe realizar porque no fue programada?",
    "options": [
      {
        "text": "No la puede ejecutar y se detiene sin completar la acción.",
        "isCorrect": true
      },
      {
        "text": "La inventa solo con imaginación.",
        "isCorrect": false
      },
      {
        "text": "El robot se rompe en pedacitos.",
        "isCorrect": false
      }
    ],
    "explanation": "Las máquinas solo reconocen el conjunto de órdenes previamente definidas en su sistema."
  },
  {
    "id": "g4_programacion_12",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Cómo ayuda la programación a desarrollar el pensamiento lógico?",
    "options": [
      {
        "text": "Nos enseña a ordenar ideas, anticipar resultados y buscar soluciones paso a paso.",
        "isCorrect": true
      },
      {
        "text": "Haciendo que no tengamos que pensar nunca más.",
        "isCorrect": false
      },
      {
        "text": "Obligándonos a memorizar palabras sin sentido.",
        "isCorrect": false
      }
    ],
    "explanation": "Estructurar programas entrena la capacidad de análisis y resolución sistemática."
  },
  {
    "id": "g4_algoritmos_1",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Qué es un algoritmo en informática?",
    "options": [
      {
        "text": "Una secuencia de pasos ordenados y finitos que conducen a la resolución de un problema.",
        "isCorrect": true
      },
      {
        "text": "Una pieza de metal que se pone dentro del teclado.",
        "isCorrect": false
      },
      {
        "text": "Un cable largo que conecta dos pantallas.",
        "isCorrect": false
      }
    ],
    "explanation": "El algoritmo es el diseño metodológico de la solución independiente del soporte."
  },
  {
    "id": "g4_algoritmos_2",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Qué puede pasar si cambiamos el orden de los pasos en un algoritmo?",
    "options": [
      {
        "text": "El resultado se altera y la tarea puede salir mal o quedar incompleta.",
        "isCorrect": true
      },
      {
        "text": "El resultado siempre es el mismo sin importar el orden.",
        "isCorrect": false
      },
      {
        "text": "La computadora arregla el orden automáticamente.",
        "isCorrect": false
      }
    ],
    "explanation": "La alteración de la secuencia destruye las condiciones lógicas de ejecución."
  },
  {
    "id": "g4_algoritmos_3",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Para preparar una taza de chocolatada tenemos este algoritmo: 1. Servir la leche en la taza. 2. Agregar una cucharada de cacao. 3. Revolver con la cuchara. ¿Qué sucede si cambiamos el orden y ponemos el paso 3 antes del paso 1 y del paso 2?",
    "options": [
      {
        "text": "Estaríamos revolviendo con la cuchara en una taza vacía, antes de tener la leche y el cacao servidos.",
        "isCorrect": true
      },
      {
        "text": "La chocolatada queda lista igual de rápido sin necesidad de poner leche.",
        "isCorrect": false
      },
      {
        "text": "El cacao se disuelve automáticamente en el aire antes de tocar la taza.",
        "isCorrect": false
      }
    ],
    "explanation": "El orden de los pasos es indispensable en un algoritmo: no se puede mezclar ingredientes en un vaso antes de haberlos colocado."
  },
  {
    "id": "g4_algoritmos_4",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "En una pista recta de 3 casillas (A - B - C), Bity está en la casilla A y la meta es la C. ¿Cuál de estas secuencias permite llegar a la meta?",
    "options": [
      {
        "text": "Avanzar a la casilla B y luego avanzar a la casilla C.",
        "isCorrect": true
      },
      {
        "text": "Retroceder a la casilla B y quedarse quieto.",
        "isCorrect": false
      },
      {
        "text": "Saltar en la casilla A sin moverse de lugar.",
        "isCorrect": false
      }
    ],
    "explanation": "Desplazarse secuencialmente por las posiciones intermedias conecta el punto inicial con la meta."
  },
  {
    "id": "g4_algoritmos_5",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Para lavarse los dientes en 4 pasos: 1. Poner pasta, 2. Cepillar los dientes, 3. Enjuagarse la boca, 4. Secarse con la toalla. ¿Qué pasaría si el paso 3 se coloca antes del paso 2?",
    "options": [
      {
        "text": "Nos enjuagaríamos la boca antes de cepillar los dientes, por lo que el cepillado no cumpliría su función.",
        "isCorrect": true
      },
      {
        "text": "Los dientes se limpian el doble de rápido.",
        "isCorrect": false
      },
      {
        "text": "No cambia nada, da igual cepillarse antes o después.",
        "isCorrect": false
      }
    ],
    "explanation": "El enjuague retira los restos tras la acción de cepillado; invertirlo anula el proceso."
  },
  {
    "id": "g4_algoritmos_6",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Si comparamos dos algoritmos para armar la mochila: uno revisa cada bolsillo con orden y otro mete cosas al azar, ¿cuál es mejor?",
    "options": [
      {
        "text": "El algoritmo ordenado, porque asegura que no olvidemos ningún elemento importante.",
        "isCorrect": true
      },
      {
        "text": "El algoritmo al azar, porque no requiere pensar.",
        "isCorrect": false
      },
      {
        "text": "Son iguales, da lo mismo olvidar los cuadernos.",
        "isCorrect": false
      }
    ],
    "explanation": "El método ordenado garantiza exhaustividad y previene olvidos."
  },
  {
    "id": "g4_algoritmos_7",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Por qué un algoritmo debe tener un paso de finalización bien definido?",
    "options": [
      {
        "text": "Para que la tarea se dé por terminada en el momento adecuado y no continúe sin rumbo.",
        "isCorrect": true
      },
      {
        "text": "Para que la computadora se apague sola a los 2 minutos.",
        "isCorrect": false
      },
      {
        "text": "Porque los algoritmos nunca deben terminar.",
        "isCorrect": false
      }
    ],
    "explanation": "La condición de parada asegura que el proceso concluya una vez alcanzado el objetivo."
  },
  {
    "id": "g4_algoritmos_8",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "En un algoritmo de rescate, Bity debe: 1. Ubicar la señal de auxilio, 2. Trazar el camino, 3. Acudir al lugar. ¿Qué sucedería si se salta el paso 1?",
    "options": [
      {
        "text": "No sabría hacia dónde dirigirse porque no conoce la ubicación del rescate.",
        "isCorrect": true
      },
      {
        "text": "Llegaría más rápido sin importar dónde esté la señal.",
        "isCorrect": false
      },
      {
        "text": "El rescate se completa solo automáticamente.",
        "isCorrect": false
      }
    ],
    "explanation": "Omitir la etapa de detección impide trazar una trayectoria orientada a la meta."
  },
  {
    "id": "g4_algoritmos_9",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Si un algoritmo tiene un paso repetido que no aporta nada, como «Avanzar 0 pasos», ¿qué conviene hacer?",
    "options": [
      {
        "text": "Eliminar ese paso innecesario para que el algoritmo sea más limpio y directo.",
        "isCorrect": true
      },
      {
        "text": "Dejarlo muchas veces para que el robot se canse.",
        "isCorrect": false
      },
      {
        "text": "Borrar todo el algoritmo entero.",
        "isCorrect": false
      }
    ],
    "explanation": "Depurar instrucciones inocuas optimiza la claridad y el desempeño del algoritmo."
  },
  {
    "id": "g4_algoritmos_10",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Para armar una figura con 3 piezas Lego encastrables: Pieza base, Pieza media y Pieza superior. ¿En qué orden deben colocarse?",
    "options": [
      {
        "text": "1. Pieza base, 2. Pieza media, 3. Pieza superior.",
        "isCorrect": true
      },
      {
        "text": "1. Pieza superior en el aire, 2. Pieza media, 3. Pieza base.",
        "isCorrect": false
      },
      {
        "text": "1. Pieza media, 2. Pieza superior, 3. Pieza base al final.",
        "isCorrect": false
      }
    ],
    "explanation": "El ensamblaje físico progresivo exige asentar la base antes de encastrar los pisos superiores."
  },
  {
    "id": "g4_algoritmos_11",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Por qué los algoritmos se utilizan tanto en la vida cotidiana como en la tecnología?",
    "options": [
      {
        "text": "Porque proporcionan un método claro y seguro para resolver tareas paso a paso en cualquier ámbito.",
        "isCorrect": true
      },
      {
        "text": "Porque solo sirven para jugar en teléfonos.",
        "isCorrect": false
      },
      {
        "text": "Porque impiden que las personas piensen por sí mismas.",
        "isCorrect": false
      }
    ],
    "explanation": "El pensamiento algorítmico es universal: estructura procedimientos en cualquier actividad humana."
  },
  {
    "id": "g4_algoritmos_12",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Al terminar de diseñar un algoritmo, ¿cuál es la mejor manera de verificar que es correcto?",
    "options": [
      {
        "text": "Seguir cada paso en orden con atención y comprobar si se llega al resultado deseado.",
        "isCorrect": true
      },
      {
        "text": "No revisarlo y asumir que nunca falla.",
        "isCorrect": false
      },
      {
        "text": "Cambiar todos los pasos antes de probarlo.",
        "isCorrect": false
      }
    ],
    "explanation": "La traza paso a paso valida la solidez lógica de la secuencia diseñada."
  },
  {
    "id": "g4_matematica_1",
    "grade": 4,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity calibra su energía! ¿Cuánto es 21 + 6 − 2?",
    "options": [
      {
        "text": "25",
        "isCorrect": true
      },
      {
        "text": "24",
        "isCorrect": false
      },
      {
        "text": "27",
        "isCorrect": false
      }
    ],
    "explanation": "21 + 6 = 27; luego 27 − 2 = 25."
  },
  {
    "id": "g4_matematica_2",
    "grade": 4,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity ajusta la telemetría! ¿Cuánto es 30 − 5 + 3?",
    "options": [
      {
        "text": "28",
        "isCorrect": true
      },
      {
        "text": "27",
        "isCorrect": false
      },
      {
        "text": "29",
        "isCorrect": false
      }
    ],
    "explanation": "30 − 5 = 25; luego 25 + 3 = 28."
  },
  {
    "id": "g4_matematica_3",
    "grade": 4,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity calcula la ruta espacial! ¿Cuánto es 14 + 8 − 4?",
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
    "explanation": "14 + 8 = 22; luego 22 − 4 = 18."
  },
  {
    "id": "g4_matematica_4",
    "grade": 4,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity gestiona la carga de la nave! ¿Cuánto es 25 + 10 − 5?",
    "options": [
      {
        "text": "30",
        "isCorrect": true
      },
      {
        "text": "32",
        "isCorrect": false
      },
      {
        "text": "28",
        "isCorrect": false
      }
    ],
    "explanation": "25 + 10 = 35; luego 35 − 5 = 30."
  },
  {
    "id": "g4_matematica_5",
    "grade": 4,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity mide el consumo de propulsores! ¿Cuánto es 18 − 6 + 4?",
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
    "explanation": "18 − 6 = 12; luego 12 + 4 = 16."
  },
  {
    "id": "g4_matematica_6",
    "grade": 4,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity suma y resta energía de vuelo! ¿Cuánto es 32 + 5 − 3?",
    "options": [
      {
        "text": "34",
        "isCorrect": true
      },
      {
        "text": "33",
        "isCorrect": false
      },
      {
        "text": "35",
        "isCorrect": false
      }
    ],
    "explanation": "32 + 5 = 37; luego 37 − 3 = 34."
  },
  {
    "id": "g4_matematica_7",
    "grade": 4,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity reconfigura el generador! ¿Cuánto es 27 − 7 + 6?",
    "options": [
      {
        "text": "26",
        "isCorrect": true
      },
      {
        "text": "25",
        "isCorrect": false
      },
      {
        "text": "27",
        "isCorrect": false
      }
    ],
    "explanation": "27 − 7 = 20; luego 20 + 6 = 26."
  },
  {
    "id": "g4_matematica_8",
    "grade": 4,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity equilibra las baterías auxiliares! ¿Cuánto es 16 + 9 − 5?",
    "options": [
      {
        "text": "20",
        "isCorrect": true
      },
      {
        "text": "19",
        "isCorrect": false
      },
      {
        "text": "21",
        "isCorrect": false
      }
    ],
    "explanation": "16 + 9 = 25; luego 25 − 5 = 20."
  },
  {
    "id": "g4_matematica_9",
    "grade": 4,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity evalúa la altitud de vuelo! ¿Cuánto es 35 − 10 + 5?",
    "options": [
      {
        "text": "30",
        "isCorrect": true
      },
      {
        "text": "29",
        "isCorrect": false
      },
      {
        "text": "31",
        "isCorrect": false
      }
    ],
    "explanation": "35 − 10 = 25; luego 25 + 5 = 30."
  },
  {
    "id": "g4_matematica_10",
    "grade": 4,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity calcula la velocidad de crucero! ¿Cuánto es 20 + 12 − 4?",
    "options": [
      {
        "text": "28",
        "isCorrect": true
      },
      {
        "text": "26",
        "isCorrect": false
      },
      {
        "text": "30",
        "isCorrect": false
      }
    ],
    "explanation": "20 + 12 = 32; luego 32 − 4 = 28."
  },
  {
    "id": "g4_matematica_11",
    "grade": 4,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity calibra el escudo térmico! ¿Cuánto es 40 − 8 + 3?",
    "options": [
      {
        "text": "35",
        "isCorrect": true
      },
      {
        "text": "34",
        "isCorrect": false
      },
      {
        "text": "36",
        "isCorrect": false
      }
    ],
    "explanation": "40 − 8 = 32; luego 32 + 3 = 35."
  },
  {
    "id": "g4_matematica_12",
    "grade": 4,
    "category": "matematica",
    "difficulty": "medio",
    "question": "¡Bity completa la secuencia de energía! ¿Cuánto es 15 + 15 − 6?",
    "options": [
      {
        "text": "24",
        "isCorrect": true
      },
      {
        "text": "23",
        "isCorrect": false
      },
      {
        "text": "25",
        "isCorrect": false
      }
    ],
    "explanation": "15 + 15 = 30; luego 30 − 6 = 24."
  },
  {
    "id": "g5_instrucciones_1",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Cuál es la diferencia principal entre una indicación ambigua y una instrucción precisa en un recorrido?",
    "options": [
      {
        "text": "La indicación ambigua no define cuánto ni hacia dónde («Moverse hacia allá»); la instrucción precisa indica dirección y cantidad exacta («Avanzar 4 casilleros al frente»).",
        "isCorrect": true
      },
      {
        "text": "No existe ninguna diferencia; las computadoras interpretan ambas por igual.",
        "isCorrect": false
      },
      {
        "text": "La indicación ambigua es más corta y por eso siempre funciona mejor.",
        "isCorrect": false
      }
    ],
    "explanation": "La precisión en la magnitud y orientación elimina ambigüedades en la ejecución."
  },
  {
    "id": "g5_instrucciones_2",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "Bity está en una pista recta dividida en casilleros numerados del 1 al 10. Está parado en el casillero 2, mirando hacia adelante. Si recibe la orden «Avanzar 3 casilleros», ¿en qué casillero queda parado?",
    "options": [
      {
        "text": "En el casillero 5 (porque 2 + 3 = 5).",
        "isCorrect": true
      },
      {
        "text": "En el casillero 4 (porque avanzó 2 casilleros).",
        "isCorrect": false
      },
      {
        "text": "En el casillero 6 (porque contó el casillero 2 dos veces).",
        "isCorrect": false
      }
    ],
    "explanation": "Al partir de la posición 2 y desplazarse 3 unidades hacia adelante, se arriba a la posición 5 (2 + 3 = 5)."
  },
  {
    "id": "g5_instrucciones_3",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "En un recorrido con obstáculos, ¿por qué es fundamental indicar tanto la distancia como el sentido de giro?",
    "options": [
      {
        "text": "Porque si solo indicamos el giro sin la distancia, el robot no sabe cuántos pasos debe avanzar en esa nueva dirección.",
        "isCorrect": true
      },
      {
        "text": "Porque a los robots solo les gusta girar y no caminar.",
        "isCorrect": false
      },
      {
        "text": "Porque la distancia se calcula sola sin instrucciones.",
        "isCorrect": false
      }
    ],
    "explanation": "La navegación espacial requiere la definición conjunta de orientación y desplazamiento."
  },
  {
    "id": "g5_instrucciones_4",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "Si una instrucción dice «Avanzar hasta encontrar la línea amarilla», ¿qué condición debe verificar el sensor de Bity en cada paso?",
    "options": [
      {
        "text": "Comprobar si el suelo que pisa es de color amarillo para saber cuándo detenerse.",
        "isCorrect": true
      },
      {
        "text": "Mirar si el cielo tiene estrellas.",
        "isCorrect": false
      },
      {
        "text": "Contar cuántos segundos pasaron desde el inicio.",
        "isCorrect": false
      }
    ],
    "explanation": "La orden establece una condición de parada vinculada a la detección sensorial del color amarillo."
  },
  {
    "id": "g5_instrucciones_5",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "Bity debe recoger 3 gemas en línea recta separadas por 2 casilleros cada una. ¿Qué secuencia de instrucciones describe esa tarea?",
    "options": [
      {
        "text": "Avanzar 2, recoger gema, avanzar 2, recoger gema, avanzar 2, recoger gema.",
        "isCorrect": true
      },
      {
        "text": "Recoger gema 3 veces seguidas sin avanzar ningún casillero.",
        "isCorrect": false
      },
      {
        "text": "Avanzar 6 casilleros y recoger una sola gema.",
        "isCorrect": false
      }
    ],
    "explanation": "Se repite la estructura de desplazamiento de 2 casilleros seguida de la acción de recolección en cada gema."
  },
  {
    "id": "g5_instrucciones_6",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "Si cambiamos una instrucción en medio de una secuencia de 6 pasos, ¿qué consecuencias tiene sobre los pasos siguientes?",
    "options": [
      {
        "text": "Todos los pasos posteriores se ejecutarán desde la nueva posición o dirección que dejó la orden modificada.",
        "isCorrect": true
      },
      {
        "text": "Los pasos posteriores no sufren ningún cambio y llegan al mismo lugar.",
        "isCorrect": false
      },
      {
        "text": "El programa se borra por completo.",
        "isCorrect": false
      }
    ],
    "explanation": "Los movimientos son relativos a la posición y orientación acumulada en los pasos previos."
  },
  {
    "id": "g5_instrucciones_7",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "En un tablero de casilleros numerados del 1 al 10 en línea recta, Bity empieza ubicado en el casillero 1, mirando hacia adelante (hacia el casillero 10). Si le damos las instrucciones: «Paso 1: Avanzar 1 casillero. Paso 2: Avanzar 2 casilleros», ¿en qué casillero termina su recorrido?",
    "options": [
      {
        "text": "En el casillero 4 (porque parte del 1 y avanza un total de 1 + 2 = 3 casilleros; 1 + 3 = 4).",
        "isCorrect": true
      },
      {
        "text": "En el casillero 3 (porque no contó el casillero inicial donde ya estaba parado).",
        "isCorrect": false
      },
      {
        "text": "En el casillero 5 (porque sumó un casillero extra que no estaba en las órdenes).",
        "isCorrect": false
      }
    ],
    "explanation": "Bity inicia en el casillero 1. Con el paso 1 pasa al casillero 2. Con el paso 2 avanza dos casilleros más y llega al casillero 4. La meta alcanzada es exactamente el casillero 4."
  },
  {
    "id": "g5_instrucciones_8",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Qué ocurre si en una secuencia de instrucciones para abordar la nave colocamos «Subir a la cabina» antes de «Caminar hasta la nave»?",
    "options": [
      {
        "text": "La instrucción fallará porque Bity todavía no está cerca de la nave para poder subir a ella.",
        "isCorrect": true
      },
      {
        "text": "La nave vendrá volando a buscar a Bity.",
        "isCorrect": false
      },
      {
        "text": "No ocurre nada, Bity sube igual a la distancia.",
        "isCorrect": false
      }
    ],
    "explanation": "Para interactuar físicamente con un objeto, primero se debe alcanzar su ubicación espacial."
  },
  {
    "id": "g5_instrucciones_9",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "Si Bity está en el casillero 5 de una pista recta y recibe la secuencia: «Retroceder 2 casilleros, Avanzar 4 casilleros», ¿a qué casillero llega?",
    "options": [
      {
        "text": "Al casillero 7 (porque 5 − 2 = 3; luego 3 + 4 = 7).",
        "isCorrect": true
      },
      {
        "text": "Al casillero 9 (porque sumó todos los números sin retroceder).",
        "isCorrect": false
      },
      {
        "text": "Al casillero 3 (porque olvidó el avance final).",
        "isCorrect": false
      }
    ],
    "explanation": "Partiendo de 5: retroceder 2 deja la posición en 3; avanzar 4 traslada la posición final a 7."
  },
  {
    "id": "g5_instrucciones_10",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Por qué una regla sencilla como «Si hay un muro enfrente: girar a la derecha» hace más seguro el recorrido de Bity?",
    "options": [
      {
        "text": "Porque le permite reaccionar a tiempo ante un obstáculo y evitar chocar.",
        "isCorrect": true
      },
      {
        "text": "Porque hace que el robot camine más lento sin motivo.",
        "isCorrect": false
      },
      {
        "text": "Porque las paredes desaparecen al ver girar al robot.",
        "isCorrect": false
      }
    ],
    "explanation": "Evaluar el entorno antes de avanzar previene colisiones e interrupciones en la trayectoria."
  },
  {
    "id": "g5_instrucciones_11",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "Para que Bity avance 2 pasos hacia un objeto, lo recoja y regrese exactamente al punto de partida, ¿cuál es la secuencia correcta?",
    "options": [
      {
        "text": "1. Avanzar 2 pasos. 2. Agarrar el objeto. 3. Girar 180° (media vuelta). 4. Avanzar 2 pasos.",
        "isCorrect": true
      },
      {
        "text": "1. Avanzar 2 pasos. 2. Girar. 3. Irse sin agarrar el objeto.",
        "isCorrect": false
      },
      {
        "text": "1. Agarrar el objeto a la distancia. 2. Avanzar 4 pasos.",
        "isCorrect": false
      }
    ],
    "explanation": "El retorno exacto requiere invertir la orientación (180°) y desandar la misma distancia previamente recorrida."
  },
  {
    "id": "g5_instrucciones_12",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "Si una orden dice «Saltar a la derecha», ¿qué dos movimientos combinados está realizando Bity?",
    "options": [
      {
        "text": "Un movimiento vertical de elevación hacia arriba y un desplazamiento horizontal hacia su derecha.",
        "isCorrect": true
      },
      {
        "text": "Dos saltos en el mismo lugar hacia abajo.",
        "isCorrect": false
      },
      {
        "text": "Un retroceso hacia la izquierda.",
        "isCorrect": false
      }
    ],
    "explanation": "El salto diagonal combina impulso vertical en Y con desplazamiento horizontal en X."
  },
  {
    "id": "g5_programacion_1",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué es lo más importante que hace un programador antes de escribir las instrucciones de un programa?",
    "options": [
      {
        "text": "Analizar el problema con detenimiento y planificar en orden los pasos de la solución.",
        "isCorrect": true
      },
      {
        "text": "Colocar instrucciones al azar para ver qué pasa.",
        "isCorrect": false
      },
      {
        "text": "Apagar la computadora y esperar que se resuelva solo.",
        "isCorrect": false
      }
    ],
    "explanation": "La etapa de análisis y diseño previo es crucial para construir soluciones sólidas y correctas."
  },
  {
    "id": "g5_programacion_2",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "Si dos programas logran que Bity complete el mismo nivel, pero el Programa A usa 6 instrucciones y el Programa B usa 20 instrucciones innecesarias, ¿cuál preferimos y por qué?",
    "options": [
      {
        "text": "El Programa A, porque es más claro, directo y no desperdicia pasos ni energía.",
        "isCorrect": true
      },
      {
        "text": "El Programa B, porque mientras más órdenes tenga un programa, más inteligente es.",
        "isCorrect": false
      },
      {
        "text": "Cualquiera, no existe ninguna diferencia entre usar 6 o 20 instrucciones.",
        "isCorrect": false
      }
    ],
    "explanation": "La claridad y la economía de instrucciones reducen puntos de falla y optimizan recursos."
  },
  {
    "id": "g5_programacion_3",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué significa que un programa tenga un error de lógica en sus instrucciones?",
    "options": [
      {
        "text": "Que las instrucciones se ejecutan, pero el resultado final no es el que esperábamos para resolver la tarea.",
        "isCorrect": true
      },
      {
        "text": "Que la computadora se prendió fuego.",
        "isCorrect": false
      },
      {
        "text": "Que el monitor se quedó sin batería.",
        "isCorrect": false
      }
    ],
    "explanation": "Un error lógico ocurre cuando la secuencia de órdenes es válida sintácticamente pero no cumple el objetivo deseado."
  },
  {
    "id": "g5_programacion_4",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "Si un programa debe hacer que Bity recoja 3 repuestos y luego active el cohete, ¿cuál es el requisito previo para activar el cohete?",
    "options": [
      {
        "text": "Haber completado previamente la recolección de los 3 repuestos.",
        "isCorrect": true
      },
      {
        "text": "Activar el cohete antes de buscar los repuestos.",
        "isCorrect": false
      },
      {
        "text": "Juntar solo 1 repuesto y dejar los otros 2.",
        "isCorrect": false
      }
    ],
    "explanation": "La condición de activación exige la satisfacción íntegra de las premisas anteriores."
  },
  {
    "id": "g5_programacion_5",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Por qué decimos que la programación es una herramienta para resolver problemas?",
    "options": [
      {
        "text": "Porque nos permite diseñar soluciones paso a paso que las computadoras pueden ejecutar para ayudarnos.",
        "isCorrect": true
      },
      {
        "text": "Porque hace que las tareas se completen solas sin que nadie haga nada.",
        "isCorrect": false
      },
      {
        "text": "Porque solo sirve para romper computadoras.",
        "isCorrect": false
      }
    ],
    "explanation": "La programación traduce estrategias humanas de resolución en secuencias de acciones automatizables."
  },
  {
    "id": "g5_programacion_6",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "Si probamos nuestro programa y Bity gira hacia el lado opuesto al cohete, ¿cómo razonamos para solucionarlo?",
    "options": [
      {
        "text": "Identificamos la instrucción de giro que causó el desvío y la cambiamos por el giro correcto.",
        "isCorrect": true
      },
      {
        "text": "Dejamos el programa igual y esperamos que el cohete se mueva hacia Bity.",
        "isCorrect": false
      },
      {
        "text": "Borramos todo el juego y no intentamos corregirlo.",
        "isCorrect": false
      }
    ],
    "explanation": "El análisis crítico localiza la orden divergente y aplica el ajuste puntual requerido."
  },
  {
    "id": "g5_programacion_7",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué hace que un programa sea fácil de comprender y modificar en el futuro?",
    "options": [
      {
        "text": "Que sus instrucciones estén ordenadas de forma clara y sin pasos confusos ni sobrantes.",
        "isCorrect": true
      },
      {
        "text": "Que use órdenes mezcladas al azar sin ningún orden.",
        "isCorrect": false
      },
      {
        "text": "Que no tenga ningún paso y esté en blanco.",
        "isCorrect": false
      }
    ],
    "explanation": "La claridad estructural y la modularidad facilitan la lectura y el mantenimiento del software."
  },
  {
    "id": "g5_programacion_8",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "Al programar el despegue de la nave de Bity, ¿qué instrucciones deben cumplirse en orden?",
    "options": [
      {
        "text": "1. Subir Bity a la cabina. 2. Cerrar la compuerta. 3. Encender los propulsores.",
        "isCorrect": true
      },
      {
        "text": "1. Encender los propulsores. 2. Subir a la cabina en pleno vuelo. 3. Cerrar la compuerta.",
        "isCorrect": false
      },
      {
        "text": "1. Cerrar la compuerta con Bity afuera. 2. Despegar.",
        "isCorrect": false
      }
    ],
    "explanation": "La secuencia lógica de embarque y despegue exige que el piloto aborde y cierre la nave antes de la propulsión."
  },
  {
    "id": "g5_programacion_9",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Por qué las computadoras solo funcionan con instrucciones lógicas y no con deseos o magia?",
    "options": [
      {
        "text": "Porque son máquinas creadas para procesar órdenes precisas dadas por seres humanos.",
        "isCorrect": true
      },
      {
        "text": "Porque las computadoras adivinan lo que queremos sin necesidad de instrucciones.",
        "isCorrect": false
      },
      {
        "text": "Porque las computadoras inventan sus propias reglas al encenderse.",
        "isCorrect": false
      }
    ],
    "explanation": "El funcionamiento computacional se basa exclusivamente en la lógica electrónica y el código programado."
  },
  {
    "id": "g5_programacion_10",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "Si queremos que Bity avise cuando llega a la meta, ¿qué instrucción agregamos al final del programa?",
    "options": [
      {
        "text": "Una instrucción para mostrar el mensaje «¡Misión cumplida!».",
        "isCorrect": true
      },
      {
        "text": "Una instrucción de retroceder 100 pasos.",
        "isCorrect": false
      },
      {
        "text": "Una orden de apagar la computadora sin avisar nada.",
        "isCorrect": false
      }
    ],
    "explanation": "Un mensaje de retroalimentación en el paso terminal confirma el cumplimiento exitoso del objetivo."
  },
  {
    "id": "g5_programacion_11",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué aprendemos cuando comparamos nuestra solución programada con la de un compañero?",
    "options": [
      {
        "text": "Que un mismo problema puede resolverse con distintas combinaciones válidas de instrucciones lógicas.",
        "isCorrect": true
      },
      {
        "text": "Que solo existe una única forma correcta de programar en el mundo.",
        "isCorrect": false
      },
      {
        "text": "Que comparar soluciones no sirve para nada.",
        "isCorrect": false
      }
    ],
    "explanation": "El intercambio entre pares enriquece la perspectiva y demuestra la pluralidad de caminos algorítmicos válidos."
  },
  {
    "id": "g5_programacion_12",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "En conclusión, ¿qué significa aprender a programar en la escuela primaria?",
    "options": [
      {
        "text": "Aprender a pensar de manera lógica, ordenada y creativa para resolver desafíos con la tecnología.",
        "isCorrect": true
      },
      {
        "text": "Memorizar códigos difíciles sin entender qué hacen.",
        "isCorrect": false
      },
      {
        "text": "Convertirse en un robot que no habla con nadie.",
        "isCorrect": false
      }
    ],
    "explanation": "La programación escolar desarrolla habilidades cognitivas fundamentales: lógica, orden y creatividad."
  },
  {
    "id": "g5_algoritmos_1",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Qué diferencia a un buen algoritmo de una simple lista de ideas desordenadas?",
    "options": [
      {
        "text": "Que el algoritmo tiene un orden estricto de pasos orientados a lograr un objetivo concreto.",
        "isCorrect": true
      },
      {
        "text": "Que el algoritmo no tiene ningún orden ni principio ni fin.",
        "isCorrect": false
      },
      {
        "text": "Que una lista de ideas siempre resuelve los problemas automáticamente.",
        "isCorrect": false
      }
    ],
    "explanation": "La estructura secuencial y el propósito definido diferencian al algoritmo del desorden."
  },
  {
    "id": "g5_algoritmos_2",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "Si dos algoritmos para reparar el cohete de Bity llegan al mismo resultado, pero uno requiere 5 pasos y el otro 15 pasos con rodeos, ¿por qué elegimos el de 5 pasos?",
    "options": [
      {
        "text": "Porque es más eficiente, ahorra tiempo y batería, y es más fácil de verificar.",
        "isCorrect": true
      },
      {
        "text": "Porque a las computadoras no les gusta trabajar.",
        "isCorrect": false
      },
      {
        "text": "Porque los cohetes solo aceptan números menores a 6.",
        "isCorrect": false
      }
    ],
    "explanation": "Un menor número de pasos optimiza recursos y reduce puntos potenciales de falla."
  },
  {
    "id": "g5_algoritmos_3",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "Bity sigue este algoritmo: 1. Caminar 4 pasos, 2. Si la puerta está con llave: usar la llave, 3. Entrar. ¿Qué sucede si la puerta está cerrada con llave pero Bity no tiene la llave?",
    "options": [
      {
        "text": "El algoritmo no puede continuar en el paso 2 porque falta el elemento necesario para abrir la puerta.",
        "isCorrect": true
      },
      {
        "text": "Bity derriba la pared con los ojos.",
        "isCorrect": false
      },
      {
        "text": "La puerta se abre sola desde el espacio.",
        "isCorrect": false
      }
    ],
    "explanation": "Las dependencias insatisfechas interrumpen la progresión normal del algoritmo."
  },
  {
    "id": "g5_algoritmos_4",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "Para ordenar 3 cajas por tamaño de menor a mayor: ¿qué procedimiento realiza un algoritmo de ordenamiento simple?",
    "options": [
      {
        "text": "Compara las cajas de a dos y va colocando la más pequeña adelante hasta que queden ordenadas.",
        "isCorrect": true
      },
      {
        "text": "Tira todas las cajas al aire esperando que caigan ordenadas solas.",
        "isCorrect": false
      },
      {
        "text": "Pinta todas las cajas del mismo color para no mirar el tamaño.",
        "isCorrect": false
      }
    ],
    "explanation": "La comparación sucesiva de a pares es la base metódica para ordenar elementos de forma determinista."
  },
  {
    "id": "g5_algoritmos_5",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Por qué un algoritmo debe tener una cantidad limitada de pasos que terminen en algún momento?",
    "options": [
      {
        "text": "Porque si nunca terminara, jamás llegaría a resolver el problema ni a mostrar el resultado final.",
        "isCorrect": true
      },
      {
        "text": "Porque a la computadora se le gasta la memoria a los dos minutos.",
        "isCorrect": false
      },
      {
        "text": "Porque los algoritmos solo duran 10 segundos.",
        "isCorrect": false
      }
    ],
    "explanation": "La condición de finitud es indispensable: un algoritmo debe culminar en un tiempo determinado."
  },
  {
    "id": "g5_algoritmos_6",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "En un algoritmo para cruzar un arroyo sobre 3 piedras: Piedra 1, Piedra 2, Piedra 3. Si la Piedra 2 está resbalosa o rota, ¿qué debe prever el algoritmo?",
    "options": [
      {
        "text": "Un paso alternativo para cruzar por otra piedra segura contigua.",
        "isCorrect": true
      },
      {
        "text": "Pisar la piedra rota de todas formas aunque caiga al agua.",
        "isCorrect": false
      },
      {
        "text": "Quedarse en la orilla sin intentar cruzar nunca más.",
        "isCorrect": false
      }
    ],
    "explanation": "Los algoritmos robustos prevén rutas de contingencia ante obstáculos en el camino."
  },
  {
    "id": "g5_algoritmos_7",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Qué significa que un algoritmo sea reproducible?",
    "options": [
      {
        "text": "Que si cualquier persona o computadora sigue exactamente los mismos pasos, obtendrá siempre el mismo resultado.",
        "isCorrect": true
      },
      {
        "text": "Que se puede escuchar con auriculares como una canción.",
        "isCorrect": false
      },
      {
        "text": "Que cambia de respuesta cada vez que se usa.",
        "isCorrect": false
      }
    ],
    "explanation": "La reproducibilidad garantiza consistencia universal en la ejecución de los pasos."
  },
  {
    "id": "g5_algoritmos_8",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "Si un algoritmo tiene como meta «Apagar el motor de Bity», ¿cuál debe ser su última instrucción?",
    "options": [
      {
        "text": "Cortar el suministro de energía del motor para que se detenga.",
        "isCorrect": true
      },
      {
        "text": "Acelerar al máximo para ver si explota.",
        "isCorrect": false
      },
      {
        "text": "Encender las luces de baile.",
        "isCorrect": false
      }
    ],
    "explanation": "La orden de corte de alimentación cumple directamente con el objetivo establecido."
  },
  {
    "id": "g5_algoritmos_9",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Cómo ayuda el pensamiento algorítmico a resolver problemas en la vida real?",
    "options": [
      {
        "text": "Nos ayuda a dividir un problema complejo en pasos más pequeños y ordenados para resolverlos uno por uno.",
        "isCorrect": true
      },
      {
        "text": "Hace que todos los problemas desaparezcan sin hacer nada.",
        "isCorrect": false
      },
      {
        "text": "Solo sirve para usar calculadoras.",
        "isCorrect": false
      }
    ],
    "explanation": "Desmenuzar la complejidad en pasos sucesivos facilita encontrar soluciones factibles."
  },
  {
    "id": "g5_algoritmos_10",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "Si comparamos el algoritmo para lavarse las manos con el de armar una carpa de campamento, ¿qué tienen en común?",
    "options": [
      {
        "text": "Ambos son secuencias ordenadas de pasos que deben seguirse para cumplir un objetivo con éxito.",
        "isCorrect": true
      },
      {
        "text": "Los dos usan jabón y toalla.",
        "isCorrect": false
      },
      {
        "text": "Ninguno tiene pasos ni orden.",
        "isCorrect": false
      }
    ],
    "explanation": "Aunque los ámbitos difieran, la estructura lógica de pasos orientados a una meta es común."
  },
  {
    "id": "g5_algoritmos_11",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "Si probamos un algoritmo para que Bity alcance una batería y vemos que el robot choca contra una pared en el tercer paso, ¿cómo debemos actuar para corregirlo?",
    "options": [
      {
        "text": "Revisamos los pasos de la secuencia uno por uno, identificamos cuál instrucción estuvo equivocada y la cambiamos por el camino correcto.",
        "isCorrect": true
      },
      {
        "text": "Borramos todo el juego y asumimos que la computadora ya no sirve.",
        "isCorrect": false
      },
      {
        "text": "Dejamos las instrucciones iguales y esperamos que la pared se mueva sola.",
        "isCorrect": false
      }
    ],
    "explanation": "Cuando un algoritmo no da el resultado esperado, debemos revisar las instrucciones paso a paso con tranquilidad, encontrar el error y corregirlo."
  },
  {
    "id": "g5_algoritmos_12",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "En conclusión, dominar las instrucciones, los programas y los algoritmos nos permite:",
    "options": [
      {
        "text": "Ser creadores de tecnología capaces de indicarle a las máquinas cómo ayudarnos a resolver problemas.",
        "isCorrect": true
      },
      {
        "text": "Ser solo usuarios que miran pantallas sin saber cómo funcionan las cosas por dentro.",
        "isCorrect": false
      },
      {
        "text": "Adivinar el futuro con computadoras mágicas.",
        "isCorrect": false
      }
    ],
    "explanation": "Comprender la lógica computacional nos empodera como constructores creativos de soluciones."
  },
  {
    "id": "g5_matematica_1",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity calibra la computadora de vuelo! ¿Cuánto es 55 + 12 − 6?",
    "options": [
      {
        "text": "61",
        "isCorrect": true
      },
      {
        "text": "59",
        "isCorrect": false
      },
      {
        "text": "63",
        "isCorrect": false
      }
    ],
    "explanation": "55 + 12 = 67; luego 67 − 6 = 61."
  },
  {
    "id": "g5_matematica_2",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity sincroniza los propulsores principales! ¿Cuánto es 40 + 15 − 5?",
    "options": [
      {
        "text": "50",
        "isCorrect": true
      },
      {
        "text": "48",
        "isCorrect": false
      },
      {
        "text": "52",
        "isCorrect": false
      }
    ],
    "explanation": "40 + 15 = 55; luego 55 − 5 = 50."
  },
  {
    "id": "g5_matematica_3",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity calcula la telemetría orbital! ¿Cuánto es 68 − 10 + 4?",
    "options": [
      {
        "text": "62",
        "isCorrect": true
      },
      {
        "text": "60",
        "isCorrect": false
      },
      {
        "text": "64",
        "isCorrect": false
      }
    ],
    "explanation": "68 − 10 = 58; luego 58 + 4 = 62."
  },
  {
    "id": "g5_matematica_4",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity optimiza la energía del reactor! ¿Cuánto es 50 + 25 − 15?",
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
    "explanation": "50 + 25 = 75; luego 75 − 15 = 60."
  },
  {
    "id": "g5_matematica_5",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity reconfigura el campo de fuerza! ¿Cuánto es 72 − 20 + 8?",
    "options": [
      {
        "text": "60",
        "isCorrect": true
      },
      {
        "text": "59",
        "isCorrect": false
      },
      {
        "text": "62",
        "isCorrect": false
      }
    ],
    "explanation": "72 − 20 = 52; luego 52 + 8 = 60."
  },
  {
    "id": "g5_matematica_6",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity calcula el empuje para el despegue! ¿Cuánto es 45 + 18 − 10?",
    "options": [
      {
        "text": "53",
        "isCorrect": true
      },
      {
        "text": "51",
        "isCorrect": false
      },
      {
        "text": "55",
        "isCorrect": false
      }
    ],
    "explanation": "45 + 18 = 63; luego 63 − 10 = 53."
  },
  {
    "id": "g5_matematica_7",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity estabiliza el generador de gravedad! ¿Cuánto es 60 − 25 + 15?",
    "options": [
      {
        "text": "50",
        "isCorrect": true
      },
      {
        "text": "48",
        "isCorrect": false
      },
      {
        "text": "52",
        "isCorrect": false
      }
    ],
    "explanation": "60 − 25 = 35; luego 35 + 15 = 50."
  },
  {
    "id": "g5_matematica_8",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity calibra la navegación estelar! ¿Cuánto es 80 − 30 + 12?",
    "options": [
      {
        "text": "62",
        "isCorrect": true
      },
      {
        "text": "61",
        "isCorrect": false
      },
      {
        "text": "64",
        "isCorrect": false
      }
    ],
    "explanation": "80 − 30 = 50; luego 50 + 12 = 62."
  },
  {
    "id": "g5_matematica_9",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity suma la reserva de celdas cuánticas! ¿Cuánto es 54 + 16 − 8?",
    "options": [
      {
        "text": "62",
        "isCorrect": true
      },
      {
        "text": "60",
        "isCorrect": false
      },
      {
        "text": "63",
        "isCorrect": false
      }
    ],
    "explanation": "54 + 16 = 70; luego 70 − 8 = 62."
  },
  {
    "id": "g5_matematica_10",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity compensa el consumo de navegación! ¿Cuánto es 65 − 15 + 20?",
    "options": [
      {
        "text": "70",
        "isCorrect": true
      },
      {
        "text": "68",
        "isCorrect": false
      },
      {
        "text": "72",
        "isCorrect": false
      }
    ],
    "explanation": "65 − 15 = 50; luego 50 + 20 = 70."
  },
  {
    "id": "g5_matematica_11",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity afina los sensores del radar! ¿Cuánto es 38 + 22 − 10?",
    "options": [
      {
        "text": "50",
        "isCorrect": true
      },
      {
        "text": "49",
        "isCorrect": false
      },
      {
        "text": "52",
        "isCorrect": false
      }
    ],
    "explanation": "38 + 22 = 60; luego 60 − 10 = 50."
  },
  {
    "id": "g5_matematica_12",
    "grade": 5,
    "category": "matematica",
    "difficulty": "avanzado",
    "question": "¡Bity programa la velocidad de escape! ¿Cuánto es 75 − 25 + 14?",
    "options": [
      {
        "text": "64",
        "isCorrect": true
      },
      {
        "text": "62",
        "isCorrect": false
      },
      {
        "text": "66",
        "isCorrect": false
      }
    ],
    "explanation": "75 − 25 = 50; luego 50 + 14 = 64."
  }
];

class BityQuestionManager {
  constructor() {
    this.history = [];
    this.maxHistoryPerCategory = 8;
  }

  /**
   * Genera de forma segura una operación matemática adecuada al grado si fuese necesario
   */
  generateSafeMathQuestion(grade = 1) {
    const targetGrade = parseInt(grade) || 1;
    let question = '';
    let answer = 0;
    let distractors = [];
    let explanation = '';

    if (targetGrade === 1) {
      // 1.er Grado: Sumas sencillas con números naturales pequeños (1 al 9)
      const a = Math.floor(Math.random() * 6) + 4; // 4 a 9
      const b = Math.floor(Math.random() * 4) + 2; // 2 a 5
      answer = a + b;
      question = `¡Bity necesita energía! ¿Cuánto es ${a} + ${b}?`;
      explanation = `${a} más ${b} es igual a ${answer}.`;
      distractors = [answer + 1, Math.max(1, answer - 1)];
    } else if (targetGrade === 2) {
      // 2.º Grado: Restas sencillas y sumas fáciles con números pequeños (resultado positivo)
      const isSub = Math.random() > 0.35; // Principalmente restas
      if (isSub) {
        const a = Math.floor(Math.random() * 8) + 12; // 12 a 19
        const b = Math.floor(Math.random() * 5) + 2;  // 2 a 6
        answer = a - b;
        question = `¡Bity calcula su batería! ¿Cuánto es ${a} − ${b}?`;
        explanation = `${a} menos ${b} es igual a ${answer}.`;
      } else {
        const a = Math.floor(Math.random() * 4) + 7; // 7 a 10
        const b = Math.floor(Math.random() * 4) + 4; // 4 a 7
        answer = a + b;
        question = `¡Bity suma dos baterías! ¿Cuánto es ${a} + ${b}?`;
        explanation = `${a} más ${b} es igual a ${answer}.`;
      }
      distractors = [answer + 1, Math.max(1, answer - 1)];
    } else if (targetGrade === 3) {
      // 3.er Grado: Sumas y restas simples con números de hasta dos cifras, resolución mental
      const isSub = Math.random() > 0.5;
      if (isSub) {
        const a = (Math.floor(Math.random() * 3) + 2) * 10 + Math.floor(Math.random() * 6); // 20-25, 30-35, 40-45
        const b = Math.floor(Math.random() * 5) + 4; // 4 a 8
        answer = a - b;
        question = `¡Bity calibra sus sensores! ¿Cuánto es ${a} − ${b}?`;
        explanation = `${a} menos ${b} es igual a ${answer}.`;
      } else {
        const a = Math.floor(Math.random() * 15) + 15; // 15 a 29
        const b = Math.floor(Math.random() * 6) + 3;  // 3 a 8
        answer = a + b;
        question = `¡Bity potencia sus motores! ¿Cuánto es ${a} + ${b}?`;
        explanation = `${a} más ${b} es igual a ${answer}.`;
      }
      distractors = [answer + 2, answer - 2];
    } else if (targetGrade === 4) {
      // 4.º Grado: Operaciones combinadas sencillas de 2 pasos (solo sumas y restas, izq a der, máx 3 números)
      const mode = Math.random() > 0.5 ? 'add_sub' : 'sub_add';
      if (mode === 'add_sub') {
        const a = Math.floor(Math.random() * 15) + 15; // 15 a 29
        const b = Math.floor(Math.random() * 6) + 5;  // 5 a 10
        const c = Math.floor(Math.random() * 4) + 2;  // 2 a 5
        answer = a + b - c;
        question = `¡Bity calibra su energía! ¿Cuánto es ${a} + ${b} − ${c}?`;
        explanation = `${a} + ${b} = ${a + b}; luego ${a + b} − ${c} = ${answer}.`;
      } else {
        const a = (Math.floor(Math.random() * 3) + 2) * 10; // 20, 30, 40
        const b = Math.floor(Math.random() * 5) + 5;        // 5 a 9
        const c = Math.floor(Math.random() * 4) + 3;        // 3 a 6
        answer = a - b + c;
        question = `¡Bity ajusta la telemetría! ¿Cuánto es ${a} − ${b} + ${c}?`;
        explanation = `${a} − ${b} = ${a - b}; luego ${a - b} + ${c} = ${answer}.`;
      }
      distractors = [answer + 2, answer - 2];
    } else {
      // 5.º Grado: Operaciones combinadas sencillas con números de dos cifras (máx 3 números y 2 operaciones)
      const mode = Math.random() > 0.5 ? 'add_sub' : 'sub_add';
      if (mode === 'add_sub') {
        const a = (Math.floor(Math.random() * 4) + 4) * 10 + Math.floor(Math.random() * 6); // 40-45, 50-55, 60-65, 70-75
        const b = (Math.floor(Math.random() * 2) + 1) * 10 + Math.floor(Math.random() * 6); // 10-15, 20-25
        const c = Math.floor(Math.random() * 8) + 5;                                       // 5 a 12
        answer = a + b - c;
        question = `¡Bity optimiza los sistemas de la nave! ¿Cuánto es ${a} + ${b} − ${c}?`;
        explanation = `${a} + ${b} = ${a + b}; luego ${a + b} − ${c} = ${answer}.`;
      } else {
        const a = (Math.floor(Math.random() * 3) + 6) * 10; // 60, 70, 80
        const b = (Math.floor(Math.random() * 2) + 1) * 10 + 5; // 15, 25
        const c = Math.floor(Math.random() * 8) + 5;            // 5 a 12
        answer = a - b + c;
        question = `¡Bity sincroniza la computadora cuántica! ¿Cuánto es ${a} − ${b} + ${c}?`;
        explanation = `${a} − ${b} = ${a - b}; luego ${a - b} + ${c} = ${answer}.`;
      }
      distractors = [answer + 2, answer - 2];
    }

    let d1 = distractors[0];
    let d2 = distractors[1];
    if (d1 === answer) d1 = answer + 1;
    if (d2 === answer || d2 === d1 || d2 < 0) d2 = answer + 3;

    const opts = [
      { text: String(answer), isCorrect: true },
      { text: String(d1), isCorrect: false },
      { text: String(d2), isCorrect: false }
    ];

    return {
      id: `dynamic_math_g${targetGrade}_${Date.now()}_${Math.floor(Math.random()*1000)}`,
      grade: targetGrade,
      category: 'matematica',
      difficulty: targetGrade <= 2 ? 'facil' : (targetGrade <= 4 ? 'medio' : 'avanzado'),
      question: targetGrade === 1 ? question.toUpperCase() : question,
      options: opts,
      explanation: targetGrade === 1 ? explanation.toUpperCase() : explanation
    };
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

    // Normalizar categoría
    const catNorm = category === 'programming' ? 'programacion' : (category === 'math' ? 'matematica' : category);

    // 1. Filtrar preguntas que coincidan con grado y categoría
    const pool = BITY_QUESTION_BANK.filter(q => q.grade === targetGrade && q.category === catNorm);

    if (pool.length === 0) {
      if (catNorm === 'matematica') {
        const dynMath = this.generateSafeMathQuestion(targetGrade);
        return this._formatQuestion(dynMath, isGradeOne);
      }
      const fallback = BITY_QUESTION_BANK.filter(q => q.category === catNorm);
      if (fallback.length === 0) return null;
      return this._formatQuestion(fallback[0], isGradeOne);
    }

    // 2. Filtrar preguntas que no estén en el historial reciente
    let available = pool.filter(q => !this.history.includes(q.id));

    // Si se agotó el banco disponible en el historial, reiniciar el historial de esta categoría
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
   * Formatea una pregunta mezclando las opciones y adaptando el texto a mayúsculas si es 1.er grado.
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
      const rawText = opt.text;
      const text = isGradeOne ? rawText.toUpperCase() : rawText;
      return {
        label: labels[idx],
        text: `${labels[idx]}. ${text}`,
        isCorrect: opt.isCorrect === true
      };
    });

    const formattedQ = isGradeOne ? rawQ.question.toUpperCase() : rawQ.question;
    const formattedExp = isGradeOne && rawQ.explanation ? rawQ.explanation.toUpperCase() : rawQ.explanation;

    return {
      id: rawQ.id,
      grade: rawQ.grade,
      category: rawQ.category,
      difficulty: rawQ.difficulty,
      question: formattedQ,
      options: formattedOptions,
      explanation: formattedExp
    };
  }

  resetHistory() {
    this.history = [];
  }
}

// Exportar globalmente
if (typeof window !== 'undefined') {
  window.BITY_QUESTION_BANK = BITY_QUESTION_BANK;
  window.BityQuestionManager = BityQuestionManager;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BITY_QUESTION_BANK,
    BityQuestionManager
  };
}
