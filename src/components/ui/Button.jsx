import React from "react";
import PropsTypes from "prop-types";
// Reusable Button Component
const Button = ({
  label,
  onClick,
  type = "button",
  style = "primary", // default style is 'primary'
  size = "medium", // default size is 'medium'
  disabled = false,
  className = "",
  rounded = "full",
}) => {
  // Set up button styles based on props
  const getButtonClass = () => {
    let baseClass =
      "py-2 px-6 focus:outline-none focus:ring-2 text-center font-medium transition duration-300 ease-in-out";

    // Apply size variations
    const sizeClasses = {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    };

    // Apply border Radious Varients
    const borderClasses = {
      small: "rounded-md",
      medium: "rounded-lg",
      large: "rounded-xl",
      full: "rounded-full",
    };

    // Apply style variations
    const styleClasses = {
      primary:
        "bg-blue-500 text-white hover:bg-blue-600 dark:bg-dark-accent dark:text-black dark:hover:bg-dark-accentHover",
      secondary:
        "bg-gray-500 text-white hover:bg-gray-600 dark:bg-dark-surface dark:text-dark-textPrimary dark:hover:bg-dark-overlay",
      danger:
        "bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:text-dark-textPrimary dark:hover:bg-red-800",
      success:
        "bg-green-500 text-white hover:bg-green-600 dark:bg-dark-success dark:text-dark-textPrimary dark:hover:bg-green-700",
      outline:
        "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white dark:border-dark-border dark:text-dark-textPrimary dark:bg-dark-surface dark:hover:bg-dark-overlay",
      dark: "dark:bg-dark-surface dark:text-dark-textPrimary dark:border-dark-border border dark:hover:bg-dark-overlay",
    };

    // Combine base class with size and style classes
    return `${baseClass} ${sizeClasses[size]} ${styleClasses[style]} ${className} ${borderClasses[rounded]}`;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={getButtonClass()}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.PropsTypes = {
  label: PropsTypes.string.isRequired,
  onClick: PropsTypes.func,
  type: PropsTypes.string,
  style: PropsTypes.string,
  size: PropsTypes.string,
  disabled: PropsTypes.bool,
  className: PropsTypes.string,
};
export default Button;
