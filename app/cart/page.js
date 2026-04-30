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
    <div className="container" style={{ padding: '60px 24px 120px', minHeight: '80vh' }}>
      {/* ── HEADER ── */}
      <div style={{ marginBottom: '60px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Your Shopping Bag</h1>
        <p style={{ color: '#666', marginTop: '8px', fontSize: '14px' }}>{cartItems.length} items in your collection</p>
      </div>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>👜</div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '32px', color: '#999' }}>Your bag is empty</h3>
          <Link href="/shop" className="primary-btn-premium" style={{ display: 'inline-block', maxWidth: '300px', textDecoration: 'none' }}>Start Exploring</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px' }}>
          {/* ── ITEMS LIST ── */}
          <div>
            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '40px', display: 'none' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px 100px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: '#999' }}>
                <span>Product</span>
                <span style={{ textAlign: 'center' }}>Quantity</span>
                <span style={{ textAlign: 'right' }}>Total</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {cartItems.map(item => (
                <div key={item.cartId} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '24px', alignItems: 'start' }}>
                  <img src={`/${item.image}`} alt={item.name} style={{ width: '120px', height: '150px', objectFit: 'cover', borderRadius: '8px', background: '#f9f9f9' }} />
                  
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '6px' }}>{item.name}</h4>
                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Size: {item.selectedSize}</p>
                    <p style={{ fontSize: '15px', fontWeight: 900, marginTop: '8px' }}>₹{item.price}</p>
                    
                    <div className="qty-control-premium" style={{ marginTop: '20px' }}>
                      <button className="qty-btn-premium" onClick={() => updateQuantity(item.cartId, -1)}>−</button>
                      <span style={{ fontSize: '13px', fontWeight: 800 }}>{item.quantity}</span>
                      <button className="qty-btn-premium" onClick={() => updateQuantity(item.cartId, 1)}>+</button>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '16px', fontWeight: 900 }}>₹{item.price * item.quantity}</p>
                    <button 
                      onClick={() => removeFromCart(item.cartId)}
                      style={{ background: 'none', border: 'none', fontSize: '11px', textTransform: 'uppercase', fontWeight: 800, color: '#999', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SUMMARY ── */}
          <div style={{ maxWidth: '400px', marginLeft: 'auto', width: '100%' }}>
            <div style={{ background: '#f9f9f9', padding: '40px', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '32px' }}>Order Summary</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>Estimated Shipping</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                <div style={{ height: '1px', background: '#eee', margin: '16px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 900 }}>
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button 
                className="primary-btn-premium" 
                style={{ marginTop: '40px' }}
                onClick={handleCheckout}
              >
                Continue to Checkout
              </button>
              
              <Link href="/shop" style={{ display: 'block', textAlign: 'center', marginTop: '24px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#666', textDecoration: 'none' }}>
                Back to Shop
              </Link>
            </div>
          </div>
        </div>
      )}

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
