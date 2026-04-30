import React from 'react';

export default function ShippingPage() {
  return (
    <div className="container" style={{ paddingTop: '60px', paddingBottom: '100px', maxWidth: '800px', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '40px', textAlign: 'center' }}>Shipping Policy</h1>
      
      <div style={{ fontSize: '15px', lineHeight: 1.8, color: '#444' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>1. Order Processing</h3>
        <p style={{ marginBottom: '24px' }}>All orders are processed within 2–5 business days after successful payment confirmation.</p>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>2. Delivery Timeline</h3>
        <p style={{ marginBottom: '24px' }}>Estimated delivery time is 3–10 business days, depending on your location and the shipping partner's logistics.</p>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>3. Shipping Charges</h3>
        <p style={{ marginBottom: '24px' }}>Shipping charges, if applicable, will be calculated based on weight and destination, and displayed clearly at checkout.</p>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>4. Delays</h3>
        <p style={{ marginBottom: '16px' }}>While we aim to deliver every order on time, delays may occur due to:</p>
        <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
          <li>Courier service issues</li>
          <li>Weather conditions</li>
          <li>Unexpected logistical challenges</li>
        </ul>
        <p style={{ marginBottom: '24px' }}>Soul Fit is not liable for such unexpected delays but we will always assist you in tracking your package.</p>

        <div style={{ marginTop: '60px', padding: '24px', background: '#f9f9f9', borderRadius: '12px', textAlign: 'center' }}>
          <p style={{ fontWeight: 600, color: 'var(--black)' }}>Need help tracking your order?</p>
          <a href="/track" style={{ color: 'var(--black)', textDecoration: 'underline', fontWeight: 700 }}>Go to Track Order Page</a>
        </div>
      </div>
    </div>
  );
}
