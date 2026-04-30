"use client";

import React from 'react';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import { products } from '../lib/products';

export default function HomePage() {
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestseller).slice(0, 8);

  return (
    <main style={{ background: '#fff' }}>
      {/* ═══ HERO SECTION ═══ */}
      <section style={{ position: 'relative', width: '100%', height: '85vh', minHeight: '600px', overflow: 'hidden' }}>
        <img 
          src="/soulfit_category_shirt_1777394467745.png" 
          alt="Hero" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '0', right: '0', textAlign: 'center', color: '#fff', padding: '0 24px' }}>
          <h1 style={{ fontSize: 'clamp(40px, 8vw, 90px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Elevated Essentials
          </h1>
          <p style={{ fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '40px', opacity: 0.9 }}>
            The New Season Collection is Here
          </p>
          <Link href="/shop" style={{ display: 'inline-block', background: '#fff', color: '#111', padding: '18px 48px', borderRadius: '4px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', textDecoration: 'none', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
            Shop Now
          </Link>
        </div>
      </section>

      {/* ═══ CATEGORIES (Minimal Grid) ═══ */}
      <section className="container section-gap">
        <h2 style={{ fontSize: '24px', marginBottom: '40px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '2px' }}>Explore Categories</h2>
        <div className="categories-grid">
          {[
            { name: 'Shirts', img: '/soulfit_category_shirt_1777394467745.png', slug: 'Shirt' },
            { name: 'T-Shirts', img: '/soulfit_category_tshirt_1777394453783.png', slug: 'T-shirt' },
            { name: 'Pants', img: '/sf_pant.png', slug: 'Pant' },
            { name: 'Cargos', img: '/soulfit_category_cargo_1777394485440.png', slug: 'Cargo' }
          ].map(cat => (
            <Link key={cat.name} href={`/shop?category=${cat.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="category-card" style={{ boxShadow: 'none' }}>
                <div className="category-img-wrap" style={{ borderRadius: '12px' }}>
                  <img src={cat.img} className="category-img" alt={cat.name} />
                </div>
                <p style={{ marginTop: '16px', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>
                  {cat.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ NEW ARRIVALS ═══ */}
      <section className="container section-gap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', textTransform: 'uppercase', letterSpacing: '1px' }}>New Arrivals</h2>
          <Link href="/shop" style={{ fontSize: '12px', fontWeight: 700, color: '#666', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px' }}>View All</Link>
        </div>
        <div className="products-grid">
          {newArrivals.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ═══ PROMO STRIP (H&M style) ═══ */}
      <section style={{ background: '#000', color: '#fff', padding: '100px 0', margin: '100px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: ' clamp(32px, 5vw, 60px)', marginBottom: '24px', fontWeight: 900 }}>Soul Fit Inner Circle</h2>
          <p style={{ fontSize: '16px', marginBottom: '40px', opacity: 0.8, maxWidth: '600px', margin: '0 auto 40px' }}>Join our membership for exclusive early access, special pricing, and personalized styling.</p>
          <button style={{ background: '#fff', color: '#111', border: 'none', padding: '16px 40px', borderRadius: '4px', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}>
            Join the Movement
          </button>
        </div>
      </section>

      {/* ═══ BEST SELLERS ═══ */}
      <section className="container section-gap">
        <h2 style={{ fontSize: '24px', marginBottom: '40px', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>Trending Now</h2>
        <div className="products-grid">
          {bestSellers.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <style jsx>{`
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (min-width: 768px) {
          .categories-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </main>
  );
}
