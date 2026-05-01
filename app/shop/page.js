"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../../components/ProductCard';
import { products } from '../../lib/products';
import './shop.css';

const CATEGORIES = [
  { id: 'T-shirt', name: 'T-Shirts', img: 'sf_tshirt.png' },
  { id: 'Shirt', name: 'Shirts', img: 'sf_shirt.png' },
  { id: 'Pant', name: 'Pants', img: 'sf_pant.png' },
  { id: 'Cargo', name: 'Cargos', img: 'sf_cargo.png' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initCategory = searchParams.get('category') || 'all';
  const initFilter = searchParams.get('filter') || '';
  const searchQ = searchParams.get('q') || '';

  const [currentFilter, setCurrentFilter] = useState(initCategory);
  const [sortOrder, setSortOrder] = useState('default');
  const [searchQuery, setSearchQuery] = useState(searchQ);

  useEffect(() => {
    if (initFilter === 'new_arrivals') setCurrentFilter('new_arrivals');
    else if (initCategory) setCurrentFilter(initCategory);
  }, [initCategory, initFilter]);

  let filtered = [...products];

  if (currentFilter === 'new_arrivals') {
    filtered = filtered.filter(p => p.isNewArrival);
  } else if (currentFilter === 'best_sellers') {
    filtered = filtered.sort((a, b) => b.salesCount - a.salesCount).slice(0, 8);
  } else if (currentFilter !== 'all') {
    filtered = filtered.filter(p => p.category === currentFilter || p.subcategory === currentFilter);
  }

  if (searchQuery) {
    const sq = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(sq) ||
      p.category.toLowerCase().includes(sq) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(sq))
    );
  }

  if (sortOrder === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="shop-page">
      <div className="container">
        <h1 className="shop-main-title">Shop</h1>

        {/* TOP BAR: Search & Filters */}
        <div className="shop-top-bar">
          <div className="shop-search-box">
            <svg className="shop-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              type="text"
              placeholder="Search for products, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="shop-actions">
            <button className="shop-action-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" /></svg>
              Filter
            </button>
            <select className="shop-sort-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* CATEGORIES CIRCLE LIST */}
        <div className="shop-section-header">
          <h3 className="shop-section-title">Categories</h3>
          <span className="shop-view-all" onClick={() => setCurrentFilter('all')}>View All &gt;</span>
        </div>
        <div className="shop-cat-list">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className={`shop-cat-item ${currentFilter === cat.id ? 'active' : ''}`} onClick={() => setCurrentFilter(cat.id)}>
              <div className="shop-cat-circle">
                <img src={`/${cat.img}`} alt={cat.name} />
              </div>
              <span className="shop-cat-name">{cat.name}</span>
            </div>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        <div className="shop-section-header" style={{ marginTop: '40px' }}>
          <h3 className="shop-section-title">All Products</h3>
          <span className="shop-prod-count">{filtered.length} Products</span>
        </div>

        <div className="shop-products-grid">
          {filtered.length === 0 ? <p className="no-results">No products found matching your criteria.</p> :
            filtered.map(p => <ProductCard key={p.id} product={p} />)
          }
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container" style={{ paddingTop: '80px' }}><p>Loading Shop...</p></div>}>
      <ShopContent />
    </Suspense>
  );
}
