"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../context/AppContext';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, deliveryFee, currentUser, openAuth } = useAppContext();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + (cartItems.length > 0 ? deliveryFee : 0);

  const handleCheckout = () => {
    if (!currentUser) {
      openAuth();
    } else {
      router.push('/checkout');
    }
  };

  return (
    <div className="container" style={{ padding: '60px 24px', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '40px' }}>Your Shopping Bag</h1>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1" width="80" height="80" style={{ marginBottom: '24px' }}>
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <h3 style={{ fontSize: '20px', color: '#888', marginBottom: '24px' }}>Your cart is empty</h3>
          <Link href="/shop" className="hero-btn">Start Shopping</Link>
        </div>
      ) : (
        <div className="cart-page-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px' }}>
          {/* List Section */}
          <div className="cart-items-list">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 150px 100px', paddingBottom: '16px', borderBottom: '1px solid #eee', marginBottom: '24px', fontSize: '13px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <span>Product</span>
              <span style={{ textAlign: 'center' }}>Price</span>
              <span style={{ textAlign: 'center' }}>Quantity</span>
              <span style={{ textAlign: 'right' }}>Total</span>
            </div>

            {cartItems.map(item => (
              <div key={item.cartId} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 150px 100px', alignItems: 'center', padding: '24px 0', borderBottom: '1px solid #f9f9f9' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <img src={`/${item.image}`} alt={item.name} style={{ width: '100px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>{item.name}</h4>
                    <p style={{ fontSize: '13px', color: '#888', marginBottom: '12px' }}>Size: {item.selectedSize}</p>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      style={{ background: 'none', border: 'none', color: '#ff4d4d', fontSize: '12px', fontWeight: 600, cursor: 'pointer', padding: 0, width: 'fit-content', textDecoration: 'underline' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: 600 }}>₹{item.price}</div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #eee', padding: '6px 12px', borderRadius: '6px' }}>
                    <button
                      onClick={() => updateQuantity(item.cartId, -1)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#888' }}
                    >−</button>
                    <span style={{ fontWeight: 700, minWidth: '15px', textAlign: 'center' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartId, 1)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#888' }}
                    >+</button>
                  </div>
                </div>

                <div style={{ textAlign: 'right', fontSize: '15px', fontWeight: 800 }}>₹{item.price * item.quantity}</div>
              </div>
            ))}

            <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '32px', fontSize: '14px', fontWeight: 600, color: 'var(--black)', textDecoration: 'none' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
              Continue Shopping
            </Link>
          </div>

          {/* Summary Section */}
          <div className="cart-summary-card" style={{ background: '#fcfcfc', padding: '32px', borderRadius: '16px', height: 'fit-content', border: '1px solid #f0f0f0' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '24px' }}>Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#555' }}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#555' }}>
                <span>Shipping</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div style={{ margin: '16px 0', height: '1px', background: '#eee' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: 'var(--black)' }}>
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              className="hero-btn w-100"
              style={{ marginTop: '32px' }}
              onClick={handleCheckout}
            >
              PROCEED TO CHECKOUT
            </button>

            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" width="16" height="16"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#27ae60' }}>Secure Checkout Guaranteed</span>
            </div>
          </div>
        </div>
      )}

      {/* Media Queries (Inline-like via simple Responsive adjustment) */}
      <style jsx>{`
        @media (max-width: 992px) {
          .cart-page-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}
