
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const sectionAnimations = {
  init() {
    this.createHowItWorksAnimations();
    this.createCommunityAnimations();
    this.createAboutAnimations();
    this.createContactAnimations();
  },

  createHowItWorksAnimations() {
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

    // Phone demo animation
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

    // Steps stagger animation
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
  },

  createCommunityAnimations() {
    // Community header
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

    // Blog cards with stagger
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
  },

  createAboutAnimations() {
    // About section reveal
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

    // About image with parallax effect
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

    // Value cards
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
  },

  createContactAnimations() {
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
