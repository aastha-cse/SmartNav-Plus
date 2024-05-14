import React, { useState } from 'react';
import "./Styles.css";
import brandLogo from "./components/images/logo.png";
import Home from "./components/HomePage/Home.js";
import Map from "./components/MapPage/Map.js";

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  let currentComponent;
  switch (currentPage) {
    case 'home':
      currentComponent = <Home />;
      break;
    case 'map':
      currentComponent = <Map />;
      break;
    default:
      currentComponent = <Home />;
  }

  return (
    <div className='mainPage'>
      <nav className='navbar'>
        <div className='navbar-brand'>
          <img src={brandLogo} alt='Logo' className='logo' />
          <span className='company-name'>SmartNav+</span>
        </div>

        <ul className='nav-links'>
          <li><div className={currentPage === 'home' ? 'selected-link' : ''} onClick={() => handleNavClick('home')}>Home</div></li>
          <li><div  className={currentPage === 'map' ? 'selected-link' : ''} onClick={() => handleNavClick('map')}>Map</div></li> 
        </ul>

        <button className='signup-button'>Sign Up</button>
      </nav>

      {currentComponent}
    </div>
  );
}

export default App;
