import CircularSection from "../components/CircularSection";
import Slider from "../components/Slider";
import TOs from "../components/TOs";
import HomeImage from "../../src/images/HomeImage/AnimatedDashboards.json";
import Lottie from "lottie-react";
import EmergencyContacts from "../components/EmergencyContacts";
import { fetchSheetData } from "../utils/fetchSheetData";
import { useEffect, useState } from "react";

// import MonthlyReport from "./MonthlyReport";

const Home = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetchSheetData("History_MF-Tech")
        .then((res) => {
          console.log("Fetched data:", res); // <-- check this
          setDetails(res);
        })
        .finally(() => setLoading(false));
    };

    fetchData();
    const interval = setInterval(fetchData, 200000);
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
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2 mt-2">
        <div className="border-gray-400 shadow-2xl col-span-2 bg-white rounded-md">
          <CircularSection></CircularSection>
        </div>
        <div className="col-span-3 border-gray-400 shadow-2xl bg-white rounded-md">
          <h1 className="text-center my-2 font-semibold text-xl underline text-black">
            History of BRAC Microfinance Technology
          </h1>
          <div className="mx-auto w-fit" style={{ width: 300, height: 300 }}>
            <Lottie animationData={HomeImage} loop={true} />
          </div>
          <div className="p-4 font-poppins text-gray-800 text-justify">
            {details.map((item, idx) => {
              // Find the key that contains 'history' (case-insensitive)
              const historyKey = Object.keys(item).find(
                (k) => k.toLowerCase().trim() === "history"
              );
              return (
                <div key={item.ID || item.id || idx}>
                  <p>{historyKey ? item[historyKey] : "No data"}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-md col-span-2 border-gray-400 shadow-2xl">
          {/* <TOs></TOs> */}
          <EmergencyContacts />
        </div>
      </div>
    </div>
  );
};

export default Home;
