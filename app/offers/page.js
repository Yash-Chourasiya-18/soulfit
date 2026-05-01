"use client";

import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import { products } from '../../lib/products';
import { toast } from 'react-toastify';
import './offers.css';

export default function OffersPage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          return { hours: 24, minutes: 0, seconds: 0 };
        }
        let s = prev.seconds - 1;
        let m = prev.minutes;
        let h = prev.hours;
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const coupons = [
    { code: 'FIRST10', title: '10% OFF', desc: 'On your first order', color: '#000' },
    { code: 'SOUL20', title: '20% OFF', desc: 'On orders above ₹1499', color: '#000' },
    { code: 'FREESHIP', title: 'FREE SHIPPING', desc: 'Valid on all orders today', color: '#000' }
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    toast.info(`Coupon ${code} copied!`);
  };

  // Filter products that are on sale (have a badge or price < originalPrice)
  const saleProducts = products.filter(p => p.originalPrice > p.price).slice(0, 4);

  return (
    <div className="offers-page">
      {/* HERO BANNER */}
      <section className="offers-hero">
        <div className="offers-hero-overlay"></div>
        <div className="offers-hero-content">
          <span className="offer-badge">LIMITED TIME</span>
          <h1>Hot Deals & Offers</h1>
          <p>Elevate your style with exclusive discounts and premium collections.</p>
          
          <div className="countdown-timer">
            <div className="timer-block">
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <label>HOURS</label>
            </div>
            <div className="timer-sep">:</div>
            <div className="timer-block">
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <label>MINS</label>
            </div>
            <div className="timer-sep">:</div>
            <div className="timer-block">
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
              <label>SECS</label>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* COUPON CODES */}
        <section className="coupons-section">
          <h2 className="section-title-premium">Active Coupon Codes</h2>
          <div className="coupons-grid">
            {coupons.map((coupon, i) => (
              <div className="coupon-card" key={i}>
                <div className="coupon-left">
                  <h3>{coupon.title}</h3>
                  <p>{coupon.desc}</p>
                </div>
                <div className="coupon-right" onClick={() => handleCopy(coupon.code)}>
                  <span className="code-text">{coupon.code}</span>
                  <span className="copy-hint">TAP TO COPY</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FLAT BANNER */}
        <section className="flat-banner">
          <div className="flat-banner-inner">
            <div className="flat-text">
              <h2>FLAT 30% OFF</h2>
              <p>On our premium Winter Collection. Use code WINTER30 at checkout.</p>
            </div>
            <button className="btn-white" onClick={() => window.location.href='/shop'}>Shop Now</button>
          </div>
        </section>

        {/* SALE PRODUCTS */}
        <section className="sale-products">
          <div className="section-header-row">
            <h2 className="section-title-premium">Sale Products</h2>
            <button className="view-all-btn" onClick={() => window.location.href='/shop'}>View All</button>
          </div>
          <div className="products-grid-limited">
            {saleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
