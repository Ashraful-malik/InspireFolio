import React from "react";

function TextArea({
  name,
  value,
  onChange,
  placeholder,
  required,
  maxLength,
  minLength,
}) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      required={required}
      minLength={minLength}
      className="block w-full px-3 py-2 text-dark-textPrimary bg-dark-surface border
       border-dark-border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-dark-accent focus:border-purple-600 dark:bg-dark-surface dark:border-dark-border dark:focus:ring-dark-accent dark:focus:border-dark-accent dark:text-dark-textPrimary"
    />
  );
}

export default TextArea;
