"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../context/AppContext';
import './account.css';

export default function AccountPage() {
  const { currentUser, openAuth, openWishlist, wishlistItems, orderHistory, logout } = useAppContext();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(null); // 'personalInfo' | 'payment' | 'addresses'
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editEmail, setEditEmail] = useState(currentUser?.email || '');
  const [saved, setSaved] = useState(false);

  const quickLinks = [
    { label: 'My Orders', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>, action: () => router.push('/orders') },
    { label: 'Wishlist', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>, action: () => openWishlist() },
    { label: 'Track Order', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, action: () => router.push('/track') },
    { label: 'Addresses', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, action: () => setActiveSection('addresses') },
    { label: 'Payment', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>, action: () => router.push('/checkout') },
  ];

  const handleSaveProfile = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const displayOrders = orderHistory.length > 0 ? orderHistory.slice(0, 3) : [
    { id: 'SOUL12345', total: 999,  date: '12 Oct 2025', status: 'Delivered',  image: '/sf_tshirt.png', name: 'Black Oversized T-Shirt' },
    { id: 'SOUL12344', total: 1399, date: '10 Oct 2025', status: 'In Transit', image: '/sf_shirt.png', name: 'Beige Chino Pant' },
    { id: 'SOUL12343', total: 1299, date: '05 Oct 2025', status: 'Processing',  image: '/sf_cargo.png', name: 'Navy Regular Shirt' },
  ];

  const statusClass = (s) => {
    if (!s) return '';
    if (s.toLowerCase().includes('deliver')) return 'status-delivered';
    if (s.toLowerCase().includes('transit') || s.toLowerCase().includes('ship')) return 'status-shipped';
    return 'status-processing';
  };

  return (
    <div className="account-container">
      {/* HEADER */}
      <div className="acc-header">
        <div>
          <h1 className="acc-title">My Account</h1>
          <p className="acc-subtitle">Manage your profile, orders &amp; preferences</p>
        </div>
        {currentUser && (
          <button className="acc-settings-btn" title="Settings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        )}
      </div>

      {/* PROFILE CARD */}
      <div className="acc-card acc-profile-card">
        <div className="acc-profile-left">
          <div className="acc-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div className="acc-user-info">
            <h2>{currentUser ? currentUser.name : 'Guest User'}</h2>
            <p>{currentUser ? currentUser.email : 'Login to access your account'}</p>
            {!currentUser && (
              <div className="acc-auth-btns">
                <button className="acc-btn-black" onClick={openAuth}>Login</button>
                <button className="acc-btn-white" onClick={openAuth}>Sign Up</button>
              </div>
            )}
            {currentUser && (
              <button className="acc-btn-white" style={{ marginTop: 8, fontSize: 12 }} onClick={() => { logout(); router.push('/'); }}>Logout</button>
            )}
          </div>
        </div>

        {/* RIGHT MENU */}
        <div className="acc-profile-right">
          <div className="acc-menu-item" onClick={() => setActiveSection(activeSection === 'personalInfo' ? null : 'personalInfo')} style={{ cursor: 'pointer' }}>
            <div className="acc-menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
            <span>Personal Info</span>
            <svg className="acc-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: activeSection === 'personalInfo' ? 'rotate(90deg)' : 'none', transition: '0.2s' }}><path d="M9 18l6-6-6-6"/></svg>
          </div>
          {activeSection === 'personalInfo' && (
            <div style={{ padding: '12px 20px 16px', borderTop: '1px solid var(--light-gray)', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray)', display: 'block', marginBottom: 4 }}>Full Name</label>
                <input value={editName} onChange={e => setEditName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--light-gray)', borderRadius: 8, fontSize: 14, fontFamily: 'var(--font)', outline: 'none' }}
                  disabled={!currentUser} placeholder="Your full name" />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray)', display: 'block', marginBottom: 4 }}>Email Address</label>
                <input value={editEmail} onChange={e => setEditEmail(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--light-gray)', borderRadius: 8, fontSize: 14, fontFamily: 'var(--font)', outline: 'none' }}
                  disabled={!currentUser} placeholder="your@email.com" />
              </div>
              {currentUser
                ? <button onClick={handleSaveProfile} style={{ background: 'var(--black)', color: 'white', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer', alignSelf: 'flex-start' }}>
                    {saved ? '✅ Saved!' : 'Save Changes'}
                  </button>
                : <p style={{ fontSize: 12, color: 'var(--gray)' }}>Login to edit your profile.</p>
              }
            </div>
          )}

          <div className="acc-menu-item" onClick={() => setActiveSection(activeSection === 'payment' ? null : 'payment')} style={{ cursor: 'pointer' }}>
            <div className="acc-menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></div>
            <span>Payment Methods</span>
            <svg className="acc-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: activeSection === 'payment' ? 'rotate(90deg)' : 'none', transition: '0.2s' }}><path d="M9 18l6-6-6-6"/></svg>
          </div>
          {activeSection === 'payment' && (
            <div style={{ padding: '12px 20px 16px', borderTop: '1px solid var(--light-gray)' }}>
              {currentUser ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--light-gray)' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontWeight: 900, color: '#1a1f71', background: '#f0f2ff', padding: '3px 8px', borderRadius: 4, fontSize: 12 }}>VISA</span>
                      <span style={{ fontSize: 14 }}>•••• •••• •••• 4242</span>
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--gray)' }}>Expires 12/27</span>
                  </div>
                  <button onClick={() => router.push('/checkout')} style={{ marginTop: 12, background: 'none', border: '1px solid var(--light-gray)', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ Add New Card</button>
                </div>
              ) : <p style={{ fontSize: 13, color: 'var(--gray)' }}>Login to manage payment methods.</p>}
            </div>
          )}

          <div className="acc-menu-item" onClick={() => setActiveSection(activeSection === 'addresses' ? null : 'addresses')} style={{ cursor: 'pointer' }}>
            <div className="acc-menu-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
            <span>Saved Addresses</span>
            <svg className="acc-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: activeSection === 'addresses' ? 'rotate(90deg)' : 'none', transition: '0.2s' }}><path d="M9 18l6-6-6-6"/></svg>
          </div>
          {activeSection === 'addresses' && (
            <div style={{ padding: '12px 20px 16px', borderTop: '1px solid var(--light-gray)' }}>
              {currentUser ? (
                <div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>Home</span>
                      <span style={{ fontSize: 10, background: '#f0f0f0', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>Default</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--gray)' }}>123, MG Road, Near Central Mall, Bangalore - 560001</p>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Work</p>
                    <p style={{ fontSize: 13, color: 'var(--gray)' }}>45, Tech Park, Whitefield, Bangalore - 560066</p>
                  </div>
                  <button style={{ background: 'none', border: '1px solid var(--light-gray)', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ Add New Address</button>
                </div>
              ) : <p style={{ fontSize: 13, color: 'var(--gray)' }}>Login to manage saved addresses.</p>}
            </div>
          )}
        </div>
      </div>

      {/* QUICK ACCESS */}
      <h3 className="acc-section-title">Quick Access</h3>
      <div className="acc-quick-grid">
        {quickLinks.map(({ label, icon, action }) => (
          <div key={label} className="acc-quick-card" onClick={action} style={{ cursor: 'pointer' }}>
            {icon}
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* TWO COLUMNS */}
      <div className="acc-columns">
        <div className="acc-col-left">
          {/* RECENT ORDERS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 className="acc-section-title" style={{ marginBottom: 0 }}>Recent Orders</h3>
            <Link href="/orders" style={{ fontSize: 13, fontWeight: 600, color: 'var(--black)', textDecoration: 'none' }}>View All →</Link>
          </div>
          <div className="acc-card acc-orders-list">
            {displayOrders.map((order, i) => (
              <div key={order.id}>
                <div className="acc-order-item" onClick={() => router.push('/orders')} style={{ cursor: 'pointer' }}>
                  <img src={order.image || '/sf_tshirt.png'} alt="Order" onError={e => e.target.src = '/sf_tshirt.png'} />
                  <div className="acc-order-details">
                    <h4>{order.name || (order.items?.[0]?.name) || 'Soul Fit Item'}</h4>
                    <p>Order #{order.id}</p>
                    <span>₹{order.total?.toLocaleString('en-IN') || '—'} &bull; {order.date}</span>
                  </div>
                  <div className={`acc-order-status ${statusClass(order.status)}`}>{order.status}</div>
                  <svg className="acc-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </div>
                {i < displayOrders.length - 1 && <div className="acc-order-divider"/>}
              </div>
            ))}
            <div className="acc-order-footer" onClick={() => router.push('/orders')} style={{ cursor: 'pointer' }}>
              View All Orders &rarr;
            </div>
          </div>

          {/* WISHLIST */}
          <div className="acc-wishlist-header">
            <h3 className="acc-section-title">Wishlist ({wishlistItems.length})</h3>
            <span className="acc-view-all" onClick={openWishlist} style={{ cursor: 'pointer' }}>View All &rarr;</span>
          </div>
          <div className="acc-wishlist-grid">
            {wishlistItems.length > 0
              ? wishlistItems.slice(0, 4).map(item => (
                  <img key={item.id} src={`/${item.image}`} alt={item.name}
                    onClick={() => router.push(`/product/${item.id}`)}
                    style={{ cursor: 'pointer' }}
                    onError={e => e.target.src = '/sf_tshirt.png'} />
                ))
              : ['/sf_tshirt.png', '/sf_shirt.png', '/sf_cargo.png', '/sf_pant.png'].map((src, i) => (
                  <img key={i} src={src} alt="Wishlist Item" onClick={openWishlist} style={{ cursor: 'pointer' }} />
                ))
            }
          </div>
        </div>

        <div className="acc-col-right">
          {/* SAVED ADDRESSES */}
          <h3 className="acc-section-title">Saved Addresses</h3>
          <div className="acc-card acc-addresses">
            <div className="acc-address-item">
              <div className="acc-addr-info">
                <h4>Home <span className="acc-badge">Default</span></h4>
                <p>123, MG Road, Near Central Mall,<br/>Bangalore, Karnataka - 560001</p>
              </div>
              <svg className="acc-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
            <div className="acc-order-divider"/>
            <div className="acc-address-item">
              <div className="acc-addr-info">
                <h4>Work</h4>
                <p>45, Tech Park, Whitefield,<br/>Bangalore, Karnataka - 560066</p>
              </div>
              <svg className="acc-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
            <div className="acc-address-footer" style={{ cursor: 'pointer' }} onClick={() => setActiveSection('addresses')}>
              + Add New Address
            </div>
          </div>

          {/* PROMO / LOGOUT */}
          {currentUser ? (
            <div className="acc-promo-card" style={{ background: '#f9f9f9' }}>
              <div className="acc-promo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
              </div>
              <h3>Welcome, {currentUser.name.split(' ')[0]}! 🎉</h3>
              <p>You have access to exclusive member deals</p>
              <Link href="/offers"><button className="acc-btn-black-full">Browse Offers</button></Link>
            </div>
          ) : (
            <div className="acc-promo-card">
              <div className="acc-promo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
              </div>
              <h3>Get exclusive offers</h3>
              <p>Login to unlock member-only deals</p>
              <button className="acc-btn-black-full" onClick={openAuth}>Login / Sign Up</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
