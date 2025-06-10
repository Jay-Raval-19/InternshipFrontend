
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Community from '../components/Community';
import About from '../components/About';
import Contact from '../components/Contact';
import Chatbot from '../components/Chatbot';
import { useGSAP } from '../hooks/useGSAP';
import './Index.css';

const Index = () => {
  useGSAP();

  return (
    <div className="index-page">
      <Header />
      <Hero />
      <div className="animate-section">
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
      <Chatbot />
    </div>
  );
};

export default Index;
