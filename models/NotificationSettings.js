import mongoose from 'mongoose';

const NotificationSettingsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
    enum: ['ORDER_CREATED', 'ORDER_UPDATED', 'USER_REGISTERED', 'REVIEW_SUBMITTED', 'LOW_STOCK', 'COUPON_USED', 'ABANDONED_CART']
  },
  email: { type: Boolean, default: true },
  adminEmail: { type: Boolean, default: true },
  inApp: { type: Boolean, default: true },
  enabled: { type: Boolean, default: true }
});

export default mongoose.models.NotificationSettings || mongoose.model('NotificationSettings', NotificationSettingsSchema);
