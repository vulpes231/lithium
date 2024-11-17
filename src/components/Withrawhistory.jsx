import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../utils/utils";
import { getUserTrnxs } from "../features/trnxSlice";

const styler = {
  th: "px-5 py-2.5",
};

const WithdrawHistory = () => {
  const dispatch = useDispatch();
  const { userTrnxs } = useSelector((state) => state.trnx);
  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserTrnxs());
    }
  }, [accessToken, dispatch]);

  // Filter only withdrawals
  const withdrawals =
    userTrnxs?.filter((trnx) => trnx.transactionType.includes("withdrawal")) ||
    [];

  return (
    <div className="overflow-auto bg-white h-[528px] p-4 flex flex-col gap-4 rounded-xl shadow-lg">
      <h3 className="border-l-4 border-yellow-500 px-1 font-bold">
        Withdraw History
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
          {withdrawals.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center p-4">
                You have no withdrawal history.
              </td>
            </tr>
          ) : (
            withdrawals.map((trnx, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 !== 0 ? "bg-slate-100" : " bg-slate-200"
                } capitalize text-xs font-[Poppins]`}
              >
                <td className={styler.th}>{trnx.transactionType[0]}</td>
                <td className={`${styler.th} text-red-500`}>
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
                      : trnx.status == "failed"
                      ? "text-red-500 "
                      : "text-green-500"
                  }`}
                >
                  {trnx.status[0]}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawHistory;
