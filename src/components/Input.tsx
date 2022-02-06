// import React from "react";
import React from "react";
import { InputPropsTypes } from "./typings/components";

export const Input = React.forwardRef<HTMLInputElement, InputPropsTypes>(
  (props, ref) => {
    const { name, type, autoComplete, className } = props;
    return (
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        autoFocus={true}
        className={`bg-neutral-300 border-b-slate-900 border-solid border-b-2 focus:outline-none caret-slate-900 text-center w-full ${className}`}
        ref={ref}
      ></input>
    );
  }
);
