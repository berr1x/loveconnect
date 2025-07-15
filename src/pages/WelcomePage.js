import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import homeImage from '../assets/home.png';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/music');
  };

  return (
    <motion.div
      className="welcome-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="welcome-content">
        <div className="image-container">
          <motion.img 
            src={homeImage} 
            alt="Главная" 
            className="welcome-image"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
          />
        </div>
        
        <motion.h1 
          className="welcome-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Проверь свою совместимость
        </motion.h1>
        
        <motion.p 
          className="welcome-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Узнай, насколько вы подходите друг другу, по музыке, интересам и не только.
        </motion.p>
        
        <motion.button 
          className="welcome-button" 
          onClick={handleStart}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          Начать
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WelcomePage; 