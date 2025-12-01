import { useState } from "react";
import StoreMap from "../components/Storemap";

const MapModal = ({ mapId }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* <div className="flex items-center gap-3 my-4 justify-center">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow"
        >
          Open Map (Fullscreen)
        </button>

        <a
          href={`https://www.google.com/maps/d/viewer?mid=${mapId}`}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 border rounded-md"
        >
          Open in Google My Maps
        </a>
      </div> */}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full h-full bg-white rounded-lg overflow-hidden">
            <div className="p-2 flex justify-end bg-white">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 rounded bg-gray-200"
              >
                Close
              </button>
            </div>

            <div className="w-full h-[calc(100%-48px)]">
              <StoreMap mapId={mapId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapModal;
