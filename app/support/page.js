"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../context/AppContext';
import './support.css';

const FAQS = [
  { id: 1, q: "How can I track my order?", a: "You can track your order by going to the 'Track Order' page and entering your Order ID or Tracking Number. You can also find tracking links in your confirmation email." },
  { id: 2, q: "What is your return policy?", a: "We offer a 7-day hassle-free return policy. Items must be unused, in original packaging, and with all tags attached." },
  { id: 3, q: "How long does shipping take?", a: "Standard delivery takes 3–5 business days. Express shipping (1–2 days) is available at checkout for eligible locations." },
  { id: 4, q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, UPI (GPay, PhonePe, Paytm), and Net Banking via our secure Razorpay gateway." },
  { id: 5, q: "How can I cancel my order?", a: "Orders can be cancelled within 12 hours of placement or before they are dispatched. Go to 'My Orders' to request a cancellation." },
];

export default function SupportPage() {
  const { openChat } = useAppContext();
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);
  const [search, setSearch] = useState('');

  const filteredFaqs = FAQS.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="support-container">
      {/* HEADER */}
      <div className="supp-header">
        <div>
          <h1 className="supp-title">Support</h1>
          <p className="supp-subtitle">We're here to help you with anything you need.</p>
        </div>

      </div>

      {/* SEARCH */}
      <div className="supp-search-wrap">
        <svg className="supp-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" className="supp-search-input" placeholder="Search for help topics..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* HELP GRID */}
      <h3 className="supp-section-title">How can we help you?</h3>
      <div className="supp-help-grid">
        <div className="supp-help-card" onClick={() => router.push('/track')} style={{ cursor: 'pointer' }}>
          <div className="supp-help-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <h4>Track Your Order</h4>
          <p>Get real-time updates on your order status.</p>
          <svg className="supp-help-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
        <div className="supp-help-card" onClick={() => router.push('/orders')} style={{ cursor: 'pointer' }}>
          <div className="supp-help-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 14L4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" /></svg>
          </div>
          <h4>Returns &amp; Refunds</h4>
          <p>Learn about our return and refund policy.</p>
          <svg className="supp-help-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
        <div className="supp-help-card" onClick={() => router.push('/account')} style={{ cursor: 'pointer' }}>
          <div className="supp-help-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          </div>
          <h4>Payment Issues</h4>
          <p>Trouble with payment? We can help.</p>
          <svg className="supp-help-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
        <div className="supp-help-card" onClick={() => router.push('/faq')} style={{ cursor: 'pointer' }}>
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
        <h3 className="supp-section-title" style={{ marginBottom: 0 }}>Frequently Asked Questions</h3>
        <span className="supp-view-all" onClick={() => router.push('/faq')} style={{ cursor: 'pointer' }}>View All &gt;</span>
      </div>
      <div className="supp-faq-list">
        {filteredFaqs.length > 0 ? filteredFaqs.map(faq => (
          <div key={faq.id} className={`supp-faq-item-wrap ${openFaq === faq.id ? 'active' : ''}`}>
            <div className="supp-faq-item" onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}>
              <span>{faq.q}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: openFaq === faq.id ? 'rotate(180deg)' : 'none' }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            {openFaq === faq.id && (
              <div className="supp-faq-answer">
                {faq.a}
              </div>
            )}
          </div>
        )) : <p style={{ padding: '20px', color: 'var(--gray)' }}>No matching FAQs found.</p>}
      </div>

      {/* CONTACT */}
      <div className="supp-contact-card">
        <div className="supp-contact-left">
          <div className="supp-contact-left-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
          </div>
          <h3>Still need help?</h3>
          <p>Our support team is available to assist you.</p>
          <button className="supp-btn-black" onClick={() => window.location.href = 'mailto:support@soulfit.com'}>Contact Us</button>
        </div>
        <div className="supp-contact-right">
          <div className="supp-contact-method" onClick={() => window.location.href = 'mailto:support@soulfit.com'} style={{ cursor: 'pointer' }}>
            <svg className="supp-method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <div className="supp-method-info">
              <h4>Email Us</h4>
              <p>support@soulfit.com</p>
            </div>
            <svg className="supp-method-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"></path></svg>
          </div>
          <div className="supp-contact-method" onClick={() => window.location.href = 'tel:+918103758319'} style={{ cursor: 'pointer' }}>
            <svg className="supp-method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <div className="supp-method-info">
              <h4>Call Us</h4>
              <p>+91 81037 58319</p>
              <p className="supp-method-sub">Mon - Sat, 10AM - 7PM</p>
            </div>
            <svg className="supp-method-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"></path></svg>
          </div>
          <div className="supp-contact-method" onClick={openChat} style={{ cursor: 'pointer' }}>
            <svg className="supp-method-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <div className="supp-method-info">
              <h4>Live Chat</h4>
              <p>Chat with our AI Bot</p>
              <p className="supp-method-sub">Available 24/7</p>
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
