"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import './support.css';

export default function SupportPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    toast.success("Message sent successfully! We'll get back to you within 24 hours.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="support-container">
      <div className="supp-header">
        <h1 className="supp-title">Contact Support</h1>
        <p className="supp-subtitle">We typically reply within 24 hours. How can we help you today?</p>
      </div>

      <div className="support-content-layout">
        <div className="support-form-section">
          <form className="contact-form-premium" onSubmit={handleSubmit}>
            <div className="form-group-row">
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input 
                type="text" 
                name="subject" 
                placeholder="How can we help?" 
                value={formData.subject} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea 
                name="message" 
                rows="5" 
                placeholder="Tell us more about your inquiry..." 
                value={formData.message} 
                onChange={handleChange} 
                required
              ></textarea>
            </div>
            <button type="submit" className="supp-submit-btn">Send Message</button>
          </form>
        </div>

        <div className="support-info-section">
          <div className="info-card">
            <h3>Get In Touch</h3>
            <p className="reply-notice">We reply within 24 hours</p>
            
            <div className="contact-links">
              <a href="mailto:support@soulfit.com" className="contact-link-item">
                <div className="icon-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>support@soulfit.com</p>
                </div>
              </a>

              <a href="https://instagram.com/soulfit.in" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <div className="icon-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
                <div>
                  <h4>Instagram</h4>
                  <p>@soulfit.in</p>
                </div>
              </a>

              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <div className="icon-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </div>
                <div>
                  <h4>WhatsApp</h4>
                  <p>Message us</p>
                </div>
              </a>
            </div>
          </div>

          <div className="support-faq-cta">
            <h4>Quick Links</h4>
            <div className="quick-links-grid">
              <button onClick={() => router.push('/track')}>Track Order</button>
              <button onClick={() => router.push('/faq')}>FAQs</button>
              <button onClick={() => router.push('/shipping')}>Shipping</button>
              <button onClick={() => router.push('/returns')}>Returns</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
