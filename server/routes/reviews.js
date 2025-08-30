const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controllers/reviewController');
const { authMiddleware } = require('../controllers/authController');

// GET /api/games/:id/reviews
router.get('/:id/reviews', reviewController.getReviews);
// POST /api/games/:id/reviews
router.post('/:id/reviews', authMiddleware, reviewController.addReview);

module.exports = router; 