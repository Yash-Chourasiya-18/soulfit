"use client";

import React, { useState } from 'react';

export default function TrackPage() {
  const [orderId, setOrderId] = useState('');
  const [result, setResult] = useState(null);

  const handleTrackOrder = () => {
    if (!orderId) return;
    // Simulate API call
    setResult(`Status for ${orderId}: IN TRANSIT (Arriving in 2 Days)`);
  };

  return (
    <div className="container" style={{ paddingTop: '40px', maxWidth: '500px', minHeight: '60vh' }}>
      <h2 className="section-title text-center">Track Your Order</h2>
      <div style={{ background: 'var(--cream)', padding: '32px', borderRadius: '16px' }}>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--gray)' }}>Enter your Order ID below to check the current delivery status.</p>
        <input 
          type="text" 
          className="input-field" 
          placeholder="e.g. ORD-123456" 
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          style={{ marginBottom: '16px' }} 
        />
        <button className="hero-btn w-100" onClick={handleTrackOrder}>TRACK STATUS</button>
        {result && (
          <div style={{ marginTop: '20px', padding: '16px', border: '1px dashed var(--black)', borderRadius: '8px' }}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
