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
          {(product.images || [product.image]).map((img, i) => (
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
              <img src={img.startsWith('http') ? img : `/${img}`} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>

        {/* MAIN IMAGE (CENTER) */}
        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', background: '#F9FAFB', border: '1px solid #F3F4F6', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <img 
            src={mainImg.startsWith('http') ? mainImg : `/${mainImg}`} 
            alt={product.name} 
            className="pdp-main-img"
            style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.5s ease' }} 
          />
        </div>

        {/* PRODUCT DETAILS (RIGHT) */}
        <div className="pdp-right-info">
          {(product.badge === "Best Seller" || product.isBestseller) && (
            <span style={{ display: 'inline-block', background: '#FEF3C7', color: '#D97706', fontSize: '10px', fontWeight: 800, padding: '4px 12px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>BESTSELLER</span>
          )}

          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#111', marginBottom: '12px', lineHeight: 1.2 }}>{product.name}</h1>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '24px' }}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: '#111' }}>₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span style={{ fontSize: '16px', color: '#9CA3AF', textDecoration: 'line-through' }}>₹{product.originalPrice}</span>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#16A34A', background: '#DCFCE7', padding: '4px 10px', borderRadius: '4px' }}>
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
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

          {/* CTA BUTTONS (NEW STYLE) */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <span style={{ fontSize: '14px', color: '#555' }}>Quantity</span>
              <select 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ 
                  padding: '8px 16px', borderRadius: '8px', border: '1px solid #E5E7EB', 
                  fontSize: '14px', fontWeight: 600, outline: 'none', cursor: 'pointer',
                  background: '#F9FAFB'
                }}
              >
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n < 10 ? `0${n}` : n}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                style={{ 
                  flex: 2, padding: '16px', borderRadius: '4px', 
                  background: '#EB3B21', color: '#fff', border: 'none', 
                  fontWeight: 800, fontSize: '14px', cursor: 'pointer', 
                  textTransform: 'uppercase', letterSpacing: '1px'
                }}
              >
                {isAdding ? 'ADDING...' : 'ADD TO CART'}
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                style={{ 
                  flex: 1.5, padding: '16px', borderRadius: '4px', 
                  border: '1.5px solid #238E8E', background: '#fff', 
                  color: '#238E8E', fontWeight: 800, fontSize: '12px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  gap: '8px', cursor: 'pointer', textTransform: 'uppercase'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={inWishlist ? '#238E8E' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
                ADD TO WISHLIST
              </button>
            </div>

            {/* SHARE ICONS */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#555', marginBottom: '32px' }}>
              <span style={{ fontSize: '14px' }}>Share</span>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#555' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .01 5.403.006 12.039a11.81 11.81 0 001.602 6.005L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.635 0 12.04-5.404 12.044-12.039a11.815 11.815 0 00-3.526-8.508"/></svg>
                </button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#555' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#555' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#555' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </button>
              </div>
            </div>

            {/* DELIVERY DETAILS (PINCODE CHECK) */}
            <div style={{ marginBottom: '32px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#111', marginBottom: '16px' }}>Delivery Details</h4>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="Enter Pincode" 
                  style={{ 
                    width: '100%', padding: '14px 20px', paddingRight: '80px',
                    borderRadius: '8px', border: '1.5px solid #E5E7EB',
                    fontSize: '14px', outline: 'none'
                  }}
                />
                <button 
                  style={{ 
                    position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: '#238E8E', fontWeight: 800,
                    fontSize: '13px', cursor: 'pointer', letterSpacing: '0.5px'
                  }}
                >
                  CHECK
                </button>
              </div>
            </div>

            {/* RETURN POLICY BOX */}
            <div style={{ padding: '16px', background: '#F9FAFB', borderRadius: '4px', border: '1px solid #E5E7EB', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', border: '1.5px solid #374151', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="12 8 12 12 15 15"/></svg>
              </div>
              <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#374151', margin: 0 }}>
                This product is eligible for return or exchange under our 7-day return or exchange policy. No questions asked.
              </p>
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
                    src={r.image.startsWith('http') ? r.image : `/${r.image}`} 
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
                  {r.originalPrice && <span style={{ fontSize: '12px', color: '#9CA3AF', textDecoration: 'line-through' }}>₹{r.originalPrice}</span>}
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
