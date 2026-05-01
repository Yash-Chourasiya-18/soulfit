"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('General');
  const [siteOnline, setSiteOnline] = useState(true);

  const tabs = [
    { name: 'General', path: '/admin/settings' },
    { name: 'Store', path: '#' },
    { name: 'Email', path: '#' },
    { name: 'Payment', path: '/admin/settings/payment' },
    { name: 'Shipping', path: '#' },
    { name: 'SEO', path: '#' },
    { name: 'Notifications', path: '/admin/settings/notifications' },
    { name: 'Security', path: '#' },
    { name: 'Others', path: '#' },
  ];

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '30px',
    border: '1px solid #f0f0f0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
    marginBottom: '20px'
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
    width: '40px',
    height: '22px',
    borderRadius: '11px',
    backgroundColor: active ? '#10b981' : '#e2e8f0',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.2s'
  });

  const toggleCircleStyle = (active) => ({
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: '3px',
    left: active ? '21px' : '3px',
    transition: 'all 0.2s'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#000', margin: 0 }}>Settings</h1>
          <p style={{ fontSize: '13px', color: '#999', marginTop: '5px', fontWeight: '500' }}>
            Dashboard &nbsp; <span style={{ color: '#ccc' }}>&gt;</span> &nbsp; Settings
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', scrollbarWidth: 'none' }}>
        {tabs.map((tab) => (
          <Link 
            key={tab.name}
            href={tab.path}
            style={{ 
              padding: '10px 24px', 
              borderRadius: '12px', 
              border: activeTab === tab.name ? 'none' : '1px solid #f0f0f0',
              backgroundColor: activeTab === tab.name ? '#f1e4d8' : '#fff',
              color: activeTab === tab.name ? '#000' : '#666',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}>
            {tab.name}
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '30px', alignItems: 'start' }}>
        {/* Main Settings Form */}
        <div>
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>Store Information</h3>
              <button style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>Save Changes</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '25px' }}>
              <div>
                 <label style={labelStyle}>Store Name <span style={{ color: '#ef4444' }}>*</span></label>
                 <input type="text" value="SoulFit" style={inputStyle} readOnly />
              </div>
              <div>
                 <label style={labelStyle}>Store Logo</label>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ padding: '10px 20px', border: '1px solid #f0f0f0', borderRadius: '10px', fontWeight: '900', letterSpacing: '1px', fontSize: '18px' }}>SOULFIT</div>
                    <button style={{ background: 'none', border: 'none', color: '#000', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>Upload New</button>
                 </div>
                 <p style={{ margin: '5px 0 0 0', fontSize: '10px', color: '#bbb', fontWeight: '600' }}>Recommended: 512x512px (PNG)</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '25px' }}>
              <div>
                 <label style={labelStyle}>Tagline</label>
                 <input type="text" value="Live Fit. Live Strong." style={inputStyle} readOnly />
              </div>
              <div>
                 <label style={labelStyle}>Favicon</label>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '44px', height: '44px', border: '1px solid #f0f0f0', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px' }}>SF</div>
                    <button style={{ background: 'none', border: 'none', color: '#000', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>Upload New</button>
                 </div>
                 <p style={{ margin: '5px 0 0 0', fontSize: '10px', color: '#bbb', fontWeight: '600' }}>Recommended: 32x32px (PNG, ICO)</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div>
                 <label style={labelStyle}>Website URL <span style={{ color: '#ef4444' }}>*</span></label>
                 <input type="text" value="https://soulfit.com" style={inputStyle} readOnly />
              </div>
              <div>
                 <label style={labelStyle}>Currency <span style={{ color: '#ef4444' }}>*</span></label>
                 <select style={inputStyle} readOnly>
                   <option>INR (₹) - Indian Rupee</option>
                 </select>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 30px 0', fontSize: '16px', fontWeight: '800' }}>Contact Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '25px' }}>
              <div>
                 <label style={labelStyle}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
                 <input type="email" value="support@soulfit.com" style={inputStyle} readOnly />
              </div>
              <div>
                 <label style={labelStyle}>Address <span style={{ color: '#ef4444' }}>*</span></label>
                 <input type="text" value="123, Fitness Street, Mumbai, Maharashtra, 400001" style={inputStyle} readOnly />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div>
                 <label style={labelStyle}>Phone Number <span style={{ color: '#ef4444' }}>*</span></label>
                 <input type="text" value="+91 98765 43210" style={inputStyle} readOnly />
              </div>
              <div>
                 <label style={labelStyle}>Store Timings</label>
                 <input type="text" value="10:00 AM - 10:00 PM (Mon - Sun)" style={inputStyle} readOnly />
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 30px 0', fontSize: '16px', fontWeight: '800' }}>Social Media Links</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px' }}>
               {['Facebook', 'Instagram', 'YouTube', 'Twitter'].map(soc => (
                 <div key={soc}>
                    <label style={labelStyle}>{soc}</label>
                    <input type="text" placeholder={`https://${soc.toLowerCase()}.com/soulfit`} style={inputStyle} readOnly />
                 </div>
               ))}
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 30px 0', fontSize: '16px', fontWeight: '800' }}>Other Settings</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px' }}>
               {[
                 { label: 'Allow User Registration', sub: 'Enable new user registration on site', active: true },
                 { label: 'Email Notifications', sub: 'Send email notifications to users', active: true },
                 { label: 'Wishlist', sub: 'Allow users to add products to wishlist', active: true },
                 { label: 'Product Reviews', sub: 'Allow customers to add reviews', active: true },
                 { label: 'Newsletter Subscription', sub: 'Show newsletter subscription on site', active: true },
                 { label: 'Compare Products', sub: 'Allow users to compare products', active: true },
                 { label: 'Inventory Management', sub: 'Enable stock management', active: true },
                 { label: 'COD (Cash on Delivery)', sub: 'Enable Cash on Delivery', active: true },
                 { label: 'Live Chat', sub: 'Enable live chat on website', active: false },
               ].map((set, i) => (
                 <div key={i} style={{ display: 'flex', gap: '15px' }}>
                    <div style={toggleStyle(set.active)}>
                       <div style={toggleCircleStyle(set.active)}></div>
                    </div>
                    <div>
                       <p style={{ margin: 0, fontSize: '12px', fontWeight: '700' }}>{set.label}</p>
                       <p style={{ margin: '2px 0 0 0', fontSize: '10px', color: '#999', fontWeight: '500' }}>{set.sub}</p>
                    </div>
                 </div>
               ))}
            </div>
            <div style={{ marginTop: '40px', textAlign: 'right' }}>
              <button style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Save Changes</button>
            </div>
          </div>
        </div>

        {/* Right Panel: Site Status & Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Site Status */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
               <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>Site Status</h3>
               <span style={{ backgroundColor: '#eefcf5', color: '#10b981', padding: '4px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '800' }}>Online</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', borderBottom: '1px solid #f5f5f5', paddingBottom: '25px', marginBottom: '25px' }}>
               {[
                 { label: 'Website Status', active: true, text: 'Online' },
                 { label: 'Maintenance Mode', active: false, text: 'Off' },
                 { label: 'Site Visible to Users', active: true, text: 'Yes' },
               ].map(st => (
                 <div key={st.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>{st.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <span style={{ fontSize: '11px', fontWeight: '700', color: st.active ? '#10b981' : '#999' }}>{st.text}</span>
                       <div style={toggleStyle(st.active)}>
                          <div style={toggleCircleStyle(st.active)}></div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '600' }}>
                  <span style={{ color: '#999' }}>Last Updated</span>
                  <span>20 May 2024, 10:30 AM</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '600' }}>
                  <span style={{ color: '#999' }}>Updated By</span>
                  <span>Admin</span>
               </div>
            </div>
          </div>

          {/* Quick Links */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Quick Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
               {[
                 { label: 'Clear Cache', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' },
                 { label: 'Backup Database', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' },
                 { label: 'System Information', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                 { label: 'Activity Logs', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
               ].map(link => (
                 <div key={link.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '8px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                       <div style={{ width: '32px', height: '32px', backgroundColor: '#fafafa', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="16" height="16" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={link.icon} /></svg>
                       </div>
                       <span style={{ fontSize: '13px', fontWeight: '700', color: '#444' }}>{link.label}</span>
                    </div>
                    <svg width="14" height="14" fill="none" stroke="#ccc" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                 </div>
               ))}
            </div>
          </div>

          {/* Storage Usage */}
          <div style={cardStyle}>
             <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '800' }}>Storage Usage</h3>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '12px', fontWeight: '800' }}>
                <span>2.45 GB / 10 GB <span style={{ color: '#999', fontWeight: '600' }}>used</span></span>
                <span style={{ color: '#e2a77f' }}>24.5%</span>
             </div>
             <div style={{ width: '100%', height: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px', overflow: 'hidden', marginBottom: '15px' }}>
                <div style={{ width: '24.5%', height: '100%', backgroundColor: '#e2a77f', borderRadius: '4px' }}></div>
             </div>
             <button style={{ color: '#999', background: 'none', border: 'none', fontSize: '11px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                → Manage Storage
             </button>
          </div>

          {/* Help & Support */}
          <div style={{ ...cardStyle, backgroundColor: '#fafafa', border: '1px dashed #e2e8f0' }}>
             <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: '800' }}>Help & Support</h3>
             <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#666', lineHeight: '1.5', fontWeight: '500' }}>Having issues? Get help using our documentation or contact support.</p>
             <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #eee', padding: '10px', borderRadius: '10px', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}>View Docs</button>
                <button style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #eee', padding: '10px', borderRadius: '10px', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}>Contact Support</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
