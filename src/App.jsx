import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Banner from "./components/Banner";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="px-2 md:mx-30 mx-auto bg-gray-200 border">
        <div className="text-3xl font-semibold text-center font-poppins my-3">MF-Technology</div>

        <Banner />

        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer/>
      </div>
    </>
  );
}

export default App;
