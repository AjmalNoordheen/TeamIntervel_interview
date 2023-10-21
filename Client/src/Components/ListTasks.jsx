import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect, useRef, useState } from "react";
import Addtask from "./Addtask";
import { taskInstance } from "../Axios/TaskAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ListTasks() {
  const [show, setShow] = useState(false);
  const [allTask, setAllTask] = useState([]);
  const [deleted, setDelete] = useState(1);

  const [sample, setSample] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    taskInstance.get("/listTasks").then((res) => {
      if (res.data.message) setAllTask(res.data.result);
    });
  }, [deleted, show]);

  // Filter According to Priority==========

  let filteredData;
  if (sample == "All") {
    filteredData = allTask;
  } else {
    filteredData = allTask.filter((item) => {
      return item.priority === sample;
    });
  }

  // Show the Day ===========
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = day[new Date().getDay()];

  //Delete a Task Fun/Modal==========
  const deleteTask = async (id) => {
    try {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        denyButtonText: `Delete`,
        confirmButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire("Changes are not saved", "", "info");
        } else if (result.isDenied) {
          const res = await taskInstance.delete(`/deleteTask?id=${id}`);
          if (res.data.message) {
            setDelete(deleted + 1);
            Swal.fire("Deleted!", "", "success");
          } else {
            Swal.fire("Some thing Went Wrong", "", "error");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  // ====showDetailPage===========

  const showDetailPage = async (id) => {
    try {
      const allTaskString = JSON.stringify(allTask);
      navigate(
        `/detailpage?id=${id}&value=${encodeURIComponent(allTaskString)}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-screen h-screen bg-blue-500 flex flex-col justify-center items-center">
      <div className="flex w-11/12 justify-between">
        <div className="w-[55%] flex items-center justify-end">
          <h1 className="mb-1 font-semibold">
            Hey Today is
            <p className="font-extrabold text-2xl text-white font-mono">
              {today}
            </p>
          </h1>
          <div className="animate-bounce text-3xl">⏰</div>
        </div>
        <div
          onClick={() => setShow(true)}
          className="flex items-center border rounded cursor-pointer  hover:bg-blue-800 bg-black font-bold text-white mb-2 text-end "
        >
          <p className="ml-3">Add Task</p>
          <IconButton className="">
            <AddCircleIcon className="text-green-400" />
          </IconButton>
        </div>
      </div>
      <Addtask value={""} type={"listTask"} setShow={setShow} show={show} />
      <div className="bg-white w-11/12 h-5/6 rounded flex-col gap-1 flex justify-center items-center">
        <div className="h-9 w-11/12 flex bg-slate-500 font-semibold text-white ">
          <div className="w-[97%] flex items-center text-sm md:text-base justify-around rounded bg-slate-500">
            <p className="">Image</p>
            <p>Heading</p>
            <p>Description</p>
            <p>Time</p>
            <p>Date</p>
            <div className="lg:w-12 flex items-center text-black gap-x-1">
              <small className="text-white">Priority</small>
              <select
                onChange={(e) => setSample(e.target.value)}
                name="scrol"
                id=""
              >
                <option value="All">All</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="h-5/6 bg-slate-300 w-11/12 pt-3 pb-3 text-sm md:text-base font-semibold text-slate-700 gap-y-1.5 overflow-scroll flex flex-col items-center ">
          {filteredData
            ? filteredData.map((item) => (
                <div
                  key={item.id}
                  className="w-[97%] flex items-center justify-around hover:bg-slate-100 rounded bg-white h-16 sm:h-20"
                >
                  <img
                    loading="lazy"
                    className="w-[12%] ml-1 md:ml-0 md:w-16 h-[80%] md:h-16 rounded-full"
                    src={item.image}
                    alt=""
                  />
                  <div className="w-20 md:w-28 overflow-hidden flex items-center h-full">
                    <p>{item.heading}</p>
                  </div>
                  <div className="flex overflow-hidden justify-center items-center  h-full">
                    <p className="w-20 md:w-28 h-3/5   text-start  overflow-hidden">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center  h-full">
                    <p>
                      {new Date(item.created_at).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </p>
                  </div>
                  <div className="flex items-center h-full">
                    <p>{new Date(item.date).toLocaleDateString()}</p>
                  </div>
                  <div className="md:w-16 md:gap-x-1 flex justify-center">
                    <IconButton onClick={() => showDetailPage(item.id)}>
                      <RemoveRedEyeIcon fontSize="medium" />
                    </IconButton>
                    <IconButton onClick={() => deleteTask(item.id)}>
                      <AutoDeleteIcon fontSize="medium" />
                    </IconButton>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default ListTasks;
