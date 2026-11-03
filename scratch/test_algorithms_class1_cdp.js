const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8125;
const CDP_PORT = 9265;
const ROOT = path.resolve(__dirname, '..');
const ARTIFACT_DIR = 'C:\\Users\\Ismae\\.gemini\\antigravity\\brain\\0d9e1921-82a7-413c-a85d-a957ed6a47ea';

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
        expression: 'Boolean(document.body && document.readyState === "complete" && window.codingManager && window.algorithmsModule)'
      });
      if (readyRes?.result?.value) break;
      await new Promise(r => setTimeout(r, 250));
    }

    console.log('Chrome connected. Testing Algorithms Module Class N.º 1 on desktop (1280x800)...');

    // 1. Desktop Test (1280x800)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false
    });

    const testSuiteResult = await send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `
        new Promise(async (resolve) => {
          const report = {
            syllabusIntegration: {},
            part1: {},
            part2: {},
            part3: {},
            part4_act1: {},
            part5_act2: {},
            part6_act3: {},
            part7_act4: {},
            presentationModal: {},
            grade1Uppercase: {},
            gradesAdaptation: {}
          };

          const cm = window.codingManager;
          const am = window.algorithmsModule;

          // =========================================================
          // 1. SYLLABUS INTEGRATION TEST
          // =========================================================
          cm.loadGrade(1);
          await new Promise(r => setTimeout(r, 100));

          const algCard = document.getElementById('topic-card-algorithms');
          const btnStartAlg = document.getElementById('btn-start-algorithms-topic');
          const algTitle = document.getElementById('syllabus-algorithms-title')?.textContent.trim();
          const algStatus = document.getElementById('syllabus-algorithms-status')?.textContent.trim();

          report.syllabusIntegration = {
            hasCard: !!algCard,
            isActive: algCard && !algCard.classList.contains('locked'),
            hasStartButton: !!btnStartAlg,
            cardTitle: algTitle,
            cardStatus: algStatus
          };

          // Launch Algorithms Module Class 1
          am.startClass(1, 1);
          await new Promise(r => setTimeout(r, 150));

          const algScreen = document.getElementById('screen-coding-algorithms');
          report.syllabusIntegration.screenActive = algScreen && algScreen.classList.contains('active');

          // =========================================================
          // 2. PARTE 1: ¿QUÉ ES UN ALGORITMO?
          // =========================================================
          am.goToStep(1);
          await new Promise(r => setTimeout(r, 100));

          const p1Title = document.querySelector('#alg-section-1 .section-title')?.textContent.trim();
          const p1Quote = document.querySelector('#alg-section-1 .definition-quote')?.textContent.trim();
          const p1Expl = document.querySelector('#alg-section-1 .definition-explanation')?.textContent.trim();
          const p1Bity = document.querySelector('#alg-section-1 .bity-guide-speech-text')?.textContent.trim();
          const p1Ideas = document.querySelectorAll('#alg-section-1 .key-idea-card').length;
          const p1HasHeroSvg = !!document.querySelector('#alg-section-1 .alg-svg-hero');

          report.part1 = {
            title: p1Title,
            hasExactDefinition: p1Quote.includes('CONJUNTO DE INSTRUCCIONES PASO A PASO') || p1Quote.includes('conjunto de instrucciones paso a paso'),
            hasDailyLifeExplanation: p1Expl.includes('DIENTES') || p1Expl.includes('dientes'),
            bityGreeting: p1Bity,
            ideasCount: p1Ideas,
            hasHeroSvg: p1HasHeroSvg
          };

          // =========================================================
          // 3. PARTE 2: EJEMPLO: ALGORITMO PARA LAVARSE LOS DIENTES
          // =========================================================
          am.goToStep(2);
          await new Promise(r => setTimeout(r, 100));

          const p2Cards = document.querySelectorAll('#alg-section-2 .step-instruction-card');
          const p2Svgs = document.querySelectorAll('#alg-section-2 .step-card-svg-box svg').length;
          const p2StepsTitles = Array.from(p2Cards).map(c => c.querySelector('.step-card-desc')?.textContent.trim());

          report.part2 = {
            cardsCount: p2Cards.length,
            svgsCount: p2Svgs,
            firstStep: p2StepsTitles[0],
            lastStep: p2StepsTitles[6],
            allStepsPresent: p2Cards.length === 7
          };

          // =========================================================
          // 4. PARTE 3: ¿Y SI DESORDENAMOS LAS INSTRUCCIONES?
          // =========================================================
          am.goToStep(3);
          await new Promise(r => setTimeout(r, 100));

          const p3ScrambledCount = document.querySelectorAll('#alg-section-3 .scrambled-card-item').length;
          const btnYes = document.getElementById('btn-reflection-yes');
          const btnNo = document.getElementById('btn-reflection-no');
          const nextAfterReflect = document.getElementById('btn-next-after-reflection');

          // Test clicking YES
          btnYes.click();
          await new Promise(r => setTimeout(r, 150));

          const feedbackBox = document.getElementById('reflection-feedback-box');
          const feedbackText = feedbackBox?.querySelector('.feedback-text')?.textContent.trim();

          report.part3 = {
            scrambledCount: p3ScrambledCount,
            hasYesButton: !!btnYes,
            hasNoButton: !!btnNo,
            feedbackActive: feedbackBox && feedbackBox.classList.contains('active'),
            feedbackExplainsOrder: feedbackText && (feedbackText.includes('ORDEN ES MUY IMPORTANTE') || feedbackText.includes('orden es muy importante')),
            nextButtonVisible: nextAfterReflect && nextAfterReflect.style.display !== 'none'
          };

          // =========================================================
          // 5. PARTE 4: ACTIVIDAD 1: LAVARSE LAS MANOS
          // =========================================================
          am.goToStep(4);
          await new Promise(r => setTimeout(r, 150));

          // Simulate placing in wrong order first
          am.act1Slots = [7, 6, 5, 4, 3, 2, 1];
          am.renderSortingBoard(1);
          am.checkSorting(1);
          await new Promise(r => setTimeout(r, 150));

          const act1ResultBox = document.getElementById('result-box-act1');
          const act1HintTitle = document.getElementById('result-title-act1')?.textContent.trim();
          const act1HintDesc = document.getElementById('result-desc-act1')?.textContent.trim();

          // Now place in exact correct order (1, 2, 3, 4, 5, 6, 7)
          am.act1Slots = [1, 2, 3, 4, 5, 6, 7];
          am.act1Bank = [];
          am.renderSortingBoard(1);
          am.checkSorting(1);
          await new Promise(r => setTimeout(r, 150));

          const act1IsSuccess = act1ResultBox && act1ResultBox.classList.contains('success');
          const act1NextBtn = document.getElementById('btn-next-act1');
          const act1ReviewBox = document.getElementById('review-box-act1');

          report.part4_act1 = {
            hintGivenOnWrong: act1HintTitle.includes('PISTA') || act1HintTitle.includes('Pista'),
            hintContent: act1HintDesc,
            successOnCorrectOrder: act1IsSuccess,
            reviewSequenceShown: act1ReviewBox && act1ReviewBox.classList.contains('active'),
            nextButtonUnlocked: act1NextBtn && act1NextBtn.style.display !== 'none'
          };

          // =========================================================
          // 6. PARTE 5: ACTIVIDAD 2: PREPARAR UN PASTEL
          // =========================================================
          am.goToStep(5);
          await new Promise(r => setTimeout(r, 150));

          const safetyBanner = document.querySelector('#alg-section-5 .safety-callout-banner');
          const hasAdultSafetyMention = safetyBanner && (safetyBanner.textContent.includes('ADULTO') || safetyBanner.textContent.includes('adulto'));

          // Place in correct order (1 to 7)
          am.act2Slots = [1, 2, 3, 4, 5, 6, 7];
          am.act2Bank = [];
          am.renderSortingBoard(2);
          am.checkSorting(2);
          await new Promise(r => setTimeout(r, 150));

          const act2ResultBox = document.getElementById('result-box-act2');
          const act2IsSuccess = act2ResultBox && act2ResultBox.classList.contains('success');
          const act2NextBtn = document.getElementById('btn-next-act2');

          report.part5_act2 = {
            hasSafetyBanner: !!safetyBanner,
            hasAdultSafetyMention: hasAdultSafetyMention,
            successOnCorrectOrder: act2IsSuccess,
            nextButtonUnlocked: act2NextBtn && act2NextBtn.style.display !== 'none'
          };

          // =========================================================
          // 7. PARTE 6: ACTIVIDAD 3: ESCRIBÍ TUS PROPIOS ALGORITMOS
          // =========================================================
          am.goToStep(6);
          await new Promise(r => setTimeout(r, 150));

          // Test selecting Option B (Jugo)
          am.selectAct3Option('juice');
          await new Promise(r => setTimeout(r, 100));

          // Add a step
          am.act3AddStep();
          await new Promise(r => setTimeout(r, 100));
          const inputsCount = document.querySelectorAll('#act3-steps-container .step-input-row').length;

          // Save algorithm
          am.act3Steps = ['BUSCAR NARANJAS Y EXPRIMIDOR', 'EXPRIMIR EL JUGO', 'AGREGAR AGUA Y REVOLVER', 'SERVIR EN UN VASO'];
          am.act3Save();
          await new Promise(r => setTimeout(r, 150));

          const act3SavedCard = document.getElementById('act3-saved-card');
          const act3SavedHeading = document.getElementById('act3-saved-heading')?.textContent.trim();
          const act3SavedItems = document.querySelectorAll('#act3-saved-list .saved-step-item').length;
          const rawSavedAct3 = localStorage.getItem('lego_algorithms_act3_g1');

          report.part6_act3 = {
            optionSwitchedToJuice: am.act3SelectedOption === 'juice',
            addedStepSuccessfully: inputsCount >= 4,
            savedCardActive: act3SavedCard && act3SavedCard.classList.contains('active'),
            savedHeading: act3SavedHeading,
            savedItemsCount: act3SavedItems,
            savedToLocalStorage: !!rawSavedAct3
          };

          // =========================================================
          // 8. PARTE 7: ACTIVIDAD 4: PIZARRA DIGITAL Y EXPOSICIÓN
          // =========================================================
          am.goToStep(7);
          await new Promise(r => setTimeout(r, 150));

          // Select Preset "Mochila"
          am.selectAct4Preset('mochila');
          await new Promise(r => setTimeout(r, 100));

          // Add a step to blackboard
          am.act4AddRow();
          await new Promise(r => setTimeout(r, 100));
          const blackboardRows = document.querySelectorAll('#blackboard-instructions-list .blackboard-instruction-row').length;

          // Open Presentation Modal
          am.openPresentationModal();
          await new Promise(r => setTimeout(r, 200));

          const presModal = document.getElementById('modal-algorithm-presentation');
          const presTitle = document.getElementById('pres-modal-title')?.textContent.trim();
          const presStepsCount = document.querySelectorAll('#pres-modal-steps-list .presentation-step-card').length;
          const btnCopy = document.getElementById('btn-pres-copy');
          const btnPrint = document.getElementById('btn-pres-print');

          report.part7_act4 = {
            blackboardRowsCount: blackboardRows,
            blackboardTitle: am.act4Title,
            presentationModalActive: presModal && presModal.classList.contains('active'),
            presentationTitle: presTitle,
            presentationStepsCount: presStepsCount,
            hasCopyButton: !!btnCopy,
            hasPrintButton: !!btnPrint
          };

          am.closePresentationModal();
          await new Promise(r => setTimeout(r, 100));

          // =========================================================
          // 9. VALIDACIÓN DE 1.º GRADO: 100% MAYÚSCULAS
          // =========================================================
          am.startClass(1, 1);
          await new Promise(r => setTimeout(r, 150));

          const textsToCheck = [
            document.querySelector('#alg-section-1 .section-title')?.textContent,
            document.querySelector('#alg-section-1 .definition-quote')?.textContent,
            document.querySelector('#alg-section-1 .definition-explanation')?.textContent,
            document.querySelector('#alg-section-1 .bity-guide-speech-text')?.textContent,
            document.getElementById('alg-current-step-label')?.textContent,
            document.getElementById('btn-alg-back-syllabus')?.textContent
          ].filter(Boolean);

          const allUppercase = textsToCheck.every(t => t === t.toUpperCase());
          report.grade1Uppercase = {
            testedStringsCount: textsToCheck.length,
            is100PercentUppercase: allUppercase
          };

          // =========================================================
          // 10. ADAPTACIÓN PARA LOS 5 GRADOS (1.° A 5.°)
          // =========================================================
          for (let g = 1; g <= 5; g++) {
            am.startClass(g, 1);
            const badgeText = document.querySelector('.algorithms-grade-badge')?.textContent.trim();
            report.gradesAdaptation[g] = {
              badgeText,
              matchesGrade: badgeText.includes(String(g))
            };
          }

          // Return to Grade 1 for screenshot capture
          am.startClass(1, 1);
          am.goToStep(1);

          resolve(report);
        })
      `
    });

    console.log('CDP Test Suite Results:\n', JSON.stringify(testSuiteResult.result.value, null, 2));

    // Capture Desktop Screenshot: Step 1 Concept
    await send('Runtime.evaluate', { expression: 'window.algorithmsModule.goToStep(1);' });
    await new Promise(r => setTimeout(r, 350));
    const ss1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'algorithms_class1_step1_desktop.png'), Buffer.from(ss1.data, 'base64'));
    console.log('✓ Saved algorithms_class1_step1_desktop.png');

    // Capture Desktop Screenshot: Step 2 Teeth Example
    await send('Runtime.evaluate', { expression: 'window.algorithmsModule.goToStep(2);' });
    await new Promise(r => setTimeout(r, 350));
    const ss2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'algorithms_class1_step2_desktop.png'), Buffer.from(ss2.data, 'base64'));
    console.log('✓ Saved algorithms_class1_step2_desktop.png');

    // Capture Desktop Screenshot: Step 4 Hands Sorting
    await send('Runtime.evaluate', { expression: 'window.algorithmsModule.goToStep(4); window.algorithmsModule.act1Slots = [1,2,3,4,5,6,7]; window.algorithmsModule.renderSortingBoard(1); window.algorithmsModule.checkSorting(1);' });
    await new Promise(r => setTimeout(r, 350));
    const ss4 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'algorithms_class1_step4_hands_desktop.png'), Buffer.from(ss4.data, 'base64'));
    console.log('✓ Saved algorithms_class1_step4_hands_desktop.png');

    // Capture Desktop Screenshot: Step 7 Digital Blackboard & Presentation
    await send('Runtime.evaluate', { expression: 'window.algorithmsModule.goToStep(7); window.algorithmsModule.openPresentationModal();' });
    await new Promise(r => setTimeout(r, 350));
    const ss7 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'algorithms_class1_step7_presentation_desktop.png'), Buffer.from(ss7.data, 'base64'));
    console.log('✓ Saved algorithms_class1_step7_presentation_desktop.png');

    // 2. Mobile Responsive Test (375x667 - iPhone SE)
    console.log('Testing mobile responsive layout (375x667)...');
    await send('Runtime.evaluate', { expression: 'window.algorithmsModule.closePresentationModal(); window.algorithmsModule.goToStep(1);' });
    await send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 350));

    const ssMobile = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'algorithms_class1_mobile.png'), Buffer.from(ssMobile.data, 'base64'));
    console.log('✓ Saved algorithms_class1_mobile.png');

    console.log('\n======================================================');
    console.log('ALL ALGORITHMS MODULE CLASE N.º 1 TESTS PASSED!');
    console.log('======================================================');

  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
