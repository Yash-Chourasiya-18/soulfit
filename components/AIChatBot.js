"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { getSmartResponse } from './chatEngine';
import './AIChatBot.css';

function ProductCard({ p }) {
  return (
    <a href={`/product/${p.id}`} className="ai-product-card">
      <img src={`/${p.img}`} alt={p.name} className="ai-product-img" />
      <div className="ai-product-info">
        <div className="ai-product-name">{p.name}</div>
        <div className="ai-product-price">
          <span className="ai-price-now">₹{p.price}</span>
          <span className="ai-price-old">₹{p.mrp}</span>
          <span className="ai-price-disc">{p.disc}% OFF</span>
        </div>
        {p.soon && <span className="ai-coming-soon">Coming Soon</span>}
      </div>
    </a>
  );
}

function renderText(text) {
  return text.split('\n').map((line, i, arr) => (
    <span key={i}>
      {line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={j}>{part.slice(2,-2)}</strong>;
        if (part.startsWith('*') && part.endsWith('*')) return <em key={j}>{part.slice(1,-1)}</em>;
        return part;
      })}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

const INITIAL_MSG = { id:1, isBot:true, text:"Hey! 👋 I'm the **Soul Fit AI** — your personal shopping assistant. I know everything about our products, prices, offers & policies. How can I help?", quickReplies:["Show all products","Best sellers","New arrivals","Current offers","Shipping info"] };

export default function AIChatBot() {
  const { isChatSidebarOpen, setIsChatSidebarOpen, closeAllOverlays } = useAppContext();
  const [messages, setMessages] = useState([INITIAL_MSG]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isChatSidebarOpen) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isChatSidebarOpen]);

  const send = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setHasInteracted(true);
    setInput('');

    const userMsg = { id: Date.now(), isBot: false, text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const delay = 600 + Math.random() * 700;
    setTimeout(() => {
      const response = getSmartResponse(trimmed, { isReturning: hasInteracted });
      const botMsg = { id: Date.now()+1, isBot: true, ...response };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      if (!isChatSidebarOpen) setUnread(u => u + 1);
    }, delay);
  };

  return (
    <div className="ai-chat-wrapper">
      {isChatSidebarOpen && (
        <div className="ai-chat-window">
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-chat-header-info">
              <div className="ai-chat-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                  <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
                  <circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/>
                </svg>
              </div>
              <div className="ai-chat-title">
                <h3>Soul Fit AI</h3>
                <p><span className="ai-online-dot"></span>Online · Smart Assistant</p>
              </div>
            </div>
            <div style={{display:'flex',gap:8}}>
              <button className="ai-chat-close" onClick={() => { setMessages([INITIAL_MSG]); setHasInteracted(false); }} title="Reset chat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
              </button>
              <button className="ai-chat-close" onClick={() => setIsChatSidebarOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="ai-chat-messages">
            {messages.map(msg => (
              <div key={msg.id}>
                {msg.isBot && (
                  <div className="ai-bot-row">
                    <div className="ai-bot-avatar">AI</div>
                    <div className="ai-chat-msg ai-chat-bot">
                      {renderText(msg.text)}
                      {msg.products?.length > 0 && (
                        <div className="ai-products-scroll">
                          {msg.products.map(p => <ProductCard key={p.id} p={p} />)}
                        </div>
                      )}
                      {msg.quickReplies?.length > 0 && (
                        <div className="ai-quick-replies" style={{marginTop:10}}>
                          {msg.quickReplies.map(qr => (
                            <button key={qr} className="ai-quick-reply-btn" onClick={() => send(qr)}>{qr}</button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {!msg.isBot && (
                  <div className="ai-user-row">
                    <div className="ai-chat-msg ai-chat-user">{msg.text}</div>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="ai-bot-row">
                <div className="ai-bot-avatar">AI</div>
                <div className="ai-chat-typing">
                  <div className="ai-chat-dot"/><div className="ai-chat-dot"/><div className="ai-chat-dot"/>
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Input */}
          <div className="ai-chat-input-area">
            <input
              ref={inputRef}
              type="text"
              className="ai-chat-input"
              placeholder="Ask about products, offers, delivery..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send(input)}
            />
            <button className="ai-chat-send" onClick={() => send(input)} disabled={!input.trim()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button className="ai-chat-btn" onClick={() => isChatSidebarOpen ? setIsChatSidebarOpen(false) : setIsChatSidebarOpen(true)}>
        {isChatSidebarOpen
          ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        }
        {unread > 0 && !isChatSidebarOpen && <span className="ai-unread-badge">{unread}</span>}
      </button>
    </div>
  );
}
