
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import './Community.css';

const Community = () => {
  const blogs = [
    {
      id: 1,
      title: "5 Major Procurement Challenges in Chemical Industry and How to Overcome Them",
      excerpt: "Discover the most common hurdles chemical buyers face and proven strategies to streamline your procurement process.",
      date: "Dec 5, 2024",
      readTime: "5 min read",
      category: "Procurement",
      image: "https://images.unsplash.com/photo-1518389077069-c10ba3c006a0?w=400&h=250&fit=crop&crop=center&auto=format"
    },
    {
      id: 2,
      title: "Digital Transformation in Chemical Procurement: A Complete Guide",
      excerpt: "Learn how digitization is revolutionizing chemical sourcing and what it means for your business operations.",
      date: "Dec 3, 2024",
      readTime: "7 min read",
      category: "Digital Transformation",
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=250&fit=crop&crop=center&auto=format"
    },
    {
      id: 3,
      title: "Supplier Risk Management in Chemical Industry: Best Practices",
      excerpt: "Essential strategies for evaluating and managing supplier risks in the volatile chemical marketplace.",
      date: "Nov 28, 2024",
      readTime: "6 min read",
      category: "Risk Management",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center&auto=format"
    },
    {
      id: 4,
      title: "Cost Optimization Strategies for Chemical Raw Material Sourcing",
      excerpt: "Proven methods to reduce procurement costs without compromising on quality or delivery timelines.",
      date: "Nov 25, 2024",
      readTime: "8 min read",
      category: "Cost Management",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center&auto=format"
    },
    {
      id: 5,
      title: "Sustainability in Chemical Procurement: Building a Green Supply Chain",
      excerpt: "How to incorporate environmental considerations into your chemical sourcing decisions for long-term success.",
      date: "Nov 22, 2024",
      readTime: "6 min read",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop&crop=center&auto=format"
    },
    {
      id: 6,
      title: "India's Chemical Industry Growth: Opportunities and Market Trends 2024",
      excerpt: "Comprehensive analysis of India's booming chemical sector and emerging opportunities for businesses.",
      date: "Nov 20, 2024",
      readTime: "10 min read",
      category: "Market Analysis",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop&crop=center&auto=format"
    }
  ];

  return (
    <section className="community">
      <div className="community-container">
        <div className="community-header">
          <h2 className="community-title section-title">Community & Insights</h2>
          <p className="community-subtitle">
            Stay informed with latest trends, best practices, and industry insights for chemical procurement
          </p>
        </div>

        <div className="community-grid">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <div className="blog-image-container">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="blog-image"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1518389077069-c10ba3c006a0?w=400&h=250&fit=crop&crop=center&auto=format";
                  }}
                />
                <div className="blog-category">
                  {blog.category}
                </div>
              </div>
              
              <div className="blog-content">
                <div className="blog-meta">
                  <Calendar className="blog-meta-icon" />
                  <span>{blog.date}</span>
                  <span className="blog-meta-divider">•</span>
                  <span>{blog.readTime}</span>
                </div>
                
                <h3 className="blog-title">
                  {blog.title}
                </h3>
                
                <p className="blog-excerpt">
                  {blog.excerpt}
                </p>
                
                <button className="blog-link">
                  Read More
                  <ArrowRight className="blog-link-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="community-footer">
          <button className="view-all-button">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default Community;
