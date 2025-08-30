const reviewModel = require('../models/review');

exports.addReview = async (req, res) => {
  const pool = req.app.get('db');
  const { id: gameId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.id;
  try {
    const review = await reviewModel.addReview(pool, { userId, gameId, rating, comment });
    res.status(201).json({ review });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add review', error: err.message });
  }
};

exports.getReviews = async (req, res) => {
  const pool = req.app.get('db');
  const { id: gameId } = req.params;
  try {
    const reviews = await reviewModel.getReviewsByGame(pool, gameId);
    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: err.message });
  }
}; 