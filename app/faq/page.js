import React from 'react';

export default function FAQPage() {
  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px', maxWidth: '800px', minHeight: '60vh' }}>
      <h2 className="section-title">Frequently Asked Questions</h2>
      <div style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--black)' }}>
        <h4>Do you offer free shipping?</h4>
        <p style={{ color: 'gray', marginBottom: '16px' }}>No, we charge a flat nominal fee of ₹50 on all orders to ensure premium delivery.</p>
        <h4>What is the return policy?</h4>
        <p style={{ color: 'gray' }}>We have a 10-day easy return policy for all unworn items with tags attached.</p>
      </div>
    </div>
  );
}
