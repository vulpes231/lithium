import React from "react";
import { FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa6";
import { logo } from "../assets";
import { MdEditDocument, MdOutlinePhonelink, MdPhone } from "react-icons/md";
import { getAccessToken } from "../utils/utils";

const Footer = () => {
  const accessToken = getAccessToken();
  return (
    <footer
      className={`font-[Poppins] p-6 bg-slate-950 text-white ${
        accessToken && "hidden"
      }`}
    >
      <div className="flex flex-col gap-10 lg:max-w-[1100px] lg:mx-auto">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt=""
            width={20}
            className="w-[20px] md:w-[40px] lg:w-[50px]"
          />
          <h3 className="uppercase font-bold text-lg md:text-xl lg:text-2xl">
            finance <span className="text-green-600">hedge</span>
          </h3>
        </div>
        <small className="font-light text-slate-400">
          Trading involves a substantial risk of incurring rapid financial
          losses due to the utilization of leverage. It is imperative to
          acknowledge that 75% of individual investors experience monetary
          losses during their trading activities. Prior to commencing any
          trading endeavors, it is essential to acquire a comprehensive
          comprehension of its mechanisms and evaluate whether you possess the
          financial capacity to withstand potential losses. Being cognizant of
          all the risks associated with trading and our diverse range of
          products is of utmost importance. In case of uncertainty, seeking
          guidance from an impartial advisor is always advisable. It is crucial
          to remember that previous performance does not guarantee future
          outcomes.
        </small>
        <div className="flex items-center justify-between">
          <p className="text-sm font-normal ">
            &copy; 2024, All Rights Reserved
          </p>
          <span className="flex items-center gap-1 capitalize font-light text-sm">
            <MdEditDocument />
            <p>legal documents</p>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
