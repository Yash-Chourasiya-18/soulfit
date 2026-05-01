"use client";

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

// ─── Star Rating Display ───────────────────────────────────────────────────────
function Stars({ rating, size = 14, interactive = false, onRate }) {
  const [hovered, setHovered] = useState(0);
  const display = interactive ? (hovered || rating) : rating;
  return (
    <span style={{ display: 'inline-flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(s => (
        <span
          key={s}
          onClick={() => interactive && onRate(s)}
          onMouseEnter={() => interactive && setHovered(s)}
          onMouseLeave={() => interactive && setHovered(0)}
          style={{
            fontSize: `${size}px`,
            color: s <= display ? '#F59E0B' : '#D1D5DB',
            cursor: interactive ? 'pointer' : 'default',
            transition: 'color 0.15s',
            lineHeight: 1
          }}
        >★</span>
      ))}
    </span>
  );
}

// ─── Single Review Card ────────────────────────────────────────────────────────
function ReviewCard({ review }) {
  const initials = review.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
  
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div style={{ padding: '24px 0', borderBottom: '1px solid #F0F0F0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', flexShrink: 0 }}>
            {initials}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#222' }}>{review.name}</span>
              {review.verified && (
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#16A34A', background: '#DCFCE7', padding: '2px 8px', borderRadius: '20px', letterSpacing: '0.5px' }}>
                  ✓ Verified Purchase
                </span>
              )}
            </div>
            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{formatDate(review.createdAt)}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Stars rating={review.rating} size={13} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#555' }}>{review.rating}.0</span>
        </div>
      </div>
      <p style={{ fontSize: '14px', color: '#444', lineHeight: 1.65, margin: 0 }}>{review.comment}</p>
    </div>
  );
}

export default function ReviewsSystem({ productId }) {
  const { currentUser } = useAppContext();
  const [reviews, setReviews] = useState([]);
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(0);
  const [formComment, setFormComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Load reviews from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`reviews_${productId}`);
    if (saved) {
      setReviews(JSON.parse(saved));
    }
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || formRating === 0 || !formComment.trim()) return;
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newReview = {
        id: Date.now(),
        name: formName.trim(),
        rating: formRating,
        comment: formComment.trim(),
        verified: !!currentUser,
        createdAt: new Date().toISOString()
      };

      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);
      localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews));

      setFormName('');
      setFormRating(0);
      setFormComment('');
      setSubmitting(false);
      setSubmitted(true);
      setShowForm(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 800);
  };

  return (
    <div className="reviews-section">
      {/* HEADER / STATS SUMMARY */}
      {reviews.length > 0 && (
        <div style={{ background: '#FAFAFA', border: '1px solid #F0F0F0', borderRadius: '20px', padding: '32px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 900, color: '#111', lineHeight: 1 }}>
              {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)}
            </div>
            <Stars rating={Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length)} size={16} />
            <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{reviews.length} Reviews</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            style={{ 
              marginLeft: 'auto', padding: '12px 24px', borderRadius: '8px', 
              background: '#111', color: '#fff', border: 'none', 
              fontWeight: 700, fontSize: '13px', cursor: 'pointer' 
            }}
          >
            Write a Review
          </button>
        </div>
      )}

      {/* SUCCESS MESSAGE */}
      {submitted && (
        <div style={{ background: '#000', color: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '32px', textAlign: 'center', animation: 'fadeIn 0.3s ease' }}>
          <p style={{ margin: 0, fontWeight: 700 }}>Thanks for your review!</p>
          <p style={{ margin: '4px 0 0', fontSize: '13px', opacity: 0.8 }}>It will be visible after approval.</p>
        </div>
      )}

      {/* REVIEW FORM */}
      {showForm && (
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '16px', padding: '32px', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 800 }}>Write a Review</h4>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>✕</button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Rating *</label>
              <Stars rating={formRating} size={24} interactive onRate={setFormRating} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Name *</label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  placeholder="Your Name" 
                  required 
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Review *</label>
                <textarea 
                  value={formComment}
                  onChange={e => setFormComment(e.target.value)}
                  placeholder="Share your experience with this product..." 
                  required 
                  rows={4}
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none', resize: 'vertical' }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={submitting || formRating === 0}
              style={{ 
                width: '100%', padding: '16px', borderRadius: '8px', 
                background: '#000', color: '#fff', border: 'none', 
                fontWeight: 800, cursor: submitting || formRating === 0 ? 'not-allowed' : 'pointer',
                opacity: submitting || formRating === 0 ? 0.6 : 1
              }}
            >
              {submitting ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
            </button>
          </form>
        </div>
      )}

      {/* REVIEWS LIST / EMPTY STATE */}
      {reviews.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', border: '1px dashed #ddd', borderRadius: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '24px', color: '#D1D5DB' }}>★★★★★</span>
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>No reviews yet</h3>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>Be the first to share your experience!</p>
          {!showForm && (
            <button 
              onClick={() => setShowForm(true)}
              style={{ padding: '14px 32px', borderRadius: '8px', background: '#000', color: '#fff', border: 'none', fontWeight: 800, fontSize: '13px', cursor: 'pointer' }}
            >
              Write a Review
            </button>
          )}
        </div>
      ) : (
        <div className="reviews-list">
          {reviews.map(review => <ReviewCard key={review.id} review={review} />)}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
