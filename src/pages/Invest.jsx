import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../utils/utils";
import { getPlans } from "../features/poolSlice";

const styles = {
  span: "flex items-center justify-between",
};

const Invest = ({ setActive }) => {
  const dispatch = useDispatch();
  const { plans, investLoading, investError, investSuccess } = useSelector(
    (state) => state.pool
  );

  // console.log(plans);
  const myPlans =
    plans &&
    plans.map((plan) => {
      return (
        <div
          className="bg-white shadow-sm p-6 w-full md:w-[320px] flex flex-col gap-10 rounded-sm text-slate-800"
          key={plan._id}
        >
          <div className="flex flex-col items-start justify-center gap-6">
            <span className="flex flex-col items-center justify-center w-full">
              <h3 className="capitalize font-bold text-xl">{plan.plan}</h3>
              <small>Total {plan.roi}% ROI</small>
            </span>
            <span className="flex flex-col items-center justify-center w-full">
              <h1 className="text-5xl font-semibold">
                {parseFloat(plan.yield).toFixed(2)}%
              </h1>
              <small>EVERY DAY FOR 7 day</small>
            </span>
          </div>
          <div className="font-light flex flex-col gap-3 text-sm">
            <span className={styles.span}>
              <p>Investment</p>
              <p>
                ${parseFloat(plan.minAmount).toFixed(2)} - $
                {parseFloat(plan.maxAmount).toFixed(2)}
              </p>
            </span>
            <span className={styles.span}>
              <p>Max. Earn</p>
              <p>{parseFloat(plan.maxEarnings).toFixed(2)} USD</p>
            </span>
            <span className={styles.span}>
              <p>Total Return</p>
              <p>Capital +{parseFloat(plan.totalReturns)}%</p>
            </span>
          </div>
          <button
            onClick={(e) => handleSubmit(e, plan._id)}
            className="bg-green-600 text-white capitalize p-2 rounded-3xl font-semibold"
          >
            Invest now
          </button>
        </div>
      );
    });

  const handleSubmit = (e, data) => {
    e.preventDefault();
    console.log(data);
  };

  const accesstoken = getAccessToken();
  useEffect(() => {
    if (accesstoken) {
      dispatch(getPlans());
    }
  }, [accesstoken, dispatch]);

  useEffect(() => {
    setActive("pools");
  }, []);

  return (
    <section className="w-full p-6 font-[Poppins] bg-slate-100 h-full overflow-auto">
      <div className="flex flex-col gap-6">
        <h3 className="font-bold text-2xl md:text-3xl capitalize">
          investment plans
        </h3>
        <div className="flex flex-col md:flex-row gap-6 mb-24">{myPlans}</div>
      </div>
    </section>
  );
};

export default Invest;
