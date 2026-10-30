const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Lives indicator in header
const headerTarget = `<div class="bityblockly-title-wrap">
            <h2 class="bityblockly-main-title">🚀 BityBlockly: Misión espacial</h2>
            <span id="bityblockly-sub-badge" class="bityblockly-sub-badge">1.er Grado • Programación por Bloques</span>
          </div>`;

const headerReplacement = `<div class="bityblockly-title-wrap">
            <h2 class="bityblockly-main-title">🚀 BityBlockly: Misión espacial</h2>
            <span id="bityblockly-sub-badge" class="bityblockly-sub-badge">1.er Grado • Programación por Bloques</span>
          </div>
          <div id="bityblockly-lives-wrap" class="bityblockly-lives-wrap" title="Vidas de Byte">
            <span class="lives-label">VIDAS:</span>
            <span id="bityblockly-lives-hearts" class="lives-hearts">❤️❤️❤️</span>
          </div>`;

// 2. Lives in math modal
const mathModalTarget = `<div class="math-door-icon-wrap">⚡</div>`;
const mathModalReplacement = `<div class="math-modal-header-top">
            <div class="math-door-icon-wrap">⚡</div>
            <div id="math-modal-lives-box" class="math-modal-lives-box" title="Vidas de Byte para esta compuerta">
              <span class="lives-modal-label">VIDAS:</span>
              <span id="math-modal-lives-hearts" class="lives-hearts">❤️❤️❤️</span>
            </div>
          </div>`;

// 3. Concept and Summary modals before screen-game
const screenEndTarget = `              <button type="button" class="btn-victory-syllabus" id="btn-final-back-grade1">
                <span>🎒</span> Volver a 1.er grado
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;

const modalsHtml = `              <button type="button" class="btn-victory-syllabus" id="btn-final-back-grade1">
                <span>🎒</span> Volver a 1.er grado
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Didáctico: ¿Qué es una Instrucción? (Para el Desafío Especial de cada grado) -->
      <div id="bityblockly-instruction-concept-modal" class="bityblockly-modal-overlay">
        <div class="bityblockly-concept-card">
          <div class="concept-modal-header">
            <span class="concept-modal-icon">💡</span>
            <h3 class="concept-modal-title">¿QUÉ ES UNA INSTRUCCIÓN?</h3>
          </div>
          <div class="concept-modal-body">
            <p class="concept-lead-text">
              <strong>Una instrucción son pasos claros para cumplir una meta.</strong>
            </p>
            <p class="concept-story-text">
              Por ejemplo, si queremos lavarnos los dientes, primero hacemos esto, luego esto y por último esto. Cada paso que hicimos es una instrucción:
            </p>
            <div class="concept-steps-grid">
              <div class="concept-step-item">
                <span class="concept-step-num">1</span>
                <span class="concept-step-icon">🪥</span>
                <span class="concept-step-desc">Tomar el cepillo</span>
              </div>
              <div class="concept-step-item">
                <span class="concept-step-num">2</span>
                <span class="concept-step-icon">🧴</span>
                <span class="concept-step-desc">Colocar pasta dental</span>
              </div>
              <div class="concept-step-item">
                <span class="concept-step-num">3</span>
                <span class="concept-step-icon">😁</span>
                <span class="concept-step-desc">Cepillarse los dientes</span>
              </div>
              <div class="concept-step-item">
                <span class="concept-step-num">4</span>
                <span class="concept-step-icon">💧</span>
                <span class="concept-step-desc">Enjuagarse la boca</span>
              </div>
            </div>
            <p class="concept-foot-text">
              En este desafío especial, cada bloque que programás (Avanzar, Girar a la izquierda, Girar a la derecha) es <strong>una instrucción</strong>. ¡Descubrí los distintos caminos hacia la meta y contá cuántas instrucciones utilizás!
            </p>
          </div>
          <div class="concept-modal-actions">
            <button type="button" id="btn-bityblockly-start-instruction-challenge" class="btn-concept-start">
              🚀 ¡ENTENDÍ! COMENZAR EL DESAFÍO
            </button>
          </div>
        </div>
      </div>

      <!-- Modal de Cierre y Reflexión: Desafío Especial de Instrucciones -->
      <div id="bityblockly-instruction-summary-modal" class="bityblockly-modal-overlay">
        <div class="bityblockly-instruction-summary-card">
          <div class="summary-modal-header">
            <span class="summary-modal-icon">🎯🏆</span>
            <h3 class="summary-modal-title">¡LLEGASTE A LA META!</h3>
            <h4 class="summary-modal-subtitle">¿CUÁNTAS INSTRUCCIONES UTILIZASTE?</h4>
          </div>
          <div class="summary-modal-body">
            <div class="instruction-counter-highlight">
              <span class="instruction-count-number" id="bityblockly-summary-total-count">0</span>
              <span class="instruction-count-label">INSTRUCCIONES TOTALES</span>
            </div>
            <div class="instruction-breakdown-grid">
              <div class="instruction-breakdown-card">
                <span class="breakdown-icon">⬆️</span>
                <span class="breakdown-val" id="bityblockly-summary-moves-count">0</span>
                <span class="breakdown-lbl">Movimientos (Avanzar)</span>
              </div>
              <div class="instruction-breakdown-card">
                <span class="breakdown-icon">🔄</span>
                <span class="breakdown-val" id="bityblockly-summary-turns-count">0</span>
                <span class="breakdown-lbl">Giros (Der / Izq)</span>
              </div>
              <div class="instruction-breakdown-card">
                <span class="breakdown-icon">🗺️</span>
                <span class="breakdown-val" id="bityblockly-summary-route-name">Ruta A</span>
                <span class="breakdown-lbl">Camino elegido</span>
              </div>
            </div>

            <div class="classroom-reflection-box">
              <div class="reflection-tag">💬 PREGUNTA PARA REFLEXIONAR EN EL AULA:</div>
              <p class="reflection-text" id="bityblockly-summary-reflection-text">
                ¿Pudiste haber llegado a la meta con menos instrucciones? ¿Qué camino fue más corto y cuál más largo? ¡Compartí tu estrategia con tus compañeros y tu profe!
              </p>
            </div>
          </div>
          <div class="summary-modal-actions">
            <button type="button" id="btn-bityblockly-summary-retry" class="btn-summary-action btn-summary-retry">
              🔄 Probar otro camino
            </button>
            <button type="button" id="btn-bityblockly-summary-next" class="btn-summary-action btn-summary-next">
              🌟 ¡Finalizar Grado!
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>`;

// Normalize CRLF to LF for search and replacement
const normalized = html.replace(/\r\n/g, '\n');

if (!normalized.includes(headerTarget.replace(/\r\n/g, '\n'))) {
  console.error('headerTarget not found!');
  process.exit(1);
}
if (!normalized.includes(mathModalTarget.replace(/\r\n/g, '\n'))) {
  console.error('mathModalTarget not found!');
  process.exit(1);
}
if (!normalized.includes(screenEndTarget.replace(/\r\n/g, '\n'))) {
  console.error('screenEndTarget not found!');
  process.exit(1);
}

let updated = normalized.replace(headerTarget.replace(/\r\n/g, '\n'), headerReplacement.replace(/\r\n/g, '\n'));
updated = updated.replace(mathModalTarget.replace(/\r\n/g, '\n'), mathModalReplacement.replace(/\r\n/g, '\n'));
updated = updated.replace(screenEndTarget.replace(/\r\n/g, '\n'), modalsHtml.replace(/\r\n/g, '\n'));

// Restore CRLF
const finalHtml = updated.replace(/\n/g, '\r\n');
fs.writeFileSync('index.html', finalHtml, 'utf8');
console.log('Successfully updated index.html!');
