
import React, { useEffect, useState } from 'react';
import './MobileLoader.css';

interface MobileLoaderProps {
  onLoadComplete: () => void;
}

const MobileLoader: React.FC<MobileLoaderProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [animationPhase, setAnimationPhase] = useState('initial');
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate progressive loading with realistic timing
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 30) return prev + 2;
        if (prev < 60) return prev + 1;
        if (prev < 90) return prev + 0.5;
        return Math.min(prev + 0.2, 100);
      });
    }, 100);

    // Phase transitions for animation
    const phaseTimeout1 = setTimeout(() => setAnimationPhase('expanding'), 800);
    const phaseTimeout2 = setTimeout(() => setAnimationPhase('pulsing'), 2000);
    const phaseTimeout3 = setTimeout(() => setAnimationPhase('completing'), 3500);

    // Complete loading after minimum time and when progress reaches 100%
    const loadingTimeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(onLoadComplete, 600);
      }, 500);
    }, 4000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(phaseTimeout1);
      clearTimeout(phaseTimeout2);
      clearTimeout(phaseTimeout3);
      clearTimeout(loadingTimeout);
    };
  }, [onLoadComplete]);

  return (
    <div className={`loading-screen ${animationPhase} ${fadeOut ? 'fadeOut' : ''}`}>
      <div className="bg-animation">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>
      
      <div className="loading-container">
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="progress-dots">
            <div className={`dot ${progress > 0 ? 'active' : ''}`}></div>
            <div className={`dot ${progress > 25 ? 'active' : ''}`}></div>
            <div className={`dot ${progress > 50 ? 'active' : ''}`}></div>
            <div className={`dot ${progress > 75 ? 'active' : ''}`}></div>
          </div>
          
          <div className="loading-text">
            Loading your experience...
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileLoader;
