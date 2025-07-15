import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import heartGif from '../assets/heart.gif';
import './LoadingPage.css';
import { getResult } from '../api';

const LoadingPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(10); // 10 секунд ожидания по умолчанию

  useEffect(() => {
    let interval;
    let timeout;
    let isFinished = false;
    const fetchResult = async () => {
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        alert('SessionId не найден. Начните сначала.');
        navigate('/');
        return;
      }
      try {
        timeout = setTimeout(() => {
          if (!isFinished) setTimer(0);
        }, 10000); // максимум 10 секунд
        interval = setInterval(() => {
          setProgress(prev => (prev < 100 ? prev + 1 : 100));
          setTimer(prev => (prev > 0 ? prev - 1 : 0));
        }, 100);
        const result = await getResult(sessionId);
        isFinished = true;
        clearInterval(interval);
        clearTimeout(timeout);
        localStorage.setItem('compatibilityResult', JSON.stringify(result));
        navigate('/result');
      } catch (e) {
        isFinished = true;
        clearInterval(interval);
        clearTimeout(timeout);
        alert('Ошибка получения результата: ' + e.message);
        navigate('/');
      }
    };
    fetchResult();
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
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
        <div style={{ marginTop: 24, fontSize: 18, color: '#9D6BFF', fontWeight: 500 }}>
          Анализируем совместимость.
        </div>
        <div style={{ marginTop: 12, width: 180, height: 8, background: '#eee', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: '#9D6BFF', transition: 'width 0.1s' }} />
        </div>
        <div style={{ marginTop: 6, color: '#888', fontSize: 14 }}>
          {timer > 0 ? `Осталось ~${timer} сек.` : 'Почти готово...'}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingPage; 