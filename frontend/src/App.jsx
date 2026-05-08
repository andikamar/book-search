import { ToastContainer } from 'react-toastify';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavoritePage from './pages/FavoritePage';

export default function App() {
  return (
    <>
      <ToastContainer
        newestOnTop
      />

      <nav className="navbar is-dark px-4">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">Books</Link>
          <Link to="/favorite" className="navbar-item">Favorite</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Routes>
    </>
  );
}