
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/1234567890?text=Hello%20Tradio,%20I%20have%20a%20question', '_blank');
  };

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto">
              Have questions about Tradio? We're here to help you streamline your chemical procurement process
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 bg-white">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-2">
                      First Name
                    </label>
                    <Input placeholder="John" className="border-blue-200 focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-2">
                      Last Name
                    </label>
                    <Input placeholder="Doe" className="border-blue-200 focus:border-blue-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Email
                  </label>
                  <Input 
                    type="email" 
                    placeholder="john@company.com" 
                    className="border-blue-200 focus:border-blue-500" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Company
                  </label>
                  <Input placeholder="Your Company Name" className="border-blue-200 focus:border-blue-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us about your procurement needs or any questions you have..."
                    rows={4}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-blue-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <MessageCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">WhatsApp</p>
                      <p className="text-blue-700">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Email</p>
                      <p className="text-blue-700">hello@tradio.ai</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Phone</p>
                      <p className="text-blue-700">+91 22 1234 5678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Address</p>
                      <p className="text-blue-700">Mumbai, Maharashtra, India</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <h3 className="text-xl font-bold mb-4">Quick Start on WhatsApp</h3>
                <p className="mb-6">
                  Ready to get started? Send us your first procurement requirement directly on WhatsApp and experience the Tradio difference.
                </p>
                <Button 
                  onClick={handleWhatsApp}
                  variant="secondary"
                  className="w-full bg-white text-blue-600 hover:bg-gray-50"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start on WhatsApp
                </Button>
              </Card>

              <Card className="p-6 bg-white">
                <h3 className="text-xl font-bold text-blue-900 mb-4">For Suppliers</h3>
                <p className="text-blue-700 mb-4">
                  Want to join our supplier network? Register your chemical business and start receiving qualified leads.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Register as Supplier
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
