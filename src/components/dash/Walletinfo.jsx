import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAccessToken } from "../../utils/utils";
import { getUserWallet } from "../../features/walletSlice";

const Walletinfo = () => {
  const dispatch = useDispatch();
  const { userWallet, getWalletLoading } = useSelector((state) => state.wallet);
  const accessToken = getAccessToken();

  // console.log(userWallet);

  const myWallets =
    userWallet &&
    userWallet.map((wallet, index) => {
      return (
        <div
          key={wallet._id}
          className={` flex gap-2 items-center ${
            index === 0 ? "text-green-500 font-medium" : "text-sm font-light"
          }`}
        >
          <h3 className="">{parseFloat(wallet.balance).toFixed(2)} USD</h3>
          <span className="">{` (${wallet.walletName})`}</span>
        </div>
      );
    });

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserWallet());
    }
  }, [accessToken]);
  return (
    <div className="capitalize flex flex-col gap-4">
      <h5 className="uppercase font-medium text-xs text-slate-600">
        account balance
      </h5>
      {getWalletLoading ? (
        <p className="h-[50px]">Fetching Wallets...</p>
      ) : (
        myWallets
      )}
      <span className="flex gap-4 items-center text-sm">
        <Link className="bg-green-600 text-white px-6 py-2 rounded-sm">
          deposit
        </Link>
        <Link className="bg-slate-900 text-white px-6 py-2 rounded-sm">
          withdraw
        </Link>
      </span>
    </div>
  );
};

export default Walletinfo;
