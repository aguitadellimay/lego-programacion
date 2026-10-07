/**
 * canvasManager.js
 * Gestiona el lienzo Konva.js, el orden estricto de capas (Z-index),
 * la carga de fondos, fotos familiares, bloques de lego y la exportación de alta resolución.
 */

class CanvasManager {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.width = options.width || 900;
    this.height = options.height || 650;
    this.snapToGrid = false; // Ajuste magnético opcional

    this.selectedNode = null;
    this.familyPhotoNode = null;
    this.bgImageNode = null;

    this.initStage();
    this.initLayers();
    this.initTransformer();
    this.initEvents();
  }

  /**
   * Inicializa el Stage principal de Konva
   */
  initStage() {
    this.stage = new Konva.Stage({
      container: this.containerId,
      width: this.width,
      height: this.height
    });
  }

  /**
   * Inicializa las capas respetando el orden estricto:
   * Capa 1 (Fondo) -> Capa 2 (Foto Familiar) -> Capa 3 (Bloques Lego) -> Capa 4 (UI / Controles)
   */
  initLayers() {
    // 1. Capa de Fondo (Inferior)
    this.bgLayer = new Konva.Layer({ name: 'background-layer', listening: false });

    // 2. Capa de Foto Familiar (Intermedia)
    this.photoLayer = new Konva.Layer({ name: 'photo-layer' });

    // 3. Capa de Bloques Lego, Textos y Minifiguras (Superior)
    this.blocksLayer = new Konva.Layer({ name: 'blocks-layer' });

    // 4. Capa de Marca de Agua Oficial de la Escuela (Identidad Visual)
    this.watermarkLayer = new Konva.Layer({ name: 'watermark-layer', listening: false });

    // 5. Capa de Transformador y Guías (Interfaz)
    this.uiLayer = new Konva.Layer({ name: 'ui-layer' });

    // Añadir al stage en orden riguroso
    this.stage.add(this.bgLayer);
    this.stage.add(this.photoLayer);
    this.stage.add(this.blocksLayer);
    this.stage.add(this.watermarkLayer);
    this.stage.add(this.uiLayer);

    // Cuadrícula opcional para asistencia espacial
    this.gridLayer = new Konva.Layer({ name: 'grid-layer', listening: false, visible: false });
    this.stage.add(this.gridLayer);
    this.drawGrid();

    // Inicializar marca de agua de la escuela
    this.initWatermark();
  }

  /**
   * Dibuja una sutil rejilla guía para que los niños entiendan la lógica espacial
   */
  drawGrid() {
    const step = LEGO_CONFIG.UNIT_SIZE;
    for (let x = 0; x <= this.width; x += step) {
      this.gridLayer.add(new Konva.Line({
        points: [x, 0, x, this.height],
        stroke: 'rgba(255, 255, 255, 0.4)',
        strokeWidth: 1,
        dash: [4, 4]
      }));
    }
    for (let y = 0; y <= this.height; y += step) {
      this.gridLayer.add(new Konva.Line({
        points: [0, y, this.width, y],
        stroke: 'rgba(255, 255, 255, 0.4)',
        strokeWidth: 1,
        dash: [4, 4]
      }));
    }
  }

  /**
   * Configura el Transformador (manijas para rotar y redimensionar)
   */
  initTransformer() {
    this.transformer = new Konva.Transformer({
      nodes: [],
      rotateAnchorOffset: 25,
      borderStroke: '#2196F3',
      borderStrokeWidth: 2,
      borderDash: [5, 5],
      anchorStroke: '#2196F3',
      anchorFill: '#ffffff',
      anchorSize: 10,
      anchorCornerRadius: 5,
      boundBoxFunc: (oldBox, newBox) => {
        // Evitar que se haga microscópico o invertido
        if (newBox.width < 25 || newBox.height < 25) {
          return oldBox;
        }
        return newBox;
      }
    });

    this.uiLayer.add(this.transformer);
  }

  /**
   * Eventos del lienzo
   */
  initEvents() {
    // Clic en área vacía deselecciona
    this.stage.on('click tap', (e) => {
      // Si se hizo clic en el escenario o en el fondo
      if (e.target === this.stage || e.target.getLayer() === this.bgLayer) {
        this.deselect();
        return;
      }

      // Buscar si el objetivo o su padre es un bloque o la foto
      let clickedNode = e.target;
      while (clickedNode && clickedNode.parent && clickedNode.parent !== this.blocksLayer && clickedNode.parent !== this.photoLayer) {
        clickedNode = clickedNode.parent;
      }

      if (clickedNode && (clickedNode.parent === this.blocksLayer || clickedNode.parent === this.photoLayer)) {
        this.selectNode(clickedNode);
      }
    });

    // Control de arrastre externo (HTML Drag & Drop)
    const container = this.stage.container();

    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    });

    container.addEventListener('drop', (e) => {
      e.preventDefault();
      this.stage.setPointersPositions(e);
      const pointerPos = this.stage.getPointerPosition();

      try {
        const rawData = e.dataTransfer.getData('application/json');
        if (rawData) {
          const data = JSON.parse(rawData);
          if (data.type === 'lego-brick') {
            this.addLegoBrick(data.typeId, data.colorId, pointerPos.x, pointerPos.y);
          } else if (data.type === 'minifigure') {
            this.addMinifigure(data.figId, pointerPos.x, pointerPos.y);
          } else if (data.type === 'headless-body') {
            this.addHeadlessBody(data.bodyId, pointerPos.x, pointerPos.y);
          } else if (data.type === 'cropped-face') {
            this.addCroppedFace(data.faceDataUrl, pointerPos.x, pointerPos.y);
          } else if (data.type === 'pet-item') {
            this.addPetItem(data.itemId, pointerPos.x, pointerPos.y);
          }
        }
      } catch (err) {
        console.error('Error al soltar bloque:', err);
      }
    });

    // Tecla Delete/Supr o Backspace para eliminar elemento seleccionado
    window.addEventListener('keydown', (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && this.selectedNode) {
        // Evitar borrar si el usuario está escribiendo en un input
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
        e.preventDefault();
        this.deleteSelected();
      }
    });
  }

  /**
   * Establece el fondo seleccionado
   * @param {string} bgId - Identificador del fondo (parque, playa, espacio, etc.)
   */
  setBackground(bgId) {
    const bg = typeof BACKGROUNDS !== 'undefined' ? BACKGROUNDS.find(b => b.id === bgId) : null;

    const renderBg = (img) => {
      this.bgLayer.destroyChildren();

      this.bgImageNode = new Konva.Image({
        x: 0,
        y: 0,
        image: img,
        width: this.width,
        height: this.height
      });

      this.bgLayer.add(this.bgImageNode);
      this.bgLayer.batchDraw();
    };

    const loadFallbackSvg = () => {
      const dataUrl = getBackgroundDataUrl(bgId);
      if (!dataUrl) return;
      const svgImg = new Image();
      svgImg.onload = () => renderBg(svgImg);
      svgImg.src = dataUrl;
    };

    if (bg && bg.imgPath) {
      const extImg = new Image();
      extImg.onload = () => renderBg(extImg);
      extImg.onerror = () => loadFallbackSvg();
      extImg.src = bg.imgPath;
    } else {
      loadFallbackSvg();
    }
  }

  /**
   * Carga la foto familiar desde un File o DataURL
   * @param {File|string} source 
   */
  loadFamilyPhoto(source) {
    return new Promise((resolve, reject) => {
      const processImg = (imgUrl) => {
        const img = new Image();
        img.onload = () => {
          // Guardar referencia a la imagen original en bruto para recorte de rostros (Fase 5)
          this.rawPhotoImg = img;
          this.rawPhotoDataUrl = imgUrl;

          // Limpiar foto anterior si ya existía
          this.photoLayer.destroyChildren();

          // Calcular tamaño proporcional (máx 55% del ancho y 60% del alto)
          const maxWidth = this.width * 0.55;
          const maxHeight = this.height * 0.60;
          let w = img.width;
          let h = img.height;

          const ratio = Math.min(maxWidth / w, maxHeight / h);
          w = w * ratio;
          h = h * ratio;

          // Centrar en el lienzo
          const x = (this.width - w) / 2;
          const y = (this.height - h) / 2;

          // Grupo para la foto con marco blanco festivo estilo foto Polaroid/Recuerdo
          const photoGroup = new Konva.Group({
            x: x + w / 2,
            y: y + h / 2,
            width: w + 16,
            height: h + 16,
            offset: { x: (w + 16) / 2, y: (h + 16) / 2 },
            draggable: true,
            name: 'family-photo-group'
          });

          // Marco decorativo con sombra
          const frame = new Konva.Rect({
            x: 0,
            y: 0,
            width: w + 16,
            height: h + 16,
            fill: '#ffffff',
            stroke: '#ffca28',
            strokeWidth: 4,
            cornerRadius: 10,
            shadowColor: 'rgba(0,0,0,0.3)',
            shadowBlur: 12,
            shadowOffset: { x: 0, y: 5 }
          });
          photoGroup.add(frame);

          // Imagen fotográfica con esquinas redondeadas
          const photoNode = new Konva.Image({
            x: 8,
            y: 8,
            image: img,
            width: w,
            height: h,
            cornerRadius: 6
          });
          photoGroup.add(photoNode);

          this.photoLayer.add(photoGroup);
          this.familyPhotoNode = photoGroup;

          // Seleccionar para que el usuario pueda moverla o ajustarla
          this.selectNode(photoGroup);
          this.photoLayer.batchDraw();
          resolve(photoGroup);
        };
        img.onerror = reject;
        img.src = imgUrl;
      };

      if (typeof source === 'string') {
        processImg(source);
      } else if (source instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => processImg(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(source);
      }
    });
  }

  /**
   * Añade una pieza de Lego al lienzo
   */
  addLegoBrick(typeId, colorId, x, y) {
    const typeConfig = LEGO_CONFIG.TYPES.find(t => t.id === typeId) || LEGO_CONFIG.TYPES[5]; // Default 2x4
    const colorConfig = LEGO_CONFIG.COLORS.find(c => c.id === colorId) || LEGO_CONFIG.COLORS[0]; // Default Rojo

    // Posición por defecto en el centro si no se especifica
    const targetX = x !== undefined ? x : this.width / 2 + (Math.random() * 60 - 30);
    const targetY = y !== undefined ? y : this.height / 2 + (Math.random() * 60 - 30);

    const brick = createKonvaLegoBrick(typeConfig, colorConfig, targetX, targetY);

    // Ajuste magnético (Snap to Grid) durante el arrastre
    brick.on('dragmove', () => {
      if (this.snapToGrid) {
        const u = LEGO_CONFIG.UNIT_SIZE;
        brick.position({
          x: Math.round(brick.x() / u) * u,
          y: Math.round(brick.y() / u) * u
        });
      }
    });

    // Cursor interactivo
    brick.on('mouseenter', () => {
      this.stage.container().style.cursor = 'grab';
    });
    brick.on('mouseleave', () => {
      this.stage.container().style.cursor = 'default';
    });
    brick.on('dragstart', () => {
      this.stage.container().style.cursor = 'grabbing';
      this.selectNode(brick);
    });
    brick.on('dragend', () => {
      this.stage.container().style.cursor = 'grab';
      this.blocksLayer.batchDraw();
    });

    this.blocksLayer.add(brick);
    this.selectNode(brick);
    this.blocksLayer.batchDraw();

    return brick;
  }

  /**
   * Selecciona un elemento (bloque o foto) y le coloca el transformador
   */
  selectNode(node) {
    if (this.selectedNode === node) return;

    this.selectedNode = node;
    this.transformer.nodes([node]);

    // Opciones del transformador según el tipo
    if (node === this.familyPhotoNode) {
      this.transformer.enabledAnchors(['top-left', 'top-right', 'bottom-left', 'bottom-right']);
    } else {
      // Para los bloques permitimos rotación y cambio de escala opcional
      this.transformer.enabledAnchors(['top-left', 'top-right', 'bottom-left', 'bottom-right']);
    }

    this.uiLayer.batchDraw();

    // Disparar evento personalizado para la barra de herramientas de la UI
    const event = new CustomEvent('selectionchanged', {
      detail: {
        node: node,
        isPhoto: node === this.familyPhotoNode,
        isBrick: node !== this.familyPhotoNode && node !== null
      }
    });
    window.dispatchEvent(event);
  }

  /**
   * Quita la selección actual
   */
  deselect() {
    this.selectedNode = null;
    this.transformer.nodes([]);
    this.uiLayer.batchDraw();

    const event = new CustomEvent('selectionchanged', {
      detail: { node: null, isPhoto: false, isBrick: false }
    });
    window.dispatchEvent(event);
  }

  /**
   * Gira el objeto seleccionado 45 grados (muy fácil para niños)
   */
  rotateSelected(degrees = 45) {
    if (!this.selectedNode) return;
    const currentRot = this.selectedNode.rotation() || 0;
    this.selectedNode.rotation((currentRot + degrees) % 360);
    this.selectedNode.getLayer().batchDraw();
    this.uiLayer.batchDraw();
  }

  /**
   * Duplica el bloque seleccionado
   */
  duplicateSelected() {
    if (!this.selectedNode || this.selectedNode === this.familyPhotoNode) return;

    const bodyId = this.selectedNode.getAttr('bodyId');
    const itemId = this.selectedNode.getAttr('itemId');
    const faceDataUrl = this.selectedNode.getAttr('faceDataUrl');
    const figId = this.selectedNode.getAttr('figId');
    const typeId = this.selectedNode.getAttr('typeId');
    const colorId = this.selectedNode.getAttr('colorId');
    const x = this.selectedNode.x() + 25;
    const y = this.selectedNode.y() + 25;

    if (bodyId) {
      this.addHeadlessBody(bodyId, x, y);
    } else if (itemId) {
      this.addPetItem(itemId, x, y);
    } else if (faceDataUrl) {
      this.addCroppedFace(faceDataUrl, x, y);
    } else if (figId) {
      this.addMinifigure(figId, x, y);
    } else if (typeId) {
      this.addLegoBrick(typeId, colorId, x, y);
    }
  }

  /**
   * Cambia el color del bloque seleccionado
   */
  changeSelectedColor(colorId) {
    if (!this.selectedNode || this.selectedNode === this.familyPhotoNode) return;

    const typeId = this.selectedNode.getAttr('typeId');
    const x = this.selectedNode.x();
    const y = this.selectedNode.y();
    const rot = this.selectedNode.rotation();

    // Destruir el actual y crear uno nuevo con el nuevo color en la misma posición
    this.selectedNode.destroy();
    const newBrick = this.addLegoBrick(typeId, colorId, x, y);
    newBrick.rotation(rot);
    this.blocksLayer.batchDraw();
    this.uiLayer.batchDraw();
  }

  /**
   * Trae el bloque seleccionado hacia adelante
   */
  bringForward() {
    if (!this.selectedNode || this.selectedNode === this.familyPhotoNode) return;
    this.selectedNode.moveUp();
    this.blocksLayer.batchDraw();
  }

  /**
   * Envía el bloque seleccionado hacia atrás (pero nunca detrás de la foto ni del fondo)
   */
  sendBackward() {
    if (!this.selectedNode || this.selectedNode === this.familyPhotoNode) return;
    this.selectedNode.moveDown();
    this.blocksLayer.batchDraw();
  }

  /**
   * Elimina el objeto seleccionado
   */
  deleteSelected() {
    if (!this.selectedNode) return;

    if (this.selectedNode === this.familyPhotoNode) {
      this.familyPhotoNode = null;
    }

    const nodeToDelete = this.selectedNode;
    this.deselect();
    nodeToDelete.destroy();

    this.photoLayer.batchDraw();
    this.blocksLayer.batchDraw();
  }

  /**
   * Limpia todos los bloques de Lego
   */
  clearAllBricks() {
    this.deselect();
    this.blocksLayer.destroyChildren();
    this.blocksLayer.batchDraw();
  }

  /**
   * Activa o desactiva el imán / encaje con rejilla
   */
  toggleSnapToGrid(enabled) {
    this.snapToGrid = enabled !== undefined ? enabled : !this.snapToGrid;
    this.gridLayer.visible(this.snapToGrid);
    this.gridLayer.batchDraw();
    return this.snapToGrid;
  }

  /**
   * Exporta la composición completa visible a una imagen en alta resolución
   * Cumple con el requerimiento de privacidad 100% en el cliente.
   * @param {string} format 'png' o 'jpeg'
   */
  exportGift(format = 'png') {
    // 1. Deseleccionar cualquier elemento activo para ocultar manijas de edición
    this.deselect();

    // 2. Ocultar temporalmente la rejilla si estaba visible
    const wasGridVisible = this.gridLayer.visible();
    this.gridLayer.visible(false);

    // 3. Forzar renderizado nítido
    this.stage.batchDraw();

    // 4. Generar Data URL con pixelRatio: 2 (alta definición 1800x1300 ideal para imprimir)
    const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const dataUrl = this.stage.toDataURL({
      pixelRatio: 2,
      mimeType: mimeType,
      quality: 0.95
    });

    // 5. Restaurar visibilidad de rejilla
    if (wasGridVisible) {
      this.gridLayer.visible(true);
      this.gridLayer.batchDraw();
    }

    // 6. Generar descarga automática con fecha
    const fecha = new Date().toISOString().slice(0, 10);
    const fileName = `Mi_Regalo_Lego_Familiar_${fecha}.${format === 'jpeg' ? 'jpg' : 'png'}`;

    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return dataUrl;
  }

  /**
   * Carga la marca de agua con el logo oficial de la escuela (img/logo.png)
   * y la coloca en la esquina inferior derecha. Se incluye automáticamente en la exportación e impresión.
   */
  initWatermark() {
    const logoImg = new Image();
    logoImg.onload = () => {
      this.watermarkLayer.destroyChildren();

      const badgeWidth = 160;
      const badgeHeight = 52;
      const margin = 16;
      const x = this.width - badgeWidth - margin;
      const y = this.height - badgeHeight - margin;

      const group = new Konva.Group({
        x: x,
        y: y,
        name: 'watermark-group'
      });

      // Fondo distintivo tipo sello escolar redondeado
      const bgPill = new Konva.Rect({
        x: 0,
        y: 0,
        width: badgeWidth,
        height: badgeHeight,
        fill: 'rgba(255, 255, 255, 0.94)',
        stroke: '#ffd700',
        strokeWidth: 2,
        cornerRadius: 14,
        shadowColor: 'rgba(0,0,0,0.25)',
        shadowBlur: 8,
        shadowOffset: { x: 0, y: 3 }
      });
      group.add(bgPill);

      // Calcular proporción de imagen del logo
      const imgAspect = logoImg.width / logoImg.height;
      let imgH = 38;
      let imgW = imgH * imgAspect;
      if (imgW > 60) {
        imgW = 60;
        imgH = imgW / imgAspect;
      }

      const logoNode = new Konva.Image({
        x: 8,
        y: (badgeHeight - imgH) / 2,
        image: logoImg,
        width: imgW,
        height: imgH
      });
      group.add(logoNode);

      // Texto de la escuela / Día de la Familia
      const textTitle = new Konva.Text({
        x: imgW + 14,
        y: 11,
        text: 'Lego Familiar',
        fontSize: 13,
        fontFamily: 'Fredoka, sans-serif',
        fontStyle: 'bold',
        fill: '#E3000B'
      });
      group.add(textTitle);

      const textSubtitle = new Konva.Text({
        x: imgW + 14,
        y: 28,
        text: 'Regalo Escolar',
        fontSize: 11,
        fontFamily: 'Fredoka, sans-serif',
        fill: '#455a64'
      });
      group.add(textSubtitle);

      this.watermarkLayer.add(group);
      this.watermarkLayer.batchDraw();
    };
    logoImg.onerror = () => {
      console.warn('No se pudo cargar img/logo.png para la marca de agua.');
    };
    logoImg.src = 'img/logo.png';
  }

  /**
   * Añade un texto personalizado dinámico y editable
   * @param {string} textContent - El mensaje a insertar
   * @param {object} options - Tipografía, color, tamaño
   */
  addText(textContent, options = {}) {
    const content = textContent && textContent.trim() ? textContent.trim() : '¡Feliz Día Familia! ❤️';
    const fontFamily = options.fontFamily || 'Fredoka';
    const fill = options.fill || '#E3000B';
    const fontSize = options.fontSize || 38;

    const targetX = options.x !== undefined ? options.x : this.width / 2;
    const targetY = options.y !== undefined ? options.y : this.height / 2;

    const textNode = new Konva.Text({
      x: targetX,
      y: targetY,
      text: content,
      fontSize: fontSize,
      fontFamily: fontFamily,
      fill: fill,
      stroke: '#ffffff',
      strokeWidth: 3,
      fillAfterStrokeEnabled: true,
      align: 'center',
      draggable: true,
      name: 'custom-text-node',
      shadowColor: 'rgba(0, 0, 0, 0.35)',
      shadowBlur: 6,
      shadowOffset: { x: 2, y: 2 }
    });

    // Centrar origen para rotación fluida
    textNode.offsetX(textNode.width() / 2);
    textNode.offsetY(textNode.height() / 2);

    textNode.on('mouseenter', () => { this.stage.container().style.cursor = 'grab'; });
    textNode.on('mouseleave', () => { this.stage.container().style.cursor = 'default'; });
    textNode.on('dragstart', () => {
      this.stage.container().style.cursor = 'grabbing';
      this.selectNode(textNode);
    });
    textNode.on('dragend', () => {
      this.stage.container().style.cursor = 'grab';
      this.blocksLayer.batchDraw();
    });

    this.blocksLayer.add(textNode);
    this.selectNode(textNode);
    this.blocksLayer.batchDraw();

    return textNode;
  }

  /**
   * Añade una minifigura o mascota Lego a la composición
   */
  addMinifigure(figId, x, y) {
    const figConfig = LEGO_CONFIG.FIGURES.find(f => f.id === figId) || LEGO_CONFIG.FIGURES[0];
    const targetX = x !== undefined ? x : this.width / 2 + (Math.random() * 60 - 30);
    const targetY = y !== undefined ? y : this.height / 2 + (Math.random() * 60 - 30);

    createKonvaMinifigure(figConfig, targetX, targetY, (figNode) => {
      figNode.on('mouseenter', () => { this.stage.container().style.cursor = 'grab'; });
      figNode.on('mouseleave', () => { this.stage.container().style.cursor = 'default'; });
      figNode.on('dragstart', () => {
        this.stage.container().style.cursor = 'grabbing';
        this.selectNode(figNode);
      });
      figNode.on('dragend', () => {
        this.stage.container().style.cursor = 'grab';
        this.blocksLayer.batchDraw();
      });

      this.blocksLayer.add(figNode);
      this.selectNode(figNode);
      this.blocksLayer.batchDraw();
    });
  }

  /**
   * Añade un cuerpo Lego sin cabeza (Fase 5)
   * Muestra el cuello listo para recibir el sticker de la cara recortada
   * @param {string} bodyId
   * @param {number} x
   * @param {number} y
   */
  addHeadlessBody(bodyId, x, y) {
    const bodyConfig = LEGO_CONFIG.HEADLESS_BODIES.find(b => b.id === bodyId) || LEGO_CONFIG.HEADLESS_BODIES[0];
    const targetX = x !== undefined ? x : this.width / 2 + (Math.random() * 60 - 30);
    const targetY = y !== undefined ? y : this.height / 2 + (Math.random() * 60 - 30);

    createKonvaHeadlessBody(bodyConfig, targetX, targetY, (bodyNode) => {
      bodyNode.on('mouseenter', () => { this.stage.container().style.cursor = 'grab'; });
      bodyNode.on('mouseleave', () => { this.stage.container().style.cursor = 'default'; });
      bodyNode.on('dragstart', () => {
        this.stage.container().style.cursor = 'grabbing';
        this.selectNode(bodyNode);
      });
      bodyNode.on('dragend', () => {
        this.stage.container().style.cursor = 'grab';
        this.blocksLayer.batchDraw();
      });

      this.blocksLayer.add(bodyNode);
      this.selectNode(bodyNode);
      this.blocksLayer.batchDraw();
    });
  }

  /**
   * Añade una cara recortada como sticker interactivo (Fase 5)
   * Se posiciona en blocksLayer y se le aplica moveToTop() para quedar
   * perfectamente montada sobre el cuello de cualquier cuerpo Lego.
   * @param {string} dataUrl - Data URL en PNG de la cara recortada con transparencia
   * @param {number} x
   * @param {number} y
   */
  addCroppedFace(dataUrl, x, y) {
    const targetX = x !== undefined ? x : this.width / 2 + (Math.random() * 60 - 30);
    const targetY = y !== undefined ? y : this.height / 2 + (Math.random() * 60 - 30);

    const faceImg = new Image();
    faceImg.onload = () => {
      // Tamaño ideal para la cabeza de Lego (~68px de diámetro)
      const size = 68;
      const faceNode = new Konva.Image({
        x: targetX,
        y: targetY,
        image: faceImg,
        width: size,
        height: size,
        offset: { x: size / 2, y: size / 2 },
        draggable: true,
        name: 'cropped-face-node',
        faceDataUrl: dataUrl,
        shadowColor: 'rgba(0, 0, 0, 0.35)',
        shadowBlur: 8,
        shadowOffset: { x: 0, y: 3 },
        shadowOpacity: 0.6
      });

      faceNode.on('mouseenter', () => { this.stage.container().style.cursor = 'grab'; });
      faceNode.on('mouseleave', () => { this.stage.container().style.cursor = 'default'; });
      faceNode.on('dragstart', () => {
        this.stage.container().style.cursor = 'grabbing';
        this.selectNode(faceNode);
      });
      faceNode.on('dragend', () => {
        this.stage.container().style.cursor = 'grab';
        this.blocksLayer.batchDraw();
      });

      this.blocksLayer.add(faceNode);
      // Colocar estrictamente en la cima dentro de blocksLayer
      faceNode.moveToTop();
      this.selectNode(faceNode);
      this.blocksLayer.batchDraw();
    };
    faceImg.src = dataUrl;
  }

  /**
   * Añade un accesorio de mascota: pecera o pececito (Fase 5)
   * @param {string} itemId
   * @param {number} x
   * @param {number} y
   */
  addPetItem(itemId, x, y) {
    const itemConfig = LEGO_CONFIG.PET_ITEMS.find(p => p.id === itemId) || LEGO_CONFIG.PET_ITEMS[0];
    const targetX = x !== undefined ? x : this.width / 2 + (Math.random() * 60 - 30);
    const targetY = y !== undefined ? y : this.height / 2 + (Math.random() * 60 - 30);

    createKonvaPetItem(itemConfig, targetX, targetY, (itemNode) => {
      itemNode.on('mouseenter', () => { this.stage.container().style.cursor = 'grab'; });
      itemNode.on('mouseleave', () => { this.stage.container().style.cursor = 'default'; });
      itemNode.on('dragstart', () => {
        this.stage.container().style.cursor = 'grabbing';
        this.selectNode(itemNode);
      });
      itemNode.on('dragend', () => {
        this.stage.container().style.cursor = 'grab';
        this.blocksLayer.batchDraw();
      });

      this.blocksLayer.add(itemNode);
      this.selectNode(itemNode);
      this.blocksLayer.batchDraw();
    });
  }

  /**
   * Recorta una porción circular de una imagen (HTMLImageElement)
   * Algoritmo 100% nativo en el cliente con Canvas 2D y clip()
   * @param {HTMLImageElement} sourceImg
   * @param {number} sx - Centro X en píxeles originales
   * @param {number} sy - Centro Y en píxeles originales
   * @param {number} sRadius - Radio en píxeles originales
   * @param {string} shape - 'circle' o 'oval'
   * @returns {string} DataURL PNG
   */
  cropCircleFromImage(sourceImg, sx, sy, sRadius, shape = 'circle') {
    const isOval = shape === 'oval';
    const rx = sRadius;
    const ry = isOval ? sRadius * 1.18 : sRadius;

    const canvasW = Math.max(40, Math.round(rx * 2));
    const canvasH = Math.max(40, Math.round(ry * 2));

    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = canvasW;
    cropCanvas.height = canvasH;
    const ctx = cropCanvas.getContext('2d');

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Máscara elíptica o circular
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(canvasW / 2, canvasH / 2, canvasW / 2 - 2, canvasH / 2 - 2, 0, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Dibujar la sub-región de la imagen original
    const sourceX = sx - rx;
    const sourceY = sy - ry;
    const sourceW = rx * 2;
    const sourceH = ry * 2;
    ctx.drawImage(sourceImg, sourceX, sourceY, sourceW, sourceH, 0, 0, canvasW, canvasH);
    ctx.restore();

    // Borde sutil amarillo clásico de minifigura Lego
    ctx.beginPath();
    ctx.ellipse(canvasW / 2, canvasH / 2, canvasW / 2 - 2, canvasH / 2 - 2, 0, 0, Math.PI * 2);
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = '#fed700';
    ctx.stroke();

    return cropCanvas.toDataURL('image/png');
  }

  /**
   * Retorna la imagen en bruto cargada o null si no existe
   */
  getRawPhoto() {
    return this.rawPhotoImg || null;
  }

  /**
   * Dispara la ventana de impresión del navegador con el regalo optimizado
   */
  printGift() {
    this.deselect();
    const wasGridVisible = this.gridLayer.visible();
    this.gridLayer.visible(false);
    this.stage.batchDraw();

    const dataUrl = this.stage.toDataURL({
      pixelRatio: 2,
      mimeType: 'image/png'
    });

    if (wasGridVisible) {
      this.gridLayer.visible(true);
      this.gridLayer.batchDraw();
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Por favor habilita las ventanas emergentes (pop-ups) en tu navegador para imprimir.');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Imprimir Regalo - Día de la Familia</title>
        <style>
          @page { size: landscape; margin: 10mm; }
          body {
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: #ffffff;
            font-family: sans-serif;
          }
          img {
            max-width: 95%;
            max-height: 95vh;
            object-fit: contain;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
        </style>
      </head>
      <body>
        <img src="${dataUrl}" alt="Regalo Familiar" onload="window.print(); window.close();" />
      </body>
      </html>
    `);
    printWindow.document.close();
  }
}
