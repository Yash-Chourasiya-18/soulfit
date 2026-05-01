"use client";

import React, { useState } from 'react';

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [locationFilter, setLocationFilter] = useState('All Locations');

  const stats = [
    { label: 'Total Customers', value: '3,892', sub: 'All time', icon: 'users' },
    { label: 'New Customers', value: '245', sub: '+12.5% this month', icon: 'user-plus', trend: true },
    { label: 'Total Orders', value: '6,543', sub: 'All time', icon: 'bag' },
    { label: 'Total Spent', value: '₹24,78,320', sub: 'All time', icon: 'wallet' },
    { label: 'Avg. Order Value', value: '₹1,245', sub: 'All time', icon: 'chart' },
  ];

  const customers = [
    { name: 'Rohit Verma', email: 'rohitverma@email.com', phone: '+91 98765 43210', location: 'Mumbai, India', orders: 12, spent: '₹15,490', date: '20 May 2024', status: 'Active', avatar: 'https://placehold.co/32x32?text=RV' },
    { name: 'Priya Singh', email: 'priyasingh@email.com', phone: '+91 91234 56789', location: 'Delhi, India', orders: 8, spent: '₹9,870', date: '18 May 2024', status: 'Active', avatar: 'https://placehold.co/32x32?text=PS' },
    { name: 'Ankit Sharma', email: 'ankitsharma@email.com', phone: '+91 99887 66554', location: 'Bangalore, India', orders: 15, spent: '₹18,760', date: '16 May 2024', status: 'Active', avatar: 'https://placehold.co/32x32?text=AS' },
    { name: 'Neha Patel', email: 'nehapatel@email.com', phone: '+91 88776 65544', location: 'Ahmedabad, India', orders: 6, spent: '₹6,450', date: '14 May 2024', status: 'Inactive', avatar: 'https://placehold.co/32x32?text=NP' },
    { name: 'Vivek Kumar', email: 'vivekkumar@email.com', phone: '+91 90909 87654', location: 'Pune, India', orders: 10, spent: '₹12,890', date: '12 May 2024', status: 'Active', avatar: 'https://placehold.co/32x32?text=VK' },
    { name: 'Sneha Reddy', email: 'sneha.reddy@email.com', phone: '+91 79988 66554', location: 'Hyderabad, India', orders: 5, spent: '₹5,230', date: '10 May 2024', status: 'Active', avatar: 'https://placehold.co/32x32?text=SR' },
    { name: 'Arjun Mehta', email: 'arjunmehta@email.com', phone: '+91 88888 11122', location: 'Chennai, India', orders: 7, spent: '₹7,980', date: '08 May 2024', status: 'Inactive', avatar: 'https://placehold.co/32x32?text=AM' },
    { name: 'Kavya Nair', email: 'kavyanair@email.com', phone: '+91 77770 12345', location: 'Kochi, India', orders: 3, spent: '₹3,260', date: '05 May 2024', status: 'Active', avatar: 'https://placehold.co/32x32?text=KN' },
  ];

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '24px',
    border: '1px solid #f0f0f0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
  };

  const getStatusStyle = (status) => {
    const active = status === 'Active';
    return {
      padding: '4px 12px',
      borderRadius: '8px',
      fontSize: '11px',
      fontWeight: '700',
      backgroundColor: active ? '#eefcf5' : '#f5f5f5',
      color: active ? '#10b981' : '#999',
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
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#000', margin: 0 }}>Customers</h1>
          <p style={{ fontSize: '13px', color: '#999', marginTop: '5px', fontWeight: '500' }}>
            Dashboard &nbsp; <span style={{ color: '#ccc' }}>&gt;</span> &nbsp; Customers
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ backgroundColor: '#fff', border: '1px solid #f0f0f0', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export Customers
          </button>
          <button style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Add Customer
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#f5f5f5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon === 'users' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                {stat.icon === 'user-plus' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>}
                {stat.icon === 'bag' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
                {stat.icon === 'wallet' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                {stat.icon === 'chart' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '11px', color: '#999', fontWeight: '600' }}>{stat.label}</p>
                <h3 style={{ margin: '2px 0', fontSize: '20px', fontWeight: '800' }}>{stat.value}</h3>
                <p style={{ margin: 0, fontSize: '9px', color: stat.trend ? '#10b981' : '#bbb', fontWeight: '600' }}>{stat.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <div style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #f0f0f0', borderRadius: '12px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="18" height="18" fill="none" stroke="#999" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search customers by name, email or phone..." style={{ border: 'none', outline: 'none', fontSize: '14px', width: '100%', background: 'none' }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <select style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '600', color: '#000', outline: 'none', width: '180px' }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All Status</option>
        </select>
        <select style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '600', color: '#000', outline: 'none', width: '200px' }} value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
          <option>All Locations</option>
        </select>
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
                <th style={{ ...tableHeaderStyle, width: '50px' }}>
                  <input type="checkbox" style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                </th>
                <th style={tableHeaderStyle}>Customer</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Phone</th>
                <th style={tableHeaderStyle}>Location</th>
                <th style={tableHeaderStyle}>Orders</th>
                <th style={tableHeaderStyle}>Total Spent</th>
                <th style={tableHeaderStyle}>Join Date</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={{ ...tableHeaderStyle, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((user, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f9f9f9' }}>
                  <td style={tableCellStyle}><input type="checkbox" style={{ width: '16px', height: '16px', cursor: 'pointer' }} /></td>
                  <td style={tableCellStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={user.avatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                      <span style={{ fontWeight: '700', color: '#000' }}>{user.name}</span>
                    </div>
                  </td>
                  <td style={{ ...tableCellStyle, color: '#666', fontWeight: '500' }}>{user.email}</td>
                  <td style={{ ...tableCellStyle, color: '#666', fontWeight: '500' }}>{user.phone}</td>
                  <td style={{ ...tableCellStyle, color: '#666', fontWeight: '500' }}>{user.location}</td>
                  <td style={{ ...tableCellStyle, fontWeight: '700' }}>{user.orders}</td>
                  <td style={{ ...tableCellStyle, fontWeight: '900' }}>{user.spent}</td>
                  <td style={{ ...tableCellStyle, fontSize: '12px', color: '#666', fontWeight: '600' }}>{user.date}</td>
                  <td style={tableCellStyle}><span style={getStatusStyle(user.status)}>{user.status}</span></td>
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
          <span style={{ fontSize: '13px', color: '#999', fontWeight: '600' }}>Showing 1 to 8 of 3,892 customers</span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button style={{ background: '#fff', border: '1px solid #f0f0f0', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="14" height="14" fill="none" stroke="#666" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            {[1, 2, 3, '...', 487].map((n, i) => (
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
