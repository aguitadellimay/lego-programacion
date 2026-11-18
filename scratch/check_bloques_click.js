const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = path.join('.', req.url === '/' ? 'index.html' : req.url.split('?')[0]);
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

server.listen(8170, async () => {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9298',
    'http://localhost:8170/index.html'
  ]);
  await new Promise(r => setTimeout(r, 2000));
  try {
    const res = await fetch('http://localhost:9298/json');
    const targets = await res.json();
    const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
    let id = 1;
    const send = (method, params = {}) => new Promise(resolve => {
      const msgId = id++;
      const handler = (e) => {
        const d = JSON.parse(e.data);
        if (d.id === msgId) { ws.removeEventListener('message', handler); resolve(d.result); }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
    await new Promise(r => ws.addEventListener('open', r));
    await send('Runtime.enable');
    
    // Listen for exceptions
    ws.addEventListener('message', (e) => {
      const d = JSON.parse(e.data);
      if (d.method === 'Runtime.exceptionThrown') {
        console.error('EXCEPTION:', d.params.exceptionDetails);
      }
    });

    // Start algorithms
    await send('Runtime.evaluate', { expression: 'window.algorithmsModule.startClass(1, 1)' });
    await new Promise(r => setTimeout(r, 500));
    
    // Check tabs
    const tabs = await send('Runtime.evaluate', {
      expression: 'Array.from(document.querySelectorAll(".alg-step-tab")).map(t => t.textContent.trim())',
      returnByValue: true
    });
    console.log('Tabs rendered:', tabs.result.value);

    // Click tab 2 (Bloques I)
    const click2 = await send('Runtime.evaluate', {
      expression: `(() => {
        try {
          window.algorithmsModule.selectStep(2);
          return {
            currentStep: window.algorithmsModule.currentStep,
            activeAct: window.algorithmsModule.selectedEverydayAct,
            mainBody: document.querySelector('.alg-main-body')?.innerHTML?.substring(0, 500)
          };
        } catch (err) {
          return { error: err.message, stack: err.stack };
        }
      })()`,
      returnByValue: true
    });
    console.log('Click tab 2 result:', click2.result.value);

    // Click tab 3 (Bloques II)
    const click3 = await send('Runtime.evaluate', {
      expression: `(() => {
        const tabs = document.querySelectorAll('.alg-step-tab');
        tabs[2].click();
        return {
          currentStep: window.algorithmsModule.currentStep,
          activeAct: window.algorithmsModule.selectedEverydayAct,
          hasWorkspace: !!document.querySelector('.everyday-workspace-grid'),
          title: document.querySelector('.inst-title')?.textContent
        };
      })()`,
      returnByValue: true
    });
    console.log('Click tab 3 result:', click3.result.value);

    chrome.kill();
    server.close();
    process.exit(0);
  } catch (err) {
    console.error(err);
    chrome.kill();
    server.close();
    process.exit(1);
  }
});
