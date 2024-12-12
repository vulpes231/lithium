import React from "react";
import { Link } from "react-router-dom";
import { HiMiniDocumentCheck } from "react-icons/hi2";
import { GoPasskeyFill } from "react-icons/go";

const Notifications = ({ user }) => {
  return (
    <div className="flex flex-col gap-6 text-slate-800">
      <div
        className={` ${
          !user.twofa ? "flex" : "hidden"
        } border border-yellow-500 p-4 rounded-lg flex flex-col md:flex-row md:items-center gap-4 bg-white`}
      >
        <GoPasskeyFill className="w-6 h-6 text-yellow-500" />
        <span>
          <h5 className="font-semibold">2FA Authentication</h5>
          <small className="font-light text-xs">
            To keep your account safe, Please enable{" "}
            <Link to={"/2fa"} className="text-green-600">
              2FA
            </Link>{" "}
            security.{" "}
          </small>
        </span>
      </div>
      <div
        className={`${
          !user?.isKycVerified ? "flex" : "hidden"
        } border border-red-500 p-4 rounded-lg flex flex-col md:flex-row md:items-center gap-4 bg-white`}
      >
        <HiMiniDocumentCheck className="w-8 h-8 text-red-500" />
        <span>
          <h5 className="font-semibold">KYC Verification Required</h5>
          <small className="font-light text-xs">
            Kindly submit the required KYC information necessawry to verify your
            account.{" "}
            <Link to={"/kycverification"} className="text-green-600">
              Click here
            </Link>{" "}
            to submit KYC information. NOTE: Withdrawals are disabled until your
            account is fully verified
          </small>
        </span>
      </div>
    </div>
  );
};

export default Notifications;
