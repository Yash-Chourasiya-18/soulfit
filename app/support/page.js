"use client";

import React from 'react';
import './support.css';

export default function SupportPage() {
  return (
    <div className="support-container">
      {/* HEADER */}
      <div className="supp-header">
        <div>
          <h1 className="supp-title">Support</h1>
          <p className="supp-subtitle">We're here to help you with anything you need.</p>
        </div>
        <button className="supp-settings-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
            <circle cx="6" cy="12" r="1.5"></circle>
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="18" cy="12" r="1.5"></circle>
          </svg>
        </button>
      </div>

      {/* SEARCH */}
      <div className="supp-search-wrap">
        <svg className="supp-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" className="supp-search-input" placeholder="Search for help topics..." />
      </div>

      {/* HELP GRID */}
      <h3 className="supp-section-title">How can we help you?</h3>
      <div className="supp-help-grid">
        <div className="supp-help-card">
          <div className="supp-help-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <h4>Track Your Order</h4>
          <p>Get real-time updates on your order status.</p>
          <svg className="supp-help-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
        <div className="supp-help-card">
          <div className="supp-help-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>
          </div>
          <h4>Returns &amp; Refunds</h4>
          <p>Learn about our return and refund policy.</p>
          <svg className="supp-help-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
        <div className="supp-help-card">
          <div className="supp-help-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          </div>
          <h4>Payment Issues</h4>
          <p>Trouble with payment? We can help.</p>
          <svg className="supp-help-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
        <div className="supp-help-card">
          <div className="supp-help-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          </div>
          <h4>Other Queries</h4>
          <p>Get help with any other questions.</p>
          <svg className="supp-help-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </div>

      {/* FAQ */}
      <div className="supp-faq-header">
        <h3 className="supp-section-title" style={{marginBottom: 0}}>Frequently Asked Questions</h3>
        <span className="supp-view-all">View All &gt;</span>
      </div>
      <div className="supp-faq-list">
        <div className="supp-faq-item">
          <span>How can I track my order?</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
        <div className="supp-faq-item">
          <span>What is your return policy?</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
        <div className="supp-faq-item">
          <span>How long does shipping take?</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
        <div className="supp-faq-item">
          <span>What payment methods do you accept?</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
        <div className="supp-faq-item">
          <span>How can I cancel my order?</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </div>

      {/* CONTACT */}
      <div className="supp-contact-card">
        <div className="supp-contact-left">
          <div className="supp-contact-left-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
          </div>
          <h3>Still need help?</h3>
          <p>Our support team is available to assist you.</p>
          <button className="supp-btn-black">Contact Us</button>
        </div>
        <div className="supp-contact-right">
          <div className="supp-contact-method">
            <svg className="supp-method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <div className="supp-method-info">
              <h4>Email Us</h4>
              <p>support@soulfit.com</p>
            </div>
            <svg className="supp-method-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"></path></svg>
          </div>
          <div className="supp-contact-method">
            <svg className="supp-method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <div className="supp-method-info">
              <h4>Call Us</h4>
              <p>+91 12345 67890</p>
              <p className="supp-method-sub">Mon - Sat, 10AM - 7PM</p>
            </div>
            <svg className="supp-method-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"></path></svg>
          </div>
          <div className="supp-contact-method">
            <svg className="supp-method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <div className="supp-method-info">
              <h4>Live Chat</h4>
              <p>Chat with our support team</p>
              <p className="supp-method-sub">Mon - Sat, 10AM - 7PM</p>
            </div>
            <svg className="supp-method-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"></path></svg>
          </div>
        </div>
      </div>

      {/* ASSURANCES */}
      <div className="supp-assurances">
        <div className="supp-assurance-item">
          <svg className="supp-assurance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
          <div className="supp-assurance-info">
            <h4>Free Shipping</h4>
            <p>On all orders above ₹999</p>
          </div>
        </div>
        <div className="supp-assurance-item">
          <svg className="supp-assurance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <div className="supp-assurance-info">
            <h4>Secure Payment</h4>
            <p>100% secure checkout</p>
          </div>
        </div>
        <div className="supp-assurance-item">
          <svg className="supp-assurance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
          <div className="supp-assurance-info">
            <h4>Easy Returns</h4>
            <p>7 days return policy</p>
          </div>
        </div>
        <div className="supp-assurance-item">
          <svg className="supp-assurance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
          <div className="supp-assurance-info">
            <h4>Customer Support</h4>
            <p>We're here to help</p>
          </div>
        </div>
      </div>
    </div>
  );
}
