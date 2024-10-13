import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="containerHeader">
      <div className="headerContentSplit">
        <div className='hamIconAndSearch'>
          <div className='hamAndIcon'>

            <div className="hamburgerIcon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 12" stroke-width="2" stroke="#5f6368" width="24px" height="24px">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M1 1h16M1 6h16M1 11h16" />
                </svg>
            </div>
            <div className='brand'>Sensitivv</div>
          </div>
          <div className='searchContainer'>
            <div className='searchShaper'>
              <div className='searchStyle'>
                <div className='searchIcon'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>

                <input type="text" placeholder="Buscar" className="searchBar" />
                <div className='spaceSearchBox'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='profile'>
          <div className='imageContainer'>
            <img className="imgStyle" src="https://lh6.googleusercontent.com/-R6551Wc7XGU/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmz1BdDUR0egA5nmg62fHtumfZzaw/photo.jpg" alt="profile" />
          </div>
        </div>




        {/* <input type="text" placeholder="Buscar" className="searchBar" /> */}
      </div>
    </div>
  );
};

export default Header;
