"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import './track.css';

export default function TrackPage() {
  const [orderId, setOrderId] = useState('');

  const handleTrackOrder = () => {
    if (!orderId) return;
    alert(`Tracking functionality for ${orderId} would be initialized here.`);
  };

  return (
    <div className="track-container">
      {/* HEADER */}
      <div className="track-header">
        <div>
          <h1 className="track-title">Track Order</h1>
          <p className="track-subtitle">Enter your Order ID or Tracking Number to get the latest updates on your order.</p>
        </div>

      </div>

      {/* INPUT CARD */}
      <div className="track-input-card">
        <label>Order ID / Tracking Number</label>
        <div className="track-search-wrap">
          <svg className="track-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            type="text"
            className="track-search-input"
            placeholder="Enter Order ID or Tracking Number"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </div>
        <button className="track-btn-black" onClick={handleTrackOrder}>Track Order</button>
        <div className="track-helper-text">You can find your Order ID in the order confirmation email.</div>
      </div>

      {/* RECENT ORDERS */}
      <div className="track-section-header">
        <h3 className="track-section-title">Recent Orders</h3>
        <Link href="/orders" className="track-view-all">View All Orders &gt;</Link>
      </div>
      <div className="track-orders-list">
        <div className="track-order-item">
          <img src="/sf_tshirt.png" alt="Order" className="track-order-img" />
          <div className="track-order-info">
            <h4>Order #SF12345</h4>
            <p>Placed on 20 May 2024</p>
            <span>₹1,299 &bull; 2 Items</span>
          </div>
          <div className="track-order-status-block">
            <div className="track-status-badge status-delivered">Delivered</div>
            <div className="track-status-msg">Delivered on 24 May 2024</div>
          </div>
          <svg className="track-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"></path></svg>
        </div>

        <div className="track-order-item">
          <img src="/sf_cargo.png" alt="Order" className="track-order-img" />
          <div className="track-order-info">
            <h4>Order #SF12344</h4>
            <p>Placed on 18 May 2024</p>
            <span>₹2,398 &bull; 3 Items</span>
          </div>
          <div className="track-order-status-block">
            <div className="track-status-badge status-transit">In Transit</div>
            <div className="track-status-msg">Expected by 25 May 2024</div>
          </div>
          <svg className="track-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"></path></svg>
        </div>

        <div className="track-order-item">
          <img src="/sf_shirt.png" alt="Order" className="track-order-img" />
          <div className="track-order-info">
            <h4>Order #SF12343</h4>
            <p>Placed on 16 May 2024</p>
            <span>₹1,199 &bull; 1 Item</span>
          </div>
          <div className="track-order-status-block">
            <div className="track-status-badge status-processing">Processing</div>
            <div className="track-status-msg">We are preparing your order</div>
          </div>
          <svg className="track-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"></path></svg>
        </div>
      </div>

      <div className="track-support-link">
        Can't find your order? <Link href="/support">Contact our support team.</Link>
      </div>

      {/* NEED HELP */}
      <div className="track-help-card">
        <div className="track-help-left">
          <div className="track-help-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <div className="track-help-text">
            <h3>Need help with your order?</h3>
            <p>Our support team is here to help you with any order related queries.</p>
          </div>
        </div>
        <Link href="/support">
          <button className="track-help-btn">Contact Support</button>
        </Link>
      </div>

      {/* ASSURANCES */}
      <div className="track-assurances">
        <div className="track-assurance-item">
          <svg className="track-assurance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
          <div className="track-assurance-info">
            <h4>Free Shipping</h4>
            <p>On all orders above ₹999</p>
          </div>
        </div>
        <div className="track-assurance-item">
          <svg className="track-assurance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <div className="track-assurance-info">
            <h4>Secure Payment</h4>
            <p>100% secure checkout</p>
          </div>
        </div>
        <div className="track-assurance-item">
          <svg className="track-assurance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
          <div className="track-assurance-info">
            <h4>Easy Returns</h4>
            <p>7 days return policy</p>
          </div>
        </div>
        <div className="track-assurance-item">
          <svg className="track-assurance-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
          <div className="track-assurance-info">
            <h4>Customer Support</h4>
            <p>We're here to help</p>
          </div>
        </div>
      </div>
    </div>
  );
}
