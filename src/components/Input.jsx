import React from "react";

const Input = ({ name, placeholder, value, onchange, type }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onchange}
      name={name}
      className="border-2 outline-none focus:border-none focus:outline-yellow-600 w-full rounded-3xl pl-10 pr-5 py-2 placeholder:text-xs "
    />
  );
};

export default Input;
