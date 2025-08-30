module.exports = {
  async addReview(pool, { userId, gameId, rating, comment }) {
    const result = await pool.query(
      'INSERT INTO reviews (user_id, game_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, gameId, rating, comment]
    );
    return result.rows[0];
  },

  async getReviewsByGame(pool, gameId) {
    const result = await pool.query(
      `SELECT r.*, u.username FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.game_id = $1 ORDER BY r.id DESC`,
      [gameId]
    );
    return result.rows;
  },
}; 