import React, { useRef, useEffect, useState } from "react";
import "./Destination.css";
import Map from "./images/map.png";
import Weather from "./images/weather.png";
import Fuel from "./images/fuel.png";

const SlideInSection = ({ image, heading, text, direction }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentRef);
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const sectionClass = `section-${direction} ${
    isVisible ? "section-visible" : ""
  }`;

  return (
    <div className={`section ${sectionClass}`} ref={sectionRef}>
      <div className="image-container">
        <img src={image} alt="Section" />
      </div>
      <div className="text-container">
        <h3>{heading}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

const Destination = () => {
  const sections = [
    {
      image: Map,
      heading: "Discover the Shortest Route",
      text: "This feature empowers users to find the most efficient path between two or more locations, optimizing travel time and minimizing distances. By leveraging advanced mapping algorithms, our application ensures seamless navigation, allowing users to reach their destinations swiftly and with ease.",
      direction: "right",
    },
    {
      image: Weather,
      heading: "Real Time Weather Forecast",
      text: "Stay informed and plan your journey more effectively with our real-time weather forecast feature integrated into our map application. Receive up-to-the-minute weather updates, including temperature, humidity, wind speed, and more, directly on the map interface.",
      direction: "left",
    },
    {
      image: Fuel,
      heading: "Estimated Fuel Cost",
      text: "Users can make informed decisions about their travel routes and budgeting by receiving an approximation of the fuel expenses associated with their journey. By factoring in variables such as distance, vehicle fuel efficiency, and current fuel prices, this feature helps users plan their trips effectively.",
      direction: "right",
    },
  ];

  return (
    <div className="box">
      {sections.map((section, index) => (
        <SlideInSection
          key={index}
          image={section.image}
          heading={section.heading}
          text={section.text}
          direction={section.direction}
        />
      ))}
    </div>
  );
};

export default Destination;
