import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  Completedeposit,
  Dashboard,
  Deposit,
  Deposithistory,
  Fee,
  Invest,
  Kyc,
  Landing,
  Otp,
  Personal,
  Pools,
  Profile,
  Referrals,
  Signin,
  Signup,
  Support,
  Ticket,
  Transactions,
  Twofactor,
  Usertickets,
  Withdraw,
} from "./pages";
import { Authnav, Footer, Navbar, Sidebar } from "./components";
import { getAccessToken } from "./utils/utils";
import Notification from "./pages/Notification";
import About from "./pages/About";
import Plans from "./pages/Plans";
import { useSelector } from "react-redux";

const App = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState("dashboard");

  const handleToggle = () => {
    console.log("toggled");
    setToggle((prev) => !prev);
  };

  const { user } = useSelector((state) => state.user);

  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) {
      setToken(false);
      // navigate("/login");
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
    } else {
      setToken(false);
    }
  }, [accessToken]);

  return (
    <section
      className={token ? "h-screen relative overflow-hidden" : "overflow-auto"}
    >
      {token && (
        <Authnav toggle={toggle} handleToggle={handleToggle} userInfo={user} />
      )}

      <div className={token ? "flex" : "hidden"}>
        {token && (
          <Sidebar
            toggle={toggle}
            handleToggle={handleToggle}
            active={active}
            setActive={setActive}
          />
        )}
      </div>

      <div
        className={token ? "lg:ml-[290px] font-[Poppins] h-screen " : "lg:ml-0"}
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/verifyotp" element={<Otp />} />
          <Route path="/completeprofile" element={<Personal />} />
          <Route
            path="/dashboard"
            element={<Dashboard setActive={setActive} />}
          />
          <Route path="/invest" element={<Invest setActive={setActive} />} />
          <Route path="/deposit" element={<Deposit setActive={setActive} />} />
          <Route
            path="/history"
            element={<Deposithistory setActive={setActive} />}
          />
          <Route
            path="/transactions"
            element={<Transactions setActive={setActive} />}
          />
          <Route
            path="/referrals"
            element={<Referrals setActive={setActive} user={user} />}
          />
          <Route path="/ticket" element={<Ticket setActive={setActive} />} />
          <Route
            path="/userticket"
            element={<Usertickets setActive={setActive} />}
          />
          <Route
            path="/support/:ticketId"
            element={<Support setActive={setActive} />}
          />
          <Route
            path="/withdraw"
            element={<Withdraw setActive={setActive} />}
          />
          <Route path="/kycverification" element={<Kyc />} />
          <Route
            path="/pay/:gateway/:amount"
            element={<Completedeposit setActive={setActive} />}
          />
          <Route path="/2fa" element={<Twofactor setActive={setActive} />} />
          <Route path="/about" element={<About />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/profile" element={<Profile setActive={setActive} />} />
          <Route path="/pools" element={<Pools setActive={setActive} />} />
          <Route path="/complete/:fee" element={<Fee />} />
          <Route path="/notification/:id" element={<Notification />} />
        </Routes>
      </div>
    </section>
  );
};

export default App;
