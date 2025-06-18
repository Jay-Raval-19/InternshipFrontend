import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./lib/firebase";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogPage from "./components/BlogPage";
import AllArticles from "./components/AllArticles";
import MobileLoader from "./components/MobileLoader";
import { useIsMobile } from "./hooks/use-mobile";
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import LoginModal from './components/Login';
import Header from './components/Header';

const AnimatedRoutes = ({ onLoginClick, user, onLogout }: { onLoginClick: () => void, user: any, onLogout: () => void }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index onLoginClick={onLoginClick} user={user} onLogout={onLogout} />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/articles" element={<AllArticles />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const isMobile = useIsMobile();

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data());
          } else {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
            });
          }
        } catch (err) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          });
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Only show loader for mobile devices
    if (isMobile) {
      setIsLoading(true);
    }
  }, [isMobile]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <>
      {/* Main app is always rendered, but hidden on mobile while loading */}
      <div style={isMobile && isLoading ? { display: 'none' } : {}}>
        <BrowserRouter>
          <Header user={user} onLoginClick={handleLoginClick} onLogout={handleLogout} />
          <AnimatedRoutes onLoginClick={handleLoginClick} user={user} onLogout={handleLogout} />
        </BrowserRouter>
      </div>
      {/* Loader overlays only on mobile while loading */}
      {isMobile && isLoading && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: '#fff' }}>
          <MobileLoader onLoadComplete={handleLoadComplete} />
        </div>
      )}
      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleLoginClose}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default App;
