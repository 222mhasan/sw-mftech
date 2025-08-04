import React, { useEffect, useState } from "react";
import { FcCellPhone } from "react-icons/fc";
import Mail from "../images/mail.gif";
import ParvezBhai from "../images/parvez-bhai.webp";

const BaseLocation = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    fetch("/officers.json")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
        setLoading(false); // Turn off loading after fetch
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-3">Base Location</h1>

      {/* Parvez Bhai */}
      <div className="mx-auto w-fit text-center mb-6 bg-gray-200 border-gray-300 border p-5 rounded-md shadow-2xl">
        <img className="w-[180px] mx-auto" src={ParvezBhai} alt="Parvez Mosarrof" />
        <h1 className="font-semibold text-xl">Parvez Mosaraf</h1>
        <h1 className="font-semibold text-md">Deputy Manager, SW-Zone</h1>
        <p className="font-semibold">BLC Jessore</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="p-4 bg-gray-200 animate-pulse rounded-md shadow-md"
              >
                <div className="h-[160px] bg-gray-300 rounded w-full mb-3"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 w-1/2 mx-auto"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 w-2/3 mx-auto"></div>
                
              </div>
            ))
          : locations.map((location) => (
              <div className="shadow-xl rounded-md text-center" key={location.id}>
                <div className="flex gap-1 bg-base-100 shadow-sm rounded-md">
                  <div>
                    <figure>
                      <img
                        className="w-[160px]"
                        src={location.image}
                        alt={location.name}
                      />
                    </figure>
                  </div>
                  <div className="ml-3 mt-2 text-center">
                    <h2 className="font-semibold">{location.name}</h2>
                    <h3>PIN-{location.pin}</h3>
                    <h4 className="flex items-center justify-center">
                      <FcCellPhone className="mr-1" />
                      {location.phone}
                    </h4>
                    <h4 className="flex items-center text-sm text-blue-600 font-semibold">
                      <img className="w-[20px]" src={Mail} alt="" />
                      {location.email}
                    </h4>
                    <p>R/O-{location.base}</p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default BaseLocation;
