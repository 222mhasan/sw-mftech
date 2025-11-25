import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Arrow2 from "../images/arrow2.gif";
import GoogleSheet from "../images/googleSheets.png";

const SpecialTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [visible, setVisible] = useState(5);

  const showMore = () => {
    setVisible(tasks.length); // show all items
  };

  useEffect(() => {
    fetch("/specialTasks.json")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="mb-5">
      <h1 className="text-xl font-semibold text-center mb-1 text-black py-1 bg-sky-300 font-montserrat">
        Ongoing Tasks
      </h1>
      <div className="px-1 space-x-1">
        {tasks.slice(0, visible).map((task) => (
          <div key={task.id} >
            <a
              className="text-blue-700 font-outfit text-lg underline flex gap-2"
              target="_blank"
              rel="noopener noreferrer"
              href={task.link}
            >
              <span>
                {/* <FaArrowRight className="font-bold text-lg mt-1 text-gray-700" /> */}
                <img className="w-6 mt-1" src={GoogleSheet} alt="" />
              </span>{" "}
              {task.title}
            </a>
          </div>
        ))}
        {/* Show more button */}
        {visible < tasks.length && (
          <button
            className="text-black border-1 border-gray-500  mt-3 flex items-center px-1 mx-auto pr-3 font-semibold rounded-md text-md hover:bg-gray-500 hover:text-white transition-all duration-300"
            onClick={showMore}
          >
            <img className="w-[30px]" src={Arrow2} alt="Show All" />
            Show All
          </button>
        )}
      </div>
    </div>
  );
};

export default SpecialTasks;
