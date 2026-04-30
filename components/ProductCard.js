"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist, addToCart } = useAppContext();
  const inWishlist = isInWishlist(product.id);
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div className="product-card">
      <div className="product-img-wrap" onClick={handleNavigate}>
        <img src={`/${product.image}`} alt={product.name} className="product-img" />
        
        {product.comingSoon ? (
          <div className="product-badge" style={{ background: '#555' }}>SOON</div>
        ) : (
          product.isNewArrival && <div className="product-badge">New</div>
        )}

        <button 
          className={`wishlist-btn ${inWishlist ? 'active' : ''}`} 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
        >
          <svg viewBox="0 0 24 24" fill={inWishlist ? 'var(--black)' : 'none'} stroke="currentColor" strokeWidth="1.5" width="18" height="18">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>
      
      <div className="product-info-new">
        <div className="prod-meta" onClick={handleNavigate}>
          <p className="prod-name-new">{product.name}</p>
          <p className="prod-price-new">₹{product.price}</p>
        </div>
        {!product.comingSoon && (
          <button 
            className="prod-cart-btn" 
            onClick={(e) => { e.stopPropagation(); addToCart(product, product.sizes[0], 1); }} 
            title="Quick add to cart"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
