import React, { useEffect } from "react";
import { MdHelp } from "react-icons/md";

const Twofactor = ({ setActive }) => {
  useEffect(() => {
    document.title = "Finance Hedge - Two Factor Aunthentication";
    setActive("2FA");
  }, []);
  return (
    <section className="bg-slate-100 h-full p-6 overflow-auto ">
      <div className="py-5 flex flex-col gap-1">
        <h3 className="font-semibold text-xl md:text-2xl capitalize">
          two factor authentication
        </h3>
        <small className="text-slate-500 font-light">
          Your account will be more secure if you use this feature. A 6 digit
          verification from your Authenticator app must be entered on every
          login attempt. <br className="hidden lg:flex" /> Additionally
          withdrawal transactions also require this verification code to verify
          that it is you.
        </small>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-24">
        <div className="flex flex-col gap-4 bg-white border">
          <h3 className="text-lg md:text-xl font-bold capitalize pt-4 px-4">
            Add your account
          </h3>
          <hr />
          <div className="p-6 flex flex-col gap-4">
            <p>
              Use QR code or setup key on your Google Authenticator app to add
              your account
            </p>
            <img src="" alt="QR-CODE" />
            <div className="flex w-full">
              <input type="text" className="border w-full p-2" />
              <button className="p-2 bg-zinc-300 text-slate-800 font-light text-xs">
                Copy
              </button>
            </div>
            <span className="flex items-center text-slate-500">
              <MdHelp />
              <small>Help</small>
            </span>
            <small className="text-slate-500 font-light">
              Google Authenticator is a multifactor app for mobile devices. It
              generates timed codes used furing 2-step verification. To use
              Google Authenticator, install the google Authenticator app on your
              mobile device
            </small>
          </div>
        </div>
        <div className="bg-white flex flex-col gap-4 border">
          <h3 className="text-lg md:text-xl font-bold capitalize pt-4 px-4">
            Enable 2fa security
          </h3>
          <hr />
          <div className="flex flex-col gap-2 p-6">
            <label htmlFor="">
              Google Authenticator OTP <span className="text-red-500">*</span>
            </label>
            <input type="text" className="p-2 border w-full" />
            <button className="bg-green-600 text-white p-2 mt-5 rounded-3xl">
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Twofactor;
