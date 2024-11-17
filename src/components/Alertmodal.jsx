import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../utils/utils";
import {
  getUserAlerts,
  resetUpdateAlert,
  updateAlert,
} from "../features/alertSlice";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Alertmodal = ({ alerts, close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = getAccessToken();

  const { alertUpdated } = useSelector((state) => state.alert);

  const handleClick = (id, status) => {
    console.log(id);
    if (status === "unread") {
      dispatch(updateAlert(id));
    } else {
      close();
      navigate(`/notification/${id}`);
    }
  };

  useEffect(() => {
    if (alertUpdated) {
      dispatch(resetUpdateAlert());
      close();
      navigate(`/notification/${id}`);
    }
  }, [navigate, alertUpdated]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserAlerts());
    }
  }, [dispatch, accessToken]);
  return (
    <div className="absolute top-[70px] right-[3px] flex flex-col gap-4 bg-white shadow-lg rounded-md w-[290px] font-[Poppins] h-[200px] overflow-auto">
      <div className="p-6">
        <h5>Notifications</h5>
      </div>
      {alerts &&
        alerts.map((alert) => {
          return (
            <div
              key={alert._id}
              onClick={() => handleClick(alert._id, alert.status)}
              className={`flex items-center gap-4 text-xs border-t border-b px-4 py-3 border-slate-300 cursor-pointer ${
                alert.status === "unread" ? " bg-yellow-100" : "bg-white"
              }`}
            >
              <MdEmail className="text-xl" />
              <span className="flex flex-col gap-2">
                <h3 className="font-semibold leading-4">{alert.subject}</h3>
                <small>{alert.message.slice(0, 30)}...</small>
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default Alertmodal;
