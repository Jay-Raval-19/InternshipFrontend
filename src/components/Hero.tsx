
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, Users, BarChart3, Zap } from 'lucide-react';

const Hero = () => {
  const handleInquireNow = () => {
    window.open('https://wa.me/1234567890?text=Hello%20Tradio,%20I%20would%20like%20to%20make%20an%20inquiry', '_blank');
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
              Transform Your Chemical
              <span className="text-blue-600 block">Procurement Process</span>
            </h1>
            <p className="text-xl text-blue-700 mb-8 max-w-3xl mx-auto">
              Tradio's AI agent connects chemical buyers with verified suppliers instantly. 
              Get multiple quotations, compare offers, and close deals faster than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleInquireNow}
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Inquire Now on WhatsApp
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Verified Suppliers</h3>
              <p className="text-blue-700">Access our network of GST-verified chemical suppliers across India</p>
            </Card>
            
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-shadow">
              <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Smart Comparisons</h3>
              <p className="text-blue-700">AI-powered analysis of pricing, delivery terms, and supplier capabilities</p>
            </Card>
            
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-shadow">
              <Zap className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Lightning Fast</h3>
              <p className="text-blue-700">Get quotations in hours, not days. Streamlined procurement workflow</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
