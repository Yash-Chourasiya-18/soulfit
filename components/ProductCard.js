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
      <div className="product-img-container" onClick={handleNavigate}>
        <img 
          src={`/${product.image}`} 
          alt={product.name} 
          className="product-img-card" 
        />
        
        <button 
          className={`card-wishlist ${inWishlist ? 'active' : ''}`} 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
        >
          <svg viewBox="0 0 24 24" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>
      
      <div className="product-info-card">
        <div style={{ cursor: 'pointer' }} onClick={handleNavigate}>
          <h3 className="product-name-card">{product.name}</h3>
          <p className="product-price-card">₹{product.price}</p>
        </div>
        
        {!product.comingSoon && (
          <button 
            className="add-to-cart-premium" 
            onClick={(e) => { e.stopPropagation(); addToCart(product, product.sizes[0], 1); }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
