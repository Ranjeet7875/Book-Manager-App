import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import AddBook from './component/AddBook';
import BookDetail from './component/BookDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
