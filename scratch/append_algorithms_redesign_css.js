const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../css/algorithms.css');
let currentCss = fs.readFileSync(cssPath, 'utf8');

const marker = '/* === REDISEÑO PEDAGÓGICO Y VISUAL DEL MÓDULO ALGORITMOS === */';

// Strip previous injection if exists
if (currentCss.includes(marker)) {
  currentCss = currentCss.substring(0, currentCss.indexOf(marker)).trimEnd();
}

const newCss = `
${marker}

/* ========================================================
   CONTENEDOR PRINCIPAL Y REGLAS DE GRADO 1
   ======================================================== */
.alg-fullscreen-layout {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 16px 20px 48px;
  box-sizing: border-box;
  color: #f8fafc;
  font-family: 'Nunito', 'Segoe UI', system-ui, sans-serif;
}

.alg-fullscreen-layout.grade-1-uppercase,
.alg-fullscreen-layout.grade-1-uppercase * {
  text-transform: uppercase !important;
}

/* ========================================================
   BARRA SUPERIOR (TOPBAR)
   ======================================================== */
.alg-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(22, 12, 46, 0.85);
  border: 1.5px solid rgba(168, 85, 247, 0.35);
  backdrop-filter: blur(12px);
  padding: 12px 20px;
  border-radius: 18px;
  margin-bottom: 16px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
}

.alg-header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn-alg-back {
  background: linear-gradient(180deg, #4f46e5, #3730a3);
  border: 1.5px solid #818cf8;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 800;
  padding: 9px 18px;
  border-radius: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 0 #312e81, 0 6px 16px rgba(0,0,0,0.3);
  transition: all 0.15s ease;
}

.btn-alg-back:hover {
  transform: translateY(-2px);
  background: linear-gradient(180deg, #6366f1, #4338ca);
  box-shadow: 0 6px 0 #312e81, 0 8px 20px rgba(99, 102, 241, 0.4);
}

.btn-alg-back:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 #312e81;
}

.alg-header-title-box {
  display: flex;
  flex-direction: column;
}

.alg-header-badge {
  font-size: 0.78rem;
  font-weight: 800;
  color: #c084fc;
  letter-spacing: 0.8px;
}

.alg-header-title {
  font-size: 1.4rem;
  font-weight: 900;
  margin: 2px 0 0;
  color: #fde047;
  text-shadow: 0 2px 6px rgba(0,0,0,0.5);
}

.alg-header-right {
  display: flex;
  align-items: center;
}

.alg-grade-pill {
  background: rgba(168, 85, 247, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.4);
  color: #e9d5ff;
  font-size: 0.92rem;
  font-weight: 800;
  padding: 6px 14px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* ========================================================
   NAVEGACIÓN DE PASOS (PILLS)
   ======================================================== */
.alg-steps-nav {
  margin-bottom: 24px;
}

.alg-steps-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 6px;
  scrollbar-width: thin;
  scrollbar-color: rgba(168, 85, 247, 0.4) transparent;
}

.alg-step-tab {
  background: rgba(30, 20, 60, 0.7);
  border: 1.5px solid rgba(139, 92, 246, 0.3);
  color: #cbd5e1;
  font-size: 0.88rem;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.alg-step-tab:hover {
  background: rgba(139, 92, 246, 0.25);
  border-color: rgba(168, 85, 247, 0.6);
  color: #ffffff;
  transform: translateY(-1px);
}

.alg-step-tab.active {
  background: linear-gradient(180deg, #7c3aed, #6d28d9);
  border-color: #c084fc;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.45), 0 2px 0 #4c1d95;
}

.alg-step-tab.completed {
  border-color: rgba(52, 211, 153, 0.6);
}

.alg-step-tab.completed .tab-indicator {
  background: #10b981;
  color: #ffffff;
}

.tab-indicator {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.76rem;
  font-weight: 900;
}

/* ========================================================
   TARJETAS COMUNES
   ======================================================== */
.alg-card {
  background: linear-gradient(180deg, rgba(26, 17, 56, 0.9) 0%, rgba(15, 9, 36, 0.95) 100%);
  border: 1.5px solid rgba(168, 85, 247, 0.35);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.card-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(168, 85, 247, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.4);
  color: #e9d5ff;
  font-size: 0.8rem;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 12px;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.card-title {
  font-size: 1.6rem;
  font-weight: 900;
  color: #fef08a;
  margin: 0 0 12px;
  text-shadow: 0 2px 6px rgba(0,0,0,0.5);
}

.card-subtitle {
  font-size: 1.05rem;
  color: #cbd5e1;
  margin: 0 0 18px;
  line-height: 1.5;
}

/* ========================================================
   PARTE 1: ILUSTRACIÓN DE ACCIÓN Y FLUJO
   ======================================================== */
.alg-bity-speech-card {
  display: flex;
  align-items: center;
  gap: 18px;
  background: linear-gradient(180deg, rgba(76, 29, 149, 0.4) 0%, rgba(30, 27, 75, 0.6) 100%);
  border: 2px solid rgba(168, 85, 247, 0.4);
  border-radius: 20px;
  padding: 18px 24px;
  margin-bottom: 24px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}

.speech-avatar {
  width: 70px;
  height: 70px;
  flex-shrink: 0;
}

.speech-avatar svg {
  width: 100%;
  height: 100%;
}

.speech-bubble h3 {
  margin: 0 0 4px;
  font-size: 1.25rem;
  font-weight: 900;
  color: #38bdf8;
}

.speech-bubble p {
  margin: 0;
  font-size: 1rem;
  color: #e2e8f0;
  line-height: 1.45;
}

.card-content-split {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 24px;
  align-items: center;
}

@media (max-width: 820px) {
  .card-content-split {
    grid-template-columns: 1fr;
  }
}

.card-svg-col {
  display: flex;
  justify-content: center;
}

.alg-svg-illustr {
  width: 100%;
  max-width: 340px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

.concept-def-quote {
  font-size: 1.35rem;
  font-weight: 800;
  color: #67e8f9;
  line-height: 1.5;
  background: rgba(14, 116, 144, 0.2);
  border-left: 4px solid #06b6d4;
  padding: 16px 20px;
  border-radius: 0 16px 16px 0;
  margin-bottom: 16px;
}

.hint-bullet {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 0.98rem;
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.05);
  padding: 12px 16px;
  border-radius: 12px;
}

/* FLUJO DE PASOS (ALMACÉN) */
.alg-steps-flow-grid {
  display: grid;
  grid-template-columns: repeat(11, auto);
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  overflow-x: auto;
  padding: 10px 4px;
}

@media (max-width: 980px) {
  .alg-steps-flow-grid {
    grid-template-columns: repeat(5, auto);
  }
  .flow-arrow-break {
    display: none;
  }
}

.flow-step-box {
  background: rgba(15, 23, 42, 0.7);
  border: 1.5px solid rgba(139, 92, 246, 0.35);
  border-radius: 16px;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 130px;
  box-sizing: border-box;
  box-shadow: 0 4px 14px rgba(0,0,0,0.25);
  transition: transform 0.2s ease;
}

.flow-step-box:hover {
  transform: translateY(-3px);
  border-color: #a855f7;
}

.flow-num {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #7c3aed;
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.flow-svg {
  width: 80px;
  height: 80px;
  margin-bottom: 8px;
}

.flow-svg svg {
  width: 100%;
  height: 100%;
}

.flow-text {
  font-size: 0.82rem;
  font-weight: 700;
  color: #f1f5f9;
  line-height: 1.25;
}

.flow-arrow {
  color: #facc15;
  font-size: 1.4rem;
  font-weight: 900;
  text-shadow: 0 0 10px rgba(250, 204, 21, 0.5);
}

/* ========================================================
   PREGUNTA INTERACTIVA (QUIZ)
   ======================================================== */
.alg-quiz-card {
  border-color: rgba(245, 158, 11, 0.4);
}

.quiz-badge {
  background: rgba(245, 158, 11, 0.2);
  border: 1px solid rgba(245, 158, 11, 0.5);
  color: #fde68a;
  font-size: 0.82rem;
  font-weight: 800;
  padding: 4px 14px;
  border-radius: 14px;
}

.quiz-question {
  font-size: 1.55rem;
  font-weight: 900;
  color: #ffffff;
  margin: 12px 0 20px;
}

.quiz-buttons-row {
  display: flex;
  gap: 18px;
  margin-bottom: 16px;
}

.btn-quiz-opt {
  flex: 1;
  max-width: 280px;
  padding: 16px 20px;
  border-radius: 16px;
  font-size: 1.15rem;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.15s ease;
}

.btn-quiz-yes {
  background: linear-gradient(180deg, #10b981, #059669);
  border: 2px solid #34d399;
  color: #ffffff;
  box-shadow: 0 4px 0 #047857;
}

.btn-quiz-yes:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 #047857, 0 8px 20px rgba(16, 185, 129, 0.4);
}

.btn-quiz-yes.selected {
  outline: 3px solid #facc15;
}

.btn-quiz-no {
  background: linear-gradient(180deg, #64748b, #475569);
  border: 2px solid #94a3b8;
  color: #ffffff;
  box-shadow: 0 4px 0 #334155;
}

.btn-quiz-no:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 #334155;
}

.btn-quiz-no.selected {
  outline: 3px solid #facc15;
}

/* FEEDBACK PEDAGÓGICO */
.quiz-feedback-box {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1.5px dashed rgba(168, 85, 247, 0.35);
}

.feedback-speech {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(30, 27, 75, 0.8);
  border: 1.5px solid #8b5cf6;
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 20px;
}

.feedback-avatar {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
}

.feedback-avatar svg {
  width: 100%;
  height: 100%;
}

.feedback-text h4 {
  margin: 0 0 4px;
  font-size: 1.2rem;
  color: #38bdf8;
  font-weight: 900;
}

.feedback-text p {
  margin: 0;
  font-size: 0.98rem;
  color: #e2e8f0;
}

.disordered-demo-box {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 20px;
  align-items: center;
  background: rgba(244, 63, 94, 0.08);
  border: 1.5px solid rgba(244, 63, 94, 0.35);
  border-radius: 16px;
  padding: 18px;
  margin-bottom: 24px;
}

@media (max-width: 820px) {
  .disordered-demo-box {
    grid-template-columns: 1fr;
  }
}

.disordered-explanation p {
  font-size: 1rem;
  color: #fecdd3;
  margin: 0 0 8px;
  line-height: 1.45;
}

.disordered-explanation strong {
  color: #ffffff;
  font-size: 1.1rem;
}

/* RECUADRO DESTACADO: CONCEPTO CENTRAL */
.concept-gold-card {
  background: linear-gradient(180deg, rgba(30, 27, 75, 0.9) 0%, rgba(55, 18, 77, 0.95) 100%);
  border: 2px solid #facc15;
  border-radius: 20px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 0 25px rgba(250, 204, 21, 0.25), 0 10px 30px rgba(0,0,0,0.4);
  margin-bottom: 24px;
}

.gold-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(250, 204, 21, 0.2);
  border: 1px solid #facc15;
  color: #fde047;
  font-size: 0.85rem;
  font-weight: 900;
  padding: 4px 16px;
  border-radius: 14px;
  margin-bottom: 12px;
}

.gold-definition {
  font-size: 1.35rem;
  font-weight: 900;
  color: #ffffff;
  margin: 0 0 16px;
  line-height: 1.45;
  letter-spacing: 0.4px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
}

.gold-svg-wrapper {
  display: flex;
  justify-content: center;
}

.btn-alg-continue {
  background: linear-gradient(180deg, #10b981, #059669);
  border: 1.5px solid #34d399;
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 900;
  padding: 14px 28px;
  border-radius: 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 0 #047857, 0 8px 24px rgba(16, 185, 129, 0.4);
  transition: all 0.15s ease;
}

.btn-alg-continue:hover {
  transform: translateY(-2px);
  background: linear-gradient(180deg, #34d399, #10b981);
  box-shadow: 0 6px 0 #047857, 0 10px 28px rgba(16, 185, 129, 0.5);
}

.alg-nav-buttons-bottom {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

/* ========================================================
   PARTE 2: BLOQUES COTIDIANOS (MANIPULATIVO)
   ======================================================== */
.everyday-subnav {
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
}

.everyday-tab {
  background: rgba(30, 27, 75, 0.7);
  border: 1.5px solid rgba(139, 92, 246, 0.3);
  color: #cbd5e1;
  font-size: 1.05rem;
  font-weight: 800;
  padding: 12px 20px;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.15s ease;
}

.everyday-tab:hover {
  background: rgba(139, 92, 246, 0.25);
  border-color: #a855f7;
  color: #ffffff;
}

.everyday-tab.active {
  background: linear-gradient(180deg, #6366f1, #4f46e5);
  border-color: #a5b4fc;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4), 0 2px 0 #312e81;
}

.check-pill {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #10b981;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 900;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 18px;
}

@media (max-width: 820px) {
  .activity-header {
    flex-direction: column;
  }
}

.activity-tag {
  background: rgba(168, 85, 247, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.4);
  color: #e9d5ff;
  font-size: 0.8rem;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 12px;
}

.activity-title {
  font-size: 1.7rem;
  font-weight: 900;
  color: #fef08a;
  margin: 6px 0 4px;
}

.activity-subtitle {
  font-size: 1rem;
  color: #cbd5e1;
  margin: 0;
}

.safety-badge {
  background: rgba(239, 68, 68, 0.15);
  border: 1.5px solid rgba(239, 68, 68, 0.45);
  color: #fca5a5;
  font-size: 0.85rem;
  font-weight: 800;
  padding: 8px 14px;
  border-radius: 14px;
  max-width: 320px;
  line-height: 1.35;
}

/* ÁREA DE CONSTRUCCIÓN */
.everyday-workspace {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
  margin-top: 16px;
}

@media (max-width: 900px) {
  .everyday-workspace {
    grid-template-columns: 1fr;
  }
}

.slots-header h3,
.pool-header h3 {
  margin: 0 0 4px;
  font-size: 1.15rem;
  font-weight: 900;
  color: #38bdf8;
}

.slots-instruction {
  font-size: 0.88rem;
  color: #94a3b8;
  margin: 0 0 14px;
}

.pool-hint {
  font-size: 0.82rem;
  color: #fca5a5;
  font-weight: 800;
}

.slots-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.slot-box {
  background: rgba(15, 23, 42, 0.6);
  border: 2px dashed rgba(139, 92, 246, 0.4);
  border-radius: 14px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 52px;
  box-sizing: border-box;
  transition: all 0.15s ease;
}

.slot-box.filled {
  border-style: solid;
  border-color: #8b5cf6;
  background: rgba(30, 27, 75, 0.7);
}

.slot-number {
  background: #4c1d95;
  color: #e9d5ff;
  font-size: 0.78rem;
  font-weight: 900;
  padding: 4px 8px;
  border-radius: 8px;
  flex-shrink: 0;
}

.slot-placeholder {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 0.88rem;
  font-weight: 700;
}

.slot-block-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.block-icon {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
}

.block-icon svg {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}

.block-text {
  font-size: 0.95rem;
  font-weight: 800;
  color: #ffffff;
  flex: 1;
}

.btn-remove-slot {
  background: rgba(239, 68, 68, 0.25);
  border: 1px solid rgba(239, 68, 68, 0.6);
  color: #fca5a5;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.btn-remove-slot:hover {
  background: #ef4444;
  color: #ffffff;
}

.everyday-actions-row {
  display: flex;
  gap: 12px;
}

.btn-alg-check {
  background: linear-gradient(180deg, #10b981, #059669);
  border: 1.5px solid #34d399;
  color: #ffffff;
  font-size: 1.05rem;
  font-weight: 900;
  padding: 12px 24px;
  border-radius: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 0 #047857;
  transition: all 0.15s ease;
}

.btn-alg-check:hover {
  transform: translateY(-2px);
  background: linear-gradient(180deg, #34d399, #10b981);
}

.btn-alg-reset {
  background: rgba(51, 65, 85, 0.8);
  border: 1.5px solid #64748b;
  color: #f1f5f9;
  font-size: 0.95rem;
  font-weight: 800;
  padding: 12px 18px;
  border-radius: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.15s ease;
}

.btn-alg-reset:hover {
  background: #475569;
}

/* BANCO DE BLOQUES */
.pool-blocks-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 440px;
  overflow-y: auto;
  padding-right: 4px;
}

.block-item-btn {
  background: rgba(30, 27, 75, 0.8);
  border: 1.5px solid rgba(139, 92, 246, 0.35);
  border-radius: 14px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
}

.block-item-btn:hover:not(:disabled) {
  border-color: #38bdf8;
  background: rgba(14, 116, 144, 0.25);
  transform: translateX(4px);
}

.block-item-btn.placed {
  opacity: 0.45;
  background: rgba(15, 23, 42, 0.5);
  border-style: dashed;
  cursor: not-allowed;
}

.block-label {
  font-size: 0.92rem;
  font-weight: 800;
  color: #f1f5f9;
  flex: 1;
}

.placed-badge {
  color: #10b981;
  font-weight: 900;
}

/* ========================================================
   PARTES 3 Y 4: LABERINTOS DE PROGRAMACIÓN CON BITY
   ======================================================== */
.maze-header-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(30, 27, 75, 0.85);
  border: 1.5px solid rgba(139, 92, 246, 0.35);
  border-radius: 18px;
  padding: 16px 20px;
  margin-bottom: 20px;
}

.challenge-badge {
  background: rgba(139, 92, 246, 0.25);
  border: 1px solid rgba(139, 92, 246, 0.5);
  color: #c084fc;
  font-size: 0.8rem;
  font-weight: 900;
  padding: 3px 12px;
  border-radius: 12px;
}

.challenge-title {
  font-size: 1.45rem;
  font-weight: 900;
  color: #fef08a;
  margin: 6px 0 2px;
}

.challenge-hint {
  font-size: 0.95rem;
  color: #cbd5e1;
  margin: 0;
}

.maze-header-avatar {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
}

.maze-header-avatar svg {
  width: 100%;
  height: 100%;
}

/* INTERFAZ 3 ZONAS */
.maze-coding-layout {
  display: grid;
  grid-template-columns: 1fr 240px 320px;
  gap: 20px;
  align-items: stretch;
  margin-bottom: 24px;
}

@media (max-width: 1024px) {
  .maze-coding-layout {
    grid-template-columns: 1fr 1fr;
  }
  .maze-zone-program {
    grid-column: span 2;
  }
}

@media (max-width: 680px) {
  .maze-coding-layout {
    grid-template-columns: 1fr;
  }
  .maze-zone-program {
    grid-column: span 1;
  }
}

.zone-tag {
  font-size: 0.82rem;
  font-weight: 900;
  color: #38bdf8;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}

.maze-zone-board,
.maze-zone-palette,
.maze-zone-program {
  background: rgba(15, 11, 36, 0.85);
  border: 1.5px solid rgba(139, 92, 246, 0.3);
  border-radius: 18px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

/* TABLERO DE CASILLAS */
.maze-grid-wrapper {
  display: grid;
  grid-template-columns: repeat(var(--cols, 6), 1fr);
  grid-template-rows: repeat(var(--rows, 5), 1fr);
  gap: 4px;
  background: rgba(15, 23, 42, 0.9);
  padding: 8px;
  border-radius: 14px;
  border: 2px solid #4c1d95;
  aspect-ratio: var(--cols, 6) / var(--rows, 5);
  max-height: 380px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.maze-cell {
  background: rgba(30, 41, 59, 0.6);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.15s ease;
}

.maze-cell.cell-wall {
  background: linear-gradient(180deg, #1e293b, #0f172a);
  border: 1px solid #334155;
}

.maze-cell.cell-path {
  background: rgba(51, 65, 85, 0.35);
}

.maze-cell.cell-goal {
  background: rgba(245, 158, 11, 0.25);
  border: 1.5px dashed #f59e0b;
}

.cell-obstacle {
  font-size: 1.25rem;
}

.cell-goal-icon {
  font-size: 1.4rem;
  filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.8));
}

.bity-cell-sprite {
  width: 90%;
  height: 90%;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.bity-cell-sprite svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.7));
}

.bity-cell-sprite.facing-up { transform: rotate(-90deg); }
.bity-cell-sprite.facing-down { transform: rotate(90deg); }
.bity-cell-sprite.facing-left { transform: rotate(180deg) scaleY(-1); }
.bity-cell-sprite.facing-right { transform: rotate(0deg); }

.maze-legend {
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 10px;
}

/* PALETA DE 4 DIRECCIONES */
.palette-hint {
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 0 0 12px;
}

.palette-buttons-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: auto 0;
}

.palette-row-middle {
  display: flex;
  gap: 8px;
}

.btn-dir-block {
  width: 86px;
  height: 64px;
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.76rem;
  color: #ffffff;
  transition: all 0.15s ease;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
}

.btn-dir-up {
  background: linear-gradient(180deg, #3b82f6, #1d4ed8);
  box-shadow: 0 4px 0 #1e3a8a;
}
.btn-dir-down {
  background: linear-gradient(180deg, #10b981, #047857);
  box-shadow: 0 4px 0 #064e3b;
}
.btn-dir-left {
  background: linear-gradient(180deg, #f59e0b, #d97706);
  box-shadow: 0 4px 0 #92400e;
}
.btn-dir-right {
  background: linear-gradient(180deg, #ea580c, #c2410c);
  box-shadow: 0 4px 0 #7c2d12;
}

.btn-dir-block:hover:not(:disabled) {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.btn-dir-block:active:not(:disabled) {
  transform: translateY(2px);
  box-shadow: 0 2px 0 rgba(0,0,0,0.5);
}

.dir-icon {
  font-size: 1.3rem;
  margin-bottom: 2px;
}

/* ESPACIO DEL PROGRAMA */
.program-blocks-container {
  flex: 1;
  background: rgba(15, 23, 42, 0.7);
  border: 1.5px dashed rgba(139, 92, 246, 0.35);
  border-radius: 14px;
  padding: 10px;
  min-height: 200px;
  max-height: 260px;
  overflow-y: auto;
  margin-bottom: 14px;
}

.empty-program-notice {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #64748b;
  text-align: center;
  font-size: 0.88rem;
  padding: 16px;
}

.empty-program-notice span {
  font-size: 1.8rem;
  margin-bottom: 6px;
}

.program-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.program-step-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(30, 27, 75, 0.8);
  border: 1px solid #6366f1;
  border-radius: 10px;
  padding: 6px 10px;
  transition: all 0.15s ease;
}

.program-step-badge.is-executing {
  background: #facc15;
  border-color: #ffffff;
  color: #0f172a;
  transform: scale(1.03);
  box-shadow: 0 0 12px rgba(250, 204, 21, 0.8);
}

.program-step-badge.is-executing * {
  color: #0f172a !important;
}

.badge-num {
  font-size: 0.78rem;
  font-weight: 900;
  color: #94a3b8;
  min-width: 18px;
}

.badge-arrow {
  font-size: 1rem;
}

.badge-name {
  font-size: 0.82rem;
  font-weight: 800;
  color: #ffffff;
  flex: 1;
}

.btn-del-inst {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 900;
  padding: 2px 6px;
  border-radius: 4px;
}

.btn-del-inst:hover {
  background: #ef4444;
  color: #ffffff;
}

.program-controls-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.btn-action-run {
  background: linear-gradient(180deg, #10b981, #059669);
  border: 1.5px solid #34d399;
  color: #ffffff;
  font-weight: 900;
  font-size: 0.88rem;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 3px 0 #047857;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.btn-action-step {
  background: linear-gradient(180deg, #8b5cf6, #6d28d9);
  border: 1.5px solid #c084fc;
  color: #ffffff;
  font-weight: 900;
  font-size: 0.88rem;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 3px 0 #4c1d95;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.btn-action-reset,
.btn-action-clear {
  background: rgba(51, 65, 85, 0.7);
  border: 1px solid #64748b;
  color: #cbd5e1;
  font-weight: 800;
  font-size: 0.82rem;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.btn-action-reset:hover,
.btn-action-clear:hover {
  background: #475569;
  color: #ffffff;
}

/* ========================================================
   ALERTAS Y ANIMACIONES
   ======================================================== */
.alert-box-warning {
  background: rgba(239, 68, 68, 0.15);
  border: 1.5px solid #ef4444;
  color: #fca5a5;
  padding: 12px 18px;
  border-radius: 14px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
}

.alert-box-success {
  background: rgba(16, 185, 129, 0.15);
  border: 1.5px solid #10b981;
  color: #d1fae5;
  padding: 14px 20px;
  border-radius: 16px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.success-avatar {
  width: 54px;
  height: 54px;
  flex-shrink: 0;
}

.success-avatar svg {
  width: 100%;
  height: 100%;
}

.success-body h3 {
  margin: 0 0 2px;
  font-size: 1.25rem;
  color: #34d399;
  font-weight: 900;
}

.success-body p {
  margin: 0;
  font-size: 0.95rem;
}

/* ========================================================
   TARJETA DE COMPARACIÓN Y OPTIMIZACIÓN (DESAFÍO 3)
   ======================================================== */
.comparison-reflection-card {
  border-color: #f59e0b;
  background: linear-gradient(180deg, rgba(30, 27, 75, 0.95) 0%, rgba(46, 26, 71, 0.95) 100%);
  text-align: center;
}

.comp-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(245, 158, 11, 0.2);
  border: 1px solid #f59e0b;
  color: #fde68a;
  font-size: 0.82rem;
  font-weight: 900;
  padding: 4px 14px;
  border-radius: 12px;
  margin-bottom: 12px;
}

.comp-title {
  font-size: 1.45rem;
  font-weight: 900;
  color: #ffffff;
  margin: 0 0 20px;
}

.comp-stats-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 20px;
}

.stat-box {
  background: rgba(15, 23, 42, 0.7);
  border: 2px solid;
  border-radius: 16px;
  padding: 16px 24px;
  min-width: 140px;
}

.stat-student {
  border-color: #38bdf8;
}

.stat-optimal {
  border-color: #10b981;
}

.stat-number {
  font-size: 2.2rem;
  font-weight: 900;
  color: #ffffff;
}

.stat-label {
  font-size: 0.85rem;
  font-weight: 800;
  color: #cbd5e1;
}

.stat-vs {
  font-size: 1.2rem;
  font-weight: 900;
  color: #f59e0b;
}

.comp-message-box {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 14px;
  padding: 14px 18px;
  max-width: 700px;
  margin: 0 auto 20px;
  text-align: left;
}

.comp-avatar {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
}

.comp-avatar svg {
  width: 100%;
  height: 100%;
}

.comp-buttons-row {
  display: flex;
  justify-content: center;
  gap: 14px;
}

/* ========================================================
   CELEBRACIÓN FINAL (DESAFÍO 4)
   ======================================================== */
.final-celebration-card {
  border: 2.5px solid #facc15;
  background: linear-gradient(180deg, rgba(30, 27, 75, 0.95) 0%, rgba(67, 20, 92, 0.98) 100%);
  text-align: center;
  box-shadow: 0 0 35px rgba(250, 204, 21, 0.3);
}

.celebration-confetti {
  font-size: 1.6rem;
  margin-bottom: 8px;
}

.celebration-title {
  font-size: 2rem;
  font-weight: 900;
  color: #fde047;
  margin: 0 0 6px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

.celebration-subtitle {
  font-size: 1.15rem;
  color: #e2e8f0;
  margin: 0 0 20px;
}

.celebration-trophy-box {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.celebration-summary-box {
  background: rgba(15, 23, 42, 0.7);
  border: 1.5px solid rgba(168, 85, 247, 0.4);
  border-radius: 16px;
  padding: 20px 24px;
  max-width: 680px;
  margin: 0 auto 24px;
  text-align: left;
}

.celebration-summary-box h4 {
  margin: 0 0 12px;
  font-size: 1.1rem;
  font-weight: 900;
  color: #38bdf8;
}

.celebration-summary-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.celebration-summary-box li {
  font-size: 0.95rem;
  color: #cbd5e1;
  margin-bottom: 8px;
  line-height: 1.4;
}

.celebration-summary-box strong {
  color: #fde047;
}

.celebration-btn-row {
  display: flex;
  justify-content: center;
}

.btn-alg-finish {
  background: linear-gradient(180deg, #f59e0b, #d97706);
  border: 2px solid #fde047;
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 900;
  padding: 16px 36px;
  border-radius: 18px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 5px 0 #92400e, 0 10px 25px rgba(245, 158, 11, 0.4);
  transition: all 0.15s ease;
}

.btn-alg-finish:hover {
  transform: translateY(-2px);
  background: linear-gradient(180deg, #fbbf24, #f59e0b);
  box-shadow: 0 7px 0 #92400e, 0 12px 30px rgba(245, 158, 11, 0.5);
}

/* ANIMACIONES */
.animate-fade-in {
  animation: algFadeIn 0.3s ease-out forwards;
}

.animate-scale-up {
  animation: algScaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.animate-shake {
  animation: algShake 0.4s ease-in-out;
}

@keyframes algFadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes algScaleUp {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes algShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}
`;

fs.writeFileSync(cssPath, currentCss + '\n' + newCss, 'utf8');
console.log('css/algorithms.css updated successfully.');
