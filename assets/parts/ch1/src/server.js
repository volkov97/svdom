const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/ping') {
    return res.end('pong');
  }

  res.statusCode = 404;
  return res.end('Not Found');
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
