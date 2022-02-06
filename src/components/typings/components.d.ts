import React, { MouseEvent } from "react";
type set<T> = React.Dispatch<T>;
type InputPropsTypes = {
  // returnThis: string;
  autoComplete?: string;
  autoFocus?: boolean;
  name?: string;
  type?: "text" | "password" | "number" | undefined;
  setReturnThis?: set<string>;
  className?: string;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
};
type ButtonPropsTypes = {
  type?: "submit" | "reset" | undefined;
  text: string;
  name?: stringl;
  bonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
type RadioInputPropsTypes = {
  id: string;
  name: string;
  labelValue: string;
  setReturnThis: set<string>;
};
