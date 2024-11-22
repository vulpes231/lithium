import React from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { getAccessToken } from "../utils/utils";

const Logo = () => {
  const accessToken = getAccessToken();
  const navigate = useNavigate();

  const goToHome = () => {
    if (accessToken) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };
  return (
    <button onClick={goToHome} to={"/"} className="flex items-center">
      <img src={logo} alt="" width={30} />
      <h1 className="uppercase font-bold text-lg md:text-2xl">
        lithium <span className="text-green-600">finance</span>
      </h1>
    </button>
  );
};

export default Logo;
