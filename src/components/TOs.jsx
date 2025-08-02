import React, { useEffect, useState } from "react";
import ParvezVai from "../images/parvez-bhai.webp"

const TOs = () => {
  const [officers, setOfficers] = useState([]);
  console.log(officers);

  useEffect(() => {
    fetch("/officers.json")
      .then((res) => res.json())
      .then((data) => setOfficers(data));
  }, []);

  return (
    <div className="">
      <h1 className="text-xl font-semibold text-center mb-1 text-black bg-sky-300 font-montserrat">
        Our Team
      </h1>
      {/* Parvez Bhai */}
      <div className="mx-auto w-fit text-center mb-4">
          <img className="w-[180px]" src={ParvezVai} alt="Parvez Mosarrof" />
          <h1 className="font-semibold text-xl">Parvez Mosaraf</h1>
          <h1 className="font-semibold text-md">Deputy Manager, SW-Zone</h1>
      </div>
      <div>
        <div className="h-[610px] overflow-x-auto">
          <table className="table table-pin-rows bg-base-200">
            <div className=" flex flex-col justify-center ">
              {officers.map((officer) => (
                <div className="mx-auto w-fit mb-3" key={officer.id}>
                  <img
                    className="w-[150px] rounded-full"
                    src={officer.image}
                    alt="image"
                  />
                  <div className="text-center">
                    <h1>{officer.name}</h1>
                    <p>R/O-{officer.base}</p>
                  </div>
                  <hr className="border-1 border-gray-300"/>
                </div>
              ))}
            </div>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TOs;

{
  /* <div className=" flex flex-col justify-center ">
  {officers.map((officer) => (
    <div className="mx-auto w-fit" key={officer.id}>
      <img className="w-[150px] rounded-full" src={officer.image} alt="image" />
      <h1>{officer.name}</h1>
      <p>R/O-{officer.base}</p>
    </div>
  ))}
</div>; */
}
