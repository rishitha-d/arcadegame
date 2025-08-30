const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

exports.signup = async (req, res) => {
  const pool = req.app.get('db');
  const { username, email, password } = req.body;
  try {
    const existing = await userModel.findByEmail(pool, email);
    if (existing) return res.status(400).json({ message: 'Email already in use' });
    const user = await userModel.createUser(pool, { username, email, password });
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  const pool = req.app.get('db');
  const { email, password } = req.body;
  try {
    const user = await userModel.findByEmail(pool, email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.me = async (req, res) => {
  const pool = req.app.get('db');
  const userId = req.user.id;
  try {
    const user = await userModel.findById(pool, userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user', error: err.message });
  }
};

// Middleware to verify JWT
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

exports.authMiddleware = authMiddleware; 