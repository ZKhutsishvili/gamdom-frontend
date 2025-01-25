import React from "react";

interface TextInputProps {
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    type?: string;
    register?: (name: any, validation: any) => object;
    validation?: any;
    errorMessage?: string;
}

const TextInput = ({id, name, label, placeholder, type, register = () => ({}), validation, errorMessage}: TextInputProps) => {
  return (
    <div className="w-full flex flex-col gap-3">
        {label &&
            <p className="text-[#818e9d] text-sm">
                {label}
            </p>
        }
        <input 
        id={id}
        name={name}
        {...register(name, validation)}
        className="bg-[#333a42] placeholder-[#818e9d] text-[#818e9d] border border-transparent outline-none rounded-md h-10 px-3 box-border transition-all duration-500 focus:border-[#00FF86] hover:border-[#00FF86]"
        placeholder={placeholder || label}
        type={type || "text"}
        />
        {errorMessage && <p className="text-red-500 text-sm font-medium">{errorMessage}</p>}
    </div>
  );
};

export default TextInput;
