
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, Users, BarChart3, Zap, Play, CheckCircle, ArrowRight } from 'lucide-react';

const Hero = () => {
  const handleInquireNow = () => {
    window.open('https://wa.me/1234567890?text=Hello%20Tradio,%20I%20would%20like%20to%20make%20an%20inquiry', '_blank');
  };

  const stats = [
    { number: "500+", label: "Verified Suppliers" },
    { number: "24hrs", label: "Avg Response Time" },
    { number: "100%", label: "Free Platform" },
    { number: "98%", label: "Success Rate" }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "ChemTech Industries",
      text: "Tradio helped us find reliable suppliers in just 2 days. Amazing platform!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Priya Sharma",
      company: "Global Chemicals Ltd",
      text: "The AI-powered comparison saved us 30% on procurement costs.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="h-4 w-4" />
                AI-Powered Chemical Procurement
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-blue-900 mb-6 leading-tight">
                Transform Your
                <span className="text-blue-600 block">Chemical Sourcing</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  in Hours, Not Days
                </span>
              </h1>
              
              <p className="text-xl text-blue-700 mb-8 max-w-xl leading-relaxed">
                Connect with 500+ verified chemical suppliers instantly. Get competitive quotations, 
                AI-powered comparisons, and close deals faster than ever before.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={handleInquireNow}
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold group"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start Your Inquiry
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{stat.number}</div>
                    <div className="text-sm text-blue-700">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Visual Elements */}
            <div className="relative">
              {/* Main Dashboard Preview */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="text-sm text-gray-500 ml-2">Tradio Dashboard</div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-blue-900 mb-2">Latest Inquiry</div>
                    <div className="text-sm text-blue-700">500kg Sodium Hydroxide (99% purity)</div>
                    <div className="flex items-center gap-2 mt-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-green-600">8 quotations received</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-sm">Supplier A</span>
                      <span className="text-sm font-semibold text-green-600">₹45/kg</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-sm">Supplier B</span>
                      <span className="text-sm font-semibold">₹48/kg</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-sm">Supplier C</span>
                      <span className="text-sm font-semibold">₹52/kg</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                <BarChart3 className="h-6 w-6" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-purple-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Verified Suppliers</h3>
              <p className="text-blue-700">Access our network of GST-verified chemical suppliers across India</p>
            </Card>
            
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Smart Comparisons</h3>
              <p className="text-blue-700">AI-powered analysis of pricing, delivery terms, and supplier capabilities</p>
            </Card>
            
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <Zap className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Lightning Fast</h3>
              <p className="text-blue-700">Get quotations in hours, not days. Streamlined procurement workflow</p>
            </Card>
          </div>

          {/* Testimonials */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-blue-900 text-center mb-8">Trusted by Chemical Industry Leaders</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 bg-white/90 backdrop-blur-sm">
                  <p className="text-blue-700 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-blue-900">{testimonial.name}</div>
                      <div className="text-sm text-blue-600">{testimonial.company}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
