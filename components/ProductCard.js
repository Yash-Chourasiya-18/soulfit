"use client";

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '../context/AppContext';

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist, addToCart } = useAppContext();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="product-card">
      <div className="product-img-wrap" onClick={() => window.location.href = `/product/${product.id}`}>
        <img src={`/${product.image}`} alt={product.name} className="product-img" />
        
        {product.comingSoon ? (
          <div className="product-badge badge-sale" style={{ background: '#555' }}>COMING SOON</div>
        ) : (
          product.isNewArrival && <div className="product-badge">NEW</div>
        )}

        <button 
          className={`wishlist-btn ${inWishlist ? 'active' : ''}`} 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
        >
          <svg viewBox="0 0 24 24" fill={inWishlist ? 'var(--black)' : 'none'} stroke="currentColor" strokeWidth="1.5" width="18" height="18">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        {product.comingSoon ? (
          <div className="product-quick-add" style={{ background: '#888', cursor: 'not-allowed' }} onClick={(e) => e.stopPropagation()}>
            COMING SOON
          </div>
        ) : (
          <div className="product-quick-add" onClick={(e) => { e.stopPropagation(); addToCart(product, product.sizes[0]); }}>
            ADD TO CART
          </div>
        )}
      </div>
      
      <div className="product-info" onClick={() => window.location.href = `/product/${product.id}`}>
        <p className="product-name">{product.name}</p>
        <div className="product-price-row">
          <p className="product-price">₹{product.price}</p>
          <p className="product-mrp">₹{product.mrp}</p>
          <span className="product-discount">{product.discount}</span>
        </div>
        <div className="product-sizes">
          {product.sizes.map((s, idx) => <span key={idx}>{s}</span>)}
        </div>
      </div>
    </div>
  );
}
