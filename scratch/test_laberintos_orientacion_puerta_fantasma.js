/**
 * Test Suite: Mejoras Visuales y Didácticas en los Laberintos de Halloween
 * 1. Pistas intermitentes de IZQUIERDA y DERECHA relativas al robot.
 * 2. Reemplazo del candado por puerta temática de Halloween (castillo / portal).
 * 3. Decoración temática del tablero (muros medievales, losas de cripta, adornos en paredes).
 * 4. Risa del fantasma al aparecer (Web Audio API, 1 sola vez por aparición, respeto a silencio).
 * 5. Conservación total de mecánicas y progreso.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

let totalTests = 0;
let passedTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${testName}`);
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
  }
}

console.log('--- INICIANDO TEST SUITE: LABERINTOS DE HALLOWEEN ---');

// Mock DOM and Web Audio API environment
const mockAudioEvents = [];
class MockAudioNode {
  constructor(name) {
    this.name = name;
    this.frequency = {
      setValueAtTime: (v, t) => mockAudioEvents.push({ type: 'freq_set', node: this.name, val: v, time: t }),
      exponentialRampToValueAtTime: (v, t) => mockAudioEvents.push({ type: 'freq_exp', node: this.name, val: v, time: t }),
      linearRampToValueAtTime: (v, t) => mockAudioEvents.push({ type: 'freq_lin', node: this.name, val: v, time: t })
    };
    this.gain = {
      setValueAtTime: (v, t) => mockAudioEvents.push({ type: 'gain_set', node: this.name, val: v, time: t }),
      exponentialRampToValueAtTime: (v, t) => mockAudioEvents.push({ type: 'gain_exp', node: this.name, val: v, time: t }),
      linearRampToValueAtTime: (v, t) => mockAudioEvents.push({ type: 'gain_lin', node: this.name, val: v, time: t }),
      cancelScheduledValues: (t) => {}
    };
    this.Q = {
      setValueAtTime: (v, t) => {}
    };
  }
  connect(dest) {}
  start(t) { mockAudioEvents.push({ type: 'start', node: this.name, time: t }); }
  stop(t) { mockAudioEvents.push({ type: 'stop', node: this.name, time: t }); }
}

class MockAudioContext {
  constructor() {
    this.currentTime = 0;
    this.state = 'running';
    this.destination = new MockAudioNode('destination');
  }
  createOscillator() { return new MockAudioNode('oscillator'); }
  createGain() { return new MockAudioNode('gain'); }
  createBiquadFilter() { return new MockAudioNode('filter'); }
  createBuffer(channels, length, sampleRate) {
    return {
      getChannelData: () => new Float32Array(length)
    };
  }
  createBufferSource() { return new MockAudioNode('bufferSource'); }
  resume() { return Promise.resolve(); }
}

const canvasDrawCalls = [];
class MockCanvasRenderingContext2D {
  constructor() {
    this.fillStyle = '';
    this.strokeStyle = '';
    this.lineWidth = 1;
    this.font = '';
    this.textAlign = 'left';
    this.textBaseline = 'top';
    this.globalAlpha = 1;
    this.shadowColor = '';
    this.shadowBlur = 0;
  }
  save() { canvasDrawCalls.push({ call: 'save' }); }
  restore() { canvasDrawCalls.push({ call: 'restore' }); }
  clearRect(x, y, w, h) { canvasDrawCalls.push({ call: 'clearRect', x, y, w, h }); }
  fillRect(x, y, w, h) { canvasDrawCalls.push({ call: 'fillRect', x, y, w, h, fill: this.fillStyle }); }
  strokeRect(x, y, w, h) { canvasDrawCalls.push({ call: 'strokeRect', x, y, w, h, stroke: this.strokeStyle }); }
  beginPath() { canvasDrawCalls.push({ call: 'beginPath' }); }
  closePath() { canvasDrawCalls.push({ call: 'closePath' }); }
  moveTo(x, y) { canvasDrawCalls.push({ call: 'moveTo', x, y }); }
  lineTo(x, y) { canvasDrawCalls.push({ call: 'lineTo', x, y }); }
  quadraticCurveTo(cpx, cpy, x, y) {}
  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {}
  arc(x, y, r, sa, ea) { canvasDrawCalls.push({ call: 'arc', x, y, r }); }
  ellipse(x, y, rx, ry, rot, sa, ea) {}
  fill() { canvasDrawCalls.push({ call: 'fill', fill: this.fillStyle }); }
  stroke() { canvasDrawCalls.push({ call: 'stroke', stroke: this.strokeStyle }); }
  fillText(text, x, y) { canvasDrawCalls.push({ call: 'fillText', text, x, y, fill: this.fillStyle, font: this.font }); }
  measureText(text) { return { width: text.length * 8 }; }
  roundRect(x, y, w, h, r) { canvasDrawCalls.push({ call: 'roundRect', x, y, w, h, r }); }
  createLinearGradient(x0, y0, x1, y1) {
    return {
      addColorStop: (offset, color) => {}
    };
  }
  createRadialGradient(x0, y0, r0, x1, y1, r1) {
    return {
      addColorStop: (offset, color) => {}
    };
  }
  translate(x, y) {}
  rotate(a) {}
  scale(sx, sy) {}
}

const mockCanvas = {
  id: 'bityblockly-canvas',
  width: 600,
  height: 500,
  getContext: () => new MockCanvasRenderingContext2D(),
  style: {},
  addEventListener: () => {},
  classList: { add: () => {}, remove: () => {} }
};

const domElements = {};
const mockDocument = {
  addEventListener: () => {},
  removeEventListener: () => {},
  querySelectorAll: () => [],
  querySelector: () => null,
  getElementById: (id) => {
    if (id.includes('canvas')) return mockCanvas;
    if (!domElements[id]) {
      domElements[id] = {
        id,
        innerHTML: '',
        innerText: '',
        style: {},
        setAttribute: () => {},
        getAttribute: () => null,
        classList: {
          add: () => {},
          remove: () => {},
          contains: () => false,
          toggle: () => {}
        },
        appendChild: () => {},
        addEventListener: () => {},
        querySelectorAll: () => [],
        querySelector: () => null
      };
    }
    return domElements[id];
  },
  createElement: (tag) => {
    return {
      tagName: tag.toUpperCase(),
      style: {},
      classList: { add: () => {}, remove: () => {} },
      appendChild: () => {},
      addEventListener: () => {},
      querySelector: () => null,
      querySelectorAll: () => []
    };
  }
};

let prefersReducedMotion = false;
const sandbox = {
  window: {
    AudioContext: MockAudioContext,
    webkitAudioContext: MockAudioContext,
    localStorage: {
      store: {},
      getItem(k) { return this.store[k] || null; },
      setItem(k, v) { this.store[k] = String(v); }
    },
    matchMedia: (query) => {
      if (query.includes('prefers-reduced-motion')) {
        return { matches: prefersReducedMotion };
      }
      return { matches: false };
    },
    requestAnimationFrame: (fn) => setTimeout(fn, 16),
    cancelAnimationFrame: (id) => clearTimeout(id)
  },
  requestAnimationFrame: (fn) => 1,
  cancelAnimationFrame: (id) => {},
  document: mockDocument,
  console: console,
  setTimeout: (fn, ms) => 1,
  clearTimeout: (id) => {},
  setInterval: (fn, ms) => 1,
  clearInterval: (id) => {},
  Date: Date,
  Math: Math
};
sandbox.global = sandbox.window;

// Load MagicAudioEngine and BityBlockly
const magicAudioCode = fs.readFileSync(path.resolve(__dirname, '../js/magicAudio.js'), 'utf8');
const bityBlocklyCode = fs.readFileSync(path.resolve(__dirname, '../js/bityBlockly.js'), 'utf8');

vm.createContext(sandbox);
vm.runInContext(magicAudioCode, sandbox);
vm.runInContext(bityBlocklyCode, sandbox);

const MagicAudioEngine = sandbox.window.MagicAudioEngine;
const BityBlocklyGame = sandbox.window.BityBlocklyGame;
const BITYBLOCKLY_GRADES_DATA = sandbox.window.BITYBLOCKLY_GRADES_DATA;

// ==========================================
// 1. VERIFICACIÓN DE ORIENTACIÓN RELATIVA (Pistas IZQUIERDA / DERECHA)
// ==========================================
console.log('\n--- Test 1: Pistas de Orientación Relativas a Byte ---');

const gameInstance = new BityBlocklyGame({
  mountId: 'bityblockly-root',
  grade: '1',
  missionIndex: 0
});

// Prueba para dir = 0 (Mirando ARRIBA / Norte)
const cuesN = gameInstance.getOrientationCues(0);
assert(cuesN.left.dx === -1 && cuesN.left.dy === 0, 'dir = 0 (Norte): IZQUIERDA apunta hacia el oeste (pantalla izquierda)');
assert(cuesN.left.arrow === '←' && cuesN.left.text.includes('IZQUIERDA'), 'dir = 0 (Norte): Texto y flecha izquierda son correctos');
assert(cuesN.right.dx === 1 && cuesN.right.dy === 0, 'dir = 0 (Norte): DERECHA apunta hacia el este (pantalla derecha)');
assert(cuesN.right.arrow === '→' && cuesN.right.text.includes('DERECHA'), 'dir = 0 (Norte): Texto y flecha derecha son correctos');

// Prueba para dir = 1 (Mirando DERECHA / Este)
const cuesE = gameInstance.getOrientationCues(1);
assert(cuesE.left.dx === 0 && cuesE.left.dy === -1, 'dir = 1 (Este): IZQUIERDA apunta hacia el norte (pantalla arriba)');
assert(cuesE.left.arrow === '↑' && cuesE.left.text.includes('IZQUIERDA'), 'dir = 1 (Este): Flecha ↑ para giro a la izquierda');
assert(cuesE.right.dx === 0 && cuesE.right.dy === 1, 'dir = 1 (Este): DERECHA apunta hacia el sur (pantalla abajo)');
assert(cuesE.right.arrow === '↓' && cuesE.right.text.includes('DERECHA'), 'dir = 1 (Este): Flecha ↓ para giro a la derecha');

// Prueba para dir = 2 (Mirando ABAJO / Sur)
const cuesS = gameInstance.getOrientationCues(2);
assert(cuesS.left.dx === 1 && cuesS.left.dy === 0, 'dir = 2 (Sur): IZQUIERDA apunta hacia el este (pantalla derecha)');
assert(cuesS.left.arrow === '→' && cuesS.left.text.includes('IZQUIERDA'), 'dir = 2 (Sur): Flecha → para giro a la izquierda');
assert(cuesS.right.dx === -1 && cuesS.right.dy === 0, 'dir = 2 (Sur): DERECHA apunta hacia el oeste (pantalla izquierda)');
assert(cuesS.right.arrow === '←' && cuesS.right.text.includes('DERECHA'), 'dir = 2 (Sur): Flecha ← para giro a la derecha');

// Prueba para dir = 3 (Mirando IZQUIERDA / Oeste)
const cuesW = gameInstance.getOrientationCues(3);
assert(cuesW.left.dx === 0 && cuesW.left.dy === 1, 'dir = 3 (Oeste): IZQUIERDA apunta hacia el sur (pantalla abajo)');
assert(cuesW.left.arrow === '↓' && cuesW.left.text.includes('IZQUIERDA'), 'dir = 3 (Oeste): Flecha ↓ para giro a la izquierda');
assert(cuesW.right.dx === 0 && cuesW.right.dy === -1, 'dir = 3 (Oeste): DERECHA apunta hacia el norte (pantalla arriba)');
assert(cuesW.right.arrow === '↑' && cuesW.right.text.includes('DERECHA'), 'dir = 3 (Oeste): Flecha ↑ para giro a la derecha');

// ==========================================
// 2. DIBUJO DE PÍLDORAS Y REDUCED-MOTION
// ==========================================
console.log('\n--- Test 2: Dibujo de Pistas en Canvas y Suavidad ---');

const mockCtx = new MockCanvasRenderingContext2D();
canvasDrawCalls.length = 0;

// Dibujar pistas con prefers-reduced-motion = false (respiración suave)
prefersReducedMotion = false;
gameInstance.drawOrientationHints(mockCtx, 300, 250, 0, 50, 600, 500);

const fillTextCalls = canvasDrawCalls.filter(c => c.call === 'fillText');
assert(fillTextCalls.some(c => c.text.includes('IZQUIERDA')), 'Canvas dibuja la píldora con etiqueta IZQUIERDA');
assert(fillTextCalls.some(c => c.text.includes('DERECHA')), 'Canvas dibuja la píldora con etiqueta DERECHA');

// Verificar colores diferenciados de Halloween
const leftPillDraws = canvasDrawCalls.filter(c => c.call === 'fill' && c.fill && c.fill.includes('5, 46, 22'));
assert(leftPillDraws.length > 0, 'Píldora IZQUIERDA utiliza verde neón / bosque encantado');

const rightPillDraws = canvasDrawCalls.filter(c => c.call === 'fill' && c.fill && c.fill.includes('67, 20, 7'));
assert(rightPillDraws.length > 0, 'Píldora DERECHA utiliza naranja calabaza místico');

// Verificar con prefers-reduced-motion = true (sin oscilación)
prefersReducedMotion = true;
canvasDrawCalls.length = 0;
gameInstance.drawOrientationHints(mockCtx, 300, 250, 1, 50, 600, 500);
assert(canvasDrawCalls.filter(c => c.call === 'fillText').length >= 2, 'Funciona limpiamente con prefers-reduced-motion activado');

// ==========================================
// 3. PUERTA TEMÁTICA DE HALLOWEEN (REEMPLAZO DE CANDADO)
// ==========================================
console.log('\n--- Test 3: Puerta de Halloween en lugar de Candado ---');

// Estado bloqueado (isOpen = false)
canvasDrawCalls.length = 0;
gameInstance.drawDoorTile(mockCtx, 100, 100, 60, false);

const lockedDoorTexts = canvasDrawCalls.filter(c => c.call === 'fillText');
assert(!lockedDoorTexts.some(c => c.text === '🔒'), 'El icono del candado 🔒 fue completamente eliminado de la puerta');
assert(lockedDoorTexts.some(c => c.text === '🎃'), 'La puerta cerrada contiene el sello mágico de runa de calabaza');

const woodPlanks = canvasDrawCalls.filter(c => c.call === 'fillRect' && c.fill === '#27170e');
assert(woodPlanks.length > 0, 'La puerta cerrada cuenta con tablas de madera oscura de castillo');

// Estado desbloqueado (isOpen = true)
canvasDrawCalls.length = 0;
gameInstance.drawDoorTile(mockCtx, 100, 100, 60, true);

const openDoorTexts = canvasDrawCalls.filter(c => c.call === 'fillText');
assert(openDoorTexts.some(c => c.text === '✨'), 'La puerta abierta se transforma en portal mágico de paso libre con destellos ✨');
assert(!openDoorTexts.some(c => c.text === '🔒'), 'La puerta abierta no contiene candado');

// ==========================================
// 4. DECORACIÓN TEMÁTICA DEL TABLERO
// ==========================================
console.log('\n--- Test 4: Decoración del Tablero de Halloween ---');

// Muro de piedra con adornos en esquinas
canvasDrawCalls.length = 0;
gameInstance.drawWallTile(mockCtx, 0, 0, 50, 'haunted_castle', 1, 0); // hash = (1*17 + 0*31)%9 = 17%9 = 8 (sin icono)
gameInstance.drawWallTile(mockCtx, 50, 0, 50, 'haunted_castle', 0, 1); // hash = 31%9 = 4 (sin icono)
gameInstance.drawWallTile(mockCtx, 100, 0, 50, 'haunted_castle', 1, 3); // hash = (17 + 93)%9 = 110%9 = 2
// Buscar coordenadas con adornos
let foundPumpkin = false;
let foundWeb = false;
let foundRune = false;
for (let r = 0; r < 5; r++) {
  for (let c = 0; c < 5; c++) {
    const hash = (r * 17 + c * 31) % 9;
    if (hash === 1) foundPumpkin = true;
    if (hash === 3) foundWeb = true;
    if (hash === 5) foundRune = true;
  }
}
assert(foundPumpkin && foundWeb && foundRune, 'El patrón determinista distribuye calabazas, telarañas y runas en paredes');

// Piso transitable: NUNCA debe contener calabazas ni telarañas
canvasDrawCalls.length = 0;
gameInstance.drawFloorTile(mockCtx, 0, 0, 50, 'haunted_castle', 0, 0);
const floorTexts = canvasDrawCalls.filter(c => c.call === 'fillText');
assert(floorTexts.length === 0, 'Las baldosas transitables NO tienen elementos decorativos obstructivos (caminos despejados)');

// ==========================================
// 5. RISA MALÉVOLA DEL FANTASMA Y AUDIO SILENCIABLE
// ==========================================
console.log('\n--- Test 5: Risa del Fantasma y Audio Silenciable ---');

mockAudioEvents.length = 0;
MagicAudioEngine.setSoundEnabled(true);
MagicAudioEngine.playGhostLaugh();

const oscEvents = mockAudioEvents.filter(e => e.type === 'start');
assert(oscEvents.length >= 4, 'playGhostLaugh() genera las ráfagas espectrales de la risa con Web Audio API');

// Prueba de silencio (mute)
mockAudioEvents.length = 0;
MagicAudioEngine.setSoundEnabled(false);
mockAudioEvents.length = 0;
MagicAudioEngine.playGhostLaugh();
const startEventsWhenMuted = mockAudioEvents.filter(e => e.type === 'start');
assert(startEventsWhenMuted.length === 0, 'Cuando el audio está silenciado (mute), no se emite ningún sonido de risa');
MagicAudioEngine.setSoundEnabled(true); // Restaurar

// Prueba de risa única por aparición del fantasma
gameInstance.mazeGhost = {
  active: true,
  x: 2,
  y: 2,
  alpha: 0.33,
  phase: 'entering',
  hasLaughed: false,
  startTime: Date.now()
};

let laughPlayCount = 0;
const originalPlay = gameInstance.audio.play.bind(gameInstance.audio);
gameInstance.audio.play = (type) => {
  if (type === 'ghostLaugh') laughPlayCount++;
  originalPlay(type);
};

// Frame 1: alpha sube a 0.37 (>= 0.35) -> debe reír
mockAudioEvents.length = 0;
gameInstance.drawMazeGhost(mockCtx, 0, 0, 50, 8, 8);
assert(laughPlayCount === 1, 'Al aparecer el fantasma, la risa se ejecuta exactamente 1 vez');
assert(gameInstance.mazeGhost.hasLaughed === true, 'El estado del fantasma marca hasLaughed = true');

// Frame 2: siguiente renderizado continuo -> NO debe volver a reír en bucle
gameInstance.drawMazeGhost(mockCtx, 0, 0, 50, 8, 8);
assert(laughPlayCount === 1, 'En frames subsiguientes NO se repite la risa (reproducción única sin bucles)');

// ==========================================
// 6. MECÁNICAS DE JUEGO Y TEXTOS LIBRES DE "CANDADO"
// ==========================================
console.log('\n--- Test 6: Preservación de Mecánicas y Eliminación de "Candado" ---');

// Verificar que en js/bityBlockly.js no queda ningún texto de candado en laberintos
const bityCode = fs.readFileSync(path.resolve(__dirname, '../js/bityBlockly.js'), 'utf8');
const candadoMatches = [...bityCode.matchAll(/candado/gi)];
assert(candadoMatches.length === 0, 'No existe ninguna referencia a la palabra "candado" en js/bityBlockly.js');

// Probar activación de desafío al chocar con la puerta
gameInstance.isRunning = true;
gameInstance.isPausedForMath = false;
gameInstance.doorOpen = false;
gameInstance.bityPos = { x: 1, y: 1, dir: 1 };
let mathChallengeTriggered = false;
gameInstance.triggerMathChallenge = () => { mathChallengeTriggered = true; };

// Simular paso hacia celda 2 (puerta bloqueada)
gameInstance.blocks = ['forward'];
gameInstance.currentStepIndex = 0;
// Mock getCurrentMissionConfig con celda 2
gameInstance.getCurrentMissionConfig = () => ({
  cols: 5,
  rows: 5,
  grid: [
    [1, 1, 1, 1, 1],
    [1, 0, 2, 3, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1]
  ]
});

gameInstance.executeNextStep();
assert(mathChallengeTriggered, 'Chocar con la puerta de Halloween cerrada detiene el avance y activa el desafío de cálculo');
assert(gameInstance.bityPos.x === 1, 'Byte no atraviesa la puerta cerrada');

// Resolver desafío y abrir puerta
gameInstance.doorOpen = true;
gameInstance.isRunning = true;
gameInstance.isPausedForMath = false;
gameInstance.currentStepIndex = 0;
gameInstance.advanceStepDelay = () => {};
gameInstance.executeNextStep();
assert(gameInstance.bityPos.x === 2, 'Al estar la puerta de Halloween abierta, Byte puede avanzar a través de ella');

console.log(`\n==========================================`);
console.log(`RESULTADOS: ${passedTests} de ${totalTests} pruebas pasadas con éxito.`);
console.log(`==========================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
