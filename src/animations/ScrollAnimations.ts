
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const scrollAnimations = {
  init() {
    this.createParallaxEffects();
    this.createPinnedSections();
    this.createScrollProgress();
    this.createSmoothScrolling();
  },

  createParallaxEffects() {
    // Hero section parallax
    gsap.to('.hero-blob-1', {
      y: -100,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    gsap.to('.hero-blob-2', {
      y: -80,
      scale: 0.9,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Header background blur on scroll
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top -10',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const header = document.querySelector('.header');
        if (header) {
          const blur = Math.min(self.progress * 20, 10);
          gsap.set(header, {
            backdropFilter: `blur(${blur}px)`,
            backgroundColor: `rgba(255, 255, 255, ${0.9 + self.progress * 0.1})`,
          });
        }
      },
    });
  },

  createPinnedSections() {
    // Pin the phone demo while scrolling through steps
    ScrollTrigger.create({
      trigger: '.how-it-works-content',
      start: 'top 20%',
      end: 'bottom 80%',
      pin: '.phone-demo',
      pinSpacing: false,
      onUpdate: (self) => {
        // Add subtle rotation during pin
        gsap.to('.phone-frame', {
          rotationY: self.progress * 10 - 5,
          duration: 0.3,
          ease: 'power2.out',
        });
      },
    });
  },

  createScrollProgress() {
    // Create progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(to right, #2563eb, #9333ea);
      z-index: 1000;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.to(progressBar, {
          width: `${self.progress * 100}%`,
          duration: 0.1,
          ease: 'none',
        });
      },
    });
  },

  createSmoothScrolling() {
    // Smooth scroll behavior for navigation links
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const target = button.textContent?.toLowerCase().replace(' ', '');
        const targetElement = document.getElementById(target || '');
        
        if (targetElement) {
          gsap.to(window, {
            scrollTo: {
              y: targetElement,
              offsetY: 80,
            },
            duration: 1.5,
            ease: 'power3.inOut',
          });
        }
      });
    });

    // Add momentum scrolling effect
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
      if (!isScrolling) {
        isScrolling = true;
        gsap.to(document.body, {
          scale: 0.998,
          duration: 0.1,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(document.body, {
              scale: 1,
              duration: 0.2,
              ease: 'power2.out',
            });
            isScrolling = false;
          },
        });
      }
    });
  },
};
