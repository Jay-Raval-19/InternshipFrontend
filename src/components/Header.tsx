
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const Header = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/1234567890?text=Hello%20Tradio,%20I%20would%20like%20to%20start%20using%20your%20WhatsApp%20agent', '_blank');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-900">Tradio</h1>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('community')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Community
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact Us
            </button>
            <button 
              onClick={handleWhatsAppClick}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Start Inquiry
            </button>
          </nav>

          {/* WhatsApp CTA Button */}
          <Button 
            onClick={handleWhatsAppClick}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 font-semibold"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Try WhatsApp Agent
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
