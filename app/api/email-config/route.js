import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

export async function GET() {
  return NextResponse.json({
    senderName: 'Ghar Saaj Admin',
    senderEmail: 'admin@gharsaa.in',
    smtpHost: 'smtp.gharsaa.in',
    smtpPort: 587,
    encryption: 'TLS',
    smtpUser: 'admin',
    smtpPass: '********'
  });
}

export async function POST() {
  return NextResponse.json({ message: 'Configuration saved (Mock Mode)' });
}
