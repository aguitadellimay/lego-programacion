/**
 * ========================================================
 * ALGORITMOS — CLASE N.º 1: CONSTRUCCIÓN PRÁCTICA
 * Módulo de Pensamiento Computacional para 1.º a 5.º Grado
 * Informática Mágica — Edición Halloween
 * ========================================================
 */

(function (global) {
  'use strict';

  // ============================================================
  // 1. REPOSITORIO DE ILUSTRACIONES VECTORIALES SVG
  // ============================================================
  const ALGORITHM_SVGS = {
    hero_routine: `
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" class="alg-svg-hero" aria-label="Rutina diaria">
        <defs>
          <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2e1065"/>
            <stop offset="100%" stop-color="#0f0728"/>
          </linearGradient>
          <linearGradient id="sunGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="100%" stop-color="#f59e0b"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" rx="16" fill="url(#heroSky)"/>
        <circle cx="50" cy="40" r="1.5" fill="#fde047"/>
        <circle cx="120" cy="30" r="2" fill="#ffffff"/>
        <circle cx="340" cy="45" r="1.8" fill="#fef08a"/>
        <circle cx="80" cy="80" r="28" fill="url(#sunGlow)" opacity="0.85"/>
        <rect x="55" y="55" width="50" height="60" rx="6" fill="none" stroke="#6b21a8" stroke-width="2.5"/>
        <line x1="80" y1="55" x2="80" y2="115" stroke="#6b21a8" stroke-width="2"/>
        <line x1="55" y1="85" x2="105" y2="85" stroke="#6b21a8" stroke-width="2"/>
        <g transform="translate(130, 95)">
          <circle cx="12" cy="12" r="12" fill="#8b5cf6"/>
          <text x="12" y="16" fill="#ffffff" font-size="12" font-weight="900" text-anchor="middle">1</text>
          <text x="12" y="38" fill="#e2e8f0" font-size="9" font-weight="700" text-anchor="middle">Despertar</text>
        </g>
        <path d="M 160 107 Q 185 90 210 107" stroke="#facc15" stroke-width="2.5" stroke-dasharray="4,4" fill="none"/>
        <g transform="translate(210, 95)">
          <circle cx="12" cy="12" r="12" fill="#38bdf8"/>
          <text x="12" y="16" fill="#ffffff" font-size="12" font-weight="900" text-anchor="middle">2</text>
          <text x="12" y="38" fill="#e2e8f0" font-size="9" font-weight="700" text-anchor="middle">Desayunar</text>
        </g>
        <path d="M 240 107 Q 265 90 290 107" stroke="#facc15" stroke-width="2.5" stroke-dasharray="4,4" fill="none"/>
        <g transform="translate(290, 95)">
          <circle cx="12" cy="12" r="12" fill="#10b981"/>
          <text x="12" y="16" fill="#ffffff" font-size="12" font-weight="900" text-anchor="middle">3</text>
          <text x="12" y="38" fill="#e2e8f0" font-size="9" font-weight="700" text-anchor="middle">Aprender</text>
        </g>
      </svg>`,

    hero_teeth: `
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="alg-svg-hero" aria-label="Lavado de dientes">
        <rect width="400" height="200" rx="16" fill="#0f172a"/>
        <circle cx="200" cy="100" r="70" fill="rgba(56, 189, 248, 0.1)"/>
        <!-- Cepillo de dientes con pasta -->
        <g transform="translate(100, 80)">
          <rect x="0" y="15" width="160" height="14" rx="7" fill="#38bdf8"/>
          <rect x="150" y="8" width="40" height="14" rx="4" fill="#0284c7"/>
          <path d="M 152 8 Q 170 -6 190 8 Z" fill="#f43f5e"/>
          <!-- Cerdas -->
          <rect x="155" y="0" width="4" height="8" fill="#ffffff"/>
          <rect x="163" y="0" width="4" height="8" fill="#ffffff"/>
          <rect x="171" y="0" width="4" height="8" fill="#ffffff"/>
          <rect x="179" y="0" width="4" height="8" fill="#ffffff"/>
          <rect x="187" y="0" width="4" height="8" fill="#ffffff"/>
        </g>
        <!-- Diente sonriente brillante -->
        <g transform="translate(290, 65)">
          <path d="M 20 10 C 5 10 0 25 0 40 C 0 65 15 80 20 80 C 25 80 28 65 30 65 C 32 65 35 80 40 80 C 45 80 60 65 60 40 C 60 25 55 10 40 10 C 35 10 32 18 30 18 C 28 18 25 10 20 10 Z" fill="#ffffff" stroke="#38bdf8" stroke-width="2.5"/>
          <circle cx="20" cy="35" r="3" fill="#0f172a"/>
          <circle cx="40" cy="35" r="3" fill="#0f172a"/>
          <path d="M 22 45 Q 30 52 38 45" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>
          <polygon points="50,15 54,23 62,25 56,31 58,39 50,35 42,39 44,31 38,25 46,23" fill="#facc15" transform="scale(0.5) translate(40, -10)"/>
        </g>
      </svg>`,

    scrambled: `
      <svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg" class="alg-svg-hero" aria-label="Error de secuencia">
        <rect width="400" height="160" rx="16" fill="#1e1145"/>
        <circle cx="100" cy="80" r="45" fill="rgba(239, 68, 68, 0.15)"/>
        <text x="100" y="90" font-size="44" text-anchor="middle">❌</text>
        <g transform="translate(160, 45)">
          <rect x="0" y="0" width="210" height="70" rx="12" fill="rgba(255, 255, 255, 0.05)" stroke="#ef4444" stroke-width="1.5"/>
          <text x="16" y="28" fill="#fca5a5" font-size="13" font-weight="800">¿CEPILLARSE SIN PASTA?</text>
          <text x="16" y="48" fill="#cbd5e1" font-size="11">Si cambiamos el orden, el</text>
          <text x="16" y="62" fill="#cbd5e1" font-size="11">resultado no se alcanza.</text>
        </g>
      </svg>`
  };

  function getBitySvg(mood = 'happy') {
    const eyeColor = mood === 'thinking' ? '#facc15' : (mood === 'celebrating' ? '#34d399' : '#38bdf8');
    return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="bity-svg-avatar" aria-label="Bity el robot">
      <circle cx="50" cy="50" r="46" fill="#1e1b4b" stroke="#8b5cf6" stroke-width="3"/>
      <rect x="47" y="10" width="6" height="14" fill="#a855f7" rx="3"/>
      <circle cx="50" cy="9" r="6" fill="#facc15"/>
      <rect x="25" y="24" width="50" height="42" rx="12" fill="#312e81" stroke="#6366f1" stroke-width="2.5"/>
      <rect x="32" y="32" width="36" height="24" rx="6" fill="#0f172a"/>
      ${mood === 'thinking' ? `
        <circle cx="40" cy="44" r="4" fill="${eyeColor}"/>
        <circle cx="60" cy="44" r="4" fill="${eyeColor}"/>
        <line x1="34" y1="38" x2="45" y2="40" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
      ` : `
        <circle cx="40" cy="44" r="4.5" fill="${eyeColor}"/>
        <circle cx="60" cy="44" r="4.5" fill="${eyeColor}"/>
      `}
      ${mood === 'celebrating' || mood === 'happy' ? `
        <path d="M 44 54 Q 50 58 56 54" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
      ` : `
        <line x1="46" y1="54" x2="54" y2="54" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
      `}
    </svg>`;
  }

  // ============================================================
  // 2. ACTIVIDADES PEDAGÓGICAS POR GRADO (1.º A 5.º)
  // Espacios de respuesta completamente vacíos, sin soluciones
  // ============================================================
  const GRADE_ALGORITHMS_ACTIVITIES = {
    1: [
      {
        id: 'g1_act1_mochila',
        num: 1,
        shortName: 'Mochila',
        title: 'Preparar la mochila para ir al colegio',
        context: '¡Una nueva mañana de clases! Para que la jornada sea genial y no te olvides de nada, necesitás preparar tu mochila con anticipación.',
        prompt: 'Pensá qué cosas tenés que hacer para preparar tu mochila antes de ir al colegio. Escribí los pasos en orden.',
        icon: '🎒',
        initialStepsCount: 4,
        hints: [
          '¿Revisaste tu cuaderno o el horario para saber qué materias tenés hoy?',
          'Recordá abrir la mochila antes de guardar los útiles y cuadernos.',
          'No te olvides de cerrar bien el cierre cuando termines de guardar todo.'
        ],
        keywords: {
          open: ['abrir', 'abro', 'abrí', 'mochila'],
          items: ['cuaderno', 'libro', 'cartuchera', 'lapiz', 'lápiz', 'lapicera', 'util', 'útil', 'carpeta', 'merienda'],
          close: ['cerrar', 'cierro', 'cerrá', 'cierre', 'guardar'],
          carry: ['poner', 'colgar', 'espalda', 'llevar', 'listo', 'lista', 'hombro']
        }
      },
      {
        id: 'g1_act2_manos',
        num: 2,
        shortName: 'Manos',
        title: 'Lavarse las manos',
        context: 'Lavarse las manos elimina bacterias y nos mantiene sanos antes de comer o después de jugar.',
        prompt: 'Imaginá que tenés que explicarle a un compañero cómo lavarse las manos. Escribí las instrucciones en orden.',
        icon: '🧼',
        initialStepsCount: 4,
        hints: [
          'Pensá qué hacés primero: ¿mojás las manos antes o después del jabón?',
          '¿Cuánto tiempo te frotás las manos para que queden con mucha espuma limpia?',
          'Recordá qué paso es fundamental al final para no dejar todo mojado.'
        ],
        keywords: {
          water: ['abrir', 'canilla', 'agua', 'mojar', 'mojo', 'mojate'],
          soap: ['jabon', 'jabón', 'poner', 'frotar', 'espuma', 'lavar'],
          rinse: ['enjuagar', 'enjuago', 'sacar', 'quitar'],
          dry: ['secar', 'seco', 'toalla', 'cerrar']
        }
      },
      {
        id: 'g1_act3_dormir',
        num: 3,
        shortName: 'Dormir',
        title: 'Prepararse para ir a dormir',
        context: 'Terminó el día y el cuerpo necesita descansar para tener energía mañana.',
        prompt: '¿Qué cosas hacés antes de acostarte? Escribí los pasos que seguirías.',
        icon: '🌙',
        initialStepsCount: 4,
        hints: [
          'Pensá en tu rutina nocturna: cepillarte los dientes, ponerte el pijama...',
          '¿Apagás la luz antes o después de meterte en la cama?',
          '¡Un buen descanso empieza con una rutina ordenada!'
        ],
        keywords: {
          hygiene: ['dientes', 'lavar', 'cepillar', 'bañar', 'pijama', 'ropa'],
          bed: ['cama', 'acostar', 'acuesto', 'meter', 'tapar'],
          lights: ['apagar', 'luz', 'dormir', 'ojos', 'descansar', 'velador']
        }
      }
    ],

    2: [
      {
        id: 'g2_act1_desayuno',
        num: 1,
        shortName: 'Desayuno',
        title: 'Preparar el desayuno',
        context: 'El desayuno nos da la energía necesaria para aprender y jugar toda la mañana.',
        prompt: 'Pensá en todos los pasos necesarios para preparar un desayuno rico y saludable. Escribí las acciones en el orden correcto.',
        icon: '🥣',
        initialStepsCount: 4,
        hints: [
          'Pensá qué alimentos vas a desayunar y qué utensilios necesitás (taza, cuchara, plato).',
          'Para servir la leche o untar tostadas, necesitás tener primero los recipientes listos.',
          '¿Qué hacés cuando terminás de desayunar? (Limpiar la mesa, llevar la taza a la bacha).'
        ],
        keywords: {
          prep: ['taza', 'plato', 'sacar', 'buscar', 'vaso', 'mesa'],
          serve: ['leche', 'cereal', 'pan', 'tostada', 'servir', 'poner', 'calentar', 'untar', 'manteca', 'mermelada', 'fruta'],
          eat: ['comer', 'tomar', 'desayunar', 'beber'],
          cleanup: ['guardar', 'limpiar', 'lavar', 'ordenar']
        }
      },
      {
        id: 'g2_act2_utiles',
        num: 2,
        shortName: 'Útiles',
        title: 'Organizar los útiles antes de comenzar una clase',
        context: 'Tener la mesa despejada y los materiales listos nos ayuda a concentrarnos mejor.',
        prompt: 'Para trabajar cómodo y no olvidar nada, necesitás ordenar tu mesa. Escribí los pasos para organizar tus útiles escolares.',
        icon: '✏️',
        initialStepsCount: 4,
        hints: [
          'Primero sentate cómodo y abrí tu mochila para sacar solo lo necesario de esta materia.',
          'Ubicá el cuaderno frente a vos y la cartuchera a un costado donde no estorbe.',
          'Verificá tener lápiz con punta, goma y regla antes de que comience la explicación.'
        ],
        keywords: {
          open: ['mochila', 'sacar', 'abrir'],
          place: ['cuaderno', 'libro', 'cartuchera', 'mesa', 'banco', 'ubicar', 'apoyar'],
          prepare: ['lapiz', 'lápiz', 'goma', 'punta', 'regla', 'color'],
          ready: ['sentar', 'atento', 'escuchar', 'listo', 'lista']
        }
      },
      {
        id: 'g2_act3_planta',
        num: 3,
        shortName: 'Planta',
        title: 'Regar una planta correctamente',
        context: 'Las plantas necesitan agua, pero regarlas de más o de menos puede marchitarlas.',
        prompt: 'Una planta necesita cuidado y agua en la cantidad justa. Escribí la secuencia de pasos para regarla sin inundarla.',
        icon: '🌱',
        initialStepsCount: 4,
        hints: [
          'Antes de regar, tocá suavemente la tierra para comprobar si está seca o húmeda.',
          'Buscá una regadera o jarrito con agua limpia a temperatura ambiente.',
          'Verté el agua despacio sobre la tierra cerca de las raíces, sin ahogar las hojas.'
        ],
        keywords: {
          check: ['tierra', 'mirar', 'tocar', 'revisar', 'seca', 'humeda', 'húmeda'],
          getWater: ['regadera', 'agua', 'llenar', 'canilla', 'vaso'],
          water: ['regar', 'echar', 'tirar', 'verter', 'despacio', 'suave', 'raiz', 'raíz'],
          finish: ['dejar', 'guardar', 'luz', 'sol', 'limpiar']
        }
      }
    ],

    3: [
      {
        id: 'g3_act1_parque',
        num: 1,
        shortName: 'Parque',
        title: 'Organizar una salida al parque',
        context: 'Ir a jugar al parque con amigos o familia requiere coordinar varias tareas previas.',
        prompt: 'Querés pasar una linda tarde con amigos en el parque. Escribí el algoritmo con los pasos que debés seguir antes y durante la salida.',
        icon: '🌳',
        initialStepsCount: 5,
        hints: [
          'Pensá en coordinar el horario y pedir permiso a los adultos responsables.',
          '¿Qué vas a llevar? Botella con agua, gorra, pelota, merienda...',
          'Recordá el camino, jugar con cuidado y juntar tus pertenencias antes de regresar.'
        ],
        keywords: {
          plan: ['permiso', 'amigos', 'horario', 'acordar', 'avisar'],
          pack: ['botella', 'agua', 'pelota', 'gorra', 'mochila', 'guardar'],
          go: ['caminar', 'ir', 'llegar', 'plaza', 'parque'],
          play: ['jugar', 'correr', 'divertirse'],
          return: ['juntar', 'guardar', 'volver', 'regresar']
        }
      },
      {
        id: 'g3_act2_receta',
        num: 2,
        shortName: 'Receta',
        title: 'Preparar una receta sencilla',
        context: 'Una receta de cocina es el ejemplo clásico de algoritmo: ingredientes (datos de entrada) e instrucciones paso a paso.',
        prompt: 'Elegí una receta sencilla (como una ensalada de frutas o un sándwich) y escribí el algoritmo paso a paso con los ingredientes y la preparación.',
        icon: '🥪',
        initialStepsCount: 5,
        hints: [
          'Lavate las manos y reuní todos los ingredientes e implementos sobre la mesada.',
          'Escribí las instrucciones de corte, untado o mezclado en el orden exacto.',
          'Finalizá con la presentación del plato y el orden de la cocina.'
        ],
        keywords: {
          hygiene: ['manos', 'lavar', 'limpiar'],
          ingredients: ['ingredientes', 'pan', 'fruta', 'queso', 'sacar', 'juntar'],
          prep: ['cortar', 'pelar', 'untar', 'mezclar', 'colocar', 'poner', 'armar'],
          serve: ['servir', 'plato', 'comer', 'disfrutar', 'ordenar']
        }
      },
      {
        id: 'g3_act3_tiempo_escuela',
        num: 3,
        shortName: 'A tiempo',
        title: 'Resolver el problema de llegar a tiempo a la escuela',
        context: 'Llegar puntual a la escuela requiere coordinar tiempos, levantarse con margen y evitar distracciones.',
        prompt: 'A veces nos demoramos por la mañana. Escribí un algoritmo con los pasos organizados para no llegar tarde a la escuela.',
        icon: '⏰',
        initialStepsCount: 5,
        hints: [
          'Pensá en dejar lista la ropa y la mochila la noche anterior.',
          'Fijá una alarma con tiempo suficiente para desayunar sin apuro.',
          'Calculá el tiempo de traslado desde casa hasta la puerta del colegio.'
        ],
        keywords: {
          alarm: ['alarma', 'despertador', 'despertar', 'levantar', 'temprano', 'hora'],
          routine: ['lavar', 'vestir', 'cambiar', 'ropa', 'uniforme', 'desayuno', 'desayunar'],
          pack: ['mochila', 'verificar', 'agarrar'],
          travel: ['salir', 'caminar', 'auto', 'colectivo', 'viajar', 'llegar', 'escuela', 'colegio', 'tiempo', 'puntual']
        }
      }
    ],

    4: [
      {
        id: 'g4_act1_ropa_clima',
        num: 1,
        shortName: 'Clima',
        title: '¿Qué ropa usar según el clima? (Decisiones)',
        context: 'Los algoritmos inteligentes toman decisiones analizando condiciones. Según la temperatura elegimos qué ponernos.',
        prompt: 'Mirá por la ventana: el clima puede cambiar. Diseñá un algoritmo que incluya decisiones del tipo: SI hace frío, ENTONCES abrigarse; SI hace calor, ENTONCES ropa liviana.',
        icon: '⛅',
        initialStepsCount: 5,
        hints: [
          'Paso 1: Mirar por la ventana o consultar la temperatura.',
          'Paso 2: Condición: SI hace frío (o menos de 18 grados)...',
          'Paso 3: Acción: ...ENTONCES ponerse campera o abrigo.',
          'Paso 4: Alternativa: SINO (si hace calor)... ENTONCES usar remera y ropa liviana.',
          'Paso 5: SI llueve, ENTONCES llevar paraguas o piloto.'
        ],
        keywords: {
          check: ['mirar', 'clima', 'tiempo', 'temperatura', 'pronostico', 'pronóstico'],
          ifCold: ['si', 'frio', 'frío', 'entonces', 'campera', 'abrigo', 'buzo', 'pantalon', 'pantalón'],
          ifHot: ['si', 'calor', 'sino', 'entonces', 'remera', 'liviana', 'fresca', 'short'],
          ifRain: ['llueve', 'lluvia', 'paraguas', 'piloto', 'botas']
        }
      },
      {
        id: 'g4_act2_salida_lluvia_sol',
        num: 2,
        shortName: 'Lluvia / Sol',
        title: 'Organizar una salida considerando si llueve o hace sol',
        context: 'Al planificar una salida debemos tener un plan A y un plan B según el clima.',
        prompt: 'Planeá una salida de fin de semana analizando alternativas: SI llueve, ENTONCES elegir una actividad bajo techo; SI hay sol, ENTONCES ir al aire libre.',
        icon: '🌦️',
        initialStepsCount: 5,
        hints: [
          'Definí dos opciones de salida (ej: cine/museo vs parque/cancha).',
          'Escribí la instrucción condicional: SI llueve el sábado, ENTONCES...',
          'Escribí la instrucción alternativa: SINO (si hace sol), ENTONCES...',
          'Avisale a tus amigos cuál es el plan elegido según el resultado.'
        ],
        keywords: {
          plan: ['planear', 'salida', 'proponer', 'amigos', 'fin de semana'],
          ifRain: ['si', 'llueve', 'lluvia', 'entonces', 'cine', 'museo', 'casa', 'adentro', 'techo', 'juegos'],
          ifSun: ['sino', 'si', 'sol', 'despejado', 'entonces', 'parque', 'plaza', 'aire libre', 'bicicleta'],
          confirm: ['avisar', 'confirmar', 'horario', 'salir', 'disfrutar']
        }
      },
      {
        id: 'g4_act3_decision_resultado',
        num: 3,
        shortName: 'Decisión',
        title: 'Decidir según el resultado de una acción',
        context: 'En programación, muchas instrucciones dependen del resultado inmediato de una acción previa (éxito o fallo).',
        prompt: 'Imaginá que estás buscando un libro en la biblioteca o intentando abrir una puerta con una llave. Escribí un algoritmo donde tomes una decisión según si encontrás lo que buscabas o no.',
        icon: '🔑',
        initialStepsCount: 5,
        hints: [
          'Paso 1: Realizar la acción de búsqueda o prueba (probar la llave / buscar en el estante).',
          'Paso 2: Condición de éxito: SI la llave gira (o encontré el libro), ENTONCES...',
          'Paso 3: Condición alternativa: SINO (la llave no entra o no está el libro), ENTONCES...',
          'Paso 4: Finalizar alcanzando el objetivo.'
        ],
        keywords: {
          action: ['buscar', 'probar', 'llave', 'libro', 'intentar', 'cerradura', 'estante'],
          ifSuccess: ['si', 'abre', 'gira', 'encuentro', 'encontre', 'encontré', 'esta', 'está', 'entonces', 'entrar', 'leer'],
          ifFail: ['sino', 'si no', 'no abre', 'no esta', 'no está', 'entonces', 'otra', 'llave', 'pedir', 'ayuda', 'bibliotecario'],
          finish: ['abrir', 'guardar', 'listo', 'logrado']
        }
      }
    ],

    5: [
      {
        id: 'g5_act1_trivia_juego',
        num: 1,
        shortName: 'Trivia',
        title: 'Juego de preguntas y respuestas (Decisión y Bucle)',
        context: 'Los videojuegos de preguntas y respuestas evalúan cada respuesta con condiciones y repiten el ciclo para cada jugador.',
        prompt: 'Diseñá el algoritmo de un juego de trivia: mostrar la pregunta, leer la respuesta, SI es correcta sumar puntos, SINO mostrar la respuesta correcta, y REPETIR para la siguiente pregunta.',
        icon: '🎮',
        initialStepsCount: 5,
        hints: [
          'Inicialización: Empezar con el puntaje en 0.',
          'Bucle principal: REPETIR para cada una de las preguntas:',
          'Mostrar la pregunta en pantalla y esperar la respuesta del jugador.',
          'Condición: SI la respuesta es correcta, ENTONCES sumar 10 puntos. SINO, mostrar la respuesta correcta.',
          'Cierre: Al terminar todas las preguntas, mostrar el puntaje final.'
        ],
        keywords: {
          init: ['iniciar', 'empezar', 'puntaje', 'puntos', 'cero', '0'],
          show: ['mostrar', 'pregunta', 'pantalla', 'leer', 'ingresar', 'respuesta'],
          ifCorrect: ['si', 'correcta', 'acierta', 'igual', 'entonces', 'sumar', 'punto', 'puntos', 'felicitar'],
          ifWrong: ['sino', 'incorrecta', 'falla', 'entonces', 'mostrar', 'correcta', 'perder'],
          repeat: ['repetir', 'siguiente', 'pregunta', 'bucle', 'mientras', 'final', 'resultado', 'ganador']
        }
      },
      {
        id: 'g5_act2_par_impar',
        num: 2,
        shortName: 'Par / Impar',
        title: 'Determinar si un número es par o impar (Regla Matemática)',
        context: 'Un algoritmo matemático recibe un dato de entrada y mediante una regla lógica determina si pertenece a los pares o impares.',
        prompt: 'Diseñá un algoritmo para determinar si un número es par o impar. Pensá en la regla matemática (dividir por 2 o mirar la última cifra) y la decisión final.',
        icon: '🔢',
        initialStepsCount: 5,
        hints: [
          'Paso 1: Ingresar o elegir el número a comprobar.',
          'Paso 2: Dividir el número entre 2 y calcular el resto (residuo), O mirar si su última cifra es 0, 2, 4, 6 u 8.',
          'Paso 3: SI el resto es 0 (o termina en 0, 2, 4, 6, 8), ENTONCES informar que es PAR.',
          'Paso 4: SINO, informar que es IMPAR.',
          'Paso 5: Fin del algoritmo.'
        ],
        keywords: {
          input: ['pedir', 'ingresar', 'elegir', 'numero', 'número', 'leer', 'dato'],
          mathCheck: ['dividir', 'resto', 'residuo', '2', 'dos', 'ultima', 'última', 'cifra', 'termina'],
          ifEven: ['si', 'resto', '0', 'cero', 'par', 'entonces', 'mensaje', 'es par'],
          ifOdd: ['sino', 'resto', '1', 'impar', 'entonces', 'es impar'],
          finish: ['mostrar', 'resultado', 'fin', 'terminar']
        }
      },
      {
        id: 'g5_act3_repetir_bucle',
        num: 3,
        shortName: 'Repetición',
        title: 'Secuencia con repetición hasta alcanzar un objetivo',
        context: 'Los bucles o repeticiones permiten que una persona o computadora ejecute una acción varias veces sin reescribirla, hasta cumplir una meta.',
        prompt: 'Diseñá un algoritmo que utilice un bucle o repetición (por ejemplo: inflar un globo hasta que esté del tamaño deseado, llenar un balde con vasos de agua, o dar pasos hasta llegar a una meta).',
        icon: '🔁',
        initialStepsCount: 5,
        hints: [
          'Definí cuál es la acción que se repite (ej: soplar aire / echar un vaso de agua / dar un paso).',
          'Escribí la condición de parada: REPETIR... HASTA QUE el objetivo se cumpla.',
          'En cada ciclo: ejecutar la acción y verificar si ya se alcanzó la meta.',
          'Al salir del bucle: realizar la acción final (atar el globo / cerrar la canilla / festejar).'
        ],
        keywords: {
          setup: ['empezar', 'globo', 'balde', 'agua', 'paso', 'meta', 'objetivo'],
          loop: ['repetir', 'mientras', 'hasta', 'bucle', 'soplar', 'echar', 'vaso', 'avanzar', 'caminar'],
          checkCondition: ['verificar', 'medir', 'mirar', 'lleno', 'tamaño', 'llegar', 'distancia'],
          finish: ['atar', 'nudo', 'frenar', 'detener', 'cerrar', 'terminar', 'listo', 'festejar']
        }
      }
    ]
  };

  // ============================================================
  // 3. CLASE PRINCIPAL: ALGORITHMS MODULE
  // ============================================================
  class AlgorithmsModule {
    constructor() {
      this.currentGrade = 1;
      this.currentClass = 1;
      this.currentStep = 1; // 1 a 7
      this.completedSteps = new Set();

      // Almacenamiento de actividades prácticas por grado
      this.activitiesData = {};

      // Estado de reflexión de Parte 2
      this.reflectionAnswered = false;

      // Estado de Pizarra Digital (Parte 6)
      this.blackboardTitle = '';
      this.blackboardSteps = ['', '', ''];

      this.isInitialized = false;
    }

    /**
     * Formatea el texto según el grado escolar
     * En 1.º Grado: TODO texto en MAYÚSCULAS
     */
    formatForGrade(text) {
      if (!text) return '';
      if (this.currentGrade === 1) {
        return text.toUpperCase();
      }
      return text;
    }

    escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    /**
     * Inicia la Clase N.º 1 para el grado especificado
     */
    startClass(grade = 1, classNum = 1) {
      this.currentGrade = parseInt(grade) || 1;
      this.currentClass = parseInt(classNum) || 1;

      this.loadSavedProgress();
      this.initDom();
      this.showScreen();
      this.renderStep(this.currentStep);
    }

    /**
     * Muestra la pantalla screen-coding-algorithms
     */
    showScreen() {
      const screen = document.getElementById('screen-coding-algorithms');
      if (screen) {
        if (typeof window !== 'undefined' && window.appShowScreen) {
          window.appShowScreen(screen);
        } else {
          document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
          screen.classList.add('active');
        }
        screen.classList.toggle('grade-1-active', this.currentGrade === 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    /**
     * Regresa al temario de Programación (Syllabus)
     */
    exitToSyllabus() {
      if (window.MagicAudioEngine) window.MagicAudioEngine.playClick();
      try {
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.removeItem('lego_active_screen');
        }
      } catch (e) {}

      if (window.codingManager) {
        window.codingManager.loadGrade(this.currentGrade);
      } else {
        const syl = document.getElementById('screen-coding-syllabus');
        if (typeof window !== 'undefined' && window.appShowScreen && syl) {
          window.appShowScreen(syl);
        } else if (syl) {
          document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
          syl.classList.add('active');
        }
      }
    }

    /**
     * Carga el progreso y las actividades guardadas desde localStorage
     */
    loadSavedProgress() {
      try {
        const rawProg = localStorage.getItem(`lego_algorithms_class1_progress_g${this.currentGrade}`);
        if (rawProg) {
          const p = JSON.parse(rawProg);
          this.currentStep = p.currentStep || 1;
          this.completedSteps = new Set(Array.isArray(p.completedSteps) ? p.completedSteps : []);
        } else {
          this.currentStep = 1;
          this.completedSteps = new Set();
        }

        // Cargar las 3 actividades del grado actual
        const gradeActs = GRADE_ALGORITHMS_ACTIVITIES[this.currentGrade] || GRADE_ALGORITHMS_ACTIVITIES[1];
        gradeActs.forEach((act, idx) => {
          const savedDraft = localStorage.getItem(`lego_alg_draft_g${this.currentGrade}_${act.id}`);
          const savedFinished = localStorage.getItem(`lego_alg_act_g${this.currentGrade}_${act.id}`);
          
          if (savedFinished) {
            const data = JSON.parse(savedFinished);
            this.activitiesData[act.id] = Array.isArray(data.steps) ? data.steps : new Array(act.initialStepsCount).fill('');
            this.completedSteps.add(3 + idx); // Step 3, 4 o 5
          } else if (savedDraft) {
            const draftSteps = JSON.parse(savedDraft);
            this.activitiesData[act.id] = Array.isArray(draftSteps) ? draftSteps : new Array(act.initialStepsCount).fill('');
          } else {
            // ESPACIOS COMPLETAMENTE VACÍOS AL INICIAR
            this.activitiesData[act.id] = new Array(act.initialStepsCount).fill('');
          }
        });

        // Cargar Pizarra Digital
        const rawBb = localStorage.getItem(`lego_alg_blackboard_g${this.currentGrade}`);
        if (rawBb) {
          const bbData = JSON.parse(rawBb);
          this.blackboardTitle = bbData.title || '';
          this.blackboardSteps = Array.isArray(bbData.steps) ? bbData.steps : ['', '', ''];
        } else {
          this.blackboardTitle = '';
          this.blackboardSteps = ['', '', ''];
        }
      } catch (e) {
        console.warn('Error al cargar progreso de Algoritmos:', e);
      }
    }

    /**
     * Guarda el progreso global de la clase en localStorage
     */
    saveProgress() {
      try {
        const isDone = this.completedSteps.size >= 5;
        localStorage.setItem(`lego_algorithms_class1_progress_g${this.currentGrade}`, JSON.stringify({
          currentStep: this.currentStep,
          completedSteps: Array.from(this.completedSteps),
          isCompleted: isDone
        }));
        this.updateProgressUi();
      } catch (e) {}
    }

    /**
     * Guarda el borrador mientras el alumno tipea
     */
    saveActivityDraft(actId) {
      try {
        const steps = this.activitiesData[actId] || [];
        localStorage.setItem(`lego_alg_draft_g${this.currentGrade}_${actId}`, JSON.stringify(steps));
      } catch (e) {}
    }

    /**
     * Inicializa los listeners y estructura de la pantalla en el DOM
     */
    initDom() {
      const container = document.getElementById('algorithms-content-mount');
      if (!container) return;

      container.innerHTML = this.buildClassMarkup();
      this.attachEventListeners();
      
      // Renderizar los renglones vacíos o guardados de cada actividad
      const gradeActs = GRADE_ALGORITHMS_ACTIVITIES[this.currentGrade] || GRADE_ALGORITHMS_ACTIVITIES[1];
      gradeActs.forEach(act => {
        this.renderActivitySteps(act.id);
      });
      this.renderBlackboardRows();

      this.isInitialized = true;
    }

    /**
     * Genera el HTML de las 7 partes de la Clase N.º 1
     */
    buildClassMarkup() {
      const isG1 = this.currentGrade === 1;
      const gradeLabel = isG1 ? '1.º GRADO 🐣' : `${this.currentGrade}.º Grado 💻`;
      const gradeActs = GRADE_ALGORITHMS_ACTIVITIES[this.currentGrade] || GRADE_ALGORITHMS_ACTIVITIES[1];

      return `
        <!-- HUD Superior -->
        <div class="algorithms-topbar">
          <div class="algorithms-nav-left">
            <button type="button" id="btn-alg-back-syllabus" class="btn-algorithms-back">
              <span>⬅️</span> ${this.formatForGrade('VOLVER AL TEMARIO')}
            </button>
            <div class="algorithms-breadcrumb">
              <span>💻 ${this.formatForGrade('PROGRAMACIÓN')}</span>
              <span class="breadcrumb-sep">→</span>
              <span>🧩 ${this.formatForGrade('ALGORITMOS')}</span>
              <span class="breadcrumb-sep">→</span>
              <span class="breadcrumb-current">📖 ${this.formatForGrade('CLASE N.º 1: ¿QUÉ ES UN ALGORITMO?')}</span>
            </div>
          </div>
          <span class="algorithms-grade-badge">${gradeLabel}</span>
        </div>

        <!-- Barra de Progreso de la Clase (7 Partes) -->
        <div class="algorithms-progress-card">
          <div class="progress-header-row">
            <div class="progress-header-title">
              <span>🎯 ${this.formatForGrade('PROGRESO DE LA CLASE')}</span>
              <span id="alg-current-step-label" style="color: #facc15;">${this.formatForGrade('PASO 1 DE 7')}</span>
            </div>
            <span id="alg-progress-pct" class="progress-pct-badge">14%</span>
          </div>
          <div class="algorithms-steps-pills">
            <div class="step-pill" data-step="1">
              <span class="pill-num">1</span>
              <span class="pill-name">${this.formatForGrade('¿Qué es?')}</span>
            </div>
            <div class="step-pill" data-step="2">
              <span class="pill-num">2</span>
              <span class="pill-name">${this.formatForGrade('El orden')}</span>
            </div>
            <div class="step-pill" data-step="3">
              <span class="pill-num">3</span>
              <span class="pill-name">${this.formatForGrade('Act. 1: ' + gradeActs[0].shortName)}</span>
            </div>
            <div class="step-pill" data-step="4">
              <span class="pill-num">4</span>
              <span class="pill-name">${this.formatForGrade('Act. 2: ' + gradeActs[1].shortName)}</span>
            </div>
            <div class="step-pill" data-step="5">
              <span class="pill-num">5</span>
              <span class="pill-name">${this.formatForGrade('Act. 3: ' + gradeActs[2].shortName)}</span>
            </div>
            <div class="step-pill" data-step="6">
              <span class="pill-num">6</span>
              <span class="pill-name">${this.formatForGrade('Mi Pizarra')}</span>
            </div>
            <div class="step-pill" data-step="7">
              <span class="pill-num">7</span>
              <span class="pill-name">${this.formatForGrade('Compartir')}</span>
            </div>
          </div>
          <div class="progress-bar-track">
            <div id="alg-progress-bar-fill" class="progress-bar-fill" style="width: 14%;"></div>
          </div>
        </div>

        <!-- ========================================================
             PARTE 1: ¿QUÉ ES UN ALGORITMO?
             ======================================================== -->
        <section id="alg-section-1" class="class-section">
          <div class="section-header-box">
            <span class="section-tag-badge">✨ ${this.formatForGrade('PENSAMIENTO COMPUTACIONAL')}</span>
            <h2 class="section-title">${this.formatForGrade('¿QUÉ ES UN ALGORITMO?')}</h2>
            <p class="section-subtitle">
              ${this.formatForGrade('Descubrí cómo las personas y las computadoras resolvemos tareas paso a paso.')}
            </p>
          </div>

          <!-- Bity Guía Saludo -->
          <div class="bity-guide-card">
            <div class="bity-guide-avatar-holder">${getBitySvg('happy')}</div>
            <div class="bity-guide-speech">
              <div class="bity-guide-badge">🤖 BITY EL ROBOT GUÍA:</div>
              <p class="bity-guide-speech-text">
                ${this.getBityIntroMessage()}
              </p>
            </div>
          </div>

          <div class="hero-concept-layout">
            <div class="concept-illustration-card">
              <div class="concept-svg-holder">
                ${ALGORITHM_SVGS.hero_routine}
              </div>
              <p class="concept-illustration-caption">
                ${this.formatForGrade('En la vida diaria, seguimos secuencias ordenadas de pasos sin darnos cuenta.')}
              </p>
            </div>

            <div class="concept-text-column">
              <div class="definition-golden-box">
                <div class="definition-badge">📖 ${this.formatForGrade('DEFINICIÓN FUNDAMENTAL:')}</div>
                <blockquote class="definition-quote">
                  "${this.formatForGrade('Un algoritmo es un conjunto de instrucciones paso a paso para resolver un problema o completar una tarea.')}"
                </blockquote>
              </div>

              <div class="concept-key-ideas-grid">
                <div class="key-idea-card">
                  <div class="idea-icon">📋</div>
                  <div class="idea-title">${this.formatForGrade('1. Secuencia de pasos')}</div>
                  <p class="idea-desc">${this.formatForGrade('Cada acción se realiza una detrás de otra.')}</p>
                </div>
                <div class="key-idea-card">
                  <div class="idea-icon">🔢</div>
                  <div class="idea-title">${this.formatForGrade('2. Orden obligatorio')}</div>
                  <p class="idea-desc">${this.formatForGrade('Si cambiamos el orden, el resultado no funciona.')}</p>
                </div>
                <div class="key-idea-card">
                  <div class="idea-icon">🎯</div>
                  <div class="idea-title">${this.formatForGrade('3. Objetivo claro')}</div>
                  <p class="idea-desc">${this.formatForGrade('Tiene un punto de partida y una meta definida.')}</p>
                </div>
                <div class="key-idea-card">
                  <div class="idea-icon">🔍</div>
                  <div class="idea-title">${this.formatForGrade('4. Sin dudas')}</div>
                  <p class="idea-desc">${this.formatForGrade('Las instrucciones deben ser precisas y claras.')}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="section-actions-row">
            <div></div>
            <button type="button" class="btn-section-nav btn-nav-primary" data-goto="2">
              ${this.formatForGrade('CONTINUAR')} <span>▶️</span>
            </button>
          </div>
        </section>

        <!-- ========================================================
             PARTE 2: ¿POR QUÉ IMPORTA EL ORDEN? (REFLEXIÓN)
             ======================================================== -->
        <section id="alg-section-2" class="class-section" style="display: none;">
          <div class="section-header-box">
            <span class="section-tag-badge">🧼 ${this.formatForGrade('EL VALOR DEL ORDEN')}</span>
            <h2 class="section-title">${this.formatForGrade('¿POR QUÉ IMPORTA EL ORDEN?')}</h2>
            <p class="section-subtitle">
              ${this.formatForGrade('Analicemos qué ocurre si alteramos la secuencia de una rutina diaria.')}
            </p>
          </div>

          <div class="hero-concept-layout">
            <div class="concept-illustration-card">
              <div class="concept-svg-holder">
                ${ALGORITHM_SVGS.hero_teeth}
              </div>
              <p class="concept-illustration-caption">
                ${this.formatForGrade('Ejemplo cotidiano: el algoritmo para lavarse los dientes.')}
              </p>
            </div>

            <div class="reflection-interactive-card">
              <div class="reflection-question-header">
                <span class="reflection-badge">🤔 ${this.formatForGrade('PREGUNTA DE REFLEXIÓN:')}</span>
                <h3 class="reflection-question-title">
                  ${this.formatForGrade('¿Podemos cepillarnos los dientes y después ponerle la pasta al cepillo?')}
                </h3>
              </div>

              <div class="reflection-options-row">
                <button type="button" id="btn-reflection-yes" class="btn-reflection-choice">
                  <span>👍</span> ${this.formatForGrade('SÍ, DA LO MISMO')}
                </button>
                <button type="button" id="btn-reflection-no" class="btn-reflection-choice btn-choice-correct">
                  <span>👎</span> ${this.formatForGrade('NO, NO FUNCIONA')}
                </button>
              </div>

              <div id="reflection-feedback-box" class="reflection-feedback-box" style="display: none;">
                <!-- Respuesta dinámica con Bity -->
              </div>
            </div>
          </div>

          <div class="section-actions-row">
            <button type="button" class="btn-section-nav btn-nav-secondary" data-goto="1">
              <span>◀️</span> ${this.formatForGrade('ANTERIOR')}
            </button>
            <button type="button" class="btn-section-nav btn-nav-primary" data-goto="3">
              ${this.formatForGrade('¡COMENZAR ACTIVIDAD 1!')} <span>▶️</span>
            </button>
          </div>
        </section>

        <!-- ========================================================
             PARTE 3: ACTIVIDAD 1 DEL GRADO (ESPACIOS VACÍOS)
             ======================================================== -->
        <section id="alg-section-3" class="class-section" style="display: none;">
          ${this.renderActivityCardHtml(gradeActs[0], 3, 4)}
        </section>

        <!-- ========================================================
             PARTE 4: ACTIVIDAD 2 DEL GRADO (ESPACIOS VACÍOS)
             ======================================================== -->
        <section id="alg-section-4" class="class-section" style="display: none;">
          ${this.renderActivityCardHtml(gradeActs[1], 4, 5)}
        </section>

        <!-- ========================================================
             PARTE 5: ACTIVIDAD 3 DEL GRADO (ESPACIOS VACÍOS)
             ======================================================== -->
        <section id="alg-section-5" class="class-section" style="display: none;">
          ${this.renderActivityCardHtml(gradeActs[2], 5, 6)}
        </section>

        <!-- ========================================================
             PARTE 6: MI PIZARRA DIGITAL DE ALGORITMOS
             ======================================================== -->
        <section id="alg-section-6" class="class-section" style="display: none;">
          <div class="section-header-box">
            <span class="section-tag-badge">🎨 ${this.formatForGrade('ESPACIO LIBRE')}</span>
            <h2 class="section-title">${this.formatForGrade('MI PIZARRA DIGITAL')}</h2>
            <p class="section-subtitle">
              ${this.formatForGrade('Escribí cualquier algoritmo que quieras crear o pulir libremente.')}
            </p>
          </div>

          <div class="algorithm-blackboard">
            <div class="blackboard-chalk-title-bar">
              <span class="chalk-icon">🖍️</span>
              <input type="text" id="blackboard-title-input" class="blackboard-title-input" 
                     value="${this.escapeHtml(this.blackboardTitle)}" 
                     placeholder="${this.formatForGrade('TÍTULO DE MI ALGORITMO...')}">
            </div>

            <div id="blackboard-instructions-list" class="blackboard-instructions-list">
              <!-- Renglones de pizarra -->
            </div>

            <div class="blackboard-bottom-bar">
              <button type="button" id="btn-blackboard-add-row" class="btn-blackboard-action">
                <span>➕</span> ${this.formatForGrade('AGREGAR INSTRUCCIÓN')}
              </button>
              <button type="button" id="btn-blackboard-save" class="btn-blackboard-action btn-blackboard-primary">
                <span>💾</span> ${this.formatForGrade('GUARDAR EN PIZARRA')}
              </button>
            </div>
          </div>

          <div class="section-actions-row">
            <button type="button" class="btn-section-nav btn-nav-secondary" data-goto="5">
              <span>◀️</span> ${this.formatForGrade('ACTIVIDAD 3')}
            </button>
            <button type="button" class="btn-section-nav btn-nav-primary" data-goto="7">
              ${this.formatForGrade('COMPARTIR EN EL AULA')} <span>▶️</span>
            </button>
          </div>
        </section>

        <!-- ========================================================
             PARTE 7: COMPARTIR Y EXPOSICIÓN EN EL AULA
             ======================================================== -->
        <section id="alg-section-7" class="class-section" style="display: none;">
          <div class="section-header-box">
            <span class="section-tag-badge">📢 ${this.formatForGrade('PRESENTACIÓN Y CELEBRACIÓN')}</span>
            <h2 class="section-title">${this.formatForGrade('¡COMPARTÍ TUS ALGORITMOS!')}</h2>
            <p class="section-subtitle">
              ${this.formatForGrade('Elegí cuál de tus algoritmos querés proyectar, copiar o imprimir para el aula.')}
            </p>
          </div>

          <div class="presentation-selector-card">
            <h3 class="selector-title">🎓 ${this.formatForGrade('SELECCIONÁ EL ALGORITMO PARA COMPARTIR:')}</h3>
            <div class="presentation-buttons-grid">
              <button type="button" class="btn-pres-pick" data-pick-src="act1">
                <span>🎒</span> ${this.formatForGrade(gradeActs[0].title)}
              </button>
              <button type="button" class="btn-pres-pick" data-pick-src="act2">
                <span>🧼</span> ${this.formatForGrade(gradeActs[1].title)}
              </button>
              <button type="button" class="btn-pres-pick" data-pick-src="act3">
                <span>⭐</span> ${this.formatForGrade(gradeActs[2].title)}
              </button>
              <button type="button" class="btn-pres-pick" data-pick-src="blackboard">
                <span>🖍️</span> ${this.formatForGrade('Mi Pizarra Digital')}
              </button>
            </div>
          </div>

          <div class="section-actions-row">
            <button type="button" class="btn-section-nav btn-nav-secondary" data-goto="6">
              <span>◀️</span> ${this.formatForGrade('MI PIZARRA')}
            </button>
            <button type="button" id="btn-alg-finish-class" class="btn-section-nav btn-nav-primary">
              <span>🏁</span> ${this.formatForGrade('FINALIZAR CLASE Y VOLVER')}
            </button>
          </div>
        </section>

        <!-- MODAL DE PRESENTACIÓN PARA EL AULA -->
        <div id="modal-algorithm-presentation" class="modal-presentation-overlay" style="display: none;" aria-hidden="true">
          <div class="modal-presentation-card">
            <div class="modal-presentation-header">
              <div class="modal-header-info">
                <span class="modal-badge">📢 ${this.formatForGrade('EXPOSICIÓN EN EL AULA')}</span>
                <h2 id="pres-modal-title" class="modal-title">MI ALGORITMO</h2>
              </div>
              <button type="button" id="btn-close-presentation-modal" class="btn-modal-close" title="Cerrar ventana">✖</button>
            </div>

            <div id="pres-modal-steps-list" class="modal-presentation-steps">
              <!-- Pasos presentados -->
            </div>

            <div class="modal-presentation-footer">
              <button type="button" id="btn-modal-copy-text" class="btn-modal-action btn-copy-action">
                <span>📋</span> ${this.formatForGrade('COPIAR TEXTO')}
              </button>
              <button type="button" id="btn-modal-print" class="btn-modal-action btn-print-action">
                <span>🖨️</span> ${this.formatForGrade('IMPRIMIR')}
              </button>
              <button type="button" id="btn-modal-dismiss" class="btn-modal-action btn-dismiss-action">
                ${this.formatForGrade('CERRAR')}
              </button>
            </div>
          </div>
        </div>
      `;
    }

    /**
     * Devuelve el mensaje inicial de Bity adaptado por grado
     */
    getBityIntroMessage() {
      if (this.currentGrade === 1) {
        return this.formatForGrade('¡HOLA! HOY VAMOS A APRENDER A DAR INSTRUCCIONES EN EL ORDEN CORRECTO. EN LAS ACTIVIDADES, LOS PASOS ESTÁN VACÍOS PARA QUE VOS LOS ESCRIBAS.');
      } else if (this.currentGrade === 2) {
        return this.formatForGrade('¡Bienvenidos! Un algoritmo es como una receta: si nos salteamos un paso o cambiamos el orden, el resultado no sale bien. ¡A escribir tus propias secuencias!');
      } else if (this.currentGrade === 3) {
        return this.formatForGrade('¡Hola, programadores de 3.º! Resolver problemas requiere planificar acciones precisas. Hoy van a crear algoritmos completos con sus propios pasos.');
      } else if (this.currentGrade === 4) {
        return this.formatForGrade('¡Atención 4.º grado! Hoy damos un paso clave: incorporamos DECISIONES con "SI ocurre esto, ENTONCES aquello". ¡A escribir algoritmos inteligentes!');
      } else {
        return this.formatForGrade('¡Bienvenidos, maestros de 5.º! Hoy programamos algoritmos avanzados que combinan DECISIONES lógicas y REPETICIONES (bucles). ¡A pensar y construir!');
      }
    }

    /**
     * Genera la tarjeta HTML para una de las actividades prácticas con espacios vacíos
     */
    renderActivityCardHtml(act, stepNum, nextStepNum) {
      const isG1 = this.currentGrade === 1;
      const gradeLabel = isG1 ? '1.º GRADO 🐣' : `${this.currentGrade}.º Grado 💻`;

      return `
        <div class="section-header-box">
          <span class="section-tag-badge">✏️ ${this.formatForGrade('ACTIVIDAD ' + act.num)}</span>
          <h2 class="section-title">${this.formatForGrade(act.title)}</h2>
          <p class="section-subtitle">
            ${this.formatForGrade('Construí tu propia secuencia de pasos ordenados.')}
          </p>
        </div>

        <article class="alg-activity-card">
          <div class="alg-activity-header">
            <div class="alg-activity-icon">${act.icon}</div>
            <div class="alg-activity-title-group">
              <span class="alg-activity-tag">${this.formatForGrade('ACTIVIDAD ' + act.num + ' • ' + gradeLabel)}</span>
              <h3 class="alg-activity-title">${this.formatForGrade(act.title)}</h3>
            </div>
          </div>

          <div class="alg-activity-context">
            <p>${this.formatForGrade(act.context)}</p>
          </div>

          <div class="alg-activity-consigna-box">
            <span class="consigna-badge">📋 ${this.formatForGrade('CONSIGNA:')}</span>
            <p class="consigna-text">${this.formatForGrade(act.prompt)}</p>
          </div>

          <!-- Pistas de Bity fuera de los renglones (sin respuestas completadas) -->
          <div class="alg-activity-hints-box">
            <div class="hints-header">
              <span class="hints-icon">💡</span>
              <strong>${this.formatForGrade('Pistas orientativas de Bity (pensá antes de escribir):')}</strong>
            </div>
            <ul class="hints-list">
              ${act.hints.map(h => `<li>${this.formatForGrade(h)}</li>`).join('')}
            </ul>
          </div>

          <!-- Espacio de Edición: ESPACIOS VACÍOS -->
          <div class="alg-editor-workspace">
            <h4 class="workspace-heading">✏️ ${this.formatForGrade('COMPLETÁ TU ALGORITMO:')}</h4>
            <p class="workspace-subheading">
              ${this.formatForGrade('Escribí cada instrucción en orden lógico. Podés agregar o eliminar pasos cuando lo necesites.')}
            </p>

            <div class="alg-steps-list" id="steps-list-${act.id}">
              <!-- Los renglones vacíos se montan dinámicamente -->
            </div>

            <div class="alg-editor-actions">
              <button type="button" class="btn-alg-add-step" data-act-id="${act.id}">
                <span>➕</span> ${this.formatForGrade('Agregar otro paso')}
              </button>
              <button type="button" class="btn-alg-save-activity" data-act-id="${act.id}">
                <span>💾</span> ${this.formatForGrade('Guardar y Comprobar Algoritmo')}
              </button>
            </div>

            <!-- Feedback pedagógico formativo de Bity -->
            <div class="alg-feedback-box" id="feedback-${act.id}" style="display: none;"></div>
          </div>
        </article>

        <div class="section-actions-row">
          <button type="button" class="btn-section-nav btn-nav-secondary" data-goto="${stepNum - 1}">
            <span>◀️</span> ${this.formatForGrade('ANTERIOR')}
          </button>
          <button type="button" class="btn-section-nav btn-nav-primary" data-goto="${nextStepNum}">
            ${this.formatForGrade('SIGUIENTE')} <span>▶️</span>
          </button>
        </div>
      `;
    }

    /**
     * Renderiza los renglones de pasos de una actividad en el DOM
     */
    renderActivitySteps(actId) {
      const container = document.getElementById(`steps-list-${actId}`);
      if (!container) return;

      const steps = this.activitiesData[actId] || [];
      container.innerHTML = '';

      steps.forEach((stepText, idx) => {
        const row = document.createElement('div');
        row.className = 'step-input-row';
        row.innerHTML = `
          <span class="step-input-label">${this.formatForGrade('PASO')} ${idx + 1}</span>
          <input type="text" 
                 class="step-text-input" 
                 data-act-id="${actId}" 
                 data-step-idx="${idx}" 
                 value="${this.escapeHtml(stepText)}" 
                 placeholder="${this.formatForGrade('Escribí este paso...')}" 
                 autocomplete="off">
          ${steps.length > 2 ? `
            <button type="button" 
                    class="btn-remove-step" 
                    data-act-id="${actId}" 
                    data-remove-idx="${idx}" 
                    title="${this.formatForGrade('Eliminar este paso')}">
              🗑️
            </button>
          ` : ''}
        `;

        // Tipeo del alumno: autosave en tiempo real
        const input = row.querySelector('.step-text-input');
        input.oninput = (e) => {
          this.activitiesData[actId][idx] = e.target.value;
          this.saveActivityDraft(actId);
        };

        // Eliminar paso
        const removeBtn = row.querySelector('.btn-remove-step');
        if (removeBtn) {
          removeBtn.onclick = () => {
            this.removeActivityStep(actId, idx);
          };
        }

        container.appendChild(row);
      });
    }

    /**
     * Agrega un paso nuevo completamente vacío
     */
    addActivityStep(actId) {
      if (!this.activitiesData[actId]) {
        this.activitiesData[actId] = [];
      }
      this.activitiesData[actId].push('');
      if (window.MagicAudioEngine) window.MagicAudioEngine.playClick();
      this.renderActivitySteps(actId);
      this.saveActivityDraft(actId);

      // Enfocar el nuevo renglón vacío
      const container = document.getElementById(`steps-list-${actId}`);
      if (container) {
        const inputs = container.querySelectorAll('.step-text-input');
        const lastInput = inputs[inputs.length - 1];
        if (lastInput) lastInput.focus();
      }
    }

    /**
     * Elimina un paso
     */
    removeActivityStep(actId, idx) {
      if (!this.activitiesData[actId]) return;
      this.activitiesData[actId].splice(idx, 1);
      if (window.MagicAudioEngine) window.MagicAudioEngine.playTrash();
      this.renderActivitySteps(actId);
      this.saveActivityDraft(actId);
    }

    /**
     * Evalúa pedagógicamente el algoritmo construido por el estudiante
     * No exige respuestas exactas: evalúa sentido, orden, objetivo y claridad
     */
    evaluateAlgorithm(act, steps) {
      const cleanSteps = steps.map(s => (s || '').trim()).filter(s => s.length > 0);

      if (cleanSteps.length === 0) {
        return {
          success: false,
          mood: 'thinking',
          title: '¡Los pasos están vacíos!',
          message: 'Pensá qué hacés primero y qué hacés después, y escribí cada instrucción en los renglones correspondientes.'
        };
      }

      if (cleanSteps.length < 2) {
        return {
          success: false,
          mood: 'thinking',
          title: 'Faltan instrucciones',
          message: 'Un algoritmo es una secuencia de varias instrucciones ordenadas. Escribí al menos 2 o 3 pasos para completar la tarea.'
        };
      }

      // Verificar longitud mínima de claridad
      const hasTooShort = cleanSteps.some(s => s.length < 3);
      if (hasTooShort) {
        return {
          success: false,
          mood: 'thinking',
          title: 'Instrucciones poco claras',
          message: 'Algunos de tus pasos son muy cortitos. Explicá con mayor claridad qué acción debe realizarse (usando verbos como abrir, guardar, lavar, poner, etc.).'
        };
      }

      const allText = cleanSteps.join(' ').toLowerCase();

      // Reglas pedagógicas específicas por grado y actividad:
      if (act.id.includes('mochila')) {
        // ¿Cerró antes de guardar?
        const closeIdx = cleanSteps.findIndex(s => s.toLowerCase().includes('cerrar'));
        const putIdx = cleanSteps.findIndex(s => s.toLowerCase().includes('guardar') || s.toLowerCase().includes('meter') || s.toLowerCase().includes('poner'));
        if (closeIdx !== -1 && putIdx !== -1 && closeIdx < putIdx) {
          return {
            success: false,
            mood: 'thinking',
            title: 'Revisá el orden lógico',
            message: '💡 Pista para reflexionar: ¿Tiene sentido cerrar la mochila antes de guardar los cuadernos? Fijate si te conviene cambiar el orden de esos pasos.'
          };
        }
      } else if (act.id.includes('manos')) {
        // ¿Secó antes de lavar/enjabonar?
        const dryIdx = cleanSteps.findIndex(s => s.toLowerCase().includes('secar') || s.toLowerCase().includes('toalla'));
        const soapIdx = cleanSteps.findIndex(s => s.toLowerCase().includes('jabon') || s.toLowerCase().includes('jabón') || s.toLowerCase().includes('lavar'));
        if (dryIdx !== -1 && soapIdx !== -1 && dryIdx < soapIdx) {
          return {
            success: false,
            mood: 'thinking',
            title: 'Revisá el orden de los pasos',
            message: '💡 Pista para reflexionar: ¿Nos secamos las manos antes de ponernos el jabón o al final con la toalla? ¡Revisá el orden!'
          };
        }
      } else if (act.id.includes('dormir')) {
        // ¿Dormir como primer paso?
        const sleepIdx = cleanSteps.findIndex(s => s.toLowerCase().includes('dormir'));
        const brushIdx = cleanSteps.findIndex(s => s.toLowerCase().includes('diente') || s.toLowerCase().includes('cepill'));
        if (sleepIdx === 0 && brushIdx > 0) {
          return {
            success: false,
            mood: 'thinking',
            title: 'Revisá la secuencia',
            message: '💡 Pista para reflexionar: Si ya te dormiste, ¿podés cepillarte los dientes después? ¡Pensá qué cosas hacés antes de acostarte!'
          };
        }
      } else if (act.id.includes('clima') || act.id.includes('lluvia') || act.id.includes('decision')) {
        // 4.º Grado: Decisiones condicionales
        const hasIfThen = allText.includes('si ') || allText.includes('si,') || allText.includes('entonces') || allText.includes('sino') || allText.includes('depende') || allText.includes('frio') || allText.includes('frío') || allText.includes('calor') || allText.includes('llueve');
        if (!hasIfThen) {
          return {
            success: false,
            mood: 'thinking',
            title: '¡Agregá una decisión!',
            message: '💡 En 4.º grado aprendemos a incluir DECISIONES. Probá incluir frases como "SI hace frío, ENTONCES..." o "SI llueve, ENTONCES..." para contemplar diferentes situaciones.'
          };
        }
      } else if (act.id.includes('trivia') || act.id.includes('par_impar') || act.id.includes('repetir')) {
        // 5.º Grado: Condiciones y repeticiones
        if (act.id.includes('par_impar')) {
          const hasMathLogic = allText.includes('2') || allText.includes('dos') || allText.includes('divid') || allText.includes('resto') || allText.includes('residuo') || allText.includes('termina') || allText.includes('cifra') || allText.includes('par');
          if (!hasMathLogic) {
            return {
              success: false,
              mood: 'thinking',
              title: 'Pensá en la regla matemática',
              message: '💡 ¿Cómo sabemos si un número es par? Pensá en dividir entre 2 (y ver si el resto es 0) o mirar la última cifra (0, 2, 4, 6, 8).'
            };
          }
        } else if (act.id.includes('repetir')) {
          const hasLoop = allText.includes('repetir') || allText.includes('hasta') || allText.includes('mientras') || allText.includes('otra vez') || allText.includes('bucle') || allText.includes('cada vez');
          if (!hasLoop) {
            return {
              success: false,
              mood: 'thinking',
              title: 'Incluí la repetición',
              message: '💡 En este desafío es fundamental usar un BUCLE o REPETICIÓN. Escribí una instrucción como "REPETIR [la acción] HASTA QUE [se cumpla la meta]".'
            };
          }
        }
      }

      // Si supera las comprobaciones, es un algoritmo válido y creativo
      return {
        success: true,
        mood: 'celebrating',
        title: '¡Excelente algoritmo!',
        message: '¡Gran trabajo! Creaste una secuencia de instrucciones ordenada, clara y que cumple con el objetivo. ¡Tus pasos tienen pleno sentido lógico!'
      };
    }

    /**
     * Guarda y comprueba la actividad
     */
    saveAndCheckActivity(actId) {
      const gradeActs = GRADE_ALGORITHMS_ACTIVITIES[this.currentGrade] || GRADE_ALGORITHMS_ACTIVITIES[1];
      const act = gradeActs.find(a => a.id === actId);
      if (!act) return;

      const steps = this.activitiesData[actId] || [];
      const evalResult = this.evaluateAlgorithm(act, steps);

      const feedbackBox = document.getElementById(`feedback-${actId}`);
      if (!feedbackBox) return;

      feedbackBox.style.display = 'block';
      feedbackBox.className = `alg-feedback-box ${evalResult.success ? 'feedback-success' : 'feedback-hint'}`;

      const cleanSteps = steps.map(s => (s || '').trim()).filter(s => s.length > 0);
      const stepIdxInClass = gradeActs.findIndex(a => a.id === actId); // 0, 1, 2 -> correspond to step 3, 4, 5

      feedbackBox.innerHTML = `
        <div class="feedback-bity-row">
          <div class="feedback-bity-avatar">${getBitySvg(evalResult.mood)}</div>
          <div class="feedback-bity-content">
            <h4 class="feedback-bity-title">${this.formatForGrade(evalResult.title)}</h4>
            <p class="feedback-bity-text">${this.formatForGrade(evalResult.message)}</p>
            ${evalResult.success ? `
              <div class="feedback-next-action">
                <button type="button" class="btn-feedback-next" data-goto="${stepIdxInClass + 4}">
                  <span>▶️</span> ${this.formatForGrade('¡CONTINUAR AL SIGUIENTE PASO!')}
                </button>
              </div>
            ` : ''}
          </div>
        </div>
      `;

      // Listener para el botón siguiente dentro del feedback
      const nextBtn = feedbackBox.querySelector('.btn-feedback-next');
      if (nextBtn) {
        nextBtn.onclick = () => {
          const nextStep = parseInt(nextBtn.getAttribute('data-goto'));
          if (nextStep) this.goToStep(nextStep);
        };
      }

      if (evalResult.success) {
        if (window.MagicAudioEngine) window.MagicAudioEngine.playVictory();
        
        // Guardar actividad completada
        try {
          localStorage.setItem(`lego_alg_act_g${this.currentGrade}_${actId}`, JSON.stringify({
            steps: cleanSteps,
            isCompleted: true,
            savedAt: Date.now()
          }));
        } catch (e) {}

        this.completedSteps.add(stepIdxInClass + 3);
        this.saveProgress();
      } else {
        if (window.MagicAudioEngine) window.MagicAudioEngine.playPop();
      }
    }

    /**
     * Renderiza los renglones de la Pizarra Digital (Parte 6)
     */
    renderBlackboardRows() {
      const container = document.getElementById('blackboard-instructions-list');
      if (!container) return;

      container.innerHTML = '';
      this.blackboardSteps.forEach((stepText, idx) => {
        const row = document.createElement('div');
        row.className = 'blackboard-instruction-row';
        row.innerHTML = `
          <span class="chalk-num">${idx + 1}</span>
          <input type="text" class="chalk-instruction-input" 
                 value="${this.escapeHtml(stepText)}" 
                 placeholder="${this.formatForGrade('Escribí la instrucción...')}" 
                 data-b-idx="${idx}">
          ${this.blackboardSteps.length > 2 ? `
            <button type="button" class="btn-remove-step" data-b-remove="${idx}" title="${this.formatForGrade('Eliminar esta instrucción')}">
              🗑️
            </button>
          ` : ''}
        `;

        row.querySelector('.chalk-instruction-input').oninput = (e) => {
          this.blackboardSteps[idx] = e.target.value;
          this.saveBlackboardDraft();
        };

        const removeBtn = row.querySelector('.btn-remove-step');
        if (removeBtn) {
          removeBtn.onclick = () => {
            this.blackboardSteps.splice(idx, 1);
            this.renderBlackboardRows();
            this.saveBlackboardDraft();
          };
        }

        container.appendChild(row);
      });
    }

    blackboardAddRow() {
      this.blackboardSteps.push('');
      if (window.MagicAudioEngine) window.MagicAudioEngine.playClick();
      this.renderBlackboardRows();
      this.saveBlackboardDraft();
    }

    saveBlackboardDraft() {
      try {
        const titleInput = document.getElementById('blackboard-title-input');
        if (titleInput) this.blackboardTitle = titleInput.value;
        localStorage.setItem(`lego_alg_blackboard_g${this.currentGrade}`, JSON.stringify({
          title: this.blackboardTitle,
          steps: this.blackboardSteps
        }));
      } catch (e) {}
    }

    saveBlackboard() {
      this.saveBlackboardDraft();
      const cleanSteps = this.blackboardSteps.map(s => (s || '').trim()).filter(s => s.length > 0);
      if (cleanSteps.length < 2) {
        alert(this.formatForGrade('Por favor escribí al menos 2 instrucciones en tu pizarra digital antes de guardar.'));
        return;
      }
      if (window.MagicAudioEngine) window.MagicAudioEngine.playVictory();
      this.completedSteps.add(6);
      this.saveProgress();
      alert(this.formatForGrade('¡Tu algoritmo fue guardado exitosamente en la pizarra digital!'));
    }

    /**
     * Vincula listeners de eventos
     */
    attachEventListeners() {
      // Volver al temario
      const btnBackSyllabus = document.getElementById('btn-alg-back-syllabus');
      if (btnBackSyllabus) {
        btnBackSyllabus.onclick = () => this.exitToSyllabus();
      }

      // Píldoras de progreso
      document.querySelectorAll('.step-pill').forEach(pill => {
        pill.onclick = () => {
          const step = parseInt(pill.getAttribute('data-step'));
          if (step) {
            if (window.MagicAudioEngine) window.MagicAudioEngine.playClick();
            this.goToStep(step);
          }
        };
      });

      // Botones de navegación siguiente/anterior
      document.querySelectorAll('.btn-section-nav[data-goto]').forEach(btn => {
        btn.onclick = () => {
          const targetStep = parseInt(btn.getAttribute('data-goto'));
          if (targetStep) {
            if (window.MagicAudioEngine) window.MagicAudioEngine.playClick();
            this.goToStep(targetStep);
          }
        };
      });

      // Pregunta de reflexión Parte 2
      const btnReflectYes = document.getElementById('btn-reflection-yes');
      const btnReflectNo = document.getElementById('btn-reflection-no');
      if (btnReflectYes && btnReflectNo) {
        btnReflectYes.onclick = () => this.handleReflection('yes');
        btnReflectNo.onclick = () => this.handleReflection('no');
      }

      // Botones de agregar paso en actividades
      document.querySelectorAll('.btn-alg-add-step').forEach(btn => {
        btn.onclick = () => {
          const actId = btn.getAttribute('data-act-id');
          if (actId) this.addActivityStep(actId);
        };
      });

      // Botones de guardar y comprobar actividad
      document.querySelectorAll('.btn-alg-save-activity').forEach(btn => {
        btn.onclick = () => {
          const actId = btn.getAttribute('data-act-id');
          if (actId) this.saveAndCheckActivity(actId);
        };
      });

      // Pizarra Digital
      const btnBbAdd = document.getElementById('btn-blackboard-add-row');
      const btnBbSave = document.getElementById('btn-blackboard-save');
      if (btnBbAdd) btnBbAdd.onclick = () => this.blackboardAddRow();
      if (btnBbSave) btnBbSave.onclick = () => this.saveBlackboard();

      // Botones de selección de algoritmo para presentar (Parte 7)
      document.querySelectorAll('.btn-pres-pick').forEach(btn => {
        btn.onclick = () => {
          const src = btn.getAttribute('data-pick-src');
          this.openPresentationModal(src);
        };
      });

      // Finalizar clase y volver
      const btnFinish = document.getElementById('btn-alg-finish-class');
      if (btnFinish) {
        btnFinish.onclick = () => {
          this.completedSteps.add(7);
          this.saveProgress();
          this.exitToSyllabus();
        };
      }

      // Modal de presentación
      const btnCloseModal = document.getElementById('btn-close-presentation-modal');
      const btnDismissModal = document.getElementById('btn-modal-dismiss');
      const btnCopyModal = document.getElementById('btn-modal-copy-text');
      const btnPrintModal = document.getElementById('btn-modal-print');

      if (btnCloseModal) btnCloseModal.onclick = () => this.closePresentationModal();
      if (btnDismissModal) btnDismissModal.onclick = () => this.closePresentationModal();
      if (btnCopyModal) btnCopyModal.onclick = () => this.copyPresentationText();
      if (btnPrintModal) btnPrintModal.onclick = () => window.print();
    }

    /**
     * Navega a un paso específico (1 a 7)
     */
    goToStep(step) {
      if (step < 1 || step > 7) return;
      this.currentStep = step;
      this.saveProgress();
      this.renderStep(step);
    }

    /**
     * Muestra la sección correspondiente al paso y actualiza la UI
     */
    renderStep(step) {
      for (let s = 1; s <= 7; s++) {
        const sec = document.getElementById(`alg-section-${s}`);
        if (sec) {
          sec.style.display = (s === step) ? 'block' : 'none';
        }
      }

      // Marcar paso 1 y 2 completados al ser visitados
      if (step >= 2) this.completedSteps.add(1);
      if (step >= 3) this.completedSteps.add(2);

      this.updateProgressUi();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Actualiza la barra de progreso y las píldoras
     */
    updateProgressUi() {
      const stepLabel = document.getElementById('alg-current-step-label');
      const pctBadge = document.getElementById('alg-progress-pct');
      const barFill = document.getElementById('alg-progress-bar-fill');

      if (stepLabel) {
        stepLabel.textContent = this.formatForGrade(`PASO ${this.currentStep} DE 7`);
      }

      const totalSteps = 7;
      const count = this.completedSteps.size;
      const pct = Math.min(100, Math.max(14, Math.round((count / totalSteps) * 100)));

      if (pctBadge) pctBadge.textContent = `${pct}%`;
      if (barFill) barFill.style.width = `${pct}%`;

      document.querySelectorAll('.step-pill').forEach(pill => {
        const s = parseInt(pill.getAttribute('data-step'));
        pill.classList.toggle('active', s === this.currentStep);
        pill.classList.toggle('completed', this.completedSteps.has(s));
      });
    }

    /**
     * Maneja la pregunta de reflexión en Parte 2
     */
    handleReflection(choice) {
      const fb = document.getElementById('reflection-feedback-box');
      if (!fb) return;

      fb.style.display = 'block';
      if (choice === 'no') {
        if (window.MagicAudioEngine) window.MagicAudioEngine.playVictory();
        fb.innerHTML = `
          <div class="feedback-bity-row">
            <div class="feedback-bity-avatar">${getBitySvg('happy')}</div>
            <div class="feedback-bity-content">
              <h4 class="feedback-bity-title">${this.formatForGrade('¡EXACTO! EL ORDEN ES INDISPENSABLE')}</h4>
              <p class="feedback-bity-text">${this.formatForGrade('¡Muy bien pensado! La pasta debe estar en el cepillo ANTES de cepillarse los dientes. Si cambiamos el orden, el cepillo seco no limpia igual y desperdiciamos la pasta.')}</p>
            </div>
          </div>
        `;
        this.completedSteps.add(2);
        this.saveProgress();
      } else {
        if (window.MagicAudioEngine) window.MagicAudioEngine.playPop();
        fb.innerHTML = `
          <div class="feedback-bity-row">
            <div class="feedback-bity-avatar">${getBitySvg('thinking')}</div>
            <div class="feedback-bity-content">
              <h4 class="feedback-bity-title">${this.formatForGrade('PENSÉMOSLO UN SEGUNDO...')}</h4>
              <p class="feedback-bity-text">${this.formatForGrade('Imaginá que te cepillás con el cepillo seco y recién después le ponés pasta... ¡La pasta te quedaría en la boca sin frotar! En los algoritmos, el orden es obligatorio.')}</p>
            </div>
          </div>
        `;
      }
    }

    /**
     * Abre el modal de presentación para el aula
     */
    openPresentationModal(sourceKey = 'act1') {
      const modal = document.getElementById('modal-algorithm-presentation');
      const titleEl = document.getElementById('pres-modal-title');
      const stepsListEl = document.getElementById('pres-modal-steps-list');

      if (!modal || !titleEl || !stepsListEl) return;

      let title = '';
      let steps = [];

      const gradeActs = GRADE_ALGORITHMS_ACTIVITIES[this.currentGrade] || GRADE_ALGORITHMS_ACTIVITIES[1];

      if (sourceKey === 'act1') {
        title = gradeActs[0].title;
        steps = this.activitiesData[gradeActs[0].id] || [];
      } else if (sourceKey === 'act2') {
        title = gradeActs[1].title;
        steps = this.activitiesData[gradeActs[1].id] || [];
      } else if (sourceKey === 'act3') {
        title = gradeActs[2].title;
        steps = this.activitiesData[gradeActs[2].id] || [];
      } else if (sourceKey === 'blackboard') {
        title = this.blackboardTitle || 'Mi Pizarra Digital';
        steps = this.blackboardSteps || [];
      }

      const cleanSteps = steps.map(s => (s || '').trim()).filter(s => s.length > 0);

      if (cleanSteps.length === 0) {
        alert(this.formatForGrade('Este algoritmo no tiene pasos escritos todavía. ¡Completá los pasos en su actividad antes de presentarlo!'));
        return;
      }

      this.currentPresentationText = `${title}\n\n` + cleanSteps.map((s, idx) => `${idx + 1}. ${s}`).join('\n');

      titleEl.textContent = this.formatForGrade(title);
      stepsListEl.innerHTML = cleanSteps.map((s, idx) => `
        <div class="presentation-step-card">
          <span class="presentation-step-num">${idx + 1}</span>
          <span class="presentation-step-text">${this.formatForGrade(s)}</span>
        </div>
      `).join('');

      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');

      if (window.MagicAudioEngine) window.MagicAudioEngine.playVictory();
      this.completedSteps.add(7);
      this.saveProgress();
    }

    closePresentationModal() {
      const modal = document.getElementById('modal-algorithm-presentation');
      if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
      }
    }

    copyPresentationText() {
      if (!this.currentPresentationText) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(this.currentPresentationText).then(() => {
          alert(this.formatForGrade('¡Copiado con éxito! Ahora podés pegarlo en cualquier aplicación o documento para compartirlo.'));
        }).catch(() => {
          this.fallbackCopy(this.currentPresentationText);
        });
      } else {
        this.fallbackCopy(this.currentPresentationText);
      }
    }

    fallbackCopy(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      alert(this.formatForGrade('¡Copiado con éxito!'));
    }
  }

  // Exportar globalmente
  global.AlgorithmsModule = AlgorithmsModule;
  global.algorithmsModule = new AlgorithmsModule();

})(typeof window !== 'undefined' ? window : this);
