import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Arrow2 from "../images/arrow2.gif";
import SpecialTasks from "./OngoingTasks.";
import GoogleDrive from "../images/googleDrive.png";
import { fetchSheetData } from "../utils/fetchSheetData";

const CircularSection = () => {
  const [circulars, setCirculars] = useState([]);
  console.log(circulars);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(6);

  const showMore = () => {
    setVisible(circulars.length); // show all items
  };

  useEffect(() => {
    const fetchData = () => {
      fetchSheetData("Circulars")
        .then((res) => setCirculars(res))
        .finally(() => setLoading(false));
    };

    fetchData();
    const interval = setInterval(fetchData, 200000); // refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="pb-5">
      {/* special tasks section start */}
      <SpecialTasks></SpecialTasks>
      {/* special tasks section end */}
      {/* Circulars Section start */}
      <div>
        <h1 className="text-xl font-semibold text-center mb-1 py-1 text-black bg-sky-300 font-montserrat">
          All Circulars
        </h1>
        {/* All circulars */}
        <div className="mx-1">
          {circulars.slice(0, visible).map((circular) => (
            <div key={circular.ID}>
              <a
                className="text-blue-700 font-semibold py-1 underline flex gap-2"
                target="_blank"
                rel="noopener noreferrer"
                href={circular.Link}
              >
                <img
                  className="w-4 h-4 object-contain mt-1" // ensures consistent size and keeps aspect ratio
                  src={GoogleDrive}
                  alt=""
                />
                {circular.Title}
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
