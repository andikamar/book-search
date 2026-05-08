import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import raterJs from 'rater-js';

function Rating({ value }) {
  const ratingRef = useRef(null);

  useEffect(() => {
    if (ratingRef.current) {
      ratingRef.current.innerHTML = '';

      raterJs({
        element: ratingRef.current,
        rating: Number(value) || 0,
        max: 5,
        starSize: 22,
        readOnly: true,
      });
    }
  }, [value]);

  return <div ref={ratingRef}></div>;
}

export default function FavoritePage() {
  const [items, setItems] = useState([]);
  const [animationData, setAnimationData] = useState(null);

  const loadData = async () => {
    const res = await axios.get('http://localhost:5000/favorite');
    setItems(res.data);
  };

  const removeItem = async (id) => {
    await axios.delete(`http://localhost:5000/favorite/${id}`);

    toast.success('Removed from favorite');

    loadData();
  };

  useEffect(() => {
    loadData();

    fetch(
      'https://lottie.host/2fb611c6-bd32-4548-8abd-0795368b843e/4NFuxvlVoz.json'
    )
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="title has-text-centered mb-5">
        Favorite Books
      </h1>

      {items.length === 0 ? (
        <div
          className="box has-text-centered py-6 px-5"
          style={{
            maxWidth: '520px',
            margin: '60px auto',
            borderRadius: '24px',
            boxShadow: '0 12px 35px rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              width: '220px',
              margin: '0 auto',
            }}
          >
            {animationData && (
              <Lottie
                animationData={animationData}
                loop
              />
            )}
          </div>

          <h2 className="title is-4 mt-2">
            Your favorites list is empty
          </h2>

          <p className="has-text-grey mb-5">
            Save the books you love and build your
            personal reading collection.
          </p>

          <a
            href="/"
            className="button is-danger is-medium"
          >
            Explore Books
          </a>
        </div>
      ) : (
        items.map((item) => (
          <div className="box" key={item._id}>
            <p>
              <strong>{item.title}</strong>
            </p>

            <p>{item.author}</p>

            <div className="mt-3 mb-3">
              <Rating value={item.rating} />
            </div>

            <button
              className="button is-danger mt-2"
              onClick={() => removeItem(item._id)}
            >
              Remove Favorite
            </button>
          </div>
        ))
      )}
    </div>
  );
}