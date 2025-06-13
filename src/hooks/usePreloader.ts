
import { useState, useEffect } from 'react';

interface PreloaderState {
  isLoading: boolean;
  progress: number;
  error: string | null;
}

export const usePreloader = () => {
  const [state, setState] = useState<PreloaderState>({
    isLoading: true,
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

    // Only run preloader on mobile devices or slow connections
    const isMobile = window.innerWidth <= 768;
    const isSlowConnection = (navigator as any).connection?.effectiveType === '2g' || 
                           (navigator as any).connection?.effectiveType === 'slow-2g';

    if (isMobile || isSlowConnection) {
      preloadResources();
    } else {
      // Skip loading screen on desktop/fast connections
      setState({ isLoading: false, progress: 100, error: null });
    }
  }, []);

  return state;
};
