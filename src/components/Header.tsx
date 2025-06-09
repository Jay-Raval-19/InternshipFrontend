
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const Header = () => {
  const handleStartInquiry = () => {
    window.open('https://wa.me/1234567890?text=Hello%20Tradio,%20I%20would%20like%20to%20make%20an%20inquiry', '_blank');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-900">Tradio</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-blue-700 hover:text-blue-900 font-medium transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('community')}
              className="text-blue-700 hover:text-blue-900 font-medium transition-colors"
            >
              Community
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-blue-700 hover:text-blue-900 font-medium transition-colors"
            >
              Contact Us
            </button>
            <Button
              onClick={handleStartInquiry}
              className="bg-[#25D366] hover:bg-[#20B858] text-white px-6 py-2 font-semibold"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Start Inquiry
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              onClick={handleStartInquiry}
              size="sm"
              className="bg-[#25D366] hover:bg-[#20B858] text-white"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
