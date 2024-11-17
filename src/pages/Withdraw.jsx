import React, { useEffect, useState } from "react";
import { Sidebar, Withrawhistory } from "../components";
import { TbPigMoney } from "react-icons/tb";
import { IoWalletOutline } from "react-icons/io5";
import { getAccessToken } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/userSlice";
import { getUserWallet } from "../features/walletSlice";
import { getBtcData } from "../features/coinSlice";
import { resetWithdraw, withdrawFunds } from "../features/trnxSlice";
import { useNavigate } from "react-router-dom";

const styler = {
  input:
    "border outline-none focus:border-none focus:outline-yellow-500 p-2 placeholder:text-sm placeholder:font-thin",
  div: "flex flex-col gap-1",
  label: "capitalize font-medium text-sm",
  para: " capitalize px-1",
  span: "flex items-center gap-1",
  icon: "w-10 h-10 p-1.5 rounded-full",
};

const Withdraw = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const { user } = useSelector((state) => state.user);
  const { userWallet } = useSelector((state) => state.wallet);
  const { btcData } = useSelector((state) => state.coin);

  const [form, setForm] = useState({
    amount: "",
    walletAddress: "",
    pin: "",
  });

  const [error, setError] = useState(false);
  const [trnxFee, setTrnxFee] = useState(false);

  const { withdrawError, withdrawLoading, withdrawSuccess } = useSelector(
    (state) => state.trnx
  );

  const fee = 0.024 * form.amount || 0;
  const coinAmount = form.amount / btcData?.bitcoin?.usd;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log("withdrawing");
    e.preventDefault();
    const data = {
      walletAddress: form.walletAddress,
      pin: form.pin,
      amount: form.amount,
      coinType: "bitcoin",
    };
    console.log(data);
    dispatch(withdrawFunds(data));
    setTrnxFee(fee);
  };

  useEffect(() => {
    document.title = "CoinXtra - Withdraw";
    if (accessToken) {
      dispatch(getUser());
      dispatch(getUserWallet());
      dispatch(getBtcData());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (withdrawError) {
      setError(withdrawError);
    }
  }, [withdrawError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = 2000;
      setTimeout(() => {
        dispatch(resetWithdraw());
        setError(false);
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [error, dispatch]);

  useEffect(() => {
    let timeout;
    if (withdrawSuccess) {
      timeout = 2000;
      setTimeout(() => {
        dispatch(resetWithdraw());
        navigate(`/complete/${trnxFee}`);
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [withdrawSuccess, dispatch]);

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(userWallet?.balance);

  return (
    <section className="min-h-screen bg-slate-100 w-full">
      <div className="flex min-h-full mt-[66px]">
        <Sidebar />
        <div className=" w-full lg:w-[80%] min-h-screen lg:customh gap-6 flex flex-col md:flex-row font-[Poppins] p-4">
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1 p-4 bg-white rounded-xl shadow-lg">
              <span className={styler.span}>
                <TbPigMoney
                  className={`${styler.icon} bg-green-100 text-green-500`}
                />
                <p
                  className={`${styler.para} whitespace-nowrap text-xs md:text-sm`}
                >
                  available balance:{" "}
                  <span className="font-semibold md:font-bold ">
                    ${formattedBalance}
                  </span>
                </p>
              </span>
              <span className={styler.span}>
                <IoWalletOutline
                  className={`${styler.icon} bg-yellow-100 text-yellow-500`}
                />
                <p
                  className={`${styler.para} whitespace-nowrap text-xs md:text-sm`}
                >
                  linked address: <span className="">{user?.bindAddress}</span>{" "}
                </p>
              </span>
            </div>
            <form
              action=""
              className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="border-l-4 border-yellow-500 px-1 font-bold">
                Withdraw
              </h3>
              <div className={styler.div}>
                <label className={styler.label} htmlFor="">
                  from
                </label>
                <select
                  name="fromWallet"
                  onChange={handleInput}
                  value={form.fromWallet}
                  className={`${styler.input} bg-white`}
                >
                  <option value="">choose account</option>
                  {userWallet && (
                    <option value={userWallet._id}>
                      {`Balance: $${formattedBalance}`}
                    </option>
                  )}
                </select>
              </div>
              <div className={styler.div}>
                <label className={styler.label} htmlFor="">
                  receiving wallet address
                </label>
                <input
                  type="text"
                  placeholder="Wallet address"
                  className={styler.input}
                  onChange={handleInput}
                  value={form.address}
                  name="address"
                />
              </div>
              <div className={styler.div}>
                <label className={styler.label} htmlFor="">
                  amount
                </label>
                <input
                  type="text"
                  placeholder="Withdrawal amount"
                  className={styler.input}
                  onChange={handleInput}
                  value={form.amount}
                  name="amount"
                />
              </div>
              <div className={styler.div}>
                <label className={styler.label} htmlFor="">
                  pin
                </label>
                <input
                  type="password"
                  placeholder="pin"
                  className={styler.input}
                  onChange={handleInput}
                  value={form.pin}
                  name="pin"
                />
              </div>
              <div className="flex justify-between items-center capitalize text-xs font-medium text-slate-400">
                <span>fees: ${fee.toFixed(2)}</span>
                <span>Coin amount: {coinAmount?.toFixed(4) || 0} BTC</span>
              </div>
              {withdrawSuccess && (
                <p className="text-green-500">Withdrawal pending.</p>
              )}
              <button
                onClick={handleSubmit}
                className="text-white bg-yellow-500 border-none p-2 mt-5 font-bold uppercase"
              >
                {!withdrawLoading ? " request withdrawal" : "processing..."}
              </button>
            </form>
          </div>
          <div className="w-full ">
            <Withrawhistory />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Withdraw;
