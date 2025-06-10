
import { gsap } from 'gsap';

export const heroAnimations = {
  init() {
    this.createHeroTimeline();
    this.createFloatingElements();
  },

  createHeroTimeline() {
    const tl = gsap.timeline({ delay: 0.2 });

    // Hero title animation with stagger
    tl.from('.hero-title', {
      opacity: 0,
      y: 80,
      duration: 1.2,
      ease: 'power3.out',
    })
    .from('.hero-title-gradient', {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.8')
    .from('.hero-description', {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.6')
    .from('.hero-button-primary, .hero-button-secondary', {
      opacity: 0,
      y: 40,
      scale: 0.9,
      duration: 0.8,
      ease: 'back.out(1.7)',
      stagger: 0.1,
    }, '-=0.4')
    .from('.stat-item', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1,
    }, '-=0.2');
  },

  createFloatingElements() {
    // Floating animation for hero blobs
    gsap.to('.hero-blob-1', {
      y: -20,
      rotation: 5,
      duration: 4,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });

    gsap.to('.hero-blob-2', {
      y: 15,
      rotation: -3,
      duration: 5,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      delay: 1,
    });
  },
};
