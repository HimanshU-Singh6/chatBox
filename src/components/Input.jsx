import React, { forwardRef, useId } from "react";

const Input = ({ label, type, value, placeholder, className = "", ...props}, ref) => {
  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        {...props}
        id={id}
        className={`bg-[#eaedf5] dark:bg-[#222630] px-4 py-3 outline-none w-[280px] text-text rounded-lg border-2 transition-colors duration-50 border-solid dark:focus:border-[#596A95] dark:border-[#2B3040] focus:border-[#697AA5] border-[#8e9bc7] ${className}`}
        ref={ref}
      />
    </div>
  );
};

export default forwardRef(Input);

//bg-[#cfd3dd] dark:bg-[#222630]

