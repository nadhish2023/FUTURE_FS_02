import mongoose from 'mongoose';

let cachedConnection: typeof mongoose | null = null;

const connectDB = async () => {
  if (cachedConnection) {
    console.log('Using existing database connection.');
    return cachedConnection;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    cachedConnection = db;
    console.log('New database connection established.');
    return db;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw new Error('Could not connect to database.');
  }
};
export default connectDB;