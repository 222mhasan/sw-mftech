import { Link } from "react-router-dom";
import PaulPurification from "/WingsHead/Paul_Purification.webp";
import ParvezVai from "/ZonalLeads/parvez-bhai.webp";
import OsmanSarwar from "/ZonalLeads/Osman_Sarwar.webp";
import AzmirMahmood from "/ZonalLeads/AzmirMahmood.webp";
import MosiarRahman from "/ZonalLeads/MosiarRahman.webp";

const IS = () => {
  return (
    <div className="px-4 py-10 bg-gradient-to-b from-base-200 to-base-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-center text-2xl md:text-3xl font-semibold text-black mb-10">
        I&S Team
      </h1>

      {/* Head Card */}
      <div className="flex justify-center mb-14">
        <div className="bg-white/80 backdrop-blur rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-1 border-primary overflow-hidden w-full max-w-[20rem]">
          <div className="flex flex-col items-center px-6 py-8 text-center">
            <img
              src={PaulPurification}
              alt="Paul Purification"
              className="w-[140px] h-[140px] rounded-full object-cover mb-4 ring-2 ring-primary/20"
            />

            <span className="text-sm text-gray-500 tracking-wide mb-1">
              I&S
            </span>
            <h2 className="text-lg font-semibold text-gray-800">
              Paul Purification
            </h2>
          </div>
        </div>
      </div>

      {/* Zone Cards */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ZoneCard
            title="North-East"
            image={MosiarRahman}
            name="Md. Mosiar Rahman"
            role="Manager, NE-Zone"
            link="/ourTeam/IS/northEast"
            accent="border-info"
          />

          <ZoneCard
            title="South-East"
            image={OsmanSarwar}
            name="Osman Sarwar"
            role="Manager, SE-Zone"
            link="/ourTeam/IS/southEast"
            accent="border-success"
          />

          <ZoneCard
            title="North-West"
            image={AzmirMahmood}
            name="Azmir Mahmud"
            role="Manager, NW-Zone"
            link="/ourTeam/IS/northWest"
            accent="border-warning"
          />

          <ZoneCard
            title="South-West"
            image={ParvezVai}
            name="Parvez Mosaraf"
            role="Deputy Manager, SW-Zone"
            link="/ourTeam/IS/southWest"
            accent="border-secondary"
          />
        </div>
      </section>
    </div>
  );
};

/* 🔹 Reusable Zone Card with bottom border accent */
const ZoneCard = ({ title, image, name, role, link, accent }) => {
  return (
    <div
      className={`bg-white/80 backdrop-blur rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-1 ${accent} overflow-hidden flex flex-col`}
    >
      <div className="px-5 py-6 text-center flex flex-col h-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>

        <img
          src={image}
          alt={name}
          className="w-[150px] h-[150px] mx-auto rounded-lg object-cover mb-4 ring-2 ring-gray-200"
        />

        <h4 className="font-semibold text-gray-900 text-base">{name}</h4>
        <p className="text-sm text-gray-600 mb-6">{role}</p>

        <Link to={link} className="mt-auto">
          <button className="btn btn-sm btn-outline btn-info w-full bg-white text-black text-md hover:bg-info/10 transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default IS;
