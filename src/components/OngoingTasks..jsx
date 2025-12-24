import React, { useEffect, useState } from "react";
import GoogleSheet from "../images/googleSheets.png";
import { fetchSheetData } from "../utils/fetchSheetData";
import Arrow2 from "../images/arrow2.gif";

const OngoingTasks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(5);

  const showMore = () => {
    setVisible(data.length); // show all items
  };

  useEffect(() => {
    const fetchData = () => {
      fetchSheetData("OngoingTasks")
        .then((res) => setData(res))
        .finally(() => setLoading(false));
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="mb-5">
      <h1 className="text-xl font-semibold text-center mb-1 text-black py-1 bg-sky-300 font-montserrat">
        Ongoing Tasks
      </h1>
      <div className="px-1 space-x-1">
        {data.slice(0, visible).map((item) => (
          <div key={item.ID} className="flex">
            <img
              className="w-6 h-6 object-contain" // ensures consistent size and keeps aspect ratio
              src={GoogleSheet}
              alt=""
            />
            <a
              href={item.Link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 underline hover:text-blue-800 ml-1"
            >
              {item.Title}
            </a>
          </div>
        ))}
        {/* Show more button */}
        {visible < data.length && (
          <button
            className="text-black border-1 border-gray-500  mt-3 flex items-center px-1 mx-auto pr-3 font-semibold rounded-md text-md hover:bg-gray-500 hover:text-white transition-all duration-300"
            onClick={showMore}
          >
            <img className="w-[30px]" src={Arrow2} alt="Show All" />
            Show All
          </button>
        )}
      </div>
    </div>
  );
};

export default OngoingTasks;
