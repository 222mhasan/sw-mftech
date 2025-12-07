import React, { useEffect, useState } from "react";
import mobile from "../images/mobile.png";
import gmail from "../images/gmail.png";

const EmergencyContacts = () => {
  const [centralLabs, setCentralLabs] = useState([]);
  const [erpTeams, setErpTeams] = useState([]);
  const [crmResponsibilities, setCrmResponsibilities] = useState([]);
  const [openSection, setOpenSection] = useState(""); // Track which section is open

  useEffect(() => {
    fetch("/centralLab.json")
      .then((res) => res.json())
      .then((data) => setCentralLabs(data));
  }, []);

  useEffect(() => {
    fetch("/erpTeam.json")
      .then((res) => res.json())
      .then((data) => setErpTeams(data));
  }, []);

  useEffect(() => {
    fetch("/crmResponsibilities.json")
      .then((res) => res.json())
      .then((data) => setCrmResponsibilities(data));
  }, []);

  const toggleSection = (sectionName) => {
    setOpenSection(openSection === sectionName ? "" : sectionName);
    
  };

  return (
    <div>
      <h1 className="text-center py-2 mb-1 text-xl font-semibold bg-pink-500">
        Emergency Contacts
      </h1>

      {/* BracNet */}
      <div className="my-1 rounded-md border bg-base-100 border-base-300 collapse ">
      
        <div
          className="flex justify-between items-center cursor-pointer p-4 collapse-title bg-gray-300 peer-checked:bg-secondary peer-checked:text-secondary-content"
          onClick={() => toggleSection("BracNet")}
        >
          <h2 className="text-lg font-semibold text-black">BracNet</h2>
          <h2 className="text-black">{openSection === "BracNet" ? "-" : "+"}</h2>
        </div>
        {openSection === "BracNet" && (
          <div className="bg-white text-center text-black p-2">
            {/* BracNet Hotline */}
            <div className=" mb-2 py-2 shadow-md">
              <h1 className="text-lg font-semibold text-black">
                BracNet Hotline
              </h1>
              <a
                href="tel:+8809677111222"
                className="text-blue-600 text-md font-bold underline hover:text-blue-800"
              >
                +8809677111222
              </a>
            </div>

            {/* Md.Rakibul Islam */}
            <div className="mb-2 py-2 shadow-md">
              <h1 className="text-lg font-semibold text-black">
                Md.Rakibul Islam
              </h1>
              <h3 className="text-md ">Branch Internet Connection Status</h3>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=rakibul.islam@bracmail.net"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-semibold text-md mx-auto w-fit underline flex items-center gap-2 hover:text-blue-800"
              >
                <img src={gmail} alt="gmail" className="w-5 h-5" />
                rakibul.islam@bracmail.net
              </a>
              <a
                href="tel:+8801847364381"
                className="text-blue-600 text-md font-bold underline hover:text-blue-800 flex items-center gap-2 mt-1 w-fit mx-auto"
              >
                <img src={mobile} alt="mobile" className="w-5 h-5" />
                +8801847364381
              </a>
            </div>

            {/* Shiyam Talukder */}
            <div className="mb-2 py-2 shadow-md">
              <h1 className="text-lg font-semibold text-black">Shiyam Talukder</h1>
              <h3 className="text-md ">
                Internet Connection, Bandwidth Upgradation, Migration
              </h3>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=shiyam@bracmail.net"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-semibold text-md mx-auto w-fit underline flex items-center gap-2 hover:text-blue-800"
              >
                <img src={gmail} alt="gmail" className="w-5 h-5" />
                shiyam@bracmail.net
              </a>
              <a
                href="tel:+8801989003592"
                className="text-blue-600 text-md font-bold underline hover:text-blue-800 flex items-center gap-2 mt-1 w-fit mx-auto"
              >
                <img src={mobile} alt="mobile" className="w-5 h-5" />
                +8801989003592
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Central Lab */}
      <div className="my-1 rounded-md border bg-base-100 border-base-300 collapse">
        <div
          className="flex justify-between items-center cursor-pointer p-4 collapse-title bg-gray-300 peer-checked:bg-secondary peer-checked:text-secondary-content"
          onClick={() => toggleSection("CentralLab")}
        >
          <h2 className="text-lg font-semibold text-black">Central Lab</h2>
          <h2 className="text-black">{openSection === "CentralLab" ? "-" : "+"}</h2>
        </div>
        {openSection === "CentralLab" && (
          <div className="bg-white text-black p-2">
            {centralLabs.map((lab) => (
              <div
                className="card w-full bg-white text-black card-md shadow-sm rounded-none border-gray-300 border-b my-1"
                key={lab.id}
              >
                <div className="card-body -space-y-3 text-lg text-center">
                  <h2 className="font-semibold text-center">{lab.name}</h2>
                  <h3 className="text-md">{lab.role}</h3>
                  <a
                    href={lab.phone}
                    className="text-blue-600 text-md font-bold underline hover:text-blue-800"
                  >
                    {lab.phone.replace("tel:", "")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EA Team */}
      <div className="my-1 rounded-md border bg-base-100 border-base-300 collapse">
        <div
          className="flex justify-between items-center cursor-pointer p-4 collapse-title bg-gray-300 peer-checked:bg-secondary peer-checked:text-secondary-content"
          onClick={() => toggleSection("EATeam")}
        >
          <h2 className="text-lg font-semibold text-black">EA Team</h2>
          <h2 className="text-black">{openSection === "EATeam" ? "-" : "+"}</h2>
        </div>
        {openSection === "EATeam" && (
          <div className="bg-white text-black p-2">
            {erpTeams.map((erp) => (
              <div
                className="card w-full bg-white text-black card-md shadow-sm rounded-none border-gray-300 border-b my-1"
                key={erp.id}
              >
                <div className="card-body -space-y-3 text-lg text-center">
                  <h2 className="font-semibold text-center">{erp.name}</h2>
                  <h3 className="text-md">{erp.role}</h3>
                  <a
                    href={erp.phone}
                    className="text-blue-600 text-md font-bold underline hover:text-blue-800"
                  >
                    {erp.phone.replace("tel:", "")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CRM Responsibilities */}
      <div className="my-1 rounded-md border bg-base-100 border-base-300 collapse">
        <div
          className="flex justify-between items-center cursor-pointer p-4 collapse-title bg-gray-300 peer-checked:bg-secondary peer-checked:text-secondary-content"
          onClick={() => toggleSection("CRM")}
        >
          <h2 className="text-md font-semibold text-black">CRM Responsibilities</h2>
          <h2 className="text-black">{openSection === "CRM" ? "-" : "+"}</h2>
        </div>
        {openSection === "CRM" && (
          <div className="bg-white text-black p-2">
            {crmResponsibilities.map((crm) => (
              <div
                className="card w-full bg-white text-black card-md shadow-sm rounded-none border-gray-300 border-b my-1"
                key={crm.id}
              >
                <div className="card-body -space-y-3 text-lg text-center">
                  <h2 className="font-semibold text-center">{crm.name}</h2>
                  <h3 className="text-md">{crm.role}</h3>
                  <a
                    href={crm.phone}
                    className="text-blue-600 text-md font-bold underline hover:text-blue-800"
                  >
                    {crm.phone.replace("tel:", "")}
                  </a>
                  <ul className="text-left mx-auto w-fit text-gray-800">
                    {Object.entries(crm.responsibilities).map(([key, value], idx) => (
                      <li key={key} className="leading-tight">
                        {idx + 1}. {value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;
