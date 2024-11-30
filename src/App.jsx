import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  Dashboard,
  Deposit,
  Fee,
  Landing,
  Otp,
  Personal,
  Pools,
  Profile,
  Signin,
  Signup,
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
    <section className="h-screen overflow-hidden relative">
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
        className={token ? "lg:ml-[290px] font-[Poppins] h-screen" : "lg:ml-0"}
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
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
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
