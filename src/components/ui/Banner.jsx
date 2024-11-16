import React from "react";

function Banner({
  title = "text-yellow-700",
  message,
  backgroundColor,
  textColor,
  borderColor = "border-yellow-500",
  icon,
}) {
  return (
    <div
      className={`"bg-yellow-100 border-l-4  py-2 max-w-xl rounded-md 
           p-4" ${backgroundColor} ${textColor} ${borderColor}`}
      role="alert"
    >
      <div className="flex items-center justify-between">
        <div className="pl-2 ">
          <p className="font-bold">{title}</p>
          <p className="text-sm">{message}</p>
        </div>
        <div className="icon pr-2">
          {icon && <p className="text-sm">{icon}</p>}
        </div>
      </div>
    </div>
  );
}

export default Banner;
