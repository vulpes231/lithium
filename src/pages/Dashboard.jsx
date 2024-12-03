import React, { useEffect, useState } from "react";
import { Authnav, Dashcontent, Sidebar } from "../components";
import { getAccessToken } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/userSlice";

const Dashboard = ({ setActive }) => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    setActive("dashboard");
  }, []);

  useEffect(() => {
    document.title = "Finance Hedge - Dashboard";
  }, []);
  return (
    <section className=" bg-slate-100 w-full h-full font-[Poppins] overflow-auto">
      <Dashcontent user={user} />
    </section>
  );
};

export default Dashboard;
