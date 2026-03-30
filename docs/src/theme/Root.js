import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import { motion, AnimatePresence } from 'framer-motion';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function Root({ children }) {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && ExecutionEnvironment.canUseDOM && (
          <motion.div
            key="intro-loader"
            className="kurimod-intro-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <div className="kurimod-loader-spinner"></div>
            <div className="kurimod-loader-text">KURIMOD</div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
