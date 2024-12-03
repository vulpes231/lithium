import React, { useEffect, useState } from "react";

import { getAccessToken } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/userSlice";
import { getUserWallet } from "../features/walletSlice";
import { getBtcData } from "../features/coinSlice";
import { depositFunds } from "../features/trnxSlice";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const styles = {
  formHolder: "flex flex-col gap-1",
};

const Withdraw = ({ setActive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const { user } = useSelector((state) => state.user);
  // console.log(user);
  const { userWallet } = useSelector((state) => state.wallet);
  const { btcData } = useSelector((state) => state.coin);

  const [form, setForm] = useState({
    amount: "",
    gateway: "",
  });

  const [copy, setCopy] = useState(false);

  const fee = 0.024 * form.amount || `0.00`;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const coinAmount = form.amount / btcData?.bitcoin?.usd;

  const copyToClipboard = (e) => {
    e.preventDefault();
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

  const handleWithdraw = (e) => {
    e.preventDefault();
    const data = {
      amount: form.amount,
      address: userWallet?.address,
      coinType: "bitcoin",
    };
    dispatch(depositFunds(data));
  };

  useEffect(() => {
    let timeout;
    if (copy) {
      timeout = 3000;
      setTimeout(() => {
        setCopy(false);
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [copy]);

  useEffect(() => {
    document.title = "Finance Hedge - Withdraw";
    if (accessToken) {
      dispatch(getUser());
      dispatch(getUserWallet());
      dispatch(getBtcData());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    setActive("withdraw");
    if (!user.isKycVerified) {
      navigate("/kycverification");
    }
  }, []);
  return (
    <section className="bg-slate-100 h-full p-6 overflow-auto text-slate-700">
      <div className="w-full md:max-w-[60%] md:mx-auto mb-24 flex flex-col gap-6">
        <div className="flex flex-col gap-5">
          <h3 className="font-semibold text-xl md:text-2xl capitalize">
            Withdraw funds
          </h3>
          <p className="font-light text-sm">
            Withdraw funds using our system gateway with low fees.
          </p>
          <div className="flex justify-end">
            <Link
              to={"/history"}
              className="bg-slate-950 flex items-center gap-1 text-white capitalize px-4 py-2 rounded-md shadow-md text-sm font-medium"
            >
              <MdArrowBack /> Withdraw history
            </Link>
          </div>
        </div>
        <div className="bg-white p-6 shadow-sm rounded-sm">
          <form action="" className="flex flex-col gap-3">
            <div className={styles.formHolder}>
              <label htmlFor="">
                select account <span className="text-red-500">*</span>
              </label>
              <select
                name="gateway"
                className="bg-transparent p-2 border capitalize"
                onChange={handleInput}
                value={form.gateway}
              >
                <option value="">select one</option>
                {userWallet &&
                  userWallet.map((wallet) => {
                    return (
                      <option key={wallet._id} value={wallet.name}>
                        {wallet.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className={styles.formHolder}>
              <label htmlFor="">
                amount <span className="text-red-500">*</span>
              </label>
              <span className="flex items-center border p-2 ">
                <input
                  type="number"
                  className="w-full outline-none "
                  value={form.amount}
                  name="amount"
                  onChange={handleInput}
                />
                <span className="w-[30px]">USD</span>
              </span>
            </div>
            <div className="py-5">
              {form.gateway && (
                <div className="capitalize border text-sm">
                  <span className="flex justify-between items-center py-4 px-2 border-b">
                    <small>limit</small>
                    <small>250.00 USD - 1,000,000.00 USD</small>
                  </span>
                  <span className="flex justify-between items-center py-4 px-2 border-b">
                    <small>charge</small>
                    <small>0.00 USD</small>
                  </span>
                  <span className="flex justify-between items-center py-4 px-2 border-b">
                    <small>payable</small>
                    <small>
                      {form.amount && parseFloat(form.amount).toFixed(2)} USD
                    </small>
                  </span>
                  <span className="flex justify-between items-center py-4 px-2 border-b font-bold">
                    <small>conversion rate</small>
                    <small>
                      1 USD = 1 {form.gateway === "bitcoin" ? "BTC" : "USDT"}
                    </small>
                  </span>
                  <span className="flex justify-between items-center py-4 px-2 border-b font-bold">
                    <small>
                      in {form.gateway === "bitcoin" ? "BTC" : "USDT"}
                    </small>
                    <small>
                      {form.gateway === "usdt"
                        ? parseFloat(form.amount).toFixed(2)
                        : form.gateway === "bitcoin "
                        ? "0"
                        : "0.00"}
                    </small>
                  </span>
                </div>
              )}
            </div>
            <button className="p-2 bg-green-600 text-white capitalize">
              submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Withdraw;
