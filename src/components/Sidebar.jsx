import React, { useState } from "react";
import Logo from "./Logo";
import { MdClose } from "react-icons/md";
import Walletinfo from "./dash/Walletinfo";
import Sidebarlinks from "./dash/Sidebarlinks";

const Sidebar = ({ toggle, handleToggle }) => {
  return (
    <aside
      className={`${
        !toggle ? "hidden lg:flex" : "block lg:hidden"
      } bg-white shadow-sm absolute top-0 flex flex-col gap-6 lg:gap-10 w-[280px] md:w-[290px] h-[100%] overflow-auto p-6`}
    >
      <div
        className="flex justify-end cursor-pointer text-2xl font-bold lg:hidden pt-3"
        onClick={() => handleToggle()}
      >
        <MdClose />
      </div>
      <span>
        <Logo />
      </span>
      <span>
        <Walletinfo />
      </span>
      <span>
        <Sidebarlinks />
      </span>
    </aside>
  );
};

export default Sidebar;
