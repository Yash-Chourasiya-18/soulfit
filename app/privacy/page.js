import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="container" style={{ paddingTop: '60px', paddingBottom: '100px', maxWidth: '800px', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '40px', textAlign: 'center' }}>Privacy Policy</h1>
      
      <div style={{ fontSize: '15px', lineHeight: 1.8, color: '#444' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>1. Information We Collect</h3>
        <p style={{ marginBottom: '16px' }}>We may collect personal information such as:</p>
        <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
          <li>Name</li>
          <li>Phone number</li>
          <li>Email address</li>
          <li>Shipping address</li>
        </ul>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>2. Use of Information</h3>
        <p style={{ marginBottom: '16px' }}>Your information is used to:</p>
        <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
          <li>Process and deliver orders</li>
          <li>Provide customer support</li>
          <li>Improve our services</li>
        </ul>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>3. Data Protection</h3>
        <p style={{ marginBottom: '24px' }}>Soul Fit takes appropriate measures to protect your personal data and ensure secure transactions. We use industry-standard encryption and security protocols.</p>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>4. Third-Party Sharing</h3>
        <p style={{ marginBottom: '24px' }}>Soul Fit does not sell or share your personal information with third parties, except as required for order fulfillment (e.g., courier services like Delhivery, BlueDart).</p>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>5. Consent</h3>
        <p style={{ marginBottom: '24px' }}>By using our services, you consent to the collection and use of your information as outlined in this policy.</p>

        <div style={{ marginTop: '60px', padding: '24px', background: '#f9f9f9', borderRadius: '12px', textAlign: 'center' }}>
          <p style={{ fontWeight: 600, color: 'var(--black)' }}>Questions about our Privacy Policy?</p>
          <p style={{ color: 'var(--gray)' }}>Reach out at support@soulfit.com</p>
        </div>
      </div>
    </div>
  );
}
