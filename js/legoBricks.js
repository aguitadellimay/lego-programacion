/**
 * Definición de piezas, colores y generador visual de bloques estilo LEGO para Konva.js.
 */

const LEGO_CONFIG = {
  UNIT_SIZE: 36, // Tamaño base de 1 espiga/stud en píxeles (rejilla)
  STUD_RADIUS: 9,
  BORDER_RADIUS: 4,

  // Paleta de colores oficiales y alegres
  COLORS: [
    { id: 'red', name: 'Rojo', hex: '#E3000B', darkHex: '#A30007', lightHex: '#FF545D' },
    { id: 'blue', name: 'Azul', hex: '#0055BF', darkHex: '#003980', lightHex: '#3D8CFF' },
    { id: 'yellow', name: 'Amarillo', hex: '#FED700', darkHex: '#BFA200', lightHex: '#FFEE66' },
    { id: 'green', name: 'Verde', hex: '#00852B', darkHex: '#00591D', lightHex: '#2BD45C' },
    { id: 'orange', name: 'Naranja', hex: '#FE8A18', darkHex: '#BA5E00', lightHex: '#FFAC59' },
    { id: 'purple', name: 'Morado', hex: '#8E24AA', darkHex: '#5C007A', lightHex: '#BA68C8' },
    { id: 'pink', name: 'Rosa', hex: '#FF4081', darkHex: '#C51162', lightHex: '#FF79B0' },
    { id: 'white', name: 'Blanco', hex: '#F0F0F0', darkHex: '#BDBDBD', lightHex: '#FFFFFF' },
    { id: 'black', name: 'Negro', hex: '#333333', darkHex: '#1A1A1A', lightHex: '#555555' }
  ],

  // Formas de bloques disponibles
  TYPES: [
    { id: 'brick-1x1', name: '1 x 1', cols: 1, rows: 1, category: 'basic' },
    { id: 'brick-1x2', name: '1 x 2', cols: 2, rows: 1, category: 'basic' },
    { id: 'brick-1x4', name: '1 x 4', cols: 4, rows: 1, category: 'basic' },
    { id: 'brick-2x2', name: '2 x 2', cols: 2, rows: 2, category: 'basic' },
    { id: 'brick-2x3', name: '2 x 3', cols: 3, rows: 2, category: 'basic' },
    { id: 'brick-2x4', name: '2 x 4 Clásico', cols: 4, rows: 2, category: 'basic' },
    { id: 'brick-2x6', name: '2 x 6 Viga', cols: 6, rows: 2, category: 'basic' },
    { id: 'brick-special-heart', name: '❤️ Amor Familiar', cols: 2, rows: 2, category: 'special', icon: '❤️' },
    { id: 'brick-special-smile', name: '😊 Sonrisa', cols: 2, rows: 2, category: 'special', icon: '😊' },
    { id: 'brick-special-star', name: '⭐ Estrella', cols: 2, rows: 2, category: 'special', icon: '⭐' },
    { id: 'brick-special-gift', name: '🎁 Regalo', cols: 2, rows: 2, category: 'special', icon: '🎁' }
  ],

  // Personajes / Minifiguras Lego para armar la familia y aventuras (Fase 5.2)
  FIGURES: [
    { id: 'fig-dad', name: '👨 Papá Lego', role: 'Papá', hair: '#5d4037', shirt: '#1e88e5', pants: '#37474f', acc: 'tie', imgPath: 'img/figura_papa.png' },
    { id: 'fig-mom', name: '👩 Mamá Lego', role: 'Mamá', hair: '#f57c00', shirt: '#e91e63', pants: '#8e24aa', acc: 'necklace', imgPath: 'img/figura_mama.png' },
    { id: 'fig-boy', name: '👦 Hijo Lego', role: 'Hijo', hair: '#8d6e63', shirt: '#43a047', pants: '#1976d2', acc: 'cap', isKid: true, imgPath: 'img/figura_hijo.png' },
    { id: 'fig-girl', name: '👧 Hija Lego', role: 'Hija', hair: '#ffd54f', shirt: '#ff4081', pants: '#00bcd4', acc: 'bow', isKid: true, imgPath: 'img/figura_hija.png' },
    // 👇 Nuevos hermanos y bebé (Fase 5.2)
    { id: 'fig-skater', name: '🛹 Hermano Skater', role: 'Hermano', hair: '#3e2723', shirt: '#ff6f00', pants: '#37474f', acc: 'skater', isKid: true, imgPath: 'img/figura_hermano_skater.png' },
    { id: 'fig-gamer', name: '🎧 Hermano Gamer', role: 'Hermano', hair: '#212121', shirt: '#7b1fa2', pants: '#1a237e', acc: 'gamer', isKid: true, imgPath: 'img/figura_hermano_gamer.png' },
    { id: 'fig-floral', name: '🌸 Hermana Floral', role: 'Hermana', hair: '#fbc02d', shirt: '#00bcd4', pants: '#ff4081', acc: 'floral', isKid: true, imgPath: 'img/figura_hermana_floral.png' },
    { id: 'fig-artist', name: '🎨 Hermana Artista', role: 'Hermana', hair: '#5d4037', shirt: '#ffffff', pants: '#388e3c', acc: 'artist', isKid: true, imgPath: 'img/figura_hermana_artista.png' },
    { id: 'fig-baby', name: '👶 Bebé Lego', role: 'Bebé', hair: '#ffd54f', shirt: '#80d8ff', pants: '#ffffff', isBaby: true, imgPath: 'img/figura_bebe.png' },
    // Héroes y aventuras
    { id: 'fig-astronaut', name: '🚀 Astronauta', role: 'Astronauta', hair: '#eceff1', shirt: '#eceff1', pants: '#eceff1', acc: 'space', imgPath: 'img/figura_astronauta.png' },
    { id: 'fig-hero', name: '🦸 Superhéroe', role: 'Héroe', hair: '#212121', shirt: '#d32f2f', pants: '#1976d2', acc: 'cape', imgPath: 'img/figura_heroe.png' },
    { id: 'fig-dog', name: '🐶 Perrito Lego', role: 'Mascota', isPet: 'dog', fur: '#d7ccc8', imgPath: 'img/figura_perro.png' },
    { id: 'fig-cat', name: '🐱 Gatito Lego', role: 'Mascota', isPet: 'cat', fur: '#ffe082', imgPath: 'img/figura_gato.png' }
  ],

  // Cuerpos Lego listos para colocarles cabezas/rostros recortados (Fase 5 y 5.2)
  HEADLESS_BODIES: [
    // Adultos
    { id: 'body-dad', name: '👔 Cuerpo Papá', role: 'Papá', shirt: '#1e88e5', pants: '#37474f', acc: 'tie', imgPath: 'img/cuerpo_papa.png' },
    { id: 'body-mom', name: '👗 Cuerpo Mamá', role: 'Mamá', shirt: '#e91e63', pants: '#8e24aa', acc: 'necklace', imgPath: 'img/cuerpo_mama.png' },
    // Hermanos/as
    { id: 'body-boy', name: '👕 Cuerpo Hijo', role: 'Hijo', shirt: '#43a047', pants: '#1976d2', acc: 'stripes', isKid: true, imgPath: 'img/cuerpo_hijo.png' },
    { id: 'body-girl', name: '👚 Cuerpo Hija', role: 'Hija', shirt: '#ff4081', pants: '#00bcd4', acc: 'bow', isKid: true, imgPath: 'img/cuerpo_hija.png' },
    { id: 'body-dino', name: '🦖 Enterito Dinosaurio', role: 'Hermano/a', shirt: '#4caf50', pants: '#388e3c', acc: 'dino', isKid: true, imgPath: 'img/cuerpo_dinosaurio.png' },
    { id: 'body-overalls', name: '👖 Jardinero / Overol', role: 'Hermano/a', shirt: '#d32f2f', pants: '#1565c0', acc: 'overalls', isKid: true, imgPath: 'img/cuerpo_jardinero.png' },
    { id: 'body-skater', name: '🛹 Traje Skater', role: 'Hermano', shirt: '#ff6f00', pants: '#37474f', acc: 'skater', isKid: true, imgPath: 'img/cuerpo_hermano_skater.png' },
    { id: 'body-gamer', name: '🎮 Buzo Gamer', role: 'Hermano', shirt: '#7b1fa2', pants: '#1a237e', acc: 'gamer', isKid: true, imgPath: 'img/cuerpo_hermano_gamer.png' },
    { id: 'body-floral', name: '🌸 Vestido Floral', role: 'Hermana', shirt: '#00bcd4', pants: '#ff4081', acc: 'floral', isKid: true, imgPath: 'img/cuerpo_hermana_floral.png' },
    // Bebé
    { id: 'body-baby', name: '👶 Cuerpito de Bebé', role: 'Bebé', shirt: '#80d8ff', pants: '#ffffff', isBaby: true, imgPath: 'img/cuerpo_bebe.png' },
    // Disfraces y héroes
    { id: 'body-astronaut', name: '🚀 Traje Astronauta', role: 'Astronauta', shirt: '#eceff1', pants: '#eceff1', acc: 'space', imgPath: 'img/cuerpo_astronauta.png' },
    { id: 'body-hero', name: '🦸 Traje Superhéroe', role: 'Héroe', shirt: '#d32f2f', pants: '#1976d2', acc: 'cape', imgPath: 'img/cuerpo_heroe.png' },
    { id: 'body-wonder', name: '⭐ Superheroína', role: 'Heroína', shirt: '#d32f2f', pants: '#1565c0', acc: 'wonder', imgPath: 'img/cuerpo_mujer_maravilla.png' },
    { id: 'body-firefighter', name: '🚒 Bombero/a', role: 'Rescate', shirt: '#e53935', pants: '#212121', acc: 'firefighter', imgPath: 'img/cuerpo_bombero.png' },
    { id: 'body-ninja', name: '🥷 Ninja Aventurero', role: 'Ninja', shirt: '#212121', pants: '#263238', acc: 'ninja', imgPath: 'img/cuerpo_ninja.png' },
    // Mascotas
    { id: 'body-dog', name: '🐕 Cuerpo Perrito', role: 'Mascota', isPet: 'dog', fur: '#d7ccc8', imgPath: 'img/cuerpo_perro.png' },
    { id: 'body-cat', name: '🐈 Cuerpo Gatito', role: 'Mascota', isPet: 'cat', fur: '#ffe082', imgPath: 'img/cuerpo_gato.png' }
  ],

  // Nuevas mascotas y accesorios acuáticos (Fase 5)
  PET_ITEMS: [
    { id: 'item-aquarium', name: '🫧 Pecera de Cristal', type: 'aquarium', imgPath: 'img/pecera.png' },
    { id: 'item-fish', name: '🐟 Pececito Dorado', type: 'fish', imgPath: 'img/pez.png' }
  ]
};

/**
 * Crea una representación gráfica en SVG de un bloque de Lego.
 * Se usa tanto para las previsualizaciones del menú como para el arrastre visual.
 */
function createLegoSVG(typeConfig, colorConfig) {
  const u = LEGO_CONFIG.UNIT_SIZE;
  const w = typeConfig.cols * u;
  const h = typeConfig.rows * u;
  const r = LEGO_CONFIG.STUD_RADIUS;
  const br = LEGO_CONFIG.BORDER_RADIUS;

  let studsSvg = '';

  for (let c = 0; c < typeConfig.cols; c++) {
    for (let rIdx = 0; rIdx < typeConfig.rows; rIdx++) {
      const cx = c * u + u / 2;
      const cy = rIdx * u + u / 2;

      // Cada botón de Lego tiene sombra inferior y brillo superior simulando 3D
      studsSvg += `
        <!-- Stud sombra -->
        <circle cx="${cx + 0.8}" cy="${cy + 1.2}" r="${r}" fill="${colorConfig.darkHex}" opacity="0.6"/>
        <!-- Stud cuerpo -->
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="${colorConfig.hex}"/>
        <!-- Stud relieve superior -->
        <circle cx="${cx - 0.7}" cy="${cy - 0.7}" r="${r * 0.75}" fill="${colorConfig.lightHex}" opacity="0.75"/>
        <circle cx="${cx}" cy="${cy}" r="${r * 0.5}" fill="${colorConfig.hex}"/>
      `;
    }
  }

  // Si tiene un sticker/icono especial
  let iconSvg = '';
  if (typeConfig.icon) {
    iconSvg = `
      <text x="${w / 2}" y="${h / 2 + 8}" font-size="28" text-anchor="middle" dominant-baseline="middle" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.3))">
        ${typeConfig.icon}
      </text>
    `;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w + 6} ${h + 8}" width="${w + 6}" height="${h + 8}">
      <defs>
        <filter id="brickShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" flood-color="rgba(0,0,0,0.35)"/>
        </filter>
      </defs>
      <g transform="translate(3, 2)" filter="url(#brickShadow)">
        <!-- Cuerpo base del bloque -->
        <rect x="0" y="0" width="${w}" height="${h}" rx="${br}" ry="${br}" fill="${colorConfig.hex}" stroke="${colorConfig.darkHex}" stroke-width="1.5"/>
        <!-- Bisel brillo superior/izquierdo -->
        <path d="M ${br} 1.5 L ${w - br} 1.5" stroke="${colorConfig.lightHex}" stroke-width="2" stroke-linecap="round"/>
        <path d="M 1.5 ${br} L 1.5 ${h - br}" stroke="${colorConfig.lightHex}" stroke-width="2" stroke-linecap="round"/>
        <!-- Bisel sombra inferior/derecho -->
        <path d="M ${br} ${h - 1} L ${w - br} ${h - 1}" stroke="${colorConfig.darkHex}" stroke-width="2" stroke-linecap="round"/>
        <path d="M ${w - 1} ${br} L ${w - 1} ${h - br}" stroke="${colorConfig.darkHex}" stroke-width="2" stroke-linecap="round"/>
        <!-- Espigas / Studs -->
        ${studsSvg}
        <!-- Icono especial si aplica -->
        ${iconSvg}
      </g>
    </svg>
  `;
}

/**
 * Crea un grupo Konva.Group que representa la pieza de Lego.
 * Proporciona soporte interactivo completo: arrastre, selección, rotación.
 */
function createKonvaLegoBrick(typeConfig, colorConfig, x = 100, y = 100) {
  const u = LEGO_CONFIG.UNIT_SIZE;
  const w = typeConfig.cols * u;
  const h = typeConfig.rows * u;
  const r = LEGO_CONFIG.STUD_RADIUS;
  const br = LEGO_CONFIG.BORDER_RADIUS;

  const group = new Konva.Group({
    x: x,
    y: y,
    draggable: true,
    name: 'lego-brick',
    typeId: typeConfig.id,
    colorId: colorConfig.id,
    cols: typeConfig.cols,
    rows: typeConfig.rows,
    width: w,
    height: h,
    offset: { x: w / 2, y: h / 2 } // Centro para rotaciones suaves
  });

  // Sombra y cuerpo rectangular
  const body = new Konva.Rect({
    x: 0,
    y: 0,
    width: w,
    height: h,
    fill: colorConfig.hex,
    stroke: colorConfig.darkHex,
    strokeWidth: 1.5,
    cornerRadius: br,
    shadowColor: 'rgba(0, 0, 0, 0.35)',
    shadowBlur: 5,
    shadowOffset: { x: 0, y: 3 },
    shadowOpacity: 0.6
  });
  group.add(body);

  // Línea de brillo superior (3D)
  const topLine = new Konva.Line({
    points: [br, 2, w - br, 2],
    stroke: colorConfig.lightHex,
    strokeWidth: 2,
    lineCap: 'round'
  });
  group.add(topLine);

  // Línea de brillo izquierdo (3D)
  const leftLine = new Konva.Line({
    points: [2, br, 2, h - br],
    stroke: colorConfig.lightHex,
    strokeWidth: 2,
    lineCap: 'round'
  });
  group.add(leftLine);

  // Línea de sombra inferior (3D)
  const bottomLine = new Konva.Line({
    points: [br, h - 1.5, w - br, h - 1.5],
    stroke: colorConfig.darkHex,
    strokeWidth: 2,
    lineCap: 'round'
  });
  group.add(bottomLine);

  // Espigas / Studs
  for (let c = 0; c < typeConfig.cols; c++) {
    for (let rIdx = 0; rIdx < typeConfig.rows; rIdx++) {
      const cx = c * u + u / 2;
      const cy = rIdx * u + u / 2;

      // Sombra del stud
      const studShadow = new Konva.Circle({
        x: cx + 1,
        y: cy + 1.2,
        radius: r,
        fill: colorConfig.darkHex,
        opacity: 0.6
      });
      group.add(studShadow);

      // Círculo principal del stud
      const studMain = new Konva.Circle({
        x: cx,
        y: cy,
        radius: r,
        fill: colorConfig.hex
      });
      group.add(studMain);

      // Brillo del stud
      const studHighlight = new Konva.Circle({
        x: cx - 0.7,
        y: cy - 0.7,
        radius: r * 0.7,
        fill: colorConfig.lightHex,
        opacity: 0.75
      });
      group.add(studHighlight);

      // Pequeño centro
      const studCenter = new Konva.Circle({
        x: cx,
        y: cy,
        radius: r * 0.45,
        fill: colorConfig.hex
      });
      group.add(studCenter);
    }
  }

  // Si es un sticker especial
  if (typeConfig.icon) {
    const textIcon = new Konva.Text({
      x: 0,
      y: h / 2 - 16,
      width: w,
      text: typeConfig.icon,
      fontSize: 26,
      align: 'center',
      shadowColor: 'rgba(0,0,0,0.4)',
      shadowBlur: 3,
      shadowOffset: { x: 0, y: 1 }
    });
    group.add(textIcon);
  }

  return group;
}

/**
 * Genera el SVG visual para una minifigura de Lego o mascota familiar
 */
function createMinifigureSVG(fig) {
  if (fig.isPet === 'dog') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110" width="100" height="110">
      <defs>
        <filter id="petDrop" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>
      <g filter="url(#petDrop)">
        <!-- Cuerpo perrito -->
        <rect x="25" y="45" width="46" height="34" rx="6" fill="${fig.fur}" stroke="#8d6e63" stroke-width="2"/>
        <!-- Patas -->
        <rect x="28" y="76" width="10" height="18" rx="3" fill="${fig.fur}" stroke="#8d6e63" stroke-width="1.5"/>
        <rect x="57" y="76" width="10" height="18" rx="3" fill="${fig.fur}" stroke="#8d6e63" stroke-width="1.5"/>
        <!-- Cola -->
        <path d="M 26 50 Q 12 35 18 25" stroke="${fig.fur}" stroke-width="7" fill="none" stroke-linecap="round"/>
        <!-- Collar rojo con placa -->
        <rect x="52" y="40" width="8" height="16" rx="2" fill="#e53935"/>
        <circle cx="56" cy="56" r="4" fill="#ffd700"/>
        <!-- Cabeza con stud lego arriba -->
        <rect x="56" y="16" width="8" height="5" rx="1.5" fill="#a1887f"/>
        <rect x="46" y="20" width="36" height="30" rx="7" fill="${fig.fur}" stroke="#8d6e63" stroke-width="2"/>
        <!-- Hocico -->
        <rect x="68" y="32" width="16" height="14" rx="4" fill="#efebe9" stroke="#8d6e63" stroke-width="1.5"/>
        <circle cx="80" cy="37" r="3.5" fill="#212121"/>
        <!-- Orejas caídas -->
        <path d="M 45 22 Q 40 40 46 48" stroke="#8d6e63" stroke-width="8" fill="none" stroke-linecap="round"/>
        <!-- Ojos -->
        <circle cx="62" cy="29" r="2.5" fill="#212121"/>
        <circle cx="63" cy="28" r="0.8" fill="#ffffff"/>
      </g>
    </svg>`;
  }

  if (fig.isPet === 'cat') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110" width="100" height="110">
      <defs>
        <filter id="petDrop" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>
      <g filter="url(#petDrop)">
        <rect x="28" y="48" width="42" height="32" rx="6" fill="${fig.fur}" stroke="#ffb300" stroke-width="2"/>
        <rect x="30" y="76" width="9" height="18" rx="3" fill="${fig.fur}" stroke="#ffb300" stroke-width="1.5"/>
        <rect x="58" y="76" width="9" height="18" rx="3" fill="${fig.fur}" stroke="#ffb300" stroke-width="1.5"/>
        <!-- Cola curvada -->
        <path d="M 28 54 Q 10 60 16 35" stroke="${fig.fur}" stroke-width="6" fill="none" stroke-linecap="round"/>
        <!-- Cabeza -->
        <rect x="52" y="18" width="8" height="5" rx="1.5" fill="#ffb300"/>
        <rect x="44" y="22" width="34" height="28" rx="7" fill="${fig.fur}" stroke="#ffb300" stroke-width="2"/>
        <!-- Orejas puntiagudas -->
        <polygon points="46,23 54,12 58,23" fill="${fig.fur}" stroke="#ffb300" stroke-width="1.5"/>
        <polygon points="66,23 72,12 78,23" fill="${fig.fur}" stroke="#ffb300" stroke-width="1.5"/>
        <!-- Ojos verdes y bigotes -->
        <circle cx="53" cy="33" r="2.5" fill="#43a047"/>
        <circle cx="69" cy="33" r="2.5" fill="#43a047"/>
        <circle cx="61" cy="38" r="2" fill="#e91e63"/>
        <path d="M 44 38 L 35 36 M 44 41 L 35 43 M 78 38 L 87 36 M 78 41 L 87 43" stroke="#5d4037" stroke-width="1"/>
      </g>
    </svg>`;
  }

  // Minifigura Bebé Lego (proporciones tiernas y tamaño pequeño)
  if (fig.isBaby) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 85" width="60" height="85">
      <defs>
        <filter id="babyDrop" x="-15%" y="-10%" width="130%" height="125%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>
      <g filter="url(#babyDrop)">
        <!-- Pañal blanco abultado y piernitas -->
        <rect x="18" y="56" width="24" height="15" rx="5" fill="#ffffff" stroke="#e0e0e0" stroke-width="1.2"/>
        <circle cx="23" cy="71" r="5" fill="${fig.pants || '#80d8ff'}" stroke="#0288d1" stroke-width="1"/>
        <circle cx="37" cy="71" r="5" fill="${fig.pants || '#80d8ff'}" stroke="#0288d1" stroke-width="1"/>

        <!-- Cuerpito / Enterito Onesie celeste pastel -->
        <polygon points="19,34 41,34 44,58 16,58" fill="${fig.shirt || '#80d8ff'}" stroke="#0288d1" stroke-width="1.2"/>

        <!-- Babero blanco con diseño de corazón -->
        <path d="M 23 34 Q 30 46 37 34 Z" fill="#ffffff" stroke="#ffd54f" stroke-width="1"/>
        <circle cx="30" cy="40" r="2.5" fill="#ff4081"/>

        <!-- Bracitos de bebé -->
        <path d="M 18 36 L 11 48 L 15 50 L 20 39 Z" fill="${fig.shirt || '#80d8ff'}" stroke="#0288d1" stroke-width="1"/>
        <circle cx="13" cy="51" r="3.5" fill="#ffd700"/>
        <path d="M 42 36 L 49 48 L 45 50 L 40 39 Z" fill="${fig.shirt || '#80d8ff'}" stroke="#0288d1" stroke-width="1"/>
        <circle cx="47" cy="51" r="3.5" fill="#ffd700"/>

        <!-- Cuellito corto -->
        <rect x="26" y="30" width="8" height="5" fill="#ffd700"/>

        <!-- Cabeza redonda amarilla con stud mini -->
        <rect x="27" y="6" width="6" height="4" rx="1" fill="#ffd700" stroke="#c6a700" stroke-width="0.8"/>
        <ellipse cx="30" cy="19" rx="14" ry="13" fill="#ffd700" stroke="#c6a700" stroke-width="1.2"/>

        <!-- Rizo tierno de pelo en la frente -->
        <path d="M 30 9 Q 34 13 31 16 Q 28 14 30 11" fill="none" stroke="${fig.hair || '#ffd54f'}" stroke-width="2.2" stroke-linecap="round"/>

        <!-- Ojos grandes y adorables con doble brillo -->
        <circle cx="25" cy="18" r="2.8" fill="#212121"/>
        <circle cx="26" cy="17" r="1.1" fill="#ffffff"/>
        <circle cx="24" cy="19.5" r="0.6" fill="#ffffff"/>

        <circle cx="35" cy="18" r="2.8" fill="#212121"/>
        <circle cx="36" cy="17" r="1.1" fill="#ffffff"/>
        <circle cx="34" cy="19.5" r="0.6" fill="#ffffff"/>

        <!-- Mejillas sonrosadas tiernas -->
        <ellipse cx="21" cy="22" rx="2.5" ry="1.5" fill="#ff80ab" opacity="0.6"/>
        <ellipse cx="39" cy="22" rx="2.5" ry="1.5" fill="#ff80ab" opacity="0.6"/>

        <!-- Chupete / Pacifier tierno -->
        <circle cx="30" cy="24" r="4.2" fill="#ff4081" stroke="#c2185b" stroke-width="0.8"/>
        <circle cx="30" cy="24" r="2.2" fill="#ffffff"/>
        <ellipse cx="30" cy="27" rx="2.5" ry="1.5" fill="none" stroke="#ff4081" stroke-width="1.2"/>
      </g>
    </svg>`;
  }

  // Minifiguras humanas LEGO (Adultos y Niños/Hermanos)
  const isKid = !!fig.isKid;
  const legHeight = isKid ? 22 : 32;
  const legBottom = 98 + legHeight;
  const feetHeight = isKid ? 8 : 10;
  const viewH = isKid ? 134 : 145;

  let accessorySvg = '';
  if (fig.acc === 'tie') {
    accessorySvg = `<polygon points="40,54 43,68 40,78 37,68" fill="#e53935"/><circle cx="40" cy="52" r="3" fill="#e53935"/>`;
  } else if (fig.acc === 'necklace') {
    accessorySvg = `<path d="M 33 50 Q 40 60 47 50" stroke="#ffd700" stroke-width="2" fill="none"/><circle cx="40" cy="56" r="3" fill="#00bcd4"/>`;
  } else if (fig.acc === 'cap') {
    accessorySvg = `<path d="M 22 18 Q 40 10 58 18 L 68 20 Q 56 24 40 22 Z" fill="#2e7d32"/>`;
  } else if (fig.acc === 'bow') {
    accessorySvg = `<polygon points="25,12 33,18 25,24" fill="#e91e63"/><polygon points="41,12 33,18 41,24" fill="#e91e63"/><circle cx="33" cy="18" r="3" fill="#ffd700"/>`;
  } else if (fig.acc === 'skater') {
    accessorySvg = `
      <!-- Gorra skater trucker hacia atrás -->
      <path d="M 23 15 Q 40 7 57 15 L 67 14 Q 57 18 45 17 Z" fill="#ff6f00"/>
      <circle cx="40" cy="12" r="3" fill="#37474f"/>
      <!-- Relámpago urbano en el torso -->
      <polygon points="40,54 36,64 41,64 38,74 46,62 41,62" fill="#ffd700" stroke="#f57f17" stroke-width="0.5"/>
      <!-- Patineta skateboard sostenida al costado -->
      <rect x="67" y="58" width="8" height="34" rx="4" fill="#ff6f00" stroke="#d84315" stroke-width="1"/>
      <circle cx="71" cy="65" r="2.5" fill="#212121"/>
      <circle cx="71" cy="85" r="2.5" fill="#212121"/>
    `;
  } else if (fig.acc === 'gamer') {
    accessorySvg = `
      <!-- Auriculares Gamer con diadema neón y micrófono -->
      <path d="M 24 20 A 18 18 0 0 1 56 20" stroke="#00e676" stroke-width="3" fill="none"/>
      <rect x="22" y="18" width="5" height="12" rx="2" fill="#212121" stroke="#00e676" stroke-width="0.8"/>
      <rect x="53" y="18" width="5" height="12" rx="2" fill="#212121" stroke="#00e676" stroke-width="0.8"/>
      <path d="M 24 28 Q 28 34 32 32" stroke="#212121" stroke-width="1.5" fill="none"/>
      <circle cx="33" cy="32" r="1.5" fill="#00e676"/>
      <!-- Gamepad pixel art estampado en el buzo -->
      <rect x="32" y="58" width="16" height="11" rx="2" fill="#212121" stroke="#00e676" stroke-width="0.8"/>
      <rect x="34" y="62" width="4" height="3" fill="#ffffff"/>
      <circle cx="43" cy="63.5" r="1.2" fill="#ff1744"/>
    `;
  } else if (fig.acc === 'floral') {
    accessorySvg = `
      <!-- Margarita en el cabello -->
      <circle cx="49" cy="15" r="4.5" fill="#ffffff"/>
      <circle cx="49" cy="15" r="2" fill="#ffd700"/>
      <!-- Flores estampadas en el vestido -->
      <circle cx="34" cy="56" r="2.5" fill="#ffffff"/><circle cx="34" cy="56" r="1" fill="#ffd700"/>
      <circle cx="46" cy="66" r="2.5" fill="#ffffff"/><circle cx="46" cy="66" r="1" fill="#ffd700"/>
      <circle cx="36" cy="74" r="2.2" fill="#ffffff"/><circle cx="36" cy="74" r="0.9" fill="#ffd700"/>
    `;
  } else if (fig.acc === 'artist') {
    accessorySvg = `
      <!-- Boina francesa de artista inclinada -->
      <ellipse cx="44" cy="11" rx="14" ry="6" fill="#e53935" stroke="#b71c1c" stroke-width="0.8"/>
      <circle cx="44" cy="6" r="1.5" fill="#e53935"/>
      <!-- Salpicaduras de pintura en la remera -->
      <circle cx="34" cy="56" r="2.5" fill="#00e5ff"/>
      <circle cx="46" cy="58" r="2.8" fill="#ffd600"/>
      <circle cx="38" cy="68" r="3" fill="#ff1744"/>
      <circle cx="45" cy="74" r="2" fill="#00e676"/>
      <!-- Pincel con pintura en la mano derecha -->
      <rect x="67" y="66" width="3" height="18" fill="#8d6e63"/>
      <polygon points="67,66 70,66 68.5,60" fill="#e53935"/>
    `;
  } else if (fig.acc === 'space') {
    accessorySvg = `<circle cx="40" cy="64" r="9" fill="#0288d1"/><polygon points="37,60 44,64 37,68" fill="#ffd700"/>`;
  } else if (fig.acc === 'cape') {
    accessorySvg = `<path d="M 22 48 L 12 110 L 68 110 L 58 48 Z" fill="#b71c1c" opacity="0.95"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 ${viewH}" width="80" height="${viewH}">
    <defs>
      <filter id="figDrop" x="-15%" y="-10%" width="130%" height="125%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="rgba(0,0,0,0.35)"/>
      </filter>
    </defs>
    <g filter="url(#figDrop)">
      <!-- Capa trasera de superhéroe si aplica -->
      ${fig.acc === 'cape' ? accessorySvg : ''}

      <!-- Piernas y Caderas Lego (Piernas más cortas si es niño/hermano) -->
      <rect x="22" y="88" width="36" height="10" rx="2" fill="#37474f"/>
      <rect x="23" y="98" width="16" height="${legHeight}" rx="3" fill="${fig.pants}" stroke="#263238" stroke-width="1.2"/>
      <rect x="41" y="98" width="16" height="${legHeight}" rx="3" fill="${fig.pants}" stroke="#263238" stroke-width="1.2"/>
      <rect x="21" y="${legBottom}" width="18" height="${feetHeight}" rx="3" fill="${fig.pants}" stroke="#263238" stroke-width="1.2"/>
      <rect x="41" y="${legBottom}" width="18" height="${feetHeight}" rx="3" fill="${fig.pants}" stroke="#263238" stroke-width="1.2"/>

      <!-- Torso Trapezoidal Lego -->
      <polygon points="24,46 56,46 60,88 20,88" fill="${fig.shirt}" stroke="#212121" stroke-width="1.5"/>

      <!-- Brazos y Manos Clásicas Amarillas -->
      <!-- Brazo izquierdo -->
      <path d="M 23 48 L 13 72 L 18 76 L 26 54 Z" fill="${fig.shirt}" stroke="#212121" stroke-width="1.2"/>
      <!-- Mano izquierda amarilla (C-clip) -->
      <circle cx="15" cy="80" r="6" fill="#ffd700" stroke="#c6a700" stroke-width="1"/>
      <path d="M 12 77 Q 15 82 17 77" stroke="#212121" stroke-width="1.8" fill="none"/>

      <!-- Brazo derecho -->
      <path d="M 57 48 L 67 72 L 62 76 L 54 54 Z" fill="${fig.shirt}" stroke="#212121" stroke-width="1.2"/>
      <!-- Mano derecha amarilla (C-clip) -->
      <circle cx="65" cy="80" r="6" fill="#ffd700" stroke="#c6a700" stroke-width="1"/>
      <path d="M 63 77 Q 66 82 68 77" stroke="#212121" stroke-width="1.8" fill="none"/>

      <!-- Accesorios y detalles del torso (no capa) -->
      ${fig.acc !== 'cape' ? accessorySvg : ''}

      <!-- Cuello -->
      <rect x="34" y="40" width="12" height="7" fill="#ffd700"/>

      <!-- Cabeza Lego Amarilla con Stud superior -->
      <rect x="35" y="8" width="10" height="5" rx="1.5" fill="#ffd700" stroke="#c6a700" stroke-width="1"/>
      <rect x="27" y="13" width="26" height="26" rx="6" fill="#ffd700" stroke="#c6a700" stroke-width="1.2"/>

      <!-- Cabello o Sombrero -->
      <path d="M 25 18 C 25 8, 55 8, 55 18 C 55 24, 52 23, 50 17 C 45 13, 35 13, 30 17 C 28 22, 25 24, 25 18 Z" fill="${fig.hair}"/>

      <!-- Ojos negros con brillo alegre -->
      <circle cx="34" cy="25" r="2.2" fill="#212121"/>
      <circle cx="35" cy="24" r="0.7" fill="#ffffff"/>
      <circle cx="46" cy="25" r="2.2" fill="#212121"/>
      <circle cx="47" cy="24" r="0.7" fill="#ffffff"/>

      <!-- Sonrisa clásica amigable Lego -->
      <path d="M 36 30 Q 40 34 44 30" stroke="#212121" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`;
}

/**
 * Crea un nodo Konva para la minifigura o mascota con escala proporcional
 * y soporte dual PNG/SVG (Fase 5.2)
 */
function createKonvaMinifigure(figConfig, x = 150, y = 150, callback) {
  const getDims = () => {
    if (figConfig.isBaby) return { w: 48, h: 70 };
    if (figConfig.isKid) return { w: 66, h: 112 };
    if (figConfig.isPet) return { w: 80, h: 88 };
    return { w: 75, h: 135 };
  };

  const tryLoadPngOrSvg = (url) => {
    const img = new Image();
    img.onload = () => {
      let { w, h } = getDims();
      if (img.naturalWidth && img.naturalHeight) {
        h = Math.round((img.naturalHeight / img.naturalWidth) * w);
      }

      const figNode = new Konva.Image({
        x: x,
        y: y,
        image: img,
        width: w,
        height: h,
        offset: { x: w / 2, y: h / 2 },
        draggable: true,
        name: 'minifigure-node',
        figId: figConfig.id,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowBlur: 6,
        shadowOffset: { x: 0, y: 4 },
        shadowOpacity: 0.5
      });

      if (callback) callback(figNode);
    };

    img.onerror = () => {
      const svgStr = createMinifigureSVG(figConfig);
      const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);
      const fallbackImg = new Image();
      fallbackImg.onload = () => {
        let { w, h } = getDims();
        const figNode = new Konva.Image({
          x: x,
          y: y,
          image: fallbackImg,
          width: w,
          height: h,
          offset: { x: w / 2, y: h / 2 },
          draggable: true,
          name: 'minifigure-node',
          figId: figConfig.id,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 6,
          shadowOffset: { x: 0, y: 4 },
          shadowOpacity: 0.5
        });

        if (callback) callback(figNode);
      };
      fallbackImg.src = dataUrl;
    };

    img.src = url;
  };

  tryLoadPngOrSvg(figConfig.imgPath || '');
}

/**
 * Genera el SVG visual para un cuerpo de Lego sin cabeza (con cuello de encaje)
 */
function createHeadlessBodySVG(body) {
  if (body.isPet === 'dog') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 95" width="100" height="95">
      <defs>
        <filter id="bodyPetDrop" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>
      <g filter="url(#bodyPetDrop)">
        <!-- Cuello / Enganche corto para la cabeza (estilo stud Lego) -->
        <rect x="52" y="31" width="12" height="8" rx="2" fill="#ffd700" stroke="#c6a700" stroke-width="1.5"/>
        <ellipse cx="58" cy="31" rx="6" ry="2.2" fill="#ffd700" stroke="#c6a700"/>
        <!-- Collar rojo -->
        <rect x="46" y="37" width="18" height="8" rx="2" fill="#e53935"/>
        <circle cx="55" cy="45" r="3.5" fill="#ffd700"/>
        <!-- Cuerpo -->
        <rect x="22" y="40" width="48" height="32" rx="6" fill="${body.fur}" stroke="#8d6e63" stroke-width="2"/>
        <!-- Patas -->
        <rect x="25" y="70" width="10" height="18" rx="3" fill="${body.fur}" stroke="#8d6e63" stroke-width="1.5"/>
        <rect x="56" y="70" width="10" height="18" rx="3" fill="${body.fur}" stroke="#8d6e63" stroke-width="1.5"/>
        <!-- Cola -->
        <path d="M 23 44 Q 10 32 15 22" stroke="${body.fur}" stroke-width="7" fill="none" stroke-linecap="round"/>
      </g>
    </svg>`;
  }

  if (body.isPet === 'cat') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 95" width="100" height="95">
      <defs>
        <filter id="bodyPetDrop" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>
      <g filter="url(#bodyPetDrop)">
        <!-- Cuello / Enganche corto -->
        <rect x="48" y="31" width="12" height="8" rx="2" fill="#ffd700" stroke="#c6a700" stroke-width="1.5"/>
        <ellipse cx="54" cy="31" rx="6" ry="2.2" fill="#ffd700" stroke="#c6a700"/>
        <rect x="44" y="37" width="16" height="6" rx="2" fill="#ff7043"/>
        <rect x="24" y="40" width="44" height="30" rx="6" fill="${body.fur}" stroke="#ffb300" stroke-width="2"/>
        <rect x="26" y="68" width="9" height="18" rx="3" fill="${body.fur}" stroke="#ffb300" stroke-width="1.5"/>
        <rect x="55" y="68" width="9" height="18" rx="3" fill="${body.fur}" stroke="#ffb300" stroke-width="1.5"/>
        <path d="M 24 45 Q 8 50 14 28" stroke="${body.fur}" stroke-width="6" fill="none" stroke-linecap="round"/>
      </g>
    </svg>`;
  }

  // Cuerpo de Bebé Lego sin cabeza (proporciones de bebé y stud corto)
  if (body.isBaby) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 70" width="60" height="70">
      <defs>
        <filter id="babyBodyDrop" x="-15%" y="-10%" width="130%" height="125%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>
      <g filter="url(#babyBodyDrop)">
        <!-- Piernitas cortas y pañal abultado blanco -->
        <rect x="18" y="44" width="24" height="14" rx="5" fill="#ffffff" stroke="#e0e0e0" stroke-width="1.2"/>
        <circle cx="23" cy="58" r="5" fill="${body.pants || '#80d8ff'}" stroke="#00b0ff" stroke-width="1"/>
        <circle cx="37" cy="58" r="5" fill="${body.pants || '#80d8ff'}" stroke="#00b0ff" stroke-width="1"/>

        <!-- Cuerpito / Enterito Onesie -->
        <polygon points="19,22 41,22 44,46 16,46" fill="${body.shirt || '#80d8ff'}" stroke="#0288d1" stroke-width="1.2"/>

        <!-- Babero blanco con diseño de corazón -->
        <path d="M 23 22 Q 30 34 37 22 Z" fill="#ffffff" stroke="#ffd54f" stroke-width="1"/>
        <circle cx="30" cy="27" r="2.5" fill="#ff4081"/>

        <!-- Bracitos de bebé -->
        <path d="M 18 24 L 11 38 L 15 40 L 20 28 Z" fill="${body.shirt || '#80d8ff'}" stroke="#0288d1" stroke-width="1"/>
        <circle cx="13" cy="41" r="3.5" fill="#ffd700"/>
        <path d="M 42 24 L 49 38 L 45 40 L 40 28 Z" fill="${body.shirt || '#80d8ff'}" stroke="#0288d1" stroke-width="1"/>
        <circle cx="47" cy="41" r="3.5" fill="#ffd700"/>

        <!-- Cuello corto de conexión Lego (Stud cilíndrico estándar pegado a los hombros) -->
        <rect x="25" y="15" width="10" height="7" rx="1.5" fill="#ffd700" stroke="#c6a700" stroke-width="1.2"/>
        <ellipse cx="30" cy="15" rx="5" ry="1.8" fill="#ffd700" stroke="#c6a700"/>
      </g>
    </svg>`;
  }

  // Cuerpo humano Lego sin cabeza (Adultos y Hermanos/Niños)
  const isKid = !!body.isKid;
  const legHeight = isKid ? 18 : 26;
  const legBottom = 80 + 10 + legHeight;
  const feetHeight = isKid ? 7 : 8;
  const viewH = isKid ? 112 : 120;

  let accessorySvg = '';
  if (body.acc === 'tie') {
    accessorySvg = `<polygon points="40,54 43,68 40,78 37,68" fill="#e53935"/><circle cx="40" cy="52" r="3" fill="#e53935"/>`;
  } else if (body.acc === 'necklace') {
    accessorySvg = `<path d="M 33 50 Q 40 60 47 50" stroke="#ffd700" stroke-width="2" fill="none"/><circle cx="40" cy="56" r="3" fill="#00bcd4"/>`;
  } else if (body.acc === 'stripes') {
    accessorySvg = `
      <line x1="24" y1="52" x2="56" y2="52" stroke="#ffffff" stroke-width="2.5"/>
      <line x1="22" y1="62" x2="58" y2="62" stroke="#ffffff" stroke-width="2.5"/>
      <line x1="21" y1="72" x2="59" y2="72" stroke="#ffffff" stroke-width="2.5"/>
    `;
  } else if (body.acc === 'bow') {
    accessorySvg = `
      <polygon points="34,45 40,49 34,53" fill="#ffd700"/>
      <polygon points="46,45 40,49 46,53" fill="#ffd700"/>
      <circle cx="40" cy="49" r="2" fill="#ffffff"/>
    `;
  } else if (body.acc === 'dino') {
    accessorySvg = `
      <!-- Púas dorsales naranjas en los laterales -->
      <polygon points="20,48 11,54 21,60" fill="#ff9800" stroke="#e65100" stroke-width="0.8"/>
      <polygon points="20,62 11,68 21,74" fill="#ff9800" stroke="#e65100" stroke-width="0.8"/>
      <polygon points="60,48 69,54 59,60" fill="#ff9800" stroke="#e65100" stroke-width="0.8"/>
      <polygon points="60,62 69,68 59,74" fill="#ff9800" stroke="#e65100" stroke-width="0.8"/>
      <!-- Panza verde lima clara -->
      <ellipse cx="40" cy="62" rx="11" ry="14" fill="#81c784" stroke="#388e3c" stroke-width="1"/>
      <path d="M 36 58 Q 40 54 44 58" stroke="#388e3c" stroke-width="1.2" fill="none"/>
      <path d="M 36 64 Q 40 60 44 64" stroke="#388e3c" stroke-width="1.2" fill="none"/>
      <!-- Cremallera en el pecho -->
      <line x1="40" y1="42" x2="40" y2="48" stroke="#ffffff" stroke-width="2"/>
    `;
  } else if (body.acc === 'overalls') {
    accessorySvg = `
      <!-- Remera a rayas rojas y blancas -->
      <line x1="25" y1="46" x2="55" y2="46" stroke="#ffffff" stroke-width="2"/>
      <line x1="24" y1="51" x2="56" y2="51" stroke="#ffffff" stroke-width="2"/>
      <!-- Tiradores de jean azul -->
      <rect x="28" y="44" width="5.5" height="36" fill="#1565c0" stroke="#0d47a1" stroke-width="0.8"/>
      <rect x="46.5" y="44" width="5.5" height="36" fill="#1565c0" stroke="#0d47a1" stroke-width="0.8"/>
      <!-- Botones dorados en los tiradores -->
      <circle cx="30.7" cy="56" r="2" fill="#ffd700" stroke="#f57f17" stroke-width="0.5"/>
      <circle cx="49.2" cy="56" r="2" fill="#ffd700" stroke="#f57f17" stroke-width="0.5"/>
      <!-- Bolsillo central frontal -->
      <rect x="33" y="56" width="14" height="12" rx="2" fill="#1976d2" stroke="#0d47a1" stroke-width="0.8"/>
      <circle cx="40" cy="61" r="1.5" fill="#ffd700"/>
    `;
  } else if (body.acc === 'skater') {
    accessorySvg = `
      <!-- Estampa skater en buzo naranja -->
      <rect x="30" y="56" width="20" height="14" rx="2" fill="#212121"/>
      <polygon points="40,58 35,66 41,66 38,72 45,64 41,64" fill="#ffd700"/>
      <!-- Cinturón de skater -->
      <rect x="21" y="75" width="38" height="5" fill="#212121"/>
      <rect x="37" y="74.5" width="6" height="6" fill="#e0e0e0" stroke="#757575" stroke-width="0.8"/>
      <!-- Cadena de billetera skater -->
      <path d="M 45 78 Q 52 86 54 80" stroke="#bdbdbd" stroke-width="1.2" fill="none"/>
    `;
  } else if (body.acc === 'gamer') {
    accessorySvg = `
      <!-- Auriculares reposando en el cuello -->
      <path d="M 28 42 Q 40 48 52 42" stroke="#00e676" stroke-width="3" fill="none"/>
      <rect x="25" y="40" width="5" height="8" rx="2" fill="#212121" stroke="#00e676" stroke-width="0.8"/>
      <rect x="50" y="40" width="5" height="8" rx="2" fill="#212121" stroke="#00e676" stroke-width="0.8"/>
      <!-- Consola / Gamepad pixel art -->
      <rect x="31" y="56" width="18" height="12" rx="3" fill="#212121" stroke="#00e676" stroke-width="0.8"/>
      <!-- D-Pad -->
      <polygon points="34,62 37,62 37,59 39,59 39,62 42,62 42,64 39,64 39,67 37,67 37,64 34,64" fill="#ffffff"/>
      <!-- Botones A-B-X-Y -->
      <circle cx="44" cy="61" r="1.2" fill="#ff1744"/>
      <circle cx="46.5" cy="63.5" r="1.2" fill="#00e5ff"/>
      <circle cx="44" cy="66" r="1.2" fill="#ffd600"/>
    `;
  } else if (body.acc === 'floral') {
    accessorySvg = `
      <!-- Lazo rosa fucsia en la cintura -->
      <rect x="21" y="74" width="38" height="6" fill="#ff4081"/>
      <circle cx="40" cy="77" r="3.5" fill="#ffd54f"/>
      <!-- Margaritas estampadas -->
      <circle cx="30" cy="52" r="3" fill="#ffffff"/><circle cx="30" cy="52" r="1.2" fill="#ffd700"/>
      <circle cx="48" cy="54" r="3" fill="#ffffff"/><circle cx="48" cy="54" r="1.2" fill="#ffd700"/>
      <circle cx="38" cy="64" r="3.2" fill="#ffffff"/><circle cx="38" cy="64" r="1.3" fill="#ffd700"/>
      <circle cx="28" cy="68" r="2.8" fill="#ffffff"/><circle cx="28" cy="68" r="1.1" fill="#ffd700"/>
      <circle cx="50" cy="68" r="2.8" fill="#ffffff"/><circle cx="50" cy="68" r="1.1" fill="#ffd700"/>
    `;
  } else if (body.acc === 'space') {
    accessorySvg = `<circle cx="40" cy="64" r="9" fill="#0288d1"/><polygon points="37,60 44,64 37,68" fill="#ffd700"/>`;
  } else if (body.acc === 'cape') {
    accessorySvg = `<path d="M 22 48 L 12 110 L 68 110 L 58 48 Z" fill="#b71c1c" opacity="0.95"/>`;
  } else if (body.acc === 'wonder') {
    accessorySvg = `
      <!-- Emblema águila/W dorada en el pecho -->
      <path d="M 28 46 L 34 56 L 40 48 L 46 56 L 52 46 L 48 46 L 44 51 L 40 47 L 36 51 L 32 46 Z" fill="#ffd700" stroke="#f57f17" stroke-width="0.8"/>
      <!-- Cinturón dorado con punta V -->
      <polygon points="21,75 40,81 59,75 59,71 40,76 21,71" fill="#ffd700" stroke="#f57f17" stroke-width="0.8"/>
      <!-- Lazo de la verdad dorado en la cadera -->
      <ellipse cx="58" cy="78" rx="3.5" ry="6.5" fill="none" stroke="#ffd700" stroke-width="2"/>
      <ellipse cx="58" cy="78" rx="2" ry="4.5" fill="none" stroke="#ffb300" stroke-width="1.2"/>
      <!-- Brazaletes de sumisión plateados / blindados -->
      <rect x="13.5" y="67" width="5.5" height="4.5" rx="1" fill="#e0e0e0" stroke="#9e9e9e" stroke-width="0.8"/>
      <rect x="61" y="67" width="5.5" height="4.5" rx="1" fill="#e0e0e0" stroke="#9e9e9e" stroke-width="0.8"/>
      <!-- Botas rojas con franja blanca -->
      <rect x="21" y="106" width="18" height="10" rx="2" fill="#d32f2f" stroke="#b71c1c" stroke-width="1"/>
      <rect x="41" y="106" width="18" height="10" rx="2" fill="#d32f2f" stroke="#b71c1c" stroke-width="1"/>
      <line x1="30" y1="106" x2="30" y2="116" stroke="#ffffff" stroke-width="1.8"/>
      <line x1="50" y1="106" x2="50" y2="116" stroke="#ffffff" stroke-width="1.8"/>
    `;
  } else if (body.acc === 'firefighter') {
    accessorySvg = `
      <!-- Franjas reflectantes amarillo neón y plateado en el torso -->
      <rect x="23" y="58" width="34" height="4.5" fill="#c6ff00" stroke="#aeea00" stroke-width="0.5"/>
      <rect x="23" y="59.5" width="34" height="1.5" fill="#ffffff"/>
      <rect x="21" y="71" width="38" height="4.5" fill="#c6ff00" stroke="#aeea00" stroke-width="0.5"/>
      <rect x="21" y="72.5" width="38" height="1.5" fill="#ffffff"/>
      <!-- Placa escudo de bombero dorada -->
      <polygon points="40,46 45,50 43,56 37,56 35,50" fill="#ffd700" stroke="#f57f17" stroke-width="0.8"/>
      <!-- Cinturón de rescate con mosquetón -->
      <rect x="21" y="76" width="38" height="5" fill="#212121"/>
      <rect x="37" y="75.5" width="6" height="6" fill="#ffd700" stroke="#f57f17" stroke-width="0.8"/>
      <!-- Franjas reflectantes en las piernas -->
      <rect x="23" y="101" width="16" height="4" fill="#c6ff00"/>
      <rect x="23" y="102.5" width="16" height="1.2" fill="#ffffff"/>
      <rect x="41" y="101" width="16" height="4" fill="#c6ff00"/>
      <rect x="41" y="102.5" width="16" height="1.2" fill="#ffffff"/>
    `;
  } else if (body.acc === 'ninja') {
    accessorySvg = `
      <!-- Faja / Cinturón rojo con nudo colgante -->
      <rect x="21" y="74" width="38" height="6" rx="1" fill="#d32f2f" stroke="#b71c1c" stroke-width="0.8"/>
      <polygon points="43,79 41,94 37,94 39,79" fill="#d32f2f"/>
      <polygon points="45,79 48,91 44,91 42,79" fill="#d32f2f"/>
      <!-- Shuriken dorado en el pecho -->
      <path d="M 40 48 L 44 54 L 50 54 L 45 58 L 47 64 L 40 60 L 33 64 L 35 58 L 30 54 L 36 54 Z" fill="#ffd700" stroke="#f57f17" stroke-width="0.8"/>
      <!-- Vendas rojas en muñecas y espinillas -->
      <rect x="13.5" y="67" width="5.5" height="3" fill="#d32f2f"/>
      <rect x="61" y="67" width="5.5" height="3" fill="#d32f2f"/>
      <rect x="23" y="99" width="16" height="2.5" fill="#d32f2f"/>
      <rect x="41" y="99" width="16" height="2.5" fill="#d32f2f"/>
      <!-- Tahalí para katana diagonal -->
      <line x1="26" y1="44" x2="55" y2="74" stroke="#8d6e63" stroke-width="2"/>
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 ${viewH}" width="80" height="${viewH}">
    <defs>
      <filter id="headlessDrop" x="-15%" y="-10%" width="130%" height="125%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
      </filter>
    </defs>
    <g filter="url(#headlessDrop)">
      <!-- Capa de superhéroe trasera -->
      ${body.acc === 'cape' ? accessorySvg : ''}

      <!-- Piernas y Caderas Lego -->
      <rect x="22" y="80" width="36" height="10" rx="2" fill="#37474f"/>
      <rect x="23" y="90" width="16" height="${legHeight}" rx="3" fill="${body.pants}" stroke="#263238" stroke-width="1.2"/>
      <rect x="41" y="90" width="16" height="${legHeight}" rx="3" fill="${body.pants}" stroke="#263238" stroke-width="1.2"/>
      <rect x="21" y="${legBottom}" width="18" height="${feetHeight}" rx="2" fill="${body.pants}" stroke="#263238" stroke-width="1.2"/>
      <rect x="41" y="${legBottom}" width="18" height="${feetHeight}" rx="2" fill="${body.pants}" stroke="#263238" stroke-width="1.2"/>

      <!-- Torso Trapezoidal Lego -->
      <polygon points="24,42 56,42 60,80 20,80" fill="${body.shirt}" stroke="#212121" stroke-width="1.5"/>

      <!-- Brazos y Manos C-clip -->
      <path d="M 23 44 L 13 68 L 18 72 L 26 50 Z" fill="${body.shirt}" stroke="#212121" stroke-width="1.2"/>
      <circle cx="15" cy="76" r="5.5" fill="#ffd700" stroke="#c6a700" stroke-width="1"/>
      <path d="M 12 73 Q 15 78 17 73" stroke="#212121" stroke-width="1.5" fill="none"/>

      <path d="M 57 44 L 67 68 L 62 72 L 54 50 Z" fill="${body.shirt}" stroke="#212121" stroke-width="1.2"/>
      <circle cx="65" cy="76" r="5.5" fill="#ffd700" stroke="#c6a700" stroke-width="1"/>
      <path d="M 63 73 Q 66 78 68 73" stroke="#212121" stroke-width="1.5" fill="none"/>

      <!-- Accesorios del torso -->
      ${body.acc !== 'cape' ? accessorySvg : ''}

      <!-- Cuello corto de conexión Lego (Stud cilíndrico estándar pegado a los hombros) -->
      <rect x="34" y="35" width="12" height="7" rx="2" fill="#ffd700" stroke="#c6a700" stroke-width="1.5"/>
      <ellipse cx="40" cy="35" rx="6" ry="2.2" fill="#ffd700" stroke="#c6a700"/>
    </g>
  </svg>`;
}

/**
 * Genera el SVG para la pecera y el pez
 */
function createPetItemSVG(item) {
  if (item.type === 'aquarium') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 95" width="100" height="95">
      <defs>
        <radialGradient id="waterGrad" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stop-color="#80d8ff" stop-opacity="0.85"/>
          <stop offset="70%" stop-color="#29b6f6" stop-opacity="0.75"/>
          <stop offset="100%" stop-color="#0288d1" stop-opacity="0.6"/>
        </radialGradient>
        <linearGradient id="glassReflection" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.7"/>
          <stop offset="50%" stop-color="#ffffff" stop-opacity="0.1"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.4"/>
        </linearGradient>
      </defs>
      <!-- Base de arena / piedras -->
      <ellipse cx="50" cy="84" rx="36" ry="7" fill="#ffd54f"/>
      <circle cx="35" cy="84" r="3" fill="#ffb300"/>
      <circle cx="48" cy="85" r="4" fill="#ffb300"/>
      <circle cx="62" cy="83" r="3.5" fill="#ffb300"/>

      <!-- Algas marinas verdes -->
      <path d="M 30 84 Q 25 65 32 50 Q 26 40 30 32" stroke="#2e7d32" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 38 84 Q 42 68 36 55 Q 40 45 37 38" stroke="#43a047" stroke-width="3" fill="none" stroke-linecap="round"/>

      <!-- Cuerpo esférico de cristal con agua -->
      <circle cx="50" cy="50" r="42" fill="url(#waterGrad)" stroke="#b3e5fc" stroke-width="3"/>
      <!-- Borde superior de la pecera -->
      <ellipse cx="50" cy="14" rx="25" ry="6" fill="#e1f5fe" stroke="#81d4fa" stroke-width="2"/>

      <!-- Burbujas de agua -->
      <circle cx="60" cy="62" r="3.5" fill="#ffffff" opacity="0.8"/>
      <circle cx="65" cy="48" r="4.5" fill="#ffffff" opacity="0.75"/>
      <circle cx="58" cy="35" r="3" fill="#ffffff" opacity="0.85"/>
      <circle cx="45" cy="28" r="2.5" fill="#ffffff" opacity="0.9"/>

      <!-- Reflejo curvo del cristal -->
      <path d="M 22 28 A 38 38 0 0 1 76 26" stroke="url(#glassReflection)" stroke-width="4" fill="none" stroke-linecap="round"/>
    </svg>`;
  }

  if (item.type === 'fish') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 55" width="80" height="55">
      <defs>
        <linearGradient id="fishGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#ff7043"/>
          <stop offset="60%" stop-color="#ffa726"/>
          <stop offset="100%" stop-color="#ffd54f"/>
        </linearGradient>
      </defs>
      <!-- Cola -->
      <polygon points="12,28 0,14 4,28 0,42" fill="#ff5722"/>
      <path d="M 12 28 Q 4 18 0 14 Q 8 28 0 42 Z" fill="#ff7043"/>

      <!-- Aletas superior e inferior -->
      <polygon points="35,12 45,5 50,14" fill="#ff5722"/>
      <polygon points="38,42 46,50 48,40" fill="#ff5722"/>

      <!-- Cuerpo del pez -->
      <ellipse cx="44" cy="28" rx="26" ry="16" fill="url(#fishGrad)" stroke="#e64a19" stroke-width="1.5"/>

      <!-- Ojo grande con brillo -->
      <circle cx="58" cy="23" r="5" fill="#ffffff"/>
      <circle cx="59" cy="23" r="3" fill="#212121"/>
      <circle cx="60" cy="22" r="1" fill="#ffffff"/>

      <!-- Sonrisa / boca -->
      <path d="M 68 28 Q 65 33 62 30" stroke="#d84315" stroke-width="1.8" fill="none"/>

      <!-- Escamas / Stud Lego central decorativo -->
      <circle cx="40" cy="28" r="4.5" fill="#ffb74d" stroke="#f57c00" stroke-width="1"/>
    </svg>`;
  }

  return '';
}

/**
 * Crea un nodo Konva para el cuerpo de Lego sin cabeza
 */
function createKonvaHeadlessBody(bodyConfig, x = 150, y = 150, callback) {
  const getDims = () => {
    if (bodyConfig.isBaby) return { w: 50, h: 52 };
    if (bodyConfig.isKid) return { w: 68, h: 84 };
    if (bodyConfig.isPet) return { w: 85, h: 78 };
    return { w: 80, h: 100 };
  };

  const tryLoadPngOrSvg = (url) => {
    const img = new Image();
    img.onload = () => {
      let { w, h } = getDims();
      // Respetar proporción natural para que el Canvas NUNCA estire verticalmente las imágenes PNG
      if (img.naturalWidth && img.naturalHeight) {
        h = Math.round((img.naturalHeight / img.naturalWidth) * w);
      }

      const bodyNode = new Konva.Image({
        x: x,
        y: y,
        image: img,
        width: w,
        height: h,
        offset: { x: w / 2, y: h / 2 },
        draggable: true,
        name: 'headless-body-node',
        bodyId: bodyConfig.id,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowBlur: 6,
        shadowOffset: { x: 0, y: 4 },
        shadowOpacity: 0.5
      });

      if (callback) callback(bodyNode);
    };
    img.onerror = () => {
      // Fallback a SVG si no existe el PNG
      const svgStr = createHeadlessBodySVG(bodyConfig);
      const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);
      const fallbackImg = new Image();
      fallbackImg.onload = () => {
        let { w, h } = getDims();

        const bodyNode = new Konva.Image({
          x: x,
          y: y,
          image: fallbackImg,
          width: w,
          height: h,
          offset: { x: w / 2, y: h / 2 },
          draggable: true,
          name: 'headless-body-node',
          bodyId: bodyConfig.id,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 6,
          shadowOffset: { x: 0, y: 4 },
          shadowOpacity: 0.5
        });
        if (callback) callback(bodyNode);
      };
      fallbackImg.src = dataUrl;
    };
    img.src = url;
  };

  tryLoadPngOrSvg(bodyConfig.imgPath || '');
}

/**
 * Crea un nodo Konva para pecera o pez
 */
function createKonvaPetItem(itemConfig, x = 150, y = 150, callback) {
  const tryLoadPngOrSvg = (url) => {
    const img = new Image();
    img.onload = () => {
      const isAquarium = itemConfig.type === 'aquarium';
      const w = isAquarium ? 110 : 70;
      const h = isAquarium ? 100 : 50;

      const itemNode = new Konva.Image({
        x: x,
        y: y,
        image: img,
        width: w,
        height: h,
        offset: { x: w / 2, y: h / 2 },
        draggable: true,
        name: 'pet-item-node',
        itemId: itemConfig.id,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowBlur: 6,
        shadowOffset: { x: 0, y: 3 }
      });

      if (callback) callback(itemNode);
    };
    img.onerror = () => {
      const svgStr = createPetItemSVG(itemConfig);
      const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);
      const fallbackImg = new Image();
      fallbackImg.onload = () => {
        const isAquarium = itemConfig.type === 'aquarium';
        const w = isAquarium ? 110 : 70;
        const h = isAquarium ? 100 : 50;

        const itemNode = new Konva.Image({
          x: x,
          y: y,
          image: fallbackImg,
          width: w,
          height: h,
          offset: { x: w / 2, y: h / 2 },
          draggable: true,
          name: 'pet-item-node',
          itemId: itemConfig.id,
          shadowColor: 'rgba(0, 0, 0, 0.25)',
          shadowBlur: 6,
          shadowOffset: { x: 0, y: 3 }
        });
        if (callback) callback(itemNode);
      };
      fallbackImg.src = dataUrl;
    };
    img.src = url;
  };

  tryLoadPngOrSvg(itemConfig.imgPath || '');
}


