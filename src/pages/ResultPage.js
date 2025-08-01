import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CircularProgress from '../components/CircularProgress';
import './ResultPage.css';
import { useEffect, useState } from 'react';

const ResultPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [shareDisabled, setShareDisabled] = useState(false);
  const [newMatchDisabled, setNewMatchDisabled] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('compatibilityResult');
    if (data) {
      setResult(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!result) return null;

  const { percentage, matches, bottomText } = result;

  const handleShare = () => {
    if (shareDisabled) return;
    setShareDisabled(true);
    if (window.Telegram && window.Telegram.WebApp && typeof window.Telegram.WebApp.openTelegramLink === 'function') {
      // Формируем текст для отправки
      let shareText = `Совместимость: ${percentage}%\n`;
      shareText += matches.map(m => `• ${m}`).join('\n');
      shareText += `\n${bottomText}\n\nПерейти к боту: https://t.me/loveconnectai_bot`;
      // Кодируем текст для передачи в Telegram
      const encodedText = encodeURIComponent(shareText);
      const tgUrl = `https://t.me/share/url?url=&text=${encodedText}`;
      window.Telegram.WebApp.openTelegramLink(tgUrl);
      setTimeout(() => setShareDisabled(false), 2000); // разблокируем через 2 сек
    } else {
      // Fallback: просто копировать текст в буфер обмена
      let shareText = `Совместимость: ${percentage}%\n`;
      shareText += matches.map(m => `• ${m}`).join('\n');
      shareText += `\n${bottomText}\n\nПерейти к боту: https://t.me/loveconnectai_bot`;
      navigator.clipboard.writeText(shareText);
      alert('Текст результата скопирован! Вставьте его вручную в Telegram.');
      setTimeout(() => setShareDisabled(false), 2000);
    }
  };

  const handleNewMatch = () => {
    if (newMatchDisabled) return;
    setNewMatchDisabled(true);
    navigate('/');
    setTimeout(() => setNewMatchDisabled(false), 2000);
  };

  return (
    <motion.div
      className="result-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        className="result-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <CircularProgress percentage={percentage} animateProgress />
        <motion.h2
          className="result-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Прекрасно!
        </motion.h2>
        <motion.div
          className="result-separator"
          initial={{ opacity: 0, scaleX: 0.7 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        />
        <motion.div
          className="result-matches-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="result-matches-title">Разбор совпадений:</div>
          <div className="result-matches-list">
            {matches.map((item, idx) => (
              <motion.div
                className="result-match"
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.07, duration: 0.4 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="result-separator"
          initial={{ opacity: 0, scaleX: 0.7 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        />
        <motion.div
          className="result-bottom-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          {bottomText}
        </motion.div>
        <motion.div
          className="result-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          <motion.button
            className="result-btn share"
            onClick={handleShare}
            whileHover={{ scale: shareDisabled ? 1 : 1.06 }}
            whileTap={{ scale: shareDisabled ? 1 : 0.96 }}
            disabled={shareDisabled}
          >
            Поделиться результатом
          </motion.button>
          <motion.button
            className="result-btn new-match"
            onClick={handleNewMatch}
            whileHover={{ scale: newMatchDisabled ? 1 : 1.06 }}
            whileTap={{ scale: newMatchDisabled ? 1 : 0.96 }}
            disabled={newMatchDisabled}
          >
            Проверить новый мэтч
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ResultPage; 