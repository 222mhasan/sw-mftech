import React, { useEffect, useState } from "react";
import GoogleSheet from "../images/googleSheets.png";

const Reports = () => {
  const [monthlyReports, setMonthlyReports] = useState([]);

  useEffect(() => {
    fetch("monthlyReport.json")
      .then((res) => res.json())
      .then((data) => {
        setMonthlyReports(data);
      });
      // Scroll to top when the component mounts
    // window.scrollTo(0, 0);
  });


  return (
    <div className="min-h-screen">
      <h1 className="text-center font-semibold text-2xl  underline text-black my-3">
        All Reports
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-white">
        {monthlyReports.map((item) => (
          <div key={item.id} className=" shadow-xl rounded-md p-2 ">
            <div className=" bg-base-100 rounded-md">
              <div className="flex items-center gap-3 bg-white">
                <img className="w-[30px] md:w-[40px]" src={GoogleSheet} alt="logo" />
                <a
                  className="text-lg  text-blue-700 underline font-poppins"
                  target="_blank"
                  href={item.link}
                >
                  {item.title}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
