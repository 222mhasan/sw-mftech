import { Link, NavLink, Outlet } from "react-router-dom";
import HomeLogo from "../images/home-unscreen.gif";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const links = (
    <>
      <NavLink
        className=" px-2 font-poppins relative hover: text-lg 
          after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:bottom-0 
          after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full "
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        to="/baseLocation"
        className=" px-2  relative hover: text-lg 
          after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:bottom-0 
          after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full "
      >
        Base Location
      </NavLink>
      <NavLink
        to="/pdf"
        className=" px-2  relative hover: text-lg 
          after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:bottom-0 
          after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full "
      >
        PDF
      </NavLink>
      <NavLink
        to="/monthlyReport"
        className=" px-2  relative hover: text-lg 
          after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:bottom-0 
          after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full "
      >
        Monthly Report
      </NavLink>

      <NavLink
        to="/nonCRM"
        className=" px-2  relative hover: text-lg 
          after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:bottom-0 
          after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full "
      >
        Non-CRM
      </NavLink>
    </>
  );

  const { user, logOut } = useContext(AuthContext);

  return (
    <div>
      {/* main Navbar */}
      <div className="navbar bg-base-100 border-1 border-gray-400 mb-1 shadow-lg rounded-md font-poppins">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/">
            <img
              className="w-[50px] hidden md:block"
              src={HomeLogo}
              alt="Home"
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-3 ">{links}</ul>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>

        {/* login area  */}
        <div className="navbar-end gap-2">
          <div className="text-green-500 text-sm">
            {user?.displayName ? user.displayName : user?.email}
          </div>

          {user && user?.email ? (
            <button onClick={logOut} className="btn btn-outline btn-error">
              Log Out
            </button>
          ) : (
            <Link to="/auth/login"><button className="btn btn-outline btn-info">Login</button></Link>
          )}
        </div>
      </div>

 
      

    </div>
  );
};

export default Navbar;

//   tabIndex={0}
//   role="button"
//   className="btn btn-ghost btn-circle avatar"
// >
//   <div className="w-10 rounded-full">
//     <img
//       alt="Tailwind CSS Navbar component"
//       src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//     />
//   </div>
// </div>
