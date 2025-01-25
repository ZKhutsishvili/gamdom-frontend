import React from "react";

const Button = ({label, type, onClick, disabled}: {label?: string; type?: "submit" | undefined; onClick?: () => void; disabled?: boolean}) => {
  return (
    <button disabled={disabled} className={`${disabled && "opacity-50 "} w-full flex bg-[#23d482] rounded-md p-3 justify-center text-2xl cursor-pointer hover:bg-[#8deec1] transition-all duration-500`} type={type || "button"} onClick={onClick}>
        {label}
    </button>
  );
};

export default Button;
