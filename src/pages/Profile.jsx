import React, { useEffect, useState } from "react";
import { Authnav, Changepass, Editmodal, Sidebar, Topup } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../utils/utils";
import { getUser } from "../features/userSlice";
import { userProfile } from "../assets";
import { MdEditDocument, MdLocationOn, MdMail } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";

const styler = {
  span: "flex items-center gap-2",
  div: "bg-white p-6 rounded-xl shadow-lg w-full flex flex-col gap-4",
};

const Profile = ({ setActive }) => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setActive("profile");
  }, []);

  const [editModal, setEditModal] = useState(false);

  const handleEditModal = () => {
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    }
  }, [accessToken]);

  useEffect(() => {
    document.title = "CoinXtra - Profile";
  }, []);
  return (
    <section className=" bg-slate-100 w-full p-6 overflow-auto h-full">
      <div className="mb-24">
        <div className="w-full flex gap-5 flex-col">
          <h3 className="font-bold text-2xl md:text-3xl capitalize">profile</h3>
          <div className=" bg-white p-6 rounded-xl shadow-lg w-full md:w-[50%]">
            <h3 className="border-l-4 border-green-500 px-1 font-bold">
              User Profile
            </h3>
            <div className="flex items-center gap-4 mt-3">
              <figure>
                <img src={userProfile} alt="" width={120} />
              </figure>
              <div className="flex flex-col gap-2">
                <span className={styler.span}>
                  <FaUserGroup />
                  <h3 className="capitalize font-semibold text-lg">
                    {user.firstname} {user.lastname}
                  </h3>
                </span>
                <span className={styler.span}>
                  <MdMail />
                  <p className="text-sm font-light">{user.email}</p>
                </span>
                <span className={styler.span}>
                  <MdLocationOn />
                  <p className="text-sm font-light whitespace-nowrap">
                    {user.city} {user.state} {user.zip}
                  </p>
                </span>
                <button
                  onClick={handleEditModal}
                  className="bg-green-500 text-white px-4 py-2 font-medium flex items-center w-[150px] whitespace-nowrap gap-2 rounded-md shadow-lg"
                >
                  <FaUserEdit />
                  <span>Edit profile</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:flex-row">
            <div className={styler.div}>
              <h3 className="border-l-4 border-green-500 px-1 font-bold capitalize">
                change password
              </h3>
              <Changepass />
            </div>
            <div className={styler.div}>
              <h3 className="border-l-4 border-green-500 px-1 font-bold capitalize">
                top up
              </h3>
              <Topup user={user} />
            </div>
          </div>
        </div>
        {editModal && <Editmodal close={closeEditModal} />}
      </div>
    </section>
  );
};

export default Profile;
