import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Slider from "./components/Slider";
import NavberDrawer from "./components/NavberDrawer";

function App() {
  return (
    <>
      <div className="px-2 md:mx-30 mx-auto  border ">
        <div className="text-center my-3 font-semibold font-montserrat">
          <h1 className="text-3xl    ">
            MF-Technology
          </h1>
          <h2 className="">South-West Zone</h2>
        </div>

        {/* <Navbar/> */}
        <NavberDrawer />

        <Outlet></Outlet>
        <Footer />
      </div>
    </>
  );
}

export default App;
