import React, { useEffect } from "react";
import { authLinks } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { MdHome, MdLogout, MdMoney } from "react-icons/md";
import { FaGear, FaMoneyBills, FaMoneyBillTransfer } from "react-icons/fa6";
import { FaMoneyCheckAlt, FaUserAlt, FaQuestionCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetLogout } from "../features/userSlice";
import { resetLogin } from "../features/loginSlice";

const Logoutmodal = () => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-55">
      <p className="text-slate-800 bg-white p-6">Logging out...</p>
    </div>
  );
};

const Sidebar = () => {
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
      dispatch(resetLogout());
      dispatch(resetLogin());
      navigate("/login");
    }
  }, [loggedOut]);

  return (
    <aside className="bg-white hidden lg:flex w-[20%] p-6 mt-1 h-[calc(100% - 70px)]">
      <div className="flex flex-col gap-5 capitalize h-full">
        {authLinks.map((link) => {
          const icon =
            link.id === "dashboard" ? (
              <MdHome />
            ) : link.id === "deposit" ? (
              <FaMoneyBills />
            ) : link.id === "withdraw" ? (
              <FaMoneyBillTransfer />
            ) : link.id === "settings" ? (
              <FaGear />
            ) : link.id === "profile" ? (
              <FaUserAlt />
            ) : link.id === "faq" ? (
              <FaQuestionCircle />
            ) : null;
          return (
            <Link
              to={link.path}
              key={link.id}
              className="flex gap-2 items-center text-sm"
            >
              {icon} {link.name}
            </Link>
          );
        })}
        <span
          className="cursor-pointer flex gap-2 items-center text-sm"
          onClick={handleLogout}
        >
          <MdLogout />
          <p>logout</p>
        </span>
      </div>
      {logoutLoading && <Logoutmodal />}
    </aside>
  );
};

export default Sidebar;
