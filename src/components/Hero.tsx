
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Play } from 'lucide-react';

const Hero = () => {
  const handleStartInquiry = () => {
    window.open('https://wa.me/1234567890?text=Hello%20Tradio,%20I%20would%20like%20to%20make%20an%20inquiry', '_blank');
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-100 min-h-screen flex items-center overflow-hidden pt-16">
      {/* Subtle background elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <div className="mb-12">
            <h1 className="text-6xl lg:text-7xl font-bold text-blue-900 mb-8 leading-tight">
              Transform Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
                Chemical Sourcing
              </span>
            </h1>
            
            <p className="text-2xl text-blue-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with 500+ verified suppliers instantly. Get competitive quotations and close deals faster than ever.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                onClick={handleStartInquiry}
                size="lg" 
                className="bg-[#25D366] hover:bg-[#20B858] text-white px-10 py-6 text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                Start Your Inquiry
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-10 py-6 text-xl font-semibold transition-all duration-300"
              >
                <Play className="mr-3 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Simple Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-blue-700">Verified Suppliers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">24hrs</div>
              <div className="text-blue-700">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-blue-700">Free Platform</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-blue-700">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
