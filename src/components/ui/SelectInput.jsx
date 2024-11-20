import React from "react";
import propsType from "prop-types";
function SelectInput({ options, value, onChange, name, required }) {
  return (
    <div className="">
      <select
        className="mt-1 block w-full px-3 py-2 text-dark-textPrimary dark:placeholder:text-dark-textSecondary bg-dark-surface border border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 dark:bg-dark-surface dark:border-dark-border dark:focus:ring-dark-accent dark:focus:border-dark-accent dark:text-dark-textPrimary"
        value={value}
        onChange={onChange}
        name={name}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;

SelectInput.propTypes = {
  options: propsType.array.isRequired,
  value: propsType.string.isRequired,
  onChange: propsType.func.isRequired,
  name: propsType.string.isRequired,
  required: propsType.bool,
};
