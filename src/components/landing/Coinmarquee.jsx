import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { getCoinData } from "../../features/coinSlice";
import { SiCoinmarketcap } from "react-icons/si";
import { btc, eth, usdt, doge, ltc, tron } from "../../assets";
import Marquee from "react-fast-marquee"; // Import the Marquee component

// Coin logos and names
const coins = [
  { name: "bitcoin", img: btc },
  { name: "ethereum", img: eth },
  { name: "tether", img: usdt },
  { name: "dogecoin", img: doge },
  { name: "litecoin", img: ltc },
  { name: "tron", img: tron },
];

const Coinmarquee = () => {
  const dispatch = useDispatch();
  const { coinData, getCoinLoading, getCoinError } = useSelector(
    (state) => state.coin
  );

  useEffect(() => {
    dispatch(getCoinData());
  }, [dispatch]);

  return (
    <div className="bg-slate-950 w-full flex items-center text-sm border border-slate-800">
      <div className="py-2 px-4 border-r border-r-slate-800 w-[15%]">
        <h3>Powered by</h3>
        <span className="flex gap-1 items-center">
          <SiCoinmarketcap /> CoinMarketCap
        </span>
      </div>

      <div className="flex overflow-hidden gap-6 p-2 w-[85%]">
        <Marquee direction="left">
          {coins.map((coin) => {
            const coinInfo = coinData[coin.name];
            if (!coinInfo) return null;

            const price = coinInfo.usd;
            const change24h = coinInfo.usd_24h_change;

            return (
              <div
                key={coin.name}
                className="flex items-center gap-8 w-full border-r border-l border-slate-800 px-2"
              >
                <span className="flex items-center gap-1">
                  <img src={coin.img} alt={`${coin.name} logo`} width={25} />
                  <span>
                    <h5 className="font-medium text-sm">
                      {coin.name.charAt(0).toUpperCase() + coin.name.slice(1)}
                    </h5>
                    <small className="font-thin">
                      {coin.name.toUpperCase()}
                    </small>
                  </span>
                </span>
                <span className="flex flex-col">
                  <h5 className="font-medium">${price}</h5>
                  <small className="font-thin">
                    {change24h >= 0 ? (
                      <span className="text-green-500 flex items-center gap-1">
                        <FaArrowTrendUp /> {change24h.toFixed(2)}%
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center gap-1">
                        <FaArrowTrendDown /> {Math.abs(change24h).toFixed(2)}%
                      </span>
                    )}
                  </small>
                </span>
              </div>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
};

export default Coinmarquee;
