import React from 'react';
import './about.css';

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Crafting Your Dream Home</h1>
          <p>Bespoke furniture and interior design that resonates with your soul.</p>
        </div>
      </section>

      <div className="container">
        {/* BRAND STORY */}
        <section className="about-story">
          <h2 className="about-section-title">Our Story</h2>
          <div className="story-content">
            <p>GHARSAAJ (meaning "Home Decor") was born from a passion for creating spaces that tell a story. We believe that your home is an extension of your soul, and every piece of furniture should be a masterpiece of comfort and craftsmanship.</p>
            <p>What started as a small design studio has grown into a premium furniture brand, trusted by homeowners and interior designers alike. We specialize in blending traditional craftsmanship with contemporary aesthetics, ensuring your space is both timeless and functional.</p>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="mission-vision">
          <div className="mv-box mission">
            <div className="mv-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            </div>
            <h3>Our Mission</h3>
            <p>To transform houses into homes by providing high-quality, designer furniture and personalized interior solutions that inspire and elevate everyday living.</p>
          </div>
          <div className="mv-box vision">
            <div className="mv-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <h3>Our Vision</h3>
            <p>To be the world's most loved home lifestyle brand, known for innovation in design, sustainability in materials, and excellence in service.</p>
          </div>
        </section>

        {/* WHY GHARSAAJ */}
        <section className="why-gharsaj">
          <h2 className="about-section-title">Why GHARSAAJ?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feat-icon">🪑</div>
              <h4>Bespoke Quality</h4>
              <p>We use premium hardwoods, top-grain leathers, and designer fabrics to ensure your furniture lasts for generations.</p>
            </div>
            <div className="feature-card">
              <div className="feat-icon">🎨</div>
              <h4>Design Expertise</h4>
              <p>Our team of interior designers works with you to create personalized layouts that maximize space and style.</p>
            </div>
            <div className="feature-card">
              <div className="feat-icon">🚚</div>
              <h4>Expert Installation</h4>
              <p>Enjoy white-glove delivery and professional assembly, ensuring your pieces are perfectly placed in your home.</p>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="brand-values">
          <h2 className="about-section-title">Our Values</h2>
          <div className="values-list">
            <div className="value-item">
              <div className="v-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></div>
              <span>Craftsmanship</span>
            </div>
            <div className="value-item">
              <div className="v-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
              <span>Excellence</span>
            </div>
            <div className="value-item">
              <div className="v-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
              <span>Sustainability</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta">
          <div className="cta-content">
            <h2>Ready to Transform Your Space?</h2>
            <p>Book a free consultation with our design experts today.</p>
            <a href="/shop" className="btn-shop-now">Browse Collection</a>
          </div>
        </section>
      </div>
    </div>
  );
}
