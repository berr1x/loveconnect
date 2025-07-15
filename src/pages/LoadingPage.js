import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import heartGif from '../assets/heart.gif';
import './LoadingPage.css';
import { getResult } from '../api';

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        alert('SessionId не найден. Начните сначала.');
        navigate('/');
        return;
      }
      try {
        const result = await getResult(sessionId);
        localStorage.setItem('compatibilityResult', JSON.stringify(result));
        navigate('/result');
      } catch (e) {
        alert('Ошибка получения результата: ' + e.message);
        navigate('/');
      }
    };
    fetchResult();
  }, [navigate]);

  return (
    <motion.div
      className="loading-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="loading-content">
        <motion.img
          src={heartGif}
          alt="Загрузка"
          className="loading-gif"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingPage; 