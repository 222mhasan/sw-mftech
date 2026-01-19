import { useEffect, useState } from "react";
import { fetchSheetData } from "../utils/fetchSheetData";
import GoogleSheet from "../images/googleSheets.png";
import AOS from "aos";

const OngoingReports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // AOS Animation Initialization
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true, // animation happens only once
    });
  }, []);

  useEffect(() => {
    const fetchData = () => {
      fetchSheetData("AllReports")
        .then((res) => setData(res))
        .finally(() => setLoading(false));
    };

    fetchData();
    const interval = setInterval(fetchData, 200000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        <span className="loading loading-ring loading-2xl"></span>
      </p>
    );
  }

  return (
    <div className="px-4 py-4">
      <h1 className="text-center font-semibold text-2xl md:text-3xl text-black mb-6">
        All Reports
      </h1>

      <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {data.map((item) => (
          <a
            key={item.ID}
            href={item.Link}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div data-aos="zoom-in"
              className="relative h-full rounded-2xl p-4
                         bg-gradient-to-br from-slate-50 to-white
                         shadow-md hover:shadow-xl
                         transition-all duration-300
                         overflow-hidden"
            >
              {/* Left Accent */}
              <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-pink-300 to-pink-600" />

              {/* Content */}
              <div className="flex items-start gap-4 pl-3">
                {/* ICON – FIXED */}
                <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
                  <img
                    src={GoogleSheet}
                    alt="Google Sheet"
                    className="w-6 h-6 object-contain"
                  />
                </div>

                {/* Text */}
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug group-hover:text-blue-700 transition">
                    {item.Title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Click to view report
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default OngoingReports;
