import React, { useEffect, useState } from "react";
import Arrow2 from "../images/arrow2.gif";
import SpecialTasks from "./OngoingTasks.";
import GoogleDrive from "../images/googleDrive.png";
import { fetchSheetData } from "../utils/fetchSheetData";
import Aos from "aos";

const CircularSection = () => {
  const [circulars, setCirculars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(6);

  // AOS Animation Initialization
  useEffect(() => {
    Aos.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true, // animation happens only once
    });
  }, []);

  const showMore = () => {
    setVisible(circulars.length);
  };

  useEffect(() => {
    const fetchData = () => {
      fetchSheetData("Circulars")
        .then((res) => setCirculars(res))
        .finally(() => setLoading(false));
    };

    fetchData();
    const interval = setInterval(fetchData, 200000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <p className="text-center py-6 text-gray-500">
        <span className="loading loading-ring loading-md"></span>
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3 min-w-0">
      {/* 🔥 Special Tasks */}
      <div className="min-w-0">
        <SpecialTasks />
      </div>

      {/* 🔥 Circulars */}
      <div className="min-w-0">
        <h1 className="text-lg font-semibold text-center py-2 text-black bg-sky-300 rounded-md">
          All Circulars
        </h1>

        {/* Circular List */}
        <div data-aos="fade-right" className="mt-2 space-y-2 min-w-0">
          {circulars.slice(0, visible).map((circular) => (
            <a
              key={circular.ID}
              href={circular.Link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-blue-700 font-medium underline min-w-0"
            >
              <img
                src={GoogleDrive}
                alt=""
                className="w-4 h-4 mt-1 flex-shrink-0"
              />

              {/* 🔥 TEXT FIX */}
              <span className="block min-w-0 break-words whitespace-normal">
                {circular.Title}
              </span>
            </a>
          ))}
        </div>

        {/* Show More */}
        {visible < circulars.length && (
          <button data-aos="fade-right"
            onClick={showMore}
            className="mt-4 mx-auto flex items-center gap-2 px-3 py-1 border border-gray-400 rounded-md text-sm font-semibold hover:bg-gray-600 hover:text-white transition"
          >
            <img src={Arrow2} alt="" className="w-6" />
            Show All
          </button>
        )}
      </div>
    </div>
  );
};

export default CircularSection;
