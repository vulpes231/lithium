import React, { useEffect } from "react";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";

const styles = {
  invest: "flex flex-col gap-4",
  button:
    "px-6 py-2 rounded-sm text-white capitalize flex items-center gap-1 text-sm font-medium",
};

const Pools = ({ setActive }) => {
  useEffect(() => {
    setActive("pools");
  }, []);

  return (
    <section className="w-full p-6 font-[Poppins] bg-slate-100 h-full">
      <div className="flex flex-col gap-6">
        <span className="flex flex-col gap-1">
          <p className="font-light text-sm">Investments</p>
          <h3 className="font-bold text-2xl md:text-3xl capitalize">
            my pools
          </h3>
        </span>
        <div className="flex flex-col md:flex-row items-center gap-6 w-full ">
          <div className="flex justify-between items-center bg-white p-6 shadow-sm rounded-sm w-full h-[160px] capitalize lg:w-[65%]">
            <span className={`${styles.invest} `}>
              <h3 className="font-semibold text-sm">total invest</h3>
              <p className="font-semibold text-xl text-green-600">$0.00</p>
              <Link to={"/plan"} className={`bg-slate-950 ${styles.button}`}>
                stake <MdArrowForward />
              </Link>
            </span>
            <span className={`${styles.invest} flex justify-end items-end`}>
              <h3 className="font-semibold text-sm">total profit</h3>
              <p className="font-semibold text-xl text-green-600">$0.00</p>
              <Link className={`bg-green-600 ${styles.button}`}>
                withdraw <MdArrowForward />
              </Link>
            </span>
          </div>
          <div className="md:col-span-2 bg-white flex items-center justify-center shadow-sm rounded-sm p-6 w-full h-[160px]">
            <h3 className="text-xl md:text-3xl font-medium capitalize">
              No Investment found yet
            </h3>
          </div>
        </div>
        <div className="">
          <span className="flex justify-between items-center p-6">
            <h3 className="font-semibold capitalize">active pools (0)</h3>
            <small className="text-green-600 underline capitalize flex items-center">
              view all <MdArrowForward />
            </small>
          </span>
          <div className="bg-white p-6 flex items-center justify-center">
            <p>No data found</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pools;
