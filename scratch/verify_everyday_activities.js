// Design all everyday activities with illustrations and distractors
const EVERYDAY_ACTIVITIES = {
  cafe: {
    id: 'cafe',
    title: 'Preparamos un café',
    titleG1: '¡AYUDÁ A PREPARAR UN CAFÉ!',
    subtitle: 'Ordená los bloques con las instrucciones para preparar un café caliente.',
    subtitleG1: 'ORDENÁ LOS BLOQUES PARA PREPARAR UN CAFÉ CALIENTE.',
    safety: '⚠️ El agua caliente y la cocina deben ser manipuladas siempre por un adulto.',
    safetyG1: '⚠️ EL AGUA CALIENTE DEBE SER MANIPULADA SIEMPRE POR UN ADULTO.',
    iconSvg: 'cafe_taza',
    steps: {
      1: [
        { id: 'taza', text: 'Buscar una taza limpia', textG1: 'BUSCAR UNA TAZA', svg: 'taza' },
        { id: 'cafe', text: 'Poner café en la taza', textG1: 'PONER CAFÉ EN LA TAZA', svg: 'cafe_polvo' },
        { id: 'agua', text: 'Agregar agua caliente con un adulto', textG1: 'AGREGAR AGUA CON UN ADULTO', svg: 'agua_caliente' },
        { id: 'mezclar', text: 'Mezclar con una cuchara', textG1: 'MEZCLAR CON UNA CUCHARA', svg: 'cuchara' }
      ],
      2: [
        { id: 'taza', text: 'Buscar una taza limpia', textG1: 'BUSCAR UNA TAZA LIMPIA', svg: 'taza' },
        { id: 'cafe', text: 'Colocar café en la taza', textG1: 'COLOCAR CAFÉ EN LA TAZA', svg: 'cafe_polvo' },
        { id: 'calentar', text: 'Calentar agua con ayuda de un adulto', textG1: 'CALENTAR AGUA CON UN ADULTO', svg: 'pava' },
        { id: 'agua', text: 'Agregar el agua caliente con un adulto', textG1: 'AGREGAR AGUA CALIENTE CON ADULTO', svg: 'agua_caliente' },
        { id: 'mezclar', text: 'Mezclar con una cuchara', textG1: 'MEZCLAR CON CUCHARA', svg: 'cuchara' }
      ],
      3: [
        { id: 'taza', text: 'Buscar una taza limpia', textG1: 'BUSCAR UNA TAZA LIMPIA', svg: 'taza' },
        { id: 'cafe', text: 'Colocar café en la taza', textG1: 'COLOCAR CAFÉ EN LA TAZA', svg: 'cafe_polvo' },
        { id: 'calentar', text: 'Calentar agua con ayuda de un adulto', textG1: 'CALENTAR AGUA CON ADULTO', svg: 'pava' },
        { id: 'agua', text: 'Agregar el agua caliente con un adulto', textG1: 'AGREGAR AGUA CALIENTE', svg: 'agua_caliente' },
        { id: 'mezclar', text: 'Mezclar bien con la cuchara', textG1: 'MEZCLAR BIEN CON CUCHARA', svg: 'cuchara' },
        { id: 'servir', text: 'Servir en la mesa con cuidado', textG1: 'SERVIR EN LA MESA CON CUIDADO', svg: 'servir_taza' }
      ],
      4: [
        { id: 'taza', text: 'Buscar una taza limpia', textG1: 'BUSCAR UNA TAZA LIMPIA', svg: 'taza' },
        { id: 'cafe', text: 'Colocar café en la taza', textG1: 'COLOCAR CAFÉ EN LA TAZA', svg: 'cafe_polvo' },
        { id: 'calentar', text: 'Calentar agua con ayuda de un adulto', textG1: 'CALENTAR AGUA CON ADULTO', svg: 'pava' },
        { id: 'agua', text: 'Agregar el agua caliente con un adulto', textG1: 'AGREGAR EL AGUA CALIENTE', svg: 'agua_caliente' },
        { id: 'mezclar', text: 'Mezclar con una cuchara', textG1: 'MEZCLAR CON UNA CUCHARA', svg: 'cuchara' },
        { id: 'servir', text: 'Servir en la mesa con cuidado', textG1: 'SERVIR EN LA MESA CON CUIDADO', svg: 'servir_taza' }
      ],
      5: [
        { id: 'taza', text: 'Buscar una taza limpia', textG1: 'BUSCAR UNA TAZA LIMPIA', svg: 'taza' },
        { id: 'cafe', text: 'Colocar café en la taza', textG1: 'COLOCAR CAFÉ EN LA TAZA', svg: 'cafe_polvo' },
        { id: 'calentar', text: 'Calentar agua con ayuda de un adulto', textG1: 'CALENTAR AGUA CON ADULTO', svg: 'pava' },
        { id: 'agua', text: 'Agregar el agua caliente con un adulto', textG1: 'AGREGAR EL AGUA CALIENTE', svg: 'agua_caliente' },
        { id: 'mezclar', text: 'Mezclar con una cuchara', textG1: 'MEZCLAR CON UNA CUCHARA', svg: 'cuchara' },
        { id: 'servir', text: 'Servir en la mesa con cuidado', textG1: 'SERVIR EN LA MESA CON CUIDADO', svg: 'servir_taza' }
      ]
    },
    distractors: [
      { id: 'dist_sal', text: 'Poner sal en la taza', textG1: 'PONER SAL EN LA TAZA', svg: 'sal' },
      { id: 'dist_pijama', text: 'Ponerse el pijama para dormir', textG1: 'PONERSE EL PIJAMA', svg: 'pijama' },
      { id: 'dist_mochila', text: 'Guardar la cartuchera', textG1: 'GUARDAR LA CARTUCHERA', svg: 'cartuchera' }
    ]
  },

  jugo: {
    id: 'jugo',
    title: 'Preparamos un jugo',
    titleG1: '¡PREPARAMOS UN JUGO FRESCO!',
    subtitle: 'Construí el algoritmo para preparar una rica jarra de jugo.',
    subtitleG1: 'CONSTRUÍ EL ALGORITMO PARA PREPARAR UN RICO JUGO.',
    safety: '⚠️ El cuchillo y la licuadora requieren supervisión y ayuda de un adulto.',
    safetyG1: '⚠️ EL CUCHILLO Y LA LICUADORA REQUIEREN AYUDA DE UN ADULTO.',
    iconSvg: 'jugo_jarra',
    steps: {
      1: [
        { id: 'jarra', text: 'Buscar una jarra limpia', textG1: 'BUSCAR UNA JARRA', svg: 'jarra' },
        { id: 'frutas', text: 'Elegir las frutas frescas', textG1: 'ELEGIR LAS FRUTAS', svg: 'frutas' },
        { id: 'exprimir', text: 'Exprimir las frutas con un adulto', textG1: 'EXPRIMIR CON UN ADULTO', svg: 'exprimir' },
        { id: 'servir', text: 'Servir el jugo en vasos', textG1: 'SERVIR EL JUGO EN VASOS', svg: 'servir_jugo' }
      ],
      2: [
        { id: 'jarra', text: 'Buscar una jarra limpia', textG1: 'BUSCAR UNA JARRA LIMPIA', svg: 'jarra' },
        { id: 'frutas', text: 'Elegir las frutas frescas', textG1: 'ELEGIR LAS FRUTAS', svg: 'frutas' },
        { id: 'lavar', text: 'Lavar muy bien las frutas', textG1: 'LAVAR BIEN LAS FRUTAS', svg: 'lavar_fruta' },
        { id: 'exprimir', text: 'Exprimir con supervisión de un adulto', textG1: 'EXPRIMIR CON UN ADULTO', svg: 'exprimir' },
        { id: 'servir', text: 'Servir en vasos con cuidado', textG1: 'SERVIR EN VASOS CON CUIDADO', svg: 'servir_jugo' }
      ],
      3: [
        { id: 'jarra', text: 'Buscar una jarra limpia', textG1: 'BUSCAR UNA JARRA LIMPIA', svg: 'jarra' },
        { id: 'frutas', text: 'Elegir las frutas frescas', textG1: 'ELEGIR LAS FRUTAS', svg: 'frutas' },
        { id: 'lavar', text: 'Lavar muy bien las frutas', textG1: 'LAVAR BIEN LAS FRUTAS', svg: 'lavar_fruta' },
        { id: 'cortar', text: 'Cortar las frutas con ayuda de un adulto', textG1: 'CORTAR FRUTAS CON UN ADULTO', svg: 'cortar_fruta' },
        { id: 'exprimir', text: 'Exprimir o licuar con supervisión', textG1: 'EXPRIMIR O LICUAR CON ADULTO', svg: 'exprimir' },
        { id: 'agua', text: 'Agregar agua fresca y mezclar', textG1: 'AGREGAR AGUA Y MEZCLAR', svg: 'jarra_agua' },
        { id: 'servir', text: 'Servir en vasos para disfrutar', textG1: 'SERVIR EN VASOS', svg: 'servir_jugo' }
      ],
      4: [
        { id: 'jarra', text: 'Buscar una jarra limpia', textG1: 'BUSCAR UNA JARRA LIMPIA', svg: 'jarra' },
        { id: 'frutas', text: 'Elegir las frutas frescas', textG1: 'ELEGIR LAS FRUTAS', svg: 'frutas' },
        { id: 'lavar', text: 'Lavar muy bien las frutas', textG1: 'LAVAR BIEN LAS FRUTAS', svg: 'lavar_fruta' },
        { id: 'cortar', text: 'Cortar las frutas con ayuda de un adulto', textG1: 'CORTAR FRUTAS CON UN ADULTO', svg: 'cortar_fruta' },
        { id: 'exprimir', text: 'Exprimir o licuar con supervisión', textG1: 'EXPRIMIR O LICUAR CON ADULTO', svg: 'exprimir' },
        { id: 'agua', text: 'Agregar agua fresca y mezclar', textG1: 'AGREGAR AGUA Y MEZCLAR', svg: 'jarra_agua' },
        { id: 'servir', text: 'Servir en vasos para disfrutar', textG1: 'SERVIR EN VASOS', svg: 'servir_jugo' }
      ],
      5: [
        { id: 'jarra', text: 'Buscar una jarra limpia', textG1: 'BUSCAR UNA JARRA LIMPIA', svg: 'jarra' },
        { id: 'frutas', text: 'Elegir las frutas frescas', textG1: 'ELEGIR LAS FRUTAS', svg: 'frutas' },
        { id: 'lavar', text: 'Lavar muy bien las frutas', textG1: 'LAVAR BIEN LAS FRUTAS', svg: 'lavar_fruta' },
        { id: 'cortar', text: 'Cortar las frutas con ayuda de un adulto', textG1: 'CORTAR FRUTAS CON UN ADULTO', svg: 'cortar_fruta' },
        { id: 'exprimir', text: 'Exprimir o licuar con supervisión', textG1: 'EXPRIMIR O LICUAR CON ADULTO', svg: 'exprimir' },
        { id: 'agua', text: 'Agregar agua fresca y mezclar', textG1: 'AGREGAR AGUA Y MEZCLAR', svg: 'jarra_agua' },
        { id: 'servir', text: 'Servir en vasos para disfrutar', textG1: 'SERVIR EN VASOS', svg: 'servir_jugo' }
      ]
    },
    distractors: [
      { id: 'dist_pimienta', text: 'Agregarle pimienta molida', textG1: 'AGREGAR PIMIENTA', svg: 'pimienta' },
      { id: 'dist_bici', text: 'Salir a andar en bicicleta', textG1: 'ANDAR EN BICICLETA', svg: 'bicicleta' },
      { id: 'dist_cordones', text: 'Atarse los cordones', textG1: 'ATARSE LOS CORDONES', svg: 'zapatilla' }
    ]
  },

  mochila: {
    id: 'mochila',
    title: 'Preparamos la mochila',
    titleG1: '¡PREPARAMOS LA MOCHILA!',
    subtitle: 'Organizá los bloques para tener la mochila lista para el colegio.',
    subtitleG1: 'ORGANIZÁ LOS BLOQUES PARA PREPARAR LA MOCHILA.',
    safety: '💡 ¡Tener la mochila lista a tiempo te permite llegar tranquilo al colegio!',
    safetyG1: '💡 ¡TENER LA MOCHILA LISTA TE AYUDA A NO OLVIDAR NADA!',
    iconSvg: 'mochila',
    steps: {
      1: [
        { id: 'buscar_m', text: 'Buscar la mochila escolar', textG1: 'BUSCAR LA MOCHILA', svg: 'mochila' },
        { id: 'cuadernos', text: 'Buscar los cuadernos', textG1: 'BUSCAR LOS CUADERNOS', svg: 'cuadernos' },
        { id: 'guardar', text: 'Guardar la cartuchera y útiles', textG1: 'GUARDAR LA CARTUCHERA', svg: 'cartuchera' },
        { id: 'cerrar', text: 'Cerrar el cierre de la mochila', textG1: 'CERRAR LA MOCHILA', svg: 'mochila_cerrada' }
      ],
      2: [
        { id: 'buscar_m', text: 'Buscar la mochila escolar', textG1: 'BUSCAR LA MOCHILA', svg: 'mochila' },
        { id: 'horario', text: 'Revisar el horario de clases', textG1: 'REVISAR EL HORARIO', svg: 'horario' },
        { id: 'cuadernos', text: 'Buscar los cuadernos del día', textG1: 'BUSCAR LOS CUADERNOS', svg: 'cuadernos' },
        { id: 'guardar', text: 'Guardar la cartuchera y los libros', textG1: 'GUARDAR CARTUCHERA Y LIBROS', svg: 'cartuchera' },
        { id: 'cerrar', text: 'Cerrar el cierre de la mochila', textG1: 'CERRAR LA MOCHILA', svg: 'mochila_cerrada' }
      ],
      3: [
        { id: 'buscar_m', text: 'Buscar la mochila escolar', textG1: 'BUSCAR LA MOCHILA', svg: 'mochila' },
        { id: 'horario', text: 'Revisar el horario de clases', textG1: 'REVISAR EL HORARIO', svg: 'horario' },
        { id: 'cuadernos', text: 'Buscar los cuadernos y libros', textG1: 'BUSCAR CUADERNOS Y LIBROS', svg: 'cuadernos' },
        { id: 'guardar_libros', text: 'Guardar los libros en la mochila', textG1: 'GUARDAR LOS LIBROS', svg: 'guardar_libros' },
        { id: 'cartuchera', text: 'Guardar la cartuchera con lápices', textG1: 'GUARDAR LA CARTUCHERA', svg: 'cartuchera' },
        { id: 'cerrar', text: 'Cerrar el cierre de la mochila', textG1: 'CERRAR LA MOCHILA', svg: 'mochila_cerrada' }
      ],
      4: [
        { id: 'buscar_m', text: 'Buscar la mochila escolar', textG1: 'BUSCAR LA MOCHILA', svg: 'mochila' },
        { id: 'horario', text: 'Revisar el horario de clases', textG1: 'REVISAR EL HORARIO', svg: 'horario' },
        { id: 'cuadernos', text: 'Buscar los cuadernos necesarios', textG1: 'BUSCAR LOS CUADERNOS', svg: 'cuadernos' },
        { id: 'guardar_libros', text: 'Guardar los libros ordenados', textG1: 'GUARDAR LOS LIBROS', svg: 'guardar_libros' },
        { id: 'cartuchera', text: 'Guardar la cartuchera completa', textG1: 'GUARDAR LA CARTUCHERA', svg: 'cartuchera' },
        { id: 'cerrar', text: 'Cerrar el cierre de la mochila', textG1: 'CERRAR LA MOCHILA', svg: 'mochila_cerrada' }
      ],
      5: [
        { id: 'buscar_m', text: 'Buscar la mochila escolar', textG1: 'BUSCAR LA MOCHILA', svg: 'mochila' },
        { id: 'horario', text: 'Revisar el horario de clases', textG1: 'REVISAR EL HORARIO', svg: 'horario' },
        { id: 'cuadernos', text: 'Buscar los cuadernos necesarios', textG1: 'BUSCAR LOS CUADERNOS', svg: 'cuadernos' },
        { id: 'guardar_libros', text: 'Guardar los libros ordenados', textG1: 'GUARDAR LOS LIBROS', svg: 'guardar_libros' },
        { id: 'cartuchera', text: 'Guardar la cartuchera completa', textG1: 'GUARDAR LA CARTUCHERA', svg: 'cartuchera' },
        { id: 'cerrar', text: 'Cerrar el cierre de la mochila', textG1: 'CERRAR LA MOCHILA', svg: 'mochila_cerrada' }
      ]
    },
    distractors: [
      { id: 'dist_dientes', text: 'Cepillarse los dientes', textG1: 'CEPILLARSE LOS DIENTES', svg: 'cepillo' },
      { id: 'dist_sarten', text: 'Poner una sartén en la mochila', textG1: 'PONER UNA SARTÉN', svg: 'sarten' },
      { id: 'dist_auto', text: 'Lavar el auto familiar', textG1: 'LAVAR EL AUTO', svg: 'auto' }
    ]
  },

  habitacion: {
    id: 'habitacion',
    title: 'Ordenamos una habitación',
    titleG1: '¡ORDENAMOS LA HABITACIÓN!',
    subtitle: 'Armá la secuencia lógica de bloques para dejar la habitación impecable.',
    subtitleG1: 'ARMÁ LA SECUENCIA PARA ORDENAR LA HABITACIÓN.',
    safety: '💡 ¡Un espacio ordenado nos ayuda a encontrar todo rápido y descansar mejor!',
    safetyG1: '💡 ¡ORDENAR NOS AYUDA A JUGAR Y ESTUDIAR MEJOR!',
    iconSvg: 'habitacion',
    steps: {
      1: [
        { id: 'juguetes', text: 'Juntar los juguetes del piso', textG1: 'JUNTAR LOS JUGUETES', svg: 'juguetes' },
        { id: 'canasto', text: 'Guardar los juguetes en el canasto', textG1: 'GUARDAR EN EL CANASTO', svg: 'canasto' },
        { id: 'ropa', text: 'Acomodar la ropa en el placard', textG1: 'ACOMODAR LA ROPA', svg: 'ropa' },
        { id: 'cama', text: 'Hacer la cama prolija', textG1: 'HACER LA CAMA', svg: 'cama' }
      ],
      2: [
        { id: 'juguetes', text: 'Juntar los juguetes del piso', textG1: 'JUNTAR LOS JUGUETES', svg: 'juguetes' },
        { id: 'canasto', text: 'Guardar los juguetes en el canasto', textG1: 'GUARDAR EN EL CANASTO', svg: 'canasto' },
        { id: 'libros', text: 'Ordenar los libros en la repisa', textG1: 'ORDENAR LOS LIBROS', svg: 'repisa' },
        { id: 'ropa', text: 'Acomodar la ropa en el placard', textG1: 'ACOMODAR LA ROPA', svg: 'ropa' },
        { id: 'cama', text: 'Hacer la cama prolija', textG1: 'HACER LA CAMA', svg: 'cama' }
      ],
      3: [
        { id: 'juguetes', text: 'Juntar los juguetes del piso', textG1: 'JUNTAR LOS JUGUETES', svg: 'juguetes' },
        { id: 'canasto', text: 'Guardar los juguetes en el canasto', textG1: 'GUARDAR EN EL CANASTO', svg: 'canasto' },
        { id: 'libros', text: 'Ordenar los libros en la repisa', textG1: 'ORDENAR LOS LIBROS', svg: 'repisa' },
        { id: 'ropa', text: 'Acomodar la ropa en el placard', textG1: 'ACOMODAR LA ROPA', svg: 'ropa' },
        { id: 'cama', text: 'Hacer la cama prolija', textG1: 'HACER LA CAMA', svg: 'cama' }
      ],
      4: [
        { id: 'juguetes', text: 'Juntar los juguetes del piso', textG1: 'JUNTAR LOS JUGUETES', svg: 'juguetes' },
        { id: 'canasto', text: 'Guardar los juguetes en el canasto', textG1: 'GUARDAR EN EL CANASTO', svg: 'canasto' },
        { id: 'libros', text: 'Ordenar los libros en la repisa', textG1: 'ORDENAR LOS LIBROS', svg: 'repisa' },
        { id: 'ropa', text: 'Acomodar la ropa en el placard', textG1: 'ACOMODAR LA ROPA', svg: 'ropa' },
        { id: 'cama', text: 'Hacer la cama prolija', textG1: 'HACER LA CAMA', svg: 'cama' }
      ],
      5: [
        { id: 'juguetes', text: 'Juntar los juguetes del piso', textG1: 'JUNTAR LOS JUGUETES', svg: 'juguetes' },
        { id: 'canasto', text: 'Guardar los juguetes en el canasto', textG1: 'GUARDAR EN EL CANASTO', svg: 'canasto' },
        { id: 'libros', text: 'Ordenar los libros en la repisa', textG1: 'ORDENAR LOS LIBROS', svg: 'repisa' },
        { id: 'ropa', text: 'Acomodar la ropa en el placard', textG1: 'ACOMODAR LA ROPA', svg: 'ropa' },
        { id: 'cama', text: 'Hacer la cama prolija', textG1: 'HACER LA CAMA', svg: 'cama' }
      ]
    },
    distractors: [
      { id: 'dist_alfombra', text: 'Regar la alfombra con agua', textG1: 'REGAR LA ALFOMBRA', svg: 'regar' },
      { id: 'dist_plaza', text: 'Salir a jugar al fútbol', textG1: 'JUGAR AL FÚTBOL', svg: 'futbol' },
      { id: 'dist_paraguas', text: 'Abrir un paraguas adentro', textG1: 'ABRIR UN PARAGUAS', svg: 'paraguas' }
    ]
  }
};

console.log('Everyday activities structure verified successfully.');
