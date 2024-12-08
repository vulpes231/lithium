import React, { useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { formatNumber, getAccessToken } from "../utils/utils";
import { getUserTrnxs } from "../features/trnxSlice";
import { useDispatch, useSelector } from "react-redux";
import { btc, usdt } from "../assets";

const styles = {
  select: "bg-white text-slate-500",
};

const Transactions = ({ setActive }) => {
  const dispatch = useDispatch();
  const { userTrnxs } = useSelector((state) => state.trnx);
  const accessToken = getAccessToken();

  const myTrnxs =
    userTrnxs &&
    userTrnxs.map((trnx) => {
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
    document.title = "Finance Hedge - Transactions";
    setActive("transactions");
  }, []);
  return (
    <section className="bg-slate-100 text-slate-700 h-full p-6 overflow-auto">
      <div className="flex flex-col gap-6">
        <div>
          <small>Transactions</small>
          <h3 className="font-semibold text-xl md:text-2xl capitalize">
            my transaction history
          </h3>
        </div>
        <hr />
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="relative flex flex-col bg-white capitalize p-2 border">
            <label htmlFor="" className="font-light text-xs">
              transaction number
            </label>
            <input
              type="text"
              placeholder="transaction number"
              className="placeholder:capitalize outline-none"
            />
            <MdSearch className="absolute top-0 right-0" />
          </div>
          <div className="flex gap-6">
            <div className="bg-white p-2 border flex flex-col w-full">
              <label htmlFor="" className="font-light text-xs">
                wallet
              </label>
              <select className={styles.select} name="" id="">
                <option value="all">All</option>
                <option value="deposit">Deposit Wallet</option>
                <option value="interest">Interest Wallet</option>
              </select>
            </div>

            <div className="bg-white p-2 border flex flex-col w-full">
              <label htmlFor="" className="font-light text-xs">
                transaction type
              </label>
              <select className={styles.select} name="" id="">
                <option value="all">All</option>
                <option value="credit">credit</option>
                <option value="debit">debit</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-2 border flex flex-col w-full">
            <label htmlFor="" className="font-light text-xs">
              remark
            </label>
            <select className={styles.select} name="" id="">
              <option value="all">Any</option>
            </select>
          </div>
        </div>
        <div className="rounded-sm  flex flex-col">
          {!userTrnxs ? <p> Data not found.</p> : myTrnxs}
        </div>
      </div>
    </section>
  );
};

export default Transactions;
