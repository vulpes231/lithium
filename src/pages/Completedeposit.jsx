import React, { useEffect, useState } from "react";
import { MdCopyAll, MdWallet } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { formatNumber } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { depositFunds, resetDeposit } from "../features/trnxSlice";

const customAddress = [
  {
    id: 1,
    address: "2fa3289230sahgjsaksajjkakhaas",
    network: "btc",
  },
  {
    id: 2,
    address: "0xab6db5Eb6BDcA184Cb13D697D0dE377D3f0F023A",
    network: "erc20",
  },
];

const Completedeposit = ({ setActive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gateway, amount } = useParams();
  const [copy, setCopy] = useState(false);
  const [error, setError] = useState("");

  const { depositLoading, depositError, depositSuccess } = useSelector(
    (state) => state.trnx
  );

  console.log(depositLoading);

  const copyToClipboard = (e, gateway) => {
    e.preventDefault();

    const textToCopy =
      gateway === "bitcoin"
        ? customAddress[0].address
        : customAddress[1].address;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopy(true);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      amount: amount,
      gateway: gateway,
    };
    dispatch(depositFunds(data));
  };

  useEffect(() => {
    let timeout;
    if (depositSuccess) {
      timeout = 3000;
      setTimeout(() => {
        dispatch(resetDeposit());
        navigate("/history");
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [depositSuccess]);

  useEffect(() => {
    let timeout;
    if (copy) {
      timeout = setTimeout(() => {
        setCopy(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [copy]);

  useEffect(() => {
    if (depositError) {
      setError(depositError);
    }
  }, [depositError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    setActive("deposit");
  }, [setActive]);

  return (
    <section className="bg-slate-100 h-full p-6 overflow-auto text-slate-700">
      <div className=" flex flex-col gap-6 w-full lg:w-[700px] lg:mx-auto">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-xl md:text-2xl capitalize">
            deposit confirmation
          </h3>
          <p className="text-xs font-light w-full md:w-[90%]">
            Send the deposit amount to the wallet address provided then proceed
            to confirm your payment. After verifying your deposit the amount
            will be credited into your deposit wallet.
          </p>
        </div>
        <div className="bg-white ">
          <span className="flex items-center w-full justify-center p-4 gap-2">
            <MdWallet className="text-2xl" />
            <p className="font-semibold text-lg capitalize ">{gateway}</p>
          </span>
          <hr />
          <div className="p-8 flex flex-col gap-6 justify-center items-center text-center">
            <p className="text-xs font-light">
              You have requested{" "}
              <span className="text-green-600">{formatNumber(amount)} USD</span>
              , please make sure to pay the complete amount otherwise payment
              will not be successful
            </p>
            <figure>
              <img src="" alt="wallet-address-qr-code" />
            </figure>
            <div className=" flex items-center gap-1 w-full">
              <input
                type="text"
                placeholder={
                  gateway === "bitcoin"
                    ? customAddress[0].address
                    : customAddress[1].address
                }
                readOnly
                className="w-full border p-2"
              />
              <button
                onClick={(e) => copyToClipboard(e, gateway)}
                className="bg-zinc-200 flex items-center gap-1 p-2"
              >
                <MdCopyAll />
                {!copy ? "Copy" : "Copied"}
              </button>
            </div>
            <div className="bg-green-50 p-2 rounded-sm text-xs font-light text-left flex flex-col gap-2">
              <p>
                Always double check the wallet address to avoid accidentally
                sending funds to the wrong address. Never copy and paste address
                from your transaction history.
              </p>
              <p>
                Transaction will fail automatically if the complete amount is
                not sent.
              </p>
            </div>
          </div>

          <div className="flex p-6 mb-5">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white p-2 rounded-3xl w-full hover:bg-green-700"
            >
              {!depositLoading ? " Mark Paid" : "Wait..."}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Completedeposit;
