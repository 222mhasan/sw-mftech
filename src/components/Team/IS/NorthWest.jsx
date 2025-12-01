import React, { useEffect, useState } from "react";

const NorthWest = () => {
  const [officers, setOfficers] = useState([]);
  console.log(officers);

  useEffect(() => {
    fetch("/NWOfficers.json")
      .then((response) => response.json())
      .then((data) => setOfficers(data));
  }, []);

  return (
    <div className="min-h-screen">
      <h1 className="text-center font-semibold text-2xl  underline text-black my-3">
        Welcome to North-West
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
        {officers.map((officer) => (
          <div key={officer.id}>
            <div className="card text-black bg-gray-300 w-full mb-2">
              <div className="card-body">
                <h2 className="card-title">{officer.name}</h2>
                <div className="space-y-0">
                  <p>R/O-{officer.base}</p>
                  <p>{officer.phone}</p>
                  <p className="text-blue-600 underline">{officer.email}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NorthWest;
