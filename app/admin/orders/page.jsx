"use client";

import React, { useState } from 'react';

export default function AdminOrders() {
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [paymentFilter, setPaymentFilter] = useState('All Payment Status');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Total Orders', value: '1,243', sub: 'All time', icon: 'bag' },
    { label: 'Pending Orders', value: '78', sub: 'Awaiting processing', icon: 'clock' },
    { label: 'Shipped Orders', value: '562', sub: 'In transit', icon: 'truck' },
    { label: 'Delivered Orders', value: '589', sub: 'Successfully delivered', icon: 'check' },
    { label: 'Cancelled Orders', value: '14', sub: 'Cancelled', icon: 'x' },
  ];

  const orders = [
    { id: '#SF1234', customer: 'Rohit Verma', email: 'rohitverma@email.com', avatar: 'https://placehold.co/32x32?text=RV', date: '20 May 2024', time: '10:30 AM', items: '2 Items', itemNames: 'T-Shirt, Hoodie', itemImg: 'https://placehold.co/40x40?text=T', amount: '₹2,499', payment: 'Paid', status: 'Delivered' },
    { id: '#SF1233', customer: 'Ankit Sharma', email: 'ankitsharma@email.com', avatar: 'https://placehold.co/32x32?text=AS', date: '19 May 2024', time: '04:15 PM', items: '1 Item', itemNames: 'Track Pants', itemImg: 'https://placehold.co/40x40?text=S', amount: '₹1,499', payment: 'Paid', status: 'Shipped' },
    { id: '#SF1232', customer: 'Priya Singh', email: 'priyasingh@email.com', avatar: 'https://placehold.co/32x32?text=PS', date: '18 May 2024', time: '11:20 AM', items: '2 Items', itemNames: 'Tank Top, Cap', itemImg: 'https://placehold.co/40x40?text=H', amount: '₹1,299', payment: 'Paid', status: 'Processing' },
    { id: '#SF1231', customer: 'Sahil Khan', email: 'sahilkhan@email.com', avatar: 'https://placehold.co/32x32?text=SK', date: '17 May 2024', time: '09:45 AM', items: '1 Item', itemNames: 'Hoodie', itemImg: 'https://placehold.co/40x40?text=P', amount: '₹1,999', payment: 'COD', status: 'Pending' },
    { id: '#SF1230', customer: 'Neha Patel', email: 'nehapatel@email.com', avatar: 'https://placehold.co/32x32?text=NP', date: '16 May 2024', time: '02:25 PM', items: '3 Items', itemNames: 'Shirt, T-Shirt, Cap', itemImg: 'https://placehold.co/40x40?text=C', amount: '₹2,799', payment: 'Paid', status: 'Cancelled' },
    { id: '#SF1229', customer: 'Vivek Kumar', email: 'vivekkumar@email.com', avatar: 'https://placehold.co/32x32?text=VK', date: '15 May 2024', time: '01:10 PM', items: '1 Item', itemNames: 'Chino Pant', itemImg: 'https://placehold.co/40x40?text=L', amount: '₹1,399', payment: 'Paid', status: 'Delivered' },
  ];

  const getStatusStyle = (status) => {
    const styles = {
      Delivered: { bg: '#eefcf5', color: '#10b981' },
      Shipped: { bg: '#eff6ff', color: '#3b82f6' },
      Processing: { bg: '#fff7ed', color: '#f97316' },
      Pending: { bg: '#fffbeb', color: '#f59e0b' },
      Cancelled: { bg: '#fef2f2', color: '#ef4444' },
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
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#000', margin: 0 }}>Orders</h1>
          <p style={{ fontSize: '13px', color: '#999', marginTop: '5px', fontWeight: '500' }}>
            Dashboard &nbsp; <span style={{ color: '#ccc' }}>&gt;</span> &nbsp; Orders
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ backgroundColor: '#fff', border: '1px solid #f0f0f0', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export Orders
          </button>
          <button style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Create Order
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#f5f5f5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon === 'bag' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
                {stat.icon === 'clock' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                {stat.icon === 'truck' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zm-2-4h2a2 2 0 012 2v2m-2-4l-2-2m2 2l-2 2m2-2l2-2" /></svg>}
                {stat.icon === 'check' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                {stat.icon === 'x' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
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
          <input type="text" placeholder="Search orders by ID, customer or email..." style={{ border: 'none', outline: 'none', fontSize: '14px', width: '100%', background: 'none' }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <select style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '600', color: '#000', outline: 'none', width: '180px' }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All Status</option>
        </select>
        <select style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '600', color: '#000', outline: 'none', width: '200px' }} value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}>
          <option>All Payment Status</option>
        </select>
        <div style={{ position: 'relative' }}>
          <input type="text" placeholder="Select Date Range" style={{ padding: '10px 40px 10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '600', color: '#000', outline: 'none', width: '220px' }} readOnly />
          <svg width="16" height="16" fill="none" stroke="#999" strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)' }}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
        <button style={{ backgroundColor: '#fff', border: '1px solid #f0f0f0', padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
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
                <th style={tableHeaderStyle}>Order ID</th>
                <th style={tableHeaderStyle}>Customer</th>
                <th style={tableHeaderStyle}>Date</th>
                <th style={tableHeaderStyle}>Items</th>
                <th style={tableHeaderStyle}>Amount</th>
                <th style={tableHeaderStyle}>Payment</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={{ ...tableHeaderStyle, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f9f9f9' }}>
                  <td style={tableCellStyle}><input type="checkbox" style={{ width: '16px', height: '16px', cursor: 'pointer' }} /></td>
                  <td style={{ ...tableCellStyle, fontWeight: '800' }}>{order.id}</td>
                  <td style={tableCellStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={order.avatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                      <div>
                        <p style={{ margin: 0, fontWeight: '700', color: '#000' }}>{order.customer}</p>
                        <p style={{ margin: 0, fontSize: '11px', color: '#999', fontWeight: '500' }}>{order.email}</p>
                      </div>
                    </div>
                  </td>
                  <td style={tableCellStyle}>
                    <p style={{ margin: 0, fontWeight: '700', color: '#000' }}>{order.date}</p>
                    <p style={{ margin: 0, fontSize: '11px', color: '#999', fontWeight: '500' }}>{order.time}</p>
                  </td>
                  <td style={tableCellStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={order.itemImg} alt="" style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <p style={{ margin: 0, fontWeight: '700', color: '#000' }}>{order.items}</p>
                        <p style={{ margin: 0, fontSize: '10px', color: '#999', fontWeight: '500' }}>{order.itemNames}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ ...tableCellStyle, fontWeight: '900' }}>{order.amount}</td>
                  <td style={tableCellStyle}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '8px', 
                      fontSize: '10px', 
                      fontWeight: '800', 
                      backgroundColor: order.payment === 'Paid' ? '#eefcf5' : '#f5f3ff', 
                      color: order.payment === 'Paid' ? '#10b981' : '#8b5cf6' 
                    }}>{order.payment}</span>
                  </td>
                  <td style={tableCellStyle}><span style={getStatusStyle(order.status)}>{order.status}</span></td>
                  <td style={{ ...tableCellStyle, textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button style={{ background: '#f5f5f5', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
                        <svg width="16" height="16" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
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
          <span style={{ fontSize: '13px', color: '#999', fontWeight: '600' }}>Showing 1 to 6 of 1,243 orders</span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button style={{ background: '#fff', border: '1px solid #f0f0f0', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="14" height="14" fill="none" stroke="#666" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            {[1, 2, 3, '...', 208].map((n, i) => (
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
