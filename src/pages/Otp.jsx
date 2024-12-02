import React, { useState, useEffect } from "react";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetMailVerify,
  resetSendCode,
  sendMailCode,
  verifyEmail,
} from "../features/verifySlice";

const styles = {
  input: "bg-zinc-300 w-12 h-12 text-center text-lg font-medium",
};

const Otp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });
  const [error, setError] = useState("");

  const {
    emailOtp,
    emailCodeError,
    emailCodeLoading,
    verifyMailError,
    verifyMailLoading,
    emailVerified,
  } = useSelector((state) => state.verify);

  const { user } = useSelector((state) => state.user);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (/[^0-9]/.test(value)) return;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value && name !== "otp6") {
      const nextInput = document.querySelector(
        `input[name=otp${parseInt(name[3]) + 1}]`
      );
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValues = Object.values(form);
    if (otpValues.includes("")) {
      setError("Please fill out all the fields.");
      return;
    }

    const otpString = otpValues.join("");

    const userOtp = parseInt(otpString);

    if (userOtp !== emailOtp) {
      setError("Invalid OTP code.");
      return;
    }

    const data = {
      otp: userOtp,
      original: emailOtp,
    };

    dispatch(verifyEmail(data));
  };

  useEffect(() => {
    if (verifyMailError) {
      setError(verifyMailError);
    }
  }, [verifyMailError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = 3000;
      setTimeout(() => {
        setError(false);
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    document.title = "Finance Hedge - Email Verification";
  }, []);

  useEffect(() => {
    const userMail = user.email;
    if (userMail) {
      dispatch(sendMailCode(userMail));
    }
  }, []);

  useEffect(() => {
    if (emailVerified) {
      dispatch(resetMailVerify());
      dispatch(resetSendCode());
      navigate("/completeprofile");
    }
  }, [emailVerified]);

  return (
    <section className="h-screen bg-slate-100 p-6 flex flex-col gap-6 items-center justify-center font-[Poppins]">
      <span className="flex items-center justify-center">
        <Logo />
      </span>
      <div className="w-full lg:w-[400px] lg:mx-auto bg-white p-6 flex flex-col gap-4 shadow-sm text-slate-400">
        <h3 className="capitalize font-medium text-lg md:text-xl text-slate-800">
          Verify Email Address
        </h3>
        <hr />
        <p className="text-sm font-light">
          {emailCodeLoading
            ? "Sending verification code..."
            : `A 6-digit verification code has been sent to your email address: ${user?.email}`}
        </p>
        <div>
          <span className="text-slate-800">Verification Code</span>
          <div className="flex items-center justify-evenly gap-3">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                name={`otp${index + 1}`}
                value={form[`otp${index + 1}`]}
                onChange={handleInput}
                maxLength={1}
                className={styles.input}
                autoFocus={index === 0}
              />
            ))}
          </div>
        </div>
        {error && <p className="text-red-500 text-xs text-center">{error}</p>}
        <div className="flex flex-col gap-2 my-4">
          <button
            className="bg-green-600 px-6 py-2 rounded-3xl text-white"
            onClick={handleSubmit}
          >
            {!verifyMailLoading ? "Submit OTP" : "Verifying mail..."}
          </button>
          <small className="text-sm font-light text-center">
            Didn't get the code?{" "}
            <Link className="text-green-500" to="/resend-otp">
              Try again
            </Link>
          </small>
        </div>
      </div>
    </section>
  );
};

export default Otp;
