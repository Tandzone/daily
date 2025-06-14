const app = require('./app');
const port = 3001;
const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/notesdb';
mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
