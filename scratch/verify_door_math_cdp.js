const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8117;
const CDP_PORT = 9257;
const ROOT = path.resolve(__dirname, '..');

const server = http.createServer((req, res) => {
  let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    if (ext === '.js') contentType = 'application/javascript';
    else if (ext === '.css') contentType = 'text/css';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.svg') contentType = 'image/svg+xml';
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

  try {
    const targetsRes = await fetch(`http://localhost:${CDP_PORT}/json`);
    const targets = await targetsRes.json();
    const pageTarget = targets.find(t => t.type === 'page');

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    let id = 1;
    const send = (method, params = {}) => {
      return new Promise((resolve) => {
        const msgId = id++;
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === msgId) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    };

    await new Promise(r => ws.addEventListener('open', r));

    for (let i = 0; i < 25; i++) {
      const readyRes = await send('Runtime.evaluate', {
        expression: 'Boolean(document.body && document.readyState === "complete" && window.BityBlocklyGame)'
      });
      if (readyRes?.result?.value) break;
      await new Promise(r => setTimeout(r, 250));
    }

    const evalResult = await send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `
        new Promise(async (resolve) => {
          const game = window.bityBlocklyGame || new window.BityBlocklyGame({ grade: 2 });
          game.selectGrade(2);
          game.loadLevel(4);

          const conceptModal = document.getElementById('bityblockly-instruction-concept-modal');
          if (conceptModal) conceptModal.classList.remove('active');

          // Trigger door interaction at (4,1)
          game.interactWithDoor(4, 1);
          await new Promise(r => setTimeout(r, 150));

          const doorModal = document.getElementById('bityblockly-math-door-modal');
          const isDoorModalOpen = doorModal.classList.contains('active');
          const qText = document.getElementById('bityblockly-math-question-text')?.textContent.trim();
          const initialLives = game.lives;

          // Answer WRONGLY
          const q = game.doorQuestions['4,1'];
          const wrongOption = q.options.find(opt => opt !== q.correctAnswer);
          const optionBtns = document.querySelectorAll('.math-door-option-btn');
          let wrongBtn = null;
          optionBtns.forEach(btn => {
            if (btn.textContent.trim() === String(wrongOption)) wrongBtn = btn;
          });

          if (wrongBtn) wrongBtn.click();
          await new Promise(r => setTimeout(r, 250));

          const livesAfterWrong = game.lives;
          const newQ = game.doorQuestions['4,1'];
          const questionChanged = (newQ.id !== q.id || newQ.question !== q.question);

          // Answer CORRECTLY
          const correctOption = newQ.correctAnswer;
          const optionBtns2 = document.querySelectorAll('.math-door-option-btn');
          let correctBtn = null;
          optionBtns2.forEach(btn => {
            if (btn.textContent.trim() === String(correctOption)) correctBtn = btn;
          });

          if (correctBtn) correctBtn.click();
          await new Promise(r => setTimeout(r, 450));

          const doorOpenAfterCorrect = game.isDoorOpen(4, 1);
          const doorModalClosed = !doorModal.classList.contains('active');

          resolve({
            isDoorModalOpen,
            qText,
            initialLives,
            livesAfterWrong,
            questionChanged,
            doorOpenAfterCorrect,
            doorModalClosed
          });
        })
      `
    });

    console.log('Door interaction test results:', evalResult.result.value);
  } catch (e) {
    console.error('Error testing door:', e);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
