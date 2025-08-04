import React, { useEffect, useState, useRef } from "react";
import Forward from "/slider-icon/fast-forward.gif";
import Backward from "/slider-icon/fast-backward.gif";

import Team1 from "/teamPhoto/team1.webp";
import Team2 from "/teamPhoto/team2.webp";
import Team4 from "/teamPhoto/team4.webp";
import Team5 from "/teamPhoto/team5.webp";

const images = [Team1, Team2, Team4, Team5];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isHovered && !loading) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        goToNext();
      }, 3000);
    }
    return () => resetTimeout();
  }, [currentIndex, isHovered, loading]);

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
      className="relative w-full h-[300px] md:h-[350px] overflow-hidden mb-2 bg-white py-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {loading ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>
      ) : (
        <>
          {/* Image Fade Transitions */}
          <div className="relative w-full h-full">
            {images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img
                  src={img}
                  alt={`Slide ${index}`}
                  loading="lazy"
                  className="object-contain max-w-full max-h-full"
                />
              </div>
            ))}
          </div>

          {/* Text Overlay */}
          <div className="absolute top-5 left-4 bg-black/60 px-3 py-2 rounded text-white font-dancing-script z-20">
            <h1 className="text-base sm:text-xl md:text-3xl font-bold">
              Microfinance Technology
            </h1>
            <p className="text-sm sm:text-lg md:text-2xl mt-1">
              South-West Zone
            </p>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 hover:bg-white bg-gray-200 bg-opacity-50 p-1 sm:p-2 rounded-full z-20"
          >
            <img className="w-6 sm:w-8" src={Backward} alt="<" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-white bg-gray-200 bg-opacity-50 p-1 sm:p-2 rounded-full z-20"
          >
            <img className="w-6 sm:w-8" src={Forward} alt=">" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
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
        </>
      )}
    </div>
  );
};

export default Slider;
