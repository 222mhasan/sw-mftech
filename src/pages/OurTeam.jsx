import React from "react";
import { Link } from "react-router-dom";
import PaulPurification from "/WingsHead/Paul_Purification.webp";
import AnirbanSaha from "/WingsHead/Anirban-Saha.webp";
import Man from "/WingsHead/man.jpg";

const OurTeam = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center my-3">Our Team</h1>
      {/* Head of Technology */}
      <div className="w-fit mx-auto">
        <div className="card bg-base-100 w-60 shadow-sm">
          <figure className="px-2 pt-10">
            <img
              src={Man}
              alt="image"
              className="rounded-full w-[150px] h-[150px]"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Head of Technology</h2>
            <h2 className="card-title">Jamshed Atique</h2>
          </div>
        </div>
      </div>

      {/* 4 Units Section */}
      <section>
        <div className="flex mt-5 ">
          {/* I&S */}
          <div className="w-fit mx-auto">
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
                <h1 className="font-montserrat font-semibold">
                  Paul Purification
                </h1>
              </div>
              <Link to="/IS" className="text-center mb-3">
                <button className="btn btn-outline btn-info text-black">
                  View Details
                </button>
              </Link>
            </div>
          </div>
          {/* EA */}
          <div className="w-fit mx-auto">
            <div className="card bg-base-300 border-b-2 border-1 border-gray-300 w-60 shadow-xl">
              <figure className="px-2 pt-5">
                <img
                  src={AnirbanSaha}
                  alt="image"
                  className="rounded-full w-[150px] h-[150px]"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">EA</h2>
                <h1 className="font-montserrat font-semibold">
                  Anirban Saha Ananda
                </h1>
              </div>
              <Link className="text-center mb-3">
                <button className="btn btn-outline btn-info text-black">
                  View Details
                </button>
              </Link>
            </div>
          </div>
          {/* FA */}
          <div className="w-fit mx-auto">
            <div className="card bg-base-300 border-b-2 border-1 border-gray-300 w-60 shadow-xl">
              <figure className="px-2 pt-5">
                <img
                  src={Man}
                  alt="image"
                  className="rounded-full w-[150px] h-[150px]"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">FA</h2>
                <h1 className="font-montserrat font-semibold">
                  Sachindra Nath Ghosh
                </h1>
              </div>

              <Link className="text-center mb-3">
                <button className="btn btn-outline btn-info text-black">
                  View Details
                </button>
              </Link>
            </div>
          </div>
          {/* DWR */}
          <div className="w-fit mx-auto">
            <div className="card bg-base-300 border-b-2 border-1 border-gray-300 w-60 shadow-xl">
              <figure className="px-2 pt-5">
                <img
                  src={Man}
                  alt="image"
                  className="rounded-full w-[150px] h-[150px]"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">DWR</h2>
                <h1 className="font-montserrat font-semibold">Shomir Ghosh</h1>
              </div>

              <Link className="text-center mb-3">
                <button className="btn btn-outline btn-info text-black">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
