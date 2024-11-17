import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../utils/utils";
import { getUserWallet } from "../features/walletSlice";
import { btc } from "../assets";
import { getBtcData } from "../features/coinSlice";
import { FaWallet } from "react-icons/fa6";

const Dashwallet = () => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const { userWallet } = useSelector((state) => state.wallet);
  const { btcData } = useSelector((state) => state.coin);

  // console.log(btcData);

  const coinAmount = userWallet?.balance / btcData?.bitcoin?.usd || 0;

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserWallet());
      dispatch(getBtcData());
    }
  }, [accessToken, dispatch]);

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(userWallet?.balance);

  const formattedBtcPrice = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(btcData?.bitcoin?.usd);

  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-4 font-[Poppins]">
      <div className="bg-white w-full p-6 rounded-xl shadow-lg flex flex-col gap-4">
        <small className="font-medium uppercase text-lg">Assets</small>
        <div className="flex justify-between items-center">
          <div>
            <span className="flex gap-2 items-center">
              <img src={btc} alt="" width={25} />
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-2">
                  <p className="text-md font-semibold">BTC</p>
                  <p className="capitalize text-xs font-light bg-slate-200 py-1 px-2 rounded-lg">
                    {userWallet?.coinType}
                  </p>
                </span>
                <small className="text-xs font-light">
                  ${formattedBtcPrice}
                </small>
              </div>
            </span>
          </div>
          <span className="flex flex-col gap-1">
            <p className="text-md font-semibold"> {coinAmount?.toFixed(6)} </p>
            <small className="text-xs font-light">${formattedBalance}</small>
          </span>
        </div>
      </div>

      <span className="bg-white w-full p-6 rounded-xl shadow-lg flex flex-col gap-4">
        <small className="font-medium uppercase text-lg">
          available balance
        </small>
        <span className="flex gap-2 items-center">
          <FaWallet className="w-8 h-8 p-2 bg-green-200 text-green-500 rounded-full" />
          <p className="text-md font-semibold">${formattedBalance}</p>
        </span>
      </span>
    </div>
  );
};

export default Dashwallet;
