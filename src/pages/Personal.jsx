import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editUser, resetEditUser } from "../features/userSlice";

const Myinput = ({ label, value, handleChange, name }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name}>
        {label} <span className="text-red-500 font-light text-xs">*</span>
      </label>
      <input
        id={name}
        className="border outline-none p-2 w-full focus:outline-green-500 focus:border-none focus:border-collapse bg-zinc-100"
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        autoComplete="off"
      />
    </div>
  );
};

const Personal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    address: "",
    state: "",
    zip: "",
    city: "",
  });

  const [error, setError] = useState("");

  const { editUserLoading, editUserError, userEdited } = useSelector(
    (state) => state.user
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled out
    if (Object.values(form).includes("")) {
      setError("Please fill out all the fields.");
      return;
    }

    console.log("Form Submitted:", form);

    dispatch(editUser(form));

    setError("");
  };

  useEffect(() => {
    if (editUserError) {
      setError(error);
    }
  }, [error]);

  useEffect(() => {
    let timeout;
    if (userEdited) {
      timeout = 2000;
      setTimeout(() => {
        resetEditUser();
        navigate("/dashboard");
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [userEdited]);

  useEffect(() => {
    document.title = "Lithium Finance - Complete Profile";
  }, []);

  return (
    <section className="p-6 flex items-center justify-center h-screen bg-slate-100">
      <div>
        <form
          className="bg-white w-full md:w-[600px] p-6 shadow-sm flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <Myinput
              label="First Name"
              name="firstname"
              value={form.firstname}
              handleChange={handleChange}
            />
            <Myinput
              label="Last Name"
              name="lastname"
              value={form.lastname}
              handleChange={handleChange}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Myinput
              label="Address"
              name="address"
              value={form.address}
              handleChange={handleChange}
            />
            <Myinput
              label="State"
              name="state"
              value={form.state}
              handleChange={handleChange}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Myinput
              label="Zip Code"
              name="zip"
              value={form.zip}
              handleChange={handleChange}
            />
            <Myinput
              label="City"
              name="city"
              value={form.city}
              handleChange={handleChange}
            />
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            className="p-2.5 bg-green-600 text-white rounded-3xl"
          >
            {!editUserLoading ? "Submit" : "Updating..."}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Personal;
