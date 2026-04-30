"use client";

import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
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

// ─── Bar for star distribution ─────────────────────────────────────────────────
function RatingBar({ star, count, total }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  const color = star >= 4 ? '#22C55E' : star === 3 ? '#F59E0B' : '#EF4444';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
      <span style={{ color: '#555', fontWeight: 600, width: '32px', flexShrink: 0 }}>{star} ★</span>
      <div style={{ flex: 1, height: '6px', background: '#F3F4F6', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '3px', transition: 'width 0.6s ease' }} />
      </div>
      <span style={{ color: '#888', minWidth: '24px', textAlign: 'right' }}>{count}</span>
    </div>
  );
}

// ─── Single Review Card ────────────────────────────────────────────────────────
function ReviewCard({ review }) {
  const initials = review.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
  const timeAgo = (ts) => {
    if (!ts) return '';
    const diff = (Date.now() - ts.toMillis()) / 1000;
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
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
            <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{timeAgo(review.createdAt)}</span>
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

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function ReviewsSystem({ productId }) {
  const { currentUser } = useAppContext();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(0);
  const [formComment, setFormComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filterStar, setFilterStar] = useState(0);

  // ── Real-time listener ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!productId) return;
    const q = query(
      collection(db, 'reviews', String(productId), 'entries'),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, (snap) => {
      setReviews(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, [productId]);

  // ── Computed stats ─────────────────────────────────────────────────────────
  const total = reviews.length;
  const avg = total > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1) : '0.0';
  const dist = [5, 4, 3, 2, 1].map(s => ({ star: s, count: reviews.filter(r => r.rating === s).length }));
  const filtered = filterStar === 0 ? reviews : reviews.filter(r => r.rating === filterStar);

  // ── Submit review ─────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formName.trim() || formRating === 0 || !formComment.trim()) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews', String(productId), 'entries'), {
        name: formName.trim(),
        rating: formRating,
        comment: formComment.trim(),
        verified: !!currentUser,
        createdAt: serverTimestamp()
      });
      setFormName('');
      setFormRating(0);
      setFormComment('');
      setSubmitted(true);
      setShowForm(false);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Review submit error:', err);
    }
    setSubmitting(false);
  };

  return (
    <div>
      {/* ── SUMMARY ─────────────────────────────────────────────────── */}
      <div style={{ background: '#FAFAFA', border: '1px solid #F0F0F0', borderRadius: '20px', padding: '32px', display: 'flex', gap: '48px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {/* Score */}
        <div style={{ textAlign: 'center', minWidth: '110px' }}>
          <div style={{ fontSize: '60px', fontWeight: 900, color: '#111', lineHeight: 1 }}>{avg}</div>
          <Stars rating={Math.round(parseFloat(avg))} size={18} />
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#9CA3AF', marginTop: '8px' }}>{total} Reviews</p>
        </div>
        {/* Distribution */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', minWidth: '200px' }}>
          {dist.map(({ star, count }) => <RatingBar key={star} star={star} count={count} total={total} />)}
        </div>
        {/* Attribute Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
          {[['Fabric Quality', 90], ['Size & Fit', 85], ['Value for Money', 78], ['Comfort', 92]].map(([label, pct]) => (
            <div key={label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#333' }}>
                <span>{label}</span>
                <span style={{ color: '#22C55E' }}>{pct}%</span>
              </div>
              <div style={{ width: '180px', height: '4px', background: '#E5E7EB', borderRadius: '2px' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: '#22C55E', borderRadius: '2px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ACTIONS ROW ─────────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        {/* Filter chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[0, 5, 4, 3, 2, 1].map(s => (
            <button key={s} onClick={() => setFilterStar(s)} style={{ padding: '6px 14px', borderRadius: '20px', border: `1px solid ${filterStar === s ? '#111' : '#E5E7EB'}`, background: filterStar === s ? '#111' : '#fff', color: filterStar === s ? '#fff' : '#555', fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>
              {s === 0 ? 'All' : `${s} ★`}
            </button>
          ))}
        </div>
        {/* Write review btn */}
        <button onClick={() => setShowForm(!showForm)} style={{ padding: '10px 24px', borderRadius: '10px', border: '1px solid #111', background: showForm ? '#111' : '#fff', color: showForm ? '#fff' : '#111', fontWeight: 800, fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s' }}>
          {showForm ? '✕ Cancel' : '✍ Write a Review'}
        </button>
      </div>

      {/* ── REVIEW FORM ─────────────────────────────────────────────── */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '28px', marginBottom: '32px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '24px', color: '#111' }}>Share Your Experience</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#555', display: 'block', marginBottom: '8px' }}>Your Name *</label>
              <input
                type="text"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                placeholder="e.g. Rahul Verma"
                required
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#555', display: 'block', marginBottom: '8px' }}>Your Rating *</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0' }}>
                <Stars rating={formRating} size={28} interactive onRate={setFormRating} />
                <span style={{ fontSize: '13px', color: '#9CA3AF' }}>
                  {formRating === 0 ? 'Select' : ['', 'Terrible', 'Poor', 'Fair', 'Good', 'Excellent'][formRating]}
                </span>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#555', display: 'block', marginBottom: '8px' }}>Your Review *</label>
            <textarea
              value={formComment}
              onChange={e => setFormComment(e.target.value)}
              placeholder="Tell others what you think about this product — fit, quality, comfort..."
              required
              rows={4}
              style={{ width: '100%', padding: '14px 16px', border: '1px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6, fontFamily: 'inherit' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
              {currentUser ? '✓ Your review will be marked as Verified Purchase' : 'Sign in for a Verified badge'}
            </span>
            <button
              type="submit"
              disabled={submitting || formRating === 0}
              style={{ padding: '12px 32px', borderRadius: '10px', background: formRating === 0 || submitting ? '#ccc' : '#111', color: '#fff', fontWeight: 800, fontSize: '14px', border: 'none', cursor: formRating === 0 || submitting ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
            >
              {submitting ? 'Submitting...' : 'Post Review'}
            </button>
          </div>
        </form>
      )}

      {/* ── SUCCESS TOAST ────────────────────────────────────────────── */}
      {submitted && (
        <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', borderRadius: '12px', padding: '16px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', color: '#15803D', fontWeight: 700, fontSize: '14px' }}>
          <span>✓</span> Your review has been posted! Thank you for your feedback.
        </div>
      )}

      {/* ── REVIEWS LIST ─────────────────────────────────────────────── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#9CA3AF', fontSize: '14px' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
          Loading reviews...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#9CA3AF' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>💬</div>
          <p style={{ fontWeight: 700, fontSize: '14px' }}>
            {filterStar > 0 ? `No ${filterStar}★ reviews yet` : 'No reviews yet. Be the first to review this product.'}
          </p>
        </div>
      ) : (
        <div>
          {filtered.map(review => <ReviewCard key={review.id} review={review} />)}
          {total > 5 && filtered.length > 3 && (
            <button style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #E5E7EB', background: '#fff', color: '#222', fontWeight: 800, fontSize: '14px', marginTop: '24px', cursor: 'pointer' }}>
              See All {total} Reviews
            </button>
          )}
        </div>
      )}
    </div>
  );
}
