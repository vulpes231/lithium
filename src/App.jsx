import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  Dashboard,
  Deposit,
  Fee,
  Landing,
  Otp,
  Personal,
  Profile,
  Signin,
  Signup,
  Withdraw,
} from "./pages";
import { Authnav, Footer, Navbar } from "./components";
import { getAccessToken } from "./utils/utils";
import Notification from "./pages/Notification";
import About from "./pages/About";
import Plans from "./pages/Plans";

const App = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(false);

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
    <div>
      {/* {!token ? <Navbar /> : <Authnav />} */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/verifyotp" element={<Otp />} />
        <Route path="/completeprofile" element={<Personal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />

        <Route path="/about" element={<About />} />
        <Route path="/plans" element={<Plans />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/complete/:fee" element={<Fee />} />
        <Route path="/notification/:id" element={<Notification />} />
      </Routes>
    </div>
  );
};

export default App;
