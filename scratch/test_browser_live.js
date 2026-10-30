// scratch/test_browser_live.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8092;
const ROOT = path.resolve(__dirname, '..');

const server = http.createServer((req, res) => {
  let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
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
  console.log(`Server listening on port ${PORT}`);
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9224',
    `http://localhost:${PORT}/index.html`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const targetsRes = await fetch('http://localhost:9224/json');
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

    // Wait until document.body is available and readyState is complete
    for (let i = 0; i < 20; i++) {
      const readyRes = await send('Runtime.evaluate', {
        expression: 'Boolean(document.body && document.readyState === "complete")'
      });
      if (readyRes?.result?.value) break;
      await new Promise(r => setTimeout(r, 300));
    }

    // Evaluate Home Portals
    const homeResult = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const portals = Array.from(document.querySelectorAll('.home-banner-card')).map(p => ({
            id: p.id,
            display: window.getComputedStyle(p).display,
            title: p.querySelector('.banner-title')?.textContent.trim(),
            badge: p.querySelector('.banner-badge')?.textContent.trim(),
            rect: p.getBoundingClientRect()
          }));
          const grid = document.querySelector('.magic-portals-grid');
          const gridStyle = grid ? {
            display: window.getComputedStyle(grid).display,
            gridTemplateColumns: window.getComputedStyle(grid).gridTemplateColumns,
            rect: grid.getBoundingClientRect()
          } : null;

          // Test clicking banner-play
          const btnPlay = document.getElementById('btn-home-play');
          if (btnPlay) btnPlay.click();
          const modalNotice = document.getElementById('modal-module-blocked-notice');
          const playModalVisible = modalNotice ? window.getComputedStyle(modalNotice).display : 'none';
          const modalText = document.getElementById('teacher-blocked-message')?.textContent.trim();
          if (modalNotice) modalNotice.style.display = 'none';

          // Test clicking banner-editor
          const btnEditor = document.getElementById('btn-home-editor');
          if (btnEditor) btnEditor.click();
          const editorModalVisible = modalNotice ? window.getComputedStyle(modalNotice).display : 'none';
          if (modalNotice) modalNotice.style.display = 'none';

          return { portals, gridStyle, playModalVisible, editorModalVisible, modalText, bodyWidth: document.body.clientWidth };
        })()
      `,
      returnByValue: true
    });
    console.log('--- HOME PORTALS INSPECTION ---');
    console.log(JSON.stringify(homeResult.result?.value || homeResult, null, 2));

    const artifactDir = 'C:\\Users\\Ismae\\.gemini\\antigravity\\brain\\0d9e1921-82a7-413c-a85d-a957ed6a47ea';
    try {
      // Set viewport for high quality desktop screenshot
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1280,
        height: 800,
        deviceScaleFactor: 1,
        mobile: false
      });

      // Capture home portals
      const ssHome = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(artifactDir, 'home_centered_portals.png'), Buffer.from(ssHome.data, 'base64'));
      console.log('Saved screenshot: home_centered_portals.png');
    } catch (e) {
      console.error('Error saving home screenshot:', e);
    }

    // Open BityBlockly cover
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.getElementById('btn-banner-start-bityblockly');
          if (btn) btn.click();
        })()
      `
    });
    await new Promise(r => setTimeout(r, 500));

    // Check Grade 4 in BityBlockly
    const g4Check = await send('Runtime.evaluate', {
      expression: `
        (() => {
          if (!window.bityBlocklyGame) return { error: 'no bityBlocklyGame' };
          window.bityBlocklyGame.selectGrade(4);
          const tabs = Array.from(document.querySelectorAll('#bityblockly-levels-tabs .bityblockly-tab-btn')).map(t => ({
            text: t.textContent.trim(),
            level: t.dataset.level,
            title: t.title
          }));
          const title = document.getElementById('bityblockly-level-title')?.textContent;
          const badge = document.getElementById('bityblockly-badge-text')?.textContent;

          // Test clicking tab 2 and tab 3
          const allTabs = document.querySelectorAll('#bityblockly-levels-tabs .bityblockly-tab-btn');
          allTabs[1].click();
          const m2Name = window.bityBlocklyGame.getCurrentMissionConfig().name;
          const m2Canvas = window.getComputedStyle(document.getElementById('bityblockly-canvas-card')).display;

          allTabs[2].click();
          const m3Name = window.bityBlocklyGame.getCurrentMissionConfig().name;
          const m3Canvas = window.getComputedStyle(document.getElementById('bityblockly-canvas-card')).display;

          // Return to level 1
          allTabs[0].click();

          return {
            tabs,
            title,
            badge,
            currentMission: window.bityBlocklyGame.getCurrentMissionConfig().name,
            tab2Loaded: { name: m2Name, canvas: m2Canvas },
            tab3Loaded: { name: m3Name, canvas: m3Canvas }
          };
        })()
      `,
      returnByValue: true
    });
    console.log('\n--- BITYBLOCKLY GRADE 4 INSPECTION ---');
    console.log(JSON.stringify(g4Check.result?.value || g4Check, null, 2));

    // Check Grade 5 in BityBlockly
    const g5Check = await send('Runtime.evaluate', {
      expression: `
        (() => {
          if (!window.bityBlocklyGame) return { error: 'no bityBlocklyGame' };
          window.bityBlocklyGame.selectGrade(5);
          const tabs = Array.from(document.querySelectorAll('#bityblockly-levels-tabs .bityblockly-tab-btn')).map(t => ({
            text: t.textContent.trim(),
            level: t.dataset.level,
            title: t.title
          }));
          const title = document.getElementById('bityblockly-level-title')?.textContent;
          const badge = document.getElementById('bityblockly-badge-text')?.textContent;
          const config = window.bityBlocklyGame.getCurrentMissionConfig();
          const canvasVisible = window.getComputedStyle(document.getElementById('bityblockly-canvas-card')).display;
          const stageVisible = window.getComputedStyle(document.getElementById('bityblockly-interactive-stage')).display;

          // Test clicking tab 2 and tab 3
          const allTabs = document.querySelectorAll('#bityblockly-levels-tabs .bityblockly-tab-btn');
          allTabs[1].click();
          const m2Name = window.bityBlocklyGame.getCurrentMissionConfig().name;
          const m2Canvas = window.getComputedStyle(document.getElementById('bityblockly-canvas-card')).display;

          allTabs[2].click();
          const m3Name = window.bityBlocklyGame.getCurrentMissionConfig().name;
          const m3Canvas = window.getComputedStyle(document.getElementById('bityblockly-canvas-card')).display;

          // Return to level 1
          allTabs[0].click();

          return {
            tabs,
            title,
            badge,
            currentMission: config.name,
            missionType: config.type,
            canvasVisible,
            stageVisible,
            tab2Loaded: { name: m2Name, canvas: m2Canvas },
            tab3Loaded: { name: m3Name, canvas: m3Canvas }
          };
        })()
      `,
      returnByValue: true
    });
    console.log('\n--- BITYBLOCKLY GRADE 5 INSPECTION ---');
    console.log(JSON.stringify(g5Check.result?.value || g5Check, null, 2));

    try {
      const ssG5 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(artifactDir, 'bityblockly_grade5_maze.png'), Buffer.from(ssG5.data, 'base64'));
      console.log('Saved screenshot: bityblockly_grade5_maze.png');
    } catch (e) {
      console.error('Error saving g5 screenshot:', e);
    }

    ws.close();
  } catch (err) {
    console.error('CDP error:', err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
