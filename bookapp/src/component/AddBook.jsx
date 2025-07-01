import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !genre || !price || Number(price) <= 0) {
      setError('Please fill all fields correctly.');
      return;
    }

    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      genre,
      price,
      description,
    };

    const books = JSON.parse(localStorage.getItem('books') || '[]');
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    navigate('/');
  };

  return (
    <div>
      <h2>Add Book</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        /><br />

        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        /><br />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br />

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
