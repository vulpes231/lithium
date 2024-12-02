import React, { useEffect } from "react";
const styles = {
  input: "border p-2 w-full",
  formHolder: "flex flex-col md:flex-row md:items-center gap-4",
  labelHolder: "flex flex-col w-full gap-1",
};
const Ticket = ({ setActive }) => {
  useEffect(() => {
    document.title = "Finance Hedge - Ticket";
    setActive("support ticket");
  }, []);

  return (
    <section className="bg-slate-100 text-slate-700 h-full p-6 overflow-auto">
      <div className="w-full md:max-w-[70%] md:mx-auto mb-24 flex flex-col gap-6">
        <h3 className="font-semibold text-xl md:text-2xl capitalize">
          open ticket
        </h3>
        <div className="bg-white p-6 border">
          <form action="" className="flex flex-col gap-4">
            <div className={styles.formHolder}>
              <div className={styles.labelHolder}>
                <label htmlFor="">name</label>
                <input className={styles.input} type="text" />
              </div>
              <div className={styles.labelHolder}>
                <label htmlFor="">email</label>
                <input className={styles.input} type="text" />
              </div>
            </div>
            <div className={styles.formHolder}>
              <div className={styles.labelHolder}>
                <label htmlFor="">subject</label>
                <input className={styles.input} type="text" />
              </div>
              <div className={styles.labelHolder}>
                <label htmlFor="">priority</label>
                <select
                  name=""
                  className="capitalize w-full bg-white text-slate-700 border p-2"
                >
                  <option value="">low</option>
                  <option value="">medium</option>
                  <option value="">high</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="">message</label>
              <textarea name="" rows={5} className="border w-full"></textarea>
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
                  placeholder="no file selected"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs">
                Allowed File Extensions: .jpg, .jpeg, .png, .pdf, .doc, .docx{" "}
              </span>
              <button className="bg-green-600 text-white p-2 capitalize">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Ticket;
