const bcrypt = require('bcryptjs');

module.exports = {
  async createUser(pool, { username, email, password }) {
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hash]
    );
    return result.rows[0];
  },

  async findByEmail(pool, email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  async findById(pool, id) {
    const result = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },
}; 