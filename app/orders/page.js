"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '../../context/AppContext';
import './orders.css';

export default function OrdersPage() {
  const { orderHistory } = useAppContext();
  const [activeTab, setActiveTab] = useState('All Orders');
  const [searchQuery, setSearchQuery] = useState('');
  const tabs = ['All Orders', 'Delivered', 'In Transit', 'Processing', 'Cancelled', 'Returned'];

  // Mock data for initial view/demo
  const mockOrders = [
    { id: 'SF12345', date: '20 May 2024', total: 1299, items: 2, status: 'Delivered', msg: 'Delivered on 24 May 2024', image: '/sf_tshirt.png', name: 'Black Oversized T-Shirt' },
    { id: 'SF12344', date: '18 May 2024', total: 2398, items: 3, status: 'In Transit', msg: 'Expected by 25 May 2024', image: '/sf_cargo.png', name: 'Beige Cargo Pant' },
    { id: 'SF12343', date: '16 May 2024', total: 1199, items: 1, status: 'Processing', msg: 'We are preparing your order', image: '/sf_shirt.png', name: 'Navy Regular Shirt' },
    { id: 'SF12342', date: '10 May 2024', total: 798, items: 2, status: 'Cancelled', msg: 'Cancelled on 11 May 2024', image: '/sf_pant.png', name: 'Grey Track Pant' },
    { id: 'SF12341', date: '05 May 2024', total: 1499, items: 1, status: 'Delivered', msg: 'Delivered on 07 May 2024', image: '/sf_cat_shirt.png', name: 'Printed Summer Shirt' },
  ];

  // Combine mock orders with real history
  const allOrders = [...orderHistory, ...mockOrders];

  // Filter logic
  const filteredOrders = allOrders.filter(order => {
    const matchesTab = activeTab === 'All Orders' || order.status === activeTab;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (order.name && order.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="orders-container">
      {/* HEADER */}
      <div className="orders-header">
        <div>
          <h1 className="orders-title">My Orders</h1>
          <p className="orders-subtitle">Track, view and manage all your orders in one place.</p>
        </div>
      </div>

      {/* TABS */}
      <div className="orders-tabs">
        {tabs.map(tab => (
          <div 
            key={tab} 
            className={`orders-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* SEARCH AND FILTER */}
      <div className="orders-actions">
        <div className="orders-search-wrap">
          <svg className="orders-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            className="orders-search-input" 
            placeholder="Search by order ID or item..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ORDERS LIST */}
      <div className="orders-list">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div className="orders-card" key={order.id}>
              <img src={order.image || '/sf_tshirt.png'} alt="Order" className="orders-card-img" onError={(e) => e.target.src = '/sf_tshirt.png'} />
              <div className="orders-card-info">
                <h4>Order #{order.id}</h4>
                <p>Placed on {order.date} &bull; {order.items?.length || order.items || 1} {order.items === 1 ? 'Item' : 'Items'}</p>
                <strong>Total: ₹{order.total?.toLocaleString('en-IN')}</strong>
              </div>
              <div className="orders-status-block">
                <div className={`orders-badge status-${order.status.toLowerCase().replace(' ', '-')}`}>{order.status}</div>
                <div className="orders-status-msg">{order.msg || `${order.status} on ${order.date}`}</div>
              </div>
              <svg className="orders-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"></path></svg>
            </div>
          ))
        ) : (
          <div className="no-orders" style={{ textAlign: 'center', padding: '40px', color: 'var(--gray)' }}>
            <p>No orders found for "{activeTab}"</p>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      <div className="orders-pagination">
        <button className="orders-page-btn">&lt;</button>
        <button className="orders-page-btn active">1</button>
        <button className="orders-page-btn">2</button>
        <button className="orders-page-btn">3</button>
        <button className="orders-page-btn">&gt;</button>
      </div>

      {/* NEED HELP */}
      <div className="orders-help-card">
        <div className="orders-help-left">
          <div className="orders-help-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
          </div>
          <div className="orders-help-text">
            <h3>Need help with your order?</h3>
            <p>Our support team is here to help you with any order related queries.</p>
          </div>
        </div>
        <Link href="/support">
          <button className="orders-help-btn">Contact Support</button>
        </Link>
      </div>

      {/* ASSURANCES */}
      <div className="orders-assurances">
        <div className="orders-assurance-item">
          <svg className="orders-assurance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
          <div className="orders-assurance-info">
            <h4>Free Shipping</h4>
            <p>On all orders above ₹999</p>
          </div>
        </div>
        <div className="orders-assurance-item">
          <svg className="orders-assurance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <div className="orders-assurance-info">
            <h4>Secure Payment</h4>
            <p>100% secure checkout</p>
          </div>
        </div>
        <div className="orders-assurance-item">
          <svg className="orders-assurance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
          <div className="orders-assurance-info">
            <h4>Easy Returns</h4>
            <p>7 days return policy</p>
          </div>
        </div>
        <div className="orders-assurance-item">
          <svg className="orders-assurance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
          <div className="orders-assurance-info">
            <h4>Customer Support</h4>
            <p>We're here to help</p>
          </div>
        </div>
      </div>
    </div>
  );
}
