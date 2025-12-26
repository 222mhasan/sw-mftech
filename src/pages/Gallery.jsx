import React from "react";
import Slider from "../components/Slider";
import OngoingLinks from "../components/OngoingReports";

import { useEffect, useState } from "react";
import { fetchSheetData } from "../utils/fetchSheetData";
import GoogleSheet from "../images/googleSheets.png";

const Gallery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetchSheetData("South-West")
        .then((res) => setData(res))
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
    <div className="min-h-screen">
      <Slider />

      {/* <div>
                <OngoingLinks />
            </div> */}

      <div>
        <h1 className="text-center font-semibold text-2xl  underline text-black my-3">
          All Reports
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-white">
          {data.map((item) => (
            <div
              key={item.ID}
              className="shadow-xl rounded-md p-2 hover:bg-gray-50"
            >
              <div className=" items-center gap-3 bg-white">
                <h1>{item.name}</h1>
                <p>{item.pin}</p>
                <p>{item.base}</p>
                <p>{item.phone}</p>
                <p>{item.mail}</p>
                <img src={item.imageURL} alt="" />
              </div>

              {/* <p className="text-sm text-gray-500 mt-1 break-words">{item.Link}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
