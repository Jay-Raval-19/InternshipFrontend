
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import BlogPage from './components/BlogPage';
import AllArticles from './components/AllArticles';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
            <Route path="/articles" element={<AllArticles />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ThemeToggle />
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
