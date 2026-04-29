"use client";

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '../context/AppContext';

export default function Header() {
  const { openSidebar, openAuthModal, openWishlist, openCart, cartItems, currentUser, openAuth } = useAppContext();

  return (
    <header className="header" id="mainHeader">
      <div className="header-inner">
        {/* LEFT: Three-dot menu button */}
        <button className="header-btn three-dot-btn" onClick={openSidebar} aria-label="Menu">
          <span className="three-dot"></span>
          <span className="three-dot"></span>
          <span className="three-dot"></span>
        </button>

        {/* CENTER: Logo Text */}
        <div className="header-logo-center">
          <Link href="/" className="logo-text" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="logo-soul">SOUL</span><span className="logo-divider">|</span><span className="logo-fit">FIT</span>
            <div className="logo-sub">THREADS THAT CONNECT SOULS</div>
          </Link>
        </div>

        {/* RIGHT: Actions */}
        <div className="header-actions">
          <button className="header-btn" aria-label="Profile" onClick={currentUser ? undefined : openAuth}>
            {currentUser ? (
               <Link href="/account" style={{ color: 'inherit' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
               </Link>
            ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
            )}
          </button>
          <button className="header-btn" aria-label="Wishlist" onClick={openWishlist}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
          <button className="header-btn cart-btn" aria-label="Cart" onClick={openCart}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
              <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="cart-badge" id="cartBadge">{cartItems.length}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
