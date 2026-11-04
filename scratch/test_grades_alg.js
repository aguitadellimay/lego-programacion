const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8132;
const CDP_PORT = 9272;
const ROOT = path.resolve('.');

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

    for (let grade = 1; grade <= 5; grade++) {
      const res = await send('Runtime.evaluate', {
        awaitPromise: true,
        returnByValue: true,
        expression: `
          new Promise(async (resolve) => {
            window.codingManager.loadGrade(${grade});
            await new Promise(r => setTimeout(r, 100));
            const algCard = document.getElementById('topic-card-algorithms');
            const btnStart = document.getElementById('btn-start-algorithms-topic');
            
            // Check button click
            btnStart.click();
            await new Promise(r => setTimeout(r, 100));
            const activeAfterBtn = document.querySelector('.screen.active')?.id;
            
            // Back to syllabus
            const btnBack = document.getElementById('btn-alg-back-syllabus');
            if (btnBack) btnBack.click();
            await new Promise(r => setTimeout(r, 100));

            // Check card click
            algCard.click();
            await new Promise(r => setTimeout(r, 100));
            const activeAfterCard = document.querySelector('.screen.active')?.id;

            // Back to syllabus again
            if (btnBack) btnBack.click();
            await new Promise(r => setTimeout(r, 100));

            resolve({ grade: ${grade}, activeAfterBtn, activeAfterCard });
          })
        `
      });
      console.log('Grade', grade, ':', res.result.value);
    }
  } catch (e) {
    console.error(e);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
