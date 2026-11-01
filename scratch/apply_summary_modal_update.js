const fs = require('fs');

console.log('--- Applying Summary Modal Reorganization & Halloween Celebration ---');

// ====================================================================
// 1. UPDATE index.html
// ====================================================================
const indexPath = 'index.html';
let indexContent = fs.readFileSync(indexPath, 'utf8');

const oldModalRegex = /<!-- Modal de Cierre y Reflexión: Desafío Especial de Instrucciones -->[\s\S]*?<div id="bityblockly-instruction-summary-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newModalHtml = `<!-- Modal de Cierre y Celebración de Halloween: Desafío Especial de Instrucciones -->
      <div id="bityblockly-instruction-summary-modal" class="bityblockly-modal-overlay">
        <!-- Efectos de Celebración de Halloween (Murciélagos, Fantasmas y Chispas mágicas) -->
        <div class="summary-halloween-fx" aria-hidden="true">
          <div class="summary-fx-bat bat-top-left">🦇</div>
          <div class="summary-fx-bat bat-top-right">🦇</div>
          <div class="summary-fx-bat bat-mid-fly">🦇</div>
          <div class="summary-fx-ghost ghost-float-left">👻</div>
          <div class="summary-fx-ghost ghost-float-right">👻</div>
          <div class="summary-fx-sparkle s-1">✨</div>
          <div class="summary-fx-sparkle s-2">🌟</div>
          <div class="summary-fx-sparkle s-3">⭐</div>
          <div class="summary-fx-sparkle s-4">✨</div>
        </div>

        <div class="bityblockly-instruction-summary-card">
          <!-- Encabezado Compacto y Celebratorio -->
          <div class="summary-modal-header">
            <div class="summary-header-badge">
              <span class="summary-badge-pumpkin">🎃</span>
              <span class="summary-badge-text">¡MISIÓN DE HALLOWEEN COMPLETADA!</span>
              <span class="summary-badge-pumpkin">🎃</span>
            </div>
            <h3 id="bityblockly-summary-title" class="summary-modal-title">¡FELICITACIONES! ¡BITY LLEGÓ A LA META!</h3>
            <h4 id="bityblockly-summary-subtitle" class="summary-modal-subtitle">
              UTILIZASTE <span id="bityblockly-summary-subtitle-count" class="summary-subtitle-highlight">0</span> INSTRUCCIONES PARA COMPLETAR EL RECORRIDO.
            </h4>
          </div>

          <!-- Contenedor en 2 Columnas Horizontales en Desktop -->
          <div class="summary-modal-body">
            <!-- Columna Izquierda: Bity Celebrando + Contador Principal + Desglose de Movimientos/Giros -->
            <div class="summary-col-left">
              <!-- Bity Celebrando y Mensaje Pedagógico -->
              <div class="summary-bity-hero">
                <div id="bityblockly-summary-avatar" class="summary-avatar-holder"></div>
                <div class="summary-speech-bubble">
                  <div class="speech-sparkle">✨</div>
                  <p id="bityblockly-summary-bity-speech" class="summary-bity-speech-text">
                    ¡LO LOGRASTE! ¡AYUDASTE A BITY A LLEGAR A LA META!
                  </p>
                </div>
              </div>

              <!-- Bloque Destacado de Instrucciones Totales -->
              <div class="instruction-counter-highlight">
                <div class="counter-stars-decor">⭐ ✨ ⭐</div>
                <span class="instruction-count-number" id="bityblockly-summary-total-count">0</span>
                <span class="instruction-count-label">INSTRUCCIONES TOTALES</span>
              </div>

              <!-- Desglose Compacto de Pasos y Giros -->
              <div class="instruction-breakdown-grid">
                <div class="instruction-breakdown-card">
                  <span class="breakdown-icon">⬆️</span>
                  <span class="breakdown-val" id="bityblockly-summary-moves-count">0</span>
                  <span class="breakdown-lbl">Pasos adelante</span>
                </div>
                <div class="instruction-breakdown-card">
                  <span class="breakdown-icon">🔄</span>
                  <span class="breakdown-val" id="bityblockly-summary-turns-count">0</span>
                  <span class="breakdown-lbl">Giros realizados</span>
                </div>
                <div class="instruction-breakdown-card">
                  <span class="breakdown-icon">🗺️</span>
                  <span class="breakdown-val" id="bityblockly-summary-route-name">Camino Óptimo</span>
                  <span class="breakdown-lbl">Ruta completada</span>
                </div>
              </div>
            </div>

            <!-- Columna Derecha: Registro en Classroom y Pregunta de Reflexión -->
            <div class="summary-col-right">
              <!-- Registro en Classroom -->
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

              <!-- Reflexión Pedagógica -->
              <div class="classroom-reflection-box">
                <div class="reflection-tag">💬 PREGUNTA PARA REFLEXIONAR EN EL AULA:</div>
                <p class="reflection-text" id="bityblockly-summary-reflection-text">
                  ¿Pudiste haber llegado a la meta con menos instrucciones? ¿Qué camino fue más corto y cuál más largo? ¡Compartí tu estrategia con tus compañeros y tu profe!
                </p>
              </div>
            </div>
          </div>

          <!-- Acciones Inferiores: Siempre Visibles y Accesibles sin Scroll en Desktop -->
          <div class="summary-modal-actions">
            <button type="button" id="btn-bityblockly-summary-retry" class="btn-summary-action btn-summary-retry">
              <span>🔄</span> PROBAR OTRO CAMINO
            </button>
            <button type="button" id="btn-bityblockly-summary-next" class="btn-summary-action btn-summary-next">
              <span>🌟</span> FINALIZAR GRADO
            </button>
          </div>
        </div>
      </div>`;

if (oldModalRegex.test(indexContent)) {
  indexContent = indexContent.replace(oldModalRegex, newModalHtml);
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log('✓ index.html updated successfully with new modal structure!');
} else {
  console.error('✗ oldModalRegex did not match in index.html!');
  process.exit(1);
}

// ====================================================================
// 2. UPDATE css/bityblockly.css
// ====================================================================
const cssPath = 'css/bityblockly.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const oldSummaryCssRegex = /\/\* =+\s*9\.\s*MODAL RESUMEN: DESAFÍO ESPECIAL DE INSTRUCCIONES[\s\S]*?\.btn-summary-next:hover \{[\s\S]*?\}\s*\}/;

const newSummaryCss = `/* =========================================================
   9. MODAL RESUMEN Y CELEBRACIÓN DE HALLOWEEN (DESAFÍO FINAL)
   Diseño compacto, proporcional, 2 columnas en desktop,
   botones siempre visibles sin scroll, y efectos temáticos.
   ========================================================= */

.summary-halloween-fx {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 5;
}

.summary-fx-bat {
  position: absolute;
  font-size: 2rem;
  opacity: 0.85;
  filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.7));
  pointer-events: none;
}

.bat-top-left {
  top: 8%;
  left: 6%;
  animation: batFlutterLeft 4s ease-in-out infinite alternate;
}

.bat-top-right {
  top: 10%;
  right: 7%;
  animation: batFlutterRight 4.5s ease-in-out infinite alternate;
}

.bat-mid-fly {
  top: 25%;
  left: -50px;
  animation: batFlyAcross 6s linear infinite;
}

.summary-fx-ghost {
  position: absolute;
  font-size: 2.2rem;
  opacity: 0.65;
  filter: drop-shadow(0 0 15px rgba(56, 189, 248, 0.8));
  pointer-events: none;
}

.ghost-float-left {
  bottom: 12%;
  left: 4%;
  animation: ghostHover 4s ease-in-out infinite;
}

.ghost-float-right {
  bottom: 14%;
  right: 5%;
  animation: ghostHover 4.5s ease-in-out infinite 1s;
}

.summary-fx-sparkle {
  position: absolute;
  font-size: 1.4rem;
  opacity: 0.75;
  animation: sparkleTwinkle 2.5s ease-in-out infinite alternate;
}
.s-1 { top: 15%; left: 20%; animation-delay: 0.2s; }
.s-2 { top: 18%; right: 22%; animation-delay: 0.7s; }
.s-3 { bottom: 18%; left: 25%; animation-delay: 1.2s; }
.s-4 { bottom: 15%; right: 20%; animation-delay: 1.7s; }

@keyframes batFlutterLeft {
  0% { transform: translate(0, 0) rotate(-6deg) scale(0.9); }
  50% { transform: translate(25px, -15px) rotate(4deg) scale(1.05); }
  100% { transform: translate(10px, 20px) rotate(-8deg) scale(0.95); }
}

@keyframes batFlutterRight {
  0% { transform: translate(0, 0) rotate(6deg) scale(1); }
  50% { transform: translate(-30px, 18px) rotate(-6deg) scale(0.9); }
  100% { transform: translate(-15px, -18px) rotate(8deg) scale(1.05); }
}

@keyframes batFlyAcross {
  0% { transform: translate(-60px, 0) scale(0.8) rotate(5deg); opacity: 0; }
  15% { opacity: 0.85; }
  85% { opacity: 0.85; }
  100% { transform: translate(calc(100vw + 80px), -60px) scale(1.1) rotate(-5deg); opacity: 0; }
}

@keyframes ghostHover {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.55; }
  50% { transform: translateY(-16px) scale(1.08); opacity: 0.8; }
}

@keyframes sparkleTwinkle {
  0% { transform: scale(0.7) rotate(0deg); opacity: 0.3; }
  50% { transform: scale(1.2) rotate(45deg); opacity: 0.95; filter: drop-shadow(0 0 8px #fde047); }
  100% { transform: scale(0.8) rotate(90deg); opacity: 0.4; }
}

@keyframes pumpkinCandleGlow {
  0% { filter: drop-shadow(0 0 4px #f59e0b); transform: scale(1); }
  50% { filter: drop-shadow(0 0 12px #fbbf24); transform: scale(1.1); }
  100% { filter: drop-shadow(0 0 6px #ea580c); transform: scale(0.98); }
}

@keyframes goldGlowPulse {
  0% { opacity: 0.6; text-shadow: 0 0 4px #facc15; }
  100% { opacity: 1; text-shadow: 0 0 12px #fde047; }
}

@keyframes bityCelebrationHop {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-8px) rotate(-4deg); }
  50% { transform: translateY(0) rotate(0deg); }
  75% { transform: translateY(-6px) rotate(4deg); }
}

/* Tarjeta Principal Compacta y Equilibrada */
.bityblockly-instruction-summary-card {
  background: linear-gradient(155deg, #070414 0%, #150b28 50%, #0a061b 100%);
  border: 2px solid #f59e0b;
  border-radius: 24px;
  max-width: 840px;
  width: 95%;
  max-height: min(92vh, 650px);
  padding: 16px 22px 14px 22px;
  box-shadow: 0 0 45px rgba(245, 158, 11, 0.35), 0 0 70px rgba(139, 92, 246, 0.22), inset 0 0 30px rgba(0, 0, 0, 0.7);
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  animation: bityModalPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
}

/* Encabezado */
.summary-modal-header {
  text-align: center;
  margin-bottom: 10px;
  flex-shrink: 0;
}

.summary-header-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.45);
  border-radius: 20px;
  padding: 2px 12px;
  margin-bottom: 3px;
}

.summary-badge-pumpkin {
  font-size: 1.05rem;
  display: inline-block;
  animation: pumpkinCandleGlow 2s ease-in-out infinite alternate;
}

.summary-badge-text {
  font-size: 0.78rem;
  font-weight: 800;
  color: #fde047;
  letter-spacing: 1px;
}

.summary-modal-title {
  font-size: 1.35rem;
  font-weight: 900;
  color: #fde047;
  margin: 0;
  line-height: 1.2;
  letter-spacing: 0.5px;
  text-shadow: 0 0 14px rgba(253, 224, 71, 0.5);
}

.summary-modal-subtitle {
  font-size: 0.95rem;
  font-weight: 800;
  color: #38bdf8;
  margin: 2px 0 0 0;
  line-height: 1.2;
}

.summary-subtitle-highlight {
  color: #fde047;
  font-weight: 900;
  font-size: 1.15rem;
  text-shadow: 0 0 10px rgba(253, 224, 71, 0.6);
}

/* Cuerpo en 2 Columnas */
.summary-modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  align-items: stretch;
  flex: 1;
  overflow-y: auto;
  padding: 2px 4px 6px 4px;
  box-sizing: border-box;
}

/* Scrollbar estética */
.summary-modal-body::-webkit-scrollbar {
  width: 6px;
}
.summary-modal-body::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.5);
  border-radius: 4px;
}
.summary-modal-body::-webkit-scrollbar-thumb {
  background: rgba(168, 85, 247, 0.6);
  border-radius: 4px;
}

.summary-col-left,
.summary-col-right {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
}

/* Bity Hero & Speech */
.summary-bity-hero {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(30, 27, 75, 0.45);
  border: 1.5px solid rgba(168, 85, 247, 0.4);
  border-radius: 14px;
  padding: 8px 12px;
  box-sizing: border-box;
}

.summary-avatar-holder {
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  animation: bityCelebrationHop 1.4s ease-in-out infinite;
}

.summary-avatar-holder svg {
  width: 100%;
  height: 100%;
}

.summary-speech-bubble {
  position: relative;
  flex: 1;
  text-align: left;
}

.summary-bity-speech-text {
  font-size: 0.86rem;
  font-weight: 800;
  color: #e0e7ff;
  margin: 0;
  line-height: 1.25;
}

.speech-sparkle {
  position: absolute;
  top: -8px;
  right: -2px;
  font-size: 0.85rem;
  animation: sparkleTwinkle 2s infinite alternate;
}

/* Contador Principal */
.instruction-counter-highlight {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%);
  border: 2px solid #38bdf8;
  border-radius: 14px;
  padding: 8px 12px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.35);
  position: relative;
}

.counter-stars-decor {
  font-size: 0.72rem;
  letter-spacing: 3px;
  margin-bottom: 2px;
  color: #facc15;
  animation: goldGlowPulse 2s infinite alternate;
}

.instruction-count-number {
  font-size: 2.3rem;
  font-weight: 900;
  color: #fde047;
  line-height: 1;
  text-shadow: 0 0 16px rgba(253, 224, 71, 0.65);
}

.instruction-count-label {
  font-size: 0.78rem;
  font-weight: 800;
  color: #94a3b8;
  letter-spacing: 1px;
  margin-top: 2px;
}

/* Desglose de 3 Fichas */
.instruction-breakdown-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin: 0;
}

.instruction-breakdown-card {
  background: rgba(30, 41, 59, 0.65);
  border: 1.5px solid rgba(100, 116, 139, 0.5);
  border-radius: 10px;
  padding: 6px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-align: center;
}

.breakdown-icon {
  font-size: 1.1rem;
}

.breakdown-val {
  font-size: 0.98rem;
  font-weight: 900;
  color: #f1f5f9;
  line-height: 1.1;
}

.breakdown-lbl {
  font-size: 0.68rem;
  font-weight: 700;
  color: #94a3b8;
  line-height: 1.1;
}

/* Columna Derecha: Classroom Callout */
.classroom-share-callout {
  background: linear-gradient(135deg, rgba(6, 78, 59, 0.45) 0%, rgba(20, 83, 45, 0.35) 100%);
  border: 2px solid #10b981;
  border-radius: 14px;
  padding: 10px 12px;
  text-align: left;
  box-shadow: 0 0 16px rgba(16, 185, 129, 0.25);
}

.classroom-callout-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.callout-icon {
  font-size: 1.05rem;
}

.callout-badge {
  font-size: 0.72rem;
  font-weight: 900;
  background: #10b981;
  color: #022c22;
  padding: 2px 7px;
  border-radius: 6px;
  letter-spacing: 0.5px;
}

.callout-msg {
  font-size: 0.9rem;
  font-weight: 900;
  color: #ecfdf5;
  line-height: 1.25;
  text-shadow: 0 0 8px rgba(16, 185, 129, 0.35);
  margin-bottom: 3px;
}

.callout-submsg {
  font-size: 0.76rem;
  font-weight: 700;
  color: #a7f3d0;
  line-height: 1.2;
}

/* Pregunta de Reflexión */
.classroom-reflection-box {
  background: rgba(76, 29, 149, 0.3);
  border: 1.5px dashed #a855f7;
  border-radius: 14px;
  padding: 10px 12px;
  text-align: left;
  margin: 0;
}

.reflection-tag {
  font-size: 0.74rem;
  font-weight: 900;
  color: #c084fc;
  letter-spacing: 0.5px;
  margin-bottom: 3px;
}

.reflection-text {
  font-size: 0.84rem;
  font-weight: 700;
  color: #f1f5f9;
  line-height: 1.3;
  margin: 0;
}

/* Acciones Inferiores (Siempre Visibles) */
.summary-modal-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-shrink: 0;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  width: 100%;
  box-sizing: border-box;
}

.btn-summary-action {
  border: none;
  border-radius: 12px;
  padding: 11px 24px;
  font-size: 0.95rem;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  letter-spacing: 0.5px;
}

.btn-summary-retry {
  background: linear-gradient(135deg, #334155, #1e293b);
  color: #f1f5f9;
  border: 2px solid #64748b;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
}

.btn-summary-retry:hover {
  background: linear-gradient(135deg, #475569, #334155);
  border-color: #38bdf8;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(56, 189, 248, 0.3);
}

.btn-summary-next {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #ffffff;
  border: 2px solid #fde047;
  box-shadow: 0 4px 18px rgba(245, 158, 11, 0.4);
}

.btn-summary-next:hover {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  transform: translateY(-2px);
  box-shadow: 0 6px 22px rgba(245, 158, 11, 0.55);
}

/* =========================================================
   ADAPTACIÓN A DIFERENTES PANTALLAS (RESPONSIVE)
   ========================================================= */

@media (max-width: 800px) {
  .bityblockly-instruction-summary-card {
    max-width: 96%;
    padding: 14px 16px 12px 16px;
    max-height: 94vh;
  }
  .summary-modal-body {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .summary-col-left,
  .summary-col-right {
    gap: 8px;
  }
  .instruction-count-number {
    font-size: 2.1rem;
  }
}

@media (max-width: 520px) {
  .bityblockly-instruction-summary-card {
    padding: 12px 12px 10px 12px;
  }
  .summary-modal-title {
    font-size: 1.15rem;
  }
  .summary-modal-subtitle {
    font-size: 0.85rem;
  }
  .instruction-breakdown-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
  }
  .breakdown-val {
    font-size: 0.85rem;
  }
  .breakdown-lbl {
    font-size: 0.62rem;
  }
  .summary-modal-actions {
    flex-direction: column;
    gap: 8px;
  }
  .btn-summary-action {
    width: 100%;
    padding: 9px 16px;
    font-size: 0.88rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .summary-fx-bat,
  .summary-fx-ghost,
  .summary-fx-sparkle,
  .summary-avatar-holder,
  .summary-badge-pumpkin,
  .counter-stars-decor {
    animation: none !important;
  }
}`;

if (oldSummaryCssRegex.test(cssContent)) {
  cssContent = cssContent.replace(oldSummaryCssRegex, newSummaryCss);
  fs.writeFileSync(cssPath, cssContent, 'utf8');
  console.log('✓ css/bityblockly.css updated successfully with new compact 2-column styles & Halloween animations!');
} else {
  console.error('✗ oldSummaryCssRegex did not match in css/bityblockly.css!');
  process.exit(1);
}

// ====================================================================
// 3. UPDATE js/bityBlockly.js (Audio & triggerInstructionSummaryModal)
// ====================================================================
const bityJsPath = 'js/bityBlockly.js';
let bityJsContent = fs.readFileSync(bityJsPath, 'utf8');

// A. Add playHalloweenCelebration & stopCelebration to BityBlocklyAudio
const audioClassOldRegex = /class BityBlocklyAudio \{[\s\S]*?toggle\(\) \{[\s\S]*?return this\.enabled;\s*\}\s*\}/;

const audioClassNew = `class BityBlocklyAudio {
    constructor() {
      this.ctx = null;
      this.enabled = true;
      this.activeCelebrationOscs = [];
      this.celebrationGain = null;
      try {
        const stored = localStorage.getItem('lego_bityblockly_sound');
        if (stored !== null) this.enabled = stored === 'true';
      } catch (e) {}
    }

    init() {
      if (this.ctx) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      } catch (e) {}
    }

    play(type) {
      if (typeof window !== 'undefined' && window.MagicAudioEngine && !window.MagicAudioEngine.isEnabled()) {
        return;
      }
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'click' || type === 'add') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.exponentialRampToValueAtTime(880, t + 0.08);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.08);
        osc.start(t);
        osc.stop(t + 0.08);
      } else if (type === 'step') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.linearRampToValueAtTime(480, t + 0.1);
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.1);
        osc.start(t);
        osc.stop(t + 0.1);
      } else if (type === 'turn') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, t);
        osc.frequency.linearRampToValueAtTime(650, t + 0.12);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.12);
        osc.start(t);
        osc.stop(t + 0.12);
      } else if (type === 'bump') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.linearRampToValueAtTime(80, t + 0.18);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.18);
        osc.start(t);
        osc.stop(t + 0.18);
      } else if (type === 'doorUnlock' || type === 'cardMatch' || type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, t); // C5
        osc.frequency.setValueAtTime(659.25, t + 0.09); // E5
        osc.frequency.setValueAtTime(783.99, t + 0.18); // G5
        osc.frequency.setValueAtTime(1046.50, t + 0.27); // C6
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.45);
        osc.start(t);
        osc.stop(t + 0.45);
      } else if (type === 'ghostLaugh') {
        if (typeof window !== 'undefined' && window.MagicAudioEngine && typeof window.MagicAudioEngine.playGhostLaugh === 'function') {
          window.MagicAudioEngine.playGhostLaugh();
        } else {
          [440, 400, 360, 300].forEach((freq, idx) => {
            const bt = t + idx * 0.16;
            const bOsc = this.ctx.createOscillator();
            const bGain = this.ctx.createGain();
            bOsc.type = 'sawtooth';
            bOsc.frequency.setValueAtTime(freq, bt);
            bOsc.frequency.exponentialRampToValueAtTime(freq - 80, bt + 0.12);
            bGain.gain.setValueAtTime(0.001, bt);
            bGain.gain.linearRampToValueAtTime(0.12, bt + 0.02);
            bGain.gain.exponentialRampToValueAtTime(0.001, bt + 0.12);
            bOsc.connect(bGain);
            bGain.connect(this.ctx.destination);
            bOsc.start(bt);
            bOsc.stop(bt + 0.13);
          });
        }
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.setValueAtTime(196, t + 0.12);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.linearRampToValueAtTime(0.01, t + 0.25);
        osc.start(t);
        osc.stop(t + 0.25);
      } else if (type === 'bitySpeak') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, t); // D5
        osc.frequency.exponentialRampToValueAtTime(880, t + 0.12); // A5
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.linearRampToValueAtTime(0.005, t + 0.12);
        osc.start(t);
        osc.stop(t + 0.12);
      } else if (type === 'victory') {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, t + idx * 0.1);
          g.gain.setValueAtTime(0.18, t + idx * 0.1);
          g.gain.linearRampToValueAtTime(0.01, t + idx * 0.1 + 0.25);
          o.connect(g);
          g.connect(this.ctx.destination);
          o.start(t + idx * 0.1);
          o.stop(t + idx * 0.1 + 0.25);
        });
      }
    }

    /**
     * Melodía original de celebración festiva de Halloween
     * Sintetizada con Web Audio API (timbre celesta / glockenspiel en Re menor + campanas mágicas).
     */
    playHalloweenCelebration() {
      if (typeof window !== 'undefined' && window.MagicAudioEngine && !window.MagicAudioEngine.isEnabled()) {
        return;
      }
      if (!this.enabled) return;

      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      this.stopCelebration();

      const t0 = this.ctx.currentTime;
      this.activeCelebrationOscs = [];

      const celebGain = this.ctx.createGain();
      celebGain.gain.setValueAtTime(0.18, t0);
      celebGain.gain.setValueAtTime(0.18, t0 + 2.5);
      celebGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 3.4);
      celebGain.connect(this.ctx.destination);
      this.celebrationGain = celebGain;

      // 1. Melodía alegre y misteriosa de Halloween (tipo Danza Mágica)
      const melody = [
        { freq: 587.33, t: 0.00, dur: 0.14 }, // D5
        { freq: 698.46, t: 0.16, dur: 0.14 }, // F5
        { freq: 880.00, t: 0.32, dur: 0.14 }, // A5
        { freq: 830.61, t: 0.48, dur: 0.14 }, // G#5 (tensión traviesa de Halloween)
        { freq: 880.00, t: 0.64, dur: 0.20 }, // A5
        { freq: 698.46, t: 0.88, dur: 0.14 }, // F5
        { freq: 587.33, t: 1.04, dur: 0.14 }, // D5
        { freq: 554.37, t: 1.20, dur: 0.14 }, // C#5
        { freq: 587.33, t: 1.36, dur: 0.24 }, // D5
        // Arpegio estelar ascendente
        { freq: 587.33, t: 1.65, dur: 0.12 }, // D5
        { freq: 698.46, t: 1.77, dur: 0.12 }, // F5
        { freq: 880.00, t: 1.89, dur: 0.12 }, // A5
        { freq: 1174.66, t: 2.01, dur: 0.15 }, // D6
        { freq: 1396.91, t: 2.16, dur: 0.35 }  // F6
      ];

      melody.forEach(note => {
        const startT = t0 + note.t;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = 'triangle'; // Timbre celesta / campana mágica
        osc.frequency.setValueAtTime(note.freq, startT);

        noteGain.gain.setValueAtTime(0.001, startT);
        noteGain.gain.linearRampToValueAtTime(0.18, startT + 0.015);
        noteGain.gain.exponentialRampToValueAtTime(0.001, startT + note.dur + 0.15);

        osc.connect(noteGain);
        noteGain.connect(celebGain);

        osc.start(startT);
        osc.stop(startT + note.dur + 0.2);
        this.activeCelebrationOscs.push(osc);
      });

      // 2. Bajo staccato juguetón
      const bassNotes = [
        { freq: 146.83, t: 0.00 }, // D3
        { freq: 146.83, t: 0.32 }, // D3
        { freq: 110.00, t: 0.64 }, // A2
        { freq: 146.83, t: 0.88 }, // D3
        { freq: 146.83, t: 1.20 }, // D3
        { freq: 146.83, t: 1.65 }  // D3
      ];

      bassNotes.forEach(b => {
        const startT = t0 + b.t;
        const bOsc = this.ctx.createOscillator();
        const bGain = this.ctx.createGain();

        bOsc.type = 'sine';
        bOsc.frequency.setValueAtTime(b.freq, startT);

        bGain.gain.setValueAtTime(0.001, startT);
        bGain.gain.linearRampToValueAtTime(0.20, startT + 0.02);
        bGain.gain.exponentialRampToValueAtTime(0.001, startT + 0.16);

        bOsc.connect(bGain);
        bGain.connect(celebGain);

        bOsc.start(startT);
        bOsc.stop(startT + 0.18);
        this.activeCelebrationOscs.push(bOsc);
      });

      // 3. Campanillas mágicas de cierre
      const chimes = [1760, 2093, 2637, 3135.96]; // A6, C7, E7, G7
      chimes.forEach((freq, idx) => {
        const startT = t0 + 2.15 + idx * 0.1;
        const cOsc = this.ctx.createOscillator();
        const cGain = this.ctx.createGain();

        cOsc.type = 'sine';
        cOsc.frequency.setValueAtTime(freq, startT);

        cGain.gain.setValueAtTime(0.001, startT);
        cGain.gain.linearRampToValueAtTime(0.07, startT + 0.02);
        cGain.gain.exponentialRampToValueAtTime(0.0001, startT + 0.9);

        cOsc.connect(cGain);
        cGain.connect(celebGain);

        cOsc.start(startT);
        cOsc.stop(startT + 0.95);
        this.activeCelebrationOscs.push(cOsc);
      });
    }

    stopCelebration() {
      if (this.celebrationGain && this.ctx) {
        try {
          this.celebrationGain.gain.cancelScheduledValues(this.ctx.currentTime);
          this.celebrationGain.gain.setValueAtTime(0, this.ctx.currentTime);
        } catch (e) {}
      }
      if (this.activeCelebrationOscs) {
        this.activeCelebrationOscs.forEach(o => {
          try { o.stop(); o.disconnect(); } catch (e) {}
        });
        this.activeCelebrationOscs = [];
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      if (!this.enabled) {
        this.stopCelebration();
      }
      try {
        localStorage.setItem('lego_bityblockly_sound', this.enabled ? 'true' : 'false');
      } catch (e) {}
      return this.enabled;
    }
  }`;

if (audioClassOldRegex.test(bityJsContent)) {
  bityJsContent = bityJsContent.replace(audioClassOldRegex, audioClassNew);
  console.log('✓ BityBlocklyAudio updated with playHalloweenCelebration and stopCelebration!');
} else {
  console.error('✗ audioClassOldRegex did not match in bityBlockly.js!');
  process.exit(1);
}

// B. Update triggerInstructionSummaryModal implementation
const oldSummaryModalMethodRegex = /triggerInstructionSummaryModal\(\) \{[\s\S]*?btnNext\.onclick = \(\) => \{[\s\S]*?modal\.classList\.remove\('active'\);[\s\S]*?this\.showCoverView\(\);[\s\S]*?\};\s*\}\s*modal\.classList\.add\('active'\);\s*\}/;

const newSummaryModalMethod = `triggerInstructionSummaryModal() {
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
      const avatarEl = document.getElementById('bityblockly-summary-avatar');
      const speechEl = document.getElementById('bityblockly-summary-bity-speech');

      const total = this.instructionsExecuted || 0;
      const moves = this.movesExecuted || 0;
      const turns = this.turnsExecuted || 0;

      // 1. Título y Subtítulo
      if (titleEl) {
        titleEl.textContent = this.formatForGrade('¡FELICITACIONES! ¡BITY LLEGÓ A LA META!');
      }
      if (subtitleEl) {
        subtitleEl.innerHTML = this.formatForGrade(\`UTILIZASTE <span id="bityblockly-summary-subtitle-count" class="summary-subtitle-highlight">\${total}</span> INSTRUCCIONES PARA COMPLETAR EL RECORRIDO.\`);
      } else if (subtitleCountEl) {
        subtitleCountEl.textContent = total;
      }

      // 2. Avatar de Bity en modo Celebración
      if (avatarEl) {
        avatarEl.innerHTML = createBityGuideSvg('celebrating');
      }

      // 3. Mensaje festivo de Bity adaptado por grado
      let bityCelebrationMsg = '¡LO LOGRASTE! ¡AYUDASTE A BITY A LLEGAR A LA META!';
      if (this.currentGrade === 1) {
        bityCelebrationMsg = '¡LO LOGRASTE! ¡AYUDASTE A BITY A LLEGAR A LA META!';
      } else if (this.currentGrade === 2) {
        bityCelebrationMsg = '¡Gran trabajo! Byte y las calabazas luminosas festejan tu llegada a la plataforma.';
      } else if (this.currentGrade === 3) {
        bityCelebrationMsg = '¡Misión cumplida! El tren fantasma completó su recorrido por las vías cósmicas.';
      } else if (this.currentGrade === 4) {
        bityCelebrationMsg = '¡Desafío superado! Resolviste las compuertas mágicas y guiaste a Bity con éxito.';
      } else if (this.currentGrade === 5) {
        bityCelebrationMsg = '¡Estrategia brillante! Dominaste el laberinto cumbre del planeta embrujado.';
      }
      if (speechEl) {
        speechEl.textContent = this.formatForGrade(bityCelebrationMsg);
      }

      // 4. Conteo Principal y Desglose
      if (totalEl) totalEl.textContent = total;
      if (movesEl) movesEl.textContent = moves;
      if (turnsEl) turnsEl.textContent = turns;

      // 5. Identificación exacta de la ruta elegida
      let routeName = \`Camino completado (\${total} instrucciones)\`;
      if (this.currentGrade === 1) {
        if (total === 6) routeName = 'Camino Óptimo (Ruta Directa • 6 instrucciones)';
        else if (total === 10) routeName = 'Alternativa 1 (Camino Central • 10 instrucciones)';
        else if (total === 14) routeName = 'Alternativa 2 (Camino Exterior • 14 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 2) {
        if (total === 8) routeName = 'Camino Óptimo (Ruta Directa • 8 instrucciones)';
        else if (total === 11) routeName = 'Alternativa 1 (Camino Central • 11 instrucciones)';
        else if (total === 16) routeName = 'Alternativa 2 (Rodeo Exterior • 16 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 3) {
        if (total === 10) routeName = 'Camino Óptimo (Vía Rápida • 10 instrucciones)';
        else if (total === 15) routeName = 'Alternativa 1 (Vía Central • 15 instrucciones)';
        else if (total === 18) routeName = 'Alternativa 2 (Vía Perimetral • 18 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 4) {
        if (total === 12) routeName = 'Camino Óptimo (Galería Norte • 12 instrucciones)';
        else if (total === 17) routeName = 'Alternativa 1 (Galería Este • 17 instrucciones)';
        else if (total === 23) routeName = 'Alternativa 2 (Galería Sudoeste • 23 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      } else if (this.currentGrade === 5) {
        if (total === 14) routeName = 'Camino Óptimo (Ruta de las Almenas • 14 instrucciones)';
        else if (total === 20) routeName = 'Alternativa 1 (Ruta del Portal Este • 20 instrucciones)';
        else if (total === 27) routeName = 'Alternativa 2 (Ruta del Laberinto Profundo • 27 instrucciones)';
        else routeName = \`Ruta Personalizada (\${total} instrucciones)\`;
      }

      if (routeEl) routeEl.textContent = this.formatForGrade(routeName);

      // 6. Registro en Classroom y Reflexión Pedagógica
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

      // Guardar intento para comparación si prueba otro camino
      this.previousAttemptInstructions = total;

      // 7. Acciones Inferiores (Inmediatamente accesibles y funcionales)
      const btnRetry = document.getElementById('btn-bityblockly-summary-retry');
      if (btnRetry) {
        btnRetry.onclick = () => {
          this.audio.stopCelebration();
          modal.classList.remove('active');
          this.loadLevel(this.currentLevelIndex);
        };
      }

      const btnNext = document.getElementById('btn-bityblockly-summary-next');
      if (btnNext) {
        btnNext.onclick = () => {
          this.audio.stopCelebration();
          modal.classList.remove('active');
          this.showCoverView();
        };
      }

      // Mostrar modal
      modal.classList.add('active');

      // 8. Iniciar Celebración Sonora de Halloween (Original, breve y respetando mute)
      this.audio.playHalloweenCelebration();
    }`;

if (oldSummaryModalMethodRegex.test(bityJsContent)) {
  bityJsContent = bityJsContent.replace(oldSummaryModalMethodRegex, newSummaryModalMethod);
  fs.writeFileSync(bityJsPath, bityJsContent, 'utf8');
  console.log('✓ triggerInstructionSummaryModal updated with Bity celebration, music & clean actions!');
} else {
  console.error('✗ oldSummaryModalMethodRegex did not match in bityBlockly.js!');
  process.exit(1);
}

// ====================================================================
// 4. UPDATE js/magicAudio.js (Sync stopAll with Bity celebration)
// ====================================================================
const magicAudioPath = 'js/magicAudio.js';
let magicContent = fs.readFileSync(magicAudioPath, 'utf8');

const stopAllOldRegex = /stopAll\(\) \{[\s\S]*?this\.stopAmbient\(\);[\s\S]*?this\.masterGain\.gain\.setValueAtTime\(0, ctx\.currentTime\);[\s\S]*?\}\s*catch \(e\) \{\}\s*\}\s*\}/;

const stopAllNew = `stopAll() {
      this.stopAmbient();
      if (typeof window !== 'undefined' && window.bityBlocklyGame && window.bityBlocklyGame.audio) {
        try { window.bityBlocklyGame.audio.stopCelebration(); } catch (e) {}
      }
      const ctx = this.getAudioContext();
      if (ctx && this.masterGain) {
        try {
          this.masterGain.gain.cancelScheduledValues(ctx.currentTime);
          this.masterGain.gain.setValueAtTime(0, ctx.currentTime);
        } catch (e) {}
      }
    }`;

if (stopAllOldRegex.test(magicContent)) {
  magicContent = magicContent.replace(stopAllOldRegex, stopAllNew);
  fs.writeFileSync(magicAudioPath, magicContent, 'utf8');
  console.log('✓ js/magicAudio.js stopAll synchronized with celebration audio!');
} else {
  console.warn('⚠ stopAllOldRegex did not match in magicAudio.js; continuing...');
}

console.log('All updates applied successfully!');
