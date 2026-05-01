"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminBanners() {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('All Positions');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const stats = [
    { label: 'Total Banners', value: '16', sub: 'All banners', icon: 'image' },
    { label: 'Active Banners', value: '12', sub: 'Currently active', icon: 'check' },
    { label: 'Scheduled Banners', value: '2', sub: 'Upcoming', icon: 'clock' },
    { label: 'Inactive Banners', value: '2', sub: 'Not visible', icon: 'x' },
  ];

  const banners = [
    { title: 'New Collection Summer 2024', sub: 'Explore our latest summer collection', pos: 'HERO', priority: 1, status: 'Active', start: '10 May 2024', end: '10 Jun 2024', img: 'https://placehold.co/100x60?text=Summer' },
    { title: 'Flat 30% Off On All Orders', sub: 'Limited time offer', pos: 'OFFER', priority: 2, status: 'Active', start: '05 May 2024', end: '25 May 2024', img: 'https://placehold.co/100x60?text=Offer' },
    { title: 'Men Activewear', sub: 'Best performance & comfort', pos: 'CATEGORY', priority: 3, status: 'Active', start: '01 May 2024', end: '31 May 2024', img: 'https://placehold.co/100x60?text=Men' },
    { title: 'Women Collection', sub: 'Stylish. Strong. SoulFit', pos: 'CATEGORY', priority: 4, status: 'Scheduled', start: '20 May 2024', end: '20 Jun 2024', img: 'https://placehold.co/100x60?text=Women' },
    { title: 'Free Shipping', sub: 'On orders above ₹999', pos: 'OFFER', priority: 5, status: 'Inactive', start: '01 Apr 2024', end: '30 Apr 2024', img: 'https://placehold.co/100x60?text=Shipping' },
    { title: 'Join The Movement', sub: 'Be a part of SoulFit community', pos: 'HERO', priority: 6, status: 'Active', start: '15 May 2024', end: '15 Jun 2024', img: 'https://placehold.co/100x60?text=Join' },
  ];

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '24px',
    border: '1px solid #f0f0f0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
  };

  const getPosStyle = (pos) => {
    const styles = {
      HERO: { bg: '#f5f3ff', color: '#8b5cf6' },
      OFFER: { bg: '#fff7ed', color: '#f97316' },
      CATEGORY: { bg: '#eff6ff', color: '#3b82f6' },
    };
    const s = styles[pos] || styles.HERO;
    return {
      padding: '4px 10px',
      borderRadius: '8px',
      fontSize: '10px',
      fontWeight: '700',
      backgroundColor: s.bg,
      color: s.color,
    };
  };

  const getStatusStyle = (status) => {
    const active = status === 'Active';
    const scheduled = status === 'Scheduled';
    const color = active ? '#10b981' : (scheduled ? '#f97316' : '#ef4444');
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: color }}></div>
        <span style={{ fontSize: '12px', fontWeight: '600', color: color }}>{status}</span>
      </div>
    );
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
    padding: '16px 20px',
    fontSize: '13px',
    color: '#000',
    borderBottom: '1px solid #f9f9f9'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#000', margin: 0 }}>Banner Management</h1>
          <p style={{ fontSize: '13px', color: '#999', marginTop: '5px', fontWeight: '500' }}>
            Dashboard &nbsp; <span style={{ color: '#ccc' }}>&gt;</span> &nbsp; Banners
          </p>
        </div>
        <button style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add New Banner
        </button>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#f5f5f5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon === 'image' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                {stat.icon === 'check' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                {stat.icon === 'clock' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                {stat.icon === 'x' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>}
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

      {/* Main Content Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '20px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Filters */}
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #f0f0f0', borderRadius: '12px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <svg width="18" height="18" fill="none" stroke="#999" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" placeholder="Search banners by title..." style={{ border: 'none', outline: 'none', fontSize: '14px', width: '100%', background: 'none' }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <select style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '600', color: '#000', outline: 'none', width: '160px' }} value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)}>
              <option>All Positions</option>
            </select>
            <select style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '600', color: '#000', outline: 'none', width: '160px' }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>All Status</option>
            </select>
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="Select Date Range" style={{ padding: '10px 40px 10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '600', color: '#000', outline: 'none', width: '200px' }} readOnly />
              <svg width="16" height="16" fill="none" stroke="#999" strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)' }}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <button style={{ backgroundColor: '#fff', border: '1px solid #f0f0f0', padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
              <svg width="16" height="16" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              Filters
            </button>
            <button style={{ color: '#e2a77f', background: 'none', border: 'none', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>Reset</button>
          </div>

          {/* Table */}
          <div style={{ ...cardStyle, padding: '0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#fafafa' }}>
                  <th style={tableHeaderStyle}>Banner</th>
                  <th style={tableHeaderStyle}>Title</th>
                  <th style={tableHeaderStyle}>Position</th>
                  <th style={tableHeaderStyle}>Priority</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={tableHeaderStyle}>Start Date</th>
                  <th style={tableHeaderStyle}>End Date</th>
                  <th style={{ ...tableHeaderStyle, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((b, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f9f9f9' }}>
                    <td style={tableCellStyle}>
                      <img src={b.img} alt="" style={{ width: '100px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
                    </td>
                    <td style={tableCellStyle}>
                      <p style={{ margin: 0, fontWeight: '700', color: '#000' }}>{b.title}</p>
                      <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#999', fontWeight: '500' }}>{b.sub}</p>
                    </td>
                    <td style={tableCellStyle}><span style={getPosStyle(b.pos)}>{b.pos}</span></td>
                    <td style={{ ...tableCellStyle, fontWeight: '800' }}>{b.priority}</td>
                    <td style={tableCellStyle}>{getStatusStyle(b.status)}</td>
                    <td style={{ ...tableCellStyle, fontSize: '12px', color: '#666', fontWeight: '600' }}>{b.start}</td>
                    <td style={{ ...tableCellStyle, fontSize: '12px', color: '#666', fontWeight: '600' }}>{b.end}</td>
                    <td style={{ ...tableCellStyle, textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button style={{ background: '#f5f5f5', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
                          <svg width="16" height="16" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button style={{ background: '#f5f5f5', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
                          <svg width="16" height="16" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
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
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <span style={{ fontSize: '13px', color: '#999', fontWeight: '600' }}>Showing 1 to 6 of 16 banners</span>
               <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button style={{ background: '#fff', border: '1px solid #f0f0f0', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <svg width="14" height="14" fill="none" stroke="#666" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', backgroundColor: '#000', color: '#fff', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>1</button>
                  <button style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: '#666', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>2</button>
                  <button style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: '#666', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>3</button>
                  <button style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: '#666', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>Next</button>
               </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Banner Preview */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '800' }}>Banner Preview</h3>
            <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '180px', marginBottom: '20px' }}>
               <img src="https://placehold.co/400x200?text=New+Collection" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{ margin: 0, color: '#fff', fontSize: '20px', fontWeight: '900', textTransform: 'uppercase' }}>New Collection</h4>
                  <p style={{ margin: '5px 0 15px 0', color: '#eee', fontSize: '12px' }}>Summer 2024</p>
                  <button style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '10px', fontSize: '11px', fontWeight: '800', width: 'fit-content' }}>SHOP NOW</button>
               </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               {[
                 { label: 'Position', value: 'HERO', color: '#000' },
                 { label: 'Status', value: 'Active', color: '#10b981' },
                 { label: 'Start Date', value: '10 May 2024', color: '#000' },
                 { label: 'End Date', value: '10 Jun 2024', color: '#000' },
                 { label: 'Priority', value: '1', color: '#000' },
                 { label: 'Link', value: '/collections/summer-2024', color: '#999' },
               ].map(row => (
                 <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700' }}>
                    <span style={{ color: '#999' }}>{row.label}</span>
                    <span style={{ color: row.color }}>{row.value}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Tips Card */}
          <div style={{ ...cardStyle, padding: '20px' }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', fontWeight: '800' }}>Tips</h4>
            <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: '12px', color: '#666', lineHeight: '1.8', fontWeight: '500' }}>
              <li>Use high quality images for better impact.</li>
              <li>Recommended size: 1920 x 600px.</li>
              <li>Set priority to control the display order.</li>
              <li>Inactive banners will not be displayed.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
