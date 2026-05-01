"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminCoupons() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [typeFilter, setTypeFilter] = useState('All Types');

  const stats = [
    { label: 'Total Coupons', value: '28', sub: 'All coupons', icon: 'coupon' },
    { label: 'Active Coupons', value: '18', sub: 'Currently active', icon: 'check' },
    { label: 'Scheduled', value: '3', sub: 'Not started yet', icon: 'clock' },
    { label: 'Expired Coupons', value: '7', sub: 'No longer valid', icon: 'x' },
    { label: 'Total Usage', value: '1,245', sub: 'All coupons', icon: 'tag' },
  ];

  const coupons = [
    { code: 'SOUL10', name: 'SoulFit 10% OFF', sub: 'Flat 10% off on all orders', discount: '10%', type: 'Percentage', min: '₹999', usage: 234, limit: 1000, from: '20 May 2024', to: '20 Jun 2024', status: 'Active' },
    { code: 'WELCOME20', name: 'Welcome 20% OFF', sub: 'Flat 20% off for new users', discount: '20%', type: 'Percentage', min: '₹799', usage: 150, limit: 500, from: '15 May 2024', to: '15 Jun 2024', status: 'Active' },
    { code: 'FREESHIP', name: 'Free Shipping', sub: 'Free shipping on all orders', discount: '-', type: 'Free Shipping', min: '₹0', usage: 455, limit: 2000, from: '10 May 2024', to: '30 Jun 2024', status: 'Active' },
    { code: 'SUMMER15', name: 'Summer Special 15% OFF', sub: 'Get 15% off on summer collection', discount: '15%', type: 'Percentage', min: '₹1299', usage: 87, limit: 300, from: '01 May 2024', to: '31 May 2024', status: 'Scheduled' },
    { code: 'FLAT100', name: 'Flat ₹100 OFF', sub: 'Flat ₹100 off on min ₹1999', discount: '₹100', type: 'Flat Amount', min: '₹1999', usage: 65, limit: 200, from: '25 May 2024', to: '25 Jun 2024', status: 'Expired' },
    { code: 'NEWUSER5', name: 'New User 5% OFF', sub: 'Extra 5% off for new users', discount: '5%', type: 'Percentage', min: '₹499', usage: 312, limit: 1000, from: '01 Apr 2024', to: '01 May 2024', status: 'Expired' },
  ];

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '24px',
    border: '1px solid #f0f0f0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
  };

  const getTypeStyle = (type) => {
    const styles = {
      'Percentage': { bg: '#eefcf5', color: '#10b981' },
      'Free Shipping': { bg: '#eff6ff', color: '#3b82f6' },
      'Flat Amount': { bg: '#f5f3ff', color: '#8b5cf6' },
    };
    const s = styles[type] || styles.Percentage;
    return {
      padding: '4px 10px',
      borderRadius: '8px',
      fontSize: '10px',
      fontWeight: '700',
      backgroundColor: s.bg,
      color: s.color,
      display: 'inline-block'
    };
  };

  const getStatusStyle = (status) => {
    const styles = {
      'Active': { bg: '#eefcf5', color: '#10b981' },
      'Scheduled': { bg: '#fff7ed', color: '#f97316' },
      'Expired': { bg: '#fef2f2', color: '#ef4444' },
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

  const tableHeaderStyle = {
    textAlign: 'left',
    padding: '16px 20px',
    fontSize: '11px',
    fontWeight: '800',
    color: '#000',
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
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#000', margin: 0 }}>Coupons</h1>
          <p style={{ fontSize: '13px', color: '#999', marginTop: '5px', fontWeight: '500' }}>
            Dashboard &nbsp; <span style={{ color: '#ccc' }}>&gt;</span> &nbsp; Coupons
          </p>
        </div>
        <Link 
          href="/admin/coupons/add"
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
          Add New Coupon
        </Link>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#f5f5f5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon === 'coupon' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3.28a1 1 0 01-.684.948l-.316.105a1 1 0 000 1.894l.316.105a1 1 0 01.684.948V17a2 2 0 002 2h14a2 2 0 002-2v-3.28a1 1 0 01.684-.948l.316-.105a1 1 0 000-1.894l-.316-.105a1 1 0 01-.684-.948V7a2 2 0 00-2-2H5z" /></svg>}
                {stat.icon === 'check' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                {stat.icon === 'clock' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                {stat.icon === 'x' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                {stat.icon === 'tag' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '11px', color: '#999', fontWeight: '600' }}>{stat.label}</p>
                <h3 style={{ margin: '2px 0', fontSize: '20px', fontWeight: '800' }}>{stat.value}</h3>
                <p style={{ margin: 0, fontSize: '9px', color: '#bbb', fontWeight: '600' }}>{stat.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <div style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #f0f0f0', borderRadius: '12px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="18" height="18" fill="none" stroke="#999" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search by coupon code or name..." style={{ border: 'none', outline: 'none', fontSize: '14px', width: '100%', background: 'none' }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <select style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '600', color: '#000', outline: 'none', width: '180px' }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All Status</option>
        </select>
        <select style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '600', color: '#000', outline: 'none', width: '180px' }} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option>All Types</option>
        </select>
        <div style={{ position: 'relative' }}>
          <input type="text" placeholder="Select Date Range" style={{ padding: '10px 40px 10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '600', color: '#000', outline: 'none', width: '220px' }} readOnly />
          <svg width="16" height="16" fill="none" stroke="#999" strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)' }}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
        <button style={{ backgroundColor: '#fff', border: '1px solid #f0f0f0', padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
          <svg width="16" height="16" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          Filters
        </button>
        <button style={{ background: '#fff', border: '1px solid #f0f0f0', padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Reset</button>
      </div>

      {/* Table Section */}
      <div style={{ ...cardStyle, padding: '0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#fafafa' }}>
                <th style={tableHeaderStyle}>Coupon Code</th>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Discount</th>
                <th style={tableHeaderStyle}>Type</th>
                <th style={tableHeaderStyle}>Min. Order</th>
                <th style={tableHeaderStyle}>Usage / Limit</th>
                <th style={tableHeaderStyle}>Valid From</th>
                <th style={tableHeaderStyle}>Valid To</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={{ ...tableHeaderStyle, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f9f9f9' }}>
                  <td style={tableCellStyle}>
                    <span style={{ 
                      backgroundColor: '#fafafa', 
                      padding: '8px 12px', 
                      borderRadius: '8px', 
                      border: '1px solid #eee', 
                      fontWeight: '800', 
                      fontSize: '12px',
                      color: '#000'
                    }}>{c.code}</span>
                  </td>
                  <td style={tableCellStyle}>
                    <p style={{ margin: 0, fontWeight: '700', color: '#000' }}>{c.name}</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#999', fontWeight: '500' }}>{c.sub}</p>
                  </td>
                  <td style={{ ...tableCellStyle, fontWeight: '800' }}>{c.discount}</td>
                  <td style={tableCellStyle}><span style={getTypeStyle(c.type)}>{c.type}</span></td>
                  <td style={{ ...tableCellStyle, fontWeight: '700', color: '#444' }}>{c.min}</td>
                  <td style={tableCellStyle}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '120px' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '700' }}>
                          <span>{c.usage} / {c.limit}</span>
                       </div>
                       <div style={{ width: '100%', height: '5px', backgroundColor: '#f0f0f0', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${(c.usage / c.limit) * 100}%`, height: '100%', backgroundColor: '#10b981', borderRadius: '3px' }}></div>
                       </div>
                    </div>
                  </td>
                  <td style={{ ...tableCellStyle, fontSize: '12px', color: '#666', fontWeight: '600' }}>{c.from}</td>
                  <td style={{ ...tableCellStyle, fontSize: '12px', color: '#666', fontWeight: '600' }}>{c.to}</td>
                  <td style={tableCellStyle}><span style={getStatusStyle(c.status)}>{c.status}</span></td>
                  <td style={{ ...tableCellStyle, textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button style={{ background: '#f5f5f5', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
                        <svg width="16" height="16" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button style={{ background: '#f5f5f5', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
                        <svg width="16" height="16" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 012 2h8a2 2 0 012-2v-2" /></svg>
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
        
        <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: '#999', fontWeight: '600' }}>Showing 1 to 6 of 28 coupons</span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button style={{ background: '#fff', border: '1px solid #f0f0f0', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="14" height="14" fill="none" stroke="#666" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            {[1, 2, 3, '...', 5].map((n, i) => (
              <button key={i} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', backgroundColor: n === 1 ? '#000' : 'transparent', color: n === 1 ? '#fff' : '#666', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>{n}</button>
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
