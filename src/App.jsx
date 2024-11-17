import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  Dashboard,
  Deposit,
  Faq,
  Fee,
  Landing,
  Profile,
  Settings,
  Signin,
  Signup,
  Withdraw,
} from "./pages";
import { Authnav, Footer, Navbar } from "./components";
import { getAccessToken } from "./utils/utils";
import Notification from "./pages/Notification";

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
      {!token ? <Navbar /> : <Authnav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/complete/:fee" element={<Fee />} />
        <Route path="/notification/:id" element={<Notification />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
