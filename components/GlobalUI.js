"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '../context/AppContext';

export default function GlobalUI() {
  const {
    currentUser, cartItems, wishlistItems, deliveryFee,
    isSidebarOpen, isWishlistSidebarOpen, isCartSidebarOpen, isChatSidebarOpen, isAuthModalOpen, isCheckoutModalOpen,
    closeAllOverlays, openAuth, closeCheckout, openCheckout, openWishlist, openChat,
    removeFromCart, removeFromWishlist, toggleWishlist,
    login, logout, addOrder, clearCart
  } = useAppContext();

  // Auth state
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const name = isSignUpMode ? authName : authEmail.split('@')[0];
    login(authEmail, name);
    setAuthName('');
    setAuthEmail('');
    setAuthPassword('');
  };

  // Checkout State
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState({ text: '', error: false });
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [orderId, setOrderId] = useState('');

  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const finalTotal = cartSubtotal + deliveryFee - discount;

  const applyCoupon = () => {
    const code = couponCode.toUpperCase();
    if (code === 'SOUL10') {
      setDiscount(Math.round(cartSubtotal * 0.1));
      setCouponMsg({ text: `Applied! 10% off (₹${Math.round(cartSubtotal * 0.1)} saved)`, error: false });
    } else if (code === 'FIT200') {
      setDiscount(200);
      setCouponMsg({ text: `Applied! Flat ₹200 off`, error: false });
    } else if (code === 'SOUL20') {
      setDiscount(Math.round(cartSubtotal * 0.2));
      setCouponMsg({ text: `Applied! 20% off (₹${Math.round(cartSubtotal * 0.2)} saved)`, error: false });
    } else if (code === 'VIP500') {
      setDiscount(500);
      setCouponMsg({ text: `Applied! Flat ₹500 off`, error: false });
    } else {
      setDiscount(0);
      setCouponMsg({ text: 'Invalid Coupon Code', error: true });
    }
  };

  const placeOrder = () => {
    const randomId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    
    addOrder({
      id: randomId,
      status: Math.random() > 0.5 ? 'Processing' : 'Delivered',
      date: new Date().toLocaleDateString(),
      total: finalTotal,
      items: [...cartItems]
    });
    setCheckoutStep(3);
  };

  const resetCheckout = () => {
    setCheckoutStep(1);
    setDiscount(0);
    setCouponCode('');
    setCouponMsg({ text: '', error: false });
    closeCheckout();
  };

  return (
    <>
      {/* OVERLAY */}
      <div className={`sidebar-overlay ${(isSidebarOpen || isWishlistSidebarOpen || isCartSidebarOpen || isChatSidebarOpen) ? 'open' : ''}`} onClick={closeAllOverlays}></div>

      {/* MAIN SIDEBAR */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="sidebar-close" onClick={closeAllOverlays}>&#10005;</button>
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <div>
            <div className="sidebar-hello">Hello, {currentUser ? currentUser.name : 'Guest'}</div>
            {!currentUser && (
              <div className="sidebar-login" onClick={openAuth} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Login / Sign up</div>
            )}
          </div>
        </div>
        <nav className="sidebar-nav">
          <Link href="/" className="sidebar-link" onClick={closeAllOverlays}>
            <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12L12 3l9 9" /><path d="M9 21V12h6v9" /></svg></span>Home
          </Link>
          <Link href="/shop" className="sidebar-link arrow" onClick={closeAllOverlays}>
            <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg></span>Shop
          </Link>
          <Link href="/shop?category=all" className="sidebar-link arrow" onClick={closeAllOverlays}>
            <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg></span>Categories
          </Link>
          <Link href="/shop?filter=new_arrivals" className="sidebar-link arrow" onClick={closeAllOverlays}>
            <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg></span>New Arrivals
          </Link>
          <Link href="/shop?filter=best_sellers" className="sidebar-link arrow" onClick={closeAllOverlays}>
            <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg></span>Best Sellers
          </Link>
          <Link href="/offers" className="sidebar-link arrow" onClick={closeAllOverlays}>
            <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg></span>Offers
          </Link>

          <div className="sidebar-divider"></div>

          <a href="#" className="sidebar-link" onClick={(e) => { e.preventDefault(); closeAllOverlays(); openWishlist(); }}>
            <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg></span>Wishlist
          </a>
          <Link href="/account" className="sidebar-link arrow" onClick={closeAllOverlays}>
            <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 8v13H3V8" /><path d="M1 3h22v5H1z" /><path d="M10 12h4" /></svg></span>Orders
          </Link>
          <Link href="/account" className="sidebar-link arrow" onClick={closeAllOverlays}>
             <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg></span>Account
          </Link>
          <a href="#" className="sidebar-link arrow" onClick={(e) => { e.preventDefault(); closeAllOverlays(); openChat(); }}>
            <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg></span>Support
          </a>

          <div className="sidebar-divider"></div>

          <Link href="/about" className="sidebar-link" onClick={closeAllOverlays}>
            <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg></span>About Us
          </Link>
          <Link href="/track" className="sidebar-link" onClick={closeAllOverlays}>
            <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg></span>Track Order
          </Link>
          <Link href="/faq" className="sidebar-link" onClick={closeAllOverlays}>
            <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg></span>FAQ
          </Link>
          <Link href="/privacy" className="sidebar-link" onClick={closeAllOverlays}>
            <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></span>Privacy Policy
          </Link>
          <Link href="/terms" className="sidebar-link" onClick={closeAllOverlays}>
            <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg></span>Terms &amp; Conditions
          </Link>

          {currentUser && (
            <>
              <div className="sidebar-divider"></div>
              <a href="#" className="sidebar-link sidebar-logout" onClick={(e) => { e.preventDefault(); logout(); closeAllOverlays(); }}>
                <span className="sidebar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg></span>Logout
              </a>
            </>
          )}
        </nav>
      </aside>

      {/* WISHLIST SIDEBAR */}
      <aside className={`sidebar right-sidebar ${isWishlistSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>My Wishlist</h3>
          <button className="sidebar-close" onClick={closeAllOverlays}>&#10005;</button>
        </div>
        <div className="sidebar-content">
          {wishlistItems.length === 0 ? <div className="empty-msg">Your wishlist is empty.</div> : 
            wishlistItems.map(item => (
              <div className="cart-item" key={`w-${item.id}`}>
                <img src={`/${item.image}`} className="cart-item-img" alt={item.name} />
                <div className="cart-item-info">
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-price">₹{item.price}</div>
                  <button className="remove-btn" onClick={() => removeFromWishlist(item.id)}>Remove</button>
                </div>
              </div>
            ))
          }
        </div>
      </aside>

      {/* CART SIDEBAR */}
      <aside className={`sidebar right-sidebar ${isCartSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>My Cart</h3>
          <button className="sidebar-close" onClick={closeAllOverlays}>&#10005;</button>
        </div>
        <div className="sidebar-content">
          {cartItems.length === 0 ? <div className="empty-msg">Your cart is empty.</div> :
            cartItems.map(item => (
              <div className="cart-item" key={`c-${item.cartId}`}>
                <img src={`/${item.image}`} className="cart-item-img" alt={item.name} />
                <div className="cart-item-info">
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-price">₹{item.price}</div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.cartId)}>Remove</button>
                </div>
              </div>
            ))
          }
        </div>
        <div className="cart-footer">
          <div className="cart-row"><span>Subtotal:</span> <span>₹{cartSubtotal}</span></div>
          <div className="cart-row"><span>Delivery:</span> <span>₹{deliveryFee}</span></div>
          <div className="cart-row total"><span>Total:</span> <span>₹{cartSubtotal + deliveryFee}</span></div>
          <button className="hero-btn checkout-btn" onClick={() => { closeAllOverlays(); if(!currentUser) openAuth(); else openCheckout(); }}>PROCEED TO CHECKOUT</button>
        </div>
      </aside>

      {/* AUTH MODAL */}
      <div className={`modal-overlay ${isAuthModalOpen ? 'open' : ''}`}>
        <div className="modal-content" style={{ maxWidth: '400px' }}>
          <button className="modal-close" onClick={closeAllOverlays}>&#10005;</button>
          <div style={{ padding: '40px 32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>{isSignUpMode ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleAuthSubmit}>
              {isSignUpMode && <input type="text" className="input-field" placeholder="Full Name" required style={{ marginBottom: '16px' }} value={authName} onChange={e=>setAuthName(e.target.value)} />}
              <input type="email" className="input-field" placeholder="Email Address" required style={{ marginBottom: '16px' }} value={authEmail} onChange={e=>setAuthEmail(e.target.value)} />
              <input type="password" className="input-field" placeholder="Password" required style={{ marginBottom: '24px' }} value={authPassword} onChange={e=>setAuthPassword(e.target.value)} />
              <button type="submit" className="hero-btn w-100">{isSignUpMode ? 'SIGN UP' : 'LOGIN'}</button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: 'var(--gray)' }}>
              <span>{isSignUpMode ? 'Already have an account?' : 'Don\'t have an account?'}</span>{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); setIsSignUpMode(!isSignUpMode); }} style={{ color: 'var(--black)', fontWeight: 600, textDecoration: 'underline' }}>
                {isSignUpMode ? 'Login' : 'Sign up'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      <div className={`modal-overlay ${isCheckoutModalOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <button className="modal-close" onClick={resetCheckout}>&#10005;</button>

          {checkoutStep === 1 && (
            <div className="checkout-step active">
              <h2>Shipping Address</h2>
              <form onSubmit={e => { e.preventDefault(); setCheckoutStep(2); }}>
                <input type="text" className="input-field" placeholder="Full Name" required />
                <input type="text" className="input-field" placeholder="Phone Number" required pattern="[0-9]{10}" />
                <textarea className="input-field" placeholder="Complete Address" required rows="3"></textarea>
                
                <div className="coupon-section">
                  <input type="text" className="input-field" placeholder="Enter Coupon Code" value={couponCode} onChange={e=>setCouponCode(e.target.value)} />
                  <button type="button" className="hero-btn-white apply-btn" onClick={applyCoupon}>Apply</button>
                </div>
                {couponMsg.text && <div className={`coupon-msg ${couponMsg.error ? 'error' : ''}`}>{couponMsg.text}</div>}

                <div className="checkout-summary">
                  <div className="cart-row"><span>Total Payable:</span> <span>₹{finalTotal}</span></div>
                </div>
                <button type="submit" className="hero-btn w-100">PROCEED TO PAYMENT</button>
              </form>
            </div>
          )}

          {checkoutStep === 2 && (
            <div className="checkout-step active">
              <h2>Payment Method</h2>
              <p className="payment-subtitle">Select your preferred payment option.</p>
              <div className="payment-options">
                <label className="payment-option">
                  <input type="radio" name="paymentMethod" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={()=>setPaymentMethod('razorpay')} />
                  <span>Razorpay (Cards / UPI)</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="paymentMethod" value="upi" checked={paymentMethod === 'upi'} onChange={()=>setPaymentMethod('upi')} />
                  <span>Direct UPI ID</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="paymentMethod" value="qr" checked={paymentMethod === 'qr'} onChange={()=>setPaymentMethod('qr')} />
                  <span>Scan QR Code</span>
                </label>
              </div>

              {paymentMethod === 'razorpay' ? (
                <div className="payment-view active">
                  <p className="upi-text" style={{ fontSize: '13px', marginBottom: '16px' }}>Click the button below to pay securely via Razorpay (Credit/Debit Cards, UPI, NetBanking).</p>
                  <a href="http://razorpay.me/@gyanprakashsingh2550" target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn-white w-100 phonepe-btn" style={{ background: '#0052cc', color: 'white', borderColor: '#0052cc' }}>PAY WITH RAZORPAY</a>
                  <button className="hero-btn w-100 mt-3" onClick={placeOrder}>I HAVE PAID - PLACE ORDER</button>
                </div>
              ) : paymentMethod === 'upi' ? (
                <div className="payment-view active">
                  <p className="upi-text">UPI ID: <strong>8103758319@ybl</strong></p>
                  <a href="#" className="hero-btn hero-btn-white w-100 phonepe-btn">PAY VIA PHONEPE / UPI APP</a>
                  <button className="hero-btn w-100 mt-3" onClick={placeOrder}>I HAVE PAID — PLACE ORDER</button>
                </div>
              ) : (
                <div className="payment-view active">
                  <div className="qr-container">
                    <img src="/qr_code.png" alt="Payment QR" className="qr-img" />
                    <div className="timer">05:00</div>
                  </div>
                  <p className="qr-help">Scan with any UPI App to pay</p>
                  <button className="hero-btn w-100 mt-3" onClick={placeOrder}>I HAVE PAID — PLACE ORDER</button>
                </div>
              )}
            </div>
          )}

          {checkoutStep === 3 && (
            <div className="checkout-step active text-center">
              <div className="success-anim">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                  <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>
              <h2>Order Placed Successfully!</h2>
              <p>Your Order ID is <strong>{orderId}</strong></p>
              <p className="success-sub">You will receive a confirmation message shortly.</p>
              <button className="hero-btn w-100 mt-3" onClick={() => { clearCart(); resetCheckout(); }}>CONTINUE SHOPPING</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
