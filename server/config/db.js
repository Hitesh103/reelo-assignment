import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    const mongoURI = "mongodb+srv://hp5741609:INSEhruk3WeXrb8R@cluster0.wkmelel.mongodb.net/";

    await mongoose.connect(mongoURI);

    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); 
  }
};