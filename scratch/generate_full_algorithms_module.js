const fs = require('fs');

const code = `/**
 * ========================================================
 * ALGORITMOS — APRENDIZAJE VISUAL, BLOQUES Y DESAFÍOS
 * Pensamiento Computacional para 1.º a 5.º Grado
 * Informática Mágica — Edición Especial
 * ========================================================
 */

(function (global) {
  'use strict';

  // ============================================================
  // 1. REPOSITORIO DE ILUSTRACIONES VECTORIALES SVG
  // ============================================================
  const ALGORITHM_SVGS = {
    // 1.1. Persona Caminando (Acción)
    caminar: \`<svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg" class="alg-svg-illustr">
      <defs>
        <linearGradient id="walkSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#312e81"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <linearGradient id="sneakerGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#2563eb"/>
        </linearGradient>
      </defs>
      <rect width="340" height="220" rx="16" fill="url(#walkSky)"/>
      <ellipse cx="170" cy="195" rx="120" ry="12" fill="rgba(0,0,0,0.35)"/>
      <line x1="20" y1="195" x2="320" y2="195" stroke="#475569" stroke-width="3" stroke-dasharray="8,6"/>
      <!-- Líneas de viento / movimiento -->
      <path d="M 60 110 Q 80 110 95 115" stroke="#facc15" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M 50 130 Q 75 130 90 135" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M 70 90 Q 85 90 95 95" stroke="#f472b6" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <!-- Persona caminando -->
      <g transform="translate(135, 20)">
        <circle cx="30" cy="24" r="18" fill="#fed7aa"/>
        <!-- Gorra deportiva -->
        <path d="M 12 20 Q 30 10 48 20 Q 55 18 58 22 Q 46 25 30 25 Z" fill="#ec4899"/>
        <circle cx="36" cy="22" r="2.5" fill="#1e293b"/>
        <path d="M 32 30 Q 38 34 42 30" stroke="#1e293b" stroke-width="2" fill="none" stroke-linecap="round"/>
        <!-- Torso -->
        <path d="M 18 42 L 44 42 L 48 95 L 14 95 Z" fill="#8b5cf6" rx="6"/>
        <circle cx="31" cy="65" r="8" fill="#facc15"/>
        <!-- Brazo izquierdo atrás -->
        <path d="M 20 48 L 5 70 L 2 85" stroke="#fed7aa" stroke-width="7" stroke-linecap="round" fill="none"/>
        <!-- Brazo derecho adelante -->
        <path d="M 42 48 L 56 68 L 65 78" stroke="#fed7aa" stroke-width="7" stroke-linecap="round" fill="none"/>
        <!-- Pierna izquierda atrás -->
        <path d="M 22 95 L 10 135 L 2 165" stroke="#1e293b" stroke-width="9" stroke-linecap="round" fill="none"/>
        <rect x="-6" y="162" width="22" height="10" rx="4" fill="url(#sneakerGrad)"/>
        <!-- Pierna derecha adelante en paso -->
        <path d="M 40 95 L 55 130 L 72 160" stroke="#1e293b" stroke-width="9" stroke-linecap="round" fill="none"/>
        <rect x="65" y="156" width="24" height="11" rx="4" fill="url(#sneakerGrad)"/>
      </g>
    </svg>\`,

    // 1.2. Pasos del Almacén
    almacen_1_bolsa: \`<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="alg-step-svg">
      <rect width="120" height="120" rx="14" fill="#1e1b4b"/>
      <path d="M 42 35 C 42 20 78 20 78 35" fill="none" stroke="#facc15" stroke-width="5" stroke-linecap="round"/>
      <path d="M 32 40 L 88 40 L 82 100 L 38 100 Z" fill="#10b981" rx="6"/>
      <path d="M 42 50 L 78 50" stroke="#059669" stroke-width="3" stroke-linecap="round"/>
      <circle cx="60" cy="72" r="12" fill="#fef08a"/>
      <path d="M 54 72 L 66 72 M 60 66 L 60 78" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>
    </svg>\`,

    almacen_2_salir: \`<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="alg-step-svg">
      <rect width="120" height="120" rx="14" fill="#1e1b4b"/>
      <!-- Marco de puerta -->
      <rect x="25" y="20" width="70" height="85" fill="#334155" rx="4"/>
      <!-- Luz exterior -->
      <rect x="32" y="26" width="56" height="75" fill="#fef08a"/>
      <!-- Puerta abierta -->
      <polygon points="32,26 70,36 70,95 32,101" fill="#8b5cf6" stroke="#c084fc" stroke-width="2"/>
      <circle cx="64" cy="65" r="3" fill="#fde047"/>
      <!-- Felpudo -->
      <ellipse cx="60" cy="103" rx="26" ry="6" fill="#f59e0b"/>
    </svg>\`,

    almacen_3_camino: \`<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="alg-step-svg">
      <rect width="120" height="120" rx="14" fill="#1e1b4b"/>
      <!-- Vereda con perspectiva -->
      <polygon points="15,110 105,110 75,45 45,45" fill="#475569"/>
      <line x1="60" y1="110" x2="60" y2="45" stroke="#facc15" stroke-width="2.5" stroke-dasharray="6,4"/>
      <!-- Almacén al fondo -->
      <rect x="42" y="25" width="36" height="25" fill="#0284c7" rx="3"/>
      <polygon points="38,25 60,12 82,25" fill="#ef4444"/>
      <rect x="52" y="34" width="16" height="16" fill="#fef08a"/>
      <!-- Árbol en vereda -->
      <rect x="22" y="55" width="6" height="18" fill="#78350f"/>
      <circle cx="25" cy="50" r="14" fill="#10b981"/>
    </svg>\`,

    almacen_4_productos: \`<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="alg-step-svg">
      <rect width="120" height="120" rx="14" fill="#1e1b4b"/>
      <!-- Canasta de compras -->
      <ellipse cx="60" cy="85" rx="36" ry="16" fill="#b45309"/>
      <rect x="24" y="55" width="72" height="30" rx="6" fill="#d97706"/>
      <path d="M 32 55 Q 60 22 88 55" fill="none" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
      <!-- Productos: frutas y pan -->
      <circle cx="44" cy="50" r="10" fill="#ef4444"/> <!-- Manzana -->
      <path d="M 44 40 L 46 36" stroke="#15803d" stroke-width="2"/>
      <circle cx="60" cy="48" r="10" fill="#f97316"/> <!-- Naranja -->
      <rect x="70" y="38" width="14" height="24" rx="4" fill="#38bdf8"/> <!-- Botella -->
      <circle cx="77" cy="36" r="3" fill="#ffffff"/>
    </svg>\`,

    almacen_5_pagar: \`<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="alg-step-svg">
      <rect width="120" height="120" rx="14" fill="#1e1b4b"/>
      <!-- Caja registradora -->
      <rect x="25" y="45" width="70" height="42" rx="6" fill="#334155"/>
      <rect x="35" y="30" width="50" height="20" rx="4" fill="#0284c7"/>
      <text x="60" y="44" fill="#fde047" font-size="11" font-weight="900" text-anchor="middle">\$ 150</text>
      <!-- Teclas -->
      <circle cx="42" cy="62" r="3" fill="#38bdf8"/>
      <circle cx="54" cy="62" r="3" fill="#38bdf8"/>
      <circle cx="66" cy="62" r="3" fill="#38bdf8"/>
      <circle cx="78" cy="62" r="3" fill="#22c55e"/>
      <!-- Monedas doradas -->
      <circle cx="45" cy="98" r="10" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
      <text x="45" y="102" fill="#713f12" font-size="10" font-weight="900" text-anchor="middle">\$</text>
      <circle cx="68" cy="98" r="10" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
      <text x="68" y="102" fill="#713f12" font-size="10" font-weight="900" text-anchor="middle">\$</text>
    </svg>\`,

    almacen_6_regreso: \`<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="alg-step-svg">
      <rect width="120" height="120" rx="14" fill="#1e1b4b"/>
      <!-- Casa al fondo -->
      <rect x="62" y="45" width="45" height="45" fill="#f59e0b" rx="4"/>
      <polygon points="58,45 84,25 110,45" fill="#ef4444"/>
      <rect x="78" y="62" width="14" height="28" fill="#78350f"/>
      <!-- Sol feliz -->
      <circle cx="28" cy="28" r="12" fill="#facc15"/>
      <!-- Persona con bolsa regresando -->
      <circle cx="36" cy="60" r="8" fill="#fed7aa"/>
      <rect x="30" y="68" width="14" height="24" rx="3" fill="#10b981"/>
      <rect x="42" y="74" width="12" height="16" rx="2" fill="#ec4899"/> <!-- Bolsa llena -->
      <line x1="33" y1="92" x2="30" y2="108" stroke="#1e293b" stroke-width="4"/>
      <line x1="40" y1="92" x2="44" y2="108" stroke="#1e293b" stroke-width="4"/>
    </svg>\`,

    // 1.3. Secuencia Desordenada (Error cómico ilustrado)
    secuencia_desordenada: \`<svg viewBox="0 0 340 180" xmlns="http://www.w3.org/2000/svg" class="alg-svg-illustr">
      <rect width="340" height="180" rx="16" fill="#1f1235"/>
      <rect x="15" y="15" width="310" height="150" rx="12" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,4"/>
      <g transform="translate(30, 35)">
        <circle cx="30" cy="45" r="26" fill="#ef4444"/>
        <text x="30" y="54" fill="#ffffff" font-size="28" font-weight="900" text-anchor="middle">✕</text>
      </g>
      <g transform="translate(100, 35)">
        <text x="0" y="22" fill="#f87171" font-size="14" font-weight="900">¿PAGAR ANTES DE IR A COMPRAR?</text>
        <text x="0" y="44" fill="#e2e8f0" font-size="12">¡No tiene sentido! No podemos pagar productos</text>
        <text x="0" y="62" fill="#e2e8f0" font-size="12">que todavía están en el almacén.</text>
        <rect x="0" y="75" width="215" height="28" rx="6" fill="#7f1d1d"/>
        <text x="12" y="93" fill="#fef08a" font-size="11" font-weight="800">⚠️ EL ORDEN DE LOS PASOS SÍ IMPORTA</text>
      </g>
    </svg>\`,

    // 1.4. Concepto de Algoritmo (Bloques ordenados que llevan a la meta)
    algoritmo_concepto: \`<svg viewBox="0 0 380 180" xmlns="http://www.w3.org/2000/svg" class="alg-svg-illustr">
      <defs>
        <linearGradient id="puzzleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1e1b4b"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
      <rect width="380" height="180" rx="16" fill="url(#puzzleGrad)"/>
      <!-- Bloque 1 -->
      <g transform="translate(20, 50)">
        <rect x="0" y="0" width="85" height="65" rx="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
        <text x="42" y="28" fill="#ffffff" font-size="14" font-weight="900" text-anchor="middle">PASO 1</text>
        <text x="42" y="48" fill="#e0f2fe" font-size="11" font-weight="700" text-anchor="middle">Instrucción A</text>
      </g>
      <!-- Flecha 1 -->
      <path d="M 112 82 L 132 82" stroke="#facc15" stroke-width="4" stroke-linecap="round"/>
      <polygon points="132,76 142,82 132,88" fill="#facc15"/>
      <!-- Bloque 2 -->
      <g transform="translate(145, 50)">
        <rect x="0" y="0" width="85" height="65" rx="12" fill="#8b5cf6" stroke="#c084fc" stroke-width="2"/>
        <text x="42" y="28" fill="#ffffff" font-size="14" font-weight="900" text-anchor="middle">PASO 2</text>
        <text x="42" y="48" fill="#f3e8ff" font-size="11" font-weight="700" text-anchor="middle">Instrucción B</text>
      </g>
      <!-- Flecha 2 -->
      <path d="M 237 82 L 257 82" stroke="#facc15" stroke-width="4" stroke-linecap="round"/>
      <polygon points="257,76 267,82 257,88" fill="#facc15"/>
      <!-- Bloque Meta -->
      <g transform="translate(270, 42)">
        <rect x="0" y="0" width="90" height="80" rx="14" fill="#10b981" stroke="#34d399" stroke-width="2.5"/>
        <circle cx="45" cy="32" r="16" fill="#facc15"/>
        <polygon points="45,20 48,28 56,29 50,35 52,43 45,39 38,43 40,35 34,29 42,28" fill="#ffffff"/>
        <text x="45" y="64" fill="#ffffff" font-size="13" font-weight="900" text-anchor="middle">¡META!</text>
      </g>
    </svg>\`,

    // 1.5. Ilustraciones de Metas de Actividades Cotidianas
    cafe_taza: \`<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg" class="alg-goal-svg">
      <ellipse cx="80" cy="120" rx="55" ry="10" fill="rgba(0,0,0,0.35)"/>
      <ellipse cx="80" cy="115" rx="45" ry="8" fill="#e2e8f0"/>
      <!-- Taza -->
      <path d="M 45 45 L 50 105 Q 80 115 110 105 L 115 45 Z" fill="#8b5cf6"/>
      <ellipse cx="80" cy="45" rx="35" ry="10" fill="#4c1d95"/>
      <ellipse cx="80" cy="47" rx="31" ry="8" fill="#78350f"/> <!-- Café espumoso -->
      <!-- Asa de la taza -->
      <path d="M 112 55 Q 138 55 138 75 Q 138 95 108 95" fill="none" stroke="#8b5cf6" stroke-width="8" stroke-linecap="round"/>
      <!-- Vapor caliente animado -->
      <path d="M 65 35 Q 60 22 68 12 Q 74 5 70 0" stroke="#fde047" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M 80 32 Q 76 18 84 10 Q 90 2 86 -2" stroke="#fde047" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M 95 35 Q 90 22 98 12 Q 104 5 100 0" stroke="#fde047" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    </svg>\`,

    jugo_jarra: \`<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg" class="alg-goal-svg">
      <ellipse cx="80" cy="122" rx="48" ry="10" fill="rgba(0,0,0,0.3)"/>
      <!-- Jarra de vidrio -->
      <path d="M 52 35 L 48 110 Q 80 120 112 110 L 108 35 Z" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" stroke-width="3"/>
      <!-- Jugo de naranja en la jarra -->
      <path d="M 50 60 L 48 108 Q 80 118 112 108 L 110 60 Z" fill="#f97316"/>
      <!-- Rodaja de naranja en el borde -->
      <circle cx="108" cy="35" r="14" fill="#facc15" stroke="#ea580c" stroke-width="2"/>
      <circle cx="108" cy="35" r="10" fill="#f97316"/>
      <!-- Asa de la jarra -->
      <path d="M 52 45 Q 26 45 26 75 Q 26 100 50 100" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>
    </svg>\`,

    mochila: \`<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg" class="alg-goal-svg">
      <ellipse cx="80" cy="125" rx="50" ry="10" fill="rgba(0,0,0,0.35)"/>
      <!-- Cuerpo de mochila -->
      <rect x="42" y="32" width="76" height="85" rx="16" fill="#0284c7" stroke="#38bdf8" stroke-width="2.5"/>
      <path d="M 55 32 Q 80 18 105 32" stroke="#0369a1" stroke-width="6" fill="none" stroke-linecap="round"/>
      <!-- Bolsillo delantero -->
      <rect x="52" y="70" width="56" height="40" rx="8" fill="#0284c7" stroke="#bae6fd" stroke-width="2"/>
      <line x1="52" y1="75" x2="108" y2="75" stroke="#facc15" stroke-width="3"/>
      <!-- Llavero Bity colgado -->
      <circle cx="108" cy="55" r="7" fill="#facc15"/>
      <circle cx="108" cy="55" r="2" fill="#0f172a"/>
    </svg>\`,

    habitacion: \`<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg" class="alg-goal-svg">
      <rect width="160" height="140" rx="14" fill="#1e1b4b"/>
      <!-- Ventana con cielo azul -->
      <rect x="18" y="20" width="36" height="40" rx="4" fill="#38bdf8" stroke="#cbd5e1" stroke-width="2"/>
      <line x1="36" y1="20" x2="36" y2="60" stroke="#cbd5e1" stroke-width="1.5"/>
      <line x1="18" y1="40" x2="54" y2="40" stroke="#cbd5e1" stroke-width="1.5"/>
      <!-- Cama hecha -->
      <rect x="65" y="55" width="80" height="50" rx="6" fill="#8b5cf6"/>
      <rect x="68" y="50" width="28" height="18" rx="4" fill="#ffffff"/> <!-- Almohada -->
      <rect x="90" y="65" width="55" height="40" rx="4" fill="#10b981"/> <!-- Acolchado prolijo -->
      <!-- Canasto de juguetes ordenado -->
      <path d="M 22 90 L 46 90 L 42 120 L 26 120 Z" fill="#d97706" rx="3"/>
      <circle cx="34" cy="86" r="6" fill="#ef4444"/> <!-- Pelota ordenada -->
    </svg>\`,

    // 1.6. Mecánico Espacial y Taller (Meta de Desafíos de Programación)
    mecanico_taller: \`<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg" class="alg-goal-svg">
      <rect width="160" height="140" rx="14" fill="#0f172a"/>
      <!-- Taller con herramientas -->
      <rect x="20" y="30" width="120" height="85" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
      <text x="80" y="48" fill="#fde047" font-size="10" font-weight="900" text-anchor="middle">🔧 TALLER MECÁNICO</text>
      <!-- Mecánico sonriente -->
      <g transform="translate(62, 52)">
        <circle cx="18" cy="14" r="12" fill="#fed7aa"/>
        <!-- Gorra naranja -->
        <path d="M 6 12 Q 18 4 30 12 L 36 12" stroke="#ea580c" stroke-width="4" stroke-linecap="round" fill="none"/>
        <circle cx="22" cy="14" r="1.5" fill="#0f172a"/>
        <!-- Overol azul -->
        <rect x="8" y="26" width="20" height="32" rx="4" fill="#0284c7"/>
        <line x1="12" y1="26" x2="12" y2="38" stroke="#facc15" stroke-width="2"/>
        <line x1="24" y1="26" x2="24" y2="38" stroke="#facc15" stroke-width="2"/>
        <!-- Llave inglesa en la mano -->
        <path d="M 28 32 L 40 24" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="42" cy="22" r="4" fill="none" stroke="#94a3b8" stroke-width="2"/>
      </g>
    </svg>\`,

    // 1.7. Mini-íconos SVG para Bloques Cotidianos
    taza: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#4c1d95"/><path d="M10 14 L12 32 Q20 35 28 32 L30 14 Z" fill="#8b5cf6"/><path d="M29 18 Q36 18 36 24 Q36 30 28 30" stroke="#8b5cf6" stroke-width="2.5" fill="none"/><line x1="16" y1="10" x2="16" y2="6" stroke="#facc15" stroke-width="1.5"/></svg>\`,
    cafe_polvo: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#451a03"/><circle cx="20" cy="20" r="12" fill="#78350f"/><path d="M15 20 Q20 14 25 20" stroke="#facc15" stroke-width="2" fill="none"/></svg>\`,
    pava: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#1e293b"/><path d="M12 18 L10 32 L30 32 L28 18 Z" fill="#94a3b8"/><path d="M14 18 Q20 10 26 18" stroke="#f59e0b" stroke-width="2.5" fill="none"/><line x1="28" y1="22" x2="35" y2="18" stroke="#94a3b8" stroke-width="2.5"/></svg>\`,
    agua_caliente: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#0369a1"/><path d="M20 8 Q28 20 28 28 A8 8 0 0 1 12 28 Q12 20 20 8 Z" fill="#38bdf8"/><path d="M16 6 Q20 2 24 6" stroke="#facc15" stroke-width="1.5" fill="none"/></svg>\`,
    cuchara: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#334155"/><ellipse cx="15" cy="15" rx="6" ry="8" fill="#cbd5e1" transform="rotate(-30 15 15)"/><line x1="19" y1="20" x2="32" y2="33" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/></svg>\`,
    servir_taza: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#15803d"/><rect x="6" y="28" width="28" height="4" rx="2" fill="#e2e8f0"/><rect x="12" y="16" width="16" height="12" rx="3" fill="#8b5cf6"/></svg>\`,
    sal: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#ef4444"/><rect x="14" y="14" width="12" height="18" rx="3" fill="#ffffff"/><text x="20" y="27" font-size="9" font-weight="900" fill="#0f172a" text-anchor="middle">SAL</text></svg>\`,
    pijama: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#6366f1"/><path d="M12 12 L28 12 L32 30 L8 30 Z" fill="#a5b4fc"/><line x1="20" y1="12" x2="20" y2="30" stroke="#4f46e5" stroke-width="2"/></svg>\`,
    cartuchera: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#0284c7"/><rect x="8" y="14" width="24" height="14" rx="5" fill="#38bdf8"/><line x1="8" y1="18" x2="32" y2="18" stroke="#facc15" stroke-width="2"/></svg>\`,

    jarra: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#0e7490"/><path d="M14 10 L12 32 Q20 36 28 32 L26 10 Z" fill="#22d3ee" opacity="0.8"/></svg>\`,
    frutas: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#ea580c"/><circle cx="16" cy="22" r="8" fill="#f97316"/><circle cx="26" cy="20" r="7" fill="#ef4444"/></svg>\`,
    lavar_fruta: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#0284c7"/><circle cx="20" cy="24" r="8" fill="#f97316"/><path d="M20 8 L20 14" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/></svg>\`,
    cortar_fruta: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#b45309"/><ellipse cx="20" cy="26" rx="10" ry="6" fill="#f97316"/><line x1="12" y1="12" x2="28" y2="28" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round"/></svg>\`,
    exprimir: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#f59e0b"/><polygon points="20,10 14,24 26,24" fill="#ea580c"/><rect x="16" y="24" width="8" height="8" fill="#78350f"/></svg>\`,
    jarra_agua: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#0369a1"/><path d="M14 12 L12 30 Q20 34 28 30 L26 12 Z" fill="#38bdf8"/></svg>\`,
    servir_jugo: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#15803d"/><rect x="14" y="16" width="12" height="16" rx="2" fill="#f97316"/></svg>\`,
    pimienta: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#18181b"/><rect x="14" y="14" width="12" height="18" rx="3" fill="#27272a"/><text x="20" y="26" font-size="7" font-weight="900" fill="#ffffff" text-anchor="middle">PIM</text></svg>\`,
    bicicleta: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#475569"/><circle cx="13" cy="26" r="6" stroke="#facc15" stroke-width="2" fill="none"/><circle cx="27" cy="26" r="6" stroke="#facc15" stroke-width="2" fill="none"/><line x1="13" y1="26" x2="20" y2="18" stroke="#ffffff" stroke-width="2"/></svg>\`,
    zapatilla: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#334155"/><rect x="10" y="22" width="20" height="8" rx="3" fill="#ec4899"/><path d="M16 16 L20 22" stroke="#ffffff" stroke-width="1.5"/></svg>\`,

    horario: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#4338ca"/><rect x="10" y="10" width="20" height="22" rx="3" fill="#ffffff"/><line x1="14" y1="16" x2="26" y2="16" stroke="#4f46e5" stroke-width="1.5"/><line x1="14" y1="21" x2="26" y2="21" stroke="#4f46e5" stroke-width="1.5"/><line x1="14" y1="26" x2="22" y2="26" stroke="#4f46e5" stroke-width="1.5"/></svg>\`,
    cuadernos: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#047857"/><rect x="10" y="10" width="18" height="22" rx="2" fill="#10b981"/><line x1="14" y1="10" x2="14" y2="32" stroke="#065f46" stroke-width="2"/></svg>\`,
    guardar_libros: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#0284c7"/><rect x="10" y="16" width="20" height="16" rx="3" fill="#0ea5e9"/><line x1="20" y1="8" x2="20" y2="18" stroke="#facc15" stroke-width="2.5"/><polygon points="16,16 20,21 24,16" fill="#facc15"/></svg>\`,
    mochila_cerrada: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#0369a1"/><rect x="10" y="12" width="20" height="20" rx="5" fill="#38bdf8"/><circle cx="20" cy="18" r="2.5" fill="#facc15"/></svg>\`,
    cepillo: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#38bdf8"/><rect x="8" y="18" width="24" height="4" rx="2" fill="#ffffff"/><rect x="24" y="14" width="8" height="4" fill="#38bdf8"/></svg>\`,
    sarten: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#475569"/><circle cx="18" cy="20" r="10" fill="#1e293b"/><line x1="26" y1="24" x2="34" y2="28" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/></svg>\`,
    auto: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#b91c1c"/><rect x="10" y="18" width="20" height="10" rx="2" fill="#ef4444"/><circle cx="14" cy="28" r="3" fill="#0f172a"/><circle cx="26" cy="28" r="3" fill="#0f172a"/></svg>\`,

    juguetes: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#b45309"/><circle cx="16" cy="24" r="6" fill="#ef4444"/><rect x="22" y="18" width="10" height="10" fill="#3b82f6"/></svg>\`,
    canasto: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#a16207"/><path d="M10 16 L13 32 L27 32 L30 16 Z" fill="#ca8a04"/><line x1="12" y1="16" x2="28" y2="16" stroke="#713f12" stroke-width="2"/></svg>\`,
    repisa: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#581c87"/><line x1="6" y1="28" x2="34" y2="28" stroke="#e2e8f0" stroke-width="3"/><rect x="10" y="14" width="5" height="14" fill="#ec4899"/><rect x="17" y="12" width="6" height="16" fill="#3b82f6"/><rect x="25" y="15" width="5" height="13" fill="#10b981"/></svg>\`,
    ropa: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#1e1b4b"/><path d="M12 14 L28 14 L30 28 L10 28 Z" fill="#ec4899"/><path d="M16 14 Q20 18 24 14" stroke="#ffffff" stroke-width="1.5" fill="none"/></svg>\`,
    cama: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#065f46"/><rect x="8" y="18" width="24" height="14" rx="2" fill="#10b981"/><rect x="9" y="16" width="8" height="6" rx="2" fill="#ffffff"/></svg>\`,
    regar: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#0284c7"/><rect x="12" y="18" width="14" height="12" rx="3" fill="#0284c7"/><path d="M26 22 L32 18" stroke="#38bdf8" stroke-width="2"/></svg>\`,
    futbol: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#15803d"/><circle cx="20" cy="20" r="10" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/><circle cx="20" cy="20" r="3" fill="#0f172a"/></svg>\`,
    paraguas: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#701a75"/><path d="M10 22 Q20 10 30 22 Z" fill="#ec4899"/><line x1="20" y1="22" x2="20" y2="32" stroke="#ffffff" stroke-width="2"/><path d="M20 32 Q23 35 25 32" stroke="#ffffff" stroke-width="2" fill="none"/></svg>\`
  };

  function getBitySvg(mood = 'happy') {
    const eyeColor = mood === 'thinking' ? '#facc15' : (mood === 'celebrating' ? '#34d399' : (mood === 'alert' ? '#f87171' : '#38bdf8'));
    return \`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="bity-svg-avatar" aria-label="Bity el robot">
      <circle cx="50" cy="50" r="46" fill="#1e1b4b" stroke="#8b5cf6" stroke-width="3"/>
      <!-- Antena -->
      <rect x="47" y="10" width="6" height="14" fill="#a855f7" rx="3"/>
      <circle cx="50" cy="9" r="6" fill="#facc15"/>
      <!-- Cabeza -->
      <rect x="25" y="24" width="50" height="42" rx="12" fill="#312e81" stroke="#6366f1" stroke-width="2.5"/>
      <rect x="32" y="32" width="36" height="24" rx="6" fill="#0f172a"/>
      \${mood === 'thinking' ? \`
        <circle cx="40" cy="44" r="4" fill="\${eyeColor}"/>
        <circle cx="60" cy="44" r="4" fill="\${eyeColor}"/>
        <line x1="34" y1="38" x2="45" y2="40" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
      \` : mood === 'alert' ? \`
        <circle cx="40" cy="44" r="4.5" fill="\${eyeColor}"/>
        <circle cx="60" cy="44" r="4.5" fill="\${eyeColor}"/>
        <line x1="34" y1="38" x2="44" y2="42" stroke="#f87171" stroke-width="2"/>
        <line x1="66" y1="38" x2="56" y2="42" stroke="#f87171" stroke-width="2"/>
      \` : \`
        <circle cx="40" cy="44" r="4.5" fill="\${eyeColor}"/>
        <circle cx="60" cy="44" r="4.5" fill="\${eyeColor}"/>
      \`}
      \${mood === 'celebrating' || mood === 'happy' ? \`
        <path d="M 44 54 Q 50 58 56 54" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
      \` : \`
        <line x1="46" y1="54" x2="54" y2="54" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
      \`}
    </svg>\`;
  }

  // Exports for validation
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ALGORITHM_SVGS, getBitySvg };
  }
})(typeof window !== 'undefined' ? window : global);
`;

fs.writeFileSync('scratch/test_svg_export.js', code);
console.log('SVG block created successfully.');
