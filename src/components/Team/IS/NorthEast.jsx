import React, { useEffect, useState } from "react";
import mobile from "../../../images/mobile.png";
import gmail from "../../../images/gmail.png";
import back from "../../../images/back.png";
import { Link } from "react-router-dom";
import { fetchSheetData } from "../../../utils/fetchSheetData";
import man from "../../../images/man.png";

const NorthEast = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOfficer, setSelectedOfficer] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetchSheetData("North-East")
        .then((res) => setOfficers(res))
        .finally(() => setLoading(false));
    };

    fetchData();
    const interval = setInterval(fetchData, 200000); // refresh every ~5 min
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">
        Loading North-East Team...
      </p>
    );
  }

  return (
    <div className="min-h-screen p-1 font-Montserat">
      {/* Header */}
      <div className="relative w-full flex items-center">
        <Link to="/ourTeam/IS" className="absolute left-0 hidden md:block">
          <img src={back} alt="back" className="w-8 h-8" />
        </Link>

        <h1 className="mx-auto font-semibold text-2xl underline text-black my-6 text-center">
          Welcome to North-East
        </h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
        {officers.map((officer) => (
          <div key={officer.ID} className="flex">
            <div
              onClick={() => setSelectedOfficer(officer)}
              className="cursor-pointer card text-black bg-gray-300 w-full flex flex-col justify-between h-full"
            >
              <div className="p-5 flex flex-col justify-between h-full">
                <div className="flex items-start justify-between gap-4 h-full">
                  {/* Info */}
                  <div className="space-y-2 flex-1">
                    <h2 className="card-title text-lg font-bold">
                      {officer.name}
                    </h2>

                    <p className="text-md font-medium">{officer.BaseLocation}</p>

                    {officer.phone && (
                      <div className="flex gap-1 items-center">
                        <img src={mobile} alt="mobile" className="w-5 h-5" />
                        <span className="text-blue-600 text-sm font-semibold underline">
                          {officer.phone.replace(/^tel:/, "")}
                        </span>
                      </div>
                    )}

                    <div className="text-blue-600 font-semibold text-sm underline flex items-center gap-2">
                      <img src={gmail} alt="gmail" className="w-5 h-5" />
                      {officer.email}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={officer.image || man}
                      alt={officer.name}
                      className="w-28 h-28 object-contain"
                      onError={(e) => (e.target.src = man)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedOfficer && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedOfficer(null)} // click outside closes modal
        >
          <div
            className="bg-white rounded-lg w-11/12 md:w-1/3 p-6 relative"
            onClick={(e) => e.stopPropagation()} // prevent inner click from closing
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={() => setSelectedOfficer(null)}
            >
              ✕
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center text-center gap-2">
              <img
                src={selectedOfficer.image || man}
                alt={selectedOfficer.name}
                className="w-40 h-40 object-contain"
                onError={(e) => (e.target.src = man)}
              />

              <h2 className="text-xl font-bold">{selectedOfficer.name}</h2>
              <p className="font-medium">{selectedOfficer.BaseLocation}</p>

              {selectedOfficer.phone && (
                <a
                  href={selectedOfficer.phone}
                  className="flex items-center gap-2 text-blue-600 underline"
                >
                  <img src={mobile} alt="mobile" className="w-5 h-5" />
                  {selectedOfficer.phone.replace(/^tel:/, "")}
                </a>
              )}

              <a
                href={selectedOfficer.gmailLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-blue-600 underline"
              >
                <img src={gmail} alt="gmail" className="w-5 h-5" />
                {selectedOfficer.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NorthEast;
