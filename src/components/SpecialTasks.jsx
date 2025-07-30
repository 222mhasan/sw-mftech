import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const SpecialTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/specialTasks.json")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="mb-5">
      <h1 className="text-xl font-semibold text-center mb-1 text-black bg-sky-300 font-montserrat">
        Ongoing Tasks</h1>
        <div className="px-1 space-x-1">
          {tasks.map((task) => (
            <div key={task.id}>
              <a
                className="text-blue-500 text-sm py-1 underline flex gap-2"
                target="_blank"
                rel="noopener noreferrer"
                href={task.link}
              >
                <span>
                  <FaArrowRight className="font-bold text-xl text-black" />
                </span>{" "}
                {task.title}
              </a>
            </div>
          ))}
        </div>
      
    </div>
  );
};

export default SpecialTasks;
