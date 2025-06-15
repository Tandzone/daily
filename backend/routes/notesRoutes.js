const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

// Route to get all notes
router.get('/', notesController.getNotes);
// Route to add a new note
router.post('/', notesController.addNote);
// Route to update an existing note
router.put('/:id', notesController.updateNote);
// Route to delete a note
router.delete('/:id', notesController.deleteNote);
// Export the router to be used in the main app
module.exports = router;
