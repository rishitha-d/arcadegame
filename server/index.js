require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

// Load env variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL pool
const pool = new Pool();
app.set('db', pool);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/games', require('./routes/games'));
app.use('/api/games', require('./routes/reviews'));

// Health check
app.get('/', (req, res) => res.send('Arcade backend running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 