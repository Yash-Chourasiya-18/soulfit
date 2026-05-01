import React from 'react';

export default function PressPage() {
  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '100px', textAlign: 'center', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '20px' }}>Press & Media</h1>
      <p style={{ color: 'var(--gray)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px' }}>
        For press inquiries, brand assets, and media relations.
      </p>
      <div style={{ padding: '40px', border: '1px solid var(--light-gray)', borderRadius: '24px', background: '#fafafa' }}>
        <h3 style={{ marginBottom: '16px' }}>Media Kit Coming Soon</h3>
        <p style={{ color: 'var(--gray)' }}>Contact us at <a href="mailto:press@soulfit.com" style={{ color: 'var(--black)', fontWeight: 600 }}>press@soulfit.com</a> for more information.</p>
      </div>
    </div>
  );
}
