const { execSync } = require('child_process');
const fs = require('fs');

console.log('Testing Chrome locations:');
const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Users\\Ismae\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
];

chromePaths.forEach(p => {
  console.log(`${p}: ${fs.existsSync(p)}`);
});
