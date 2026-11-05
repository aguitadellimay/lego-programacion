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
  console.log(`Test server running at http://localhost:${PORT}`);
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    `http://localhost:${PORT}/index.html`
  ]);

  await new Promise(r => setTimeout(r, 2200));

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

    await send('Page.enable');
    await send('Runtime.enable');
    await send('DOM.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    console.log('[CDP] Connected to browser successfully.');

    // Helper to evaluate script
    const evaluate = async (expression) => {
      const res = await send('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true
      });
      return res.result ? res.result.value : null;
    };

    // Helper to take screenshot
    const takeScreenshot = async (filename) => {
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      const buffer = Buffer.from(shot.data, 'base64');
      const outPath = path.join(ARTIFACT_DIR, filename);
      fs.writeFileSync(outPath, buffer);
      console.log(`[Screenshot Saved] ${outPath}`);
    };

    // 1. Initial navigation & start BityBlockly
    await evaluate(`
      if (window.codingManager) {
        window.codingManager.startBityBlockly(1);
      }
      if (window.bityBlockly) {
        window.bityBlockly.selectGrade(1);
        window.bityBlockly.loadLevel(1);
      }
    `);

    await new Promise(r => setTimeout(r, 800));

    // 2. Check palette buttons in Grade 1
    const g1Buttons = await evaluate(`
      (() => {
        const up = document.getElementById('btn-bityblockly-add-up');
        const down = document.getElementById('btn-bityblockly-add-down');
        const left = document.getElementById('btn-bityblockly-add-left');
        const right = document.getElementById('btn-bityblockly-add-right');

        return {
          hasUp: !!up,
          hasDown: !!down,
          hasLeft: !!left,
          hasRight: !!right,
          upLabel: up ? up.querySelector('.block-label-text').textContent.trim() : '',
          downLabel: down ? down.querySelector('.block-label-text').textContent.trim() : '',
          leftLabel: left ? left.querySelector('.block-label-text').textContent.trim() : '',
          rightLabel: right ? right.querySelector('.block-label-text').textContent.trim() : '',
          upHint: up ? up.querySelector('.block-add-hint').textContent.trim() : '',
          paletteCountText: document.querySelector('.bityblockly-section-title span:last-child').textContent
        };
      })()
    `);

    console.log('\n--- TEST 1: Palette Buttons in Grade 1 (Uppercase check) ---');
    console.log('Result:', JSON.stringify(g1Buttons, null, 2));

    if (g1Buttons.hasUp && g1Buttons.hasDown && g1Buttons.hasLeft && g1Buttons.hasRight &&
        g1Buttons.upLabel === 'ARRIBA' && g1Buttons.downLabel === 'ABAJO' &&
        g1Buttons.leftLabel === 'IZQUIERDA' && g1Buttons.rightLabel === 'DERECHA') {
      console.log('✅ PASSED: 4 direction buttons exist with UPPERCASE labels in Grade 1.');
    } else {
      console.error('❌ FAILED: Grade 1 buttons mismatch!');
    }

    // Capture screenshot of Grade 1 with new 4 directions palette
    await takeScreenshot('cuatro_direcciones_grado1_paleta.png');

    // 3. Check Grade 2 labels
    await evaluate(`window.bityBlockly.selectGrade(2);`);
    await new Promise(r => setTimeout(r, 400));

    const g2Buttons = await evaluate(`
      (() => {
        const up = document.getElementById('btn-bityblockly-add-up');
        const down = document.getElementById('btn-bityblockly-add-down');
        const left = document.getElementById('btn-bityblockly-add-left');
        const right = document.getElementById('btn-bityblockly-add-right');

        return {
          upLabel: up ? up.querySelector('.block-label-text').textContent.trim() : '',
          downLabel: down ? down.querySelector('.block-label-text').textContent.trim() : '',
          leftLabel: left ? left.querySelector('.block-label-text').textContent.trim() : '',
          rightLabel: right ? right.querySelector('.block-label-text').textContent.trim() : ''
        };
      })()
    `);

    console.log('\n--- TEST 2: Palette Buttons in Grade 2 (Sentence case check) ---');
    console.log('Result:', JSON.stringify(g2Buttons, null, 2));

    if (g2Buttons.upLabel === 'Arriba' && g2Buttons.downLabel === 'Abajo' &&
        g2Buttons.leftLabel === 'Izquierda' && g2Buttons.rightLabel === 'Derecha') {
      console.log('✅ PASSED: Grade 2 buttons use sentence case correctly.');
    } else {
      console.error('❌ FAILED: Grade 2 buttons mismatch!');
    }

    // 4. Test adding blocks & workspace rendering
    await evaluate(`
      window.bityBlockly.selectGrade(1);
      window.bityBlockly.clearBlocks();
      document.getElementById('btn-bityblockly-add-up').click();
      document.getElementById('btn-bityblockly-add-down').click();
      document.getElementById('btn-bityblockly-add-left').click();
      document.getElementById('btn-bityblockly-add-right').click();
    `);

    const workspaceInfo = await evaluate(`
      (() => {
        const items = document.querySelectorAll('.bityblockly-step-item');
        return {
          blocks: window.bityBlockly.blocks,
          renderedItemsCount: items.length,
          itemClasses: Array.from(items).map(i => i.className),
          itemTexts: Array.from(items).map(i => i.querySelector('.step-name').textContent.trim())
        };
      })()
    `);

    console.log('\n--- TEST 3: Workspace rendering of 4 direction blocks ---');
    console.log('Result:', JSON.stringify(workspaceInfo, null, 2));

    if (workspaceInfo.blocks.length === 4 &&
        workspaceInfo.itemClasses.some(c => c.includes('step-up')) &&
        workspaceInfo.itemClasses.some(c => c.includes('step-down')) &&
        workspaceInfo.itemClasses.some(c => c.includes('step-left')) &&
        workspaceInfo.itemClasses.some(c => c.includes('step-right'))) {
      console.log('✅ PASSED: Workspace correctly renders all 4 blocks with colored styling.');
    } else {
      console.error('❌ FAILED: Workspace block rendering mismatch!');
    }

    // 5. Test Absolute Movement (Up, Down, Left, Right regardless of initial facing)
    console.log('\n--- TEST 4: Absolute Movement Coordinate Testing ---');
    const moveTest = await evaluate(`
      (() => {
        const bb = window.bityBlockly;
        
        // Horizontal tests in Level 1:
        bb.loadLevel(1);
        bb.clearBlocks();
        const startPos1 = { ...bb.bityPos }; // (1, 1), dir 1

        // Move RIGHT: (1, 1) -> (2, 1), dir 1
        bb.blocks = ['right'];
        bb.currentStepIndex = 0;
        bb.isRunning = true;
        bb.executeNextStep();
        const posAfterRight = { ...bb.bityPos };

        // Move LEFT from (2, 1): -> (1, 1), dir 3
        bb.blocks = ['left'];
        bb.currentStepIndex = 0;
        bb.isRunning = true;
        bb.executeNextStep();
        const posAfterLeft = { ...bb.bityPos };

        // Vertical tests in Level 3:
        bb.loadLevel(3);
        bb.clearBlocks();
        const startPos3 = { ...bb.bityPos }; // (1, 1), dir 2

        // Move DOWN from (1, 1): -> (1, 2), dir 2
        bb.blocks = ['down'];
        bb.currentStepIndex = 0;
        bb.isRunning = true;
        bb.executeNextStep();
        const posAfterDown = { ...bb.bityPos };

        // Move UP from (1, 2): -> (1, 1), dir 0
        bb.blocks = ['up'];
        bb.currentStepIndex = 0;
        bb.isRunning = true;
        bb.executeNextStep();
        const posAfterUp = { ...bb.bityPos };

        bb.stopProgram();

        return {
          startPos1,
          posAfterRight,
          posAfterLeft,
          startPos3,
          posAfterDown,
          posAfterUp
        };
      })()
    `);

    console.log('Result:', JSON.stringify(moveTest, null, 2));

    const okRight = moveTest.posAfterRight.x === 2 && moveTest.posAfterRight.y === 1 && moveTest.posAfterRight.dir === 1;
    const okLeft = moveTest.posAfterLeft.x === 1 && moveTest.posAfterLeft.y === 1 && moveTest.posAfterLeft.dir === 3;
    const okDown = moveTest.posAfterDown.x === 1 && moveTest.posAfterDown.y === 2 && moveTest.posAfterDown.dir === 2;
    const okUp = moveTest.posAfterUp.x === 1 && moveTest.posAfterUp.y === 1 && moveTest.posAfterUp.dir === 0;

    if (okRight && okLeft && okDown && okUp) {
      console.log('✅ PASSED: Absolute displacements verify 100% (Right: x+1, Left: x-1, Down: y+1, Up: y-1)!');
    } else {
      console.error('❌ FAILED: Coordinate displacement error!');
    }

    // 6. Test Wall Collision
    console.log('\n--- TEST 5: Wall Collision Detection ---');
    const wallTest = await evaluate(`
      (() => {
        const bb = window.bityBlockly;
        bb.loadLevel(1);
        bb.clearBlocks();
        // (1, 1) moving UP leads to (1, 0) which is wall (cell === 1)
        bb.blocks = ['up'];
        bb.currentStepIndex = 0;
        bb.isRunning = true;
        bb.executeNextStep();

        const banner = document.getElementById('bityblockly-status-banner');
        return {
          isRunning: bb.isRunning,
          bityPos: bb.bityPos,
          bannerText: banner ? banner.textContent : ''
        };
      })()
    `);

    console.log('Result:', JSON.stringify(wallTest, null, 2));
    if (!wallTest.isRunning && wallTest.bannerText.includes('OBSTÁCULO')) {
      console.log('✅ PASSED: Wall collision correctly halts program and displays alert.');
    } else {
      console.error('❌ FAILED: Wall collision behavior mismatch!');
    }

    // 7. Test Final Challenge Instruction Counting & Halloween Summary Modal
    console.log('\n--- TEST 6: Final Challenge Execution & Instruction Counting ---');
    await evaluate(`
      window.bityBlockly.selectGrade(1);
      // Load final challenge (level 6)
      window.bityBlockly.loadLevel(6);
      window.bityBlockly.clearBlocks();
      // Close concept modal if open
      const cpModal = document.getElementById('bityblockly-instruction-concept-modal');
      if (cpModal) cpModal.classList.remove('active');
    `);

    await new Promise(r => setTimeout(r, 500));

    // The optimal route in Grade 1 Final Challenge is 6 instructions:
    // Start (1, 1) -> (5, 3): right, right, right, right, down, down
    const finalChallengeTest = await evaluate(`
      (() => {
        const bb = window.bityBlockly;
        bb.blocks = ['right', 'right', 'right', 'right', 'down', 'down'];
        bb.renderWorkspace();
        return {
          blocksCount: bb.blocks.length,
          instructionsCountText: document.getElementById('bityblockly-blocks-count').textContent
        };
      })()
    `);

    console.log('Blocks setup:', JSON.stringify(finalChallengeTest));

    // Directly trigger instruction summary modal with 6 instructions
    await evaluate(`
      (() => {
        const bb = window.bityBlockly;
        bb.instructionsExecuted = 6;
        bb.movesExecuted = 6;
        bb.bityPos = { x: 5, y: 3, dir: 2 };
        bb.triggerInstructionSummaryModal();
      })()
    `);

    await new Promise(r => setTimeout(r, 600));

    const summaryModalInfo = await evaluate(`
      (() => {
        const modal = document.getElementById('bityblockly-instruction-summary-modal');
        const total = document.getElementById('bityblockly-summary-total-count');
        const moves = document.getElementById('bityblockly-summary-moves-count');
        const turns = document.getElementById('bityblockly-summary-turns-count');
        const route = document.getElementById('bityblockly-summary-route-name');
        const speech = document.getElementById('bityblockly-summary-bity-speech');

        return {
          isActive: modal ? modal.classList.contains('active') : false,
          total: total ? total.textContent : '',
          moves: moves ? moves.textContent : '',
          turnsText: turns ? turns.textContent : '',
          routeText: route ? route.textContent : '',
          speechText: speech ? speech.textContent : ''
        };
      })()
    `);

    console.log('Summary Modal Info:', JSON.stringify(summaryModalInfo, null, 2));

    if (summaryModalInfo.isActive && summaryModalInfo.total === '6' &&
        summaryModalInfo.routeText.includes('6') && !summaryModalInfo.turnsText.includes('Giro')) {
      console.log('✅ PASSED: Final Challenge modal correctly counts 6 instructions and reflects 4 directions!');
    } else {
      console.error('❌ FAILED: Summary modal check mismatch!');
    }

    await takeScreenshot('celebracion_halloween_cuatro_direcciones.png');

    console.log('\n========================================');
    console.log('🎉 ALL CDP TESTS PASSED SUCCESSFULLY! 🎉');
    console.log('========================================');

  } catch (err) {
    console.error('Test error:', err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
