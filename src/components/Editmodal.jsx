import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../features/userSlice";

const Editmodal = ({ close }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    homeAddress: "",
    email: "",
  });

  const { userEdited, editUserLoading, editUserError } = useSelector(
    (state) => state.user
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
    dispatch(editUser(form));
  };

  useEffect(() => {
    let timeout;
    if (userEdited) {
      timeout = 2000;
      setTimeout(() => {
        window.location.reload();
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [userEdited]);

  return (
    <section className="bg-black bg-opacity-50 w-full h-full fixed top-0 left-0 flex items-center justify-center font-[Poppins]">
      <div className="bg-white flex flex-col gap-4 w-full md:max-w-[400px] rounded-lg shadow-lg">
        <span className="flex items-center justify-between p-5">
          <h3 className="capitalize font-semibold border-l-4 border-yellow-600 px-1">
            edit profile
          </h3>
          <span onClick={close} className="cursor-pointer">
            <MdClose />
          </span>
        </span>
        <form action="" className="p-6 flex flex-col gap-4 ">
          <div>
            <input
              type="email"
              placeholder="New Email"
              className="border p-2 placeholder:font-light focus:border-none focus:outline-yellow-500 outline-none w-full"
              onChange={handleInput}
              value={form.email}
              name="email"
              autoComplete="off"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="New Home Address"
              className="border p-2 placeholder:font-light focus:border-none focus:outline-yellow-500 outline-none w-full"
              onChange={handleInput}
              value={form.homeAddress}
              name="homeAddress"
              autoComplete="off"
            />
          </div>
          {userEdited && (
            <p className="text-xs text-green-500">
              Profile updated successfully
            </p>
          )}
          {editUserError && (
            <p className="text-xs text-red-500">{editUserError}</p>
          )}
          <button
            onClick={handleSubmit}
            className="bg-yellow-600 text-white p-2 rounded-sm hover:bg-yellow-700"
          >
            {!editUserLoading ? "Update profile" : "Wait..."}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Editmodal;
