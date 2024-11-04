// ProductSearchBox.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProductContext } from '../ProductContext';
import "../components/Header.css";

const ProductSearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setSearchResults, setSearchTerm: setContextSearchTerm } = useProductContext();
  const { t } = useTranslation(); // Hook de traducción

  const handleSearch = async (event) => {
    if (event.key === 'Enter') {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&json=1`
        );
        setContextSearchTerm(searchTerm);
        setSearchResults(response.data.products.slice(0, 20));
        navigate('/productsearch');
      } catch (error) {
        console.error('Error al buscar productos:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="search-box-container">
      <input
        type="text"
        placeholder={t('AbCdEfGhIjKl')} // Usar traducción para el placeholder
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleSearch}
        className="searchBar"
        disabled={loading}
      />
      {loading && <div className="spinner"></div>}
    </div>
  );
};

export default ProductSearchBox;
