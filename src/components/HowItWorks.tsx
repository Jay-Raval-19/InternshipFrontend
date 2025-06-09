
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, Search, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const handleGetStarted = () => {
    window.open('https://wa.me/1234567890?text=Hello%20Tradio,%20I%20would%20like%20to%20get%20started', '_blank');
  };

  const steps = [
    {
      step: 1,
      icon: MessageCircle,
      title: "Send Your Requirements",
      description: "Simply message our WhatsApp agent with your chemical requirements, specifications, and delivery location.",
      color: "bg-green-500"
    },
    {
      step: 2,
      icon: Search,
      title: "AI Finds Best Suppliers",
      description: "Our AI instantly matches you with verified suppliers from our network of 500+ chemical distributors.",
      color: "bg-blue-500"
    },
    {
      step: 3,
      icon: BarChart3,
      title: "Compare & Analyze",
      description: "Get real-time price comparisons, supplier ratings, and delivery timelines in an easy-to-understand format.",
      color: "bg-purple-500"
    },
    {
      step: 4,
      icon: CheckCircle,
      title: "Close the Deal",
      description: "Choose your preferred supplier and complete the transaction with our secure payment and logistics support.",
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">How Tradio Works</h2>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto">
            Experience the future of chemical procurement with our AI-powered WhatsApp agent. 
            From inquiry to delivery in just 4 simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="relative p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className={`${step.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                <step.icon className="h-6 w-6 text-white" />
              </div>
              <div className="absolute top-4 right-4 text-2xl font-bold text-gray-200">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{step.title}</h3>
              <p className="text-blue-700">{step.description}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 h-8 w-8 text-blue-300" />
              )}
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Get Started on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
