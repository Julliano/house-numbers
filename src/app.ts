import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import snippetsRouter from './routes/snippets';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect Mongo only if URI provided (helps in tests too)
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.warn('MONGO_URI not set, skipping MongoDB connection');
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/snippets', snippetsRouter);

export default app;