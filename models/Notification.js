import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Can be 'admin' or user ID
  message: { type: String, required: true },
  type: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
