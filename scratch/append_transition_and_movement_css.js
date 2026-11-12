const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../css/algorithms.css');
let currentCss = fs.readFileSync(cssPath, 'utf8');

const marker = '/* === ANIMACIONES DE MOVIMIENTO INMEDIATO Y TRANSICIONES HALLOWEEN === */';

if (currentCss.includes(marker)) {
  currentCss = currentCss.substring(0, currentCss.indexOf(marker)).trimEnd();
}

const transitionCss = `
${marker}

/* OVERLAY DE TRANSICIÓN HALLOWEEN ENTRE ACTIVIDADES */
.alg-transition-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(10, 5, 25, 0.88);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.25s ease-out;
}

.alg-transition-overlay.transition-fade-out {
  opacity: 0;
}

.transition-modal-box {
  background: linear-gradient(180deg, #1e1145 0%, #0f0728 100%);
  border: 2.5px solid #f59e0b;
  border-radius: 24px;
  padding: 32px 40px;
  text-align: center;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 0 45px rgba(245, 158, 11, 0.4), 0 20px 60px rgba(0, 0, 0, 0.7);
  box-sizing: border-box;
}

.transition-halloween-decor {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}

.decor-bat-1 {
  font-size: 2.2rem;
  display: inline-block;
  animation: batFloatLeft 1.2s ease-in-out infinite alternate;
}

.decor-bat-2 {
  font-size: 2.2rem;
  display: inline-block;
  animation: batFloatRight 1.2s ease-in-out infinite alternate;
}

.decor-pumpkin {
  font-size: 2.6rem;
  display: inline-block;
  filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.7));
  animation: pumpkinPulse 1.4s ease-in-out infinite alternate;
}

.transition-bity-stage {
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px 0 16px;
}

.transition-bity-sprite {
  width: 85px;
  height: 85px;
  animation: bityDance 0.75s ease-in-out infinite;
  filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8));
}

.transition-bity-sprite svg {
  width: 100%;
  height: 100%;
}

.transition-title {
  font-size: 1.85rem;
  font-weight: 900;
  color: #fde047;
  margin: 0 0 8px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  letter-spacing: 0.5px;
}

.transition-subtitle {
  font-size: 1.05rem;
  font-weight: 800;
  color: #e2e8f0;
  margin: 0 0 24px;
  line-height: 1.4;
}

.transition-progress-bar-container {
  height: 10px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(245, 158, 11, 0.4);
}

.transition-progress-bar-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #f59e0b, #10b981);
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.8);
  animation: transitionBarFill 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* COLISIÓN Y BUMP VISUAL */
.bity-bump-up {
  animation: bumpUpAnim 0.22s ease-out;
}
.bity-bump-down {
  animation: bumpDownAnim 0.22s ease-out;
}
.bity-bump-left {
  animation: bumpLeftAnim 0.22s ease-out;
}
.bity-bump-right {
  animation: bumpRightAnim 0.22s ease-out;
}

.cell-collision-halo {
  border-color: #ef4444 !important;
  box-shadow: inset 0 0 12px rgba(239, 68, 68, 0.75), 0 0 8px rgba(239, 68, 68, 0.6) !important;
  transition: all 0.15s ease;
}

.bity-spin-celebration {
  animation: spinCelebrate 0.6s ease-out;
}

/* KEYFRAMES */
@keyframes batFloatLeft {
  0% { transform: translateY(0) rotate(-6deg); }
  100% { transform: translateY(-10px) rotate(6deg); }
}

@keyframes batFloatRight {
  0% { transform: translateY(0) rotate(6deg); }
  100% { transform: translateY(-10px) rotate(-6deg); }
}

@keyframes pumpkinPulse {
  0% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.6)); }
  100% { transform: scale(1.08); filter: drop-shadow(0 0 16px rgba(245, 158, 11, 0.95)); }
}

@keyframes bityDance {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-14px) rotate(-7deg); }
  50% { transform: translateY(0) rotate(0deg); }
  75% { transform: translateY(-14px) rotate(7deg); }
}

@keyframes transitionBarFill {
  0% { width: 0%; }
  100% { width: 100%; }
}

@keyframes bumpUpAnim {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes bumpDownAnim {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}

@keyframes bumpLeftAnim {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-10px); }
}

@keyframes bumpRightAnim {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
}

@keyframes spinCelebrate {
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.3) rotate(180deg); }
  100% { transform: scale(1) rotate(360deg); }
}
`;

fs.writeFileSync(cssPath, currentCss + '\n' + transitionCss, 'utf8');
console.log('css/algorithms.css updated with transition and collision animations.');
