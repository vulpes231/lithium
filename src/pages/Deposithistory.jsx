import React, { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const styler = {
  th: "px-5 py-1.5",
};

const Deposithistory = ({ setActive }) => {
  const { userTrnxs } = useSelector((state) => state.trnx);

  // Filter only withdrawals
  const deposits =
    userTrnxs?.filter((trnx) => trnx.transactionType.includes("deposit")) || [];

  useEffect(() => {
    setActive("deposit");
  }, []);
  return (
    <section className="bg-slate-100 h-full py-6 px-6 lg:px-10 overflow-auto text-slate-700">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-xl md:text-2xl capitalize">
            Deposit History
          </h3>
          <Link
            to={"/deposit"}
            className="bg-slate-950 flex items-center gap-1 text-white capitalize px-4 py-2 rounded-md shadow-md text-sm font-medium"
          >
            <MdArrowBack />
            Deposit now
          </Link>
        </div>
        <div className="bg-white p-6 rounded-sm shadow-sm flex items-center justify-center">
          <p> Data not found.</p>
        </div>
      </div>
    </section>
  );
};

export default Deposithistory;
