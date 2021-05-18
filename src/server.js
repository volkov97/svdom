const path = require('path');
const express = require('express');
const { svgFolder } = require('./config');
const db = require('./entities/Database');
const SvgFile = require('./entities/Svg');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'static')));

app.use('/files', express.static(svgFolder));

app.get('/ping', (req, res) => res.json({ ping: 'pong' }));

app.post('/api/svgs', async (req, res) => {
  const { content } = req.body;

  const svgFile = new SvgFile();

  await db.insert(svgFile, content);

  res.json(svgFile.toPublicJSON());
});

app.get('/api/svgs/:id', async (req, res) => {
  const svgId = req.params.id;

  return res.json(db.findOne(svgId).toPublicJSON());
});

app.delete('/api/svgs/:id', async (req, res) => {
  const svgId = req.params.id;

  const id = await db.remove(svgId);

  return res.json({ id });
});

app.put('/api/svgs/:id', async (req, res) => {
  const svgId = req.params.id;
  const isLiked = req.body.isLiked;

  db.setBoookmarked(svgId, isLiked);

  return res.json({ isLiked });
});

app.use('/svg/:id', (req, res) => {
  const svgId = req.params.id;

  const svg = db.findOne(svgId).toPublicJSON();

  return res.render('svg', { svg });
});

app.use('/', (req, res) => {
  const allSvgs = db.find().map((svg) => svg.toPublicJSON());
  const likedSvgs = db.find(true).map((svg) => svg.toPublicJSON());

  return res.render('home', { allSvgs, likedSvgs });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
