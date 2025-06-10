
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

      // Ensure all elements are visible by default
      gsap.set("*", { visibility: "visible" });

      // Initialize mobile optimizations first
      mobileOptimizations.init();

      // Initialize all animation modules with delay to ensure DOM is ready
      setTimeout(() => {
        heroAnimations.init();
        sectionAnimations.init();
        microInteractions.init();
        scrollAnimations.init();
      }, 100);

      this.isInitialized = true;
    };

    // Check if DOM is already loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
      initAnimations();
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
    this.isInitialized = false;
  }
}

export const animationController = AnimationController.getInstance();
