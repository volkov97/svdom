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

  await svgFile.saveOriginal();

  db.insert(svgFile);

  res.json(svgFile.toJSON());
});

app.get('/api/svgs', async (req, res) => {
  return res.json(db.toPublicJSON());
});

app.use('/files', express.static(svgFolder));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
