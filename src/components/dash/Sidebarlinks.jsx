import React, { useState } from "react";
import { MdHome } from "react-icons/md";
import { AiOutlineAreaChart } from "react-icons/ai";
import { PiHandDepositFill, PiHandWithdrawFill } from "react-icons/pi";
import { FaHistory, FaUserFriends } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { Si2Fas } from "react-icons/si";
import { FaUserGear } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";

const sideBarLinks = [
  {
    id: 1,
    name: "dashboard",
  },
  {
    id: 2,
    name: "pools",
  },
  {
    id: 3,
    name: "deposit",
  },
  {
    id: 4,
    name: "withdraw",
  },
  {
    id: 5,
    name: "transactions",
  },
  {
    id: 5,
    name: "referrals",
  },
  {
    id: 5,
    name: "support ticket",
  },
  {
    id: 5,
    name: "2FA",
  },
  {
    id: 5,
    name: "profile",
  },
  {
    id: 5,
    name: "change password",
  },
];

const Sidebarlinks = () => {
  const [active, setActive] = useState("dashboard");
  const myLinks = sideBarLinks.map((link) => {
    const icon =
      link.name == "dashboard" ? (
        <MdHome />
      ) : link.name == "pools" ? (
        <AiOutlineAreaChart />
      ) : link.name == "deposit" ? (
        <PiHandDepositFill />
      ) : link.name == "withdraw" ? (
        <PiHandWithdrawFill />
      ) : link.name == "transactions" ? (
        <FaHistory />
      ) : link.name == "referrals" ? (
        <FaUserFriends />
      ) : link.name == "support ticket" ? (
        <BiSupport />
      ) : link.name == "2FA" ? (
        <Si2Fas />
      ) : link.name == "profile" ? (
        <FaUserGear />
      ) : link.name == "change password" ? (
        <RiLockPasswordFill />
      ) : null;
    return (
      <li
        onClick={() => setActive(link.name)}
        className={`${
          active === link.name
            ? "bg-green-100 rounded-3xl text-green-600"
            : "text-slate-600"
        } py-2 px-4 cursor-pointer font-medium text-sm flex items-center gap-2`}
        key={link.id}
      >
        <span className="text-lg md:text-xl">{icon}</span>
        {link.name}
      </li>
    );
  });
  return <ul className="capitalize flex flex-col gap-3">{myLinks}</ul>;
};

export default Sidebarlinks;
