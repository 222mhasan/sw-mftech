import CircularSection from "../components/CircularSection";
import Slider from "../components/Slider";
import TOs from "../components/TOs";
import HomeImage from "../../src/images/HomeImage/AnimatedDashboards.json";
import Lottie from "lottie-react";
// import MonthlyReport from "./MonthlyReport";

const Home = () => {
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
          <p className="p-4 font-poppins text-gray-800 text-justify">
            MF Technology basically is the Technology Unit of BRAC Microfinance
            Programme. This Unit manage the all technology initiatives (like
            Core Banking Module in ERP, Apps, Enterprise Applications), service
            and supports for Microfinance Programme.
          </p>
        </div>
        <div className="rounded-md col-span-2 border-gray-400 shadow-2xl">
          <TOs></TOs>
        </div>
      </div>
    </div>
  );
};

export default Home;
