"use client";

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '../context/AppContext';

export default function Header() {
  const { 
    cart, 
    toggleCart, 
    toggleSearch,
    toggleSidebar
  } = useAppContext();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-inner">
        {/* Menu Toggle */}
        <button className="action-btn" onClick={toggleSidebar}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* LOGO */}
        <Link href="/" className="logo-text-premium">
          Soul Fit
        </Link>

        {/* NAVIGATION LINKS (Desktop) */}
        <nav className="nav-links" style={{ display: 'none' }}>
          {/* We can enable this if needed, for now keeping it minimal like H&M/Zara */}
          <Link href="/shop?category=Men" className="nav-link">Men</Link>
          <Link href="/shop?category=Women" className="nav-link">Women</Link>
          <Link href="/shop?category=New" className="nav-link">New Arrivals</Link>
          <Link href="/offers" className="nav-link">Offers</Link>
        </nav>

        {/* ACTIONS */}
        <div className="header-actions">
          <button className="action-btn" onClick={toggleSearch}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <Link href="/wishlist" className="action-btn">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </Link>

          <button className="action-btn" onClick={toggleCart}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          nav { display: flex !important; }
          .header-inner { justify-content: space-between; }
          .logo-text-premium { position: absolute; left: 50%; transform: translateX(-50%); }
        }
      `}</style>
    </header>
  );
}
