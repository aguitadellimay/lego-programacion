const fs = require('fs');

// --- 1. UPDATE js/magicVampire.js ---
let js = fs.readFileSync('js/magicVampire.js', 'utf8').replace(/\r\n/g, '\n');

// Update intervals in constructor
js = js.replace(
  /this\.minIntervalMs = 60000;\s*this\.maxIntervalMs = 120000;\s*this\.initialDelayMs = 45000;/,
  `this.minIntervalMs = 45000; // 45 a 100 segundos\n      this.maxIntervalMs = 100000;\n      this.initialDelayMs = 25000;`
);

// Character list and messages
const oldMsgBlock = `      // Banco de mensajes divertidos y motivadores
      this.messages = [
        '¡BUUU! ¡A PROGRAMAR!',
        '¡EL VAMPIRO QUIERE VER TU CÓDIGO!',
        '¡QUÉ MISTERIOSO! ¿RESOLVISTE EL DESAFÍO?',
        '¡LA MAGIA ESTÁ EN TUS BLOQUES!',
        '¡FELIZ HALLOWEEN, PROGRAMADOR!'
      ];

      // Tipos de animación disponibles
      this.animationTypes = [
        'fly-across',   // Cruza volando de lado a lado
        'peek-corner',  // Se asoma desde la esquina inferior saludando
        'smoke-bat',    // Humo violeta, saluda y se convierte en murciélago
        'peek-behind',  // Se asoma desde el lateral de la pantalla
        'hover-float'   // Desciende flotando con su capa y hace una reverencia
      ];`;

const newMsgBlock = `      // Catálogo de personajes de Halloween
      this.characterTypes = ['vampire', 'pumpkin', 'frankenstein', 'spider', 'ghost'];
      this.lastCharacter = null;

      // Banco de mensajes divertidos y motivadores por personaje
      this.characterMessages = {
        vampire: [
          '¡BUUU! ¡A PROGRAMAR!',
          '¡EL VAMPIRO QUIERE VER TU CÓDIGO!',
          '¡QUÉ MISTERIOSO! ¿RESOLVISTE EL DESAFÍO?',
          '¡LA MAGIA ESTÁ EN TUS BLOQUES!',
          '¡FELIZ HALLOWEEN, PROGRAMADOR!'
        ],
        pumpkin: [
          '¡SOY LA CALABAZA MÁGICA! 🎃',
          '¡EXCELENTES INSTRUCCIONES!',
          '¡ILUMINANDO TUS LÍNEAS DE CÓDIGO!',
          '¡CUIDADO CON LOS CALLEJONES OSCUROS!',
          '¡BUEN RECORRIDO, EXPLORADOR!'
        ],
        frankenstein: [
          '¡HOLA AMIGO! ¡A PROGRAMAR! 🤖💚',
          '¡FRANKIE DICE QUE VAS GENIAL!',
          '¡MIS CIRCUITOS ESTÁN FELICES!',
          '¡VAMOS PASO A PASO A LA META!',
          '¡UN GRAN ALGORITMO, CAMPEÓN!'
        ],
        spider: [
          '¡TEJIENDO LÍNEAS DE CÓDIGO! 🕷️🕸️',
          '¡OCHO PATITAS PARA PROGRAMAR!',
          '¡NO TE ASUSTES, SOY AMIGA!',
          '¡CADA BLOQUE ES UN PASO MÁS!',
          '¡RUTAS SECRETAS DESCUBIERTAS!'
        ],
        ghost: [
          '¡BUUU! ¡QUÉ BUEN ALGORITMO! 👻✨',
          '¡FLOTANDO POR EL ESPACIO!',
          '¡LA MAGIA ESTÁ EN TUS INSTRUCCIONES!',
          '¡LAS PUERTAS MÁGICAS SE ABRIRÁN!',
          '¡A RESOLVER EL GRAN DESAFÍO!'
        ]
      };

      // Animaciones por personaje
      this.characterAnimations = {
        vampire: ['fly-across', 'peek-corner', 'smoke-bat', 'peek-behind', 'hover-float'],
        pumpkin: ['pumpkin-hop', 'pumpkin-blink'],
        frankenstein: ['frank-walk', 'frank-peek'],
        spider: ['spider-drop', 'spider-crawl'],
        ghost: ['ghost-float', 'ghost-peek']
      };`;

if (!js.includes(oldMsgBlock)) {
  console.error('Could not find oldMsgBlock in js/magicVampire.js!');
  process.exit(1);
}
js = js.replace(oldMsgBlock, newMsgBlock);
console.log('Updated intervals and character arrays in js/magicVampire.js');

// Add SVG generator methods
const svgMethodsToAdd = `
    /**
     * SVG de Calabaza Saltarina / Parpadeante
     */
    createPumpkinSvg() {
      return \`
        <svg class="halloween-svg-pumpkin" viewBox="0 0 140 140" width="130" height="130" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="pumpGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FFAE42"/>
              <stop offset="70%" stop-color="#FF7518"/>
              <stop offset="100%" stop-color="#B34700"/>
            </radialGradient>
            <radialGradient id="pumpEyeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="50%" stop-color="#FDE047"/>
              <stop offset="100%" stop-color="#FF7518"/>
            </radialGradient>
          </defs>
          <path d="M 68 25 Q 70 8 82 12 Q 78 26 72 26 Z" fill="#22C55E" stroke="#15803D" stroke-width="2"/>
          <path d="M 74 18 Q 88 16 86 24 Q 78 26 74 18 Z" fill="#4ADE80"/>
          <ellipse cx="40" cy="75" rx="28" ry="42" fill="url(#pumpGrad)" stroke="#1F1300" stroke-width="2"/>
          <ellipse cx="100" cy="75" rx="28" ry="42" fill="url(#pumpGrad)" stroke="#1F1300" stroke-width="2"/>
          <ellipse cx="52" cy="76" rx="28" ry="45" fill="url(#pumpGrad)" stroke="#1F1300" stroke-width="2"/>
          <ellipse cx="88" cy="76" rx="28" ry="45" fill="url(#pumpGrad)" stroke="#1F1300" stroke-width="2"/>
          <ellipse cx="70" cy="77" rx="30" ry="46" fill="url(#pumpGrad)" stroke="#1F1300" stroke-width="2"/>
          <polygon points="52,60 62,60 57,72" fill="url(#pumpEyeGlow)" stroke="#7C2D12" stroke-width="1.5" class="pumpkin-eye"/>
          <polygon points="88,60 78,60 83,72" fill="url(#pumpEyeGlow)" stroke="#7C2D12" stroke-width="1.5" class="pumpkin-eye"/>
          <polygon points="70,73 66,80 74,80" fill="url(#pumpEyeGlow)"/>
          <path d="M 46 88 Q 70 112 94 88 Q 88 100 70 100 Q 52 100 46 88 Z" fill="url(#pumpEyeGlow)" stroke="#7C2D12" stroke-width="1.5"/>
          <polygon points="62,90 66,90 66,96 62,96" fill="#1F1300"/>
        </svg>
      \`;
    }

    /**
     * SVG de Frankenstein Simpático
     */
    createFrankensteinSvg() {
      return \`
        <svg class="halloween-svg-frank" viewBox="0 0 150 170" width="130" height="150" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="frankSkin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#86EFAC"/>
              <stop offset="100%" stop-color="#22C55E"/>
            </linearGradient>
          </defs>
          <rect x="42" y="96" width="66" height="60" rx="8" fill="#1E293B" stroke="#0F172A" stroke-width="2"/>
          <polygon points="75,96 62,118 88,118" fill="#93C5FD"/>
          <rect x="24" y="60" width="12" height="8" rx="2" fill="#94A3B8" stroke="#475569" stroke-width="1.5"/>
          <rect x="114" y="60" width="12" height="8" rx="2" fill="#94A3B8" stroke="#475569" stroke-width="1.5"/>
          <rect x="36" y="24" width="78" height="74" rx="14" fill="url(#frankSkin)" stroke="#14532D" stroke-width="2.5"/>
          <path d="M 36 38 L 36 24 L 114 24 L 114 38 L 104 30 L 94 38 L 84 30 L 74 38 L 64 30 L 54 38 L 44 30 Z" fill="#0F172A"/>
          <path d="M 48 38 L 62 46" stroke="#14532D" stroke-width="2" stroke-linecap="round"/>
          <line x1="51" y1="39" x2="53" y2="43" stroke="#14532D" stroke-width="1.5"/>
          <line x1="57" y1="42" x2="59" y2="46" stroke="#14532D" stroke-width="1.5"/>
          <line x1="50" y1="52" x2="66" y2="52" stroke="#0F172A" stroke-width="3" stroke-linecap="round"/>
          <line x1="84" y1="52" x2="100" y2="52" stroke="#0F172A" stroke-width="3" stroke-linecap="round"/>
          <circle cx="58" cy="62" r="7" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/>
          <circle cx="58" cy="62" r="3.5" fill="#0F172A"/>
          <circle cx="56" cy="60" r="1.5" fill="#FFFFFF"/>
          <circle cx="92" cy="62" r="7" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/>
          <circle cx="92" cy="62" r="3.5" fill="#0F172A"/>
          <circle cx="90" cy="60" r="1.5" fill="#FFFFFF"/>
          <circle cx="75" cy="70" r="3" fill="#15803D"/>
          <path d="M 62 78 Q 75 88 88 78" stroke="#0F172A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <g class="frank-arm-wave">
            <path d="M 108 105 Q 128 95 132 80" stroke="#1E293B" stroke-width="14" stroke-linecap="round" fill="none"/>
            <circle cx="132" cy="78" r="8" fill="url(#frankSkin)" stroke="#14532D" stroke-width="1.5"/>
          </g>
        </svg>
      \`;
    }

    /**
     * SVG de Araña Traviesa que Cuelga de Hilo de Seda
     */
    createSpiderSvg() {
      return \`
        <svg class="halloween-svg-spider" viewBox="0 0 130 150" width="110" height="130" xmlns="http://www.w3.org/2000/svg">
          <line x1="65" y1="0" x2="65" y2="55" stroke="#E2E8F0" stroke-width="1.5" stroke-dasharray="3,2" class="spider-silk-thread"/>
          <path d="M 52 75 Q 25 55 15 75" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round" class="spider-leg leg-1"/>
          <path d="M 52 82 Q 20 75 10 95" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round" class="spider-leg leg-2"/>
          <path d="M 52 89 Q 22 95 18 115" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round" class="spider-leg leg-3"/>
          <path d="M 54 96 Q 30 115 32 130" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round" class="spider-leg leg-4"/>
          <path d="M 78 75 Q 105 55 115 75" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round" class="spider-leg leg-5"/>
          <path d="M 78 82 Q 110 75 120 95" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round" class="spider-leg leg-6"/>
          <path d="M 78 89 Q 108 95 112 115" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round" class="spider-leg leg-7"/>
          <path d="M 76 96 Q 100 115 98 130" stroke="#7C3AED" stroke-width="3" fill="none" stroke-linecap="round" class="spider-leg leg-8"/>
          <ellipse cx="65" cy="90" rx="22" ry="24" fill="#1E1B4B" stroke="#A855F7" stroke-width="2"/>
          <ellipse cx="65" cy="72" rx="15" ry="14" fill="#312E81" stroke="#A855F7" stroke-width="2"/>
          <circle cx="59" cy="70" r="5" fill="#FFFFFF"/>
          <circle cx="59" cy="70" r="2.5" fill="#0F172A"/>
          <circle cx="58" cy="68" r="1" fill="#FFFFFF"/>
          <circle cx="71" cy="70" r="5" fill="#FFFFFF"/>
          <circle cx="71" cy="70" r="2.5" fill="#0F172A"/>
          <circle cx="70" cy="68" r="1" fill="#FFFFFF"/>
          <circle cx="52" cy="72" r="2" fill="#FDE047"/>
          <circle cx="78" cy="72" r="2" fill="#FDE047"/>
          <path d="M 61 77 Q 65 81 69 77" stroke="#FFFFFF" stroke-width="1.5" fill="none"/>
        </svg>
      \`;
    }

    /**
     * SVG de Fantasma Cósmico Amigable
     */
    createGhostSvg() {
      return \`
        <svg class="halloween-svg-ghost" viewBox="0 0 130 150" width="115" height="135" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="ghostGlow" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="60%" stop-color="#E0E7FF"/>
              <stop offset="100%" stop-color="#A5B4FC"/>
            </radialGradient>
          </defs>
          <path d="M 30 70 C 30 30 100 30 100 70 C 100 110 105 130 92 125 C 82 120 78 132 65 125 C 52 118 48 130 38 125 C 28 120 30 100 30 70 Z" fill="url(#ghostGlow)" stroke="#818CF8" stroke-width="2"/>
          <path d="M 32 75 Q 15 65 18 55 Q 26 55 35 68" fill="url(#ghostGlow)" stroke="#818CF8" stroke-width="1.5"/>
          <path d="M 98 75 Q 115 65 112 55 Q 104 55 95 68" fill="url(#ghostGlow)" stroke="#818CF8" stroke-width="1.5"/>
          <ellipse cx="54" cy="62" rx="4.5" ry="6.5" fill="#1E1B4B"/>
          <circle cx="53" cy="60" r="1.5" fill="#FFFFFF"/>
          <ellipse cx="76" cy="62" rx="4.5" ry="6.5" fill="#1E1B4B"/>
          <circle cx="75" cy="60" r="1.5" fill="#FFFFFF"/>
          <circle cx="48" cy="70" r="4" fill="#F472B6" opacity="0.6"/>
          <circle cx="82" cy="70" r="4" fill="#F472B6" opacity="0.6"/>
          <ellipse cx="65" cy="72" rx="4" ry="5.5" fill="#1E1B4B"/>
        </svg>
      \`;
    }
`;

// Insert svgMethodsToAdd right before spawnVampire
const spawnMarker = '    spawnVampire(forcedAnim = null, forcedMsg = null) {';
if (!js.includes(spawnMarker)) {
  console.error('Could not find spawnVampire in js/magicVampire.js!');
  process.exit(1);
}
js = js.replace(spawnMarker, svgMethodsToAdd + '\n' + spawnMarker);

// Update spawnVampire to support all characters
const oldSpawnRegex = /spawnVampire\(forcedAnim = null, forcedMsg = null\) \{[\s\S]*?\n    \}/;

const newSpawnMethod = `spawnVampire(forcedAnim = null, forcedMsg = null, forcedChar = null) {
      if (!this.enabled && !forcedAnim) return;

      const overlay = this.ensureOverlayContainer();
      this.isAppearing = true;

      // Elegir personaje al azar sin repetir el anterior
      let charType = forcedChar;
      if (!charType) {
        const pool = this.characterTypes.filter(c => c !== this.lastCharacter);
        charType = pool[Math.floor(Math.random() * pool.length)] || 'vampire';
      }
      this.lastCharacter = charType;

      // Elegir animación para este personaje
      const anims = this.characterAnimations[charType] || ['fly-across'];
      const animType = forcedAnim || anims[Math.floor(Math.random() * anims.length)];

      // Elegir mensaje para este personaje
      const msgs = this.characterMessages[charType] || ['¡A PROGRAMAR!'];
      const messageText = forcedMsg || msgs[Math.floor(Math.random() * msgs.length)];

      // Audio suave si está habilitado
      if (typeof window !== 'undefined' && window.MagicAudioEngine && window.MagicAudioEngine.isEnabled()) {
        if (typeof window.MagicAudioEngine.playVampireAppear === 'function') {
          window.MagicAudioEngine.playVampireAppear();
        }
      }

      // Generar figura SVG según personaje
      let svgHtml = '';
      if (charType === 'pumpkin') svgHtml = this.createPumpkinSvg();
      else if (charType === 'frankenstein') svgHtml = this.createFrankensteinSvg();
      else if (charType === 'spider') svgHtml = this.createSpiderSvg();
      else if (charType === 'ghost') svgHtml = this.createGhostSvg();
      else svgHtml = this.createVampireSvg();

      // Crear envoltorio
      const card = document.createElement('div');
      card.className = \`magic-vampire-card char-\${charType} anim-\${animType}\`;
      card.setAttribute('role', 'alert');
      card.setAttribute('aria-live', 'polite');

      // Globo de diálogo
      const bubble = document.createElement('div');
      bubble.className = 'vampire-speech-bubble';
      let icon = '✨';
      if (charType === 'pumpkin') icon = '🎃';
      else if (charType === 'frankenstein') icon = '🤖';
      else if (charType === 'spider') icon = '🕷️';
      else if (charType === 'ghost') icon = '👻';
      else icon = '🧛';

      bubble.innerHTML = \`
        <span class="bubble-icon">\${icon}</span>
        <span class="bubble-text">\${messageText}</span>
        <span class="bubble-tail"></span>
      \`;

      // Personaje
      const characterWrap = document.createElement('div');
      characterWrap.className = 'vampire-character-wrap';
      characterWrap.innerHTML = \`
        <div class="vampire-smoke-cloud"></div>
        <div class="vampire-figure-box">\${svgHtml}</div>
        \${animType === 'smoke-bat' ? \`<div class="vampire-bat-box" style="display:none;">\${this.createBatSvg()}</div>\` : ''}
        <div class="vampire-sparkles-burst">
          <span>✨</span><span>\${icon}</span><span>✨</span>
        </div>
      \`;

      card.appendChild(bubble);
      card.appendChild(characterWrap);

      card.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dismissCurrentAppearance();
      });

      overlay.appendChild(card);
      this.activeVampireEl = card;

      if (animType === 'smoke-bat') {
        setTimeout(() => {
          if (!this.activeVampireEl) return;
          const figBox = card.querySelector('.vampire-figure-box');
          const batBox = card.querySelector('.vampire-bat-box');
          const smoke = card.querySelector('.vampire-smoke-cloud');
          if (smoke) smoke.classList.add('puff-active');
          if (figBox) figBox.style.display = 'none';
          if (batBox) batBox.style.display = 'block';
        }, 2200);
      }

      const displayDuration = animType === 'fly-across' || animType === 'frank-walk' ? 4800 : 4200;
      setTimeout(() => {
        this.finishAppearance(card);
      }, displayDuration);
    }`;

js = js.replace(oldSpawnRegex, newSpawnMethod);
fs.writeFileSync('js/magicVampire.js', js, 'utf8');
console.log('Successfully updated js/magicVampire.js with all 5 characters!');
