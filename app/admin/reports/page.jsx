"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminReports() {
  const [dateRange, setDateRange] = useState('01 May 2024 - 31 May 2024');

  const stats = [
    { label: 'Total Revenue', value: '₹24,78,320', trend: '+18.6%', icon: 'revenue' },
    { label: 'Total Orders', value: '6,543', trend: '+12.4%', icon: 'orders' },
    { label: 'Total Customers', value: '3,892', trend: '+15.3%', icon: 'customers' },
    { label: 'Avg. Order Value', value: '₹3,789', trend: '+5.7%', icon: 'aov' },
    { label: 'Conversion Rate', value: '2.35%', trend: '+0.6%', icon: 'conversion' },
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#000', margin: 0 }}>Reports</h1>
          <p style={{ fontSize: '13px', color: '#999', marginTop: '5px', fontWeight: '500' }}>
            Dashboard &nbsp; <span style={{ color: '#ccc' }}>&gt;</span> &nbsp; Reports
          </p>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
             <input type="text" value={dateRange} readOnly style={{ padding: '10px 40px 10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '700', color: '#000', outline: 'none', width: '250px', backgroundColor: '#fff' }} />
             <svg width="16" height="16" fill="none" stroke="#999" strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)' }}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <select style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px', fontWeight: '700', color: '#000', outline: 'none', backgroundColor: '#fff' }}>
             <option>Compare: 01 Apr 2024 - 30 Apr 2024</option>
          </select>
          <button style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download Report
          </button>
        </div>
      </div>

      {/* Summary Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#fdf7f2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon === 'revenue' && <svg width="20" height="20" fill="none" stroke="#e2a77f" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
                {stat.icon === 'orders' && <svg width="20" height="20" fill="none" stroke="#e2a77f" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
                {stat.icon === 'customers' && <svg width="20" height="20" fill="none" stroke="#e2a77f" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                {stat.icon === 'aov' && <svg width="20" height="20" fill="none" stroke="#e2a77f" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                {stat.icon === 'conversion' && <svg width="20" height="20" fill="none" stroke="#e2a77f" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
              </div>
              <p style={{ margin: 0, fontSize: '11px', color: '#999', fontWeight: '700', textTransform: 'uppercase' }}>{stat.label}</p>
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '900' }}>{stat.value}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
               <span style={{ fontSize: '12px', fontWeight: '800', color: '#10b981' }}>↑ {stat.trend}</span>
               <span style={{ fontSize: '10px', color: '#ccc', fontWeight: '600' }}>vs last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '20px' }}>
        {/* Sales Overview Comparison */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
             <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>Sales Overview</h3>
             <select style={{ border: 'none', background: '#fafafa', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>
                <option>Daily</option>
             </select>
          </div>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#000' }}></div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#666' }}>This Period</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e2a77f', opacity: 0.5 }}></div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#999' }}>Compare Period</span>
             </div>
          </div>
          <div style={{ height: '220px', width: '100%', position: 'relative' }}>
             <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
                {/* Comparison Path (Dashed) */}
                <path d="M0,150 L100,160 L200,130 L300,140 L400,110 L500,120 L600,100" fill="none" stroke="#e2a77f" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" />
                {/* Current Path */}
                <path d="M0,180 L100,140 L200,150 L300,100 L400,120 L500,60 L600,90" fill="none" stroke="#000" strokeWidth="3" />
                <path d="M0,180 L100,140 L200,150 L300,100 L400,120 L500,60 L600,90 V200 H0 Z" fill="rgba(0,0,0,0.02)" />
                {/* Data Points */}
                {[0, 100, 200, 300, 400, 500, 600].map((x, i) => (
                  <circle key={i} cx={x} cy={[180, 140, 150, 100, 120, 60, 90][i]} r="4" fill="#000" />
                ))}
             </svg>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                {['01 May', '06 May', '11 May', '16 May', '21 May', '26 May', '31 May'].map(d => (
                  <span key={d} style={{ fontSize: '10px', color: '#999', fontWeight: '700' }}>{d}</span>
                ))}
             </div>
          </div>
        </div>

        {/* Order Status Donut */}
        <div style={cardStyle}>
           <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Order Status Overview</h3>
           <div style={{ position: 'relative', height: '180px', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <svg width="150" height="150" viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#eefcf5" strokeWidth="5"></circle>
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="5" strokeDasharray="76.9 23.1" strokeDashoffset="25"></circle>
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f97316" strokeWidth="5" strokeDasharray="12.9 87.1" strokeDashoffset="-51.9"></circle>
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#ef4444" strokeWidth="5" strokeDasharray="4.4 95.6" strokeDashoffset="-64.8"></circle>
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#8b5cf6" strokeWidth="5" strokeDasharray="2.8 97.2" strokeDashoffset="-69.2"></circle>
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                 <p style={{ margin: 0, fontSize: '18px', fontWeight: '900' }}>6,543</p>
                 <p style={{ margin: 0, fontSize: '9px', color: '#999', fontWeight: '700' }}>Total Orders</p>
              </div>
           </div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Delivered', val: '5,231', pct: '76.9%', color: '#10b981' },
                { label: 'Processing', val: '842', pct: '12.9%', color: '#f97316' },
                { label: 'Cancelled', val: '287', pct: '4.4%', color: '#ef4444' },
                { label: 'Returned', val: '183', pct: '2.8%', color: '#8b5cf6' },
              ].map(st => (
                <div key={st.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: st.color }}></div>
                      <span style={{ fontSize: '12px', color: '#666', fontWeight: '600' }}>{st.label}</span>
                   </div>
                   <span style={{ fontSize: '12px', fontWeight: '700' }}>{st.val} <span style={{ color: '#999', fontSize: '10px' }}>({st.pct})</span></span>
                </div>
              ))}
           </div>
        </div>

        {/* Top Selling Products */}
        <div style={cardStyle}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>Top Selling Products</h3>
              <button style={{ background: 'none', border: 'none', color: '#e2a77f', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>View All</button>
           </div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {[
                { name: 'SoulFit Oversized T-Shirt', sold: '1,245', rev: '₹8,74,555', img: 'https://placehold.co/40x50?text=T' },
                { name: 'SoulFit Joggers', sold: '982', rev: '₹6,12,180', img: 'https://placehold.co/40x50?text=J' },
                { name: 'SoulFit Hoodie', sold: '678', rev: '₹4,85,910', img: 'https://placehold.co/40x50?text=H' },
                { name: 'SoulFit Sports Bra', sold: '512', rev: '₹3,12,760', img: 'https://placehold.co/40x50?text=B' },
                { name: 'SoulFit Leggings', sold: '498', rev: '₹2,92,915', img: 'https://placehold.co/40x50?text=L' },
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                   <img src={p.img} alt="" style={{ width: '32px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                   <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#000', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
                      <p style={{ margin: 0, fontSize: '11px', color: '#999', fontWeight: '600' }}>{p.sold} Sold</p>
                   </div>
                   <p style={{ margin: 0, fontSize: '13px', fontWeight: '900', color: '#000' }}>{p.rev}</p>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '20px' }}>
         {/* Revenue by Channel */}
         <div style={cardStyle}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Revenue By Channel</h3>
            <div style={{ position: 'relative', height: '180px', display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
                <svg width="150" height="150" viewBox="0 0 42 42">
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#000" strokeWidth="6" strokeDasharray="70.4 29.6" strokeDashoffset="25"></circle>
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e2a77f" strokeWidth="6" strokeDasharray="21.0 79.0" strokeDashoffset="-45.4"></circle>
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f1e4d8" strokeWidth="6" strokeDasharray="5.1 94.9" strokeDashoffset="-66.4"></circle>
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#ccc" strokeWidth="6" strokeDasharray="3.5 96.5" strokeDashoffset="-71.5"></circle>
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                   <p style={{ margin: 0, fontSize: '13px', fontWeight: '900' }}>₹24.7L</p>
                   <p style={{ margin: 0, fontSize: '8px', color: '#999', fontWeight: '800', textTransform: 'uppercase' }}>Total Revenue</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               {[
                 { label: 'Website', val: '₹17.4L', pct: '70.4%', color: '#000' },
                 { label: 'Mobile App', val: '₹5.2L', pct: '21.0%', color: '#e2a77f' },
                 { label: 'Instagram', val: '₹1.2L', pct: '5.1%', color: '#f1e4d8' },
                 { label: 'Others', val: '₹86K', pct: '3.5%', color: '#ccc' },
               ].map(ch => (
                 <div key={ch.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                       <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: ch.color }}></div>
                       <span style={{ fontSize: '12px', color: '#666', fontWeight: '600' }}>{ch.label}</span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '800' }}>{ch.val} <span style={{ color: '#999', fontSize: '10px' }}>{ch.pct}</span></span>
                 </div>
               ))}
            </div>
         </div>

         {/* Revenue by Category */}
         <div style={cardStyle}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Revenue By Category</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
               {[
                 { label: 'T-Shirts', val: '₹8.4L', pct: 34.1, color: '#000' },
                 { label: 'Bottoms', val: '6.1L', pct: 24.7, color: '#e2a77f' },
                 { label: 'Hoodies', val: '4.2L', pct: 17.2, color: '#f1e4d8' },
                 { label: 'Activewear', val: '3.2L', pct: 13.0, color: '#ccc' },
                 { label: 'Accessories', val: '73K', pct: 3.0, color: '#f5f5f5' },
               ].map(cat => (
                 <div key={cat.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                       <span style={{ fontSize: '12px', fontWeight: '700', color: '#444' }}>{cat.label}</span>
                       <span style={{ fontSize: '12px', fontWeight: '800' }}>{cat.val} <span style={{ color: '#999', fontSize: '10px' }}>({cat.pct}%)</span></span>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: '#fafafa', borderRadius: '3px', overflow: 'hidden' }}>
                       <div style={{ width: `${cat.pct}%`, height: '100%', backgroundColor: cat.color, borderRadius: '3px' }}></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Recent Orders List */}
         <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
               <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>Recent Orders</h3>
               <button style={{ background: 'none', border: 'none', color: '#999', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}>View All</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
               {[
                 { id: '#SF98765', user: 'Rohit Verma', amt: '₹2,499', status: 'Delivered', avatar: 'https://placehold.co/32x32?text=RV' },
                 { id: '#SF98764', user: 'Priya Singh', amt: '₹1,899', status: 'Processing', avatar: 'https://placehold.co/32x32?text=PS' },
                 { id: '#SF98763', user: 'Ankit Sharma', amt: '₹2,999', status: 'Delivered', avatar: 'https://placehold.co/32x32?text=AS' },
                 { id: '#SF98762', user: 'Neha Patel', amt: '₹1,599', status: 'Processing', avatar: 'https://placehold.co/32x32?text=NP' },
                 { id: '#SF98761', user: 'Vivek Kumar', amt: '₹2,199', status: 'Cancelled', avatar: 'https://placehold.co/32x32?text=VK' },
               ].map((ord, i) => (
                 <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingBottom: '12px', borderBottom: '1px solid #f9f9f9' }}>
                    <img src={ord.avatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                    <div style={{ flex: 1 }}>
                       <p style={{ margin: 0, fontSize: '12px', fontWeight: '800' }}>{ord.id}</p>
                       <p style={{ margin: 0, fontSize: '11px', color: '#999', fontWeight: '600' }}>{ord.user}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                       <p style={{ margin: 0, fontSize: '12px', fontWeight: '900' }}>{ord.amt}</p>
                       <span style={{ 
                         fontSize: '9px', 
                         fontWeight: '800', 
                         color: ord.status === 'Delivered' ? '#10b981' : (ord.status === 'Processing' ? '#f97316' : '#ef4444'),
                         backgroundColor: ord.status === 'Delivered' ? '#eefcf5' : (ord.status === 'Processing' ? '#fff7ed' : '#fef2f2'),
                         padding: '2px 8px',
                         borderRadius: '6px'
                       }}>{ord.status}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* Key Insights Footer */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
         {[
           { title: 'Revenue Growth', text: 'Revenue is up 18.6% this period. T-Shirts and Bottoms are driving the most sales.', icon: '📈' },
           { title: 'Fulfillment Excellence', text: '5,231 orders delivered successfully. Average shipping time reduced by 1.2 days.', icon: '🚚' },
           { title: 'Channel Performance', text: 'Instagram channel sales increased by 22.3% compared to last period.', icon: '📱' },
         ].map((ins, i) => (
           <div key={i} style={{ ...cardStyle, backgroundColor: '#fafafa', display: 'flex', gap: '20px', alignItems: 'center', border: '1px solid #f0f0f0' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#fff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>{ins.icon}</div>
              <div>
                 <p style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#000' }}>{ins.title}</p>
                 <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#666', fontWeight: '500', lineHeight: '1.4' }}>{ins.text}</p>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
