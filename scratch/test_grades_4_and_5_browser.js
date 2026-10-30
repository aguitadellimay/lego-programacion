// scratch/test_grades_4_and_5_browser.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8097;
const ROOT = path.resolve(__dirname, '..');

const server = http.createServer((req, res) => {
  let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
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
    '--remote-debugging-port=9229',
    `http://localhost:${PORT}/index.html`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const targetsRes = await fetch('http://localhost:9229/json');
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

    for (let i = 0; i < 20; i++) {
      const readyRes = await send('Runtime.evaluate', {
        expression: 'Boolean(document.body && document.readyState === "complete" && window.BityBlocklyGame)'
      });
      if (readyRes?.result?.value) break;
      await new Promise(r => setTimeout(r, 300));
    }

    const testRes = await send('Runtime.evaluate', {
      expression: `
        new Promise(async (resolve) => {
          try {
            if (!window.bityBlocklyGame) {
              window.bityBlocklyGame = new window.BityBlocklyGame({ grade: 4 });
            }
            const game = window.bityBlocklyGame;

            // 1. Grade 4 test
            game.selectGrade(4);
            game.loadLevel(1);
            game.triggerMathChallengeForDoor(2, 2);
            await new Promise(r => setTimeout(r, 200));

            const g4Eq = document.getElementById('bityblockly-math-equation').textContent;
            const g4Q = game.doorQuestions['2,2'];
            const g4HasMultOrMissing = g4Q.type === 'multiplication' || g4Q.type === 'missing_factor';
            document.getElementById('bityblockly-math-modal').classList.remove('active');

            // Grade 4 final challenge summary test
            game.loadLevel(7);
            document.getElementById('btn-bityblockly-start-instruction-challenge')?.click();
            await new Promise(r => setTimeout(r, 100));

            game.instructionsExecuted = 16;
            game.movesExecuted = 13;
            game.turnsExecuted = 3;
            game.triggerVictory();
            await new Promise(r => setTimeout(r, 200));

            const g4SummaryRoute = document.getElementById('bityblockly-summary-route-name').textContent;
            document.getElementById('bityblockly-instruction-summary-modal').classList.remove('active');

            // 2. Grade 5 test
            game.selectGrade(5);
            game.loadLevel(1);
            game.triggerMathChallengeForDoor(4, 1);
            await new Promise(r => setTimeout(r, 200));

            const g5Eq = document.getElementById('bityblockly-math-equation').textContent;
            const g5Q = game.doorQuestions['4,1'];
            const g5HasDivOrMultOrMissing = ['division', 'multiplication', 'missing_factor'].includes(g5Q.type);
            document.getElementById('bityblockly-math-modal').classList.remove('active');

            // Grade 5 final challenge summary test
            game.loadLevel(8);
            document.getElementById('btn-bityblockly-start-instruction-challenge')?.click();
            await new Promise(r => setTimeout(r, 100));

            game.instructionsExecuted = 20;
            game.movesExecuted = 15;
            game.turnsExecuted = 5;
            game.triggerVictory();
            await new Promise(r => setTimeout(r, 200));

            const g5SummaryRoute = document.getElementById('bityblockly-summary-route-name').textContent;
            document.getElementById('bityblockly-instruction-summary-modal').classList.remove('active');

            resolve({
              grade4: {
                questionEq: g4Eq,
                questionType: g4Q.type,
                typeValid: g4HasMultOrMissing,
                summaryRoute: g4SummaryRoute
              },
              grade5: {
                questionEq: g5Eq,
                questionType: g5Q.type,
                typeValid: g5HasDivOrMultOrMissing,
                summaryRoute: g5SummaryRoute
              }
            });
          } catch (e) {
            resolve({ error: e.toString(), stack: e.stack });
          }
        })
      `,
      awaitPromise: true,
      returnByValue: true
    });

    console.log('Grade 4 & 5 Test Results:\n', JSON.stringify(testRes.result.value, null, 2));

    ws.close();
    chrome.kill();
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('Script Error:', err);
    chrome.kill();
    server.close();
    process.exit(1);
  }
});
