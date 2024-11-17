import React from "react";
import { tradeone, tradetwo } from "../assets";

const Aboutcard = ({ title, content, customClass, img }) => {
  return (
    <div className={customClass}>
      <figure className="w-full">
        <img src={img} alt="image" />
      </figure>
      <div className="w-full flex flex-col gap-4 ">
        <h3 className="text-xl md:text-3xl lg:text-3xl font-semibold uppercase">
          {title}
        </h3>
        <p className="font-light text-sm md:text-md text-slate-400">
          {content}
        </p>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section className="min-h-screen bg-slate-900 text-[#fff] mt-20 font-[Poppins]">
      <div className="lg:max-w-[1100px] lg:mx-auto p-20 flex flex-col gap-10">
        <h3 className="text-2xl lg:text-4xl text-center uppercase font-bold">
          about us
        </h3>
        <div className="flex flex-col gap-10">
          <Aboutcard
            title={
              "Tools that prioritize safety, efficiency, and top-notch quality."
            }
            content={
              "Lithium Finance has developed a trading platform that prioritizes security, speed, and advanced tools to optimize your trading experience. Our team of experienced financial professionals has carefully chosen a wide range of tools and trading instruments to streamline and enhance your trading journey across different markets. We emphasize the significance of security, efficient execution, convenient accessibility, prompt withdrawals, and a diverse range of deposit options to provide expert support at every step of your financial market endeavors."
            }
            customClass={"flex flex-col  md:flex-row gap-16 items-center"}
            img={tradeone}
          />
          <Aboutcard
            title={
              "Uncover all the necessary components for conducting trades in a convenient centralized location."
            }
            content={
              "Our trading platform is committed to providing customized tools to meet the unique needs of each client. We strive to continuously improve and introduce new features by listening to and implementing feedback from our customers. Through ongoing communication with our users, we seek to enhance their trading experience by offering the features they desire."
            }
            customClass={
              "flex flex-col  md:flex-row-reverse gap-16 items-center"
            }
            img={tradetwo}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
