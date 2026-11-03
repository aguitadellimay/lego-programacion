/**
 * ========================================================
 * ALGORITMOS — CLASE N.º 1: ¿QUÉ ES UN ALGORITMO?
 * Módulo de Pensamiento Computacional para 1.º a 5.º Grado
 * Informática Mágica — Edición Halloween
 * ========================================================
 */

(function (global) {
  'use strict';

  // ============================================================
  // 1. REPOSITORIO DE ILUSTRACIONES VECTORIALES SVG (ALTA CALIDAD)
  // ============================================================
  const ALGORITHM_SVGS = {
    // Escena conceptual de rutina diaria para Parte 1
    hero_routine: `
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" class="alg-svg-hero" aria-label="Rutina diaria de un niño">
        <defs>
          <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2e1065"/>
            <stop offset="100%" stop-color="#0f0728"/>
          </linearGradient>
          <linearGradient id="sunGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="100%" stop-color="#f59e0b"/>
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <rect width="400" height="240" rx="16" fill="url(#heroSky)"/>
        <!-- Estrellas y destellos de la mañana mágica -->
        <circle cx="50" cy="40" r="1.5" fill="#fde047"/>
        <circle cx="120" cy="30" r="2" fill="#ffffff"/>
        <circle cx="340" cy="45" r="1.8" fill="#fef08a"/>
        <circle cx="370" cy="80" r="1.2" fill="#ffffff"/>
        <!-- Sol naciente en la ventana -->
        <circle cx="80" cy="80" r="32" fill="url(#sunGlow)" filter="url(#softGlow)" opacity="0.85"/>
        <!-- Ventana de la habitación -->
        <rect x="50" y="50" width="60" height="70" rx="8" fill="none" stroke="#6b21a8" stroke-width="3"/>
        <line x1="80" y1="50" x2="80" y2="120" stroke="#6b21a8" stroke-width="2"/>
        <line x1="50" y1="85" x2="110" y2="85" stroke="#6b21a8" stroke-width="2"/>
        <!-- Reloj despertador marcando la hora de levantarse -->
        <circle cx="150" cy="170" r="18" fill="#38bdf8" stroke="#0284c7" stroke-width="2.5"/>
        <circle cx="150" cy="170" r="13" fill="#ffffff"/>
        <line x1="150" y1="170" x2="150" y2="162" stroke="#0f172a" stroke-width="2"/>
        <line x1="150" y1="170" x2="156" y2="170" stroke="#0f172a" stroke-width="2"/>
        <!-- Pasos conectados con flechas punteadas -->
        <!-- Paso A: Despertarse -->
        <g transform="translate(140, 105)">
          <circle cx="10" cy="10" r="12" fill="#8b5cf6"/>
          <text x="10" y="14" fill="#ffffff" font-size="11" font-weight="900" text-anchor="middle">1</text>
        </g>
        <path d="M 165 115 Q 190 95 215 115" stroke="#facc15" stroke-width="2.5" stroke-dasharray="4,4" fill="none"/>
        <!-- Paso B: Lavarse los dientes -->
        <g transform="translate(210, 105)">
          <circle cx="10" cy="10" r="12" fill="#38bdf8"/>
          <text x="10" y="14" fill="#ffffff" font-size="11" font-weight="900" text-anchor="middle">2</text>
        </g>
        <path d="M 235 115 Q 260 95 285 115" stroke="#facc15" stroke-width="2.5" stroke-dasharray="4,4" fill="none"/>
        <!-- Paso C: Preparar mochila -->
        <g transform="translate(280, 105)">
          <circle cx="10" cy="10" r="12" fill="#10b981"/>
          <text x="10" y="14" fill="#ffffff" font-size="11" font-weight="900" text-anchor="middle">3</text>
        </g>
        <!-- Niño sonriente en el centro -->
        <g transform="translate(220, 140)">
          <!-- Cuerpo / remera -->
          <rect x="-18" y="32" width="36" height="40" rx="8" fill="#f97316"/>
          <!-- Cuello -->
          <rect x="-6" y="24" width="12" height="10" fill="#fed7aa"/>
          <!-- Cabeza -->
          <circle cx="0" cy="12" r="18" fill="#fed7aa"/>
          <!-- Cabello castaño -->
          <path d="M -18 10 Q 0 -8 18 10 Q 14 0 0 -2 Q -14 0 -18 10 Z" fill="#78350f"/>
          <!-- Ojos alegres -->
          <circle cx="-6" cy="12" r="2.5" fill="#0f172a"/>
          <circle cx="6" cy="12" r="2.5" fill="#0f172a"/>
          <!-- Sonrisa -->
          <path d="M -6 18 Q 0 24 6 18" stroke="#dc2626" stroke-width="2" fill="none" stroke-linecap="round"/>
          <!-- Brazos con pulgar arriba -->
          <path d="M -18 40 Q -32 45 -28 32" stroke="#fed7aa" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M 18 40 Q 32 45 28 32" stroke="#fed7aa" stroke-width="5" fill="none" stroke-linecap="round"/>
        </g>
        <!-- Mochila lista al costado -->
        <rect x="330" y="165" width="34" height="42" rx="8" fill="#ec4899" stroke="#be185d" stroke-width="2"/>
        <rect x="336" y="180" width="22" height="18" rx="4" fill="#f472b6"/>
        <circle cx="347" cy="189" r="2.5" fill="#ffffff"/>
      </svg>
    `,

    // ==========================================
    // 7 PASOS: LAVARSE LOS DIENTES
    // ==========================================
    teeth_1_pick: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#1e1145" stroke="#38bdf8" stroke-width="2"/>
        <!-- Mano sosteniendo cepillo -->
        <rect x="25" y="42" width="50" height="8" rx="4" fill="#38bdf8" transform="rotate(-25 50 46)"/>
        <!-- Cerdas del cepillo -->
        <rect x="58" y="24" width="16" height="10" rx="2" fill="#ffffff" transform="rotate(-25 50 46)"/>
        <!-- Líneas de cerdas -->
        <line x1="61" y1="23" x2="61" y2="33" stroke="#0284c7" stroke-width="1.2" transform="rotate(-25 50 46)"/>
        <line x1="66" y1="23" x2="66" y2="33" stroke="#0284c7" stroke-width="1.2" transform="rotate(-25 50 46)"/>
        <line x1="71" y1="23" x2="71" y2="33" stroke="#0284c7" stroke-width="1.2" transform="rotate(-25 50 46)"/>
        <!-- Mano amigable -->
        <circle cx="36" cy="58" r="10" fill="#fed7aa"/>
        <rect x="30" y="52" width="12" height="18" rx="5" fill="#fed7aa"/>
        <text x="50" y="90" font-size="9" font-weight="800" fill="#fef08a" text-anchor="middle">1. TOMAR CEPILLO</text>
      </svg>
    `,
    teeth_2_paste: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#1e1145" stroke="#38bdf8" stroke-width="2"/>
        <!-- Cepillo en la base -->
        <rect x="20" y="60" width="54" height="7" rx="3.5" fill="#38bdf8"/>
        <rect x="52" y="52" width="18" height="8" rx="2" fill="#ffffff"/>
        <!-- Tubo de pasta dental inclinado -->
        <polygon points="28,26 62,34 58,46 24,38" fill="#10b981"/>
        <polygon points="24,38 28,26 22,29 20,35" fill="#059669"/>
        <rect x="61" y="36" width="6" height="6" fill="#ffffff" transform="rotate(12 64 39)"/>
        <!-- Porción de pasta saliendo hacia las cerdas -->
        <path d="M 66 41 Q 62 48 58 52" stroke="#60a5fa" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <circle cx="58" cy="51" r="3" fill="#93c5fd"/>
        <text x="50" y="90" font-size="9" font-weight="800" fill="#fef08a" text-anchor="middle">2. COLOCAR PASTA</text>
      </svg>
    `,
    teeth_3_wet: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#1e1145" stroke="#38bdf8" stroke-width="2"/>
        <!-- Canilla arriba -->
        <path d="M 40 18 L 54 18 L 54 28 L 46 28 L 46 32" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" fill="none"/>
        <!-- Gota de agua brillante cayendo -->
        <path d="M 50 38 C 47 43 45 47 45 50 C 45 54 48 57 52 57 C 56 57 59 54 59 50 C 59 47 55 43 50 38 Z" fill="#38bdf8"/>
        <!-- Cepillo con pasta abajo -->
        <rect x="22" y="66" width="52" height="7" rx="3.5" fill="#38bdf8"/>
        <rect x="42" y="59" width="18" height="7" rx="2" fill="#ffffff"/>
        <ellipse cx="51" cy="58" rx="7" ry="2.5" fill="#60a5fa"/>
        <!-- Salpicaduras de agua -->
        <circle cx="40" cy="52" r="1.5" fill="#38bdf8"/>
        <circle cx="62" cy="50" r="1.5" fill="#38bdf8"/>
        <text x="50" y="90" font-size="9" font-weight="800" fill="#fef08a" text-anchor="middle">3. MOJAR CEPILLO</text>
      </svg>
    `,
    teeth_4_brush: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#1e1145" stroke="#38bdf8" stroke-width="2"/>
        <!-- Sonrisa brillante cepillándose -->
        <ellipse cx="50" cy="48" rx="28" ry="18" fill="#fed7aa"/>
        <path d="M 30 48 Q 50 64 70 48 Q 50 56 30 48 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <!-- Dientes individuales -->
        <line x1="42" y1="49" x2="42" y2="54" stroke="#94a3b8" stroke-width="1.2"/>
        <line x1="50" y1="50" x2="50" y2="56" stroke="#94a3b8" stroke-width="1.2"/>
        <line x1="58" y1="49" x2="58" y2="54" stroke="#94a3b8" stroke-width="1.2"/>
        <!-- Espuma blanca y burbujas brillantes -->
        <circle cx="34" cy="44" r="5" fill="#ffffff" opacity="0.9"/>
        <circle cx="64" cy="44" r="5" fill="#ffffff" opacity="0.9"/>
        <circle cx="50" cy="42" r="6" fill="#ffffff" opacity="0.9"/>
        <!-- Cepillo en movimiento -->
        <rect x="42" y="34" width="38" height="6" rx="3" fill="#f43f5e" transform="rotate(-15 50 40)"/>
        <!-- Destello de limpieza -->
        <path d="M 68 28 L 70 34 L 76 36 L 70 38 L 68 44 L 66 38 L 60 36 L 66 34 Z" fill="#facc15"/>
        <text x="50" y="90" font-size="9" font-weight="800" fill="#fef08a" text-anchor="middle">4. CEPILLARSE</text>
      </svg>
    `,
    teeth_5_rinse: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#1e1145" stroke="#38bdf8" stroke-width="2"/>
        <!-- Vaso con agua limpia para enjuague -->
        <polygon points="34,30 66,30 60,68 40,68" fill="#38bdf8" opacity="0.4" stroke="#38bdf8" stroke-width="2"/>
        <!-- Nivel del agua dentro del vaso -->
        <polygon points="36,42 64,42 59,66 41,66" fill="#0284c7" opacity="0.65"/>
        <ellipse cx="50" cy="42" rx="14" ry="3" fill="#7dd3fc"/>
        <!-- Burbujas de agua fresca -->
        <circle cx="48" cy="50" r="2.5" fill="#ffffff" opacity="0.8"/>
        <circle cx="54" cy="56" r="2" fill="#ffffff" opacity="0.8"/>
        <circle cx="45" cy="59" r="1.5" fill="#ffffff" opacity="0.8"/>
        <!-- Gotitas salpicando frescura -->
        <circle cx="28" cy="36" r="2" fill="#38bdf8"/>
        <circle cx="72" cy="38" r="2" fill="#38bdf8"/>
        <text x="50" y="90" font-size="9" font-weight="800" fill="#fef08a" text-anchor="middle">5. ENJUAGARSE BOCA</text>
      </svg>
    `,
    teeth_6_wash: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#1e1145" stroke="#38bdf8" stroke-width="2"/>
        <!-- Canilla de baño abierta -->
        <path d="M 40 18 L 54 18 L 54 26 L 46 26 L 46 30" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round" fill="none"/>
        <!-- Chorro de agua constante -->
        <rect x="47" y="30" width="6" height="28" rx="3" fill="#38bdf8" opacity="0.75"/>
        <!-- Cepillo pasando bajo el chorro de agua -->
        <rect x="24" y="52" width="52" height="7" rx="3.5" fill="#38bdf8"/>
        <rect x="42" y="45" width="18" height="7" rx="2" fill="#ffffff"/>
        <!-- Espuma cayendo lavada -->
        <circle cx="46" cy="62" r="3" fill="#ffffff" opacity="0.7"/>
        <circle cx="54" cy="64" r="2.5" fill="#ffffff" opacity="0.7"/>
        <text x="50" y="90" font-size="9" font-weight="800" fill="#fef08a" text-anchor="middle">6. LAVAR CEPILLO</text>
      </svg>
    `,
    teeth_7_store: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#1e1145" stroke="#38bdf8" stroke-width="2"/>
        <!-- Vaso portacepillos -->
        <rect x="36" y="48" width="28" height="26" rx="6" fill="#8b5cf6" stroke="#c084fc" stroke-width="2"/>
        <!-- Cepillo guardado en posición vertical -->
        <rect x="47" y="24" width="6" height="40" rx="3" fill="#38bdf8"/>
        <rect x="44" y="16" width="12" height="8" rx="2" fill="#ffffff"/>
        <!-- Estrellita de orden y limpieza -->
        <path d="M 68 24 L 70 29 L 75 30 L 71 33 L 72 38 L 68 35 L 64 38 L 65 33 L 61 30 L 66 29 Z" fill="#facc15"/>
        <text x="50" y="90" font-size="9" font-weight="800" fill="#fef08a" text-anchor="middle">7. GUARDAR CEPILLO</text>
      </svg>
    `,

    // ==========================================
    // 7 PASOS: LAVARSE LAS MANOS (ACTIVIDAD 1)
    // ==========================================
    hands_1_tap_open: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#171038" stroke="#10b981" stroke-width="2"/>
        <!-- Canilla de agua metálica -->
        <path d="M 32 30 L 52 30 L 52 44 L 44 44 L 44 50" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" fill="none"/>
        <!-- Manija con flecha de giro abriendo -->
        <circle cx="42" cy="22" r="7" fill="#64748b"/>
        <path d="M 36 16 Q 44 12 50 16" stroke="#facc15" stroke-width="2" fill="none" stroke-linecap="round"/>
        <polygon points="50,14 52,19 47,18" fill="#facc15"/>
        <!-- Gotas de agua empezando a salir -->
        <circle cx="44" cy="58" r="2.5" fill="#38bdf8"/>
        <circle cx="44" cy="66" r="3" fill="#38bdf8"/>
        <text x="50" y="88" font-size="8.5" font-weight="800" fill="#a7f3d0" text-anchor="middle">1. ABRIR CANILLA</text>
      </svg>
    `,
    hands_2_wet: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#171038" stroke="#10b981" stroke-width="2"/>
        <!-- Chorro de agua cayendo -->
        <rect x="47" y="16" width="6" height="34" rx="3" fill="#38bdf8" opacity="0.8"/>
        <!-- Manos colocadas bajo el agua mojándose -->
        <circle cx="42" cy="54" r="10" fill="#fed7aa"/>
        <circle cx="58" cy="54" r="10" fill="#fed7aa"/>
        <rect x="36" y="52" width="12" height="16" rx="5" fill="#fed7aa"/>
        <rect x="52" y="52" width="12" height="16" rx="5" fill="#fed7aa"/>
        <!-- Salpicaduras de agua fresca -->
        <circle cx="34" cy="46" r="2" fill="#38bdf8"/>
        <circle cx="66" cy="46" r="2" fill="#38bdf8"/>
        <text x="50" y="88" font-size="8.5" font-weight="800" fill="#a7f3d0" text-anchor="middle">2. MOJARSE MANOS</text>
      </svg>
    `,
    hands_3_soap: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#171038" stroke="#10b981" stroke-width="2"/>
        <!-- Dispensador de jabón líquido -->
        <rect x="40" y="24" width="20" height="28" rx="5" fill="#ec4899" stroke="#be185d" stroke-width="1.5"/>
        <rect x="46" y="16" width="8" height="8" fill="#cbd5e1"/>
        <path d="M 44 16 L 36 16 L 36 20" stroke="#cbd5e1" stroke-width="2.5" fill="none"/>
        <!-- Gota espumosa de jabón cayendo en la mano -->
        <path d="M 36 24 C 34 28 32 30 32 33 C 32 36 34 38 37 38 C 40 38 42 36 42 33 C 42 30 39 28 36 24 Z" fill="#f472b6"/>
        <!-- Mano abierta recibiendo el jabón -->
        <ellipse cx="46" cy="60" rx="18" ry="10" fill="#fed7aa"/>
        <circle cx="38" cy="58" r="4" fill="#f472b6" opacity="0.8"/>
        <text x="50" y="88" font-size="8.5" font-weight="800" fill="#a7f3d0" text-anchor="middle">3. COLOCAR JABÓN</text>
      </svg>
    `,
    hands_4_rub: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#171038" stroke="#10b981" stroke-width="2"/>
        <!-- Manos frotándose con abundante espuma -->
        <circle cx="44" cy="46" r="12" fill="#fed7aa"/>
        <circle cx="56" cy="46" r="12" fill="#fed7aa"/>
        <!-- Muchas burbujas de espuma limpiadora -->
        <circle cx="50" cy="42" r="7" fill="#ffffff" opacity="0.95"/>
        <circle cx="42" cy="38" r="5" fill="#ffffff" opacity="0.9"/>
        <circle cx="58" cy="38" r="5" fill="#ffffff" opacity="0.9"/>
        <circle cx="50" cy="52" r="6" fill="#ffffff" opacity="0.9"/>
        <circle cx="36" cy="48" r="4" fill="#ffffff" opacity="0.8"/>
        <circle cx="64" cy="48" r="4" fill="#ffffff" opacity="0.8"/>
        <!-- Chispas mágicas de limpieza -->
        <path d="M 30 30 L 32 34 L 36 35 L 32 37 L 30 41 L 28 37 L 24 35 L 28 34 Z" fill="#facc15"/>
        <text x="50" y="88" font-size="8.5" font-weight="800" fill="#a7f3d0" text-anchor="middle">4. FROTARSE MANOS</text>
      </svg>
    `,
    hands_5_rinse: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#171038" stroke="#10b981" stroke-width="2"/>
        <!-- Chorro abundante de agua limpia -->
        <path d="M 44 14 L 56 14 L 54 44 L 46 44 Z" fill="#38bdf8" opacity="0.85"/>
        <!-- Manos bajo el agua enjuagando la espuma -->
        <circle cx="42" cy="52" r="11" fill="#fed7aa"/>
        <circle cx="58" cy="52" r="11" fill="#fed7aa"/>
        <!-- Burbujas siendo arrastradas por el agua -->
        <circle cx="38" cy="64" r="3" fill="#ffffff" opacity="0.7"/>
        <circle cx="50" cy="66" r="3.5" fill="#ffffff" opacity="0.7"/>
        <circle cx="62" cy="64" r="3" fill="#ffffff" opacity="0.7"/>
        <text x="50" y="88" font-size="8.5" font-weight="800" fill="#a7f3d0" text-anchor="middle">5. ENJUAGARSE</text>
      </svg>
    `,
    hands_6_tap_close: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#171038" stroke="#10b981" stroke-width="2"/>
        <!-- Canilla cerrada (sin agua cayendo) -->
        <path d="M 34 32 L 52 32 L 52 46 L 46 46 L 46 50" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" fill="none"/>
        <!-- Mano cerrando la manija -->
        <circle cx="44" cy="24" r="7" fill="#64748b"/>
        <ellipse cx="44" cy="20" rx="9" ry="6" fill="#fed7aa"/>
        <!-- Flecha de cierre completado -->
        <path d="M 54 26 Q 48 20 40 22" stroke="#34d399" stroke-width="2" fill="none" stroke-linecap="round"/>
        <!-- Cero gotas (ahorro de agua responsable) -->
        <circle cx="46" cy="60" r="1.5" fill="#38bdf8" opacity="0.3"/>
        <text x="50" y="88" font-size="8.5" font-weight="800" fill="#a7f3d0" text-anchor="middle">6. CERRAR CANILLA</text>
      </svg>
    `,
    hands_7_dry: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#171038" stroke="#10b981" stroke-width="2"/>
        <!-- Toalla limpia y suave colgada -->
        <rect x="36" y="24" width="28" height="38" rx="6" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
        <line x1="36" y1="56" x2="64" y2="56" stroke="#fef08a" stroke-width="2"/>
        <!-- Manos secándose felices -->
        <circle cx="44" cy="44" r="7" fill="#fed7aa"/>
        <circle cx="56" cy="44" r="7" fill="#fed7aa"/>
        <!-- Destello de manos limpias e impecables -->
        <path d="M 68 22 L 70 26 L 74 27 L 70 29 L 68 33 L 66 29 L 62 27 L 66 26 Z" fill="#facc15"/>
        <text x="50" y="88" font-size="8.5" font-weight="800" fill="#a7f3d0" text-anchor="middle">7. SECARSE MANOS</text>
      </svg>
    `,

    // ==========================================
    // 7 PASOS: PREPARAR UN PASTEL (ACTIVIDAD 2)
    // ==========================================
    cake_1_ingredients: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#1c0f2e" stroke="#f59e0b" stroke-width="2"/>
        <!-- Mesa de cocina -->
        <rect x="18" y="68" width="64" height="6" rx="3" fill="#78350f"/>
        <!-- Paquete de harina -->
        <rect x="24" y="42" width="16" height="26" rx="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
        <rect x="27" y="52" width="10" height="8" rx="1" fill="#fde047"/>
        <!-- Botella de leche -->
        <rect x="44" y="38" width="12" height="30" rx="3" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.5"/>
        <!-- Huevos -->
        <ellipse cx="62" cy="62" rx="5" ry="6" fill="#fed7aa"/>
        <ellipse cx="70" cy="62" rx="5" ry="6" fill="#fed7aa"/>
        <!-- Tazón grande -->
        <ellipse cx="50" cy="62" rx="14" ry="7" fill="#8b5cf6" opacity="0.6"/>
        <text x="50" y="88" font-size="8.5" font-weight="800" fill="#fef08a" text-anchor="middle">1. INGREDIENTES</text>
      </svg>
    `,
    cake_2_pour: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#1c0f2e" stroke="#f59e0b" stroke-width="2"/>
        <!-- Tazón hondo en la base -->
        <path d="M 28 54 Q 50 82 72 54 Z" fill="#8b5cf6" stroke="#c084fc" stroke-width="2"/>
        <ellipse cx="50" cy="54" rx="22" ry="7" fill="#6d28d9"/>
        <!-- Jarra inclinada vertiendo leche/harina -->
        <polygon points="40,24 64,18 68,32 44,38" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.5"/>
        <!-- Flujo cayendo hacia el tazón -->
        <path d="M 44 38 Q 48 48 50 54" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none"/>
        <ellipse cx="50" cy="56" rx="10" ry="3.5" fill="#fef08a"/>
        <text x="50" y="88" font-size="8.5" font-weight="800" fill="#fef08a" text-anchor="middle">2. COLOCAR EN TAZÓN</text>
      </svg>
    `,
    cake_3_mix: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#1c0f2e" stroke="#f59e0b" stroke-width="2"/>
        <!-- Tazón con mezcla -->
        <path d="M 28 52 Q 50 80 72 52 Z" fill="#8b5cf6" stroke="#c084fc" stroke-width="2"/>
        <ellipse cx="50" cy="52" rx="22" ry="7" fill="#fef08a"/>
        <!-- Remolino de mezcla -->
        <path d="M 40 52 Q 50 48 60 52 Q 50 56 42 53" stroke="#f59e0b" stroke-width="2" fill="none"/>
        <!-- Batidor de alambre inclinado batiendo -->
        <rect x="52" y="20" width="4" height="26" rx="2" fill="#cbd5e1" transform="rotate(-20 54 33)"/>
        <ellipse cx="48" cy="46" rx="8" ry="12" fill="none" stroke="#94a3b8" stroke-width="1.8" transform="rotate(-20 54 33)"/>
        <text x="50" y="88" font-size="8.5" font-weight="800" fill="#fef08a" text-anchor="middle">3. MEZCLAR</text>
      </svg>
    `,
    cake_4_mold: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#1c0f2e" stroke="#f59e0b" stroke-width="2"/>
        <!-- Molde para torta en la base -->
        <rect x="30" y="52" width="40" height="18" rx="4" fill="#64748b" stroke="#94a3b8" stroke-width="2"/>
        <ellipse cx="50" cy="52" rx="20" ry="5" fill="#475569"/>
        <!-- Mezcla cayendo cremosa -->
        <path d="M 44 30 Q 48 44 50 52" stroke="#fde047" stroke-width="6" stroke-linecap="round" fill="none"/>
        <!-- Masa llenando el molde -->
        <ellipse cx="50" cy="55" rx="16" ry="4" fill="#fef08a"/>
        <!-- Tazón inclinado arriba -->
        <path d="M 32 20 Q 46 36 58 24 Z" fill="#8b5cf6"/>
        <text x="50" y="88" font-size="8.5" font-weight="800" fill="#fef08a" text-anchor="middle">4. PASAR AL MOLDE</text>
      </svg>
    `,
    cake_5_oven: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#1c0f2e" stroke="#f97316" stroke-width="2"/>
        <!-- Horno de cocina -->
        <rect x="25" y="24" width="50" height="48" rx="6" fill="#334155" stroke="#ea580c" stroke-width="2"/>
        <!-- Ventana de vidrio del horno con luz cálida -->
        <rect x="32" y="32" width="36" height="24" rx="4" fill="#ea580c" opacity="0.85"/>
        <!-- Molde adentro horneándose -->
        <rect x="40" y="44" width="20" height="8" rx="2" fill="#78350f"/>
        <!-- Guante térmico de cocina (¡Solo adultos!) -->
        <path d="M 16 38 C 16 32 24 32 24 38 L 24 50 L 16 50 Z" fill="#ef4444" stroke="#ffffff" stroke-width="1.2"/>
        <!-- Escudo de seguridad para adultos -->
        <circle cx="74" cy="24" r="9" fill="#f97316"/>
        <text x="74" y="27" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">👨‍🍳</text>
        <text x="50" y="88" font-size="8" font-weight="900" fill="#fed7aa" text-anchor="middle">5. ADULTO AL HORNO</text>
      </svg>
    `,
    cake_6_cool: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#1c0f2e" stroke="#f59e0b" stroke-width="2"/>
        <!-- Rejilla metálica de enfriamiento -->
        <line x1="24" y1="62" x2="76" y2="62" stroke="#94a3b8" stroke-width="2"/>
        <line x1="28" y1="62" x2="28" y2="68" stroke="#94a3b8" stroke-width="2"/>
        <line x1="72" y1="62" x2="72" y2="68" stroke="#94a3b8" stroke-width="2"/>
        <!-- Pastel horneado y esponjoso -->
        <rect x="32" y="44" width="36" height="18" rx="5" fill="#b45309" stroke="#d97706" stroke-width="2"/>
        <ellipse cx="50" cy="44" rx="18" ry="5" fill="#d97706"/>
        <!-- Ondas de vapor suave indicando que se enfría -->
        <path d="M 42 36 Q 40 30 42 24" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.75"/>
        <path d="M 50 34 Q 52 28 50 22" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.75"/>
        <path d="M 58 36 Q 56 30 58 24" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.75"/>
        <text x="50" y="88" font-size="8.5" font-weight="800" fill="#fef08a" text-anchor="middle">6. ENFRIAR PASTEL</text>
      </svg>
    `,
    cake_7_serve: `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#1c0f2e" stroke="#f59e0b" stroke-width="2"/>
        <!-- Plato elegante -->
        <ellipse cx="50" cy="62" rx="28" ry="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <!-- Porción triangular de pastel decorada -->
        <polygon points="34,58 66,58 58,38 34,44" fill="#ea580c"/>
        <polygon points="34,44 58,38 52,32 30,36" fill="#fbbf24"/>
        <rect x="34" y="50" width="28" height="3" fill="#ffffff"/>
        <!-- Frutilla o cereza en la cima -->
        <circle cx="48" cy="30" r="4.5" fill="#ef4444"/>
        <path d="M 48 26 Q 52 22 56 24" stroke="#15803d" stroke-width="1.8" fill="none"/>
        <!-- Destellos de fiesta -->
        <path d="M 68 28 L 70 32 L 74 33 L 70 35 L 68 39 L 66 35 L 62 33 L 66 32 Z" fill="#facc15"/>
        <text x="50" y="88" font-size="8.5" font-weight="800" fill="#fef08a" text-anchor="middle">7. SERVIR PASTEL</text>
      </svg>
    `,

    // ==========================================
    // ACTIVIDAD 3: OPCIONES PARA CREAR ALGORITMO
    // ==========================================
    act3_bed: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="100" rx="14" fill="#171038" stroke="#a855f7" stroke-width="1.5"/>
        <!-- Cama ordenada con sábanas prolijas -->
        <rect x="25" y="38" width="70" height="42" rx="6" fill="#3b82f6"/>
        <rect x="25" y="52" width="70" height="28" rx="4" fill="#93c5fd"/>
        <!-- Almohada esponjosa -->
        <rect x="32" y="42" width="22" height="12" rx="3" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
        <rect x="64" y="42" width="22" height="12" rx="3" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
        <!-- Respaldo de madera -->
        <rect x="21" y="28" width="78" height="12" rx="3" fill="#78350f"/>
        <!-- Estrellita mágica de orden -->
        <path d="M 92 18 L 94 22 L 98 23 L 94 25 L 92 29 L 90 25 L 86 23 L 90 22 Z" fill="#facc15"/>
      </svg>
    `,
    act3_juice: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="100" rx="14" fill="#171038" stroke="#a855f7" stroke-width="1.5"/>
        <!-- Jarra de jugo de naranja -->
        <path d="M 34 32 L 60 32 L 64 68 L 30 68 Z" fill="#fb923c" opacity="0.85" stroke="#ea580c" stroke-width="2"/>
        <path d="M 60 38 Q 72 48 62 60" stroke="#ea580c" stroke-width="3" fill="none"/>
        <!-- Vaso servido al lado -->
        <polygon points="76,44 94,44 90,70 80,70" fill="#fed7aa" stroke="#f97316" stroke-width="1.5"/>
        <polygon points="78,52 92,52 89,68 81,68" fill="#ea580c"/>
        <line x1="86" y1="36" x2="84" y2="68" stroke="#f43f5e" stroke-width="2"/>
        <!-- Rodaja de naranja decorativa -->
        <circle cx="28" cy="70" r="10" fill="#ea580c"/>
        <circle cx="28" cy="70" r="8" fill="#fdba74"/>
      </svg>
    `,
    act3_choco: `
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="100" rx="14" fill="#171038" stroke="#a855f7" stroke-width="1.5"/>
        <!-- Vaso de leche fresca -->
        <polygon points="40,32 64,32 60,68 44,68" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
        <polygon points="42,42 62,42 59,66 45,66" fill="#f8fafc"/>
        <!-- Cuchara mezclando cacao -->
        <line x1="56" y1="20" x2="52" y2="48" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="51" cy="48" rx="4" ry="2" fill="#78350f"/>
        <!-- Remolino chocolatoso -->
        <ellipse cx="52" cy="44" rx="8" ry="3" fill="#92400e"/>
        <!-- Frasco de cacao al lado -->
        <rect x="74" y="44" width="22" height="26" rx="4" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
        <rect x="76" y="38" width="18" height="6" rx="2" fill="#d97706"/>
        <rect x="77" y="52" width="16" height="10" rx="2" fill="#fde047"/>
      </svg>
    `
  };

  // ============================================================
  // 2. GENERADOR DE AVATAR BITY GUÍA
  // ============================================================
  function getBitySvg(mood = 'idle') {
    const eyeColor = (mood === 'thinking') ? '#facc15' : (mood === 'alert') ? '#fb923c' : (mood === 'celebrating') ? '#4ade80' : '#38bdf8';
    return `
    <svg class="bity-mascot-svg mood-${mood}" viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bityAlgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="50%" stop-color="#2563eb"/>
          <stop offset="100%" stop-color="#1e1b4b"/>
        </linearGradient>
        <linearGradient id="bityFaceAlgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#090d16"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
        <radialGradient id="antennaAlgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="70%" stop-color="#facc15"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
      </defs>
      <!-- Aura suave -->
      <ellipse cx="50" cy="54" rx="42" ry="38" fill="rgba(56, 189, 248, 0.15)"/>
      <!-- Antena -->
      <line x1="50" y1="24" x2="50" y2="10" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
      <circle cx="50" cy="9" r="4.5" fill="url(#antennaAlgGlow)"/>
      <!-- Orejas comunicadoras -->
      <rect x="14" y="38" width="6" height="16" rx="3" fill="#64748b" stroke="#38bdf8" stroke-width="1.5"/>
      <rect x="80" y="38" width="6" height="16" rx="3" fill="#64748b" stroke="#38bdf8" stroke-width="1.5"/>
      <!-- Cabeza Bity -->
      <rect x="18" y="24" width="64" height="46" rx="14" fill="url(#bityAlgGrad)" stroke="#38bdf8" stroke-width="2.5"/>
      <!-- Sombrerito de mago espacial -->
      <path d="M 28 25 Q 50 16 72 25 L 62 8 Q 50 3 44 7 Z" fill="#4c1d95" stroke="#a855f7" stroke-width="1.5"/>
      <circle cx="44" cy="7" r="2.5" fill="#facc15"/>
      <!-- Visor LED -->
      <rect x="24" y="32" width="52" height="30" rx="8" fill="url(#bityFaceAlgGrad)" stroke="#1e293b" stroke-width="2"/>
      <!-- Ojos LED -->
      ${mood === 'happy' || mood === 'celebrating' ? `
        <path d="M 33 48 Q 40 40 47 48" fill="none" stroke="${eyeColor}" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M 53 48 Q 60 40 67 48" fill="none" stroke="${eyeColor}" stroke-width="3.5" stroke-linecap="round"/>
      ` : mood === 'thinking' ? `
        <circle cx="40" cy="46" r="4.5" fill="${eyeColor}"/>
        <circle cx="60" cy="44" r="5.5" fill="${eyeColor}"/>
        <line x1="34" y1="39" x2="45" y2="41" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
      ` : `
        <circle cx="40" cy="46" r="4.5" fill="${eyeColor}"/>
        <circle cx="60" cy="46" r="4.5" fill="${eyeColor}"/>
      `}
      <!-- Boca -->
      ${mood === 'celebrating' || mood === 'happy' ? `
        <path d="M 44 56 Q 50 60 56 56" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
      ` : `
        <line x1="46" y1="56" x2="54" y2="56" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
      `}
    </svg>`;
  }

  // ============================================================
  // 3. SECUENCIAS DIDÁCTICAS ESTÁNDAR
  // ============================================================
  const TEETH_SEQUENCE = [
    { id: 1, title: 'TOMAR EL CEPILLO DE DIENTES', svgKey: 'teeth_1_pick' },
    { id: 2, title: 'COLOCAR PASTA DENTAL EN EL CEPILLO', svgKey: 'teeth_2_paste' },
    { id: 3, title: 'MOJAR EL CEPILLO', svgKey: 'teeth_3_wet' },
    { id: 4, title: 'CEPILLARSE LOS DIENTES', svgKey: 'teeth_4_brush' },
    { id: 5, title: 'ENJUAGARSE LA BOCA', svgKey: 'teeth_5_rinse' },
    { id: 6, title: 'LAVAR EL CEPILLO', svgKey: 'teeth_6_wash' },
    { id: 7, title: 'GUARDAR EL CEPILLO', svgKey: 'teeth_7_store' }
  ];

  const HANDS_SEQUENCE = [
    { id: 1, title: 'ABRIR LA CANILLA', svgKey: 'hands_1_tap_open' },
    { id: 2, title: 'MOJARSE LAS MANOS', svgKey: 'hands_2_wet' },
    { id: 3, title: 'COLOCAR JABÓN', svgKey: 'hands_3_soap' },
    { id: 4, title: 'FROTARSE LAS MANOS', svgKey: 'hands_4_rub' },
    { id: 5, title: 'ENJUAGARSE CON AGUA', svgKey: 'hands_5_rinse' },
    { id: 6, title: 'CERRAR LA CANILLA', svgKey: 'hands_6_tap_close' },
    { id: 7, title: 'SECARSE LAS MANOS', svgKey: 'hands_7_dry' }
  ];

  const CAKE_SEQUENCE = [
    { id: 1, title: 'BUSCAR LOS INGREDIENTES Y UTENSILIOS', svgKey: 'cake_1_ingredients' },
    { id: 2, title: 'COLOCAR LOS INGREDIENTES EN UN RECIPIENTE', svgKey: 'cake_2_pour' },
    { id: 3, title: 'MEZCLAR LOS INGREDIENTES', svgKey: 'cake_3_mix' },
    { id: 4, title: 'COLOCAR LA MEZCLA EN UN MOLDE', svgKey: 'cake_4_mold' },
    { id: 5, title: 'PEDIR A UN ADULTO QUE HORNEE EL PASTEL', svgKey: 'cake_5_oven', isAdultSafety: true },
    { id: 6, title: 'ESPERAR A QUE SE ENFRÍE', svgKey: 'cake_6_cool' },
    { id: 7, title: 'SERVIR EL PASTEL', svgKey: 'cake_7_serve' }
  ];

  const ACT3_CONFIG = {
    bed: {
      id: 'bed',
      name: 'TENDER LA CAMA',
      svgKey: 'act3_bed',
      tip: 'Pensá qué hacés primero con las sábanas, las frazadas y las almohadas.',
      defaultSteps: [
        'ESTIRAR LA SÁBANA DE ABAJO',
        'ACOMODAR LA FRAZADA O CUBRECAMA',
        'COLOCAR LA ALMOHADA EN LA CABECERA'
      ]
    },
    juice: {
      id: 'juice',
      name: 'PREPARAR UN JUGO',
      svgKey: 'act3_juice',
      tip: 'Pensá en exprimir o buscar el jugo, verter agua, mezclar y servir.',
      defaultSteps: [
        'BUSCAR UNA JARRA Y FRUTAS O JUGO',
        'AGREGAR AGUA LIMPIA',
        'MEZCLAR CON UNA CUCHARA Y SERVIR EN UN VASO'
      ]
    },
    choco: {
      id: 'choco',
      name: 'PREPARAR UNA CHOCOLATADA',
      svgKey: 'act3_choco',
      tip: 'Pensá en poner la leche en el vaso, agregar el cacao y revolver bien.',
      defaultSteps: [
        'SERVIR LECHE EN UN VASO',
        'AGREGAR DOS CUCHARADAS DE CACAO',
        'REVOLVER BIEN CON LA CUCHARA'
      ]
    }
  };

  const ACT4_PRESETS = [
    { id: 'mochila', label: 'PREPARAR UNA MOCHILA', defaultSteps: ['BUSCAR LA MOCHILA', 'COLOCAR LOS CUADERNOS', 'GUARDAR LA CARTUCHERA', 'REVISAR QUE NO FALTE NADA', 'CERRAR LA MOCHILA'] },
    { id: 'juguetes', label: 'ORDENAR LOS JUGUETES', defaultSteps: ['JUNTAR LOS JUGUETES DEL SUELO', 'CLASIFICAR AUTITOS Y BLOQUES', 'GUARDARLOS EN EL CANASTO O CAJÓN'] },
    { id: 'desayuno', label: 'PREPARAR UN DESAYUNO', defaultSteps: ['PONER EL INDIVIDUAL EN LA MESA', 'BUSCAR LA TAZA Y LA GALLETITA', 'DISFRUTAR DEL DESAYUNO'] },
    { id: 'planta', label: 'REGAR UNA PLANTA', defaultSteps: ['LLENAR LA REGADERA CON AGUA', 'LLEVARLA HASTA LA MACETA', 'VERTER EL AGUA CON CUIDADO'] },
    { id: 'auto', label: 'LAVAR UN AUTO', defaultSteps: ['MOJAR EL AUTO CON AGUA', 'PASAR ESPONJA CON JABÓN', 'ENJUAGAR Y SECAR'] },
    { id: 'escuela', label: 'PREPARARSE PARA IR A LA ESCUELA', defaultSteps: ['VESTIRSE CON EL UNIFORME', 'DESAYUNAR', 'LAVARSE LOS DIENTES', 'TOMAR LA MOCHILA Y SALIR'] },
    { id: 'custom', label: 'OTRA IDEA QUE SE TE OCURRA', defaultSteps: ['ESCRIBÍ TU PRIMER PASO', 'ESCRIBÍ TU SEGUNDO PASO'] }
  ];

  // ============================================================
  // 4. CLASE PRINCIPAL: ALGORITHMS MODULE
  // ============================================================
  class AlgorithmsModule {
    constructor() {
      this.currentGrade = 1;
      this.currentClass = 1;
      this.currentStep = 1; // 1 a 7
      this.completedSteps = new Set();
      
      // Estado de actividades
      this.reflectionAnswered = false;
      this.act1Slots = new Array(7).fill(null);
      this.act1SelectedCard = null;
      this.act2Slots = new Array(7).fill(null);
      this.act2SelectedCard = null;
      
      this.act3SelectedOption = 'bed';
      this.act3Steps = [...ACT3_CONFIG.bed.defaultSteps];
      
      this.act4SelectedIdea = 'mochila';
      this.act4Title = 'PREPARAR MI MOCHILA';
      this.act4Steps = [...ACT4_PRESETS[0].defaultSteps];

      this.isInitialized = false;
    }

    /**
     * Helper para formateo de texto según el grado escolar
     * En 1.º Grado: TODO texto visible en MAYÚSCULAS
     */
    formatForGrade(text) {
      if (!text) return '';
      if (this.currentGrade === 1) {
        return text.toUpperCase();
      }
      return text;
    }

    /**
     * Inicia la Clase N.º 1 para el grado especificado
     */
    startClass(grade = 1, classNum = 1) {
      this.currentGrade = parseInt(grade) || 1;
      this.currentClass = parseInt(classNum) || 1;
      
      this.loadSavedProgress();
      this.initDom();
      this.showScreen();
      this.renderStep(this.currentStep);
    }

    /**
     * Muestra la pantalla screen-coding-algorithms
     */
    showScreen() {
      const screen = document.getElementById('screen-coding-algorithms');
      if (screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
        screen.classList.toggle('grade-1-active', this.currentGrade === 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    /**
     * Regresa al temario de Programación (Syllabus)
     */
    exitToSyllabus() {
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
    }

    /**
     * Carga el progreso previo desde localStorage
     */
    loadSavedProgress() {
      try {
        const rawProg = localStorage.getItem(`lego_algorithms_class1_progress_g${this.currentGrade}`);
        if (rawProg) {
          const p = JSON.parse(rawProg);
          this.currentStep = p.currentStep || 1;
          this.completedSteps = new Set(Array.isArray(p.completedSteps) ? p.completedSteps : []);
        } else {
          this.currentStep = 1;
          this.completedSteps = new Set();
        }

        // Cargar Actividad 3
        const rawAct3 = localStorage.getItem(`lego_algorithms_act3_g${this.currentGrade}`);
        if (rawAct3) {
          const a3 = JSON.parse(rawAct3);
          this.act3SelectedOption = a3.selectedOption || 'bed';
          this.act3Steps = Array.isArray(a3.steps) && a3.steps.length ? a3.steps : [...ACT3_CONFIG[this.act3SelectedOption].defaultSteps];
        }

        // Cargar Actividad 4
        const rawAct4 = localStorage.getItem(`lego_algorithms_act4_g${this.currentGrade}`);
        if (rawAct4) {
          const a4 = JSON.parse(rawAct4);
          this.act4SelectedIdea = a4.selectedIdea || 'mochila';
          this.act4Title = a4.title || 'PREPARAR MI MOCHILA';
          this.act4Steps = Array.isArray(a4.steps) && a4.steps.length ? a4.steps : [...ACT4_PRESETS[0].defaultSteps];
        }
      } catch (e) {
        console.warn('Error loading algorithms progress:', e);
      }
    }

    /**
     * Guarda el progreso actual en localStorage
     */
    saveProgress() {
      try {
        const payload = {
          currentStep: this.currentStep,
          completedSteps: Array.from(this.completedSteps),
          isCompleted: this.completedSteps.size >= 7,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem(`lego_algorithms_class1_progress_g${this.currentGrade}`, JSON.stringify(payload));
      } catch (e) {}
    }

    /**
     * Inicializa los listeners y estructura de la pantalla en el DOM
     */
    initDom() {
      const container = document.getElementById('algorithms-content-mount');
      if (!container) return;

      // Renderiza la plantilla completa si no está montada
      container.innerHTML = this.buildClassMarkup();
      this.attachEventListeners();
      this.isInitialized = true;
    }

    /**
     * Genera el HTML de las 7 partes de la Clase N.º 1
     */
    buildClassMarkup() {
      const isG1 = this.currentGrade === 1;
      const gradeLabel = isG1 ? '1.º GRADO 🐣' : `${this.currentGrade}.º Grado 💻`;

      return `
        <!-- HUD Superior -->
        <div class="algorithms-topbar">
          <div class="algorithms-nav-left">
            <button type="button" id="btn-alg-back-syllabus" class="btn-algorithms-back">
              <span>⬅️</span> ${this.formatForGrade('VOLVER AL TEMARIO')}
            </button>
            <div class="algorithms-breadcrumb">
              <span>💻 ${this.formatForGrade('PROGRAMACIÓN')}</span>
              <span class="breadcrumb-sep">→</span>
              <span>🧩 ${this.formatForGrade('ALGORITMOS')}</span>
              <span class="breadcrumb-sep">→</span>
              <span class="breadcrumb-current">📖 ${this.formatForGrade('CLASE N.º 1: ¿QUÉ ES UN ALGORITMO?')}</span>
            </div>
          </div>
          <span class="algorithms-grade-badge">${gradeLabel}</span>
        </div>

        <!-- Barra de Progreso de la Clase (7 Partes) -->
        <div class="algorithms-progress-card">
          <div class="progress-header-row">
            <div class="progress-header-title">
              <span>🎯 ${this.formatForGrade('PROGRESO DE LA CLASE')}</span>
              <span id="alg-current-step-label" style="color: #facc15;">${this.formatForGrade('PASO 1 DE 7')}</span>
            </div>
            <span id="alg-progress-pct" class="progress-pct-badge">14%</span>
          </div>
          <div class="algorithms-steps-pills">
            <div class="step-pill" data-step="1">
              <span class="pill-num">1</span>
              <span class="pill-name">${this.formatForGrade('¿Qué es?')}</span>
            </div>
            <div class="step-pill" data-step="2">
              <span class="pill-num">2</span>
              <span class="pill-name">${this.formatForGrade('Dientes')}</span>
            </div>
            <div class="step-pill" data-step="3">
              <span class="pill-num">3</span>
              <span class="pill-name">${this.formatForGrade('¿Desorden?')}</span>
            </div>
            <div class="step-pill" data-step="4">
              <span class="pill-num">4</span>
              <span class="pill-name">${this.formatForGrade('Act. 1: Manos')}</span>
            </div>
            <div class="step-pill" data-step="5">
              <span class="pill-num">5</span>
              <span class="pill-name">${this.formatForGrade('Act. 2: Pastel')}</span>
            </div>
            <div class="step-pill" data-step="6">
              <span class="pill-num">6</span>
              <span class="pill-name">${this.formatForGrade('Act. 3: Escribir')}</span>
            </div>
            <div class="step-pill" data-step="7">
              <span class="pill-num">7</span>
              <span class="pill-name">${this.formatForGrade('Act. 4: Pizarra')}</span>
            </div>
          </div>
          <div class="progress-bar-track">
            <div id="alg-progress-bar-fill" class="progress-bar-fill" style="width: 14%;"></div>
          </div>
        </div>

        <!-- ========================================================
             PARTE 1: ¿QUÉ ES UN ALGORITMO?
             ======================================================== -->
        <section id="alg-section-1" class="class-section">
          <div class="section-header-box">
            <span class="section-tag-badge">✨ ${this.formatForGrade('PENSAMIENTO COMPUTACIONAL')}</span>
            <h2 class="section-title">${this.formatForGrade('¿QUÉ ES UN ALGORITMO?')}</h2>
            <p class="section-subtitle">
              ${this.formatForGrade('Descubrí cómo las computadoras y las personas resolvemos tareas paso a paso.')}
            </p>
          </div>

          <!-- Bity Guía Saludo -->
          <div class="bity-guide-card">
            <div class="bity-guide-avatar-holder">${getBitySvg('happy')}</div>
            <div class="bity-guide-speech">
              <div class="bity-guide-badge">🤖 BITY EL ROBOT GUÍA:</div>
              <p class="bity-guide-speech-text">
                ${this.formatForGrade('¡HOLA! HOY VAMOS A APRENDER A DAR INSTRUCCIONES EN EL ORDEN CORRECTO.')}
              </p>
            </div>
          </div>

          <div class="hero-concept-layout">
            <!-- Ilustración atractiva de niño en rutina diaria -->
            <div class="concept-illustration-card">
              <div class="concept-svg-holder">
                ${ALGORITHM_SVGS.hero_routine}
              </div>
              <p class="concept-illustration-caption">
                ${this.formatForGrade('En la vida diaria, seguimos secuencias ordenadas de pasos sin darnos cuenta.')}
              </p>
            </div>

            <!-- Definición y Explicación -->
            <div class="concept-text-column">
              <div class="definition-golden-box">
                <div class="definition-badge">📖 ${this.formatForGrade('DEFINICIÓN FUNDAMENTAL:')}</div>
                <blockquote class="definition-quote">
                  "${this.formatForGrade('Un algoritmo es un conjunto de instrucciones paso a paso para resolver un problema o completar una tarea.')}"
                </blockquote>
              </div>

              <p class="definition-explanation">
                ${this.formatForGrade('Todos los días realizamos actividades siguiendo pasos. Por ejemplo, cuando nos lavamos los dientes, seguimos una serie de instrucciones. ¡Eso también es un algoritmo!')}
              </p>
            </div>
          </div>

          <!-- 4 Ideas Clave Destacadas -->
          <div class="concept-key-ideas-grid">
            <div class="key-idea-card">
              <span class="key-idea-icon">📋</span>
              <h4 class="key-idea-title">${this.formatForGrade('TIENE INSTRUCCIONES')}</h4>
              <p class="key-idea-desc">${this.formatForGrade('Cada paso es una acción clara que podemos entender y realizar.')}</p>
            </div>
            <div class="key-idea-card">
              <span class="key-idea-icon">🔢</span>
              <h4 class="key-idea-title">${this.formatForGrade('DEBEN ESTAR ORDENADAS')}</h4>
              <p class="key-idea-desc">${this.formatForGrade('Los pasos deben seguir una secuencia lógica: uno detrás de otro.')}</p>
            </div>
            <div class="key-idea-card">
              <span class="key-idea-icon">🎯</span>
              <h4 class="key-idea-title">${this.formatForGrade('CUMPLEN UNA TAREA')}</h4>
              <p class="key-idea-desc">${this.formatForGrade('Cada instrucción nos ayuda a llegar a la meta y completar el objetivo.')}</p>
            </div>
            <div class="key-idea-card">
              <span class="key-idea-icon">⚠️</span>
              <h4 class="key-idea-title">${this.formatForGrade('EL ORDEN IMPORTA')}</h4>
              <p class="key-idea-desc">${this.formatForGrade('Si cambiamos el orden, el resultado puede ser completamente diferente.')}</p>
            </div>
          </div>

          <div class="algorithms-section-nav" style="justify-content: flex-end;">
            <button type="button" class="btn-section-nav btn-nav-next" data-goto="2">
              ${this.formatForGrade('CONTINUAR AL EJEMPLO')} <span>▶️</span>
            </button>
          </div>
        </section>

        <!-- ========================================================
             PARTE 2: EJEMPLO: ALGORITMO PARA LAVARSE LOS DIENTES
             ======================================================== -->
        <section id="alg-section-2" class="class-section">
          <div class="section-header-box">
            <span class="section-tag-badge">🦷 ${this.formatForGrade('SECUENCIA VISUAL')}</span>
            <h2 class="section-title">${this.formatForGrade('EJEMPLO: ALGORITMO PARA LAVARSE LOS DIENTES')}</h2>
            <p class="section-subtitle">
              ${this.formatForGrade('Observá cómo cada paso tiene su número, su ilustración y su orden exacto.')}
            </p>
          </div>

          <div class="bity-guide-card">
            <div class="bity-guide-avatar-holder">${getBitySvg('happy')}</div>
            <div class="bity-guide-speech">
              <div class="bity-guide-badge">🤖 BITY TE EXPLICA:</div>
              <p class="bity-guide-speech-text">
                ${this.formatForGrade('¡MIRÁ CON ATENCIÓN! ESTE ES UN ALGORITMO COTIDIANO. CADA INSTRUCCIÓN VIENE DESPUÉS DE LA ANTERIOR.')}
              </p>
            </div>
          </div>

          <!-- Recorrido de los 7 pasos con flechas y tarjetas -->
          <div class="teeth-sequence-container">
            <div class="steps-flow-track">
              ${TEETH_SEQUENCE.map(step => `
                <div class="step-instruction-card">
                  <span class="step-card-num-badge">${step.id}</span>
                  <div class="step-card-svg-box">${ALGORITHM_SVGS[step.svgKey]}</div>
                  <p class="step-card-desc">${this.formatForGrade(step.title)}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="algorithms-section-nav">
            <button type="button" class="btn-section-nav btn-nav-prev" data-goto="1">
              <span>⬅️</span> ${this.formatForGrade('VOLVER')}
            </button>
            <button type="button" class="btn-section-nav btn-nav-next" data-goto="3">
              ${this.formatForGrade('CONTINUAR: ¿Y SI DESORDENAMOS?')} <span>▶️</span>
            </button>
          </div>
        </section>

        <!-- ========================================================
             PARTE 3: ¿QUÉ PASA SI DESORDENAMOS LAS INSTRUCCIONES?
             ======================================================== -->
        <section id="alg-section-3" class="class-section">
          <div class="section-header-box">
            <span class="section-tag-badge">👻 ${this.formatForGrade('PREGUNTA PARA REFLEXIONAR')}</span>
            <h2 class="section-title">${this.formatForGrade('¿Y SI HACEMOS LOS PASOS EN OTRO ORDEN?')}</h2>
            <p class="section-subtitle">
              ${this.formatForGrade('Un fantasma travieso mezcló las tarjetas de lavarse los dientes. Mirá cómo quedaron:')}
            </p>
          </div>

          <!-- Tarjetas Mezcladas -->
          <div class="scrambled-cards-grid">
            <div class="scrambled-card-item">
              <span class="scrambled-badge-ghost">👻 PASO MEZCLADO</span>
              <div class="step-card-svg-box">${ALGORITHM_SVGS.teeth_7_store}</div>
              <p class="step-card-desc">${this.formatForGrade('GUARDAR EL CEPILLO')}</p>
            </div>
            <div class="scrambled-card-item">
              <span class="scrambled-badge-ghost">👻 PASO MEZCLADO</span>
              <div class="step-card-svg-box">${ALGORITHM_SVGS.teeth_4_brush}</div>
              <p class="step-card-desc">${this.formatForGrade('CEPILLARSE LOS DIENTES')}</p>
            </div>
            <div class="scrambled-card-item">
              <span class="scrambled-badge-ghost">👻 PASO MEZCLADO</span>
              <div class="step-card-svg-box">${ALGORITHM_SVGS.teeth_1_pick}</div>
              <p class="step-card-desc">${this.formatForGrade('TOMAR EL CEPILLO')}</p>
            </div>
            <div class="scrambled-card-item">
              <span class="scrambled-badge-ghost">👻 PASO MEZCLADO</span>
              <div class="step-card-svg-box">${ALGORITHM_SVGS.teeth_6_wash}</div>
              <p class="step-card-desc">${this.formatForGrade('LAVAR EL CEPILLO')}</p>
            </div>
            <div class="scrambled-card-item">
              <span class="scrambled-badge-ghost">👻 PASO MEZCLADO</span>
              <div class="step-card-svg-box">${ALGORITHM_SVGS.teeth_2_paste}</div>
              <p class="step-card-desc">${this.formatForGrade('COLOCAR PASTA DENTAL')}</p>
            </div>
            <div class="scrambled-card-item">
              <span class="scrambled-badge-ghost">👻 PASO MEZCLADO</span>
              <div class="step-card-svg-box">${ALGORITHM_SVGS.teeth_5_rinse}</div>
              <p class="step-card-desc">${this.formatForGrade('ENJUAGARSE LA BOCA')}</p>
            </div>
            <div class="scrambled-card-item">
              <span class="scrambled-badge-ghost">👻 PASO MEZCLADO</span>
              <div class="step-card-svg-box">${ALGORITHM_SVGS.teeth_3_wet}</div>
              <p class="step-card-desc">${this.formatForGrade('MOJAR EL CEPILLO')}</p>
            </div>
          </div>

          <!-- Pregunta Interactiva -->
          <div class="reflection-interactive-card">
            <h3 class="reflection-question-title">
              ❓ ${this.formatForGrade('¿TIENE SENTIDO EL ORDEN DE ESTAS INSTRUCCIONES?')}
            </h3>

            <div class="reflection-options-row">
              <button type="button" id="btn-reflection-yes" class="btn-reflection-choice" data-choice="yes">
                ${this.formatForGrade('SÍ, EL ORDEN ES IMPORTANTE.')}
              </button>
              <button type="button" id="btn-reflection-no" class="btn-reflection-choice" data-choice="no">
                ${this.formatForGrade('NO, PODEMOS HACERLO EN CUALQUIER ORDEN.')}
              </button>
            </div>

            <!-- Explicación de Bity al Responder -->
            <div id="reflection-feedback-box" class="reflection-feedback-reveal">
              <div class="bity-guide-card" style="margin-bottom: 0;">
                <div class="bity-guide-avatar-holder">${getBitySvg('celebrating')}</div>
                <div class="bity-guide-speech">
                  <div class="bity-guide-badge">🤖 BITY TE LO CUENTA:</div>
                  <p class="feedback-text">
                    "${this.formatForGrade('¡EL ORDEN ES MUY IMPORTANTE! SI GUARDAMOS EL CEPILLO ANTES DE UTILIZARLO, NO PODREMOS LAVARNOS LOS DIENTES CORRECTAMENTE. POR ESO, UN ALGORITMO DEBE TENER SUS INSTRUCCIONES EN EL ORDEN ADECUADO.')}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="algorithms-section-nav">
            <button type="button" class="btn-section-nav btn-nav-prev" data-goto="2">
              <span>⬅️</span> ${this.formatForGrade('VOLVER')}
            </button>
            <button type="button" id="btn-next-after-reflection" class="btn-section-nav btn-nav-next" data-goto="4" style="display: none;">
              ${this.formatForGrade('¡COMENZAR ACTIVIDAD 1!')} <span>▶️</span>
            </button>
          </div>
        </section>

        <!-- ========================================================
             PARTE 4: ACTIVIDAD 1: ALGORITMO PARA LAVARTE LAS MANOS
             ======================================================== -->
        <section id="alg-section-4" class="class-section">
          <div class="section-header-box">
            <span class="section-tag-badge">🧼 ${this.formatForGrade('ACTIVIDAD PRÁCTICA N.º 1')}</span>
            <h2 class="section-title">${this.formatForGrade('¡AHORA TE TOCA A VOS!')}</h2>
            <p class="section-subtitle">
              "${this.formatForGrade('ORDENÁ LAS IMÁGENES PARA ARMAR EL ALGORITMO CORRECTO PARA LAVARTE LAS MANOS.')}"
            </p>
          </div>

          <div class="bity-guide-card">
            <div id="bity-avatar-act1" class="bity-guide-avatar-holder">${getBitySvg('happy')}</div>
            <div class="bity-guide-speech">
              <div class="bity-guide-badge">🤖 BITY TE ACOMPAÑA:</div>
              <p id="bity-speech-act1" class="bity-guide-speech-text">
                ${this.formatForGrade('Arrastrá cada tarjeta o tocala y luego tocá el casillero numerado donde querés colocarla.')}
              </p>
            </div>
          </div>

          <div class="sorting-activity-layout">
            <!-- Banco de Tarjetas Desordenadas -->
            <div class="cards-bank-box">
              <div class="bank-header-label">
                <span>📦 ${this.formatForGrade('TARJETAS DISPONIBLES:')}</span>
                <span class="bank-touch-tip">💡 ${this.formatForGrade('Arrastrá o seleccioná y tocá el casillero')}</span>
              </div>
              <div id="bank-act1" class="cards-bank-grid"></div>
            </div>

            <!-- Casillas Numeradas 1 a 7 -->
            <div class="slots-destination-box">
              <div class="slots-header-label">
                <span>🔢 ${this.formatForGrade('TU ALGORITMO ORDENADO (PASOS 1 AL 7):')}</span>
              </div>
              <div id="slots-act1" class="slots-grid"></div>
            </div>

            <!-- Acciones -->
            <div class="activity-action-bar">
              <button type="button" id="btn-check-act1" class="btn-check-activity">
                <span>🔍</span> ${this.formatForGrade('COMPROBAR')}
              </button>
              <button type="button" id="btn-reset-act1" class="btn-reset-sorting">
                <span>🔄</span> ${this.formatForGrade('REINICIAR')}
              </button>
            </div>

            <!-- Caja de Resultado / Pista -->
            <div id="result-box-act1" class="activity-result-box">
              <div class="result-content-inner">
                <div id="result-avatar-act1" style="width: 50px; height: 50px; flex-shrink: 0;"></div>
                <div>
                  <h4 id="result-title-act1" class="result-msg-title"></h4>
                  <p id="result-desc-act1" class="result-msg-desc"></p>
                </div>
              </div>
            </div>

            <!-- Revisión del Algoritmo Completo y Ordenado -->
            <div id="review-box-act1" class="solved-sequence-review">
              <div class="solved-review-title">✅ ${this.formatForGrade('ALGORITMO COMPLETO Y REVISADO:')}</div>
              <div class="solved-steps-list">
                ${HANDS_SEQUENCE.map(s => `<span class="solved-step-chip">${s.id}. ${this.formatForGrade(s.title)}</span>`).join('')}
              </div>
            </div>
          </div>

          <div class="algorithms-section-nav">
            <button type="button" class="btn-section-nav btn-nav-prev" data-goto="3">
              <span>⬅️</span> ${this.formatForGrade('VOLVER')}
            </button>
            <button type="button" id="btn-next-act1" class="btn-section-nav btn-nav-next" data-goto="5" style="display: none;">
              ${this.formatForGrade('CONTINUAR A LA ACTIVIDAD 2')} <span>▶️</span>
            </button>
          </div>
        </section>

        <!-- ========================================================
             PARTE 5: ACTIVIDAD 2: ALGORITMO PARA PREPARAR UN PASTEL
             ======================================================== -->
        <section id="alg-section-5" class="class-section">
          <div class="section-header-box">
            <span class="section-tag-badge">🎂 ${this.formatForGrade('ACTIVIDAD PRÁCTICA N.º 2')}</span>
            <h2 class="section-title">${this.formatForGrade('¡VAMOS A PREPARAR UN PASTEL!')}</h2>
            <p class="section-subtitle">
              "${this.formatForGrade('AYUDÁ A BITY A ORDENAR LOS PASOS PARA PREPARAR UN PASTEL.')}"
            </p>
          </div>

          <!-- Llamado de Seguridad Infantil Responsable -->
          <div class="safety-callout-banner">
            <span class="safety-icon">🛡️</span>
            <div>
              <strong>${this.formatForGrade('¡RECORDÁ SIEMPRE LA SEGURIDAD EN CASA!')}</strong>
              <p style="margin: 2px 0 0; font-size: 0.88rem; font-weight: 500;">
                ${this.formatForGrade('El uso del horno y cualquier actividad con calor debe quedar siempre a cargo de un adulto.')}
              </p>
            </div>
          </div>

          <div class="bity-guide-card">
            <div id="bity-avatar-act2" class="bity-guide-avatar-holder">${getBitySvg('happy')}</div>
            <div class="bity-guide-speech">
              <div class="bity-guide-badge">🤖 BITY COCINERO:</div>
              <p id="bity-speech-act2" class="bity-guide-speech-text">
                ${this.formatForGrade('Pensá en qué orden debemos cocinar para que el pastel salga delicioso y seguro.')}
              </p>
            </div>
          </div>

          <div class="sorting-activity-layout">
            <!-- Banco de Tarjetas Desordenadas -->
            <div class="cards-bank-box">
              <div class="bank-header-label">
                <span>📦 ${this.formatForGrade('PASOS DEL PASTEL DESORDENADOS:')}</span>
                <span class="bank-touch-tip">💡 ${this.formatForGrade('Arrastrá o seleccioná y tocá el casillero')}</span>
              </div>
              <div id="bank-act2" class="cards-bank-grid"></div>
            </div>

            <!-- Casillas Numeradas 1 a 7 -->
            <div class="slots-destination-box">
              <div class="slots-header-label">
                <span>🔢 ${this.formatForGrade('RECETA EN ALGORITMO ORDENADO (PASOS 1 AL 7):')}</span>
              </div>
              <div id="slots-act2" class="slots-grid"></div>
            </div>

            <!-- Acciones -->
            <div class="activity-action-bar">
              <button type="button" id="btn-check-act2" class="btn-check-activity">
                <span>🔍</span> ${this.formatForGrade('COMPROBAR')}
              </button>
              <button type="button" id="btn-reset-act2" class="btn-reset-sorting">
                <span>🔄</span> ${this.formatForGrade('REINICIAR')}
              </button>
            </div>

            <!-- Caja de Resultado / Pista -->
            <div id="result-box-act2" class="activity-result-box">
              <div class="result-content-inner">
                <div id="result-avatar-act2" style="width: 50px; height: 50px; flex-shrink: 0;"></div>
                <div>
                  <h4 id="result-title-act2" class="result-msg-title"></h4>
                  <p id="result-desc-act2" class="result-msg-desc"></p>
                </div>
              </div>
            </div>

            <!-- Revisión del Algoritmo Completo y Ordenado -->
            <div id="review-box-act2" class="solved-sequence-review">
              <div class="solved-review-title">✅ ${this.formatForGrade('RECETA COMPLETA Y REVISADA:')}</div>
              <div class="solved-steps-list">
                ${CAKE_SEQUENCE.map(s => `<span class="solved-step-chip">${s.id}. ${this.formatForGrade(s.title)}</span>`).join('')}
              </div>
            </div>
          </div>

          <div class="algorithms-section-nav">
            <button type="button" class="btn-section-nav btn-nav-prev" data-goto="4">
              <span>⬅️</span> ${this.formatForGrade('VOLVER')}
            </button>
            <button type="button" id="btn-next-act2" class="btn-section-nav btn-nav-next" data-goto="6" style="display: none;">
              ${this.formatForGrade('CONTINUAR A LA ACTIVIDAD 3')} <span>▶️</span>
            </button>
          </div>
        </section>

        <!-- ========================================================
             PARTE 6: ACTIVIDAD 3: ESCRIBÍ TUS PROPIOS ALGORITMOS
             ======================================================== -->
        <section id="alg-section-6" class="class-section">
          <div class="section-header-box">
            <span class="section-tag-badge">✍️ ${this.formatForGrade('CREACIÓN DE ALGORITMOS')}</span>
            <h2 class="section-title">${this.formatForGrade('AHORA VAMOS A CREAR ALGORITMOS')}</h2>
            <p class="section-subtitle">
              "${this.formatForGrade('LEÉ CADA SITUACIÓN Y ESCRIBÍ LOS PASOS QUE NECESITARÍAS PARA REALIZARLA.')}"
            </p>
          </div>

          <div class="bity-guide-card">
            <div class="bity-guide-avatar-holder">${getBitySvg('thinking')}</div>
            <div class="bity-guide-speech">
              <div class="bity-guide-badge">🤖 BITY TE PROPONE:</div>
              <p class="bity-guide-speech-text">
                ${this.formatForGrade('Elegí una de las tres situaciones cotidianas. Podés agregar más pasos o modificarlos como prefieras.')}
              </p>
            </div>
          </div>

          <!-- Selector de 3 Opciones -->
          <div class="writing-options-selector">
            <div class="writing-option-card active selected" data-act3-opt="bed">
              <span class="option-badge">OPCIÓN A</span>
              <div class="option-svg-box">${ALGORITHM_SVGS.act3_bed}</div>
              <h4 class="option-title">${this.formatForGrade('TENDER LA CAMA')}</h4>
              <p class="option-tip">${this.formatForGrade(ACT3_CONFIG.bed.tip)}</p>
            </div>
            <div class="writing-option-card" data-act3-opt="juice">
              <span class="option-badge">OPCIÓN B</span>
              <div class="option-svg-box">${ALGORITHM_SVGS.act3_juice}</div>
              <h4 class="option-title">${this.formatForGrade('PREPARAR UN JUGO')}</h4>
              <p class="option-tip">${this.formatForGrade(ACT3_CONFIG.juice.tip)}</p>
            </div>
            <div class="writing-option-card" data-act3-opt="choco">
              <span class="option-badge">OPCIÓN C</span>
              <div class="option-svg-box">${ALGORITHM_SVGS.act3_choco}</div>
              <h4 class="option-title">${this.formatForGrade('PREPARAR UNA CHOCOLATADA')}</h4>
              <p class="option-tip">${this.formatForGrade(ACT3_CONFIG.choco.tip)}</p>
            </div>
          </div>

          <!-- Editor Dinámico de Pasos -->
          <div class="dynamic-step-editor-card">
            <h4 class="editor-header-title">
              <span>📝</span>
              <span id="act3-editor-title">${this.formatForGrade('PASOS PARA: TENDER LA CAMA')}</span>
            </h4>

            <div id="act3-steps-container" class="steps-inputs-container"></div>

            <div class="editor-controls-row">
              <button type="button" id="btn-act3-add-step" class="btn-add-step">
                <span>➕</span> ${this.formatForGrade('AGREGAR PASO')}
              </button>
              <button type="button" id="btn-act3-save" class="btn-save-algorithm">
                <span>💾</span> ${this.formatForGrade('GUARDAR MI ALGORITMO')}
              </button>
            </div>

            <!-- Ficha de Algoritmo Guardado -->
            <div id="act3-saved-card" class="saved-algorithm-display-card">
              <div class="saved-display-header">
                <h4 id="act3-saved-heading" class="saved-display-title"></h4>
                <span style="color: #34d399; font-weight: 800;">✅ ${this.formatForGrade('¡GUARDADO!')}</span>
              </div>
              <ul id="act3-saved-list" class="saved-steps-ordered-list"></ul>
              <div class="bity-guide-card" style="margin-bottom: 0;">
                <div class="bity-guide-avatar-holder">${getBitySvg('celebrating')}</div>
                <div class="bity-guide-speech">
                  <div class="bity-guide-badge">🤖 BITY TE FELICITA:</div>
                  <p class="bity-guide-speech-text">
                    ${this.formatForGrade('¡EXCELENTE TRABAJO! CREASTE UN ALGORITMO COHERENTE Y CLARO. ¡CADA PASO CUENTA!')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="algorithms-section-nav">
            <button type="button" class="btn-section-nav btn-nav-prev" data-goto="5">
              <span>⬅️</span> ${this.formatForGrade('VOLVER')}
            </button>
            <button type="button" id="btn-next-act3" class="btn-section-nav btn-nav-next" data-goto="7" style="display: none;">
              ${this.formatForGrade('CONTINUAR A LA ACTIVIDAD 4')} <span>▶️</span>
            </button>
          </div>
        </section>

        <!-- ========================================================
             PARTE 7: ACTIVIDAD 4: ¡INVENTÁ TU PROPIO ALGORITMO!
             Pizarra digital escolar y presentación para el aula
             ======================================================== -->
        <section id="alg-section-7" class="class-section">
          <div class="section-header-box">
            <span class="section-tag-badge">🚀 ${this.formatForGrade('PROGRAMADOR AUTÓNOMO')}</span>
            <h2 class="section-title">${this.formatForGrade('¡AHORA VOS SOS EL PROGRAMADOR!')}</h2>
            <p class="section-subtitle">
              "${this.formatForGrade('¿QUÉ ACTIVIDAD TE GUSTARÍA EXPLICAR PASO A PASO? ELEGÍ UNA IDEA Y CREÁ TU PROPIO ALGORITMO.')}"
            </p>
          </div>

          <!-- Sugerencias de Ideas -->
          <div class="ideas-chips-selector">
            ${ACT4_PRESETS.map((p, idx) => `
              <button type="button" class="idea-chip ${idx === 0 ? 'selected' : ''}" data-act4-preset="${p.id}">
                ${this.formatForGrade(p.label)}
              </button>
            `).join('')}
          </div>

          <!-- Campo personalizado para "OTRA IDEA" -->
          <div id="custom-idea-box" class="custom-idea-input-box">
            <input type="text" id="custom-idea-title-input" class="custom-idea-text" placeholder="${this.formatForGrade('ESCRIBÍ EL NOMBRE DE TU ACTIVIDAD...')}" maxlength="40">
            <button type="button" id="btn-confirm-custom-idea" class="btn-add-step" style="padding: 8px 16px;">
              ${this.formatForGrade('USAR ESTA IDEA')}
            </button>
          </div>

          <!-- PIZARRA DIGITAL ESCOLAR -->
          <div class="algorithm-blackboard">
            <div class="blackboard-chalk-title-bar">
              <span style="font-size: 1.5rem;">🖍️</span>
              <input type="text" id="chalk-blackboard-title" class="chalk-title-input" value="${this.formatForGrade(this.act4Title)}" title="${this.formatForGrade('Hacé clic para cambiar el título')}">
            </div>

            <div id="blackboard-instructions-list" class="blackboard-instructions-list"></div>

            <div class="blackboard-bottom-bar">
              <button type="button" id="btn-blackboard-add-row" class="btn-add-step">
                <span>➕</span> ${this.formatForGrade('AGREGAR INSTRUCCIÓN')}
              </button>
              <button type="button" id="btn-share-presentation" class="btn-share-classroom-presentation">
                <span>📣</span> ${this.formatForGrade('¡COMPARTIR MI ALGORITMO CON MIS COMPAÑEROS!')}
              </button>
            </div>
          </div>

          <!-- Bity Celebración Final -->
          <div class="bity-guide-card">
            <div class="bity-guide-avatar-holder">${getBitySvg('celebrating')}</div>
            <div class="bity-guide-speech">
              <div class="bity-guide-badge">🤖 BITY COMPAÑERO:</div>
              <p class="bity-guide-speech-text">
                ${this.formatForGrade('¡LO LOGRASTE! YA SOS UN AUTÉNTICO CREADOR DE ALGORITMOS. COMPARTÍ TU TRABAJO CON LA CLASE.')}
              </p>
            </div>
          </div>

          <div class="algorithms-section-nav">
            <button type="button" class="btn-section-nav btn-nav-prev" data-goto="6">
              <span>⬅️</span> ${this.formatForGrade('VOLVER')}
            </button>
            <button type="button" id="btn-finish-class" class="btn-section-nav btn-nav-next" style="background: linear-gradient(180deg, #10b981, #059669); border-color: #34d399;">
              <span>🎉</span> ${this.formatForGrade('FINALIZAR CLASE N.º 1')}
            </button>
          </div>
        </section>

        <!-- ========================================================
             MODAL DE PRESENTACIÓN PARA COMPARTIR EN EL AULA
             ======================================================== -->
        <div id="modal-algorithm-presentation" class="modal-algorithm-presentation" aria-hidden="true">
          <div class="presentation-card">
            <div class="presentation-header">
              <span class="presentation-school-tag">🎓 ${this.formatForGrade('INFORMÁTICA MÁGICA • PENSAMIENTO COMPUTACIONAL')}</span>
              <h3 id="pres-modal-title" class="presentation-main-title"></h3>
              <div class="presentation-meta">
                <span>${this.formatForGrade('AUTOR / PROGRAMADOR: ESTUDIANTE DE ' + gradeLabel)}</span>
              </div>
            </div>

            <div id="pres-modal-steps-list" class="presentation-steps-list"></div>

            <div class="presentation-callout-share">
              📢 <strong>${this.formatForGrade('¿CÓMO COMPARTIR EN CLASE?')}</strong><br>
              ${this.formatForGrade('Leé tus instrucciones en voz alta a tus compañeros y explicá por qué elegiste ese orden. Tu docente te indicará cómo compartirlo en la clase.')}
            </div>

            <div class="presentation-actions-row">
              <button type="button" id="btn-pres-copy" class="btn-pres-action btn-pres-copy">
                <span>📋</span> ${this.formatForGrade('COPIAR TEXTO')}
              </button>
              <button type="button" id="btn-pres-print" class="btn-pres-action btn-pres-print">
                <span>🖨️</span> ${this.formatForGrade('IMPRIMIR / GUARDAR PDF')}
              </button>
              <button type="button" id="btn-pres-edit" class="btn-pres-action btn-pres-edit">
                <span>✏️</span> ${this.formatForGrade('VOLVER A EDITAR')}
              </button>
              <button type="button" id="btn-pres-close" class="btn-pres-action btn-pres-close">
                <span>✖</span> ${this.formatForGrade('CERRAR')}
              </button>
            </div>
          </div>
        </div>
      `;
    }

    /**
     * Vincula listeners a botones de navegación, selecciones y modales
     */
    attachEventListeners() {
      // Botón volver al syllabus
      const btnBackSyllabus = document.getElementById('btn-alg-back-syllabus');
      if (btnBackSyllabus) {
        btnBackSyllabus.onclick = () => this.exitToSyllabus();
      }

      // Píldoras de pasos
      document.querySelectorAll('.step-pill').forEach(pill => {
        pill.onclick = () => {
          const step = parseInt(pill.getAttribute('data-step'));
          if (step) {
            if (window.MagicAudioEngine) window.MagicAudioEngine.playClick();
            this.goToStep(step);
          }
        };
      });

      // Botones de navegación siguiente / anterior
      document.querySelectorAll('.btn-section-nav[data-goto]').forEach(btn => {
        btn.onclick = () => {
          const targetStep = parseInt(btn.getAttribute('data-goto'));
          if (targetStep) {
            if (window.MagicAudioEngine) window.MagicAudioEngine.playClick();
            this.goToStep(targetStep);
          }
        };
      });

      // Parte 3: Pregunta de reflexión
      const btnReflectYes = document.getElementById('btn-reflection-yes');
      const btnReflectNo = document.getElementById('btn-reflection-no');
      if (btnReflectYes && btnReflectNo) {
        btnReflectYes.onclick = () => this.handleReflection('yes');
        btnReflectNo.onclick = () => this.handleReflection('no');
      }

      // Actividad 1: Ordenar Manos
      const btnCheckAct1 = document.getElementById('btn-check-act1');
      const btnResetAct1 = document.getElementById('btn-reset-act1');
      if (btnCheckAct1) btnCheckAct1.onclick = () => this.checkSorting(1);
      if (btnResetAct1) btnResetAct1.onclick = () => this.initSortingActivity(1, true);

      // Actividad 2: Ordenar Pastel
      const btnCheckAct2 = document.getElementById('btn-check-act2');
      const btnResetAct2 = document.getElementById('btn-reset-act2');
      if (btnCheckAct2) btnCheckAct2.onclick = () => this.checkSorting(2);
      if (btnResetAct2) btnResetAct2.onclick = () => this.initSortingActivity(2, true);

      // Actividad 3: Opciones de escritura
      document.querySelectorAll('.writing-option-card').forEach(card => {
        card.onclick = () => {
          const opt = card.getAttribute('data-act3-opt');
          this.selectAct3Option(opt);
        };
      });

      const btnAct3Add = document.getElementById('btn-act3-add-step');
      const btnAct3Save = document.getElementById('btn-act3-save');
      if (btnAct3Add) btnAct3Add.onclick = () => this.act3AddStep();
      if (btnAct3Save) btnAct3Save.onclick = () => this.act3Save();

      // Actividad 4: Pizarra Digital
      document.querySelectorAll('.idea-chip').forEach(chip => {
        chip.onclick = () => {
          const presetId = chip.getAttribute('data-act4-preset');
          this.selectAct4Preset(presetId);
        };
      });

      const btnConfirmCustom = document.getElementById('btn-confirm-custom-idea');
      if (btnConfirmCustom) {
        btnConfirmCustom.onclick = () => {
          const customVal = document.getElementById('custom-idea-title-input')?.value.trim();
          if (customVal) {
            this.setAct4Title(customVal);
          }
        };
      }

      const chalkTitleInput = document.getElementById('chalk-blackboard-title');
      if (chalkTitleInput) {
        chalkTitleInput.oninput = (e) => {
          this.act4Title = e.target.value;
          this.saveAct4();
        };
      }

      const btnBlackboardAdd = document.getElementById('btn-blackboard-add-row');
      if (btnBlackboardAdd) btnBlackboardAdd.onclick = () => this.act4AddRow();

      const btnSharePres = document.getElementById('btn-share-classroom-presentation');
      if (btnSharePres) btnSharePres.onclick = () => this.openPresentationModal();

      // Modal de Presentación
      const btnPresClose = document.getElementById('btn-pres-close');
      const btnPresEdit = document.getElementById('btn-pres-edit');
      const btnPresPrint = document.getElementById('btn-pres-print');
      const btnPresCopy = document.getElementById('btn-pres-copy');

      if (btnPresClose) btnPresClose.onclick = () => this.closePresentationModal();
      if (btnPresEdit) btnPresEdit.onclick = () => this.closePresentationModal();
      if (btnPresPrint) btnPresPrint.onclick = () => window.print();
      if (btnPresCopy) btnPresCopy.onclick = () => this.copyPresentationText();

      // Finalizar clase
      const btnFinish = document.getElementById('btn-finish-class');
      if (btnFinish) {
        btnFinish.onclick = () => {
          this.completedSteps.add(7);
          this.saveProgress();
          if (window.MagicAudioEngine) window.MagicAudioEngine.playVictory();
          alert(this.formatForGrade('¡Felicitaciones! Completaste exitosamente la Clase N.º 1 de Algoritmos.'));
          this.exitToSyllabus();
        };
      }
    }

    /**
     * Muestra el paso correspondiente de la clase (1 a 7)
     */
    goToStep(step) {
      if (step < 1 || step > 7) return;
      this.currentStep = step;
      this.saveProgress();
      this.renderStep(step);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }

    /**
     * Renderiza el estado y contenido del paso activo
     */
    renderStep(step) {
      // 1. Ocultar todas las secciones y activar la actual
      document.querySelectorAll('.class-section').forEach(s => s.classList.remove('active'));
      const activeSection = document.getElementById(`alg-section-${step}`);
      if (activeSection) activeSection.classList.add('active');

      // 2. Actualizar píldoras de navegación superior
      document.querySelectorAll('.step-pill').forEach(pill => {
        const pStep = parseInt(pill.getAttribute('data-step'));
        pill.classList.toggle('active', pStep === step);
        pill.classList.toggle('completed', this.completedSteps.has(pStep));
      });

      // 3. Barra y porcentaje
      const pct = Math.min(100, Math.round((step / 7) * 100));
      const fill = document.getElementById('alg-progress-bar-fill');
      const pctLabel = document.getElementById('alg-progress-pct');
      const stepLabel = document.getElementById('alg-current-step-label');

      if (fill) fill.style.width = `${pct}%`;
      if (pctLabel) pctLabel.textContent = `${pct}%`;
      if (stepLabel) stepLabel.textContent = this.formatForGrade(`PASO ${step} DE 7`);

      // 4. Inicializadores específicos de paso
      if (step === 3 && this.reflectionAnswered) {
        const nextBtn = document.getElementById('btn-next-after-reflection');
        if (nextBtn) nextBtn.style.display = 'inline-flex';
      } else if (step === 4) {
        this.initSortingActivity(1, false);
      } else if (step === 5) {
        this.initSortingActivity(2, false);
      } else if (step === 6) {
        this.initAct3();
      } else if (step === 7) {
        this.initAct4();
      }
    }

    // ============================================================
    // PARTE 3: PREGUNTA DE REFLEXIÓN
    // ============================================================
    handleReflection(choice) {
      const btnYes = document.getElementById('btn-reflection-yes');
      const btnNo = document.getElementById('btn-reflection-no');
      const feedbackBox = document.getElementById('reflection-feedback-box');
      const nextBtn = document.getElementById('btn-next-after-reflection');

      if (choice === 'yes') {
        if (window.MagicAudioEngine) window.MagicAudioEngine.playCorrect();
        if (btnYes) btnYes.classList.add('selected-correct');
        if (btnNo) btnNo.classList.remove('selected-wrong', 'selected-correct');
        if (feedbackBox) feedbackBox.classList.add('active');
        if (nextBtn) nextBtn.style.display = 'inline-flex';
        this.reflectionAnswered = true;
        this.completedSteps.add(3);
        this.saveProgress();
      } else {
        if (window.MagicAudioEngine) window.MagicAudioEngine.playIncorrect();
        if (btnNo) btnNo.classList.add('selected-wrong');
        if (btnYes) btnYes.classList.remove('selected-correct');
        alert(this.formatForGrade('¡Pensalo un momento! Si guardamos el cepillo antes de cepillarnos o nos enjuagamos antes de poner pasta, ¿quedarían limpios los dientes? ¡El orden sí es importante!'));
      }
    }

    // ============================================================
    // PARTES 4 Y 5: ACTIVIDADES DE ORDENAMIENTO (MANOS Y PASTEL)
    // ============================================================
    initSortingActivity(actNum, forceReset = false) {
      const sequence = (actNum === 1) ? HANDS_SEQUENCE : CAKE_SEQUENCE;
      const bankEl = document.getElementById(`bank-act${actNum}`);
      const slotsEl = document.getElementById(`slots-act${actNum}`);
      if (!bankEl || !slotsEl) return;

      if (forceReset || (actNum === 1 && !this.act1Initialized) || (actNum === 2 && !this.act2Initialized)) {
        if (actNum === 1) {
          this.act1Slots = new Array(7).fill(null);
          this.act1SelectedCard = null;
          this.act1Initialized = true;
        } else {
          this.act2Slots = new Array(7).fill(null);
          this.act2SelectedCard = null;
          this.act2Initialized = true;
        }

        // Crear baraja mezclada
        const scrambled = [...sequence].sort(() => Math.random() - 0.5);
        this[`act${actNum}Bank`] = scrambled;
      }

      this.renderSortingBoard(actNum);
    }

    renderSortingBoard(actNum) {
      const sequence = (actNum === 1) ? HANDS_SEQUENCE : CAKE_SEQUENCE;
      const bankEl = document.getElementById(`bank-act${actNum}`);
      const slotsEl = document.getElementById(`slots-act${actNum}`);
      const currentBank = this[`act${actNum}Bank`] || [];
      const currentSlots = (actNum === 1) ? this.act1Slots : this.act2Slots;

      // 1. Renderizar Banco de Tarjetas
      bankEl.innerHTML = '';
      currentBank.forEach(cardData => {
        const cardNode = document.createElement('div');
        cardNode.className = 'draggable-step-card';
        cardNode.draggable = true;
        cardNode.setAttribute('data-card-id', cardData.id);

        cardNode.innerHTML = `
          <div class="drag-card-svg">${ALGORITHM_SVGS[cardData.svgKey]}</div>
          <p class="drag-card-text">${this.formatForGrade(cardData.title)}</p>
        `;

        // Eventos Drag and Drop
        cardNode.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', JSON.stringify({ actNum, cardId: cardData.id }));
          cardNode.style.opacity = '0.5';
        });

        cardNode.addEventListener('dragend', () => {
          cardNode.style.opacity = '1';
        });

        // Soporte Táctil y Clic Directo
        cardNode.addEventListener('click', (e) => {
          e.stopPropagation();
          this.handleCardTouchSelect(actNum, cardData.id, cardNode);
        });

        bankEl.appendChild(cardNode);
      });

      // 2. Renderizar 7 Casillas Destino
      slotsEl.innerHTML = '';
      for (let i = 0; i < 7; i++) {
        const slotNode = document.createElement('div');
        slotNode.className = 'slot-drop-zone';
        slotNode.setAttribute('data-slot-idx', i);

        const cardInSlotId = currentSlots[i];
        if (cardInSlotId !== null) {
          slotNode.classList.add('has-card');
          const cardData = sequence.find(s => s.id === cardInSlotId);
          slotNode.innerHTML = `
            <span class="slot-number-badge">${i + 1}</span>
            <div class="draggable-step-card" style="box-shadow:none; cursor:pointer;" title="${this.formatForGrade('Tocá para regresar al banco')}">
              <div class="drag-card-svg">${ALGORITHM_SVGS[cardData.svgKey]}</div>
              <p class="drag-card-text">${this.formatForGrade(cardData.title)}</p>
            </div>
          `;

          // Clic en tarjeta ubicada: Regresar al banco
          slotNode.querySelector('.draggable-step-card').addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeCardFromSlot(actNum, i);
          });
        } else {
          slotNode.innerHTML = `
            <span class="slot-number-badge">${i + 1}</span>
            <div style="font-size:0.75rem; color:#94a3b8; margin-top:20px;">
              ${this.formatForGrade('PASO ' + (i + 1))}
            </div>
          `;
        }

        // Drag and Drop en la casilla
        slotNode.addEventListener('dragover', (e) => {
          e.preventDefault();
          slotNode.classList.add('drag-over');
        });

        slotNode.addEventListener('dragleave', () => {
          slotNode.classList.remove('drag-over');
        });

        slotNode.addEventListener('drop', (e) => {
          e.preventDefault();
          slotNode.classList.remove('drag-over');
          try {
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            if (data && data.actNum === actNum) {
              this.placeCardInSlot(actNum, data.cardId, i);
            }
          } catch (err) {}
        });

        // Soporte Táctil: Ubicar tarjeta seleccionada
        slotNode.addEventListener('click', () => {
          const selectedId = (actNum === 1) ? this.act1SelectedCard : this.act2SelectedCard;
          if (selectedId !== null) {
            this.placeCardInSlot(actNum, selectedId, i);
            if (actNum === 1) this.act1SelectedCard = null;
            else this.act2SelectedCard = null;
          }
        });

        slotsEl.appendChild(slotNode);
      }
    }

    handleCardTouchSelect(actNum, cardId, cardNode) {
      if (window.MagicAudioEngine) window.MagicAudioEngine.playClick();
      const currentSelected = (actNum === 1) ? this.act1SelectedCard : this.act2SelectedCard;

      if (currentSelected === cardId) {
        // Deseleccionar
        if (actNum === 1) this.act1SelectedCard = null;
        else this.act2SelectedCard = null;
        cardNode.classList.remove('selected-for-touch');
      } else {
        // Seleccionar
        if (actNum === 1) this.act1SelectedCard = cardId;
        else this.act2SelectedCard = cardId;
        document.querySelectorAll(`#bank-act${actNum} .draggable-step-card`).forEach(c => c.classList.remove('selected-for-touch'));
        cardNode.classList.add('selected-for-touch');
      }
    }

    placeCardInSlot(actNum, cardId, slotIdx) {
      const sequence = (actNum === 1) ? HANDS_SEQUENCE : CAKE_SEQUENCE;
      const currentSlots = (actNum === 1) ? this.act1Slots : this.act2Slots;
      const currentBank = this[`act${actNum}Bank`];

      // Si la casilla ya tiene una tarjeta, devolverla al banco
      if (currentSlots[slotIdx] !== null) {
        const oldCardId = currentSlots[slotIdx];
        const oldCardData = sequence.find(s => s.id === oldCardId);
        if (oldCardData) currentBank.push(oldCardData);
      }

      // Quitar tarjeta del banco
      const bankIdx = currentBank.findIndex(c => c.id === cardId);
      if (bankIdx !== -1) {
        currentBank.splice(bankIdx, 1);
      }

      // Asignar a la casilla
      currentSlots[slotIdx] = cardId;

      if (window.MagicAudioEngine) window.MagicAudioEngine.playClick();
      this.renderSortingBoard(actNum);
    }

    removeCardFromSlot(actNum, slotIdx) {
      const sequence = (actNum === 1) ? HANDS_SEQUENCE : CAKE_SEQUENCE;
      const currentSlots = (actNum === 1) ? this.act1Slots : this.act2Slots;
      const currentBank = this[`act${actNum}Bank`];

      const cardId = currentSlots[slotIdx];
      if (cardId !== null) {
        const cardData = sequence.find(s => s.id === cardId);
        if (cardData) currentBank.push(cardData);
        currentSlots[slotIdx] = null;
        if (window.MagicAudioEngine) window.MagicAudioEngine.playClick();
        this.renderSortingBoard(actNum);
      }
    }

    /**
     * Valida el orden de la actividad y genera feedback pedagógico
     */
    checkSorting(actNum) {
      const sequence = (actNum === 1) ? HANDS_SEQUENCE : CAKE_SEQUENCE;
      const currentSlots = (actNum === 1) ? this.act1Slots : this.act2Slots;
      const resultBox = document.getElementById(`result-box-act${actNum}`);
      const titleEl = document.getElementById(`result-title-act${actNum}`);
      const descEl = document.getElementById(`result-desc-act${actNum}`);
      const avatarEl = document.getElementById(`result-avatar-act${actNum}`);
      const reviewBox = document.getElementById(`review-box-act${actNum}`);
      const nextBtn = document.getElementById(`btn-next-act${actNum}`);

      // Comprobar si faltan casillas por llenar
      if (currentSlots.some(s => s === null)) {
        if (window.MagicAudioEngine) window.MagicAudioEngine.playIncorrect();
        alert(this.formatForGrade('¡Aún te faltan pasos por ubicar! Colocá las 7 tarjetas en las casillas correspondientes antes de comprobar.'));
        return;
      }

      // Comprobar si coinciden con la secuencia exacta (1 a 7)
      const isCorrect = currentSlots.every((cardId, idx) => cardId === idx + 1);

      if (isCorrect) {
        // Acierto Total
        if (window.MagicAudioEngine) window.MagicAudioEngine.playCorrect();
        if (resultBox) {
          resultBox.className = 'activity-result-box active success';
          if (titleEl) titleEl.textContent = this.formatForGrade('¡EXCELENTE! ¡ALGORITMO CORRECTO!');
          if (descEl) {
            descEl.textContent = (actNum === 1)
              ? this.formatForGrade('¡Muy bien! Ordenaste cada instrucción a la perfección. Ahora tus manos están limpias y protegidas.')
              : this.formatForGrade('¡Felicitaciones! El algoritmo de la receta está ordenado de forma lógica y segura. ¡El pastel saldrá riquísimo!');
          }
          if (avatarEl) avatarEl.innerHTML = getBitySvg('celebrating');
        }
        if (reviewBox) reviewBox.classList.add('active');
        if (nextBtn) nextBtn.style.display = 'inline-flex';

        this.completedSteps.add(actNum === 1 ? 4 : 5);
        this.saveProgress();
      } else {
        // Error Pedagógico: Ofrecer pista de Bity sin revelar toda la respuesta
        if (window.MagicAudioEngine) window.MagicAudioEngine.playIncorrect();
        let hintMsg = '';
        if (actNum === 1) {
          // Pista para manos
          const soapIdx = currentSlots.indexOf(3);
          const wetIdx = currentSlots.indexOf(2);
          const tapIdx = currentSlots.indexOf(1);

          if (tapIdx !== 0) {
            hintMsg = this.formatForGrade('¡Casi lo lográs! Pensá qué debemos hacer primero para que salga agua.');
          } else if (soapIdx < wetIdx) {
            hintMsg = this.formatForGrade('¡Casi lo lográs! Pensá qué debemos hacer antes de colocar el jabón. ¿Nos mojamos las manos primero?');
          } else {
            hintMsg = this.formatForGrade('¡Buen intento! Revisá el orden de los últimos pasos: ¿nos secamos antes o después de cerrar la canilla?');
          }
        } else {
          // Pista para pastel
          const mixIdx = currentSlots.indexOf(3);
          const pourIdx = currentSlots.indexOf(2);
          const ovenIdx = currentSlots.indexOf(5);

          if (mixIdx < pourIdx) {
            hintMsg = this.formatForGrade('¡Casi lo lográs! Pensá: antes de mezclar, ¿debemos colocar los ingredientes en el recipiente?');
          } else if (ovenIdx === 0 || ovenIdx === 1) {
            hintMsg = this.formatForGrade('¡Cuidado! El horno caliente va casi al final, luego de colocar la mezcla en el molde.');
          } else {
            hintMsg = this.formatForGrade('¡Muy cerca! Revisá qué hacemos después de hornear: ¿esperamos a que se enfríe antes de servir?');
          }
        }

        if (resultBox) {
          resultBox.className = 'activity-result-box active hint';
          if (titleEl) titleEl.textContent = this.formatForGrade('💡 PISTA DE BITY:');
          if (descEl) descEl.textContent = hintMsg;
          if (avatarEl) avatarEl.innerHTML = getBitySvg('thinking');
        }
      }
    }

    // ============================================================
    // PARTE 6: ACTIVIDAD 3: ESCRIBÍ TUS PROPIOS ALGORITMOS
    // ============================================================
    initAct3() {
      this.renderAct3Inputs();
    }

    selectAct3Option(optKey) {
      if (!ACT3_CONFIG[optKey]) return;
      this.act3SelectedOption = optKey;
      this.act3Steps = [...ACT3_CONFIG[optKey].defaultSteps];

      document.querySelectorAll('.writing-option-card').forEach(c => {
        c.classList.toggle('selected', c.getAttribute('data-act3-opt') === optKey);
      });

      const titleEl = document.getElementById('act3-editor-title');
      if (titleEl) {
        titleEl.textContent = this.formatForGrade(`PASOS PARA: ${ACT3_CONFIG[optKey].name}`);
      }

      const savedCard = document.getElementById('act3-saved-card');
      if (savedCard) savedCard.classList.remove('active');

      if (window.MagicAudioEngine) window.MagicAudioEngine.playClick();
      this.renderAct3Inputs();
    }

    renderAct3Inputs() {
      const container = document.getElementById('act3-steps-container');
      if (!container) return;

      container.innerHTML = '';
      this.act3Steps.forEach((stepText, idx) => {
        const row = document.createElement('div');
        row.className = 'step-input-row';
        row.innerHTML = `
          <span class="step-input-label">${this.formatForGrade('PASO ' + (idx + 1))}</span>
          <input type="text" class="step-text-input" value="${this.formatForGrade(stepText)}" placeholder="${this.formatForGrade('Escribí aquí la instrucción...')}" data-step-idx="${idx}">
          ${this.act3Steps.length > 2 ? `<button type="button" class="btn-remove-step" data-remove-idx="${idx}" title="${this.formatForGrade('Eliminar este paso')}">🗑️</button>` : ''}
        `;

        row.querySelector('.step-text-input').oninput = (e) => {
          this.act3Steps[idx] = e.target.value;
        };

        const removeBtn = row.querySelector('.btn-remove-step');
        if (removeBtn) {
          removeBtn.onclick = () => {
            this.act3Steps.splice(idx, 1);
            this.renderAct3Inputs();
          };
        }

        container.appendChild(row);
      });
    }

    act3AddStep() {
      this.act3Steps.push('');
      if (window.MagicAudioEngine) window.MagicAudioEngine.playClick();
      this.renderAct3Inputs();
    }

    act3Save() {
      // Filtrar pasos vacíos
      const cleanSteps = this.act3Steps.map(s => s.trim()).filter(s => s.length > 0);
      if (cleanSteps.length < 2) {
        alert(this.formatForGrade('Por favor escribí al menos 2 pasos para tu algoritmo.'));
        return;
      }

      this.act3Steps = cleanSteps;
      try {
        localStorage.setItem(`lego_algorithms_act3_g${this.currentGrade}`, JSON.stringify({
          selectedOption: this.act3SelectedOption,
          steps: cleanSteps
        }));
      } catch (e) {}

      // Mostrar ficha de revisión
      const savedCard = document.getElementById('act3-saved-card');
      const heading = document.getElementById('act3-saved-heading');
      const list = document.getElementById('act3-saved-list');
      const nextBtn = document.getElementById('btn-next-act3');

      if (heading) heading.textContent = this.formatForGrade(`ALGORITMO GUARDADO: ${ACT3_CONFIG[this.act3SelectedOption].name}`);
      if (list) {
        list.innerHTML = cleanSteps.map((s, idx) => `
          <li class="saved-step-item">
            <strong>${idx + 1}.</strong> ${this.formatForGrade(s)}
          </li>
        `).join('');
      }

      if (savedCard) savedCard.classList.add('active');
      if (nextBtn) nextBtn.style.display = 'inline-flex';

      if (window.MagicAudioEngine) window.MagicAudioEngine.playCorrect();
      this.completedSteps.add(6);
      this.saveProgress();
    }

    // ============================================================
    // PARTE 7: ACTIVIDAD 4: PIZARRA DIGITAL Y EXPOSICIÓN ESCOLAR
    // ============================================================
    initAct4() {
      this.renderAct4Rows();
    }

    selectAct4Preset(presetId) {
      this.act4SelectedIdea = presetId;
      document.querySelectorAll('.idea-chip').forEach(c => {
        c.classList.toggle('selected', c.getAttribute('data-act4-preset') === presetId);
      });

      const customBox = document.getElementById('custom-idea-box');
      if (presetId === 'custom') {
        if (customBox) customBox.classList.add('active');
        this.act4Title = this.formatForGrade('MI ALGORITMO: OTRA IDEA');
      } else {
        if (customBox) customBox.classList.remove('active');
        const preset = ACT4_PRESETS.find(p => p.id === presetId);
        if (preset) {
          this.act4Title = this.formatForGrade(`MI ALGORITMO: ${preset.label}`);
          this.act4Steps = [...preset.defaultSteps];
        }
      }

      const chalkInput = document.getElementById('chalk-blackboard-title');
      if (chalkInput) chalkInput.value = this.act4Title;

      if (window.MagicAudioEngine) window.MagicAudioEngine.playClick();
      this.renderAct4Rows();
      this.saveAct4();
    }

    setAct4Title(customTitle) {
      this.act4Title = this.formatForGrade(`MI ALGORITMO: ${customTitle}`);
      const chalkInput = document.getElementById('chalk-blackboard-title');
      if (chalkInput) chalkInput.value = this.act4Title;
      this.saveAct4();
    }

    renderAct4Rows() {
      const container = document.getElementById('blackboard-instructions-list');
      if (!container) return;

      container.innerHTML = '';
      this.act4Steps.forEach((stepText, idx) => {
        const row = document.createElement('div');
        row.className = 'blackboard-instruction-row';
        row.innerHTML = `
          <span class="chalk-num">${idx + 1}</span>
          <input type="text" class="chalk-instruction-input" value="${this.formatForGrade(stepText)}" placeholder="${this.formatForGrade('Escribí la instrucción...')}" data-b-idx="${idx}">
          ${this.act4Steps.length > 2 ? `<button type="button" class="btn-remove-step" data-b-remove="${idx}" title="${this.formatForGrade('Eliminar esta instrucción')}">🗑️</button>` : ''}
        `;

        row.querySelector('.chalk-instruction-input').oninput = (e) => {
          this.act4Steps[idx] = e.target.value;
          this.saveAct4();
        };

        const removeBtn = row.querySelector('.btn-remove-step');
        if (removeBtn) {
          removeBtn.onclick = () => {
            this.act4Steps.splice(idx, 1);
            this.renderAct4Rows();
            this.saveAct4();
          };
        }

        container.appendChild(row);
      });
    }

    act4AddRow() {
      this.act4Steps.push('');
      if (window.MagicAudioEngine) window.MagicAudioEngine.playClick();
      this.renderAct4Rows();
      this.saveAct4();
    }

    saveAct4() {
      try {
        localStorage.setItem(`lego_algorithms_act4_g${this.currentGrade}`, JSON.stringify({
          selectedIdea: this.act4SelectedIdea,
          title: this.act4Title,
          steps: this.act4Steps
        }));
      } catch (e) {}
    }

    /**
     * Abre el modal de presentación para el aula
     */
    openPresentationModal() {
      const modal = document.getElementById('modal-algorithm-presentation');
      const titleEl = document.getElementById('pres-modal-title');
      const stepsListEl = document.getElementById('pres-modal-steps-list');

      if (!modal || !titleEl || !stepsListEl) return;

      // Filtrar pasos vacíos
      const cleanSteps = this.act4Steps.map(s => s.trim()).filter(s => s.length > 0);
      if (cleanSteps.length === 0) {
        alert(this.formatForGrade('Por favor escribí al menos una instrucción en tu pizarra digital antes de compartir.'));
        return;
      }

      titleEl.textContent = this.formatForGrade(this.act4Title || 'MI ALGORITMO');
      stepsListEl.innerHTML = cleanSteps.map((s, idx) => `
        <div class="presentation-step-card">
          <span class="presentation-step-num">${idx + 1}</span>
          <span>${this.formatForGrade(s)}</span>
        </div>
      `).join('');

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');

      if (window.MagicAudioEngine) window.MagicAudioEngine.playVictory();
      this.completedSteps.add(7);
      this.saveProgress();
    }

    closePresentationModal() {
      const modal = document.getElementById('modal-algorithm-presentation');
      if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    }

    copyPresentationText() {
      const cleanSteps = this.act4Steps.map(s => s.trim()).filter(s => s.length > 0);
      const textToCopy = `${this.act4Title}\n\n` + cleanSteps.map((s, idx) => `${idx + 1}. ${s}`).join('\n');

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          alert(this.formatForGrade('¡Copiado con éxito! Ahora podés pegarlo en cualquier aplicación o documento para compartirlo.'));
        }).catch(() => {
          this.fallbackCopy(textToCopy);
        });
      } else {
        this.fallbackCopy(textToCopy);
      }
    }

    fallbackCopy(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      alert(this.formatForGrade('¡Copiado con éxito!'));
    }
  }

  // Exportar globalmente
  global.AlgorithmsModule = AlgorithmsModule;
  global.algorithmsModule = new AlgorithmsModule();

})(typeof window !== 'undefined' ? window : this);
