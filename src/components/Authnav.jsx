import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import Authmenu from "./Authmenu";

const Authnav = ({ toggle, handleToggle, userInfo }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className="text-slate-800 bg-white p-6">
      <nav className="flex justify-between items-center lg:px-6">
        <span className="cursor-pointer" onClick={handleToggle}>
          <MdMenu className="text-2xl font-bold" />
        </span>
        <button
          type="button"
          onClick={() => setShowMenu((prev) => !prev)}
          className="text-white text-xs bg-slate-800 rounded-full w-10 h-10 text-center uppercase"
        >
          {`${userInfo?.firstname?.slice(0, 1)}${userInfo?.lastname?.slice(
            0,
            1
          )}`}
        </button>
        {showMenu && <Authmenu />}
      </nav>
    </header>
  );
};

export default Authnav;
