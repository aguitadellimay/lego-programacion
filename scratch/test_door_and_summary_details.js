// scratch/test_door_and_summary_details.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8096;
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
    '--remote-debugging-port=9228',
    `http://localhost:${PORT}/index.html`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const targetsRes = await fetch('http://localhost:9228/json');
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
              window.bityBlocklyGame = new window.BityBlocklyGame({ grade: 1 });
            }
            const game = window.bityBlocklyGame;
            game.selectGrade(1);
            game.loadLevel(1);

            // Trigger door (3, 1)
            game.triggerMathChallengeForDoor(3, 1);
            await new Promise(r => setTimeout(r, 200));

            const modal = document.getElementById('bityblockly-math-modal');
            const modalActive = modal.classList.contains('active');
            const heartsStart = document.getElementById('math-modal-lives-hearts').textContent;
            const eqStart = document.getElementById('bityblockly-math-equation').textContent;
            const qObjStart = game.doorQuestions['3,1'];

            // Click WRONG option
            const optBtns = Array.from(document.querySelectorAll('#bityblockly-math-options .btn-math-option'));
            const wrongBtn = optBtns.find(b => parseInt(b.textContent) !== qObjStart.correctAnswer);
            wrongBtn.click();

            const livesAfterError = game.lives;
            const heartsAfterError = document.getElementById('math-modal-lives-hearts').textContent;

            // Wait 1.3s for new question to be assigned and rendered
            await new Promise(r => setTimeout(r, 1400));
            const eqAfterError = document.getElementById('bityblockly-math-equation').textContent;
            const qObjAfter = game.doorQuestions['3,1'];

            // Click CORRECT option
            const newOptBtns = Array.from(document.querySelectorAll('#bityblockly-math-options .btn-math-option'));
            const correctBtn = newOptBtns.find(b => parseInt(b.textContent) === qObjAfter.correctAnswer);
            correctBtn.click();

            // Wait 1.3s for door to open and modal to close
            await new Promise(r => setTimeout(r, 1400));
            const door31Open = game.isDoorOpen(3, 1);
            const modalClosed = !modal.classList.contains('active');

            // Now test final challenge (level 6)
            game.loadLevel(6);
            await new Promise(r => setTimeout(r, 200));

            const conceptModal = document.getElementById('bityblockly-instruction-concept-modal');
            const conceptActive = conceptModal.classList.contains('active');
            const conceptTitle = conceptModal.querySelector('.concept-modal-title').textContent;

            // Close concept modal via button
            document.getElementById('btn-bityblockly-start-instruction-challenge').click();
            await new Promise(r => setTimeout(r, 200));
            const conceptClosed = !conceptModal.classList.contains('active');

            // Simulate victory in final challenge
            game.instructionsExecuted = 9;
            game.movesExecuted = 8;
            game.turnsExecuted = 1;
            game.triggerVictory();

            await new Promise(r => setTimeout(r, 300));
            const summaryModal = document.getElementById('bityblockly-instruction-summary-modal');
            const summaryActive = summaryModal.classList.contains('active');
            const summaryTotal = document.getElementById('bityblockly-summary-total-count').textContent;
            const summaryMoves = document.getElementById('bityblockly-summary-moves-count').textContent;
            const summaryTurns = document.getElementById('bityblockly-summary-turns-count').textContent;
            const summaryRoute = document.getElementById('bityblockly-summary-route-name').textContent;

            resolve({
              doorTest: {
                modalActive,
                heartsStart,
                eqStart,
                livesAfterError,
                heartsAfterError,
                eqAfterError,
                questionChanged: (qObjStart.id !== qObjAfter.id),
                door31Open,
                modalClosed
              },
              conceptTest: {
                conceptActive,
                conceptTitle,
                conceptClosed
              },
              summaryTest: {
                summaryActive,
                summaryTotal,
                summaryMoves,
                summaryTurns,
                summaryRoute
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

    console.log('Detailed In-Browser Test Results:\n', JSON.stringify(testRes.result.value, null, 2));

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
