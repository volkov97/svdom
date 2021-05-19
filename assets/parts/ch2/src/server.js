const express = require('express');
const { PORT, svgFolder } = require('./config');
const db = require('./entities/Database');
const Svg = require('./entities/Svg');

const app = express();

app.use(express.json());

app.use('/files', express.static(svgFolder));

app.get('/ping', (req, res) => res.json({ ping: 'pong' }));

app.get('/api/svgs', (req, res) => {
  const allSvgs = db.find().map((svg) => svg.toPublicJSON());
  const likedSvgs = db.find(true).map((svg) => svg.toPublicJSON());

  return res.json({ allSvgs, likedSvgs });
});

app.get('/api/svgs/:id', (req, res) => {
  const svgId = req.params.id;

  return res.json(db.findOne(svgId).toPublicJSON());
});

app.post('/api/svgs', async (req, res) => {
  const { content } = req.body;

  const svgFile = new Svg();

  await db.insert(svgFile, content);

  return res.json(svgFile.toPublicJSON());
});

app.put('/api/svgs/:id', (req, res) => {
  const svgId = req.params.id;
  const isLiked = req.body.isLiked;

  db.setLiked(svgId, isLiked);

  return res.json({ isLiked });
});

app.delete('/api/svgs/:id', async (req, res) => {
  const svgId = req.params.id;

  const id = await db.remove(svgId);

  return res.json({ id });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
