import React, { useEffect } from "react";

const styles = {
  card: "shadow-md rounded-md bg-white",
};

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
        <div>
          <div className={styles.card}>
            <h3>Bronze</h3>
          </div>
          <div className={styles.card}>
            <h3>Gold</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Invest;
