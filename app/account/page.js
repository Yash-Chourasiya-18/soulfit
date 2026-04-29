"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../context/AppContext';

export default function AccountPage() {
  const { currentUser, orderHistory, openAuth } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      openAuth();
      router.push('/');
    }
  }, [currentUser, openAuth, router]);

  if (!currentUser) return null;

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <h2 className="section-title">My Account</h2>
      <div style={{ background: 'var(--cream)', padding: '24px', borderRadius: '12px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ width: '60px', height: '60px', background: 'var(--black)', color: 'var(--white)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 style={{ marginBottom: '4px' }}>{currentUser.name}</h3>
          <p style={{ color: 'gray', fontSize: '14px' }}>{currentUser.email}</p>
        </div>
      </div>
      
      <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>Order History</h3>
      <div id="orderHistoryList">
        {orderHistory.length === 0 ? (
          <p style={{ color: 'gray' }}>You have no past orders.</p>
        ) : (
          orderHistory.map((o, idx) => (
            <div key={idx} style={{ border: '1px solid var(--light-gray)', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong>{o.id}</strong>
                <span style={{ color: o.status === 'Delivered' ? '#2e7d32' : '#f57c00', fontWeight: 600 }}>{o.status}</span>
              </div>
              <p style={{ color: 'gray', fontSize: '13px', marginBottom: '8px' }}>Date: {o.date}</p>
              <p style={{ fontSize: '14px', fontWeight: 600 }}>Total: ₹{o.total}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
