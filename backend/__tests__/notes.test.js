const mongoose = require('mongoose');
const Note = require('../models/notesModel');
const request = require('supertest');
const app = require('../app');
const { MongoMemoryServer } = require('mongodb-memory-server');
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
}
);
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Note.deleteMany({});
}
);

describe('Notes API', () => {
  it('should create a new note', async () => {
    const response = await request(app)
      .post('/api/notes')
      .send({ title: 'Test Note', content: 'This is a test note.', noteDate: new Date() });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe('Test Note');
    expect(response.body.content).toBe('This is a test note.');
  });

  it('should get all notes', async () => {
    await Note.create({ title: 'Note 1', content: 'Content 1', noteDate: new Date() });
    await Note.create({ title: 'Note 2', content: 'Content 2', noteDate: new Date() });

    const response = await request(app).get('/api/notes');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
  });

  it('should update a note', async () => {
    const note = await Note.create({ title: 'Old Title', content: 'Old Content', noteDate: new Date() });
    const currentDate = new Date();

    // console.log('current note', `/api/notes/${note._id.toString()}`);
    const response = await request(app)
      .put(`/api/notes/${note._id.toString()}`)
      .send({ title: 'Updated Title', content: 'Updated Content', noteDate: currentDate });
      
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Updated Title');
    expect(response.body.content).toBe('Updated Content');
    expect(response.body.noteDate).toBe(currentDate.toISOString());
  });

  it('should delete a note', async () => {
    const note = await Note.create({ title: 'Delete Me', content: 'Delete Content', noteDate: new Date() });

    const response = await request(app).delete(`/api/notes/${note._id}`);

    expect(response.statusCode).toBe(204);

    const deletedNote = await Note.findById(note._id);
    expect(deletedNote).toBeNull();
  });
}
);
describe('Error Handling', () => {
  it('should return 404 for non-existing note on update', async () => {
    const response = await request(app)
      .put('/api/notes/60c72b2f9b1d8c001c8e4f1a')
      .send({ title: 'Non-existing Note', content: 'Content', noteDate: new Date() });

      // console.log(response.statusCode);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Note not found');
  });

  it('should return 404 for non-existing note on delete', async () => {
    const response = await request(app).delete('/api/notes/60c72b2f9b1d8c001c8e4f1a');

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Note not found');
  });
}
);
describe('Validation', () => {
  it('should return 400 for missing title or content on note creation', async () => {
    const response = await request(app).post('/api/notes').send({ title: '', content: '', noteDate: new Date() });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Title, content, and date are required');
  });

  it('should return 400 for missing title or content on note update', async () => {
    const note = await Note.create({ title: 'Test Note', content: 'Test Content', noteDate: new Date() });

    const response = await request(app)
      .put(`/api/notes/${note._id}`)
      .send({ title: '', content: '', noteDate: new Date() });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Title, content, and date are required');
  });
}
);