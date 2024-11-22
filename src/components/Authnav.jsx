import React from "react";
import { MdMenu } from "react-icons/md";

const Authnav = ({ toggle, handleToggle }) => {
  return (
    <header className="text-slate-800 bg-white p-6">
      <nav className="flex justify-between items-center lg:px-6">
        <span className="cursor-pointer" onClick={handleToggle}>
          <MdMenu className="text-2xl font-bold" />
        </span>
        <span className="text-white bg-slate-800 rounded-full p-2 text-center">
          <h5>UN</h5>
        </span>
      </nav>
    </header>
  );
};

export default Authnav;
