import React from 'react';
import Header from '../components/Header'; 
import Sidebar from '../components/Sidebar';
import "./Home.css"


const Home = () => {
  return (
    <div className='homeContainer'>
      <Header /> 
      <div className='pageSplit'>
        <Sidebar page="Home" />
        <h1>Welcome to the Home Page!</h1>
      </div>
    </div>
  );
};

export default Home;
