import React, { useEffect, useState } from "react";
import Hand from "../images/hand.gif";
import Envelope from "../images/envelope.gif";

const PDF = () => {
  const [pdfs, setPdfs] = useState([]);
  const [formats, setFormats] = useState([]);

  console.log(pdfs);

  useEffect(() => {
    fetch("/pdf.json")
      .then((res) => res.json())
      .then((data) => {
        setPdfs(data);
      });
  }, []);

  useEffect(() => {
    fetch("/mailformat.json")
      .then((res) => res.json())
      .then((data) => {
        setFormats(data);
      });
  }, []);

  return (
    <div className="min-h-screen">
      <h1 className="text-center font-semibold text-2xl my-3">All PDF</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Knowledge Sharing File */}
        <div className=" lg:border-r-2 border-gray-500  p-2">
          <h2 className="text-xl font-semibold underline  mb-3">
            Knowledge Sharings
          </h2>
          {pdfs.map((pdf) => (
            <div key={pdf.id}>
              <a
                className="text-blue-600 underline flex items-center gap-1"
                href={pdf.link}  target="_blank"
                rel="noopener noreferrer"
              >
                <img className="w-[20px]" src={Hand} alt="" /> {pdf.title}
              </a>
            </div>
          ))}
        </div>

        {/* Mail Communication Format */}
        <div>
          <h2 className="text-xl font-semibold underline  my-2">
            Mail Communication
          </h2>
          <div className="pl-1">
            {formats.map((format) => (
              <div key={format.id}>
                <a
                  className="text-blue-600 underline flex items-center gap-1"
                  href={format.link}  target="_blank"
                rel="noopener noreferrer"
                >
                  <img className="w-[20px]" src={Envelope} alt="" /> {format.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDF;
