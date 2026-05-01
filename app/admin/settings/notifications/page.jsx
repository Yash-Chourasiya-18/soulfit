"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NotificationSettings() {
  const [activeTab, setActiveTab] = useState('Notifications');
  const [notifications, setNotifications] = useState([]);
  const [emailConfig, setEmailConfig] = useState({
    senderName: '',
    senderEmail: '',
    smtpHost: '',
    smtpPort: 587,
    encryption: 'TLS',
    smtpUser: '',
    smtpPass: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmittingConfig, setIsSubmittingConfig] = useState(false);
  const [updatingRows, setUpdatingRows] = useState(new Set());
  
  const debounceTimers = useRef({});

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

  const fetchInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [notifRes, configRes] = await Promise.all([
        fetch('/api/notifications'),
        fetch('/api/email-config')
      ]);

      if (!notifRes.ok || !configRes.ok) throw new Error('Failed to load settings');

      const notifData = await notifRes.json();
      const configData = await configRes.json();
      
      setNotifications(notifData);
      if (configData._id) setEmailConfig(configData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // 1. Debounced & Optimistic Toggle Handler
  const handleToggle = (type, field, value) => {
    // a. Optimistic UI update
    const previousState = [...notifications];
    setNotifications(prev => prev.map(n => n.type === type ? { ...n, [field]: value } : n));
    
    // b. Clear existing timer for this type
    if (debounceTimers.current[type]) {
      clearTimeout(debounceTimers.current[type]);
    }

    // c. Set new debounce timer
    debounceTimers.current[type] = setTimeout(async () => {
      setUpdatingRows(prev => new Set(prev).add(type));
      
      try {
        const targetItem = notifications.find(n => n.type === type);
        const updatedItem = { ...targetItem, [field]: value };
        
        const res = await fetch('/api/notifications', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, [field]: value })
        });
        
        if (!res.ok) throw new Error();
        toast.success(`${type.replace(/_/g, ' ')} updated`);
      } catch (err) {
        toast.error(`Failed to update ${type.replace(/_/g, ' ')}`);
        // d. Rollback on failure
        setNotifications(previousState);
      } finally {
        setUpdatingRows(prev => {
          const next = new Set(prev);
          next.delete(type);
          return next;
        });
      }
    }, 300); // 300ms debounce
  };

  // 2. Email Config Save Handler
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSaveConfig = async () => {
    // Validation
    if (!emailConfig.senderName || !emailConfig.senderEmail || !emailConfig.smtpHost || !emailConfig.smtpUser || !emailConfig.smtpPass) {
      return toast.warning('Please fill all required fields');
    }
    if (!validateEmail(emailConfig.senderEmail)) {
      return toast.warning('Invalid sender email format');
    }
    if (isNaN(emailConfig.smtpPort)) {
      return toast.warning('Port must be a number');
    }

    setIsSubmittingConfig(true);
    try {
      const res = await fetch('/api/email-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailConfig)
      });
      if (!res.ok) throw new Error();
      toast.success('Email configuration saved successfully');
    } catch (err) {
      toast.error('Failed to save email configuration');
    } finally {
      setIsSubmittingConfig(false);
    }
  };

  // 3. Send Test Email Handler
  const handleSendTest = async () => {
    const email = prompt('Enter recipient email for test:');
    if (!email) return;
    if (!validateEmail(email)) return toast.error('Invalid email');

    try {
      toast.info('Sending test email...');
      const res = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetEmail: email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Test failed');
      toast.success('Test email sent successfully!');
    } catch (err) {
      toast.error(err.message);
    }
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

  const tableHeaderStyle = {
    textAlign: 'left',
    padding: '16px 20px',
    fontSize: '11px',
    fontWeight: '800',
    color: '#000',
    borderBottom: '1px solid #f0f0f0'
  };

  const tableCellStyle = {
    padding: '20px',
    fontSize: '13px',
    color: '#000',
    borderBottom: '1px solid #f9f9f9'
  };

  const Skeleton = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '30px' }}>
      <div style={cardStyle}><div style={{ height: '400px', backgroundColor: '#fafafa', borderRadius: '12px' }}></div></div>
      <div style={cardStyle}><div style={{ height: '400px', backgroundColor: '#fafafa', borderRadius: '12px' }}></div></div>
    </div>
  );

  // Remove blocking error UI
  /*
  if (error) return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h3 style={{ color: '#ef4444' }}>{error}</h3>
      <button onClick={fetchInitialData} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Retry</button>
    </div>
  );
  */

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
      <ToastContainer position="bottom-right" />
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
          <Link key={tab.name} href={tab.path} style={{ 
              padding: '10px 24px', borderRadius: '12px', border: activeTab === tab.name ? 'none' : '1px solid #f0f0f0',
              backgroundColor: activeTab === tab.name ? '#f1e4d8' : '#fff', color: activeTab === tab.name ? '#000' : '#666',
              fontSize: '13px', fontWeight: '700', textDecoration: 'none', transition: 'all 0.2s'
            }}>{tab.name}</Link>
        ))}
      </div>

      {loading ? <Skeleton /> : (
        <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '30px', alignItems: 'start' }}>
          {/* Toggles Section */}
          <div style={{ ...cardStyle, padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>Notification Settings</h3>
                  <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999', fontWeight: '500' }}>Real-time event configuration.</p>
               </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#fafafa' }}>
                  <th style={tableHeaderStyle}>Notification Type</th>
                  <th style={tableHeaderStyle}>Email</th>
                  <th style={tableHeaderStyle}>Admin Email</th>
                  <th style={tableHeaderStyle}>In-App</th>
                  <th style={tableHeaderStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((n) => (
                  <tr key={n.type} style={{ borderBottom: '1px solid #f9f9f9', position: 'relative' }}>
                    <td style={tableCellStyle}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {updatingRows.has(n.type) && <div style={{ width: '10px', height: '10px', border: '2px solid #000', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }}></div>}
                          <span style={{ fontWeight: '700' }}>{n.type.replace(/_/g, ' ')}</span>
                       </div>
                    </td>
                    <td style={tableCellStyle}><input type="checkbox" checked={n.email} onChange={(e) => handleToggle(n.type, 'email', e.target.checked)} /></td>
                    <td style={tableCellStyle}><input type="checkbox" checked={n.adminEmail} onChange={(e) => handleToggle(n.type, 'adminEmail', e.target.checked)} /></td>
                    <td style={tableCellStyle}><input type="checkbox" checked={n.inApp} onChange={(e) => handleToggle(n.type, 'inApp', e.target.checked)} /></td>
                    <td style={tableCellStyle}>
                       <span style={{ fontSize: '10px', fontWeight: '800', color: n.enabled ? '#10b981' : '#f97316', backgroundColor: n.enabled ? '#eefcf5' : '#fff7ed', padding: '2px 8px', borderRadius: '6px', marginRight: '10px' }}>{n.enabled ? 'Enabled' : 'Disabled'}</span>
                       <input type="checkbox" checked={n.enabled} onChange={(e) => handleToggle(n.type, 'enabled', e.target.checked)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <style jsx>{` @keyframes spin { to { transform: rotate(360deg); } } `}</style>
          </div>

          {/* Email Config Panel */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '16px', fontWeight: '800' }}>Email Configuration</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
               <div>
                  <label style={labelStyle}>Sender Name <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="text" value={emailConfig.senderName} onChange={e => setEmailConfig({...emailConfig, senderName: e.target.value})} style={inputStyle} />
               </div>
               <div>
                  <label style={labelStyle}>Sender Email <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="email" value={emailConfig.senderEmail} onChange={e => setEmailConfig({...emailConfig, senderEmail: e.target.value})} style={inputStyle} />
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                  <div>
                     <label style={labelStyle}>SMTP Host <span style={{ color: '#ef4444' }}>*</span></label>
                     <input type="text" value={emailConfig.smtpHost} onChange={e => setEmailConfig({...emailConfig, smtpHost: e.target.value})} style={inputStyle} />
                  </div>
                  <div>
                     <label style={labelStyle}>Port</label>
                     <input type="number" value={emailConfig.smtpPort} onChange={e => setEmailConfig({...emailConfig, smtpPort: parseInt(e.target.value)})} style={inputStyle} />
                  </div>
               </div>
               <div>
                  <label style={labelStyle}>Encryption</label>
                  <select value={emailConfig.encryption} onChange={e => setEmailConfig({...emailConfig, encryption: e.target.value})} style={inputStyle}>
                     <option value="TLS">TLS</option>
                     <option value="SSL">SSL</option>
                  </select>
               </div>
               <div>
                  <label style={labelStyle}>SMTP Username <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="text" value={emailConfig.smtpUser} onChange={e => setEmailConfig({...emailConfig, smtpUser: e.target.value})} style={inputStyle} />
               </div>
               <div>
                  <label style={labelStyle}>SMTP Password <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="password" value={emailConfig.smtpPass} onChange={e => setEmailConfig({...emailConfig, smtpPass: e.target.value})} style={inputStyle} />
               </div>
               
               <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button 
                    onClick={handleSaveConfig} 
                    disabled={isSubmittingConfig}
                    style={{ flex: 1, backgroundColor: '#000', color: '#fff', border: 'none', padding: '12px', borderRadius: '12px', fontSize: '12px', fontWeight: '800', cursor: isSubmittingConfig ? 'not-allowed' : 'pointer', opacity: isSubmittingConfig ? 0.7 : 1 }}
                  >
                    {isSubmittingConfig ? 'Saving...' : 'Save Config'}
                  </button>
                  <button 
                    onClick={handleSendTest} 
                    style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #eee', padding: '12px', borderRadius: '12px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                  >
                    Send Test
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
