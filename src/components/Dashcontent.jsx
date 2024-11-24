import React from "react";
import Notifications from "./dash/Notifications";
import Analytics from "./dash/Analytics";

const Dashcontent = () => {
  return (
    <section className="w-full lg:ml-[290px] p-6 font-[Poppins] flex flex-col gap-6">
      <Notifications />
      <Analytics />
    </section>
  );
};

export default Dashcontent;
