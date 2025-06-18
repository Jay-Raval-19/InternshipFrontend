import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import DashboardNavbar from './components/DashboardNavbar';
import Dashboard from './pages/Dashboard';
import AboutPage from './pages/AboutPage';
import WhatWeBuy from './pages/WhatWeBuy';
import WhatWeSell from './pages/WhatWeSell';

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

const DashboardRoutes = ({ user, onLogout }: { user: any, onLogout: () => void }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/dashboard" element={<Dashboard user={user} onLogout={onLogout} />} />
        <Route path="/dashboard/about" element={<AboutPage user={user} />} />
        <Route path="/dashboard/what-we-buy" element={<WhatWeBuy user={user} />} />
        <Route path="/dashboard/what-we-sell" element={<WhatWeSell user={user} />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
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
    setIsLoginModalOpen(false);
    // Redirect to dashboard after successful login
    window.location.href = '/dashboard';
  };

  return (
    <>
      {/* Main app is always rendered, but hidden on mobile while loading */}
      <div style={isMobile && isLoading ? { display: 'none' } : {}}>
        <BrowserRouter>
          {user ? (
            // Logged in user - show dashboard navbar and routes
            <>
              <DashboardNavbar user={user} onLogout={handleLogout} />
              <div style={{ paddingTop: '4.5rem' }}>
                <DashboardRoutes user={user} onLogout={handleLogout} />
              </div>
            </>
          ) : (
            // Not logged in - show original header and routes
            <>
              <Header user={user} onLoginClick={handleLoginClick} onLogout={handleLogout} />
              <AnimatedRoutes onLoginClick={handleLoginClick} user={user} onLogout={handleLogout} />
            </>
          )}
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
