import React, { useEffect } from "react";
import { Dashcontent, Sidebar } from "../components";
import { getAccessToken } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/userSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    }
  }, [accessToken]);

  useEffect(() => {
    document.title = "CoinXtra - Dashboard";
  });

  return (
    <section className="min-h-screen bg-slate-100 w-full mb-10 ">
      <div className="flex min-h-full mt-[66px]">
        <Sidebar />
        <Dashcontent user={user} />
      </div>
    </section>
  );
};

export default Dashboard;
