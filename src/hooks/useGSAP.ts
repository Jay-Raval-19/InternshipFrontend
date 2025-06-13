
import { useEffect, useRef } from 'react';
import { gsapController } from '../animations/GSAPController';

export const useGSAP = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      // Longer delay to ensure DOM is fully ready after navigation
      const timer = setTimeout(() => {
        // Check if elements exist before initializing
        const sections = document.querySelectorAll('.animate-section');
        if (sections.length > 0) {
          gsapController.init();
          initialized.current = true;
        } else {
          // Retry if elements aren't ready yet
          setTimeout(() => {
            const retryCheck = document.querySelectorAll('.animate-section');
            if (retryCheck.length > 0) {
              gsapController.init();
              initialized.current = true;
            }
          }, 200);
        }
      }, 200);

      return () => clearTimeout(timer);
    }

    return () => {
      if (initialized.current) {
        gsapController.destroy();
        initialized.current = false;
      }
    };
  }, []);

  const refresh = () => {
    if (initialized.current) {
      gsapController.refresh();
    }
  };

  return { refresh };
};
