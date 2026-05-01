"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '../../context/AppContext';
import './checkout.css';

const STEPS = ['Cart', 'Address', 'Payment', 'Review'];

export default function CheckoutPage() {
  const { cartItems, addOrder, clearCart, removeFromCart, deliveryFee } = useAppContext();
  const [step, setStep] = useState(0);
  const [payMethod, setPayMethod] = useState('upi');
  const [couponOpen, setCouponOpen] = useState(true);
  const [coupon, setCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [done, setDone] = useState(false);
  const [address, setAddress] = useState({ name: '', phone: '', street: '', city: '', pin: '' });

  const mockItems = [
    { name: 'Oversized Core T-Shirt', selectedSize: 'L', price: 699, image: 'sf_tshirt.png', cartId: 1 },
    { name: 'Utility Cargo Pants', selectedSize: '32', price: 899, image: 'sf_cargo.png', cartId: 2 },
  ];
  const displayItems = cartItems.length ? cartItems : mockItems;

  const subtotal = displayItems.reduce((s, i) => s + i.price, 0);
  const shipping = subtotal >= 999 ? 0 : deliveryFee;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'SOUL10') {
      setDiscount(Math.round(subtotal * 0.1));
      setCouponMsg({ ok: true, text: '✅ Coupon applied! 10% off' });
    } else {
      setDiscount(0);
      setCouponMsg({ ok: false, text: '❌ Invalid coupon code' });
    }
  };

  const placeOrder = () => {
    const id = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(id);
    addOrder({ id, status: 'Processing', date: new Date().toLocaleDateString(), total, items: [...cartItems] });
    clearCart();
    setDone(true);
  };



  // ── SUCCESS ──────────────────────────────────────────────────────────────
  if (done) return (
    <div className="checkout-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div className="ck-summary-card" style={{ maxWidth: 440, width: '100%', textAlign: 'center', padding: 48 }}>
        <div className="ck-success-icon">
          <svg viewBox="0 0 52 52" width="40" height="40">
            <circle cx="26" cy="26" r="25" fill="none" stroke="#22c55e" strokeWidth="2" />
            <path fill="none" stroke="#22c55e" strokeWidth="3" d="M14 27l8 8 16-16" />
          </svg>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Order Placed! 🎉</h2>
        <p style={{ color: 'var(--gray)', marginBottom: 6 }}>Your Order ID</p>
        <p style={{ fontWeight: 800, fontSize: 18, marginBottom: 24 }}>{orderId}</p>
        <p style={{ color: 'var(--gray)', fontSize: 14, marginBottom: 32 }}>You'll receive a confirmation email shortly. Thank you for shopping at Soul Fit!</p>
        <Link href="/orders"><button className="ck-pay-btn">Track My Order</button></Link>
        <Link href="/shop"><div style={{ marginTop: 16, fontSize: 14, color: 'var(--gray)', cursor: 'pointer' }}>Continue Shopping →</div></Link>
      </div>
    </div>
  );

  // ── ORDER SUMMARY SIDEBAR (shared) ────────────────────────────────────────
  const OrderSummary = () => (
    <div className="ck-summary-card">
      <h3>Order Summary</h3>
      <div className="ck-order-items">
        {displayItems.map((item, i) => (
          <div className="ck-order-item" key={item.cartId || i}>
            <img src={`/${item.image}`} alt={item.name} className="ck-order-item-img" onError={e => e.target.style.background = '#f0f0f0'} />
            <div className="ck-order-item-info">
              <h4>{item.name}</h4>
              <p>Size: {item.selectedSize || 'M'}</p>
              <p style={{ marginTop: 4 }}>Qty: 1</p>
            </div>
            <span className="ck-order-item-price">₹{item.price.toLocaleString('en-IN')}.00</span>
          </div>
        ))}
      </div>
      <div className="ck-divider" />
      <div className="ck-price-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}.00</span></div>
      {discount > 0 && <div className="ck-price-row"><span>Discount ({coupon})</span><span className="ck-discount-val">- ₹{discount.toLocaleString('en-IN')}.00</span></div>}
      <div className="ck-price-row"><span>Shipping</span><span className="ck-free-val">{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
      <div className="ck-divider" />
      <div className="ck-total-row"><span>Total</span><span>₹{total.toLocaleString('en-IN')}.00</span></div>
      <p className="ck-total-sub">Inclusive of all taxes</p>
      <div className="ck-divider" />
      <div className="ck-badges">
        <div className="ck-badge-item">
          <div className="ck-badge-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></div>
          <div><h4>Secure Payment</h4><p>100% secure &amp; encrypted</p></div>
        </div>
        <div className="ck-badge-item">
          <div className="ck-badge-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg></div>
          <div><h4>Free Shipping</h4><p>On orders above ₹999</p></div>
        </div>
        <div className="ck-badge-item">
          <div className="ck-badge-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg></div>
          <div><h4>Easy Returns</h4><p>7 days return policy</p></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="checkout-page">
      {/* Top Nav */}
      <nav className="ck-topnav">
        <button className="ck-back-btn" onClick={() => step > 0 ? setStep(s => s - 1) : window.history.back()}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          {step === 0 ? 'Back to Shop' : `Back to ${STEPS[step - 1]}`}
        </button>
        <div style={{ flex: 1 }} />
        <div style={{ width: 80 }} />
      </nav>

      {/* Stepper */}
      <div className="ck-stepper">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`ck-step ${i < step ? 'done' : i === step ? 'active' : ''}`}
              style={{ cursor: i < step ? 'pointer' : 'default' }}
              onClick={() => i < step && setStep(i)}>
              <div className="ck-step-circle">
                {i < step
                  ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="16" height="16"><path d="M20 6L9 17l-5-5" /></svg>
                  : i + 1}
              </div>
              <span className="ck-step-label">{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`ck-step-line ${i < step ? 'done' : ''}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* Body */}
      <div className="ck-body">
        {/* ── STEP 0: CART ── */}
        {step === 0 && (
          <div className="ck-left">
            <h1>Your Cart</h1>
            <p>Review your items before proceeding.</p>
            {displayItems.length === 0
              ? <div style={{ padding: 40, textAlign: 'center', color: 'var(--gray)' }}>Your cart is empty. <Link href="/shop" style={{ color: 'var(--black)', fontWeight: 700 }}>Shop now →</Link></div>
              : displayItems.map((item, i) => (
                <div className="ck-saved-card" key={item.cartId || i} style={{ marginBottom: 12 }}>
                  <div className="ck-saved-card-row" style={{ gap: 16 }}>
                    <img src={`/${item.image}`} alt={item.name} style={{ width: 72, height: 80, objectFit: 'cover', borderRadius: 8, background: '#f5f5f5' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{item.name}</h4>
                      <p style={{ fontSize: 13, color: 'var(--gray)', marginBottom: 4 }}>Size: {item.selectedSize || 'M'}</p>
                      <p style={{ fontSize: 15, fontWeight: 800 }}>₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                    {item.cartId && (
                      <button onClick={() => removeFromCart(item.cartId)}
                        style={{ background: 'none', border: '1px solid #eee', borderRadius: 8, padding: '6px 12px', fontSize: 12, cursor: 'pointer', color: 'var(--gray)' }}>
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))
            }
            <button className="ck-pay-btn" style={{ marginTop: 24 }} onClick={() => setStep(1)} disabled={displayItems.length === 0}>
              Continue to Address →
            </button>
          </div>
        )}

        {/* ── STEP 1: ADDRESS ── */}
        {step === 1 && (
          <div className="ck-left">
            <h1>Shipping Address</h1>
            <p>Enter your delivery address details.</p>
            <div className="ck-saved-card" style={{ marginBottom: 24 }}>
              <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray)', display: 'block', marginBottom: 6 }}>Full Name *</label>
                    <input className="ck-coupon-input" style={{ width: '100%' }} placeholder="Rohit Sharma" value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray)', display: 'block', marginBottom: 6 }}>Phone Number *</label>
                    <input className="ck-coupon-input" style={{ width: '100%' }} placeholder="+91 98765 43210" value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray)', display: 'block', marginBottom: 6 }}>Street Address *</label>
                  <input className="ck-coupon-input" style={{ width: '100%' }} placeholder="123, MG Road, Near Central Mall" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray)', display: 'block', marginBottom: 6 }}>City *</label>
                    <input className="ck-coupon-input" style={{ width: '100%' }} placeholder="Bangalore" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray)', display: 'block', marginBottom: 6 }}>PIN Code *</label>
                    <input className="ck-coupon-input" style={{ width: '100%' }} placeholder="560001" value={address.pin} onChange={e => setAddress({ ...address, pin: e.target.value })} />
                  </div>
                </div>
              </div>
            </div>
            <button className="ck-pay-btn"
              onClick={() => {
                if (!address.name || !address.phone || !address.street || !address.city || !address.pin) {
                  alert('Please fill all required fields');
                  return;
                }
                setStep(2);
              }}>
              Continue to Payment →
            </button>
          </div>
        )}

        {/* ── STEP 2: PAYMENT ── */}
        {step === 2 && (
          <div className="ck-left">
            <h1>Payment</h1>
            <p>Select a payment method and complete your purchase.</p>

            <div className="ck-section-title">Saved Payment Methods</div>
            <div className="ck-saved-card">
              <div className="ck-saved-card-row">
                <div className={`ck-radio-gold ${payMethod === 'visa' ? 'selected' : ''}`} onClick={() => setPayMethod('visa')} />
                <span className="ck-visa-logo">VISA</span>
                <div className="ck-card-info"><h4>Visa ending in 4242</h4><p>Expires 12/27</p></div>
                <span className="ck-card-holder">Rohit Sharma</span>
                <button className="ck-card-dots">⋮</button>
              </div>
            </div>
            <button className="ck-add-card">
              <span className="ck-add-icon">+</span>Add New Card
            </button>

            <div className="ck-section-title">Other Payment Methods</div>
            <div className="ck-methods">
              {[
                { id: 'upi', icon: <span style={{ fontSize: 10, fontWeight: 900, color: '#5f259f' }}>UPI</span>, title: 'UPI', sub: 'Pay using any UPI app', logos: [<span key="g" className="ck-logo-pill ck-logo-gpay">G Pay</span>, <span key="p" className="ck-logo-pill ck-logo-phone">Pe</span>, <span key="t" className="ck-logo-pill ck-logo-paytm">Paytm</span>] },
                { id: 'netbanking', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>, title: 'Net Banking', sub: 'Pay using your bank account', arrow: true },
                { id: 'wallet', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4z" /></svg>, title: 'Wallets', sub: 'Pay using wallet balance', logos: [<span key="pw" className="ck-logo-pill ck-logo-paytmw">Paytm</span>, <span key="m" className="ck-logo-pill ck-logo-mobikwik">M</span>, <span key="a" className="ck-logo-pill ck-logo-amazon">Amazon</span>] },
                { id: 'card', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>, title: 'Credit / Debit / ATM Card', sub: 'Visa, Mastercard, RuPay & more', logos: [<span key="v" className="ck-logo-pill ck-logo-visa">VISA</span>, <span key="mc" className="ck-logo-pill ck-logo-mc">MC</span>, <span key="r" className="ck-logo-pill ck-logo-rupay">RuPay</span>] },
                { id: 'emi', icon: <span style={{ fontSize: 9, fontWeight: 900, color: '#1565c0' }}>EMI</span>, title: 'EMI', sub: 'Easy EMIs on your cards', arrow: true },
              ].map(m => (
                <div key={m.id} className="ck-method-row" onClick={() => setPayMethod(m.id)}>
                  <div className={`ck-method-radio ${payMethod === m.id ? 'selected' : ''}`} />
                  <div className="ck-method-icon-box">{m.icon}</div>
                  <div className="ck-method-text"><h4>{m.title}</h4><p>{m.sub}</p></div>
                  {m.logos && <div className="ck-method-logos">{m.logos}</div>}
                  {m.arrow && <svg className="ck-method-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M9 18l6-6-6-6" /></svg>}
                </div>
              ))}
            </div>

            <div className="ck-coupon-box">
              <div className="ck-coupon-header" onClick={() => setCouponOpen(o => !o)}>
                <div className="ck-coupon-header-left">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
                  Apply Coupon
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">{couponOpen ? <path d="M18 15l-6-6-6 6" /> : <path d="M6 9l6 6 6-6" />}</svg>
              </div>
              {couponOpen && (
                <div className="ck-coupon-body">
                  <div className="ck-coupon-row">
                    <input className="ck-coupon-input" placeholder="Enter coupon code" value={coupon} onChange={e => setCoupon(e.target.value)} onKeyDown={e => e.key === 'Enter' && applyCoupon()} />
                    <button className="ck-coupon-apply" onClick={applyCoupon}>Apply</button>
                  </div>
                  {couponMsg && <p style={{ marginTop: 8, fontSize: 13, color: couponMsg.ok ? '#22c55e' : '#ef4444' }}>{couponMsg.text}</p>}
                  <p style={{ marginTop: 8, fontSize: 12, color: 'var(--gray)' }}>Try <strong>SOUL10</strong> for 10% off!</p>
                </div>
              )}
            </div>

            <div className="ck-secure-note">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              Your payment information is secure and encrypted.
            </div>

            <button className="ck-pay-btn" onClick={() => setStep(3)}>
              Continue to Review →
            </button>
          </div>
        )}

        {/* ── STEP 3: REVIEW ── */}
        {step === 3 && (
          <div className="ck-left">
            <h1>Review Order</h1>
            <p>Please confirm everything looks correct before placing your order.</p>

            {/* Address Summary */}
            <div className="ck-section-title">Delivery Address</div>
            <div className="ck-saved-card" style={{ marginBottom: 24 }}>
              <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 700, marginBottom: 4 }}>{address.name || 'Rohit Sharma'}</p>
                  <p style={{ fontSize: 13, color: 'var(--gray)' }}>{address.street || '123, MG Road, Bangalore - 560001'}</p>
                  <p style={{ fontSize: 13, color: 'var(--gray)' }}>📞 {address.phone || '+91 98765 43210'}</p>
                </div>
                <button onClick={() => setStep(1)} style={{ background: 'none', border: '1px solid #ddd', borderRadius: 8, padding: '6px 14px', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>Edit</button>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="ck-section-title">Payment Method</div>
            <div className="ck-saved-card" style={{ marginBottom: 24 }}>
              <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700 }}>
                  {{ visa: '💳 Visa ending in 4242', upi: '📱 UPI Payment', netbanking: '🏦 Net Banking', wallet: '👜 Wallet', emi: '💰 EMI', card: '💳 Debit / Credit Card' }[payMethod]}
                </div>
                <button onClick={() => setStep(2)} style={{ background: 'none', border: '1px solid #ddd', borderRadius: 8, padding: '6px 14px', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>Edit</button>
              </div>
            </div>

            {/* Items Summary */}
            <div className="ck-section-title">Items ({displayItems.length})</div>
            <div className="ck-saved-card" style={{ marginBottom: 28 }}>
              {displayItems.map((item, i) => (
                <div key={item.cartId || i} style={{ display: 'flex', gap: 16, padding: '16px 20px', borderBottom: i < displayItems.length - 1 ? '1px solid var(--light-gray)' : 'none' }}>
                  <img src={`/${item.image}`} alt={item.name} style={{ width: 60, height: 70, objectFit: 'cover', borderRadius: 8, background: '#f5f5f5' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, marginBottom: 4 }}>{item.name}</p>
                    <p style={{ fontSize: 13, color: 'var(--gray)' }}>Size: {item.selectedSize || 'M'} · Qty: 1</p>
                  </div>
                  <span style={{ fontWeight: 800 }}>₹{item.price.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="ck-secure-note">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              Your payment information is secure and encrypted.
            </div>

            <button className="ck-pay-btn" onClick={placeOrder}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              Place Order · Pay ₹{total.toLocaleString('en-IN')}.00
            </button>
            <div className="ck-pay-terms">
              By proceeding, you agree to our <Link href="/terms" style={{ color: '#c9a84c', textDecoration: 'none', fontWeight: 600 }}>Terms &amp; Conditions</Link> and <Link href="/privacy" style={{ color: '#c9a84c', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</Link>.
            </div>
          </div>
        )}

        {/* RIGHT: ORDER SUMMARY */}
        <div className="ck-right">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
