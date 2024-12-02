import React, { useEffect } from "react";
import { Footer, Navbar } from "../components";

const myPlans = [
  {
    plan: "bronze",
    spread: "From 2.8 pips",
    commission: "no",
    execution: "STP, Market, No requotes",
    leverage: "1:100",
    tradingPlatform: "WebTrader",
    accountCurrency: "USD",
    markets: "50 Currency pairs, 45+ CFD",
    ROI: "4% Daily",
    openPositions: "unlimited",
    stopOut: "5%",
    personalManager: "yes",
    cryptoTrading: "yes",
    scalping: "yes",
    size: "$250 - $1,000 USD",
  },
  {
    plan: "silver",
    spread: "From 2.5 pips",
    commission: "no",
    execution: "STP, Market, No requotes",
    leverage: "1:200",
    tradingPlatform: "WebTrader",
    accountCurrency: "USD",
    markets: "50 Currency pairs, 45+ CFD",
    ROI: "6% Daily",
    openPositions: "unlimited",
    stopOut: "5%",
    personalManager: "yes",
    cryptoTrading: "yes",
    scalping: "yes",
    size: "$250 - $1,000 USD",
  },
  {
    plan: "gold",
    spread: "From 1.5 pips",
    commission: "no",
    execution: "STP, Market, No requotes",
    leverage: "1:300",
    tradingPlatform: "WebTrader",
    accountCurrency: "USD",
    markets: "50 Currency pairs, 45+ CFD",
    ROI: "8% Daily",
    openPositions: "unlimited",
    stopOut: "5%",
    personalManager: "yes",
    cryptoTrading: "yes",
    scalping: "yes",
    size: "$250 - $1,000 USD",
  },
  {
    plan: "platinum",
    spread: "From 0.1 pips",
    commission: "no",
    execution: "STP, Market, No requotes",
    leverage: "1:400",
    tradingPlatform: "WebTrader",
    accountCurrency: "USD",
    markets: "50 Currency pairs, 45+ CFD",
    ROI: "3% Daily",
    openPositions: "unlimited",
    stopOut: "5%",
    personalManager: "yes",
    cryptoTrading: "yes",
    scalping: "yes",
    size: "$250 - $1,000 USD",
  },
];

const Plans = () => {
  const attributes = [
    "spread",
    "commission",
    "execution",
    "leverage",
    "tradingPlatform",
    "accountCurrency",
    "markets",
    "ROI",
    "openPositions",
    "stopOut",
    "personalManager",
    "cryptoTrading",
    "scalping",
    "size",
  ];

  useEffect(() => {
    document.title = "Finance Hedge - Plans";
  }, []);

  return (
    <section className="bg-slate-800 min-h-screen text-white">
      <Navbar />
      <div className="lg:max-w-[1100px] lg:mx-auto p-6 overflow-auto mt-20">
        <table className="min-w-full border-collapse border border-slate-700 text-sm">
          <thead className="bg-green-600 capitalize">
            <tr>
              {/* Table headers for each plan */}
              <th></th>
              {myPlans.map((plan) => (
                <th className="text-left px-6 py-4 text-lg" key={plan.plan}>
                  {plan.plan}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Table body for each attribute */}
            {attributes.map((attribute, index) => (
              <tr
                key={attribute}
                className={`${
                  index % 2 == 0 ? "bg-slate-700" : "bg-slate-950"
                }`}
              >
                <td className="px-6 py-3 ">
                  <span className="whitespace-nowrap capitalize font-bold font-[Poppins] text-lg">
                    {attribute.includes("tradingPlatform")
                      ? "trading platform"
                      : attribute.includes("personalManager")
                      ? "personal manager"
                      : attribute.includes("accountCurrency")
                      ? "account currency"
                      : attribute.includes("openPositions")
                      ? "open positions"
                      : attribute.includes("cryptoTrading")
                      ? "crypto trading"
                      : attribute}
                  </span>
                </td>
                {myPlans.map((plan) => (
                  <td className="px-6 py-5" key={plan.plan}>
                    <span className="capitalize font-light">
                      {plan[attribute]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </section>
  );
};

export default Plans;
