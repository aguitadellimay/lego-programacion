const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8117;
const CDP_PORT = 9257;
const ROOT = path.resolve(__dirname, '..');

const server = http.createServer((req, res) => {
  let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    if (ext === '.js') contentType = 'application/javascript';
    else if (ext === '.css') contentType = 'text/css';
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
  const targetsRes = await fetch(`http://localhost:${CDP_PORT}/json`);
  const targets = await targetsRes.json();
  const pageTarget = targets.find(t => t.type === 'page');

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const send = (method, params = {}) => new Promise(resolve => {
    const msgId = id++;
    const handler = (e) => {
      const d = JSON.parse(e.data);
      if (d.id === msgId) {
        ws.removeEventListener('message', handler);
        resolve(d.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  await new Promise(r => ws.addEventListener('open', r));

  const check = await send('Runtime.evaluate', {
    expression: `
      (() => {
        return {
          hasBityBlockly: !!window.bityBlockly,
          currentGrade: window.bityBlockly ? window.bityBlockly.currentGrade : null,
          upEl: document.getElementById('btn-bityblockly-add-up')?.querySelector('.block-label-text')?.textContent
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Check before selectGrade:', check.result.value);

  const afterSelect = await send('Runtime.evaluate', {
    expression: `
      (() => {
        if (window.bityBlockly) {
          window.bityBlockly.selectGrade(1);
        }
        return {
          currentGrade: window.bityBlockly ? window.bityBlockly.currentGrade : null,
          upEl: document.getElementById('btn-bityblockly-add-up')?.querySelector('.block-label-text')?.textContent
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Check after selectGrade(1):', afterSelect.result.value);

  chrome.kill();
  server.close();
  process.exit(0);
});
