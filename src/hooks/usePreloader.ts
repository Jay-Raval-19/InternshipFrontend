
import { useState, useEffect } from 'react';

interface PreloaderState {
  isLoading: boolean;
  progress: number;
  error: string | null;
}

export const usePreloader = () => {
  const [state, setState] = useState<PreloaderState>({
    isLoading: false, // Start as false, will be set to true only for mobile
    progress: 0,
    error: null,
  });

  useEffect(() => {
    const preloadResources = async () => {
      try {
        // Simulate progressive loading
        const loadingSteps = [
          { step: 'Initializing...', progress: 10 },
          { step: 'Loading components...', progress: 30 },
          { step: 'Fetching data...', progress: 50 },
          { step: 'Optimizing images...', progress: 70 },
          { step: 'Finalizing...', progress: 90 },
          { step: 'Ready!', progress: 100 },
        ];

        for (const { progress } of loadingSteps) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setState(prev => ({ ...prev, progress }));
        }

        // Ensure minimum loading time for smooth animation
        await new Promise(resolve => setTimeout(resolve, 1000));

        setState(prev => ({ ...prev, isLoading: false }));
      } catch (error) {
        setState(prev => ({ 
          ...prev, 
          error: error instanceof Error ? error.message : 'Loading failed',
          isLoading: false 
        }));
      }
    };

    // Enhanced mobile detection
    const isMobile = () => {
      // Check screen width
      const isMobileWidth = window.innerWidth <= 768;
      
      // Check user agent for mobile devices
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/.test(userAgent);
      
      // Check for touch capability
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Device must meet multiple criteria to be considered mobile
      return isMobileWidth && (isMobileAgent || isTouchDevice);
    };

    // Check for slow connection (optional additional condition)
    const isSlowConnection = (navigator as any).connection?.effectiveType === '2g' || 
                           (navigator as any).connection?.effectiveType === 'slow-2g';

    // Only show loading screen on mobile devices
    if (isMobile() || isSlowConnection) {
      setState(prev => ({ ...prev, isLoading: true }));
      preloadResources();
    } else {
      // Skip loading screen on desktop/laptop devices
      setState({ isLoading: false, progress: 100, error: null });
    }
  }, []);

  return state;
};
