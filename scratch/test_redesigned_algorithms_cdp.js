const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8139;
const CDP_PORT = 9279;
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

    // Enable Page and Runtime
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    console.log('--- 1. Testing Grade 1: Start Class and Step 1 ---');
    let res = await send('Runtime.evaluate', {
      expression: `
        (function() {
          localStorage.clear();
          window.algorithmsModule.startClass(1, 1);
          const screen = document.getElementById('screen-coding-algorithms');
          if (screen) {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            screen.classList.add('active');
          }
          return {
            currentGrade: window.algorithmsModule.currentGrade,
            currentStep: window.algorithmsModule.currentStep,
            hasMount: !!document.getElementById('algorithms-content-mount'),
            hasCaminar: document.body.innerHTML.includes('CAMINAR'),
            hasAlmacen: document.body.innerHTML.includes('ALMACÉN') || document.body.innerHTML.includes('ALMACEN'),
            isUppercase: document.querySelector('.grade-1-uppercase') !== null
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Grade 1 Step 1 init:', res.result.value);

    // Answer Question in Step 1
    console.log('--- Answering Order Question in Step 1 ---');
    res = await send('Runtime.evaluate', {
      expression: `
        (function() {
          window.algorithmsModule.handleOrderQuestion('si');
          return {
            answered: window.algorithmsModule.orderQuestionAnswered,
            hasDisorderedDemo: document.querySelector('.disordered-demo-box') !== null,
            hasConceptGoldCard: document.querySelector('.concept-gold-card') !== null,
            completedStep1: window.algorithmsModule.completedSteps.has(1)
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Order Question answer result:', res.result.value);

    // Screenshot Step 1
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Ismae\\.gemini\\antigravity\\brain\\0d9e1921-82a7-413c-a85d-a957ed6a47ea\\algoritmos_parte1_ilustrada.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot: algoritmos_parte1_ilustrada.png');

    // --- 2. Testing Step 2: Everyday Activities (Café) ---
    console.log('--- 2. Testing Step 2: Everyday Activities (Café) ---');
    res = await send('Runtime.evaluate', {
      expression: `
        (function() {
          window.algorithmsModule.selectStep(2);
          const state = window.algorithmsModule.everydayState.cafe;
          // In Grade 1, targets are: taza, cafe, agua, mezclar
          window.algorithmsModule.handleBlockClick('cafe', 'taza');
          window.algorithmsModule.handleBlockClick('cafe', 'cafe');
          window.algorithmsModule.handleBlockClick('cafe', 'agua');
          window.algorithmsModule.handleBlockClick('cafe', 'mezclar');
          const placedCount = state.placed.length;
          window.algorithmsModule.checkEverydayAct('cafe');
          return {
            currentStep: window.algorithmsModule.currentStep,
            placedCount: placedCount,
            cafeCompleted: state.completed,
            hasSafety: document.querySelector('.safety-badge') !== null
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Step 2 Café completion result:', res.result.value);

    // Screenshot Step 2
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Ismae\\.gemini\\antigravity\\brain\\0d9e1921-82a7-413c-a85d-a957ed6a47ea\\algoritmos_parte2_bloques_cafe.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot: algoritmos_parte2_bloques_cafe.png');

    // --- 3. Testing Step 4: Programming Maze 1 (Al mecánico) ---
    console.log('--- 3. Testing Step 4: Programming Maze 1 ---');
    res = await send('Runtime.evaluate', {
      expression: `
        (function() {
          window.algorithmsModule.selectStep(4);
          const cfg = window.algorithmsModule.getCurrentMazeConfig();
          // Grade 1 d1: start (1,1), goal (3,2). Moves: right, down, right
          window.algorithmsModule.addDirectionToProgram('right');
          window.algorithmsModule.addDirectionToProgram('down');
          window.algorithmsModule.addDirectionToProgram('right');
          const progLen = window.algorithmsModule.program.length;
          
          // Test Step by Step
          window.algorithmsModule.runStepByStep(); // move 1
          const pos1 = { ...window.algorithmsModule.bityPos };
          window.algorithmsModule.runStepByStep(); // move 2
          const pos2 = { ...window.algorithmsModule.bityPos };
          window.algorithmsModule.runStepByStep(); // move 3
          const pos3 = { ...window.algorithmsModule.bityPos };
          return {
            cfgStart: cfg.start,
            cfgGoal: cfg.goal,
            progLen: progLen,
            pos1: pos1,
            pos2: pos2,
            pos3: pos3,
            mazeResult: window.algorithmsModule.mazeResult,
            completedStep4: window.algorithmsModule.completedSteps.has(4)
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Step 4 Step-by-Step execution result:', res.result.value);

    // Screenshot Step 4
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Ismae\\.gemini\\antigravity\\brain\\0d9e1921-82a7-413c-a85d-a957ed6a47ea\\algoritmos_parte3_programacion_bity.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot: algoritmos_parte3_programacion_bity.png');

    // --- 4. Testing Step 6: Maze 3 (Optimización y Comparación) ---
    console.log('--- 4. Testing Step 6: Maze 3 (Optimización) ---');
    res = await send('Runtime.evaluate', {
      expression: `
        (function() {
          window.algorithmsModule.selectStep(6);
          const cfg = window.algorithmsModule.getCurrentMazeConfig();
          // Alternative longer path: down, down, right, right, right, up, up
          window.algorithmsModule.addDirectionToProgram('down');
          window.algorithmsModule.addDirectionToProgram('down');
          window.algorithmsModule.addDirectionToProgram('right');
          window.algorithmsModule.addDirectionToProgram('right');
          window.algorithmsModule.addDirectionToProgram('right');
          window.algorithmsModule.addDirectionToProgram('up');
          window.algorithmsModule.addDirectionToProgram('up');
          
          for (let dir of window.algorithmsModule.program) {
            window.algorithmsModule.executeSingleMove(dir);
          }
          window.algorithmsModule.render();

          return {
            start: cfg.start,
            goal: cfg.goal,
            programLen: window.algorithmsModule.program.length,
            optimalSteps: cfg.optimalSteps,
            mazeResult: window.algorithmsModule.mazeResult,
            hasCompCard: document.querySelector('.comparison-reflection-card') !== null
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Step 6 Optimization result:', res.result.value);

    // Screenshot Step 6
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Ismae\\.gemini\\antigravity\\brain\\0d9e1921-82a7-413c-a85d-a957ed6a47ea\\algoritmos_parte4_optimizacion_reflexion.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot: algoritmos_parte4_optimizacion_reflexion.png');

    // --- 5. Testing Step 7: Final Maze & Celebration ---
    console.log('--- 5. Testing Step 7: Final Maze and Celebration ---');
    res = await send('Runtime.evaluate', {
      expression: `
        (function() {
          window.algorithmsModule.selectStep(7);
          const cfg = window.algorithmsModule.getCurrentMazeConfig();
          // Grade 1 d4: start (1,1), goal (4,3).
          // Path: right, down, right, down, right
          window.algorithmsModule.addDirectionToProgram('right');
          window.algorithmsModule.addDirectionToProgram('down');
          window.algorithmsModule.addDirectionToProgram('right');
          window.algorithmsModule.addDirectionToProgram('down');
          window.algorithmsModule.addDirectionToProgram('right');
          
          for (let dir of window.algorithmsModule.program) {
            window.algorithmsModule.executeSingleMove(dir);
          }
          window.algorithmsModule.render();

          return {
            mazeResult: window.algorithmsModule.mazeResult,
            hasFinalCelebration: document.querySelector('.final-celebration-card') !== null,
            completedStepsCount: window.algorithmsModule.completedSteps.size
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Step 7 Final Celebration result:', res.result.value);

    // Screenshot Step 7
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Ismae\\.gemini\\antigravity\\brain\\0d9e1921-82a7-413c-a85d-a957ed6a47ea\\algoritmos_celebracion_final.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot: algoritmos_celebracion_final.png');

    // --- 6. Testing Grades 2 to 5 Adaptation ---
    console.log('--- 6. Testing Grades 2 to 5 Adaptation ---');
    for (let g = 2; g <= 5; g++) {
      res = await send('Runtime.evaluate', {
        expression: `
          (function() {
            window.algorithmsModule.startClass(${g}, 1);
            return {
              grade: window.algorithmsModule.currentGrade,
              isUppercase: document.querySelector('.grade-1-uppercase') !== null,
              cafeStepsCount: window.algorithmsModule.EVERYDAY_ACTIVITIES.cafe.steps[${g}].length,
              mazeCols: window.algorithmsModule.ALL_MAZES[${g}].d1_mecanico.cols,
              mazeRows: window.algorithmsModule.ALL_MAZES[${g}].d1_mecanico.rows
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Grade ' + g + ' verification:', res.result.value);
    }

    console.log('\n=== ALL CDP TESTS COMPLETED SUCCESSFULLY! ===');
    ws.close();
  } catch (err) {
    console.error('CDP Error:', err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
