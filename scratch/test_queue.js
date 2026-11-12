const fs = require('fs');

console.log('Testing queue and movement logic...');

let isMoving = false;
let inputQueue = [];
let bityPos = { x: 1, y: 1 };
let program = [];

function handleDirectionInput(dir) {
  inputQueue.push(dir);
  processQueue();
}

function processQueue() {
  if (isMoving || inputQueue.length === 0) return;
  const dir = inputQueue.shift();
  isMoving = true;

  let nx = bityPos.x;
  let ny = bityPos.y;
  if (dir === 'right') nx++;
  if (dir === 'down') ny++;

  bityPos = { x: nx, y: ny };
  program.push(dir);
  console.log(`Moved ${dir} -> new pos:`, bityPos, 'queue len:', inputQueue.length);

  setTimeout(() => {
    isMoving = false;
    processQueue();
  }, 100);
}

// Push 2 moves immediately
handleDirectionInput('right');
handleDirectionInput('down');

setTimeout(() => {
  console.log('After 250ms, final pos:', bityPos, 'program:', program);
}, 250);
