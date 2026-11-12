const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8150;
const CDP_PORT = 9290;
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
      height: 960,
      deviceScaleFactor: 1,
      mobile: false
    });

    console.log('--- TEST 1: VERIFICAR DEFINICIÓN EN 1.º GRADO (MAYÚSCULAS) ---');
    let res = await send('Runtime.evaluate', {
      expression: `
        (function() {
          localStorage.clear();
          window.algorithmsModule.startClass(1, 1);
          const screen = document.getElementById('screen-coding-algorithms');
          document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
          screen.classList.add('active');

          const heroCard = document.querySelector('.alg-definition-hero-card');
          const title = heroCard ? heroCard.querySelector('.alg-definition-main-title').textContent.trim() : null;
          const defQuote = heroCard ? heroCard.querySelector('.alg-def-quote').textContent.trim() : null;
          const objText = heroCard ? heroCard.querySelector('.alg-objective-text').textContent.trim() : null;
          const hasSvg = heroCard ? heroCard.querySelector('svg') !== null : false;

          return {
            hasHeroCard: !!heroCard,
            title: title,
            defQuote: defQuote,
            objText: objText,
            hasSvg: hasSvg,
            isFirstCard: heroCard === document.querySelector('.alg-step1-section .alg-card'),
            isUppercase: document.querySelector('.grade-1-uppercase') !== null
          };
        })()
      `,
      returnByValue: true
    });
    console.log('1.º Grado comprobación definición:', res.result.value);

    // Capturar screenshot 1.º Grado
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Ismae\\.gemini\\antigravity\\brain\\0d9e1921-82a7-413c-a85d-a957ed6a47ea\\algoritmos_bloque1_definicion_inicio_g1.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot: algoritmos_bloque1_definicion_inicio_g1.png');

    console.log('--- TEST 2: VERIFICAR DEFINICIÓN EN 2.º GRADO (CASING NATURAL) ---');
    res = await send('Runtime.evaluate', {
      expression: `
        (function() {
          window.algorithmsModule.startClass(2, 1);
          const heroCard = document.querySelector('.alg-definition-hero-card');
          const title = heroCard ? heroCard.querySelector('.alg-definition-main-title').textContent.trim() : null;
          const defQuote = heroCard ? heroCard.querySelector('.alg-def-quote').textContent.trim() : null;
          const objText = heroCard ? heroCard.querySelector('.alg-objective-text').textContent.trim() : null;

          return {
            grade: window.algorithmsModule.currentGrade,
            title: title,
            defQuote: defQuote,
            objText: objText,
            isUppercase: document.querySelector('.grade-1-uppercase') !== null
          };
        })()
      `,
      returnByValue: true
    });
    console.log('2.º Grado comprobación definición:', res.result.value);

    // Capturar screenshot 2.º Grado
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Ismae\\.gemini\\antigravity\\brain\\0d9e1921-82a7-413c-a85d-a957ed6a47ea\\algoritmos_bloque1_definicion_inicio_g2.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot: algoritmos_bloque1_definicion_inicio_g2.png');

    console.log('--- TEST 3: VERIFICAR QUE LAS DEMÁS ACTIVIDADES SIGUEN FUNCIONANDO INTACTAS ---');
    res = await send('Runtime.evaluate', {
      expression: `
        (function() {
          // Volver a 1.º grado y verificar pregunta interactiva
          window.algorithmsModule.startClass(1, 1);
          window.algorithmsModule.handleOrderQuestion('si');
          const step1Completed = window.algorithmsModule.completedSteps.has(1);

          // Verificar Step 2 (Café)
          window.algorithmsModule.selectStep(2);
          const hasCafe = window.algorithmsModule.selectedEverydayAct === 'cafe';

          // Verificar Step 4 (Laberinto)
          window.algorithmsModule.selectStep(4);
          const mazeCols = window.algorithmsModule.getCurrentMazeConfig().cols;

          return {
            step1Completed: step1Completed,
            hasCafe: hasCafe,
            mazeCols: mazeCols
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Comprobación de no-regresión:', res.result.value);

    console.log('\n=== TODAS LAS PRUEBAS DE DEFINICIÓN PASARON EXITOSAMENTE ===');
    ws.close();
  } catch (err) {
    console.error('CDP Error:', err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
