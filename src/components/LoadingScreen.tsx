
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

  // Generate hexagonal grid elements
  const generateHexGrid = () => {
    const hexElements = [];
    const positions = [
      // Center
      { class: 'center-gel', id: 'center' },
      // Ring 1
      { class: 'c1 r1', id: 'c1' },
      { class: 'c2 r1', id: 'c2' },
      { class: 'c3 r1', id: 'c3' },
      { class: 'c4 r1', id: 'c4' },
      { class: 'c5 r1', id: 'c5' },
      { class: 'c6 r1', id: 'c6' },
      // Ring 2
      { class: 'c7 r2', id: 'c7' },
      { class: 'c8 r2', id: 'c8' },
      { class: 'c9 r2', id: 'c9' },
      { class: 'c10 r2', id: 'c10' },
      { class: 'c11 r2', id: 'c11' },
      { class: 'c12 r2', id: 'c12' },
      { class: 'c13 r2', id: 'c13' },
      { class: 'c14 r2', id: 'c14' },
      { class: 'c15 r2', id: 'c15' },
      { class: 'c16 r2', id: 'c16' },
      { class: 'c17 r2', id: 'c17' },
      { class: 'c18 r2', id: 'c18' },
      // Ring 3
      { class: 'c19 r3', id: 'c19' },
      { class: 'c20 r3', id: 'c20' },
      { class: 'c21 r3', id: 'c21' },
      { class: 'c22 r3', id: 'c22' },
      { class: 'c23 r3', id: 'c23' },
      { class: 'c24 r3', id: 'c24' },
      { class: 'c25 r3', id: 'c25' },
      { class: 'c26 r3', id: 'c26' },
      { class: 'c28 r3', id: 'c28' },
      { class: 'c29 r3', id: 'c29' },
      { class: 'c30 r3', id: 'c30' },
      { class: 'c31 r3', id: 'c31' },
      { class: 'c32 r3', id: 'c32' },
      { class: 'c33 r3', id: 'c33' },
      { class: 'c34 r3', id: 'c34' },
      { class: 'c35 r3', id: 'c35' },
      { class: 'c36 r3', id: 'c36' },
      { class: 'c37 r3', id: 'c37' }
    ];

    positions.forEach((pos) => {
      hexElements.push(
        <div key={pos.id} className={`gel ${pos.class}`}>
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
      );
    });

    return hexElements;
  };

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

      {/* Hexagonal grid animation background */}
      <div className="hex-grid-container">
        <div className="hex-socket hex-socket-1">
          {generateHexGrid()}
        </div>
        <div className="hex-socket hex-socket-2">
          {generateHexGrid()}
        </div>
        <div className="hex-socket hex-socket-3">
          {generateHexGrid()}
        </div>
        <div className="hex-socket hex-socket-4">
          {generateHexGrid()}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
