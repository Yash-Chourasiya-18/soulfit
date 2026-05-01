import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import EmailConfig from '@/models/EmailConfig';
import { encrypt, decrypt } from '@/lib/security';

const checkAuth = (request) => true; // Mock

export async function GET(request) {
  try {
    if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    await dbConnect();
    const config = await EmailConfig.findOne().sort({ createdAt: -1 });
    
    if (config) {
      const sanitizedConfig = config.toObject();
      // Mask password for security
      sanitizedConfig.smtpPass = '********'; 
      return NextResponse.json(sanitizedConfig);
    }
    
    return NextResponse.json({});
  } catch (error) {
    console.error('[EMAIL_CONFIG_GET]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    await dbConnect();
    const data = await request.json();
    
    // Basic Validation
    if (!data.senderEmail || !data.smtpHost || !data.smtpPass) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Encrypt password before storing
    if (data.smtpPass && data.smtpPass !== '********') {
      data.smtpPass = encrypt(data.smtpPass);
    } else if (data.smtpPass === '********') {
      // If client sent back the mask, don't update password field
      delete data.smtpPass;
    }
    
    const config = await EmailConfig.findOneAndUpdate(
      {}, 
      { $set: data },
      { new: true, upsert: true, runValidators: true }
    );
    
    return NextResponse.json({ message: 'Configuration saved' });
  } catch (error) {
    console.error('[EMAIL_CONFIG_POST]', error);
    return NextResponse.json({ error: 'Failed to save configuration' }, { status: 500 });
  }
}
