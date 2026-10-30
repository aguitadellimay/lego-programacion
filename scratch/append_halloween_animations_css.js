const fs = require('fs');

const cssAddition = `
/* =========================================================
   13.B APARICIONES ANIMADAS DE HALLOWEEN (CALABAZA, FRANKIE, ARAÑA, FANTASMA)
   ========================================================= */

/* Calabaza */
.anim-pumpkin-hop {
  bottom: 25px;
  right: 40px;
  animation: pumpkinHopAnim 4.2s ease-in-out forwards;
}

@keyframes pumpkinHopAnim {
  0% { transform: translateY(120px) scale(0.6); opacity: 0; }
  15% { transform: translateY(-30px) scale(1.1); opacity: 1; }
  22% { transform: translateY(0) scale(1); opacity: 1; }
  35% { transform: translateY(-20px) scale(1.05); }
  42% { transform: translateY(0) scale(1); }
  78% { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(140px) scale(0.7); opacity: 0; }
}

.anim-pumpkin-blink {
  bottom: 25px;
  left: 40px;
  animation: pumpkinBlinkAnim 4.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes pumpkinBlinkAnim {
  0% { transform: translateY(100px) scale(0.5); opacity: 0; }
  20% { transform: translateY(0) scale(1); opacity: 1; }
  80% { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(120px) scale(0.6); opacity: 0; }
}

.pumpkin-eye {
  animation: pumpkinEyePulse 1s ease-in-out infinite alternate;
}

@keyframes pumpkinEyePulse {
  0% { filter: drop-shadow(0 0 2px #ff7518); }
  100% { filter: drop-shadow(0 0 8px #fde047); }
}

/* Frankenstein */
.anim-frank-walk {
  bottom: 10px;
  left: 0;
  animation: frankWalkAcross 5s linear forwards;
}

@keyframes frankWalkAcross {
  0% { transform: translateX(-150px); opacity: 0; }
  12% { transform: translateX(10vw); opacity: 1; }
  50% { transform: translateX(40vw); opacity: 1; }
  85% { transform: translateX(70vw); opacity: 1; }
  100% { transform: translateX(105vw); opacity: 0; }
}

.anim-frank-peek {
  bottom: 15px;
  right: 50px;
  animation: frankPeekAnim 4.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes frankPeekAnim {
  0% { transform: translateY(140px); opacity: 0; }
  18% { transform: translateY(0); opacity: 1; }
  82% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(150px); opacity: 0; }
}

.frank-arm-wave {
  transform-origin: 110px 105px;
  animation: frankWave 1s ease-in-out infinite alternate;
}

@keyframes frankWave {
  0% { transform: rotate(-8deg); }
  100% { transform: rotate(18deg); }
}

/* Araña */
.anim-spider-drop {
  top: 0;
  right: 18vw;
  animation: spiderDropAnim 4.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}

@keyframes spiderDropAnim {
  0% { transform: translateY(-160px); opacity: 0; }
  25% { transform: translateY(140px); opacity: 1; }
  45% { transform: translateY(120px) rotate(-8deg); opacity: 1; }
  55% { transform: translateY(135px) rotate(8deg); opacity: 1; }
  75% { transform: translateY(120px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-180px); opacity: 0; }
}

.anim-spider-crawl {
  top: 30%;
  left: 0;
  animation: spiderCrawlAnim 4.5s ease-in-out forwards;
}

@keyframes spiderCrawlAnim {
  0% { transform: translateX(-120px); opacity: 0; }
  20% { transform: translateX(30px); opacity: 1; }
  80% { transform: translateX(30px); opacity: 1; }
  100% { transform: translateX(-140px); opacity: 0; }
}

.spider-leg {
  transform-origin: 65px 85px;
  animation: spiderLegWiggle 0.4s ease-in-out infinite alternate;
}

.spider-leg.leg-1, .spider-leg.leg-3, .spider-leg.leg-6, .spider-leg.leg-8 {
  animation-duration: 0.35s;
}

@keyframes spiderLegWiggle {
  0% { transform: rotate(-5deg); }
  100% { transform: rotate(5deg); }
}

/* Fantasma */
.anim-ghost-float {
  top: 20vh;
  left: 0;
  animation: ghostFloatAcross 4.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}

@keyframes ghostFloatAcross {
  0% { transform: translateX(-150px) translateY(0); opacity: 0; }
  20% { transform: translateX(20vw) translateY(-20px); opacity: 0.95; }
  50% { transform: translateX(50vw) translateY(15px); opacity: 0.95; }
  80% { transform: translateX(80vw) translateY(-10px); opacity: 0.95; }
  100% { transform: translateX(110vw) translateY(0); opacity: 0; }
}

.anim-ghost-peek {
  top: 45%;
  right: 20px;
  animation: ghostPeekAnim 4.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes ghostPeekAnim {
  0% { transform: translateX(140px) scale(0.7); opacity: 0; }
  18% { transform: translateX(0) scale(1); opacity: 0.95; }
  82% { transform: translateX(0) scale(1); opacity: 0.95; }
  100% { transform: translateX(160px) scale(0.7); opacity: 0; }
}
`;

const file = 'css/halloween_theme.css';
let content = fs.readFileSync(file, 'utf8');
const target = '/* --------------------------------------------------------\n   14. PREFERENCIA DE MOVIMIENTO REDUCIDO Y ACCESIBILIDAD';

if (!content.includes(target)) {
  console.error('Could not find target in halloween_theme.css!');
  process.exit(1);
}

content = content.replace(target, cssAddition + '\n' + target);
fs.writeFileSync(file, content, 'utf8');
console.log('Appended character animation styles to halloween_theme.css');
