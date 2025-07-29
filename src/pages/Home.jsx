import CircularSection from "../components/CircularSection";
import TOs from "../components/TOs";
// import MonthlyReport from "./MonthlyReport";

const Home = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 ">
        <div className="border">
          <CircularSection></CircularSection>
        </div>
        <div className="border col-span-2">Main Home Section</div>
        <div className=" border"><TOs></TOs></div>
      </div>
    </div>
  );
};

export default Home;
