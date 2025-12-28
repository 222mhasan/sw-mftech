import { useEffect, useState } from "react";
import { fetchSheetData } from "../utils/fetchSheetData";
import GoogleSheet from "../images/googleSheets.png";

const OngoingReports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetchSheetData("AllReports")
        .then((res) => setData(res))
        .finally(() => setLoading(false));
    };

    fetchData();
    const interval = setInterval(fetchData, 200000); // refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">
        <span className="loading loading-ring loading-2xl"></span>
      </p>
    );
  }

  return (
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
            <div className="flex items-center gap-3 bg-white">
              <img
                className="w-[30px] md:w-[40px]"
                src={GoogleSheet}
                alt="logo"
              />
              <a
                href={item.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-600 underline hover:text-blue-800"
              >
                {item.Title}
              </a>
            </div>

            {/* <p className="text-sm text-gray-500 mt-1 break-words">{item.Link}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OngoingReports;
