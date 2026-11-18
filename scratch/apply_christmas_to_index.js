const fs = require('fs');

const indexPath = 'index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Título y CSS
html = html.replace(
  '<title>Informática Mágica - ¡Aprender, Programar y Crear en una Aventura de Halloween!</title>',
  '<title>Informática Mágica - ¡Aprender, Programar y Crear en Navidad!</title>'
);

html = html.replace(
  '<link rel="stylesheet" href="css/halloween_theme.css">',
  '<link rel="stylesheet" href="css/christmas_theme.css">'
);

// 2. Subtítulo de cabecera y controles globales
html = html.replace(
  '<span class="brand-subtitle">🎃 ¡Aprender, Programar y Crear!</span>',
  '<span class="brand-subtitle">🎄 ¡Aprender, Programar y Crear en Navidad!</span>'
);

const oldControls = `    <!-- Controles Globales de la Plataforma (Sonido y Vampiros de Halloween) -->
    <div class="header-global-controls">
      <button id="btn-global-sound-toggle" class="btn-sound-toggle" type="button" title="Activar o desactivar sonidos de Halloween" aria-pressed="false">
        <span class="sound-icon" id="global-sound-icon">🔇</span>
        <span class="sound-label" id="global-sound-label">SONIDOS DESACTIVADOS</span>
      </button>
      <button id="btn-global-vampire-toggle" class="btn-vampire-toggle vampire-active" type="button" title="Activar o desactivar apariciones sorpresa del vampiro" aria-pressed="true">
        <span class="vampire-icon" id="global-vampire-icon">🧛</span>
        <span class="vampire-label" id="global-vampire-label">VAMPIROS ACTIVADOS</span>
      </button>
    </div>`;

const newControls = `    <!-- Controles Globales de la Plataforma (Música Navideña y Papá Noel) -->
    <div class="header-global-controls">
      <button id="btn-global-sound-toggle" class="btn-sound-toggle" type="button" title="Activar o desactivar música navideña y efectos" aria-pressed="false">
        <span class="sound-icon" id="global-sound-icon">🔇</span>
        <span class="sound-label" id="global-sound-label">SONIDOS DESACTIVADOS</span>
      </button>
      <button id="btn-global-santa-toggle" class="btn-santa-toggle btn-vampire-toggle santa-active vampire-active" type="button" title="Activar o desactivar trineo de Papá Noel" aria-pressed="true">
        <span class="santa-icon" id="global-santa-icon">🎅</span>
        <span class="santa-label" id="global-santa-label">PAPÁ NOEL ACTIVADO</span>
      </button>
    </div>`;

html = html.replace(oldControls, newControls);

// 3. Escenario de Fondo de Navidad (reemplaza cielo, murciélagos, fantasmas y castillo siniestro)
const oldBackdrop = `      <!-- Escenario Principal de Halloween (Cielo, Luna, Castillo, Bosque, Murciélagos, Fantasmas y Código) -->
      <div class="magic-backdrop" aria-hidden="true">
        <!-- Luna Llena Enorme con Halo Luminoso y Cráteres -->
        <div class="magic-moon-wrap">
          <div class="magic-moon">
            <span class="moon-crater crater-1"></span>
            <span class="moon-crater crater-2"></span>
            <span class="moon-crater crater-3"></span>
          </div>
        </div>

        <!-- Silueta del Castillo Encantado y Bosque Tenebroso -->
        <div class="magic-castle-wrap">
          <svg class="magic-castle-svg" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <!-- Colinas misteriosas de fondo -->
            <path d="M0,350 Q300,270 600,330 T1200,300 L1200,400 L0,400 Z" fill="#130c24"/>
            <!-- Estructura del Castillo y Murallas -->
            <g fill="#0b0817">
              <!-- Torre Central -->
              <rect x="520" y="160" width="160" height="180"/>
              <polygon points="505,160 600,65 695,160" fill="#1c1133"/>
              <!-- Torre Izquierda -->
              <rect x="415" y="195" width="85" height="150"/>
              <polygon points="400,195 457,110 515,195" fill="#1c1133"/>
              <!-- Torre Derecha -->
              <rect x="700" y="195" width="85" height="150"/>
              <polygon points="685,195 742,110 800,195" fill="#1c1133"/>
              <!-- Almenas superiores -->
              <rect x="437" y="100" width="40" height="15" fill="#54258a"/>
              <rect x="722" y="100" width="40" height="15" fill="#54258a"/>
              <!-- Ventanas Iluminadas del Castillo -->
              <rect x="585" y="180" width="30" height="46" rx="15" fill="#ffca28" class="window-glow"/>
              <rect x="548" y="240" width="24" height="36" rx="10" fill="#ff9800" class="window-glow"/>
              <rect x="628" y="240" width="24" height="36" rx="10" fill="#ff9800" class="window-glow"/>
              <rect x="445" y="215" width="25" height="36" rx="12" fill="#ffeb3b" class="window-glow"/>
              <rect x="730" y="215" width="25" height="36" rx="12" fill="#ffeb3b" class="window-glow"/>
            </g>
            <!-- Bosque Encantado: Árboles Retorcidos a los costados -->
            <g fill="#0c0819">
              <path d="M70,360 Q85,310 65,270 Q55,245 35,235 Q55,240 70,255 Q85,235 105,215 Q90,230 85,265 Q105,295 115,360 Z"/>
              <path d="M170,370 Q180,320 160,280 Q140,260 130,250 Q145,258 165,275 Q185,255 200,235 Q188,250 185,285 Q200,320 210,370 Z"/>
              <path d="M1030,370 Q1020,310 1040,270 Q1060,250 1070,240 Q1055,245 1040,260 Q1020,240 1000,220 Q1015,235 1020,270 Q1000,300 990,370 Z"/>
              <path d="M1130,380 Q1120,330 1140,290 Q1155,270 1170,260 Q1155,265 1140,285 Q1125,260 1110,245 Q1120,260 1125,295 Q1110,330 1100,380 Z"/>
            </g>
          </svg>
        </div>

        <!-- Niebla Encantada en la Base -->
        <div class="magic-ground-fog"></div>

        <!-- Telarañas Decorativas en las Esquinas -->
        <div class="magic-corner-web web-tl">
          <svg viewBox="0 0 100 100" class="web-svg">
            <path d="M0,0 L100,0 M0,0 L85,45 M0,0 L60,80 M0,0 L0,100 M20,0 Q18,12 0,20 M45,0 Q38,25 0,45 M70,0 Q58,40 0,70 M95,0 Q78,58 0,95" stroke="rgba(169, 112, 255, 0.45)" stroke-width="1.5" fill="none"/>
          </svg>
        </div>
        <div class="magic-corner-web web-tr">
          <svg viewBox="0 0 100 100" class="web-svg">
            <path d="M100,0 L0,0 M100,0 L15,45 M100,0 L40,80 M100,0 L100,100 M80,0 Q82,12 100,20 M55,0 Q62,25 100,45 M30,0 Q42,40 100,70 M5,0 Q22,58 100,95" stroke="rgba(169, 112, 255, 0.45)" stroke-width="1.5" fill="none"/>
          </svg>
        </div>

        <!-- Murciélagos Volando de lado a lado -->
        <div class="magic-flying-bat bat-flight-1">🦇</div>
        <div class="magic-flying-bat bat-flight-2">🦇</div>
        <div class="magic-flying-bat bat-flight-3">🦇</div>

        <!-- Fantasmas Simpáticos Flotando -->
        <div class="magic-floating-ghost ghost-float-1">👻</div>
        <div class="magic-floating-ghost ghost-float-2">👻</div>

        <!-- Símbolos de Código e Informática Integrados -->
        <div class="magic-tech-glyph glyph-1">&lt;/&gt;</div>
        <div class="magic-tech-glyph glyph-2">{ code }</div>
        <div class="magic-tech-glyph glyph-3">0101</div>
        <div class="magic-tech-glyph glyph-4">if (⚡)</div>
        <div class="magic-tech-glyph glyph-5">λ</div>

        <!-- Pequeños Monstruos Asomándose desde los Bordes -->
        <div class="magic-peeking-monster monster-peek-left" title="¡Bienvenido a la aventura!">
          <span>👾</span>
        </div>
        <div class="magic-peeking-monster monster-peek-right" title="¡Descubrí los portales!">
          <span>👹</span>
        </div>
        <div class="magic-peeking-monster monster-peek-bottom" title="¡Aprender jugando!">
          <span>🎃</span>
        </div>
      </div>`;

const newBackdrop = `      <!-- Escenario Principal de Navidad (Cielo estrellado, Nieve cayendo, Pinos, Aldea iluminada) -->
      <div class="magic-backdrop" aria-hidden="true">
        <!-- Nieve ambiental cayendo suavemente -->
        <div class="christmas-snow-layer"></div>

        <!-- Gran Estrella Polar Navideña -->
        <div class="magic-moon-wrap">
          <div class="magic-moon" title="Estrella de Belén"></div>
        </div>

        <!-- Aldea Navideña con Nieve y Pinos Iluminados -->
        <div class="magic-castle-wrap">
          <svg class="magic-castle-svg" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="snowHillGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#244569"/>
                <stop offset="100%" stop-color="#0e1d2e"/>
              </linearGradient>
              <linearGradient id="snowHillGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="35%" stop-color="#cbd5e1"/>
                <stop offset="100%" stop-color="#0f2942"/>
              </linearGradient>
              <linearGradient id="pineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#1b7a43"/>
                <stop offset="100%" stop-color="#0a2a18"/>
              </linearGradient>
              <linearGradient id="houseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#854d0e"/>
                <stop offset="100%" stop-color="#3b1f06"/>
              </linearGradient>
            </defs>

            <!-- Colinas nevadas de fondo -->
            <path d="M0,300 Q250,220 550,270 T1200,240 L1200,400 L0,400 Z" fill="url(#snowHillGrad1)"/>
            
            <!-- Bosque de Pinos Navideños de fondo -->
            <g fill="url(#pineGrad)">
              <polygon points="120,280 90,340 150,340"/>
              <polygon points="120,250 95,300 145,300"/>
              <polygon points="120,225 105,265 135,265"/>

              <polygon points="220,290 190,350 250,350"/>
              <polygon points="220,260 195,310 245,310"/>

              <polygon points="980,280 950,340 1010,340"/>
              <polygon points="980,250 955,300 1005,300"/>

              <polygon points="1080,290 1050,350 1110,350"/>
              <polygon points="1080,260 1055,310 1105,310"/>
            </g>

            <!-- Casitas de la Aldea Navideña / Taller de Santa (Centro) -->
            <g>
              <!-- Cabaña Principal -->
              <rect x="520" y="230" width="160" height="130" fill="url(#houseGrad)" rx="6"/>
              <!-- Techo cubierto de nieve -->
              <polygon points="500,235 600,165 700,235" fill="#ffffff" stroke="#cbd5e1" stroke-width="4"/>
              <!-- Chimenea con humo -->
              <rect x="645" y="160" width="22" height="45" fill="#78350f"/>
              <!-- Ventanas con luz cálida dorada -->
              <rect x="545" y="255" width="36" height="42" rx="8" fill="#ffd700" filter="drop-shadow(0 0 10px #ffd700)"/>
              <rect x="620" y="255" width="36" height="42" rx="8" fill="#ffd700" filter="drop-shadow(0 0 10px #ffd700)"/>
              <rect x="585" y="305" width="30" height="55" rx="4" fill="#b91c1c"/>
              <circle cx="610" cy="335" r="3" fill="#facc15"/>
            </g>

            <!-- Colinas nevadas de primer plano -->
            <path d="M0,350 Q300,310 650,345 T1200,330 L1200,400 L0,400 Z" fill="url(#snowHillGrad2)"/>

            <!-- Muñeco de Nieve y Regalos -->
            <g transform="translate(380, 290)">
              <!-- Base nieve -->
              <circle cx="40" cy="80" r="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
              <circle cx="40" cy="46" r="20" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
              <circle cx="40" cy="18" r="14" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
              <!-- Ojos y botones -->
              <circle cx="35" cy="16" r="2" fill="#0f172a"/>
              <circle cx="45" cy="16" r="2" fill="#0f172a"/>
              <!-- Nariz zanahoria -->
              <polygon points="40,18 52,21 40,23" fill="#ea580c"/>
              <!-- Bufanda roja -->
              <rect x="30" y="28" width="20" height="7" rx="3" fill="#dc2626"/>
              <!-- Sombrero de copa -->
              <rect x="28" y="4" width="24" height="4" fill="#1e293b"/>
              <rect x="32" y="-10" width="16" height="15" fill="#0f172a"/>
            </g>

            <!-- Cajas de Regalos Navideños -->
            <g transform="translate(730, 330)">
              <rect x="0" y="20" width="34" height="34" rx="4" fill="#dc2626" stroke="#ffffff" stroke-width="1.5"/>
              <line x1="17" y1="20" x2="17" y2="54" stroke="#ffd700" stroke-width="4"/>
              <line x1="0" y1="37" x2="34" y2="37" stroke="#ffd700" stroke-width="4"/>
              
              <rect x="42" y="26" width="28" height="28" rx="4" fill="#16a34a" stroke="#ffffff" stroke-width="1.5"/>
              <line x1="56" y1="26" x2="56" y2="54" stroke="#facc15" stroke-width="3"/>
            </g>
          </svg>
        </div>

        <!-- Símbolos Navideños e Informáticos Integrados -->
        <div class="magic-tech-glyph glyph-1">&lt;navidad/&gt;</div>
        <div class="magic-tech-glyph glyph-2">{ code: ❄️ }</div>
        <div class="magic-tech-glyph glyph-3">⭐ 2026 ⭐</div>
        <div class="magic-tech-glyph glyph-4">if (regalo) 🎁</div>
        <div class="magic-tech-glyph glyph-5">🎄</div>
      </div>`;

html = html.replace(oldBackdrop, newBackdrop);

// 4. Hero Subtitle y Banner Destacado
html = html.replace(
  '<h2 class="magic-hero-subtitle">¡APRENDER, PROGRAMAR Y CREAR EN UNA AVENTURA DE HALLOWEEN!</h2>',
  '<h2 class="magic-hero-subtitle">¡APRENDER, PROGRAMAR Y CREAR EN NAVIDAD!</h2>'
);

html = html.replace(
  `¡Te damos la bienvenida al reino digital embrujado! Elegí uno de los cuatro portales mágicos para explorar laboratorios de código, resolver misterios matemáticos, volar por el espacio con Bity o armar tu propio recuerdo familiar.`,
  `¡Te damos la bienvenida a la mágica aldea digital de Navidad! Elegí uno de los cuatro portales festivos para explorar laboratorios de código, resolver desafíos matemáticos, volar por el espacio con Bity o armar recuerdos familiares.`
);

html = html.replace(
  '<span class="h-banner-tag-badge">🎃 ¡DESAFÍO ESPECIAL DE HALLOWEEN!</span>',
  '<span class="h-banner-tag-badge">🎄 ¡DESAFÍO ESPECIAL DE NAVIDAD!</span>'
);

html = html.replace(
  '<span class="h-banner-tag-sub">✨ ¡ATRÉVETE A PROGRAMAR!</span>',
  '<span class="h-banner-tag-sub">✨ ¡PROGRAMÁ EN FAMILIA!</span>'
);

html = html.replace(
  '<h3 class="h-banner-title">¡MISIÓN ESPECIAL DE HALLOWEEN!</h3>',
  '<h3 class="h-banner-title">¡MISIÓN ESPECIAL DE NAVIDAD!</h3>'
);

html = html.replace(
  `¡Ayudá a Bitty a superar los desafíos más misteriosos! Programá, resolvé acertijos y completá la misión espacial de Halloween.`,
  `¡Ayudá a Bitty a recorrer el cosmos navideño y llegar al Taller de Santa! Programá, resolvé acertijos y completá desafíos para ganar estrellas.`
);

html = html.replace(
  `<button type="button" id="btn-banner-start-bityblockly" class="btn-banner-cta" title="Comenzar la Misión Espacial de Halloween">
                <span class="btn-cta-icon">🎃</span>
                <span class="btn-cta-text">¡COMENZAR LA MISIÓN!</span>
                <span class="btn-cta-arrow">🚀</span>
              </button>`,
  `<button type="button" id="btn-banner-start-bityblockly" class="btn-banner-cta" title="Comenzar la Misión Espacial de Navidad">
                <span class="btn-cta-icon">🎁</span>
                <span class="btn-cta-text">¡COMENZAR LA MISIÓN!</span>
                <span class="btn-cta-arrow">🚀</span>
              </button>`
);

html = html.replace(
  `<span class="h-feat-pill">👻 Desafíos & Acertijos</span>`,
  `<span class="h-feat-pill">🎁 Desafíos & Acertijos</span>`
);

// 5. Bity en el banner: Reemplazar la calabaza por una caja de regalo con moño
html = html.replace(
  `<!-- Brazo derecho sosteniendo calabaza mágica -->
                  <path d="M 138 116 Q 160 135 154 150" stroke="url(#suitGrad)" stroke-width="12" stroke-linecap="round" fill="none"/>
                  <!-- Calabaza linterna espacial que sostiene Bitty -->
                  <g transform="translate(142, 140)">
                    <ellipse cx="12" cy="14" rx="14" ry="12" fill="#FF7518" stroke="#17102B" stroke-width="1.5"/>
                    <path d="M 12 2 Q 14 0 16 2" stroke="#22C55E" stroke-width="3" fill="none"/>
                    <!-- Ojos y boca luminosa de la calabaza -->
                    <polygon points="6,11 10,11 8,8" fill="#FEF08A"/>
                    <polygon points="14,11 18,11 16,8" fill="#FEF08A"/>
                    <path d="M 7 16 Q 12 21 17 16" stroke="#FEF08A" stroke-width="2" fill="none"/>
                  </g>`,
  `<!-- Brazo derecho sosteniendo regalo navideño -->
                  <path d="M 138 116 Q 160 135 154 150" stroke="url(#suitGrad)" stroke-width="12" stroke-linecap="round" fill="none"/>
                  <!-- Regalo Navideño con Moño Dorado que sostiene Bitty -->
                  <g transform="translate(140, 138)">
                    <rect x="0" y="4" width="26" height="24" rx="4" fill="#dc2626" stroke="#17102B" stroke-width="2"/>
                    <line x1="13" y1="4" x2="13" y2="28" stroke="#ffd700" stroke-width="4"/>
                    <line x1="0" y1="16" x2="26" y2="16" stroke="#ffd700" stroke-width="4"/>
                    <!-- Moño -->
                    <circle cx="13" cy="4" r="5" fill="#facc15"/>
                  </g>`
);

html = html.replace(
  `<div class="h-floating-mini-item item-pumpkin">🎃</div>
              <div class="h-floating-mini-item item-ghost">👻</div>
              <div class="h-floating-mini-item item-crystal">💎</div>`,
  `<div class="h-floating-mini-item item-pumpkin">🎁</div>
              <div class="h-floating-mini-item item-ghost">⭐</div>
              <div class="h-floating-mini-item item-crystal">🎄</div>`
);

// 6. Portal 3: La aventura de Bity
html = html.replace(
  `<span class="portal-icon-main">🎃</span>`,
  `<span class="portal-icon-main">🎅</span>`
);

html = html.replace(
  `Viajá por el cosmos embrujado: saltá plataformas 2D, explorá laberintos espaciales, esquivá peligros y aplicá tus instrucciones para volver a casa.`,
  `Viajá por el cosmos navideño: saltá plataformas 2D, explorá laberintos nevados, recolectá regalos y aplicá tus instrucciones para volver a casa.`
);

html = html.replace(
  `<button id="btn-home-adventure" class="btn-banner-action portal-btn" type="button">
            <span>🎃</span> ¡Comenzar la Aventura!
          </button>`,
  `<button id="btn-home-adventure" class="btn-banner-action portal-btn" type="button">
            <span>🎄</span> ¡Comenzar la Aventura!
          </button>`
);

// 7. Portada de BityBlockly
html = html.replace(
  '<span class="cover-halloween-badge">🎃 EDICIÓN ESPECIAL DE HALLOWEEN 🚀</span>',
  '<span class="cover-halloween-badge">🎄 EDICIÓN ESPECIAL DE NAVIDAD 🚀</span>'
);

html = html.replace(
  '<h2 class="cover-subtitle">¡UNA AVENTURA MATEMÁTICA DE HALLOWEEN!</h2>',
  '<h2 class="cover-subtitle">¡UNA AVENTURA MATEMÁTICA DE NAVIDAD!</h2>'
);

html = html.replace(
  `Acompañá a <strong>Byte</strong> en su nave interestelar mientras viaja hacia el <strong>Planeta Embrujado</strong>.
            ¡Resolvé misterios matemáticos, programá sus movimientos y descubrí los secretos del cosmos de Halloween!`,
  `Acompañá a <strong>Byte</strong> en su nave interestelar mientras viaja hacia el <strong>Polo Norte Cósmico</strong>.
            ¡Resolvé misterios matemáticos, programá sus movimientos y descubrí los secretos del cosmos navideño!`
);

html = html.replace(
  `<span>🚀 Nave espacial en curso al Planeta Embrujado de las Calabazas</span>`,
  `<span>🚀 Nave espacial en curso al Taller Navideño del Polo Norte</span>`
);

// Grados BityBlockly
html = html.replace(
  '<h4 class="h-grade-name">El Planeta de las Calabazas</h4>',
  '<h4 class="h-grade-name">El Planeta de los Regalos</h4>'
);

html = html.replace(
  '<h4 class="h-grade-name">El Tren Fantasma Espacial</h4>',
  '<h4 class="h-grade-name">El Expreso Polar Espacial</h4>'
);

html = html.replace(
  '<h4 class="h-grade-name">El Núcleo del Planeta Embrujado</h4>',
  '<h4 class="h-grade-name">El Taller Cósmico de Santa</h4>'
);

// 8. Reemplazar script de vampiro por Santa
html = html.replace(
  '<script src="js/magicVampire.js"></script>',
  '<script src="js/magicSanta.js"></script>'
);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('index.html updated successfully with Christmas theme!');
