import React from "react";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";

const Mobilemenu = ({ toggle, styles, close }) => {
  return (
    <div
      className={
        toggle
          ? "absolute top-[62px] right-0 w-[250px] bg-white shadow-xl p-6 md:hidden rounded-sm"
          : "hidden"
      }
    >
      <div className="flex flex-col gap-6">
        {navLinks.map((link) => {
          return (
            <Link
              onClick={close}
              className="active:text-green-600"
              key={link.id}
            >
              {link.name}
            </Link>
          );
        })}
        <div className="flex flex-col gap-5">
          <Link
            to={"/register"}
            className={`${styles.button} bg-green-600 text-white`}
            onClick={close}
          >
            sign up
          </Link>
          <Link
            to={"/login"}
            onClick={close}
            className={`${styles.button} border-2 border-green-600 hover:border-none hover:bg-green-600 hover:text-white`}
          >
            sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Mobilemenu;
