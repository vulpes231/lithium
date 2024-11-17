import React from "react";

const features = [
  {
    id: 1,
    title: "Top-notch customer service",
    content:
      "Feel confident when engaging in trading, as your transactions are not only safe but also fast. Say goodbye to potential missed chances due to delays. Our transactions take place solely on specialized, high-speed, and highly secure servers.",
  },
  {
    id: 2,
    title: "Short-Term Contracts",
    content:
      "Trading intra-day, daily or weekly provides unique opportunities.",
  },
  {
    id: 3,
    title: "Active Markets",
    content: "24 hours a day, Sunday-Friday. Whenever you want to trade.",
  },
  {
    id: 4,
    title: "Risk That You Define",
    content: "Know your maximum potential profit or loss up front.",
  },
];

const Features = () => {
  const myFeatures = features.map((ft) => {
    return (
      <div key={ft.id} className="bg-slate-900 p-20 ">
        <div className="flex flex-col gap-4 lg:max-w-[1100px] lg:mx-auto">
          <h3 className="text-2xl md:text-3xl lg:text-5xl font-semibold ">
            {ft.title}
          </h3>
          <p className="font-[Roboto] font-light text-sm md:text-md lg:text-lg text-slate-300">
            {ft.content}
          </p>
        </div>
      </div>
    );
  });
  return (
    <div className="flex flex-col gap-6 mt-0 bg-slate-800">{myFeatures}</div>
  );
};

export default Features;
