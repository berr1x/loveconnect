import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import partnerImage from '../assets/partner.png';
import './PartnerPage.css';

const PartnerPage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/partner-music');
  };

  return (
    <motion.div
      className="partner-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="partner-content">
        <div className="image-container">
          <motion.img
            src={partnerImage}
            alt="Партнер"
            className="partner-image"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
          />
        </div>
        
        <motion.h1
          className="partner-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Теперь о ней/о нём
        </motion.h1>
        
        <motion.p
          className="partner-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Давайте узнаем предпочтения второго партнёра вместе!
        </motion.p>
        
        <motion.button
          className="partner-button"
          onClick={handleContinue}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          Продолжить
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PartnerPage; 