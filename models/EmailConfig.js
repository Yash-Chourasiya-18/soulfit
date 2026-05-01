import mongoose from 'mongoose';

const EmailConfigSchema = new mongoose.Schema({
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  smtpHost: { type: String, required: true },
  smtpPort: { type: Number, required: true },
  encryption: { type: String, enum: ['TLS', 'SSL'], default: 'TLS' },
  smtpUser: { type: String, required: true },
  smtpPass: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.EmailConfig || mongoose.model('EmailConfig', EmailConfigSchema);
