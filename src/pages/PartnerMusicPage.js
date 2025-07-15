import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import musicImage from '../assets/music.png';
import './PartnerMusicPage.css';
import { uploadPartnerMusic } from '../api';

const PartnerMusicPage = () => {
  const navigate = useNavigate();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (files) => {
    const newImages = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      preview: URL.createObjectURL(file)
    }));
    
    const totalImages = uploadedImages.length + newImages.length;
    if (totalImages <= 10) {
      setUploadedImages([...uploadedImages, ...newImages]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files);
    }
  };

  const removeImage = (id) => {
    setUploadedImages(uploadedImages.filter(img => img.id !== id));
  };

  const handleContinue = async () => {
    if (uploadedImages.length >= 3) {
      try {
        const files = uploadedImages.map(img => img.file);
        const sessionId = localStorage.getItem('sessionId');
        if (!sessionId) throw new Error('SessionId не найден. Начните сначала.');
        await uploadPartnerMusic(files, sessionId);
        navigate('/loading');
      } catch (e) {
        alert('Ошибка загрузки файлов: ' + e.message);
      }
    }
  };

  return (
    <motion.div
      className="partner-music-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="partner-music-content">
        <div className="image-container">
          <motion.img
            src={musicImage}
            alt="Музыка девушки"
            className="partner-music-image"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
          />
        </div>
        
        <motion.h1
          className="partner-music-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Музыка девушки
        </motion.h1>
        
        <motion.p
          className="partner-music-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Загрузи скриншот плейлиста девушки (Spotify, Яндекс.Музыка и т.д.)
        </motion.p>

        <motion.div
          className={`upload-area ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="file-input"
            id="partner-file-input"
          />
          <label htmlFor="partner-file-input" className="upload-button">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.3745 5.42111L8.55 3.23557V12.3483C8.55 12.6004 8.65009 12.8421 8.82825 13.0203C9.00641 13.1985 9.24804 13.2986 9.5 13.2986C9.75196 13.2986 9.99359 13.1985 10.1718 13.0203C10.3499 12.8421 10.45 12.6004 10.45 12.3483V3.23557L12.6255 5.42111C12.7138 5.51018 12.8189 5.58087 12.9347 5.62911C13.0504 5.67735 13.1746 5.70219 13.3 5.70219C13.4254 5.70219 13.5496 5.67735 13.6653 5.62911C13.7811 5.58087 13.8862 5.51018 13.9745 5.42111C14.0635 5.33278 14.1342 5.22768 14.1824 5.11189C14.2307 4.99609 14.2555 4.87189 14.2555 4.74645C14.2555 4.621 14.2307 4.4968 14.1824 4.38101C14.1342 4.26521 14.0635 4.16011 13.9745 4.07178L10.1745 0.27083C10.0842 0.18432 9.97761 0.116507 9.861 0.0712806C9.62971 -0.0237602 9.37029 -0.0237602 9.139 0.0712806C9.02239 0.116507 8.91585 0.18432 8.8255 0.27083L5.0255 4.07178C4.93692 4.16038 4.86666 4.26556 4.81872 4.38132C4.77079 4.49708 4.74611 4.62115 4.74611 4.74645C4.74611 4.87174 4.77079 4.99581 4.81872 5.11157C4.86666 5.22733 4.93692 5.33252 5.0255 5.42111C5.11408 5.50971 5.21923 5.57999 5.33496 5.62794C5.45069 5.67589 5.57473 5.70057 5.7 5.70057C5.82527 5.70057 5.94931 5.67589 6.06504 5.62794C6.18077 5.57999 6.28592 5.50971 6.3745 5.42111ZM18.05 9.49763C17.798 9.49763 17.5564 9.59774 17.3782 9.77595C17.2001 9.95415 17.1 10.1958 17.1 10.4479V16.1493C17.1 16.4013 16.9999 16.643 16.8218 16.8212C16.6436 16.9994 16.402 17.0995 16.15 17.0995H2.85C2.59804 17.0995 2.35641 16.9994 2.17825 16.8212C2.00009 16.643 1.9 16.4013 1.9 16.1493V10.4479C1.9 10.1958 1.79991 9.95415 1.62175 9.77595C1.44359 9.59774 1.20196 9.49763 0.95 9.49763C0.698044 9.49763 0.456408 9.59774 0.278249 9.77595C0.100089 9.95415 0 10.1958 0 10.4479V16.1493C0 16.9053 0.300267 17.6304 0.834746 18.165C1.36922 18.6997 2.09413 19 2.85 19H16.15C16.9059 19 17.6308 18.6997 18.1653 18.165C18.6997 17.6304 19 16.9053 19 16.1493V10.4479C19 10.1958 18.8999 9.95415 18.7218 9.77595C18.5436 9.59774 18.302 9.49763 18.05 9.49763Z" fill="#FF6B9D"/>
            </svg>
            Загрузить изображение
          </label>
        </motion.div>
        
        <p className="upload-hint">
          от 3 до 10 скриншотов
        </p>

        <AnimatePresence>
        {uploadedImages.length > 0 && (
          <motion.div 
            className="uploaded-images"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <h3>Загруженные изображения ({uploadedImages.length}/10)</h3>
            <div className="images-grid">
              <AnimatePresence>
              {uploadedImages.map((image) => (
                <motion.div 
                  key={image.id} 
                  className="image-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={image.preview} alt="Загруженное изображение" />
                  <motion.button 
                    className="remove-image"
                    onClick={() => removeImage(image.id)}
                    whileTap={{ scale: 0.8 }}
                  >
                    ×
                  </motion.button>
                </motion.div>
              ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
        </AnimatePresence>

        <motion.button 
          className={`continue-button ${uploadedImages.length >= 3 ? 'active' : 'disabled'}`}
          onClick={handleContinue}
          disabled={uploadedImages.length < 3}
          whileHover={{ scale: uploadedImages.length >= 3 ? 1.06 : 1 }}
          whileTap={{ scale: uploadedImages.length >= 3 ? 0.96 : 1 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          Продолжить
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PartnerMusicPage; 