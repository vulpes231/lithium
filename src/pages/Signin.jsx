import React, { useEffect, useState } from "react";
import { Input } from "../components";
import { MdLock } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetLogin } from "../features/loginSlice";

const styles = {
  formDiv: "relative flex gap-2",
  icon: "absolute top-[14px] left-3",
};

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { loginLoading, loginError, accessToken } = useSelector(
    (state) => state.login
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
    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (loginError) {
      setError(loginError);
    }
  }, [loginError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = 2000;
      setTimeout(() => {
        setError("");
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    let timeout;
    if (accessToken) {
      timeout = 2000;
      setTimeout(() => {
        const token = JSON.stringify(accessToken);
        sessionStorage.setItem("accessToken", token);
        resetLogin();
        navigate("/dashboard");
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [accessToken]);

  useEffect(() => {
    document.title = "CoinXtra - Signin";
  }, []);
  return (
    <section className="customHeight bg-slate-100 mt-14 p-6 flex items-center justify-center">
      <form className="md:max-w-[400px] bg-white md:mx-auto p-6 md:p-10 flex flex-col gap-4 shadow-xl rounded-xl w-full font-[Poppins]">
        <h3 className="capitalize font-bold my-5">
          sign in to access full features.
        </h3>
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
          <MdLock className={styles.icon} />
          <Input
            type={"password"}
            placeholder={"password"}
            value={form.password}
            onchange={handleInput}
            name={"password"}
          />
        </div>
        <div className="flex items-center justify-between text-xs font-light text-yellow-600 px-3">
          <Link>Forgot password</Link>
          <span>
            No account? <Link to={"/register"}> create now</Link>
          </span>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        {accessToken && (
          <p className="text-xs text-green-500">Login success.</p>
        )}
        <button
          onClick={handleSubmit}
          className="border-none bg-yellow-600 py-2.5 px-4 text-white font-medium uppercase rounded-3xl text-sm my-5"
        >
          {!loginLoading ? "login" : "logging in..."}
        </button>
      </form>
    </section>
  );
};

export default Signin;
