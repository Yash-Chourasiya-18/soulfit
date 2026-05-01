"use client";

import React, { useEffect, useState } from 'react';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const PRICE_RANGES = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-500', label: 'Under ₹500' },
  { id: '500-999', label: '₹500 - ₹999' },
  { id: '1000-1499', label: '₹1000 - ₹1499' },
  { id: 'above-1500', label: 'Above ₹1500' }
];
const CATEGORIES = ['all', 'T-shirt', 'Shirt', 'Pant', 'Cargo'];

export default function FilterSidebar({ isOpen, onClose, filters, setFilters, onApply, onClear }) {
  const [tempFilters, setTempFilters] = useState(filters);

  // Sync temp filters when panel opens
  useEffect(() => {
    if (isOpen) {
      setTempFilters(filters);
    }
  }, [isOpen, filters]);

  const toggleSize = (size) => {
    setTempFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size) 
        ? prev.sizes.filter(s => s !== size) 
        : [...prev.sizes, size]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className={`filter-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className={`filter-panel ${isOpen ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="filter-header">
          <h3>Filters</h3>
          <button className="filter-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="filter-body">
          {/* CATEGORY */}
          <div className="filter-section">
            <h4>Category</h4>
            <div className="filter-options-grid">
              {CATEGORIES.map(cat => (
                <label key={cat} className="filter-radio-label">
                  <input 
                    type="radio" 
                    name="category" 
                    checked={tempFilters.category === cat}
                    onChange={() => setTempFilters({ ...tempFilters, category: cat })}
                  />
                  <span>{cat === 'all' ? 'All Categories' : cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* PRICE RANGE */}
          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="filter-options-grid">
              {PRICE_RANGES.map(range => (
                <label key={range.id} className="filter-radio-label">
                  <input 
                    type="radio" 
                    name="price" 
                    checked={tempFilters.priceRange === range.id}
                    onChange={() => setTempFilters({ ...tempFilters, priceRange: range.id })}
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* SIZES */}
          <div className="filter-section">
            <h4>Sizes</h4>
            <div className="size-chips">
              {SIZES.map(size => (
                <button 
                  key={size}
                  className={`size-chip ${tempFilters.sizes.includes(size) ? 'active' : ''}`}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* AVAILABILITY */}
          <div className="filter-section">
            <label className="filter-checkbox-label">
              <input 
                type="checkbox" 
                checked={tempFilters.inStockOnly}
                onChange={(e) => setTempFilters({ ...tempFilters, inStockOnly: e.target.checked })}
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </div>

        <div className="filter-footer">
          <button className="filter-clear-btn" onClick={() => {
            const cleared = { category: 'all', priceRange: 'all', sizes: [], inStockOnly: false };
            setTempFilters(cleared);
            onClear();
          }}>Clear All</button>
          <button className="filter-apply-btn" onClick={() => onApply(tempFilters)}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
}
