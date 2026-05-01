"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { name: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', path: '/admin' },
    { name: 'Products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', path: '/admin/products' },
    { name: 'Orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', path: '/admin/orders' },
    { name: 'Customers', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', path: '/admin/users' },
    { name: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', path: '/admin/analytics' },
    { name: 'Coupons', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3.28a1 1 0 01-.684.948l-.316.105a1 1 0 000 1.894l.316.105a1 1 0 01.684.948V17a2 2 0 002 2h14a2 2 0 002-2v-3.28a1 1 0 01.684-.948l.316-.105a1 1 0 000-1.894l-.316-.105a1 1 0 01-.684-.948V7a2 2 0 00-2-2H5z', path: '/admin/coupons' },
    { name: 'Banners', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', path: '/admin/banners' },
    { name: 'Reviews', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', path: '/admin/reviews' },
    { name: 'Reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', path: '/admin/reports' },
    { name: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', path: '/admin/settings' },
    { name: 'Admins', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-7.618 3.04c-.759 0-1.498.058-2.222.17a11.952 11.952 0 00-4.507 10.46c.218 1.252.742 2.421 1.522 3.435m11.224 2.89a11.646 11.646 0 01-5.183-1.751m5.183 1.751a11.645 11.645 0 005.183-1.751m-5.183 1.751V17c0-1.103-.897-2-2-2s-2 .897-2 2v4.249', path: '#' },
    { name: 'Logout', icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1', path: '#' },
  ];

  const sidebarWidth = '250px';
  const headerHeight = '70px';

  const sidebarStyle = {
    width: sidebarWidth,
    height: '100vh',
    backgroundColor: '#fafafa',
    borderRight: '1px solid #f0f0f0',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000,
    padding: '20px 0',
  };

  const navItemStyle = (item) => {
    const isActive = pathname === item.path;
    const isHovered = hoveredItem === item.name;
    return {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 24px',
      margin: '4px 16px',
      borderRadius: '12px',
      textDecoration: 'none',
      color: isActive ? '#000' : '#666',
      backgroundColor: isActive ? '#fff1e6' : (isHovered ? '#f5f5f5' : 'transparent'),
      transition: 'all 0.2s ease',
      fontWeight: isActive ? '700' : '500',
      fontSize: '14px',
    };
  };

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: sidebarWidth,
    right: 0,
    height: headerHeight,
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
    zIndex: 900,
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fff', fontReferencing: 'system-ui, -apple-system, sans-serif' }}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div style={{ padding: '0 30px 40px', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '2px', color: '#000' }}>SOULFIT</span>
        </div>

        <nav style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              style={navItemStyle(item)}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: '16px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Promo Card */}
        <div style={{ padding: '20px 16px' }}>
          <div style={{ 
            backgroundColor: '#fff1e6', 
            borderRadius: '20px', 
            padding: '20px', 
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#000', position: 'relative', zIndex: 1 }}>New Collection</h4>
            <p style={{ margin: 0, fontSize: '11px', color: '#666', maxWidth: '100px', position: 'relative', zIndex: 1 }}>Check out our latest arrivals</p>
            <button style={{ 
              backgroundColor: '#000', 
              color: '#fff', 
              border: 'none', 
              padding: '8px 12px', 
              borderRadius: '10px', 
              fontSize: '10px', 
              fontWeight: '700', 
              cursor: 'pointer',
              width: 'fit-content',
              marginTop: '5px',
              position: 'relative',
              zIndex: 1
            }}>View Collection</button>
            <div style={{ 
              position: 'absolute', 
              right: '-10px', 
              bottom: '-10px', 
              width: '100px', 
              height: '130px', 
              background: 'url("https://placehold.co/100x130?text=Model") center/cover no-repeat',
              opacity: 0.9
            }}></div>
          </div>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '10px', color: '#999', margin: 0 }}>© 2024 SoulFit Admin Panel</p>
            <p style={{ fontSize: '10px', color: '#999', margin: '2px 0' }}>All rights reserved.</p>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div style={{ flex: 1, marginLeft: sidebarWidth, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#000' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div style={{ 
              backgroundColor: '#f5f5f5', 
              borderRadius: '12px', 
              padding: '8px 16px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              width: '400px'
            }}>
              <svg width="18" height="18" fill="none" stroke="#999" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" placeholder="Search anything..." style={{ background: 'none', border: 'none', outline: 'none', fontSize: '14px', width: '100%' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <svg width="24" height="24" fill="none" stroke="#000" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: '#ff6b35', color: '#fff', fontSize: '9px', fontWeight: '800', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>3</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '800', color: '#000' }}>Admin</p>
                <p style={{ margin: 0, fontSize: '10px', color: '#999', fontWeight: '600' }}>Super Admin</p>
              </div>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: '#f1e4d8', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '800',
                color: '#000'
              }}>A</div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main style={{ marginTop: headerHeight, padding: '40px', overflowY: 'auto', backgroundColor: '#ffffff' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
