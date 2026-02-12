import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/About';

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Router>
      <div className="relative min-h-screen font-sans selection:bg-cyan-400 selection:text-navy-950">
        <ScrollToTop />
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 origin-left z-[100]"
          style={{ scaleX }}
        />
        
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>

        {/* Footer Placeholder for visual balance - could be a component too */}
        <footer className="py-10 text-center text-gray-600 text-sm border-t border-white/5 mt-auto">
          © 2026 Capernum Solutions. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default App;
