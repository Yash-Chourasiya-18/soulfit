"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PaymentSettings() {
  const [activeTab, setActiveTab] = useState('Payment');
  
  // 1. Payment Methods State
  const [paymentMethods, setPaymentMethods] = useState([
    { id: "razorpay", name: "Razorpay", enabled: true, type: "gateway", desc: "UPI, Cards, Netbanking", icon: "💳" },
    { id: "stripe", name: "Stripe", enabled: true, type: "gateway", desc: "International Cards, Apple Pay", icon: "🌍" },
    { id: "paypal", name: "PayPal", enabled: false, type: "gateway", desc: "PayPal Wallet, Global Payments", icon: "🅿️" },
    { id: "cod", name: "Cash on Delivery", enabled: true, type: "manual", desc: "Pay when you receive", icon: "🚚" },
    { id: "bank", name: "Bank Transfer", enabled: false, type: "manual", desc: "Direct Bank / NEFT / RTGS", icon: "🏛️" }
  ]);

  // 2. Default Payment Method State
  const [defaultMethod, setDefaultMethod] = useState("razorpay");

  // 3. Configuration State (Razorpay example)
  const [config, setConfig] = useState({
    displayName: 'Razorpay',
    keyId: 'rzp_live_xxxxxxxxxxxx',
    keySecret: '••••••••••••••••',
    webhookSecret: '••••••••••••••••',
    status: true
  });

  const [instructions, setInstructions] = useState("You will be redirected to secure payment gateway to complete your payment.");

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

  // Functionality: Toggle Switch
  const toggleMethod = (id) => {
    setPaymentMethods(prev => prev.map(m => 
      m.id === id ? { ...m, enabled: !m.enabled } : m
    ));
  };

  // Functionality: Save Data
  const handleSave = () => {
    const data = {
      methods: paymentMethods,
      default: defaultMethod,
      config,
      instructions
    };
    console.log("Saving Payment Settings:", data);
    alert("Settings saved successfully! (Check console for data structure)");
  };

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
        {/* Main Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* Methods List */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>Payment Methods</h3>
                <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999', fontWeight: '500' }}>Enable and configure your store's payment gateways.</p>
              </div>
              <button style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>+ Add Method</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
               {paymentMethods.map((method) => (
                 <div key={method.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', borderRadius: '16px', backgroundColor: '#fafafa', border: '1px solid #f0f0f0' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                       {method.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800' }}>{method.name}</h4>
                          <span style={{ 
                            fontSize: '10px', 
                            fontWeight: '800', 
                            color: method.enabled ? '#10b981' : '#999',
                            backgroundColor: method.enabled ? '#eefcf5' : '#f5f5f5',
                            padding: '2px 8px',
                            borderRadius: '6px'
                          }}>{method.enabled ? 'Active' : 'Inactive'}</span>
                       </div>
                       <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#999', fontWeight: '600' }}>{method.desc}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                       <button style={{ backgroundColor: '#fff', border: '1px solid #eee', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>Manage</button>
                       <div onClick={() => toggleMethod(method.id)} style={toggleStyle(method.enabled)}>
                          <div style={toggleCircleStyle(method.enabled)}></div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Logic Settings */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Transaction Logic</h3>
            <div style={{ marginBottom: '25px' }}>
               <label style={labelStyle}>Default Payment Method</label>
               <select 
                 value={defaultMethod} 
                 onChange={(e) => setDefaultMethod(e.target.value)} 
                 style={inputStyle}
               >
                  {paymentMethods.filter(m => m.enabled).map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
               </select>
               <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: '#999', fontWeight: '500' }}>Only active methods are selectable.</p>
            </div>
            <div>
               <label style={labelStyle}>Payment Instructions</label>
               <textarea 
                 rows="3" 
                 style={{ ...inputStyle, resize: 'none' }} 
                 value={instructions}
                 onChange={(e) => setInstructions(e.target.value)}
               ></textarea>
            </div>
            <div style={{ marginTop: '30px' }}>
               <button onClick={handleSave} style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Save Changes</button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Active Config */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
               <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>{config.displayName} Config</h3>
               <div onClick={() => setConfig({...config, status: !config.status})} style={toggleStyle(config.status)}>
                  <div style={toggleCircleStyle(config.status)}></div>
               </div>
            </div>
            <p style={{ margin: '0 0 25px 0', fontSize: '11px', color: '#999', fontWeight: '600' }}>Current gateway credentials.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
               <div>
                  <label style={labelStyle}>Display Name</label>
                  <input type="text" value={config.displayName} onChange={e => setConfig({...config, displayName: e.target.value})} style={inputStyle} />
               </div>
               <div>
                  <label style={labelStyle}>Key ID</label>
                  <input type="text" value={config.keyId} onChange={e => setConfig({...config, keyId: e.target.value})} style={inputStyle} />
               </div>
               <div>
                  <label style={labelStyle}>Key Secret</label>
                  <input type="password" value={config.keySecret} onChange={e => setConfig({...config, keySecret: e.target.value})} style={inputStyle} />
               </div>
               <div>
                  <label style={labelStyle}>Webhook Secret</label>
                  <input type="password" value={config.webhookSecret} onChange={e => setConfig({...config, webhookSecret: e.target.value})} style={inputStyle} />
               </div>
               
               <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                 <button onClick={handleSave} style={{ flex: 1, backgroundColor: '#000', color: '#fff', border: 'none', padding: '12px', borderRadius: '12px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>Save Config</button>
                 <button onClick={() => alert("Testing connection...")} style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #eee', padding: '12px', borderRadius: '12px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>Test</button>
               </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '800' }}>Payment Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
               {[
                 { label: 'Active Methods', val: paymentMethods.filter(m => m.enabled).length, icon: '✅' },
                 { label: 'Disabled Methods', val: paymentMethods.filter(m => !m.enabled).length, icon: '🚫' },
                 { label: 'Total Transactions', val: '1,243', icon: '🧾' },
                 { label: 'Total Revenue', val: '₹24,78,320', icon: '💰' },
               ].map(row => (
                 <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <span style={{ fontSize: '12px' }}>{row.icon}</span>
                       <span style={{ fontSize: '12px', color: '#999', fontWeight: '600' }}>{row.label}</span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '800' }}>{row.val}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
