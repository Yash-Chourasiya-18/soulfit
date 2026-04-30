"use client";

import React, { useState, use, useRef } from 'react';
import Link from 'next/link';
import { products } from '../../../lib/products';
import { useAppContext } from '../../../context/AppContext';
import ReviewsSystem from '../../../components/ReviewsSystem';

export default function ProductPage({ params }) {
  const { id } = use(params);
  const product = products.find(p => p.id === Number(id));
  const scrollRef = useRef(null);

  if (!product) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Product Not Found</h2>
        <Link href="/shop" className="hero-btn">Return to Shop</Link>
      </div>
    );
  }

  const { addToCart, toggleWishlist, isInWishlist } = useAppContext();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [mainImg, setMainImg] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('specs');

  const inWishlist = isInWishlist(product.id);
  const recommended = products.slice(0, 8).filter(p => p.id !== product.id);
  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, selectedSize, quantity);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({ 
        left: direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="container" style={{ padding: '20px 24px 120px', background: '#fff' }}>

      {/* SIZE GUIDE MODAL */}
      {isSizeGuideOpen && (
        <div className="modal-overlay open" style={{ zIndex: 20000 }}>
          <div className="modal-content" style={{ maxWidth: '820px', padding: '48px', borderRadius: '16px' }}>
            <button className="modal-close" onClick={() => setIsSizeGuideOpen(false)}>✕</button>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 800 }}>Size Guide</h2>
              <p style={{ color: '#888', marginTop: '6px' }}>All measurements in inches</p>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#111', color: '#fff' }}>
                    {['Size', 'Chest', 'Length', 'Shoulder', 'Sleeve'].map(h => (
                      <th key={h} style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textAlign: 'center' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[['S', '38', '26', '16', '7.5'], ['M', '40', '27', '17', '8'], ['L', '42', '28', '18', '8'], ['XL', '44', '29', '19', '8.5'], ['2XL', '46', '30', '20', '9']].map(([size, ...vals], i) => (
                    <tr key={size} style={{ background: i % 2 === 0 ? '#fafafa' : '#fff', borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 800, textAlign: 'center', fontSize: '14px' }}>{size}</td>
                      {vals.map((v, j) => <td key={j} style={{ padding: '14px 20px', textAlign: 'center', color: '#555', fontSize: '14px' }}>{v}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* BREADCRUMBS */}
      <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '28px', display: 'flex', gap: '6px', alignItems: 'center' }}>
        <Link href="/" style={{ color: 'inherit' }}>Home</Link>
        <span>›</span>
        <Link href={`/shop?category=${product.category}`} style={{ color: 'inherit' }}>{product.category}</Link>
        <span>›</span>
        <span style={{ color: '#222', fontWeight: 600 }}>{product.name}</span>
      </div>

      {/* MAIN PRODUCT GRID */}
      <div className="pdp-main-grid" style={{ display: 'grid', gridTemplateColumns: '80px 1fr 420px', gap: '48px', marginBottom: '100px' }}>

        {/* THUMBNAILS (LEFT) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {product.images.map((img, i) => (
            <div 
              key={i} 
              onClick={() => setMainImg(img)} 
              style={{ 
                width: '80px', height: '104px', 
                borderRadius: '12px', overflow: 'hidden', 
                cursor: 'pointer', border: mainImg === img ? '2px solid #111' : '1px solid #F3F4F6',
                transition: 'all 0.2s'
              }}
            >
              <img src={`/${img}`} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>

        {/* MAIN IMAGE (CENTER) */}
        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', background: '#F9FAFB', border: '1px solid #F3F4F6', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <img 
            src={`/${mainImg}`} 
            alt={product.name} 
            className="pdp-main-img"
            style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.5s ease' }} 
          />
        </div>

        {/* PRODUCT DETAILS (RIGHT) */}
        <div className="pdp-right-info">
          {product.isBestseller && (
            <span style={{ display: 'inline-block', background: '#FEF3C7', color: '#D97706', fontSize: '10px', fontWeight: 800, padding: '4px 12px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>BESTSELLER</span>
          )}

          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#111', marginBottom: '12px', lineHeight: 1.2 }}>{product.name}</h1>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '24px' }}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: '#111' }}>₹{product.price}</span>
            <span style={{ fontSize: '16px', color: '#9CA3AF', textDecoration: 'line-through' }}>₹{product.mrp}</span>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#16A34A', background: '#DCFCE7', padding: '4px 10px', borderRadius: '4px' }}>{product.discount} OFF</span>
          </div>

          <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#555', marginBottom: '24px' }}>
            {product.description || "A testament to Soul Fit's commitment to quality. This garment blends contemporary aesthetics with timeless comfort — crafted for those who value detail."}
          </p>

          {/* QUICK FEATURES (Bullet Points) */}
          <div style={{ marginBottom: '32px', padding: '20px', background: '#F9FAFB', borderRadius: '12px', border: '1px solid #F3F4F6' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 800, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Product Info</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#555', lineHeight: 2 }}>
              <li>• Premium Knitted Cotton Fabric</li>
              <li>• Relaxed Regular Fit</li>
              <li>• Machine Wash Cold / Care Instructions included</li>
            </ul>
          </div>

          {/* SIZE SELECTOR */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#111' }}>Select Size</span>
              <span onClick={() => setIsSizeGuideOpen(true)} style={{ fontSize: '12px', fontWeight: 600, color: '#9CA3AF', textDecoration: 'underline', cursor: 'pointer' }}>Size Guide</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {product.sizes.map(s => (
                <button 
                  key={s} 
                  onClick={() => setSelectedSize(s)} 
                  style={{ 
                    width: '52px', height: '52px', borderRadius: '12px', 
                    border: selectedSize === s ? '2px solid #111' : '1px solid #E5E7EB', 
                    background: selectedSize === s ? '#111' : '#fff', 
                    color: selectedSize === s ? '#fff' : '#111', 
                    fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' 
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY SELECTOR */}
          <div style={{ marginBottom: '32px' }}>
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#111', display: 'block', marginBottom: '12px' }}>Quantity</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #E5E7EB', borderRadius: '12px', background: '#fff' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: '44px', height: '44px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px', color: '#9CA3AF' }}>−</button>
                <span style={{ width: '40px', textAlign: 'center', fontWeight: 800, fontSize: '16px' }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} style={{ width: '44px', height: '44px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px', color: '#9CA3AF' }}>+</button>
              </div>
              <span style={{ fontSize: '14px', color: '#9CA3AF' }}>Total: <strong style={{ color: '#111', fontSize: '18px' }}>₹{totalPrice}</strong></span>
            </div>
          </div>

          {/* CTA BUTTONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                style={{ 
                  flex: 1, padding: '18px', borderRadius: '12px', 
                  background: '#111', color: '#fff', border: 'none', 
                  fontWeight: 800, fontSize: '15px', cursor: 'pointer', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  gap: '10px', transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                {isAdding ? 'ADDING...' : 'ADD TO CART'}
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                style={{ 
                  width: '60px', height: '60px', borderRadius: '12px', 
                  border: `1.5px solid ${inWishlist ? '#EF4444' : '#E5E7EB'}`, 
                  background: inWishlist ? '#FEF2F2' : '#fff', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  cursor: 'pointer', transition: 'all 0.2s' 
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill={inWishlist ? '#EF4444' : 'none'} stroke={inWishlist ? '#EF4444' : '#374151'} strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
              </button>
            </div>
            <button
              style={{ 
                padding: '18px', borderRadius: '12px', 
                background: '#fff', color: '#111', border: '1.5px solid #111', 
                fontWeight: 800, fontSize: '15px', cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              BUY IT NOW
            </button>
          </div>

          {/* TRUST BADGES */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 0', borderTop: '1px solid #F3F4F6', borderBottom: '1px solid #F3F4F6', marginBottom: '32px' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>↩</div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>7 Days Return</span>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>🛡️</div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>Secure Pay</span>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>✨</div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>Premium Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ CUSTOMER REVIEWS SECTION ══════════════════════════════════ */}
      <div style={{ maxWidth: '960px', margin: '0 auto 100px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#111', margin: 0 }}>Customer Reviews</h2>
          <div style={{ flex: 1, height: '1px', background: '#F3F4F6' }} />
        </div>
        <ReviewsSystem productId={product.id} />
      </div>

      {/* ═══ THE SOUL FIT EDIT (RECOMMENDATIONS) ══════════════════════ */}
      <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#111', margin: 0 }}>The Soul Fit Edit</h3>
            <p style={{ fontSize: '14px', color: '#9CA3AF', marginTop: '6px' }}>Handpicked essentials curated to complete your look</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => scroll('left')} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E5E7EB', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button onClick={() => scroll('right')} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E5E7EB', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
        <div ref={scrollRef} style={{ display: 'flex', gap: '24px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '20px' }}>
          {recommended.map(r => (
            <div 
              key={r.id} 
              className="rec-card" 
              style={{ 
                width: '230px', flexShrink: 0, borderRadius: '16px', 
                overflow: 'hidden', border: '1px solid #F3F4F6', background: '#fff',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                <Link href={`/product/${r.id}`}>
                  <img 
                    src={`/${r.image}`} 
                    alt={r.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  />
                </Link>
                <button 
                  onClick={() => toggleWishlist(r)} 
                  style={{ position: 'absolute', top: '12px', right: '12px', width: '34px', height: '34px', borderRadius: '50%', background: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill={isInWishlist(r.id) ? '#EF4444' : 'none'} stroke={isInWishlist(r.id) ? '#EF4444' : '#111'} strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
                </button>
              </div>
              <div style={{ padding: '16px' }}>
                <p style={{ fontSize: '13px', fontWeight: 800, color: '#111', marginBottom: '6px' }}>{r.name}</p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontWeight: 800, fontSize: '15px' }}>₹{r.price}</span>
                  <span style={{ fontSize: '12px', color: '#9CA3AF', textDecoration: 'line-through' }}>₹{r.mrp}</span>
                </div>
                <button 
                  onClick={() => addToCart(r, r.sizes[0], 1)}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #111', background: '#fff', fontSize: '12px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar { display: none; }
        .pdp-main-img:hover { transform: scale(1.05); }
        .rec-card:hover { transform: translateY(-8px); boxShadow: 0 12px 32px rgba(0,0,0,0.08); }
        .rec-card:hover img { transform: scale(1.05); }
        @media (max-width: 1024px) {
          .pdp-main-grid { grid-template-columns: 80px 1fr !important; gap: 24px !important; }
          .pdp-right-info { grid-column: span 2; }
        }
        @media (max-width: 640px) {
          .pdp-main-grid { grid-template-columns: 1fr !important; }
          div[style*="flexDirection: column"] { flexDirection: row !important; overflow-x: auto; scrollbar-width: none; }
          div[style*="width: 80px"] { width: 60px !important; height: 80px !important; flex-shrink: 0; }
        }
      `}</style>
    </div>
  );
}
