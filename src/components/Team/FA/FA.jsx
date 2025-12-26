import React, { useEffect, useState } from "react";
import mobile from "../../../images/mobile.png";
import gmail from "../../../images/gmail.png";
import back from "../../../images/back.png";
import { Link } from "react-router-dom";
import { fetchSheetData } from "../../../utils/fetchSheetData";

import man from "../../../images/man.png";

const FA = () => {
  const [officers, setOfficers] = useState([]);
  console.log(officers);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch("/FATeam.json")
  //     .then((response) => response.json())
  //     .then((data) => setOfficers(data));
  //   // Scroll to top when the component mounts
  //   window.scrollTo(0, 0);
  // }, []);

  useEffect(() => {
    const fetchData = () => {
      fetchSheetData("FA-Team")
        .then((res) => setOfficers(res))
        .finally(() => setLoading(false));
    };

    fetchData();
    const interval = setInterval(fetchData, 200000); // refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div>
      <div className="min-h-screen p-1 font-Montserat">
        <div className="relative w-full flex items-center">
          {/* Left Image */}
          <Link to="/ourTeam" className="absolute left-0 hidden md:block">
            <img src={back} alt="back" className="w-8 h-8 " />
          </Link>

          {/* Centered Text */}
          <h1 className="mx-auto font-semibold text-2xl underline text-black my-6 text-center">
            Welcome to FA Team
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
          {officers.map((officer) => (
            <div key={officer.id} className="flex">
              <div className="card text-black bg-gray-300 w-full flex flex-col justify-between h-full">
                <div className="p-5 flex flex-col justify-between h-full">
                  <div className="flex items-start justify-between gap-4 h-full">
                    <div className="space-y-1 flex-1">
                      <div className="-space-y-1">
                        <h2 className="card-title text-lg font-bold">
                          {officer.name}
                        </h2>
                        <h3>
                          {officer.designation} | {officer.team}
                        </h3>
                      </div>
                      <p className="text-md font-medium">{officer.base}</p>
                      <div className="flex gap-1 items-center">
                        <img src={mobile} alt="mobile" className="w-5 h-5" />
                        <a
                          href={officer.phone}
                          className="text-blue-600 text-sm font-semibold underline hover:text-blue-800"
                        >
                          {officer.phone.replace("tel:", "")}
                        </a>
                      </div>
                      <a
                        href={officer.gmailLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 font-semibold text-sm underline flex items-center gap-2 hover:text-blue-800"
                      >
                        <img src={gmail} alt="gmail" className="w-5 h-5" />
                        {officer.email}
                      </a>
                    </div>
                    <div className="flex-shrink-0">
                      <img
                        className="w-32 h-32 object-contain"
                        src={officer.image}
                        alt={officer.name}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FA;
