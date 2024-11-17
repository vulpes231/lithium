import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePass, resetChangePass } from "../features/userSlice";

const styler = {
  input:
    "border outline-none focus:outline-yellow-500 focus:border-none p-2 placeholder:font-thin placeholder:text-sm",
};

const Changepass = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    password: "",
    newPassword: "",
    confirmPass: "",
  });

  const [error, setError] = useState(false);

  const { updatePassLoading, updatePassError, passUpdated } = useSelector(
    (state) => state.user
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePass = (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPass) {
      setError("Passwords do not match!");
      setForm({
        newPassword: "",
        confirmPass: "",
      });
      return;
    }
    dispatch(changePass(form));
  };

  useEffect(() => {
    if (updatePassError) {
      setError(updatePassError);
    }
  }, [updatePassError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = 3000;
      setTimeout(() => {
        dispatch(resetChangePass());
        setError(false);
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    let timeout;
    if (passUpdated) {
      timeout = 2000;
      setTimeout(() => {
        dispatch(resetChangePass());
        setError(false);
        window.location.reload();
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [passUpdated]);

  return (
    <div className="flex flex-col gap-2">
      <input
        type="password"
        placeholder="Current password"
        onChange={handleInput}
        value={form.password}
        name="password"
        className={styler.input}
      />
      <input
        type="password"
        placeholder="New password"
        onChange={handleInput}
        value={form.newPassword}
        name="newPassword"
        className={styler.input}
      />
      <input
        type="password"
        placeholder="Confirm password"
        onChange={handleInput}
        value={form.confirmPass}
        name="confirmPass"
        className={styler.input}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
      {passUpdated && (
        <p className="text-green-500 text-xs">Password updated.</p>
      )}
      <button
        onClick={handlePass}
        className="bg-yellow-500 text-white capitalize font-medium mt-5 p-2 text-sm"
      >
        {!updatePassLoading ? "change password" : "wait..."}
      </button>
    </div>
  );
};

export default Changepass;
