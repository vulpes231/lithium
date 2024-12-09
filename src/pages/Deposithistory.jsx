import React, { useEffect, useState } from "react";
import { MdArrowBack, MdLocalDining } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatNumber, getAccessToken } from "../utils/utils";
import { getUserTrnxs } from "../features/trnxSlice";
import { btc, usdt } from "../assets";

const styler = {
  th: "px-5 py-1.5",
};

const Deposithistory = ({ setActive }) => {
  const dispatch = useDispatch();
  const { userTrnxs } = useSelector((state) => state.trnx);
  const accessToken = getAccessToken();

  const deposits =
    (userTrnxs &&
      userTrnxs.filter((trnx) => trnx.transactionType.includes("deposit"))) ||
    [];

  const myDeposits =
    deposits &&
    deposits.map((trnx) => {
      // console.log(trnx);
      return (
        <div
          key={trnx._id}
          className="bg-white flex justify-between p-4 items-center border rounded-sm"
        >
          <span className="flex items-center gap-3">
            <img
              src={trnx.gateway === "bitcoin" ? btc : usdt}
              alt=""
              className="w-[25px]"
            />
            <span>
              <p className="capitalize font-medium text-xs whitespace-nowrap">
                {trnx.gateway === "bitcoin"
                  ? trnx.gateway
                  : "USDT (BEP20 and ERC20)"}
              </p>
              <small className="font-light text-xs">{trnx.timeStamp}</small>
            </span>
          </span>
          <span className="font-medium text-sm hidden sm:flex">
            {trnx.desc}
          </span>
          <span
            className={`${
              trnx.status[0] === "pending"
                ? "bg-yellow-500"
                : trnx.status[0] === "completed"
                ? "bg-green-500"
                : "bg-red-500"
            } text-xs hidden md:flex capitalize py-1 px-3 rounded-3xl text-white `}
          >
            {trnx.status[0]}
          </span>
          <span className="font-medium text-sm">{`${formatNumber(
            trnx.amount
          )} USD`}</span>
        </div>
      );
    });

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserTrnxs());
    }
  }, [accessToken]);

  useEffect(() => {
    setActive("deposit");
  }, []);
  return (
    <section className="bg-slate-100 h-full lg:p-10 overflow-auto text-slate-700">
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
        <div className=" p-6 rounded-sm  flex flex-col">
          {!userTrnxs ? <p> Data not found.</p> : myDeposits}
        </div>
      </div>
    </section>
  );
};

export default Deposithistory;
