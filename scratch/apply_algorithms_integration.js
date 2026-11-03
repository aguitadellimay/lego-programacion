const fs = require('fs');
const path = require('path');

console.log('=== Integrating Algorithms Module (Clase N.º 1) ===');

// 1. UPDATE index.html
const indexPath = 'index.html';
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// 1.1 Add algorithms.css in <head>
if (!indexHtml.includes('css/algorithms.css')) {
  indexHtml = indexHtml.replace(
    /<link rel="stylesheet" href="css\/bityblockly\.css">/,
    '<link rel="stylesheet" href="css/bityblockly.css">\r\n  <link rel="stylesheet" href="css/algorithms.css">'
  );
  console.log('✓ Added css/algorithms.css to index.html');
}

// 1.2 Update topic-card-algorithms in screen-coding-syllabus
const oldTopicAlgRegex = /<!-- Tema 2: Algoritmos \(Futuro para otros grados\) -->[\s\S]*?<article id="topic-card-algorithms" class="topic-card locked">[\s\S]*?<\/article>/;

const newTopicAlgHtml = `<!-- Tema: ALGORITMOS (Activo para 1.° a 5.° Grado) -->
          <article id="topic-card-algorithms" class="topic-card active" style="border-color: #8b5cf6; cursor: pointer;">
            <div class="topic-card-header">
              <span class="topic-icon">🧩</span>
              <span id="syllabus-algorithms-status" class="topic-status-tag status-active" style="background: #ede9fe; color: #6d28d9;">🟢 DISPONIBLE</span>
            </div>
            <h4 id="syllabus-algorithms-title" class="topic-title">2. Algoritmos</h4>
            <p id="syllabus-algorithms-desc" class="topic-desc">
              Descubrí qué es un algoritmo, cómo ordenar secuencias de pasos lógicos y creá tus propios algoritmos.
            </p>
            <div class="topic-progress-box">
              <div class="topic-progress-label">
                <span id="syllabus-algorithms-label">CLASE N.º 1</span>
                <span id="syllabus-algorithms-pct">0%</span>
              </div>
              <div class="progress-bar-bg">
                <div id="syllabus-algorithms-progress" class="progress-bar-fill" style="width: 0%; background: linear-gradient(90deg, #8b5cf6, #3b82f6);"></div>
              </div>
            </div>
            <button id="btn-start-algorithms-topic" class="btn-start-topic" type="button" style="background: linear-gradient(180deg, #8b5cf6, #7c3aed); box-shadow: 0 4px 0 #5b21b6;">
              <span>🧩</span> ¡Comenzar Algoritmos!
            </button>
          </article>`;

if (oldTopicAlgRegex.test(indexHtml)) {
  indexHtml = indexHtml.replace(oldTopicAlgRegex, newTopicAlgHtml);
  console.log('✓ Updated topic-card-algorithms in index.html to active topic!');
} else if (!indexHtml.includes('btn-start-algorithms-topic')) {
  console.error('✗ Failed to find old topic-card-algorithms regex in index.html');
  process.exit(1);
}

// 1.3 Add screen-coding-algorithms before screen-coding-adventure
if (!indexHtml.includes('id="screen-coding-algorithms"')) {
  const adventureScreenTarget = '<!-- PANTALLA INDEPENDIENTE: DESAFÍO FINAL: INSTRUCCIONES (LA AVENTURA DE BITY) -->';
  const newScreenHtml = `<!-- PANTALLA: ALGORITMOS — CLASE N.º 1: ¿QUÉ ES UN ALGORITMO? (1.º a 5.º Grado) -->
  <section id="screen-coding-algorithms" class="screen">
    <div class="algorithms-bg-stars" aria-hidden="true"></div>
    <div class="algorithms-app-container">
      <div id="algorithms-content-mount">
        <!-- Renderizado dinámicamente por algorithmsModule.js -->
      </div>
    </div>
  </section>

  ` + adventureScreenTarget;

  indexHtml = indexHtml.replace(adventureScreenTarget, newScreenHtml);
  console.log('✓ Added screen-coding-algorithms to index.html');
}

// 1.4 Add js/algorithmsModule.js in scripts
if (!indexHtml.includes('js/algorithmsModule.js')) {
  indexHtml = indexHtml.replace(
    /<script src="js\/codingModule\.js\?v=20261013"><\/script>/,
    '<script src="js/algorithmsModule.js"></script>\r\n  <script src="js/codingModule.js?v=20261013"></script>'
  );
  console.log('✓ Added js/algorithmsModule.js to index.html scripts');
}

fs.writeFileSync(indexPath, indexHtml, 'utf8');

// 2. UPDATE js/teacherPanel.js
const teacherPath = 'js/teacherPanel.js';
let teacherCode = fs.readFileSync(teacherPath, 'utf8');

if (!teacherCode.includes("'screen-coding-algorithms'")) {
  teacherCode = teacherCode.replace(
    /screens:\s*\['screen-coding-grades',\s*'screen-coding-syllabus',\s*'screen-coding-topic',\s*'screen-bityblockly'\]/,
    "screens: ['screen-coding-grades', 'screen-coding-syllabus', 'screen-coding-topic', 'screen-bityblockly', 'screen-coding-algorithms']"
  );
  fs.writeFileSync(teacherPath, teacherCode, 'utf8');
  console.log('✓ Added screen-coding-algorithms to teacherPanel.js MODULE_DEFINITIONS');
}

// 3. UPDATE js/app.js
const appPath = 'js/app.js';
let appCode = fs.readFileSync(appPath, 'utf8');

if (!appCode.includes('screenCodingAlgorithms')) {
  appCode = appCode.replace(
    /const screenBityBlockly = document\.getElementById\('screen-bityblockly'\);/,
    "const screenBityBlockly = document.getElementById('screen-bityblockly');\r\n    const screenCodingAlgorithms = document.getElementById('screen-coding-algorithms');"
  );

  appCode = appCode.replace(
    /screenBityBlockly,\s*screenGame,/,
    "screenBityBlockly, screenCodingAlgorithms,\r\n      screenGame,"
  );
  fs.writeFileSync(appPath, appCode, 'utf8');
  console.log('✓ Added screenCodingAlgorithms to app.js screens array');
}

// 4. UPDATE js/codingModule.js
const codingPath = 'js/codingModule.js';
let codingCode = fs.readFileSync(codingPath, 'utf8');

// Add startAlgorithmsTopic method if not present
if (!codingCode.includes('startAlgorithmsTopic()')) {
  const insertTarget = '  startInstructionsTopic() {';
  const newMethodCode = `  /**
   * Inicia el módulo de Algoritmos (Clase N.º 1) para el grado seleccionado
   */
  startAlgorithmsTopic() {
    this.cleanupCurrentActivity();
    if (typeof window !== 'undefined' && window.teacherManager && !window.teacherManager.canAccessScreen('screen-coding-algorithms')) {
      window.teacherManager.showBlockedNoticeForScreen('screen-coding-algorithms');
      return;
    }
    if (typeof window !== 'undefined' && window.algorithmsModule) {
      window.algorithmsModule.startClass(this.currentGrade, 1);
    }
  }

  startInstructionsTopic() {`;

  codingCode = codingCode.replace(insertTarget, newMethodCode);
  console.log('✓ Added startAlgorithmsTopic() method to codingModule.js');
}

// Add algorithms syllabus card update in renderSyllabus()
if (!codingCode.includes('topic-card-algorithms')) {
  const syllabusInsertTarget = `    // ========================================================
    // TEMA 3: PATRONES (BLOQUEADO SEGÚN REQUERIMIENTO)`;

  const newSyllabusBlock = `    // ========================================================
    // TEMA: ALGORITMOS (CLASE N.º 1 — 1.º a 5.º Grado)
    // ========================================================
    const algCard = document.getElementById('topic-card-algorithms');
    const btnStartAlg = document.getElementById('btn-start-algorithms-topic');
    const algFillEl = document.getElementById('syllabus-algorithms-progress');
    const algTextEl = document.getElementById('syllabus-algorithms-pct');
    const algLabelEl = document.getElementById('syllabus-algorithms-label');
    const algTitleEl = document.getElementById('syllabus-algorithms-title');
    const algDescEl = document.getElementById('syllabus-algorithms-desc');
    const algStatusEl = document.getElementById('syllabus-algorithms-status');

    if (algCard) {
      algCard.style.display = 'flex';
      algCard.className = 'topic-card active';
      algCard.style.borderColor = '#8b5cf6';
      algCard.style.cursor = 'pointer';
      algCard.onclick = () => {
        this.onPlaySound('pop');
        this.startAlgorithmsTopic();
      };
    }

    let algCompletedParts = 0;
    let isAlgCompleted = false;
    try {
      const rawProg = localStorage.getItem(\`lego_algorithms_class1_progress_g\${this.currentGrade}\`);
      if (rawProg) {
        const progData = JSON.parse(rawProg);
        if (progData && Array.isArray(progData.completedSteps)) {
          algCompletedParts = progData.completedSteps.length;
        }
        isAlgCompleted = !!(progData && progData.isCompleted);
      }
    } catch (e) {}

    const algPct = isAlgCompleted ? 100 : Math.min(100, Math.round((algCompletedParts / 7) * 100));

    if (algFillEl) algFillEl.style.width = \`\${algPct}%\`;
    if (algTextEl) {
      algTextEl.textContent = isAlgCompleted ? (isGradeOne ? '🎉 ¡100% COMPLETADO!' : '🎉 ¡100% Completado!') : \`\${algPct}%\`;
    }
    if (algStatusEl) {
      algStatusEl.className = 'topic-status-tag status-active';
      algStatusEl.textContent = isGradeOne ? '🟢 DISPONIBLE' : '🟢 Disponible';
    }
    if (algTitleEl) {
      algTitleEl.textContent = isGradeOne ? '2. ALGORITMOS' : '2. Algoritmos';
    }
    if (algLabelEl) {
      algLabelEl.textContent = isGradeOne ? 'CLASE N.º 1' : 'Clase N.º 1';
    }
    if (algDescEl) {
      algDescEl.textContent = isGradeOne
        ? 'DESCUBRÍ QUÉ ES UN ALGORITMO, CÓMO ORDENAR SECUENCIAS DE PASOS LÓGICOS Y CREÁ TUS PROPIOS ALGORITMOS.'
        : 'Descubrí qué es un algoritmo, cómo ordenar secuencias de pasos lógicos y creá tus propios algoritmos.';
    }

    if (btnStartAlg) {
      if (isGradeOne) {
        btnStartAlg.innerHTML = isAlgCompleted
          ? '<span>🔄</span> ¡REPASAR CLASE 1!'
          : (algCompletedParts > 0 ? '<span>▶️</span> ¡CONTINUAR CLASE 1!' : '<span>🚀</span> ¡COMENZAR CLASE 1!');
      } else {
        btnStartAlg.innerHTML = isAlgCompleted
          ? '<span>🔄</span> ¡Repasar Clase 1!'
          : (algCompletedParts > 0 ? '<span>▶️</span> ¡Continuar Clase 1!' : '<span>🚀</span> ¡Comenzar Clase 1!');
      }
      btnStartAlg.onclick = (e) => {
        if (e) e.stopPropagation();
        this.onPlaySound('pop');
        this.startAlgorithmsTopic();
      };
    }

` + syllabusInsertTarget;

  codingCode = codingCode.replace(syllabusInsertTarget, newSyllabusBlock);
  console.log('✓ Added topic-card-algorithms handling to renderSyllabus() in codingModule.js');
}

// Add reset progress for algorithms in session resets
if (!codingCode.includes('lego_algorithms_class1_progress_g')) {
  codingCode = codingCode.replace(
    /localStorage\.removeItem\('lego_bityblockly_progress'\);/g,
    "localStorage.removeItem('lego_bityblockly_progress');\r\n        for (let g = 1; g <= 5; g++) {\r\n          localStorage.removeItem(`lego_algorithms_class1_progress_g${g}`);\r\n          localStorage.removeItem(`lego_algorithms_act3_g${g}`);\r\n          localStorage.removeItem(`lego_algorithms_act4_g${g}`);\r\n        }"
  );
  console.log('✓ Added algorithms progress reset to session reset in codingModule.js');
}

fs.writeFileSync(codingPath, codingCode, 'utf8');

console.log('=== All Algorithms Integrations Applied Successfully ===');
