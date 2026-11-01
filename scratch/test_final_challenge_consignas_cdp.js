const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8114;
const CDP_PORT = 9254;
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

    console.log('Chrome connected, running thorough verification suite...');

    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    const evalResult = await send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `
        new Promise(async (resolve, reject) => {
          try {
            const report = { grades: {}, testPoints: {} };

            if (!window.bityBlocklyGame) {
              window.bityBlocklyGame = new window.BityBlocklyGame({ grade: 1 });
            }
            const game = window.bityBlocklyGame;

            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            document.getElementById('screen-bityblockly').classList.add('active');

            // 1. Check that early levels DO NOT show the concept modal
            game.selectGrade(1);
            game.loadLevel(1);
            await new Promise(r => setTimeout(r, 150));
            const modalEarly = document.getElementById('bityblockly-instruction-concept-modal');
            report.testPoints.earlyLevelNoModal = !modalEarly.classList.contains('active');

            // 2. Check Final Challenge modal for all 5 grades
            for (let g = 1; g <= 5; g++) {
              game.selectGrade(g);
              const gData = window.BITYBLOCKLY_GRADES_DATA[g];
              const finalLvlNum = gData.missions.length;

              if (!game.conceptSeenPerGrade) game.conceptSeenPerGrade = {};
              game.conceptSeenPerGrade[g] = false;

              game.loadLevel(finalLvlNum);
              await new Promise(r => setTimeout(r, 250));

              const modal = document.getElementById('bityblockly-instruction-concept-modal');
              const isModalActive = modal.classList.contains('active');
              const title = document.getElementById('bityblockly-concept-title')?.textContent.trim();
              const subtitle = document.getElementById('bityblockly-concept-subtitle')?.textContent.trim();
              const itemsCount = document.querySelectorAll('#bityblockly-concept-items-grid .concept-consigna-item').length;
              const motto = document.getElementById('bityblockly-concept-motto')?.textContent.trim();
              const btnText = document.getElementById('btn-concept-start-text')?.textContent.trim();
              const hasAvatarSvg = !!document.querySelector('#bityblockly-concept-avatar svg');

              const titleStyle = window.getComputedStyle(document.getElementById('bityblockly-concept-title'));
              const textTransform = titleStyle.textTransform;

              report.grades[g] = {
                finalLvlNum,
                isModalActive,
                title,
                subtitle,
                itemsCount,
                motto,
                btnText,
                hasAvatarSvg,
                textTransform
              };

              // Dismiss modal
              const btnStart = document.getElementById('btn-bityblockly-start-instruction-challenge');
              btnStart.click();
              await new Promise(r => setTimeout(r, 150));
              report.grades[g].isModalClosed = !modal.classList.contains('active');

              // Reload: should not show again
              game.loadLevel(finalLvlNum);
              await new Promise(r => setTimeout(r, 150));
              report.grades[g].doesNotReopenOnReload = !modal.classList.contains('active');
            }

            // 3. Instruction Counter Test: Failed Attempt vs Winning Run
            game.selectGrade(1);
            game.loadLevel(6);
            await new Promise(r => setTimeout(r, 150));

            // Run a failing attempt hitting a wall
            game.clearBlocks();
            game.addBlock('forward');
            game.addBlock('left');
            game.addBlock('forward');
            game.runProgram();
            await new Promise(r => setTimeout(r, 1800));

            const wallHitOccurred = (game.consecutiveErrors > 0);
            const intermediateInstructions = game.instructionsExecuted;

            // Open doors for the successful maze traversal
            game.openDoor(3, 1);
            game.openDoor(6, 3);

            // Camino A:
            // (1,1) facing East (dir 1):
            // Forward 5 -> (6,1)
            // Turn Right -> South (dir 2)
            // Forward 3 -> (6,4) [Goal]
            // Total: 8 moves + 1 turn = 9 instructions
            game.clearBlocks();
            for (let i = 0; i < 5; i++) game.addBlock('forward');
            game.addBlock('right');
            for (let i = 0; i < 3; i++) game.addBlock('forward');

            game.runProgram();
            await new Promise(r => setTimeout(r, 6500));

            const summaryModal = document.getElementById('bityblockly-instruction-summary-modal');
            const summaryActive = summaryModal.classList.contains('active');
            const summaryTitle = document.getElementById('bityblockly-summary-title')?.textContent.trim();
            const summarySubtitle = document.getElementById('bityblockly-summary-subtitle')?.textContent.trim();
            const summaryTotal = document.getElementById('bityblockly-summary-total-count')?.textContent.trim();
            const summaryMoves = document.getElementById('bityblockly-summary-moves-count')?.textContent.trim();
            const summaryTurns = document.getElementById('bityblockly-summary-turns-count')?.textContent.trim();
            const summaryRoute = document.getElementById('bityblockly-summary-route-name')?.textContent.trim();
            const classroomMsg = document.getElementById('summary-classroom-callout-msg')?.textContent.trim();

            report.testPoints.runResultsGrade1 = {
              wallHitOccurred,
              intermediateInstructions,
              summaryActive,
              summaryTitle,
              summarySubtitle,
              summaryTotal,
              summaryMoves,
              summaryTurns,
              summaryRoute,
              classroomMsg
            };

            // Dismiss summary modal
            summaryModal.classList.remove('active');

            // 4. Alternative route (Camino B) in Grade 1
            // Camino B:
            // Turn Right -> South (dir 2)
            // Forward 2 -> (1,3)
            // Turn Left -> East (dir 1)
            // Forward 3 -> (4,3)
            // Turn Right -> South (dir 2)
            // Forward 1 -> (4,4)
            // Turn Left -> East (dir 1)
            // Forward 2 -> (6,4) [Goal]
            // Moves: 2 + 3 + 1 + 2 = 8 moves.
            // Turns: R, L, R, L = 4 turns.
            // Total: 8 + 4 = 12 instructions.
            game.loadLevel(6);
            game.openDoor(3, 1);
            game.openDoor(6, 3);
            game.clearBlocks();
            game.addBlock('right');
            game.addBlock('forward');
            game.addBlock('forward');
            game.addBlock('left');
            game.addBlock('forward');
            game.addBlock('forward');
            game.addBlock('forward');
            game.addBlock('right');
            game.addBlock('forward');
            game.addBlock('left');
            game.addBlock('forward');
            game.addBlock('forward');

            game.runProgram();
            await new Promise(r => setTimeout(r, 8000));

            const summaryBActive = summaryModal.classList.contains('active');
            const summaryBTotal = document.getElementById('bityblockly-summary-total-count')?.textContent.trim();
            const summaryBMoves = document.getElementById('bityblockly-summary-moves-count')?.textContent.trim();
            const summaryBTurns = document.getElementById('bityblockly-summary-turns-count')?.textContent.trim();
            const summaryBRoute = document.getElementById('bityblockly-summary-route-name')?.textContent.trim();

            report.testPoints.alternativeRouteGrade1 = {
              summaryBActive,
              summaryBTotal,
              summaryBMoves,
              summaryBTurns,
              summaryBRoute
            };

            resolve(report);
          } catch (e) {
            reject({ error: e.message, stack: e.stack });
          }
        })
      `
    });

    console.log('\n--- CDP Evaluation Report ---');
    const rep = evalResult?.result?.value;
    console.log('Early level no modal:', rep?.testPoints?.earlyLevelNoModal);
    for (let g = 1; g <= 5; g++) {
      console.log(`Grade ${g}:`, rep?.grades?.[g]);
    }
    console.log('\nGrade 1 Execution (Camino A):', rep?.testPoints?.runResultsGrade1);
    console.log('Grade 1 Alternative (Camino B):', rep?.testPoints?.alternativeRouteGrade1);

    // Assertions
    if (!rep.testPoints.earlyLevelNoModal) throw new Error('Modal appeared in early levels!');
    for (let g = 1; g <= 5; g++) {
      const gd = rep.grades[g];
      if (!gd.isModalActive) throw new Error(`Modal was not active for Grade ${g} final challenge!`);
      if (gd.itemsCount !== 4) throw new Error(`Grade ${g} items count was ${gd.itemsCount}, expected 4`);
      if (!gd.hasAvatarSvg) throw new Error(`Grade ${g} avatar SVG missing`);
      if (!gd.isModalClosed) throw new Error(`Grade ${g} modal did not close on button click`);
      if (!gd.doesNotReopenOnReload) throw new Error(`Grade ${g} modal reopened on reload`);
      if (g === 1 && gd.textTransform !== 'uppercase') throw new Error('Grade 1 title is not uppercase');
      if (g > 1 && gd.textTransform !== 'none') throw new Error(`Grade ${g} title textTransform is not none`);
    }

    const run1 = rep.testPoints.runResultsGrade1;
    if (!run1.summaryActive) throw new Error('Summary modal did not open on goal reach');
    if (run1.summaryTotal !== '9') throw new Error(`Expected 9 total instructions, got ${run1.summaryTotal}`);
    if (run1.summaryMoves !== '8') throw new Error(`Expected 8 moves, got ${run1.summaryMoves}`);
    if (run1.summaryTurns !== '1') throw new Error(`Expected 1 turn, got ${run1.summaryTurns}`);
    if (!run1.classroomMsg.includes('CLASSROOM')) throw new Error('Classroom message missing or incomplete');

    const runB = rep.testPoints.alternativeRouteGrade1;
    if (!runB.summaryBActive) throw new Error('Alternative route did not trigger summary modal');
    if (runB.summaryBTotal !== '12') throw new Error(`Alternative route expected 12 instructions, got ${runB.summaryBTotal}`);
    if (runB.summaryBMoves !== '8') throw new Error(`Alternative route expected 8 moves, got ${runB.summaryBMoves}`);
    if (runB.summaryBTurns !== '4') throw new Error(`Alternative route expected 4 turns, got ${runB.summaryBTurns}`);

    console.log('\n>>> ALL AUTOMATED IN-BROWSER CHECKS PASSED (100%) <<<');

    // Capture screenshots for the report
    // 1. Grade 1 Consigna Modal (Uppercase)
    await send('Runtime.evaluate', {
      expression: `
        game = window.bityBlocklyGame;
        game.selectGrade(1);
        game.conceptSeenPerGrade[1] = false;
        game.loadLevel(6);
      `
    });
    await new Promise(r => setTimeout(r, 400));
    const shotG1Modal = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'consigna_modal_grade1_uppercase.png'), Buffer.from(shotG1Modal.data, 'base64'));
    console.log('Captured: consigna_modal_grade1_uppercase.png');

    // 2. Grade 5 Consigna Modal (Standard case)
    await send('Runtime.evaluate', {
      expression: `
        game = window.bityBlocklyGame;
        game.selectGrade(5);
        game.conceptSeenPerGrade[5] = false;
        game.loadLevel(8);
      `
    });
    await new Promise(r => setTimeout(r, 400));
    const shotG5Modal = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'consigna_modal_grade5_standard.png'), Buffer.from(shotG5Modal.data, 'base64'));
    console.log('Captured: consigna_modal_grade5_standard.png');

    // 3. Summary Modal with Classroom callout
    await send('Runtime.evaluate', {
      expression: `
        game = window.bityBlocklyGame;
        game.selectGrade(1);
        game.instructionsExecuted = 9;
        game.movesExecuted = 8;
        game.turnsExecuted = 1;
        game.triggerInstructionSummaryModal();
      `
    });
    await new Promise(r => setTimeout(r, 400));
    const shotSummary = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'summary_modal_classroom_callout.png'), Buffer.from(shotSummary.data, 'base64'));
    console.log('Captured: summary_modal_classroom_callout.png');

  } catch (err) {
    console.error('Fatal test error:', err);
    process.exitCode = 1;
  } finally {
    chrome.kill();
    server.close();
    process.exit(process.exitCode || 0);
  }
});
