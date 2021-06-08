const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const svgExists = require('./validators/middlewares/svgExists');
const api = require('./controllers/api');
const ping = require('./controllers/ping');
const pages = require('./controllers/pages');

// routes for /api

const apiRouter = new express.Router();

apiRouter.get('/svgs', api.getSvgs);
apiRouter.get('/svgs/:id', svgExists, api.getSvg);
apiRouter.post('/svgs', api.addSvg);
apiRouter.put('/svgs/:id', svgExists, api.likeSvg);
apiRouter.delete('/svgs/:id', api.deleteSvg);

exports.apiRouter = apiRouter;

// routes for /

const mainRouter = new express.Router();

mainRouter.get('/ping', ping);
mainRouter.get('/files/compressed/:filename', pages.downloadCompressedSvg);
mainRouter.use('/files/:filename', pages.downloadSvg);
mainRouter.use(
  '/',
  process.env.NODE_ENV === 'production'
    ? express.static(path.resolve(__dirname, '..', 'client', 'build'))
    : createProxyMiddleware({
        target: 'http://localhost:3001',
        changeOrigin: true,
      })
);

exports.mainRouter = mainRouter;
