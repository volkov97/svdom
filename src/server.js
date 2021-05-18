const express = require('express');
const { svgFolder } = require('./config');
const db = require('./entities/Database');
const SvgFile = require('./entities/SvgFile');

const app = express();

app.use(express.json());

app.get('/ping', (req, res) => res.json({ ping: 'pong' }));

app.post('/api/svgs', async (req, res) => {
  const { content } = req.body;

  const svgFile = new SvgFile();

  svgFile.setContent(content);

  await db.insert(svgFile);

  res.json(svgFile.toJSON());
});

app.get('/api/svgs', async (req, res) => {
  return res.json(db.toPublicJSON());
});

app.delete('/api/svgs/:id', async (req, res) => {
  const svgId = req.params.id;

  const svgFile = await db.remove(svgId);

  if (svgFile === undefined) {
    return res.status(404).end();
  }

  return res.json(svgFile.toJSON());
});

app.put('/api/svgs/:id', async (req, res) => {
  const svgId = req.params.id;
  const isBookmarked = req.body.isBookmarked;

  const copy = db.setBoookmarked(svgId, isBookmarked);

  if (copy === undefined) {
    return res.sendStatus(400);
  }

  if (copy === null) {
    return res.sendStatus(200);
  }

  return res.json(copy);
});

app.use('/files', express.static(svgFolder));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
