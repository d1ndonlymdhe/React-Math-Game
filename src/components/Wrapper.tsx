import React, { ReactNode } from "react";

export function Wrapper(props: React.PropsWithChildren<ReactNode>) {
  return (
    <div className="max-w-[90%] w-96 m-5 bg-slate-300 flex flex-col items-center justify-center rounded-lg">
      {props.children}
    </div>
  );
}
