import React, { useEffect, useState } from "react";
import mobile from "../../../images/mobile.png";
import gmail from "../../../images/gmail.png";

const NorthEast = () => {
  const [officers, setOfficers] = useState([]);
  console.log(officers);

  useEffect(() => {
    fetch("/NEofficers.json")
      .then((response) => response.json())
      .then((data) => setOfficers(data));
  }, []);

  return (
    <div className="min-h-screen">
      <h1 className="text-center font-semibold text-2xl  underline text-black my-3">
        Welcome to North-East
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
        {officers.map((officer) => (
          <div key={officer.id}>
            <div className="card text-black bg-gray-300 w-full mb-2">
              <div className="p-5">
                <h2 className="card-title">{officer.name}</h2>
                <div className="space-y-0">
                  <p className="text-lg">{officer.base}</p>
                  <div className="flex gap-1 items-center">
                    <img src={mobile} alt="" />
                    <a
                      href={officer.phone}
                      className="text-blue-600 text-md font-bold underline hover:text-blue-800"
                    >
                      {officer.phone.replace("tel:", "")}
                    </a>
                  </div>
                  <a
                    href={officer.gmailLink} // use the gmailLink field from your API
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 font-semibold text-md underline flex items-center gap-2 hover:text-blue-800"
                  ><img src={gmail} alt="" />
                    {officer.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NorthEast;
