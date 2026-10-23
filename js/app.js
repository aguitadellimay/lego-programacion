/**
 * app.js
 * Orquestador principal de la interfaz de usuario de "Lego Familiar" (Fase 2).
 * Conecta los controles del DOM con CanvasManager, MiniGame y gestiona eventos interactivos.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar CanvasManager
  const canvasContainer = document.getElementById('canvas-container');
  const canvasManager = new CanvasManager('canvas-container', {
    width: 900,
    height: 650
  });

  // Estado activo de la UI y colecciones reactivas
  let selectedColorId = 'red'; // Color Lego inicial
  let selectedTextFont = 'Fredoka';
  let selectedTextColor = '#E3000B';
  let savedCroppedFaces = []; // Colección de stickers de caras recortadas (Fase 5)

  // 2. Establecer fondo inicial por defecto (Parque)
  canvasManager.setBackground('parque');

  // 3. Inicializar galería de fondos (incluye Minecraft)
  initBackgroundsGallery();

  // 4. Inicializar paleta de bloques Lego
  initLegoPalette();

  // 5. Inicializar paletas de figuras y cuerpos Lego (Fase 5)
  initMinifiguresPalette();
  initHeadlessBodiesPalette();
  initPetItemsPalette();
  renderCroppedFacesPalette();

  // 6. Inicializar herramienta de texto
  initTextTool();

  // 7. Configurar carga de foto familiar y taller de recorte de caras (Fase 5)
  initPhotoUploader();
  initFaceCropperTool();

  // 8. Configurar barra de herramientas (Girar, Borrar, Imán, etc.)
  initToolbar();

  // 9. Configurar botón de Exportación y botón de Impresión directa
  initExportAndPrintButtons();

  // 10. Navegación por pestañas laterales
  initTabNavigation();

  // 11. Inicializar Navegación del Menú Principal y Mini-Juego Fase 3
  initNavigationAndMiniGame();

  /**
   * Inicializa la navegación entre el Menú Principal, Selección de Grados, Mini-Juego y Editor
   */
  function initNavigationAndMiniGame() {
    const screenHome = document.getElementById('screen-home');
    const screenGrades = document.getElementById('screen-grades');
    const screenGame = document.getElementById('screen-game');
    const screenEditor = document.getElementById('screen-editor');
    const screenCodingGrades = document.getElementById('screen-coding-grades');
    const screenCodingSyllabus = document.getElementById('screen-coding-syllabus');
    const screenCodingTopic = document.getElementById('screen-coding-topic');
    const screenCodingAdventure = document.getElementById('screen-coding-adventure');

    const btnHomePlay = document.getElementById('btn-home-play');
    const bannerPlay = document.getElementById('banner-play');
    const btnHomeEditor = document.getElementById('btn-home-editor');
    const bannerEditor = document.getElementById('banner-editor');
    const btnHomeCoding = document.getElementById('btn-home-coding');
    const bannerCoding = document.getElementById('banner-coding');
    const btnHomeAdventure = document.getElementById('btn-home-adventure');
    const bannerAdventure = document.getElementById('banner-adventure');

    const btnBackToHomeFromGrades = document.getElementById('btn-back-to-home-from-grades');
    const gradeCards = document.querySelectorAll('.grade-card');

    const btnHomeFromGame = document.getElementById('btn-home-from-game');
    const btnSkipMission = document.getElementById('btn-skip-mission');
    const btnStartWorkshop = document.getElementById('btn-start-workshop');

    // Inicializar el gestor de Programación
    let codingManager;
    const showScreen = (targetScreen) => {
      // Verificación de disponibilidad por Panel Docente
      if (window.teacherManager && targetScreen && targetScreen !== screenHome) {
        if (!window.teacherManager.canAccessScreen(targetScreen.id)) {
          // Si el módulo está bloqueado, permanecer o volver a screenHome
          [screenHome, screenGrades, screenGame, screenEditor, screenCodingGrades, screenCodingSyllabus, screenCodingTopic, screenCodingAdventure].forEach(s => {
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
      [screenHome, screenGrades, screenGame, screenEditor, screenCodingGrades, screenCodingSyllabus, screenCodingTopic, screenCodingAdventure].forEach(s => {
        if (s) s.classList.remove('active');
      });
      if (targetScreen) targetScreen.classList.add('active');

      // Control estricto de visibilidad de botones del editor de regalos
      const isEditor = (targetScreen === screenEditor);
      document.body.classList.toggle('editor-mode', isEditor);
      const headerActions = document.getElementById('header-gift-actions') || document.querySelector('.header-actions');
      const printBtn = document.getElementById('btn-print-gift');
      const exportBtn = document.getElementById('btn-export-gift');
      const homeFromEditor = document.getElementById('btn-home-from-editor');
      if (headerActions) headerActions.style.setProperty('display', isEditor ? 'flex' : 'none', 'important');
      if (printBtn) printBtn.style.setProperty('display', isEditor ? 'flex' : 'none', 'important');
      if (exportBtn) exportBtn.style.setProperty('display', isEditor ? 'flex' : 'none', 'important');
      if (homeFromEditor) homeFromEditor.style.setProperty('display', isEditor ? 'inline-flex' : 'none', 'important');
    };

    codingManager = new CodingModuleManager({
      onPlaySound: (type) => {
        if (type === 'pop') playPopSound();
        else if (type === 'click') playClickSound();
        else if (type === 'coin') { playSnapSound(); playTone(880, 'triangle', 0.15); }
        else if (type === 'snap') playSnapSound();
        else if (type === 'hit') playTrashSound();
        else if (type === 'wrong') playTone(220, 'sawtooth', 0.18);
        else if (type === 'trash') playTrashSound();
        else if (type === 'levelComplete') playCheerSound();
        else if (type === 'fanfare') playFanfareSound();
      },
      onLaunchConfetti: () => {
        launchConfetti();
      },
      onShowScreen: (screenId) => {
        const target = document.getElementById(screenId);
        if (target) showScreen(target);
      }
    });

    // Inicializar estado del encabezado en la pantalla de inicio
    showScreen(screenHome);

    // Inicializar el motor del juego matemático con diferenciación de grados y clima
    const game = new MinecraftLegoGame('minigame-canvas', {
      onPlaySound: (type) => {
        if (type === 'jump') playTone(420, 'square', 0.08);
        else if (type === 'coin') { playSnapSound(); playTone(880, 'triangle', 0.15); }
        else if (type === 'hit') playTrashSound();
        else if (type === 'wrong') playTone(220, 'sawtooth', 0.18);
        else if (type === 'levelComplete') playCheerSound();
        else if (type === 'fanfare') playFanfareSound();
      },
      onAllCompleted: () => {
        playFanfareSound();
      }
    });

    // 1. Opción A: Ir a la selección de grados (1° a 5°) de Matemática o directo al juego
    const openPlayMode = () => {
      if (window.teacherManager && !window.teacherManager.isModuleEnabled('play')) {
        window.teacherManager.showBlockedNotice('Jugar y aprender');
        return;
      }
      if (screenGrades) {
        showScreen(screenGrades);
      } else if (screenGame) {
        showScreen(screenGame);
        if (typeof game !== 'undefined' && game.start) game.start();
      }
      playClickSound();
    };

    if (btnHomePlay) btnHomePlay.addEventListener('click', (e) => { e.stopPropagation(); openPlayMode(); });
    if (bannerPlay) bannerPlay.addEventListener('click', openPlayMode);

    const fallbackBtnPlay = document.querySelector('.banner-game .btn-banner-action');
    if (fallbackBtnPlay && !btnHomePlay) {
      fallbackBtnPlay.addEventListener('click', (e) => { e.stopPropagation(); openPlayMode(); });
    }

    // Selección de grado escolar para Matemática
    gradeCards.forEach(card => {
      card.addEventListener('click', () => {
        if (window.teacherManager && !window.teacherManager.isModuleEnabled('play')) {
          window.teacherManager.showBlockedNotice('Jugar y aprender');
          return;
        }
        const grade = card.getAttribute('data-grade');
        if (typeof game !== 'undefined') {
          if (game.setGrade) game.setGrade(grade);
          showScreen(screenGame);
          if (game.start) game.start();
        } else {
          showScreen(screenGame);
        }
        playClickSound();
      });
    });

    // Volver de Selección de Grados de Matemática a Home
    if (btnBackToHomeFromGrades) {
      btnBackToHomeFromGrades.addEventListener('click', () => {
        showScreen(screenHome);
        playClickSound();
      });
    }

    // 2. Opción B: MÓDULO DE PROGRAMACIÓN (1° a 5° Grado)
    const openCodingMode = () => {
      if (window.teacherManager && !window.teacherManager.isModuleEnabled('coding')) {
        window.teacherManager.showBlockedNotice('Módulo de programación');
        return;
      }
      if (typeof game !== 'undefined' && game.stop) game.stop();
      if (screenCodingGrades) {
        showScreen(screenCodingGrades);
      }
      playClickSound();
    };

    if (btnHomeCoding) btnHomeCoding.addEventListener('click', (e) => { e.stopPropagation(); openCodingMode(); });
    if (bannerCoding) bannerCoding.addEventListener('click', openCodingMode);

    const fallbackBtnCoding = document.querySelector('.banner-coding .btn-banner-action');
    if (fallbackBtnCoding && !btnHomeCoding) {
      fallbackBtnCoding.addEventListener('click', (e) => { e.stopPropagation(); openCodingMode(); });
    }

    // Selección de grado para Programación
    const codingGradeCards = document.querySelectorAll('.coding-grade-card');
    codingGradeCards.forEach(card => {
      card.addEventListener('click', () => {
        if (window.teacherManager && !window.teacherManager.isModuleEnabled('coding')) {
          window.teacherManager.showBlockedNotice('Módulo de programación');
          return;
        }
        const grade = card.getAttribute('data-cgrade');
        codingManager.loadGrade(grade);
        playClickSound();
      });
    });

    // Volver desde Selección de Grados de Programación a Home
    const btnBackToHomeFromCoding = document.getElementById('btn-back-to-home-from-coding');
    if (btnBackToHomeFromCoding) {
      btnBackToHomeFromCoding.addEventListener('click', () => {
        showScreen(screenHome);
        playClickSound();
      });
    }

    // 3. Opción: MÓDULO INDEPENDIENTE - DESAFÍO FINAL: INSTRUCCIONES (La Aventura de Bity)
    const openAdventureMode = () => {
      if (window.teacherManager && !window.teacherManager.isModuleEnabled('adventure')) {
        window.teacherManager.showBlockedNotice('La aventura de Bity');
        return;
      }
      if (typeof game !== 'undefined' && game.stop) game.stop();
      codingManager.startPlatformerAdventure({ returnTo: 'home' });
      playClickSound();
    };

    if (btnHomeAdventure) btnHomeAdventure.addEventListener('click', (e) => { e.stopPropagation(); openAdventureMode(); });
    if (bannerAdventure) bannerAdventure.addEventListener('click', openAdventureMode);

    const fallbackBtnAdventure = document.querySelector('.banner-adventure .btn-banner-action');
    if (fallbackBtnAdventure && !btnHomeAdventure) {
      fallbackBtnAdventure.addEventListener('click', (e) => { e.stopPropagation(); openAdventureMode(); });
    }

    // Exponer codingManager globalmente para interoperabilidad
    window.codingManager = codingManager;

    // 3. Opción C: Ir directamente al taller de la foto (Modo Creativo)
    const goToEditor = () => {
      if (window.teacherManager && !window.teacherManager.isModuleEnabled('editor')) {
        window.teacherManager.showBlockedNotice('Armar mi regalo familiar');
        return;
      }
      if (typeof game !== 'undefined' && game.stop) {
        game.stop();
      }
      showScreen(screenEditor);
      playCheerSound();
      if (typeof canvasManager !== 'undefined' && canvasManager.stage) {
        canvasManager.stage.batchDraw();
      }
    };

    if (btnHomeEditor) btnHomeEditor.addEventListener('click', (e) => { e.stopPropagation(); goToEditor(); });
    if (bannerEditor) bannerEditor.addEventListener('click', goToEditor);

    const fallbackBtnEditor = document.querySelector('.banner-editor .btn-banner-action');
    if (fallbackBtnEditor && !btnHomeEditor) {
      fallbackBtnEditor.addEventListener('click', (e) => { e.stopPropagation(); goToEditor(); });
    }

    // Botón volver al inicio desde el juego
    if (btnHomeFromGame) {
      btnHomeFromGame.addEventListener('click', () => {
        game.stop();
        showScreen(screenHome);
        playClickSound();
      });
    }

    // Botón volver al inicio desde el editor
    const btnHomeFromEditor = document.getElementById('btn-home-from-editor');
    if (btnHomeFromEditor) {
      btnHomeFromEditor.addEventListener('click', () => {
        showScreen(screenHome);
        playClickSound();
      });
    }

    // Botón saltar misión e ir al taller
    if (btnSkipMission) {
      btnSkipMission.addEventListener('click', goToEditor);
    }

    // Botón tras superar los 5 desafíos
    if (btnStartWorkshop) {
      btnStartWorkshop.addEventListener('click', () => {
        const victoryOverlay = document.getElementById('victory-overlay');
        if (victoryOverlay) victoryOverlay.classList.remove('visible');
        goToEditor();
      });
    }
  }

  /**
   * Inicializa la galería de fondos con tarjetas ilustradas (incluye Minecraft)
   */
  function initBackgroundsGallery() {
    const bgList = document.getElementById('bg-gallery');
    if (!bgList) return;

    bgList.innerHTML = '';
    BACKGROUNDS.forEach((bg, index) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `bg-card ${index === 0 ? 'active' : ''}`;
      card.setAttribute('data-id', bg.id);
      card.innerHTML = `
        <div class="bg-thumb">${bg.svg}</div>
        <span class="bg-title">${bg.name}</span>
      `;

      card.addEventListener('click', () => {
        document.querySelectorAll('.bg-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        canvasManager.setBackground(bg.id);
        playPopSound();
      });

      // Si el usuario coloca la imagen real en /img, actualizamos la miniatura automáticamente
      if (bg.imgPath) {
        const testImg = new Image();
        testImg.onload = () => {
          const thumbEl = card.querySelector('.bg-thumb');
          if (thumbEl) {
            thumbEl.innerHTML = `<img src="${bg.imgPath}" alt="${bg.name}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;">`;
          }
        };
        testImg.src = bg.imgPath;
      }

      bgList.appendChild(card);
    });
  }

  /**
   * Inicializa la paleta de colores y catálogo de piezas Lego
   */
  function initLegoPalette() {
    const colorPicker = document.getElementById('color-picker');
    const blocksGrid = document.getElementById('blocks-grid');
    if (!colorPicker || !blocksGrid) return;

    colorPicker.innerHTML = '';
    LEGO_CONFIG.COLORS.forEach(color => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `color-swatch ${color.id === selectedColorId ? 'active' : ''}`;
      btn.style.backgroundColor = color.hex;
      btn.title = color.name;
      btn.setAttribute('data-color', color.id);

      btn.addEventListener('click', () => {
        selectedColorId = color.id;
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        btn.classList.add('active');

        if (canvasManager.selectedNode && canvasManager.selectedNode !== canvasManager.familyPhotoNode) {
          canvasManager.changeSelectedColor(selectedColorId);
        }

        renderBlockItems();
        playClickSound();
      });

      colorPicker.appendChild(btn);
    });

    function renderBlockItems() {
      blocksGrid.innerHTML = '';
      const colorConfig = LEGO_CONFIG.COLORS.find(c => c.id === selectedColorId) || LEGO_CONFIG.COLORS[0];

      LEGO_CONFIG.TYPES.forEach(type => {
        const item = document.createElement('div');
        item.className = 'block-palette-item';
        item.draggable = true;
        item.setAttribute('data-type', type.id);
        item.title = `Arrastra o haz clic para añadir: ${type.name}`;

        const svgPreview = createLegoSVG(type, colorConfig);
        item.innerHTML = `
          <div class="block-preview-wrapper">${svgPreview}</div>
          <span class="block-label">${type.name}</span>
        `;

        item.addEventListener('dragstart', (e) => {
          const dragData = {
            type: 'lego-brick',
            typeId: type.id,
            colorId: selectedColorId
          };
          e.dataTransfer.setData('application/json', JSON.stringify(dragData));
          e.dataTransfer.effectAllowed = 'copy';
          item.classList.add('dragging');
        });

        item.addEventListener('dragend', () => {
          item.classList.remove('dragging');
        });

        item.addEventListener('click', () => {
          canvasManager.addLegoBrick(type.id, selectedColorId);
          playSnapSound();
        });

        blocksGrid.appendChild(item);
      });
    }

    renderBlockItems();
  }

  /**
   * Inicializa la paleta de Minifiguras Lego
   */
  function initMinifiguresPalette() {
    const minifigsGrid = document.getElementById('minifigs-grid');
    if (!minifigsGrid) return;

    minifigsGrid.innerHTML = '';
    LEGO_CONFIG.FIGURES.forEach(fig => {
      const item = document.createElement('div');
      item.className = 'minifig-item';
      item.draggable = true;
      item.setAttribute('data-fig', fig.id);
      item.title = `Arrastra o haz clic para añadir a: ${fig.name}`;

      const svgPreview = createMinifigureSVG(fig);
      item.innerHTML = `
        <div class="minifig-preview-wrapper">${svgPreview}</div>
        <span class="minifig-label">${fig.name}</span>
      `;

      item.addEventListener('dragstart', (e) => {
        const dragData = {
          type: 'minifigure',
          figId: fig.id
        };
        e.dataTransfer.setData('application/json', JSON.stringify(dragData));
        e.dataTransfer.effectAllowed = 'copy';
        item.classList.add('dragging');
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });

      item.addEventListener('click', () => {
        canvasManager.addMinifigure(fig.id);
        playSnapSound();
      });

      minifigsGrid.appendChild(item);
    });
  }

  /**
   * Inicializa la paleta de Cuerpos Lego sin cabeza (Fase 5)
   */
  function initHeadlessBodiesPalette() {
    const bodiesGrid = document.getElementById('headless-bodies-grid');
    if (!bodiesGrid) return;

    bodiesGrid.innerHTML = '';
    LEGO_CONFIG.HEADLESS_BODIES.forEach(body => {
      const item = document.createElement('div');
      item.className = 'minifig-item';
      item.draggable = true;
      item.setAttribute('data-body', body.id);
      item.title = `Arrastra o haz clic para añadir el cuerpo de: ${body.name}`;

      const svgPreview = createHeadlessBodySVG(body);
      item.innerHTML = `
        <div class="minifig-preview-wrapper">${svgPreview}</div>
        <span class="minifig-label">${body.name}</span>
      `;

      item.addEventListener('dragstart', (e) => {
        const dragData = {
          type: 'headless-body',
          bodyId: body.id
        };
        e.dataTransfer.setData('application/json', JSON.stringify(dragData));
        e.dataTransfer.effectAllowed = 'copy';
        item.classList.add('dragging');
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });

      item.addEventListener('click', () => {
        canvasManager.addHeadlessBody(body.id);
        playSnapSound();
      });

      bodiesGrid.appendChild(item);
    });
  }

  /**
   * Inicializa la paleta de Pecera y Pez (Fase 5)
   */
  function initPetItemsPalette() {
    const petGrid = document.getElementById('pet-items-grid');
    if (!petGrid) return;

    petGrid.innerHTML = '';
    LEGO_CONFIG.PET_ITEMS.forEach(pet => {
      const item = document.createElement('div');
      item.className = 'minifig-item';
      item.draggable = true;
      item.setAttribute('data-pet', pet.id);
      item.title = `Arrastra o haz clic para añadir: ${pet.name}`;

      const svgPreview = createPetItemSVG(pet);
      item.innerHTML = `
        <div class="minifig-preview-wrapper">${svgPreview}</div>
        <span class="minifig-label">${pet.name}</span>
      `;

      item.addEventListener('dragstart', (e) => {
        const dragData = {
          type: 'pet-item',
          itemId: pet.id
        };
        e.dataTransfer.setData('application/json', JSON.stringify(dragData));
        e.dataTransfer.effectAllowed = 'copy';
        item.classList.add('dragging');
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });

      item.addEventListener('click', () => {
        canvasManager.addPetItem(pet.id);
        playSnapSound();
      });

      petGrid.appendChild(item);
    });
  }

  /**
   * Renderiza la paleta de caras recortadas
   */
  function renderCroppedFacesPalette() {
    const palette = document.getElementById('cropped-faces-palette');
    if (!palette) return;

    palette.innerHTML = '';
    if (savedCroppedFaces.length === 0) {
      palette.innerHTML = `
        <div class="empty-faces-hint">
          <span>✂️</span>
          <p>Aún no recortaste caras. Sube tu foto familiar y pulsa <strong>Recortar</strong> para crear stickers de tu familia.</p>
        </div>
      `;
      return;
    }

    savedCroppedFaces.forEach((face, index) => {
      const item = document.createElement('div');
      item.className = 'cropped-face-item';
      item.draggable = true;
      item.title = 'Arrastra o haz clic para colocar este rostro sobre un cuerpo Lego';

      item.innerHTML = `
        <img src="${face.dataUrl}" class="cropped-face-img" alt="Cara recortada ${index + 1}">
        <button type="button" class="btn-delete-face" title="Eliminar cara">&times;</button>
      `;

      item.addEventListener('dragstart', (e) => {
        const dragData = {
          type: 'cropped-face',
          faceDataUrl: face.dataUrl
        };
        e.dataTransfer.setData('application/json', JSON.stringify(dragData));
        e.dataTransfer.effectAllowed = 'copy';
        item.classList.add('dragging');
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });

      item.addEventListener('click', (e) => {
        if (e.target.closest('.btn-delete-face')) return;
        canvasManager.addCroppedFace(face.dataUrl);
        playPopSound();
      });

      const delBtn = item.querySelector('.btn-delete-face');
      if (delBtn) {
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          savedCroppedFaces = savedCroppedFaces.filter(f => f.id !== face.id);
          renderCroppedFacesPalette();
          playTrashSound();
        });
      }

      palette.appendChild(item);
    });
  }

  /**
   * Inicializa la herramienta modal de Recorte de Caras (Face Cropper) - Fase 5
   */
  function initFaceCropperTool() {
    const modal = document.getElementById('face-cropper-modal');
    const btnOpenCropper = document.getElementById('btn-open-cropper');
    const btnQuickCrop = document.getElementById('btn-quick-crop-shortcut');
    const btnCloseCropper = document.getElementById('btn-close-cropper');
    const btnCancelCropper = document.getElementById('btn-cancel-cropper');
    const btnConfirmCrop = document.getElementById('btn-confirm-crop');

    const cropperCanvas = document.getElementById('cropper-canvas');
    const livePreview = document.getElementById('cropper-live-preview');
    const sizeSlider = document.getElementById('cropper-size-slider');
    const sizeDisplay = document.getElementById('cropper-size-display');
    const btnShapeCircle = document.getElementById('btn-shape-circle');
    const btnShapeOval = document.getElementById('btn-shape-oval');

    if (!modal || !cropperCanvas) return;

    const ctx = cropperCanvas.getContext('2d');
    const pCtx = livePreview ? livePreview.getContext('2d') : null;

    let cropperState = {
      img: null,
      shape: 'circle',
      reticle: {
        x: 300,
        y: 210,
        radius: 60
      },
      isDragging: false,
      dragOffsetX: 0,
      dragOffsetY: 0,
      imgDrawX: 0,
      imgDrawY: 0,
      imgDrawW: 0,
      imgDrawH: 0
    };

    let waitingForPhotoToOpenCropper = false;

    const openCropperModal = () => {
      const rawImg = canvasManager.getRawPhoto();
      if (!rawImg) {
        alert('📸 Primero debes elegir una foto familiar para recortar los rostros.');
        waitingForPhotoToOpenCropper = true;
        const photoInput = document.getElementById('photo-input');
        if (photoInput) photoInput.click();
        return;
      }

      cropperState.img = rawImg;
      modal.classList.add('visible');

      const cW = cropperCanvas.width;
      const cH = cropperCanvas.height;

      const scale = Math.min(cW / rawImg.naturalWidth, cH / rawImg.naturalHeight);
      cropperState.imgDrawW = rawImg.naturalWidth * scale;
      cropperState.imgDrawH = rawImg.naturalHeight * scale;
      cropperState.imgDrawX = (cW - cropperState.imgDrawW) / 2;
      cropperState.imgDrawY = (cH - cropperState.imgDrawH) / 2;

      cropperState.reticle.x = cW / 2;
      cropperState.reticle.y = cH / 2;
      cropperState.reticle.radius = sizeSlider ? parseInt(sizeSlider.value, 10) / 2 : 60;

      redraw();
      playClickSound();
    };

    const photoInput = document.getElementById('photo-input');
    if (photoInput) {
      photoInput.addEventListener('change', () => {
        if (waitingForPhotoToOpenCropper) {
          waitingForPhotoToOpenCropper = false;
          setTimeout(() => {
            if (canvasManager.getRawPhoto()) {
              openCropperModal();
            }
          }, 450);
        }
      });
    }

    if (btnOpenCropper) btnOpenCropper.addEventListener('click', openCropperModal);
    if (btnQuickCrop) btnQuickCrop.addEventListener('click', openCropperModal);

    const closeCropperModal = () => {
      modal.classList.remove('visible');
      playClickSound();
    };

    if (btnCloseCropper) btnCloseCropper.addEventListener('click', closeCropperModal);
    if (btnCancelCropper) btnCancelCropper.addEventListener('click', closeCropperModal);

    if (btnShapeCircle) {
      btnShapeCircle.addEventListener('click', () => {
        btnShapeCircle.classList.add('active');
        if (btnShapeOval) btnShapeOval.classList.remove('active');
        cropperState.shape = 'circle';
        redraw();
        playClickSound();
      });
    }

    if (btnShapeOval) {
      btnShapeOval.addEventListener('click', () => {
        btnShapeOval.classList.add('active');
        if (btnShapeCircle) btnShapeCircle.classList.remove('active');
        cropperState.shape = 'oval';
        redraw();
        playClickSound();
      });
    }

    if (sizeSlider) {
      sizeSlider.addEventListener('input', () => {
        const val = parseInt(sizeSlider.value, 10);
        cropperState.reticle.radius = val / 2;
        if (sizeDisplay) sizeDisplay.textContent = `${val}px`;
        redraw();
      });
    }

    function redraw() {
      if (!cropperState.img) return;

      const cW = cropperCanvas.width;
      const cH = cropperCanvas.height;
      const ret = cropperState.reticle;
      const isOval = cropperState.shape === 'oval';
      const rx = ret.radius;
      const ry = isOval ? ret.radius * 1.18 : ret.radius;

      ctx.clearRect(0, 0, cW, cH);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, cW, cH);

      ctx.drawImage(
        cropperState.img,
        cropperState.imgDrawX,
        cropperState.imgDrawY,
        cropperState.imgDrawW,
        cropperState.imgDrawH
      );

      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
      ctx.beginPath();
      ctx.rect(0, 0, cW, cH);
      ctx.ellipse(ret.x, ret.y, rx, ry, 0, 0, Math.PI * 2, true);
      ctx.fill('evenodd');
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(ret.x, ret.y, rx, ry, 0, 0, Math.PI * 2);
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#FED700';
      ctx.setLineDash([8, 4]);
      ctx.stroke();
      ctx.restore();

      const studW = rx * 0.45;
      const studH = 8;
      ctx.fillStyle = '#FED700';
      ctx.fillRect(ret.x - studW / 2, ret.y - ry - studH + 2, studW, studH);
      ctx.strokeStyle = '#c5a300';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(ret.x - studW / 2, ret.y - ry - studH + 2, studW, studH);

      ctx.strokeStyle = 'rgba(254, 215, 0, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ret.x - 10, ret.y); ctx.lineTo(ret.x + 10, ret.y);
      ctx.moveTo(ret.x, ret.y - 10); ctx.lineTo(ret.x, ret.y + 10);
      ctx.stroke();

      drawLivePreview(rx, ry);
    }

    function drawLivePreview(rx, ry) {
      if (!pCtx || !cropperState.img) return;

      const pW = livePreview.width;
      const pH = livePreview.height;
      pCtx.clearRect(0, 0, pW, pH);

      const scaleX = cropperState.img.naturalWidth / cropperState.imgDrawW;
      const scaleY = cropperState.img.naturalHeight / cropperState.imgDrawH;

      const origCenterX = (cropperState.reticle.x - cropperState.imgDrawX) * scaleX;
      const origCenterY = (cropperState.reticle.y - cropperState.imgDrawY) * scaleY;
      const origRx = rx * scaleX;
      const origRy = ry * scaleY;

      pCtx.save();
      pCtx.beginPath();
      pCtx.ellipse(pW / 2, pH / 2, pW / 2 - 2, pH / 2 - 2, 0, 0, Math.PI * 2);
      pCtx.clip();

      pCtx.drawImage(
        cropperState.img,
        origCenterX - origRx,
        origCenterY - origRy,
        origRx * 2,
        origRy * 2,
        0,
        0,
        pW,
        pH
      );
      pCtx.restore();

      pCtx.beginPath();
      pCtx.ellipse(pW / 2, pH / 2, pW / 2 - 2, pH / 2 - 2, 0, 0, Math.PI * 2);
      pCtx.lineWidth = 3;
      pCtx.strokeStyle = '#FED700';
      pCtx.stroke();
    }

    const getPos = (e) => {
      const rect = cropperCanvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const scaleX = cropperCanvas.width / rect.width;
      const scaleY = cropperCanvas.height / rect.height;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    };

    const onPointerDown = (e) => {
      e.preventDefault();
      const pos = getPos(e);
      const ret = cropperState.reticle;
      const dist = Math.hypot(pos.x - ret.x, pos.y - ret.y);

      cropperState.isDragging = true;
      if (dist <= ret.radius + 20) {
        cropperState.dragOffsetX = pos.x - ret.x;
        cropperState.dragOffsetY = pos.y - ret.y;
      } else {
        ret.x = Math.max(ret.radius, Math.min(cropperCanvas.width - ret.radius, pos.x));
        ret.y = Math.max(ret.radius, Math.min(cropperCanvas.height - ret.radius, pos.y));
        cropperState.dragOffsetX = 0;
        cropperState.dragOffsetY = 0;
        redraw();
      }
    };

    const onPointerMove = (e) => {
      if (!cropperState.isDragging) return;
      e.preventDefault();
      const pos = getPos(e);
      const ret = cropperState.reticle;
      const newX = pos.x - cropperState.dragOffsetX;
      const newY = pos.y - cropperState.dragOffsetY;

      ret.x = Math.max(ret.radius, Math.min(cropperCanvas.width - ret.radius, newX));
      ret.y = Math.max(ret.radius, Math.min(cropperCanvas.height - ret.radius, newY));
      redraw();
    };

    const onPointerUp = () => {
      cropperState.isDragging = false;
    };

    cropperCanvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    cropperCanvas.addEventListener('touchstart', onPointerDown, { passive: false });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);

    if (btnConfirmCrop) {
      btnConfirmCrop.addEventListener('click', () => {
        if (!cropperState.img) return;

        const ret = cropperState.reticle;
        const scaleX = cropperState.img.naturalWidth / cropperState.imgDrawW;
        const scaleY = cropperState.img.naturalHeight / cropperState.imgDrawH;

        const origCenterX = (ret.x - cropperState.imgDrawX) * scaleX;
        const origCenterY = (ret.y - cropperState.imgDrawY) * scaleY;
        const origRadius = ret.radius * scaleX;

        const faceDataUrl = canvasManager.cropCircleFromImage(
          cropperState.img,
          origCenterX,
          origCenterY,
          origRadius,
          cropperState.shape
        );

        savedCroppedFaces.push({
          id: 'face-' + Date.now(),
          dataUrl: faceDataUrl
        });

        renderCroppedFacesPalette();
        canvasManager.addCroppedFace(faceDataUrl);
        closeCropperModal();

        const tabMinifigs = document.querySelector('.tab-btn[data-tab="minifigs"]');
        if (tabMinifigs) tabMinifigs.click();

        playCheerSound();
      });
    }
  }

  /**
   * Inicializa la Herramienta de Texto Dinámico
   */
  function initTextTool() {
    const textInput = document.getElementById('text-message-input');
    const btnAddText = document.getElementById('btn-add-text');
    const fontButtons = document.querySelectorAll('.font-option-btn');
    const presetTags = document.querySelectorAll('.preset-tag');
    const textColorPicker = document.getElementById('text-color-picker');

    // Selector de tipografías
    fontButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        fontButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedTextFont = btn.getAttribute('data-font');
        playClickSound();
      });
    });

    // Etiquetas de mensajes predefinidos
    presetTags.forEach(tag => {
      tag.addEventListener('click', () => {
        if (textInput) {
          textInput.value = tag.getAttribute('data-text');
          playPopSound();
        }
      });
    });

    // Paleta de colores para el texto
    if (textColorPicker) {
      textColorPicker.innerHTML = '';
      LEGO_CONFIG.COLORS.forEach(color => {
        const swatch = document.createElement('button');
        swatch.type = 'button';
        swatch.className = `color-swatch ${color.hex === selectedTextColor ? 'active' : ''}`;
        swatch.style.backgroundColor = color.hex;
        swatch.title = color.name;

        swatch.addEventListener('click', () => {
          textColorPicker.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
          swatch.classList.add('active');
          selectedTextColor = color.hex;
          playClickSound();
        });

        textColorPicker.appendChild(swatch);
      });
    }

    // Botón para añadir el texto al lienzo
    if (btnAddText) {
      btnAddText.addEventListener('click', () => {
        const textValue = textInput ? textInput.value : '';
        canvasManager.addText(textValue, {
          fontFamily: selectedTextFont,
          fill: selectedTextColor,
          fontSize: 38
        });
        playSnapSound();
      });
    }
  }

  /**
   * Inicializa el cargador de fotos familiares
   */
  function initPhotoUploader() {
    const fileInput = document.getElementById('photo-input');
    const uploadBtn = document.getElementById('upload-btn-trigger');
    const photoPreviewContainer = document.getElementById('photo-status');

    if (uploadBtn && fileInput) {
      uploadBtn.addEventListener('click', () => fileInput.click());

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          canvasManager.loadFamilyPhoto(file).then(() => {
            playCheerSound();
            if (photoPreviewContainer) {
              photoPreviewContainer.innerHTML = `
                <div class="photo-loaded-badge">
                  <span>✅ ¡Foto familiar lista en el lienzo!</span>
                  <small>Puedes moverla y cambiar su tamaño.</small>
                </div>
              `;
            }
          }).catch(err => {
            alert('No se pudo cargar la imagen. Intenta con otra foto (JPG, PNG).');
            console.error(err);
          });
        }
      });
    }

    const removePhotoBtn = document.getElementById('btn-remove-photo');
    if (removePhotoBtn) {
      removePhotoBtn.addEventListener('click', () => {
        if (canvasManager.familyPhotoNode) {
          canvasManager.familyPhotoNode.destroy();
          canvasManager.familyPhotoNode = null;
          canvasManager.photoLayer.batchDraw();
          canvasManager.deselect();
          if (photoPreviewContainer) {
            photoPreviewContainer.innerHTML = '<span class="no-photo-text">Aún no has subido tu foto</span>';
          }
        }
      });
    }
  }

  /**
   * Barra de herramientas rápida
   */
  function initToolbar() {
    const rotateBtn = document.getElementById('btn-rotate');
    if (rotateBtn) {
      rotateBtn.addEventListener('click', () => {
        canvasManager.rotateSelected(45);
        playClickSound();
      });
    }

    const duplicateBtn = document.getElementById('btn-duplicate');
    if (duplicateBtn) {
      duplicateBtn.addEventListener('click', () => {
        canvasManager.duplicateSelected();
        playSnapSound();
      });
    }

    const bringUpBtn = document.getElementById('btn-layer-up');
    if (bringUpBtn) {
      bringUpBtn.addEventListener('click', () => canvasManager.bringForward());
    }
    const sendDownBtn = document.getElementById('btn-layer-down');
    if (sendDownBtn) {
      sendDownBtn.addEventListener('click', () => canvasManager.sendBackward());
    }

    const deleteBtn = document.getElementById('btn-delete');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        canvasManager.deleteSelected();
        playTrashSound();
      });
    }

    const clearBtn = document.getElementById('btn-clear-all');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('¿Quieres quitar todos los bloques de Lego y empezar de nuevo?')) {
          canvasManager.clearAllBricks();
          playTrashSound();
        }
      });
    }

    const snapToggle = document.getElementById('btn-toggle-snap');
    if (snapToggle) {
      snapToggle.addEventListener('click', () => {
        const isSnapped = canvasManager.toggleSnapToGrid();
        snapToggle.classList.toggle('active', isSnapped);
        snapToggle.querySelector('.snap-status').textContent = isSnapped ? 'Activado 🧲' : 'Libre 🖐️';
        playClickSound();
      });
    }

    window.addEventListener('selectionchanged', (e) => {
      const { node, isBrick } = e.detail;
      const requiresSelection = [rotateBtn, deleteBtn];
      const requiresBrick = [duplicateBtn, bringUpBtn, sendDownBtn];

      requiresSelection.forEach(btn => {
        if (btn) btn.disabled = !node;
      });

      requiresBrick.forEach(btn => {
        if (btn) btn.disabled = !isBrick;
      });
    });

    // Reproducir sonido al soltar piezas en el lienzo
    const container = canvasManager.stage.container();
    container.addEventListener('drop', () => {
      playSnapSound();
    });
  }

  /**
   * Configura los botones de Exportación, Impresión y la ventana de felicitación
   */
  function initExportAndPrintButtons() {
    const exportBtn = document.getElementById('btn-export-gift');
    const printBtn = document.getElementById('btn-print-gift');
    const celebrationModal = document.getElementById('celebration-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalPreviewImg = document.getElementById('modal-preview-img');

    // Botón de Descarga
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        playFanfareSound();
        const exportedUrl = canvasManager.exportGift('png');

        if (celebrationModal && modalPreviewImg) {
          modalPreviewImg.src = exportedUrl;
          celebrationModal.classList.add('visible');
          launchConfetti();
        }
      });
    }

    // Botón de Impresión Directa
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        playClickSound();
        canvasManager.printGift();
      });
    }

    if (modalCloseBtn && celebrationModal) {
      modalCloseBtn.addEventListener('click', () => {
        celebrationModal.classList.remove('visible');
      });
    }
  }

  /**
   * Pestañas de la barra lateral
   */
  function initTabNavigation() {
    const tabs = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-tab');

        tabs.forEach(t => t.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const activePanel = document.getElementById(`panel-${targetId}`);
        if (activePanel) activePanel.classList.add('active');

        playClickSound();
      });
    });
  }

  // ==========================================
  // Efectos de sonido Web Audio API
  // ==========================================
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playTone(freq, type, duration) {
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio desbloqueado tras interacción
    }
  }

  function playClickSound() { playTone(600, 'sine', 0.08); }
  function playPopSound() { playTone(450, 'triangle', 0.12); }
  function playSnapSound() {
    playTone(520, 'square', 0.05);
    setTimeout(() => playTone(780, 'square', 0.07), 40);
  }
  function playTrashSound() { playTone(220, 'sawtooth', 0.15); }
  function playCheerSound() {
    [400, 500, 650, 800].forEach((freq, i) => {
      setTimeout(() => playTone(freq, 'sine', 0.15), i * 70);
    });
  }
  function playFanfareSound() {
    [523, 659, 783, 1046].forEach((freq, i) => {
      setTimeout(() => playTone(freq, 'triangle', 0.25), i * 90);
    });
  }

  /**
   * Recompensa visual (el confeti continuo fue eliminado según requerimiento)
   */
  function launchConfetti() {
    const container = document.getElementById('confetti-container');
    if (container) container.innerHTML = '';
  }
});
