"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../context/AppContext';

export default function CheckoutPage() {
  const { cartItems, deliveryFee, addOrder, clearCart } = useAppContext();
  const router = useRouter();
  
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', pin: ''
  });
  const [orderId, setOrderId] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    
    const newId = 'ORD-' + Math.floor(Math.random() * 900000 + 100000);
    setOrderId(newId);
    addOrder({
      id: newId,
      date: new Date().toLocaleDateString(),
      total: total,
      status: 'Processing',
      items: [...cartItems]
    });
    clearCart();
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '120px 24px' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>✓</div>
        <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px' }}>Order Confirmed</h1>
        <p style={{ color: '#666', marginBottom: '40px' }}>Your order <strong>{orderId}</strong> has been successfully placed.</p>
        <Link href="/orders" className="primary-btn-premium" style={{ display: 'inline-block', maxWidth: '300px', textDecoration: 'none' }}>Track Order</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 24px 120px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '80px' }}>
        {/* LEFT: FORM */}
        <div style={{ maxWidth: '600px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '40px', letterSpacing: '1px' }}>
            {step === 1 ? 'Shipping Details' : 'Payment Method'}
          </h1>
          
          <form onSubmit={handlePlaceOrder}>
            {step === 1 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="text" name="name" placeholder="Full Name" className="modal-input-premium" required value={formData.name} onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email Address" className="modal-input-premium" required value={formData.email} onChange={handleInputChange} />
                <input type="tel" name="phone" placeholder="Phone Number" className="modal-input-premium" required value={formData.phone} onChange={handleInputChange} />
                <textarea name="address" placeholder="Shipping Address" className="modal-input-premium" required rows="3" value={formData.address} onChange={handleInputChange}></textarea>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <input type="text" name="city" placeholder="City" className="modal-input-premium" required value={formData.city} onChange={handleInputChange} />
                  <input type="text" name="pin" placeholder="PIN Code" className="modal-input-premium" required value={formData.pin} onChange={handleInputChange} />
                </div>
                <button type="submit" className="primary-btn-premium" style={{ marginTop: '24px' }}>Continue to Payment</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ padding: '24px', border: '2px solid #000', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>Credit / Debit Card</h4>
                  <p style={{ fontSize: '12px', color: '#666' }}>Pay securely with your bank card.</p>
                </div>
                <div style={{ padding: '24px', border: '1px solid #eee', borderRadius: '8px', opacity: 0.6 }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>UPI / Net Banking</h4>
                  <p style={{ fontSize: '12px', color: '#666' }}>Google Pay, PhonePe, and more.</p>
                </div>
                <button type="submit" className="primary-btn-premium" style={{ marginTop: '24px' }}>Place Order · ₹{total}</button>
                <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', textDecoration: 'underline', cursor: 'pointer', color: '#999' }}>Back to Shipping</button>
              </div>
            )}
          </form>
        </div>

        {/* RIGHT: SUMMARY (Optional for mobile) */}
        <div style={{ background: '#f9f9f9', padding: '40px', borderRadius: '16px', alignSelf: 'start' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '32px' }}>Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cartItems.map(item => (
              <div key={item.cartId} style={{ display: 'flex', gap: '16px' }}>
                <img src={`/${item.image}`} alt={item.name} style={{ width: '60px', height: '75px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>{item.name}</h4>
                  <p style={{ fontSize: '11px', color: '#999', margin: '4px 0' }}>Qty: {item.quantity} · Size: {item.selectedSize}</p>
                  <p style={{ fontSize: '13px', fontWeight: 800 }}>₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: '1px', background: '#eee', margin: '32px 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span>Shipping</span>
              <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 900, marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          div[style*="gridTemplateColumns: 1fr"] {
            grid-template-columns: 1fr 400px !important;
          }
        }
      `}</style>
    </div>
  );
}
