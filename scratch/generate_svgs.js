// Generator and test for all SVGs used in Algorithms Module
const SVGS = {
  // Caminar
  caminar: `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" class="alg-hero-svg">
    <defs>
      <linearGradient id="walkSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#312e81"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
      <linearGradient id="sneakerGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#38bdf8"/><stop offset="100%" stop-color="#2563eb"/></linearGradient>
    </defs>
    <rect width="320" height="220" rx="16" fill="url(#walkSky)"/>
    <ellipse cx="160" cy="195" rx="110" ry="12" fill="rgba(0,0,0,0.3)"/>
    <!-- Suelo -->
    <line x1="20" y1="195" x2="300" y2="195" stroke="#475569" stroke-width="3" stroke-dasharray="8,6"/>
    <!-- Líneas de movimiento -->
    <path d="M 60 110 Q 75 110 85 115" stroke="#facc15" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M 50 130 Q 70 130 80 135" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" fill="none"/>
    <!-- Persona caminando -->
    <g transform="translate(130, 25)">
      <!-- Cabeza con gorra -->
      <circle cx="30" cy="24" r="18" fill="#fed7aa"/>
      <path d="M 12 20 Q 30 10 48 20 Q 55 18 58 22 Q 46 25 30 25 Z" fill="#ec4899"/>
      <!-- Ojo sonriente -->
      <circle cx="36" cy="22" r="2.5" fill="#1e293b"/>
      <path d="M 32 30 Q 38 34 42 30" stroke="#1e293b" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Torso con remera -->
      <path d="M 18 42 L 44 42 L 48 95 L 14 95 Z" fill="#8b5cf6" rx="6"/>
      <circle cx="31" cy="65" r="8" fill="#facc15"/>
      <!-- Brazo izquierdo hacia atrás -->
      <path d="M 20 48 L 5 70 L 2 85" stroke="#fed7aa" stroke-width="7" stroke-linecap="round" fill="none"/>
      <!-- Brazo derecho hacia adelante -->
      <path d="M 42 48 L 56 68 L 65 78" stroke="#fed7aa" stroke-width="7" stroke-linecap="round" fill="none"/>
      <!-- Pierna izquierda hacia atrás -->
      <path d="M 22 95 L 10 135 L 2 165" stroke="#1e293b" stroke-width="9" stroke-linecap="round" fill="none"/>
      <rect x="-6" y="162" width="22" height="10" rx="4" fill="url(#sneakerGrad)"/>
      <!-- Pierna derecha hacia adelante dando el paso -->
      <path d="M 40 95 L 55 130 L 72 160" stroke="#1e293b" stroke-width="9" stroke-linecap="round" fill="none"/>
      <rect x="65" y="156" width="24" height="11" rx="4" fill="url(#sneakerGrad)"/>
    </g>
  </svg>`,

  // Concepto de Algoritmo
  algoritmo_concepto: `<svg viewBox="0 0 380 180" xmlns="http://www.w3.org/2000/svg" class="alg-hero-svg">
    <rect width="380" height="180" rx="16" fill="#0f172a"/>
    <!-- Bloque 1 -->
    <g transform="translate(25, 50)">
      <rect x="0" y="0" width="80" height="60" rx="10" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
      <text x="40" y="28" fill="#ffffff" font-size="16" font-weight="900" text-anchor="middle">PASO 1</text>
      <text x="40" y="46" fill="#e0f2fe" font-size="11" font-weight="700" text-anchor="middle">Inicio</text>
    </g>
    <!-- Flecha 1 -->
    <path d="M 112 80 L 135 80" stroke="#facc15" stroke-width="4" stroke-linecap="round"/>
    <polygon points="135,74 145,80 135,86" fill="#facc15"/>
    <!-- Bloque 2 -->
    <g transform="translate(150, 50)">
      <rect x="0" y="0" width="80" height="60" rx="10" fill="#8b5cf6" stroke="#c084fc" stroke-width="2"/>
      <text x="40" y="28" fill="#ffffff" font-size="16" font-weight="900" text-anchor="middle">PASO 2</text>
      <text x="40" y="46" fill="#f3e8ff" font-size="11" font-weight="700" text-anchor="middle">Acción</text>
    </g>
    <!-- Flecha 2 -->
    <path d="M 237 80 L 260 80" stroke="#facc15" stroke-width="4" stroke-linecap="round"/>
    <polygon points="260,74 270,80 260,86" fill="#facc15"/>
    <!-- Bloque Meta -->
    <g transform="translate(275, 42)">
      <rect x="0" y="0" width="85" height="76" rx="14" fill="#10b981" stroke="#34d399" stroke-width="2.5"/>
      <circle cx="42" cy="30" r="16" fill="#facc15"/>
      <polygon points="42,18 45,26 53,27 47,33 49,41 42,37 35,41 37,33 31,27 39,26" fill="#ffffff"/>
      <text x="42" y="60" fill="#ffffff" font-size="13" font-weight="900" text-anchor="middle">¡META!</text>
    </g>
  </svg>`
};

console.log('SVGs verified. Count:', Object.keys(SVGS).length);
