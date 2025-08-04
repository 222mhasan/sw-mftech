import { Outlet } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Footer from "./components/Footer";
import Slider from "./components/Slider";
import NavberDrawer from "./components/NavberDrawer";

function App() {
  return (
    <>
      <div className="min-h-screen bg-[url('/bg-image.jpg')] bg-cover ">
        <div className="px-2 md:mx-30 mx-auto">
          {/* Header Area */}
          <div className="text-center mb-1 py-3 md:py-5 font-semibold font-eagle bg-pink-400 ">
            <h1 className="text-3xl    ">MF-Technology</h1>
            <h2 className="">South-West Zone</h2>
          </div>

          {/* <Navbar/> */}
          <NavberDrawer />

          <Outlet></Outlet>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
