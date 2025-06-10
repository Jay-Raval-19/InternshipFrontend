
import React from 'react';
import { ArrowRight, Zap, Bot, Globe, Target } from 'lucide-react';
import './AIAgent.css';

const AIAgent = () => {
  const handleGetStarted = () => {
    window.open('https://wa.me/1234567890?text=Hello%20Tradio,%20I%20would%20like%20to%20get%20started', '_blank');
  };

  return (
    <section className="ai-agent">
      {/* Background elements */}
      <div className="ai-agent-bg-pattern"></div>
      <div className="ai-agent-blob ai-agent-blob-1"></div>
      <div className="ai-agent-blob ai-agent-blob-2"></div>
      <div className="ai-agent-blob ai-agent-blob-3"></div>

      <div className="ai-agent-container">
        {/* First Section - Make trade Smarter */}
        <div className="ai-agent-section trade-smarter">
          <div className="ai-agent-content">
            <div className="ai-agent-badge">
              <Bot className="badge-icon" />
              <span>India's First AI Agent</span>
            </div>
            
            <h2 className="ai-agent-title">
              Make trade <span className="title-highlight">Smarter</span>
            </h2>
            
            <p className="ai-agent-description">
              Buyer to supplier in seconds, with your personal AI trade agent.
            </p>

            <div className="ai-agent-features">
              <div className="feature-item">
                <Zap className="feature-icon" />
                <span>Lightning Fast Matching</span>
              </div>
              <div className="feature-item">
                <Globe className="feature-icon" />
                <span>Pan-India Network</span>
              </div>
              <div className="feature-item">
                <Target className="feature-icon" />
                <span>Precision Sourcing</span>
              </div>
            </div>
          </div>

          <div className="ai-agent-visual">
            <div className="ai-brain">
              <div className="brain-core"></div>
              <div className="brain-ring brain-ring-1"></div>
              <div className="brain-ring brain-ring-2"></div>
              <div className="brain-ring brain-ring-3"></div>
              <div className="neural-network">
                <div className="neural-node neural-node-1"></div>
                <div className="neural-node neural-node-2"></div>
                <div className="neural-node neural-node-3"></div>
                <div className="neural-node neural-node-4"></div>
                <div className="neural-connection neural-connection-1"></div>
                <div className="neural-connection neural-connection-2"></div>
                <div className="neural-connection neural-connection-3"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Section - B2B Connections */}
        <div className="ai-agent-section b2b-connections">
          <div className="ai-agent-content">
            <h2 className="ai-agent-title-large">
              With us, B2B connections are <span className="title-highlight">effortless</span>
            </h2>
            
            <p className="ai-agent-description-large">
              Automated sourcing, smart matching, and seamless deal execution
              all in one AI-powered platform.
            </p>

            <button 
              onClick={handleGetStarted}
              className="ai-agent-cta-button"
            >
              Get Started
              <ArrowRight className="cta-icon" />
            </button>
          </div>

          <div className="connection-visual">
            <div className="connection-hub">
              <div className="hub-center">
                <Bot className="hub-icon" />
              </div>
              <div className="connection-line connection-line-1"></div>
              <div className="connection-line connection-line-2"></div>
              <div className="connection-line connection-line-3"></div>
              <div className="connection-line connection-line-4"></div>
              <div className="connection-node connection-node-1">Buyers</div>
              <div className="connection-node connection-node-2">Suppliers</div>
              <div className="connection-node connection-node-3">Logistics</div>
              <div className="connection-node connection-node-4">Payment</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAgent;
