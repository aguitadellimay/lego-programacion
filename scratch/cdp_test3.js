const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8091;
const ROOT = path.resolve(__dirname, '../../../../../Downloads/proyecto_lego');

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
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, async () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9224',
    `http://localhost:${PORT}/index.html`
  ]);

  await new Promise(r => setTimeout(r, 1500));

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

    ws.onopen = async () => {
      await send('Console.enable');
      await send('Runtime.enable');

      const errors = [];
      ws.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.method === 'Console.messageAdded' && data.params.message.level === 'error') {
          console.error('[BROWSER ERROR]', data.params.message.text);
          errors.push(data.params.message.text);
        }
        if (data.method === 'Runtime.exceptionThrown') {
          console.error('[BROWSER EXCEPTION]', data.params.exceptionDetails.text, data.params.exceptionDetails.exception?.description);
          errors.push(data.params.exceptionDetails.exception?.description || data.params.exceptionDetails.text);
        }
      });

      const evalCode = async (code) => {
        const res = await send('Runtime.evaluate', { expression: code, returnByValue: true, awaitPromise: true });
        if (res?.exceptionDetails) {
          console.error('[EVAL EXCEPTION]', res.exceptionDetails);
          errors.push(res.exceptionDetails.text);
        }
        return res?.result?.value;
      };

      for (let g = 1; g <= 5; g++) {
        console.log(`\n=== PROBANDO GRADO ${g} ===`);
        await evalCode(`
          // Ir a home si no esta
          const btnHome = document.getElementById('btn-back-to-home-from-coding') || document.getElementById('btn-hud-back-syllabus');
          if (btnHome) btnHome.click();
        `);
        await new Promise(r => setTimeout(r, 200));

        await evalCode(`document.getElementById('btn-home-coding').click()`);
        await new Promise(r => setTimeout(r, 200));

        await evalCode(`document.querySelector('.coding-grade-card[data-cgrade="${g}"]').click()`);
        await new Promise(r => setTimeout(r, 200));

        await evalCode(`document.getElementById('btn-start-instructions-topic').click()`);
        await new Promise(r => setTimeout(r, 200));

        // Probar cada etapa pasando de una a otra
        console.log(`Grado ${g}: Etapa 0 - Teoria`);
        await evalCode(`document.getElementById('btn-next-from-theory').click()`);
        await new Promise(r => setTimeout(r, 200));

        console.log(`Grado ${g}: Etapa 1 - Quiz`);
        await evalCode(`
          const quizBtns = document.querySelectorAll('.quiz-opt-btn');
          if (quizBtns.length > 0) quizBtns[0].click();
        `);
        await new Promise(r => setTimeout(r, 200));

        console.log(`Grado ${g}: Etapa 2 - Actividad Semilla`);
        await evalCode(`
          // Simular click en btn-next-from-quiz si existe o saltar etapa
          const nq = document.getElementById('btn-next-from-quiz');
          if (nq && nq.style.display !== 'none') nq.click();
        `);
        await new Promise(r => setTimeout(r, 200));

        // Probar si el objeto codingManager en app.js funciona bien
        console.log(`Grado ${g}: Verificando estado del contenedor...`);
        const stageHtml = await evalCode(`document.getElementById('coding-stage-container').innerHTML.substring(0, 100)`);
        console.log('Stage HTML snippet:', stageHtml);
      }

      console.log('\n--- RESULTADO DE ERRORES REGISTRADOS ---');
      console.log('Total errores:', errors.length);
      if (errors.length > 0) {
        console.log(errors);
      } else {
        console.log('No se lanzaron excepciones no capturadas en esta secuencia básica.');
      }

      chrome.kill();
      server.close();
      process.exit(0);
    };
  } catch (err) {
    console.error(err);
    chrome.kill();
    server.close();
    process.exit(1);
  }
});
