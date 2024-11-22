import React from "react";

const Input = ({ name, placeholder, value, onchange, type }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onchange}
      name={name}
      className="border-2 outline-none focus:border-none focus:outline-green-600 w-full rounded-sm p-2 placeholder:text-xs "
    />
  );
};

export default Input;
