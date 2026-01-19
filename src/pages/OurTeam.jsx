import React from "react";
import { Link } from "react-router-dom";
import PaulPurification from "/WingsHead/Paul_Purification.webp";
import AnirbanSaha from "/WingsHead/Anirban-Saha.webp";
import SomirDada from "/WingsHead/somir_dada.webp";
import Man from "/WingsHead/man.jpg";

const teamData = [
  {
    name: "Paul Purification",
    unit: "I&S",
    img: PaulPurification,
    color: "info",
    link: "/ourTeam/IS",
  },
  {
    name: "Anirban Saha Ananda",
    unit: "EA",
    img: AnirbanSaha,
    color: "success",
    link: "/ourTeam/EA",
  },
  {
    name: "Sochindra Nath Datta",
    unit: "FA",
    img: SomirDada,
    color: "accent",
    link: "/ourTeam/FA",
  },
  {
    name: "Samir Baran Bhuiyan",
    unit: "DWR",
    img: Man,
    color: "secondary",
    link: "/ourTeam/DW",
  },
];

const OurTeam = () => {
  return (
    <div className="px-4 py-12 bg-gradient-to-b from-base-200 to-base-100">
      <h1 className="text-2xl font-semibold text-center text-black mb-12">
        Our Team
      </h1>

      {/* Head of Technology */}
      <div className="flex justify-center mb-16">
        <div className="relative w-full max-w-[20rem] bg-white shadow-xl rounded-2xl overflow-hidden">
         

          <div className="flex flex-col items-center pt-10 pb-6 border-1 border-gray-300">
            <img
              src={Man}
              alt="Head of Technology"
              className="w-[150px] h-[150px] rounded-full object-cover ring-4 ring-primary/30"
            />
            <p className="mt-4 text-xs tracking-widest uppercase text-gray-500">
              Head of Technology
            </p>
            <h2 className="text-lg font-semibold text-gray-800">
              Jamshed Atique
            </h2>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center">
        {teamData.map((member, idx) => (
          <div
            key={idx}
            className="relative w-full max-w-[18rem] bg-white shadow-lg hover:shadow-2xl transition duration-300 rounded-xl overflow-hidden group border border-gray-300"
          >
            {/* Image */}
            <div className="flex justify-center pt-8">
              <img
                src={member.img}
                alt={member.name}
                className={`w-[130px] h-[130px] rounded-full object-cover ring-4 ring-${member.color}/25 group-hover:scale-105 transition`}
              />
            </div>

            {/* 🔥 Brand New Card Body */}
            <div className="px-6 py-4 text-center">
              <div
                className={`inline-block px-4 py-2 bg-${member.color}/5 rounded-lg`}
              >
                <h1 className="font-montserrat font-semibold text-gray-800 text-base leading-snug">
                  {member.name}
                </h1>
                <h2 className="font-semibold text-gray-600 text-md tracking-widest uppercase">{member.unit}</h2>
              </div>
            </div>

            {/* Action */}
            <div className="pb-6 flex justify-center ">
              <Link
                to={member.link}
                className={`text-${member.color} font-semibold text-sm border-1 border-gray-400  px-10 py-2 rounded-lg flex items-center gap-1 hover:gap-2 hover:bg-gray-400 transition-all`}
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
