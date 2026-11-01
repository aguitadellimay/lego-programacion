const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8118;
const CDP_PORT = 9258;
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

    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    const missions = [
      { grade: 2, level: 4, name: 'laberinto_final_grado2_reformulado.png' },
      { grade: 3, level: 5, name: 'laberinto_final_grado3_reformulado.png' },
      { grade: 4, level: 7, name: 'laberinto_final_grado4_reformulado.png' }
    ];

    for (const m of missions) {
      await send('Runtime.evaluate', {
        expression: `
          window.bityBlocklyGame.selectGrade(${m.grade});
          window.bityBlocklyGame.loadLevel(${m.level});
          const modal = document.getElementById('bityblockly-instruction-concept-modal');
          if (modal) modal.classList.remove('active');
          const summary = document.getElementById('bityblockly-instruction-summary-modal');
          if (summary) summary.classList.remove('active');
        `
      });
      await new Promise(r => setTimeout(r, 300));
      const ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, m.name), Buffer.from(ss.data, 'base64'));
      console.log('Saved ' + m.name);
    }
  } catch (e) {
    console.error('Error capturing screenshots:', e);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
