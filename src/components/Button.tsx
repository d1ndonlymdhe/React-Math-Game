import { ButtonPropsTypes } from "./typings/components";

// import React from "react";
export function Button(props: ButtonPropsTypes) {
  const { text, bonClick, type, name, bgColor } = props;
  const buttonColor = bgColor || "bg-amber-400";
  return (
    <button
      className={`px-5 py-2 ${buttonColor} font-bold w-fit`}
      //@ts-ignore
      onClick={bonClick}
      type={type}
      name={name}
    >
      {text}
    </button>
  );
}
