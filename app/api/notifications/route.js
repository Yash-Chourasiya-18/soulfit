import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import NotificationSettings from '@/models/NotificationSettings';

// Mock Auth Helper
const checkAuth = (request) => {
  // In a real production app, check cookies or Authorization header
  // return true if authenticated as admin
  return true; 
};

export async function GET(request) {
  try {
    if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    await dbConnect();
    let settings = await NotificationSettings.find({});
    
    if (settings.length === 0) {
      const defaults = [
        'ORDER_CREATED', 'ORDER_UPDATED', 'USER_REGISTERED', 
        'REVIEW_SUBMITTED', 'LOW_STOCK', 'COUPON_USED', 'ABANDONED_CART'
      ].map(type => ({ type, email: true, adminEmail: true, inApp: true, enabled: true }));
      
      settings = await NotificationSettings.insertMany(defaults);
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('[NOTIFICATIONS_GET]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    await dbConnect();
    const data = await request.json();
    const { type, email, adminEmail, inApp, enabled } = data;
    
    if (!type) return NextResponse.json({ error: 'Type is required' }, { status: 400 });

    const updated = await NotificationSettings.findOneAndUpdate(
      { type },
      { $set: { email, adminEmail, inApp, enabled } },
      { new: true, upsert: true, runValidators: true }
    );
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error('[NOTIFICATIONS_PUT]', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
