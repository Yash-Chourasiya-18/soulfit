import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

export async function GET() {
  return NextResponse.json({
    senderName: 'SoulFit Admin',
    senderEmail: 'admin@soulfit.com',
    smtpHost: 'smtp.soulfit.com',
    smtpPort: 587,
    encryption: 'TLS',
    smtpUser: 'admin',
    smtpPass: '********'
  });
}

export async function POST() {
  return NextResponse.json({ message: 'Configuration saved (Mock Mode)' });
}
