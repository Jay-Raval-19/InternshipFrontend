import React from 'react';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/1234567890?text=Hello%20Tradio,%20I%20have%20a%20question', '_blank');
  };

  return (
    <section className="contact">
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-header">
            <h2 className="contact-title">Get in Touch</h2>
            <p className="contact-subtitle">
              Have questions about Tradio? We're here to help you streamline your chemical procurement process
            </p>
          </div>

          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-card">
              <h3 className="contact-form-title">Send us a Message</h3>
              <form className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      First Name
                    </label>
                    <input type="text" className="form-input" placeholder="John" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Last Name
                    </label>
                    <input type="text" className="form-input" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Email
                  </label>
                  <input 
                    type="email" 
                    className="form-input"
                    placeholder="john@company.com" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Company
                  </label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="Your Company Name" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Message
                  </label>
                  <textarea 
                    className="form-textarea"
                    placeholder="Tell us about your procurement needs or any questions you have..."
                    rows={4}
                  />
                </div>
                
                <button type="submit" className="submit-button">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info">
              <div className="info-card">
                <h3 className="info-card-title">Contact Information</h3>
                <div className="info-list">
                  <div className="info-item">
                    <div className="info-icon-container">
                      <MessageCircle className="info-icon" />
                    </div>
                    <div className="info-content">
                      <p className="info-label">WhatsApp</p>
                      <p className="info-value">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon-container">
                      <Mail className="info-icon" />
                    </div>
                    <div className="info-content">
                      <p className="info-label">Email</p>
                      <p className="info-value">hello@tradio.ai</p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon-container">
                      <Phone className="info-icon" />
                    </div>
                    <div className="info-content">
                      <p className="info-label">Phone</p>
                      <p className="info-value">+91 22 1234 5678</p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon-container">
                      <MapPin className="info-icon" />
                    </div>
                    <div className="info-content">
                      <p className="info-label">Address</p>
                      <p className="info-value">Mumbai, Maharashtra, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="whatsapp-card">
                <h3 className="whatsapp-title">Quick Start on WhatsApp</h3>
                <p className="whatsapp-description">
                  Ready to get started? Send us your first procurement requirement directly on WhatsApp and experience the Tradio difference.
                </p>
                <button 
                  onClick={handleWhatsApp}
                  className="whatsapp-button"
                >
                  <MessageCircle className="whatsapp-button-icon" />
                  Start on WhatsApp
                </button>
              </div>

              <div className="supplier-card">
                <h3 className="supplier-title">For Suppliers</h3>
                <p className="supplier-description">
                  Want to join our supplier network? Register your chemical business and start receiving qualified leads.
                </p>
                <button className="supplier-button">
                  Register as Supplier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
