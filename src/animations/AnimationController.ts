
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroAnimations } from './HeroAnimations';
import { sectionAnimations } from './SectionAnimations';
import { microInteractions } from './MicroInteractions';
import { scrollAnimations } from './ScrollAnimations';
import { mobileOptimizations } from './MobileOptimizations';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export class AnimationController {
  private static instance: AnimationController;
  private isInitialized = false;

  static getInstance(): AnimationController {
    if (!AnimationController.instance) {
      AnimationController.instance = new AnimationController();
    }
    return AnimationController.instance;
  }

  init(): void {
    if (this.isInitialized) return;

    // Wait for DOM to be ready
    const initAnimations = () => {
      // Set default GSAP settings for performance
      gsap.config({
        force3D: true,
        nullTargetWarn: false,
      });

      // Ensure ALL elements are visible by default - this is crucial
      gsap.set("*", { 
        visibility: "visible",
        opacity: 1,
        clearProps: "transform"
      });

      // Initialize mobile optimizations first
      mobileOptimizations.init();

      // Initialize animations with longer delay to ensure DOM is fully ready
      setTimeout(() => {
        try {
          heroAnimations.init();
          sectionAnimations.init();
          microInteractions.init();
          scrollAnimations.init();
        } catch (error) {
          console.warn('Animation initialization error:', error);
          // Ensure content is still visible even if animations fail
          gsap.set("*", { visibility: "visible", opacity: 1 });
        }
      }, 300);

      this.isInitialized = true;
    };

    // Check if DOM is already loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
      // Add a small delay even if DOM is ready
      setTimeout(initAnimations, 100);
    }
  }

  refresh(): void {
    if (this.isInitialized) {
      ScrollTrigger.refresh();
    }
  }

  destroy(): void {
    ScrollTrigger.killAll();
    gsap.killTweensOf("*");
    // Ensure content remains visible after cleanup
    gsap.set("*", { visibility: "visible", opacity: 1, clearProps: "all" });
    this.isInitialized = false;
  }
}

export const animationController = AnimationController.getInstance();
