const fs = require('fs');

const file = 'index.html';
const raw = fs.readFileSync(file, 'utf8');
const isCrlf = raw.includes('\r\n');
const normalized = raw.replace(/\r\n/g, '\n');

const target = `      <!-- Modal Didáctico: ¿Qué es una Instrucción? (Para el Desafío Especial de cada grado) -->
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
      </div>`;

const replacement = `      <!-- Modal Didáctico: Consigna Pedagógica del Desafío Final -->
      <div id="bityblockly-instruction-concept-modal" class="bityblockly-modal-overlay">
        <div class="bityblockly-concept-card">
          <!-- Encabezado con Avatar de Bity y Badges de Halloween -->
          <div class="concept-modal-header">
            <div class="concept-bity-avatar-wrap">
              <div id="bityblockly-concept-avatar" class="concept-bity-avatar">
                <!-- SVG de Bity animado -->
              </div>
              <span class="concept-halloween-badge">🎃 DESAFÍO ESPECIAL DE HALLOWEEN 🚀</span>
            </div>
            <h3 id="bityblockly-concept-title" class="concept-modal-title">¡ATENCIÓN, PROGRAMADORES!</h3>
            <h4 id="bityblockly-concept-subtitle" class="concept-modal-subtitle">
              Antes de comenzar esta última misión, ¡tené en cuenta algo importante!
            </h4>
          </div>

          <div class="concept-modal-body">
            <!-- Grilla interactiva de los 4 pilares de la consigna -->
            <div id="bityblockly-concept-items-grid" class="concept-consigna-grid">
              <!-- Se puebla dinámicamente según el grado -->
            </div>

            <!-- Frase Lema de Aliento -->
            <div class="concept-motto-box">
              <span class="motto-icon">⭐</span>
              <span id="bityblockly-concept-motto" class="motto-text">
                ¡PREPARATE, PENSÁ TU CAMINO Y AYUDÁ A BITY A LLEGAR!
              </span>
              <span class="motto-icon">⭐</span>
            </div>
          </div>

          <div class="concept-modal-actions">
            <button type="button" id="btn-bityblockly-start-instruction-challenge" class="btn-concept-start">
              <span>🚀</span> <span id="btn-concept-start-text">¡ENTENDÍ! COMENZAR EL DESAFÍO</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Modal de Cierre y Reflexión: Desafío Especial de Instrucciones -->
      <div id="bityblockly-instruction-summary-modal" class="bityblockly-modal-overlay">
        <div class="bityblockly-instruction-summary-card">
          <div class="summary-modal-header">
            <span class="summary-modal-icon">🎯🏆</span>
            <h3 id="bityblockly-summary-title" class="summary-modal-title">¡FELICITACIONES! ¡BITY LLEGÓ A LA META!</h3>
            <h4 id="bityblockly-summary-subtitle" class="summary-modal-subtitle">
              UTILIZASTE <span id="bityblockly-summary-subtitle-count" class="summary-subtitle-highlight">0</span> INSTRUCCIONES PARA COMPLETAR EL RECORRIDO.
            </h4>
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

            <!-- Registro obligatorio y visible en Classroom -->
            <div class="classroom-share-callout">
              <div class="classroom-callout-header">
                <span class="callout-icon">📋🎒</span>
                <span class="callout-badge" id="summary-classroom-badge">REGISTRO EN CLASSROOM</span>
              </div>
              <div class="callout-msg" id="summary-classroom-callout-msg">
                AHORA ANOTÁ TU RESULTADO Y PUBLICALO EN CLASSROOM, EN LA SECCIÓN TAREAS.
              </div>
              <div class="callout-submsg" id="summary-classroom-callout-submsg">
                Compartí con tu docente y tus compañeros cuántas instrucciones utilizaste y qué camino recorriste.
              </div>
            </div>

            <!-- Reflexión pedagógica sobre múltiples soluciones -->
            <div class="classroom-reflection-box">
              <div class="reflection-tag">💬 PREGUNTA PARA REFLEXIONAR EN EL AULA:</div>
              <p class="reflection-text" id="bityblockly-summary-reflection-text">
                ¿Pudiste haber llegado a la meta con menos instrucciones? ¿Qué camino fue más corto y cuál más largo? ¡Compartí tu estrategia con tus compañeros y tu profe!
              </p>
            </div>
          </div>
          <div class="summary-modal-actions">
            <button type="button" id="btn-bityblockly-summary-retry" class="btn-summary-action btn-summary-retry">
              <span>🔄</span> Probar otro camino
            </button>
            <button type="button" id="btn-bityblockly-summary-next" class="btn-summary-action btn-summary-next">
              <span>🌟</span> ¡Finalizar Grado!
            </button>
          </div>
        </div>
      </div>`;

if (!normalized.includes(target)) {
  console.error('Target not found in index.html!');
  process.exit(1);
}

const updated = normalized.replace(target, replacement);
fs.writeFileSync(file, isCrlf ? updated.replace(/\n/g, '\r\n') : updated, 'utf8');
console.log('Successfully updated index.html with new concept and summary modal structure');
