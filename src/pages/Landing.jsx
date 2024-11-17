import React, { useEffect } from "react";

import Hero from "../components/Hero";
import Coinmarquee from "../components/landing/Coinmarquee";

const Landing = () => {
  useEffect(() => {
    document.title = "Lithium Finance - Grow your capital";
  }, []);

  return (
    <section className="w-full min-h-screen relative bg-slate-950 font-[Poppins] text-white">
      {/* Background Image */}
      <div className="w-full h-[50%] md:h-[55%] myImage absolute top-0 left-0 z-0" />

      <div className="w-full h-full bg-black absolute top-0 left-0 bg-opacity-70 z-1" />

      {/* Content */}
      <div className="relative z-10 mt-20">
        <div className="lg:max-w-[1000px] lg:mx-auto p-6">
          <Hero />
        </div>
        <Coinmarquee />
      </div>
    </section>
  );
};

export default Landing;
