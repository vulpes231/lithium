import React, { useEffect, useState } from "react";
import { Authnav, Dashcontent, Sidebar } from "../components";
import { getAccessToken } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/userSlice";
import Pools from "./Pools";

const Dashboard = () => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState("dashboard");

  const { user } = useSelector((state) => state.user);

  const handleToggle = () => {
    console.log("toggled");
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    document.title = "Lithium Finance - Dashboard";
  }, []);
  return (
    <section className="relative min-h-screen bg-slate-100 w-full font-[Poppins]">
      <Authnav toggle={toggle} handleToggle={handleToggle} userInfo={user} />
      <div className="flex h-full">
        <Sidebar
          toggle={toggle}
          handleToggle={handleToggle}
          active={active}
          setActive={setActive}
        />
        {active === "dashboard" ? (
          <Dashcontent />
        ) : active === "pools" ? (
          <Pools />
        ) : null}
      </div>
    </section>
  );
};

export default Dashboard;
