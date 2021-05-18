const http = require('http');

const server = http.createServer((req, res) => {
  return res.end('pong');
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
