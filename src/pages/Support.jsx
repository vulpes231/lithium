import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getTicket } from "../features/ticketSlice";

import { FaUserCircle } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

const Support = ({ setActive }) => {
  const { ticketId } = useParams();
  const dispatch = useDispatch();

  const accessToken = getAccessToken();

  const { ticketData } = useSelector((state) => state.ticket);

  const myMessages =
    ticketData &&
    ticketData.messages.map((msg) => {
      return (
        <div
          key={msg._id}
          className={`shadow-sm py-3.5 px-6 rounded-sm ${
            msg.sender === "admin"
              ? "flex flex-row justify-end bg-slate-300"
              : "flex flex-row items-center bg-white"
          }`}
        >
          <span
            className={`${
              msg.sender === "admin"
                ? "flex flex-row-reverse items-center gap-10"
                : "flex flex-row items-center gap-10"
            }`}
          >
            <span className="flex items-center gap-1">
              {msg.sender === "admin" ? <MdSupportAgent /> : <FaUserCircle />}
              <h3 className="font-medium test-xs capitalize">{msg.sender}</h3>
            </span>
            <p className="font-light text-xs">{msg.message}</p>
          </span>
        </div>
      );
    });

  useEffect(() => {
    if (accessToken && ticketId) {
      dispatch(getTicket({ ticketId: ticketId }));
    }
  }, [accessToken, ticketId, dispatch]);

  useEffect(() => {
    setActive("support ticket");
  }, []);
  return (
    <section className="bg-slate-100 text-slate-700 h-full p-6 overflow-auto">
      <div className="w-full lg:w-[600px] lg:mx-auto flex flex-col gap-6 mb-24">
        <h3 className="font-semibold text-xl md:text-2xl capitalize">
          Finance Hedge Support
        </h3>
        <div className="flex flex-col gap-4">
          <form
            action=""
            className="bg-white p-6 flex w-full flex-col gap-4 shadow-lg"
          >
            <div className="flex flex-col">
              <label htmlFor="" className="font-medium capitalize py-1">
                Message
              </label>
              <textarea
                name=""
                className="border outline-none focus:outline-green-500 focus:border-none"
                rows={5}
              ></textarea>
            </div>
            <button className="py-2 px-5 bg-green-600 text-white rounded-sm">
              Send
            </button>
          </form>
          <hr />
          <div className="flex flex-col gap-2  border p-4 bg-slate-50">
            <h3 className="font-semibold">Conversations</h3>
            <div className="h-[300px] overflow-auto">{myMessages}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
