import React from "react";
import { mt4 } from "../../assets";

const tradeFeatures = [
  {
    id: 1,
    title: "Cryptocurrencies",
    content:
      "Rest assured when trading, as your transactions are both secure and swift. Say goodbye to missed chances caused by delays. Our trades are conducted on specialized, high-speed, and heavily encrypted servers.",
  },
  {
    id: 2,
    title: "Metals",
    content:
      "During periods of economic instability, precious metals are often seen as more secure investment choices. Start your investment venture by examining a wide variety of precious metals, such as gold, silver, diamonds, and various others.",
  },
  {
    id: 3,
    title: "Stocks",
    content:
      "Trade with confidence, knowing that your executions are secure and fast. Never miss an opportunity due to latency issues again. All of our executions take place over dedicated, high speed, highly encrypted servers..",
  },
  {
    id: 4,
    title: "Commodities",
    content:
      "It is recommended to enhance the diversity of your financial portfolio by delving into the trading of commodities like energy, sugar, and coffee, in order to discover new opportunities for investment.",
  },
  {
    id: 5,
    title: "Shares",
    content:
      "It is recommended to consider investing in fractional shares of well-known companies while utilizing our advanced trading tools to develop well-informed forecasts about the market.",
  },
  {
    id: 6,
    title: "Indices",
    content:
      "Are you interested in day trading? Embark on your trading journey by exploring indices and uncovering new markets using innovative strategies.",
  },
];

const Trader = () => {
  return (
    <section className="bg-slate-900">
      <div className="lg:max-w-[1100px] lg:mx-auto">
        <div className=" grid md:grid-cols-2 ">
          <figure className="">
            <img src={mt4} alt="" className="w-[400px]" />
          </figure>
          <div className="p-10 flex flex-col gap-4">
            <h3 className="text-2xl lg:text-5xl">MT4 Trading Platform</h3>
            <p className="font-light text-md text-slate-300">
              Access global markets anytime and anywhere with ease. Utilize the
              world’s most renowned trading platform, MT4, to engage in trading
              various instruments across different markets worldwide.
            </p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2">
        {tradeFeatures.map((feat, index) => {
          return (
            <div
              key={feat.id}
              className={`border border-green-600 p-20 flex flex-col gap-6`}
            >
              <h3 className="text-2xl md:text-3xl lg:text-5xl font-light ">
                {feat.title}
              </h3>
              <p className="font-[Roboto] font-light text-sm md:text-md lg:text-lg text-slate-300 leading-8">
                {feat.content}
              </p>
              <span>
                <button className="border border-green-600 px-8 py-3 rounded-3xl capitalize">
                  learn more
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Trader;
