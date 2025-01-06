import { useState } from "react";

const Form = () => {
  const [formValue, setFormValue] = useState({ addTask: "" });
  const [data, setData] = useState([]);
  const [complete, setComplete] = useState([]);
  const HandlerChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const HandlerSubmit = (e) => {
    e.preventDefault();
    if (formValue.addTask.trim() === "") {
      alert("Task Can't be Empty");
      return;
    }
    setData([...data, { ...formValue }]);
    setFormValue({ addTask: "" });
  };
  const HandlerDelete = (idx) => {
    setData(data.filter((_, id) => id != idx));
    setComplete(complete.filter((_, id) => id !== idx));
  };
  const HandlerComplete = (idx) => {
    setComplete((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  };
  return (
    <>
      <div className="bg-zinc-800 h-screen w-full text-white flex justify-center pt-20">
        <div className="border h-96 w-96 rounded-md">
          <div className="flex justify-center items-center text-3xl pt-5 underline">
            Add a new task
          </div>
          <form
            onSubmit={HandlerSubmit}
            className="flex justify-center gap-2 p-4"
          >
            <input
              type="text"
              name="addTask"
              value={formValue.addTask}
              onChange={HandlerChange}
              placeholder="Enter your task"
              className="mt-5 w-full px-5 py-2 rounded-md focus:outline-none bg-transparent"
            />
            <button className="mt-5 w-full py-2 font-semibold rounded-md bg-blue-500 text-white hover:bg-blue-600 active:scale-95 cursor-pointer">
              Add Task
            </button>
          </form>
          <div className="flex justify-center flex-col gap-2 p-4">
            {data.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center gap-2 pl-5"
              >
                <div
                  className={`flex gap-4 font-semibold ${
                    complete[idx] ? "line-through text-gray-500" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={complete[idx] || false}
                    onChange={() => HandlerComplete(idx)}
                  />
                  {item.addTask}
                </div>
                <button
                  type="button"
                  onClick={() => HandlerDelete(idx)}
                  className="w-fit px-5 py-2 font-semibold rounded-md bg-red-500 text-white hover:bg-red-600 active:scale-95 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
