const fs = require('fs');

const cssToAdd = `
/* ========================================================
   PERSONAJE GUÍA PERMANENTE (BITY) Y ASISTENCIA PEDAGÓGICA
   ======================================================== */

.bity-guide-companion-box {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-top: 12px;
  padding: 12px 16px;
  background: rgba(15, 23, 42, 0.88);
  border: 2px solid rgba(56, 189, 248, 0.35);
  border-radius: 14px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.45);
  position: relative;
  transition: all 0.3s ease;
}

.bity-guide-avatar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 76px;
  flex-shrink: 0;
}

.bity-guide-avatar-container {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: bityGuideHover 3.2s ease-in-out infinite alternate;
}

.bity-guide-avatar-container.bounce {
  animation: bityGuideBounce 0.6s ease-out;
}

.bity-mascot-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.6));
  overflow: visible;
}

/* Animaciones SVG internas */
.antenna-wave.wave-1 {
  animation: bityAntennaSignal 1.8s ease-out infinite;
  transform-origin: 50px 9px;
}

.antenna-wave.wave-2 {
  animation: bityAntennaSignal 1.8s ease-out 0.6s infinite;
  transform-origin: 50px 9px;
}

.bity-eye.left-eye,
.bity-eye.right-eye {
  animation: bityEyeBlink 3.8s ease-in-out infinite;
  transform-origin: 50px 46px;
}

.bity-core {
  animation: bityCorePulse 2s ease-in-out infinite alternate;
}

.bity-guide-nametag {
  margin-top: 4px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #38bdf8;
  background: #090d16;
  padding: 2px 10px;
  border-radius: 12px;
  border: 1px solid rgba(56, 189, 248, 0.4);
  text-transform: uppercase;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.bity-guide-dialog-container {
  flex: 1;
  min-width: 0;
  position: relative;
}

.bity-guide-bubble {
  position: relative;
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95));
  border: 1.5px solid rgba(56, 189, 248, 0.45);
  border-radius: 12px;
  padding: 10px 14px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
  transition: border-color 0.3s, transform 0.2s;
}

.bity-guide-bubble::before {
  content: '';
  position: absolute;
  left: -9px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-right: 9px solid rgba(56, 189, 248, 0.45);
}

.bity-guide-bubble-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  gap: 8px;
  flex-wrap: wrap;
}

.bity-guide-speaker-badge {
  font-size: 0.78rem;
  font-weight: 800;
  color: #7dd3fc;
  display: flex;
  align-items: center;
  gap: 5px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.btn-bity-ask-hint {
  background: linear-gradient(180deg, #f59e0b, #d97706);
  border: 1px solid #fde047;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 800;
  padding: 5px 12px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  transition: all 0.2s;
}

.btn-bity-ask-hint:hover {
  background: linear-gradient(180deg, #fbbf24, #f59e0b);
  transform: scale(1.04);
  box-shadow: 0 0 12px rgba(250, 204, 21, 0.6);
}

.btn-bity-ask-hint:active {
  transform: scale(0.98);
}

.bity-guide-message-text {
  font-size: 0.95rem;
  line-height: 1.48;
  color: #f8fafc;
  font-weight: 600;
  margin: 0;
  word-break: break-word;
  animation: bityTextFadeIn 0.3s ease-out;
}

/* Keyframes de animación */
@keyframes bityGuideHover {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
  100% { transform: translateY(2px); }
}

@keyframes bityGuideBounce {
  0%, 100% { transform: translateY(0) scale(1); }
  30% { transform: translateY(-8px) scale(1.08); }
  60% { transform: translateY(2px) scale(0.98); }
}

@keyframes bityEyeBlink {
  0%, 88%, 94%, 100% { transform: scaleY(1); }
  91% { transform: scaleY(0.1); }
}

@keyframes bityAntennaSignal {
  0% { transform: scale(0.8); opacity: 0.9; }
  100% { transform: scale(1.8); opacity: 0; }
}

@keyframes bityCorePulse {
  0% { opacity: 0.7; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1.1); }
}

@keyframes bityTextFadeIn {
  from { opacity: 0.3; transform: translateX(4px); }
  to { opacity: 1; transform: translateX(0); }
}

@media (max-width: 640px) {
  .bity-guide-companion-box {
    flex-direction: column;
    align-items: flex-start;
  }
  .bity-guide-avatar-wrap {
    flex-direction: row;
    gap: 10px;
    align-items: center;
  }
  .bity-guide-bubble::before {
    left: 20px;
    top: -9px;
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
    border-bottom: 9px solid rgba(56, 189, 248, 0.45);
    border-top: none;
    transform: none;
  }
}

/* ========================================================
   REGLA OBLIGATORIA: MAYÚSCULAS EXCLUSIVAS PARA 1.º GRADO
   ======================================================== */

#screen-bityblockly[data-bity-grade="1"],
#screen-bityblockly[data-bity-grade="1"] * {
  text-transform: uppercase !important;
}

body[data-active-bity-grade="1"] .bityblockly-modal-overlay,
body[data-active-bity-grade="1"] .bityblockly-modal-overlay * {
  text-transform: uppercase !important;
}

body[data-student-grade="1"] #topic-card-bityblockly,
body[data-student-grade="1"] #topic-card-bityblockly * {
  text-transform: uppercase !important;
}
`;

const currentCss = fs.readFileSync('css/bityblockly.css', 'utf8');
if (!currentCss.includes('bity-guide-companion-box')) {
  fs.writeFileSync('css/bityblockly.css', currentCss + '\n' + cssToAdd, 'utf8');
  console.log('Appended Bity Guide styles and Grade 1 uppercase rules to css/bityblockly.css');
} else {
  console.log('Styles already present in css/bityblockly.css');
}
