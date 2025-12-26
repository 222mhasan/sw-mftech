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

      
    </div>
  );
};

export default Gallery;
