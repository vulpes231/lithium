import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utils";
import { getUserWallet } from "../features/walletSlice";
import { pay } from "../assets";
import { getBtcData } from "../features/coinSlice";

const Fee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userWallet } = useSelector((state) => state.wallet);
  const { btcData } = useSelector((state) => state.coin);
  const { fee } = useParams();
  const [copy, setCopy] = useState(false);

  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserWallet());
      dispatch(getBtcData());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/withdraw");
    }, 60 * 60 * 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const btcAmount = fee / btcData?.bitcoin?.usd;

  const copyToClipboard = () => {
    const textToCopy = userWallet?.address;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopy(true);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
    let timeout;
    if (copy) {
      timeout = setTimeout(() => {
        setCopy(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [copy]);

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center gap-6 bg-white shadow-lg rounded-lg p-6 md:max-w-lg w-full">
        <h3 className="text-xl font-semibold text-center text-gray-800">
          Withdrawal Fee
        </h3>
        <p className="text-center text-sm flex flex-col gap-2 text-gray-600">
          You are to pay a fee of{" "}
          <span className="font-medium text-green-500">${fee}</span> to complete
          your withdrawal.
          <span className="flex flex-col">
            <span className="font-medium text-base text-gray-800">
              {userWallet?.address}
            </span>
            {copy && (
              <p className="text-green-500 bg-green-100 p-2 rounded-lg mt-2">
                Address copied to clipboard!
              </p>
            )}
            <button
              className="mt-2 p-2 bg-slate-300 rounded-md hover:bg-slate-400 transition"
              onClick={copyToClipboard}
            >
              Copy Address
            </button>
          </span>
        </p>
        <div className="flex items-center gap-1">
          <small className="text-gray-700">Coin amount:</small>
          <small className="bg-slate-200 p-1 rounded-lg">
            {btcAmount?.toFixed(6)} BTC
          </small>
        </div>
        <img
          src={pay}
          alt="Payment"
          className="w-1/2 md:w-1/3 lg:w-1/4 mx-auto"
        />
        <button className="bg-yellow-600 text-white py-2.5 px-5 w-full rounded-md hover:bg-yellow-500 transition">
          Paid
        </button>
        <small className="text-gray-500 text-xs text-center">
          This payment page will expire in 1 hour.
        </small>
      </div>
    </section>
  );
};

export default Fee;
