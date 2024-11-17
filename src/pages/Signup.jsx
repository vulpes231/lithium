import React, { useEffect, useState } from "react";
import { Input } from "../components";
import {
  MdHome,
  MdLock,
  MdLockReset,
  MdMail,
  MdPassword,
} from "react-icons/md";
import { FaPhone, FaUser, FaWallet } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetRegister } from "../features/registerSlice";

const styles = {
  formDiv: "relative flex gap-2",
  icon: "absolute top-[14px] left-3",
};

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    pin: "",
    walletAddress: "",
    address: "",
    fullname: "",
    invitation: "",
  });

  const [error, setError] = useState(false);

  const { registerLoading, registerError, userRegistered } = useSelector(
    (state) => state.register
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (!form.password || !form.username || !form.email || !form.pin) {
      setError("Required fields cannot be empty!");
      return;
    }
    dispatch(registerUser(form));
  };

  useEffect(() => {
    if (registerError) {
      setError(registerError);
    }
  }, [registerError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = 2000;
      setTimeout(() => {
        setError(false);
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    let timeout;
    if (userRegistered) {
      timeout = 2000;
      setTimeout(() => {
        resetRegister();
        navigate("/login");
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [userRegistered]);

  useEffect(() => {
    document.title = "CoinXtra - Signup";
  }, []);
  return (
    <section className="customHeight bg-slate-100 mt-14 p-6">
      <form className="md:max-w-[600px] bg-white md:mx-auto p-6 md:p-10 flex flex-col gap-4 shadow-xl rounded-xl">
        <h3 className="capitalize font-bold my-5">sign up to get started.</h3>
        <div className={styles.formDiv}>
          <FaUser className={styles.icon} />
          <Input
            type={"text"}
            placeholder={"fullname"}
            value={form.fullname}
            onchange={handleInput}
            name={"fullname"}
          />
        </div>
        <div className={styles.formDiv}>
          <FaUser className={styles.icon} />
          <Input
            type={"text"}
            placeholder={"username"}
            value={form.username}
            onchange={handleInput}
            name={"username"}
          />
        </div>
        <div className={styles.formDiv}>
          <FaPhone className={styles.icon} />
          <Input
            type={"text"}
            placeholder={"phone"}
            value={form.phone}
            onchange={handleInput}
            name={"phone"}
          />
        </div>
        <div className={styles.formDiv}>
          <MdMail className={styles.icon} />
          <Input
            placeholder={"email"}
            value={form.email}
            onchange={handleInput}
            name={"email"}
          />
        </div>
        <div className={styles.formDiv}>
          <MdLock className={styles.icon} />
          <Input
            type={"password"}
            placeholder={"password"}
            value={form.password}
            onchange={handleInput}
            name={"password"}
          />
        </div>
        <div className={styles.formDiv}>
          <MdPassword className={styles.icon} />
          <Input
            type={"password"}
            placeholder={"pin"}
            value={form.pin}
            onchange={handleInput}
            name={"pin"}
          />
        </div>
        <div className={styles.formDiv}>
          <MdHome className={styles.icon} />
          <Input
            type={"text"}
            placeholder={"address"}
            value={form.address}
            onchange={handleInput}
            name={"address"}
          />
        </div>
        <div className={styles.formDiv}>
          <FaWallet className={styles.icon} />
          <Input
            type={"text"}
            placeholder={"BTC wallet address"}
            value={form.walletAddress}
            onchange={handleInput}
            name={"walletAddress"}
          />
        </div>
        <div className={styles.formDiv}>
          <MdPassword className={styles.icon} />
          <Input
            type={"text"}
            placeholder={"Invitation code (optional)"}
            value={form.invitation}
            onchange={handleInput}
            name={"invitation"}
          />
        </div>
        <div className="flex items-center justify-between text-xs font-thin text-yellow-600 px-3">
          <span>
            Already have an account? <Link to={"/login"}>Login now</Link>
          </span>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        {userRegistered && (
          <p className="text-xs text-green-500">
            User account created successfully.
          </p>
        )}
        <button
          onClick={handleSubmit}
          className="border-none bg-yellow-600 py-2.5 px-4 text-white font-medium uppercase rounded-3xl text-sm my-5"
        >
          {!registerLoading ? "register" : "creating account..."}
        </button>
      </form>
    </section>
  );
};

export default Signup;
