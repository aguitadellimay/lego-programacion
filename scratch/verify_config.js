// Verification of algorithms data structure
const GRADES = [1, 2, 3, 4, 5];

const ACTIVITIES_CONFIG = {
  cafe: {
    title: 'Preparamos un café',
    subtitle: '¡Ayudá a preparar un rico café!',
    safetyNote: '⚠️ El agua caliente debe ser manipulada siempre por un adulto.',
    goalImage: 'cafe_taza',
    steps: {
      1: [
        { id: 'taza', text: 'Buscar una taza', icon: 'taza' },
        { id: 'cafe', text: 'Colocar café en la taza', icon: 'cafe_polvo' },
        { id: 'agua', text: 'Agregar agua caliente con ayuda de un adulto', icon: 'agua_caliente' },
        { id: 'mezclar', text: 'Mezclar con una cuchara', icon: 'cuchara' }
      ],
      2: [
        { id: 'taza', text: 'Buscar una taza', icon: 'taza' },
        { id: 'cafe', text: 'Colocar café en la taza', icon: 'cafe_polvo' },
        { id: 'calentar', text: 'Calentar agua con ayuda de un adulto', icon: 'pava' },
        { id: 'agua', text: 'Agregar el agua caliente con ayuda de un adulto', icon: 'agua_caliente' },
        { id: 'mezclar', text: 'Mezclar bien con la cuchara', icon: 'cuchara' }
      ],
      3: [
        { id: 'taza', text: 'Buscar una taza limpia', icon: 'taza' },
        { id: 'cafe', text: 'Colocar café en la taza', icon: 'cafe_polvo' },
        { id: 'calentar', text: 'Calentar agua con ayuda de un adulto', icon: 'pava' },
        { id: 'agua', text: 'Agregar el agua caliente con ayuda de un adulto', icon: 'agua_caliente' },
        { id: 'mezclar', text: 'Mezclar con una cuchara', icon: 'cuchara' },
        { id: 'servir', text: 'Servir en la mesa con cuidado', icon: 'servir_taza' }
      ],
      4: [
        { id: 'taza', text: 'Buscar una taza limpia', icon: 'taza' },
        { id: 'cafe', text: 'Colocar café en la taza', icon: 'cafe_polvo' },
        { id: 'calentar', text: 'Calentar agua con ayuda de un adulto', icon: 'pava' },
        { id: 'agua', text: 'Agregar el agua caliente con ayuda de un adulto', icon: 'agua_caliente' },
        { id: 'mezclar', text: 'Mezclar con una cuchara', icon: 'cuchara' },
        { id: 'servir', text: 'Servir en la mesa con cuidado', icon: 'servir_taza' }
      ],
      5: [
        { id: 'taza', text: 'Buscar una taza limpia', icon: 'taza' },
        { id: 'cafe', text: 'Colocar café en la taza', icon: 'cafe_polvo' },
        { id: 'calentar', text: 'Calentar agua con ayuda de un adulto', icon: 'pava' },
        { id: 'agua', text: 'Agregar el agua caliente con ayuda de un adulto', icon: 'agua_caliente' },
        { id: 'mezclar', text: 'Mezclar con una cuchara', icon: 'cuchara' },
        { id: 'servir', text: 'Servir en la mesa con cuidado', icon: 'servir_taza' }
      ]
    },
    distractors: [
      { id: 'dist_sal', text: 'Poner sal en la taza', icon: 'sal' },
      { id: 'dist_dormir', text: 'Ponerse el pijama para dormir', icon: 'dormir' },
      { id: 'dist_mochila', text: 'Guardar la cartuchera', icon: 'cartuchera' }
    ]
  }
};

console.log('Config OK. Grades supported:', GRADES);
