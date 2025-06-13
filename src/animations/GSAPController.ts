import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export class GSAPController {
  private static instance: GSAPController;
  private initialized = false;

  static getInstance(): GSAPController {
    if (!GSAPController.instance) {
      GSAPController.instance = new GSAPController();
    }
    return GSAPController.instance;
  }

  init() {
    if (this.initialized) return;

    console.log('GSAPController: Initializing...');

    // Set GSAP defaults for premium feel
    gsap.defaults({
      duration: 1.2,
      ease: "power2.out"
    });

    // Configure ScrollTrigger for mobile optimization
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
    });

    // Initial setup
    this.setupScrollAnimations();
    this.setupMicroInteractions();
    this.initialized = true;

    // Force immediate visibility check without delays
    this.immediateVisibilityCheck();

    // Add comprehensive event listeners for various scroll scenarios
    this.setupScrollHandlers();
  }

  private immediateVisibilityCheck() {
    console.log('GSAPController: Running immediate visibility check...');
    
    // First, ensure all sections are visible by default (fallback)
    gsap.utils.toArray('.animate-section').forEach((section: any) => {
      if (section) {
        gsap.set(section, {
          opacity: 1,
          y: 0,
          clearProps: "transform"
        });
      }
    });

    // Then apply subtle animations only if elements are ready
    requestAnimationFrame(() => {
      this.applyVisibilityAnimations();
    });
  }

  private applyVisibilityAnimations() {
    const sections = gsap.utils.toArray('.animate-section');
    console.log('GSAPController: Found sections:', sections.length);
    
    if (sections.length === 0) {
      console.log('GSAPController: No sections found, content should be visible by default');
      return;
    }

    sections.forEach((section: any, index: number) => {
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isVisible = (
        rect.top < window.innerHeight * 0.9 &&
        rect.bottom > window.innerHeight * 0.1
      );

      console.log(`GSAPController: Section ${index} visible:`, isVisible);

      if (isVisible) {
        // Ensure section is immediately visible
        gsap.set(section, {
          opacity: 1,
          y: 0
        });

        // Add subtle entrance animation
        gsap.fromTo(section, 
          {
            opacity: 0.8,
            y: 10
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true
          }
        );

        // Animate child elements
        const childElements = section.querySelectorAll('.section-title, .animate-element');
        childElements.forEach((element: any) => {
          if (element) {
            gsap.fromTo(element,
              {
                opacity: 0.7,
                y: 5
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
                delay: 0.1,
                overwrite: true
              }
            );
          }
        });
      }
    });
  }

  private setupScrollHandlers() {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.applyVisibilityAnimations();
        ScrollTrigger.refresh(true);
      }, 50);
    };

    const handleScrollEnd = () => {
      setTimeout(() => {
        this.applyVisibilityAnimations();
        ScrollTrigger.refresh(true);
      }, 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scrollend', handleScrollEnd, { passive: true });
    window.addEventListener('resize', () => {
      this.applyVisibilityAnimations();
      ScrollTrigger.refresh(true);
    });
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.applyVisibilityAnimations();
        ScrollTrigger.refresh(true);
      }, 100);
    });

    // Handle visibility changes (tab switching, etc.)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        setTimeout(() => {
          this.applyVisibilityAnimations();
          ScrollTrigger.refresh(true);
        }, 50);
      }
    });
  }

  private setupScrollAnimations() {
    // Hero section entrance
    this.animateHero();
    
    // Section reveals with improved mobile handling
    this.animateSectionReveals();
    
    // Community cards stagger
    this.animateCommunityCards();
    
    // About section
    this.animateAboutSection();
    
    // Contact section
    this.animateContactSection();
  }

  private animateHero() {
    // Create a master timeline for the hero section
    const masterTl = gsap.timeline({ delay: 0.2 });

    // Initial state
    gsap.set('.hero-title', { 
      opacity: 0,
      y: 50,
      rotationX: 15,
      transformOrigin: "50% 50% -100px"
    });
    
    gsap.set('.hero-description', { 
      opacity: 0,
      y: 30
    });
    
    gsap.set('.hero-buttons', { 
      opacity: 0,
      y: 20
    });

    // Title reveal with 3D effect
    masterTl.to('.hero-title', {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    // Description fade in with slight delay
    .to('.hero-description', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    // Buttons reveal
    .to('.hero-buttons', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.3");

    // Background blobs animation
    gsap.to('.hero-blob-1', {
      x: 30,
      y: -20,
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1
    });

    gsap.to('.hero-blob-2', {
      x: -20,
      y: 15,
      rotation: -360,
      duration: 25,
      ease: "none",
      repeat: -1
    });
  }

  private animateSectionReveals() {
    // Simplified section reveal animation - ensure content is always visible
    gsap.utils.toArray('.animate-section').forEach((section: any) => {
      // Ensure section is visible by default
      gsap.set(section, {
        opacity: 1,
        y: 0
      });

      // Create the animation with more conservative settings
      ScrollTrigger.create({
        trigger: section,
        start: "top 90%", 
        end: "bottom 10%",
        fastScrollEnd: true,
        onEnter: () => {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true
          });

          // Animate child elements
          const childElements = section.querySelectorAll('.section-title, .animate-element');
          childElements.forEach((element: any) => {
            gsap.to(element, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
              overwrite: true,
              delay: 0.05
            });
          });
        },
        refreshPriority: 1
      });
    });

    // Section titles with split animation
    gsap.utils.toArray('.section-title').forEach((title: any) => {
      // Ensure title is visible by default
      gsap.set(title, {
        opacity: 1,
        y: 0,
        skewY: 0
      });

      // Create the animation
      ScrollTrigger.create({
        trigger: title,
        start: "top 90%",
        fastScrollEnd: true,
        onEnter: () => {
          gsap.to(title, {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true
          });
        },
        refreshPriority: 1
      });
    });
  }

  private animateCommunityCards() {
    // Reset any existing animations
    gsap.set('.community-header', { clearProps: "all" });
    gsap.set('.blog-card', { clearProps: "all" });
    gsap.set('.view-all-button', { clearProps: "all" });

    // Create a master timeline for the community section
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.community',
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Initial states - ensure visibility
    gsap.set('.community-title', {
      opacity: 1,
      y: 0
    });

    gsap.set('.community-subtitle', {
      opacity: 1,
      y: 0
    });

    gsap.set('.blog-card', {
      opacity: 1,
      y: 0,
      scale: 1
    });

    gsap.set('.view-all-button', {
      opacity: 1,
      y: 0
    });

    // Add hover animations for cards
    gsap.utils.toArray('.blog-card').forEach((card: any) => {
      const image = card.querySelector('.blog-image');
      const content = card.querySelector('.blog-content');
      const link = card.querySelector('.blog-link');
      
      // Create hover timeline
      const hoverTl = gsap.timeline({ paused: true });
      
      hoverTl
        .to(card, {
          y: -8,
          duration: 0.4,
          ease: "power2.out"
        })
        .to(image, {
          scale: 1.05,
          duration: 0.6,
          ease: "power2.out"
        }, 0)
        .to(content, {
          y: -4,
          duration: 0.4,
          ease: "power2.out"
        }, 0)
        .to(link, {
          x: 4,
          duration: 0.3,
          ease: "power2.out"
        }, 0);

      // Add hover listeners
      card.addEventListener('mouseenter', () => hoverTl.play());
      card.addEventListener('mouseleave', () => hoverTl.reverse());
    });
  }

  private animateAboutSection() {
    // Reset any existing animations and ensure visibility
    gsap.set('.about-title', { opacity: 1, y: 0 });
    gsap.set('.about-subtitle', { opacity: 1, y: 0 });
    gsap.set('.about-text', { opacity: 1, x: 0 });
    gsap.set('.about-image-wrapper', { opacity: 1, x: 0 });
    gsap.set('.value-card', { opacity: 1, y: 0, scale: 1 });
    gsap.set('.cta-stat-card', { opacity: 1, y: 0, scale: 1 });

    // Add hover animations for value cards
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -5,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Add hover animations for stat cards
    const statCards = document.querySelectorAll('.cta-stat-card');
    statCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -5,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }

  private animateContactSection() {
    // Ensure contact section is visible
    gsap.set('.contact', {
      opacity: 1,
      y: 0
    });

    gsap.fromTo('.contact',
      {
        opacity: 0.8,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.contact',
          start: "top 75%"
        }
      }
    );
  }

  private setupMicroInteractions() {
    // Button hover effects
    this.setupButtonHovers();
    
    // Card hover effects
    this.setupCardHovers();
    
    // Navigation interactions
    this.setupNavInteractions();
  }

  private setupButtonHovers() {
    // Primary buttons
    gsap.utils.toArray('.hero-button-primary, .inquiry-button').forEach((btn: any) => {
      const tl = gsap.timeline({ paused: true });
      
      tl.to(btn, {
        scale: 1.05,
        y: -2,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(btn, {
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        duration: 0.3,
        ease: "power2.out"
      }, 0);

      btn.addEventListener('mouseenter', () => tl.play());
      btn.addEventListener('mouseleave', () => tl.reverse());
    });

    // Secondary buttons
    gsap.utils.toArray('.hero-button-secondary, .view-all-button').forEach((btn: any) => {
      const tl = gsap.timeline({ paused: true });
      
      tl.to(btn, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out"
      });

      btn.addEventListener('mouseenter', () => tl.play());
      btn.addEventListener('mouseleave', () => tl.reverse());
    });
  }

  private setupCardHovers() {
    // Blog cards
    gsap.utils.toArray('.blog-card').forEach((card: any) => {
      const image = card.querySelector('.blog-image');
      const tl = gsap.timeline({ paused: true });
      
      tl.to(card, {
        y: -8,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(image, {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out"
      }, 0)
      .to(card, {
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        duration: 0.4,
        ease: "power2.out"
      }, 0);

      card.addEventListener('mouseenter', () => tl.play());
      card.addEventListener('mouseleave', () => tl.reverse());
    });

    // Value cards
    gsap.utils.toArray('.value-card').forEach((card: any) => {
      const icon = card.querySelector('.value-icon');
      const tl = gsap.timeline({ paused: true });
      
      tl.to(card, {
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(icon, {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: "back.out(1.7)"
      }, 0);

      card.addEventListener('mouseenter', () => tl.play());
      card.addEventListener('mouseleave', () => tl.reverse());
    });
  }

  private setupNavInteractions() {
    // Navigation buttons
    gsap.utils.toArray('.nav-button').forEach((btn: any) => {
      const tl = gsap.timeline({ paused: true });
      
      tl.to(btn, {
        y: -2,
        color: "#1e3a8a",
        duration: 0.2,
        ease: "power2.out"
      });

      btn.addEventListener('mouseenter', () => tl.play());
      btn.addEventListener('mouseleave', () => tl.reverse());
    });
  }

  destroy() {
    console.log('GSAPController: Destroying...');
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.killTweensOf("*");
    this.initialized = false;
  }

  refresh() {
    console.log('GSAPController: Refreshing...');
    this.applyVisibilityAnimations();
    ScrollTrigger.refresh();
  }
}

export const gsapController = GSAPController.getInstance();
