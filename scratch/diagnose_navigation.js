const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8130;
const CDP_PORT = 9270;
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
  console.log(`Server running on http://localhost:${PORT}`);
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

    // Listen to console logs and errors
    await send('Runtime.enable');
    const logs = [];
    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.method === 'Runtime.consoleAPICalled') {
        logs.push({ type: data.params.type, args: data.params.args });
      }
      if (data.method === 'Runtime.exceptionThrown') {
        logs.push({ type: 'EXCEPTION', details: data.params.exceptionDetails });
      }
    });

    for (let i = 0; i < 25; i++) {
      const readyRes = await send('Runtime.evaluate', {
        expression: 'Boolean(document.body && document.readyState === "complete" && window.codingManager)'
      });
      if (readyRes?.result?.value) break;
      await new Promise(r => setTimeout(r, 200));
    }

    console.log('Testing full user click flow from Home -> Programación -> Grade 1 -> Algoritmos...');

    const clickFlowResult = await send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `
        new Promise(async (resolve) => {
          const res = { steps: [] };

          // Step 1: Check initial screen
          const getActiveScreen = () => document.querySelector('.screen.active')?.id;
          res.steps.push({ step: 'initial', activeScreen: getActiveScreen() });

          // Step 2: Click "¡Aprender a Programar!" (btn-home-coding)
          const btnCoding = document.getElementById('btn-home-coding');
          btnCoding.click();
          await new Promise(r => setTimeout(r, 100));
          res.steps.push({ step: 'click_btn_home_coding', activeScreen: getActiveScreen() });

          // Step 3: Click Grade 1 card (.coding-g-1)
          const g1Card = document.querySelector('.coding-g-1');
          g1Card.click();
          await new Promise(r => setTimeout(r, 100));
          res.steps.push({ step: 'click_g1_card', activeScreen: getActiveScreen() });

          // Step 4: In syllabus, check topic-card-algorithms and btn-start-algorithms-topic
          const algCard = document.getElementById('topic-card-algorithms');
          const btnStartAlg = document.getElementById('btn-start-algorithms-topic');

          res.algCardExists = !!algCard;
          res.btnStartAlgExists = !!btnStartAlg;
          res.algCardDisplay = algCard ? getComputedStyle(algCard).display : null;
          res.algCardClass = algCard ? algCard.className : null;

          // Step 5: Click on topic-card-algorithms
          algCard.click();
          await new Promise(r => setTimeout(r, 200));
          res.steps.push({ step: 'click_alg_card', activeScreen: getActiveScreen() });

          // Step 6: If not active, try clicking btnStartAlg
          if (getActiveScreen() !== 'screen-coding-algorithms' && btnStartAlg) {
            btnStartAlg.click();
            await new Promise(r => setTimeout(r, 200));
            res.steps.push({ step: 'click_btn_start_alg', activeScreen: getActiveScreen() });
          }

          // Step 7: Check screen-coding-algorithms content
          const algScreen = document.getElementById('screen-coding-algorithms');
          res.algScreenIsActive = algScreen ? algScreen.classList.contains('active') : false;
          res.algMountHasContent = !!document.getElementById('algorithms-content-mount')?.children?.length;

          // Step 8: Test Back button
          const btnBack = document.getElementById('btn-alg-back-syllabus');
          res.hasBackButton = !!btnBack;
          if (btnBack) {
            btnBack.click();
            await new Promise(r => setTimeout(r, 200));
            res.steps.push({ step: 'click_back_to_syllabus', activeScreen: getActiveScreen() });
          }

          resolve(res);
        })
      `
    });

    console.log('Click Flow Result:\n', JSON.stringify(clickFlowResult.result.value, null, 2));
    console.log('Console Logs / Exceptions:\n', JSON.stringify(logs, null, 2));

  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
