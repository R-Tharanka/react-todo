const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Configure CORS to allow requests from the frontend
// Parse CORS_ORIGIN from env var - can be comma-separated list or single origin
const corsOrigins = process.env.CORS_ORIGIN ? 
  process.env.CORS_ORIGIN.split(',') : 
  ['http://localhost:3000'];

app.use(cors({
  origin: corsOrigins,
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Todo API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
