import React from "react";

const Footer = () => {
  return (
    <div className="mt-2">
      <footer className="footer sm:footer-horizontal footer-center bg-pink-400 text-base-content p-4">
        <aside>
          <p className="font-poppins"> 
            Copyright © {new Date().getFullYear()} - All right reserved by South-West Zone
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
