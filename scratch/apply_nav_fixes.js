const fs = require('fs');

// 1. Update js/app.js
let app = fs.readFileSync('js/app.js', 'utf8');

const targetInApp = `    const showScreen = (targetScreen) => {
      // Bloqueo de acceso en la web a "JUGAR Y APRENDER" y "ARMAR MI REGALO FAMILIAR" (NO DISPONIBLE)
      const permanentlyBlockedIds = ['screen-grades', 'screen-game', 'screen-editor'];
      if (targetScreen && permanentlyBlockedIds.includes(targetScreen.id)) {
        [screenHome, screenGrades, screenGame, screenEditor, screenCodingGrades, screenCodingSyllabus, screenCodingTopic, screenCodingAdventure, screenBityBlockly].forEach(s => {
          if (s) s.classList.remove('active');
        });
        if (screenHome) screenHome.classList.add('active');
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', window.location.pathname);
        } else if (typeof window !== 'undefined') {
          window.location.hash = '';
        }
        showDisabledModuleNotice(targetScreen.id === 'screen-editor' ? 'Armar mi regalo familiar' : 'Jugar y aprender');
        return;
      }

      // Verificación de disponibilidad por Panel Docente
      if (window.teacherManager && targetScreen && targetScreen !== screenHome) {
        if (!window.teacherManager.canAccessScreen(targetScreen.id)) {
          // Si el módulo está bloqueado, permanecer o volver a screenHome
          [screenHome, screenGrades, screenGame, screenEditor, screenCodingGrades, screenCodingSyllabus, screenCodingTopic, screenCodingAdventure, screenBityBlockly].forEach(s => {
            if (s) s.classList.remove('active');
          });
          if (screenHome) screenHome.classList.add('active');
          window.teacherManager.showBlockedNoticeForScreen(targetScreen.id);
          return;
        }
      }

      if (codingManager && codingManager.stopSpeaking) {
        codingManager.stopSpeaking();
      }
      if (codingManager && codingManager.stopBgm) {
        codingManager.stopBgm();
      }
      [screenHome, screenGrades, screenGame, screenEditor, screenCodingGrades, screenCodingSyllabus, screenCodingTopic, screenCodingAdventure, screenBityBlockly].forEach(s => {
        if (s) s.classList.remove('active');
      });
      if (targetScreen) targetScreen.classList.add('active');`;

const replacementInApp = `    const allScreens = [
      screenHome, screenGrades, screenGame, screenEditor,
      screenCodingGrades, screenCodingSyllabus, screenCodingTopic,
      screenCodingAdventure, screenBityBlockly, screenCodingAlgorithms
    ];

    const showScreen = (targetScreen) => {
      // Bloqueo de acceso en la web a "JUGAR Y APRENDER" y "ARMAR MI REGALO FAMILIAR" (NO DISPONIBLE)
      const permanentlyBlockedIds = ['screen-grades', 'screen-game', 'screen-editor'];
      if (targetScreen && permanentlyBlockedIds.includes(targetScreen.id)) {
        allScreens.forEach(s => {
          if (s) s.classList.remove('active');
        });
        if (screenHome) screenHome.classList.add('active');
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', window.location.pathname);
        } else if (typeof window !== 'undefined') {
          window.location.hash = '';
        }
        showDisabledModuleNotice(targetScreen.id === 'screen-editor' ? 'Armar mi regalo familiar' : 'Jugar y aprender');
        return;
      }

      // Verificación de disponibilidad por Panel Docente
      if (window.teacherManager && targetScreen && targetScreen !== screenHome) {
        if (!window.teacherManager.canAccessScreen(targetScreen.id)) {
          // Si el módulo está bloqueado, permanecer o volver a screenHome
          allScreens.forEach(s => {
            if (s) s.classList.remove('active');
          });
          if (screenHome) screenHome.classList.add('active');
          window.teacherManager.showBlockedNoticeForScreen(targetScreen.id);
          return;
        }
      }

      if (codingManager && codingManager.stopSpeaking) {
        codingManager.stopSpeaking();
      }
      if (codingManager && codingManager.stopBgm) {
        codingManager.stopBgm();
      }
      allScreens.forEach(s => {
        if (s) s.classList.remove('active');
      });
      if (targetScreen) targetScreen.classList.add('active');

      // Persistencia de pantalla activa para recargas seguras (F5)
      if (targetScreen === screenCodingAlgorithms) {
        try {
          sessionStorage.setItem('lego_active_screen', 'screen-coding-algorithms');
          const curG = (codingManager && codingManager.currentGrade) || parseInt(localStorage.getItem('lego_current_grade')) || 1;
          sessionStorage.setItem('lego_active_grade', String(curG));
        } catch (e) {}
      } else {
        try {
          sessionStorage.removeItem('lego_active_screen');
        } catch (e) {}
      }`;

const normalize = s => s.replace(/\r\n/g, '\n');

if (normalize(app).includes(normalize(targetInApp))) {
  app = normalize(app).replace(normalize(targetInApp), replacementInApp);
  console.log('App.js showScreen updated successfully!');
} else {
  console.error('Target in app.js not found!');
}

// Update initialization in app.js (showScreen(screenHome))
const targetInit = `    // Inicializar estado del encabezado en la pantalla de inicio
    showScreen(screenHome);`;

const replacementInit = `    // Inicializar estado del encabezado y restaurar sesión si hubo recarga (F5) dentro de un módulo
    let sessionRestored = false;
    try {
      const activeSc = sessionStorage.getItem('lego_active_screen');
      const savedG = parseInt(sessionStorage.getItem('lego_active_grade')) || parseInt(localStorage.getItem('lego_current_grade')) || 1;
      if (activeSc === 'screen-coding-algorithms') {
        if (codingManager) {
          codingManager.currentGrade = savedG;
          codingManager.startAlgorithmsTopic();
          sessionRestored = true;
        } else if (window.algorithmsModule) {
          window.algorithmsModule.startClass(savedG, 1);
          sessionRestored = true;
        }
      }
    } catch (e) {}

    if (!sessionRestored) {
      showScreen(screenHome);
    }`;

if (normalize(app).includes(normalize(targetInit))) {
  app = normalize(app).replace(normalize(targetInit), replacementInit);
  console.log('App.js initialization updated successfully!');
} else {
  console.error('Target init in app.js not found!');
}

// Add static listeners for topic-card-algorithms in app.js
const targetCards = `    // Volver desde Selección de Grados de Programación a Home`;
const replacementCards = `    // Acceso directo y robusto a ALGORITMOS (1.º a 5.º Grado)
    const algCardEl = document.getElementById('topic-card-algorithms');
    const btnStartAlgEl = document.getElementById('btn-start-algorithms-topic');
    const handleOpenAlgorithmsTopic = (e) => {
      if (e) e.stopPropagation();
      playClickSound();
      if (codingManager) {
        codingManager.startAlgorithmsTopic();
      } else if (window.algorithmsModule) {
        const curG = parseInt(localStorage.getItem('lego_current_grade')) || 1;
        window.algorithmsModule.startClass(curG, 1);
      }
    };
    if (algCardEl) algCardEl.addEventListener('click', handleOpenAlgorithmsTopic);
    if (btnStartAlgEl) btnStartAlgEl.addEventListener('click', handleOpenAlgorithmsTopic);

    // Volver desde Selección de Grados de Programación a Home`;

if (normalize(app).includes(normalize(targetCards))) {
  app = normalize(app).replace(normalize(targetCards), replacementCards);
  console.log('App.js card listeners updated successfully!');
} else {
  console.error('Target cards in app.js not found!');
}

// Update enforceWebAccessRestrictions in app.js
const targetHash = `      const blockedRoutes = ['play', 'editor', 'screen-grades', 'screen-game', 'screen-editor', 'jugar', 'regalo', 'taller'];
      if (blockedRoutes.some(r => hash.includes(r))) {
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', window.location.pathname);
        } else {
          window.location.hash = '';
        }
        showScreen(screenHome);
      }
    };`;

const replacementHash = `      const blockedRoutes = ['play', 'editor', 'screen-grades', 'screen-game', 'screen-editor', 'jugar', 'regalo', 'taller'];
      if (blockedRoutes.some(r => hash.includes(r))) {
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', window.location.pathname);
        } else {
          window.location.hash = '';
        }
        showScreen(screenHome);
      } else if (hash === 'algoritmos' || hash === 'screen-coding-algorithms') {
        const savedG = parseInt(localStorage.getItem('lego_current_grade')) || 1;
        if (codingManager) {
          codingManager.currentGrade = savedG;
          codingManager.startAlgorithmsTopic();
        } else if (window.algorithmsModule) {
          window.algorithmsModule.startClass(savedG, 1);
        }
      }
    };`;

if (normalize(app).includes(normalize(targetHash))) {
  app = normalize(app).replace(normalize(targetHash), replacementHash);
  console.log('App.js hash router updated successfully!');
} else {
  console.error('Target hash in app.js not found!');
}

// Grade card click saves current grade in localStorage
const targetGradeClick = `        const grade = card.getAttribute('data-cgrade');
        codingManager.loadGrade(grade);`;
const replacementGradeClick = `        const grade = parseInt(card.getAttribute('data-cgrade')) || 1;
        try {
          localStorage.setItem('lego_current_grade', String(grade));
        } catch (e) {}
        codingManager.loadGrade(grade);`;

if (normalize(app).includes(normalize(targetGradeClick))) {
  app = normalize(app).replace(normalize(targetGradeClick), replacementGradeClick);
  console.log('App.js grade click persistence updated successfully!');
} else {
  console.error('Target grade click in app.js not found!');
}

fs.writeFileSync('js/app.js', app);
console.log('Saved js/app.js');

// 2. Update js/codingModule.js
let cm = fs.readFileSync('js/codingModule.js', 'utf8');

const targetCmStart = `  startAlgorithmsTopic() {
    this.cleanupCurrentActivity();
    if (typeof window !== 'undefined' && window.teacherManager && !window.teacherManager.canAccessScreen('screen-coding-algorithms')) {
      window.teacherManager.showBlockedNoticeForScreen('screen-coding-algorithms');
      return;
    }
    if (typeof window !== 'undefined' && window.algorithmsModule) {
      window.algorithmsModule.startClass(this.currentGrade, 1);
    }
  }`;

const replacementCmStart = `  startAlgorithmsTopic() {
    this.cleanupCurrentActivity();
    if (typeof window !== 'undefined' && window.teacherManager && !window.teacherManager.canAccessScreen('screen-coding-algorithms')) {
      window.teacherManager.showBlockedNoticeForScreen('screen-coding-algorithms');
      return;
    }
    const grade = this.currentGrade || parseInt(localStorage.getItem('lego_current_grade')) || 1;
    this.currentGrade = grade;
    try {
      localStorage.setItem('lego_current_grade', String(this.currentGrade));
      sessionStorage.setItem('lego_active_screen', 'screen-coding-algorithms');
      sessionStorage.setItem('lego_active_grade', String(this.currentGrade));
    } catch (e) {}
    this.hideGiftButtons();
    if (this.onShowScreen) {
      this.onShowScreen('screen-coding-algorithms');
    }
    if (typeof window !== 'undefined' && window.algorithmsModule) {
      window.algorithmsModule.startClass(this.currentGrade, 1);
    }
  }`;

if (normalize(cm).includes(normalize(targetCmStart))) {
  cm = normalize(cm).replace(normalize(targetCmStart), replacementCmStart);
  console.log('CodingModule.js startAlgorithmsTopic updated successfully!');
} else {
  console.error('Target startAlgorithmsTopic in codingModule.js not found!');
}

const targetCmLoadGrade = `  loadGrade(grade) {
    this.cleanupCurrentActivity();
    this.currentGrade = parseInt(grade) || 1;
    this.renderSyllabus();
  }`;

const replacementCmLoadGrade = `  loadGrade(grade) {
    this.cleanupCurrentActivity();
    this.currentGrade = parseInt(grade) || 1;
    try {
      localStorage.setItem('lego_current_grade', String(this.currentGrade));
    } catch (e) {}
    this.renderSyllabus();
  }`;

if (normalize(cm).includes(normalize(targetCmLoadGrade))) {
  cm = normalize(cm).replace(normalize(targetCmLoadGrade), replacementCmLoadGrade);
  console.log('CodingModule.js loadGrade updated successfully!');
} else {
  console.error('Target loadGrade in codingModule.js not found!');
}

fs.writeFileSync('js/codingModule.js', cm);
console.log('Saved js/codingModule.js');

// 3. Update js/algorithmsModule.js
let am = fs.readFileSync('js/algorithmsModule.js', 'utf8');

const targetAmShowScreen = `    showScreen() {
      const screen = document.getElementById('screen-coding-algorithms');
      if (screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
        screen.classList.toggle('grade-1-active', this.currentGrade === 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }`;

const replacementAmShowScreen = `    showScreen() {
      const screen = document.getElementById('screen-coding-algorithms');
      if (screen) {
        if (typeof window !== 'undefined' && window.appShowScreen) {
          window.appShowScreen(screen);
        } else {
          document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
          screen.classList.add('active');
        }
        screen.classList.toggle('grade-1-active', this.currentGrade === 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }`;

if (normalize(am).includes(normalize(targetAmShowScreen))) {
  am = normalize(am).replace(normalize(targetAmShowScreen), replacementAmShowScreen);
  console.log('AlgorithmsModule.js showScreen updated successfully!');
} else {
  console.error('Target showScreen in algorithmsModule.js not found!');
}

const targetAmExit = `    exitToSyllabus() {
      if (window.MagicAudioEngine) window.MagicAudioEngine.playClick();
      if (window.codingManager) {
        window.codingManager.loadGrade(this.currentGrade);
      } else {
        const syl = document.getElementById('screen-coding-syllabus');
        if (syl) {
          document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
          syl.classList.add('active');
        }
      }
    }`;

const replacementAmExit = `    exitToSyllabus() {
      if (window.MagicAudioEngine) window.MagicAudioEngine.playClick();
      try {
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.removeItem('lego_active_screen');
        }
      } catch (e) {}
      if (window.codingManager) {
        window.codingManager.loadGrade(this.currentGrade);
      } else {
        const syl = document.getElementById('screen-coding-syllabus');
        if (typeof window !== 'undefined' && window.appShowScreen && syl) {
          window.appShowScreen(syl);
        } else if (syl) {
          document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
          syl.classList.add('active');
        }
      }
    }`;

if (normalize(am).includes(normalize(targetAmExit))) {
  am = normalize(am).replace(normalize(targetAmExit), replacementAmExit);
  console.log('AlgorithmsModule.js exitToSyllabus updated successfully!');
} else {
  console.error('Target exitToSyllabus in algorithmsModule.js not found!');
}

fs.writeFileSync('js/algorithmsModule.js', am);
console.log('Saved js/algorithmsModule.js');

// 4. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

const targetHtmlCard = `          <!-- Tema: ALGORITMOS (Activo para 1.° a 5.° Grado) -->
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

const replacementHtmlCard = `          <!-- Tema: ALGORITMOS (Activo para 1.° a 5.° Grado) -->
          <article id="topic-card-algorithms" class="topic-card active" role="button" tabindex="0" style="border-color: #8b5cf6; cursor: pointer;" onclick="if(window.codingManager){window.codingManager.startAlgorithmsTopic();}else if(window.algorithmsModule){window.algorithmsModule.startClass(1,1);}">
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
            <button id="btn-start-algorithms-topic" class="btn-start-topic" type="button" style="background: linear-gradient(180deg, #8b5cf6, #7c3aed); box-shadow: 0 4px 0 #5b21b6;" onclick="event.stopPropagation();if(window.codingManager){window.codingManager.startAlgorithmsTopic();}else if(window.algorithmsModule){window.algorithmsModule.startClass(1,1);}">
              <span>🧩</span> ¡Comenzar Algoritmos!
            </button>
          </article>`;

if (normalize(html).includes(normalize(targetHtmlCard))) {
  html = normalize(html).replace(normalize(targetHtmlCard), replacementHtmlCard);
  console.log('Index.html topic-card-algorithms updated successfully!');
} else {
  console.error('Target card in index.html not found!');
}

fs.writeFileSync('index.html', html);
console.log('Saved index.html');
console.log('All navigation fixes applied successfully.');
