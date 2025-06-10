
import { gsap } from 'gsap';

export const microInteractions = {
  init() {
    this.setupButtonHovers();
    this.setupCardHovers();
    this.setupIconAnimations();
  },

  setupButtonHovers() {
    // Primary button animations
    const primaryButtons = document.querySelectorAll('.hero-button-primary, .inquiry-button');
    primaryButtons.forEach((button) => {
      const icon = button.querySelector('.button-icon, .inquiry-button-icon');
      
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });
        
        if (icon) {
          gsap.to(icon, {
            x: 5,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
        
        if (icon) {
          gsap.to(icon, {
            x: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      });
    });

    // Secondary button animations
    const secondaryButtons = document.querySelectorAll('.hero-button-secondary');
    secondaryButtons.forEach((button) => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.02,
          borderWidth: '3px',
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          borderWidth: '2px',
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  },

  setupCardHovers() {
    // Blog card animations
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach((card) => {
      const image = card.querySelector('.blog-image');
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          duration: 0.4,
          ease: 'power2.out',
        });
        
        if (image) {
          gsap.to(image, {
            scale: 1.1,
            duration: 0.4,
            ease: 'power2.out',
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          duration: 0.4,
          ease: 'power2.out',
        });
        
        if (image) {
          gsap.to(image, {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          });
        }
      });
    });

    // Value card animations
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card) => {
      const icon = card.querySelector('.value-icon');
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -5,
          duration: 0.3,
          ease: 'power2.out',
        });
        
        if (icon) {
          gsap.to(icon, {
            scale: 1.1,
            rotation: 5,
            duration: 0.3,
            ease: 'back.out(1.7)',
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
        
        if (icon) {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      });
    });
  },

  setupIconAnimations() {
    // Pulse animation for status indicators
    gsap.to('.chat-status', {
      scale: 1.2,
      opacity: 0.7,
      duration: 1,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Navigation button hover effects
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach((button) => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          color: '#1e3a8a',
          scale: 1.05,
          duration: 0.2,
          ease: 'power2.out',
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          color: '#1d4ed8',
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        });
      });
    });
  },
};
