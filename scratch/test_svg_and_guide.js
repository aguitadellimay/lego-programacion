// Prototype SVGs for Bity Guide and Guests

function createBityGuideSvg(mood = 'idle') {
  const eyeColor = (mood === 'thinking') ? '#facc15' : (mood === 'alert') ? '#fb923c' : (mood === 'celebrating') ? '#4ade80' : '#38bdf8';
  return `
  <svg class="bity-mascot-svg mood-${mood}" viewBox="0 0 100 100" width="68" height="68" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bityBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8"/>
        <stop offset="50%" stop-color="#2563eb"/>
        <stop offset="100%" stop-color="#1e1b4b"/>
      </linearGradient>
      <linearGradient id="bityFaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#090d16"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
      <radialGradient id="antennaGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fef08a"/>
        <stop offset="70%" stop-color="#facc15"/>
        <stop offset="100%" stop-color="transparent"/>
      </radialGradient>
      <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- Aura mágica de Halloween espacial -->
    <ellipse cx="50" cy="54" rx="42" ry="38" fill="rgba(56, 189, 248, 0.12)" filter="url(#neonGlow)"/>

    <!-- Antena con esfera emisora -->
    <line x1="50" y1="24" x2="50" y2="10" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
    <!-- Anillos de señal electromagnética -->
    <circle class="antenna-wave wave-1" cx="50" cy="9" r="6" fill="none" stroke="#fde047" stroke-width="1.2" opacity="0.8"/>
    <circle class="antenna-wave wave-2" cx="50" cy="9" r="10" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.5"/>
    <circle cx="50" cy="9" r="4.5" fill="url(#antennaGlow)"/>

    <!-- Orejas / Comunicadores laterales -->
    <rect x="14" y="38" width="6" height="16" rx="3" fill="#64748b" stroke="#38bdf8" stroke-width="1.5"/>
    <rect x="80" y="38" width="6" height="16" rx="3" fill="#64748b" stroke="#38bdf8" stroke-width="1.5"/>
    <circle cx="17" cy="46" r="2" fill="#38bdf8"/>
    <circle cx="83" cy="46" r="2" fill="#38bdf8"/>

    <!-- Cabeza principal del Robot Bity -->
    <rect x="18" y="24" width="64" height="46" rx="14" fill="url(#bityBodyGrad)" stroke="#38bdf8" stroke-width="2.5"/>

    <!-- Pequeño sombrero mágico de Halloween (estilo brujito cósmico) -->
    <path d="M 28 25 Q 50 16 72 25 L 62 8 Q 50 3 44 7 Z" fill="#4c1d95" stroke="#a855f7" stroke-width="1.5"/>
    <circle cx="44" cy="7" r="2.5" fill="#facc15"/>
    <polygon points="50,14 52,18 56,18 53,20 54,24 50,21 46,24 47,20 44,18 48,18" fill="#fde047"/>

    <!-- Pantalla / Visor LED -->
    <rect x="24" y="32" width="52" height="30" rx="8" fill="url(#bityFaceGrad)" stroke="#1e293b" stroke-width="2"/>

    <!-- Ojos LED brillantes y expresivos -->
    ${mood === 'happy' || mood === 'celebrating' ? `
      <!-- Ojos curvados felices -->
      <path class="bity-eye-happy" d="M 33 48 Q 40 40 47 48" fill="none" stroke="${eyeColor}" stroke-width="3.5" stroke-linecap="round"/>
      <path class="bity-eye-happy" d="M 53 48 Q 60 40 67 48" fill="none" stroke="${eyeColor}" stroke-width="3.5" stroke-linecap="round"/>
    ` : mood === 'thinking' ? `
      <!-- Ojo reflexivo -->
      <circle class="bity-eye" cx="40" cy="46" r="4.5" fill="${eyeColor}" filter="url(#neonGlow)"/>
      <circle class="bity-eye" cx="60" cy="44" r="5.5" fill="${eyeColor}" filter="url(#neonGlow)"/>
      <line x1="34" y1="39" x2="45" y2="41" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
      <line x1="55" y1="38" x2="66" y2="41" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
    ` : `
      <!-- Ojos estándar con pestañeo -->
      <circle class="bity-eye left-eye" cx="40" cy="46" r="4.5" fill="${eyeColor}" filter="url(#neonGlow)"/>
      <circle class="bity-eye right-eye" cx="60" cy="46" r="4.5" fill="${eyeColor}" filter="url(#neonGlow)"/>
    `}

    <!-- Boca digital / LED -->
    ${mood === 'celebrating' || mood === 'happy' ? `
      <path d="M 44 56 Q 50 60 56 56" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
    ` : mood === 'thinking' ? `
      <line x1="46" y1="56" x2="54" y2="56" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
    ` : `
      <path d="M 45 56 Q 50 58 55 56" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round"/>
    `}

    <!-- Cuello conector -->
    <rect x="42" y="70" width="16" height="6" rx="2" fill="#334155"/>

    <!-- Cuerpo superior / Pecho robótico -->
    <path d="M 30 76 L 70 76 L 75 92 Q 75 96 70 96 L 30 96 Q 25 96 25 92 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
    <!-- Núcleo de energía estelar -->
    <circle class="bity-core" cx="50" cy="86" r="4.5" fill="#38bdf8" filter="url(#neonGlow)"/>
    <circle cx="50" cy="86" r="2" fill="#ffffff"/>
  </svg>
  `;
}

function createGhostGuestSvg() {
  return `
  <svg class="bity-mascot-svg guest-ghost" viewBox="0 0 100 100" width="68" height="68" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ghostGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="70%" stop-color="#e0f2fe"/>
        <stop offset="100%" stop-color="#93c5fd"/>
      </linearGradient>
      <filter id="ghostAura">
        <feGaussianBlur stdDeviation="3" result="glow"/>
        <feComposite in="SourceGraphic" in2="glow" operator="over"/>
      </filter>
    </defs>
    <!-- Aura brillante -->
    <path d="M 28 50 C 28 26 72 26 72 50 C 72 75 66 84 58 79 C 50 84 42 79 38 84 C 32 80 28 75 28 50 Z"
          fill="rgba(56, 189, 248, 0.25)" filter="url(#ghostAura)"/>
    <!-- Cuerpo del fantasma -->
    <path d="M 30 50 C 30 28 70 28 70 50 C 70 72 65 80 58 75 C 52 80 44 75 40 80 C 34 76 30 72 30 50 Z"
          fill="url(#ghostGrad)" stroke="#bae6fd" stroke-width="2"/>
    <!-- Ojos negros con brillo -->
    <ellipse cx="43" cy="46" rx="4" ry="5.5" fill="#0f172a"/>
    <ellipse cx="57" cy="46" rx="4" ry="5.5" fill="#0f172a"/>
    <circle cx="44.5" cy="44" r="1.5" fill="#ffffff"/>
    <circle cx="58.5" cy="44" r="1.5" fill="#ffffff"/>
    <!-- Sonrisa amigable -->
    <path d="M 46 56 Q 50 61 54 56" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Mejillas rosadas -->
    <ellipse cx="38" cy="53" rx="2.5" ry="1.5" fill="#f472b6" opacity="0.6"/>
    <ellipse cx="62" cy="53" rx="2.5" ry="1.5" fill="#f472b6" opacity="0.6"/>
  </svg>
  `;
}

function createVampireGuestSvg() {
  return `
  <svg class="bity-mascot-svg guest-vampire" viewBox="0 0 100 100" width="68" height="68" xmlns="http://www.w3.org/2000/svg">
    <!-- Capa de vampiro -->
    <path d="M 22 45 L 34 35 L 50 44 L 66 35 L 78 45 L 74 88 L 26 88 Z" fill="#581c87" stroke="#7e22ce" stroke-width="1.8"/>
    <!-- Cuello rojo vampiro -->
    <polygon points="34,35 50,52 38,58" fill="#dc2626"/>
    <polygon points="66,35 50,52 62,58" fill="#dc2626"/>
    <!-- Cabeza -->
    <circle cx="50" cy="48" r="18" fill="#fef08a" stroke="#d97706" stroke-width="1.5"/>
    <!-- Cabello con pico de viuda -->
    <path d="M 32 46 C 32 30 68 30 68 46 C 63 38 56 42 50 48 C 44 42 37 38 32 46 Z" fill="#18181b"/>
    <!-- Ojos -->
    <circle cx="44" cy="48" r="3.2" fill="#7f1d1d"/>
    <circle cx="56" cy="48" r="3.2" fill="#7f1d1d"/>
    <circle cx="45" cy="47" r="1.2" fill="#ffffff"/>
    <circle cx="57" cy="47" r="1.2" fill="#ffffff"/>
    <!-- Sonrisa amigable con colmillitos -->
    <path d="M 44 56 Q 50 61 56 56" fill="none" stroke="#18181b" stroke-width="2"/>
    <polygon points="46,57 47,60 48,57" fill="#ffffff"/>
    <polygon points="52,57 53,60 54,57" fill="#ffffff"/>
  </svg>
  `;
}

function createFrankensteinGuestSvg() {
  return `
  <svg class="bity-mascot-svg guest-frankie" viewBox="0 0 100 100" width="68" height="68" xmlns="http://www.w3.org/2000/svg">
    <!-- Tornillos en el cuello -->
    <rect x="20" y="58" width="10" height="5" rx="1.5" fill="#94a3b8"/>
    <rect x="70" y="58" width="10" height="5" rx="1.5" fill="#94a3b8"/>
    <!-- Cabeza verde cuadrada -->
    <rect x="28" y="28" width="44" height="46" rx="8" fill="#84cc16" stroke="#4d7c0f" stroke-width="2"/>
    <!-- Cabello negro en zigzag -->
    <path d="M 28 38 L 32 28 L 38 35 L 44 28 L 50 35 L 56 28 L 62 35 L 68 28 L 72 38 Z" fill="#1e293b"/>
    <!-- Cicatriz -->
    <line x1="33" y1="42" x2="40" y2="40" stroke="#365314" stroke-width="2"/>
    <line x1="35" y1="39" x2="35" y2="43" stroke="#365314" stroke-width="1.5"/>
    <line x1="38" y1="39" x2="38" y2="43" stroke="#365314" stroke-width="1.5"/>
    <!-- Ojos -->
    <circle cx="41" cy="50" r="4" fill="#ffffff" stroke="#1e293b" stroke-width="1.5"/>
    <circle cx="59" cy="50" r="4" fill="#ffffff" stroke="#1e293b" stroke-width="1.5"/>
    <circle cx="42" cy="50" r="2" fill="#0f172a"/>
    <circle cx="60" cy="50" r="2" fill="#0f172a"/>
    <!-- Sonrisa amigable -->
    <path d="M 43 62 Q 50 66 57 62" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
  </svg>
  `;
}

console.log('SVGs tested successfully');
console.log('Bity SVG length:', createBityGuideSvg().length);
console.log('Ghost SVG length:', createGhostGuestSvg().length);
console.log('Vampire SVG length:', createVampireGuestSvg().length);
console.log('Frankie SVG length:', createFrankensteinGuestSvg().length);
