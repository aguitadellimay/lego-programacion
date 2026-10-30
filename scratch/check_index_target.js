const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

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

const normalizedHtml = indexHtml.replace(/\r\n/g, '\n');
const normalizedTarget = target.replace(/\r\n/g, '\n');

console.log('Matches target:', normalizedHtml.includes(normalizedTarget));
