import CircularSection from "../components/CircularSection";
import Slider from "../components/Slider";
import TOs from "../components/TOs";
// import MonthlyReport from "./MonthlyReport";

const Home = () => {
  return (
    <div>
      <Slider />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 ">
        <div className="border-gray-400 shadow-2xl bg-white rounded-md">
          <CircularSection></CircularSection>
        </div>
        <div className="col-span-2 border-gray-400 shadow-2xl bg-white rounded-md">
          <h1 className="text-center my-2 font-semibold text-xl underline">History of BRAC Microfinance Technology</h1>
        </div>
        <div className="rounded-md border-gray-400 shadow-2xl">
          <TOs></TOs>
        </div>
      </div>
    </div>
  );
};

export default Home;
