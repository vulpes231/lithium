import React from "react";

const Engage = () => {
  return (
    <div className="bg-green-600 p-20 text-slate-950">
      <div className="flex flex-col gap-8 md:flex-row md:items-center lg:max-w-[1100px] lg:mx-auto">
        <h3 className="text-3xl lg:text-5xl uppercase font-light">
          Engage in Trading!
        </h3>
        <span className="flex flex-col gap-4">
          <p className="text-md lg:text-lg lg:w-[80%]">
            Please feel free to reach out to us if you have any inquiries about
            the services we offer.
          </p>
          <span>
            <button className="bg-black text-white px-10 py-3  rounded-3xl border-none">
              Contact us
            </button>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Engage;
