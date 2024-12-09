import React, { useEffect } from "react";
import { MdArrowBack, MdComputer } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utils";
import { getUserTickets } from "../features/ticketSlice";

const styles = {
  th: "px-5 py-3 text-left capitalize",
  td: "px-5 py-3 text-left capitalize text-sm",
};

const Usertickets = ({ setActive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tickets } = useSelector((state) => state.ticket);

  const accessToken = getAccessToken();

  const openTicket = (e, ticketId) => {
    e.preventDefault();
    console.log(ticketId);
    navigate(`/support/${ticketId}`);
  };

  const myTickets =
    tickets &&
    tickets.map((ticket, index) => {
      return (
        <tr
          key={ticket._id}
          className={index % 2 === 0 ? "bg-slate-100" : "bg-slate-200"}
        >
          <td className={`font-bold ${styles.td}`}>{`[Ticket#${ticket._id.slice(
            3,
            8
          )}] ${ticket.subject}`}</td>
          <td className={` ${styles.td}`}>
            <span
              className={`py-1 px-3 rounded-3xl text-xs ${
                ticket.status === "open"
                  ? "bg-green-50 border border-green-600 text-green-600"
                  : "bg-red-600 border border-red-600 text-red-600"
              }`}
            >
              {ticket.status}
            </span>
          </td>
          <td className={styles.td}>{ticket.priority}</td>
          <td className={styles.td}>{ticket.updatedAt}</td>
          <td className={styles.td}>
            <button
              onClick={(e) => openTicket(e, ticket._id)}
              className="cursor-pointer"
            >
              <MdComputer className="w-6 h-6 " />
            </button>
          </td>
        </tr>
      );
    });

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserTickets());
    }
  }, [accessToken]);

  useEffect(() => {
    setActive("support ticket");
  }, []);
  return (
    <section className="bg-slate-100 text-slate-700 h-full p-6 overflow-auto">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-xl md:text-2xl capitalize">
            user tickets
          </h3>
          <Link
            to={"/ticket"}
            className="bg-slate-950 flex items-center gap-1 text-white capitalize px-4 py-2 rounded-md shadow-md text-sm font-medium"
          >
            <MdArrowBack />
            Open Ticket
          </Link>
        </div>
        <div className=" p-6 rounded-sm  flex flex-col">
          <table className="min-w-full bg-white">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className={styles.th}>subject</th>
                <th className={styles.th}>status</th>
                <th className={styles.th}>priority</th>
                <th className={styles.th}>last replied</th>
                <th className={styles.th}>action</th>
              </tr>
            </thead>
            <tbody>{myTickets}</tbody>
          </table>
          {/* {!userTrnxs ? <p> Data not found.</p> : myDeposits} */}
        </div>
      </div>
    </section>
  );
};

export default Usertickets;
