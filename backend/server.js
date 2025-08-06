require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('./database');
const { authenticateToken } = require('./middleware/auth');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://auth-dashboard-app-i2oef3fz.devinapps.com',
    'https://devin-auth-dimhk59qc-kuman-kira-ruris-projects.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// デバッグミドルウェアを追加
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// ルートエンドポイントを追加
app.get('/', (req, res) => {
  res.json({ 
    message: 'Auth API Server is running',
    status: 'OK',
    endpoints: {
      register: '/api/register',
      login: '/api/login',
      dashboard: '/api/dashboard',
      health: '/api/health'
    }
  });
});

app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // 既存のユーザーをチェック
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = createUser({
        email,
        password: hashedPassword
      });

      const token = jwt.sign(
        { userId: newUser.id, email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: 'User created successfully',
        token,
        user: { id: newUser.id, email: newUser.email }
      });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to create user' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      const user = findUserByEmail(email);

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, email: user.email }
      });
    } catch (err) {
      return res.status(500).json({ error: 'Server error' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/dashboard', authenticateToken, (req, res) => {
  res.json({
    message: 'Welcome to your dashboard!',
    user: req.user
  });
});

app.get('/api/health', (req, res) => {
  console.log('Health check endpoint called');
  res.json({ status: 'OK', message: 'Server is running' });
});

// 404ハンドラー
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: 'Route not found',
    method: req.method,
    url: req.originalUrl,
    availableEndpoints: {
      root: '/',
      health: '/api/health',
      register: '/api/register',
      login: '/api/login',
      dashboard: '/api/dashboard'
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Available endpoints:`);
  console.log(`  - GET /`);
  console.log(`  - GET /api/health`);
  console.log(`  - POST /api/register`);
  console.log(`  - POST /api/login`);
  console.log(`  - GET /api/dashboard`);
});
