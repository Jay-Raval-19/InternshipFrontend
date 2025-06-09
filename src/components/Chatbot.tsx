
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Tradio AI Assistant. How can I help you with your chemical procurement needs today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickQuestions = [
    "How does Tradio work?",
    "What chemicals do you cover?",
    "How much does it cost?",
    "How to register as supplier?",
    "What is the delivery timeline?"
  ];

  const botResponses = {
    "how does tradio work": "Tradio works in 5 simple steps: 1) Send your requirement on WhatsApp 2) Our AI processes your needs 3) We send RFQs to verified suppliers 4) Suppliers submit quotations 5) You get a detailed comparison report. It's that simple!",
    "what chemicals do you cover": "Currently, we focus on the chemical industry and cover a wide range of industrial chemicals, raw materials, specialty chemicals, and laboratory reagents. Our network includes suppliers for acids, bases, solvents, polymers, and more.",
    "how much does it cost": "Tradio is completely FREE for all users during our early stage! There are no hidden charges for buyers or suppliers. We believe in building value first.",
    "how to register as supplier": "Suppliers can register by messaging us on WhatsApp with their GST number and details of products they supply. Our team will verify your credentials and add you to our network.",
    "what is the delivery timeline": "Delivery timelines vary by supplier and product type. Our comparison reports include detailed delivery schedules from each supplier so you can choose based on your urgency.",
    "default": "That's a great question! For detailed information, I'd recommend connecting with our team on WhatsApp. They can provide specific guidance based on your needs. Would you like me to connect you?"
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);

    // Generate bot response
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let response = botResponses.default;
      
      for (const [key, value] of Object.entries(botResponses)) {
        if (key !== 'default' && lowerInput.includes(key)) {
          response = value;
          break;
        }
      }

      const botResponse = {
        id: messages.length + 2,
        text: response,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputValue('');
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    handleSendMessage();
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[500px] bg-white shadow-2xl border-2 border-blue-200 flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold">Tradio Assistant</h3>
              <p className="text-xs text-blue-100">Online now</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-blue-500 p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.isBot
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-blue-600 text-white'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="space-y-2">
              <p className="text-xs text-gray-500 text-center">Quick questions:</p>
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left justify-start text-xs border-blue-200 hover:bg-blue-50"
                >
                  {question}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about Tradio..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="border-blue-200 focus:border-blue-500"
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chatbot;
