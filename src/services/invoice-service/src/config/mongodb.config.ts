import mongoose from 'mongoose';

export async function connectToMongoDB() {
  try {
    const uri = process.env.MONGO_URI!;
    await mongoose.connect(uri, {
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}