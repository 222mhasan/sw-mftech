import { useEffect, useState } from "react";

const SouthEast = () => {
  const [officers, setOfficers] = useState([]);
  console.log(officers);

  useEffect(() => {
    fetch("/SEOfficers.json")
      .then((response) => response.json())
      .then((data) => setOfficers(data));
  }, []);

  return (
    <div className="min-h-screen">
      <h1 className="text-center font-semibold text-2xl  underline text-black my-3">
        Welcome to South-East
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
        {officers.map((officer) => (
          <div key={officer.id}>
            <div className="card text-black bg-gray-300 w-full mb-2">
              <div className="card-body">
                <h2 className="card-title">{officer.name}</h2>
                <div className="space-y-0">
                  <p>R/O-{officer.base}</p>

                  <a
                    href={officer.phone}
                    className="text-blue-600 text-md font-bold underline hover:text-blue-800"
                  >
                    {officer.phone.replace("tel:", "")}
                  </a>
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

export default SouthEast;
