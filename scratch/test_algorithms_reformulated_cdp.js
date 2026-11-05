const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8138;
const CDP_PORT = 9278;
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
  console.log(`Test server running at http://localhost:${PORT}`);
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

    await send('Runtime.enable');
    await send('Page.enable');

    console.log('--- TEST 1: Grade 1 Verification (Activities, Empty Inputs, Uppercase) ---');
    const g1Test = await send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `
        new Promise(async (resolve) => {
          localStorage.clear();
          window.codingManager.loadGrade(1);
          window.codingManager.startAlgorithmsTopic();
          await new Promise(r => setTimeout(r, 200));

          const res = {};
          res.isG1Active = document.getElementById('screen-coding-algorithms').classList.contains('grade-1-active');
          
          // Check step pills
          res.stepPills = Array.from(document.querySelectorAll('.step-pill .pill-name')).map(el => el.innerText.trim());

          // Navigate to Step 3 (Actividad 1: Mochila)
          window.algorithmsModule.goToStep(3);
          await new Promise(r => setTimeout(r, 100));

          const act1Inputs = Array.from(document.querySelectorAll('#steps-list-g1_act1_mochila .step-text-input'));
          res.act1InputsCount = act1Inputs.length;
          res.act1InputsAreEmpty = act1Inputs.every(input => input.value === '');
          res.act1Placeholder = act1Inputs[0]?.getAttribute('placeholder');

          // Navigate to Step 4 (Actividad 2: Manos)
          window.algorithmsModule.goToStep(4);
          await new Promise(r => setTimeout(r, 100));
          const act2Inputs = Array.from(document.querySelectorAll('#steps-list-g1_act2_manos .step-text-input'));
          res.act2InputsCount = act2Inputs.length;
          res.act2InputsAreEmpty = act2Inputs.every(input => input.value === '');

          // Navigate to Step 5 (Actividad 3: Dormir)
          window.algorithmsModule.goToStep(5);
          await new Promise(r => setTimeout(r, 100));
          const act3Inputs = Array.from(document.querySelectorAll('#steps-list-g1_act3_dormir .step-text-input'));
          res.act3InputsCount = act3Inputs.length;
          res.act3InputsAreEmpty = act3Inputs.every(input => input.value === '');

          resolve(res);
        })
      `
    });
    console.log('Grade 1 Test Results:', JSON.stringify(g1Test.result.value, null, 2));

    console.log('--- TEST 2: Testing Add Step, Remove Step and Writing in Grade 1 Act 1 ---');
    const g1Interaction = await send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `
        new Promise(async (resolve) => {
          window.algorithmsModule.goToStep(3);
          await new Promise(r => setTimeout(r, 100));

          const res = {};
          
          // Click "Agregar otro paso"
          const btnAdd = document.querySelector('#alg-section-3 .btn-alg-add-step');
          btnAdd.click();
          await new Promise(r => setTimeout(r, 100));
          let inputs = Array.from(document.querySelectorAll('#steps-list-g1_act1_mochila .step-text-input'));
          res.countAfterAdd = inputs.length;

          // Click remove step on last step
          const removeBtns = document.querySelectorAll('#steps-list-g1_act1_mochila .btn-remove-step');
          removeBtns[removeBtns.length - 1].click();
          await new Promise(r => setTimeout(r, 100));
          inputs = Array.from(document.querySelectorAll('#steps-list-g1_act1_mochila .step-text-input'));
          res.countAfterRemove = inputs.length;

          // Write student instructions in order
          inputs[0].value = 'Abrir el cierre de la mochila';
          inputs[0].dispatchEvent(new Event('input'));
          inputs[1].value = 'Guardar los cuadernos y la cartuchera';
          inputs[1].dispatchEvent(new Event('input'));
          inputs[2].value = 'Cerrar el cierre de la mochila';
          inputs[2].dispatchEvent(new Event('input'));
          inputs[3].value = 'Colgarse la mochila en los hombros';
          inputs[3].dispatchEvent(new Event('input'));

          // Click Save and Check
          const btnSave = document.querySelector('#alg-section-3 .btn-alg-save-activity');
          btnSave.click();
          await new Promise(r => setTimeout(r, 150));

          const feedbackBox = document.getElementById('feedback-g1_act1_mochila');
          res.feedbackVisible = feedbackBox && getComputedStyle(feedbackBox).display !== 'none';
          res.feedbackIsSuccess = feedbackBox && feedbackBox.classList.contains('feedback-success');
          res.feedbackText = feedbackBox?.innerText.trim();

          // Check if step 3 is marked completed
          res.step3Completed = window.algorithmsModule.completedSteps.has(3);

          resolve(res);
        })
      `
    });
    console.log('Grade 1 Interaction Results:', JSON.stringify(g1Interaction.result.value, null, 2));

    console.log('--- TEST 3: Verification of Grades 2 to 5 Activities (Titles, Consignas, Empty Inputs) ---');
    for (let g = 2; g <= 5; g++) {
      const gRes = await send('Runtime.evaluate', {
        awaitPromise: true,
        returnByValue: true,
        expression: `
          new Promise(async (resolve) => {
            window.codingManager.loadGrade(${g});
            window.codingManager.startAlgorithmsTopic();
            await new Promise(r => setTimeout(r, 150));

            const titles = Array.from(document.querySelectorAll('.alg-activity-title')).map(el => el.innerText.trim());
            const consignas = Array.from(document.querySelectorAll('.consigna-text')).map(el => el.innerText.trim());
            
            // Check that all inputs in all 3 activities are empty
            const allInputs = Array.from(document.querySelectorAll('.step-text-input'));
            const allEmpty = allInputs.every(input => input.value === '');

            resolve({
              grade: ${g},
              activityTitles: titles,
              consignasCount: consignas.length,
              sampleConsigna: consignas[0],
              allInputsCount: allInputs.length,
              allInputsAreEmpty: allEmpty
            });
          })
        `
      });
      console.log(`Grade ${g} Activities:`, JSON.stringify(gRes.result.value, null, 2));
    }

    console.log('--- TEST 4: Grade 4 Conditional Decision Feedback Check ---');
    const g4Check = await send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `
        new Promise(async (resolve) => {
          window.codingManager.loadGrade(4);
          window.codingManager.startAlgorithmsTopic();
          window.algorithmsModule.goToStep(3);
          await new Promise(r => setTimeout(r, 100));

          const inputs = Array.from(document.querySelectorAll('#steps-list-g4_act1_ropa_clima .step-text-input'));
          // Case A: Missing condition
          inputs[0].value = 'Ponerse la remera';
          inputs[0].dispatchEvent(new Event('input'));
          inputs[1].value = 'Ponerse el pantalón';
          inputs[1].dispatchEvent(new Event('input'));
          inputs[2].value = 'Ponerse las zapatillas';
          inputs[2].dispatchEvent(new Event('input'));

          const btnSave = document.querySelector('#alg-section-3 .btn-alg-save-activity');
          btnSave.click();
          await new Promise(r => setTimeout(r, 100));

          const fbA = document.getElementById('feedback-g4_act1_ropa_clima');
          const isHintA = fbA && fbA.classList.contains('feedback-hint');
          const textA = fbA?.innerText.trim();

          // Case B: With condition SI / ENTONCES
          inputs[0].value = 'Mirar el pronóstico del clima por la ventana';
          inputs[0].dispatchEvent(new Event('input'));
          inputs[1].value = 'SI hace frío, ENTONCES ponerse campera y abrigo';
          inputs[1].dispatchEvent(new Event('input'));
          inputs[2].value = 'SINO SI hace calor, ENTONCES usar remera liviana';
          inputs[2].dispatchEvent(new Event('input'));
          inputs[3].value = 'SI llueve, ENTONCES agarrar el paraguas';
          inputs[3].dispatchEvent(new Event('input'));

          btnSave.click();
          await new Promise(r => setTimeout(r, 100));

          const isSuccessB = fbA && fbA.classList.contains('feedback-success');
          const textB = fbA?.innerText.trim();

          resolve({ isHintA, textA, isSuccessB, textB });
        })
      `
    });
    console.log('Grade 4 Conditional Results:', JSON.stringify(g4Check.result.value, null, 2));

    console.log('--- TEST 5: Capture Screenshot of Empty Inputs & Activity Workspace ---');
    // Set to Grade 1 Actividad 1
    await send('Runtime.evaluate', {
      awaitPromise: true,
      expression: `
        new Promise(async (resolve) => {
          window.codingManager.loadGrade(1);
          window.codingManager.startAlgorithmsTopic();
          window.algorithmsModule.goToStep(3);
          await new Promise(r => setTimeout(r, 200));
          resolve(true);
        })
      `
    });

    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    const screenPath = path.resolve('scratch', 'screenshot_empty_activity_grade1.png');
    fs.writeFileSync(screenPath, Buffer.from(screenshot.data, 'base64'));
    console.log('Saved screenshot to:', screenPath);

    // Copy to artifact directory
    const dest = 'C:/Users/Ismae/.gemini/antigravity/brain/0d9e1921-82a7-413c-a85d-a957ed6a47ea/screenshot_empty_activity_grade1.png';
    fs.copyFileSync(screenPath, dest);
    console.log('Copied screenshot to artifacts directory');

  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
