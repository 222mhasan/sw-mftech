import React, { useEffect, useState } from "react";
import { FcCellPhone } from "react-icons/fc";
import { CgMail } from "react-icons/cg";
import Mail from "../images/mail.gif"

const BaseLocation = () => {
  const [locations, setLocations] = useState([]);
  console.log(locations);

  useEffect(() => {
    fetch("/officers.json")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-3">Base Location</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3  ">
        {locations.map((location) => (
          <div className=" shadow-xl rounded-md text-center" key={location.id}>
            {/* <img src="" alt="" />
            <h2 className="text-2xl font-bold text-center">{location.name}</h2>
            <h3>{location.pin}</h3>
            <h4>{location.phone}</h4>
            <h4>{location.email}</h4>
            <p className="text-lg text-center">R/O-{location.base}</p> */}
            <div className="flex gap-1 bg-base-100 shadow-sm rounded-md">
              <div>
                <figure>
                  <img
                    className="w-[160px] "
                    src={location.image}
                    alt="Movie"
                  />
                </figure>
              </div>
              <div className="ml-3 mt-2 text-center">
                <h2 className="font-semibold">{location.name}</h2>
                <h3>PIN-{location.pin}</h3>
                <h4 className="flex items-center justify-center">
                  <span>
                    <FcCellPhone   />
                  </span>
                  {location.phone}
                </h4>
                <h4 className="flex items-center text-sm text-blue-600 font-semibold"><img className="w-[20px]" src={Mail} alt="" />{location.email}</h4>
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
