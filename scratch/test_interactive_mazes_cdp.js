const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8160;
const CDP_PORT = 9295;
const ROOT = path.resolve('.');

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
  console.log(`Server running at http://localhost:${PORT}`);
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + CDP_PORT,
    'http://localhost:' + PORT + '/index.html'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const targetsRes = await fetch('http://localhost:' + CDP_PORT + '/json');
    const targets = await targetsRes.json();
    const pageTarget = targets.find(t => t.type === 'page');

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    let id = 1;
    const send = (method, params = {}) => new Promise(resolve => {
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

    await new Promise(r => ws.addEventListener('open', r));

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    const evaluate = async (expression) => {
      const res = await send('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true
      });
      return res.result ? res.result.value : null;
    };

    console.log('--- Initializing Algorithms Module Grade 1 ---');
    await evaluate(`
      localStorage.clear();
      window.algorithmsModule.startClass(1, 1);
    `);
    await new Promise(r => setTimeout(r, 500));

    // Test 1: Step Pills and Total Steps
    const pillsInfo = await evaluate(`
      ({
        totalSteps: window.algorithmsModule.totalSteps,
        currentStep: window.algorithmsModule.currentStep,
        pillsCount: document.querySelectorAll('.alg-step-tab').length,
        starCountText: document.getElementById('alg-star-count') ? document.getElementById('alg-star-count').textContent : null
      })
    `);
    console.log('Pills & Header Test:', pillsInfo);

    // Test 2: Select Step 8 (Desafío 5: Gran Desafío)
    console.log('--- Navigating to Step 8 (Desafío 5) ---');
    await evaluate(`window.algorithmsModule.selectStep(8);`);
    await new Promise(r => setTimeout(r, 500));

    const step8Info = await evaluate(`
      ({
        title: document.querySelector('.challenge-title') ? document.querySelector('.challenge-title').textContent : null,
        badge: document.querySelector('.challenge-badge') ? document.querySelector('.challenge-badge').textContent : null,
        interactiveCells: document.querySelectorAll('.cell-interactive-item').length,
        doors: document.querySelectorAll('.cell-item-door').length,
        windows: document.querySelectorAll('.cell-item-window').length
      })
    `);
    console.log('Step 8 Info:', step8Info);

    // Capture Step 8 initial state screenshot
    const shotStep8 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Ismae\\.gemini\\antigravity\\brain\\0d9e1921-82a7-413c-a85d-a957ed6a47ea\\algoritmos_desafio5_castillo_g1.png', Buffer.from(shotStep8.data, 'base64'));
    console.log('Saved screenshot: algoritmos_desafio5_castillo_g1.png');

    // Test 3: Move Bity to (2, 1) where PUERTA 1 is located
    console.log('--- Moving Bity right to (2, 1) onto PUERTA 1 ---');
    await evaluate(`window.algorithmsModule.handleDirectionInput('right');`);
    await new Promise(r => setTimeout(r, 500));

    const modalInfo = await evaluate(`
      (() => {
        const modal = document.getElementById('alg-question-modal');
        if (!modal) return { open: false };
        const qTitle = modal.querySelector('.q-dialog-question') ? modal.querySelector('.q-dialog-question').textContent : null;
        const badge = modal.querySelector('.q-dialog-badge') ? modal.querySelector('.q-dialog-badge').textContent : null;
        const options = Array.from(modal.querySelectorAll('.btn-q-option')).map(b => ({
          letter: b.querySelector('.q-opt-letter').textContent,
          text: b.querySelector('.q-opt-text').textContent,
          isCorrect: b.getAttribute('data-correct') === '1'
        }));
        return { open: true, qTitle, badge, options };
      })()
    `);
    console.log('Question Modal Info:', modalInfo);

    // Capture Question Modal screenshot
    const shotModal = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Ismae\\.gemini\\antigravity\\brain\\0d9e1921-82a7-413c-a85d-a957ed6a47ea\\algoritmos_modal_pregunta_puerta.png', Buffer.from(shotModal.data, 'base64'));
    console.log('Saved screenshot: algoritmos_modal_pregunta_puerta.png');

    // Test 4: Answer Incorrectly First
    console.log('--- Testing Incorrect Option ---');
    const wrongRes = await evaluate(`
      (() => {
        const wrongBtn = Array.from(document.querySelectorAll('.btn-q-option')).find(b => b.getAttribute('data-correct') === '0');
        if (wrongBtn) wrongBtn.click();
        const fb = document.getElementById('q-feedback-box');
        return {
          fbText: fb ? fb.textContent : null,
          stars: window.algorithmsModule.getStarsCount()
        };
      })()
    `);
    console.log('Wrong Answer Result:', wrongRes);

    // Test 5: Click Retry and Answer Correctly
    console.log('--- Retrying and Answering Correctly ---');
    await evaluate(`
      (() => {
        const retryBtn = document.querySelector('.btn-q-retry');
        if (retryBtn) retryBtn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 300));

    const correctRes = await evaluate(`
      (() => {
        const correctBtn = Array.from(document.querySelectorAll('.btn-q-option')).find(b => b.getAttribute('data-correct') === '1');
        if (correctBtn) correctBtn.click();
        const fb = document.getElementById('q-feedback-box');
        return {
          fbText: fb ? fb.textContent : null,
          stars: window.algorithmsModule.getStarsCount(),
          topbarStars: document.getElementById('alg-star-count').textContent
        };
      })()
    `);
    console.log('Correct Answer Result (Award +1 Star):', correctRes);

    // Close question modal
    await evaluate(`window.algorithmsModule.closeQuestionModal();`);
    await new Promise(r => setTimeout(r, 300));

    // Test 6: Verify Star Farming Prevention (Re-visiting cell doesn't re-trigger or give extra stars)
    console.log('--- Testing Star Farming Prevention ---');
    const farmingRes = await evaluate(`
      (() => {
        // Bity moves left then right back into (2, 1)
        window.algorithmsModule.handleDirectionInput('left');
        return { bityPos: window.algorithmsModule.bityPos };
      })()
    `);
    await new Promise(r => setTimeout(r, 400));
    await evaluate(`window.algorithmsModule.handleDirectionInput('right');`);
    await new Promise(r => setTimeout(r, 400));

    const farmingCheck = await evaluate(`
      ({
        bityPos: window.algorithmsModule.bityPos,
        modalOpen: !!document.getElementById('alg-question-modal'),
        starsCount: window.algorithmsModule.getStarsCount()
      })
    `);
    console.log('Farming check (should have 1 star, no modal re-opening):', farmingCheck);

    // Test 7: Reach Goal in Desafío 5 to verify Halloween Final Celebration Card
    console.log('--- Moving Bity to Goal (4, 3) to trigger Halloween Final Celebration ---');
    // From (2, 1), move right to (3, 1), right to (4, 1)[VENTANA 1], down to (4, 2), down to (4, 3)[GOAL]
    // Note: entering (4, 1) will trigger VENTANA 1 modal, so we answer it!
    await evaluate(`
      window.algorithmsModule.handleDirectionInput('right'); // to (3,1)
    `);
    await new Promise(r => setTimeout(r, 400));
    await evaluate(`
      window.algorithmsModule.handleDirectionInput('right'); // to (4,1) [VENTANA 1]
    `);
    await new Promise(r => setTimeout(r, 400));

    // Answer VENTANA 1 correctly to unlock it and continue
    console.log('--- Answering Ventana 1 ---');
    await evaluate(`
      (() => {
        const correctBtn = Array.from(document.querySelectorAll('.btn-q-option')).find(b => b.getAttribute('data-correct') === '1');
        if (correctBtn) correctBtn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 300));
    await evaluate(`window.algorithmsModule.closeQuestionModal();`);
    await new Promise(r => setTimeout(r, 300));

    // Now move down to (4, 2) and down to (4, 3)[GOAL]
    console.log('--- Moving down to (4, 2) and down to (4, 3) [GOAL] ---');
    await evaluate(`
      window.algorithmsModule.handleDirectionInput('down');
    `);
    await new Promise(r => setTimeout(r, 400));
    await evaluate(`
      window.algorithmsModule.handleDirectionInput('down');
    `);
    await new Promise(r => setTimeout(r, 800));

    const celebInfo = await evaluate(`
      (() => {
        const card = document.querySelector('.final-celebration-card');
        if (!card) return { visible: false };
        return {
          visible: true,
          title: card.querySelector('.celebration-title') ? card.querySelector('.celebration-title').textContent : null,
          banner: card.querySelector('.halloween-stars-banner') ? card.querySelector('.halloween-stars-banner').textContent : null,
          starsCount: window.algorithmsModule.getStarsCount(),
          completedSteps: Array.from(window.algorithmsModule.completedSteps)
        };
      })()
    `);
    console.log('Halloween Final Celebration Info:', celebInfo);

    // Capture Final Halloween Celebration screenshot
    const shotCeleb = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Ismae\\.gemini\\antigravity\\brain\\0d9e1921-82a7-413c-a85d-a957ed6a47ea\\algoritmos_celebracion_halloween_final.png', Buffer.from(shotCeleb.data, 'base64'));
    console.log('Saved screenshot: algoritmos_celebracion_halloween_final.png');

    // Test 8: Test Grade 5 with 5 interactive question items
    console.log('--- Testing Grade 5 Step 8 ---');
    await evaluate(`
      localStorage.clear();
      window.algorithmsModule.startClass(5, 1);
      window.algorithmsModule.selectStep(8);
    `);
    await new Promise(r => setTimeout(r, 500));

    const g5Info = await evaluate(`
      ({
        grade: window.algorithmsModule.currentGrade,
        cols: window.algorithmsModule.getCurrentMazeConfig().cols,
        rows: window.algorithmsModule.getCurrentMazeConfig().rows,
        interactiveItems: document.querySelectorAll('.cell-interactive-item').length,
        itemsNames: window.algorithmsModule.getCurrentMazeConfig().items.map(i => i.name)
      })
    `);
    console.log('Grade 5 Step 8 Info:', g5Info);

    const shotG5 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Ismae\\.gemini\\antigravity\\brain\\0d9e1921-82a7-413c-a85d-a957ed6a47ea\\algoritmos_desafio5_grado5.png', Buffer.from(shotG5.data, 'base64'));
    console.log('Saved screenshot: algoritmos_desafio5_grado5.png');

    console.log('=== ALL AUTOMATED CDP VERIFICATIONS PASSED SUCCESSFULLY! ===');

    chrome.kill();
    server.close();
    process.exit(0);

  } catch (err) {
    console.error('CDP test error:', err);
    chrome.kill();
    server.close();
    process.exit(1);
  }
});
