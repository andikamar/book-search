import axios from 'axios';
import { useEffect, useRef } from 'react';
import raterJs from 'rater-js';
import { toast } from 'react-toastify';

export default function BookCard({ book }) {
  const info = book.volumeInfo;

   const ratingRef = useRef(null);

  useEffect(() => {
    if (ratingRef.current) {
      raterJs({
        element: ratingRef.current,
        rating: info.averageRating || 0,
        max: 5,
        starSize: 22,
        readOnly: true
      });
    }
  }, [info.averageRating]);

const addFavorite = async () => {
  try {
    await axios.post('https://book-search-backend.up.railway.app/favorite', {
      bookId: book.id,
      title: info.title,
      author: info.authors?.join(', '),
      thumbnail: info.imageLinks?.thumbnail,
      rating: Number(info.averageRating) || 0
    });

    toast.success('Added to favorite');
  } catch (err) {
    if (err.response?.status === 409) {
      toast.info('Book already in favorite');
    } else {
      toast.error('Failed to add favorite');
    }
  }
};

  return (
    <div className="column is-4">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={info.imageLinks?.thumbnail} alt={info.title} />
          </figure>
        </div>
        <div className="card-content">
          <p className="title is-6">{info.title}</p>
          <p>{info.authors?.join(', ')}</p>
          <div className="is-flex is-align-items-center is-justify-content-space-between mt-3">
          <div ref={ratingRef}></div>
          <button
            className="button is-link is-small"
            onClick={addFavorite}>
            Add Favorite
          </button>
         </div>
        </div>
      </div>
    </div>
  );
}