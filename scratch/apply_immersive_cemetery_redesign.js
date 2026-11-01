const fs = require('fs');

console.log('--- Applying Immersive Cemetery & Castle Halloween Redesign ---');

// Read SVG diorama
const svgDiorama = fs.readFileSync('scratch/cemetery_scene.svg', 'utf8');

// ====================================================================
// 1. UPDATE index.html
// ====================================================================
const indexPath = 'index.html';
let indexHtml = fs.readFileSync(indexPath, 'utf8');

const modalSearchRegex = /<!-- Modal de Cierre y Celebración de Halloween: Desafío Especial de Instrucciones -->[\s\S]*?<div id="bityblockly-instruction-summary-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newModalMarkup = `<!-- Modal de Cierre y Celebración de Halloween: Desafío Especial de Instrucciones -->
      <div id="bityblockly-instruction-summary-modal" class="bityblockly-modal-overlay bityblockly-cemetery-celebration">
        <!-- ESCENARIO COMPLETO: CEMENTERIO ENCANTADO Y CASTILLO EMBRUJADO -->
        <div class="cemetery-diorama-backdrop" aria-hidden="true">
          ${svgDiorama}
          <!-- Relámpago atmosférico ocasional -->
          <div class="cemetery-lightning-overlay"></div>
          <!-- Capas volumétricas de niebla en el suelo -->
          <div class="cemetery-fog-stream fog-layer-back"></div>
          <div class="cemetery-fog-stream fog-layer-front"></div>
        </div>

        <!-- PANEL DE RESULTADOS: LÁPIDA / PERGAMINO ENCANTADO INTEGRADO AL ESCENARIO -->
        <div class="bityblockly-instruction-summary-card enchanted-tomb-plaque">
          <!-- Decoración ornamental de esquinas góticas -->
          <div class="plaque-corner top-left"></div>
          <div class="plaque-corner top-right"></div>
          <div class="plaque-corner bottom-left"></div>
          <div class="plaque-corner bottom-right"></div>

          <!-- Encabezado Temático: Misión Cumplida & Bity Llegó a la Meta -->
          <div class="summary-modal-header">
            <div class="summary-header-badge">
              <span class="summary-badge-pumpkin">🎃</span>
              <span class="summary-badge-text">¡MISIÓN CUMPLIDA!</span>
              <span class="summary-badge-pumpkin">🎃</span>
            </div>
            <h3 id="bityblockly-summary-title" class="summary-modal-title">¡BITY LLEGÓ A LA META!</h3>
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

          <!-- Acciones Inferiores Temáticas: Portal Mágico y Puerta del Castillo -->
          <div class="summary-modal-actions">
            <button type="button" id="btn-bityblockly-summary-retry" class="btn-summary-action btn-portal-magic">
              <span class="btn-action-icon">🌀</span> PROBAR OTRO CAMINO
            </button>
            <button type="button" id="btn-bityblockly-summary-next" class="btn-summary-action btn-castle-door">
              <span class="btn-action-icon">🏰</span> FINALIZAR GRADO
            </button>
          </div>
        </div>
      </div>`;

if (modalSearchRegex.test(indexHtml)) {
  indexHtml = indexHtml.replace(modalSearchRegex, newModalMarkup);
  fs.writeFileSync(indexPath, indexHtml, 'utf8');
  console.log('✓ index.html updated with cemetery diorama & enchanted plaque!');
} else {
  console.error('✗ modalSearchRegex failed to match in index.html!');
  process.exit(1);
}

// ====================================================================
// 2. UPDATE css/bityblockly.css
// ====================================================================
const cssPath = 'css/bityblockly.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const oldCssRegex = /\/\* =+\s*9\.\s*MODAL RESUMEN Y CELEBRACIÓN DE HALLOWEEN[\s\S]*?@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\}\s*\}/;

const newCss = `/* =========================================================
   9. ESCENARIO INMERSIVO DE HALLOWEEN: CEMENTERIO Y CASTILLO
   Diorama completo con cielo nocturno, gran luna, nubes,
   castillo con ventanas iluminadas y vampiro, árboles secos,
   rejas, lápidas góticas, fantasmas animados, calabazas cálidas,
   niebla, relámpagos y panel integrado como lápida encantada.
   ========================================================= */

/* Overlay a pantalla completa con atmósfera nocturna */
.bityblockly-cemetery-celebration {
  background: radial-gradient(ellipse at 50% 30%, rgba(20, 8, 45, 0.92) 0%, rgba(5, 2, 12, 0.98) 100%) !important;
  backdrop-filter: blur(4px);
  position: fixed;
  inset: 0;
  overflow: hidden;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 16px;
  box-sizing: border-box;
}

.bityblockly-cemetery-celebration.active {
  display: flex !important;
}

/* Contenedor del Diorama Escénico de Fondo */
.cemetery-diorama-backdrop {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.cemetery-vector-scene {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Relámpago ocasional de tormenta */
.cemetery-lightning-overlay {
  position: absolute;
  inset: 0;
  background: rgba(224, 231, 255, 0.45);
  pointer-events: none;
  opacity: 0;
  z-index: 3;
  animation: lightningAtmosphere 14s infinite;
}

@keyframes lightningAtmosphere {
  0%, 94%, 100% { opacity: 0; }
  94.5% { opacity: 0.75; }
  95% { opacity: 0.15; }
  95.8% { opacity: 0.9; }
  96.5% { opacity: 0.1; }
  97.2% { opacity: 0.4; }
  98% { opacity: 0; }
}

/* Niebla volumétrica en movimiento continuo sobre el cementerio */
.cemetery-fog-stream {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 180px;
  pointer-events: none;
  z-index: 4;
}

.fog-layer-back {
  background: radial-gradient(ellipse at 30% 80%, rgba(168, 85, 247, 0.18) 0%, transparent 65%),
              radial-gradient(ellipse at 70% 90%, rgba(56, 189, 248, 0.15) 0%, transparent 70%);
  animation: fogDriftBack 22s ease-in-out infinite alternate;
}

.fog-layer-front {
  background: radial-gradient(ellipse at 50% 95%, rgba(255, 255, 255, 0.12) 0%, transparent 60%),
              radial-gradient(ellipse at 85% 85%, rgba(147, 197, 253, 0.14) 0%, transparent 65%);
  animation: fogDriftFront 16s ease-in-out infinite alternate;
}

@keyframes fogDriftBack {
  0% { transform: translateX(-40px) scaleY(0.9); }
  50% { transform: translateX(30px) scaleY(1.1); }
  100% { transform: translateX(-40px) scaleY(0.9); }
}

@keyframes fogDriftFront {
  0% { transform: translateX(40px) scaleY(1); }
  50% { transform: translateX(-35px) scaleY(1.15); }
  100% { transform: translateX(40px) scaleY(1); }
}

/* Animaciones de los Elementos Vectoriales en el Escenario */
/* 1. Titileo de estrellas */
.star-twinkle-1 { animation: starPulse 2.4s ease-in-out infinite alternate; }
.star-twinkle-2 { animation: starPulse 3.1s ease-in-out infinite alternate 0.7s; }
.star-twinkle-3 { animation: starPulse 2.8s ease-in-out infinite alternate 1.4s; }

@keyframes starPulse {
  0% { opacity: 0.3; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1.3); filter: drop-shadow(0 0 4px #fde047); }
}

/* 2. Nubes desplazándose suavemente */
.cloud-path-1 { animation: cloudsDriftSlow 35s linear infinite; }
.cloud-path-2 { animation: cloudsDriftFast 25s linear infinite; }

@keyframes cloudsDriftSlow {
  0% { transform: translateX(-50px); }
  50% { transform: translateX(40px); }
  100% { transform: translateX(-50px); }
}

@keyframes cloudsDriftFast {
  0% { transform: translateX(30px); }
  50% { transform: translateX(-45px); }
  100% { transform: translateX(30px); }
}

/* 3. Parpadeo de luz de vela en ventanas del castillo */
.window-candle-flicker { animation: candleFlicker 1.8s ease-in-out infinite alternate; }
.window-candle-flicker-1 { animation: candleFlicker 2.2s ease-in-out infinite alternate 0.4s; }
.window-candle-flicker-2 { animation: candleFlicker 1.5s ease-in-out infinite alternate 0.8s; }
.window-candle-flicker-3 { animation: candleFlicker 2.5s ease-in-out infinite alternate 1.1s; }

@keyframes candleFlicker {
  0% { opacity: 0.65; fill: #d97706; }
  35% { opacity: 0.95; fill: #fde047; }
  70% { opacity: 0.75; fill: #f59e0b; }
  100% { opacity: 1; fill: #fef08a; filter: drop-shadow(0 0 6px #fde047); }
}

/* 4. Vampiro en la torre saludando */
.vampire-hand-wave {
  transform-origin: 38px 22px;
  animation: vampireWaveHand 1.6s ease-in-out infinite alternate;
}

@keyframes vampireWaveHand {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(-25deg) translateY(-2px); }
  100% { transform: rotate(10deg); }
}

/* 5. Arañita balanceándose del hilo */
.spider-thread {
  transform-origin: 140px 310px;
  animation: spiderSwing 3.5s ease-in-out infinite alternate;
}
.cem-spider {
  transform-origin: 140px 380px;
  animation: spiderSwing 3.5s ease-in-out infinite alternate;
}

@keyframes spiderSwing {
  0% { transform: translate(140px, 380px) rotate(-14deg); }
  50% { transform: translate(140px, 395px) rotate(0deg); }
  100% { transform: translate(140px, 380px) rotate(14deg); }
}

/* 6. Fantasma que sube de la tumba celebrando */
.cem-ghost-rising {
  animation: ghostRiseFromTomb 4.2s ease-in-out infinite;
}

@keyframes ghostRiseFromTomb {
  0%, 100% { transform: translate(48px, 20px) scale(0.65); opacity: 0.2; }
  40% { transform: translate(48px, -24px) scale(1.05); opacity: 0.95; }
  60% { transform: translate(48px, -20px) scale(1) rotate(-4deg); opacity: 0.95; }
  85% { transform: translate(48px, -15px) scale(0.95) rotate(4deg); opacity: 0.8; }
}

/* 7. Fantasma planeando por el cielo */
.cem-ghost-flying-sky {
  animation: ghostFlyAcrossSky 18s linear infinite;
}

@keyframes ghostFlyAcrossSky {
  0% { transform: translate(1050px, 240px) scale(0.8); opacity: 0; }
  10% { opacity: 0.85; }
  50% { transform: translate(500px, 210px) scale(1); opacity: 0.85; }
  90% { opacity: 0.85; }
  100% { transform: translate(-80px, 250px) scale(0.85); opacity: 0; }
}

/* 8. Murciélagos cruzando la luna */
.bat-fly-1 { animation: batMoonFly 9s ease-in-out infinite; }
.bat-fly-2 { animation: batMoonFly 11s ease-in-out infinite 1.2s; }
.bat-fly-3 { animation: batMoonFly 8.5s ease-in-out infinite 2.5s; }
.bat-fly-4 { animation: batMoonFly 10s ease-in-out infinite 3.8s; }

@keyframes batMoonFly {
  0% { transform: translate(1100px, 140px) scale(0.5); opacity: 0; }
  10% { opacity: 0.85; }
  50% { transform: translate(650px, 90px) scale(0.65) rotate(-6deg); opacity: 0.9; }
  90% { opacity: 0.85; }
  100% { transform: translate(150px, 160px) scale(0.45) rotate(8deg); opacity: 0; }
}

/* 9. Calabazas brillando con luz cálida */
.pumpkin-eye-glow,
.pumpkin-mouth-glow {
  animation: pumpkinInnerFire 2s ease-in-out infinite alternate;
}

@keyframes pumpkinInnerFire {
  0% { opacity: 0.75; filter: drop-shadow(0 0 3px #f59e0b); }
  50% { opacity: 1; filter: drop-shadow(0 0 10px #fbbf24); }
  100% { opacity: 0.85; filter: drop-shadow(0 0 6px #ea580c); }
}

.wisp-pulse-green {
  animation: wispFloatPulse 3s ease-in-out infinite alternate;
}

@keyframes wispFloatPulse {
  0% { transform: translateY(0) scale(0.9); opacity: 0.4; }
  50% { transform: translateY(-8px) scale(1.15); opacity: 0.9; }
  100% { transform: translateY(0) scale(0.9); opacity: 0.4; }
}

/* =========================================================
   PANEL CENTRAL INTEGRADO: LÁPIDA / PERGAMINO ENCANTADO
   ========================================================= */

.enchanted-tomb-plaque {
  background: linear-gradient(155deg, rgba(8, 4, 18, 0.93) 0%, rgba(22, 10, 42, 0.91) 50%, rgba(10, 5, 24, 0.94) 100%) !important;
  border: 2px solid #f59e0b !important;
  border-radius: 24px;
  max-width: 820px;
  width: 94%;
  max-height: min(90vh, 580px);
  padding: 16px 22px 14px 22px;
  box-shadow: 0 0 50px rgba(245, 158, 11, 0.38), 0 0 85px rgba(139, 92, 246, 0.28), inset 0 0 30px rgba(0, 0, 0, 0.75);
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  animation: bityModalPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
  backdrop-filter: blur(8px);
}

/* Esquinas ornamentales talladas */
.plaque-corner {
  position: absolute;
  width: 22px;
  height: 22px;
  border: 2.5px solid #f59e0b;
  pointer-events: none;
  opacity: 0.75;
}
.plaque-corner.top-left { top: 6px; left: 6px; border-right: none; border-bottom: none; border-top-left-radius: 6px; }
.plaque-corner.top-right { top: 6px; right: 6px; border-left: none; border-bottom: none; border-top-right-radius: 6px; }
.plaque-corner.bottom-left { bottom: 6px; left: 6px; border-right: none; border-top: none; border-bottom-left-radius: 6px; }
.plaque-corner.bottom-right { bottom: 6px; right: 6px; border-left: none; border-top: none; border-bottom-right-radius: 6px; }

/* Encabezado */
.summary-modal-header {
  text-align: center;
  margin-bottom: 8px;
  flex-shrink: 0;
}

.summary-header-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(245, 158, 11, 0.18);
  border: 1.5px solid rgba(245, 158, 11, 0.5);
  border-radius: 20px;
  padding: 2px 14px;
  margin-bottom: 4px;
  box-shadow: 0 0 14px rgba(245, 158, 11, 0.3);
}

.summary-badge-pumpkin {
  font-size: 1.15rem;
  display: inline-block;
  animation: pumpkinCandleGlow 2s ease-in-out infinite alternate;
}

.summary-badge-text {
  font-size: 0.84rem;
  font-weight: 900;
  color: #fde047;
  letter-spacing: 1.5px;
}

.summary-modal-title {
  font-size: 1.45rem;
  font-weight: 900;
  color: #fde047;
  margin: 0;
  line-height: 1.2;
  letter-spacing: 0.8px;
  text-shadow: 0 0 16px rgba(253, 224, 71, 0.6), 0 0 30px rgba(168, 85, 247, 0.4);
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
  text-shadow: 0 0 10px rgba(253, 224, 71, 0.65);
}

/* Cuerpo en 2 Columnas */
.summary-modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  align-items: stretch;
  flex: 1;
  overflow-y: auto;
  padding: 2px 4px 4px 4px;
  box-sizing: border-box;
}

.summary-col-left,
.summary-col-right {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: space-between;
}

/* Bity Hero & Speech */
.summary-bity-hero {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(30, 27, 75, 0.5);
  border: 1.5px solid rgba(168, 85, 247, 0.45);
  border-radius: 14px;
  padding: 6px 10px;
  box-sizing: border-box;
}

.summary-avatar-holder {
  width: 48px;
  height: 48px;
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
  font-size: 0.85rem;
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
  animation: starPulse 2s infinite alternate;
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
  box-shadow: 0 0 22px rgba(56, 189, 248, 0.4);
  position: relative;
}

.counter-stars-decor {
  font-size: 0.72rem;
  letter-spacing: 3px;
  margin-bottom: 2px;
  color: #facc15;
}

.instruction-count-number {
  font-size: 2.3rem;
  font-weight: 900;
  color: #fde047;
  line-height: 1;
  text-shadow: 0 0 18px rgba(253, 224, 71, 0.7);
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
  background: linear-gradient(135deg, rgba(6, 78, 59, 0.5) 0%, rgba(20, 83, 45, 0.38) 100%);
  border: 2px solid #10b981;
  border-radius: 14px;
  padding: 10px 12px;
  text-align: left;
  box-shadow: 0 0 18px rgba(16, 185, 129, 0.28);
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
  font-size: 0.88rem;
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
  background: rgba(76, 29, 149, 0.32);
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

/* =========================================================
   BOTONES TEMÁTICOS: PORTAL MÁGICO Y PUERTA DEL CASTILLO
   ========================================================= */

.summary-modal-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-shrink: 0;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(245, 158, 11, 0.3);
  width: 100%;
  box-sizing: border-box;
}

.btn-summary-action {
  border: none;
  border-radius: 14px;
  padding: 11px 26px;
  font-size: 0.96rem;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  letter-spacing: 0.6px;
  position: relative;
  overflow: hidden;
}

.btn-action-icon {
  font-size: 1.25rem;
  display: inline-block;
  transition: transform 0.25s ease;
}

/* Botón 1: Portal Mágico Místico (Probar otro camino) */
.btn-portal-magic {
  background: linear-gradient(135deg, #4c1d95 0%, #1e1b4b 60%, #065f46 100%);
  color: #f0fdf4;
  border: 2px solid #a855f7;
  box-shadow: 0 0 18px rgba(168, 85, 247, 0.4), inset 0 0 10px rgba(56, 189, 248, 0.2);
}

.btn-portal-magic:hover {
  background: linear-gradient(135deg, #6d28d9 0%, #312e81 60%, #047857 100%);
  border-color: #38bdf8;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 0 25px rgba(56, 189, 248, 0.55), inset 0 0 15px rgba(168, 85, 247, 0.35);
}

.btn-portal-magic:hover .btn-action-icon {
  transform: rotate(180deg);
}

.btn-portal-magic:active {
  transform: translateY(1px) scale(0.98);
}

/* Botón 2: Gran Puerta del Castillo (Finalizar Grado) */
.btn-castle-door {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 60%, #b45309 100%);
  color: #ffffff;
  border: 2px solid #fde047;
  box-shadow: 0 0 22px rgba(245, 158, 11, 0.5), inset 0 0 10px rgba(254, 240, 138, 0.3);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.btn-castle-door:hover {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 60%, #c2410c 100%);
  border-color: #ffffff;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 0 32px rgba(245, 158, 11, 0.7), inset 0 0 15px rgba(255, 255, 255, 0.4);
}

.btn-castle-door:hover .btn-action-icon {
  transform: translateY(-2px) scale(1.15);
}

.btn-castle-door:active {
  transform: translateY(1px) scale(0.98);
}

/* =========================================================
   ADAPTACIÓN A DIFERENTES PANTALLAS (RESPONSIVE)
   ========================================================= */

@media (max-width: 800px) {
  .enchanted-tomb-plaque {
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
  .enchanted-tomb-plaque {
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
  .cemetery-lightning-overlay,
  .fog-layer-back,
  .fog-layer-front,
  .cloud-path-1,
  .cloud-path-2,
  .star-twinkle-1,
  .star-twinkle-2,
  .star-twinkle-3,
  .bat-fly-1,
  .bat-fly-2,
  .bat-fly-3,
  .bat-fly-4,
  .cem-ghost-rising,
  .cem-ghost-flying-sky,
  .spider-thread,
  .cem-spider,
  .vampire-hand-wave,
  .summary-avatar-holder {
    animation: none !important;
  }
}`;

if (oldCssRegex.test(cssContent)) {
  cssContent = cssContent.replace(oldCssRegex, newCss);
  fs.writeFileSync(cssPath, cssContent, 'utf8');
  console.log('✓ css/bityblockly.css updated with full cemetery scene animations and enchanted plaque styling!');
} else {
  console.error('✗ oldCssRegex did not match in css/bityblockly.css!');
  process.exit(1);
}

// ====================================================================
// 3. UPDATE js/bityBlockly.js (Atmospheric Audio & triggerInstructionSummaryModal)
// ====================================================================
const bityJsPath = 'js/bityBlockly.js';
let bityJsContent = fs.readFileSync(bityJsPath, 'utf8');

// A. Enhanced playHalloweenCelebration in BityBlocklyAudio
const audioMethodOldRegex = /playHalloweenCelebration\(\) \{[\s\S]*?stopCelebration\(\) \{[\s\S]*?this\.activeCelebrationOscs = \[\];\s*\}\s*\}/;

const audioMethodNew = `playHalloweenCelebration() {
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
      celebGain.gain.setValueAtTime(0.18, t0 + 2.7);
      celebGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 3.6);
      celebGain.connect(this.ctx.destination);
      this.celebrationGain = celebGain;

      // 1. Trueno suave y distante al abrir la escena del cementerio (Low-frequency rumble)
      try {
        const bufferSize = Math.floor(this.ctx.sampleRate * 1.5);
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + (0.02 * white)) / 1.02; // Brown noise
          lastOut = output[i];
          output[i] *= 2.5;
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, t0);
        filter.frequency.exponentialRampToValueAtTime(60, t0 + 1.2);

        const thunderGain = this.ctx.createGain();
        thunderGain.gain.setValueAtTime(0.001, t0);
        thunderGain.gain.linearRampToValueAtTime(0.15, t0 + 0.08);
        thunderGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.4);

        whiteNoise.connect(filter);
        filter.connect(thunderGain);
        thunderGain.connect(celebGain);

        whiteNoise.start(t0 + 0.1);
        whiteNoise.stop(t0 + 1.5);
        this.activeCelebrationOscs.push(whiteNoise);
      } catch (e) {}

      // 2. Viento misterioso sutil
      try {
        const windOsc = this.ctx.createOscillator();
        const windGain = this.ctx.createGain();
        windOsc.type = 'sine';
        windOsc.frequency.setValueAtTime(220, t0);
        windOsc.frequency.exponentialRampToValueAtTime(380, t0 + 0.6);
        windOsc.frequency.exponentialRampToValueAtTime(180, t0 + 1.5);

        windGain.gain.setValueAtTime(0.001, t0);
        windGain.gain.linearRampToValueAtTime(0.04, t0 + 0.3);
        windGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.5);

        windOsc.connect(windGain);
        windGain.connect(celebGain);

        windOsc.start(t0);
        windOsc.stop(t0 + 1.5);
        this.activeCelebrationOscs.push(windOsc);
      } catch (e) {}

      // 3. Melodía alegre y misteriosa de Halloween (tipo Celesta / Danza Mágica)
      const melody = [
        { freq: 587.33, t: 0.45, dur: 0.14 }, // D5
        { freq: 698.46, t: 0.61, dur: 0.14 }, // F5
        { freq: 880.00, t: 0.77, dur: 0.14 }, // A5
        { freq: 830.61, t: 0.93, dur: 0.14 }, // G#5 (tensión traviesa de Halloween)
        { freq: 880.00, t: 1.09, dur: 0.20 }, // A5
        { freq: 698.46, t: 1.33, dur: 0.14 }, // F5
        { freq: 587.33, t: 1.49, dur: 0.14 }, // D5
        { freq: 554.37, t: 1.65, dur: 0.14 }, // C#5
        { freq: 587.33, t: 1.81, dur: 0.24 }, // D5
        // Arpegio estelar ascendente
        { freq: 587.33, t: 2.10, dur: 0.12 }, // D5
        { freq: 698.46, t: 2.22, dur: 0.12 }, // F5
        { freq: 880.00, t: 2.34, dur: 0.12 }, // A5
        { freq: 1174.66, t: 2.46, dur: 0.15 }, // D6
        { freq: 1396.91, t: 2.61, dur: 0.35 }  // F6
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

      // 4. Bajo staccato juguetón
      const bassNotes = [
        { freq: 146.83, t: 0.45 }, // D3
        { freq: 146.83, t: 0.77 }, // D3
        { freq: 110.00, t: 1.09 }, // A2
        { freq: 146.83, t: 1.33 }, // D3
        { freq: 146.83, t: 1.65 }, // D3
        { freq: 146.83, t: 2.10 }  // D3
      ];

      bassNotes.forEach(b => {
        const startT = t0 + b.t;
        const bOsc = this.ctx.createOscillator();
        const bGain = this.ctx.createGain();

        bOsc.type = 'sine';
        bOsc.frequency.setValueAtTime(b.freq, startT);

        bGain.gain.setValueAtTime(0.001, startT);
        bGain.gain.linearRampToValueAtTime(0.18, startT + 0.02);
        bGain.gain.exponentialRampToValueAtTime(0.001, startT + 0.16);

        bOsc.connect(bGain);
        bGain.connect(celebGain);

        bOsc.start(startT);
        bOsc.stop(startT + 0.18);
        this.activeCelebrationOscs.push(bOsc);
      });

      // 5. Campanillas mágicas de cierre
      const chimes = [1760, 2093, 2637, 3135.96]; // A6, C7, E7, G7
      chimes.forEach((freq, idx) => {
        const startT = t0 + 2.65 + idx * 0.1;
        const cOsc = this.ctx.createOscillator();
        const cGain = this.ctx.createGain();

        cOsc.type = 'sine';
        cOsc.frequency.setValueAtTime(freq, startT);

        cGain.gain.setValueAtTime(0.001, startT);
        cGain.gain.linearRampToValueAtTime(0.07, startT + 0.02);
        cGain.gain.exponentialRampToValueAtTime(0.0001, startT + 0.85);

        cOsc.connect(cGain);
        cGain.connect(celebGain);

        cOsc.start(startT);
        cOsc.stop(startT + 0.9);
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
    }`;

if (audioMethodOldRegex.test(bityJsContent)) {
  bityJsContent = bityJsContent.replace(audioMethodOldRegex, audioMethodNew);
  fs.writeFileSync(bityJsPath, bityJsContent, 'utf8');
  console.log('✓ js/bityBlockly.js audio updated with thunder & atmospheric orchestral celebration!');
} else {
  console.error('✗ audioMethodOldRegex did not match in bityBlockly.js!');
  process.exit(1);
}

console.log('All updates applied successfully!');
