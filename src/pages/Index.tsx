
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AIAgent from '../components/AIAgent';
import HowItWorks from '../components/HowItWorks';
import Community from '../components/Community';
import About from '../components/About';
import Contact from '../components/Contact';
import Chatbot from '../components/Chatbot';
import { useGSAP } from '../hooks/useGSAP';
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Index.css';

const Index = () => {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [componentsLoaded, setComponentsLoaded] = useState(false);

  // Initialize GSAP with immediate visibility fallback
  const { refresh } = useGSAP();

  useEffect(() => {
    console.log('Index: Components mounting...');
    // Ensure content is visible immediately
    const sections = document.querySelectorAll('.animate-section');
    sections.forEach(section => {
      (section as HTMLElement).style.opacity = '1';
      (section as HTMLElement).style.transform = 'translateY(0)';
    });

    // Mark components as loaded quickly
    const timer = setTimeout(() => {
      setComponentsLoaded(true);
      console.log('Index: Components loaded, initializing animations...');
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log('Index: Setting up scroll handlers...');

    // Handle scroll events
    const handleScroll = () => {
      const scrollY = window.scrollY;
      console.log('Scroll position:', scrollY);
      setShowScrollUp(scrollY > 300); // Lowered threshold for easier testing
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => ScrollTrigger.refresh(true));

    // Initial check for scroll position
    handleScroll();

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', () => ScrollTrigger.refresh(true));
    };
  }, []); // Removed dependency on componentsLoaded to ensure it always runs

  // Add a separate effect for handling keyboard navigation
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const keys = [
        'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ' // space
      ];
      if (keys.includes(e.key)) {
        setTimeout(() => {
          ScrollTrigger.refresh();
          ScrollTrigger.update();
        }, 50);
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  const handleScrollToTop = () => {
    console.log('Scrolling to top...');
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  console.log('Index: Rendering with showScrollUp:', showScrollUp);

  return (
    <>
      <div className="index-page">
        <Header />
        <Hero />
        <div className="animate-section" style={{ opacity: 1, transform: 'translateY(0)' }}>
          <AIAgent />
        </div>
        <div className="animate-section" id="how-it-works" style={{ opacity: 1, transform: 'translateY(0)' }}>
          <HowItWorks />
        </div>
        <div id="community" className="animate-section" style={{ opacity: 1, transform: 'translateY(0)' }}>
          <Community />
        </div>
        <div id="about" className="animate-section" style={{ opacity: 1, transform: 'translateY(0)' }}>
          <About />
        </div>
        <div id="contact" className="animate-section" style={{ opacity: 1, transform: 'translateY(0)' }}>
          <Contact />
        </div>
      </div>
      <Chatbot />
      
      {/* Back to top button - always render but conditionally show */}
      <div className={`scroll-up-btn-container ${showScrollUp ? 'visible' : 'hidden'}`}>
        <button
          className="scroll-up-btn"
          onClick={handleScrollToTop}
          aria-label="Scroll to top"
          style={{ 
            opacity: showScrollUp ? 1 : 0,
            pointerEvents: showScrollUp ? 'auto' : 'none',
            transform: showScrollUp ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          <ArrowUp size={24} />
        </button>
      </div>
    </>
  );
};

export default Index;
