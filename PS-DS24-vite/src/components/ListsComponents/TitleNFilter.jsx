// TitleNFilter.jsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importar el hook de traducción
import ItemsG from './ItemsG';
import ItemsL from './ItemsL';
import './TitleNFilter.css';
import axios from 'axios';

const TitleNFilter = () => {
  const [view, setView] = useState('grid');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  const { t } = useTranslation(); // Hook de traducción

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        
        // Primero obtenemos la lista desde la base de datos
        const response = await axios.get(`http://localhost:5001/api/listsensitivity/${userId}`);
        const rawItems = response.data;
        
        // Luego, obtenemos los detalles de cada producto de Open Food Facts
        const detailedItems = await Promise.all(
          rawItems.map(async (item) => {
            const productResponse = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${item.itemID}.json`);
            const product = productResponse.data.product;

            return {
              id: item._id,
              name: product.product_name || "Nombre no disponible",
              imgSrc: product.image_url || "https://via.placeholder.com/100", // Imagen de placeholder si no hay imagen
              itemID: item.itemID,
              category: item.category,
            };
          })
        );

        setItems(detailedItems);
      } catch (error) {
        console.error("Error al obtener los elementos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [userId]);

  const categories = ['Reactive', 'Sensitive', 'Safe'];

  return (
    <div className="asdfContainer">
      <div className="zxcvHeader">{t('QwErTyUiOpAs')}</div> {/* Lista de Alimentos */}
      <div className="qwerFilters">
        <div className="mnbvWrapper">
          <div className="uiopIcon" onClick={() => setView('grid')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={view === 'grid' ? '#0474e4' : '#999'} // Cambia color según vista
              className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
          </div>
          <div className="uiopIcon" onClick={() => setView('list')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={view === 'list' ? '#0474e4' : '#999'} // Cambia color según vista
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6h15m-15 6h15m-15 6h15" />
            </svg>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="loadingSpinner"></div>
      ) : (
        view === 'grid' ? <ItemsG items={items} categories={categories} /> : <ItemsL items={items} />
      )}
    </div>
  );
};

export default TitleNFilter;
