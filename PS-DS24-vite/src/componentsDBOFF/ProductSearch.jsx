import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../ProductContext';
import axios from 'axios';
import Header from '../components/Header';
import SidebarTwo from '../components/UIComponents/SidebarTwo';
import './ProductSearch.css';

const ProductSearch = () => {
  const navigate = useNavigate();
  const { searchResults, setSelectedProductId } = useProductContext();
  const userId = localStorage.getItem('userId'); // Obtener el ID del usuario de localStorage

  const handleProductClick = async (id) => {
    try {
      // Guardar en la tabla history antes de redirigir
      await axios.post(`http://localhost:5001/api/history`, {
        userID: userId,
        itemID: id,
        dateAccessed: new Date(),
      });

      setSelectedProductId(id);
      navigate('/product');
    } catch (error) {
      console.error("Error al guardar en el historial:", error);
    }
  };

  return (
    <div className="basicContainer">
      <Header />
      <div className="pageSplit">
        <SidebarTwo />
        <div className='containerResults'>
          <div className="products-list text-center">
            <div className="row row-cols-auto">
              {searchResults.map((product) => (
                <div className="col" key={product.code}>
                  <button
                    className="containerProduct"
                    onClick={() => handleProductClick(product.code)}
                  >
                    <div className="imgProduct">
                      <img src={product.image_url} alt={product.product_name} />
                    </div>
                    <div className="nameProduct">
                      {product.product_name}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
