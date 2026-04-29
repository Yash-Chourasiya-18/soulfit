"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(autoSlideInterval);
  }, []);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  const goToSlide = (n) => setCurrentSlide(n);

  return (
    <section className="hero-section hero-rounded-section">
      <div className="hero-slider-wrapper">
        <div className="hero-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          <div className="hero-slide hero-slide-img" style={{ backgroundImage: "url('/slider1.png')" }}>
            <div className="hero-content">
              <p className="hero-tag" style={{ color: 'var(--black)', opacity: 0.8 }}>NEW SEASON</p>
              <h1 className="hero-title" style={{ color: 'var(--black)' }}>Elevate Your<br/>Everyday Style</h1>
              <Link href="/shop" className="hero-btn">SHOP NOW</Link>
            </div>
          </div>
          <div className="hero-slide hero-slide-img" style={{ backgroundImage: "url('/slider2.png')" }}>
            <div className="hero-content">
              <p className="hero-tag" style={{ color: 'var(--black)', opacity: 0.8 }}>SOULFIT EXCLUSIVE</p>
              <h1 className="hero-title" style={{ color: 'var(--black)' }}>Confidence In<br/>Every Step</h1>
              <Link href="/shop?category=Pant" className="hero-btn">EXPLORE PANTS</Link>
            </div>
          </div>
          <div className="hero-slide hero-slide-img" style={{ backgroundImage: "url('/slider3.png')" }}>
            <div className="hero-content">
              <p className="hero-tag" style={{ color: 'var(--black)', opacity: 0.8 }}>PREMIUM COLLECTION</p>
              <h1 className="hero-title" style={{ color: 'var(--black)' }}>Threads That<br/>Connect Souls</h1>
              <Link href="/shop" className="hero-btn">DISCOVER MORE</Link>
            </div>
          </div>
        </div>
        <button className="hero-arrow hero-prev hero-arrow-dark" onClick={prevSlide}>&#8249;</button>
        <button className="hero-arrow hero-next hero-arrow-dark" onClick={nextSlide}>&#8250;</button>
        <div className="hero-dots hero-dots-inner">
          <span className={`hero-dot ${currentSlide === 0 ? 'active' : ''}`} onClick={() => goToSlide(0)}></span>
          <span className={`hero-dot ${currentSlide === 1 ? 'active' : ''}`} onClick={() => goToSlide(1)}></span>
          <span className={`hero-dot ${currentSlide === 2 ? 'active' : ''}`} onClick={() => goToSlide(2)}></span>
        </div>
      </div>
    </section>
  );
}
