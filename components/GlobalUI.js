"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';

export default function GlobalUI() {
  const {
    currentUser, cartItems, wishlistItems, deliveryFee,
    isSidebarOpen, isWishlistSidebarOpen, isCartSidebarOpen, isAuthModalOpen, isCheckoutModalOpen,
    closeAllOverlays, openAuth, closeCheckout, removeFromCart, updateQuantity, removeFromWishlist,
    login, logout, addOrder, clearCart, toast
  } = useAppContext();

  const pathname = usePathname();
  const router = useRouter();

  // Auth state
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    login(authEmail, isSignUpMode ? authName : authEmail.split('@')[0]);
    closeAllOverlays();
  };

  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = cartSubtotal + deliveryFee;

  return (
    <>
      {/* ── OVERLAY ── */}
      <div 
        className={`sidebar-overlay ${(isSidebarOpen || isWishlistSidebarOpen || isCartSidebarOpen) ? 'open' : ''}`} 
        onClick={closeAllOverlays} 
      />

      {/* ── MAIN NAVIGATION SIDEBAR (LEFT) ── */}
      <aside className={`sidebar-premium sidebar-left ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header-premium">
          <h3>Menu</h3>
          <button className="sidebar-close-btn" onClick={closeAllOverlays}>✕</button>
        </div>
        <div className="sidebar-content-premium">
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Link href="/shop?category=Men" className="nav-link" onClick={closeAllOverlays}>Men</Link>
            <Link href="/shop?category=Women" className="nav-link" onClick={closeAllOverlays}>Women</Link>
            <Link href="/shop?category=New" className="nav-link" onClick={closeAllOverlays}>New Arrivals</Link>
            <Link href="/offers" className="nav-link" onClick={closeAllOverlays}>Sale</Link>
            <div style={{ height: '1px', background: '#eee', margin: '10px 0' }} />
            <Link href="/orders" className="nav-link" onClick={closeAllOverlays}>My Orders</Link>
            <Link href="/account" className="nav-link" onClick={closeAllOverlays}>Account Settings</Link>
            {currentUser ? (
              <button onClick={logout} style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }} className="nav-link">Logout</button>
            ) : (
              <button onClick={openAuth} style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }} className="nav-link">Login / Register</button>
            )}
          </nav>
        </div>
      </aside>

      {/* ── CART SIDEBAR (RIGHT) ── */}
      <aside className={`sidebar-premium sidebar-right ${isCartSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header-premium">
          <h3>Shopping Bag ({cartItems.length})</h3>
          <button className="sidebar-close-btn" onClick={closeAllOverlays}>✕</button>
        </div>
        <div className="sidebar-content-premium">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
              <p style={{ color: '#999', fontSize: '14px' }}>Your bag is empty</p>
              <Link href="/shop" className="nav-link" style={{ marginTop: '20px', display: 'block', textDecoration: 'underline' }} onClick={closeAllOverlays}>Start Shopping</Link>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.cartId} className="cart-item-premium">
                <div className="cart-item-img-wrap">
                  <img src={`/${item.image}`} alt={item.name} className="cart-item-img-premium" />
                </div>
                <div className="cart-item-info-premium">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-meta">Size: {item.selectedSize}</p>
                  <p className="cart-item-price-premium">₹{item.price}</p>
                  <div className="qty-control-premium">
                    <button className="qty-btn-premium" onClick={() => updateQuantity(item.cartId, -1)}>−</button>
                    <span style={{ fontSize: '13px', fontWeight: 700 }}>{item.quantity}</span>
                    <button className="qty-btn-premium" onClick={() => updateQuantity(item.cartId, 1)}>+</button>
                    <button 
                      onClick={() => removeFromCart(item.cartId)}
                      style={{ marginLeft: 'auto', background: 'none', border: 'none', fontSize: '11px', textDecoration: 'underline', cursor: 'pointer', color: '#999' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-footer-premium">
            <div className="summary-row-premium">
              <span>Subtotal</span>
              <span>₹{cartSubtotal}</span>
            </div>
            <div className="summary-row-premium">
              <span>Shipping</span>
              <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            <div className="summary-row-premium summary-total-premium">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button 
              className="primary-btn-premium" 
              style={{ marginTop: '24px' }}
              onClick={() => { closeAllOverlays(); router.push('/checkout'); }}
            >
              Checkout
            </button>
          </div>
        )}
      </aside>

      {/* ── AUTH MODAL ── */}
      <div className={`modal-overlay-premium ${isAuthModalOpen ? 'open' : ''}`} onClick={(e) => e.target === e.currentTarget && closeAllOverlays()}>
        <div className="modal-card-premium">
          <button className="sidebar-close-btn" style={{ position: 'absolute', top: '24px', right: '24px' }} onClick={closeAllOverlays}>✕</button>
          <h2 style={{ textAlign: 'center', marginBottom: '32px', fontSize: '24px' }}>{isSignUpMode ? 'Create Account' : 'Welcome Back'}</h2>
          <form onSubmit={handleAuthSubmit}>
            {isSignUpMode && (
              <input 
                type="text" className="modal-input-premium" placeholder="Full Name" required 
                value={authName} onChange={e => setAuthName(e.target.value)} 
              />
            )}
            <input 
              type="email" className="modal-input-premium" placeholder="Email Address" required 
              value={authEmail} onChange={e => setAuthEmail(e.target.value)} 
            />
            <input 
              type="password" className="modal-input-premium" placeholder="Password" required 
              value={authPassword} onChange={e => setAuthPassword(e.target.value)} 
            />
            <button type="submit" className="primary-btn-premium">{isSignUpMode ? 'Sign Up' : 'Login'}</button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: '#666' }}>
            {isSignUpMode ? 'Already have an account?' : 'New to Soul Fit?'} 
            <button 
              onClick={() => setIsSignUpMode(!isSignUpMode)}
              style={{ background: 'none', border: 'none', fontWeight: 800, textDecoration: 'underline', marginLeft: '6px', cursor: 'pointer' }}
            >
              {isSignUpMode ? 'Login' : 'Join Now'}
            </button>
          </p>
        </div>
      </div>

      {/* ── TOAST NOTIFICATION ── */}
      {toast && (
        <div className="toast-notify" style={{ borderLeft: `4px solid ${toast.type === 'success' ? 'var(--success)' : 'var(--black)'}` }}>
          <span style={{ fontSize: '18px' }}>{toast.type === 'success' ? '✓' : 'ℹ'}</span>
          <p style={{ fontSize: '13px', fontWeight: 600 }}>{toast.message}</p>
        </div>
      )}
    </>
  );
}
