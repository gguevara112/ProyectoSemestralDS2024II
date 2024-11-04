import React, { useState } from 'react';
import './HistoryList.css';

const Test = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', imgSrc: 'https://kiosclub.com/19166-large_default/crema-avellanas-con-cocoa-mini-nutella.jpg', lastTested: '2024-10-23 10:00' },
    { id: 2, name: 'Item 2', imgSrc: 'https://via.placeholder.com/100', lastTested: '2024-10-22 09:30' },
    { id: 3, name: 'Item 3', imgSrc: 'https://via.placeholder.com/100', lastTested: '2024-10-21 08:45' },
    { id: 4, name: 'Item 4', imgSrc: 'https://via.placeholder.com/100', lastTested: '2024-10-20 11:15' },
    { id: 5, name: 'Item 5', imgSrc: 'https://via.placeholder.com/100', lastTested: '2024-10-19 12:00' }
  ]);



  return (
    <div className="historyTestContainer">

        <div className='rowfILists'>
            <div className='svgHistoryofproducts'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="#848584" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

            </div>

            <div className='aksdjfb'>History of tested products
            </div>
        </div>


        
      <div className="item-list">
        {items.map((item) => (
          <div
            key={item.id}
            className="item"
          >
            <img src={item.imgSrc} alt={item.name} />
            <div className="item-name">{item.name}</div>
            <div className="last-tested">
              Última vez testeado: {item.lastTested}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
