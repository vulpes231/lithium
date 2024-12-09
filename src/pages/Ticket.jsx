import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTicket, resetCreateTicket } from "../features/ticketSlice";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
const styles = {
  input: "border p-2 w-full",
  formHolder: "flex flex-col md:flex-row md:items-center gap-4",
  labelHolder: "flex flex-col w-full gap-1",
};

const initialState = {
  name: "",
  email: "",
  subject: "",
  priority: "",
  message: "",
  attachment: "",
};

const Ticket = ({ setActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

  const { createTicketLoading, ticketCreated, createTicketError } = useSelector(
    (state) => state.ticket
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        attachment: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (
      !form.name ||
      !form.email ||
      !form.subject ||
      !form.message ||
      !form.priority
    ) {
      setError("All fields are required.");
      return;
    }
    dispatch(createTicket(form));
  };

  useEffect(() => {
    if (createTicketError) {
      setError(createTicketError);
    }
  }, [createTicketError]);

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
    let timeout;
    if (ticketCreated) {
      timeout = 3000;
      setTimeout(() => {
        setForm(initialState);
        dispatch(resetCreateTicket());
        navigate("/userticket");
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [ticketCreated]);

  useEffect(() => {
    document.title = "Finance Hedge - Ticket";
    setActive("support ticket");
  }, []);

  return (
    <section className="bg-slate-100 text-slate-700 h-full p-6 overflow-auto">
      <div className="w-full md:max-w-[70%] md:mx-auto mb-24 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-xl md:text-2xl capitalize">
            open ticket
          </h3>
          <Link
            to={"/userticket"}
            className="bg-slate-800 text-white py-2 px-5 text-sm font-semibold flex gap-1 items-center rounded-sm"
          >
            <MdArrowBack />
            Tickets
          </Link>
        </div>
        <div className="bg-white p-6 border">
          <form action="" className="flex flex-col gap-4">
            <div className={styles.formHolder}>
              <div className={styles.labelHolder}>
                <label htmlFor="">name</label>
                <input
                  className={styles.input}
                  type="text"
                  onChange={handleInput}
                  value={form.name}
                  name="name"
                />
              </div>
              <div className={styles.labelHolder}>
                <label htmlFor="">email</label>
                <input
                  className={styles.input}
                  type="text"
                  onChange={handleInput}
                  value={form.email}
                  name="email"
                />
              </div>
            </div>
            <div className={styles.formHolder}>
              <div className={styles.labelHolder}>
                <label htmlFor="">subject</label>
                <input
                  className={styles.input}
                  type="text"
                  onChange={handleInput}
                  value={form.subject}
                  name="subject"
                />
              </div>
              <div className={styles.labelHolder}>
                <label htmlFor="">priority</label>
                <select
                  className="capitalize w-full bg-white text-slate-700 border p-2"
                  onChange={handleInput}
                  value={form.priority}
                  name="priority"
                >
                  <option value="">Select priority</option>
                  <option value="low">low</option>
                  <option value="medium">medium</option>
                  <option value="high">high</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="">message</label>
              <textarea
                rows={5}
                className="border w-full"
                onChange={handleInput}
                value={form.message}
                name="message"
              ></textarea>
            </div>
            <div className={styles.labelHolder}>
              <label htmlFor="">
                attachments{" "}
                <span className="text-xs font-light text-red-500">
                  maximum of 5 files can be uploaded. max uload size 1534mb
                </span>
              </label>
              <div className="flex items-center">
                <input
                  className={styles.input}
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            {error && <div className="text-red-500">{error}</div>}

            <div className="flex flex-col">
              <span className="text-xs">
                Allowed File Extensions: .jpg, .jpeg, .png, .pdf, .doc, .docx{" "}
              </span>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white p-2 capitalize"
              >
                {!createTicketLoading ? "submit" : "wait..."}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Ticket;
