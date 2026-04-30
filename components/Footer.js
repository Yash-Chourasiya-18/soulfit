"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-premium">
      <div className="container">
        <div className="footer-grid">
          {/* Shop */}
          <div className="footer-col">
            <h4>Shop</h4>
            <ul className="footer-links">
              <li><Link href="/shop?category=Men" className="footer-link-item">Men</Link></li>
              <li><Link href="/shop?category=Women" className="footer-link-item">Women</Link></li>
              <li><Link href="/shop?category=New" className="footer-link-item">New Arrivals</Link></li>
              <li><Link href="/offers" className="footer-link-item">Sale</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className="footer-col">
            <h4>Help</h4>
            <ul className="footer-links">
              <li><Link href="/track" className="footer-link-item">Track Order</Link></li>
              <li><Link href="/returns" className="footer-link-item">Returns & Refunds</Link></li>
              <li><Link href="/shipping" className="footer-link-item">Shipping Info</Link></li>
              <li><Link href="/faq" className="footer-link-item">FAQ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><Link href="/about" className="footer-link-item">About Soul Fit</Link></li>
              <li><Link href="/sustainability" className="footer-link-item">Sustainability</Link></li>
              <li><Link href="/careers" className="footer-link-item">Careers</Link></li>
              <li><Link href="/contact" className="footer-link-item">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-col">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><Link href="/privacy" className="footer-link-item">Privacy Policy</Link></li>
              <li><Link href="/terms" className="footer-link-item">Terms & Conditions</Link></li>
              <li><Link href="/cookies" className="footer-link-item">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-premium">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} SOUL FIT. Threads that connect souls.
          </div>
          <div className="footer-socials-premium">
            <a href="https://instagram.com/soulfit.in_" target="_blank" className="social-link-premium">Instagram</a>
            <a href="#" className="social-link-premium">Twitter</a>
            <a href="#" className="social-link-premium">Facebook</a>
            <a href="#" className="social-link-premium">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
