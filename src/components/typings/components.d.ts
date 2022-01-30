import React, { MouseEvent } from "react";
type set<T> = React.Dispatch<T>;
type InputPropsTypes = {
  // returnThis: string;
  autoComplete?: string;
  name?: string;
  type?: "text" | "password" | "number" | undefined;
  setReturnThis?: set<string>;
};
type ButtonPropsTypes = {
  type?: "submit" | "reset" | undefined;
  text: string;
  name?: stringl;
  bonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
