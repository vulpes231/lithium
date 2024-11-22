import React from "react";
import { Link } from "react-router-dom";

const Walletinfo = () => {
  return (
    <div className="capitalize flex flex-col gap-4">
      <h5 className="uppercase font-medium text-xs text-slate-600">
        account balance
      </h5>
      <h5 className="text-green-500 font-medium">
        10.00 <span className="text-sm font-light">USD (deposit wallet)</span>
      </h5>
      <h5 className=" font-medium">
        0.00{" "}
        <span className="text-sm font-light text-slate-600">
          USD (investment wallet)
        </span>
      </h5>
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
