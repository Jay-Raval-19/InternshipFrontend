
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, Users, BarChart3, Zap, Play, CheckCircle, Shield, Clock, Globe } from 'lucide-react';

const Hero = () => {
  const handleStartTrial = () => {
    window.open('https://wa.me/1234567890?text=Hello%20Tradio,%20I%20would%20like%20to%20start%20my%20free%20trial', '_blank');
  };

  const handleWatchDemo = () => {
    // Add demo video link or modal here
    console.log('Watch demo clicked');
  };

  const features = [
    { icon: Zap, text: "Instant Supplier Matching" },
    { icon: BarChart3, text: "AI-Powered Analysis" },
    { icon: MessageCircle, text: "WhatsApp Integration" },
    { icon: Shield, text: "Verified Suppliers Only" },
    { icon: Clock, text: "Real-time Quotes" }
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-100 min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <CheckCircle className="h-4 w-4" />
            Trusted by 10,000+ businesses
          </div>
          
          {/* Main Heading */}
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-blue-900">Tradio</span>
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 mb-6">
            The smartest way to connect with suppliers through WhatsApp
          </h2>
          
          {/* Description */}
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Our AI agent revolutionizes B2B procurement by instantly connecting you with verified chemical suppliers, 
            analyzing quotes in real-time, and streamlining your entire sourcing process through WhatsApp.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={handleStartTrial}
              size="lg" 
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button 
              onClick={handleWatchDemo}
              variant="outline" 
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
                <feature.icon className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="text-sm text-gray-500 ml-2">Tradio WhatsApp Agent</div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm font-semibold text-blue-900 mb-2">Active Inquiry</div>
                <div className="text-sm text-blue-700">500kg Sodium Hydroxide (99% purity) - Mumbai delivery</div>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-600">12 verified suppliers responded in 4 hours</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-sm font-semibold">Best Quote</div>
                  <div className="text-lg font-bold text-green-600">₹42/kg</div>
                  <div className="text-xs text-gray-500">ChemSupply India</div>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-sm font-semibold">Avg. Price</div>
                  <div className="text-lg font-bold">₹47/kg</div>
                  <div className="text-xs text-gray-500">Market analysis</div>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-sm font-semibold">Response Time</div>
                  <div className="text-lg font-bold text-blue-600">4 hrs</div>
                  <div className="text-xs text-gray-500">Average</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
