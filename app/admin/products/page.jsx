"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { products as initialProducts } from '@/lib/products';

export default function AdminProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedItems, setSelectedItems] = useState([]);

  // Mock stats
  const stats = [
    { label: 'Total Products', value: '156', sub: 'All products', icon: 'box' },
    { label: 'Active Products', value: '128', sub: 'Currently active', icon: 'tshirt' },
    { label: 'Out of Stock', value: '8', sub: 'Not available', icon: 'eye' },
    { label: 'Low Stock', value: '20', sub: 'Stock running low', icon: 'tag' },
  ];

  const getStatusStyle = (status) => {
    const styles = {
      Active: { bg: '#eefcf5', color: '#10b981' },
      'Low Stock': { bg: '#fff7ed', color: '#f97316' },
      'Out of Stock': { bg: '#fef2f2', color: '#ef4444' },
    };
    const s = styles[status] || styles.Active;
    return {
      padding: '4px 12px',
      borderRadius: '8px',
      fontSize: '11px',
      fontWeight: '700',
      backgroundColor: s.bg,
      color: s.color,
      display: 'inline-block'
    };
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '24px',
    border: '1px solid #f0f0f0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
  };

  const tableHeaderStyle = {
    textAlign: 'left',
    padding: '16px 20px',
    fontSize: '11px',
    fontWeight: '800',
    color: '#000',
    textTransform: 'none',
    borderBottom: '1px solid #f0f0f0'
  };

  const tableCellStyle = {
    padding: '20px',
    fontSize: '13px',
    color: '#000',
    borderBottom: '1px solid #f9f9f9'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#000', margin: 0 }}>Products</h1>
          <p style={{ fontSize: '13px', color: '#999', marginTop: '5px', fontWeight: '500' }}>
            Dashboard &nbsp; <span style={{ color: '#ccc' }}>&gt;</span> &nbsp; Products
          </p>
        </div>
        <Link 
          href="/admin/products/add"
          style={{ 
            backgroundColor: '#000', 
            color: '#fff', 
            border: 'none', 
            padding: '12px 24px', 
            borderRadius: '12px', 
            fontSize: '14px', 
            fontWeight: '700', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none'
          }}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add New Product
        </Link>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#f5f5f5', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon === 'box' && <svg width="22" height="22" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
                {stat.icon === 'tshirt' && <svg width="22" height="22" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>}
                {stat.icon === 'eye' && <svg width="22" height="22" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                {stat.icon === 'tag' && <svg width="22" height="22" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: '#999', fontWeight: '600' }}>{stat.label}</p>
                <h3 style={{ margin: '2px 0', fontSize: '22px', fontWeight: '800' }}>{stat.value}</h3>
                <p style={{ margin: 0, fontSize: '10px', color: '#bbb', fontWeight: '500' }}>{stat.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <div style={{ 
          flex: 1, 
          backgroundColor: '#fff', 
          border: '1px solid #f0f0f0', 
          borderRadius: '12px', 
          padding: '10px 16px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px' 
        }}>
          <svg width="18" height="18" fill="none" stroke="#999" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input 
            type="text" 
            placeholder="Search products by name..." 
            style={{ border: 'none', outline: 'none', fontSize: '14px', width: '100%', background: 'none' }} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '600', color: '#000', outline: 'none', width: '200px' }}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option>All Categories</option>
        </select>
        <select 
          style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '600', color: '#000', outline: 'none', width: '200px' }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
        </select>
        <button style={{ 
          backgroundColor: '#fff', 
          border: '1px solid #f0f0f0', 
          padding: '10px 20px', 
          borderRadius: '12px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          fontSize: '13px', 
          fontWeight: '600', 
          cursor: 'pointer' 
        }}>
          <svg width="16" height="16" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          Filters
        </button>
      </div>

      {/* Table Section */}
      <div style={{ ...cardStyle, padding: '0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#fafafa' }}>
                <th style={{ ...tableHeaderStyle, width: '50px' }}>
                  <input type="checkbox" style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                </th>
                <th style={tableHeaderStyle}>Product</th>
                <th style={tableHeaderStyle}>Category</th>
                <th style={tableHeaderStyle}>Price</th>
                <th style={tableHeaderStyle}>Stock</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Created At</th>
                <th style={{ ...tableHeaderStyle, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'SoulFit Oversized T-Shirt', sku: 'SF-TS-001', category: 'T-Shirts', price: '₹1,299', stock: 432, status: 'Active', date: '20 May 2024', image: 'https://placehold.co/40x40?text=T' },
                { name: 'SoulFit Tank Top', sku: 'SF-TT-002', category: 'Tank Tops', price: '₹899', stock: 321, status: 'Active', date: '19 May 2024', image: 'https://placehold.co/40x40?text=S' },
                { name: 'SoulFit Hoodie', sku: 'SF-HD-003', category: 'Hoodies', price: '₹1,999', stock: 278, status: 'Active', date: '18 May 2024', image: 'https://placehold.co/40x40?text=H' },
                { name: 'SoulFit Track Pants', sku: 'SF-TP-004', category: 'Track Pants', price: '₹1,499', stock: 187, status: 'Low Stock', date: '17 May 2024', image: 'https://placehold.co/40x40?text=P' },
                { name: 'SoulFit Cap', sku: 'SF-CAP-005', category: 'Accessories', price: '₹499', stock: 65, status: 'Out of Stock', date: '16 May 2024', image: 'https://placehold.co/40x40?text=C' },
              ].map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f9f9f9' }}>
                  <td style={tableCellStyle}>
                    <input type="checkbox" style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                  </td>
                  <td style={tableCellStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <img src={p.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }} />
                      <div>
                        <p style={{ margin: 0, fontWeight: '700', color: '#000' }}>{p.name}</p>
                        <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#999', fontWeight: '500' }}>SKU: {p.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ ...tableCellStyle, fontWeight: '600', color: '#444' }}>{p.category}</td>
                  <td style={{ ...tableCellStyle, fontWeight: '800' }}>{p.price}</td>
                  <td style={{ ...tableCellStyle, fontWeight: '700', color: '#666' }}>{p.stock}</td>
                  <td style={tableCellStyle}>
                    <span style={getStatusStyle(p.status)}>{p.status}</span>
                  </td>
                  <td style={{ ...tableCellStyle, fontSize: '12px', color: '#666', fontWeight: '600' }}>{p.date}</td>
                  <td style={{ ...tableCellStyle, textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      <button style={{ background: '#f5f5f5', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: '#000' }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button style={{ background: '#fef2f2', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: '#ef4444' }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination & Footer */}
        <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: '#999', fontWeight: '600' }}>Showing 1 to 5 of 156 products</span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button style={{ background: '#fff', border: '1px solid #f0f0f0', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="14" height="14" fill="none" stroke="#666" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            {[1, 2, 3, '...', 16].map((n, i) => (
              <button 
                key={i} 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '8px', 
                  border: 'none', 
                  backgroundColor: n === 1 ? '#000' : 'transparent', 
                  color: n === 1 ? '#fff' : '#666', 
                  fontSize: '13px', 
                  fontWeight: '700', 
                  cursor: 'pointer' 
                }}
              >
                {n}
              </button>
            ))}
            <button style={{ background: '#fff', border: '1px solid #f0f0f0', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="14" height="14" fill="none" stroke="#666" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
