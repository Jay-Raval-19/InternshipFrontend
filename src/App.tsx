
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogPage from "./components/BlogPage";
import AllArticles from "./components/AllArticles";
import MobileLoader from "./components/MobileLoader";
import { useIsMobile } from "./hooks/use-mobile";

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

  if (isLoading && isMobile) {
    return <MobileLoader onLoadComplete={handleLoadComplete} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/articles" element={<AllArticles />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
