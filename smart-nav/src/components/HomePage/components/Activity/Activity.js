import React, { useRef, useEffect, useState } from "react";
import "./Activity.css";
import Sight from "./images/sight.png";
import Adventure from "./images/adventure.png";
import Petrol from "./images/petrol.png";

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

const Activity = () => {
  const sections = [
    {
      image: Sight,
      heading: "Sights to See",
      text: "Provides information and directions to popular tourist destinations, landmarks, historical sites, museums, art galleries, amusement parks, and other points of interest.",
      direction: "right",
    },
    {
      image: Adventure,
      heading: "Explore Outdoor Adventures",
      text: "Provides guidance for outdoor recreational activities such as hiking trails, biking routes, camping grounds, beaches, parks, and nature reserves.",
      direction: "left",
    },
    {
      image: Petrol,
      heading: "Discover Nearby Fuel Stations",
      text: "Locate nearby fuel stations effortlessly with our navigation app. Whether you're on a road trip or in need of a quick refill, find the nearest petrol pumps with ease, ensuring a smooth journey ahead.",
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

export default Activity;
