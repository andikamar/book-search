import { useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const booksPerPage = 9;

  const searchBooks = async (currentPage = 1) => {
    if (!query.trim()) return;

    setLoading(true);

    const startIndex = (currentPage - 1) * booksPerPage;

    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${booksPerPage}`
    );

    setBooks(res.data.items || []);
    setTotalItems(res.data.totalItems || 0);

    setLoading(false);
  };

  const totalPages = Math.min(
    Math.ceil(totalItems / booksPerPage),
    20
  );

  return (
    <div className="container mt-5">
       <h1 className="title has-text-centered mb-5">Search Books</h1>

      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books"
          />
        </div>

        <div className="control">
          <button
            className="button is-primary"
            onClick={() => {
              setPage(1);
              searchBooks(1);
            }}
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <progress
          className="progress is-small is-primary"
          max="100"
        >
          Loading
        </progress>
      ) : (
        <>
          {books.length > 0 && (
            <>
              <div className="columns is-multiline mt-4">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>

              <div className="has-text-centered mt-4">
                Page {page} / {totalPages}
              </div>

              <div className="buttons is-centered mt-4">
                <button
                  className="button"
                  disabled={page === 1}
                  onClick={() => {
                    const p = page - 1;
                    setPage(p);
                    searchBooks(p);
                  }}
                >
                  Prev
                </button>

                <button
                  className="button is-primary"
                  disabled={page >= totalPages}
                  onClick={() => {
                    const p = page + 1;
                    setPage(p);
                    searchBooks(p);
                  }}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}