import React from "react";

const Footer = () => {
  return (
    <div className="mt-5">
      <footer className="footer sm:footer-horizontal footer-center bg-pink-400 text-base-content p-4 font-semibold">
        <aside>
          <p> 
            Copyright © {new Date().getFullYear()} - All right reserved by South-West Zone
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
