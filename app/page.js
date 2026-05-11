import React from 'react';
import Link from 'next/link';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import { products } from '../lib/products';

export default function HomePage() {
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  return (
    <>
      <HeroSlider />

      {/* CATEGORIES */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            <Link href="/shop?category=Sofa" className="category-card">
              <div className="category-img-wrap"><img src="/cat_sofa.png" className="category-img" alt="Sofa" /></div>
              <p className="category-name">Sofas</p>
            </Link>
            <Link href="/shop?category=Dining" className="category-card">
              <div className="category-img-wrap"><img src="/cat_dining.png" className="category-img" alt="Dining" /></div>
              <p className="category-name">Dining</p>
            </Link>
            <Link href="/shop?category=Bed" className="category-card">
              <div className="category-img-wrap"><img src="/cat_bed.png" className="category-img" alt="Beds" /></div>
              <p className="category-name">Beds</p>
            </Link>
            <Link href="/shop?category=Lighting" className="category-card">
              <div className="category-img-wrap"><img src="/cat_lighting.png" className="category-img" alt="Lighting" /></div>
              <p className="category-name">Lighting</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <div className="container" style={{ marginBottom: '40px' }}>
        <div className="features-strip">
          <div className="feature-card feature-card-highlight">
            <div className="feature-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24"><path d="M5 12l5 5L20 7" /></svg>
            </div>
            <div className="feature-text">
              <div className="feature-title">100% Original</div>
              <div className="feature-sub">Guaranteed authentic</div>
            </div>
          </div>
          <div className="feature-divider"></div>
          <div className="feature-card">
            <div className="feature-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
            </div>
            <div className="feature-text">
              <div className="feature-title">Expert Delivery</div>
              <div className="feature-sub">White-glove service</div>
            </div>
          </div>
          <div className="feature-divider"></div>
          <div className="feature-card">
            <div className="feature-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24"><path d="M3 3h18v18H3z" /><path d="M9 9h6v6H9z" /></svg>
            </div>
            <div className="feature-text">
              <div className="feature-title">Easy Returns</div>
              <div className="feature-sub">48 hours return policy</div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW ARRIVALS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
            <Link href="/shop?filter=new_arrivals" className="view-all">View All <span style={{ fontSize: '18px' }}>›</span></Link>
          </div>
          <div className="products-grid">
            {newArrivals.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ASSURANCES */}
      <section className="assurances-section">
        <div className="container">
          <div className="assurances-wrap">
            <div className="assurance-item">
              <div className="assurance-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="24" height="24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              </div>
              <h4 className="assurance-title">Premium Craftsmanship</h4>
              <p className="assurance-desc">Every piece is handcrafted with the finest materials and extreme attention to detail.</p>
            </div>
            <div className="assurance-divider"></div>
            <div className="assurance-item">
              <div className="assurance-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="24" height="24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
              </div>
              <h4 className="assurance-title">Secure Payments</h4>
              <p className="assurance-desc">100% secure payment gateways to ensure your details are always safe.</p>
            </div>
            <div className="assurance-divider"></div>
            <div className="assurance-item">
              <div className="assurance-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="24" height="24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line></svg>
              </div>
              <h4 className="assurance-title">24x7 Available</h4>
              <p className="assurance-desc">Our dedicated support team is available around the clock to assist you.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
