
import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield, Globe, Users, Zap } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "All suppliers are GST-verified and undergo rigorous quality checks to ensure reliable partnerships."
    },
    {
      icon: Globe,
      title: "Industry Expertise",
      description: "Deep understanding of chemical industry requirements, regulations, and market dynamics."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building a collaborative ecosystem where buyers and suppliers grow together."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Leveraging AI and automation to make procurement faster, smarter, and more efficient."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">About Tradio</h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto">
              Revolutionizing chemical procurement through AI-powered supplier matching and intelligent quotation management
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-blue-900 mb-6">
                Transforming Chemical Industry Procurement
              </h3>
              <div className="space-y-4 text-blue-700">
                <p>
                  Tradio was born from a simple observation: chemical procurement in India was fragmented, 
                  time-consuming, and lacked transparency. Traditional methods of finding suppliers often 
                  resulted in limited options, delayed responses, and inefficient comparison processes.
                </p>
                <p>
                  Our AI-powered platform bridges this gap by creating an intelligent ecosystem where 
                  chemical buyers can access verified suppliers instantly, receive competitive quotations, 
                  and make informed decisions based on comprehensive comparisons.
                </p>
                <p>
                  Currently in our early stage, we're proud to offer our services completely free to help 
                  businesses optimize their procurement processes and build stronger supplier relationships.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center" 
                alt="Chemical Industry"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-blue-600 bg-opacity-20 rounded-lg"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-blue-900 mb-3">{value.title}</h4>
                <p className="text-blue-700">{value.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Why Choose Tradio?
            </h3>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <p className="text-blue-700">Verified Chemical Suppliers</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">24hrs</div>
                <p className="text-blue-700">Average Response Time</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                <p className="text-blue-700">Free for All Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
