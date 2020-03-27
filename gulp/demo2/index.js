const http = require('http');
const fs = require('fs');
http
  .createServer((req, res) => {
    const html = fs.readFileSync('dist/index.html');
    res.end(html);
  })
  .listen(4000);
