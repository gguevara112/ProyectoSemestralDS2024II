import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../ProductContext';
import axios from 'axios';
import Header from '../components/Header';
import SidebarTwo from '../components/UIComponents/SidebarTwo';
import TestPopup from '../components/GlobalComponents/TestPopup';
import './ProductDetail.css';

const ProductDetail = () => {
  const { selectedProductId } = useProductContext();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showTestPopup, setShowTestPopup] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);

        // Cargar detalles del producto desde la API externa
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${selectedProductId}.json`
        );
        if (response.data && response.data.product) {
          setProduct(response.data.product);
        } else {
          console.error("Producto no encontrado en Open Food Facts.");
          setProduct(null);
          setLoading(false);
          return;
        }

        // Cargar notas desde la base de datos
        const notesResponse = await axios.get(`http://localhost:5001/api/productnotes/${userId}/${selectedProductId}`);
        if (notesResponse.data) setNotes(notesResponse.data.note);

        // Cargar categoría de sensibilidad desde la base de datos
        const sensitivityResponse = await axios.get(`http://localhost:5001/api/listsensitivity/${userId}/${selectedProductId}`);
        if (sensitivityResponse.data) {
          const category = sensitivityResponse.data.category;
          setSelectedButton(category === 'Reactive' ? 0 : category === 'Sensitive' ? 1 : 2);
        }

        // Cargar estado de wishlist desde la base de datos
        const wishlistResponse = await axios.get(`http://localhost:5001/api/wishlist/${userId}/${selectedProductId}`);
        setIsInWishlist(wishlistResponse.data !== null);

      } catch (error) {
        console.error('Error al cargar detalles del producto o preferencias del usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedProductId) {
      fetchProductDetails();
    } else {
      navigate('/error'); // Redirige si no hay un producto seleccionado
    }
  }, [selectedProductId, userId, navigate]);

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleNotesSave = async () => {
    setIsSaving(true);
    try {
      await axios.post(`http://localhost:5001/api/productnotes`, {
        userID: userId,
        itemID: selectedProductId,
        note: notes,
        dateCreated: new Date(),
      });
      setSaveMessage("Notas guardadas exitosamente");
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error("Error al guardar la nota del producto:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleButtonClick = async (buttonIndex) => {
    setSelectedButton(buttonIndex);
    const category = buttonIndex === 0 ? 'Reactive' : buttonIndex === 1 ? 'Sensitive' : 'Safe';

    // Guardar categoría de sensibilidad en la base de datos
    try {
      await axios.post(`http://localhost:5001/api/listsensitivity`, {
        userID: userId,
        itemID: selectedProductId,
        category,
      });
    } catch (error) {
      console.error("Error al guardar la categoría de sensibilidad:", error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await axios.post(`http://localhost:5001/api/wishlist`, {
        userID: userId,
        itemID: selectedProductId,
        dateCreated: new Date(),
        updatedAt: new Date(),
      });
      setIsInWishlist(true);
    } catch (error) {
      console.error("Error al agregar a la wishlist:", error);
    }
  };

  const handleTestButtonClick = () => {
    setShowTestPopup(true);
  };

  const buttonLabels = [
    { text: 'Critic', color: '#ed0000ff', opacityColor: 'rgba(237, 0, 0, 0.5)' },
    { text: 'Sensitive', color: '#ffdb22ff', opacityColor: 'rgba(255, 219, 34, 0.5)' },
    { text: 'Not Sensitive', color: '#80d425ff', opacityColor: 'rgba(128, 212, 37, 0.5)' }
  ];

  return (
    <div className="basicContainer">
      <Header />
      <div className="pageSplit">
        <SidebarTwo />
        <div className="product-detail-container">
          <button className="back-button" onClick={() => navigate(-1)}>
            &#8592; Back
          </button>

          {loading ? (
            <p>loading...</p>
          ) : product ? (
            <>
              <div className="product-details">
                <div className="product-image">
                  <img src={product.image_url} alt={product.product_name} />
                </div>
                <div className="product-info">
                  <h2>{product.product_name}</h2>
                  <p><strong>Brand:</strong> {product.brands}</p>
                  <p><strong>Barcode:</strong> {product.code}</p>
                  <p className="ingredients"><strong>Ingredients:</strong> {product.ingredients_text || 'No disponible'}</p>
                  <p><strong>Product ID:</strong> {selectedProductId}</p>
                </div>
              </div>

              <div className="wishlist-notes-container">
                <div className='buttonsss'>
                  <div className='titleofidkwmdd'>Reaction</div>
                  <div className="selection-buttons-rect">
                    {buttonLabels.map((button, index) => (
                      <button
                        key={index}
                        onClick={() => handleButtonClick(index)}
                        style={{
                          backgroundColor: selectedButton === index ? button.color : button.opacityColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '10px 20px',
                          margin: '0 5px'
                        }}
                        className="color-button"
                      >
                        {button.text}
                        {selectedButton === index && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="check-icon"
                            style={{ width: '20px', height: '20px', marginLeft: '5px' }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>                  
                </div>

                <div className="notes-section">
                  <h3>Notes</h3>
                  <textarea
                    value={notes}
                    onChange={handleNotesChange}
                    placeholder="Type here"
                  />
                  <button
                    className="save-notes-button"
                    onClick={handleNotesSave}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                </div>

                <div className='buttonsss'>
                  <div className='titleofidkwmdd'>Options</div>
                  <button 
                    className="wishlist-button" 
                    onClick={handleAddToWishlist}
                    disabled={isInWishlist}
                  >
                    {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                  </button>
                  <button 
                    className="test-button" 
                    onClick={handleTestButtonClick}
                  >
                    Start test
                  </button>                  
                </div>
              </div>

              {showTestPopup && (
                <TestPopup
                  closePopup={() => setShowTestPopup(false)}
                  productId={selectedProductId}
                  productName={product.product_name}
                  productImage={product.image_url}
                />
              )}
            </>
          ) : (
            <p>404.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
