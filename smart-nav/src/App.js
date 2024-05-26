import React, { useState } from 'react';
import "./Styles.css";
import brandLogo from "./images/logo.png";
import Home from "./components/HomePage/Home.js";
import Map from "./components/MapPage/Map.js";
import Attraction from './components/AttractionPage/src/Attraction.js';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavClick = (page) => {
    if (page === 'blog') {
      const blogUrl = 'https://exploreepic.netlify.app/';
      window.open(blogUrl, '_blank');
    } else {
      setCurrentPage(page);
    }
  };

  let currentComponent;
  switch (currentPage) {
    case 'home':
      currentComponent = <Home />;
      break;
    case 'map':
      currentComponent = <Map />;
      break;
    case 'attraction':
      currentComponent = <Attraction />;
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
          <li><div className={currentPage === 'map' ? 'selected-link' : ''} onClick={() => handleNavClick('map')}>Map</div></li> 
          <li><div className={currentPage === 'blog' ? 'selected-link' : ''} onClick={() => handleNavClick('blog')}>Blog</div></li> 
          <li><div className={currentPage === 'attraction' ? 'selected-link' : ''} onClick={() => handleNavClick('attraction')}>Attractions</div></li> 
        </ul>
      </nav>

      {currentComponent}
    </div>
  );
}

export default App;
