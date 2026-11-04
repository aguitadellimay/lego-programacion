const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8135;
const CDP_PORT = 9275;
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

    // Enable Runtime and Page domains
    await send('Runtime.enable');
    await send('Page.enable');

    const consoleErrors = [];
    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.method === 'Runtime.consoleAPICalled' && data.params.type === 'error') {
        consoleErrors.push(data.params.args);
      }
      if (data.method === 'Runtime.exceptionThrown') {
        consoleErrors.push(data.params.exceptionDetails);
      }
    });

    console.log('--- TEST 1: User Flow from Home -> Programación -> Grade 1 -> Algoritmos ---');
    const test1 = await send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `
        new Promise(async (resolve) => {
          const report = {};
          
          // 1. Initial screen
          report.initialScreen = document.querySelector('.screen.active')?.id;
          
          // 2. Click "¡Aprender a Programar!"
          const btnCoding = document.getElementById('btn-home-coding');
          btnCoding.click();
          await new Promise(r => setTimeout(r, 150));
          report.afterClickCoding = document.querySelector('.screen.active')?.id;

          // 3. Select 1.º Grado
          const g1Card = document.querySelector('.coding-g-1');
          g1Card.click();
          await new Promise(r => setTimeout(r, 150));
          report.afterSelectGrade1 = document.querySelector('.screen.active')?.id;

          // 4. Inspect topic-card-algorithms
          const algCard = document.getElementById('topic-card-algorithms');
          const btnStartAlg = document.getElementById('btn-start-algorithms-topic');
          report.algCardVisible = !!algCard && getComputedStyle(algCard).display !== 'none';
          report.btnStartAlgText = btnStartAlg ? btnStartAlg.innerText.trim() : null;

          // 5. Click Algoritmos card
          algCard.click();
          await new Promise(r => setTimeout(r, 200));
          report.afterClickAlgCard = document.querySelector('.screen.active')?.id;

          // 6. Verify contents of screen-coding-algorithms
          const algScreen = document.getElementById('screen-coding-algorithms');
          report.algScreenDisplay = algScreen ? getComputedStyle(algScreen).display : null;
          report.hasTitle = !!document.querySelector('.algorithms-breadcrumb');
          report.titleText = document.querySelector('.breadcrumb-current')?.innerText.trim();
          report.gradeBadgeText = document.querySelector('.algorithms-grade-badge')?.innerText.trim();
          report.stepPillsCount = document.querySelectorAll('.step-pill').length;

          // 7. Click Volver al Temario
          const btnBack = document.getElementById('btn-alg-back-syllabus');
          report.hasBackButton = !!btnBack;
          if (btnBack) {
            btnBack.click();
            await new Promise(r => setTimeout(r, 200));
            report.afterClickBack = document.querySelector('.screen.active')?.id;
            report.algScreenActiveAfterBack = algScreen.classList.contains('active');
          }

          // 8. Now test clicking directly on the BUTTON (btn-start-algorithms-topic)
          if (btnStartAlg) {
            btnStartAlg.click();
            await new Promise(r => setTimeout(r, 200));
            report.afterClickAlgButton = document.querySelector('.screen.active')?.id;
          }

          resolve(report);
        })
      `
    });
    console.log('Test 1 Results:', JSON.stringify(test1.result.value, null, 2));

    console.log('--- TEST 2: Testing Grades 1 to 5 Navigation ---');
    for (let g = 1; g <= 5; g++) {
      const gradeRes = await send('Runtime.evaluate', {
        awaitPromise: true,
        returnByValue: true,
        expression: `
          new Promise(async (resolve) => {
            window.codingManager.loadGrade(${g});
            await new Promise(r => setTimeout(r, 100));
            
            const btnStart = document.getElementById('btn-start-algorithms-topic');
            btnStart.click();
            await new Promise(r => setTimeout(r, 150));
            
            const activeScreen = document.querySelector('.screen.active')?.id;
            const badge = document.querySelector('.algorithms-grade-badge')?.innerText.trim();
            const isG1Mode = document.getElementById('screen-coding-algorithms')?.classList.contains('grade-1-active');

            // Volver
            const btnBack = document.getElementById('btn-alg-back-syllabus');
            if (btnBack) btnBack.click();
            await new Promise(r => setTimeout(r, 100));

            resolve({ grade: ${g}, activeScreen, badge, isG1Mode });
          })
        `
      });
      console.log(`Grade ${g} Test:`, gradeRes.result.value);
    }

    console.log('--- TEST 3: Page Reload (F5) inside ALGORITMOS module ---');
    // First, enter Algoritmos in Grade 3
    await send('Runtime.evaluate', {
      awaitPromise: true,
      expression: `
        new Promise(async (resolve) => {
          window.codingManager.loadGrade(3);
          window.codingManager.startAlgorithmsTopic();
          await new Promise(r => setTimeout(r, 200));
          resolve(true);
        })
      `
    });

    const screenBeforeReload = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: 'document.querySelector(".screen.active")?.id'
    });
    console.log('Active screen before reload:', screenBeforeReload.result.value);

    // Reload the page
    console.log('Reloading page via Page.reload...');
    await send('Page.reload');
    await new Promise(r => setTimeout(r, 2000));

    const afterReload = await send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `
        new Promise((resolve) => {
          const activeScreen = document.querySelector('.screen.active')?.id;
          const algScreen = document.getElementById('screen-coding-algorithms');
          const mount = document.getElementById('algorithms-content-mount');
          const badge = document.querySelector('.algorithms-grade-badge')?.innerText.trim();
          const step1Visible = !!document.getElementById('alg-step-content-1');
          
          resolve({
            activeScreen,
            algScreenActive: algScreen ? algScreen.classList.contains('active') : false,
            algScreenDisplay: algScreen ? getComputedStyle(algScreen).display : null,
            mountHasChildren: mount ? mount.children.length > 0 : false,
            gradeBadge: badge,
            step1Visible
          });
        })
      `
    });
    console.log('After Reload Results:', JSON.stringify(afterReload.result.value, null, 2));

    console.log('--- TEST 4: Capture Screenshot for Artifacts ---');
    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    const screenshotPath = path.resolve('scratch', 'screenshot_algorithms_restored.png');
    fs.writeFileSync(screenshotPath, Buffer.from(screenshot.data, 'base64'));
    console.log('Screenshot saved to:', screenshotPath);

    console.log('Console Errors encountered during tests:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.log('Errors details:', JSON.stringify(consoleErrors, null, 2));
    }

  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
