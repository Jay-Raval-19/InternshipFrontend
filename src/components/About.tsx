
import React from 'react';
import { Shield, Globe, Users, Zap } from 'lucide-react';
import './About.css';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "All suppliers are GST-verified and undergo rigorous quality checks to ensure reliable partnerships."
    },
    {
      icon: Globe,
      title: "Industry Expertise",
      description: "Deep understanding of chemical industry requirements, regulations, and market dynamics."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building a collaborative ecosystem where buyers and suppliers grow together."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Leveraging AI and automation to make procurement faster, smarter, and more efficient."
    }
  ];

  return (
    <section className="about">
      <div className="about-container">
        <div className="about-content">
          <div className="about-header">
            <h2 className="about-title">About Tradio</h2>
            <p className="about-subtitle">
              Revolutionizing chemical procurement through AI-powered supplier matching and intelligent quotation management
            </p>
          </div>

          <div className="about-main">
            <div className="about-text">
              <h3 className="about-text-title">
                Transforming Chemical Industry Procurement
              </h3>
              <div className="about-text-content">
                <p>
                  Tradio was born from a simple observation: chemical procurement in India was fragmented, 
                  time-consuming, and lacked transparency. Traditional methods of finding suppliers often 
                  resulted in limited options, delayed responses, and inefficient comparison processes.
                </p>
                <p>
                  Our AI-powered platform bridges this gap by creating an intelligent ecosystem where 
                  chemical buyers can access verified suppliers instantly, receive competitive quotations, 
                  and make informed decisions based on comprehensive comparisons.
                </p>
                <p>
                  Currently in our early stage, we're proud to offer our services completely free to help 
                  businesses optimize their procurement processes and build stronger supplier relationships.
                </p>
              </div>
            </div>
            
            <div className="about-image-container">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center" 
                alt="Chemical Industry"
                className="about-image"
              />
            </div>
          </div>

          <div className="about-values">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon-container">
                  <value.icon className="value-icon" />
                </div>
                <h4 className="value-title">{value.title}</h4>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>

          <div className="about-cta">
            <h3 className="cta-title">
              Why Choose Tradio?
            </h3>
            <div className="cta-stats">
              <div>
                <div className="cta-stat-value">500+</div>
                <p className="cta-stat-label">Verified Chemical Suppliers</p>
              </div>
              <div>
                <div className="cta-stat-value">24hrs</div>
                <p className="cta-stat-label">Average Response Time</p>
              </div>
              <div>
                <div className="cta-stat-value">100%</div>
                <p className="cta-stat-label">Free for All Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
