import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();
const port = 3000;

// -----------------------------
// Global Middleware
// -----------------------------

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// -----------------------------
// Test Route
// -----------------------------

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
  });
});



// -----------------------------
// Server
// -----------------------------

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});