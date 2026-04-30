import React from 'react';

export default function ReturnsPage() {
  return (
    <div className="container" style={{ paddingTop: '60px', paddingBottom: '100px', maxWidth: '800px', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '40px', textAlign: 'center' }}>Return & Refund Policy</h1>
      
      <div style={{ fontSize: '15px', lineHeight: 1.8, color: '#444' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>1. Eligibility for Returns and Exchanges</h3>
        <p style={{ marginBottom: '16px' }}>Returns and exchanges are only applicable in cases where the product is defective, damaged, or incorrect at the time of delivery.</p>
        <p style={{ marginBottom: '16px', fontWeight: 600 }}>Soul Fit does not accept returns or exchanges for:</p>
        <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
          <li>Size issues (Please refer to size charts before ordering)</li>
          <li>Change of mind</li>
          <li>Color preference</li>
        </ul>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>2. Reporting an Issue</h3>
        <p style={{ marginBottom: '16px' }}>Customers must notify Soul Fit within 48 hours of delivery.</p>
        <p style={{ marginBottom: '16px' }}>The request must include:</p>
        <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
          <li>Order details (Order ID, Name)</li>
          <li>Clear photo or video evidence of the issue</li>
        </ul>
        <p style={{ marginBottom: '24px', color: '#d32f2f', fontWeight: 600 }}>Requests for order cancellation or modification will not be accepted once the order has been shipped.</p>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>3. Product Condition</h3>
        <p style={{ marginBottom: '16px' }}>To qualify for return or exchange:</p>
        <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
          <li>The item must be unused and unwashed</li>
          <li>All original tags and packaging must be intact</li>
        </ul>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>4. Resolution Process</h3>
        <p style={{ marginBottom: '16px' }}>Once the issue is verified by our quality team:</p>
        <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
          <li>A replacement will be provided, or</li>
          <li>A refund will be initiated (based on availability and customer preference)</li>
        </ul>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>5. Refund Timeline</h3>
        <p style={{ marginBottom: '24px' }}>Approved refunds will be processed within 5–7 working days and credited back to the original payment method.</p>

        <div style={{ marginTop: '60px', padding: '24px', background: '#f9f9f9', borderRadius: '12px', textAlign: 'center' }}>
          <p style={{ fontWeight: 600, color: 'var(--black)' }}>Need to report an issue?</p>
          <p style={{ color: 'var(--gray)', marginBottom: '12px' }}>Email us with proof at support@soulfit.com</p>
          <a href="/support" style={{ color: 'var(--black)', textDecoration: 'underline', fontWeight: 700 }}>Contact Support</a>
        </div>
      </div>
    </div>
  );
}
