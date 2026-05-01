"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    subCategory: '',
    description: '',
    price: '',
    comparePrice: '',
    costPrice: '',
    stockQuantity: '',
    lowStockAlert: '',
    stockStatus: 'In Stock',
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    isActive: true,
    metaTitle: '',
    metaDescription: ''
  });

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '30px',
    border: '1px solid #f0f0f0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
    marginBottom: '30px'
  };

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '700',
    color: '#000',
    marginBottom: '10px',
    display: 'block'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid #f0f0f0',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#fafafa',
    transition: 'all 0.2s',
    boxSizing: 'border-box'
  };

  const toggleStyle = (active) => ({
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    backgroundColor: active ? '#000' : '#e2e8f0',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.2s'
  });

  const toggleCircleStyle = (active) => ({
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: '3px',
    left: active ? '23px' : '3px',
    transition: 'all 0.2s'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#000', margin: 0 }}>Add New Product</h1>
          <p style={{ fontSize: '13px', color: '#999', marginTop: '5px', fontWeight: '500' }}>
            Dashboard &nbsp; <span style={{ color: '#ccc' }}>&gt;</span> &nbsp; Products &nbsp; <span style={{ color: '#ccc' }}>&gt;</span> &nbsp; Add New Product
          </p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link href="/admin/products" style={{ 
            backgroundColor: '#f5f1ed', 
            color: '#000', 
            textDecoration: 'none',
            padding: '12px 30px', 
            borderRadius: '12px', 
            fontSize: '14px', 
            fontWeight: '700'
          }}>Cancel</Link>
          <button style={{ 
            backgroundColor: '#000', 
            color: '#fff', 
            border: 'none', 
            padding: '12px 30px', 
            borderRadius: '12px', 
            fontSize: '14px', 
            fontWeight: '700', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
            Save Product
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: '30px', alignItems: 'start' }}>
        {/* Left Column: Form Sections */}
        <div>
          {/* Product Information */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Product Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Product Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" placeholder="Enter product name" style={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>SKU (Stock Keeping Unit) <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" placeholder="Enter SKU (e.g. SF-TS-001)" style={inputStyle} value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Category <span style={{ color: '#ef4444' }}>*</span></label>
                <select style={inputStyle} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option>Select category</option>
                  <option>T-shirt</option>
                  <option>Hoodie</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Sub Category</label>
                <select style={inputStyle} value={formData.subCategory} onChange={e => setFormData({...formData, subCategory: e.target.value})}>
                  <option>Select sub category</option>
                </select>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Description <span style={{ color: '#ef4444' }}>*</span></label>
              <div style={{ border: '1px solid #f0f0f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#fafafa', padding: '10px 15px', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: '15px' }}>
                  <span style={{ fontWeight: '800', cursor: 'pointer' }}>B</span>
                  <span style={{ fontStyle: 'italic', cursor: 'pointer' }}>I</span>
                  <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>U</span>
                  <div style={{ width: '1px', height: '20px', backgroundColor: '#e2e8f0' }}></div>
                  <span style={{ cursor: 'pointer' }}>≡</span>
                  <span style={{ cursor: 'pointer' }}>≡</span>
                  <div style={{ width: '1px', height: '20px', backgroundColor: '#e2e8f0' }}></div>
                  <span style={{ cursor: 'pointer' }}>🔗</span>
                </div>
                <textarea rows="6" placeholder="Write product description here..." style={{ ...inputStyle, border: 'none', borderRadius: '0', backgroundColor: '#fff', resize: 'none' }} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>
              <p style={{ margin: '8px 0 0 0', textAlign: 'right', fontSize: '11px', color: '#bbb', fontWeight: '600' }}>{formData.description.length}/1000</p>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Pricing & Stock</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Price (₹) <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="number" placeholder="Enter price" style={inputStyle} value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Compare Price (₹)</label>
                <input type="number" placeholder="Enter compare price (optional)" style={inputStyle} value={formData.comparePrice} onChange={e => setFormData({...formData, comparePrice: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Cost Price (₹)</label>
                <input type="number" placeholder="Enter cost price (optional)" style={inputStyle} value={formData.costPrice} onChange={e => setFormData({...formData, costPrice: e.target.value})} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Stock Quantity <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="number" placeholder="Enter stock quantity" style={inputStyle} value={formData.stockQuantity} onChange={e => setFormData({...formData, stockQuantity: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Low Stock Alert</label>
                <input type="number" placeholder="Enter low stock alert" style={inputStyle} value={formData.lowStockAlert} onChange={e => setFormData({...formData, lowStockAlert: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Stock Status</label>
                <select style={inputStyle} value={formData.stockStatus} onChange={e => setFormData({...formData, stockStatus: e.target.value})}>
                  <option>In Stock</option>
                  <option>Out of Stock</option>
                  <option>On Backorder</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Product Images</h3>
            <div style={{ border: '2px dashed #f0f0f0', borderRadius: '20px', padding: '50px', textAlign: 'center', backgroundColor: '#fafafa' }}>
              <svg width="40" height="40" fill="none" stroke="#999" strokeWidth="2" viewBox="0 0 24 24" style={{ marginBottom: '15px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#666' }}>Drag & drop images here</p>
              <p style={{ margin: '5px 0 20px', fontSize: '12px', color: '#bbb', fontWeight: '600' }}>or</p>
              <button style={{ backgroundColor: '#f5f1ed', border: 'none', padding: '10px 25px', borderRadius: '10px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>Upload Images</button>
              <p style={{ margin: '20px 0 0', fontSize: '10px', color: '#bbb', fontWeight: '600' }}>JPG, PNG, WEBP up to 5MB</p>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Options */}
        <div>
          {/* Product Preview */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Product Preview</h3>
            <div style={{ border: '1px solid #f0f0f0', borderRadius: '20px', padding: '20px', backgroundColor: '#fafafa' }}>
              <div style={{ 
                aspectRatio: '1/1', 
                backgroundColor: '#fff', 
                borderRadius: '15px', 
                marginBottom: '15px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '1px dashed #eee'
              }}>
                <svg width="60" height="60" fill="none" stroke="#eee" strokeWidth="1" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
              </div>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>{formData.name || 'Product Title'}</h4>
              <p style={{ margin: '2px 0 15px', fontSize: '12px', color: '#999', fontWeight: '600' }}>{formData.category || 'Category'}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: '900' }}>₹{formData.price || '0'}</span>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#10b981', backgroundColor: '#eefcf5', padding: '4px 8px', borderRadius: '6px' }}>In Stock</span>
              </div>
            </div>
          </div>

          {/* Product Options */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Product Options</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: 'Featured Product', sub: 'Display on homepage', key: 'isFeatured' },
                { label: 'New Arrival', sub: 'Show as new arrival', key: 'isNewArrival' },
                { label: 'Best Seller', sub: 'Mark as best seller', key: 'isBestSeller' },
                { label: 'Active Product', sub: 'Product will be visible', key: 'isActive' }
              ].map(opt => (
                <div key={opt.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: '700' }}>{opt.label}</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#999', fontWeight: '500' }}>{opt.sub}</p>
                  </div>
                  <div 
                    style={toggleStyle(formData[opt.key])} 
                    onClick={() => setFormData({...formData, [opt.key]: !formData[opt.key]})}
                  >
                    <div style={toggleCircleStyle(formData[opt.key])}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meta Information */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Meta Information</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Meta Title</label>
              <input type="text" placeholder="Enter meta title" style={inputStyle} value={formData.metaTitle} onChange={e => setFormData({...formData, metaTitle: e.target.value})} />
            </div>
            <div>
              <label style={labelStyle}>Meta Description</label>
              <textarea rows="4" placeholder="Enter meta description" style={{ ...inputStyle, resize: 'none' }} value={formData.metaDescription} onChange={e => setFormData({...formData, metaDescription: e.target.value})}></textarea>
              <p style={{ margin: '8px 0 0 0', textAlign: 'right', fontSize: '11px', color: '#bbb', fontWeight: '600' }}>{formData.metaDescription.length}/160</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
