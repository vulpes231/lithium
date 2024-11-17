import React, { useEffect, useState } from "react";
import { logo } from "../assets";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import { MdClose, MdMenu } from "react-icons/md";
import Mobilemenu from "./Mobilemenu";
import Logo from "./Logo";

const styles = {
  button: `px-4 py-2.5 rounded-3xl uppercase text-xs font-medium`,
};

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  const closeMenu = () => {
    setToggle(false);
  };

  useEffect(() => {
    document.title = "CoinXtra - Signin";
  }, []);
  return (
    <header className="fixed top-0 p-3 w-full h-[60px] flex items-center justify-center font-[Poppins] z-50 bg-white">
      <nav className="md:max-w-[900px] md:mx-auto flex items-center justify-between w-full">
        <Logo />
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            return <Link key={link.id}>{link.name}</Link>;
          })}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link
            to={"/register"}
            className={`${styles.button} bg-yellow-600 text-white`}
          >
            sign up
          </Link>
          <Link
            to={"/login"}
            className={`${styles.button} border-2 border-yellow-600 hover:border-none hover:bg-yellow-600 hover:text-white`}
          >
            sign in
          </Link>
        </div>
        <span onClick={handleToggle} className="md:hidden text-xl font-medium">
          {!toggle ? <MdMenu /> : <MdClose />}
        </span>
        {toggle && (
          <Mobilemenu toggle={toggle} styles={styles} close={closeMenu} />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
