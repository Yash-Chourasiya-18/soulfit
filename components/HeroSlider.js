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
          <div className="hero-slide hero-slide-img" style={{ backgroundImage: "url('/hero_sofa.png')" }}>
            <div className="hero-content">
              <p className="hero-tag" style={{ color: '#fff', opacity: 0.8 }}>NEW COLLECTION</p>
              <h1 className="hero-title" style={{ color: '#fff' }}>Luxury Comfort<br/>For Your Home</h1>
              <Link href="/shop?category=Sofa" className="hero-btn">SHOP SOFAS</Link>
            </div>
          </div>
          <div className="hero-slide hero-slide-img" style={{ backgroundImage: "url('/hero_dining.png')" }}>
            <div className="hero-content">
              <p className="hero-tag" style={{ color: '#fff', opacity: 0.8 }}>GRAND DINING</p>
              <h1 className="hero-title" style={{ color: '#fff' }}>Dine In<br/>Pure Elegance</h1>
              <Link href="/shop?category=Dining" className="hero-btn">EXPLORE DINING</Link>
            </div>
          </div>
          <div className="hero-slide hero-slide-img" style={{ backgroundImage: "url('/hero_bedroom.png')" }}>
            <div className="hero-content">
              <p className="hero-tag" style={{ color: '#fff', opacity: 0.8 }}>DREAM SPACES</p>
              <h1 className="hero-title" style={{ color: '#fff' }}>Bespoke Designs<br/>For Every Soul</h1>
              <Link href="/about" className="hero-btn">MEET OUR DESIGNERS</Link>
            </div>
          </div>
        </div>
        <button className="hero-arrow hero-prev hero-arrow-white" onClick={prevSlide}>&#8249;</button>
        <button className="hero-arrow hero-next hero-arrow-white" onClick={nextSlide}>&#8250;</button>
        <div className="hero-dots hero-dots-inner">
          <span className={`hero-dot ${currentSlide === 0 ? 'active' : ''}`} onClick={() => goToSlide(0)}></span>
          <span className={`hero-dot ${currentSlide === 1 ? 'active' : ''}`} onClick={() => goToSlide(1)}></span>
          <span className={`hero-dot ${currentSlide === 2 ? 'active' : ''}`} onClick={() => goToSlide(2)}></span>
        </div>
      </div>
    </section>
  );
}
