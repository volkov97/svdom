const { json } = require('express');
const disablePoweredBy = require('./disablePoweredBy');
const requestId = require('./requestId');
const routesLogger = require('./routesLogger');

module.exports = (app) => {
  app.use(json());

  app.use(disablePoweredBy);

  app.use(requestId);

  app.use(routesLogger);
};
