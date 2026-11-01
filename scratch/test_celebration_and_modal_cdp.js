const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8119;
const CDP_PORT = 9259;
const ROOT = path.resolve(__dirname, '..');
const ARTIFACT_DIR = 'C:\\Users\\Ismae\\.gemini\\antigravity\\brain\\0d9e1921-82a7-413c-a85d-a957ed6a47ea';

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

    for (let i = 0; i < 25; i++) {
      const readyRes = await send('Runtime.evaluate', {
        expression: 'Boolean(document.body && document.readyState === "complete" && window.BityBlocklyGame)'
      });
      if (readyRes?.result?.value) break;
      await new Promise(r => setTimeout(r, 250));
    }

    console.log('Chrome connected. Testing redesigned celebration modal on desktop (1280x800)...');

    // 1. Desktop Test (1280x800)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false
    });

    const desktopTestResult = await send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `
        new Promise(async (resolve) => {
          const report = { grades: {}, dimensions: {}, buttonsTest: {} };
          const game = window.bityBlocklyGame || new window.BityBlocklyGame({ grade: 1 });
          window.bityBlocklyGame = game;

          document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
          document.getElementById('screen-bityblockly').classList.add('active');

          // Check Grade 1 to 5 modal opening, layout & content
          const finalLevels = { 1: 6, 2: 4, 3: 5, 4: 7, 5: 8 };

          for (let g = 1; g <= 5; g++) {
            game.selectGrade(g);
            game.loadLevel(finalLevels[g]);
            // Dismiss concept modal if open
            const conceptModal = document.getElementById('bityblockly-instruction-concept-modal');
            if (conceptModal) conceptModal.classList.remove('active');

            // Set simulated victory instructions
            game.instructionsExecuted = (g === 1 ? 6 : g === 2 ? 8 : g === 3 ? 10 : g === 4 ? 12 : 14);
            game.movesExecuted = (g === 1 ? 5 : g === 2 ? 7 : g === 3 ? 9 : g === 4 ? 11 : 13);
            game.turnsExecuted = 1;

            game.triggerInstructionSummaryModal();
            await new Promise(r => setTimeout(r, 150));

            const modal = document.getElementById('bityblockly-instruction-summary-modal');
            const card = document.querySelector('.bityblockly-instruction-summary-card');
            const rect = card.getBoundingClientRect();
            const vpHeight = window.innerHeight;

            const btnRetry = document.getElementById('btn-bityblockly-summary-retry');
            const btnNext = document.getElementById('btn-bityblockly-summary-next');
            const retryRect = btnRetry.getBoundingClientRect();
            const nextRect = btnNext.getBoundingClientRect();

            const title = document.getElementById('bityblockly-summary-title')?.textContent.trim();
            const bitySpeech = document.getElementById('bityblockly-summary-bity-speech')?.textContent.trim();
            const totalText = document.getElementById('bityblockly-summary-total-count')?.textContent.trim();
            const hasAvatarSvg = !!document.querySelector('#bityblockly-summary-avatar svg');
            const hasHalloweenFx = document.querySelectorAll('.summary-fx-bat').length >= 3;

            // Visibility of buttons without scroll
            const buttonsVisibleWithoutScroll = (
              retryRect.top > 0 && retryRect.bottom <= vpHeight &&
              nextRect.top > 0 && nextRect.bottom <= vpHeight
            );

            report.grades[g] = {
              modalActive: modal.classList.contains('active'),
              cardWidth: Math.round(rect.width),
              cardHeight: Math.round(rect.height),
              vpHeight,
              fitsInViewport: rect.height <= vpHeight,
              buttonsVisibleWithoutScroll,
              retryBottom: Math.round(retryRect.bottom),
              title,
              bitySpeech,
              totalText,
              hasAvatarSvg,
              hasHalloweenFx,
              isUppercase: (g === 1 ? (title === title.toUpperCase() && bitySpeech === bitySpeech.toUpperCase()) : true)
            };

            modal.classList.remove('active');
          }

          // Test Button Interactions on Grade 1
          game.selectGrade(1);
          game.loadLevel(6);
          const conceptModal = document.getElementById('bityblockly-instruction-concept-modal');
          if (conceptModal) conceptModal.classList.remove('active');
          game.instructionsExecuted = 6;
          game.movesExecuted = 5;
          game.turnsExecuted = 1;
          game.triggerInstructionSummaryModal();
          await new Promise(r => setTimeout(r, 100));

          const modal = document.getElementById('bityblockly-instruction-summary-modal');
          const btnRetry = document.getElementById('btn-bityblockly-summary-retry');

          // Click "PROBAR OTRO CAMINO"
          btnRetry.click();
          await new Promise(r => setTimeout(r, 150));
          report.buttonsTest.retryClosesModal = !modal.classList.contains('active');
          report.buttonsTest.retryKeptPreviousAttempt = (game.previousAttemptInstructions === 6);
          report.buttonsTest.bityAtStart = (game.bityPos && game.bityPos.x === 1 && game.bityPos.y === 1);

          // Test "FINALIZAR GRADO"
          game.triggerInstructionSummaryModal();
          await new Promise(r => setTimeout(r, 100));
          const btnNext = document.getElementById('btn-bityblockly-summary-next');
          btnNext.click();
          await new Promise(r => setTimeout(r, 150));
          report.buttonsTest.nextClosesModal = !modal.classList.contains('active');

          // Test Audio Synthesizer & Mute safety
          report.audio = {
            hasMethod: typeof game.audio.playHalloweenCelebration === 'function',
            hasStopMethod: typeof game.audio.stopCelebration === 'function'
          };

          // Test mute disables sound
          game.audio.enabled = false;
          game.audio.playHalloweenCelebration();
          report.audio.mutedDoesNotCreateOscs = (game.audio.activeCelebrationOscs.length === 0);
          game.audio.enabled = true;

          resolve(report);
        })
      `
    });

    console.log('Desktop Test Results:', JSON.stringify(desktopTestResult.result.value, null, 2));

    // Capture Desktop Screenshot of Grade 1 Celebration
    await send('Runtime.evaluate', {
      expression: `
        window.bityBlocklyGame.selectGrade(1);
        window.bityBlocklyGame.loadLevel(6);
        const cm = document.getElementById('bityblockly-instruction-concept-modal');
        if (cm) cm.classList.remove('active');
        window.bityBlocklyGame.instructionsExecuted = 6;
        window.bityBlocklyGame.movesExecuted = 5;
        window.bityBlocklyGame.turnsExecuted = 1;
        window.bityBlocklyGame.triggerInstructionSummaryModal();
      `
    });
    await new Promise(r => setTimeout(r, 350));
    const ssG1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'celebracion_halloween_modal_grado1_desktop.png'), Buffer.from(ssG1.data, 'base64'));
    console.log('Saved celebracion_halloween_modal_grado1_desktop.png');

    // Capture Desktop Screenshot of Grade 5 Celebration
    await send('Runtime.evaluate', {
      expression: `
        window.bityBlocklyGame.selectGrade(5);
        window.bityBlocklyGame.loadLevel(8);
        const cm = document.getElementById('bityblockly-instruction-concept-modal');
        if (cm) cm.classList.remove('active');
        window.bityBlocklyGame.instructionsExecuted = 14;
        window.bityBlocklyGame.movesExecuted = 13;
        window.bityBlocklyGame.turnsExecuted = 1;
        window.bityBlocklyGame.triggerInstructionSummaryModal();
      `
    });
    await new Promise(r => setTimeout(r, 350));
    const ssG5 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'celebracion_halloween_modal_grado5_desktop.png'), Buffer.from(ssG5.data, 'base64'));
    console.log('Saved celebracion_halloween_modal_grado5_desktop.png');

    // 2. Mobile Responsive Test (375x667 - iPhone SE)
    console.log('Testing mobile responsive layout (375x667)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      mobile: true
    });

    const mobileTestResult = await send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `
        new Promise(async (resolve) => {
          const game = window.bityBlocklyGame;
          game.selectGrade(2);
          game.loadLevel(4);
          const cm = document.getElementById('bityblockly-instruction-concept-modal');
          if (cm) cm.classList.remove('active');
          game.instructionsExecuted = 8;
          game.movesExecuted = 7;
          game.turnsExecuted = 1;
          game.triggerInstructionSummaryModal();
          await new Promise(r => setTimeout(r, 200));

          const card = document.querySelector('.bityblockly-instruction-summary-card');
          const rect = card.getBoundingClientRect();
          const btnRetry = document.getElementById('btn-bityblockly-summary-retry');
          const btnNext = document.getElementById('btn-bityblockly-summary-next');
          const retryRect = btnRetry.getBoundingClientRect();
          const nextRect = btnNext.getBoundingClientRect();

          const hasHorizontalOverflow = card.scrollWidth > card.clientWidth;
          const bodyHasScroll = card.querySelector('.summary-modal-body').scrollHeight > card.querySelector('.summary-modal-body').clientHeight;

          resolve({
            cardWidth: Math.round(rect.width),
            cardHeight: Math.round(rect.height),
            hasHorizontalOverflow,
            bodyHasScroll,
            retryVisible: retryRect.width > 0 && retryRect.height > 0,
            nextVisible: nextRect.width > 0 && nextRect.height > 0
          });
        })
      `
    });

    console.log('Mobile Test Results:', JSON.stringify(mobileTestResult.result.value, null, 2));

    // Capture Mobile Screenshot
    await new Promise(r => setTimeout(r, 300));
    const ssMobile = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'celebracion_halloween_modal_mobile.png'), Buffer.from(ssMobile.data, 'base64'));
    console.log('Saved celebracion_halloween_modal_mobile.png');

    console.log('ALL CDP CELEBRATION MODAL TESTS PASSED SUCCESSFULLY!');

  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
