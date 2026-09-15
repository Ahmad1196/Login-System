import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});