import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showToast, setShowToast] = useState(false); // Estado para controlar el toast
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      setPasswordValid(value.length >= 8);
      setPasswordsMatch(value === formData.confirmPassword);
    } else if (name === 'confirmPassword') {
      setPasswordsMatch(value === formData.password);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordValid) {
      alert(t('HsJkTrLvBnLk')); // La contraseña debe tener al menos 8 caracteres.
      return;
    }

    if (!passwordsMatch) {
      alert(t('FkLnRtQwXzTv')); // Las contraseñas no coinciden.
      return;
    }

    const browserLanguage = i18n.language || 'en';
    const userLanguage = ['en', 'es'].includes(browserLanguage) ? browserLanguage : 'en';

    try {
      const response = await fetch('http://localhost:5001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          language: userLanguage,
          trialPeriodDays: 5,
        }),
      });

      if (response.status === 409) {
        setShowToast(true); // Mostrar el toast cuando el correo ya esté registrado
        return;
      }

      if (!response.ok) {
        throw new Error('Error al crear la cuenta');
      }

      const data = await response.json();
      console.log('Cuenta creada:', data);

      navigate('/');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert(t('LjRtKqXsVwMn')); // Hubo un error al registrar el usuario. Inténtalo de nuevo.
    }
  };

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>{t('PgLrTqJsXzVm')}</h2> {/* Crear Cuenta */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('JqPwFxTlRvNw')}</label> {/* Nombre */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('FrWpNtQjLzMv')}</label> {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('LfNrTjPwXzQk')}</label> {/* Contraseña */}
            <div className="password-input-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            {!passwordValid && formData.password.length > 0 && (
              <p className="error-text2">{t('HsJkTrLvBnLk')}</p>
            )}
          </div>
          <div className="form-group">
            <label>{t('XnLqTvFrRmNs')}</label> {/* Confirmar Contraseña */}
            <div className="password-input-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="toggle-password-button"
              >
                {passwordVisible ? t('PqFsRvJmXtQl') : t('LmPsQwNrTvFx')} {/* Mostrar/Ocultar */}
              </button>
            </div>
            {!passwordsMatch && formData.confirmPassword.length > 0 && (
              <p className="error-text2">{t('FkLnRtQwXzTv')}</p>
            )}
          </div>
          <button
            type="submit"
            className="signup-button"
            disabled={!passwordValid || !passwordsMatch}
          >
            {t('JsRwNqTwXlBt')} {/* Registrarse */}
          </button>
        </form>
        <div className="signup-footer">
          <button onClick={handleLoginClick} className="login-link">
            {t('LqKsTwFxRjXp')} {/* ¿Ya tienes una cuenta? Inicia Sesión */}
          </button>
        </div>
      </div>
      {showToast && ( // Mostrar el toast si `showToast` es verdadero
        <div
          id="toast-warning"
          className="flex items-right w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
            </svg>
            <span className="sr-only">Warning icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            {t('JsNxPwRqLmBt')} {/* El correo ya está registrado. */}
          </div>
          <button
            type="button"
            onClick={() => setShowToast(false)} // Ocultar el toast al hacer clic en el botón
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-warning"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
