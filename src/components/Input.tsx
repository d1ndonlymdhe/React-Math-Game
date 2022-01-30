// import React from "react";
import { useRef } from "react";
import { InputPropsTypes } from "./typings/components";
// import { JsxChild } from "typescript";
export function Input(props: InputPropsTypes) {
  const { setReturnThis, name, type, autoComplete: autoComplete } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <input
      name={name}
      type={type}
      autoComplete={autoComplete}
      className="bg-neutral-300 border-b-slate-900 border-solid border-b-2 focus:outline-none caret-slate-900 text-center"
      ref={inputRef}
      onChange={() => {
        if (inputRef.current !== null && setReturnThis !== undefined) {
          setReturnThis(inputRef.current.value);
        }
      }}
    ></input>
  );
}
