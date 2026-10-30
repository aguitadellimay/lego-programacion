const fs = require('fs');

// Mock window and global
const g = global;
g.window = global;
g.document = {
  readyState: 'loading',
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {},
  createElement: () => ({
    setAttribute: () => {},
    appendChild: () => {},
    classList: { add: () => {}, remove: () => {} },
    style: {}
  }),
  body: {
    appendChild: () => {},
    contains: () => false
  }
};

eval(fs.readFileSync('js/bityBlockly.js', 'utf8'));
eval(fs.readFileSync('js/magicVampire.js', 'utf8'));

const gd = global.BITYBLOCKLY_GRADES_DATA;
console.log('--- 1. Testing Grade Mission Counts ---');
const expectedCounts = { 1: 6, 2: 4, 3: 5, 4: 7, 5: 8 };
for (let grade = 1; grade <= 5; grade++) {
  const missions = gd[grade].missions;
  if (missions.length !== expectedCounts[grade]) {
    console.error(`❌ Grade ${grade}: expected ${expectedCounts[grade]} missions, got ${missions.length}`);
    process.exit(1);
  }
  const last = missions[missions.length - 1];
  if (!last.isFinalChallenge) {
    console.error(`❌ Grade ${grade}: last mission is not marked as isFinalChallenge!`);
    process.exit(1);
  }
  console.log(`✅ Grade ${grade}: ${missions.length} missions, final challenge verified (${last.name})`);
}

console.log('\n--- 2. Testing Mazes (at least 2 doors & solvable) ---');
let totalMazes = 0;
for (let grade = 1; grade <= 5; grade++) {
  const missions = gd[grade].missions;
  missions.forEach(m => {
    if (m.type === 'maze' || (!m.type && m.grid)) {
      totalMazes++;
      const grid = m.grid;
      const rows = grid.length, cols = grid[0].length;
      let doors = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (grid[r][c] === 2) doors++;
        }
      }
      if (doors < 2) {
        console.error(`❌ Grade ${grade} - ${m.name}: fewer than 2 doors (${doors})`);
        process.exit(1);
      }

      // Check BFS reachability
      const q = [{ r: m.start.y, c: m.start.x }];
      const visited = new Set([m.start.y + ',' + m.start.x]);
      let goalReached = false;
      let doorsReached = 0;

      while (q.length > 0) {
        const curr = q.shift();
        if (curr.r === m.goal.y && curr.c === m.goal.x) goalReached = true;
        for (const d of [{dr:-1,dc:0}, {dr:1,dc:0}, {dr:0,dc:-1}, {dr:0,dc:1}]) {
          const nr = curr.r + d.dr, nc = curr.c + d.dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] !== 1) {
            const k = nr + ',' + nc;
            if (!visited.has(k)) {
              visited.add(k);
              if (grid[nr][nc] === 2) doorsReached++;
              q.push({ r: nr, c: nc });
            }
          }
        }
      }

      if (!goalReached || doorsReached < 2) {
        console.error(`❌ Grade ${grade} - ${m.name}: BFS failed (goal=${goalReached}, doors=${doorsReached}/${doors})`);
        process.exit(1);
      }
      console.log(`✅ Grade ${grade} - ${m.name}: ${doors} doors reachable, goal reached!`);
    }
  });
}
console.log(`Total mazes tested: ${totalMazes} (all passed)`);

console.log('\n--- 3. Testing Question Banks ---');
const banks = global.BITYBLOCKLY_MATH_BANKS;
// Check Grade 4 bank
const g4 = banks[4];
const hasMultiplication = g4.some(q => q.type === 'multiplication');
const hasMissingFactor = g4.some(q => q.type === 'missing_factor');
if (!hasMultiplication || !hasMissingFactor) {
  console.error('❌ Grade 4 bank missing multiplication tables or missing factor questions!');
  process.exit(1);
}
console.log('✅ Grade 4 bank: contains multiplication tables and missing factor questions (Count:', g4.length, ')');

// Check Grade 5 bank
const g5 = banks[5];
const hasDiv = g5.some(q => q.type === 'division');
const hasMult5 = g5.some(q => q.type === 'multiplication');
const hasMissing5 = g5.some(q => q.type === 'missing_factor');
if (!hasDiv || !hasMult5 || !hasMissing5) {
  console.error('❌ Grade 5 bank missing divisions, multiplications or missing numbers!');
  process.exit(1);
}
console.log('✅ Grade 5 bank: contains exact divisions, multiplications and missing numbers (Count:', g5.length, ')');

console.log('\n--- 4. Testing MagicVampireManager Halloween Characters ---');
const vm = global.MagicVampireManager;
if (!vm.characterTypes || vm.characterTypes.length < 5) {
  console.error('❌ MagicVampireManager missing character types!', vm.characterTypes);
  process.exit(1);
}
console.log('✅ MagicVampireManager character types:', vm.characterTypes.join(', '));
if (vm.minIntervalMs !== 45000 || vm.maxIntervalMs !== 100000) {
  console.error('❌ Unexpected intervals:', vm.minIntervalMs, vm.maxIntervalMs);
  process.exit(1);
}
console.log('✅ MagicVampireManager intervals: 45s to 100s verified.');

// Test SVG generation
const pSvg = vm.createPumpkinSvg();
const fSvg = vm.createFrankensteinSvg();
const sSvg = vm.createSpiderSvg();
const gSvg = vm.createGhostSvg();
const vSvg = vm.createVampireSvg();

if (!pSvg.includes('<svg') || !fSvg.includes('<svg') || !sSvg.includes('<svg') || !gSvg.includes('<svg') || !vSvg.includes('<svg')) {
  console.error('❌ One of the SVGs failed to generate!');
  process.exit(1);
}
console.log('✅ All 5 SVGs generated successfully without external dependencies.');

console.log('\n🎉 ALL UNIT AND LOGIC CHECKS PASSED PERFECTLY!');
