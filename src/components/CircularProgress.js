import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import './CircularProgress.css';

const CircularProgress = ({ percentage = 85, animateProgress = false }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const [progress, setProgress] = React.useState(animateProgress ? 0 : percentage);

  React.useEffect(() => {
    if (animateProgress) {
      setProgress(0);
      const timeout = setTimeout(() => setProgress(percentage), 200);
      return () => clearTimeout(timeout);
    } else {
      setProgress(percentage);
    }
  }, [percentage, animateProgress]);

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="circular-progress-container">
      <svg className="circular-progress" width="150" height="150">
        {/* Фоновый круг */}
        <circle
          cx="75"
          cy="75"
          r={radius}
          stroke="#E6F3FF"
          strokeWidth="8"
          fill="none"
        />
        {/* Прогресс круг */}
        <motion.circle
          cx="75"
          cy="75"
          r={radius}
          stroke="#9D6BFF"
          strokeWidth="8"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 75 75)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </svg>
      <motion.div
        className="percentage-text"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {progress}%
      </motion.div>
    </div>
  );
};

export default CircularProgress; 