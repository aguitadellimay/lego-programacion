/**
 * platformerQuestions.js - Banco de preguntas pedagógicas y motor de aleatoriedad
 * Desafío final: Instrucciones - Lego Familiar
 *
 * Contenidos estrictamente adaptados a Educación Primaria (1.° a 5.° grado):
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
 * - 5 grados (1.° a 5.° grado)
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
        "text": "Un dibujo de colores para la pantalla.",
        "isCorrect": false
      },
      {
        "text": "Un sonido musical que suena al azar.",
        "isCorrect": false
      }
    ],
    "explanation": "Una instrucción es una orden clara que le dice a una persona, a una computadora o a un robot qué acción realizar."
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
        "text": "Pintar una flor",
        "isCorrect": false
      }
    ],
    "explanation": "«Avanzar 1 paso» le da la orden directa y clara a Bity de moverse hacia el frente."
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
        "text": "Gira en círculos sin parar.",
        "isCorrect": false
      }
    ],
    "explanation": "Al recibir la orden «Saltar», el robot se impulsa verticalmente hacia arriba."
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
        "text": "Para comer galletitas.",
        "isCorrect": false
      },
      {
        "text": "Para cambiar de nombre solo.",
        "isCorrect": false
      }
    ],
    "explanation": "Los robots no saben qué hacer por sí mismos; necesitan instrucciones para guiarse."
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
        "text": "Quedarse quieto para siempre.",
        "isCorrect": false
      },
      {
        "text": "Correr hacia atrás.",
        "isCorrect": false
      }
    ],
    "explanation": "La luz verde peatonal es una señal que nos da la instrucción de cruzar la calle."
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
        "text": "Cualquier cosa linda",
        "isCorrect": false
      },
      {
        "text": "Mañana quizás",
        "isCorrect": false
      }
    ],
    "explanation": "«Girar a la derecha» es una orden precisa con acción y dirección claras."
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
        "text": "Hacia arriba volando.",
        "isCorrect": false
      },
      {
        "text": "Hacia adelante.",
        "isCorrect": false
      }
    ],
    "explanation": "Retroceder significa dar un paso en dirección contraria al frente."
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
        "text": "El lápiz es de color azul.",
        "isCorrect": false
      },
      {
        "text": "El recreo fue divertido.",
        "isCorrect": false
      }
    ],
    "explanation": "«Abrir el cuaderno en la página 5» es una orden que indica qué acción exacta realizar."
  },
  {
    "id": "g1_instrucciones_9",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si Bity está frente a un charco pequeño, ¿qué orden le ayuda a no mojarse?",
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
        "text": "Apagar los ojos",
        "isCorrect": false
      }
    ],
    "explanation": "Saltar permite a Bity superar el obstáculo del charco de forma segura."
  },
  {
    "id": "g1_instrucciones_10",
    "grade": 1,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "¿Qué pasa si le damos a Bity una orden incompleta como «Avanzar» sin decirle cuánto?",
    "options": [
      {
        "text": "Bity no sabe cuántos pasos debe dar.",
        "isCorrect": true
      },
      {
        "text": "Bity adivina perfectamente nuestro pensamiento.",
        "isCorrect": false
      },
      {
        "text": "Bity se transforma en auto.",
        "isCorrect": false
      }
    ],
    "explanation": "Las instrucciones deben ser completas y precisas para que el robot sepa exactamente qué hacer."
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
        "text": "Tirar la batería lejos",
        "isCorrect": false
      },
      {
        "text": "Mirar el cielo",
        "isCorrect": false
      }
    ],
    "explanation": "«Agarrar la batería» es la orden adecuada para recolectar el objeto del piso."
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
        "text": "Corre muy rápido.",
        "isCorrect": false
      },
      {
        "text": "Salta sin parar.",
        "isCorrect": false
      }
    ],
    "explanation": "«Detenerse» le ordena al robot frenar todo movimiento de inmediato."
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
        "text": "Limpiar la pantalla con un paño.",
        "isCorrect": false
      }
    ],
    "explanation": "Programar es enseñarle a una computadora o a un robot qué pasos debe hacer mediante instrucciones."
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
        "text": "El robot decide todo por arte de magia.",
        "isCorrect": false
      },
      {
        "text": "Nadie, Bity lee la mente.",
        "isCorrect": false
      }
    ],
    "explanation": "Bity necesita que un niño o niña lo programe con órdenes claras para poder moverse."
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
        "text": "Sí, piensan y sueñan solas.",
        "isCorrect": false
      },
      {
        "text": "Sí, saben todo sin instrucciones.",
        "isCorrect": false
      }
    ],
    "explanation": "Las computadoras no piensan como nosotros; solo ejecutan las instrucciones que las personas les dan."
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
        "text": "En cualquier orden desordenado.",
        "isCorrect": false
      },
      {
        "text": "Al revés, de abajo hacia arriba siempre.",
        "isCorrect": false
      }
    ],
    "explanation": "Los robots siguen las instrucciones paso por paso en el orden exacto en que fueron programadas."
  },
  {
    "id": "g1_programacion_5",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Qué hace el botón verde con el triángulo «Play» o «Iniciar»?",
    "options": [
      {
        "text": "Comienza a ejecutar las instrucciones que le programamos a Bity.",
        "isCorrect": true
      },
      {
        "text": "Borra todo el juego.",
        "isCorrect": false
      },
      {
        "text": "Apaga la pantalla de la computadora.",
        "isCorrect": false
      }
    ],
    "explanation": "El botón de inicio activa el programa para que Bity empiece a realizar sus órdenes."
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
        "text": "Un solo dibujo de un cohete.",
        "isCorrect": false
      },
      {
        "text": "Ninguna instrucción.",
        "isCorrect": false
      }
    ],
    "explanation": "Para llegar a la meta se necesita una serie ordenada de instrucciones de camino."
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
        "text": "Una persona que solo mira videos sin jugar.",
        "isCorrect": false
      },
      {
        "text": "Un robot que fabrica cables.",
        "isCorrect": false
      }
    ],
    "explanation": "Los programadores son quienes diseñan y escriben las instrucciones para que las máquinas funcionen."
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
        "text": "Esperar que Bity lo adivine solo.",
        "isCorrect": false
      },
      {
        "text": "Gritarle fuerte a la pantalla.",
        "isCorrect": false
      }
    ],
    "explanation": "Para que un robot haga un saludo debemos darle la instrucción precisa de mover su brazo."
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
        "text": "Solamente cuentas aburridas.",
        "isCorrect": false
      },
      {
        "text": "Nada, no sirve para crear cosas.",
        "isCorrect": false
      }
    ],
    "explanation": "La programación nos permite crear videojuegos, cuentos animados y robots útiles."
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
        "text": "La computadora se rompe para siempre.",
        "isCorrect": false
      }
    ],
    "explanation": "El orden de las instrucciones determina el orden en que Bity realiza sus movimientos."
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
        "text": "Sí, camina solo a donde él quiere.",
        "isCorrect": false
      },
      {
        "text": "Sí, habla y canta sin instrucciones.",
        "isCorrect": false
      }
    ],
    "explanation": "Los robots dependen de los programas para saber qué tareas deben realizar."
  },
  {
    "id": "g1_programacion_12",
    "grade": 1,
    "category": "programacion",
    "difficulty": "facil",
    "question": "Después de escribir un programa para Bity, ¿qué hacemos para ver si funciona?",
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
        "text": "Borrarlo inmediatamente sin probarlo.",
        "isCorrect": false
      }
    ],
    "explanation": "Probar el programa nos permite ver si Bity hace lo que le ordenamos o si debemos corregir algo."
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
        "text": "Una máquina que limpia pisos.",
        "isCorrect": false
      },
      {
        "text": "Un número muy grande que no termina.",
        "isCorrect": false
      }
    ],
    "explanation": "Un algoritmo es una serie ordenada de pasos sencillos para completar una tarea con éxito."
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
        "text": "Secarse con la toalla.",
        "isCorrect": false
      },
      {
        "text": "Ponerse los guantes de lana.",
        "isCorrect": false
      }
    ],
    "explanation": "El primer paso para higienizarse las manos es abrir el agua y mojarlas."
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
        "text": "Atarse los cordones.",
        "isCorrect": false
      },
      {
        "text": "Salir a correr al patio.",
        "isCorrect": false
      }
    ],
    "explanation": "En la secuencia correcta, primero se colocan las medias y luego las zapatillas."
  },
  {
    "id": "g1_algoritmos_4",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para armar una torre de 2 bloques Lego: ¿cuál es el primer paso?",
    "options": [
      {
        "text": "Apoyar el primer bloque en la mesa.",
        "isCorrect": true
      },
      {
        "text": "Poner el bloque de arriba flotando en el aire.",
        "isCorrect": false
      },
      {
        "text": "Desarmar la torre terminada.",
        "isCorrect": false
      }
    ],
    "explanation": "Una torre se construye desde la base: primero apoyamos el bloque inferior sobre la superficie."
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
        "text": "Tirar la banana a la basura.",
        "isCorrect": false
      },
      {
        "text": "Morder la cáscara cerrada.",
        "isCorrect": false
      }
    ],
    "explanation": "Para comer una banana se debe pelar la cáscara antes de dar el primer bocado."
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
        "text": "Pintar la sonrisa en el aire.",
        "isCorrect": false
      },
      {
        "text": "Guardar los lápices.",
        "isCorrect": false
      }
    ],
    "explanation": "Primero trazamos el contorno circular de la cara y luego los ojos y la sonrisa adentro."
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
        "text": "Paso 1: Saltar hacia atrás. Paso 2: Dormir.",
        "isCorrect": false
      },
      {
        "text": "Paso 1: Girar sin parar.",
        "isCorrect": false
      }
    ],
    "explanation": "Dos pasos hacia adelante llevan ordenadamente a Bity hacia la bandera."
  },
  {
    "id": "g1_algoritmos_8",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para regar una planta: 1. Tomar la regadera, 2. Echar agua a la tierra... ¿cuál es el paso final?",
    "options": [
      {
        "text": "Guardar la regadera en su lugar.",
        "isCorrect": true
      },
      {
        "text": "Arrancar la planta.",
        "isCorrect": false
      },
      {
        "text": "Mojarse la ropa.",
        "isCorrect": false
      }
    ],
    "explanation": "Al finalizar el riego, se guarda la regadera en su lugar de almacenamiento."
  },
  {
    "id": "g1_algoritmos_9",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "¿Por qué los pasos de un algoritmo deben estar ordenados?",
    "options": [
      {
        "text": "Para que la tarea salga bien y logremos el resultado esperado.",
        "isCorrect": true
      },
      {
        "text": "Para que sea más difícil de hacer.",
        "isCorrect": false
      },
      {
        "text": "Porque a las computadoras les da igual el orden.",
        "isCorrect": false
      }
    ],
    "explanation": "El orden de los pasos garantiza que la tarea se complete sin confusiones ni errores."
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
        "text": "La tarea se completa el doble de rápido.",
        "isCorrect": false
      },
      {
        "text": "No pasa nada, sale perfecto igual.",
        "isCorrect": false
      }
    ],
    "explanation": "Un paso faltante interrumpe la secuencia y la tarea no se puede completar correctamente."
  },
  {
    "id": "g1_algoritmos_11",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para cepillarse los dientes: ¿qué paso va antes de cepillar?",
    "options": [
      {
        "text": "Poner pasta dental en el cepillo.",
        "isCorrect": true
      },
      {
        "text": "Enjuagarse la boca al final.",
        "isCorrect": false
      },
      {
        "text": "Guardar el cepillo seco.",
        "isCorrect": false
      }
    ],
    "explanation": "Antes de cepillarse debemos colocar la pasta sobre las cerdas del cepillo."
  },
  {
    "id": "g1_algoritmos_12",
    "grade": 1,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Si seguimos un algoritmo paso a paso con atención, ¿qué logramos?",
    "options": [
      {
        "text": "Completar la tarea con éxito.",
        "isCorrect": true
      },
      {
        "text": "Perdernos en el camino siempre.",
        "isCorrect": false
      },
      {
        "text": "Que el robot se equivoque.",
        "isCorrect": false
      }
    ],
    "explanation": "Seguir los pasos en orden nos guía directamente a resolver la tarea planteada."
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
        "text": "Porque Bity se cansa si la orden es corta.",
        "isCorrect": false
      },
      {
        "text": "Porque los robots prefieren órdenes misteriosas.",
        "isCorrect": false
      }
    ],
    "explanation": "Un robot requiere instrucciones exactas para poder ejecutar la acción sin desviarse."
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
        "text": "Hacer algo lindo por ahí",
        "isCorrect": false
      },
      {
        "text": "Ir a pasear un rato",
        "isCorrect": false
      }
    ],
    "explanation": "«Avanzar 3 casilleros hacia el frente» tiene una acción concreta, una cantidad y una dirección."
  },
  {
    "id": "g2_instrucciones_3",
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
        "text": "Hacia arriba al techo.",
        "isCorrect": false
      }
    ],
    "explanation": "Girar a la derecha orienta el frente de Bity hacia su costado derecho."
  },
  {
    "id": "g2_instrucciones_4",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "¿Cuál es la diferencia entre un deseo y una instrucción en programación?",
    "options": [
      {
        "text": "El deseo dice lo que esperamos («Ojalá ganes»); la instrucción ordena una acción directa («Avanzar 2»).",
        "isCorrect": true
      },
      {
        "text": "Son exactamente lo mismo.",
        "isCorrect": false
      },
      {
        "text": "La instrucción solo se usa para cocinar.",
        "isCorrect": false
      }
    ],
    "explanation": "Una instrucción le indica una acción concreta a la máquina; un deseo solo expresa una esperanza sin ordenar nada."
  },
  {
    "id": "g2_instrucciones_5",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si un dron de rescate recibe la orden «Descender 2 metros», ¿qué movimiento realiza?",
    "options": [
      {
        "text": "Baja 2 metros hacia el suelo.",
        "isCorrect": true
      },
      {
        "text": "Sube 2 metros hacia las nubes.",
        "isCorrect": false
      },
      {
        "text": "Gira en círculos sin bajar.",
        "isCorrect": false
      }
    ],
    "explanation": "Descender significa moverse hacia abajo en dirección al suelo."
  },
  {
    "id": "g2_instrucciones_6",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si le decimos a Bity «Dar 2 pasos adelante y luego 1 paso atrás», ¿cuántos pasos avanzó en total?",
    "options": [
      {
        "text": "Avanzó 1 paso respecto a su posición inicial.",
        "isCorrect": true
      },
      {
        "text": "Avanzó 3 pasos hacia adelante.",
        "isCorrect": false
      },
      {
        "text": "No se movió nada.",
        "isCorrect": false
      }
    ],
    "explanation": "Dar 2 pasos hacia adelante y retroceder 1 paso deja a Bity a 1 paso de distancia del inicio."
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
        "text": "1. Saltar hacia atrás. 2. Irse sin el bloque.",
        "isCorrect": false
      }
    ],
    "explanation": "Primero hay que posicionarse junto al objeto para luego agacharse y agarrarlo con éxito."
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
        "text": "Mucho después de cruzar la línea.",
        "isCorrect": false
      }
    ],
    "explanation": "La orden establece claramente el punto de frenado al llegar a la línea roja indicada."
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
        "text": "El robot se duplica en dos robots.",
        "isCorrect": false
      },
      {
        "text": "Vuela por el aire con superpoderes.",
        "isCorrect": false
      }
    ],
    "explanation": "Las órdenes deben ser coherentes; un robot no puede moverse en direcciones opuestas simultáneamente."
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
        "text": "Para que Bity descanse una hora.",
        "isCorrect": false
      },
      {
        "text": "Porque las instrucciones se borran solas.",
        "isCorrect": false
      }
    ],
    "explanation": "Verificar cada paso asegura que el robot esté donde esperamos antes de iniciar la siguiente orden."
  },
  {
    "id": "g2_instrucciones_11",
    "grade": 2,
    "category": "instrucciones",
    "difficulty": "facil",
    "question": "Si Bity necesita recorrer 4 casilleros, ¿cuál instrucción cumple esa meta?",
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
    "question": "En un semáforo de autos, la luz roja es una instrucción que significa:",
    "options": [
      {
        "text": "Detener la marcha por completo.",
        "isCorrect": true
      },
      {
        "text": "Acelerar con más fuerza.",
        "isCorrect": false
      },
      {
        "text": "Tocar la bocina y seguir.",
        "isCorrect": false
      }
    ],
    "explanation": "La luz roja es una orden universal de detención vehicular."
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
        "text": "Una película que miramos en la televisión.",
        "isCorrect": false
      },
      {
        "text": "Una caja vacía sin nada adentro.",
        "isCorrect": false
      }
    ],
    "explanation": "Un programa es una secuencia de instrucciones preparadas para que la computadora las ejecute paso a paso."
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
        "text": "Para que nadie las pueda leer.",
        "isCorrect": false
      }
    ],
    "explanation": "El orden de la lista determina exactamente la secuencia de acciones que realizará la máquina."
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
        "text": "Bity se rebeló y no quiere jugar.",
        "isCorrect": false
      },
      {
        "text": "El cohete cambió de planeta solo.",
        "isCorrect": false
      }
    ],
    "explanation": "Los errores en un programa se originan en las instrucciones que les dimos y podemos corregirlos."
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
        "text": "Construye cables de metal con martillo.",
        "isCorrect": false
      },
      {
        "text": "Espera a que el robot aprenda solo sin ayuda.",
        "isCorrect": false
      }
    ],
    "explanation": "Programar un robot consiste en definir las órdenes que controlan sus acciones y su camino."
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
        "text": "Porque la computadora no funciona si no usamos papel.",
        "isCorrect": false
      },
      {
        "text": "Para gastar lápices de colores.",
        "isCorrect": false
      }
    ],
    "explanation": "Planificar previamente evita errores y nos permite ordenar el recorrido de manera lógica."
  },
  {
    "id": "g2_programacion_6",
    "grade": 2,
    "category": "programacion",
    "difficulty": "facil",
    "question": "Si programamos un juego donde Bity salta al presionar un botón, ¿qué le enseñamos a la máquina?",
    "options": [
      {
        "text": "Que cuando alguien toque ese botón, debe ejecutar la instrucción de saltar.",
        "isCorrect": true
      },
      {
        "text": "Que apague la pantalla cuando toquen el botón.",
        "isCorrect": false
      },
      {
        "text": "Que el juego termine de inmediato.",
        "isCorrect": false
      }
    ],
    "explanation": "Programamos una conexión clara: al presionar un botón, se activa una instrucción determinada."
  },
  {
    "id": "g2_programacion_7",
    "grade": 2,
    "category": "programacion",
    "difficulty": "facil",
    "question": "¿Qué significa que un programa se ejecute paso a paso?",
    "options": [
      {
        "text": "Que realiza la primera instrucción, luego la segunda, luego la tercera, en orden.",
        "isCorrect": true
      },
      {
        "text": "Que hace todas las instrucciones al mismo milisegundo a la vez.",
        "isCorrect": false
      },
      {
        "text": "Que elige solo la última instrucción.",
        "isCorrect": false
      }
    ],
    "explanation": "La ejecución secuencial avanza ordenadamente desde el primer paso hasta el último."
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
        "text": "Saltar, girar, retroceder, dormir.",
        "isCorrect": false
      },
      {
        "text": "Tomar moneda sin haberse movido hasta ella.",
        "isCorrect": false
      }
    ],
    "explanation": "Se alterna el avance hasta la moneda con la instrucción de agarrarla para cada una."
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
        "text": "Sí, cambian de idea cuando se aburren.",
        "isCorrect": false
      },
      {
        "text": "Sí, hacen lo que quieren según el clima.",
        "isCorrect": false
      }
    ],
    "explanation": "Las computadoras son máquinas estrictas que siguen las instrucciones sin modificarlas."
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
        "text": "Porque es muy largo y difícil de entender.",
        "isCorrect": false
      }
    ],
    "explanation": "El éxito de un programa se demuestra cuando cumple la misión planificada de forma correcta."
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
    "explanation": "La acción de festejo al llegar a la meta debe ubicarse al concluir el recorrido."
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
        "text": "Memorizar palabras difíciles sin sentido.",
        "isCorrect": false
      }
    ],
    "explanation": "La programación estimula el pensamiento lógico y la resolución metódica de desafíos."
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
        "text": "Un botón roto, un dibujo y una pausa.",
        "isCorrect": false
      },
      {
        "text": "Empezar por el final y terminar en el inicio.",
        "isCorrect": false
      }
    ],
    "explanation": "Todo algoritmo comienza en un estado inicial, ejecuta pasos ordenados y alcanza una solución."
  },
  {
    "id": "g2_algoritmos_2",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Algoritmo para cruzar la calle: 1. Llegar a la esquina, 2. Mirar el semáforo... ¿cuál es el paso 3?",
    "options": [
      {
        "text": "Cruzar cuando esté en verde para peatones.",
        "isCorrect": true
      },
      {
        "text": "Cerrar los ojos y cruzar corriendo.",
        "isCorrect": false
      },
      {
        "text": "Regresar a casa sin cruzar.",
        "isCorrect": false
      }
    ],
    "explanation": "Una vez verificado el semáforo verde, el siguiente paso seguro es cruzar."
  },
  {
    "id": "g2_algoritmos_3",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Si un algoritmo para preparar chocolatada mezcla con la cuchara antes de poner la leche, ¿qué sucede?",
    "options": [
      {
        "text": "El orden de los pasos es incorrecto; primero debemos servir la leche.",
        "isCorrect": true
      },
      {
        "text": "La chocolatada queda más rica.",
        "isCorrect": false
      },
      {
        "text": "No cambia nada, la leche aparece sola.",
        "isCorrect": false
      }
    ],
    "explanation": "No podemos revolver un líquido que todavía no se sirvió en el vaso; el orden es fundamental."
  },
  {
    "id": "g2_algoritmos_4",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Bity sigue este algoritmo: «Avanzar 2 pasos, Girar a la derecha, Avanzar 1 paso». ¿Cuántos pasos caminó?",
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
    "explanation": "Dio 2 pasos al inicio y 1 paso después de girar: 2 + 1 = 3 pasos."
  },
  {
    "id": "g2_algoritmos_5",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para guardar los útiles en la cartuchera: ¿cuál de estas acciones NO pertenece a ese algoritmo?",
    "options": [
      {
        "text": "Regar una planta del jardín con agua.",
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
    "explanation": "Regar una planta es una acción ajena a la tarea de guardar útiles escolares."
  },
  {
    "id": "g2_algoritmos_6",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "¿Por qué una receta de cocina es un ejemplo claro de algoritmo?",
    "options": [
      {
        "text": "Porque tiene una lista de ingredientes y pasos ordenados para preparar una comida.",
        "isCorrect": true
      },
      {
        "text": "Porque las comidas se preparan sin ninguna orden.",
        "isCorrect": false
      },
      {
        "text": "Porque la cocina usa computadoras gigantes.",
        "isCorrect": false
      }
    ],
    "explanation": "Una receta detalla los pasos secuenciales necesarios para cocinar un plato con éxito."
  },
  {
    "id": "g2_algoritmos_7",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para enviar una carta: 1. Escribir la carta, 2. Meterla en el sobre... ¿cuál es el paso siguiente?",
    "options": [
      {
        "text": "Cerrar el sobre y poner la dirección.",
        "isCorrect": true
      },
      {
        "text": "Romper el sobre en pedacitos.",
        "isCorrect": false
      },
      {
        "text": "Escribir la carta de nuevo adentro del sobre cerrado.",
        "isCorrect": false
      }
    ],
    "explanation": "Después de colocar la carta adentro, se sella el sobre y se indica el destinatario."
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
        "text": "Se queda nadando en el charco.",
        "isCorrect": false
      },
      {
        "text": "Da la vuelta y se va al inicio.",
        "isCorrect": false
      }
    ],
    "explanation": "El algoritmo le indica una acción concreta de salto para evitar mojarse."
  },
  {
    "id": "g2_algoritmos_9",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "¿Qué significa que un algoritmo sea eficiente para Bity?",
    "options": [
      {
        "text": "Que resuelve la tarea de forma clara y sin dar vueltas innecesarias.",
        "isCorrect": true
      },
      {
        "text": "Que tarda horas en moverse un solo metro.",
        "isCorrect": false
      },
      {
        "text": "Que tiene cien pasos que no sirven para nada.",
        "isCorrect": false
      }
    ],
    "explanation": "Un algoritmo eficiente alcanza la solución con la menor cantidad de pasos necesarios."
  },
  {
    "id": "g2_algoritmos_10",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Para apagar una lámpara: 1. Acercarse al interruptor, 2. Presionar el botón... ¿cuál es el resultado?",
    "options": [
      {
        "text": "La lámpara se apaga.",
        "isCorrect": true
      },
      {
        "text": "La lámpara se rompe.",
        "isCorrect": false
      },
      {
        "text": "La lámpara cambia de habitación.",
        "isCorrect": false
      }
    ],
    "explanation": "Presionar el interruptor de apagado corta la luz y logra el objetivo del algoritmo."
  },
  {
    "id": "g2_algoritmos_11",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Si cambiamos el orden de los pasos en el algoritmo para ponerse los zapatos, ¿qué problema puede haber?",
    "options": [
      {
        "text": "Podríamos intentar ponernos los zapatos antes que las medias.",
        "isCorrect": true
      },
      {
        "text": "Los zapatos cambian de color solos.",
        "isCorrect": false
      },
      {
        "text": "La puerta de casa se abre sola.",
        "isCorrect": false
      }
    ],
    "explanation": "El orden lógico es poner primero las medias y luego el calzado por encima."
  },
  {
    "id": "g2_algoritmos_12",
    "grade": 2,
    "category": "algoritmos",
    "difficulty": "facil",
    "question": "Cuando un algoritmo se ejecuta correctamente de principio a fin, ¿qué logramos?",
    "options": [
      {
        "text": "Alcanzar la meta o solución que buscábamos.",
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
    "explanation": "Un algoritmo bien diseñado resuelve completamente la tarea que motivó su creación."
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
    "question": "Bity tiene la secuencia: 1. Caminar a la puerta, 2. Entrar a la nave. ¿Qué instrucción falta en el medio?",
    "options": [
      {
        "text": "Abrir la puerta",
        "isCorrect": true
      },
      {
        "text": "Pintar la nave de rojo",
        "isCorrect": false
      },
      {
        "text": "Apagar las luces de la ciudad",
        "isCorrect": false
      }
    ],
    "explanation": "Para entrar a la nave, antes de pasar por la abertura es indispensable abrir la puerta."
  },
  {
    "id": "g3_instrucciones_2",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Para guardar un juguete en una caja con tapa: ¿cuál instrucción está fuera de lugar si la ponemos al inicio?",
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
        "text": "Levantar el juguete",
        "isCorrect": false
      }
    ],
    "explanation": "No podemos cerrar la tapa antes de haber guardado el juguete adentro de la caja."
  },
  {
    "id": "g3_instrucciones_3",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Bity recibe estas instrucciones: 1. Avanzar 2 pasos, 2. Tomar la llave, 3. Abrir el cofre. Si falta el paso 2, ¿qué pasa?",
    "options": [
      {
        "text": "Bity no puede abrir el cofre porque no tiene la llave en sus manos.",
        "isCorrect": true
      },
      {
        "text": "El cofre se abre solo por arte de magia.",
        "isCorrect": false
      },
      {
        "text": "Bity vuela por el cielo.",
        "isCorrect": false
      }
    ],
    "explanation": "Sin la llave que se obtenía en el paso 2, el cofre permanece cerrado."
  },
  {
    "id": "g3_instrucciones_4",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Para lavarse los dientes: 1. Poner pasta, 2. Cepillarse, 3. Enjuagarse. ¿Qué instrucción está fuera de lugar si va al final?",
    "options": [
      {
        "text": "Poner pasta en el cepillo cuando ya nos enjuagamos.",
        "isCorrect": true
      },
      {
        "text": "Enjuagarse la boca.",
        "isCorrect": false
      },
      {
        "text": "Guardar el cepillo limpio.",
        "isCorrect": false
      }
    ],
    "explanation": "La pasta dental se coloca al comienzo del cepillado, nunca después de terminar."
  },
  {
    "id": "g3_instrucciones_5",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si la meta de Bity está a 3 pasos y la orden dice «Avanzar 1 paso», ¿qué instrucción falta para llegar?",
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
        "text": "Girar en círculos sin avanzar.",
        "isCorrect": false
      }
    ],
    "explanation": "Para completar los 3 pasos necesarios se requiere sumar una orden de 2 pasos adicionales."
  },
  {
    "id": "g3_instrucciones_6",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Bity debe saltar un pozo: 1. Correr hacia el pozo, 2. Aterrizar del otro lado. ¿Qué instrucción crucial falta?",
    "options": [
      {
        "text": "Saltar con fuerza justo antes del pozo.",
        "isCorrect": true
      },
      {
        "text": "Sentarse dentro del pozo.",
        "isCorrect": false
      },
      {
        "text": "Cerrar los ojos y caminar hacia abajo.",
        "isCorrect": false
      }
    ],
    "explanation": "El impulso del salto es el paso indispensable para elevarse sobre el pozo."
  },
  {
    "id": "g3_instrucciones_7",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "En una lista de instrucciones, ¿por qué cada orden debe estar en su posición exacta?",
    "options": [
      {
        "text": "Porque si una orden se ejecuta antes de tiempo, la acción puede fallar.",
        "isCorrect": true
      },
      {
        "text": "Porque a los robots les gusta leer trabalenguas.",
        "isCorrect": false
      },
      {
        "text": "No importa el orden, todo sale igual.",
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
    "question": "Bity quiere pintar una pared: 1. Mojar el pincel en la pintura, 2. Pasar el pincel por la pared. ¿Qué orden falta al terminar?",
    "options": [
      {
        "text": "Limpiar y guardar el pincel.",
        "isCorrect": true
      },
      {
        "text": "Tirar la pintura al suelo.",
        "isCorrect": false
      },
      {
        "text": "Romper la pared.",
        "isCorrect": false
      }
    ],
    "explanation": "Al concluir la tarea de pintar, la instrucción de cierre adecuada es limpiar los utensilios."
  },
  {
    "id": "g3_instrucciones_9",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si un robot debe cruzar un puente levadizo: ¿qué instrucción debe verificar antes de cruzar?",
    "options": [
      {
        "text": "Comprobar que el puente esté bajo y seguro.",
        "isCorrect": true
      },
      {
        "text": "Comprobar que sea de noche.",
        "isCorrect": false
      },
      {
        "text": "Girar 5 veces sobre sí mismo.",
        "isCorrect": false
      }
    ],
    "explanation": "Verificar que el puente esté apoyado previene que el robot caiga al vacío."
  },
  {
    "id": "g3_instrucciones_10",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Tenemos la secuencia: 1. Abrir la heladera, 2. Sacar la manzana, 3. ¿...?, 4. Comer la manzana. ¿Cuál es el paso 3?",
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
        "text": "Pintar la manzana de azul.",
        "isCorrect": false
      }
    ],
    "explanation": "Antes de ingerir la fruta fresca, el paso higiénico correcto es lavarla."
  },
  {
    "id": "g3_instrucciones_11",
    "grade": 3,
    "category": "instrucciones",
    "difficulty": "medio",
    "question": "Si Bity debe girar hacia el cohete que está a su izquierda, pero la orden dice «Girar a la derecha», ¿qué error hay?",
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
    "explanation": "El sentido de giro indicado es opuesto al que conduce hacia el cohete."
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
        "text": "Sacar las pilas y guardarlas.",
        "isCorrect": false
      },
      {
        "text": "Tapar la linterna con cinta negra.",
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
        "text": "Poner todas las órdenes mezcladas sin orden.",
        "isCorrect": false
      }
    ],
    "explanation": "Para saludar al llegar al destino, la acción de saludo debe ir luego de los pasos de avance."
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
        "text": "Le pide a Bity que haga magia.",
        "isCorrect": false
      }
    ],
    "explanation": "La corrección metódica consiste en inspeccionar las órdenes y reemplazar la que produce la falla."
  },
  {
    "id": "g3_programacion_4",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si un programa tiene la instrucción «Avanzar 5 pasos» pero Bity choca en el paso 3, ¿cómo lo arreglamos?",
    "options": [
      {
        "text": "Cambiamos la instrucción por «Avanzar 2 pasos» y luego girar para esquivar el obstáculo.",
        "isCorrect": true
      },
      {
        "text": "Le decimos que avance 10 pasos con más fuerza.",
        "isCorrect": false
      },
      {
        "text": "Dejamos el programa igual.",
        "isCorrect": false
      }
    ],
    "explanation": "Ajustar la cantidad de pasos antes del obstáculo evita la colisión y permite rodearlo."
  },
  {
    "id": "g3_programacion_5",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Por qué programar es como escribir una receta o un instructivo para un robot?",
    "options": [
      {
        "text": "Porque le damos el paso a paso exacto que debe seguir para lograr un resultado.",
        "isCorrect": true
      },
      {
        "text": "Porque a los robots les gusta cocinar pasteles.",
        "isCorrect": false
      },
      {
        "text": "Porque los programas solo sirven para comer.",
        "isCorrect": false
      }
    ],
    "explanation": "Ambos son guías ordenadas de pasos diseñadas para que alguien ejecute una tarea con éxito."
  },
  {
    "id": "g3_programacion_6",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si ejecutamos el mismo programa diez veces con las mismas instrucciones, ¿qué hará Bity?",
    "options": [
      {
        "text": "Hará exactamente el mismo recorrido las diez veces.",
        "isCorrect": true
      },
      {
        "text": "Hará diez recorridos totalmente diferentes cada vez.",
        "isCorrect": false
      },
      {
        "text": "Se olvidará de las órdenes en el segundo intento.",
        "isCorrect": false
      }
    ],
    "explanation": "Los programas son precisos y repetibles: mismas instrucciones producen siempre el mismo resultado."
  },
  {
    "id": "g3_programacion_7",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué ventaja tiene probar nuestro programa por partes antes de probarlo completo?",
    "options": [
      {
        "text": "Nos permite verificar que los primeros pasos funcionen bien antes de sumar más instrucciones.",
        "isCorrect": true
      },
      {
        "text": "Ninguna, es mejor escribir cien pasos sin mirar.",
        "isCorrect": false
      },
      {
        "text": "Hace que el robot camine más lento.",
        "isCorrect": false
      }
    ],
    "explanation": "Probar tramos cortos permite aislar errores y construir soluciones sólidas paso a paso."
  },
  {
    "id": "g3_programacion_8",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Para programar a Bity para que recoja 3 baterías en fila: ¿cuál es la forma correcta?",
    "options": [
      {
        "text": "Avanzar hasta cada batería y ordenar recogerla una por una hasta completar las 3.",
        "isCorrect": true
      },
      {
        "text": "Ordenar recoger las 3 baterías desde lejos sin moverse.",
        "isCorrect": false
      },
      {
        "text": "Saltar en el lugar sin avanzar.",
        "isCorrect": false
      }
    ],
    "explanation": "Cada objeto debe alcanzarse físicamente antes de ejecutar la acción de recolección."
  },
  {
    "id": "g3_programacion_9",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué sucede si olvidamos incluir la instrucción de inicio en nuestro programa?",
    "options": [
      {
        "text": "El robot no sabrá cuándo comenzar y se quedará esperando la orden.",
        "isCorrect": true
      },
      {
        "text": "El robot comienza a correr solo sin parar.",
        "isCorrect": false
      },
      {
        "text": "La computadora se apaga de golpe.",
        "isCorrect": false
      }
    ],
    "explanation": "La señal de inicio es el disparador indispensable para que el robot empiece a ejecutar el programa."
  },
  {
    "id": "g3_programacion_10",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Cuál es el rol de quien programa frente a la máquina?",
    "options": [
      {
        "text": "Es la persona que piensa la solución y le da las órdenes precisas a la máquina.",
        "isCorrect": true
      },
      {
        "text": "Es un espectador que no puede decidir nada.",
        "isCorrect": false
      },
      {
        "text": "Es alguien que solo limpia el teclado.",
        "isCorrect": false
      }
    ],
    "explanation": "El ser humano aporta la inteligencia y la planificación que guían a la máquina."
  },
  {
    "id": "g3_programacion_11",
    "grade": 3,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si queremos que Bity vuelva a su posición de inicio, ¿qué debemos programar?",
    "options": [
      {
        "text": "Las instrucciones de retroceso o giro necesarias para regresar al punto de partida.",
        "isCorrect": true
      },
      {
        "text": "Una orden para que desaparezca la pantalla.",
        "isCorrect": false
      },
      {
        "text": "Nada, los robots vuelven solos volando.",
        "isCorrect": false
      }
    ],
    "explanation": "El regreso requiere instrucciones ordenadas de vuelta o giro hacia el punto de origen."
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
        "text": "Borrar todo el trabajo para empezar de cero.",
        "isCorrect": false
      },
      {
        "text": "Hacer que el programa sea imposible de entender.",
        "isCorrect": false
      }
    ],
    "explanation": "El trabajo colaborativo permite detectar pasos faltantes o desordenados más rápidamente."
  },
  {
    "id": "g3_algoritmos_1",
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
    "id": "g3_algoritmos_2",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Para preparar una tostada con manteca: 1. Tostar el pan, 2. Untar la manteca. ¿Qué pasaría si invertimos el orden?",
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
    "id": "g3_algoritmos_3",
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
        "text": "Bity atraviesa el metal como un fantasma.",
        "isCorrect": false
      }
    ],
    "explanation": "Sin abrir el acceso a la cabina, Bity no puede abordar el cohete."
  },
  {
    "id": "g3_algoritmos_4",
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
    "id": "g3_algoritmos_5",
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
    "id": "g3_algoritmos_6",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Por qué decimos que un algoritmo tiene un número finito de pasos?",
    "options": [
      {
        "text": "Porque debe tener un final claro para resolver el problema y no seguir para siempre.",
        "isCorrect": true
      },
      {
        "text": "Porque los pasos no se pueden contar.",
        "isCorrect": false
      },
      {
        "text": "Porque nunca debe terminar de ejecutarse.",
        "isCorrect": false
      }
    ],
    "explanation": "Un algoritmo útil debe concluir al alcanzar la solución buscada."
  },
  {
    "id": "g3_algoritmos_7",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Algoritmo para pintar un cuadro: 1. Preparar la tela, 2. Dibujar las formas, 3. Pintar con colores. ¿Cuál es el paso 1?",
    "options": [
      {
        "text": "Preparar la tela donde se va a pintar.",
        "isCorrect": true
      },
      {
        "text": "Colgar el cuadro terminado en la pared.",
        "isCorrect": false
      },
      {
        "text": "Pintar con colores directamente en el aire.",
        "isCorrect": false
      }
    ],
    "explanation": "Toda obra comienza preparando la superficie base de trabajo."
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
        "text": "Chocar contra todas las paredes posibles.",
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
    "question": "Si un algoritmo tiene un paso repetido innecesariamente, como «Girar a la derecha 4 veces seguidas»: ¿qué hace?",
    "options": [
      {
        "text": "Da una vuelta completa y queda mirando al mismo lugar donde ya estaba.",
        "isCorrect": true
      },
      {
        "text": "Avanza 10 kilómetros hacia adelante.",
        "isCorrect": false
      },
      {
        "text": "Se apaga para siempre.",
        "isCorrect": false
      }
    ],
    "explanation": "Cuatro giros de 90° devuelven al robot exactamente a su orientación original."
  },
  {
    "id": "g3_algoritmos_12",
    "grade": 3,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Por qué es útil compartir nuestro algoritmo con un compañero para que lo lea?",
    "options": [
      {
        "text": "Para que compruebe si los pasos son claros y fáciles de seguir sin confusiones.",
        "isCorrect": true
      },
      {
        "text": "Para que nadie más pueda resolver la tarea.",
        "isCorrect": false
      },
      {
        "text": "Porque los algoritmos son secretos que no se leen.",
        "isCorrect": false
      }
    ],
    "explanation": "Un segundo lector ayuda a comprobar si las instrucciones son claras y comprensibles."
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
    "question": "¿Por qué decimos que una computadora no interpreta «intenciones» y solo lee instrucciones?",
    "options": [
      {
        "text": "Porque no puede adivinar lo que querías hacer; ejecuta únicamente lo que le ordenaste al pie de la letra.",
        "isCorrect": true
      },
      {
        "text": "Porque las computadoras prefieren hacer lo contrario de lo que les pedimos.",
        "isCorrect": false
      },
      {
        "text": "Porque las computadoras leen las mentes de los niños.",
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
        "text": "Dejar «Avanzar 2 casilleros» y esperar que Bity vuele.",
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
        "text": "Porque en el mundo real y en la programación se necesitan las herramientas antes de usarlas.",
        "isCorrect": true
      },
      {
        "text": "Porque los cofres se enojan si no los saludas primero.",
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
    "question": "Si queremos que Bity se detenga exactamente en la meta, ¿qué instrucción debe cerrar la secuencia de movimiento?",
    "options": [
      {
        "text": "La instrucción de detenerse o finalizar la misión.",
        "isCorrect": true
      },
      {
        "text": "Una instrucción para seguir corriendo sin control.",
        "isCorrect": false
      },
      {
        "text": "Una orden para volver al inicio sin frenar.",
        "isCorrect": false
      }
    ],
    "explanation": "Una orden de detención sella el cumplimiento exitoso del objetivo."
  },
  {
    "id": "g4_programacion_1",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Por qué es importante que un programa sea fácil de leer para otras personas?",
    "options": [
      {
        "text": "Para que otros programadores o compañeros puedan entender cómo funciona y ayudar a mejorarlo.",
        "isCorrect": true
      },
      {
        "text": "Para que la computadora trabaje el doble de rápido.",
        "isCorrect": false
      },
      {
        "text": "No importa, los programas solo los entiende una sola persona.",
        "isCorrect": false
      }
    ],
    "explanation": "La claridad en el código facilita el trabajo colaborativo y la corrección de errores."
  },
  {
    "id": "g4_programacion_2",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si Bity ejecuta un programa y se choca contra una pared en el paso 4, ¿cómo encontramos el error?",
    "options": [
      {
        "text": "Miramos qué orden pusimos en el paso 4 y la cambiamos por una dirección libre.",
        "isCorrect": true
      },
      {
        "text": "Cambiamos todas las órdenes del paso 1 al 10 al azar sin mirar.",
        "isCorrect": false
      },
      {
        "text": "Rompemos el teclado de la computadora.",
        "isCorrect": false
      }
    ],
    "explanation": "Localizar el paso exacto de la falla permite corregir puntualmente la instrucción equivocada."
  },
  {
    "id": "g4_programacion_3",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Al programar una misión de Bity, ¿qué significa descomponer la tarea en partes más pequeñas?",
    "options": [
      {
        "text": "Dividir el recorrido grande en pasos simples: primero llegar a la esquina, luego girar, luego alcanzar la meta.",
        "isCorrect": true
      },
      {
        "text": "Romper el robot en partes de plástico.",
        "isCorrect": false
      },
      {
        "text": "Hacer todo de golpe sin pensar en los pasos.",
        "isCorrect": false
      }
    ],
    "explanation": "Descomponer un problema complejo en metas intermedias facilita encontrar la solución."
  },
  {
    "id": "g4_programacion_4",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué diferencia hay entre una persona que usa un videojuego y la persona que lo programa?",
    "options": [
      {
        "text": "Quien lo usa juega con las reglas creadas; quien lo programa diseña las reglas y las instrucciones del juego.",
        "isCorrect": true
      },
      {
        "text": "No hay ninguna diferencia, hacen exactamente lo mismo.",
        "isCorrect": false
      },
      {
        "text": "Quien programa solo compra los controles.",
        "isCorrect": false
      }
    ],
    "explanation": "El programador es el creador de la lógica, desafíos y movimientos del juego."
  },
  {
    "id": "g4_programacion_5",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si un programa tiene dos caminos para que Bity elija: Camino con puente seguro vs Camino con foso de fuego. ¿Cuál programamos?",
    "options": [
      {
        "text": "Programamos las instrucciones para que Bity cruce por el puente seguro.",
        "isCorrect": true
      },
      {
        "text": "Programamos que salte directo al foso de fuego.",
        "isCorrect": false
      },
      {
        "text": "No programamos nada y dejamos que choque.",
        "isCorrect": false
      }
    ],
    "explanation": "La programación debe buscar la ruta que preserve la integridad del robot."
  },
  {
    "id": "g4_programacion_6",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Por qué repetimos las pruebas de un programa varias veces antes de darlo por terminado?",
    "options": [
      {
        "text": "Para comprobar que las instrucciones funcionen bien en todas las situaciones de la misión.",
        "isCorrect": true
      },
      {
        "text": "Porque la computadora se olvida de las órdenes a los cinco minutos.",
        "isCorrect": false
      },
      {
        "text": "Para que Bity cambie de color.",
        "isCorrect": false
      }
    ],
    "explanation": "Las pruebas reiteradas aseguran que no haya fallas ocultas en diferentes escenarios."
  },
  {
    "id": "g4_programacion_7",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si programamos un robot para regar las plantas del jardín, ¿qué instrucciones básicas debe tener?",
    "options": [
      {
        "text": "Moverse hacia las plantas, abrir el agua de riego sobre la tierra y cerrar el agua al terminar.",
        "isCorrect": true
      },
      {
        "text": "Cortar las flores con tijera y tirarlas.",
        "isCorrect": false
      },
      {
        "text": "Quedarse adentro de la casa sin salir.",
        "isCorrect": false
      }
    ],
    "explanation": "Las instrucciones deben corresponder al ciclo completo de la tarea encomendada."
  },
  {
    "id": "g4_programacion_8",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué hace que un programa de instrucciones sea ordenado?",
    "options": [
      {
        "text": "Que cada paso tenga un propósito claro y que conduzca directamente a cumplir la misión.",
        "isCorrect": true
      },
      {
        "text": "Que tenga órdenes confusas y caminos que no llevan a ningún lado.",
        "isCorrect": false
      },
      {
        "text": "Que sea tan largo que nadie lo entienda.",
        "isCorrect": false
      }
    ],
    "explanation": "Un buen programa es directo, coherente y carece de instrucciones superfluas."
  },
  {
    "id": "g4_programacion_9",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si un compañero mira nuestro programa y nos dice: «En el paso 3 Bity gira al lado contrario», ¿qué hacemos?",
    "options": [
      {
        "text": "Agradecemos la ayuda, verificamos la instrucción y la corregimos hacia el lado correcto.",
        "isCorrect": true
      },
      {
        "text": "Nos enojamos y borramos todo el programa.",
        "isCorrect": false
      },
      {
        "text": "Dejamos el error a propósito.",
        "isCorrect": false
      }
    ],
    "explanation": "La retroalimentación entre pares ayuda a detectar y reparar desvíos en el código."
  },
  {
    "id": "g4_programacion_10",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "¿Qué logramos cuando programamos a Bity con instrucciones precisas?",
    "options": [
      {
        "text": "Que complete la misión en el menor tiempo y sin errores en el camino.",
        "isCorrect": true
      },
      {
        "text": "Que el juego se vuelva aburrido e imposible de jugar.",
        "isCorrect": false
      },
      {
        "text": "Que Bity se pierda en el espacio exterior.",
        "isCorrect": false
      }
    ],
    "explanation": "La precisión en las órdenes se traduce en recorridos limpios y victorias rápidas."
  },
  {
    "id": "g4_programacion_11",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "Si queremos que Bity encienda sus turbinas antes de despegar, ¿dónde va esa orden?",
    "options": [
      {
        "text": "Justo antes de la instrucción de despegar hacia el cielo.",
        "isCorrect": true
      },
      {
        "text": "Después de que el cohete ya llegó al espacio.",
        "isCorrect": false
      },
      {
        "text": "Al inicio cuando Bity recién sale de su casa.",
        "isCorrect": false
      }
    ],
    "explanation": "Los motores deben entrar en funcionamiento previo al momento de elevarse."
  },
  {
    "id": "g4_programacion_12",
    "grade": 4,
    "category": "programacion",
    "difficulty": "medio",
    "question": "La programación nos enseña que cuando algo no sale a la primera:",
    "options": [
      {
        "text": "Podemos revisar las instrucciones paso a paso, encontrar la falla y aprender a corregirla.",
        "isCorrect": true
      },
      {
        "text": "Debemos darnos por vencidos de inmediato.",
        "isCorrect": false
      },
      {
        "text": "La computadora nunca tiene solución.",
        "isCorrect": false
      }
    ],
    "explanation": "El ensayo y la corrección son partes naturales del aprendizaje computacional."
  },
  {
    "id": "g4_algoritmos_1",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Qué es un algoritmo en la vida diaria?",
    "options": [
      {
        "text": "Un método ordenado paso a paso para resolver un problema cotidiano o realizar una tarea.",
        "isCorrect": true
      },
      {
        "text": "Una máquina que habla sola.",
        "isCorrect": false
      },
      {
        "text": "Un dibujo mágico que no necesita pasos.",
        "isCorrect": false
      }
    ],
    "explanation": "Cualquier procedimiento estructurado para resolver una tarea cotidiana es un algoritmo."
  },
  {
    "id": "g4_algoritmos_2",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Para preparar una ensalada de frutas: ¿cuál es la mejor manera de organizar los pasos?",
    "options": [
      {
        "text": "1. Lavar las frutas. 2. Pelarlas y cortarlas. 3. Colocarlas en un bol y mezclar.",
        "isCorrect": true
      },
      {
        "text": "1. Comer la fruta sin cortar ni lavar. 2. Lavar los platos vacíos.",
        "isCorrect": false
      },
      {
        "text": "1. Mezclar un bol vacío. 2. Comprar las frutas mañana.",
        "isCorrect": false
      }
    ],
    "explanation": "La preparación higiénica exige lavar primero, luego procesar las frutas y finalmente mezclarlas."
  },
  {
    "id": "g4_algoritmos_3",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Si tenemos dos algoritmos para llegar a la biblioteca: Algoritmo 1 (recorre 2 cuadras directas) y Algoritmo 2 (da una vuelta de 6 cuadras). ¿Cuál es más conveniente?",
    "options": [
      {
        "text": "El Algoritmo 1, porque llega a la meta de forma más directa y sin rodeos innecesarios.",
        "isCorrect": true
      },
      {
        "text": "El Algoritmo 2, porque mientras más caminemos en círculos es mejor.",
        "isCorrect": false
      },
      {
        "text": "Ninguno, no se puede caminar por cuadras.",
        "isCorrect": false
      }
    ],
    "explanation": "La ruta de 2 cuadras ahorra energía y tiempo al evitar desvíos."
  },
  {
    "id": "g4_algoritmos_4",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Si un algoritmo tiene un paso repetido como «Avanzar 1, Retroceder 1, Avanzar 1, Retroceder 1» sin avanzar nada, ¿qué debemos hacer?",
    "options": [
      {
        "text": "Eliminar esos pasos que no aportan nada para que el algoritmo sea más claro y directo.",
        "isCorrect": true
      },
      {
        "text": "Dejarlos y agregar diez pasos más iguales.",
        "isCorrect": false
      },
      {
        "text": "Apagar el robot para que no camine.",
        "isCorrect": false
      }
    ],
    "explanation": "Eliminar acciones neutralizadas simplifica el algoritmo sin alterar el resultado."
  },
  {
    "id": "g4_algoritmos_5",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Por qué un algoritmo debe ser comprensible para cualquier persona que lo lea?",
    "options": [
      {
        "text": "Porque cualquier persona debe ser capaz de seguir los mismos pasos y obtener el mismo resultado.",
        "isCorrect": true
      },
      {
        "text": "Porque los algoritmos deben ser difíciles para que nadie los use.",
        "isCorrect": false
      },
      {
        "text": "Para que cada persona haga algo totalmente distinto.",
        "isCorrect": false
      }
    ],
    "explanation": "La claridad permite que cualquiera reproduzca el procedimiento con el mismo éxito."
  },
  {
    "id": "g4_algoritmos_6",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Para armar un rompecabezas: ¿cuál es una buena estrategia algorítmica inicial?",
    "options": [
      {
        "text": "Separar primero las piezas de los bordes y las esquinas para armar el marco.",
        "isCorrect": true
      },
      {
        "text": "Tirar todas las piezas al piso con los ojos cerrados.",
        "isCorrect": false
      },
      {
        "text": "Romper las piezas para que encajen a la fuerza.",
        "isCorrect": false
      }
    ],
    "explanation": "Armar el perímetro delimita el espacio y facilita ubicar las piezas interiores."
  },
  {
    "id": "g4_algoritmos_7",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Si un algoritmo para hacer compras olvida el paso de «Pagar en la caja antes de salir», ¿qué error tiene?",
    "options": [
      {
        "text": "Le falta un paso fundamental para que la tarea sea correcta y legal.",
        "isCorrect": true
      },
      {
        "text": "El algoritmo es perfecto porque ahorra dinero.",
        "isCorrect": false
      },
      {
        "text": "No le falta nada, los productos son gratis.",
        "isCorrect": false
      }
    ],
    "explanation": "Un paso esencial omitido invalida la correcta finalización del proceso."
  },
  {
    "id": "g4_algoritmos_8",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Qué significa que los pasos de un algoritmo no deben ser contradictorios?",
    "options": [
      {
        "text": "Que una orden no puede pedir hacer lo contrario de lo que pide la orden anterior sin una razón lógica.",
        "isCorrect": true
      },
      {
        "text": "Que todas las palabras deben rimar como una poesía.",
        "isCorrect": false
      },
      {
        "text": "Que no se pueden usar números.",
        "isCorrect": false
      }
    ],
    "explanation": "La coherencia de objetivos evita instrucciones que se anulen o bloqueen entre sí."
  },
  {
    "id": "g4_algoritmos_9",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Bity sigue este algoritmo: 1. Ir al árbol, 2. Tomar la manzana caída, 3. Volver al cohete. ¿Cuál es el objetivo final?",
    "options": [
      {
        "text": "Llevar la manzana al cohete de Bity.",
        "isCorrect": true
      },
      {
        "text": "Cortar el árbol de manzanas.",
        "isCorrect": false
      },
      {
        "text": "Perderse en el bosque para siempre.",
        "isCorrect": false
      }
    ],
    "explanation": "El algoritmo traslada el fruto recolectado hacia la nave espacial."
  },
  {
    "id": "g4_algoritmos_10",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "¿Por qué es importante que un algoritmo tenga un paso final bien definido?",
    "options": [
      {
        "text": "Para saber en qué momento la tarea ha concluido exitosamente.",
        "isCorrect": true
      },
      {
        "text": "Para que el robot siga trabajando sin parar nunca.",
        "isCorrect": false
      },
      {
        "text": "Porque los algoritmos no pueden terminar jamás.",
        "isCorrect": false
      }
    ],
    "explanation": "El criterio de parada marca el cierre formal de la actividad."
  },
  {
    "id": "g4_algoritmos_11",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Si dos caminos llevan a Bity a la meta, pero uno tiene charcos que le quitan batería y el otro es camino seco: ¿cuál algoritmo elegimos?",
    "options": [
      {
        "text": "El algoritmo que pasa por el camino seco para cuidar la energía y las vidas de Bity.",
        "isCorrect": true
      },
      {
        "text": "El algoritmo que pasa por todos los charcos para perder energía.",
        "isCorrect": false
      },
      {
        "text": "Cualquiera de los dos, la energía no importa.",
        "isCorrect": false
      }
    ],
    "explanation": "Elegir la ruta segura protege los recursos y maximiza las chances de victoria."
  },
  {
    "id": "g4_algoritmos_12",
    "grade": 4,
    "category": "algoritmos",
    "difficulty": "medio",
    "question": "Cuando diseñamos un algoritmo para ayudar a Bity, ¿qué demostramos?",
    "options": [
      {
        "text": "Que sabemos pensar y organizar una solución lógica paso a paso para resolver un desafío.",
        "isCorrect": true
      },
      {
        "text": "Que sabemos adivinar cosas mágicas.",
        "isCorrect": false
      },
      {
        "text": "Que los robots no necesitan ayuda humana.",
        "isCorrect": false
      }
    ],
    "explanation": "Crear un algoritmo evidencia capacidad analítica para estructurar soluciones ordenadas."
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
    "question": "Bity está mirando al norte. Si ejecuta: 1. Girar a la derecha, 2. Girar a la derecha, ¿hacia dónde queda mirando?",
    "options": [
      {
        "text": "Hacia el sur (la dirección contraria a la que empezó).",
        "isCorrect": true
      },
      {
        "text": "Hacia el norte nuevamente.",
        "isCorrect": false
      },
      {
        "text": "Hacia el oeste.",
        "isCorrect": false
      }
    ],
    "explanation": "Dos giros seguidos a la derecha de 90° suman 180°, orientando al robot exactamente hacia el sur."
  },
  {
    "id": "g5_instrucciones_2",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Cuál de estas instrucciones es AMBIGUA (poco clara) y cuál es precisa para un robot?",
    "options": [
      {
        "text": "«Moverse hacia allá» es ambigua; «Avanzar 4 casilleros al frente» es precisa.",
        "isCorrect": true
      },
      {
        "text": "«Avanzar 2 pasos» es ambigua; «Caminar» es precisa.",
        "isCorrect": false
      },
      {
        "text": "Ambas son perfectamente precisas para un robot.",
        "isCorrect": false
      }
    ],
    "explanation": "«Hacia allá» no indica distancia ni rumbo exacto; la segunda orden brinda magnitud y sentido medibles."
  },
  {
    "id": "g5_instrucciones_3",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "Bity tiene esta secuencia: 1. Avanzar 3, 2. Girar a la derecha, 3. Avanzar 2. Si un obstáculo bloquea el paso en la posición 2 del segundo avance, ¿qué cambio de instrucción corrige el camino?",
    "options": [
      {
        "text": "Cambiar el segundo avance a 1 paso, girar para rodear el obstáculo y luego continuar hacia la meta.",
        "isCorrect": true
      },
      {
        "text": "Pedirle a Bity que avance con más fuerza para atravesar el obstáculo.",
        "isCorrect": false
      },
      {
        "text": "Eliminar todas las instrucciones y no moverse.",
        "isCorrect": false
      }
    ],
    "explanation": "Reducir el avance antes de chocar permite intercalar un giro y esquivar la zona obstruida."
  },
  {
    "id": "g5_instrucciones_4",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "Si Bity da 5 pasos al frente y luego 5 pasos atrás, ¿dónde se encuentra respecto a su posición de inicio?",
    "options": [
      {
        "text": "Exactamente en el mismo lugar donde comenzó.",
        "isCorrect": true
      },
      {
        "text": "A 10 metros hacia adelante.",
        "isCorrect": false
      },
      {
        "text": "A 5 metros hacia la izquierda.",
        "isCorrect": false
      }
    ],
    "explanation": "Avanzar y retroceder la misma distancia anula el desplazamiento neto total."
  },
  {
    "id": "g5_instrucciones_5",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Por qué en programación no basta con decirle a un robot «Sé cuidadoso con el pozo»?",
    "options": [
      {
        "text": "Porque el robot necesita órdenes concretas de acción, como «Si estás a 1 paso del pozo, saltar».",
        "isCorrect": true
      },
      {
        "text": "Porque los robots no tienen oídos para escuchar palabras amables.",
        "isCorrect": false
      },
      {
        "text": "Porque los pozos desaparecen si el robot es cuidadoso.",
        "isCorrect": false
      }
    ],
    "explanation": "Las máquinas requieren pautas operativas precisas de medición y movimiento, no advertencias abstractas."
  },
  {
    "id": "g5_instrucciones_6",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "Tenemos dos secuencias para hacer que Bity llegue al cohete: Secuencia 1 (Avanzar 2, Girar a la derecha, Avanzar 3). Secuencia 2 (Avanzar 2, Girar a la izquierda, Avanzar 3). Si el cohete está a la derecha, ¿cuál es la correcta?",
    "options": [
      {
        "text": "La Secuencia 1, porque orienta a Bity hacia la dirección real donde está el cohete.",
        "isCorrect": true
      },
      {
        "text": "La Secuencia 2, porque girar al lado contrario ayuda a no marearse.",
        "isCorrect": false
      },
      {
        "text": "Las dos llegan exactamente al mismo lugar.",
        "isCorrect": false
      }
    ],
    "explanation": "El giro hacia la derecha alinea el avance final con la ubicación real de la nave."
  },
  {
    "id": "g5_instrucciones_7",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "Si Bity ejecuta la orden «Avanzar 4 pasos» pero solo puede caminar de a 1 casillero por vez, ¿a cuántas instrucciones unitarias de avance equivale?",
    "options": [
      {
        "text": "A repetir la instrucción de avanzar 1 casillero 4 veces seguidas.",
        "isCorrect": true
      },
      {
        "text": "A dar 1 solo paso gigante de 4 metros.",
        "isCorrect": false
      },
      {
        "text": "A ninguna, no se puede avanzar de a casilleros.",
        "isCorrect": false
      }
    ],
    "explanation": "Una orden compuesta de 4 casilleros se descompone en 4 pasos unitarios consecutivos."
  },
  {
    "id": "g5_instrucciones_8",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Qué ocurre si en una secuencia de instrucciones colocamos «Subir al cohete» antes de «Caminar hasta la base de lanzamiento»?",
    "options": [
      {
        "text": "La instrucción fallará porque Bity intentará subir a un cohete en el que todavía no está presente.",
        "isCorrect": true
      },
      {
        "text": "El cohete vendrá volando a buscar a Bity a su casa.",
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
    "question": "En una cuadrícula, Bity está en la casilla (1, 1). Si le ordenamos «Avanzar 3 casillas a la derecha», ¿en qué casilla quedará?",
    "options": [
      {
        "text": "En la casilla (4, 1).",
        "isCorrect": true
      },
      {
        "text": "En la casilla (1, 4).",
        "isCorrect": false
      },
      {
        "text": "En la casilla (3, 3).",
        "isCorrect": false
      }
    ],
    "explanation": "Moverse horizontalmente hacia la derecha suma 3 posiciones a la coordenada horizontal X (1 + 3 = 4)."
  },
  {
    "id": "g5_instrucciones_10",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "¿Por qué es fundamental que cada instrucción en una misión espacial tenga un orden lógico estricto?",
    "options": [
      {
        "text": "Porque un error de secuencia puede desviar la nave de su ruta o causar un accidente en el aterrizaje.",
        "isCorrect": true
      },
      {
        "text": "Porque a los astronautas les gusta memorizar números.",
        "isCorrect": false
      },
      {
        "text": "Porque en el espacio las órdenes se ejecutan al revés.",
        "isCorrect": false
      }
    ],
    "explanation": "En misiones espaciales el margen de error es cero; cada maniobra depende del éxito de la anterior."
  },
  {
    "id": "g5_instrucciones_11",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "Si queremos que Bity recolecte un objeto a 2 pasos y vuelva al inicio, ¿cuál es la secuencia correcta?",
    "options": [
      {
        "text": "1. Avanzar 2 pasos. 2. Agarrar el objeto. 3. Girar 180°. 4. Avanzar 2 pasos.",
        "isCorrect": true
      },
      {
        "text": "1. Avanzar 2 pasos. 2. Volver al inicio sin agarrar nada.",
        "isCorrect": false
      },
      {
        "text": "1. Girar 180° antes de caminar y alejarse del objeto.",
        "isCorrect": false
      }
    ],
    "explanation": "La secuencia recorre la distancia, recolecta la pieza, se da media vuelta y desanda los 2 pasos."
  },
  {
    "id": "g5_instrucciones_12",
    "grade": 5,
    "category": "instrucciones",
    "difficulty": "avanzado",
    "question": "Si una orden dice «Saltar a la derecha», ¿qué dos movimientos combinados está realizando Bity?",
    "options": [
      {
        "text": "Un movimiento vertical de elevación y un movimiento horizontal hacia la derecha.",
        "isCorrect": true
      },
      {
        "text": "Un giro completo hacia abajo en el suelo.",
        "isCorrect": false
      },
      {
        "text": "Solo un movimiento hacia atrás.",
        "isCorrect": false
      }
    ],
    "explanation": "Un salto diagonal combina energía ascensional en el eje vertical y desplazamiento horizontal."
  },
  {
    "id": "g5_programacion_1",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué es lo más importante que hace un programador antes de escribir código o bloques?",
    "options": [
      {
        "text": "Analizar el problema, entender la meta y planificar la secuencia lógica de instrucciones.",
        "isCorrect": true
      },
      {
        "text": "Empezar a teclear sin saber qué hay que resolver.",
        "isCorrect": false
      },
      {
        "text": "Comprar una computadora más grande.",
        "isCorrect": false
      }
    ],
    "explanation": "El análisis previo y la planificación mental ahorran tiempo y aseguran soluciones eficaces."
  },
  {
    "id": "g5_programacion_2",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "Si dos programas logran que Bity complete el mismo nivel, pero el Programa A usa 6 instrucciones y el Programa B usa 20 instrucciones innecesarias, ¿cuál preferimos?",
    "options": [
      {
        "text": "El Programa A, porque es más claro, directo y eficiente al no desperdiciar pasos.",
        "isCorrect": true
      },
      {
        "text": "El Programa B, porque mientras más órdenes tenga un programa siempre es mejor.",
        "isCorrect": false
      },
      {
        "text": "Cualquiera, la cantidad de instrucciones no importa.",
        "isCorrect": false
      }
    ],
    "explanation": "La economía de instrucciones favorece programas más limpios, rápidos de ejecutar y fáciles de mantener."
  },
  {
    "id": "g5_programacion_3",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué significa que un programa tenga un error de lógica en las instrucciones?",
    "options": [
      {
        "text": "Que las órdenes están escritas pero el resultado que producen no es el que queríamos lograr.",
        "isCorrect": true
      },
      {
        "text": "Que la computadora se quedó sin energía eléctrica.",
        "isCorrect": false
      },
      {
        "text": "Que el teclado tiene polvo en las teclas.",
        "isCorrect": false
      }
    ],
    "explanation": "Un error lógico ocurre cuando la computadora sigue órdenes que no conducen al objetivo deseado."
  },
  {
    "id": "g5_programacion_4",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "Si un programa debe hacer que Bity recoja 3 repuestos y luego active el cohete, ¿cuál es la condición necesaria para activar el cohete?",
    "options": [
      {
        "text": "Haber completado previamente la recolección de los 3 repuestos requeridos.",
        "isCorrect": true
      },
      {
        "text": "Activar el cohete antes de buscar los repuestos.",
        "isCorrect": false
      },
      {
        "text": "Dejar los repuestos en el suelo y festejar.",
        "isCorrect": false
      }
    ],
    "explanation": "El despegue exige haber satisfecho antes todos los pasos preparatorios."
  },
  {
    "id": "g5_programacion_5",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Por qué decimos que la programación es una herramienta para resolver problemas?",
    "options": [
      {
        "text": "Porque nos permite crear soluciones paso a paso para que las computadoras nos ayuden en tareas complejas.",
        "isCorrect": true
      },
      {
        "text": "Porque reemplaza a las personas y no requiere pensar.",
        "isCorrect": false
      },
      {
        "text": "Porque solo sirve para jugar a videojuegos.",
        "isCorrect": false
      }
    ],
    "explanation": "La programación es el puente para instruir a la tecnología en la resolución de desafíos reales."
  },
  {
    "id": "g5_programacion_6",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "Si probamos nuestro programa y Bity gira hacia el lado opuesto al cohete, ¿cómo razonamos para solucionarlo?",
    "options": [
      {
        "text": "Identificamos la instrucción de giro errónea y la cambiamos por el giro en la dirección correcta.",
        "isCorrect": true
      },
      {
        "text": "Movemos el monitor con las manos para engañar a la pantalla.",
        "isCorrect": false
      },
      {
        "text": "Dejamos el error porque el cohete debería moverse.",
        "isCorrect": false
      }
    ],
    "explanation": "Localizar puntualmente el bloque desalineado y cambiar su sentido resuelve la desviación."
  },
  {
    "id": "g5_programacion_7",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué hace que un programa sea fácil de mantener y modificar si el juego cambia?",
    "options": [
      {
        "text": "Que sus instrucciones estén ordenadas de forma clara, con partes bien diferenciadas para cada objetivo.",
        "isCorrect": true
      },
      {
        "text": "Que todas las instrucciones estén amontonadas sin orden ni sentido.",
        "isCorrect": false
      },
      {
        "text": "Que nadie sepa qué hace cada orden.",
        "isCorrect": false
      }
    ],
    "explanation": "Una estructura limpia y modular permite ajustar tramos específicos sin romper el resto."
  },
  {
    "id": "g5_programacion_8",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "Al programar el despegue de la nave de Bity, ¿qué instrucciones deben cumplirse en orden?",
    "options": [
      {
        "text": "1. Subir Bity a la cabina. 2. Cerrar la compuerta. 3. Encender propulsores. 4. Despegar.",
        "isCorrect": true
      },
      {
        "text": "1. Despegar. 2. Subir Bity después en el espacio. 3. Cerrar compuerta.",
        "isCorrect": false
      },
      {
        "text": "1. Encender propulsores sin Bity adentro y dejarlo en tierra.",
        "isCorrect": false
      }
    ],
    "explanation": "La tripulación debe abordar y sellar la cabina antes del encendido de motores y la partida."
  },
  {
    "id": "g5_programacion_9",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Por qué los programas educativos de Bity no usan trucos mágicos y solo usan instrucciones lógicas?",
    "options": [
      {
        "text": "Porque las computadoras reales funcionan únicamente con lógica e instrucciones humanas programadas.",
        "isCorrect": true
      },
      {
        "text": "Porque la magia en las computadoras se cobra aparte.",
        "isCorrect": false
      },
      {
        "text": "Porque Bity no cree en la tecnología.",
        "isCorrect": false
      }
    ],
    "explanation": "El aprendizaje computacional se fundamenta en reglas lógicas comprensibles y reproducibles."
  },
  {
    "id": "g5_programacion_10",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "Si queremos que Bity avise cuando llega a la meta, ¿qué instrucción agregamos al final del programa?",
    "options": [
      {
        "text": "Una instrucción para mostrar el mensaje «¡Misión cumplida!» y celebrar la victoria.",
        "isCorrect": true
      },
      {
        "text": "Una instrucción para reiniciar el juego sin avisar nada.",
        "isCorrect": false
      },
      {
        "text": "Una orden para borrar todo el nivel.",
        "isCorrect": false
      }
    ],
    "explanation": "El mensaje final comunica claramente al jugador que el objetivo fue alcanzado."
  },
  {
    "id": "g5_programacion_11",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "¿Qué aprendemos cuando comparamos nuestra solución programada con la de un compañero?",
    "options": [
      {
        "text": "Que un mismo problema puede resolverse con distintos caminos válidos y podemos aprender nuevas estrategias.",
        "isCorrect": true
      },
      {
        "text": "Que solo existe una única forma en el mundo de programar algo.",
        "isCorrect": false
      },
      {
        "text": "Que no se debe compartir ideas con nadie.",
        "isCorrect": false
      }
    ],
    "explanation": "La programación admite múltiples recorridos válidos y enriquece el pensamiento divergente."
  },
  {
    "id": "g5_programacion_12",
    "grade": 5,
    "category": "programacion",
    "difficulty": "avanzado",
    "question": "En resumen, ¿qué significa programar en la escuela primaria?",
    "options": [
      {
        "text": "Aprender a pensar de manera lógica, ordenada y creativa para darle instrucciones útiles a una computadora o robot.",
        "isCorrect": true
      },
      {
        "text": "Aprender de memoria códigos difíciles sin entender qué hacen.",
        "isCorrect": false
      },
      {
        "text": "Jugar sin pensar en las reglas de las máquinas.",
        "isCorrect": false
      }
    ],
    "explanation": "Programar es desarrollar habilidades de pensamiento lógico para crear soluciones estructuradas."
  },
  {
    "id": "g5_algoritmos_1",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "¿Qué diferencia a un buen algoritmo de una simple lista de ideas desordenadas?",
    "options": [
      {
        "text": "Que el algoritmo tiene un orden estricto de pasos pensados para alcanzar una meta concreta sin ambigüedades.",
        "isCorrect": true
      },
      {
        "text": "Que el algoritmo se escribe con lápices de colores especiales.",
        "isCorrect": false
      },
      {
        "text": "Que no tiene ningún orden ni principio ni fin.",
        "isCorrect": false
      }
    ],
    "explanation": "La estructura secuencial y el propósito definido diferencian al algoritmo del caos."
  },
  {
    "id": "g5_algoritmos_2",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "Si dos algoritmos para reparar el cohete de Bity llegan al mismo resultado, pero uno requiere 5 pasos y el otro 15 pasos con rodeos, ¿por qué elegimos el de 5 pasos?",
    "options": [
      {
        "text": "Porque es más eficiente, ahorra tiempo y batería, y es más fácil de verificar sin errores.",
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
    "question": "Bity sigue este algoritmo: 1. Caminar 4 pasos, 2. Si hay puerta cerrada: usar llave, 3. Entrar. ¿Qué pasaría si la puerta estuviese cerrada pero no tuviese llave?",
    "options": [
      {
        "text": "El algoritmo se detendría en el paso 2 porque falta el elemento necesario para continuar.",
        "isCorrect": true
      },
      {
        "text": "Bity derriba la pared con los ojos.",
        "isCorrect": false
      },
      {
        "text": "El cohete abre la puerta solo desde el espacio.",
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
    "question": "Para ordenar una fila de 4 cajas por tamaño de menor a mayor: ¿qué procedimiento realiza un algoritmo de ordenamiento simple?",
    "options": [
      {
        "text": "Compara las cajas de a pares y va colocando la más pequeña adelante hasta que todas estén en orden.",
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
    "question": "¿Por qué un algoritmo no puede tener pasos infinitos que nunca terminen?",
    "options": [
      {
        "text": "Porque nunca llegaría a resolver el problema ni a mostrar el resultado final.",
        "isCorrect": true
      },
      {
        "text": "Porque a la computadora se le gasta la memoria a los 2 minutos.",
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
    "question": "En un algoritmo para cruzar un río con piedras: Piedra 1, Piedra 2, Piedra 3... Si la Piedra 2 está rota, ¿qué debe prever el algoritmo?",
    "options": [
      {
        "text": "Un paso alternativo para esquivar la piedra rota o saltar a una piedra segura contigua.",
        "isCorrect": true
      },
      {
        "text": "Pisar la piedra rota de todas formas aunque se caiga al agua.",
        "isCorrect": false
      },
      {
        "text": "Volver a casa sin intentar cruzar.",
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
        "text": "Nos ayuda a descomponer problemas difíciles en pasos más simples y ordenados que podemos resolver uno a uno.",
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
    "question": "Si comparamos el algoritmo para lavarse los dientes con el algoritmo para encender un televisor, ¿qué tienen en común?",
    "options": [
      {
        "text": "Ambos son secuencias ordenadas de pasos que deben cumplirse para lograr un objetivo específico.",
        "isCorrect": true
      },
      {
        "text": "Los dos usan pasta dental y cepillo.",
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
    "question": "¿Por qué un algoritmo debe probarse paso por paso antes de aplicarlo en una misión espacial real?",
    "options": [
      {
        "text": "Para verificar que cada paso funcione como se esperaba y no ponga en riesgo la misión de la nave.",
        "isCorrect": true
      },
      {
        "text": "Para que los astronautas pasen el tiempo jugando.",
        "isCorrect": false
      },
      {
        "text": "Porque en el espacio los algoritmos no funcionan.",
        "isCorrect": false
      }
    ],
    "explanation": "Validar paso por paso previene catástrofes y certifica la seguridad del vuelo."
  },
  {
    "id": "g5_algoritmos_12",
    "grade": 5,
    "category": "algoritmos",
    "difficulty": "avanzado",
    "question": "En conclusión, dominar las instrucciones, los programas y los algoritmos nos permite:",
    "options": [
      {
        "text": "Ser creadores de tecnología capaces de decirle a las máquinas cómo ayudarnos a resolver desafíos.",
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
   * Garantiza: divisiones exactas con divisor <= 5 y números apropiados a la edad.
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
if (typeof window !== 'undefined') {
  window.BITY_QUESTION_BANK = BITY_QUESTION_BANK;
  window.BityQuestionManager = BityQuestionManager;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BITY_QUESTION_BANK, BityQuestionManager };
}
