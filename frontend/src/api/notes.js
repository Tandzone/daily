const API_URL = 'http://localhost:3001/api/notes';

export async function getNotes() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function createNote(note) {
  console.log("Creating note:", JSON.stringify(note));
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note)
  });
  return await res.json();
}

export async function updateNote(id, note) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  })
  return await res.json();
}

export async function deleteNote(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
}