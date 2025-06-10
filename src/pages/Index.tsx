
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Community from '../components/Community';
import About from '../components/About';
import Contact from '../components/Contact';
import Chatbot from '../components/Chatbot';
import { animationController } from '../animations/AnimationController';
import './Index.css';

const Index = () => {
  useEffect(() => {
    // Initialize animations when component mounts
    animationController.init();

    // Cleanup function
    return () => {
      animationController.destroy();
    };
  }, []);

  useEffect(() => {
    // Refresh ScrollTrigger when route changes or content updates
    const timer = setTimeout(() => {
      animationController.refresh();
    }, 100);

    return () => clearTimeout(timer);
  });

  return (
    <div className="index-page">
      <Header />
      <Hero />
      <HowItWorks />
      <div id="community">
        <Community />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Chatbot />
    </div>
  );
};

export default Index;
