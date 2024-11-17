import React, { useEffect } from "react";
import { Coincard } from "../components";
import { btc, eth, usdt, doge, ltc, tron } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { getCoinData } from "../features/coinSlice";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

const coins = [
  { name: "bitcoin", img: btc },
  { name: "ethereum", img: eth },
  { name: "tether", img: usdt },
  { name: "dogecoin", img: doge },
  { name: "litecoin", img: ltc },
  { name: "tron", img: tron },
];

const Landing = () => {
  const dispatch = useDispatch();
  const { coinData, getCoinLoading, getCoinError } = useSelector(
    (state) => state.coin
  );

  useEffect(() => {
    dispatch(getCoinData()); // Fetch data for all coins
  }, [dispatch]);

  useEffect(() => {
    document.title = "CoinXtra - Welcome";
  });

  return (
    <section className="myImage w-full min-h-screen relative bg-slate-950">
      <div className="w-full h-full bg-black absolute bg-opacity-80 z-10"></div>
      <div className="text-white over p-6 relative z-20 flex flex-col items-center justify-center gap-6">
        <div className="text-center mt-20 flex flex-col gap-6 font-[Poppins]">
          <p className="text-xs font-normal">
            The smart alternative for your everyday finances
          </p>
          <h3 className="text-5xl capitalize font-[Roboto] font-bold">
            grow your <span className="text-yellow-600">money</span> the{" "}
            <br className="hidden sm:flex" /> modern way
          </h3>
          <p className="text-lg">
            Grow your money, Transfer and Withdraw crypto with low fees and earn{" "}
            <br />
            3.5% on your savings
          </p>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 w-full md:max-w-[1000px]">
          {getCoinLoading && <p>Loading...</p>}
          {getCoinError && <p>Error: {getCoinError}</p>}
          {!getCoinLoading &&
            !getCoinError &&
            coinData &&
            coins.map(({ name, img }) => {
              const change = coinData[name]?.usd_24h_change;
              const icon =
                change < 0 ? <FaArrowTrendDown /> : <FaArrowTrendUp />;

              return (
                <Coincard
                  key={name}
                  coinName={name}
                  price={`$${coinData[name]?.usd.toFixed(2)}` || "N/A"}
                  percentChange={
                    change !== undefined ? `${change.toFixed(2)}%` : "N/A"
                  }
                  img={img}
                  icon={icon}
                  customClass={change < 0 ? "text-red-500" : "text-green-500"}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Landing;
