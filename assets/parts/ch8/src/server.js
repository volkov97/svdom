const http = require('http');
const express = require('express');
const { PORT } = require('./config');
const { apiRouter, mainRouter } = require('./routers');
const setupMiddlewares = require('./middlewares');
const upgradeWs = require('./ws');

const app = express();

// setup other
setupMiddlewares(app);

// api routes
app.use('/api', apiRouter);

// main routes
app.use('/', mainRouter);

const server = http.createServer(app);

upgradeWs(server);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
