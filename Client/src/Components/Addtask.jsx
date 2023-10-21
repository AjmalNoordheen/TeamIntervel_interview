import React, { useRef, useState } from "react";
import { taskInstance } from "../Axios/TaskAxios";
import LoopIcon from "@mui/icons-material/Loop";
import toast from "react-hot-toast";
import CancelIcon from "@mui/icons-material/Cancel";

function Addtask({ show, setShow, type, value }) {
  const [heading, setHeading] = useState(value ? value.heading : "");
  const [spin, setSpin] = useState(false);
  const [description, setDescription] = useState(
    value ? value.description : ""
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [file, setFile] = useState(value ? value.image : "");
  const priorityRef = useRef("");

  // Form Submit Function=========

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSpin(true);
    const priority = priorityRef.current.value;

    try {
      let res;
      // =========================== EDIT FUNCTION ========================
      if (type === "editTask") {
        if (
          heading === value.heading &&
          description === value.description &&
          file === value.image &&
          priority === value.priority
        ) {
          toast.error("No changes applied");
          setSpin(false);
          return;
        } else {
          const id = value.id;
          res = await taskInstance.patch("/editTask", {
            id,
            heading,
            description,
            priority,
            file,
          },{ headers: { "Content-Type": "multipart/form-data" }});
          if (res.data.message) {
            value = res.data.value;
            setSpin(false);
            toast.success("Succefully updates");
          } else {
            setSpin(false);
            toast.error("Something Went Wrong");
          }
        }
      } else {

   // =========================== ADDING NEW TASK FUNCTION ========================
        res = await taskInstance.post(
          "/addTasks",
          {
            heading,
            description,
            file,
            priority,
            time,
            date,
          },
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (res.data.message) {
          setSpin(false);
          toast.success("Succefully Added");
        } else {
          setSpin(false);
          toast.error("Something Went Wrong");
        }
      }
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center text-black bg-black bg-opacity-50 ${
        show ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded shadow-md w-96">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Add a Task</h2>
          <div onClick={() => setShow(false)}>
            <CancelIcon className="cursor-pointer hover:text-red-500 text-red-700" />
          </div>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Heading
            </label>
            {type == "editTask" ? (
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Task Heading"
                defaultValue={value.heading}
                onChange={(e) => setHeading(e.target.value)}
                required
              />
            ) : (
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Task Heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                required
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            {type == "editTask" ? (
              <textarea
                rows="3"
                className="w-full border rounded px-3 py-2"
                placeholder="Task Description"
                defaultValue={value.description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            ) : (
              <textarea
                rows="3"
                className="w-full border rounded px-3 py-2"
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            )}
          </div>
          <div className="mb-4 flex gap-x-1">
            <div className="w-1/2 border text-center items-center flex rounded">
              <select
                ref={priorityRef}
                defaultValue={type == "editTask" ? value.priority : ""}
                className="border-none"
                name=""
                id=""
              >
                <option value="" disabled defaultValue={" Select the priority"}>
                  Select the priority
                </option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            {type == "editTask" ? (
              <input
                className="w-full text-red-600 border rounded px-3 py-2"
                disabled
                defaultValue={new Date(value.date).toLocaleDateString()}
                required
              />
            ) : (
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Time
            </label>
            {type == "editTask" ? (
              <input
                className="w-full border rounded text-red-500 px-3 py-2"
                disabled
                defaultValue={new Date(value.created_at).toLocaleString(
                  "en-US",
                  { hour: "numeric", minute: "numeric", hour12: true }
                )}
                required
              />
            ) : (
              <input
                type="time"
                className="w-full border rounded px-3 py-2"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            )}
          </div>
          <div className="mb-4 gap-x-1 flex">
            {type == "editTask" ? (
              <input
                type="file"
                className="w-full border rounded px-3 py-2"
                name="file"
                accept=".jpg, .jpeg, .png,.webp"
                onChange={(e) => setFile(e.target.files[0])}
              />
            ) : (
              <input
                type="file"
                className="w-full border rounded px-3 py-2"
                name="file"
                accept=".jpg, .jpeg, .png,.webp"
                onChange={(e) => setFile(e.target.files[0])}
              />
            )}
            {type == "editTask" ? (
              <>
                <img
                  className="h-16 w-28 rounded"
                  src={
                    file instanceof File
                      ? URL.createObjectURL(file)
                      : value
                      ? value.image
                      : ""
                  }
                  alt=""
                />
              </>
            ) : (
              <>
                {file ? (
                  <img
                    className="h-16 w-28 rounded"
                    src={file instanceof File ? URL.createObjectURL(file) : ""}
                    alt=""
                  />
                ) : (
                  ""
                )}
              </>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
          >
            {spin ? <LoopIcon className="animate-spin" /> : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addtask;
