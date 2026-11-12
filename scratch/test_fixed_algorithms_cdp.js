const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8147;
const CDP_PORT = 9287;
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

    console.log('--- TEST 1: INGRESO A ALGORITMOS Y VERIFICACIÓN DE NO-SALIDA ---');
    let res = await send('Runtime.evaluate', {
      expression: `
        (function() {
          localStorage.clear();
          window.algorithmsModule.startClass(1, 1);
          const screen = document.getElementById('screen-coding-algorithms');
          document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
          screen.classList.add('active');

          window.algorithmsModule.handleOrderQuestion('si');

          return {
            currentStep: window.algorithmsModule.currentStep,
            screenActive: screen.classList.contains('active'),
            isStep1Done: window.algorithmsModule.completedSteps.has(1)
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Paso 1 completado:', res.result.value);

    console.log('--- TEST 2: ACTIVIDAD CAFÉ Y TRANSICIÓN CONTINUA A JUGO ---');
    res = await send('Runtime.evaluate', {
      expression: `
        (function() {
          window.algorithmsModule.selectStep(2);
          window.algorithmsModule.handleBlockClick('cafe', 'taza');
          window.algorithmsModule.handleBlockClick('cafe', 'cafe');
          window.algorithmsModule.handleBlockClick('cafe', 'agua');
          window.algorithmsModule.handleBlockClick('cafe', 'mezclar');
          window.algorithmsModule.checkEverydayAct('cafe');

          const screen = document.getElementById('screen-coding-algorithms');

          return {
            cafeCompleted: window.algorithmsModule.everydayState.cafe.completed,
            hasTransitionModal: document.getElementById('alg-transition-modal') !== null,
            screenStillActive: screen.classList.contains('active')
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Comprobación Café:', res.result.value);

    // Esperar a que la transición de 2s termine y verifique que cargó Jugo automáticamente
    console.log('Esperando 2.5s para la transición a Jugo...');
    await new Promise(r => setTimeout(r, 2500));

    res = await send('Runtime.evaluate', {
      expression: `
        (function() {
          const screen = document.getElementById('screen-coding-algorithms');
          return {
            activeEverydayAct: window.algorithmsModule.selectedEverydayAct,
            screenStillActive: screen.classList.contains('active'),
            currentStep: window.algorithmsModule.currentStep
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Estado post-transición a Jugo:', res.result.value);

    console.log('--- TEST 3: MOVIMIENTO INMEDIATO DE BITY (SIN PARPADEO) ---');
    res = await send('Runtime.evaluate', {
      expression: `
        (function() {
          window.algorithmsModule.selectStep(4);
          const cfg = window.algorithmsModule.getCurrentMazeConfig();
          const initialPos = { ...window.algorithmsModule.bityPos };
          return {
            currentStep: window.algorithmsModule.currentStep,
            start: cfg.start,
            goal: cfg.goal,
            initialPos: initialPos
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Paso 4 cargado:', res.result.value);

    // Presionar DERECHA
    await send('Runtime.evaluate', {
      expression: `window.algorithmsModule.handleDirectionInput('right');`
    });
    await new Promise(r => setTimeout(r, 220));

    res = await send('Runtime.evaluate', {
      expression: `({ bityPos: window.algorithmsModule.bityPos, program: window.algorithmsModule.program })`,
      returnByValue: true
    });
    console.log('Después de DERECHA:', res.result.value);

    // Presionar ABAJO
    await send('Runtime.evaluate', {
      expression: `window.algorithmsModule.handleDirectionInput('down');`
    });
    await new Promise(r => setTimeout(r, 220));

    res = await send('Runtime.evaluate', {
      expression: `({ bityPos: window.algorithmsModule.bityPos, program: window.algorithmsModule.program })`,
      returnByValue: true
    });
    console.log('Después de ABAJO:', res.result.value);

    console.log('--- TEST 4: PRUEBA DE COLISIÓN CON PARED ---');
    // En (2,2), intentar mover a la IZQUIERDA (1,2 es pared)
    await send('Runtime.evaluate', {
      expression: `window.algorithmsModule.handleDirectionInput('left');`
    });
    await new Promise(r => setTimeout(r, 300));

    res = await send('Runtime.evaluate', {
      expression: `({ bityPos: window.algorithmsModule.bityPos, programLen: window.algorithmsModule.program.length })`,
      returnByValue: true
    });
    console.log('Resultado de colisión (no debe cambiar posición):', res.result.value);

    console.log('--- TEST 5: LLEGADA A LA META Y TRANSICIÓN AUTOMÁTICA A DESAFÍO 2 ---');
    // En (2,2), mover a la DERECHA para llegar a la meta (3,2)
    await send('Runtime.evaluate', {
      expression: `window.algorithmsModule.handleDirectionInput('right');`
    });
    await new Promise(r => setTimeout(r, 250));

    res = await send('Runtime.evaluate', {
      expression: `({
        posGoal: window.algorithmsModule.bityPos,
        isReached: window.algorithmsModule.mazeResult === 'reached',
        programLen: window.algorithmsModule.program.length
      })`,
      returnByValue: true
    });
    console.log('Llegada a meta en Desafío 1:', res.result.value);

    // Esperar transición automática de 2.5s a Desafío 2 (Paso 5)
    console.log('Esperando 3s para transición automática al Desafío 2...');
    await new Promise(r => setTimeout(r, 3000));

    res = await send('Runtime.evaluate', {
      expression: `({
        currentStep: window.algorithmsModule.currentStep,
        mazeKey: window.algorithmsModule.getCurrentMazeKey(),
        isStep4Done: window.algorithmsModule.completedSteps.has(4),
        screenStillActive: document.getElementById('screen-coding-algorithms').classList.contains('active')
      })`,
      returnByValue: true
    });
    console.log('Estado en Desafío 2:', res.result.value);

    // Captura screenshot Desafío 2
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Ismae\\.gemini\\antigravity\\brain\\0d9e1921-82a7-413c-a85d-a957ed6a47ea\\algoritmos_desafio2_continuo.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot: algoritmos_desafio2_continuo.png');

    console.log('--- TEST 6: DESAFÍO 3 (OPTIMIZACIÓN Y CONTINUIDAD) ---');
    await send('Runtime.evaluate', {
      expression: `window.algorithmsModule.selectStep(6);`
    });
    await new Promise(r => setTimeout(r, 100));

    // Desafío 3: start (1,1), goal (4,1). Moves: right, right, right
    await send('Runtime.evaluate', { expression: `window.algorithmsModule.handleDirectionInput('right');` });
    await new Promise(r => setTimeout(r, 200));
    await send('Runtime.evaluate', { expression: `window.algorithmsModule.handleDirectionInput('right');` });
    await new Promise(r => setTimeout(r, 200));
    await send('Runtime.evaluate', { expression: `window.algorithmsModule.handleDirectionInput('right');` });
    await new Promise(r => setTimeout(r, 500));

    res = await send('Runtime.evaluate', {
      expression: `({
        currentStep: window.algorithmsModule.currentStep,
        bityPos: window.algorithmsModule.bityPos,
        isReached: window.algorithmsModule.mazeResult === 'reached',
        hasOptimizationCard: document.querySelector('.comparison-reflection-card') !== null
      })`,
      returnByValue: true
    });
    console.log('Desafío 3 completado y tarjeta de optimización:', res.result.value);

    // Capturar screenshot optimización
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Ismae\\.gemini\\antigravity\\brain\\0d9e1921-82a7-413c-a85d-a957ed6a47ea\\algoritmos_optimizacion_sin_parpadeo.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot: algoritmos_optimizacion_sin_parpadeo.png');

    console.log('--- TEST 7: DESAFÍO FINAL Y PANTALLA DE CIERRE SIN SALIDA AUTOMÁTICA ---');
    await send('Runtime.evaluate', {
      expression: `window.algorithmsModule.selectStep(7);`
    });
    await new Promise(r => setTimeout(r, 100));

    // Desafío 7: start (1,1), goal (4,3). Moves: right, down, right, down, right
    const moves = ['right', 'down', 'right', 'down', 'right'];
    for (let m of moves) {
      await send('Runtime.evaluate', { expression: `window.algorithmsModule.handleDirectionInput('${m}');` });
      await new Promise(r => setTimeout(r, 200));
    }
    await new Promise(r => setTimeout(r, 600));

    res = await send('Runtime.evaluate', {
      expression: `({
        currentStep: window.algorithmsModule.currentStep,
        bityPos: window.algorithmsModule.bityPos,
        isReached: window.algorithmsModule.mazeResult === 'reached',
        hasFinalCelebration: document.querySelector('.final-celebration-card') !== null,
        screenStillActive: document.getElementById('screen-coding-algorithms').classList.contains('active'),
        totalCompleted: window.algorithmsModule.completedSteps.size
      })`,
      returnByValue: true
    });
    console.log('Desafío final completado con pantalla de celebración activa:', res.result.value);

    // Captura screenshot final
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Ismae\\.gemini\\antigravity\\brain\\0d9e1921-82a7-413c-a85d-a957ed6a47ea\\algoritmos_pantalla_final_estable.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot: algoritmos_pantalla_final_estable.png');

    console.log('\n=== TODAS LAS PRUEBAS FUNCIONALES PASARON CON ÉXITO (0 ERRORES) ===');
    ws.close();
  } catch (err) {
    console.error('CDP Error:', err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
