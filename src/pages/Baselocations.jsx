import React from "react";
import StoreMap from "./../components/Storemap";
import MapModal from "./../components/MapModal";

const Baselocations = () => {
  const MAP_ID = "18mBajJ4q4huVnfceb-HDCYaWDnk67Fk"; // ✔ fixed

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-2">
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
