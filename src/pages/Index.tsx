
import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Community from '../components/Community';
import About from '../components/About';
import Contact from '../components/Contact';
import Chatbot from '../components/Chatbot';
import ThemeSwitcher from '../components/ThemeSwitcher';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ThemeSwitcher />
      <Hero />
      <HowItWorks />
      <Community />
      <About />
      <Contact />
      <Chatbot />
    </div>
  );
};

export default Index;
