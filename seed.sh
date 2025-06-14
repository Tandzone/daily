API_URL="http://localhost:8000/api/notes"

# Create a note
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Note 1",
    "content": "This is a sample note created for testing purposes."
  }'

echo 
# Create another note
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Note 2",
    "content": "This is another sample note created for testing purposes."
  }'
echo
# Create a third note
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Note 3",
    "content": "This is yet another sample note created for testing purposes."
  }'
  