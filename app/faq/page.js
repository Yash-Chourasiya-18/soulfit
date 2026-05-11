"use client";

import React, { useState } from 'react';
import './faq.css';

const FAQ_DATA = [
  {
    q: "1. What products do you offer?",
    a: "We offer a curated range of luxury furniture designed with a focus on quality, elegance, and comfort. Our collection includes premium sofas, dining sets, designer lighting, and bespoke bedroom furniture."
  },
  {
    q: "2. How can I place an order?",
    a: "You can place an order directly through our website by adding your favorite pieces to the cart and following the secure checkout process. We also offer personalized consultations."
  },
  {
    q: "3. What payment methods do you accept?",
    a: "We accept payments via UPI, Debit/Credit cards, Net Banking, and other secure options. For large furniture orders, we offer flexible payment plans via our partners."
  },
  {
    q: "4. Do you offer Cash on Delivery (COD)?",
    a: "Due to the high-value and custom nature of our furniture, we only accept prepaid orders to ensure the highest standards of handling and delivery."
  },
  {
    q: "5. How long does shipping take?",
    a: "Furniture orders are typically dispatched within 7–14 business days. Delivery times vary based on your location and the complexity of the piece (bespoke items may take longer)."
  },
  {
    q: "6. How can I track my order?",
    a: "Once your order is dispatched, you will receive real-time tracking updates via SMS, email, and WhatsApp. You can also monitor your order status on our dedicated 'Track Order' page."
  },
  {
    q: "7. What is your return and exchange policy?",
    a: "Returns are accepted if the furniture is defective or damaged at the time of delivery. You must notify us within 48 hours with proof. Since our pieces are built to order, we do not accept returns for dimension issues or change of mind."
  },
  {
    q: "8. What should I do if I receive damaged furniture?",
    a: "Please inspect your furniture at the time of delivery. If you notice any damage, report it to the delivery team immediately and contact us with proof within 48 hours for a swift resolution."
  },
  {
    q: "9. Can I customize my furniture?",
    a: "Yes! Many of our pieces offer customization in terms of fabrics, finishes, and dimensions. Contact our design experts for a personalized consultation."
  },
  {
    q: "10. Do you provide installation?",
    a: "Absolutely. We provide professional white-glove delivery and installation for all large furniture items to ensure they are perfectly set up in your home."
  },
  {
    q: "11. How do I choose the right dimensions?",
    a: "We provide detailed dimension guides on every product page. We strongly recommend measuring your space before ordering. If you need help, our interior experts are just a call away."
  },
  {
    q: "12. How can I contact you?",
    a: "For design consultations or support, reach out to us via:\n📧 Email: support@gharsaa.in\n📱 Instagram: @gharsaa.in"
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-page">
      <div className="faq-container">
        <div className="faq-header">
          <h1 className="faq-title">Frequently Asked Questions</h1>
          <p className="faq-subtitle">Everything you need to know about Ghar Saaj products and policies.</p>
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
