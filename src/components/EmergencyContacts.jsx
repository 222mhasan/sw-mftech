import React, { useEffect, useState } from "react";
import mobile from "../images/mobile.png";
import gmail from "../images/gmail.png";
import AOS from "aos";

const EmergencyContacts = () => {
  const [centralLabs, setCentralLabs] = useState([]);
  const [erpTeams, setErpTeams] = useState([]);
  const [crmResponsibilities, setCrmResponsibilities] = useState([]);
  const [backupSupports, setBackupSupports] = useState([]);
  const [openSection, setOpenSection] = useState("");

  useEffect(() => {
  AOS.init({
    duration: 700,
    easing: "ease-out-cubic",
    once: true, // animation happens only once
  });
}, []);

  useEffect(() => {
    fetch("/centralLab.json").then(res => res.json()).then(setCentralLabs);
    fetch("/erpTeam.json").then(res => res.json()).then(setErpTeams);
    fetch("/crmResponsibilities.json").then(res => res.json()).then(setCrmResponsibilities);
    fetch("/backupSupport.json").then(res => res.json()).then(setBackupSupports);
  }, []);

  const toggleSection = (name) => {
    setOpenSection(openSection === name ? "" : name);
  };

  /* ---------- Reusable UI ---------- */

  const SectionHeader = ({ title, name }) => (
    <div
      onClick={() => toggleSection(name)}
      className="flex justify-between items-center px-4 py-3 cursor-pointer
                 bg-gradient-to-r from-slate-200 to-slate-300
                 hover:from-slate-300 hover:to-slate-400 transition rounded-md"
    >
      <h2 className="text-base sm:text-lg font-semibold text-slate-800">
        {title}
      </h2>
      <span className="text-xl font-bold text-slate-700">
        {openSection === name ? "−" : "+"}
      </span>
    </div>
  );

  const BracNetCard = ({ children }) => (
    <div
      className="bg-white text-black text-center px-4 py-3
                 rounded-md shadow-sm border-b-4 border-sky-400
                 space-y-1"
    >
      {children}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-2 mb-6">
      <h1 className="text-center text-xl sm:text-2xl font-semibold
                     py-2 mb-3 bg-pink-500 text-white rounded-md">
        Emergency Contacts
      </h1>

      {/* ================= BracNet ================= */}
      <div data-aos="fade-left" className="mb-2">
        <SectionHeader title="BracNet" name="BracNet" />
        {openSection === "BracNet" && (
          <div className="mt-2 space-y-3">
            <BracNetCard>
              <h3 className="font-semibold text-lg">BracNet Hotline</h3>
              <a href="tel:+8809677111222" className="text-blue-600 font-bold underline">
                +880 9677 111222
              </a>
            </BracNetCard>

            <BracNetCard>
              <h3 className="font-semibold">Md. Rakibul Islam</h3>
              <p className="text-sm text-gray-600">Branch Internet Status</p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=rakibul.islam@bracmail.net"
                target="_blank"
                rel="noreferrer"
                className="flex justify-center items-center gap-2 text-blue-600 underline"
              >
                <img src={gmail} className="w-4 h-4" /> rakibul.islam@bracmail.net
              </a>
              <a
                href="tel:+8801847364381"
                className="flex justify-center items-center gap-2 text-blue-600 underline"
              >
                <img src={mobile} className="w-4 h-4" /> +880 1847 364381
              </a>
            </BracNetCard>

            <BracNetCard>
              <h3 className="font-semibold">Shiyam Talukder</h3>
              <p className="text-sm text-gray-600">
                Internet, Bandwidth & Migration
              </p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=shiyam@bracmail.net"
                target="_blank"
                rel="noreferrer"
                className="flex justify-center items-center gap-2 text-blue-600 underline"
              >
                <img src={gmail} className="w-4 h-4" /> shiyam@bracmail.net
              </a>
              <a
                href="tel:+8801989003592"
                className="flex justify-center items-center gap-2 text-blue-600 underline"
              >
                <img src={mobile} className="w-4 h-4" /> +880 1989 003592
              </a>
            </BracNetCard>
          </div>
        )}
      </div>

      {/* ================= Central Lab ================= */}
      <div data-aos="fade-left" className="mb-2">
        <SectionHeader title="Central Lab" name="CentralLab" />
        {openSection === "CentralLab" && (
          <div className="mt-2 space-y-3">
            {centralLabs.map(lab => (
              <BracNetCard key={lab.id}>
                <h3 className="font-semibold">{lab.name}</h3>
                <p className="text-sm text-gray-600">{lab.role}</p>
                <a href={lab.phone} className="text-blue-600 underline font-semibold">
                  {lab.phone.replace("tel:", "")}
                </a>
              </BracNetCard>
            ))}
          </div>
        )}
      </div>

      {/* ================= EA Team ================= */}
      <div data-aos="fade-left" className="mb-2">
        <SectionHeader title="EA Team" name="EATeam" />
        {openSection === "EATeam" && (
          <div className="mt-2 space-y-3">
            {erpTeams.map(erp => (
              <BracNetCard key={erp.id}>
                <h3 className="font-semibold">{erp.name}</h3>
                <p className="text-sm text-gray-600">{erp.role}</p>
                <a href={erp.phone} className="text-blue-600 underline font-semibold">
                  {erp.phone.replace("tel:", "")}
                </a>
              </BracNetCard>
            ))}
          </div>
        )}
      </div>

      {/* ================= CRM Responsibilities (unchanged) ================= */}
      <div data-aos="fade-left" className="mb-2">
        <SectionHeader title="CRM Responsibilities" name="CRM" />
        {openSection === "CRM" && (
          <div className="mt-2 space-y-3">
            {crmResponsibilities.map(crm => (
              <BracNetCard key={crm.id}>
                <h3 className="font-semibold">{crm.name}</h3>
                <p className="text-sm text-gray-600">{crm.role}</p>
                <a href={crm.phone} className="text-blue-600 underline font-semibold">
                  {crm.phone.replace("tel:", "")}
                </a>
                <ul className="text-left text-sm mt-2 list-decimal list-inside">
                  {Object.values(crm.responsibilities).map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </BracNetCard>
            ))}
          </div>
        )}
      </div>

      {/* ================= Backup Support ================= */}
      <div data-aos="fade-left" className="mb-2">
        <SectionHeader title="Backup Support" name="BackupSupport" />
        {openSection === "BackupSupport" && (
          <div className="mt-2 space-y-3">
            {backupSupports.map(bs => (
              <BracNetCard key={bs.id}>
                <h3 className="font-semibold">{bs.name}</h3>
                <p className="text-sm text-gray-600">{bs.role}</p>
                <a href={bs.phone} className="text-blue-600 underline font-semibold">
                  {bs.phone.replace("tel:", "")}
                </a>
              </BracNetCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;
