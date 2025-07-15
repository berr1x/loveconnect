import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  return (
    <div className="animated-bg">
      <motion.div
        className="blob blob1"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, 20, -30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="blob blob2"
        animate={{
          x: [0, -25, 20, 0],
          y: [0, -15, 25, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="blob blob3"
        animate={{
          x: [0, 15, -10, 0],
          y: [0, 10, -15, 0],
          scale: [1, 1.08, 0.92, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default AnimatedBackground; 