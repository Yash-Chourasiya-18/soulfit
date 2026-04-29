"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../../components/ProductCard';
import { products } from '../../lib/products';

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
    filtered = filtered.sort((a, b) => b.salesCount - a.salesCount).slice(0, 4);
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
    <div className="container" style={{ paddingTop: '30px', minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <h2 className="section-title" style={{ margin: 0 }}>Shop Collection</h2>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search..." 
            className="input-field" 
            style={{ width: '200px', padding: '8px 12px' }} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select 
            className="input-field" 
            style={{ width: 'auto', padding: '8px 12px' }}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="filter-strip">
        <button className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`} onClick={() => setCurrentFilter('all')}>All</button>
        <span className="filter-sep">|</span>
        <button className={`filter-btn ${currentFilter === 'T-shirt' ? 'active' : ''}`} onClick={() => setCurrentFilter('T-shirt')}>T-Shirts</button>
        <button className={`filter-btn ${currentFilter === 'Polo T-Shirts' ? 'active' : ''}`} onClick={() => setCurrentFilter('Polo T-Shirts')}>Polo</button>
        <button className={`filter-btn ${currentFilter === 'Normal Cotton T-Shirts' ? 'active' : ''}`} onClick={() => setCurrentFilter('Normal Cotton T-Shirts')}>Cotton Tee</button>
        <span className="filter-sep">|</span>
        <button className={`filter-btn ${currentFilter === 'Shirt' ? 'active' : ''}`} onClick={() => setCurrentFilter('Shirt')}>Shirts</button>
        <button className={`filter-btn ${currentFilter === 'Printed Shirts' ? 'active' : ''}`} onClick={() => setCurrentFilter('Printed Shirts')}>Printed</button>
        <button className={`filter-btn ${currentFilter === 'Formal Shirts' ? 'active' : ''}`} onClick={() => setCurrentFilter('Formal Shirts')}>Formal</button>
        <span className="filter-sep">|</span>
        <button className={`filter-btn ${currentFilter === 'Pant' ? 'active' : ''}`} onClick={() => setCurrentFilter('Pant')}>Track Pants</button>
        <span className="filter-sep">|</span>
        <button className={`filter-btn ${currentFilter === 'Cargo' ? 'active' : ''}`} onClick={() => setCurrentFilter('Cargo')}>Cargo <span className="cs-badge">Soon</span></button>
      </div>

      <div className="products-grid">
        {filtered.length === 0 ? <p>No products found.</p> : 
          filtered.map(p => <ProductCard key={p.id} product={p} />)
        }
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container" style={{ paddingTop: '30px' }}><p>Loading Shop...</p></div>}>
      <ShopContent />
    </Suspense>
  );
}
