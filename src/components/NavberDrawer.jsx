import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import HomeLogo from "../images/Home-logo.svg";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer-3");
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };

  const getNavLinkClass = ({ isActive }) =>
    `px-2 relative text-lg after:content-[''] after:absolute after:h-[2px] after:left-0 after:bottom-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full ${
      isActive ? "text-green-600 font-semibold after:w-full" : "after:w-0"
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/" onClick={closeDrawer} className={getNavLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/ourTeam" onClick={closeDrawer} className={getNavLinkClass}>
          Our Team
        </NavLink>
      </li>
      <li>
        <NavLink to="/baseLocation" onClick={closeDrawer} className={getNavLinkClass}>
          Base Location
        </NavLink>
      </li>
      <li>
        <NavLink to="/templates" onClick={closeDrawer} className={getNavLinkClass}>
          Templates
        </NavLink>
      </li>
      <li>
        <NavLink to="/monthlyReport" onClick={closeDrawer} className={getNavLinkClass}>
          Reports
        </NavLink>
      </li>
      <li>
        <NavLink to="/nonCRM" onClick={closeDrawer} className={getNavLinkClass}>
          Non-CRM
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-gray-100 shadow-md">
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar border-b border-gray-300 px-2 py-1 font-poppins">
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
                <img src={HomeLogo} alt="Home Logo" className="w-[50px] hidden md:block" />
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
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
          
          <ul className="menu p-4 w-80 min-h-full bg-base-200 font-poppins text-base pt-10">
            <NavLink to='/'><img src={HomeLogo} alt="Menu" /></NavLink>
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
