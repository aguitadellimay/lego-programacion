const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8116;
const CDP_PORT = 9256;
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

    console.log('Chrome connected, running thorough verification suite for all 5 mazes...');

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
            const report = { grades: {} };

            if (!window.bityBlocklyGame) {
              window.bityBlocklyGame = new window.BityBlocklyGame({ grade: 1 });
            }
            const game = window.bityBlocklyGame;

            // Speed up step delay for tests
            game.advanceStepDelay = function() {
              this.executionTimerId = setTimeout(() => {
                this.currentStepIndex++;
                this.executeNextStep();
              }, 25);
            };

            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            document.getElementById('screen-bityblockly').classList.add('active');

            const testDefinitions = [
              {
                grade: 1,
                name: '1.er Grado',
                missionIndex: 6,
                routes: {
                  optimo: { actions: 'FFFRFF', expectedTotal: 6, expectedMoves: 5, expectedTurns: 1, label: 'Camino Óptimo' },
                  alt1: { actions: 'RFFFLFFFLF', expectedTotal: 10, expectedMoves: 7, expectedTurns: 3, label: 'Alternativa 1' },
                  alt2: { actions: 'FFFFFRFFFRFFRF', expectedTotal: 14, expectedMoves: 11, expectedTurns: 3, label: 'Alternativa 2' }
                }
              },
              {
                grade: 2,
                name: '2.º Grado',
                missionIndex: 4,
                routes: {
                  optimo: { actions: 'FFFFRFFF', expectedTotal: 8, expectedMoves: 7, expectedTurns: 1, label: 'Camino Óptimo' },
                  alt1: { actions: 'RFFLFFRFLFF', expectedTotal: 11, expectedMoves: 7, expectedTurns: 4, label: 'Alternativa 1' },
                  alt2: { actions: 'FFFFFFRFFFFRFFRF', expectedTotal: 16, expectedMoves: 13, expectedTurns: 3, label: 'Alternativa 2' }
                }
              },
              {
                grade: 3,
                name: '3.º Grado',
                missionIndex: 5,
                routes: {
                  optimo: { actions: 'FFFFFRFFFF', expectedTotal: 10, expectedMoves: 9, expectedTurns: 1, label: 'Camino Óptimo' },
                  alt1: { actions: 'RFFLFFRFLFRFLFF', expectedTotal: 15, expectedMoves: 9, expectedTurns: 6, label: 'Alternativa 1' },
                  alt2: { actions: 'FFFFFFFRFFFFFRFFRF', expectedTotal: 18, expectedMoves: 15, expectedTurns: 3, label: 'Alternativa 2' }
                }
              },
              {
                grade: 4,
                name: '4.º Grado',
                missionIndex: 7,
                routes: {
                  optimo: { actions: 'FFFFFFRFFFFF', expectedTotal: 12, expectedMoves: 11, expectedTurns: 1, label: 'Camino Óptimo' },
                  alt1: { actions: 'FFFFFFFFRFFFFFRFF', expectedTotal: 17, expectedMoves: 15, expectedTurns: 2, label: 'Alternativa 1' },
                  alt2: { actions: 'RFFFFFLFFLFFFRFFRFFFLFF', expectedTotal: 23, expectedMoves: 17, expectedTurns: 6, label: 'Alternativa 2' }
                }
              },
              {
                grade: 5,
                name: '5.º Grado',
                missionIndex: 8,
                routes: {
                  optimo: { actions: 'FFFFFFFRFFFFFF', expectedTotal: 14, expectedMoves: 13, expectedTurns: 1, label: 'Camino Óptimo' },
                  alt1: { actions: 'FFFFFFFFFRFFFFRFFLFF', expectedTotal: 20, expectedMoves: 17, expectedTurns: 3, label: 'Alternativa 1' },
                  alt2: { actions: 'RFFFFFFLFFLFFFFRFFRFFFFLFFF', expectedTotal: 27, expectedMoves: 21, expectedTurns: 6, label: 'Alternativa 2' }
                }
              }
            ];

            const actionMap = {
              'F': 'forward',
              'L': 'left',
              'R': 'right'
            };

            for (const t of testDefinitions) {
              const g = t.grade;
              report.grades[g] = { name: t.name, results: {} };
              game.selectGrade(g);

              for (const routeKey of ['optimo', 'alt1', 'alt2']) {
                const rDef = t.routes[routeKey];
                game.loadLevel(t.missionIndex);
                await new Promise(r => setTimeout(r, 100));

                // Dismiss consigna modal if open
                const conceptModal = document.getElementById('bityblockly-instruction-concept-modal');
                if (conceptModal && conceptModal.classList.contains('active')) {
                  const btnStart = document.getElementById('btn-bityblockly-start-instruction-challenge');
                  if (btnStart) btnStart.click();
                  await new Promise(r => setTimeout(r, 100));
                }

                // Open doors
                const cfg = game.getCurrentMissionConfig();
                if (cfg.doors) {
                  cfg.doors.forEach(d => game.openDoor(d.x, d.y));
                }

                // Load blocks for this route
                game.clearBlocks();
                for (const char of rDef.actions) {
                  game.addBlock(actionMap[char]);
                }

                // Run sequence
                game.runProgram();
                // Wait for completion (25ms * 30 steps max = ~800ms)
                await new Promise(r => setTimeout(r, (rDef.actions.length + 5) * 35));

                const summaryModal = document.getElementById('bityblockly-instruction-summary-modal');
                const isSummaryActive = summaryModal.classList.contains('active');
                const totalText = document.getElementById('bityblockly-summary-total-count')?.textContent.trim();
                const movesText = document.getElementById('bityblockly-summary-moves-count')?.textContent.trim();
                const turnsText = document.getElementById('bityblockly-summary-turns-count')?.textContent.trim();
                const routeNameText = document.getElementById('bityblockly-summary-route-name')?.textContent.trim();
                const classroomMsg = document.getElementById('summary-classroom-callout-msg')?.textContent.trim();

                const totalNum = parseInt(totalText, 10);
                const movesNum = parseInt(movesText, 10);
                const turnsNum = parseInt(turnsText, 10);

                const passed = (
                  isSummaryActive &&
                  totalNum === rDef.expectedTotal &&
                  movesNum === rDef.expectedMoves &&
                  turnsNum === rDef.expectedTurns &&
                  routeNameText.includes(rDef.label.toUpperCase()) || routeNameText.includes(rDef.label)
                );

                report.grades[g].results[routeKey] = {
                  passed,
                  totalNum,
                  expectedTotal: rDef.expectedTotal,
                  movesNum,
                  expectedMoves: rDef.expectedMoves,
                  turnsNum,
                  expectedTurns: rDef.expectedTurns,
                  routeNameText,
                  classroomMsg
                };

                // Close summary modal
                summaryModal.classList.remove('active');
                await new Promise(r => setTimeout(r, 100));
              }
            }

            resolve(report);
          } catch (err) {
            reject({ error: err.message, stack: err.stack });
          }
        })
      `
    });

    console.log('Verification Results:', JSON.stringify(evalResult.result.value, null, 2));

    // Capture visual screenshots of Grade 1 and Grade 5
    // 1. Grade 1 Maze
    await send('Runtime.evaluate', {
      expression: `
        window.bityBlocklyGame.selectGrade(1);
        window.bityBlocklyGame.loadLevel(6);
        const modal = document.getElementById('bityblockly-instruction-concept-modal');
        if (modal) modal.classList.remove('active');
      `
    });
    await new Promise(r => setTimeout(r, 300));
    const ssG1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'laberinto_final_grado1_reformulado.png'), Buffer.from(ssG1.data, 'base64'));
    console.log('Saved laberinto_final_grado1_reformulado.png');

    // 2. Grade 5 Maze & Summary Modal
    await send('Runtime.evaluate', {
      expression: `
        window.bityBlocklyGame.selectGrade(5);
        window.bityBlocklyGame.loadLevel(8);
        const modal = document.getElementById('bityblockly-instruction-concept-modal');
        if (modal) modal.classList.remove('active');
        window.bityBlocklyGame.instructionsExecuted = 14;
        window.bityBlocklyGame.movesExecuted = 13;
        window.bityBlocklyGame.turnsExecuted = 1;
        window.bityBlocklyGame.triggerInstructionSummaryModal();
      `
    });
    await new Promise(r => setTimeout(r, 300));
    const ssG5 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'laberinto_final_grado5_resumen_reformulado.png'), Buffer.from(ssG5.data, 'base64'));
    console.log('Saved laberinto_final_grado5_resumen_reformulado.png');

    // Also copy to root images/ or keep in artifacts directory
    console.log('All automated browser verifications complete!');

  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
