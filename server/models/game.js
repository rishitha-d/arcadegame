module.exports = {
  async getAllGames(pool) {
    const result = await pool.query('SELECT * FROM games ORDER BY id DESC');
    return result.rows;
  },

  async getGameById(pool, id) {
    const result = await pool.query('SELECT * FROM games WHERE id = $1', [id]);
    return result.rows[0];
  },

  async createGame(pool, { title, thumbnail, embedurl, tags }) {
    const result = await pool.query(
      'INSERT INTO games (title, thumbnail, embedurl, tags) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, thumbnail, embedurl, tags]
    );
    return result.rows[0];
  },
}; 