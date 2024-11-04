import React from 'react';
import './WidgetGridTest.css';

const WidgetGridTest = () => {
  return (
    <div className="buttonContainer">
      <button className="testTrakerButton">
        <span>Test</span>
      </button>

      <div className="right-buttons">
        <button className="resetButton">
          <div className='rowWGTwarning'>
            <div className='warningSignWGT'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <div className='WGTGridcol'>
              <div className='WGTwarningText'>Critic event</div>    
              <div className='WGTwarningsubtitle'>Reset your whole lists</div>               
            </div>




          </div>
        </button>
        <button className="wishlistButton">
          <span>Wishlist</span>
        </button>
      </div>
    </div>
  );
};

export default WidgetGridTest;
