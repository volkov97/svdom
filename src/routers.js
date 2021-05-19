const { Router } = require('express');

const ping = require('./controllers/ping');
const api = require('./controllers/api');
const pages = require('./controllers/pages');
const svgExists = require('./validators/middlewares/svgExists');

// routes for /api

const apiRouter = new Router();

apiRouter.get('/svgs', api.getSvgs);
apiRouter.get('/svgs/:id', api.getSvg);
apiRouter.post('/svgs', api.addSvg);
apiRouter.put('/svgs/:id', svgExists, api.likeSvg);
apiRouter.delete('/svgs/:id', api.deleteSvg);

exports.apiRouter = apiRouter;

// routes for /

const mainRouter = new Router();

mainRouter.get('/ping', ping);

mainRouter.get('/logs', pages.logs);
mainRouter.use('/files/:filename', pages.downloadSvg);
mainRouter.get('/svg/:id', pages.svg);
mainRouter.get('/', pages.home);

mainRouter.use(pages.notFound);

exports.mainRouter = mainRouter;
