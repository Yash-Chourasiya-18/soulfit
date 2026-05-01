"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminReviews() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All Ratings');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const stats = [
    { label: 'Total Reviews', value: '1,248', sub: 'All time', icon: 'star' },
    { label: 'Published Reviews', value: '1,102', sub: '88.3% of total', icon: 'check', color: '#10b981' },
    { label: 'Pending Reviews', value: '76', sub: 'Awaiting approval', icon: 'clock', color: '#f97316' },
    { label: 'Rejected Reviews', value: '70', sub: '5.6% of total', icon: 'x', color: '#ef4444' },
    { label: 'Average Rating', value: '4.6', sub: '★★★★★', icon: 'rating' },
  ];

  const reviews = [
    { customer: 'Rohit Verma', email: 'rohitverma@email.com', text: 'Amazing quality and perfect fit! Very comfortable and stylish. Love it!', product: 'SoulFit Oversized T-Shirt', price: '₹799', rating: 5, status: 'Published', date: '20 May 2024, 10:30 AM', avatar: 'https://placehold.co/32x32?text=RV', productImg: 'https://placehold.co/40x40?text=T' },
    { customer: 'Priya Singh', email: 'priyasingh@email.com', text: 'Good fabric and looks premium. Highly recommended!', product: 'SoulFit Hoodie', price: '₹1,399', rating: 4, status: 'Published', date: '19 May 2024, 08:15 PM', avatar: 'https://placehold.co/32x32?text=PS', productImg: 'https://placehold.co/40x40?text=H' },
    { customer: 'Ankit Sharma', email: 'ankitsharma@email.com', text: 'The material is nice but delivery was a bit late.', product: 'SoulFit Joggers', price: '₹999', rating: 4, status: 'Pending', date: '19 May 2024, 04:45 PM', avatar: 'https://placehold.co/32x32?text=AS', productImg: 'https://placehold.co/40x40?text=J' },
    { customer: 'Neha Patel', email: 'nehapatel@email.com', text: 'Not satisfied with the stitching. Expected better quality.', product: 'SoulFit Sports Bra', price: '₹699', rating: 2, status: 'Rejected', date: '18 May 2024, 11:20 AM', avatar: 'https://placehold.co/32x32?text=NP', productImg: 'https://placehold.co/40x40?text=B' },
    { customer: 'Vivek Kumar', email: 'vivekkumar@email.com', text: 'Excellent product! Worth the price. Will buy again.', product: 'SoulFit Cap', price: '₹499', rating: 5, status: 'Published', date: '18 May 2024, 09:10 AM', avatar: 'https://placehold.co/32x32?text=VK', productImg: 'https://placehold.co/40x40?text=C' },
    { customer: 'Sneha Reddy', email: 'sneha.reddy@email.com', text: 'Very comfortable for workouts. Great support!', product: 'SoulFit Leggings', price: '₹1,099', rating: 4, status: 'Published', date: '17 May 2024, 07:30 PM', avatar: 'https://placehold.co/32x32?text=SR', productImg: 'https://placehold.co/40x40?text=L' },
    { customer: 'Arjun Mehta', email: 'arjunmehta@email.com', text: 'Size is smaller than expected. Please improve size chart.', product: 'SoulFit Tank Top', price: '₹599', rating: 3, status: 'Pending', date: '17 May 2024, 02:50 PM', avatar: 'https://placehold.co/32x32?text=AM', productImg: 'https://placehold.co/40x40?text=T' },
  ];

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '24px',
    border: '1px solid #f0f0f0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
  };

  const getStatusStyle = (status) => {
    const styles = {
      Published: { bg: '#eefcf5', color: '#10b981' },
      Pending: { bg: '#fff7ed', color: '#f97316' },
      Rejected: { bg: '#fef2f2', color: '#ef4444' },
    };
    const s = styles[status] || styles.Pending;
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

  const renderStars = (rating) => {
    return (
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map((s) => (
          <span key={s} style={{ color: s <= rating ? '#fbbf24' : '#e2e8f0', fontSize: '14px' }}>★</span>
        ))}
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
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#000', margin: 0 }}>Reviews</h1>
          <p style={{ fontSize: '13px', color: '#999', marginTop: '5px', fontWeight: '500' }}>
            Dashboard &nbsp; <span style={{ color: '#ccc' }}>&gt;</span> &nbsp; Reviews
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ backgroundColor: '#fff', border: '1px solid #f0f0f0', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export Reviews
          </button>
          <button style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
             <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Moderation Settings
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#f5f5f5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon === 'star' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
                {stat.icon === 'check' && <svg width="20" height="20" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                {stat.icon === 'clock' && <svg width="20" height="20" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                {stat.icon === 'x' && <svg width="20" height="20" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>}
                {stat.icon === 'rating' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '11px', color: '#999', fontWeight: '600' }}>{stat.label}</p>
                <h3 style={{ margin: '2px 0', fontSize: '20px', fontWeight: '800' }}>{stat.value}</h3>
                <p style={{ margin: 0, fontSize: '9px', color: stat.color || '#bbb', fontWeight: '600' }}>{stat.sub}</p>
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
              <input type="text" placeholder="Search reviews by name, product..." style={{ border: 'none', outline: 'none', fontSize: '14px', width: '100%', background: 'none' }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <select style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '600', color: '#000', outline: 'none', width: '150px' }}>
              <option>All Products</option>
            </select>
            <select style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '600', color: '#000', outline: 'none', width: '150px' }} value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
              <option>All Ratings</option>
            </select>
            <select style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '600', color: '#000', outline: 'none', width: '150px' }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>All Status</option>
            </select>
            <button style={{ backgroundColor: '#fff', border: '1px solid #f0f0f0', padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
              <svg width="16" height="16" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              Filters
            </button>
            <button style={{ background: '#fff', border: '1px solid #f0f0f0', padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Reset</button>
          </div>

          {/* Table */}
          <div style={{ ...cardStyle, padding: '0', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#fafafa' }}>
                    <th style={{ ...tableHeaderStyle, width: '40px' }}><input type="checkbox" style={{ width: '16px', height: '16px' }} /></th>
                    <th style={tableHeaderStyle}>Review</th>
                    <th style={tableHeaderStyle}>Product</th>
                    <th style={tableHeaderStyle}>Rating</th>
                    <th style={tableHeaderStyle}>Status</th>
                    <th style={tableHeaderStyle}>Date</th>
                    <th style={{ ...tableHeaderStyle, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f9f9f9' }}>
                      <td style={tableCellStyle}><input type="checkbox" style={{ width: '16px', height: '16px' }} /></td>
                      <td style={tableCellStyle}>
                        <div style={{ display: 'flex', gap: '15px' }}>
                          <img src={r.avatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                          <div>
                            <p style={{ margin: 0, fontWeight: '700', color: '#000' }}>{r.customer}</p>
                            <p style={{ margin: '2px 0 8px 0', fontSize: '11px', color: '#999', fontWeight: '500' }}>{r.email}</p>
                            <p style={{ margin: 0, fontSize: '12px', color: '#444', lineHeight: '1.4', maxWidth: '300px' }}>"{r.text}"</p>
                          </div>
                        </div>
                      </td>
                      <td style={tableCellStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={r.productImg} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                          <div>
                            <p style={{ margin: 0, fontWeight: '700', fontSize: '12px' }}>{r.product}</p>
                            <p style={{ margin: 0, fontSize: '11px', color: '#999', fontWeight: '600' }}>{r.price}</p>
                          </div>
                        </div>
                      </td>
                      <td style={tableCellStyle}>{renderStars(r.rating)}</td>
                      <td style={tableCellStyle}><span style={getStatusStyle(r.status)}>{r.status}</span></td>
                      <td style={{ ...tableCellStyle, fontSize: '12px', color: '#666', fontWeight: '600' }}>{r.date.split(',')[0]}</td>
                      <td style={{ ...tableCellStyle, textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          {r.status === 'Pending' ? (
                            <>
                              <button style={{ background: '#eefcf5', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: '#10b981' }}>
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                              </button>
                              <button style={{ background: '#fef2f2', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: '#ef4444' }}>
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                            </>
                          ) : (
                            <button style={{ background: '#f5f5f5', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
                               <svg width="16" height="16" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </button>
                          )}
                          <button style={{ background: '#f5f5f5', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
                            <svg width="16" height="16" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#999', fontWeight: '600' }}>Showing 1 to 10 of 1,248 reviews</span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button style={{ background: '#fff', border: '1px solid #f0f0f0', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <svg width="14" height="14" fill="none" stroke="#666" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                {[1, 2, 3, '...', 125].map((n, i) => (
                  <button key={i} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', backgroundColor: n === 1 ? '#000' : 'transparent', color: n === 1 ? '#fff' : '#666', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>{n}</button>
                ))}
                <button style={{ background: '#fff', border: '1px solid #f0f0f0', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <svg width="14" height="14" fill="none" stroke="#666" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Review Details */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Review Details</h3>
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <img src="https://placehold.co/120x150?text=Product" alt="" style={{ width: '100px', height: '120px', borderRadius: '12px', objectFit: 'cover', marginBottom: '15px' }} />
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800' }}>SoulFit Oversized T-Shirt</h4>
              <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#999', fontWeight: '600' }}>₹799</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderBottom: '1px solid #f5f5f5', paddingBottom: '20px', marginBottom: '20px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700' }}>
                  <span style={{ color: '#999' }}>Reviewer</span>
                  <span>Rohit Verma</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700' }}>
                  <span style={{ color: '#999' }}>Rating</span>
                  {renderStars(5)}
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700' }}>
                  <span style={{ color: '#999' }}>Status</span>
                  <span style={{ color: '#10b981' }}>Published</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700' }}>
                  <span style={{ color: '#999' }}>Review Date</span>
                  <span>20 May 2024, 10:30 AM</span>
               </div>
            </div>
            <div>
               <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#999', fontWeight: '800', textTransform: 'uppercase' }}>Review</p>
               <p style={{ margin: 0, fontSize: '13px', color: '#444', lineHeight: '1.6', fontStyle: 'italic' }}>"Amazing quality and perfect fit! Very comfortable and stylish. Love it!"</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
               <button style={{ flex: 1, backgroundColor: '#f5f5f5', border: 'none', padding: '10px', borderRadius: '10px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>View Product</button>
               <button style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #eee', padding: '10px', borderRadius: '10px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>Edit Review</button>
            </div>
          </div>

          {/* Review Summary Breakdown */}
          <div style={cardStyle}>
             <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '800' }}>Review Summary</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { star: '5 Stars', value: 782, percent: 65, color: '#fbbf24' },
                  { star: '4 Stars', value: 286, percent: 25, color: '#fbbf24' },
                  { star: '3 Stars', value: 108, percent: 8, color: '#fbbf24' },
                  { star: '2 Stars', value: 42, percent: 3, color: '#fbbf24' },
                  { star: '1 Star', value: 30, percent: 2, color: '#ef4444' },
                ].map(item => (
                  <div key={item.star} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                     <span style={{ fontSize: '11px', fontWeight: '700', color: '#666', width: '45px' }}>{item.star}</span>
                     <div style={{ flex: 1, height: '6px', backgroundColor: '#f5f5f5', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${item.percent}%`, height: '100%', backgroundColor: item.color, borderRadius: '3px' }}></div>
                     </div>
                     <span style={{ fontSize: '11px', fontWeight: '800', color: '#000', width: '30px', textAlign: 'right' }}>{item.value}</span>
                  </div>
                ))}
             </div>
             <div style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #f5f5f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#999' }}>Average Rating</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <span style={{ fontSize: '18px', fontWeight: '900' }}>4.6</span>
                   {renderStars(4.6)}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
