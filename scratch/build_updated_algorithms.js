const fs = require('fs');
const path = require('path');

console.log('Writing updated algorithmsModule.js with immediate movement, zero flicker, and animated transitions...');

// Load verified mazes
const mazesCode = fs.readFileSync(path.join(__dirname, 'design_all_5_grades_mazes.js'), 'utf8');
const mazesStart = mazesCode.indexOf('const ALL_MAZES = {');
const mazesEnd = mazesCode.indexOf('// Test and verify all 20 mazes');
const allMazesContent = mazesCode.substring(mazesStart, mazesEnd).trim();

// Load verified everyday activities
const activitiesCode = fs.readFileSync(path.join(__dirname, 'verify_everyday_activities.js'), 'utf8');
const actStart = activitiesCode.indexOf('const EVERYDAY_ACTIVITIES = {');
const actEnd = activitiesCode.indexOf('console.log(');
const allActivitiesContent = activitiesCode.substring(actStart, actEnd).trim();

const fullModuleJs = `/**
 * ========================================================
 * ALGORITMOS — APRENDIZAJE VISUAL, BLOQUES Y DESAFÍOS
 * Pensamiento Computacional para 1.º a 5.º Grado
 * Informática Mágica — Edición Especial Interactiva
 * ========================================================
 */

(function (global) {
  'use strict';

  // ============================================================
  // 1. REPOSITORIO DE ILUSTRACIONES VECTORIALES SVG
  // ============================================================
  const ALGORITHM_SVGS = {
    // 1.0. Ilustración de Varios Pasos Ordenados (Definición de Algoritmo)
    definicion_algoritmo_pasos: \`<svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" class="alg-svg-illustr" aria-label="Pasos ordenados de un algoritmo">
      <defs>
        <linearGradient id="defSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1e1145"/>
          <stop offset="100%" stop-color="#0c0721"/>
        </linearGradient>
        <linearGradient id="step1Grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
        <linearGradient id="step2Grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#a855f7"/>
          <stop offset="100%" stop-color="#7c3aed"/>
        </linearGradient>
        <linearGradient id="step3Grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#d97706"/>
        </linearGradient>
        <linearGradient id="stepGoalGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#34d399"/>
          <stop offset="100%" stop-color="#059669"/>
        </linearGradient>
      </defs>
      <rect width="420" height="220" rx="18" fill="url(#defSky)" stroke="#8b5cf6" stroke-width="2"/>
      
      <circle cx="30" cy="30" r="1.5" fill="#facc15"/>
      <circle cx="100" cy="20" r="1.2" fill="#ffffff"/>
      <circle cx="210" cy="15" r="1.5" fill="#facc15"/>
      <circle cx="320" cy="25" r="1.2" fill="#ffffff"/>
      <circle cx="390" cy="40" r="2" fill="#facc15"/>

      <rect x="110" y="14" width="200" height="24" rx="12" fill="rgba(168,85,247,0.25)" stroke="rgba(168,85,247,0.5)" stroke-width="1"/>
      <text x="210" y="30" fill="#e9d5ff" font-size="11" font-weight="900" text-anchor="middle">PASOS ORDENADOS 1 ➔ 2 ➔ 3 ➔ ⭐</text>

      <g transform="translate(15, 52)">
        <!-- Paso 1 -->
        <g transform="translate(0, 0)">
          <rect x="0" y="0" width="76" height="92" rx="12" fill="url(#step1Grad)" stroke="#7dd3fc" stroke-width="2"/>
          <circle cx="38" cy="22" r="13" fill="#0369a1"/>
          <text x="38" y="27" fill="#ffffff" font-size="13" font-weight="900" text-anchor="middle">1</text>
          <text x="38" y="54" font-size="20" text-anchor="middle">💡</text>
          <rect x="8" y="66" width="60" height="18" rx="5" fill="rgba(15,23,42,0.45)"/>
          <text x="38" y="79" fill="#ffffff" font-size="9" font-weight="900" text-anchor="middle">PASO 1</text>
        </g>

        <!-- Flecha 1 -->
        <g transform="translate(80, 36)">
          <path d="M 0 10 L 14 10" stroke="#facc15" stroke-width="3.5" stroke-linecap="round"/>
          <polygon points="18,10 11,5 11,15" fill="#facc15"/>
        </g>

        <!-- Paso 2 -->
        <g transform="translate(102, 0)">
          <rect x="0" y="0" width="76" height="92" rx="12" fill="url(#step2Grad)" stroke="#c084fc" stroke-width="2"/>
          <circle cx="38" cy="22" r="13" fill="#581c87"/>
          <text x="38" y="27" fill="#ffffff" font-size="13" font-weight="900" text-anchor="middle">2</text>
          <text x="38" y="54" font-size="20" text-anchor="middle">⚙️</text>
          <rect x="8" y="66" width="60" height="18" rx="5" fill="rgba(15,23,42,0.45)"/>
          <text x="38" y="79" fill="#ffffff" font-size="9" font-weight="900" text-anchor="middle">PASO 2</text>
        </g>

        <!-- Flecha 2 -->
        <g transform="translate(182, 36)">
          <path d="M 0 10 L 14 10" stroke="#facc15" stroke-width="3.5" stroke-linecap="round"/>
          <polygon points="18,10 11,5 11,15" fill="#facc15"/>
        </g>

        <!-- Paso 3 -->
        <g transform="translate(204, 0)">
          <rect x="0" y="0" width="76" height="92" rx="12" fill="url(#step3Grad)" stroke="#fde047" stroke-width="2"/>
          <circle cx="38" cy="22" r="13" fill="#92400e"/>
          <text x="38" y="27" fill="#ffffff" font-size="13" font-weight="900" text-anchor="middle">3</text>
          <text x="38" y="54" font-size="20" text-anchor="middle">🧩</text>
          <rect x="8" y="66" width="60" height="18" rx="5" fill="rgba(15,23,42,0.45)"/>
          <text x="38" y="79" fill="#ffffff" font-size="9" font-weight="900" text-anchor="middle">PASO 3</text>
        </g>

        <!-- Flecha 3 -->
        <g transform="translate(284, 36)">
          <path d="M 0 10 L 14 10" stroke="#facc15" stroke-width="3.5" stroke-linecap="round"/>
          <polygon points="18,10 11,5 11,15" fill="#facc15"/>
        </g>

        <!-- Paso 4: Objetivo Logrado -->
        <g transform="translate(306, 0)">
          <rect x="0" y="0" width="84" height="92" rx="12" fill="url(#stepGoalGrad)" stroke="#6ee7b7" stroke-width="2.5"/>
          <circle cx="42" cy="22" r="13" fill="#065f46"/>
          <text x="42" y="27" fill="#fef08a" font-size="13" font-weight="900" text-anchor="middle">⭐</text>
          <text x="42" y="55" font-size="22" text-anchor="middle">🎯</text>
          <rect x="6" y="66" width="72" height="18" rx="5" fill="rgba(6,95,70,0.7)"/>
          <text x="42" y="79" fill="#d1fae5" font-size="9" font-weight="900" text-anchor="middle">OBJETIVO</text>
        </g>
      </g>

      <rect x="25" y="162" width="370" height="42" rx="12" fill="rgba(15,23,42,0.75)" stroke="#6366f1" stroke-width="1.2"/>
      <text x="48" y="188" font-size="20">🤖</text>
      <text x="75" y="188" fill="#e2e8f0" font-size="11" font-weight="800">Seguimos las instrucciones paso a paso para cumplir la meta.</text>
    </svg>\`,

    // 1.1. Persona Caminando (Acción)
    caminar: \`<svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg" class="alg-svg-illustr" aria-label="Persona caminando">
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
      <path d="M 60 110 Q 80 110 95 115" stroke="#facc15" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M 50 130 Q 75 130 90 135" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M 70 90 Q 85 90 95 95" stroke="#f472b6" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <g transform="translate(135, 20)">
        <circle cx="30" cy="24" r="18" fill="#fed7aa"/>
        <path d="M 12 20 Q 30 10 48 20 Q 55 18 58 22 Q 46 25 30 25 Z" fill="#ec4899"/>
        <circle cx="36" cy="22" r="2.5" fill="#1e293b"/>
        <path d="M 32 30 Q 38 34 42 30" stroke="#1e293b" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M 18 42 L 44 42 L 48 95 L 14 95 Z" fill="#8b5cf6" rx="6"/>
        <circle cx="31" cy="65" r="8" fill="#facc15"/>
        <path d="M 20 48 L 5 70 L 2 85" stroke="#fed7aa" stroke-width="7" stroke-linecap="round" fill="none"/>
        <path d="M 42 48 L 56 68 L 65 78" stroke="#fed7aa" stroke-width="7" stroke-linecap="round" fill="none"/>
        <path d="M 22 95 L 10 135 L 2 165" stroke="#1e293b" stroke-width="9" stroke-linecap="round" fill="none"/>
        <rect x="-6" y="162" width="22" height="10" rx="4" fill="url(#sneakerGrad)"/>
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
      <rect x="25" y="20" width="70" height="85" fill="#334155" rx="4"/>
      <rect x="32" y="26" width="56" height="75" fill="#fef08a"/>
      <polygon points="32,26 70,36 70,95 32,101" fill="#8b5cf6" stroke="#c084fc" stroke-width="2"/>
      <circle cx="64" cy="65" r="3" fill="#fde047"/>
      <ellipse cx="60" cy="103" rx="26" ry="6" fill="#f59e0b"/>
    </svg>\`,

    almacen_3_camino: \`<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="alg-step-svg">
      <rect width="120" height="120" rx="14" fill="#1e1b4b"/>
      <polygon points="15,110 105,110 75,45 45,45" fill="#475569"/>
      <line x1="60" y1="110" x2="60" y2="45" stroke="#facc15" stroke-width="2.5" stroke-dasharray="6,4"/>
      <rect x="42" y="25" width="36" height="25" fill="#0284c7" rx="3"/>
      <polygon points="38,25 60,12 82,25" fill="#ef4444"/>
      <rect x="52" y="34" width="16" height="16" fill="#fef08a"/>
      <rect x="22" y="55" width="6" height="18" fill="#78350f"/>
      <circle cx="25" cy="50" r="14" fill="#10b981"/>
    </svg>\`,

    almacen_4_productos: \`<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="alg-step-svg">
      <rect width="120" height="120" rx="14" fill="#1e1b4b"/>
      <ellipse cx="60" cy="85" rx="36" ry="16" fill="#b45309"/>
      <path d="M 28 85 L 36 50 L 84 50 L 92 85 Z" fill="#d97706" rx="4"/>
      <path d="M 38 50 Q 60 18 82 50" fill="none" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
      <rect x="42" y="34" width="14" height="22" rx="3" fill="#38bdf8"/>
      <circle cx="68" cy="42" r="10" fill="#ef4444"/>
      <rect x="54" y="26" width="12" height="28" rx="2" fill="#facc15"/>
    </svg>\`,

    almacen_5_pagar: \`<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="alg-step-svg">
      <rect width="120" height="120" rx="14" fill="#1e1b4b"/>
      <rect x="15" y="70" width="90" height="38" rx="4" fill="#334155"/>
      <rect x="45" y="44" width="38" height="28" rx="4" fill="#0284c7"/>
      <rect x="52" y="48" width="24" height="10" rx="2" fill="#0f172a"/>
      <text x="64" y="56" fill="#38bdf8" font-size="7" font-weight="900" text-anchor="middle">$100</text>
      <rect x="22" y="50" width="20" height="12" rx="2" fill="#10b981" transform="rotate(-15 22 50)"/>
      <circle cx="34" cy="54" r="2.5" fill="#047857"/>
      <circle cx="36" cy="64" r="5" fill="#facc15"/>
    </svg>\`,

    almacen_6_regresar: \`<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="alg-step-svg">
      <rect width="120" height="120" rx="14" fill="#1e1b4b"/>
      <rect x="30" y="45" width="60" height="58" rx="4" fill="#6366f1"/>
      <polygon points="20,48 60,18 100,48" fill="#ec4899"/>
      <rect x="50" y="65" width="20" height="38" fill="#fbbf24" rx="3"/>
      <circle cx="66" cy="85" r="2" fill="#78350f"/>
      <rect x="34" y="54" width="12" height="12" fill="#fef08a" rx="2"/>
      <rect x="74" y="54" width="12" height="12" fill="#fef08a" rx="2"/>
      <polygon points="60,8 62,12 66,13 62,15 60,19 58,15 54,13 58,12" fill="#fde047"/>
    </svg>\`,

    // 1.3. Secuencia desordenada (Demostración de error pedagógico)
    secuencia_desordenada: \`<svg viewBox="0 0 340 180" xmlns="http://www.w3.org/2000/svg" class="alg-svg-illustr" aria-label="Error por desorden">
      <rect width="340" height="180" rx="16" fill="#2d122d" stroke="#f43f5e" stroke-width="2"/>
      <circle cx="65" cy="85" r="35" fill="rgba(244, 63, 94, 0.2)"/>
      <text x="65" y="98" font-size="38" text-anchor="middle">❌</text>
      <rect x="120" y="35" width="200" height="110" rx="12" fill="rgba(15, 23, 42, 0.75)" stroke="#fda4af" stroke-width="1.5"/>
      <text x="220" y="62" fill="#fca5a5" font-size="13" font-weight="900" text-anchor="middle">¿PAGAR ANTES DE ELEGIR?</text>
      <text x="220" y="85" fill="#fecdd3" font-size="11" text-anchor="middle">¡No sabemos qué compramos</text>
      <text x="220" y="103" fill="#fecdd3" font-size="11" text-anchor="middle">ni cuánto cuesta!</text>
      <path d="M 140 125 L 300 125" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4,4"/>
      <text x="220" y="138" fill="#fda4af" font-size="10" font-weight="700" text-anchor="middle">El orden de los pasos es fundamental.</text>
    </svg>\`,

    // 1.4. Tarjeta del Concepto Central de Algoritmo
    algoritmo_concepto: \`<svg viewBox="0 0 360 170" xmlns="http://www.w3.org/2000/svg" class="alg-svg-illustr" aria-label="Concepto de algoritmo">
      <defs>
        <linearGradient id="concBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1e1b4b"/>
          <stop offset="100%" stop-color="#311042"/>
        </linearGradient>
      </defs>
      <rect width="360" height="170" rx="16" fill="url(#concBg)" stroke="#a855f7" stroke-width="2"/>
      <g transform="translate(25, 45)">
        <rect x="0" y="15" width="75" height="50" rx="8" fill="#3b82f6"/>
        <text x="37" y="38" fill="#ffffff" font-size="11" font-weight="900" text-anchor="middle">1. INICIO</text>
        <path d="M 75 35 L 85 40 L 75 45 Z" fill="#3b82f6"/>
        <path d="M 85 40 L 105 40" stroke="#facc15" stroke-width="3" stroke-linecap="round"/>
        <polygon points="105,40 98,35 98,45" fill="#facc15"/>
        <rect x="110" y="15" width="85" height="50" rx="8" fill="#8b5cf6"/>
        <text x="152" y="38" fill="#ffffff" font-size="11" font-weight="900" text-anchor="middle">2. PASOS</text>
        <path d="M 195 40 L 215 40" stroke="#facc15" stroke-width="3" stroke-linecap="round"/>
        <polygon points="215,40 208,35 208,45" fill="#facc15"/>
        <rect x="220" y="10" width="85" height="60" rx="8" fill="#10b981" stroke="#34d399" stroke-width="2"/>
        <text x="262" y="36" fill="#ffffff" font-size="12" font-weight="900" text-anchor="middle">⭐ META</text>
        <text x="262" y="55" fill="#d1fae5" font-size="9" font-weight="700" text-anchor="middle">RESUELTO</text>
      </g>
      <polygon points="40,25 43,30 48,31 44,34 45,39 40,36 35,39 36,34 32,31 37,30" fill="#fde047"/>
      <polygon points="330,120 332,124 336,125 333,128 334,132 330,129 326,132 327,128 324,125 328,124" fill="#38bdf8"/>
    </svg>\`,

    // 1.5. Ilustración de Gran Meta: Taller Mecánico
    mecanico_taller: \`<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" class="alg-step-svg">
      <rect width="160" height="120" rx="14" fill="#0f172a" stroke="#eab308" stroke-width="2"/>
      <rect x="15" y="25" width="130" height="85" rx="8" fill="#1e293b"/>
      <text x="80" y="42" fill="#fde047" font-size="10" font-weight="900" text-anchor="middle">🔧 TALLER MECÁNICO</text>
      <g transform="translate(62, 48)">
        <circle cx="18" cy="14" r="12" fill="#fed7aa"/>
        <path d="M 6 12 Q 18 4 30 12 L 36 12" stroke="#ea580c" stroke-width="4" stroke-linecap="round" fill="none"/>
        <circle cx="22" cy="14" r="1.5" fill="#0f172a"/>
        <rect x="8" y="26" width="20" height="32" rx="4" fill="#0284c7"/>
        <line x1="12" y1="26" x2="12" y2="38" stroke="#facc15" stroke-width="2"/>
        <line x1="24" y1="26" x2="24" y2="38" stroke="#facc15" stroke-width="2"/>
        <path d="M 28 32 L 40 24" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="42" cy="22" r="4" fill="none" stroke="#94a3b8" stroke-width="2"/>
      </g>
    </svg>\`,

    // 1.6. Mini-íconos SVG para Bloques Cotidianos
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
    servir_jugo: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#15803d"/><rect x="12" y="16" width="16" height="20" rx="3" fill="#ea580c"/><line x1="16" y1="10" x2="24" y2="10" stroke="#facc15" stroke-width="2"/></svg>\`,
    pimienta: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#1e293b"/><circle cx="20" cy="20" r="10" fill="#0f172a"/><circle cx="18" cy="18" r="1" fill="#ffffff"/><circle cx="22" cy="22" r="1" fill="#ffffff"/></svg>\`,
    bicicleta: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#0369a1"/><circle cx="13" cy="26" r="6" stroke="#38bdf8" stroke-width="2" fill="none"/><circle cx="27" cy="26" r="6" stroke="#38bdf8" stroke-width="2" fill="none"/><path d="M13 26 L20 18 L27 26" stroke="#38bdf8" stroke-width="2" fill="none"/></svg>\`,
    zapatilla: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#7c3aed"/><path d="M10 26 L14 18 L24 20 L30 26 Z" fill="#a78bfa"/><line x1="16" y1="20" x2="22" y2="24" stroke="#ffffff" stroke-width="1.5"/></svg>\`,

    mochila: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#1d4ed8"/><rect x="10" y="12" width="20" height="22" rx="5" fill="#3b82f6"/><path d="M14 12 Q20 6 26 12" stroke="#1d4ed8" stroke-width="2.5" fill="none"/></svg>\`,
    horario: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#0f766e"/><rect x="10" y="10" width="20" height="22" rx="3" fill="#ccfbf1"/><line x1="14" y1="16" x2="26" y2="16" stroke="#0f766e" stroke-width="1.5"/><line x1="14" y1="22" x2="26" y2="22" stroke="#0f766e" stroke-width="1.5"/></svg>\`,
    cuadernos: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#b91c1c"/><rect x="12" y="10" width="16" height="22" rx="3" fill="#ef4444"/><line x1="14" y1="10" x2="14" y2="32" stroke="#ffffff" stroke-width="2"/></svg>\`,
    guardar_libros: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#1e3a8a"/><rect x="10" y="12" width="20" height="20" rx="4" fill="#3b82f6"/><path d="M20 8 L20 20 M16 16 L20 20 L24 16" stroke="#facc15" stroke-width="2" stroke-linecap="round"/></svg>\`,
    mochila_cerrada: \`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#1e40af"/><rect x="10" y="12" width="20" height="22" rx="5" fill="#2563eb"/><line x1="20" y1="14" x2="20" y2="26" stroke="#facc15" stroke-width="2"/><circle cx="20" cy="18" r="2.5" fill="#facc15"/></svg>\`,
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

  // 1.7. Avatar de Bity con expresiones
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

  // ============================================================
  // 2. ACTIVIDADES COTIDIANAS (PARTE 2)
  // ============================================================
  ${allActivitiesContent}

  // ============================================================
  // 3. LABERINTOS DE PROGRAMACIÓN EN BLOQUES (PARTES 3 Y 4)
  // ============================================================
  ${allMazesContent}

  // ============================================================
  // 4. CLASE CONTROLADORA: AlgorithmsModule
  // ============================================================
  class AlgorithmsModule {
    constructor() {
      this.currentGrade = 1;
      this.currentStep = 1;
      this.totalSteps = 7;
      this.completedSteps = new Set();
      
      // Estado de actividades cotidianas
      this.selectedEverydayAct = 'cafe';
      this.everydayState = {
        cafe: { placed: [], selectedBlock: null, completed: false, errorMsg: null },
        jugo: { placed: [], selectedBlock: null, completed: false, errorMsg: null },
        mochila: { placed: [], selectedBlock: null, completed: false, errorMsg: null },
        habitacion: { placed: [], selectedBlock: null, completed: false, errorMsg: null }
      };

      // Estado de programación de laberintos
      this.program = [];
      this.bityPos = { x: 1, y: 1 };
      this.bityFacing = 'right';
      this.isMoving = false;
      this.inputQueue = [];
      this.mazeResult = null; // null | 'reached' | 'collision'

      // Transición animada
      this.isTransitioning = false;

      // Estado de Pregunta de Parte 1
      this.orderQuestionAnswered = false;
      this.orderQuestionAnswer = null;

      // Pista interactiva de Bity
      this.activeHint = null;
    }

    // Adaptación textual según grado: 1.º Grado TODO EN MAYÚSCULAS
    txt(str) {
      if (!str) return '';
      if (this.currentGrade === 1) {
        return str.toUpperCase();
      }
      return str;
    }

    playSound(name) {
      try {
        if (typeof window !== 'undefined' && window.MagicAudioEngine) {
          if (name === 'victory' && typeof window.MagicAudioEngine.playVictory === 'function') {
            window.MagicAudioEngine.playVictory();
            return;
          }
          if (name === 'pop' && typeof window.MagicAudioEngine.playPop === 'function') {
            window.MagicAudioEngine.playPop();
            return;
          }
          if (name === 'trash' && typeof window.MagicAudioEngine.playTrash === 'function') {
            window.MagicAudioEngine.playTrash();
            return;
          }
          if (name === 'error' && typeof window.MagicAudioEngine.playError === 'function') {
            window.MagicAudioEngine.playError();
            return;
          }
          if (typeof window.MagicAudioEngine.playClick === 'function') {
            window.MagicAudioEngine.playClick();
            return;
          }
        }
      } catch (e) {
        // Audio fallback safe
      }
    }

    startClass(grade = 1, classNum = 1) {
      this.currentGrade = parseInt(grade) || 1;
      this.loadSavedProgress();
      this.resetMazeState();
      this.orderQuestionAnswered = false;
      this.orderQuestionAnswer = null;
      this.activeHint = null;
      this.isTransitioning = false;
      this.inputQueue = [];
      this.isMoving = false;

      // Iniciar en el primer paso pendiente o en el paso 1
      if (!this.currentStep || this.currentStep < 1 || this.currentStep > 7) {
        this.currentStep = 1;
      }

      this.render();
      window.scrollTo(0, 0);
    }

    loadSavedProgress() {
      try {
        const raw = localStorage.getItem(\`lego_algorithms_class1_progress_g\${this.currentGrade}\`);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed.completedSteps)) {
            this.completedSteps = new Set(parsed.completedSteps);
          }
        } else {
          this.completedSteps = new Set();
        }
      } catch (e) {
        this.completedSteps = new Set();
      }
    }

    // Guardar progreso SIN salir del módulo (NO llama a renderSyllabus)
    saveProgress() {
      try {
        const isCompleted = this.completedSteps.size >= this.totalSteps;
        const data = {
          grade: this.currentGrade,
          classNum: 1,
          completedSteps: Array.from(this.completedSteps),
          isCompleted: isCompleted,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem(\`lego_algorithms_class1_progress_g\${this.currentGrade}\`, JSON.stringify(data));
      } catch (e) {}
    }

    selectStep(stepNum) {
      const oldModal = document.getElementById('alg-transition-modal');
      if (oldModal) oldModal.remove();
      this.isTransitioning = false;
      this.inputQueue = [];
      this.isMoving = false;
      this.currentStep = stepNum;
      this.activeHint = null;
      this.playSound('click');
      
      // Configurar actividad cotidiana activa según el paso
      if (stepNum === 2) {
        this.selectedEverydayAct = 'cafe';
      } else if (stepNum === 3) {
        this.selectedEverydayAct = 'mochila';
      } else if (stepNum >= 4) {
        this.program = [];
        this.resetMazeState();
      }

      this.render();
      window.scrollTo(0, 0);
    }

    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.selectStep(this.currentStep + 1);
      }
    }

    prevStep() {
      if (this.currentStep > 1) {
        this.selectStep(this.currentStep - 1);
      }
    }

    exitModule() {
      this.playSound('click');
      this.saveProgress();
      if (typeof window !== 'undefined') {
        if (window.MagicApp && typeof window.MagicApp.navigate === 'function') {
          window.MagicApp.navigate('coding');
        } else if (window.codingManager && typeof window.codingManager.renderSyllabus === 'function') {
          window.codingManager.renderSyllabus();
        }
      }
    }

    // ============================================================
    // 5. TRANSICIONES ANIMADAS (HALLOWEEN THEMED)
    // ============================================================
    showAnimatedTransition(message, onComplete) {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      this.inputQueue = [];
      this.isMoving = false;
      this.playSound('pop');

      const mount = document.getElementById('algorithms-content-mount');
      if (!mount) {
        this.isTransitioning = false;
        if (typeof onComplete === 'function') onComplete();
        return;
      }

      // Remover modal previo si existiera
      const oldModal = document.getElementById('alg-transition-modal');
      if (oldModal) oldModal.remove();

      const overlay = document.createElement('div');
      overlay.className = 'alg-transition-overlay';
      overlay.id = 'alg-transition-modal';
      overlay.innerHTML = \`
        <div class="transition-modal-box animate-scale-up">
          <div class="transition-halloween-decor">
            <span class="decor-bat decor-bat-1">🦇</span>
            <span class="decor-pumpkin">🎃</span>
            <span class="decor-bat decor-bat-2">🦇</span>
          </div>
          
          <div class="transition-bity-stage">
            <div class="transition-bity-sprite">
              \${getBitySvg('celebrating')}
            </div>
          </div>
          
          <h2 class="transition-title">\${this.txt('¡DESAFÍO COMPLETADO!')}</h2>
          <p class="transition-subtitle">\${this.txt(message || 'ESTAMOS PREPARANDO EL PRÓXIMO DESAFÍO...')}</p>
          
          <div class="transition-progress-bar-container">
            <div class="transition-progress-bar-fill"></div>
          </div>
        </div>
      \`;

      mount.appendChild(overlay);

      // Espera de 2 segundos con animación
      setTimeout(() => {
        overlay.classList.add('transition-fade-out');
        setTimeout(() => {
          overlay.remove();
          this.isTransitioning = false;
          if (typeof onComplete === 'function') {
            onComplete();
          }
        }, 220);
      }, 1900);
    }

    // ============================================================
    // 6. INTERACCIONES PARTE 1
    // ============================================================
    handleOrderQuestion(answer) {
      this.orderQuestionAnswered = true;
      this.orderQuestionAnswer = answer;
      this.playSound(answer === 'si' ? 'victory' : 'pop');
      this.completedSteps.add(1);
      this.saveProgress();
      this.render();
    }

    // ============================================================
    // 7. INTERACCIONES PARTE 2: BLOQUES COTIDIANOS
    // ============================================================
    switchEverydayAct(actId) {
      const oldModal = document.getElementById('alg-transition-modal');
      if (oldModal) oldModal.remove();
      this.isTransitioning = false;
      this.selectedEverydayAct = actId;
      this.activeHint = null;
      this.playSound('pop');
      this.render();
    }

    handleBlockClick(actId, blockId) {
      const state = this.everydayState[actId];
      if (state.completed) return;

      const actConfig = EVERYDAY_ACTIVITIES[actId];
      const targetCount = actConfig.steps[this.currentGrade].length;

      if (state.placed.includes(blockId)) return;

      if (state.placed.length < targetCount) {
        state.placed.push(blockId);
        state.errorMsg = null;
        this.playSound('pop');
        this.render();
      }
    }

    removePlacedBlock(actId, index) {
      const state = this.everydayState[actId];
      if (state.completed) return;
      if (index >= 0 && index < state.placed.length) {
        state.placed.splice(index, 1);
        state.errorMsg = null;
        this.playSound('trash');
        this.render();
      }
    }

    resetEverydayAct(actId) {
      const state = this.everydayState[actId];
      state.placed = [];
      state.selectedBlock = null;
      state.completed = false;
      state.errorMsg = null;
      this.activeHint = null;
      this.playSound('trash');
      this.render();
    }

    checkEverydayAct(actId) {
      const state = this.everydayState[actId];
      const actConfig = EVERYDAY_ACTIVITIES[actId];
      const targetSteps = actConfig.steps[this.currentGrade];

      if (state.placed.length < targetSteps.length) {
        state.errorMsg = this.txt('¡Faltan pasos! Completá todos los casilleros antes de comprobar.');
        this.playSound('error');
        this.render();
        return;
      }

      // Comprobar secuencia exacta
      let isCorrect = true;
      for (let i = 0; i < targetSteps.length; i++) {
        if (state.placed[i] !== targetSteps[i].id) {
          isCorrect = false;
          break;
        }
      }

      if (isCorrect) {
        state.completed = true;
        state.errorMsg = null;
        this.playSound('victory');
        
        // Transición automática al siguiente desafío sin salir del módulo
        if (this.currentStep === 2) {
          if (actId === 'cafe') {
            this.render();
            this.showAnimatedTransition('¡EXCELENTE! AHORA PREPAREMOS UN JUGO FRESCO...', () => {
              this.switchEverydayAct('jugo');
            });
          } else if (actId === 'jugo') {
            this.completedSteps.add(2);
            this.saveProgress();
            this.render();
            this.showAnimatedTransition('¡GENIAL! PREPARANDO LA MOCHILA ESCOLAR...', () => {
              this.selectStep(3);
            });
          }
        } else if (this.currentStep === 3) {
          if (actId === 'mochila') {
            this.render();
            this.showAnimatedTransition('¡MUY BIEN! AHORA ORDENEMOS LA HABITACIÓN...', () => {
              this.switchEverydayAct('habitacion');
            });
          } else if (actId === 'habitacion') {
            this.completedSteps.add(3);
            this.saveProgress();
            this.render();
            this.showAnimatedTransition('¡FANTÁSTICO! PREPARANDO LOS DESAFÍOS DE PROGRAMACIÓN CON BITY...', () => {
              this.selectStep(4);
            });
          }
        } else {
          this.render();
        }
      } else {
        const distractorFound = actConfig.distractors.find(d => state.placed.includes(d.id));
        if (distractorFound) {
          state.errorMsg = this.txt('¡Atención! Hay un bloque que no pertenece a esta tarea. Revisá bien qué acción sobra.');
        } else {
          state.errorMsg = this.txt('El orden no es el correcto. Pensá qué acción debe realizarse primero y qué paso viene después.');
        }
        this.playSound('error');
        this.render();
      }
    }

    // ============================================================
    // 8. INTERACCIONES PARTES 3 Y 4: LABERINTOS DE PROGRAMACIÓN
    // ============================================================
    getCurrentMazeKey() {
      if (this.currentStep === 4) return 'd1_mecanico';
      if (this.currentStep === 5) return 'd2_caminos';
      if (this.currentStep === 6) return 'd3_optimizacion';
      if (this.currentStep === 7) return 'd4_laberinto';
      return 'd1_mecanico';
    }

    getCurrentMazeConfig() {
      const gradeMazes = ALL_MAZES[this.currentGrade] || ALL_MAZES[1];
      const key = this.getCurrentMazeKey();
      return gradeMazes[key];
    }

    resetMazeState() {
      const cfg = this.getCurrentMazeConfig();
      if (cfg) {
        this.bityPos = { x: cfg.start.x, y: cfg.start.y };
      }
      this.bityFacing = 'right';
      this.isMoving = false;
      this.inputQueue = [];
      this.mazeResult = null;
    }

    // ============================================================
    // NUEVA MECÁNICA: MOVIMIENTO INMEDIATO CON COLA (SIN PARPADEO)
    // ============================================================
    handleDirectionInput(dir) {
      if (this.isTransitioning) return;
      if (this.mazeResult === 'reached') return;

      // Agregar a la cola de movimientos
      this.inputQueue.push(dir);
      this.processMovementQueue();
    }

    processMovementQueue() {
      if (this.isMoving || this.inputQueue.length === 0) return;
      const dir = this.inputQueue.shift();
      this.isMoving = true;

      const cfg = this.getCurrentMazeConfig();
      let nx = this.bityPos.x;
      let ny = this.bityPos.y;

      if (dir === 'up') ny--;
      else if (dir === 'down') ny++;
      else if (dir === 'left') nx--;
      else if (dir === 'right') nx++;

      this.bityFacing = dir;

      // Colisión con límites o paredes (1 = pared)
      if (nx < 0 || nx >= cfg.cols || ny < 0 || ny >= cfg.rows || cfg.grid[ny][nx] === 1) {
        this.playSound('error');
        this.animateCollision(dir, () => {
          this.isMoving = false;
          this.processMovementQueue();
        });
        return;
      }

      // Movimiento válido
      const oldPos = { ...this.bityPos };
      this.bityPos = { x: nx, y: ny };
      this.program.push(dir);
      this.playSound('click');

      this.animateStepMove(oldPos, this.bityPos, dir, () => {
        // Verificar meta
        if (nx === cfg.goal.x && ny === cfg.goal.y) {
          this.handleGoalReached();
          return;
        }
        this.isMoving = false;
        this.processMovementQueue();
      });
    }

    animateStepMove(oldPos, newPos, dir, callback) {
      const oldCell = document.querySelector(\`.maze-cell[data-x="\${oldPos.x}"][data-y="\${oldPos.y}"]\`);
      const newCell = document.querySelector(\`.maze-cell[data-x="\${newPos.x}"][data-y="\${newPos.y}"]\`);

      if (oldCell && newCell) {
        let sprite = oldCell.querySelector('.bity-cell-sprite');
        if (!sprite) {
          sprite = document.createElement('div');
          sprite.className = \`bity-cell-sprite facing-\${dir}\`;
          sprite.innerHTML = getBitySvg('happy');
        }

        // Desplazamiento visual suave
        let startTransform = '';
        if (dir === 'right') startTransform = 'translateX(-100%)';
        else if (dir === 'left') startTransform = 'translateX(100%)';
        else if (dir === 'down') startTransform = 'translateY(-100%)';
        else if (dir === 'up') startTransform = 'translateY(100%)';

        sprite.className = \`bity-cell-sprite facing-\${dir}\`;
        sprite.style.transform = startTransform;
        sprite.style.transition = 'none';

        newCell.appendChild(sprite);
        void sprite.offsetHeight; // Forzar reflow

        sprite.style.transition = 'transform 0.16s cubic-bezier(0.25, 1, 0.5, 1)';
        sprite.style.transform = 'translate(0, 0)';

        // Actualizar lista de instrucciones en Zona 3 de forma directa (sin re-renderizar la página)
        this.appendInstructionDOM(dir, this.program.length);

        setTimeout(() => {
          sprite.style.transition = '';
          if (typeof callback === 'function') callback();
        }, 160);
      } else {
        if (typeof callback === 'function') callback();
      }
    }

    animateCollision(dir, callback) {
      const cell = document.querySelector(\`.maze-cell[data-x="\${this.bityPos.x}"][data-y="\${this.bityPos.y}"]\`);
      const sprite = cell ? cell.querySelector('.bity-cell-sprite') : null;

      if (sprite) {
        sprite.innerHTML = getBitySvg('alert');
        sprite.classList.add(\`bity-bump-\${dir}\`);
        if (cell) cell.classList.add('cell-collision-halo');

        setTimeout(() => {
          sprite.classList.remove(\`bity-bump-\${dir}\`);
          if (cell) cell.classList.remove('cell-collision-halo');
          sprite.innerHTML = getBitySvg('happy');
          if (typeof callback === 'function') callback();
        }, 220);
      } else {
        if (typeof callback === 'function') callback();
      }
    }

    appendInstructionDOM(dir, index) {
      const container = document.querySelector('.program-blocks-container');
      if (!container) return;

      let list = container.querySelector('.program-list');
      if (!list) {
        container.innerHTML = '<div class="program-list"></div>';
        list = container.querySelector('.program-list');
      }

      const badge = document.createElement('div');
      badge.className = 'program-step-badge animate-scale-up';
      badge.innerHTML = \`
        <span class="badge-num">\${index}.</span>
        <span class="badge-arrow">\${dir === 'up' ? '⬆️' : (dir === 'down' ? '⬇️' : (dir === 'left' ? '⬅️' : '➡️'))}</span>
        <span class="badge-name">\${this.txt(dir.toUpperCase())}</span>
      \`;
      list.appendChild(badge);

      container.scrollTop = container.scrollHeight;

      const tag = document.querySelector('.maze-zone-program .zone-tag');
      if (tag) {
        tag.textContent = \`📜 \${this.txt('ZONA 3: PROGRAMA')} (\${this.program.length} \${this.txt('instrucciones')})\`;
      }
    }

    handleGoalReached() {
      this.mazeResult = 'reached';
      this.completedSteps.add(this.currentStep);
      this.saveProgress();
      this.playSound('victory');
      this.inputQueue = [];
      this.isMoving = false;

      // Celebración visual en Bity
      const cell = document.querySelector(\`.maze-cell[data-x="\${this.bityPos.x}"][data-y="\${this.bityPos.y}"]\`);
      const sprite = cell ? cell.querySelector('.bity-cell-sprite') : null;
      if (sprite) {
        sprite.innerHTML = getBitySvg('celebrating');
        sprite.classList.add('bity-spin-celebration');
      }

      // Transición según el desafío
      if (this.currentStep === 4) {
        setTimeout(() => {
          this.showAnimatedTransition('¡BITY LLEGÓ AL TALLER MECÁNICO! PREPARANDO EL DESAFÍO 2...', () => {
            this.selectStep(5);
          });
        }, 700);
      } else if (this.currentStep === 5) {
        setTimeout(() => {
          this.showAnimatedTransition('¡CAMINO ENCONTRADO! PREPARANDO EL DESAFÍO DE OPTIMIZACIÓN...', () => {
            this.selectStep(6);
          });
        }, 700);
      } else if (this.currentStep === 6) {
        // En el Desafío 3, mostrar la tarjeta de optimización y reflexión
        setTimeout(() => {
          const mount = document.querySelector('.alg-maze-section');
          if (mount) {
            const oldCard = document.querySelector('.comparison-reflection-card');
            if (oldCard) oldCard.remove();
            
            const cardDiv = document.createElement('div');
            cardDiv.innerHTML = this.renderOptimizationCard().trim();
            mount.appendChild(cardDiv.firstElementChild);
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }
        }, 300);
      } else if (this.currentStep === 7) {
        // En el Desafío 4, mostrar la pantalla de celebración final
        setTimeout(() => {
          const mount = document.querySelector('.alg-maze-section');
          if (mount) {
            const oldCard = document.querySelector('.final-celebration-card');
            if (oldCard) oldCard.remove();

            const cardDiv = document.createElement('div');
            cardDiv.innerHTML = this.renderFinalCelebration().trim();
            mount.appendChild(cardDiv.firstElementChild);
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }
        }, 300);
      }
    }

    // Reiniciar posición del laberinto sin parpadear la pantalla
    resetMaze() {
      if (this.isTransitioning) return;
      this.inputQueue = [];
      this.isMoving = false;
      this.program = [];
      this.resetMazeState();
      this.playSound('click');

      const boardWrapper = document.querySelector('.maze-grid-wrapper');
      if (boardWrapper) {
        boardWrapper.innerHTML = this.renderMazeGrid(this.getCurrentMazeConfig());
      }
      const progContainer = document.querySelector('.program-blocks-container');
      if (progContainer) {
        progContainer.innerHTML = \`
          <div class="empty-program-notice">
            <span>👈</span>
            <p>\${this.txt('Presioná las flechas para mover a Bity inmediatamente.')}</p>
          </div>
        \`;
      }
      const tag = document.querySelector('.maze-zone-program .zone-tag');
      if (tag) {
        tag.textContent = \`📜 \${this.txt('ZONA 3: PROGRAMA')} (0 \${this.txt('instrucciones')})\`;
      }

      const compCard = document.querySelector('.comparison-reflection-card');
      if (compCard) compCard.remove();
    }

    // ============================================================
    // 9. RENDERIZADORES DE VISTA
    // ============================================================
    render() {
      const mount = document.getElementById('algorithms-content-mount');
      if (!mount) return;

      mount.innerHTML = \`
        <div class="alg-fullscreen-layout \${this.currentGrade === 1 ? 'grade-1-uppercase' : ''}">
          \${this.renderTopBar()}
          \${this.renderStepPills()}
          <main class="alg-main-body">
            \${this.renderCurrentStepContent()}
          </main>
        </div>
      \`;
    }

    renderTopBar() {
      return \`
        <header class="alg-header-bar">
          <div class="alg-header-left">
            <button class="btn-alg-back" type="button" onclick="window.algorithmsModule.exitModule()" title="\${this.txt('Volver a Programación')}">
              <span class="btn-icon">⬅️</span>
              <span class="btn-text">\${this.txt('Volver')}</span>
            </button>
            <div class="alg-header-title-box">
              <span class="alg-header-badge">⭐ \${this.txt('PROGRAMACIÓN')} ➔ \${this.txt('ALGORITMOS')}</span>
              <h1 class="alg-header-title">\${this.txt('CLASE N.º 1: ¿QUÉ ES UN ALGORITMO?')}</h1>
            </div>
          </div>
          <div class="alg-header-right">
            <div class="alg-grade-pill">
              <span>🎒</span> \${this.currentGrade}.º \${this.txt('Grado')}
            </div>
          </div>
        </header>
      \`;
    }

    renderStepPills() {
      const stepNames = [
        { num: 1, label: this.txt('1. ¿Qué es?') },
        { num: 2, label: this.txt('2. Bloques I') },
        { num: 3, label: this.txt('3. Bloques II') },
        { num: 4, label: this.txt('4. Bity Desafío 1') },
        { num: 5, label: this.txt('5. Caminos') },
        { num: 6, label: this.txt('6. Optimizar') },
        { num: 7, label: this.txt('7. Laberinto Final') }
      ];

      return \`
        <nav class="alg-steps-nav">
          <div class="alg-steps-scroll">
            \${stepNames.map(s => \`
              <button class="alg-step-tab \${this.currentStep === s.num ? 'active' : ''} \${this.completedSteps.has(s.num) ? 'completed' : ''}"
                type="button"
                onclick="window.algorithmsModule.selectStep(\${s.num})">
                <span class="tab-indicator">\${this.completedSteps.has(s.num) ? '✓' : s.num}</span>
                <span class="tab-label">\${s.label}</span>
              </button>
            \`).join('')}
          </div>
        </nav>
      \`;
    }

    renderCurrentStepContent() {
      if (this.currentStep === 1) return this.renderStep1();
      if (this.currentStep === 2 || this.currentStep === 3) return this.renderStepEveryday();
      if (this.currentStep >= 4 && this.currentStep <= 7) return this.renderStepMaze();
      return '';
    }

    // ------------------------------------------------------------
    // PARTE 1: ¿QUÉ ES UN ALGORITMO?
    // ------------------------------------------------------------
    renderStep1() {
      return \`
        <section class="alg-section alg-step1-section animate-fade-in">
          <div class="alg-bity-speech-card">
            <div class="speech-avatar">\${getBitySvg('happy')}</div>
            <div class="speech-bubble">
              <h3>\${this.txt('¡HOLA! SOY BITY')} 👋</h3>
              <p>\${this.txt('Hoy vamos a descubrir qué es un ALGORITMO y por qué el orden de las instrucciones es tan importante.')}</p>
            </div>
          </div>

          <!-- DEFINICIÓN CLARA AL COMIENZO DE LA ACTIVIDAD -->
          <div class="alg-card alg-definition-hero-card">
            <div class="card-tag">💡 \${this.txt('CONCEPTO FUNDAMENTAL')}</div>
            <h2 class="card-title alg-definition-main-title">\${this.txt('¿QUÉ ES UN ALGORITMO?')}</h2>
            
            <div class="card-content-split alg-def-split">
              <div class="card-svg-col">
                \${ALGORITHM_SVGS.definicion_algoritmo_pasos}
              </div>
              <div class="card-text-col">
                <p class="concept-def-quote alg-def-quote">
                  "\${this.txt('Un algoritmo es un conjunto de pasos ordenados que seguimos para resolver un problema o realizar una tarea')}."
                </p>
                <div class="hint-bullet alg-objective-bullet">
                  <span class="bullet-icon">🎯</span>
                  <p class="alg-objective-text">
                    "\${this.txt('Cada paso es una instrucción y debemos respetar el orden para lograr nuestro objetivo')}."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="alg-card alg-single-action-card">
            <div class="card-tag">📍 \${this.txt('UNA SOLA ACCIÓN')}</div>
            <h2 class="card-title">\${this.txt('CAMINAR')}</h2>
            <div class="card-content-split">
              <div class="card-svg-col">\${ALGORITHM_SVGS.caminar}</div>
              <div class="card-text-col">
                <p class="concept-def-quote">
                  " \${this.txt('Es una acción que podemos realizar siguiendo instrucciones.')} "
                </p>
                <div class="hint-bullet">
                  <span>👣</span>
                  <p>\${this.txt('Para dar un paso, movemos un pie hacia adelante, apoyamos la suela y mantenemos el equilibrio.')}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="alg-card alg-sequence-card">
            <div class="card-tag">🛒 \${this.txt('SECUENCIA DE ACCIONES')}</div>
            <h2 class="card-title">\${this.txt('IR A COMPRAR AL ALMACÉN')}</h2>
            <p class="card-subtitle">\${this.txt('Para completar una tarea más compleja, necesitamos una secuencia de pasos ordenados:')}</p>

            <div class="alg-steps-flow-grid">
              <div class="flow-step-box">
                <div class="flow-num">1</div>
                <div class="flow-svg">\${ALGORITHM_SVGS.almacen_1_bolsa}</div>
                <div class="flow-text">\${this.txt('Tomar una bolsa de compras')}</div>
              </div>
              <div class="flow-arrow">➔</div>

              <div class="flow-step-box">
                <div class="flow-num">2</div>
                <div class="flow-svg">\${ALGORITHM_SVGS.almacen_2_salir}</div>
                <div class="flow-text">\${this.txt('Salir de casa')}</div>
              </div>
              <div class="flow-arrow">➔</div>

              <div class="flow-step-box">
                <div class="flow-num">3</div>
                <div class="flow-svg">\${ALGORITHM_SVGS.almacen_3_camino}</div>
                <div class="flow-text">\${this.txt('Caminar hacia el almacén')}</div>
              </div>
              <div class="flow-arrow flow-arrow-break">➔</div>

              <div class="flow-step-box">
                <div class="flow-num">4</div>
                <div class="flow-svg">\${ALGORITHM_SVGS.almacen_4_productos}</div>
                <div class="flow-text">\${this.txt('Elegir los productos')}</div>
              </div>
              <div class="flow-arrow">➔</div>

              <div class="flow-step-box">
                <div class="flow-num">5</div>
                <div class="flow-svg">\${ALGORITHM_SVGS.almacen_5_pagar}</div>
                <div class="flow-text">\${this.txt('Pagar la compra')}</div>
              </div>
              <div class="flow-arrow">➔</div>

              <div class="flow-step-box">
                <div class="flow-num">6</div>
                <div class="flow-svg">\${ALGORITHM_SVGS.almacen_6_regresar}</div>
                <div class="flow-text">\${this.txt('Regresar a casa')}</div>
              </div>
            </div>
          </div>

          <div class="alg-card alg-quiz-card">
            <div class="quiz-header">
              <span class="quiz-badge">❓ \${this.txt('PREGUNTA PARA VOS')}</span>
              <h2 class="quiz-question">\${this.txt('¿IMPORTA EL ORDEN DE ESTOS PASOS?')}</h2>
            </div>
            
            <div class="quiz-buttons-row">
              <button class="btn-quiz-opt btn-quiz-yes \${this.orderQuestionAnswer === 'si' ? 'selected' : ''}" 
                type="button"
                onclick="window.algorithmsModule.handleOrderQuestion('si')">
                <span class="btn-check-icon">👍</span> \${this.txt('SÍ, IMPORTA')}
              </button>
              <button class="btn-quiz-opt btn-quiz-no \${this.orderQuestionAnswer === 'no' ? 'selected' : ''}" 
                type="button"
                onclick="window.algorithmsModule.handleOrderQuestion('no')">
                <span class="btn-check-icon">👎</span> \${this.txt('NO, DA LO MISMO')}
              </button>
            </div>

            \${this.orderQuestionAnswered ? \`
              <div class="quiz-feedback-box animate-scale-up">
                <div class="feedback-speech">
                  <div class="feedback-avatar">\${getBitySvg(this.orderQuestionAnswer === 'si' ? 'celebrating' : 'thinking')}</div>
                  <div class="feedback-text">
                    <h4>\${this.orderQuestionAnswer === 'si' ? this.txt('¡EXACTO! ¡MUY BIEN!') : this.txt('¡PENSÉMOSLO JUNTOS!')}</h4>
                    <p>\${this.txt('¡El orden es fundamental! Si cambiamos el orden de las instrucciones, la tarea no se puede cumplir.')}</p>
                  </div>
                </div>

                <div class="disordered-demo-box">
                  <div class="disordered-svg">\${ALGORITHM_SVGS.secuencia_desordenada}</div>
                  <div class="disordered-explanation">
                    <p><strong>\${this.txt('¿Qué pasa si intentamos pagar antes de elegir los productos o antes de salir de casa?')}</strong></p>
                    <p>\${this.txt('¡No sabemos qué estamos comprando ni cuánto dinero necesitamos! Cada paso depende del anterior.')}</p>
                  </div>
                </div>

                <div class="concept-gold-card">
                  <div class="gold-badge">💡 \${this.txt('CONCEPTO CENTRAL')}</div>
                  <h3 class="gold-definition">
                    \${this.txt('UN ALGORITMO ES UNA SECUENCIA DE INSTRUCCIONES ORDENADAS PARA RESOLVER UN PROBLEMA O REALIZAR UNA TAREA.')}
                  </h3>
                  <div class="gold-svg-wrapper">\${ALGORITHM_SVGS.algoritmo_concepto}</div>
                </div>

                <div class="alg-nav-buttons-bottom">
                  <button class="btn-alg-continue" type="button" onclick="window.algorithmsModule.showAnimatedTransition('PREPARANDO LA ACTIVIDAD: PREPARAMOS UN CAFÉ...', () => window.algorithmsModule.selectStep(2))">
                    \${this.txt('CONTINUAR A LA PARTE 2: CONSTRUIR CON BLOQUES')} ➔
                  </button>
                </div>
              </div>
            \` : ''}
          </div>
        </section>
      \`;
    }

    // ------------------------------------------------------------
    // PARTE 2: CONSTRUIMOS ALGORITMOS CON BLOQUES (Manipulativo)
    // ------------------------------------------------------------
    renderStepEveryday() {
      const actId = this.selectedEverydayAct;
      const act = EVERYDAY_ACTIVITIES[actId];
      const targetSteps = act.steps[this.currentGrade];
      const state = this.everydayState[actId];

      const actsInThisStep = this.currentStep === 2 ? ['cafe', 'jugo'] : ['mochila', 'habitacion'];

      const allAvailableBlocks = [
        ...targetSteps,
        ...act.distractors
      ];

      return \`
        <section class="alg-section alg-everyday-section animate-fade-in">
          <div class="everyday-subnav">
            \${actsInThisStep.map(k => {
              const a = EVERYDAY_ACTIVITIES[k];
              const s = this.everydayState[k];
              return \`
                <button class="everyday-tab \${this.selectedEverydayAct === k ? 'active' : ''}" 
                  type="button"
                  onclick="window.algorithmsModule.switchEverydayAct('\${k}')">
                  <span class="tab-icon">\${k === 'cafe' ? '☕' : (k === 'jugo' ? '🧃' : (k === 'mochila' ? '🎒' : '🛏️'))}</span>
                  <span class="tab-title">\${this.txt(a.title)}</span>
                  \${s.completed ? '<span class="check-pill">✓</span>' : ''}
                </button>
              \`;
            }).join('')}
          </div>

          <div class="alg-card everyday-activity-card">
            <div class="activity-header">
              <div>
                <span class="activity-tag">🧩 \${this.txt('CONSTRUCCIÓN CON BLOQUES')}</span>
                <h2 class="activity-title">\${this.txt(act.title)}</h2>
                <p class="activity-subtitle">\${this.txt(act.subtitle)}</p>
              </div>
              <div class="safety-badge">
                \${this.txt(act.safety)}
              </div>
            </div>

            \${state.errorMsg ? \`
              <div class="alert-box-warning animate-shake">
                <span>⚠️</span> <strong>\${state.errorMsg}</strong>
              </div>
            \` : ''}

            \${state.completed ? \`
              <div class="alert-box-success animate-scale-up">
                <div class="success-avatar">\${getBitySvg('celebrating')}</div>
                <div>
                  <h3>🎉 \${this.txt('¡EXCELENTE TRABAJO!')}</h3>
                  <p>\${this.txt('El algoritmo está perfectamente ordenado. ¡Cada instrucción está en su lugar!')}</p>
                </div>
              </div>
            \` : ''}

            <div class="everyday-workspace">
              <div class="workspace-col-slots">
                <div class="slots-header">
                  <h3>\${this.txt('TU ALGORITMO')} (\${state.placed.length} / \${targetSteps.length} \${this.txt('pasos')})</h3>
                  <p class="slots-instruction">\${this.txt('Hacé clic en los bloques de la derecha para ubicarlos en orden en los casilleros.')}</p>
                </div>

                <div class="slots-grid">
                  \${targetSteps.map((st, idx) => {
                    const placedBlockId = state.placed[idx];
                    const placedBlock = placedBlockId ? allAvailableBlocks.find(b => b.id === placedBlockId) : null;
                    return \`
                      <div class="slot-box \${placedBlock ? 'filled' : 'empty'}">
                        <div class="slot-number">\${this.txt('Paso')} \${idx + 1}</div>
                        \${placedBlock ? \`
                          <div class="slot-block-content">
                            <div class="block-icon">\${ALGORITHM_SVGS[placedBlock.svg] || '🔹'}</div>
                            <span class="block-text">\${this.txt(this.currentGrade === 1 ? placedBlock.textG1 : placedBlock.text)}</span>
                            \${!state.completed ? \`
                              <button class="btn-remove-slot" type="button" onclick="window.algorithmsModule.removePlacedBlock('\${actId}', \${idx})" title="\${this.txt('Quitar bloque')}">✕</button>
                            \` : ''}
                          </div>
                        \` : \`
                          <div class="slot-placeholder">
                            <span>📥</span>
                            <span>\${this.txt('Vacío')}</span>
                          </div>
                        \`}
                      </div>
                    \`;
                  }).join('')}
                </div>

                <div class="everyday-actions-row">
                  \${!state.completed ? \`
                    <button class="btn-alg-check" type="button" onclick="window.algorithmsModule.checkEverydayAct('\${actId}')">
                      <span>✓</span> \${this.txt('COMPROBAR ALGORITMO')}
                    </button>
                    <button class="btn-alg-reset" type="button" onclick="window.algorithmsModule.resetEverydayAct('\${actId}')">
                      <span>🔄</span> \${this.txt('REINICIAR')}
                    </button>
                  \` : \`
                    <button class="btn-alg-continue" type="button" onclick="\${
                      this.selectedEverydayAct === 'cafe' ? \"window.algorithmsModule.switchEverydayAct('jugo')\" :
                      (this.selectedEverydayAct === 'jugo' ? \"window.algorithmsModule.selectStep(3)\" :
                      (this.selectedEverydayAct === 'mochila' ? \"window.algorithmsModule.switchEverydayAct('habitacion')\" :
                      \"window.algorithmsModule.selectStep(4)\"))
                    }">
                      \${this.txt('CONTINUAR')} ➔
                    </button>
                  \`}
                </div>
              </div>

              <div class="workspace-col-pool">
                <div class="pool-header">
                  <h3>📦 \${this.txt('BLOQUES DISPONIBLES')}</h3>
                  <span class="pool-hint">\${this.txt('¡Atención a los distractores!')}</span>
                </div>

                <div class="pool-blocks-list">
                  \${allAvailableBlocks.map(b => {
                    const isPlaced = state.placed.includes(b.id);
                    return \`
                      <button class="block-item-btn \${isPlaced ? 'placed' : ''}" 
                        type="button"
                        \${isPlaced || state.completed ? 'disabled' : ''}
                        onclick="window.algorithmsModule.handleBlockClick('\${actId}', '\${b.id}')">
                        <div class="block-icon">\${ALGORITHM_SVGS[b.svg] || '🔹'}</div>
                        <span class="block-label">\${this.txt(this.currentGrade === 1 ? b.textG1 : b.text)}</span>
                        \${isPlaced ? '<span class="placed-badge">✓</span>' : ''}
                      </button>
                    \`;
                  }).join('')}
                </div>
              </div>
            </div>
          </div>
        </section>
      \`;
    }

    // ------------------------------------------------------------
    // PARTES 3 Y 4: DESAFÍOS DE PROGRAMACIÓN CON BITY (Laberintos)
    // ------------------------------------------------------------
    renderStepMaze() {
      const cfg = this.getCurrentMazeConfig();

      return \`
        <section class="alg-section alg-maze-section animate-fade-in">
          <div class="maze-header-card">
            <div class="maze-header-content">
              <span class="challenge-badge">🚀 \${this.txt('DESAFÍO')} \${this.currentStep - 3} \${this.txt('DE')} 4</span>
              <h2 class="challenge-title">\${this.txt(cfg.title)}</h2>
              <p class="challenge-hint">\${this.txt(cfg.hint)}</p>
            </div>
            <div class="maze-header-avatar">\${getBitySvg(this.mazeResult === 'reached' ? 'celebrating' : 'happy')}</div>
          </div>

          <div class="maze-coding-layout">
            <!-- ZONA 1: TABLERO / LABERINTO -->
            <div class="maze-zone-board">
              <div class="zone-tag">🗺️ \${this.txt('ZONA 1: LABERINTO')}</div>
              <div class="maze-grid-wrapper" style="--cols: \${cfg.cols}; --rows: \${cfg.rows};">
                \${this.renderMazeGrid(cfg)}
              </div>
              <div class="maze-legend">
                <span>🤖 \${this.txt('Bity')}</span>
                <span>\${this.currentStep === 4 ? '🔧 ' + this.txt('Mecánico') : '⭐ ' + this.txt('Meta')}</span>
                <span>🪨 \${this.txt('Pared / Asteroide')}</span>
              </div>
            </div>

            <!-- ZONA 2: PALETA DE MOVIMIENTO INMEDIATO -->
            <div class="maze-zone-palette">
              <div class="zone-tag">🕹️ \${this.txt('ZONA 2: CONTROL')}</div>
              <p class="palette-hint">\${this.txt('Presioná las flechas para mover a Bity inmediatamente:')}</p>
              
              <div class="palette-buttons-grid">
                <button class="btn-dir-block btn-dir-up" type="button" onclick="window.algorithmsModule.handleDirectionInput('up')">
                  <span class="dir-icon">⬆️</span>
                  <span class="dir-text">\${this.txt('ARRIBA')}</span>
                </button>
                <div class="palette-row-middle">
                  <button class="btn-dir-block btn-dir-left" type="button" onclick="window.algorithmsModule.handleDirectionInput('left')">
                    <span class="dir-icon">⬅️</span>
                    <span class="dir-text">\${this.txt('IZQUIERDA')}</span>
                  </button>
                  <button class="btn-dir-block btn-dir-right" type="button" onclick="window.algorithmsModule.handleDirectionInput('right')">
                    <span class="dir-icon">➡️</span>
                    <span class="dir-text">\${this.txt('DERECHA')}</span>
                  </button>
                </div>
                <button class="btn-dir-block btn-dir-down" type="button" onclick="window.algorithmsModule.handleDirectionInput('down')">
                  <span class="dir-icon">⬇️</span>
                  <span class="dir-text">\${this.txt('ABAJO')}</span>
                </button>
              </div>
            </div>

            <!-- ZONA 3: REGISTRO DEL PROGRAMA EJECUTADO -->
            <div class="maze-zone-program">
              <div class="zone-tag">📜 \${this.txt('ZONA 3: PROGRAMA')} (\${this.program.length} \${this.txt('instrucciones')})</div>
              
              <div class="program-blocks-container">
                \${this.program.length === 0 ? \`
                  <div class="empty-program-notice">
                    <span>👈</span>
                    <p>\${this.txt('Presioná las flechas para mover a Bity inmediatamente.')}</p>
                  </div>
                \` : \`
                  <div class="program-list">
                    \${this.program.map((dir, idx) => \`
                      <div class="program-step-badge">
                        <span class="badge-num">\${idx + 1}.</span>
                        <span class="badge-arrow">\${dir === 'up' ? '⬆️' : (dir === 'down' ? '⬇️' : (dir === 'left' ? '⬅️' : '➡️'))}</span>
                        <span class="badge-name">\${this.txt(dir.toUpperCase())}</span>
                      </div>
                    \`).join('')}
                  </div>
                \`}
              </div>

              <!-- Control de Reinicio -->
              <div class="program-controls-row">
                <button class="btn-action-reset" type="button" onclick="window.algorithmsModule.resetMaze()">
                  <span>🔄</span> \${this.txt('REINICIAR POSICIÓN')}
                </button>
              </div>
            </div>
          </div>
        </section>
      \`;
    }

    renderMazeGrid(cfg) {
      let html = '';
      for (let r = 0; r < cfg.rows; r++) {
        for (let c = 0; c < cfg.cols; c++) {
          const isWall = cfg.grid[r][c] === 1;
          const isStart = r === cfg.start.y && c === cfg.start.x;
          const isGoal = r === cfg.goal.y && c === cfg.goal.x;
          const isBity = r === this.bityPos.y && c === this.bityPos.x;

          let cellClass = isWall ? 'cell-wall' : 'cell-path';
          if (isStart) cellClass += ' cell-start';
          if (isGoal) cellClass += ' cell-goal';

          html += \`
            <div class="maze-cell \${cellClass}" data-x="\${c}" data-y="\${r}">
              \${isWall ? '<span class="cell-obstacle">🪨</span>' : ''}
              \${isGoal ? (this.currentStep === 4 ? '<span class="cell-goal-icon">🔧</span>' : '<span class="cell-goal-icon">⭐</span>') : ''}
              \${isBity ? \`
                <div class="bity-cell-sprite facing-\${this.bityFacing}">
                  \${getBitySvg(this.mazeResult === 'reached' ? 'celebrating' : 'happy')}
                </div>
              \` : ''}
            </div>
          \`;
        }
      }
      return html;
    }

    renderOptimizationCard() {
      const cfg = this.getCurrentMazeConfig();
      const usedSteps = this.program.length;
      const optimal = cfg.optimalSteps || 4;

      return \`
        <div class="alg-card comparison-reflection-card animate-scale-up">
          <div class="comp-badge">📊 \${this.txt('REFLEXIÓN PEDAGÓGICA')}</div>
          <h3 class="comp-title">\${this.txt('¿PODRÍAS LLEGAR A LA META UTILIZANDO MENOS INSTRUCCIONES?')}</h3>
          
          <div class="comp-stats-row">
            <div class="stat-box stat-student">
              <div class="stat-number">\${usedSteps}</div>
              <div class="stat-label">\${this.txt('Tus instrucciones')}</div>
            </div>
            <div class="stat-vs">VS</div>
            <div class="stat-box stat-optimal">
              <div class="stat-number">\${optimal}</div>
              <div class="stat-label">\${this.txt('Camino óptimo')}</div>
            </div>
          </div>

          <div class="comp-message-box">
            <div class="comp-avatar">\${getBitySvg('happy')}</div>
            <div class="comp-text">
              <p>
                \${usedSteps === optimal ? 
                  this.txt('¡FANTÁSTICO! Encontraste el camino más corto posible. Tu algoritmo es 100% eficiente.') :
                  this.txt('¡Muy bien! Lograste resolver el laberinto. Pero en programación, resolver un problema usando menos pasos ahorra tiempo y memoria. ¿Te animás a buscar el camino más corto?')
                }
              </p>
            </div>
          </div>

          <div class="comp-buttons-row">
            <button class="btn-alg-reset" type="button" onclick="window.algorithmsModule.resetMaze()">
              <span>🔄</span> \${this.txt('PROBAR OTRO CAMINO')}
            </button>
            <button class="btn-alg-continue" type="button" onclick="window.algorithmsModule.showAnimatedTransition('¡INCREÍBLE! PREPARANDO EL GRAN LABERINTO FINAL...', () => window.algorithmsModule.selectStep(7))">
              \${this.txt('CONTINUAR')} ➔
            </button>
          </div>
        </div>
      \`;
    }

    renderFinalCelebration() {
      return \`
        <div class="alg-card final-celebration-card animate-scale-up">
          <div class="celebration-confetti">✨ ⭐ 🌟 🏆 🌟 ⭐ ✨</div>
          <h2 class="celebration-title">🎓 \${this.txt('¡FELICITACIONES, PROGRAMADOR/A!')}</h2>
          <p class="celebration-subtitle">\${this.txt('Completaste con éxito la Clase N.º 1 de Algoritmos.')}</p>

          <div class="celebration-trophy-box">
            \${ALGORITHM_SVGS.algoritmo_concepto}
          </div>

          <div class="celebration-summary-box">
            <h4>\${this.txt('LO QUE APRENDIMOS HOY:')}</h4>
            <ul>
              <li>✅ <strong>\${this.txt('Qué es un algoritmo:')}</strong> \${this.txt('Una secuencia de instrucciones ordenadas para resolver un problema.')}</li>
              <li>✅ <strong>\${this.txt('La importancia del orden:')}</strong> \${this.txt('Si cambiamos el orden, el resultado no se alcanza.')}</li>
              <li>✅ <strong>\${this.txt('Construcción con bloques:')}</strong> \${this.txt('Identificamos los pasos necesarios y descartamos distractores.')}</li>
              <li>✅ <strong>\${this.txt('Programación en 4 direcciones:')}</strong> \${this.txt('Guiamos a Bity con Arriba, Abajo, Izquierda y Derecha.')}</li>
              <li>✅ <strong>\${this.txt('Eficiencia algorítmica:')}</strong> \${this.txt('Descubrimos que un mismo problema puede resolverse con diferentes cantidades de instrucciones.')}</li>
            </ul>
          </div>

          <div class="celebration-btn-row">
            <button class="btn-alg-finish" type="button" onclick="window.algorithmsModule.exitModule()">
              <span>⭐</span> \${this.txt('FINALIZAR CLASE Y GUARDAR')}
            </button>
          </div>
        </div>
      \`;
    }
  }

  // Exportar instancia global
  const algorithmsModuleInstance = new AlgorithmsModule();
  algorithmsModuleInstance.EVERYDAY_ACTIVITIES = EVERYDAY_ACTIVITIES;
  algorithmsModuleInstance.ALL_MAZES = ALL_MAZES;
  algorithmsModuleInstance.ALGORITHM_SVGS = ALGORITHM_SVGS;
  global.algorithmsModule = algorithmsModuleInstance;

})(typeof window !== 'undefined' ? window : global);
`;

fs.writeFileSync(path.join(__dirname, '../js/algorithmsModule.js'), fullModuleJs, 'utf8');
console.log('js/algorithmsModule.js written successfully with immediate movement and animated transitions.');
