"use client";

import React, { useState } from 'react';

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  const kpis = [
    { label: 'Net Revenue', value: '₹12,45,231', trend: '+14.5%', sub: 'vs last month', icon: 'revenue' },
    { label: 'Conversion Rate', value: '3.42%', trend: '+0.8%', sub: 'vs last month', icon: 'conversion' },
    { label: 'Avg. Order Value', value: '₹1,842', trend: '-2.1%', sub: 'vs last month', icon: 'aov' },
    { label: 'Retention Rate', value: '24.8%', trend: '+5.2%', sub: 'vs last month', icon: 'retention' },
  ];

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '24px',
    border: '1px solid #f0f0f0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#000', margin: 0 }}>Analytics</h1>
          <p style={{ fontSize: '13px', color: '#999', marginTop: '5px', fontWeight: '500' }}>
            Dashboard &nbsp; <span style={{ color: '#ccc' }}>&gt;</span> &nbsp; Analytics
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select 
            style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '700', outline: 'none', backgroundColor: '#fff' }}
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
          <button style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {kpis.map((kpi, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#fafafa', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {kpi.icon === 'revenue' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                {kpi.icon === 'conversion' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                {kpi.icon === 'aov' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
                {kpi.icon === 'retention' && <svg width="20" height="20" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>}
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: kpi.trend.startsWith('+') ? '#10b981' : '#ef4444' }}>{kpi.trend}</span>
                <p style={{ margin: 0, fontSize: '10px', color: '#999', fontWeight: '600' }}>{kpi.sub}</p>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#666', fontWeight: '600' }}>{kpi.label}</p>
            <h3 style={{ margin: '5px 0 0 0', fontSize: '24px', fontWeight: '900' }}>{kpi.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Sales Performance Line Chart */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>Sales Performance</h3>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#000' }}></div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#666' }}>Revenue</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e2a77f' }}></div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#666' }}>Orders</span>
              </div>
            </div>
          </div>
          <div style={{ height: '300px', width: '100%', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 800 250" preserveAspectRatio="none">
              {/* Grid */}
              {[0, 50, 100, 150, 200, 250].map(y => (
                <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#f5f5f5" strokeWidth="1" />
              ))}
              {/* Revenue Path */}
              <path d="M0,200 L100,180 L200,150 L300,170 L400,100 L500,120 L600,80 L700,90 L800,40" fill="none" stroke="#000" strokeWidth="3" />
              <path d="M0,200 L100,180 L200,150 L300,170 L400,100 L500,120 L600,80 L700,90 L800,40 V250 H0 Z" fill="rgba(0,0,0,0.02)" />
              {/* Orders Path */}
              <path d="M0,220 L100,210 L200,190 L300,200 L400,160 L500,170 L600,140 L700,150 L800,120" fill="none" stroke="#e2a77f" strokeWidth="3" strokeDasharray="5,5" />
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
              {['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'].map(w => (
                <span key={w} style={{ fontSize: '11px', color: '#999', fontWeight: '700' }}>{w}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Segments Donut */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 30px 0', fontSize: '16px', fontWeight: '800' }}>Customer Segments</h3>
          <div style={{ position: 'relative', height: '220px', display: 'flex', justifyContent: 'center' }}>
             <svg width="200" height="200" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f5f5f5" strokeWidth="5"></circle>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#000" strokeWidth="5" strokeDasharray="45 55" strokeDashoffset="25"></circle>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e2a77f" strokeWidth="5" strokeDasharray="30 70" strokeDashoffset="-20"></circle>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#ccc" strokeWidth="5" strokeDasharray="25 75" strokeDashoffset="-50"></circle>
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '10px', color: '#999', fontWeight: '800', textTransform: 'uppercase' }}>New vs Repeat</p>
              <p style={{ margin: 0, fontSize: '20px', fontWeight: '900' }}>+12%</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            {[
              { label: 'New Customers', value: '45%', color: '#000' },
              { label: 'Returning', value: '30%', color: '#e2a77f' },
              { label: 'One-time', value: '25%', color: '#ccc' }
            ].map(seg => (
              <div key={seg.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: seg.color }}></div>
                  <span style={{ fontSize: '13px', color: '#444', fontWeight: '600' }}>{seg.label}</span>
                </div>
                <span style={{ fontSize: '13px', fontWeight: '800' }}>{seg.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '20px' }}>
        {/* Top Selling Products */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Top Selling Products</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { name: 'Oversized Black T-Shirt', sales: '₹2.4L', growth: '+12%', img: 'https://placehold.co/40x40?text=T' },
              { name: 'SoulFit Essential Hoodie', sales: '₹1.8L', growth: '+8%', img: 'https://placehold.co/40x40?text=H' },
              { name: 'Tech Track Pants', sales: '₹1.2L', growth: '+15%', img: 'https://placehold.co/40x40?text=P' },
              { name: 'Classic SoulFit Cap', sales: '₹85K', growth: '-2%', img: 'https://placehold.co/40x40?text=C' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={p.img} alt="" style={{ width: '40px', height: '40px', borderRadius: '10px' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '700' }}>{p.name}</p>
                  <p style={{ margin: 0, fontSize: '11px', color: '#999', fontWeight: '600' }}>Clothing</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '900' }}>{p.sales}</p>
                  <span style={{ fontSize: '10px', fontWeight: '800', color: p.growth.startsWith('+') ? '#10b981' : '#ef4444' }}>{p.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Channel Bar Chart */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Sales by Channel</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginTop: '10px' }}>
            {[
              { label: 'Direct Store', value: 85, color: '#000' },
              { label: 'Instagram', value: 65, color: '#e2a77f' },
              { label: 'Facebook', value: 45, color: '#f5f5f5' },
              { label: 'Affiliates', value: 30, color: '#f5f5f5' },
            ].map(ch => (
              <div key={ch.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#444' }}>{ch.label}</span>
                  <span style={{ fontSize: '12px', fontWeight: '800' }}>{ch.value}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#fafafa', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${ch.value}%`, height: '100%', backgroundColor: ch.color, borderRadius: '4px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Real-time Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              { user: 'Rohit V.', action: 'placed an order for', target: '₹2,499', time: '2 mins ago', icon: '🛍️' },
              { user: 'Sneha R.', action: 'registered as a', target: 'new member', time: '15 mins ago', icon: '👤' },
              { user: 'Arjun M.', action: 'applied coupon', target: 'SOUL10', time: '45 mins ago', icon: '🏷️' },
              { user: 'Priya S.', action: 'reviewed', target: 'Oversized T-Shirt', time: '1 hr ago', icon: '⭐' },
              { user: 'System', action: 'inventory low for', target: 'Essential Hoodie', time: '2 hrs ago', icon: '⚠️' },
            ].map((act, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', backgroundColor: '#fafafa', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>{act.icon}</div>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#000', lineHeight: '1.4' }}>
                    <span style={{ fontWeight: '800' }}>{act.user}</span> {act.action} <span style={{ fontWeight: '700' }}>{act.target}</span>
                  </p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '10px', color: '#bbb', fontWeight: '600' }}>{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
