import React, { useState } from "react";
import { MdHome } from "react-icons/md";
import { AiOutlineAreaChart } from "react-icons/ai";
import { PiHandDepositFill, PiHandWithdrawFill } from "react-icons/pi";
import { FaHistory, FaUserFriends } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { Si2Fas } from "react-icons/si";
import { FaUserGear } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const sideBarLinks = [
  {
    id: 1,
    name: "dashboard",
    path: "/dashboard",
  },
  {
    id: 2,
    name: "pools",
    path: "/pools",
  },
  {
    id: 3,
    name: "deposit",
    path: "/deposit",
  },
  {
    id: 4,
    name: "withdraw",
    path: "/withdraw",
  },
  {
    id: 5,
    name: "transactions",
    path: "/transactions",
  },
  {
    id: 6,
    name: "referrals",
    path: "/referrals",
  },
  {
    id: 7,
    name: "support ticket",
    path: "/ticket",
  },
  {
    id: 8,
    name: "2FA",
    path: "/twofactor",
  },
  {
    id: 9,
    name: "profile",
    path: "/profile",
  },
];

const Sidebarlinks = ({ active, setActive, handleToggle }) => {
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
      <Link
        onClick={() => handleToggle()}
        className={`${
          active === link.name
            ? "bg-green-100 rounded-3xl text-green-600"
            : "text-slate-600"
        } py-2 px-4 cursor-pointer font-medium text-sm flex items-center gap-2`}
        key={link.id}
        to={link.path}
      >
        <span className="text-lg md:text-xl">{icon}</span>
        {link.name}
      </Link>
    );
  });
  return <ul className="capitalize flex flex-col gap-3">{myLinks}</ul>;
};

export default Sidebarlinks;
