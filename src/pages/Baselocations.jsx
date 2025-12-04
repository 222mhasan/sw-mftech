import React from "react";
import StoreMap from "./../components/Storemap";
import MapModal from "./../components/MapModal";

const Baselocations = () => {
  const MAP_ID = "18mBajJ4q4huVnfceb-HDCYaWDnk67Fk"; // ✔ fixed
   // Scroll to top when the component mounts
    window.scrollTo(0, 0);

  return (
    <div className="min-h-screen bg-gray-50 ">
      <header className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-center py-3">
          Base Locations
        </h1>
       
      </header>

      <main className="max-w-full h-full mx-auto">
        <StoreMap mapId={MAP_ID} />
        <MapModal mapId={MAP_ID} />
      </main>
    </div>
  );
};

export default Baselocations;
