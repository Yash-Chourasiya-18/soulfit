"use client";

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '../context/AppContext';

export default function Footer() {
  const { openChat } = useAppContext();

  return (
    <footer className="footer-v2">
      <div className="footer-v2-inner">
        {/* TOP: LOGO & TAGLINE */}
        <div className="footer-top">
          <img src="/last.png" alt="Soul Fit" className="footer-v2-logo" />
          <p className="footer-v2-desc">
            Soul Fit is more than fashion — it's a feeling.<br />
            We create threads that connect souls and celebrate individuality.
          </p>
        </div>

        {/* MIDDLE: 4 COLUMNS */}
        <div className="footer-v2-cols">
          <div className="footer-v2-col">
            <h4><span className="gold-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg></span> SHOP</h4>
            <Link href="/shop?category=T-shirt">T-Shirts</Link>
            <Link href="/shop?category=Shirt">Shirts</Link>
            <Link href="/shop?category=Pant">Pants</Link>
            <Link href="/shop?category=Cargo">Cargo</Link>
            <Link href="/shop?filter=new_arrivals">New Arrivals</Link>
          </div>
          <div className="footer-v2-col">
            <h4><span className="gold-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line></svg></span> HELP</h4>
            <Link href="/track">Track Order</Link>
            <Link href="/faq">Returns</Link>
            <Link href="/faq">FAQ</Link>
            <a href="javascript:void(0)" onClick={openChat}>Support</a>
          </div>
          <div className="footer-v2-col">
            <h4><span className="gold-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span> COMPANY</h4>
            <Link href="/about">About Us</Link>
            <Link href="#">Careers</Link>
            <Link href="#">Press</Link>
            <Link href="#">Blog</Link>
          </div>
          <div className="footer-v2-col">
            <h4><span className="gold-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span> LEGAL</h4>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/privacy">Cookie Policy</Link>
          </div>
        </div>

        {/* BOTTOM: NEWSLETTER, SOCIAL, FEATURES */}
        <div className="footer-v2-bottom">
          <div className="footer-v2-newsletter">
            <h4>STAY CONNECTED</h4>
            <p>Join our community and get 10% off on your first order.</p>
            <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">SUBSCRIBE</button>
            </form>
          </div>

          <div className="footer-v2-social">
            <h4>FOLLOW US</h4>
            <div className="social-icons">
              <a href="https://www.instagram.com/soulfit.in_?igsh=dDhpaWlnbjFnMGdr&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" aria-label="Pinterest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.4 9.3-.1-1.2-.2-3.1.1-4.4.3-1.3 1.9-8.1 1.9-8.1s-.5-.9-.5-2.3c0-2.2 1.3-3.8 2.8-3.8 1.3 0 1.9 1 1.9 2.2 0 1.3-.8 3.2-1.2 5-.3 1.5.8 2.7 2.2 2.7 2.7 0 4.7-2.8 4.7-6.9 0-3.6-2.6-6.1-6.2-6.1-4.2 0-6.7 3.2-6.7 6.4 0 1.3.5 2.6 1.1 3.4.1.1.1.3 0 .4-.1.6-.4 1.7-.4 1.9-.1.2-.2.3-.4.2-1.7-.8-2.8-3.3-2.8-5.3 0-4.3 3.1-8.3 9-8.3 4.7 0 8.4 3.4 8.4 8 0 4.7-3 8.5-7.1 8.5-1.4 0-2.7-.7-3.1-1.6l-.8 3.2c-.3 1.1-1.1 2.5-1.6 3.4C10.1 21.8 11 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"></path></svg>
              </a>
            </div>
          </div>

          <div className="footer-v2-features">
            <div className="feat-item">
              <span className="feat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg></span>
              <div>
                <h5>FREE SHIPPING</h5>
                <p>On orders above ₹999</p>
              </div>
            </div>
            <div className="feat-item">
              <span className="feat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg></span>
              <div>
                <h5>EASY RETURNS</h5>
                <p>14 days return policy</p>
              </div>
            </div>
            <div className="feat-item">
              <span className="feat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></span>
              <div>
                <h5>SECURE PAYMENT</h5>
                <p>100% secure checkout</p>
              </div>
            </div>
          </div>
        </div>

        {/* VERY BOTTOM: COPYRIGHT */}
        <div className="footer-v2-copyright">
          <p>&copy; 2024 Soul Fit. All rights reserved.</p>
          <div className="copyright-divider">
            <span className="line"></span>
            <span className="cross">✕</span>
            <span className="line"></span>
          </div>
          <p>Made with <span className="heart">🤍</span> for souls like yours.</p>
        </div>
      </div>
    </footer>
  );
}

