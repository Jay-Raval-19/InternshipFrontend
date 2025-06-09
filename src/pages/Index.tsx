
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Community from '../components/Community';
import About from '../components/About';
import Contact from '../components/Contact';
import Chatbot from '../components/Chatbot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
