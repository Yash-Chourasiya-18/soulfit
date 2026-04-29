"use client";

import React, { useState } from 'react';

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState(null);

  const offers = [
    { code: 'SOUL20', title: 'PREMIUM DISCOUNT', desc: 'Get a massive 20% off on your entire cart subtotal. Limited time offer for premium members.' },
    { code: 'SOUL10', title: 'WELCOME OFFER', desc: 'Get 10% off on your entire cart subtotal! Valid on all new arrivals.' },
    { code: 'VIP500', title: 'FLAT ₹500 OFF', desc: 'Exclusive VIP offer. Get a flat ₹500 discount on your order. Grab it before it expires!' },
    { code: 'FIT200', title: 'FLAT ₹200 OFF', desc: 'Instant ₹200 discount on your order. No minimum purchase required.' },
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="offers-page">
      <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px', maxWidth: '900px', minHeight: '70vh' }}>
        <div className="offers-header">
          <p className="hero-tag" style={{ color: 'var(--red)', margin: '0 auto 12px auto' }}>EXCLUSIVE DEALS</p>
          <h2 className="section-title" style={{ fontSize: '36px', marginBottom: '40px', textAlign: 'center' }}>Unlock Your Style</h2>
        </div>

        <div className="offers-grid">
          {offers.map((offer, index) => (
            <div className="offer-ticket" key={index}>
              <div className="ticket-left">
                <div className="ticket-tag">{offer.title}</div>
                <h3 className="ticket-desc">{offer.desc}</h3>
              </div>
              <div className="ticket-divider"></div>
              <div className="ticket-right">
                <div className="ticket-code-box">
                  <span className="ticket-code">{offer.code}</span>
                </div>
                <button 
                  className={`ticket-btn ${copiedCode === offer.code ? 'copied' : ''}`}
                  onClick={() => handleCopy(offer.code)}
                >
                  {copiedCode === offer.code ? 'COPIED!' : 'COPY CODE'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .offers-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .offer-ticket {
          display: flex;
          background: #111;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          color: white;
          position: relative;
        }
        .ticket-left {
          flex: 1;
          padding: 32px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .ticket-tag {
          font-size: 11px;
          letter-spacing: 2px;
          color: #ff3333;
          font-weight: 700;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .ticket-desc {
          font-size: 18px;
          line-height: 1.5;
          font-weight: 500;
          color: #f0f0f0;
          margin: 0;
        }
        .ticket-divider {
          width: 2px;
          background: repeating-linear-gradient(to bottom, transparent, transparent 6px, rgba(255,255,255,0.2) 6px, rgba(255,255,255,0.2) 12px);
          position: relative;
        }
        .ticket-divider::before, .ticket-divider::after {
          content: '';
          position: absolute;
          width: 30px;
          height: 30px;
          background: var(--white); /* Assuming page background is slightly off-white */
          border-radius: 50%;
          left: -14px;
        }
        .ticket-divider::before { top: -15px; }
        .ticket-divider::after { bottom: -15px; }
        .ticket-right {
          width: 240px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #1a1a1a;
        }
        .ticket-code-box {
          border: 1px dashed rgba(255,255,255,0.3);
          padding: 12px 24px;
          border-radius: 8px;
          margin-bottom: 16px;
          background: rgba(0,0,0,0.5);
          width: 100%;
          text-align: center;
        }
        .ticket-code {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #fff;
        }
        .ticket-btn {
          background: white;
          color: black;
          border: none;
          padding: 12px;
          width: 100%;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .ticket-btn:hover {
          background: #ff3333;
          color: white;
        }
        .ticket-btn.copied {
          background: #4caf50;
          color: white;
        }

        @media (max-width: 768px) {
          .offer-ticket {
            flex-direction: column;
          }
          .ticket-right {
            width: 100%;
            padding: 24px;
          }
          .ticket-divider {
            width: 100%;
            height: 2px;
            background: repeating-linear-gradient(to right, transparent, transparent 6px, rgba(255,255,255,0.2) 6px, rgba(255,255,255,0.2) 12px);
          }
          .ticket-divider::before, .ticket-divider::after {
            left: auto;
            top: -14px;
          }
          .ticket-divider::before { left: -15px; }
          .ticket-divider::after { right: -15px; }
          .ticket-left {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
}
