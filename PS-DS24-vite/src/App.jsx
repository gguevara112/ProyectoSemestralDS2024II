import React from 'react';
import "./App.css"

import Home from './pages/Home'; // La página que contiene el componente Header

const App = () => {
  return (
    <div className='appContainer'>
      <Home />
    </div>
  );
};

export default App;
