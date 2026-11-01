const fs = require('fs');

const cssToAdd = `
/* =========================================================
   ESTILOS ADICIONALES: CONSIGNA PEDAGÓGICA Y CLASSROOM
   ========================================================= */

.concept-bity-avatar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.concept-bity-avatar {
  width: 76px;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bityGuideHover 3.2s ease-in-out infinite alternate;
  filter: drop-shadow(0 0 15px rgba(56, 189, 248, 0.5));
}

.concept-halloween-badge {
  background: linear-gradient(90deg, rgba(245, 158, 11, 0.25), rgba(168, 85, 247, 0.25));
  border: 1px solid #f59e0b;
  color: #fde047;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 3px 12px;
  border-radius: 20px;
  text-transform: uppercase;
}

.concept-modal-subtitle {
  font-size: 1.05rem;
  color: #94a3b8;
  font-weight: 600;
  margin: 6px 0 16px 0;
  line-height: 1.45;
}

.concept-consigna-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin: 14px 0 18px 0;
}

@media (max-width: 600px) {
  .concept-consigna-grid {
    grid-template-columns: 1fr;
  }
}

.concept-consigna-item {
  background: rgba(15, 23, 42, 0.85);
  border: 1.5px solid rgba(56, 189, 248, 0.35);
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s, border-color 0.2s;
}

.concept-consigna-item:hover {
  border-color: #38bdf8;
  transform: translateY(-2px);
}

.consigna-item-icon {
  font-size: 1.8rem;
  flex-shrink: 0;
  line-height: 1;
}

.consigna-item-content {
  flex: 1;
  text-align: left;
}

.consigna-item-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 800;
  color: #38bdf8;
  margin-bottom: 3px;
  letter-spacing: 0.04em;
}

.consigna-item-text {
  font-size: 0.88rem;
  color: #e2e8f0;
  line-height: 1.4;
  margin: 0;
  font-weight: 600;
}

.concept-motto-box {
  background: linear-gradient(90deg, rgba(234, 179, 8, 0.15), rgba(249, 115, 22, 0.15));
  border: 2px solid #facc15;
  border-radius: 14px;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 14px;
  box-shadow: 0 0 20px rgba(250, 204, 21, 0.25);
}

.concept-motto-box .motto-icon {
  font-size: 1.4rem;
}

.concept-motto-box .motto-text {
  font-size: 1.05rem;
  font-weight: 900;
  color: #fde047;
  letter-spacing: 0.05em;
  text-align: center;
}

/* Callout destacado de Classroom en el resumen final */
.classroom-share-callout {
  background: linear-gradient(135deg, rgba(30, 58, 138, 0.35), rgba(88, 28, 135, 0.35));
  border: 2px solid #f59e0b;
  border-radius: 16px;
  padding: 14px 18px;
  margin: 16px 0;
  text-align: left;
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.25);
}

.classroom-callout-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.classroom-callout-header .callout-icon {
  font-size: 1.35rem;
}

.classroom-callout-header .callout-badge {
  background: #f59e0b;
  color: #0f172a;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  padding: 2px 8px;
  border-radius: 10px;
  text-transform: uppercase;
}

.classroom-share-callout .callout-msg {
  font-size: 1.15rem;
  font-weight: 900;
  color: #fde047;
  line-height: 1.4;
  margin-bottom: 4px;
}

.classroom-share-callout .callout-submsg {
  font-size: 0.92rem;
  color: #cbd5e1;
  line-height: 1.45;
  font-weight: 600;
}

.summary-subtitle-highlight {
  color: #facc15;
  font-weight: 900;
}
`;

const file = 'css/bityblockly.css';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('concept-bity-avatar-wrap')) {
  fs.writeFileSync(file, content + '\n' + cssToAdd, 'utf8');
  console.log('Appended styles for concept consigna and classroom callout');
} else {
  console.log('Styles already present');
}
