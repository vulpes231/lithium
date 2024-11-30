import React, { useEffect } from "react";

const Invest = ({ setActive }) => {
  useEffect(() => {
    setActive("pools");
  }, []);
  return (
    <section className="w-full p-6 font-[Poppins] bg-slate-100 h-full">
      <div>
        <h3 className="font-bold text-2xl md:text-3xl capitalize">
          investment plans
        </h3>
      </div>
    </section>
  );
};

export default Invest;
