import React from "react";
import { FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa6";
import { logo } from "../assets";
import { MdOutlinePhonelink, MdPhone } from "react-icons/md";
import { getAccessToken } from "../utils/utils";

const Footer = () => {
  const accessToken = getAccessToken();
  return (
    <div
      className={`flex flex-col gap-2 items-center md:justify-center font-[Poppins] p-6 ${
        accessToken && "hidden"
      }`}
    >
      <div className="flex items-center gap-2">
        <img src={logo} alt="" width={20} />
        <h3 className="uppercase font-bold">coinxtra</h3>
      </div>
      <p className="text-sm font-normal ">&copy; 2024, All Rights Reserved</p>
      <span className="flex gap-3 items-center">
        <FaTelegram />
        <FaTwitter />
        <FaInstagram />
      </span>
      <span className="flex flex-col gap-2">
        <span className="flex items-center gap-1">
          <MdOutlinePhonelink />
          <small>+1234567890</small>
        </span>
      </span>
    </div>
  );
};

export default Footer;
