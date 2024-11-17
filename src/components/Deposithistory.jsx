import React, { useState } from "react";
import { useSelector } from "react-redux";

const styler = {
  th: "px-5 py-1.5",
};

const Deposithistory = () => {
  const { userTrnxs } = useSelector((state) => state.trnx);

  // Filter only withdrawals
  const deposits =
    userTrnxs?.filter((trnx) => trnx.transactionType.includes("deposit")) || [];

  return (
    <div className="overflow-auto bg-white h-[350px] md:h-[480px] p-4 flex flex-col gap-4 rounded-xl shadow-lg">
      <h3 className="border-l-4 border-yellow-500 px-1 font-bold">
        Deposit History
      </h3>
      <table className="min-w-full">
        <thead>
          <tr className="text-left capitalize font-semibold bg-slate-500 text-white">
            <th className={styler.th}>type</th>
            <th className={styler.th}>amount</th>
            <th className={styler.th}>status</th>
          </tr>
        </thead>
        <tbody>
          {!deposits.length ? (
            <tr>
              <td colSpan={3} className="text-center p-4">
                You have no deposit history.
              </td>
            </tr>
          ) : (
            deposits.map((trnx, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 !== 0 ? "bg-slate-100" : " bg-slate-200"
                } capitalize text-xs font-[Poppins]`}
              >
                <td className={styler.th}>{trnx.transactionType[0]}</td>
                <td className={`${styler.th} text-green-500`}>
                  $
                  {new Intl.NumberFormat("en-US", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(trnx?.amount)}
                </td>
                <td
                  className={`${styler.th} ${
                    trnx.status == "pending"
                      ? "text-yellow-500 "
                      : "text-green-500"
                  }`}
                >
                  {trnx.status}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Deposithistory;
