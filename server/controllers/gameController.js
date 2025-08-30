const gameModel = require('../models/game');

exports.listGames = async (req, res) => {
  const pool = req.app.get('db');
  try {
    const games = await gameModel.getAllGames(pool);
    res.json({ games });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch games', error: err.message });
  }
};

exports.getGame = async (req, res) => {
  const pool = req.app.get('db');
  const { id } = req.params;
  try {
    const game = await gameModel.getGameById(pool, id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json({ game });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch game', error: err.message });
  }
};

exports.createGame = async (req, res) => {
  const pool = req.app.get('db');
  const { title, thumbnail, embedurl, tags } = req.body;
  // Optionally, check for admin privileges here
  try {
    const game = await gameModel.createGame(pool, { title, thumbnail, embedurl, tags });
    res.status(201).json({ game });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create game', error: err.message });
  }
}; 