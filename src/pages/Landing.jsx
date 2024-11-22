import React, { useEffect } from "react";

import Hero from "../components/Hero";
import Coinmarquee from "../components/landing/Coinmarquee";
import {
  Calltoaction,
  Engage,
  Features,
  Trader,
} from "../components/components";
import { Footer, Navbar } from "../components";

const Landing = () => {
  useEffect(() => {
    document.title = "Lithium Finance - Grow your capital";
  }, []);

  return (
    <section className="w-full min-h-screen relative bg-slate-950 font-[Poppins] text-white">
      <div className="w-full h-[50%] md:h-[55%] lg:h-[40%] myImage absolute top-0 left-0 z-0" />
      <div className="w-full h-full bg-black absolute top-0 left-0 bg-opacity-70 z-1" />
      {/* navbar */}
      <Navbar />
      {/* Content */}
      <div className="relative z-10  flex flex-col ">
        <div className="lg:max-w-[1100px] lg:mx-auto ">
          <Hero />
        </div>
        <Coinmarquee />
        <Features />
        <Calltoaction />
        <Trader />
        <Engage />
        <Footer />
      </div>
      {/* footer */}
    </section>
  );
};

export default Landing;
