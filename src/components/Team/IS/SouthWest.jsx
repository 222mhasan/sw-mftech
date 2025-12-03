import React, { useEffect, useState } from "react";
import mobile from "../../../images/mobile.png";
import gmail from "../../../images/gmail.png";
import back from "../../../images/back.png";
import { Link } from "react-router-dom";

const SouthWest = () => {
  const [officers, setOfficers] = useState([]);
  console.log(officers);

  useEffect(() => {
    fetch("/swOfficers.json")
      .then((response) => response.json())
      .then((data) => setOfficers(data));
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen p-1 font-Montserat">
      <div className="relative w-full flex items-center">
        {/* Left Image */}
        <Link to="/ourTeam/IS" className="absolute left-0 hidden md:block">
          <img src={back} alt="back" className="w-8 h-8 " />
        </Link>

        {/* Centered Text */}
        <h1 className="mx-auto font-semibold text-2xl underline text-black my-6 text-center">
          Welcome to South-West
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
        {officers.map((officer) => (
          <div key={officer.id} className="flex">
            <div className="card text-black bg-gray-300 w-full flex flex-col justify-between h-full">
              <div className="p-5 flex flex-col justify-between h-full">
                <div className="flex items-start justify-between gap-4 h-full">
                  <div className="space-y-2 flex-1">
                    <h2 className="card-title text-lg font-bold">
                      {officer.name}
                    </h2>
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
                      alt="officer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SouthWest;
