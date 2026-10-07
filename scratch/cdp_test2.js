const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8090;
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
    '--remote-debugging-port=9223',
    `http://localhost:${PORT}/index.html`
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const targetsRes = await fetch('http://localhost:9223/json');
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

      ws.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.method === 'Console.messageAdded') {
          console.log('[BROWSER CONSOLE]', data.params.message.level, data.params.message.text);
        }
        if (data.method === 'Runtime.exceptionThrown') {
          console.error('[BROWSER EXCEPTION]', data.params.exceptionDetails.text, data.params.exceptionDetails.exception?.description);
        }
      });

      const evalCode = async (code) => {
        const res = await send('Runtime.evaluate', { expression: code, returnByValue: true, awaitPromise: true });
        if (res?.exceptionDetails) {
          console.error('[EVAL EXCEPTION]', res.exceptionDetails);
        }
        return res?.result?.value;
      };

      console.log('--- TEST GRADO 3: LABERINTO ---');
      await evalCode(`document.getElementById('btn-home-coding').click()`);
      await new Promise(r => setTimeout(r, 300));
      await evalCode(`document.querySelector('.coding-grade-card[data-cgrade="3"]').click()`);
      await new Promise(r => setTimeout(r, 300));
      await evalCode(`document.getElementById('btn-start-instructions-topic').click()`);
      await new Promise(r => setTimeout(r, 300));

      // Avanzar hasta la etapa del laberinto (etapa 4 / index 4)
      await evalCode(`
        window.__testMgr = null;
        // En app.js codingManager no es global! Es local dentro de DOMContentLoaded!
      `);

      // Pasamos por las etapas normales:
      // 1. Teoria
      await evalCode(`document.getElementById('btn-next-from-theory').click()`);
      await new Promise(r => setTimeout(r, 300));
      // 2. Quiz
      await evalCode(`document.querySelector('.quiz-opt-btn[data-opt="g3_q1"]').click()`);
      await new Promise(r => setTimeout(r, 300));
      await evalCode(`document.getElementById('btn-next-from-quiz').click()`);
      await new Promise(r => setTimeout(r, 300));
      // 3. Semilla
      await evalCode(`
        const pool = document.getElementById('seed-cards-pool');
        ['step_pot', 'step_soil1', 'step_seed', 'step_soil2', 'step_water'].forEach(id => {
          pool.querySelector('[data-step=\"' + id + '\"]').click();
        });
      `);
      await new Promise(r => setTimeout(r, 300));
      await evalCode(`document.getElementById('btn-next-from-seed').click()`);
      await new Promise(r => setTimeout(r, 300));

      // 4. Mochila
      console.log('En etapa 4 (Mochila): Verificar orden');
      await evalCode(`document.getElementById('btn-check-order').click()`);
      await new Promise(r => setTimeout(r, 300));

      // Ordenar mochila correctamente
      await evalCode(`
        // Simular orden correcto en la lista
        const items = document.querySelectorAll('#order-sortable-list .order-card-item');
      `);

      // ¿Qué pasa en el laberinto si ejecutamos comandos?
      // Avancemos directo a stage 4 (laberinto) manipulando stageIndex
      console.log('Probando ejecucion de comandos en grid maze...');
      
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
