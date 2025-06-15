const express = require('express');
const app = express();
const notesRouter = require('./routes/notesRoutes');

app.use(express.json());

app.use('/api/notes', notesRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
