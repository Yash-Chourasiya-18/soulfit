import React from 'react';

export default function BlogPage() {
  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '100px', textAlign: 'center', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '20px' }}>Soul Fit Blog</h1>
      <p style={{ color: 'var(--gray)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px' }}>
        Stories about fashion, sustainability, and the souls behind the brand.
      </p>
      <div style={{ padding: '40px', border: '1px solid var(--light-gray)', borderRadius: '24px', background: '#fafafa' }}>
        <h3 style={{ marginBottom: '16px' }}>Starting Soon</h3>
        <p style={{ color: 'var(--gray)' }}>We're preparing something special for you. Stay tuned!</p>
      </div>
    </div>
  );
}
