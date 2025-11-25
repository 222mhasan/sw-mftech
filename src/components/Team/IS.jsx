import React, { useEffect, useState } from "react";
import PaulPurification from "/WingsHead/Paul_Purification.webp";
import { Link } from "react-router-dom";
import ParvezVai from "/ZonalLeads/parvez-bhai.webp";
import OsmanSarwar from "/ZonalLeads/Osman_Sarwar.webp";
import AzmirMahmood from "/ZonalLeads/AzmirMahmood.webp";
import MosiarRahman from "/ZonalLeads/MosiarRahman.webp";

const IS = () => {
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    fetch("/officers.json")
      .then((response) => response.json())
      .then((data) => setOfficers(data));
  }, []);

  return (
    <div>
      <h1 className="text-center font-semibold my-2 text-2xl">I&S Team</h1>
      {/* Paul Purification  start*/}
      <div className="w-fit mx-auto ">
        <div className="card bg-base-300 border-b-2 border-1 border-gray-300 w-60 shadow-xl">
          <figure className="px-2 pt-5">
            <img
              src={PaulPurification}
              alt="image"
              className="rounded-full w-[150px] h-[150px]"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">I&S</h2>
            <h1 className="font-montserrat font-semibold">Paul Purification</h1>
          </div>
        </div>
      </div>
      {/* Paul Purification  end*/}

      <section className="grid grid-cols-1 md:grid-cols-4 gap-2 my-3">
        {/* South-West start */}
        <div className="border-1 border-gray-400 rounded-sm">
          <h1 className="text-center font-semibold text-lg">South-West</h1>

          <div className="px-1">
            <div className="mx-auto w-fit text-center mb-4">
              <img
                className="w-[180px]"
                src={ParvezVai}
                alt="Parvez Mosarrof"
              />
              <h1 className="font-semibold text-xl">Parvez Mosaraf</h1>
              <h1 className="font-semibold text-md">Deputy Manager, SW-Zone</h1>
            </div>
            <div className="h-[610px] overflow-x-auto ">
              <table className="table table-pin-rows bg-base-200 ">
                {officers.map((officer) => (
                  <div key={officer.id}>
                    <div className="card text-black bg-gray-300 w-full mb-2">
                      <div className="card-body">
                        <h2 className="card-title">{officer.name}</h2>
                        <div className="space-y-0">
                          <p>R/O-{officer.base}</p>
                          <p>{officer.phone}</p>
                          <p className="text-blue-600 underline">
                            {officer.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </table>
            </div>
          </div>
        </div>
        {/* South-West end */}

        {/* South-East start */}
        <div className="border-1 border-gray-400 rounded-sm">
          <h1 className="text-center font-semibold text-lg">South-East</h1>
          <div className="mx-auto w-fit text-center mb-4">
            <img className="w-[180px]" src={OsmanSarwar} alt="OsmanSarwar" />
            <h1 className="font-semibold text-xl">Osman Sarwar</h1>
            <h1 className="font-semibold text-md">Manager, SE-Zone</h1>
          </div>
        </div>
        {/* South-East end */}

        {/* North-West start */}
        <div className="border-1 border-gray-400 rounded-sm">
          <h1 className="text-center font-semibold text-lg">North-West</h1>
          <div className="mx-auto w-fit text-center mb-4">
            <img className="w-[180px]" src={AzmirMahmood} alt="AzmirMahmood" />
            <h1 className="font-semibold text-xl">Azmir Mahmud</h1>
            <h1 className="font-semibold text-md">Manager, NW-Zone</h1>
          </div>
        </div>
        {/* North-West end */}
        {/* North-East start */}
        <div className="border-1 border-gray-400 rounded-sm">
          <h1 className="text-center font-semibold text-lg">North-East</h1>
          <div className="mx-auto w-fit text-center mb-4">
            <img className="w-[180px]" src={MosiarRahman} alt="MosiarRahman" />
            <h1 className="font-semibold text-xl">Md. Mosiar Rahman</h1>
            <h1 className="font-semibold text-md">Manager, NE-Zone</h1>
          </div>
        </div>
        {/* North-East end */}
      </section>
    </div>
  );
};

export default IS;
