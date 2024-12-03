import React, { useEffect } from "react";

const styles = {
  inputHolder: "flex flex-col gap-1 ",
  input: "border w-full p-2",
  span: "flex items-center gap-1 ",
  spanLabel: "font-normal text-sm",
};

const Redspan = () => {
  return <span className="text-red-500">*</span>;
};

const Kyc = ({ setActive }) => {
  useEffect(() => {
    document.title = "Finance Hedge - Verify Your Account";
    // setActive("2FA");
  }, []);
  return (
    <section className="bg-slate-100 h-full p-6 overflow-auto ">
      <div className="flex flex-col gap-6">
        <div className="flex gap-1 flex-col">
          <h3 className="font-semibold text-xl md:text-2xl capitalize">
            Verify Your Account
          </h3>
          <small className="text-slate-500 font-light lg:w-[69%]">
            This system requires you to provide KYC (Know Your Customer)
            information. Your submitted details will be verified through the
            appropriate channels. Once your information is confirmed as
            accurate, your verification will be approved, granting you access to
            all the app's features.
          </small>
        </div>
        <form
          action=""
          className="flex flex-col gap-4 bg-white p-6 mb-24 border"
        >
          <div className={styles.inputHolder}>
            <label htmlFor="">
              Full Name <Redspan />{" "}
            </label>
            <input type="text" className={styles.input} />
          </div>
          <div className={styles.inputHolder}>
            <label htmlFor="">
              NID Number <Redspan />{" "}
            </label>
            <input type="text" className={styles.input} />
          </div>
          <div className={styles.inputHolder}>
            <label htmlFor="">
              Gender <Redspan />{" "}
            </label>
            <input type="text" className={styles.input} />
          </div>
          <div className={styles.inputHolder}>
            <label htmlFor="">Hobbies</label>
            <span className={styles.span}>
              <input type="checkbox" name="" id="" />
              <label htmlFor="" className={styles.spanLabel}>
                Programming
              </label>
            </span>
            <span className={styles.span}>
              <input type="checkbox" name="" id="" />
              <label htmlFor="" className={styles.spanLabel}>
                Gardening
              </label>
            </span>
            <span className={styles.span}>
              <input type="checkbox" name="" id="" />
              <label htmlFor="" className={styles.spanLabel}>
                Traveling
              </label>
            </span>
            <span className={styles.span}>
              <input type="checkbox" name="" id="" />
              <label htmlFor="" className={styles.spanLabel}>
                Others
              </label>
            </span>
          </div>
          <div className={styles.inputHolder}>
            <label htmlFor="">NID Photos</label>
            <input type="file" name="" className="border p-2" />
          </div>
          <span>
            <small className="text-green-600 font-light text-xs">
              Supported mimes: jpg, jpeg, png
            </small>
          </span>
          <button className="bg-green-600 text-white p-2 rounded-3xl">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Kyc;
