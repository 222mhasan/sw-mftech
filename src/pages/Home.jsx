import CircularSection from "../components/CircularSection";
import Slider from "../components/Slider";
import TOs from "../components/TOs";
import HomeImage from "../../src/images/HomeImage/AnimatedDashboards.json";
import Lottie from "lottie-react";
import EmergencyContacts from "../components/EmergencyContacts";
import { fetchSheetData } from "../utils/fetchSheetData";
import { useEffect, useState } from "react";

const Home = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetchSheetData("History_MF-Tech")
        .then((res) => {
          console.log("Fetched data:", res);
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
    <div className="px-4 py-2 space-y-6">
      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-1">
        {/* Circular Section */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-xl p-2">
          <CircularSection />
        </div>

        {/* History Section */}
        <div className="md:col-span-3 bg-white rounded-xl shadow-xl p-4 flex flex-col items-center">
          <h1 className="text-center my-2 font-semibold text-xl md:text-2xl underline text-black">
            History of BRAC Microfinance Technology
          </h1>

          <div className="w-full max-w-[300px] h-[300px] mb-4">
            <Lottie animationData={HomeImage} loop={true} />
          </div>

          <div className="font-poppins text-gray-800 text-justify space-y-2 w-full">
            {details.map((item, idx) => {
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

        {/* Emergency Contacts */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-xl p-2">
          <EmergencyContacts />
        </div>
      </div>
    </div>
  );
};

export default Home;
