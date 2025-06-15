const request = require('supertest');
const app = require('../app');

describe('get /api/notes', () => {
  it('should return an array of notes', async () => {
    const response = await request(app).get('/api/notes');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('content');
      expect(response.body[0]).toHaveProperty('createdAt');
    }
  });
});

describe('post /api/notes', () => {
  it('should add a new note', async () => {
    const newNote = {
      title: 'Test Note',
      content: 'This is a test note.'
    };

    const response = await request(app)
      .post('/api/notes')
      .send(newNote);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newNote.title);
    expect(response.body.content).toBe(newNote.content);
  });

  it('should return 400 if title or content is missing', async () => {
    const response = await request(app)
      .post('/api/notes')
      .send({ title: 'Incomplete Note' });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Title and content are required');
  });
}
);
describe('put /api/notes/:id', () => {
  it('should update an existing note', async () => {
    const newNote = {
      title: 'Update Note',
      content: 'This note will be updated.'
    };

    const postResponse = await request(app)
      .post('/api/notes')
      .send(newNote);

    const updatedNote = {
      title: 'Updated Note',
      content: 'This note has been updated.'
    };

    const response = await request(app)
      .put(`/api/notes/${postResponse.body.id}`)
      .send(updatedNote);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(updatedNote.title);
    expect(response.body.content).toBe(updatedNote.content);
  });

  it('should return 400 if note ID is missing', async () => {
    const response = await request(app)
      .put('/api/notes/')
      .send({ title: 'No ID Note', content: 'This note has no ID.' });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Note ID is required');
  });
});
describe('delete /api/notes/:id', () => {
  it('should delete a note', async () => {
    const newNote = {
      title: 'Delete Note',
      content: 'This note will be deleted.'
    };

    const postResponse = await request(app)
      .post('/api/notes')
      .send(newNote);

    const response = await request(app)
      .delete(`/api/notes/${postResponse.body.id}`);

    expect(response.statusCode).toBe(204);
  });

  it('should return 404 if note does not exist', async () => {
    const response = await request(app)
      .delete('/api/notes/nonexistent-id');

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Note not found');
  });
});
afterAll(async () => {
  // Clean up the database after tests
  await request(app).delete('/api/notes');
});