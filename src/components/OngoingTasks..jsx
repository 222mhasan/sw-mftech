import React, { useEffect, useState } from "react";
import GoogleSheet from "../images/googleSheets.png";
import { fetchSheetData } from "../utils/fetchSheetData";
import Arrow2 from "../images/arrow2.gif";
import AOS from "aos";

const OngoingTasks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(5);

    // AOS Animation Initialization
    useEffect(() => {
      AOS.init({
        duration: 700,
        easing: "ease-out-cubic",
        once: true, // animation happens only once
      });
    }, []);

  const showMore = () => {
    setVisible(data.length);
  };

  useEffect(() => {
    const fetchData = () => {
      fetchSheetData("OngoingTasks")
        .then((res) => setData(res))
        .finally(() => setLoading(false));
    };

    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 min-w-0">
      {/* Header */}
      <h1 className="text-lg md:text-xl font-semibold text-center text-black py-2 bg-sky-300 rounded-md font-montserrat">
        Ongoing Tasks
      </h1>

      {/* Task list */}
      <div data-aos="fade-right" className="flex flex-col gap-2 min-w-0 px-1 ">
        {data.slice(0, visible).map((item) => (
          <a
            key={item.ID}
            href={item.Link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 min-w-0 text-blue-600 font-medium underline hover:text-blue-800 transition"
          >
            <img
              src={GoogleSheet}
              alt=""
              className="w-5 h-5 mt-1 flex-shrink-0"
            />

            {/* 🔥 TEXT FIX */}
            <span className="block min-w-0 break-words whitespace-normal text-sm md:text-base">
              {item.Title}
            </span>
          </a>
        ))}
      </div>

      {/* Show All button */}
      {visible < data.length && (
        <button data-aos="fade-right"
          onClick={showMore}
          className="mt-3 mx-auto flex items-center gap-2 px-3 py-1 border border-gray-400 rounded-md text-sm font-semibold hover:bg-gray-600 hover:text-white transition"
        >
          <img className="w-6" src={Arrow2} alt="Show All" />
          Show All
        </button>
      )}
    </div>
  );
};

export default OngoingTasks;
