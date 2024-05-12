import React from "react";
import "./Hotel.css";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import HotelImg from "./images/hotel.png";
import Rating from "./images/rating.png";
import Cafe from "./images/cafe.png";

function Hotel() {
  return (
    <Carousel interval={3000} style={{ maxHeight: "500px", marginTop:"-50px" }}>
      <Carousel.Item>
        <img src={HotelImg} className="d-block w-100" alt="Hotel" style={{ maxWidth: "100%", height: "auto" }} />
        <Carousel.Caption>
          <h3 style={{fontSize:"2.5rem"}}>Top Accommodation Picks</h3>
          <p>Our platform meticulously curates a selection of premium stays, ensuring an unforgettable experience for every traveler. From luxury hotels to cozy boutique accommodations, we provide comprehensive insights and detailed reviews to help you find the perfect place to stay.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={Rating} className="d-block w-100" alt="Rating" style={{ maxWidth: "100%", height: "auto" }} />
        <Carousel.Caption>
          <h3 style={{fontSize:"2.5rem"}}>Budget-Friendly Hotel Ratings</h3>
          <p>Explore affordable accommodation options with ratings tailored to your budget. Find the perfect hotel that meets your financial needs and preferences.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={Cafe} className="d-block w-100" alt="Cafe" style={{ maxWidth: "100%", height: "auto" }} />
        <Carousel.Caption>
          <h3 style={{fontSize:"2.5rem"}}>Dining Recommendations</h3>
          <p>Discover culinary delights with personalized recommendations for restaurants and cafes. Explore diverse dining options catered to your tastes and preferences.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Hotel;
