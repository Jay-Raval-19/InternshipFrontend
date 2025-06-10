
import { gsap } from 'gsap';

export const heroAnimations = {
  init() {
    // Ensure elements exist before animating
    const heroTitle = document.querySelector('.hero-title');
    const heroTitleGradient = document.querySelector('.hero-title-gradient');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelectorAll('.hero-button-primary, .hero-button-secondary');
    const statItems = document.querySelectorAll('.stat-item');

    if (!heroTitle) return;

    this.createHeroTimeline();
    this.createFloatingElements();
  },

  createHeroTimeline() {
    // Set initial visibility for all elements
    gsap.set(['.hero-title', '.hero-title-gradient', '.hero-description', '.hero-button-primary', '.hero-button-secondary', '.stat-item'], {
      opacity: 1,
      y: 0,
      scale: 1,
      visibility: 'visible'
    });

    const tl = gsap.timeline({ delay: 0.3 });

    // Hero title animation with stagger
    if (document.querySelector('.hero-title')) {
      tl.from('.hero-title', {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: 'power3.out',
      });
    }

    if (document.querySelector('.hero-title-gradient')) {
      tl.from('.hero-title-gradient', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.8');
    }

    if (document.querySelector('.hero-description')) {
      tl.from('.hero-description', {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.6');
    }

    if (document.querySelectorAll('.hero-button-primary, .hero-button-secondary').length > 0) {
      tl.from('.hero-button-primary, .hero-button-secondary', {
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.1,
      }, '-=0.4');
    }

    if (document.querySelectorAll('.stat-item').length > 0) {
      tl.from('.stat-item', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
      }, '-=0.2');
    }
  },

  createFloatingElements() {
    // Only animate if elements exist
    const blob1 = document.querySelector('.hero-blob-1');
    const blob2 = document.querySelector('.hero-blob-2');

    if (blob1) {
      gsap.to('.hero-blob-1', {
        y: -20,
        rotation: 5,
        duration: 4,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    if (blob2) {
      gsap.to('.hero-blob-2', {
        y: 15,
        rotation: -3,
        duration: 5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1,
      });
    }
  },
};
