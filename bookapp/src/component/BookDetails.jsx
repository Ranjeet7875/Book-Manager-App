import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../App.css';

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const books = JSON.parse(localStorage.getItem('books') || '[]');
  const book = books.find(b => b.id === id);

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecommendations() {
      setLoading(true);
      setError(null);
      try {
        const prompt = `Suggest 3 books similar to '${book.title}' by ${book.author}. ONLY return a JSON array with 3 objects in the format: [{"title": "Book Title", "author": "Author Name"}].`;

        const response = await fetch(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCqMSRHsBBpaEwFZ1_rAFf9znGQ3k5OnS8',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        const jsonStart = text.indexOf('[');
        const jsonEnd = text.lastIndexOf(']') + 1;
        const booksJson = text.slice(jsonStart, jsonEnd);
        const parsed = JSON.parse(booksJson);
        setRecommendations(parsed);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch recommendations.');
      }
      setLoading(false);
    }

    if (book) {
      fetchRecommendations();
    }
  }, [book]);

  if (!book) return <h2>Book not found</h2>;

  return (
    <div className="book-detail">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Price:</strong> ${book.price}</p>
      <p><strong>Description:</strong> {book.description || 'N/A'}</p>
      <button onClick={() => navigate('/')}>Back to Home</button>

      <h3>AI Recommendations</h3>
      {loading && <p>Loading recommendations...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="recommendations">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="recommendation-card">
            <h4>{rec.title}</h4>
            <p><strong>Author:</strong> {rec.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookDetail;
