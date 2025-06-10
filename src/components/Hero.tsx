import React from 'react';
import { MessageCircle, Play } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const handleStartInquiry = () => {
    window.open('https://wa.me/1234567890?text=Hello%20Tradio,%20I%20would%20like%20to%20make%20an%20inquiry', '_blank');
  };

  return (
    <section className="hero">
      {/* Subtle background elements */}
      <div className="hero-blob hero-blob-1"></div>
      <div className="hero-blob hero-blob-2"></div>

      <div className="hero-container">
        <div className="hero-content">
          {/* Main Content */}
          <div className="hero-content-main">
            <h1 className="hero-title">
              Transform Your
              <span className="hero-title-gradient">
                Chemical Sourcing
              </span>
            </h1>
            
            <p className="hero-description">
              Connect with 500+ verified suppliers instantly. Get competitive quotations and close deals faster than ever.
            </p>
            
            {/* CTA Buttons */}
            <div className="hero-buttons">
              <button 
                onClick={handleStartInquiry}
                className="hero-button-primary"
              >
                <MessageCircle className="button-icon button-icon-primary" />
                Start Your Inquiry
              </button>
              
              <button 
                className="hero-button-secondary"
              >
                <Play className="button-icon button-icon-secondary" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Simple Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">500+</div>
              <div className="stat-label">Verified Suppliers</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">24hrs</div>
              <div className="stat-label">Response Time</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">100%</div>
              <div className="stat-label">Free Platform</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">98%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
