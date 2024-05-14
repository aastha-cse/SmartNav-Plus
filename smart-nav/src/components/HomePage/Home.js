import React, { useState } from 'react';
import "./Home.css";
import pinLogo from "./images/destination.png";
import hotelLogo from "./images/hotel.png";
import todoLogo from "./images/todo.png";
import dineLogo from "./images/dine.png";
import Destination from './components/Destination/Destination.js';
import Hotel from './components/Hotel/Hotel.js';
import Activity from './components/Activity/Activity.js';
import Blog from './components/Blog/Blog.js';

function Home() {
  const [selectedContent, setSelectedContent] = useState('Explore exciting destinations around the world.');
  const [selectedItem, setSelectedItem] = useState('Destinations');

  const handleItemClick = (content) => {
    let newContent = '';
    switch (content) {
      case 'Destinations':
        newContent = 'Explore exciting destinations around the world.';
        break;
      case 'Hotels and Cafes':
        newContent = 'Find comfortable accommodations and restaurants for your trip.';
        break;
      case 'Things to do':
        newContent = 'Discover fun activities and attractions.';
        break;
      case 'Blogs':
        newContent = 'Unlock Insights and Guidance - Navigate with Blogs';
        break;
      default:
        newContent = '';
    }
    setSelectedContent(newContent);
    setSelectedItem(content);
  };

  // Render the selected component based on the value of selectedItem state
  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case 'Destinations':
        return <Destination />;
      case 'Hotels and Cafes':
        return <Hotel />;
      case 'Things to do':
        return <Activity />;
      case 'Blogs':
        return <Blog />;
      default:
        return null;
    }
  };

  return (
    <div className='main-content'>
      <div className='display-content'>{selectedContent}</div>
      <div className='tabs'>
        <ul className='content'>
          <li>
            <div
              className={`list ${selectedItem === 'Destinations' ? 'selected' : ''}`}
              onClick={() => handleItemClick('Destinations')}
            >
              <img src={pinLogo} alt="icon" />
              <span>Destinations</span>
            </div>
          </li>
          <li>
            <div
              className={`list ${selectedItem === 'Hotels and Cafes' ? 'selected' : ''}`}
              onClick={() => handleItemClick('Hotels and Cafes')}
            >
              <img src={hotelLogo} alt="icon" style={{ width: "1.5rem" }} />
              <span>Hotels & Cafes</span>
            </div>
          </li>
          <li>
            <div
              className={`list ${selectedItem === 'Things to do' ? 'selected' : ''}`}
              onClick={() => handleItemClick('Things to do')}
            >
              <img src={todoLogo} alt="icon" style={{ width: "1.7rem" }} />
              <span>Activities</span>
            </div>
          </li>
          <li>
            <div
              className={`list ${selectedItem === 'Blogs' ? 'selected' : ''}`}
              onClick={() => handleItemClick('Blogs')}
            >
              <img src={dineLogo} alt="icon" style={{ width: "1.5rem" }} />
              <span>Blogs</span>
            </div>
          </li>
        </ul>
      </div>
      <div style={{ marginTop: '15rem' }}>{renderSelectedComponent()}</div>
    </div>
  );
}

export default Home;

