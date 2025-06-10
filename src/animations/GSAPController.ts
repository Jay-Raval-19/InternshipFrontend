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

    // Set GSAP defaults for premium feel
    gsap.defaults({
      duration: 1.2,
      ease: "power2.out"
    });

    // Configure ScrollTrigger for mobile optimization
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true
    });

    this.setupScrollAnimations();
    this.setupMicroInteractions();
    this.initialized = true;
  }

  private setupScrollAnimations() {
    // Hero section entrance
    this.animateHero();
    
    // Section reveals
    this.animateSectionReveals();
    
    // Community cards stagger
    this.animateCommunityCards();
    
    // About section
    this.animateAboutSection();
    
    // Contact section
    this.animateContactSection();
  }

  private animateHero() {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Hero title animation with split reveal
    tl.fromTo('.hero-title', 
      { 
        opacity: 0,
        y: 80,
        rotationX: 90,
        transformOrigin: "50% 50% -100px"
      },
      { 
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.5,
        ease: "power3.out"
      }
    )
    .fromTo('.hero-description', 
      { 
        opacity: 0,
        y: 40
      },
      { 
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8")
    .fromTo('.hero-buttons', 
      { 
        opacity: 0,
        y: 30,
        scale: 0.9
      },
      { 
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.5")
    .fromTo('.stat-item', 
      { 
        opacity: 0,
        y: 20,
        scale: 0.8
      },
      { 
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.3");

    // Floating animation for hero elements
    gsap.to('.hero-title', {
      y: -10,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    // Background blobs parallax
    gsap.to('.hero-blob-1', {
      x: 50,
      y: -30,
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1
    });

    gsap.to('.hero-blob-2', {
      x: -40,
      y: 20,
      rotation: -360,
      duration: 25,
      ease: "none",
      repeat: -1
    });
  }

  private animateSectionReveals() {
    // Generic section reveal animation
    gsap.utils.toArray('.animate-section').forEach((section: any) => {
      gsap.fromTo(section, 
        {
          opacity: 0,
          y: 100
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Section titles with split animation
    gsap.utils.toArray('.section-title').forEach((title: any) => {
      gsap.fromTo(title,
        {
          opacity: 0,
          y: 50,
          skewY: 7
        },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 85%"
          }
        }
      );
    });
  }

  private animateCommunityCards() {
    // Reset any existing animations on blog cards
    gsap.set('.blog-card', { clearProps: "all" });
    
    gsap.fromTo('.blog-card',
      {
        opacity: 0,
        y: 60,
        rotationX: 45,
        transformOrigin: "50% 100%"
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.community-grid',
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }

  private animateAboutSection() {
    // About text reveal
    gsap.fromTo('.about-text',
      {
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.about-main',
          start: "top 70%"
        }
      }
    );

    // About image without parallax to prevent blue overlay issues
    gsap.fromTo('.about-image',
      {
        opacity: 0,
        scale: 1.1
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.about-main',
          start: "top 70%"
        }
      }
    );

    // Value cards stagger - reset and animate consistently
    gsap.set('.value-card', { clearProps: "all" });
    
    gsap.fromTo('.value-card',
      {
        opacity: 0,
        y: 40,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: '.about-values',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }

  private animateContactSection() {
    gsap.fromTo('.contact',
      {
        opacity: 0,
        y: 80
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
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
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.killTweensOf("*");
    this.initialized = false;
  }

  refresh() {
    ScrollTrigger.refresh();
  }
}

export const gsapController = GSAPController.getInstance();

}
