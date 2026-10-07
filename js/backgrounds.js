/**
 * Fondos ilustrados en formato SVG para la aplicación "Lego Familiar".
 * Creados como vectores puros para máxima nitidez, sin depender de imágenes externas.
 */

const BACKGROUNDS = [
  {
    id: 'parque',
    name: '🌳 Parque Soleado',
    description: 'Un día soleado en el parque con árboles y flores',
    imgPath: 'img/bg_parque.jpg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4fc3f7"/>
          <stop offset="60%" stop-color="#b3e5fc"/>
          <stop offset="100%" stop-color="#e1f5fe"/>
        </linearGradient>
        <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#81c784"/>
          <stop offset="100%" stop-color="#4caf50"/>
        </linearGradient>
        <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#aed581"/>
          <stop offset="100%" stop-color="#689f38"/>
        </linearGradient>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff59d"/>
          <stop offset="50%" stop-color="#fdd835"/>
          <stop offset="100%" stop-color="#fbc02d" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- Cielo -->
      <rect width="1000" height="700" fill="url(#skyGrad)"/>
      <!-- Sol radiante -->
      <circle cx="850" cy="130" r="90" fill="url(#sunGlow)"/>
      <circle cx="850" cy="130" r="50" fill="#fbc02d"/>
      <!-- Nubes esponjosas -->
      <g fill="#ffffff" opacity="0.9">
        <circle cx="180" cy="120" r="45"/><circle cx="230" cy="100" r="55"/><circle cx="290" cy="120" r="45"/><circle cx="230" cy="135" r="40"/>
        <circle cx="580" cy="160" r="35"/><circle cx="620" cy="145" r="45"/><circle cx="670" cy="160" r="35"/>
      </g>
      <!-- Colinas lejanas -->
      <path d="M-50 480 Q 250 340 550 450 T 1050 420 L 1050 750 L -50 750 Z" fill="url(#hill1)"/>
      <!-- Árboles lejanos -->
      <g fill="#2e7d32">
        <circle cx="200" cy="400" r="35"/><circle cx="230" cy="385" r="40"/><circle cx="260" cy="400" r="30"/>
        <circle cx="780" cy="410" r="38"/><circle cx="820" cy="390" r="45"/><circle cx="860" cy="415" r="32"/>
      </g>
      <!-- Colina frontal -->
      <path d="M-50 560 Q 300 480 650 540 T 1050 510 L 1050 750 L -50 750 Z" fill="url(#hill2)"/>
      <!-- Árbol grande a la izquierda -->
      <rect x="90" y="470" width="25" height="110" fill="#795548" rx="5"/>
      <circle cx="80" cy="450" r="45" fill="#388e3c"/>
      <circle cx="125" cy="440" r="50" fill="#43a047"/>
      <circle cx="102" cy="400" r="45" fill="#4caf50"/>
      <!-- Flores de colores en el césped -->
      <g>
        <circle cx="150" cy="620" r="8" fill="#e91e63"/><circle cx="150" cy="620" r="3" fill="#ffeb3b"/>
        <circle cx="230" cy="650" r="9" fill="#ff9800"/><circle cx="230" cy="650" r="3" fill="#ffffff"/>
        <circle cx="420" cy="610" r="7" fill="#9c27b0"/><circle cx="420" cy="610" r="3" fill="#ffeb3b"/>
        <circle cx="720" cy="630" r="9" fill="#e91e63"/><circle cx="720" cy="630" r="3" fill="#ffeb3b"/>
        <circle cx="880" cy="600" r="8" fill="#00bcd4"/><circle cx="880" cy="600" r="3" fill="#ffffff"/>
      </g>
    </svg>`
  },
  {
    id: 'playa',
    name: '🏖️ Playa Tropical',
    description: 'Playa con mar turquesa, arena y palmera',
    imgPath: 'img/bg_playa.jpg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
      <defs>
        <linearGradient id="beachSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#29b6f6"/>
          <stop offset="60%" stop-color="#80d8ff"/>
          <stop offset="100%" stop-color="#fff9c4"/>
        </linearGradient>
        <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0288d1"/>
          <stop offset="50%" stop-color="#00acc1"/>
          <stop offset="100%" stop-color="#4dd0e1"/>
        </linearGradient>
        <linearGradient id="sandGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffe082"/>
          <stop offset="100%" stop-color="#ffd54f"/>
        </linearGradient>
      </defs>
      <rect width="1000" height="700" fill="url(#beachSky)"/>
      <circle cx="180" cy="120" r="55" fill="#ffb300" opacity="0.9"/>
      <!-- Mar -->
      <path d="M0 320 Q 300 310 600 325 T 1000 320 L 1000 520 L 0 520 Z" fill="url(#oceanGrad)"/>
      <!-- Olas de espuma -->
      <path d="M-20 420 Q 250 400 500 420 T 1020 410" stroke="#ffffff" stroke-width="8" fill="none" opacity="0.75" stroke-linecap="round"/>
      <path d="M-20 460 Q 280 440 600 465 T 1020 450" stroke="#e0f7fa" stroke-width="12" fill="none" opacity="0.85" stroke-linecap="round"/>
      <!-- Arena de playa -->
      <path d="M-50 490 Q 350 440 700 500 T 1050 480 L 1050 750 L -50 750 Z" fill="url(#sandGrad)"/>
      <!-- Palmera a la derecha -->
      <g>
        <path d="M880 620 Q 860 450 820 330 Q 840 450 895 620 Z" fill="#8d6e63"/>
        <!-- Anillos tronco -->
        <circle cx="850" cy="410" r="15" fill="none" stroke="#6d4c41" stroke-width="3"/>
        <circle cx="865" cy="490" r="18" fill="none" stroke="#6d4c41" stroke-width="3"/>
        <!-- Hojas verdes -->
        <path d="M820 330 Q 720 280 660 340" stroke="#2e7d32" stroke-width="14" fill="none" stroke-linecap="round"/>
        <path d="M820 330 Q 780 230 730 220" stroke="#388e3c" stroke-width="14" fill="none" stroke-linecap="round"/>
        <path d="M820 330 Q 860 210 930 240" stroke="#43a047" stroke-width="14" fill="none" stroke-linecap="round"/>
        <path d="M820 330 Q 940 280 970 360" stroke="#2e7d32" stroke-width="14" fill="none" stroke-linecap="round"/>
        <!-- Cocos -->
        <circle cx="815" cy="335" r="9" fill="#5d4037"/>
        <circle cx="828" cy="338" r="8" fill="#4e342e"/>
      </g>
      <!-- Estrella de mar en la arena -->
      <g transform="translate(180, 580) scale(0.9)">
        <polygon points="25,0 32,15 49,18 37,30 40,47 25,39 9,47 13,30 0,18 17,15" fill="#ff7043"/>
        <circle cx="25" cy="25" r="4" fill="#d84315"/>
      </g>
      <!-- Pelota de playa -->
      <g transform="translate(340, 600)">
        <circle cx="25" cy="25" r="25" fill="#f44336"/>
        <path d="M25 0 A 25 25 0 0 1 25 50 Z" fill="#2196f3"/>
        <path d="M25 0 A 13 25 0 0 1 25 50 Z" fill="#ffeb3b"/>
      </g>
    </svg>`
  },
  {
    id: 'espacio',
    name: '🚀 Aventura Espacial',
    description: 'El cosmos infinito con estrellas, planetas y galaxias',
    imgPath: 'img/bg_espacio.jpg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
      <defs>
        <radialGradient id="spaceGrad" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stop-color="#1a1c4b"/>
          <stop offset="45%" stop-color="#0c0d24"/>
          <stop offset="100%" stop-color="#04040a"/>
        </radialGradient>
        <linearGradient id="planetRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffcc80" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#ffab40" stop-opacity="0.3"/>
        </linearGradient>
      </defs>
      <rect width="1000" height="700" fill="url(#spaceGrad)"/>
      <!-- Estrellas titilantes -->
      <g fill="#ffffff">
        <circle cx="80" cy="90" r="2.5"/><circle cx="160" cy="220" r="1.5"/><circle cx="280" cy="80" r="3"/>
        <circle cx="430" cy="140" r="2"/><circle cx="620" cy="95" r="1.5"/><circle cx="890" cy="85" r="2"/>
        <circle cx="940" cy="230" r="2.5"/><circle cx="70" cy="450" r="2"/><circle cx="180" cy="590" r="3"/>
        <circle cx="390" cy="630" r="1.5"/><circle cx="740" cy="560" r="2.5"/><circle cx="920" cy="480" r="2"/>
        <circle cx="510" cy="490" r="1.5"/><circle cx="340" cy="380" r="2"/>
      </g>
      <!-- Nebulosa rosada/azul -->
      <ellipse cx="750" cy="280" rx="220" ry="120" fill="#7b1fa2" opacity="0.25"/>
      <ellipse cx="250" cy="450" rx="190" ry="100" fill="#0288d1" opacity="0.2"/>
      <!-- Gran Planeta con Anillo -->
      <g transform="translate(220, 200)">
        <!-- Anillo trasero -->
        <ellipse cx="0" cy="0" rx="140" ry="38" fill="url(#planetRing)" transform="rotate(-25)"/>
        <!-- Planeta -->
        <circle cx="0" cy="0" r="70" fill="#ff7043"/>
        <path d="M-60 -20 Q 0 10 60 -15" stroke="#f4511e" stroke-width="9" fill="none" opacity="0.6"/>
        <path d="M-68 15 Q 0 45 68 20" stroke="#d84315" stroke-width="8" fill="none" opacity="0.6"/>
        <!-- Anillo delantero -->
        <path d="M-125 55 Q 0 35 125 -55" stroke="#ffe082" stroke-width="12" fill="none" opacity="0.85"/>
      </g>
      <!-- Planeta azul pequeño -->
      <circle cx="820" cy="170" r="40" fill="#00e5ff" opacity="0.9"/>
      <circle cx="808" cy="158" r="10" fill="#ffffff" opacity="0.4"/>
      <!-- Luna con cráteres -->
      <g transform="translate(850, 520)">
        <circle cx="0" cy="0" r="65" fill="#e0e0e0"/>
        <circle cx="-20" cy="-15" r="12" fill="#bdbdbd"/>
        <circle cx="15" cy="20" r="16" fill="#9e9e9e"/>
        <circle cx="25" cy="-22" r="8" fill="#bdbdbd"/>
        <circle cx="-10" cy="30" r="10" fill="#bdbdbd"/>
      </g>
      <!-- Cohete espacial amigable -->
      <g transform="translate(540, 360) rotate(-35)">
        <polygon points="0,-40 -18,25 18,25" fill="#f44336"/>
        <rect x="-18" y="25" width="36" height="50" rx="6" fill="#eceff1"/>
        <circle cx="0" cy="50" r="11" fill="#42a5f5"/>
        <polygon points="-18,65 -35,75 -18,45" fill="#e53935"/>
        <polygon points="18,65 35,75 18,45" fill="#e53935"/>
        <!-- Fuego propulsor -->
        <polygon points="-12,75 0,110 12,75" fill="#ff9800"/>
        <polygon points="-7,75 0,98 7,75" fill="#ffeb3b"/>
      </g>
    </svg>`
  },
  {
    id: 'montana',
    name: '🏔️ Montaña Mágica',
    description: 'Majestuosas montañas con picos nevados y pinos verdes',
    imgPath: 'img/bg_montana.jpg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
      <defs>
        <linearGradient id="mountSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3f51b5"/>
          <stop offset="50%" stop-color="#7986cb"/>
          <stop offset="100%" stop-color="#e8eaf6"/>
        </linearGradient>
      </defs>
      <rect width="1000" height="700" fill="url(#mountSky)"/>
      <circle cx="150" cy="140" r="45" fill="#fff59d"/>
      <!-- Montaña lejana centro -->
      <polygon points="500,180 320,530 680,530" fill="#5c6bc0"/>
      <polygon points="500,180 460,260 500,285 540,260" fill="#ffffff"/>
      <!-- Montaña izquierda -->
      <polygon points="260,240 60,560 460,560" fill="#3949ab"/>
      <polygon points="260,240 220,310 260,335 300,310" fill="#ffffff"/>
      <!-- Montaña derecha -->
      <polygon points="760,210 540,550 980,550" fill="#49599a"/>
      <polygon points="760,210 710,290 760,320 810,290" fill="#ffffff"/>
      <!-- Ladera verde con pinos -->
      <path d="M0 500 Q 500 440 1000 500 L 1000 700 L 0 700 Z" fill="#2e7d32"/>
      <!-- Lago azul brillante -->
      <ellipse cx="500" cy="620" rx="380" ry="60" fill="#29b6f6" opacity="0.8"/>
      <!-- Pinos decorativos -->
      <g fill="#1b5e20">
        <polygon points="120,430 100,480 140,480"/>
        <polygon points="120,410 105,450 135,450"/>
        <polygon points="180,450 160,500 200,500"/>
        <polygon points="840,440 820,490 860,490"/>
        <polygon points="890,460 870,510 910,510"/>
      </g>
    </svg>`
  },
  {
    id: 'fiesta',
    name: '🎈 Fiesta Familiar',
    description: 'Globos, confeti de colores y banderines festivos',
    imgPath: 'img/bg_fiesta.jpg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
      <defs>
        <linearGradient id="partyBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fff9c4"/>
          <stop offset="50%" stop-color="#ffecb3"/>
          <stop offset="100%" stop-color="#ffe0b2"/>
        </linearGradient>
      </defs>
      <rect width="1000" height="700" fill="url(#partyBg)"/>
      <!-- Banderines arriba tira 1 -->
      <path d="M0 30 Q 500 130 1000 30" stroke="#795548" stroke-width="2" fill="none"/>
      <polygon points="80,45 120,49 100,105" fill="#e53935"/>
      <polygon points="180,62 220,68 200,125" fill="#1e88e5"/>
      <polygon points="280,77 320,83 300,140" fill="#43a047"/>
      <polygon points="380,87 420,91 400,149" fill="#fdd835"/>
      <polygon points="480,91 520,91 500,150" fill="#e91e63"/>
      <polygon points="580,89 620,86 600,148" fill="#8e24aa"/>
      <polygon points="680,81 720,75 700,138" fill="#00acc1"/>
      <polygon points="780,69 820,63 800,126" fill="#fb8c00"/>
      <polygon points="880,51 920,44 900,108" fill="#43a047"/>

      <!-- Globos flotando a los costados -->
      <!-- Globo Rojo -->
      <g transform="translate(100, 280)">
        <ellipse cx="0" cy="0" rx="42" ry="54" fill="#e53935"/>
        <ellipse cx="-12" cy="-15" rx="10" ry="18" fill="#ffffff" opacity="0.35"/>
        <polygon points="-5,54 5,54 0,62" fill="#c62828"/>
        <path d="M0 62 Q 10 110 -5 160" stroke="#9e9e9e" stroke-width="2" fill="none"/>
      </g>
      <!-- Globo Amarillo -->
      <g transform="translate(180, 230)">
        <ellipse cx="0" cy="0" rx="38" ry="50" fill="#fdd835"/>
        <ellipse cx="-10" cy="-12" rx="9" ry="16" fill="#ffffff" opacity="0.45"/>
        <polygon points="-5,50 5,50 0,58" fill="#fbc02d"/>
        <path d="M0 58 Q -15 110 5 170" stroke="#9e9e9e" stroke-width="2" fill="none"/>
      </g>
      <!-- Globo Azul -->
      <g transform="translate(900, 270)">
        <ellipse cx="0" cy="0" rx="42" ry="54" fill="#1e88e5"/>
        <ellipse cx="-12" cy="-15" rx="10" ry="18" fill="#ffffff" opacity="0.35"/>
        <polygon points="-5,54 5,54 0,62" fill="#1565c0"/>
        <path d="M0 62 Q -10 120 10 170" stroke="#9e9e9e" stroke-width="2" fill="none"/>
      </g>
      <!-- Globo Morado -->
      <g transform="translate(820, 220)">
        <ellipse cx="0" cy="0" rx="38" ry="48" fill="#8e24aa"/>
        <ellipse cx="-10" cy="-12" rx="9" ry="16" fill="#ffffff" opacity="0.35"/>
        <polygon points="-5,48 5,48 0,56" fill="#6a1b9a"/>
        <path d="M0 56 Q 15 110 -5 180" stroke="#9e9e9e" stroke-width="2" fill="none"/>
      </g>

      <!-- Confeti alegre disperso -->
      <g>
        <rect x="250" y="240" width="14" height="7" rx="3" fill="#e91e63" transform="rotate(25 250 240)"/>
        <rect x="340" y="310" width="12" height="6" rx="2" fill="#ffb300" transform="rotate(-35 340 310)"/>
        <rect x="420" y="220" width="15" height="7" rx="3" fill="#00bcd4" transform="rotate(45 420 220)"/>
        <rect x="560" y="250" width="14" height="6" rx="2" fill="#4caf50" transform="rotate(-15 560 250)"/>
        <rect x="670" y="290" width="12" height="6" rx="2" fill="#e53935" transform="rotate(50 670 290)"/>
        <rect x="740" y="210" width="16" height="7" rx="3" fill="#8e24aa" transform="rotate(-40 740 210)"/>
        <circle cx="300" cy="280" r="5" fill="#ff4081"/>
        <circle cx="500" cy="270" r="6" fill="#ffd600"/>
        <circle cx="630" cy="220" r="5" fill="#00e676"/>
        <circle cx="710" cy="340" r="6" fill="#2979ff"/>
      </g>
    </svg>`
  },
  {
    id: 'minecraft',
    name: '🟩 Mundo Minecraft',
    description: 'Paisaje pixelado con cielo cúbico, nubes y bloques de pasto',
    imgPath: 'img/bg_minecraft.jpg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
      <defs>
        <linearGradient id="mcSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4a98e8"/>
          <stop offset="65%" stop-color="#78b7f5"/>
          <stop offset="100%" stop-color="#b8dcfe"/>
        </linearGradient>
        <pattern id="grassTop" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#588d38"/>
          <rect x="0" y="0" width="10" height="10" fill="#4d7c30"/>
          <rect x="10" y="10" width="10" height="10" fill="#659d42"/>
        </pattern>
        <pattern id="dirtPat" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#866043"/>
          <rect x="0" y="0" width="10" height="10" fill="#725138"/>
          <rect x="10" y="10" width="10" height="10" fill="#996e4d"/>
        </pattern>
        <pattern id="stonePat" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#757575"/>
          <rect x="0" y="0" width="10" height="10" fill="#616161"/>
          <rect x="10" y="10" width="10" height="10" fill="#888888"/>
        </pattern>
      </defs>
      <!-- Cielo -->
      <rect width="1000" height="700" fill="url(#mcSky)"/>

      <!-- Sol cuadrado clásico de Minecraft -->
      <g transform="translate(760, 80)">
        <rect x="0" y="0" width="110" height="110" fill="#ffff8d" opacity="0.4"/>
        <rect x="10" y="10" width="90" height="90" fill="#ffff00" opacity="0.8"/>
        <rect x="20" y="20" width="70" height="70" fill="#ffffff"/>
      </g>

      <!-- Nubes cuadradas de vóxeles -->
      <g fill="#ffffff" opacity="0.85">
        <rect x="60" y="90" width="220" height="40"/>
        <rect x="100" y="70" width="140" height="20"/>
        <rect x="140" y="130" width="80" height="15"/>
        <rect x="420" y="130" width="260" height="45"/>
        <rect x="480" y="105" width="160" height="25"/>
      </g>

      <!-- Montañas distantes de piedra pixelada -->
      <g>
        <polygon points="120,380 280,240 440,380" fill="url(#stonePat)"/>
        <polygon points="240,275 280,240 320,275 280,290" fill="#ffffff"/>
        <polygon points="400,420 540,290 680,420" fill="url(#stonePat)"/>
        <polygon points="510,320 540,290 570,320 540,335" fill="#ffffff"/>
      </g>

      <!-- Colinas escalonadas estilo Minecraft (Grass Blocks) -->
      <path d="M-20 440 L 180 440 L 180 400 L 340 400 L 340 460 L 620 460 L 620 420 L 860 420 L 860 450 L 1020 450 L 1020 720 L -20 720 Z" fill="#4d7c30"/>
      <path d="M-20 490 L 120 490 L 120 460 L 260 460 L 260 510 L 520 510 L 520 470 L 740 470 L 740 500 L 1020 500 L 1020 720 L -20 720 Z" fill="url(#dirtPat)"/>
      <path d="M-20 490 L 120 490 L 120 460 L 260 460 L 260 510 L 520 510 L 520 470 L 740 470 L 740 500 L 1020 500 L 1020 525 L 740 525 L 740 495 L 520 495 L 520 535 L 260 535 L 260 485 L 120 485 L 120 515 L -20 515 Z" fill="#588d38"/>

      <!-- Terreno frontal -->
      <rect x="0" y="580" width="1000" height="120" fill="url(#dirtPat)"/>
      <rect x="0" y="580" width="1000" height="28" fill="#588d38"/>
      <g fill="#4d7c30">
        <rect x="40" y="608" width="15" height="15"/>
        <rect x="120" y="608" width="20" height="10"/>
        <rect x="250" y="608" width="18" height="18"/>
        <rect x="390" y="608" width="15" height="12"/>
        <rect x="540" y="608" width="22" height="16"/>
        <rect x="710" y="608" width="18" height="14"/>
        <rect x="860" y="608" width="20" height="18"/>
      </g>

      <!-- Árbol cuadrado de Roble a la izquierda -->
      <g transform="translate(100, 310)">
        <rect x="50" y="150" width="40" height="130" fill="#6d4c41"/>
        <rect x="50" y="170" width="40" height="20" fill="#5d4037"/>
        <rect x="50" y="220" width="40" height="25" fill="#4e342e"/>
        <rect x="0" y="30" width="140" height="120" fill="#388e3c"/>
        <rect x="20" y="0" width="100" height="30" fill="#43a047"/>
        <rect x="15" y="45" width="30" height="30" fill="#2e7d32"/>
        <rect x="80" y="65" width="35" height="30" fill="#4caf50"/>
      </g>

      <!-- Árbol cuadrado a la derecha -->
      <g transform="translate(800, 340)">
        <rect x="40" y="130" width="35" height="120" fill="#6d4c41"/>
        <rect x="0" y="30" width="115" height="100" fill="#388e3c"/>
        <rect x="15" y="5" width="85" height="25" fill="#43a047"/>
      </g>

      <!-- Flores pixeladas -->
      <g transform="translate(320, 545)">
        <rect x="8" y="15" width="4" height="22" fill="#2e7d32"/>
        <rect x="2" y="3" width="16" height="16" fill="#e53935"/>
        <rect x="6" y="7" width="8" height="8" fill="#b71c1c"/>
      </g>
      <g transform="translate(680, 545)">
        <rect x="8" y="15" width="4" height="22" fill="#2e7d32"/>
        <rect x="2" y="3" width="16" height="16" fill="#fdd835"/>
        <rect x="6" y="7" width="8" height="8" fill="#f57f17"/>
      </g>
      <!-- Lago de agua -->
      <rect x="890" y="620" width="90" height="60" fill="#1976d2" opacity="0.8"/>
    </svg>`
  },
  {
    id: 'mario',
    name: '🍄 Mundo Champiñón',
    description: 'Clásico reino de plataformas con bloques de ladrillo, tuberías verdes y colinas con ojos',
    imgPath: 'img/bg_mario.jpg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
      <defs>
        <linearGradient id="marioSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#5c94fc"/>
          <stop offset="70%" stop-color="#6ba0fc"/>
          <stop offset="100%" stop-color="#88b5fc"/>
        </linearGradient>
        <pattern id="marioGround" width="32" height="32" patternUnits="userSpaceOnUse">
          <rect width="32" height="32" fill="#d85000"/>
          <rect x="0" y="0" width="16" height="16" fill="#c84400"/>
          <rect x="16" y="16" width="16" height="16" fill="#c84400"/>
          <rect x="2" y="2" width="12" height="12" fill="#f89050"/>
          <rect x="18" y="18" width="12" height="12" fill="#f89050"/>
        </pattern>
        <pattern id="marioBrick" width="32" height="16" patternUnits="userSpaceOnUse">
          <rect width="32" height="16" fill="#000000"/>
          <rect x="1" y="1" width="14" height="6" fill="#b84400"/>
          <rect x="17" y="1" width="14" height="6" fill="#b84400"/>
          <rect x="1" y="9" width="30" height="6" fill="#b84400"/>
          <rect x="2" y="2" width="12" height="2" fill="#f89050"/>
          <rect x="18" y="2" width="12" height="2" fill="#f89050"/>
          <rect x="2" y="10" width="28" height="2" fill="#f89050"/>
        </pattern>
      </defs>
      <!-- Cielo azul brillante clásico -->
      <rect width="1000" height="700" fill="url(#marioSky)"/>

      <!-- Nubes de Mario con ojos -->
      <g transform="translate(140, 110)">
        <path d="M 0 30 C 0 10, 20 0, 40 10 C 50 0, 80 0, 90 10 C 110 0, 130 10, 130 30 C 140 40, 135 60, 120 60 L 10 60 C -5 60, -5 40, 0 30 Z" fill="#ffffff"/>
        <ellipse cx="50" cy="38" rx="3" ry="7" fill="#000000"/>
        <ellipse cx="80" cy="38" rx="3" ry="7" fill="#000000"/>
      </g>
      <g transform="translate(680, 80) scale(1.2)">
        <path d="M 0 30 C 0 10, 20 0, 40 10 C 50 0, 80 0, 90 10 C 110 0, 130 10, 130 30 C 140 40, 135 60, 120 60 L 10 60 C -5 60, -5 40, 0 30 Z" fill="#ffffff"/>
        <ellipse cx="50" cy="38" rx="3" ry="7" fill="#000000"/>
        <ellipse cx="80" cy="38" rx="3" ry="7" fill="#000000"/>
      </g>

      <!-- Gran colina verde con ojos a la izquierda -->
      <g transform="translate(60, 310)">
        <path d="M 0 280 C 0 100, 70 0, 140 0 C 210 0, 280 100, 280 280 Z" fill="#00a800" stroke="#000000" stroke-width="4"/>
        <ellipse cx="115" cy="80" rx="7" ry="18" fill="#000000"/>
        <ellipse cx="117" cy="74" rx="2.5" ry="6" fill="#ffffff"/>
        <ellipse cx="165" cy="80" rx="7" ry="18" fill="#000000"/>
        <ellipse cx="167" cy="74" rx="2.5" ry="6" fill="#ffffff"/>
      </g>

      <!-- Colina mediana verde a la derecha -->
      <g transform="translate(720, 370)">
        <path d="M 0 220 C 0 80, 55 0, 110 0 C 165 0, 220 80, 220 220 Z" fill="#50e050" stroke="#000000" stroke-width="4"/>
        <ellipse cx="90" cy="65" rx="6" ry="15" fill="#000000"/>
        <ellipse cx="92" cy="60" rx="2" ry="5" fill="#ffffff"/>
        <ellipse cx="130" cy="65" rx="6" ry="15" fill="#000000"/>
        <ellipse cx="132" cy="60" rx="2" ry="5" fill="#ffffff"/>
      </g>

      <!-- Pequeño arbusto con ojos -->
      <g transform="translate(420, 520)">
        <path d="M 10 50 C 0 30, 25 10, 45 25 C 60 5, 90 5, 105 25 C 125 10, 150 30, 140 50 Z" fill="#50e050" stroke="#000000" stroke-width="3"/>
        <ellipse cx="65" cy="30" rx="4" ry="9" fill="#000000"/>
        <ellipse cx="85" cy="30" rx="4" ry="9" fill="#000000"/>
      </g>

      <!-- Fila de Bloques flotantes (Ladrillos y Bloque ?) -->
      <!-- Bloque ladrillo 1 -->
      <g transform="translate(320, 320)">
        <rect width="64" height="64" fill="#fc9838" stroke="#000000" stroke-width="3"/>
        <rect x="3" y="3" width="58" height="58" fill="url(#marioBrick)"/>
      </g>
      <!-- Bloque ? (Interrogación dorado con brillo y tornillos) -->
      <g transform="translate(388, 320)">
        <rect width="64" height="64" fill="#fcb040" stroke="#000000" stroke-width="3" rx="4"/>
        <rect x="4" y="4" width="56" height="56" fill="#fcd800" stroke="#e69c24" stroke-width="2" rx="3"/>
        <circle cx="9" cy="9" r="2.5" fill="#8d5a00"/>
        <circle cx="55" cy="9" r="2.5" fill="#8d5a00"/>
        <circle cx="9" cy="55" r="2.5" fill="#8d5a00"/>
        <circle cx="55" cy="55" r="2.5" fill="#8d5a00"/>
        <text x="32" y="48" font-family="'Impact', Arial Black, sans-serif" font-size="44" font-weight="bold" text-anchor="middle" fill="#8d5a00">?</text>
        <text x="31" y="46" font-family="'Impact', Arial Black, sans-serif" font-size="44" font-weight="bold" text-anchor="middle" fill="#ffffff">?</text>
      </g>
      <!-- Bloque ladrillo 2 -->
      <g transform="translate(456, 320)">
        <rect width="64" height="64" fill="#fc9838" stroke="#000000" stroke-width="3"/>
        <rect x="3" y="3" width="58" height="58" fill="url(#marioBrick)"/>
      </g>
      <!-- Bloque ? 2 -->
      <g transform="translate(524, 320)">
        <rect width="64" height="64" fill="#fcb040" stroke="#000000" stroke-width="3" rx="4"/>
        <rect x="4" y="4" width="56" height="56" fill="#fcd800" stroke="#e69c24" stroke-width="2" rx="3"/>
        <circle cx="9" cy="9" r="2.5" fill="#8d5a00"/>
        <circle cx="55" cy="9" r="2.5" fill="#8d5a00"/>
        <circle cx="9" cy="55" r="2.5" fill="#8d5a00"/>
        <circle cx="55" cy="55" r="2.5" fill="#8d5a00"/>
        <text x="32" y="48" font-family="'Impact', Arial Black, sans-serif" font-size="44" font-weight="bold" text-anchor="middle" fill="#8d5a00">?</text>
        <text x="31" y="46" font-family="'Impact', Arial Black, sans-serif" font-size="44" font-weight="bold" text-anchor="middle" fill="#ffffff">?</text>
      </g>

      <!-- Super Champiñón asomando en el bloque ? -->
      <g transform="translate(400, 275) scale(0.65)">
        <ellipse cx="32" cy="24" rx="28" ry="24" fill="#e52521" stroke="#000000" stroke-width="3"/>
        <circle cx="32" cy="18" r="9" fill="#ffffff"/>
        <ellipse cx="12" cy="24" rx="6" ry="8" fill="#ffffff"/>
        <ellipse cx="52" cy="24" rx="6" ry="8" fill="#ffffff"/>
        <rect x="18" y="38" width="28" height="20" rx="6" fill="#fce4b8" stroke="#000000" stroke-width="3"/>
        <ellipse cx="26" cy="46" rx="2" ry="5" fill="#000000"/>
        <ellipse cx="38" cy="46" rx="2" ry="5" fill="#000000"/>
      </g>

      <!-- Tubería Verde Icónica (Warp Pipe) a la derecha -->
      <g transform="translate(830, 430)">
        <rect x="-8" y="0" width="136" height="48" fill="#00a800" stroke="#000000" stroke-width="4" rx="3"/>
        <rect x="6" y="6" width="24" height="36" fill="#80e800"/>
        <rect x="106" y="6" width="16" height="36" fill="#006800"/>
        <rect x="6" y="48" width="108" height="130" fill="#00a800" stroke="#000000" stroke-width="4"/>
        <rect x="16" y="48" width="20" height="130" fill="#80e800"/>
        <rect x="94" y="48" width="16" height="130" fill="#006800"/>
      </g>

      <!-- Suelo de bloques de Mario clásico -->
      <rect x="0" y="570" width="1000" height="130" fill="url(#marioGround)" stroke="#000000" stroke-width="4"/>
      <rect x="0" y="570" width="1000" height="8" fill="#000000"/>
    </svg>`
  },
  {
    id: 'castillo',
    name: '🏰 Castillo Medieval',
    description: 'Fortaleza de piedra de ensueño con altas torres, murallas almenadas y banderas flameantes',
    imgPath: 'img/bg_castillo.jpg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
      <defs>
        <linearGradient id="castleSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a237e"/>
          <stop offset="40%" stop-color="#283593"/>
          <stop offset="75%" stop-color="#5c6bc0"/>
          <stop offset="100%" stop-color="#ffd54f"/>
        </linearGradient>
        <linearGradient id="stoneWall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#78909c"/>
          <stop offset="50%" stop-color="#90a4ae"/>
          <stop offset="100%" stop-color="#607d8b"/>
        </linearGradient>
        <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#d32f2f"/>
          <stop offset="100%" stop-color="#880e4f"/>
        </linearGradient>
        <linearGradient id="moatWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#00acc1"/>
          <stop offset="100%" stop-color="#006064"/>
        </linearGradient>
      </defs>
      <!-- Cielo crepuscular con sol poniente dorado -->
      <rect width="1000" height="700" fill="url(#castleSky)"/>
      <circle cx="500" cy="380" r="120" fill="#ffecb3" opacity="0.45"/>

      <!-- Montañas lejanas de fondo -->
      <polygon points="-50,500 200,320 450,500" fill="#3949ab" opacity="0.6"/>
      <polygon points="350,500 650,280 950,500" fill="#283593" opacity="0.5"/>
      <polygon points="650,500 850,340 1050,500" fill="#303f9f" opacity="0.7"/>

      <!-- Muralla y Castillo Medieval -->
      <!-- Muralla base conectora -->
      <rect x="180" y="320" width="640" height="180" fill="url(#stoneWall)" stroke="#37474f" stroke-width="3"/>
      <!-- Almenas muralla central -->
      <g fill="#78909c" stroke="#37474f" stroke-width="2">
        <rect x="200" y="295" width="30" height="25"/>
        <rect x="260" y="295" width="30" height="25"/>
        <rect x="320" y="295" width="30" height="25"/>
        <rect x="380" y="295" width="30" height="25"/>
        <rect x="590" y="295" width="30" height="25"/>
        <rect x="650" y="295" width="30" height="25"/>
        <rect x="710" y="295" width="30" height="25"/>
        <rect x="770" y="295" width="30" height="25"/>
      </g>

      <!-- Torre Homenaje Central (Alta) -->
      <g transform="translate(420, 160)">
        <rect x="0" y="60" width="160" height="280" fill="#78909c" stroke="#37474f" stroke-width="3"/>
        <rect x="-6" y="35" width="172" height="25" fill="#607d8b" stroke="#37474f" stroke-width="2"/>
        <rect x="0" y="15" width="26" height="20" fill="#607d8b"/>
        <rect x="44" y="15" width="26" height="20" fill="#607d8b"/>
        <rect x="90" y="15" width="26" height="20" fill="#607d8b"/>
        <rect x="134" y="15" width="26" height="20" fill="#607d8b"/>
        <!-- Gran Tejado Cónico Rojo/Púrpura -->
        <polygon points="80,-70 -10,35 170,35" fill="url(#roofGrad)" stroke="#4a148c" stroke-width="2"/>
        <!-- Asta y Bandera Dorada Real -->
        <line x1="80" y1="-70" x2="80" y2="-115" stroke="#ffd700" stroke-width="3"/>
        <polygon points="80,-115 130,-100 80,-85" fill="#ffd700" stroke="#f57f17" stroke-width="1.5"/>
        <!-- Gran Ventana gótica iluminada -->
        <path d="M 60 120 C 60 90, 100 90, 100 120 L 100 170 L 60 170 Z" fill="#fff59d" stroke="#37474f" stroke-width="2.5"/>
        <line x1="80" y1="95" x2="80" y2="170" stroke="#37474f" stroke-width="2"/>
        <line x1="60" y1="135" x2="100" y2="135" stroke="#37474f" stroke-width="2"/>
      </g>

      <!-- Torre Izquierda Redonda -->
      <g transform="translate(140, 210)">
        <rect x="0" y="40" width="110" height="290" fill="url(#stoneWall)" stroke="#37474f" stroke-width="3"/>
        <rect x="-6" y="25" width="122" height="18" fill="#607d8b" stroke="#37474f" stroke-width="2"/>
        <polygon points="55,-40 -5,25 115,25" fill="url(#roofGrad)" stroke="#4a148c" stroke-width="2"/>
        <line x1="55" y1="-40" x2="55" y2="-75" stroke="#795548" stroke-width="3"/>
        <polygon points="55,-75 95,-62 55,-50" fill="#e53935"/>
        <path d="M 40 80 C 40 60, 70 60, 70 80 L 70 120 L 40 120 Z" fill="#ffd54f" stroke="#37474f" stroke-width="2"/>
      </g>

      <!-- Torre Derecha Redonda -->
      <g transform="translate(750, 210)">
        <rect x="0" y="40" width="110" height="290" fill="url(#stoneWall)" stroke="#37474f" stroke-width="3"/>
        <rect x="-6" y="25" width="122" height="18" fill="#607d8b" stroke="#37474f" stroke-width="2"/>
        <polygon points="55,-40 -5,25 115,25" fill="url(#roofGrad)" stroke="#4a148c" stroke-width="2"/>
        <line x1="55" y1="-40" x2="55" y2="-75" stroke="#795548" stroke-width="3"/>
        <polygon points="55,-75 95,-62 55,-50" fill="#1e88e5"/>
        <path d="M 40 80 C 40 60, 70 60, 70 80 L 70 120 L 40 120 Z" fill="#ffd54f" stroke="#37474f" stroke-width="2"/>
      </g>

      <!-- Gran Puerta Levadiza y Rastrillo en el centro -->
      <g transform="translate(440, 370)">
        <path d="M 0 130 L 0 50 C 0 0, 120 0, 120 50 L 120 130 Z" fill="#37474f"/>
        <path d="M 8 130 L 8 52 C 8 12, 112 12, 112 52 L 112 130 Z" fill="#5d4037" stroke="#3e2723" stroke-width="2"/>
        <line x1="34" y1="30" x2="34" y2="130" stroke="#3e2723" stroke-width="2"/>
        <line x1="60" y1="20" x2="60" y2="130" stroke="#3e2723" stroke-width="2"/>
        <line x1="86" y1="30" x2="86" y2="130" stroke="#3e2723" stroke-width="2"/>
        <line x1="20" y1="40" x2="20" y2="130" stroke="#212121" stroke-width="3"/>
        <line x1="45" y1="25" x2="45" y2="130" stroke="#212121" stroke-width="3"/>
        <line x1="75" y1="25" x2="75" y2="130" stroke="#212121" stroke-width="3"/>
        <line x1="100" y1="40" x2="100" y2="130" stroke="#212121" stroke-width="3"/>
        <line x1="8" y1="70" x2="112" y2="70" stroke="#212121" stroke-width="3"/>
        <line x1="8" y1="100" x2="112" y2="100" stroke="#212121" stroke-width="3"/>
      </g>

      <!-- Antorchas medievales -->
      <g transform="translate(420, 420)">
        <rect x="0" y="10" width="8" height="25" rx="2" fill="#795548"/>
        <ellipse cx="4" cy="5" rx="7" ry="10" fill="#ff9800"/>
        <ellipse cx="4" cy="5" rx="4" ry="6" fill="#ffff00"/>
      </g>
      <g transform="translate(572, 420)">
        <rect x="0" y="10" width="8" height="25" rx="2" fill="#795548"/>
        <ellipse cx="4" cy="5" rx="7" ry="10" fill="#ff9800"/>
        <ellipse cx="4" cy="5" rx="4" ry="6" fill="#ffff00"/>
      </g>

      <!-- Foso de agua / Lago del castillo -->
      <path d="M 0 500 Q 500 480 1000 500 L 1000 590 L 0 590 Z" fill="url(#moatWater)"/>
      <polygon points="400,500 370,590 630,590 600,500" fill="#8d6e63" stroke="#4e342e" stroke-width="3"/>
      <line x1="420" y1="500" x2="400" y2="590" stroke="#5d4037" stroke-width="2"/>
      <line x1="580" y1="500" x2="600" y2="590" stroke="#5d4037" stroke-width="2"/>
      <line x1="400" y1="440" x2="380" y2="520" stroke="#212121" stroke-width="3" stroke-dasharray="4,4"/>
      <line x1="600" y1="440" x2="620" y2="520" stroke="#212121" stroke-width="3" stroke-dasharray="4,4"/>

      <!-- Colinas verdes y patio en primer plano -->
      <path d="M 0 580 Q 250 560 500 585 T 1000 570 L 1000 700 L 0 700 Z" fill="#388e3c"/>
      <path d="M 0 620 Q 500 590 1000 620 L 1000 700 L 0 700 Z" fill="#2e7d32"/>
      <circle cx="180" cy="640" r="7" fill="#e91e63"/><circle cx="180" cy="640" r="2.5" fill="#ffd54f"/>
      <circle cx="260" cy="660" r="8" fill="#ffd54f"/><circle cx="260" cy="660" r="3" fill="#ffffff"/>
      <circle cx="780" cy="650" r="8" fill="#ab47bc"/><circle cx="780" cy="650" r="3" fill="#ffd54f"/>
      <circle cx="860" cy="635" r="7" fill="#e91e63"/><circle cx="860" cy="635" r="2.5" fill="#ffd54f"/>
    </svg>`
  },
  {
    id: 'anime',
    name: '🌸 Paisaje Anime',
    description: 'Entorno poético estilo Studio Ghibli con cielo radiante, nubes de ensueño y cerezos en flor',
    imgPath: 'img/bg_anime.jpg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
      <defs>
        <linearGradient id="animeSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1976d2"/>
          <stop offset="35%" stop-color="#42a5f5"/>
          <stop offset="70%" stop-color="#90caf9"/>
          <stop offset="90%" stop-color="#e3f2fd"/>
          <stop offset="100%" stop-color="#fff8e1"/>
        </linearGradient>
        <linearGradient id="cloudShadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="70%" stop-color="#f3e5f5"/>
          <stop offset="100%" stop-color="#d1c4e9"/>
        </linearGradient>
        <linearGradient id="hillGreen1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#81c784"/>
          <stop offset="100%" stop-color="#43a047"/>
        </linearGradient>
        <linearGradient id="hillGreen2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#aed581"/>
          <stop offset="100%" stop-color="#689f38"/>
        </linearGradient>
        <radialGradient id="sunBloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
          <stop offset="40%" stop-color="#fff9c4" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- Cielo radiante -->
      <rect width="1000" height="700" fill="url(#animeSky)"/>

      <!-- Sol radiante con resplandor anime -->
      <circle cx="820" cy="110" r="130" fill="url(#sunBloom)"/>
      <circle cx="820" cy="110" r="38" fill="#ffffff"/>

      <!-- Nubes gigantes de ensueño (Cumulonimbos Ghibli) -->
      <g filter="drop-shadow(0 4px 8px rgba(100,100,160,0.15))">
        <path d="M 420 280 C 420 180, 500 120, 580 130 C 620 90, 710 80, 760 120 C 820 100, 910 130, 920 190 C 970 200, 1020 240, 1000 300 C 1020 360, 950 420, 880 410 L 440 410 C 390 410, 380 340, 420 280 Z" fill="url(#cloudShadow)"/>
        <circle cx="560" cy="180" r="55" fill="#ffffff"/>
        <circle cx="680" cy="150" r="65" fill="#ffffff"/>
        <circle cx="780" cy="170" r="60" fill="#ffffff"/>
        <circle cx="860" cy="210" r="50" fill="#ffffff"/>
        <circle cx="500" cy="240" r="60" fill="#ffffff"/>
        <circle cx="620" cy="230" r="70" fill="#ffffff"/>
        <circle cx="740" cy="240" r="75" fill="#ffffff"/>

        <path d="M-20 220 C -20 150, 60 130, 110 160 C 150 130, 220 130, 250 170 C 290 170, 330 200, 320 250 C 340 300, 290 350, 230 350 L -20 350 Z" fill="url(#cloudShadow)"/>
        <circle cx="90" cy="180" r="45" fill="#ffffff"/>
        <circle cx="180" cy="170" r="50" fill="#ffffff"/>
        <circle cx="260" cy="210" r="40" fill="#ffffff"/>
      </g>

      <!-- Pájaros lejanos volando en V hacia el sol -->
      <g stroke="#3949ab" stroke-width="2" fill="none" opacity="0.6">
        <path d="M 640 180 Q 646 173 652 180 Q 658 173 664 180"/>
        <path d="M 660 165 Q 665 159 670 165 Q 675 159 680 165"/>
        <path d="M 625 195 Q 630 190 635 195 Q 640 190 645 195"/>
      </g>

      <!-- Colinas verdes ondulantes estilo Studio Ghibli -->
      <path d="M-50 480 Q 300 370 650 440 T 1050 420 L 1050 720 L -50 720 Z" fill="url(#hillGreen1)"/>
      <g fill="#2e7d32" opacity="0.75">
        <circle cx="480" cy="420" r="22"/><circle cx="510" cy="415" r="26"/><circle cx="545" cy="422" r="20"/>
        <circle cx="680" cy="430" r="25"/><circle cx="715" cy="420" r="30"/><circle cx="750" cy="428" r="22"/>
      </g>

      <path d="M-50 530 Q 380 470 750 520 T 1050 500 L 1050 720 L -50 720 Z" fill="url(#hillGreen2)"/>

      <!-- Sendero campestre de tierra clara -->
      <path d="M 450 720 C 430 650, 480 580, 500 520 L 540 520 C 510 590, 520 650, 570 720 Z" fill="#d7ccc8" opacity="0.85"/>

      <!-- Valla rústica de madera en la colina -->
      <g stroke="#8d6e63" stroke-width="3" stroke-linecap="round">
        <line x1="580" y1="535" x2="580" y2="565"/><line x1="620" y1="538" x2="620" y2="568"/><line x1="660" y1="540" x2="660" y2="570"/>
        <line x1="575" y1="545" x2="665" y2="550"/>
        <line x1="575" y1="558" x2="665" y2="563"/>
      </g>

      <!-- Majestuoso Árbol de Cerezo (Sakura) a la izquierda -->
      <g>
        <path d="M 120 720 Q 140 580 90 440 Q 65 370 30 330" stroke="#5d4037" stroke-width="32" fill="none" stroke-linecap="round"/>
        <path d="M 90 440 Q 150 380 230 360" stroke="#5d4037" stroke-width="20" fill="none" stroke-linecap="round"/>
        <path d="M 115 480 Q 190 460 250 490" stroke="#6d4c41" stroke-width="14" fill="none" stroke-linecap="round"/>
        <path d="M 70 380 Q 20 330 0 310" stroke="#6d4c41" stroke-width="14" fill="none" stroke-linecap="round"/>
      </g>

      <!-- Frondosas flores rosadas de Sakura -->
      <g filter="drop-shadow(0 6px 12px rgba(233,30,99,0.25))">
        <!-- Capa sombra rosa intenso -->
        <circle cx="50" cy="300" r="75" fill="#f06292"/>
        <circle cx="130" cy="280" r="85" fill="#ec407a"/>
        <circle cx="210" cy="310" r="75" fill="#f06292"/>
        <circle cx="250" cy="380" r="65" fill="#e91e63"/>
        <circle cx="160" cy="370" r="70" fill="#ec407a"/>
        <circle cx="80" cy="380" r="70" fill="#e91e63"/>

        <!-- Capa intermedia rosa pastel -->
        <circle cx="40" cy="280" r="60" fill="#f8bbd0"/>
        <circle cx="110" cy="250" r="70" fill="#f48fb1"/>
        <circle cx="180" cy="260" r="65" fill="#f8bbd0"/>
        <circle cx="240" cy="330" r="55" fill="#f48fb1"/>
        <circle cx="150" cy="330" r="65" fill="#f8bbd0"/>
        <circle cx="70" cy="340" r="55" fill="#f48fb1"/>

        <!-- Capa brillante blanco-rosado -->
        <circle cx="90" cy="230" r="45" fill="#fce4ec"/>
        <circle cx="160" cy="240" r="48" fill="#ffffff" opacity="0.9"/>
        <circle cx="220" cy="290" r="40" fill="#fce4ec"/>
        <circle cx="130" cy="300" r="50" fill="#ffffff" opacity="0.85"/>
      </g>

      <!-- Pétalos de cerezo flotando en el aire (Viento de Sakura) -->
      <g fill="#ff80ab" opacity="0.85">
        <ellipse cx="280" cy="360" rx="8" ry="4" transform="rotate(35 280 360)"/>
        <ellipse cx="340" cy="320" rx="9" ry="4.5" transform="rotate(-20 340 320)"/>
        <ellipse cx="380" cy="390" rx="7" ry="3.5" transform="rotate(50 380 390)"/>
        <ellipse cx="440" cy="350" rx="8" ry="4" transform="rotate(-30 440 350)"/>
        <ellipse cx="490" cy="420" rx="9" ry="4" transform="rotate(25 490 420)"/>
        <ellipse cx="560" cy="370" rx="8" ry="4" transform="rotate(-15 560 370)"/>
        <ellipse cx="620" cy="450" rx="7" ry="3.5" transform="rotate(40 620 450)"/>
        <ellipse cx="700" cy="390" rx="8" ry="4" transform="rotate(-45 700 390)"/>
        <ellipse cx="760" cy="470" rx="9" ry="4" transform="rotate(15 760 470)"/>
        <ellipse cx="850" cy="430" rx="7" ry="3.5" transform="rotate(-25 850 430)"/>
        <ellipse cx="920" cy="490" rx="8" ry="4" transform="rotate(30 920 490)"/>
        <ellipse cx="260" cy="580" rx="10" ry="5" transform="rotate(45 260 580)"/>
        <ellipse cx="380" cy="630" rx="11" ry="5.5" transform="rotate(-35 380 630)"/>
        <ellipse cx="660" cy="620" rx="10" ry="5" transform="rotate(20 660 620)"/>
        <ellipse cx="780" cy="660" rx="9" ry="4.5" transform="rotate(-10 780 660)"/>
      </g>
    </svg>`
  }
];

// Helper para convertir el SVG en Data URL utilizable en Image() de HTML/Konva
function getBackgroundDataUrl(bgId) {
  const bg = BACKGROUNDS.find(b => b.id === bgId);
  if (!bg) return null;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(bg.svg);
}
