import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
  if (!MONGODB_URI) {
    console.warn('MongoDB URI missing. Running in Mock Mode.');
    return null;
  }

  if (global.mongoose && global.mongoose.conn) {
    return global.mongoose.conn;
  }

  const promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  global.mongoose = { conn: await promise, promise };
  return global.mongoose.conn;
}

export default dbConnect;
