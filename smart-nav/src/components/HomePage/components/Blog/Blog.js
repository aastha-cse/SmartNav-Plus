import React from "react";
import "./Blog.css";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Hidden from "./images/hidden.png";
import Guide from "./images/guide.png";
import Experience from "./images/experience.png";
import Tips from "./images/tips.png";

function Hotel() {
  return (
    <Carousel interval={3000} style={{ maxHeight: "500px", marginTop:"-50px" }}>
      <Carousel.Item>
        <img src={Hidden} className="d-block w-100" alt="Hotel" style={{ maxWidth: "100%", height: "auto" }} />
        <Carousel.Caption>
          <h3 style={{fontSize:"2.5rem"}}>Unlock Hidden Travel Treasures</h3>
          <p>Offers insider tips, recommendations, and insights about specific destinations, hidden gems, and lesser-known attractions that might not be readily available through conventional navigation features.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={Guide} className="d-block w-100" alt="Rating" style={{ maxWidth: "100%", height: "auto" }} />
        <Carousel.Caption>
          <h3 style={{fontSize:"2.5rem"}}>Journey-Enriching Travel Guides</h3>
          <p>Serves as comprehensive travel guides, providing detailed information about popular tourist spots, historic landmarks, cultural events, dining options, and recreational activities in various destinations.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={Experience} className="d-block w-100" alt="Cafe" style={{ maxWidth: "100%", height: "auto" }} />
        <Carousel.Caption>
          <h3 style={{fontSize:"2.5rem"}}>Embark on Authentic Adventures</h3>
          <p>Features personal travel stories, experiences, and anecdotes shared by fellow travelers or local experts. These firsthand accounts add authenticity and relatability, helping users connect with the destinations on a deeper level and make informed decisions about their own trips.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={Tips} className="d-block w-100" alt="Cafe" style={{ maxWidth: "100%", height: "auto" }} />
        <Carousel.Caption>
          <h3 style={{fontSize:"2.5rem"}}>Discover Pro Travel Tips</h3>
          <p>Offers practical tips, advice, and hacks related to navigation, transportation, accommodation, dining, safety, budgeting, and more.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Hotel;
