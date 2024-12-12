import React, { useEffect, useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";
import { getAccessToken } from "../utils/utils";
import { getInvestments } from "../features/poolSlice";
import { useDispatch, useSelector } from "react-redux";
import Showinvestments from "../components/invest/Showinvestments";

const styles = {
  invest: "flex flex-col gap-4",
  button:
    "px-6 py-2 rounded-sm text-white capitalize flex items-center gap-1 text-sm font-medium",
};

const Pools = ({ setActive }) => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const { investments } = useSelector((state) => state.pool);

  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    if (accessToken) {
      dispatch(getInvestments());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    document.title = "Finance Hedge - Invest Pools";
    setActive("pools");

    if (investments && investments.length > 0) {
      const totalInvested = investments.reduce(
        (acc, investment) => acc + (investment.amount || 0),
        0
      );
      const totalYield = investments.reduce(
        (acc, investment) => acc + (investment.profit || 0),
        0
      );

      setTotalInvestment(totalInvested);
      setTotalProfit(totalYield);
    }
  }, [investments, setActive]);

  return (
    <section className="w-full p-6 font-[Poppins] bg-slate-100 h-full overflow-auto">
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
              <p className="font-semibold text-xl text-green-600">
                ${totalInvestment.toFixed(2)}
              </p>
              <Link to={"/invest"} className={`bg-slate-950 ${styles.button}`}>
                stake <MdArrowForward />
              </Link>
            </span>
            <span className={`${styles.invest} flex justify-end items-end`}>
              <h3 className="font-semibold text-sm">total profit</h3>
              <p className="font-semibold text-xl text-green-600">
                ${totalProfit.toFixed(2)}
              </p>
              <Link
                to={"/withdraw"}
                className={`bg-green-600 ${styles.button}`}
              >
                withdraw <MdArrowForward />
              </Link>
            </span>
          </div>
          <div className="md:col-span-2 bg-white flex items-center justify-center shadow-sm rounded-sm p-6 w-full h-[160px]">
            <h3 className="text-xl md:text-3xl font-medium capitalize">
              {investments && investments.length
                ? `${investments.length} open positions`
                : " No Investment found yet"}
            </h3>
          </div>
        </div>
        <div className="mb-24">
          <span className="flex justify-between items-center p-6">
            <h3 className="font-semibold capitalize">
              active pools {`(${investments && investments.length})`}
            </h3>
            <small className="text-green-600 underline capitalize flex items-center cursor-pointer">
              view all <MdArrowForward />
            </small>
          </span>
          <div className="flex  flex-col gap-6 bg-white">
            {investments && investments.length > 0 ? (
              <Showinvestments data={investments} />
            ) : (
              <p>No data found</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pools;
