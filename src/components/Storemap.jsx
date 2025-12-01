import React from "react";

const Storemap = ({ mapId, className = "" }) => {
  const src = `https://www.google.com/maps/d/u/0/embed?mid=${mapId}`;

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full  mx-auto h-[70vh] sm:h-[500px] rounded-xl overflow-hidden shadow-lg border">
        <iframe
          title="Store branches & service zones"
          src={src}
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          className="block"
        />
      </div>
    </div>
  );
};

export default Storemap;
