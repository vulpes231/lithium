import React, { useEffect } from "react";
import { authLinks } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { MdHome, MdLogout, MdMoneyOff } from "react-icons/md";
import { PiHandWithdrawFill } from "react-icons/pi";
import { FaMoneyBills } from "react-icons/fa6";
import { RiFileUserFill } from "react-icons/ri";
import { FaQuestionCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { resetLogin } from "../features/loginSlice";
import { resetLogout } from "../features/userSlice";

const Logoutmodal = () => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-55">
      <p className="text-slate-800 bg-white p-6">Logging out...</p>
    </div>
  );
};

const Authmenu = ({ close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logoutLoading, logoutError, loggedOut } = useSelector(
    (state) => state.user
  );

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (loggedOut) {
      sessionStorage.clear();
      dispatch(resetLogin());
      dispatch(resetLogout());
      navigate("/login");
    }
  }, [loggedOut]);
  return (
    <div className="absolute top-[70px] right-0 flex flex-col gap-5 capitalize bg-white p-6 rounded-bl-xl shadow-lg shadow-green-100 w-[250px]">
      {authLinks.map((link) => {
        const icon =
          link.id === "profile" ? (
            <MdHome />
          ) : link.id === "changepass" ? (
            <PiHandWithdrawFill />
          ) : null;
        return (
          <Link
            onClick={close}
            to={link.path}
            key={link.id}
            className="text-sm flex items-center gap-1 active:text-yellow-500"
          >
            <span>{icon}</span>
            <span>{link.name}</span>
          </Link>
        );
      })}
      <span onClick={handleLogout} className="text-sm flex items-center gap-1">
        <MdLogout />
        <span>logout</span>
      </span>
      {logoutLoading && <Logoutmodal />}
    </div>
  );
};

export default Authmenu;
