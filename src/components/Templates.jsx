import React, { useEffect, useState } from "react";
import Hand from "../images/hand.gif";
import Envelope from "../images/envelope.gif";
import GoogleDrive from "../images/googleDrive.png"

const Templates = () => {
  const [pdfs, setPdfs] = useState([]);
  const [formats, setFormats] = useState([]);
  const [loadingPDFs, setLoadingPDFs] = useState(true);
  const [loadingFormats, setLoadingFormats] = useState(true);

  useEffect(() => {
    fetch("/pdf.json")
      .then((res) => res.json())
      .then((data) => {
        setPdfs(data);
        setLoadingPDFs(false);
      });
  }, []);

  useEffect(() => {
    fetch("/mailformat.json")
      .then((res) => res.json())
      .then((data) => {
        setFormats(data);
        setLoadingFormats(false);
      });
  }, []);

  return (
    <div className="min-h-screen px-4">
      <h1 className="text-center font-semibold text-2xl my-3 underline text-black">
        All Manual & Templates
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Knowledge Sharing File */}
        <div className="lg:border-r-2 border-gray-500 p-2">
          <h2 className="text-xl font-semibold underline mb-3 text-black">
            Knowledge Sharings
          </h2>
          {loadingPDFs ? (
            // Skeleton for PDFs
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex gap-2 items-center mb-2">
                <div className="skeleton w-5 h-5 rounded"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))
          ) : (
            pdfs.map((pdf) => (
              <div key={pdf.id}>
                <a
                  className="text-blue-700 font-poppins text-lg underline flex items-center gap-1"
                  href={pdf.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="w-[20px]" src={GoogleDrive} alt="" /> {pdf.title}
                </a>
              </div>
            ))
          )}
        </div>

        {/* Mail Communication Format */}
        <div className="p-2">
          <h2 className="text-xl font-semibold underline my-2 text-black">
            Mail Communication
          </h2>
          {loadingFormats ? (
            // Skeleton for Formats
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex gap-2 items-center mb-2">
                <div className="skeleton w-5 h-5 rounded"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))
          ) : (
            <div className="pl-1">
              {formats.map((format) => (
                <div key={format.id}>
                  <a
                    className="text-blue-600 underline flex text-lg items-center gap-1"
                    href={format.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img className="w-[20px]" src={GoogleDrive} alt="" />{" "}
                    {format.title}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Templates;
