import React from 'react';
import './about.css';

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Made For Every Soul</h1>
          <p>Crafting threads that connect hearts and celebrate individuality.</p>
        </div>
      </section>

      <div className="container">
        {/* BRAND STORY */}
        <section className="about-story">
          <h2 className="about-section-title">Our Story</h2>
          <div className="story-content">
            <p>Soul Fit began with a simple yet powerful idea: fashion should be more than what you wear; it should be how you feel. Founded in the heart of urban expression, we noticed a gap between high-end luxury and everyday comfort. We wanted to bridge that gap by creating apparel that doesn't just look premium but feels like a second skin.</p>
            <p>Today, Soul Fit is a community of dreamers, doers, and souls who value quality over quantity. Every stitch, every fabric choice, and every design is a testament to our commitment to excellence. We don't just follow trends; we create pieces that stand the test of time, both in style and durability.</p>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="mission-vision">
          <div className="mv-box mission">
            <div className="mv-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            </div>
            <h3>Our Mission</h3>
            <p>To empower individuals to express their unique souls through premium, comfortable, and sustainable fashion that inspires confidence every day.</p>
          </div>
          <div className="mv-box vision">
            <div className="mv-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <h3>Our Vision</h3>
            <p>To become the global benchmark for soulful apparel, where style meets substance, and every garment tells a story of craftsmanship and care.</p>
          </div>
        </section>

        {/* WHY SOUL FIT */}
        <section className="why-soulfit">
          <h2 className="about-section-title">Why Soul Fit?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feat-icon">✨</div>
              <h4>Premium Quality</h4>
              <p>We use only the finest long-staple cotton and innovative blends to ensure lasting softness and durability.</p>
            </div>
            <div className="feature-card">
              <div className="feat-icon">🌿</div>
              <h4>Sustainable Fashion</h4>
              <p>Our commitment to the planet means ethical sourcing and eco-friendly manufacturing processes.</p>
            </div>
            <div className="feature-card">
              <div className="feat-icon">🖤</div>
              <h4>Made For Every Soul</h4>
              <p>Inclusive sizing and versatile designs that celebrate every body type and personal style.</p>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="brand-values">
          <h2 className="about-section-title">Our Values</h2>
          <div className="values-list">
            <div className="value-item">
              <div className="v-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></div>
              <span>Integrity</span>
            </div>
            <div className="value-item">
              <div className="v-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
              <span>Excellence</span>
            </div>
            <div className="value-item">
              <div className="v-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
              <span>Community</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta">
          <div className="cta-content">
            <h2>Join Our Community</h2>
            <p>Be a part of the movement. Discover your soul fit today.</p>
            <a href="/shop" className="btn-shop-now">Shop The Collection</a>
          </div>
        </section>
      </div>
    </div>
  );
}
