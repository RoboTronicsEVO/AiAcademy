import mongoose from 'mongoose';

let isConnected = false; // track connection status

export async function connectToDatabase() {
  if (isConnected) return;

  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skool';

  if (!MONGODB_URI) {
    console.warn('MONGODB_URI is not set. Skipping DB connection.');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('🗄️  Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}