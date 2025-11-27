import React, { useEffect, useState } from "react";

const EmergencyContacts = () => {
  const [centralLabs, setCentralLabs] = useState([]);
  const [erpTeams, setErpTeams] = useState([]);
  const [crmResponsibilities, setCrmResponsibilities] = useState([]);
  console.log("CRM Responsibilities count:", crmResponsibilities.length);

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

  return (
    <div>
      <h1 className="text-center py-2 mb-0.5 text-xl font-semibold bg-pink-500">
        Emergency Contacts
      </h1>
      {/* Brac Net start*/}
      <div className="bg-gray-300 border-2 text-center -space-y-1 rounded-md">
        <h1 className="text-lg font-semibold text-black">BracNet Hotline</h1>
        <a
          href="tel:+8809677111222"
          className="text-blue-600 text-md font-bold underline hover:text-blue-800"
        >
          +8809677111222
        </a>
      </div>
      {/* Brac Net end*/}
      {/* Central lab start*/}
      <div className="my-1 border-2 rounded-md">
        <div className="bg-base-100 border-base-300 collapse border">
          <input type="checkbox" className="peer" />
          <div className="collapse-title  text-black bg-gray-300 peer-checked:bg-secondary peer-checked:text-secondary-content">
            <div className="flex justify-between text-black">
              <h2 className="text-lg font-semibold ">Central Lab</h2>
              <h2>+</h2>
            </div>
          </div>
          <div className="collapse-content text-center text-black ">
            {
              /* Central lab contacts mapping */
              centralLabs.map((lab) => (
                <div
                  className="card w-full bg-white text-black card-md shadow-sm rounded-none border-gray-300 border-b-1 my-1"
                  key={lab.id}
                >
                  <div className="card-body -space-y-3 text-lg text-center">
                    <h2 className=" font-semibold text-center">{lab.name}</h2>
                    <h3>{lab.role}</h3>
                    <a
                      href={lab.phone}
                      className="text-blue-600 text-md font-bold underline hover:text-blue-800"
                    >
                      {lab.phone.replace("tel:", "")}
                    </a>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      {/* Central lab end*/}
      {/* ERP Team  start*/}
      <div className="my-1 border-2 rounded-md">
        <div className="bg-base-100 border-base-300 collapse border">
          <input type="checkbox" className="peer" />
          <div className="collapse-title  text-black bg-gray-300 peer-checked:bg-secondary peer-checked:text-secondary-content">
            <div className="flex justify-between text-black">
              <h2 className="text-lg font-semibold ">ERP</h2>
              <h2>+</h2>
            </div>
          </div>
          <div className="collapse-content text-center text-black ">
            {
              /* ERP team contacts mapping */
              erpTeams.map((erp) => (
                <div
                  className="card w-full bg-white text-black card-md shadow-sm rounded-none border-gray-300 border-b-1 my-1"
                  key={erp.id}
                >
                  <div className="card-body -space-y-3 text-lg text-center">
                    <h2 className=" font-semibold text-center">{erp.name}</h2>
                    <h3>{erp.role}</h3>
                    <a
                      href={erp.phone}
                      className="text-blue-600 text-md font-bold underline hover:text-blue-800"
                    >
                      {erp.phone.replace("tel:", "")}
                    </a>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      {/* ERP Team  end*/}
      {/* CRM Responsibility start */}
      <div className="my-1 border-2 rounded-md">
        <div className="bg-base-100 border-base-300 collapse border">
          <input type="checkbox" className="peer" />

          <div className="collapse-title text-black bg-gray-300 peer-checked:bg-secondary peer-checked:text-secondary-content">
            <div className="flex justify-between text-black">
              <h2 className="text-md font-semibold">
                CRM Support Responsibility (FAO)
              </h2>
              <h2>+</h2>
            </div>
          </div>
          <div className="collapse-content text-center text-black ">
            {
              /* CRM support mapping */
              crmResponsibilities.map((crm) => (
                <div
                  className="card w-full bg-white text-black card-md shadow-sm rounded-none border-gray-300 border-b-1 my-1"
                  key={crm.id}
                >
                  <div className="card-body -space-y-3 text-lg text-center">
                    <h2 className=" font-semibold text-center">{crm.name}</h2>
                    <h3>{crm.role}</h3>
                    <a
                      href={crm.phone}
                      className="text-blue-600 text-md font-bold underline hover:text-blue-800"
                    >
                      {crm.phone.replace("tel:", "")}
                    </a>
                    {/* Numbered Responsibilities */}
                    <ul className="text-left  mx-auto w-fit text-gray-800">
                      {Object.entries(crm.responsibilities).map(
                        ([key, value], index) => (
                          <li key={key} className="leading-tight">
                            {index + 1}. {value}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {/* CRM Responsibility end */}
    </div>
  );
};

export default EmergencyContacts;

/* <div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            Click
          </div>
          <div
            tabIndex={0}
            className="dropdown-content card card-sm bg-base-100 z-1 w-64 shadow-md"
          >
            <div className="card-body">
              <p>This is a card. You can use any element as a dropdown.</p>
            </div>
            <div className="card-body">
              <p>This is a card. You can use any element as a dropdown.</p>
            </div>
          </div>
        </div>
      </div> */
