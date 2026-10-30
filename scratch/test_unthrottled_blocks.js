const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8101;
const CDP_PORT = 9238;
const ROOT = path.resolve(__dirname, '..');

const server = http.createServer((req, res) => {
  let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    if (ext === '.js') contentType = 'application/javascript';
    else if (ext === '.css') contentType = 'text/css';
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

    for (let i = 0; i < 20; i++) {
      const readyRes = await send('Runtime.evaluate', {
        expression: 'Boolean(document.body && document.readyState === "complete" && window.BityBlocklyGame)'
      });
      if (readyRes?.result?.value) break;
      await new Promise(r => setTimeout(r, 200));
    }

    const res = await send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `
        new Promise(async (resolve) => {
          if (!window.bityBlocklyGame) window.bityBlocklyGame = new window.BityBlocklyGame({ grade: 2 });
          const game = window.bityBlocklyGame;
          game.selectGrade(2);
          game.lastGuideSpeakTime = 0; // reset throttle timer

          game.addBlock('forward');
          const codeMsg = document.getElementById('bity-guide-message')?.textContent.trim();

          game.lastGuideSpeakTime = 0; // reset throttle timer
          game.addBlock('right');
          const turnMsg = document.getElementById('bity-guide-message')?.textContent.trim();

          resolve({ codeMsg, turnMsg });
        })
      `
    });

    console.log('Unthrottled block additions in Grade 2:');
    console.log('Forward message:', res?.result?.value?.codeMsg);
    console.log('Turn message:', res?.result?.value?.turnMsg);

    if (!res?.result?.value?.codeMsg || !res?.result?.value?.turnMsg) {
      throw new Error('Messages empty');
    }
    console.log('Block addition messaging verified successfully!');

  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    chrome.kill();
    server.close();
    process.exit(process.exitCode || 0);
  }
});
