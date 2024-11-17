import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../utils/utils";
import { getAlert } from "../features/alertSlice";
import { useParams } from "react-router-dom";
import { CgMailForward, CgMailOpen, CgMailReply } from "react-icons/cg";
import { MdMailOutline } from "react-icons/md";

const Notification = () => {
  const dispatch = useDispatch();

  const { message } = useSelector((state) => state.alert);
  const accessToken = getAccessToken();

  const { id } = useParams();

  console.log(message);

  useEffect(() => {
    if (accessToken) {
      dispatch(getAlert(id));
    }
  }, [accessToken]);
  return (
    <div className="w-full h-full bg-slate-50 min-h-screen mt-20 flex items-center justify-center ">
      <div className="bg-white w-full md:max-w-[450px] md:mx-auto p-6 flex flex-col gap-2 shadow-md rounded-lg font-[Poppins]">
        <span className="flex items-center gap-3">
          <MdMailOutline className="w-7 h-7" />
          <h3 className="font-semibold text-md">{message.subject}</h3>
        </span>
        <p className="font-light leading-7 test-sm px-4 ">{message.message}</p>
      </div>
    </div>
  );
};

export default Notification;
