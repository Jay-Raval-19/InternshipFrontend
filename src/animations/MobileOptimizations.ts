
import { gsap } from 'gsap';

export const mobileOptimizations = {
  init() {
    this.detectMobile();
    this.optimizeForTouch();
    this.reduceAnimationsForLowEndDevices();
  },

  detectMobile() {
    const isMobile = window.innerWidth <= 768;
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    
    if (isMobile || isLowEndDevice) {
      // Reduce animation complexity on mobile/low-end devices
      gsap.config({
        force3D: false,
        nullTargetWarn: false,
      });
      
      // Disable some heavy animations
      document.body.classList.add('reduced-motion');
    }
  },

  optimizeForTouch() {
    // Add touch-friendly hover effects
    const cards = document.querySelectorAll('.blog-card, .value-card');
    cards.forEach((card) => {
      card.addEventListener('touchstart', () => {
        gsap.to(card, {
          scale: 0.98,
          duration: 0.1,
          ease: 'power2.out',
        });
      });

      card.addEventListener('touchend', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        });
      });
    });
  },

  reduceAnimationsForLowEndDevices() {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(0.5); // Slow down all animations
      document.body.classList.add('reduced-motion');
    }
  },
};

// Auto-initialize on import
mobileOptimizations.init();
