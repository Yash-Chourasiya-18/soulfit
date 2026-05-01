"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AddCouponPage() {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'ORDER',
    discountType: 'PERCENTAGE',
    discountValue: '',
    minOrder: '',
    validFrom: '',
    validTo: '',
    usageLimit: '',
    perUserLimit: '1',
    isActive: true,
    description: ''
  });

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '30px',
    border: '1px solid #f0f0f0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
    marginBottom: '30px'
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
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    backgroundColor: active ? '#10b981' : '#e2e8f0',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.2s'
  });

  const toggleCircleStyle = (active) => ({
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: '3px',
    left: active ? '23px' : '3px',
    transition: 'all 0.2s'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#000', margin: 0 }}>Create New Coupon</h1>
          <p style={{ fontSize: '13px', color: '#999', marginTop: '5px', fontWeight: '500' }}>
            Dashboard &nbsp; <span style={{ color: '#ccc' }}>&gt;</span> &nbsp; Coupons &nbsp; <span style={{ color: '#ccc' }}>&gt;</span> &nbsp; Create New Coupon
          </p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link href="/admin/coupons" style={{ 
            backgroundColor: '#fff', 
            color: '#000', 
            textDecoration: 'none',
            padding: '12px 30px', 
            borderRadius: '12px', 
            fontSize: '14px', 
            border: '1px solid #f0f0f0',
            fontWeight: '700'
          }}>Cancel</Link>
          <button style={{ 
            backgroundColor: '#000', 
            color: '#fff', 
            border: 'none', 
            padding: '12px 30px', 
            borderRadius: '12px', 
            fontSize: '14px', 
            fontWeight: '700', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            Create Coupon
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: '30px', alignItems: 'start' }}>
        {/* Left Column */}
        <div>
          {/* Coupon Information */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Coupon Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Coupon Code <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" placeholder="Enter coupon code" style={inputStyle} value={formData.code} onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})} />
                <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#bbb', fontWeight: '600' }}>Customers will enter this code at checkout</p>
              </div>
              <div>
                <label style={labelStyle}>Coupon Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" placeholder="Enter coupon name" style={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#bbb', fontWeight: '600' }}>For your reference only</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Coupon Type <span style={{ color: '#ef4444' }}>*</span></label>
                <select style={inputStyle} value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                  <option value="ORDER">ORDER</option>
                  <option value="PRODUCT">PRODUCT</option>
                  <option value="CATEGORY">CATEGORY</option>
                  <option value="FIRST_ORDER">FIRST_ORDER</option>
                  <option value="SHIPPING">SHIPPING</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Discount Type <span style={{ color: '#ef4444' }}>*</span></label>
                <select style={inputStyle} value={formData.discountType} onChange={e => setFormData({...formData, discountType: e.target.value, discountValue: e.target.value === 'FREE_SHIPPING' ? '0' : formData.discountValue})}>
                  <option value="PERCENTAGE">PERCENTAGE</option>
                  <option value="FLAT">FLAT</option>
                  <option value="FREE_SHIPPING">FREE_SHIPPING</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
              <div>
                <label style={labelStyle}>Discount Value <span style={{ color: '#ef4444' }}>*</span></label>
                <div style={{ position: 'relative' }}>
                   <input 
                    type="number" 
                    placeholder="Enter discount value" 
                    style={{ ...inputStyle, paddingRight: '120px' }} 
                    disabled={formData.discountType === 'FREE_SHIPPING'}
                    value={formData.discountValue} 
                    onChange={e => setFormData({...formData, discountValue: e.target.value})} 
                  />
                  <div style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', fontSize: '12px', fontWeight: '700', color: '#999' }}>
                    {formData.discountType === 'PERCENTAGE' ? '% (Percentage)' : (formData.discountType === 'FLAT' ? '₹ (Flat Amount)' : 'Disabled')}
                  </div>
                </div>
                <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#bbb', fontWeight: '600' }}>For percentage enter value like 10 for 10% off</p>
              </div>
              <div>
                <label style={labelStyle}>Minimum Order Amount (₹)</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', fontWeight: '800', fontSize: '14px' }}>₹</div>
                  <input type="number" placeholder="Enter minimum order amount" style={{ ...inputStyle, paddingLeft: '35px' }} value={formData.minOrder} onChange={e => setFormData({...formData, minOrder: e.target.value})} />
                </div>
                <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#bbb', fontWeight: '600' }}>Set minimum cart value to apply coupon</p>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Description (Optional)</label>
              <textarea rows="4" placeholder="Enter coupon description" style={{ ...inputStyle, resize: 'none' }} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              <p style={{ margin: '8px 0 0 0', textAlign: 'right', fontSize: '11px', color: '#bbb', fontWeight: '600' }}>{formData.description.length}/200</p>
            </div>
          </div>

          {/* Validity & Usage */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Validity & Usage</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Valid From <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="date" style={inputStyle} value={formData.validFrom} onChange={e => setFormData({...formData, validFrom: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Valid To <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="date" style={inputStyle} value={formData.validTo} onChange={e => setFormData({...formData, validTo: e.target.value})} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
              <div>
                <label style={labelStyle}>Usage Limit (Optional)</label>
                <input type="number" placeholder="Enter total usage limit" style={inputStyle} value={formData.usageLimit} onChange={e => setFormData({...formData, usageLimit: e.target.value})} />
                <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#bbb', fontWeight: '600' }}>Leave empty for unlimited usage</p>
              </div>
              <div>
                <label style={labelStyle}>Usage Limit Per User (Optional)</label>
                <input type="number" placeholder="Enter usage limit per user" style={inputStyle} value={formData.perUserLimit} onChange={e => setFormData({...formData, perUserLimit: e.target.value})} />
                <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#bbb', fontWeight: '600' }}>How many times a user can use this coupon</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '50px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                 <div style={toggleStyle(formData.isActive)} onClick={() => setFormData({...formData, isActive: !formData.isActive})}>
                    <div style={toggleCircleStyle(formData.isActive)}></div>
                 </div>
                 <div>
                   <p style={{ margin: 0, fontSize: '13px', fontWeight: '700' }}>Active Now</p>
                   <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#999', fontWeight: '500' }}>Enable this coupon immediately</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div>
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Coupon Preview</h3>
            <div style={{ 
              backgroundColor: '#fafafa', 
              borderRadius: '24px', 
              padding: '30px', 
              border: '1px dashed #e2e8f0',
              textAlign: 'center'
            }}>
              <div style={{ width: '60px', height: '60px', backgroundColor: '#f1e4d8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '24px' }}>
                {formData.discountType === 'PERCENTAGE' ? '%' : (formData.discountType === 'FLAT' ? '₹' : '🚚')}
              </div>
              <h4 style={{ margin: 0, fontSize: '24px', fontWeight: '900', letterSpacing: '1px' }}>{formData.code || 'COUPON CODE'}</h4>
              <p style={{ margin: '5px 0 20px 0', fontSize: '14px', color: '#666', fontWeight: '600' }}>{formData.name || 'Coupon Name'}</p>
              
              <div style={{ backgroundColor: '#fff', borderRadius: '15px', padding: '8px 20px', display: 'inline-block', marginBottom: '30px', border: '1px solid #f0f0f0', fontWeight: '800', fontSize: '14px', color: '#e2a77f' }}>
                {formData.discountType === 'PERCENTAGE' ? `${formData.discountValue || '0'}% OFF` : (formData.discountType === 'FLAT' ? `₹${formData.discountValue || '0'} OFF` : 'FREE SHIPPING')}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700' }}>
                   <span style={{ color: '#999' }}>Minimum Order</span>
                   <span>₹{formData.minOrder || '0'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700' }}>
                   <span style={{ color: '#999' }}>Valid From</span>
                   <span>{formData.validFrom || '---'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700' }}>
                   <span style={{ color: '#999' }}>Valid To</span>
                   <span>{formData.validTo || '---'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700' }}>
                   <span style={{ color: '#999' }}>Usage Limit</span>
                   <span>{formData.usageLimit || 'Unlimited'}</span>
                </div>
              </div>

              <div style={{ marginTop: '30px' }}>
                <span style={{ 
                  backgroundColor: formData.isActive ? '#eefcf5' : '#f5f5f5', 
                  color: formData.isActive ? '#10b981' : '#999', 
                  padding: '6px 20px', 
                  borderRadius: '10px', 
                  fontSize: '11px', 
                  fontWeight: '800' 
                }}>{formData.isActive ? 'Active' : 'Inactive'}</span>
              </div>
            </div>
          </div>

          <div style={{ ...cardStyle, padding: '20px' }}>
             <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', fontWeight: '800' }}>Tips</h4>
             <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: '12px', color: '#666', lineHeight: '1.8', fontWeight: '500' }}>
               <li>Use short and easy to remember code.</li>
               <li>Set minimum order value to increase average order value.</li>
               <li>Usage limit helps to control the total discount.</li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
