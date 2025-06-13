
import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [animationPhase, setAnimationPhase] = useState('initial');

  useEffect(() => {
    // Simulate progressive loading with realistic timing
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 30) return prev + 2;
        if (prev < 60) return prev + 1;
        if (prev < 90) return prev + 0.5;
        return prev + 0.1;
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
        setAnimationPhase('fadeOut');
        setTimeout(onLoadingComplete, 600);
      }, 500);
    }, 4000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(phaseTimeout1);
      clearTimeout(phaseTimeout2);
      clearTimeout(phaseTimeout3);
      clearTimeout(loadingTimeout);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`loading-screen ${animationPhase}`}>
      <div className="loading-container">
        {/* Main logo animation */}
        <div className="logo-animation">
          <div className="logo-circle primary"></div>
          <div className="logo-circle secondary"></div>
          <div className="logo-circle accent"></div>
        </div>

        {/* Brand name with letter animation */}
        <div className="brand-name">
          <span className="letter">T</span>
          <span className="letter">r</span>
          <span className="letter">a</span>
          <span className="letter">d</span>
          <span className="letter">i</span>
          <span className="letter">o</span>
        </div>

        {/* Progress indicators */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-dots">
            <div className="dot active"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="loading-text">
          <span>Loading your procurement platform...</span>
        </div>
      </div>

      {/* Background animation elements */}
      <div className="bg-animation">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
