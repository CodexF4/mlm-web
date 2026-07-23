const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist/app/browser');

fs.copyFileSync(
  path.join(distPath, 'index.csr.html'),
  path.join(distPath, 'index.html')
);

console.log('index.csr.html copied to index.html');