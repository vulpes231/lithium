import React, { useEffect, useState } from "react";
import { Authnav, Dashcontent, Sidebar } from "../components";

const Dashboard = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    console.log("toggled");
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    document.title = "Lithium Finance - Dashboard";
  });
  return (
    <section className="relative min-h-screen bg-slate-100 w-full font-[Poppins]">
      <Authnav toggle={toggle} handleToggle={handleToggle} />
      <div className="flex h-full">
        <Sidebar toggle={toggle} handleToggle={handleToggle} />
        <Dashcontent />
      </div>
    </section>
  );
};

export default Dashboard;
