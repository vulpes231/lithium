import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { formatNumber, getAccessToken } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getUserWallet } from "../../features/walletSlice";

const initialState = {
  wallet: "",
  amount: "",
  planId: "",
};

const Investmodal = ({ data, close }) => {
  const dispatch = useDispatch();
  const { userWallet } = useSelector((state) => state.wallet);

  const accessToken = getAccessToken();

  // Correct useState hook usage
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const investData = {
      wallet: form.wallet,
      amount: form.amount,
      planId: data._id,
    };

    if (form.amount < data.minAmount) {
      setError(`Minimum amount is ${formatNumber(data.minAmount)} USD`);
    }
  };

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = 3000;
      setTimeout(() => {
        setError("");
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserWallet());
    }
  }, [accessToken]);

  return (
    <section className="w-full h-full absolute left-0 top-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full md:w-[400px] md:mx-auto bg-white shadow-lg rounded-md">
        <span className="flex items-center justify-between p-6">
          <h3 className="font-semibold capitalize">
            confirm to invest <span>{data?.plan}</span>
          </h3>
          <MdClose
            className="cursor-pointer w-6 h-6 "
            onClick={() => close(false)}
          />
        </span>
        <hr />
        <div className="p-6 flex flex-col gap-4">
          <span className="flex items-center justify-center w-full flex-col">
            <p>
              Invest ${formatNumber(data?.minAmount)} - $
              {formatNumber(data?.maxAmount)}
            </p>
            <small>Interest: {data?.yield}%</small>
            <small>Every day for 7 days</small>
          </span>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="">select wallet</label>
            <select
              name="wallet"
              className="border outline-none bg-white p-2 capitalize focus:outline-green-600 focus:border-none text-sm"
              onChange={handleInput}
              value={form.wallet}
            >
              <option value="">select wallet</option>
              {userWallet &&
                userWallet.map((wallet) => {
                  return (
                    <option key={wallet._id} value={wallet.walletName}>{`${
                      wallet.walletName
                    } - ${formatNumber(wallet.balance)} USD`}</option>
                  );
                })}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">invest amount</label>
            <span className="w-full flex items-center">
              <input
                type="text"
                name="amount"
                className="outline-none border bg-white p-2 capitalize focus:outline-green-600 focus:border-none focus:py-1.5 focus:px-2"
                onChange={handleInput}
                value={form.amount}
              />
              <span className="p-2 border bg-zinc-300">USD</span>
            </span>
          </div>
          {error && <p className="text-xs font-medium text-red-500">{error}</p>}
        </div>

        <hr />
        <div className="flex items-center justify-end p-6 gap-2 ">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white p-2 w-[60px] capitalize"
          >
            yes
          </button>
          <button
            onClick={() => close(false)}
            className="bg-black text-white p-2 w-[60px] capitalize"
          >
            no
          </button>
        </div>
      </div>
    </section>
  );
};

export default Investmodal;
