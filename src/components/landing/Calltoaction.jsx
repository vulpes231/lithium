import React from "react";

const Calltoaction = () => {
  return (
    <div className="bg-green-600 p-20 text-slate-950">
      <div className="flex flex-col gap-8 md:flex-row md:items-center lg:max-w-[1100px] lg:mx-auto">
        <h3 className="text-3xl lg:text-5xl uppercase font-light">
          Reliable and Protected, Swift Executions.
        </h3>
        <span className="flex flex-col gap-4">
          <p className="text-md lg:text-lg lg:w-[80%]">
            Engage in trading with assurance, as your transactions are both
            secure and swift. Say goodbye to missed opportunities caused by
            delays. Every transaction is carried out on specialized, high-speed,
            and heavily encrypted servers.
          </p>
          <span>
            <button className="bg-black text-white px-10 py-3  rounded-3xl border-none">
              Register
            </button>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Calltoaction;
