"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../../components/ProductCard';
import FilterSidebar from '../../components/FilterSidebar';
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

  const [sortOrder, setSortOrder] = useState('default');
  const [searchQuery, setSearchQuery] = useState(searchQ);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: initCategory,
    priceRange: 'all',
    sizes: [],
    inStockOnly: false
  });

  useEffect(() => {
    if (initFilter === 'new_arrivals') {
      setFilters(prev => ({ ...prev, category: 'all' })); // Reset category if it's new arrivals
      // Note: new_arrivals logic is handled below in filtering
    } else if (initCategory) {
      setFilters(prev => ({ ...prev, category: initCategory }));
    }
  }, [initCategory, initFilter]);

  // Combined Filtering Logic
  let filtered = [...products];

  // 1. Initial Logic from Params (Special filters)
  if (initFilter === 'new_arrivals') {
    filtered = filtered.filter(p => p.isNewArrival);
  } else if (initFilter === 'best_sellers') {
    filtered = filtered.sort((a, b) => b.salesCount - a.salesCount).slice(0, 8);
  }

  // 2. Sidebar Filters
  if (filters.category !== 'all') {
    filtered = filtered.filter(p => p.category === filters.category || p.subcategory === filters.category);
  }

  if (filters.priceRange !== 'all') {
    if (filters.priceRange === 'under-500') filtered = filtered.filter(p => p.price < 500);
    else if (filters.priceRange === '500-999') filtered = filtered.filter(p => p.price >= 500 && p.price <= 999);
    else if (filters.priceRange === '1000-1499') filtered = filtered.filter(p => p.price >= 1000 && p.price <= 1499);
    else if (filters.priceRange === 'above-1500') filtered = filtered.filter(p => p.price >= 1500);
  }

  if (filters.sizes.length > 0) {
    filtered = filtered.filter(p => p.sizes.some(s => filters.sizes.includes(s)));
  }

  if (filters.inStockOnly) {
    filtered = filtered.filter(p => p.inStock);
  }

  // 3. Search Query
  if (searchQuery) {
    const sq = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(sq) ||
      p.category.toLowerCase().includes(sq) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(sq))
    );
  }

  // 4. Sort Order
  if (sortOrder === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  }

  const activeFilterCount = 
    (filters.category !== 'all' ? 1 : 0) + 
    (filters.priceRange !== 'all' ? 1 : 0) + 
    (filters.sizes.length > 0 ? 1 : 0) + 
    (filters.inStockOnly ? 1 : 0);

  const clearAllFilters = () => {
    setFilters({ category: 'all', priceRange: 'all', sizes: [], inStockOnly: false });
    setIsFilterOpen(false);
  };

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
            <button className="shop-action-btn" onClick={() => setIsFilterOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" /></svg>
              Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
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
          <span className="shop-view-all" onClick={() => setFilters({ ...filters, category: 'all' })}>View All &gt;</span>
        </div>
        <div className="shop-cat-list">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className={`shop-cat-item ${filters.category === cat.id ? 'active' : ''}`} onClick={() => setFilters({ ...filters, category: cat.id })}>
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
          {filtered.length === 0 ? (
            <div className="no-results">
              <p>No products found matching your criteria.</p>
              <button className="filter-apply-btn" style={{ marginTop: '20px', width: 'auto', padding: '12px 32px' }} onClick={clearAllFilters}>Clear All Filters</button>
            </div>
          ) : (
            filtered.map(p => <ProductCard key={p.id} product={p} />)
          )}
        </div>
      </div>

      <FilterSidebar 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        filters={filters}
        onApply={(newFilters) => {
          setFilters(newFilters);
          setIsFilterOpen(false);
        }}
        onClear={clearAllFilters}
      />
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
