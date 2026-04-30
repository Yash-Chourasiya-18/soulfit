"use client";

import React, { useState } from 'react';
import './faq.css';

const FAQ_DATA = [
  {
    q: "1. What products do you offer?",
    a: "We offer a curated range of clothing designed with a focus on quality, comfort, and style. Our collection includes premium t-shirts, shirts, track pants, and cargo pants crafted for the perfect fit."
  },
  {
    q: "2. How can I place an order?",
    a: "You can place an order directly through our website by adding items to your cart and following the checkout process. We also accept orders through our official social media platforms."
  },
  {
    q: "3. What payment methods do you accept?",
    a: "We accept payments via UPI (GPay, PhonePe, Paytm), Debit/Credit cards, Net Banking, and other secure payment options available via our Razorpay gateway."
  },
  {
    q: "4. Do you offer Cash on Delivery (COD)?",
    a: "Currently, we only accept prepaid orders to ensure the fastest processing and delivery times. This helps us maintain our premium service standards."
  },
  {
    q: "5. How long does shipping take?",
    a: "Orders are typically processed within 2–5 business days. Delivery usually takes 3–10 business days depending on your location and the shipping method selected."
  },
  {
    q: "6. How can I track my order?",
    a: "Once your order is shipped, you will receive a tracking link via SMS, email, or WhatsApp to monitor your delivery status in real-time. You can also track it on our 'Track Order' page."
  },
  {
    q: "7. What is your return and exchange policy?",
    a: "Returns and exchanges are only applicable if the product is defective, damaged, or incorrect at the time of delivery. You must notify us within 48 hours of delivery with photo or video proof. Products must be unused, unwashed, and with original tags intact. We do not accept returns for size issues, color preferences, or change of mind."
  },
  {
    q: "8. What should I do if I receive a damaged or wrong product?",
    a: "Please contact us within 48 hours of delivery with proper proof (photos/videos). After verification, we will arrange a replacement or refund immediately."
  },
  {
    q: "9. Can I cancel my order?",
    a: "Orders can be canceled only before they are dispatched. Once an order has been shipped, cancellations, modifications, or address changes will not be accepted."
  },
  {
    q: "10. Do you restock sold-out items?",
    a: "Many of our popular items are restocked based on demand. Follow us on Instagram for the latest updates on restocks and new drops."
  },
  {
    q: "11. How do I choose the right size?",
    a: "We highly recommend checking our detailed size chart available on every product page before placing an order. If you're unsure, feel free to contact us for guidance."
  },
  {
    q: "12. How can I contact you?",
    a: "For any queries or support, reach out to us via:\n📧 Email: support@soulfit.com\n📱 Instagram: @soulfit.in_"
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-page">
      <div className="faq-container">
        <div className="faq-header">
          <h1 className="faq-title">Frequently Asked Questions</h1>
          <p className="faq-subtitle">Everything you need to know about Soul Fit products and policies.</p>
        </div>

        <div className="faq-list">
          {FAQ_DATA.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'active' : ''}`}
            >
              <div 
                className="faq-question" 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{item.q}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="faq-icon">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-footer">
          <p>Still have questions? <a href="/support">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
}
