import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

function Home() {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('');
  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books') || '[]');
    setBooks(savedBooks);
  }, []);

  const genres = ['All', ...new Set(books.map(book => book.genre))];

  const filteredBooks = books
    .filter(book => category === 'All' || book.genre === category)
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'price') return parseFloat(a.price) - parseFloat(b.price);
      return 0;
    });

  return (
    <div style={{ padding: '20px' }}>
      <h1>Book Manager</h1>

      <div style={{ marginBottom: '20px'}}>
        <select value={category} className='category' onChange={(e) => setCategory(e.target.value)}>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>

        <select value={sortBy} className='select' onChange={(e) => setSortBy(e.target.value)} style={{ marginLeft: '10px' }}>
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>

        <Link to="/add-book">
          <button style={{ marginLeft: '10px' }}>Add New Book</button>
        </Link>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {filteredBooks.map(book => (
          <div key={book.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Price: ${book.price}</p>
            <Link to={`/book/${book.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
