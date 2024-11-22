import React, { useEffect, useState } from "react";
import { Input, Logo } from "../components";
import { MdLock } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetLogin } from "../features/loginSlice";
// Logo
const styles = {
  formDiv: "relative flex flex-col gap-1",
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
    document.title = "Lithium Finance - Login";
  }, []);

  return (
    <section className="h-screen bg-slate-100 p-6 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center pb-5">
        <Logo />
      </div>
      <form className="md:max-w-[500px] bg-white md:mx-auto p-6 md:p-10 flex flex-col gap-4 shadow-sm rounded-sm w-full font-[Poppins]">
        <div className="flex flex-col gap-3">
          <h3 className="capitalize font-bold text-lg">
            login to your account
          </h3>
          <small className="font-light text-slate-500">
            You can sign in to your account using email or username
          </small>
        </div>
        <div className={styles.formDiv}>
          <label htmlFor="">username or email</label>
          <Input
            type={"text"}
            value={form.username}
            onchange={handleInput}
            name={"username"}
          />
        </div>

        <div className={styles.formDiv}>
          <label htmlFor="">password</label>
          <Input
            type={"password"}
            value={form.password}
            onchange={handleInput}
            name={"password"}
          />
        </div>
        <div className="flex items-center justify-between text-xs font-light text-green-600 px-3">
          <span className="flex items-center gap-0.5">
            <input
              className="border border-slate-800"
              type="checkbox"
              name=""
              id=""
            />
            <span>Keep me logged in</span>
          </span>
          <span>Forgot password</span>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        {accessToken && (
          <p className="text-xs text-green-500">Login success.</p>
        )}
        <button
          onClick={handleSubmit}
          className="border-none bg-green-600 py-2.5 px-4 text-white font-medium uppercase rounded-3xl text-sm my-2"
        >
          {!loginLoading ? "login" : "logging in..."}
        </button>
        <span className="font-light text-center text-xs text-slate-500">
          Don't have an account?{" "}
          <Link className="text-green-600 font-medium" to={"/register"}>
            {" "}
            Create now
          </Link>
        </span>
      </form>
    </section>
  );
};

export default Signin;
