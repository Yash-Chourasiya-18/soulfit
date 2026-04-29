"use client";

import React, { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products } from '../../../lib/products';
import { useAppContext } from '../../../context/AppContext';

export default function ProductPage({ params }) {
  const { id } = use(params);
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link href="/shop" className="hero-btn mt-3">Return to Shop</Link>
      </div>
    );
  }

  const { addToCart, toggleWishlist, isInWishlist, openAuth, currentUser } = useAppContext();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [mainImg, setMainImg] = useState(product.image);
  
  const inWishlist = isInWishlist(product.id);

  const recommended = products.filter(x => x.category === product.category && x.id !== product.id).slice(0, 4);

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <div className="pdp-layout">
        {/* Gallery */}
        <div className="pdp-gallery">
          <div className="pdp-main-img-wrap">
            <img src={`/${mainImg}`} alt={product.name} className="pdp-main-img" />
          </div>
          <div className="pdp-thumbs">
            {product.images.map((img, i) => (
              <img 
                key={i}
                src={`/${img}`} 
                alt={`${product.name} angle ${i+1}`} 
                className={`pdp-thumb ${mainImg === img ? 'active' : ''}`} 
                onClick={() => setMainImg(img)}
              />
            ))}
          </div>
        </div>
        
        {/* Details */}
        <div className="pdp-details">
          <p className="pdp-category">{product.subcategory || product.category}</p>
          <h1 className="pdp-title">{product.name}</h1>
          <div className="product-price-row pdp-price-row">
            <p className="product-price" style={{ fontSize: '24px' }}>₹{product.price}</p>
            <p className="product-mrp" style={{ fontSize: '16px' }}>₹{product.mrp}</p>
            <span className="product-discount">{product.discount}</span>
          </div>
          <p className="pdp-desc">{product.description}</p>
          
          <div className="pdp-sizes">
            <h4 style={{ marginBottom: '12px', fontSize: '14px' }}>Select Size:</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {product.sizes.map(s => (
                <button 
                  key={s} 
                  className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid var(--black)',
                    background: selectedSize === s ? 'var(--black)' : 'transparent',
                    color: selectedSize === s ? 'var(--white)' : 'var(--black)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    borderRadius: '4px'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
            {product.comingSoon ? (
              <button className="hero-btn" style={{ flex: 1, background: '#888', cursor: 'not-allowed' }}>COMING SOON</button>
            ) : (
              <button className="hero-btn" style={{ flex: 1 }} onClick={() => addToCart(product, selectedSize)}>ADD TO CART</button>
            )}
            <button 
              className={`wishlist-btn-large ${inWishlist ? 'active' : ''}`} 
              onClick={() => toggleWishlist(product)}
              style={{
                width: '54px', height: '54px',
                border: '1px solid var(--black)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                background: 'transparent'
              }}
            >
              <svg viewBox="0 0 24 24" fill={inWishlist ? 'var(--black)' : 'none'} stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </button>
          </div>
          
          <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--light-gray)' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20" style={{ marginTop: '2px' }}><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
              <div>
                <strong style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Premium Fabric</strong>
                <p style={{ fontSize: '13px', color: 'var(--gray)' }}>{product.fabric}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20" style={{ marginTop: '2px' }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              <div>
                <strong style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Perfect Fit</strong>
                <p style={{ fontSize: '13px', color: 'var(--gray)' }}>{product.fit}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20" style={{ marginTop: '2px' }}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <div>
                <strong style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Best For</strong>
                <p style={{ fontSize: '13px', color: 'var(--gray)' }}>{product.useCase}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      {recommended.length > 0 && (
        <div style={{ marginTop: '80px' }}>
          <h3 className="section-title">You Might Also Like</h3>
          <div className="products-grid">
            {recommended.map(r => (
              <div className="product-card" key={`rec-${r.id}`}>
                <Link href={`/product/${r.id}`} className="product-img-wrap" style={{ display: 'block' }}>
                  <img src={`/${r.image}`} alt={r.name} className="product-img" />
                  {r.comingSoon && <div className="product-badge badge-sale" style={{ background: '#555' }}>COMING SOON</div>}
                </Link>
                <Link href={`/product/${r.id}`} className="product-info" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                  <p className="product-name">{r.name}</p>
                  <p className="product-price">₹{r.price}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
