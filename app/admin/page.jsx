"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { name: 'Total Revenue', value: '₹8,45,231', trend: '+18.5%', icon: 'wallet' },
    { name: 'Total Orders', value: '1,243', trend: '+12.7%', icon: 'bag' },
    { name: 'Total Customers', value: '3,892', trend: '+8.3%', icon: 'users' },
    { name: 'Total Products', value: '156', trend: '+5.2%', icon: 'tshirt' },
    { name: 'Total Coupons', value: '24', trend: '+3.1%', icon: 'coupon' },
  ];

  const recentOrders = [
    { id: '#SF1234', customer: 'Rohit Verma', amount: '₹2,499', status: 'Delivered' },
    { id: '#SF1233', customer: 'Ankit Sharma', amount: '₹1,999', status: 'Shipped' },
    { id: '#SF1232', customer: 'Priya Singh', amount: '₹1,299', status: 'Processing' },
    { id: '#SF1231', customer: 'Sahil Khan', amount: '₹2,799', status: 'Delivered' },
    { id: '#SF12330', customer: 'Neha Patel', amount: '₹999', status: 'Cancelled' },
  ];

  const topProducts = [
    { name: 'SoulFit Oversized T-Shirt', sold: 432, revenue: '₹2,15,568', image: 'https://placehold.co/40x40?text=T' },
    { name: 'SoulFit Tank Top', sold: 321, revenue: '₹1,28,679', image: 'https://placehold.co/40x40?text=S' },
    { name: 'SoulFit Hoodie', sold: 278, revenue: '₹1,95,422', image: 'https://placehold.co/40x40?text=H' },
    { name: 'SoulFit Track Pants', sold: 187, revenue: '₹93,813', image: 'https://placehold.co/40x40?text=P' },
    { name: 'SoulFit Cap', sold: 165, revenue: '₹41,250', image: 'https://placehold.co/40x40?text=C' },
  ];

  const activeCoupons = [
    { code: 'SOUL10', discount: '10% OFF', expiry: '31 May 2024', status: 'Active', usage: 120 },
    { code: 'FIT20', discount: '20% OFF', expiry: '15 Jun 2024', status: 'Active', usage: 85 },
    { code: 'NEW30', discount: '30% OFF', expiry: '30 Jun 2024', status: 'Active', usage: 45 },
    { code: 'WELCOME5', discount: '5% OFF', expiry: '10 Jun 2024', status: 'Active', usage: 60 },
    { code: 'SUMMER15', discount: '15% OFF', expiry: '01 Jul 2024', status: 'Active', usage: 30 },
  ];

  const quickActions = [
    { label: 'Add Product', sub: 'Add new product to store', icon: 'plus', path: '/admin/products/add' },
    { label: 'Create Coupon', sub: 'Create new discount coupon', icon: 'ticket', path: '/admin/coupons' },
    { label: 'Manage Banners', sub: 'Update website banners', icon: 'image', path: '/admin/banners' },
    { label: 'View Reports', sub: 'View detailed reports', icon: 'chart', path: '/admin/reports' },
  ];

  const getStatusStyle = (status) => {
    const styles = {
      Delivered: { bg: '#eefcf5', color: '#10b981' },
      Shipped: { bg: '#eff6ff', color: '#3b82f6' },
      Processing: { bg: '#fff7ed', color: '#f97316' },
      Cancelled: { bg: '#fef2f2', color: '#ef4444' },
      Active: { bg: '#eefcf5', color: '#10b981' },
    };
    const s = styles[status] || styles.Processing;
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Dashboard Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#000', margin: 0 }}>Dashboard</h1>
          <p style={{ fontSize: '14px', color: '#999', marginTop: '8px', fontWeight: '500' }}>Welcome back, Admin! 👋</p>
        </div>
        <div style={{ 
          backgroundColor: '#ffffff', 
          border: '1px solid #f0f0f0', 
          borderRadius: '12px', 
          padding: '10px 20px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px',
          fontSize: '13px',
          fontWeight: '700',
          color: '#000',
          cursor: 'pointer'
        }}>
          20 May 2024 - 26 May 2024
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" /></svg>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#fafafa', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon === 'wallet' && <svg width="20" height="20" fill="none" stroke="#e2a77f" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
                {stat.icon === 'bag' && <svg width="20" height="20" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
                {stat.icon === 'users' && <svg width="20" height="20" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                {stat.icon === 'tshirt' && <svg width="20" height="20" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8l-2-2H5L3 8v10h18V8zM8 6l2 2m6-2l-2 2" /></svg>}
                {stat.icon === 'coupon' && <svg width="20" height="20" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3.28a1 1 0 01-.684.948l-.316.105a1 1 0 000 1.894l.316.105a1 1 0 01.684.948V17a2 2 0 002 2h14a2 2 0 002-2v-3.28a1 1 0 01.684-.948l.316-.105a1 1 0 000-1.894l-.316-.105a1 1 0 01-.684-.948V7a2 2 0 00-2-2H5z" /></svg>}
              </div>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#10b981' }}>{stat.trend}</span>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#999', fontWeight: '600' }}>{stat.name}</p>
            <h2 style={{ margin: '5px 0 0 0', fontSize: '20px', fontWeight: '900', color: '#000' }}>{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '20px' }}>
        {/* Sales Chart Card */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>Sales Overview</h3>
            <select style={{ background: '#fafafa', border: '1px solid #f0f0f0', borderRadius: '8px', padding: '6px 12px', fontSize: '11px', fontWeight: '700', outline: 'none' }}>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <div style={{ height: '200px', width: '100%', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 500 150" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="0" x2="500" y2="0" stroke="#f5f5f5" strokeWidth="1" />
              <line x1="0" y1="37.5" x2="500" y2="37.5" stroke="#f5f5f5" strokeWidth="1" />
              <line x1="0" y1="75" x2="500" y2="75" stroke="#f5f5f5" strokeWidth="1" />
              <line x1="0" y1="112.5" x2="500" y2="112.5" stroke="#f5f5f5" strokeWidth="1" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#f5f5f5" strokeWidth="1" />
              {/* Path */}
              <path 
                d="M0,120 L80,90 L160,110 L240,70 L320,80 L400,40 L500,60" 
                fill="none" 
                stroke="#e2a77f" 
                strokeWidth="3" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path 
                d="M0,120 L80,90 L160,110 L240,70 L320,80 L400,40 L500,60 V150 H0 Z" 
                fill="rgba(226, 167, 127, 0.1)"
              />
              {/* Data Points */}
              {[
                {x:0, y:120}, {x:80, y:90}, {x:160, y:110}, {x:240, y:70}, {x:320, y:80}, {x:400, y:40}, {x:500, y:60}
              ].map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="4" fill="#fff" stroke="#e2a77f" strokeWidth="2" />
              ))}
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
              {['20 May', '21 May', '22 May', '23 May', '24 May', '25 May', '26 May'].map(day => (
                <span key={day} style={{ fontSize: '10px', color: '#999', fontWeight: '700' }}>{day}</span>
              ))}
            </div>
            {/* Y Axis Labels */}
            <div style={{ position: 'absolute', left: '-40px', top: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '10px', color: '#999', fontWeight: '700' }}>
              <span>₹2L</span>
              <span>₹1.5L</span>
              <span>₹1L</span>
              <span>₹50K</span>
              <span>₹0</span>
            </div>
          </div>
        </div>

        {/* Orders Overview Donut */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Orders Overview</h3>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
            <svg width="150" height="150" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#eefcf5" strokeWidth="4"></circle>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="4" strokeDasharray="62 38" strokeDashoffset="25"></circle>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#3b82f6" strokeWidth="4" strokeDasharray="12 88" strokeDashoffset="-37"></circle>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f97316" strokeWidth="4" strokeDasharray="18 82" strokeDashoffset="-49"></circle>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#ef4444" strokeWidth="4" strokeDasharray="8 92" strokeDashoffset="-67"></circle>
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '10px', color: '#999', fontWeight: '700', textTransform: 'uppercase' }}>Total Orders</p>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: '900' }}>1,243</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Delivered', value: '62%', color: '#10b981' },
              { label: 'Processing', value: '18%', color: '#f97316' },
              { label: 'Shipped', value: '12%', color: '#3b82f6' },
              { label: 'Cancelled', value: '8%', color: '#ef4444' }
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }}></div>
                <span style={{ fontSize: '11px', color: '#666', fontWeight: '600', flex: 1 }}>{item.label}</span>
                <span style={{ fontSize: '11px', color: '#000', fontWeight: '800' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories Donut */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Top Categories</h3>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
            <svg width="150" height="150" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#ef4444" strokeWidth="4" strokeDasharray="35 65" strokeDashoffset="25"></circle>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="4" strokeDasharray="25 75" strokeDashoffset="-10"></circle>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f97316" strokeWidth="4" strokeDasharray="20 80" strokeDashoffset="-35"></circle>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#3b82f6" strokeWidth="4" strokeDasharray="10 90" strokeDashoffset="-55"></circle>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#666" strokeWidth="4" strokeDasharray="10 90" strokeDashoffset="-65"></circle>
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '10px', color: '#999', fontWeight: '700', textTransform: 'uppercase' }}>Total Sales</p>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '900' }}>₹8,45,231</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
            {[
              { label: 'T-Shirts', value: '35%', color: '#ef4444' },
              { label: 'Hoodies', value: '25%', color: '#10b981' },
              { label: 'Pants', value: '20%', color: '#f97316' },
              { label: 'Shirts', value: '10%', color: '#3b82f6' },
              { label: 'Others', value: '10%', color: '#666' }
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }}></div>
                <span style={{ fontSize: '11px', color: '#666', fontWeight: '600', flex: 1 }}>{item.label}</span>
                <span style={{ fontSize: '11px', color: '#000', fontWeight: '800' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '20px' }}>
        {/* Recent Orders Table */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>Recent Orders</h3>
            <button style={{ background: '#f5f5f5', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>View All</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ fontSize: '10px', color: '#999', fontWeight: '800', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 0' }}>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th style={{ textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #f9f9f9', fontSize: '12px' }}>
                  <td style={{ padding: '15px 0', fontWeight: '800' }}>{order.id}</td>
                  <td style={{ fontWeight: '600', color: '#444' }}>{order.customer}</td>
                  <td style={{ fontWeight: '900', color: '#000' }}>{order.amount}</td>
                  <td style={{ textAlign: 'right' }}><span style={getStatusStyle(order.status)}>{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Products Table */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>Top Products</h3>
            <button style={{ background: '#f5f5f5', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>View All</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ fontSize: '10px', color: '#999', fontWeight: '800', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 0' }}>Product</th>
                <th>Sold</th>
                <th style={{ textAlign: 'right' }}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product) => (
                <tr key={product.name} style={{ borderBottom: '1px solid #f9f9f9', fontSize: '12px' }}>
                  <td style={{ padding: '12px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={product.image} style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }} alt="" />
                      <span style={{ fontWeight: '700', color: '#444', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: '800', color: '#666' }}>{product.sold}</td>
                  <td style={{ textAlign: 'right', fontWeight: '900', color: '#000' }}>{product.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Active Coupons Table */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>Active Coupons</h3>
            <button style={{ background: '#f5f5f5', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>View All</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ fontSize: '10px', color: '#999', fontWeight: '800', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 0' }}>Code</th>
                <th>Discount</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Usage</th>
              </tr>
            </thead>
            <tbody>
              {activeCoupons.map((coupon) => (
                <tr key={coupon.code} style={{ borderBottom: '1px solid #f9f9f9', fontSize: '12px' }}>
                  <td style={{ padding: '15px 0', fontWeight: '800' }}>{coupon.code}</td>
                  <td style={{ fontWeight: '700', color: '#444' }}>{coupon.discount}</td>
                  <td style={{ fontWeight: '600', color: '#666' }}>{coupon.expiry}</td>
                  <td><span style={getStatusStyle(coupon.status)}>{coupon.status}</span></td>
                  <td style={{ textAlign: 'right', fontWeight: '900', color: '#000' }}>{coupon.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {quickActions.map((action, i) => (
          <Link key={i} href={action.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ 
              backgroundColor: '#fafafa', 
              borderRadius: '24px', 
              padding: '24px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '20px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: '1px solid #f0f0f0',
              height: '100%'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f5f5f5'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fafafa'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ width: '48px', height: '48px', backgroundColor: '#fff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                {action.icon === 'plus' && <svg width="24" height="24" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>}
                {action.icon === 'ticket' && <svg width="24" height="24" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3.28a1 1 0 01-.684.948l-.316.105a1 1 0 000 1.894l.316.105a1 1 0 01.684.948V17a2 2 0 002 2h14a2 2 0 002-2v-3.28a1 1 0 01.684-.948l.316-.105a1 1 0 000-1.894l-.316-.105a1 1 0 01-.684-.948V7a2 2 0 00-2-2H5z" /></svg>}
                {action.icon === 'image' && <svg width="24" height="24" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                {action.icon === 'chart' && <svg width="24" height="24" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#000' }}>{action.label}</p>
                <p style={{ margin: 0, fontSize: '11px', color: '#999', fontWeight: '600', marginTop: '2px' }}>{action.sub}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
