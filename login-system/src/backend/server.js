import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import connectDB from './configs/db.js';
import path from 'path'; 
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env'), }); 
console.log('MONGO_URI:', process.env.MONGO_URI); 
connectDB();

const app = express();
const port = process.env.PORT || 3000;

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