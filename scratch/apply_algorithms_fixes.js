const fs = require('fs');

const filePath = 'js/algorithmsModule.js';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Reemplazar calabazas en ALL_MAZES por regalos y campanas navideñas
content = content.replace(
  "{ id: 'item_g2_3', type: 'pumpkin', x: 3, y: 3, name: 'Calabaza Mágica' }",
  "{ id: 'item_g2_3', type: 'gift', x: 3, y: 3, name: 'Regalo Navideño' }"
);

content = content.replace(
  "{ id: 'item_g3_4', type: 'pumpkin', x: 6, y: 2, name: 'Calabaza Misteriosa' }",
  "{ id: 'item_g3_4', type: 'gift', x: 6, y: 2, name: 'Caja Festiva' }"
);

content = content.replace(
  "{ id: 'item_g4_4', type: 'pumpkin', x: 7, y: 2, name: 'Calabaza Estratégica' }",
  "{ id: 'item_g4_4', type: 'bell', x: 7, y: 2, name: 'Campana Dorada' }"
);

content = content.replace(
  "{ id: 'item_g5_4', type: 'pumpkin', x: 3, y: 5, name: 'Calabaza de Finitud' }",
  "{ id: 'item_g5_4', type: 'tree', x: 3, y: 5, name: 'Pino Navideño' }"
);

// 2. Actualizar selectStep(stepNum) para configurar la actividad predeterminada según el grado
const oldSelectStep = `      // Configurar actividad cotidiana activa según el paso
      if (stepNum === 2) {
        this.selectedEverydayAct = 'cafe';
      } else if (stepNum === 3) {
        this.selectedEverydayAct = 'mochila';
      } else if (stepNum >= 4) {`;

const newSelectStep = `      // Configurar actividad cotidiana activa según el paso y el grado
      if (stepNum === 2) {
        // Bloque I: Café para 1°/2°, Jugo para 3°/4°/5°
        this.selectedEverydayAct = (this.currentGrade >= 3) ? 'jugo' : 'cafe';
      } else if (stepNum === 3) {
        // Bloque II: Mochila para 1°/2°, Habitación para 3°/4°/5°
        this.selectedEverydayAct = (this.currentGrade >= 3) ? 'habitacion' : 'mochila';
      } else if (stepNum >= 4) {`;

if (content.includes(oldSelectStep)) {
  content = content.replace(oldSelectStep, newSelectStep);
  console.log('selectStep updated successfully.');
} else {
  console.warn('Could not find oldSelectStep pattern.');
}

// 3. Agregar handleBackButton() y getEverydayActivityData(actKey)
const helperMethod = `    handleBackButton() {
      if (this.currentStep > 1) {
        this.selectStep(1);
      } else {
        this.exitModule();
      }
    }

    getEverydayActivityData(actKey) {
      const act = EVERYDAY_ACTIVITIES[actKey] || EVERYDAY_ACTIVITIES.cafe;
      const grade = this.currentGrade || 1;
      const targetSteps = (act.steps && act.steps[grade]) ? act.steps[grade] : (act.steps ? act.steps[1] : []);
      const distractors = act.distractors || [];
      const isG1 = (grade === 1);

      const mapBlock = (b) => ({
        id: b.id,
        text: isG1 && b.textG1 ? b.textG1 : b.text,
        svg: b.svg
      });

      const targetBlocks = targetSteps.map(mapBlock);
      const distractorBlocks = distractors.map(mapBlock);
      const allBlocks = [...targetBlocks, ...distractorBlocks];

      if (!this._shuffledPools) this._shuffledPools = {};
      const poolKey = \`\${actKey}_g\${grade}\`;
      if (!this._shuffledPools[poolKey]) {
        const copy = [...allBlocks];
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor((Math.sin(i * 997 + grade * 17) * 0.5 + 0.5) * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        this._shuffledPools[poolKey] = copy;
      }

      const emojiMap = {
        cafe: '☕',
        jugo: '🧃',
        mochila: '🎒',
        habitacion: '🛏️'
      };

      return {
        id: act.id,
        title: isG1 && act.titleG1 ? act.titleG1 : act.title,
        desc: isG1 && act.subtitleG1 ? act.subtitleG1 : act.subtitle,
        subtitle: isG1 && act.subtitleG1 ? act.subtitleG1 : act.subtitle,
        safety: isG1 && act.safetyG1 ? act.safetyG1 : act.safety,
        iconSvg: act.iconSvg,
        emoji: emojiMap[actKey] || '📦',
        expectedSequence: targetSteps.map(s => s.id),
        targetBlocks: targetBlocks,
        distractors: distractorBlocks,
        availableBlocks: this._shuffledPools[poolKey]
      };
    }

    // ============================================================
    // ACTIVIDADES COTIDIANAS (PASOS 2 Y 3)
    // ============================================================`;

content = content.replace(
  `    // ============================================================
    // ACTIVIDADES COTIDIANAS (PASOS 2 Y 3)
    // ============================================================`,
  helperMethod
);

// 4. Reemplazar placeBlockInAlgorithm y verifyEverydayAlgorithm
const oldEverydayLogic = `    placeBlockInAlgorithm() {
      const st = this.everydayState[this.selectedEverydayAct];
      if (!st.selectedBlock || st.completed) return;

      const actConfig = EVERYDAY_ACTIVITIES[this.selectedEverydayAct];
      const maxSlots = actConfig.expectedSequence.length;

      if (st.placed.length >= maxSlots) {
        st.errorMsg = this.txt('Ya colocaste todos los bloques disponibles.');
        this.playSound('error');
        this.render();
        return;
      }

      st.placed.push(st.selectedBlock);
      st.selectedBlock = null;
      st.errorMsg = null;
      this.playSound('click');
      this.render();
    }

    removePlacedBlock(index) {
      const st = this.everydayState[this.selectedEverydayAct];
      if (st.completed) return;
      if (index >= 0 && index < st.placed.length) {
        st.placed.splice(index, 1);
        st.errorMsg = null;
        this.playSound('trash');
        this.render();
      }
    }

    movePlacedBlock(index, direction) {
      const st = this.everydayState[this.selectedEverydayAct];
      if (st.completed) return;
      const newIndex = index + direction;
      if (newIndex >= 0 && newIndex < st.placed.length) {
        const temp = st.placed[index];
        st.placed[index] = st.placed[newIndex];
        st.placed[newIndex] = temp;
        st.errorMsg = null;
        this.playSound('click');
        this.render();
      }
    }

    verifyEverydayAlgorithm() {
      const st = this.everydayState[this.selectedEverydayAct];
      const actConfig = EVERYDAY_ACTIVITIES[this.selectedEverydayAct];
      const expected = actConfig.expectedSequence;

      if (st.placed.length < expected.length) {
        st.errorMsg = this.txt(\`Faltan pasos. Este algoritmo necesita \${expected.length} pasos ordenados.\`);
        this.playSound('error');
        this.render();
        return;
      }

      let isCorrect = true;
      for (let i = 0; i < expected.length; i++) {
        if (st.placed[i] !== expected[i]) {
          isCorrect = false;
          break;
        }
      }

      if (isCorrect) {
        st.completed = true;
        st.errorMsg = null;
        this.playSound('victory');
        
        // Verificar si completó el paso 2 (cafe y jugo) o paso 3 (mochila y habitacion)
        if (this.currentStep === 2) {
          if (this.everydayState.cafe.completed && this.everydayState.jugo.completed) {
            this.completedSteps.add(2);
            this.saveProgress();
            setTimeout(() => {
              this.showAnimatedTransition('¡GENIAL! COMPLETAS LA PARTE 2. PREPARANDO LA SIGUIENTE ACTIVIDAD...', () => {
                this.selectStep(3);
              });
            }, 600);
          } else {
            this.render();
            setTimeout(() => {
              this.switchEverydayAct('jugo');
            }, 900);
          }
        } else if (this.currentStep === 3) {
          if (this.everydayState.mochila.completed && this.everydayState.habitacion.completed) {
            this.completedSteps.add(3);
            this.saveProgress();
            setTimeout(() => {
              this.showAnimatedTransition('¡FABULOSO! ACTIVIDADES ORDENADAS. PREPARANDO A BITY PARA PROGRAMAR...', () => {
                this.selectStep(4);
              });
            }, 600);
          } else {
            this.render();
            setTimeout(() => {
              this.switchEverydayAct('habitacion');
            }, 900);
          }
        }
      } else {
        st.errorMsg = this.txt('El orden no es correcto o hay un paso que no corresponde. ¡Revisá y volvé a intentar!');
        this.playSound('error');
        this.render();
      }
    }`;

const newEverydayLogic = `    placeBlockInAlgorithm() {
      const st = this.everydayState[this.selectedEverydayAct];
      if (!st.selectedBlock || st.completed) return;

      const actConfig = this.getEverydayActivityData(this.selectedEverydayAct);
      const maxSlots = actConfig.expectedSequence.length;

      if (st.placed.length >= maxSlots) {
        st.errorMsg = this.txt('Ya colocaste todos los bloques requeridos.');
        this.playSound('error');
        this.render();
        return;
      }

      st.placed.push(st.selectedBlock);
      st.selectedBlock = null;
      st.errorMsg = null;
      this.playSound('click');
      this.render();
    }

    removePlacedBlock(index) {
      const st = this.everydayState[this.selectedEverydayAct];
      if (st.completed) return;
      if (index >= 0 && index < st.placed.length) {
        st.placed.splice(index, 1);
        st.errorMsg = null;
        this.playSound('trash');
        this.render();
      }
    }

    movePlacedBlock(index, direction) {
      const st = this.everydayState[this.selectedEverydayAct];
      if (st.completed) return;
      const newIndex = index + direction;
      if (newIndex >= 0 && newIndex < st.placed.length) {
        const temp = st.placed[index];
        st.placed[index] = st.placed[newIndex];
        st.placed[newIndex] = temp;
        st.errorMsg = null;
        this.playSound('click');
        this.render();
      }
    }

    verifyEverydayAlgorithm() {
      const st = this.everydayState[this.selectedEverydayAct];
      const actConfig = this.getEverydayActivityData(this.selectedEverydayAct);
      const expected = actConfig.expectedSequence;

      if (st.placed.length < expected.length) {
        st.errorMsg = this.txt(\`Faltan pasos. Este algoritmo necesita \${expected.length} pasos ordenados.\`);
        this.playSound('error');
        this.render();
        return;
      }

      let isCorrect = true;
      for (let i = 0; i < expected.length; i++) {
        if (st.placed[i] !== expected[i]) {
          isCorrect = false;
          break;
        }
      }

      if (isCorrect) {
        st.completed = true;
        st.errorMsg = null;
        this.playSound('victory');
        if (typeof window !== 'undefined' && window.magicAudioManager && typeof window.magicAudioManager.playGiftOpen === 'function') {
          window.magicAudioManager.playGiftOpen();
        }
        
        // Verificar si completó el paso 2 (cafe y jugo) o paso 3 (mochila y habitacion)
        if (this.currentStep === 2) {
          if (this.everydayState.cafe.completed && this.everydayState.jugo.completed) {
            this.completedSteps.add(2);
            this.saveProgress();
            setTimeout(() => {
              this.showAnimatedTransition('¡GENIAL! COMPLETAS EL BLOQUE I. PREPARANDO EL BLOQUE II...', () => {
                this.selectStep(3);
              });
            }, 600);
          } else {
            this.render();
            const nextKey = this.selectedEverydayAct === 'cafe' ? 'jugo' : 'cafe';
            if (!this.everydayState[nextKey].completed) {
              setTimeout(() => {
                this.switchEverydayAct(nextKey);
              }, 900);
            }
          }
        } else if (this.currentStep === 3) {
          if (this.everydayState.mochila.completed && this.everydayState.habitacion.completed) {
            this.completedSteps.add(3);
            this.saveProgress();
            setTimeout(() => {
              this.showAnimatedTransition('¡FABULOSO! ACTIVIDADES ORDENADAS. PREPARANDO A BITY PARA PROGRAMAR...', () => {
                this.selectStep(4);
              });
            }, 600);
          } else {
            this.render();
            const nextKey = this.selectedEverydayAct === 'mochila' ? 'habitacion' : 'mochila';
            if (!this.everydayState[nextKey].completed) {
              setTimeout(() => {
                this.switchEverydayAct(nextKey);
              }, 900);
            }
          }
        }
      } else {
        st.errorMsg = this.txt('El orden no es correcto o hay un paso que no corresponde. ¡Revisá y volvé a intentar!');
        this.playSound('error');
        this.render();
      }
    }`;

if (content.includes(oldEverydayLogic)) {
  content = content.replace(oldEverydayLogic, newEverydayLogic);
  console.log('Everyday logic updated successfully.');
} else {
  console.warn('Could not find oldEverydayLogic pattern.');
}

// 5. Actualizar botón de navegación superior en renderTopBar()
content = content.replace(
  `<button class="btn-alg-back" type="button" onclick="window.algorithmsModule.exitModule()" title="\${this.txt('Volver a Programación')}">
              <span class="btn-icon">⬅️</span>
              <span class="btn-text">\${this.txt('Volver')}</span>
            </button>`,
  `<button class="btn-alg-back" type="button" onclick="window.algorithmsModule.handleBackButton()" title="\${this.currentStep > 1 ? this.txt('Volver a la introducción de Algoritmos') : this.txt('Volver a Programación')}">
              <span class="btn-icon">⬅️</span>
              <span class="btn-text">\${this.currentStep > 1 ? this.txt('Inicio Algoritmos') : this.txt('Volver')}</span>
            </button>`
);

// 6. Actualizar renderStep1() agregando tarjetas de acceso a BLOQUE I y BLOQUE II
const oldStep1Footer = `          <!-- BOTÓN CONTINUAR -->
          <div class="step-footer-actions">
            <button class="btn-alg-continue" type="button" onclick="window.algorithmsModule.nextStep()">
              \${this.txt('CONTINUAR A LA PARTE 2: CONSTRUCCIÓN CON BLOQUES')} ➔
            </button>
          </div>
        </section>`;

const newStep1Footer = `          <!-- ACCESO DIRECTO A BLOQUE I Y BLOQUE II -->
          <div class="everyday-blocks-overview-grid">
            <div class="block-gateway-card card-bloque-1" onclick="window.algorithmsModule.selectStep(2)" role="button" tabindex="0">
              <span class="gateway-badge">⭐ \${this.txt('ACTIVIDAD PRÁCTICA')}</span>
              <div class="gateway-icon">☕ 🧃</div>
              <h3 class="gateway-title">\${this.txt('BLOQUE I: ALGORITMOS COTIDIANOS')}</h3>
              <p class="gateway-desc">\${this.txt(this.currentGrade >= 3 ? 'Construí el algoritmo paso a paso para preparar un delicioso jugo de frutas natural.' : 'Ayudá a armar la secuencia ordenada de instrucciones para preparar un café caliente.')}</p>
              <button class="btn-gateway" type="button">\${this.txt('INGRESAR AL BLOQUE I')} ➔</button>
            </div>

            <div class="block-gateway-card card-bloque-2" onclick="window.algorithmsModule.selectStep(3)" role="button" tabindex="0">
              <span class="gateway-badge">⭐ \${this.txt('ACTIVIDAD PRÁCTICA')}</span>
              <div class="gateway-icon">🎒 🛏️</div>
              <h3 class="gateway-title">\${this.txt('BLOQUE II: ORDEN Y ORGANIZACIÓN')}</h3>
              <p class="gateway-desc">\${this.txt(this.currentGrade >= 3 ? 'Diseñá la secuencia de pasos lógicos para acomodar y dejar impecable una habitación.' : 'Armá el algoritmo para tener la mochila lista con todos los útiles para el colegio.')}</p>
              <button class="btn-gateway" type="button">\${this.txt('INGRESAR AL BLOQUE II')} ➔</button>
            </div>
          </div>

          <!-- BOTÓN CONTINUAR -->
          <div class="step-footer-actions">
            <button class="btn-alg-continue" type="button" onclick="window.algorithmsModule.nextStep()">
              \${this.txt('CONTINUAR AL BLOQUE I')} ➔
            </button>
          </div>
        </section>`;

if (content.includes(oldStep1Footer)) {
  content = content.replace(oldStep1Footer, newStep1Footer);
  console.log('renderStep1 updated with Bloque I and II gateway cards.');
} else {
  console.warn('Could not find oldStep1Footer pattern.');
}

// 7. Actualizar renderStepEveryday()
const oldRenderStepEveryday = `    renderStepEveryday() {
      const actKey = this.selectedEverydayAct;
      const actConfig = EVERYDAY_ACTIVITIES[actKey];
      const st = this.everydayState[actKey];

      const isStep2 = this.currentStep === 2;
      const availableActs = isStep2 ? ['cafe', 'jugo'] : ['mochila', 'habitacion'];

      return \`
        <section class="alg-section alg-everyday-section animate-fade-in">
          <!-- SELECTOR DE ACTIVIDAD -->
          <div class="everyday-tabs-bar">
            \${availableActs.map(key => {
              const cfg = EVERYDAY_ACTIVITIES[key];
              const isDone = this.everydayState[key].completed;
              return \`
                <button class="btn-everyday-tab \${actKey === key ? 'active' : ''} \${isDone ? 'done' : ''}"
                  type="button"
                  onclick="window.algorithmsModule.switchEverydayAct('\${key}')">
                  <span class="tab-emoji">\${cfg.emoji}</span>
                  <span class="tab-txt">\${this.txt(cfg.title)}</span>
                  \${isDone ? '<span class="tab-check">✓</span>' : ''}
                </button>
              \`;
            }).join('')}
          </div>

          <!-- CONSIGNAS VISUALES -->
          <div class="everyday-instructions-card">
            <div class="inst-icon">\${actConfig.emoji}</div>
            <div class="inst-text">
              <h3 class="inst-title">\${this.txt(actConfig.title)}</h3>
              <p class="inst-desc">\${this.txt(actConfig.desc)}</p>
              <p class="inst-alert">⚠️ \${this.txt('¡ATENCIÓN! Hay bloques tramposos que no corresponden. Elegí solo los necesarios y ordenalos correctamente.')}</p>
            </div>
          </div>

          <!-- ÁREA DE TRABAJO EN 2 PANELES -->
          <div class="everyday-workspace-grid">
            <!-- PANEL IZQUIERDO: BLOQUES DISPONIBLES -->
            <div class="everyday-panel pool-panel">
              <div class="panel-header">
                <span class="panel-tag">📦 \${this.txt('BLOQUES DISPONIBLES')}</span>
                <span class="panel-hint">\${this.txt('Tocá un bloque y agregalo:')}</span>
              </div>

              <div class="available-blocks-list">
                \${actConfig.availableBlocks.map(block => {
                  const isPlaced = st.placed.includes(block.id);
                  const isSelected = st.selectedBlock === block.id;

                  return \`
                    <button class="everyday-block-card \${isPlaced ? 'block-placed' : ''} \${isSelected ? 'block-selected' : ''}"
                      type="button"
                      \${isPlaced || st.completed ? 'disabled' : ''}
                      onclick="window.algorithmsModule.selectAvailableBlock('\${block.id}')">
                      <div class="block-svg-thumb">\${ALGORITHM_SVGS[block.svg] || '📦'}</div>
                      <span class="block-text">\${this.txt(block.text)}</span>
                      \${isPlaced ? '<span class="placed-badge">✓ Usado</span>' : ''}
                    </button>
                  \`;
                }).join('')}
              </div>

              <button class="btn-add-block-to-algo \${st.selectedBlock ? 'btn-active-add' : ''}"
                type="button"
                \${!st.selectedBlock || st.completed ? 'disabled' : ''}
                onclick="window.algorithmsModule.placeBlockInAlgorithm()">
                <span>➕</span> \${this.txt('AGREGAR BLOQUE AL ALGORITMO')}
              </button>
            </div>

            <!-- PANEL DERECHO: TU ALGORITMO ORDENADO -->
            <div class="everyday-panel sequence-panel">
              <div class="panel-header">
                <span class="panel-tag">📜 \${this.txt('TU ALGORITMO (PASOS ORDENADOS)')}</span>
                <span class="panel-counter">\${st.placed.length} / \${actConfig.expectedSequence.length} \${this.txt('pasos')}</span>
              </div>

              <div class="algorithm-slots-container">
                \${st.placed.length === 0 ? \`
                  <div class="empty-sequence-notice">
                    <span class="notice-icon">👈</span>
                    <p>\${this.txt('Seleccioná un bloque del panel izquierdo y presioná "AGREGAR BLOQUE" para armar la secuencia.')}</p>
                  </div>
                \` : \`
                  <div class="placed-blocks-list">
                    \${st.placed.map((blockId, idx) => {
                      const block = actConfig.availableBlocks.find(b => b.id === blockId);
                      return \`
                        <div class="placed-step-card animate-scale-up">
                          <span class="step-index">\${idx + 1}</span>
                          <div class="placed-step-svg">\${ALGORITHM_SVGS[block.svg] || '📦'}</div>
                          <span class="placed-step-text">\${this.txt(block.text)}</span>

                          <div class="step-order-controls">
                            \${idx > 0 && !st.completed ? \`
                              <button class="btn-step-order" type="button" onclick="window.algorithmsModule.movePlacedBlock(\${idx}, -1)" title="Subir">▲</button>
                            \` : ''}
                            \${idx < st.placed.length - 1 && !st.completed ? \`
                              <button class="btn-step-order" type="button" onclick="window.algorithmsModule.movePlacedBlock(\${idx}, 1)" title="Bajar">▼</button>
                            \` : ''}
                            \${!st.completed ? \`
                              <button class="btn-step-remove" type="button" onclick="window.algorithmsModule.removePlacedBlock(\${idx})" title="Quitar">✕</button>
                            \` : ''}
                          </div>
                        </div>
                      \`;
                    }).join('')}
                  </div>
                \`}
              </div>

              <!-- FEEDBACK DE ERROR O ÉXITO -->
              \${st.errorMsg ? \`
                <div class="everyday-feedback-box feedback-error animate-scale-up">
                  <span>⚠️</span> \${st.errorMsg}
                </div>
              \` : ''}

              \${st.completed ? \`
                <div class="everyday-feedback-box feedback-success animate-scale-up">
                  <span>🎉</span> \${this.txt('¡EXCELENTE! El algoritmo es perfecto y el orden es el correcto.')}
                </div>
              \` : ''}

              <!-- BOTONES DE ACCIÓN -->
              <div class="everyday-panel-actions">
                <button class="btn-everyday-reset" type="button" onclick="window.algorithmsModule.resetEverydayActivity()">
                  <span>🔄</span> \${this.txt('REINICIAR')}
                </button>
                <button class="btn-everyday-verify \${st.completed ? 'btn-done' : ''}" 
                  type="button" 
                  \${st.completed ? 'disabled' : ''}
                  onclick="window.algorithmsModule.verifyEverydayAlgorithm()">
                  <span>\${st.completed ? '✅' : '🚀'}</span> \${st.completed ? this.txt('¡COMPLETADO!') : this.txt('VERIFICAR ALGORITMO')}
                </button>
              </div>
            </div>
          </div>
        </section>
      \`;
    }`;

const newRenderStepEveryday = `    renderStepEveryday() {
      const actKey = this.selectedEverydayAct;
      const actConfig = this.getEverydayActivityData(actKey);
      const st = this.everydayState[actKey];

      const isStep2 = this.currentStep === 2;
      const availableActs = isStep2 ? ['cafe', 'jugo'] : ['mochila', 'habitacion'];

      return \`
        <section class="alg-section alg-everyday-section animate-fade-in">
          <!-- BARRA SUPERIOR DE NAVEGACIÓN DENTRO DEL BLOQUE -->
          <div class="everyday-top-nav">
            <button class="btn-block-back" type="button" onclick="window.algorithmsModule.selectStep(1)" title="\${this.txt('Volver a ¿Qué es un Algoritmo?')}">
              <span>⬅️</span> \${this.txt('Volver a ¿Qué es un Algoritmo?')}
            </button>
            <span class="block-section-indicator">
              \${isStep2 ? this.txt('BLOQUE I: ALGORITMOS COTIDIANOS') : this.txt('BLOQUE II: ORDEN Y ORGANIZACIÓN')}
            </span>
          </div>

          <!-- SELECTOR DE ACTIVIDAD -->
          <div class="everyday-tabs-bar">
            \${availableActs.map(key => {
              const cfg = this.getEverydayActivityData(key);
              const isDone = this.everydayState[key].completed;
              return \`
                <button class="btn-everyday-tab \${actKey === key ? 'active' : ''} \${isDone ? 'done' : ''}"
                  type="button"
                  onclick="window.algorithmsModule.switchEverydayAct('\${key}')">
                  <span class="tab-emoji">\${cfg.emoji}</span>
                  <span class="tab-txt">\${this.txt(cfg.title)}</span>
                  \${isDone ? '<span class="tab-check">✓</span>' : ''}
                </button>
              \`;
            }).join('')}
          </div>

          <!-- CONSIGNAS VISUALES -->
          <div class="everyday-instructions-card">
            <div class="inst-icon">\${actConfig.emoji}</div>
            <div class="inst-text">
              <h3 class="inst-title">\${this.txt(actConfig.title)}</h3>
              <p class="inst-desc">\${this.txt(actConfig.desc)}</p>
              \${actConfig.safety ? \`<p class="inst-alert">\${this.txt(actConfig.safety)}</p>\` : ''}
              <p class="inst-alert" style="background: rgba(248,178,41,0.15); border-color: rgba(248,178,41,0.45); color: #ffd700;">
                💡 \${this.txt('¡ATENCIÓN! Hay bloques tramposos que no corresponden. Elegí solo los necesarios y ordenalos correctamente.')}
              </p>
            </div>
          </div>

          <!-- ÁREA DE TRABAJO EN 2 PANELES -->
          <div class="everyday-workspace-grid">
            <!-- PANEL IZQUIERDO: BLOQUES DISPONIBLES -->
            <div class="everyday-panel pool-panel">
              <div class="panel-header">
                <span class="panel-tag">📦 \${this.txt('BLOQUES DISPONIBLES')}</span>
                <span class="panel-hint">\${this.txt('Tocá un bloque y agregalo:')}</span>
              </div>

              <div class="available-blocks-list">
                \${actConfig.availableBlocks.map(block => {
                  const isPlaced = st.placed.includes(block.id);
                  const isSelected = st.selectedBlock === block.id;

                  return \`
                    <button class="everyday-block-card \${isPlaced ? 'block-placed' : ''} \${isSelected ? 'block-selected' : ''}"
                      type="button"
                      \${isPlaced || st.completed ? 'disabled' : ''}
                      onclick="window.algorithmsModule.selectAvailableBlock('\${block.id}')">
                      <div class="block-svg-thumb">\${ALGORITHM_SVGS[block.svg] || '📦'}</div>
                      <span class="block-text">\${this.txt(block.text)}</span>
                      \${isPlaced ? '<span class="placed-badge">✓ Usado</span>' : ''}
                    </button>
                  \`;
                }).join('')}
              </div>

              <button class="btn-add-block-to-algo \${st.selectedBlock ? 'btn-active-add' : ''}"
                type="button"
                \${!st.selectedBlock || st.completed ? 'disabled' : ''}
                onclick="window.algorithmsModule.placeBlockInAlgorithm()">
                <span>➕</span> \${this.txt('AGREGAR BLOQUE AL ALGORITMO')}
              </button>
            </div>

            <!-- PANEL DERECHO: TU ALGORITMO ORDENADO -->
            <div class="everyday-panel sequence-panel">
              <div class="panel-header">
                <span class="panel-tag">📜 \${this.txt('TU ALGORITMO (PASOS ORDENADOS)')}</span>
                <span class="panel-counter">\${st.placed.length} / \${actConfig.expectedSequence.length} \${this.txt('pasos')}</span>
              </div>

              <div class="algorithm-slots-container">
                \${st.placed.length === 0 ? \`
                  <div class="empty-sequence-notice">
                    <span class="notice-icon">👈</span>
                    <p>\${this.txt('Seleccioná un bloque del panel izquierdo y presioná "AGREGAR BLOQUE" para armar la secuencia.')}</p>
                  </div>
                \` : \`
                  <div class="placed-blocks-list">
                    \${st.placed.map((blockId, idx) => {
                      const block = actConfig.availableBlocks.find(b => b.id === blockId);
                      return \`
                        <div class="placed-step-card animate-scale-up">
                          <span class="step-index">\${idx + 1}</span>
                          <div class="placed-step-svg">\${ALGORITHM_SVGS[block ? block.svg : ''] || '📦'}</div>
                          <span class="placed-step-text">\${this.txt(block ? block.text : '')}</span>

                          <div class="step-order-controls">
                            \${idx > 0 && !st.completed ? \`
                              <button class="btn-step-order" type="button" onclick="window.algorithmsModule.movePlacedBlock(\${idx}, -1)" title="Subir">▲</button>
                            \` : ''}
                            \${idx < st.placed.length - 1 && !st.completed ? \`
                              <button class="btn-step-order" type="button" onclick="window.algorithmsModule.movePlacedBlock(\${idx}, 1)" title="Bajar">▼</button>
                            \` : ''}
                            \${!st.completed ? \`
                              <button class="btn-step-remove" type="button" onclick="window.algorithmsModule.removePlacedBlock(\${idx})" title="Quitar">✕</button>
                            \` : ''}
                          </div>
                        </div>
                      \`;
                    }).join('')}
                  </div>
                \`}
              </div>

              <!-- FEEDBACK DE ERROR O ÉXITO -->
              \${st.errorMsg ? \`
                <div class="everyday-feedback-box feedback-error animate-scale-up">
                  <span>⚠️</span> \${st.errorMsg}
                </div>
              \` : ''}

              \${st.completed ? \`
                <div class="everyday-feedback-box feedback-success animate-scale-up">
                  <span>🎉</span> \${this.txt('¡EXCELENTE! El algoritmo es perfecto y el orden es el correcto.')}
                </div>
              \` : ''}

              <!-- BOTONES DE ACCIÓN -->
              <div class="everyday-panel-actions">
                <button class="btn-everyday-reset" type="button" onclick="window.algorithmsModule.resetEverydayActivity()">
                  <span>🔄</span> \${this.txt('REINICIAR')}
                </button>
                <button class="btn-everyday-verify \${st.completed ? 'btn-done' : ''}" 
                  type="button" 
                  \${st.completed ? 'disabled' : ''}
                  onclick="window.algorithmsModule.verifyEverydayAlgorithm()">
                  <span>\${st.completed ? '✅' : '🚀'}</span> \${st.completed ? this.txt('¡COMPLETADO!') : this.txt('VERIFICAR ALGORITMO')}
                </button>
              </div>
            </div>
          </div>
        </section>
      \`;
    }`;

if (content.includes(oldRenderStepEveryday)) {
  content = content.replace(oldRenderStepEveryday, newRenderStepEveryday);
  console.log('renderStepEveryday updated successfully.');
} else {
  console.warn('Could not find oldRenderStepEveryday pattern.');
}

// 8. Actualizar triggerQuestionModal e iconos de laberinto
content = content.replace(
  `const itemEmoji = item.type === 'door' ? '🚪' : (item.type === 'window' ? '🪟' : (item.type === 'chest' ? '🎁' : '🎃'));`,
  `const itemEmoji = item.type === 'door' ? '🚪' : (item.type === 'window' ? '🪟' : (item.type === 'chest' ? '🎁' : (item.type === 'bell' ? '🔔' : (item.type === 'tree' ? '🎄' : '🎁'))));`
);

content = content.replace(
  `itemEmoji = item.type === 'door' ? '🚪⭐' : (item.type === 'window' ? '🪟⭐' : (item.type === 'chest' ? '🎁⭐' : '🎃⭐'));`,
  `itemEmoji = item.type === 'door' ? '🚪⭐' : (item.type === 'window' ? '🪟⭐' : (item.type === 'chest' ? '🎁⭐' : (item.type === 'bell' ? '🔔⭐' : (item.type === 'tree' ? '🎄⭐' : '🎁⭐'))));`
);

content = content.replace(
  `itemEmoji = item.type === 'door' ? '🚪' : (item.type === 'window' ? '🪟' : (item.type === 'chest' ? '🎁' : '🎃'));`,
  `itemEmoji = item.type === 'door' ? '🚪' : (item.type === 'window' ? '🪟' : (item.type === 'chest' ? '🎁' : (item.type === 'bell' ? '🔔' : (item.type === 'tree' ? '🎄' : '🎁'))));`
);

// 9. Actualizar renderFinalCelebration() con ambientación navideña
const oldCelebration = `    renderFinalCelebration() {
      const totalStars = this.getStarsCount();

      return \`
        <div class="alg-card final-celebration-card animate-scale-up">
          <div class="celebration-confetti">✨ 🦇 ⭐ 🎃 🏆 🎃 ⭐ 🦇 ✨</div>
          
          <!-- AMBIENTACIÓN INMERSIVA DE HALLOWEEN -->
          <div class="halloween-celebration-hero">
            <div class="halloween-spooky-scene">
              <div class="halloween-moon"></div>
              <div class="halloween-bats">🦇 🦇</div>
              <div class="halloween-castle">🏰</div>
            </div>
            
            <div class="halloween-stars-banner">
              ⭐ \${this.txt('RECOLECTASTE')} \${totalStars} \${this.txt('ESTRELLAS MÁGICAS EN EL CASTILLO')} ⭐
            </div>
          </div>

          <h2 class="celebration-title">🎃 \${this.txt('¡FELICITACIONES, GRAN PROGRAMADOR/A!')} 🎃</h2>
          <p class="celebration-subtitle">\${this.txt('Completaste con éxito todos los desafíos de la Clase N.º 1 de Algoritmos.')}</p>

          <div class="celebration-trophy-box">
            \${ALGORITHM_SVGS.algoritmo_concepto || ''}
          </div>

          <div class="celebration-summary-box">
            <h4>\${this.txt('LO QUE APRENDIMOS Y LOGRAMOS HOY:')}</h4>
            <ul>
              <li>✅ <strong>\${this.txt('Qué es un algoritmo:')}</strong> \${this.txt('Una secuencia de instrucciones ordenadas para resolver un problema.')}</li>
              <li>✅ <strong>\${this.txt('La importancia del orden:')}</strong> \${this.txt('Si cambiamos el orden, el objetivo no se alcanza.')}</li>
              <li>✅ <strong>\${this.txt('Construcción con bloques:')}</strong> \${this.txt('Identificamos los pasos necesarios y descartamos distractores cotidianos.')}</li>
              <li>✅ <strong>\${this.txt('Programación en 4 direcciones:')}</strong> \${this.txt('Guiamos a Bity con Arriba, Abajo, Izquierda y Derecha.')}</li>
              <li>✅ <strong>\${this.txt('Desafíos en Puertas y Ventanas:')}</strong> \${this.txt('Resolviste con éxito preguntas de pensamiento computacional.')}</li>
              <li>✅ <strong>\${this.txt('Eficiencia algorítmica:')}</strong> \${this.txt('Descubriste cómo optimizar rutas y resolver retos complejos.')}</li>
            </ul>
          </div>

          <div class="celebration-btn-row">
            <button class="btn-alg-reset" type="button" onclick="window.algorithmsModule.resetMaze()">
              <span>🔄</span> \${this.txt('PROBAR OTRO CAMINO')}
            </button>
            <button class="btn-alg-finish" type="button" onclick="window.algorithmsModule.exitModule()">
              <span>🏆</span> \${this.txt('FINALIZAR CLASE Y GUARDAR')}
            </button>
          </div>
        </div>
      \`;
    }`;

const newCelebration = `    renderFinalCelebration() {
      const totalStars = this.getStarsCount();
      if (typeof window !== 'undefined' && window.magicAudioManager && typeof window.magicAudioManager.playActivityComplete === 'function') {
        window.magicAudioManager.playActivityComplete();
      }

      return \`
        <div class="alg-card final-celebration-card animate-scale-up">
          <div class="celebration-confetti">✨ 🎄 ⭐ 🎁 🏆 🎁 ⭐ 🎄 ✨</div>
          
          <!-- AMBIENTACIÓN NAVIDEÑA -->
          <div class="christmas-celebration-hero" style="text-align: center; margin: 16px 0;">
            <div style="font-size: 3.5rem; margin-bottom: 8px;">🎅 🎄 🎁</div>
            <div class="halloween-stars-banner" style="background: linear-gradient(135deg, rgba(22,91,51,0.6), rgba(212,36,38,0.6)); border-color: #ffd700; color: #ffd700;">
              ⭐ \${this.txt('RECOLECTASTE')} \${totalStars} \${this.txt('ESTRELLAS MÁGICAS EN EL REINO NAVIDEÑO')} ⭐
            </div>
          </div>

          <h2 class="celebration-title">🎄 \${this.txt('¡FELICITACIONES, GRAN PROGRAMADOR/A NAVIDEÑO/A!')} 🎄</h2>
          <p class="celebration-subtitle">\${this.txt('Completaste con éxito todos los desafíos de la Clase N.º 1 de Algoritmos.')}</p>

          <div class="celebration-trophy-box" style="display: flex; justify-content: center; margin: 16px 0;">
            \${ALGORITHM_SVGS.algoritmo_concepto || ''}
          </div>

          <div class="celebration-summary-box">
            <h4>\${this.txt('LO QUE APRENDIMOS Y LOGRAMOS HOY:')}</h4>
            <ul>
              <li>✅ <strong>\${this.txt('Qué es un algoritmo:')}</strong> \${this.txt('Una secuencia de instrucciones ordenadas para resolver un problema.')}</li>
              <li>✅ <strong>\${this.txt('La importancia del orden:')}</strong> \${this.txt('Si cambiamos el orden, el objetivo no se alcanza.')}</li>
              <li>✅ <strong>\${this.txt('Construcción con bloques:')}</strong> \${this.txt('Identificamos los pasos necesarios y descartamos distractores cotidianos.')}</li>
              <li>✅ <strong>\${this.txt('Programación en 4 direcciones:')}</strong> \${this.txt('Guiamos a Bity con Arriba, Abajo, Izquierda y Derecha.')}</li>
              <li>✅ <strong>\${this.txt('Desafíos en Puertas y Ventanas:')}</strong> \${this.txt('Resolviste con éxito preguntas de pensamiento computacional.')}</li>
              <li>✅ <strong>\${this.txt('Eficiencia algorítmica:')}</strong> \${this.txt('Descubriste cómo optimizar rutas y resolver retos complejos.')}</li>
            </ul>
          </div>

          <div class="celebration-btn-row">
            <button class="btn-alg-reset" type="button" onclick="window.algorithmsModule.resetMaze()">
              <span>🔄</span> \${this.txt('PROBAR OTRO CAMINO')}
            </button>
            <button class="btn-alg-finish" type="button" onclick="window.algorithmsModule.exitModule()">
              <span>🏆</span> \${this.txt('FINALIZAR CLASE Y GUARDAR')}
            </button>
          </div>
        </div>
      \`;
    }`;

if (content.includes(oldCelebration)) {
  content = content.replace(oldCelebration, newCelebration);
  console.log('renderFinalCelebration updated successfully.');
} else {
  console.warn('Could not find oldCelebration pattern.');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('algorithmsModule.js written successfully!');
