import React from "react";

const EmergencyContacts = () => {
  return (
    <div>
      <h1 className="text-center py-2 text-xl font-semibold bg-pink-500">
        Emergency Contacts
      </h1>
      {/* Brac Net */}
      <div className="bg-gray-200 border-2 text-center -space-y-1 rounded-md">
        <h1 className="text-lg font-semibold ">BracNet Hotline</h1>
        <a
          href="tel:+8809677111222"
          className="text-blue-600 text-md font-bold underline hover:text-blue-800"
        >
          +8809677111222
        </a>
      </div>
      {/* Central lab */}
      <div className="my-1">
        <div className="bg-base-100 border-base-300 collapse border">
          <input type="checkbox" className="peer" />
          <div className="collapse-title  text-black bg-gray-300 peer-checked:bg-secondary peer-checked:text-secondary-content">
            <div className="flex justify-between text-black">
              <h2 className="text-lg font-semibold ">Central Lab</h2>
              <h2>+</h2>
            </div>
          </div>
          <div className="collapse-content  text-black space-y-1">
           <div className="-space-y-1 text-center border-1 rounded-md mt-1">
            <h2>Shovan Shahriar</h2>
            <p>Lab Incharge</p>
            <a
              href="tel:+8801712345678" 
                className="text-blue-600 text-md font-bold underline hover:text-blue-800"
            >
              +8801712345678
            </a>
           </div>
           <div className="-space-y-1 text-center border-1 rounded-md">
            <h2>Sharifuzzaman Khan Shawrav </h2>
            <p>Security</p>
            <a
              href="tel:+880 1324-714677" 
                className="text-blue-600 text-md font-bold underline hover:text-blue-800"
            >
              +880 1324-714677
            </a>
           </div>
          </div>
        </div>
      </div>
      {/* ERP Team */}
      {/* <div>
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
      </div> */}
    </div>
  );
};

export default EmergencyContacts;
