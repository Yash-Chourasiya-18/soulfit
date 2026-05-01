import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/db';
import EmailConfig from '@/models/EmailConfig';
import { decrypt } from '@/lib/security';

const checkAuth = (request) => true; // Mock

// Simple memory-based rate limiting (Reset on restart)
const rateLimit = new Map();

export async function POST(request) {
  try {
    if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    // Rate limit check
    const ip = request.headers.get('x-forwarded-for') || 'local';
    const lastRequest = rateLimit.get(ip) || 0;
    if (Date.now() - lastRequest < 10000) { // 10s cooldown
      return NextResponse.json({ error: 'Too many requests. Please wait 10 seconds.' }, { status: 429 });
    }
    rateLimit.set(ip, Date.now());

    await dbConnect();
    const config = await EmailConfig.findOne().sort({ createdAt: -1 });
    
    if (!config) {
      return NextResponse.json({ error: 'Email configuration not found' }, { status: 404 });
    }

    const { targetEmail } = await request.json();

    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.encryption === 'SSL',
      auth: {
        user: config.smtpUser,
        pass: decrypt(config.smtpPass), // Decrypt for use
      },
    });

    await transporter.sendMail({
      from: `"${config.senderName}" <${config.senderEmail}>`,
      to: targetEmail,
      subject: "SoulFit - SMTP Production Test",
      text: "This is a secure production test email.",
      html: "<h3>Security Verified</h3><p>Your SMTP credentials have been successfully encrypted and tested.</p>",
    });

    return NextResponse.json({ message: 'Test email sent successfully!' });
  } catch (error) {
    console.error('[TEST_EMAIL_POST]', error);
    return NextResponse.json({ error: error.message || 'SMTP Authentication failed' }, { status: 500 });
  }
}
