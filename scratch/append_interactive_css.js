const fs = require('fs');

const extraCss = `
/* ============================================================
   INTERACTIVE ITEMS (DOORS, WINDOWS, CHESTS, PUMPKINS) & QUESTIONS
   ============================================================ */
.cell-interactive-item {
  position: relative;
  cursor: pointer;
  transition: all 0.25s ease;
}

.cell-item-door {
  border: 2px dashed #f59e0b !important;
  background: rgba(245, 158, 11, 0.16) !important;
  box-shadow: inset 0 0 10px rgba(245, 158, 11, 0.3);
}

.cell-item-window {
  border: 2px dashed #38bdf8 !important;
  background: rgba(56, 189, 248, 0.16) !important;
  box-shadow: inset 0 0 10px rgba(56, 189, 248, 0.3);
}

.cell-item-chest {
  border: 2px dashed #ec4899 !important;
  background: rgba(236, 72, 153, 0.16) !important;
  box-shadow: inset 0 0 10px rgba(236, 72, 153, 0.3);
}

.cell-item-pumpkin {
  border: 2px dashed #ea580c !important;
  background: rgba(234, 88, 12, 0.18) !important;
  box-shadow: inset 0 0 10px rgba(234, 88, 12, 0.35);
}

.cell-interactive-item.cell-item-unlocked {
  border-style: solid !important;
  border-color: #10b981 !important;
  background: rgba(16, 185, 129, 0.22) !important;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.45) !important;
}

.cell-item-icon {
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  user-select: none;
}

.item-pulse {
  animation: itemPulseGlow 2.2s ease-in-out infinite;
}

.item-unlocked-glow {
  animation: itemUnlockedShimmer 2.5s ease-in-out infinite;
}

@keyframes itemPulseGlow {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px gold); }
  50% { transform: scale(1.15); filter: drop-shadow(0 0 12px gold); }
}

@keyframes itemUnlockedShimmer {
  0%, 100% { filter: drop-shadow(0 0 4px #10b981); }
  50% { filter: drop-shadow(0 0 12px #34d399); }
}

/* TOPBAR STARS BADGE */
.alg-stars-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 9999px;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.35));
  border: 1.5px solid rgba(245, 158, 11, 0.6);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  font-weight: 800;
  font-size: 0.85rem;
  color: #fef08a;
  letter-spacing: 0.5px;
}

.alg-stars-badge .star-icon {
  font-size: 1.15rem;
  filter: drop-shadow(0 0 4px gold);
}

.alg-stars-badge .star-count {
  font-size: 1.1rem;
  color: #ffffff;
  font-weight: 900;
}

.animate-pop {
  animation: popScale 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popScale {
  0% { transform: scale(1); }
  50% { transform: scale(1.4); }
  100% { transform: scale(1); }
}

/* QUESTION MODAL DIALOG */
.alg-question-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(10, 5, 25, 0.88);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.alg-question-dialog {
  background: linear-gradient(165deg, #1e1145, #0c0721);
  border: 2px solid #8b5cf6;
  border-radius: 24px;
  padding: 24px 28px;
  width: 100%;
  max-width: 580px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.65), 0 0 30px rgba(139, 92, 246, 0.35);
  color: #f8fafc;
  font-family: inherit;
  position: relative;
  overflow: hidden;
}

.q-dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.q-dialog-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: rgba(139, 92, 246, 0.3);
  border: 1px solid rgba(139, 92, 246, 0.5);
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 800;
  color: #e9d5ff;
  letter-spacing: 0.5px;
}

.q-dialog-stars {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: rgba(245, 158, 11, 0.25);
  border: 1px solid rgba(245, 158, 11, 0.5);
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 900;
  color: #fef08a;
}

.q-dialog-avatar {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.q-dialog-avatar svg {
  width: 72px;
  height: 72px;
  filter: drop-shadow(0 4px 12px rgba(139, 92, 246, 0.5));
  animation: bityBob 3s ease-in-out infinite;
}

@keyframes bityBob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.q-dialog-question {
  font-size: 1.18rem;
  font-weight: 800;
  line-height: 1.4;
  color: #ffffff;
  text-align: center;
  margin: 0 0 18px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.q-dialog-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 14px;
}

.btn-q-option {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 12px 16px;
  background: rgba(30, 41, 59, 0.7);
  border: 1.5px solid rgba(148, 163, 184, 0.25);
  border-radius: 14px;
  color: #f1f5f9;
  font-size: 0.95rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}

.btn-q-option:hover:not(:disabled) {
  background: rgba(139, 92, 246, 0.25);
  border-color: #a855f7;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(139, 92, 246, 0.25);
}

.btn-q-option:disabled {
  cursor: default;
}

.q-opt-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(139, 92, 246, 0.35);
  border: 1.5px solid #a855f7;
  font-weight: 900;
  font-size: 0.85rem;
  color: #f3e8ff;
  flex-shrink: 0;
}

.q-opt-text {
  flex: 1;
  line-height: 1.35;
}

.btn-q-option.q-opt-correct {
  background: rgba(16, 185, 129, 0.25) !important;
  border-color: #10b981 !important;
  color: #a7f3d0 !important;
  box-shadow: 0 0 16px rgba(16, 185, 129, 0.4) !important;
}

.btn-q-option.q-opt-correct .q-opt-letter {
  background: #10b981 !important;
  border-color: #34d399 !important;
  color: #ffffff !important;
}

.btn-q-option.q-opt-incorrect {
  background: rgba(239, 68, 68, 0.2) !important;
  border-color: #ef4444 !important;
  color: #fecaca !important;
  animation: optShake 0.4s ease;
}

@keyframes optShake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}

.q-feedback-box {
  padding: 14px 18px;
  border-radius: 14px;
  margin-bottom: 14px;
  text-align: center;
}

.q-feedback-success {
  background: rgba(16, 185, 129, 0.2);
  border: 1.5px solid #10b981;
  color: #d1fae5;
}

.q-feedback-success h4 {
  margin: 6px 0 4px 0;
  color: #34d399;
  font-size: 1.1rem;
  font-weight: 900;
}

.q-feedback-success p {
  margin: 0;
  font-size: 0.9rem;
  color: #a7f3d0;
}

.q-feedback-hint {
  background: rgba(245, 158, 11, 0.2);
  border: 1.5px solid #f59e0b;
  color: #fef3c7;
}

.q-feedback-hint h4 {
  margin: 6px 0 4px 0;
  color: #fcd34d;
  font-size: 1.05rem;
  font-weight: 900;
}

.q-feedback-hint p {
  margin: 0 0 10px 0;
  font-size: 0.9rem;
  color: #fde68a;
}

.btn-q-retry {
  padding: 8px 18px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  border: none;
  border-radius: 10px;
  color: #1e1145;
  font-size: 0.88rem;
  font-weight: 900;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.btn-q-retry:hover {
  transform: scale(1.05);
}

.q-dialog-actions {
  display: flex;
  justify-content: center;
}

.btn-q-continue {
  padding: 12px 28px;
  background: linear-gradient(135deg, #10b981, #059669);
  border: none;
  border-radius: 14px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4);
  transition: transform 0.15s ease;
}

.btn-q-continue:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.55);
}

/* HALLOWEEN CELEBRATION HERO IN FINAL CARD */
.halloween-celebration-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.halloween-spooky-scene {
  width: 100%;
  max-width: 480px;
  height: 180px;
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(180deg, #120324 0%, #2a0845 50%, #0d0118 100%);
  position: relative;
  border: 2px solid #a855f7;
  box-shadow: 0 0 25px rgba(168, 85, 247, 0.35);
}

.halloween-moon {
  position: absolute;
  top: 16px;
  right: 28px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fef08a;
  box-shadow: 0 0 20px #facc15;
}

.halloween-bats {
  position: absolute;
  top: 20px;
  left: 30px;
  font-size: 1.4rem;
  animation: batFlap 4s ease-in-out infinite alternate;
}

@keyframes batFlap {
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-8px) scale(1.1); }
  100% { transform: translateY(4px) scale(0.95); }
}

.halloween-castle {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 4rem;
}

.halloween-stars-banner {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 9999px;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.35), rgba(168, 85, 247, 0.4));
  border: 2px solid #f59e0b;
  font-size: 1.05rem;
  font-weight: 900;
  color: #fef08a;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.4);
}
`;

fs.appendFileSync('css/algorithms.css', extraCss);
console.log('Appended extra CSS successfully!');
