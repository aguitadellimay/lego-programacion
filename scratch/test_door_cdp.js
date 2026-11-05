const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8121;
const CDP_PORT = 9261;
const ROOT = path.resolve(__dirname, '..');

const server = http.createServer((req, res) => {
  let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    if (ext === '.js') contentType = 'application/javascript';
    else if (ext === '.css') contentType = 'text/css';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, async () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    `http://localhost:${PORT}/index.html`
  ]);

  await new Promise(r => setTimeout(r, 2000));
  const targetsRes = await fetch(`http://localhost:${CDP_PORT}/json`);
  const targets = await targetsRes.json();
  const pageTarget = targets.find(t => t.type === 'page');

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const send = (method, params = {}) => new Promise(resolve => {
    const msgId = id++;
    const handler = (e) => {
      const d = JSON.parse(e.data);
      if (d.id === msgId) {
        ws.removeEventListener('message', handler);
        resolve(d.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  await new Promise(r => ws.addEventListener('open', r));

  const evaluate = async (expr) => {
    const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return res.result ? res.result.value : null;
  };

  const doorTest = await evaluate(`
    (async () => {
      window.codingManager.startBityBlockly(1);
      const bb = window.bityBlockly;
      bb.selectGrade(1);
      bb.loadLevel(1);
      bb.clearBlocks();

      bb.blocks = ['right', 'right'];
      bb.currentStepIndex = 0;
      bb.isRunning = true;

      // Step 0: move right to (2, 1)
      bb.executeNextStep();
      const pos1 = { ...bb.bityPos };

      // Step 1: move right towards door at (3, 1)
      bb.currentStepIndex = 1;
      bb.executeNextStep();

      const modal = document.getElementById('bityblockly-math-modal');
      const isModalActive = modal ? modal.classList.contains('active') : false;
      const math = bb.doorQuestions['3,1'];
      const questionText = document.getElementById('bityblockly-math-equation')?.textContent || '';

      // Click correct option using math.correctAnswer
      const buttons = Array.from(document.querySelectorAll('.btn-math-option'));
      const correctBtn = buttons.find(b => parseInt(b.textContent) === math.correctAnswer);
      if (correctBtn) correctBtn.click();

      // Wait 1.5s for door to open and bity to advance
      await new Promise(r => setTimeout(r, 1500));

      const posAfterDoor = { ...bb.bityPos };
      const isDoorOpened = bb.isDoorOpen(3, 1);

      bb.stopProgram();

      return {
        pos1,
        isModalActive,
        questionText,
        mathCorrectAnswer: math ? math.correctAnswer : null,
        correctBtnFound: !!correctBtn,
        isDoorOpened,
        posAfterDoor
      };
    })()
  `);

  console.log('Door Test Result:', JSON.stringify(doorTest, null, 2));

  if (doorTest.isModalActive && doorTest.correctBtnFound && doorTest.isDoorOpened &&
      doorTest.posAfterDoor.x === 3 && doorTest.posAfterDoor.y === 1) {
    console.log('✅ PASSED: Math door triggers on arrival, presents math challenge, and passes through upon correct solution!');
  } else {
    console.error('❌ FAILED: Door flow mismatch!');
  }

  chrome.kill();
  server.close();
  process.exit(0);
});
