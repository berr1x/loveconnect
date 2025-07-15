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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let interval;
    let startTime = Date.now();
    let minDuration = 3000; // минимум 3 секунды для UX
    let maxDuration = 20000; // максимум 20 секунд ожидания
    let finished = false;
    const fetchResult = async () => {
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        alert('SessionId не найден. Начните сначала.');
        navigate('/');
        return;
      }
      try {
        setIsLoading(true);
        setProgress(0);
        setTimer(10);
        interval = setInterval(() => {
          setProgress(prev => (prev < 98 ? prev + 1 : 98));
        }, maxDuration / 100);
        const result = await getResult(sessionId);
        finished = true;
        const elapsed = Date.now() - startTime;
        const wait = Math.max(minDuration - elapsed, 0);
        setTimeout(() => {
          setProgress(100);
          setIsLoading(false);
          localStorage.setItem('compatibilityResult', JSON.stringify(result));
          navigate('/result');
        }, wait);
      } catch (e) {
        finished = true;
        setIsLoading(false);
        clearInterval(interval);
        alert('Ошибка получения результата: ' + e.message);
        navigate('/');
      }
    };
    fetchResult();
    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <motion.div
      className="loading-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="loading-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
        <div style={{ marginTop: 12, width: 180, height: 8, background: '#eee', borderRadius: 8, overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: '#9D6BFF', transition: 'width 0.2s' }} />
        </div>
        <div style={{ marginTop: 6, color: '#888', fontSize: 14, textAlign: 'center' }}>
          {isLoading ? 'Пожалуйста, подождите...' : 'Почти готово...'}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingPage; 