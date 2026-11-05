const fs = require('fs');
const content = fs.readFileSync('js/codingModule.js', 'utf8');

// Find all types of activities in CODING_DATA
const typeMatches = content.match(/type:\s*['"][^'"]+['"]/g) || [];
const uniqueTypes = [...new Set(typeMatches)];
console.log('Unique activity types in codingModule.js:', uniqueTypes);
