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
            <Link href="/shipping">Shipping Policy</Link>
            <Link href="/returns">Returns & Refunds</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/support">Support</Link>
          </div>
          <div className="footer-v2-col">
            <h4><span className="gold-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span> COMPANY</h4>
            <Link href="/about">About Us</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/press">Press</Link>
            <Link href="/blog">Blog</Link>
          </div>
          <div className="footer-v2-col">
            <h4><span className="gold-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span> LEGAL</h4>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/returns">Refund Policy</Link>
          </div>
        </div>

        {/* BOTTOM: NEWSLETTER, SOCIAL, FEATURES */}
        <div className="footer-v2-bottom">
          <div className="footer-v2-newsletter">
            <h4>STAY CONNECTED</h4>
            <p>Join our community and get 10% off on your first order.</p>
            <form className="newsletter-form" onSubmit={e => {
              e.preventDefault();
              const email = e.target.email.value;
              if (email) {
                const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
                subscribers.push({ email, date: new Date().toISOString() });
                localStorage.setItem('subscribers', JSON.stringify(subscribers));
                import('react-toastify').then(({ toast }) => {
                  toast.success("Thanks for subscribing! Check your email.");
                });
                e.target.reset();
              }
            }}>
              <input type="email" name="email" placeholder="Enter your email" required />
              <button type="submit">SUBSCRIBE</button>
            </form>
          </div>

          <div className="footer-v2-social">
            <h4>FOLLOW US</h4>
            <div className="social-icons">
              <a href="https://instagram.com/soulfit.in" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
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
                <p>7 days return policy</p>
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

