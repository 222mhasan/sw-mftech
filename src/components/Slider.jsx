import React, { useEffect, useState, useRef } from "react";

import Team1 from "/teamPhoto/team1.webp"
import Team2 from "/teamPhoto/team2.webp"
import Team3 from "/teamPhoto/team3.webp"
import Team4 from "/teamPhoto/team4.webp"



const images = [Team1, Team2, Team3, Team4];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (!isHovered) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        goToNext();
      }, 2000);
    }

    return () => resetTimeout();
  }, [currentIndex, isHovered]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative w-full h-[300px] md:h-[400px] overflow-hidden mb-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image sliding area */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            loading="lazy"
            className="w-full h-[400px] object-cover flex-shrink-0 px-2"
          />
        ))}
      </div>

      {/* Static Text Overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col  mt-10 ml-2 bg-opacity-30 text-white  px-2 font-dancing-script">
        <h1 className="text-base sm:text-xl md:text-5xl font-bold">
          Microfinance Technology
        </h1>
        <p className="text-sm sm:text-lg md:text-2xl mt-0 md:mt-1">
          South-West Zone
        </p>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
      >
        &#8592;
      </button>

      <button
        onClick={goToNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
      >
        &#8594;
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            } transition duration-300`}
          />
        ))}
      </div>
    </div>
  );
};
export default Slider;
