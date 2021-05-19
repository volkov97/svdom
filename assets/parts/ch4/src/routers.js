const { Router } = require('express');

const ping = require('./controllers/ping');
const api = require('./controllers/api');
const pages = require('./controllers/pages');

// routes for /api

const apiRouter = new Router();

apiRouter.get('/svgs', api.getSvgs);
apiRouter.get('/svgs/:id', api.getSvg);
apiRouter.post('/svgs', api.addSvg);
apiRouter.put('/svgs/:id', api.likeSvg);
apiRouter.delete('/svgs/:id', api.deleteSvg);

exports.apiRouter = apiRouter;

// routes for /

const mainRouter = new Router();

mainRouter.get('/ping', ping);

mainRouter.get('/svg/:id', pages.svg);
mainRouter.get('/', pages.home);

exports.mainRouter = mainRouter;
