import mongoose from 'mongoose';
import app from './app';

const mongoUri = process.env.MONGO_URI;

async function startServer() {
  if (mongoUri) {
    try {
      await mongoose.connect(mongoUri);
      console.log('MongoDB connected');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    }
  } else {
    console.warn('MONGO_URI not set, skipping MongoDB connection');
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
