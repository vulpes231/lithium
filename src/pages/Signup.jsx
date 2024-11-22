import React, { useEffect, useState } from "react";
import { Input, Logo } from "../components";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetRegister } from "../features/registerSlice";

const styles = {
  formDiv: "relative flex flex-col gap-1",
  icon: "absolute top-[14px] left-3",
};

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    country: "",
    phone: "",
    password: "",
    confirmPassword: "",
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
    if (!form.password || !form.username || !form.email || !form.country) {
      setError("Required fields cannot be empty!");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    // dispatch(registerUser(form));
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
        navigate("/verifyotp");
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [userRegistered]);

  useEffect(() => {
    document.title = "Lithium Finance - Register";
  }, []);
  return (
    <section className="customHeight bg-slate-100 p-10 font-[Poppins]">
      <div className="flex items-center justify-center pb-5">
        <Logo />
      </div>
      <form className="md:max-w-[500px] bg-white md:mx-auto p-6 md:p-10 flex flex-col gap-4 shadow-sm rounded-sm">
        <div className="flex flex-col gap-3">
          <h3 className="capitalize font-bold text-lg">create an account</h3>
          <small className="font-light text-slate-500">
            You can create account using email or username and the registration
            is fully free
          </small>
        </div>

        <div className={styles.formDiv}>
          <label htmlFor="">username</label>
          <Input
            type={"text"}
            value={form.username}
            onchange={handleInput}
            name={"username"}
          />
        </div>

        <div className={styles.formDiv}>
          <label htmlFor="">email address</label>
          <Input value={form.email} onchange={handleInput} name={"email"} />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className={`${styles.formDiv} w-full`}>
            <label htmlFor="">country</label>
            <select
              name="country"
              value={form.country}
              onChange={handleInput}
              className="font-light text-sm border-2 outline-none focus:border-none focus:outline-green-600 w-full rounded-sm p-2 placeholder:text-xs bg-white text-slate-800"
            >
              <option value="">Select Country</option>
              <option value="united kingdom">United Kingdom</option>
              <option value="USA">USA</option>
              <option value="france">France</option>
              <option value="germany">Germany</option>
              <option value="russia">Russia</option>
            </select>
          </div>
          <div className={`${styles.formDiv} w-full`}>
            <label htmlFor="">mobile</label>
            <Input
              type={"text"}
              value={form.phone}
              onchange={handleInput}
              name={"phone"}
            />
          </div>
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

        <div className={styles.formDiv}>
          <label htmlFor="">confirm password</label>
          <Input
            type={"password"}
            value={form.confirmPassword}
            onchange={handleInput}
            name={"confirmPassword"}
          />
        </div>

        <div className="flex items-center justify-between text-xs font-thin  px-3">
          <span>
            Already have an account?{" "}
            <Link className="text-green-600 font-medium" to={"/login"}>
              Login now
            </Link>
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
          className="border-none bg-green-600 py-2.5 px-4 text-white font-medium uppercase rounded-3xl text-sm my-5"
        >
          {!registerLoading ? "register" : "creating account..."}
        </button>
      </form>
    </section>
  );
};

export default Signup;
