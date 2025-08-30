import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewSection({ gameId }) {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/games/${gameId}/reviews`)
      .then(res => setReviews(res.data.reviews || []));
  }, [gameId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/games/${gameId}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment("");
      setRating(5);
      // Refresh reviews
      const res = await axios.get(`http://localhost:5000/api/games/${gameId}/reviews`);
      setReviews(res.data.reviews || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post review");
    }
  };

  return (
    <div className="review-section">
      <h3>Reviews</h3>
      <form onSubmit={handleSubmit}>
        <select value={rating} onChange={e => setRating(Number(e.target.value))}>
          {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
        </select>
        <input type="text" placeholder="Write a review..." value={comment} onChange={e => setComment(e.target.value)} required />
        <button type="submit">Post</button>
        {error && <p className="error">{error}</p>}
      </form>
      <ul>
        {reviews.map(r => (
          <li key={r.id}>
            <b>{r.username}</b> ({r.rating}★): {r.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}