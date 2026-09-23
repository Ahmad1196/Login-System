import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import connectDB from './configs/db.js';
import cookieParser from 'cookie-parser';
import path from 'path'; 
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env'), });
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// -----------------------------
// Global Middleware
// -----------------------------

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

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