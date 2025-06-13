
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { usePreloader } from "./hooks/usePreloader";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => {
  const { isLoading } = usePreloader();
  const [showApp, setShowApp] = useState(false);

  const handleLoadingComplete = () => {
    setShowApp(true);
  };

  if (isLoading || !showApp) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
