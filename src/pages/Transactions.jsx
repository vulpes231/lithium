import React, { useEffect } from "react";
import { MdSearch } from "react-icons/md";

const styles = {
  select: "bg-white text-slate-500",
};

const Transactions = ({ setActive }) => {
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
        <div className="bg-white w-full flex item-center justify-center p-6 border mb-24">
          <p>No data found </p>
        </div>
      </div>
    </section>
  );
};

export default Transactions;
