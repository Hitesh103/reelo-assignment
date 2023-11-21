import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    await mongoose.connect(mongoURI);

    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); 
  }
};