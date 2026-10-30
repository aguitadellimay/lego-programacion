const fs = require('fs');

const addition = `
/* =========================================================
   7. SISTEMA DE VIDAS (3 VIDAS EN LABERINTOS Y PUERTAS)
   ========================================================= */
.bityblockly-lives-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(15, 23, 42, 0.85);
  border: 2px solid #ef4444;
  border-radius: 14px;
  padding: 6px 14px;
  box-shadow: 0 0 14px rgba(239, 68, 68, 0.4);
}

.lives-label {
  font-size: 0.85rem;
  font-weight: 800;
  color: #fca5a5;
  letter-spacing: 1px;
}

.lives-hearts {
  font-size: 1.25rem;
  letter-spacing: 3px;
  display: inline-block;
}

.math-modal-header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;
}

.math-modal-lives-box {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(2, 6, 23, 0.8);
  border: 1.5px solid #ef4444;
  border-radius: 12px;
  padding: 6px 12px;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
}

.lives-modal-label {
  font-size: 0.8rem;
  font-weight: 800;
  color: #fca5a5;
  letter-spacing: 0.8px;
}

/* =========================================================
   8. MODAL DIDÁCTICO: ¿QUÉ ES UNA INSTRUCCIÓN?
   ========================================================= */
.bityblockly-concept-card {
  background: linear-gradient(180deg, #0b0f19 0%, #1e1b4b 100%);
  border: 3px solid #a855f7;
  border-radius: 26px;
  max-width: 620px;
  width: 100%;
  padding: 30px;
  box-shadow: 0 0 50px rgba(168, 85, 247, 0.4), inset 0 0 25px rgba(0, 0, 0, 0.6);
  text-align: center;
  position: relative;
  animation: bityModalPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.concept-modal-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
}

.concept-modal-icon {
  font-size: 3rem;
  filter: drop-shadow(0 0 12px rgba(250, 204, 21, 0.6));
}

.concept-modal-title {
  font-size: 1.8rem;
  font-weight: 900;
  color: #fde047;
  margin: 0;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.concept-modal-body {
  text-align: left;
  color: #e2e8f0;
  font-size: 1.05rem;
  line-height: 1.6;
}

.concept-lead-text {
  font-size: 1.25rem;
  color: #38bdf8;
  text-align: center;
  margin-bottom: 14px;
  font-weight: 800;
}

.concept-story-text {
  margin-bottom: 16px;
  color: #cbd5e1;
}

.concept-steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 18px 0;
}

@media (max-width: 600px) {
  .concept-steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.concept-step-item {
  background: rgba(15, 23, 42, 0.85);
  border: 2px solid #818cf8;
  border-radius: 16px;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.concept-step-num {
  position: absolute;
  top: -10px;
  left: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #a855f7;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 8px rgba(168, 85, 247, 0.8);
}

.concept-step-icon {
  font-size: 2rem;
}

.concept-step-desc {
  font-size: 0.85rem;
  font-weight: 700;
  color: #f8fafc;
  line-height: 1.2;
}

.concept-foot-text {
  font-size: 0.95rem;
  color: #94a3b8;
  margin-top: 14px;
  text-align: center;
}

.concept-modal-actions {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.btn-concept-start {
  background: linear-gradient(135deg, #a855f7, #6366f1);
  color: #ffffff;
  border: none;
  border-radius: 16px;
  padding: 14px 28px;
  font-size: 1.15rem;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 0 25px rgba(168, 85, 247, 0.6);
  transition: all 0.2s;
}

.btn-concept-start:hover {
  transform: scale(1.05);
  box-shadow: 0 0 35px rgba(168, 85, 247, 0.85);
}

/* =========================================================
   9. MODAL RESUMEN: DESAFÍO ESPECIAL DE INSTRUCCIONES
   ========================================================= */
.bityblockly-instruction-summary-card {
  background: linear-gradient(180deg, #020617 0%, #17102b 100%);
  border: 3px solid #f59e0b;
  border-radius: 26px;
  max-width: 640px;
  width: 100%;
  padding: 30px;
  box-shadow: 0 0 50px rgba(245, 158, 11, 0.4), inset 0 0 25px rgba(0, 0, 0, 0.6);
  text-align: center;
  position: relative;
  animation: bityModalPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.summary-modal-header {
  margin-bottom: 18px;
}

.summary-modal-icon {
  font-size: 2.8rem;
  display: inline-block;
  margin-bottom: 6px;
}

.summary-modal-title {
  font-size: 1.8rem;
  font-weight: 900;
  color: #fde047;
  margin: 0;
  letter-spacing: 1px;
}

.summary-modal-subtitle {
  font-size: 1.25rem;
  font-weight: 800;
  color: #38bdf8;
  margin: 4px 0 0 0;
}

.instruction-counter-highlight {
  background: rgba(15, 23, 42, 0.9);
  border: 3px solid #38bdf8;
  border-radius: 20px;
  padding: 16px;
  margin: 16px auto;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  box-shadow: 0 0 30px rgba(56, 189, 248, 0.45);
}

.instruction-count-number {
  font-size: 3.5rem;
  font-weight: 900;
  color: #fde047;
  line-height: 1;
}

.instruction-count-label {
  font-size: 0.9rem;
  font-weight: 800;
  color: #94a3b8;
  letter-spacing: 1.5px;
  margin-top: 4px;
}

.instruction-breakdown-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 18px 0;
}

@media (max-width: 550px) {
  .instruction-breakdown-grid {
    grid-template-columns: 1fr;
  }
}

.instruction-breakdown-card {
  background: rgba(30, 41, 59, 0.7);
  border: 2px solid #64748b;
  border-radius: 14px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.breakdown-icon {
  font-size: 1.5rem;
}

.breakdown-val {
  font-size: 1.35rem;
  font-weight: 900;
  color: #f1f5f9;
}

.breakdown-lbl {
  font-size: 0.8rem;
  font-weight: 700;
  color: #94a3b8;
  text-align: center;
}

.classroom-reflection-box {
  background: rgba(76, 29, 149, 0.25);
  border: 2px dashed #a855f7;
  border-radius: 16px;
  padding: 16px;
  margin: 18px 0;
  text-align: left;
}

.reflection-tag {
  font-size: 0.85rem;
  font-weight: 900;
  color: #c084fc;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
}

.reflection-text {
  font-size: 1.05rem;
  font-weight: 700;
  color: #f1f5f9;
  line-height: 1.5;
  margin: 0;
}

.summary-modal-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.btn-summary-action {
  border: none;
  border-radius: 14px;
  padding: 12px 22px;
  font-size: 1.05rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-summary-retry {
  background: #334155;
  color: #e2e8f0;
  border: 2px solid #64748b;
}

.btn-summary-retry:hover {
  background: #475569;
  border-color: #94a3b8;
}

.btn-summary-next {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #ffffff;
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
}

.btn-summary-next:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(245, 158, 11, 0.8);
}
`;

const css = fs.readFileSync('css/bityblockly.css', 'utf8');
fs.writeFileSync('css/bityblockly.css', css + addition, 'utf8');
console.log('Appended styles to css/bityblockly.css successfully!');
