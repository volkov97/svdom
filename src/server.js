const express = require('express');

const app = express();

app.get('/ping', (req, res) => res.end('pong'));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
