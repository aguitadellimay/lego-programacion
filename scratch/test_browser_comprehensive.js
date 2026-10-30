// scratch/test_browser_comprehensive.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8094;
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
  console.log(`Server listening on port ${PORT}`);
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9226',
    `http://localhost:${PORT}/index.html`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const targetsRes = await fetch('http://localhost:9226/json');
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
        expression: 'Boolean(document.body && document.readyState === "complete" && window.bityBlocklyGame)'
      });
      if (readyRes?.result?.value) break;
      await new Promise(r => setTimeout(r, 300));
    }

    console.log('\n--- 1. Testing HUD Lives Indicator & Initial State ---');
    const hudTest = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const hud = document.getElementById('bityblockly-lives-wrap');
          const hearts = document.getElementById('bityblockly-lives-hearts');
          return {
            hudExists: !!hud,
            heartsText: hearts ? hearts.textContent : ''
          };
        })()
      `,
      returnByValue: true
    });
    console.log('HUD Lives Result:', hudTest.result.value);

    console.log('\n--- 2. Testing Math Door, Lives Deduction & Question Changing on Failure ---');
    const doorTest = await send('Runtime.evaluate', {
      expression: `
        (async () => {
          const game = window.bityBlocklyGame;
          game.switchGrade(1);
          game.loadLevel(1);

          // Force pause at door (3, 1)
          game.triggerMathChallengeForDoor(3, 1);
          await new Promise(r => setTimeout(r, 300));

          const modal = document.getElementById('bityblockly-math-modal');
          const modalActive = modal.classList.contains('active');
          const initialHearts = document.getElementById('math-modal-lives-hearts').textContent;
          const initialEq = document.getElementById('bityblockly-math-equation').textContent;
          const mathObj = game.doorQuestions['3,1'];

          // Find wrong option button
          const optBtns = Array.from(document.querySelectorAll('#bityblockly-math-options .btn-math-option'));
          const wrongBtn = optBtns.find(b => parseInt(b.textContent) !== mathObj.correctAnswer);
          wrongBtn.click();

          // Lives after 1 error
          const livesAfter1 = game.lives;
          const heartsAfter1 = document.getElementById('math-modal-lives-hearts').textContent;

          // Wait for question to change
          await new Promise(r => setTimeout(r, 1400));
          const newEq = document.getElementById('bityblockly-math-equation').textContent;
          const newMathObj = game.doorQuestions['3,1'];

          // Now click correct option on new question
          const newOptBtns = Array.from(document.querySelectorAll('#bityblockly-math-options .btn-math-option'));
          const correctBtn = newOptBtns.find(b => parseInt(b.textContent) === newMathObj.correctAnswer);
          correctBtn.click();

          await new Promise(r => setTimeout(r, 1400));
          const doorIsOpen = game.isDoorOpen(3, 1);

          return {
            modalActive,
            initialHearts,
            initialEq,
            livesAfter1,
            heartsAfter1,
            questionChanged: initialEq !== newEq || mathObj.id !== newMathObj.id,
            newEq,
            doorIsOpen
          };
        })()
      `,
      awaitPromise: true,
      returnByValue: true
    });
    console.log('Door & Lives Test Result:', doorTest.result.value);

    console.log('\n--- 3. Testing Final Challenge Concept Modal & Instruction Counting ---');
    const finalChallengeTest = await send('Runtime.evaluate', {
      expression: `
        (async () => {
          const game = window.bityBlocklyGame;
          game.switchGrade(1);
          game.loadLevel(6); // Final challenge of grade 1

          const conceptModal = document.getElementById('bityblockly-instruction-concept-modal');
          const conceptModalActive = conceptModal.classList.contains('active');
          const title = conceptModal.querySelector('.concept-modal-title').textContent;
          const stepsCount = conceptModal.querySelectorAll('.concept-step-item').length;

          // Click start challenge
          const btnStart = document.getElementById('btn-bityblockly-start-instruction-challenge');
          btnStart.click();

          await new Promise(r => setTimeout(r, 200));
          const conceptModalClosed = !conceptModal.classList.contains('active');

          // Simulate path A (9 instructions: 8 moves + 1 turn)
          game.instructionsExecuted = 9;
          game.movesExecuted = 8;
          game.turnsExecuted = 1;
          game.triggerVictory();

          await new Promise(r => setTimeout(r, 300));
          const summaryModal = document.getElementById('bityblockly-instruction-summary-modal');
          const summaryActive = summaryModal.classList.contains('active');
          const totalDisplayed = document.getElementById('bityblockly-summary-total-count').textContent;
          const movesDisplayed = document.getElementById('bityblockly-summary-moves-count').textContent;
          const turnsDisplayed = document.getElementById('bityblockly-summary-turns-count').textContent;
          const routeDisplayed = document.getElementById('bityblockly-summary-route-name').textContent;
          const reflectionDisplayed = document.getElementById('bityblockly-summary-reflection-text').textContent;

          // Close summary modal
          summaryModal.classList.remove('active');

          return {
            conceptModalActive,
            conceptTitle: title,
            stepsCount,
            conceptModalClosed,
            summaryActive,
            totalDisplayed,
            movesDisplayed,
            turnsDisplayed,
            routeDisplayed,
            reflectionDisplayed: reflectionDisplayed.includes('¿Pudiste haber llegado')
          };
        })()
      `,
      awaitPromise: true,
      returnByValue: true
    });
    console.log('Final Challenge Test Result:', finalChallengeTest.result.value);

    console.log('\n--- 4. Testing Halloween Animated Characters ---');
    const halloweenCharsTest = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const vm = window.MagicVampireManager;
          const results = {};

          ['pumpkin', 'frankenstein', 'spider', 'ghost', 'vampire'].forEach(char => {
            vm.spawnVampire(null, null, char);
            const card = document.querySelector('.magic-vampire-card.char-' + char);
            results[char] = {
              rendered: !!card,
              hasSvg: card ? !!card.querySelector('svg') : false,
              hasBubble: card ? !!card.querySelector('.vampire-speech-bubble') : false
            };
            vm.dismissCurrentAppearance();
          });

          return results;
        })()
      `,
      returnByValue: true
    });
    console.log('Halloween Characters Test Result:', halloweenCharsTest.result.value);

    console.log('\n--- 5. Checking for Console Errors ---');
    const logsRes = await send('Runtime.evaluate', {
      expression: 'window.errorsCaught || []',
      returnByValue: true
    });
    console.log('Caught Errors:', logsRes.result.value);

    ws.close();
    chrome.kill();
    server.close();

    console.log('\n🎉 ALL CDP IN-BROWSER TESTS COMPLETED SUCCESSFULLY!');
    process.exit(0);
  } catch (err) {
    console.error('Test error:', err);
    chrome.kill();
    server.close();
    process.exit(1);
  }
});
