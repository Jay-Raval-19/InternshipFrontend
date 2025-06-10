
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const sectionAnimations = {
  init() {
    // Only initialize animations for elements that actually exist
    if (document.querySelector('.how-it-works')) {
      this.createHowItWorksAnimations();
    }
    if (document.querySelector('.community')) {
      this.createCommunityAnimations();
    }
    if (document.querySelector('.about')) {
      this.createAboutAnimations();
    }
    if (document.querySelector('.contact')) {
      this.createContactAnimations();
    }
  },

  createHowItWorksAnimations() {
    const howItWorksSection = document.querySelector('.how-it-works');
    if (!howItWorksSection) return;

    // Ensure section is visible first
    gsap.set('.how-it-works', { visibility: 'visible', opacity: 1 });

    // Main section reveal
    gsap.from('.how-it-works', {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.how-it-works',
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    });

    // Phone demo animation - only if element exists
    const phoneDemo = document.querySelector('.phone-demo');
    if (phoneDemo) {
      gsap.set('.phone-demo', { visibility: 'visible', opacity: 1 });
      gsap.from('.phone-demo', {
        opacity: 0,
        scale: 0.8,
        rotation: 10,
        duration: 1.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.phone-demo',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    // Steps stagger animation - only if elements exist
    const steps = document.querySelectorAll('.how-it-works-step');
    if (steps.length > 0) {
      gsap.set('.how-it-works-step', { visibility: 'visible', opacity: 1 });
      gsap.from('.how-it-works-step', {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.how-it-works-steps',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  },

  createCommunityAnimations() {
    const communitySection = document.querySelector('.community');
    if (!communitySection) return;

    // Ensure section is visible first
    gsap.set('.community', { visibility: 'visible', opacity: 1 });

    // Community header
    const communityHeader = document.querySelector('.community-header');
    if (communityHeader) {
      gsap.set('.community-header', { visibility: 'visible', opacity: 1 });
      gsap.from('.community-header', {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.community',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    // Blog cards with stagger - only if they exist
    const blogCards = document.querySelectorAll('.blog-card');
    if (blogCards.length > 0) {
      gsap.set('.blog-card', { visibility: 'visible', opacity: 1 });
      gsap.from('.blog-card', {
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.community-grid',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  },

  createAboutAnimations() {
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;

    // Ensure section is visible first
    gsap.set('.about', { visibility: 'visible', opacity: 1 });

    // About section reveal
    const aboutHeader = document.querySelector('.about-header');
    if (aboutHeader) {
      gsap.set('.about-header', { visibility: 'visible', opacity: 1 });
      gsap.from('.about-header', {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    // About image with parallax effect - only if it exists
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
      gsap.set('.about-image', { visibility: 'visible', opacity: 1 });
      gsap.from('.about-image', {
        scale: 1.2,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-image-container',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });
    }

    // Value cards - only if they exist
    const valueCards = document.querySelectorAll('.value-card');
    if (valueCards.length > 0) {
      gsap.set('.value-card', { visibility: 'visible', opacity: 1 });
      gsap.from('.value-card', {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.about-values',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  },

  createContactAnimations() {
    const contactSection = document.querySelector('.contact');
    if (!contactSection) return;

    // Ensure section is visible first
    gsap.set('.contact', { visibility: 'visible', opacity: 1 });

    gsap.from('.contact', {
      opacity: 0,
      y: 80,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });
  },
};
