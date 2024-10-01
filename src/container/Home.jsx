import { useEffect, useState } from "react";

function Home() {
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("");

  const [planner, setPlanner] = useState([]);

  useEffect(() => {
    // Check if the data is present in local storage
    const plannerData = localStorage.getItem("plannerData");
    if (plannerData) {
      setPlanner(JSON.parse(plannerData));
    }
  }, []);

  const handleAddClick = (e) => {
    e.preventDefault();
    const obj = {
      subject: subject,
      hours: parseInt(hours), // Ensure hours are stored as a number
    };
    const plannerArray = [...planner, obj];
    setPlanner(plannerArray);
    localStorage.setItem("plannerData", JSON.stringify(plannerArray));
    setSubject("");
    setHours("");
  };

  const handlePlusBtn = (index) => {
    // Create a deep copy of the planner array
    const plannerCopy = [...planner];
    plannerCopy[index] = {
      ...plannerCopy[index],
      hours: plannerCopy[index].hours + 1, // Increment hours by 1
    };
    setPlanner(plannerCopy);
    localStorage.setItem("plannerData", JSON.stringify(plannerCopy)); // Update local storage
  };

  const handleMinusBtn = (index) => {
    // Create a deep copy of the planner array
    const plannerCopy = [...planner];
    if (plannerCopy[index].hours > 0) {
      plannerCopy[index] = {
        ...plannerCopy[index],
        hours: plannerCopy[index].hours - 1, // Decrement hours by 1
      };
      setPlanner(plannerCopy);
      localStorage.setItem("plannerData", JSON.stringify(plannerCopy)); // Update local storage
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl my-5">Edu Planner</h1>
        <form>
          <input
            className="border border-gray-200 rounded-md py-1 px-2"
            onChange={(e) => setSubject(e.target.value)}
            type="text"
            placeholder="subject"
            value={subject}
          />
          <input
            className="border border-gray-200 rounded-md py-1 px-2 mx-4"
            onChange={(e) => setHours(e.target.value)}
            value={hours}
            type="number"
            step={1}
            placeholder="hours"
          />
          <button
            className="border border-gray-200 rounded-md py-1 px-2 bg-gray-300"
            onClick={handleAddClick}
          >
            Add
          </button>
        </form>
        {planner.map((data, index) => (
          <div
            className="my-3 shadow-lg w-[40%] mx-auto flex items-center justify-center"
            key={`card_${index}`}
          >
            <p>
              {data.subject} - {data.hours} hours
            </p>
            <button
              className="border border-gray-200 rounded-md py-1 px-2 bg-green-300 mx-3"
              onClick={() => handlePlusBtn(index)}
            >
              +
            </button>
            <button
              className="border border-gray-200 rounded-md py-1 px-2 bg-red-300"
              onClick={() => handleMinusBtn(index)}
            >
              -
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
