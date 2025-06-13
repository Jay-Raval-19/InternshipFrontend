
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
import gsap from 'gsap';

const Index = () => {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [componentsLoaded, setComponentsLoaded] = useState(false);

  // Initialize GSAP only after components are loaded
  const { refresh } = useGSAP();

  useEffect(() => {
    // Wait for all components to mount before initializing animations
    const timer = setTimeout(() => {
      setComponentsLoaded(true);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!componentsLoaded) return;

    // Initialize animations after components are loaded
    const initializeAnimations = () => {
      // Ensure all elements exist before animating
      const sections = document.querySelectorAll('.animate-section');
      if (sections.length === 0) {
        console.log('No animate-section elements found, retrying...');
        setTimeout(initializeAnimations, 100);
        return;
      }

      // Force initial state
      gsap.utils.toArray('.animate-section').forEach((section: any) => {
        if (section) {
          gsap.set(section, {
            opacity: 0,
            y: 30
          });
        }
      });

      // Force initial animations for visible sections
      const visibleSections = gsap.utils.toArray('.animate-section').filter((section: any) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= window.innerHeight &&
          rect.right <= window.innerWidth
        );
      });

      visibleSections.forEach((section: any) => {
        if (section) {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true
          });

          // Animate child elements
          const childElements = section.querySelectorAll('.section-title, .animate-element');
          childElements.forEach((element: any) => {
            if (element) {
              gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
                overwrite: true,
                delay: 0.2
              });
            }
          });
        }
      });

      ScrollTrigger.refresh(true);
    };

    // Initial setup with delay to ensure DOM is ready
    const setupTimer = setTimeout(initializeAnimations, 100);

    // Handle scroll events
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollUp(scrollY > 100);
      requestAnimationFrame(() => {
        ScrollTrigger.refresh(true);
      });
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => ScrollTrigger.refresh(true));
    window.addEventListener('load', initializeAnimations);

    // Initial check for scroll position
    handleScroll();

    // Cleanup function
    return () => {
      clearTimeout(setupTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', () => ScrollTrigger.refresh(true));
      window.removeEventListener('load', initializeAnimations);
      // Cleanup ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      // Reset all animations
      gsap.utils.toArray('.animate-section').forEach((section: any) => {
        if (section) {
          gsap.set(section, { clearProps: "all" });
        }
      });
    };
  }, [componentsLoaded]);

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
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  return (
    <>
      <div className="index-page">
        <Header />
        <Hero />
        <div className="animate-section">
          <AIAgent />
        </div>
        <div className="animate-section" id="how-it-works">
          <HowItWorks />
        </div>
        <div id="community" className="animate-section">
          <Community />
        </div>
        <div id="about" className="animate-section">
          <About />
        </div>
        <div id="contact" className="animate-section">
          <Contact />
        </div>
      </div>
      <Chatbot />
      {showScrollUp && (
        <div className="scroll-up-btn-container">
          <button
            className="scroll-up-btn"
            onClick={handleScrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </button>
        </div>
      )}
    </>
  );
};

export default Index;
