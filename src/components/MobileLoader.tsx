
import React, { useState, useEffect } from 'react';
import './MobileLoader.css';

interface MobileLoaderProps {
  onLoadComplete: () => void;
}

const MobileLoader: React.FC<MobileLoaderProps> = ({ onLoadComplete }) => {
  const [loadingStage, setLoadingStage] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const stages = [
      { delay: 500, stage: 1 },
      { delay: 1000, stage: 2 },
      { delay: 1500, stage: 3 },
      { delay: 2000, stage: 4 }
    ];

    stages.forEach(({ delay, stage }) => {
      setTimeout(() => setLoadingStage(stage), delay);
    });

    // Check if all resources are loaded
    const checkResourcesLoaded = () => {
      const images = Array.from(document.images);
      const allImagesLoaded = images.every(img => img.complete);
      
      if (document.readyState === 'complete' && allImagesLoaded) {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onLoadComplete, 800);
        }, 2500);
      } else {
        setTimeout(checkResourcesLoaded, 100);
      }
    };

    setTimeout(checkResourcesLoaded, 2000);
  }, [onLoadComplete]);

  return (
    <div className={`mobile-loader ${isExiting ? 'exiting' : ''}`}>
      <div className="loader-background">
        <div className="loader-gradient"></div>
      </div>
      
      <div className="loader-content">
        <div className="logo-container">
          <div className="animated-logo">
            <img 
              src="/sourceeasy-logo-final-removebg-preview.png" 
              alt="SourceEasy" 
              className="loader-logo"
            />
          </div>
          <div className={`logo-text ${loadingStage >= 1 ? 'visible' : ''}`}>
            SourceEasy
          </div>
        </div>

        <div className="loading-animation">
          <div className="dots-container">
            <div className={`dot dot-1 ${loadingStage >= 2 ? 'active' : ''}`}></div>
            <div className={`dot dot-2 ${loadingStage >= 3 ? 'active' : ''}`}></div>
            <div className={`dot dot-3 ${loadingStage >= 4 ? 'active' : ''}`}></div>
          </div>
          
          <div className={`loading-text ${loadingStage >= 2 ? 'visible' : ''}`}>
            Loading your experience...
          </div>
        </div>

        <div className="progress-bar">
          <div className={`progress-fill stage-${loadingStage}`}></div>
        </div>
      </div>

      <div className="floating-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
      </div>
    </div>
  );
};

export default MobileLoader;
