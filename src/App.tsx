import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogPage from "./components/BlogPage";
import AllArticles from "./components/AllArticles";
import MobileLoader from "./components/MobileLoader";
import { useIsMobile } from "./hooks/use-mobile";
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/articles" element={<AllArticles />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Only show loader for mobile devices
    if (isMobile) {
      setIsLoading(true);
    }
  }, [isMobile]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Main app is always rendered, but hidden on mobile while loading */}
      <div style={isMobile && isLoading ? { display: 'none' } : {}}>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </div>
      {/* Loader overlays only on mobile while loading */}
      {isMobile && isLoading && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: '#fff' }}>
          <MobileLoader onLoadComplete={handleLoadComplete} />
        </div>
      )}
    </>
  );
};

export default App;
