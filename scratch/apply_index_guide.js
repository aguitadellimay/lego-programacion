const fs = require('fs');

const raw = fs.readFileSync('index.html', 'utf8');
const isCrlf = raw.includes('\r\n');
const normalized = raw.replace(/\r\n/g, '\n');

const target = `          <!-- Briefing del Nivel -->
          <div class="bityblockly-briefing-card">
            <div class="bityblockly-level-header">
              <h3 id="bityblockly-level-title" class="bityblockly-level-name">Nivel 1: El camino de Marte</h3>
              <span id="bityblockly-badge-text" class="bityblockly-level-badge">Nivel 1 de 5</span>
            </div>
            <p id="bityblockly-story-text" class="bityblockly-story-text">
              Bity terminó su exploración de Marte y necesita volver a la base de aterrizaje. ¡Programá sus movimientos para llegar a la nave espacial!
            </p>
            <p id="bityblockly-hint-text" class="bityblockly-hint-text">
              💡 Tocá los bloques para armar tu programa. ¡Cada bloque es una instrucción de movimiento!
            </p>

            <!-- Sistema de Pistas Progresivas -->
            <div class="bityblockly-hints-action-wrap">
              <button type="button" id="btn-bityblockly-ask-hint" class="btn-bityblockly-hint" title="Pedir una pista progresiva">
                <span>💡</span> Pedir Pista (<span id="bityblockly-hint-count">0</span> / 3)
              </button>
              <div id="bityblockly-progressive-hints-box" class="progressive-hints-box" style="display: none;"></div>
            </div>
          </div>`;

const replacement = `          <!-- Briefing del Nivel y Personaje Guía Bity -->
          <div class="bityblockly-briefing-card">
            <div class="bityblockly-level-header">
              <h3 id="bityblockly-level-title" class="bityblockly-level-name">Nivel 1: El camino de Marte</h3>
              <span id="bityblockly-badge-text" class="bityblockly-level-badge">Nivel 1 de 6</span>
            </div>
            <p id="bityblockly-story-text" class="bityblockly-story-text">
              Bity terminó su exploración de Marte y necesita volver a la base de aterrizaje. ¡Programá sus movimientos para llegar a la nave espacial!
            </p>

            <!-- PERSONAJE GUÍA PERMANENTE BITY -->
            <div id="bity-guide-companion-box" class="bity-guide-companion-box">
              <div class="bity-guide-avatar-wrap">
                <div id="bity-guide-avatar-container" class="bity-guide-avatar-container" title="Bity • Tu guía espacial">
                  <!-- SVG dinámico de Bity o invitado de Halloween -->
                </div>
                <span id="bity-guide-nametag" class="bity-guide-nametag">BITY</span>
              </div>
              <div class="bity-guide-dialog-container">
                <div class="bity-guide-bubble">
                  <div class="bity-guide-bubble-header">
                    <span id="bity-guide-speaker-badge" class="bity-guide-speaker-badge">🤖 BITY • TU GUÍA ESPACIAL</span>
                    <button type="button" id="btn-bity-ask-hint" class="btn-bity-ask-hint" title="Pedir una pista">
                      <span>💡</span> <span id="btn-bity-ask-hint-text">PEDIR UNA PISTA</span>
                    </button>
                  </div>
                  <div id="bity-guide-message" class="bity-guide-message-text">
                    ¡HOLA! HOY TENEMOS UNA NUEVA MISIÓN. OBSERVÁ EL CAMINO ANTES DE COMENZAR.
                  </div>
                </div>
              </div>
            </div>

            <!-- Compatibilidad: Pistas Progresivas en segundo plano -->
            <p id="bityblockly-hint-text" class="bityblockly-hint-text" style="display: none;">
              💡 Tocá los bloques para armar tu programa. ¡Cada bloque es una instrucción de movimiento!
            </p>
            <div class="bityblockly-hints-action-wrap" style="display: none;">
              <button type="button" id="btn-bityblockly-ask-hint" class="btn-bityblockly-hint" title="Pedir una pista progresiva">
                <span>💡</span> Pedir Pista (<span id="bityblockly-hint-count">0</span> / 3)
              </button>
              <div id="bityblockly-progressive-hints-box" class="progressive-hints-box" style="display: none;"></div>
            </div>
          </div>`;

if (!normalized.includes(target)) {
  console.error('Target not found in normalized text!');
  process.exit(1);
}

const updated = normalized.replace(target, replacement);
const finalContent = isCrlf ? updated.replace(/\n/g, '\r\n') : updated;

fs.writeFileSync('index.html', finalContent, 'utf8');
console.log('Successfully updated index.html with Bity Guide companion box');
