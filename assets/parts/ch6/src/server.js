const path = require('path');
const express = require('express');
const { PORT } = require('./config');
const { apiRouter, mainRouter } = require('./routers');
const setupMiddlewares = require('./middlewares');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// setup view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// setup other
setupMiddlewares(app);

// for static js/css assets
app.use(express.static(path.resolve(__dirname, 'static')));

// api routes
app.use('/api', apiRouter);

// main routes
app.use('/', mainRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
