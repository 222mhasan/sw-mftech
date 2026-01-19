import React, { useEffect, useState } from "react";
import GoogleDrive from "../images/googleDrive.png";
import Excel from "../images/excel.png";
import Pdf from "../images/pdf.png";
import { fetchSheetData } from "../utils/fetchSheetData";

const Templates = () => {
  const [pdfs, setPdfs] = useState([]);
  const [formats, setFormats] = useState([]);
  const [loadingPDFs, setLoadingPDFs] = useState(true);
  const [loadingFormats, setLoadingFormats] = useState(true);

  // Knowledge Sharing PDFs
  useEffect(() => {
    const fetchData = () => {
      fetchSheetData("Knowledge_Sharing_Files")
        .then((res) => setPdfs(res))
        .finally(() => setLoadingPDFs(false));
    };

    fetchData();
    const interval = setInterval(fetchData, 200000);
    return () => clearInterval(interval);
  }, []);

  // Mail Communication Formats
  useEffect(() => {
    fetch("/mailformat.json")
      .then((res) => res.json())
      .then((data) => {
        setFormats(data);
        setLoadingFormats(false);
      });
  }, []);

  return (
    <div className="min-h-screen px-4 py-6 pb-12 bg-base-300">
      <h1 className="text-center font-semibold text-2xl mb-6 underline text-black">
        Manual & Templates
      </h1>

      {/* 🔥 FIXED GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-auto md:auto-rows-fr">
        {/* Knowledge Sharing */}
        <div className="p-4 border border-gray-200 rounded-md min-w-0 bg-white">
          <h2 className="text-xl font-semibold underline mb-4 text-black">
            Knowledge Sharings
          </h2>

          {loadingPDFs
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex gap-2 items-center mb-3">
                  <div className="skeleton w-5 h-5 rounded"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              ))
            : pdfs.map((pdf) => (
                <div key={pdf.id} className="mb-2 min-w-0">
                  <a
                    href={pdf.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 min-w-0 text-blue-700 underline"
                  >
                    <img
                      className="w-[20px] mt-1 flex-shrink-0"
                      src={GoogleDrive}
                      alt=""
                    />
                    <span className="block min-w-0 break-all whitespace-normal">
                      {pdf.Title}
                    </span>
                  </a>
                </div>
              ))}
        </div>

        {/* Mail Communication */}
        <div className="p-4 border border-gray-200 rounded-md min-w-0 bg-white">
          <h2 className="text-xl font-semibold underline mb-4 text-black">
            Mail Communication
          </h2>

          {loadingFormats
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex gap-2 items-center mb-3">
                  <div className="skeleton w-5 h-5 rounded"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              ))
            : formats.map((format) => (
                <div key={format.id} className="mb-2 min-w-0">
                  <a
                    href={format.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 min-w-0 text-blue-600 underline"
                  >
                    <img
                      className="w-[20px] mt-1 flex-shrink-0"
                      src={GoogleDrive}
                      alt=""
                    />
                    <span className="block min-w-0 break-all whitespace-normal">
                      {format.title}
                    </span>
                  </a>
                </div>
              ))}
        </div>

        {/* Necessary Formats */}
        <div className="p-4 border border-gray-200 rounded-md min-w-0 bg-white">
          <h2 className="text-xl font-semibold underline mb-4 text-black">
            Necessary Formats
          </h2>

          <div className="space-y-3">
            <div className="flex items-start gap-2 min-w-0">
              <img
                className="w-[20px] mt-1 flex-shrink-0"
                src={Excel}
                alt=""
              />
              <a
                href="https://docs.google.com/spreadsheets/d/1BxWqaaVdJnb0dUBvzWA39VnDQaDGdYH1/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all"
              >
                Travelling Bill
              </a>
            </div>

            <div className="flex items-start gap-2 min-w-0">
              <img
                className="w-[20px] mt-1 flex-shrink-0"
                src={Pdf}
                alt=""
              />
              <a
                href="https://docs.google.com/spreadsheets/d/1BxWqaaVdJnb0dUBvzWA39VnDQaDGdYH1/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all"
              >
                Leave Application
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
