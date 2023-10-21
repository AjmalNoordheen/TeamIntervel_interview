import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Addtask from "./Addtask";
import { taskInstance } from "../Axios/TaskAxios";

function Detailpage() {
  const navigate = useNavigate("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);
  const [spinner, setSpinner] = useState(true);

  const id = queryParams.get("id");

  useEffect(() => {
    taskInstance.get("/listTasks").then((res) => {
      if (res.data.message) {
        setItem(res.data.result);
      }
      setTimeout(() => {
        setSpinner(false);
      }, 1000);
    });
  }, [show]);

  const selectItem = item.find((item) => item.id == id);

  return (
    <div className="w-screen h-screen flex bg-blue-500 text-white justify-center items-center">
      {spinner ? (
        <span className="loader"></span>
      ) : (
        <div className="w-11/12 h-5/6 flex bg-black ">
          <div className="w-1/3 h-full hidden md:flex  flex-col items-center  bg-white">
            <div className="w-full flext items-center p-2">
              <button
                onClick={() => navigate("/")}
                className="font-bold text-xl hover:border"
              >
                🔙
              </button>
            </div>
            <img loading="lazy" className="" src="/Rectangle 4452.png" alt="" />
          </div>
          <div className="w-full md:w-2/3 h-full  bg-opacity-5 border flex flex-col items-center justify-center">
            <div className="w-[96%] h-[45%] flex  bg-slate-800">
              <span
                onClick={() => navigate("/")}
                className="ml-2 md:hidden cursor-pointer hover:animate-pulse"
              >
                ⬅️
              </span>
              <div className="w-2/5 h-full flex justify-center items-center ">
                <img
                  className="h-2/3"
                  src={selectItem ? selectItem.image : ""}
                  alt=""
                />
              </div>
              <div className="flex flex-col w-3/5 h-2/3 mt-2  items-start">
                <div className="h-2/3 font-semibold text-xl w-2/3 flex justify-around gap-x-5 overflow-hidden items-center">
                  <h1 className="w-full  uppercase overflow-scroll">
                    {selectItem ? selectItem.heading : ""}
                  </h1>
                  <button
                    onClick={() => setShow(true)}
                    className="border px-4 bg-black hover:bg-white hover:text-black hover:border rounded  py-0.5"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex gap-x-4 font-semibold text-base text-slate-300 md:gap-x-12">
                  <p>
                    {selectItem
                      ? new Date(selectItem.created_at).toLocaleString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          }
                        )
                      : ""}
                  </p>
                  <p>
                    {selectItem
                      ? new Date(selectItem.date).toLocaleDateString()
                      : ""}
                  </p>
                  <p>{selectItem ? selectItem.priority : ""}</p>
                </div>
              </div>
            </div>
            {show ? (
              <Addtask
                type={"editTask"}
                value={selectItem}
                show={show}
                setShow={setShow}
              />
            ) : (
              ""
            )}
            <div className="w-[96%] h-[50%] bg-white flex justify-center items-center">
              <div className="w-[96%] over h-4/5 text-slate-700 text-sm font-bold bg-white ">
                <p className="m-1  ">
                  <small className="block text-slate-700">description:-</small>
                  {selectItem ? selectItem.description : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detailpage;
