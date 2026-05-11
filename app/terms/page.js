import React from 'react';

export default function TermsPage() {
  const effectiveDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="container" style={{ paddingTop: '60px', paddingBottom: '100px', maxWidth: '800px', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '10px', textAlign: 'center' }}>TERMS AND CONDITIONS</h1>
      <p style={{ textAlign: 'center', color: 'var(--gray)', fontSize: '14px', marginBottom: '40px' }}>Effective Date: {effectiveDate}</p>
      
      <div style={{ fontSize: '15px', lineHeight: 1.8, color: '#444' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>1. Introduction</h3>
        <p style={{ marginBottom: '24px' }}>Welcome to <strong>Ghar Saaj</strong>. These Terms and Conditions govern your use of our website, services, and purchase of luxury furniture. By accessing or using our services, you agree to be bound by these Terms.</p>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>2. Eligibility</h3>
        <p style={{ marginBottom: '24px' }}>By using this website, you confirm that you are at least 18 years of age or accessing under the supervision of a parent or legal guardian.</p>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>3. Products and Services</h3>
        <p style={{ marginBottom: '16px' }}>All furniture pieces listed on our platform are subject to availability. We reserve the right to discontinue or modify any design at any time without prior notice.</p>
        <p style={{ marginBottom: '24px' }}>We strive to ensure that product descriptions and images are accurate; however, slight variations in wood grain, fabric texture, and color may occur due to screen settings or natural material differences.</p>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>4. Pricing and Payment</h3>
        <p style={{ marginBottom: '16px' }}>All prices are listed in INR (₹) and are subject to change without notice.</p>
        <p style={{ marginBottom: '24px' }}>We accept payments through secure payment gateways. Orders will be processed only upon successful payment confirmation.</p>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>5. Shipping and Delivery</h3>
        <p style={{ marginBottom: '16px' }}>Furniture orders are typically processed within 7–14 business days. Delivery timelines may vary depending on location and logistical complexity.</p>
        <p style={{ marginBottom: '24px' }}>While we aim to deliver within the estimated timeframe, <strong>Ghar Saaj</strong> shall not be held liable for delays caused by third-party logistics providers or unforeseen circumstances.</p>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>6. Returns, Refunds, and Exchanges</h3>
        <p style={{ marginBottom: '16px' }}>Customers may request a return or exchange within <strong>48 hours</strong> of delivery, subject to the following conditions:</p>
        <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
          <li>The item must be in its original condition with no signs of use</li>
          <li>Returns are only applicable for defective, damaged or incorrect items at the time of delivery</li>
          <li>Bespoke or custom-made pieces are not eligible for returns</li>
        </ul>
        <p style={{ marginBottom: '24px' }}>Refunds will be processed within 5–7 working days after approval and will be credited to the original payment method.</p>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>7. Order Cancellation</h3>
        <p style={{ marginBottom: '24px', color: '#d32f2f', fontWeight: 600 }}>Orders may be canceled before they are dispatched. Once the furniture has been shipped, cancellation requests will not be accepted.</p>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>8. Damaged or Incorrect Products</h3>
        <p style={{ marginBottom: '24px' }}>In case a customer receives a defective, damaged, or incorrect product, they must notify us within 48 hours of delivery, along with relevant photo or video evidence. Upon verification, we will provide a replacement or initiate a refund.</p>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>9. Intellectual Property Rights</h3>
        <p style={{ marginBottom: '16px' }}>All content on this platform, including logos, designs, and text, is the exclusive property of <strong>Ghar Saaj</strong> and is protected under applicable intellectual property laws.</p>
        <p style={{ marginBottom: '24px' }}>Unauthorized use is strictly prohibited.</p>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>10. Privacy Policy</h3>
        <p style={{ marginBottom: '24px' }}>We are committed to protecting your privacy. Any personal information provided by you is handled in accordance with our Privacy Policy.</p>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>11. Limitation of Liability</h3>
        <p style={{ marginBottom: '24px' }}><strong>Ghar Saaj</strong> shall not be held liable for any indirect or consequential damages arising from the use of our products.</p>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>12. Governing Law</h3>
        <p style={{ marginBottom: '24px' }}>These Terms shall be governed by the laws of India, and any disputes shall be subject to the jurisdiction of the courts of <strong>Bhopal, Madhya Pradesh</strong>.</p>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginTop: '30px', marginBottom: '12px' }}>13. Amendments</h3>
        <p style={{ marginBottom: '24px' }}>We reserve the right to update these Terms at any time. Continued use of our services constitutes acceptance of such changes.</p>

        <div style={{ marginTop: '60px', padding: '32px', background: '#f9f9f9', borderRadius: '16px', border: '1px solid #eee' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: 'var(--black)' }}>14. Contact Information</h4>
          <p style={{ marginBottom: '8px' }}>For any questions or concerns regarding these Terms, please contact us at:</p>
          <p style={{ marginBottom: '4px' }}><strong>Email:</strong> support@gharsaa.in</p>
          <p style={{ marginBottom: '4px' }}><strong>Phone:</strong> +91 81037 58319</p>
          <p style={{ marginBottom: '0' }}><strong>Instagram:</strong> @gharsaa.in</p>
        </div>
      </div>
    </div>
  );
}
