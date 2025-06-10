import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FileText, MessageCircle, CheckCircle2, Truck, Package } from 'lucide-react';
import './HowItWorks.css';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showPdf, setShowPdf] = useState(false);
  const containerRef = useRef(null);
  const phoneRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const messagesRef = useRef([]);

  const steps = [
    {
      title: "Send Your Requirement",
      description: "Simply send your chemical requirement on WhatsApp",
      message: "Hi, I need 1000L of Acetic Acid for delivery in Mumbai",
      interval: 2000,
    },
    {
      title: "AI Processing",
      description: "Our AI analyzes your needs and finds the best suppliers",
      message: "Analyzing requirement...\nFinding verified suppliers...\nGenerating RFQs...",
      interval: 2000,
    },
    {
      title: "Supplier Matching",
      description: "We match you with verified suppliers in your region",
      message: "Found 5 verified suppliers in your region\nSending RFQs...",
      interval: 2000,
    },
    {
      title: "Quote Collection",
      description: "Suppliers submit their competitive quotes",
      message: "Received quotes from suppliers\nGenerating comparison report...",
      interval: 2000,
    },
    {
      title: "Comparison Report",
      description: "Get a detailed PDF report with all quotes",
      message: "Your comparison report is ready! 📄\nTap to view the detailed PDF with supplier quotes, delivery terms, and payment options.",
      interval: 2000,
    },
  ];

  useEffect(() => {
    // Initialize messages
    messagesRef.current.forEach((message) => {
      if (message) {
        gsap.set(message, { opacity: 0, y: 20 });
      }
    });

    // Simple fade in for container
    gsap.to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    });

    // Simple fade in for phone
    gsap.to(phoneRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power2.out",
      onComplete: startMessageSequence
    });

    function startMessageSequence() {
      let currentIndex = 0;

      function showNextMessage() {
        if (currentIndex >= steps.length) {
          // Reset and start over
          currentIndex = 0;
          messagesRef.current.forEach((message) => {
            if (message) {
              gsap.set(message, { opacity: 0, y: 20 });
            }
          });
          setTimeout(showNextMessage, 2000);
          return;
        }

        const message = messagesRef.current[currentIndex];
        if (message) {
          // Show current message
          gsap.to(message, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              setActiveStep(currentIndex);
              if (currentIndex === 4) {
                setShowPdf(true);
              }
              // Schedule next message
              setTimeout(() => {
                gsap.to(message, {
                  opacity: 0,
                  y: -20,
                  duration: 0.5,
                  ease: "power2.in",
                  onComplete: () => {
                    if (currentIndex === 4) {
                      setShowPdf(false);
                      // Add 1.5 second delay after PDF report message
                      setTimeout(() => {
                        currentIndex++;
                        showNextMessage();
                      }, 1500);
                    } else {
                      currentIndex++;
                      showNextMessage();
                    }
                  }
                });
              }, 1500);
            }
          });
        } else {
          currentIndex++;
          showNextMessage();
        }
      }

      // Start with a small delay to ensure first message is visible
      setTimeout(showNextMessage, 500);
    }

    return () => {
      gsap.killTweensOf(messagesRef.current);
      gsap.killTweensOf(containerRef.current);
      gsap.killTweensOf(phoneRef.current);
    };
  }, []);

  return (
    <section className="how-it-works" ref={containerRef}>
      <div className="how-it-works-container">
        <div className="how-it-works-header">
          <h2 className="how-it-works-title">How It Works</h2>
          <p className="how-it-works-subtitle">Get competitive quotes in minutes</p>
        </div>

        <div className="how-it-works-content">
          <div className="phone-demo" ref={phoneRef}>
            <div className="phone-frame">
              <div className="phone-screen">
                <div className="chat-header">
                  <div className="chat-info">
                    <div className="chat-avatar">
                      <MessageCircle />
                    </div>
                    <span className="chat-name">Tradio Assistant</span>
                    <span className="chat-status" />
                  </div>
                </div>
                <div className="chat-messages" ref={chatMessagesRef}>
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      ref={(el) => (messagesRef.current[index] = el)}
                      className={`message-bubble ${index % 2 === 0 ? 'received' : 'sent'}`}
                      style={{ opacity: 0 }} // Start with opacity 0
                    >
                      <div className="message-text">{step.message}</div>
                      <div className="message-time">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                  {showPdf && (
                    <div className="pdf-preview" ref={(el) => (messagesRef.current[steps.length] = el)}>
                      <div className="pdf-icon">
                        <FileText />
                      </div>
                      <div className="pdf-info">
                        <div className="pdf-name">Comparison Report.pdf</div>
                        <div className="pdf-size">2.4 MB</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="how-it-works-steps">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`how-it-works-step ${index === activeStep ? 'active' : ''}`}
                onClick={() => {
                  setActiveStep(index);
                  setShowPdf(index === 4);
                }}
              >
                <div className="step-icon">
                  {index === 0 && <MessageCircle />}
                  {index === 1 && <FileText />}
                  {index === 2 && <CheckCircle2 />}
                  {index === 3 && <Truck />}
                  {index === 4 && <Package />}
                </div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
                <div className="step-status" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;