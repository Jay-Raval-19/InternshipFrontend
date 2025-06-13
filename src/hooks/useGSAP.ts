
import { useEffect, useRef } from 'react';
import { gsapController } from '../animations/GSAPController';

export const useGSAP = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      console.log('useGSAP: Initializing GSAP...');
      
      // Ensure content is visible immediately as fallback
      const ensureVisibility = () => {
        const sections = document.querySelectorAll('.animate-section');
        sections.forEach(section => {
          (section as HTMLElement).style.opacity = '1';
          (section as HTMLElement).style.transform = 'translateY(0)';
        });
        console.log('useGSAP: Ensured visibility for', sections.length, 'sections');
      };

      // Immediate visibility check
      ensureVisibility();

      // Initialize GSAP with a very short delay
      const timer = setTimeout(() => {
        // Double-check visibility before initializing
        ensureVisibility();
        
        gsapController.init();
        initialized.current = true;
        console.log('useGSAP: GSAP initialized');
      }, 50);

      return () => clearTimeout(timer);
    }

    return () => {
      if (initialized.current) {
        console.log('useGSAP: Cleaning up GSAP...');
        gsapController.destroy();
        initialized.current = false;
      }
    };
  }, []);

  const refresh = () => {
    if (initialized.current) {
      console.log('useGSAP: Refreshing GSAP...');
      gsapController.refresh();
    }
  };

  return { refresh };
};
