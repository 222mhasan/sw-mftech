import React from "react";

const Footer = () => {
  return (
    <div className="mt-5">
      <footer className="footer sm:footer-horizontal footer-center bg-green-500 text-base-content p-4">
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
