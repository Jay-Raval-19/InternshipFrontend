
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { MessageCircle, Search, FileText, BarChart, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Send Your Requirement",
      description: "Message us on WhatsApp with your chemical procurement needs in any language",
      icon: MessageCircle,
      color: "bg-blue-500",
      message: "I need 500kg of Sodium Hydroxide with 99% purity for delivery in Mumbai by next month"
    },
    {
      id: 2,
      title: "AI Compiles Requirements",
      description: "Our intelligent agent processes and standardizes your requirements",
      icon: Search,
      color: "bg-blue-600",
      message: "Processing your requirement for Sodium Hydroxide (NaOH)..."
    },
    {
      id: 3,
      title: "Suppliers Receive RFQ",
      description: "Verified suppliers in our network receive detailed quotation requests",
      icon: FileText,
      color: "bg-blue-700",
      message: "RFQ sent to 15 verified chemical suppliers in your region"
    },
    {
      id: 4,
      title: "Quotations Collected",
      description: "Suppliers submit their best quotes with pricing and delivery terms",
      icon: BarChart,
      color: "bg-blue-800",
      message: "8 quotations received. Analyzing prices and delivery timelines..."
    },
    {
      id: 5,
      title: "Comparison Report",
      description: "Receive detailed comparison with supplier rankings and recommendations",
      icon: CheckCircle,
      color: "bg-green-600",
      message: "📊 Your comparison report is ready! Best quote: ₹45/kg with 15-day delivery"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">How Tradio Works</h2>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto">
            Our AI-powered workflow simplifies chemical procurement from inquiry to decision
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Animated Phone Demo */}
            <div className="relative">
              <div className="bg-gray-800 rounded-3xl p-4 mx-auto w-80">
                <div className="bg-white rounded-2xl p-4 h-96 overflow-hidden">
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-800">Tradio AI</span>
                  </div>
                  
                  <div className="space-y-4">
                    {steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`transition-all duration-500 transform ${
                          index === activeStep 
                            ? 'opacity-100 translate-y-0' 
                            : index < activeStep 
                            ? 'opacity-50 -translate-y-2' 
                            : 'opacity-30 translate-y-2'
                        }`}
                      >
                        <div className={`p-3 rounded-lg ${
                          index % 2 === 0 
                            ? 'bg-blue-100 ml-auto max-w-xs' 
                            : 'bg-gray-100 mr-auto max-w-xs'
                        }`}>
                          <p className="text-sm text-gray-800">{step.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <Card 
                  key={step.id}
                  className={`p-6 transition-all duration-300 ${
                    index === activeStep 
                      ? 'border-blue-500 shadow-lg scale-105' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`${step.color} p-3 rounded-lg`}>
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">
                        {step.id}. {step.title}
                      </h3>
                      <p className="text-blue-700">{step.description}</p>
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

export default HowItWorks;
