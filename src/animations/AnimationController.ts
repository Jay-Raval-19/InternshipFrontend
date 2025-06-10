
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

    // Set default GSAP settings for performance
    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    });

    // Initialize mobile optimizations first
    mobileOptimizations.init();

    // Initialize all animation modules
    heroAnimations.init();
    sectionAnimations.init();
    microInteractions.init();
    scrollAnimations.init();

    this.isInitialized = true;
  }

  refresh(): void {
    ScrollTrigger.refresh();
  }

  destroy(): void {
    ScrollTrigger.killAll();
    gsap.killTweensOf("*");
    this.isInitialized = false;
  }
}

export const animationController = AnimationController.getInstance();
