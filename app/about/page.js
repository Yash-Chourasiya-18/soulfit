import React from 'react';

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px', maxWidth: '800px', minHeight: '60vh' }}>
      <h2 className="section-title">About Soul Fit</h2>
      <div style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--black)' }}>
        <p>Soul Fit is more than an apparel brand; it is a movement. We believe in crafting premium threads that connect souls. Every piece is designed with extreme attention to detail, using the finest fabrics to ensure you feel as good as you look.</p>
      </div>
    </div>
  );
}
