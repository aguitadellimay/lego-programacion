const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// 1. Create static HTTP server
const rootDir = path.resolve(__dirname, '..');
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(rootDir, reqPath);

  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

async function runTests() {
  await new Promise(resolve => server.listen(8089, resolve));
  console.log('Test server running on http://localhost:8089');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  try {
    await page.goto('http://localhost:8089/index.html', { waitUntil: 'domcontentloaded' });
    console.log('Loaded index.html in browser');

    // Test 1: Initialize BityBlockly in Grade 1
    const g1Result = await page.evaluate(async () => {
      if (!window.bityBlocklyGame) {
        window.bityBlocklyGame = new window.BityBlocklyGame({ grade: 1 });
      }
      window.bityBlocklyGame.selectGrade(1);
      await new Promise(r => setTimeout(r, 200));

      const companionBox = document.getElementById('bity-guide-companion-box');
      const avatarSvg = document.querySelector('#bity-guide-avatar-container svg');
      const nametag = document.getElementById('bity-guide-nametag')?.textContent;
      const speakerBadge = document.getElementById('bity-guide-speaker-badge')?.textContent;
      const message = document.getElementById('bity-guide-message')?.textContent;
      const askBtn = document.getElementById('btn-bity-ask-hint');
      const askBtnLabel = document.getElementById('btn-bity-ask-hint-text')?.textContent;

      const fwdLabel = document.querySelector('#btn-bityblockly-add-forward .block-label-text')?.textContent;
      const leftLabel = document.querySelector('#btn-bityblockly-add-left .block-label-text')?.textContent;
      const rightLabel = document.querySelector('#btn-bityblockly-add-right .block-label-text')?.textContent;
      const backLabel = document.getElementById('btn-bityblockly-back')?.textContent.trim();
      const resetLabel = document.getElementById('btn-bityblockly-reset')?.textContent.trim();
      const clearLabel = document.getElementById('btn-bityblockly-clear')?.textContent.trim();
      const runLabel = document.getElementById('btn-bityblockly-run')?.textContent.trim();

      // Check computed style text-transform on Grade 1
      const msgStyle = window.getComputedStyle(document.getElementById('bity-guide-message'));
      const textTransform = msgStyle.textTransform;

      return {
        boxVisible: !!companionBox,
        hasSvg: !!avatarSvg,
        nametag,
        speakerBadge,
        message,
        askBtnVisible: !!askBtn,
        askBtnLabel,
        fwdLabel,
        leftLabel,
        rightLabel,
        backLabel,
        resetLabel,
        clearLabel,
        runLabel,
        textTransform
      };
    });

    console.log('\n--- Grade 1 Guide & Uppercase Test Results ---');
    console.log('Companion box visible:', g1Result.boxVisible);
    console.log('Avatar SVG rendered:', g1Result.hasSvg);
    console.log('Nametag:', g1Result.nametag);
    console.log('Speaker badge:', g1Result.speakerBadge);
    console.log('Initial Guide Message:', g1Result.message);
    console.log('Ask hint button label:', g1Result.askBtnLabel);
    console.log('Block labels:', g1Result.fwdLabel, '/', g1Result.leftLabel, '/', g1Result.rightLabel);
    console.log('Control buttons:', g1Result.backLabel, '|', g1Result.resetLabel, '|', g1Result.clearLabel, '|', g1Result.runLabel);
    console.log('Computed text-transform in Grade 1:', g1Result.textTransform);

    // Verify all uppercase in Grade 1
    if (g1Result.nametag !== g1Result.nametag.toUpperCase()) throw new Error('Nametag is not uppercase in Grade 1');
    if (g1Result.speakerBadge !== g1Result.speakerBadge.toUpperCase()) throw new Error('Speaker badge is not uppercase in Grade 1');
    if (g1Result.message !== g1Result.message.toUpperCase()) throw new Error('Message is not uppercase in Grade 1');
    if (g1Result.fwdLabel !== 'AVANZAR') throw new Error('Forward label is not AVANZAR');
    if (g1Result.leftLabel !== 'GIRAR A LA IZQUIERDA') throw new Error('Left label is not GIRAR A LA IZQUIERDA');
    if (g1Result.textTransform !== 'uppercase') throw new Error('CSS text-transform is not uppercase for Grade 1');

    // Test 2: Button "PEDIR UNA PISTA" interaction in Grade 1
    const hintClickResult = await page.evaluate(async () => {
      const askBtn = document.getElementById('btn-bity-ask-hint');
      askBtn.click();
      await new Promise(r => setTimeout(r, 150));

      const newMsg = document.getElementById('bity-guide-message')?.textContent;
      const avatarAnim = document.getElementById('bity-guide-avatar-container')?.classList.contains('bounce');

      return { newMsg, avatarAnim };
    });

    console.log('\n--- "PEDIR UNA PISTA" Click Test ---');
    console.log('Message after asking hint:', hintClickResult.newMsg);
    console.log('Avatar bounced:', hintClickResult.avatarAnim);
    if (hintClickResult.newMsg !== hintClickResult.newMsg.toUpperCase()) throw new Error('Hint message is not uppercase in Grade 1');

    // Test 3: Contextual event: adding blocks in Grade 1
    const codingEventResult = await page.evaluate(async () => {
      // Add a forward block
      window.bityBlocklyGame.addBlock('forward');
      await new Promise(r => setTimeout(r, 100));
      const forwardMsg = document.getElementById('bity-guide-message')?.textContent;

      // Add a left turn block
      window.bityBlocklyGame.addBlock('left');
      await new Promise(r => setTimeout(r, 100));
      const turnMsg = document.getElementById('bity-guide-message')?.textContent;

      return { forwardMsg, turnMsg };
    });

    console.log('\n--- Contextual Programming & Turn Guidance ---');
    console.log('Message after adding forward:', codingEventResult.forwardMsg);
    console.log('Message after adding turn:', codingEventResult.turnMsg);
    if (codingEventResult.turnMsg !== codingEventResult.turnMsg.toUpperCase()) throw new Error('Turn message is not uppercase in Grade 1');

    // Test 4: Wall collision in Grade 1
    const collisionResult = await page.evaluate(async () => {
      window.bityBlocklyGame.clearBlocks();
      // Block moving up into wall
      window.bityBlocklyGame.addBlock('left');
      window.bityBlocklyGame.addBlock('forward');
      window.bityBlocklyGame.runProgram();

      // Wait for execution to hit wall
      await new Promise(r => setTimeout(r, 1500));
      const errorMsg = document.getElementById('bity-guide-message')?.textContent;
      const isRunning = window.bityBlocklyGame.isRunning;

      return { errorMsg, isRunning };
    });

    console.log('\n--- Wall Collision Guidance ---');
    console.log('Guide message after collision:', collisionResult.errorMsg);
    console.log('Program stopped cleanly:', !collisionResult.isRunning);
    if (collisionResult.errorMsg !== collisionResult.errorMsg.toUpperCase()) throw new Error('Error message is not uppercase in Grade 1');

    // Test 5: Math door interaction and uppercase in Grade 1
    const mathDoorResult = await page.evaluate(async () => {
      // Trigger math challenge for door (3, 1)
      window.bityBlocklyGame.triggerMathChallengeForDoor(3, 1);
      await new Promise(r => setTimeout(r, 200));

      const modal = document.getElementById('bityblockly-math-modal');
      const isModalActive = modal?.classList.contains('active');
      const title = modal.querySelector('.math-door-title')?.textContent;
      const story = document.getElementById('bityblockly-math-story')?.textContent;
      const eq = document.getElementById('bityblockly-math-equation')?.textContent;
      const guideMsg = document.getElementById('bity-guide-message')?.textContent;

      // Answer wrongly to test uppercase and life loss
      const wrongBtn = Array.from(document.querySelectorAll('#bityblockly-math-options button')).find(b => b.textContent !== '5');
      if (wrongBtn) wrongBtn.click();
      await new Promise(r => setTimeout(r, 300));
      const feedbackWrong = document.getElementById('bityblockly-math-feedback')?.textContent;

      return {
        isModalActive,
        title,
        story,
        eq,
        guideMsg,
        feedbackWrong
      };
    });

    console.log('\n--- Math Door Modal in Grade 1 ---');
    console.log('Modal active:', mathDoorResult.isModalActive);
    console.log('Modal title:', mathDoorResult.title);
    console.log('Math story:', mathDoorResult.story);
    console.log('Math equation:', mathDoorResult.eq);
    console.log('Guide message at door:', mathDoorResult.guideMsg);
    console.log('Feedback on wrong answer:', mathDoorResult.feedbackWrong);

    if (mathDoorResult.story !== mathDoorResult.story.toUpperCase()) throw new Error('Math story is not uppercase in Grade 1');
    if (mathDoorResult.feedbackWrong !== mathDoorResult.feedbackWrong.toUpperCase()) throw new Error('Math feedback is not uppercase in Grade 1');

    // Close math modal
    await page.evaluate(() => {
      document.getElementById('bityblockly-math-modal')?.classList.remove('active');
      window.bityBlocklyGame.isPausedForMath = false;
    });

    // Test 6: Verify Presence and Mixed Case in Grades 2, 3, 4, 5
    for (const g of [2, 3, 4, 5]) {
      const gResult = await page.evaluate((grade) => {
        window.bityBlocklyGame.selectGrade(grade);
        const nametag = document.getElementById('bity-guide-nametag')?.textContent;
        const msg = document.getElementById('bity-guide-message')?.textContent;
        const fwdLabel = document.querySelector('#btn-bityblockly-add-forward .block-label-text')?.textContent;
        const askBtn = document.getElementById('btn-bity-ask-hint-text')?.textContent;
        const msgStyle = window.getComputedStyle(document.getElementById('bity-guide-message'));
        const textTransform = msgStyle.textTransform;

        return {
          nametag,
          msg,
          fwdLabel,
          askBtn,
          textTransform
        };
      }, g);

      console.log(`\n--- Grade ${g} Guide & Standard Case Check ---`);
      console.log(`Grade ${g} Nametag:`, gResult.nametag);
      console.log(`Grade ${g} Guide message:`, gResult.msg);
      console.log(`Grade ${g} Forward label:`, gResult.fwdLabel);
      console.log(`Grade ${g} Ask hint label:`, gResult.askBtn);
      console.log(`Grade ${g} text-transform:`, gResult.textTransform);

      if (gResult.fwdLabel !== 'Avanzar') throw new Error(`Forward label in Grade ${g} is not "Avanzar"`);
      if (gResult.textTransform !== 'none') throw new Error(`text-transform in Grade ${g} is not none`);
    }

    // Test 7: Verify Final Challenges have Bity Guide
    for (const g of [1, 2, 3, 4, 5]) {
      const fcResult = await page.evaluate((grade) => {
        window.bityBlocklyGame.selectGrade(grade);
        const gData = window.BITYBLOCKLY_GRADES_DATA[grade];
        const finalIdx = gData.missions.length;
        window.bityBlocklyGame.loadLevel(finalIdx);

        const companionBox = document.getElementById('bity-guide-companion-box');
        const badgeText = document.getElementById('bityblockly-badge-text')?.textContent;
        const msg = document.getElementById('bity-guide-message')?.textContent;

        return {
          hasGuide: !!companionBox,
          badgeText,
          msg
        };
      }, g);

      console.log(`Final Challenge Grade ${g}: Guide present: ${fcResult.hasGuide}, Badge: ${fcResult.badgeText}`);
      if (!fcResult.hasGuide) throw new Error(`Bity Guide missing in Final Challenge of Grade ${g}`);
    }

    console.log('\n========================================');
    console.log('ALL BROWSER AUTOMATED TESTS PASSED (100%)');
    console.log('========================================\n');

  } catch (err) {
    console.error('Test failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.close();
  }
}

runTests();
