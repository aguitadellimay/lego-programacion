const fs = require('fs');

const file = 'js/bityBlockly.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Verify existence of target for consigna dictionary
const dictTarget = 'const BITY_GUIDE_MESSAGES = {';
if (!content.includes(dictTarget)) {
  console.error('BITY_GUIDE_MESSAGES not found');
  process.exit(1);
}

const consignasCode = `
  const BITY_FINAL_CHALLENGE_CONSIGNAS = {
    1: {
      title: '¡ATENCIÓN, PROGRAMADORES!',
      subtitle: 'ANTES DE COMENZAR ESTA ÚLTIMA MISIÓN, ¡TENÉ EN CUENTA ALGO IMPORTANTE!',
      items: [
        {
          icon: '🎯',
          label: 'TU DESAFÍO:',
          text: 'GUIÁ A BITY HASTA LA META. MIENTRAS LO HACÉS, CONTÁ CUÁNTAS INSTRUCCIONES NECESITÁS.'
        },
        {
          icon: '🧩',
          label: 'CADA PASO ES UNA INSTRUCCIÓN:',
          text: 'RECORDÁ: CADA MOVIMIENTO O GIRO QUE LE DAS A BITY CUENTA COMO UNA INSTRUCCIÓN.'
        },
        {
          icon: '🗺️',
          label: 'MÚLTIPLES CAMINOS:',
          text: '¡HAY MÁS DE UN CAMINO VÁLIDO PARA LLEGAR A LA META! PODÉS ELEGIR EL QUE MÁS TE GUSTE.'
        },
        {
          icon: '📋',
          label: 'REGISTRO EN CLASSROOM:',
          text: 'CUANDO TERMINES, ANOTÁ CUÁNTAS INSTRUCCIONES USASTE Y COMPARTÍ TU RESULTADO EN CLASSROOM, EN LA SECCIÓN TAREAS.'
        }
      ],
      motto: '¡PREPARATE, PENSÁ TU CAMINO Y AYUDÁ A BITY A LLEGAR!',
      buttonText: '¡ENTENDÍ! COMENZAR EL DESAFÍO',
      summaryClassroomMsg: 'AHORA ANOTÁ TU RESULTADO Y PUBLICALO EN CLASSROOM, EN LA SECCIÓN TAREAS.',
      summaryClassroomSub: 'COMPARTÍ CON TU PROFE Y COMPAÑEROS CUÁNTAS INSTRUCCIONES UTILIZASTE.',
      reflectionText: '¡MUY BIEN! EN PROGRAMACIÓN EXISTEN DISTINTAS SOLUCIONES VÁLIDAS PARA UN MISMO PROBLEMA. ¿CUÁNTAS INSTRUCCIONES USASTE?'
    },
    2: {
      title: '¡Atención, Programadores!',
      subtitle: 'Antes de comenzar esta última misión, ¡tené en cuenta algo importante!',
      items: [
        {
          icon: '🎯',
          label: 'Tu desafío:',
          text: 'Tu desafío será guiar a Bity hasta la meta. Mientras lo hacés, contá cuántas instrucciones necesitaste para lograrlo.'
        },
        {
          icon: '🧩',
          label: 'Cada paso cuenta:',
          text: 'Recordá: cada movimiento o giro que le indicás a Bity cuenta como una instrucción.'
        },
        {
          icon: '🗺️',
          label: 'Caminos diferentes:',
          text: '¡Hay más de un camino para llegar a la meta! Podés encontrar diferentes soluciones y utilizar distintas cantidades de instrucciones.'
        },
        {
          icon: '📋',
          label: 'Registro en Classroom:',
          text: 'Cuando termines, anotá cuántas instrucciones utilizaste y compartí tu resultado en Classroom, en la sección Tareas.'
        }
      ],
      motto: '¡Preparate, pensá tu camino y ayudá a Bity a llegar!',
      buttonText: '¡Entendí! Comenzar el desafío',
      summaryClassroomMsg: 'Ahora anotá tu resultado y publicalo en Classroom, en la sección Tareas.',
      summaryClassroomSub: 'Contale a tu docente qué camino recorrió Bity y cuántas instrucciones utilizaste.',
      reflectionText: '¡Buen trabajo! Cada estudiante puede utilizar una cantidad diferente de instrucciones y llegar con éxito a la meta.'
    },
    3: {
      title: '¡Atención, Programadores!',
      subtitle: 'Antes de comenzar esta última misión, ¡tené en cuenta algo importante!',
      items: [
        {
          icon: '🎯',
          label: 'Misión de recorrido:',
          text: 'Tu desafío será guiar a Bity hasta la meta. Mientras lo hacés, contá cuántas instrucciones necesitaste para lograrlo.'
        },
        {
          icon: '🧩',
          label: 'Contar pasos y giros:',
          text: 'Recordá: cada paso que le indicás a Bity (tanto avanzar como girar) cuenta como una instrucción.'
        },
        {
          icon: '🗺️',
          label: 'Comparar diferentes recorridos:',
          text: '¡Hay más de un camino para llegar a la meta! Podés comparar diferentes recorridos; cada solución válida puede requerir distintas cantidades de instrucciones.'
        },
        {
          icon: '📋',
          label: 'Publicación en Classroom:',
          text: 'Cuando termines, anotá cuántas instrucciones utilizaste y compartí tu resultado en Classroom, en la sección Tareas.'
        }
      ],
      motto: '¡Preparate, pensá tu camino y ayudá a Bity a llegar!',
      buttonText: '¡Entendí! Comenzar el desafío',
      summaryClassroomMsg: 'Ahora anotá tu resultado y publicalo en Classroom, en la sección Tareas.',
      summaryClassroomSub: 'Compartí en Classroom qué recorrido elegiste y cuántas instrucciones necesitaste en total.',
      reflectionText: '¡Gran análisis! Al comparar diferentes recorridos, descubrimos que no todos los caminos requieren la misma cantidad de pasos y giros.'
    },
    4: {
      title: '¡Atención, Programadores!',
      subtitle: 'Antes de comenzar esta última misión, ¡tené en cuenta algo importante!',
      items: [
        {
          icon: '🎯',
          label: 'Planificación algorítmica:',
          text: 'Tu desafío será guiar a Bity hasta la meta. Mientras lo hacés, contá cuántas instrucciones necesitaste para lograrlo.'
        },
        {
          icon: '🧩',
          label: 'Métrica de instrucciones:',
          text: 'Recordá: cada bloque de movimiento o giro ejecutado cuenta como una instrucción.'
        },
        {
          icon: '🗺️',
          label: 'Distintas soluciones válidas:',
          text: '¡Hay más de un camino para llegar a la meta! Pueden existir distintas soluciones con diferentes cantidades de instrucciones y todas son válidas.'
        },
        {
          icon: '📋',
          label: 'Registro en Classroom:',
          text: 'Cuando termines, anotá cuántas instrucciones utilizaste y compartí tu resultado en Classroom, en la sección Tareas.'
        }
      ],
      motto: '¡Preparate, pensá tu camino y ayudá a Bity a llegar!',
      buttonText: '¡Entendí! Comenzar el desafío',
      summaryClassroomMsg: 'Ahora anotá tu resultado y publicalo en Classroom, en la sección Tareas.',
      summaryClassroomSub: 'Publicá tu resultado en Classroom detallando la cantidad de avances, giros e instrucciones totales que utilizaste.',
      reflectionText: '¡Excelente resolución! En programación existen múltiples soluciones válidas para un mismo problema. ¿Qué camino elegiste?'
    },
    5: {
      title: '¡Atención, Programadores!',
      subtitle: 'Antes de comenzar esta última misión, ¡tené en cuenta algo importante!',
      items: [
        {
          icon: '🎯',
          label: 'Análisis y optimización:',
          text: 'Tu desafío será guiar a Bity hasta la meta. Mientras lo hacés, contá cuántas instrucciones necesitaste para lograrlo.'
        },
        {
          icon: '🧩',
          label: 'Instrucciones ejecutadas:',
          text: 'Recordá: cada bloque de movimiento o giro ejecutado en tu solución cuenta como una instrucción.'
        },
        {
          icon: '🗺️',
          label: 'Analizar y comparar alternativas:',
          text: '¡Hay más de un camino para llegar a la meta! Te invitamos a analizar y comparar la cantidad de instrucciones utilizadas en las diferentes alternativas.'
        },
        {
          icon: '📋',
          label: 'Compartir en Classroom:',
          text: 'Cuando termines, anotá cuántas instrucciones utilizaste y compartí tu resultado en Classroom, en la sección Tareas.'
        }
      ],
      motto: '¡Preparate, pensá tu camino y ayudá a Bity a llegar!',
      buttonText: '¡Entendí! Comenzar el desafío',
      summaryClassroomMsg: 'Ahora anotá tu resultado y publicalo en Classroom, en la sección Tareas.',
      summaryClassroomSub: 'Publicá tu solución en Classroom y compará con tus compañeros la cantidad de instrucciones de los diferentes caminos.',
      reflectionText: '¡Razonamiento algorítmico sobresaliente! Comparar la cantidad de instrucciones entre caminos alternativos nos permite evaluar distintas estrategias de resolución.'
    }
  };
`;

content = content.replace(dictTarget, consignasCode + '\n  ' + dictTarget);

// 2. Update showInstructionConceptModal
const oldConceptMethod = `    showInstructionConceptModal(onStartCallback) {
      const modal = document.getElementById('bityblockly-instruction-concept-modal');
      if (!modal) {
        if (onStartCallback) onStartCallback();
        return;
      }
      const btnStart = document.getElementById('btn-bityblockly-start-instruction-challenge');
      if (btnStart) {
        btnStart.onclick = () => {
          modal.classList.remove('active');
          if (onStartCallback) onStartCallback();
        };
      }
      modal.classList.add('active');
    }`;

const newConceptMethod = `    showInstructionConceptModal(onStartCallback) {
      const modal = document.getElementById('bityblockly-instruction-concept-modal');
      if (!modal) {
        if (onStartCallback) onStartCallback();
        return;
      }

      const consignaData = BITY_FINAL_CHALLENGE_CONSIGNAS[this.currentGrade] || BITY_FINAL_CHALLENGE_CONSIGNAS[1];

      // Avatar de Bity Guía
      const avatarEl = document.getElementById('bityblockly-concept-avatar');
      if (avatarEl) {
        avatarEl.innerHTML = createBityGuideSvg('happy');
      }

      // Título y Subtítulo
      const titleEl = document.getElementById('bityblockly-concept-title');
      const subtitleEl = document.getElementById('bityblockly-concept-subtitle');
      if (titleEl) titleEl.textContent = this.formatForGrade(consignaData.title);
      if (subtitleEl) subtitleEl.textContent = this.formatForGrade(consignaData.subtitle);

      // Grilla de consignas adaptada al grado
      const itemsGrid = document.getElementById('bityblockly-concept-items-grid');
      if (itemsGrid) {
        itemsGrid.innerHTML = '';
        consignaData.items.forEach(item => {
          const card = document.createElement('div');
          card.className = 'concept-consigna-item';
          card.innerHTML = \`
            <div class="consigna-item-icon">\${item.icon}</div>
            <div class="consigna-item-content">
              <strong class="consigna-item-label">\${this.formatForGrade(item.label)}</strong>
              <p class="consigna-item-text">\${this.formatForGrade(item.text)}</p>
            </div>
          \`;
          itemsGrid.appendChild(card);
        });
      }

      // Lema motivador
      const mottoEl = document.getElementById('bityblockly-concept-motto');
      if (mottoEl) {
        mottoEl.textContent = this.formatForGrade(consignaData.motto);
      }

      // Botón de confirmación
      const btnTextEl = document.getElementById('btn-concept-start-text');
      if (btnTextEl) {
        btnTextEl.textContent = this.formatForGrade(consignaData.buttonText);
      }

      const btnStart = document.getElementById('btn-bityblockly-start-instruction-challenge');
      if (btnStart) {
        btnStart.onclick = () => {
          modal.classList.remove('active');
          this.audio.play('click');
          this.speakGuide(consignaData.motto, { mood: 'happy', force: true });
          if (onStartCallback) onStartCallback();
        };
      }

      modal.classList.add('active');
    }`;

if (!content.includes(oldConceptMethod)) {
  console.error('oldConceptMethod not found');
  process.exit(1);
}
content = content.replace(oldConceptMethod, newConceptMethod);

// 3. Update triggerInstructionSummaryModal
const oldSummaryTarget = `    triggerInstructionSummaryModal() {
      const modal = document.getElementById('bityblockly-instruction-summary-modal');
      if (!modal) return;

      const totalEl = document.getElementById('bityblockly-summary-total-count');
      const movesEl = document.getElementById('bityblockly-summary-moves-count');
      const turnsEl = document.getElementById('bityblockly-summary-turns-count');
      const routeEl = document.getElementById('bityblockly-summary-route-name');
      const reflectionEl = document.getElementById('bityblockly-summary-reflection-text');

      const total = this.instructionsExecuted || 0;
      const moves = this.movesExecuted || 0;
      const turns = this.turnsExecuted || 0;

      if (totalEl) totalEl.textContent = total;
      if (movesEl) movesEl.textContent = moves;
      if (turnsEl) turnsEl.textContent = turns;

      let routeName = \`Camino completado (\${total} instrucciones)\`;
      if (this.currentGrade === 1) {
        if (total === 9) routeName = 'Camino A (Ruta Directa • 9 instrucciones)';
        else if (total === 12) routeName = 'Camino B (Ruta Alternativa • 12 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 2) {
        if (total === 11) routeName = 'Camino A (Ruta Directa • 11 instrucciones)';
        else if (total === 14) routeName = 'Camino B (Ruta Alternativa • 14 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 3) {
        if (total === 13) routeName = 'Ruta A (Vía Directa • 13 instrucciones)';
        else if (total === 15) routeName = 'Ruta B (Vía Central • 15 instrucciones)';
        else if (total === 17) routeName = 'Ruta C (Vía Baja • 17 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 4) {
        if (total === 14) routeName = 'Ruta A (Galería Norte • 14 instrucciones)';
        else if (total === 16) routeName = 'Ruta B (Pasillo Central • 16 instrucciones)';
        else if (total === 18) routeName = 'Ruta C (Galería Baja • 18 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 5) {
        if (total === 16) routeName = 'Ruta A (Almenas Altas • 16 instrucciones)';
        else if (total === 20) routeName = 'Ruta B (Patio Central • 20 instrucciones)';
        else if (total === 22) routeName = 'Ruta C (Canal de Sombras • 22 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      }

      if (routeEl) routeEl.textContent = this.formatForGrade(routeName);

      if (reflectionEl) {
        reflectionEl.textContent = this.formatForGrade('¿Pudiste haber llegado a la meta con menos instrucciones? ¿Qué camino fue más corto y cuál más largo? ¡Compartí tu estrategia con tus compañeros y tu profe!');
      }

      const btnRetry = document.getElementById('btn-bityblockly-summary-retry');
      if (btnRetry) {
        btnRetry.onclick = () => {
          modal.classList.remove('active');
          this.loadLevel(this.currentLevelIndex);
        };
      }

      const btnNext = document.getElementById('btn-bityblockly-summary-next');
      if (btnNext) {
        btnNext.onclick = () => {
          modal.classList.remove('active');
          this.showCoverView();
        };
      }

      modal.classList.add('active');
    }`;

const newSummaryMethod = `    triggerInstructionSummaryModal() {
      const modal = document.getElementById('bityblockly-instruction-summary-modal');
      if (!modal) return;

      const consignaData = BITY_FINAL_CHALLENGE_CONSIGNAS[this.currentGrade] || BITY_FINAL_CHALLENGE_CONSIGNAS[1];

      const titleEl = document.getElementById('bityblockly-summary-title');
      const subtitleEl = document.getElementById('bityblockly-summary-subtitle');
      const subtitleCountEl = document.getElementById('bityblockly-summary-subtitle-count');
      const totalEl = document.getElementById('bityblockly-summary-total-count');
      const movesEl = document.getElementById('bityblockly-summary-moves-count');
      const turnsEl = document.getElementById('bityblockly-summary-turns-count');
      const routeEl = document.getElementById('bityblockly-summary-route-name');
      const classroomBadgeEl = document.getElementById('summary-classroom-badge');
      const classroomMsgEl = document.getElementById('summary-classroom-callout-msg');
      const classroomSubmsgEl = document.getElementById('summary-classroom-callout-submsg');
      const reflectionEl = document.getElementById('bityblockly-summary-reflection-text');

      const total = this.instructionsExecuted || 0;
      const moves = this.movesExecuted || 0;
      const turns = this.turnsExecuted || 0;

      if (titleEl) {
        titleEl.textContent = this.formatForGrade('¡FELICITACIONES! ¡BITY LLEGÓ A LA META!');
      }
      if (subtitleEl) {
        subtitleEl.innerHTML = this.formatForGrade(\`UTILIZASTE <span id="bityblockly-summary-subtitle-count" class="summary-subtitle-highlight">\${total}</span> INSTRUCCIONES PARA COMPLETAR EL RECORRIDO.\`);
      } else if (subtitleCountEl) {
        subtitleCountEl.textContent = total;
      }

      if (totalEl) totalEl.textContent = total;
      if (movesEl) movesEl.textContent = moves;
      if (turnsEl) turnsEl.textContent = turns;

      let routeName = \`Camino completado (\${total} instrucciones)\`;
      if (this.currentGrade === 1) {
        if (total === 9) routeName = 'Camino A (Ruta Directa • 9 instrucciones)';
        else if (total === 12) routeName = 'Camino B (Ruta Alternativa • 12 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 2) {
        if (total === 11) routeName = 'Camino A (Ruta Directa • 11 instrucciones)';
        else if (total === 14) routeName = 'Camino B (Ruta Alternativa • 14 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 3) {
        if (total === 13) routeName = 'Ruta A (Vía Directa • 13 instrucciones)';
        else if (total === 15) routeName = 'Ruta B (Vía Central • 15 instrucciones)';
        else if (total === 17) routeName = 'Ruta C (Vía Baja • 17 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 4) {
        if (total === 14) routeName = 'Ruta A (Galería Norte • 14 instrucciones)';
        else if (total === 16) routeName = 'Ruta B (Pasillo Central • 16 instrucciones)';
        else if (total === 18) routeName = 'Ruta C (Galería Baja • 18 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 5) {
        if (total === 16) routeName = 'Ruta A (Almenas Altas • 16 instrucciones)';
        else if (total === 20) routeName = 'Ruta B (Patio Central • 20 instrucciones)';
        else if (total === 22) routeName = 'Ruta C (Canal de Sombras • 22 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      }

      if (routeEl) routeEl.textContent = this.formatForGrade(routeName);

      if (classroomBadgeEl) {
        classroomBadgeEl.textContent = this.formatForGrade('REGISTRO EN CLASSROOM');
      }
      if (classroomMsgEl) {
        classroomMsgEl.textContent = this.formatForGrade(consignaData.summaryClassroomMsg);
      }
      if (classroomSubmsgEl) {
        classroomSubmsgEl.textContent = this.formatForGrade(consignaData.summaryClassroomSub);
      }

      if (reflectionEl) {
        reflectionEl.textContent = this.formatForGrade(consignaData.reflectionText);
      }

      const btnRetry = document.getElementById('btn-bityblockly-summary-retry');
      if (btnRetry) {
        btnRetry.onclick = () => {
          modal.classList.remove('active');
          this.loadLevel(this.currentLevelIndex);
        };
      }

      const btnNext = document.getElementById('btn-bityblockly-summary-next');
      if (btnNext) {
        btnNext.onclick = () => {
          modal.classList.remove('active');
          this.showCoverView();
        };
      }

      modal.classList.add('active');
    }`;

if (!content.includes(oldSummaryTarget)) {
  console.error('oldSummaryTarget not found');
  process.exit(1);
}
content = content.replace(oldSummaryTarget, newSummaryMethod);

// 4. Update loadLevel reminder when already seen
const oldLoadLevelFinalCheck = `      if (config.isFinalChallenge) {
        if (!this.conceptSeenPerGrade) this.conceptSeenPerGrade = {};
        if (!this.conceptSeenPerGrade[this.currentGrade]) {
          this.conceptSeenPerGrade[this.currentGrade] = true;
          this.showInstructionConceptModal();
        }
      }`;

const newLoadLevelFinalCheck = `      if (config.isFinalChallenge) {
        if (!this.conceptSeenPerGrade) this.conceptSeenPerGrade = {};
        if (!this.conceptSeenPerGrade[this.currentGrade]) {
          this.conceptSeenPerGrade[this.currentGrade] = true;
          this.showInstructionConceptModal();
        } else {
          const reminderMsg = (this.currentGrade === 1)
            ? '¡CONTÁ TUS INSTRUCCIONES HASTA LA META Y COMPARTILAS EN CLASSROOM!'
            : 'Recordá contar cuántas instrucciones utilizás y compartir tu resultado en Classroom.';
          this.speakGuide(reminderMsg, { mood: 'thinking', force: true });
        }
      }`;

if (!content.includes(oldLoadLevelFinalCheck)) {
  console.error('oldLoadLevelFinalCheck not found');
  process.exit(1);
}
content = content.replace(oldLoadLevelFinalCheck, newLoadLevelFinalCheck);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully applied consignas and summary updates in js/bityBlockly.js');
