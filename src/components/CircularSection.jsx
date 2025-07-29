import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Arrow2 from "../images/arrow2.gif";

const CircularSection = () => {
  const [circulars, setCirculars] = useState([]);
  console.log(circulars);
  const [visible, setVisible] = useState(6);

  const showMore = () => {
    setVisible(circulars.length); // show all items
  };

  useEffect(() => {
    fetch("/circular.json")
      .then((res) => res.json())
      .then((data) => setCirculars(data));
  }, []);

  return (
    <div>
      {/* Circulars Section start */}
      <div>
        <h1 className="text-xl font-semibold text-center mb-1 text-black bg-sky-300 font-montserrat">
          All Circulars
        </h1>
        {/* All circulars */}
        <div className="mx-1">
          {circulars.slice(0, visible).map((circular) => (
            <div key={circular.id}>
              <a
                className="text-blue-500 text-sm py-1 underline flex gap-2"
                target="_blank"
                rel="noopener noreferrer"
                href={circular.link}
              >
                <span>
                  <FaArrowRight className="font-bold text-xl text-black" />
                </span>{" "}
                {circular.title}
              </a>
            </div>
          ))}
        </div>
        {/* Show more button */}
        {visible < circulars.length && (
          <button
            className="text-black border-1 border-gray-500  mt-3 flex items-center px-1 mx-auto pr-3 font-semibold rounded-md text-md hover:bg-gray-500 hover:text-white transition-all duration-300"
            onClick={showMore}
          >
            <img className="w-[30px]" src={Arrow2} alt="" />
            Show All
          </button>
        )}
      </div>
      {/* Circulars Section end */}
    </div>
  );
};

export default CircularSection;
