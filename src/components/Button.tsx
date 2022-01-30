import { ButtonPropsTypes } from "./typings/components";

// import React from "react";
export function Button(props: ButtonPropsTypes) {
  const { text, bonClick, type, name } = props;
  return (
    <button
      className="px-5 py-2 ml-5 bg-amber-300 font-bold"
      //@ts-ignore
      onClick={bonClick}
      type={type}
      name={name}
    >
      {text}
    </button>
  );
}
