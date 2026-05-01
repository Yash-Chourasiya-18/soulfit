import React from 'react';

export default function CareersPage() {
  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '100px', textAlign: 'center', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '20px' }}>Join Our Soulful Team</h1>
      <p style={{ color: 'var(--gray)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px' }}>
        We're always looking for passionate souls to join us in redefining fashion.
      </p>
      <div style={{ padding: '40px', border: '1px solid var(--light-gray)', borderRadius: '24px', background: '#fafafa' }}>
        <h3 style={{ marginBottom: '16px' }}>No Current Openings</h3>
        <p style={{ color: 'var(--gray)' }}>Check back later or send your resume to <a href="mailto:careers@soulfit.com" style={{ color: 'var(--black)', fontWeight: 600 }}>careers@soulfit.com</a></p>
      </div>
    </div>
  );
}
