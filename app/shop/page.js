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

  const [currentCategory, setCurrentCategory] = useState(initCategory);
  const [sortOrder, setSortOrder] = useState('default');
  const [searchQuery, setSearchQuery] = useState(searchQ);

  useEffect(() => {
    if (initCategory) setCurrentCategory(initCategory);
  }, [initCategory]);

  let filtered = [...products];

  // Category Filter
  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory || p.subcategory === currentCategory);
  }

  // New Arrivals Filter
  if (initFilter === 'new_arrivals') {
    filtered = filtered.filter(p => p.isNewArrival);
  }

  // Search Filter
  if (searchQuery) {
    const sq = searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(sq) || 
      p.category.toLowerCase().includes(sq)
    );
  }

  // Sorting
  if (sortOrder === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  }

  const categories = ['all', 'Shirt', 'T-shirt', 'Pant', 'Cargo', 'Hoodie'];

  return (
    <div className="container" style={{ paddingTop: '40px', background: '#fff' }}>
      {/* ── HEADER ── */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '4px', color: '#999', marginBottom: '12px' }}>Collection</h1>
        <h2 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase' }}>{currentCategory === 'all' ? 'All Products' : currentCategory}</h2>
      </div>

      {/* ── TOP BAR (Minimal) ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setCurrentCategory(cat)}
              style={{ 
                background: 'none', border: 'none', fontSize: '13px', fontWeight: 700, 
                textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer',
                color: currentCategory === cat ? '#000' : '#999',
                borderBottom: currentCategory === cat ? '2px solid #000' : '2px solid transparent',
                paddingBottom: '10px', transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ border: 'none', background: 'none', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', outline: 'none', cursor: 'pointer' }}
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* ── PRODUCTS GRID ── */}
      <div className="products-grid">
        {filtered.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px 0' }}>
            <p style={{ color: '#999' }}>No products found</p>
          </div>
        ) : (
          filtered.map(p => <ProductCard key={p.id} product={p} />)
        )}
      </div>

      <style jsx>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container" style={{ paddingTop: '80px', textAlign: 'center' }}><p>Loading...</p></div>}>
      <ShopContent />
    </Suspense>
  );
}
