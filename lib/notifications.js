import dbConnect from './db';
import NotificationSettings from '@/models/NotificationSettings';
import EmailConfig from '@/models/EmailConfig';
import Notification from '@/models/Notification';
import nodemailer from 'nodemailer';
import { decrypt } from './security';

/**
 * Trigger a notification based on event type
 * @param {Object} params
 * @param {string} params.type - ORDER_CREATED, ORDER_UPDATED, USER_REGISTERED, REVIEW_SUBMITTED, LOW_STOCK
 * @param {string} params.message - The notification message
 * @param {string} params.userId - Target user ID (or 'admin')
 * @param {Object} params.data - Dynamic data for email templates
 */
export async function triggerNotification({ type, message, userId, data }) {
  try {
    await dbConnect();
    
    // 1. Fetch settings for this type
    const settings = await NotificationSettings.findOne({ type });
    if (!settings || !settings.enabled) return;

    // 2. Handle In-App Notification
    if (settings.inApp) {
      await Notification.create({
        userId,
        message,
        type,
        read: false
      });
    }

    // 3. Handle Email
    if (settings.email || settings.adminEmail) {
      const config = await EmailConfig.findOne().sort({ createdAt: -1 });
      if (config && config.smtpPass) {
        const transporter = nodemailer.createTransport({
          host: config.smtpHost,
          port: config.smtpPort,
          secure: config.encryption === 'SSL',
          auth: {
            user: config.smtpUser,
            pass: decrypt(config.smtpPass), // Decrypt secure password
          },
        });

        const targetEmail = settings.adminEmail && userId === 'admin' ? config.senderEmail : data?.userEmail;

        if (targetEmail) {
          await transporter.sendMail({
            from: `"${config.senderName}" <${config.senderEmail}>`,
            to: targetEmail,
            subject: `SoulFit - ${type.replace(/_/g, ' ')}`,
            text: message,
            html: `
              <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #000;">SoulFit Notification</h2>
                <p>${message}</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <small style="color: #999;">This is an automated message from your SoulFit store.</small>
              </div>
            `
          });
        }
      }
    }
  } catch (error) {
    console.error('Notification trigger error:', error);
  }
}
