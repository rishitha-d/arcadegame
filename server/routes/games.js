const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { authMiddleware } = require('../controllers/authController');

router.get('/', gameController.listGames);
router.get('/:id', gameController.getGame);
router.post('/', authMiddleware, gameController.createGame); // Optionally, restrict to admin

module.exports = router; 