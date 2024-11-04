// TestPopup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import i18n from '@/i18n';
import './ProfilePopup.css';

const TestPopup = ({ closePopup, productId, productName, productImage }) => {
  const navigate = useNavigate();
  const [trialPeriodDays, setTrialPeriodDays] = useState(3);
  const [error, setError] = useState(null); // Estado para manejar errores
  const { t } = useTranslation();

  const handleTrialPeriodChange = (e) => {
    setTrialPeriodDays(Number(e.target.value));
  };

// TestPopup.jsx
const handleContinue = async () => {
    const userId = localStorage.getItem('userId'); // Cambia a userId (minúsculas)
    if (!userId) {
      setError("User ID is missing");
      return;
    }
  
    try {
      console.log("Enviando datos al servidor...");
      await axios.post('/api/tests', {
        userID: userId, // Usa userId para mantener consistencia con el backend
        itemID: productId,
        trialPeriodDays, // Enviar trialPeriodDays al backend
      });
      console.log("Test registrado, cerrando popup...");
      closePopup(); // Cierra el popup después de realizar el POST
    } catch (error) {
      console.error("Error al registrar el test:", error);
      setError("Error registering the test. Please try again.");
    }
  };
  

  return (
    <div className="popupOverlayqwer">
      <div className="popupContentqwer">
        <div className='oasmpdsop'>
          <div className='iodsfino'>
            {t('H1I2J3K4L5M6')} {/* Test */}
          </div>
          <button onClick={closePopup} className="iodfna">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className='ioansdfaxc'>
          <div className="psjdfop">
            <div className="XyZpQrLkJiHg">
              <img src={productImage} alt={productName} />
            </div>
            
            <div className="productInfoDisplay">
              <p><strong>{t('W7X8Y9Z0A1B2')}:</strong> {productName}</p> {/* Product */}
            </div>
            
            <div className="dloimnv">
              <label>{t('T3U4V5W6X7Y8')}:</label> {/* Select number of days */}
              <select value={trialPeriodDays} onChange={handleTrialPeriodChange} className="woiurtn">
                <option value="2">{t('GjHtRnMkVpLs', { count: 2 })}</option>
                <option value="3">{t('GjHtRnMkVpLs', { count: 3 })}</option>
                <option value="4">{t('GjHtRnMkVpLs', { count: 4 })}</option>
                <option value="5">{t('GjHtRnMkVpLs', { count: 5 })}</option>
              </select>
            </div>
            
            <p className="confirmationText">{t('M9N0O1P2Q3R4')}</p> {/* Are you sure that you want to do this test? */}
            
            <button onClick={handleContinue} className="tttyyyuuu">
              {t('A5B6C7D8E9F0')} {/* Continue */}
            </button>
          </div>
          
          {error && <p className="errorText">{error}</p>} {/* Muestra el error si existe */}
        </div>
      </div>
    </div>
  );
};

export default TestPopup;
