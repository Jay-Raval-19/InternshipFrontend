
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

const Community = () => {
  const blogs = [
    {
      id: 1,
      title: "5 Major Procurement Challenges in Chemical Industry and How to Overcome Them",
      excerpt: "Discover the most common hurdles chemical buyers face and proven strategies to streamline your procurement process.",
      date: "Dec 5, 2024",
      readTime: "5 min read",
      category: "Procurement",
      image: "https://images.unsplash.com/photo-1518389077069-c10ba3c006a0?w=400&h=250&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Digital Transformation in Chemical Procurement: A Complete Guide",
      excerpt: "Learn how digitization is revolutionizing chemical sourcing and what it means for your business operations.",
      date: "Dec 3, 2024",
      readTime: "7 min read",
      category: "Digital Transformation",
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=250&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Supplier Risk Management in Chemical Industry: Best Practices",
      excerpt: "Essential strategies for evaluating and managing supplier risks in the volatile chemical marketplace.",
      date: "Nov 28, 2024",
      readTime: "6 min read",
      category: "Risk Management",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Cost Optimization Strategies for Chemical Raw Material Sourcing",
      excerpt: "Proven methods to reduce procurement costs without compromising on quality or delivery timelines.",
      date: "Nov 25, 2024",
      readTime: "8 min read",
      category: "Cost Management",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "Sustainability in Chemical Procurement: Building a Green Supply Chain",
      excerpt: "How to incorporate environmental considerations into your chemical sourcing decisions for long-term success.",
      date: "Nov 22, 2024",
      readTime: "6 min read",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop&crop=center"
    },
    {
      id: 6,
      title: "India's Chemical Industry Growth: Opportunities and Market Trends 2024",
      excerpt: "Comprehensive analysis of India's booming chemical sector and emerging opportunities for businesses.",
      date: "Nov 20, 2024",
      readTime: "10 min read",
      category: "Market Analysis",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop&crop=center"
    }
  ];

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Community & Insights</h2>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto">
            Stay informed with latest trends, best practices, and industry insights for chemical procurement
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogs.map((blog) => (
            <Card key={blog.id} className="overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {blog.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-blue-600 mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-blue-900 mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                
                <p className="text-blue-700 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Community;
