import React, { useEffect, useState } from "react";

const MonthlyReport = () => {
  const [monthlyReports, setMonthlyReports] = useState([]);

  useEffect(() => {
    fetch("monthlyReport.json")
      .then((res) => res.json())
      .then((data) => {
        setMonthlyReports(data);
      });
  });

  return (
    <div className="min-h-screen">
     
      <h1 className="text-3xl font-bold text-center my-3">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {monthlyReports.map((item) => (
          <div key={item.id} className=" shadow-xl rounded-md p-2">
            <div className=" bg-base-100 rounded-md">
              <div className="flex items-center gap-3">
                <img className="w-[60px]" src={item.image} alt="logo" />
                <a className="text-lg  text-blue-500 underline" target="_blank" href={item.link}>
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

export default MonthlyReport;
