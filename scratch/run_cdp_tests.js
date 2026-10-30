const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8098;
const CDP_PORT = 9235;
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
  console.log(`Server running on http://localhost:${PORT}`);
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

    for (let i = 0; i < 25; i++) {
      const readyRes = await send('Runtime.evaluate', {
        expression: 'Boolean(document.body && document.readyState === "complete" && window.BityBlocklyGame)'
      });
      if (readyRes?.result?.value) break;
      await new Promise(r => setTimeout(r, 250));
    }

    console.log('Chrome connected, running in-browser test suite...');

    const evalResult = await send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `
        new Promise(async (resolve, reject) => {
          try {
            const results = {};

            // 1. Initialize BityBlockly in Grade 1
            if (!window.bityBlocklyGame) {
              window.bityBlocklyGame = new window.BityBlocklyGame({ grade: 1 });
            }
            const game = window.bityBlocklyGame;
            game.selectGrade(1);
            await new Promise(r => setTimeout(r, 250));

            const companionBox = document.getElementById('bity-guide-companion-box');
            const avatarSvg = document.querySelector('#bity-guide-avatar-container svg');
            const nametag = document.getElementById('bity-guide-nametag')?.textContent.trim();
            const speakerBadge = document.getElementById('bity-guide-speaker-badge')?.textContent.trim();
            const initialMsg = document.getElementById('bity-guide-message')?.textContent.trim();
            const askBtn = document.getElementById('btn-bity-ask-hint');
            const askBtnLabel = document.getElementById('btn-bity-ask-hint-text')?.textContent.trim();

            const fwdLabel = document.querySelector('#btn-bityblockly-add-forward .block-label-text')?.textContent.trim();
            const leftLabel = document.querySelector('#btn-bityblockly-add-left .block-label-text')?.textContent.trim();
            const rightLabel = document.querySelector('#btn-bityblockly-add-right .block-label-text')?.textContent.trim();
            const backLabel = document.getElementById('btn-bityblockly-back')?.textContent.trim();
            const resetLabel = document.getElementById('btn-bityblockly-reset')?.textContent.trim();
            const clearLabel = document.getElementById('btn-bityblockly-clear')?.textContent.trim();
            const runLabel = document.getElementById('btn-bityblockly-run')?.textContent.trim();

            // Computed text-transform on Grade 1 elements
            const msgEl = document.getElementById('bity-guide-message');
            const msgComputedTransform = window.getComputedStyle(msgEl).textTransform;

            results.g1Init = {
              hasCompanionBox: !!companionBox,
              hasAvatarSvg: !!avatarSvg,
              nametag,
              speakerBadge,
              initialMsg,
              askBtnLabel,
              fwdLabel,
              leftLabel,
              rightLabel,
              backLabel,
              resetLabel,
              clearLabel,
              runLabel,
              msgComputedTransform
            };

            // 2. Test "PEDIR UNA PISTA" click
            askBtn.click();
            await new Promise(r => setTimeout(r, 200));
            const hintMsg = document.getElementById('bity-guide-message')?.textContent.trim();
            results.g1Hint = { hintMsg };

            // 3. Test Block addition & turn tips
            game.addBlock('forward');
            await new Promise(r => setTimeout(r, 100));
            const forwardMsg = document.getElementById('bity-guide-message')?.textContent.trim();

            game.addBlock('left');
            await new Promise(r => setTimeout(r, 100));
            const turnMsg = document.getElementById('bity-guide-message')?.textContent.trim();
            results.g1Coding = { forwardMsg, turnMsg };

            // 4. Test Wall Hit guidance
            game.clearBlocks();
            game.addBlock('left');
            game.addBlock('forward');
            game.runProgram();
            await new Promise(r => setTimeout(r, 1500));
            const wallMsg = document.getElementById('bity-guide-message')?.textContent.trim();
            const isStopped = !game.isRunning;
            results.g1Wall = { wallMsg, isStopped };

            // 5. Test Door Challenge in Grade 1
            game.triggerMathChallengeForDoor(3, 1);
            await new Promise(r => setTimeout(r, 250));
            const mathModal = document.getElementById('bityblockly-math-modal');
            const mathModalActive = mathModal?.classList.contains('active');
            const mathStory = document.getElementById('bityblockly-math-story')?.textContent.trim();
            const mathEq = document.getElementById('bityblockly-math-equation')?.textContent.trim();
            const doorGuideMsg = document.getElementById('bity-guide-message')?.textContent.trim();

            results.g1Door = {
              mathModalActive,
              mathStory,
              mathEq,
              doorGuideMsg
            };

            // Close math modal
            mathModal?.classList.remove('active');
            game.isPausedForMath = false;

            // 6. Test Grades 2, 3, 4, 5
            results.otherGrades = {};
            for (const g of [2, 3, 4, 5]) {
              game.selectGrade(g);
              await new Promise(r => setTimeout(r, 150));

              const gNametag = document.getElementById('bity-guide-nametag')?.textContent.trim();
              const gMsg = document.getElementById('bity-guide-message')?.textContent.trim();
              const gFwd = document.querySelector('#btn-bityblockly-add-forward .block-label-text')?.textContent.trim();
              const gAsk = document.getElementById('btn-bity-ask-hint-text')?.textContent.trim();
              const gTransform = window.getComputedStyle(document.getElementById('bity-guide-message')).textTransform;

              results.otherGrades[g] = {
                nametag: gNametag,
                msg: gMsg,
                fwdLabel: gFwd,
                askLabel: gAsk,
                textTransform: gTransform
              };
            }

            // 7. Test Final Challenges presence for all grades
            results.finalChallenges = {};
            for (const g of [1, 2, 3, 4, 5]) {
              game.selectGrade(g);
              const gData = window.BITYBLOCKLY_GRADES_DATA[g];
              const finalLvl = gData.missions.length;
              game.loadLevel(finalLvl);
              await new Promise(r => setTimeout(r, 150));

              const hasGuide = !!document.getElementById('bity-guide-companion-box');
              const finalBadge = document.getElementById('bityblockly-badge-text')?.textContent.trim();
              const finalMsg = document.getElementById('bity-guide-message')?.textContent.trim();

              results.finalChallenges[g] = {
                hasGuide,
                finalBadge,
                finalMsg
              };
            }

            resolve(results);
          } catch (e) {
            reject({ error: e.message, stack: e.stack });
          }
        })
      `
    });

    console.log('\n--- CDP Evaluation Results ---');
    if (evalResult?.result?.value) {
      const res = evalResult.result.value;
      console.log('1. Grade 1 Guide Initial:', res.g1Init);
      console.log('2. Grade 1 Hint Click:', res.g1Hint);
      console.log('3. Grade 1 Coding & Turn:', res.g1Coding);
      console.log('4. Grade 1 Wall Hit:', res.g1Wall);
      console.log('5. Grade 1 Door:', res.g1Door);
      console.log('6. Grades 2-5 Data:', res.otherGrades);
      console.log('7. Final Challenges:', res.finalChallenges);

      // Asserts
      if (!res.g1Init.hasCompanionBox) throw new Error('Grade 1 companion box missing');
      if (!res.g1Init.hasAvatarSvg) throw new Error('Grade 1 avatar SVG missing');
      if (res.g1Init.nametag !== 'BITY') throw new Error('Grade 1 nametag mismatch');
      if (res.g1Init.fwdLabel !== 'AVANZAR') throw new Error('Grade 1 forward label not AVANZAR');
      if (res.g1Init.msgComputedTransform !== 'uppercase') throw new Error('Grade 1 text-transform not uppercase');
      if (res.g1Init.initialMsg !== res.g1Init.initialMsg.toUpperCase()) throw new Error('Grade 1 initialMsg not uppercase');

      if (!res.g1Door.mathModalActive) throw new Error('Math modal not activated');
      if (res.g1Door.mathStory !== res.g1Door.mathStory.toUpperCase()) throw new Error('Math story not uppercase in Grade 1');

      for (const g of [2, 3, 4, 5]) {
        const og = res.otherGrades[g];
        if (og.fwdLabel !== 'Avanzar') throw new Error(`Grade ${g} forward label not Avanzar`);
        if (og.textTransform !== 'none') throw new Error(`Grade ${g} textTransform not none`);
      }

      for (const g of [1, 2, 3, 4, 5]) {
        if (!res.finalChallenges[g].hasGuide) throw new Error(`Final challenge in Grade ${g} missing guide`);
      }

      console.log('\n>>> ALL 7 IN-BROWSER VALIDATIONS PASSED PERFECTLY! <<<');
    } else {
      console.error('Evaluation failed or returned empty:', evalResult);
      process.exitCode = 1;
    }

  } catch (err) {
    console.error('Fatal test error:', err);
    process.exitCode = 1;
  } finally {
    chrome.kill();
    server.close();
    process.exit(process.exitCode || 0);
  }
});
