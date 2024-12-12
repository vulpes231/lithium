import React from "react";
import { stake } from "../../assets";

const styles = {
  th: "px-6 py-2",
};

const Showinvestments = ({ data }) => {
  const myData =
    data &&
    data.map((dt, index) => {
      return (
        <tr
          key={index}
          className={`${
            index % 2 !== 0 ? "bg-slate-200 " : "bg-slate-300"
          }text-left capitalize`}
        >
          <td className={styles.th}>
            <span className="flex items-center gap-2">
              <img src={stake} alt="" className="w-[25px]" />
              <span>
                <p>Open position</p>
                <small>{dt.timeStamp}</small>
              </span>
            </span>
          </td>
          <td className={styles.th}>{dt.desc}</td>
          <td className={`${styles.th} `}>
            <span
              className={`p-2 rounded-3xl text-white ${
                dt.status[0] === "open" ? "bg-yellow-500" : "bg-gray-500"
              }`}
            >
              {" "}
              {dt.status}
            </span>
          </td>
          <td className={styles.th}>{dt.amount} USD</td>
          <td className={styles.th}>{dt.yield || 0} USD</td>
        </tr>
      );
    });
  return (
    <section>
      <div>
        <table className="min-w-full text-sm border">
          <thead>
            <tr className="text-left capitalize font-medium  bg-slate-800 p-2 text-white">
              <th className={styles.th}>action</th>
              <th className={styles.th}>tag</th>
              <th className={styles.th}>status</th>
              <th className={styles.th}>amount</th>
              <th className={styles.th}>yield</th>
            </tr>
          </thead>
          <tbody>{myData}</tbody>
        </table>
      </div>
    </section>
  );
};

export default Showinvestments;
