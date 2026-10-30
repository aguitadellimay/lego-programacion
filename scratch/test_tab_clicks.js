// scratch/test_tab_clicks.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8094;
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
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9226',
    'http://localhost:' + PORT + '/index.html'
  ]);
  await new Promise(r => setTimeout(r, 1500));
  try {
    const targetsRes = await fetch('http://localhost:9226/json');
    const targets = await targetsRes.json();
    const pageTarget = targets.find(t => t.type === 'page' && t.url.includes('localhost')) || targets[0];
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    let id = 1;
    const send = (method, params = {}) => new Promise(r => {
      const msgId = id++;
      const handler = e => {
        const d = JSON.parse(e.data);
        if (d.id === msgId) { ws.removeEventListener('message', handler); r(d.result); }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
    await new Promise(r => ws.addEventListener('open', r));

    const pageInfo = await send('Runtime.evaluate', {
      expression: '({ href: window.location.href, title: document.title, readyState: document.readyState })',
      returnByValue: true
    });
    console.log('Page info:', pageInfo.result.value);

    // Start BityBlockly
    const clickBanner = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.getElementById("btn-banner-start-bityblockly");
          if (!btn) return "NO btn-banner-start-bityblockly";
          btn.click();
          return {
            gameCreated: !!window.bityBlocklyGame,
            screenActive: document.getElementById('screen-bityblockly')?.classList.contains('active'),
            coverDisplay: document.getElementById('bityblockly-cover-view')?.style.display,
            playDisplay: document.getElementById('bityblockly-play-view')?.style.display
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Click Banner Result:', JSON.stringify(clickBanner.result?.value || clickBanner, null, 2));

    // Click grade 4
    await send('Runtime.evaluate', { expression: 'window.bityBlocklyGame.selectGrade(4)' });
    await new Promise(r => setTimeout(r, 400));

    // Click Grade 4 and test tabs 0, 1, 2
    await send('Runtime.evaluate', { expression: 'window.bityBlocklyGame.selectGrade(4)' });
    await new Promise(r => setTimeout(r, 400));

    const resG4 = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const tabs = document.querySelectorAll('#bityblockly-levels-tabs .bityblockly-tab-btn');
          const results = [];
          [0, 1, 2].forEach(idx => {
            tabs[idx].click();
            results.push({
              tabIndex: idx + 1,
              tabText: tabs[idx].textContent.trim(),
              title: document.getElementById('bityblockly-level-title').textContent,
              mission: window.bityBlocklyGame.getCurrentMissionConfig().name,
              canvasVisible: window.getComputedStyle(document.getElementById('bityblockly-canvas-card')).display,
              grid: !!window.bityBlocklyGame.getCurrentMissionConfig().grid
            });
          });
          return { tabCount: tabs.length, results };
        })()
      `,
      returnByValue: true
    });
    console.log('Grade 4 Mazes Result:', JSON.stringify(resG4.result?.value || resG4, null, 2));

    // Click Grade 5 and test tabs 0, 1, 2
    await send('Runtime.evaluate', { expression: 'window.bityBlocklyGame.selectGrade(5)' });
    await new Promise(r => setTimeout(r, 400));

    const resG5 = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const tabs = document.querySelectorAll('#bityblockly-levels-tabs .bityblockly-tab-btn');
          const results = [];
          [0, 1, 2].forEach(idx => {
            tabs[idx].click();
            results.push({
              tabIndex: idx + 1,
              tabText: tabs[idx].textContent.trim(),
              title: document.getElementById('bityblockly-level-title').textContent,
              mission: window.bityBlocklyGame.getCurrentMissionConfig().name,
              canvasVisible: window.getComputedStyle(document.getElementById('bityblockly-canvas-card')).display,
              grid: !!window.bityBlocklyGame.getCurrentMissionConfig().grid
            });
          });
          return { tabCount: tabs.length, results };
        })()
      `,
      returnByValue: true
    });
    console.log('Grade 5 Mazes Result:', JSON.stringify(resG5.result?.value || resG5, null, 2));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
