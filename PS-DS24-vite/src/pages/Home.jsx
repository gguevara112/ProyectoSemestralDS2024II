import React from 'react';
import Header from '../components/Header'; // Importamos la barra de navegación

const Home = () => {
  return (
    <div>
      <Header /> {/* Añadimos la barra de navegación */}
      <h1>Welcome to the Home Page!</h1>
    </div>
  );
};

export default Home;
