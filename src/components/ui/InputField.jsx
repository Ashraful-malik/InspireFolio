import React from "react";

function InputField({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-surface dark:border-dark-border dark:placeholder-dark-textSecondary dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-dark-textPrimary"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default InputField;
