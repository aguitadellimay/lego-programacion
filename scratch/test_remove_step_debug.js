const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8140;
const CDP_PORT = 9280;
const ROOT = path.resolve('.');

const server = http.createServer((req, res) => {
  let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200); res.end(data);
  });
});

server.listen(PORT, async () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, ['--headless=new', '--remote-debugging-port=' + CDP_PORT, 'http://localhost:' + PORT + '/index.html']);
  await new Promise(r => setTimeout(r, 2000));
  try {
    const targetsRes = await fetch('http://localhost:' + CDP_PORT + '/json');
    const targets = await targetsRes.json();
    const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
    let id = 1;
    const send = (method, params = {}) => new Promise(resolve => {
      const msgId = id++;
      const handler = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === msgId) { ws.removeEventListener('message', handler); resolve(data.result); }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
    await new Promise(r => ws.addEventListener('open', r));
    await send('Runtime.enable');

    const evalRes = await send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `
        new Promise(async (resolve) => {
          window.codingManager.loadGrade(1);
          window.codingManager.startAlgorithmsTopic();
          window.algorithmsModule.goToStep(3);
          const actId = 'g1_act1_mochila';
          const len0 = window.algorithmsModule.activitiesData[actId].length;
          
          window.algorithmsModule.addActivityStep(actId);
          const len1 = window.algorithmsModule.activitiesData[actId].length;
          
          const btns = document.querySelectorAll('#steps-list-' + actId + ' .btn-remove-step');
          const btnsFound = btns.length;
          
          // Click the last button
          if (btnsFound > 0) {
            btns[btnsFound - 1].click();
          }
          const len2 = window.algorithmsModule.activitiesData[actId].length;
          
          resolve({ len0, len1, btnsFound, len2 });
        })
      `
    });
    console.log('Result:', evalRes.result.value);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
