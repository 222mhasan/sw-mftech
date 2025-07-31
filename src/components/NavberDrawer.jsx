import { Link, NavLink } from "react-router-dom";
import HomeLogo from "../images/home-unscreen.gif";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer-3");
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={closeDrawer}
          className="px-2 font-poppins relative text-lg after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:bottom-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/baseLocation"
          onClick={closeDrawer}
          className="px-2 relative text-lg after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:bottom-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full"
        >
          Location
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/pdf"
          onClick={closeDrawer}
          className="px-2 relative text-lg after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:bottom-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full"
        >
          PDF
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/monthlyReport"
          onClick={closeDrawer}
          className="px-2 relative text-lg after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:bottom-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full"
        >
          Monthly Report
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/nonCRM"
          onClick={closeDrawer}
          className="px-2 relative text-lg after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:bottom-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full"
        >
          Non-CRM
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="drawer z-50">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-100 border-1 border-gray-400 mb-1 shadow-lg rounded-md font-poppins">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-ghost btn-square"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block h-6 w-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="navbar-start">
            <Link to="/">
              <img
                src={HomeLogo}
                alt="Home Logo"
                className="w-[50px] hidden md:block"
              />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-3">{links}</ul>
          </div>
          <div className="navbar-end gap-2">
            <div className="text-green-500 text-sm">
              {user?.displayName ? user.displayName : user?.email}
            </div>
            {user && user?.email ? (
              <button onClick={logOut} className="btn btn-outline btn-error">
                Log Out
              </button>
            ) : (
              <Link to="/auth/login">
                <button className="btn btn-outline btn-info">Login</button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Drawer sidebar for mobile */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 font-poppins text-base pt-10">
          {links}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
