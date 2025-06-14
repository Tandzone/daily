const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

const notesRouter = require('./routes/notesRoutes');
app.use('/api/notes', notesRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
