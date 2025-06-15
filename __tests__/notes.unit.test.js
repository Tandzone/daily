const notes = require('../data/notes');
const { getNotes } = require('../controllers/notesController');

describe('Notes Controller', () => {
    let notes;
    describe('getNotes', () => {
        it('should return an array of notes', () => {
            const req = {};
            const res = {
            json: (data) => {
                expect(Array.isArray(data)).toBe(true);
                notes = data; // Store the notes for further tests
                console.log('Notes:', notes);
            }
        };

        getNotes(req, res);

        // expect(res.json).toHaveBeenCalledWith(expect.any(Array));
        });
    });

  // Additional tests for addNote, updateNote, deleteNote, and getNoteById can be added here
});