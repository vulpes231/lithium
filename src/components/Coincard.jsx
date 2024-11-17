import React from "react";

const Coincard = ({
  coinName,
  price,
  percentChange,
  img,
  icon,
  customClass,
}) => {
  return (
    <div className="bg-white bg-opacity-80 rounded-xl shadow-lg text-slate-950 p-6 h-[130px] w-full flex flex-col gap-4 justify-between">
      <span className="flex items-center gap-2">
        <img src={img} alt="" width={25} />
        <h3 className="uppercase font-bold font-[Poppins]">{coinName}</h3>
      </span>
      <div className="flex justify-between items-center">
        <span>
          <p>{price}</p>
          <p className={`text-xs font-medium ${customClass}`}>
            {percentChange}
          </p>
        </span>
        <span className={`${customClass}`}>{icon}</span>
      </div>
    </div>
  );
};

export default Coincard;
