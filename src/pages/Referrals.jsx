import React, { useEffect } from "react";
import { MdCopyAll } from "react-icons/md";

const Referrals = ({ setActive, user }) => {
  useEffect(() => {
    document.title = "Finance Hedge - Referrals";
    setActive("referrals");
  }, []);
  return (
    <section className="bg-slate-100 h-full p-6">
      <div className="flex flex-col gap-6 ">
        <h3 className="font-semibold text-xl md:text-2xl capitalize">
          my referrals
        </h3>
        <div className="flex flex-col gap-6 bg-white p-6 shadow-sm rounded-sm border">
          <h3 className="font-semibold">Refer &amp; Enjoy the Bonus</h3>
          <p className="font-light text-sm">
            You'll get commision on your referral activities. levels has been
            decided by the <b>finance hedge</b> authority. If you reach the
            level, you'll get commision
          </p>
          <div className="flex gap-1 items-center w-full">
            <input
              type="text"
              className="border p-1.5 rounded-md w-full placeholder:font-light text-xs text-slate-800"
              placeholder={`https://financehedge.org/?refId=${user?.username}fh24`}
            />
            <button className="bg-zinc-200 p-2 rounded-sm cursor-pointer flex items-center gap-1 text-xs">
              Copy <MdCopyAll />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Referrals;
