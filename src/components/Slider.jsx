import React, { useEffect, useState, useRef } from "react";

// Import images from src/sliderImage
import Image1 from "../sliderPhotos/image1.jpg";
import Image2 from "../sliderPhotos/image2.jpg";
import Image3 from "../sliderPhotos/image3.jpg";
import Image4 from "../sliderPhotos/image4.jpg";
import Image5 from "../sliderPhotos/image5.jpg";
import Image6 from "../sliderPhotos/image6.jpg";
import Image7 from "../sliderPhotos/image7.jpg";
import Image8 from "../sliderPhotos/image8.jpg";

const images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      goToNext();
    }, 3000);

    return () => resetTimeout();
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      {/* Images sliding */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className="w-full h-[300px] object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Static Text Overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col ml-5 mt-10 bg-opacity-30 text-white text-left">
        <h1 className="text-xl md:text-3xl font-bold">
          Microfinance Technology
        </h1>
        <p className="text-lg md:text-2xl mt-2">
          South-West Zone
        </p>
      </div>

      {/* Left Button */}
      <button
        onClick={goToPrevious}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &#8592;
      </button>

      {/* Right Button */}
      <button
        onClick={goToNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Slider;

